const renderedVTrees = new WeakMap<HTMLElement, RootVNode>();
const refsToCall: Function[] = [];
/**
 * provides functions needed by babel for a custom pragma
 * to render parsed jsx code to html
 */

// props which will be rendered as attributes
// Functions will be used for event listeners. (with attribute name starting with 'on-')
type Attributes = { [key: string]: string | boolean | number | Function };

// additional attributes which can have additional serialization before rendering as attributes
type SpecialAttributes = {
  class?: string | string[];
  style?: string | { [key: string]: string };
  ref?: Function;
};

// child elements in the jsx markup which will be passed to the h function as `props.children`
type ChildrenProps = {
  // nested array in case of
  // <elem>
  //   <span/>
  //   {children}
  //   <div/>
  // </elem>
  children: Array<
    Node | JsxNodeInterface | string | Array<Node | JsxNodeInterface | string>
  >;
};

/**
 * props object which will be passed to jsx pragma and custom component functions
 */
type JsxProps = Attributes & SpecialAttributes & ChildrenProps;

// base class which will be inherited from jsx and fragments function node generation
// and will be used to distinguish them with other Elements
class JsxNode {
  props: JsxProps;
  constructor(props: JsxProps) {
    this.props = props;
  }
}

/*{
      //[key: string]: any;
      type: "Element" | "Fragment" | "TextNode" | "Null";
      asNode(): Node;
      toString(): string;
      node: Node | null;
      parent: VNode | null;
      children: Array<VNode>;
      tag: string | Function; // ?
      //getParentElementNode(): VNode; // ancestor which has a Element node (i.e. no Fragment)
      //getChildElementNodes(): VNode[]; // children and if a child is a fragment its children
    }*/

type CommonVNodeProperties = {
  parent: VNode;
  asNode(): Node;
  toString(): string;
};
type ElementVNode = CommonVNodeProperties & {
  type: "Element";
  node: Element;
  children: Array<VNode>;
  tag: string | Function;
  props: { [key: string]: any };
};
type TextVNode = CommonVNodeProperties & {
  type: "TextNode";
  node: Text;
  children: Array<VNode>; //Array<never>;
  tag: null;
};

type RootVNode = {
  type: "Root";
  node: Element;
  children: Array<VNode>;
  parent: null;
  //asNode(): Node;
  //toString(): string;
};

type VNode = {
  parent: VNode;
  asNode(): Node;
  toString(): string;
} & (
  | ElementVNode
  | TextVNode
  | {
      type: "TextNode";
      node: Text;
      children: Array<VNode>; //Array<never>;
      tag: null;
    }
  | {
      type: "Fragment";
      node: null; // @TODO: or null?
      children: Array<VNode>;
      tag: null;
    }
  | {
      type: "Null";
      node: null;
      children: Array<VNode>; //Array<never>;
      tag: null;
    }
);

// null when checking the parent when root is fragment itself
function getParentElementNode(vNode: VNode): ElementVNode {
  console.log("getParentElementNode", vNode);

  while (vNode.parent) {
    vNode = vNode.parent;
    // `.node` is only on "Text" and "Element" type VNode, and only Element has children
    if (vNode.node) break;
  }

  console.log("found: ", vNode);

  return vNode as ElementVNode;
}

type VNodeLikeWithChildren = {
  node?: Node | null;
  children: Array<VNodeLikeWithChildren>;
  [key: string]: any;
};

function getChildrenWithNodes(
  vNode: VNodeLikeWithChildren,
  alwaysAllow: VNodeLikeWithChildren = []
): VNode[] {
  return vNode.children
    .map((childNode: VNodeLikeWithChildren) => {
      if (childNode === alwaysAllow) return childNode;
      //if (childNode.type === "Null") return null;
      if (childNode.node) return childNode;
      //if (childNode.type === "Fragment")
      //return getChildrenWithNodes(childNode, alwaysAllow);
      // @TODO: other types (i.e. Live Element)
      return getChildrenWithNodes(childNode, alwaysAllow);
    })
    .flat(Infinity)
    .filter(Boolean) as VNode[];
}

function getParentAndNextSibling(vNode: VNode): [Node, Node | null] {
  // node ancestor with Element,
  const parentWithElement = getParentElementNode(vNode);
  const siblings = getChildrenWithNodes(parentWithElement, vNode);
  const prevSibling = siblings[siblings.indexOf(vNode) - 1];
  const nextSiblingNode = prevSibling ? prevSibling.node!.nextSibling : null;

  console.log("getParentAndNextSibling", {
    vNode,
    parentWithElement,
    prevSibling,
    prevSiblingNode: prevSibling && prevSibling.node,
    nextSiblingNode,
  });

  return [parentWithElement.node, nextSiblingNode];
}

// private key for calling the `ref` callers
const _callRefs = Symbol("callRefs");

// the current markup which is rendered is nested in an svg element
let svgContext = false;

// jsx and Fragment will return objects which implement this interface
export interface JsxNodeInterface extends JsxNode {
  toString(): string;
  asNode(): Node;
  asVNode(): VNode;
  [_callRefs](): void;
}

/**
 * returns true if not nullish or false
 * that means 0 or empty string are allowed
 * @param {*} val
 */
function truthy(value: any): boolean {
  return value !== false && value !== null && value !== undefined;
}

/**
 * escapes the provided string against xss attacks etc
 *
 * @param {string} text
 * @returns {string}
 */
function sanitize(text: string): string {
  const div = document.createElement("div");
  div.innerText = text;
  return div.innerHTML;
}

/**
 * basically `Element.outerHTML` but also supports Text node and DocumentFragment
 * @param element {Node} - element which its html needs to be returned
 */
function getOuterHtml(element: Node): string {
  if (element instanceof Element) return element.outerHTML;
  if (element instanceof Text) return sanitize(element.wholeText);
  if (element instanceof DocumentFragment)
    return Array.from(element.childNodes)
      .map((el) => getOuterHtml(el))
      .join("");

  // shouldn't reach this point
  console.warn("getOuterHtml does not support this type of element", element);
  return "";
}

/**
 * generates the html as a string which can be used for example with `element.innerHTML()`
 *
 * @param tag {string|Function} - tag argument of the jsx call
 * @param props {Object} - props argument of jsx call
 */
function asHtmlString(tag: string | Function, props: JsxProps) {
  if (typeof tag === "function") {
    // expecting tag function to always return a jsx.
    // here it will also work if it returns something with toString() => string method
    const element: JsxNode = tag(props);

    return element.toString();
  }

  // remove children from props and render it as content,
  // the rest as attributes
  const { children, ...attrs } = props;

  const attributes = Object.entries(attrs)
    .filter(([, value]) => truthy(value))
    .map(([key, value]) => {
      // e.g. disabled: true => <tag disabled>
      if (value === true) return key;

      // for style as object:
      // (style:) {display: "none", position: "absolute"} ==> 'display: none; position: absolute;'
      if (key === "style" && typeof value === "object")
        value = Object.entries(value)
          // ignore stuff like `{background: active && "red"}` when `active === false / null / undefined`
          .filter(([, v]) => truthy(v))
          // currently supports "background-color" not "backgroundColor"
          .map(([k, v]) => `${k}: ${v}`)
          .join("; ");

      // (class:) ["btn", "red"] ==> "btn red"
      if (key === "class" && Array.isArray(value)) value = value.join(" ");

      return `${key}="${value}"`;
    })
    .join(" ");

  const content = children
    .filter(truthy)
    .map((child) =>
      child instanceof Node
        ? getOuterHtml(child)
        : typeof child === "object"
        ? child.toString()
        : sanitize(child)
    )
    .join("");

  return `<${tag} ${attributes}>${content}</${tag}>`;
}

/**
 * generates HTML Node elements from the provided jsx tree
 * @param tag {string|Function} - tag argument of the jsx call
 * @param props {Object} - props argument of jsx call
 */
function asNode(
  tag: string | Function | undefined,
  props: Attributes & SpecialAttributes, //JsxProps,
  children: any[]
): [Node, JsxNodeInterface[]] {
  console.log("asNode()", { tag, props, children });

  // fragment
  if (!tag) {
    const fragments = children
      .flat() // ?
      .map(
        (item) => item.asNode()
      );

    const documentFragment = document.createDocumentFragment();

    documentFragment.append(...fragments);
    return [documentFragment, []];
  }

  // shouldn't
  if (typeof tag === "function") {
    console.error("shouldn't reach this in vTree mode");
    // expecting the tag function to return jsx.
    // here it will also work when it returns HTMLElement
    let result = tag(props);

    let jsxNodes: JsxNodeInterface[] = [];

    if (result instanceof JsxNode || (result && result.asNode)) {
      jsxNodes = [result as JsxNodeInterface];
      result = (result as JsxNodeInterface).asNode();
      Object.entries(props).forEach(([key, value]) => {
        if (
          key.startsWith("on-") &&
          (typeof value === "function" || typeof value === "object")
        ) {
          // remove leading "on-""
          const event = key.replace(/^on-/, "");

          result.addEventListener(
            event,
            value as EventListenerOrEventListenerObject
          );
        }
      });
    }

    return [result, jsxNodes];
  }

  const { ...attrs } = props;
  // remember if the svg context was set for this node, and replace after generating all children
  let svgContextSet = false;

  // set the context of markup which is rendered as SVG (or its children)
  // no need for re-setting the context for nested SVGs
  if (!svgContext && tag === "svg") {
    svgContext = true;
    svgContextSet = true;
  }

  // currently not supporting the `is` option for Customized built-in elements
  const node = svgContext
    ? document.createElementNS("http://www.w3.org/2000/svg", tag)
    : document.createElement(tag);

  Object.entries(attrs)
    .filter(([_key, value]) => truthy(value))
    .forEach(([key, value]) => {
      // for style as object:
      // (style:) {display: "none", position: "absolute"} ==> 'display: none; position: absolute;'
      if (key === "style" && typeof value === "object")
        value = Object.entries(value)
          .filter(([, v]) => truthy(v))
          .map(([k, v]) => `${k}: ${v}`)
          .join("; ");

      // (class:) ["btn", "red"] ==> "btn red"
      if (key === "class" && Array.isArray(value)) value = value.join(" ");

      if (value === true) node.setAttribute(key, "");
      else if (typeof value === "string" || typeof value === "number")
        node.setAttribute(key, String(value));
      // key has the form of "on-change". value is the callback function or an object implementing {EventListener} interface
      else if (
        key.startsWith("on-") &&
        (typeof value === "function" || typeof value === "object")
      ) {
        // remove leading "on-""
        const event = key.replace(/^on-/, "");

        node.addEventListener(
          event,
          value as EventListenerOrEventListenerObject
        );
      }
      // @ts-ignore - providing the value as property to html element
      else node[key] = value;
    });

  // returns child jsx nodes as well to be used during the ref call
  const childJsxNodes = children.filter(
    (child) => child instanceof JsxNode || (child && child.asNode)
  );

  console.log({ children });

  node.append(
    ...children
      .flat()
      //.filter(truthy)
      .filter((child) => child.tag !== "__NULL__")
      .map((child) => child.asNode())
  );

  /*node.append(
    ...children
      .flat()
      .filter(truthy)
      .map((child) =>
        child instanceof Node
          ? console.warn("node") || child // warn
          : child instanceof JsxNode
          ? child.asNode()
          : console.warn("text") || child
      )
  );*/

  // svg element and all its children were rendered, reset the svg context
  if (svgContextSet) svgContext = false;

  return [node, childJsxNodes as JsxNodeInterface[]];
}

// @TODO: remove method on VNode
function removeItem(item: VNode) {
  //if (item === null) return;
  if (item.type === "Element" || item.type === "TextNode")
    item.node.parentElement!.removeChild(item.node);
  else if (item.type === "Fragment")
    getChildrenWithNodes(item).forEach((node) =>
      node.node!.parentElement!.removeChild(node.node!)
    );
  // @TODO: else -> VNode method actually
}

function insertNewItem(newNode: VNode) {
  // @TODO: Null not necccesery as asNode will return an empty Fragment, and make the method more generic
  if (newNode.type !== "Null") {
    const [parent, nextSibling] = getParentAndNextSibling(newNode);
    parent.insertBefore(newNode.asNode(), nextSibling);
  }
}

function diffAndPatch(oldNode: VNode | RootVNode, newNode: VNode | RootVNode) {
  console.log("-------- diffAndPatch --------", { oldNode, newNode });
  if (oldNode.type !== newNode.type) {
    // technically it would been more effective ways to replace, e.g. replaceWith() method
    // but removing and adding would allow a more generic solution to provide independent implementation from different VNode classes
    removeItem(oldNode as VNode);
    insertNewItem(newNode as VNode);
  }
  // both null :-> do nothing
  else if (oldNode.type === "Null" && newNode.type === "Null") return;
  // both Text Nodes :-> update the text
  else if (oldNode.type === "TextNode" && newNode.type === "TextNode") {
    if (oldNode.node!.nodeValue !== newNode.props.content) {
      oldNode.node!.nodeValue = newNode.props.content;
    }
    newNode.node = oldNode.node;
  }
  // both HTMLElement with same tag
  else if (oldNode.type === "Element" && newNode.type === "Element") {
    if (newNode.tag === oldNode.tag) {
      newNode.node = oldNode.node;
      //      patch props,
      // update props form new node
      Object.entries(newNode.props)
        .filter(([k, v]) => oldNode.props[k] !== v)
        .forEach(([key, value]) => {
          if (value === true) newNode.node.setAttribute(key, "");
          else if (value === null || value === undefined || value === false)
            newNode.node.removeAttribute(key);
          else newNode.node.setAttribute(key, value);
        });

      // remove old, obsolate attributes
      Object.entries(oldNode.props)
        .filter(([k, v]) => !newNode.props.hasOwnProperty(k))
        .forEach(([key, value]) => {
          oldNode.node.removeAttribute(key);
        });

      // children => iter and patch
      // old children being modified
      diffAndPatchChildren(oldNode, newNode);
    }
    // tag has changed
    else {
      oldNode.node.replaceWith(newNode.asNode());
    }
  }
  // Fragments
  else if (oldNode.type === "Fragment" && newNode.type === "Fragment") {
    // iterate, diff and patch
    diffAndPatchChildren(oldNode, newNode);
  } else if (oldNode.type === "Root") {
    // iterate, diff and patch
    diffAndPatchChildren(oldNode, newNode);
  }
}

function diffAndPatchChildren(
  oldNode: VNode | RootVNode | VNodeInterface,
  newNode: VNode | RootVNode | VNodeInterface
) {
  oldNode.children.forEach((oldChild, ix) => {
    const newChild = newNode.children[ix];
    if (newChild) diffAndPatch(oldChild, newChild);
    // child was removed
    else {
      removeItem(oldChild);
    }
  });

  // new addition items
  const newItems = newNode.children.slice(oldNode.children.length);
  if (newItems.length) {
    const documentFragment = document.createDocumentFragment();
    newItems.forEach((item) => documentFragment.append(item.asNode()));

    // add to the end of parent node
    if (newNode.node && false) {
      // other one would work the same
      newNode.node.insertBefore(documentFragment, null);
    }
    // or if node is not an element (i.e. a fragment) add after it.
    else {
      // @TODO:  returns items before vnode and their next sibling aka first frag item!

      const [parent, nextSibling] = getParentAndNextSibling(newItems[0]);
      parent.insertBefore(documentFragment, nextSibling);
    }
  }
}

function asVNode(tag: string | Function | undefined, props: JsxProps): VNode {
  console.log("asVNode:", { tag, props });

  if (typeof tag === "function") {
    let result = tag(props);
    if (result instanceof JsxNode || (result && result.asNode)) {
      //console.warn("asVNode with JsxNode");
      return result;
    }
    // big @TODO:
    if (result instanceof Node) {
      return new LiveNodeVNode(result);
      const node = {
        node: undefined,
        tag: "__NODE__",
        type: "?",
        parent: null,
        props: {
          content: result,
        },
        children: [],
        asNode() {
          node.node = result;
          return result;
        },
        diffAndPatch() {
          console.log("__NODE__ 1 diffAndPatch", result);
        },
      };

      return node;
    }

    // null jsx node
    if (!truthy(result)) {
      return new NullVNode( );
    }

    return new TextVNode2(props);
  }

  const { children, ...attr } = props;
  const vNode: VNode = {} as any;
  if (tag) {
    return new ElementVNode2(tag, attr, children); // or simply pass cildren with props

  } else if (!truthy(attr)) {
    const vNode = new NullVNode(); // @TODO: parent
    vNode.parent = this;
    return vNode;
  }
  // no tag (Fragment and Null?)
  else if (children) {
    console.log("Fragment VNode");

    return new FragmentVNode(children);
  }

  // else? // @TODO:?
}

function asVNode2(tag: string | Function | undefined, props: JsxProps): VNode {
  console.log("asVNode:", { tag, props });

  if (typeof tag === "function") {
    let result = tag(props);
    if (result instanceof JsxNode || (result && result.asNode)) {
      //console.warn("asVNode with JsxNode");
      return result;
      return (result as JsxNodeInterface).asVNode();
    }
    // big @TODO:
    if (result instanceof Node) {
      const node = {
        node: undefined,
        tag: "__NODE__",
        type: "?",
        parent: null,
        props: {
          content: result,
        },
        children: [],
        asNode() {
          node.node = result;
          return result;
        },
        diffAndPatch() {
          console.log("__NODE__ 1 diffAndPatch", result);
        },
      };

      return node;
    }

    // null jsx node
    if (!truthy(result)) {
      return new NullVNode({ parent: null });
      const fooNode: VNode = {} as any;
      Object.assign(fooNode, {
        tag: "__NULL__",
        type: "Null",
        tag2: "tag func returned null node",
        node: null,
        parent: null,
        props: {},
        children: [],
        asNode() {
          return null;
        },
        diffAndPatch(newNode: VNode) {
          return diffAndPatch(fooNode, newNode);
        },
      });

      return fooNode;
    }

    return new TextVNode2(props);

    const node = {
      tag: "__TEXT_NODE__",
      type: "TextNode",
      tag1: 1,
      node: null,
      parent: null,
      props: {
        content: result,
      },
      children: [],
      asNode() {
        const textNode = document.createTextNode(result);
        node.node = textNode;
        return textNode;
      },
      diffAndPatch(newNode) {
        console.log(
          "__TEXT_NODE__ 1 diffAndPatch",
          result,
          newNode.props.content
        );

        return diffAndPatch(node, newNode);

        // @TODO both text
        if (result !== newNode.props.content)
          node.node.nodeValue = newNode.props.content;
        // else ?
      },
    };

    return node;
  }

  const { children, ...attr } = props;
  const vNode: VNode = {} as any;
  if (tag) {
    return new ElementVNode2(tag, attr, children); // or simply pass cildren with props
    Object.assign(vNode, {
      tag,
      type: "Element", // where comes Fragemnt?
      tag2: "asVNode - normal return",
      node: null,
      props: attr,
      children: children.flat().map((child) => {
        if (!child) console.log("child nullish", { child, vNode });
        if (child instanceof JsxNode || (child && child.asNode)) {
          const childVNode = child; //child.asVNode();
          childVNode.parent = vNode;
          return childVNode;
        }
        if (child instanceof Node) {
          const node = {
            tag: "__NODE__",
            props: {
              content: child,
            },
            parent: vNode,
            children: [],
            asNode() {
              node.node = child;
              return child;
            },
            diffAndPatch() {
              console.log("__NODE__ diffAndPatch", child);
            },
          };

          return node;
        }

        console.log("@@ map", { child });

        if (child === null || child === false || child === undefined) {
          const childVNode: VNode = {
            tag: "__NULL__",
            type: "Null",
            tag2: "children null node",
            node: null,
            parent: vNode,
            props: {},
            children: [],
            asNode() {
              return document.createDocumentFragment(); //return null;
            },
            diffAndPatch(newNode: VNode) {
              console.log("diff-AndPatch, child node was null", newNode);

              if (newNode.tag === "__NULL__") return;
              const n = newNode.asNode();
              // @TODO: find item before
              //vNode.node
              const newNodeIndex = newNode.parent.children.indexOf(newNode);
              const siblings = newNode.parent.children
                .slice(0, newNodeIndex)
                .reverse();
              const siblingBefore = siblings.find((n: VNode) => n.node);
              console.log({ siblingBefore, siblings, newNodeIndex, newNode });

              if (siblingBefore) {
                siblingBefore.node.insertAdjacentElement("afterend", n);
              } else {
                vNode.node.insertAdjacentElement("afterbegin", n);
                /*(newNode.parent.node as HTMLElement).insertAdjacentElement(
                "afterbegin",
                newNode.asNode()
              );*/
              }
            },
          };

          return childVNode;
        }

        console.log(":::", { child });

        const node = {
          tag: "__TEXT_NODE__",
          type: "TextNode",
          tag2: "children Text node 3",
          node: null,
          parent: vNode,
          props: {
            content: child,
          },
          children: [],
          asNode() {
            const textNode = document.createTextNode(child);
            node.node = textNode;
            console.log(textNode, node);

            return textNode;
          },
          // top level vnode
          diffAndPatch(newNode: VNode) {
            // @TODO both text?
            console.log("change? ", newNode.tag, node.tag);

            if (newNode.tag !== node.tag) {
              const asNode = newNode.asNode();
              console.log({ asNode });

              if (asNode) {
                node.node.replaceWith(asNode);
              } else {
                node.node.parentNode.removeChild(node.node);
              }

              return;
            }
            if (child !== newNode.props.content)
              node.node.nodeValue = newNode.props.content;
            newNode.node = node.node;
            // else ?
          },
        };

        return node;
      }),

      asNode() {
        console.log("asVNode.asNode", { tag, props, vNode });

        const node = asNode(tag, attr, vNode.children)[0];
        vNode.node = node;
        console.log({ node });

        return node;
      },
      // to level
      diffAndPatch(newVNode: VNode) {
        console.log("diffAndPatch");

        return diffAndPatch(vNode, newVNode);

        // ? when?
        if (!newVNode) {
          (vNode.node! as HTMLElement).parentNode!.removeChild(
            vNode.node! as HTMLElement
          );
          return;
        }

        if (newVNode.tag !== tag) {
          const newNode = newVNode.asNode();
          if (vNode.node) {
            if (newNode) (vNode.node! as HTMLElement).replaceWith(newNode);
            else vNode.node.parentNode.removeChild(vNode.node);
          }
          return;
        }

        // @TODO: if special tags

        // update props form new node
        Object.entries(newVNode.props)
          .filter(([k, v]) => props[k] !== v)
          .forEach(([key, value]) => {
            if (value === true) vNode.node.setAttribute(key, "");
            else if (value === null || value === undefined || value === false)
              vNode.node.removeAttribute(key);
            else vNode.node.setAttribute(key, value);
          });

        // remove old, obsolate attributes
        Object.entries(vNode.props)
          .filter(([k, v]) => !newVNode.props.hasOwnProperty(k))
          .forEach(([key, value]) => {
            vNode.node.removeAttribute(key);
          });

        newVNode.node = vNode.node;
        console.log("node update", newVNode, vNode);

        // @TODO: props not attributes

        // children
        vNode.children.forEach((child, ix) =>
          child.diffAndPatch(newVNode.children[ix])
        );
        // @TODO: new children
        for (let i = vNode.children.length; i < newVNode.children.length; i++) {
          vNode.node.insertAdjacentElement(
            "beforeend",
            newVNode.children[i].asNode()
          );
        }
      },
    });
  } else if (!truthy(attr)) {
    return new NullVNode(); // @TODO: parent
  }
  // no tag (Fragment and Null?)
  else if (children) {
    console.log("Fragment VNode");

    return new FragmentVNode(children);

    Object.assign(vNode, {
      tag,
      type: "Fragment", // where comes Fragment?
      tag2: "asVNode - normal return Fragment",
      node: null,
      children: children.flat().map((child) => {
        if (child instanceof JsxNode || (child && child.asNode)) {
          const childVNode = child; //child.asVNode();
          childVNode.parent  = vNode;
          return childVNode;
        }
        if (child instanceof Node) {
          const node = {
            tag: "__NODE__",
            props: {
              content: child,
            },
            parent: vNode,
            children: [],
            asNode() {
              node.node = child;
              return child;
            },
            diffAndPatch() {
              console.log("__NODE__ diffAndPatch", child);
            },
          };

          return node;
        }

        console.log("@@ map 2", { child });

        if (child === null || child === false || child === undefined) {
          const n = new NullVNode(this); // n.paremt =
          return n;

          const childVNode: VNode = {
            tag: "__NULL__",
            type: "Null",
            tag2: "children null node",
            node: null,
            parent: vNode,
            props: {},
            children: [],
            asNode() {
              return null;
            },
            diffAndPatch(newNode: VNode) {
              console.log("diff-AndPatch, child node was null", newNode);

              if (newNode.tag === "__NULL__") return;
              const n = newNode.asNode();
              // @TODO: find item before
              //vNode.node
              const newNodeIndex = newNode.parent.children.indexOf(newNode);
              const siblings = newNode.parent.children
                .slice(0, newNodeIndex)
                .reverse();
              const siblingBefore = siblings.find((n: VNode) => n.node);
              console.log({ siblingBefore, siblings, newNodeIndex, newNode });

              if (siblingBefore) {
                siblingBefore.node.insertAdjacentElement("afterend", n);
              } else {
                vNode.node.insertAdjacentElement("afterbegin", n);
                /*(newNode.parent.node as HTMLElement).insertAdjacentElement(
                  "afterbegin",
                  newNode.asNode()
                );*/
              }
            },
          };

          return childVNode;
        }

        console.log(":::", { child });

        const node = {
          tag: "__TEXT_NODE__",
          type: "TextNode",
          tag2: "children Text node",
          node: null,
          parent: vNode,
          props: {
            content: child,
          },
          children: [],
          asNode() {
            const textNode = document.createTextNode(child);
            node.node = textNode;
            console.log(textNode, node);

            return textNode;
          },
          // top level vnode
          diffAndPatch(newNode: VNode) {
            // @TODO both text?
            console.log("change? ", newNode.tag, node.tag);

            if (newNode.tag !== node.tag) {
              const asNode = newNode.asNode();
              console.log({ asNode });

              if (asNode) {
                node.node.replaceWith(asNode);
              } else {
                node.node.parentNode.removeChild(node.node);
              }

              return;
            }
            if (child !== newNode.props.content)
              node.node.nodeValue = newNode.props.content;
            newNode.node = node.node;
            // else ?
          },
        };

        return node;
      }),

      asNode() {
        console.log("asVNode.asNode", { tag, props, vNode });

        const node = asNode(undefined, {}, vNode.children)[0];
        // vNode.node = node;
        console.log({ node });

        return node;
      },
      // to level
      diffAndPatch(newVNode: VNode) {
        console.log("diffAndPatch");

        return diffAndPatch(vNode, newVNode);
      },
    });
  }

  console.log({ vNode });

  return vNode;
}

/**
 * converts pragma object to html string
 * jsxs is always called when element has more than one child
 *
 * @param {string | Function} tag - tag name or tag class
 * @param {Object | null} props - props for the tag
 */
export function jsxs(
  tag: string | Function,
  props: JsxProps
): JsxNodeInterface {
  let node: Node;
  let jsxNodes: JsxNodeInterface[];
  props.children = props.children.flat(); // @TODO: doc

  // if ref prop is provided, memorize and remove from the html generation process
  const ref: Function | null =
    typeof props.ref === "function" ? props.ref : null;
  if (ref) delete props.ref;
  /*
  const inst = new (class extends JsxNode implements JsxNodeInterface {
    toString() {
      return asHtmlString(tag, this.props);
    }

    asNode() {
      throw new Error("deprecated jsxs");
      [node, jsxNodes] = asNode(tag, this.props);

      return node;
    }
    asVNode() {
      return asVNode(tag, this.props);
    }

    [_callRefs]() {
      if (ref && node) ref(node);

      if (typeof tag === "function") {
        jsxNodes.forEach((nodeItem) => nodeItem[_callRefs]());
      } else if (this.props.children) {
        this.props.children
          .flat()
          .filter(
            (child) => child instanceof JsxNode || (child && child.asNode)
          )
          .forEach((child) => (child as JsxNodeInterface)[_callRefs]());
      }
    }
  })(props);

  const v = inst.asVNode();*/
  return asVNode(tag, props);
  return v;
}

/**
 * converts the fragments object to nodes
 *
 * @param {Object} props
 * @param {Array} props.children - child elements in the fragment
 */
export function Fragment(props: JsxProps) {
  /*const inst = new (class extends JsxNode implements JsxNodeInterface {
    toString() {
      return this.props.children
        .flat()
        .filter(truthy)
        .map((child) =>
          child instanceof Node
            ? getOuterHtml(child)
            : typeof child === "object"
            ? child.toString()
            : sanitize(child)
        )
        .join("");
    }

    asNode() {
      throw new Error("deprecated fragment");
      const fragments = this.props.children
        .flat()
        .filter(truthy)
        .map((item) =>
          item instanceof Node
            ? item
            : item instanceof JsxNode || (item && item.asNode)
            ? item.asNode()
            : item
        );

      const documentFragment = document.createDocumentFragment();

      documentFragment.append(...fragments);
      return documentFragment;
    }

    asVNode() {
      return asVNode(/*"__Fragment__"* / undefined, this.props);
    }

    [_callRefs]() {
      this.props.children
        .filter((child) => child instanceof JsxNode || (child && child.asNode))
        .forEach((child) => (child as JsxNodeInterface)[_callRefs]());
    }
  })(props);*/

  //return inst.asVNode();
  return asVNode(undefined, props);
}

// jsx is called when the element has one or zero children
export function jsx(
  tag: string | Function,
  props: Attributes &
    SpecialAttributes & { children?: string | Node | JsxNodeInterface }
): JsxNodeInterface {
  // @ts-ignore - wrapping the children as array to re-use jsxs method
  props.children = props.hasOwnProperty("children") ? [props.children] : [];

  return jsxs(tag, (props as unknown) as JsxProps);
}

/**
 * render the given markup into the given dom node
 *
 * @param {string|HTMLElement|JSX} markup - html as string, html element or jsx template
 * @param {HTMLElement} domNode - container for the template to be rendered into
 * @param {boolean} [append=false] - should the provided markup be appended to the existing markup, or default replace it
 */
export function render(
  markup: string | HTMLElement | JsxNodeInterface, // @TODO: specific support for Template? (.content.clone)
  domNode: HTMLElement,
  append: boolean = false
) {
  Array.from(document.body.querySelectorAll("*")).forEach(
    (el) => (el.style.background = "#ccffcc")
  );

  refsToCall.splice(0);

  const isReRender = renderedVTrees.has(domNode);
  if (!append && !isReRender) domNode.innerHTML = "";

  if (typeof markup === "string") {
    domNode.insertAdjacentHTML("beforeend", markup); // sanitize?
  } else if (markup instanceof Node) {
    domNode.insertAdjacentElement("beforeend", markup);
  } else if (markup instanceof JsxNode || (markup && markup.asNode)) {
    svgContext = false;

    // RootVNode
    /*const vTree: RootVNode = {} as any;
    Object.assign(vTree, {
      type: "Root",
      node: domNode,
      tag: null,
      parent: null,
      children: [markup], //[markup.asVNode()],
      asNode() {
        return vTree.children[0].asNode();
      },
      toString() {
        return vTree.children[0].toString();
      },
    });
    vTree.children[0].parent  = vTree;*/

    const vTree = new RootVNode2(markup, domNode);

    console.log("###########\n", "vTree:", vTree);

    if (isReRender) {
      console.log("is re-render");
      const oldVTree = renderedVTrees.get(domNode);

      console.log("###########\n", { oldVTree, newVTree: vTree });

      // diff
      oldVTree.diffAndPatch(vTree);
      //diffAndPatch(oldVTree!, vTree);

      renderedVTrees.set(domNode, vTree);
    } else {
      const content = vTree.asNode();
      domNode.append(content);
    }

    renderedVTrees.set(domNode, vTree);

    refsToCall.forEach((cb) => cb());

    ////markup[_callRefs]();
  } else {
    throw new Error("render method called with wrong argument(s)");
  }
}

export function rawHtml(content: string): JsxNodeInterface {
  return new (class extends JsxNode implements JsxNodeInterface {
    toString() {
      return content;
    }

    asNode() {
      const template = document.createElement("template");
      template.innerHTML = content;
      return template.content;
    }
    asVNode() {
      return {};
    }

    [_callRefs]() {
      // noop
    }
  })({} as JsxProps);
}

// vTree

// gotchsas:
// - styles will override (could do: setting each rule individually)

interface VNodeInterface {
  toString(): string;
  asNode(): Node;
  parent: VNode | null;
  children: VNodeInterface[];
  type: string;
  node?: Element | Text;
  getChildrenWithNodes(alwaysAllow: VNode[]): VNode[];
  removeFromDOM(): void;
  diffAndPatch(newNode: VNodeInterface): void;
}

class ElementVNode2 implements VNodeInterface {
  type = "Element";
  node = null as any;

  constructor(
    private tag: string,
    private props: Record<string, any>,
    children: VNode[]
  ) {
    this.children = children.flat().map((child) => {
      if (!child) console.log("child nullish", { child, vNode: this });
      if (child instanceof JsxNode || (child && child.asNode)) {
        const childVNode = child; //child.asVNode();
        childVNode.parent = this;
        return childVNode;
      }
      if (child instanceof Node) {
        const n =  new LiveNodeVNode(child);
        n.parent = this;
        return n;
      }

      console.log("@@ map 3", { child });

      if (!truthy(child)) {
        const childVNode = new NullVNode();
        childVNode.parent = this;


        return childVNode;
      }

      console.log(":::", { child });

      const n = new TextVNode2({ child }); // asVnode
      n.parent = this;
      return n;
      const node = {
        tag: "__TEXT_NODE__",
        type: "TextNode",
        tag2: "children Text node 3",
        node: null,
        parent: vNode,
        props: {
          content: child,
        },
        children: [],
        asNode() {
          const textNode = document.createTextNode(child);
          node.node = textNode;
          console.log(textNode, node);

          return textNode;
        },
        // top level vnode
        diffAndPatch(newNode: VNode) {
          // @TODO both text?
          console.log("change? ", newNode.tag, node.tag);

          if (newNode.tag !== node.tag) {
            const asNode = newNode.asNode();
            console.log({ asNode });

            if (asNode) {
              node.node.replaceWith(asNode);
            } else {
              node.node.parentNode.removeChild(node.node);
            }

            return;
          }
          if (child !== newNode.props.content)
            node.node.nodeValue = newNode.props.content;
          newNode.node = node.node;
          // else ?
        },
      };

      return node;
    });
  }
  toString() {
    return "?";
  }
  asNode() {
    const node = asNode(this.tag, this.props, this.children)[0];
    this.node = node;
    return node;
  }
  // @TODO: doesn't need to be in VNode,
  // basically only the check if it has .node or itter over children (are VNodes! not Nodes)
  getChildrenWithNodes(alwaysAllow: VNode[]) {
    return this.children
      .map((childNode: VNode) => {
        if (alwaysAllow.includes(childNode)) return childNode;
        return childNode.node || childNode.getChildrenWithNodes();
      })
      .flat(Infinity)
      .filter(Boolean) as VNode[];
  }
  removeFromDOM() {
    this.node.parentElement.removeChild(this.node);
  }
  diffAndPatch(newNode: ElementVNode) {
    if (newNode.tag === this.tag) {
      newNode.node = this.node;
      //      patch props,
      // update props form new node
      Object.entries(newNode.props)
        .filter(([k, v]) => this.props[k] !== v)
        .forEach(([key, value]) => {
          if (value === true) newNode.node.setAttribute(key, "");
          else if (value === null || value === undefined || value === false)
            newNode.node.removeAttribute(key);
          else newNode.node.setAttribute(key, value);
        });

      // remove old, obsolate attributes
      Object.entries(this.props)
        .filter(([k, v]) => !newNode.props.hasOwnProperty(k))
        .forEach(([key, value]) => {
          this.node.removeAttribute(key);
        });

      // children => iter and patch
      // old children being modified
      diffAndPatchChildren(this, newNode);
    }
    // tag has changed
    else {
      this.node.replaceWith(newNode.asNode());
    }
  }
}

class FragmentVNode implements VNodeInterface {
  type = "Fragment";
  // parent? @TODO: where will parent be asigned?

  constructor(children: VNodeInterface[]) {
    this.children = children.flat().map((child) => {
      if (child instanceof JsxNode || (child && child.asNode)) {
        const childVNode = child; //child.asVNode();
        childVNode.parent = this;
        return childVNode;
      }
      if (child instanceof Node) {
        const n =  new LiveNodeVNode(child);
        n.parent = this;
        return n;
      }

      console.log("@@ map 2", { child });

      if (!truthy(child)) {
        const childVNode = new NullVNode(); // n.paremt =
        childVNode.parent = this;
        return childVNode;
      }

      console.log(":::", { child });

      const tn = new TextVNode2({ child });
      tn.parent = this;
      return tn;
    });
  }

  asNode() {
    const node = asNode(undefined, {}, this.children)[0];
    // vNode.node = node;
    console.log({ node });

    return node;
  }
  // to level
  diffAndPatch(newVNode: FragmentVNode) {
    console.log("diffAndPatch");

    return diffAndPatchChildren(this, newVNode);
  }

  removeFromDOM() {
    getChildrenWithNodes(this).forEach((node) =>
      node.node!.parentElement!.removeChild(node.node!)
    );
  }
}

class TextVNode2 implements VNodeInterface {
  type = "TextNode";
  node: Text = null as any;
  children = [];
  props: { content: any };
  /**
   *
   */
  constructor({ child }) {
    this.props = { content: child }; //@TODO:
  }

  asNode() {
    const textNode = document.createTextNode(this.props.content);
    this.node = textNode;
    return textNode;
  }

  diffAndPatch(newNode: TextVNode2) {
    this.node.nodeValue = newNode.props.content;
  }

  removeFromDOM() {
    this.node.parentElement!.removeChild(this.node);
  }
}

class NullVNode implements VNodeInterface {
  type = "Null";
  children = [];

  asNode() {
    //return null; // return empty fragment?
    return document.createDocumentFragment();
  }

  diffAndPatch(newNode: NullVNode) {
    return;
  }

  removeFromDOM() {
    return;
  }

  toString() {
    return "";
  }
}

class LiveNodeVNode implements VNodeInterface {
  type = "Node";
  children = [];

  /**
   *
   */
  constructor(node: Node) {
    this.node = node

  }

  asNode() {
    return this.node;
  }

  diffAndPatch(newNode: NullVNode) {
    if (newNode.node !== node) {
      this.node.replaceWith(newNode.node);
    }
  }

  removeFromDOM() {
    this.node.parentElement!.removeChild(this.node);
  }

  toString() {
    return getOuterHtml(this.node);
  }
}

class RootVNode2 implements VNodeInterface {
  type = "Root";
  parent = null;
  node: Element;
  children: VNodeInterface[];
  /**
   *
   */
  constructor(content, domNode: Element) {
    content.parent = this;
    this.children = [content];
    this.node = domNode;
  }

  asNode() {
    return this.children[0].asNode();
  }
  toString() {
    return this.children[0].toString();
  }

  diffAndPatch(newVNode: VNodeInterface) {
    diffAndPatchChildren(this, newVNode);
  }

  removeFromDOM() {
    this.node.remove();
  }
}
