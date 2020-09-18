/**
 * provides functions needed by babel for a custom pragma
 * to render parsed jsx code to html,
 * diff and patch in subsequent renders
 */

// a map between v-trees and rendered DOM nodes / containers
const renderedVTrees = new WeakMap<Element, RootVNode | ElementVNode>();
// list of `ref` callbacks to be called after the DOM nodes are rendered
const refsToCall: Array<() => void> = [];

// props which will be rendered as attributes
// Functions will be used for event listeners. (with attribute name starting with 'on-')
// Object will be set as property on the rendered node element
type Attributes = {
  [key: string]: string | boolean | number | Function | Object;
};

// additional attributes which can have additional serialization before rendering as attributes
type SpecialAttributes = {
  class?: string | string[];
  style?: string | { [key: string]: string };
  ref?: Function;
};

// types of children which will be passed by the jsx parser plugin
// nested array in case of
// <elem>
//   <span/>
//   {children}
//   text
//   <div/>
// </elem>
type JSXChild =
  | VNodeInterface
  | Node
  | string
  | number
  | boolean
  | null
  | undefined
  | JSXChild[];

// child elements in the jsx markup which will be passed to the h function as `props.children`
type ChildrenProps = {
  children: JSXChild[];
};

/**
 * props object which will be passed to jsx pragma and custom component functions
 */
type JsxProps = Attributes & SpecialAttributes & ChildrenProps;

/**
 * return the closest ancestor of the given VNode which has an DOM Element (i.e. is not a Fragment)
 * @param vNode {VNodeInterface}
 */
function getParentElementNode(vNode: VNodeInterface): ElementVNode {
  while (vNode.parent) {
    vNode = vNode.parent;
    if (vNode.node) break;
  }

  // `.node` is only on "Text" and "Element", "RawHtml" type VNode, and only Element has children
  return (vNode as unknown) as ElementVNode;
}

/**
 * for the given v-node all children are traversed till children with DOM nodes are found
 *
 * @param {VNodeInterface} vNode - parent node
 * @param {VNodeInterface} [alwaysAllow] - always contain the provided node in the returned list, even if it is not an element with DOM Node
 * @returns {VNodeInterface[]}
 */
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

/**
 * returns a tuple of the closest ancestor which has a DOM Node,
 * and the node which has a DOM node and is rendered as the next sibling for the provided node in the DOM.
 * Or null when it is the last child itsel
 *
 * @param {VNodeInterface} vNode
 * @returns {([Node, Node | null])}
 */
function getParentAndNextSibling(vNode: VNodeInterface): [Node, Node | null] {
  // node ancestor with Element,
  const parentWithElement = getParentElementNode(vNode);
  const siblings = getChildrenWithNodes(parentWithElement, vNode);
  const prevSibling = siblings[siblings.indexOf(vNode) - 1];
  const nextSiblingNode = prevSibling ? prevSibling.node!.nextSibling : null;

  return [parentWithElement.node, nextSiblingNode];
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
function asHtmlString(
  tag: string | Function,
  props: Attributes & SpecialAttributes,
  children: VNodeInterface[]
) {
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
 * generates HTML Node elements from the provided jsx item
 * @param tag {string|Function} - tag argument of the jsx call
 * @param props {Object} - props argument of jsx call
 */
function asNode<T extends Node>(
  tag: string | undefined,
  props: Attributes & SpecialAttributes,
  children: VNodeInterface[],
  svgContext = false
): Element | DocumentFragment {
  // fragment
  if (!tag) {
    const fragments = children.map((item) => item.asNode());

    const documentFragment = document.createDocumentFragment();

    documentFragment.append(...fragments);
    return documentFragment;
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

  node.append(
    ...children
      //.flat()
      .map((child) => child.asNode())
  );

  return node;
}

/**
 * renders the HTML for the given V-Node and adds to the DOM at the correct position
 * @param newNode - vNode to be rendered as HTML Node and added to DOM
 */
function insertNewItem(newNode: VNodeInterface) {
  const [parent, nextSibling] = getParentAndNextSibling(newNode);
  parent.insertBefore(newNode.asNode(), nextSibling);
}

/**
 * iterate over all the children of the provided nodes, and each pairwise
 *
 * @param {VNodeInterface} oldNode - v-node from the old render
 * @param {VNodeInterface} newNode- v-node from the new tree which its children have to replace the children of the old node
 */
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

// base class which will be inherited from jsx and fragments function node generation
// and will be used to distinguish them with other Elements
class VNode {}

// Interface which will be implemented by all types of nodes in the V-DOM Tree
interface VNodeInterface {
  // the html content as string, which allows to use as `el.innerHTML = <div>...</div>`
  toString(): string;
  // creates HTML Nodes (HTMLElement, SVGElement, DocumentFragment and Text node) for the V-Tree
  asNode(): Node;
  // reference to the parent V-Node of this V-Node. (i.e. this node was the child element in jsx)
  // null in case of the root element from the render tree
  parent: VNodeInterface | null;
  // list of V-Node converted child element from jsx code
  children: Array<VNodeInterface | never>;
  // e.g. text, html element, null etc
  type: string;
  // reference to the created HTML element for this V-Node
  node?: Node;
  // removes all HTML Elements which were rendered as part of this V-Node or its children from jsx code
  removeFromDOM(): void;
  // update the DOM node which were rendered for this v-node and it's children
  // to reflect all changes coming from the new V-Node
  diffAndPatch(newNode: VNodeInterface): void;
}

// V-Node which will be rendered as HTMLElement or SVGElement
class ElementVNode extends VNode implements VNodeInterface {
  type = "Element";
  tag: string;
  props: Attributes & SpecialAttributes;
  node: Element = null as any;
  children: VNodeInterface[];
  parent: VNodeInterface = null as any;
  svgContext: boolean = false; // will be set to true when element is an SVG Element

  constructor({
    tag,
    props,
    children,
  }: {
    tag: string;
    props: Attributes & SpecialAttributes;
    children: JSXChild[];
  }) {
    super();
    this.tag = tag;
    this.props = props;

    // convert child jsx content to VNodes
    this.children = children.map((child) => {
      if (Array.isArray(child)) return new FragmentVNode(child);
      if (child instanceof VNode) return child as VNodeInterface;
      if (child instanceof Node) return new LiveNodeVNode(child);
      if (!truthy(child)) return new NullVNode();

      return new TextVNode(child as string | number | true);
    });
    // set parent property on all children
    this.children.forEach((child) => (child.parent = this));
  }

  toString() {
    return asHtmlString(this.tag, this.props, this.children);
  }

  asNode() {
    // traverse the VTree to check if this element is rendered inside an svg element
    let svgContext = false;
    let vNode: VNodeInterface = this;
    while (vNode.parent) {
      if (vNode.tag === "svg") {
        svgContext = true;
        break;
      }
      vNode = vNode.parent;
    }

    // store the svg context information to the property to allow using it when the v-node is cloned
    this.svgContext = svgContext;

    const node = asNode(
      this.tag,
      this.props,
      this.children,
      this.svgContext
    ) as Element;
    this.node = node;

    // memorize for next subtree re-renders
    renderedVTrees.set(node, this);

    return node;
  }

  removeFromDOM() {
    this.node.parentElement!.removeChild(this.node);
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
        else element[propName] = newValue; // @TODO: remove old obj when new is null:: new null -> old: str? -> removeAtt, event? : removeEv, obj?: [prop] = undef
      });
  }
}

// V-Node for the Fragment element in jsx (`<></>`) or when an array is placed directly in jsx children (e.g. `<elem>{[list]}</elem>`)
class FragmentVNode extends VNode implements VNodeInterface {
  type = "Fragment";
  children: VNodeInterface[];
  parent: VNodeInterface = null as any;

  constructor(children: JSXChild[]) {
    super();

    this.children = children.map((child) => {
      if (Array.isArray(child)) return new FragmentVNode(child);
      if (child instanceof VNode) return child as VNodeInterface;
      if (child instanceof Node) return new LiveNodeVNode(child);
      if (!truthy(child)) return new NullVNode();
      return new TextVNode(child as string | number | true);
    });

    this.children.forEach((child) => (child.parent = this));
  }

  asNode() {
    const node = asNode(undefined, {}, this.children) as DocumentFragment;

    return node;
  }

  toString() {
    return this.children.map((child) => child.toString()).join("");
  }

  diffAndPatch(newVNode: FragmentVNode) {
    return diffAndPatchChildren(this, newVNode);
  }

  removeFromDOM() {
    this.children.forEach((child) => child.removeFromDOM());
  }
}

// V-Node for items which be rendered as text (string, number,.. )
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

// V-Node for `null`, `false` or `undefined` in jsx elements
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

// V-Node when a live HTMLElement was refernced in jsx (e.g. `<div>{document.getElementById("comp")}</div>`)
class LiveNodeVNode extends VNode implements VNodeInterface {
  type = "Node";
  children = [] as VNodeInterface[];
  parent: VNodeInterface = null as any;
  node: Node;

  /**
   *
   */
  constructor(node: Node) {
    super();
    this.node = node;
  }

  asNode() {
    return this.node;
  }

  diffAndPatch(newNode: LiveNodeVNode) {
    if (newNode.node !== this.node) {
      (this.node as ChildNode).replaceWith(newNode.node);
    }
  }

  removeFromDOM() {
    this.node.parentElement!.removeChild(this.node);
  }

  toString() {
    return getOuterHtml(this.node);
  }
}

// wrapper V-Node which references the HTML Node which itself is not rendered by jsx, but its content.
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

// generate the V-Nodes and V-Tree based on the objects parsed by the jsx babel plugin
function asVNode(
  tag: string | Function | undefined,
  props: JsxProps
): VNodeInterface {
  if (typeof tag === "function") {
    let result = tag(props);
    if (result instanceof VNode) return result as VNodeInterface;
    if (result instanceof Node) return new LiveNodeVNode(result);
    // null jsx node
    if (!truthy(result)) return new NullVNode();

    return new TextVNode(result);
  }

  const { children, ...attr } = props;

  return tag
    ? new ElementVNode({ tag, props: attr, children })
    : new FragmentVNode(children);
}

/**
 * converts pragma object to html string
 * jsxs is always called when element has more than one child
 *
 * @param {string | Function} tag - tag name or tag class
 * @param {Object | null} props - props for the tag
 */
export function jsxs(tag: string | Function, props: JsxProps): VNodeInterface {
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
  props: Attributes & SpecialAttributes & { children?: JSXChild }
): VNodeInterface {
  // @ts-ignore - wrapping the children as array to re-use jsxs method
  props.children = props.hasOwnProperty("children") ? [props.children] : [];

  return jsxs(tag, props as JsxProps);
}

/**
 * render the given markup into the given HTML node
 *
 * @param {string|HTMLElement|JSX} markup - html as string, html element or jsx template
 * @param {HTMLElement} domNode - container for the template to be rendered into
 * @param {boolean} [append=false] - should the provided markup be appended to the existing markup, or default replace it
 */
export function render(
  markup:
    | string
    | number
    | null
    | boolean
    | undefined
    | HTMLElement
    | VNodeInterface, // @TODO: specific support for Template? (.content.clone)
  domNode: HTMLElement,
  append: boolean = false
) {
  Array.from(document.body.querySelectorAll("*")).forEach(
    (el) => (el.style.background = "#ccffcc")
  );

  // the content of the given DOM Node was already rendered by jsx-runtime, and it only needs to be updated
  const isReRender = renderedVTrees.has(domNode);

  if (
    typeof markup === "string" ||
    typeof markup === "number" ||
    markup === true
  ) {
    markup = new TextVNode(markup);
  } else if (markup instanceof Node) {
    markup = new LiveNodeVNode(markup);
  } else if (markup === undefined || markup === null || markup === false) {
    markup = new NullVNode();
  }

  if (markup instanceof VNode) {
    let vTree;

    if (!append && !isReRender) domNode.innerHTML = "";

    if (isReRender) {
      const oldVTree = renderedVTrees.get(domNode)!;

      // was previously rendered as a subtree from another render
      if (oldVTree.type === "Element") {
        vTree = ElementVNode.fromExistingElementNode(oldVTree as ElementVNode, [
          markup,
        ]);
        (oldVTree as ElementVNode).diffAndPatch(vTree);
        // update the children property in the memory reference from the previous render,
        // attributes, etc will stay the same
        oldVTree.children = vTree.children;
      } else {
        vTree = new RootVNode(markup, domNode);
        // diff and patch DOM based on the last render
        (oldVTree as RootVNode).diffAndPatch(vTree);
      }
    }
    // first time render
    else {
      vTree = new RootVNode(markup, domNode);
      domNode.append(vTree.asNode());
    }

    // memorize the V-Tree which rendered the current DOM, to use it in future re-renders
    renderedVTrees.set(domNode, vTree);

    // call all ref callbacks found during creation of new nodes during render
    while (refsToCall.length) {
      // remove first from list, and invoke it
      refsToCall.splice(0, 1)[0]();
    }
  } else {
    throw new Error("render method called with wrong argument(s)");
  }
}

/**
 * the provided string will be rendered as markup and not escaped / sanitized.
 * Use this with caution because theoretically it allows broken html or even xss attacks
 *
 *
 * @export
 * @param {string} content - html as string which needs to be rendered
 * @returns {VNodeInterface}
 * @example
 * `<article>{ rawHtml(richText) }</article>`
 */
export function rawHtml(content: string): VNodeInterface {
  return new (class RawHtml extends VNode implements VNodeInterface {
    parent: VNodeInterface = null as any;
    children = [];
    type = "RawHtml";
    childNodes: ChildNode[] = null as any;
    content: string;
    node?: Node;

    constructor(content: string) {
      super();
      this.content = content;
    }

    removeFromDOM() {
      this.childNodes.forEach((node) => node.parentElement!.removeChild(node));
    }

    // simple re-renders without diffing and patching in case of modified content
    diffAndPatch(newNode: RawHtml) {
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
