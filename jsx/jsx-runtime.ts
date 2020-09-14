const renderedVTrees = new WeakMap<HTMLElement, RootVNode>();
const refsToCall: Array<() => void> = [];

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

// null when checking the parent when root is fragment itself
function getParentElementNode(vNode: VNodeInterface): ElementVNode {
  while (vNode.parent) {
    vNode = vNode.parent;
    // `.node` is only on "Text" and "Element", "RawHtml" type VNode, and only Element has children
    if (vNode.node) break;
  }

  return (vNode as unknown) as ElementVNode;
}

function getChildrenWithNodes(
  vNode: VNodeInterface,
  alwaysAllow?: VNodeInterface
): VNodeInterface[] {
  vNode.children;
  return vNode.children
    .map((childNode) => {
      if (childNode === alwaysAllow) return childNode;
      if (childNode.node) return childNode;
      return getChildrenWithNodes(childNode, alwaysAllow);
    })
    .flat(Infinity) as VNodeInterface[];
}

function getParentAndNextSibling(vNode: VNodeInterface): [Node, Node | null] {
  // node ancestor with Element,
  const parentWithElement = getParentElementNode(vNode);
  const siblings = getChildrenWithNodes(parentWithElement, vNode);
  const prevSibling = siblings[siblings.indexOf(vNode) - 1];
  const nextSiblingNode = prevSibling ? prevSibling.node!.nextSibling : null;

  return [parentWithElement.node, nextSiblingNode];
}

// jsx and Fragment will return objects which implement this interface
export interface JsxNodeInterface extends JsxNode {
  toString(): string;
  asNode(): Node;
  asVNode(): VNode;
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
function asHtmlString(tag: string | Function, props: JsxProps, children) {
  const attributes = Object.entries(props)
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

  const content = children.map((child) => child.toString()).join("");

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
  children: any[],
  svgContext = false
): [Node, JsxNodeInterface[]] {
  // fragment
  if (!tag) {
    const fragments = children
      .flat() // ?
      .map((item) => item.asNode());

    const documentFragment = document.createDocumentFragment();

    documentFragment.append(...fragments);
    return [documentFragment, []];
  }

  const { ref, ...attrs } = props;

  // remember if the svg context was set for this node, and replace after generating all children

  // currently not supporting the `is` option for Customized built-in elements
  const node = svgContext
    ? document.createElementNS("http://www.w3.org/2000/svg", tag)
    : document.createElement(tag);

  // currently only supporting ref on html elements. not template functions
  // ref is only called when element is created. not when the ref property is changed
  if (typeof ref === "function") {
    refsToCall.push(() => ref(node));
  }

  // add attributes, event listeners etc.
  ElementVNode.addProps(node, attrs);

  // returns child jsx nodes as well to be used during the ref call
  const childJsxNodes = children.filter((child) => child instanceof VNode);

  node.append(
    ...children
      //.flat()
      .map((child) => child.asNode())
  );

  return [node, childJsxNodes as JsxNodeInterface[]];
}

function insertNewItem(newNode: VNodeInterface) {
  const [parent, nextSibling] = getParentAndNextSibling(newNode);
  parent.insertBefore(newNode.asNode(), nextSibling);
}

function diffAndPatchChildren(
  oldNode: VNodeInterface,
  newNode: VNodeInterface
) {
  oldNode.children.forEach((oldChild, ix) => {
    const newChild = newNode.children[ix];
    // child was removed
    if (!newChild) oldChild.removeFromDOM();
    // child is modified
    else if (newChild.type === oldChild.type) oldChild.diffAndPatch(newChild);
    // child is replaced
    else {
      oldChild.removeFromDOM();
      insertNewItem(newChild);
    }
  });

  // new addition items
  const newItems = newNode.children.slice(oldNode.children.length);
  if (newItems.length) {
    const documentFragment = document.createDocumentFragment();
    newItems.forEach((item) => documentFragment.append(item.asNode()));

    const [parent, nextSibling] = getParentAndNextSibling(newItems[0]);
    parent.insertBefore(documentFragment, nextSibling);
  }
}

class VNode {}

interface VNodeInterface {
  toString(): string;
  asNode(): Node;
  parent: VNodeInterface | null;
  children: Array<VNodeInterface | never>;
  type: string;
  node?: ChildNode;
  removeFromDOM(): void;
  diffAndPatch(newNode: VNodeInterface): void;
}

class ElementVNode extends VNode implements VNodeInterface {
  type = "Element";
  tag: string;
  props: Object; // @TODO:
  node: HTMLElement = null as any;
  children: VNodeInterface[];
  parent: VNodeInterface = null as any;
  svgContext: boolean = false; // will be set to true when element is an SVG Element

  constructor({
    tag,
    props,
    children,
  }: {
    tag: string;
    props: Record<string, any>;
    children: Array<VNodeInterface | VNodeInterface[]>;
  }) {
    super();
    this.tag = tag;
    this.props = props;

    this.children = children.map((child) => {
      if (Array.isArray(child)) return new FragmentVNode(child);
      if (child instanceof VNode) return child;
      if (child instanceof Node) return new LiveNodeVNode(child);
      if (!truthy(child)) return new NullVNode();

      return new TextVNode(child);
    });
    this.children.forEach((child) => (child.parent = this));
  }
  toString() {
    return asHtmlString(this.tag, this.props, this.children);
  }

  asNode() {
    let svgContext = false;
    let vNode: VNodeInterface = this;
    while (vNode.parent) {
      if (vNode.tag === "svg") {
        svgContext = true;
        break;
      }
      vNode = vNode.parent;
    }

    this.svgContext = svgContext;
    console.log("svgContext:", this.tag, svgContext);

    const node = asNode(
      this.tag,
      this.props,
      this.children,
      this.svgContext
    )[0];
    this.node = node;

    // memorize for next subtree re-renders
    renderedVTrees.set(node, this);

    return node;
  }
  removeFromDOM() {
    this.node.parentElement.removeChild(this.node);
  }
  diffAndPatch(newNode: ElementVNode) {
    if (newNode.tag === this.tag) {
      newNode.node = this.node;
      // update props and attributes
      ElementVNode.addProps(newNode.node, newNode.props, this.props);

      // children => iter and patch
      // old children being modified
      diffAndPatchChildren(this, newNode);
    }
    // tag has changed
    else {
      this.node.replaceWith(newNode.asNode());
    }

    // memorize for next subtree re-renders
    renderedVTrees.set(this.node, newNode);
  }

  static fromExistingElementNode(
    vNode: ElementVNode,
    children: Array<VNodeInterface | VNodeInterface[]>
  ) {
    const { tag, props, parent, node, svgContext } = vNode;
    const newVNode = new ElementVNode({ tag, props, children });
    Object.assign(newVNode, { parent, node, svgContext });
    return newVNode;
  }

  static addProps(
    element: Element,
    newProps: Record<string, any>,
    oldProps: Record<string, any> = {}
  ) {
    // iterate over all modified new and old properties and set/remove/update them
    Array.from(new Set([...Object.keys(newProps), ...Object.keys(oldProps)]))
      .map((propName) => ({
        propName,
        oldValue: oldProps[propName],
        newValue: newProps[propName],
      }))
      .filter(({ newValue, oldValue }) => newValue !== oldValue)
      .forEach(({ propName, newValue, oldValue }) => {
        // for style as object:
        // (style:) {display: "none", position: "absolute"} ==> 'display: none; position: absolute;'
        if (propName === "style" && typeof newValue === "object")
          newValue = Object.entries(newValue)
            .filter(([, v]) => truthy(v))
            .map(([k, v]) => `${k}: ${v}`)
            .join("; ");

        // (class:) ["btn", "red"] ==> "btn red"
        if (propName === "class" && Array.isArray(newValue))
          newValue = newValue.join(" ");
        // props starting with "on-" are event listeners
        if (
          propName.startsWith("on-") &&
          (typeof newValue === "function" ||
            typeof newValue === "object" ||
            typeof oldValue === "function" ||
            typeof oldValue === "object")
        ) {
          // remove leading "on-""
          const event = propName.replace(/^on-/, "");

          if (typeof newValue === "function" || typeof newValue === "object")
            element.addEventListener(
              event,
              newValue as EventListenerOrEventListenerObject
            );

          if (typeof oldValue === "function" || typeof oldValue === "object")
            element.removeEventListener(
              event,
              oldValue as EventListenerOrEventListenerObject
            );
        }
        // boolean attribute set without value
        else if (newValue === true) element.setAttribute(propName, "");
        // remove old attributes which are false now
        else if (!truthy(newValue)) element.removeAttribute(propName);
        // update to new value as string
        else if (typeof newValue === "string" || typeof newValue === "number")
          element.setAttribute(propName, String(newValue));
        // key has the form of "on-change". value is the callback function or an object implementing {EventListener} interface
        // @ts-ignore - providing the value as property to html element
        else node[propName] = value;
      });
  }
}

class FragmentVNode extends VNode implements VNodeInterface {
  type = "Fragment";
  children: VNodeInterface[];

  constructor(
    children: Array<
      VNodeInterface | ChildNode | string | boolean | null | undefined | number
    >
  ) {
    super();

    this.children = children.map((child) => {
      if (Array.isArray(child)) return new FragmentVNode(child);
      if (child instanceof VNode) return child;
      if (child instanceof Node) return new LiveNodeVNode(child);
      if (!truthy(child)) return new NullVNode();
      return new TextVNode(child as string | number);
    });

    this.children.forEach((child) => (child.parent = this));
  }

  asNode() {
    const node = asNode(undefined, {}, this.children)[0];

    return node;
  }

  toString() {
    return this.children.map((child) => child.toString()).join("");
  }

  // to level
  diffAndPatch(newVNode: FragmentVNode) {
    return diffAndPatchChildren(this, newVNode);
  }

  removeFromDOM() {
    this.children.forEach((child) => child.removeFromDOM());
  }
}

class TextVNode extends VNode implements VNodeInterface {
  type = "TextNode";
  children = [];
  node: Text = null as any;
  props: { content: any };
  parent: VNodeInterface = null as any;

  /**
   *
   */
  constructor(content: string | number | boolean) {
    super();
    this.props = { content }; //@TODO:
  }

  asNode() {
    const textNode = document.createTextNode(this.props.content);
    this.node = textNode;
    return textNode;
  }

  toString() {
    return sanitize(this.props.content);
  }

  diffAndPatch(newNode: TextVNode) {
    this.node.nodeValue = newNode.props.content;
    newNode.node = this.node;
  }

  removeFromDOM() {
    this.node.parentElement!.removeChild(this.node);
  }
}

class NullVNode extends VNode implements VNodeInterface {
  type = "Null";
  children = [];
  parent: VNodeInterface = null as any;
  /**
   *
   */
  constructor() {
    super();
  }

  asNode() {
    //return null; // return empty fragment?
    return document.createDocumentFragment();
  }

  diffAndPatch(newNode2: NullVNode) {
    return;
  }

  removeFromDOM() {
    return;
  }

  toString() {
    return "";
  }
}

class LiveNodeVNode extends VNode implements VNodeInterface {
  type = "Node";
  children = [];
  parent: VNodeInterface = null as any;
  node: ChildNode;

  /**
   *
   */
  constructor(node: ChildNode) {
    super();
    this.node = node;
  }

  asNode() {
    return this.node;
  }

  diffAndPatch(newNode: LiveNodeVNode) {
    if (newNode.node !== this.node) {
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

class RootVNode extends VNode implements VNodeInterface {
  type = "Root";
  parent = null;
  node: Element;
  children: VNodeInterface[];
  /**
   *
   */
  constructor(content: VNodeInterface, domNode: Element) {
    super();
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

function asVNode(
  tag: string | Function | undefined,
  props: JsxProps
): VNodeInterface {
  console.log("asVNode:", { tag, props });

  if (typeof tag === "function") {
    let result = tag(props);
    if (result instanceof VNode) return result;
    if (result instanceof Node) return new LiveNodeVNode(result);
    // null jsx node
    if (!truthy(result)) return new NullVNode();

    return new TextVNode(result);
  }

  const { children, ...attr } = props;
  if (tag) {
    return new ElementVNode({ tag, props: attr, children }); // or simply pass cildren with props
  } else if (!truthy(attr)) {
    const vNode = new NullVNode();
    //vNode.parent = this;
    return vNode;
  } else if (children) {
    return new FragmentVNode(children);
  }

  // else? // @TODO:?
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
  return asVNode(tag, props);
}

/**
 * converts the fragments object to nodes
 *
 * @param {Object} props
 * @param {Array} props.children - child elements in the fragment
 */
export function Fragment(props: JsxProps) {
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

  const isReRender = renderedVTrees.has(domNode);
  if (!append && !isReRender) domNode.innerHTML = "";

  if (typeof markup === "string") {
    domNode.insertAdjacentHTML("beforeend", markup); // sanitize?
  } else if (markup instanceof Node) {
    domNode.insertAdjacentElement("beforeend", markup);
  } else if (markup instanceof VNode) {
    let vTree = new RootVNode(markup, domNode);

    console.log("#################################\n", "vTree:", vTree);

    if (isReRender) {
      console.log("is re-render");
      const oldVTree = renderedVTrees.get(domNode);

      console.log("###########\n", { oldVTree, newVTree: vTree });

      // was previously rendered as a subtree from another render
      if (oldVTree.type === "Element") {
        vTree = ElementVNode.fromExistingElementNode(oldVTree, [markup]);
        oldVTree.diffAndPatch(vTree);
        // update the children property in the memory reference from the previous render,
        // attributes, etc will stay the same
        oldVTree.children = vTree.children;
      } else {
        // diff
        oldVTree.diffAndPatch(vTree);
      }

      renderedVTrees.set(domNode, vTree);
    } else {
      const content = vTree.asNode();
      domNode.append(content);
    }

    renderedVTrees.set(domNode, vTree);

    while (refsToCall.length) {
      // remove first from list, and invoke it
      refsToCall.splice(0, 1)[0]();
    }
  } else {
    throw new Error("render method called with wrong argument(s)");
  }
}

export function rawHtml(content: string): VNodeInterface {
  return new (class extends VNode implements VNodeInterface {
    parent: VNodeInterface = null as any;
    children = [];
    type = "RawHtml";
    childNodes: ChildNode[];
    content: string;
    node?: ChildNode;

    /**
     *
     */
    constructor(content: string) {
      super();
      this.content = content;
    }
    removeFromDOM() {
      this.childNodes.forEach((node) => node.parentElement!.removeChild(node));
    }

    diffAndPatch(newNode: VNodeInterface) {
      if ((newNode.content = this.content)) {
        newNode.node = this.node;
        newNode.childNodes = this.childNodes;
        return;
      }
      this.removeFromDOM();
      insertNewItem(newNode);
    }

    toString() {
      return content;
    }

    asNode() {
      const template = document.createElement("template");
      template.innerHTML = this.content;
      const documentFragment = template.content;
      this.childNodes = Array.from(documentFragment.childNodes);

      // basically the `.node` property is used to determine the last html node of the VNode,
      // to position the next VNode's DOM Node after it.
      // therefore .node returns the last node of the raw html
      if (this.childNodes.length)
        this.node = this.childNodes[this.childNodes.length - 1];
      return documentFragment;
    }
  })(content);
}

// gotchas:
// - styles will override (could do: setting each rule individually)
// - ref : inline func will be recognized as new function

window.renderedVTrees = renderedVTrees;

// TEST CASES
// 1- svg <-> null
// 2- svg -> child
// 3- div <-> Func <-> null
