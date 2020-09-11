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
  console.log("getParentElementNode", vNode);

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
  console.log("siblings", siblings);
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
  console.log("insertNewItem", {
    newNode,
    parent,
    nextSibling
  });
  parent.insertBefore(newNode.asNode(), nextSibling);
}

function diffAndPatchChildren(oldNode, newNode) {
  oldNode.children.forEach((oldChild, ix) => {
    const newChild = newNode.children[ix]; // child was removed

    if (!newChild) oldChild.removeFromDOM(); // child is modified
    else if (newChild.type === oldChild.type) oldChild.diffAndPatch(newChild); // child is replaced
      else {
          console.log("child is replaced", {
            oldChild,
            newChild
          });
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
    console.log({
      node
    });
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
      console.log("remove from dom rawHtml");
      this.childNodes.forEach(node => node.parentElement.removeChild(node));
    }

    diffAndPatch(newNode) {
      console.log("LiveNode diffAndPatch");

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
// @TODO: ref calls
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
}

function markup5(num) {
  return num === 1 ? Object(C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])("div", {
    children: [Object(C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["rawHtml"])("<div class=\"k\">txt</div><input type=radio\" />"), Object(C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(Comp3, {}), el]
  }) : Object(C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])("div", {
    children: [Object(C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["rawHtml"])("<div class=\"k\">txt</div><input type=radio\" />"), null, el]
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vanN4L2pzeC1ydW50aW1lLnRzIiwid2VicGFjazovLy8uL21haW4udHN4Il0sIm5hbWVzIjpbInJlbmRlcmVkVlRyZWVzIiwiV2Vha01hcCIsInJlZnNUb0NhbGwiLCJKc3hOb2RlIiwiY29uc3RydWN0b3IiLCJwcm9wcyIsImdldFBhcmVudEVsZW1lbnROb2RlIiwidk5vZGUiLCJjb25zb2xlIiwibG9nIiwicGFyZW50Iiwibm9kZSIsImdldENoaWxkcmVuV2l0aE5vZGVzIiwiYWx3YXlzQWxsb3ciLCJjaGlsZHJlbiIsIm1hcCIsImNoaWxkTm9kZSIsImZsYXQiLCJJbmZpbml0eSIsImdldFBhcmVudEFuZE5leHRTaWJsaW5nIiwicGFyZW50V2l0aEVsZW1lbnQiLCJzaWJsaW5ncyIsInByZXZTaWJsaW5nIiwiaW5kZXhPZiIsIm5leHRTaWJsaW5nTm9kZSIsIm5leHRTaWJsaW5nIiwiX2NhbGxSZWZzIiwiU3ltYm9sIiwic3ZnQ29udGV4dCIsInRydXRoeSIsInZhbHVlIiwidW5kZWZpbmVkIiwic2FuaXRpemUiLCJ0ZXh0IiwiZGl2IiwiZG9jdW1lbnQiLCJjcmVhdGVFbGVtZW50IiwiaW5uZXJUZXh0IiwiaW5uZXJIVE1MIiwiZ2V0T3V0ZXJIdG1sIiwiZWxlbWVudCIsIkVsZW1lbnQiLCJvdXRlckhUTUwiLCJUZXh0Iiwid2hvbGVUZXh0IiwiRG9jdW1lbnRGcmFnbWVudCIsIkFycmF5IiwiZnJvbSIsImNoaWxkTm9kZXMiLCJlbCIsImpvaW4iLCJ3YXJuIiwiYXNIdG1sU3RyaW5nIiwidGFnIiwiYXR0cmlidXRlcyIsIk9iamVjdCIsImVudHJpZXMiLCJmaWx0ZXIiLCJrZXkiLCJ2IiwiayIsImlzQXJyYXkiLCJjb250ZW50IiwiY2hpbGQiLCJ0b1N0cmluZyIsImFzTm9kZSIsImZyYWdtZW50cyIsIml0ZW0iLCJkb2N1bWVudEZyYWdtZW50IiwiY3JlYXRlRG9jdW1lbnRGcmFnbWVudCIsImFwcGVuZCIsImVycm9yIiwicmVzdWx0IiwianN4Tm9kZXMiLCJWTm9kZSIsImZvckVhY2giLCJzdGFydHNXaXRoIiwiZXZlbnQiLCJyZXBsYWNlIiwiYWRkRXZlbnRMaXN0ZW5lciIsImF0dHJzIiwic3ZnQ29udGV4dFNldCIsImNyZWF0ZUVsZW1lbnROUyIsIl9rZXkiLCJzZXRBdHRyaWJ1dGUiLCJTdHJpbmciLCJjaGlsZEpzeE5vZGVzIiwiaW5zZXJ0TmV3SXRlbSIsIm5ld05vZGUiLCJpbnNlcnRCZWZvcmUiLCJkaWZmQW5kUGF0Y2hDaGlsZHJlbiIsIm9sZE5vZGUiLCJvbGRDaGlsZCIsIml4IiwibmV3Q2hpbGQiLCJyZW1vdmVGcm9tRE9NIiwidHlwZSIsImRpZmZBbmRQYXRjaCIsIm5ld0l0ZW1zIiwic2xpY2UiLCJsZW5ndGgiLCJFbGVtZW50Vk5vZGUiLCJGcmFnbWVudFZOb2RlIiwiTm9kZSIsIkxpdmVOb2RlVk5vZGUiLCJOdWxsVk5vZGUiLCJUZXh0Vk5vZGUiLCJwYXJlbnRFbGVtZW50IiwicmVtb3ZlQ2hpbGQiLCJyZW1vdmVBdHRyaWJ1dGUiLCJoYXNPd25Qcm9wZXJ0eSIsInJlcGxhY2VXaXRoIiwibmV3Vk5vZGUiLCJ0ZXh0Tm9kZSIsImNyZWF0ZVRleHROb2RlIiwibm9kZVZhbHVlIiwibmV3Tm9kZTIiLCJSb290Vk5vZGUiLCJkb21Ob2RlIiwicmVtb3ZlIiwiYXNWTm9kZSIsImF0dHIiLCJqc3hzIiwicmVmIiwiRnJhZ21lbnQiLCJqc3giLCJyZW5kZXIiLCJtYXJrdXAiLCJib2R5IiwicXVlcnlTZWxlY3RvckFsbCIsInN0eWxlIiwiYmFja2dyb3VuZCIsInNwbGljZSIsImlzUmVSZW5kZXIiLCJoYXMiLCJpbnNlcnRBZGphY2VudEhUTUwiLCJpbnNlcnRBZGphY2VudEVsZW1lbnQiLCJ2VHJlZSIsIm9sZFZUcmVlIiwiZ2V0IiwibmV3VlRyZWUiLCJzZXQiLCJjYiIsIkVycm9yIiwicmF3SHRtbCIsInRlbXBsYXRlIiwieHNzIiwiUlRFIiwidHh0IiwiQnV0dG9uIiwiZGlzYWJsZWQiLCJyZWZsb2ciLCJTcGFuIiwibW9kZSIsIkNvbXAiLCJudW0iLCJtYXJrdXAxIiwibWFya3VwMiIsIk5MIiwibWFya3VwMyIsIm9iaiIsImEiLCJtYXJrdXA0IiwibWFya3VwNSIsIlBvcFVwSW5mbyIsIkhUTUxFbGVtZW50IiwiY3VzdG9tRWxlbWVudHMiLCJkZWZpbmUiLCJxdWVyeVNlbGVjdG9yIiwiQ29tcDIiLCJDb21wMyIsIndpbmRvdyIsInJlUmVuZGVyMSIsImdldEVsZW1lbnRCeUlkIiwicmVSZW5kZXIyIiwicmVSZW5kZXIzIiwic3MiLCJzczIiLCJyZVJlbmRlcjVhIiwicmVSZW5kZXI1YiJdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EseUNBQXlDLGlDQUFpQztRQUMxRSxnSEFBZ0gsbUJBQW1CLEVBQUU7UUFDckk7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBCLEVBQUU7UUFDdkQsaUNBQWlDLGVBQWU7UUFDaEQ7UUFDQTtRQUNBOztRQUVBO1FBQ0Esc0RBQXNELCtEQUErRDs7UUFFckg7UUFDQTs7O1FBR0E7UUFDQTs7Ozs7Ozs7Ozs7OztBQ2xGQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxNQUFNQSxjQUFjLEdBQUcsSUFBSUMsT0FBSixFQUF2QjtBQUNBLE1BQU1DLFVBQXNCLEdBQUcs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R0FBWTtBQUFBLFNBQU1qQixPQUFPLENBQUMsQ0FBRCxDQUFQLEdBQWEsRUFBbkI7QUFBQSxDQUFaOztBQUNBWSxNQUFNLENBQUNNLEdBQVAsR0FBYSxZQUFNO0FBQ2pCekssU0FBTyxDQUFDQyxHQUFSLENBQVlzSixPQUFPLENBQUMsQ0FBRCxDQUFuQixFQURpQixDQUdqQjtBQUNELENBSkQ7O0FBTUFZLE1BQU0sQ0FBQ08sVUFBUCxHQUFvQjtBQUFBLFNBQ2xCcEQsbUZBQU0sQ0FBQ3FDLE9BQU8sQ0FBQyxDQUFELENBQVIsRUFBYWhJLFFBQVEsQ0FBQzBJLGNBQVQsQ0FBd0IsV0FBeEIsQ0FBYixDQURZO0FBQUEsQ0FBcEI7O0FBRUFGLE1BQU0sQ0FBQ1EsVUFBUCxHQUFvQjtBQUFBLFNBQ2xCckQsbUZBQU0sQ0FBQ3FDLE9BQU8sQ0FBQyxDQUFELENBQVIsRUFBYWhJLFFBQVEsQ0FBQzBJLGNBQVQsQ0FBd0IsV0FBeEIsQ0FBYixDQURZO0FBQUEsQ0FBcEIsQyIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDApO1xuIiwiY29uc3QgcmVuZGVyZWRWVHJlZXMgPSBuZXcgV2Vha01hcDxIVE1MRWxlbWVudCwgUm9vdFZOb2RlPigpO1xyXG5jb25zdCByZWZzVG9DYWxsOiBGdW5jdGlvbltdID0gW107XHJcblxyXG4vKipcclxuICogcHJvdmlkZXMgZnVuY3Rpb25zIG5lZWRlZCBieSBiYWJlbCBmb3IgYSBjdXN0b20gcHJhZ21hXHJcbiAqIHRvIHJlbmRlciBwYXJzZWQganN4IGNvZGUgdG8gaHRtbFxyXG4gKi9cclxuXHJcbi8vIHByb3BzIHdoaWNoIHdpbGwgYmUgcmVuZGVyZWQgYXMgYXR0cmlidXRlc1xyXG4vLyBGdW5jdGlvbnMgd2lsbCBiZSB1c2VkIGZvciBldmVudCBsaXN0ZW5lcnMuICh3aXRoIGF0dHJpYnV0ZSBuYW1lIHN0YXJ0aW5nIHdpdGggJ29uLScpXHJcbnR5cGUgQXR0cmlidXRlcyA9IHsgW2tleTogc3RyaW5nXTogc3RyaW5nIHwgYm9vbGVhbiB8IG51bWJlciB8IEZ1bmN0aW9uIH07XHJcblxyXG4vLyBhZGRpdGlvbmFsIGF0dHJpYnV0ZXMgd2hpY2ggY2FuIGhhdmUgYWRkaXRpb25hbCBzZXJpYWxpemF0aW9uIGJlZm9yZSByZW5kZXJpbmcgYXMgYXR0cmlidXRlc1xyXG50eXBlIFNwZWNpYWxBdHRyaWJ1dGVzID0ge1xyXG4gIGNsYXNzPzogc3RyaW5nIHwgc3RyaW5nW107XHJcbiAgc3R5bGU/OiBzdHJpbmcgfCB7IFtrZXk6IHN0cmluZ106IHN0cmluZyB9O1xyXG4gIHJlZj86IEZ1bmN0aW9uO1xyXG59O1xyXG5cclxuLy8gY2hpbGQgZWxlbWVudHMgaW4gdGhlIGpzeCBtYXJrdXAgd2hpY2ggd2lsbCBiZSBwYXNzZWQgdG8gdGhlIGggZnVuY3Rpb24gYXMgYHByb3BzLmNoaWxkcmVuYFxyXG50eXBlIENoaWxkcmVuUHJvcHMgPSB7XHJcbiAgLy8gbmVzdGVkIGFycmF5IGluIGNhc2Ugb2ZcclxuICAvLyA8ZWxlbT5cclxuICAvLyAgIDxzcGFuLz5cclxuICAvLyAgIHtjaGlsZHJlbn1cclxuICAvLyAgIDxkaXYvPlxyXG4gIC8vIDwvZWxlbT5cclxuICBjaGlsZHJlbjogQXJyYXk8XHJcbiAgICBOb2RlIHwgSnN4Tm9kZUludGVyZmFjZSB8IHN0cmluZyB8IEFycmF5PE5vZGUgfCBKc3hOb2RlSW50ZXJmYWNlIHwgc3RyaW5nPlxyXG4gID47XHJcbn07XHJcblxyXG4vKipcclxuICogcHJvcHMgb2JqZWN0IHdoaWNoIHdpbGwgYmUgcGFzc2VkIHRvIGpzeCBwcmFnbWEgYW5kIGN1c3RvbSBjb21wb25lbnQgZnVuY3Rpb25zXHJcbiAqL1xyXG50eXBlIEpzeFByb3BzID0gQXR0cmlidXRlcyAmIFNwZWNpYWxBdHRyaWJ1dGVzICYgQ2hpbGRyZW5Qcm9wcztcclxuXHJcbi8vIGJhc2UgY2xhc3Mgd2hpY2ggd2lsbCBiZSBpbmhlcml0ZWQgZnJvbSBqc3ggYW5kIGZyYWdtZW50cyBmdW5jdGlvbiBub2RlIGdlbmVyYXRpb25cclxuLy8gYW5kIHdpbGwgYmUgdXNlZCB0byBkaXN0aW5ndWlzaCB0aGVtIHdpdGggb3RoZXIgRWxlbWVudHNcclxuY2xhc3MgSnN4Tm9kZSB7XHJcbiAgcHJvcHM6IEpzeFByb3BzO1xyXG4gIGNvbnN0cnVjdG9yKHByb3BzOiBKc3hQcm9wcykge1xyXG4gICAgdGhpcy5wcm9wcyA9IHByb3BzO1xyXG4gIH1cclxufVxyXG5cclxuLy8gbnVsbCB3aGVuIGNoZWNraW5nIHRoZSBwYXJlbnQgd2hlbiByb290IGlzIGZyYWdtZW50IGl0c2VsZlxyXG5mdW5jdGlvbiBnZXRQYXJlbnRFbGVtZW50Tm9kZSh2Tm9kZTogVk5vZGVJbnRlcmZhY2UpOiBFbGVtZW50Vk5vZGUge1xyXG4gIGNvbnNvbGUubG9nKFwiZ2V0UGFyZW50RWxlbWVudE5vZGVcIiwgdk5vZGUpO1xyXG5cclxuICB3aGlsZSAodk5vZGUucGFyZW50KSB7XHJcbiAgICB2Tm9kZSA9IHZOb2RlLnBhcmVudDtcclxuICAgIC8vIGAubm9kZWAgaXMgb25seSBvbiBcIlRleHRcIiBhbmQgXCJFbGVtZW50XCIsIFwiUmF3SHRtbFwiIHR5cGUgVk5vZGUsIGFuZCBvbmx5IEVsZW1lbnQgaGFzIGNoaWxkcmVuXHJcbiAgICBpZiAodk5vZGUubm9kZSkgYnJlYWs7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gKHZOb2RlIGFzIHVua25vd24pIGFzIEVsZW1lbnRWTm9kZTtcclxufVxyXG5cclxuZnVuY3Rpb24gZ2V0Q2hpbGRyZW5XaXRoTm9kZXMoXHJcbiAgdk5vZGU6IFZOb2RlSW50ZXJmYWNlLFxyXG4gIGFsd2F5c0FsbG93PzogVk5vZGVJbnRlcmZhY2VcclxuKTogVk5vZGVJbnRlcmZhY2VbXSB7XHJcbiAgdk5vZGUuY2hpbGRyZW47XHJcbiAgcmV0dXJuIHZOb2RlLmNoaWxkcmVuXHJcbiAgICAubWFwKChjaGlsZE5vZGUpID0+IHtcclxuICAgICAgaWYgKGNoaWxkTm9kZSA9PT0gYWx3YXlzQWxsb3cpIHJldHVybiBjaGlsZE5vZGU7XHJcbiAgICAgIGlmIChjaGlsZE5vZGUubm9kZSkgcmV0dXJuIGNoaWxkTm9kZTtcclxuICAgICAgcmV0dXJuIGdldENoaWxkcmVuV2l0aE5vZGVzKGNoaWxkTm9kZSwgYWx3YXlzQWxsb3cpO1xyXG4gICAgfSlcclxuICAgIC5mbGF0KEluZmluaXR5KSBhcyBWTm9kZUludGVyZmFjZVtdO1xyXG59XHJcblxyXG5mdW5jdGlvbiBnZXRQYXJlbnRBbmROZXh0U2libGluZyh2Tm9kZTogVk5vZGVJbnRlcmZhY2UpOiBbTm9kZSwgTm9kZSB8IG51bGxdIHtcclxuICAvLyBub2RlIGFuY2VzdG9yIHdpdGggRWxlbWVudCxcclxuICBjb25zdCBwYXJlbnRXaXRoRWxlbWVudCA9IGdldFBhcmVudEVsZW1lbnROb2RlKHZOb2RlKTtcclxuICBjb25zdCBzaWJsaW5ncyA9IGdldENoaWxkcmVuV2l0aE5vZGVzKHBhcmVudFdpdGhFbGVtZW50LCB2Tm9kZSk7XHJcbiAgY29uc29sZS5sb2coXCJzaWJsaW5nc1wiLCBzaWJsaW5ncyk7XHJcblxyXG4gIGNvbnN0IHByZXZTaWJsaW5nID0gc2libGluZ3Nbc2libGluZ3MuaW5kZXhPZih2Tm9kZSkgLSAxXTtcclxuICBjb25zdCBuZXh0U2libGluZ05vZGUgPSBwcmV2U2libGluZyA/IHByZXZTaWJsaW5nLm5vZGUhLm5leHRTaWJsaW5nIDogbnVsbDtcclxuXHJcbiAgcmV0dXJuIFtwYXJlbnRXaXRoRWxlbWVudC5ub2RlLCBuZXh0U2libGluZ05vZGVdO1xyXG59XHJcblxyXG4vLyBwcml2YXRlIGtleSBmb3IgY2FsbGluZyB0aGUgYHJlZmAgY2FsbGVyc1xyXG5jb25zdCBfY2FsbFJlZnMgPSBTeW1ib2woXCJjYWxsUmVmc1wiKTtcclxuXHJcbi8vIHRoZSBjdXJyZW50IG1hcmt1cCB3aGljaCBpcyByZW5kZXJlZCBpcyBuZXN0ZWQgaW4gYW4gc3ZnIGVsZW1lbnRcclxubGV0IHN2Z0NvbnRleHQgPSBmYWxzZTtcclxuXHJcbi8vIGpzeCBhbmQgRnJhZ21lbnQgd2lsbCByZXR1cm4gb2JqZWN0cyB3aGljaCBpbXBsZW1lbnQgdGhpcyBpbnRlcmZhY2VcclxuZXhwb3J0IGludGVyZmFjZSBKc3hOb2RlSW50ZXJmYWNlIGV4dGVuZHMgSnN4Tm9kZSB7XHJcbiAgdG9TdHJpbmcoKTogc3RyaW5nO1xyXG4gIGFzTm9kZSgpOiBOb2RlO1xyXG4gIGFzVk5vZGUoKTogVk5vZGU7XHJcbiAgW19jYWxsUmVmc10oKTogdm9pZDtcclxufVxyXG5cclxuLyoqXHJcbiAqIHJldHVybnMgdHJ1ZSBpZiBub3QgbnVsbGlzaCBvciBmYWxzZVxyXG4gKiB0aGF0IG1lYW5zIDAgb3IgZW1wdHkgc3RyaW5nIGFyZSBhbGxvd2VkXHJcbiAqIEBwYXJhbSB7Kn0gdmFsXHJcbiAqL1xyXG5mdW5jdGlvbiB0cnV0aHkodmFsdWU6IGFueSk6IGJvb2xlYW4ge1xyXG4gIHJldHVybiB2YWx1ZSAhPT0gZmFsc2UgJiYgdmFsdWUgIT09IG51bGwgJiYgdmFsdWUgIT09IHVuZGVmaW5lZDtcclxufVxyXG5cclxuLyoqXHJcbiAqIGVzY2FwZXMgdGhlIHByb3ZpZGVkIHN0cmluZyBhZ2FpbnN0IHhzcyBhdHRhY2tzIGV0Y1xyXG4gKlxyXG4gKiBAcGFyYW0ge3N0cmluZ30gdGV4dFxyXG4gKiBAcmV0dXJucyB7c3RyaW5nfVxyXG4gKi9cclxuZnVuY3Rpb24gc2FuaXRpemUodGV4dDogc3RyaW5nKTogc3RyaW5nIHtcclxuICBjb25zdCBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gIGRpdi5pbm5lclRleHQgPSB0ZXh0O1xyXG4gIHJldHVybiBkaXYuaW5uZXJIVE1MO1xyXG59XHJcblxyXG4vKipcclxuICogYmFzaWNhbGx5IGBFbGVtZW50Lm91dGVySFRNTGAgYnV0IGFsc28gc3VwcG9ydHMgVGV4dCBub2RlIGFuZCBEb2N1bWVudEZyYWdtZW50XHJcbiAqIEBwYXJhbSBlbGVtZW50IHtOb2RlfSAtIGVsZW1lbnQgd2hpY2ggaXRzIGh0bWwgbmVlZHMgdG8gYmUgcmV0dXJuZWRcclxuICovXHJcbmZ1bmN0aW9uIGdldE91dGVySHRtbChlbGVtZW50OiBOb2RlKTogc3RyaW5nIHtcclxuICBpZiAoZWxlbWVudCBpbnN0YW5jZW9mIEVsZW1lbnQpIHJldHVybiBlbGVtZW50Lm91dGVySFRNTDtcclxuICBpZiAoZWxlbWVudCBpbnN0YW5jZW9mIFRleHQpIHJldHVybiBzYW5pdGl6ZShlbGVtZW50Lndob2xlVGV4dCk7XHJcbiAgaWYgKGVsZW1lbnQgaW5zdGFuY2VvZiBEb2N1bWVudEZyYWdtZW50KVxyXG4gICAgcmV0dXJuIEFycmF5LmZyb20oZWxlbWVudC5jaGlsZE5vZGVzKVxyXG4gICAgICAubWFwKChlbCkgPT4gZ2V0T3V0ZXJIdG1sKGVsKSlcclxuICAgICAgLmpvaW4oXCJcIik7XHJcblxyXG4gIC8vIHNob3VsZG4ndCByZWFjaCB0aGlzIHBvaW50XHJcbiAgY29uc29sZS53YXJuKFwiZ2V0T3V0ZXJIdG1sIGRvZXMgbm90IHN1cHBvcnQgdGhpcyB0eXBlIG9mIGVsZW1lbnRcIiwgZWxlbWVudCk7XHJcbiAgcmV0dXJuIFwiXCI7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBnZW5lcmF0ZXMgdGhlIGh0bWwgYXMgYSBzdHJpbmcgd2hpY2ggY2FuIGJlIHVzZWQgZm9yIGV4YW1wbGUgd2l0aCBgZWxlbWVudC5pbm5lckhUTUwoKWBcclxuICpcclxuICogQHBhcmFtIHRhZyB7c3RyaW5nfEZ1bmN0aW9ufSAtIHRhZyBhcmd1bWVudCBvZiB0aGUganN4IGNhbGxcclxuICogQHBhcmFtIHByb3BzIHtPYmplY3R9IC0gcHJvcHMgYXJndW1lbnQgb2YganN4IGNhbGxcclxuICovXHJcbmZ1bmN0aW9uIGFzSHRtbFN0cmluZyh0YWc6IHN0cmluZyB8IEZ1bmN0aW9uLCBwcm9wczogSnN4UHJvcHMsIGNoaWxkcmVuKSB7XHJcbiAgY29uc3QgYXR0cmlidXRlcyA9IE9iamVjdC5lbnRyaWVzKHByb3BzKVxyXG4gICAgLmZpbHRlcigoWywgdmFsdWVdKSA9PiB0cnV0aHkodmFsdWUpKVxyXG4gICAgLm1hcCgoW2tleSwgdmFsdWVdKSA9PiB7XHJcbiAgICAgIC8vIGUuZy4gZGlzYWJsZWQ6IHRydWUgPT4gPHRhZyBkaXNhYmxlZD5cclxuICAgICAgaWYgKHZhbHVlID09PSB0cnVlKSByZXR1cm4ga2V5O1xyXG5cclxuICAgICAgLy8gZm9yIHN0eWxlIGFzIG9iamVjdDpcclxuICAgICAgLy8gKHN0eWxlOikge2Rpc3BsYXk6IFwibm9uZVwiLCBwb3NpdGlvbjogXCJhYnNvbHV0ZVwifSA9PT4gJ2Rpc3BsYXk6IG5vbmU7IHBvc2l0aW9uOiBhYnNvbHV0ZTsnXHJcbiAgICAgIGlmIChrZXkgPT09IFwic3R5bGVcIiAmJiB0eXBlb2YgdmFsdWUgPT09IFwib2JqZWN0XCIpXHJcbiAgICAgICAgdmFsdWUgPSBPYmplY3QuZW50cmllcyh2YWx1ZSlcclxuICAgICAgICAgIC8vIGlnbm9yZSBzdHVmZiBsaWtlIGB7YmFja2dyb3VuZDogYWN0aXZlICYmIFwicmVkXCJ9YCB3aGVuIGBhY3RpdmUgPT09IGZhbHNlIC8gbnVsbCAvIHVuZGVmaW5lZGBcclxuICAgICAgICAgIC5maWx0ZXIoKFssIHZdKSA9PiB0cnV0aHkodikpXHJcbiAgICAgICAgICAvLyBjdXJyZW50bHkgc3VwcG9ydHMgXCJiYWNrZ3JvdW5kLWNvbG9yXCIgbm90IFwiYmFja2dyb3VuZENvbG9yXCJcclxuICAgICAgICAgIC5tYXAoKFtrLCB2XSkgPT4gYCR7a306ICR7dn1gKVxyXG4gICAgICAgICAgLmpvaW4oXCI7IFwiKTtcclxuXHJcbiAgICAgIC8vIChjbGFzczopIFtcImJ0blwiLCBcInJlZFwiXSA9PT4gXCJidG4gcmVkXCJcclxuICAgICAgaWYgKGtleSA9PT0gXCJjbGFzc1wiICYmIEFycmF5LmlzQXJyYXkodmFsdWUpKSB2YWx1ZSA9IHZhbHVlLmpvaW4oXCIgXCIpO1xyXG5cclxuICAgICAgcmV0dXJuIGAke2tleX09XCIke3ZhbHVlfVwiYDtcclxuICAgIH0pXHJcbiAgICAuam9pbihcIiBcIik7XHJcblxyXG4gIGNvbnN0IGNvbnRlbnQgPSBjaGlsZHJlbi5tYXAoKGNoaWxkKSA9PiBjaGlsZC50b1N0cmluZygpKS5qb2luKFwiXCIpO1xyXG5cclxuICByZXR1cm4gYDwke3RhZ30gJHthdHRyaWJ1dGVzfT4ke2NvbnRlbnR9PC8ke3RhZ30+YDtcclxufVxyXG5cclxuLyoqXHJcbiAqIGdlbmVyYXRlcyBIVE1MIE5vZGUgZWxlbWVudHMgZnJvbSB0aGUgcHJvdmlkZWQganN4IHRyZWVcclxuICogQHBhcmFtIHRhZyB7c3RyaW5nfEZ1bmN0aW9ufSAtIHRhZyBhcmd1bWVudCBvZiB0aGUganN4IGNhbGxcclxuICogQHBhcmFtIHByb3BzIHtPYmplY3R9IC0gcHJvcHMgYXJndW1lbnQgb2YganN4IGNhbGxcclxuICovXHJcbmZ1bmN0aW9uIGFzTm9kZShcclxuICB0YWc6IHN0cmluZyB8IEZ1bmN0aW9uIHwgdW5kZWZpbmVkLFxyXG4gIHByb3BzOiBBdHRyaWJ1dGVzICYgU3BlY2lhbEF0dHJpYnV0ZXMsIC8vSnN4UHJvcHMsXHJcbiAgY2hpbGRyZW46IGFueVtdXHJcbik6IFtOb2RlLCBKc3hOb2RlSW50ZXJmYWNlW11dIHtcclxuICBjb25zb2xlLmxvZyhcImFzTm9kZSgpXCIsIHsgdGFnLCBwcm9wcywgY2hpbGRyZW4gfSk7XHJcblxyXG4gIC8vIGZyYWdtZW50XHJcbiAgaWYgKCF0YWcpIHtcclxuICAgIGNvbnN0IGZyYWdtZW50cyA9IGNoaWxkcmVuXHJcbiAgICAgIC5mbGF0KCkgLy8gP1xyXG4gICAgICAubWFwKChpdGVtKSA9PiBpdGVtLmFzTm9kZSgpKTtcclxuXHJcbiAgICBjb25zdCBkb2N1bWVudEZyYWdtZW50ID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO1xyXG5cclxuICAgIGRvY3VtZW50RnJhZ21lbnQuYXBwZW5kKC4uLmZyYWdtZW50cyk7XHJcbiAgICByZXR1cm4gW2RvY3VtZW50RnJhZ21lbnQsIFtdXTtcclxuICB9XHJcblxyXG4gIC8vIHNob3VsZG4ndFxyXG4gIGlmICh0eXBlb2YgdGFnID09PSBcImZ1bmN0aW9uXCIpIHtcclxuICAgIGNvbnNvbGUuZXJyb3IoXCJzaG91bGRuJ3QgcmVhY2ggdGhpcyBpbiB2VHJlZSBtb2RlXCIpO1xyXG4gICAgLy8gZXhwZWN0aW5nIHRoZSB0YWcgZnVuY3Rpb24gdG8gcmV0dXJuIGpzeC5cclxuICAgIC8vIGhlcmUgaXQgd2lsbCBhbHNvIHdvcmsgd2hlbiBpdCByZXR1cm5zIEhUTUxFbGVtZW50XHJcbiAgICBsZXQgcmVzdWx0ID0gdGFnKHByb3BzKTtcclxuXHJcbiAgICBsZXQganN4Tm9kZXM6IEpzeE5vZGVJbnRlcmZhY2VbXSA9IFtdO1xyXG5cclxuICAgIGlmIChyZXN1bHQgaW5zdGFuY2VvZiBWTm9kZSkge1xyXG4gICAgICBqc3hOb2RlcyA9IFtyZXN1bHQgYXMgSnN4Tm9kZUludGVyZmFjZV07XHJcbiAgICAgIHJlc3VsdCA9IChyZXN1bHQgYXMgSnN4Tm9kZUludGVyZmFjZSkuYXNOb2RlKCk7XHJcbiAgICAgIE9iamVjdC5lbnRyaWVzKHByb3BzKS5mb3JFYWNoKChba2V5LCB2YWx1ZV0pID0+IHtcclxuICAgICAgICBpZiAoXHJcbiAgICAgICAgICBrZXkuc3RhcnRzV2l0aChcIm9uLVwiKSAmJlxyXG4gICAgICAgICAgKHR5cGVvZiB2YWx1ZSA9PT0gXCJmdW5jdGlvblwiIHx8IHR5cGVvZiB2YWx1ZSA9PT0gXCJvYmplY3RcIilcclxuICAgICAgICApIHtcclxuICAgICAgICAgIC8vIHJlbW92ZSBsZWFkaW5nIFwib24tXCJcIlxyXG4gICAgICAgICAgY29uc3QgZXZlbnQgPSBrZXkucmVwbGFjZSgvXm9uLS8sIFwiXCIpO1xyXG5cclxuICAgICAgICAgIHJlc3VsdC5hZGRFdmVudExpc3RlbmVyKFxyXG4gICAgICAgICAgICBldmVudCxcclxuICAgICAgICAgICAgdmFsdWUgYXMgRXZlbnRMaXN0ZW5lck9yRXZlbnRMaXN0ZW5lck9iamVjdFxyXG4gICAgICAgICAgKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBbcmVzdWx0LCBqc3hOb2Rlc107XHJcbiAgfVxyXG5cclxuICBjb25zdCB7IC4uLmF0dHJzIH0gPSBwcm9wcztcclxuICAvLyByZW1lbWJlciBpZiB0aGUgc3ZnIGNvbnRleHQgd2FzIHNldCBmb3IgdGhpcyBub2RlLCBhbmQgcmVwbGFjZSBhZnRlciBnZW5lcmF0aW5nIGFsbCBjaGlsZHJlblxyXG4gIGxldCBzdmdDb250ZXh0U2V0ID0gZmFsc2U7XHJcblxyXG4gIC8vIHNldCB0aGUgY29udGV4dCBvZiBtYXJrdXAgd2hpY2ggaXMgcmVuZGVyZWQgYXMgU1ZHIChvciBpdHMgY2hpbGRyZW4pXHJcbiAgLy8gbm8gbmVlZCBmb3IgcmUtc2V0dGluZyB0aGUgY29udGV4dCBmb3IgbmVzdGVkIFNWR3NcclxuICBpZiAoIXN2Z0NvbnRleHQgJiYgdGFnID09PSBcInN2Z1wiKSB7XHJcbiAgICBzdmdDb250ZXh0ID0gdHJ1ZTtcclxuICAgIHN2Z0NvbnRleHRTZXQgPSB0cnVlO1xyXG4gIH1cclxuXHJcbiAgLy8gY3VycmVudGx5IG5vdCBzdXBwb3J0aW5nIHRoZSBgaXNgIG9wdGlvbiBmb3IgQ3VzdG9taXplZCBidWlsdC1pbiBlbGVtZW50c1xyXG4gIGNvbnN0IG5vZGUgPSBzdmdDb250ZXh0XHJcbiAgICA/IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyhcImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIsIHRhZylcclxuICAgIDogZG9jdW1lbnQuY3JlYXRlRWxlbWVudCh0YWcpO1xyXG5cclxuICBPYmplY3QuZW50cmllcyhhdHRycylcclxuICAgIC5maWx0ZXIoKFtfa2V5LCB2YWx1ZV0pID0+IHRydXRoeSh2YWx1ZSkpXHJcbiAgICAuZm9yRWFjaCgoW2tleSwgdmFsdWVdKSA9PiB7XHJcbiAgICAgIC8vIGZvciBzdHlsZSBhcyBvYmplY3Q6XHJcbiAgICAgIC8vIChzdHlsZTopIHtkaXNwbGF5OiBcIm5vbmVcIiwgcG9zaXRpb246IFwiYWJzb2x1dGVcIn0gPT0+ICdkaXNwbGF5OiBub25lOyBwb3NpdGlvbjogYWJzb2x1dGU7J1xyXG4gICAgICBpZiAoa2V5ID09PSBcInN0eWxlXCIgJiYgdHlwZW9mIHZhbHVlID09PSBcIm9iamVjdFwiKVxyXG4gICAgICAgIHZhbHVlID0gT2JqZWN0LmVudHJpZXModmFsdWUpXHJcbiAgICAgICAgICAuZmlsdGVyKChbLCB2XSkgPT4gdHJ1dGh5KHYpKVxyXG4gICAgICAgICAgLm1hcCgoW2ssIHZdKSA9PiBgJHtrfTogJHt2fWApXHJcbiAgICAgICAgICAuam9pbihcIjsgXCIpO1xyXG5cclxuICAgICAgLy8gKGNsYXNzOikgW1wiYnRuXCIsIFwicmVkXCJdID09PiBcImJ0biByZWRcIlxyXG4gICAgICBpZiAoa2V5ID09PSBcImNsYXNzXCIgJiYgQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHZhbHVlID0gdmFsdWUuam9pbihcIiBcIik7XHJcblxyXG4gICAgICBpZiAodmFsdWUgPT09IHRydWUpIG5vZGUuc2V0QXR0cmlidXRlKGtleSwgXCJcIik7XHJcbiAgICAgIGVsc2UgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gXCJzdHJpbmdcIiB8fCB0eXBlb2YgdmFsdWUgPT09IFwibnVtYmVyXCIpXHJcbiAgICAgICAgbm9kZS5zZXRBdHRyaWJ1dGUoa2V5LCBTdHJpbmcodmFsdWUpKTtcclxuICAgICAgLy8ga2V5IGhhcyB0aGUgZm9ybSBvZiBcIm9uLWNoYW5nZVwiLiB2YWx1ZSBpcyB0aGUgY2FsbGJhY2sgZnVuY3Rpb24gb3IgYW4gb2JqZWN0IGltcGxlbWVudGluZyB7RXZlbnRMaXN0ZW5lcn0gaW50ZXJmYWNlXHJcbiAgICAgIGVsc2UgaWYgKFxyXG4gICAgICAgIGtleS5zdGFydHNXaXRoKFwib24tXCIpICYmXHJcbiAgICAgICAgKHR5cGVvZiB2YWx1ZSA9PT0gXCJmdW5jdGlvblwiIHx8IHR5cGVvZiB2YWx1ZSA9PT0gXCJvYmplY3RcIilcclxuICAgICAgKSB7XHJcbiAgICAgICAgLy8gcmVtb3ZlIGxlYWRpbmcgXCJvbi1cIlwiXHJcbiAgICAgICAgY29uc3QgZXZlbnQgPSBrZXkucmVwbGFjZSgvXm9uLS8sIFwiXCIpO1xyXG5cclxuICAgICAgICBub2RlLmFkZEV2ZW50TGlzdGVuZXIoXHJcbiAgICAgICAgICBldmVudCxcclxuICAgICAgICAgIHZhbHVlIGFzIEV2ZW50TGlzdGVuZXJPckV2ZW50TGlzdGVuZXJPYmplY3RcclxuICAgICAgICApO1xyXG4gICAgICB9XHJcbiAgICAgIC8vIEB0cy1pZ25vcmUgLSBwcm92aWRpbmcgdGhlIHZhbHVlIGFzIHByb3BlcnR5IHRvIGh0bWwgZWxlbWVudFxyXG4gICAgICBlbHNlIG5vZGVba2V5XSA9IHZhbHVlO1xyXG4gICAgfSk7XHJcblxyXG4gIC8vIHJldHVybnMgY2hpbGQganN4IG5vZGVzIGFzIHdlbGwgdG8gYmUgdXNlZCBkdXJpbmcgdGhlIHJlZiBjYWxsXHJcbiAgY29uc3QgY2hpbGRKc3hOb2RlcyA9IGNoaWxkcmVuLmZpbHRlcigoY2hpbGQpID0+IGNoaWxkIGluc3RhbmNlb2YgVk5vZGUpO1xyXG5cclxuICBjb25zb2xlLmxvZyh7IGNoaWxkcmVuIH0pO1xyXG5cclxuICBub2RlLmFwcGVuZChcclxuICAgIC4uLmNoaWxkcmVuXHJcbiAgICAgIC5mbGF0KClcclxuICAgICAgLy8uZmlsdGVyKHRydXRoeSlcclxuICAgICAgLmZpbHRlcigoY2hpbGQpID0+IGNoaWxkLnRhZyAhPT0gXCJfX05VTExfX1wiKVxyXG4gICAgICAubWFwKChjaGlsZCkgPT4gY2hpbGQuYXNOb2RlKCkpXHJcbiAgKTtcclxuXHJcbiAgLy8gc3ZnIGVsZW1lbnQgYW5kIGFsbCBpdHMgY2hpbGRyZW4gd2VyZSByZW5kZXJlZCwgcmVzZXQgdGhlIHN2ZyBjb250ZXh0XHJcbiAgaWYgKHN2Z0NvbnRleHRTZXQpIHN2Z0NvbnRleHQgPSBmYWxzZTtcclxuXHJcbiAgcmV0dXJuIFtub2RlLCBjaGlsZEpzeE5vZGVzIGFzIEpzeE5vZGVJbnRlcmZhY2VbXV07XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGluc2VydE5ld0l0ZW0obmV3Tm9kZTogVk5vZGVJbnRlcmZhY2UpIHtcclxuXHJcbiAgY29uc3QgW3BhcmVudCwgbmV4dFNpYmxpbmddID0gZ2V0UGFyZW50QW5kTmV4dFNpYmxpbmcobmV3Tm9kZSk7XHJcbiAgY29uc29sZS5sb2coXCJpbnNlcnROZXdJdGVtXCIsIHtuZXdOb2RlLCBwYXJlbnQsIG5leHRTaWJsaW5nfSk7XHJcbiAgcGFyZW50Lmluc2VydEJlZm9yZShuZXdOb2RlLmFzTm9kZSgpLCBuZXh0U2libGluZyk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGRpZmZBbmRQYXRjaENoaWxkcmVuKFxyXG4gIG9sZE5vZGU6IFZOb2RlSW50ZXJmYWNlLFxyXG4gIG5ld05vZGU6IFZOb2RlSW50ZXJmYWNlXHJcbikge1xyXG4gIG9sZE5vZGUuY2hpbGRyZW4uZm9yRWFjaCgob2xkQ2hpbGQsIGl4KSA9PiB7XHJcbiAgICBjb25zdCBuZXdDaGlsZCA9IG5ld05vZGUuY2hpbGRyZW5baXhdO1xyXG4gICAgLy8gY2hpbGQgd2FzIHJlbW92ZWRcclxuICAgIGlmICghbmV3Q2hpbGQpIG9sZENoaWxkLnJlbW92ZUZyb21ET00oKTtcclxuICAgIC8vIGNoaWxkIGlzIG1vZGlmaWVkXHJcbiAgICBlbHNlIGlmIChuZXdDaGlsZC50eXBlID09PSBvbGRDaGlsZC50eXBlKSBvbGRDaGlsZC5kaWZmQW5kUGF0Y2gobmV3Q2hpbGQpO1xyXG4gICAgLy8gY2hpbGQgaXMgcmVwbGFjZWRcclxuICAgIGVsc2Uge1xyXG4gICAgICBjb25zb2xlLmxvZyhcImNoaWxkIGlzIHJlcGxhY2VkXCIsIHsgb2xkQ2hpbGQsIG5ld0NoaWxkIH0pO1xyXG5cclxuICAgICAgb2xkQ2hpbGQucmVtb3ZlRnJvbURPTSgpO1xyXG4gICAgICBpbnNlcnROZXdJdGVtKG5ld0NoaWxkKTtcclxuICAgIH1cclxuICB9KTtcclxuXHJcbiAgLy8gbmV3IGFkZGl0aW9uIGl0ZW1zXHJcbiAgY29uc3QgbmV3SXRlbXMgPSBuZXdOb2RlLmNoaWxkcmVuLnNsaWNlKG9sZE5vZGUuY2hpbGRyZW4ubGVuZ3RoKTtcclxuICBpZiAobmV3SXRlbXMubGVuZ3RoKSB7XHJcbiAgICBjb25zdCBkb2N1bWVudEZyYWdtZW50ID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO1xyXG4gICAgbmV3SXRlbXMuZm9yRWFjaCgoaXRlbSkgPT4gZG9jdW1lbnRGcmFnbWVudC5hcHBlbmQoaXRlbS5hc05vZGUoKSkpO1xyXG5cclxuICAgIGNvbnN0IFtwYXJlbnQsIG5leHRTaWJsaW5nXSA9IGdldFBhcmVudEFuZE5leHRTaWJsaW5nKG5ld0l0ZW1zWzBdKTtcclxuICAgIHBhcmVudC5pbnNlcnRCZWZvcmUoZG9jdW1lbnRGcmFnbWVudCwgbmV4dFNpYmxpbmcpO1xyXG4gIH1cclxufVxyXG5cclxuY2xhc3MgVk5vZGUge31cclxuXHJcbmludGVyZmFjZSBWTm9kZUludGVyZmFjZSB7XHJcbiAgdG9TdHJpbmcoKTogc3RyaW5nO1xyXG4gIGFzTm9kZSgpOiBOb2RlO1xyXG4gIHBhcmVudDogVk5vZGVJbnRlcmZhY2UgfCBudWxsO1xyXG4gIGNoaWxkcmVuOiBBcnJheTxWTm9kZUludGVyZmFjZSB8IG5ldmVyPjtcclxuICB0eXBlOiBzdHJpbmc7XHJcbiAgbm9kZT86IENoaWxkTm9kZTtcclxuICByZW1vdmVGcm9tRE9NKCk6IHZvaWQ7XHJcbiAgZGlmZkFuZFBhdGNoKG5ld05vZGU6IFZOb2RlSW50ZXJmYWNlKTogdm9pZDtcclxufVxyXG5cclxuY2xhc3MgRWxlbWVudFZOb2RlIGV4dGVuZHMgVk5vZGUgaW1wbGVtZW50cyBWTm9kZUludGVyZmFjZSB7XHJcbiAgdHlwZSA9IFwiRWxlbWVudFwiO1xyXG4gIG5vZGUgPSBudWxsIGFzIGFueTtcclxuICBjaGlsZHJlbjogVk5vZGVJbnRlcmZhY2VbXTtcclxuICBwYXJlbnQ6IFZOb2RlSW50ZXJmYWNlID0gbnVsbCBhcyBhbnk7XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSB0YWc6IHN0cmluZyxcclxuICAgIHByaXZhdGUgcHJvcHM6IFJlY29yZDxzdHJpbmcsIGFueT4sXHJcbiAgICBjaGlsZHJlbjogVk5vZGVJbnRlcmZhY2VbXVxyXG4gICkge1xyXG4gICAgc3VwZXIoKTtcclxuICAgIHRoaXMuY2hpbGRyZW4gPSBjaGlsZHJlbi5tYXAoKGNoaWxkKSA9PiB7XHJcbiAgICAgIGlmIChBcnJheS5pc0FycmF5KGNoaWxkKSkgcmV0dXJuIG5ldyBGcmFnbWVudFZOb2RlKGNoaWxkKTtcclxuICAgICAgaWYgKGNoaWxkIGluc3RhbmNlb2YgVk5vZGUpIHtcclxuICAgICAgICByZXR1cm4gY2hpbGQ7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKGNoaWxkIGluc3RhbmNlb2YgTm9kZSkge1xyXG4gICAgICAgIHJldHVybiBuZXcgTGl2ZU5vZGVWTm9kZShjaGlsZCk7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKCF0cnV0aHkoY2hpbGQpKSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBOdWxsVk5vZGUoKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgcmV0dXJuIG5ldyBUZXh0Vk5vZGUoY2hpbGQpO1xyXG4gICAgfSk7XHJcbiAgICB0aGlzLmNoaWxkcmVuLmZvckVhY2goKGNoaWxkKSA9PiAoY2hpbGQucGFyZW50ID0gdGhpcykpO1xyXG4gIH1cclxuICB0b1N0cmluZygpIHtcclxuICAgIHJldHVybiBhc0h0bWxTdHJpbmcodGhpcy50YWcsIHRoaXMucHJvcHMsIHRoaXMuY2hpbGRyZW4pO1xyXG4gIH1cclxuICBhc05vZGUoKSB7XHJcbiAgICBjb25zdCBub2RlID0gYXNOb2RlKHRoaXMudGFnLCB0aGlzLnByb3BzLCB0aGlzLmNoaWxkcmVuKVswXTtcclxuICAgIHRoaXMubm9kZSA9IG5vZGU7XHJcbiAgICByZXR1cm4gbm9kZTtcclxuICB9XHJcbiAgcmVtb3ZlRnJvbURPTSgpIHtcclxuICAgIHRoaXMubm9kZS5wYXJlbnRFbGVtZW50LnJlbW92ZUNoaWxkKHRoaXMubm9kZSk7XHJcbiAgfVxyXG4gIGRpZmZBbmRQYXRjaChuZXdOb2RlOiBFbGVtZW50Vk5vZGUpIHtcclxuICAgIGlmIChuZXdOb2RlLnRhZyA9PT0gdGhpcy50YWcpIHtcclxuICAgICAgbmV3Tm9kZS5ub2RlID0gdGhpcy5ub2RlO1xyXG4gICAgICAvLyAgICAgIHBhdGNoIHByb3BzLFxyXG4gICAgICAvLyB1cGRhdGUgcHJvcHMgZm9ybSBuZXcgbm9kZVxyXG4gICAgICBPYmplY3QuZW50cmllcyhuZXdOb2RlLnByb3BzKVxyXG4gICAgICAgIC5maWx0ZXIoKFtrLCB2XSkgPT4gdGhpcy5wcm9wc1trXSAhPT0gdilcclxuICAgICAgICAuZm9yRWFjaCgoW2tleSwgdmFsdWVdKSA9PiB7XHJcbiAgICAgICAgICBpZiAodmFsdWUgPT09IHRydWUpIG5ld05vZGUubm9kZS5zZXRBdHRyaWJ1dGUoa2V5LCBcIlwiKTtcclxuICAgICAgICAgIGVsc2UgaWYgKHZhbHVlID09PSBudWxsIHx8IHZhbHVlID09PSB1bmRlZmluZWQgfHwgdmFsdWUgPT09IGZhbHNlKVxyXG4gICAgICAgICAgICBuZXdOb2RlLm5vZGUucmVtb3ZlQXR0cmlidXRlKGtleSk7XHJcbiAgICAgICAgICBlbHNlIG5ld05vZGUubm9kZS5zZXRBdHRyaWJ1dGUoa2V5LCB2YWx1ZSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAvLyByZW1vdmUgb2xkLCBvYnNvbGF0ZSBhdHRyaWJ1dGVzXHJcbiAgICAgIE9iamVjdC5lbnRyaWVzKHRoaXMucHJvcHMpXHJcbiAgICAgICAgLmZpbHRlcigoW2ssIHZdKSA9PiAhbmV3Tm9kZS5wcm9wcy5oYXNPd25Qcm9wZXJ0eShrKSlcclxuICAgICAgICAuZm9yRWFjaCgoW2tleSwgdmFsdWVdKSA9PiB7XHJcbiAgICAgICAgICB0aGlzLm5vZGUucmVtb3ZlQXR0cmlidXRlKGtleSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAvLyBjaGlsZHJlbiA9PiBpdGVyIGFuZCBwYXRjaFxyXG4gICAgICAvLyBvbGQgY2hpbGRyZW4gYmVpbmcgbW9kaWZpZWRcclxuICAgICAgZGlmZkFuZFBhdGNoQ2hpbGRyZW4odGhpcywgbmV3Tm9kZSk7XHJcbiAgICB9XHJcbiAgICAvLyB0YWcgaGFzIGNoYW5nZWRcclxuICAgIGVsc2Uge1xyXG4gICAgICB0aGlzLm5vZGUucmVwbGFjZVdpdGgobmV3Tm9kZS5hc05vZGUoKSk7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG5jbGFzcyBGcmFnbWVudFZOb2RlIGV4dGVuZHMgVk5vZGUgaW1wbGVtZW50cyBWTm9kZUludGVyZmFjZSB7XHJcbiAgdHlwZSA9IFwiRnJhZ21lbnRcIjtcclxuICBjaGlsZHJlbjogVk5vZGVJbnRlcmZhY2VbXTtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBjaGlsZHJlbjogQXJyYXk8XHJcbiAgICAgIFZOb2RlSW50ZXJmYWNlIHwgQ2hpbGROb2RlIHwgc3RyaW5nIHwgYm9vbGVhbiB8IG51bGwgfCB1bmRlZmluZWQgfCBudW1iZXJcclxuICAgID5cclxuICApIHtcclxuICAgIHN1cGVyKCk7XHJcblxyXG4gICAgdGhpcy5jaGlsZHJlbiA9IGNoaWxkcmVuLm1hcCgoY2hpbGQpID0+IHtcclxuICAgICAgaWYgKEFycmF5LmlzQXJyYXkoY2hpbGQpKSByZXR1cm4gbmV3IEZyYWdtZW50Vk5vZGUoY2hpbGQpO1xyXG4gICAgICBpZiAoY2hpbGQgaW5zdGFuY2VvZiBWTm9kZSkgcmV0dXJuIGNoaWxkO1xyXG4gICAgICBpZiAoY2hpbGQgaW5zdGFuY2VvZiBOb2RlKSByZXR1cm4gbmV3IExpdmVOb2RlVk5vZGUoY2hpbGQpO1xyXG4gICAgICBpZiAoIXRydXRoeShjaGlsZCkpIHJldHVybiBuZXcgTnVsbFZOb2RlKCk7XHJcbiAgICAgIHJldHVybiBuZXcgVGV4dFZOb2RlKGNoaWxkIGFzIHN0cmluZyB8IG51bWJlcik7XHJcbiAgICB9KTtcclxuXHJcbiAgICB0aGlzLmNoaWxkcmVuLmZvckVhY2goKGNoaWxkKSA9PiAoY2hpbGQucGFyZW50ID0gdGhpcykpO1xyXG4gIH1cclxuXHJcbiAgYXNOb2RlKCkge1xyXG4gICAgY29uc3Qgbm9kZSA9IGFzTm9kZSh1bmRlZmluZWQsIHt9LCB0aGlzLmNoaWxkcmVuKVswXTtcclxuICAgIGNvbnNvbGUubG9nKHsgbm9kZSB9KTtcclxuXHJcbiAgICByZXR1cm4gbm9kZTtcclxuICB9XHJcblxyXG4gIHRvU3RyaW5nKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuY2hpbGRyZW4ubWFwKChjaGlsZCkgPT4gY2hpbGQudG9TdHJpbmcoKSkuam9pbihcIlwiKTtcclxuICB9XHJcblxyXG4gIC8vIHRvIGxldmVsXHJcbiAgZGlmZkFuZFBhdGNoKG5ld1ZOb2RlOiBGcmFnbWVudFZOb2RlKSB7XHJcbiAgICByZXR1cm4gZGlmZkFuZFBhdGNoQ2hpbGRyZW4odGhpcywgbmV3Vk5vZGUpO1xyXG4gIH1cclxuXHJcbiAgcmVtb3ZlRnJvbURPTSgpIHtcclxuICAgIHRoaXMuY2hpbGRyZW4uZm9yRWFjaCgoY2hpbGQpID0+IGNoaWxkLnJlbW92ZUZyb21ET00oKSk7XHJcbiAgfVxyXG59XHJcblxyXG5jbGFzcyBUZXh0Vk5vZGUgZXh0ZW5kcyBWTm9kZSBpbXBsZW1lbnRzIFZOb2RlSW50ZXJmYWNlIHtcclxuICB0eXBlID0gXCJUZXh0Tm9kZVwiO1xyXG4gIGNoaWxkcmVuID0gW107XHJcbiAgbm9kZTogVGV4dCA9IG51bGwgYXMgYW55O1xyXG4gIHByb3BzOiB7IGNvbnRlbnQ6IGFueSB9O1xyXG4gIHBhcmVudDogVk5vZGVJbnRlcmZhY2UgPSBudWxsIGFzIGFueTtcclxuXHJcbiAgLyoqXHJcbiAgICpcclxuICAgKi9cclxuICBjb25zdHJ1Y3Rvcihjb250ZW50OiBzdHJpbmcgfCBudW1iZXIgfCBib29sZWFuKSB7XHJcbiAgICBzdXBlcigpO1xyXG4gICAgdGhpcy5wcm9wcyA9IHsgY29udGVudCB9OyAvL0BUT0RPOlxyXG4gIH1cclxuXHJcbiAgYXNOb2RlKCkge1xyXG4gICAgY29uc3QgdGV4dE5vZGUgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSh0aGlzLnByb3BzLmNvbnRlbnQpO1xyXG4gICAgdGhpcy5ub2RlID0gdGV4dE5vZGU7XHJcbiAgICByZXR1cm4gdGV4dE5vZGU7XHJcbiAgfVxyXG5cclxuICB0b1N0cmluZygpIHtcclxuICAgIHJldHVybiBzYW5pdGl6ZSh0aGlzLnByb3BzLmNvbnRlbnQpO1xyXG4gIH1cclxuXHJcbiAgZGlmZkFuZFBhdGNoKG5ld05vZGU6IFRleHRWTm9kZSkge1xyXG4gICAgdGhpcy5ub2RlLm5vZGVWYWx1ZSA9IG5ld05vZGUucHJvcHMuY29udGVudDtcclxuICAgIG5ld05vZGUubm9kZSA9IHRoaXMubm9kZTtcclxuICB9XHJcblxyXG4gIHJlbW92ZUZyb21ET00oKSB7XHJcbiAgICB0aGlzLm5vZGUucGFyZW50RWxlbWVudCEucmVtb3ZlQ2hpbGQodGhpcy5ub2RlKTtcclxuICB9XHJcbn1cclxuXHJcbmNsYXNzIE51bGxWTm9kZSBleHRlbmRzIFZOb2RlIGltcGxlbWVudHMgVk5vZGVJbnRlcmZhY2Uge1xyXG4gIHR5cGUgPSBcIk51bGxcIjtcclxuICBjaGlsZHJlbiA9IFtdO1xyXG4gIHBhcmVudDogVk5vZGVJbnRlcmZhY2UgPSBudWxsIGFzIGFueTtcclxuICAvKipcclxuICAgKlxyXG4gICAqL1xyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgc3VwZXIoKTtcclxuICB9XHJcblxyXG4gIGFzTm9kZSgpIHtcclxuICAgIC8vcmV0dXJuIG51bGw7IC8vIHJldHVybiBlbXB0eSBmcmFnbWVudD9cclxuICAgIHJldHVybiBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XHJcbiAgfVxyXG5cclxuICBkaWZmQW5kUGF0Y2gobmV3Tm9kZTI6IE51bGxWTm9kZSkge1xyXG4gICAgcmV0dXJuO1xyXG4gIH1cclxuXHJcbiAgcmVtb3ZlRnJvbURPTSgpIHtcclxuICAgIHJldHVybjtcclxuICB9XHJcblxyXG4gIHRvU3RyaW5nKCkge1xyXG4gICAgcmV0dXJuIFwiXCI7XHJcbiAgfVxyXG59XHJcblxyXG5jbGFzcyBMaXZlTm9kZVZOb2RlIGV4dGVuZHMgVk5vZGUgaW1wbGVtZW50cyBWTm9kZUludGVyZmFjZSB7XHJcbiAgdHlwZSA9IFwiTm9kZVwiO1xyXG4gIGNoaWxkcmVuID0gW107XHJcbiAgcGFyZW50OiBWTm9kZUludGVyZmFjZSA9IG51bGwgYXMgYW55O1xyXG4gIG5vZGU6IENoaWxkTm9kZTtcclxuXHJcbiAgLyoqXHJcbiAgICpcclxuICAgKi9cclxuICBjb25zdHJ1Y3Rvcihub2RlOiBDaGlsZE5vZGUpIHtcclxuICAgIHN1cGVyKCk7XHJcbiAgICB0aGlzLm5vZGUgPSBub2RlO1xyXG4gIH1cclxuXHJcbiAgYXNOb2RlKCkge1xyXG4gICAgcmV0dXJuIHRoaXMubm9kZTtcclxuICB9XHJcblxyXG4gIGRpZmZBbmRQYXRjaChuZXdOb2RlOiBMaXZlTm9kZVZOb2RlKSB7XHJcbiAgICBpZiAobmV3Tm9kZS5ub2RlICE9PSB0aGlzLm5vZGUpIHtcclxuICAgICAgdGhpcy5ub2RlLnJlcGxhY2VXaXRoKG5ld05vZGUubm9kZSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICByZW1vdmVGcm9tRE9NKCkge1xyXG4gICAgdGhpcy5ub2RlLnBhcmVudEVsZW1lbnQhLnJlbW92ZUNoaWxkKHRoaXMubm9kZSk7XHJcbiAgfVxyXG5cclxuICB0b1N0cmluZygpIHtcclxuICAgIHJldHVybiBnZXRPdXRlckh0bWwodGhpcy5ub2RlKTtcclxuICB9XHJcbn1cclxuXHJcbmNsYXNzIFJvb3RWTm9kZSBleHRlbmRzIFZOb2RlIGltcGxlbWVudHMgVk5vZGVJbnRlcmZhY2Uge1xyXG4gIHR5cGUgPSBcIlJvb3RcIjtcclxuICBwYXJlbnQgPSBudWxsO1xyXG4gIG5vZGU6IEVsZW1lbnQ7XHJcbiAgY2hpbGRyZW46IFZOb2RlSW50ZXJmYWNlW107XHJcbiAgLyoqXHJcbiAgICpcclxuICAgKi9cclxuICBjb25zdHJ1Y3Rvcihjb250ZW50LCBkb21Ob2RlOiBFbGVtZW50KSB7XHJcbiAgICBzdXBlcigpO1xyXG4gICAgY29udGVudC5wYXJlbnQgPSB0aGlzO1xyXG4gICAgdGhpcy5jaGlsZHJlbiA9IFtjb250ZW50XTtcclxuICAgIHRoaXMubm9kZSA9IGRvbU5vZGU7XHJcbiAgfVxyXG5cclxuICBhc05vZGUoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5jaGlsZHJlblswXS5hc05vZGUoKTtcclxuICB9XHJcbiAgdG9TdHJpbmcoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5jaGlsZHJlblswXS50b1N0cmluZygpO1xyXG4gIH1cclxuXHJcbiAgZGlmZkFuZFBhdGNoKG5ld1ZOb2RlOiBWTm9kZUludGVyZmFjZSkge1xyXG4gICAgZGlmZkFuZFBhdGNoQ2hpbGRyZW4odGhpcywgbmV3Vk5vZGUpO1xyXG4gIH1cclxuXHJcbiAgcmVtb3ZlRnJvbURPTSgpIHtcclxuICAgIHRoaXMubm9kZS5yZW1vdmUoKTtcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGFzVk5vZGUoXHJcbiAgdGFnOiBzdHJpbmcgfCBGdW5jdGlvbiB8IHVuZGVmaW5lZCxcclxuICBwcm9wczogSnN4UHJvcHNcclxuKTogVk5vZGVJbnRlcmZhY2Uge1xyXG4gIGNvbnNvbGUubG9nKFwiYXNWTm9kZTpcIiwgeyB0YWcsIHByb3BzIH0pO1xyXG5cclxuICBpZiAodHlwZW9mIHRhZyA9PT0gXCJmdW5jdGlvblwiKSB7XHJcbiAgICBsZXQgcmVzdWx0ID0gdGFnKHByb3BzKTtcclxuICAgIGlmIChyZXN1bHQgaW5zdGFuY2VvZiBWTm9kZSkge1xyXG4gICAgICAvL2NvbnNvbGUud2FybihcImFzVk5vZGUgd2l0aCBKc3hOb2RlXCIpO1xyXG4gICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgfVxyXG4gICAgaWYgKHJlc3VsdCBpbnN0YW5jZW9mIE5vZGUpIHtcclxuICAgICAgcmV0dXJuIG5ldyBMaXZlTm9kZVZOb2RlKHJlc3VsdCk7XHJcbiAgICB9XHJcbiAgICAvLyBudWxsIGpzeCBub2RlXHJcbiAgICBpZiAoIXRydXRoeShyZXN1bHQpKSB7XHJcbiAgICAgIHJldHVybiBuZXcgTnVsbFZOb2RlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIG5ldyBUZXh0Vk5vZGUocmVzdWx0KTtcclxuICB9XHJcblxyXG4gIGNvbnN0IHsgY2hpbGRyZW4sIC4uLmF0dHIgfSA9IHByb3BzO1xyXG4gIGlmICh0YWcpIHtcclxuICAgIHJldHVybiBuZXcgRWxlbWVudFZOb2RlKHRhZywgYXR0ciwgY2hpbGRyZW4pOyAvLyBvciBzaW1wbHkgcGFzcyBjaWxkcmVuIHdpdGggcHJvcHNcclxuICB9IGVsc2UgaWYgKCF0cnV0aHkoYXR0cikpIHtcclxuICAgIGNvbnN0IHZOb2RlID0gbmV3IE51bGxWTm9kZSgpO1xyXG4gICAgdk5vZGUucGFyZW50ID0gdGhpcztcclxuICAgIHJldHVybiB2Tm9kZTtcclxuICB9IGVsc2UgaWYgKGNoaWxkcmVuKSB7XHJcbiAgICByZXR1cm4gbmV3IEZyYWdtZW50Vk5vZGUoY2hpbGRyZW4pO1xyXG4gIH1cclxuXHJcbiAgLy8gZWxzZT8gLy8gQFRPRE86P1xyXG59XHJcblxyXG4vKipcclxuICogY29udmVydHMgcHJhZ21hIG9iamVjdCB0byBodG1sIHN0cmluZ1xyXG4gKiBqc3hzIGlzIGFsd2F5cyBjYWxsZWQgd2hlbiBlbGVtZW50IGhhcyBtb3JlIHRoYW4gb25lIGNoaWxkXHJcbiAqXHJcbiAqIEBwYXJhbSB7c3RyaW5nIHwgRnVuY3Rpb259IHRhZyAtIHRhZyBuYW1lIG9yIHRhZyBjbGFzc1xyXG4gKiBAcGFyYW0ge09iamVjdCB8IG51bGx9IHByb3BzIC0gcHJvcHMgZm9yIHRoZSB0YWdcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBqc3hzKFxyXG4gIHRhZzogc3RyaW5nIHwgRnVuY3Rpb24sXHJcbiAgcHJvcHM6IEpzeFByb3BzXHJcbik6IEpzeE5vZGVJbnRlcmZhY2Uge1xyXG4gIHByb3BzLmNoaWxkcmVuID0gcHJvcHMuY2hpbGRyZW4uZmxhdCgpOyAvLyBAVE9ETzogZG9jXHJcblxyXG4gIC8vIGlmIHJlZiBwcm9wIGlzIHByb3ZpZGVkLCBtZW1vcml6ZSBhbmQgcmVtb3ZlIGZyb20gdGhlIGh0bWwgZ2VuZXJhdGlvbiBwcm9jZXNzXHJcbiAgY29uc3QgcmVmOiBGdW5jdGlvbiB8IG51bGwgPVxyXG4gICAgdHlwZW9mIHByb3BzLnJlZiA9PT0gXCJmdW5jdGlvblwiID8gcHJvcHMucmVmIDogbnVsbDtcclxuICBpZiAocmVmKSBkZWxldGUgcHJvcHMucmVmOyAvLyBAVE9ETzpcclxuXHJcbiAgcmV0dXJuIGFzVk5vZGUodGFnLCBwcm9wcyk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBjb252ZXJ0cyB0aGUgZnJhZ21lbnRzIG9iamVjdCB0byBub2Rlc1xyXG4gKlxyXG4gKiBAcGFyYW0ge09iamVjdH0gcHJvcHNcclxuICogQHBhcmFtIHtBcnJheX0gcHJvcHMuY2hpbGRyZW4gLSBjaGlsZCBlbGVtZW50cyBpbiB0aGUgZnJhZ21lbnRcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBGcmFnbWVudChwcm9wczogSnN4UHJvcHMpIHtcclxuICByZXR1cm4gYXNWTm9kZSh1bmRlZmluZWQsIHByb3BzKTtcclxufVxyXG5cclxuLy8ganN4IGlzIGNhbGxlZCB3aGVuIHRoZSBlbGVtZW50IGhhcyBvbmUgb3IgemVybyBjaGlsZHJlblxyXG5leHBvcnQgZnVuY3Rpb24ganN4KFxyXG4gIHRhZzogc3RyaW5nIHwgRnVuY3Rpb24sXHJcbiAgcHJvcHM6IEF0dHJpYnV0ZXMgJlxyXG4gICAgU3BlY2lhbEF0dHJpYnV0ZXMgJiB7IGNoaWxkcmVuPzogc3RyaW5nIHwgTm9kZSB8IEpzeE5vZGVJbnRlcmZhY2UgfVxyXG4pOiBKc3hOb2RlSW50ZXJmYWNlIHtcclxuICAvLyBAdHMtaWdub3JlIC0gd3JhcHBpbmcgdGhlIGNoaWxkcmVuIGFzIGFycmF5IHRvIHJlLXVzZSBqc3hzIG1ldGhvZFxyXG4gIHByb3BzLmNoaWxkcmVuID0gcHJvcHMuaGFzT3duUHJvcGVydHkoXCJjaGlsZHJlblwiKSA/IFtwcm9wcy5jaGlsZHJlbl0gOiBbXTtcclxuXHJcbiAgcmV0dXJuIGpzeHModGFnLCAocHJvcHMgYXMgdW5rbm93bikgYXMgSnN4UHJvcHMpO1xyXG59XHJcblxyXG4vKipcclxuICogcmVuZGVyIHRoZSBnaXZlbiBtYXJrdXAgaW50byB0aGUgZ2l2ZW4gZG9tIG5vZGVcclxuICpcclxuICogQHBhcmFtIHtzdHJpbmd8SFRNTEVsZW1lbnR8SlNYfSBtYXJrdXAgLSBodG1sIGFzIHN0cmluZywgaHRtbCBlbGVtZW50IG9yIGpzeCB0ZW1wbGF0ZVxyXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBkb21Ob2RlIC0gY29udGFpbmVyIGZvciB0aGUgdGVtcGxhdGUgdG8gYmUgcmVuZGVyZWQgaW50b1xyXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFthcHBlbmQ9ZmFsc2VdIC0gc2hvdWxkIHRoZSBwcm92aWRlZCBtYXJrdXAgYmUgYXBwZW5kZWQgdG8gdGhlIGV4aXN0aW5nIG1hcmt1cCwgb3IgZGVmYXVsdCByZXBsYWNlIGl0XHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gcmVuZGVyKFxyXG4gIG1hcmt1cDogc3RyaW5nIHwgSFRNTEVsZW1lbnQgfCBKc3hOb2RlSW50ZXJmYWNlLCAvLyBAVE9ETzogc3BlY2lmaWMgc3VwcG9ydCBmb3IgVGVtcGxhdGU/ICguY29udGVudC5jbG9uZSlcclxuICBkb21Ob2RlOiBIVE1MRWxlbWVudCxcclxuICBhcHBlbmQ6IGJvb2xlYW4gPSBmYWxzZVxyXG4pIHtcclxuICBBcnJheS5mcm9tKGRvY3VtZW50LmJvZHkucXVlcnlTZWxlY3RvckFsbChcIipcIikpLmZvckVhY2goXHJcbiAgICAoZWwpID0+IChlbC5zdHlsZS5iYWNrZ3JvdW5kID0gXCIjY2NmZmNjXCIpXHJcbiAgKTtcclxuXHJcbiAgcmVmc1RvQ2FsbC5zcGxpY2UoMCk7XHJcblxyXG4gIGNvbnN0IGlzUmVSZW5kZXIgPSByZW5kZXJlZFZUcmVlcy5oYXMoZG9tTm9kZSk7XHJcbiAgaWYgKCFhcHBlbmQgJiYgIWlzUmVSZW5kZXIpIGRvbU5vZGUuaW5uZXJIVE1MID0gXCJcIjtcclxuXHJcbiAgaWYgKHR5cGVvZiBtYXJrdXAgPT09IFwic3RyaW5nXCIpIHtcclxuICAgIGRvbU5vZGUuaW5zZXJ0QWRqYWNlbnRIVE1MKFwiYmVmb3JlZW5kXCIsIG1hcmt1cCk7IC8vIHNhbml0aXplP1xyXG4gIH0gZWxzZSBpZiAobWFya3VwIGluc3RhbmNlb2YgTm9kZSkge1xyXG4gICAgZG9tTm9kZS5pbnNlcnRBZGphY2VudEVsZW1lbnQoXCJiZWZvcmVlbmRcIiwgbWFya3VwKTtcclxuICB9IGVsc2UgaWYgKG1hcmt1cCBpbnN0YW5jZW9mIFZOb2RlKSB7XHJcbiAgICBzdmdDb250ZXh0ID0gZmFsc2U7XHJcblxyXG4gICAgY29uc3QgdlRyZWUgPSBuZXcgUm9vdFZOb2RlKG1hcmt1cCwgZG9tTm9kZSk7XHJcblxyXG4gICAgY29uc29sZS5sb2coXCIjIyMjIyMjIyMjI1xcblwiLCBcInZUcmVlOlwiLCB2VHJlZSk7XHJcblxyXG4gICAgaWYgKGlzUmVSZW5kZXIpIHtcclxuICAgICAgY29uc29sZS5sb2coXCJpcyByZS1yZW5kZXJcIik7XHJcbiAgICAgIGNvbnN0IG9sZFZUcmVlID0gcmVuZGVyZWRWVHJlZXMuZ2V0KGRvbU5vZGUpO1xyXG5cclxuICAgICAgY29uc29sZS5sb2coXCIjIyMjIyMjIyMjI1xcblwiLCB7IG9sZFZUcmVlLCBuZXdWVHJlZTogdlRyZWUgfSk7XHJcblxyXG4gICAgICAvLyBkaWZmXHJcbiAgICAgIG9sZFZUcmVlLmRpZmZBbmRQYXRjaCh2VHJlZSk7XHJcblxyXG4gICAgICByZW5kZXJlZFZUcmVlcy5zZXQoZG9tTm9kZSwgdlRyZWUpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY29uc3QgY29udGVudCA9IHZUcmVlLmFzTm9kZSgpO1xyXG4gICAgICBkb21Ob2RlLmFwcGVuZChjb250ZW50KTtcclxuICAgIH1cclxuXHJcbiAgICByZW5kZXJlZFZUcmVlcy5zZXQoZG9tTm9kZSwgdlRyZWUpO1xyXG5cclxuICAgIHJlZnNUb0NhbGwuZm9yRWFjaCgoY2IpID0+IGNiKCkpO1xyXG5cclxuICAgIC8vLy9tYXJrdXBbX2NhbGxSZWZzXSgpO1xyXG4gIH0gZWxzZSB7XHJcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJyZW5kZXIgbWV0aG9kIGNhbGxlZCB3aXRoIHdyb25nIGFyZ3VtZW50KHMpXCIpO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHJhd0h0bWwoY29udGVudDogc3RyaW5nKTogVk5vZGVJbnRlcmZhY2Uge1xyXG4gIHJldHVybiBuZXcgKGNsYXNzIGV4dGVuZHMgVk5vZGUgaW1wbGVtZW50cyBWTm9kZUludGVyZmFjZSB7XHJcbiAgICBwYXJlbnQ6IFZOb2RlSW50ZXJmYWNlID0gbnVsbCBhcyBhbnk7XHJcbiAgICBjaGlsZHJlbiA9IFtdO1xyXG4gICAgdHlwZSA9IFwiUmF3SHRtbFwiO1xyXG4gICAgY2hpbGROb2RlczogQ2hpbGROb2RlW107XHJcbiAgICBjb250ZW50OiBzdHJpbmc7XHJcbiAgICBub2RlPzogQ2hpbGROb2RlO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICpcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IoY29udGVudDogc3RyaW5nKSB7XHJcbiAgICAgIHN1cGVyKCk7XHJcbiAgICAgIHRoaXMuY29udGVudCA9IGNvbnRlbnQ7XHJcbiAgICB9XHJcbiAgICByZW1vdmVGcm9tRE9NKCkge1xyXG4gICAgICBjb25zb2xlLmxvZyhcInJlbW92ZSBmcm9tIGRvbSByYXdIdG1sXCIpO1xyXG5cclxuICAgICAgdGhpcy5jaGlsZE5vZGVzLmZvckVhY2goKG5vZGUpID0+IG5vZGUucGFyZW50RWxlbWVudCEucmVtb3ZlQ2hpbGQobm9kZSkpO1xyXG4gICAgfVxyXG4gICAgZGlmZkFuZFBhdGNoKG5ld05vZGU6IFZOb2RlSW50ZXJmYWNlKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwiTGl2ZU5vZGUgZGlmZkFuZFBhdGNoXCIpO1xyXG5cclxuICAgICAgaWYgKChuZXdOb2RlLmNvbnRlbnQgPSB0aGlzLmNvbnRlbnQpKSB7XHJcbiAgICAgICAgbmV3Tm9kZS5ub2RlID0gdGhpcy5ub2RlO1xyXG4gICAgICAgIG5ld05vZGUuY2hpbGROb2RlcyA9IHRoaXMuY2hpbGROb2RlcztcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuICAgICAgdGhpcy5yZW1vdmVGcm9tRE9NKCk7XHJcbiAgICAgIGluc2VydE5ld0l0ZW0obmV3Tm9kZSk7XHJcbiAgICB9XHJcblxyXG4gICAgdG9TdHJpbmcoKSB7XHJcbiAgICAgIHJldHVybiBjb250ZW50O1xyXG4gICAgfVxyXG5cclxuICAgIGFzTm9kZSgpIHtcclxuICAgICAgY29uc3QgdGVtcGxhdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGVtcGxhdGVcIik7XHJcbiAgICAgIHRlbXBsYXRlLmlubmVySFRNTCA9IHRoaXMuY29udGVudDtcclxuICAgICAgY29uc3QgZG9jdW1lbnRGcmFnbWVudCA9IHRlbXBsYXRlLmNvbnRlbnQ7XHJcbiAgICAgIHRoaXMuY2hpbGROb2RlcyA9IEFycmF5LmZyb20oZG9jdW1lbnRGcmFnbWVudC5jaGlsZE5vZGVzKTtcclxuXHJcbiAgICAgIC8vIGJhc2ljYWxseSB0aGUgYC5ub2RlYCBwcm9wZXJ0eSBpcyB1c2VkIHRvIGRldGVybWluZSB0aGUgbGFzdCBodG1sIG5vZGUgb2YgdGhlIFZOb2RlLFxyXG4gICAgICAvLyB0byBwb3NpdGlvbiB0aGUgbmV4dCBWTm9kZSdzIERPTSBOb2RlIGFmdGVyIGl0LlxyXG4gICAgICAvLyB0aGVyZWZvcmUgLm5vZGUgcmV0dXJucyB0aGUgbGFzdCBub2RlIG9mIHRoZSByYXcgaHRtbFxyXG4gICAgICBpZiAodGhpcy5jaGlsZE5vZGVzLmxlbmd0aClcclxuICAgICAgICB0aGlzLm5vZGUgPSB0aGlzLmNoaWxkTm9kZXNbdGhpcy5jaGlsZE5vZGVzLmxlbmd0aCAtIDFdXHJcbiAgICAgIHJldHVybiBkb2N1bWVudEZyYWdtZW50O1xyXG4gICAgfVxyXG4gICAgYXNWTm9kZSgpIHtcclxuICAgICAgcmV0dXJuIHt9O1xyXG4gICAgfVxyXG5cclxuICAgIFtfY2FsbFJlZnNdKCkge1xyXG4gICAgICAvLyBub29wXHJcbiAgICB9XHJcbiAgfSkoY29udGVudCk7XHJcbn1cclxuXHJcbi8vIGdvdGNoc2FzOlxyXG4vLyAtIHN0eWxlcyB3aWxsIG92ZXJyaWRlIChjb3VsZCBkbzogc2V0dGluZyBlYWNoIHJ1bGUgaW5kaXZpZHVhbGx5KVxyXG5cclxuLy8gQFRPRE86IHJlZiBjYWxsc1xyXG4vLyBAVE9ETzogcmUtcmVuZGVyIHN1YiB0cmVlcyAoLm5vZGUgPSBhZGQgdG8gbWFwKVxyXG4iLCJpbXBvcnQgeyByZW5kZXIsIHJhd0h0bWwgfSBmcm9tIFwiLi9qc3gvanN4LXJ1bnRpbWVcIjtcclxuXHJcbmNvbnN0IHhzcyA9IFwiPGltZyBzcmM9eCBvbmVycm9yPVxcXCJhbGVydCgnWFNTIEF0dGFjaycpXFxcIj5cIjsgLy9cIjxzY3JpcHQ+YWxlcnQoJy0uLScpPC9zY3JpcHQ+XCI7XHJcblxyXG5mdW5jdGlvbiBSVEUocHJvcHM6IC8qeyB0eHQsIFwib24tY2xpY2tcIjogb25DbGljayB9Ki8ge1xyXG4gIHR4dDogc3RyaW5nO1xyXG4gIHJlZj86IEZ1bmN0aW9uO1xyXG59KSB7XHJcbiAgY29uc29sZS5sb2coXCJvbkNsaWNrXCIsIHByb3BzW1wib24tY2xpY2tcIl0pO1xyXG4gIHJldHVybiAoXHJcbiAgICA8cCByZWY9eyhlbDogSFRNTEVsZW1lbnQpID0+IGNvbnNvbGUubG9nKFwibXkgZGl2IDo6cmVmOjozLjJcIiwgZWwpfT5cclxuICAgICAge3Byb3BzLnR4dH1cclxuICAgIDwvcD5cclxuICApO1xyXG59XHJcblxyXG5mdW5jdGlvbiBCdXR0b24oe1xyXG4gIGNoaWxkcmVuLFxyXG4gIGRpc2FibGVkLFxyXG59OiB7XHJcbiAgY2hpbGRyZW46IGFueTtcclxuICBkaXNhYmxlZDogYm9vbGVhbjtcclxuICByZWY/OiBGdW5jdGlvbjtcclxufSkge1xyXG4gIHJldHVybiAoXHJcbiAgICA8YnV0dG9uXHJcbiAgICAgIGRpc2FibGVkPXtkaXNhYmxlZH1cclxuICAgICAgcmVmPXsoZWw6IEhUTUxFbGVtZW50KSA9PiBjb25zb2xlLmxvZyhcIm15IGJ1dHRvbiA6OnJlZjo6MVwiLCBlbCl9XHJcbiAgICA+XHJcbiAgICAgIDxzcGFuIHJlZj17KGVsOiBIVE1MRWxlbWVudCkgPT4gY29uc29sZS5sb2coXCJteSBhIDo6cmVmOjoyXCIsIGVsKX0+XHJcbiAgICAgICAgQnRuLXNwYW4tZmlyc3RcclxuICAgICAgPC9zcGFuPlxyXG4gICAgICB7Y2hpbGRyZW59XHJcbiAgICAgIDw+XHJcbiAgICAgICAgPHNwYW4gcmVmPXsoZWw6IEhUTUxFbGVtZW50KSA9PiBjb25zb2xlLmxvZyhcIm15IGEgOjpyZWY6OjNcIiwgZWwpfT5cclxuICAgICAgICAgIEJ0bi1zcGFuLWVuZFxyXG4gICAgICAgIDwvc3Bhbj5cclxuICAgICAgPC8+XHJcbiAgICA8L2J1dHRvbj5cclxuICApO1xyXG59XHJcblxyXG5mdW5jdGlvbiByZWZsb2coZWw6IEhUTUxFbGVtZW50KSB7XHJcbiAgY29uc29sZS5sb2coXCJteSBpbm5lciBkaXY6OnJlZjo6OFwiLCBlbCk7XHJcbn1cclxuXHJcbi8qXHJcbmNvbnN0IG1hcmt1cCA9IChcclxuICA8PlxyXG4gICAgPGRpdlxyXG4gICAgICBjbGFzcz1cImZvb1wiXHJcbiAgICAgIHJlZj17KGVsOiBIVE1MRWxlbWVudCkgPT4gY29uc29sZS5sb2coXCJteSBkaXYgOjpyZWY6OjRcIiwgZWwpfVxyXG4gICAgLz5cclxuICAgIDxpbnB1dCBkaXNhYmxlZD17dHJ1ZX0gaGlkZGVuPXtmYWxzZX0gLz5cclxuICAgIDxCdXR0b25cclxuICAgICAgZGlzYWJsZWQ9e3RydWV9XHJcbiAgICAgIHJlZj17KGVsOiBIVE1MRWxlbWVudCkgPT4gY29uc29sZS5sb2coXCJteSBCVVRUT046OnJlZjo6NVwiLCBlbCl9XHJcbiAgICA+XHJcbiAgICAgIHRleHRcclxuICAgICAgPHBvcHVwLWluZm9cclxuICAgICAgICByZWY9eyhlbDogSFRNTEVsZW1lbnQpID0+IGNvbnNvbGUubG9nKFwic3BhbiBpbiBCVVRUT046OnJlZjo6NlwiLCBlbCl9XHJcbiAgICAgID5cclxuICAgICAgICBibGFcclxuICAgICAgPC9wb3B1cC1pbmZvPlxyXG4gICAgPC9CdXR0b24+XHJcbiAgICA8UlRFXHJcbiAgICAgIHR4dD1cImxlIHRleHRcIlxyXG4gICAgICByZWY9eyhlbDogSFRNTEVsZW1lbnQpID0+IGNvbnNvbGUubG9nKFwibXkgZGl2IDo6cmVmOjozLjFcIiwgZWwpfVxyXG4gICAgICBvbi1jbGljaz17KGU6IEhUTUxFbGVtZW50KSA9PiBjb25zb2xlLmxvZyhlKX1cclxuICAgIC8+XHJcbiAgICB7eHNzfVxyXG4gICAge3Jhd0h0bWwoYDxvbD48bGk+cmF3IGh0bWw8L2xpPjwvb2w+YCl9XHJcbiAgICA8ZGl2XHJcbiAgICAgIGNsYXNzPVwiYmFtXCJcclxuICAgICAgcmVmPXsoZWw6IEhUTUxFbGVtZW50KSA9PiBjb25zb2xlLmxvZyhcIm15IGRpdjo6cmVmOjo3XCIsIGVsKX1cclxuICAgID5cclxuICAgICAgPGRpdj5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwiYmFyXCIgb24tY2xpY2s9eyhlKSA9PiBjb25zb2xlLmxvZyhlKX0gcmVmPXtyZWZsb2d9PlxyXG4gICAgICAgICAgY2xpY2sgTUVcclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8ZGl2IHN0eWxlPXt7IG91dGxpbmU6IFwiMXB4IHNvbGlkIHJlZDtcIiB9fT5cclxuICAgICAgICAgIHtkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI29sZFwiKX1cclxuICAgICAgICAgIHtudWxsfVxyXG4gICAgICAgICAge1swLCAxXS5tYXAoKG4pID0+IChcclxuICAgICAgICAgICAgPHNwYW4+e259PC9zcGFuPlxyXG4gICAgICAgICAgKSl9XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgPC9kaXY+XHJcbiAgPC8+XHJcbik7XHJcblxyXG4qL1xyXG5cclxuLypcclxuY29uc3QgbWFya3VwID0gKFxyXG4gIDxCdXR0b24gZGlzYWJsZWQ9e3RydWV9PlxyXG4gICAgICA8Ym9sZCByZWY9e3JlZmxvZ30+LS1JTk5FUi0tPC9ib2xkPlxyXG4gIDwvQnV0dG9uPlxyXG4pOyovXHJcbi8qXHJcblxyXG5jb25zdCBtYXJrdXAgPSAoXHJcbiAgPGRpdiBjbGFzcz1cImZvb1wiIHJlZj17KGVsOiBIVE1MRWxlbWVudCkgPT4gY29uc29sZS5sb2coXCJteSBkaXY6OnJlZjo6XCIsIGVsKX0+XHJcbiAgICA8ZGl2PlxyXG4gICAgICA8ZGl2IGNsYXNzPVwiYmFyXCIgcmVmPXsoZWw6IEhUTUxFbGVtZW50KSA9PiBjb25zb2xlLmxvZyhcIm15IGlubmVyIGRpdjo6cmVmOjpcIiwgZWwpfSAvPlxyXG4gICAgPC9kaXY+XHJcbiAgICA8QnV0dG9uIGRpc2FibGVkPXt0cnVlfT48L0J1dHRvbj5cclxuICA8L2Rpdj5cclxuKTtcclxuKi9cclxuLypcclxuY29uc3QgbWFya3VwID0gKFxyXG4gIDxhPlxyXG4gICAgPGI+XHJcbiAgICAgIDxjIGNsYXNzPVwiYmFyXCIgcmVmPXtyZWZsb2d9IC8+XHJcbiAgICA8L2I+XHJcbiAgPC9hPlxyXG4pO1xyXG4qL1xyXG5cclxuZnVuY3Rpb24gU3Bhbih7IG1vZGUgfTogeyBtb2RlOiBhbnkgfSkge1xyXG4gIHJldHVybiBtb2RlID09PSAxID8gKFxyXG4gICAgPGRpdj5cclxuICAgICAgPHNwYW4gaWQ9XCJpbm5lclwiIG9sZD17dHJ1ZX0+XHJcbiAgICAgICAgU3Bhbi1Db21wLS1vbGRcclxuICAgICAgPC9zcGFuPlxyXG4gICAgICA8aDM+dG8gYmUgcmVtb3ZlZDwvaDM+XHJcbiAgICA8L2Rpdj5cclxuICApIDogKFxyXG4gICAgPGRpdj5cclxuICAgICAgPHAgaWQ9XCJpbm5lclwiIG5ldz17dHJ1ZX0+XHJcbiAgICAgICAgU3Bhbi1Db21wLS1uZXdzXHJcbiAgICAgIDwvcD5cclxuICAgIDwvZGl2PlxyXG4gICk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIENvbXAoeyBudW0gfSkge1xyXG4gIGlmIChudW0gPT09IDEpIHJldHVybiBudWxsO1xyXG4gIHJldHVybiAoXHJcbiAgICA8ZGl2PlxyXG4gICAgICA8cD5jb21wPC9wPlxyXG4gICAgPC9kaXY+XHJcbiAgKTtcclxufVxyXG5cclxuY29uc3QgbWFya3VwMSA9IChudW06IGFueSkgPT4gKFxyXG4gIDxkaXYgaWQ9XCJvdXRlclwiIGRhdGEtZm9vPVwiYmFyXCIgZGF0YS12YXI9e251bX0+XHJcbiAgICA8aDM+c2hvdWxkIGdldCAyIC06IDM8L2gzPlxyXG4gICAge251bSA9PT0gMSA/IChcclxuICAgICAgPHVsIGNsYXNzPVwidWwtY2xhc3NcIj5cclxuICAgICAgICA8bGk+VGV4dCAxIDwvbGk+XHJcbiAgICAgICAgPGxpPlRleHQgMiA8L2xpPlxyXG4gICAgICA8L3VsPlxyXG4gICAgKSA6IChcclxuICAgICAgPHVsIGNsYXNzPVwidWwtY2xhc3NcIj5cclxuICAgICAgICA8bGk+VGV4dCAzIDwvbGk+XHJcbiAgICAgICAgPGxpPlRleHQgMiA8L2xpPlxyXG4gICAgICAgIDxsaT5UZXh0IDEgPC9saT5cclxuICAgICAgPC91bD5cclxuICAgICl9XHJcbiAgICA8aDM+c2hvdWxkIGdldCAzIC06IDI8L2gzPlxyXG4gICAge251bSA9PT0gMSA/IChcclxuICAgICAgPHVsIGNsYXNzPVwidWwtY2xhc3NcIj5cclxuICAgICAgICA8bGk+VGV4dCAxIDwvbGk+XHJcbiAgICAgICAgPGxpPlRleHQgMiA8L2xpPlxyXG4gICAgICAgIDxsaT5UZXh0IDMgPC9saT5cclxuICAgICAgPC91bD5cclxuICAgICkgOiAoXHJcbiAgICAgIDx1bCBjbGFzcz1cInVsLWNsYXNzXCI+XHJcbiAgICAgICAgPGxpPlRleHQgMSA8L2xpPlxyXG4gICAgICAgIDxsaT5UZXh0IDIgPC9saT5cclxuICAgICAgPC91bD5cclxuICAgICl9XHJcbiAgICB7bnVtID09PSAxID8gbnVsbCA6IDxwPm5ldyByZW5kZXI8L3A+fVxyXG4gICAgPGRpdj5cclxuICAgICAgPHNwYW4+c3Bhbi1jb250ZW50PC9zcGFuPlxyXG4gICAgPC9kaXY+XHJcbiAgICA8U3BhbiBtb2RlPXtudW19IC8+XHJcbiAgICB7Lypkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI29sZFwiKSovfVxyXG4gICAgPD5GcmFnbWVudC1pdGVtPC8+XHJcbiAgICA8c3ZnXHJcbiAgICAgIHZpZXdCb3g9XCIwIDAgMzAwIDEwMFwiXHJcbiAgICAgIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIlxyXG4gICAgICBzdHJva2U9XCJyZWRcIlxyXG4gICAgICBmaWxsPVwiZ3JleVwiXHJcbiAgICA+XHJcbiAgICAgIDxjaXJjbGUgY3g9XCI1MFwiIGN5PVwiNTBcIiByPVwiNDBcIiAvPlxyXG4gICAgICA8Y2lyY2xlIGN4PVwiMTUwXCIgY3k9XCI1MFwiIHI9XCI0XCIgLz5cclxuXHJcbiAgICAgIDxzdmcgdmlld0JveD1cIjAgMCAxMCAxMFwiIHg9XCIyMDBcIiB3aWR0aD1cIjEwMFwiPlxyXG4gICAgICAgIDxjaXJjbGUgY3g9XCI1XCIgY3k9XCI1XCIgcj1cIjRcIiAvPlxyXG4gICAgICA8L3N2Zz5cclxuICAgIDwvc3ZnPlxyXG4gIDwvZGl2PlxyXG4pO1xyXG5cclxuZnVuY3Rpb24gbWFya3VwMihudW06IGFueSkge1xyXG4gIHJldHVybiAoXHJcbiAgICA8ZGl2IGlkPVwib3V0ZXJcIj5cclxuICAgICAgPD5cclxuICAgICAgICA8PlxyXG4gICAgICAgICAgPHA+bmVzdGVkIGZyYWdtZW50PC9wPlxyXG4gICAgICAgIDwvPlxyXG4gICAgICA8Lz5cclxuICAgICAgPGgxPnN0YXRpYzwvaDE+XHJcbiAgICAgIDxoMT5keW5hbWljIHZhbDoge251bX08L2gxPlxyXG4gICAgICB7bnVtID09PSAxID8gPGgxPm9sZDwvaDE+IDogZmFsc2V9XHJcbiAgICAgIHtudW0gPT09IDEgPyAoXHJcbiAgICAgICAgPD5cclxuICAgICAgICAgIDxoMT5mcmFnIG9sZDwvaDE+XHJcbiAgICAgICAgICA8c3Bhbj5mcmFnIHNwYW4gb2xkPC9zcGFuPlxyXG4gICAgICAgIDwvPlxyXG4gICAgICApIDogKFxyXG4gICAgICAgIDxoMT5mcmFnIG5ldzwvaDE+XHJcbiAgICAgICl9XHJcbiAgICAgIDxDb21wIG51bT17bnVtfSAvPlxyXG4gICAgPC9kaXY+XHJcbiAgKTtcclxufVxyXG5mdW5jdGlvbiBOTCgpIHtcclxuICByZXR1cm4gbnVsbDtcclxufVxyXG5cclxuZnVuY3Rpb24gbWFya3VwMyhudW06IGFueSkge1xyXG4gIHJldHVybiBudW0gPT09IDEgPyAoXHJcbiAgICA8aDE+XHJcbiAgICAgIEEtTGluZSAxIC0ge251bX1cclxuICAgICAgPFNwYW4gbW9kZT17bnVtfSAvPlxyXG4gICAgICA8QnV0dG9uXHJcbiAgICAgICAgZGlzYWJsZWQ9e3RydWV9XHJcbiAgICAgICAgcmVmPXsoZWw6IEhUTUxFbGVtZW50KSA9PiBjb25zb2xlLmxvZyhcIm15IEJVVFRPTjo6cmVmOjo1XCIsIGVsKX1cclxuICAgICAgPlxyXG4gICAgICAgIHRleHRcclxuICAgICAgICA8cG9wdXAtaW5mb1xyXG4gICAgICAgICAgcmVmPXsoZWw6IEhUTUxFbGVtZW50KSA9PiBjb25zb2xlLmxvZyhcInNwYW4gaW4gQlVUVE9OOjpyZWY6OjZcIiwgZWwpfVxyXG4gICAgICAgID5cclxuICAgICAgICAgIGJsYVxyXG4gICAgICAgIDwvcG9wdXAtaW5mbz5cclxuICAgICAgICA8cD5pbm5lciBwIHtudW19PC9wPlxyXG4gICAgICA8L0J1dHRvbj5cclxuICAgICAgQS1MaW5lIDNcclxuICAgICAgPD5cclxuICAgICAgICA8cD5cclxuICAgICAgICAgIDxwPkEgRnJhZyBsaW5lIDEqPC9wPlxyXG4gICAgICAgIDwvcD5cclxuICAgICAgICA8cD5BIEZyYWcgbGluZSAyPC9wPlxyXG4gICAgICAgIDxwPkEgRnJhZyBsaW5lIDM8L3A+XHJcbiAgICAgICAgPHA+QSBGcmFnIGxpbmUgNDwvcD5cclxuICAgICAgICA8c3ZnXHJcbiAgICAgICAgICB2aWV3Qm94PVwiMCAwIDMwMCAxMDBcIlxyXG4gICAgICAgICAgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiXHJcbiAgICAgICAgICBzdHJva2U9XCJyZWRcIlxyXG4gICAgICAgICAgZmlsbD1cImdyZXlcIlxyXG4gICAgICAgID5cclxuICAgICAgICAgIDxjaXJjbGUgY3g9XCI1MFwiIGN5PVwiNTBcIiByPVwiNDBcIiAvPlxyXG4gICAgICAgICAgPGNpcmNsZSBjeD1cIjE1MFwiIGN5PVwiNTBcIiByPVwiNFwiIC8+XHJcblxyXG4gICAgICAgICAgPHN2ZyB2aWV3Qm94PVwiMCAwIDEwIDEwXCIgeD1cIjIwMFwiIHdpZHRoPVwiMTAwXCI+XHJcbiAgICAgICAgICAgIDxjaXJjbGUgY3g9XCI1XCIgY3k9XCI1XCIgcj1cIjRcIiAvPlxyXG4gICAgICAgICAgPC9zdmc+XHJcbiAgICAgICAgPC9zdmc+XHJcbiAgICAgIDwvPlxyXG4gICAgICB7bnVsbH1cclxuICAgIDwvaDE+XHJcbiAgKSA6IChcclxuICAgIDxoMSBjbGFzcz1cImFcIj5cclxuICAgICAgQiBMaW5lIDEgLSB7bnVtfVxyXG4gICAgICA8U3BhbiBtb2RlPXtudW19IC8+XHJcbiAgICAgIDxCdXR0b25cclxuICAgICAgICBkaXNhYmxlZD17dHJ1ZX1cclxuICAgICAgICByZWY9eyhlbDogSFRNTEVsZW1lbnQpID0+IGNvbnNvbGUubG9nKFwibXkgQlVUVE9OOjpyZWY6OjVcIiwgZWwpfVxyXG4gICAgICA+XHJcbiAgICAgICAgdGV4dFxyXG4gICAgICAgIDxwb3B1cC1pbmZvXHJcbiAgICAgICAgICByZWY9eyhlbDogSFRNTEVsZW1lbnQpID0+IGNvbnNvbGUubG9nKFwic3BhbiBpbiBCVVRUT046OnJlZjo6NlwiLCBlbCl9XHJcbiAgICAgICAgPlxyXG4gICAgICAgICAgYmxhXHJcbiAgICAgICAgPC9wb3B1cC1pbmZvPlxyXG4gICAgICAgIDxwPntudW19PC9wPlxyXG4gICAgICA8L0J1dHRvbj5cclxuICAgICAgPD5cclxuICAgICAgICB7ZmFsc2V9XHJcbiAgICAgICAge251bGx9XHJcbiAgICAgICAge3VuZGVmaW5lZH1cclxuICAgICAgPC8+XHJcbiAgICAgIDw+XHJcbiAgICAgICAgPHA+QiBGcmFnIGxpbmUgMTwvcD5cclxuICAgICAgICA8cD5CIEZyYWcgbGluZSAyPC9wPlxyXG4gICAgICAgIHt1bmRlZmluZWR9XHJcbiAgICAgICAgPHA+QiBGcmFnIGxpbmUgMyg0KTwvcD5cclxuICAgICAgICA8c3ZnXHJcbiAgICAgICAgICB2aWV3Qm94PVwiMCAwIDMwMCAxMDBcIlxyXG4gICAgICAgICAgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiXHJcbiAgICAgICAgICBzdHJva2U9XCJyZWRcIlxyXG4gICAgICAgICAgZmlsbD1cImdyZXlcIlxyXG4gICAgICAgID5cclxuICAgICAgICAgIDxjaXJjbGUgY3g9XCI1MFwiIGN5PVwiNTBcIiByPVwiNDBcIiAvPlxyXG4gICAgICAgICAgPGNpcmNsZSBjeD1cIjE1MFwiIGN5PVwiNTBcIiByPVwiNFwiIC8+XHJcblxyXG4gICAgICAgICAgPHN2ZyB2aWV3Qm94PVwiMCAwIDEwIDEwXCIgeD1cIjIwMFwiIHdpZHRoPVwiMTAwXCI+XHJcbiAgICAgICAgICAgIDxjaXJjbGUgY3g9XCI1XCIgY3k9XCI1XCIgcj1cIjZcIiAvPlxyXG4gICAgICAgICAgPC9zdmc+XHJcbiAgICAgICAgPC9zdmc+XHJcbiAgICAgICAgPHA+QiBGcmFnIGxpbmUgNCg2KTwvcD5cclxuICAgICAgPC8+XHJcbiAgICA8L2gxPlxyXG4gICk7XHJcbn1cclxuY29uc3Qgb2JqID0geyBhOiAxIH07XHJcblxyXG5mdW5jdGlvbiBtYXJrdXA0KG51bTogYW55KSB7XHJcbiAgb2JqLmEgPSBudW07XHJcbiAgcmV0dXJuIG51bSA9PT0gMSA/IChcclxuICAgIDxoMSBvYmo9e29ian0gaWQ9e29iai5hfT5cclxuICAgICAgb2xkLUhlYWRsaW5lIHtudW19XHJcbiAgICA8L2gxPlxyXG4gICkgOiAoXHJcbiAgICA8aDEgb2JqPXtvYmp9IGNsYXNzPVwiYVwiIGlkPXtvYmouYX0+XHJcbiAgICAgIG5ldy1IZWFkbGluZSB7bnVtfVxyXG4gICAgPC9oMT5cclxuICApO1xyXG59XHJcblxyXG5mdW5jdGlvbiBtYXJrdXAobnVtOiBhbnkpIHtcclxuICByZXR1cm4gbnVtID09PSAxID8gKFxyXG4gICAgPGRpdj5cclxuICAgICAgPD5cclxuICAgICAgICA8cD5mcmFnIC0gSTwvcD5cclxuICAgICAgICA8Yj4gZnJhZyAtIElJPC9iPlxyXG4gICAgICA8Lz5cclxuICAgIDwvZGl2PlxyXG4gICkgOiAoXHJcbiAgICA8aDEgY2xhc3M9XCJhXCI+XHJcbiAgICAgIHtcIm5ldy1IZWFkbGluZVwifSB7bnVtfVxyXG4gICAgPC9oMT5cclxuICApO1xyXG59XHJcblxyXG5mdW5jdGlvbiBtYXJrdXA1KG51bTogYW55KSB7XHJcbiAgcmV0dXJuIG51bSA9PT0gMSA/IChcclxuICAgIDxkaXY+XHJcbiAgICAgIHtyYXdIdG1sKGA8ZGl2IGNsYXNzPVwia1wiPnR4dDwvZGl2PjxpbnB1dCB0eXBlPXJhZGlvXCIgLz5gKX1cclxuICAgICAgPENvbXAzIC8+XHJcbiAgICAgIHtlbH1cclxuICAgIDwvZGl2PlxyXG4gICkgOiAoXHJcbiAgICA8ZGl2PlxyXG4gICAgICB7cmF3SHRtbChgPGRpdiBjbGFzcz1cImtcIj50eHQ8L2Rpdj48aW5wdXQgdHlwZT1yYWRpb1wiIC8+YCl9XHJcbiAgICAgIHtudWxsfVxyXG4gICAgICB7ZWx9XHJcbiAgICA8L2Rpdj5cclxuICApO1xyXG59XHJcblxyXG4vL2NvbnNvbGUubG9nKG1hcmt1cCk7XHJcbi8vd2luZG93Lm1hcmt1cCA9IG1hcmt1cDtcclxuXHJcbmNsYXNzIFBvcFVwSW5mbyBleHRlbmRzIEhUTUxFbGVtZW50IHtcclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIC8vIEFsd2F5cyBjYWxsIHN1cGVyIGZpcnN0IGluIGNvbnN0cnVjdG9yXHJcbiAgICBzdXBlcigpO1xyXG5cclxuICAgIC8vIHdyaXRlIGVsZW1lbnQgZnVuY3Rpb25hbGl0eSBpbiBoZXJlXHJcblxyXG4gICAgY29uc29sZS5sb2coXCIjIyMjIyMjIyMjIyMjIyMjI2N0b3IgQ0VcIik7XHJcbiAgfVxyXG5cclxuICBjb25uZWN0ZWRDYWxsYmFjaygpIHtcclxuICAgIGNvbnNvbGUubG9nKFwiIyMjIyMjIyMjIyMjIyMjIyNDdXN0b20gc3F1YXJlIGVsZW1lbnQgYWRkZWQgdG8gcGFnZS5cIik7XHJcbiAgfVxyXG59XHJcblxyXG5jdXN0b21FbGVtZW50cy5kZWZpbmUoXCJwb3B1cC1pbmZvXCIsIFBvcFVwSW5mbyk7XHJcblxyXG4vL2RvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjb2xkXCIpIS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgY29uc29sZS5sb2cpO1xyXG5cclxuLy9kb2N1bWVudC5ib2R5LmlubmVySFRNTCA9IG1hcmt1cDtcclxuLy8vL3JlbmRlcihtYXJrdXAzKDEpLCBkb2N1bWVudC5ib2R5KTtcclxuLy9kb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm91dGVyXCIpPy5zZXRBdHRyaWJ1dGUoXCJkYXRhLWZvb1wiLCBcIm1vZFwiKTtcclxuXHJcbi8vZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJpbm5lclwiKT8uc2V0QXR0cmlidXRlKFwiZGF0YS1mb29cIiwgXCJtb2RcIik7XHJcbi8vcmVuZGVyKG1hcmt1cCgyKSwgZG9jdW1lbnQuYm9keSk7XHJcbi8vcmVuZGVyKG1hcmt1cCwgZG9jdW1lbnQuYm9keSwgdHJ1ZSk7XHJcbmNvbnN0IGVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNvbGRcIik7XHJcbmZ1bmN0aW9uIENvbXAyKCkge1xyXG4gIHJldHVybiAoXHJcbiAgICA8PlxyXG4gICAgICB7cmF3SHRtbChgPGRpdiBjbGFzcz1cImtcIj50eHQ8L2Rpdj48aW5wdXQgdHlwZT1yYWRpb1wiIC8+YCl9XHJcbiAgICAgIDxDb21wMyAvPlxyXG4gICAgICB7ZWx9XHJcbiAgICA8Lz5cclxuICApO1xyXG59XHJcbmZ1bmN0aW9uIENvbXAzKCkge1xyXG4gIHJldHVybiA8ZGl2PmNvbXAgY29udGVudDwvZGl2PjtcclxufVxyXG5cclxud2luZG93LnJlUmVuZGVyMSA9ICgpID0+XHJcbiAgcmVuZGVyKG1hcmt1cDMoMSksIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY29udGFpbmVyXCIpKTtcclxud2luZG93LnJlUmVuZGVyMiA9ICgpID0+XHJcbiAgcmVuZGVyKG1hcmt1cDMoMiksIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY29udGFpbmVyXCIpKTtcclxud2luZG93LnJlUmVuZGVyMyA9ICgpID0+XHJcbiAgcmVuZGVyKFxyXG4gICAgLy8gPGRpdj50eHQ8L2Rpdj5cclxuICAgIDxDb21wMiAvPixcclxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY29udGFpbmVyXCIpXHJcbiAgKTtcclxuXHJcbmNvbnNvbGUubG9nKFwiMTIzNDVcIik7XHJcbndpbmRvdy5zcyA9ICgpID0+IG1hcmt1cDMoMSkgKyBcIlwiO1xyXG53aW5kb3cuc3MyID0gKCkgPT4ge1xyXG4gIGNvbnNvbGUubG9nKG1hcmt1cDMoMSkpO1xyXG5cclxuICAvL2RvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY29udGFpbmVyXCIpLmlubmVySFRNTCA9IG1hcmt1cDMoMSk7XHJcbn07XHJcblxyXG53aW5kb3cucmVSZW5kZXI1YSA9ICgpID0+XHJcbiAgcmVuZGVyKG1hcmt1cDUoMSksIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY29udGFpbmVyXCIpKTtcclxud2luZG93LnJlUmVuZGVyNWIgPSAoKSA9PlxyXG4gIHJlbmRlcihtYXJrdXA1KDIpLCBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNvbnRhaW5lclwiKSk7XHJcbiJdLCJzb3VyY2VSb290IjoiIn0=