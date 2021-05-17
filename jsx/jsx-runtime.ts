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
  [key: string]: string | boolean | number | undefined | null | Function | Object;
};

// additional attributes which can have additional serialization before rendering as attributes
type SpecialAttributes = {
  class?: string | string[];
  style?: string | { [key: string]: string };
  _ref?: Function;
  _key?: string;
  _slot?: string;
};

// types of children which will be passed by the jsx parser plugin
// nested array in case of
// <elem>
//   <span/>
//   {children}
//   text
//   <div/>
// </elem>
type JSXChild = VNodeInterface | Node | string | number | boolean | null | undefined | JSXChild[];

// child elements in the jsx markup which will be passed to the h function as `props.children`
type ChildrenProps = {
  children?: JSXChild;
};

/**
 * props object which will be passed to jsx pragma and custom component functions
 */
export type JsxProps = Attributes & SpecialAttributes & ChildrenProps;

/**
 * return the closest ancestor of the given VNode which has an DOM Element (i.e. is not a Fragment)
 * @param vNode {VNodeInterface}
 */
function getParentElementNode(vNode: VNodeInterface): ElementVNode {
  while (vNode.parent) {
    vNode = vNode.parent;
    if (vNode.node) break;
  }

  // `.node` is only on "Text" and "Element" type VNode, and only Element has children
  return (vNode as unknown) as ElementVNode;
}

/**
 * for the given v-node all children are traversed till children with DOM nodes are found
 *
 * @param {VNodeInterface} vNode - parent node
 * @param {VNodeInterface} [alwaysAllow] - always contain the provided node in the returned list, even if it is not an element with DOM Node
 * @returns {VNodeInterface[]}
 */
function getChildrenWithNodes(vNode: VNodeInterface, alwaysAllow?: VNodeInterface): VNodeInterface[] {
  return vNode.children
    .map(childNode => {
      if (childNode === alwaysAllow) return childNode;
      if (childNode.node) return childNode;
      return getChildrenWithNodes(childNode, alwaysAllow);
    })
    .flat(Infinity) as VNodeInterface[];
}

/**
 * returns a tuple of the closest ancestor which has a DOM Node,
 * and the node which has a DOM node and is rendered as the next sibling for the provided node in the DOM.
 * Or null when it is the last child itself
 *
 * @param {VNodeInterface} vNode
 * @returns {([Node, Node | null])}
 */
function getParentAndNextSibling(vNode: VNodeInterface): [Node, Node | null] {
  // node ancestor with Element,
  const parentWithElement = getParentElementNode(vNode);
  const siblings = getChildrenWithNodes(parentWithElement, vNode);

  const indexOfNodeInSiblingsList = siblings.indexOf(vNode);

  // no prev sibling, put before any other element (or null if parent has no children yet)
  if (indexOfNodeInSiblingsList === 0) {
    return [parentWithElement.node, parentWithElement.node.firstChild];
  }

  const prevSibling = siblings[indexOfNodeInSiblingsList - 1];
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
  div.textContent = text;
  return div.innerHTML;
}

/**
 * makes sure children is alway an array
 * @param children {JSXChild} - i.e. props.children from a jsx call
 * @returns {JSXChild[]}
 */
function normalizeChildren(children: JSXChild): JSXChild[] {
  if (typeof children === "undefined") return [];
  if (Array.isArray(children)) return children;
  return [children];
}

/**
 * basically `Element.outerHTML` but also supports Text node and DocumentFragment
 * @param element {Node} - element which its html needs to be returned
 */
function getOuterHtml(element: Node): string {
  if (element instanceof Element) return element.outerHTML;
  if (element instanceof Text) return sanitize(element.wholeText);
  if (element instanceof DocumentFragment) {
    return Array.from(element.childNodes)
      .map(el => getOuterHtml(el))
      .join("");
  }

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
function asHtmlString(tag: string | Function, props: Attributes & SpecialAttributes, children: VNodeInterface[]) {
  const attributes = Object.entries(props)
    .filter(([, value]) => truthy(value))
    .map(([key, value]) => {
      // e.g. disabled: true => <tag disabled>
      if (value === true) return key;

      // for style as object:
      // (style:) {display: "none", position: "absolute"} ==> 'display: none; position: absolute;'
      if (key === "style" && typeof value === "object") {
        value = Object.entries(value!)
          // ignore stuff like `{background: active && "red"}` when `active === false / null / undefined`
          .filter(([, v]) => truthy(v))
          // currently supports "background-color" not "backgroundColor"
          .map(([k, v]) => `${k}: ${v}`)
          .join("; ");
      }

      // (class:) ["btn", "red"] ==> "btn red"
      if (key === "class" && Array.isArray(value)) value = value.join(" ");

      return `${key}="${value}"`;
    })
    .join(" ");

  const content = children.map(child => child.toString()).join("");

  return `<${tag} ${attributes}>${content}</${tag}>`;
}

/**
 * generates HTML Node elements from the provided jsx item
 * @param tag {string|Function} - tag argument of the jsx call
 * @param props {Object} - props argument of jsx call
 */
function asNode(
  tag: string | undefined,
  props: Attributes & SpecialAttributes,
  children: VNodeInterface[],
  svgContext = false,
): Element | DocumentFragment {
  // fragment
  if (!tag) {
    const fragments = children.map(item => item.asNode());

    const documentFragment = document.createDocumentFragment();

    documentFragment.append(...fragments);
    return documentFragment;
  }

  // remember if the svg context was set for this node, and replace after generating all children

  // currently not supporting the `is` option for Customized built-in elements
  const node = svgContext ? document.createElementNS("http://www.w3.org/2000/svg", tag) : document.createElement(tag);

  // add attributes, event listeners etc.
  ElementVNode.addProps(node, props);

  node.append(
    ...children
      // .flat()
      .map(child => child.asNode()),
  );

  return node;
}

function initializeJSXChildren(children: JSXChild[]) {
  const childrenVNodes = children.map(child => {
    if (Array.isArray(child)) return new FragmentVNode(child);
    if (child instanceof VNode) return child as VNodeInterface;
    if (child instanceof Node) return new LiveNodeVNode(child);
    if (!truthy(child)) return new NullVNode();
    return new TextVNode(child as string | number | true);
  });

  return childrenVNodes;
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
function diffAndPatchChildren(oldNode: VNodeInterface, newNode: VNodeInterface) {
  const oldChildren = oldNode.children.map((vnode, index) => ({
    vnode,
    index,
    key: vnode.key,
    used: false,
  }));

  const newChildren = newNode.children.map((vnode, index) => ({
    vnode,
    index,
    key: vnode.key,
  }));

  newChildren.forEach((newChild) => {
    const key = newChild.key;
    let oldChild;
    if (key !== undefined) oldChild = oldChildren.find(child=>child.key === key);

    if (!oldChild) {
      // first from the list which has not a key
      // (even if in the new list there is not an item with the same key, don't recycle that item)
      oldChild = oldChildren.find(child => child.key === undefined && child.used === false);
    }

    // no vnode from the old list was found which can be used for diff & patching
    if (!oldChild) {
      insertNewItem(newChild.vnode);
    }
    // diff & patch
    else {
      oldChild.used = true;
      // child is modified -> diff & patch
      if (newChild.vnode.type === oldChild.vnode.type) oldChild.vnode.diffAndPatch(newChild.vnode);
      // child is replaced -> won't be able to patch vnode from different types
      else {
        oldChild.vnode.removeFromDOM();
        insertNewItem(newChild.vnode);
      }
    }
  });

  // remove obsolete dom elements
  oldChildren.forEach(oldChild => {
    if (!oldChild.used) oldChild.vnode.removeFromDOM()
  })

}

// base class which will be inherited from jsx and fragments function node generation
// and will be used to distinguish them with other Elements
class VNode {}

// Interface which will be implemented by all types of nodes in the V-DOM Tree
export interface VNodeInterface {
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
  // will be used for diff & patching a list of items with a previous rendered list
  key?: string;
  // host's slot's name which will be replaced by this node
  slot?: string;
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
  slot?: string; // {@link VNodeInterface.slot}

  constructor({ tag, props, children }: { tag: string; props: Attributes & SpecialAttributes; children: JSXChild[] }) {
    super();
    this.tag = tag;
    this.props = props;
    this.children = initializeJSXChildren(children);
    // set parent property on all children
    this.children.forEach(child => (child.parent = this));
  }

  toString() {
    return asHtmlString(this.tag, this.props, this.children);
  }

  asNode() {
    // traverse the VTree to check if this element is rendered inside an svg element
    let svgContext = false;
    let vNode: VNodeInterface = this;
    while (vNode.parent) {
      // @ts-ignore - ElementVNode has the tag property, other are undefined
      if (vNode.tag === "svg") {
        svgContext = true;
        break;
      }
      vNode = vNode.parent;
    }

    // store the svg context information to the property to allow using it when the v-node is cloned
    this.svgContext = svgContext;

    const node = asNode(this.tag, this.props, this.children, this.svgContext) as Element;
    this.node = node;

    // memorize for next subtree re-renders
    renderedVTrees.set(node, this);

    return node;
  }

  removeFromDOM() {
    if (this.node.parentNode) {
      this.node.parentNode.removeChild(this.node);
    } else {
      console.warn("jsx-runtime: can't remove", this);
    }
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

  static fromExistingElementNode(vNode: ElementVNode, children: Array<VNodeInterface | VNodeInterface[]>) {
    const { tag, props, parent, node, svgContext } = vNode;
    const newVNode = new ElementVNode({ tag, props, children });
    Object.assign(newVNode, { parent, node, svgContext });
    return newVNode;
  }

  static addProps(element: Element, newProps: Record<string, any>, oldProps?: Record<string, any>) {
    const isDiff = typeof oldProps !== "undefined";
    if (!isDiff) oldProps = {};

    // iterate over all modified new and old properties and set/remove/update them
    Array.from(new Set([...Object.keys(newProps), ...Object.keys(oldProps!)]))
      .map(propName => ({
        propName,
        oldValue: oldProps![propName],
        newValue: newProps[propName],
      }))
      .filter(({ newValue, oldValue }) => newValue !== oldValue)
      .forEach(({ propName, newValue, oldValue }) => {
        // for style as object:
        // (style:) {display: "none", position: "absolute"} ==> 'display: none; position: absolute;'
        if (propName === "style" && typeof newValue === "object") {
          newValue = Object.entries(newValue)
            .filter(([, v]) => truthy(v))
            .map(([k, v]) => `${k}: ${v}`)
            .join("; ");
        }

        // (class:) ["btn", "red"] ==> "btn red"
        if (propName === "class" && Array.isArray(newValue)) {
          newValue = newValue.join(" ");
        }
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

          // key has the form of "on-change". value is the callback function or an object implementing {EventListener} interface
          if (typeof newValue === "function" || typeof newValue === "object") {
            element.addEventListener(event, newValue as EventListenerOrEventListenerObject);
          }

          if (typeof oldValue === "function" || typeof oldValue === "object") {
            element.removeEventListener(event, oldValue as EventListenerOrEventListenerObject);
          }
        } else if (propName === "_ref" && typeof newValue === "function") {
          refsToCall.push(() => newValue(element));
        } // old ref isn't unset
        // the `checked` and `value` attribute on input elements will update the `defaultChecked` and `defaultValue` property.
        // also possible to test if class has the property and always set it via prop instead of attribute
        // but there are some ready only properties. and unclear if our custom elements always have a setter when there is a getter for some props
        else if (isDiff && (propName === "checked" || propName === "value")) {
          // @ts-ignore - e.g. input elements need checked set as property not only attribute when it is changes
          element[propName] = newValue;
        }
        // boolean attribute set without value
        else if (newValue === true) element.setAttribute(propName, "");
        // remove old attributes which are false now
        else if (!truthy(newValue)) element.removeAttribute(propName);
        // update to new value as string
        else if (typeof newValue === "string" || typeof newValue === "number") {
          element.setAttribute(propName, String(newValue));
        }
        // @ts-ignore - providing the value as property to html element
        else element[propName] = newValue;
      });
  }
}

// V-Node for the Fragment element in jsx (`<></>`) or when an array is placed directly in jsx children (e.g. `<elem>{[list]}</elem>`)
class FragmentVNode extends VNode implements VNodeInterface {
  type = "Fragment";
  children: VNodeInterface[];
  parent: VNodeInterface = null as any;
  slot?: string; // {@link VNodeInterface.slot}

  constructor(children: JSXChild[]) {
    super();

    this.children = initializeJSXChildren(children);
    // set parent property on all children
    this.children.forEach(child => (child.parent = this));
  }

  asNode() {
    const node = asNode(undefined, {}, this.children) as DocumentFragment;

    return node;
  }

  toString() {
    return this.children.map(child => child.toString()).join("");
  }

  diffAndPatch(newVNode: FragmentVNode) {
    return diffAndPatchChildren(this, newVNode);
  }

  removeFromDOM() {
    this.children.forEach(child => child.removeFromDOM());
  }
}

// V-Node for items which be rendered as text (string, number,.. )
class TextVNode extends VNode implements VNodeInterface {
  type = "TextNode";
  children = [];
  node: Text = null as any;
  props: { content: any };
  parent: VNodeInterface = null as any;
  slot?: string; // {@link VNodeInterface.slot}

  /**
   *
   */
  constructor(content: string | number | boolean) {
    super();
    this.props = { content };
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
    this.node.parentNode!.removeChild(this.node);
  }
}

// V-Node for `null`, `false` or `undefined` in jsx elements
class NullVNode extends VNode implements VNodeInterface {
  type = "Null";
  children = [];
  parent: VNodeInterface = null as any;
  slot?: string; // {@link VNodeInterface.slot}

  constructor() {
    super();
  }

  asNode() {
    // return null; // return empty fragment?
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
  slot?: string; // {@link VNodeInterface.slot}

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
function asVNode(tag: string | Function | undefined, {_key: key, _slot: slot, ...props}: JsxProps): VNodeInterface {

  if (typeof tag === "function") {
    let ref: Function | undefined = undefined;
    if (props._ref) {
      ref = props._ref;
      delete props._ref;
    }
    const result = tag(props);
    let resultVNode: VNodeInterface;
    if (result instanceof VNode) {
      if (typeof ref === "function") {
        refsToCall.push(() => {
          // @ts-ignore node property might exist or not. this is checked here
          const vNode = result.node ? result : getChildrenWithNodes(result as VNodeInterface)[0];

          // @ts-ignore vNode with node is returned
          if (vNode) ref!(vNode.node);
        });
      }
      if (typeof key !== "undefined") (result as VNodeInterface).key = key;

      resultVNode = result as VNodeInterface;
    }
    else if (result instanceof Node) resultVNode = new LiveNodeVNode(result);
    // null jsx node
    else if (!truthy(result)) resultVNode = new NullVNode();
    else resultVNode = new TextVNode(result);

    if (typeof slot !== "undefined") resultVNode.slot = slot;

    return resultVNode;
  }

  const { children: propsChildren, ...attr } = props;
  // make sure children is always an array
  const children: JSXChild[] = normalizeChildren(propsChildren);

  const vNode = tag ? new ElementVNode({ tag, children, props: attr }) : new FragmentVNode(children);

  if (typeof slot !== "undefined") vNode.slot = slot;
  if (typeof key !== "undefined") (vNode as VNodeInterface).key = key;

  return vNode;
}

// jsx is called when the element has one or zero children
export function jsx(tag: string | Function, props: JsxProps): VNodeInterface {
  return asVNode(tag, props);
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

/**
 * render the given markup into the given HTML node
 *
 * @param {JSXChild} markup - html as string, html element or jsx template
 * @param {HTMLElement} domNode - container for the template to be rendered into
 * @param {boolean} [append=false] - should the provided markup be appended to the existing markup, or default replace it
 */
export function render(
  markup: string | number | null | boolean | undefined | HTMLElement | VNodeInterface,
  domNode: HTMLElement,
  append: boolean = false,
) {
  // the content of the given DOM Node was already rendered by jsx-runtime, and it only needs to be updated
  const isReRender = renderedVTrees.has(domNode);

  if (typeof markup === "string" || typeof markup === "number" || markup === true) {
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
        vTree = ElementVNode.fromExistingElementNode(oldVTree as ElementVNode, [markup]);
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

// provides component to autonomous update its content when provided promise resolved
export class SuspenseVNode extends VNode implements VNodeInterface {
  type = "Suspense";
  parent: VNodeInterface = null as any;
  children: Array<VNodeInterface>;
  slot?: string; // {@link VNodeInterface.slot}

  placeholder: JSXChild;
  promise: Promise<any>;
  template: Function;

  // provided promise is resolved and content updated
  isResolved = false;

  // V-Node is already removed from node because of a re-render
  isRemoved = false;

  constructor({
    placeholder,
    promise,
    template,
  }: {
    placeholder: JSXChild;
    promise: Promise<any>;
    template: Function;
  }) {
    super();

    this.placeholder = placeholder;
    this.promise = promise;
    this.template = template;
    const child = new FragmentVNode([placeholder]);
    child.parent = this;
    this.children = [child];
  }

  asNode() {
    this.waitAndReRender();

    return this.children[0].asNode();
  }

  waitAndReRender() {
    this.promise.then(value => {
      if (this.isRemoved) return;
      this.isResolved = true;
      const contentMarkup = this.template(value);
      const newContent = new FragmentVNode([contentMarkup]);
      newContent.parent = this;
      const oldFragmentChild = this.children[0];
      this.children = [newContent];
      oldFragmentChild.diffAndPatch(newContent);
    });
  }

  // only returning the placeholder.
  // not automatically rendering when promise resolves
  toString() {
    return this.placeholder ? this.placeholder.toString() : "";
  }

  removeFromDOM() {
    this.isRemoved = true;
    this.children.forEach(childVNode => childVNode.removeFromDOM());
  }

  diffAndPatch(newNode: SuspenseVNode) {
    if (!this.isResolved) {
      // patches the placeholder with each other
      diffAndPatchChildren(this, newNode);
      newNode.waitAndReRender();
    }
    // already resolved, promise but has been changed.
    // start new with the placeholder
    else if (this.promise !== newNode.promise) {
      this.removeFromDOM();
      insertNewItem(newNode);
    }
    // already resolved, promise still the same.
    // diff and patch the template results
    else {
      newNode.promise.then(value => {
        newNode.isResolved = true;
        const contentMarkup = newNode.template(value);
        const newContent = new FragmentVNode([contentMarkup]);
        newContent.parent = newNode;
        newNode.children = [newContent];

        diffAndPatchChildren(this, newNode);
      });
    }

    // current Suspense Node is not in use any more
    this.isRemoved = true;
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
    slot?: string; // {@link VNodeInterface.slot}

    constructor(content: string) {
      super();
      this.content = content;
    }

    removeFromDOM() {
      this.childNodes.forEach(node => node.parentElement!.removeChild(node));
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
      if (this.childNodes.length) {
        this.node = this.childNodes[this.childNodes.length - 1];
      }
      return documentFragment;
    }
  })(content);
}

/**
 *
 * @param param0
 * @example
 *   <Suspense
 *     placeholder={<PlaceholderTableRows />}
 *     promise={pendingRequest}
 *     template={(response) =>
 *       <TableRows rows={response.rows} />
 *     }
 *   />
 */
export function Suspense({
  placeholder,
  promise,
  template,
}: {
  placeholder: JSXChild;
  promise: Promise<any>;
  template: Function;
}) {
  return new SuspenseVNode({
    placeholder,
    promise,
    template,
  });
}

// VNode for <!-- comments -->
class CommentVNode extends VNode implements VNodeInterface {
  type = "Comment";
  children = [];
  props: { content: string };
  node: Comment = null as any;
  parent: VNodeInterface = null as any;
  slot?: string; // {@link VNodeInterface.slot}

  constructor(content: string) {
    super();
    this.props = { content };
  }

  asNode() {
    const commentNode = document.createComment(this.props.content);
    this.node = commentNode;
    return commentNode;
  }

  toString() {
    return `<!--${this.props.content}-->`;
  }

  diffAndPatch(newNode: CommentVNode) {
    this.node.textContent = newNode.props.content;
    newNode.node = this.node;
  }

  removeFromDOM() {
    this.node.parentNode!.removeChild(this.node);
  }
}

/**
 * Function to render html comment in jsx output
 * @param param0
 * @param param0.content {string} - content of the html comment
 * @example
 *  render(
 *    <div>
 *      <Comment content=" comment regarding the next input " />
 *      <input />
 *    </div>,
 *    el
 *  );
 *  will render:
 *    <div>
 *      <!-- comment regarding the next input -->
 *      <input />
 *    </div>
 */
export function HTMLComment({content=""}:{content: string}) {
  return new CommentVNode(content);
}

/**
 * named Container to be replaced with passed children
 *
 * @param {Object} options
 * @param {string} options.name - name of the slot
 * @param {JSXChild} options.hostsChildren - props.children from the parent component functions which contains the slotable elements
 * @param {JSXChild} options.children - props.children from the Slot element which is used for the fallback/default content
 * @returns {JSX.Element}
 * @example
 * function Dialog({children}) {
 *  return (
 *    <div>
 *      <Slot name="body" hostsChildren={children}>
 *        <p> fallback text </p>
 *      </Slot>
 *      <footer>
 *        <Slot name="footer" hostsChildren={children} />
 *      </footer>
 *    </div>
 *  );
 * }
 *
 * render (
 *  <Dialog>
 *    <h3 _slot="body"> Title </h3>
 *    <p _slot="body"> Description </p>
 *    <a _slot="footer" href="mailto:name@email.com">
 *      contact us
 *    </a>
 *  </Dialog>,
 *  element
 * )
 */
 export function Slot({name, hostsChildren, children}: {name:string, hostsChildren:JSXChild, children?:JSXChild}) {
  let content = [];
  // find children which have the correct slot attribute
  for (const child of normalizeChildren(hostsChildren)) {
    // @ts-ignore child only might have the slot property in case on VElement and Fragment
    if (child && child.slot === name) content.push(child);
  }

  // return default content aka its real children when no assigned node was found
  // children is always an array (when passed to the tag function),
  // convert to VNode
  return Fragment({children: content.length ? content : children});
}

/**
 * @example
 *  import { createRef } from "./jsx-runtime";
 *  function Comp() {
 *    const ref = createRef<HTMLInputElement>();
 *
 *    return (
 *      <>
 *        <input _ref={ref} />
 *        <my-label on-click={() => ref.current.focus() } />
 *      </>
 *    );
 *  }
 */
export function createRef<T extends HTMLElement | SVGElement = HTMLElement>() {
  interface RefObject {
    (el: HTMLElement | SVGElement): void;
    current: null | T;
  }

  const result = function (el: HTMLElement | SVGElement) {
    result.current = el as T;
  } as RefObject;
  result.current = null;

  return result;
}

export type RefObject<T = HTMLElement> = { current: T | null };
