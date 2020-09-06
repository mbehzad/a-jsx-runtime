const renderedVTrees = new WeakMap<HTMLElement, VNode>();
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

interface VNode {
  [key: string]: any;
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
  tag: string | Function,
  props: JsxProps,
  children: any[]
): [Node, JsxNodeInterface[]] {
  console.log("asNode()", { tag, props, children });

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

function asVNode(tag: string | Function, props: JsxProps): VNode {
  if (typeof tag === "function") {
    let result = tag(props);
    if (result instanceof JsxNode) {
      return (result as JsxNodeInterface).asVNode();
    }
    if (result instanceof Node) {
      const node = {
        tag: "__NODE__",
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

    if (!truthy(result)) {
      const fooNode: VNode = {};
      Object.assign(fooNode, {
        tag: "__NULL__",
        tag2: "tag func returned null node",
        node: null,
        parent: null,
        props: {},
        children: [],
        asNode() {
          return null;
        },
        diffAndPatch(newNode: VNode) {
          if (newNode.tag === "__NULL__") return;
          const n = newNode.asNode();

          // @TODO: find item before
          //vNode.node
          const newNodeIndex = newNode.parent.children.indexOf(newNode);
          const siblings = newNode.parent.children
            .slice(0, newNodeIndex)
            .reverse();
          const siblingBefore = siblings.find((n: VNode) => n.node);
          if (siblingBefore) {

            if (n)
            siblingBefore.node.insertAdjacentElement(
              "afterend",
              n
            );
          } else {
            (fooNode.parent.node as HTMLElement).insertAdjacentElement(
              "afterbegin",
              n
            );
            /*(newNode.parent.node as HTMLElement).insertAdjacentElement(
              "afterbegin",
              newNode.asNode()
            );*/
          }
        },
      });

      return fooNode;
    }

    const node = {
      tag: "__TEXT_NODE__",
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
  Object.assign(vNode, {
    tag,
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

      console.log({ child });

      if (child === null || child === false || child === undefined) {
        const childVNode: VNode = {
          tag: "__NULL__",
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
            console.log({siblingBefore, siblings, newNodeIndex, newNode});

            if (siblingBefore) {
              siblingBefore.node.insertAdjacentElement(
                "afterend",
                n
              );
            } else {
              (vNode.node as HTMLElement).insertAdjacentElement(
                "afterbegin",
                n
              );
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
      return node;
    },
    // to level
    diffAndPatch(newVNode: VNode) {
      console.log("diffAndPatch");

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
        (vNode.node as HTMLElement).insertAdjacentElement(
          "beforeend",
          newVNode.children[i].asNode()
        );
      }
    },
  });

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
      return asVNode("__Fragment__", {
        children: props.children,
      } as JsxProps);
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
  Array.from(document.body.querySelectorAll("*")).forEach(el => el.style.outline = "1px dashed red");
  Array.from(document.body.querySelectorAll("*")).forEach(el => el.style.background = "pink");


  const isReRender = renderedVTrees.has(domNode);
  if (!append && !isReRender) domNode.innerHTML = "";

  if (typeof markup === "string") {
    domNode.insertAdjacentHTML("afterbegin", markup);
  } else if (markup instanceof Node) {
    domNode.insertAdjacentElement("afterbegin", markup);
  } else if (markup instanceof JsxNode) {
    svgContext = false;
    const vTree = markup.asVNode();
    console.log("vTree:", vTree);

    if (isReRender) {
      console.log("is re-render");
      const oldVTree = renderedVTrees.get(domNode);

      console.log({ oldVTree, newVTree: vTree });

      // diff
      oldVTree.diffAndPatch(vTree);
      renderedVTrees.set(domNode, vTree);
      return;
    }

    renderedVTrees.set(domNode, vTree);
    const content = vTree.asNode();
    domNode.append(content);
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
