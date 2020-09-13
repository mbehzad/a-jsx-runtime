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
} // jsx and Fragment will return objects which implement this interface


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
children, svgContext = false) {
  // fragment
  if (!tag) {
    const fragments = children.flat() // ?
    .map(item => item.asNode());
    const documentFragment = document.createDocumentFragment();
    documentFragment.append(...fragments);
    return [documentFragment, []];
  }

  const {
    ref,
    ...attrs
  } = props; // remember if the svg context was set for this node, and replace after generating all children
  // currently not supporting the `is` option for Customized built-in elements

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
  .map(child => child.asNode()));
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
  // @TODO:
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
    this.props = props;
    this.children = children.map(child => {
      if (Array.isArray(child)) return new FragmentVNode(child);
      if (child instanceof VNode) return child;
      if (child instanceof Node) return new LiveNodeVNode(child);
      if (!truthy(child)) return new NullVNode();
      return new TextVNode(child);
    });
    this.children.forEach(child => child.parent = this);
  }

  toString() {
    return asHtmlString(this.tag, this.props, this.children);
  }

  asNode() {
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
    console.log("svgContext:", this.tag, svgContext);
    const node = asNode(this.tag, this.props, this.children, this.svgContext)[0];
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
        // @TODO:
        if (key === "ref" && typeof value === "function") refsToCall.push(() => value(newNode.node));
        if (value === true) newNode.node.setAttribute(key, "");else if (value === null || value === undefined || value === false) newNode.node.removeAttribute(key);else newNode.node.setAttribute(key, value);
      }); // remove old, obsolate attributes

      Object.entries(this.props).filter(([k, _v]) => !newNode.props.hasOwnProperty(k)).forEach(([key, value]) => {
        // @TODO: remove dom props and event listeners
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
    return new ElementVNode({
      tag,
      props: attr,
      children
    }); // or simply pass cildren with props
  } else if (!truthy(attr)) {
    const vNode = new NullVNode(); //vNode.parent = this;

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
    let vTree = new RootVNode(markup, domNode);
    console.log("#################################\n", "vTree:", vTree);

    if (isReRender) {
      console.log("is re-render");
      const oldVTree = renderedVTrees.get(domNode);
      console.log("###########\n", {
        oldVTree,
        newVTree: vTree
      }); // was previously rendered as a subtree from another render

      if (oldVTree.type === "Element") {
        vTree = ElementVNode.fromExistingElementNode(oldVTree, [markup]);
        oldVTree.diffAndPatch(vTree); // update the children property in the memory reference from the previous render,
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

  }, _temp)(content);
} // gotchas:
// - styles will override (could do: setting each rule individually)

window.renderedVTrees = renderedVTrees;

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
      children: a && Object(C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("circle", {
        cx: "5",
        cy: "5",
        r: "6"
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

Object(C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["render"])(Object(C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("h2", {
  "class": "a",
  ref: console.warn,
  children: Object(C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])(C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["Fragment"], {
    children: [Object(C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("h1", {
      children: "heading"
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
  })
}), $container);

window.reRenderRef = function () {
  return Object(C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["render"])(Object(C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("h2", {
    "class": "a",
    ref: console.warn,
    children: "Heading with ref"
  }), $container);
};

window.reRender6a = function () {
  return Object(C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["render"])(markup6(), $container);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vanN4L2pzeC1ydW50aW1lLnRzIiwid2VicGFjazovLy8uL21haW4udHN4Il0sIm5hbWVzIjpbInJlbmRlcmVkVlRyZWVzIiwiV2Vha01hcCIsInJlZnNUb0NhbGwiLCJKc3hOb2RlIiwiY29uc3RydWN0b3IiLCJwcm9wcyIsImdldFBhcmVudEVsZW1lbnROb2RlIiwidk5vZGUiLCJwYXJlbnQiLCJub2RlIiwiZ2V0Q2hpbGRyZW5XaXRoTm9kZXMiLCJhbHdheXNBbGxvdyIsImNoaWxkcmVuIiwibWFwIiwiY2hpbGROb2RlIiwiZmxhdCIsIkluZmluaXR5IiwiZ2V0UGFyZW50QW5kTmV4dFNpYmxpbmciLCJwYXJlbnRXaXRoRWxlbWVudCIsInNpYmxpbmdzIiwicHJldlNpYmxpbmciLCJpbmRleE9mIiwibmV4dFNpYmxpbmdOb2RlIiwibmV4dFNpYmxpbmciLCJ0cnV0aHkiLCJ2YWx1ZSIsInVuZGVmaW5lZCIsInNhbml0aXplIiwidGV4dCIsImRpdiIsImRvY3VtZW50IiwiY3JlYXRlRWxlbWVudCIsImlubmVyVGV4dCIsImlubmVySFRNTCIsImdldE91dGVySHRtbCIsImVsZW1lbnQiLCJFbGVtZW50Iiwib3V0ZXJIVE1MIiwiVGV4dCIsIndob2xlVGV4dCIsIkRvY3VtZW50RnJhZ21lbnQiLCJBcnJheSIsImZyb20iLCJjaGlsZE5vZGVzIiwiZWwiLCJqb2luIiwiY29uc29sZSIsIndhcm4iLCJhc0h0bWxTdHJpbmciLCJ0YWciLCJhdHRyaWJ1dGVzIiwiT2JqZWN0IiwiZW50cmllcyIsImZpbHRlciIsImtleSIsInYiLCJrIiwiaXNBcnJheSIsImNvbnRlbnQiLCJjaGlsZCIsInRvU3RyaW5nIiwiYXNOb2RlIiwic3ZnQ29udGV4dCIsImZyYWdtZW50cyIsIml0ZW0iLCJkb2N1bWVudEZyYWdtZW50IiwiY3JlYXRlRG9jdW1lbnRGcmFnbWVudCIsImFwcGVuZCIsInJlZiIsImF0dHJzIiwiY3JlYXRlRWxlbWVudE5TIiwicHVzaCIsIl9rZXkiLCJmb3JFYWNoIiwic2V0QXR0cmlidXRlIiwiU3RyaW5nIiwic3RhcnRzV2l0aCIsImV2ZW50IiwicmVwbGFjZSIsImFkZEV2ZW50TGlzdGVuZXIiLCJjaGlsZEpzeE5vZGVzIiwiVk5vZGUiLCJpbnNlcnROZXdJdGVtIiwibmV3Tm9kZSIsImluc2VydEJlZm9yZSIsImRpZmZBbmRQYXRjaENoaWxkcmVuIiwib2xkTm9kZSIsIm9sZENoaWxkIiwiaXgiLCJuZXdDaGlsZCIsInJlbW92ZUZyb21ET00iLCJ0eXBlIiwiZGlmZkFuZFBhdGNoIiwibmV3SXRlbXMiLCJzbGljZSIsImxlbmd0aCIsIkVsZW1lbnRWTm9kZSIsIkZyYWdtZW50Vk5vZGUiLCJOb2RlIiwiTGl2ZU5vZGVWTm9kZSIsIk51bGxWTm9kZSIsIlRleHRWTm9kZSIsImxvZyIsInNldCIsInBhcmVudEVsZW1lbnQiLCJyZW1vdmVDaGlsZCIsInJlbW92ZUF0dHJpYnV0ZSIsIl92IiwiaGFzT3duUHJvcGVydHkiLCJyZXBsYWNlV2l0aCIsImZyb21FeGlzdGluZ0VsZW1lbnROb2RlIiwibmV3Vk5vZGUiLCJhc3NpZ24iLCJ0ZXh0Tm9kZSIsImNyZWF0ZVRleHROb2RlIiwibm9kZVZhbHVlIiwibmV3Tm9kZTIiLCJSb290Vk5vZGUiLCJkb21Ob2RlIiwicmVtb3ZlIiwiYXNWTm9kZSIsInJlc3VsdCIsImF0dHIiLCJqc3hzIiwiRnJhZ21lbnQiLCJqc3giLCJyZW5kZXIiLCJtYXJrdXAiLCJib2R5IiwicXVlcnlTZWxlY3RvckFsbCIsInN0eWxlIiwiYmFja2dyb3VuZCIsImlzUmVSZW5kZXIiLCJoYXMiLCJpbnNlcnRBZGphY2VudEhUTUwiLCJpbnNlcnRBZGphY2VudEVsZW1lbnQiLCJ2VHJlZSIsIm9sZFZUcmVlIiwiZ2V0IiwibmV3VlRyZWUiLCJzcGxpY2UiLCJFcnJvciIsInJhd0h0bWwiLCJ0ZW1wbGF0ZSIsIndpbmRvdyIsInhzcyIsIlJURSIsInR4dCIsIkJ1dHRvbiIsImRpc2FibGVkIiwicmVmbG9nIiwiU3BhbiIsIm1vZGUiLCJDb21wIiwibnVtIiwibWFya3VwMSIsIm1hcmt1cDIiLCJOTCIsIm1hcmt1cDMiLCJpbmZvIiwib2JqIiwiYSIsIm1hcmt1cDQiLCJtYXJrdXA1IiwibWFya3VwNiIsIlBvcFVwSW5mbyIsIkhUTUxFbGVtZW50IiwiY3VzdG9tRWxlbWVudHMiLCJkZWZpbmUiLCJxdWVyeVNlbGVjdG9yIiwiQ29tcDIiLCJDb21wMyIsIiRjb250YWluZXIiLCJnZXRFbGVtZW50QnlJZCIsInJlUmVuZGVyMSIsInJlUmVuZGVyMiIsInJlUmVuZGVyMyIsInNzIiwic3MyIiwicmVSZW5kZXI1YSIsInJlUmVuZGVyNWIiLCJyZVJlbmRlclJlZiIsInJlUmVuZGVyNmEiLCJyZVJlbmRlcjZiIiwicmVSZW5kZXJTdmciLCJyZVJlbmRlclN2ZzIiXSwibWFwcGluZ3MiOiI7UUFBQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7UUFDMUU7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSx3REFBd0Qsa0JBQWtCO1FBQzFFO1FBQ0EsaURBQWlELGNBQWM7UUFDL0Q7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLHlDQUF5QyxpQ0FBaUM7UUFDMUUsZ0hBQWdILG1CQUFtQixFQUFFO1FBQ3JJO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMkJBQTJCLDBCQUEwQixFQUFFO1FBQ3ZELGlDQUFpQyxlQUFlO1FBQ2hEO1FBQ0E7UUFDQTs7UUFFQTtRQUNBLHNEQUFzRCwrREFBK0Q7O1FBRXJIO1FBQ0E7OztRQUdBO1FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNsRkE7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QUUsRUFBQyxHQUFsQjtBQUFzQixLQUFDLEVBQUM7QUFBeEIsSUFBRixFQUFtQ2hHLFFBQVEsQ0FBQytJLGNBQVQsQ0FBd0IsTUFBeEIsQ0FBbkMsQ0FBWjtBQUFBLENBQXBCOztBQUNBN0IsTUFBTSxDQUFDd0MsV0FBUCxHQUFxQjtBQUFBLFNBQU0xRCxtRkFBTSxDQUFDNkIsT0FBTyxFQUFSLEVBQVdpQixVQUFYLENBQVo7QUFBQSxDQUFyQjs7QUFDQTVCLE1BQU0sQ0FBQ3lDLFlBQVAsR0FBc0I7QUFBQSxTQUFNM0QsbUZBQU0sQ0FBQzZCLE9BQU8sRUFBUixFQUFXaUIsVUFBWCxDQUFaO0FBQUEsQ0FBdEIsQyIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDApO1xuIiwiY29uc3QgcmVuZGVyZWRWVHJlZXMgPSBuZXcgV2Vha01hcDxIVE1MRWxlbWVudCwgUm9vdFZOb2RlPigpO1xyXG5jb25zdCByZWZzVG9DYWxsOiBBcnJheTwoKSA9PiB2b2lkPiA9IFtdO1xyXG5cclxuLyoqXHJcbiAqIHByb3ZpZGVzIGZ1bmN0aW9ucyBuZWVkZWQgYnkgYmFiZWwgZm9yIGEgY3VzdG9tIHByYWdtYVxyXG4gKiB0byByZW5kZXIgcGFyc2VkIGpzeCBjb2RlIHRvIGh0bWxcclxuICovXHJcblxyXG4vLyBwcm9wcyB3aGljaCB3aWxsIGJlIHJlbmRlcmVkIGFzIGF0dHJpYnV0ZXNcclxuLy8gRnVuY3Rpb25zIHdpbGwgYmUgdXNlZCBmb3IgZXZlbnQgbGlzdGVuZXJzLiAod2l0aCBhdHRyaWJ1dGUgbmFtZSBzdGFydGluZyB3aXRoICdvbi0nKVxyXG50eXBlIEF0dHJpYnV0ZXMgPSB7IFtrZXk6IHN0cmluZ106IHN0cmluZyB8IGJvb2xlYW4gfCBudW1iZXIgfCBGdW5jdGlvbiB9O1xyXG5cclxuLy8gYWRkaXRpb25hbCBhdHRyaWJ1dGVzIHdoaWNoIGNhbiBoYXZlIGFkZGl0aW9uYWwgc2VyaWFsaXphdGlvbiBiZWZvcmUgcmVuZGVyaW5nIGFzIGF0dHJpYnV0ZXNcclxudHlwZSBTcGVjaWFsQXR0cmlidXRlcyA9IHtcclxuICBjbGFzcz86IHN0cmluZyB8IHN0cmluZ1tdO1xyXG4gIHN0eWxlPzogc3RyaW5nIHwgeyBba2V5OiBzdHJpbmddOiBzdHJpbmcgfTtcclxuICByZWY/OiBGdW5jdGlvbjtcclxufTtcclxuXHJcbi8vIGNoaWxkIGVsZW1lbnRzIGluIHRoZSBqc3ggbWFya3VwIHdoaWNoIHdpbGwgYmUgcGFzc2VkIHRvIHRoZSBoIGZ1bmN0aW9uIGFzIGBwcm9wcy5jaGlsZHJlbmBcclxudHlwZSBDaGlsZHJlblByb3BzID0ge1xyXG4gIC8vIG5lc3RlZCBhcnJheSBpbiBjYXNlIG9mXHJcbiAgLy8gPGVsZW0+XHJcbiAgLy8gICA8c3Bhbi8+XHJcbiAgLy8gICB7Y2hpbGRyZW59XHJcbiAgLy8gICA8ZGl2Lz5cclxuICAvLyA8L2VsZW0+XHJcbiAgY2hpbGRyZW46IEFycmF5PFxyXG4gICAgTm9kZSB8IEpzeE5vZGVJbnRlcmZhY2UgfCBzdHJpbmcgfCBBcnJheTxOb2RlIHwgSnN4Tm9kZUludGVyZmFjZSB8IHN0cmluZz5cclxuICA+O1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIHByb3BzIG9iamVjdCB3aGljaCB3aWxsIGJlIHBhc3NlZCB0byBqc3ggcHJhZ21hIGFuZCBjdXN0b20gY29tcG9uZW50IGZ1bmN0aW9uc1xyXG4gKi9cclxudHlwZSBKc3hQcm9wcyA9IEF0dHJpYnV0ZXMgJiBTcGVjaWFsQXR0cmlidXRlcyAmIENoaWxkcmVuUHJvcHM7XHJcblxyXG4vLyBiYXNlIGNsYXNzIHdoaWNoIHdpbGwgYmUgaW5oZXJpdGVkIGZyb20ganN4IGFuZCBmcmFnbWVudHMgZnVuY3Rpb24gbm9kZSBnZW5lcmF0aW9uXHJcbi8vIGFuZCB3aWxsIGJlIHVzZWQgdG8gZGlzdGluZ3Vpc2ggdGhlbSB3aXRoIG90aGVyIEVsZW1lbnRzXHJcbmNsYXNzIEpzeE5vZGUge1xyXG4gIHByb3BzOiBKc3hQcm9wcztcclxuICBjb25zdHJ1Y3Rvcihwcm9wczogSnN4UHJvcHMpIHtcclxuICAgIHRoaXMucHJvcHMgPSBwcm9wcztcclxuICB9XHJcbn1cclxuXHJcbi8vIG51bGwgd2hlbiBjaGVja2luZyB0aGUgcGFyZW50IHdoZW4gcm9vdCBpcyBmcmFnbWVudCBpdHNlbGZcclxuZnVuY3Rpb24gZ2V0UGFyZW50RWxlbWVudE5vZGUodk5vZGU6IFZOb2RlSW50ZXJmYWNlKTogRWxlbWVudFZOb2RlIHtcclxuICB3aGlsZSAodk5vZGUucGFyZW50KSB7XHJcbiAgICB2Tm9kZSA9IHZOb2RlLnBhcmVudDtcclxuICAgIC8vIGAubm9kZWAgaXMgb25seSBvbiBcIlRleHRcIiBhbmQgXCJFbGVtZW50XCIsIFwiUmF3SHRtbFwiIHR5cGUgVk5vZGUsIGFuZCBvbmx5IEVsZW1lbnQgaGFzIGNoaWxkcmVuXHJcbiAgICBpZiAodk5vZGUubm9kZSkgYnJlYWs7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gKHZOb2RlIGFzIHVua25vd24pIGFzIEVsZW1lbnRWTm9kZTtcclxufVxyXG5cclxuZnVuY3Rpb24gZ2V0Q2hpbGRyZW5XaXRoTm9kZXMoXHJcbiAgdk5vZGU6IFZOb2RlSW50ZXJmYWNlLFxyXG4gIGFsd2F5c0FsbG93PzogVk5vZGVJbnRlcmZhY2VcclxuKTogVk5vZGVJbnRlcmZhY2VbXSB7XHJcbiAgdk5vZGUuY2hpbGRyZW47XHJcbiAgcmV0dXJuIHZOb2RlLmNoaWxkcmVuXHJcbiAgICAubWFwKChjaGlsZE5vZGUpID0+IHtcclxuICAgICAgaWYgKGNoaWxkTm9kZSA9PT0gYWx3YXlzQWxsb3cpIHJldHVybiBjaGlsZE5vZGU7XHJcbiAgICAgIGlmIChjaGlsZE5vZGUubm9kZSkgcmV0dXJuIGNoaWxkTm9kZTtcclxuICAgICAgcmV0dXJuIGdldENoaWxkcmVuV2l0aE5vZGVzKGNoaWxkTm9kZSwgYWx3YXlzQWxsb3cpO1xyXG4gICAgfSlcclxuICAgIC5mbGF0KEluZmluaXR5KSBhcyBWTm9kZUludGVyZmFjZVtdO1xyXG59XHJcblxyXG5mdW5jdGlvbiBnZXRQYXJlbnRBbmROZXh0U2libGluZyh2Tm9kZTogVk5vZGVJbnRlcmZhY2UpOiBbTm9kZSwgTm9kZSB8IG51bGxdIHtcclxuICAvLyBub2RlIGFuY2VzdG9yIHdpdGggRWxlbWVudCxcclxuICBjb25zdCBwYXJlbnRXaXRoRWxlbWVudCA9IGdldFBhcmVudEVsZW1lbnROb2RlKHZOb2RlKTtcclxuICBjb25zdCBzaWJsaW5ncyA9IGdldENoaWxkcmVuV2l0aE5vZGVzKHBhcmVudFdpdGhFbGVtZW50LCB2Tm9kZSk7XHJcbiAgY29uc3QgcHJldlNpYmxpbmcgPSBzaWJsaW5nc1tzaWJsaW5ncy5pbmRleE9mKHZOb2RlKSAtIDFdO1xyXG4gIGNvbnN0IG5leHRTaWJsaW5nTm9kZSA9IHByZXZTaWJsaW5nID8gcHJldlNpYmxpbmcubm9kZSEubmV4dFNpYmxpbmcgOiBudWxsO1xyXG5cclxuICByZXR1cm4gW3BhcmVudFdpdGhFbGVtZW50Lm5vZGUsIG5leHRTaWJsaW5nTm9kZV07XHJcbn1cclxuXHJcbi8vIGpzeCBhbmQgRnJhZ21lbnQgd2lsbCByZXR1cm4gb2JqZWN0cyB3aGljaCBpbXBsZW1lbnQgdGhpcyBpbnRlcmZhY2VcclxuZXhwb3J0IGludGVyZmFjZSBKc3hOb2RlSW50ZXJmYWNlIGV4dGVuZHMgSnN4Tm9kZSB7XHJcbiAgdG9TdHJpbmcoKTogc3RyaW5nO1xyXG4gIGFzTm9kZSgpOiBOb2RlO1xyXG4gIGFzVk5vZGUoKTogVk5vZGU7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiByZXR1cm5zIHRydWUgaWYgbm90IG51bGxpc2ggb3IgZmFsc2VcclxuICogdGhhdCBtZWFucyAwIG9yIGVtcHR5IHN0cmluZyBhcmUgYWxsb3dlZFxyXG4gKiBAcGFyYW0geyp9IHZhbFxyXG4gKi9cclxuZnVuY3Rpb24gdHJ1dGh5KHZhbHVlOiBhbnkpOiBib29sZWFuIHtcclxuICByZXR1cm4gdmFsdWUgIT09IGZhbHNlICYmIHZhbHVlICE9PSBudWxsICYmIHZhbHVlICE9PSB1bmRlZmluZWQ7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBlc2NhcGVzIHRoZSBwcm92aWRlZCBzdHJpbmcgYWdhaW5zdCB4c3MgYXR0YWNrcyBldGNcclxuICpcclxuICogQHBhcmFtIHtzdHJpbmd9IHRleHRcclxuICogQHJldHVybnMge3N0cmluZ31cclxuICovXHJcbmZ1bmN0aW9uIHNhbml0aXplKHRleHQ6IHN0cmluZyk6IHN0cmluZyB7XHJcbiAgY29uc3QgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICBkaXYuaW5uZXJUZXh0ID0gdGV4dDtcclxuICByZXR1cm4gZGl2LmlubmVySFRNTDtcclxufVxyXG5cclxuLyoqXHJcbiAqIGJhc2ljYWxseSBgRWxlbWVudC5vdXRlckhUTUxgIGJ1dCBhbHNvIHN1cHBvcnRzIFRleHQgbm9kZSBhbmQgRG9jdW1lbnRGcmFnbWVudFxyXG4gKiBAcGFyYW0gZWxlbWVudCB7Tm9kZX0gLSBlbGVtZW50IHdoaWNoIGl0cyBodG1sIG5lZWRzIHRvIGJlIHJldHVybmVkXHJcbiAqL1xyXG5mdW5jdGlvbiBnZXRPdXRlckh0bWwoZWxlbWVudDogTm9kZSk6IHN0cmluZyB7XHJcbiAgaWYgKGVsZW1lbnQgaW5zdGFuY2VvZiBFbGVtZW50KSByZXR1cm4gZWxlbWVudC5vdXRlckhUTUw7XHJcbiAgaWYgKGVsZW1lbnQgaW5zdGFuY2VvZiBUZXh0KSByZXR1cm4gc2FuaXRpemUoZWxlbWVudC53aG9sZVRleHQpO1xyXG4gIGlmIChlbGVtZW50IGluc3RhbmNlb2YgRG9jdW1lbnRGcmFnbWVudClcclxuICAgIHJldHVybiBBcnJheS5mcm9tKGVsZW1lbnQuY2hpbGROb2RlcylcclxuICAgICAgLm1hcCgoZWwpID0+IGdldE91dGVySHRtbChlbCkpXHJcbiAgICAgIC5qb2luKFwiXCIpO1xyXG5cclxuICAvLyBzaG91bGRuJ3QgcmVhY2ggdGhpcyBwb2ludFxyXG4gIGNvbnNvbGUud2FybihcImdldE91dGVySHRtbCBkb2VzIG5vdCBzdXBwb3J0IHRoaXMgdHlwZSBvZiBlbGVtZW50XCIsIGVsZW1lbnQpO1xyXG4gIHJldHVybiBcIlwiO1xyXG59XHJcblxyXG4vKipcclxuICogZ2VuZXJhdGVzIHRoZSBodG1sIGFzIGEgc3RyaW5nIHdoaWNoIGNhbiBiZSB1c2VkIGZvciBleGFtcGxlIHdpdGggYGVsZW1lbnQuaW5uZXJIVE1MKClgXHJcbiAqXHJcbiAqIEBwYXJhbSB0YWcge3N0cmluZ3xGdW5jdGlvbn0gLSB0YWcgYXJndW1lbnQgb2YgdGhlIGpzeCBjYWxsXHJcbiAqIEBwYXJhbSBwcm9wcyB7T2JqZWN0fSAtIHByb3BzIGFyZ3VtZW50IG9mIGpzeCBjYWxsXHJcbiAqL1xyXG5mdW5jdGlvbiBhc0h0bWxTdHJpbmcodGFnOiBzdHJpbmcgfCBGdW5jdGlvbiwgcHJvcHM6IEpzeFByb3BzLCBjaGlsZHJlbikge1xyXG4gIGNvbnN0IGF0dHJpYnV0ZXMgPSBPYmplY3QuZW50cmllcyhwcm9wcylcclxuICAgIC5maWx0ZXIoKFssIHZhbHVlXSkgPT4gdHJ1dGh5KHZhbHVlKSlcclxuICAgIC5tYXAoKFtrZXksIHZhbHVlXSkgPT4ge1xyXG4gICAgICAvLyBlLmcuIGRpc2FibGVkOiB0cnVlID0+IDx0YWcgZGlzYWJsZWQ+XHJcbiAgICAgIGlmICh2YWx1ZSA9PT0gdHJ1ZSkgcmV0dXJuIGtleTtcclxuXHJcbiAgICAgIC8vIGZvciBzdHlsZSBhcyBvYmplY3Q6XHJcbiAgICAgIC8vIChzdHlsZTopIHtkaXNwbGF5OiBcIm5vbmVcIiwgcG9zaXRpb246IFwiYWJzb2x1dGVcIn0gPT0+ICdkaXNwbGF5OiBub25lOyBwb3NpdGlvbjogYWJzb2x1dGU7J1xyXG4gICAgICBpZiAoa2V5ID09PSBcInN0eWxlXCIgJiYgdHlwZW9mIHZhbHVlID09PSBcIm9iamVjdFwiKVxyXG4gICAgICAgIHZhbHVlID0gT2JqZWN0LmVudHJpZXModmFsdWUpXHJcbiAgICAgICAgICAvLyBpZ25vcmUgc3R1ZmYgbGlrZSBge2JhY2tncm91bmQ6IGFjdGl2ZSAmJiBcInJlZFwifWAgd2hlbiBgYWN0aXZlID09PSBmYWxzZSAvIG51bGwgLyB1bmRlZmluZWRgXHJcbiAgICAgICAgICAuZmlsdGVyKChbLCB2XSkgPT4gdHJ1dGh5KHYpKVxyXG4gICAgICAgICAgLy8gY3VycmVudGx5IHN1cHBvcnRzIFwiYmFja2dyb3VuZC1jb2xvclwiIG5vdCBcImJhY2tncm91bmRDb2xvclwiXHJcbiAgICAgICAgICAubWFwKChbaywgdl0pID0+IGAke2t9OiAke3Z9YClcclxuICAgICAgICAgIC5qb2luKFwiOyBcIik7XHJcblxyXG4gICAgICAvLyAoY2xhc3M6KSBbXCJidG5cIiwgXCJyZWRcIl0gPT0+IFwiYnRuIHJlZFwiXHJcbiAgICAgIGlmIChrZXkgPT09IFwiY2xhc3NcIiAmJiBBcnJheS5pc0FycmF5KHZhbHVlKSkgdmFsdWUgPSB2YWx1ZS5qb2luKFwiIFwiKTtcclxuXHJcbiAgICAgIHJldHVybiBgJHtrZXl9PVwiJHt2YWx1ZX1cImA7XHJcbiAgICB9KVxyXG4gICAgLmpvaW4oXCIgXCIpO1xyXG5cclxuICBjb25zdCBjb250ZW50ID0gY2hpbGRyZW4ubWFwKChjaGlsZCkgPT4gY2hpbGQudG9TdHJpbmcoKSkuam9pbihcIlwiKTtcclxuXHJcbiAgcmV0dXJuIGA8JHt0YWd9ICR7YXR0cmlidXRlc30+JHtjb250ZW50fTwvJHt0YWd9PmA7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBnZW5lcmF0ZXMgSFRNTCBOb2RlIGVsZW1lbnRzIGZyb20gdGhlIHByb3ZpZGVkIGpzeCB0cmVlXHJcbiAqIEBwYXJhbSB0YWcge3N0cmluZ3xGdW5jdGlvbn0gLSB0YWcgYXJndW1lbnQgb2YgdGhlIGpzeCBjYWxsXHJcbiAqIEBwYXJhbSBwcm9wcyB7T2JqZWN0fSAtIHByb3BzIGFyZ3VtZW50IG9mIGpzeCBjYWxsXHJcbiAqL1xyXG5mdW5jdGlvbiBhc05vZGUoXHJcbiAgdGFnOiBzdHJpbmcgfCBGdW5jdGlvbiB8IHVuZGVmaW5lZCxcclxuICBwcm9wczogQXR0cmlidXRlcyAmIFNwZWNpYWxBdHRyaWJ1dGVzLCAvL0pzeFByb3BzLFxyXG4gIGNoaWxkcmVuOiBhbnlbXSxcclxuICBzdmdDb250ZXh0ID0gZmFsc2VcclxuKTogW05vZGUsIEpzeE5vZGVJbnRlcmZhY2VbXV0ge1xyXG4gIC8vIGZyYWdtZW50XHJcbiAgaWYgKCF0YWcpIHtcclxuICAgIGNvbnN0IGZyYWdtZW50cyA9IGNoaWxkcmVuXHJcbiAgICAgIC5mbGF0KCkgLy8gP1xyXG4gICAgICAubWFwKChpdGVtKSA9PiBpdGVtLmFzTm9kZSgpKTtcclxuXHJcbiAgICBjb25zdCBkb2N1bWVudEZyYWdtZW50ID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO1xyXG5cclxuICAgIGRvY3VtZW50RnJhZ21lbnQuYXBwZW5kKC4uLmZyYWdtZW50cyk7XHJcbiAgICByZXR1cm4gW2RvY3VtZW50RnJhZ21lbnQsIFtdXTtcclxuICB9XHJcblxyXG4gIGNvbnN0IHsgcmVmLCAuLi5hdHRycyB9ID0gcHJvcHM7XHJcblxyXG4gIC8vIHJlbWVtYmVyIGlmIHRoZSBzdmcgY29udGV4dCB3YXMgc2V0IGZvciB0aGlzIG5vZGUsIGFuZCByZXBsYWNlIGFmdGVyIGdlbmVyYXRpbmcgYWxsIGNoaWxkcmVuXHJcblxyXG4gIC8vIGN1cnJlbnRseSBub3Qgc3VwcG9ydGluZyB0aGUgYGlzYCBvcHRpb24gZm9yIEN1c3RvbWl6ZWQgYnVpbHQtaW4gZWxlbWVudHNcclxuICBjb25zdCBub2RlID0gc3ZnQ29udGV4dFxyXG4gICAgPyBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoXCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiLCB0YWcpXHJcbiAgICA6IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodGFnKTtcclxuXHJcbiAgLy8gY3VycmVudGx5IG9ubHkgc3VwcG9ydGluZyByZWYgb24gaHRtbCBlbGVtZW50cy4gbm90IHRlbXBsYXRlIGZ1bmN0aW9uc1xyXG4gIGlmICh0eXBlb2YgcmVmID09PSBcImZ1bmN0aW9uXCIpIHtcclxuICAgIHJlZnNUb0NhbGwucHVzaCgoKSA9PiByZWYobm9kZSkpO1xyXG4gIH1cclxuXHJcbiAgT2JqZWN0LmVudHJpZXMoYXR0cnMpXHJcbiAgICAuZmlsdGVyKChbX2tleSwgdmFsdWVdKSA9PiB0cnV0aHkodmFsdWUpKVxyXG4gICAgLmZvckVhY2goKFtrZXksIHZhbHVlXSkgPT4ge1xyXG4gICAgICAvLyBmb3Igc3R5bGUgYXMgb2JqZWN0OlxyXG4gICAgICAvLyAoc3R5bGU6KSB7ZGlzcGxheTogXCJub25lXCIsIHBvc2l0aW9uOiBcImFic29sdXRlXCJ9ID09PiAnZGlzcGxheTogbm9uZTsgcG9zaXRpb246IGFic29sdXRlOydcclxuICAgICAgaWYgKGtleSA9PT0gXCJzdHlsZVwiICYmIHR5cGVvZiB2YWx1ZSA9PT0gXCJvYmplY3RcIilcclxuICAgICAgICB2YWx1ZSA9IE9iamVjdC5lbnRyaWVzKHZhbHVlKVxyXG4gICAgICAgICAgLmZpbHRlcigoWywgdl0pID0+IHRydXRoeSh2KSlcclxuICAgICAgICAgIC5tYXAoKFtrLCB2XSkgPT4gYCR7a306ICR7dn1gKVxyXG4gICAgICAgICAgLmpvaW4oXCI7IFwiKTtcclxuXHJcbiAgICAgIC8vIChjbGFzczopIFtcImJ0blwiLCBcInJlZFwiXSA9PT4gXCJidG4gcmVkXCJcclxuICAgICAgaWYgKGtleSA9PT0gXCJjbGFzc1wiICYmIEFycmF5LmlzQXJyYXkodmFsdWUpKSB2YWx1ZSA9IHZhbHVlLmpvaW4oXCIgXCIpO1xyXG5cclxuICAgICAgaWYgKHZhbHVlID09PSB0cnVlKSBub2RlLnNldEF0dHJpYnV0ZShrZXksIFwiXCIpO1xyXG4gICAgICBlbHNlIGlmICh0eXBlb2YgdmFsdWUgPT09IFwic3RyaW5nXCIgfHwgdHlwZW9mIHZhbHVlID09PSBcIm51bWJlclwiKVxyXG4gICAgICAgIG5vZGUuc2V0QXR0cmlidXRlKGtleSwgU3RyaW5nKHZhbHVlKSk7XHJcbiAgICAgIC8vIGtleSBoYXMgdGhlIGZvcm0gb2YgXCJvbi1jaGFuZ2VcIi4gdmFsdWUgaXMgdGhlIGNhbGxiYWNrIGZ1bmN0aW9uIG9yIGFuIG9iamVjdCBpbXBsZW1lbnRpbmcge0V2ZW50TGlzdGVuZXJ9IGludGVyZmFjZVxyXG4gICAgICBlbHNlIGlmIChcclxuICAgICAgICBrZXkuc3RhcnRzV2l0aChcIm9uLVwiKSAmJlxyXG4gICAgICAgICh0eXBlb2YgdmFsdWUgPT09IFwiZnVuY3Rpb25cIiB8fCB0eXBlb2YgdmFsdWUgPT09IFwib2JqZWN0XCIpXHJcbiAgICAgICkge1xyXG4gICAgICAgIC8vIHJlbW92ZSBsZWFkaW5nIFwib24tXCJcIlxyXG4gICAgICAgIGNvbnN0IGV2ZW50ID0ga2V5LnJlcGxhY2UoL15vbi0vLCBcIlwiKTtcclxuXHJcbiAgICAgICAgbm9kZS5hZGRFdmVudExpc3RlbmVyKFxyXG4gICAgICAgICAgZXZlbnQsXHJcbiAgICAgICAgICB2YWx1ZSBhcyBFdmVudExpc3RlbmVyT3JFdmVudExpc3RlbmVyT2JqZWN0XHJcbiAgICAgICAgKTtcclxuICAgICAgfVxyXG4gICAgICAvLyBAdHMtaWdub3JlIC0gcHJvdmlkaW5nIHRoZSB2YWx1ZSBhcyBwcm9wZXJ0eSB0byBodG1sIGVsZW1lbnRcclxuICAgICAgZWxzZSBub2RlW2tleV0gPSB2YWx1ZTtcclxuICAgIH0pO1xyXG5cclxuICAvLyByZXR1cm5zIGNoaWxkIGpzeCBub2RlcyBhcyB3ZWxsIHRvIGJlIHVzZWQgZHVyaW5nIHRoZSByZWYgY2FsbFxyXG4gIGNvbnN0IGNoaWxkSnN4Tm9kZXMgPSBjaGlsZHJlbi5maWx0ZXIoKGNoaWxkKSA9PiBjaGlsZCBpbnN0YW5jZW9mIFZOb2RlKTtcclxuXHJcbiAgbm9kZS5hcHBlbmQoXHJcbiAgICAuLi5jaGlsZHJlblxyXG4gICAgICAvLy5mbGF0KClcclxuICAgICAgLm1hcCgoY2hpbGQpID0+IGNoaWxkLmFzTm9kZSgpKVxyXG4gICk7XHJcblxyXG4gIHJldHVybiBbbm9kZSwgY2hpbGRKc3hOb2RlcyBhcyBKc3hOb2RlSW50ZXJmYWNlW11dO1xyXG59XHJcblxyXG5mdW5jdGlvbiBpbnNlcnROZXdJdGVtKG5ld05vZGU6IFZOb2RlSW50ZXJmYWNlKSB7XHJcbiAgY29uc3QgW3BhcmVudCwgbmV4dFNpYmxpbmddID0gZ2V0UGFyZW50QW5kTmV4dFNpYmxpbmcobmV3Tm9kZSk7XHJcbiAgcGFyZW50Lmluc2VydEJlZm9yZShuZXdOb2RlLmFzTm9kZSgpLCBuZXh0U2libGluZyk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGRpZmZBbmRQYXRjaENoaWxkcmVuKFxyXG4gIG9sZE5vZGU6IFZOb2RlSW50ZXJmYWNlLFxyXG4gIG5ld05vZGU6IFZOb2RlSW50ZXJmYWNlXHJcbikge1xyXG4gIG9sZE5vZGUuY2hpbGRyZW4uZm9yRWFjaCgob2xkQ2hpbGQsIGl4KSA9PiB7XHJcbiAgICBjb25zdCBuZXdDaGlsZCA9IG5ld05vZGUuY2hpbGRyZW5baXhdO1xyXG4gICAgLy8gY2hpbGQgd2FzIHJlbW92ZWRcclxuICAgIGlmICghbmV3Q2hpbGQpIG9sZENoaWxkLnJlbW92ZUZyb21ET00oKTtcclxuICAgIC8vIGNoaWxkIGlzIG1vZGlmaWVkXHJcbiAgICBlbHNlIGlmIChuZXdDaGlsZC50eXBlID09PSBvbGRDaGlsZC50eXBlKSBvbGRDaGlsZC5kaWZmQW5kUGF0Y2gobmV3Q2hpbGQpO1xyXG4gICAgLy8gY2hpbGQgaXMgcmVwbGFjZWRcclxuICAgIGVsc2Uge1xyXG4gICAgICBvbGRDaGlsZC5yZW1vdmVGcm9tRE9NKCk7XHJcbiAgICAgIGluc2VydE5ld0l0ZW0obmV3Q2hpbGQpO1xyXG4gICAgfVxyXG4gIH0pO1xyXG5cclxuICAvLyBuZXcgYWRkaXRpb24gaXRlbXNcclxuICBjb25zdCBuZXdJdGVtcyA9IG5ld05vZGUuY2hpbGRyZW4uc2xpY2Uob2xkTm9kZS5jaGlsZHJlbi5sZW5ndGgpO1xyXG4gIGlmIChuZXdJdGVtcy5sZW5ndGgpIHtcclxuICAgIGNvbnN0IGRvY3VtZW50RnJhZ21lbnQgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XHJcbiAgICBuZXdJdGVtcy5mb3JFYWNoKChpdGVtKSA9PiBkb2N1bWVudEZyYWdtZW50LmFwcGVuZChpdGVtLmFzTm9kZSgpKSk7XHJcblxyXG4gICAgY29uc3QgW3BhcmVudCwgbmV4dFNpYmxpbmddID0gZ2V0UGFyZW50QW5kTmV4dFNpYmxpbmcobmV3SXRlbXNbMF0pO1xyXG4gICAgcGFyZW50Lmluc2VydEJlZm9yZShkb2N1bWVudEZyYWdtZW50LCBuZXh0U2libGluZyk7XHJcbiAgfVxyXG59XHJcblxyXG5jbGFzcyBWTm9kZSB7fVxyXG5cclxuaW50ZXJmYWNlIFZOb2RlSW50ZXJmYWNlIHtcclxuICB0b1N0cmluZygpOiBzdHJpbmc7XHJcbiAgYXNOb2RlKCk6IE5vZGU7XHJcbiAgcGFyZW50OiBWTm9kZUludGVyZmFjZSB8IG51bGw7XHJcbiAgY2hpbGRyZW46IEFycmF5PFZOb2RlSW50ZXJmYWNlIHwgbmV2ZXI+O1xyXG4gIHR5cGU6IHN0cmluZztcclxuICBub2RlPzogQ2hpbGROb2RlO1xyXG4gIHJlbW92ZUZyb21ET00oKTogdm9pZDtcclxuICBkaWZmQW5kUGF0Y2gobmV3Tm9kZTogVk5vZGVJbnRlcmZhY2UpOiB2b2lkO1xyXG59XHJcblxyXG5jbGFzcyBFbGVtZW50Vk5vZGUgZXh0ZW5kcyBWTm9kZSBpbXBsZW1lbnRzIFZOb2RlSW50ZXJmYWNlIHtcclxuICB0eXBlID0gXCJFbGVtZW50XCI7XHJcbiAgdGFnOiBzdHJpbmc7XHJcbiAgcHJvcHM6IE9iamVjdDsgLy8gQFRPRE86XHJcbiAgbm9kZTogSFRNTEVsZW1lbnQgPSBudWxsIGFzIGFueTtcclxuICBjaGlsZHJlbjogVk5vZGVJbnRlcmZhY2VbXTtcclxuICBwYXJlbnQ6IFZOb2RlSW50ZXJmYWNlID0gbnVsbCBhcyBhbnk7XHJcbiAgc3ZnQ29udGV4dDogYm9vbGVhbiA9IGZhbHNlOyAvLyB3aWxsIGJlIHNldCB0byB0cnVlIHdoZW4gZWxlbWVudCBpcyBhbiBTVkcgRWxlbWVudFxyXG5cclxuICBjb25zdHJ1Y3Rvcih7XHJcbiAgICB0YWcsXHJcbiAgICBwcm9wcyxcclxuICAgIGNoaWxkcmVuLFxyXG5cclxuICB9OiB7XHJcbiAgICB0YWc6IHN0cmluZztcclxuICAgIHByb3BzOiBSZWNvcmQ8c3RyaW5nLCBhbnk+O1xyXG4gICAgY2hpbGRyZW46IEFycmF5PFZOb2RlSW50ZXJmYWNlIHwgVk5vZGVJbnRlcmZhY2VbXT47XHJcbiAgfSkge1xyXG4gICAgc3VwZXIoKTtcclxuICAgIHRoaXMudGFnID0gdGFnO1xyXG4gICAgdGhpcy5wcm9wcyA9IHByb3BzO1xyXG5cclxuICAgIHRoaXMuY2hpbGRyZW4gPSBjaGlsZHJlbi5tYXAoKGNoaWxkKSA9PiB7XHJcbiAgICAgIGlmIChBcnJheS5pc0FycmF5KGNoaWxkKSkgcmV0dXJuIG5ldyBGcmFnbWVudFZOb2RlKGNoaWxkKTtcclxuICAgICAgaWYgKGNoaWxkIGluc3RhbmNlb2YgVk5vZGUpIHJldHVybiBjaGlsZDtcclxuICAgICAgaWYgKGNoaWxkIGluc3RhbmNlb2YgTm9kZSkgcmV0dXJuIG5ldyBMaXZlTm9kZVZOb2RlKGNoaWxkKTtcclxuICAgICAgaWYgKCF0cnV0aHkoY2hpbGQpKSByZXR1cm4gbmV3IE51bGxWTm9kZSgpO1xyXG5cclxuICAgICAgcmV0dXJuIG5ldyBUZXh0Vk5vZGUoY2hpbGQpO1xyXG4gICAgfSk7XHJcbiAgICB0aGlzLmNoaWxkcmVuLmZvckVhY2goKGNoaWxkKSA9PiAoY2hpbGQucGFyZW50ID0gdGhpcykpO1xyXG4gIH1cclxuICB0b1N0cmluZygpIHtcclxuICAgIHJldHVybiBhc0h0bWxTdHJpbmcodGhpcy50YWcsIHRoaXMucHJvcHMsIHRoaXMuY2hpbGRyZW4pO1xyXG4gIH1cclxuXHJcbiAgYXNOb2RlKCkge1xyXG4gICAgbGV0IHN2Z0NvbnRleHQgPSBmYWxzZTtcclxuICAgIGxldCB2Tm9kZTogVk5vZGVJbnRlcmZhY2UgPSB0aGlzO1xyXG4gICAgd2hpbGUgKHZOb2RlLnBhcmVudCkge1xyXG4gICAgICBpZiAodk5vZGUudGFnID09PSBcInN2Z1wiKSB7XHJcbiAgICAgICAgc3ZnQ29udGV4dCA9IHRydWU7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgICAgdk5vZGUgPSB2Tm9kZS5wYXJlbnQ7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5zdmdDb250ZXh0ID0gc3ZnQ29udGV4dDtcclxuICAgIGNvbnNvbGUubG9nKFwic3ZnQ29udGV4dDpcIiwgdGhpcy50YWcsIHN2Z0NvbnRleHQpO1xyXG5cclxuICAgIGNvbnN0IG5vZGUgPSBhc05vZGUoXHJcbiAgICAgIHRoaXMudGFnLFxyXG4gICAgICB0aGlzLnByb3BzLFxyXG4gICAgICB0aGlzLmNoaWxkcmVuLFxyXG4gICAgICB0aGlzLnN2Z0NvbnRleHRcclxuICAgIClbMF07XHJcbiAgICB0aGlzLm5vZGUgPSBub2RlO1xyXG5cclxuICAgIC8vIG1lbW9yaXplIGZvciBuZXh0IHN1YnRyZWUgcmUtcmVuZGVyc1xyXG4gICAgcmVuZGVyZWRWVHJlZXMuc2V0KG5vZGUsIHRoaXMpO1xyXG5cclxuICAgIHJldHVybiBub2RlO1xyXG4gIH1cclxuICByZW1vdmVGcm9tRE9NKCkge1xyXG4gICAgdGhpcy5ub2RlLnBhcmVudEVsZW1lbnQucmVtb3ZlQ2hpbGQodGhpcy5ub2RlKTtcclxuICB9XHJcbiAgZGlmZkFuZFBhdGNoKG5ld05vZGU6IEVsZW1lbnRWTm9kZSkge1xyXG4gICAgaWYgKG5ld05vZGUudGFnID09PSB0aGlzLnRhZykge1xyXG4gICAgICBuZXdOb2RlLm5vZGUgPSB0aGlzLm5vZGU7XHJcbiAgICAgIC8vICAgICAgcGF0Y2ggcHJvcHMsXHJcbiAgICAgIC8vIHVwZGF0ZSBwcm9wcyBmb3JtIG5ldyBub2RlXHJcbiAgICAgIE9iamVjdC5lbnRyaWVzKG5ld05vZGUucHJvcHMpXHJcbiAgICAgICAgLmZpbHRlcigoW2ssIHZdKSA9PiB0aGlzLnByb3BzW2tdICE9PSB2KVxyXG4gICAgICAgIC5mb3JFYWNoKChba2V5LCB2YWx1ZV0pID0+IHtcclxuICAgICAgICAgIC8vIEBUT0RPOlxyXG4gICAgICAgICAgaWYgKGtleSA9PT0gXCJyZWZcIiAmJiB0eXBlb2YgdmFsdWUgPT09IFwiZnVuY3Rpb25cIikgcmVmc1RvQ2FsbC5wdXNoKCgpID0+IHZhbHVlKG5ld05vZGUubm9kZSkpO1xyXG4gICAgICAgICAgaWYgKHZhbHVlID09PSB0cnVlKSBuZXdOb2RlLm5vZGUuc2V0QXR0cmlidXRlKGtleSwgXCJcIik7XHJcbiAgICAgICAgICBlbHNlIGlmICh2YWx1ZSA9PT0gbnVsbCB8fCB2YWx1ZSA9PT0gdW5kZWZpbmVkIHx8IHZhbHVlID09PSBmYWxzZSlcclxuICAgICAgICAgICAgbmV3Tm9kZS5ub2RlLnJlbW92ZUF0dHJpYnV0ZShrZXkpO1xyXG4gICAgICAgICAgZWxzZSBuZXdOb2RlLm5vZGUuc2V0QXR0cmlidXRlKGtleSwgdmFsdWUpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgLy8gcmVtb3ZlIG9sZCwgb2Jzb2xhdGUgYXR0cmlidXRlc1xyXG4gICAgICBPYmplY3QuZW50cmllcyh0aGlzLnByb3BzKVxyXG4gICAgICAgIC5maWx0ZXIoKFtrLCBfdl0pID0+ICFuZXdOb2RlLnByb3BzLmhhc093blByb3BlcnR5KGspKVxyXG4gICAgICAgIC5mb3JFYWNoKChba2V5LCB2YWx1ZV0pID0+IHtcclxuICAgICAgICAgIC8vIEBUT0RPOiByZW1vdmUgZG9tIHByb3BzIGFuZCBldmVudCBsaXN0ZW5lcnNcclxuICAgICAgICAgIHRoaXMubm9kZS5yZW1vdmVBdHRyaWJ1dGUoa2V5KTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgIC8vIGNoaWxkcmVuID0+IGl0ZXIgYW5kIHBhdGNoXHJcbiAgICAgIC8vIG9sZCBjaGlsZHJlbiBiZWluZyBtb2RpZmllZFxyXG4gICAgICBkaWZmQW5kUGF0Y2hDaGlsZHJlbih0aGlzLCBuZXdOb2RlKTtcclxuICAgIH1cclxuICAgIC8vIHRhZyBoYXMgY2hhbmdlZFxyXG4gICAgZWxzZSB7XHJcbiAgICAgIHRoaXMubm9kZS5yZXBsYWNlV2l0aChuZXdOb2RlLmFzTm9kZSgpKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBtZW1vcml6ZSBmb3IgbmV4dCBzdWJ0cmVlIHJlLXJlbmRlcnNcclxuICAgIHJlbmRlcmVkVlRyZWVzLnNldCh0aGlzLm5vZGUsIG5ld05vZGUpO1xyXG4gIH1cclxuXHJcbiAgc3RhdGljIGZyb21FeGlzdGluZ0VsZW1lbnROb2RlKHZOb2RlOiBFbGVtZW50Vk5vZGUsIGNoaWxkcmVuOiAgQXJyYXk8Vk5vZGVJbnRlcmZhY2UgfCBWTm9kZUludGVyZmFjZVtdPikge1xyXG4gICAgY29uc3Qge3RhZywgcHJvcHMsIHBhcmVudCwgbm9kZSwgc3ZnQ29udGV4dH0gPSB2Tm9kZTtcclxuICAgIGNvbnN0IG5ld1ZOb2RlID0gbmV3IEVsZW1lbnRWTm9kZSh7dGFnLCBwcm9wcywgY2hpbGRyZW59KTtcclxuICAgIE9iamVjdC5hc3NpZ24obmV3Vk5vZGUsIHtwYXJlbnQsIG5vZGUsIHN2Z0NvbnRleHR9KTtcclxuICAgIHJldHVybiBuZXdWTm9kZTtcclxuXHJcbiAgfVxyXG59XHJcblxyXG5jbGFzcyBGcmFnbWVudFZOb2RlIGV4dGVuZHMgVk5vZGUgaW1wbGVtZW50cyBWTm9kZUludGVyZmFjZSB7XHJcbiAgdHlwZSA9IFwiRnJhZ21lbnRcIjtcclxuICBjaGlsZHJlbjogVk5vZGVJbnRlcmZhY2VbXTtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBjaGlsZHJlbjogQXJyYXk8XHJcbiAgICAgIFZOb2RlSW50ZXJmYWNlIHwgQ2hpbGROb2RlIHwgc3RyaW5nIHwgYm9vbGVhbiB8IG51bGwgfCB1bmRlZmluZWQgfCBudW1iZXJcclxuICAgID5cclxuICApIHtcclxuICAgIHN1cGVyKCk7XHJcblxyXG4gICAgdGhpcy5jaGlsZHJlbiA9IGNoaWxkcmVuLm1hcCgoY2hpbGQpID0+IHtcclxuICAgICAgaWYgKEFycmF5LmlzQXJyYXkoY2hpbGQpKSByZXR1cm4gbmV3IEZyYWdtZW50Vk5vZGUoY2hpbGQpO1xyXG4gICAgICBpZiAoY2hpbGQgaW5zdGFuY2VvZiBWTm9kZSkgcmV0dXJuIGNoaWxkO1xyXG4gICAgICBpZiAoY2hpbGQgaW5zdGFuY2VvZiBOb2RlKSByZXR1cm4gbmV3IExpdmVOb2RlVk5vZGUoY2hpbGQpO1xyXG4gICAgICBpZiAoIXRydXRoeShjaGlsZCkpIHJldHVybiBuZXcgTnVsbFZOb2RlKCk7XHJcbiAgICAgIHJldHVybiBuZXcgVGV4dFZOb2RlKGNoaWxkIGFzIHN0cmluZyB8IG51bWJlcik7XHJcbiAgICB9KTtcclxuXHJcbiAgICB0aGlzLmNoaWxkcmVuLmZvckVhY2goKGNoaWxkKSA9PiAoY2hpbGQucGFyZW50ID0gdGhpcykpO1xyXG4gIH1cclxuXHJcbiAgYXNOb2RlKCkge1xyXG4gICAgY29uc3Qgbm9kZSA9IGFzTm9kZSh1bmRlZmluZWQsIHt9LCB0aGlzLmNoaWxkcmVuKVswXTtcclxuXHJcbiAgICByZXR1cm4gbm9kZTtcclxuICB9XHJcblxyXG4gIHRvU3RyaW5nKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuY2hpbGRyZW4ubWFwKChjaGlsZCkgPT4gY2hpbGQudG9TdHJpbmcoKSkuam9pbihcIlwiKTtcclxuICB9XHJcblxyXG4gIC8vIHRvIGxldmVsXHJcbiAgZGlmZkFuZFBhdGNoKG5ld1ZOb2RlOiBGcmFnbWVudFZOb2RlKSB7XHJcbiAgICByZXR1cm4gZGlmZkFuZFBhdGNoQ2hpbGRyZW4odGhpcywgbmV3Vk5vZGUpO1xyXG4gIH1cclxuXHJcbiAgcmVtb3ZlRnJvbURPTSgpIHtcclxuICAgIHRoaXMuY2hpbGRyZW4uZm9yRWFjaCgoY2hpbGQpID0+IGNoaWxkLnJlbW92ZUZyb21ET00oKSk7XHJcbiAgfVxyXG59XHJcblxyXG5jbGFzcyBUZXh0Vk5vZGUgZXh0ZW5kcyBWTm9kZSBpbXBsZW1lbnRzIFZOb2RlSW50ZXJmYWNlIHtcclxuICB0eXBlID0gXCJUZXh0Tm9kZVwiO1xyXG4gIGNoaWxkcmVuID0gW107XHJcbiAgbm9kZTogVGV4dCA9IG51bGwgYXMgYW55O1xyXG4gIHByb3BzOiB7IGNvbnRlbnQ6IGFueSB9O1xyXG4gIHBhcmVudDogVk5vZGVJbnRlcmZhY2UgPSBudWxsIGFzIGFueTtcclxuXHJcbiAgLyoqXHJcbiAgICpcclxuICAgKi9cclxuICBjb25zdHJ1Y3Rvcihjb250ZW50OiBzdHJpbmcgfCBudW1iZXIgfCBib29sZWFuKSB7XHJcbiAgICBzdXBlcigpO1xyXG4gICAgdGhpcy5wcm9wcyA9IHsgY29udGVudCB9OyAvL0BUT0RPOlxyXG4gIH1cclxuXHJcbiAgYXNOb2RlKCkge1xyXG4gICAgY29uc3QgdGV4dE5vZGUgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSh0aGlzLnByb3BzLmNvbnRlbnQpO1xyXG4gICAgdGhpcy5ub2RlID0gdGV4dE5vZGU7XHJcbiAgICByZXR1cm4gdGV4dE5vZGU7XHJcbiAgfVxyXG5cclxuICB0b1N0cmluZygpIHtcclxuICAgIHJldHVybiBzYW5pdGl6ZSh0aGlzLnByb3BzLmNvbnRlbnQpO1xyXG4gIH1cclxuXHJcbiAgZGlmZkFuZFBhdGNoKG5ld05vZGU6IFRleHRWTm9kZSkge1xyXG4gICAgdGhpcy5ub2RlLm5vZGVWYWx1ZSA9IG5ld05vZGUucHJvcHMuY29udGVudDtcclxuICAgIG5ld05vZGUubm9kZSA9IHRoaXMubm9kZTtcclxuICB9XHJcblxyXG4gIHJlbW92ZUZyb21ET00oKSB7XHJcbiAgICB0aGlzLm5vZGUucGFyZW50RWxlbWVudCEucmVtb3ZlQ2hpbGQodGhpcy5ub2RlKTtcclxuICB9XHJcbn1cclxuXHJcbmNsYXNzIE51bGxWTm9kZSBleHRlbmRzIFZOb2RlIGltcGxlbWVudHMgVk5vZGVJbnRlcmZhY2Uge1xyXG4gIHR5cGUgPSBcIk51bGxcIjtcclxuICBjaGlsZHJlbiA9IFtdO1xyXG4gIHBhcmVudDogVk5vZGVJbnRlcmZhY2UgPSBudWxsIGFzIGFueTtcclxuICAvKipcclxuICAgKlxyXG4gICAqL1xyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgc3VwZXIoKTtcclxuICB9XHJcblxyXG4gIGFzTm9kZSgpIHtcclxuICAgIC8vcmV0dXJuIG51bGw7IC8vIHJldHVybiBlbXB0eSBmcmFnbWVudD9cclxuICAgIHJldHVybiBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XHJcbiAgfVxyXG5cclxuICBkaWZmQW5kUGF0Y2gobmV3Tm9kZTI6IE51bGxWTm9kZSkge1xyXG4gICAgcmV0dXJuO1xyXG4gIH1cclxuXHJcbiAgcmVtb3ZlRnJvbURPTSgpIHtcclxuICAgIHJldHVybjtcclxuICB9XHJcblxyXG4gIHRvU3RyaW5nKCkge1xyXG4gICAgcmV0dXJuIFwiXCI7XHJcbiAgfVxyXG59XHJcblxyXG5jbGFzcyBMaXZlTm9kZVZOb2RlIGV4dGVuZHMgVk5vZGUgaW1wbGVtZW50cyBWTm9kZUludGVyZmFjZSB7XHJcbiAgdHlwZSA9IFwiTm9kZVwiO1xyXG4gIGNoaWxkcmVuID0gW107XHJcbiAgcGFyZW50OiBWTm9kZUludGVyZmFjZSA9IG51bGwgYXMgYW55O1xyXG4gIG5vZGU6IENoaWxkTm9kZTtcclxuXHJcbiAgLyoqXHJcbiAgICpcclxuICAgKi9cclxuICBjb25zdHJ1Y3Rvcihub2RlOiBDaGlsZE5vZGUpIHtcclxuICAgIHN1cGVyKCk7XHJcbiAgICB0aGlzLm5vZGUgPSBub2RlO1xyXG4gIH1cclxuXHJcbiAgYXNOb2RlKCkge1xyXG4gICAgcmV0dXJuIHRoaXMubm9kZTtcclxuICB9XHJcblxyXG4gIGRpZmZBbmRQYXRjaChuZXdOb2RlOiBMaXZlTm9kZVZOb2RlKSB7XHJcbiAgICBpZiAobmV3Tm9kZS5ub2RlICE9PSB0aGlzLm5vZGUpIHtcclxuICAgICAgdGhpcy5ub2RlLnJlcGxhY2VXaXRoKG5ld05vZGUubm9kZSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICByZW1vdmVGcm9tRE9NKCkge1xyXG4gICAgdGhpcy5ub2RlLnBhcmVudEVsZW1lbnQhLnJlbW92ZUNoaWxkKHRoaXMubm9kZSk7XHJcbiAgfVxyXG5cclxuICB0b1N0cmluZygpIHtcclxuICAgIHJldHVybiBnZXRPdXRlckh0bWwodGhpcy5ub2RlKTtcclxuICB9XHJcbn1cclxuXHJcbmNsYXNzIFJvb3RWTm9kZSBleHRlbmRzIFZOb2RlIGltcGxlbWVudHMgVk5vZGVJbnRlcmZhY2Uge1xyXG4gIHR5cGUgPSBcIlJvb3RcIjtcclxuICBwYXJlbnQgPSBudWxsO1xyXG4gIG5vZGU6IEVsZW1lbnQ7XHJcbiAgY2hpbGRyZW46IFZOb2RlSW50ZXJmYWNlW107XHJcbiAgLyoqXHJcbiAgICpcclxuICAgKi9cclxuICBjb25zdHJ1Y3Rvcihjb250ZW50OiBWTm9kZUludGVyZmFjZSwgZG9tTm9kZTogRWxlbWVudCkge1xyXG4gICAgc3VwZXIoKTtcclxuICAgIGNvbnRlbnQucGFyZW50ID0gdGhpcztcclxuICAgIHRoaXMuY2hpbGRyZW4gPSBbY29udGVudF07XHJcbiAgICB0aGlzLm5vZGUgPSBkb21Ob2RlO1xyXG4gIH1cclxuXHJcbiAgYXNOb2RlKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuY2hpbGRyZW5bMF0uYXNOb2RlKCk7XHJcbiAgfVxyXG4gIHRvU3RyaW5nKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuY2hpbGRyZW5bMF0udG9TdHJpbmcoKTtcclxuICB9XHJcblxyXG4gIGRpZmZBbmRQYXRjaChuZXdWTm9kZTogVk5vZGVJbnRlcmZhY2UpIHtcclxuICAgIGRpZmZBbmRQYXRjaENoaWxkcmVuKHRoaXMsIG5ld1ZOb2RlKTtcclxuICB9XHJcblxyXG4gIHJlbW92ZUZyb21ET00oKSB7XHJcbiAgICB0aGlzLm5vZGUucmVtb3ZlKCk7XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBhc1ZOb2RlKFxyXG4gIHRhZzogc3RyaW5nIHwgRnVuY3Rpb24gfCB1bmRlZmluZWQsXHJcbiAgcHJvcHM6IEpzeFByb3BzXHJcbik6IFZOb2RlSW50ZXJmYWNlIHtcclxuICBjb25zb2xlLmxvZyhcImFzVk5vZGU6XCIsIHsgdGFnLCBwcm9wcyB9KTtcclxuXHJcbiAgaWYgKHR5cGVvZiB0YWcgPT09IFwiZnVuY3Rpb25cIikge1xyXG4gICAgbGV0IHJlc3VsdCA9IHRhZyhwcm9wcyk7XHJcbiAgICBpZiAocmVzdWx0IGluc3RhbmNlb2YgVk5vZGUpIHJldHVybiByZXN1bHQ7XHJcbiAgICBpZiAocmVzdWx0IGluc3RhbmNlb2YgTm9kZSkgcmV0dXJuIG5ldyBMaXZlTm9kZVZOb2RlKHJlc3VsdCk7XHJcbiAgICAvLyBudWxsIGpzeCBub2RlXHJcbiAgICBpZiAoIXRydXRoeShyZXN1bHQpKSByZXR1cm4gbmV3IE51bGxWTm9kZSgpO1xyXG5cclxuICAgIHJldHVybiBuZXcgVGV4dFZOb2RlKHJlc3VsdCk7XHJcbiAgfVxyXG5cclxuICBjb25zdCB7IGNoaWxkcmVuLCAuLi5hdHRyIH0gPSBwcm9wcztcclxuICBpZiAodGFnKSB7XHJcbiAgICByZXR1cm4gbmV3IEVsZW1lbnRWTm9kZSh7IHRhZywgcHJvcHM6IGF0dHIsIGNoaWxkcmVuIH0pOyAvLyBvciBzaW1wbHkgcGFzcyBjaWxkcmVuIHdpdGggcHJvcHNcclxuICB9IGVsc2UgaWYgKCF0cnV0aHkoYXR0cikpIHtcclxuICAgIGNvbnN0IHZOb2RlID0gbmV3IE51bGxWTm9kZSgpO1xyXG4gICAgLy92Tm9kZS5wYXJlbnQgPSB0aGlzO1xyXG4gICAgcmV0dXJuIHZOb2RlO1xyXG4gIH0gZWxzZSBpZiAoY2hpbGRyZW4pIHtcclxuICAgIHJldHVybiBuZXcgRnJhZ21lbnRWTm9kZShjaGlsZHJlbik7XHJcbiAgfVxyXG5cclxuICAvLyBlbHNlPyAvLyBAVE9ETzo/XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBjb252ZXJ0cyBwcmFnbWEgb2JqZWN0IHRvIGh0bWwgc3RyaW5nXHJcbiAqIGpzeHMgaXMgYWx3YXlzIGNhbGxlZCB3aGVuIGVsZW1lbnQgaGFzIG1vcmUgdGhhbiBvbmUgY2hpbGRcclxuICpcclxuICogQHBhcmFtIHtzdHJpbmcgfCBGdW5jdGlvbn0gdGFnIC0gdGFnIG5hbWUgb3IgdGFnIGNsYXNzXHJcbiAqIEBwYXJhbSB7T2JqZWN0IHwgbnVsbH0gcHJvcHMgLSBwcm9wcyBmb3IgdGhlIHRhZ1xyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGpzeHMoXHJcbiAgdGFnOiBzdHJpbmcgfCBGdW5jdGlvbixcclxuICBwcm9wczogSnN4UHJvcHNcclxuKTogSnN4Tm9kZUludGVyZmFjZSB7XHJcbiAgcmV0dXJuIGFzVk5vZGUodGFnLCBwcm9wcyk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBjb252ZXJ0cyB0aGUgZnJhZ21lbnRzIG9iamVjdCB0byBub2Rlc1xyXG4gKlxyXG4gKiBAcGFyYW0ge09iamVjdH0gcHJvcHNcclxuICogQHBhcmFtIHtBcnJheX0gcHJvcHMuY2hpbGRyZW4gLSBjaGlsZCBlbGVtZW50cyBpbiB0aGUgZnJhZ21lbnRcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBGcmFnbWVudChwcm9wczogSnN4UHJvcHMpIHtcclxuICByZXR1cm4gYXNWTm9kZSh1bmRlZmluZWQsIHByb3BzKTtcclxufVxyXG5cclxuLy8ganN4IGlzIGNhbGxlZCB3aGVuIHRoZSBlbGVtZW50IGhhcyBvbmUgb3IgemVybyBjaGlsZHJlblxyXG5leHBvcnQgZnVuY3Rpb24ganN4KFxyXG4gIHRhZzogc3RyaW5nIHwgRnVuY3Rpb24sXHJcbiAgcHJvcHM6IEF0dHJpYnV0ZXMgJlxyXG4gICAgU3BlY2lhbEF0dHJpYnV0ZXMgJiB7IGNoaWxkcmVuPzogc3RyaW5nIHwgTm9kZSB8IEpzeE5vZGVJbnRlcmZhY2UgfVxyXG4pOiBKc3hOb2RlSW50ZXJmYWNlIHtcclxuICAvLyBAdHMtaWdub3JlIC0gd3JhcHBpbmcgdGhlIGNoaWxkcmVuIGFzIGFycmF5IHRvIHJlLXVzZSBqc3hzIG1ldGhvZFxyXG4gIHByb3BzLmNoaWxkcmVuID0gcHJvcHMuaGFzT3duUHJvcGVydHkoXCJjaGlsZHJlblwiKSA/IFtwcm9wcy5jaGlsZHJlbl0gOiBbXTtcclxuXHJcbiAgcmV0dXJuIGpzeHModGFnLCAocHJvcHMgYXMgdW5rbm93bikgYXMgSnN4UHJvcHMpO1xyXG59XHJcblxyXG4vKipcclxuICogcmVuZGVyIHRoZSBnaXZlbiBtYXJrdXAgaW50byB0aGUgZ2l2ZW4gZG9tIG5vZGVcclxuICpcclxuICogQHBhcmFtIHtzdHJpbmd8SFRNTEVsZW1lbnR8SlNYfSBtYXJrdXAgLSBodG1sIGFzIHN0cmluZywgaHRtbCBlbGVtZW50IG9yIGpzeCB0ZW1wbGF0ZVxyXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBkb21Ob2RlIC0gY29udGFpbmVyIGZvciB0aGUgdGVtcGxhdGUgdG8gYmUgcmVuZGVyZWQgaW50b1xyXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFthcHBlbmQ9ZmFsc2VdIC0gc2hvdWxkIHRoZSBwcm92aWRlZCBtYXJrdXAgYmUgYXBwZW5kZWQgdG8gdGhlIGV4aXN0aW5nIG1hcmt1cCwgb3IgZGVmYXVsdCByZXBsYWNlIGl0XHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gcmVuZGVyKFxyXG4gIG1hcmt1cDogc3RyaW5nIHwgSFRNTEVsZW1lbnQgfCBKc3hOb2RlSW50ZXJmYWNlLCAvLyBAVE9ETzogc3BlY2lmaWMgc3VwcG9ydCBmb3IgVGVtcGxhdGU/ICguY29udGVudC5jbG9uZSlcclxuICBkb21Ob2RlOiBIVE1MRWxlbWVudCxcclxuICBhcHBlbmQ6IGJvb2xlYW4gPSBmYWxzZVxyXG4pIHtcclxuICBBcnJheS5mcm9tKGRvY3VtZW50LmJvZHkucXVlcnlTZWxlY3RvckFsbChcIipcIikpLmZvckVhY2goXHJcbiAgICAoZWwpID0+IChlbC5zdHlsZS5iYWNrZ3JvdW5kID0gXCIjY2NmZmNjXCIpXHJcbiAgKTtcclxuXHJcbiAgY29uc3QgaXNSZVJlbmRlciA9IHJlbmRlcmVkVlRyZWVzLmhhcyhkb21Ob2RlKTtcclxuICBpZiAoIWFwcGVuZCAmJiAhaXNSZVJlbmRlcikgZG9tTm9kZS5pbm5lckhUTUwgPSBcIlwiO1xyXG5cclxuICBpZiAodHlwZW9mIG1hcmt1cCA9PT0gXCJzdHJpbmdcIikge1xyXG4gICAgZG9tTm9kZS5pbnNlcnRBZGphY2VudEhUTUwoXCJiZWZvcmVlbmRcIiwgbWFya3VwKTsgLy8gc2FuaXRpemU/XHJcbiAgfSBlbHNlIGlmIChtYXJrdXAgaW5zdGFuY2VvZiBOb2RlKSB7XHJcbiAgICBkb21Ob2RlLmluc2VydEFkamFjZW50RWxlbWVudChcImJlZm9yZWVuZFwiLCBtYXJrdXApO1xyXG4gIH0gZWxzZSBpZiAobWFya3VwIGluc3RhbmNlb2YgVk5vZGUpIHtcclxuICAgIGxldCB2VHJlZSA9IG5ldyBSb290Vk5vZGUobWFya3VwLCBkb21Ob2RlKTtcclxuXHJcbiAgICBjb25zb2xlLmxvZyhcIiMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjI1xcblwiLCBcInZUcmVlOlwiLCB2VHJlZSk7XHJcblxyXG4gICAgaWYgKGlzUmVSZW5kZXIpIHtcclxuICAgICAgY29uc29sZS5sb2coXCJpcyByZS1yZW5kZXJcIik7XHJcbiAgICAgIGNvbnN0IG9sZFZUcmVlID0gcmVuZGVyZWRWVHJlZXMuZ2V0KGRvbU5vZGUpO1xyXG5cclxuICAgICAgY29uc29sZS5sb2coXCIjIyMjIyMjIyMjI1xcblwiLCB7IG9sZFZUcmVlLCBuZXdWVHJlZTogdlRyZWUgfSk7XHJcblxyXG4gICAgICAvLyB3YXMgcHJldmlvdXNseSByZW5kZXJlZCBhcyBhIHN1YnRyZWUgZnJvbSBhbm90aGVyIHJlbmRlclxyXG4gICAgICBpZiAob2xkVlRyZWUudHlwZSA9PT0gXCJFbGVtZW50XCIpIHtcclxuICAgICAgICB2VHJlZSA9IEVsZW1lbnRWTm9kZS5mcm9tRXhpc3RpbmdFbGVtZW50Tm9kZShvbGRWVHJlZSwgW21hcmt1cF0pO1xyXG4gICAgICAgIG9sZFZUcmVlLmRpZmZBbmRQYXRjaCh2VHJlZSk7XHJcbiAgICAgICAgLy8gdXBkYXRlIHRoZSBjaGlsZHJlbiBwcm9wZXJ0eSBpbiB0aGUgbWVtb3J5IHJlZmVyZW5jZSBmcm9tIHRoZSBwcmV2aW91cyByZW5kZXIsXHJcbiAgICAgICAgLy8gYXR0cmlidXRlcywgZXRjIHdpbGwgc3RheSB0aGUgc2FtZVxyXG4gICAgICAgIG9sZFZUcmVlLmNoaWxkcmVuID0gdlRyZWUuY2hpbGRyZW47XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgLy8gZGlmZlxyXG4gICAgICAgIG9sZFZUcmVlLmRpZmZBbmRQYXRjaCh2VHJlZSk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHJlbmRlcmVkVlRyZWVzLnNldChkb21Ob2RlLCB2VHJlZSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjb25zdCBjb250ZW50ID0gdlRyZWUuYXNOb2RlKCk7XHJcbiAgICAgIGRvbU5vZGUuYXBwZW5kKGNvbnRlbnQpO1xyXG4gICAgfVxyXG5cclxuICAgIHJlbmRlcmVkVlRyZWVzLnNldChkb21Ob2RlLCB2VHJlZSk7XHJcblxyXG4gICAgd2hpbGUgKHJlZnNUb0NhbGwubGVuZ3RoKSB7XHJcbiAgICAgIC8vIHJlbW92ZSBmaXJzdCBmcm9tIGxpc3QsIGFuZCBpbnZva2UgaXRcclxuICAgICAgcmVmc1RvQ2FsbC5zcGxpY2UoMCwgMSlbMF0oKTtcclxuICAgIH1cclxuICB9IGVsc2Uge1xyXG4gICAgdGhyb3cgbmV3IEVycm9yKFwicmVuZGVyIG1ldGhvZCBjYWxsZWQgd2l0aCB3cm9uZyBhcmd1bWVudChzKVwiKTtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiByYXdIdG1sKGNvbnRlbnQ6IHN0cmluZyk6IFZOb2RlSW50ZXJmYWNlIHtcclxuICByZXR1cm4gbmV3IChjbGFzcyBleHRlbmRzIFZOb2RlIGltcGxlbWVudHMgVk5vZGVJbnRlcmZhY2Uge1xyXG4gICAgcGFyZW50OiBWTm9kZUludGVyZmFjZSA9IG51bGwgYXMgYW55O1xyXG4gICAgY2hpbGRyZW4gPSBbXTtcclxuICAgIHR5cGUgPSBcIlJhd0h0bWxcIjtcclxuICAgIGNoaWxkTm9kZXM6IENoaWxkTm9kZVtdO1xyXG4gICAgY29udGVudDogc3RyaW5nO1xyXG4gICAgbm9kZT86IENoaWxkTm9kZTtcclxuXHJcbiAgICAvKipcclxuICAgICAqXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKGNvbnRlbnQ6IHN0cmluZykge1xyXG4gICAgICBzdXBlcigpO1xyXG4gICAgICB0aGlzLmNvbnRlbnQgPSBjb250ZW50O1xyXG4gICAgfVxyXG4gICAgcmVtb3ZlRnJvbURPTSgpIHtcclxuICAgICAgdGhpcy5jaGlsZE5vZGVzLmZvckVhY2goKG5vZGUpID0+IG5vZGUucGFyZW50RWxlbWVudCEucmVtb3ZlQ2hpbGQobm9kZSkpO1xyXG4gICAgfVxyXG5cclxuICAgIGRpZmZBbmRQYXRjaChuZXdOb2RlOiBWTm9kZUludGVyZmFjZSkge1xyXG4gICAgICBpZiAoKG5ld05vZGUuY29udGVudCA9IHRoaXMuY29udGVudCkpIHtcclxuICAgICAgICBuZXdOb2RlLm5vZGUgPSB0aGlzLm5vZGU7XHJcbiAgICAgICAgbmV3Tm9kZS5jaGlsZE5vZGVzID0gdGhpcy5jaGlsZE5vZGVzO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG4gICAgICB0aGlzLnJlbW92ZUZyb21ET00oKTtcclxuICAgICAgaW5zZXJ0TmV3SXRlbShuZXdOb2RlKTtcclxuICAgIH1cclxuXHJcbiAgICB0b1N0cmluZygpIHtcclxuICAgICAgcmV0dXJuIGNvbnRlbnQ7XHJcbiAgICB9XHJcblxyXG4gICAgYXNOb2RlKCkge1xyXG4gICAgICBjb25zdCB0ZW1wbGF0ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0ZW1wbGF0ZVwiKTtcclxuICAgICAgdGVtcGxhdGUuaW5uZXJIVE1MID0gdGhpcy5jb250ZW50O1xyXG4gICAgICBjb25zdCBkb2N1bWVudEZyYWdtZW50ID0gdGVtcGxhdGUuY29udGVudDtcclxuICAgICAgdGhpcy5jaGlsZE5vZGVzID0gQXJyYXkuZnJvbShkb2N1bWVudEZyYWdtZW50LmNoaWxkTm9kZXMpO1xyXG5cclxuICAgICAgLy8gYmFzaWNhbGx5IHRoZSBgLm5vZGVgIHByb3BlcnR5IGlzIHVzZWQgdG8gZGV0ZXJtaW5lIHRoZSBsYXN0IGh0bWwgbm9kZSBvZiB0aGUgVk5vZGUsXHJcbiAgICAgIC8vIHRvIHBvc2l0aW9uIHRoZSBuZXh0IFZOb2RlJ3MgRE9NIE5vZGUgYWZ0ZXIgaXQuXHJcbiAgICAgIC8vIHRoZXJlZm9yZSAubm9kZSByZXR1cm5zIHRoZSBsYXN0IG5vZGUgb2YgdGhlIHJhdyBodG1sXHJcbiAgICAgIGlmICh0aGlzLmNoaWxkTm9kZXMubGVuZ3RoKVxyXG4gICAgICAgIHRoaXMubm9kZSA9IHRoaXMuY2hpbGROb2Rlc1t0aGlzLmNoaWxkTm9kZXMubGVuZ3RoIC0gMV07XHJcbiAgICAgIHJldHVybiBkb2N1bWVudEZyYWdtZW50O1xyXG4gICAgfVxyXG4gIH0pKGNvbnRlbnQpO1xyXG59XHJcblxyXG4vLyBnb3RjaGFzOlxyXG4vLyAtIHN0eWxlcyB3aWxsIG92ZXJyaWRlIChjb3VsZCBkbzogc2V0dGluZyBlYWNoIHJ1bGUgaW5kaXZpZHVhbGx5KVxyXG5cclxuXHJcbndpbmRvdy5yZW5kZXJlZFZUcmVlcyA9IHJlbmRlcmVkVlRyZWVzIiwiaW1wb3J0IHsgcmVuZGVyLCByYXdIdG1sIH0gZnJvbSBcIi4vanN4L2pzeC1ydW50aW1lXCI7XHJcblxyXG5jb25zdCB4c3MgPSBcIjxpbWcgc3JjPXggb25lcnJvcj1cXFwiYWxlcnQoJ1hTUyBBdHRhY2snKVxcXCI+XCI7IC8vXCI8c2NyaXB0PmFsZXJ0KCctLi0nKTwvc2NyaXB0PlwiO1xyXG5cclxuZnVuY3Rpb24gUlRFKHByb3BzOiAvKnsgdHh0LCBcIm9uLWNsaWNrXCI6IG9uQ2xpY2sgfSovIHtcclxuICB0eHQ6IHN0cmluZztcclxuICByZWY/OiBGdW5jdGlvbjtcclxufSkge1xyXG4gIGNvbnNvbGUubG9nKFwib25DbGlja1wiLCBwcm9wc1tcIm9uLWNsaWNrXCJdKTtcclxuICByZXR1cm4gKFxyXG4gICAgPHAgcmVmPXsoZWw6IEhUTUxFbGVtZW50KSA9PiBjb25zb2xlLmxvZyhcIm15IGRpdiA6OnJlZjo6My4yXCIsIGVsKX0+XHJcbiAgICAgIHtwcm9wcy50eHR9XHJcbiAgICA8L3A+XHJcbiAgKTtcclxufVxyXG5cclxuZnVuY3Rpb24gQnV0dG9uKHtcclxuICBjaGlsZHJlbixcclxuICBkaXNhYmxlZCxcclxufToge1xyXG4gIGNoaWxkcmVuOiBhbnk7XHJcbiAgZGlzYWJsZWQ6IGJvb2xlYW47XHJcbiAgcmVmPzogRnVuY3Rpb247XHJcbn0pIHtcclxuICByZXR1cm4gKFxyXG4gICAgPGJ1dHRvblxyXG4gICAgICBkaXNhYmxlZD17ZGlzYWJsZWR9XHJcbiAgICAgIHJlZj17KGVsOiBIVE1MRWxlbWVudCkgPT4gY29uc29sZS5sb2coXCJteSBidXR0b24gOjpyZWY6OjFcIiwgZWwpfVxyXG4gICAgPlxyXG4gICAgICA8c3BhbiByZWY9eyhlbDogSFRNTEVsZW1lbnQpID0+IGNvbnNvbGUubG9nKFwibXkgYSA6OnJlZjo6MlwiLCBlbCl9PlxyXG4gICAgICAgIEJ0bi1zcGFuLWZpcnN0XHJcbiAgICAgIDwvc3Bhbj5cclxuICAgICAge2NoaWxkcmVufVxyXG4gICAgICA8PlxyXG4gICAgICAgIDxzcGFuIHJlZj17KGVsOiBIVE1MRWxlbWVudCkgPT4gY29uc29sZS5sb2coXCJteSBhIDo6cmVmOjozXCIsIGVsKX0+XHJcbiAgICAgICAgICBCdG4tc3Bhbi1lbmRcclxuICAgICAgICA8L3NwYW4+XHJcbiAgICAgIDwvPlxyXG4gICAgPC9idXR0b24+XHJcbiAgKTtcclxufVxyXG5cclxuZnVuY3Rpb24gcmVmbG9nKGVsOiBIVE1MRWxlbWVudCkge1xyXG4gIGNvbnNvbGUubG9nKFwibXkgaW5uZXIgZGl2OjpyZWY6OjhcIiwgZWwpO1xyXG59XHJcblxyXG4vKlxyXG5jb25zdCBtYXJrdXAgPSAoXHJcbiAgPD5cclxuICAgIDxkaXZcclxuICAgICAgY2xhc3M9XCJmb29cIlxyXG4gICAgICByZWY9eyhlbDogSFRNTEVsZW1lbnQpID0+IGNvbnNvbGUubG9nKFwibXkgZGl2IDo6cmVmOjo0XCIsIGVsKX1cclxuICAgIC8+XHJcbiAgICA8aW5wdXQgZGlzYWJsZWQ9e3RydWV9IGhpZGRlbj17ZmFsc2V9IC8+XHJcbiAgICA8QnV0dG9uXHJcbiAgICAgIGRpc2FibGVkPXt0cnVlfVxyXG4gICAgICByZWY9eyhlbDogSFRNTEVsZW1lbnQpID0+IGNvbnNvbGUubG9nKFwibXkgQlVUVE9OOjpyZWY6OjVcIiwgZWwpfVxyXG4gICAgPlxyXG4gICAgICB0ZXh0XHJcbiAgICAgIDxwb3B1cC1pbmZvXHJcbiAgICAgICAgcmVmPXsoZWw6IEhUTUxFbGVtZW50KSA9PiBjb25zb2xlLmxvZyhcInNwYW4gaW4gQlVUVE9OOjpyZWY6OjZcIiwgZWwpfVxyXG4gICAgICA+XHJcbiAgICAgICAgYmxhXHJcbiAgICAgIDwvcG9wdXAtaW5mbz5cclxuICAgIDwvQnV0dG9uPlxyXG4gICAgPFJURVxyXG4gICAgICB0eHQ9XCJsZSB0ZXh0XCJcclxuICAgICAgcmVmPXsoZWw6IEhUTUxFbGVtZW50KSA9PiBjb25zb2xlLmxvZyhcIm15IGRpdiA6OnJlZjo6My4xXCIsIGVsKX1cclxuICAgICAgb24tY2xpY2s9eyhlOiBIVE1MRWxlbWVudCkgPT4gY29uc29sZS5sb2coZSl9XHJcbiAgICAvPlxyXG4gICAge3hzc31cclxuICAgIHtyYXdIdG1sKGA8b2w+PGxpPnJhdyBodG1sPC9saT48L29sPmApfVxyXG4gICAgPGRpdlxyXG4gICAgICBjbGFzcz1cImJhbVwiXHJcbiAgICAgIHJlZj17KGVsOiBIVE1MRWxlbWVudCkgPT4gY29uc29sZS5sb2coXCJteSBkaXY6OnJlZjo6N1wiLCBlbCl9XHJcbiAgICA+XHJcbiAgICAgIDxkaXY+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cImJhclwiIG9uLWNsaWNrPXsoZSkgPT4gY29uc29sZS5sb2coZSl9IHJlZj17cmVmbG9nfT5cclxuICAgICAgICAgIGNsaWNrIE1FXHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPGRpdiBzdHlsZT17eyBvdXRsaW5lOiBcIjFweCBzb2xpZCByZWQ7XCIgfX0+XHJcbiAgICAgICAgICB7ZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNvbGRcIil9XHJcbiAgICAgICAgICB7bnVsbH1cclxuICAgICAgICAgIHtbMCwgMV0ubWFwKChuKSA9PiAoXHJcbiAgICAgICAgICAgIDxzcGFuPntufTwvc3Bhbj5cclxuICAgICAgICAgICkpfVxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICA8L2Rpdj5cclxuICAgIDwvZGl2PlxyXG4gIDwvPlxyXG4pO1xyXG5cclxuKi9cclxuXHJcbi8qXHJcbmNvbnN0IG1hcmt1cCA9IChcclxuICA8QnV0dG9uIGRpc2FibGVkPXt0cnVlfT5cclxuICAgICAgPGJvbGQgcmVmPXtyZWZsb2d9Pi0tSU5ORVItLTwvYm9sZD5cclxuICA8L0J1dHRvbj5cclxuKTsqL1xyXG4vKlxyXG5cclxuY29uc3QgbWFya3VwID0gKFxyXG4gIDxkaXYgY2xhc3M9XCJmb29cIiByZWY9eyhlbDogSFRNTEVsZW1lbnQpID0+IGNvbnNvbGUubG9nKFwibXkgZGl2OjpyZWY6OlwiLCBlbCl9PlxyXG4gICAgPGRpdj5cclxuICAgICAgPGRpdiBjbGFzcz1cImJhclwiIHJlZj17KGVsOiBIVE1MRWxlbWVudCkgPT4gY29uc29sZS5sb2coXCJteSBpbm5lciBkaXY6OnJlZjo6XCIsIGVsKX0gLz5cclxuICAgIDwvZGl2PlxyXG4gICAgPEJ1dHRvbiBkaXNhYmxlZD17dHJ1ZX0+PC9CdXR0b24+XHJcbiAgPC9kaXY+XHJcbik7XHJcbiovXHJcbi8qXHJcbmNvbnN0IG1hcmt1cCA9IChcclxuICA8YT5cclxuICAgIDxiPlxyXG4gICAgICA8YyBjbGFzcz1cImJhclwiIHJlZj17cmVmbG9nfSAvPlxyXG4gICAgPC9iPlxyXG4gIDwvYT5cclxuKTtcclxuKi9cclxuXHJcbmZ1bmN0aW9uIFNwYW4oeyBtb2RlIH06IHsgbW9kZTogYW55IH0pIHtcclxuICByZXR1cm4gbW9kZSA9PT0gMSA/IChcclxuICAgIDxkaXY+XHJcbiAgICAgIDxzcGFuIGlkPVwiaW5uZXJcIiBvbGQ9e3RydWV9PlxyXG4gICAgICAgIFNwYW4tQ29tcC0tb2xkXHJcbiAgICAgIDwvc3Bhbj5cclxuICAgICAgPGgzPnRvIGJlIHJlbW92ZWQ8L2gzPlxyXG4gICAgPC9kaXY+XHJcbiAgKSA6IChcclxuICAgIDxkaXY+XHJcbiAgICAgIDxwIGlkPVwiaW5uZXJcIiBuZXc9e3RydWV9PlxyXG4gICAgICAgIFNwYW4tQ29tcC0tbmV3c1xyXG4gICAgICA8L3A+XHJcbiAgICA8L2Rpdj5cclxuICApO1xyXG59XHJcblxyXG5mdW5jdGlvbiBDb21wKHsgbnVtIH0pIHtcclxuICBpZiAobnVtID09PSAxKSByZXR1cm4gbnVsbDtcclxuICByZXR1cm4gKFxyXG4gICAgPGRpdj5cclxuICAgICAgPHA+Y29tcDwvcD5cclxuICAgIDwvZGl2PlxyXG4gICk7XHJcbn1cclxuXHJcbmNvbnN0IG1hcmt1cDEgPSAobnVtOiBhbnkpID0+IChcclxuICA8ZGl2IGlkPVwib3V0ZXJcIiBkYXRhLWZvbz1cImJhclwiIGRhdGEtdmFyPXtudW19PlxyXG4gICAgPGgzPnNob3VsZCBnZXQgMiAtOiAzPC9oMz5cclxuICAgIHtudW0gPT09IDEgPyAoXHJcbiAgICAgIDx1bCBjbGFzcz1cInVsLWNsYXNzXCI+XHJcbiAgICAgICAgPGxpPlRleHQgMSA8L2xpPlxyXG4gICAgICAgIDxsaT5UZXh0IDIgPC9saT5cclxuICAgICAgPC91bD5cclxuICAgICkgOiAoXHJcbiAgICAgIDx1bCBjbGFzcz1cInVsLWNsYXNzXCI+XHJcbiAgICAgICAgPGxpPlRleHQgMyA8L2xpPlxyXG4gICAgICAgIDxsaT5UZXh0IDIgPC9saT5cclxuICAgICAgICA8bGk+VGV4dCAxIDwvbGk+XHJcbiAgICAgIDwvdWw+XHJcbiAgICApfVxyXG4gICAgPGgzPnNob3VsZCBnZXQgMyAtOiAyPC9oMz5cclxuICAgIHtudW0gPT09IDEgPyAoXHJcbiAgICAgIDx1bCBjbGFzcz1cInVsLWNsYXNzXCI+XHJcbiAgICAgICAgPGxpPlRleHQgMSA8L2xpPlxyXG4gICAgICAgIDxsaT5UZXh0IDIgPC9saT5cclxuICAgICAgICA8bGk+VGV4dCAzIDwvbGk+XHJcbiAgICAgIDwvdWw+XHJcbiAgICApIDogKFxyXG4gICAgICA8dWwgY2xhc3M9XCJ1bC1jbGFzc1wiPlxyXG4gICAgICAgIDxsaT5UZXh0IDEgPC9saT5cclxuICAgICAgICA8bGk+VGV4dCAyIDwvbGk+XHJcbiAgICAgIDwvdWw+XHJcbiAgICApfVxyXG4gICAge251bSA9PT0gMSA/IG51bGwgOiA8cD5uZXcgcmVuZGVyPC9wPn1cclxuICAgIDxkaXY+XHJcbiAgICAgIDxzcGFuPnNwYW4tY29udGVudDwvc3Bhbj5cclxuICAgIDwvZGl2PlxyXG4gICAgPFNwYW4gbW9kZT17bnVtfSAvPlxyXG4gICAgey8qZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNvbGRcIikqL31cclxuICAgIDw+RnJhZ21lbnQtaXRlbTwvPlxyXG4gICAgPHN2Z1xyXG4gICAgICB2aWV3Qm94PVwiMCAwIDMwMCAxMDBcIlxyXG4gICAgICB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCJcclxuICAgICAgc3Ryb2tlPVwicmVkXCJcclxuICAgICAgZmlsbD1cImdyZXlcIlxyXG4gICAgPlxyXG4gICAgICA8Y2lyY2xlIGN4PVwiNTBcIiBjeT1cIjUwXCIgcj1cIjQwXCIgLz5cclxuICAgICAgPGNpcmNsZSBjeD1cIjE1MFwiIGN5PVwiNTBcIiByPVwiNFwiIC8+XHJcblxyXG4gICAgICA8c3ZnIHZpZXdCb3g9XCIwIDAgMTAgMTBcIiB4PVwiMjAwXCIgd2lkdGg9XCIxMDBcIj5cclxuICAgICAgICA8Y2lyY2xlIGN4PVwiNVwiIGN5PVwiNVwiIHI9XCI0XCIgLz5cclxuICAgICAgPC9zdmc+XHJcbiAgICA8L3N2Zz5cclxuICA8L2Rpdj5cclxuKTtcclxuXHJcbmZ1bmN0aW9uIG1hcmt1cDIobnVtOiBhbnkpIHtcclxuICByZXR1cm4gKFxyXG4gICAgPGRpdiBpZD1cIm91dGVyXCI+XHJcbiAgICAgIDw+XHJcbiAgICAgICAgPD5cclxuICAgICAgICAgIDxwPm5lc3RlZCBmcmFnbWVudDwvcD5cclxuICAgICAgICA8Lz5cclxuICAgICAgPC8+XHJcbiAgICAgIDxoMT5zdGF0aWM8L2gxPlxyXG4gICAgICA8aDE+ZHluYW1pYyB2YWw6IHtudW19PC9oMT5cclxuICAgICAge251bSA9PT0gMSA/IDxoMT5vbGQ8L2gxPiA6IGZhbHNlfVxyXG4gICAgICB7bnVtID09PSAxID8gKFxyXG4gICAgICAgIDw+XHJcbiAgICAgICAgICA8aDE+ZnJhZyBvbGQ8L2gxPlxyXG4gICAgICAgICAgPHNwYW4+ZnJhZyBzcGFuIG9sZDwvc3Bhbj5cclxuICAgICAgICA8Lz5cclxuICAgICAgKSA6IChcclxuICAgICAgICA8aDE+ZnJhZyBuZXc8L2gxPlxyXG4gICAgICApfVxyXG4gICAgICA8Q29tcCBudW09e251bX0gLz5cclxuICAgIDwvZGl2PlxyXG4gICk7XHJcbn1cclxuZnVuY3Rpb24gTkwoKSB7XHJcbiAgcmV0dXJuIG51bGw7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIG1hcmt1cDMobnVtOiBhbnkpIHtcclxuICByZXR1cm4gbnVtID09PSAxID8gKFxyXG4gICAgPGgxPlxyXG4gICAgICBBLUxpbmUgMSAtIHtudW19XHJcbiAgICAgIDxTcGFuIG1vZGU9e251bX0gLz5cclxuICAgICAgPEJ1dHRvblxyXG4gICAgICAgIGRpc2FibGVkPXt0cnVlfVxyXG4gICAgICAgIHJlZj17KGVsOiBIVE1MRWxlbWVudCkgPT4gY29uc29sZS5sb2coXCJteSBCVVRUT046OnJlZjo6NVwiLCBlbCl9XHJcbiAgICAgID5cclxuICAgICAgICB0ZXh0XHJcbiAgICAgICAgPHBvcHVwLWluZm9cclxuICAgICAgICAgIHJlZj17KGVsOiBIVE1MRWxlbWVudCkgPT4gY29uc29sZS5sb2coXCJzcGFuIGluIEJVVFRPTjo6cmVmOjo2XCIsIGVsKX1cclxuICAgICAgICA+XHJcbiAgICAgICAgICBibGFcclxuICAgICAgICA8L3BvcHVwLWluZm8+XHJcbiAgICAgICAgPHA+aW5uZXIgcCB7bnVtfTwvcD5cclxuICAgICAgPC9CdXR0b24+XHJcbiAgICAgIEEtTGluZSAzXHJcbiAgICAgIDw+XHJcbiAgICAgICAgPHA+XHJcbiAgICAgICAgICA8cD5BIEZyYWcgbGluZSAxKjwvcD5cclxuICAgICAgICA8L3A+XHJcbiAgICAgICAgPHA+QSBGcmFnIGxpbmUgMjwvcD5cclxuICAgICAgICA8cD5BIEZyYWcgbGluZSAzPC9wPlxyXG4gICAgICAgIDxwPkEgRnJhZyBsaW5lIDQ8L3A+XHJcbiAgICAgICAgPHN2Z1xyXG4gICAgICAgICAgdmlld0JveD1cIjAgMCAzMDAgMTAwXCJcclxuICAgICAgICAgIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIlxyXG4gICAgICAgICAgc3Ryb2tlPVwicmVkXCJcclxuICAgICAgICAgIGZpbGw9XCJncmV5XCJcclxuICAgICAgICA+XHJcbiAgICAgICAgICA8Y2lyY2xlIGN4PVwiNTBcIiBjeT1cIjUwXCIgcj1cIjQwXCIgLz5cclxuICAgICAgICAgIDxjaXJjbGUgY3g9XCIxNTBcIiBjeT1cIjUwXCIgcj1cIjRcIiAvPlxyXG5cclxuICAgICAgICAgIDxzdmcgdmlld0JveD1cIjAgMCAxMCAxMFwiIHg9XCIyMDBcIiB3aWR0aD1cIjEwMFwiPlxyXG4gICAgICAgICAgICA8Y2lyY2xlIGN4PVwiNVwiIGN5PVwiNVwiIHI9XCI0XCIgLz5cclxuICAgICAgICAgIDwvc3ZnPlxyXG4gICAgICAgIDwvc3ZnPlxyXG4gICAgICA8Lz5cclxuICAgICAge251bGx9XHJcbiAgICA8L2gxPlxyXG4gICkgOiAoXHJcbiAgICA8aDEgY2xhc3M9XCJhXCIgIHJlZj17Y29uc29sZS5pbmZvfT5cclxuICAgICAgQiBMaW5lIDEgLSB7bnVtfVxyXG4gICAgICA8U3BhbiBtb2RlPXtudW19IC8+XHJcbiAgICAgIDxCdXR0b25cclxuICAgICAgICBkaXNhYmxlZD17dHJ1ZX1cclxuICAgICAgICByZWY9eyhlbDogSFRNTEVsZW1lbnQpID0+IGNvbnNvbGUubG9nKFwibXkgQlVUVE9OOjpyZWY6OjVcIiwgZWwpfVxyXG4gICAgICA+XHJcbiAgICAgICAgdGV4dFxyXG4gICAgICAgIDxwb3B1cC1pbmZvXHJcbiAgICAgICAgICByZWY9eyhlbDogSFRNTEVsZW1lbnQpID0+IGNvbnNvbGUubG9nKFwic3BhbiBpbiBCVVRUT046OnJlZjo6NlwiLCBlbCl9XHJcbiAgICAgICAgPlxyXG4gICAgICAgICAgYmxhXHJcbiAgICAgICAgPC9wb3B1cC1pbmZvPlxyXG4gICAgICAgIDxwPntudW19PC9wPlxyXG4gICAgICA8L0J1dHRvbj5cclxuICAgICAgPD5cclxuICAgICAgICB7ZmFsc2V9XHJcbiAgICAgICAge251bGx9XHJcbiAgICAgICAge3VuZGVmaW5lZH1cclxuICAgICAgPC8+XHJcbiAgICAgIDw+XHJcbiAgICAgICAgPHA+QiBGcmFnIGxpbmUgMTwvcD5cclxuICAgICAgICA8cD5CIEZyYWcgbGluZSAyPC9wPlxyXG4gICAgICAgIHt1bmRlZmluZWR9XHJcbiAgICAgICAgPHA+QiBGcmFnIGxpbmUgMyg0KTwvcD5cclxuICAgICAgICA8c3ZnXHJcbiAgICAgICAgICB2aWV3Qm94PVwiMCAwIDMwMCAxMDBcIlxyXG4gICAgICAgICAgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiXHJcbiAgICAgICAgICBzdHJva2U9XCJyZWRcIlxyXG4gICAgICAgICAgZmlsbD1cImdyZXlcIlxyXG4gICAgICAgID5cclxuICAgICAgICAgIDxjaXJjbGUgY3g9XCI1MFwiIGN5PVwiNTBcIiByPVwiNDBcIiAvPlxyXG4gICAgICAgICAgPGNpcmNsZSBjeD1cIjE1MFwiIGN5PVwiNTBcIiByPVwiNFwiIC8+XHJcblxyXG4gICAgICAgICAgPHN2ZyB2aWV3Qm94PVwiMCAwIDEwIDEwXCIgeD1cIjIwMFwiIHdpZHRoPVwiMTAwXCI+XHJcbiAgICAgICAgICAgIDxjaXJjbGUgY3g9XCI1XCIgY3k9XCI1XCIgcj1cIjZcIiAvPlxyXG4gICAgICAgICAgPC9zdmc+XHJcbiAgICAgICAgPC9zdmc+XHJcbiAgICAgICAgPHA+QiBGcmFnIGxpbmUgNCg2KTwvcD5cclxuICAgICAgPC8+XHJcbiAgICA8L2gxPlxyXG4gICk7XHJcbn1cclxuY29uc3Qgb2JqID0geyBhOiAxIH07XHJcblxyXG5mdW5jdGlvbiBtYXJrdXA0KG51bTogYW55KSB7XHJcbiAgb2JqLmEgPSBudW07XHJcbiAgcmV0dXJuIG51bSA9PT0gMSA/IChcclxuICAgIDxoMSBvYmo9e29ian0gaWQ9e29iai5hfT5cclxuICAgICAgb2xkLUhlYWRsaW5lIHtudW19XHJcbiAgICA8L2gxPlxyXG4gICkgOiAoXHJcbiAgICA8aDEgb2JqPXtvYmp9IGNsYXNzPVwiYVwiIGlkPXtvYmouYX0+XHJcbiAgICAgIG5ldy1IZWFkbGluZSB7bnVtfVxyXG4gICAgPC9oMT5cclxuICApO1xyXG59XHJcblxyXG5mdW5jdGlvbiBtYXJrdXAobnVtOiBhbnkpIHtcclxuICByZXR1cm4gbnVtID09PSAxID8gKFxyXG4gICAgPGRpdj5cclxuICAgICAgPD5cclxuICAgICAgICA8cD5mcmFnIC0gSTwvcD5cclxuICAgICAgICA8Yj4gZnJhZyAtIElJPC9iPlxyXG4gICAgICA8Lz5cclxuICAgIDwvZGl2PlxyXG4gICkgOiAoXHJcbiAgICA8aDEgY2xhc3M9XCJhXCI+XHJcbiAgICAgIHtcIm5ldy1IZWFkbGluZVwifSB7bnVtfVxyXG4gICAgPC9oMT5cclxuICApO1xyXG59XHJcblxyXG5mdW5jdGlvbiBtYXJrdXA1KG51bTogYW55KSB7XHJcbiAgcmV0dXJuIG51bSA9PT0gMSA/IChcclxuICAgIDxkaXY+XHJcbiAgICAgIHtyYXdIdG1sKGA8ZGl2IGNsYXNzPVwia1wiPnR4dDwvZGl2PjxpbnB1dCB0eXBlPXJhZGlvXCIgLz5gKX1cclxuICAgICAgPENvbXAzIC8+XHJcbiAgICAgIHtlbH1cclxuICAgIDwvZGl2PlxyXG4gICkgOiAoXHJcbiAgICA8ZGl2PlxyXG4gICAgICB7cmF3SHRtbChgPGRpdiBjbGFzcz1cImtcIj50eHQ8L2Rpdj48aW5wdXQgdHlwZT1yYWRpb1wiIC8+YCl9XHJcbiAgICAgIHtudWxsfVxyXG4gICAgICB7ZWx9XHJcbiAgICA8L2Rpdj5cclxuICApO1xyXG59XHJcblxyXG5mdW5jdGlvbiBtYXJrdXA2KGEpIHtcclxuXHJcbiAgcmV0dXJuICAoXHJcbiAgICA8ZGl2PlxyXG5cclxuICAgICAgPHN2ZyBpZD1cImZvbzZcIiB2aWV3Qm94PVwiMCAwIDEwIDEwXCIgeD1cIjIwMFwiIHdpZHRoPVwiMTAwXCI+XHJcbiAgICAgICAgICAgIHthICYmIDxjaXJjbGUgY3g9XCI1XCIgY3k9XCI1XCIgcj1cIjZcIiAvPn1cclxuICAgICAgICAgIDwvc3ZnPlxyXG4gICAgICA8YnV0dG9uPnN1Ym1pdDwvYnV0dG9uPlxyXG4gICAgPC9kaXY+XHJcbiAgKSAgO1xyXG59XHJcblxyXG4vL2NvbnNvbGUubG9nKG1hcmt1cCk7XHJcbi8vd2luZG93Lm1hcmt1cCA9IG1hcmt1cDtcclxuXHJcbmNsYXNzIFBvcFVwSW5mbyBleHRlbmRzIEhUTUxFbGVtZW50IHtcclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIC8vIEFsd2F5cyBjYWxsIHN1cGVyIGZpcnN0IGluIGNvbnN0cnVjdG9yXHJcbiAgICBzdXBlcigpO1xyXG5cclxuICAgIC8vIHdyaXRlIGVsZW1lbnQgZnVuY3Rpb25hbGl0eSBpbiBoZXJlXHJcblxyXG4gICAgY29uc29sZS5sb2coXCIjIyMjIyMjIyMjIyMjIyMjI2N0b3IgQ0VcIik7XHJcbiAgfVxyXG5cclxuICBjb25uZWN0ZWRDYWxsYmFjaygpIHtcclxuICAgIGNvbnNvbGUubG9nKFwiIyMjIyMjIyMjIyMjIyMjIyNDdXN0b20gc3F1YXJlIGVsZW1lbnQgYWRkZWQgdG8gcGFnZS5cIik7XHJcbiAgfVxyXG59XHJcblxyXG5jdXN0b21FbGVtZW50cy5kZWZpbmUoXCJwb3B1cC1pbmZvXCIsIFBvcFVwSW5mbyk7XHJcblxyXG4vL2RvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjb2xkXCIpIS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgY29uc29sZS5sb2cpO1xyXG5cclxuLy9kb2N1bWVudC5ib2R5LmlubmVySFRNTCA9IG1hcmt1cDtcclxuLy8vL3JlbmRlcihtYXJrdXAzKDEpLCBkb2N1bWVudC5ib2R5KTtcclxuLy9kb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm91dGVyXCIpPy5zZXRBdHRyaWJ1dGUoXCJkYXRhLWZvb1wiLCBcIm1vZFwiKTtcclxuXHJcbi8vZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJpbm5lclwiKT8uc2V0QXR0cmlidXRlKFwiZGF0YS1mb29cIiwgXCJtb2RcIik7XHJcbi8vcmVuZGVyKG1hcmt1cCgyKSwgZG9jdW1lbnQuYm9keSk7XHJcbi8vcmVuZGVyKG1hcmt1cCwgZG9jdW1lbnQuYm9keSwgdHJ1ZSk7XHJcbmNvbnN0IGVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNvbGRcIik7XHJcbmZ1bmN0aW9uIENvbXAyKCkge1xyXG4gIHJldHVybiAoXHJcbiAgICA8PlxyXG4gICAgICB7cmF3SHRtbChgPGRpdiBjbGFzcz1cImtcIj50eHQ8L2Rpdj48aW5wdXQgdHlwZT1yYWRpb1wiIC8+YCl9XHJcbiAgICAgIDxDb21wMyAvPlxyXG4gICAgICB7ZWx9XHJcbiAgICA8Lz5cclxuICApO1xyXG59XHJcbmZ1bmN0aW9uIENvbXAzKCkge1xyXG4gIHJldHVybiA8ZGl2PmNvbXAgY29udGVudDwvZGl2PjtcclxufVxyXG5cclxuY29uc3QgJGNvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY29udGFpbmVyXCIpXHJcblxyXG53aW5kb3cucmVSZW5kZXIxID0gKCkgPT5cclxuICByZW5kZXIobWFya3VwMygxKSwkY29udGFpbmVyKTtcclxud2luZG93LnJlUmVuZGVyMiA9ICgpID0+XHJcbiAgcmVuZGVyKG1hcmt1cDMoMiksJGNvbnRhaW5lcik7XHJcbndpbmRvdy5yZVJlbmRlcjMgPSAoKSA9PlxyXG4gIHJlbmRlcihcclxuICAgIC8vIDxkaXY+dHh0PC9kaXY+XHJcbiAgICA8Q29tcDIgLz4sXHJcbiAgICRjb250YWluZXJcclxuICApO1xyXG5cclxuY29uc29sZS5sb2coXCIxMjM0NVwiKTtcclxud2luZG93LnNzID0gKCkgPT4gbWFya3VwMygxKSArIFwiXCI7XHJcbndpbmRvdy5zczIgPSAoKSA9PiB7XHJcbiAgY29uc29sZS5sb2cobWFya3VwMygxKSk7XHJcblxyXG4gIC8vZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjb250YWluZXJcIikuaW5uZXJIVE1MID0gbWFya3VwMygxKTtcclxufTtcclxuXHJcbndpbmRvdy5yZVJlbmRlcjVhID0gKCkgPT5cclxuICByZW5kZXIobWFya3VwNSgxKSwkY29udGFpbmVyKTtcclxud2luZG93LnJlUmVuZGVyNWIgPSAoKSA9PlxyXG4gIHJlbmRlcihtYXJrdXA1KDIpLCRjb250YWluZXIpO1xyXG5cclxuXHJcblxyXG4gIHJlbmRlcigoXHJcbiAgPGgyIGNsYXNzPVwiYVwiIHJlZj17Y29uc29sZS53YXJufT5cclxuICAgIDw+XHJcbiAgICAgIDxoMT5cclxuICAgICAgICBoZWFkaW5nXHJcbiAgICAgIDwvaDE+XHJcbiAgICAgIDxzdmcgdmlld0JveD1cIjAgMCAxMCAxMFwiIHg9XCIyMDBcIiB3aWR0aD1cIjEwMFwiPlxyXG4gICAgICAgIDxjaXJjbGUgY3g9XCI1XCIgY3k9XCI1XCIgcj1cIjZcIiAvPlxyXG4gICAgICA8L3N2Zz5cclxuICAgIDwvPlxyXG4gIDwvaDI+XHJcbiAgKSwkY29udGFpbmVyKTtcclxuXHJcblxyXG4gIHdpbmRvdy5yZVJlbmRlclJlZiA9ICgpID0+IHJlbmRlcigoPGgyIGNsYXNzPVwiYVwiICByZWY9e2NvbnNvbGUud2Fybn0+SGVhZGluZyB3aXRoIHJlZjwvaDI+KSwkY29udGFpbmVyKTtcclxuICB3aW5kb3cucmVSZW5kZXI2YSA9ICgpID0+IHJlbmRlcihtYXJrdXA2KCksJGNvbnRhaW5lcik7XHJcbiAgd2luZG93LnJlUmVuZGVyNmIgPSAoKSA9PiByZW5kZXIoKDxjaXJjbGUgY3g9XCI1XCIgY3k9XCI1XCIgcj1cIjZcIiAvPiksIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZm9vNlwiKSk7XHJcbiAgd2luZG93LnJlUmVuZGVyU3ZnID0gKCkgPT4gcmVuZGVyKG1hcmt1cDEoKSwkY29udGFpbmVyKTtcclxuICB3aW5kb3cucmVSZW5kZXJTdmcyID0gKCkgPT4gcmVuZGVyKG1hcmt1cDEoKSwkY29udGFpbmVyKTtcclxuXHJcblxyXG4iXSwic291cmNlUm9vdCI6IiJ9