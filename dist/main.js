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

}

class VNode {} // null when checking the parent when root is fragment itself


function getParentElementNode(vNode) {
  console.log("getParentElementNode", vNode);

  while (vNode.parent) {
    vNode = vNode.parent; // `.node` is only on "Text" and "Element" type VNode, and only Element has children

    if (vNode.node) break;
  }

  console.log("found: ", vNode);
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
  console.log("asNode()", {
    tag,
    props,
    children
  }); // fragment

  if (!tag) {
    const fragments = children.flat() // ?
    .map(item => item.asNode());
    const documentFragment = document.createDocumentFragment();
    documentFragment.append(...fragments);
    return [documentFragment, []];
  } // shouldn't


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

  const { ...attrs
  } = props; // remember if the svg context was set for this node, and replace after generating all children

  let svgContextSet = false; // set the context of markup which is rendered as SVG (or its children)
  // no need for re-setting the context for nested SVGs

  if (!svgContext && tag === "svg") {
    svgContext = true;
    svgContextSet = true;
  } // currently not supporting the `is` option for Customized built-in elements


  const node = svgContext ? document.createElementNS("http://www.w3.org/2000/svg", tag) : document.createElement(tag);
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
  console.log({
    children
  });
  node.append(...children.flat() //.filter(truthy)
  .filter(child => child.tag !== "__NULL__").map(child => child.asNode())); // svg element and all its children were rendered, reset the svg context

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

function asVNode(tag, props) {
  console.log("asVNode:", {
    tag,
    props
  });

  if (typeof tag === "function") {
    let result = tag(props);

    if (result instanceof VNode) {
      //console.warn("asVNode with JsxNode");
      return result;
    }

    if (result instanceof Node) {
      return new LiveNodeVNode(result);
    } // null jsx node


    if (!truthy(result)) {
      return new NullVNode();
    }

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
  props.children = props.children.flat(); // @TODO: doc
  // if ref prop is provided, memorize and remove from the html generation process

  const ref = typeof props.ref === "function" ? props.ref : null;
  if (ref) delete props.ref; // @TODO:

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
  refsToCall.splice(0);
  const isReRender = renderedVTrees.has(domNode);
  if (!append && !isReRender) domNode.innerHTML = "";

  if (typeof markup === "string") {
    domNode.insertAdjacentHTML("beforeend", markup); // sanitize?
  } else if (markup instanceof Node) {
    domNode.insertAdjacentElement("beforeend", markup);
  } else if (markup instanceof VNode) {
    svgContext = false;
    const vTree = new RootVNode(markup, domNode);
    console.log("###########\n", "vTree:", vTree);

    if (isReRender) {
      console.log("is re-render");
      const oldVTree = renderedVTrees.get(domNode);
      console.log("###########\n", {
        oldVTree,
        newVTree: vTree
      }); // diff

      oldVTree.diffAndPatch(vTree);
      renderedVTrees.set(domNode, vTree);
    } else {
      const content = vTree.asNode();
      domNode.append(content);
    }

    renderedVTrees.set(domNode, vTree);
    refsToCall.forEach(cb => cb()); ////markup[_callRefs]();
  } else {
    throw new Error("render method called with wrong argument(s)");
  }
}
function rawHtml(content) {
  return new class extends JsxNode {
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

    [_callRefs]() {// noop
    }

  }({});
} // vTree
// gotchsas:
// - styles will override (could do: setting each rule individually)

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
        return childVNode;
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
    this.node = node;
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
      }
  }

}

class FragmentVNode extends VNode {
  constructor(children) {
    super();
    this.type = "Fragment";
    this.children = children.map(child => {
      if (Array.isArray(child)) return new FragmentVNode(child);

      if (child instanceof VNode) {
        const childVNode = child; //child.asVNode();

        childVNode.parent = this;
        return childVNode;
      }

      if (child instanceof Node) {
        const n = new LiveNodeVNode(child);
        n.parent = this;
        return n;
      }

      console.log("@@ map 2", {
        child
      });

      if (!truthy(child)) {
        const childVNode = new NullVNode();
        childVNode.parent = this;
        return childVNode;
      }

      console.log(":::", {
        child
      });
      const textVNode = new TextVNode(child);
      textVNode.parent = this;
      return textVNode;
    });
  }

  asNode() {
    const node = asNode(undefined, {}, this.children)[0];
    console.log({
      node
    });
    return node;
  }

  toString() {
    return this.children.map(child => child.toString()).join("");
  } // to level


  diffAndPatch(newVNode) {
    console.log("diffAndPatch");
    return diffAndPatchChildren(this, newVNode);
  }

  removeFromDOM() {
    getChildrenWithNodes(this).forEach(node => node.node.parentElement.removeChild(node.node));
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

} // @TODO: ref calls
// @TODO: re-render sub trees (.node = add to map)

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
    children: [Object(C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(Comp3, {}), el]
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vanN4L2pzeC1ydW50aW1lLnRzIiwid2VicGFjazovLy8uL21haW4udHN4Il0sIm5hbWVzIjpbInJlbmRlcmVkVlRyZWVzIiwiV2Vha01hcCIsInJlZnNUb0NhbGwiLCJKc3hOb2RlIiwiY29uc3RydWN0b3IiLCJwcm9wcyIsIlZOb2RlIiwiZ2V0UGFyZW50RWxlbWVudE5vZGUiLCJ2Tm9kZSIsImNvbnNvbGUiLCJsb2ciLCJwYXJlbnQiLCJub2RlIiwiZ2V0Q2hpbGRyZW5XaXRoTm9kZXMiLCJhbHdheXNBbGxvdyIsImNoaWxkcmVuIiwibWFwIiwiY2hpbGROb2RlIiwiZmxhdCIsIkluZmluaXR5IiwiZ2V0UGFyZW50QW5kTmV4dFNpYmxpbmciLCJwYXJlbnRXaXRoRWxlbWVudCIsInNpYmxpbmdzIiwicHJldlNpYmxpbmciLCJpbmRleE9mIiwibmV4dFNpYmxpbmdOb2RlIiwibmV4dFNpYmxpbmciLCJfY2FsbFJlZnMiLCJTeW1ib2wiLCJzdmdDb250ZXh0IiwidHJ1dGh5IiwidmFsdWUiLCJ1bmRlZmluZWQiLCJzYW5pdGl6ZSIsInRleHQiLCJkaXYiLCJkb2N1bWVudCIsImNyZWF0ZUVsZW1lbnQiLCJpbm5lclRleHQiLCJpbm5lckhUTUwiLCJnZXRPdXRlckh0bWwiLCJlbGVtZW50IiwiRWxlbWVudCIsIm91dGVySFRNTCIsIlRleHQiLCJ3aG9sZVRleHQiLCJEb2N1bWVudEZyYWdtZW50IiwiQXJyYXkiLCJmcm9tIiwiY2hpbGROb2RlcyIsImVsIiwiam9pbiIsIndhcm4iLCJhc0h0bWxTdHJpbmciLCJ0YWciLCJhdHRyaWJ1dGVzIiwiT2JqZWN0IiwiZW50cmllcyIsImZpbHRlciIsImtleSIsInYiLCJrIiwiaXNBcnJheSIsImNvbnRlbnQiLCJjaGlsZCIsInRvU3RyaW5nIiwiYXNOb2RlIiwiZnJhZ21lbnRzIiwiaXRlbSIsImRvY3VtZW50RnJhZ21lbnQiLCJjcmVhdGVEb2N1bWVudEZyYWdtZW50IiwiYXBwZW5kIiwiZXJyb3IiLCJyZXN1bHQiLCJqc3hOb2RlcyIsImZvckVhY2giLCJzdGFydHNXaXRoIiwiZXZlbnQiLCJyZXBsYWNlIiwiYWRkRXZlbnRMaXN0ZW5lciIsImF0dHJzIiwic3ZnQ29udGV4dFNldCIsImNyZWF0ZUVsZW1lbnROUyIsIl9rZXkiLCJzZXRBdHRyaWJ1dGUiLCJTdHJpbmciLCJjaGlsZEpzeE5vZGVzIiwiaW5zZXJ0TmV3SXRlbSIsIm5ld05vZGUiLCJpbnNlcnRCZWZvcmUiLCJkaWZmQW5kUGF0Y2hDaGlsZHJlbiIsIm9sZE5vZGUiLCJvbGRDaGlsZCIsIml4IiwibmV3Q2hpbGQiLCJyZW1vdmVGcm9tRE9NIiwidHlwZSIsImRpZmZBbmRQYXRjaCIsIm5ld0l0ZW1zIiwic2xpY2UiLCJsZW5ndGgiLCJhc1ZOb2RlIiwiTm9kZSIsIkxpdmVOb2RlVk5vZGUiLCJOdWxsVk5vZGUiLCJUZXh0Vk5vZGUiLCJhdHRyIiwiRWxlbWVudFZOb2RlIiwiRnJhZ21lbnRWTm9kZSIsImpzeHMiLCJyZWYiLCJGcmFnbWVudCIsImpzeCIsImhhc093blByb3BlcnR5IiwicmVuZGVyIiwibWFya3VwIiwiZG9tTm9kZSIsImJvZHkiLCJxdWVyeVNlbGVjdG9yQWxsIiwic3R5bGUiLCJiYWNrZ3JvdW5kIiwic3BsaWNlIiwiaXNSZVJlbmRlciIsImhhcyIsImluc2VydEFkamFjZW50SFRNTCIsImluc2VydEFkamFjZW50RWxlbWVudCIsInZUcmVlIiwiUm9vdFZOb2RlIiwib2xkVlRyZWUiLCJnZXQiLCJuZXdWVHJlZSIsInNldCIsImNiIiwiRXJyb3IiLCJyYXdIdG1sIiwidGVtcGxhdGUiLCJjaGlsZFZOb2RlIiwicGFyZW50RWxlbWVudCIsInJlbW92ZUNoaWxkIiwicmVtb3ZlQXR0cmlidXRlIiwicmVwbGFjZVdpdGgiLCJuIiwidGV4dFZOb2RlIiwibmV3Vk5vZGUiLCJ0ZXh0Tm9kZSIsImNyZWF0ZVRleHROb2RlIiwibm9kZVZhbHVlIiwibmV3Tm9kZTIiLCJyZW1vdmUiLCJ4c3MiLCJSVEUiLCJ0eHQiLCJCdXR0b24iLCJkaXNhYmxlZCIsInJlZmxvZyIsIlNwYW4iLCJtb2RlIiwiQ29tcCIsIm51bSIsIm1hcmt1cDEiLCJtYXJrdXAyIiwiTkwiLCJtYXJrdXAzIiwib2JqIiwiYSIsIm1hcmt1cDQiLCJQb3BVcEluZm8iLCJIVE1MRWxlbWVudCIsImN1c3RvbUVsZW1lbnRzIiwiZGVmaW5lIiwicXVlcnlTZWxlY3RvciIsIkNvbXAyIiwiQ29tcDMiLCJ3aW5kb3ciLCJyZVJlbmRlcjEiLCJnZXRFbGVtZW50QnlJZCIsInJlUmVuZGVyMiIsInJlUmVuZGVyMyIsInNzIiwic3MyIl0sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtRQUNBOzs7UUFHQTtRQUNBOzs7Ozs7Ozs7Ozs7O0FDbEZBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLE1BQU1BLGNBQWMsR0FBRyxJQUFJQyxPQUFKLEVBQXZCO0FBQ0EsTUFBTUMsVUFBc0IsR0FBRyxFQUEvQjtBQUVBOzs7O0FBS0E7QUFDQTs7QUE0QkE7QUFDQTtBQUNBLE1BQU1DLE9BQU4sQ0FBYztBQUVaQyxhQUFXLENBQUNDLEtBQUQsRUFBa0I7QUFBQSxTQUQ3QkEsS0FDNkI7QUFDM0IsU0FBS0EsS0FBTCxHQUFhQSxLQUFiO0FBQ0Q7O0FBSlc7O0FBT2QsTUFBTUMsS0FBTixDQUFZLEUsQ0FFWjs7O0FBQ0EsU0FBU0Msb0JBQVQsQ0FBOEJDLEtBQTlCLEVBQW1FO0FBQ2pFQyxTQUFPLENBQUNDLEdBQVIsQ0FBWSxzQkFBWixFQUFvQ0YsS0FBcEM7O0FBRUEsU0FBT0EsS0FBSyxDQUFDRyxNQUFiLEVBQXFCO0FBQ25CSCxTQUFLLEdBQUdBLEtBQUssQ0FBQ0csTUFBZCxDQURtQixDQUVuQjs7QUFDQSxRQUFJSCxLQUFLLENBQUNJLElBQVYsRUFBZ0I7QUFDakI7O0FBRURILFNBQU8sQ0FBQ0MsR0FBUixDQUFZLFNBQVosRUFBdUJGLEtBQXZCO0FBRUEsU0FBUUEsS0FBUjtBQUNEOztBQUVELFNBQVNLLG9CQUFULENBQ0VMLEtBREYsRUFFRU0sV0FGRixFQUdvQjtBQUNsQk4sT0FBSyxDQUFDTyxRQUFOO0FBQ0EsU0FBT1AsS0FBSyxDQUFDTyxRQUFOLENBQ0pDLEdBREksQ0FDQ0MsU0FBRCxJQUFlO0FBQ2xCLFFBQUlBLFNBQVMsS0FBS0gsV0FBbEIsRUFBK0IsT0FBT0csU0FBUDtBQUMvQixRQUFJQSxTQUFTLENBQUNMLElBQWQsRUFBb0IsT0FBT0ssU0FBUDtBQUNwQixXQUFPSixvQkFBb0IsQ0FBQ0ksU0FBRCxFQUFZSCxXQUFaLENBQTNCO0FBQ0QsR0FMSSxFQU1KSSxJQU5JLENBTUNDLFFBTkQsQ0FBUDtBQU9EOztBQUVELFNBQVNDLHVCQUFULENBQWlDWixLQUFqQyxFQUE2RTtBQUMzRTtBQUNBLFFBQU1hLGlCQUFpQixHQUFHZCxvQkFBb0IsQ0FBQ0MsS0FBRCxDQUE5QztBQUNBLFFBQU1jLFFBQVEsR0FBR1Qsb0JBQW9CLENBQUNRLGlCQUFELEVBQW9CYixLQUFwQixDQUFyQztBQUNBLFFBQU1lLFdBQVcsR0FBR0QsUUFBUSxDQUFDQSxRQUFRLENBQUNFLE9BQVQsQ0FBaUJoQixLQUFqQixJQUEwQixDQUEzQixDQUE1QjtBQUNBLFFBQU1pQixlQUFlLEdBQUdGLFdBQVcsR0FBR0EsV0FBVyxDQUFDWCxJQUFaLENBQWtCYyxXQUFyQixHQUFtQyxJQUF0RTtBQUVBLFNBQU8sQ0FBQ0wsaUJBQWlCLENBQUNULElBQW5CLEVBQXlCYSxlQUF6QixDQUFQO0FBQ0QsQyxDQUVEOzs7QUFDQSxNQUFNRSxTQUFTLEdBQUdDLE1BQU0sQ0FBQyxVQUFELENBQXhCLEMsQ0FFQTs7O0FBQ0EsSUFBSUMsVUFBVSxHQUFHLEtBQWpCLEMsQ0FFQTs7QUFRQTs7Ozs7QUFLQSxTQUFTQyxNQUFULENBQWdCQyxLQUFoQixFQUFxQztBQUNuQyxTQUFPQSxLQUFLLEtBQUssS0FBVixJQUFtQkEsS0FBSyxLQUFLLElBQTdCLElBQXFDQSxLQUFLLEtBQUtDLFNBQXREO0FBQ0Q7QUFFRDs7Ozs7Ozs7QUFNQSxTQUFTQyxRQUFULENBQWtCQyxJQUFsQixFQUF3QztBQUN0QyxRQUFNQyxHQUFHLEdBQUdDLFFBQVEsQ0FBQ0MsYUFBVCxDQUF1QixLQUF2QixDQUFaO0FBQ0FGLEtBQUcsQ0FBQ0csU0FBSixHQUFnQkosSUFBaEI7QUFDQSxTQUFPQyxHQUFHLENBQUNJLFNBQVg7QUFDRDtBQUVEOzs7Ozs7QUFJQSxTQUFTQyxZQUFULENBQXNCQyxPQUF0QixFQUE2QztBQUMzQyxNQUFJQSxPQUFPLFlBQVlDLE9BQXZCLEVBQWdDLE9BQU9ELE9BQU8sQ0FBQ0UsU0FBZjtBQUNoQyxNQUFJRixPQUFPLFlBQVlHLElBQXZCLEVBQTZCLE9BQU9YLFFBQVEsQ0FBQ1EsT0FBTyxDQUFDSSxTQUFULENBQWY7QUFDN0IsTUFBSUosT0FBTyxZQUFZSyxnQkFBdkIsRUFDRSxPQUFPQyxLQUFLLENBQUNDLElBQU4sQ0FBV1AsT0FBTyxDQUFDUSxVQUFuQixFQUNKakMsR0FESSxDQUNDa0MsRUFBRCxJQUFRVixZQUFZLENBQUNVLEVBQUQsQ0FEcEIsRUFFSkMsSUFGSSxDQUVDLEVBRkQsQ0FBUCxDQUp5QyxDQVEzQzs7QUFDQTFDLFNBQU8sQ0FBQzJDLElBQVIsQ0FBYSxvREFBYixFQUFtRVgsT0FBbkU7QUFDQSxTQUFPLEVBQVA7QUFDRDtBQUVEOzs7Ozs7OztBQU1BLFNBQVNZLFlBQVQsQ0FBc0JDLEdBQXRCLEVBQThDakQsS0FBOUMsRUFBK0RVLFFBQS9ELEVBQXlFO0FBQ3ZFLFFBQU13QyxVQUFVLEdBQUdDLE1BQU0sQ0FBQ0MsT0FBUCxDQUFlcEQsS0FBZixFQUNoQnFELE1BRGdCLENBQ1QsQ0FBQyxHQUFHM0IsS0FBSCxDQUFELEtBQWVELE1BQU0sQ0FBQ0MsS0FBRCxDQURaLEVBRWhCZixHQUZnQixDQUVaLENBQUMsQ0FBQzJDLEdBQUQsRUFBTTVCLEtBQU4sQ0FBRCxLQUFrQjtBQUNyQjtBQUNBLFFBQUlBLEtBQUssS0FBSyxJQUFkLEVBQW9CLE9BQU80QixHQUFQLENBRkMsQ0FJckI7QUFDQTs7QUFDQSxRQUFJQSxHQUFHLEtBQUssT0FBUixJQUFtQixPQUFPNUIsS0FBUCxLQUFpQixRQUF4QyxFQUNFQSxLQUFLLEdBQUd5QixNQUFNLENBQUNDLE9BQVAsQ0FBZTFCLEtBQWYsRUFDTjtBQURNLEtBRUwyQixNQUZLLENBRUUsQ0FBQyxHQUFHRSxDQUFILENBQUQsS0FBVzlCLE1BQU0sQ0FBQzhCLENBQUQsQ0FGbkIsRUFHTjtBQUhNLEtBSUw1QyxHQUpLLENBSUQsQ0FBQyxDQUFDNkMsQ0FBRCxFQUFJRCxDQUFKLENBQUQsS0FBYSxHQUFFQyxDQUFFLEtBQUlELENBQUUsRUFKdEIsRUFLTFQsSUFMSyxDQUtBLElBTEEsQ0FBUixDQVBtQixDQWNyQjs7QUFDQSxRQUFJUSxHQUFHLEtBQUssT0FBUixJQUFtQlosS0FBSyxDQUFDZSxPQUFOLENBQWMvQixLQUFkLENBQXZCLEVBQTZDQSxLQUFLLEdBQUdBLEtBQUssQ0FBQ29CLElBQU4sQ0FBVyxHQUFYLENBQVI7QUFFN0MsV0FBUSxHQUFFUSxHQUFJLEtBQUk1QixLQUFNLEdBQXhCO0FBQ0QsR0FwQmdCLEVBcUJoQm9CLElBckJnQixDQXFCWCxHQXJCVyxDQUFuQjtBQXVCQSxRQUFNWSxPQUFPLEdBQUdoRCxRQUFRLENBQUNDLEdBQVQsQ0FBY2dELEtBQUQsSUFBV0EsS0FBSyxDQUFDQyxRQUFOLEVBQXhCLEVBQTBDZCxJQUExQyxDQUErQyxFQUEvQyxDQUFoQjtBQUVBLFNBQVEsSUFBR0csR0FBSSxJQUFHQyxVQUFXLElBQUdRLE9BQVEsS0FBSVQsR0FBSSxHQUFoRDtBQUNEO0FBRUQ7Ozs7Ozs7QUFLQSxTQUFTWSxNQUFULENBQ0VaLEdBREYsRUFFRWpELEtBRkYsRUFFeUM7QUFDdkNVLFFBSEYsRUFJOEI7QUFDNUJOLFNBQU8sQ0FBQ0MsR0FBUixDQUFZLFVBQVosRUFBd0I7QUFBRTRDLE9BQUY7QUFBT2pELFNBQVA7QUFBY1U7QUFBZCxHQUF4QixFQUQ0QixDQUc1Qjs7QUFDQSxNQUFJLENBQUN1QyxHQUFMLEVBQVU7QUFDUixVQUFNYSxTQUFTLEdBQUdwRCxRQUFRLENBQ3ZCRyxJQURlLEdBQ1I7QUFEUSxLQUVmRixHQUZlLENBRVZvRCxJQUFELElBQVVBLElBQUksQ0FBQ0YsTUFBTCxFQUZDLENBQWxCO0FBSUEsVUFBTUcsZ0JBQWdCLEdBQUdqQyxRQUFRLENBQUNrQyxzQkFBVCxFQUF6QjtBQUVBRCxvQkFBZ0IsQ0FBQ0UsTUFBakIsQ0FBd0IsR0FBR0osU0FBM0I7QUFDQSxXQUFPLENBQUNFLGdCQUFELEVBQW1CLEVBQW5CLENBQVA7QUFDRCxHQWIyQixDQWU1Qjs7O0FBQ0EsTUFBSSxPQUFPZixHQUFQLEtBQWUsVUFBbkIsRUFBK0I7QUFDN0I3QyxXQUFPLENBQUMrRCxLQUFSLENBQWMsb0NBQWQsRUFENkIsQ0FFN0I7QUFDQTs7QUFDQSxRQUFJQyxNQUFNLEdBQUduQixHQUFHLENBQUNqRCxLQUFELENBQWhCO0FBRUEsUUFBSXFFLFFBQTRCLEdBQUcsRUFBbkM7O0FBRUEsUUFBSUQsTUFBTSxZQUFZbkUsS0FBdEIsRUFBNkI7QUFDM0JvRSxjQUFRLEdBQUcsQ0FBQ0QsTUFBRCxDQUFYO0FBQ0FBLFlBQU0sR0FBSUEsTUFBRCxDQUE2QlAsTUFBN0IsRUFBVDtBQUNBVixZQUFNLENBQUNDLE9BQVAsQ0FBZXBELEtBQWYsRUFBc0JzRSxPQUF0QixDQUE4QixDQUFDLENBQUNoQixHQUFELEVBQU01QixLQUFOLENBQUQsS0FBa0I7QUFDOUMsWUFDRTRCLEdBQUcsQ0FBQ2lCLFVBQUosQ0FBZSxLQUFmLE1BQ0MsT0FBTzdDLEtBQVAsS0FBaUIsVUFBakIsSUFBK0IsT0FBT0EsS0FBUCxLQUFpQixRQURqRCxDQURGLEVBR0U7QUFDQTtBQUNBLGdCQUFNOEMsS0FBSyxHQUFHbEIsR0FBRyxDQUFDbUIsT0FBSixDQUFZLE1BQVosRUFBb0IsRUFBcEIsQ0FBZDtBQUVBTCxnQkFBTSxDQUFDTSxnQkFBUCxDQUNFRixLQURGLEVBRUU5QyxLQUZGO0FBSUQ7QUFDRixPQWJEO0FBY0Q7O0FBRUQsV0FBTyxDQUFDMEMsTUFBRCxFQUFTQyxRQUFULENBQVA7QUFDRDs7QUFFRCxRQUFNLEVBQUUsR0FBR007QUFBTCxNQUFlM0UsS0FBckIsQ0E5QzRCLENBK0M1Qjs7QUFDQSxNQUFJNEUsYUFBYSxHQUFHLEtBQXBCLENBaEQ0QixDQWtENUI7QUFDQTs7QUFDQSxNQUFJLENBQUNwRCxVQUFELElBQWV5QixHQUFHLEtBQUssS0FBM0IsRUFBa0M7QUFDaEN6QixjQUFVLEdBQUcsSUFBYjtBQUNBb0QsaUJBQWEsR0FBRyxJQUFoQjtBQUNELEdBdkQyQixDQXlENUI7OztBQUNBLFFBQU1yRSxJQUFJLEdBQUdpQixVQUFVLEdBQ25CTyxRQUFRLENBQUM4QyxlQUFULENBQXlCLDRCQUF6QixFQUF1RDVCLEdBQXZELENBRG1CLEdBRW5CbEIsUUFBUSxDQUFDQyxhQUFULENBQXVCaUIsR0FBdkIsQ0FGSjtBQUlBRSxRQUFNLENBQUNDLE9BQVAsQ0FBZXVCLEtBQWYsRUFDR3RCLE1BREgsQ0FDVSxDQUFDLENBQUN5QixJQUFELEVBQU9wRCxLQUFQLENBQUQsS0FBbUJELE1BQU0sQ0FBQ0MsS0FBRCxDQURuQyxFQUVHNEMsT0FGSCxDQUVXLENBQUMsQ0FBQ2hCLEdBQUQsRUFBTTVCLEtBQU4sQ0FBRCxLQUFrQjtBQUN6QjtBQUNBO0FBQ0EsUUFBSTRCLEdBQUcsS0FBSyxPQUFSLElBQW1CLE9BQU81QixLQUFQLEtBQWlCLFFBQXhDLEVBQ0VBLEtBQUssR0FBR3lCLE1BQU0sQ0FBQ0MsT0FBUCxDQUFlMUIsS0FBZixFQUNMMkIsTUFESyxDQUNFLENBQUMsR0FBR0UsQ0FBSCxDQUFELEtBQVc5QixNQUFNLENBQUM4QixDQUFELENBRG5CLEVBRUw1QyxHQUZLLENBRUQsQ0FBQyxDQUFDNkMsQ0FBRCxFQUFJRCxDQUFKLENBQUQsS0FBYSxHQUFFQyxDQUFFLEtBQUlELENBQUUsRUFGdEIsRUFHTFQsSUFISyxDQUdBLElBSEEsQ0FBUixDQUp1QixDQVN6Qjs7QUFDQSxRQUFJUSxHQUFHLEtBQUssT0FBUixJQUFtQlosS0FBSyxDQUFDZSxPQUFOLENBQWMvQixLQUFkLENBQXZCLEVBQTZDQSxLQUFLLEdBQUdBLEtBQUssQ0FBQ29CLElBQU4sQ0FBVyxHQUFYLENBQVI7QUFFN0MsUUFBSXBCLEtBQUssS0FBSyxJQUFkLEVBQW9CbkIsSUFBSSxDQUFDd0UsWUFBTCxDQUFrQnpCLEdBQWxCLEVBQXVCLEVBQXZCLEVBQXBCLEtBQ0ssSUFBSSxPQUFPNUIsS0FBUCxLQUFpQixRQUFqQixJQUE2QixPQUFPQSxLQUFQLEtBQWlCLFFBQWxELEVBQ0huQixJQUFJLENBQUN3RSxZQUFMLENBQWtCekIsR0FBbEIsRUFBdUIwQixNQUFNLENBQUN0RCxLQUFELENBQTdCLEVBREcsQ0FFTDtBQUZLLFNBR0EsSUFDSDRCLEdBQUcsQ0FBQ2lCLFVBQUosQ0FBZSxLQUFmLE1BQ0MsT0FBTzdDLEtBQVAsS0FBaUIsVUFBakIsSUFBK0IsT0FBT0EsS0FBUCxLQUFpQixRQURqRCxDQURHLEVBR0g7QUFDQTtBQUNBLGNBQU04QyxLQUFLLEdBQUdsQixHQUFHLENBQUNtQixPQUFKLENBQVksTUFBWixFQUFvQixFQUFwQixDQUFkO0FBRUFsRSxZQUFJLENBQUNtRSxnQkFBTCxDQUNFRixLQURGLEVBRUU5QyxLQUZGO0FBSUQsT0FYSSxDQVlMO0FBWkssV0FhQW5CLElBQUksQ0FBQytDLEdBQUQsQ0FBSixHQUFZNUIsS0FBWjtBQUNOLEdBaENILEVBOUQ0QixDQWdHNUI7O0FBQ0EsUUFBTXVELGFBQWEsR0FBR3ZFLFFBQVEsQ0FBQzJDLE1BQVQsQ0FBaUJNLEtBQUQsSUFBV0EsS0FBSyxZQUFZMUQsS0FBNUMsQ0FBdEI7QUFFQUcsU0FBTyxDQUFDQyxHQUFSLENBQVk7QUFBRUs7QUFBRixHQUFaO0FBRUFILE1BQUksQ0FBQzJELE1BQUwsQ0FDRSxHQUFHeEQsUUFBUSxDQUNSRyxJQURBLEdBRUQ7QUFGQyxHQUdBd0MsTUFIQSxDQUdRTSxLQUFELElBQVdBLEtBQUssQ0FBQ1YsR0FBTixLQUFjLFVBSGhDLEVBSUF0QyxHQUpBLENBSUtnRCxLQUFELElBQVdBLEtBQUssQ0FBQ0UsTUFBTixFQUpmLENBREwsRUFyRzRCLENBNkc1Qjs7QUFDQSxNQUFJZSxhQUFKLEVBQW1CcEQsVUFBVSxHQUFHLEtBQWI7QUFFbkIsU0FBTyxDQUFDakIsSUFBRCxFQUFPMEUsYUFBUCxDQUFQO0FBQ0Q7O0FBRUQsU0FBU0MsYUFBVCxDQUF1QkMsT0FBdkIsRUFBZ0Q7QUFDOUMsUUFBTSxDQUFDN0UsTUFBRCxFQUFTZSxXQUFULElBQXdCTix1QkFBdUIsQ0FBQ29FLE9BQUQsQ0FBckQ7QUFDQTdFLFFBQU0sQ0FBQzhFLFlBQVAsQ0FBb0JELE9BQU8sQ0FBQ3RCLE1BQVIsRUFBcEIsRUFBc0N4QyxXQUF0QztBQUNEOztBQUVELFNBQVNnRSxvQkFBVCxDQUNFQyxPQURGLEVBRUVILE9BRkYsRUFHRTtBQUNBRyxTQUFPLENBQUM1RSxRQUFSLENBQWlCNEQsT0FBakIsQ0FBeUIsQ0FBQ2lCLFFBQUQsRUFBV0MsRUFBWCxLQUFrQjtBQUN6QyxVQUFNQyxRQUFRLEdBQUdOLE9BQU8sQ0FBQ3pFLFFBQVIsQ0FBaUI4RSxFQUFqQixDQUFqQixDQUR5QyxDQUV6Qzs7QUFDQSxRQUFJLENBQUNDLFFBQUwsRUFBZUYsUUFBUSxDQUFDRyxhQUFULEdBQWYsQ0FDQTtBQURBLFNBRUssSUFBSUQsUUFBUSxDQUFDRSxJQUFULEtBQWtCSixRQUFRLENBQUNJLElBQS9CLEVBQXFDSixRQUFRLENBQUNLLFlBQVQsQ0FBc0JILFFBQXRCLEVBQXJDLENBQ0w7QUFESyxXQUVBO0FBQ0hGLGtCQUFRLENBQUNHLGFBQVQ7QUFDQVIsdUJBQWEsQ0FBQ08sUUFBRCxDQUFiO0FBQ0Q7QUFDRixHQVhELEVBREEsQ0FjQTs7QUFDQSxRQUFNSSxRQUFRLEdBQUdWLE9BQU8sQ0FBQ3pFLFFBQVIsQ0FBaUJvRixLQUFqQixDQUF1QlIsT0FBTyxDQUFDNUUsUUFBUixDQUFpQnFGLE1BQXhDLENBQWpCOztBQUNBLE1BQUlGLFFBQVEsQ0FBQ0UsTUFBYixFQUFxQjtBQUNuQixVQUFNL0IsZ0JBQWdCLEdBQUdqQyxRQUFRLENBQUNrQyxzQkFBVCxFQUF6QjtBQUNBNEIsWUFBUSxDQUFDdkIsT0FBVCxDQUFrQlAsSUFBRCxJQUFVQyxnQkFBZ0IsQ0FBQ0UsTUFBakIsQ0FBd0JILElBQUksQ0FBQ0YsTUFBTCxFQUF4QixDQUEzQjtBQUVBLFVBQU0sQ0FBQ3ZELE1BQUQsRUFBU2UsV0FBVCxJQUF3Qk4sdUJBQXVCLENBQUM4RSxRQUFRLENBQUMsQ0FBRCxDQUFULENBQXJEO0FBQ0F2RixVQUFNLENBQUM4RSxZQUFQLENBQW9CcEIsZ0JBQXBCLEVBQXNDM0MsV0FBdEM7QUFDRDtBQUNGOztBQUVELFNBQVMyRSxPQUFULENBQ0UvQyxHQURGLEVBRUVqRCxLQUZGLEVBR2tCO0FBQ2hCSSxTQUFPLENBQUNDLEdBQVIsQ0FBWSxVQUFaLEVBQXdCO0FBQUU0QyxPQUFGO0FBQU9qRDtBQUFQLEdBQXhCOztBQUVBLE1BQUksT0FBT2lELEdBQVAsS0FBZSxVQUFuQixFQUErQjtBQUM3QixRQUFJbUIsTUFBTSxHQUFHbkIsR0FBRyxDQUFDakQsS0FBRCxDQUFoQjs7QUFDQSxRQUFJb0UsTUFBTSxZQUFZbkUsS0FBdEIsRUFBNkI7QUFDM0I7QUFDQSxhQUFPbUUsTUFBUDtBQUNEOztBQUNELFFBQUlBLE1BQU0sWUFBWTZCLElBQXRCLEVBQTRCO0FBQzFCLGFBQU8sSUFBSUMsYUFBSixDQUFrQjlCLE1BQWxCLENBQVA7QUFDRCxLQVI0QixDQVM3Qjs7O0FBQ0EsUUFBSSxDQUFDM0MsTUFBTSxDQUFDMkMsTUFBRCxDQUFYLEVBQXFCO0FBQ25CLGFBQU8sSUFBSStCLFNBQUosRUFBUDtBQUNEOztBQUVELFdBQU8sSUFBSUMsU0FBSixDQUFjaEMsTUFBZCxDQUFQO0FBQ0Q7O0FBRUQsUUFBTTtBQUFFMUQsWUFBRjtBQUFZLE9BQUcyRjtBQUFmLE1BQXdCckcsS0FBOUI7O0FBQ0EsTUFBSWlELEdBQUosRUFBUztBQUNQLFdBQU8sSUFBSXFELFlBQUosQ0FBaUJyRCxHQUFqQixFQUFzQm9ELElBQXRCLEVBQTRCM0YsUUFBNUIsQ0FBUCxDQURPLENBQ3VDO0FBQy9DLEdBRkQsTUFFTyxJQUFJLENBQUNlLE1BQU0sQ0FBQzRFLElBQUQsQ0FBWCxFQUFtQjtBQUN4QixVQUFNbEcsS0FBSyxHQUFHLElBQUlnRyxTQUFKLEVBQWQ7QUFDQWhHLFNBQUssQ0FBQ0csTUFBTixHQUFlLElBQWY7QUFDQSxXQUFPSCxLQUFQO0FBQ0QsR0FKTSxNQUlBLElBQUlPLFFBQUosRUFBYztBQUNuQixXQUFPLElBQUk2RixhQUFKLENBQWtCN0YsUUFBbEIsQ0FBUDtBQUNELEdBN0JlLENBK0JoQjs7QUFDRDtBQUVEOzs7Ozs7Ozs7QUFPTyxTQUFTOEYsSUFBVCxDQUNMdkQsR0FESyxFQUVMakQsS0FGSyxFQUdhO0FBQ2xCQSxPQUFLLENBQUNVLFFBQU4sR0FBaUJWLEtBQUssQ0FBQ1UsUUFBTixDQUFlRyxJQUFmLEVBQWpCLENBRGtCLENBQ3NCO0FBRXhDOztBQUNBLFFBQU00RixHQUFvQixHQUN4QixPQUFPekcsS0FBSyxDQUFDeUcsR0FBYixLQUFxQixVQUFyQixHQUFrQ3pHLEtBQUssQ0FBQ3lHLEdBQXhDLEdBQThDLElBRGhEO0FBRUEsTUFBSUEsR0FBSixFQUFTLE9BQU96RyxLQUFLLENBQUN5RyxHQUFiLENBTlMsQ0FNUzs7QUFFM0IsU0FBT1QsT0FBTyxDQUFDL0MsR0FBRCxFQUFNakQsS0FBTixDQUFkO0FBQ0Q7QUFFRDs7Ozs7OztBQU1PLFNBQVMwRyxRQUFULENBQWtCMUcsS0FBbEIsRUFBbUM7QUFDeEMsU0FBT2dHLE9BQU8sQ0FBQ3JFLFNBQUQsRUFBWTNCLEtBQVosQ0FBZDtBQUNELEMsQ0FFRDs7QUFDTyxTQUFTMkcsR0FBVCxDQUNMMUQsR0FESyxFQUVMakQsS0FGSyxFQUlhO0FBQ2xCO0FBQ0FBLE9BQUssQ0FBQ1UsUUFBTixHQUFpQlYsS0FBSyxDQUFDNEcsY0FBTixDQUFxQixVQUFyQixJQUFtQyxDQUFDNUcsS0FBSyxDQUFDVSxRQUFQLENBQW5DLEdBQXNELEVBQXZFO0FBRUEsU0FBTzhGLElBQUksQ0FBQ3ZELEdBQUQsRUFBT2pELEtBQVAsQ0FBWDtBQUNEO0FBRUQ7Ozs7Ozs7O0FBT08sU0FBUzZHLE1BQVQsQ0FDTEMsTUFESyxFQUM0QztBQUNqREMsT0FGSyxFQUdMN0MsTUFBZSxHQUFHLEtBSGIsRUFJTDtBQUNBeEIsT0FBSyxDQUFDQyxJQUFOLENBQVdaLFFBQVEsQ0FBQ2lGLElBQVQsQ0FBY0MsZ0JBQWQsQ0FBK0IsR0FBL0IsQ0FBWCxFQUFnRDNDLE9BQWhELENBQ0d6QixFQUFELElBQVNBLEVBQUUsQ0FBQ3FFLEtBQUgsQ0FBU0MsVUFBVCxHQUFzQixTQURqQztBQUlBdEgsWUFBVSxDQUFDdUgsTUFBWCxDQUFrQixDQUFsQjtBQUVBLFFBQU1DLFVBQVUsR0FBRzFILGNBQWMsQ0FBQzJILEdBQWYsQ0FBbUJQLE9BQW5CLENBQW5CO0FBQ0EsTUFBSSxDQUFDN0MsTUFBRCxJQUFXLENBQUNtRCxVQUFoQixFQUE0Qk4sT0FBTyxDQUFDN0UsU0FBUixHQUFvQixFQUFwQjs7QUFFNUIsTUFBSSxPQUFPNEUsTUFBUCxLQUFrQixRQUF0QixFQUFnQztBQUM5QkMsV0FBTyxDQUFDUSxrQkFBUixDQUEyQixXQUEzQixFQUF3Q1QsTUFBeEMsRUFEOEIsQ0FDbUI7QUFDbEQsR0FGRCxNQUVPLElBQUlBLE1BQU0sWUFBWWIsSUFBdEIsRUFBNEI7QUFDakNjLFdBQU8sQ0FBQ1MscUJBQVIsQ0FBOEIsV0FBOUIsRUFBMkNWLE1BQTNDO0FBQ0QsR0FGTSxNQUVBLElBQUlBLE1BQU0sWUFBWTdHLEtBQXRCLEVBQTZCO0FBQ2xDdUIsY0FBVSxHQUFHLEtBQWI7QUFFQSxVQUFNaUcsS0FBSyxHQUFHLElBQUlDLFNBQUosQ0FBY1osTUFBZCxFQUFzQkMsT0FBdEIsQ0FBZDtBQUVBM0csV0FBTyxDQUFDQyxHQUFSLENBQVksZUFBWixFQUE2QixRQUE3QixFQUF1Q29ILEtBQXZDOztBQUVBLFFBQUlKLFVBQUosRUFBZ0I7QUFDZGpILGFBQU8sQ0FBQ0MsR0FBUixDQUFZLGNBQVo7QUFDQSxZQUFNc0gsUUFBUSxHQUFHaEksY0FBYyxDQUFDaUksR0FBZixDQUFtQmIsT0FBbkIsQ0FBakI7QUFFQTNHLGFBQU8sQ0FBQ0MsR0FBUixDQUFZLGVBQVosRUFBNkI7QUFBRXNILGdCQUFGO0FBQVlFLGdCQUFRLEVBQUVKO0FBQXRCLE9BQTdCLEVBSmMsQ0FNZDs7QUFDQUUsY0FBUSxDQUFDL0IsWUFBVCxDQUFzQjZCLEtBQXRCO0FBRUE5SCxvQkFBYyxDQUFDbUksR0FBZixDQUFtQmYsT0FBbkIsRUFBNEJVLEtBQTVCO0FBQ0QsS0FWRCxNQVVPO0FBQ0wsWUFBTS9ELE9BQU8sR0FBRytELEtBQUssQ0FBQzVELE1BQU4sRUFBaEI7QUFDQWtELGFBQU8sQ0FBQzdDLE1BQVIsQ0FBZVIsT0FBZjtBQUNEOztBQUVEL0Qsa0JBQWMsQ0FBQ21JLEdBQWYsQ0FBbUJmLE9BQW5CLEVBQTRCVSxLQUE1QjtBQUVBNUgsY0FBVSxDQUFDeUUsT0FBWCxDQUFvQnlELEVBQUQsSUFBUUEsRUFBRSxFQUE3QixFQXhCa0MsQ0EwQmxDO0FBQ0QsR0EzQk0sTUEyQkE7QUFDTCxVQUFNLElBQUlDLEtBQUosQ0FBVSw2Q0FBVixDQUFOO0FBQ0Q7QUFDRjtBQUVNLFNBQVNDLE9BQVQsQ0FBaUJ2RSxPQUFqQixFQUFvRDtBQUN6RCxTQUFPLElBQUssY0FBYzVELE9BQWQsQ0FBa0Q7QUFDNUQ4RCxZQUFRLEdBQUc7QUFDVCxhQUFPRixPQUFQO0FBQ0Q7O0FBRURHLFVBQU0sR0FBRztBQUNQLFlBQU1xRSxRQUFRLEdBQUduRyxRQUFRLENBQUNDLGFBQVQsQ0FBdUIsVUFBdkIsQ0FBakI7QUFDQWtHLGNBQVEsQ0FBQ2hHLFNBQVQsR0FBcUJ3QixPQUFyQjtBQUNBLGFBQU93RSxRQUFRLENBQUN4RSxPQUFoQjtBQUNEOztBQUNEc0MsV0FBTyxHQUFHO0FBQ1IsYUFBTyxFQUFQO0FBQ0Q7O0FBRUQsS0FBQzFFLFNBQUQsSUFBYyxDQUNaO0FBQ0Q7O0FBaEIyRCxHQUF2RCxDQWlCSixFQWpCSSxDQUFQO0FBa0JELEMsQ0FFRDtBQUVBO0FBQ0E7O0FBYUEsTUFBTWdGLFlBQU4sU0FBMkJyRyxLQUEzQixDQUEyRDtBQU16REYsYUFBVyxDQUNEa0QsR0FEQyxFQUVEakQsS0FGQyxFQUdUVSxRQUhTLEVBSVQ7QUFDQTtBQURBLFNBSFF1QyxHQUdSLEdBSFFBLEdBR1I7QUFBQSxTQUZRakQsS0FFUixHQUZRQSxLQUVSO0FBQUEsU0FURjJGLElBU0UsR0FUSyxTQVNMO0FBQUEsU0FSRnBGLElBUUUsR0FSSyxJQVFMO0FBQUEsU0FQRkcsUUFPRTtBQUFBLFNBTkZKLE1BTUUsR0FOdUIsSUFNdkI7QUFFQSxTQUFLSSxRQUFMLEdBQWdCQSxRQUFRLENBQUNDLEdBQVQsQ0FBY2dELEtBQUQsSUFBVztBQUN0QyxVQUFJakIsS0FBSyxDQUFDZSxPQUFOLENBQWNFLEtBQWQsQ0FBSixFQUEwQixPQUFPLElBQUk0QyxhQUFKLENBQWtCNUMsS0FBbEIsQ0FBUDs7QUFDMUIsVUFBSUEsS0FBSyxZQUFZMUQsS0FBckIsRUFBNEI7QUFDMUIsZUFBT2tJLFVBQVA7QUFDRDs7QUFDRCxVQUFJeEUsS0FBSyxZQUFZc0MsSUFBckIsRUFBMkI7QUFDekIsZUFBTyxJQUFJQyxhQUFKLENBQWtCdkMsS0FBbEIsQ0FBUDtBQUNEOztBQUNELFVBQUksQ0FBQ2xDLE1BQU0sQ0FBQ2tDLEtBQUQsQ0FBWCxFQUFvQjtBQUNsQixlQUFPLElBQUl3QyxTQUFKLEVBQVA7QUFDRDs7QUFFRCxhQUFPLElBQUlDLFNBQUosQ0FBY3pDLEtBQWQsQ0FBUDtBQUNELEtBYmUsQ0FBaEI7QUFjQSxTQUFLakQsUUFBTCxDQUFjNEQsT0FBZCxDQUF1QlgsS0FBRCxJQUFZQSxLQUFLLENBQUNyRCxNQUFOLEdBQWUsSUFBakQ7QUFDRDs7QUFDRHNELFVBQVEsR0FBRztBQUNULFdBQU9aLFlBQVksQ0FBQyxLQUFLQyxHQUFOLEVBQVcsS0FBS2pELEtBQWhCLEVBQXVCLEtBQUtVLFFBQTVCLENBQW5CO0FBQ0Q7O0FBQ0RtRCxRQUFNLEdBQUc7QUFDUCxVQUFNdEQsSUFBSSxHQUFHc0QsTUFBTSxDQUFDLEtBQUtaLEdBQU4sRUFBVyxLQUFLakQsS0FBaEIsRUFBdUIsS0FBS1UsUUFBNUIsQ0FBTixDQUE0QyxDQUE1QyxDQUFiO0FBQ0EsU0FBS0gsSUFBTCxHQUFZQSxJQUFaO0FBQ0EsV0FBT0EsSUFBUDtBQUNEOztBQUNEbUYsZUFBYSxHQUFHO0FBQ2QsU0FBS25GLElBQUwsQ0FBVTZILGFBQVYsQ0FBd0JDLFdBQXhCLENBQW9DLEtBQUs5SCxJQUF6QztBQUNEOztBQUNEcUYsY0FBWSxDQUFDVCxPQUFELEVBQXdCO0FBQ2xDLFFBQUlBLE9BQU8sQ0FBQ2xDLEdBQVIsS0FBZ0IsS0FBS0EsR0FBekIsRUFBOEI7QUFDNUJrQyxhQUFPLENBQUM1RSxJQUFSLEdBQWUsS0FBS0EsSUFBcEIsQ0FENEIsQ0FFNUI7QUFDQTs7QUFDQTRDLFlBQU0sQ0FBQ0MsT0FBUCxDQUFlK0IsT0FBTyxDQUFDbkYsS0FBdkIsRUFDR3FELE1BREgsQ0FDVSxDQUFDLENBQUNHLENBQUQsRUFBSUQsQ0FBSixDQUFELEtBQVksS0FBS3ZELEtBQUwsQ0FBV3dELENBQVgsTUFBa0JELENBRHhDLEVBRUdlLE9BRkgsQ0FFVyxDQUFDLENBQUNoQixHQUFELEVBQU01QixLQUFOLENBQUQsS0FBa0I7QUFDekIsWUFBSUEsS0FBSyxLQUFLLElBQWQsRUFBb0J5RCxPQUFPLENBQUM1RSxJQUFSLENBQWF3RSxZQUFiLENBQTBCekIsR0FBMUIsRUFBK0IsRUFBL0IsRUFBcEIsS0FDSyxJQUFJNUIsS0FBSyxLQUFLLElBQVYsSUFBa0JBLEtBQUssS0FBS0MsU0FBNUIsSUFBeUNELEtBQUssS0FBSyxLQUF2RCxFQUNIeUQsT0FBTyxDQUFDNUUsSUFBUixDQUFhK0gsZUFBYixDQUE2QmhGLEdBQTdCLEVBREcsS0FFQTZCLE9BQU8sQ0FBQzVFLElBQVIsQ0FBYXdFLFlBQWIsQ0FBMEJ6QixHQUExQixFQUErQjVCLEtBQS9CO0FBQ04sT0FQSCxFQUo0QixDQWE1Qjs7QUFDQXlCLFlBQU0sQ0FBQ0MsT0FBUCxDQUFlLEtBQUtwRCxLQUFwQixFQUNHcUQsTUFESCxDQUNVLENBQUMsQ0FBQ0csQ0FBRCxFQUFJRCxDQUFKLENBQUQsS0FBWSxDQUFDNEIsT0FBTyxDQUFDbkYsS0FBUixDQUFjNEcsY0FBZCxDQUE2QnBELENBQTdCLENBRHZCLEVBRUdjLE9BRkgsQ0FFVyxDQUFDLENBQUNoQixHQUFELEVBQU01QixLQUFOLENBQUQsS0FBa0I7QUFDekIsYUFBS25CLElBQUwsQ0FBVStILGVBQVYsQ0FBMEJoRixHQUExQjtBQUNELE9BSkgsRUFkNEIsQ0FvQjVCO0FBQ0E7O0FBQ0ErQiwwQkFBb0IsQ0FBQyxJQUFELEVBQU9GLE9BQVAsQ0FBcEI7QUFDRCxLQXZCRCxDQXdCQTtBQXhCQSxTQXlCSztBQUNILGFBQUs1RSxJQUFMLENBQVVnSSxXQUFWLENBQXNCcEQsT0FBTyxDQUFDdEIsTUFBUixFQUF0QjtBQUNEO0FBQ0Y7O0FBcEV3RDs7QUF1RTNELE1BQU0wQyxhQUFOLFNBQTRCdEcsS0FBNUIsQ0FBNEQ7QUFHMURGLGFBQVcsQ0FDVFcsUUFEUyxFQUlUO0FBQ0E7QUFEQSxTQU5GaUYsSUFNRSxHQU5LLFVBTUw7QUFHQSxTQUFLakYsUUFBTCxHQUFnQkEsUUFBUSxDQUFDQyxHQUFULENBQWNnRCxLQUFELElBQVc7QUFDdEMsVUFBSWpCLEtBQUssQ0FBQ2UsT0FBTixDQUFjRSxLQUFkLENBQUosRUFBMEIsT0FBTyxJQUFJNEMsYUFBSixDQUFrQjVDLEtBQWxCLENBQVA7O0FBQzFCLFVBQUlBLEtBQUssWUFBWTFELEtBQXJCLEVBQTRCO0FBQzFCLGNBQU1rSSxVQUFVLEdBQUd4RSxLQUFuQixDQUQwQixDQUNBOztBQUMxQndFLGtCQUFVLENBQUM3SCxNQUFYLEdBQW9CLElBQXBCO0FBQ0EsZUFBTzZILFVBQVA7QUFDRDs7QUFDRCxVQUFJeEUsS0FBSyxZQUFZc0MsSUFBckIsRUFBMkI7QUFDekIsY0FBTXVDLENBQUMsR0FBRyxJQUFJdEMsYUFBSixDQUFrQnZDLEtBQWxCLENBQVY7QUFDQTZFLFNBQUMsQ0FBQ2xJLE1BQUYsR0FBVyxJQUFYO0FBQ0EsZUFBT2tJLENBQVA7QUFDRDs7QUFFRHBJLGFBQU8sQ0FBQ0MsR0FBUixDQUFZLFVBQVosRUFBd0I7QUFBRXNEO0FBQUYsT0FBeEI7O0FBRUEsVUFBSSxDQUFDbEMsTUFBTSxDQUFDa0MsS0FBRCxDQUFYLEVBQW9CO0FBQ2xCLGNBQU13RSxVQUFVLEdBQUcsSUFBSWhDLFNBQUosRUFBbkI7QUFDQWdDLGtCQUFVLENBQUM3SCxNQUFYLEdBQW9CLElBQXBCO0FBQ0EsZUFBTzZILFVBQVA7QUFDRDs7QUFFRC9ILGFBQU8sQ0FBQ0MsR0FBUixDQUFZLEtBQVosRUFBbUI7QUFBRXNEO0FBQUYsT0FBbkI7QUFFQSxZQUFNOEUsU0FBUyxHQUFHLElBQUlyQyxTQUFKLENBQWN6QyxLQUFkLENBQWxCO0FBQ0E4RSxlQUFTLENBQUNuSSxNQUFWLEdBQW1CLElBQW5CO0FBQ0EsYUFBT21JLFNBQVA7QUFDRCxLQTFCZSxDQUFoQjtBQTJCRDs7QUFFRDVFLFFBQU0sR0FBRztBQUNQLFVBQU10RCxJQUFJLEdBQUdzRCxNQUFNLENBQUNsQyxTQUFELEVBQVksRUFBWixFQUFnQixLQUFLakIsUUFBckIsQ0FBTixDQUFxQyxDQUFyQyxDQUFiO0FBQ0FOLFdBQU8sQ0FBQ0MsR0FBUixDQUFZO0FBQUVFO0FBQUYsS0FBWjtBQUVBLFdBQU9BLElBQVA7QUFDRDs7QUFFRHFELFVBQVEsR0FBRztBQUNULFdBQU8sS0FBS2xELFFBQUwsQ0FBY0MsR0FBZCxDQUFtQmdELEtBQUQsSUFBV0EsS0FBSyxDQUFDQyxRQUFOLEVBQTdCLEVBQStDZCxJQUEvQyxDQUFvRCxFQUFwRCxDQUFQO0FBQ0QsR0FoRHlELENBa0QxRDs7O0FBQ0E4QyxjQUFZLENBQUM4QyxRQUFELEVBQTBCO0FBQ3BDdEksV0FBTyxDQUFDQyxHQUFSLENBQVksY0FBWjtBQUVBLFdBQU9nRixvQkFBb0IsQ0FBQyxJQUFELEVBQU9xRCxRQUFQLENBQTNCO0FBQ0Q7O0FBRURoRCxlQUFhLEdBQUc7QUFDZGxGLHdCQUFvQixDQUFDLElBQUQsQ0FBcEIsQ0FBMkI4RCxPQUEzQixDQUFvQy9ELElBQUQsSUFDakNBLElBQUksQ0FBQ0EsSUFBTCxDQUFXNkgsYUFBWCxDQUEwQkMsV0FBMUIsQ0FBc0M5SCxJQUFJLENBQUNBLElBQTNDLENBREY7QUFHRDs7QUE3RHlEOztBQWdFNUQsTUFBTTZGLFNBQU4sU0FBd0JuRyxLQUF4QixDQUF3RDtBQU90RDs7O0FBR0FGLGFBQVcsQ0FBQzJELE9BQUQsRUFBcUM7QUFDOUM7QUFEOEMsU0FUaERpQyxJQVNnRCxHQVR6QyxVQVN5QztBQUFBLFNBUmhEakYsUUFRZ0QsR0FSckMsRUFRcUM7QUFBQSxTQVBoREgsSUFPZ0QsR0FQbkMsSUFPbUM7QUFBQSxTQU5oRFAsS0FNZ0Q7QUFBQSxTQUxoRE0sTUFLZ0QsR0FMdkIsSUFLdUI7QUFFOUMsU0FBS04sS0FBTCxHQUFhO0FBQUUwRDtBQUFGLEtBQWIsQ0FGOEMsQ0FFcEI7QUFDM0I7O0FBRURHLFFBQU0sR0FBRztBQUNQLFVBQU04RSxRQUFRLEdBQUc1RyxRQUFRLENBQUM2RyxjQUFULENBQXdCLEtBQUs1SSxLQUFMLENBQVcwRCxPQUFuQyxDQUFqQjtBQUNBLFNBQUtuRCxJQUFMLEdBQVlvSSxRQUFaO0FBQ0EsV0FBT0EsUUFBUDtBQUNEOztBQUVEL0UsVUFBUSxHQUFHO0FBQ1QsV0FBT2hDLFFBQVEsQ0FBQyxLQUFLNUIsS0FBTCxDQUFXMEQsT0FBWixDQUFmO0FBQ0Q7O0FBRURrQyxjQUFZLENBQUNULE9BQUQsRUFBcUI7QUFDL0IsU0FBSzVFLElBQUwsQ0FBVXNJLFNBQVYsR0FBc0IxRCxPQUFPLENBQUNuRixLQUFSLENBQWMwRCxPQUFwQztBQUNBeUIsV0FBTyxDQUFDNUUsSUFBUixHQUFlLEtBQUtBLElBQXBCO0FBQ0Q7O0FBRURtRixlQUFhLEdBQUc7QUFDZCxTQUFLbkYsSUFBTCxDQUFVNkgsYUFBVixDQUF5QkMsV0FBekIsQ0FBcUMsS0FBSzlILElBQTFDO0FBQ0Q7O0FBaENxRDs7QUFtQ3hELE1BQU00RixTQUFOLFNBQXdCbEcsS0FBeEIsQ0FBd0Q7QUFJdEQ7OztBQUdBRixhQUFXLEdBQUc7QUFDWjtBQURZLFNBTmQ0RixJQU1jLEdBTlAsTUFNTztBQUFBLFNBTGRqRixRQUtjLEdBTEgsRUFLRztBQUFBLFNBSmRKLE1BSWMsR0FKVyxJQUlYO0FBRWI7O0FBRUR1RCxRQUFNLEdBQUc7QUFDUDtBQUNBLFdBQU85QixRQUFRLENBQUNrQyxzQkFBVCxFQUFQO0FBQ0Q7O0FBRUQyQixjQUFZLENBQUNrRCxRQUFELEVBQXNCO0FBQ2hDO0FBQ0Q7O0FBRURwRCxlQUFhLEdBQUc7QUFDZDtBQUNEOztBQUVEOUIsVUFBUSxHQUFHO0FBQ1QsV0FBTyxFQUFQO0FBQ0Q7O0FBMUJxRDs7QUE2QnhELE1BQU1zQyxhQUFOLFNBQTRCakcsS0FBNUIsQ0FBNEQ7QUFNMUQ7OztBQUdBRixhQUFXLENBQUNRLElBQUQsRUFBa0I7QUFDM0I7QUFEMkIsU0FSN0JvRixJQVE2QixHQVJ0QixNQVFzQjtBQUFBLFNBUDdCakYsUUFPNkIsR0FQbEIsRUFPa0I7QUFBQSxTQU43QkosTUFNNkIsR0FOSixJQU1JO0FBQUEsU0FMN0JDLElBSzZCO0FBRTNCLFNBQUtBLElBQUwsR0FBWUEsSUFBWjtBQUNEOztBQUVEc0QsUUFBTSxHQUFHO0FBQ1AsV0FBTyxLQUFLdEQsSUFBWjtBQUNEOztBQUVEcUYsY0FBWSxDQUFDVCxPQUFELEVBQXlCO0FBQ25DLFFBQUlBLE9BQU8sQ0FBQzVFLElBQVIsS0FBaUIsS0FBS0EsSUFBMUIsRUFBZ0M7QUFDOUIsV0FBS0EsSUFBTCxDQUFVZ0ksV0FBVixDQUFzQnBELE9BQU8sQ0FBQzVFLElBQTlCO0FBQ0Q7QUFDRjs7QUFFRG1GLGVBQWEsR0FBRztBQUNkLFNBQUtuRixJQUFMLENBQVU2SCxhQUFWLENBQXlCQyxXQUF6QixDQUFxQyxLQUFLOUgsSUFBMUM7QUFDRDs7QUFFRHFELFVBQVEsR0FBRztBQUNULFdBQU96QixZQUFZLENBQUMsS0FBSzVCLElBQU4sQ0FBbkI7QUFDRDs7QUE5QnlEOztBQWlDNUQsTUFBTW1ILFNBQU4sU0FBd0J6SCxLQUF4QixDQUF3RDtBQUt0RDs7O0FBR0FGLGFBQVcsQ0FBQzJELE9BQUQsRUFBVXFELE9BQVYsRUFBNEI7QUFDckM7QUFEcUMsU0FQdkNwQixJQU91QyxHQVBoQyxNQU9nQztBQUFBLFNBTnZDckYsTUFNdUMsR0FOOUIsSUFNOEI7QUFBQSxTQUx2Q0MsSUFLdUM7QUFBQSxTQUp2Q0csUUFJdUM7QUFFckNnRCxXQUFPLENBQUNwRCxNQUFSLEdBQWlCLElBQWpCO0FBQ0EsU0FBS0ksUUFBTCxHQUFnQixDQUFDZ0QsT0FBRCxDQUFoQjtBQUNBLFNBQUtuRCxJQUFMLEdBQVl3RyxPQUFaO0FBQ0Q7O0FBRURsRCxRQUFNLEdBQUc7QUFDUCxXQUFPLEtBQUtuRCxRQUFMLENBQWMsQ0FBZCxFQUFpQm1ELE1BQWpCLEVBQVA7QUFDRDs7QUFDREQsVUFBUSxHQUFHO0FBQ1QsV0FBTyxLQUFLbEQsUUFBTCxDQUFjLENBQWQsRUFBaUJrRCxRQUFqQixFQUFQO0FBQ0Q7O0FBRURnQyxjQUFZLENBQUM4QyxRQUFELEVBQTJCO0FBQ3JDckQsd0JBQW9CLENBQUMsSUFBRCxFQUFPcUQsUUFBUCxDQUFwQjtBQUNEOztBQUVEaEQsZUFBYSxHQUFHO0FBQ2QsU0FBS25GLElBQUwsQ0FBVXdJLE1BQVY7QUFDRDs7QUE1QnFELEMsQ0ErQnhEO0FBQ0Esa0Q7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNqd0JBO0FBRUEsSUFBTUMsR0FBRyxHQUFHLDZDQUFaLEMsQ0FBMkQ7O0FBRTNELFNBQVNDLEdBQVQsQ0FBYWpKLEtBQWIsRUFHRztBQUNESSxTQUFPLENBQUNDLEdBQVIsQ0FBWSxTQUFaLEVBQXVCTCxLQUFLLENBQUMsVUFBRCxDQUE1QjtBQUNBLFNBQ0U7QUFBRyxPQUFHLEVBQUUsYUFBQzZDLEVBQUQ7QUFBQSxhQUFxQnpDLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLG1CQUFaLEVBQWlDd0MsRUFBakMsQ0FBckI7QUFBQSxLQUFSO0FBQUEsY0FDRzdDLEtBQUssQ0FBQ2tKO0FBRFQsSUFERjtBQUtEOztBQUVELFNBQVNDLE1BQVQsT0FPRztBQUFBLE1BTkR6SSxRQU1DLFFBTkRBLFFBTUM7QUFBQSxNQUxEMEksUUFLQyxRQUxEQSxRQUtDO0FBQ0QsU0FDRTtBQUNFLFlBQVEsRUFBRUEsUUFEWjtBQUVFLE9BQUcsRUFBRSxhQUFDdkcsRUFBRDtBQUFBLGFBQXFCekMsT0FBTyxDQUFDQyxHQUFSLENBQVksb0JBQVosRUFBa0N3QyxFQUFsQyxDQUFyQjtBQUFBLEtBRlA7QUFBQSxlQUlFO0FBQU0sU0FBRyxFQUFFLGFBQUNBLEVBQUQ7QUFBQSxlQUFxQnpDLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLGVBQVosRUFBNkJ3QyxFQUE3QixDQUFyQjtBQUFBLE9BQVg7QUFBQTtBQUFBLE1BSkYsRUFPR25DLFFBUEgsRUFRRTtBQUFBLGdCQUNFO0FBQU0sV0FBRyxFQUFFLGFBQUNtQyxFQUFEO0FBQUEsaUJBQXFCekMsT0FBTyxDQUFDQyxHQUFSLENBQVksZUFBWixFQUE2QndDLEVBQTdCLENBQXJCO0FBQUEsU0FBWDtBQUFBO0FBQUE7QUFERixNQVJGO0FBQUEsSUFERjtBQWdCRDs7QUFFRCxTQUFTd0csTUFBVCxDQUFnQnhHLEVBQWhCLEVBQWlDO0FBQy9CekMsU0FBTyxDQUFDQyxHQUFSLENBQVksc0JBQVosRUFBb0N3QyxFQUFwQztBQUNEO0FBRUQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQWdEQTs7Ozs7OztBQU1BOzs7Ozs7Ozs7Ozs7QUFXQTs7Ozs7Ozs7Ozs7QUFVQSxTQUFTeUcsSUFBVCxRQUF1QztBQUFBLE1BQXZCQyxJQUF1QixTQUF2QkEsSUFBdUI7QUFDckMsU0FBT0EsSUFBSSxLQUFLLENBQVQsR0FDTDtBQUFBLGVBQ0U7QUFBTSxRQUFFLEVBQUMsT0FBVDtBQUFpQixTQUFHLEVBQUUsSUFBdEI7QUFBQTtBQUFBLE1BREYsRUFJRTtBQUFBO0FBQUEsTUFKRjtBQUFBLElBREssR0FRTDtBQUFBLGNBQ0U7QUFBRyxRQUFFLEVBQUMsT0FBTjtBQUFjLGFBQUssSUFBbkI7QUFBQTtBQUFBO0FBREYsSUFSRjtBQWNEOztBQUVELFNBQVNDLElBQVQsUUFBdUI7QUFBQSxNQUFQQyxHQUFPLFNBQVBBLEdBQU87QUFDckIsTUFBSUEsR0FBRyxLQUFLLENBQVosRUFBZSxPQUFPLElBQVA7QUFDZixTQUNFO0FBQUEsY0FDRTtBQUFBO0FBQUE7QUFERixJQURGO0FBS0Q7O0FBRUQsSUFBTUMsT0FBTyxHQUFHLFNBQVZBLE9BQVUsQ0FBQ0QsR0FBRDtBQUFBLFNBQ2Q7QUFBSyxNQUFFLEVBQUMsT0FBUjtBQUFnQixnQkFBUyxLQUF6QjtBQUErQixnQkFBVUEsR0FBekM7QUFBQSxlQUNFO0FBQUE7QUFBQSxNQURGLEVBRUdBLEdBQUcsS0FBSyxDQUFSLEdBQ0M7QUFBSSxlQUFNLFVBQVY7QUFBQSxpQkFDRTtBQUFBO0FBQUEsUUFERixFQUVFO0FBQUE7QUFBQSxRQUZGO0FBQUEsTUFERCxHQU1DO0FBQUksZUFBTSxVQUFWO0FBQUEsaUJBQ0U7QUFBQTtBQUFBLFFBREYsRUFFRTtBQUFBO0FBQUEsUUFGRixFQUdFO0FBQUE7QUFBQSxRQUhGO0FBQUEsTUFSSixFQWNFO0FBQUE7QUFBQSxNQWRGLEVBZUdBLEdBQUcsS0FBSyxDQUFSLEdBQ0M7QUFBSSxlQUFNLFVBQVY7QUFBQSxpQkFDRTtBQUFBO0FBQUEsUUFERixFQUVFO0FBQUE7QUFBQSxRQUZGLEVBR0U7QUFBQTtBQUFBLFFBSEY7QUFBQSxNQURELEdBT0M7QUFBSSxlQUFNLFVBQVY7QUFBQSxpQkFDRTtBQUFBO0FBQUEsUUFERixFQUVFO0FBQUE7QUFBQSxRQUZGO0FBQUEsTUF0QkosRUEyQkdBLEdBQUcsS0FBSyxDQUFSLEdBQVksSUFBWixHQUFtQjtBQUFBO0FBQUEsTUEzQnRCLEVBNEJFO0FBQUEsZ0JBQ0U7QUFBQTtBQUFBO0FBREYsTUE1QkYsRUErQkUsaUZBQUMsSUFBRDtBQUFNLFVBQUksRUFBRUE7QUFBWixNQS9CRixFQWlDRTtBQUFBO0FBQUEsTUFqQ0YsRUFrQ0U7QUFDRSxhQUFPLEVBQUMsYUFEVjtBQUVFLFdBQUssRUFBQyw0QkFGUjtBQUdFLFlBQU0sRUFBQyxLQUhUO0FBSUUsVUFBSSxFQUFDLE1BSlA7QUFBQSxpQkFNRTtBQUFRLFVBQUUsRUFBQyxJQUFYO0FBQWdCLFVBQUUsRUFBQyxJQUFuQjtBQUF3QixTQUFDLEVBQUM7QUFBMUIsUUFORixFQU9FO0FBQVEsVUFBRSxFQUFDLEtBQVg7QUFBaUIsVUFBRSxFQUFDLElBQXBCO0FBQXlCLFNBQUMsRUFBQztBQUEzQixRQVBGLEVBU0U7QUFBSyxlQUFPLEVBQUMsV0FBYjtBQUF5QixTQUFDLEVBQUMsS0FBM0I7QUFBaUMsYUFBSyxFQUFDLEtBQXZDO0FBQUEsa0JBQ0U7QUFBUSxZQUFFLEVBQUMsR0FBWDtBQUFlLFlBQUUsRUFBQyxHQUFsQjtBQUFzQixXQUFDLEVBQUM7QUFBeEI7QUFERixRQVRGO0FBQUEsTUFsQ0Y7QUFBQSxJQURjO0FBQUEsQ0FBaEI7O0FBbURBLFNBQVNFLE9BQVQsQ0FBaUJGLEdBQWpCLEVBQTJCO0FBQ3pCLFNBQ0U7QUFBSyxNQUFFLEVBQUMsT0FBUjtBQUFBLGVBQ0U7QUFBQSxnQkFDRTtBQUFBLGtCQUNFO0FBQUE7QUFBQTtBQURGO0FBREYsTUFERixFQU1FO0FBQUE7QUFBQSxNQU5GLEVBT0U7QUFBQSxrQ0FBa0JBLEdBQWxCO0FBQUEsTUFQRixFQVFHQSxHQUFHLEtBQUssQ0FBUixHQUFZO0FBQUE7QUFBQSxNQUFaLEdBQTJCLEtBUjlCLEVBU0dBLEdBQUcsS0FBSyxDQUFSLEdBQ0M7QUFBQSxpQkFDRTtBQUFBO0FBQUEsUUFERixFQUVFO0FBQUE7QUFBQSxRQUZGO0FBQUEsTUFERCxHQU1DO0FBQUE7QUFBQSxNQWZKLEVBaUJFLGlGQUFDLElBQUQ7QUFBTSxTQUFHLEVBQUVBO0FBQVgsTUFqQkY7QUFBQSxJQURGO0FBcUJEOztBQUNELFNBQVNHLEVBQVQsR0FBYztBQUNaLFNBQU8sSUFBUDtBQUNEOztBQUVELFNBQVNDLE9BQVQsQ0FBaUJKLEdBQWpCLEVBQTJCO0FBQ3pCLFNBQU9BLEdBQUcsS0FBSyxDQUFSLEdBQ0w7QUFBQSw4QkFDY0EsR0FEZCxFQUVFLGlGQUFDLElBQUQ7QUFBTSxVQUFJLEVBQUVBO0FBQVosTUFGRixFQUdFLGtGQUFDLE1BQUQ7QUFDRSxjQUFRLEVBQUUsSUFEWjtBQUVFLFNBQUcsRUFBRSxhQUFDNUcsRUFBRDtBQUFBLGVBQXFCekMsT0FBTyxDQUFDQyxHQUFSLENBQVksbUJBQVosRUFBaUN3QyxFQUFqQyxDQUFyQjtBQUFBLE9BRlA7QUFBQSx5QkFLRTtBQUNFLFdBQUcsRUFBRSxhQUFDQSxFQUFEO0FBQUEsaUJBQXFCekMsT0FBTyxDQUFDQyxHQUFSLENBQVksd0JBQVosRUFBc0N3QyxFQUF0QyxDQUFyQjtBQUFBLFNBRFA7QUFBQTtBQUFBLFFBTEYsRUFVRTtBQUFBLCtCQUFZNEcsR0FBWjtBQUFBLFFBVkY7QUFBQSxNQUhGLGNBZ0JFO0FBQUEsaUJBQ0U7QUFBQSxrQkFDRTtBQUFBO0FBQUE7QUFERixRQURGLEVBSUU7QUFBQTtBQUFBLFFBSkYsRUFLRTtBQUFBO0FBQUEsUUFMRixFQU1FO0FBQUE7QUFBQSxRQU5GLEVBT0U7QUFDRSxlQUFPLEVBQUMsYUFEVjtBQUVFLGFBQUssRUFBQyw0QkFGUjtBQUdFLGNBQU0sRUFBQyxLQUhUO0FBSUUsWUFBSSxFQUFDLE1BSlA7QUFBQSxtQkFNRTtBQUFRLFlBQUUsRUFBQyxJQUFYO0FBQWdCLFlBQUUsRUFBQyxJQUFuQjtBQUF3QixXQUFDLEVBQUM7QUFBMUIsVUFORixFQU9FO0FBQVEsWUFBRSxFQUFDLEtBQVg7QUFBaUIsWUFBRSxFQUFDLElBQXBCO0FBQXlCLFdBQUMsRUFBQztBQUEzQixVQVBGLEVBU0U7QUFBSyxpQkFBTyxFQUFDLFdBQWI7QUFBeUIsV0FBQyxFQUFDLEtBQTNCO0FBQWlDLGVBQUssRUFBQyxLQUF2QztBQUFBLG9CQUNFO0FBQVEsY0FBRSxFQUFDLEdBQVg7QUFBZSxjQUFFLEVBQUMsR0FBbEI7QUFBc0IsYUFBQyxFQUFDO0FBQXhCO0FBREYsVUFURjtBQUFBLFFBUEY7QUFBQSxNQWhCRixFQXFDRyxJQXJDSDtBQUFBLElBREssR0F5Q0w7QUFBSSxhQUFNLEdBQVY7QUFBQSw4QkFDY0EsR0FEZCxFQUVFLGlGQUFDLElBQUQ7QUFBTSxVQUFJLEVBQUVBO0FBQVosTUFGRixFQUdFLGtGQUFDLE1BQUQ7QUFDRSxjQUFRLEVBQUUsSUFEWjtBQUVFLFNBQUcsRUFBRSxhQUFDNUcsRUFBRDtBQUFBLGVBQXFCekMsT0FBTyxDQUFDQyxHQUFSLENBQVksbUJBQVosRUFBaUN3QyxFQUFqQyxDQUFyQjtBQUFBLE9BRlA7QUFBQSx5QkFLRTtBQUNFLFdBQUcsRUFBRSxhQUFDQSxFQUFEO0FBQUEsaUJBQXFCekMsT0FBTyxDQUFDQyxHQUFSLENBQVksd0JBQVosRUFBc0N3QyxFQUF0QyxDQUFyQjtBQUFBLFNBRFA7QUFBQTtBQUFBLFFBTEYsRUFVRTtBQUFBLGtCQUFJNEc7QUFBSixRQVZGO0FBQUEsTUFIRixFQWVFO0FBQUEsaUJBQ0csS0FESCxFQUVHLElBRkgsRUFHRzlILFNBSEg7QUFBQSxNQWZGLEVBb0JFO0FBQUEsaUJBQ0U7QUFBQTtBQUFBLFFBREYsRUFFRTtBQUFBO0FBQUEsUUFGRixFQUdHQSxTQUhILEVBSUU7QUFBQTtBQUFBLFFBSkYsRUFLRTtBQUNFLGVBQU8sRUFBQyxhQURWO0FBRUUsYUFBSyxFQUFDLDRCQUZSO0FBR0UsY0FBTSxFQUFDLEtBSFQ7QUFJRSxZQUFJLEVBQUMsTUFKUDtBQUFBLG1CQU1FO0FBQVEsWUFBRSxFQUFDLElBQVg7QUFBZ0IsWUFBRSxFQUFDLElBQW5CO0FBQXdCLFdBQUMsRUFBQztBQUExQixVQU5GLEVBT0U7QUFBUSxZQUFFLEVBQUMsS0FBWDtBQUFpQixZQUFFLEVBQUMsSUFBcEI7QUFBeUIsV0FBQyxFQUFDO0FBQTNCLFVBUEYsRUFTRTtBQUFLLGlCQUFPLEVBQUMsV0FBYjtBQUF5QixXQUFDLEVBQUMsS0FBM0I7QUFBaUMsZUFBSyxFQUFDLEtBQXZDO0FBQUEsb0JBQ0U7QUFBUSxjQUFFLEVBQUMsR0FBWDtBQUFlLGNBQUUsRUFBQyxHQUFsQjtBQUFzQixhQUFDLEVBQUM7QUFBeEI7QUFERixVQVRGO0FBQUEsUUFMRixFQWtCRTtBQUFBO0FBQUEsUUFsQkY7QUFBQSxNQXBCRjtBQUFBLElBekNGO0FBbUZEOztBQUNELElBQU1tSSxHQUFHLEdBQUc7QUFBRUMsR0FBQyxFQUFFO0FBQUwsQ0FBWjs7QUFFQSxTQUFTQyxPQUFULENBQWlCUCxHQUFqQixFQUEyQjtBQUN6QkssS0FBRyxDQUFDQyxDQUFKLEdBQVFOLEdBQVI7QUFDQSxTQUFPQSxHQUFHLEtBQUssQ0FBUixHQUNMO0FBQUksT0FBRyxFQUFFSyxHQUFUO0FBQWMsTUFBRSxFQUFFQSxHQUFHLENBQUNDLENBQXRCO0FBQUEsZ0NBQ2dCTixHQURoQjtBQUFBLElBREssR0FLTDtBQUFJLE9BQUcsRUFBRUssR0FBVDtBQUFjLGFBQU0sR0FBcEI7QUFBd0IsTUFBRSxFQUFFQSxHQUFHLENBQUNDLENBQWhDO0FBQUEsZ0NBQ2dCTixHQURoQjtBQUFBLElBTEY7QUFTRDs7QUFFRCxTQUFTM0MsTUFBVCxDQUFnQjJDLEdBQWhCLEVBQTBCO0FBQ3hCLFNBQU9BLEdBQUcsS0FBSyxDQUFSLEdBQ0w7QUFBQSxjQUNFO0FBQUEsaUJBQ0U7QUFBQTtBQUFBLFFBREYsRUFFRTtBQUFBO0FBQUEsUUFGRjtBQUFBO0FBREYsSUFESyxHQVFMO0FBQUksYUFBTSxHQUFWO0FBQUEsZUFDRyxjQURILE9BQ29CQSxHQURwQjtBQUFBLElBUkY7QUFZRCxDLENBRUQ7QUFDQTs7O0lBRU1RLFM7Ozs7O0FBQ0osdUJBQWM7QUFBQTs7QUFBQTs7QUFDWjtBQUNBLDhCQUZZLENBSVo7O0FBRUE3SixXQUFPLENBQUNDLEdBQVIsQ0FBWSwwQkFBWjtBQU5ZO0FBT2I7Ozs7d0NBRW1CO0FBQ2xCRCxhQUFPLENBQUNDLEdBQVIsQ0FBWSx1REFBWjtBQUNEOzs7O2lDQVpxQjZKLFc7O0FBZXhCQyxjQUFjLENBQUNDLE1BQWYsQ0FBc0IsWUFBdEIsRUFBb0NILFNBQXBDLEUsQ0FFQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTs7QUFDQSxJQUFNcEgsRUFBRSxHQUFHZCxRQUFRLENBQUNzSSxhQUFULENBQXVCLE1BQXZCLENBQVg7O0FBQ0EsU0FBU0MsS0FBVCxHQUFpQjtBQUNmLFNBQ0U7QUFBQSxlQUNFLGlGQUFDLEtBQUQsS0FERixFQUVHekgsRUFGSDtBQUFBLElBREY7QUFNRDs7QUFDRCxTQUFTMEgsS0FBVCxHQUFpQjtBQUNmLFNBQU87QUFBQTtBQUFBLElBQVA7QUFDRDs7QUFFREMsTUFBTSxDQUFDQyxTQUFQLEdBQW1CO0FBQUEsU0FDakI1RCxtRkFBTSxDQUFDZ0QsT0FBTyxDQUFDLENBQUQsQ0FBUixFQUFhOUgsUUFBUSxDQUFDMkksY0FBVCxDQUF3QixXQUF4QixDQUFiLENBRFc7QUFBQSxDQUFuQjs7QUFFQUYsTUFBTSxDQUFDRyxTQUFQLEdBQW1CO0FBQUEsU0FDakI5RCxtRkFBTSxDQUFDZ0QsT0FBTyxDQUFDLENBQUQsQ0FBUixFQUFhOUgsUUFBUSxDQUFDMkksY0FBVCxDQUF3QixXQUF4QixDQUFiLENBRFc7QUFBQSxDQUFuQjs7QUFFQUYsTUFBTSxDQUFDSSxTQUFQLEdBQW1CO0FBQUEsU0FDakIvRCxtRkFBTSxFQUNKO0FBQ0EsbUZBQUMsS0FBRCxLQUZJLEVBR0o5RSxRQUFRLENBQUMySSxjQUFULENBQXdCLFdBQXhCLENBSEksQ0FEVztBQUFBLENBQW5COztBQU9BdEssT0FBTyxDQUFDQyxHQUFSLENBQVksT0FBWjs7QUFDQW1LLE1BQU0sQ0FBQ0ssRUFBUCxHQUFZO0FBQUEsU0FBTWhCLE9BQU8sQ0FBQyxDQUFELENBQVAsR0FBYSxFQUFuQjtBQUFBLENBQVo7O0FBQ0FXLE1BQU0sQ0FBQ00sR0FBUCxHQUFhLFlBQU07QUFDakIxSyxTQUFPLENBQUNDLEdBQVIsQ0FBWXdKLE9BQU8sQ0FBQyxDQUFELENBQW5CLEVBRGlCLENBR2pCO0FBQ0QsQ0FKRCxDIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMCk7XG4iLCJjb25zdCByZW5kZXJlZFZUcmVlcyA9IG5ldyBXZWFrTWFwPEhUTUxFbGVtZW50LCBSb290Vk5vZGU+KCk7XHJcbmNvbnN0IHJlZnNUb0NhbGw6IEZ1bmN0aW9uW10gPSBbXTtcclxuXHJcbi8qKlxyXG4gKiBwcm92aWRlcyBmdW5jdGlvbnMgbmVlZGVkIGJ5IGJhYmVsIGZvciBhIGN1c3RvbSBwcmFnbWFcclxuICogdG8gcmVuZGVyIHBhcnNlZCBqc3ggY29kZSB0byBodG1sXHJcbiAqL1xyXG5cclxuLy8gcHJvcHMgd2hpY2ggd2lsbCBiZSByZW5kZXJlZCBhcyBhdHRyaWJ1dGVzXHJcbi8vIEZ1bmN0aW9ucyB3aWxsIGJlIHVzZWQgZm9yIGV2ZW50IGxpc3RlbmVycy4gKHdpdGggYXR0cmlidXRlIG5hbWUgc3RhcnRpbmcgd2l0aCAnb24tJylcclxudHlwZSBBdHRyaWJ1dGVzID0geyBba2V5OiBzdHJpbmddOiBzdHJpbmcgfCBib29sZWFuIHwgbnVtYmVyIHwgRnVuY3Rpb24gfTtcclxuXHJcbi8vIGFkZGl0aW9uYWwgYXR0cmlidXRlcyB3aGljaCBjYW4gaGF2ZSBhZGRpdGlvbmFsIHNlcmlhbGl6YXRpb24gYmVmb3JlIHJlbmRlcmluZyBhcyBhdHRyaWJ1dGVzXHJcbnR5cGUgU3BlY2lhbEF0dHJpYnV0ZXMgPSB7XHJcbiAgY2xhc3M/OiBzdHJpbmcgfCBzdHJpbmdbXTtcclxuICBzdHlsZT86IHN0cmluZyB8IHsgW2tleTogc3RyaW5nXTogc3RyaW5nIH07XHJcbiAgcmVmPzogRnVuY3Rpb247XHJcbn07XHJcblxyXG4vLyBjaGlsZCBlbGVtZW50cyBpbiB0aGUganN4IG1hcmt1cCB3aGljaCB3aWxsIGJlIHBhc3NlZCB0byB0aGUgaCBmdW5jdGlvbiBhcyBgcHJvcHMuY2hpbGRyZW5gXHJcbnR5cGUgQ2hpbGRyZW5Qcm9wcyA9IHtcclxuICAvLyBuZXN0ZWQgYXJyYXkgaW4gY2FzZSBvZlxyXG4gIC8vIDxlbGVtPlxyXG4gIC8vICAgPHNwYW4vPlxyXG4gIC8vICAge2NoaWxkcmVufVxyXG4gIC8vICAgPGRpdi8+XHJcbiAgLy8gPC9lbGVtPlxyXG4gIGNoaWxkcmVuOiBBcnJheTxcclxuICAgIE5vZGUgfCBKc3hOb2RlSW50ZXJmYWNlIHwgc3RyaW5nIHwgQXJyYXk8Tm9kZSB8IEpzeE5vZGVJbnRlcmZhY2UgfCBzdHJpbmc+XHJcbiAgPjtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBwcm9wcyBvYmplY3Qgd2hpY2ggd2lsbCBiZSBwYXNzZWQgdG8ganN4IHByYWdtYSBhbmQgY3VzdG9tIGNvbXBvbmVudCBmdW5jdGlvbnNcclxuICovXHJcbnR5cGUgSnN4UHJvcHMgPSBBdHRyaWJ1dGVzICYgU3BlY2lhbEF0dHJpYnV0ZXMgJiBDaGlsZHJlblByb3BzO1xyXG5cclxuLy8gYmFzZSBjbGFzcyB3aGljaCB3aWxsIGJlIGluaGVyaXRlZCBmcm9tIGpzeCBhbmQgZnJhZ21lbnRzIGZ1bmN0aW9uIG5vZGUgZ2VuZXJhdGlvblxyXG4vLyBhbmQgd2lsbCBiZSB1c2VkIHRvIGRpc3Rpbmd1aXNoIHRoZW0gd2l0aCBvdGhlciBFbGVtZW50c1xyXG5jbGFzcyBKc3hOb2RlIHtcclxuICBwcm9wczogSnN4UHJvcHM7XHJcbiAgY29uc3RydWN0b3IocHJvcHM6IEpzeFByb3BzKSB7XHJcbiAgICB0aGlzLnByb3BzID0gcHJvcHM7XHJcbiAgfVxyXG59XHJcblxyXG5jbGFzcyBWTm9kZSB7fVxyXG5cclxuLy8gbnVsbCB3aGVuIGNoZWNraW5nIHRoZSBwYXJlbnQgd2hlbiByb290IGlzIGZyYWdtZW50IGl0c2VsZlxyXG5mdW5jdGlvbiBnZXRQYXJlbnRFbGVtZW50Tm9kZSh2Tm9kZTogVk5vZGVJbnRlcmZhY2UpOiBFbGVtZW50Vk5vZGUge1xyXG4gIGNvbnNvbGUubG9nKFwiZ2V0UGFyZW50RWxlbWVudE5vZGVcIiwgdk5vZGUpO1xyXG5cclxuICB3aGlsZSAodk5vZGUucGFyZW50KSB7XHJcbiAgICB2Tm9kZSA9IHZOb2RlLnBhcmVudDtcclxuICAgIC8vIGAubm9kZWAgaXMgb25seSBvbiBcIlRleHRcIiBhbmQgXCJFbGVtZW50XCIgdHlwZSBWTm9kZSwgYW5kIG9ubHkgRWxlbWVudCBoYXMgY2hpbGRyZW5cclxuICAgIGlmICh2Tm9kZS5ub2RlKSBicmVhaztcclxuICB9XHJcblxyXG4gIGNvbnNvbGUubG9nKFwiZm91bmQ6IFwiLCB2Tm9kZSk7XHJcblxyXG4gIHJldHVybiAodk5vZGUgYXMgdW5rbm93bikgYXMgRWxlbWVudFZOb2RlO1xyXG59XHJcblxyXG5mdW5jdGlvbiBnZXRDaGlsZHJlbldpdGhOb2RlcyhcclxuICB2Tm9kZTogVk5vZGVJbnRlcmZhY2UsXHJcbiAgYWx3YXlzQWxsb3c/OiBWTm9kZUludGVyZmFjZVxyXG4pOiBWTm9kZUludGVyZmFjZVtdIHtcclxuICB2Tm9kZS5jaGlsZHJlbjtcclxuICByZXR1cm4gdk5vZGUuY2hpbGRyZW5cclxuICAgIC5tYXAoKGNoaWxkTm9kZSkgPT4ge1xyXG4gICAgICBpZiAoY2hpbGROb2RlID09PSBhbHdheXNBbGxvdykgcmV0dXJuIGNoaWxkTm9kZTtcclxuICAgICAgaWYgKGNoaWxkTm9kZS5ub2RlKSByZXR1cm4gY2hpbGROb2RlO1xyXG4gICAgICByZXR1cm4gZ2V0Q2hpbGRyZW5XaXRoTm9kZXMoY2hpbGROb2RlLCBhbHdheXNBbGxvdyk7XHJcbiAgICB9KVxyXG4gICAgLmZsYXQoSW5maW5pdHkpIGFzIFZOb2RlSW50ZXJmYWNlW107XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdldFBhcmVudEFuZE5leHRTaWJsaW5nKHZOb2RlOiBWTm9kZUludGVyZmFjZSk6IFtOb2RlLCBOb2RlIHwgbnVsbF0ge1xyXG4gIC8vIG5vZGUgYW5jZXN0b3Igd2l0aCBFbGVtZW50LFxyXG4gIGNvbnN0IHBhcmVudFdpdGhFbGVtZW50ID0gZ2V0UGFyZW50RWxlbWVudE5vZGUodk5vZGUpO1xyXG4gIGNvbnN0IHNpYmxpbmdzID0gZ2V0Q2hpbGRyZW5XaXRoTm9kZXMocGFyZW50V2l0aEVsZW1lbnQsIHZOb2RlKTtcclxuICBjb25zdCBwcmV2U2libGluZyA9IHNpYmxpbmdzW3NpYmxpbmdzLmluZGV4T2Yodk5vZGUpIC0gMV07XHJcbiAgY29uc3QgbmV4dFNpYmxpbmdOb2RlID0gcHJldlNpYmxpbmcgPyBwcmV2U2libGluZy5ub2RlIS5uZXh0U2libGluZyA6IG51bGw7XHJcblxyXG4gIHJldHVybiBbcGFyZW50V2l0aEVsZW1lbnQubm9kZSwgbmV4dFNpYmxpbmdOb2RlXTtcclxufVxyXG5cclxuLy8gcHJpdmF0ZSBrZXkgZm9yIGNhbGxpbmcgdGhlIGByZWZgIGNhbGxlcnNcclxuY29uc3QgX2NhbGxSZWZzID0gU3ltYm9sKFwiY2FsbFJlZnNcIik7XHJcblxyXG4vLyB0aGUgY3VycmVudCBtYXJrdXAgd2hpY2ggaXMgcmVuZGVyZWQgaXMgbmVzdGVkIGluIGFuIHN2ZyBlbGVtZW50XHJcbmxldCBzdmdDb250ZXh0ID0gZmFsc2U7XHJcblxyXG4vLyBqc3ggYW5kIEZyYWdtZW50IHdpbGwgcmV0dXJuIG9iamVjdHMgd2hpY2ggaW1wbGVtZW50IHRoaXMgaW50ZXJmYWNlXHJcbmV4cG9ydCBpbnRlcmZhY2UgSnN4Tm9kZUludGVyZmFjZSBleHRlbmRzIEpzeE5vZGUge1xyXG4gIHRvU3RyaW5nKCk6IHN0cmluZztcclxuICBhc05vZGUoKTogTm9kZTtcclxuICBhc1ZOb2RlKCk6IFZOb2RlO1xyXG4gIFtfY2FsbFJlZnNdKCk6IHZvaWQ7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiByZXR1cm5zIHRydWUgaWYgbm90IG51bGxpc2ggb3IgZmFsc2VcclxuICogdGhhdCBtZWFucyAwIG9yIGVtcHR5IHN0cmluZyBhcmUgYWxsb3dlZFxyXG4gKiBAcGFyYW0geyp9IHZhbFxyXG4gKi9cclxuZnVuY3Rpb24gdHJ1dGh5KHZhbHVlOiBhbnkpOiBib29sZWFuIHtcclxuICByZXR1cm4gdmFsdWUgIT09IGZhbHNlICYmIHZhbHVlICE9PSBudWxsICYmIHZhbHVlICE9PSB1bmRlZmluZWQ7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBlc2NhcGVzIHRoZSBwcm92aWRlZCBzdHJpbmcgYWdhaW5zdCB4c3MgYXR0YWNrcyBldGNcclxuICpcclxuICogQHBhcmFtIHtzdHJpbmd9IHRleHRcclxuICogQHJldHVybnMge3N0cmluZ31cclxuICovXHJcbmZ1bmN0aW9uIHNhbml0aXplKHRleHQ6IHN0cmluZyk6IHN0cmluZyB7XHJcbiAgY29uc3QgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICBkaXYuaW5uZXJUZXh0ID0gdGV4dDtcclxuICByZXR1cm4gZGl2LmlubmVySFRNTDtcclxufVxyXG5cclxuLyoqXHJcbiAqIGJhc2ljYWxseSBgRWxlbWVudC5vdXRlckhUTUxgIGJ1dCBhbHNvIHN1cHBvcnRzIFRleHQgbm9kZSBhbmQgRG9jdW1lbnRGcmFnbWVudFxyXG4gKiBAcGFyYW0gZWxlbWVudCB7Tm9kZX0gLSBlbGVtZW50IHdoaWNoIGl0cyBodG1sIG5lZWRzIHRvIGJlIHJldHVybmVkXHJcbiAqL1xyXG5mdW5jdGlvbiBnZXRPdXRlckh0bWwoZWxlbWVudDogTm9kZSk6IHN0cmluZyB7XHJcbiAgaWYgKGVsZW1lbnQgaW5zdGFuY2VvZiBFbGVtZW50KSByZXR1cm4gZWxlbWVudC5vdXRlckhUTUw7XHJcbiAgaWYgKGVsZW1lbnQgaW5zdGFuY2VvZiBUZXh0KSByZXR1cm4gc2FuaXRpemUoZWxlbWVudC53aG9sZVRleHQpO1xyXG4gIGlmIChlbGVtZW50IGluc3RhbmNlb2YgRG9jdW1lbnRGcmFnbWVudClcclxuICAgIHJldHVybiBBcnJheS5mcm9tKGVsZW1lbnQuY2hpbGROb2RlcylcclxuICAgICAgLm1hcCgoZWwpID0+IGdldE91dGVySHRtbChlbCkpXHJcbiAgICAgIC5qb2luKFwiXCIpO1xyXG5cclxuICAvLyBzaG91bGRuJ3QgcmVhY2ggdGhpcyBwb2ludFxyXG4gIGNvbnNvbGUud2FybihcImdldE91dGVySHRtbCBkb2VzIG5vdCBzdXBwb3J0IHRoaXMgdHlwZSBvZiBlbGVtZW50XCIsIGVsZW1lbnQpO1xyXG4gIHJldHVybiBcIlwiO1xyXG59XHJcblxyXG4vKipcclxuICogZ2VuZXJhdGVzIHRoZSBodG1sIGFzIGEgc3RyaW5nIHdoaWNoIGNhbiBiZSB1c2VkIGZvciBleGFtcGxlIHdpdGggYGVsZW1lbnQuaW5uZXJIVE1MKClgXHJcbiAqXHJcbiAqIEBwYXJhbSB0YWcge3N0cmluZ3xGdW5jdGlvbn0gLSB0YWcgYXJndW1lbnQgb2YgdGhlIGpzeCBjYWxsXHJcbiAqIEBwYXJhbSBwcm9wcyB7T2JqZWN0fSAtIHByb3BzIGFyZ3VtZW50IG9mIGpzeCBjYWxsXHJcbiAqL1xyXG5mdW5jdGlvbiBhc0h0bWxTdHJpbmcodGFnOiBzdHJpbmcgfCBGdW5jdGlvbiwgcHJvcHM6IEpzeFByb3BzLCBjaGlsZHJlbikge1xyXG4gIGNvbnN0IGF0dHJpYnV0ZXMgPSBPYmplY3QuZW50cmllcyhwcm9wcylcclxuICAgIC5maWx0ZXIoKFssIHZhbHVlXSkgPT4gdHJ1dGh5KHZhbHVlKSlcclxuICAgIC5tYXAoKFtrZXksIHZhbHVlXSkgPT4ge1xyXG4gICAgICAvLyBlLmcuIGRpc2FibGVkOiB0cnVlID0+IDx0YWcgZGlzYWJsZWQ+XHJcbiAgICAgIGlmICh2YWx1ZSA9PT0gdHJ1ZSkgcmV0dXJuIGtleTtcclxuXHJcbiAgICAgIC8vIGZvciBzdHlsZSBhcyBvYmplY3Q6XHJcbiAgICAgIC8vIChzdHlsZTopIHtkaXNwbGF5OiBcIm5vbmVcIiwgcG9zaXRpb246IFwiYWJzb2x1dGVcIn0gPT0+ICdkaXNwbGF5OiBub25lOyBwb3NpdGlvbjogYWJzb2x1dGU7J1xyXG4gICAgICBpZiAoa2V5ID09PSBcInN0eWxlXCIgJiYgdHlwZW9mIHZhbHVlID09PSBcIm9iamVjdFwiKVxyXG4gICAgICAgIHZhbHVlID0gT2JqZWN0LmVudHJpZXModmFsdWUpXHJcbiAgICAgICAgICAvLyBpZ25vcmUgc3R1ZmYgbGlrZSBge2JhY2tncm91bmQ6IGFjdGl2ZSAmJiBcInJlZFwifWAgd2hlbiBgYWN0aXZlID09PSBmYWxzZSAvIG51bGwgLyB1bmRlZmluZWRgXHJcbiAgICAgICAgICAuZmlsdGVyKChbLCB2XSkgPT4gdHJ1dGh5KHYpKVxyXG4gICAgICAgICAgLy8gY3VycmVudGx5IHN1cHBvcnRzIFwiYmFja2dyb3VuZC1jb2xvclwiIG5vdCBcImJhY2tncm91bmRDb2xvclwiXHJcbiAgICAgICAgICAubWFwKChbaywgdl0pID0+IGAke2t9OiAke3Z9YClcclxuICAgICAgICAgIC5qb2luKFwiOyBcIik7XHJcblxyXG4gICAgICAvLyAoY2xhc3M6KSBbXCJidG5cIiwgXCJyZWRcIl0gPT0+IFwiYnRuIHJlZFwiXHJcbiAgICAgIGlmIChrZXkgPT09IFwiY2xhc3NcIiAmJiBBcnJheS5pc0FycmF5KHZhbHVlKSkgdmFsdWUgPSB2YWx1ZS5qb2luKFwiIFwiKTtcclxuXHJcbiAgICAgIHJldHVybiBgJHtrZXl9PVwiJHt2YWx1ZX1cImA7XHJcbiAgICB9KVxyXG4gICAgLmpvaW4oXCIgXCIpO1xyXG5cclxuICBjb25zdCBjb250ZW50ID0gY2hpbGRyZW4ubWFwKChjaGlsZCkgPT4gY2hpbGQudG9TdHJpbmcoKSkuam9pbihcIlwiKTtcclxuXHJcbiAgcmV0dXJuIGA8JHt0YWd9ICR7YXR0cmlidXRlc30+JHtjb250ZW50fTwvJHt0YWd9PmA7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBnZW5lcmF0ZXMgSFRNTCBOb2RlIGVsZW1lbnRzIGZyb20gdGhlIHByb3ZpZGVkIGpzeCB0cmVlXHJcbiAqIEBwYXJhbSB0YWcge3N0cmluZ3xGdW5jdGlvbn0gLSB0YWcgYXJndW1lbnQgb2YgdGhlIGpzeCBjYWxsXHJcbiAqIEBwYXJhbSBwcm9wcyB7T2JqZWN0fSAtIHByb3BzIGFyZ3VtZW50IG9mIGpzeCBjYWxsXHJcbiAqL1xyXG5mdW5jdGlvbiBhc05vZGUoXHJcbiAgdGFnOiBzdHJpbmcgfCBGdW5jdGlvbiB8IHVuZGVmaW5lZCxcclxuICBwcm9wczogQXR0cmlidXRlcyAmIFNwZWNpYWxBdHRyaWJ1dGVzLCAvL0pzeFByb3BzLFxyXG4gIGNoaWxkcmVuOiBhbnlbXVxyXG4pOiBbTm9kZSwgSnN4Tm9kZUludGVyZmFjZVtdXSB7XHJcbiAgY29uc29sZS5sb2coXCJhc05vZGUoKVwiLCB7IHRhZywgcHJvcHMsIGNoaWxkcmVuIH0pO1xyXG5cclxuICAvLyBmcmFnbWVudFxyXG4gIGlmICghdGFnKSB7XHJcbiAgICBjb25zdCBmcmFnbWVudHMgPSBjaGlsZHJlblxyXG4gICAgICAuZmxhdCgpIC8vID9cclxuICAgICAgLm1hcCgoaXRlbSkgPT4gaXRlbS5hc05vZGUoKSk7XHJcblxyXG4gICAgY29uc3QgZG9jdW1lbnRGcmFnbWVudCA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcclxuXHJcbiAgICBkb2N1bWVudEZyYWdtZW50LmFwcGVuZCguLi5mcmFnbWVudHMpO1xyXG4gICAgcmV0dXJuIFtkb2N1bWVudEZyYWdtZW50LCBbXV07XHJcbiAgfVxyXG5cclxuICAvLyBzaG91bGRuJ3RcclxuICBpZiAodHlwZW9mIHRhZyA9PT0gXCJmdW5jdGlvblwiKSB7XHJcbiAgICBjb25zb2xlLmVycm9yKFwic2hvdWxkbid0IHJlYWNoIHRoaXMgaW4gdlRyZWUgbW9kZVwiKTtcclxuICAgIC8vIGV4cGVjdGluZyB0aGUgdGFnIGZ1bmN0aW9uIHRvIHJldHVybiBqc3guXHJcbiAgICAvLyBoZXJlIGl0IHdpbGwgYWxzbyB3b3JrIHdoZW4gaXQgcmV0dXJucyBIVE1MRWxlbWVudFxyXG4gICAgbGV0IHJlc3VsdCA9IHRhZyhwcm9wcyk7XHJcblxyXG4gICAgbGV0IGpzeE5vZGVzOiBKc3hOb2RlSW50ZXJmYWNlW10gPSBbXTtcclxuXHJcbiAgICBpZiAocmVzdWx0IGluc3RhbmNlb2YgVk5vZGUpIHtcclxuICAgICAganN4Tm9kZXMgPSBbcmVzdWx0IGFzIEpzeE5vZGVJbnRlcmZhY2VdO1xyXG4gICAgICByZXN1bHQgPSAocmVzdWx0IGFzIEpzeE5vZGVJbnRlcmZhY2UpLmFzTm9kZSgpO1xyXG4gICAgICBPYmplY3QuZW50cmllcyhwcm9wcykuZm9yRWFjaCgoW2tleSwgdmFsdWVdKSA9PiB7XHJcbiAgICAgICAgaWYgKFxyXG4gICAgICAgICAga2V5LnN0YXJ0c1dpdGgoXCJvbi1cIikgJiZcclxuICAgICAgICAgICh0eXBlb2YgdmFsdWUgPT09IFwiZnVuY3Rpb25cIiB8fCB0eXBlb2YgdmFsdWUgPT09IFwib2JqZWN0XCIpXHJcbiAgICAgICAgKSB7XHJcbiAgICAgICAgICAvLyByZW1vdmUgbGVhZGluZyBcIm9uLVwiXCJcclxuICAgICAgICAgIGNvbnN0IGV2ZW50ID0ga2V5LnJlcGxhY2UoL15vbi0vLCBcIlwiKTtcclxuXHJcbiAgICAgICAgICByZXN1bHQuYWRkRXZlbnRMaXN0ZW5lcihcclxuICAgICAgICAgICAgZXZlbnQsXHJcbiAgICAgICAgICAgIHZhbHVlIGFzIEV2ZW50TGlzdGVuZXJPckV2ZW50TGlzdGVuZXJPYmplY3RcclxuICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gW3Jlc3VsdCwganN4Tm9kZXNdO1xyXG4gIH1cclxuXHJcbiAgY29uc3QgeyAuLi5hdHRycyB9ID0gcHJvcHM7XHJcbiAgLy8gcmVtZW1iZXIgaWYgdGhlIHN2ZyBjb250ZXh0IHdhcyBzZXQgZm9yIHRoaXMgbm9kZSwgYW5kIHJlcGxhY2UgYWZ0ZXIgZ2VuZXJhdGluZyBhbGwgY2hpbGRyZW5cclxuICBsZXQgc3ZnQ29udGV4dFNldCA9IGZhbHNlO1xyXG5cclxuICAvLyBzZXQgdGhlIGNvbnRleHQgb2YgbWFya3VwIHdoaWNoIGlzIHJlbmRlcmVkIGFzIFNWRyAob3IgaXRzIGNoaWxkcmVuKVxyXG4gIC8vIG5vIG5lZWQgZm9yIHJlLXNldHRpbmcgdGhlIGNvbnRleHQgZm9yIG5lc3RlZCBTVkdzXHJcbiAgaWYgKCFzdmdDb250ZXh0ICYmIHRhZyA9PT0gXCJzdmdcIikge1xyXG4gICAgc3ZnQ29udGV4dCA9IHRydWU7XHJcbiAgICBzdmdDb250ZXh0U2V0ID0gdHJ1ZTtcclxuICB9XHJcblxyXG4gIC8vIGN1cnJlbnRseSBub3Qgc3VwcG9ydGluZyB0aGUgYGlzYCBvcHRpb24gZm9yIEN1c3RvbWl6ZWQgYnVpbHQtaW4gZWxlbWVudHNcclxuICBjb25zdCBub2RlID0gc3ZnQ29udGV4dFxyXG4gICAgPyBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoXCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiLCB0YWcpXHJcbiAgICA6IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodGFnKTtcclxuXHJcbiAgT2JqZWN0LmVudHJpZXMoYXR0cnMpXHJcbiAgICAuZmlsdGVyKChbX2tleSwgdmFsdWVdKSA9PiB0cnV0aHkodmFsdWUpKVxyXG4gICAgLmZvckVhY2goKFtrZXksIHZhbHVlXSkgPT4ge1xyXG4gICAgICAvLyBmb3Igc3R5bGUgYXMgb2JqZWN0OlxyXG4gICAgICAvLyAoc3R5bGU6KSB7ZGlzcGxheTogXCJub25lXCIsIHBvc2l0aW9uOiBcImFic29sdXRlXCJ9ID09PiAnZGlzcGxheTogbm9uZTsgcG9zaXRpb246IGFic29sdXRlOydcclxuICAgICAgaWYgKGtleSA9PT0gXCJzdHlsZVwiICYmIHR5cGVvZiB2YWx1ZSA9PT0gXCJvYmplY3RcIilcclxuICAgICAgICB2YWx1ZSA9IE9iamVjdC5lbnRyaWVzKHZhbHVlKVxyXG4gICAgICAgICAgLmZpbHRlcigoWywgdl0pID0+IHRydXRoeSh2KSlcclxuICAgICAgICAgIC5tYXAoKFtrLCB2XSkgPT4gYCR7a306ICR7dn1gKVxyXG4gICAgICAgICAgLmpvaW4oXCI7IFwiKTtcclxuXHJcbiAgICAgIC8vIChjbGFzczopIFtcImJ0blwiLCBcInJlZFwiXSA9PT4gXCJidG4gcmVkXCJcclxuICAgICAgaWYgKGtleSA9PT0gXCJjbGFzc1wiICYmIEFycmF5LmlzQXJyYXkodmFsdWUpKSB2YWx1ZSA9IHZhbHVlLmpvaW4oXCIgXCIpO1xyXG5cclxuICAgICAgaWYgKHZhbHVlID09PSB0cnVlKSBub2RlLnNldEF0dHJpYnV0ZShrZXksIFwiXCIpO1xyXG4gICAgICBlbHNlIGlmICh0eXBlb2YgdmFsdWUgPT09IFwic3RyaW5nXCIgfHwgdHlwZW9mIHZhbHVlID09PSBcIm51bWJlclwiKVxyXG4gICAgICAgIG5vZGUuc2V0QXR0cmlidXRlKGtleSwgU3RyaW5nKHZhbHVlKSk7XHJcbiAgICAgIC8vIGtleSBoYXMgdGhlIGZvcm0gb2YgXCJvbi1jaGFuZ2VcIi4gdmFsdWUgaXMgdGhlIGNhbGxiYWNrIGZ1bmN0aW9uIG9yIGFuIG9iamVjdCBpbXBsZW1lbnRpbmcge0V2ZW50TGlzdGVuZXJ9IGludGVyZmFjZVxyXG4gICAgICBlbHNlIGlmIChcclxuICAgICAgICBrZXkuc3RhcnRzV2l0aChcIm9uLVwiKSAmJlxyXG4gICAgICAgICh0eXBlb2YgdmFsdWUgPT09IFwiZnVuY3Rpb25cIiB8fCB0eXBlb2YgdmFsdWUgPT09IFwib2JqZWN0XCIpXHJcbiAgICAgICkge1xyXG4gICAgICAgIC8vIHJlbW92ZSBsZWFkaW5nIFwib24tXCJcIlxyXG4gICAgICAgIGNvbnN0IGV2ZW50ID0ga2V5LnJlcGxhY2UoL15vbi0vLCBcIlwiKTtcclxuXHJcbiAgICAgICAgbm9kZS5hZGRFdmVudExpc3RlbmVyKFxyXG4gICAgICAgICAgZXZlbnQsXHJcbiAgICAgICAgICB2YWx1ZSBhcyBFdmVudExpc3RlbmVyT3JFdmVudExpc3RlbmVyT2JqZWN0XHJcbiAgICAgICAgKTtcclxuICAgICAgfVxyXG4gICAgICAvLyBAdHMtaWdub3JlIC0gcHJvdmlkaW5nIHRoZSB2YWx1ZSBhcyBwcm9wZXJ0eSB0byBodG1sIGVsZW1lbnRcclxuICAgICAgZWxzZSBub2RlW2tleV0gPSB2YWx1ZTtcclxuICAgIH0pO1xyXG5cclxuICAvLyByZXR1cm5zIGNoaWxkIGpzeCBub2RlcyBhcyB3ZWxsIHRvIGJlIHVzZWQgZHVyaW5nIHRoZSByZWYgY2FsbFxyXG4gIGNvbnN0IGNoaWxkSnN4Tm9kZXMgPSBjaGlsZHJlbi5maWx0ZXIoKGNoaWxkKSA9PiBjaGlsZCBpbnN0YW5jZW9mIFZOb2RlKTtcclxuXHJcbiAgY29uc29sZS5sb2coeyBjaGlsZHJlbiB9KTtcclxuXHJcbiAgbm9kZS5hcHBlbmQoXHJcbiAgICAuLi5jaGlsZHJlblxyXG4gICAgICAuZmxhdCgpXHJcbiAgICAgIC8vLmZpbHRlcih0cnV0aHkpXHJcbiAgICAgIC5maWx0ZXIoKGNoaWxkKSA9PiBjaGlsZC50YWcgIT09IFwiX19OVUxMX19cIilcclxuICAgICAgLm1hcCgoY2hpbGQpID0+IGNoaWxkLmFzTm9kZSgpKVxyXG4gICk7XHJcblxyXG4gIC8vIHN2ZyBlbGVtZW50IGFuZCBhbGwgaXRzIGNoaWxkcmVuIHdlcmUgcmVuZGVyZWQsIHJlc2V0IHRoZSBzdmcgY29udGV4dFxyXG4gIGlmIChzdmdDb250ZXh0U2V0KSBzdmdDb250ZXh0ID0gZmFsc2U7XHJcblxyXG4gIHJldHVybiBbbm9kZSwgY2hpbGRKc3hOb2RlcyBhcyBKc3hOb2RlSW50ZXJmYWNlW11dO1xyXG59XHJcblxyXG5mdW5jdGlvbiBpbnNlcnROZXdJdGVtKG5ld05vZGU6IFZOb2RlSW50ZXJmYWNlKSB7XHJcbiAgY29uc3QgW3BhcmVudCwgbmV4dFNpYmxpbmddID0gZ2V0UGFyZW50QW5kTmV4dFNpYmxpbmcobmV3Tm9kZSk7XHJcbiAgcGFyZW50Lmluc2VydEJlZm9yZShuZXdOb2RlLmFzTm9kZSgpLCBuZXh0U2libGluZyk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGRpZmZBbmRQYXRjaENoaWxkcmVuKFxyXG4gIG9sZE5vZGU6IFZOb2RlSW50ZXJmYWNlLFxyXG4gIG5ld05vZGU6IFZOb2RlSW50ZXJmYWNlXHJcbikge1xyXG4gIG9sZE5vZGUuY2hpbGRyZW4uZm9yRWFjaCgob2xkQ2hpbGQsIGl4KSA9PiB7XHJcbiAgICBjb25zdCBuZXdDaGlsZCA9IG5ld05vZGUuY2hpbGRyZW5baXhdO1xyXG4gICAgLy8gY2hpbGQgd2FzIHJlbW92ZWRcclxuICAgIGlmICghbmV3Q2hpbGQpIG9sZENoaWxkLnJlbW92ZUZyb21ET00oKTtcclxuICAgIC8vIGNoaWxkIGlzIG1vZGlmaWVkXHJcbiAgICBlbHNlIGlmIChuZXdDaGlsZC50eXBlID09PSBvbGRDaGlsZC50eXBlKSBvbGRDaGlsZC5kaWZmQW5kUGF0Y2gobmV3Q2hpbGQpO1xyXG4gICAgLy8gY2hpbGQgaXMgcmVwbGFjZWRcclxuICAgIGVsc2Uge1xyXG4gICAgICBvbGRDaGlsZC5yZW1vdmVGcm9tRE9NKCk7XHJcbiAgICAgIGluc2VydE5ld0l0ZW0obmV3Q2hpbGQpO1xyXG4gICAgfVxyXG4gIH0pO1xyXG5cclxuICAvLyBuZXcgYWRkaXRpb24gaXRlbXNcclxuICBjb25zdCBuZXdJdGVtcyA9IG5ld05vZGUuY2hpbGRyZW4uc2xpY2Uob2xkTm9kZS5jaGlsZHJlbi5sZW5ndGgpO1xyXG4gIGlmIChuZXdJdGVtcy5sZW5ndGgpIHtcclxuICAgIGNvbnN0IGRvY3VtZW50RnJhZ21lbnQgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XHJcbiAgICBuZXdJdGVtcy5mb3JFYWNoKChpdGVtKSA9PiBkb2N1bWVudEZyYWdtZW50LmFwcGVuZChpdGVtLmFzTm9kZSgpKSk7XHJcblxyXG4gICAgY29uc3QgW3BhcmVudCwgbmV4dFNpYmxpbmddID0gZ2V0UGFyZW50QW5kTmV4dFNpYmxpbmcobmV3SXRlbXNbMF0pO1xyXG4gICAgcGFyZW50Lmluc2VydEJlZm9yZShkb2N1bWVudEZyYWdtZW50LCBuZXh0U2libGluZyk7XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBhc1ZOb2RlKFxyXG4gIHRhZzogc3RyaW5nIHwgRnVuY3Rpb24gfCB1bmRlZmluZWQsXHJcbiAgcHJvcHM6IEpzeFByb3BzXHJcbik6IFZOb2RlSW50ZXJmYWNlIHtcclxuICBjb25zb2xlLmxvZyhcImFzVk5vZGU6XCIsIHsgdGFnLCBwcm9wcyB9KTtcclxuXHJcbiAgaWYgKHR5cGVvZiB0YWcgPT09IFwiZnVuY3Rpb25cIikge1xyXG4gICAgbGV0IHJlc3VsdCA9IHRhZyhwcm9wcyk7XHJcbiAgICBpZiAocmVzdWx0IGluc3RhbmNlb2YgVk5vZGUpIHtcclxuICAgICAgLy9jb25zb2xlLndhcm4oXCJhc1ZOb2RlIHdpdGggSnN4Tm9kZVwiKTtcclxuICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIH1cclxuICAgIGlmIChyZXN1bHQgaW5zdGFuY2VvZiBOb2RlKSB7XHJcbiAgICAgIHJldHVybiBuZXcgTGl2ZU5vZGVWTm9kZShyZXN1bHQpO1xyXG4gICAgfVxyXG4gICAgLy8gbnVsbCBqc3ggbm9kZVxyXG4gICAgaWYgKCF0cnV0aHkocmVzdWx0KSkge1xyXG4gICAgICByZXR1cm4gbmV3IE51bGxWTm9kZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBuZXcgVGV4dFZOb2RlKHJlc3VsdCk7XHJcbiAgfVxyXG5cclxuICBjb25zdCB7IGNoaWxkcmVuLCAuLi5hdHRyIH0gPSBwcm9wcztcclxuICBpZiAodGFnKSB7XHJcbiAgICByZXR1cm4gbmV3IEVsZW1lbnRWTm9kZSh0YWcsIGF0dHIsIGNoaWxkcmVuKTsgLy8gb3Igc2ltcGx5IHBhc3MgY2lsZHJlbiB3aXRoIHByb3BzXHJcbiAgfSBlbHNlIGlmICghdHJ1dGh5KGF0dHIpKSB7XHJcbiAgICBjb25zdCB2Tm9kZSA9IG5ldyBOdWxsVk5vZGUoKTtcclxuICAgIHZOb2RlLnBhcmVudCA9IHRoaXM7XHJcbiAgICByZXR1cm4gdk5vZGU7XHJcbiAgfSBlbHNlIGlmIChjaGlsZHJlbikge1xyXG4gICAgcmV0dXJuIG5ldyBGcmFnbWVudFZOb2RlKGNoaWxkcmVuKTtcclxuICB9XHJcblxyXG4gIC8vIGVsc2U/IC8vIEBUT0RPOj9cclxufVxyXG5cclxuLyoqXHJcbiAqIGNvbnZlcnRzIHByYWdtYSBvYmplY3QgdG8gaHRtbCBzdHJpbmdcclxuICoganN4cyBpcyBhbHdheXMgY2FsbGVkIHdoZW4gZWxlbWVudCBoYXMgbW9yZSB0aGFuIG9uZSBjaGlsZFxyXG4gKlxyXG4gKiBAcGFyYW0ge3N0cmluZyB8IEZ1bmN0aW9ufSB0YWcgLSB0YWcgbmFtZSBvciB0YWcgY2xhc3NcclxuICogQHBhcmFtIHtPYmplY3QgfCBudWxsfSBwcm9wcyAtIHByb3BzIGZvciB0aGUgdGFnXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24ganN4cyhcclxuICB0YWc6IHN0cmluZyB8IEZ1bmN0aW9uLFxyXG4gIHByb3BzOiBKc3hQcm9wc1xyXG4pOiBKc3hOb2RlSW50ZXJmYWNlIHtcclxuICBwcm9wcy5jaGlsZHJlbiA9IHByb3BzLmNoaWxkcmVuLmZsYXQoKTsgLy8gQFRPRE86IGRvY1xyXG5cclxuICAvLyBpZiByZWYgcHJvcCBpcyBwcm92aWRlZCwgbWVtb3JpemUgYW5kIHJlbW92ZSBmcm9tIHRoZSBodG1sIGdlbmVyYXRpb24gcHJvY2Vzc1xyXG4gIGNvbnN0IHJlZjogRnVuY3Rpb24gfCBudWxsID1cclxuICAgIHR5cGVvZiBwcm9wcy5yZWYgPT09IFwiZnVuY3Rpb25cIiA/IHByb3BzLnJlZiA6IG51bGw7XHJcbiAgaWYgKHJlZikgZGVsZXRlIHByb3BzLnJlZjsgLy8gQFRPRE86XHJcblxyXG4gIHJldHVybiBhc1ZOb2RlKHRhZywgcHJvcHMpO1xyXG59XHJcblxyXG4vKipcclxuICogY29udmVydHMgdGhlIGZyYWdtZW50cyBvYmplY3QgdG8gbm9kZXNcclxuICpcclxuICogQHBhcmFtIHtPYmplY3R9IHByb3BzXHJcbiAqIEBwYXJhbSB7QXJyYXl9IHByb3BzLmNoaWxkcmVuIC0gY2hpbGQgZWxlbWVudHMgaW4gdGhlIGZyYWdtZW50XHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gRnJhZ21lbnQocHJvcHM6IEpzeFByb3BzKSB7XHJcbiAgcmV0dXJuIGFzVk5vZGUodW5kZWZpbmVkLCBwcm9wcyk7XHJcbn1cclxuXHJcbi8vIGpzeCBpcyBjYWxsZWQgd2hlbiB0aGUgZWxlbWVudCBoYXMgb25lIG9yIHplcm8gY2hpbGRyZW5cclxuZXhwb3J0IGZ1bmN0aW9uIGpzeChcclxuICB0YWc6IHN0cmluZyB8IEZ1bmN0aW9uLFxyXG4gIHByb3BzOiBBdHRyaWJ1dGVzICZcclxuICAgIFNwZWNpYWxBdHRyaWJ1dGVzICYgeyBjaGlsZHJlbj86IHN0cmluZyB8IE5vZGUgfCBKc3hOb2RlSW50ZXJmYWNlIH1cclxuKTogSnN4Tm9kZUludGVyZmFjZSB7XHJcbiAgLy8gQHRzLWlnbm9yZSAtIHdyYXBwaW5nIHRoZSBjaGlsZHJlbiBhcyBhcnJheSB0byByZS11c2UganN4cyBtZXRob2RcclxuICBwcm9wcy5jaGlsZHJlbiA9IHByb3BzLmhhc093blByb3BlcnR5KFwiY2hpbGRyZW5cIikgPyBbcHJvcHMuY2hpbGRyZW5dIDogW107XHJcblxyXG4gIHJldHVybiBqc3hzKHRhZywgKHByb3BzIGFzIHVua25vd24pIGFzIEpzeFByb3BzKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIHJlbmRlciB0aGUgZ2l2ZW4gbWFya3VwIGludG8gdGhlIGdpdmVuIGRvbSBub2RlXHJcbiAqXHJcbiAqIEBwYXJhbSB7c3RyaW5nfEhUTUxFbGVtZW50fEpTWH0gbWFya3VwIC0gaHRtbCBhcyBzdHJpbmcsIGh0bWwgZWxlbWVudCBvciBqc3ggdGVtcGxhdGVcclxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZG9tTm9kZSAtIGNvbnRhaW5lciBmb3IgdGhlIHRlbXBsYXRlIHRvIGJlIHJlbmRlcmVkIGludG9cclxuICogQHBhcmFtIHtib29sZWFufSBbYXBwZW5kPWZhbHNlXSAtIHNob3VsZCB0aGUgcHJvdmlkZWQgbWFya3VwIGJlIGFwcGVuZGVkIHRvIHRoZSBleGlzdGluZyBtYXJrdXAsIG9yIGRlZmF1bHQgcmVwbGFjZSBpdFxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHJlbmRlcihcclxuICBtYXJrdXA6IHN0cmluZyB8IEhUTUxFbGVtZW50IHwgSnN4Tm9kZUludGVyZmFjZSwgLy8gQFRPRE86IHNwZWNpZmljIHN1cHBvcnQgZm9yIFRlbXBsYXRlPyAoLmNvbnRlbnQuY2xvbmUpXHJcbiAgZG9tTm9kZTogSFRNTEVsZW1lbnQsXHJcbiAgYXBwZW5kOiBib29sZWFuID0gZmFsc2VcclxuKSB7XHJcbiAgQXJyYXkuZnJvbShkb2N1bWVudC5ib2R5LnF1ZXJ5U2VsZWN0b3JBbGwoXCIqXCIpKS5mb3JFYWNoKFxyXG4gICAgKGVsKSA9PiAoZWwuc3R5bGUuYmFja2dyb3VuZCA9IFwiI2NjZmZjY1wiKVxyXG4gICk7XHJcblxyXG4gIHJlZnNUb0NhbGwuc3BsaWNlKDApO1xyXG5cclxuICBjb25zdCBpc1JlUmVuZGVyID0gcmVuZGVyZWRWVHJlZXMuaGFzKGRvbU5vZGUpO1xyXG4gIGlmICghYXBwZW5kICYmICFpc1JlUmVuZGVyKSBkb21Ob2RlLmlubmVySFRNTCA9IFwiXCI7XHJcblxyXG4gIGlmICh0eXBlb2YgbWFya3VwID09PSBcInN0cmluZ1wiKSB7XHJcbiAgICBkb21Ob2RlLmluc2VydEFkamFjZW50SFRNTChcImJlZm9yZWVuZFwiLCBtYXJrdXApOyAvLyBzYW5pdGl6ZT9cclxuICB9IGVsc2UgaWYgKG1hcmt1cCBpbnN0YW5jZW9mIE5vZGUpIHtcclxuICAgIGRvbU5vZGUuaW5zZXJ0QWRqYWNlbnRFbGVtZW50KFwiYmVmb3JlZW5kXCIsIG1hcmt1cCk7XHJcbiAgfSBlbHNlIGlmIChtYXJrdXAgaW5zdGFuY2VvZiBWTm9kZSkge1xyXG4gICAgc3ZnQ29udGV4dCA9IGZhbHNlO1xyXG5cclxuICAgIGNvbnN0IHZUcmVlID0gbmV3IFJvb3RWTm9kZShtYXJrdXAsIGRvbU5vZGUpO1xyXG5cclxuICAgIGNvbnNvbGUubG9nKFwiIyMjIyMjIyMjIyNcXG5cIiwgXCJ2VHJlZTpcIiwgdlRyZWUpO1xyXG5cclxuICAgIGlmIChpc1JlUmVuZGVyKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwiaXMgcmUtcmVuZGVyXCIpO1xyXG4gICAgICBjb25zdCBvbGRWVHJlZSA9IHJlbmRlcmVkVlRyZWVzLmdldChkb21Ob2RlKTtcclxuXHJcbiAgICAgIGNvbnNvbGUubG9nKFwiIyMjIyMjIyMjIyNcXG5cIiwgeyBvbGRWVHJlZSwgbmV3VlRyZWU6IHZUcmVlIH0pO1xyXG5cclxuICAgICAgLy8gZGlmZlxyXG4gICAgICBvbGRWVHJlZS5kaWZmQW5kUGF0Y2godlRyZWUpO1xyXG5cclxuICAgICAgcmVuZGVyZWRWVHJlZXMuc2V0KGRvbU5vZGUsIHZUcmVlKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNvbnN0IGNvbnRlbnQgPSB2VHJlZS5hc05vZGUoKTtcclxuICAgICAgZG9tTm9kZS5hcHBlbmQoY29udGVudCk7XHJcbiAgICB9XHJcblxyXG4gICAgcmVuZGVyZWRWVHJlZXMuc2V0KGRvbU5vZGUsIHZUcmVlKTtcclxuXHJcbiAgICByZWZzVG9DYWxsLmZvckVhY2goKGNiKSA9PiBjYigpKTtcclxuXHJcbiAgICAvLy8vbWFya3VwW19jYWxsUmVmc10oKTtcclxuICB9IGVsc2Uge1xyXG4gICAgdGhyb3cgbmV3IEVycm9yKFwicmVuZGVyIG1ldGhvZCBjYWxsZWQgd2l0aCB3cm9uZyBhcmd1bWVudChzKVwiKTtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiByYXdIdG1sKGNvbnRlbnQ6IHN0cmluZyk6IEpzeE5vZGVJbnRlcmZhY2Uge1xyXG4gIHJldHVybiBuZXcgKGNsYXNzIGV4dGVuZHMgSnN4Tm9kZSBpbXBsZW1lbnRzIEpzeE5vZGVJbnRlcmZhY2Uge1xyXG4gICAgdG9TdHJpbmcoKSB7XHJcbiAgICAgIHJldHVybiBjb250ZW50O1xyXG4gICAgfVxyXG5cclxuICAgIGFzTm9kZSgpIHtcclxuICAgICAgY29uc3QgdGVtcGxhdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGVtcGxhdGVcIik7XHJcbiAgICAgIHRlbXBsYXRlLmlubmVySFRNTCA9IGNvbnRlbnQ7XHJcbiAgICAgIHJldHVybiB0ZW1wbGF0ZS5jb250ZW50O1xyXG4gICAgfVxyXG4gICAgYXNWTm9kZSgpIHtcclxuICAgICAgcmV0dXJuIHt9O1xyXG4gICAgfVxyXG5cclxuICAgIFtfY2FsbFJlZnNdKCkge1xyXG4gICAgICAvLyBub29wXHJcbiAgICB9XHJcbiAgfSkoe30gYXMgSnN4UHJvcHMpO1xyXG59XHJcblxyXG4vLyB2VHJlZVxyXG5cclxuLy8gZ290Y2hzYXM6XHJcbi8vIC0gc3R5bGVzIHdpbGwgb3ZlcnJpZGUgKGNvdWxkIGRvOiBzZXR0aW5nIGVhY2ggcnVsZSBpbmRpdmlkdWFsbHkpXHJcblxyXG5pbnRlcmZhY2UgVk5vZGVJbnRlcmZhY2Uge1xyXG4gIHRvU3RyaW5nKCk6IHN0cmluZztcclxuICBhc05vZGUoKTogTm9kZTtcclxuICBwYXJlbnQ6IFZOb2RlSW50ZXJmYWNlIHwgbnVsbDtcclxuICBjaGlsZHJlbjogQXJyYXk8Vk5vZGVJbnRlcmZhY2UgfCBuZXZlcj47XHJcbiAgdHlwZTogc3RyaW5nO1xyXG4gIG5vZGU/OiBDaGlsZE5vZGU7XHJcbiAgcmVtb3ZlRnJvbURPTSgpOiB2b2lkO1xyXG4gIGRpZmZBbmRQYXRjaChuZXdOb2RlOiBWTm9kZUludGVyZmFjZSk6IHZvaWQ7XHJcbn1cclxuXHJcbmNsYXNzIEVsZW1lbnRWTm9kZSBleHRlbmRzIFZOb2RlIGltcGxlbWVudHMgVk5vZGVJbnRlcmZhY2Uge1xyXG4gIHR5cGUgPSBcIkVsZW1lbnRcIjtcclxuICBub2RlID0gbnVsbCBhcyBhbnk7XHJcbiAgY2hpbGRyZW46IFZOb2RlSW50ZXJmYWNlW107XHJcbiAgcGFyZW50OiBWTm9kZUludGVyZmFjZSA9IG51bGwgYXMgYW55O1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgdGFnOiBzdHJpbmcsXHJcbiAgICBwcml2YXRlIHByb3BzOiBSZWNvcmQ8c3RyaW5nLCBhbnk+LFxyXG4gICAgY2hpbGRyZW46IFZOb2RlSW50ZXJmYWNlW11cclxuICApIHtcclxuICAgIHN1cGVyKCk7XHJcbiAgICB0aGlzLmNoaWxkcmVuID0gY2hpbGRyZW4ubWFwKChjaGlsZCkgPT4ge1xyXG4gICAgICBpZiAoQXJyYXkuaXNBcnJheShjaGlsZCkpIHJldHVybiBuZXcgRnJhZ21lbnRWTm9kZShjaGlsZCk7XHJcbiAgICAgIGlmIChjaGlsZCBpbnN0YW5jZW9mIFZOb2RlKSB7XHJcbiAgICAgICAgcmV0dXJuIGNoaWxkVk5vZGU7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKGNoaWxkIGluc3RhbmNlb2YgTm9kZSkge1xyXG4gICAgICAgIHJldHVybiBuZXcgTGl2ZU5vZGVWTm9kZShjaGlsZCk7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKCF0cnV0aHkoY2hpbGQpKSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBOdWxsVk5vZGUoKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgcmV0dXJuIG5ldyBUZXh0Vk5vZGUoY2hpbGQpO1xyXG4gICAgfSk7XHJcbiAgICB0aGlzLmNoaWxkcmVuLmZvckVhY2goKGNoaWxkKSA9PiAoY2hpbGQucGFyZW50ID0gdGhpcykpO1xyXG4gIH1cclxuICB0b1N0cmluZygpIHtcclxuICAgIHJldHVybiBhc0h0bWxTdHJpbmcodGhpcy50YWcsIHRoaXMucHJvcHMsIHRoaXMuY2hpbGRyZW4pO1xyXG4gIH1cclxuICBhc05vZGUoKSB7XHJcbiAgICBjb25zdCBub2RlID0gYXNOb2RlKHRoaXMudGFnLCB0aGlzLnByb3BzLCB0aGlzLmNoaWxkcmVuKVswXTtcclxuICAgIHRoaXMubm9kZSA9IG5vZGU7XHJcbiAgICByZXR1cm4gbm9kZTtcclxuICB9XHJcbiAgcmVtb3ZlRnJvbURPTSgpIHtcclxuICAgIHRoaXMubm9kZS5wYXJlbnRFbGVtZW50LnJlbW92ZUNoaWxkKHRoaXMubm9kZSk7XHJcbiAgfVxyXG4gIGRpZmZBbmRQYXRjaChuZXdOb2RlOiBFbGVtZW50Vk5vZGUpIHtcclxuICAgIGlmIChuZXdOb2RlLnRhZyA9PT0gdGhpcy50YWcpIHtcclxuICAgICAgbmV3Tm9kZS5ub2RlID0gdGhpcy5ub2RlO1xyXG4gICAgICAvLyAgICAgIHBhdGNoIHByb3BzLFxyXG4gICAgICAvLyB1cGRhdGUgcHJvcHMgZm9ybSBuZXcgbm9kZVxyXG4gICAgICBPYmplY3QuZW50cmllcyhuZXdOb2RlLnByb3BzKVxyXG4gICAgICAgIC5maWx0ZXIoKFtrLCB2XSkgPT4gdGhpcy5wcm9wc1trXSAhPT0gdilcclxuICAgICAgICAuZm9yRWFjaCgoW2tleSwgdmFsdWVdKSA9PiB7XHJcbiAgICAgICAgICBpZiAodmFsdWUgPT09IHRydWUpIG5ld05vZGUubm9kZS5zZXRBdHRyaWJ1dGUoa2V5LCBcIlwiKTtcclxuICAgICAgICAgIGVsc2UgaWYgKHZhbHVlID09PSBudWxsIHx8IHZhbHVlID09PSB1bmRlZmluZWQgfHwgdmFsdWUgPT09IGZhbHNlKVxyXG4gICAgICAgICAgICBuZXdOb2RlLm5vZGUucmVtb3ZlQXR0cmlidXRlKGtleSk7XHJcbiAgICAgICAgICBlbHNlIG5ld05vZGUubm9kZS5zZXRBdHRyaWJ1dGUoa2V5LCB2YWx1ZSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAvLyByZW1vdmUgb2xkLCBvYnNvbGF0ZSBhdHRyaWJ1dGVzXHJcbiAgICAgIE9iamVjdC5lbnRyaWVzKHRoaXMucHJvcHMpXHJcbiAgICAgICAgLmZpbHRlcigoW2ssIHZdKSA9PiAhbmV3Tm9kZS5wcm9wcy5oYXNPd25Qcm9wZXJ0eShrKSlcclxuICAgICAgICAuZm9yRWFjaCgoW2tleSwgdmFsdWVdKSA9PiB7XHJcbiAgICAgICAgICB0aGlzLm5vZGUucmVtb3ZlQXR0cmlidXRlKGtleSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAvLyBjaGlsZHJlbiA9PiBpdGVyIGFuZCBwYXRjaFxyXG4gICAgICAvLyBvbGQgY2hpbGRyZW4gYmVpbmcgbW9kaWZpZWRcclxuICAgICAgZGlmZkFuZFBhdGNoQ2hpbGRyZW4odGhpcywgbmV3Tm9kZSk7XHJcbiAgICB9XHJcbiAgICAvLyB0YWcgaGFzIGNoYW5nZWRcclxuICAgIGVsc2Uge1xyXG4gICAgICB0aGlzLm5vZGUucmVwbGFjZVdpdGgobmV3Tm9kZS5hc05vZGUoKSk7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG5jbGFzcyBGcmFnbWVudFZOb2RlIGV4dGVuZHMgVk5vZGUgaW1wbGVtZW50cyBWTm9kZUludGVyZmFjZSB7XHJcbiAgdHlwZSA9IFwiRnJhZ21lbnRcIjtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBjaGlsZHJlbjogQXJyYXk8XHJcbiAgICAgIFZOb2RlSW50ZXJmYWNlIHwgQ2hpbGROb2RlIHwgc3RyaW5nIHwgYm9vbGVhbiB8IG51bGwgfCB1bmRlZmluZWQgfCBudW1iZXJcclxuICAgID5cclxuICApIHtcclxuICAgIHN1cGVyKCk7XHJcblxyXG4gICAgdGhpcy5jaGlsZHJlbiA9IGNoaWxkcmVuLm1hcCgoY2hpbGQpID0+IHtcclxuICAgICAgaWYgKEFycmF5LmlzQXJyYXkoY2hpbGQpKSByZXR1cm4gbmV3IEZyYWdtZW50Vk5vZGUoY2hpbGQpO1xyXG4gICAgICBpZiAoY2hpbGQgaW5zdGFuY2VvZiBWTm9kZSkge1xyXG4gICAgICAgIGNvbnN0IGNoaWxkVk5vZGUgPSBjaGlsZDsgLy9jaGlsZC5hc1ZOb2RlKCk7XHJcbiAgICAgICAgY2hpbGRWTm9kZS5wYXJlbnQgPSB0aGlzO1xyXG4gICAgICAgIHJldHVybiBjaGlsZFZOb2RlO1xyXG4gICAgICB9XHJcbiAgICAgIGlmIChjaGlsZCBpbnN0YW5jZW9mIE5vZGUpIHtcclxuICAgICAgICBjb25zdCBuID0gbmV3IExpdmVOb2RlVk5vZGUoY2hpbGQpO1xyXG4gICAgICAgIG4ucGFyZW50ID0gdGhpcztcclxuICAgICAgICByZXR1cm4gbjtcclxuICAgICAgfVxyXG5cclxuICAgICAgY29uc29sZS5sb2coXCJAQCBtYXAgMlwiLCB7IGNoaWxkIH0pO1xyXG5cclxuICAgICAgaWYgKCF0cnV0aHkoY2hpbGQpKSB7XHJcbiAgICAgICAgY29uc3QgY2hpbGRWTm9kZSA9IG5ldyBOdWxsVk5vZGUoKTtcclxuICAgICAgICBjaGlsZFZOb2RlLnBhcmVudCA9IHRoaXM7XHJcbiAgICAgICAgcmV0dXJuIGNoaWxkVk5vZGU7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGNvbnNvbGUubG9nKFwiOjo6XCIsIHsgY2hpbGQgfSk7XHJcblxyXG4gICAgICBjb25zdCB0ZXh0Vk5vZGUgPSBuZXcgVGV4dFZOb2RlKGNoaWxkKTtcclxuICAgICAgdGV4dFZOb2RlLnBhcmVudCA9IHRoaXM7XHJcbiAgICAgIHJldHVybiB0ZXh0Vk5vZGU7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGFzTm9kZSgpIHtcclxuICAgIGNvbnN0IG5vZGUgPSBhc05vZGUodW5kZWZpbmVkLCB7fSwgdGhpcy5jaGlsZHJlbilbMF07XHJcbiAgICBjb25zb2xlLmxvZyh7IG5vZGUgfSk7XHJcblxyXG4gICAgcmV0dXJuIG5vZGU7XHJcbiAgfVxyXG5cclxuICB0b1N0cmluZygpIHtcclxuICAgIHJldHVybiB0aGlzLmNoaWxkcmVuLm1hcCgoY2hpbGQpID0+IGNoaWxkLnRvU3RyaW5nKCkpLmpvaW4oXCJcIik7XHJcbiAgfVxyXG5cclxuICAvLyB0byBsZXZlbFxyXG4gIGRpZmZBbmRQYXRjaChuZXdWTm9kZTogRnJhZ21lbnRWTm9kZSkge1xyXG4gICAgY29uc29sZS5sb2coXCJkaWZmQW5kUGF0Y2hcIik7XHJcblxyXG4gICAgcmV0dXJuIGRpZmZBbmRQYXRjaENoaWxkcmVuKHRoaXMsIG5ld1ZOb2RlKTtcclxuICB9XHJcblxyXG4gIHJlbW92ZUZyb21ET00oKSB7XHJcbiAgICBnZXRDaGlsZHJlbldpdGhOb2Rlcyh0aGlzKS5mb3JFYWNoKChub2RlKSA9PlxyXG4gICAgICBub2RlLm5vZGUhLnBhcmVudEVsZW1lbnQhLnJlbW92ZUNoaWxkKG5vZGUubm9kZSEpXHJcbiAgICApO1xyXG4gIH1cclxufVxyXG5cclxuY2xhc3MgVGV4dFZOb2RlIGV4dGVuZHMgVk5vZGUgaW1wbGVtZW50cyBWTm9kZUludGVyZmFjZSB7XHJcbiAgdHlwZSA9IFwiVGV4dE5vZGVcIjtcclxuICBjaGlsZHJlbiA9IFtdO1xyXG4gIG5vZGU6IFRleHQgPSBudWxsIGFzIGFueTtcclxuICBwcm9wczogeyBjb250ZW50OiBhbnkgfTtcclxuICBwYXJlbnQ6IFZOb2RlSW50ZXJmYWNlID0gbnVsbCBhcyBhbnk7XHJcblxyXG4gIC8qKlxyXG4gICAqXHJcbiAgICovXHJcbiAgY29uc3RydWN0b3IoY29udGVudDogc3RyaW5nIHwgbnVtYmVyIHwgYm9vbGVhbikge1xyXG4gICAgc3VwZXIoKTtcclxuICAgIHRoaXMucHJvcHMgPSB7IGNvbnRlbnQgfTsgLy9AVE9ETzpcclxuICB9XHJcblxyXG4gIGFzTm9kZSgpIHtcclxuICAgIGNvbnN0IHRleHROb2RlID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUodGhpcy5wcm9wcy5jb250ZW50KTtcclxuICAgIHRoaXMubm9kZSA9IHRleHROb2RlO1xyXG4gICAgcmV0dXJuIHRleHROb2RlO1xyXG4gIH1cclxuXHJcbiAgdG9TdHJpbmcoKSB7XHJcbiAgICByZXR1cm4gc2FuaXRpemUodGhpcy5wcm9wcy5jb250ZW50KTtcclxuICB9XHJcblxyXG4gIGRpZmZBbmRQYXRjaChuZXdOb2RlOiBUZXh0Vk5vZGUpIHtcclxuICAgIHRoaXMubm9kZS5ub2RlVmFsdWUgPSBuZXdOb2RlLnByb3BzLmNvbnRlbnQ7XHJcbiAgICBuZXdOb2RlLm5vZGUgPSB0aGlzLm5vZGU7XHJcbiAgfVxyXG5cclxuICByZW1vdmVGcm9tRE9NKCkge1xyXG4gICAgdGhpcy5ub2RlLnBhcmVudEVsZW1lbnQhLnJlbW92ZUNoaWxkKHRoaXMubm9kZSk7XHJcbiAgfVxyXG59XHJcblxyXG5jbGFzcyBOdWxsVk5vZGUgZXh0ZW5kcyBWTm9kZSBpbXBsZW1lbnRzIFZOb2RlSW50ZXJmYWNlIHtcclxuICB0eXBlID0gXCJOdWxsXCI7XHJcbiAgY2hpbGRyZW4gPSBbXTtcclxuICBwYXJlbnQ6IFZOb2RlSW50ZXJmYWNlID0gbnVsbCBhcyBhbnk7XHJcbiAgLyoqXHJcbiAgICpcclxuICAgKi9cclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIHN1cGVyKCk7XHJcbiAgfVxyXG5cclxuICBhc05vZGUoKSB7XHJcbiAgICAvL3JldHVybiBudWxsOyAvLyByZXR1cm4gZW1wdHkgZnJhZ21lbnQ/XHJcbiAgICByZXR1cm4gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO1xyXG4gIH1cclxuXHJcbiAgZGlmZkFuZFBhdGNoKG5ld05vZGUyOiBOdWxsVk5vZGUpIHtcclxuICAgIHJldHVybjtcclxuICB9XHJcblxyXG4gIHJlbW92ZUZyb21ET00oKSB7XHJcbiAgICByZXR1cm47XHJcbiAgfVxyXG5cclxuICB0b1N0cmluZygpIHtcclxuICAgIHJldHVybiBcIlwiO1xyXG4gIH1cclxufVxyXG5cclxuY2xhc3MgTGl2ZU5vZGVWTm9kZSBleHRlbmRzIFZOb2RlIGltcGxlbWVudHMgVk5vZGVJbnRlcmZhY2Uge1xyXG4gIHR5cGUgPSBcIk5vZGVcIjtcclxuICBjaGlsZHJlbiA9IFtdO1xyXG4gIHBhcmVudDogVk5vZGVJbnRlcmZhY2UgPSBudWxsIGFzIGFueTtcclxuICBub2RlOiBDaGlsZE5vZGU7XHJcblxyXG4gIC8qKlxyXG4gICAqXHJcbiAgICovXHJcbiAgY29uc3RydWN0b3Iobm9kZTogQ2hpbGROb2RlKSB7XHJcbiAgICBzdXBlcigpO1xyXG4gICAgdGhpcy5ub2RlID0gbm9kZTtcclxuICB9XHJcblxyXG4gIGFzTm9kZSgpIHtcclxuICAgIHJldHVybiB0aGlzLm5vZGU7XHJcbiAgfVxyXG5cclxuICBkaWZmQW5kUGF0Y2gobmV3Tm9kZTogTGl2ZU5vZGVWTm9kZSkge1xyXG4gICAgaWYgKG5ld05vZGUubm9kZSAhPT0gdGhpcy5ub2RlKSB7XHJcbiAgICAgIHRoaXMubm9kZS5yZXBsYWNlV2l0aChuZXdOb2RlLm5vZGUpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcmVtb3ZlRnJvbURPTSgpIHtcclxuICAgIHRoaXMubm9kZS5wYXJlbnRFbGVtZW50IS5yZW1vdmVDaGlsZCh0aGlzLm5vZGUpO1xyXG4gIH1cclxuXHJcbiAgdG9TdHJpbmcoKSB7XHJcbiAgICByZXR1cm4gZ2V0T3V0ZXJIdG1sKHRoaXMubm9kZSk7XHJcbiAgfVxyXG59XHJcblxyXG5jbGFzcyBSb290Vk5vZGUgZXh0ZW5kcyBWTm9kZSBpbXBsZW1lbnRzIFZOb2RlSW50ZXJmYWNlIHtcclxuICB0eXBlID0gXCJSb290XCI7XHJcbiAgcGFyZW50ID0gbnVsbDtcclxuICBub2RlOiBFbGVtZW50O1xyXG4gIGNoaWxkcmVuOiBWTm9kZUludGVyZmFjZVtdO1xyXG4gIC8qKlxyXG4gICAqXHJcbiAgICovXHJcbiAgY29uc3RydWN0b3IoY29udGVudCwgZG9tTm9kZTogRWxlbWVudCkge1xyXG4gICAgc3VwZXIoKTtcclxuICAgIGNvbnRlbnQucGFyZW50ID0gdGhpcztcclxuICAgIHRoaXMuY2hpbGRyZW4gPSBbY29udGVudF07XHJcbiAgICB0aGlzLm5vZGUgPSBkb21Ob2RlO1xyXG4gIH1cclxuXHJcbiAgYXNOb2RlKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuY2hpbGRyZW5bMF0uYXNOb2RlKCk7XHJcbiAgfVxyXG4gIHRvU3RyaW5nKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuY2hpbGRyZW5bMF0udG9TdHJpbmcoKTtcclxuICB9XHJcblxyXG4gIGRpZmZBbmRQYXRjaChuZXdWTm9kZTogVk5vZGVJbnRlcmZhY2UpIHtcclxuICAgIGRpZmZBbmRQYXRjaENoaWxkcmVuKHRoaXMsIG5ld1ZOb2RlKTtcclxuICB9XHJcblxyXG4gIHJlbW92ZUZyb21ET00oKSB7XHJcbiAgICB0aGlzLm5vZGUucmVtb3ZlKCk7XHJcbiAgfVxyXG59XHJcblxyXG4vLyBAVE9ETzogcmVmIGNhbGxzXHJcbi8vIEBUT0RPOiByZS1yZW5kZXIgc3ViIHRyZWVzICgubm9kZSA9IGFkZCB0byBtYXApXHJcbiIsImltcG9ydCB7IHJlbmRlciwgcmF3SHRtbCB9IGZyb20gXCIuL2pzeC9qc3gtcnVudGltZVwiO1xyXG5cclxuY29uc3QgeHNzID0gXCI8aW1nIHNyYz14IG9uZXJyb3I9XFxcImFsZXJ0KCdYU1MgQXR0YWNrJylcXFwiPlwiOyAvL1wiPHNjcmlwdD5hbGVydCgnLS4tJyk8L3NjcmlwdD5cIjtcclxuXHJcbmZ1bmN0aW9uIFJURShwcm9wczogLyp7IHR4dCwgXCJvbi1jbGlja1wiOiBvbkNsaWNrIH0qLyB7XHJcbiAgdHh0OiBzdHJpbmc7XHJcbiAgcmVmPzogRnVuY3Rpb247XHJcbn0pIHtcclxuICBjb25zb2xlLmxvZyhcIm9uQ2xpY2tcIiwgcHJvcHNbXCJvbi1jbGlja1wiXSk7XHJcbiAgcmV0dXJuIChcclxuICAgIDxwIHJlZj17KGVsOiBIVE1MRWxlbWVudCkgPT4gY29uc29sZS5sb2coXCJteSBkaXYgOjpyZWY6OjMuMlwiLCBlbCl9PlxyXG4gICAgICB7cHJvcHMudHh0fVxyXG4gICAgPC9wPlxyXG4gICk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIEJ1dHRvbih7XHJcbiAgY2hpbGRyZW4sXHJcbiAgZGlzYWJsZWQsXHJcbn06IHtcclxuICBjaGlsZHJlbjogYW55O1xyXG4gIGRpc2FibGVkOiBib29sZWFuO1xyXG4gIHJlZj86IEZ1bmN0aW9uO1xyXG59KSB7XHJcbiAgcmV0dXJuIChcclxuICAgIDxidXR0b25cclxuICAgICAgZGlzYWJsZWQ9e2Rpc2FibGVkfVxyXG4gICAgICByZWY9eyhlbDogSFRNTEVsZW1lbnQpID0+IGNvbnNvbGUubG9nKFwibXkgYnV0dG9uIDo6cmVmOjoxXCIsIGVsKX1cclxuICAgID5cclxuICAgICAgPHNwYW4gcmVmPXsoZWw6IEhUTUxFbGVtZW50KSA9PiBjb25zb2xlLmxvZyhcIm15IGEgOjpyZWY6OjJcIiwgZWwpfT5cclxuICAgICAgICBCdG4tc3Bhbi1maXJzdFxyXG4gICAgICA8L3NwYW4+XHJcbiAgICAgIHtjaGlsZHJlbn1cclxuICAgICAgPD5cclxuICAgICAgICA8c3BhbiByZWY9eyhlbDogSFRNTEVsZW1lbnQpID0+IGNvbnNvbGUubG9nKFwibXkgYSA6OnJlZjo6M1wiLCBlbCl9PlxyXG4gICAgICAgICAgQnRuLXNwYW4tZW5kXHJcbiAgICAgICAgPC9zcGFuPlxyXG4gICAgICA8Lz5cclxuICAgIDwvYnV0dG9uPlxyXG4gICk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHJlZmxvZyhlbDogSFRNTEVsZW1lbnQpIHtcclxuICBjb25zb2xlLmxvZyhcIm15IGlubmVyIGRpdjo6cmVmOjo4XCIsIGVsKTtcclxufVxyXG5cclxuLypcclxuY29uc3QgbWFya3VwID0gKFxyXG4gIDw+XHJcbiAgICA8ZGl2XHJcbiAgICAgIGNsYXNzPVwiZm9vXCJcclxuICAgICAgcmVmPXsoZWw6IEhUTUxFbGVtZW50KSA9PiBjb25zb2xlLmxvZyhcIm15IGRpdiA6OnJlZjo6NFwiLCBlbCl9XHJcbiAgICAvPlxyXG4gICAgPGlucHV0IGRpc2FibGVkPXt0cnVlfSBoaWRkZW49e2ZhbHNlfSAvPlxyXG4gICAgPEJ1dHRvblxyXG4gICAgICBkaXNhYmxlZD17dHJ1ZX1cclxuICAgICAgcmVmPXsoZWw6IEhUTUxFbGVtZW50KSA9PiBjb25zb2xlLmxvZyhcIm15IEJVVFRPTjo6cmVmOjo1XCIsIGVsKX1cclxuICAgID5cclxuICAgICAgdGV4dFxyXG4gICAgICA8cG9wdXAtaW5mb1xyXG4gICAgICAgIHJlZj17KGVsOiBIVE1MRWxlbWVudCkgPT4gY29uc29sZS5sb2coXCJzcGFuIGluIEJVVFRPTjo6cmVmOjo2XCIsIGVsKX1cclxuICAgICAgPlxyXG4gICAgICAgIGJsYVxyXG4gICAgICA8L3BvcHVwLWluZm8+XHJcbiAgICA8L0J1dHRvbj5cclxuICAgIDxSVEVcclxuICAgICAgdHh0PVwibGUgdGV4dFwiXHJcbiAgICAgIHJlZj17KGVsOiBIVE1MRWxlbWVudCkgPT4gY29uc29sZS5sb2coXCJteSBkaXYgOjpyZWY6OjMuMVwiLCBlbCl9XHJcbiAgICAgIG9uLWNsaWNrPXsoZTogSFRNTEVsZW1lbnQpID0+IGNvbnNvbGUubG9nKGUpfVxyXG4gICAgLz5cclxuICAgIHt4c3N9XHJcbiAgICB7cmF3SHRtbChgPG9sPjxsaT5yYXcgaHRtbDwvbGk+PC9vbD5gKX1cclxuICAgIDxkaXZcclxuICAgICAgY2xhc3M9XCJiYW1cIlxyXG4gICAgICByZWY9eyhlbDogSFRNTEVsZW1lbnQpID0+IGNvbnNvbGUubG9nKFwibXkgZGl2OjpyZWY6OjdcIiwgZWwpfVxyXG4gICAgPlxyXG4gICAgICA8ZGl2PlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJiYXJcIiBvbi1jbGljaz17KGUpID0+IGNvbnNvbGUubG9nKGUpfSByZWY9e3JlZmxvZ30+XHJcbiAgICAgICAgICBjbGljayBNRVxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDxkaXYgc3R5bGU9e3sgb3V0bGluZTogXCIxcHggc29saWQgcmVkO1wiIH19PlxyXG4gICAgICAgICAge2RvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjb2xkXCIpfVxyXG4gICAgICAgICAge251bGx9XHJcbiAgICAgICAgICB7WzAsIDFdLm1hcCgobikgPT4gKFxyXG4gICAgICAgICAgICA8c3Bhbj57bn08L3NwYW4+XHJcbiAgICAgICAgICApKX1cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgPC9kaXY+XHJcbiAgICA8L2Rpdj5cclxuICA8Lz5cclxuKTtcclxuXHJcbiovXHJcblxyXG4vKlxyXG5jb25zdCBtYXJrdXAgPSAoXHJcbiAgPEJ1dHRvbiBkaXNhYmxlZD17dHJ1ZX0+XHJcbiAgICAgIDxib2xkIHJlZj17cmVmbG9nfT4tLUlOTkVSLS08L2JvbGQ+XHJcbiAgPC9CdXR0b24+XHJcbik7Ki9cclxuLypcclxuXHJcbmNvbnN0IG1hcmt1cCA9IChcclxuICA8ZGl2IGNsYXNzPVwiZm9vXCIgcmVmPXsoZWw6IEhUTUxFbGVtZW50KSA9PiBjb25zb2xlLmxvZyhcIm15IGRpdjo6cmVmOjpcIiwgZWwpfT5cclxuICAgIDxkaXY+XHJcbiAgICAgIDxkaXYgY2xhc3M9XCJiYXJcIiByZWY9eyhlbDogSFRNTEVsZW1lbnQpID0+IGNvbnNvbGUubG9nKFwibXkgaW5uZXIgZGl2OjpyZWY6OlwiLCBlbCl9IC8+XHJcbiAgICA8L2Rpdj5cclxuICAgIDxCdXR0b24gZGlzYWJsZWQ9e3RydWV9PjwvQnV0dG9uPlxyXG4gIDwvZGl2PlxyXG4pO1xyXG4qL1xyXG4vKlxyXG5jb25zdCBtYXJrdXAgPSAoXHJcbiAgPGE+XHJcbiAgICA8Yj5cclxuICAgICAgPGMgY2xhc3M9XCJiYXJcIiByZWY9e3JlZmxvZ30gLz5cclxuICAgIDwvYj5cclxuICA8L2E+XHJcbik7XHJcbiovXHJcblxyXG5mdW5jdGlvbiBTcGFuKHsgbW9kZSB9OiB7IG1vZGU6IGFueSB9KSB7XHJcbiAgcmV0dXJuIG1vZGUgPT09IDEgPyAoXHJcbiAgICA8ZGl2PlxyXG4gICAgICA8c3BhbiBpZD1cImlubmVyXCIgb2xkPXt0cnVlfT5cclxuICAgICAgICBTcGFuLUNvbXAtLW9sZFxyXG4gICAgICA8L3NwYW4+XHJcbiAgICAgIDxoMz50byBiZSByZW1vdmVkPC9oMz5cclxuICAgIDwvZGl2PlxyXG4gICkgOiAoXHJcbiAgICA8ZGl2PlxyXG4gICAgICA8cCBpZD1cImlubmVyXCIgbmV3PXt0cnVlfT5cclxuICAgICAgICBTcGFuLUNvbXAtLW5ld3NcclxuICAgICAgPC9wPlxyXG4gICAgPC9kaXY+XHJcbiAgKTtcclxufVxyXG5cclxuZnVuY3Rpb24gQ29tcCh7IG51bSB9KSB7XHJcbiAgaWYgKG51bSA9PT0gMSkgcmV0dXJuIG51bGw7XHJcbiAgcmV0dXJuIChcclxuICAgIDxkaXY+XHJcbiAgICAgIDxwPmNvbXA8L3A+XHJcbiAgICA8L2Rpdj5cclxuICApO1xyXG59XHJcblxyXG5jb25zdCBtYXJrdXAxID0gKG51bTogYW55KSA9PiAoXHJcbiAgPGRpdiBpZD1cIm91dGVyXCIgZGF0YS1mb289XCJiYXJcIiBkYXRhLXZhcj17bnVtfT5cclxuICAgIDxoMz5zaG91bGQgZ2V0IDIgLTogMzwvaDM+XHJcbiAgICB7bnVtID09PSAxID8gKFxyXG4gICAgICA8dWwgY2xhc3M9XCJ1bC1jbGFzc1wiPlxyXG4gICAgICAgIDxsaT5UZXh0IDEgPC9saT5cclxuICAgICAgICA8bGk+VGV4dCAyIDwvbGk+XHJcbiAgICAgIDwvdWw+XHJcbiAgICApIDogKFxyXG4gICAgICA8dWwgY2xhc3M9XCJ1bC1jbGFzc1wiPlxyXG4gICAgICAgIDxsaT5UZXh0IDMgPC9saT5cclxuICAgICAgICA8bGk+VGV4dCAyIDwvbGk+XHJcbiAgICAgICAgPGxpPlRleHQgMSA8L2xpPlxyXG4gICAgICA8L3VsPlxyXG4gICAgKX1cclxuICAgIDxoMz5zaG91bGQgZ2V0IDMgLTogMjwvaDM+XHJcbiAgICB7bnVtID09PSAxID8gKFxyXG4gICAgICA8dWwgY2xhc3M9XCJ1bC1jbGFzc1wiPlxyXG4gICAgICAgIDxsaT5UZXh0IDEgPC9saT5cclxuICAgICAgICA8bGk+VGV4dCAyIDwvbGk+XHJcbiAgICAgICAgPGxpPlRleHQgMyA8L2xpPlxyXG4gICAgICA8L3VsPlxyXG4gICAgKSA6IChcclxuICAgICAgPHVsIGNsYXNzPVwidWwtY2xhc3NcIj5cclxuICAgICAgICA8bGk+VGV4dCAxIDwvbGk+XHJcbiAgICAgICAgPGxpPlRleHQgMiA8L2xpPlxyXG4gICAgICA8L3VsPlxyXG4gICAgKX1cclxuICAgIHtudW0gPT09IDEgPyBudWxsIDogPHA+bmV3IHJlbmRlcjwvcD59XHJcbiAgICA8ZGl2PlxyXG4gICAgICA8c3Bhbj5zcGFuLWNvbnRlbnQ8L3NwYW4+XHJcbiAgICA8L2Rpdj5cclxuICAgIDxTcGFuIG1vZGU9e251bX0gLz5cclxuICAgIHsvKmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjb2xkXCIpKi99XHJcbiAgICA8PkZyYWdtZW50LWl0ZW08Lz5cclxuICAgIDxzdmdcclxuICAgICAgdmlld0JveD1cIjAgMCAzMDAgMTAwXCJcclxuICAgICAgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiXHJcbiAgICAgIHN0cm9rZT1cInJlZFwiXHJcbiAgICAgIGZpbGw9XCJncmV5XCJcclxuICAgID5cclxuICAgICAgPGNpcmNsZSBjeD1cIjUwXCIgY3k9XCI1MFwiIHI9XCI0MFwiIC8+XHJcbiAgICAgIDxjaXJjbGUgY3g9XCIxNTBcIiBjeT1cIjUwXCIgcj1cIjRcIiAvPlxyXG5cclxuICAgICAgPHN2ZyB2aWV3Qm94PVwiMCAwIDEwIDEwXCIgeD1cIjIwMFwiIHdpZHRoPVwiMTAwXCI+XHJcbiAgICAgICAgPGNpcmNsZSBjeD1cIjVcIiBjeT1cIjVcIiByPVwiNFwiIC8+XHJcbiAgICAgIDwvc3ZnPlxyXG4gICAgPC9zdmc+XHJcbiAgPC9kaXY+XHJcbik7XHJcblxyXG5mdW5jdGlvbiBtYXJrdXAyKG51bTogYW55KSB7XHJcbiAgcmV0dXJuIChcclxuICAgIDxkaXYgaWQ9XCJvdXRlclwiPlxyXG4gICAgICA8PlxyXG4gICAgICAgIDw+XHJcbiAgICAgICAgICA8cD5uZXN0ZWQgZnJhZ21lbnQ8L3A+XHJcbiAgICAgICAgPC8+XHJcbiAgICAgIDwvPlxyXG4gICAgICA8aDE+c3RhdGljPC9oMT5cclxuICAgICAgPGgxPmR5bmFtaWMgdmFsOiB7bnVtfTwvaDE+XHJcbiAgICAgIHtudW0gPT09IDEgPyA8aDE+b2xkPC9oMT4gOiBmYWxzZX1cclxuICAgICAge251bSA9PT0gMSA/IChcclxuICAgICAgICA8PlxyXG4gICAgICAgICAgPGgxPmZyYWcgb2xkPC9oMT5cclxuICAgICAgICAgIDxzcGFuPmZyYWcgc3BhbiBvbGQ8L3NwYW4+XHJcbiAgICAgICAgPC8+XHJcbiAgICAgICkgOiAoXHJcbiAgICAgICAgPGgxPmZyYWcgbmV3PC9oMT5cclxuICAgICAgKX1cclxuICAgICAgPENvbXAgbnVtPXtudW19IC8+XHJcbiAgICA8L2Rpdj5cclxuICApO1xyXG59XHJcbmZ1bmN0aW9uIE5MKCkge1xyXG4gIHJldHVybiBudWxsO1xyXG59XHJcblxyXG5mdW5jdGlvbiBtYXJrdXAzKG51bTogYW55KSB7XHJcbiAgcmV0dXJuIG51bSA9PT0gMSA/IChcclxuICAgIDxoMT5cclxuICAgICAgQS1MaW5lIDEgLSB7bnVtfVxyXG4gICAgICA8U3BhbiBtb2RlPXtudW19IC8+XHJcbiAgICAgIDxCdXR0b25cclxuICAgICAgICBkaXNhYmxlZD17dHJ1ZX1cclxuICAgICAgICByZWY9eyhlbDogSFRNTEVsZW1lbnQpID0+IGNvbnNvbGUubG9nKFwibXkgQlVUVE9OOjpyZWY6OjVcIiwgZWwpfVxyXG4gICAgICA+XHJcbiAgICAgICAgdGV4dFxyXG4gICAgICAgIDxwb3B1cC1pbmZvXHJcbiAgICAgICAgICByZWY9eyhlbDogSFRNTEVsZW1lbnQpID0+IGNvbnNvbGUubG9nKFwic3BhbiBpbiBCVVRUT046OnJlZjo6NlwiLCBlbCl9XHJcbiAgICAgICAgPlxyXG4gICAgICAgICAgYmxhXHJcbiAgICAgICAgPC9wb3B1cC1pbmZvPlxyXG4gICAgICAgIDxwPmlubmVyIHAge251bX08L3A+XHJcbiAgICAgIDwvQnV0dG9uPlxyXG4gICAgICBBLUxpbmUgM1xyXG4gICAgICA8PlxyXG4gICAgICAgIDxwPlxyXG4gICAgICAgICAgPHA+QSBGcmFnIGxpbmUgMSo8L3A+XHJcbiAgICAgICAgPC9wPlxyXG4gICAgICAgIDxwPkEgRnJhZyBsaW5lIDI8L3A+XHJcbiAgICAgICAgPHA+QSBGcmFnIGxpbmUgMzwvcD5cclxuICAgICAgICA8cD5BIEZyYWcgbGluZSA0PC9wPlxyXG4gICAgICAgIDxzdmdcclxuICAgICAgICAgIHZpZXdCb3g9XCIwIDAgMzAwIDEwMFwiXHJcbiAgICAgICAgICB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCJcclxuICAgICAgICAgIHN0cm9rZT1cInJlZFwiXHJcbiAgICAgICAgICBmaWxsPVwiZ3JleVwiXHJcbiAgICAgICAgPlxyXG4gICAgICAgICAgPGNpcmNsZSBjeD1cIjUwXCIgY3k9XCI1MFwiIHI9XCI0MFwiIC8+XHJcbiAgICAgICAgICA8Y2lyY2xlIGN4PVwiMTUwXCIgY3k9XCI1MFwiIHI9XCI0XCIgLz5cclxuXHJcbiAgICAgICAgICA8c3ZnIHZpZXdCb3g9XCIwIDAgMTAgMTBcIiB4PVwiMjAwXCIgd2lkdGg9XCIxMDBcIj5cclxuICAgICAgICAgICAgPGNpcmNsZSBjeD1cIjVcIiBjeT1cIjVcIiByPVwiNFwiIC8+XHJcbiAgICAgICAgICA8L3N2Zz5cclxuICAgICAgICA8L3N2Zz5cclxuICAgICAgPC8+XHJcbiAgICAgIHtudWxsfVxyXG4gICAgPC9oMT5cclxuICApIDogKFxyXG4gICAgPGgxIGNsYXNzPVwiYVwiPlxyXG4gICAgICBCIExpbmUgMSAtIHtudW19XHJcbiAgICAgIDxTcGFuIG1vZGU9e251bX0gLz5cclxuICAgICAgPEJ1dHRvblxyXG4gICAgICAgIGRpc2FibGVkPXt0cnVlfVxyXG4gICAgICAgIHJlZj17KGVsOiBIVE1MRWxlbWVudCkgPT4gY29uc29sZS5sb2coXCJteSBCVVRUT046OnJlZjo6NVwiLCBlbCl9XHJcbiAgICAgID5cclxuICAgICAgICB0ZXh0XHJcbiAgICAgICAgPHBvcHVwLWluZm9cclxuICAgICAgICAgIHJlZj17KGVsOiBIVE1MRWxlbWVudCkgPT4gY29uc29sZS5sb2coXCJzcGFuIGluIEJVVFRPTjo6cmVmOjo2XCIsIGVsKX1cclxuICAgICAgICA+XHJcbiAgICAgICAgICBibGFcclxuICAgICAgICA8L3BvcHVwLWluZm8+XHJcbiAgICAgICAgPHA+e251bX08L3A+XHJcbiAgICAgIDwvQnV0dG9uPlxyXG4gICAgICA8PlxyXG4gICAgICAgIHtmYWxzZX1cclxuICAgICAgICB7bnVsbH1cclxuICAgICAgICB7dW5kZWZpbmVkfVxyXG4gICAgICA8Lz5cclxuICAgICAgPD5cclxuICAgICAgICA8cD5CIEZyYWcgbGluZSAxPC9wPlxyXG4gICAgICAgIDxwPkIgRnJhZyBsaW5lIDI8L3A+XHJcbiAgICAgICAge3VuZGVmaW5lZH1cclxuICAgICAgICA8cD5CIEZyYWcgbGluZSAzKDQpPC9wPlxyXG4gICAgICAgIDxzdmdcclxuICAgICAgICAgIHZpZXdCb3g9XCIwIDAgMzAwIDEwMFwiXHJcbiAgICAgICAgICB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCJcclxuICAgICAgICAgIHN0cm9rZT1cInJlZFwiXHJcbiAgICAgICAgICBmaWxsPVwiZ3JleVwiXHJcbiAgICAgICAgPlxyXG4gICAgICAgICAgPGNpcmNsZSBjeD1cIjUwXCIgY3k9XCI1MFwiIHI9XCI0MFwiIC8+XHJcbiAgICAgICAgICA8Y2lyY2xlIGN4PVwiMTUwXCIgY3k9XCI1MFwiIHI9XCI0XCIgLz5cclxuXHJcbiAgICAgICAgICA8c3ZnIHZpZXdCb3g9XCIwIDAgMTAgMTBcIiB4PVwiMjAwXCIgd2lkdGg9XCIxMDBcIj5cclxuICAgICAgICAgICAgPGNpcmNsZSBjeD1cIjVcIiBjeT1cIjVcIiByPVwiNlwiIC8+XHJcbiAgICAgICAgICA8L3N2Zz5cclxuICAgICAgICA8L3N2Zz5cclxuICAgICAgICA8cD5CIEZyYWcgbGluZSA0KDYpPC9wPlxyXG4gICAgICA8Lz5cclxuICAgIDwvaDE+XHJcbiAgKTtcclxufVxyXG5jb25zdCBvYmogPSB7IGE6IDEgfTtcclxuXHJcbmZ1bmN0aW9uIG1hcmt1cDQobnVtOiBhbnkpIHtcclxuICBvYmouYSA9IG51bTtcclxuICByZXR1cm4gbnVtID09PSAxID8gKFxyXG4gICAgPGgxIG9iaj17b2JqfSBpZD17b2JqLmF9PlxyXG4gICAgICBvbGQtSGVhZGxpbmUge251bX1cclxuICAgIDwvaDE+XHJcbiAgKSA6IChcclxuICAgIDxoMSBvYmo9e29ian0gY2xhc3M9XCJhXCIgaWQ9e29iai5hfT5cclxuICAgICAgbmV3LUhlYWRsaW5lIHtudW19XHJcbiAgICA8L2gxPlxyXG4gICk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIG1hcmt1cChudW06IGFueSkge1xyXG4gIHJldHVybiBudW0gPT09IDEgPyAoXHJcbiAgICA8ZGl2PlxyXG4gICAgICA8PlxyXG4gICAgICAgIDxwPmZyYWcgLSBJPC9wPlxyXG4gICAgICAgIDxiPiBmcmFnIC0gSUk8L2I+XHJcbiAgICAgIDwvPlxyXG4gICAgPC9kaXY+XHJcbiAgKSA6IChcclxuICAgIDxoMSBjbGFzcz1cImFcIj5cclxuICAgICAge1wibmV3LUhlYWRsaW5lXCJ9IHtudW19XHJcbiAgICA8L2gxPlxyXG4gICk7XHJcbn1cclxuXHJcbi8vY29uc29sZS5sb2cobWFya3VwKTtcclxuLy93aW5kb3cubWFya3VwID0gbWFya3VwO1xyXG5cclxuY2xhc3MgUG9wVXBJbmZvIGV4dGVuZHMgSFRNTEVsZW1lbnQge1xyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgLy8gQWx3YXlzIGNhbGwgc3VwZXIgZmlyc3QgaW4gY29uc3RydWN0b3JcclxuICAgIHN1cGVyKCk7XHJcblxyXG4gICAgLy8gd3JpdGUgZWxlbWVudCBmdW5jdGlvbmFsaXR5IGluIGhlcmVcclxuXHJcbiAgICBjb25zb2xlLmxvZyhcIiMjIyMjIyMjIyMjIyMjIyMjY3RvciBDRVwiKTtcclxuICB9XHJcblxyXG4gIGNvbm5lY3RlZENhbGxiYWNrKCkge1xyXG4gICAgY29uc29sZS5sb2coXCIjIyMjIyMjIyMjIyMjIyMjI0N1c3RvbSBzcXVhcmUgZWxlbWVudCBhZGRlZCB0byBwYWdlLlwiKTtcclxuICB9XHJcbn1cclxuXHJcbmN1c3RvbUVsZW1lbnRzLmRlZmluZShcInBvcHVwLWluZm9cIiwgUG9wVXBJbmZvKTtcclxuXHJcbi8vZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNvbGRcIikhLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBjb25zb2xlLmxvZyk7XHJcblxyXG4vL2RvY3VtZW50LmJvZHkuaW5uZXJIVE1MID0gbWFya3VwO1xyXG4vLy8vcmVuZGVyKG1hcmt1cDMoMSksIGRvY3VtZW50LmJvZHkpO1xyXG4vL2RvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwib3V0ZXJcIik/LnNldEF0dHJpYnV0ZShcImRhdGEtZm9vXCIsIFwibW9kXCIpO1xyXG5cclxuLy9kb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImlubmVyXCIpPy5zZXRBdHRyaWJ1dGUoXCJkYXRhLWZvb1wiLCBcIm1vZFwiKTtcclxuLy9yZW5kZXIobWFya3VwKDIpLCBkb2N1bWVudC5ib2R5KTtcclxuLy9yZW5kZXIobWFya3VwLCBkb2N1bWVudC5ib2R5LCB0cnVlKTtcclxuY29uc3QgZWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI29sZFwiKTtcclxuZnVuY3Rpb24gQ29tcDIoKSB7XHJcbiAgcmV0dXJuIChcclxuICAgIDw+XHJcbiAgICAgIDxDb21wMyAvPlxyXG4gICAgICB7ZWx9XHJcbiAgICA8Lz5cclxuICApO1xyXG59XHJcbmZ1bmN0aW9uIENvbXAzKCkge1xyXG4gIHJldHVybiA8ZGl2PmNvbXAgY29udGVudDwvZGl2PjtcclxufVxyXG5cclxud2luZG93LnJlUmVuZGVyMSA9ICgpID0+XHJcbiAgcmVuZGVyKG1hcmt1cDMoMSksIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY29udGFpbmVyXCIpKTtcclxud2luZG93LnJlUmVuZGVyMiA9ICgpID0+XHJcbiAgcmVuZGVyKG1hcmt1cDMoMiksIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY29udGFpbmVyXCIpKTtcclxud2luZG93LnJlUmVuZGVyMyA9ICgpID0+XHJcbiAgcmVuZGVyKFxyXG4gICAgLy8gPGRpdj50eHQ8L2Rpdj5cclxuICAgIDxDb21wMiAvPixcclxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY29udGFpbmVyXCIpXHJcbiAgKTtcclxuXHJcbmNvbnNvbGUubG9nKFwiMTIzNDVcIik7XHJcbndpbmRvdy5zcyA9ICgpID0+IG1hcmt1cDMoMSkgKyBcIlwiO1xyXG53aW5kb3cuc3MyID0gKCkgPT4ge1xyXG4gIGNvbnNvbGUubG9nKG1hcmt1cDMoMSkpO1xyXG5cclxuICAvL2RvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY29udGFpbmVyXCIpLmlubmVySFRNTCA9IG1hcmt1cDMoMSk7XHJcbn07XHJcbiJdLCJzb3VyY2VSb290IjoiIn0=