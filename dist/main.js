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
/*! exports provided: jsxs, Fragment, jsx, render, rawHtml */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "jsxs", function() { return jsxs; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Fragment", function() { return Fragment; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "jsx", function() { return jsx; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "rawHtml", function() { return rawHtml; });
/**
 * provides functions needed by babel for a custom pragma
 * to render parsed jsx code to html
 */
// a map between v-trees and rendered DOM nodes / containers
const renderedVTrees = new WeakMap(); // list of `ref` callbacks to be called after the DOM nodes are rendered

const refsToCall = []; // props which will be rendered as attributes
// Functions will be used for event listeners. (with attribute name starting with 'on-')
// Object will be set as property on the rendered node element

// null when checking the parent when root is fragment itself

/**
 * return the closest ancestor of the given VNode which has an DOM Element (i.e. is not a Fragment)
 * @param vNode {VNodeInterface}
 */
function getParentElementNode(vNode) {
  while (vNode.parent) {
    vNode = vNode.parent;
    if (vNode.node) break;
  } // `.node` is only on "Text" and "Element", "RawHtml" type VNode, and only Element has children


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
  vNode.children;
  return vNode.children.map(childNode => {
    if (childNode === alwaysAllow) return childNode;
    if (childNode.node) return childNode;
    return getChildrenWithNodes(childNode, alwaysAllow);
  }).flat(Infinity);
}
/**
 * returns a tuple of the closest ancestor which has a DOM Node,
 * and the node which has a DOM node and is rendered as the next sibling for the provided node in the DOM.
 * Or null when it is the last child itsel
 *
 * @param {VNodeInterface} vNode
 * @returns {([Node, Node | null])}
 */


function getParentAndNextSibling(vNode) {
  // node ancestor with Element,
  const parentWithElement = getParentElementNode(vNode);
  const siblings = getChildrenWithNodes(parentWithElement, vNode);
  const prevSibling = siblings[siblings.indexOf(vNode) - 1];
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
  if (element instanceof DocumentFragment) return Array.from(element.childNodes).map(el => getOuterHtml(el)).join(""); // shouldn't reach this point

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

    if (key === "style" && typeof value === "object") value = Object.entries(value) // ignore stuff like `{background: active && "red"}` when `active === false / null / undefined`
    .filter(([, v]) => truthy(v)) // currently supports "background-color" not "backgroundColor"
    .map(([k, v]) => `${k}: ${v}`).join("; "); // (class:) ["btn", "red"] ==> "btn red"

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
  }

  const {
    ref,
    ...attrs
  } = props; // remember if the svg context was set for this node, and replace after generating all children
  // currently not supporting the `is` option for Customized built-in elements

  const node = svgContext ? document.createElementNS("http://www.w3.org/2000/svg", tag) : document.createElement(tag); // currently only supporting ref on html elements. not template functions
  // ref is only called when element is created. not when the ref property is changed

  if (typeof ref === "function") {
    refsToCall.push(() => ref(node));
  } // add attributes, event listeners etc.


  ElementVNode.addProps(node, attrs);
  node.append(...children //.flat()
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
      if (vNode.tag === "svg") {
        svgContext = true;
        break;
      }

      vNode = vNode.parent;
    }

    this.svgContext = svgContext;
    const node = asNode(this.tag, this.props, this.children, this.svgContext);
    this.node = node; // memorize for next subtree re-renders

    renderedVTrees.set(node, this);
    return node;
  }

  removeFromDOM() {
    this.node.parentElement.removeChild(this.node);
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

  static addProps(element, newProps, oldProps = {}) {
    // iterate over all modified new and old properties and set/remove/update them
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
      if (propName === "style" && typeof newValue === "object") newValue = Object.entries(newValue).filter(([, v]) => truthy(v)).map(([k, v]) => `${k}: ${v}`).join("; "); // (class:) ["btn", "red"] ==> "btn red"

      if (propName === "class" && Array.isArray(newValue)) newValue = newValue.join(" "); // props starting with "on-" are event listeners

      if (propName.startsWith("on-") && (typeof newValue === "function" || typeof newValue === "object" || typeof oldValue === "function" || typeof oldValue === "object")) {
        // remove leading "on-""
        const event = propName.replace(/^on-/, "");
        if (typeof newValue === "function" || typeof newValue === "object") element.addEventListener(event, newValue);
        if (typeof oldValue === "function" || typeof oldValue === "object") element.removeEventListener(event, oldValue);
      } // boolean attribute set without value
      else if (newValue === true) element.setAttribute(propName, ""); // remove old attributes which are false now
        else if (!truthy(newValue)) element.removeAttribute(propName); // update to new value as string
          else if (typeof newValue === "string" || typeof newValue === "number") element.setAttribute(propName, String(newValue)); // key has the form of "on-change". value is the callback function or an object implementing {EventListener} interface
            // @ts-ignore - providing the value as property to html element
            else element[propName] = newValue; // @TODO: remove old obj when new is null:: new null -> old: str? -> removeAtt, event? : removeEv, obj?: [prop] = undef

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
    }; //@TODO:
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
    this.node.parentElement.removeChild(this.node);
  }

} // V-Node for `null`, `false` or `undefined` in jsx elements


class NullVNode extends VNode {
  /**
   *
   */
  constructor() {
    super();
    this.type = "Null";
    this.children = [];
    this.parent = null;
  }

  asNode() {
    //return null; // return empty fragment?
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
    let result = tag(props);
    if (result instanceof VNode) return result;
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
    props: attr,
    children
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
 * @param {string|HTMLElement|JSX} markup - html as string, html element or jsx template
 * @param {HTMLElement} domNode - container for the template to be rendered into
 * @param {boolean} [append=false] - should the provided markup be appended to the existing markup, or default replace it
 */

function render(markup, // @TODO: specific support for Template? (.content.clone)
domNode, append = false) {
  Array.from(document.body.querySelectorAll("*")).forEach(el => el.style.background = "#ccffcc"); // the content of the given DOM Node was already rendered by jsx-runtime, and it only needs to be updated

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

      if (this.childNodes.length) this.node = this.childNodes[this.childNodes.length - 1];
      return documentFragment;
    }

  }, _temp)(content);
} // gotchas:
// - styles will override (could do: setting each rule individually)
// - ref : only called on creation of Element, not on ref change
// window.renderedVTrees = renderedVTrees;

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




function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }

function _construct(Parent, args, Class) { if (_isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }


var xss = "<img src=x onerror=\"alert('XSS Attack')\">"; //"<script>alert('-.-')</script>";

function RTE(props) {
  console.log("onClick", props["on-click"]);
  return Object(C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("p", {
    ref: function ref(el) {
      return console.log("my div ::ref::3.2", el);
    },
    children: props.txt
  });
}

function Button(_ref) {
  var children = _ref.children,
      disabled = _ref.disabled;
  return Object(C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])("button", {
    disabled: disabled,
    ref: function ref(el) {
      return console.log("my button ::ref::1", el);
    },
    children: [Object(C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("span", {
      ref: function ref(el) {
        return console.log("my a ::ref::2", el);
      },
      children: "Btn-span-first"
    }), children, Object(C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["Fragment"], {
      children: Object(C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("span", {
        ref: function ref(el) {
          return console.log("my a ::ref::3", el);
        },
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


function Span(_ref2) {
  var mode = _ref2.mode;
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
      "new": true,
      children: "Span-Comp--news"
    })
  });
}

function Comp(_ref3) {
  var num = _ref3.num;
  if (num === 1) return null;
  return Object(C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("div", {
    children: Object(C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("p", {
      children: "comp"
    })
  });
}

var markup1 = function markup1(num) {
  return Object(C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])("div", {
    id: "outer",
    "data-foo": "bar",
    "data-var": num,
    children: [Object(C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("h3", {
      children: "should get 2 -: 3"
    }), num === 1 ? Object(C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])("ul", {
      "class": "ul-class",
      children: [Object(C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("li", {
        children: "Text 1 "
      }), Object(C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("li", {
        children: "Text 2 "
      })]
    }) : Object(C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])("ul", {
      "class": "ul-class",
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
      "class": "ul-class",
      children: [Object(C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("li", {
        children: "Text 1 "
      }), Object(C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("li", {
        children: "Text 2 "
      }), Object(C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("li", {
        children: "Text 3 "
      })]
    }) : Object(C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])("ul", {
      "class": "ul-class",
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
};

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
      ref: function ref(el) {
        return console.log("my BUTTON::ref::5", el);
      },
      children: ["text", Object(C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("popup-info", {
        ref: function ref(el) {
          return console.log("span in BUTTON::ref::6", el);
        },
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
    "class": "a",
    ref: console.info,
    children: ["B Line 1 - ", num, Object(C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(Span, {
      mode: num
    }), Object(C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])(Button, {
      disabled: true,
      ref: function ref(el) {
        return console.log("my BUTTON::ref::5", el);
      },
      children: ["text", Object(C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("popup-info", {
        ref: function ref(el) {
          return console.log("span in BUTTON::ref::6", el);
        },
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

var obj = {
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
    "class": "a",
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
    "class": "a",
    children: ["new-Headline", " ", num]
  });
}

function markup5(num) {
  return num === 1 ? Object(C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])("div", {
    children: [Object(C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["rawHtml"])("<div class=\"k\">txt</div><input type=radio\" />"), Object(C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(Comp3, {}), el]
  }) : Object(C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])("div", {
    children: [Object(C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["rawHtml"])("<div class=\"k\">txt</div><input type=radio\" />"), null, el]
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


var PopUpInfo = /*#__PURE__*/function (_HTMLElement) {
  _inherits(PopUpInfo, _HTMLElement);

  var _super = _createSuper(PopUpInfo);

  function PopUpInfo() {
    var _this;

    _classCallCheck(this, PopUpInfo);

    // Always call super first in constructor
    _this = _super.call(this); // write element functionality in here

    console.log("#################ctor CE");
    return _this;
  }

  _createClass(PopUpInfo, [{
    key: "connectedCallback",
    value: function connectedCallback() {
      console.log("#################Custom square element added to page.");
    }
  }]);

  return PopUpInfo;
}( /*#__PURE__*/_wrapNativeSuper(HTMLElement));

customElements.define("popup-info", PopUpInfo); //document.querySelector("#old")!.addEventListener("click", console.log);
//document.body.innerHTML = markup;
////render(markup3(1), document.body);
//document.getElementById("outer")?.setAttribute("data-foo", "mod");
//document.getElementById("inner")?.setAttribute("data-foo", "mod");
//render(markup(2), document.body);
//render(markup, document.body, true);

var el = document.querySelector("#old");

function Comp2() {
  return Object(C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])(C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["Fragment"], {
    children: [Object(C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["rawHtml"])("<div class=\"k\">txt</div><input type=radio\" />"), Object(C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(Comp3, {}), el]
  });
}

function Comp3() {
  return Object(C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("div", {
    children: "comp content"
  });
}

var $container = document.getElementById("container");

window.reRender1 = function () {
  return Object(C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["render"])(markup3(1), $container);
};

window.reRender2 = function () {
  return Object(C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["render"])(markup3(2), $container);
};

window.reRender3 = function () {
  return Object(C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["render"])( // <div>txt</div>
  Object(C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(Comp2, {}), $container);
};

console.log("12345");

window.ss = function () {
  return markup3(1) + "";
};

window.ss2 = function () {
  console.log(markup3(1)); //document.getElementById("container").innerHTML = markup3(1);
};

window.reRender5a = function () {
  return Object(C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["render"])(markup5(1), $container);
};

window.reRender5b = function () {
  return Object(C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["render"])(markup5(2), $container);
};

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

window.reRenderRef = function () {
  return Object(C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["render"])(Object(C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("h2", {
    "class": "a",
    ref: console.warn,
    children: "Heading with ref"
  }), $container);
};

window.reRender6a = function () {
  return Object(C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["render"])(markup6(true), $container);
};

window.reRender6b = function () {
  return Object(C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["render"])(Object(C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("circle", {
    cx: "5",
    cy: "5",
    r: "6"
  }), document.getElementById("foo6"));
};

window.reRenderSvg = function () {
  return Object(C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["render"])(markup1(), $container);
};

window.reRenderSvg2 = function () {
  return Object(C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["render"])(markup1(), $container);
};

window.reRender7_1 = function () {
  return Object(C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["render"])(markup7(1), $container);
};

window.reRender7_2 = function () {
  return Object(C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["render"])(markup7(2), $container);
};

window.reRender7_3 = function () {
  return Object(C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["render"])(markup7(3), $container);
};

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vanN4L2pzeC1ydW50aW1lLnRzIiwid2VicGFjazovLy8uL21haW4udHN4Il0sIm5hbWVzIjpbInJlbmRlcmVkVlRyZWVzIiwiV2Vha01hcCIsInJlZnNUb0NhbGwiLCJnZXRQYXJlbnRFbGVtZW50Tm9kZSIsInZOb2RlIiwicGFyZW50Iiwibm9kZSIsImdldENoaWxkcmVuV2l0aE5vZGVzIiwiYWx3YXlzQWxsb3ciLCJjaGlsZHJlbiIsIm1hcCIsImNoaWxkTm9kZSIsImZsYXQiLCJJbmZpbml0eSIsImdldFBhcmVudEFuZE5leHRTaWJsaW5nIiwicGFyZW50V2l0aEVsZW1lbnQiLCJzaWJsaW5ncyIsInByZXZTaWJsaW5nIiwiaW5kZXhPZiIsIm5leHRTaWJsaW5nTm9kZSIsIm5leHRTaWJsaW5nIiwidHJ1dGh5IiwidmFsdWUiLCJ1bmRlZmluZWQiLCJzYW5pdGl6ZSIsInRleHQiLCJkaXYiLCJkb2N1bWVudCIsImNyZWF0ZUVsZW1lbnQiLCJpbm5lclRleHQiLCJpbm5lckhUTUwiLCJnZXRPdXRlckh0bWwiLCJlbGVtZW50IiwiRWxlbWVudCIsIm91dGVySFRNTCIsIlRleHQiLCJ3aG9sZVRleHQiLCJEb2N1bWVudEZyYWdtZW50IiwiQXJyYXkiLCJmcm9tIiwiY2hpbGROb2RlcyIsImVsIiwiam9pbiIsImNvbnNvbGUiLCJ3YXJuIiwiYXNIdG1sU3RyaW5nIiwidGFnIiwicHJvcHMiLCJhdHRyaWJ1dGVzIiwiT2JqZWN0IiwiZW50cmllcyIsImZpbHRlciIsImtleSIsInYiLCJrIiwiaXNBcnJheSIsImNvbnRlbnQiLCJjaGlsZCIsInRvU3RyaW5nIiwiYXNOb2RlIiwic3ZnQ29udGV4dCIsImZyYWdtZW50cyIsIml0ZW0iLCJkb2N1bWVudEZyYWdtZW50IiwiY3JlYXRlRG9jdW1lbnRGcmFnbWVudCIsImFwcGVuZCIsInJlZiIsImF0dHJzIiwiY3JlYXRlRWxlbWVudE5TIiwicHVzaCIsIkVsZW1lbnRWTm9kZSIsImFkZFByb3BzIiwiaW5zZXJ0TmV3SXRlbSIsIm5ld05vZGUiLCJpbnNlcnRCZWZvcmUiLCJkaWZmQW5kUGF0Y2hDaGlsZHJlbiIsIm9sZE5vZGUiLCJmb3JFYWNoIiwib2xkQ2hpbGQiLCJpeCIsIm5ld0NoaWxkIiwicmVtb3ZlRnJvbURPTSIsInR5cGUiLCJkaWZmQW5kUGF0Y2giLCJuZXdJdGVtcyIsInNsaWNlIiwibGVuZ3RoIiwiVk5vZGUiLCJjb25zdHJ1Y3RvciIsIkZyYWdtZW50Vk5vZGUiLCJOb2RlIiwiTGl2ZU5vZGVWTm9kZSIsIk51bGxWTm9kZSIsIlRleHRWTm9kZSIsInNldCIsInBhcmVudEVsZW1lbnQiLCJyZW1vdmVDaGlsZCIsInJlcGxhY2VXaXRoIiwiZnJvbUV4aXN0aW5nRWxlbWVudE5vZGUiLCJuZXdWTm9kZSIsImFzc2lnbiIsIm5ld1Byb3BzIiwib2xkUHJvcHMiLCJTZXQiLCJrZXlzIiwicHJvcE5hbWUiLCJvbGRWYWx1ZSIsIm5ld1ZhbHVlIiwic3RhcnRzV2l0aCIsImV2ZW50IiwicmVwbGFjZSIsImFkZEV2ZW50TGlzdGVuZXIiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwic2V0QXR0cmlidXRlIiwicmVtb3ZlQXR0cmlidXRlIiwiU3RyaW5nIiwidGV4dE5vZGUiLCJjcmVhdGVUZXh0Tm9kZSIsIm5vZGVWYWx1ZSIsIm5ld05vZGUyIiwiUm9vdFZOb2RlIiwiZG9tTm9kZSIsInJlbW92ZSIsImFzVk5vZGUiLCJyZXN1bHQiLCJhdHRyIiwianN4cyIsIkZyYWdtZW50IiwianN4IiwiaGFzT3duUHJvcGVydHkiLCJyZW5kZXIiLCJtYXJrdXAiLCJib2R5IiwicXVlcnlTZWxlY3RvckFsbCIsInN0eWxlIiwiYmFja2dyb3VuZCIsImlzUmVSZW5kZXIiLCJoYXMiLCJ2VHJlZSIsIm9sZFZUcmVlIiwiZ2V0Iiwic3BsaWNlIiwiRXJyb3IiLCJyYXdIdG1sIiwiUmF3SHRtbCIsInRlbXBsYXRlIiwieHNzIiwiUlRFIiwibG9nIiwidHh0IiwiQnV0dG9uIiwiZGlzYWJsZWQiLCJyZWZsb2ciLCJTcGFuIiwibW9kZSIsIkNvbXAiLCJudW0iLCJtYXJrdXAxIiwibWFya3VwMiIsIk5MIiwibWFya3VwMyIsImluZm8iLCJvYmoiLCJhIiwibWFya3VwNCIsIm1hcmt1cDUiLCJtYXJrdXA2IiwiUG9wVXBJbmZvIiwiSFRNTEVsZW1lbnQiLCJjdXN0b21FbGVtZW50cyIsImRlZmluZSIsInF1ZXJ5U2VsZWN0b3IiLCJDb21wMiIsIkNvbXAzIiwiJGNvbnRhaW5lciIsImdldEVsZW1lbnRCeUlkIiwid2luZG93IiwicmVSZW5kZXIxIiwicmVSZW5kZXIyIiwicmVSZW5kZXIzIiwic3MiLCJzczIiLCJyZVJlbmRlcjVhIiwicmVSZW5kZXI1YiIsIm1hcmt1cDciLCJtb2QiLCJyZVJlbmRlclJlZiIsInJlUmVuZGVyNmEiLCJyZVJlbmRlcjZiIiwicmVSZW5kZXJTdmciLCJyZVJlbmRlclN2ZzIiLCJyZVJlbmRlcjdfMSIsInJlUmVuZGVyN18yIiwicmVSZW5kZXI3XzMiXSwibWFwcGluZ3MiOiI7UUFBQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7UUFDMUU7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSx3REFBd0Qsa0JBQWtCO1FBQzFFO1FBQ0EsaURBQWlELGNBQWM7UUFDL0Q7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLHlDQUF5QyxpQ0FBaUM7UUFDMUUsZ0hBQWdILG1CQUFtQixFQUFFO1FBQ3JJO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMkJBQTJCLDBCQUEwQixFQUFFO1FBQ3ZELGlDQUFpQyxlQUFlO1FBQ2hEO1FB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RCxDQUFSLEVBQWFWLFVBQWIsQ0FBWjtBQUFBLENBQXJCOztBQUNBRSxNQUFNLENBQUNpQixXQUFQLEdBQXFCO0FBQUEsU0FBTS9ELG1GQUFNLENBQUNzRCxPQUFPLENBQUMsQ0FBRCxDQUFSLEVBQWFWLFVBQWIsQ0FBWjtBQUFBLENBQXJCLEMiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAwKTtcbiIsIi8qKlxyXG4gKiBwcm92aWRlcyBmdW5jdGlvbnMgbmVlZGVkIGJ5IGJhYmVsIGZvciBhIGN1c3RvbSBwcmFnbWFcclxuICogdG8gcmVuZGVyIHBhcnNlZCBqc3ggY29kZSB0byBodG1sXHJcbiAqL1xyXG5cclxuLy8gYSBtYXAgYmV0d2VlbiB2LXRyZWVzIGFuZCByZW5kZXJlZCBET00gbm9kZXMgLyBjb250YWluZXJzXHJcbmNvbnN0IHJlbmRlcmVkVlRyZWVzID0gbmV3IFdlYWtNYXA8RWxlbWVudCwgUm9vdFZOb2RlIHwgRWxlbWVudFZOb2RlPigpO1xyXG4vLyBsaXN0IG9mIGByZWZgIGNhbGxiYWNrcyB0byBiZSBjYWxsZWQgYWZ0ZXIgdGhlIERPTSBub2RlcyBhcmUgcmVuZGVyZWRcclxuY29uc3QgcmVmc1RvQ2FsbDogQXJyYXk8KCkgPT4gdm9pZD4gPSBbXTtcclxuXHJcbi8vIHByb3BzIHdoaWNoIHdpbGwgYmUgcmVuZGVyZWQgYXMgYXR0cmlidXRlc1xyXG4vLyBGdW5jdGlvbnMgd2lsbCBiZSB1c2VkIGZvciBldmVudCBsaXN0ZW5lcnMuICh3aXRoIGF0dHJpYnV0ZSBuYW1lIHN0YXJ0aW5nIHdpdGggJ29uLScpXHJcbi8vIE9iamVjdCB3aWxsIGJlIHNldCBhcyBwcm9wZXJ0eSBvbiB0aGUgcmVuZGVyZWQgbm9kZSBlbGVtZW50XHJcbnR5cGUgQXR0cmlidXRlcyA9IHtcclxuICBba2V5OiBzdHJpbmddOiBzdHJpbmcgfCBib29sZWFuIHwgbnVtYmVyIHwgRnVuY3Rpb24gfCBPYmplY3Q7XHJcbn07XHJcblxyXG4vLyBhZGRpdGlvbmFsIGF0dHJpYnV0ZXMgd2hpY2ggY2FuIGhhdmUgYWRkaXRpb25hbCBzZXJpYWxpemF0aW9uIGJlZm9yZSByZW5kZXJpbmcgYXMgYXR0cmlidXRlc1xyXG50eXBlIFNwZWNpYWxBdHRyaWJ1dGVzID0ge1xyXG4gIGNsYXNzPzogc3RyaW5nIHwgc3RyaW5nW107XHJcbiAgc3R5bGU/OiBzdHJpbmcgfCB7IFtrZXk6IHN0cmluZ106IHN0cmluZyB9O1xyXG4gIHJlZj86IEZ1bmN0aW9uO1xyXG59O1xyXG5cclxuLy8gdHlwZXMgb2YgY2hpbGRyZW4gd2hpY2ggd2lsbCBiZSBwYXNzZWQgYnkgdGhlIGpzeCBwYXJzZXIgcGx1Z2luXHJcbi8vIG5lc3RlZCBhcnJheSBpbiBjYXNlIG9mXHJcbi8vIDxlbGVtPlxyXG4vLyAgIDxzcGFuLz5cclxuLy8gICB7Y2hpbGRyZW59XHJcbi8vICAgdGV4dFxyXG4vLyAgIDxkaXYvPlxyXG4vLyA8L2VsZW0+XHJcbnR5cGUgSlNYQ2hpbGQgPVxyXG4gIHwgVk5vZGVJbnRlcmZhY2VcclxuICB8IE5vZGVcclxuICB8IHN0cmluZ1xyXG4gIHwgbnVtYmVyXHJcbiAgfCBib29sZWFuXHJcbiAgfCBudWxsXHJcbiAgfCB1bmRlZmluZWRcclxuICB8IEpTWENoaWxkW107XHJcblxyXG4vLyBjaGlsZCBlbGVtZW50cyBpbiB0aGUganN4IG1hcmt1cCB3aGljaCB3aWxsIGJlIHBhc3NlZCB0byB0aGUgaCBmdW5jdGlvbiBhcyBgcHJvcHMuY2hpbGRyZW5gXHJcbnR5cGUgQ2hpbGRyZW5Qcm9wcyA9IHtcclxuICBjaGlsZHJlbjogSlNYQ2hpbGRbXTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBwcm9wcyBvYmplY3Qgd2hpY2ggd2lsbCBiZSBwYXNzZWQgdG8ganN4IHByYWdtYSBhbmQgY3VzdG9tIGNvbXBvbmVudCBmdW5jdGlvbnNcclxuICovXHJcbnR5cGUgSnN4UHJvcHMgPSBBdHRyaWJ1dGVzICYgU3BlY2lhbEF0dHJpYnV0ZXMgJiBDaGlsZHJlblByb3BzO1xyXG5cclxuLy8gbnVsbCB3aGVuIGNoZWNraW5nIHRoZSBwYXJlbnQgd2hlbiByb290IGlzIGZyYWdtZW50IGl0c2VsZlxyXG4vKipcclxuICogcmV0dXJuIHRoZSBjbG9zZXN0IGFuY2VzdG9yIG9mIHRoZSBnaXZlbiBWTm9kZSB3aGljaCBoYXMgYW4gRE9NIEVsZW1lbnQgKGkuZS4gaXMgbm90IGEgRnJhZ21lbnQpXHJcbiAqIEBwYXJhbSB2Tm9kZSB7Vk5vZGVJbnRlcmZhY2V9XHJcbiAqL1xyXG5mdW5jdGlvbiBnZXRQYXJlbnRFbGVtZW50Tm9kZSh2Tm9kZTogVk5vZGVJbnRlcmZhY2UpOiBFbGVtZW50Vk5vZGUge1xyXG4gIHdoaWxlICh2Tm9kZS5wYXJlbnQpIHtcclxuICAgIHZOb2RlID0gdk5vZGUucGFyZW50O1xyXG4gICAgaWYgKHZOb2RlLm5vZGUpIGJyZWFrO1xyXG4gIH1cclxuXHJcbiAgLy8gYC5ub2RlYCBpcyBvbmx5IG9uIFwiVGV4dFwiIGFuZCBcIkVsZW1lbnRcIiwgXCJSYXdIdG1sXCIgdHlwZSBWTm9kZSwgYW5kIG9ubHkgRWxlbWVudCBoYXMgY2hpbGRyZW5cclxuICByZXR1cm4gKHZOb2RlIGFzIHVua25vd24pIGFzIEVsZW1lbnRWTm9kZTtcclxufVxyXG5cclxuLyoqXHJcbiAqIGZvciB0aGUgZ2l2ZW4gdi1ub2RlIGFsbCBjaGlsZHJlbiBhcmUgdHJhdmVyc2VkIHRpbGwgY2hpbGRyZW4gd2l0aCBET00gbm9kZXMgYXJlIGZvdW5kXHJcbiAqXHJcbiAqIEBwYXJhbSB7Vk5vZGVJbnRlcmZhY2V9IHZOb2RlIC0gcGFyZW50IG5vZGVcclxuICogQHBhcmFtIHtWTm9kZUludGVyZmFjZX0gW2Fsd2F5c0FsbG93XSAtIGFsd2F5cyBjb250YWluIHRoZSBwcm92aWRlZCBub2RlIGluIHRoZSByZXR1cm5lZCBsaXN0LCBldmVuIGlmIGl0IGlzIG5vdCBhbiBlbGVtZW50IHdpdGggRE9NIE5vZGVcclxuICogQHJldHVybnMge1ZOb2RlSW50ZXJmYWNlW119XHJcbiAqL1xyXG5mdW5jdGlvbiBnZXRDaGlsZHJlbldpdGhOb2RlcyhcclxuICB2Tm9kZTogVk5vZGVJbnRlcmZhY2UsXHJcbiAgYWx3YXlzQWxsb3c/OiBWTm9kZUludGVyZmFjZVxyXG4pOiBWTm9kZUludGVyZmFjZVtdIHtcclxuICB2Tm9kZS5jaGlsZHJlbjtcclxuICByZXR1cm4gdk5vZGUuY2hpbGRyZW5cclxuICAgIC5tYXAoKGNoaWxkTm9kZSkgPT4ge1xyXG4gICAgICBpZiAoY2hpbGROb2RlID09PSBhbHdheXNBbGxvdykgcmV0dXJuIGNoaWxkTm9kZTtcclxuICAgICAgaWYgKGNoaWxkTm9kZS5ub2RlKSByZXR1cm4gY2hpbGROb2RlO1xyXG4gICAgICByZXR1cm4gZ2V0Q2hpbGRyZW5XaXRoTm9kZXMoY2hpbGROb2RlLCBhbHdheXNBbGxvdyk7XHJcbiAgICB9KVxyXG4gICAgLmZsYXQoSW5maW5pdHkpIGFzIFZOb2RlSW50ZXJmYWNlW107XHJcbn1cclxuXHJcbi8qKlxyXG4gKiByZXR1cm5zIGEgdHVwbGUgb2YgdGhlIGNsb3Nlc3QgYW5jZXN0b3Igd2hpY2ggaGFzIGEgRE9NIE5vZGUsXHJcbiAqIGFuZCB0aGUgbm9kZSB3aGljaCBoYXMgYSBET00gbm9kZSBhbmQgaXMgcmVuZGVyZWQgYXMgdGhlIG5leHQgc2libGluZyBmb3IgdGhlIHByb3ZpZGVkIG5vZGUgaW4gdGhlIERPTS5cclxuICogT3IgbnVsbCB3aGVuIGl0IGlzIHRoZSBsYXN0IGNoaWxkIGl0c2VsXHJcbiAqXHJcbiAqIEBwYXJhbSB7Vk5vZGVJbnRlcmZhY2V9IHZOb2RlXHJcbiAqIEByZXR1cm5zIHsoW05vZGUsIE5vZGUgfCBudWxsXSl9XHJcbiAqL1xyXG5mdW5jdGlvbiBnZXRQYXJlbnRBbmROZXh0U2libGluZyh2Tm9kZTogVk5vZGVJbnRlcmZhY2UpOiBbTm9kZSwgTm9kZSB8IG51bGxdIHtcclxuICAvLyBub2RlIGFuY2VzdG9yIHdpdGggRWxlbWVudCxcclxuICBjb25zdCBwYXJlbnRXaXRoRWxlbWVudCA9IGdldFBhcmVudEVsZW1lbnROb2RlKHZOb2RlKTtcclxuICBjb25zdCBzaWJsaW5ncyA9IGdldENoaWxkcmVuV2l0aE5vZGVzKHBhcmVudFdpdGhFbGVtZW50LCB2Tm9kZSk7XHJcbiAgY29uc3QgcHJldlNpYmxpbmcgPSBzaWJsaW5nc1tzaWJsaW5ncy5pbmRleE9mKHZOb2RlKSAtIDFdO1xyXG4gIGNvbnN0IG5leHRTaWJsaW5nTm9kZSA9IHByZXZTaWJsaW5nID8gcHJldlNpYmxpbmcubm9kZSEubmV4dFNpYmxpbmcgOiBudWxsO1xyXG5cclxuICByZXR1cm4gW3BhcmVudFdpdGhFbGVtZW50Lm5vZGUsIG5leHRTaWJsaW5nTm9kZV07XHJcbn1cclxuXHJcbi8qKlxyXG4gKiByZXR1cm5zIHRydWUgaWYgbm90IG51bGxpc2ggb3IgZmFsc2VcclxuICogdGhhdCBtZWFucyAwIG9yIGVtcHR5IHN0cmluZyBhcmUgYWxsb3dlZFxyXG4gKiBAcGFyYW0geyp9IHZhbFxyXG4gKi9cclxuZnVuY3Rpb24gdHJ1dGh5KHZhbHVlOiBhbnkpOiBib29sZWFuIHtcclxuICByZXR1cm4gdmFsdWUgIT09IGZhbHNlICYmIHZhbHVlICE9PSBudWxsICYmIHZhbHVlICE9PSB1bmRlZmluZWQ7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBlc2NhcGVzIHRoZSBwcm92aWRlZCBzdHJpbmcgYWdhaW5zdCB4c3MgYXR0YWNrcyBldGNcclxuICpcclxuICogQHBhcmFtIHtzdHJpbmd9IHRleHRcclxuICogQHJldHVybnMge3N0cmluZ31cclxuICovXHJcbmZ1bmN0aW9uIHNhbml0aXplKHRleHQ6IHN0cmluZyk6IHN0cmluZyB7XHJcbiAgY29uc3QgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICBkaXYuaW5uZXJUZXh0ID0gdGV4dDtcclxuICByZXR1cm4gZGl2LmlubmVySFRNTDtcclxufVxyXG5cclxuLyoqXHJcbiAqIGJhc2ljYWxseSBgRWxlbWVudC5vdXRlckhUTUxgIGJ1dCBhbHNvIHN1cHBvcnRzIFRleHQgbm9kZSBhbmQgRG9jdW1lbnRGcmFnbWVudFxyXG4gKiBAcGFyYW0gZWxlbWVudCB7Tm9kZX0gLSBlbGVtZW50IHdoaWNoIGl0cyBodG1sIG5lZWRzIHRvIGJlIHJldHVybmVkXHJcbiAqL1xyXG5mdW5jdGlvbiBnZXRPdXRlckh0bWwoZWxlbWVudDogTm9kZSk6IHN0cmluZyB7XHJcbiAgaWYgKGVsZW1lbnQgaW5zdGFuY2VvZiBFbGVtZW50KSByZXR1cm4gZWxlbWVudC5vdXRlckhUTUw7XHJcbiAgaWYgKGVsZW1lbnQgaW5zdGFuY2VvZiBUZXh0KSByZXR1cm4gc2FuaXRpemUoZWxlbWVudC53aG9sZVRleHQpO1xyXG4gIGlmIChlbGVtZW50IGluc3RhbmNlb2YgRG9jdW1lbnRGcmFnbWVudClcclxuICAgIHJldHVybiBBcnJheS5mcm9tKGVsZW1lbnQuY2hpbGROb2RlcylcclxuICAgICAgLm1hcCgoZWwpID0+IGdldE91dGVySHRtbChlbCkpXHJcbiAgICAgIC5qb2luKFwiXCIpO1xyXG5cclxuICAvLyBzaG91bGRuJ3QgcmVhY2ggdGhpcyBwb2ludFxyXG4gIGNvbnNvbGUud2FybihcImdldE91dGVySHRtbCBkb2VzIG5vdCBzdXBwb3J0IHRoaXMgdHlwZSBvZiBlbGVtZW50XCIsIGVsZW1lbnQpO1xyXG4gIHJldHVybiBcIlwiO1xyXG59XHJcblxyXG4vKipcclxuICogZ2VuZXJhdGVzIHRoZSBodG1sIGFzIGEgc3RyaW5nIHdoaWNoIGNhbiBiZSB1c2VkIGZvciBleGFtcGxlIHdpdGggYGVsZW1lbnQuaW5uZXJIVE1MKClgXHJcbiAqXHJcbiAqIEBwYXJhbSB0YWcge3N0cmluZ3xGdW5jdGlvbn0gLSB0YWcgYXJndW1lbnQgb2YgdGhlIGpzeCBjYWxsXHJcbiAqIEBwYXJhbSBwcm9wcyB7T2JqZWN0fSAtIHByb3BzIGFyZ3VtZW50IG9mIGpzeCBjYWxsXHJcbiAqL1xyXG5mdW5jdGlvbiBhc0h0bWxTdHJpbmcoXHJcbiAgdGFnOiBzdHJpbmcgfCBGdW5jdGlvbixcclxuICBwcm9wczogQXR0cmlidXRlcyAmIFNwZWNpYWxBdHRyaWJ1dGVzLFxyXG4gIGNoaWxkcmVuOiBWTm9kZUludGVyZmFjZVtdXHJcbikge1xyXG4gIGNvbnN0IGF0dHJpYnV0ZXMgPSBPYmplY3QuZW50cmllcyhwcm9wcylcclxuICAgIC5maWx0ZXIoKFssIHZhbHVlXSkgPT4gdHJ1dGh5KHZhbHVlKSlcclxuICAgIC5tYXAoKFtrZXksIHZhbHVlXSkgPT4ge1xyXG4gICAgICAvLyBlLmcuIGRpc2FibGVkOiB0cnVlID0+IDx0YWcgZGlzYWJsZWQ+XHJcbiAgICAgIGlmICh2YWx1ZSA9PT0gdHJ1ZSkgcmV0dXJuIGtleTtcclxuXHJcbiAgICAgIC8vIGZvciBzdHlsZSBhcyBvYmplY3Q6XHJcbiAgICAgIC8vIChzdHlsZTopIHtkaXNwbGF5OiBcIm5vbmVcIiwgcG9zaXRpb246IFwiYWJzb2x1dGVcIn0gPT0+ICdkaXNwbGF5OiBub25lOyBwb3NpdGlvbjogYWJzb2x1dGU7J1xyXG4gICAgICBpZiAoa2V5ID09PSBcInN0eWxlXCIgJiYgdHlwZW9mIHZhbHVlID09PSBcIm9iamVjdFwiKVxyXG4gICAgICAgIHZhbHVlID0gT2JqZWN0LmVudHJpZXModmFsdWUpXHJcbiAgICAgICAgICAvLyBpZ25vcmUgc3R1ZmYgbGlrZSBge2JhY2tncm91bmQ6IGFjdGl2ZSAmJiBcInJlZFwifWAgd2hlbiBgYWN0aXZlID09PSBmYWxzZSAvIG51bGwgLyB1bmRlZmluZWRgXHJcbiAgICAgICAgICAuZmlsdGVyKChbLCB2XSkgPT4gdHJ1dGh5KHYpKVxyXG4gICAgICAgICAgLy8gY3VycmVudGx5IHN1cHBvcnRzIFwiYmFja2dyb3VuZC1jb2xvclwiIG5vdCBcImJhY2tncm91bmRDb2xvclwiXHJcbiAgICAgICAgICAubWFwKChbaywgdl0pID0+IGAke2t9OiAke3Z9YClcclxuICAgICAgICAgIC5qb2luKFwiOyBcIik7XHJcblxyXG4gICAgICAvLyAoY2xhc3M6KSBbXCJidG5cIiwgXCJyZWRcIl0gPT0+IFwiYnRuIHJlZFwiXHJcbiAgICAgIGlmIChrZXkgPT09IFwiY2xhc3NcIiAmJiBBcnJheS5pc0FycmF5KHZhbHVlKSkgdmFsdWUgPSB2YWx1ZS5qb2luKFwiIFwiKTtcclxuXHJcbiAgICAgIHJldHVybiBgJHtrZXl9PVwiJHt2YWx1ZX1cImA7XHJcbiAgICB9KVxyXG4gICAgLmpvaW4oXCIgXCIpO1xyXG5cclxuICBjb25zdCBjb250ZW50ID0gY2hpbGRyZW4ubWFwKChjaGlsZCkgPT4gY2hpbGQudG9TdHJpbmcoKSkuam9pbihcIlwiKTtcclxuXHJcbiAgcmV0dXJuIGA8JHt0YWd9ICR7YXR0cmlidXRlc30+JHtjb250ZW50fTwvJHt0YWd9PmA7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBnZW5lcmF0ZXMgSFRNTCBOb2RlIGVsZW1lbnRzIGZyb20gdGhlIHByb3ZpZGVkIGpzeCBpdGVtXHJcbiAqIEBwYXJhbSB0YWcge3N0cmluZ3xGdW5jdGlvbn0gLSB0YWcgYXJndW1lbnQgb2YgdGhlIGpzeCBjYWxsXHJcbiAqIEBwYXJhbSBwcm9wcyB7T2JqZWN0fSAtIHByb3BzIGFyZ3VtZW50IG9mIGpzeCBjYWxsXHJcbiAqL1xyXG5mdW5jdGlvbiBhc05vZGU8VCBleHRlbmRzIE5vZGU+KFxyXG4gIHRhZzogc3RyaW5nIHwgdW5kZWZpbmVkLFxyXG4gIHByb3BzOiBBdHRyaWJ1dGVzICYgU3BlY2lhbEF0dHJpYnV0ZXMsXHJcbiAgY2hpbGRyZW46IFZOb2RlSW50ZXJmYWNlW10sXHJcbiAgc3ZnQ29udGV4dCA9IGZhbHNlXHJcbik6IEVsZW1lbnQgfCBEb2N1bWVudEZyYWdtZW50IHtcclxuICAvLyBmcmFnbWVudFxyXG4gIGlmICghdGFnKSB7XHJcbiAgICBjb25zdCBmcmFnbWVudHMgPSBjaGlsZHJlbi5tYXAoKGl0ZW0pID0+IGl0ZW0uYXNOb2RlKCkpO1xyXG5cclxuICAgIGNvbnN0IGRvY3VtZW50RnJhZ21lbnQgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XHJcblxyXG4gICAgZG9jdW1lbnRGcmFnbWVudC5hcHBlbmQoLi4uZnJhZ21lbnRzKTtcclxuICAgIHJldHVybiBkb2N1bWVudEZyYWdtZW50O1xyXG4gIH1cclxuXHJcbiAgY29uc3QgeyByZWYsIC4uLmF0dHJzIH0gPSBwcm9wcztcclxuXHJcbiAgLy8gcmVtZW1iZXIgaWYgdGhlIHN2ZyBjb250ZXh0IHdhcyBzZXQgZm9yIHRoaXMgbm9kZSwgYW5kIHJlcGxhY2UgYWZ0ZXIgZ2VuZXJhdGluZyBhbGwgY2hpbGRyZW5cclxuXHJcbiAgLy8gY3VycmVudGx5IG5vdCBzdXBwb3J0aW5nIHRoZSBgaXNgIG9wdGlvbiBmb3IgQ3VzdG9taXplZCBidWlsdC1pbiBlbGVtZW50c1xyXG4gIGNvbnN0IG5vZGUgPSBzdmdDb250ZXh0XHJcbiAgICA/IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyhcImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIsIHRhZylcclxuICAgIDogZG9jdW1lbnQuY3JlYXRlRWxlbWVudCh0YWcpO1xyXG5cclxuICAvLyBjdXJyZW50bHkgb25seSBzdXBwb3J0aW5nIHJlZiBvbiBodG1sIGVsZW1lbnRzLiBub3QgdGVtcGxhdGUgZnVuY3Rpb25zXHJcbiAgLy8gcmVmIGlzIG9ubHkgY2FsbGVkIHdoZW4gZWxlbWVudCBpcyBjcmVhdGVkLiBub3Qgd2hlbiB0aGUgcmVmIHByb3BlcnR5IGlzIGNoYW5nZWRcclxuICBpZiAodHlwZW9mIHJlZiA9PT0gXCJmdW5jdGlvblwiKSB7XHJcbiAgICByZWZzVG9DYWxsLnB1c2goKCkgPT4gcmVmKG5vZGUpKTtcclxuICB9XHJcblxyXG4gIC8vIGFkZCBhdHRyaWJ1dGVzLCBldmVudCBsaXN0ZW5lcnMgZXRjLlxyXG4gIEVsZW1lbnRWTm9kZS5hZGRQcm9wcyhub2RlLCBhdHRycyk7XHJcblxyXG4gIG5vZGUuYXBwZW5kKFxyXG4gICAgLi4uY2hpbGRyZW5cclxuICAgICAgLy8uZmxhdCgpXHJcbiAgICAgIC5tYXAoKGNoaWxkKSA9PiBjaGlsZC5hc05vZGUoKSlcclxuICApO1xyXG5cclxuICByZXR1cm4gbm9kZTtcclxufVxyXG5cclxuLyoqXHJcbiAqIHJlbmRlcnMgdGhlIEhUTUwgZm9yIHRoZSBnaXZlbiBWLU5vZGUgYW5kIGFkZHMgdG8gdGhlIERPTSBhdCB0aGUgY29ycmVjdCBwb3NpdGlvblxyXG4gKiBAcGFyYW0gbmV3Tm9kZSAtIHZOb2RlIHRvIGJlIHJlbmRlcmVkIGFzIEhUTUwgTm9kZSBhbmQgYWRkZWQgdG8gRE9NXHJcbiAqL1xyXG5mdW5jdGlvbiBpbnNlcnROZXdJdGVtKG5ld05vZGU6IFZOb2RlSW50ZXJmYWNlKSB7XHJcbiAgY29uc3QgW3BhcmVudCwgbmV4dFNpYmxpbmddID0gZ2V0UGFyZW50QW5kTmV4dFNpYmxpbmcobmV3Tm9kZSk7XHJcbiAgcGFyZW50Lmluc2VydEJlZm9yZShuZXdOb2RlLmFzTm9kZSgpLCBuZXh0U2libGluZyk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBpdGVyYXRlIG92ZXIgYWxsIHRoZSBjaGlsZHJlbiBvZiB0aGUgcHJvdmlkZWQgbm9kZXMsIGFuZCBlYWNoIHBhaXJ3aXNlXHJcbiAqXHJcbiAqIEBwYXJhbSB7Vk5vZGVJbnRlcmZhY2V9IG9sZE5vZGUgLSB2LW5vZGUgZnJvbSB0aGUgb2xkIHJlbmRlclxyXG4gKiBAcGFyYW0ge1ZOb2RlSW50ZXJmYWNlfSBuZXdOb2RlLSB2LW5vZGUgZnJvbSB0aGUgbmV3IHRyZWUgd2hpY2ggaXRzIGNoaWxkcmVuIGhhdmUgdG8gcmVwbGFjZSB0aGUgY2hpbGRyZW4gb2YgdGhlIG9sZCBub2RlXHJcbiAqL1xyXG5mdW5jdGlvbiBkaWZmQW5kUGF0Y2hDaGlsZHJlbihcclxuICBvbGROb2RlOiBWTm9kZUludGVyZmFjZSxcclxuICBuZXdOb2RlOiBWTm9kZUludGVyZmFjZVxyXG4pIHtcclxuICBvbGROb2RlLmNoaWxkcmVuLmZvckVhY2goKG9sZENoaWxkLCBpeCkgPT4ge1xyXG4gICAgY29uc3QgbmV3Q2hpbGQgPSBuZXdOb2RlLmNoaWxkcmVuW2l4XTtcclxuICAgIC8vIGNoaWxkIHdhcyByZW1vdmVkXHJcbiAgICBpZiAoIW5ld0NoaWxkKSBvbGRDaGlsZC5yZW1vdmVGcm9tRE9NKCk7XHJcbiAgICAvLyBjaGlsZCBpcyBtb2RpZmllZFxyXG4gICAgZWxzZSBpZiAobmV3Q2hpbGQudHlwZSA9PT0gb2xkQ2hpbGQudHlwZSkgb2xkQ2hpbGQuZGlmZkFuZFBhdGNoKG5ld0NoaWxkKTtcclxuICAgIC8vIGNoaWxkIGlzIHJlcGxhY2VkXHJcbiAgICBlbHNlIHtcclxuICAgICAgb2xkQ2hpbGQucmVtb3ZlRnJvbURPTSgpO1xyXG4gICAgICBpbnNlcnROZXdJdGVtKG5ld0NoaWxkKTtcclxuICAgIH1cclxuICB9KTtcclxuXHJcbiAgLy8gbmV3IGFkZGl0aW9uIGl0ZW1zXHJcbiAgY29uc3QgbmV3SXRlbXMgPSBuZXdOb2RlLmNoaWxkcmVuLnNsaWNlKG9sZE5vZGUuY2hpbGRyZW4ubGVuZ3RoKTtcclxuICBpZiAobmV3SXRlbXMubGVuZ3RoKSB7XHJcbiAgICBjb25zdCBkb2N1bWVudEZyYWdtZW50ID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO1xyXG4gICAgbmV3SXRlbXMuZm9yRWFjaCgoaXRlbSkgPT4gZG9jdW1lbnRGcmFnbWVudC5hcHBlbmQoaXRlbS5hc05vZGUoKSkpO1xyXG5cclxuICAgIGNvbnN0IFtwYXJlbnQsIG5leHRTaWJsaW5nXSA9IGdldFBhcmVudEFuZE5leHRTaWJsaW5nKG5ld0l0ZW1zWzBdKTtcclxuICAgIHBhcmVudC5pbnNlcnRCZWZvcmUoZG9jdW1lbnRGcmFnbWVudCwgbmV4dFNpYmxpbmcpO1xyXG4gIH1cclxufVxyXG5cclxuLy8gYmFzZSBjbGFzcyB3aGljaCB3aWxsIGJlIGluaGVyaXRlZCBmcm9tIGpzeCBhbmQgZnJhZ21lbnRzIGZ1bmN0aW9uIG5vZGUgZ2VuZXJhdGlvblxyXG4vLyBhbmQgd2lsbCBiZSB1c2VkIHRvIGRpc3Rpbmd1aXNoIHRoZW0gd2l0aCBvdGhlciBFbGVtZW50c1xyXG5jbGFzcyBWTm9kZSB7fVxyXG5cclxuLy8gSW50ZXJmYWNlIHdoaWNoIHdpbGwgYmUgaW1wbGVtZW50ZWQgYnkgYWxsIHR5cGVzIG9mIG5vZGVzIGluIHRoZSBWLURPTSBUcmVlXHJcbmludGVyZmFjZSBWTm9kZUludGVyZmFjZSB7XHJcbiAgdG9TdHJpbmcoKTogc3RyaW5nO1xyXG4gIGFzTm9kZSgpOiBOb2RlO1xyXG4gIHBhcmVudDogVk5vZGVJbnRlcmZhY2UgfCBudWxsO1xyXG4gIGNoaWxkcmVuOiBBcnJheTxWTm9kZUludGVyZmFjZSB8IG5ldmVyPjtcclxuICB0eXBlOiBzdHJpbmc7XHJcbiAgbm9kZT86IE5vZGU7XHJcbiAgcmVtb3ZlRnJvbURPTSgpOiB2b2lkO1xyXG4gIGRpZmZBbmRQYXRjaChuZXdOb2RlOiBWTm9kZUludGVyZmFjZSk6IHZvaWQ7XHJcbn1cclxuXHJcbi8vIFYtTm9kZSB3aGljaCB3aWxsIGJlIHJlbmRlcmVkIGFzIEhUTUxFbGVtZW50IG9yIFNWR0VsZW1lbnRcclxuY2xhc3MgRWxlbWVudFZOb2RlIGV4dGVuZHMgVk5vZGUgaW1wbGVtZW50cyBWTm9kZUludGVyZmFjZSB7XHJcbiAgdHlwZSA9IFwiRWxlbWVudFwiO1xyXG4gIHRhZzogc3RyaW5nO1xyXG4gIHByb3BzOiBBdHRyaWJ1dGVzICYgU3BlY2lhbEF0dHJpYnV0ZXM7XHJcbiAgbm9kZTogRWxlbWVudCA9IG51bGwgYXMgYW55O1xyXG4gIGNoaWxkcmVuOiBWTm9kZUludGVyZmFjZVtdO1xyXG4gIHBhcmVudDogVk5vZGVJbnRlcmZhY2UgPSBudWxsIGFzIGFueTtcclxuICBzdmdDb250ZXh0OiBib29sZWFuID0gZmFsc2U7IC8vIHdpbGwgYmUgc2V0IHRvIHRydWUgd2hlbiBlbGVtZW50IGlzIGFuIFNWRyBFbGVtZW50XHJcblxyXG4gIGNvbnN0cnVjdG9yKHtcclxuICAgIHRhZyxcclxuICAgIHByb3BzLFxyXG4gICAgY2hpbGRyZW4sXHJcbiAgfToge1xyXG4gICAgdGFnOiBzdHJpbmc7XHJcbiAgICBwcm9wczogQXR0cmlidXRlcyAmIFNwZWNpYWxBdHRyaWJ1dGVzO1xyXG4gICAgY2hpbGRyZW46IEpTWENoaWxkW107XHJcbiAgfSkge1xyXG4gICAgc3VwZXIoKTtcclxuICAgIHRoaXMudGFnID0gdGFnO1xyXG4gICAgdGhpcy5wcm9wcyA9IHByb3BzO1xyXG5cclxuICAgIC8vIGNvbnZlcnQgY2hpbGQganN4IGNvbnRlbnQgdG8gVk5vZGVzXHJcbiAgICB0aGlzLmNoaWxkcmVuID0gY2hpbGRyZW4ubWFwKChjaGlsZCkgPT4ge1xyXG4gICAgICBpZiAoQXJyYXkuaXNBcnJheShjaGlsZCkpIHJldHVybiBuZXcgRnJhZ21lbnRWTm9kZShjaGlsZCk7XHJcbiAgICAgIGlmIChjaGlsZCBpbnN0YW5jZW9mIFZOb2RlKSByZXR1cm4gY2hpbGQgYXMgVk5vZGVJbnRlcmZhY2U7XHJcbiAgICAgIGlmIChjaGlsZCBpbnN0YW5jZW9mIE5vZGUpIHJldHVybiBuZXcgTGl2ZU5vZGVWTm9kZShjaGlsZCk7XHJcbiAgICAgIGlmICghdHJ1dGh5KGNoaWxkKSkgcmV0dXJuIG5ldyBOdWxsVk5vZGUoKTtcclxuXHJcbiAgICAgIHJldHVybiBuZXcgVGV4dFZOb2RlKGNoaWxkIGFzIHN0cmluZyB8IG51bWJlciB8IHRydWUpO1xyXG4gICAgfSk7XHJcbiAgICAvLyBzZXQgcGFyZW50IHByb3BlcnR5IG9uIGFsbCBjaGlsZHJlblxyXG4gICAgdGhpcy5jaGlsZHJlbi5mb3JFYWNoKChjaGlsZCkgPT4gKGNoaWxkLnBhcmVudCA9IHRoaXMpKTtcclxuICB9XHJcblxyXG4gIHRvU3RyaW5nKCkge1xyXG4gICAgcmV0dXJuIGFzSHRtbFN0cmluZyh0aGlzLnRhZywgdGhpcy5wcm9wcywgdGhpcy5jaGlsZHJlbik7XHJcbiAgfVxyXG5cclxuICBhc05vZGUoKSB7XHJcbiAgICAvLyB0cmF2ZXJzZSB0aGUgVlRyZWUgdG8gY2hlY2sgaWYgdGhpcyBlbGVtZW50IGlzIHJlbmRlcmVkIGluc2lkZSBhbiBzdmcgZWxlbWVudFxyXG4gICAgbGV0IHN2Z0NvbnRleHQgPSBmYWxzZTtcclxuICAgIGxldCB2Tm9kZTogVk5vZGVJbnRlcmZhY2UgPSB0aGlzO1xyXG4gICAgd2hpbGUgKHZOb2RlLnBhcmVudCkge1xyXG4gICAgICBpZiAodk5vZGUudGFnID09PSBcInN2Z1wiKSB7XHJcbiAgICAgICAgc3ZnQ29udGV4dCA9IHRydWU7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgICAgdk5vZGUgPSB2Tm9kZS5wYXJlbnQ7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5zdmdDb250ZXh0ID0gc3ZnQ29udGV4dDtcclxuXHJcbiAgICBjb25zdCBub2RlID0gYXNOb2RlKFxyXG4gICAgICB0aGlzLnRhZyxcclxuICAgICAgdGhpcy5wcm9wcyxcclxuICAgICAgdGhpcy5jaGlsZHJlbixcclxuICAgICAgdGhpcy5zdmdDb250ZXh0XHJcbiAgICApIGFzIEVsZW1lbnQ7XHJcbiAgICB0aGlzLm5vZGUgPSBub2RlO1xyXG5cclxuICAgIC8vIG1lbW9yaXplIGZvciBuZXh0IHN1YnRyZWUgcmUtcmVuZGVyc1xyXG4gICAgcmVuZGVyZWRWVHJlZXMuc2V0KG5vZGUsIHRoaXMpO1xyXG5cclxuICAgIHJldHVybiBub2RlO1xyXG4gIH1cclxuICByZW1vdmVGcm9tRE9NKCkge1xyXG4gICAgdGhpcy5ub2RlLnBhcmVudEVsZW1lbnQhLnJlbW92ZUNoaWxkKHRoaXMubm9kZSk7XHJcbiAgfVxyXG4gIGRpZmZBbmRQYXRjaChuZXdOb2RlOiBFbGVtZW50Vk5vZGUpIHtcclxuICAgIGlmIChuZXdOb2RlLnRhZyA9PT0gdGhpcy50YWcpIHtcclxuICAgICAgbmV3Tm9kZS5ub2RlID0gdGhpcy5ub2RlO1xyXG4gICAgICAvLyB1cGRhdGUgcHJvcHMgYW5kIGF0dHJpYnV0ZXNcclxuICAgICAgRWxlbWVudFZOb2RlLmFkZFByb3BzKG5ld05vZGUubm9kZSwgbmV3Tm9kZS5wcm9wcywgdGhpcy5wcm9wcyk7XHJcblxyXG4gICAgICAvLyBjaGlsZHJlbiA9PiBpdGVyIGFuZCBwYXRjaFxyXG4gICAgICAvLyBvbGQgY2hpbGRyZW4gYmVpbmcgbW9kaWZpZWRcclxuICAgICAgZGlmZkFuZFBhdGNoQ2hpbGRyZW4odGhpcywgbmV3Tm9kZSk7XHJcbiAgICB9XHJcbiAgICAvLyB0YWcgaGFzIGNoYW5nZWRcclxuICAgIGVsc2Uge1xyXG4gICAgICB0aGlzLm5vZGUucmVwbGFjZVdpdGgobmV3Tm9kZS5hc05vZGUoKSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gbWVtb3JpemUgZm9yIG5leHQgc3VidHJlZSByZS1yZW5kZXJzXHJcbiAgICByZW5kZXJlZFZUcmVlcy5zZXQodGhpcy5ub2RlLCBuZXdOb2RlKTtcclxuICB9XHJcblxyXG4gIHN0YXRpYyBmcm9tRXhpc3RpbmdFbGVtZW50Tm9kZShcclxuICAgIHZOb2RlOiBFbGVtZW50Vk5vZGUsXHJcbiAgICBjaGlsZHJlbjogQXJyYXk8Vk5vZGVJbnRlcmZhY2UgfCBWTm9kZUludGVyZmFjZVtdPlxyXG4gICkge1xyXG4gICAgY29uc3QgeyB0YWcsIHByb3BzLCBwYXJlbnQsIG5vZGUsIHN2Z0NvbnRleHQgfSA9IHZOb2RlO1xyXG4gICAgY29uc3QgbmV3Vk5vZGUgPSBuZXcgRWxlbWVudFZOb2RlKHsgdGFnLCBwcm9wcywgY2hpbGRyZW4gfSk7XHJcbiAgICBPYmplY3QuYXNzaWduKG5ld1ZOb2RlLCB7IHBhcmVudCwgbm9kZSwgc3ZnQ29udGV4dCB9KTtcclxuICAgIHJldHVybiBuZXdWTm9kZTtcclxuICB9XHJcblxyXG4gIHN0YXRpYyBhZGRQcm9wcyhcclxuICAgIGVsZW1lbnQ6IEVsZW1lbnQsXHJcbiAgICBuZXdQcm9wczogUmVjb3JkPHN0cmluZywgYW55PixcclxuICAgIG9sZFByb3BzOiBSZWNvcmQ8c3RyaW5nLCBhbnk+ID0ge31cclxuICApIHtcclxuICAgIC8vIGl0ZXJhdGUgb3ZlciBhbGwgbW9kaWZpZWQgbmV3IGFuZCBvbGQgcHJvcGVydGllcyBhbmQgc2V0L3JlbW92ZS91cGRhdGUgdGhlbVxyXG4gICAgQXJyYXkuZnJvbShuZXcgU2V0KFsuLi5PYmplY3Qua2V5cyhuZXdQcm9wcyksIC4uLk9iamVjdC5rZXlzKG9sZFByb3BzKV0pKVxyXG4gICAgICAubWFwKChwcm9wTmFtZSkgPT4gKHtcclxuICAgICAgICBwcm9wTmFtZSxcclxuICAgICAgICBvbGRWYWx1ZTogb2xkUHJvcHNbcHJvcE5hbWVdLFxyXG4gICAgICAgIG5ld1ZhbHVlOiBuZXdQcm9wc1twcm9wTmFtZV0sXHJcbiAgICAgIH0pKVxyXG4gICAgICAuZmlsdGVyKCh7IG5ld1ZhbHVlLCBvbGRWYWx1ZSB9KSA9PiBuZXdWYWx1ZSAhPT0gb2xkVmFsdWUpXHJcbiAgICAgIC5mb3JFYWNoKCh7IHByb3BOYW1lLCBuZXdWYWx1ZSwgb2xkVmFsdWUgfSkgPT4ge1xyXG4gICAgICAgIC8vIGZvciBzdHlsZSBhcyBvYmplY3Q6XHJcbiAgICAgICAgLy8gKHN0eWxlOikge2Rpc3BsYXk6IFwibm9uZVwiLCBwb3NpdGlvbjogXCJhYnNvbHV0ZVwifSA9PT4gJ2Rpc3BsYXk6IG5vbmU7IHBvc2l0aW9uOiBhYnNvbHV0ZTsnXHJcbiAgICAgICAgaWYgKHByb3BOYW1lID09PSBcInN0eWxlXCIgJiYgdHlwZW9mIG5ld1ZhbHVlID09PSBcIm9iamVjdFwiKVxyXG4gICAgICAgICAgbmV3VmFsdWUgPSBPYmplY3QuZW50cmllcyhuZXdWYWx1ZSlcclxuICAgICAgICAgICAgLmZpbHRlcigoWywgdl0pID0+IHRydXRoeSh2KSlcclxuICAgICAgICAgICAgLm1hcCgoW2ssIHZdKSA9PiBgJHtrfTogJHt2fWApXHJcbiAgICAgICAgICAgIC5qb2luKFwiOyBcIik7XHJcblxyXG4gICAgICAgIC8vIChjbGFzczopIFtcImJ0blwiLCBcInJlZFwiXSA9PT4gXCJidG4gcmVkXCJcclxuICAgICAgICBpZiAocHJvcE5hbWUgPT09IFwiY2xhc3NcIiAmJiBBcnJheS5pc0FycmF5KG5ld1ZhbHVlKSlcclxuICAgICAgICAgIG5ld1ZhbHVlID0gbmV3VmFsdWUuam9pbihcIiBcIik7XHJcbiAgICAgICAgLy8gcHJvcHMgc3RhcnRpbmcgd2l0aCBcIm9uLVwiIGFyZSBldmVudCBsaXN0ZW5lcnNcclxuICAgICAgICBpZiAoXHJcbiAgICAgICAgICBwcm9wTmFtZS5zdGFydHNXaXRoKFwib24tXCIpICYmXHJcbiAgICAgICAgICAodHlwZW9mIG5ld1ZhbHVlID09PSBcImZ1bmN0aW9uXCIgfHxcclxuICAgICAgICAgICAgdHlwZW9mIG5ld1ZhbHVlID09PSBcIm9iamVjdFwiIHx8XHJcbiAgICAgICAgICAgIHR5cGVvZiBvbGRWYWx1ZSA9PT0gXCJmdW5jdGlvblwiIHx8XHJcbiAgICAgICAgICAgIHR5cGVvZiBvbGRWYWx1ZSA9PT0gXCJvYmplY3RcIilcclxuICAgICAgICApIHtcclxuICAgICAgICAgIC8vIHJlbW92ZSBsZWFkaW5nIFwib24tXCJcIlxyXG4gICAgICAgICAgY29uc3QgZXZlbnQgPSBwcm9wTmFtZS5yZXBsYWNlKC9eb24tLywgXCJcIik7XHJcblxyXG4gICAgICAgICAgaWYgKHR5cGVvZiBuZXdWYWx1ZSA9PT0gXCJmdW5jdGlvblwiIHx8IHR5cGVvZiBuZXdWYWx1ZSA9PT0gXCJvYmplY3RcIilcclxuICAgICAgICAgICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFxyXG4gICAgICAgICAgICAgIGV2ZW50LFxyXG4gICAgICAgICAgICAgIG5ld1ZhbHVlIGFzIEV2ZW50TGlzdGVuZXJPckV2ZW50TGlzdGVuZXJPYmplY3RcclxuICAgICAgICAgICAgKTtcclxuXHJcbiAgICAgICAgICBpZiAodHlwZW9mIG9sZFZhbHVlID09PSBcImZ1bmN0aW9uXCIgfHwgdHlwZW9mIG9sZFZhbHVlID09PSBcIm9iamVjdFwiKVxyXG4gICAgICAgICAgICBlbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXHJcbiAgICAgICAgICAgICAgZXZlbnQsXHJcbiAgICAgICAgICAgICAgb2xkVmFsdWUgYXMgRXZlbnRMaXN0ZW5lck9yRXZlbnRMaXN0ZW5lck9iamVjdFxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBib29sZWFuIGF0dHJpYnV0ZSBzZXQgd2l0aG91dCB2YWx1ZVxyXG4gICAgICAgIGVsc2UgaWYgKG5ld1ZhbHVlID09PSB0cnVlKSBlbGVtZW50LnNldEF0dHJpYnV0ZShwcm9wTmFtZSwgXCJcIik7XHJcbiAgICAgICAgLy8gcmVtb3ZlIG9sZCBhdHRyaWJ1dGVzIHdoaWNoIGFyZSBmYWxzZSBub3dcclxuICAgICAgICBlbHNlIGlmICghdHJ1dGh5KG5ld1ZhbHVlKSkgZWxlbWVudC5yZW1vdmVBdHRyaWJ1dGUocHJvcE5hbWUpO1xyXG4gICAgICAgIC8vIHVwZGF0ZSB0byBuZXcgdmFsdWUgYXMgc3RyaW5nXHJcbiAgICAgICAgZWxzZSBpZiAodHlwZW9mIG5ld1ZhbHVlID09PSBcInN0cmluZ1wiIHx8IHR5cGVvZiBuZXdWYWx1ZSA9PT0gXCJudW1iZXJcIilcclxuICAgICAgICAgIGVsZW1lbnQuc2V0QXR0cmlidXRlKHByb3BOYW1lLCBTdHJpbmcobmV3VmFsdWUpKTtcclxuICAgICAgICAvLyBrZXkgaGFzIHRoZSBmb3JtIG9mIFwib24tY2hhbmdlXCIuIHZhbHVlIGlzIHRoZSBjYWxsYmFjayBmdW5jdGlvbiBvciBhbiBvYmplY3QgaW1wbGVtZW50aW5nIHtFdmVudExpc3RlbmVyfSBpbnRlcmZhY2VcclxuICAgICAgICAvLyBAdHMtaWdub3JlIC0gcHJvdmlkaW5nIHRoZSB2YWx1ZSBhcyBwcm9wZXJ0eSB0byBodG1sIGVsZW1lbnRcclxuICAgICAgICBlbHNlIGVsZW1lbnRbcHJvcE5hbWVdID0gbmV3VmFsdWU7IC8vIEBUT0RPOiByZW1vdmUgb2xkIG9iaiB3aGVuIG5ldyBpcyBudWxsOjogbmV3IG51bGwgLT4gb2xkOiBzdHI/IC0+IHJlbW92ZUF0dCwgZXZlbnQ/IDogcmVtb3ZlRXYsIG9iaj86IFtwcm9wXSA9IHVuZGVmXHJcbiAgICAgIH0pO1xyXG4gIH1cclxufVxyXG5cclxuLy8gVi1Ob2RlIGZvciB0aGUgRnJhZ21lbnQgZWxlbWVudCBpbiBqc3ggKGA8PjwvPmApIG9yIHdoZW4gYW4gYXJyYXkgaXMgcGxhY2VkIGRpcmVjdGx5IGluIGpzeCBjaGlsZHJlbiAoZS5nLiBgPGVsZW0+e1tsaXN0XX08L2VsZW0+YClcclxuY2xhc3MgRnJhZ21lbnRWTm9kZSBleHRlbmRzIFZOb2RlIGltcGxlbWVudHMgVk5vZGVJbnRlcmZhY2Uge1xyXG4gIHR5cGUgPSBcIkZyYWdtZW50XCI7XHJcbiAgY2hpbGRyZW46IFZOb2RlSW50ZXJmYWNlW107XHJcbiAgcGFyZW50OiBWTm9kZUludGVyZmFjZSA9IG51bGwgYXMgYW55O1xyXG5cclxuICBjb25zdHJ1Y3RvcihjaGlsZHJlbjogSlNYQ2hpbGRbXSkge1xyXG4gICAgc3VwZXIoKTtcclxuXHJcbiAgICB0aGlzLmNoaWxkcmVuID0gY2hpbGRyZW4ubWFwKChjaGlsZCkgPT4ge1xyXG4gICAgICBpZiAoQXJyYXkuaXNBcnJheShjaGlsZCkpIHJldHVybiBuZXcgRnJhZ21lbnRWTm9kZShjaGlsZCk7XHJcbiAgICAgIGlmIChjaGlsZCBpbnN0YW5jZW9mIFZOb2RlKSByZXR1cm4gY2hpbGQgYXMgVk5vZGVJbnRlcmZhY2U7XHJcbiAgICAgIGlmIChjaGlsZCBpbnN0YW5jZW9mIE5vZGUpIHJldHVybiBuZXcgTGl2ZU5vZGVWTm9kZShjaGlsZCk7XHJcbiAgICAgIGlmICghdHJ1dGh5KGNoaWxkKSkgcmV0dXJuIG5ldyBOdWxsVk5vZGUoKTtcclxuICAgICAgcmV0dXJuIG5ldyBUZXh0Vk5vZGUoY2hpbGQgYXMgc3RyaW5nIHwgbnVtYmVyIHwgdHJ1ZSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICB0aGlzLmNoaWxkcmVuLmZvckVhY2goKGNoaWxkKSA9PiAoY2hpbGQucGFyZW50ID0gdGhpcykpO1xyXG4gIH1cclxuXHJcbiAgYXNOb2RlKCkge1xyXG4gICAgY29uc3Qgbm9kZSA9IGFzTm9kZSh1bmRlZmluZWQsIHt9LCB0aGlzLmNoaWxkcmVuKSBhcyBEb2N1bWVudEZyYWdtZW50O1xyXG5cclxuICAgIHJldHVybiBub2RlO1xyXG4gIH1cclxuXHJcbiAgdG9TdHJpbmcoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5jaGlsZHJlbi5tYXAoKGNoaWxkKSA9PiBjaGlsZC50b1N0cmluZygpKS5qb2luKFwiXCIpO1xyXG4gIH1cclxuXHJcbiAgZGlmZkFuZFBhdGNoKG5ld1ZOb2RlOiBGcmFnbWVudFZOb2RlKSB7XHJcbiAgICByZXR1cm4gZGlmZkFuZFBhdGNoQ2hpbGRyZW4odGhpcywgbmV3Vk5vZGUpO1xyXG4gIH1cclxuXHJcbiAgcmVtb3ZlRnJvbURPTSgpIHtcclxuICAgIHRoaXMuY2hpbGRyZW4uZm9yRWFjaCgoY2hpbGQpID0+IGNoaWxkLnJlbW92ZUZyb21ET00oKSk7XHJcbiAgfVxyXG59XHJcblxyXG4vLyBWLU5vZGUgZm9yIGl0ZW1zIHdoaWNoIGJlIHJlbmRlcmVkIGFzIHRleHQgKHN0cmluZywgbnVtYmVyLC4uIClcclxuY2xhc3MgVGV4dFZOb2RlIGV4dGVuZHMgVk5vZGUgaW1wbGVtZW50cyBWTm9kZUludGVyZmFjZSB7XHJcbiAgdHlwZSA9IFwiVGV4dE5vZGVcIjtcclxuICBjaGlsZHJlbiA9IFtdO1xyXG4gIG5vZGU6IFRleHQgPSBudWxsIGFzIGFueTtcclxuICBwcm9wczogeyBjb250ZW50OiBhbnkgfTtcclxuICBwYXJlbnQ6IFZOb2RlSW50ZXJmYWNlID0gbnVsbCBhcyBhbnk7XHJcblxyXG4gIC8qKlxyXG4gICAqXHJcbiAgICovXHJcbiAgY29uc3RydWN0b3IoY29udGVudDogc3RyaW5nIHwgbnVtYmVyIHwgYm9vbGVhbikge1xyXG4gICAgc3VwZXIoKTtcclxuICAgIHRoaXMucHJvcHMgPSB7IGNvbnRlbnQgfTsgLy9AVE9ETzpcclxuICB9XHJcblxyXG4gIGFzTm9kZSgpIHtcclxuICAgIGNvbnN0IHRleHROb2RlID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUodGhpcy5wcm9wcy5jb250ZW50KTtcclxuICAgIHRoaXMubm9kZSA9IHRleHROb2RlO1xyXG4gICAgcmV0dXJuIHRleHROb2RlO1xyXG4gIH1cclxuXHJcbiAgdG9TdHJpbmcoKSB7XHJcbiAgICByZXR1cm4gc2FuaXRpemUodGhpcy5wcm9wcy5jb250ZW50KTtcclxuICB9XHJcblxyXG4gIGRpZmZBbmRQYXRjaChuZXdOb2RlOiBUZXh0Vk5vZGUpIHtcclxuICAgIHRoaXMubm9kZS5ub2RlVmFsdWUgPSBuZXdOb2RlLnByb3BzLmNvbnRlbnQ7XHJcbiAgICBuZXdOb2RlLm5vZGUgPSB0aGlzLm5vZGU7XHJcbiAgfVxyXG5cclxuICByZW1vdmVGcm9tRE9NKCkge1xyXG4gICAgdGhpcy5ub2RlLnBhcmVudEVsZW1lbnQhLnJlbW92ZUNoaWxkKHRoaXMubm9kZSk7XHJcbiAgfVxyXG59XHJcblxyXG4vLyBWLU5vZGUgZm9yIGBudWxsYCwgYGZhbHNlYCBvciBgdW5kZWZpbmVkYCBpbiBqc3ggZWxlbWVudHNcclxuY2xhc3MgTnVsbFZOb2RlIGV4dGVuZHMgVk5vZGUgaW1wbGVtZW50cyBWTm9kZUludGVyZmFjZSB7XHJcbiAgdHlwZSA9IFwiTnVsbFwiO1xyXG4gIGNoaWxkcmVuID0gW107XHJcbiAgcGFyZW50OiBWTm9kZUludGVyZmFjZSA9IG51bGwgYXMgYW55O1xyXG4gIC8qKlxyXG4gICAqXHJcbiAgICovXHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICBzdXBlcigpO1xyXG4gIH1cclxuXHJcbiAgYXNOb2RlKCkge1xyXG4gICAgLy9yZXR1cm4gbnVsbDsgLy8gcmV0dXJuIGVtcHR5IGZyYWdtZW50P1xyXG4gICAgcmV0dXJuIGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcclxuICB9XHJcblxyXG4gIGRpZmZBbmRQYXRjaChuZXdOb2RlMjogTnVsbFZOb2RlKSB7XHJcbiAgICByZXR1cm47XHJcbiAgfVxyXG5cclxuICByZW1vdmVGcm9tRE9NKCkge1xyXG4gICAgcmV0dXJuO1xyXG4gIH1cclxuXHJcbiAgdG9TdHJpbmcoKSB7XHJcbiAgICByZXR1cm4gXCJcIjtcclxuICB9XHJcbn1cclxuXHJcbi8vIFYtTm9kZSB3aGVuIGEgbGl2ZSBIVE1MRWxlbWVudCB3YXMgcmVmZXJuY2VkIGluIGpzeCAoZS5nLiBgPGRpdj57ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjb21wXCIpfTwvZGl2PmApXHJcbmNsYXNzIExpdmVOb2RlVk5vZGUgZXh0ZW5kcyBWTm9kZSBpbXBsZW1lbnRzIFZOb2RlSW50ZXJmYWNlIHtcclxuICB0eXBlID0gXCJOb2RlXCI7XHJcbiAgY2hpbGRyZW4gPSBbXSBhcyBWTm9kZUludGVyZmFjZVtdO1xyXG4gIHBhcmVudDogVk5vZGVJbnRlcmZhY2UgPSBudWxsIGFzIGFueTtcclxuICBub2RlOiBOb2RlO1xyXG5cclxuICAvKipcclxuICAgKlxyXG4gICAqL1xyXG4gIGNvbnN0cnVjdG9yKG5vZGU6IE5vZGUpIHtcclxuICAgIHN1cGVyKCk7XHJcbiAgICB0aGlzLm5vZGUgPSBub2RlO1xyXG4gIH1cclxuXHJcbiAgYXNOb2RlKCkge1xyXG4gICAgcmV0dXJuIHRoaXMubm9kZTtcclxuICB9XHJcblxyXG4gIGRpZmZBbmRQYXRjaChuZXdOb2RlOiBMaXZlTm9kZVZOb2RlKSB7XHJcbiAgICBpZiAobmV3Tm9kZS5ub2RlICE9PSB0aGlzLm5vZGUpIHtcclxuICAgICAgKHRoaXMubm9kZSBhcyBDaGlsZE5vZGUpLnJlcGxhY2VXaXRoKG5ld05vZGUubm9kZSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICByZW1vdmVGcm9tRE9NKCkge1xyXG4gICAgdGhpcy5ub2RlLnBhcmVudEVsZW1lbnQhLnJlbW92ZUNoaWxkKHRoaXMubm9kZSk7XHJcbiAgfVxyXG5cclxuICB0b1N0cmluZygpIHtcclxuICAgIHJldHVybiBnZXRPdXRlckh0bWwodGhpcy5ub2RlKTtcclxuICB9XHJcbn1cclxuXHJcbi8vIHdyYXBwZXIgVi1Ob2RlIHdoaWNoIHJlZmVyZW5jZXMgdGhlIEhUTUwgTm9kZSB3aGljaCBpdHNlbGYgaXMgbm90IHJlbmRlcmVkIGJ5IGpzeCwgYnV0IGl0cyBjb250ZW50LlxyXG5jbGFzcyBSb290Vk5vZGUgZXh0ZW5kcyBWTm9kZSBpbXBsZW1lbnRzIFZOb2RlSW50ZXJmYWNlIHtcclxuICB0eXBlID0gXCJSb290XCI7XHJcbiAgcGFyZW50ID0gbnVsbDtcclxuICBub2RlOiBFbGVtZW50O1xyXG4gIGNoaWxkcmVuOiBWTm9kZUludGVyZmFjZVtdO1xyXG4gIC8qKlxyXG4gICAqXHJcbiAgICovXHJcbiAgY29uc3RydWN0b3IoY29udGVudDogVk5vZGVJbnRlcmZhY2UsIGRvbU5vZGU6IEVsZW1lbnQpIHtcclxuICAgIHN1cGVyKCk7XHJcbiAgICBjb250ZW50LnBhcmVudCA9IHRoaXM7XHJcbiAgICB0aGlzLmNoaWxkcmVuID0gW2NvbnRlbnRdO1xyXG4gICAgdGhpcy5ub2RlID0gZG9tTm9kZTtcclxuICB9XHJcblxyXG4gIGFzTm9kZSgpIHtcclxuICAgIHJldHVybiB0aGlzLmNoaWxkcmVuWzBdLmFzTm9kZSgpO1xyXG4gIH1cclxuICB0b1N0cmluZygpIHtcclxuICAgIHJldHVybiB0aGlzLmNoaWxkcmVuWzBdLnRvU3RyaW5nKCk7XHJcbiAgfVxyXG5cclxuICBkaWZmQW5kUGF0Y2gobmV3Vk5vZGU6IFZOb2RlSW50ZXJmYWNlKSB7XHJcbiAgICBkaWZmQW5kUGF0Y2hDaGlsZHJlbih0aGlzLCBuZXdWTm9kZSk7XHJcbiAgfVxyXG5cclxuICByZW1vdmVGcm9tRE9NKCkge1xyXG4gICAgdGhpcy5ub2RlLnJlbW92ZSgpO1xyXG4gIH1cclxufVxyXG5cclxuLy8gZ2VuZXJhdGUgdGhlIFYtTm9kZXMgYW5kIFYtVHJlZSBiYXNlZCBvbiB0aGUgb2JqZWN0cyBwYXJzZWQgYnkgdGhlIGpzeCBiYWJlbCBwbHVnaW5cclxuZnVuY3Rpb24gYXNWTm9kZShcclxuICB0YWc6IHN0cmluZyB8IEZ1bmN0aW9uIHwgdW5kZWZpbmVkLFxyXG4gIHByb3BzOiBKc3hQcm9wc1xyXG4pOiBWTm9kZUludGVyZmFjZSB7XHJcbiAgaWYgKHR5cGVvZiB0YWcgPT09IFwiZnVuY3Rpb25cIikge1xyXG4gICAgbGV0IHJlc3VsdCA9IHRhZyhwcm9wcyk7XHJcbiAgICBpZiAocmVzdWx0IGluc3RhbmNlb2YgVk5vZGUpIHJldHVybiByZXN1bHQgYXMgVk5vZGVJbnRlcmZhY2U7XHJcbiAgICBpZiAocmVzdWx0IGluc3RhbmNlb2YgTm9kZSkgcmV0dXJuIG5ldyBMaXZlTm9kZVZOb2RlKHJlc3VsdCk7XHJcbiAgICAvLyBudWxsIGpzeCBub2RlXHJcbiAgICBpZiAoIXRydXRoeShyZXN1bHQpKSByZXR1cm4gbmV3IE51bGxWTm9kZSgpO1xyXG5cclxuICAgIHJldHVybiBuZXcgVGV4dFZOb2RlKHJlc3VsdCk7XHJcbiAgfVxyXG5cclxuICBjb25zdCB7IGNoaWxkcmVuLCAuLi5hdHRyIH0gPSBwcm9wcztcclxuXHJcbiAgcmV0dXJuIHRhZ1xyXG4gICAgPyBuZXcgRWxlbWVudFZOb2RlKHsgdGFnLCBwcm9wczogYXR0ciwgY2hpbGRyZW4gfSlcclxuICAgIDogbmV3IEZyYWdtZW50Vk5vZGUoY2hpbGRyZW4pO1xyXG59XHJcblxyXG4vKipcclxuICogY29udmVydHMgcHJhZ21hIG9iamVjdCB0byBodG1sIHN0cmluZ1xyXG4gKiBqc3hzIGlzIGFsd2F5cyBjYWxsZWQgd2hlbiBlbGVtZW50IGhhcyBtb3JlIHRoYW4gb25lIGNoaWxkXHJcbiAqXHJcbiAqIEBwYXJhbSB7c3RyaW5nIHwgRnVuY3Rpb259IHRhZyAtIHRhZyBuYW1lIG9yIHRhZyBjbGFzc1xyXG4gKiBAcGFyYW0ge09iamVjdCB8IG51bGx9IHByb3BzIC0gcHJvcHMgZm9yIHRoZSB0YWdcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBqc3hzKHRhZzogc3RyaW5nIHwgRnVuY3Rpb24sIHByb3BzOiBKc3hQcm9wcyk6IFZOb2RlSW50ZXJmYWNlIHtcclxuICByZXR1cm4gYXNWTm9kZSh0YWcsIHByb3BzKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIGNvbnZlcnRzIHRoZSBmcmFnbWVudHMgb2JqZWN0IHRvIG5vZGVzXHJcbiAqXHJcbiAqIEBwYXJhbSB7T2JqZWN0fSBwcm9wc1xyXG4gKiBAcGFyYW0ge0FycmF5fSBwcm9wcy5jaGlsZHJlbiAtIGNoaWxkIGVsZW1lbnRzIGluIHRoZSBmcmFnbWVudFxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIEZyYWdtZW50KHByb3BzOiBKc3hQcm9wcykge1xyXG4gIHJldHVybiBhc1ZOb2RlKHVuZGVmaW5lZCwgcHJvcHMpO1xyXG59XHJcblxyXG4vLyBqc3ggaXMgY2FsbGVkIHdoZW4gdGhlIGVsZW1lbnQgaGFzIG9uZSBvciB6ZXJvIGNoaWxkcmVuXHJcbmV4cG9ydCBmdW5jdGlvbiBqc3goXHJcbiAgdGFnOiBzdHJpbmcgfCBGdW5jdGlvbixcclxuICBwcm9wczogQXR0cmlidXRlcyAmIFNwZWNpYWxBdHRyaWJ1dGVzICYgeyBjaGlsZHJlbj86IEpTWENoaWxkIH1cclxuKTogVk5vZGVJbnRlcmZhY2Uge1xyXG4gIC8vIEB0cy1pZ25vcmUgLSB3cmFwcGluZyB0aGUgY2hpbGRyZW4gYXMgYXJyYXkgdG8gcmUtdXNlIGpzeHMgbWV0aG9kXHJcbiAgcHJvcHMuY2hpbGRyZW4gPSBwcm9wcy5oYXNPd25Qcm9wZXJ0eShcImNoaWxkcmVuXCIpID8gW3Byb3BzLmNoaWxkcmVuXSA6IFtdO1xyXG5cclxuICByZXR1cm4ganN4cyh0YWcsIHByb3BzIGFzIEpzeFByb3BzKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIHJlbmRlciB0aGUgZ2l2ZW4gbWFya3VwIGludG8gdGhlIGdpdmVuIEhUTUwgbm9kZVxyXG4gKlxyXG4gKiBAcGFyYW0ge3N0cmluZ3xIVE1MRWxlbWVudHxKU1h9IG1hcmt1cCAtIGh0bWwgYXMgc3RyaW5nLCBodG1sIGVsZW1lbnQgb3IganN4IHRlbXBsYXRlXHJcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGRvbU5vZGUgLSBjb250YWluZXIgZm9yIHRoZSB0ZW1wbGF0ZSB0byBiZSByZW5kZXJlZCBpbnRvXHJcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW2FwcGVuZD1mYWxzZV0gLSBzaG91bGQgdGhlIHByb3ZpZGVkIG1hcmt1cCBiZSBhcHBlbmRlZCB0byB0aGUgZXhpc3RpbmcgbWFya3VwLCBvciBkZWZhdWx0IHJlcGxhY2UgaXRcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiByZW5kZXIoXHJcbiAgbWFya3VwOlxyXG4gICAgfCBzdHJpbmdcclxuICAgIHwgbnVtYmVyXHJcbiAgICB8IG51bGxcclxuICAgIHwgYm9vbGVhblxyXG4gICAgfCB1bmRlZmluZWRcclxuICAgIHwgSFRNTEVsZW1lbnRcclxuICAgIHwgVk5vZGVJbnRlcmZhY2UsIC8vIEBUT0RPOiBzcGVjaWZpYyBzdXBwb3J0IGZvciBUZW1wbGF0ZT8gKC5jb250ZW50LmNsb25lKVxyXG4gIGRvbU5vZGU6IEhUTUxFbGVtZW50LFxyXG4gIGFwcGVuZDogYm9vbGVhbiA9IGZhbHNlXHJcbikge1xyXG4gIEFycmF5LmZyb20oZG9jdW1lbnQuYm9keS5xdWVyeVNlbGVjdG9yQWxsKFwiKlwiKSkuZm9yRWFjaChcclxuICAgIChlbCkgPT4gKGVsLnN0eWxlLmJhY2tncm91bmQgPSBcIiNjY2ZmY2NcIilcclxuICApO1xyXG5cclxuICAvLyB0aGUgY29udGVudCBvZiB0aGUgZ2l2ZW4gRE9NIE5vZGUgd2FzIGFscmVhZHkgcmVuZGVyZWQgYnkganN4LXJ1bnRpbWUsIGFuZCBpdCBvbmx5IG5lZWRzIHRvIGJlIHVwZGF0ZWRcclxuICBjb25zdCBpc1JlUmVuZGVyID0gcmVuZGVyZWRWVHJlZXMuaGFzKGRvbU5vZGUpO1xyXG5cclxuICBpZiAoXHJcbiAgICB0eXBlb2YgbWFya3VwID09PSBcInN0cmluZ1wiIHx8XHJcbiAgICB0eXBlb2YgbWFya3VwID09PSBcIm51bWJlclwiIHx8XHJcbiAgICBtYXJrdXAgPT09IHRydWVcclxuICApIHtcclxuICAgIG1hcmt1cCA9IG5ldyBUZXh0Vk5vZGUobWFya3VwKTtcclxuICB9IGVsc2UgaWYgKG1hcmt1cCBpbnN0YW5jZW9mIE5vZGUpIHtcclxuICAgIG1hcmt1cCA9IG5ldyBMaXZlTm9kZVZOb2RlKG1hcmt1cCk7XHJcbiAgfSBlbHNlIGlmIChtYXJrdXAgPT09IHVuZGVmaW5lZCB8fCBtYXJrdXAgPT09IG51bGwgfHwgbWFya3VwID09PSBmYWxzZSkge1xyXG4gICAgbWFya3VwID0gbmV3IE51bGxWTm9kZSgpO1xyXG4gIH1cclxuXHJcbiAgaWYgKG1hcmt1cCBpbnN0YW5jZW9mIFZOb2RlKSB7XHJcbiAgICBsZXQgdlRyZWU7XHJcblxyXG4gICAgaWYgKCFhcHBlbmQgJiYgIWlzUmVSZW5kZXIpIGRvbU5vZGUuaW5uZXJIVE1MID0gXCJcIjtcclxuXHJcbiAgICBpZiAoaXNSZVJlbmRlcikge1xyXG4gICAgICBjb25zdCBvbGRWVHJlZSA9IHJlbmRlcmVkVlRyZWVzLmdldChkb21Ob2RlKSE7XHJcblxyXG4gICAgICAvLyB3YXMgcHJldmlvdXNseSByZW5kZXJlZCBhcyBhIHN1YnRyZWUgZnJvbSBhbm90aGVyIHJlbmRlclxyXG4gICAgICBpZiAob2xkVlRyZWUudHlwZSA9PT0gXCJFbGVtZW50XCIpIHtcclxuICAgICAgICB2VHJlZSA9IEVsZW1lbnRWTm9kZS5mcm9tRXhpc3RpbmdFbGVtZW50Tm9kZShvbGRWVHJlZSBhcyBFbGVtZW50Vk5vZGUsIFtcclxuICAgICAgICAgIG1hcmt1cCxcclxuICAgICAgICBdKTtcclxuICAgICAgICAob2xkVlRyZWUgYXMgRWxlbWVudFZOb2RlKS5kaWZmQW5kUGF0Y2godlRyZWUpO1xyXG4gICAgICAgIC8vIHVwZGF0ZSB0aGUgY2hpbGRyZW4gcHJvcGVydHkgaW4gdGhlIG1lbW9yeSByZWZlcmVuY2UgZnJvbSB0aGUgcHJldmlvdXMgcmVuZGVyLFxyXG4gICAgICAgIC8vIGF0dHJpYnV0ZXMsIGV0YyB3aWxsIHN0YXkgdGhlIHNhbWVcclxuICAgICAgICBvbGRWVHJlZS5jaGlsZHJlbiA9IHZUcmVlLmNoaWxkcmVuO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHZUcmVlID0gbmV3IFJvb3RWTm9kZShtYXJrdXAsIGRvbU5vZGUpO1xyXG4gICAgICAgIC8vIGRpZmYgYW5kIHBhdGNoIERPTSBiYXNlZCBvbiB0aGUgbGFzdCByZW5kZXJcclxuICAgICAgICAob2xkVlRyZWUgYXMgUm9vdFZOb2RlKS5kaWZmQW5kUGF0Y2godlRyZWUpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICAvLyBmaXJzdCB0aW1lIHJlbmRlclxyXG4gICAgZWxzZSB7XHJcbiAgICAgIHZUcmVlID0gbmV3IFJvb3RWTm9kZShtYXJrdXAsIGRvbU5vZGUpO1xyXG4gICAgICBkb21Ob2RlLmFwcGVuZCh2VHJlZS5hc05vZGUoKSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gbWVtb3JpemUgdGhlIFYtVHJlZSB3aGljaCByZW5kZXJlZCB0aGUgY3VycmVudCBET00sIHRvIHVzZSBpdCBpbiBmdXR1cmUgcmUtcmVuZGVyc1xyXG4gICAgcmVuZGVyZWRWVHJlZXMuc2V0KGRvbU5vZGUsIHZUcmVlKTtcclxuXHJcbiAgICAvLyBjYWxsIGFsbCByZWYgY2FsbGJhY2tzIGZvdW5kIGR1cmluZyBjcmVhdGlvbiBvZiBuZXcgbm9kZXMgZHVyaW5nIHJlbmRlclxyXG4gICAgd2hpbGUgKHJlZnNUb0NhbGwubGVuZ3RoKSB7XHJcbiAgICAgIC8vIHJlbW92ZSBmaXJzdCBmcm9tIGxpc3QsIGFuZCBpbnZva2UgaXRcclxuICAgICAgcmVmc1RvQ2FsbC5zcGxpY2UoMCwgMSlbMF0oKTtcclxuICAgIH1cclxuICB9IGVsc2Uge1xyXG4gICAgdGhyb3cgbmV3IEVycm9yKFwicmVuZGVyIG1ldGhvZCBjYWxsZWQgd2l0aCB3cm9uZyBhcmd1bWVudChzKVwiKTtcclxuICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiB0aGUgcHJvdmlkZWQgc3RyaW5nIHdpbGwgYmUgcmVuZGVyZWQgYXMgbWFya3VwIGFuZCBub3QgZXNjYXBlZCAvIHNhbml0aXplZC5cclxuICogVXNlIHRoaXMgd2l0aCBjYXV0aW9uIGJlY2F1c2UgdGhlb3JldGljYWxseSBpdCBhbGxvd3MgYnJva2VuIGh0bWwgb3IgZXZlbiB4c3MgYXR0YWNrc1xyXG4gKlxyXG4gKlxyXG4gKiBAZXhwb3J0XHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBjb250ZW50IC0gaHRtbCBhcyBzdHJpbmcgd2hpY2ggbmVlZHMgdG8gYmUgcmVuZGVyZWRcclxuICogQHJldHVybnMge1ZOb2RlSW50ZXJmYWNlfVxyXG4gKiBAZXhhbXBsZVxyXG4gKiBgPGFydGljbGU+eyByYXdIdG1sKHJpY2hUZXh0KSB9PC9hcnRpY2xlPmBcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiByYXdIdG1sKGNvbnRlbnQ6IHN0cmluZyk6IFZOb2RlSW50ZXJmYWNlIHtcclxuICByZXR1cm4gbmV3IChjbGFzcyBSYXdIdG1sIGV4dGVuZHMgVk5vZGUgaW1wbGVtZW50cyBWTm9kZUludGVyZmFjZSB7XHJcbiAgICBwYXJlbnQ6IFZOb2RlSW50ZXJmYWNlID0gbnVsbCBhcyBhbnk7XHJcbiAgICBjaGlsZHJlbiA9IFtdO1xyXG4gICAgdHlwZSA9IFwiUmF3SHRtbFwiO1xyXG4gICAgY2hpbGROb2RlczogQ2hpbGROb2RlW10gPSBudWxsIGFzIGFueTtcclxuICAgIGNvbnRlbnQ6IHN0cmluZztcclxuICAgIG5vZGU/OiBOb2RlO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKGNvbnRlbnQ6IHN0cmluZykge1xyXG4gICAgICBzdXBlcigpO1xyXG4gICAgICB0aGlzLmNvbnRlbnQgPSBjb250ZW50O1xyXG4gICAgfVxyXG5cclxuICAgIHJlbW92ZUZyb21ET00oKSB7XHJcbiAgICAgIHRoaXMuY2hpbGROb2Rlcy5mb3JFYWNoKChub2RlKSA9PiBub2RlLnBhcmVudEVsZW1lbnQhLnJlbW92ZUNoaWxkKG5vZGUpKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBzaW1wbGUgcmUtcmVuZGVycyB3aXRob3V0IGRpZmZpbmcgYW5kIHBhdGNoaW5nIGluIGNhc2Ugb2YgbW9kaWZpZWQgY29udGVudFxyXG4gICAgZGlmZkFuZFBhdGNoKG5ld05vZGU6IFJhd0h0bWwpIHtcclxuICAgICAgaWYgKChuZXdOb2RlLmNvbnRlbnQgPSB0aGlzLmNvbnRlbnQpKSB7XHJcbiAgICAgICAgbmV3Tm9kZS5ub2RlID0gdGhpcy5ub2RlO1xyXG4gICAgICAgIG5ld05vZGUuY2hpbGROb2RlcyA9IHRoaXMuY2hpbGROb2RlcztcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuICAgICAgdGhpcy5yZW1vdmVGcm9tRE9NKCk7XHJcbiAgICAgIGluc2VydE5ld0l0ZW0obmV3Tm9kZSk7XHJcbiAgICB9XHJcblxyXG4gICAgdG9TdHJpbmcoKSB7XHJcbiAgICAgIHJldHVybiBjb250ZW50O1xyXG4gICAgfVxyXG5cclxuICAgIGFzTm9kZSgpIHtcclxuICAgICAgY29uc3QgdGVtcGxhdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGVtcGxhdGVcIik7XHJcbiAgICAgIHRlbXBsYXRlLmlubmVySFRNTCA9IHRoaXMuY29udGVudDtcclxuICAgICAgY29uc3QgZG9jdW1lbnRGcmFnbWVudCA9IHRlbXBsYXRlLmNvbnRlbnQ7XHJcbiAgICAgIHRoaXMuY2hpbGROb2RlcyA9IEFycmF5LmZyb20oZG9jdW1lbnRGcmFnbWVudC5jaGlsZE5vZGVzKTtcclxuXHJcbiAgICAgIC8vIGJhc2ljYWxseSB0aGUgYC5ub2RlYCBwcm9wZXJ0eSBpcyB1c2VkIHRvIGRldGVybWluZSB0aGUgbGFzdCBodG1sIG5vZGUgb2YgdGhlIFZOb2RlLFxyXG4gICAgICAvLyB0byBwb3NpdGlvbiB0aGUgbmV4dCBWTm9kZSdzIERPTSBOb2RlIGFmdGVyIGl0LlxyXG4gICAgICAvLyB0aGVyZWZvcmUgLm5vZGUgcmV0dXJucyB0aGUgbGFzdCBub2RlIG9mIHRoZSByYXcgaHRtbFxyXG4gICAgICBpZiAodGhpcy5jaGlsZE5vZGVzLmxlbmd0aClcclxuICAgICAgICB0aGlzLm5vZGUgPSB0aGlzLmNoaWxkTm9kZXNbdGhpcy5jaGlsZE5vZGVzLmxlbmd0aCAtIDFdO1xyXG4gICAgICByZXR1cm4gZG9jdW1lbnRGcmFnbWVudDtcclxuICAgIH1cclxuICB9KShjb250ZW50KTtcclxufVxyXG5cclxuLy8gZ290Y2hhczpcclxuLy8gLSBzdHlsZXMgd2lsbCBvdmVycmlkZSAoY291bGQgZG86IHNldHRpbmcgZWFjaCBydWxlIGluZGl2aWR1YWxseSlcclxuLy8gLSByZWYgOiBvbmx5IGNhbGxlZCBvbiBjcmVhdGlvbiBvZiBFbGVtZW50LCBub3Qgb24gcmVmIGNoYW5nZVxyXG5cclxuLy8gd2luZG93LnJlbmRlcmVkVlRyZWVzID0gcmVuZGVyZWRWVHJlZXM7XHJcbiIsImltcG9ydCB7IHJlbmRlciwgcmF3SHRtbCB9IGZyb20gXCIuL2pzeC9qc3gtcnVudGltZVwiO1xyXG5cclxuY29uc3QgeHNzID0gXCI8aW1nIHNyYz14IG9uZXJyb3I9XFxcImFsZXJ0KCdYU1MgQXR0YWNrJylcXFwiPlwiOyAvL1wiPHNjcmlwdD5hbGVydCgnLS4tJyk8L3NjcmlwdD5cIjtcclxuXHJcbmZ1bmN0aW9uIFJURShwcm9wczogLyp7IHR4dCwgXCJvbi1jbGlja1wiOiBvbkNsaWNrIH0qLyB7XHJcbiAgdHh0OiBzdHJpbmc7XHJcbiAgcmVmPzogRnVuY3Rpb247XHJcbn0pIHtcclxuICBjb25zb2xlLmxvZyhcIm9uQ2xpY2tcIiwgcHJvcHNbXCJvbi1jbGlja1wiXSk7XHJcbiAgcmV0dXJuIChcclxuICAgIDxwIHJlZj17KGVsOiBIVE1MRWxlbWVudCkgPT4gY29uc29sZS5sb2coXCJteSBkaXYgOjpyZWY6OjMuMlwiLCBlbCl9PlxyXG4gICAgICB7cHJvcHMudHh0fVxyXG4gICAgPC9wPlxyXG4gICk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIEJ1dHRvbih7XHJcbiAgY2hpbGRyZW4sXHJcbiAgZGlzYWJsZWQsXHJcbn06IHtcclxuICBjaGlsZHJlbjogYW55O1xyXG4gIGRpc2FibGVkOiBib29sZWFuO1xyXG4gIHJlZj86IEZ1bmN0aW9uO1xyXG59KSB7XHJcbiAgcmV0dXJuIChcclxuICAgIDxidXR0b25cclxuICAgICAgZGlzYWJsZWQ9e2Rpc2FibGVkfVxyXG4gICAgICByZWY9eyhlbDogSFRNTEVsZW1lbnQpID0+IGNvbnNvbGUubG9nKFwibXkgYnV0dG9uIDo6cmVmOjoxXCIsIGVsKX1cclxuICAgID5cclxuICAgICAgPHNwYW4gcmVmPXsoZWw6IEhUTUxFbGVtZW50KSA9PiBjb25zb2xlLmxvZyhcIm15IGEgOjpyZWY6OjJcIiwgZWwpfT5cclxuICAgICAgICBCdG4tc3Bhbi1maXJzdFxyXG4gICAgICA8L3NwYW4+XHJcbiAgICAgIHtjaGlsZHJlbn1cclxuICAgICAgPD5cclxuICAgICAgICA8c3BhbiByZWY9eyhlbDogSFRNTEVsZW1lbnQpID0+IGNvbnNvbGUubG9nKFwibXkgYSA6OnJlZjo6M1wiLCBlbCl9PlxyXG4gICAgICAgICAgQnRuLXNwYW4tZW5kXHJcbiAgICAgICAgPC9zcGFuPlxyXG4gICAgICA8Lz5cclxuICAgIDwvYnV0dG9uPlxyXG4gICk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHJlZmxvZyhlbDogSFRNTEVsZW1lbnQpIHtcclxuICBjb25zb2xlLmxvZyhcIm15IGlubmVyIGRpdjo6cmVmOjo4XCIsIGVsKTtcclxufVxyXG5cclxuLypcclxuY29uc3QgbWFya3VwID0gKFxyXG4gIDw+XHJcbiAgICA8ZGl2XHJcbiAgICAgIGNsYXNzPVwiZm9vXCJcclxuICAgICAgcmVmPXsoZWw6IEhUTUxFbGVtZW50KSA9PiBjb25zb2xlLmxvZyhcIm15IGRpdiA6OnJlZjo6NFwiLCBlbCl9XHJcbiAgICAvPlxyXG4gICAgPGlucHV0IGRpc2FibGVkPXt0cnVlfSBoaWRkZW49e2ZhbHNlfSAvPlxyXG4gICAgPEJ1dHRvblxyXG4gICAgICBkaXNhYmxlZD17dHJ1ZX1cclxuICAgICAgcmVmPXsoZWw6IEhUTUxFbGVtZW50KSA9PiBjb25zb2xlLmxvZyhcIm15IEJVVFRPTjo6cmVmOjo1XCIsIGVsKX1cclxuICAgID5cclxuICAgICAgdGV4dFxyXG4gICAgICA8cG9wdXAtaW5mb1xyXG4gICAgICAgIHJlZj17KGVsOiBIVE1MRWxlbWVudCkgPT4gY29uc29sZS5sb2coXCJzcGFuIGluIEJVVFRPTjo6cmVmOjo2XCIsIGVsKX1cclxuICAgICAgPlxyXG4gICAgICAgIGJsYVxyXG4gICAgICA8L3BvcHVwLWluZm8+XHJcbiAgICA8L0J1dHRvbj5cclxuICAgIDxSVEVcclxuICAgICAgdHh0PVwibGUgdGV4dFwiXHJcbiAgICAgIHJlZj17KGVsOiBIVE1MRWxlbWVudCkgPT4gY29uc29sZS5sb2coXCJteSBkaXYgOjpyZWY6OjMuMVwiLCBlbCl9XHJcbiAgICAgIG9uLWNsaWNrPXsoZTogSFRNTEVsZW1lbnQpID0+IGNvbnNvbGUubG9nKGUpfVxyXG4gICAgLz5cclxuICAgIHt4c3N9XHJcbiAgICB7cmF3SHRtbChgPG9sPjxsaT5yYXcgaHRtbDwvbGk+PC9vbD5gKX1cclxuICAgIDxkaXZcclxuICAgICAgY2xhc3M9XCJiYW1cIlxyXG4gICAgICByZWY9eyhlbDogSFRNTEVsZW1lbnQpID0+IGNvbnNvbGUubG9nKFwibXkgZGl2OjpyZWY6OjdcIiwgZWwpfVxyXG4gICAgPlxyXG4gICAgICA8ZGl2PlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJiYXJcIiBvbi1jbGljaz17KGUpID0+IGNvbnNvbGUubG9nKGUpfSByZWY9e3JlZmxvZ30+XHJcbiAgICAgICAgICBjbGljayBNRVxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDxkaXYgc3R5bGU9e3sgb3V0bGluZTogXCIxcHggc29saWQgcmVkO1wiIH19PlxyXG4gICAgICAgICAge2RvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjb2xkXCIpfVxyXG4gICAgICAgICAge251bGx9XHJcbiAgICAgICAgICB7WzAsIDFdLm1hcCgobikgPT4gKFxyXG4gICAgICAgICAgICA8c3Bhbj57bn08L3NwYW4+XHJcbiAgICAgICAgICApKX1cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgPC9kaXY+XHJcbiAgICA8L2Rpdj5cclxuICA8Lz5cclxuKTtcclxuXHJcbiovXHJcblxyXG4vKlxyXG5jb25zdCBtYXJrdXAgPSAoXHJcbiAgPEJ1dHRvbiBkaXNhYmxlZD17dHJ1ZX0+XHJcbiAgICAgIDxib2xkIHJlZj17cmVmbG9nfT4tLUlOTkVSLS08L2JvbGQ+XHJcbiAgPC9CdXR0b24+XHJcbik7Ki9cclxuLypcclxuXHJcbmNvbnN0IG1hcmt1cCA9IChcclxuICA8ZGl2IGNsYXNzPVwiZm9vXCIgcmVmPXsoZWw6IEhUTUxFbGVtZW50KSA9PiBjb25zb2xlLmxvZyhcIm15IGRpdjo6cmVmOjpcIiwgZWwpfT5cclxuICAgIDxkaXY+XHJcbiAgICAgIDxkaXYgY2xhc3M9XCJiYXJcIiByZWY9eyhlbDogSFRNTEVsZW1lbnQpID0+IGNvbnNvbGUubG9nKFwibXkgaW5uZXIgZGl2OjpyZWY6OlwiLCBlbCl9IC8+XHJcbiAgICA8L2Rpdj5cclxuICAgIDxCdXR0b24gZGlzYWJsZWQ9e3RydWV9PjwvQnV0dG9uPlxyXG4gIDwvZGl2PlxyXG4pO1xyXG4qL1xyXG4vKlxyXG5jb25zdCBtYXJrdXAgPSAoXHJcbiAgPGE+XHJcbiAgICA8Yj5cclxuICAgICAgPGMgY2xhc3M9XCJiYXJcIiByZWY9e3JlZmxvZ30gLz5cclxuICAgIDwvYj5cclxuICA8L2E+XHJcbik7XHJcbiovXHJcblxyXG5mdW5jdGlvbiBTcGFuKHsgbW9kZSB9OiB7IG1vZGU6IGFueSB9KSB7XHJcbiAgcmV0dXJuIG1vZGUgPT09IDEgPyAoXHJcbiAgICA8ZGl2PlxyXG4gICAgICA8c3BhbiBpZD1cImlubmVyXCIgb2xkPXt0cnVlfT5cclxuICAgICAgICBTcGFuLUNvbXAtLW9sZFxyXG4gICAgICA8L3NwYW4+XHJcbiAgICAgIDxoMz50byBiZSByZW1vdmVkPC9oMz5cclxuICAgIDwvZGl2PlxyXG4gICkgOiAoXHJcbiAgICA8ZGl2PlxyXG4gICAgICA8cCBpZD1cImlubmVyXCIgbmV3PXt0cnVlfT5cclxuICAgICAgICBTcGFuLUNvbXAtLW5ld3NcclxuICAgICAgPC9wPlxyXG4gICAgPC9kaXY+XHJcbiAgKTtcclxufVxyXG5cclxuZnVuY3Rpb24gQ29tcCh7IG51bSB9KSB7XHJcbiAgaWYgKG51bSA9PT0gMSkgcmV0dXJuIG51bGw7XHJcbiAgcmV0dXJuIChcclxuICAgIDxkaXY+XHJcbiAgICAgIDxwPmNvbXA8L3A+XHJcbiAgICA8L2Rpdj5cclxuICApO1xyXG59XHJcblxyXG5jb25zdCBtYXJrdXAxID0gKG51bTogYW55KSA9PiAoXHJcbiAgPGRpdiBpZD1cIm91dGVyXCIgZGF0YS1mb289XCJiYXJcIiBkYXRhLXZhcj17bnVtfT5cclxuICAgIDxoMz5zaG91bGQgZ2V0IDIgLTogMzwvaDM+XHJcbiAgICB7bnVtID09PSAxID8gKFxyXG4gICAgICA8dWwgY2xhc3M9XCJ1bC1jbGFzc1wiPlxyXG4gICAgICAgIDxsaT5UZXh0IDEgPC9saT5cclxuICAgICAgICA8bGk+VGV4dCAyIDwvbGk+XHJcbiAgICAgIDwvdWw+XHJcbiAgICApIDogKFxyXG4gICAgICA8dWwgY2xhc3M9XCJ1bC1jbGFzc1wiPlxyXG4gICAgICAgIDxsaT5UZXh0IDMgPC9saT5cclxuICAgICAgICA8bGk+VGV4dCAyIDwvbGk+XHJcbiAgICAgICAgPGxpPlRleHQgMSA8L2xpPlxyXG4gICAgICA8L3VsPlxyXG4gICAgKX1cclxuICAgIDxoMz5zaG91bGQgZ2V0IDMgLTogMjwvaDM+XHJcbiAgICB7bnVtID09PSAxID8gKFxyXG4gICAgICA8dWwgY2xhc3M9XCJ1bC1jbGFzc1wiPlxyXG4gICAgICAgIDxsaT5UZXh0IDEgPC9saT5cclxuICAgICAgICA8bGk+VGV4dCAyIDwvbGk+XHJcbiAgICAgICAgPGxpPlRleHQgMyA8L2xpPlxyXG4gICAgICA8L3VsPlxyXG4gICAgKSA6IChcclxuICAgICAgPHVsIGNsYXNzPVwidWwtY2xhc3NcIj5cclxuICAgICAgICA8bGk+VGV4dCAxIDwvbGk+XHJcbiAgICAgICAgPGxpPlRleHQgMiA8L2xpPlxyXG4gICAgICA8L3VsPlxyXG4gICAgKX1cclxuICAgIHtudW0gPT09IDEgPyBudWxsIDogPHA+bmV3IHJlbmRlcjwvcD59XHJcbiAgICA8ZGl2PlxyXG4gICAgICA8c3Bhbj5zcGFuLWNvbnRlbnQ8L3NwYW4+XHJcbiAgICA8L2Rpdj5cclxuICAgIDxTcGFuIG1vZGU9e251bX0gLz5cclxuICAgIHsvKmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjb2xkXCIpKi99XHJcbiAgICA8PkZyYWdtZW50LWl0ZW08Lz5cclxuICAgIDxzdmdcclxuICAgICAgdmlld0JveD1cIjAgMCAzMDAgMTAwXCJcclxuICAgICAgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiXHJcbiAgICAgIHN0cm9rZT1cInJlZFwiXHJcbiAgICAgIGZpbGw9XCJncmV5XCJcclxuICAgID5cclxuICAgICAgPGNpcmNsZSBjeD1cIjUwXCIgY3k9XCI1MFwiIHI9XCI0MFwiIC8+XHJcbiAgICAgIDxjaXJjbGUgY3g9XCIxNTBcIiBjeT1cIjUwXCIgcj1cIjRcIiAvPlxyXG5cclxuICAgICAgPHN2ZyB2aWV3Qm94PVwiMCAwIDEwIDEwXCIgeD1cIjIwMFwiIHdpZHRoPVwiMTAwXCI+XHJcbiAgICAgICAgPGNpcmNsZSBjeD1cIjVcIiBjeT1cIjVcIiByPVwiNFwiIC8+XHJcbiAgICAgIDwvc3ZnPlxyXG4gICAgPC9zdmc+XHJcbiAgPC9kaXY+XHJcbik7XHJcblxyXG5mdW5jdGlvbiBtYXJrdXAyKG51bTogYW55KSB7XHJcbiAgcmV0dXJuIChcclxuICAgIDxkaXYgaWQ9XCJvdXRlclwiPlxyXG4gICAgICA8PlxyXG4gICAgICAgIDw+XHJcbiAgICAgICAgICA8cD5uZXN0ZWQgZnJhZ21lbnQ8L3A+XHJcbiAgICAgICAgPC8+XHJcbiAgICAgIDwvPlxyXG4gICAgICA8aDE+c3RhdGljPC9oMT5cclxuICAgICAgPGgxPmR5bmFtaWMgdmFsOiB7bnVtfTwvaDE+XHJcbiAgICAgIHtudW0gPT09IDEgPyA8aDE+b2xkPC9oMT4gOiBmYWxzZX1cclxuICAgICAge251bSA9PT0gMSA/IChcclxuICAgICAgICA8PlxyXG4gICAgICAgICAgPGgxPmZyYWcgb2xkPC9oMT5cclxuICAgICAgICAgIDxzcGFuPmZyYWcgc3BhbiBvbGQ8L3NwYW4+XHJcbiAgICAgICAgPC8+XHJcbiAgICAgICkgOiAoXHJcbiAgICAgICAgPGgxPmZyYWcgbmV3PC9oMT5cclxuICAgICAgKX1cclxuICAgICAgPENvbXAgbnVtPXtudW19IC8+XHJcbiAgICA8L2Rpdj5cclxuICApO1xyXG59XHJcbmZ1bmN0aW9uIE5MKCkge1xyXG4gIHJldHVybiBudWxsO1xyXG59XHJcblxyXG5mdW5jdGlvbiBtYXJrdXAzKG51bTogYW55KSB7XHJcbiAgcmV0dXJuIG51bSA9PT0gMSA/IChcclxuICAgIDxoMT5cclxuICAgICAgQS1MaW5lIDEgLSB7bnVtfVxyXG4gICAgICA8U3BhbiBtb2RlPXtudW19IC8+XHJcbiAgICAgIDxCdXR0b25cclxuICAgICAgICBkaXNhYmxlZD17dHJ1ZX1cclxuICAgICAgICByZWY9eyhlbDogSFRNTEVsZW1lbnQpID0+IGNvbnNvbGUubG9nKFwibXkgQlVUVE9OOjpyZWY6OjVcIiwgZWwpfVxyXG4gICAgICA+XHJcbiAgICAgICAgdGV4dFxyXG4gICAgICAgIDxwb3B1cC1pbmZvXHJcbiAgICAgICAgICByZWY9eyhlbDogSFRNTEVsZW1lbnQpID0+IGNvbnNvbGUubG9nKFwic3BhbiBpbiBCVVRUT046OnJlZjo6NlwiLCBlbCl9XHJcbiAgICAgICAgPlxyXG4gICAgICAgICAgYmxhXHJcbiAgICAgICAgPC9wb3B1cC1pbmZvPlxyXG4gICAgICAgIDxwPmlubmVyIHAge251bX08L3A+XHJcbiAgICAgIDwvQnV0dG9uPlxyXG4gICAgICBBLUxpbmUgM1xyXG4gICAgICA8PlxyXG4gICAgICAgIDxwPlxyXG4gICAgICAgICAgPHA+QSBGcmFnIGxpbmUgMSo8L3A+XHJcbiAgICAgICAgPC9wPlxyXG4gICAgICAgIDxwPkEgRnJhZyBsaW5lIDI8L3A+XHJcbiAgICAgICAgPHA+QSBGcmFnIGxpbmUgMzwvcD5cclxuICAgICAgICA8cD5BIEZyYWcgbGluZSA0PC9wPlxyXG4gICAgICAgIDxzdmdcclxuICAgICAgICAgIHZpZXdCb3g9XCIwIDAgMzAwIDEwMFwiXHJcbiAgICAgICAgICB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCJcclxuICAgICAgICAgIHN0cm9rZT1cInJlZFwiXHJcbiAgICAgICAgICBmaWxsPVwiZ3JleVwiXHJcbiAgICAgICAgPlxyXG4gICAgICAgICAgPGNpcmNsZSBjeD1cIjUwXCIgY3k9XCI1MFwiIHI9XCI0MFwiIC8+XHJcbiAgICAgICAgICA8Y2lyY2xlIGN4PVwiMTUwXCIgY3k9XCI1MFwiIHI9XCI0XCIgLz5cclxuXHJcbiAgICAgICAgICA8c3ZnIHZpZXdCb3g9XCIwIDAgMTAgMTBcIiB4PVwiMjAwXCIgd2lkdGg9XCIxMDBcIj5cclxuICAgICAgICAgICAgPGNpcmNsZSBjeD1cIjVcIiBjeT1cIjVcIiByPVwiNFwiIC8+XHJcbiAgICAgICAgICA8L3N2Zz5cclxuICAgICAgICA8L3N2Zz5cclxuICAgICAgPC8+XHJcbiAgICAgIHtudWxsfVxyXG4gICAgPC9oMT5cclxuICApIDogKFxyXG4gICAgPGgxIGNsYXNzPVwiYVwiIHJlZj17Y29uc29sZS5pbmZvfT5cclxuICAgICAgQiBMaW5lIDEgLSB7bnVtfVxyXG4gICAgICA8U3BhbiBtb2RlPXtudW19IC8+XHJcbiAgICAgIDxCdXR0b25cclxuICAgICAgICBkaXNhYmxlZD17dHJ1ZX1cclxuICAgICAgICByZWY9eyhlbDogSFRNTEVsZW1lbnQpID0+IGNvbnNvbGUubG9nKFwibXkgQlVUVE9OOjpyZWY6OjVcIiwgZWwpfVxyXG4gICAgICA+XHJcbiAgICAgICAgdGV4dFxyXG4gICAgICAgIDxwb3B1cC1pbmZvXHJcbiAgICAgICAgICByZWY9eyhlbDogSFRNTEVsZW1lbnQpID0+IGNvbnNvbGUubG9nKFwic3BhbiBpbiBCVVRUT046OnJlZjo6NlwiLCBlbCl9XHJcbiAgICAgICAgPlxyXG4gICAgICAgICAgYmxhXHJcbiAgICAgICAgPC9wb3B1cC1pbmZvPlxyXG4gICAgICAgIDxwPntudW19PC9wPlxyXG4gICAgICA8L0J1dHRvbj5cclxuICAgICAgPD5cclxuICAgICAgICB7ZmFsc2V9XHJcbiAgICAgICAge251bGx9XHJcbiAgICAgICAge3VuZGVmaW5lZH1cclxuICAgICAgPC8+XHJcbiAgICAgIDw+XHJcbiAgICAgICAgPHA+QiBGcmFnIGxpbmUgMTwvcD5cclxuICAgICAgICA8cD5CIEZyYWcgbGluZSAyPC9wPlxyXG4gICAgICAgIHt1bmRlZmluZWR9XHJcbiAgICAgICAgPHA+QiBGcmFnIGxpbmUgMyg0KTwvcD5cclxuICAgICAgICA8c3ZnXHJcbiAgICAgICAgICB2aWV3Qm94PVwiMCAwIDMwMCAxMDBcIlxyXG4gICAgICAgICAgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiXHJcbiAgICAgICAgICBzdHJva2U9XCJyZWRcIlxyXG4gICAgICAgICAgZmlsbD1cImdyZXlcIlxyXG4gICAgICAgID5cclxuICAgICAgICAgIDxjaXJjbGUgY3g9XCI1MFwiIGN5PVwiNTBcIiByPVwiNDBcIiAvPlxyXG4gICAgICAgICAgPGNpcmNsZSBjeD1cIjE1MFwiIGN5PVwiNTBcIiByPVwiNFwiIC8+XHJcblxyXG4gICAgICAgICAgPHN2ZyB2aWV3Qm94PVwiMCAwIDEwIDEwXCIgeD1cIjIwMFwiIHdpZHRoPVwiMTAwXCI+XHJcbiAgICAgICAgICAgIDxjaXJjbGUgY3g9XCI1XCIgY3k9XCI1XCIgcj1cIjZcIiAvPlxyXG4gICAgICAgICAgPC9zdmc+XHJcbiAgICAgICAgPC9zdmc+XHJcbiAgICAgICAgPHA+QiBGcmFnIGxpbmUgNCg2KTwvcD5cclxuICAgICAgPC8+XHJcbiAgICA8L2gxPlxyXG4gICk7XHJcbn1cclxuY29uc3Qgb2JqID0geyBhOiAxIH07XHJcblxyXG5mdW5jdGlvbiBtYXJrdXA0KG51bTogYW55KSB7XHJcbiAgb2JqLmEgPSBudW07XHJcbiAgcmV0dXJuIG51bSA9PT0gMSA/IChcclxuICAgIDxoMSBvYmo9e29ian0gaWQ9e29iai5hfT5cclxuICAgICAgb2xkLUhlYWRsaW5lIHtudW19XHJcbiAgICA8L2gxPlxyXG4gICkgOiAoXHJcbiAgICA8aDEgb2JqPXtvYmp9IGNsYXNzPVwiYVwiIGlkPXtvYmouYX0+XHJcbiAgICAgIG5ldy1IZWFkbGluZSB7bnVtfVxyXG4gICAgPC9oMT5cclxuICApO1xyXG59XHJcblxyXG5mdW5jdGlvbiBtYXJrdXAobnVtOiBhbnkpIHtcclxuICByZXR1cm4gbnVtID09PSAxID8gKFxyXG4gICAgPGRpdj5cclxuICAgICAgPD5cclxuICAgICAgICA8cD5mcmFnIC0gSTwvcD5cclxuICAgICAgICA8Yj4gZnJhZyAtIElJPC9iPlxyXG4gICAgICA8Lz5cclxuICAgIDwvZGl2PlxyXG4gICkgOiAoXHJcbiAgICA8aDEgY2xhc3M9XCJhXCI+XHJcbiAgICAgIHtcIm5ldy1IZWFkbGluZVwifSB7bnVtfVxyXG4gICAgPC9oMT5cclxuICApO1xyXG59XHJcblxyXG5mdW5jdGlvbiBtYXJrdXA1KG51bTogYW55KSB7XHJcbiAgcmV0dXJuIG51bSA9PT0gMSA/IChcclxuICAgIDxkaXY+XHJcbiAgICAgIHtyYXdIdG1sKGA8ZGl2IGNsYXNzPVwia1wiPnR4dDwvZGl2PjxpbnB1dCB0eXBlPXJhZGlvXCIgLz5gKX1cclxuICAgICAgPENvbXAzIC8+XHJcbiAgICAgIHtlbH1cclxuICAgIDwvZGl2PlxyXG4gICkgOiAoXHJcbiAgICA8ZGl2PlxyXG4gICAgICB7cmF3SHRtbChgPGRpdiBjbGFzcz1cImtcIj50eHQ8L2Rpdj48aW5wdXQgdHlwZT1yYWRpb1wiIC8+YCl9XHJcbiAgICAgIHtudWxsfVxyXG4gICAgICB7ZWx9XHJcbiAgICA8L2Rpdj5cclxuICApO1xyXG59XHJcblxyXG5mdW5jdGlvbiBtYXJrdXA2KGEpIHtcclxuICByZXR1cm4gKFxyXG4gICAgPGRpdj5cclxuICAgICAgPHN2ZyBpZD1cImZvbzZcIiB2aWV3Qm94PVwiMCAwIDEwIDEwXCIgeD1cIjIwMFwiIHdpZHRoPVwiMTAwXCI+XHJcbiAgICAgICAgPD5cclxuICAgICAgICAgIHthICYmIDxjaXJjbGUgY3g9XCI1XCIgY3k9XCI1XCIgcj1cIjZcIiAvPn1cclxuICAgICAgICA8Lz5cclxuICAgICAgPC9zdmc+XHJcbiAgICAgIDxidXR0b24+c3VibWl0PC9idXR0b24+XHJcbiAgICA8L2Rpdj5cclxuICApO1xyXG59XHJcblxyXG4vL2NvbnNvbGUubG9nKG1hcmt1cCk7XHJcbi8vd2luZG93Lm1hcmt1cCA9IG1hcmt1cDtcclxuXHJcbmNsYXNzIFBvcFVwSW5mbyBleHRlbmRzIEhUTUxFbGVtZW50IHtcclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIC8vIEFsd2F5cyBjYWxsIHN1cGVyIGZpcnN0IGluIGNvbnN0cnVjdG9yXHJcbiAgICBzdXBlcigpO1xyXG5cclxuICAgIC8vIHdyaXRlIGVsZW1lbnQgZnVuY3Rpb25hbGl0eSBpbiBoZXJlXHJcblxyXG4gICAgY29uc29sZS5sb2coXCIjIyMjIyMjIyMjIyMjIyMjI2N0b3IgQ0VcIik7XHJcbiAgfVxyXG5cclxuICBjb25uZWN0ZWRDYWxsYmFjaygpIHtcclxuICAgIGNvbnNvbGUubG9nKFwiIyMjIyMjIyMjIyMjIyMjIyNDdXN0b20gc3F1YXJlIGVsZW1lbnQgYWRkZWQgdG8gcGFnZS5cIik7XHJcbiAgfVxyXG59XHJcblxyXG5jdXN0b21FbGVtZW50cy5kZWZpbmUoXCJwb3B1cC1pbmZvXCIsIFBvcFVwSW5mbyk7XHJcblxyXG4vL2RvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjb2xkXCIpIS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgY29uc29sZS5sb2cpO1xyXG5cclxuLy9kb2N1bWVudC5ib2R5LmlubmVySFRNTCA9IG1hcmt1cDtcclxuLy8vL3JlbmRlcihtYXJrdXAzKDEpLCBkb2N1bWVudC5ib2R5KTtcclxuLy9kb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm91dGVyXCIpPy5zZXRBdHRyaWJ1dGUoXCJkYXRhLWZvb1wiLCBcIm1vZFwiKTtcclxuXHJcbi8vZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJpbm5lclwiKT8uc2V0QXR0cmlidXRlKFwiZGF0YS1mb29cIiwgXCJtb2RcIik7XHJcbi8vcmVuZGVyKG1hcmt1cCgyKSwgZG9jdW1lbnQuYm9keSk7XHJcbi8vcmVuZGVyKG1hcmt1cCwgZG9jdW1lbnQuYm9keSwgdHJ1ZSk7XHJcbmNvbnN0IGVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNvbGRcIik7XHJcbmZ1bmN0aW9uIENvbXAyKCkge1xyXG4gIHJldHVybiAoXHJcbiAgICA8PlxyXG4gICAgICB7cmF3SHRtbChgPGRpdiBjbGFzcz1cImtcIj50eHQ8L2Rpdj48aW5wdXQgdHlwZT1yYWRpb1wiIC8+YCl9XHJcbiAgICAgIDxDb21wMyAvPlxyXG4gICAgICB7ZWx9XHJcbiAgICA8Lz5cclxuICApO1xyXG59XHJcbmZ1bmN0aW9uIENvbXAzKCkge1xyXG4gIHJldHVybiA8ZGl2PmNvbXAgY29udGVudDwvZGl2PjtcclxufVxyXG5cclxuY29uc3QgJGNvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY29udGFpbmVyXCIpO1xyXG5cclxud2luZG93LnJlUmVuZGVyMSA9ICgpID0+IHJlbmRlcihtYXJrdXAzKDEpLCAkY29udGFpbmVyKTtcclxud2luZG93LnJlUmVuZGVyMiA9ICgpID0+IHJlbmRlcihtYXJrdXAzKDIpLCAkY29udGFpbmVyKTtcclxud2luZG93LnJlUmVuZGVyMyA9ICgpID0+XHJcbiAgcmVuZGVyKFxyXG4gICAgLy8gPGRpdj50eHQ8L2Rpdj5cclxuICAgIDxDb21wMiAvPixcclxuICAgICRjb250YWluZXJcclxuICApO1xyXG5cclxuY29uc29sZS5sb2coXCIxMjM0NVwiKTtcclxud2luZG93LnNzID0gKCkgPT4gbWFya3VwMygxKSArIFwiXCI7XHJcbndpbmRvdy5zczIgPSAoKSA9PiB7XHJcbiAgY29uc29sZS5sb2cobWFya3VwMygxKSk7XHJcblxyXG4gIC8vZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjb250YWluZXJcIikuaW5uZXJIVE1MID0gbWFya3VwMygxKTtcclxufTtcclxuXHJcbndpbmRvdy5yZVJlbmRlcjVhID0gKCkgPT4gcmVuZGVyKG1hcmt1cDUoMSksICRjb250YWluZXIpO1xyXG53aW5kb3cucmVSZW5kZXI1YiA9ICgpID0+IHJlbmRlcihtYXJrdXA1KDIpLCAkY29udGFpbmVyKTtcclxuXHJcbmZ1bmN0aW9uIG1hcmt1cDcobW9kKSB7XHJcbiAgaWYgKG1vZCA9PT0gMSkge1xyXG4gICAgcmV0dXJuIChcclxuICAgICAgPGRpdj5cclxuICAgICAgICA8QnV0dG9uPlxyXG4gICAgICAgICAgPHNwYW4+dGV4dDwvc3Bhbj5cclxuICAgICAgICAgIDxzcGFuPiwgbW9yZSB0ZXh0PC9zcGFuPlxyXG4gICAgICAgIDwvQnV0dG9uPlxyXG4gICAgICA8L2Rpdj5cclxuICAgICk7XHJcbiAgfSBlbHNlIGlmIChtb2QgPT09IDIpIHtcclxuICAgIHJldHVybiA8ZGl2PnNvbWUgY29udGVudDwvZGl2PjtcclxuICB9IGVsc2Uge1xyXG4gICAgcmV0dXJuIDxkaXY+e2ZhbHNlfTwvZGl2PjtcclxuICB9XHJcbn1cclxuXHJcbndpbmRvdy5yZVJlbmRlclJlZiA9ICgpID0+XHJcbiAgcmVuZGVyKFxyXG4gICAgPGgyIGNsYXNzPVwiYVwiIHJlZj17Y29uc29sZS53YXJufT5cclxuICAgICAgSGVhZGluZyB3aXRoIHJlZlxyXG4gICAgPC9oMj4sXHJcbiAgICAkY29udGFpbmVyXHJcbiAgKTtcclxud2luZG93LnJlUmVuZGVyNmEgPSAoKSA9PiByZW5kZXIobWFya3VwNih0cnVlKSwgJGNvbnRhaW5lcik7XHJcbndpbmRvdy5yZVJlbmRlcjZiID0gKCkgPT5cclxuICByZW5kZXIoPGNpcmNsZSBjeD1cIjVcIiBjeT1cIjVcIiByPVwiNlwiIC8+LCBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImZvbzZcIikpO1xyXG53aW5kb3cucmVSZW5kZXJTdmcgPSAoKSA9PiByZW5kZXIobWFya3VwMSgpLCAkY29udGFpbmVyKTtcclxud2luZG93LnJlUmVuZGVyU3ZnMiA9ICgpID0+IHJlbmRlcihtYXJrdXAxKCksICRjb250YWluZXIpO1xyXG53aW5kb3cucmVSZW5kZXI3XzEgPSAoKSA9PiByZW5kZXIobWFya3VwNygxKSwgJGNvbnRhaW5lcik7XHJcbndpbmRvdy5yZVJlbmRlcjdfMiA9ICgpID0+IHJlbmRlcihtYXJrdXA3KDIpLCAkY29udGFpbmVyKTtcclxud2luZG93LnJlUmVuZGVyN18zID0gKCkgPT4gcmVuZGVyKG1hcmt1cDcoMyksICRjb250YWluZXIpO1xyXG4iXSwic291cmNlUm9vdCI6IiJ9