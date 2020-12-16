/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./jsx/jsx-runtime.ts":
/*!****************************!*\
  !*** ./jsx/jsx-runtime.ts ***!
  \****************************/
/*! exports provided: jsxs, Fragment, jsx, render, SuspenseVNode, rawHtml, Suspense, createRef */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "jsxs", function() { return jsxs; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Fragment", function() { return Fragment; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "jsx", function() { return jsx; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SuspenseVNode", function() { return SuspenseVNode; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "rawHtml", function() { return rawHtml; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Suspense", function() { return Suspense; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createRef", function() { return createRef; });
/**
 * provides functions needed by babel for a custom pragma
 * to render parsed jsx code to html,
 * diff and patch in subsequent renders
 */
// a map between v-trees and rendered DOM nodes / containers
const renderedVTrees = new WeakMap(); // list of `ref` callbacks to be called after the DOM nodes are rendered

const refsToCall = []; // props which will be rendered as attributes
// Functions will be used for event listeners. (with attribute name starting with 'on-')
// Object will be set as property on the rendered node element

/**
 * return the closest ancestor of the given VNode which has an DOM Element (i.e. is not a Fragment)
 * @param vNode {VNodeInterface}
 */
function getParentElementNode(vNode) {
  while (vNode.parent) {
    vNode = vNode.parent;
    if (vNode.node) break;
  } // `.node` is only on "Text" and "Element" type VNode, and only Element has children


  return vNode;
}
/**
 * for the given v-node all children are traversed till children with DOM nodes are found
 *
 * @param {VNodeInterface} vNode - parent node
 * @param {VNodeInterface} [alwaysAllow] - always contain the provided node in the returned list, even if it is not an element with DOM Node
 * @returns {VNodeInterface[]}
 */


function getChildrenWithNodes(vNode, alwaysAllow) {
  return vNode.children.map(childNode => {
    if (childNode === alwaysAllow) return childNode;
    if (childNode.node) return childNode;
    return getChildrenWithNodes(childNode, alwaysAllow);
  }).flat(Infinity);
}
/**
 * returns a tuple of the closest ancestor which has a DOM Node,
 * and the node which has a DOM node and is rendered as the next sibling for the provided node in the DOM.
 * Or null when it is the last child itself
 *
 * @param {VNodeInterface} vNode
 * @returns {([Node, Node | null])}
 */


function getParentAndNextSibling(vNode) {
  // node ancestor with Element,
  const parentWithElement = getParentElementNode(vNode);
  const siblings = getChildrenWithNodes(parentWithElement, vNode);
  const indexOfNodeInSiblingsList = siblings.indexOf(vNode); // no prev sibling, put before any other element (or null if parent has no children yet)

  if (indexOfNodeInSiblingsList === 0) {
    return [parentWithElement.node, parentWithElement.node.firstChild];
  }

  const prevSibling = siblings[indexOfNodeInSiblingsList - 1];
  const nextSiblingNode = prevSibling ? prevSibling.node.nextSibling : null;
  return [parentWithElement.node, nextSiblingNode];
}
/**
 * returns true if not nullish or false
 * that means 0 or empty string are allowed
 * @param {*} val
 */


function truthy(value) {
  return value !== false && value !== null && value !== undefined;
}
/**
 * escapes the provided string against xss attacks etc
 *
 * @param {string} text
 * @returns {string}
 */


function sanitize(text) {
  const div = document.createElement("div");
  div.innerText = text;
  return div.innerHTML;
}
/**
 * basically `Element.outerHTML` but also supports Text node and DocumentFragment
 * @param element {Node} - element which its html needs to be returned
 */


function getOuterHtml(element) {
  if (element instanceof Element) return element.outerHTML;
  if (element instanceof Text) return sanitize(element.wholeText);

  if (element instanceof DocumentFragment) {
    return Array.from(element.childNodes).map(el => getOuterHtml(el)).join("");
  } // shouldn't reach this point


  console.warn("getOuterHtml does not support this type of element", element);
  return "";
}
/**
 * generates the html as a string which can be used for example with `element.innerHTML()`
 *
 * @param tag {string|Function} - tag argument of the jsx call
 * @param props {Object} - props argument of jsx call
 */


function asHtmlString(tag, props, children) {
  const attributes = Object.entries(props).filter(([, value]) => truthy(value)).map(([key, value]) => {
    // e.g. disabled: true => <tag disabled>
    if (value === true) return key; // for style as object:
    // (style:) {display: "none", position: "absolute"} ==> 'display: none; position: absolute;'

    if (key === "style" && typeof value === "object") {
      value = Object.entries(value) // ignore stuff like `{background: active && "red"}` when `active === false / null / undefined`
      .filter(([, v]) => truthy(v)) // currently supports "background-color" not "backgroundColor"
      .map(([k, v]) => `${k}: ${v}`).join("; ");
    } // (class:) ["btn", "red"] ==> "btn red"


    if (key === "class" && Array.isArray(value)) value = value.join(" ");
    return `${key}="${value}"`;
  }).join(" ");
  const content = children.map(child => child.toString()).join("");
  return `<${tag} ${attributes}>${content}</${tag}>`;
}
/**
 * generates HTML Node elements from the provided jsx item
 * @param tag {string|Function} - tag argument of the jsx call
 * @param props {Object} - props argument of jsx call
 */


function asNode(tag, props, children, svgContext = false) {
  // fragment
  if (!tag) {
    const fragments = children.map(item => item.asNode());
    const documentFragment = document.createDocumentFragment();
    documentFragment.append(...fragments);
    return documentFragment;
  } // remember if the svg context was set for this node, and replace after generating all children
  // currently not supporting the `is` option for Customized built-in elements


  const node = svgContext ? document.createElementNS("http://www.w3.org/2000/svg", tag) : document.createElement(tag); // add attributes, event listeners etc.

  ElementVNode.addProps(node, props);
  node.append(...children // .flat()
  .map(child => child.asNode()));
  return node;
}
/**
 * renders the HTML for the given V-Node and adds to the DOM at the correct position
 * @param newNode - vNode to be rendered as HTML Node and added to DOM
 */


function insertNewItem(newNode) {
  const [parent, nextSibling] = getParentAndNextSibling(newNode);
  parent.insertBefore(newNode.asNode(), nextSibling);
}
/**
 * iterate over all the children of the provided nodes, and each pairwise
 *
 * @param {VNodeInterface} oldNode - v-node from the old render
 * @param {VNodeInterface} newNode- v-node from the new tree which its children have to replace the children of the old node
 */


function diffAndPatchChildren(oldNode, newNode) {
  oldNode.children.forEach((oldChild, ix) => {
    const newChild = newNode.children[ix]; // child was removed

    if (!newChild) oldChild.removeFromDOM(); // child is modified
    else if (newChild.type === oldChild.type) oldChild.diffAndPatch(newChild); // child is replaced
      else {
          oldChild.removeFromDOM();
          insertNewItem(newChild);
        }
  }); // new addition items

  const newItems = newNode.children.slice(oldNode.children.length);

  if (newItems.length) {
    const documentFragment = document.createDocumentFragment();
    newItems.forEach(item => documentFragment.append(item.asNode()));
    const [parent, nextSibling] = getParentAndNextSibling(newItems[0]);
    parent.insertBefore(documentFragment, nextSibling);
  }
} // base class which will be inherited from jsx and fragments function node generation
// and will be used to distinguish them with other Elements


class VNode {} // Interface which will be implemented by all types of nodes in the V-DOM Tree


// V-Node which will be rendered as HTMLElement or SVGElement
class ElementVNode extends VNode {
  // will be set to true when element is an SVG Element
  constructor({
    tag,
    props,
    children
  }) {
    super();
    this.type = "Element";
    this.tag = void 0;
    this.props = void 0;
    this.node = null;
    this.children = void 0;
    this.parent = null;
    this.svgContext = false;
    this.tag = tag;
    this.props = props; // convert child jsx content to VNodes

    this.children = children.map(child => {
      if (Array.isArray(child)) return new FragmentVNode(child);
      if (child instanceof VNode) return child;
      if (child instanceof Node) return new LiveNodeVNode(child);
      if (!truthy(child)) return new NullVNode();
      return new TextVNode(child);
    }); // set parent property on all children

    this.children.forEach(child => child.parent = this);
  }

  toString() {
    return asHtmlString(this.tag, this.props, this.children);
  }

  asNode() {
    // traverse the VTree to check if this element is rendered inside an svg element
    let svgContext = false;
    let vNode = this;

    while (vNode.parent) {
      // @ts-ignore - ElementVNode has the tag property, other are undefined
      if (vNode.tag === "svg") {
        svgContext = true;
        break;
      }

      vNode = vNode.parent;
    } // store the svg context information to the property to allow using it when the v-node is cloned


    this.svgContext = svgContext;
    const node = asNode(this.tag, this.props, this.children, this.svgContext);
    this.node = node; // memorize for next subtree re-renders

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

  diffAndPatch(newNode) {
    if (newNode.tag === this.tag) {
      newNode.node = this.node; // update props and attributes

      ElementVNode.addProps(newNode.node, newNode.props, this.props); // children => iter and patch
      // old children being modified

      diffAndPatchChildren(this, newNode);
    } // tag has changed
    else {
        this.node.replaceWith(newNode.asNode());
      } // memorize for next subtree re-renders


    renderedVTrees.set(this.node, newNode);
  }

  static fromExistingElementNode(vNode, children) {
    const {
      tag,
      props,
      parent,
      node,
      svgContext
    } = vNode;
    const newVNode = new ElementVNode({
      tag,
      props,
      children
    });
    Object.assign(newVNode, {
      parent,
      node,
      svgContext
    });
    return newVNode;
  }

  static addProps(element, newProps, oldProps) {
    const isDiff = typeof oldProps !== "undefined";
    if (!isDiff) oldProps = {}; // iterate over all modified new and old properties and set/remove/update them

    Array.from(new Set([...Object.keys(newProps), ...Object.keys(oldProps)])).map(propName => ({
      propName,
      oldValue: oldProps[propName],
      newValue: newProps[propName]
    })).filter(({
      newValue,
      oldValue
    }) => newValue !== oldValue).forEach(({
      propName,
      newValue,
      oldValue
    }) => {
      // for style as object:
      // (style:) {display: "none", position: "absolute"} ==> 'display: none; position: absolute;'
      if (propName === "style" && typeof newValue === "object") {
        newValue = Object.entries(newValue).filter(([, v]) => truthy(v)).map(([k, v]) => `${k}: ${v}`).join("; ");
      } // (class:) ["btn", "red"] ==> "btn red"


      if (propName === "class" && Array.isArray(newValue)) {
        newValue = newValue.join(" ");
      } // props starting with "on-" are event listeners


      if (propName.startsWith("on-") && (typeof newValue === "function" || typeof newValue === "object" || typeof oldValue === "function" || typeof oldValue === "object")) {
        // remove leading "on-""
        const event = propName.replace(/^on-/, ""); // key has the form of "on-change". value is the callback function or an object implementing {EventListener} interface

        if (typeof newValue === "function" || typeof newValue === "object") {
          element.addEventListener(event, newValue);
        }

        if (typeof oldValue === "function" || typeof oldValue === "object") {
          element.removeEventListener(event, oldValue);
        }
      } else if (propName === "ref" && typeof newValue === "function") {
        refsToCall.push(() => newValue(element));
      } // old ref isn't unset
      // the `checked` and `value` attribute on input elements will update the `defaultChecked` and `defaultValue` property.
      // also possible to test if class has the property and always set it via prop instead of attribute
      // but there are some ready only properties. and unclear if our custom elements always have a setter when there is a getter for some props
      else if (isDiff && (propName === "checked" || propName === "value")) {
          // @ts-ignore - e.g. input elements need checked set as property not only attribute when it is changes
          element[propName] = newValue;
        } // boolean attribute set without value
        else if (newValue === true) element.setAttribute(propName, ""); // remove old attributes which are false now
          else if (!truthy(newValue)) element.removeAttribute(propName); // update to new value as string
            else if (typeof newValue === "string" || typeof newValue === "number") {
                element.setAttribute(propName, String(newValue));
              } // @ts-ignore - providing the value as property to html element
              else element[propName] = newValue;
    });
  }

} // V-Node for the Fragment element in jsx (`<></>`) or when an array is placed directly in jsx children (e.g. `<elem>{[list]}</elem>`)


class FragmentVNode extends VNode {
  constructor(children) {
    super();
    this.type = "Fragment";
    this.children = void 0;
    this.parent = null;
    this.children = children.map(child => {
      if (Array.isArray(child)) return new FragmentVNode(child);
      if (child instanceof VNode) return child;
      if (child instanceof Node) return new LiveNodeVNode(child);
      if (!truthy(child)) return new NullVNode();
      return new TextVNode(child);
    });
    this.children.forEach(child => child.parent = this);
  }

  asNode() {
    const node = asNode(undefined, {}, this.children);
    return node;
  }

  toString() {
    return this.children.map(child => child.toString()).join("");
  }

  diffAndPatch(newVNode) {
    return diffAndPatchChildren(this, newVNode);
  }

  removeFromDOM() {
    this.children.forEach(child => child.removeFromDOM());
  }

} // V-Node for items which be rendered as text (string, number,.. )


class TextVNode extends VNode {
  /**
   *
   */
  constructor(content) {
    super();
    this.type = "TextNode";
    this.children = [];
    this.node = null;
    this.props = void 0;
    this.parent = null;
    this.props = {
      content
    };
  }

  asNode() {
    const textNode = document.createTextNode(this.props.content);
    this.node = textNode;
    return textNode;
  }

  toString() {
    return sanitize(this.props.content);
  }

  diffAndPatch(newNode) {
    this.node.nodeValue = newNode.props.content;
    newNode.node = this.node;
  }

  removeFromDOM() {
    this.node.parentNode.removeChild(this.node);
  }

} // V-Node for `null`, `false` or `undefined` in jsx elements


class NullVNode extends VNode {
  constructor() {
    super();
    this.type = "Null";
    this.children = [];
    this.parent = null;
  }

  asNode() {
    // return null; // return empty fragment?
    return document.createDocumentFragment();
  }

  diffAndPatch(newNode2) {
    return;
  }

  removeFromDOM() {
    return;
  }

  toString() {
    return "";
  }

} // V-Node when a live HTMLElement was refernced in jsx (e.g. `<div>{document.getElementById("comp")}</div>`)


class LiveNodeVNode extends VNode {
  /**
   *
   */
  constructor(node) {
    super();
    this.type = "Node";
    this.children = [];
    this.parent = null;
    this.node = void 0;
    this.node = node;
  }

  asNode() {
    return this.node;
  }

  diffAndPatch(newNode) {
    if (newNode.node !== this.node) {
      this.node.replaceWith(newNode.node);
    }
  }

  removeFromDOM() {
    this.node.parentElement.removeChild(this.node);
  }

  toString() {
    return getOuterHtml(this.node);
  }

} // wrapper V-Node which references the HTML Node which itself is not rendered by jsx, but its content.


class RootVNode extends VNode {
  /**
   *
   */
  constructor(content, domNode) {
    super();
    this.type = "Root";
    this.parent = null;
    this.node = void 0;
    this.children = void 0;
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

  diffAndPatch(newVNode) {
    diffAndPatchChildren(this, newVNode);
  }

  removeFromDOM() {
    this.node.remove();
  }

} // generate the V-Nodes and V-Tree based on the objects parsed by the jsx babel plugin


function asVNode(tag, props) {
  if (typeof tag === "function") {
    let ref = undefined;

    if (props.ref) {
      ref = props.ref;
      delete props.ref;
    }

    const result = tag(props);

    if (result instanceof VNode) {
      if (typeof ref === "function") {
        refsToCall.push(() => {
          // @ts-ignore node property might exist or not. this is checked here
          const vNode = result.node ? result : getChildrenWithNodes(result)[0]; // @ts-ignore vNode with node is returned

          if (vNode) ref(vNode.node);
        });
      }

      return result;
    }

    if (result instanceof Node) return new LiveNodeVNode(result); // null jsx node

    if (!truthy(result)) return new NullVNode();
    return new TextVNode(result);
  }

  const {
    children,
    ...attr
  } = props;
  return tag ? new ElementVNode({
    tag,
    children,
    props: attr
  }) : new FragmentVNode(children);
}
/**
 * converts pragma object to html string
 * jsxs is always called when element has more than one child
 *
 * @param {string | Function} tag - tag name or tag class
 * @param {Object | null} props - props for the tag
 */


function jsxs(tag, props) {
  return asVNode(tag, props);
}
/**
 * converts the fragments object to nodes
 *
 * @param {Object} props
 * @param {Array} props.children - child elements in the fragment
 */

function Fragment(props) {
  return asVNode(undefined, props);
} // jsx is called when the element has one or zero children

function jsx(tag, props) {
  // @ts-ignore - wrapping the children as array to re-use jsxs method
  props.children = props.hasOwnProperty("children") ? [props.children] : [];
  return jsxs(tag, props);
}
/**
 * render the given markup into the given HTML node
 *
 * @param {JSXChild} markup - html as string, html element or jsx template
 * @param {HTMLElement} domNode - container for the template to be rendered into
 * @param {boolean} [append=false] - should the provided markup be appended to the existing markup, or default replace it
 */

function render(markup, domNode, append = false) {
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
      const oldVTree = renderedVTrees.get(domNode); // was previously rendered as a subtree from another render

      if (oldVTree.type === "Element") {
        vTree = ElementVNode.fromExistingElementNode(oldVTree, [markup]);
        oldVTree.diffAndPatch(vTree); // update the children property in the memory reference from the previous render,
        // attributes, etc will stay the same

        oldVTree.children = vTree.children;
      } else {
        vTree = new RootVNode(markup, domNode); // diff and patch DOM based on the last render

        oldVTree.diffAndPatch(vTree);
      }
    } // first time render
    else {
        vTree = new RootVNode(markup, domNode);
        domNode.append(vTree.asNode());
      } // memorize the V-Tree which rendered the current DOM, to use it in future re-renders


    renderedVTrees.set(domNode, vTree); // call all ref callbacks found during creation of new nodes during render

    while (refsToCall.length) {
      // remove first from list, and invoke it
      refsToCall.splice(0, 1)[0]();
    }
  } else {
    throw new Error("render method called with wrong argument(s)");
  }
} // provides component to autonomous update its content when provided promise resolved

class SuspenseVNode extends VNode {
  // provided promise is resolved and content updated
  // V-Node is already removed from node because of a re-render
  constructor({
    placeholder,
    promise,
    template
  }) {
    super();
    this.type = "Suspense";
    this.parent = null;
    this.children = void 0;
    this.placeholder = void 0;
    this.promise = void 0;
    this.template = void 0;
    this.isResolved = false;
    this.isRemoved = false;
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
      this.children[0].diffAndPatch(newContent);
      this.children = [newContent];
    });
  } // only returning the placeholder.
  // not automatically rendering when promise resolves


  toString() {
    return this.placeholder ? this.placeholder.toString() : "";
  }

  removeFromDOM() {
    this.isRemoved = true;
    this.children.forEach(childVNode => childVNode.removeFromDOM());
  }

  diffAndPatch(newNode) {
    if (!this.isResolved) {
      // patches the placeholder with each other
      diffAndPatchChildren(this, newNode);
      newNode.waitAndReRender();
    } // already resolved, promise but has been changed.
    // start new with the placeholder
    else if (this.promise !== newNode.promise) {
        this.removeFromDOM();
        insertNewItem(newNode);
      } // already resolved, promise still the same.
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
        } // current Suspense Node is not in use any more


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

function rawHtml(content) {
  var _temp;

  return new (_temp = class RawHtml extends VNode {
    constructor(content) {
      super();
      this.parent = null;
      this.children = [];
      this.type = "RawHtml";
      this.childNodes = null;
      this.content = void 0;
      this.node = void 0;
      this.content = content;
    }

    removeFromDOM() {
      this.childNodes.forEach(node => node.parentElement.removeChild(node));
    } // simple re-renders without diffing and patching in case of modified content


    diffAndPatch(newNode) {
      if (newNode.content = this.content) {
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
      this.childNodes = Array.from(documentFragment.childNodes); // basically the `.node` property is used to determine the last html node of the VNode,
      // to position the next VNode's DOM Node after it.
      // therefore .node returns the last node of the raw html

      if (this.childNodes.length) {
        this.node = this.childNodes[this.childNodes.length - 1];
      }

      return documentFragment;
    }

  }, _temp)(content);
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

function Suspense({
  placeholder,
  promise,
  template
}) {
  return new SuspenseVNode({
    placeholder,
    promise,
    template
  });
}
/**
 * @example
 *  import { createRef } from "./jsx-runtime";
 *  function Comp() {
 *    const ref = createRef<HTMLInputElement>();
 *
 *    return (
 *      <>
 *        <input ref={ref} />
 *        <my-label on-click={() => ref.current.focus() } />
 *      </>
 *    );
 *  }
 */

function createRef() {
  const result = function (el) {
    result.current = el;
  };

  result.current = null;
  return result;
}

/***/ }),

/***/ "./main.tsx":
/*!******************!*\
  !*** ./main.tsx ***!
  \******************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./jsx/jsx-runtime */ "./jsx/jsx-runtime.ts");




const xss = "<img src=x onerror=\"alert('XSS Attack')\">"; //"<script>alert('-.-')</script>";

function RTE(props) {
  console.log("onClick", props["on-click"]);
  return Object(C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("p", {
    "on-click": props["on-click"],
    children: Object(C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["rawHtml"])(props.txt)
  });
}

function Button({
  children,
  disabled
}) {
  return Object(C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])("button", {
    disabled: disabled,
    ref: el => console.log("my button ::ref::1", el),
    children: [Object(C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("span", {
      ref: el => console.log("my a ::ref::2", el),
      children: "Btn-span-first"
    }), children, Object(C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["Fragment"], {
      children: Object(C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("span", {
        ref: el => console.log("my a ::ref::3", el),
        children: "Btn-span-end"
      })
    })]
  });
}

function reflog(el) {
  console.log("my inner div::ref::8", el);
}
/*
const markup = (
  <>
    <div
      class="foo"
      ref={(el: HTMLElement) => console.log("my div ::ref::4", el)}
    />
    <input disabled={true} hidden={false} />
    <Button
      disabled={true}
      ref={(el: HTMLElement) => console.log("my BUTTON::ref::5", el)}
    >
      text
      <popup-info
        ref={(el: HTMLElement) => console.log("span in BUTTON::ref::6", el)}
      >
        bla
      </popup-info>
    </Button>
    <RTE
      txt="le text"
      ref={(el: HTMLElement) => console.log("my div ::ref::3.1", el)}
      on-click={(e: HTMLElement) => console.log(e)}
    />
    {xss}
    {rawHtml(`<ol><li>raw html</li></ol>`)}
    <div
      class="bam"
      ref={(el: HTMLElement) => console.log("my div::ref::7", el)}
    >
      <div>
        <div class="bar" on-click={(e) => console.log(e)} ref={reflog}>
          click ME
        </div>
        <div style={{ outline: "1px solid red;" }}>
          {document.querySelector("#old")}
          {null}
          {[0, 1].map((n) => (
            <span>{n}</span>
          ))}
        </div>
      </div>
    </div>
  </>
);

*/

/*
const markup = (
  <Button disabled={true}>
      <bold ref={reflog}>--INNER--</bold>
  </Button>
);*/

/*

const markup = (
  <div class="foo" ref={(el: HTMLElement) => console.log("my div::ref::", el)}>
    <div>
      <div class="bar" ref={(el: HTMLElement) => console.log("my inner div::ref::", el)} />
    </div>
    <Button disabled={true}></Button>
  </div>
);
*/

/*
const markup = (
  <a>
    <b>
      <c class="bar" ref={reflog} />
    </b>
  </a>
);
*/


function Span({
  mode
}) {
  return mode === 1 ? Object(C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])("div", {
    children: [Object(C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("span", {
      id: "inner",
      old: true,
      children: "Span-Comp--old"
    }), Object(C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("h3", {
      children: "to be removed"
    })]
  }) : Object(C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("div", {
    children: Object(C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("p", {
      id: "inner",
      new: true,
      children: "Span-Comp--news"
    })
  });
}

function Comp({
  num
}) {
  if (num === 1) return null;
  return Object(C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("div", {
    children: Object(C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("p", {
      children: "comp"
    })
  });
}

const markup1 = num => Object(C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])("div", {
  id: "outer",
  "data-foo": "bar",
  "data-var": num,
  children: [Object(C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("h3", {
    children: "should get 2 -: 3"
  }), num === 1 ? Object(C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])("ul", {
    class: "ul-class",
    children: [Object(C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("li", {
      children: "Text 1 "
    }), Object(C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("li", {
      children: "Text 2 "
    })]
  }) : Object(C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])("ul", {
    class: "ul-class",
    children: [Object(C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("li", {
      children: "Text 3 "
    }), Object(C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("li", {
      children: "Text 2 "
    }), Object(C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("li", {
      children: "Text 1 "
    })]
  }), Object(C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("h3", {
    children: "should get 3 -: 2"
  }), num === 1 ? Object(C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])("ul", {
    class: "ul-class",
    children: [Object(C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("li", {
      children: "Text 1 "
    }), Object(C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("li", {
      children: "Text 2 "
    }), Object(C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("li", {
      children: "Text 3 "
    })]
  }) : Object(C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])("ul", {
    class: "ul-class",
    children: [Object(C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("li", {
      children: "Text 1 "
    }), Object(C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("li", {
      children: "Text 2 "
    })]
  }), num === 1 ? null : Object(C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("p", {
    children: "new render"
  }), Object(C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("div", {
    children: Object(C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("span", {
      children: "span-content"
    })
  }), Object(C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(Span, {
    mode: num
  }), Object(C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["Fragment"], {
    children: "Fragment-item"
  }), Object(C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])("svg", {
    viewBox: "0 0 300 100",
    xmlns: "http://www.w3.org/2000/svg",
    stroke: "red",
    fill: "grey",
    children: [Object(C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("circle", {
      cx: "50",
      cy: "50",
      r: "40"
    }), Object(C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("circle", {
      cx: "150",
      cy: "50",
      r: "4"
    }), Object(C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("svg", {
      viewBox: "0 0 10 10",
      x: "200",
      width: "100",
      children: Object(C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("circle", {
        cx: "5",
        cy: "5",
        r: "4"
      })
    })]
  })]
});

function markup2(num) {
  return Object(C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])("div", {
    id: "outer",
    children: [Object(C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["Fragment"], {
      children: Object(C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["Fragment"], {
        children: Object(C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("p", {
          children: "nested fragment"
        })
      })
    }), Object(C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("h1", {
      children: "static"
    }), Object(C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])("h1", {
      children: ["dynamic val: ", num]
    }), num === 1 ? Object(C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("h1", {
      children: "old"
    }) : false, num === 1 ? Object(C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])(C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["Fragment"], {
      children: [Object(C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("h1", {
        children: "frag old"
      }), Object(C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("span", {
        children: "frag span old"
      })]
    }) : Object(C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("h1", {
      children: "frag new"
    }), Object(C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(Comp, {
      num: num
    })]
  });
}

function NL() {
  return null;
}

function markup3(num) {
  return num === 1 ? Object(C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])("h1", {
    children: ["A-Line 1 - ", num, Object(C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(Span, {
      mode: num
    }), Object(C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])(Button, {
      disabled: true,
      ref: el => console.log("my BUTTON::ref::5", el),
      children: ["text", Object(C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("popup-info", {
        ref: el => console.log("span in BUTTON::ref::6", el),
        children: "bla"
      }), Object(C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])("p", {
        children: ["inner p ", num]
      })]
    }), "A-Line 3", Object(C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])(C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["Fragment"], {
      children: [Object(C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("p", {
        children: Object(C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("p", {
          children: "A Frag line 1*"
        })
      }), Object(C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("p", {
        children: "A Frag line 2"
      }), Object(C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("p", {
        children: "A Frag line 3"
      }), Object(C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("p", {
        children: "A Frag line 4"
      }), Object(C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])("svg", {
        viewBox: "0 0 300 100",
        xmlns: "http://www.w3.org/2000/svg",
        stroke: "red",
        fill: "grey",
        children: [Object(C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("circle", {
          cx: "50",
          cy: "50",
          r: "40"
        }), Object(C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("circle", {
          cx: "150",
          cy: "50",
          r: "4"
        }), Object(C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("svg", {
          viewBox: "0 0 10 10",
          x: "200",
          width: "100",
          children: Object(C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("circle", {
            cx: "5",
            cy: "5",
            r: "4"
          })
        })]
      })]
    }), null]
  }) : Object(C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])("h1", {
    class: "a",
    ref: console.info,
    children: ["B Line 1 - ", num, Object(C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(Span, {
      mode: num
    }), Object(C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])(Button, {
      disabled: true,
      ref: el => console.log("my BUTTON::ref::5", el),
      children: ["text", Object(C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("popup-info", {
        ref: el => console.log("span in BUTTON::ref::6", el),
        children: "bla"
      }), Object(C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("p", {
        children: num
      })]
    }), Object(C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])(C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["Fragment"], {
      children: [false, null, undefined]
    }), Object(C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])(C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["Fragment"], {
      children: [Object(C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("p", {
        children: "B Frag line 1"
      }), Object(C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("p", {
        children: "B Frag line 2"
      }), undefined, Object(C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("p", {
        children: "B Frag line 3(4)"
      }), Object(C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])("svg", {
        viewBox: "0 0 300 100",
        xmlns: "http://www.w3.org/2000/svg",
        stroke: "red",
        fill: "grey",
        children: [Object(C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("circle", {
          cx: "50",
          cy: "50",
          r: "40"
        }), Object(C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("circle", {
          cx: "150",
          cy: "50",
          r: "4"
        }), Object(C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("svg", {
          viewBox: "0 0 10 10",
          x: "200",
          width: "100",
          children: Object(C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("circle", {
            cx: "5",
            cy: "5",
            r: "6"
          })
        })]
      }), Object(C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("p", {
        children: "B Frag line 4(6)"
      })]
    })]
  });
}

const obj = {
  a: 1
};

function markup4(num) {
  obj.a = num;
  return num === 1 ? Object(C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])("h1", {
    obj: obj,
    id: obj.a,
    children: ["old-Headline ", num]
  }) : Object(C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])("h1", {
    obj: obj,
    class: "a",
    id: obj.a,
    children: ["new-Headline ", num]
  });
}

function markup(num) {
  return num === 1 ? Object(C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("div", {
    children: Object(C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])(C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["Fragment"], {
      children: [Object(C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("p", {
        children: "frag - I"
      }), Object(C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("b", {
        children: " frag - II"
      })]
    })
  }) : Object(C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])("h1", {
    class: "a",
    children: ["new-Headline", " ", num]
  });
}

function markup5(num) {
  return num === 1 ? Object(C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])("div", {
    children: [Object(C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["rawHtml"])(`<div class="k">txt</div><input type=radio" />`), Object(C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(Comp3, {}), el]
  }) : Object(C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])("div", {
    children: [Object(C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["rawHtml"])(`<div class="k">txt</div><input type=radio" />`), null, el]
  });
}

function markup6(a) {
  return Object(C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])("div", {
    children: [Object(C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("svg", {
      id: "foo6",
      viewBox: "0 0 10 10",
      x: "200",
      width: "100",
      children: Object(C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["Fragment"], {
        children: a && Object(C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("circle", {
          cx: "5",
          cy: "5",
          r: "6"
        })
      })
    }), Object(C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("button", {
      children: "submit"
    })]
  });
} //console.log(markup);
//window.markup = markup;


class PopUpInfo extends HTMLElement {
  constructor() {
    // Always call super first in constructor
    super(); // write element functionality in here

    console.log("#################ctor CE");
  }

  connectedCallback() {
    console.log("#################Custom square element added to page.");
  }

}

customElements.define("popup-info", PopUpInfo); //document.querySelector("#old")!.addEventListener("click", console.log);
//document.body.innerHTML = markup;
////render(markup3(1), document.body);
//document.getElementById("outer")?.setAttribute("data-foo", "mod");
//document.getElementById("inner")?.setAttribute("data-foo", "mod");
//render(markup(2), document.body);
//render(markup, document.body, true);

const el = document.querySelector("#old");

function Comp2() {
  return Object(C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])(C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["Fragment"], {
    children: [Object(C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["rawHtml"])(`<div class="k">txt</div><input type=radio" />`), Object(C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(Comp3, {}), el]
  });
}

function Comp3() {
  return Object(C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("div", {
    children: "comp content"
  });
}

const $container = document.getElementById("container");

window.reRender1 = () => Object(C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["render"])(markup3(1), $container);

window.reRender2 = () => Object(C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["render"])(markup3(2), $container);

window.reRender3 = () => Object(C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["render"])( // <div>txt</div>
Object(C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(Comp2, {}), $container);

console.log("12345");

window.ss = () => markup3(1) + "";

window.ss2 = () => {
  console.log(markup3(1)); //document.getElementById("container").innerHTML = markup3(1);
};

window.reRender5a = () => Object(C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["render"])(markup5(1), $container);

window.reRender5b = () => Object(C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["render"])(markup5(2), $container);

function markup7(mod) {
  if (mod === 1) {
    return Object(C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("div", {
      children: Object(C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])(Button, {
        children: [Object(C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("span", {
          children: "text"
        }), Object(C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("span", {
          children: ", more text"
        })]
      })
    });
  } else if (mod === 2) {
    return Object(C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("div", {
      children: "some content"
    });
  } else {
    return Object(C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("div", {
      children: false
    });
  }
}

window.reRenderRef = () => Object(C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["render"])(Object(C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("h2", {
  class: "a",
  ref: console.warn,
  children: "Heading with ref"
}), $container);

window.reRender6a = () => Object(C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["render"])(markup6(true), $container);

window.reRender6b = () => Object(C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["render"])(Object(C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("circle", {
  cx: "5",
  cy: "5",
  r: "6"
}), document.getElementById("foo6"));

window.reRenderSvg = () => Object(C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["render"])(markup1(), $container);

window.reRenderSvg2 = () => Object(C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["render"])(markup1(), $container);

window.reRender7_1 = () => Object(C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["render"])(markup7(1), $container);

window.reRender7_2 = () => Object(C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["render"])(markup7(2), $container);

window.reRender7_3 = () => Object(C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["render"])(markup7(3), $container);

function Func1({
  children
}) {
  console.log("Func-1");
  return Object(C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("div", {
    children: children
  });
}

function timer(t) {
  return new Promise(res => {
    setTimeout(() => {
      res(Object(C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("p", {
        children: "new text"
      }));
    }, t);
  });
}

const p = timer(5000);

function Func2() {
  return;

  Object(C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["Suspense"], {
    placeholder: Object(C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("h2", {
      children: "waiting..."
    }),
    contentPromise: func(p)
  });
}

Object(C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["render"])(Object(C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("div", {
  children: Object(C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])(Func1, {
    children: [Object(C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(Func2, {}), Object(C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(RTE, {
      txt: "<b>le text</b>",
      ref: el => console.log("my div ::ref::3.1", el),
      "on-click": e => console.log(e)
    }), xss]
  })
}), $container);

window.reRender_sus = () => Object(C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["render"])(Object(C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("div", {
  children: Object(C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(Func1, {
    children: Object(C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(Func2, {})
  })
}), $container);

/***/ }),

/***/ 0:
/*!************************!*\
  !*** multi ./main.tsx ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./main.tsx */"./main.tsx");


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vanN4L2pzeC1ydW50aW1lLnRzIiwid2VicGFjazovLy8uL21haW4udHN4Il0sIm5hbWVzIjpbInJlbmRlcmVkVlRyZWVzIiwiV2Vha01hcCIsInJlZnNUb0NhbGwiLCJnZXRQYXJlbnRFbGVtZW50Tm9kZSIsInZOb2RlIiwicGFyZW50Iiwibm9kZSIsImdldENoaWxkcmVuV2l0aE5vZGVzIiwiYWx3YXlzQWxsb3ciLCJjaGlsZHJlbiIsIm1hcCIsImNoaWxkTm9kZSIsImZsYXQiLCJJbmZpbml0eSIsImdldFBhcmVudEFuZE5leHRTaWJsaW5nIiwicGFyZW50V2l0aEVsZW1lbnQiLCJzaWJsaW5ncyIsImluZGV4T2ZOb2RlSW5TaWJsaW5nc0xpc3QiLCJpbmRleE9mIiwiZmlyc3RDaGlsZCIsInByZXZTaWJsaW5nIiwibmV4dFNpYmxpbmdOb2RlIiwibmV4dFNpYmxpbmciLCJ0cnV0aHkiLCJ2YWx1ZSIsInVuZGVmaW5lZCIsInNhbml0aXplIiwidGV4dCIsImRpdiIsImRvY3VtZW50IiwiY3JlYXRlRWxlbWVudCIsImlubmVyVGV4dCIsImlubmVySFRNTCIsImdldE91dGVySHRtbCIsImVsZW1lbnQiLCJFbGVtZW50Iiwib3V0ZXJIVE1MIiwiVGV4dCIsIndob2xlVGV4dCIsIkRvY3VtZW50RnJhZ21lbnQiLCJBcnJheSIsImZyb20iLCJjaGlsZE5vZGVzIiwiZWwiLCJqb2luIiwiY29uc29sZSIsIndhcm4iLCJhc0h0bWxTdHJpbmciLCJ0YWciLCJwcm9wcyIsImF0dHJpYnV0ZXMiLCJPYmplY3QiLCJlbnRyaWVzIiwiZmlsdGVyIiwia2V5IiwidiIsImsiLCJpc0FycmF5IiwiY29udGVudCIsImNoaWxkIiwidG9TdHJpbmciLCJhc05vZGUiLCJzdmdDb250ZXh0IiwiZnJhZ21lbnRzIiwiaXRlbSIsImRvY3VtZW50RnJhZ21lbnQiLCJjcmVhdGVEb2N1bWVudEZyYWdtZW50IiwiYXBwZW5kIiwiY3JlYXRlRWxlbWVudE5TIiwiRWxlbWVudFZOb2RlIiwiYWRkUHJvcHMiLCJpbnNlcnROZXdJdGVtIiwibmV3Tm9kZSIsImluc2VydEJlZm9yZSIsImRpZmZBbmRQYXRjaENoaWxkcmVuIiwib2xkTm9kZSIsImZvckVhY2giLCJvbGRDaGlsZCIsIml4IiwibmV3Q2hpbGQiLCJyZW1vdmVGcm9tRE9NIiwidHlwZSIsImRpZmZBbmRQYXRjaCIsIm5ld0l0ZW1zIiwic2xpY2UiLCJsZW5ndGgiLCJWTm9kZSIsImNvbnN0cnVjdG9yIiwiRnJhZ21lbnRWTm9kZSIsIk5vZGUiLCJMaXZlTm9kZVZOb2RlIiwiTnVsbFZOb2RlIiwiVGV4dFZOb2RlIiwic2V0IiwicGFyZW50Tm9kZSIsInJlbW92ZUNoaWxkIiwicmVwbGFjZVdpdGgiLCJmcm9tRXhpc3RpbmdFbGVtZW50Tm9kZSIsIm5ld1ZOb2RlIiwiYXNzaWduIiwibmV3UHJvcHMiLCJvbGRQcm9wcyIsImlzRGlmZiIsIlNldCIsImtleXMiLCJwcm9wTmFtZSIsIm9sZFZhbHVlIiwibmV3VmFsdWUiLCJzdGFydHNXaXRoIiwiZXZlbnQiLCJyZXBsYWNlIiwiYWRkRXZlbnRMaXN0ZW5lciIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJwdXNoIiwic2V0QXR0cmlidXRlIiwicmVtb3ZlQXR0cmlidXRlIiwiU3RyaW5nIiwidGV4dE5vZGUiLCJjcmVhdGVUZXh0Tm9kZSIsIm5vZGVWYWx1ZSIsIm5ld05vZGUyIiwicGFyZW50RWxlbWVudCIsIlJvb3RWTm9kZSIsImRvbU5vZGUiLCJyZW1vdmUiLCJhc1ZOb2RlIiwicmVmIiwicmVzdWx0IiwiYXR0ciIsImpzeHMiLCJGcmFnbWVudCIsImpzeCIsImhhc093blByb3BlcnR5IiwicmVuZGVyIiwibWFya3VwIiwiaXNSZVJlbmRlciIsImhhcyIsInZUcmVlIiwib2xkVlRyZWUiLCJnZXQiLCJzcGxpY2UiLCJFcnJvciIsIlN1c3BlbnNlVk5vZGUiLCJwbGFjZWhvbGRlciIsInByb21pc2UiLCJ0ZW1wbGF0ZSIsImlzUmVzb2x2ZWQiLCJpc1JlbW92ZWQiLCJ3YWl0QW5kUmVSZW5kZXIiLCJ0aGVuIiwiY29udGVudE1hcmt1cCIsIm5ld0NvbnRlbnQiLCJjaGlsZFZOb2RlIiwicmF3SHRtbCIsIlJhd0h0bWwiLCJTdXNwZW5zZSIsImNyZWF0ZVJlZiIsImN1cnJlbnQiLCJ4c3MiLCJSVEUiLCJsb2ciLCJ0eHQiLCJCdXR0b24iLCJkaXNhYmxlZCIsInJlZmxvZyIsIlNwYW4iLCJtb2RlIiwiQ29tcCIsIm51bSIsIm1hcmt1cDEiLCJtYXJrdXAyIiwiTkwiLCJtYXJrdXAzIiwiaW5mbyIsIm9iaiIsImEiLCJtYXJrdXA0IiwibWFya3VwNSIsIm1hcmt1cDYiLCJQb3BVcEluZm8iLCJIVE1MRWxlbWVudCIsImNvbm5lY3RlZENhbGxiYWNrIiwiY3VzdG9tRWxlbWVudHMiLCJkZWZpbmUiLCJxdWVyeVNlbGVjdG9yIiwiQ29tcDIiLCJDb21wMyIsIiRjb250YWluZXIiLCJnZXRFbGVtZW50QnlJZCIsIndpbmRvdyIsInJlUmVuZGVyMSIsInJlUmVuZGVyMiIsInJlUmVuZGVyMyIsInNzIiwic3MyIiwicmVSZW5kZXI1YSIsInJlUmVuZGVyNWIiLCJtYXJrdXA3IiwibW9kIiwicmVSZW5kZXJSZWYiLCJyZVJlbmRlcjZhIiwicmVSZW5kZXI2YiIsInJlUmVuZGVyU3ZnIiwicmVSZW5kZXJTdmcyIiwicmVSZW5kZXI3XzEiLCJyZVJlbmRlcjdfMiIsInJlUmVuZGVyN18zIiwiRnVuYzEiLCJ0aW1lciIsInQiLCJQcm9taXNlIiwicmVzIiwic2V0VGltZW91dCIsInAiLCJGdW5jMiIsImZ1bmMiLCJlIiwicmVSZW5kZXJfc3VzIl0sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtR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QUNBLGtCQUFjLEVBQUVDLElBQUksQ0FBQ0YsQ0FBRDtBQURwQjtBQUVEOztBQUVEaEYsbUZBQU0sQ0FDSjtBQUFBLFlBQ0Usa0ZBQUMsS0FBRDtBQUFBLGVBQ0UsaUZBQUMsS0FBRCxLQURGLEVBRUUsaUZBQUMsR0FBRDtBQUNFLFNBQUcsRUFBQyxnQkFETjtBQUVFLFNBQUcsRUFBRzFGLEVBQUQsSUFBcUJFLE9BQU8sQ0FBQ21ILEdBQVIsQ0FBWSxtQkFBWixFQUFpQ3JILEVBQWpDLENBRjVCO0FBR0Usa0JBQVc2SyxDQUFELElBQW9CM0ssT0FBTyxDQUFDbUgsR0FBUixDQUFZd0QsQ0FBWjtBQUhoQyxNQUZGLEVBT0cxRCxHQVBIO0FBQUE7QUFERixFQURJLEVBWUo2QixVQVpJLENBQU47O0FBZUFFLE1BQU0sQ0FBQzRCLFlBQVAsR0FBc0IsTUFDcEJwRixtRkFBTSxDQUNKO0FBQUEsWUFDRSxpRkFBQyxLQUFEO0FBQUEsY0FDRSxpRkFBQyxLQUFEO0FBREY7QUFERixFQURJLEVBTUpzRCxVQU5JLENBRFIsQyIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDApO1xuIiwiLyoqXHJcbiAqIHByb3ZpZGVzIGZ1bmN0aW9ucyBuZWVkZWQgYnkgYmFiZWwgZm9yIGEgY3VzdG9tIHByYWdtYVxyXG4gKiB0byByZW5kZXIgcGFyc2VkIGpzeCBjb2RlIHRvIGh0bWwsXHJcbiAqIGRpZmYgYW5kIHBhdGNoIGluIHN1YnNlcXVlbnQgcmVuZGVyc1xyXG4gKi9cclxuXHJcblxyXG4vLyBhIG1hcCBiZXR3ZWVuIHYtdHJlZXMgYW5kIHJlbmRlcmVkIERPTSBub2RlcyAvIGNvbnRhaW5lcnNcclxuY29uc3QgcmVuZGVyZWRWVHJlZXMgPSBuZXcgV2Vha01hcDxFbGVtZW50LCBSb290Vk5vZGUgfCBFbGVtZW50Vk5vZGU+KCk7XHJcbi8vIGxpc3Qgb2YgYHJlZmAgY2FsbGJhY2tzIHRvIGJlIGNhbGxlZCBhZnRlciB0aGUgRE9NIG5vZGVzIGFyZSByZW5kZXJlZFxyXG5jb25zdCByZWZzVG9DYWxsOiBBcnJheTwoKSA9PiB2b2lkPiA9IFtdO1xyXG5cclxuLy8gcHJvcHMgd2hpY2ggd2lsbCBiZSByZW5kZXJlZCBhcyBhdHRyaWJ1dGVzXHJcbi8vIEZ1bmN0aW9ucyB3aWxsIGJlIHVzZWQgZm9yIGV2ZW50IGxpc3RlbmVycy4gKHdpdGggYXR0cmlidXRlIG5hbWUgc3RhcnRpbmcgd2l0aCAnb24tJylcclxuLy8gT2JqZWN0IHdpbGwgYmUgc2V0IGFzIHByb3BlcnR5IG9uIHRoZSByZW5kZXJlZCBub2RlIGVsZW1lbnRcclxudHlwZSBBdHRyaWJ1dGVzID0ge1xyXG4gIFtrZXk6IHN0cmluZ106IHN0cmluZyB8IGJvb2xlYW4gfCBudW1iZXIgfCBGdW5jdGlvbiB8IE9iamVjdDtcclxufTtcclxuXHJcbi8vIGFkZGl0aW9uYWwgYXR0cmlidXRlcyB3aGljaCBjYW4gaGF2ZSBhZGRpdGlvbmFsIHNlcmlhbGl6YXRpb24gYmVmb3JlIHJlbmRlcmluZyBhcyBhdHRyaWJ1dGVzXHJcbnR5cGUgU3BlY2lhbEF0dHJpYnV0ZXMgPSB7XHJcbiAgY2xhc3M/OiBzdHJpbmcgfCBzdHJpbmdbXTtcclxuICBzdHlsZT86IHN0cmluZyB8IHsgW2tleTogc3RyaW5nXTogc3RyaW5nIH07XHJcbiAgcmVmPzogRnVuY3Rpb247XHJcbn07XHJcblxyXG4vLyB0eXBlcyBvZiBjaGlsZHJlbiB3aGljaCB3aWxsIGJlIHBhc3NlZCBieSB0aGUganN4IHBhcnNlciBwbHVnaW5cclxuLy8gbmVzdGVkIGFycmF5IGluIGNhc2Ugb2ZcclxuLy8gPGVsZW0+XHJcbi8vICAgPHNwYW4vPlxyXG4vLyAgIHtjaGlsZHJlbn1cclxuLy8gICB0ZXh0XHJcbi8vICAgPGRpdi8+XHJcbi8vIDwvZWxlbT5cclxudHlwZSBKU1hDaGlsZCA9IFZOb2RlSW50ZXJmYWNlIHwgTm9kZSB8IHN0cmluZyB8IG51bWJlciB8IGJvb2xlYW4gfCBudWxsIHwgdW5kZWZpbmVkIHwgSlNYQ2hpbGRbXTtcclxuXHJcbi8vIGNoaWxkIGVsZW1lbnRzIGluIHRoZSBqc3ggbWFya3VwIHdoaWNoIHdpbGwgYmUgcGFzc2VkIHRvIHRoZSBoIGZ1bmN0aW9uIGFzIGBwcm9wcy5jaGlsZHJlbmBcclxudHlwZSBDaGlsZHJlblByb3BzID0ge1xyXG4gIGNoaWxkcmVuOiBKU1hDaGlsZFtdO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIHByb3BzIG9iamVjdCB3aGljaCB3aWxsIGJlIHBhc3NlZCB0byBqc3ggcHJhZ21hIGFuZCBjdXN0b20gY29tcG9uZW50IGZ1bmN0aW9uc1xyXG4gKi9cclxudHlwZSBKc3hQcm9wcyA9IEF0dHJpYnV0ZXMgJiBTcGVjaWFsQXR0cmlidXRlcyAmIENoaWxkcmVuUHJvcHM7XHJcblxyXG4vKipcclxuICogcmV0dXJuIHRoZSBjbG9zZXN0IGFuY2VzdG9yIG9mIHRoZSBnaXZlbiBWTm9kZSB3aGljaCBoYXMgYW4gRE9NIEVsZW1lbnQgKGkuZS4gaXMgbm90IGEgRnJhZ21lbnQpXHJcbiAqIEBwYXJhbSB2Tm9kZSB7Vk5vZGVJbnRlcmZhY2V9XHJcbiAqL1xyXG5mdW5jdGlvbiBnZXRQYXJlbnRFbGVtZW50Tm9kZSh2Tm9kZTogVk5vZGVJbnRlcmZhY2UpOiBFbGVtZW50Vk5vZGUge1xyXG4gIHdoaWxlICh2Tm9kZS5wYXJlbnQpIHtcclxuICAgIHZOb2RlID0gdk5vZGUucGFyZW50O1xyXG4gICAgaWYgKHZOb2RlLm5vZGUpIGJyZWFrO1xyXG4gIH1cclxuXHJcbiAgLy8gYC5ub2RlYCBpcyBvbmx5IG9uIFwiVGV4dFwiIGFuZCBcIkVsZW1lbnRcIiB0eXBlIFZOb2RlLCBhbmQgb25seSBFbGVtZW50IGhhcyBjaGlsZHJlblxyXG4gIHJldHVybiAodk5vZGUgYXMgdW5rbm93bikgYXMgRWxlbWVudFZOb2RlO1xyXG59XHJcblxyXG4vKipcclxuICogZm9yIHRoZSBnaXZlbiB2LW5vZGUgYWxsIGNoaWxkcmVuIGFyZSB0cmF2ZXJzZWQgdGlsbCBjaGlsZHJlbiB3aXRoIERPTSBub2RlcyBhcmUgZm91bmRcclxuICpcclxuICogQHBhcmFtIHtWTm9kZUludGVyZmFjZX0gdk5vZGUgLSBwYXJlbnQgbm9kZVxyXG4gKiBAcGFyYW0ge1ZOb2RlSW50ZXJmYWNlfSBbYWx3YXlzQWxsb3ddIC0gYWx3YXlzIGNvbnRhaW4gdGhlIHByb3ZpZGVkIG5vZGUgaW4gdGhlIHJldHVybmVkIGxpc3QsIGV2ZW4gaWYgaXQgaXMgbm90IGFuIGVsZW1lbnQgd2l0aCBET00gTm9kZVxyXG4gKiBAcmV0dXJucyB7Vk5vZGVJbnRlcmZhY2VbXX1cclxuICovXHJcbmZ1bmN0aW9uIGdldENoaWxkcmVuV2l0aE5vZGVzKHZOb2RlOiBWTm9kZUludGVyZmFjZSwgYWx3YXlzQWxsb3c/OiBWTm9kZUludGVyZmFjZSk6IFZOb2RlSW50ZXJmYWNlW10ge1xyXG4gIHJldHVybiB2Tm9kZS5jaGlsZHJlblxyXG4gICAgLm1hcChjaGlsZE5vZGUgPT4ge1xyXG4gICAgICBpZiAoY2hpbGROb2RlID09PSBhbHdheXNBbGxvdykgcmV0dXJuIGNoaWxkTm9kZTtcclxuICAgICAgaWYgKGNoaWxkTm9kZS5ub2RlKSByZXR1cm4gY2hpbGROb2RlO1xyXG4gICAgICByZXR1cm4gZ2V0Q2hpbGRyZW5XaXRoTm9kZXMoY2hpbGROb2RlLCBhbHdheXNBbGxvdyk7XHJcbiAgICB9KVxyXG4gICAgLmZsYXQoSW5maW5pdHkpIGFzIFZOb2RlSW50ZXJmYWNlW107XHJcbn1cclxuXHJcbi8qKlxyXG4gKiByZXR1cm5zIGEgdHVwbGUgb2YgdGhlIGNsb3Nlc3QgYW5jZXN0b3Igd2hpY2ggaGFzIGEgRE9NIE5vZGUsXHJcbiAqIGFuZCB0aGUgbm9kZSB3aGljaCBoYXMgYSBET00gbm9kZSBhbmQgaXMgcmVuZGVyZWQgYXMgdGhlIG5leHQgc2libGluZyBmb3IgdGhlIHByb3ZpZGVkIG5vZGUgaW4gdGhlIERPTS5cclxuICogT3IgbnVsbCB3aGVuIGl0IGlzIHRoZSBsYXN0IGNoaWxkIGl0c2VsZlxyXG4gKlxyXG4gKiBAcGFyYW0ge1ZOb2RlSW50ZXJmYWNlfSB2Tm9kZVxyXG4gKiBAcmV0dXJucyB7KFtOb2RlLCBOb2RlIHwgbnVsbF0pfVxyXG4gKi9cclxuZnVuY3Rpb24gZ2V0UGFyZW50QW5kTmV4dFNpYmxpbmcodk5vZGU6IFZOb2RlSW50ZXJmYWNlKTogW05vZGUsIE5vZGUgfCBudWxsXSB7XHJcbiAgLy8gbm9kZSBhbmNlc3RvciB3aXRoIEVsZW1lbnQsXHJcbiAgY29uc3QgcGFyZW50V2l0aEVsZW1lbnQgPSBnZXRQYXJlbnRFbGVtZW50Tm9kZSh2Tm9kZSk7XHJcbiAgY29uc3Qgc2libGluZ3MgPSBnZXRDaGlsZHJlbldpdGhOb2RlcyhwYXJlbnRXaXRoRWxlbWVudCwgdk5vZGUpO1xyXG5cclxuICBjb25zdCBpbmRleE9mTm9kZUluU2libGluZ3NMaXN0ID0gc2libGluZ3MuaW5kZXhPZih2Tm9kZSk7XHJcblxyXG4gIC8vIG5vIHByZXYgc2libGluZywgcHV0IGJlZm9yZSBhbnkgb3RoZXIgZWxlbWVudCAob3IgbnVsbCBpZiBwYXJlbnQgaGFzIG5vIGNoaWxkcmVuIHlldClcclxuICBpZiAoaW5kZXhPZk5vZGVJblNpYmxpbmdzTGlzdCA9PT0gMCkge1xyXG4gICAgcmV0dXJuIFtwYXJlbnRXaXRoRWxlbWVudC5ub2RlLCBwYXJlbnRXaXRoRWxlbWVudC5ub2RlLmZpcnN0Q2hpbGRdO1xyXG4gIH1cclxuXHJcbiAgY29uc3QgcHJldlNpYmxpbmcgPSBzaWJsaW5nc1tpbmRleE9mTm9kZUluU2libGluZ3NMaXN0IC0gMV07XHJcbiAgY29uc3QgbmV4dFNpYmxpbmdOb2RlID0gcHJldlNpYmxpbmcgPyBwcmV2U2libGluZy5ub2RlIS5uZXh0U2libGluZyA6IG51bGw7XHJcblxyXG4gIHJldHVybiBbcGFyZW50V2l0aEVsZW1lbnQubm9kZSwgbmV4dFNpYmxpbmdOb2RlXTtcclxufVxyXG5cclxuLyoqXHJcbiAqIHJldHVybnMgdHJ1ZSBpZiBub3QgbnVsbGlzaCBvciBmYWxzZVxyXG4gKiB0aGF0IG1lYW5zIDAgb3IgZW1wdHkgc3RyaW5nIGFyZSBhbGxvd2VkXHJcbiAqIEBwYXJhbSB7Kn0gdmFsXHJcbiAqL1xyXG5mdW5jdGlvbiB0cnV0aHkodmFsdWU6IGFueSk6IGJvb2xlYW4ge1xyXG4gIHJldHVybiB2YWx1ZSAhPT0gZmFsc2UgJiYgdmFsdWUgIT09IG51bGwgJiYgdmFsdWUgIT09IHVuZGVmaW5lZDtcclxufVxyXG5cclxuLyoqXHJcbiAqIGVzY2FwZXMgdGhlIHByb3ZpZGVkIHN0cmluZyBhZ2FpbnN0IHhzcyBhdHRhY2tzIGV0Y1xyXG4gKlxyXG4gKiBAcGFyYW0ge3N0cmluZ30gdGV4dFxyXG4gKiBAcmV0dXJucyB7c3RyaW5nfVxyXG4gKi9cclxuZnVuY3Rpb24gc2FuaXRpemUodGV4dDogc3RyaW5nKTogc3RyaW5nIHtcclxuICBjb25zdCBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gIGRpdi5pbm5lclRleHQgPSB0ZXh0O1xyXG4gIHJldHVybiBkaXYuaW5uZXJIVE1MO1xyXG59XHJcblxyXG4vKipcclxuICogYmFzaWNhbGx5IGBFbGVtZW50Lm91dGVySFRNTGAgYnV0IGFsc28gc3VwcG9ydHMgVGV4dCBub2RlIGFuZCBEb2N1bWVudEZyYWdtZW50XHJcbiAqIEBwYXJhbSBlbGVtZW50IHtOb2RlfSAtIGVsZW1lbnQgd2hpY2ggaXRzIGh0bWwgbmVlZHMgdG8gYmUgcmV0dXJuZWRcclxuICovXHJcbmZ1bmN0aW9uIGdldE91dGVySHRtbChlbGVtZW50OiBOb2RlKTogc3RyaW5nIHtcclxuICBpZiAoZWxlbWVudCBpbnN0YW5jZW9mIEVsZW1lbnQpIHJldHVybiBlbGVtZW50Lm91dGVySFRNTDtcclxuICBpZiAoZWxlbWVudCBpbnN0YW5jZW9mIFRleHQpIHJldHVybiBzYW5pdGl6ZShlbGVtZW50Lndob2xlVGV4dCk7XHJcbiAgaWYgKGVsZW1lbnQgaW5zdGFuY2VvZiBEb2N1bWVudEZyYWdtZW50KSB7XHJcbiAgICByZXR1cm4gQXJyYXkuZnJvbShlbGVtZW50LmNoaWxkTm9kZXMpXHJcbiAgICAgIC5tYXAoZWwgPT4gZ2V0T3V0ZXJIdG1sKGVsKSlcclxuICAgICAgLmpvaW4oXCJcIik7XHJcbiAgfVxyXG5cclxuICAvLyBzaG91bGRuJ3QgcmVhY2ggdGhpcyBwb2ludFxyXG4gIGNvbnNvbGUud2FybihcImdldE91dGVySHRtbCBkb2VzIG5vdCBzdXBwb3J0IHRoaXMgdHlwZSBvZiBlbGVtZW50XCIsIGVsZW1lbnQpO1xyXG4gIHJldHVybiBcIlwiO1xyXG59XHJcblxyXG4vKipcclxuICogZ2VuZXJhdGVzIHRoZSBodG1sIGFzIGEgc3RyaW5nIHdoaWNoIGNhbiBiZSB1c2VkIGZvciBleGFtcGxlIHdpdGggYGVsZW1lbnQuaW5uZXJIVE1MKClgXHJcbiAqXHJcbiAqIEBwYXJhbSB0YWcge3N0cmluZ3xGdW5jdGlvbn0gLSB0YWcgYXJndW1lbnQgb2YgdGhlIGpzeCBjYWxsXHJcbiAqIEBwYXJhbSBwcm9wcyB7T2JqZWN0fSAtIHByb3BzIGFyZ3VtZW50IG9mIGpzeCBjYWxsXHJcbiAqL1xyXG5mdW5jdGlvbiBhc0h0bWxTdHJpbmcodGFnOiBzdHJpbmcgfCBGdW5jdGlvbiwgcHJvcHM6IEF0dHJpYnV0ZXMgJiBTcGVjaWFsQXR0cmlidXRlcywgY2hpbGRyZW46IFZOb2RlSW50ZXJmYWNlW10pIHtcclxuICBjb25zdCBhdHRyaWJ1dGVzID0gT2JqZWN0LmVudHJpZXMocHJvcHMpXHJcbiAgICAuZmlsdGVyKChbLCB2YWx1ZV0pID0+IHRydXRoeSh2YWx1ZSkpXHJcbiAgICAubWFwKChba2V5LCB2YWx1ZV0pID0+IHtcclxuICAgICAgLy8gZS5nLiBkaXNhYmxlZDogdHJ1ZSA9PiA8dGFnIGRpc2FibGVkPlxyXG4gICAgICBpZiAodmFsdWUgPT09IHRydWUpIHJldHVybiBrZXk7XHJcblxyXG4gICAgICAvLyBmb3Igc3R5bGUgYXMgb2JqZWN0OlxyXG4gICAgICAvLyAoc3R5bGU6KSB7ZGlzcGxheTogXCJub25lXCIsIHBvc2l0aW9uOiBcImFic29sdXRlXCJ9ID09PiAnZGlzcGxheTogbm9uZTsgcG9zaXRpb246IGFic29sdXRlOydcclxuICAgICAgaWYgKGtleSA9PT0gXCJzdHlsZVwiICYmIHR5cGVvZiB2YWx1ZSA9PT0gXCJvYmplY3RcIikge1xyXG4gICAgICAgIHZhbHVlID0gT2JqZWN0LmVudHJpZXModmFsdWUpXHJcbiAgICAgICAgICAvLyBpZ25vcmUgc3R1ZmYgbGlrZSBge2JhY2tncm91bmQ6IGFjdGl2ZSAmJiBcInJlZFwifWAgd2hlbiBgYWN0aXZlID09PSBmYWxzZSAvIG51bGwgLyB1bmRlZmluZWRgXHJcbiAgICAgICAgICAuZmlsdGVyKChbLCB2XSkgPT4gdHJ1dGh5KHYpKVxyXG4gICAgICAgICAgLy8gY3VycmVudGx5IHN1cHBvcnRzIFwiYmFja2dyb3VuZC1jb2xvclwiIG5vdCBcImJhY2tncm91bmRDb2xvclwiXHJcbiAgICAgICAgICAubWFwKChbaywgdl0pID0+IGAke2t9OiAke3Z9YClcclxuICAgICAgICAgIC5qb2luKFwiOyBcIik7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIChjbGFzczopIFtcImJ0blwiLCBcInJlZFwiXSA9PT4gXCJidG4gcmVkXCJcclxuICAgICAgaWYgKGtleSA9PT0gXCJjbGFzc1wiICYmIEFycmF5LmlzQXJyYXkodmFsdWUpKSB2YWx1ZSA9IHZhbHVlLmpvaW4oXCIgXCIpO1xyXG5cclxuICAgICAgcmV0dXJuIGAke2tleX09XCIke3ZhbHVlfVwiYDtcclxuICAgIH0pXHJcbiAgICAuam9pbihcIiBcIik7XHJcblxyXG4gIGNvbnN0IGNvbnRlbnQgPSBjaGlsZHJlbi5tYXAoY2hpbGQgPT4gY2hpbGQudG9TdHJpbmcoKSkuam9pbihcIlwiKTtcclxuXHJcbiAgcmV0dXJuIGA8JHt0YWd9ICR7YXR0cmlidXRlc30+JHtjb250ZW50fTwvJHt0YWd9PmA7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBnZW5lcmF0ZXMgSFRNTCBOb2RlIGVsZW1lbnRzIGZyb20gdGhlIHByb3ZpZGVkIGpzeCBpdGVtXHJcbiAqIEBwYXJhbSB0YWcge3N0cmluZ3xGdW5jdGlvbn0gLSB0YWcgYXJndW1lbnQgb2YgdGhlIGpzeCBjYWxsXHJcbiAqIEBwYXJhbSBwcm9wcyB7T2JqZWN0fSAtIHByb3BzIGFyZ3VtZW50IG9mIGpzeCBjYWxsXHJcbiAqL1xyXG5mdW5jdGlvbiBhc05vZGUoXHJcbiAgdGFnOiBzdHJpbmcgfCB1bmRlZmluZWQsXHJcbiAgcHJvcHM6IEF0dHJpYnV0ZXMgJiBTcGVjaWFsQXR0cmlidXRlcyxcclxuICBjaGlsZHJlbjogVk5vZGVJbnRlcmZhY2VbXSxcclxuICBzdmdDb250ZXh0ID0gZmFsc2UsXHJcbik6IEVsZW1lbnQgfCBEb2N1bWVudEZyYWdtZW50IHtcclxuICAvLyBmcmFnbWVudFxyXG4gIGlmICghdGFnKSB7XHJcbiAgICBjb25zdCBmcmFnbWVudHMgPSBjaGlsZHJlbi5tYXAoaXRlbSA9PiBpdGVtLmFzTm9kZSgpKTtcclxuXHJcbiAgICBjb25zdCBkb2N1bWVudEZyYWdtZW50ID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO1xyXG5cclxuICAgIGRvY3VtZW50RnJhZ21lbnQuYXBwZW5kKC4uLmZyYWdtZW50cyk7XHJcbiAgICByZXR1cm4gZG9jdW1lbnRGcmFnbWVudDtcclxuICB9XHJcblxyXG4gIC8vIHJlbWVtYmVyIGlmIHRoZSBzdmcgY29udGV4dCB3YXMgc2V0IGZvciB0aGlzIG5vZGUsIGFuZCByZXBsYWNlIGFmdGVyIGdlbmVyYXRpbmcgYWxsIGNoaWxkcmVuXHJcblxyXG4gIC8vIGN1cnJlbnRseSBub3Qgc3VwcG9ydGluZyB0aGUgYGlzYCBvcHRpb24gZm9yIEN1c3RvbWl6ZWQgYnVpbHQtaW4gZWxlbWVudHNcclxuICBjb25zdCBub2RlID0gc3ZnQ29udGV4dCA/IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyhcImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIsIHRhZykgOiBkb2N1bWVudC5jcmVhdGVFbGVtZW50KHRhZyk7XHJcblxyXG4gIC8vIGFkZCBhdHRyaWJ1dGVzLCBldmVudCBsaXN0ZW5lcnMgZXRjLlxyXG4gIEVsZW1lbnRWTm9kZS5hZGRQcm9wcyhub2RlLCBwcm9wcyk7XHJcblxyXG4gIG5vZGUuYXBwZW5kKFxyXG4gICAgLi4uY2hpbGRyZW5cclxuICAgICAgLy8gLmZsYXQoKVxyXG4gICAgICAubWFwKGNoaWxkID0+IGNoaWxkLmFzTm9kZSgpKSxcclxuICApO1xyXG5cclxuICByZXR1cm4gbm9kZTtcclxufVxyXG5cclxuLyoqXHJcbiAqIHJlbmRlcnMgdGhlIEhUTUwgZm9yIHRoZSBnaXZlbiBWLU5vZGUgYW5kIGFkZHMgdG8gdGhlIERPTSBhdCB0aGUgY29ycmVjdCBwb3NpdGlvblxyXG4gKiBAcGFyYW0gbmV3Tm9kZSAtIHZOb2RlIHRvIGJlIHJlbmRlcmVkIGFzIEhUTUwgTm9kZSBhbmQgYWRkZWQgdG8gRE9NXHJcbiAqL1xyXG5mdW5jdGlvbiBpbnNlcnROZXdJdGVtKG5ld05vZGU6IFZOb2RlSW50ZXJmYWNlKSB7XHJcbiAgY29uc3QgW3BhcmVudCwgbmV4dFNpYmxpbmddID0gZ2V0UGFyZW50QW5kTmV4dFNpYmxpbmcobmV3Tm9kZSk7XHJcbiAgcGFyZW50Lmluc2VydEJlZm9yZShuZXdOb2RlLmFzTm9kZSgpLCBuZXh0U2libGluZyk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBpdGVyYXRlIG92ZXIgYWxsIHRoZSBjaGlsZHJlbiBvZiB0aGUgcHJvdmlkZWQgbm9kZXMsIGFuZCBlYWNoIHBhaXJ3aXNlXHJcbiAqXHJcbiAqIEBwYXJhbSB7Vk5vZGVJbnRlcmZhY2V9IG9sZE5vZGUgLSB2LW5vZGUgZnJvbSB0aGUgb2xkIHJlbmRlclxyXG4gKiBAcGFyYW0ge1ZOb2RlSW50ZXJmYWNlfSBuZXdOb2RlLSB2LW5vZGUgZnJvbSB0aGUgbmV3IHRyZWUgd2hpY2ggaXRzIGNoaWxkcmVuIGhhdmUgdG8gcmVwbGFjZSB0aGUgY2hpbGRyZW4gb2YgdGhlIG9sZCBub2RlXHJcbiAqL1xyXG5mdW5jdGlvbiBkaWZmQW5kUGF0Y2hDaGlsZHJlbihvbGROb2RlOiBWTm9kZUludGVyZmFjZSwgbmV3Tm9kZTogVk5vZGVJbnRlcmZhY2UpIHtcclxuICBvbGROb2RlLmNoaWxkcmVuLmZvckVhY2goKG9sZENoaWxkLCBpeCkgPT4ge1xyXG4gICAgY29uc3QgbmV3Q2hpbGQgPSBuZXdOb2RlLmNoaWxkcmVuW2l4XTtcclxuXHJcbiAgICAvLyBjaGlsZCB3YXMgcmVtb3ZlZFxyXG4gICAgaWYgKCFuZXdDaGlsZCkgb2xkQ2hpbGQucmVtb3ZlRnJvbURPTSgpO1xyXG4gICAgLy8gY2hpbGQgaXMgbW9kaWZpZWRcclxuICAgIGVsc2UgaWYgKG5ld0NoaWxkLnR5cGUgPT09IG9sZENoaWxkLnR5cGUpIG9sZENoaWxkLmRpZmZBbmRQYXRjaChuZXdDaGlsZCk7XHJcbiAgICAvLyBjaGlsZCBpcyByZXBsYWNlZFxyXG4gICAgZWxzZSB7XHJcbiAgICAgIG9sZENoaWxkLnJlbW92ZUZyb21ET00oKTtcclxuICAgICAgaW5zZXJ0TmV3SXRlbShuZXdDaGlsZCk7XHJcbiAgICB9XHJcbiAgfSk7XHJcblxyXG4gIC8vIG5ldyBhZGRpdGlvbiBpdGVtc1xyXG4gIGNvbnN0IG5ld0l0ZW1zID0gbmV3Tm9kZS5jaGlsZHJlbi5zbGljZShvbGROb2RlLmNoaWxkcmVuLmxlbmd0aCk7XHJcbiAgaWYgKG5ld0l0ZW1zLmxlbmd0aCkge1xyXG4gICAgY29uc3QgZG9jdW1lbnRGcmFnbWVudCA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcclxuICAgIG5ld0l0ZW1zLmZvckVhY2goaXRlbSA9PiBkb2N1bWVudEZyYWdtZW50LmFwcGVuZChpdGVtLmFzTm9kZSgpKSk7XHJcblxyXG4gICAgY29uc3QgW3BhcmVudCwgbmV4dFNpYmxpbmddID0gZ2V0UGFyZW50QW5kTmV4dFNpYmxpbmcobmV3SXRlbXNbMF0pO1xyXG4gICAgcGFyZW50Lmluc2VydEJlZm9yZShkb2N1bWVudEZyYWdtZW50LCBuZXh0U2libGluZyk7XHJcbiAgfVxyXG59XHJcblxyXG4vLyBiYXNlIGNsYXNzIHdoaWNoIHdpbGwgYmUgaW5oZXJpdGVkIGZyb20ganN4IGFuZCBmcmFnbWVudHMgZnVuY3Rpb24gbm9kZSBnZW5lcmF0aW9uXHJcbi8vIGFuZCB3aWxsIGJlIHVzZWQgdG8gZGlzdGluZ3Vpc2ggdGhlbSB3aXRoIG90aGVyIEVsZW1lbnRzXHJcbmNsYXNzIFZOb2RlIHt9XHJcblxyXG4vLyBJbnRlcmZhY2Ugd2hpY2ggd2lsbCBiZSBpbXBsZW1lbnRlZCBieSBhbGwgdHlwZXMgb2Ygbm9kZXMgaW4gdGhlIFYtRE9NIFRyZWVcclxuZXhwb3J0IGludGVyZmFjZSBWTm9kZUludGVyZmFjZSB7XHJcbiAgLy8gdGhlIGh0bWwgY29udGVudCBhcyBzdHJpbmcsIHdoaWNoIGFsbG93cyB0byB1c2UgYXMgYGVsLmlubmVySFRNTCA9IDxkaXY+Li4uPC9kaXY+YFxyXG4gIHRvU3RyaW5nKCk6IHN0cmluZztcclxuICAvLyBjcmVhdGVzIEhUTUwgTm9kZXMgKEhUTUxFbGVtZW50LCBTVkdFbGVtZW50LCBEb2N1bWVudEZyYWdtZW50IGFuZCBUZXh0IG5vZGUpIGZvciB0aGUgVi1UcmVlXHJcbiAgYXNOb2RlKCk6IE5vZGU7XHJcbiAgLy8gcmVmZXJlbmNlIHRvIHRoZSBwYXJlbnQgVi1Ob2RlIG9mIHRoaXMgVi1Ob2RlLiAoaS5lLiB0aGlzIG5vZGUgd2FzIHRoZSBjaGlsZCBlbGVtZW50IGluIGpzeClcclxuICAvLyBudWxsIGluIGNhc2Ugb2YgdGhlIHJvb3QgZWxlbWVudCBmcm9tIHRoZSByZW5kZXIgdHJlZVxyXG4gIHBhcmVudDogVk5vZGVJbnRlcmZhY2UgfCBudWxsO1xyXG4gIC8vIGxpc3Qgb2YgVi1Ob2RlIGNvbnZlcnRlZCBjaGlsZCBlbGVtZW50IGZyb20ganN4IGNvZGVcclxuICBjaGlsZHJlbjogQXJyYXk8Vk5vZGVJbnRlcmZhY2UgfCBuZXZlcj47XHJcbiAgLy8gZS5nLiB0ZXh0LCBodG1sIGVsZW1lbnQsIG51bGwgZXRjXHJcbiAgdHlwZTogc3RyaW5nO1xyXG4gIC8vIHJlZmVyZW5jZSB0byB0aGUgY3JlYXRlZCBIVE1MIGVsZW1lbnQgZm9yIHRoaXMgVi1Ob2RlXHJcbiAgbm9kZT86IE5vZGU7XHJcbiAgLy8gcmVtb3ZlcyBhbGwgSFRNTCBFbGVtZW50cyB3aGljaCB3ZXJlIHJlbmRlcmVkIGFzIHBhcnQgb2YgdGhpcyBWLU5vZGUgb3IgaXRzIGNoaWxkcmVuIGZyb20ganN4IGNvZGVcclxuICByZW1vdmVGcm9tRE9NKCk6IHZvaWQ7XHJcbiAgLy8gdXBkYXRlIHRoZSBET00gbm9kZSB3aGljaCB3ZXJlIHJlbmRlcmVkIGZvciB0aGlzIHYtbm9kZSBhbmQgaXQncyBjaGlsZHJlblxyXG4gIC8vIHRvIHJlZmxlY3QgYWxsIGNoYW5nZXMgY29taW5nIGZyb20gdGhlIG5ldyBWLU5vZGVcclxuICBkaWZmQW5kUGF0Y2gobmV3Tm9kZTogVk5vZGVJbnRlcmZhY2UpOiB2b2lkO1xyXG59XHJcblxyXG4vLyBWLU5vZGUgd2hpY2ggd2lsbCBiZSByZW5kZXJlZCBhcyBIVE1MRWxlbWVudCBvciBTVkdFbGVtZW50XHJcbmNsYXNzIEVsZW1lbnRWTm9kZSBleHRlbmRzIFZOb2RlIGltcGxlbWVudHMgVk5vZGVJbnRlcmZhY2Uge1xyXG4gIHR5cGUgPSBcIkVsZW1lbnRcIjtcclxuICB0YWc6IHN0cmluZztcclxuICBwcm9wczogQXR0cmlidXRlcyAmIFNwZWNpYWxBdHRyaWJ1dGVzO1xyXG4gIG5vZGU6IEVsZW1lbnQgPSBudWxsIGFzIGFueTtcclxuICBjaGlsZHJlbjogVk5vZGVJbnRlcmZhY2VbXTtcclxuICBwYXJlbnQ6IFZOb2RlSW50ZXJmYWNlID0gbnVsbCBhcyBhbnk7XHJcbiAgc3ZnQ29udGV4dDogYm9vbGVhbiA9IGZhbHNlOyAvLyB3aWxsIGJlIHNldCB0byB0cnVlIHdoZW4gZWxlbWVudCBpcyBhbiBTVkcgRWxlbWVudFxyXG5cclxuICBjb25zdHJ1Y3Rvcih7IHRhZywgcHJvcHMsIGNoaWxkcmVuIH06IHsgdGFnOiBzdHJpbmc7IHByb3BzOiBBdHRyaWJ1dGVzICYgU3BlY2lhbEF0dHJpYnV0ZXM7IGNoaWxkcmVuOiBKU1hDaGlsZFtdIH0pIHtcclxuICAgIHN1cGVyKCk7XHJcbiAgICB0aGlzLnRhZyA9IHRhZztcclxuICAgIHRoaXMucHJvcHMgPSBwcm9wcztcclxuXHJcbiAgICAvLyBjb252ZXJ0IGNoaWxkIGpzeCBjb250ZW50IHRvIFZOb2Rlc1xyXG4gICAgdGhpcy5jaGlsZHJlbiA9IGNoaWxkcmVuLm1hcChjaGlsZCA9PiB7XHJcbiAgICAgIGlmIChBcnJheS5pc0FycmF5KGNoaWxkKSkgcmV0dXJuIG5ldyBGcmFnbWVudFZOb2RlKGNoaWxkKTtcclxuICAgICAgaWYgKGNoaWxkIGluc3RhbmNlb2YgVk5vZGUpIHJldHVybiBjaGlsZCBhcyBWTm9kZUludGVyZmFjZTtcclxuICAgICAgaWYgKGNoaWxkIGluc3RhbmNlb2YgTm9kZSkgcmV0dXJuIG5ldyBMaXZlTm9kZVZOb2RlKGNoaWxkKTtcclxuICAgICAgaWYgKCF0cnV0aHkoY2hpbGQpKSByZXR1cm4gbmV3IE51bGxWTm9kZSgpO1xyXG5cclxuICAgICAgcmV0dXJuIG5ldyBUZXh0Vk5vZGUoY2hpbGQgYXMgc3RyaW5nIHwgbnVtYmVyIHwgdHJ1ZSk7XHJcbiAgICB9KTtcclxuICAgIC8vIHNldCBwYXJlbnQgcHJvcGVydHkgb24gYWxsIGNoaWxkcmVuXHJcbiAgICB0aGlzLmNoaWxkcmVuLmZvckVhY2goY2hpbGQgPT4gKGNoaWxkLnBhcmVudCA9IHRoaXMpKTtcclxuICB9XHJcblxyXG4gIHRvU3RyaW5nKCkge1xyXG4gICAgcmV0dXJuIGFzSHRtbFN0cmluZyh0aGlzLnRhZywgdGhpcy5wcm9wcywgdGhpcy5jaGlsZHJlbik7XHJcbiAgfVxyXG5cclxuICBhc05vZGUoKSB7XHJcbiAgICAvLyB0cmF2ZXJzZSB0aGUgVlRyZWUgdG8gY2hlY2sgaWYgdGhpcyBlbGVtZW50IGlzIHJlbmRlcmVkIGluc2lkZSBhbiBzdmcgZWxlbWVudFxyXG4gICAgbGV0IHN2Z0NvbnRleHQgPSBmYWxzZTtcclxuICAgIGxldCB2Tm9kZTogVk5vZGVJbnRlcmZhY2UgPSB0aGlzO1xyXG4gICAgd2hpbGUgKHZOb2RlLnBhcmVudCkge1xyXG4gICAgICAvLyBAdHMtaWdub3JlIC0gRWxlbWVudFZOb2RlIGhhcyB0aGUgdGFnIHByb3BlcnR5LCBvdGhlciBhcmUgdW5kZWZpbmVkXHJcbiAgICAgIGlmICh2Tm9kZS50YWcgPT09IFwic3ZnXCIpIHtcclxuICAgICAgICBzdmdDb250ZXh0ID0gdHJ1ZTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgICB2Tm9kZSA9IHZOb2RlLnBhcmVudDtcclxuICAgIH1cclxuXHJcbiAgICAvLyBzdG9yZSB0aGUgc3ZnIGNvbnRleHQgaW5mb3JtYXRpb24gdG8gdGhlIHByb3BlcnR5IHRvIGFsbG93IHVzaW5nIGl0IHdoZW4gdGhlIHYtbm9kZSBpcyBjbG9uZWRcclxuICAgIHRoaXMuc3ZnQ29udGV4dCA9IHN2Z0NvbnRleHQ7XHJcblxyXG4gICAgY29uc3Qgbm9kZSA9IGFzTm9kZSh0aGlzLnRhZywgdGhpcy5wcm9wcywgdGhpcy5jaGlsZHJlbiwgdGhpcy5zdmdDb250ZXh0KSBhcyBFbGVtZW50O1xyXG4gICAgdGhpcy5ub2RlID0gbm9kZTtcclxuXHJcbiAgICAvLyBtZW1vcml6ZSBmb3IgbmV4dCBzdWJ0cmVlIHJlLXJlbmRlcnNcclxuICAgIHJlbmRlcmVkVlRyZWVzLnNldChub2RlLCB0aGlzKTtcclxuXHJcbiAgICByZXR1cm4gbm9kZTtcclxuICB9XHJcblxyXG4gIHJlbW92ZUZyb21ET00oKSB7XHJcbiAgICBpZiAodGhpcy5ub2RlLnBhcmVudE5vZGUpIHtcclxuICAgICAgdGhpcy5ub2RlLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQodGhpcy5ub2RlKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNvbnNvbGUud2FybihcImpzeC1ydW50aW1lOiBjYW4ndCByZW1vdmVcIiwgdGhpcyk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBkaWZmQW5kUGF0Y2gobmV3Tm9kZTogRWxlbWVudFZOb2RlKSB7XHJcbiAgICBpZiAobmV3Tm9kZS50YWcgPT09IHRoaXMudGFnKSB7XHJcbiAgICAgIG5ld05vZGUubm9kZSA9IHRoaXMubm9kZTtcclxuICAgICAgLy8gdXBkYXRlIHByb3BzIGFuZCBhdHRyaWJ1dGVzXHJcbiAgICAgIEVsZW1lbnRWTm9kZS5hZGRQcm9wcyhuZXdOb2RlLm5vZGUsIG5ld05vZGUucHJvcHMsIHRoaXMucHJvcHMpO1xyXG5cclxuICAgICAgLy8gY2hpbGRyZW4gPT4gaXRlciBhbmQgcGF0Y2hcclxuICAgICAgLy8gb2xkIGNoaWxkcmVuIGJlaW5nIG1vZGlmaWVkXHJcbiAgICAgIGRpZmZBbmRQYXRjaENoaWxkcmVuKHRoaXMsIG5ld05vZGUpO1xyXG4gICAgfVxyXG4gICAgLy8gdGFnIGhhcyBjaGFuZ2VkXHJcbiAgICBlbHNlIHtcclxuICAgICAgdGhpcy5ub2RlLnJlcGxhY2VXaXRoKG5ld05vZGUuYXNOb2RlKCkpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIG1lbW9yaXplIGZvciBuZXh0IHN1YnRyZWUgcmUtcmVuZGVyc1xyXG4gICAgcmVuZGVyZWRWVHJlZXMuc2V0KHRoaXMubm9kZSwgbmV3Tm9kZSk7XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgZnJvbUV4aXN0aW5nRWxlbWVudE5vZGUodk5vZGU6IEVsZW1lbnRWTm9kZSwgY2hpbGRyZW46IEFycmF5PFZOb2RlSW50ZXJmYWNlIHwgVk5vZGVJbnRlcmZhY2VbXT4pIHtcclxuICAgIGNvbnN0IHsgdGFnLCBwcm9wcywgcGFyZW50LCBub2RlLCBzdmdDb250ZXh0IH0gPSB2Tm9kZTtcclxuICAgIGNvbnN0IG5ld1ZOb2RlID0gbmV3IEVsZW1lbnRWTm9kZSh7IHRhZywgcHJvcHMsIGNoaWxkcmVuIH0pO1xyXG4gICAgT2JqZWN0LmFzc2lnbihuZXdWTm9kZSwgeyBwYXJlbnQsIG5vZGUsIHN2Z0NvbnRleHQgfSk7XHJcbiAgICByZXR1cm4gbmV3Vk5vZGU7XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgYWRkUHJvcHMoZWxlbWVudDogRWxlbWVudCwgbmV3UHJvcHM6IFJlY29yZDxzdHJpbmcsIGFueT4sIG9sZFByb3BzPzogUmVjb3JkPHN0cmluZywgYW55Pikge1xyXG4gICAgY29uc3QgaXNEaWZmID0gdHlwZW9mIG9sZFByb3BzICE9PSBcInVuZGVmaW5lZFwiO1xyXG4gICAgaWYgKCFpc0RpZmYpIG9sZFByb3BzID0ge307XHJcblxyXG4gICAgLy8gaXRlcmF0ZSBvdmVyIGFsbCBtb2RpZmllZCBuZXcgYW5kIG9sZCBwcm9wZXJ0aWVzIGFuZCBzZXQvcmVtb3ZlL3VwZGF0ZSB0aGVtXHJcbiAgICBBcnJheS5mcm9tKG5ldyBTZXQoWy4uLk9iamVjdC5rZXlzKG5ld1Byb3BzKSwgLi4uT2JqZWN0LmtleXMob2xkUHJvcHMhKV0pKVxyXG4gICAgICAubWFwKHByb3BOYW1lID0+ICh7XHJcbiAgICAgICAgcHJvcE5hbWUsXHJcbiAgICAgICAgb2xkVmFsdWU6IG9sZFByb3BzIVtwcm9wTmFtZV0sXHJcbiAgICAgICAgbmV3VmFsdWU6IG5ld1Byb3BzW3Byb3BOYW1lXSxcclxuICAgICAgfSkpXHJcbiAgICAgIC5maWx0ZXIoKHsgbmV3VmFsdWUsIG9sZFZhbHVlIH0pID0+IG5ld1ZhbHVlICE9PSBvbGRWYWx1ZSlcclxuICAgICAgLmZvckVhY2goKHsgcHJvcE5hbWUsIG5ld1ZhbHVlLCBvbGRWYWx1ZSB9KSA9PiB7XHJcbiAgICAgICAgLy8gZm9yIHN0eWxlIGFzIG9iamVjdDpcclxuICAgICAgICAvLyAoc3R5bGU6KSB7ZGlzcGxheTogXCJub25lXCIsIHBvc2l0aW9uOiBcImFic29sdXRlXCJ9ID09PiAnZGlzcGxheTogbm9uZTsgcG9zaXRpb246IGFic29sdXRlOydcclxuICAgICAgICBpZiAocHJvcE5hbWUgPT09IFwic3R5bGVcIiAmJiB0eXBlb2YgbmV3VmFsdWUgPT09IFwib2JqZWN0XCIpIHtcclxuICAgICAgICAgIG5ld1ZhbHVlID0gT2JqZWN0LmVudHJpZXMobmV3VmFsdWUpXHJcbiAgICAgICAgICAgIC5maWx0ZXIoKFssIHZdKSA9PiB0cnV0aHkodikpXHJcbiAgICAgICAgICAgIC5tYXAoKFtrLCB2XSkgPT4gYCR7a306ICR7dn1gKVxyXG4gICAgICAgICAgICAuam9pbihcIjsgXCIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gKGNsYXNzOikgW1wiYnRuXCIsIFwicmVkXCJdID09PiBcImJ0biByZWRcIlxyXG4gICAgICAgIGlmIChwcm9wTmFtZSA9PT0gXCJjbGFzc1wiICYmIEFycmF5LmlzQXJyYXkobmV3VmFsdWUpKSB7XHJcbiAgICAgICAgICBuZXdWYWx1ZSA9IG5ld1ZhbHVlLmpvaW4oXCIgXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBwcm9wcyBzdGFydGluZyB3aXRoIFwib24tXCIgYXJlIGV2ZW50IGxpc3RlbmVyc1xyXG4gICAgICAgIGlmIChcclxuICAgICAgICAgIHByb3BOYW1lLnN0YXJ0c1dpdGgoXCJvbi1cIikgJiZcclxuICAgICAgICAgICh0eXBlb2YgbmV3VmFsdWUgPT09IFwiZnVuY3Rpb25cIiB8fFxyXG4gICAgICAgICAgICB0eXBlb2YgbmV3VmFsdWUgPT09IFwib2JqZWN0XCIgfHxcclxuICAgICAgICAgICAgdHlwZW9mIG9sZFZhbHVlID09PSBcImZ1bmN0aW9uXCIgfHxcclxuICAgICAgICAgICAgdHlwZW9mIG9sZFZhbHVlID09PSBcIm9iamVjdFwiKVxyXG4gICAgICAgICkge1xyXG4gICAgICAgICAgLy8gcmVtb3ZlIGxlYWRpbmcgXCJvbi1cIlwiXHJcbiAgICAgICAgICBjb25zdCBldmVudCA9IHByb3BOYW1lLnJlcGxhY2UoL15vbi0vLCBcIlwiKTtcclxuXHJcbiAgICAgICAgICAvLyBrZXkgaGFzIHRoZSBmb3JtIG9mIFwib24tY2hhbmdlXCIuIHZhbHVlIGlzIHRoZSBjYWxsYmFjayBmdW5jdGlvbiBvciBhbiBvYmplY3QgaW1wbGVtZW50aW5nIHtFdmVudExpc3RlbmVyfSBpbnRlcmZhY2VcclxuICAgICAgICAgIGlmICh0eXBlb2YgbmV3VmFsdWUgPT09IFwiZnVuY3Rpb25cIiB8fCB0eXBlb2YgbmV3VmFsdWUgPT09IFwib2JqZWN0XCIpIHtcclxuICAgICAgICAgICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKGV2ZW50LCBuZXdWYWx1ZSBhcyBFdmVudExpc3RlbmVyT3JFdmVudExpc3RlbmVyT2JqZWN0KTtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBpZiAodHlwZW9mIG9sZFZhbHVlID09PSBcImZ1bmN0aW9uXCIgfHwgdHlwZW9mIG9sZFZhbHVlID09PSBcIm9iamVjdFwiKSB7XHJcbiAgICAgICAgICAgIGVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihldmVudCwgb2xkVmFsdWUgYXMgRXZlbnRMaXN0ZW5lck9yRXZlbnRMaXN0ZW5lck9iamVjdCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIGlmIChwcm9wTmFtZSA9PT0gXCJyZWZcIiAmJiB0eXBlb2YgbmV3VmFsdWUgPT09IFwiZnVuY3Rpb25cIikge1xyXG4gICAgICAgICAgcmVmc1RvQ2FsbC5wdXNoKCgpID0+IG5ld1ZhbHVlKGVsZW1lbnQpKTtcclxuICAgICAgICB9IC8vIG9sZCByZWYgaXNuJ3QgdW5zZXRcclxuICAgICAgICAvLyB0aGUgYGNoZWNrZWRgIGFuZCBgdmFsdWVgIGF0dHJpYnV0ZSBvbiBpbnB1dCBlbGVtZW50cyB3aWxsIHVwZGF0ZSB0aGUgYGRlZmF1bHRDaGVja2VkYCBhbmQgYGRlZmF1bHRWYWx1ZWAgcHJvcGVydHkuXHJcbiAgICAgICAgLy8gYWxzbyBwb3NzaWJsZSB0byB0ZXN0IGlmIGNsYXNzIGhhcyB0aGUgcHJvcGVydHkgYW5kIGFsd2F5cyBzZXQgaXQgdmlhIHByb3AgaW5zdGVhZCBvZiBhdHRyaWJ1dGVcclxuICAgICAgICAvLyBidXQgdGhlcmUgYXJlIHNvbWUgcmVhZHkgb25seSBwcm9wZXJ0aWVzLiBhbmQgdW5jbGVhciBpZiBvdXIgY3VzdG9tIGVsZW1lbnRzIGFsd2F5cyBoYXZlIGEgc2V0dGVyIHdoZW4gdGhlcmUgaXMgYSBnZXR0ZXIgZm9yIHNvbWUgcHJvcHNcclxuICAgICAgICBlbHNlIGlmIChpc0RpZmYgJiYgKHByb3BOYW1lID09PSBcImNoZWNrZWRcIiB8fCBwcm9wTmFtZSA9PT0gXCJ2YWx1ZVwiKSkge1xyXG4gICAgICAgICAgLy8gQHRzLWlnbm9yZSAtIGUuZy4gaW5wdXQgZWxlbWVudHMgbmVlZCBjaGVja2VkIHNldCBhcyBwcm9wZXJ0eSBub3Qgb25seSBhdHRyaWJ1dGUgd2hlbiBpdCBpcyBjaGFuZ2VzXHJcbiAgICAgICAgICBlbGVtZW50W3Byb3BOYW1lXSA9IG5ld1ZhbHVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBib29sZWFuIGF0dHJpYnV0ZSBzZXQgd2l0aG91dCB2YWx1ZVxyXG4gICAgICAgIGVsc2UgaWYgKG5ld1ZhbHVlID09PSB0cnVlKSBlbGVtZW50LnNldEF0dHJpYnV0ZShwcm9wTmFtZSwgXCJcIik7XHJcbiAgICAgICAgLy8gcmVtb3ZlIG9sZCBhdHRyaWJ1dGVzIHdoaWNoIGFyZSBmYWxzZSBub3dcclxuICAgICAgICBlbHNlIGlmICghdHJ1dGh5KG5ld1ZhbHVlKSkgZWxlbWVudC5yZW1vdmVBdHRyaWJ1dGUocHJvcE5hbWUpO1xyXG4gICAgICAgIC8vIHVwZGF0ZSB0byBuZXcgdmFsdWUgYXMgc3RyaW5nXHJcbiAgICAgICAgZWxzZSBpZiAodHlwZW9mIG5ld1ZhbHVlID09PSBcInN0cmluZ1wiIHx8IHR5cGVvZiBuZXdWYWx1ZSA9PT0gXCJudW1iZXJcIikge1xyXG4gICAgICAgICAgZWxlbWVudC5zZXRBdHRyaWJ1dGUocHJvcE5hbWUsIFN0cmluZyhuZXdWYWx1ZSkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBAdHMtaWdub3JlIC0gcHJvdmlkaW5nIHRoZSB2YWx1ZSBhcyBwcm9wZXJ0eSB0byBodG1sIGVsZW1lbnRcclxuICAgICAgICBlbHNlIGVsZW1lbnRbcHJvcE5hbWVdID0gbmV3VmFsdWU7XHJcbiAgICAgIH0pO1xyXG4gIH1cclxufVxyXG5cclxuLy8gVi1Ob2RlIGZvciB0aGUgRnJhZ21lbnQgZWxlbWVudCBpbiBqc3ggKGA8PjwvPmApIG9yIHdoZW4gYW4gYXJyYXkgaXMgcGxhY2VkIGRpcmVjdGx5IGluIGpzeCBjaGlsZHJlbiAoZS5nLiBgPGVsZW0+e1tsaXN0XX08L2VsZW0+YClcclxuY2xhc3MgRnJhZ21lbnRWTm9kZSBleHRlbmRzIFZOb2RlIGltcGxlbWVudHMgVk5vZGVJbnRlcmZhY2Uge1xyXG4gIHR5cGUgPSBcIkZyYWdtZW50XCI7XHJcbiAgY2hpbGRyZW46IFZOb2RlSW50ZXJmYWNlW107XHJcbiAgcGFyZW50OiBWTm9kZUludGVyZmFjZSA9IG51bGwgYXMgYW55O1xyXG5cclxuICBjb25zdHJ1Y3RvcihjaGlsZHJlbjogSlNYQ2hpbGRbXSkge1xyXG4gICAgc3VwZXIoKTtcclxuXHJcbiAgICB0aGlzLmNoaWxkcmVuID0gY2hpbGRyZW4ubWFwKGNoaWxkID0+IHtcclxuICAgICAgaWYgKEFycmF5LmlzQXJyYXkoY2hpbGQpKSByZXR1cm4gbmV3IEZyYWdtZW50Vk5vZGUoY2hpbGQpO1xyXG4gICAgICBpZiAoY2hpbGQgaW5zdGFuY2VvZiBWTm9kZSkgcmV0dXJuIGNoaWxkIGFzIFZOb2RlSW50ZXJmYWNlO1xyXG4gICAgICBpZiAoY2hpbGQgaW5zdGFuY2VvZiBOb2RlKSByZXR1cm4gbmV3IExpdmVOb2RlVk5vZGUoY2hpbGQpO1xyXG4gICAgICBpZiAoIXRydXRoeShjaGlsZCkpIHJldHVybiBuZXcgTnVsbFZOb2RlKCk7XHJcbiAgICAgIHJldHVybiBuZXcgVGV4dFZOb2RlKGNoaWxkIGFzIHN0cmluZyB8IG51bWJlciB8IHRydWUpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgdGhpcy5jaGlsZHJlbi5mb3JFYWNoKGNoaWxkID0+IChjaGlsZC5wYXJlbnQgPSB0aGlzKSk7XHJcbiAgfVxyXG5cclxuICBhc05vZGUoKSB7XHJcbiAgICBjb25zdCBub2RlID0gYXNOb2RlKHVuZGVmaW5lZCwge30sIHRoaXMuY2hpbGRyZW4pIGFzIERvY3VtZW50RnJhZ21lbnQ7XHJcblxyXG4gICAgcmV0dXJuIG5vZGU7XHJcbiAgfVxyXG5cclxuICB0b1N0cmluZygpIHtcclxuICAgIHJldHVybiB0aGlzLmNoaWxkcmVuLm1hcChjaGlsZCA9PiBjaGlsZC50b1N0cmluZygpKS5qb2luKFwiXCIpO1xyXG4gIH1cclxuXHJcbiAgZGlmZkFuZFBhdGNoKG5ld1ZOb2RlOiBGcmFnbWVudFZOb2RlKSB7XHJcbiAgICByZXR1cm4gZGlmZkFuZFBhdGNoQ2hpbGRyZW4odGhpcywgbmV3Vk5vZGUpO1xyXG4gIH1cclxuXHJcbiAgcmVtb3ZlRnJvbURPTSgpIHtcclxuICAgIHRoaXMuY2hpbGRyZW4uZm9yRWFjaChjaGlsZCA9PiBjaGlsZC5yZW1vdmVGcm9tRE9NKCkpO1xyXG4gIH1cclxufVxyXG5cclxuLy8gVi1Ob2RlIGZvciBpdGVtcyB3aGljaCBiZSByZW5kZXJlZCBhcyB0ZXh0IChzdHJpbmcsIG51bWJlciwuLiApXHJcbmNsYXNzIFRleHRWTm9kZSBleHRlbmRzIFZOb2RlIGltcGxlbWVudHMgVk5vZGVJbnRlcmZhY2Uge1xyXG4gIHR5cGUgPSBcIlRleHROb2RlXCI7XHJcbiAgY2hpbGRyZW4gPSBbXTtcclxuICBub2RlOiBUZXh0ID0gbnVsbCBhcyBhbnk7XHJcbiAgcHJvcHM6IHsgY29udGVudDogYW55IH07XHJcbiAgcGFyZW50OiBWTm9kZUludGVyZmFjZSA9IG51bGwgYXMgYW55O1xyXG5cclxuICAvKipcclxuICAgKlxyXG4gICAqL1xyXG4gIGNvbnN0cnVjdG9yKGNvbnRlbnQ6IHN0cmluZyB8IG51bWJlciB8IGJvb2xlYW4pIHtcclxuICAgIHN1cGVyKCk7XHJcbiAgICB0aGlzLnByb3BzID0geyBjb250ZW50IH07XHJcbiAgfVxyXG5cclxuICBhc05vZGUoKSB7XHJcbiAgICBjb25zdCB0ZXh0Tm9kZSA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKHRoaXMucHJvcHMuY29udGVudCk7XHJcbiAgICB0aGlzLm5vZGUgPSB0ZXh0Tm9kZTtcclxuICAgIHJldHVybiB0ZXh0Tm9kZTtcclxuICB9XHJcblxyXG4gIHRvU3RyaW5nKCkge1xyXG4gICAgcmV0dXJuIHNhbml0aXplKHRoaXMucHJvcHMuY29udGVudCk7XHJcbiAgfVxyXG5cclxuICBkaWZmQW5kUGF0Y2gobmV3Tm9kZTogVGV4dFZOb2RlKSB7XHJcbiAgICB0aGlzLm5vZGUubm9kZVZhbHVlID0gbmV3Tm9kZS5wcm9wcy5jb250ZW50O1xyXG4gICAgbmV3Tm9kZS5ub2RlID0gdGhpcy5ub2RlO1xyXG4gIH1cclxuXHJcbiAgcmVtb3ZlRnJvbURPTSgpIHtcclxuICAgIHRoaXMubm9kZS5wYXJlbnROb2RlIS5yZW1vdmVDaGlsZCh0aGlzLm5vZGUpO1xyXG4gIH1cclxufVxyXG5cclxuLy8gVi1Ob2RlIGZvciBgbnVsbGAsIGBmYWxzZWAgb3IgYHVuZGVmaW5lZGAgaW4ganN4IGVsZW1lbnRzXHJcbmNsYXNzIE51bGxWTm9kZSBleHRlbmRzIFZOb2RlIGltcGxlbWVudHMgVk5vZGVJbnRlcmZhY2Uge1xyXG4gIHR5cGUgPSBcIk51bGxcIjtcclxuICBjaGlsZHJlbiA9IFtdO1xyXG4gIHBhcmVudDogVk5vZGVJbnRlcmZhY2UgPSBudWxsIGFzIGFueTtcclxuXHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICBzdXBlcigpO1xyXG4gIH1cclxuXHJcbiAgYXNOb2RlKCkge1xyXG4gICAgLy8gcmV0dXJuIG51bGw7IC8vIHJldHVybiBlbXB0eSBmcmFnbWVudD9cclxuICAgIHJldHVybiBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XHJcbiAgfVxyXG5cclxuICBkaWZmQW5kUGF0Y2gobmV3Tm9kZTI6IE51bGxWTm9kZSkge1xyXG4gICAgcmV0dXJuO1xyXG4gIH1cclxuXHJcbiAgcmVtb3ZlRnJvbURPTSgpIHtcclxuICAgIHJldHVybjtcclxuICB9XHJcblxyXG4gIHRvU3RyaW5nKCkge1xyXG4gICAgcmV0dXJuIFwiXCI7XHJcbiAgfVxyXG59XHJcblxyXG4vLyBWLU5vZGUgd2hlbiBhIGxpdmUgSFRNTEVsZW1lbnQgd2FzIHJlZmVybmNlZCBpbiBqc3ggKGUuZy4gYDxkaXY+e2RvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY29tcFwiKX08L2Rpdj5gKVxyXG5jbGFzcyBMaXZlTm9kZVZOb2RlIGV4dGVuZHMgVk5vZGUgaW1wbGVtZW50cyBWTm9kZUludGVyZmFjZSB7XHJcbiAgdHlwZSA9IFwiTm9kZVwiO1xyXG4gIGNoaWxkcmVuID0gW10gYXMgVk5vZGVJbnRlcmZhY2VbXTtcclxuICBwYXJlbnQ6IFZOb2RlSW50ZXJmYWNlID0gbnVsbCBhcyBhbnk7XHJcbiAgbm9kZTogTm9kZTtcclxuXHJcbiAgLyoqXHJcbiAgICpcclxuICAgKi9cclxuICBjb25zdHJ1Y3Rvcihub2RlOiBOb2RlKSB7XHJcbiAgICBzdXBlcigpO1xyXG4gICAgdGhpcy5ub2RlID0gbm9kZTtcclxuICB9XHJcblxyXG4gIGFzTm9kZSgpIHtcclxuICAgIHJldHVybiB0aGlzLm5vZGU7XHJcbiAgfVxyXG5cclxuICBkaWZmQW5kUGF0Y2gobmV3Tm9kZTogTGl2ZU5vZGVWTm9kZSkge1xyXG4gICAgaWYgKG5ld05vZGUubm9kZSAhPT0gdGhpcy5ub2RlKSB7XHJcbiAgICAgICh0aGlzLm5vZGUgYXMgQ2hpbGROb2RlKS5yZXBsYWNlV2l0aChuZXdOb2RlLm5vZGUpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcmVtb3ZlRnJvbURPTSgpIHtcclxuICAgIHRoaXMubm9kZS5wYXJlbnRFbGVtZW50IS5yZW1vdmVDaGlsZCh0aGlzLm5vZGUpO1xyXG4gIH1cclxuXHJcbiAgdG9TdHJpbmcoKSB7XHJcbiAgICByZXR1cm4gZ2V0T3V0ZXJIdG1sKHRoaXMubm9kZSk7XHJcbiAgfVxyXG59XHJcblxyXG4vLyB3cmFwcGVyIFYtTm9kZSB3aGljaCByZWZlcmVuY2VzIHRoZSBIVE1MIE5vZGUgd2hpY2ggaXRzZWxmIGlzIG5vdCByZW5kZXJlZCBieSBqc3gsIGJ1dCBpdHMgY29udGVudC5cclxuY2xhc3MgUm9vdFZOb2RlIGV4dGVuZHMgVk5vZGUgaW1wbGVtZW50cyBWTm9kZUludGVyZmFjZSB7XHJcbiAgdHlwZSA9IFwiUm9vdFwiO1xyXG4gIHBhcmVudCA9IG51bGw7XHJcbiAgbm9kZTogRWxlbWVudDtcclxuICBjaGlsZHJlbjogVk5vZGVJbnRlcmZhY2VbXTtcclxuICAvKipcclxuICAgKlxyXG4gICAqL1xyXG4gIGNvbnN0cnVjdG9yKGNvbnRlbnQ6IFZOb2RlSW50ZXJmYWNlLCBkb21Ob2RlOiBFbGVtZW50KSB7XHJcbiAgICBzdXBlcigpO1xyXG4gICAgY29udGVudC5wYXJlbnQgPSB0aGlzO1xyXG4gICAgdGhpcy5jaGlsZHJlbiA9IFtjb250ZW50XTtcclxuICAgIHRoaXMubm9kZSA9IGRvbU5vZGU7XHJcbiAgfVxyXG5cclxuICBhc05vZGUoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5jaGlsZHJlblswXS5hc05vZGUoKTtcclxuICB9XHJcbiAgdG9TdHJpbmcoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5jaGlsZHJlblswXS50b1N0cmluZygpO1xyXG4gIH1cclxuXHJcbiAgZGlmZkFuZFBhdGNoKG5ld1ZOb2RlOiBWTm9kZUludGVyZmFjZSkge1xyXG4gICAgZGlmZkFuZFBhdGNoQ2hpbGRyZW4odGhpcywgbmV3Vk5vZGUpO1xyXG4gIH1cclxuXHJcbiAgcmVtb3ZlRnJvbURPTSgpIHtcclxuICAgIHRoaXMubm9kZS5yZW1vdmUoKTtcclxuICB9XHJcbn1cclxuXHJcbi8vIGdlbmVyYXRlIHRoZSBWLU5vZGVzIGFuZCBWLVRyZWUgYmFzZWQgb24gdGhlIG9iamVjdHMgcGFyc2VkIGJ5IHRoZSBqc3ggYmFiZWwgcGx1Z2luXHJcbmZ1bmN0aW9uIGFzVk5vZGUodGFnOiBzdHJpbmcgfCBGdW5jdGlvbiB8IHVuZGVmaW5lZCwgcHJvcHM6IEpzeFByb3BzKTogVk5vZGVJbnRlcmZhY2Uge1xyXG4gIGlmICh0eXBlb2YgdGFnID09PSBcImZ1bmN0aW9uXCIpIHtcclxuICAgIGxldCByZWY6IEZ1bmN0aW9uIHwgdW5kZWZpbmVkID0gdW5kZWZpbmVkO1xyXG4gICAgaWYgKHByb3BzLnJlZikge1xyXG4gICAgICByZWYgPSBwcm9wcy5yZWY7XHJcbiAgICAgIGRlbGV0ZSBwcm9wcy5yZWY7XHJcbiAgICB9XHJcbiAgICBjb25zdCByZXN1bHQgPSB0YWcocHJvcHMpO1xyXG4gICAgaWYgKHJlc3VsdCBpbnN0YW5jZW9mIFZOb2RlKSB7XHJcbiAgICAgIGlmICh0eXBlb2YgcmVmID09PSBcImZ1bmN0aW9uXCIpIHtcclxuICAgICAgICByZWZzVG9DYWxsLnB1c2goKCkgPT4ge1xyXG4gICAgICAgICAgLy8gQHRzLWlnbm9yZSBub2RlIHByb3BlcnR5IG1pZ2h0IGV4aXN0IG9yIG5vdC4gdGhpcyBpcyBjaGVja2VkIGhlcmVcclxuICAgICAgICAgIGNvbnN0IHZOb2RlID0gcmVzdWx0Lm5vZGUgPyByZXN1bHQgOiBnZXRDaGlsZHJlbldpdGhOb2RlcyhyZXN1bHQgYXMgVk5vZGVJbnRlcmZhY2UpWzBdO1xyXG5cclxuICAgICAgICAgIC8vIEB0cy1pZ25vcmUgdk5vZGUgd2l0aCBub2RlIGlzIHJldHVybmVkXHJcbiAgICAgICAgICBpZiAodk5vZGUpIHJlZiEodk5vZGUubm9kZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIHJlc3VsdCBhcyBWTm9kZUludGVyZmFjZTtcclxuICAgIH1cclxuICAgIGlmIChyZXN1bHQgaW5zdGFuY2VvZiBOb2RlKSByZXR1cm4gbmV3IExpdmVOb2RlVk5vZGUocmVzdWx0KTtcclxuICAgIC8vIG51bGwganN4IG5vZGVcclxuICAgIGlmICghdHJ1dGh5KHJlc3VsdCkpIHJldHVybiBuZXcgTnVsbFZOb2RlKCk7XHJcblxyXG4gICAgcmV0dXJuIG5ldyBUZXh0Vk5vZGUocmVzdWx0KTtcclxuICB9XHJcblxyXG4gIGNvbnN0IHsgY2hpbGRyZW4sIC4uLmF0dHIgfSA9IHByb3BzO1xyXG5cclxuICByZXR1cm4gdGFnID8gbmV3IEVsZW1lbnRWTm9kZSh7IHRhZywgY2hpbGRyZW4sIHByb3BzOiBhdHRyIH0pIDogbmV3IEZyYWdtZW50Vk5vZGUoY2hpbGRyZW4pO1xyXG59XHJcblxyXG4vKipcclxuICogY29udmVydHMgcHJhZ21hIG9iamVjdCB0byBodG1sIHN0cmluZ1xyXG4gKiBqc3hzIGlzIGFsd2F5cyBjYWxsZWQgd2hlbiBlbGVtZW50IGhhcyBtb3JlIHRoYW4gb25lIGNoaWxkXHJcbiAqXHJcbiAqIEBwYXJhbSB7c3RyaW5nIHwgRnVuY3Rpb259IHRhZyAtIHRhZyBuYW1lIG9yIHRhZyBjbGFzc1xyXG4gKiBAcGFyYW0ge09iamVjdCB8IG51bGx9IHByb3BzIC0gcHJvcHMgZm9yIHRoZSB0YWdcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBqc3hzKHRhZzogc3RyaW5nIHwgRnVuY3Rpb24sIHByb3BzOiBKc3hQcm9wcyk6IFZOb2RlSW50ZXJmYWNlIHtcclxuICByZXR1cm4gYXNWTm9kZSh0YWcsIHByb3BzKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIGNvbnZlcnRzIHRoZSBmcmFnbWVudHMgb2JqZWN0IHRvIG5vZGVzXHJcbiAqXHJcbiAqIEBwYXJhbSB7T2JqZWN0fSBwcm9wc1xyXG4gKiBAcGFyYW0ge0FycmF5fSBwcm9wcy5jaGlsZHJlbiAtIGNoaWxkIGVsZW1lbnRzIGluIHRoZSBmcmFnbWVudFxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIEZyYWdtZW50KHByb3BzOiBKc3hQcm9wcykge1xyXG4gIHJldHVybiBhc1ZOb2RlKHVuZGVmaW5lZCwgcHJvcHMpO1xyXG59XHJcblxyXG4vLyBqc3ggaXMgY2FsbGVkIHdoZW4gdGhlIGVsZW1lbnQgaGFzIG9uZSBvciB6ZXJvIGNoaWxkcmVuXHJcbmV4cG9ydCBmdW5jdGlvbiBqc3goXHJcbiAgdGFnOiBzdHJpbmcgfCBGdW5jdGlvbixcclxuICBwcm9wczogQXR0cmlidXRlcyAmIFNwZWNpYWxBdHRyaWJ1dGVzICYgeyBjaGlsZHJlbj86IEpTWENoaWxkIH0sXHJcbik6IFZOb2RlSW50ZXJmYWNlIHtcclxuICAvLyBAdHMtaWdub3JlIC0gd3JhcHBpbmcgdGhlIGNoaWxkcmVuIGFzIGFycmF5IHRvIHJlLXVzZSBqc3hzIG1ldGhvZFxyXG4gIHByb3BzLmNoaWxkcmVuID0gcHJvcHMuaGFzT3duUHJvcGVydHkoXCJjaGlsZHJlblwiKSA/IFtwcm9wcy5jaGlsZHJlbl0gOiBbXTtcclxuXHJcbiAgcmV0dXJuIGpzeHModGFnLCBwcm9wcyBhcyBKc3hQcm9wcyk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiByZW5kZXIgdGhlIGdpdmVuIG1hcmt1cCBpbnRvIHRoZSBnaXZlbiBIVE1MIG5vZGVcclxuICpcclxuICogQHBhcmFtIHtKU1hDaGlsZH0gbWFya3VwIC0gaHRtbCBhcyBzdHJpbmcsIGh0bWwgZWxlbWVudCBvciBqc3ggdGVtcGxhdGVcclxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZG9tTm9kZSAtIGNvbnRhaW5lciBmb3IgdGhlIHRlbXBsYXRlIHRvIGJlIHJlbmRlcmVkIGludG9cclxuICogQHBhcmFtIHtib29sZWFufSBbYXBwZW5kPWZhbHNlXSAtIHNob3VsZCB0aGUgcHJvdmlkZWQgbWFya3VwIGJlIGFwcGVuZGVkIHRvIHRoZSBleGlzdGluZyBtYXJrdXAsIG9yIGRlZmF1bHQgcmVwbGFjZSBpdFxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHJlbmRlcihcclxuICBtYXJrdXA6IHN0cmluZyB8IG51bWJlciB8IG51bGwgfCBib29sZWFuIHwgdW5kZWZpbmVkIHwgSFRNTEVsZW1lbnQgfCBWTm9kZUludGVyZmFjZSxcclxuICBkb21Ob2RlOiBIVE1MRWxlbWVudCxcclxuICBhcHBlbmQ6IGJvb2xlYW4gPSBmYWxzZSxcclxuKSB7XHJcbiAgLy8gdGhlIGNvbnRlbnQgb2YgdGhlIGdpdmVuIERPTSBOb2RlIHdhcyBhbHJlYWR5IHJlbmRlcmVkIGJ5IGpzeC1ydW50aW1lLCBhbmQgaXQgb25seSBuZWVkcyB0byBiZSB1cGRhdGVkXHJcbiAgY29uc3QgaXNSZVJlbmRlciA9IHJlbmRlcmVkVlRyZWVzLmhhcyhkb21Ob2RlKTtcclxuXHJcbiAgaWYgKHR5cGVvZiBtYXJrdXAgPT09IFwic3RyaW5nXCIgfHwgdHlwZW9mIG1hcmt1cCA9PT0gXCJudW1iZXJcIiB8fCBtYXJrdXAgPT09IHRydWUpIHtcclxuICAgIG1hcmt1cCA9IG5ldyBUZXh0Vk5vZGUobWFya3VwKTtcclxuICB9IGVsc2UgaWYgKG1hcmt1cCBpbnN0YW5jZW9mIE5vZGUpIHtcclxuICAgIG1hcmt1cCA9IG5ldyBMaXZlTm9kZVZOb2RlKG1hcmt1cCk7XHJcbiAgfSBlbHNlIGlmIChtYXJrdXAgPT09IHVuZGVmaW5lZCB8fCBtYXJrdXAgPT09IG51bGwgfHwgbWFya3VwID09PSBmYWxzZSkge1xyXG4gICAgbWFya3VwID0gbmV3IE51bGxWTm9kZSgpO1xyXG4gIH1cclxuXHJcbiAgaWYgKG1hcmt1cCBpbnN0YW5jZW9mIFZOb2RlKSB7XHJcbiAgICBsZXQgdlRyZWU7XHJcblxyXG4gICAgaWYgKCFhcHBlbmQgJiYgIWlzUmVSZW5kZXIpIGRvbU5vZGUuaW5uZXJIVE1MID0gXCJcIjtcclxuXHJcbiAgICBpZiAoaXNSZVJlbmRlcikge1xyXG4gICAgICBjb25zdCBvbGRWVHJlZSA9IHJlbmRlcmVkVlRyZWVzLmdldChkb21Ob2RlKSE7XHJcblxyXG4gICAgICAvLyB3YXMgcHJldmlvdXNseSByZW5kZXJlZCBhcyBhIHN1YnRyZWUgZnJvbSBhbm90aGVyIHJlbmRlclxyXG4gICAgICBpZiAob2xkVlRyZWUudHlwZSA9PT0gXCJFbGVtZW50XCIpIHtcclxuICAgICAgICB2VHJlZSA9IEVsZW1lbnRWTm9kZS5mcm9tRXhpc3RpbmdFbGVtZW50Tm9kZShvbGRWVHJlZSBhcyBFbGVtZW50Vk5vZGUsIFttYXJrdXBdKTtcclxuICAgICAgICAob2xkVlRyZWUgYXMgRWxlbWVudFZOb2RlKS5kaWZmQW5kUGF0Y2godlRyZWUpO1xyXG4gICAgICAgIC8vIHVwZGF0ZSB0aGUgY2hpbGRyZW4gcHJvcGVydHkgaW4gdGhlIG1lbW9yeSByZWZlcmVuY2UgZnJvbSB0aGUgcHJldmlvdXMgcmVuZGVyLFxyXG4gICAgICAgIC8vIGF0dHJpYnV0ZXMsIGV0YyB3aWxsIHN0YXkgdGhlIHNhbWVcclxuICAgICAgICBvbGRWVHJlZS5jaGlsZHJlbiA9IHZUcmVlLmNoaWxkcmVuO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHZUcmVlID0gbmV3IFJvb3RWTm9kZShtYXJrdXAsIGRvbU5vZGUpO1xyXG4gICAgICAgIC8vIGRpZmYgYW5kIHBhdGNoIERPTSBiYXNlZCBvbiB0aGUgbGFzdCByZW5kZXJcclxuICAgICAgICAob2xkVlRyZWUgYXMgUm9vdFZOb2RlKS5kaWZmQW5kUGF0Y2godlRyZWUpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICAvLyBmaXJzdCB0aW1lIHJlbmRlclxyXG4gICAgZWxzZSB7XHJcbiAgICAgIHZUcmVlID0gbmV3IFJvb3RWTm9kZShtYXJrdXAsIGRvbU5vZGUpO1xyXG4gICAgICBkb21Ob2RlLmFwcGVuZCh2VHJlZS5hc05vZGUoKSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gbWVtb3JpemUgdGhlIFYtVHJlZSB3aGljaCByZW5kZXJlZCB0aGUgY3VycmVudCBET00sIHRvIHVzZSBpdCBpbiBmdXR1cmUgcmUtcmVuZGVyc1xyXG4gICAgcmVuZGVyZWRWVHJlZXMuc2V0KGRvbU5vZGUsIHZUcmVlKTtcclxuXHJcbiAgICAvLyBjYWxsIGFsbCByZWYgY2FsbGJhY2tzIGZvdW5kIGR1cmluZyBjcmVhdGlvbiBvZiBuZXcgbm9kZXMgZHVyaW5nIHJlbmRlclxyXG4gICAgd2hpbGUgKHJlZnNUb0NhbGwubGVuZ3RoKSB7XHJcbiAgICAgIC8vIHJlbW92ZSBmaXJzdCBmcm9tIGxpc3QsIGFuZCBpbnZva2UgaXRcclxuICAgICAgcmVmc1RvQ2FsbC5zcGxpY2UoMCwgMSlbMF0oKTtcclxuICAgIH1cclxuICB9IGVsc2Uge1xyXG4gICAgdGhyb3cgbmV3IEVycm9yKFwicmVuZGVyIG1ldGhvZCBjYWxsZWQgd2l0aCB3cm9uZyBhcmd1bWVudChzKVwiKTtcclxuICB9XHJcbn1cclxuXHJcbi8vIHByb3ZpZGVzIGNvbXBvbmVudCB0byBhdXRvbm9tb3VzIHVwZGF0ZSBpdHMgY29udGVudCB3aGVuIHByb3ZpZGVkIHByb21pc2UgcmVzb2x2ZWRcclxuZXhwb3J0IGNsYXNzIFN1c3BlbnNlVk5vZGUgZXh0ZW5kcyBWTm9kZSBpbXBsZW1lbnRzIFZOb2RlSW50ZXJmYWNlIHtcclxuICB0eXBlID0gXCJTdXNwZW5zZVwiO1xyXG4gIHBhcmVudDogVk5vZGVJbnRlcmZhY2UgPSBudWxsIGFzIGFueTtcclxuICBjaGlsZHJlbjogQXJyYXk8Vk5vZGVJbnRlcmZhY2U+O1xyXG5cclxuICBwbGFjZWhvbGRlcjogSlNYQ2hpbGQ7XHJcbiAgcHJvbWlzZTogUHJvbWlzZTxhbnk+O1xyXG4gIHRlbXBsYXRlOiBGdW5jdGlvbjtcclxuXHJcbiAgLy8gcHJvdmlkZWQgcHJvbWlzZSBpcyByZXNvbHZlZCBhbmQgY29udGVudCB1cGRhdGVkXHJcbiAgaXNSZXNvbHZlZCA9IGZhbHNlO1xyXG5cclxuICAvLyBWLU5vZGUgaXMgYWxyZWFkeSByZW1vdmVkIGZyb20gbm9kZSBiZWNhdXNlIG9mIGEgcmUtcmVuZGVyXHJcbiAgaXNSZW1vdmVkID0gZmFsc2U7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHtcclxuICAgIHBsYWNlaG9sZGVyLFxyXG4gICAgcHJvbWlzZSxcclxuICAgIHRlbXBsYXRlLFxyXG4gIH06IHtcclxuICAgIHBsYWNlaG9sZGVyOiBKU1hDaGlsZDtcclxuICAgIHByb21pc2U6IFByb21pc2U8YW55PjtcclxuICAgIHRlbXBsYXRlOiBGdW5jdGlvbjtcclxuICB9KSB7XHJcbiAgICBzdXBlcigpO1xyXG5cclxuICAgIHRoaXMucGxhY2Vob2xkZXIgPSBwbGFjZWhvbGRlcjtcclxuICAgIHRoaXMucHJvbWlzZSA9IHByb21pc2U7XHJcbiAgICB0aGlzLnRlbXBsYXRlID0gdGVtcGxhdGU7XHJcbiAgICBjb25zdCBjaGlsZCA9IG5ldyBGcmFnbWVudFZOb2RlKFtwbGFjZWhvbGRlcl0pO1xyXG4gICAgY2hpbGQucGFyZW50ID0gdGhpcztcclxuICAgIHRoaXMuY2hpbGRyZW4gPSBbY2hpbGRdO1xyXG4gIH1cclxuXHJcbiAgYXNOb2RlKCkge1xyXG4gICAgdGhpcy53YWl0QW5kUmVSZW5kZXIoKTtcclxuXHJcbiAgICByZXR1cm4gdGhpcy5jaGlsZHJlblswXS5hc05vZGUoKTtcclxuICB9XHJcblxyXG4gIHdhaXRBbmRSZVJlbmRlcigpIHtcclxuICAgIHRoaXMucHJvbWlzZS50aGVuKHZhbHVlID0+IHtcclxuICAgICAgaWYgKHRoaXMuaXNSZW1vdmVkKSByZXR1cm47XHJcbiAgICAgIHRoaXMuaXNSZXNvbHZlZCA9IHRydWU7XHJcbiAgICAgIGNvbnN0IGNvbnRlbnRNYXJrdXAgPSB0aGlzLnRlbXBsYXRlKHZhbHVlKTtcclxuICAgICAgY29uc3QgbmV3Q29udGVudCA9IG5ldyBGcmFnbWVudFZOb2RlKFtjb250ZW50TWFya3VwXSk7XHJcbiAgICAgIG5ld0NvbnRlbnQucGFyZW50ID0gdGhpcztcclxuICAgICAgdGhpcy5jaGlsZHJlblswXS5kaWZmQW5kUGF0Y2gobmV3Q29udGVudCk7XHJcbiAgICAgIHRoaXMuY2hpbGRyZW4gPSBbbmV3Q29udGVudF07XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIC8vIG9ubHkgcmV0dXJuaW5nIHRoZSBwbGFjZWhvbGRlci5cclxuICAvLyBub3QgYXV0b21hdGljYWxseSByZW5kZXJpbmcgd2hlbiBwcm9taXNlIHJlc29sdmVzXHJcbiAgdG9TdHJpbmcoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5wbGFjZWhvbGRlciA/IHRoaXMucGxhY2Vob2xkZXIudG9TdHJpbmcoKSA6IFwiXCI7XHJcbiAgfVxyXG5cclxuICByZW1vdmVGcm9tRE9NKCkge1xyXG4gICAgdGhpcy5pc1JlbW92ZWQgPSB0cnVlO1xyXG4gICAgdGhpcy5jaGlsZHJlbi5mb3JFYWNoKGNoaWxkVk5vZGUgPT4gY2hpbGRWTm9kZS5yZW1vdmVGcm9tRE9NKCkpO1xyXG4gIH1cclxuXHJcbiAgZGlmZkFuZFBhdGNoKG5ld05vZGU6IFN1c3BlbnNlVk5vZGUpIHtcclxuICAgIGlmICghdGhpcy5pc1Jlc29sdmVkKSB7XHJcbiAgICAgIC8vIHBhdGNoZXMgdGhlIHBsYWNlaG9sZGVyIHdpdGggZWFjaCBvdGhlclxyXG4gICAgICBkaWZmQW5kUGF0Y2hDaGlsZHJlbih0aGlzLCBuZXdOb2RlKTtcclxuICAgICAgbmV3Tm9kZS53YWl0QW5kUmVSZW5kZXIoKTtcclxuICAgIH1cclxuICAgIC8vIGFscmVhZHkgcmVzb2x2ZWQsIHByb21pc2UgYnV0IGhhcyBiZWVuIGNoYW5nZWQuXHJcbiAgICAvLyBzdGFydCBuZXcgd2l0aCB0aGUgcGxhY2Vob2xkZXJcclxuICAgIGVsc2UgaWYgKHRoaXMucHJvbWlzZSAhPT0gbmV3Tm9kZS5wcm9taXNlKSB7XHJcbiAgICAgIHRoaXMucmVtb3ZlRnJvbURPTSgpO1xyXG4gICAgICBpbnNlcnROZXdJdGVtKG5ld05vZGUpO1xyXG4gICAgfVxyXG4gICAgLy8gYWxyZWFkeSByZXNvbHZlZCwgcHJvbWlzZSBzdGlsbCB0aGUgc2FtZS5cclxuICAgIC8vIGRpZmYgYW5kIHBhdGNoIHRoZSB0ZW1wbGF0ZSByZXN1bHRzXHJcbiAgICBlbHNlIHtcclxuICAgICAgbmV3Tm9kZS5wcm9taXNlLnRoZW4odmFsdWUgPT4ge1xyXG4gICAgICAgIG5ld05vZGUuaXNSZXNvbHZlZCA9IHRydWU7XHJcbiAgICAgICAgY29uc3QgY29udGVudE1hcmt1cCA9IG5ld05vZGUudGVtcGxhdGUodmFsdWUpO1xyXG4gICAgICAgIGNvbnN0IG5ld0NvbnRlbnQgPSBuZXcgRnJhZ21lbnRWTm9kZShbY29udGVudE1hcmt1cF0pO1xyXG4gICAgICAgIG5ld0NvbnRlbnQucGFyZW50ID0gbmV3Tm9kZTtcclxuICAgICAgICBuZXdOb2RlLmNoaWxkcmVuID0gW25ld0NvbnRlbnRdO1xyXG5cclxuICAgICAgICBkaWZmQW5kUGF0Y2hDaGlsZHJlbih0aGlzLCBuZXdOb2RlKTtcclxuICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gY3VycmVudCBTdXNwZW5zZSBOb2RlIGlzIG5vdCBpbiB1c2UgYW55IG1vcmVcclxuICAgIHRoaXMuaXNSZW1vdmVkID0gdHJ1ZTtcclxuICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiB0aGUgcHJvdmlkZWQgc3RyaW5nIHdpbGwgYmUgcmVuZGVyZWQgYXMgbWFya3VwIGFuZCBub3QgZXNjYXBlZCAvIHNhbml0aXplZC5cclxuICogVXNlIHRoaXMgd2l0aCBjYXV0aW9uIGJlY2F1c2UgdGhlb3JldGljYWxseSBpdCBhbGxvd3MgYnJva2VuIGh0bWwgb3IgZXZlbiB4c3MgYXR0YWNrc1xyXG4gKlxyXG4gKlxyXG4gKiBAZXhwb3J0XHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBjb250ZW50IC0gaHRtbCBhcyBzdHJpbmcgd2hpY2ggbmVlZHMgdG8gYmUgcmVuZGVyZWRcclxuICogQHJldHVybnMge1ZOb2RlSW50ZXJmYWNlfVxyXG4gKiBAZXhhbXBsZVxyXG4gKiBgPGFydGljbGU+eyByYXdIdG1sKHJpY2hUZXh0KSB9PC9hcnRpY2xlPmBcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiByYXdIdG1sKGNvbnRlbnQ6IHN0cmluZyk6IFZOb2RlSW50ZXJmYWNlIHtcclxuICByZXR1cm4gbmV3IChjbGFzcyBSYXdIdG1sIGV4dGVuZHMgVk5vZGUgaW1wbGVtZW50cyBWTm9kZUludGVyZmFjZSB7XHJcbiAgICBwYXJlbnQ6IFZOb2RlSW50ZXJmYWNlID0gbnVsbCBhcyBhbnk7XHJcbiAgICBjaGlsZHJlbiA9IFtdO1xyXG4gICAgdHlwZSA9IFwiUmF3SHRtbFwiO1xyXG4gICAgY2hpbGROb2RlczogQ2hpbGROb2RlW10gPSBudWxsIGFzIGFueTtcclxuICAgIGNvbnRlbnQ6IHN0cmluZztcclxuICAgIG5vZGU/OiBOb2RlO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKGNvbnRlbnQ6IHN0cmluZykge1xyXG4gICAgICBzdXBlcigpO1xyXG4gICAgICB0aGlzLmNvbnRlbnQgPSBjb250ZW50O1xyXG4gICAgfVxyXG5cclxuICAgIHJlbW92ZUZyb21ET00oKSB7XHJcbiAgICAgIHRoaXMuY2hpbGROb2Rlcy5mb3JFYWNoKG5vZGUgPT4gbm9kZS5wYXJlbnRFbGVtZW50IS5yZW1vdmVDaGlsZChub2RlKSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gc2ltcGxlIHJlLXJlbmRlcnMgd2l0aG91dCBkaWZmaW5nIGFuZCBwYXRjaGluZyBpbiBjYXNlIG9mIG1vZGlmaWVkIGNvbnRlbnRcclxuICAgIGRpZmZBbmRQYXRjaChuZXdOb2RlOiBSYXdIdG1sKSB7XHJcbiAgICAgIGlmICgobmV3Tm9kZS5jb250ZW50ID0gdGhpcy5jb250ZW50KSkge1xyXG4gICAgICAgIG5ld05vZGUubm9kZSA9IHRoaXMubm9kZTtcclxuICAgICAgICBuZXdOb2RlLmNoaWxkTm9kZXMgPSB0aGlzLmNoaWxkTm9kZXM7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcbiAgICAgIHRoaXMucmVtb3ZlRnJvbURPTSgpO1xyXG4gICAgICBpbnNlcnROZXdJdGVtKG5ld05vZGUpO1xyXG4gICAgfVxyXG5cclxuICAgIHRvU3RyaW5nKCkge1xyXG4gICAgICByZXR1cm4gY29udGVudDtcclxuICAgIH1cclxuXHJcbiAgICBhc05vZGUoKSB7XHJcbiAgICAgIGNvbnN0IHRlbXBsYXRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRlbXBsYXRlXCIpO1xyXG4gICAgICB0ZW1wbGF0ZS5pbm5lckhUTUwgPSB0aGlzLmNvbnRlbnQ7XHJcbiAgICAgIGNvbnN0IGRvY3VtZW50RnJhZ21lbnQgPSB0ZW1wbGF0ZS5jb250ZW50O1xyXG4gICAgICB0aGlzLmNoaWxkTm9kZXMgPSBBcnJheS5mcm9tKGRvY3VtZW50RnJhZ21lbnQuY2hpbGROb2Rlcyk7XHJcblxyXG4gICAgICAvLyBiYXNpY2FsbHkgdGhlIGAubm9kZWAgcHJvcGVydHkgaXMgdXNlZCB0byBkZXRlcm1pbmUgdGhlIGxhc3QgaHRtbCBub2RlIG9mIHRoZSBWTm9kZSxcclxuICAgICAgLy8gdG8gcG9zaXRpb24gdGhlIG5leHQgVk5vZGUncyBET00gTm9kZSBhZnRlciBpdC5cclxuICAgICAgLy8gdGhlcmVmb3JlIC5ub2RlIHJldHVybnMgdGhlIGxhc3Qgbm9kZSBvZiB0aGUgcmF3IGh0bWxcclxuICAgICAgaWYgKHRoaXMuY2hpbGROb2Rlcy5sZW5ndGgpIHtcclxuICAgICAgICB0aGlzLm5vZGUgPSB0aGlzLmNoaWxkTm9kZXNbdGhpcy5jaGlsZE5vZGVzLmxlbmd0aCAtIDFdO1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiBkb2N1bWVudEZyYWdtZW50O1xyXG4gICAgfVxyXG4gIH0pKGNvbnRlbnQpO1xyXG59XHJcblxyXG4vKipcclxuICpcclxuICogQHBhcmFtIHBhcmFtMFxyXG4gKiBAZXhhbXBsZVxyXG4gKiAgIDxTdXNwZW5zZVxyXG4gKiAgICAgcGxhY2Vob2xkZXI9ezxQbGFjZWhvbGRlclRhYmxlUm93cyAvPn1cclxuICogICAgIHByb21pc2U9e3BlbmRpbmdSZXF1ZXN0fVxyXG4gKiAgICAgdGVtcGxhdGU9eyhyZXNwb25zZSkgPT5cclxuICogICAgICAgPFRhYmxlUm93cyByb3dzPXtyZXNwb25zZS5yb3dzfSAvPlxyXG4gKiAgICAgfVxyXG4gKiAgIC8+XHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gU3VzcGVuc2Uoe1xyXG4gIHBsYWNlaG9sZGVyLFxyXG4gIHByb21pc2UsXHJcbiAgdGVtcGxhdGUsXHJcbn06IHtcclxuICBwbGFjZWhvbGRlcjogSlNYQ2hpbGQ7XHJcbiAgcHJvbWlzZTogUHJvbWlzZTxhbnk+O1xyXG4gIHRlbXBsYXRlOiBGdW5jdGlvbjtcclxufSkge1xyXG4gIHJldHVybiBuZXcgU3VzcGVuc2VWTm9kZSh7XHJcbiAgICBwbGFjZWhvbGRlcixcclxuICAgIHByb21pc2UsXHJcbiAgICB0ZW1wbGF0ZSxcclxuICB9KTtcclxufVxyXG5cclxuLyoqXHJcbiAqIEBleGFtcGxlXHJcbiAqICBpbXBvcnQgeyBjcmVhdGVSZWYgfSBmcm9tIFwiLi9qc3gtcnVudGltZVwiO1xyXG4gKiAgZnVuY3Rpb24gQ29tcCgpIHtcclxuICogICAgY29uc3QgcmVmID0gY3JlYXRlUmVmPEhUTUxJbnB1dEVsZW1lbnQ+KCk7XHJcbiAqXHJcbiAqICAgIHJldHVybiAoXHJcbiAqICAgICAgPD5cclxuICogICAgICAgIDxpbnB1dCByZWY9e3JlZn0gLz5cclxuICogICAgICAgIDxteS1sYWJlbCBvbi1jbGljaz17KCkgPT4gcmVmLmN1cnJlbnQuZm9jdXMoKSB9IC8+XHJcbiAqICAgICAgPC8+XHJcbiAqICAgICk7XHJcbiAqICB9XHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlUmVmPFQgZXh0ZW5kcyBIVE1MRWxlbWVudCB8IFNWR0VsZW1lbnQgPSBIVE1MRWxlbWVudD4oKSB7XHJcbiAgaW50ZXJmYWNlIFJlZk9iamVjdCB7XHJcbiAgICAoZWw6IEhUTUxFbGVtZW50IHwgU1ZHRWxlbWVudCk6IHZvaWQ7XHJcbiAgICBjdXJyZW50OiBudWxsIHwgVDtcclxuICB9XHJcblxyXG4gIGNvbnN0IHJlc3VsdCA9IGZ1bmN0aW9uIChlbDogSFRNTEVsZW1lbnQgfCBTVkdFbGVtZW50KSB7XHJcbiAgICByZXN1bHQuY3VycmVudCA9IGVsIGFzIFQ7XHJcbiAgfSBhcyBSZWZPYmplY3Q7XHJcbiAgcmVzdWx0LmN1cnJlbnQgPSBudWxsO1xyXG5cclxuICByZXR1cm4gcmVzdWx0O1xyXG59XHJcblxyXG5leHBvcnQgdHlwZSBSZWZPYmplY3Q8VCA9IEhUTUxFbGVtZW50PiA9IHsgY3VycmVudDogVCB8IG51bGwgfTtcclxuIiwiaW1wb3J0IHsgcmVuZGVyLCByYXdIdG1sLCBTdXNwZW5zZSwgVk5vZGVJbnRlcmZhY2UgfSBmcm9tIFwiLi9qc3gvanN4LXJ1bnRpbWVcIjtcclxuXHJcbmNvbnN0IHhzcyA9IFwiPGltZyBzcmM9eCBvbmVycm9yPVxcXCJhbGVydCgnWFNTIEF0dGFjaycpXFxcIj5cIjsgLy9cIjxzY3JpcHQ+YWxlcnQoJy0uLScpPC9zY3JpcHQ+XCI7XHJcblxyXG5mdW5jdGlvbiBSVEUocHJvcHM6IHsgdHh0OiBzdHJpbmc7IFwib24tY2xpY2tcIj86IEZ1bmN0aW9uIH0pIHtcclxuICBjb25zb2xlLmxvZyhcIm9uQ2xpY2tcIiwgcHJvcHNbXCJvbi1jbGlja1wiXSk7XHJcbiAgcmV0dXJuIChcclxuICAgIDxwXHJcbiAgICAgIG9uLWNsaWNrPXtwcm9wc1tcIm9uLWNsaWNrXCJdfVxyXG4gICAgPlxyXG4gICAgICB7cmF3SHRtbChwcm9wcy50eHQpfVxyXG4gICAgPC9wPlxyXG4gICk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIEJ1dHRvbih7XHJcbiAgY2hpbGRyZW4sXHJcbiAgZGlzYWJsZWQsXHJcbn06IHtcclxuICBjaGlsZHJlbjogYW55O1xyXG4gIGRpc2FibGVkOiBib29sZWFuO1xyXG4gIHJlZj86IEZ1bmN0aW9uO1xyXG59KSB7XHJcbiAgcmV0dXJuIChcclxuICAgIDxidXR0b25cclxuICAgICAgZGlzYWJsZWQ9e2Rpc2FibGVkfVxyXG4gICAgICByZWY9eyhlbDogSFRNTEVsZW1lbnQpID0+IGNvbnNvbGUubG9nKFwibXkgYnV0dG9uIDo6cmVmOjoxXCIsIGVsKX1cclxuICAgID5cclxuICAgICAgPHNwYW4gcmVmPXsoZWw6IEhUTUxFbGVtZW50KSA9PiBjb25zb2xlLmxvZyhcIm15IGEgOjpyZWY6OjJcIiwgZWwpfT5cclxuICAgICAgICBCdG4tc3Bhbi1maXJzdFxyXG4gICAgICA8L3NwYW4+XHJcbiAgICAgIHtjaGlsZHJlbn1cclxuICAgICAgPD5cclxuICAgICAgICA8c3BhbiByZWY9eyhlbDogSFRNTEVsZW1lbnQpID0+IGNvbnNvbGUubG9nKFwibXkgYSA6OnJlZjo6M1wiLCBlbCl9PlxyXG4gICAgICAgICAgQnRuLXNwYW4tZW5kXHJcbiAgICAgICAgPC9zcGFuPlxyXG4gICAgICA8Lz5cclxuICAgIDwvYnV0dG9uPlxyXG4gICk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHJlZmxvZyhlbDogSFRNTEVsZW1lbnQpIHtcclxuICBjb25zb2xlLmxvZyhcIm15IGlubmVyIGRpdjo6cmVmOjo4XCIsIGVsKTtcclxufVxyXG5cclxuLypcclxuY29uc3QgbWFya3VwID0gKFxyXG4gIDw+XHJcbiAgICA8ZGl2XHJcbiAgICAgIGNsYXNzPVwiZm9vXCJcclxuICAgICAgcmVmPXsoZWw6IEhUTUxFbGVtZW50KSA9PiBjb25zb2xlLmxvZyhcIm15IGRpdiA6OnJlZjo6NFwiLCBlbCl9XHJcbiAgICAvPlxyXG4gICAgPGlucHV0IGRpc2FibGVkPXt0cnVlfSBoaWRkZW49e2ZhbHNlfSAvPlxyXG4gICAgPEJ1dHRvblxyXG4gICAgICBkaXNhYmxlZD17dHJ1ZX1cclxuICAgICAgcmVmPXsoZWw6IEhUTUxFbGVtZW50KSA9PiBjb25zb2xlLmxvZyhcIm15IEJVVFRPTjo6cmVmOjo1XCIsIGVsKX1cclxuICAgID5cclxuICAgICAgdGV4dFxyXG4gICAgICA8cG9wdXAtaW5mb1xyXG4gICAgICAgIHJlZj17KGVsOiBIVE1MRWxlbWVudCkgPT4gY29uc29sZS5sb2coXCJzcGFuIGluIEJVVFRPTjo6cmVmOjo2XCIsIGVsKX1cclxuICAgICAgPlxyXG4gICAgICAgIGJsYVxyXG4gICAgICA8L3BvcHVwLWluZm8+XHJcbiAgICA8L0J1dHRvbj5cclxuICAgIDxSVEVcclxuICAgICAgdHh0PVwibGUgdGV4dFwiXHJcbiAgICAgIHJlZj17KGVsOiBIVE1MRWxlbWVudCkgPT4gY29uc29sZS5sb2coXCJteSBkaXYgOjpyZWY6OjMuMVwiLCBlbCl9XHJcbiAgICAgIG9uLWNsaWNrPXsoZTogSFRNTEVsZW1lbnQpID0+IGNvbnNvbGUubG9nKGUpfVxyXG4gICAgLz5cclxuICAgIHt4c3N9XHJcbiAgICB7cmF3SHRtbChgPG9sPjxsaT5yYXcgaHRtbDwvbGk+PC9vbD5gKX1cclxuICAgIDxkaXZcclxuICAgICAgY2xhc3M9XCJiYW1cIlxyXG4gICAgICByZWY9eyhlbDogSFRNTEVsZW1lbnQpID0+IGNvbnNvbGUubG9nKFwibXkgZGl2OjpyZWY6OjdcIiwgZWwpfVxyXG4gICAgPlxyXG4gICAgICA8ZGl2PlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJiYXJcIiBvbi1jbGljaz17KGUpID0+IGNvbnNvbGUubG9nKGUpfSByZWY9e3JlZmxvZ30+XHJcbiAgICAgICAgICBjbGljayBNRVxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDxkaXYgc3R5bGU9e3sgb3V0bGluZTogXCIxcHggc29saWQgcmVkO1wiIH19PlxyXG4gICAgICAgICAge2RvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjb2xkXCIpfVxyXG4gICAgICAgICAge251bGx9XHJcbiAgICAgICAgICB7WzAsIDFdLm1hcCgobikgPT4gKFxyXG4gICAgICAgICAgICA8c3Bhbj57bn08L3NwYW4+XHJcbiAgICAgICAgICApKX1cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgPC9kaXY+XHJcbiAgICA8L2Rpdj5cclxuICA8Lz5cclxuKTtcclxuXHJcbiovXHJcblxyXG4vKlxyXG5jb25zdCBtYXJrdXAgPSAoXHJcbiAgPEJ1dHRvbiBkaXNhYmxlZD17dHJ1ZX0+XHJcbiAgICAgIDxib2xkIHJlZj17cmVmbG9nfT4tLUlOTkVSLS08L2JvbGQ+XHJcbiAgPC9CdXR0b24+XHJcbik7Ki9cclxuLypcclxuXHJcbmNvbnN0IG1hcmt1cCA9IChcclxuICA8ZGl2IGNsYXNzPVwiZm9vXCIgcmVmPXsoZWw6IEhUTUxFbGVtZW50KSA9PiBjb25zb2xlLmxvZyhcIm15IGRpdjo6cmVmOjpcIiwgZWwpfT5cclxuICAgIDxkaXY+XHJcbiAgICAgIDxkaXYgY2xhc3M9XCJiYXJcIiByZWY9eyhlbDogSFRNTEVsZW1lbnQpID0+IGNvbnNvbGUubG9nKFwibXkgaW5uZXIgZGl2OjpyZWY6OlwiLCBlbCl9IC8+XHJcbiAgICA8L2Rpdj5cclxuICAgIDxCdXR0b24gZGlzYWJsZWQ9e3RydWV9PjwvQnV0dG9uPlxyXG4gIDwvZGl2PlxyXG4pO1xyXG4qL1xyXG4vKlxyXG5jb25zdCBtYXJrdXAgPSAoXHJcbiAgPGE+XHJcbiAgICA8Yj5cclxuICAgICAgPGMgY2xhc3M9XCJiYXJcIiByZWY9e3JlZmxvZ30gLz5cclxuICAgIDwvYj5cclxuICA8L2E+XHJcbik7XHJcbiovXHJcblxyXG5mdW5jdGlvbiBTcGFuKHsgbW9kZSB9OiB7IG1vZGU6IGFueSB9KSB7XHJcbiAgcmV0dXJuIG1vZGUgPT09IDEgPyAoXHJcbiAgICA8ZGl2PlxyXG4gICAgICA8c3BhbiBpZD1cImlubmVyXCIgb2xkPXt0cnVlfT5cclxuICAgICAgICBTcGFuLUNvbXAtLW9sZFxyXG4gICAgICA8L3NwYW4+XHJcbiAgICAgIDxoMz50byBiZSByZW1vdmVkPC9oMz5cclxuICAgIDwvZGl2PlxyXG4gICkgOiAoXHJcbiAgICA8ZGl2PlxyXG4gICAgICA8cCBpZD1cImlubmVyXCIgbmV3PXt0cnVlfT5cclxuICAgICAgICBTcGFuLUNvbXAtLW5ld3NcclxuICAgICAgPC9wPlxyXG4gICAgPC9kaXY+XHJcbiAgKTtcclxufVxyXG5cclxuZnVuY3Rpb24gQ29tcCh7IG51bSB9KSB7XHJcbiAgaWYgKG51bSA9PT0gMSkgcmV0dXJuIG51bGw7XHJcbiAgcmV0dXJuIChcclxuICAgIDxkaXY+XHJcbiAgICAgIDxwPmNvbXA8L3A+XHJcbiAgICA8L2Rpdj5cclxuICApO1xyXG59XHJcblxyXG5jb25zdCBtYXJrdXAxID0gKG51bTogYW55KSA9PiAoXHJcbiAgPGRpdiBpZD1cIm91dGVyXCIgZGF0YS1mb289XCJiYXJcIiBkYXRhLXZhcj17bnVtfT5cclxuICAgIDxoMz5zaG91bGQgZ2V0IDIgLTogMzwvaDM+XHJcbiAgICB7bnVtID09PSAxID8gKFxyXG4gICAgICA8dWwgY2xhc3M9XCJ1bC1jbGFzc1wiPlxyXG4gICAgICAgIDxsaT5UZXh0IDEgPC9saT5cclxuICAgICAgICA8bGk+VGV4dCAyIDwvbGk+XHJcbiAgICAgIDwvdWw+XHJcbiAgICApIDogKFxyXG4gICAgICA8dWwgY2xhc3M9XCJ1bC1jbGFzc1wiPlxyXG4gICAgICAgIDxsaT5UZXh0IDMgPC9saT5cclxuICAgICAgICA8bGk+VGV4dCAyIDwvbGk+XHJcbiAgICAgICAgPGxpPlRleHQgMSA8L2xpPlxyXG4gICAgICA8L3VsPlxyXG4gICAgKX1cclxuICAgIDxoMz5zaG91bGQgZ2V0IDMgLTogMjwvaDM+XHJcbiAgICB7bnVtID09PSAxID8gKFxyXG4gICAgICA8dWwgY2xhc3M9XCJ1bC1jbGFzc1wiPlxyXG4gICAgICAgIDxsaT5UZXh0IDEgPC9saT5cclxuICAgICAgICA8bGk+VGV4dCAyIDwvbGk+XHJcbiAgICAgICAgPGxpPlRleHQgMyA8L2xpPlxyXG4gICAgICA8L3VsPlxyXG4gICAgKSA6IChcclxuICAgICAgPHVsIGNsYXNzPVwidWwtY2xhc3NcIj5cclxuICAgICAgICA8bGk+VGV4dCAxIDwvbGk+XHJcbiAgICAgICAgPGxpPlRleHQgMiA8L2xpPlxyXG4gICAgICA8L3VsPlxyXG4gICAgKX1cclxuICAgIHtudW0gPT09IDEgPyBudWxsIDogPHA+bmV3IHJlbmRlcjwvcD59XHJcbiAgICA8ZGl2PlxyXG4gICAgICA8c3Bhbj5zcGFuLWNvbnRlbnQ8L3NwYW4+XHJcbiAgICA8L2Rpdj5cclxuICAgIDxTcGFuIG1vZGU9e251bX0gLz5cclxuICAgIHsvKmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjb2xkXCIpKi99XHJcbiAgICA8PkZyYWdtZW50LWl0ZW08Lz5cclxuICAgIDxzdmdcclxuICAgICAgdmlld0JveD1cIjAgMCAzMDAgMTAwXCJcclxuICAgICAgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiXHJcbiAgICAgIHN0cm9rZT1cInJlZFwiXHJcbiAgICAgIGZpbGw9XCJncmV5XCJcclxuICAgID5cclxuICAgICAgPGNpcmNsZSBjeD1cIjUwXCIgY3k9XCI1MFwiIHI9XCI0MFwiIC8+XHJcbiAgICAgIDxjaXJjbGUgY3g9XCIxNTBcIiBjeT1cIjUwXCIgcj1cIjRcIiAvPlxyXG5cclxuICAgICAgPHN2ZyB2aWV3Qm94PVwiMCAwIDEwIDEwXCIgeD1cIjIwMFwiIHdpZHRoPVwiMTAwXCI+XHJcbiAgICAgICAgPGNpcmNsZSBjeD1cIjVcIiBjeT1cIjVcIiByPVwiNFwiIC8+XHJcbiAgICAgIDwvc3ZnPlxyXG4gICAgPC9zdmc+XHJcbiAgPC9kaXY+XHJcbik7XHJcblxyXG5mdW5jdGlvbiBtYXJrdXAyKG51bTogYW55KSB7XHJcbiAgcmV0dXJuIChcclxuICAgIDxkaXYgaWQ9XCJvdXRlclwiPlxyXG4gICAgICA8PlxyXG4gICAgICAgIDw+XHJcbiAgICAgICAgICA8cD5uZXN0ZWQgZnJhZ21lbnQ8L3A+XHJcbiAgICAgICAgPC8+XHJcbiAgICAgIDwvPlxyXG4gICAgICA8aDE+c3RhdGljPC9oMT5cclxuICAgICAgPGgxPmR5bmFtaWMgdmFsOiB7bnVtfTwvaDE+XHJcbiAgICAgIHtudW0gPT09IDEgPyA8aDE+b2xkPC9oMT4gOiBmYWxzZX1cclxuICAgICAge251bSA9PT0gMSA/IChcclxuICAgICAgICA8PlxyXG4gICAgICAgICAgPGgxPmZyYWcgb2xkPC9oMT5cclxuICAgICAgICAgIDxzcGFuPmZyYWcgc3BhbiBvbGQ8L3NwYW4+XHJcbiAgICAgICAgPC8+XHJcbiAgICAgICkgOiAoXHJcbiAgICAgICAgPGgxPmZyYWcgbmV3PC9oMT5cclxuICAgICAgKX1cclxuICAgICAgPENvbXAgbnVtPXtudW19IC8+XHJcbiAgICA8L2Rpdj5cclxuICApO1xyXG59XHJcbmZ1bmN0aW9uIE5MKCkge1xyXG4gIHJldHVybiBudWxsO1xyXG59XHJcblxyXG5mdW5jdGlvbiBtYXJrdXAzKG51bTogYW55KSB7XHJcbiAgcmV0dXJuIG51bSA9PT0gMSA/IChcclxuICAgIDxoMT5cclxuICAgICAgQS1MaW5lIDEgLSB7bnVtfVxyXG4gICAgICA8U3BhbiBtb2RlPXtudW19IC8+XHJcbiAgICAgIDxCdXR0b25cclxuICAgICAgICBkaXNhYmxlZD17dHJ1ZX1cclxuICAgICAgICByZWY9eyhlbDogSFRNTEVsZW1lbnQpID0+IGNvbnNvbGUubG9nKFwibXkgQlVUVE9OOjpyZWY6OjVcIiwgZWwpfVxyXG4gICAgICA+XHJcbiAgICAgICAgdGV4dFxyXG4gICAgICAgIDxwb3B1cC1pbmZvXHJcbiAgICAgICAgICByZWY9eyhlbDogSFRNTEVsZW1lbnQpID0+IGNvbnNvbGUubG9nKFwic3BhbiBpbiBCVVRUT046OnJlZjo6NlwiLCBlbCl9XHJcbiAgICAgICAgPlxyXG4gICAgICAgICAgYmxhXHJcbiAgICAgICAgPC9wb3B1cC1pbmZvPlxyXG4gICAgICAgIDxwPmlubmVyIHAge251bX08L3A+XHJcbiAgICAgIDwvQnV0dG9uPlxyXG4gICAgICBBLUxpbmUgM1xyXG4gICAgICA8PlxyXG4gICAgICAgIDxwPlxyXG4gICAgICAgICAgPHA+QSBGcmFnIGxpbmUgMSo8L3A+XHJcbiAgICAgICAgPC9wPlxyXG4gICAgICAgIDxwPkEgRnJhZyBsaW5lIDI8L3A+XHJcbiAgICAgICAgPHA+QSBGcmFnIGxpbmUgMzwvcD5cclxuICAgICAgICA8cD5BIEZyYWcgbGluZSA0PC9wPlxyXG4gICAgICAgIDxzdmdcclxuICAgICAgICAgIHZpZXdCb3g9XCIwIDAgMzAwIDEwMFwiXHJcbiAgICAgICAgICB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCJcclxuICAgICAgICAgIHN0cm9rZT1cInJlZFwiXHJcbiAgICAgICAgICBmaWxsPVwiZ3JleVwiXHJcbiAgICAgICAgPlxyXG4gICAgICAgICAgPGNpcmNsZSBjeD1cIjUwXCIgY3k9XCI1MFwiIHI9XCI0MFwiIC8+XHJcbiAgICAgICAgICA8Y2lyY2xlIGN4PVwiMTUwXCIgY3k9XCI1MFwiIHI9XCI0XCIgLz5cclxuXHJcbiAgICAgICAgICA8c3ZnIHZpZXdCb3g9XCIwIDAgMTAgMTBcIiB4PVwiMjAwXCIgd2lkdGg9XCIxMDBcIj5cclxuICAgICAgICAgICAgPGNpcmNsZSBjeD1cIjVcIiBjeT1cIjVcIiByPVwiNFwiIC8+XHJcbiAgICAgICAgICA8L3N2Zz5cclxuICAgICAgICA8L3N2Zz5cclxuICAgICAgPC8+XHJcbiAgICAgIHtudWxsfVxyXG4gICAgPC9oMT5cclxuICApIDogKFxyXG4gICAgPGgxIGNsYXNzPVwiYVwiIHJlZj17Y29uc29sZS5pbmZvfT5cclxuICAgICAgQiBMaW5lIDEgLSB7bnVtfVxyXG4gICAgICA8U3BhbiBtb2RlPXtudW19IC8+XHJcbiAgICAgIDxCdXR0b25cclxuICAgICAgICBkaXNhYmxlZD17dHJ1ZX1cclxuICAgICAgICByZWY9eyhlbDogSFRNTEVsZW1lbnQpID0+IGNvbnNvbGUubG9nKFwibXkgQlVUVE9OOjpyZWY6OjVcIiwgZWwpfVxyXG4gICAgICA+XHJcbiAgICAgICAgdGV4dFxyXG4gICAgICAgIDxwb3B1cC1pbmZvXHJcbiAgICAgICAgICByZWY9eyhlbDogSFRNTEVsZW1lbnQpID0+IGNvbnNvbGUubG9nKFwic3BhbiBpbiBCVVRUT046OnJlZjo6NlwiLCBlbCl9XHJcbiAgICAgICAgPlxyXG4gICAgICAgICAgYmxhXHJcbiAgICAgICAgPC9wb3B1cC1pbmZvPlxyXG4gICAgICAgIDxwPntudW19PC9wPlxyXG4gICAgICA8L0J1dHRvbj5cclxuICAgICAgPD5cclxuICAgICAgICB7ZmFsc2V9XHJcbiAgICAgICAge251bGx9XHJcbiAgICAgICAge3VuZGVmaW5lZH1cclxuICAgICAgPC8+XHJcbiAgICAgIDw+XHJcbiAgICAgICAgPHA+QiBGcmFnIGxpbmUgMTwvcD5cclxuICAgICAgICA8cD5CIEZyYWcgbGluZSAyPC9wPlxyXG4gICAgICAgIHt1bmRlZmluZWR9XHJcbiAgICAgICAgPHA+QiBGcmFnIGxpbmUgMyg0KTwvcD5cclxuICAgICAgICA8c3ZnXHJcbiAgICAgICAgICB2aWV3Qm94PVwiMCAwIDMwMCAxMDBcIlxyXG4gICAgICAgICAgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiXHJcbiAgICAgICAgICBzdHJva2U9XCJyZWRcIlxyXG4gICAgICAgICAgZmlsbD1cImdyZXlcIlxyXG4gICAgICAgID5cclxuICAgICAgICAgIDxjaXJjbGUgY3g9XCI1MFwiIGN5PVwiNTBcIiByPVwiNDBcIiAvPlxyXG4gICAgICAgICAgPGNpcmNsZSBjeD1cIjE1MFwiIGN5PVwiNTBcIiByPVwiNFwiIC8+XHJcblxyXG4gICAgICAgICAgPHN2ZyB2aWV3Qm94PVwiMCAwIDEwIDEwXCIgeD1cIjIwMFwiIHdpZHRoPVwiMTAwXCI+XHJcbiAgICAgICAgICAgIDxjaXJjbGUgY3g9XCI1XCIgY3k9XCI1XCIgcj1cIjZcIiAvPlxyXG4gICAgICAgICAgPC9zdmc+XHJcbiAgICAgICAgPC9zdmc+XHJcbiAgICAgICAgPHA+QiBGcmFnIGxpbmUgNCg2KTwvcD5cclxuICAgICAgPC8+XHJcbiAgICA8L2gxPlxyXG4gICk7XHJcbn1cclxuY29uc3Qgb2JqID0geyBhOiAxIH07XHJcblxyXG5mdW5jdGlvbiBtYXJrdXA0KG51bTogYW55KSB7XHJcbiAgb2JqLmEgPSBudW07XHJcbiAgcmV0dXJuIG51bSA9PT0gMSA/IChcclxuICAgIDxoMSBvYmo9e29ian0gaWQ9e29iai5hfT5cclxuICAgICAgb2xkLUhlYWRsaW5lIHtudW19XHJcbiAgICA8L2gxPlxyXG4gICkgOiAoXHJcbiAgICA8aDEgb2JqPXtvYmp9IGNsYXNzPVwiYVwiIGlkPXtvYmouYX0+XHJcbiAgICAgIG5ldy1IZWFkbGluZSB7bnVtfVxyXG4gICAgPC9oMT5cclxuICApO1xyXG59XHJcblxyXG5mdW5jdGlvbiBtYXJrdXAobnVtOiBhbnkpIHtcclxuICByZXR1cm4gbnVtID09PSAxID8gKFxyXG4gICAgPGRpdj5cclxuICAgICAgPD5cclxuICAgICAgICA8cD5mcmFnIC0gSTwvcD5cclxuICAgICAgICA8Yj4gZnJhZyAtIElJPC9iPlxyXG4gICAgICA8Lz5cclxuICAgIDwvZGl2PlxyXG4gICkgOiAoXHJcbiAgICA8aDEgY2xhc3M9XCJhXCI+XHJcbiAgICAgIHtcIm5ldy1IZWFkbGluZVwifSB7bnVtfVxyXG4gICAgPC9oMT5cclxuICApO1xyXG59XHJcblxyXG5mdW5jdGlvbiBtYXJrdXA1KG51bTogYW55KSB7XHJcbiAgcmV0dXJuIG51bSA9PT0gMSA/IChcclxuICAgIDxkaXY+XHJcbiAgICAgIHtyYXdIdG1sKGA8ZGl2IGNsYXNzPVwia1wiPnR4dDwvZGl2PjxpbnB1dCB0eXBlPXJhZGlvXCIgLz5gKX1cclxuICAgICAgPENvbXAzIC8+XHJcbiAgICAgIHtlbH1cclxuICAgIDwvZGl2PlxyXG4gICkgOiAoXHJcbiAgICA8ZGl2PlxyXG4gICAgICB7cmF3SHRtbChgPGRpdiBjbGFzcz1cImtcIj50eHQ8L2Rpdj48aW5wdXQgdHlwZT1yYWRpb1wiIC8+YCl9XHJcbiAgICAgIHtudWxsfVxyXG4gICAgICB7ZWx9XHJcbiAgICA8L2Rpdj5cclxuICApO1xyXG59XHJcblxyXG5mdW5jdGlvbiBtYXJrdXA2KGEpIHtcclxuICByZXR1cm4gKFxyXG4gICAgPGRpdj5cclxuICAgICAgPHN2ZyBpZD1cImZvbzZcIiB2aWV3Qm94PVwiMCAwIDEwIDEwXCIgeD1cIjIwMFwiIHdpZHRoPVwiMTAwXCI+XHJcbiAgICAgICAgPD57YSAmJiA8Y2lyY2xlIGN4PVwiNVwiIGN5PVwiNVwiIHI9XCI2XCIgLz59PC8+XHJcbiAgICAgIDwvc3ZnPlxyXG4gICAgICA8YnV0dG9uPnN1Ym1pdDwvYnV0dG9uPlxyXG4gICAgPC9kaXY+XHJcbiAgKTtcclxufVxyXG5cclxuLy9jb25zb2xlLmxvZyhtYXJrdXApO1xyXG4vL3dpbmRvdy5tYXJrdXAgPSBtYXJrdXA7XHJcblxyXG5jbGFzcyBQb3BVcEluZm8gZXh0ZW5kcyBIVE1MRWxlbWVudCB7XHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAvLyBBbHdheXMgY2FsbCBzdXBlciBmaXJzdCBpbiBjb25zdHJ1Y3RvclxyXG4gICAgc3VwZXIoKTtcclxuXHJcbiAgICAvLyB3cml0ZSBlbGVtZW50IGZ1bmN0aW9uYWxpdHkgaW4gaGVyZVxyXG5cclxuICAgIGNvbnNvbGUubG9nKFwiIyMjIyMjIyMjIyMjIyMjIyNjdG9yIENFXCIpO1xyXG4gIH1cclxuXHJcbiAgY29ubmVjdGVkQ2FsbGJhY2soKSB7XHJcbiAgICBjb25zb2xlLmxvZyhcIiMjIyMjIyMjIyMjIyMjIyMjQ3VzdG9tIHNxdWFyZSBlbGVtZW50IGFkZGVkIHRvIHBhZ2UuXCIpO1xyXG4gIH1cclxufVxyXG5cclxuY3VzdG9tRWxlbWVudHMuZGVmaW5lKFwicG9wdXAtaW5mb1wiLCBQb3BVcEluZm8pO1xyXG5cclxuLy9kb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI29sZFwiKSEuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGNvbnNvbGUubG9nKTtcclxuXHJcbi8vZG9jdW1lbnQuYm9keS5pbm5lckhUTUwgPSBtYXJrdXA7XHJcbi8vLy9yZW5kZXIobWFya3VwMygxKSwgZG9jdW1lbnQuYm9keSk7XHJcbi8vZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJvdXRlclwiKT8uc2V0QXR0cmlidXRlKFwiZGF0YS1mb29cIiwgXCJtb2RcIik7XHJcblxyXG4vL2RvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaW5uZXJcIik/LnNldEF0dHJpYnV0ZShcImRhdGEtZm9vXCIsIFwibW9kXCIpO1xyXG4vL3JlbmRlcihtYXJrdXAoMiksIGRvY3VtZW50LmJvZHkpO1xyXG4vL3JlbmRlcihtYXJrdXAsIGRvY3VtZW50LmJvZHksIHRydWUpO1xyXG5jb25zdCBlbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjb2xkXCIpO1xyXG5mdW5jdGlvbiBDb21wMigpIHtcclxuICByZXR1cm4gKFxyXG4gICAgPD5cclxuICAgICAge3Jhd0h0bWwoYDxkaXYgY2xhc3M9XCJrXCI+dHh0PC9kaXY+PGlucHV0IHR5cGU9cmFkaW9cIiAvPmApfVxyXG4gICAgICA8Q29tcDMgLz5cclxuICAgICAge2VsfVxyXG4gICAgPC8+XHJcbiAgKTtcclxufVxyXG5mdW5jdGlvbiBDb21wMygpIHtcclxuICByZXR1cm4gPGRpdj5jb21wIGNvbnRlbnQ8L2Rpdj47XHJcbn1cclxuXHJcbmNvbnN0ICRjb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNvbnRhaW5lclwiKSE7XHJcblxyXG53aW5kb3cucmVSZW5kZXIxID0gKCkgPT4gcmVuZGVyKG1hcmt1cDMoMSksICRjb250YWluZXIpO1xyXG53aW5kb3cucmVSZW5kZXIyID0gKCkgPT4gcmVuZGVyKG1hcmt1cDMoMiksICRjb250YWluZXIpO1xyXG53aW5kb3cucmVSZW5kZXIzID0gKCkgPT5cclxuICByZW5kZXIoXHJcbiAgICAvLyA8ZGl2PnR4dDwvZGl2PlxyXG4gICAgPENvbXAyIC8+LFxyXG4gICAgJGNvbnRhaW5lclxyXG4gICk7XHJcblxyXG5jb25zb2xlLmxvZyhcIjEyMzQ1XCIpO1xyXG53aW5kb3cuc3MgPSAoKSA9PiBtYXJrdXAzKDEpICsgXCJcIjtcclxud2luZG93LnNzMiA9ICgpID0+IHtcclxuICBjb25zb2xlLmxvZyhtYXJrdXAzKDEpKTtcclxuXHJcbiAgLy9kb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNvbnRhaW5lclwiKS5pbm5lckhUTUwgPSBtYXJrdXAzKDEpO1xyXG59O1xyXG5cclxud2luZG93LnJlUmVuZGVyNWEgPSAoKSA9PiByZW5kZXIobWFya3VwNSgxKSwgJGNvbnRhaW5lcik7XHJcbndpbmRvdy5yZVJlbmRlcjViID0gKCkgPT4gcmVuZGVyKG1hcmt1cDUoMiksICRjb250YWluZXIpO1xyXG5cclxuZnVuY3Rpb24gbWFya3VwNyhtb2QpIHtcclxuICBpZiAobW9kID09PSAxKSB7XHJcbiAgICByZXR1cm4gKFxyXG4gICAgICA8ZGl2PlxyXG4gICAgICAgIDxCdXR0b24+XHJcbiAgICAgICAgICA8c3Bhbj50ZXh0PC9zcGFuPlxyXG4gICAgICAgICAgPHNwYW4+LCBtb3JlIHRleHQ8L3NwYW4+XHJcbiAgICAgICAgPC9CdXR0b24+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgKTtcclxuICB9IGVsc2UgaWYgKG1vZCA9PT0gMikge1xyXG4gICAgcmV0dXJuIDxkaXY+c29tZSBjb250ZW50PC9kaXY+O1xyXG4gIH0gZWxzZSB7XHJcbiAgICByZXR1cm4gPGRpdj57ZmFsc2V9PC9kaXY+O1xyXG4gIH1cclxufVxyXG5cclxud2luZG93LnJlUmVuZGVyUmVmID0gKCkgPT5cclxuICByZW5kZXIoXHJcbiAgICA8aDIgY2xhc3M9XCJhXCIgcmVmPXtjb25zb2xlLndhcm59PlxyXG4gICAgICBIZWFkaW5nIHdpdGggcmVmXHJcbiAgICA8L2gyPixcclxuICAgICRjb250YWluZXJcclxuICApO1xyXG53aW5kb3cucmVSZW5kZXI2YSA9ICgpID0+IHJlbmRlcihtYXJrdXA2KHRydWUpLCAkY29udGFpbmVyKTtcclxud2luZG93LnJlUmVuZGVyNmIgPSAoKSA9PlxyXG4gIHJlbmRlcig8Y2lyY2xlIGN4PVwiNVwiIGN5PVwiNVwiIHI9XCI2XCIgLz4sIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZm9vNlwiKSk7XHJcbndpbmRvdy5yZVJlbmRlclN2ZyA9ICgpID0+IHJlbmRlcihtYXJrdXAxKCksICRjb250YWluZXIpO1xyXG53aW5kb3cucmVSZW5kZXJTdmcyID0gKCkgPT4gcmVuZGVyKG1hcmt1cDEoKSwgJGNvbnRhaW5lcik7XHJcbndpbmRvdy5yZVJlbmRlcjdfMSA9ICgpID0+IHJlbmRlcihtYXJrdXA3KDEpLCAkY29udGFpbmVyKTtcclxud2luZG93LnJlUmVuZGVyN18yID0gKCkgPT4gcmVuZGVyKG1hcmt1cDcoMiksICRjb250YWluZXIpO1xyXG53aW5kb3cucmVSZW5kZXI3XzMgPSAoKSA9PiByZW5kZXIobWFya3VwNygzKSwgJGNvbnRhaW5lcik7XHJcblxyXG5mdW5jdGlvbiBGdW5jMSh7IGNoaWxkcmVuIH0pIHtcclxuICBjb25zb2xlLmxvZyhcIkZ1bmMtMVwiKTtcclxuICByZXR1cm4gPGRpdj57Y2hpbGRyZW59PC9kaXY+O1xyXG59XHJcblxyXG5mdW5jdGlvbiB0aW1lcih0OiBudW1iZXIpOiBQcm9taXNlPFZOb2RlSW50ZXJmYWNlPiB7XHJcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXMpID0+IHtcclxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICByZXMoPHA+bmV3IHRleHQ8L3A+KTtcclxuICAgIH0sIHQpO1xyXG4gIH0pO1xyXG59XHJcblxyXG5jb25zdCBwID0gdGltZXIoNTAwMCk7XHJcblxyXG5mdW5jdGlvbiBGdW5jMigpIHtcclxuICByZXR1cm5cclxuICA8U3VzcGVuc2UgcGxhY2Vob2xkZXI9ezxoMj53YWl0aW5nLi4uPC9oMj59XHJcbiAgY29udGVudFByb21pc2U9e2Z1bmMocCwgKX0gLz47XHJcbn1cclxuXHJcbnJlbmRlcihcclxuICA8ZGl2PlxyXG4gICAgPEZ1bmMxPlxyXG4gICAgICA8RnVuYzIgLz5cclxuICAgICAgPFJURVxyXG4gICAgICAgIHR4dD1cIjxiPmxlIHRleHQ8L2I+XCJcclxuICAgICAgICByZWY9eyhlbDogSFRNTEVsZW1lbnQpID0+IGNvbnNvbGUubG9nKFwibXkgZGl2IDo6cmVmOjozLjFcIiwgZWwpfVxyXG4gICAgICAgIG9uLWNsaWNrPXsoZTogSFRNTEVsZW1lbnQpID0+IGNvbnNvbGUubG9nKGUpfVxyXG4gICAgICAvPlxyXG4gICAgICB7eHNzfVxyXG4gICAgPC9GdW5jMT5cclxuICA8L2Rpdj4sXHJcbiAgJGNvbnRhaW5lclxyXG4pO1xyXG5cclxud2luZG93LnJlUmVuZGVyX3N1cyA9ICgpID0+XHJcbiAgcmVuZGVyKFxyXG4gICAgPGRpdj5cclxuICAgICAgPEZ1bmMxPlxyXG4gICAgICAgIDxGdW5jMiAvPlxyXG4gICAgICA8L0Z1bmMxPlxyXG4gICAgPC9kaXY+LFxyXG4gICAgJGNvbnRhaW5lclxyXG4gICk7XHJcbiJdLCJzb3VyY2VSb290IjoiIn0=