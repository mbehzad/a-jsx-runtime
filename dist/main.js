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
    } // store the svg context information to the property to allow using it when the v-node is cloned


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

function Func1(_ref4) {
  var children = _ref4.children;
  console.log("Func-1");
  return "assasds";
  return Object(C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("div", {
    children: children
  });
}

function Func2() {
  console.log("Func-2");
  throw new Error("aaaa");
  return Object(C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("p", {
    children: "Text"
  });
}

Object(C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["render"])(Object(C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("div", {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vanN4L2pzeC1ydW50aW1lLnRzIiwid2VicGFjazovLy8uL21haW4udHN4Il0sIm5hbWVzIjpbInJlbmRlcmVkVlRyZWVzIiwiV2Vha01hcCIsInJlZnNUb0NhbGwiLCJnZXRQYXJlbnRFbGVtZW50Tm9kZSIsInZOb2RlIiwicGFyZW50Iiwibm9kZSIsImdldENoaWxkcmVuV2l0aE5vZGVzIiwiYWx3YXlzQWxsb3ciLCJjaGlsZHJlbiIsIm1hcCIsImNoaWxkTm9kZSIsImZsYXQiLCJJbmZpbml0eSIsImdldFBhcmVudEFuZE5leHRTaWJsaW5nIiwicGFyZW50V2l0aEVsZW1lbnQiLCJzaWJsaW5ncyIsInByZXZTaWJsaW5nIiwiaW5kZXhPZiIsIm5leHRTaWJsaW5nTm9kZSIsIm5leHRTaWJsaW5nIiwidHJ1dGh5IiwidmFsdWUiLCJ1bmRlZmluZWQiLCJzYW5pdGl6ZSIsInRleHQiLCJkaXYiLCJkb2N1bWVudCIsImNyZWF0ZUVsZW1lbnQiLCJpbm5lclRleHQiLCJpbm5lckhUTUwiLCJnZXRPdXRlckh0bWwiLCJlbGVtZW50IiwiRWxlbWVudCIsIm91dGVySFRNTCIsIlRleHQiLCJ3aG9sZVRleHQiLCJEb2N1bWVudEZyYWdtZW50IiwiQXJyYXkiLCJmcm9tIiwiY2hpbGROb2RlcyIsImVsIiwiam9pbiIsImNvbnNvbGUiLCJ3YXJuIiwiYXNIdG1sU3RyaW5nIiwidGFnIiwicHJvcHMiLCJhdHRyaWJ1dGVzIiwiT2JqZWN0IiwiZW50cmllcyIsImZpbHRlciIsImtleSIsInYiLCJrIiwiaXNBcnJheSIsImNvbnRlbnQiLCJjaGlsZCIsInRvU3RyaW5nIiwiYXNOb2RlIiwic3ZnQ29udGV4dCIsImZyYWdtZW50cyIsIml0ZW0iLCJkb2N1bWVudEZyYWdtZW50IiwiY3JlYXRlRG9jdW1lbnRGcmFnbWVudCIsImFwcGVuZCIsInJlZiIsImF0dHJzIiwiY3JlYXRlRWxlbWVudE5TIiwicHVzaCIsIkVsZW1lbnRWTm9kZSIsImFkZFByb3BzIiwiaW5zZXJ0TmV3SXRlbSIsIm5ld05vZGUiLCJpbnNlcnRCZWZvcmUiLCJkaWZmQW5kUGF0Y2hDaGlsZHJlbiIsIm9sZE5vZGUiLCJmb3JFYWNoIiwib2xkQ2hpbGQiLCJpeCIsIm5ld0NoaWxkIiwicmVtb3ZlRnJvbURPTSIsInR5cGUiLCJkaWZmQW5kUGF0Y2giLCJuZXdJdGVtcyIsInNsaWNlIiwibGVuZ3RoIiwiVk5vZGUiLCJjb25zdHJ1Y3RvciIsIkZyYWdtZW50Vk5vZGUiLCJOb2RlIiwiTGl2ZU5vZGVWTm9kZSIsIk51bGxWTm9kZSIsIlRleHRWTm9kZSIsInNldCIsInBhcmVudEVsZW1lbnQiLCJyZW1vdmVDaGlsZCIsInJlcGxhY2VXaXRoIiwiZnJvbUV4aXN0aW5nRWxlbWVudE5vZGUiLCJuZXdWTm9kZSIsImFzc2lnbiIsIm5ld1Byb3BzIiwib2xkUHJvcHMiLCJTZXQiLCJrZXlzIiwicHJvcE5hbWUiLCJvbGRWYWx1ZSIsIm5ld1ZhbHVlIiwic3RhcnRzV2l0aCIsImV2ZW50IiwicmVwbGFjZSIsImFkZEV2ZW50TGlzdGVuZXIiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwic2V0QXR0cmlidXRlIiwicmVtb3ZlQXR0cmlidXRlIiwiU3RyaW5nIiwidGV4dE5vZGUiLCJjcmVhdGVUZXh0Tm9kZSIsIm5vZGVWYWx1ZSIsIm5ld05vZGUyIiwiUm9vdFZOb2RlIiwiZG9tTm9kZSIsInJlbW92ZSIsImFzVk5vZGUiLCJyZXN1bHQiLCJhdHRyIiwianN4cyIsIkZyYWdtZW50IiwianN4IiwiaGFzT3duUHJvcGVydHkiLCJyZW5kZXIiLCJtYXJrdXAiLCJib2R5IiwicXVlcnlTZWxlY3RvckFsbCIsInN0eWxlIiwiYmFja2dyb3VuZCIsImlzUmVSZW5kZXIiLCJoYXMiLCJ2VHJlZSIsIm9sZFZUcmVlIiwiZ2V0Iiwic3BsaWNlIiwiRXJyb3IiLCJyYXdIdG1sIiwiUmF3SHRtbCIsInRlbXBsYXRlIiwieHNzIiwiUlRFIiwibG9nIiwidHh0IiwiQnV0dG9uIiwiZGlzYWJsZWQiLCJyZWZsb2ciLCJTcGFuIiwibW9kZSIsIkNvbXAiLCJudW0iLCJtYXJrdXAxIiwibWFya3VwMiIsIk5MIiwibWFya3VwMyIsImluZm8iLCJvYmoiLCJhIiwibWFya3VwNCIsIm1hcmt1cDUiLCJtYXJrdXA2IiwiUG9wVXBJbmZvIiwiSFRNTEVsZW1lbnQiLCJjdXN0b21FbGVtZW50cyIsImRlZmluZSIsInF1ZXJ5U2VsZWN0b3IiLCJDb21wMiIsIkNvbXAzIiwiJGNvbnRhaW5lciIsImdldEVsZW1lbnRCeUlkIiwid2luZG93IiwicmVSZW5kZXIxIiwicmVSZW5kZXIyIiwicmVSZW5kZXIzIiwic3MiLCJzczIiLCJyZVJlbmRlcjVhIiwicmVSZW5kZXI1YiIsIm1hcmt1cDciLCJtb2QiLCJyZVJlbmRlclJlZiIsInJlUmVuZGVyNmEiLCJyZVJlbmRlcjZiIiwicmVSZW5kZXJTdmciLCJyZVJlbmRlclN2ZzIiLCJyZVJlbmRlcjdfMSIsInJlUmVuZGVyN18yIiwicmVSZW5kZXI3XzMiLCJGdW5jMSIsIkZ1bmMyIl0sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FB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RCxDQUFSLEVBQWFWLFVBQWIsQ0FBWjtBQUFBLENBQXJCOztBQUNBRSxNQUFNLENBQUNpQixXQUFQLEdBQXFCO0FBQUEsU0FBTS9ELG1GQUFNLENBQUNzRCxPQUFPLENBQUMsQ0FBRCxDQUFSLEVBQWFWLFVBQWIsQ0FBWjtBQUFBLENBQXJCOztBQUdBLFNBQVNvQixLQUFULFFBQTJCO0FBQUEsTUFBWHpMLFFBQVcsU0FBWEEsUUFBVztBQUN6QmtDLFNBQU8sQ0FBQ3lHLEdBQVIsQ0FBWSxRQUFaO0FBQ0EsU0FBTyxTQUFQO0FBQ0EsU0FBTztBQUFBLGNBQU0zSTtBQUFOLElBQVA7QUFDRDs7QUFFRCxTQUFTMEwsS0FBVCxHQUFpQjtBQUVmeEosU0FBTyxDQUFDeUcsR0FBUixDQUFZLFFBQVo7QUFDQSxRQUFNLElBQUlOLEtBQUosQ0FBVSxNQUFWLENBQU47QUFHQSxTQUFPO0FBQUE7QUFBQSxJQUFQO0FBQ0Q7O0FBRURaLG1GQUFNLENBQUU7QUFBQSxZQUNOLGlGQUFDLEtBQUQ7QUFBQSxjQUNFLGlGQUFDLEtBQUQ7QUFERjtBQURNLEVBQUYsRUFJRzRDLFVBSkgsQ0FBTixDIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMCk7XG4iLCIvKipcclxuICogcHJvdmlkZXMgZnVuY3Rpb25zIG5lZWRlZCBieSBiYWJlbCBmb3IgYSBjdXN0b20gcHJhZ21hXHJcbiAqIHRvIHJlbmRlciBwYXJzZWQganN4IGNvZGUgdG8gaHRtbCxcclxuICogZGlmZiBhbmQgcGF0Y2ggaW4gc3Vic2VxdWVudCByZW5kZXJzXHJcbiAqL1xyXG5cclxuLy8gYSBtYXAgYmV0d2VlbiB2LXRyZWVzIGFuZCByZW5kZXJlZCBET00gbm9kZXMgLyBjb250YWluZXJzXHJcbmNvbnN0IHJlbmRlcmVkVlRyZWVzID0gbmV3IFdlYWtNYXA8RWxlbWVudCwgUm9vdFZOb2RlIHwgRWxlbWVudFZOb2RlPigpO1xyXG4vLyBsaXN0IG9mIGByZWZgIGNhbGxiYWNrcyB0byBiZSBjYWxsZWQgYWZ0ZXIgdGhlIERPTSBub2RlcyBhcmUgcmVuZGVyZWRcclxuY29uc3QgcmVmc1RvQ2FsbDogQXJyYXk8KCkgPT4gdm9pZD4gPSBbXTtcclxuXHJcbi8vIHByb3BzIHdoaWNoIHdpbGwgYmUgcmVuZGVyZWQgYXMgYXR0cmlidXRlc1xyXG4vLyBGdW5jdGlvbnMgd2lsbCBiZSB1c2VkIGZvciBldmVudCBsaXN0ZW5lcnMuICh3aXRoIGF0dHJpYnV0ZSBuYW1lIHN0YXJ0aW5nIHdpdGggJ29uLScpXHJcbi8vIE9iamVjdCB3aWxsIGJlIHNldCBhcyBwcm9wZXJ0eSBvbiB0aGUgcmVuZGVyZWQgbm9kZSBlbGVtZW50XHJcbnR5cGUgQXR0cmlidXRlcyA9IHtcclxuICBba2V5OiBzdHJpbmddOiBzdHJpbmcgfCBib29sZWFuIHwgbnVtYmVyIHwgRnVuY3Rpb24gfCBPYmplY3Q7XHJcbn07XHJcblxyXG4vLyBhZGRpdGlvbmFsIGF0dHJpYnV0ZXMgd2hpY2ggY2FuIGhhdmUgYWRkaXRpb25hbCBzZXJpYWxpemF0aW9uIGJlZm9yZSByZW5kZXJpbmcgYXMgYXR0cmlidXRlc1xyXG50eXBlIFNwZWNpYWxBdHRyaWJ1dGVzID0ge1xyXG4gIGNsYXNzPzogc3RyaW5nIHwgc3RyaW5nW107XHJcbiAgc3R5bGU/OiBzdHJpbmcgfCB7IFtrZXk6IHN0cmluZ106IHN0cmluZyB9O1xyXG4gIHJlZj86IEZ1bmN0aW9uO1xyXG59O1xyXG5cclxuLy8gdHlwZXMgb2YgY2hpbGRyZW4gd2hpY2ggd2lsbCBiZSBwYXNzZWQgYnkgdGhlIGpzeCBwYXJzZXIgcGx1Z2luXHJcbi8vIG5lc3RlZCBhcnJheSBpbiBjYXNlIG9mXHJcbi8vIDxlbGVtPlxyXG4vLyAgIDxzcGFuLz5cclxuLy8gICB7Y2hpbGRyZW59XHJcbi8vICAgdGV4dFxyXG4vLyAgIDxkaXYvPlxyXG4vLyA8L2VsZW0+XHJcbnR5cGUgSlNYQ2hpbGQgPVxyXG4gIHwgVk5vZGVJbnRlcmZhY2VcclxuICB8IE5vZGVcclxuICB8IHN0cmluZ1xyXG4gIHwgbnVtYmVyXHJcbiAgfCBib29sZWFuXHJcbiAgfCBudWxsXHJcbiAgfCB1bmRlZmluZWRcclxuICB8IEpTWENoaWxkW107XHJcblxyXG4vLyBjaGlsZCBlbGVtZW50cyBpbiB0aGUganN4IG1hcmt1cCB3aGljaCB3aWxsIGJlIHBhc3NlZCB0byB0aGUgaCBmdW5jdGlvbiBhcyBgcHJvcHMuY2hpbGRyZW5gXHJcbnR5cGUgQ2hpbGRyZW5Qcm9wcyA9IHtcclxuICBjaGlsZHJlbjogSlNYQ2hpbGRbXTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBwcm9wcyBvYmplY3Qgd2hpY2ggd2lsbCBiZSBwYXNzZWQgdG8ganN4IHByYWdtYSBhbmQgY3VzdG9tIGNvbXBvbmVudCBmdW5jdGlvbnNcclxuICovXHJcbnR5cGUgSnN4UHJvcHMgPSBBdHRyaWJ1dGVzICYgU3BlY2lhbEF0dHJpYnV0ZXMgJiBDaGlsZHJlblByb3BzO1xyXG5cclxuLyoqXHJcbiAqIHJldHVybiB0aGUgY2xvc2VzdCBhbmNlc3RvciBvZiB0aGUgZ2l2ZW4gVk5vZGUgd2hpY2ggaGFzIGFuIERPTSBFbGVtZW50IChpLmUuIGlzIG5vdCBhIEZyYWdtZW50KVxyXG4gKiBAcGFyYW0gdk5vZGUge1ZOb2RlSW50ZXJmYWNlfVxyXG4gKi9cclxuZnVuY3Rpb24gZ2V0UGFyZW50RWxlbWVudE5vZGUodk5vZGU6IFZOb2RlSW50ZXJmYWNlKTogRWxlbWVudFZOb2RlIHtcclxuICB3aGlsZSAodk5vZGUucGFyZW50KSB7XHJcbiAgICB2Tm9kZSA9IHZOb2RlLnBhcmVudDtcclxuICAgIGlmICh2Tm9kZS5ub2RlKSBicmVhaztcclxuICB9XHJcblxyXG4gIC8vIGAubm9kZWAgaXMgb25seSBvbiBcIlRleHRcIiBhbmQgXCJFbGVtZW50XCIsIFwiUmF3SHRtbFwiIHR5cGUgVk5vZGUsIGFuZCBvbmx5IEVsZW1lbnQgaGFzIGNoaWxkcmVuXHJcbiAgcmV0dXJuICh2Tm9kZSBhcyB1bmtub3duKSBhcyBFbGVtZW50Vk5vZGU7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBmb3IgdGhlIGdpdmVuIHYtbm9kZSBhbGwgY2hpbGRyZW4gYXJlIHRyYXZlcnNlZCB0aWxsIGNoaWxkcmVuIHdpdGggRE9NIG5vZGVzIGFyZSBmb3VuZFxyXG4gKlxyXG4gKiBAcGFyYW0ge1ZOb2RlSW50ZXJmYWNlfSB2Tm9kZSAtIHBhcmVudCBub2RlXHJcbiAqIEBwYXJhbSB7Vk5vZGVJbnRlcmZhY2V9IFthbHdheXNBbGxvd10gLSBhbHdheXMgY29udGFpbiB0aGUgcHJvdmlkZWQgbm9kZSBpbiB0aGUgcmV0dXJuZWQgbGlzdCwgZXZlbiBpZiBpdCBpcyBub3QgYW4gZWxlbWVudCB3aXRoIERPTSBOb2RlXHJcbiAqIEByZXR1cm5zIHtWTm9kZUludGVyZmFjZVtdfVxyXG4gKi9cclxuZnVuY3Rpb24gZ2V0Q2hpbGRyZW5XaXRoTm9kZXMoXHJcbiAgdk5vZGU6IFZOb2RlSW50ZXJmYWNlLFxyXG4gIGFsd2F5c0FsbG93PzogVk5vZGVJbnRlcmZhY2VcclxuKTogVk5vZGVJbnRlcmZhY2VbXSB7XHJcbiAgdk5vZGUuY2hpbGRyZW47XHJcbiAgcmV0dXJuIHZOb2RlLmNoaWxkcmVuXHJcbiAgICAubWFwKChjaGlsZE5vZGUpID0+IHtcclxuICAgICAgaWYgKGNoaWxkTm9kZSA9PT0gYWx3YXlzQWxsb3cpIHJldHVybiBjaGlsZE5vZGU7XHJcbiAgICAgIGlmIChjaGlsZE5vZGUubm9kZSkgcmV0dXJuIGNoaWxkTm9kZTtcclxuICAgICAgcmV0dXJuIGdldENoaWxkcmVuV2l0aE5vZGVzKGNoaWxkTm9kZSwgYWx3YXlzQWxsb3cpO1xyXG4gICAgfSlcclxuICAgIC5mbGF0KEluZmluaXR5KSBhcyBWTm9kZUludGVyZmFjZVtdO1xyXG59XHJcblxyXG4vKipcclxuICogcmV0dXJucyBhIHR1cGxlIG9mIHRoZSBjbG9zZXN0IGFuY2VzdG9yIHdoaWNoIGhhcyBhIERPTSBOb2RlLFxyXG4gKiBhbmQgdGhlIG5vZGUgd2hpY2ggaGFzIGEgRE9NIG5vZGUgYW5kIGlzIHJlbmRlcmVkIGFzIHRoZSBuZXh0IHNpYmxpbmcgZm9yIHRoZSBwcm92aWRlZCBub2RlIGluIHRoZSBET00uXHJcbiAqIE9yIG51bGwgd2hlbiBpdCBpcyB0aGUgbGFzdCBjaGlsZCBpdHNlbFxyXG4gKlxyXG4gKiBAcGFyYW0ge1ZOb2RlSW50ZXJmYWNlfSB2Tm9kZVxyXG4gKiBAcmV0dXJucyB7KFtOb2RlLCBOb2RlIHwgbnVsbF0pfVxyXG4gKi9cclxuZnVuY3Rpb24gZ2V0UGFyZW50QW5kTmV4dFNpYmxpbmcodk5vZGU6IFZOb2RlSW50ZXJmYWNlKTogW05vZGUsIE5vZGUgfCBudWxsXSB7XHJcbiAgLy8gbm9kZSBhbmNlc3RvciB3aXRoIEVsZW1lbnQsXHJcbiAgY29uc3QgcGFyZW50V2l0aEVsZW1lbnQgPSBnZXRQYXJlbnRFbGVtZW50Tm9kZSh2Tm9kZSk7XHJcbiAgY29uc3Qgc2libGluZ3MgPSBnZXRDaGlsZHJlbldpdGhOb2RlcyhwYXJlbnRXaXRoRWxlbWVudCwgdk5vZGUpO1xyXG4gIGNvbnN0IHByZXZTaWJsaW5nID0gc2libGluZ3Nbc2libGluZ3MuaW5kZXhPZih2Tm9kZSkgLSAxXTtcclxuICBjb25zdCBuZXh0U2libGluZ05vZGUgPSBwcmV2U2libGluZyA/IHByZXZTaWJsaW5nLm5vZGUhLm5leHRTaWJsaW5nIDogbnVsbDtcclxuXHJcbiAgcmV0dXJuIFtwYXJlbnRXaXRoRWxlbWVudC5ub2RlLCBuZXh0U2libGluZ05vZGVdO1xyXG59XHJcblxyXG4vKipcclxuICogcmV0dXJucyB0cnVlIGlmIG5vdCBudWxsaXNoIG9yIGZhbHNlXHJcbiAqIHRoYXQgbWVhbnMgMCBvciBlbXB0eSBzdHJpbmcgYXJlIGFsbG93ZWRcclxuICogQHBhcmFtIHsqfSB2YWxcclxuICovXHJcbmZ1bmN0aW9uIHRydXRoeSh2YWx1ZTogYW55KTogYm9vbGVhbiB7XHJcbiAgcmV0dXJuIHZhbHVlICE9PSBmYWxzZSAmJiB2YWx1ZSAhPT0gbnVsbCAmJiB2YWx1ZSAhPT0gdW5kZWZpbmVkO1xyXG59XHJcblxyXG4vKipcclxuICogZXNjYXBlcyB0aGUgcHJvdmlkZWQgc3RyaW5nIGFnYWluc3QgeHNzIGF0dGFja3MgZXRjXHJcbiAqXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSB0ZXh0XHJcbiAqIEByZXR1cm5zIHtzdHJpbmd9XHJcbiAqL1xyXG5mdW5jdGlvbiBzYW5pdGl6ZSh0ZXh0OiBzdHJpbmcpOiBzdHJpbmcge1xyXG4gIGNvbnN0IGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgZGl2LmlubmVyVGV4dCA9IHRleHQ7XHJcbiAgcmV0dXJuIGRpdi5pbm5lckhUTUw7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBiYXNpY2FsbHkgYEVsZW1lbnQub3V0ZXJIVE1MYCBidXQgYWxzbyBzdXBwb3J0cyBUZXh0IG5vZGUgYW5kIERvY3VtZW50RnJhZ21lbnRcclxuICogQHBhcmFtIGVsZW1lbnQge05vZGV9IC0gZWxlbWVudCB3aGljaCBpdHMgaHRtbCBuZWVkcyB0byBiZSByZXR1cm5lZFxyXG4gKi9cclxuZnVuY3Rpb24gZ2V0T3V0ZXJIdG1sKGVsZW1lbnQ6IE5vZGUpOiBzdHJpbmcge1xyXG4gIGlmIChlbGVtZW50IGluc3RhbmNlb2YgRWxlbWVudCkgcmV0dXJuIGVsZW1lbnQub3V0ZXJIVE1MO1xyXG4gIGlmIChlbGVtZW50IGluc3RhbmNlb2YgVGV4dCkgcmV0dXJuIHNhbml0aXplKGVsZW1lbnQud2hvbGVUZXh0KTtcclxuICBpZiAoZWxlbWVudCBpbnN0YW5jZW9mIERvY3VtZW50RnJhZ21lbnQpXHJcbiAgICByZXR1cm4gQXJyYXkuZnJvbShlbGVtZW50LmNoaWxkTm9kZXMpXHJcbiAgICAgIC5tYXAoKGVsKSA9PiBnZXRPdXRlckh0bWwoZWwpKVxyXG4gICAgICAuam9pbihcIlwiKTtcclxuXHJcbiAgLy8gc2hvdWxkbid0IHJlYWNoIHRoaXMgcG9pbnRcclxuICBjb25zb2xlLndhcm4oXCJnZXRPdXRlckh0bWwgZG9lcyBub3Qgc3VwcG9ydCB0aGlzIHR5cGUgb2YgZWxlbWVudFwiLCBlbGVtZW50KTtcclxuICByZXR1cm4gXCJcIjtcclxufVxyXG5cclxuLyoqXHJcbiAqIGdlbmVyYXRlcyB0aGUgaHRtbCBhcyBhIHN0cmluZyB3aGljaCBjYW4gYmUgdXNlZCBmb3IgZXhhbXBsZSB3aXRoIGBlbGVtZW50LmlubmVySFRNTCgpYFxyXG4gKlxyXG4gKiBAcGFyYW0gdGFnIHtzdHJpbmd8RnVuY3Rpb259IC0gdGFnIGFyZ3VtZW50IG9mIHRoZSBqc3ggY2FsbFxyXG4gKiBAcGFyYW0gcHJvcHMge09iamVjdH0gLSBwcm9wcyBhcmd1bWVudCBvZiBqc3ggY2FsbFxyXG4gKi9cclxuZnVuY3Rpb24gYXNIdG1sU3RyaW5nKFxyXG4gIHRhZzogc3RyaW5nIHwgRnVuY3Rpb24sXHJcbiAgcHJvcHM6IEF0dHJpYnV0ZXMgJiBTcGVjaWFsQXR0cmlidXRlcyxcclxuICBjaGlsZHJlbjogVk5vZGVJbnRlcmZhY2VbXVxyXG4pIHtcclxuICBjb25zdCBhdHRyaWJ1dGVzID0gT2JqZWN0LmVudHJpZXMocHJvcHMpXHJcbiAgICAuZmlsdGVyKChbLCB2YWx1ZV0pID0+IHRydXRoeSh2YWx1ZSkpXHJcbiAgICAubWFwKChba2V5LCB2YWx1ZV0pID0+IHtcclxuICAgICAgLy8gZS5nLiBkaXNhYmxlZDogdHJ1ZSA9PiA8dGFnIGRpc2FibGVkPlxyXG4gICAgICBpZiAodmFsdWUgPT09IHRydWUpIHJldHVybiBrZXk7XHJcblxyXG4gICAgICAvLyBmb3Igc3R5bGUgYXMgb2JqZWN0OlxyXG4gICAgICAvLyAoc3R5bGU6KSB7ZGlzcGxheTogXCJub25lXCIsIHBvc2l0aW9uOiBcImFic29sdXRlXCJ9ID09PiAnZGlzcGxheTogbm9uZTsgcG9zaXRpb246IGFic29sdXRlOydcclxuICAgICAgaWYgKGtleSA9PT0gXCJzdHlsZVwiICYmIHR5cGVvZiB2YWx1ZSA9PT0gXCJvYmplY3RcIilcclxuICAgICAgICB2YWx1ZSA9IE9iamVjdC5lbnRyaWVzKHZhbHVlKVxyXG4gICAgICAgICAgLy8gaWdub3JlIHN0dWZmIGxpa2UgYHtiYWNrZ3JvdW5kOiBhY3RpdmUgJiYgXCJyZWRcIn1gIHdoZW4gYGFjdGl2ZSA9PT0gZmFsc2UgLyBudWxsIC8gdW5kZWZpbmVkYFxyXG4gICAgICAgICAgLmZpbHRlcigoWywgdl0pID0+IHRydXRoeSh2KSlcclxuICAgICAgICAgIC8vIGN1cnJlbnRseSBzdXBwb3J0cyBcImJhY2tncm91bmQtY29sb3JcIiBub3QgXCJiYWNrZ3JvdW5kQ29sb3JcIlxyXG4gICAgICAgICAgLm1hcCgoW2ssIHZdKSA9PiBgJHtrfTogJHt2fWApXHJcbiAgICAgICAgICAuam9pbihcIjsgXCIpO1xyXG5cclxuICAgICAgLy8gKGNsYXNzOikgW1wiYnRuXCIsIFwicmVkXCJdID09PiBcImJ0biByZWRcIlxyXG4gICAgICBpZiAoa2V5ID09PSBcImNsYXNzXCIgJiYgQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHZhbHVlID0gdmFsdWUuam9pbihcIiBcIik7XHJcblxyXG4gICAgICByZXR1cm4gYCR7a2V5fT1cIiR7dmFsdWV9XCJgO1xyXG4gICAgfSlcclxuICAgIC5qb2luKFwiIFwiKTtcclxuXHJcbiAgY29uc3QgY29udGVudCA9IGNoaWxkcmVuLm1hcCgoY2hpbGQpID0+IGNoaWxkLnRvU3RyaW5nKCkpLmpvaW4oXCJcIik7XHJcblxyXG4gIHJldHVybiBgPCR7dGFnfSAke2F0dHJpYnV0ZXN9PiR7Y29udGVudH08LyR7dGFnfT5gO1xyXG59XHJcblxyXG4vKipcclxuICogZ2VuZXJhdGVzIEhUTUwgTm9kZSBlbGVtZW50cyBmcm9tIHRoZSBwcm92aWRlZCBqc3ggaXRlbVxyXG4gKiBAcGFyYW0gdGFnIHtzdHJpbmd8RnVuY3Rpb259IC0gdGFnIGFyZ3VtZW50IG9mIHRoZSBqc3ggY2FsbFxyXG4gKiBAcGFyYW0gcHJvcHMge09iamVjdH0gLSBwcm9wcyBhcmd1bWVudCBvZiBqc3ggY2FsbFxyXG4gKi9cclxuZnVuY3Rpb24gYXNOb2RlPFQgZXh0ZW5kcyBOb2RlPihcclxuICB0YWc6IHN0cmluZyB8IHVuZGVmaW5lZCxcclxuICBwcm9wczogQXR0cmlidXRlcyAmIFNwZWNpYWxBdHRyaWJ1dGVzLFxyXG4gIGNoaWxkcmVuOiBWTm9kZUludGVyZmFjZVtdLFxyXG4gIHN2Z0NvbnRleHQgPSBmYWxzZVxyXG4pOiBFbGVtZW50IHwgRG9jdW1lbnRGcmFnbWVudCB7XHJcbiAgLy8gZnJhZ21lbnRcclxuICBpZiAoIXRhZykge1xyXG4gICAgY29uc3QgZnJhZ21lbnRzID0gY2hpbGRyZW4ubWFwKChpdGVtKSA9PiBpdGVtLmFzTm9kZSgpKTtcclxuXHJcbiAgICBjb25zdCBkb2N1bWVudEZyYWdtZW50ID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO1xyXG5cclxuICAgIGRvY3VtZW50RnJhZ21lbnQuYXBwZW5kKC4uLmZyYWdtZW50cyk7XHJcbiAgICByZXR1cm4gZG9jdW1lbnRGcmFnbWVudDtcclxuICB9XHJcblxyXG4gIGNvbnN0IHsgcmVmLCAuLi5hdHRycyB9ID0gcHJvcHM7XHJcblxyXG4gIC8vIHJlbWVtYmVyIGlmIHRoZSBzdmcgY29udGV4dCB3YXMgc2V0IGZvciB0aGlzIG5vZGUsIGFuZCByZXBsYWNlIGFmdGVyIGdlbmVyYXRpbmcgYWxsIGNoaWxkcmVuXHJcblxyXG4gIC8vIGN1cnJlbnRseSBub3Qgc3VwcG9ydGluZyB0aGUgYGlzYCBvcHRpb24gZm9yIEN1c3RvbWl6ZWQgYnVpbHQtaW4gZWxlbWVudHNcclxuICBjb25zdCBub2RlID0gc3ZnQ29udGV4dFxyXG4gICAgPyBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoXCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiLCB0YWcpXHJcbiAgICA6IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodGFnKTtcclxuXHJcbiAgLy8gY3VycmVudGx5IG9ubHkgc3VwcG9ydGluZyByZWYgb24gaHRtbCBlbGVtZW50cy4gbm90IHRlbXBsYXRlIGZ1bmN0aW9uc1xyXG4gIC8vIHJlZiBpcyBvbmx5IGNhbGxlZCB3aGVuIGVsZW1lbnQgaXMgY3JlYXRlZC4gbm90IHdoZW4gdGhlIHJlZiBwcm9wZXJ0eSBpcyBjaGFuZ2VkXHJcbiAgaWYgKHR5cGVvZiByZWYgPT09IFwiZnVuY3Rpb25cIikge1xyXG4gICAgcmVmc1RvQ2FsbC5wdXNoKCgpID0+IHJlZihub2RlKSk7XHJcbiAgfVxyXG5cclxuICAvLyBhZGQgYXR0cmlidXRlcywgZXZlbnQgbGlzdGVuZXJzIGV0Yy5cclxuICBFbGVtZW50Vk5vZGUuYWRkUHJvcHMobm9kZSwgYXR0cnMpO1xyXG5cclxuICBub2RlLmFwcGVuZChcclxuICAgIC4uLmNoaWxkcmVuXHJcbiAgICAgIC8vLmZsYXQoKVxyXG4gICAgICAubWFwKChjaGlsZCkgPT4gY2hpbGQuYXNOb2RlKCkpXHJcbiAgKTtcclxuXHJcbiAgcmV0dXJuIG5vZGU7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiByZW5kZXJzIHRoZSBIVE1MIGZvciB0aGUgZ2l2ZW4gVi1Ob2RlIGFuZCBhZGRzIHRvIHRoZSBET00gYXQgdGhlIGNvcnJlY3QgcG9zaXRpb25cclxuICogQHBhcmFtIG5ld05vZGUgLSB2Tm9kZSB0byBiZSByZW5kZXJlZCBhcyBIVE1MIE5vZGUgYW5kIGFkZGVkIHRvIERPTVxyXG4gKi9cclxuZnVuY3Rpb24gaW5zZXJ0TmV3SXRlbShuZXdOb2RlOiBWTm9kZUludGVyZmFjZSkge1xyXG4gIGNvbnN0IFtwYXJlbnQsIG5leHRTaWJsaW5nXSA9IGdldFBhcmVudEFuZE5leHRTaWJsaW5nKG5ld05vZGUpO1xyXG4gIHBhcmVudC5pbnNlcnRCZWZvcmUobmV3Tm9kZS5hc05vZGUoKSwgbmV4dFNpYmxpbmcpO1xyXG59XHJcblxyXG4vKipcclxuICogaXRlcmF0ZSBvdmVyIGFsbCB0aGUgY2hpbGRyZW4gb2YgdGhlIHByb3ZpZGVkIG5vZGVzLCBhbmQgZWFjaCBwYWlyd2lzZVxyXG4gKlxyXG4gKiBAcGFyYW0ge1ZOb2RlSW50ZXJmYWNlfSBvbGROb2RlIC0gdi1ub2RlIGZyb20gdGhlIG9sZCByZW5kZXJcclxuICogQHBhcmFtIHtWTm9kZUludGVyZmFjZX0gbmV3Tm9kZS0gdi1ub2RlIGZyb20gdGhlIG5ldyB0cmVlIHdoaWNoIGl0cyBjaGlsZHJlbiBoYXZlIHRvIHJlcGxhY2UgdGhlIGNoaWxkcmVuIG9mIHRoZSBvbGQgbm9kZVxyXG4gKi9cclxuZnVuY3Rpb24gZGlmZkFuZFBhdGNoQ2hpbGRyZW4oXHJcbiAgb2xkTm9kZTogVk5vZGVJbnRlcmZhY2UsXHJcbiAgbmV3Tm9kZTogVk5vZGVJbnRlcmZhY2VcclxuKSB7XHJcbiAgb2xkTm9kZS5jaGlsZHJlbi5mb3JFYWNoKChvbGRDaGlsZCwgaXgpID0+IHtcclxuICAgIGNvbnN0IG5ld0NoaWxkID0gbmV3Tm9kZS5jaGlsZHJlbltpeF07XHJcbiAgICAvLyBjaGlsZCB3YXMgcmVtb3ZlZFxyXG4gICAgaWYgKCFuZXdDaGlsZCkgb2xkQ2hpbGQucmVtb3ZlRnJvbURPTSgpO1xyXG4gICAgLy8gY2hpbGQgaXMgbW9kaWZpZWRcclxuICAgIGVsc2UgaWYgKG5ld0NoaWxkLnR5cGUgPT09IG9sZENoaWxkLnR5cGUpIG9sZENoaWxkLmRpZmZBbmRQYXRjaChuZXdDaGlsZCk7XHJcbiAgICAvLyBjaGlsZCBpcyByZXBsYWNlZFxyXG4gICAgZWxzZSB7XHJcbiAgICAgIG9sZENoaWxkLnJlbW92ZUZyb21ET00oKTtcclxuICAgICAgaW5zZXJ0TmV3SXRlbShuZXdDaGlsZCk7XHJcbiAgICB9XHJcbiAgfSk7XHJcblxyXG4gIC8vIG5ldyBhZGRpdGlvbiBpdGVtc1xyXG4gIGNvbnN0IG5ld0l0ZW1zID0gbmV3Tm9kZS5jaGlsZHJlbi5zbGljZShvbGROb2RlLmNoaWxkcmVuLmxlbmd0aCk7XHJcbiAgaWYgKG5ld0l0ZW1zLmxlbmd0aCkge1xyXG4gICAgY29uc3QgZG9jdW1lbnRGcmFnbWVudCA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcclxuICAgIG5ld0l0ZW1zLmZvckVhY2goKGl0ZW0pID0+IGRvY3VtZW50RnJhZ21lbnQuYXBwZW5kKGl0ZW0uYXNOb2RlKCkpKTtcclxuXHJcbiAgICBjb25zdCBbcGFyZW50LCBuZXh0U2libGluZ10gPSBnZXRQYXJlbnRBbmROZXh0U2libGluZyhuZXdJdGVtc1swXSk7XHJcbiAgICBwYXJlbnQuaW5zZXJ0QmVmb3JlKGRvY3VtZW50RnJhZ21lbnQsIG5leHRTaWJsaW5nKTtcclxuICB9XHJcbn1cclxuXHJcbi8vIGJhc2UgY2xhc3Mgd2hpY2ggd2lsbCBiZSBpbmhlcml0ZWQgZnJvbSBqc3ggYW5kIGZyYWdtZW50cyBmdW5jdGlvbiBub2RlIGdlbmVyYXRpb25cclxuLy8gYW5kIHdpbGwgYmUgdXNlZCB0byBkaXN0aW5ndWlzaCB0aGVtIHdpdGggb3RoZXIgRWxlbWVudHNcclxuY2xhc3MgVk5vZGUge31cclxuXHJcbi8vIEludGVyZmFjZSB3aGljaCB3aWxsIGJlIGltcGxlbWVudGVkIGJ5IGFsbCB0eXBlcyBvZiBub2RlcyBpbiB0aGUgVi1ET00gVHJlZVxyXG5pbnRlcmZhY2UgVk5vZGVJbnRlcmZhY2Uge1xyXG4gIC8vIHRoZSBodG1sIGNvbnRlbnQgYXMgc3RyaW5nLCB3aGljaCBhbGxvd3MgdG8gdXNlIGFzIGBlbC5pbm5lckhUTUwgPSA8ZGl2Pi4uLjwvZGl2PmBcclxuICB0b1N0cmluZygpOiBzdHJpbmc7XHJcbiAgLy8gY3JlYXRlcyBIVE1MIE5vZGVzIChIVE1MRWxlbWVudCwgU1ZHRWxlbWVudCwgRG9jdW1lbnRGcmFnbWVudCBhbmQgVGV4dCBub2RlKSBmb3IgdGhlIFYtVHJlZVxyXG4gIGFzTm9kZSgpOiBOb2RlO1xyXG4gIC8vIHJlZmVyZW5jZSB0byB0aGUgcGFyZW50IFYtTm9kZSBvZiB0aGlzIFYtTm9kZS4gKGkuZS4gdGhpcyBub2RlIHdhcyB0aGUgY2hpbGQgZWxlbWVudCBpbiBqc3gpXHJcbiAgLy8gbnVsbCBpbiBjYXNlIG9mIHRoZSByb290IGVsZW1lbnQgZnJvbSB0aGUgcmVuZGVyIHRyZWVcclxuICBwYXJlbnQ6IFZOb2RlSW50ZXJmYWNlIHwgbnVsbDtcclxuICAvLyBsaXN0IG9mIFYtTm9kZSBjb252ZXJ0ZWQgY2hpbGQgZWxlbWVudCBmcm9tIGpzeCBjb2RlXHJcbiAgY2hpbGRyZW46IEFycmF5PFZOb2RlSW50ZXJmYWNlIHwgbmV2ZXI+O1xyXG4gIC8vIGUuZy4gdGV4dCwgaHRtbCBlbGVtZW50LCBudWxsIGV0Y1xyXG4gIHR5cGU6IHN0cmluZztcclxuICAvLyByZWZlcmVuY2UgdG8gdGhlIGNyZWF0ZWQgSFRNTCBlbGVtZW50IGZvciB0aGlzIFYtTm9kZVxyXG4gIG5vZGU/OiBOb2RlO1xyXG4gIC8vIHJlbW92ZXMgYWxsIEhUTUwgRWxlbWVudHMgd2hpY2ggd2VyZSByZW5kZXJlZCBhcyBwYXJ0IG9mIHRoaXMgVi1Ob2RlIG9yIGl0cyBjaGlsZHJlbiBmcm9tIGpzeCBjb2RlXHJcbiAgcmVtb3ZlRnJvbURPTSgpOiB2b2lkO1xyXG4gIC8vIHVwZGF0ZSB0aGUgRE9NIG5vZGUgd2hpY2ggd2VyZSByZW5kZXJlZCBmb3IgdGhpcyB2LW5vZGUgYW5kIGl0J3MgY2hpbGRyZW5cclxuICAvLyB0byByZWZsZWN0IGFsbCBjaGFuZ2VzIGNvbWluZyBmcm9tIHRoZSBuZXcgVi1Ob2RlXHJcbiAgZGlmZkFuZFBhdGNoKG5ld05vZGU6IFZOb2RlSW50ZXJmYWNlKTogdm9pZDtcclxufVxyXG5cclxuLy8gVi1Ob2RlIHdoaWNoIHdpbGwgYmUgcmVuZGVyZWQgYXMgSFRNTEVsZW1lbnQgb3IgU1ZHRWxlbWVudFxyXG5jbGFzcyBFbGVtZW50Vk5vZGUgZXh0ZW5kcyBWTm9kZSBpbXBsZW1lbnRzIFZOb2RlSW50ZXJmYWNlIHtcclxuICB0eXBlID0gXCJFbGVtZW50XCI7XHJcbiAgdGFnOiBzdHJpbmc7XHJcbiAgcHJvcHM6IEF0dHJpYnV0ZXMgJiBTcGVjaWFsQXR0cmlidXRlcztcclxuICBub2RlOiBFbGVtZW50ID0gbnVsbCBhcyBhbnk7XHJcbiAgY2hpbGRyZW46IFZOb2RlSW50ZXJmYWNlW107XHJcbiAgcGFyZW50OiBWTm9kZUludGVyZmFjZSA9IG51bGwgYXMgYW55O1xyXG4gIHN2Z0NvbnRleHQ6IGJvb2xlYW4gPSBmYWxzZTsgLy8gd2lsbCBiZSBzZXQgdG8gdHJ1ZSB3aGVuIGVsZW1lbnQgaXMgYW4gU1ZHIEVsZW1lbnRcclxuXHJcbiAgY29uc3RydWN0b3Ioe1xyXG4gICAgdGFnLFxyXG4gICAgcHJvcHMsXHJcbiAgICBjaGlsZHJlbixcclxuICB9OiB7XHJcbiAgICB0YWc6IHN0cmluZztcclxuICAgIHByb3BzOiBBdHRyaWJ1dGVzICYgU3BlY2lhbEF0dHJpYnV0ZXM7XHJcbiAgICBjaGlsZHJlbjogSlNYQ2hpbGRbXTtcclxuICB9KSB7XHJcbiAgICBzdXBlcigpO1xyXG4gICAgdGhpcy50YWcgPSB0YWc7XHJcbiAgICB0aGlzLnByb3BzID0gcHJvcHM7XHJcblxyXG4gICAgLy8gY29udmVydCBjaGlsZCBqc3ggY29udGVudCB0byBWTm9kZXNcclxuICAgIHRoaXMuY2hpbGRyZW4gPSBjaGlsZHJlbi5tYXAoKGNoaWxkKSA9PiB7XHJcbiAgICAgIGlmIChBcnJheS5pc0FycmF5KGNoaWxkKSkgcmV0dXJuIG5ldyBGcmFnbWVudFZOb2RlKGNoaWxkKTtcclxuICAgICAgaWYgKGNoaWxkIGluc3RhbmNlb2YgVk5vZGUpIHJldHVybiBjaGlsZCBhcyBWTm9kZUludGVyZmFjZTtcclxuICAgICAgaWYgKGNoaWxkIGluc3RhbmNlb2YgTm9kZSkgcmV0dXJuIG5ldyBMaXZlTm9kZVZOb2RlKGNoaWxkKTtcclxuICAgICAgaWYgKCF0cnV0aHkoY2hpbGQpKSByZXR1cm4gbmV3IE51bGxWTm9kZSgpO1xyXG5cclxuICAgICAgcmV0dXJuIG5ldyBUZXh0Vk5vZGUoY2hpbGQgYXMgc3RyaW5nIHwgbnVtYmVyIHwgdHJ1ZSk7XHJcbiAgICB9KTtcclxuICAgIC8vIHNldCBwYXJlbnQgcHJvcGVydHkgb24gYWxsIGNoaWxkcmVuXHJcbiAgICB0aGlzLmNoaWxkcmVuLmZvckVhY2goKGNoaWxkKSA9PiAoY2hpbGQucGFyZW50ID0gdGhpcykpO1xyXG4gIH1cclxuXHJcbiAgdG9TdHJpbmcoKSB7XHJcbiAgICByZXR1cm4gYXNIdG1sU3RyaW5nKHRoaXMudGFnLCB0aGlzLnByb3BzLCB0aGlzLmNoaWxkcmVuKTtcclxuICB9XHJcblxyXG4gIGFzTm9kZSgpIHtcclxuICAgIC8vIHRyYXZlcnNlIHRoZSBWVHJlZSB0byBjaGVjayBpZiB0aGlzIGVsZW1lbnQgaXMgcmVuZGVyZWQgaW5zaWRlIGFuIHN2ZyBlbGVtZW50XHJcbiAgICBsZXQgc3ZnQ29udGV4dCA9IGZhbHNlO1xyXG4gICAgbGV0IHZOb2RlOiBWTm9kZUludGVyZmFjZSA9IHRoaXM7XHJcbiAgICB3aGlsZSAodk5vZGUucGFyZW50KSB7XHJcbiAgICAgIGlmICh2Tm9kZS50YWcgPT09IFwic3ZnXCIpIHtcclxuICAgICAgICBzdmdDb250ZXh0ID0gdHJ1ZTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgICB2Tm9kZSA9IHZOb2RlLnBhcmVudDtcclxuICAgIH1cclxuXHJcbiAgICAvLyBzdG9yZSB0aGUgc3ZnIGNvbnRleHQgaW5mb3JtYXRpb24gdG8gdGhlIHByb3BlcnR5IHRvIGFsbG93IHVzaW5nIGl0IHdoZW4gdGhlIHYtbm9kZSBpcyBjbG9uZWRcclxuICAgIHRoaXMuc3ZnQ29udGV4dCA9IHN2Z0NvbnRleHQ7XHJcblxyXG4gICAgY29uc3Qgbm9kZSA9IGFzTm9kZShcclxuICAgICAgdGhpcy50YWcsXHJcbiAgICAgIHRoaXMucHJvcHMsXHJcbiAgICAgIHRoaXMuY2hpbGRyZW4sXHJcbiAgICAgIHRoaXMuc3ZnQ29udGV4dFxyXG4gICAgKSBhcyBFbGVtZW50O1xyXG4gICAgdGhpcy5ub2RlID0gbm9kZTtcclxuXHJcbiAgICAvLyBtZW1vcml6ZSBmb3IgbmV4dCBzdWJ0cmVlIHJlLXJlbmRlcnNcclxuICAgIHJlbmRlcmVkVlRyZWVzLnNldChub2RlLCB0aGlzKTtcclxuXHJcbiAgICByZXR1cm4gbm9kZTtcclxuICB9XHJcblxyXG4gIHJlbW92ZUZyb21ET00oKSB7XHJcbiAgICB0aGlzLm5vZGUucGFyZW50RWxlbWVudCEucmVtb3ZlQ2hpbGQodGhpcy5ub2RlKTtcclxuICB9XHJcblxyXG4gIGRpZmZBbmRQYXRjaChuZXdOb2RlOiBFbGVtZW50Vk5vZGUpIHtcclxuICAgIGlmIChuZXdOb2RlLnRhZyA9PT0gdGhpcy50YWcpIHtcclxuICAgICAgbmV3Tm9kZS5ub2RlID0gdGhpcy5ub2RlO1xyXG4gICAgICAvLyB1cGRhdGUgcHJvcHMgYW5kIGF0dHJpYnV0ZXNcclxuICAgICAgRWxlbWVudFZOb2RlLmFkZFByb3BzKG5ld05vZGUubm9kZSwgbmV3Tm9kZS5wcm9wcywgdGhpcy5wcm9wcyk7XHJcblxyXG4gICAgICAvLyBjaGlsZHJlbiA9PiBpdGVyIGFuZCBwYXRjaFxyXG4gICAgICAvLyBvbGQgY2hpbGRyZW4gYmVpbmcgbW9kaWZpZWRcclxuICAgICAgZGlmZkFuZFBhdGNoQ2hpbGRyZW4odGhpcywgbmV3Tm9kZSk7XHJcbiAgICB9XHJcbiAgICAvLyB0YWcgaGFzIGNoYW5nZWRcclxuICAgIGVsc2Uge1xyXG4gICAgICB0aGlzLm5vZGUucmVwbGFjZVdpdGgobmV3Tm9kZS5hc05vZGUoKSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gbWVtb3JpemUgZm9yIG5leHQgc3VidHJlZSByZS1yZW5kZXJzXHJcbiAgICByZW5kZXJlZFZUcmVlcy5zZXQodGhpcy5ub2RlLCBuZXdOb2RlKTtcclxuICB9XHJcblxyXG4gIHN0YXRpYyBmcm9tRXhpc3RpbmdFbGVtZW50Tm9kZShcclxuICAgIHZOb2RlOiBFbGVtZW50Vk5vZGUsXHJcbiAgICBjaGlsZHJlbjogQXJyYXk8Vk5vZGVJbnRlcmZhY2UgfCBWTm9kZUludGVyZmFjZVtdPlxyXG4gICkge1xyXG4gICAgY29uc3QgeyB0YWcsIHByb3BzLCBwYXJlbnQsIG5vZGUsIHN2Z0NvbnRleHQgfSA9IHZOb2RlO1xyXG4gICAgY29uc3QgbmV3Vk5vZGUgPSBuZXcgRWxlbWVudFZOb2RlKHsgdGFnLCBwcm9wcywgY2hpbGRyZW4gfSk7XHJcbiAgICBPYmplY3QuYXNzaWduKG5ld1ZOb2RlLCB7IHBhcmVudCwgbm9kZSwgc3ZnQ29udGV4dCB9KTtcclxuICAgIHJldHVybiBuZXdWTm9kZTtcclxuICB9XHJcblxyXG4gIHN0YXRpYyBhZGRQcm9wcyhcclxuICAgIGVsZW1lbnQ6IEVsZW1lbnQsXHJcbiAgICBuZXdQcm9wczogUmVjb3JkPHN0cmluZywgYW55PixcclxuICAgIG9sZFByb3BzOiBSZWNvcmQ8c3RyaW5nLCBhbnk+ID0ge31cclxuICApIHtcclxuICAgIC8vIGl0ZXJhdGUgb3ZlciBhbGwgbW9kaWZpZWQgbmV3IGFuZCBvbGQgcHJvcGVydGllcyBhbmQgc2V0L3JlbW92ZS91cGRhdGUgdGhlbVxyXG4gICAgQXJyYXkuZnJvbShuZXcgU2V0KFsuLi5PYmplY3Qua2V5cyhuZXdQcm9wcyksIC4uLk9iamVjdC5rZXlzKG9sZFByb3BzKV0pKVxyXG4gICAgICAubWFwKChwcm9wTmFtZSkgPT4gKHtcclxuICAgICAgICBwcm9wTmFtZSxcclxuICAgICAgICBvbGRWYWx1ZTogb2xkUHJvcHNbcHJvcE5hbWVdLFxyXG4gICAgICAgIG5ld1ZhbHVlOiBuZXdQcm9wc1twcm9wTmFtZV0sXHJcbiAgICAgIH0pKVxyXG4gICAgICAuZmlsdGVyKCh7IG5ld1ZhbHVlLCBvbGRWYWx1ZSB9KSA9PiBuZXdWYWx1ZSAhPT0gb2xkVmFsdWUpXHJcbiAgICAgIC5mb3JFYWNoKCh7IHByb3BOYW1lLCBuZXdWYWx1ZSwgb2xkVmFsdWUgfSkgPT4ge1xyXG4gICAgICAgIC8vIGZvciBzdHlsZSBhcyBvYmplY3Q6XHJcbiAgICAgICAgLy8gKHN0eWxlOikge2Rpc3BsYXk6IFwibm9uZVwiLCBwb3NpdGlvbjogXCJhYnNvbHV0ZVwifSA9PT4gJ2Rpc3BsYXk6IG5vbmU7IHBvc2l0aW9uOiBhYnNvbHV0ZTsnXHJcbiAgICAgICAgaWYgKHByb3BOYW1lID09PSBcInN0eWxlXCIgJiYgdHlwZW9mIG5ld1ZhbHVlID09PSBcIm9iamVjdFwiKVxyXG4gICAgICAgICAgbmV3VmFsdWUgPSBPYmplY3QuZW50cmllcyhuZXdWYWx1ZSlcclxuICAgICAgICAgICAgLmZpbHRlcigoWywgdl0pID0+IHRydXRoeSh2KSlcclxuICAgICAgICAgICAgLm1hcCgoW2ssIHZdKSA9PiBgJHtrfTogJHt2fWApXHJcbiAgICAgICAgICAgIC5qb2luKFwiOyBcIik7XHJcblxyXG4gICAgICAgIC8vIChjbGFzczopIFtcImJ0blwiLCBcInJlZFwiXSA9PT4gXCJidG4gcmVkXCJcclxuICAgICAgICBpZiAocHJvcE5hbWUgPT09IFwiY2xhc3NcIiAmJiBBcnJheS5pc0FycmF5KG5ld1ZhbHVlKSlcclxuICAgICAgICAgIG5ld1ZhbHVlID0gbmV3VmFsdWUuam9pbihcIiBcIik7XHJcbiAgICAgICAgLy8gcHJvcHMgc3RhcnRpbmcgd2l0aCBcIm9uLVwiIGFyZSBldmVudCBsaXN0ZW5lcnNcclxuICAgICAgICBpZiAoXHJcbiAgICAgICAgICBwcm9wTmFtZS5zdGFydHNXaXRoKFwib24tXCIpICYmXHJcbiAgICAgICAgICAodHlwZW9mIG5ld1ZhbHVlID09PSBcImZ1bmN0aW9uXCIgfHxcclxuICAgICAgICAgICAgdHlwZW9mIG5ld1ZhbHVlID09PSBcIm9iamVjdFwiIHx8XHJcbiAgICAgICAgICAgIHR5cGVvZiBvbGRWYWx1ZSA9PT0gXCJmdW5jdGlvblwiIHx8XHJcbiAgICAgICAgICAgIHR5cGVvZiBvbGRWYWx1ZSA9PT0gXCJvYmplY3RcIilcclxuICAgICAgICApIHtcclxuICAgICAgICAgIC8vIHJlbW92ZSBsZWFkaW5nIFwib24tXCJcIlxyXG4gICAgICAgICAgY29uc3QgZXZlbnQgPSBwcm9wTmFtZS5yZXBsYWNlKC9eb24tLywgXCJcIik7XHJcblxyXG4gICAgICAgICAgaWYgKHR5cGVvZiBuZXdWYWx1ZSA9PT0gXCJmdW5jdGlvblwiIHx8IHR5cGVvZiBuZXdWYWx1ZSA9PT0gXCJvYmplY3RcIilcclxuICAgICAgICAgICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFxyXG4gICAgICAgICAgICAgIGV2ZW50LFxyXG4gICAgICAgICAgICAgIG5ld1ZhbHVlIGFzIEV2ZW50TGlzdGVuZXJPckV2ZW50TGlzdGVuZXJPYmplY3RcclxuICAgICAgICAgICAgKTtcclxuXHJcbiAgICAgICAgICBpZiAodHlwZW9mIG9sZFZhbHVlID09PSBcImZ1bmN0aW9uXCIgfHwgdHlwZW9mIG9sZFZhbHVlID09PSBcIm9iamVjdFwiKVxyXG4gICAgICAgICAgICBlbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXHJcbiAgICAgICAgICAgICAgZXZlbnQsXHJcbiAgICAgICAgICAgICAgb2xkVmFsdWUgYXMgRXZlbnRMaXN0ZW5lck9yRXZlbnRMaXN0ZW5lck9iamVjdFxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBib29sZWFuIGF0dHJpYnV0ZSBzZXQgd2l0aG91dCB2YWx1ZVxyXG4gICAgICAgIGVsc2UgaWYgKG5ld1ZhbHVlID09PSB0cnVlKSBlbGVtZW50LnNldEF0dHJpYnV0ZShwcm9wTmFtZSwgXCJcIik7XHJcbiAgICAgICAgLy8gcmVtb3ZlIG9sZCBhdHRyaWJ1dGVzIHdoaWNoIGFyZSBmYWxzZSBub3dcclxuICAgICAgICBlbHNlIGlmICghdHJ1dGh5KG5ld1ZhbHVlKSkgZWxlbWVudC5yZW1vdmVBdHRyaWJ1dGUocHJvcE5hbWUpO1xyXG4gICAgICAgIC8vIHVwZGF0ZSB0byBuZXcgdmFsdWUgYXMgc3RyaW5nXHJcbiAgICAgICAgZWxzZSBpZiAodHlwZW9mIG5ld1ZhbHVlID09PSBcInN0cmluZ1wiIHx8IHR5cGVvZiBuZXdWYWx1ZSA9PT0gXCJudW1iZXJcIilcclxuICAgICAgICAgIGVsZW1lbnQuc2V0QXR0cmlidXRlKHByb3BOYW1lLCBTdHJpbmcobmV3VmFsdWUpKTtcclxuICAgICAgICAvLyBrZXkgaGFzIHRoZSBmb3JtIG9mIFwib24tY2hhbmdlXCIuIHZhbHVlIGlzIHRoZSBjYWxsYmFjayBmdW5jdGlvbiBvciBhbiBvYmplY3QgaW1wbGVtZW50aW5nIHtFdmVudExpc3RlbmVyfSBpbnRlcmZhY2VcclxuICAgICAgICAvLyBAdHMtaWdub3JlIC0gcHJvdmlkaW5nIHRoZSB2YWx1ZSBhcyBwcm9wZXJ0eSB0byBodG1sIGVsZW1lbnRcclxuICAgICAgICBlbHNlIGVsZW1lbnRbcHJvcE5hbWVdID0gbmV3VmFsdWU7IC8vIEBUT0RPOiByZW1vdmUgb2xkIG9iaiB3aGVuIG5ldyBpcyBudWxsOjogbmV3IG51bGwgLT4gb2xkOiBzdHI/IC0+IHJlbW92ZUF0dCwgZXZlbnQ/IDogcmVtb3ZlRXYsIG9iaj86IFtwcm9wXSA9IHVuZGVmXHJcbiAgICAgIH0pO1xyXG4gIH1cclxufVxyXG5cclxuLy8gVi1Ob2RlIGZvciB0aGUgRnJhZ21lbnQgZWxlbWVudCBpbiBqc3ggKGA8PjwvPmApIG9yIHdoZW4gYW4gYXJyYXkgaXMgcGxhY2VkIGRpcmVjdGx5IGluIGpzeCBjaGlsZHJlbiAoZS5nLiBgPGVsZW0+e1tsaXN0XX08L2VsZW0+YClcclxuY2xhc3MgRnJhZ21lbnRWTm9kZSBleHRlbmRzIFZOb2RlIGltcGxlbWVudHMgVk5vZGVJbnRlcmZhY2Uge1xyXG4gIHR5cGUgPSBcIkZyYWdtZW50XCI7XHJcbiAgY2hpbGRyZW46IFZOb2RlSW50ZXJmYWNlW107XHJcbiAgcGFyZW50OiBWTm9kZUludGVyZmFjZSA9IG51bGwgYXMgYW55O1xyXG5cclxuICBjb25zdHJ1Y3RvcihjaGlsZHJlbjogSlNYQ2hpbGRbXSkge1xyXG4gICAgc3VwZXIoKTtcclxuXHJcbiAgICB0aGlzLmNoaWxkcmVuID0gY2hpbGRyZW4ubWFwKChjaGlsZCkgPT4ge1xyXG4gICAgICBpZiAoQXJyYXkuaXNBcnJheShjaGlsZCkpIHJldHVybiBuZXcgRnJhZ21lbnRWTm9kZShjaGlsZCk7XHJcbiAgICAgIGlmIChjaGlsZCBpbnN0YW5jZW9mIFZOb2RlKSByZXR1cm4gY2hpbGQgYXMgVk5vZGVJbnRlcmZhY2U7XHJcbiAgICAgIGlmIChjaGlsZCBpbnN0YW5jZW9mIE5vZGUpIHJldHVybiBuZXcgTGl2ZU5vZGVWTm9kZShjaGlsZCk7XHJcbiAgICAgIGlmICghdHJ1dGh5KGNoaWxkKSkgcmV0dXJuIG5ldyBOdWxsVk5vZGUoKTtcclxuICAgICAgcmV0dXJuIG5ldyBUZXh0Vk5vZGUoY2hpbGQgYXMgc3RyaW5nIHwgbnVtYmVyIHwgdHJ1ZSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICB0aGlzLmNoaWxkcmVuLmZvckVhY2goKGNoaWxkKSA9PiAoY2hpbGQucGFyZW50ID0gdGhpcykpO1xyXG4gIH1cclxuXHJcbiAgYXNOb2RlKCkge1xyXG4gICAgY29uc3Qgbm9kZSA9IGFzTm9kZSh1bmRlZmluZWQsIHt9LCB0aGlzLmNoaWxkcmVuKSBhcyBEb2N1bWVudEZyYWdtZW50O1xyXG5cclxuICAgIHJldHVybiBub2RlO1xyXG4gIH1cclxuXHJcbiAgdG9TdHJpbmcoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5jaGlsZHJlbi5tYXAoKGNoaWxkKSA9PiBjaGlsZC50b1N0cmluZygpKS5qb2luKFwiXCIpO1xyXG4gIH1cclxuXHJcbiAgZGlmZkFuZFBhdGNoKG5ld1ZOb2RlOiBGcmFnbWVudFZOb2RlKSB7XHJcbiAgICByZXR1cm4gZGlmZkFuZFBhdGNoQ2hpbGRyZW4odGhpcywgbmV3Vk5vZGUpO1xyXG4gIH1cclxuXHJcbiAgcmVtb3ZlRnJvbURPTSgpIHtcclxuICAgIHRoaXMuY2hpbGRyZW4uZm9yRWFjaCgoY2hpbGQpID0+IGNoaWxkLnJlbW92ZUZyb21ET00oKSk7XHJcbiAgfVxyXG59XHJcblxyXG4vLyBWLU5vZGUgZm9yIGl0ZW1zIHdoaWNoIGJlIHJlbmRlcmVkIGFzIHRleHQgKHN0cmluZywgbnVtYmVyLC4uIClcclxuY2xhc3MgVGV4dFZOb2RlIGV4dGVuZHMgVk5vZGUgaW1wbGVtZW50cyBWTm9kZUludGVyZmFjZSB7XHJcbiAgdHlwZSA9IFwiVGV4dE5vZGVcIjtcclxuICBjaGlsZHJlbiA9IFtdO1xyXG4gIG5vZGU6IFRleHQgPSBudWxsIGFzIGFueTtcclxuICBwcm9wczogeyBjb250ZW50OiBhbnkgfTtcclxuICBwYXJlbnQ6IFZOb2RlSW50ZXJmYWNlID0gbnVsbCBhcyBhbnk7XHJcblxyXG4gIC8qKlxyXG4gICAqXHJcbiAgICovXHJcbiAgY29uc3RydWN0b3IoY29udGVudDogc3RyaW5nIHwgbnVtYmVyIHwgYm9vbGVhbikge1xyXG4gICAgc3VwZXIoKTtcclxuICAgIHRoaXMucHJvcHMgPSB7IGNvbnRlbnQgfTsgLy9AVE9ETzpcclxuICB9XHJcblxyXG4gIGFzTm9kZSgpIHtcclxuICAgIGNvbnN0IHRleHROb2RlID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUodGhpcy5wcm9wcy5jb250ZW50KTtcclxuICAgIHRoaXMubm9kZSA9IHRleHROb2RlO1xyXG4gICAgcmV0dXJuIHRleHROb2RlO1xyXG4gIH1cclxuXHJcbiAgdG9TdHJpbmcoKSB7XHJcbiAgICByZXR1cm4gc2FuaXRpemUodGhpcy5wcm9wcy5jb250ZW50KTtcclxuICB9XHJcblxyXG4gIGRpZmZBbmRQYXRjaChuZXdOb2RlOiBUZXh0Vk5vZGUpIHtcclxuICAgIHRoaXMubm9kZS5ub2RlVmFsdWUgPSBuZXdOb2RlLnByb3BzLmNvbnRlbnQ7XHJcbiAgICBuZXdOb2RlLm5vZGUgPSB0aGlzLm5vZGU7XHJcbiAgfVxyXG5cclxuICByZW1vdmVGcm9tRE9NKCkge1xyXG4gICAgdGhpcy5ub2RlLnBhcmVudEVsZW1lbnQhLnJlbW92ZUNoaWxkKHRoaXMubm9kZSk7XHJcbiAgfVxyXG59XHJcblxyXG4vLyBWLU5vZGUgZm9yIGBudWxsYCwgYGZhbHNlYCBvciBgdW5kZWZpbmVkYCBpbiBqc3ggZWxlbWVudHNcclxuY2xhc3MgTnVsbFZOb2RlIGV4dGVuZHMgVk5vZGUgaW1wbGVtZW50cyBWTm9kZUludGVyZmFjZSB7XHJcbiAgdHlwZSA9IFwiTnVsbFwiO1xyXG4gIGNoaWxkcmVuID0gW107XHJcbiAgcGFyZW50OiBWTm9kZUludGVyZmFjZSA9IG51bGwgYXMgYW55O1xyXG4gIC8qKlxyXG4gICAqXHJcbiAgICovXHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICBzdXBlcigpO1xyXG4gIH1cclxuXHJcbiAgYXNOb2RlKCkge1xyXG4gICAgLy9yZXR1cm4gbnVsbDsgLy8gcmV0dXJuIGVtcHR5IGZyYWdtZW50P1xyXG4gICAgcmV0dXJuIGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcclxuICB9XHJcblxyXG4gIGRpZmZBbmRQYXRjaChuZXdOb2RlMjogTnVsbFZOb2RlKSB7XHJcbiAgICByZXR1cm47XHJcbiAgfVxyXG5cclxuICByZW1vdmVGcm9tRE9NKCkge1xyXG4gICAgcmV0dXJuO1xyXG4gIH1cclxuXHJcbiAgdG9TdHJpbmcoKSB7XHJcbiAgICByZXR1cm4gXCJcIjtcclxuICB9XHJcbn1cclxuXHJcbi8vIFYtTm9kZSB3aGVuIGEgbGl2ZSBIVE1MRWxlbWVudCB3YXMgcmVmZXJuY2VkIGluIGpzeCAoZS5nLiBgPGRpdj57ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjb21wXCIpfTwvZGl2PmApXHJcbmNsYXNzIExpdmVOb2RlVk5vZGUgZXh0ZW5kcyBWTm9kZSBpbXBsZW1lbnRzIFZOb2RlSW50ZXJmYWNlIHtcclxuICB0eXBlID0gXCJOb2RlXCI7XHJcbiAgY2hpbGRyZW4gPSBbXSBhcyBWTm9kZUludGVyZmFjZVtdO1xyXG4gIHBhcmVudDogVk5vZGVJbnRlcmZhY2UgPSBudWxsIGFzIGFueTtcclxuICBub2RlOiBOb2RlO1xyXG5cclxuICAvKipcclxuICAgKlxyXG4gICAqL1xyXG4gIGNvbnN0cnVjdG9yKG5vZGU6IE5vZGUpIHtcclxuICAgIHN1cGVyKCk7XHJcbiAgICB0aGlzLm5vZGUgPSBub2RlO1xyXG4gIH1cclxuXHJcbiAgYXNOb2RlKCkge1xyXG4gICAgcmV0dXJuIHRoaXMubm9kZTtcclxuICB9XHJcblxyXG4gIGRpZmZBbmRQYXRjaChuZXdOb2RlOiBMaXZlTm9kZVZOb2RlKSB7XHJcbiAgICBpZiAobmV3Tm9kZS5ub2RlICE9PSB0aGlzLm5vZGUpIHtcclxuICAgICAgKHRoaXMubm9kZSBhcyBDaGlsZE5vZGUpLnJlcGxhY2VXaXRoKG5ld05vZGUubm9kZSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICByZW1vdmVGcm9tRE9NKCkge1xyXG4gICAgdGhpcy5ub2RlLnBhcmVudEVsZW1lbnQhLnJlbW92ZUNoaWxkKHRoaXMubm9kZSk7XHJcbiAgfVxyXG5cclxuICB0b1N0cmluZygpIHtcclxuICAgIHJldHVybiBnZXRPdXRlckh0bWwodGhpcy5ub2RlKTtcclxuICB9XHJcbn1cclxuXHJcbi8vIHdyYXBwZXIgVi1Ob2RlIHdoaWNoIHJlZmVyZW5jZXMgdGhlIEhUTUwgTm9kZSB3aGljaCBpdHNlbGYgaXMgbm90IHJlbmRlcmVkIGJ5IGpzeCwgYnV0IGl0cyBjb250ZW50LlxyXG5jbGFzcyBSb290Vk5vZGUgZXh0ZW5kcyBWTm9kZSBpbXBsZW1lbnRzIFZOb2RlSW50ZXJmYWNlIHtcclxuICB0eXBlID0gXCJSb290XCI7XHJcbiAgcGFyZW50ID0gbnVsbDtcclxuICBub2RlOiBFbGVtZW50O1xyXG4gIGNoaWxkcmVuOiBWTm9kZUludGVyZmFjZVtdO1xyXG4gIC8qKlxyXG4gICAqXHJcbiAgICovXHJcbiAgY29uc3RydWN0b3IoY29udGVudDogVk5vZGVJbnRlcmZhY2UsIGRvbU5vZGU6IEVsZW1lbnQpIHtcclxuICAgIHN1cGVyKCk7XHJcbiAgICBjb250ZW50LnBhcmVudCA9IHRoaXM7XHJcbiAgICB0aGlzLmNoaWxkcmVuID0gW2NvbnRlbnRdO1xyXG4gICAgdGhpcy5ub2RlID0gZG9tTm9kZTtcclxuICB9XHJcblxyXG4gIGFzTm9kZSgpIHtcclxuICAgIHJldHVybiB0aGlzLmNoaWxkcmVuWzBdLmFzTm9kZSgpO1xyXG4gIH1cclxuICB0b1N0cmluZygpIHtcclxuICAgIHJldHVybiB0aGlzLmNoaWxkcmVuWzBdLnRvU3RyaW5nKCk7XHJcbiAgfVxyXG5cclxuICBkaWZmQW5kUGF0Y2gobmV3Vk5vZGU6IFZOb2RlSW50ZXJmYWNlKSB7XHJcbiAgICBkaWZmQW5kUGF0Y2hDaGlsZHJlbih0aGlzLCBuZXdWTm9kZSk7XHJcbiAgfVxyXG5cclxuICByZW1vdmVGcm9tRE9NKCkge1xyXG4gICAgdGhpcy5ub2RlLnJlbW92ZSgpO1xyXG4gIH1cclxufVxyXG5cclxuLy8gZ2VuZXJhdGUgdGhlIFYtTm9kZXMgYW5kIFYtVHJlZSBiYXNlZCBvbiB0aGUgb2JqZWN0cyBwYXJzZWQgYnkgdGhlIGpzeCBiYWJlbCBwbHVnaW5cclxuZnVuY3Rpb24gYXNWTm9kZShcclxuICB0YWc6IHN0cmluZyB8IEZ1bmN0aW9uIHwgdW5kZWZpbmVkLFxyXG4gIHByb3BzOiBKc3hQcm9wc1xyXG4pOiBWTm9kZUludGVyZmFjZSB7XHJcbiAgaWYgKHR5cGVvZiB0YWcgPT09IFwiZnVuY3Rpb25cIikge1xyXG4gICAgbGV0IHJlc3VsdCA9IHRhZyhwcm9wcyk7XHJcbiAgICBpZiAocmVzdWx0IGluc3RhbmNlb2YgVk5vZGUpIHJldHVybiByZXN1bHQgYXMgVk5vZGVJbnRlcmZhY2U7XHJcbiAgICBpZiAocmVzdWx0IGluc3RhbmNlb2YgTm9kZSkgcmV0dXJuIG5ldyBMaXZlTm9kZVZOb2RlKHJlc3VsdCk7XHJcbiAgICAvLyBudWxsIGpzeCBub2RlXHJcbiAgICBpZiAoIXRydXRoeShyZXN1bHQpKSByZXR1cm4gbmV3IE51bGxWTm9kZSgpO1xyXG5cclxuICAgIHJldHVybiBuZXcgVGV4dFZOb2RlKHJlc3VsdCk7XHJcbiAgfVxyXG5cclxuICBjb25zdCB7IGNoaWxkcmVuLCAuLi5hdHRyIH0gPSBwcm9wcztcclxuXHJcbiAgcmV0dXJuIHRhZ1xyXG4gICAgPyBuZXcgRWxlbWVudFZOb2RlKHsgdGFnLCBwcm9wczogYXR0ciwgY2hpbGRyZW4gfSlcclxuICAgIDogbmV3IEZyYWdtZW50Vk5vZGUoY2hpbGRyZW4pO1xyXG59XHJcblxyXG4vKipcclxuICogY29udmVydHMgcHJhZ21hIG9iamVjdCB0byBodG1sIHN0cmluZ1xyXG4gKiBqc3hzIGlzIGFsd2F5cyBjYWxsZWQgd2hlbiBlbGVtZW50IGhhcyBtb3JlIHRoYW4gb25lIGNoaWxkXHJcbiAqXHJcbiAqIEBwYXJhbSB7c3RyaW5nIHwgRnVuY3Rpb259IHRhZyAtIHRhZyBuYW1lIG9yIHRhZyBjbGFzc1xyXG4gKiBAcGFyYW0ge09iamVjdCB8IG51bGx9IHByb3BzIC0gcHJvcHMgZm9yIHRoZSB0YWdcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBqc3hzKHRhZzogc3RyaW5nIHwgRnVuY3Rpb24sIHByb3BzOiBKc3hQcm9wcyk6IFZOb2RlSW50ZXJmYWNlIHtcclxuICByZXR1cm4gYXNWTm9kZSh0YWcsIHByb3BzKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIGNvbnZlcnRzIHRoZSBmcmFnbWVudHMgb2JqZWN0IHRvIG5vZGVzXHJcbiAqXHJcbiAqIEBwYXJhbSB7T2JqZWN0fSBwcm9wc1xyXG4gKiBAcGFyYW0ge0FycmF5fSBwcm9wcy5jaGlsZHJlbiAtIGNoaWxkIGVsZW1lbnRzIGluIHRoZSBmcmFnbWVudFxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIEZyYWdtZW50KHByb3BzOiBKc3hQcm9wcykge1xyXG4gIHJldHVybiBhc1ZOb2RlKHVuZGVmaW5lZCwgcHJvcHMpO1xyXG59XHJcblxyXG4vLyBqc3ggaXMgY2FsbGVkIHdoZW4gdGhlIGVsZW1lbnQgaGFzIG9uZSBvciB6ZXJvIGNoaWxkcmVuXHJcbmV4cG9ydCBmdW5jdGlvbiBqc3goXHJcbiAgdGFnOiBzdHJpbmcgfCBGdW5jdGlvbixcclxuICBwcm9wczogQXR0cmlidXRlcyAmIFNwZWNpYWxBdHRyaWJ1dGVzICYgeyBjaGlsZHJlbj86IEpTWENoaWxkIH1cclxuKTogVk5vZGVJbnRlcmZhY2Uge1xyXG4gIC8vIEB0cy1pZ25vcmUgLSB3cmFwcGluZyB0aGUgY2hpbGRyZW4gYXMgYXJyYXkgdG8gcmUtdXNlIGpzeHMgbWV0aG9kXHJcbiAgcHJvcHMuY2hpbGRyZW4gPSBwcm9wcy5oYXNPd25Qcm9wZXJ0eShcImNoaWxkcmVuXCIpID8gW3Byb3BzLmNoaWxkcmVuXSA6IFtdO1xyXG5cclxuICByZXR1cm4ganN4cyh0YWcsIHByb3BzIGFzIEpzeFByb3BzKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIHJlbmRlciB0aGUgZ2l2ZW4gbWFya3VwIGludG8gdGhlIGdpdmVuIEhUTUwgbm9kZVxyXG4gKlxyXG4gKiBAcGFyYW0ge3N0cmluZ3xIVE1MRWxlbWVudHxKU1h9IG1hcmt1cCAtIGh0bWwgYXMgc3RyaW5nLCBodG1sIGVsZW1lbnQgb3IganN4IHRlbXBsYXRlXHJcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGRvbU5vZGUgLSBjb250YWluZXIgZm9yIHRoZSB0ZW1wbGF0ZSB0byBiZSByZW5kZXJlZCBpbnRvXHJcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW2FwcGVuZD1mYWxzZV0gLSBzaG91bGQgdGhlIHByb3ZpZGVkIG1hcmt1cCBiZSBhcHBlbmRlZCB0byB0aGUgZXhpc3RpbmcgbWFya3VwLCBvciBkZWZhdWx0IHJlcGxhY2UgaXRcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiByZW5kZXIoXHJcbiAgbWFya3VwOlxyXG4gICAgfCBzdHJpbmdcclxuICAgIHwgbnVtYmVyXHJcbiAgICB8IG51bGxcclxuICAgIHwgYm9vbGVhblxyXG4gICAgfCB1bmRlZmluZWRcclxuICAgIHwgSFRNTEVsZW1lbnRcclxuICAgIHwgVk5vZGVJbnRlcmZhY2UsIC8vIEBUT0RPOiBzcGVjaWZpYyBzdXBwb3J0IGZvciBUZW1wbGF0ZT8gKC5jb250ZW50LmNsb25lKVxyXG4gIGRvbU5vZGU6IEhUTUxFbGVtZW50LFxyXG4gIGFwcGVuZDogYm9vbGVhbiA9IGZhbHNlXHJcbikge1xyXG4gIEFycmF5LmZyb20oZG9jdW1lbnQuYm9keS5xdWVyeVNlbGVjdG9yQWxsKFwiKlwiKSkuZm9yRWFjaChcclxuICAgIChlbCkgPT4gKGVsLnN0eWxlLmJhY2tncm91bmQgPSBcIiNjY2ZmY2NcIilcclxuICApO1xyXG5cclxuICAvLyB0aGUgY29udGVudCBvZiB0aGUgZ2l2ZW4gRE9NIE5vZGUgd2FzIGFscmVhZHkgcmVuZGVyZWQgYnkganN4LXJ1bnRpbWUsIGFuZCBpdCBvbmx5IG5lZWRzIHRvIGJlIHVwZGF0ZWRcclxuICBjb25zdCBpc1JlUmVuZGVyID0gcmVuZGVyZWRWVHJlZXMuaGFzKGRvbU5vZGUpO1xyXG5cclxuICBpZiAoXHJcbiAgICB0eXBlb2YgbWFya3VwID09PSBcInN0cmluZ1wiIHx8XHJcbiAgICB0eXBlb2YgbWFya3VwID09PSBcIm51bWJlclwiIHx8XHJcbiAgICBtYXJrdXAgPT09IHRydWVcclxuICApIHtcclxuICAgIG1hcmt1cCA9IG5ldyBUZXh0Vk5vZGUobWFya3VwKTtcclxuICB9IGVsc2UgaWYgKG1hcmt1cCBpbnN0YW5jZW9mIE5vZGUpIHtcclxuICAgIG1hcmt1cCA9IG5ldyBMaXZlTm9kZVZOb2RlKG1hcmt1cCk7XHJcbiAgfSBlbHNlIGlmIChtYXJrdXAgPT09IHVuZGVmaW5lZCB8fCBtYXJrdXAgPT09IG51bGwgfHwgbWFya3VwID09PSBmYWxzZSkge1xyXG4gICAgbWFya3VwID0gbmV3IE51bGxWTm9kZSgpO1xyXG4gIH1cclxuXHJcbiAgaWYgKG1hcmt1cCBpbnN0YW5jZW9mIFZOb2RlKSB7XHJcbiAgICBsZXQgdlRyZWU7XHJcblxyXG4gICAgaWYgKCFhcHBlbmQgJiYgIWlzUmVSZW5kZXIpIGRvbU5vZGUuaW5uZXJIVE1MID0gXCJcIjtcclxuXHJcbiAgICBpZiAoaXNSZVJlbmRlcikge1xyXG4gICAgICBjb25zdCBvbGRWVHJlZSA9IHJlbmRlcmVkVlRyZWVzLmdldChkb21Ob2RlKSE7XHJcblxyXG4gICAgICAvLyB3YXMgcHJldmlvdXNseSByZW5kZXJlZCBhcyBhIHN1YnRyZWUgZnJvbSBhbm90aGVyIHJlbmRlclxyXG4gICAgICBpZiAob2xkVlRyZWUudHlwZSA9PT0gXCJFbGVtZW50XCIpIHtcclxuICAgICAgICB2VHJlZSA9IEVsZW1lbnRWTm9kZS5mcm9tRXhpc3RpbmdFbGVtZW50Tm9kZShvbGRWVHJlZSBhcyBFbGVtZW50Vk5vZGUsIFtcclxuICAgICAgICAgIG1hcmt1cCxcclxuICAgICAgICBdKTtcclxuICAgICAgICAob2xkVlRyZWUgYXMgRWxlbWVudFZOb2RlKS5kaWZmQW5kUGF0Y2godlRyZWUpO1xyXG4gICAgICAgIC8vIHVwZGF0ZSB0aGUgY2hpbGRyZW4gcHJvcGVydHkgaW4gdGhlIG1lbW9yeSByZWZlcmVuY2UgZnJvbSB0aGUgcHJldmlvdXMgcmVuZGVyLFxyXG4gICAgICAgIC8vIGF0dHJpYnV0ZXMsIGV0YyB3aWxsIHN0YXkgdGhlIHNhbWVcclxuICAgICAgICBvbGRWVHJlZS5jaGlsZHJlbiA9IHZUcmVlLmNoaWxkcmVuO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHZUcmVlID0gbmV3IFJvb3RWTm9kZShtYXJrdXAsIGRvbU5vZGUpO1xyXG4gICAgICAgIC8vIGRpZmYgYW5kIHBhdGNoIERPTSBiYXNlZCBvbiB0aGUgbGFzdCByZW5kZXJcclxuICAgICAgICAob2xkVlRyZWUgYXMgUm9vdFZOb2RlKS5kaWZmQW5kUGF0Y2godlRyZWUpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICAvLyBmaXJzdCB0aW1lIHJlbmRlclxyXG4gICAgZWxzZSB7XHJcbiAgICAgIHZUcmVlID0gbmV3IFJvb3RWTm9kZShtYXJrdXAsIGRvbU5vZGUpO1xyXG4gICAgICBkb21Ob2RlLmFwcGVuZCh2VHJlZS5hc05vZGUoKSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gbWVtb3JpemUgdGhlIFYtVHJlZSB3aGljaCByZW5kZXJlZCB0aGUgY3VycmVudCBET00sIHRvIHVzZSBpdCBpbiBmdXR1cmUgcmUtcmVuZGVyc1xyXG4gICAgcmVuZGVyZWRWVHJlZXMuc2V0KGRvbU5vZGUsIHZUcmVlKTtcclxuXHJcbiAgICAvLyBjYWxsIGFsbCByZWYgY2FsbGJhY2tzIGZvdW5kIGR1cmluZyBjcmVhdGlvbiBvZiBuZXcgbm9kZXMgZHVyaW5nIHJlbmRlclxyXG4gICAgd2hpbGUgKHJlZnNUb0NhbGwubGVuZ3RoKSB7XHJcbiAgICAgIC8vIHJlbW92ZSBmaXJzdCBmcm9tIGxpc3QsIGFuZCBpbnZva2UgaXRcclxuICAgICAgcmVmc1RvQ2FsbC5zcGxpY2UoMCwgMSlbMF0oKTtcclxuICAgIH1cclxuICB9IGVsc2Uge1xyXG4gICAgdGhyb3cgbmV3IEVycm9yKFwicmVuZGVyIG1ldGhvZCBjYWxsZWQgd2l0aCB3cm9uZyBhcmd1bWVudChzKVwiKTtcclxuICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiB0aGUgcHJvdmlkZWQgc3RyaW5nIHdpbGwgYmUgcmVuZGVyZWQgYXMgbWFya3VwIGFuZCBub3QgZXNjYXBlZCAvIHNhbml0aXplZC5cclxuICogVXNlIHRoaXMgd2l0aCBjYXV0aW9uIGJlY2F1c2UgdGhlb3JldGljYWxseSBpdCBhbGxvd3MgYnJva2VuIGh0bWwgb3IgZXZlbiB4c3MgYXR0YWNrc1xyXG4gKlxyXG4gKlxyXG4gKiBAZXhwb3J0XHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBjb250ZW50IC0gaHRtbCBhcyBzdHJpbmcgd2hpY2ggbmVlZHMgdG8gYmUgcmVuZGVyZWRcclxuICogQHJldHVybnMge1ZOb2RlSW50ZXJmYWNlfVxyXG4gKiBAZXhhbXBsZVxyXG4gKiBgPGFydGljbGU+eyByYXdIdG1sKHJpY2hUZXh0KSB9PC9hcnRpY2xlPmBcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiByYXdIdG1sKGNvbnRlbnQ6IHN0cmluZyk6IFZOb2RlSW50ZXJmYWNlIHtcclxuICByZXR1cm4gbmV3IChjbGFzcyBSYXdIdG1sIGV4dGVuZHMgVk5vZGUgaW1wbGVtZW50cyBWTm9kZUludGVyZmFjZSB7XHJcbiAgICBwYXJlbnQ6IFZOb2RlSW50ZXJmYWNlID0gbnVsbCBhcyBhbnk7XHJcbiAgICBjaGlsZHJlbiA9IFtdO1xyXG4gICAgdHlwZSA9IFwiUmF3SHRtbFwiO1xyXG4gICAgY2hpbGROb2RlczogQ2hpbGROb2RlW10gPSBudWxsIGFzIGFueTtcclxuICAgIGNvbnRlbnQ6IHN0cmluZztcclxuICAgIG5vZGU/OiBOb2RlO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKGNvbnRlbnQ6IHN0cmluZykge1xyXG4gICAgICBzdXBlcigpO1xyXG4gICAgICB0aGlzLmNvbnRlbnQgPSBjb250ZW50O1xyXG4gICAgfVxyXG5cclxuICAgIHJlbW92ZUZyb21ET00oKSB7XHJcbiAgICAgIHRoaXMuY2hpbGROb2Rlcy5mb3JFYWNoKChub2RlKSA9PiBub2RlLnBhcmVudEVsZW1lbnQhLnJlbW92ZUNoaWxkKG5vZGUpKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBzaW1wbGUgcmUtcmVuZGVycyB3aXRob3V0IGRpZmZpbmcgYW5kIHBhdGNoaW5nIGluIGNhc2Ugb2YgbW9kaWZpZWQgY29udGVudFxyXG4gICAgZGlmZkFuZFBhdGNoKG5ld05vZGU6IFJhd0h0bWwpIHtcclxuICAgICAgaWYgKChuZXdOb2RlLmNvbnRlbnQgPSB0aGlzLmNvbnRlbnQpKSB7XHJcbiAgICAgICAgbmV3Tm9kZS5ub2RlID0gdGhpcy5ub2RlO1xyXG4gICAgICAgIG5ld05vZGUuY2hpbGROb2RlcyA9IHRoaXMuY2hpbGROb2RlcztcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuICAgICAgdGhpcy5yZW1vdmVGcm9tRE9NKCk7XHJcbiAgICAgIGluc2VydE5ld0l0ZW0obmV3Tm9kZSk7XHJcbiAgICB9XHJcblxyXG4gICAgdG9TdHJpbmcoKSB7XHJcbiAgICAgIHJldHVybiBjb250ZW50O1xyXG4gICAgfVxyXG5cclxuICAgIGFzTm9kZSgpIHtcclxuICAgICAgY29uc3QgdGVtcGxhdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGVtcGxhdGVcIik7XHJcbiAgICAgIHRlbXBsYXRlLmlubmVySFRNTCA9IHRoaXMuY29udGVudDtcclxuICAgICAgY29uc3QgZG9jdW1lbnRGcmFnbWVudCA9IHRlbXBsYXRlLmNvbnRlbnQ7XHJcbiAgICAgIHRoaXMuY2hpbGROb2RlcyA9IEFycmF5LmZyb20oZG9jdW1lbnRGcmFnbWVudC5jaGlsZE5vZGVzKTtcclxuXHJcbiAgICAgIC8vIGJhc2ljYWxseSB0aGUgYC5ub2RlYCBwcm9wZXJ0eSBpcyB1c2VkIHRvIGRldGVybWluZSB0aGUgbGFzdCBodG1sIG5vZGUgb2YgdGhlIFZOb2RlLFxyXG4gICAgICAvLyB0byBwb3NpdGlvbiB0aGUgbmV4dCBWTm9kZSdzIERPTSBOb2RlIGFmdGVyIGl0LlxyXG4gICAgICAvLyB0aGVyZWZvcmUgLm5vZGUgcmV0dXJucyB0aGUgbGFzdCBub2RlIG9mIHRoZSByYXcgaHRtbFxyXG4gICAgICBpZiAodGhpcy5jaGlsZE5vZGVzLmxlbmd0aClcclxuICAgICAgICB0aGlzLm5vZGUgPSB0aGlzLmNoaWxkTm9kZXNbdGhpcy5jaGlsZE5vZGVzLmxlbmd0aCAtIDFdO1xyXG4gICAgICByZXR1cm4gZG9jdW1lbnRGcmFnbWVudDtcclxuICAgIH1cclxuICB9KShjb250ZW50KTtcclxufVxyXG4iLCJpbXBvcnQgeyByZW5kZXIsIHJhd0h0bWwgfSBmcm9tIFwiLi9qc3gvanN4LXJ1bnRpbWVcIjtcclxuXHJcbmNvbnN0IHhzcyA9IFwiPGltZyBzcmM9eCBvbmVycm9yPVxcXCJhbGVydCgnWFNTIEF0dGFjaycpXFxcIj5cIjsgLy9cIjxzY3JpcHQ+YWxlcnQoJy0uLScpPC9zY3JpcHQ+XCI7XHJcblxyXG5mdW5jdGlvbiBSVEUocHJvcHM6IC8qeyB0eHQsIFwib24tY2xpY2tcIjogb25DbGljayB9Ki8ge1xyXG4gIHR4dDogc3RyaW5nO1xyXG4gIHJlZj86IEZ1bmN0aW9uO1xyXG59KSB7XHJcbiAgY29uc29sZS5sb2coXCJvbkNsaWNrXCIsIHByb3BzW1wib24tY2xpY2tcIl0pO1xyXG4gIHJldHVybiAoXHJcbiAgICA8cCByZWY9eyhlbDogSFRNTEVsZW1lbnQpID0+IGNvbnNvbGUubG9nKFwibXkgZGl2IDo6cmVmOjozLjJcIiwgZWwpfT5cclxuICAgICAge3Byb3BzLnR4dH1cclxuICAgIDwvcD5cclxuICApO1xyXG59XHJcblxyXG5mdW5jdGlvbiBCdXR0b24oe1xyXG4gIGNoaWxkcmVuLFxyXG4gIGRpc2FibGVkLFxyXG59OiB7XHJcbiAgY2hpbGRyZW46IGFueTtcclxuICBkaXNhYmxlZDogYm9vbGVhbjtcclxuICByZWY/OiBGdW5jdGlvbjtcclxufSkge1xyXG4gIHJldHVybiAoXHJcbiAgICA8YnV0dG9uXHJcbiAgICAgIGRpc2FibGVkPXtkaXNhYmxlZH1cclxuICAgICAgcmVmPXsoZWw6IEhUTUxFbGVtZW50KSA9PiBjb25zb2xlLmxvZyhcIm15IGJ1dHRvbiA6OnJlZjo6MVwiLCBlbCl9XHJcbiAgICA+XHJcbiAgICAgIDxzcGFuIHJlZj17KGVsOiBIVE1MRWxlbWVudCkgPT4gY29uc29sZS5sb2coXCJteSBhIDo6cmVmOjoyXCIsIGVsKX0+XHJcbiAgICAgICAgQnRuLXNwYW4tZmlyc3RcclxuICAgICAgPC9zcGFuPlxyXG4gICAgICB7Y2hpbGRyZW59XHJcbiAgICAgIDw+XHJcbiAgICAgICAgPHNwYW4gcmVmPXsoZWw6IEhUTUxFbGVtZW50KSA9PiBjb25zb2xlLmxvZyhcIm15IGEgOjpyZWY6OjNcIiwgZWwpfT5cclxuICAgICAgICAgIEJ0bi1zcGFuLWVuZFxyXG4gICAgICAgIDwvc3Bhbj5cclxuICAgICAgPC8+XHJcbiAgICA8L2J1dHRvbj5cclxuICApO1xyXG59XHJcblxyXG5mdW5jdGlvbiByZWZsb2coZWw6IEhUTUxFbGVtZW50KSB7XHJcbiAgY29uc29sZS5sb2coXCJteSBpbm5lciBkaXY6OnJlZjo6OFwiLCBlbCk7XHJcbn1cclxuXHJcbi8qXHJcbmNvbnN0IG1hcmt1cCA9IChcclxuICA8PlxyXG4gICAgPGRpdlxyXG4gICAgICBjbGFzcz1cImZvb1wiXHJcbiAgICAgIHJlZj17KGVsOiBIVE1MRWxlbWVudCkgPT4gY29uc29sZS5sb2coXCJteSBkaXYgOjpyZWY6OjRcIiwgZWwpfVxyXG4gICAgLz5cclxuICAgIDxpbnB1dCBkaXNhYmxlZD17dHJ1ZX0gaGlkZGVuPXtmYWxzZX0gLz5cclxuICAgIDxCdXR0b25cclxuICAgICAgZGlzYWJsZWQ9e3RydWV9XHJcbiAgICAgIHJlZj17KGVsOiBIVE1MRWxlbWVudCkgPT4gY29uc29sZS5sb2coXCJteSBCVVRUT046OnJlZjo6NVwiLCBlbCl9XHJcbiAgICA+XHJcbiAgICAgIHRleHRcclxuICAgICAgPHBvcHVwLWluZm9cclxuICAgICAgICByZWY9eyhlbDogSFRNTEVsZW1lbnQpID0+IGNvbnNvbGUubG9nKFwic3BhbiBpbiBCVVRUT046OnJlZjo6NlwiLCBlbCl9XHJcbiAgICAgID5cclxuICAgICAgICBibGFcclxuICAgICAgPC9wb3B1cC1pbmZvPlxyXG4gICAgPC9CdXR0b24+XHJcbiAgICA8UlRFXHJcbiAgICAgIHR4dD1cImxlIHRleHRcIlxyXG4gICAgICByZWY9eyhlbDogSFRNTEVsZW1lbnQpID0+IGNvbnNvbGUubG9nKFwibXkgZGl2IDo6cmVmOjozLjFcIiwgZWwpfVxyXG4gICAgICBvbi1jbGljaz17KGU6IEhUTUxFbGVtZW50KSA9PiBjb25zb2xlLmxvZyhlKX1cclxuICAgIC8+XHJcbiAgICB7eHNzfVxyXG4gICAge3Jhd0h0bWwoYDxvbD48bGk+cmF3IGh0bWw8L2xpPjwvb2w+YCl9XHJcbiAgICA8ZGl2XHJcbiAgICAgIGNsYXNzPVwiYmFtXCJcclxuICAgICAgcmVmPXsoZWw6IEhUTUxFbGVtZW50KSA9PiBjb25zb2xlLmxvZyhcIm15IGRpdjo6cmVmOjo3XCIsIGVsKX1cclxuICAgID5cclxuICAgICAgPGRpdj5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwiYmFyXCIgb24tY2xpY2s9eyhlKSA9PiBjb25zb2xlLmxvZyhlKX0gcmVmPXtyZWZsb2d9PlxyXG4gICAgICAgICAgY2xpY2sgTUVcclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8ZGl2IHN0eWxlPXt7IG91dGxpbmU6IFwiMXB4IHNvbGlkIHJlZDtcIiB9fT5cclxuICAgICAgICAgIHtkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI29sZFwiKX1cclxuICAgICAgICAgIHtudWxsfVxyXG4gICAgICAgICAge1swLCAxXS5tYXAoKG4pID0+IChcclxuICAgICAgICAgICAgPHNwYW4+e259PC9zcGFuPlxyXG4gICAgICAgICAgKSl9XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgPC9kaXY+XHJcbiAgPC8+XHJcbik7XHJcblxyXG4qL1xyXG5cclxuLypcclxuY29uc3QgbWFya3VwID0gKFxyXG4gIDxCdXR0b24gZGlzYWJsZWQ9e3RydWV9PlxyXG4gICAgICA8Ym9sZCByZWY9e3JlZmxvZ30+LS1JTk5FUi0tPC9ib2xkPlxyXG4gIDwvQnV0dG9uPlxyXG4pOyovXHJcbi8qXHJcblxyXG5jb25zdCBtYXJrdXAgPSAoXHJcbiAgPGRpdiBjbGFzcz1cImZvb1wiIHJlZj17KGVsOiBIVE1MRWxlbWVudCkgPT4gY29uc29sZS5sb2coXCJteSBkaXY6OnJlZjo6XCIsIGVsKX0+XHJcbiAgICA8ZGl2PlxyXG4gICAgICA8ZGl2IGNsYXNzPVwiYmFyXCIgcmVmPXsoZWw6IEhUTUxFbGVtZW50KSA9PiBjb25zb2xlLmxvZyhcIm15IGlubmVyIGRpdjo6cmVmOjpcIiwgZWwpfSAvPlxyXG4gICAgPC9kaXY+XHJcbiAgICA8QnV0dG9uIGRpc2FibGVkPXt0cnVlfT48L0J1dHRvbj5cclxuICA8L2Rpdj5cclxuKTtcclxuKi9cclxuLypcclxuY29uc3QgbWFya3VwID0gKFxyXG4gIDxhPlxyXG4gICAgPGI+XHJcbiAgICAgIDxjIGNsYXNzPVwiYmFyXCIgcmVmPXtyZWZsb2d9IC8+XHJcbiAgICA8L2I+XHJcbiAgPC9hPlxyXG4pO1xyXG4qL1xyXG5cclxuZnVuY3Rpb24gU3Bhbih7IG1vZGUgfTogeyBtb2RlOiBhbnkgfSkge1xyXG4gIHJldHVybiBtb2RlID09PSAxID8gKFxyXG4gICAgPGRpdj5cclxuICAgICAgPHNwYW4gaWQ9XCJpbm5lclwiIG9sZD17dHJ1ZX0+XHJcbiAgICAgICAgU3Bhbi1Db21wLS1vbGRcclxuICAgICAgPC9zcGFuPlxyXG4gICAgICA8aDM+dG8gYmUgcmVtb3ZlZDwvaDM+XHJcbiAgICA8L2Rpdj5cclxuICApIDogKFxyXG4gICAgPGRpdj5cclxuICAgICAgPHAgaWQ9XCJpbm5lclwiIG5ldz17dHJ1ZX0+XHJcbiAgICAgICAgU3Bhbi1Db21wLS1uZXdzXHJcbiAgICAgIDwvcD5cclxuICAgIDwvZGl2PlxyXG4gICk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIENvbXAoeyBudW0gfSkge1xyXG4gIGlmIChudW0gPT09IDEpIHJldHVybiBudWxsO1xyXG4gIHJldHVybiAoXHJcbiAgICA8ZGl2PlxyXG4gICAgICA8cD5jb21wPC9wPlxyXG4gICAgPC9kaXY+XHJcbiAgKTtcclxufVxyXG5cclxuY29uc3QgbWFya3VwMSA9IChudW06IGFueSkgPT4gKFxyXG4gIDxkaXYgaWQ9XCJvdXRlclwiIGRhdGEtZm9vPVwiYmFyXCIgZGF0YS12YXI9e251bX0+XHJcbiAgICA8aDM+c2hvdWxkIGdldCAyIC06IDM8L2gzPlxyXG4gICAge251bSA9PT0gMSA/IChcclxuICAgICAgPHVsIGNsYXNzPVwidWwtY2xhc3NcIj5cclxuICAgICAgICA8bGk+VGV4dCAxIDwvbGk+XHJcbiAgICAgICAgPGxpPlRleHQgMiA8L2xpPlxyXG4gICAgICA8L3VsPlxyXG4gICAgKSA6IChcclxuICAgICAgPHVsIGNsYXNzPVwidWwtY2xhc3NcIj5cclxuICAgICAgICA8bGk+VGV4dCAzIDwvbGk+XHJcbiAgICAgICAgPGxpPlRleHQgMiA8L2xpPlxyXG4gICAgICAgIDxsaT5UZXh0IDEgPC9saT5cclxuICAgICAgPC91bD5cclxuICAgICl9XHJcbiAgICA8aDM+c2hvdWxkIGdldCAzIC06IDI8L2gzPlxyXG4gICAge251bSA9PT0gMSA/IChcclxuICAgICAgPHVsIGNsYXNzPVwidWwtY2xhc3NcIj5cclxuICAgICAgICA8bGk+VGV4dCAxIDwvbGk+XHJcbiAgICAgICAgPGxpPlRleHQgMiA8L2xpPlxyXG4gICAgICAgIDxsaT5UZXh0IDMgPC9saT5cclxuICAgICAgPC91bD5cclxuICAgICkgOiAoXHJcbiAgICAgIDx1bCBjbGFzcz1cInVsLWNsYXNzXCI+XHJcbiAgICAgICAgPGxpPlRleHQgMSA8L2xpPlxyXG4gICAgICAgIDxsaT5UZXh0IDIgPC9saT5cclxuICAgICAgPC91bD5cclxuICAgICl9XHJcbiAgICB7bnVtID09PSAxID8gbnVsbCA6IDxwPm5ldyByZW5kZXI8L3A+fVxyXG4gICAgPGRpdj5cclxuICAgICAgPHNwYW4+c3Bhbi1jb250ZW50PC9zcGFuPlxyXG4gICAgPC9kaXY+XHJcbiAgICA8U3BhbiBtb2RlPXtudW19IC8+XHJcbiAgICB7Lypkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI29sZFwiKSovfVxyXG4gICAgPD5GcmFnbWVudC1pdGVtPC8+XHJcbiAgICA8c3ZnXHJcbiAgICAgIHZpZXdCb3g9XCIwIDAgMzAwIDEwMFwiXHJcbiAgICAgIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIlxyXG4gICAgICBzdHJva2U9XCJyZWRcIlxyXG4gICAgICBmaWxsPVwiZ3JleVwiXHJcbiAgICA+XHJcbiAgICAgIDxjaXJjbGUgY3g9XCI1MFwiIGN5PVwiNTBcIiByPVwiNDBcIiAvPlxyXG4gICAgICA8Y2lyY2xlIGN4PVwiMTUwXCIgY3k9XCI1MFwiIHI9XCI0XCIgLz5cclxuXHJcbiAgICAgIDxzdmcgdmlld0JveD1cIjAgMCAxMCAxMFwiIHg9XCIyMDBcIiB3aWR0aD1cIjEwMFwiPlxyXG4gICAgICAgIDxjaXJjbGUgY3g9XCI1XCIgY3k9XCI1XCIgcj1cIjRcIiAvPlxyXG4gICAgICA8L3N2Zz5cclxuICAgIDwvc3ZnPlxyXG4gIDwvZGl2PlxyXG4pO1xyXG5cclxuZnVuY3Rpb24gbWFya3VwMihudW06IGFueSkge1xyXG4gIHJldHVybiAoXHJcbiAgICA8ZGl2IGlkPVwib3V0ZXJcIj5cclxuICAgICAgPD5cclxuICAgICAgICA8PlxyXG4gICAgICAgICAgPHA+bmVzdGVkIGZyYWdtZW50PC9wPlxyXG4gICAgICAgIDwvPlxyXG4gICAgICA8Lz5cclxuICAgICAgPGgxPnN0YXRpYzwvaDE+XHJcbiAgICAgIDxoMT5keW5hbWljIHZhbDoge251bX08L2gxPlxyXG4gICAgICB7bnVtID09PSAxID8gPGgxPm9sZDwvaDE+IDogZmFsc2V9XHJcbiAgICAgIHtudW0gPT09IDEgPyAoXHJcbiAgICAgICAgPD5cclxuICAgICAgICAgIDxoMT5mcmFnIG9sZDwvaDE+XHJcbiAgICAgICAgICA8c3Bhbj5mcmFnIHNwYW4gb2xkPC9zcGFuPlxyXG4gICAgICAgIDwvPlxyXG4gICAgICApIDogKFxyXG4gICAgICAgIDxoMT5mcmFnIG5ldzwvaDE+XHJcbiAgICAgICl9XHJcbiAgICAgIDxDb21wIG51bT17bnVtfSAvPlxyXG4gICAgPC9kaXY+XHJcbiAgKTtcclxufVxyXG5mdW5jdGlvbiBOTCgpIHtcclxuICByZXR1cm4gbnVsbDtcclxufVxyXG5cclxuZnVuY3Rpb24gbWFya3VwMyhudW06IGFueSkge1xyXG4gIHJldHVybiBudW0gPT09IDEgPyAoXHJcbiAgICA8aDE+XHJcbiAgICAgIEEtTGluZSAxIC0ge251bX1cclxuICAgICAgPFNwYW4gbW9kZT17bnVtfSAvPlxyXG4gICAgICA8QnV0dG9uXHJcbiAgICAgICAgZGlzYWJsZWQ9e3RydWV9XHJcbiAgICAgICAgcmVmPXsoZWw6IEhUTUxFbGVtZW50KSA9PiBjb25zb2xlLmxvZyhcIm15IEJVVFRPTjo6cmVmOjo1XCIsIGVsKX1cclxuICAgICAgPlxyXG4gICAgICAgIHRleHRcclxuICAgICAgICA8cG9wdXAtaW5mb1xyXG4gICAgICAgICAgcmVmPXsoZWw6IEhUTUxFbGVtZW50KSA9PiBjb25zb2xlLmxvZyhcInNwYW4gaW4gQlVUVE9OOjpyZWY6OjZcIiwgZWwpfVxyXG4gICAgICAgID5cclxuICAgICAgICAgIGJsYVxyXG4gICAgICAgIDwvcG9wdXAtaW5mbz5cclxuICAgICAgICA8cD5pbm5lciBwIHtudW19PC9wPlxyXG4gICAgICA8L0J1dHRvbj5cclxuICAgICAgQS1MaW5lIDNcclxuICAgICAgPD5cclxuICAgICAgICA8cD5cclxuICAgICAgICAgIDxwPkEgRnJhZyBsaW5lIDEqPC9wPlxyXG4gICAgICAgIDwvcD5cclxuICAgICAgICA8cD5BIEZyYWcgbGluZSAyPC9wPlxyXG4gICAgICAgIDxwPkEgRnJhZyBsaW5lIDM8L3A+XHJcbiAgICAgICAgPHA+QSBGcmFnIGxpbmUgNDwvcD5cclxuICAgICAgICA8c3ZnXHJcbiAgICAgICAgICB2aWV3Qm94PVwiMCAwIDMwMCAxMDBcIlxyXG4gICAgICAgICAgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiXHJcbiAgICAgICAgICBzdHJva2U9XCJyZWRcIlxyXG4gICAgICAgICAgZmlsbD1cImdyZXlcIlxyXG4gICAgICAgID5cclxuICAgICAgICAgIDxjaXJjbGUgY3g9XCI1MFwiIGN5PVwiNTBcIiByPVwiNDBcIiAvPlxyXG4gICAgICAgICAgPGNpcmNsZSBjeD1cIjE1MFwiIGN5PVwiNTBcIiByPVwiNFwiIC8+XHJcblxyXG4gICAgICAgICAgPHN2ZyB2aWV3Qm94PVwiMCAwIDEwIDEwXCIgeD1cIjIwMFwiIHdpZHRoPVwiMTAwXCI+XHJcbiAgICAgICAgICAgIDxjaXJjbGUgY3g9XCI1XCIgY3k9XCI1XCIgcj1cIjRcIiAvPlxyXG4gICAgICAgICAgPC9zdmc+XHJcbiAgICAgICAgPC9zdmc+XHJcbiAgICAgIDwvPlxyXG4gICAgICB7bnVsbH1cclxuICAgIDwvaDE+XHJcbiAgKSA6IChcclxuICAgIDxoMSBjbGFzcz1cImFcIiByZWY9e2NvbnNvbGUuaW5mb30+XHJcbiAgICAgIEIgTGluZSAxIC0ge251bX1cclxuICAgICAgPFNwYW4gbW9kZT17bnVtfSAvPlxyXG4gICAgICA8QnV0dG9uXHJcbiAgICAgICAgZGlzYWJsZWQ9e3RydWV9XHJcbiAgICAgICAgcmVmPXsoZWw6IEhUTUxFbGVtZW50KSA9PiBjb25zb2xlLmxvZyhcIm15IEJVVFRPTjo6cmVmOjo1XCIsIGVsKX1cclxuICAgICAgPlxyXG4gICAgICAgIHRleHRcclxuICAgICAgICA8cG9wdXAtaW5mb1xyXG4gICAgICAgICAgcmVmPXsoZWw6IEhUTUxFbGVtZW50KSA9PiBjb25zb2xlLmxvZyhcInNwYW4gaW4gQlVUVE9OOjpyZWY6OjZcIiwgZWwpfVxyXG4gICAgICAgID5cclxuICAgICAgICAgIGJsYVxyXG4gICAgICAgIDwvcG9wdXAtaW5mbz5cclxuICAgICAgICA8cD57bnVtfTwvcD5cclxuICAgICAgPC9CdXR0b24+XHJcbiAgICAgIDw+XHJcbiAgICAgICAge2ZhbHNlfVxyXG4gICAgICAgIHtudWxsfVxyXG4gICAgICAgIHt1bmRlZmluZWR9XHJcbiAgICAgIDwvPlxyXG4gICAgICA8PlxyXG4gICAgICAgIDxwPkIgRnJhZyBsaW5lIDE8L3A+XHJcbiAgICAgICAgPHA+QiBGcmFnIGxpbmUgMjwvcD5cclxuICAgICAgICB7dW5kZWZpbmVkfVxyXG4gICAgICAgIDxwPkIgRnJhZyBsaW5lIDMoNCk8L3A+XHJcbiAgICAgICAgPHN2Z1xyXG4gICAgICAgICAgdmlld0JveD1cIjAgMCAzMDAgMTAwXCJcclxuICAgICAgICAgIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIlxyXG4gICAgICAgICAgc3Ryb2tlPVwicmVkXCJcclxuICAgICAgICAgIGZpbGw9XCJncmV5XCJcclxuICAgICAgICA+XHJcbiAgICAgICAgICA8Y2lyY2xlIGN4PVwiNTBcIiBjeT1cIjUwXCIgcj1cIjQwXCIgLz5cclxuICAgICAgICAgIDxjaXJjbGUgY3g9XCIxNTBcIiBjeT1cIjUwXCIgcj1cIjRcIiAvPlxyXG5cclxuICAgICAgICAgIDxzdmcgdmlld0JveD1cIjAgMCAxMCAxMFwiIHg9XCIyMDBcIiB3aWR0aD1cIjEwMFwiPlxyXG4gICAgICAgICAgICA8Y2lyY2xlIGN4PVwiNVwiIGN5PVwiNVwiIHI9XCI2XCIgLz5cclxuICAgICAgICAgIDwvc3ZnPlxyXG4gICAgICAgIDwvc3ZnPlxyXG4gICAgICAgIDxwPkIgRnJhZyBsaW5lIDQoNik8L3A+XHJcbiAgICAgIDwvPlxyXG4gICAgPC9oMT5cclxuICApO1xyXG59XHJcbmNvbnN0IG9iaiA9IHsgYTogMSB9O1xyXG5cclxuZnVuY3Rpb24gbWFya3VwNChudW06IGFueSkge1xyXG4gIG9iai5hID0gbnVtO1xyXG4gIHJldHVybiBudW0gPT09IDEgPyAoXHJcbiAgICA8aDEgb2JqPXtvYmp9IGlkPXtvYmouYX0+XHJcbiAgICAgIG9sZC1IZWFkbGluZSB7bnVtfVxyXG4gICAgPC9oMT5cclxuICApIDogKFxyXG4gICAgPGgxIG9iaj17b2JqfSBjbGFzcz1cImFcIiBpZD17b2JqLmF9PlxyXG4gICAgICBuZXctSGVhZGxpbmUge251bX1cclxuICAgIDwvaDE+XHJcbiAgKTtcclxufVxyXG5cclxuZnVuY3Rpb24gbWFya3VwKG51bTogYW55KSB7XHJcbiAgcmV0dXJuIG51bSA9PT0gMSA/IChcclxuICAgIDxkaXY+XHJcbiAgICAgIDw+XHJcbiAgICAgICAgPHA+ZnJhZyAtIEk8L3A+XHJcbiAgICAgICAgPGI+IGZyYWcgLSBJSTwvYj5cclxuICAgICAgPC8+XHJcbiAgICA8L2Rpdj5cclxuICApIDogKFxyXG4gICAgPGgxIGNsYXNzPVwiYVwiPlxyXG4gICAgICB7XCJuZXctSGVhZGxpbmVcIn0ge251bX1cclxuICAgIDwvaDE+XHJcbiAgKTtcclxufVxyXG5cclxuZnVuY3Rpb24gbWFya3VwNShudW06IGFueSkge1xyXG4gIHJldHVybiBudW0gPT09IDEgPyAoXHJcbiAgICA8ZGl2PlxyXG4gICAgICB7cmF3SHRtbChgPGRpdiBjbGFzcz1cImtcIj50eHQ8L2Rpdj48aW5wdXQgdHlwZT1yYWRpb1wiIC8+YCl9XHJcbiAgICAgIDxDb21wMyAvPlxyXG4gICAgICB7ZWx9XHJcbiAgICA8L2Rpdj5cclxuICApIDogKFxyXG4gICAgPGRpdj5cclxuICAgICAge3Jhd0h0bWwoYDxkaXYgY2xhc3M9XCJrXCI+dHh0PC9kaXY+PGlucHV0IHR5cGU9cmFkaW9cIiAvPmApfVxyXG4gICAgICB7bnVsbH1cclxuICAgICAge2VsfVxyXG4gICAgPC9kaXY+XHJcbiAgKTtcclxufVxyXG5cclxuZnVuY3Rpb24gbWFya3VwNihhKSB7XHJcbiAgcmV0dXJuIChcclxuICAgIDxkaXY+XHJcbiAgICAgIDxzdmcgaWQ9XCJmb282XCIgdmlld0JveD1cIjAgMCAxMCAxMFwiIHg9XCIyMDBcIiB3aWR0aD1cIjEwMFwiPlxyXG4gICAgICAgIDw+XHJcbiAgICAgICAgICB7YSAmJiA8Y2lyY2xlIGN4PVwiNVwiIGN5PVwiNVwiIHI9XCI2XCIgLz59XHJcbiAgICAgICAgPC8+XHJcbiAgICAgIDwvc3ZnPlxyXG4gICAgICA8YnV0dG9uPnN1Ym1pdDwvYnV0dG9uPlxyXG4gICAgPC9kaXY+XHJcbiAgKTtcclxufVxyXG5cclxuLy9jb25zb2xlLmxvZyhtYXJrdXApO1xyXG4vL3dpbmRvdy5tYXJrdXAgPSBtYXJrdXA7XHJcblxyXG5jbGFzcyBQb3BVcEluZm8gZXh0ZW5kcyBIVE1MRWxlbWVudCB7XHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAvLyBBbHdheXMgY2FsbCBzdXBlciBmaXJzdCBpbiBjb25zdHJ1Y3RvclxyXG4gICAgc3VwZXIoKTtcclxuXHJcbiAgICAvLyB3cml0ZSBlbGVtZW50IGZ1bmN0aW9uYWxpdHkgaW4gaGVyZVxyXG5cclxuICAgIGNvbnNvbGUubG9nKFwiIyMjIyMjIyMjIyMjIyMjIyNjdG9yIENFXCIpO1xyXG4gIH1cclxuXHJcbiAgY29ubmVjdGVkQ2FsbGJhY2soKSB7XHJcbiAgICBjb25zb2xlLmxvZyhcIiMjIyMjIyMjIyMjIyMjIyMjQ3VzdG9tIHNxdWFyZSBlbGVtZW50IGFkZGVkIHRvIHBhZ2UuXCIpO1xyXG4gIH1cclxufVxyXG5cclxuY3VzdG9tRWxlbWVudHMuZGVmaW5lKFwicG9wdXAtaW5mb1wiLCBQb3BVcEluZm8pO1xyXG5cclxuLy9kb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI29sZFwiKSEuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGNvbnNvbGUubG9nKTtcclxuXHJcbi8vZG9jdW1lbnQuYm9keS5pbm5lckhUTUwgPSBtYXJrdXA7XHJcbi8vLy9yZW5kZXIobWFya3VwMygxKSwgZG9jdW1lbnQuYm9keSk7XHJcbi8vZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJvdXRlclwiKT8uc2V0QXR0cmlidXRlKFwiZGF0YS1mb29cIiwgXCJtb2RcIik7XHJcblxyXG4vL2RvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaW5uZXJcIik/LnNldEF0dHJpYnV0ZShcImRhdGEtZm9vXCIsIFwibW9kXCIpO1xyXG4vL3JlbmRlcihtYXJrdXAoMiksIGRvY3VtZW50LmJvZHkpO1xyXG4vL3JlbmRlcihtYXJrdXAsIGRvY3VtZW50LmJvZHksIHRydWUpO1xyXG5jb25zdCBlbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjb2xkXCIpO1xyXG5mdW5jdGlvbiBDb21wMigpIHtcclxuICByZXR1cm4gKFxyXG4gICAgPD5cclxuICAgICAge3Jhd0h0bWwoYDxkaXYgY2xhc3M9XCJrXCI+dHh0PC9kaXY+PGlucHV0IHR5cGU9cmFkaW9cIiAvPmApfVxyXG4gICAgICA8Q29tcDMgLz5cclxuICAgICAge2VsfVxyXG4gICAgPC8+XHJcbiAgKTtcclxufVxyXG5mdW5jdGlvbiBDb21wMygpIHtcclxuICByZXR1cm4gPGRpdj5jb21wIGNvbnRlbnQ8L2Rpdj47XHJcbn1cclxuXHJcbmNvbnN0ICRjb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNvbnRhaW5lclwiKTtcclxuXHJcbndpbmRvdy5yZVJlbmRlcjEgPSAoKSA9PiByZW5kZXIobWFya3VwMygxKSwgJGNvbnRhaW5lcik7XHJcbndpbmRvdy5yZVJlbmRlcjIgPSAoKSA9PiByZW5kZXIobWFya3VwMygyKSwgJGNvbnRhaW5lcik7XHJcbndpbmRvdy5yZVJlbmRlcjMgPSAoKSA9PlxyXG4gIHJlbmRlcihcclxuICAgIC8vIDxkaXY+dHh0PC9kaXY+XHJcbiAgICA8Q29tcDIgLz4sXHJcbiAgICAkY29udGFpbmVyXHJcbiAgKTtcclxuXHJcbmNvbnNvbGUubG9nKFwiMTIzNDVcIik7XHJcbndpbmRvdy5zcyA9ICgpID0+IG1hcmt1cDMoMSkgKyBcIlwiO1xyXG53aW5kb3cuc3MyID0gKCkgPT4ge1xyXG4gIGNvbnNvbGUubG9nKG1hcmt1cDMoMSkpO1xyXG5cclxuICAvL2RvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY29udGFpbmVyXCIpLmlubmVySFRNTCA9IG1hcmt1cDMoMSk7XHJcbn07XHJcblxyXG53aW5kb3cucmVSZW5kZXI1YSA9ICgpID0+IHJlbmRlcihtYXJrdXA1KDEpLCAkY29udGFpbmVyKTtcclxud2luZG93LnJlUmVuZGVyNWIgPSAoKSA9PiByZW5kZXIobWFya3VwNSgyKSwgJGNvbnRhaW5lcik7XHJcblxyXG5mdW5jdGlvbiBtYXJrdXA3KG1vZCkge1xyXG4gIGlmIChtb2QgPT09IDEpIHtcclxuICAgIHJldHVybiAoXHJcbiAgICAgIDxkaXY+XHJcbiAgICAgICAgPEJ1dHRvbj5cclxuICAgICAgICAgIDxzcGFuPnRleHQ8L3NwYW4+XHJcbiAgICAgICAgICA8c3Bhbj4sIG1vcmUgdGV4dDwvc3Bhbj5cclxuICAgICAgICA8L0J1dHRvbj5cclxuICAgICAgPC9kaXY+XHJcbiAgICApO1xyXG4gIH0gZWxzZSBpZiAobW9kID09PSAyKSB7XHJcbiAgICByZXR1cm4gPGRpdj5zb21lIGNvbnRlbnQ8L2Rpdj47XHJcbiAgfSBlbHNlIHtcclxuICAgIHJldHVybiA8ZGl2PntmYWxzZX08L2Rpdj47XHJcbiAgfVxyXG59XHJcblxyXG53aW5kb3cucmVSZW5kZXJSZWYgPSAoKSA9PlxyXG4gIHJlbmRlcihcclxuICAgIDxoMiBjbGFzcz1cImFcIiByZWY9e2NvbnNvbGUud2Fybn0+XHJcbiAgICAgIEhlYWRpbmcgd2l0aCByZWZcclxuICAgIDwvaDI+LFxyXG4gICAgJGNvbnRhaW5lclxyXG4gICk7XHJcbndpbmRvdy5yZVJlbmRlcjZhID0gKCkgPT4gcmVuZGVyKG1hcmt1cDYodHJ1ZSksICRjb250YWluZXIpO1xyXG53aW5kb3cucmVSZW5kZXI2YiA9ICgpID0+XHJcbiAgcmVuZGVyKDxjaXJjbGUgY3g9XCI1XCIgY3k9XCI1XCIgcj1cIjZcIiAvPiwgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJmb282XCIpKTtcclxud2luZG93LnJlUmVuZGVyU3ZnID0gKCkgPT4gcmVuZGVyKG1hcmt1cDEoKSwgJGNvbnRhaW5lcik7XHJcbndpbmRvdy5yZVJlbmRlclN2ZzIgPSAoKSA9PiByZW5kZXIobWFya3VwMSgpLCAkY29udGFpbmVyKTtcclxud2luZG93LnJlUmVuZGVyN18xID0gKCkgPT4gcmVuZGVyKG1hcmt1cDcoMSksICRjb250YWluZXIpO1xyXG53aW5kb3cucmVSZW5kZXI3XzIgPSAoKSA9PiByZW5kZXIobWFya3VwNygyKSwgJGNvbnRhaW5lcik7XHJcbndpbmRvdy5yZVJlbmRlcjdfMyA9ICgpID0+IHJlbmRlcihtYXJrdXA3KDMpLCAkY29udGFpbmVyKTtcclxuXHJcblxyXG5mdW5jdGlvbiBGdW5jMSh7Y2hpbGRyZW59KSB7XHJcbiAgY29uc29sZS5sb2coXCJGdW5jLTFcIik7XHJcbiAgcmV0dXJuIFwiYXNzYXNkc1wiXHJcbiAgcmV0dXJuIDxkaXY+e2NoaWxkcmVufTwvZGl2PlxyXG59XHJcblxyXG5mdW5jdGlvbiBGdW5jMigpIHtcclxuXHJcbiAgY29uc29sZS5sb2coXCJGdW5jLTJcIik7XHJcbiAgdGhyb3cgbmV3IEVycm9yKFwiYWFhYVwiKTtcclxuXHJcblxyXG4gIHJldHVybiA8cD5UZXh0PC9wPlxyXG59XHJcblxyXG5yZW5kZXIoKDxkaXY+XHJcbiAgPEZ1bmMxPlxyXG4gICAgPEZ1bmMyIC8+XHJcbiAgPC9GdW5jMT5cclxuPC9kaXY+KSwgJGNvbnRhaW5lcilcclxuIl0sInNvdXJjZVJvb3QiOiIifQ==