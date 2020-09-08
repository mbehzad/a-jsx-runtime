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
  while (vNode.parent) {
    vNode = vNode.parent;
    if (vNode.node) return vNode;
  }

  // will never reach
  throw new Error("jsx-runtime: can't find a parent with Element");
}

function getChildElementNodes(
  vNode: VNode,
  alwaysAllow: VNode[] = []
): VNode[] {
  return vNode.children
    .map((childNode: VNode) => {
      if (alwaysAllow.includes(childNode)) return childNode;
      if (childNode.type === "Null") return null;
      if (childNode.type === "Element" || childNode.type === "TextNode")
        return childNode;
      if (childNode.type === "Fragment") return getChildElementNodes(childNode);
      // @TODO: other types (i.e. Live Element)
      return null;
    })
    .flat(Infinity)
    .filter(Boolean) as VNode[];
}

function getSiblings(vNode: VNode) {
  return getChildElementNodes(getParentElementNode(vNode), [vNode]);
}

function getParentAndNextSibling(vNode: VNode): [Node, Node | null] {
  // node ancestor with Element,
  const parentWithElement = getParentElementNode(vNode);
  const siblings = getChildElementNodes(parentWithElement, [vNode]);
  const prevSibling = siblings[siblings.indexOf(vNode) - 1];
  const nextSiblingNode = prevSibling ? prevSibling.node!.nextSibling : null;
  //const nextSiblingNode = nextSibling ? nextSibling.node : null;

  console.log("getParentAndNextSibling:", {
    vNode,
    parentWithElement,
    siblings,
    nextSiblingNode,
    index: siblings.indexOf(vNode),
  });

  return [parentWithElement.node, nextSiblingNode];
  // all flat child nodes +
}

function findPrevSibling(vNode: VNode): VNode | null {
  const siblings = getSiblings(vNode);
  let siblingBefore = siblings[siblings.indexOf(vNode) - 1] || null;
  return siblingBefore;
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
  props: JsxProps,
  children: any[]
): [Node, JsxNodeInterface[]] {
  console.log("asNode()", { tag, props, children });

  // fragment
  if (!tag) {
    const fragments = children
      .flat()
      .filter((n) => n.tag !== "__NULL__")
      //.filter(truthy)
      .map(
        (item) => item.asNode()
        /*item instanceof Node
            ? item
            : item instanceof JsxNode
            ? item.asNode()
            : item*/
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

    if (result instanceof JsxNode) {
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
  const childJsxNodes = children.filter((child) => child instanceof JsxNode);

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
    getChildElementNodes(item).forEach((node) =>
      node.node!.parentElement!.removeChild(node.node!)
    );
  // @TODO: else -> VNode method actually
}

function insertNewItem(newNode: VNode) {
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
  oldNode: VNode | RootVNode,
  newNode: VNode | RootVNode
) {
  oldNode.children.forEach((oldChild, ix) => {
    const newChild = newNode.children[ix];
    if (newChild) diffAndPatch(oldChild, newChild);
    // child was removed
    else {
      removeItem(oldChild);
    }
  });

  const documentFragment = document.createDocumentFragment();
  // new addition items
  for (let i = oldNode.children.length; i < newNode.children.length; i++) {
    if (newNode.children[i].type !== "Null")
      documentFragment.append(newNode.children[i].asNode());
  }
  (newNode.node
    ? newNode.node
    : getParentElementNode(newNode).node
  ).insertBefore(documentFragment, null);
}

function asVNode(tag: string | Function | undefined, props: JsxProps): VNode {
  if (typeof tag === "function") {
    let result = tag(props);
    if (result instanceof JsxNode) {
      return (result as JsxNodeInterface).asVNode();
    }
    // big @TODO:
    if (result instanceof Node) {
      const node = {
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

    /*function getFirstElement(nnn: VNode) {
      if (nnn.type === "Element") return nnn.node;
      if (nnn.type === "Null") return null;
      if (nnn.type === "Fragment") {
        const item = nnn.children.find((n2) => getFirstElement(n2) !== null);
        return item ? item.node : null;
      }
    }*/

    // null jsx node
    if (!truthy(result)) {
      const fooNode: VNode = {};
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

          if (newNode.type === "Null") return;
          const n = newNode.asNode();

          // @TODO: find item before
          //vNode.node
          const siblings = getSiblings(newNode);
          const newNodeIndex = siblings.indexOf(newNode);

          let siblingBefore = siblings[newNodeIndex - 1] || null; // = siblings.find((n: VNode) => n.node);
          /*for (let ii = newNodeIndex - 1; ii >= 0; ii--) {
            const el = getFirstElement(siblings[ii]);
            if (el) {
              siblingBefore = el;
              break;
            }
          }*/
          if (siblingBefore) {
            if (n) siblingBefore.node.insertAdjacentElement("afterend", n);
          } else {
            getParentElementNode(newNode).node.insertAdjacentElement(
              "afterbegin",
              n
            );
          }
        },
      });

      return fooNode;
    }

    const node = {
      tag: "__TEXT_NODE__",
      tpye: "TextNode",
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
  const vNode: VNode = {};
  if (tag) {
    Object.assign(vNode, {
      tag,
      type: "Element", // where comes Fragemnt?
      tag2: "asVNode - normal return",
      node: null,
      props: attr,
      children: children.flat().map((child) => {
        if (child instanceof JsxNode) {
          const childVNode = child.asVNode();
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
  } else {
    Object.assign(vNode, {
      tag,
      type: "Fragment", // where comes Fragemnt?
      tag2: "asVNode - normal return Fragment",
      node: null,
      children: children.flat().map((child) => {
        if (child instanceof JsxNode) {
          const childVNode = child.asVNode();
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

  return new (class extends JsxNode implements JsxNodeInterface {
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
          .filter((child) => child instanceof JsxNode)
          .forEach((child) => (child as JsxNodeInterface)[_callRefs]());
      }
    }
  })(props);
}

/**
 * converts the fragments object to nodes
 *
 * @param {Object} props
 * @param {Array} props.children - child elements in the fragment
 */
export function Fragment(props: JsxProps) {
  return new (class extends JsxNode implements JsxNodeInterface {
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
            : item instanceof JsxNode
            ? item.asNode()
            : item
        );

      const documentFragment = document.createDocumentFragment();

      documentFragment.append(...fragments);
      return documentFragment;
    }

    asVNode() {
      return asVNode(/*"__Fragment__"*/ undefined, this.props);
    }

    [_callRefs]() {
      this.props.children
        .filter((child) => child instanceof JsxNode)
        .forEach((child) => (child as JsxNodeInterface)[_callRefs]());
    }
  })(props);
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
  } else if (markup instanceof JsxNode) {
    svgContext = false;

    // RootVNode
    const vTree: RootVNode = {} as any;
    Object.assign(vTree, {
      type: "Root",
      node: domNode,
      tag: null,
      parent: null,
      children: [markup.asVNode()],
      asNode() {
        return vTree.children[0].asNode();
      },
      toString() {
        return vTree.children[0].toString();
      },
    });
    vTree.children[0].parent = vTree;

    console.log("###########\n", "vTree:", vTree);

    if (isReRender) {
      console.log("is re-render");
      const oldVTree = renderedVTrees.get(domNode);

      console.log("###########\n", { oldVTree, newVTree: vTree });

      // diff
      //oldVTree.diffAndPatch(vTree);
      diffAndPatch(oldVTree!, vTree);

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
