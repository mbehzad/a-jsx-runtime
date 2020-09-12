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
const renderedVTrees = new WeakMap();
const refsToCall = [];
/**
 * provides functions needed by babel for a custom pragma
 * to render parsed jsx code to html
 */
// props which will be rendered as attributes
// Functions will be used for event listeners. (with attribute name starting with 'on-')

// base class which will be inherited from jsx and fragments function node generation
// and will be used to distinguish them with other Elements
class JsxNode {
  constructor(props) {
    this.props = void 0;
    this.props = props;
  }

} // null when checking the parent when root is fragment itself


function getParentElementNode(vNode) {
  while (vNode.parent) {
    vNode = vNode.parent; // `.node` is only on "Text" and "Element", "RawHtml" type VNode, and only Element has children

    if (vNode.node) break;
  }

  return vNode;
}

function getChildrenWithNodes(vNode, alwaysAllow) {
  vNode.children;
  return vNode.children.map(childNode => {
    if (childNode === alwaysAllow) return childNode;
    if (childNode.node) return childNode;
    return getChildrenWithNodes(childNode, alwaysAllow);
  }).flat(Infinity);
}

function getParentAndNextSibling(vNode) {
  // node ancestor with Element,
  const parentWithElement = getParentElementNode(vNode);
  const siblings = getChildrenWithNodes(parentWithElement, vNode);
  const prevSibling = siblings[siblings.indexOf(vNode) - 1];
  const nextSiblingNode = prevSibling ? prevSibling.node.nextSibling : null;
  return [parentWithElement.node, nextSiblingNode];
} // private key for calling the `ref` callers


const _callRefs = Symbol("callRefs"); // the current markup which is rendered is nested in an svg element


let svgContext = false; // jsx and Fragment will return objects which implement this interface

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
 * generates HTML Node elements from the provided jsx tree
 * @param tag {string|Function} - tag argument of the jsx call
 * @param props {Object} - props argument of jsx call
 */


function asNode(tag, props, //JsxProps,
children) {
  // fragment
  if (!tag) {
    const fragments = children.flat() // ?
    .map(item => item.asNode());
    const documentFragment = document.createDocumentFragment();
    documentFragment.append(...fragments);
    return [documentFragment, []];
  } // shouldn't // @TODO: test and remove


  if (typeof tag === "function") {
    console.error("shouldn't reach this in vTree mode"); // expecting the tag function to return jsx.
    // here it will also work when it returns HTMLElement

    let result = tag(props);
    let jsxNodes = [];

    if (result instanceof VNode) {
      jsxNodes = [result];
      result = result.asNode();
      Object.entries(props).forEach(([key, value]) => {
        if (key.startsWith("on-") && (typeof value === "function" || typeof value === "object")) {
          // remove leading "on-""
          const event = key.replace(/^on-/, "");
          result.addEventListener(event, value);
        }
      });
    }

    return [result, jsxNodes];
  }

  const {
    ref,
    ...attrs
  } = props; // remember if the svg context was set for this node, and replace after generating all children

  let svgContextSet = false; // set the context of markup which is rendered as SVG (or its children)
  // no need for re-setting the context for nested SVGs

  if (!svgContext && tag === "svg") {
    svgContext = true;
    svgContextSet = true;
  } // currently not supporting the `is` option for Customized built-in elements


  const node = svgContext ? document.createElementNS("http://www.w3.org/2000/svg", tag) : document.createElement(tag); // currently only supporting ref on html elements. not template functions

  if (typeof ref === "function") {
    refsToCall.push(() => ref(node));
  }

  Object.entries(attrs).filter(([_key, value]) => truthy(value)).forEach(([key, value]) => {
    // for style as object:
    // (style:) {display: "none", position: "absolute"} ==> 'display: none; position: absolute;'
    if (key === "style" && typeof value === "object") value = Object.entries(value).filter(([, v]) => truthy(v)).map(([k, v]) => `${k}: ${v}`).join("; "); // (class:) ["btn", "red"] ==> "btn red"

    if (key === "class" && Array.isArray(value)) value = value.join(" ");
    if (value === true) node.setAttribute(key, "");else if (typeof value === "string" || typeof value === "number") node.setAttribute(key, String(value)); // key has the form of "on-change". value is the callback function or an object implementing {EventListener} interface
    else if (key.startsWith("on-") && (typeof value === "function" || typeof value === "object")) {
        // remove leading "on-""
        const event = key.replace(/^on-/, "");
        node.addEventListener(event, value);
      } // @ts-ignore - providing the value as property to html element
      else node[key] = value;
  }); // returns child jsx nodes as well to be used during the ref call

  const childJsxNodes = children.filter(child => child instanceof VNode);
  node.append(...children //.flat()
  .map(child => child.asNode())); // svg element and all its children were rendered, reset the svg context

  if (svgContextSet) svgContext = false;
  return [node, childJsxNodes];
}

function insertNewItem(newNode) {
  const [parent, nextSibling] = getParentAndNextSibling(newNode);
  parent.insertBefore(newNode.asNode(), nextSibling);
}

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
}

class VNode {}

class ElementVNode extends VNode {
  constructor(tag, props, children) {
    super();
    this.tag = tag;
    this.props = props;
    this.type = "Element";
    this.node = null;
    this.children = void 0;
    this.parent = null;
    this.children = children.map(child => {
      if (Array.isArray(child)) return new FragmentVNode(child);

      if (child instanceof VNode) {
        return child;
      }

      if (child instanceof Node) {
        return new LiveNodeVNode(child);
      }

      if (!truthy(child)) {
        return new NullVNode();
      }

      return new TextVNode(child);
    });
    this.children.forEach(child => child.parent = this);
  }

  toString() {
    return asHtmlString(this.tag, this.props, this.children);
  }

  asNode() {
    const node = asNode(this.tag, this.props, this.children)[0];
    this.node = node; // memorize for next subtree re-renders

    renderedVTrees.set(node, this);
    return node;
  }

  removeFromDOM() {
    this.node.parentElement.removeChild(this.node);
  }

  diffAndPatch(newNode) {
    if (newNode.tag === this.tag) {
      newNode.node = this.node; //      patch props,
      // update props form new node

      Object.entries(newNode.props).filter(([k, v]) => this.props[k] !== v).forEach(([key, value]) => {
        if (value === true) newNode.node.setAttribute(key, "");else if (value === null || value === undefined || value === false) newNode.node.removeAttribute(key);else newNode.node.setAttribute(key, value);
      }); // remove old, obsolate attributes

      Object.entries(this.props).filter(([k, v]) => !newNode.props.hasOwnProperty(k)).forEach(([key, value]) => {
        this.node.removeAttribute(key);
      }); // children => iter and patch
      // old children being modified

      diffAndPatchChildren(this, newNode);
    } // tag has changed
    else {
        this.node.replaceWith(newNode.asNode());
      } // memorize for next subtree re-renders


    renderedVTrees.set(this.node, newNode);
  }

}

class FragmentVNode extends VNode {
  constructor(children) {
    super();
    this.type = "Fragment";
    this.children = void 0;
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
    const node = asNode(undefined, {}, this.children)[0];
    return node;
  }

  toString() {
    return this.children.map(child => child.toString()).join("");
  } // to level


  diffAndPatch(newVNode) {
    return diffAndPatchChildren(this, newVNode);
  }

  removeFromDOM() {
    this.children.forEach(child => child.removeFromDOM());
  }

}

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

}

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

}

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

}

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

}

function asVNode(tag, props) {
  console.log("asVNode:", {
    tag,
    props
  });

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

  if (tag) {
    return new ElementVNode(tag, attr, children); // or simply pass cildren with props
  } else if (!truthy(attr)) {
    const vNode = new NullVNode();
    vNode.parent = this;
    return vNode;
  } else if (children) {
    return new FragmentVNode(children);
  } // else? // @TODO:?

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
 * render the given markup into the given dom node
 *
 * @param {string|HTMLElement|JSX} markup - html as string, html element or jsx template
 * @param {HTMLElement} domNode - container for the template to be rendered into
 * @param {boolean} [append=false] - should the provided markup be appended to the existing markup, or default replace it
 */

function render(markup, // @TODO: specific support for Template? (.content.clone)
domNode, append = false) {
  Array.from(document.body.querySelectorAll("*")).forEach(el => el.style.background = "#ccffcc");
  const isReRender = renderedVTrees.has(domNode);
  if (!append && !isReRender) domNode.innerHTML = "";

  if (typeof markup === "string") {
    domNode.insertAdjacentHTML("beforeend", markup); // sanitize?
  } else if (markup instanceof Node) {
    domNode.insertAdjacentElement("beforeend", markup);
  } else if (markup instanceof VNode) {
    svgContext = false;
    const vTree = new RootVNode(markup, domNode);
    console.log("#################################\n", "vTree:", vTree);

    if (isReRender) {
      console.log("is re-render");
      const oldVTree = renderedVTrees.get(domNode);
      console.log("###########\n", {
        oldVTree,
        newVTree: vTree
      }); // was previously renderd as a subtree from another render

      if (oldVTree.type === "Element") {
        // update its children
        diffAndPatchChildren(oldVTree, vTree); // update the children property in the memory reference from the previous render,
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
function rawHtml(content) {
  var _temp;

  return new (_temp = class extends VNode {
    /**
     *
     */
    constructor(content) {
      super();
      this.parent = null;
      this.children = [];
      this.type = "RawHtml";
      this.childNodes = void 0;
      this.content = void 0;
      this.node = void 0;
      this.content = content;
    }

    removeFromDOM() {
      this.childNodes.forEach(node => node.parentElement.removeChild(node));
    }

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

    asVNode() {
      return {};
    }

    [_callRefs]() {// noop
    }

  }, _temp)(content);
} // gotchsas:
// - styles will override (could do: setting each rule individually)
// @TODO: event props

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

function markup6() {
  return Object(C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])("div", {
    children: [Object(C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("div", {
      id: "foo6",
      children: Object(C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("span", {
        children: "original"
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

window.reRender1 = function () {
  return Object(C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["render"])(markup3(1), document.getElementById("container"));
};

window.reRender2 = function () {
  return Object(C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["render"])(markup3(2), document.getElementById("container"));
};

window.reRender3 = function () {
  return Object(C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["render"])( // <div>txt</div>
  Object(C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(Comp2, {}), document.getElementById("container"));
};

console.log("12345");

window.ss = function () {
  return markup3(1) + "";
};

window.ss2 = function () {
  console.log(markup3(1)); //document.getElementById("container").innerHTML = markup3(1);
};

window.reRender5a = function () {
  return Object(C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["render"])(markup5(1), document.getElementById("container"));
};

window.reRender5b = function () {
  return Object(C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["render"])(markup5(2), document.getElementById("container"));
};

Object(C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["render"])(Object(C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("h2", {
  "class": "a",
  ref: console.warn,
  children: "Heading with ref"
}), document.getElementById("container"));

window.reRenderRef = function () {
  return Object(C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["render"])(Object(C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("h2", {
    "class": "a",
    ref: console.warn,
    children: "Heading with ref"
  }), document.getElementById("container"));
};

window.reRender6a = function () {
  return Object(C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["render"])(markup6(), document.getElementById("container"));
};

window.reRender6b = function () {
  return Object(C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["render"])(Object(C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("p", {
    children: "modified"
  }), document.getElementById("foo6"));
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vanN4L2pzeC1ydW50aW1lLnRzIiwid2VicGFjazovLy8uL21haW4udHN4Il0sIm5hbWVzIjpbInJlbmRlcmVkVlRyZWVzIiwiV2Vha01hcCIsInJlZnNUb0NhbGwiLCJKc3hOb2RlIiwiY29uc3RydWN0b3IiLCJwcm9wcyIsImdldFBhcmVudEVsZW1lbnROb2RlIiwidk5vZGUiLCJwYXJlbnQiLCJub2RlIiwiZ2V0Q2hpbGRyZW5XaXRoTm9kZXMiLCJhbHdheXNBbGxvdyIsImNoaWxkcmVuIiwibWFwIiwiY2hpbGROb2RlIiwiZmxhdCIsIkluZmluaXR5IiwiZ2V0UGFyZW50QW5kTmV4dFNpYmxpbmciLCJwYXJlbnRXaXRoRWxlbWVudCIsInNpYmxpbmdzIiwicHJldlNpYmxpbmciLCJpbmRleE9mIiwibmV4dFNpYmxpbmdOb2RlIiwibmV4dFNpYmxpbmciLCJfY2FsbFJlZnMiLCJTeW1ib2wiLCJzdmdDb250ZXh0IiwidHJ1dGh5IiwidmFsdWUiLCJ1bmRlZmluZWQiLCJzYW5pdGl6ZSIsInRleHQiLCJkaXYiLCJkb2N1bWVudCIsImNyZWF0ZUVsZW1lbnQiLCJpbm5lclRleHQiLCJpbm5lckhUTUwiLCJnZXRPdXRlckh0bWwiLCJlbGVtZW50IiwiRWxlbWVudCIsIm91dGVySFRNTCIsIlRleHQiLCJ3aG9sZVRleHQiLCJEb2N1bWVudEZyYWdtZW50IiwiQXJyYXkiLCJmcm9tIiwiY2hpbGROb2RlcyIsImVsIiwiam9pbiIsImNvbnNvbGUiLCJ3YXJuIiwiYXNIdG1sU3RyaW5nIiwidGFnIiwiYXR0cmlidXRlcyIsIk9iamVjdCIsImVudHJpZXMiLCJmaWx0ZXIiLCJrZXkiLCJ2IiwiayIsImlzQXJyYXkiLCJjb250ZW50IiwiY2hpbGQiLCJ0b1N0cmluZyIsImFzTm9kZSIsImZyYWdtZW50cyIsIml0ZW0iLCJkb2N1bWVudEZyYWdtZW50IiwiY3JlYXRlRG9jdW1lbnRGcmFnbWVudCIsImFwcGVuZCIsImVycm9yIiwicmVzdWx0IiwianN4Tm9kZXMiLCJWTm9kZSIsImZvckVhY2giLCJzdGFydHNXaXRoIiwiZXZlbnQiLCJyZXBsYWNlIiwiYWRkRXZlbnRMaXN0ZW5lciIsInJlZiIsImF0dHJzIiwic3ZnQ29udGV4dFNldCIsImNyZWF0ZUVsZW1lbnROUyIsInB1c2giLCJfa2V5Iiwic2V0QXR0cmlidXRlIiwiU3RyaW5nIiwiY2hpbGRKc3hOb2RlcyIsImluc2VydE5ld0l0ZW0iLCJuZXdOb2RlIiwiaW5zZXJ0QmVmb3JlIiwiZGlmZkFuZFBhdGNoQ2hpbGRyZW4iLCJvbGROb2RlIiwib2xkQ2hpbGQiLCJpeCIsIm5ld0NoaWxkIiwicmVtb3ZlRnJvbURPTSIsInR5cGUiLCJkaWZmQW5kUGF0Y2giLCJuZXdJdGVtcyIsInNsaWNlIiwibGVuZ3RoIiwiRWxlbWVudFZOb2RlIiwiRnJhZ21lbnRWTm9kZSIsIk5vZGUiLCJMaXZlTm9kZVZOb2RlIiwiTnVsbFZOb2RlIiwiVGV4dFZOb2RlIiwic2V0IiwicGFyZW50RWxlbWVudCIsInJlbW92ZUNoaWxkIiwicmVtb3ZlQXR0cmlidXRlIiwiaGFzT3duUHJvcGVydHkiLCJyZXBsYWNlV2l0aCIsIm5ld1ZOb2RlIiwidGV4dE5vZGUiLCJjcmVhdGVUZXh0Tm9kZSIsIm5vZGVWYWx1ZSIsIm5ld05vZGUyIiwiUm9vdFZOb2RlIiwiZG9tTm9kZSIsInJlbW92ZSIsImFzVk5vZGUiLCJsb2ciLCJhdHRyIiwianN4cyIsIkZyYWdtZW50IiwianN4IiwicmVuZGVyIiwibWFya3VwIiwiYm9keSIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJzdHlsZSIsImJhY2tncm91bmQiLCJpc1JlUmVuZGVyIiwiaGFzIiwiaW5zZXJ0QWRqYWNlbnRIVE1MIiwiaW5zZXJ0QWRqYWNlbnRFbGVtZW50IiwidlRyZWUiLCJvbGRWVHJlZSIsImdldCIsIm5ld1ZUcmVlIiwic3BsaWNlIiwiRXJyb3IiLCJyYXdIdG1sIiwidGVtcGxhdGUiLCJ4c3MiLCJSVEUiLCJ0eHQiLCJCdXR0b24iLCJkaXNhYmxlZCIsInJlZmxvZyIsIlNwYW4iLCJtb2RlIiwiQ29tcCIsIm51bSIsIm1hcmt1cDEiLCJtYXJrdXAyIiwiTkwiLCJtYXJrdXAzIiwiaW5mbyIsIm9iaiIsImEiLCJtYXJrdXA0IiwibWFya3VwNSIsIm1hcmt1cDYiLCJQb3BVcEluZm8iLCJIVE1MRWxlbWVudCIsImN1c3RvbUVsZW1lbnRzIiwiZGVmaW5lIiwicXVlcnlTZWxlY3RvciIsIkNvbXAyIiwiQ29tcDMiLCJ3aW5kb3ciLCJyZVJlbmRlcjEiLCJnZXRFbGVtZW50QnlJZCIsInJlUmVuZGVyMiIsInJlUmVuZGVyMyIsInNzIiwic3MyIiwicmVSZW5kZXI1YSIsInJlUmVuZGVyNWIiLCJyZVJlbmRlclJlZiIsInJlUmVuZGVyNmEiLCJyZVJlbmRlcjZiIl0sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtRQUNBOzs7UUFHQTtRQUNBOzs7Ozs7Ozs7Ozs7O0FDbEZBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLE1BQU1BLGNBQWMsR0FBRyxJQUFJQyxPQUFKLEVBQXZCO0FBQ0EsTUFBTUMsVUFBNkIsR0FBRyxFQUF0QztBQUVBOzs7O0FBS0E7QUFDQTs7QUE0QkE7QUFDQTtBQUNBLE1BQU1DLE9BQU4sQ0FBYztBQUVaQyxhQUFXLENBQUNDLEtBQUQsRUFBa0I7QUFBQSxTQUQ3QkEsS0FDNkI7QUFDM0IsU0FBS0EsS0FBTCxHQUFhQSxLQUFiO0FBQ0Q7O0FBSlcsQyxDQU9kOzs7QUFDQSxTQUFTQyxvQkFBVCxDQUE4QkMsS0FBOUIsRUFBbUU7QUFDakUsU0FBT0EsS0FBSyxDQUFDQyxNQUFiLEVBQXFCO0FBQ25CRCxTQUFLLEdBQUdBLEtBQUssQ0FBQ0MsTUFBZCxDQURtQixDQUVuQjs7QUFDQSxRQUFJRCxLQUFLLENBQUNFLElBQVYsRUFBZ0I7QUFDakI7O0FBRUQsU0FBUUYsS0FBUjtBQUNEOztBQUVELFNBQVNHLG9CQUFULENBQ0VILEtBREYsRUFFRUksV0FGRixFQUdvQjtBQUNsQkosT0FBSyxDQUFDSyxRQUFOO0FBQ0EsU0FBT0wsS0FBSyxDQUFDSyxRQUFOLENBQ0pDLEdBREksQ0FDQ0MsU0FBRCxJQUFlO0FBQ2xCLFFBQUlBLFNBQVMsS0FBS0gsV0FBbEIsRUFBK0IsT0FBT0csU0FBUDtBQUMvQixRQUFJQSxTQUFTLENBQUNMLElBQWQsRUFBb0IsT0FBT0ssU0FBUDtBQUNwQixXQUFPSixvQkFBb0IsQ0FBQ0ksU0FBRCxFQUFZSCxXQUFaLENBQTNCO0FBQ0QsR0FMSSxFQU1KSSxJQU5JLENBTUNDLFFBTkQsQ0FBUDtBQU9EOztBQUVELFNBQVNDLHVCQUFULENBQWlDVixLQUFqQyxFQUE2RTtBQUMzRTtBQUNBLFFBQU1XLGlCQUFpQixHQUFHWixvQkFBb0IsQ0FBQ0MsS0FBRCxDQUE5QztBQUNBLFFBQU1ZLFFBQVEsR0FBR1Qsb0JBQW9CLENBQUNRLGlCQUFELEVBQW9CWCxLQUFwQixDQUFyQztBQUNBLFFBQU1hLFdBQVcsR0FBR0QsUUFBUSxDQUFDQSxRQUFRLENBQUNFLE9BQVQsQ0FBaUJkLEtBQWpCLElBQTBCLENBQTNCLENBQTVCO0FBQ0EsUUFBTWUsZUFBZSxHQUFHRixXQUFXLEdBQUdBLFdBQVcsQ0FBQ1gsSUFBWixDQUFrQmMsV0FBckIsR0FBbUMsSUFBdEU7QUFFQSxTQUFPLENBQUNMLGlCQUFpQixDQUFDVCxJQUFuQixFQUF5QmEsZUFBekIsQ0FBUDtBQUNELEMsQ0FFRDs7O0FBQ0EsTUFBTUUsU0FBUyxHQUFHQyxNQUFNLENBQUMsVUFBRCxDQUF4QixDLENBRUE7OztBQUNBLElBQUlDLFVBQVUsR0FBRyxLQUFqQixDLENBRUE7O0FBUUE7Ozs7O0FBS0EsU0FBU0MsTUFBVCxDQUFnQkMsS0FBaEIsRUFBcUM7QUFDbkMsU0FBT0EsS0FBSyxLQUFLLEtBQVYsSUFBbUJBLEtBQUssS0FBSyxJQUE3QixJQUFxQ0EsS0FBSyxLQUFLQyxTQUF0RDtBQUNEO0FBRUQ7Ozs7Ozs7O0FBTUEsU0FBU0MsUUFBVCxDQUFrQkMsSUFBbEIsRUFBd0M7QUFDdEMsUUFBTUMsR0FBRyxHQUFHQyxRQUFRLENBQUNDLGFBQVQsQ0FBdUIsS0FBdkIsQ0FBWjtBQUNBRixLQUFHLENBQUNHLFNBQUosR0FBZ0JKLElBQWhCO0FBQ0EsU0FBT0MsR0FBRyxDQUFDSSxTQUFYO0FBQ0Q7QUFFRDs7Ozs7O0FBSUEsU0FBU0MsWUFBVCxDQUFzQkMsT0FBdEIsRUFBNkM7QUFDM0MsTUFBSUEsT0FBTyxZQUFZQyxPQUF2QixFQUFnQyxPQUFPRCxPQUFPLENBQUNFLFNBQWY7QUFDaEMsTUFBSUYsT0FBTyxZQUFZRyxJQUF2QixFQUE2QixPQUFPWCxRQUFRLENBQUNRLE9BQU8sQ0FBQ0ksU0FBVCxDQUFmO0FBQzdCLE1BQUlKLE9BQU8sWUFBWUssZ0JBQXZCLEVBQ0UsT0FBT0MsS0FBSyxDQUFDQyxJQUFOLENBQVdQLE9BQU8sQ0FBQ1EsVUFBbkIsRUFDSmpDLEdBREksQ0FDQ2tDLEVBQUQsSUFBUVYsWUFBWSxDQUFDVSxFQUFELENBRHBCLEVBRUpDLElBRkksQ0FFQyxFQUZELENBQVAsQ0FKeUMsQ0FRM0M7O0FBQ0FDLFNBQU8sQ0FBQ0MsSUFBUixDQUFhLG9EQUFiLEVBQW1FWixPQUFuRTtBQUNBLFNBQU8sRUFBUDtBQUNEO0FBRUQ7Ozs7Ozs7O0FBTUEsU0FBU2EsWUFBVCxDQUFzQkMsR0FBdEIsRUFBOEMvQyxLQUE5QyxFQUErRE8sUUFBL0QsRUFBeUU7QUFDdkUsUUFBTXlDLFVBQVUsR0FBR0MsTUFBTSxDQUFDQyxPQUFQLENBQWVsRCxLQUFmLEVBQ2hCbUQsTUFEZ0IsQ0FDVCxDQUFDLEdBQUc1QixLQUFILENBQUQsS0FBZUQsTUFBTSxDQUFDQyxLQUFELENBRFosRUFFaEJmLEdBRmdCLENBRVosQ0FBQyxDQUFDNEMsR0FBRCxFQUFNN0IsS0FBTixDQUFELEtBQWtCO0FBQ3JCO0FBQ0EsUUFBSUEsS0FBSyxLQUFLLElBQWQsRUFBb0IsT0FBTzZCLEdBQVAsQ0FGQyxDQUlyQjtBQUNBOztBQUNBLFFBQUlBLEdBQUcsS0FBSyxPQUFSLElBQW1CLE9BQU83QixLQUFQLEtBQWlCLFFBQXhDLEVBQ0VBLEtBQUssR0FBRzBCLE1BQU0sQ0FBQ0MsT0FBUCxDQUFlM0IsS0FBZixFQUNOO0FBRE0sS0FFTDRCLE1BRkssQ0FFRSxDQUFDLEdBQUdFLENBQUgsQ0FBRCxLQUFXL0IsTUFBTSxDQUFDK0IsQ0FBRCxDQUZuQixFQUdOO0FBSE0sS0FJTDdDLEdBSkssQ0FJRCxDQUFDLENBQUM4QyxDQUFELEVBQUlELENBQUosQ0FBRCxLQUFhLEdBQUVDLENBQUUsS0FBSUQsQ0FBRSxFQUp0QixFQUtMVixJQUxLLENBS0EsSUFMQSxDQUFSLENBUG1CLENBY3JCOztBQUNBLFFBQUlTLEdBQUcsS0FBSyxPQUFSLElBQW1CYixLQUFLLENBQUNnQixPQUFOLENBQWNoQyxLQUFkLENBQXZCLEVBQTZDQSxLQUFLLEdBQUdBLEtBQUssQ0FBQ29CLElBQU4sQ0FBVyxHQUFYLENBQVI7QUFFN0MsV0FBUSxHQUFFUyxHQUFJLEtBQUk3QixLQUFNLEdBQXhCO0FBQ0QsR0FwQmdCLEVBcUJoQm9CLElBckJnQixDQXFCWCxHQXJCVyxDQUFuQjtBQXVCQSxRQUFNYSxPQUFPLEdBQUdqRCxRQUFRLENBQUNDLEdBQVQsQ0FBY2lELEtBQUQsSUFBV0EsS0FBSyxDQUFDQyxRQUFOLEVBQXhCLEVBQTBDZixJQUExQyxDQUErQyxFQUEvQyxDQUFoQjtBQUVBLFNBQVEsSUFBR0ksR0FBSSxJQUFHQyxVQUFXLElBQUdRLE9BQVEsS0FBSVQsR0FBSSxHQUFoRDtBQUNEO0FBRUQ7Ozs7Ozs7QUFLQSxTQUFTWSxNQUFULENBQ0VaLEdBREYsRUFFRS9DLEtBRkYsRUFFeUM7QUFDdkNPLFFBSEYsRUFJOEI7QUFDNUI7QUFDQSxNQUFJLENBQUN3QyxHQUFMLEVBQVU7QUFDUixVQUFNYSxTQUFTLEdBQUdyRCxRQUFRLENBQ3ZCRyxJQURlLEdBQ1I7QUFEUSxLQUVmRixHQUZlLENBRVZxRCxJQUFELElBQVVBLElBQUksQ0FBQ0YsTUFBTCxFQUZDLENBQWxCO0FBSUEsVUFBTUcsZ0JBQWdCLEdBQUdsQyxRQUFRLENBQUNtQyxzQkFBVCxFQUF6QjtBQUVBRCxvQkFBZ0IsQ0FBQ0UsTUFBakIsQ0FBd0IsR0FBR0osU0FBM0I7QUFDQSxXQUFPLENBQUNFLGdCQUFELEVBQW1CLEVBQW5CLENBQVA7QUFDRCxHQVgyQixDQWE1Qjs7O0FBQ0EsTUFBSSxPQUFPZixHQUFQLEtBQWUsVUFBbkIsRUFBK0I7QUFDN0JILFdBQU8sQ0FBQ3FCLEtBQVIsQ0FBYyxvQ0FBZCxFQUQ2QixDQUU3QjtBQUNBOztBQUNBLFFBQUlDLE1BQU0sR0FBR25CLEdBQUcsQ0FBQy9DLEtBQUQsQ0FBaEI7QUFFQSxRQUFJbUUsUUFBNEIsR0FBRyxFQUFuQzs7QUFFQSxRQUFJRCxNQUFNLFlBQVlFLEtBQXRCLEVBQTZCO0FBQzNCRCxjQUFRLEdBQUcsQ0FBQ0QsTUFBRCxDQUFYO0FBQ0FBLFlBQU0sR0FBSUEsTUFBRCxDQUE2QlAsTUFBN0IsRUFBVDtBQUNBVixZQUFNLENBQUNDLE9BQVAsQ0FBZWxELEtBQWYsRUFBc0JxRSxPQUF0QixDQUE4QixDQUFDLENBQUNqQixHQUFELEVBQU03QixLQUFOLENBQUQsS0FBa0I7QUFDOUMsWUFDRTZCLEdBQUcsQ0FBQ2tCLFVBQUosQ0FBZSxLQUFmLE1BQ0MsT0FBTy9DLEtBQVAsS0FBaUIsVUFBakIsSUFBK0IsT0FBT0EsS0FBUCxLQUFpQixRQURqRCxDQURGLEVBR0U7QUFDQTtBQUNBLGdCQUFNZ0QsS0FBSyxHQUFHbkIsR0FBRyxDQUFDb0IsT0FBSixDQUFZLE1BQVosRUFBb0IsRUFBcEIsQ0FBZDtBQUVBTixnQkFBTSxDQUFDTyxnQkFBUCxDQUNFRixLQURGLEVBRUVoRCxLQUZGO0FBSUQ7QUFDRixPQWJEO0FBY0Q7O0FBRUQsV0FBTyxDQUFDMkMsTUFBRCxFQUFTQyxRQUFULENBQVA7QUFDRDs7QUFFRCxRQUFNO0FBQUVPLE9BQUY7QUFBTyxPQUFHQztBQUFWLE1BQW9CM0UsS0FBMUIsQ0E1QzRCLENBOEM1Qjs7QUFDQSxNQUFJNEUsYUFBYSxHQUFHLEtBQXBCLENBL0M0QixDQWlENUI7QUFDQTs7QUFDQSxNQUFJLENBQUN2RCxVQUFELElBQWUwQixHQUFHLEtBQUssS0FBM0IsRUFBa0M7QUFDaEMxQixjQUFVLEdBQUcsSUFBYjtBQUNBdUQsaUJBQWEsR0FBRyxJQUFoQjtBQUNELEdBdEQyQixDQXdENUI7OztBQUNBLFFBQU14RSxJQUFJLEdBQUdpQixVQUFVLEdBQ25CTyxRQUFRLENBQUNpRCxlQUFULENBQXlCLDRCQUF6QixFQUF1RDlCLEdBQXZELENBRG1CLEdBRW5CbkIsUUFBUSxDQUFDQyxhQUFULENBQXVCa0IsR0FBdkIsQ0FGSixDQXpENEIsQ0E2RDVCOztBQUNBLE1BQUksT0FBTzJCLEdBQVAsS0FBZSxVQUFuQixFQUErQjtBQUM3QjdFLGNBQVUsQ0FBQ2lGLElBQVgsQ0FBZ0IsTUFBTUosR0FBRyxDQUFDdEUsSUFBRCxDQUF6QjtBQUNEOztBQUVENkMsUUFBTSxDQUFDQyxPQUFQLENBQWV5QixLQUFmLEVBQ0d4QixNQURILENBQ1UsQ0FBQyxDQUFDNEIsSUFBRCxFQUFPeEQsS0FBUCxDQUFELEtBQW1CRCxNQUFNLENBQUNDLEtBQUQsQ0FEbkMsRUFFRzhDLE9BRkgsQ0FFVyxDQUFDLENBQUNqQixHQUFELEVBQU03QixLQUFOLENBQUQsS0FBa0I7QUFDekI7QUFDQTtBQUNBLFFBQUk2QixHQUFHLEtBQUssT0FBUixJQUFtQixPQUFPN0IsS0FBUCxLQUFpQixRQUF4QyxFQUNFQSxLQUFLLEdBQUcwQixNQUFNLENBQUNDLE9BQVAsQ0FBZTNCLEtBQWYsRUFDTDRCLE1BREssQ0FDRSxDQUFDLEdBQUdFLENBQUgsQ0FBRCxLQUFXL0IsTUFBTSxDQUFDK0IsQ0FBRCxDQURuQixFQUVMN0MsR0FGSyxDQUVELENBQUMsQ0FBQzhDLENBQUQsRUFBSUQsQ0FBSixDQUFELEtBQWEsR0FBRUMsQ0FBRSxLQUFJRCxDQUFFLEVBRnRCLEVBR0xWLElBSEssQ0FHQSxJQUhBLENBQVIsQ0FKdUIsQ0FTekI7O0FBQ0EsUUFBSVMsR0FBRyxLQUFLLE9BQVIsSUFBbUJiLEtBQUssQ0FBQ2dCLE9BQU4sQ0FBY2hDLEtBQWQsQ0FBdkIsRUFBNkNBLEtBQUssR0FBR0EsS0FBSyxDQUFDb0IsSUFBTixDQUFXLEdBQVgsQ0FBUjtBQUU3QyxRQUFJcEIsS0FBSyxLQUFLLElBQWQsRUFBb0JuQixJQUFJLENBQUM0RSxZQUFMLENBQWtCNUIsR0FBbEIsRUFBdUIsRUFBdkIsRUFBcEIsS0FDSyxJQUFJLE9BQU83QixLQUFQLEtBQWlCLFFBQWpCLElBQTZCLE9BQU9BLEtBQVAsS0FBaUIsUUFBbEQsRUFDSG5CLElBQUksQ0FBQzRFLFlBQUwsQ0FBa0I1QixHQUFsQixFQUF1QjZCLE1BQU0sQ0FBQzFELEtBQUQsQ0FBN0IsRUFERyxDQUVMO0FBRkssU0FHQSxJQUNINkIsR0FBRyxDQUFDa0IsVUFBSixDQUFlLEtBQWYsTUFDQyxPQUFPL0MsS0FBUCxLQUFpQixVQUFqQixJQUErQixPQUFPQSxLQUFQLEtBQWlCLFFBRGpELENBREcsRUFHSDtBQUNBO0FBQ0EsY0FBTWdELEtBQUssR0FBR25CLEdBQUcsQ0FBQ29CLE9BQUosQ0FBWSxNQUFaLEVBQW9CLEVBQXBCLENBQWQ7QUFFQXBFLFlBQUksQ0FBQ3FFLGdCQUFMLENBQ0VGLEtBREYsRUFFRWhELEtBRkY7QUFJRCxPQVhJLENBWUw7QUFaSyxXQWFBbkIsSUFBSSxDQUFDZ0QsR0FBRCxDQUFKLEdBQVk3QixLQUFaO0FBQ04sR0FoQ0gsRUFsRTRCLENBb0c1Qjs7QUFDQSxRQUFNMkQsYUFBYSxHQUFHM0UsUUFBUSxDQUFDNEMsTUFBVCxDQUFpQk0sS0FBRCxJQUFXQSxLQUFLLFlBQVlXLEtBQTVDLENBQXRCO0FBRUFoRSxNQUFJLENBQUM0RCxNQUFMLENBQ0UsR0FBR3pELFFBQVEsQ0FDVDtBQURTLEdBRVJDLEdBRkEsQ0FFS2lELEtBQUQsSUFBV0EsS0FBSyxDQUFDRSxNQUFOLEVBRmYsQ0FETCxFQXZHNEIsQ0E2RzVCOztBQUNBLE1BQUlpQixhQUFKLEVBQW1CdkQsVUFBVSxHQUFHLEtBQWI7QUFFbkIsU0FBTyxDQUFDakIsSUFBRCxFQUFPOEUsYUFBUCxDQUFQO0FBQ0Q7O0FBRUQsU0FBU0MsYUFBVCxDQUF1QkMsT0FBdkIsRUFBZ0Q7QUFDOUMsUUFBTSxDQUFDakYsTUFBRCxFQUFTZSxXQUFULElBQXdCTix1QkFBdUIsQ0FBQ3dFLE9BQUQsQ0FBckQ7QUFDQWpGLFFBQU0sQ0FBQ2tGLFlBQVAsQ0FBb0JELE9BQU8sQ0FBQ3pCLE1BQVIsRUFBcEIsRUFBc0N6QyxXQUF0QztBQUNEOztBQUVELFNBQVNvRSxvQkFBVCxDQUNFQyxPQURGLEVBRUVILE9BRkYsRUFHRTtBQUNBRyxTQUFPLENBQUNoRixRQUFSLENBQWlCOEQsT0FBakIsQ0FBeUIsQ0FBQ21CLFFBQUQsRUFBV0MsRUFBWCxLQUFrQjtBQUN6QyxVQUFNQyxRQUFRLEdBQUdOLE9BQU8sQ0FBQzdFLFFBQVIsQ0FBaUJrRixFQUFqQixDQUFqQixDQUR5QyxDQUV6Qzs7QUFDQSxRQUFJLENBQUNDLFFBQUwsRUFBZUYsUUFBUSxDQUFDRyxhQUFULEdBQWYsQ0FDQTtBQURBLFNBRUssSUFBSUQsUUFBUSxDQUFDRSxJQUFULEtBQWtCSixRQUFRLENBQUNJLElBQS9CLEVBQXFDSixRQUFRLENBQUNLLFlBQVQsQ0FBc0JILFFBQXRCLEVBQXJDLENBQ0w7QUFESyxXQUVBO0FBQ0hGLGtCQUFRLENBQUNHLGFBQVQ7QUFDQVIsdUJBQWEsQ0FBQ08sUUFBRCxDQUFiO0FBQ0Q7QUFDRixHQVhELEVBREEsQ0FjQTs7QUFDQSxRQUFNSSxRQUFRLEdBQUdWLE9BQU8sQ0FBQzdFLFFBQVIsQ0FBaUJ3RixLQUFqQixDQUF1QlIsT0FBTyxDQUFDaEYsUUFBUixDQUFpQnlGLE1BQXhDLENBQWpCOztBQUNBLE1BQUlGLFFBQVEsQ0FBQ0UsTUFBYixFQUFxQjtBQUNuQixVQUFNbEMsZ0JBQWdCLEdBQUdsQyxRQUFRLENBQUNtQyxzQkFBVCxFQUF6QjtBQUNBK0IsWUFBUSxDQUFDekIsT0FBVCxDQUFrQlIsSUFBRCxJQUFVQyxnQkFBZ0IsQ0FBQ0UsTUFBakIsQ0FBd0JILElBQUksQ0FBQ0YsTUFBTCxFQUF4QixDQUEzQjtBQUVBLFVBQU0sQ0FBQ3hELE1BQUQsRUFBU2UsV0FBVCxJQUF3Qk4sdUJBQXVCLENBQUNrRixRQUFRLENBQUMsQ0FBRCxDQUFULENBQXJEO0FBQ0EzRixVQUFNLENBQUNrRixZQUFQLENBQW9CdkIsZ0JBQXBCLEVBQXNDNUMsV0FBdEM7QUFDRDtBQUNGOztBQUVELE1BQU1rRCxLQUFOLENBQVk7O0FBYVosTUFBTTZCLFlBQU4sU0FBMkI3QixLQUEzQixDQUEyRDtBQU16RHJFLGFBQVcsQ0FDRGdELEdBREMsRUFFRC9DLEtBRkMsRUFHVE8sUUFIUyxFQUlUO0FBQ0E7QUFEQSxTQUhRd0MsR0FHUixHQUhRQSxHQUdSO0FBQUEsU0FGUS9DLEtBRVIsR0FGUUEsS0FFUjtBQUFBLFNBVEY0RixJQVNFLEdBVEssU0FTTDtBQUFBLFNBUkZ4RixJQVFFLEdBUmtCLElBUWxCO0FBQUEsU0FQRkcsUUFPRTtBQUFBLFNBTkZKLE1BTUUsR0FOdUIsSUFNdkI7QUFFQSxTQUFLSSxRQUFMLEdBQWdCQSxRQUFRLENBQUNDLEdBQVQsQ0FBY2lELEtBQUQsSUFBVztBQUN0QyxVQUFJbEIsS0FBSyxDQUFDZ0IsT0FBTixDQUFjRSxLQUFkLENBQUosRUFBMEIsT0FBTyxJQUFJeUMsYUFBSixDQUFrQnpDLEtBQWxCLENBQVA7O0FBQzFCLFVBQUlBLEtBQUssWUFBWVcsS0FBckIsRUFBNEI7QUFDMUIsZUFBT1gsS0FBUDtBQUNEOztBQUNELFVBQUlBLEtBQUssWUFBWTBDLElBQXJCLEVBQTJCO0FBQ3pCLGVBQU8sSUFBSUMsYUFBSixDQUFrQjNDLEtBQWxCLENBQVA7QUFDRDs7QUFDRCxVQUFJLENBQUNuQyxNQUFNLENBQUNtQyxLQUFELENBQVgsRUFBb0I7QUFDbEIsZUFBTyxJQUFJNEMsU0FBSixFQUFQO0FBQ0Q7O0FBRUQsYUFBTyxJQUFJQyxTQUFKLENBQWM3QyxLQUFkLENBQVA7QUFDRCxLQWJlLENBQWhCO0FBY0EsU0FBS2xELFFBQUwsQ0FBYzhELE9BQWQsQ0FBdUJaLEtBQUQsSUFBWUEsS0FBSyxDQUFDdEQsTUFBTixHQUFlLElBQWpEO0FBQ0Q7O0FBQ0R1RCxVQUFRLEdBQUc7QUFDVCxXQUFPWixZQUFZLENBQUMsS0FBS0MsR0FBTixFQUFXLEtBQUsvQyxLQUFoQixFQUF1QixLQUFLTyxRQUE1QixDQUFuQjtBQUNEOztBQUNEb0QsUUFBTSxHQUFHO0FBQ1AsVUFBTXZELElBQUksR0FBR3VELE1BQU0sQ0FBQyxLQUFLWixHQUFOLEVBQVcsS0FBSy9DLEtBQWhCLEVBQXVCLEtBQUtPLFFBQTVCLENBQU4sQ0FBNEMsQ0FBNUMsQ0FBYjtBQUNBLFNBQUtILElBQUwsR0FBWUEsSUFBWixDQUZPLENBSVA7O0FBQ0FULGtCQUFjLENBQUM0RyxHQUFmLENBQW1CbkcsSUFBbkIsRUFBeUIsSUFBekI7QUFFQSxXQUFPQSxJQUFQO0FBQ0Q7O0FBQ0R1RixlQUFhLEdBQUc7QUFDZCxTQUFLdkYsSUFBTCxDQUFVb0csYUFBVixDQUF3QkMsV0FBeEIsQ0FBb0MsS0FBS3JHLElBQXpDO0FBQ0Q7O0FBQ0R5RixjQUFZLENBQUNULE9BQUQsRUFBd0I7QUFDbEMsUUFBSUEsT0FBTyxDQUFDckMsR0FBUixLQUFnQixLQUFLQSxHQUF6QixFQUE4QjtBQUM1QnFDLGFBQU8sQ0FBQ2hGLElBQVIsR0FBZSxLQUFLQSxJQUFwQixDQUQ0QixDQUU1QjtBQUNBOztBQUNBNkMsWUFBTSxDQUFDQyxPQUFQLENBQWVrQyxPQUFPLENBQUNwRixLQUF2QixFQUNHbUQsTUFESCxDQUNVLENBQUMsQ0FBQ0csQ0FBRCxFQUFJRCxDQUFKLENBQUQsS0FBWSxLQUFLckQsS0FBTCxDQUFXc0QsQ0FBWCxNQUFrQkQsQ0FEeEMsRUFFR2dCLE9BRkgsQ0FFVyxDQUFDLENBQUNqQixHQUFELEVBQU03QixLQUFOLENBQUQsS0FBa0I7QUFDekIsWUFBSUEsS0FBSyxLQUFLLElBQWQsRUFBb0I2RCxPQUFPLENBQUNoRixJQUFSLENBQWE0RSxZQUFiLENBQTBCNUIsR0FBMUIsRUFBK0IsRUFBL0IsRUFBcEIsS0FDSyxJQUFJN0IsS0FBSyxLQUFLLElBQVYsSUFBa0JBLEtBQUssS0FBS0MsU0FBNUIsSUFBeUNELEtBQUssS0FBSyxLQUF2RCxFQUNINkQsT0FBTyxDQUFDaEYsSUFBUixDQUFhc0csZUFBYixDQUE2QnRELEdBQTdCLEVBREcsS0FFQWdDLE9BQU8sQ0FBQ2hGLElBQVIsQ0FBYTRFLFlBQWIsQ0FBMEI1QixHQUExQixFQUErQjdCLEtBQS9CO0FBQ04sT0FQSCxFQUo0QixDQWE1Qjs7QUFDQTBCLFlBQU0sQ0FBQ0MsT0FBUCxDQUFlLEtBQUtsRCxLQUFwQixFQUNHbUQsTUFESCxDQUNVLENBQUMsQ0FBQ0csQ0FBRCxFQUFJRCxDQUFKLENBQUQsS0FBWSxDQUFDK0IsT0FBTyxDQUFDcEYsS0FBUixDQUFjMkcsY0FBZCxDQUE2QnJELENBQTdCLENBRHZCLEVBRUdlLE9BRkgsQ0FFVyxDQUFDLENBQUNqQixHQUFELEVBQU03QixLQUFOLENBQUQsS0FBa0I7QUFDekIsYUFBS25CLElBQUwsQ0FBVXNHLGVBQVYsQ0FBMEJ0RCxHQUExQjtBQUNELE9BSkgsRUFkNEIsQ0FvQjVCO0FBQ0E7O0FBQ0FrQywwQkFBb0IsQ0FBQyxJQUFELEVBQU9GLE9BQVAsQ0FBcEI7QUFDRCxLQXZCRCxDQXdCQTtBQXhCQSxTQXlCSztBQUNILGFBQUtoRixJQUFMLENBQVV3RyxXQUFWLENBQXNCeEIsT0FBTyxDQUFDekIsTUFBUixFQUF0QjtBQUNELE9BNUJpQyxDQThCbEM7OztBQUNBaEUsa0JBQWMsQ0FBQzRHLEdBQWYsQ0FBbUIsS0FBS25HLElBQXhCLEVBQThCZ0YsT0FBOUI7QUFDRDs7QUEzRXdEOztBQThFM0QsTUFBTWMsYUFBTixTQUE0QjlCLEtBQTVCLENBQTREO0FBSTFEckUsYUFBVyxDQUNUUSxRQURTLEVBSVQ7QUFDQTtBQURBLFNBUEZxRixJQU9FLEdBUEssVUFPTDtBQUFBLFNBTkZyRixRQU1FO0FBR0EsU0FBS0EsUUFBTCxHQUFnQkEsUUFBUSxDQUFDQyxHQUFULENBQWNpRCxLQUFELElBQVc7QUFDdEMsVUFBSWxCLEtBQUssQ0FBQ2dCLE9BQU4sQ0FBY0UsS0FBZCxDQUFKLEVBQTBCLE9BQU8sSUFBSXlDLGFBQUosQ0FBa0J6QyxLQUFsQixDQUFQO0FBQzFCLFVBQUlBLEtBQUssWUFBWVcsS0FBckIsRUFBNEIsT0FBT1gsS0FBUDtBQUM1QixVQUFJQSxLQUFLLFlBQVkwQyxJQUFyQixFQUEyQixPQUFPLElBQUlDLGFBQUosQ0FBa0IzQyxLQUFsQixDQUFQO0FBQzNCLFVBQUksQ0FBQ25DLE1BQU0sQ0FBQ21DLEtBQUQsQ0FBWCxFQUFvQixPQUFPLElBQUk0QyxTQUFKLEVBQVA7QUFDcEIsYUFBTyxJQUFJQyxTQUFKLENBQWM3QyxLQUFkLENBQVA7QUFDRCxLQU5lLENBQWhCO0FBUUEsU0FBS2xELFFBQUwsQ0FBYzhELE9BQWQsQ0FBdUJaLEtBQUQsSUFBWUEsS0FBSyxDQUFDdEQsTUFBTixHQUFlLElBQWpEO0FBQ0Q7O0FBRUR3RCxRQUFNLEdBQUc7QUFDUCxVQUFNdkQsSUFBSSxHQUFHdUQsTUFBTSxDQUFDbkMsU0FBRCxFQUFZLEVBQVosRUFBZ0IsS0FBS2pCLFFBQXJCLENBQU4sQ0FBcUMsQ0FBckMsQ0FBYjtBQUVBLFdBQU9ILElBQVA7QUFDRDs7QUFFRHNELFVBQVEsR0FBRztBQUNULFdBQU8sS0FBS25ELFFBQUwsQ0FBY0MsR0FBZCxDQUFtQmlELEtBQUQsSUFBV0EsS0FBSyxDQUFDQyxRQUFOLEVBQTdCLEVBQStDZixJQUEvQyxDQUFvRCxFQUFwRCxDQUFQO0FBQ0QsR0E5QnlELENBZ0MxRDs7O0FBQ0FrRCxjQUFZLENBQUNnQixRQUFELEVBQTBCO0FBQ3BDLFdBQU92QixvQkFBb0IsQ0FBQyxJQUFELEVBQU91QixRQUFQLENBQTNCO0FBQ0Q7O0FBRURsQixlQUFhLEdBQUc7QUFDZCxTQUFLcEYsUUFBTCxDQUFjOEQsT0FBZCxDQUF1QlosS0FBRCxJQUFXQSxLQUFLLENBQUNrQyxhQUFOLEVBQWpDO0FBQ0Q7O0FBdkN5RDs7QUEwQzVELE1BQU1XLFNBQU4sU0FBd0JsQyxLQUF4QixDQUF3RDtBQU90RDs7O0FBR0FyRSxhQUFXLENBQUN5RCxPQUFELEVBQXFDO0FBQzlDO0FBRDhDLFNBVGhEb0MsSUFTZ0QsR0FUekMsVUFTeUM7QUFBQSxTQVJoRHJGLFFBUWdELEdBUnJDLEVBUXFDO0FBQUEsU0FQaERILElBT2dELEdBUG5DLElBT21DO0FBQUEsU0FOaERKLEtBTWdEO0FBQUEsU0FMaERHLE1BS2dELEdBTHZCLElBS3VCO0FBRTlDLFNBQUtILEtBQUwsR0FBYTtBQUFFd0Q7QUFBRixLQUFiLENBRjhDLENBRXBCO0FBQzNCOztBQUVERyxRQUFNLEdBQUc7QUFDUCxVQUFNbUQsUUFBUSxHQUFHbEYsUUFBUSxDQUFDbUYsY0FBVCxDQUF3QixLQUFLL0csS0FBTCxDQUFXd0QsT0FBbkMsQ0FBakI7QUFDQSxTQUFLcEQsSUFBTCxHQUFZMEcsUUFBWjtBQUNBLFdBQU9BLFFBQVA7QUFDRDs7QUFFRHBELFVBQVEsR0FBRztBQUNULFdBQU9qQyxRQUFRLENBQUMsS0FBS3pCLEtBQUwsQ0FBV3dELE9BQVosQ0FBZjtBQUNEOztBQUVEcUMsY0FBWSxDQUFDVCxPQUFELEVBQXFCO0FBQy9CLFNBQUtoRixJQUFMLENBQVU0RyxTQUFWLEdBQXNCNUIsT0FBTyxDQUFDcEYsS0FBUixDQUFjd0QsT0FBcEM7QUFDQTRCLFdBQU8sQ0FBQ2hGLElBQVIsR0FBZSxLQUFLQSxJQUFwQjtBQUNEOztBQUVEdUYsZUFBYSxHQUFHO0FBQ2QsU0FBS3ZGLElBQUwsQ0FBVW9HLGFBQVYsQ0FBeUJDLFdBQXpCLENBQXFDLEtBQUtyRyxJQUExQztBQUNEOztBQWhDcUQ7O0FBbUN4RCxNQUFNaUcsU0FBTixTQUF3QmpDLEtBQXhCLENBQXdEO0FBSXREOzs7QUFHQXJFLGFBQVcsR0FBRztBQUNaO0FBRFksU0FOZDZGLElBTWMsR0FOUCxNQU1PO0FBQUEsU0FMZHJGLFFBS2MsR0FMSCxFQUtHO0FBQUEsU0FKZEosTUFJYyxHQUpXLElBSVg7QUFFYjs7QUFFRHdELFFBQU0sR0FBRztBQUNQO0FBQ0EsV0FBTy9CLFFBQVEsQ0FBQ21DLHNCQUFULEVBQVA7QUFDRDs7QUFFRDhCLGNBQVksQ0FBQ29CLFFBQUQsRUFBc0I7QUFDaEM7QUFDRDs7QUFFRHRCLGVBQWEsR0FBRztBQUNkO0FBQ0Q7O0FBRURqQyxVQUFRLEdBQUc7QUFDVCxXQUFPLEVBQVA7QUFDRDs7QUExQnFEOztBQTZCeEQsTUFBTTBDLGFBQU4sU0FBNEJoQyxLQUE1QixDQUE0RDtBQU0xRDs7O0FBR0FyRSxhQUFXLENBQUNLLElBQUQsRUFBa0I7QUFDM0I7QUFEMkIsU0FSN0J3RixJQVE2QixHQVJ0QixNQVFzQjtBQUFBLFNBUDdCckYsUUFPNkIsR0FQbEIsRUFPa0I7QUFBQSxTQU43QkosTUFNNkIsR0FOSixJQU1JO0FBQUEsU0FMN0JDLElBSzZCO0FBRTNCLFNBQUtBLElBQUwsR0FBWUEsSUFBWjtBQUNEOztBQUVEdUQsUUFBTSxHQUFHO0FBQ1AsV0FBTyxLQUFLdkQsSUFBWjtBQUNEOztBQUVEeUYsY0FBWSxDQUFDVCxPQUFELEVBQXlCO0FBQ25DLFFBQUlBLE9BQU8sQ0FBQ2hGLElBQVIsS0FBaUIsS0FBS0EsSUFBMUIsRUFBZ0M7QUFDOUIsV0FBS0EsSUFBTCxDQUFVd0csV0FBVixDQUFzQnhCLE9BQU8sQ0FBQ2hGLElBQTlCO0FBQ0Q7QUFDRjs7QUFFRHVGLGVBQWEsR0FBRztBQUNkLFNBQUt2RixJQUFMLENBQVVvRyxhQUFWLENBQXlCQyxXQUF6QixDQUFxQyxLQUFLckcsSUFBMUM7QUFDRDs7QUFFRHNELFVBQVEsR0FBRztBQUNULFdBQU8xQixZQUFZLENBQUMsS0FBSzVCLElBQU4sQ0FBbkI7QUFDRDs7QUE5QnlEOztBQWlDNUQsTUFBTThHLFNBQU4sU0FBd0I5QyxLQUF4QixDQUF3RDtBQUt0RDs7O0FBR0FyRSxhQUFXLENBQUN5RCxPQUFELEVBQTBCMkQsT0FBMUIsRUFBNEM7QUFDckQ7QUFEcUQsU0FQdkR2QixJQU91RCxHQVBoRCxNQU9nRDtBQUFBLFNBTnZEekYsTUFNdUQsR0FOOUMsSUFNOEM7QUFBQSxTQUx2REMsSUFLdUQ7QUFBQSxTQUp2REcsUUFJdUQ7QUFFckRpRCxXQUFPLENBQUNyRCxNQUFSLEdBQWlCLElBQWpCO0FBQ0EsU0FBS0ksUUFBTCxHQUFnQixDQUFDaUQsT0FBRCxDQUFoQjtBQUNBLFNBQUtwRCxJQUFMLEdBQVkrRyxPQUFaO0FBQ0Q7O0FBRUR4RCxRQUFNLEdBQUc7QUFDUCxXQUFPLEtBQUtwRCxRQUFMLENBQWMsQ0FBZCxFQUFpQm9ELE1BQWpCLEVBQVA7QUFDRDs7QUFDREQsVUFBUSxHQUFHO0FBQ1QsV0FBTyxLQUFLbkQsUUFBTCxDQUFjLENBQWQsRUFBaUJtRCxRQUFqQixFQUFQO0FBQ0Q7O0FBRURtQyxjQUFZLENBQUNnQixRQUFELEVBQTJCO0FBQ3JDdkIsd0JBQW9CLENBQUMsSUFBRCxFQUFPdUIsUUFBUCxDQUFwQjtBQUNEOztBQUVEbEIsZUFBYSxHQUFHO0FBQ2QsU0FBS3ZGLElBQUwsQ0FBVWdILE1BQVY7QUFDRDs7QUE1QnFEOztBQStCeEQsU0FBU0MsT0FBVCxDQUNFdEUsR0FERixFQUVFL0MsS0FGRixFQUdrQjtBQUNoQjRDLFNBQU8sQ0FBQzBFLEdBQVIsQ0FBWSxVQUFaLEVBQXdCO0FBQUV2RSxPQUFGO0FBQU8vQztBQUFQLEdBQXhCOztBQUVBLE1BQUksT0FBTytDLEdBQVAsS0FBZSxVQUFuQixFQUErQjtBQUM3QixRQUFJbUIsTUFBTSxHQUFHbkIsR0FBRyxDQUFDL0MsS0FBRCxDQUFoQjtBQUNBLFFBQUlrRSxNQUFNLFlBQVlFLEtBQXRCLEVBQTZCLE9BQU9GLE1BQVA7QUFDN0IsUUFBSUEsTUFBTSxZQUFZaUMsSUFBdEIsRUFBNEIsT0FBTyxJQUFJQyxhQUFKLENBQWtCbEMsTUFBbEIsQ0FBUCxDQUhDLENBSTdCOztBQUNBLFFBQUksQ0FBQzVDLE1BQU0sQ0FBQzRDLE1BQUQsQ0FBWCxFQUFxQixPQUFPLElBQUltQyxTQUFKLEVBQVA7QUFFckIsV0FBTyxJQUFJQyxTQUFKLENBQWNwQyxNQUFkLENBQVA7QUFDRDs7QUFFRCxRQUFNO0FBQUUzRCxZQUFGO0FBQVksT0FBR2dIO0FBQWYsTUFBd0J2SCxLQUE5Qjs7QUFDQSxNQUFJK0MsR0FBSixFQUFTO0FBQ1AsV0FBTyxJQUFJa0QsWUFBSixDQUFpQmxELEdBQWpCLEVBQXNCd0UsSUFBdEIsRUFBNEJoSCxRQUE1QixDQUFQLENBRE8sQ0FDdUM7QUFDL0MsR0FGRCxNQUVPLElBQUksQ0FBQ2UsTUFBTSxDQUFDaUcsSUFBRCxDQUFYLEVBQW1CO0FBQ3hCLFVBQU1ySCxLQUFLLEdBQUcsSUFBSW1HLFNBQUosRUFBZDtBQUNBbkcsU0FBSyxDQUFDQyxNQUFOLEdBQWUsSUFBZjtBQUNBLFdBQU9ELEtBQVA7QUFDRCxHQUpNLE1BSUEsSUFBSUssUUFBSixFQUFjO0FBQ25CLFdBQU8sSUFBSTJGLGFBQUosQ0FBa0IzRixRQUFsQixDQUFQO0FBQ0QsR0F0QmUsQ0F3QmhCOztBQUNEO0FBRUQ7Ozs7Ozs7OztBQU9PLFNBQVNpSCxJQUFULENBQ0x6RSxHQURLLEVBRUwvQyxLQUZLLEVBR2E7QUFDbEIsU0FBT3FILE9BQU8sQ0FBQ3RFLEdBQUQsRUFBTS9DLEtBQU4sQ0FBZDtBQUNEO0FBRUQ7Ozs7Ozs7QUFNTyxTQUFTeUgsUUFBVCxDQUFrQnpILEtBQWxCLEVBQW1DO0FBQ3hDLFNBQU9xSCxPQUFPLENBQUM3RixTQUFELEVBQVl4QixLQUFaLENBQWQ7QUFDRCxDLENBRUQ7O0FBQ08sU0FBUzBILEdBQVQsQ0FDTDNFLEdBREssRUFFTC9DLEtBRkssRUFJYTtBQUNsQjtBQUNBQSxPQUFLLENBQUNPLFFBQU4sR0FBaUJQLEtBQUssQ0FBQzJHLGNBQU4sQ0FBcUIsVUFBckIsSUFBbUMsQ0FBQzNHLEtBQUssQ0FBQ08sUUFBUCxDQUFuQyxHQUFzRCxFQUF2RTtBQUVBLFNBQU9pSCxJQUFJLENBQUN6RSxHQUFELEVBQU8vQyxLQUFQLENBQVg7QUFDRDtBQUVEOzs7Ozs7OztBQU9PLFNBQVMySCxNQUFULENBQ0xDLE1BREssRUFDNEM7QUFDakRULE9BRkssRUFHTG5ELE1BQWUsR0FBRyxLQUhiLEVBSUw7QUFDQXpCLE9BQUssQ0FBQ0MsSUFBTixDQUFXWixRQUFRLENBQUNpRyxJQUFULENBQWNDLGdCQUFkLENBQStCLEdBQS9CLENBQVgsRUFBZ0R6RCxPQUFoRCxDQUNHM0IsRUFBRCxJQUFTQSxFQUFFLENBQUNxRixLQUFILENBQVNDLFVBQVQsR0FBc0IsU0FEakM7QUFJQSxRQUFNQyxVQUFVLEdBQUd0SSxjQUFjLENBQUN1SSxHQUFmLENBQW1CZixPQUFuQixDQUFuQjtBQUNBLE1BQUksQ0FBQ25ELE1BQUQsSUFBVyxDQUFDaUUsVUFBaEIsRUFBNEJkLE9BQU8sQ0FBQ3BGLFNBQVIsR0FBb0IsRUFBcEI7O0FBRTVCLE1BQUksT0FBTzZGLE1BQVAsS0FBa0IsUUFBdEIsRUFBZ0M7QUFDOUJULFdBQU8sQ0FBQ2dCLGtCQUFSLENBQTJCLFdBQTNCLEVBQXdDUCxNQUF4QyxFQUQ4QixDQUNtQjtBQUNsRCxHQUZELE1BRU8sSUFBSUEsTUFBTSxZQUFZekIsSUFBdEIsRUFBNEI7QUFDakNnQixXQUFPLENBQUNpQixxQkFBUixDQUE4QixXQUE5QixFQUEyQ1IsTUFBM0M7QUFDRCxHQUZNLE1BRUEsSUFBSUEsTUFBTSxZQUFZeEQsS0FBdEIsRUFBNkI7QUFDbEMvQyxjQUFVLEdBQUcsS0FBYjtBQUVBLFVBQU1nSCxLQUFLLEdBQUcsSUFBSW5CLFNBQUosQ0FBY1UsTUFBZCxFQUFzQlQsT0FBdEIsQ0FBZDtBQUVBdkUsV0FBTyxDQUFDMEUsR0FBUixDQUFZLHFDQUFaLEVBQW1ELFFBQW5ELEVBQTZEZSxLQUE3RDs7QUFFQSxRQUFJSixVQUFKLEVBQWdCO0FBQ2RyRixhQUFPLENBQUMwRSxHQUFSLENBQVksY0FBWjtBQUNBLFlBQU1nQixRQUFRLEdBQUczSSxjQUFjLENBQUM0SSxHQUFmLENBQW1CcEIsT0FBbkIsQ0FBakI7QUFFQXZFLGFBQU8sQ0FBQzBFLEdBQVIsQ0FBWSxlQUFaLEVBQTZCO0FBQUVnQixnQkFBRjtBQUFZRSxnQkFBUSxFQUFFSDtBQUF0QixPQUE3QixFQUpjLENBTWQ7O0FBQ0EsVUFBSUMsUUFBUSxDQUFDMUMsSUFBVCxLQUFrQixTQUF0QixFQUFpQztBQUMvQjtBQUNBTiw0QkFBb0IsQ0FBQ2dELFFBQUQsRUFBV0QsS0FBWCxDQUFwQixDQUYrQixDQUcvQjtBQUNBOztBQUNBQyxnQkFBUSxDQUFDL0gsUUFBVCxHQUFvQjhILEtBQUssQ0FBQzlILFFBQTFCO0FBQ0QsT0FORCxNQU1PO0FBQ0w7QUFDQStILGdCQUFRLENBQUN6QyxZQUFULENBQXNCd0MsS0FBdEI7QUFDRDs7QUFFRDFJLG9CQUFjLENBQUM0RyxHQUFmLENBQW1CWSxPQUFuQixFQUE0QmtCLEtBQTVCO0FBQ0QsS0FuQkQsTUFtQk87QUFDTCxZQUFNN0UsT0FBTyxHQUFHNkUsS0FBSyxDQUFDMUUsTUFBTixFQUFoQjtBQUNBd0QsYUFBTyxDQUFDbkQsTUFBUixDQUFlUixPQUFmO0FBQ0Q7O0FBRUQ3RCxrQkFBYyxDQUFDNEcsR0FBZixDQUFtQlksT0FBbkIsRUFBNEJrQixLQUE1Qjs7QUFFQSxXQUFPeEksVUFBVSxDQUFDbUcsTUFBbEIsRUFBMEI7QUFDeEI7QUFDQW5HLGdCQUFVLENBQUM0SSxNQUFYLENBQWtCLENBQWxCLEVBQXFCLENBQXJCLEVBQXdCLENBQXhCO0FBQ0Q7QUFDRixHQXJDTSxNQXFDQTtBQUNMLFVBQU0sSUFBSUMsS0FBSixDQUFVLDZDQUFWLENBQU47QUFDRDtBQUNGO0FBRU0sU0FBU0MsT0FBVCxDQUFpQm5GLE9BQWpCLEVBQWtEO0FBQUE7O0FBQ3ZELFNBQU8sYUFBSyxjQUFjWSxLQUFkLENBQThDO0FBUXhEOzs7QUFHQXJFLGVBQVcsQ0FBQ3lELE9BQUQsRUFBa0I7QUFDM0I7QUFEMkIsV0FWN0JyRCxNQVU2QixHQVZKLElBVUk7QUFBQSxXQVQ3QkksUUFTNkIsR0FUbEIsRUFTa0I7QUFBQSxXQVI3QnFGLElBUTZCLEdBUnRCLFNBUXNCO0FBQUEsV0FQN0JuRCxVQU82QjtBQUFBLFdBTjdCZSxPQU02QjtBQUFBLFdBTDdCcEQsSUFLNkI7QUFFM0IsV0FBS29ELE9BQUwsR0FBZUEsT0FBZjtBQUNEOztBQUNEbUMsaUJBQWEsR0FBRztBQUNkLFdBQUtsRCxVQUFMLENBQWdCNEIsT0FBaEIsQ0FBeUJqRSxJQUFELElBQVVBLElBQUksQ0FBQ29HLGFBQUwsQ0FBb0JDLFdBQXBCLENBQWdDckcsSUFBaEMsQ0FBbEM7QUFDRDs7QUFFRHlGLGdCQUFZLENBQUNULE9BQUQsRUFBMEI7QUFDcEMsVUFBS0EsT0FBTyxDQUFDNUIsT0FBUixHQUFrQixLQUFLQSxPQUE1QixFQUFzQztBQUNwQzRCLGVBQU8sQ0FBQ2hGLElBQVIsR0FBZSxLQUFLQSxJQUFwQjtBQUNBZ0YsZUFBTyxDQUFDM0MsVUFBUixHQUFxQixLQUFLQSxVQUExQjtBQUNBO0FBQ0Q7O0FBQ0QsV0FBS2tELGFBQUw7QUFDQVIsbUJBQWEsQ0FBQ0MsT0FBRCxDQUFiO0FBQ0Q7O0FBRUQxQixZQUFRLEdBQUc7QUFDVCxhQUFPRixPQUFQO0FBQ0Q7O0FBRURHLFVBQU0sR0FBRztBQUNQLFlBQU1pRixRQUFRLEdBQUdoSCxRQUFRLENBQUNDLGFBQVQsQ0FBdUIsVUFBdkIsQ0FBakI7QUFDQStHLGNBQVEsQ0FBQzdHLFNBQVQsR0FBcUIsS0FBS3lCLE9BQTFCO0FBQ0EsWUFBTU0sZ0JBQWdCLEdBQUc4RSxRQUFRLENBQUNwRixPQUFsQztBQUNBLFdBQUtmLFVBQUwsR0FBa0JGLEtBQUssQ0FBQ0MsSUFBTixDQUFXc0IsZ0JBQWdCLENBQUNyQixVQUE1QixDQUFsQixDQUpPLENBTVA7QUFDQTtBQUNBOztBQUNBLFVBQUksS0FBS0EsVUFBTCxDQUFnQnVELE1BQXBCLEVBQ0UsS0FBSzVGLElBQUwsR0FBWSxLQUFLcUMsVUFBTCxDQUFnQixLQUFLQSxVQUFMLENBQWdCdUQsTUFBaEIsR0FBeUIsQ0FBekMsQ0FBWjtBQUNGLGFBQU9sQyxnQkFBUDtBQUNEOztBQUNEdUQsV0FBTyxHQUFHO0FBQ1IsYUFBTyxFQUFQO0FBQ0Q7O0FBRUQsS0FBQ2xHLFNBQUQsSUFBYyxDQUNaO0FBQ0Q7O0FBcER1RCxHQUFuRCxTQXFESnFDLE9BckRJLENBQVA7QUFzREQsQyxDQUVEO0FBQ0E7QUFDQSxxQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3h3QkE7QUFFQSxJQUFNcUYsR0FBRyxHQUFHLDZDQUFaLEMsQ0FBMkQ7O0FBRTNELFNBQVNDLEdBQVQsQ0FBYTlJLEtBQWIsRUFHRztBQUNENEMsU0FBTyxDQUFDMEUsR0FBUixDQUFZLFNBQVosRUFBdUJ0SCxLQUFLLENBQUMsVUFBRCxDQUE1QjtBQUNBLFNBQ0U7QUFBRyxPQUFHLEVBQUUsYUFBQzBDLEVBQUQ7QUFBQSxhQUFxQkUsT0FBTyxDQUFDMEUsR0FBUixDQUFZLG1CQUFaLEVBQWlDNUUsRUFBakMsQ0FBckI7QUFBQSxLQUFSO0FBQUEsY0FDRzFDLEtBQUssQ0FBQytJO0FBRFQsSUFERjtBQUtEOztBQUVELFNBQVNDLE1BQVQsT0FPRztBQUFBLE1BTkR6SSxRQU1DLFFBTkRBLFFBTUM7QUFBQSxNQUxEMEksUUFLQyxRQUxEQSxRQUtDO0FBQ0QsU0FDRTtBQUNFLFlBQVEsRUFBRUEsUUFEWjtBQUVFLE9BQUcsRUFBRSxhQUFDdkcsRUFBRDtBQUFBLGFBQXFCRSxPQUFPLENBQUMwRSxHQUFSLENBQVksb0JBQVosRUFBa0M1RSxFQUFsQyxDQUFyQjtBQUFBLEtBRlA7QUFBQSxlQUlFO0FBQU0sU0FBRyxFQUFFLGFBQUNBLEVBQUQ7QUFBQSxlQUFxQkUsT0FBTyxDQUFDMEUsR0FBUixDQUFZLGVBQVosRUFBNkI1RSxFQUE3QixDQUFyQjtBQUFBLE9BQVg7QUFBQTtBQUFBLE1BSkYsRUFPR25DLFFBUEgsRUFRRTtBQUFBLGdCQUNFO0FBQU0sV0FBRyxFQUFFLGFBQUNtQyxFQUFEO0FBQUEsaUJBQXFCRSxPQUFPLENBQUMwRSxHQUFSLENBQVksZUFBWixFQUE2QjVFLEVBQTdCLENBQXJCO0FBQUEsU0FBWDtBQUFBO0FBQUE7QUFERixNQVJGO0FBQUEsSUFERjtBQWdCRDs7QUFFRCxTQUFTd0csTUFBVCxDQUFnQnhHLEVBQWhCLEVBQWlDO0FBQy9CRSxTQUFPLENBQUMwRSxHQUFSLENBQVksc0JBQVosRUFBb0M1RSxFQUFwQztBQUNEO0FBRUQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQWdEQTs7Ozs7OztBQU1BOzs7Ozs7Ozs7Ozs7QUFXQTs7Ozs7Ozs7Ozs7QUFVQSxTQUFTeUcsSUFBVCxRQUF1QztBQUFBLE1BQXZCQyxJQUF1QixTQUF2QkEsSUFBdUI7QUFDckMsU0FBT0EsSUFBSSxLQUFLLENBQVQsR0FDTDtBQUFBLGVBQ0U7QUFBTSxRQUFFLEVBQUMsT0FBVDtBQUFpQixTQUFHLEVBQUUsSUFBdEI7QUFBQTtBQUFBLE1BREYsRUFJRTtBQUFBO0FBQUEsTUFKRjtBQUFBLElBREssR0FRTDtBQUFBLGNBQ0U7QUFBRyxRQUFFLEVBQUMsT0FBTjtBQUFjLGFBQUssSUFBbkI7QUFBQTtBQUFBO0FBREYsSUFSRjtBQWNEOztBQUVELFNBQVNDLElBQVQsUUFBdUI7QUFBQSxNQUFQQyxHQUFPLFNBQVBBLEdBQU87QUFDckIsTUFBSUEsR0FBRyxLQUFLLENBQVosRUFBZSxPQUFPLElBQVA7QUFDZixTQUNFO0FBQUEsY0FDRTtBQUFBO0FBQUE7QUFERixJQURGO0FBS0Q7O0FBRUQsSUFBTUMsT0FBTyxHQUFHLFNBQVZBLE9BQVUsQ0FBQ0QsR0FBRDtBQUFBLFNBQ2Q7QUFBSyxNQUFFLEVBQUMsT0FBUjtBQUFnQixnQkFBUyxLQUF6QjtBQUErQixnQkFBVUEsR0FBekM7QUFBQSxlQUNFO0FBQUE7QUFBQSxNQURGLEVBRUdBLEdBQUcsS0FBSyxDQUFSLEdBQ0M7QUFBSSxlQUFNLFVBQVY7QUFBQSxpQkFDRTtBQUFBO0FBQUEsUUFERixFQUVFO0FBQUE7QUFBQSxRQUZGO0FBQUEsTUFERCxHQU1DO0FBQUksZUFBTSxVQUFWO0FBQUEsaUJBQ0U7QUFBQTtBQUFBLFFBREYsRUFFRTtBQUFBO0FBQUEsUUFGRixFQUdFO0FBQUE7QUFBQSxRQUhGO0FBQUEsTUFSSixFQWNFO0FBQUE7QUFBQSxNQWRGLEVBZUdBLEdBQUcsS0FBSyxDQUFSLEdBQ0M7QUFBSSxlQUFNLFVBQVY7QUFBQSxpQkFDRTtBQUFBO0FBQUEsUUFERixFQUVFO0FBQUE7QUFBQSxRQUZGLEVBR0U7QUFBQTtBQUFBLFFBSEY7QUFBQSxNQURELEdBT0M7QUFBSSxlQUFNLFVBQVY7QUFBQSxpQkFDRTtBQUFBO0FBQUEsUUFERixFQUVFO0FBQUE7QUFBQSxRQUZGO0FBQUEsTUF0QkosRUEyQkdBLEdBQUcsS0FBSyxDQUFSLEdBQVksSUFBWixHQUFtQjtBQUFBO0FBQUEsTUEzQnRCLEVBNEJFO0FBQUEsZ0JBQ0U7QUFBQTtBQUFBO0FBREYsTUE1QkYsRUErQkUsaUZBQUMsSUFBRDtBQUFNLFVBQUksRUFBRUE7QUFBWixNQS9CRixFQWlDRTtBQUFBO0FBQUEsTUFqQ0YsRUFrQ0U7QUFDRSxhQUFPLEVBQUMsYUFEVjtBQUVFLFdBQUssRUFBQyw0QkFGUjtBQUdFLFlBQU0sRUFBQyxLQUhUO0FBSUUsVUFBSSxFQUFDLE1BSlA7QUFBQSxpQkFNRTtBQUFRLFVBQUUsRUFBQyxJQUFYO0FBQWdCLFVBQUUsRUFBQyxJQUFuQjtBQUF3QixTQUFDLEVBQUM7QUFBMUIsUUFORixFQU9FO0FBQVEsVUFBRSxFQUFDLEtBQVg7QUFBaUIsVUFBRSxFQUFDLElBQXBCO0FBQXlCLFNBQUMsRUFBQztBQUEzQixRQVBGLEVBU0U7QUFBSyxlQUFPLEVBQUMsV0FBYjtBQUF5QixTQUFDLEVBQUMsS0FBM0I7QUFBaUMsYUFBSyxFQUFDLEtBQXZDO0FBQUEsa0JBQ0U7QUFBUSxZQUFFLEVBQUMsR0FBWDtBQUFlLFlBQUUsRUFBQyxHQUFsQjtBQUFzQixXQUFDLEVBQUM7QUFBeEI7QUFERixRQVRGO0FBQUEsTUFsQ0Y7QUFBQSxJQURjO0FBQUEsQ0FBaEI7O0FBbURBLFNBQVNFLE9BQVQsQ0FBaUJGLEdBQWpCLEVBQTJCO0FBQ3pCLFNBQ0U7QUFBSyxNQUFFLEVBQUMsT0FBUjtBQUFBLGVBQ0U7QUFBQSxnQkFDRTtBQUFBLGtCQUNFO0FBQUE7QUFBQTtBQURGO0FBREYsTUFERixFQU1FO0FBQUE7QUFBQSxNQU5GLEVBT0U7QUFBQSxrQ0FBa0JBLEdBQWxCO0FBQUEsTUFQRixFQVFHQSxHQUFHLEtBQUssQ0FBUixHQUFZO0FBQUE7QUFBQSxNQUFaLEdBQTJCLEtBUjlCLEVBU0dBLEdBQUcsS0FBSyxDQUFSLEdBQ0M7QUFBQSxpQkFDRTtBQUFBO0FBQUEsUUFERixFQUVFO0FBQUE7QUFBQSxRQUZGO0FBQUEsTUFERCxHQU1DO0FBQUE7QUFBQSxNQWZKLEVBaUJFLGlGQUFDLElBQUQ7QUFBTSxTQUFHLEVBQUVBO0FBQVgsTUFqQkY7QUFBQSxJQURGO0FBcUJEOztBQUNELFNBQVNHLEVBQVQsR0FBYztBQUNaLFNBQU8sSUFBUDtBQUNEOztBQUVELFNBQVNDLE9BQVQsQ0FBaUJKLEdBQWpCLEVBQTJCO0FBQ3pCLFNBQU9BLEdBQUcsS0FBSyxDQUFSLEdBQ0w7QUFBQSw4QkFDY0EsR0FEZCxFQUVFLGlGQUFDLElBQUQ7QUFBTSxVQUFJLEVBQUVBO0FBQVosTUFGRixFQUdFLGtGQUFDLE1BQUQ7QUFDRSxjQUFRLEVBQUUsSUFEWjtBQUVFLFNBQUcsRUFBRSxhQUFDNUcsRUFBRDtBQUFBLGVBQXFCRSxPQUFPLENBQUMwRSxHQUFSLENBQVksbUJBQVosRUFBaUM1RSxFQUFqQyxDQUFyQjtBQUFBLE9BRlA7QUFBQSx5QkFLRTtBQUNFLFdBQUcsRUFBRSxhQUFDQSxFQUFEO0FBQUEsaUJBQXFCRSxPQUFPLENBQUMwRSxHQUFSLENBQVksd0JBQVosRUFBc0M1RSxFQUF0QyxDQUFyQjtBQUFBLFNBRFA7QUFBQTtBQUFBLFFBTEYsRUFVRTtBQUFBLCtCQUFZNEcsR0FBWjtBQUFBLFFBVkY7QUFBQSxNQUhGLGNBZ0JFO0FBQUEsaUJBQ0U7QUFBQSxrQkFDRTtBQUFBO0FBQUE7QUFERixRQURGLEVBSUU7QUFBQTtBQUFBLFFBSkYsRUFLRTtBQUFBO0FBQUEsUUFMRixFQU1FO0FBQUE7QUFBQSxRQU5GLEVBT0U7QUFDRSxlQUFPLEVBQUMsYUFEVjtBQUVFLGFBQUssRUFBQyw0QkFGUjtBQUdFLGNBQU0sRUFBQyxLQUhUO0FBSUUsWUFBSSxFQUFDLE1BSlA7QUFBQSxtQkFNRTtBQUFRLFlBQUUsRUFBQyxJQUFYO0FBQWdCLFlBQUUsRUFBQyxJQUFuQjtBQUF3QixXQUFDLEVBQUM7QUFBMUIsVUFORixFQU9FO0FBQVEsWUFBRSxFQUFDLEtBQVg7QUFBaUIsWUFBRSxFQUFDLElBQXBCO0FBQXlCLFdBQUMsRUFBQztBQUEzQixVQVBGLEVBU0U7QUFBSyxpQkFBTyxFQUFDLFdBQWI7QUFBeUIsV0FBQyxFQUFDLEtBQTNCO0FBQWlDLGVBQUssRUFBQyxLQUF2QztBQUFBLG9CQUNFO0FBQVEsY0FBRSxFQUFDLEdBQVg7QUFBZSxjQUFFLEVBQUMsR0FBbEI7QUFBc0IsYUFBQyxFQUFDO0FBQXhCO0FBREYsVUFURjtBQUFBLFFBUEY7QUFBQSxNQWhCRixFQXFDRyxJQXJDSDtBQUFBLElBREssR0F5Q0w7QUFBSSxhQUFNLEdBQVY7QUFBZSxPQUFHLEVBQUUxRyxPQUFPLENBQUMrRyxJQUE1QjtBQUFBLDhCQUNjTCxHQURkLEVBRUUsaUZBQUMsSUFBRDtBQUFNLFVBQUksRUFBRUE7QUFBWixNQUZGLEVBR0Usa0ZBQUMsTUFBRDtBQUNFLGNBQVEsRUFBRSxJQURaO0FBRUUsU0FBRyxFQUFFLGFBQUM1RyxFQUFEO0FBQUEsZUFBcUJFLE9BQU8sQ0FBQzBFLEdBQVIsQ0FBWSxtQkFBWixFQUFpQzVFLEVBQWpDLENBQXJCO0FBQUEsT0FGUDtBQUFBLHlCQUtFO0FBQ0UsV0FBRyxFQUFFLGFBQUNBLEVBQUQ7QUFBQSxpQkFBcUJFLE9BQU8sQ0FBQzBFLEdBQVIsQ0FBWSx3QkFBWixFQUFzQzVFLEVBQXRDLENBQXJCO0FBQUEsU0FEUDtBQUFBO0FBQUEsUUFMRixFQVVFO0FBQUEsa0JBQUk0RztBQUFKLFFBVkY7QUFBQSxNQUhGLEVBZUU7QUFBQSxpQkFDRyxLQURILEVBRUcsSUFGSCxFQUdHOUgsU0FISDtBQUFBLE1BZkYsRUFvQkU7QUFBQSxpQkFDRTtBQUFBO0FBQUEsUUFERixFQUVFO0FBQUE7QUFBQSxRQUZGLEVBR0dBLFNBSEgsRUFJRTtBQUFBO0FBQUEsUUFKRixFQUtFO0FBQ0UsZUFBTyxFQUFDLGFBRFY7QUFFRSxhQUFLLEVBQUMsNEJBRlI7QUFHRSxjQUFNLEVBQUMsS0FIVDtBQUlFLFlBQUksRUFBQyxNQUpQO0FBQUEsbUJBTUU7QUFBUSxZQUFFLEVBQUMsSUFBWDtBQUFnQixZQUFFLEVBQUMsSUFBbkI7QUFBd0IsV0FBQyxFQUFDO0FBQTFCLFVBTkYsRUFPRTtBQUFRLFlBQUUsRUFBQyxLQUFYO0FBQWlCLFlBQUUsRUFBQyxJQUFwQjtBQUF5QixXQUFDLEVBQUM7QUFBM0IsVUFQRixFQVNFO0FBQUssaUJBQU8sRUFBQyxXQUFiO0FBQXlCLFdBQUMsRUFBQyxLQUEzQjtBQUFpQyxlQUFLLEVBQUMsS0FBdkM7QUFBQSxvQkFDRTtBQUFRLGNBQUUsRUFBQyxHQUFYO0FBQWUsY0FBRSxFQUFDLEdBQWxCO0FBQXNCLGFBQUMsRUFBQztBQUF4QjtBQURGLFVBVEY7QUFBQSxRQUxGLEVBa0JFO0FBQUE7QUFBQSxRQWxCRjtBQUFBLE1BcEJGO0FBQUEsSUF6Q0Y7QUFtRkQ7O0FBQ0QsSUFBTW9JLEdBQUcsR0FBRztBQUFFQyxHQUFDLEVBQUU7QUFBTCxDQUFaOztBQUVBLFNBQVNDLE9BQVQsQ0FBaUJSLEdBQWpCLEVBQTJCO0FBQ3pCTSxLQUFHLENBQUNDLENBQUosR0FBUVAsR0FBUjtBQUNBLFNBQU9BLEdBQUcsS0FBSyxDQUFSLEdBQ0w7QUFBSSxPQUFHLEVBQUVNLEdBQVQ7QUFBYyxNQUFFLEVBQUVBLEdBQUcsQ0FBQ0MsQ0FBdEI7QUFBQSxnQ0FDZ0JQLEdBRGhCO0FBQUEsSUFESyxHQUtMO0FBQUksT0FBRyxFQUFFTSxHQUFUO0FBQWMsYUFBTSxHQUFwQjtBQUF3QixNQUFFLEVBQUVBLEdBQUcsQ0FBQ0MsQ0FBaEM7QUFBQSxnQ0FDZ0JQLEdBRGhCO0FBQUEsSUFMRjtBQVNEOztBQUVELFNBQVMxQixNQUFULENBQWdCMEIsR0FBaEIsRUFBMEI7QUFDeEIsU0FBT0EsR0FBRyxLQUFLLENBQVIsR0FDTDtBQUFBLGNBQ0U7QUFBQSxpQkFDRTtBQUFBO0FBQUEsUUFERixFQUVFO0FBQUE7QUFBQSxRQUZGO0FBQUE7QUFERixJQURLLEdBUUw7QUFBSSxhQUFNLEdBQVY7QUFBQSxlQUNHLGNBREgsT0FDb0JBLEdBRHBCO0FBQUEsSUFSRjtBQVlEOztBQUVELFNBQVNTLE9BQVQsQ0FBaUJULEdBQWpCLEVBQTJCO0FBQ3pCLFNBQU9BLEdBQUcsS0FBSyxDQUFSLEdBQ0w7QUFBQSxlQUNHWCxvRkFBTyxvREFEVixFQUVFLGlGQUFDLEtBQUQsS0FGRixFQUdHakcsRUFISDtBQUFBLElBREssR0FPTDtBQUFBLGVBQ0dpRyxvRkFBTyxvREFEVixFQUVHLElBRkgsRUFHR2pHLEVBSEg7QUFBQSxJQVBGO0FBYUQ7O0FBRUQsU0FBU3NILE9BQVQsR0FBbUI7QUFFakIsU0FDRTtBQUFBLGVBQ0U7QUFBSyxRQUFFLEVBQUMsTUFBUjtBQUFBLGdCQUNFO0FBQUE7QUFBQTtBQURGLE1BREYsRUFJRTtBQUFBO0FBQUEsTUFKRjtBQUFBLElBREY7QUFRRCxDLENBRUQ7QUFDQTs7O0lBRU1DLFM7Ozs7O0FBQ0osdUJBQWM7QUFBQTs7QUFBQTs7QUFDWjtBQUNBLDhCQUZZLENBSVo7O0FBRUFySCxXQUFPLENBQUMwRSxHQUFSLENBQVksMEJBQVo7QUFOWTtBQU9iOzs7O3dDQUVtQjtBQUNsQjFFLGFBQU8sQ0FBQzBFLEdBQVIsQ0FBWSx1REFBWjtBQUNEOzs7O2lDQVpxQjRDLFc7O0FBZXhCQyxjQUFjLENBQUNDLE1BQWYsQ0FBc0IsWUFBdEIsRUFBb0NILFNBQXBDLEUsQ0FFQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTs7QUFDQSxJQUFNdkgsRUFBRSxHQUFHZCxRQUFRLENBQUN5SSxhQUFULENBQXVCLE1BQXZCLENBQVg7O0FBQ0EsU0FBU0MsS0FBVCxHQUFpQjtBQUNmLFNBQ0U7QUFBQSxlQUNHM0Isb0ZBQU8sb0RBRFYsRUFFRSxpRkFBQyxLQUFELEtBRkYsRUFHR2pHLEVBSEg7QUFBQSxJQURGO0FBT0Q7O0FBQ0QsU0FBUzZILEtBQVQsR0FBaUI7QUFDZixTQUFPO0FBQUE7QUFBQSxJQUFQO0FBQ0Q7O0FBRURDLE1BQU0sQ0FBQ0MsU0FBUCxHQUFtQjtBQUFBLFNBQ2pCOUMsbUZBQU0sQ0FBQytCLE9BQU8sQ0FBQyxDQUFELENBQVIsRUFBYTlILFFBQVEsQ0FBQzhJLGNBQVQsQ0FBd0IsV0FBeEIsQ0FBYixDQURXO0FBQUEsQ0FBbkI7O0FBRUFGLE1BQU0sQ0FBQ0csU0FBUCxHQUFtQjtBQUFBLFNBQ2pCaEQsbUZBQU0sQ0FBQytCLE9BQU8sQ0FBQyxDQUFELENBQVIsRUFBYTlILFFBQVEsQ0FBQzhJLGNBQVQsQ0FBd0IsV0FBeEIsQ0FBYixDQURXO0FBQUEsQ0FBbkI7O0FBRUFGLE1BQU0sQ0FBQ0ksU0FBUCxHQUFtQjtBQUFBLFNBQ2pCakQsbUZBQU0sRUFDSjtBQUNBLG1GQUFDLEtBQUQsS0FGSSxFQUdKL0YsUUFBUSxDQUFDOEksY0FBVCxDQUF3QixXQUF4QixDQUhJLENBRFc7QUFBQSxDQUFuQjs7QUFPQTlILE9BQU8sQ0FBQzBFLEdBQVIsQ0FBWSxPQUFaOztBQUNBa0QsTUFBTSxDQUFDSyxFQUFQLEdBQVk7QUFBQSxTQUFNbkIsT0FBTyxDQUFDLENBQUQsQ0FBUCxHQUFhLEVBQW5CO0FBQUEsQ0FBWjs7QUFDQWMsTUFBTSxDQUFDTSxHQUFQLEdBQWEsWUFBTTtBQUNqQmxJLFNBQU8sQ0FBQzBFLEdBQVIsQ0FBWW9DLE9BQU8sQ0FBQyxDQUFELENBQW5CLEVBRGlCLENBR2pCO0FBQ0QsQ0FKRDs7QUFNQWMsTUFBTSxDQUFDTyxVQUFQLEdBQW9CO0FBQUEsU0FDbEJwRCxtRkFBTSxDQUFDb0MsT0FBTyxDQUFDLENBQUQsQ0FBUixFQUFhbkksUUFBUSxDQUFDOEksY0FBVCxDQUF3QixXQUF4QixDQUFiLENBRFk7QUFBQSxDQUFwQjs7QUFFQUYsTUFBTSxDQUFDUSxVQUFQLEdBQW9CO0FBQUEsU0FDbEJyRCxtRkFBTSxDQUFDb0MsT0FBTyxDQUFDLENBQUQsQ0FBUixFQUFhbkksUUFBUSxDQUFDOEksY0FBVCxDQUF3QixXQUF4QixDQUFiLENBRFk7QUFBQSxDQUFwQjs7QUFLRS9DLG1GQUFNLENBQUU7QUFBSSxXQUFNLEdBQVY7QUFBZSxLQUFHLEVBQUUvRSxPQUFPLENBQUNDLElBQTVCO0FBQUE7QUFBQSxFQUFGLEVBQTREakIsUUFBUSxDQUFDOEksY0FBVCxDQUF3QixXQUF4QixDQUE1RCxDQUFOOztBQUNBRixNQUFNLENBQUNTLFdBQVAsR0FBcUI7QUFBQSxTQUFNdEQsbUZBQU0sQ0FBRTtBQUFJLGFBQU0sR0FBVjtBQUFlLE9BQUcsRUFBRS9FLE9BQU8sQ0FBQ0MsSUFBNUI7QUFBQTtBQUFBLElBQUYsRUFBNERqQixRQUFRLENBQUM4SSxjQUFULENBQXdCLFdBQXhCLENBQTVELENBQVo7QUFBQSxDQUFyQjs7QUFDQUYsTUFBTSxDQUFDVSxVQUFQLEdBQW9CO0FBQUEsU0FBTXZELG1GQUFNLENBQUNxQyxPQUFPLEVBQVIsRUFBWXBJLFFBQVEsQ0FBQzhJLGNBQVQsQ0FBd0IsV0FBeEIsQ0FBWixDQUFaO0FBQUEsQ0FBcEI7O0FBQ0FGLE1BQU0sQ0FBQ1csVUFBUCxHQUFvQjtBQUFBLFNBQU14RCxtRkFBTSxDQUFFO0FBQUE7QUFBQSxJQUFGLEVBQW9CL0YsUUFBUSxDQUFDOEksY0FBVCxDQUF3QixNQUF4QixDQUFwQixDQUFaO0FBQUEsQ0FBcEIsQyIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDApO1xuIiwiY29uc3QgcmVuZGVyZWRWVHJlZXMgPSBuZXcgV2Vha01hcDxIVE1MRWxlbWVudCwgUm9vdFZOb2RlPigpO1xyXG5jb25zdCByZWZzVG9DYWxsOiBBcnJheTwoKSA9PiB2b2lkPiA9IFtdO1xyXG5cclxuLyoqXHJcbiAqIHByb3ZpZGVzIGZ1bmN0aW9ucyBuZWVkZWQgYnkgYmFiZWwgZm9yIGEgY3VzdG9tIHByYWdtYVxyXG4gKiB0byByZW5kZXIgcGFyc2VkIGpzeCBjb2RlIHRvIGh0bWxcclxuICovXHJcblxyXG4vLyBwcm9wcyB3aGljaCB3aWxsIGJlIHJlbmRlcmVkIGFzIGF0dHJpYnV0ZXNcclxuLy8gRnVuY3Rpb25zIHdpbGwgYmUgdXNlZCBmb3IgZXZlbnQgbGlzdGVuZXJzLiAod2l0aCBhdHRyaWJ1dGUgbmFtZSBzdGFydGluZyB3aXRoICdvbi0nKVxyXG50eXBlIEF0dHJpYnV0ZXMgPSB7IFtrZXk6IHN0cmluZ106IHN0cmluZyB8IGJvb2xlYW4gfCBudW1iZXIgfCBGdW5jdGlvbiB9O1xyXG5cclxuLy8gYWRkaXRpb25hbCBhdHRyaWJ1dGVzIHdoaWNoIGNhbiBoYXZlIGFkZGl0aW9uYWwgc2VyaWFsaXphdGlvbiBiZWZvcmUgcmVuZGVyaW5nIGFzIGF0dHJpYnV0ZXNcclxudHlwZSBTcGVjaWFsQXR0cmlidXRlcyA9IHtcclxuICBjbGFzcz86IHN0cmluZyB8IHN0cmluZ1tdO1xyXG4gIHN0eWxlPzogc3RyaW5nIHwgeyBba2V5OiBzdHJpbmddOiBzdHJpbmcgfTtcclxuICByZWY/OiBGdW5jdGlvbjtcclxufTtcclxuXHJcbi8vIGNoaWxkIGVsZW1lbnRzIGluIHRoZSBqc3ggbWFya3VwIHdoaWNoIHdpbGwgYmUgcGFzc2VkIHRvIHRoZSBoIGZ1bmN0aW9uIGFzIGBwcm9wcy5jaGlsZHJlbmBcclxudHlwZSBDaGlsZHJlblByb3BzID0ge1xyXG4gIC8vIG5lc3RlZCBhcnJheSBpbiBjYXNlIG9mXHJcbiAgLy8gPGVsZW0+XHJcbiAgLy8gICA8c3Bhbi8+XHJcbiAgLy8gICB7Y2hpbGRyZW59XHJcbiAgLy8gICA8ZGl2Lz5cclxuICAvLyA8L2VsZW0+XHJcbiAgY2hpbGRyZW46IEFycmF5PFxyXG4gICAgTm9kZSB8IEpzeE5vZGVJbnRlcmZhY2UgfCBzdHJpbmcgfCBBcnJheTxOb2RlIHwgSnN4Tm9kZUludGVyZmFjZSB8IHN0cmluZz5cclxuICA+O1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIHByb3BzIG9iamVjdCB3aGljaCB3aWxsIGJlIHBhc3NlZCB0byBqc3ggcHJhZ21hIGFuZCBjdXN0b20gY29tcG9uZW50IGZ1bmN0aW9uc1xyXG4gKi9cclxudHlwZSBKc3hQcm9wcyA9IEF0dHJpYnV0ZXMgJiBTcGVjaWFsQXR0cmlidXRlcyAmIENoaWxkcmVuUHJvcHM7XHJcblxyXG4vLyBiYXNlIGNsYXNzIHdoaWNoIHdpbGwgYmUgaW5oZXJpdGVkIGZyb20ganN4IGFuZCBmcmFnbWVudHMgZnVuY3Rpb24gbm9kZSBnZW5lcmF0aW9uXHJcbi8vIGFuZCB3aWxsIGJlIHVzZWQgdG8gZGlzdGluZ3Vpc2ggdGhlbSB3aXRoIG90aGVyIEVsZW1lbnRzXHJcbmNsYXNzIEpzeE5vZGUge1xyXG4gIHByb3BzOiBKc3hQcm9wcztcclxuICBjb25zdHJ1Y3Rvcihwcm9wczogSnN4UHJvcHMpIHtcclxuICAgIHRoaXMucHJvcHMgPSBwcm9wcztcclxuICB9XHJcbn1cclxuXHJcbi8vIG51bGwgd2hlbiBjaGVja2luZyB0aGUgcGFyZW50IHdoZW4gcm9vdCBpcyBmcmFnbWVudCBpdHNlbGZcclxuZnVuY3Rpb24gZ2V0UGFyZW50RWxlbWVudE5vZGUodk5vZGU6IFZOb2RlSW50ZXJmYWNlKTogRWxlbWVudFZOb2RlIHtcclxuICB3aGlsZSAodk5vZGUucGFyZW50KSB7XHJcbiAgICB2Tm9kZSA9IHZOb2RlLnBhcmVudDtcclxuICAgIC8vIGAubm9kZWAgaXMgb25seSBvbiBcIlRleHRcIiBhbmQgXCJFbGVtZW50XCIsIFwiUmF3SHRtbFwiIHR5cGUgVk5vZGUsIGFuZCBvbmx5IEVsZW1lbnQgaGFzIGNoaWxkcmVuXHJcbiAgICBpZiAodk5vZGUubm9kZSkgYnJlYWs7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gKHZOb2RlIGFzIHVua25vd24pIGFzIEVsZW1lbnRWTm9kZTtcclxufVxyXG5cclxuZnVuY3Rpb24gZ2V0Q2hpbGRyZW5XaXRoTm9kZXMoXHJcbiAgdk5vZGU6IFZOb2RlSW50ZXJmYWNlLFxyXG4gIGFsd2F5c0FsbG93PzogVk5vZGVJbnRlcmZhY2VcclxuKTogVk5vZGVJbnRlcmZhY2VbXSB7XHJcbiAgdk5vZGUuY2hpbGRyZW47XHJcbiAgcmV0dXJuIHZOb2RlLmNoaWxkcmVuXHJcbiAgICAubWFwKChjaGlsZE5vZGUpID0+IHtcclxuICAgICAgaWYgKGNoaWxkTm9kZSA9PT0gYWx3YXlzQWxsb3cpIHJldHVybiBjaGlsZE5vZGU7XHJcbiAgICAgIGlmIChjaGlsZE5vZGUubm9kZSkgcmV0dXJuIGNoaWxkTm9kZTtcclxuICAgICAgcmV0dXJuIGdldENoaWxkcmVuV2l0aE5vZGVzKGNoaWxkTm9kZSwgYWx3YXlzQWxsb3cpO1xyXG4gICAgfSlcclxuICAgIC5mbGF0KEluZmluaXR5KSBhcyBWTm9kZUludGVyZmFjZVtdO1xyXG59XHJcblxyXG5mdW5jdGlvbiBnZXRQYXJlbnRBbmROZXh0U2libGluZyh2Tm9kZTogVk5vZGVJbnRlcmZhY2UpOiBbTm9kZSwgTm9kZSB8IG51bGxdIHtcclxuICAvLyBub2RlIGFuY2VzdG9yIHdpdGggRWxlbWVudCxcclxuICBjb25zdCBwYXJlbnRXaXRoRWxlbWVudCA9IGdldFBhcmVudEVsZW1lbnROb2RlKHZOb2RlKTtcclxuICBjb25zdCBzaWJsaW5ncyA9IGdldENoaWxkcmVuV2l0aE5vZGVzKHBhcmVudFdpdGhFbGVtZW50LCB2Tm9kZSk7XHJcbiAgY29uc3QgcHJldlNpYmxpbmcgPSBzaWJsaW5nc1tzaWJsaW5ncy5pbmRleE9mKHZOb2RlKSAtIDFdO1xyXG4gIGNvbnN0IG5leHRTaWJsaW5nTm9kZSA9IHByZXZTaWJsaW5nID8gcHJldlNpYmxpbmcubm9kZSEubmV4dFNpYmxpbmcgOiBudWxsO1xyXG5cclxuICByZXR1cm4gW3BhcmVudFdpdGhFbGVtZW50Lm5vZGUsIG5leHRTaWJsaW5nTm9kZV07XHJcbn1cclxuXHJcbi8vIHByaXZhdGUga2V5IGZvciBjYWxsaW5nIHRoZSBgcmVmYCBjYWxsZXJzXHJcbmNvbnN0IF9jYWxsUmVmcyA9IFN5bWJvbChcImNhbGxSZWZzXCIpO1xyXG5cclxuLy8gdGhlIGN1cnJlbnQgbWFya3VwIHdoaWNoIGlzIHJlbmRlcmVkIGlzIG5lc3RlZCBpbiBhbiBzdmcgZWxlbWVudFxyXG5sZXQgc3ZnQ29udGV4dCA9IGZhbHNlO1xyXG5cclxuLy8ganN4IGFuZCBGcmFnbWVudCB3aWxsIHJldHVybiBvYmplY3RzIHdoaWNoIGltcGxlbWVudCB0aGlzIGludGVyZmFjZVxyXG5leHBvcnQgaW50ZXJmYWNlIEpzeE5vZGVJbnRlcmZhY2UgZXh0ZW5kcyBKc3hOb2RlIHtcclxuICB0b1N0cmluZygpOiBzdHJpbmc7XHJcbiAgYXNOb2RlKCk6IE5vZGU7XHJcbiAgYXNWTm9kZSgpOiBWTm9kZTtcclxuICBbX2NhbGxSZWZzXSgpOiB2b2lkO1xyXG59XHJcblxyXG4vKipcclxuICogcmV0dXJucyB0cnVlIGlmIG5vdCBudWxsaXNoIG9yIGZhbHNlXHJcbiAqIHRoYXQgbWVhbnMgMCBvciBlbXB0eSBzdHJpbmcgYXJlIGFsbG93ZWRcclxuICogQHBhcmFtIHsqfSB2YWxcclxuICovXHJcbmZ1bmN0aW9uIHRydXRoeSh2YWx1ZTogYW55KTogYm9vbGVhbiB7XHJcbiAgcmV0dXJuIHZhbHVlICE9PSBmYWxzZSAmJiB2YWx1ZSAhPT0gbnVsbCAmJiB2YWx1ZSAhPT0gdW5kZWZpbmVkO1xyXG59XHJcblxyXG4vKipcclxuICogZXNjYXBlcyB0aGUgcHJvdmlkZWQgc3RyaW5nIGFnYWluc3QgeHNzIGF0dGFja3MgZXRjXHJcbiAqXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSB0ZXh0XHJcbiAqIEByZXR1cm5zIHtzdHJpbmd9XHJcbiAqL1xyXG5mdW5jdGlvbiBzYW5pdGl6ZSh0ZXh0OiBzdHJpbmcpOiBzdHJpbmcge1xyXG4gIGNvbnN0IGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgZGl2LmlubmVyVGV4dCA9IHRleHQ7XHJcbiAgcmV0dXJuIGRpdi5pbm5lckhUTUw7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBiYXNpY2FsbHkgYEVsZW1lbnQub3V0ZXJIVE1MYCBidXQgYWxzbyBzdXBwb3J0cyBUZXh0IG5vZGUgYW5kIERvY3VtZW50RnJhZ21lbnRcclxuICogQHBhcmFtIGVsZW1lbnQge05vZGV9IC0gZWxlbWVudCB3aGljaCBpdHMgaHRtbCBuZWVkcyB0byBiZSByZXR1cm5lZFxyXG4gKi9cclxuZnVuY3Rpb24gZ2V0T3V0ZXJIdG1sKGVsZW1lbnQ6IE5vZGUpOiBzdHJpbmcge1xyXG4gIGlmIChlbGVtZW50IGluc3RhbmNlb2YgRWxlbWVudCkgcmV0dXJuIGVsZW1lbnQub3V0ZXJIVE1MO1xyXG4gIGlmIChlbGVtZW50IGluc3RhbmNlb2YgVGV4dCkgcmV0dXJuIHNhbml0aXplKGVsZW1lbnQud2hvbGVUZXh0KTtcclxuICBpZiAoZWxlbWVudCBpbnN0YW5jZW9mIERvY3VtZW50RnJhZ21lbnQpXHJcbiAgICByZXR1cm4gQXJyYXkuZnJvbShlbGVtZW50LmNoaWxkTm9kZXMpXHJcbiAgICAgIC5tYXAoKGVsKSA9PiBnZXRPdXRlckh0bWwoZWwpKVxyXG4gICAgICAuam9pbihcIlwiKTtcclxuXHJcbiAgLy8gc2hvdWxkbid0IHJlYWNoIHRoaXMgcG9pbnRcclxuICBjb25zb2xlLndhcm4oXCJnZXRPdXRlckh0bWwgZG9lcyBub3Qgc3VwcG9ydCB0aGlzIHR5cGUgb2YgZWxlbWVudFwiLCBlbGVtZW50KTtcclxuICByZXR1cm4gXCJcIjtcclxufVxyXG5cclxuLyoqXHJcbiAqIGdlbmVyYXRlcyB0aGUgaHRtbCBhcyBhIHN0cmluZyB3aGljaCBjYW4gYmUgdXNlZCBmb3IgZXhhbXBsZSB3aXRoIGBlbGVtZW50LmlubmVySFRNTCgpYFxyXG4gKlxyXG4gKiBAcGFyYW0gdGFnIHtzdHJpbmd8RnVuY3Rpb259IC0gdGFnIGFyZ3VtZW50IG9mIHRoZSBqc3ggY2FsbFxyXG4gKiBAcGFyYW0gcHJvcHMge09iamVjdH0gLSBwcm9wcyBhcmd1bWVudCBvZiBqc3ggY2FsbFxyXG4gKi9cclxuZnVuY3Rpb24gYXNIdG1sU3RyaW5nKHRhZzogc3RyaW5nIHwgRnVuY3Rpb24sIHByb3BzOiBKc3hQcm9wcywgY2hpbGRyZW4pIHtcclxuICBjb25zdCBhdHRyaWJ1dGVzID0gT2JqZWN0LmVudHJpZXMocHJvcHMpXHJcbiAgICAuZmlsdGVyKChbLCB2YWx1ZV0pID0+IHRydXRoeSh2YWx1ZSkpXHJcbiAgICAubWFwKChba2V5LCB2YWx1ZV0pID0+IHtcclxuICAgICAgLy8gZS5nLiBkaXNhYmxlZDogdHJ1ZSA9PiA8dGFnIGRpc2FibGVkPlxyXG4gICAgICBpZiAodmFsdWUgPT09IHRydWUpIHJldHVybiBrZXk7XHJcblxyXG4gICAgICAvLyBmb3Igc3R5bGUgYXMgb2JqZWN0OlxyXG4gICAgICAvLyAoc3R5bGU6KSB7ZGlzcGxheTogXCJub25lXCIsIHBvc2l0aW9uOiBcImFic29sdXRlXCJ9ID09PiAnZGlzcGxheTogbm9uZTsgcG9zaXRpb246IGFic29sdXRlOydcclxuICAgICAgaWYgKGtleSA9PT0gXCJzdHlsZVwiICYmIHR5cGVvZiB2YWx1ZSA9PT0gXCJvYmplY3RcIilcclxuICAgICAgICB2YWx1ZSA9IE9iamVjdC5lbnRyaWVzKHZhbHVlKVxyXG4gICAgICAgICAgLy8gaWdub3JlIHN0dWZmIGxpa2UgYHtiYWNrZ3JvdW5kOiBhY3RpdmUgJiYgXCJyZWRcIn1gIHdoZW4gYGFjdGl2ZSA9PT0gZmFsc2UgLyBudWxsIC8gdW5kZWZpbmVkYFxyXG4gICAgICAgICAgLmZpbHRlcigoWywgdl0pID0+IHRydXRoeSh2KSlcclxuICAgICAgICAgIC8vIGN1cnJlbnRseSBzdXBwb3J0cyBcImJhY2tncm91bmQtY29sb3JcIiBub3QgXCJiYWNrZ3JvdW5kQ29sb3JcIlxyXG4gICAgICAgICAgLm1hcCgoW2ssIHZdKSA9PiBgJHtrfTogJHt2fWApXHJcbiAgICAgICAgICAuam9pbihcIjsgXCIpO1xyXG5cclxuICAgICAgLy8gKGNsYXNzOikgW1wiYnRuXCIsIFwicmVkXCJdID09PiBcImJ0biByZWRcIlxyXG4gICAgICBpZiAoa2V5ID09PSBcImNsYXNzXCIgJiYgQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHZhbHVlID0gdmFsdWUuam9pbihcIiBcIik7XHJcblxyXG4gICAgICByZXR1cm4gYCR7a2V5fT1cIiR7dmFsdWV9XCJgO1xyXG4gICAgfSlcclxuICAgIC5qb2luKFwiIFwiKTtcclxuXHJcbiAgY29uc3QgY29udGVudCA9IGNoaWxkcmVuLm1hcCgoY2hpbGQpID0+IGNoaWxkLnRvU3RyaW5nKCkpLmpvaW4oXCJcIik7XHJcblxyXG4gIHJldHVybiBgPCR7dGFnfSAke2F0dHJpYnV0ZXN9PiR7Y29udGVudH08LyR7dGFnfT5gO1xyXG59XHJcblxyXG4vKipcclxuICogZ2VuZXJhdGVzIEhUTUwgTm9kZSBlbGVtZW50cyBmcm9tIHRoZSBwcm92aWRlZCBqc3ggdHJlZVxyXG4gKiBAcGFyYW0gdGFnIHtzdHJpbmd8RnVuY3Rpb259IC0gdGFnIGFyZ3VtZW50IG9mIHRoZSBqc3ggY2FsbFxyXG4gKiBAcGFyYW0gcHJvcHMge09iamVjdH0gLSBwcm9wcyBhcmd1bWVudCBvZiBqc3ggY2FsbFxyXG4gKi9cclxuZnVuY3Rpb24gYXNOb2RlKFxyXG4gIHRhZzogc3RyaW5nIHwgRnVuY3Rpb24gfCB1bmRlZmluZWQsXHJcbiAgcHJvcHM6IEF0dHJpYnV0ZXMgJiBTcGVjaWFsQXR0cmlidXRlcywgLy9Kc3hQcm9wcyxcclxuICBjaGlsZHJlbjogYW55W11cclxuKTogW05vZGUsIEpzeE5vZGVJbnRlcmZhY2VbXV0ge1xyXG4gIC8vIGZyYWdtZW50XHJcbiAgaWYgKCF0YWcpIHtcclxuICAgIGNvbnN0IGZyYWdtZW50cyA9IGNoaWxkcmVuXHJcbiAgICAgIC5mbGF0KCkgLy8gP1xyXG4gICAgICAubWFwKChpdGVtKSA9PiBpdGVtLmFzTm9kZSgpKTtcclxuXHJcbiAgICBjb25zdCBkb2N1bWVudEZyYWdtZW50ID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO1xyXG5cclxuICAgIGRvY3VtZW50RnJhZ21lbnQuYXBwZW5kKC4uLmZyYWdtZW50cyk7XHJcbiAgICByZXR1cm4gW2RvY3VtZW50RnJhZ21lbnQsIFtdXTtcclxuICB9XHJcblxyXG4gIC8vIHNob3VsZG4ndCAvLyBAVE9ETzogdGVzdCBhbmQgcmVtb3ZlXHJcbiAgaWYgKHR5cGVvZiB0YWcgPT09IFwiZnVuY3Rpb25cIikge1xyXG4gICAgY29uc29sZS5lcnJvcihcInNob3VsZG4ndCByZWFjaCB0aGlzIGluIHZUcmVlIG1vZGVcIik7XHJcbiAgICAvLyBleHBlY3RpbmcgdGhlIHRhZyBmdW5jdGlvbiB0byByZXR1cm4ganN4LlxyXG4gICAgLy8gaGVyZSBpdCB3aWxsIGFsc28gd29yayB3aGVuIGl0IHJldHVybnMgSFRNTEVsZW1lbnRcclxuICAgIGxldCByZXN1bHQgPSB0YWcocHJvcHMpO1xyXG5cclxuICAgIGxldCBqc3hOb2RlczogSnN4Tm9kZUludGVyZmFjZVtdID0gW107XHJcblxyXG4gICAgaWYgKHJlc3VsdCBpbnN0YW5jZW9mIFZOb2RlKSB7XHJcbiAgICAgIGpzeE5vZGVzID0gW3Jlc3VsdCBhcyBKc3hOb2RlSW50ZXJmYWNlXTtcclxuICAgICAgcmVzdWx0ID0gKHJlc3VsdCBhcyBKc3hOb2RlSW50ZXJmYWNlKS5hc05vZGUoKTtcclxuICAgICAgT2JqZWN0LmVudHJpZXMocHJvcHMpLmZvckVhY2goKFtrZXksIHZhbHVlXSkgPT4ge1xyXG4gICAgICAgIGlmIChcclxuICAgICAgICAgIGtleS5zdGFydHNXaXRoKFwib24tXCIpICYmXHJcbiAgICAgICAgICAodHlwZW9mIHZhbHVlID09PSBcImZ1bmN0aW9uXCIgfHwgdHlwZW9mIHZhbHVlID09PSBcIm9iamVjdFwiKVxyXG4gICAgICAgICkge1xyXG4gICAgICAgICAgLy8gcmVtb3ZlIGxlYWRpbmcgXCJvbi1cIlwiXHJcbiAgICAgICAgICBjb25zdCBldmVudCA9IGtleS5yZXBsYWNlKC9eb24tLywgXCJcIik7XHJcblxyXG4gICAgICAgICAgcmVzdWx0LmFkZEV2ZW50TGlzdGVuZXIoXHJcbiAgICAgICAgICAgIGV2ZW50LFxyXG4gICAgICAgICAgICB2YWx1ZSBhcyBFdmVudExpc3RlbmVyT3JFdmVudExpc3RlbmVyT2JqZWN0XHJcbiAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIFtyZXN1bHQsIGpzeE5vZGVzXTtcclxuICB9XHJcblxyXG4gIGNvbnN0IHsgcmVmLCAuLi5hdHRycyB9ID0gcHJvcHM7XHJcblxyXG4gIC8vIHJlbWVtYmVyIGlmIHRoZSBzdmcgY29udGV4dCB3YXMgc2V0IGZvciB0aGlzIG5vZGUsIGFuZCByZXBsYWNlIGFmdGVyIGdlbmVyYXRpbmcgYWxsIGNoaWxkcmVuXHJcbiAgbGV0IHN2Z0NvbnRleHRTZXQgPSBmYWxzZTtcclxuXHJcbiAgLy8gc2V0IHRoZSBjb250ZXh0IG9mIG1hcmt1cCB3aGljaCBpcyByZW5kZXJlZCBhcyBTVkcgKG9yIGl0cyBjaGlsZHJlbilcclxuICAvLyBubyBuZWVkIGZvciByZS1zZXR0aW5nIHRoZSBjb250ZXh0IGZvciBuZXN0ZWQgU1ZHc1xyXG4gIGlmICghc3ZnQ29udGV4dCAmJiB0YWcgPT09IFwic3ZnXCIpIHtcclxuICAgIHN2Z0NvbnRleHQgPSB0cnVlO1xyXG4gICAgc3ZnQ29udGV4dFNldCA9IHRydWU7XHJcbiAgfVxyXG5cclxuICAvLyBjdXJyZW50bHkgbm90IHN1cHBvcnRpbmcgdGhlIGBpc2Agb3B0aW9uIGZvciBDdXN0b21pemVkIGJ1aWx0LWluIGVsZW1lbnRzXHJcbiAgY29uc3Qgbm9kZSA9IHN2Z0NvbnRleHRcclxuICAgID8gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKFwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiwgdGFnKVxyXG4gICAgOiBkb2N1bWVudC5jcmVhdGVFbGVtZW50KHRhZyk7XHJcblxyXG4gIC8vIGN1cnJlbnRseSBvbmx5IHN1cHBvcnRpbmcgcmVmIG9uIGh0bWwgZWxlbWVudHMuIG5vdCB0ZW1wbGF0ZSBmdW5jdGlvbnNcclxuICBpZiAodHlwZW9mIHJlZiA9PT0gXCJmdW5jdGlvblwiKSB7XHJcbiAgICByZWZzVG9DYWxsLnB1c2goKCkgPT4gcmVmKG5vZGUpKTtcclxuICB9XHJcblxyXG4gIE9iamVjdC5lbnRyaWVzKGF0dHJzKVxyXG4gICAgLmZpbHRlcigoW19rZXksIHZhbHVlXSkgPT4gdHJ1dGh5KHZhbHVlKSlcclxuICAgIC5mb3JFYWNoKChba2V5LCB2YWx1ZV0pID0+IHtcclxuICAgICAgLy8gZm9yIHN0eWxlIGFzIG9iamVjdDpcclxuICAgICAgLy8gKHN0eWxlOikge2Rpc3BsYXk6IFwibm9uZVwiLCBwb3NpdGlvbjogXCJhYnNvbHV0ZVwifSA9PT4gJ2Rpc3BsYXk6IG5vbmU7IHBvc2l0aW9uOiBhYnNvbHV0ZTsnXHJcbiAgICAgIGlmIChrZXkgPT09IFwic3R5bGVcIiAmJiB0eXBlb2YgdmFsdWUgPT09IFwib2JqZWN0XCIpXHJcbiAgICAgICAgdmFsdWUgPSBPYmplY3QuZW50cmllcyh2YWx1ZSlcclxuICAgICAgICAgIC5maWx0ZXIoKFssIHZdKSA9PiB0cnV0aHkodikpXHJcbiAgICAgICAgICAubWFwKChbaywgdl0pID0+IGAke2t9OiAke3Z9YClcclxuICAgICAgICAgIC5qb2luKFwiOyBcIik7XHJcblxyXG4gICAgICAvLyAoY2xhc3M6KSBbXCJidG5cIiwgXCJyZWRcIl0gPT0+IFwiYnRuIHJlZFwiXHJcbiAgICAgIGlmIChrZXkgPT09IFwiY2xhc3NcIiAmJiBBcnJheS5pc0FycmF5KHZhbHVlKSkgdmFsdWUgPSB2YWx1ZS5qb2luKFwiIFwiKTtcclxuXHJcbiAgICAgIGlmICh2YWx1ZSA9PT0gdHJ1ZSkgbm9kZS5zZXRBdHRyaWJ1dGUoa2V5LCBcIlwiKTtcclxuICAgICAgZWxzZSBpZiAodHlwZW9mIHZhbHVlID09PSBcInN0cmluZ1wiIHx8IHR5cGVvZiB2YWx1ZSA9PT0gXCJudW1iZXJcIilcclxuICAgICAgICBub2RlLnNldEF0dHJpYnV0ZShrZXksIFN0cmluZyh2YWx1ZSkpO1xyXG4gICAgICAvLyBrZXkgaGFzIHRoZSBmb3JtIG9mIFwib24tY2hhbmdlXCIuIHZhbHVlIGlzIHRoZSBjYWxsYmFjayBmdW5jdGlvbiBvciBhbiBvYmplY3QgaW1wbGVtZW50aW5nIHtFdmVudExpc3RlbmVyfSBpbnRlcmZhY2VcclxuICAgICAgZWxzZSBpZiAoXHJcbiAgICAgICAga2V5LnN0YXJ0c1dpdGgoXCJvbi1cIikgJiZcclxuICAgICAgICAodHlwZW9mIHZhbHVlID09PSBcImZ1bmN0aW9uXCIgfHwgdHlwZW9mIHZhbHVlID09PSBcIm9iamVjdFwiKVxyXG4gICAgICApIHtcclxuICAgICAgICAvLyByZW1vdmUgbGVhZGluZyBcIm9uLVwiXCJcclxuICAgICAgICBjb25zdCBldmVudCA9IGtleS5yZXBsYWNlKC9eb24tLywgXCJcIik7XHJcblxyXG4gICAgICAgIG5vZGUuYWRkRXZlbnRMaXN0ZW5lcihcclxuICAgICAgICAgIGV2ZW50LFxyXG4gICAgICAgICAgdmFsdWUgYXMgRXZlbnRMaXN0ZW5lck9yRXZlbnRMaXN0ZW5lck9iamVjdFxyXG4gICAgICAgICk7XHJcbiAgICAgIH1cclxuICAgICAgLy8gQHRzLWlnbm9yZSAtIHByb3ZpZGluZyB0aGUgdmFsdWUgYXMgcHJvcGVydHkgdG8gaHRtbCBlbGVtZW50XHJcbiAgICAgIGVsc2Ugbm9kZVtrZXldID0gdmFsdWU7XHJcbiAgICB9KTtcclxuXHJcbiAgLy8gcmV0dXJucyBjaGlsZCBqc3ggbm9kZXMgYXMgd2VsbCB0byBiZSB1c2VkIGR1cmluZyB0aGUgcmVmIGNhbGxcclxuICBjb25zdCBjaGlsZEpzeE5vZGVzID0gY2hpbGRyZW4uZmlsdGVyKChjaGlsZCkgPT4gY2hpbGQgaW5zdGFuY2VvZiBWTm9kZSk7XHJcblxyXG4gIG5vZGUuYXBwZW5kKFxyXG4gICAgLi4uY2hpbGRyZW5cclxuICAgICAgLy8uZmxhdCgpXHJcbiAgICAgIC5tYXAoKGNoaWxkKSA9PiBjaGlsZC5hc05vZGUoKSlcclxuICApO1xyXG5cclxuICAvLyBzdmcgZWxlbWVudCBhbmQgYWxsIGl0cyBjaGlsZHJlbiB3ZXJlIHJlbmRlcmVkLCByZXNldCB0aGUgc3ZnIGNvbnRleHRcclxuICBpZiAoc3ZnQ29udGV4dFNldCkgc3ZnQ29udGV4dCA9IGZhbHNlO1xyXG5cclxuICByZXR1cm4gW25vZGUsIGNoaWxkSnN4Tm9kZXMgYXMgSnN4Tm9kZUludGVyZmFjZVtdXTtcclxufVxyXG5cclxuZnVuY3Rpb24gaW5zZXJ0TmV3SXRlbShuZXdOb2RlOiBWTm9kZUludGVyZmFjZSkge1xyXG4gIGNvbnN0IFtwYXJlbnQsIG5leHRTaWJsaW5nXSA9IGdldFBhcmVudEFuZE5leHRTaWJsaW5nKG5ld05vZGUpO1xyXG4gIHBhcmVudC5pbnNlcnRCZWZvcmUobmV3Tm9kZS5hc05vZGUoKSwgbmV4dFNpYmxpbmcpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBkaWZmQW5kUGF0Y2hDaGlsZHJlbihcclxuICBvbGROb2RlOiBWTm9kZUludGVyZmFjZSxcclxuICBuZXdOb2RlOiBWTm9kZUludGVyZmFjZVxyXG4pIHtcclxuICBvbGROb2RlLmNoaWxkcmVuLmZvckVhY2goKG9sZENoaWxkLCBpeCkgPT4ge1xyXG4gICAgY29uc3QgbmV3Q2hpbGQgPSBuZXdOb2RlLmNoaWxkcmVuW2l4XTtcclxuICAgIC8vIGNoaWxkIHdhcyByZW1vdmVkXHJcbiAgICBpZiAoIW5ld0NoaWxkKSBvbGRDaGlsZC5yZW1vdmVGcm9tRE9NKCk7XHJcbiAgICAvLyBjaGlsZCBpcyBtb2RpZmllZFxyXG4gICAgZWxzZSBpZiAobmV3Q2hpbGQudHlwZSA9PT0gb2xkQ2hpbGQudHlwZSkgb2xkQ2hpbGQuZGlmZkFuZFBhdGNoKG5ld0NoaWxkKTtcclxuICAgIC8vIGNoaWxkIGlzIHJlcGxhY2VkXHJcbiAgICBlbHNlIHtcclxuICAgICAgb2xkQ2hpbGQucmVtb3ZlRnJvbURPTSgpO1xyXG4gICAgICBpbnNlcnROZXdJdGVtKG5ld0NoaWxkKTtcclxuICAgIH1cclxuICB9KTtcclxuXHJcbiAgLy8gbmV3IGFkZGl0aW9uIGl0ZW1zXHJcbiAgY29uc3QgbmV3SXRlbXMgPSBuZXdOb2RlLmNoaWxkcmVuLnNsaWNlKG9sZE5vZGUuY2hpbGRyZW4ubGVuZ3RoKTtcclxuICBpZiAobmV3SXRlbXMubGVuZ3RoKSB7XHJcbiAgICBjb25zdCBkb2N1bWVudEZyYWdtZW50ID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO1xyXG4gICAgbmV3SXRlbXMuZm9yRWFjaCgoaXRlbSkgPT4gZG9jdW1lbnRGcmFnbWVudC5hcHBlbmQoaXRlbS5hc05vZGUoKSkpO1xyXG5cclxuICAgIGNvbnN0IFtwYXJlbnQsIG5leHRTaWJsaW5nXSA9IGdldFBhcmVudEFuZE5leHRTaWJsaW5nKG5ld0l0ZW1zWzBdKTtcclxuICAgIHBhcmVudC5pbnNlcnRCZWZvcmUoZG9jdW1lbnRGcmFnbWVudCwgbmV4dFNpYmxpbmcpO1xyXG4gIH1cclxufVxyXG5cclxuY2xhc3MgVk5vZGUge31cclxuXHJcbmludGVyZmFjZSBWTm9kZUludGVyZmFjZSB7XHJcbiAgdG9TdHJpbmcoKTogc3RyaW5nO1xyXG4gIGFzTm9kZSgpOiBOb2RlO1xyXG4gIHBhcmVudDogVk5vZGVJbnRlcmZhY2UgfCBudWxsO1xyXG4gIGNoaWxkcmVuOiBBcnJheTxWTm9kZUludGVyZmFjZSB8IG5ldmVyPjtcclxuICB0eXBlOiBzdHJpbmc7XHJcbiAgbm9kZT86IENoaWxkTm9kZTtcclxuICByZW1vdmVGcm9tRE9NKCk6IHZvaWQ7XHJcbiAgZGlmZkFuZFBhdGNoKG5ld05vZGU6IFZOb2RlSW50ZXJmYWNlKTogdm9pZDtcclxufVxyXG5cclxuY2xhc3MgRWxlbWVudFZOb2RlIGV4dGVuZHMgVk5vZGUgaW1wbGVtZW50cyBWTm9kZUludGVyZmFjZSB7XHJcbiAgdHlwZSA9IFwiRWxlbWVudFwiO1xyXG4gIG5vZGU6IEhUTUxFbGVtZW50ID0gbnVsbCBhcyBhbnk7XHJcbiAgY2hpbGRyZW46IFZOb2RlSW50ZXJmYWNlW107XHJcbiAgcGFyZW50OiBWTm9kZUludGVyZmFjZSA9IG51bGwgYXMgYW55O1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgdGFnOiBzdHJpbmcsXHJcbiAgICBwcml2YXRlIHByb3BzOiBSZWNvcmQ8c3RyaW5nLCBhbnk+LFxyXG4gICAgY2hpbGRyZW46IFZOb2RlSW50ZXJmYWNlW11cclxuICApIHtcclxuICAgIHN1cGVyKCk7XHJcbiAgICB0aGlzLmNoaWxkcmVuID0gY2hpbGRyZW4ubWFwKChjaGlsZCkgPT4ge1xyXG4gICAgICBpZiAoQXJyYXkuaXNBcnJheShjaGlsZCkpIHJldHVybiBuZXcgRnJhZ21lbnRWTm9kZShjaGlsZCk7XHJcbiAgICAgIGlmIChjaGlsZCBpbnN0YW5jZW9mIFZOb2RlKSB7XHJcbiAgICAgICAgcmV0dXJuIGNoaWxkO1xyXG4gICAgICB9XHJcbiAgICAgIGlmIChjaGlsZCBpbnN0YW5jZW9mIE5vZGUpIHtcclxuICAgICAgICByZXR1cm4gbmV3IExpdmVOb2RlVk5vZGUoY2hpbGQpO1xyXG4gICAgICB9XHJcbiAgICAgIGlmICghdHJ1dGh5KGNoaWxkKSkge1xyXG4gICAgICAgIHJldHVybiBuZXcgTnVsbFZOb2RlKCk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHJldHVybiBuZXcgVGV4dFZOb2RlKGNoaWxkKTtcclxuICAgIH0pO1xyXG4gICAgdGhpcy5jaGlsZHJlbi5mb3JFYWNoKChjaGlsZCkgPT4gKGNoaWxkLnBhcmVudCA9IHRoaXMpKTtcclxuICB9XHJcbiAgdG9TdHJpbmcoKSB7XHJcbiAgICByZXR1cm4gYXNIdG1sU3RyaW5nKHRoaXMudGFnLCB0aGlzLnByb3BzLCB0aGlzLmNoaWxkcmVuKTtcclxuICB9XHJcbiAgYXNOb2RlKCkge1xyXG4gICAgY29uc3Qgbm9kZSA9IGFzTm9kZSh0aGlzLnRhZywgdGhpcy5wcm9wcywgdGhpcy5jaGlsZHJlbilbMF07XHJcbiAgICB0aGlzLm5vZGUgPSBub2RlO1xyXG5cclxuICAgIC8vIG1lbW9yaXplIGZvciBuZXh0IHN1YnRyZWUgcmUtcmVuZGVyc1xyXG4gICAgcmVuZGVyZWRWVHJlZXMuc2V0KG5vZGUsIHRoaXMpO1xyXG5cclxuICAgIHJldHVybiBub2RlO1xyXG4gIH1cclxuICByZW1vdmVGcm9tRE9NKCkge1xyXG4gICAgdGhpcy5ub2RlLnBhcmVudEVsZW1lbnQucmVtb3ZlQ2hpbGQodGhpcy5ub2RlKTtcclxuICB9XHJcbiAgZGlmZkFuZFBhdGNoKG5ld05vZGU6IEVsZW1lbnRWTm9kZSkge1xyXG4gICAgaWYgKG5ld05vZGUudGFnID09PSB0aGlzLnRhZykge1xyXG4gICAgICBuZXdOb2RlLm5vZGUgPSB0aGlzLm5vZGU7XHJcbiAgICAgIC8vICAgICAgcGF0Y2ggcHJvcHMsXHJcbiAgICAgIC8vIHVwZGF0ZSBwcm9wcyBmb3JtIG5ldyBub2RlXHJcbiAgICAgIE9iamVjdC5lbnRyaWVzKG5ld05vZGUucHJvcHMpXHJcbiAgICAgICAgLmZpbHRlcigoW2ssIHZdKSA9PiB0aGlzLnByb3BzW2tdICE9PSB2KVxyXG4gICAgICAgIC5mb3JFYWNoKChba2V5LCB2YWx1ZV0pID0+IHtcclxuICAgICAgICAgIGlmICh2YWx1ZSA9PT0gdHJ1ZSkgbmV3Tm9kZS5ub2RlLnNldEF0dHJpYnV0ZShrZXksIFwiXCIpO1xyXG4gICAgICAgICAgZWxzZSBpZiAodmFsdWUgPT09IG51bGwgfHwgdmFsdWUgPT09IHVuZGVmaW5lZCB8fCB2YWx1ZSA9PT0gZmFsc2UpXHJcbiAgICAgICAgICAgIG5ld05vZGUubm9kZS5yZW1vdmVBdHRyaWJ1dGUoa2V5KTtcclxuICAgICAgICAgIGVsc2UgbmV3Tm9kZS5ub2RlLnNldEF0dHJpYnV0ZShrZXksIHZhbHVlKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgIC8vIHJlbW92ZSBvbGQsIG9ic29sYXRlIGF0dHJpYnV0ZXNcclxuICAgICAgT2JqZWN0LmVudHJpZXModGhpcy5wcm9wcylcclxuICAgICAgICAuZmlsdGVyKChbaywgdl0pID0+ICFuZXdOb2RlLnByb3BzLmhhc093blByb3BlcnR5KGspKVxyXG4gICAgICAgIC5mb3JFYWNoKChba2V5LCB2YWx1ZV0pID0+IHtcclxuICAgICAgICAgIHRoaXMubm9kZS5yZW1vdmVBdHRyaWJ1dGUoa2V5KTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgIC8vIGNoaWxkcmVuID0+IGl0ZXIgYW5kIHBhdGNoXHJcbiAgICAgIC8vIG9sZCBjaGlsZHJlbiBiZWluZyBtb2RpZmllZFxyXG4gICAgICBkaWZmQW5kUGF0Y2hDaGlsZHJlbih0aGlzLCBuZXdOb2RlKTtcclxuICAgIH1cclxuICAgIC8vIHRhZyBoYXMgY2hhbmdlZFxyXG4gICAgZWxzZSB7XHJcbiAgICAgIHRoaXMubm9kZS5yZXBsYWNlV2l0aChuZXdOb2RlLmFzTm9kZSgpKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBtZW1vcml6ZSBmb3IgbmV4dCBzdWJ0cmVlIHJlLXJlbmRlcnNcclxuICAgIHJlbmRlcmVkVlRyZWVzLnNldCh0aGlzLm5vZGUsIG5ld05vZGUpO1xyXG4gIH1cclxufVxyXG5cclxuY2xhc3MgRnJhZ21lbnRWTm9kZSBleHRlbmRzIFZOb2RlIGltcGxlbWVudHMgVk5vZGVJbnRlcmZhY2Uge1xyXG4gIHR5cGUgPSBcIkZyYWdtZW50XCI7XHJcbiAgY2hpbGRyZW46IFZOb2RlSW50ZXJmYWNlW107XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgY2hpbGRyZW46IEFycmF5PFxyXG4gICAgICBWTm9kZUludGVyZmFjZSB8IENoaWxkTm9kZSB8IHN0cmluZyB8IGJvb2xlYW4gfCBudWxsIHwgdW5kZWZpbmVkIHwgbnVtYmVyXHJcbiAgICA+XHJcbiAgKSB7XHJcbiAgICBzdXBlcigpO1xyXG5cclxuICAgIHRoaXMuY2hpbGRyZW4gPSBjaGlsZHJlbi5tYXAoKGNoaWxkKSA9PiB7XHJcbiAgICAgIGlmIChBcnJheS5pc0FycmF5KGNoaWxkKSkgcmV0dXJuIG5ldyBGcmFnbWVudFZOb2RlKGNoaWxkKTtcclxuICAgICAgaWYgKGNoaWxkIGluc3RhbmNlb2YgVk5vZGUpIHJldHVybiBjaGlsZDtcclxuICAgICAgaWYgKGNoaWxkIGluc3RhbmNlb2YgTm9kZSkgcmV0dXJuIG5ldyBMaXZlTm9kZVZOb2RlKGNoaWxkKTtcclxuICAgICAgaWYgKCF0cnV0aHkoY2hpbGQpKSByZXR1cm4gbmV3IE51bGxWTm9kZSgpO1xyXG4gICAgICByZXR1cm4gbmV3IFRleHRWTm9kZShjaGlsZCBhcyBzdHJpbmcgfCBudW1iZXIpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgdGhpcy5jaGlsZHJlbi5mb3JFYWNoKChjaGlsZCkgPT4gKGNoaWxkLnBhcmVudCA9IHRoaXMpKTtcclxuICB9XHJcblxyXG4gIGFzTm9kZSgpIHtcclxuICAgIGNvbnN0IG5vZGUgPSBhc05vZGUodW5kZWZpbmVkLCB7fSwgdGhpcy5jaGlsZHJlbilbMF07XHJcblxyXG4gICAgcmV0dXJuIG5vZGU7XHJcbiAgfVxyXG5cclxuICB0b1N0cmluZygpIHtcclxuICAgIHJldHVybiB0aGlzLmNoaWxkcmVuLm1hcCgoY2hpbGQpID0+IGNoaWxkLnRvU3RyaW5nKCkpLmpvaW4oXCJcIik7XHJcbiAgfVxyXG5cclxuICAvLyB0byBsZXZlbFxyXG4gIGRpZmZBbmRQYXRjaChuZXdWTm9kZTogRnJhZ21lbnRWTm9kZSkge1xyXG4gICAgcmV0dXJuIGRpZmZBbmRQYXRjaENoaWxkcmVuKHRoaXMsIG5ld1ZOb2RlKTtcclxuICB9XHJcblxyXG4gIHJlbW92ZUZyb21ET00oKSB7XHJcbiAgICB0aGlzLmNoaWxkcmVuLmZvckVhY2goKGNoaWxkKSA9PiBjaGlsZC5yZW1vdmVGcm9tRE9NKCkpO1xyXG4gIH1cclxufVxyXG5cclxuY2xhc3MgVGV4dFZOb2RlIGV4dGVuZHMgVk5vZGUgaW1wbGVtZW50cyBWTm9kZUludGVyZmFjZSB7XHJcbiAgdHlwZSA9IFwiVGV4dE5vZGVcIjtcclxuICBjaGlsZHJlbiA9IFtdO1xyXG4gIG5vZGU6IFRleHQgPSBudWxsIGFzIGFueTtcclxuICBwcm9wczogeyBjb250ZW50OiBhbnkgfTtcclxuICBwYXJlbnQ6IFZOb2RlSW50ZXJmYWNlID0gbnVsbCBhcyBhbnk7XHJcblxyXG4gIC8qKlxyXG4gICAqXHJcbiAgICovXHJcbiAgY29uc3RydWN0b3IoY29udGVudDogc3RyaW5nIHwgbnVtYmVyIHwgYm9vbGVhbikge1xyXG4gICAgc3VwZXIoKTtcclxuICAgIHRoaXMucHJvcHMgPSB7IGNvbnRlbnQgfTsgLy9AVE9ETzpcclxuICB9XHJcblxyXG4gIGFzTm9kZSgpIHtcclxuICAgIGNvbnN0IHRleHROb2RlID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUodGhpcy5wcm9wcy5jb250ZW50KTtcclxuICAgIHRoaXMubm9kZSA9IHRleHROb2RlO1xyXG4gICAgcmV0dXJuIHRleHROb2RlO1xyXG4gIH1cclxuXHJcbiAgdG9TdHJpbmcoKSB7XHJcbiAgICByZXR1cm4gc2FuaXRpemUodGhpcy5wcm9wcy5jb250ZW50KTtcclxuICB9XHJcblxyXG4gIGRpZmZBbmRQYXRjaChuZXdOb2RlOiBUZXh0Vk5vZGUpIHtcclxuICAgIHRoaXMubm9kZS5ub2RlVmFsdWUgPSBuZXdOb2RlLnByb3BzLmNvbnRlbnQ7XHJcbiAgICBuZXdOb2RlLm5vZGUgPSB0aGlzLm5vZGU7XHJcbiAgfVxyXG5cclxuICByZW1vdmVGcm9tRE9NKCkge1xyXG4gICAgdGhpcy5ub2RlLnBhcmVudEVsZW1lbnQhLnJlbW92ZUNoaWxkKHRoaXMubm9kZSk7XHJcbiAgfVxyXG59XHJcblxyXG5jbGFzcyBOdWxsVk5vZGUgZXh0ZW5kcyBWTm9kZSBpbXBsZW1lbnRzIFZOb2RlSW50ZXJmYWNlIHtcclxuICB0eXBlID0gXCJOdWxsXCI7XHJcbiAgY2hpbGRyZW4gPSBbXTtcclxuICBwYXJlbnQ6IFZOb2RlSW50ZXJmYWNlID0gbnVsbCBhcyBhbnk7XHJcbiAgLyoqXHJcbiAgICpcclxuICAgKi9cclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIHN1cGVyKCk7XHJcbiAgfVxyXG5cclxuICBhc05vZGUoKSB7XHJcbiAgICAvL3JldHVybiBudWxsOyAvLyByZXR1cm4gZW1wdHkgZnJhZ21lbnQ/XHJcbiAgICByZXR1cm4gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO1xyXG4gIH1cclxuXHJcbiAgZGlmZkFuZFBhdGNoKG5ld05vZGUyOiBOdWxsVk5vZGUpIHtcclxuICAgIHJldHVybjtcclxuICB9XHJcblxyXG4gIHJlbW92ZUZyb21ET00oKSB7XHJcbiAgICByZXR1cm47XHJcbiAgfVxyXG5cclxuICB0b1N0cmluZygpIHtcclxuICAgIHJldHVybiBcIlwiO1xyXG4gIH1cclxufVxyXG5cclxuY2xhc3MgTGl2ZU5vZGVWTm9kZSBleHRlbmRzIFZOb2RlIGltcGxlbWVudHMgVk5vZGVJbnRlcmZhY2Uge1xyXG4gIHR5cGUgPSBcIk5vZGVcIjtcclxuICBjaGlsZHJlbiA9IFtdO1xyXG4gIHBhcmVudDogVk5vZGVJbnRlcmZhY2UgPSBudWxsIGFzIGFueTtcclxuICBub2RlOiBDaGlsZE5vZGU7XHJcblxyXG4gIC8qKlxyXG4gICAqXHJcbiAgICovXHJcbiAgY29uc3RydWN0b3Iobm9kZTogQ2hpbGROb2RlKSB7XHJcbiAgICBzdXBlcigpO1xyXG4gICAgdGhpcy5ub2RlID0gbm9kZTtcclxuICB9XHJcblxyXG4gIGFzTm9kZSgpIHtcclxuICAgIHJldHVybiB0aGlzLm5vZGU7XHJcbiAgfVxyXG5cclxuICBkaWZmQW5kUGF0Y2gobmV3Tm9kZTogTGl2ZU5vZGVWTm9kZSkge1xyXG4gICAgaWYgKG5ld05vZGUubm9kZSAhPT0gdGhpcy5ub2RlKSB7XHJcbiAgICAgIHRoaXMubm9kZS5yZXBsYWNlV2l0aChuZXdOb2RlLm5vZGUpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcmVtb3ZlRnJvbURPTSgpIHtcclxuICAgIHRoaXMubm9kZS5wYXJlbnRFbGVtZW50IS5yZW1vdmVDaGlsZCh0aGlzLm5vZGUpO1xyXG4gIH1cclxuXHJcbiAgdG9TdHJpbmcoKSB7XHJcbiAgICByZXR1cm4gZ2V0T3V0ZXJIdG1sKHRoaXMubm9kZSk7XHJcbiAgfVxyXG59XHJcblxyXG5jbGFzcyBSb290Vk5vZGUgZXh0ZW5kcyBWTm9kZSBpbXBsZW1lbnRzIFZOb2RlSW50ZXJmYWNlIHtcclxuICB0eXBlID0gXCJSb290XCI7XHJcbiAgcGFyZW50ID0gbnVsbDtcclxuICBub2RlOiBFbGVtZW50O1xyXG4gIGNoaWxkcmVuOiBWTm9kZUludGVyZmFjZVtdO1xyXG4gIC8qKlxyXG4gICAqXHJcbiAgICovXHJcbiAgY29uc3RydWN0b3IoY29udGVudDogVk5vZGVJbnRlcmZhY2UsIGRvbU5vZGU6IEVsZW1lbnQpIHtcclxuICAgIHN1cGVyKCk7XHJcbiAgICBjb250ZW50LnBhcmVudCA9IHRoaXM7XHJcbiAgICB0aGlzLmNoaWxkcmVuID0gW2NvbnRlbnRdO1xyXG4gICAgdGhpcy5ub2RlID0gZG9tTm9kZTtcclxuICB9XHJcblxyXG4gIGFzTm9kZSgpIHtcclxuICAgIHJldHVybiB0aGlzLmNoaWxkcmVuWzBdLmFzTm9kZSgpO1xyXG4gIH1cclxuICB0b1N0cmluZygpIHtcclxuICAgIHJldHVybiB0aGlzLmNoaWxkcmVuWzBdLnRvU3RyaW5nKCk7XHJcbiAgfVxyXG5cclxuICBkaWZmQW5kUGF0Y2gobmV3Vk5vZGU6IFZOb2RlSW50ZXJmYWNlKSB7XHJcbiAgICBkaWZmQW5kUGF0Y2hDaGlsZHJlbih0aGlzLCBuZXdWTm9kZSk7XHJcbiAgfVxyXG5cclxuICByZW1vdmVGcm9tRE9NKCkge1xyXG4gICAgdGhpcy5ub2RlLnJlbW92ZSgpO1xyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gYXNWTm9kZShcclxuICB0YWc6IHN0cmluZyB8IEZ1bmN0aW9uIHwgdW5kZWZpbmVkLFxyXG4gIHByb3BzOiBKc3hQcm9wc1xyXG4pOiBWTm9kZUludGVyZmFjZSB7XHJcbiAgY29uc29sZS5sb2coXCJhc1ZOb2RlOlwiLCB7IHRhZywgcHJvcHMgfSk7XHJcblxyXG4gIGlmICh0eXBlb2YgdGFnID09PSBcImZ1bmN0aW9uXCIpIHtcclxuICAgIGxldCByZXN1bHQgPSB0YWcocHJvcHMpO1xyXG4gICAgaWYgKHJlc3VsdCBpbnN0YW5jZW9mIFZOb2RlKSByZXR1cm4gcmVzdWx0O1xyXG4gICAgaWYgKHJlc3VsdCBpbnN0YW5jZW9mIE5vZGUpIHJldHVybiBuZXcgTGl2ZU5vZGVWTm9kZShyZXN1bHQpO1xyXG4gICAgLy8gbnVsbCBqc3ggbm9kZVxyXG4gICAgaWYgKCF0cnV0aHkocmVzdWx0KSkgcmV0dXJuIG5ldyBOdWxsVk5vZGUoKTtcclxuXHJcbiAgICByZXR1cm4gbmV3IFRleHRWTm9kZShyZXN1bHQpO1xyXG4gIH1cclxuXHJcbiAgY29uc3QgeyBjaGlsZHJlbiwgLi4uYXR0ciB9ID0gcHJvcHM7XHJcbiAgaWYgKHRhZykge1xyXG4gICAgcmV0dXJuIG5ldyBFbGVtZW50Vk5vZGUodGFnLCBhdHRyLCBjaGlsZHJlbik7IC8vIG9yIHNpbXBseSBwYXNzIGNpbGRyZW4gd2l0aCBwcm9wc1xyXG4gIH0gZWxzZSBpZiAoIXRydXRoeShhdHRyKSkge1xyXG4gICAgY29uc3Qgdk5vZGUgPSBuZXcgTnVsbFZOb2RlKCk7XHJcbiAgICB2Tm9kZS5wYXJlbnQgPSB0aGlzO1xyXG4gICAgcmV0dXJuIHZOb2RlO1xyXG4gIH0gZWxzZSBpZiAoY2hpbGRyZW4pIHtcclxuICAgIHJldHVybiBuZXcgRnJhZ21lbnRWTm9kZShjaGlsZHJlbik7XHJcbiAgfVxyXG5cclxuICAvLyBlbHNlPyAvLyBAVE9ETzo/XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBjb252ZXJ0cyBwcmFnbWEgb2JqZWN0IHRvIGh0bWwgc3RyaW5nXHJcbiAqIGpzeHMgaXMgYWx3YXlzIGNhbGxlZCB3aGVuIGVsZW1lbnQgaGFzIG1vcmUgdGhhbiBvbmUgY2hpbGRcclxuICpcclxuICogQHBhcmFtIHtzdHJpbmcgfCBGdW5jdGlvbn0gdGFnIC0gdGFnIG5hbWUgb3IgdGFnIGNsYXNzXHJcbiAqIEBwYXJhbSB7T2JqZWN0IHwgbnVsbH0gcHJvcHMgLSBwcm9wcyBmb3IgdGhlIHRhZ1xyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGpzeHMoXHJcbiAgdGFnOiBzdHJpbmcgfCBGdW5jdGlvbixcclxuICBwcm9wczogSnN4UHJvcHNcclxuKTogSnN4Tm9kZUludGVyZmFjZSB7XHJcbiAgcmV0dXJuIGFzVk5vZGUodGFnLCBwcm9wcyk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBjb252ZXJ0cyB0aGUgZnJhZ21lbnRzIG9iamVjdCB0byBub2Rlc1xyXG4gKlxyXG4gKiBAcGFyYW0ge09iamVjdH0gcHJvcHNcclxuICogQHBhcmFtIHtBcnJheX0gcHJvcHMuY2hpbGRyZW4gLSBjaGlsZCBlbGVtZW50cyBpbiB0aGUgZnJhZ21lbnRcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBGcmFnbWVudChwcm9wczogSnN4UHJvcHMpIHtcclxuICByZXR1cm4gYXNWTm9kZSh1bmRlZmluZWQsIHByb3BzKTtcclxufVxyXG5cclxuLy8ganN4IGlzIGNhbGxlZCB3aGVuIHRoZSBlbGVtZW50IGhhcyBvbmUgb3IgemVybyBjaGlsZHJlblxyXG5leHBvcnQgZnVuY3Rpb24ganN4KFxyXG4gIHRhZzogc3RyaW5nIHwgRnVuY3Rpb24sXHJcbiAgcHJvcHM6IEF0dHJpYnV0ZXMgJlxyXG4gICAgU3BlY2lhbEF0dHJpYnV0ZXMgJiB7IGNoaWxkcmVuPzogc3RyaW5nIHwgTm9kZSB8IEpzeE5vZGVJbnRlcmZhY2UgfVxyXG4pOiBKc3hOb2RlSW50ZXJmYWNlIHtcclxuICAvLyBAdHMtaWdub3JlIC0gd3JhcHBpbmcgdGhlIGNoaWxkcmVuIGFzIGFycmF5IHRvIHJlLXVzZSBqc3hzIG1ldGhvZFxyXG4gIHByb3BzLmNoaWxkcmVuID0gcHJvcHMuaGFzT3duUHJvcGVydHkoXCJjaGlsZHJlblwiKSA/IFtwcm9wcy5jaGlsZHJlbl0gOiBbXTtcclxuXHJcbiAgcmV0dXJuIGpzeHModGFnLCAocHJvcHMgYXMgdW5rbm93bikgYXMgSnN4UHJvcHMpO1xyXG59XHJcblxyXG4vKipcclxuICogcmVuZGVyIHRoZSBnaXZlbiBtYXJrdXAgaW50byB0aGUgZ2l2ZW4gZG9tIG5vZGVcclxuICpcclxuICogQHBhcmFtIHtzdHJpbmd8SFRNTEVsZW1lbnR8SlNYfSBtYXJrdXAgLSBodG1sIGFzIHN0cmluZywgaHRtbCBlbGVtZW50IG9yIGpzeCB0ZW1wbGF0ZVxyXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBkb21Ob2RlIC0gY29udGFpbmVyIGZvciB0aGUgdGVtcGxhdGUgdG8gYmUgcmVuZGVyZWQgaW50b1xyXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFthcHBlbmQ9ZmFsc2VdIC0gc2hvdWxkIHRoZSBwcm92aWRlZCBtYXJrdXAgYmUgYXBwZW5kZWQgdG8gdGhlIGV4aXN0aW5nIG1hcmt1cCwgb3IgZGVmYXVsdCByZXBsYWNlIGl0XHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gcmVuZGVyKFxyXG4gIG1hcmt1cDogc3RyaW5nIHwgSFRNTEVsZW1lbnQgfCBKc3hOb2RlSW50ZXJmYWNlLCAvLyBAVE9ETzogc3BlY2lmaWMgc3VwcG9ydCBmb3IgVGVtcGxhdGU/ICguY29udGVudC5jbG9uZSlcclxuICBkb21Ob2RlOiBIVE1MRWxlbWVudCxcclxuICBhcHBlbmQ6IGJvb2xlYW4gPSBmYWxzZVxyXG4pIHtcclxuICBBcnJheS5mcm9tKGRvY3VtZW50LmJvZHkucXVlcnlTZWxlY3RvckFsbChcIipcIikpLmZvckVhY2goXHJcbiAgICAoZWwpID0+IChlbC5zdHlsZS5iYWNrZ3JvdW5kID0gXCIjY2NmZmNjXCIpXHJcbiAgKTtcclxuXHJcbiAgY29uc3QgaXNSZVJlbmRlciA9IHJlbmRlcmVkVlRyZWVzLmhhcyhkb21Ob2RlKTtcclxuICBpZiAoIWFwcGVuZCAmJiAhaXNSZVJlbmRlcikgZG9tTm9kZS5pbm5lckhUTUwgPSBcIlwiO1xyXG5cclxuICBpZiAodHlwZW9mIG1hcmt1cCA9PT0gXCJzdHJpbmdcIikge1xyXG4gICAgZG9tTm9kZS5pbnNlcnRBZGphY2VudEhUTUwoXCJiZWZvcmVlbmRcIiwgbWFya3VwKTsgLy8gc2FuaXRpemU/XHJcbiAgfSBlbHNlIGlmIChtYXJrdXAgaW5zdGFuY2VvZiBOb2RlKSB7XHJcbiAgICBkb21Ob2RlLmluc2VydEFkamFjZW50RWxlbWVudChcImJlZm9yZWVuZFwiLCBtYXJrdXApO1xyXG4gIH0gZWxzZSBpZiAobWFya3VwIGluc3RhbmNlb2YgVk5vZGUpIHtcclxuICAgIHN2Z0NvbnRleHQgPSBmYWxzZTtcclxuXHJcbiAgICBjb25zdCB2VHJlZSA9IG5ldyBSb290Vk5vZGUobWFya3VwLCBkb21Ob2RlKTtcclxuXHJcbiAgICBjb25zb2xlLmxvZyhcIiMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjI1xcblwiLCBcInZUcmVlOlwiLCB2VHJlZSk7XHJcblxyXG4gICAgaWYgKGlzUmVSZW5kZXIpIHtcclxuICAgICAgY29uc29sZS5sb2coXCJpcyByZS1yZW5kZXJcIik7XHJcbiAgICAgIGNvbnN0IG9sZFZUcmVlID0gcmVuZGVyZWRWVHJlZXMuZ2V0KGRvbU5vZGUpO1xyXG5cclxuICAgICAgY29uc29sZS5sb2coXCIjIyMjIyMjIyMjI1xcblwiLCB7IG9sZFZUcmVlLCBuZXdWVHJlZTogdlRyZWUgfSk7XHJcblxyXG4gICAgICAvLyB3YXMgcHJldmlvdXNseSByZW5kZXJkIGFzIGEgc3VidHJlZSBmcm9tIGFub3RoZXIgcmVuZGVyXHJcbiAgICAgIGlmIChvbGRWVHJlZS50eXBlID09PSBcIkVsZW1lbnRcIikge1xyXG4gICAgICAgIC8vIHVwZGF0ZSBpdHMgY2hpbGRyZW5cclxuICAgICAgICBkaWZmQW5kUGF0Y2hDaGlsZHJlbihvbGRWVHJlZSwgdlRyZWUpO1xyXG4gICAgICAgIC8vIHVwZGF0ZSB0aGUgY2hpbGRyZW4gcHJvcGVydHkgaW4gdGhlIG1lbW9yeSByZWZlcmVuY2UgZnJvbSB0aGUgcHJldmlvdXMgcmVuZGVyLFxyXG4gICAgICAgIC8vIGF0dHJpYnV0ZXMsIGV0YyB3aWxsIHN0YXkgdGhlIHNhbWVcclxuICAgICAgICBvbGRWVHJlZS5jaGlsZHJlbiA9IHZUcmVlLmNoaWxkcmVuO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIC8vIGRpZmZcclxuICAgICAgICBvbGRWVHJlZS5kaWZmQW5kUGF0Y2godlRyZWUpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICByZW5kZXJlZFZUcmVlcy5zZXQoZG9tTm9kZSwgdlRyZWUpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY29uc3QgY29udGVudCA9IHZUcmVlLmFzTm9kZSgpO1xyXG4gICAgICBkb21Ob2RlLmFwcGVuZChjb250ZW50KTtcclxuICAgIH1cclxuXHJcbiAgICByZW5kZXJlZFZUcmVlcy5zZXQoZG9tTm9kZSwgdlRyZWUpO1xyXG5cclxuICAgIHdoaWxlIChyZWZzVG9DYWxsLmxlbmd0aCkge1xyXG4gICAgICAvLyByZW1vdmUgZmlyc3QgZnJvbSBsaXN0LCBhbmQgaW52b2tlIGl0XHJcbiAgICAgIHJlZnNUb0NhbGwuc3BsaWNlKDAsIDEpWzBdKCk7XHJcbiAgICB9XHJcbiAgfSBlbHNlIHtcclxuICAgIHRocm93IG5ldyBFcnJvcihcInJlbmRlciBtZXRob2QgY2FsbGVkIHdpdGggd3JvbmcgYXJndW1lbnQocylcIik7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gcmF3SHRtbChjb250ZW50OiBzdHJpbmcpOiBWTm9kZUludGVyZmFjZSB7XHJcbiAgcmV0dXJuIG5ldyAoY2xhc3MgZXh0ZW5kcyBWTm9kZSBpbXBsZW1lbnRzIFZOb2RlSW50ZXJmYWNlIHtcclxuICAgIHBhcmVudDogVk5vZGVJbnRlcmZhY2UgPSBudWxsIGFzIGFueTtcclxuICAgIGNoaWxkcmVuID0gW107XHJcbiAgICB0eXBlID0gXCJSYXdIdG1sXCI7XHJcbiAgICBjaGlsZE5vZGVzOiBDaGlsZE5vZGVbXTtcclxuICAgIGNvbnRlbnQ6IHN0cmluZztcclxuICAgIG5vZGU/OiBDaGlsZE5vZGU7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKlxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3Rvcihjb250ZW50OiBzdHJpbmcpIHtcclxuICAgICAgc3VwZXIoKTtcclxuICAgICAgdGhpcy5jb250ZW50ID0gY29udGVudDtcclxuICAgIH1cclxuICAgIHJlbW92ZUZyb21ET00oKSB7XHJcbiAgICAgIHRoaXMuY2hpbGROb2Rlcy5mb3JFYWNoKChub2RlKSA9PiBub2RlLnBhcmVudEVsZW1lbnQhLnJlbW92ZUNoaWxkKG5vZGUpKTtcclxuICAgIH1cclxuXHJcbiAgICBkaWZmQW5kUGF0Y2gobmV3Tm9kZTogVk5vZGVJbnRlcmZhY2UpIHtcclxuICAgICAgaWYgKChuZXdOb2RlLmNvbnRlbnQgPSB0aGlzLmNvbnRlbnQpKSB7XHJcbiAgICAgICAgbmV3Tm9kZS5ub2RlID0gdGhpcy5ub2RlO1xyXG4gICAgICAgIG5ld05vZGUuY2hpbGROb2RlcyA9IHRoaXMuY2hpbGROb2RlcztcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuICAgICAgdGhpcy5yZW1vdmVGcm9tRE9NKCk7XHJcbiAgICAgIGluc2VydE5ld0l0ZW0obmV3Tm9kZSk7XHJcbiAgICB9XHJcblxyXG4gICAgdG9TdHJpbmcoKSB7XHJcbiAgICAgIHJldHVybiBjb250ZW50O1xyXG4gICAgfVxyXG5cclxuICAgIGFzTm9kZSgpIHtcclxuICAgICAgY29uc3QgdGVtcGxhdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGVtcGxhdGVcIik7XHJcbiAgICAgIHRlbXBsYXRlLmlubmVySFRNTCA9IHRoaXMuY29udGVudDtcclxuICAgICAgY29uc3QgZG9jdW1lbnRGcmFnbWVudCA9IHRlbXBsYXRlLmNvbnRlbnQ7XHJcbiAgICAgIHRoaXMuY2hpbGROb2RlcyA9IEFycmF5LmZyb20oZG9jdW1lbnRGcmFnbWVudC5jaGlsZE5vZGVzKTtcclxuXHJcbiAgICAgIC8vIGJhc2ljYWxseSB0aGUgYC5ub2RlYCBwcm9wZXJ0eSBpcyB1c2VkIHRvIGRldGVybWluZSB0aGUgbGFzdCBodG1sIG5vZGUgb2YgdGhlIFZOb2RlLFxyXG4gICAgICAvLyB0byBwb3NpdGlvbiB0aGUgbmV4dCBWTm9kZSdzIERPTSBOb2RlIGFmdGVyIGl0LlxyXG4gICAgICAvLyB0aGVyZWZvcmUgLm5vZGUgcmV0dXJucyB0aGUgbGFzdCBub2RlIG9mIHRoZSByYXcgaHRtbFxyXG4gICAgICBpZiAodGhpcy5jaGlsZE5vZGVzLmxlbmd0aClcclxuICAgICAgICB0aGlzLm5vZGUgPSB0aGlzLmNoaWxkTm9kZXNbdGhpcy5jaGlsZE5vZGVzLmxlbmd0aCAtIDFdO1xyXG4gICAgICByZXR1cm4gZG9jdW1lbnRGcmFnbWVudDtcclxuICAgIH1cclxuICAgIGFzVk5vZGUoKSB7XHJcbiAgICAgIHJldHVybiB7fTtcclxuICAgIH1cclxuXHJcbiAgICBbX2NhbGxSZWZzXSgpIHtcclxuICAgICAgLy8gbm9vcFxyXG4gICAgfVxyXG4gIH0pKGNvbnRlbnQpO1xyXG59XHJcblxyXG4vLyBnb3RjaHNhczpcclxuLy8gLSBzdHlsZXMgd2lsbCBvdmVycmlkZSAoY291bGQgZG86IHNldHRpbmcgZWFjaCBydWxlIGluZGl2aWR1YWxseSlcclxuLy8gQFRPRE86IGV2ZW50IHByb3BzIiwiaW1wb3J0IHsgcmVuZGVyLCByYXdIdG1sIH0gZnJvbSBcIi4vanN4L2pzeC1ydW50aW1lXCI7XHJcblxyXG5jb25zdCB4c3MgPSBcIjxpbWcgc3JjPXggb25lcnJvcj1cXFwiYWxlcnQoJ1hTUyBBdHRhY2snKVxcXCI+XCI7IC8vXCI8c2NyaXB0PmFsZXJ0KCctLi0nKTwvc2NyaXB0PlwiO1xyXG5cclxuZnVuY3Rpb24gUlRFKHByb3BzOiAvKnsgdHh0LCBcIm9uLWNsaWNrXCI6IG9uQ2xpY2sgfSovIHtcclxuICB0eHQ6IHN0cmluZztcclxuICByZWY/OiBGdW5jdGlvbjtcclxufSkge1xyXG4gIGNvbnNvbGUubG9nKFwib25DbGlja1wiLCBwcm9wc1tcIm9uLWNsaWNrXCJdKTtcclxuICByZXR1cm4gKFxyXG4gICAgPHAgcmVmPXsoZWw6IEhUTUxFbGVtZW50KSA9PiBjb25zb2xlLmxvZyhcIm15IGRpdiA6OnJlZjo6My4yXCIsIGVsKX0+XHJcbiAgICAgIHtwcm9wcy50eHR9XHJcbiAgICA8L3A+XHJcbiAgKTtcclxufVxyXG5cclxuZnVuY3Rpb24gQnV0dG9uKHtcclxuICBjaGlsZHJlbixcclxuICBkaXNhYmxlZCxcclxufToge1xyXG4gIGNoaWxkcmVuOiBhbnk7XHJcbiAgZGlzYWJsZWQ6IGJvb2xlYW47XHJcbiAgcmVmPzogRnVuY3Rpb247XHJcbn0pIHtcclxuICByZXR1cm4gKFxyXG4gICAgPGJ1dHRvblxyXG4gICAgICBkaXNhYmxlZD17ZGlzYWJsZWR9XHJcbiAgICAgIHJlZj17KGVsOiBIVE1MRWxlbWVudCkgPT4gY29uc29sZS5sb2coXCJteSBidXR0b24gOjpyZWY6OjFcIiwgZWwpfVxyXG4gICAgPlxyXG4gICAgICA8c3BhbiByZWY9eyhlbDogSFRNTEVsZW1lbnQpID0+IGNvbnNvbGUubG9nKFwibXkgYSA6OnJlZjo6MlwiLCBlbCl9PlxyXG4gICAgICAgIEJ0bi1zcGFuLWZpcnN0XHJcbiAgICAgIDwvc3Bhbj5cclxuICAgICAge2NoaWxkcmVufVxyXG4gICAgICA8PlxyXG4gICAgICAgIDxzcGFuIHJlZj17KGVsOiBIVE1MRWxlbWVudCkgPT4gY29uc29sZS5sb2coXCJteSBhIDo6cmVmOjozXCIsIGVsKX0+XHJcbiAgICAgICAgICBCdG4tc3Bhbi1lbmRcclxuICAgICAgICA8L3NwYW4+XHJcbiAgICAgIDwvPlxyXG4gICAgPC9idXR0b24+XHJcbiAgKTtcclxufVxyXG5cclxuZnVuY3Rpb24gcmVmbG9nKGVsOiBIVE1MRWxlbWVudCkge1xyXG4gIGNvbnNvbGUubG9nKFwibXkgaW5uZXIgZGl2OjpyZWY6OjhcIiwgZWwpO1xyXG59XHJcblxyXG4vKlxyXG5jb25zdCBtYXJrdXAgPSAoXHJcbiAgPD5cclxuICAgIDxkaXZcclxuICAgICAgY2xhc3M9XCJmb29cIlxyXG4gICAgICByZWY9eyhlbDogSFRNTEVsZW1lbnQpID0+IGNvbnNvbGUubG9nKFwibXkgZGl2IDo6cmVmOjo0XCIsIGVsKX1cclxuICAgIC8+XHJcbiAgICA8aW5wdXQgZGlzYWJsZWQ9e3RydWV9IGhpZGRlbj17ZmFsc2V9IC8+XHJcbiAgICA8QnV0dG9uXHJcbiAgICAgIGRpc2FibGVkPXt0cnVlfVxyXG4gICAgICByZWY9eyhlbDogSFRNTEVsZW1lbnQpID0+IGNvbnNvbGUubG9nKFwibXkgQlVUVE9OOjpyZWY6OjVcIiwgZWwpfVxyXG4gICAgPlxyXG4gICAgICB0ZXh0XHJcbiAgICAgIDxwb3B1cC1pbmZvXHJcbiAgICAgICAgcmVmPXsoZWw6IEhUTUxFbGVtZW50KSA9PiBjb25zb2xlLmxvZyhcInNwYW4gaW4gQlVUVE9OOjpyZWY6OjZcIiwgZWwpfVxyXG4gICAgICA+XHJcbiAgICAgICAgYmxhXHJcbiAgICAgIDwvcG9wdXAtaW5mbz5cclxuICAgIDwvQnV0dG9uPlxyXG4gICAgPFJURVxyXG4gICAgICB0eHQ9XCJsZSB0ZXh0XCJcclxuICAgICAgcmVmPXsoZWw6IEhUTUxFbGVtZW50KSA9PiBjb25zb2xlLmxvZyhcIm15IGRpdiA6OnJlZjo6My4xXCIsIGVsKX1cclxuICAgICAgb24tY2xpY2s9eyhlOiBIVE1MRWxlbWVudCkgPT4gY29uc29sZS5sb2coZSl9XHJcbiAgICAvPlxyXG4gICAge3hzc31cclxuICAgIHtyYXdIdG1sKGA8b2w+PGxpPnJhdyBodG1sPC9saT48L29sPmApfVxyXG4gICAgPGRpdlxyXG4gICAgICBjbGFzcz1cImJhbVwiXHJcbiAgICAgIHJlZj17KGVsOiBIVE1MRWxlbWVudCkgPT4gY29uc29sZS5sb2coXCJteSBkaXY6OnJlZjo6N1wiLCBlbCl9XHJcbiAgICA+XHJcbiAgICAgIDxkaXY+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cImJhclwiIG9uLWNsaWNrPXsoZSkgPT4gY29uc29sZS5sb2coZSl9IHJlZj17cmVmbG9nfT5cclxuICAgICAgICAgIGNsaWNrIE1FXHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPGRpdiBzdHlsZT17eyBvdXRsaW5lOiBcIjFweCBzb2xpZCByZWQ7XCIgfX0+XHJcbiAgICAgICAgICB7ZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNvbGRcIil9XHJcbiAgICAgICAgICB7bnVsbH1cclxuICAgICAgICAgIHtbMCwgMV0ubWFwKChuKSA9PiAoXHJcbiAgICAgICAgICAgIDxzcGFuPntufTwvc3Bhbj5cclxuICAgICAgICAgICkpfVxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICA8L2Rpdj5cclxuICAgIDwvZGl2PlxyXG4gIDwvPlxyXG4pO1xyXG5cclxuKi9cclxuXHJcbi8qXHJcbmNvbnN0IG1hcmt1cCA9IChcclxuICA8QnV0dG9uIGRpc2FibGVkPXt0cnVlfT5cclxuICAgICAgPGJvbGQgcmVmPXtyZWZsb2d9Pi0tSU5ORVItLTwvYm9sZD5cclxuICA8L0J1dHRvbj5cclxuKTsqL1xyXG4vKlxyXG5cclxuY29uc3QgbWFya3VwID0gKFxyXG4gIDxkaXYgY2xhc3M9XCJmb29cIiByZWY9eyhlbDogSFRNTEVsZW1lbnQpID0+IGNvbnNvbGUubG9nKFwibXkgZGl2OjpyZWY6OlwiLCBlbCl9PlxyXG4gICAgPGRpdj5cclxuICAgICAgPGRpdiBjbGFzcz1cImJhclwiIHJlZj17KGVsOiBIVE1MRWxlbWVudCkgPT4gY29uc29sZS5sb2coXCJteSBpbm5lciBkaXY6OnJlZjo6XCIsIGVsKX0gLz5cclxuICAgIDwvZGl2PlxyXG4gICAgPEJ1dHRvbiBkaXNhYmxlZD17dHJ1ZX0+PC9CdXR0b24+XHJcbiAgPC9kaXY+XHJcbik7XHJcbiovXHJcbi8qXHJcbmNvbnN0IG1hcmt1cCA9IChcclxuICA8YT5cclxuICAgIDxiPlxyXG4gICAgICA8YyBjbGFzcz1cImJhclwiIHJlZj17cmVmbG9nfSAvPlxyXG4gICAgPC9iPlxyXG4gIDwvYT5cclxuKTtcclxuKi9cclxuXHJcbmZ1bmN0aW9uIFNwYW4oeyBtb2RlIH06IHsgbW9kZTogYW55IH0pIHtcclxuICByZXR1cm4gbW9kZSA9PT0gMSA/IChcclxuICAgIDxkaXY+XHJcbiAgICAgIDxzcGFuIGlkPVwiaW5uZXJcIiBvbGQ9e3RydWV9PlxyXG4gICAgICAgIFNwYW4tQ29tcC0tb2xkXHJcbiAgICAgIDwvc3Bhbj5cclxuICAgICAgPGgzPnRvIGJlIHJlbW92ZWQ8L2gzPlxyXG4gICAgPC9kaXY+XHJcbiAgKSA6IChcclxuICAgIDxkaXY+XHJcbiAgICAgIDxwIGlkPVwiaW5uZXJcIiBuZXc9e3RydWV9PlxyXG4gICAgICAgIFNwYW4tQ29tcC0tbmV3c1xyXG4gICAgICA8L3A+XHJcbiAgICA8L2Rpdj5cclxuICApO1xyXG59XHJcblxyXG5mdW5jdGlvbiBDb21wKHsgbnVtIH0pIHtcclxuICBpZiAobnVtID09PSAxKSByZXR1cm4gbnVsbDtcclxuICByZXR1cm4gKFxyXG4gICAgPGRpdj5cclxuICAgICAgPHA+Y29tcDwvcD5cclxuICAgIDwvZGl2PlxyXG4gICk7XHJcbn1cclxuXHJcbmNvbnN0IG1hcmt1cDEgPSAobnVtOiBhbnkpID0+IChcclxuICA8ZGl2IGlkPVwib3V0ZXJcIiBkYXRhLWZvbz1cImJhclwiIGRhdGEtdmFyPXtudW19PlxyXG4gICAgPGgzPnNob3VsZCBnZXQgMiAtOiAzPC9oMz5cclxuICAgIHtudW0gPT09IDEgPyAoXHJcbiAgICAgIDx1bCBjbGFzcz1cInVsLWNsYXNzXCI+XHJcbiAgICAgICAgPGxpPlRleHQgMSA8L2xpPlxyXG4gICAgICAgIDxsaT5UZXh0IDIgPC9saT5cclxuICAgICAgPC91bD5cclxuICAgICkgOiAoXHJcbiAgICAgIDx1bCBjbGFzcz1cInVsLWNsYXNzXCI+XHJcbiAgICAgICAgPGxpPlRleHQgMyA8L2xpPlxyXG4gICAgICAgIDxsaT5UZXh0IDIgPC9saT5cclxuICAgICAgICA8bGk+VGV4dCAxIDwvbGk+XHJcbiAgICAgIDwvdWw+XHJcbiAgICApfVxyXG4gICAgPGgzPnNob3VsZCBnZXQgMyAtOiAyPC9oMz5cclxuICAgIHtudW0gPT09IDEgPyAoXHJcbiAgICAgIDx1bCBjbGFzcz1cInVsLWNsYXNzXCI+XHJcbiAgICAgICAgPGxpPlRleHQgMSA8L2xpPlxyXG4gICAgICAgIDxsaT5UZXh0IDIgPC9saT5cclxuICAgICAgICA8bGk+VGV4dCAzIDwvbGk+XHJcbiAgICAgIDwvdWw+XHJcbiAgICApIDogKFxyXG4gICAgICA8dWwgY2xhc3M9XCJ1bC1jbGFzc1wiPlxyXG4gICAgICAgIDxsaT5UZXh0IDEgPC9saT5cclxuICAgICAgICA8bGk+VGV4dCAyIDwvbGk+XHJcbiAgICAgIDwvdWw+XHJcbiAgICApfVxyXG4gICAge251bSA9PT0gMSA/IG51bGwgOiA8cD5uZXcgcmVuZGVyPC9wPn1cclxuICAgIDxkaXY+XHJcbiAgICAgIDxzcGFuPnNwYW4tY29udGVudDwvc3Bhbj5cclxuICAgIDwvZGl2PlxyXG4gICAgPFNwYW4gbW9kZT17bnVtfSAvPlxyXG4gICAgey8qZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNvbGRcIikqL31cclxuICAgIDw+RnJhZ21lbnQtaXRlbTwvPlxyXG4gICAgPHN2Z1xyXG4gICAgICB2aWV3Qm94PVwiMCAwIDMwMCAxMDBcIlxyXG4gICAgICB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCJcclxuICAgICAgc3Ryb2tlPVwicmVkXCJcclxuICAgICAgZmlsbD1cImdyZXlcIlxyXG4gICAgPlxyXG4gICAgICA8Y2lyY2xlIGN4PVwiNTBcIiBjeT1cIjUwXCIgcj1cIjQwXCIgLz5cclxuICAgICAgPGNpcmNsZSBjeD1cIjE1MFwiIGN5PVwiNTBcIiByPVwiNFwiIC8+XHJcblxyXG4gICAgICA8c3ZnIHZpZXdCb3g9XCIwIDAgMTAgMTBcIiB4PVwiMjAwXCIgd2lkdGg9XCIxMDBcIj5cclxuICAgICAgICA8Y2lyY2xlIGN4PVwiNVwiIGN5PVwiNVwiIHI9XCI0XCIgLz5cclxuICAgICAgPC9zdmc+XHJcbiAgICA8L3N2Zz5cclxuICA8L2Rpdj5cclxuKTtcclxuXHJcbmZ1bmN0aW9uIG1hcmt1cDIobnVtOiBhbnkpIHtcclxuICByZXR1cm4gKFxyXG4gICAgPGRpdiBpZD1cIm91dGVyXCI+XHJcbiAgICAgIDw+XHJcbiAgICAgICAgPD5cclxuICAgICAgICAgIDxwPm5lc3RlZCBmcmFnbWVudDwvcD5cclxuICAgICAgICA8Lz5cclxuICAgICAgPC8+XHJcbiAgICAgIDxoMT5zdGF0aWM8L2gxPlxyXG4gICAgICA8aDE+ZHluYW1pYyB2YWw6IHtudW19PC9oMT5cclxuICAgICAge251bSA9PT0gMSA/IDxoMT5vbGQ8L2gxPiA6IGZhbHNlfVxyXG4gICAgICB7bnVtID09PSAxID8gKFxyXG4gICAgICAgIDw+XHJcbiAgICAgICAgICA8aDE+ZnJhZyBvbGQ8L2gxPlxyXG4gICAgICAgICAgPHNwYW4+ZnJhZyBzcGFuIG9sZDwvc3Bhbj5cclxuICAgICAgICA8Lz5cclxuICAgICAgKSA6IChcclxuICAgICAgICA8aDE+ZnJhZyBuZXc8L2gxPlxyXG4gICAgICApfVxyXG4gICAgICA8Q29tcCBudW09e251bX0gLz5cclxuICAgIDwvZGl2PlxyXG4gICk7XHJcbn1cclxuZnVuY3Rpb24gTkwoKSB7XHJcbiAgcmV0dXJuIG51bGw7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIG1hcmt1cDMobnVtOiBhbnkpIHtcclxuICByZXR1cm4gbnVtID09PSAxID8gKFxyXG4gICAgPGgxPlxyXG4gICAgICBBLUxpbmUgMSAtIHtudW19XHJcbiAgICAgIDxTcGFuIG1vZGU9e251bX0gLz5cclxuICAgICAgPEJ1dHRvblxyXG4gICAgICAgIGRpc2FibGVkPXt0cnVlfVxyXG4gICAgICAgIHJlZj17KGVsOiBIVE1MRWxlbWVudCkgPT4gY29uc29sZS5sb2coXCJteSBCVVRUT046OnJlZjo6NVwiLCBlbCl9XHJcbiAgICAgID5cclxuICAgICAgICB0ZXh0XHJcbiAgICAgICAgPHBvcHVwLWluZm9cclxuICAgICAgICAgIHJlZj17KGVsOiBIVE1MRWxlbWVudCkgPT4gY29uc29sZS5sb2coXCJzcGFuIGluIEJVVFRPTjo6cmVmOjo2XCIsIGVsKX1cclxuICAgICAgICA+XHJcbiAgICAgICAgICBibGFcclxuICAgICAgICA8L3BvcHVwLWluZm8+XHJcbiAgICAgICAgPHA+aW5uZXIgcCB7bnVtfTwvcD5cclxuICAgICAgPC9CdXR0b24+XHJcbiAgICAgIEEtTGluZSAzXHJcbiAgICAgIDw+XHJcbiAgICAgICAgPHA+XHJcbiAgICAgICAgICA8cD5BIEZyYWcgbGluZSAxKjwvcD5cclxuICAgICAgICA8L3A+XHJcbiAgICAgICAgPHA+QSBGcmFnIGxpbmUgMjwvcD5cclxuICAgICAgICA8cD5BIEZyYWcgbGluZSAzPC9wPlxyXG4gICAgICAgIDxwPkEgRnJhZyBsaW5lIDQ8L3A+XHJcbiAgICAgICAgPHN2Z1xyXG4gICAgICAgICAgdmlld0JveD1cIjAgMCAzMDAgMTAwXCJcclxuICAgICAgICAgIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIlxyXG4gICAgICAgICAgc3Ryb2tlPVwicmVkXCJcclxuICAgICAgICAgIGZpbGw9XCJncmV5XCJcclxuICAgICAgICA+XHJcbiAgICAgICAgICA8Y2lyY2xlIGN4PVwiNTBcIiBjeT1cIjUwXCIgcj1cIjQwXCIgLz5cclxuICAgICAgICAgIDxjaXJjbGUgY3g9XCIxNTBcIiBjeT1cIjUwXCIgcj1cIjRcIiAvPlxyXG5cclxuICAgICAgICAgIDxzdmcgdmlld0JveD1cIjAgMCAxMCAxMFwiIHg9XCIyMDBcIiB3aWR0aD1cIjEwMFwiPlxyXG4gICAgICAgICAgICA8Y2lyY2xlIGN4PVwiNVwiIGN5PVwiNVwiIHI9XCI0XCIgLz5cclxuICAgICAgICAgIDwvc3ZnPlxyXG4gICAgICAgIDwvc3ZnPlxyXG4gICAgICA8Lz5cclxuICAgICAge251bGx9XHJcbiAgICA8L2gxPlxyXG4gICkgOiAoXHJcbiAgICA8aDEgY2xhc3M9XCJhXCIgIHJlZj17Y29uc29sZS5pbmZvfT5cclxuICAgICAgQiBMaW5lIDEgLSB7bnVtfVxyXG4gICAgICA8U3BhbiBtb2RlPXtudW19IC8+XHJcbiAgICAgIDxCdXR0b25cclxuICAgICAgICBkaXNhYmxlZD17dHJ1ZX1cclxuICAgICAgICByZWY9eyhlbDogSFRNTEVsZW1lbnQpID0+IGNvbnNvbGUubG9nKFwibXkgQlVUVE9OOjpyZWY6OjVcIiwgZWwpfVxyXG4gICAgICA+XHJcbiAgICAgICAgdGV4dFxyXG4gICAgICAgIDxwb3B1cC1pbmZvXHJcbiAgICAgICAgICByZWY9eyhlbDogSFRNTEVsZW1lbnQpID0+IGNvbnNvbGUubG9nKFwic3BhbiBpbiBCVVRUT046OnJlZjo6NlwiLCBlbCl9XHJcbiAgICAgICAgPlxyXG4gICAgICAgICAgYmxhXHJcbiAgICAgICAgPC9wb3B1cC1pbmZvPlxyXG4gICAgICAgIDxwPntudW19PC9wPlxyXG4gICAgICA8L0J1dHRvbj5cclxuICAgICAgPD5cclxuICAgICAgICB7ZmFsc2V9XHJcbiAgICAgICAge251bGx9XHJcbiAgICAgICAge3VuZGVmaW5lZH1cclxuICAgICAgPC8+XHJcbiAgICAgIDw+XHJcbiAgICAgICAgPHA+QiBGcmFnIGxpbmUgMTwvcD5cclxuICAgICAgICA8cD5CIEZyYWcgbGluZSAyPC9wPlxyXG4gICAgICAgIHt1bmRlZmluZWR9XHJcbiAgICAgICAgPHA+QiBGcmFnIGxpbmUgMyg0KTwvcD5cclxuICAgICAgICA8c3ZnXHJcbiAgICAgICAgICB2aWV3Qm94PVwiMCAwIDMwMCAxMDBcIlxyXG4gICAgICAgICAgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiXHJcbiAgICAgICAgICBzdHJva2U9XCJyZWRcIlxyXG4gICAgICAgICAgZmlsbD1cImdyZXlcIlxyXG4gICAgICAgID5cclxuICAgICAgICAgIDxjaXJjbGUgY3g9XCI1MFwiIGN5PVwiNTBcIiByPVwiNDBcIiAvPlxyXG4gICAgICAgICAgPGNpcmNsZSBjeD1cIjE1MFwiIGN5PVwiNTBcIiByPVwiNFwiIC8+XHJcblxyXG4gICAgICAgICAgPHN2ZyB2aWV3Qm94PVwiMCAwIDEwIDEwXCIgeD1cIjIwMFwiIHdpZHRoPVwiMTAwXCI+XHJcbiAgICAgICAgICAgIDxjaXJjbGUgY3g9XCI1XCIgY3k9XCI1XCIgcj1cIjZcIiAvPlxyXG4gICAgICAgICAgPC9zdmc+XHJcbiAgICAgICAgPC9zdmc+XHJcbiAgICAgICAgPHA+QiBGcmFnIGxpbmUgNCg2KTwvcD5cclxuICAgICAgPC8+XHJcbiAgICA8L2gxPlxyXG4gICk7XHJcbn1cclxuY29uc3Qgb2JqID0geyBhOiAxIH07XHJcblxyXG5mdW5jdGlvbiBtYXJrdXA0KG51bTogYW55KSB7XHJcbiAgb2JqLmEgPSBudW07XHJcbiAgcmV0dXJuIG51bSA9PT0gMSA/IChcclxuICAgIDxoMSBvYmo9e29ian0gaWQ9e29iai5hfT5cclxuICAgICAgb2xkLUhlYWRsaW5lIHtudW19XHJcbiAgICA8L2gxPlxyXG4gICkgOiAoXHJcbiAgICA8aDEgb2JqPXtvYmp9IGNsYXNzPVwiYVwiIGlkPXtvYmouYX0+XHJcbiAgICAgIG5ldy1IZWFkbGluZSB7bnVtfVxyXG4gICAgPC9oMT5cclxuICApO1xyXG59XHJcblxyXG5mdW5jdGlvbiBtYXJrdXAobnVtOiBhbnkpIHtcclxuICByZXR1cm4gbnVtID09PSAxID8gKFxyXG4gICAgPGRpdj5cclxuICAgICAgPD5cclxuICAgICAgICA8cD5mcmFnIC0gSTwvcD5cclxuICAgICAgICA8Yj4gZnJhZyAtIElJPC9iPlxyXG4gICAgICA8Lz5cclxuICAgIDwvZGl2PlxyXG4gICkgOiAoXHJcbiAgICA8aDEgY2xhc3M9XCJhXCI+XHJcbiAgICAgIHtcIm5ldy1IZWFkbGluZVwifSB7bnVtfVxyXG4gICAgPC9oMT5cclxuICApO1xyXG59XHJcblxyXG5mdW5jdGlvbiBtYXJrdXA1KG51bTogYW55KSB7XHJcbiAgcmV0dXJuIG51bSA9PT0gMSA/IChcclxuICAgIDxkaXY+XHJcbiAgICAgIHtyYXdIdG1sKGA8ZGl2IGNsYXNzPVwia1wiPnR4dDwvZGl2PjxpbnB1dCB0eXBlPXJhZGlvXCIgLz5gKX1cclxuICAgICAgPENvbXAzIC8+XHJcbiAgICAgIHtlbH1cclxuICAgIDwvZGl2PlxyXG4gICkgOiAoXHJcbiAgICA8ZGl2PlxyXG4gICAgICB7cmF3SHRtbChgPGRpdiBjbGFzcz1cImtcIj50eHQ8L2Rpdj48aW5wdXQgdHlwZT1yYWRpb1wiIC8+YCl9XHJcbiAgICAgIHtudWxsfVxyXG4gICAgICB7ZWx9XHJcbiAgICA8L2Rpdj5cclxuICApO1xyXG59XHJcblxyXG5mdW5jdGlvbiBtYXJrdXA2KCkge1xyXG5cclxuICByZXR1cm4gIChcclxuICAgIDxkaXY+XHJcbiAgICAgIDxkaXYgaWQ9XCJmb282XCI+XHJcbiAgICAgICAgPHNwYW4+b3JpZ2luYWw8L3NwYW4+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgICA8YnV0dG9uPnN1Ym1pdDwvYnV0dG9uPlxyXG4gICAgPC9kaXY+XHJcbiAgKSAgO1xyXG59XHJcblxyXG4vL2NvbnNvbGUubG9nKG1hcmt1cCk7XHJcbi8vd2luZG93Lm1hcmt1cCA9IG1hcmt1cDtcclxuXHJcbmNsYXNzIFBvcFVwSW5mbyBleHRlbmRzIEhUTUxFbGVtZW50IHtcclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIC8vIEFsd2F5cyBjYWxsIHN1cGVyIGZpcnN0IGluIGNvbnN0cnVjdG9yXHJcbiAgICBzdXBlcigpO1xyXG5cclxuICAgIC8vIHdyaXRlIGVsZW1lbnQgZnVuY3Rpb25hbGl0eSBpbiBoZXJlXHJcblxyXG4gICAgY29uc29sZS5sb2coXCIjIyMjIyMjIyMjIyMjIyMjI2N0b3IgQ0VcIik7XHJcbiAgfVxyXG5cclxuICBjb25uZWN0ZWRDYWxsYmFjaygpIHtcclxuICAgIGNvbnNvbGUubG9nKFwiIyMjIyMjIyMjIyMjIyMjIyNDdXN0b20gc3F1YXJlIGVsZW1lbnQgYWRkZWQgdG8gcGFnZS5cIik7XHJcbiAgfVxyXG59XHJcblxyXG5jdXN0b21FbGVtZW50cy5kZWZpbmUoXCJwb3B1cC1pbmZvXCIsIFBvcFVwSW5mbyk7XHJcblxyXG4vL2RvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjb2xkXCIpIS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgY29uc29sZS5sb2cpO1xyXG5cclxuLy9kb2N1bWVudC5ib2R5LmlubmVySFRNTCA9IG1hcmt1cDtcclxuLy8vL3JlbmRlcihtYXJrdXAzKDEpLCBkb2N1bWVudC5ib2R5KTtcclxuLy9kb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm91dGVyXCIpPy5zZXRBdHRyaWJ1dGUoXCJkYXRhLWZvb1wiLCBcIm1vZFwiKTtcclxuXHJcbi8vZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJpbm5lclwiKT8uc2V0QXR0cmlidXRlKFwiZGF0YS1mb29cIiwgXCJtb2RcIik7XHJcbi8vcmVuZGVyKG1hcmt1cCgyKSwgZG9jdW1lbnQuYm9keSk7XHJcbi8vcmVuZGVyKG1hcmt1cCwgZG9jdW1lbnQuYm9keSwgdHJ1ZSk7XHJcbmNvbnN0IGVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNvbGRcIik7XHJcbmZ1bmN0aW9uIENvbXAyKCkge1xyXG4gIHJldHVybiAoXHJcbiAgICA8PlxyXG4gICAgICB7cmF3SHRtbChgPGRpdiBjbGFzcz1cImtcIj50eHQ8L2Rpdj48aW5wdXQgdHlwZT1yYWRpb1wiIC8+YCl9XHJcbiAgICAgIDxDb21wMyAvPlxyXG4gICAgICB7ZWx9XHJcbiAgICA8Lz5cclxuICApO1xyXG59XHJcbmZ1bmN0aW9uIENvbXAzKCkge1xyXG4gIHJldHVybiA8ZGl2PmNvbXAgY29udGVudDwvZGl2PjtcclxufVxyXG5cclxud2luZG93LnJlUmVuZGVyMSA9ICgpID0+XHJcbiAgcmVuZGVyKG1hcmt1cDMoMSksIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY29udGFpbmVyXCIpKTtcclxud2luZG93LnJlUmVuZGVyMiA9ICgpID0+XHJcbiAgcmVuZGVyKG1hcmt1cDMoMiksIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY29udGFpbmVyXCIpKTtcclxud2luZG93LnJlUmVuZGVyMyA9ICgpID0+XHJcbiAgcmVuZGVyKFxyXG4gICAgLy8gPGRpdj50eHQ8L2Rpdj5cclxuICAgIDxDb21wMiAvPixcclxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY29udGFpbmVyXCIpXHJcbiAgKTtcclxuXHJcbmNvbnNvbGUubG9nKFwiMTIzNDVcIik7XHJcbndpbmRvdy5zcyA9ICgpID0+IG1hcmt1cDMoMSkgKyBcIlwiO1xyXG53aW5kb3cuc3MyID0gKCkgPT4ge1xyXG4gIGNvbnNvbGUubG9nKG1hcmt1cDMoMSkpO1xyXG5cclxuICAvL2RvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY29udGFpbmVyXCIpLmlubmVySFRNTCA9IG1hcmt1cDMoMSk7XHJcbn07XHJcblxyXG53aW5kb3cucmVSZW5kZXI1YSA9ICgpID0+XHJcbiAgcmVuZGVyKG1hcmt1cDUoMSksIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY29udGFpbmVyXCIpKTtcclxud2luZG93LnJlUmVuZGVyNWIgPSAoKSA9PlxyXG4gIHJlbmRlcihtYXJrdXA1KDIpLCBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNvbnRhaW5lclwiKSk7XHJcblxyXG5cclxuXHJcbiAgcmVuZGVyKCg8aDIgY2xhc3M9XCJhXCIgIHJlZj17Y29uc29sZS53YXJufT5IZWFkaW5nIHdpdGggcmVmPC9oMj4pLCBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNvbnRhaW5lclwiKSk7XHJcbiAgd2luZG93LnJlUmVuZGVyUmVmID0gKCkgPT4gcmVuZGVyKCg8aDIgY2xhc3M9XCJhXCIgIHJlZj17Y29uc29sZS53YXJufT5IZWFkaW5nIHdpdGggcmVmPC9oMj4pLCBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNvbnRhaW5lclwiKSk7XHJcbiAgd2luZG93LnJlUmVuZGVyNmEgPSAoKSA9PiByZW5kZXIobWFya3VwNigpLCBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNvbnRhaW5lclwiKSk7XHJcbiAgd2luZG93LnJlUmVuZGVyNmIgPSAoKSA9PiByZW5kZXIoKDxwPm1vZGlmaWVkPC9wPiksIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZm9vNlwiKSk7XHJcblxyXG5cclxuIl0sInNvdXJjZVJvb3QiOiIifQ==