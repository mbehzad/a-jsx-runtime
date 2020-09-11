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


function asHtmlString(tag, props) {
  if (typeof tag === "function") {
    // expecting tag function to always return a jsx.
    // here it will also work if it returns something with toString() => string method
    const element = tag(props);
    return element.toString();
  } // remove children from props and render it as content,
  // the rest as attributes


  const {
    children,
    ...attrs
  } = props;
  const attributes = Object.entries(attrs).filter(([, value]) => truthy(value)).map(([key, value]) => {
    // e.g. disabled: true => <tag disabled>
    if (value === true) return key; // for style as object:
    // (style:) {display: "none", position: "absolute"} ==> 'display: none; position: absolute;'

    if (key === "style" && typeof value === "object") value = Object.entries(value) // ignore stuff like `{background: active && "red"}` when `active === false / null / undefined`
    .filter(([, v]) => truthy(v)) // currently supports "background-color" not "backgroundColor"
    .map(([k, v]) => `${k}: ${v}`).join("; "); // (class:) ["btn", "red"] ==> "btn red"

    if (key === "class" && Array.isArray(value)) value = value.join(" ");
    return `${key}="${value}"`;
  }).join(" ");
  const content = children.filter(truthy).map(child => child instanceof Node ? getOuterHtml(child) : typeof child === "object" ? child.toString() : sanitize(child)).join("");
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
    this.children = children.flat().map(child => {
      if (!child) console.log("child nullish", {
        child,
        vNode: this
      });

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

      console.log("@@ map 3", {
        child
      });

      if (!truthy(child)) {
        const childVNode = new NullVNode();
        childVNode.parent = this;
        return childVNode;
      }

      const n = new TextVNode(child);
      n.parent = this;
      return n;
    });
  }

  toString() {
    return "?";
  }

  asNode() {
    const node = asNode(this.tag, this.props, this.children)[0];
    this.node = node;
    return node;
  } // @TODO: doesn't need to be in VNode,
  // basically only the check if it has .node or itter over children (are VNodes! not Nodes)


  getChildrenWithNodes(alwaysAllow) {
    return this.children.map(childNode => {
      if (alwaysAllow.includes(childNode)) return childNode;
      return childNode.node || childNode.getChildrenWithNodes();
    }).flat(Infinity).filter(Boolean);
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
  // parent? @TODO: where will parent be asigned?
  constructor(children) {
    super();
    this.type = "Fragment";
    this.children = children.flat().map(child => {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vanN4L2pzeC1ydW50aW1lLnRzIiwid2VicGFjazovLy8uL21haW4udHN4Il0sIm5hbWVzIjpbInJlbmRlcmVkVlRyZWVzIiwiV2Vha01hcCIsInJlZnNUb0NhbGwiLCJKc3hOb2RlIiwiY29uc3RydWN0b3IiLCJwcm9wcyIsIlZOb2RlIiwiZ2V0UGFyZW50RWxlbWVudE5vZGUiLCJ2Tm9kZSIsImNvbnNvbGUiLCJsb2ciLCJwYXJlbnQiLCJub2RlIiwiZ2V0Q2hpbGRyZW5XaXRoTm9kZXMiLCJhbHdheXNBbGxvdyIsImNoaWxkcmVuIiwibWFwIiwiY2hpbGROb2RlIiwiZmxhdCIsIkluZmluaXR5IiwiZ2V0UGFyZW50QW5kTmV4dFNpYmxpbmciLCJwYXJlbnRXaXRoRWxlbWVudCIsInNpYmxpbmdzIiwicHJldlNpYmxpbmciLCJpbmRleE9mIiwibmV4dFNpYmxpbmdOb2RlIiwibmV4dFNpYmxpbmciLCJfY2FsbFJlZnMiLCJTeW1ib2wiLCJzdmdDb250ZXh0IiwidHJ1dGh5IiwidmFsdWUiLCJ1bmRlZmluZWQiLCJzYW5pdGl6ZSIsInRleHQiLCJkaXYiLCJkb2N1bWVudCIsImNyZWF0ZUVsZW1lbnQiLCJpbm5lclRleHQiLCJpbm5lckhUTUwiLCJnZXRPdXRlckh0bWwiLCJlbGVtZW50IiwiRWxlbWVudCIsIm91dGVySFRNTCIsIlRleHQiLCJ3aG9sZVRleHQiLCJEb2N1bWVudEZyYWdtZW50IiwiQXJyYXkiLCJmcm9tIiwiY2hpbGROb2RlcyIsImVsIiwiam9pbiIsIndhcm4iLCJhc0h0bWxTdHJpbmciLCJ0YWciLCJ0b1N0cmluZyIsImF0dHJzIiwiYXR0cmlidXRlcyIsIk9iamVjdCIsImVudHJpZXMiLCJmaWx0ZXIiLCJrZXkiLCJ2IiwiayIsImlzQXJyYXkiLCJjb250ZW50IiwiY2hpbGQiLCJOb2RlIiwiYXNOb2RlIiwiZnJhZ21lbnRzIiwiaXRlbSIsImRvY3VtZW50RnJhZ21lbnQiLCJjcmVhdGVEb2N1bWVudEZyYWdtZW50IiwiYXBwZW5kIiwiZXJyb3IiLCJyZXN1bHQiLCJqc3hOb2RlcyIsImZvckVhY2giLCJzdGFydHNXaXRoIiwiZXZlbnQiLCJyZXBsYWNlIiwiYWRkRXZlbnRMaXN0ZW5lciIsInN2Z0NvbnRleHRTZXQiLCJjcmVhdGVFbGVtZW50TlMiLCJfa2V5Iiwic2V0QXR0cmlidXRlIiwiU3RyaW5nIiwiY2hpbGRKc3hOb2RlcyIsImluc2VydE5ld0l0ZW0iLCJuZXdOb2RlIiwiaW5zZXJ0QmVmb3JlIiwiZGlmZkFuZFBhdGNoQ2hpbGRyZW4iLCJvbGROb2RlIiwib2xkQ2hpbGQiLCJpeCIsIm5ld0NoaWxkIiwicmVtb3ZlRnJvbURPTSIsInR5cGUiLCJkaWZmQW5kUGF0Y2giLCJuZXdJdGVtcyIsInNsaWNlIiwibGVuZ3RoIiwiYXNWTm9kZSIsIkxpdmVOb2RlVk5vZGUiLCJOdWxsVk5vZGUiLCJUZXh0Vk5vZGUiLCJhdHRyIiwiRWxlbWVudFZOb2RlIiwiRnJhZ21lbnRWTm9kZSIsImpzeHMiLCJyZWYiLCJGcmFnbWVudCIsImpzeCIsImhhc093blByb3BlcnR5IiwicmVuZGVyIiwibWFya3VwIiwiZG9tTm9kZSIsImJvZHkiLCJxdWVyeVNlbGVjdG9yQWxsIiwic3R5bGUiLCJiYWNrZ3JvdW5kIiwic3BsaWNlIiwiaXNSZVJlbmRlciIsImhhcyIsImluc2VydEFkamFjZW50SFRNTCIsImluc2VydEFkamFjZW50RWxlbWVudCIsInZUcmVlIiwiUm9vdFZOb2RlIiwib2xkVlRyZWUiLCJnZXQiLCJuZXdWVHJlZSIsInNldCIsImNiIiwiRXJyb3IiLCJyYXdIdG1sIiwidGVtcGxhdGUiLCJjaGlsZFZOb2RlIiwibiIsImluY2x1ZGVzIiwiQm9vbGVhbiIsInBhcmVudEVsZW1lbnQiLCJyZW1vdmVDaGlsZCIsInJlbW92ZUF0dHJpYnV0ZSIsInJlcGxhY2VXaXRoIiwidGV4dFZOb2RlIiwibmV3Vk5vZGUiLCJ0ZXh0Tm9kZSIsImNyZWF0ZVRleHROb2RlIiwibm9kZVZhbHVlIiwibmV3Tm9kZTIiLCJyZW1vdmUiLCJ4c3MiLCJSVEUiLCJ0eHQiLCJCdXR0b24iLCJkaXNhYmxlZCIsInJlZmxvZyIsIlNwYW4iLCJtb2RlIiwiQ29tcCIsIm51bSIsIm1hcmt1cDEiLCJtYXJrdXAyIiwiTkwiLCJtYXJrdXAzIiwib2JqIiwiYSIsIm1hcmt1cDQiLCJQb3BVcEluZm8iLCJIVE1MRWxlbWVudCIsImN1c3RvbUVsZW1lbnRzIiwiZGVmaW5lIiwicXVlcnlTZWxlY3RvciIsIkNvbXAyIiwiQ29tcDMiLCJ3aW5kb3ciLCJyZVJlbmRlcjEiLCJnZXRFbGVtZW50QnlJZCIsInJlUmVuZGVyMiIsInJlUmVuZGVyMyJdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EseUNBQXlDLGlDQUFpQztRQUMxRSxnSEFBZ0gsbUJBQW1CLEVBQUU7UUFDckk7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBCLEVBQUU7UUFDdkQsaUNBQWlDLGVBQWU7UUFDaEQ7UUFDQTtRQUNBOztRQUVBO1FBQ0Esc0RBQXNELCtEQUErRDs7UUFFckg7UUFDQTs7O1FBR0E7UUFDQTs7Ozs7Ozs7Ozs7OztBQ2xGQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxNQUFNQSxjQUFjLEdBQUcsSUFBSUMsT0FBSixFQUF2QjtBQUNBLE1BQU1DLFVBQXNCLEdB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QUUsR0FBR2QsUUFBUSxDQUFDd0ksYUFBVCxDQUF1QixNQUF2QixDQUFYOztBQUNBLFNBQVNDLEtBQVQsR0FBaUI7QUFDZixTQUNFO0FBQUEsZUFDRSxpRkFBQyxLQUFELEtBREYsRUFFRzNILEVBRkg7QUFBQSxJQURGO0FBTUQ7O0FBQ0QsU0FBUzRILEtBQVQsR0FBaUI7QUFDZixTQUFPO0FBQUE7QUFBQSxJQUFQO0FBQ0Q7O0FBRURDLE1BQU0sQ0FBQ0MsU0FBUCxHQUFtQjtBQUFBLFNBQ2pCOUQsbUZBQU0sQ0FBQ2tELE9BQU8sQ0FBQyxDQUFELENBQVIsRUFBYWhJLFFBQVEsQ0FBQzZJLGNBQVQsQ0FBd0IsV0FBeEIsQ0FBYixDQURXO0FBQUEsQ0FBbkI7O0FBRUFGLE1BQU0sQ0FBQ0csU0FBUCxHQUFtQjtBQUFBLFNBQ2pCaEUsbUZBQU0sQ0FBQ2tELE9BQU8sQ0FBQyxDQUFELENBQVIsRUFBYWhJLFFBQVEsQ0FBQzZJLGNBQVQsQ0FBd0IsV0FBeEIsQ0FBYixDQURXO0FBQUEsQ0FBbkI7O0FBRUFGLE1BQU0sQ0FBQ0ksU0FBUCxHQUFtQjtBQUFBLFNBQ2pCakUsbUZBQU0sRUFDSjtBQUNBLG1GQUFDLEtBQUQsS0FGSSxFQUdKOUUsUUFBUSxDQUFDNkksY0FBVCxDQUF3QixXQUF4QixDQUhJLENBRFc7QUFBQSxDQUFuQjs7QUFPQXhLLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLE9BQVosRSIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDApO1xuIiwiY29uc3QgcmVuZGVyZWRWVHJlZXMgPSBuZXcgV2Vha01hcDxIVE1MRWxlbWVudCwgUm9vdFZOb2RlPigpO1xyXG5jb25zdCByZWZzVG9DYWxsOiBGdW5jdGlvbltdID0gW107XHJcblxyXG4vKipcclxuICogcHJvdmlkZXMgZnVuY3Rpb25zIG5lZWRlZCBieSBiYWJlbCBmb3IgYSBjdXN0b20gcHJhZ21hXHJcbiAqIHRvIHJlbmRlciBwYXJzZWQganN4IGNvZGUgdG8gaHRtbFxyXG4gKi9cclxuXHJcbi8vIHByb3BzIHdoaWNoIHdpbGwgYmUgcmVuZGVyZWQgYXMgYXR0cmlidXRlc1xyXG4vLyBGdW5jdGlvbnMgd2lsbCBiZSB1c2VkIGZvciBldmVudCBsaXN0ZW5lcnMuICh3aXRoIGF0dHJpYnV0ZSBuYW1lIHN0YXJ0aW5nIHdpdGggJ29uLScpXHJcbnR5cGUgQXR0cmlidXRlcyA9IHsgW2tleTogc3RyaW5nXTogc3RyaW5nIHwgYm9vbGVhbiB8IG51bWJlciB8IEZ1bmN0aW9uIH07XHJcblxyXG4vLyBhZGRpdGlvbmFsIGF0dHJpYnV0ZXMgd2hpY2ggY2FuIGhhdmUgYWRkaXRpb25hbCBzZXJpYWxpemF0aW9uIGJlZm9yZSByZW5kZXJpbmcgYXMgYXR0cmlidXRlc1xyXG50eXBlIFNwZWNpYWxBdHRyaWJ1dGVzID0ge1xyXG4gIGNsYXNzPzogc3RyaW5nIHwgc3RyaW5nW107XHJcbiAgc3R5bGU/OiBzdHJpbmcgfCB7IFtrZXk6IHN0cmluZ106IHN0cmluZyB9O1xyXG4gIHJlZj86IEZ1bmN0aW9uO1xyXG59O1xyXG5cclxuLy8gY2hpbGQgZWxlbWVudHMgaW4gdGhlIGpzeCBtYXJrdXAgd2hpY2ggd2lsbCBiZSBwYXNzZWQgdG8gdGhlIGggZnVuY3Rpb24gYXMgYHByb3BzLmNoaWxkcmVuYFxyXG50eXBlIENoaWxkcmVuUHJvcHMgPSB7XHJcbiAgLy8gbmVzdGVkIGFycmF5IGluIGNhc2Ugb2ZcclxuICAvLyA8ZWxlbT5cclxuICAvLyAgIDxzcGFuLz5cclxuICAvLyAgIHtjaGlsZHJlbn1cclxuICAvLyAgIDxkaXYvPlxyXG4gIC8vIDwvZWxlbT5cclxuICBjaGlsZHJlbjogQXJyYXk8XHJcbiAgICBOb2RlIHwgSnN4Tm9kZUludGVyZmFjZSB8IHN0cmluZyB8IEFycmF5PE5vZGUgfCBKc3hOb2RlSW50ZXJmYWNlIHwgc3RyaW5nPlxyXG4gID47XHJcbn07XHJcblxyXG4vKipcclxuICogcHJvcHMgb2JqZWN0IHdoaWNoIHdpbGwgYmUgcGFzc2VkIHRvIGpzeCBwcmFnbWEgYW5kIGN1c3RvbSBjb21wb25lbnQgZnVuY3Rpb25zXHJcbiAqL1xyXG50eXBlIEpzeFByb3BzID0gQXR0cmlidXRlcyAmIFNwZWNpYWxBdHRyaWJ1dGVzICYgQ2hpbGRyZW5Qcm9wcztcclxuXHJcbi8vIGJhc2UgY2xhc3Mgd2hpY2ggd2lsbCBiZSBpbmhlcml0ZWQgZnJvbSBqc3ggYW5kIGZyYWdtZW50cyBmdW5jdGlvbiBub2RlIGdlbmVyYXRpb25cclxuLy8gYW5kIHdpbGwgYmUgdXNlZCB0byBkaXN0aW5ndWlzaCB0aGVtIHdpdGggb3RoZXIgRWxlbWVudHNcclxuY2xhc3MgSnN4Tm9kZSB7XHJcbiAgcHJvcHM6IEpzeFByb3BzO1xyXG4gIGNvbnN0cnVjdG9yKHByb3BzOiBKc3hQcm9wcykge1xyXG4gICAgdGhpcy5wcm9wcyA9IHByb3BzO1xyXG4gIH1cclxufVxyXG5cclxuY2xhc3MgVk5vZGUge31cclxuXHJcbi8vIG51bGwgd2hlbiBjaGVja2luZyB0aGUgcGFyZW50IHdoZW4gcm9vdCBpcyBmcmFnbWVudCBpdHNlbGZcclxuZnVuY3Rpb24gZ2V0UGFyZW50RWxlbWVudE5vZGUodk5vZGU6IFZOb2RlSW50ZXJmYWNlKTogRWxlbWVudFZOb2RlIHtcclxuICBjb25zb2xlLmxvZyhcImdldFBhcmVudEVsZW1lbnROb2RlXCIsIHZOb2RlKTtcclxuXHJcbiAgd2hpbGUgKHZOb2RlLnBhcmVudCkge1xyXG4gICAgdk5vZGUgPSB2Tm9kZS5wYXJlbnQ7XHJcbiAgICAvLyBgLm5vZGVgIGlzIG9ubHkgb24gXCJUZXh0XCIgYW5kIFwiRWxlbWVudFwiIHR5cGUgVk5vZGUsIGFuZCBvbmx5IEVsZW1lbnQgaGFzIGNoaWxkcmVuXHJcbiAgICBpZiAodk5vZGUubm9kZSkgYnJlYWs7XHJcbiAgfVxyXG5cclxuICBjb25zb2xlLmxvZyhcImZvdW5kOiBcIiwgdk5vZGUpO1xyXG5cclxuICByZXR1cm4gKHZOb2RlIGFzIHVua25vd24pIGFzIEVsZW1lbnRWTm9kZTtcclxufVxyXG5cclxuZnVuY3Rpb24gZ2V0Q2hpbGRyZW5XaXRoTm9kZXMoXHJcbiAgdk5vZGU6IFZOb2RlSW50ZXJmYWNlLFxyXG4gIGFsd2F5c0FsbG93PzogVk5vZGVJbnRlcmZhY2VcclxuKTogVk5vZGVJbnRlcmZhY2VbXSB7XHJcbiAgdk5vZGUuY2hpbGRyZW47XHJcbiAgcmV0dXJuIHZOb2RlLmNoaWxkcmVuXHJcbiAgICAubWFwKChjaGlsZE5vZGUpID0+IHtcclxuICAgICAgaWYgKGNoaWxkTm9kZSA9PT0gYWx3YXlzQWxsb3cpIHJldHVybiBjaGlsZE5vZGU7XHJcbiAgICAgIGlmIChjaGlsZE5vZGUubm9kZSkgcmV0dXJuIGNoaWxkTm9kZTtcclxuICAgICAgcmV0dXJuIGdldENoaWxkcmVuV2l0aE5vZGVzKGNoaWxkTm9kZSwgYWx3YXlzQWxsb3cpO1xyXG4gICAgfSlcclxuICAgIC5mbGF0KEluZmluaXR5KSBhcyBWTm9kZUludGVyZmFjZVtdO1xyXG59XHJcblxyXG5mdW5jdGlvbiBnZXRQYXJlbnRBbmROZXh0U2libGluZyh2Tm9kZTogVk5vZGVJbnRlcmZhY2UpOiBbTm9kZSwgTm9kZSB8IG51bGxdIHtcclxuICAvLyBub2RlIGFuY2VzdG9yIHdpdGggRWxlbWVudCxcclxuICBjb25zdCBwYXJlbnRXaXRoRWxlbWVudCA9IGdldFBhcmVudEVsZW1lbnROb2RlKHZOb2RlKTtcclxuICBjb25zdCBzaWJsaW5ncyA9IGdldENoaWxkcmVuV2l0aE5vZGVzKHBhcmVudFdpdGhFbGVtZW50LCB2Tm9kZSk7XHJcbiAgY29uc3QgcHJldlNpYmxpbmcgPSBzaWJsaW5nc1tzaWJsaW5ncy5pbmRleE9mKHZOb2RlKSAtIDFdO1xyXG4gIGNvbnN0IG5leHRTaWJsaW5nTm9kZSA9IHByZXZTaWJsaW5nID8gcHJldlNpYmxpbmcubm9kZSEubmV4dFNpYmxpbmcgOiBudWxsO1xyXG5cclxuICByZXR1cm4gW3BhcmVudFdpdGhFbGVtZW50Lm5vZGUsIG5leHRTaWJsaW5nTm9kZV07XHJcbn1cclxuXHJcbi8vIHByaXZhdGUga2V5IGZvciBjYWxsaW5nIHRoZSBgcmVmYCBjYWxsZXJzXHJcbmNvbnN0IF9jYWxsUmVmcyA9IFN5bWJvbChcImNhbGxSZWZzXCIpO1xyXG5cclxuLy8gdGhlIGN1cnJlbnQgbWFya3VwIHdoaWNoIGlzIHJlbmRlcmVkIGlzIG5lc3RlZCBpbiBhbiBzdmcgZWxlbWVudFxyXG5sZXQgc3ZnQ29udGV4dCA9IGZhbHNlO1xyXG5cclxuLy8ganN4IGFuZCBGcmFnbWVudCB3aWxsIHJldHVybiBvYmplY3RzIHdoaWNoIGltcGxlbWVudCB0aGlzIGludGVyZmFjZVxyXG5leHBvcnQgaW50ZXJmYWNlIEpzeE5vZGVJbnRlcmZhY2UgZXh0ZW5kcyBKc3hOb2RlIHtcclxuICB0b1N0cmluZygpOiBzdHJpbmc7XHJcbiAgYXNOb2RlKCk6IE5vZGU7XHJcbiAgYXNWTm9kZSgpOiBWTm9kZTtcclxuICBbX2NhbGxSZWZzXSgpOiB2b2lkO1xyXG59XHJcblxyXG4vKipcclxuICogcmV0dXJucyB0cnVlIGlmIG5vdCBudWxsaXNoIG9yIGZhbHNlXHJcbiAqIHRoYXQgbWVhbnMgMCBvciBlbXB0eSBzdHJpbmcgYXJlIGFsbG93ZWRcclxuICogQHBhcmFtIHsqfSB2YWxcclxuICovXHJcbmZ1bmN0aW9uIHRydXRoeSh2YWx1ZTogYW55KTogYm9vbGVhbiB7XHJcbiAgcmV0dXJuIHZhbHVlICE9PSBmYWxzZSAmJiB2YWx1ZSAhPT0gbnVsbCAmJiB2YWx1ZSAhPT0gdW5kZWZpbmVkO1xyXG59XHJcblxyXG4vKipcclxuICogZXNjYXBlcyB0aGUgcHJvdmlkZWQgc3RyaW5nIGFnYWluc3QgeHNzIGF0dGFja3MgZXRjXHJcbiAqXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSB0ZXh0XHJcbiAqIEByZXR1cm5zIHtzdHJpbmd9XHJcbiAqL1xyXG5mdW5jdGlvbiBzYW5pdGl6ZSh0ZXh0OiBzdHJpbmcpOiBzdHJpbmcge1xyXG4gIGNvbnN0IGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgZGl2LmlubmVyVGV4dCA9IHRleHQ7XHJcbiAgcmV0dXJuIGRpdi5pbm5lckhUTUw7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBiYXNpY2FsbHkgYEVsZW1lbnQub3V0ZXJIVE1MYCBidXQgYWxzbyBzdXBwb3J0cyBUZXh0IG5vZGUgYW5kIERvY3VtZW50RnJhZ21lbnRcclxuICogQHBhcmFtIGVsZW1lbnQge05vZGV9IC0gZWxlbWVudCB3aGljaCBpdHMgaHRtbCBuZWVkcyB0byBiZSByZXR1cm5lZFxyXG4gKi9cclxuZnVuY3Rpb24gZ2V0T3V0ZXJIdG1sKGVsZW1lbnQ6IE5vZGUpOiBzdHJpbmcge1xyXG4gIGlmIChlbGVtZW50IGluc3RhbmNlb2YgRWxlbWVudCkgcmV0dXJuIGVsZW1lbnQub3V0ZXJIVE1MO1xyXG4gIGlmIChlbGVtZW50IGluc3RhbmNlb2YgVGV4dCkgcmV0dXJuIHNhbml0aXplKGVsZW1lbnQud2hvbGVUZXh0KTtcclxuICBpZiAoZWxlbWVudCBpbnN0YW5jZW9mIERvY3VtZW50RnJhZ21lbnQpXHJcbiAgICByZXR1cm4gQXJyYXkuZnJvbShlbGVtZW50LmNoaWxkTm9kZXMpXHJcbiAgICAgIC5tYXAoKGVsKSA9PiBnZXRPdXRlckh0bWwoZWwpKVxyXG4gICAgICAuam9pbihcIlwiKTtcclxuXHJcbiAgLy8gc2hvdWxkbid0IHJlYWNoIHRoaXMgcG9pbnRcclxuICBjb25zb2xlLndhcm4oXCJnZXRPdXRlckh0bWwgZG9lcyBub3Qgc3VwcG9ydCB0aGlzIHR5cGUgb2YgZWxlbWVudFwiLCBlbGVtZW50KTtcclxuICByZXR1cm4gXCJcIjtcclxufVxyXG5cclxuLyoqXHJcbiAqIGdlbmVyYXRlcyB0aGUgaHRtbCBhcyBhIHN0cmluZyB3aGljaCBjYW4gYmUgdXNlZCBmb3IgZXhhbXBsZSB3aXRoIGBlbGVtZW50LmlubmVySFRNTCgpYFxyXG4gKlxyXG4gKiBAcGFyYW0gdGFnIHtzdHJpbmd8RnVuY3Rpb259IC0gdGFnIGFyZ3VtZW50IG9mIHRoZSBqc3ggY2FsbFxyXG4gKiBAcGFyYW0gcHJvcHMge09iamVjdH0gLSBwcm9wcyBhcmd1bWVudCBvZiBqc3ggY2FsbFxyXG4gKi9cclxuZnVuY3Rpb24gYXNIdG1sU3RyaW5nKHRhZzogc3RyaW5nIHwgRnVuY3Rpb24sIHByb3BzOiBKc3hQcm9wcykge1xyXG4gIGlmICh0eXBlb2YgdGFnID09PSBcImZ1bmN0aW9uXCIpIHtcclxuICAgIC8vIGV4cGVjdGluZyB0YWcgZnVuY3Rpb24gdG8gYWx3YXlzIHJldHVybiBhIGpzeC5cclxuICAgIC8vIGhlcmUgaXQgd2lsbCBhbHNvIHdvcmsgaWYgaXQgcmV0dXJucyBzb21ldGhpbmcgd2l0aCB0b1N0cmluZygpID0+IHN0cmluZyBtZXRob2RcclxuICAgIGNvbnN0IGVsZW1lbnQ6IEpzeE5vZGUgPSB0YWcocHJvcHMpO1xyXG5cclxuICAgIHJldHVybiBlbGVtZW50LnRvU3RyaW5nKCk7XHJcbiAgfVxyXG5cclxuICAvLyByZW1vdmUgY2hpbGRyZW4gZnJvbSBwcm9wcyBhbmQgcmVuZGVyIGl0IGFzIGNvbnRlbnQsXHJcbiAgLy8gdGhlIHJlc3QgYXMgYXR0cmlidXRlc1xyXG4gIGNvbnN0IHsgY2hpbGRyZW4sIC4uLmF0dHJzIH0gPSBwcm9wcztcclxuXHJcbiAgY29uc3QgYXR0cmlidXRlcyA9IE9iamVjdC5lbnRyaWVzKGF0dHJzKVxyXG4gICAgLmZpbHRlcigoWywgdmFsdWVdKSA9PiB0cnV0aHkodmFsdWUpKVxyXG4gICAgLm1hcCgoW2tleSwgdmFsdWVdKSA9PiB7XHJcbiAgICAgIC8vIGUuZy4gZGlzYWJsZWQ6IHRydWUgPT4gPHRhZyBkaXNhYmxlZD5cclxuICAgICAgaWYgKHZhbHVlID09PSB0cnVlKSByZXR1cm4ga2V5O1xyXG5cclxuICAgICAgLy8gZm9yIHN0eWxlIGFzIG9iamVjdDpcclxuICAgICAgLy8gKHN0eWxlOikge2Rpc3BsYXk6IFwibm9uZVwiLCBwb3NpdGlvbjogXCJhYnNvbHV0ZVwifSA9PT4gJ2Rpc3BsYXk6IG5vbmU7IHBvc2l0aW9uOiBhYnNvbHV0ZTsnXHJcbiAgICAgIGlmIChrZXkgPT09IFwic3R5bGVcIiAmJiB0eXBlb2YgdmFsdWUgPT09IFwib2JqZWN0XCIpXHJcbiAgICAgICAgdmFsdWUgPSBPYmplY3QuZW50cmllcyh2YWx1ZSlcclxuICAgICAgICAgIC8vIGlnbm9yZSBzdHVmZiBsaWtlIGB7YmFja2dyb3VuZDogYWN0aXZlICYmIFwicmVkXCJ9YCB3aGVuIGBhY3RpdmUgPT09IGZhbHNlIC8gbnVsbCAvIHVuZGVmaW5lZGBcclxuICAgICAgICAgIC5maWx0ZXIoKFssIHZdKSA9PiB0cnV0aHkodikpXHJcbiAgICAgICAgICAvLyBjdXJyZW50bHkgc3VwcG9ydHMgXCJiYWNrZ3JvdW5kLWNvbG9yXCIgbm90IFwiYmFja2dyb3VuZENvbG9yXCJcclxuICAgICAgICAgIC5tYXAoKFtrLCB2XSkgPT4gYCR7a306ICR7dn1gKVxyXG4gICAgICAgICAgLmpvaW4oXCI7IFwiKTtcclxuXHJcbiAgICAgIC8vIChjbGFzczopIFtcImJ0blwiLCBcInJlZFwiXSA9PT4gXCJidG4gcmVkXCJcclxuICAgICAgaWYgKGtleSA9PT0gXCJjbGFzc1wiICYmIEFycmF5LmlzQXJyYXkodmFsdWUpKSB2YWx1ZSA9IHZhbHVlLmpvaW4oXCIgXCIpO1xyXG5cclxuICAgICAgcmV0dXJuIGAke2tleX09XCIke3ZhbHVlfVwiYDtcclxuICAgIH0pXHJcbiAgICAuam9pbihcIiBcIik7XHJcblxyXG4gIGNvbnN0IGNvbnRlbnQgPSBjaGlsZHJlblxyXG4gICAgLmZpbHRlcih0cnV0aHkpXHJcbiAgICAubWFwKChjaGlsZCkgPT5cclxuICAgICAgY2hpbGQgaW5zdGFuY2VvZiBOb2RlXHJcbiAgICAgICAgPyBnZXRPdXRlckh0bWwoY2hpbGQpXHJcbiAgICAgICAgOiB0eXBlb2YgY2hpbGQgPT09IFwib2JqZWN0XCJcclxuICAgICAgICA/IGNoaWxkLnRvU3RyaW5nKClcclxuICAgICAgICA6IHNhbml0aXplKGNoaWxkKVxyXG4gICAgKVxyXG4gICAgLmpvaW4oXCJcIik7XHJcblxyXG4gIHJldHVybiBgPCR7dGFnfSAke2F0dHJpYnV0ZXN9PiR7Y29udGVudH08LyR7dGFnfT5gO1xyXG59XHJcblxyXG4vKipcclxuICogZ2VuZXJhdGVzIEhUTUwgTm9kZSBlbGVtZW50cyBmcm9tIHRoZSBwcm92aWRlZCBqc3ggdHJlZVxyXG4gKiBAcGFyYW0gdGFnIHtzdHJpbmd8RnVuY3Rpb259IC0gdGFnIGFyZ3VtZW50IG9mIHRoZSBqc3ggY2FsbFxyXG4gKiBAcGFyYW0gcHJvcHMge09iamVjdH0gLSBwcm9wcyBhcmd1bWVudCBvZiBqc3ggY2FsbFxyXG4gKi9cclxuZnVuY3Rpb24gYXNOb2RlKFxyXG4gIHRhZzogc3RyaW5nIHwgRnVuY3Rpb24gfCB1bmRlZmluZWQsXHJcbiAgcHJvcHM6IEF0dHJpYnV0ZXMgJiBTcGVjaWFsQXR0cmlidXRlcywgLy9Kc3hQcm9wcyxcclxuICBjaGlsZHJlbjogYW55W11cclxuKTogW05vZGUsIEpzeE5vZGVJbnRlcmZhY2VbXV0ge1xyXG4gIGNvbnNvbGUubG9nKFwiYXNOb2RlKClcIiwgeyB0YWcsIHByb3BzLCBjaGlsZHJlbiB9KTtcclxuXHJcbiAgLy8gZnJhZ21lbnRcclxuICBpZiAoIXRhZykge1xyXG4gICAgY29uc3QgZnJhZ21lbnRzID0gY2hpbGRyZW5cclxuICAgICAgLmZsYXQoKSAvLyA/XHJcbiAgICAgIC5tYXAoKGl0ZW0pID0+IGl0ZW0uYXNOb2RlKCkpO1xyXG5cclxuICAgIGNvbnN0IGRvY3VtZW50RnJhZ21lbnQgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XHJcblxyXG4gICAgZG9jdW1lbnRGcmFnbWVudC5hcHBlbmQoLi4uZnJhZ21lbnRzKTtcclxuICAgIHJldHVybiBbZG9jdW1lbnRGcmFnbWVudCwgW11dO1xyXG4gIH1cclxuXHJcbiAgLy8gc2hvdWxkbid0XHJcbiAgaWYgKHR5cGVvZiB0YWcgPT09IFwiZnVuY3Rpb25cIikge1xyXG4gICAgY29uc29sZS5lcnJvcihcInNob3VsZG4ndCByZWFjaCB0aGlzIGluIHZUcmVlIG1vZGVcIik7XHJcbiAgICAvLyBleHBlY3RpbmcgdGhlIHRhZyBmdW5jdGlvbiB0byByZXR1cm4ganN4LlxyXG4gICAgLy8gaGVyZSBpdCB3aWxsIGFsc28gd29yayB3aGVuIGl0IHJldHVybnMgSFRNTEVsZW1lbnRcclxuICAgIGxldCByZXN1bHQgPSB0YWcocHJvcHMpO1xyXG5cclxuICAgIGxldCBqc3hOb2RlczogSnN4Tm9kZUludGVyZmFjZVtdID0gW107XHJcblxyXG4gICAgaWYgKHJlc3VsdCBpbnN0YW5jZW9mIFZOb2RlKSB7XHJcbiAgICAgIGpzeE5vZGVzID0gW3Jlc3VsdCBhcyBKc3hOb2RlSW50ZXJmYWNlXTtcclxuICAgICAgcmVzdWx0ID0gKHJlc3VsdCBhcyBKc3hOb2RlSW50ZXJmYWNlKS5hc05vZGUoKTtcclxuICAgICAgT2JqZWN0LmVudHJpZXMocHJvcHMpLmZvckVhY2goKFtrZXksIHZhbHVlXSkgPT4ge1xyXG4gICAgICAgIGlmIChcclxuICAgICAgICAgIGtleS5zdGFydHNXaXRoKFwib24tXCIpICYmXHJcbiAgICAgICAgICAodHlwZW9mIHZhbHVlID09PSBcImZ1bmN0aW9uXCIgfHwgdHlwZW9mIHZhbHVlID09PSBcIm9iamVjdFwiKVxyXG4gICAgICAgICkge1xyXG4gICAgICAgICAgLy8gcmVtb3ZlIGxlYWRpbmcgXCJvbi1cIlwiXHJcbiAgICAgICAgICBjb25zdCBldmVudCA9IGtleS5yZXBsYWNlKC9eb24tLywgXCJcIik7XHJcblxyXG4gICAgICAgICAgcmVzdWx0LmFkZEV2ZW50TGlzdGVuZXIoXHJcbiAgICAgICAgICAgIGV2ZW50LFxyXG4gICAgICAgICAgICB2YWx1ZSBhcyBFdmVudExpc3RlbmVyT3JFdmVudExpc3RlbmVyT2JqZWN0XHJcbiAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIFtyZXN1bHQsIGpzeE5vZGVzXTtcclxuICB9XHJcblxyXG4gIGNvbnN0IHsgLi4uYXR0cnMgfSA9IHByb3BzO1xyXG4gIC8vIHJlbWVtYmVyIGlmIHRoZSBzdmcgY29udGV4dCB3YXMgc2V0IGZvciB0aGlzIG5vZGUsIGFuZCByZXBsYWNlIGFmdGVyIGdlbmVyYXRpbmcgYWxsIGNoaWxkcmVuXHJcbiAgbGV0IHN2Z0NvbnRleHRTZXQgPSBmYWxzZTtcclxuXHJcbiAgLy8gc2V0IHRoZSBjb250ZXh0IG9mIG1hcmt1cCB3aGljaCBpcyByZW5kZXJlZCBhcyBTVkcgKG9yIGl0cyBjaGlsZHJlbilcclxuICAvLyBubyBuZWVkIGZvciByZS1zZXR0aW5nIHRoZSBjb250ZXh0IGZvciBuZXN0ZWQgU1ZHc1xyXG4gIGlmICghc3ZnQ29udGV4dCAmJiB0YWcgPT09IFwic3ZnXCIpIHtcclxuICAgIHN2Z0NvbnRleHQgPSB0cnVlO1xyXG4gICAgc3ZnQ29udGV4dFNldCA9IHRydWU7XHJcbiAgfVxyXG5cclxuICAvLyBjdXJyZW50bHkgbm90IHN1cHBvcnRpbmcgdGhlIGBpc2Agb3B0aW9uIGZvciBDdXN0b21pemVkIGJ1aWx0LWluIGVsZW1lbnRzXHJcbiAgY29uc3Qgbm9kZSA9IHN2Z0NvbnRleHRcclxuICAgID8gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKFwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiwgdGFnKVxyXG4gICAgOiBkb2N1bWVudC5jcmVhdGVFbGVtZW50KHRhZyk7XHJcblxyXG4gIE9iamVjdC5lbnRyaWVzKGF0dHJzKVxyXG4gICAgLmZpbHRlcigoW19rZXksIHZhbHVlXSkgPT4gdHJ1dGh5KHZhbHVlKSlcclxuICAgIC5mb3JFYWNoKChba2V5LCB2YWx1ZV0pID0+IHtcclxuICAgICAgLy8gZm9yIHN0eWxlIGFzIG9iamVjdDpcclxuICAgICAgLy8gKHN0eWxlOikge2Rpc3BsYXk6IFwibm9uZVwiLCBwb3NpdGlvbjogXCJhYnNvbHV0ZVwifSA9PT4gJ2Rpc3BsYXk6IG5vbmU7IHBvc2l0aW9uOiBhYnNvbHV0ZTsnXHJcbiAgICAgIGlmIChrZXkgPT09IFwic3R5bGVcIiAmJiB0eXBlb2YgdmFsdWUgPT09IFwib2JqZWN0XCIpXHJcbiAgICAgICAgdmFsdWUgPSBPYmplY3QuZW50cmllcyh2YWx1ZSlcclxuICAgICAgICAgIC5maWx0ZXIoKFssIHZdKSA9PiB0cnV0aHkodikpXHJcbiAgICAgICAgICAubWFwKChbaywgdl0pID0+IGAke2t9OiAke3Z9YClcclxuICAgICAgICAgIC5qb2luKFwiOyBcIik7XHJcblxyXG4gICAgICAvLyAoY2xhc3M6KSBbXCJidG5cIiwgXCJyZWRcIl0gPT0+IFwiYnRuIHJlZFwiXHJcbiAgICAgIGlmIChrZXkgPT09IFwiY2xhc3NcIiAmJiBBcnJheS5pc0FycmF5KHZhbHVlKSkgdmFsdWUgPSB2YWx1ZS5qb2luKFwiIFwiKTtcclxuXHJcbiAgICAgIGlmICh2YWx1ZSA9PT0gdHJ1ZSkgbm9kZS5zZXRBdHRyaWJ1dGUoa2V5LCBcIlwiKTtcclxuICAgICAgZWxzZSBpZiAodHlwZW9mIHZhbHVlID09PSBcInN0cmluZ1wiIHx8IHR5cGVvZiB2YWx1ZSA9PT0gXCJudW1iZXJcIilcclxuICAgICAgICBub2RlLnNldEF0dHJpYnV0ZShrZXksIFN0cmluZyh2YWx1ZSkpO1xyXG4gICAgICAvLyBrZXkgaGFzIHRoZSBmb3JtIG9mIFwib24tY2hhbmdlXCIuIHZhbHVlIGlzIHRoZSBjYWxsYmFjayBmdW5jdGlvbiBvciBhbiBvYmplY3QgaW1wbGVtZW50aW5nIHtFdmVudExpc3RlbmVyfSBpbnRlcmZhY2VcclxuICAgICAgZWxzZSBpZiAoXHJcbiAgICAgICAga2V5LnN0YXJ0c1dpdGgoXCJvbi1cIikgJiZcclxuICAgICAgICAodHlwZW9mIHZhbHVlID09PSBcImZ1bmN0aW9uXCIgfHwgdHlwZW9mIHZhbHVlID09PSBcIm9iamVjdFwiKVxyXG4gICAgICApIHtcclxuICAgICAgICAvLyByZW1vdmUgbGVhZGluZyBcIm9uLVwiXCJcclxuICAgICAgICBjb25zdCBldmVudCA9IGtleS5yZXBsYWNlKC9eb24tLywgXCJcIik7XHJcblxyXG4gICAgICAgIG5vZGUuYWRkRXZlbnRMaXN0ZW5lcihcclxuICAgICAgICAgIGV2ZW50LFxyXG4gICAgICAgICAgdmFsdWUgYXMgRXZlbnRMaXN0ZW5lck9yRXZlbnRMaXN0ZW5lck9iamVjdFxyXG4gICAgICAgICk7XHJcbiAgICAgIH1cclxuICAgICAgLy8gQHRzLWlnbm9yZSAtIHByb3ZpZGluZyB0aGUgdmFsdWUgYXMgcHJvcGVydHkgdG8gaHRtbCBlbGVtZW50XHJcbiAgICAgIGVsc2Ugbm9kZVtrZXldID0gdmFsdWU7XHJcbiAgICB9KTtcclxuXHJcbiAgLy8gcmV0dXJucyBjaGlsZCBqc3ggbm9kZXMgYXMgd2VsbCB0byBiZSB1c2VkIGR1cmluZyB0aGUgcmVmIGNhbGxcclxuICBjb25zdCBjaGlsZEpzeE5vZGVzID0gY2hpbGRyZW4uZmlsdGVyKChjaGlsZCkgPT4gY2hpbGQgaW5zdGFuY2VvZiBWTm9kZSk7XHJcblxyXG4gIGNvbnNvbGUubG9nKHsgY2hpbGRyZW4gfSk7XHJcblxyXG4gIG5vZGUuYXBwZW5kKFxyXG4gICAgLi4uY2hpbGRyZW5cclxuICAgICAgLmZsYXQoKVxyXG4gICAgICAvLy5maWx0ZXIodHJ1dGh5KVxyXG4gICAgICAuZmlsdGVyKChjaGlsZCkgPT4gY2hpbGQudGFnICE9PSBcIl9fTlVMTF9fXCIpXHJcbiAgICAgIC5tYXAoKGNoaWxkKSA9PiBjaGlsZC5hc05vZGUoKSlcclxuICApO1xyXG5cclxuICAvLyBzdmcgZWxlbWVudCBhbmQgYWxsIGl0cyBjaGlsZHJlbiB3ZXJlIHJlbmRlcmVkLCByZXNldCB0aGUgc3ZnIGNvbnRleHRcclxuICBpZiAoc3ZnQ29udGV4dFNldCkgc3ZnQ29udGV4dCA9IGZhbHNlO1xyXG5cclxuICByZXR1cm4gW25vZGUsIGNoaWxkSnN4Tm9kZXMgYXMgSnN4Tm9kZUludGVyZmFjZVtdXTtcclxufVxyXG5cclxuZnVuY3Rpb24gaW5zZXJ0TmV3SXRlbShuZXdOb2RlOiBWTm9kZUludGVyZmFjZSkge1xyXG4gIGNvbnN0IFtwYXJlbnQsIG5leHRTaWJsaW5nXSA9IGdldFBhcmVudEFuZE5leHRTaWJsaW5nKG5ld05vZGUpO1xyXG4gIHBhcmVudC5pbnNlcnRCZWZvcmUobmV3Tm9kZS5hc05vZGUoKSwgbmV4dFNpYmxpbmcpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBkaWZmQW5kUGF0Y2hDaGlsZHJlbihcclxuICBvbGROb2RlOiBWTm9kZUludGVyZmFjZSxcclxuICBuZXdOb2RlOiBWTm9kZUludGVyZmFjZVxyXG4pIHtcclxuICBvbGROb2RlLmNoaWxkcmVuLmZvckVhY2goKG9sZENoaWxkLCBpeCkgPT4ge1xyXG4gICAgY29uc3QgbmV3Q2hpbGQgPSBuZXdOb2RlLmNoaWxkcmVuW2l4XTtcclxuICAgIC8vIGNoaWxkIHdhcyByZW1vdmVkXHJcbiAgICBpZiAoIW5ld0NoaWxkKSBvbGRDaGlsZC5yZW1vdmVGcm9tRE9NKCk7XHJcbiAgICAvLyBjaGlsZCBpcyBtb2RpZmllZFxyXG4gICAgZWxzZSBpZiAobmV3Q2hpbGQudHlwZSA9PT0gb2xkQ2hpbGQudHlwZSkgb2xkQ2hpbGQuZGlmZkFuZFBhdGNoKG5ld0NoaWxkKTtcclxuICAgIC8vIGNoaWxkIGlzIHJlcGxhY2VkXHJcbiAgICBlbHNlIHtcclxuICAgICAgb2xkQ2hpbGQucmVtb3ZlRnJvbURPTSgpO1xyXG4gICAgICBpbnNlcnROZXdJdGVtKG5ld0NoaWxkKTtcclxuICAgIH1cclxuICB9KTtcclxuXHJcbiAgLy8gbmV3IGFkZGl0aW9uIGl0ZW1zXHJcbiAgY29uc3QgbmV3SXRlbXMgPSBuZXdOb2RlLmNoaWxkcmVuLnNsaWNlKG9sZE5vZGUuY2hpbGRyZW4ubGVuZ3RoKTtcclxuICBpZiAobmV3SXRlbXMubGVuZ3RoKSB7XHJcbiAgICBjb25zdCBkb2N1bWVudEZyYWdtZW50ID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO1xyXG4gICAgbmV3SXRlbXMuZm9yRWFjaCgoaXRlbSkgPT4gZG9jdW1lbnRGcmFnbWVudC5hcHBlbmQoaXRlbS5hc05vZGUoKSkpO1xyXG5cclxuICAgIGNvbnN0IFtwYXJlbnQsIG5leHRTaWJsaW5nXSA9IGdldFBhcmVudEFuZE5leHRTaWJsaW5nKG5ld0l0ZW1zWzBdKTtcclxuICAgIHBhcmVudC5pbnNlcnRCZWZvcmUoZG9jdW1lbnRGcmFnbWVudCwgbmV4dFNpYmxpbmcpO1xyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gYXNWTm9kZShcclxuICB0YWc6IHN0cmluZyB8IEZ1bmN0aW9uIHwgdW5kZWZpbmVkLFxyXG4gIHByb3BzOiBKc3hQcm9wc1xyXG4pOiBWTm9kZUludGVyZmFjZSB7XHJcbiAgY29uc29sZS5sb2coXCJhc1ZOb2RlOlwiLCB7IHRhZywgcHJvcHMgfSk7XHJcblxyXG4gIGlmICh0eXBlb2YgdGFnID09PSBcImZ1bmN0aW9uXCIpIHtcclxuICAgIGxldCByZXN1bHQgPSB0YWcocHJvcHMpO1xyXG4gICAgaWYgKHJlc3VsdCBpbnN0YW5jZW9mIFZOb2RlKSB7XHJcbiAgICAgIC8vY29uc29sZS53YXJuKFwiYXNWTm9kZSB3aXRoIEpzeE5vZGVcIik7XHJcbiAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICB9XHJcbiAgICBpZiAocmVzdWx0IGluc3RhbmNlb2YgTm9kZSkge1xyXG4gICAgICByZXR1cm4gbmV3IExpdmVOb2RlVk5vZGUocmVzdWx0KTtcclxuICAgIH1cclxuICAgIC8vIG51bGwganN4IG5vZGVcclxuICAgIGlmICghdHJ1dGh5KHJlc3VsdCkpIHtcclxuICAgICAgcmV0dXJuIG5ldyBOdWxsVk5vZGUoKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gbmV3IFRleHRWTm9kZShyZXN1bHQpO1xyXG4gIH1cclxuXHJcbiAgY29uc3QgeyBjaGlsZHJlbiwgLi4uYXR0ciB9ID0gcHJvcHM7XHJcbiAgaWYgKHRhZykge1xyXG4gICAgcmV0dXJuIG5ldyBFbGVtZW50Vk5vZGUodGFnLCBhdHRyLCBjaGlsZHJlbik7IC8vIG9yIHNpbXBseSBwYXNzIGNpbGRyZW4gd2l0aCBwcm9wc1xyXG4gIH0gZWxzZSBpZiAoIXRydXRoeShhdHRyKSkge1xyXG4gICAgY29uc3Qgdk5vZGUgPSBuZXcgTnVsbFZOb2RlKCk7XHJcbiAgICB2Tm9kZS5wYXJlbnQgPSB0aGlzO1xyXG4gICAgcmV0dXJuIHZOb2RlO1xyXG4gIH0gZWxzZSBpZiAoY2hpbGRyZW4pIHtcclxuICAgIHJldHVybiBuZXcgRnJhZ21lbnRWTm9kZShjaGlsZHJlbik7XHJcbiAgfVxyXG5cclxuICAvLyBlbHNlPyAvLyBAVE9ETzo/XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBjb252ZXJ0cyBwcmFnbWEgb2JqZWN0IHRvIGh0bWwgc3RyaW5nXHJcbiAqIGpzeHMgaXMgYWx3YXlzIGNhbGxlZCB3aGVuIGVsZW1lbnQgaGFzIG1vcmUgdGhhbiBvbmUgY2hpbGRcclxuICpcclxuICogQHBhcmFtIHtzdHJpbmcgfCBGdW5jdGlvbn0gdGFnIC0gdGFnIG5hbWUgb3IgdGFnIGNsYXNzXHJcbiAqIEBwYXJhbSB7T2JqZWN0IHwgbnVsbH0gcHJvcHMgLSBwcm9wcyBmb3IgdGhlIHRhZ1xyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGpzeHMoXHJcbiAgdGFnOiBzdHJpbmcgfCBGdW5jdGlvbixcclxuICBwcm9wczogSnN4UHJvcHNcclxuKTogSnN4Tm9kZUludGVyZmFjZSB7XHJcbiAgcHJvcHMuY2hpbGRyZW4gPSBwcm9wcy5jaGlsZHJlbi5mbGF0KCk7IC8vIEBUT0RPOiBkb2NcclxuXHJcbiAgLy8gaWYgcmVmIHByb3AgaXMgcHJvdmlkZWQsIG1lbW9yaXplIGFuZCByZW1vdmUgZnJvbSB0aGUgaHRtbCBnZW5lcmF0aW9uIHByb2Nlc3NcclxuICBjb25zdCByZWY6IEZ1bmN0aW9uIHwgbnVsbCA9XHJcbiAgICB0eXBlb2YgcHJvcHMucmVmID09PSBcImZ1bmN0aW9uXCIgPyBwcm9wcy5yZWYgOiBudWxsO1xyXG4gIGlmIChyZWYpIGRlbGV0ZSBwcm9wcy5yZWY7IC8vIEBUT0RPOlxyXG5cclxuICByZXR1cm4gYXNWTm9kZSh0YWcsIHByb3BzKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIGNvbnZlcnRzIHRoZSBmcmFnbWVudHMgb2JqZWN0IHRvIG5vZGVzXHJcbiAqXHJcbiAqIEBwYXJhbSB7T2JqZWN0fSBwcm9wc1xyXG4gKiBAcGFyYW0ge0FycmF5fSBwcm9wcy5jaGlsZHJlbiAtIGNoaWxkIGVsZW1lbnRzIGluIHRoZSBmcmFnbWVudFxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIEZyYWdtZW50KHByb3BzOiBKc3hQcm9wcykge1xyXG4gIHJldHVybiBhc1ZOb2RlKHVuZGVmaW5lZCwgcHJvcHMpO1xyXG59XHJcblxyXG4vLyBqc3ggaXMgY2FsbGVkIHdoZW4gdGhlIGVsZW1lbnQgaGFzIG9uZSBvciB6ZXJvIGNoaWxkcmVuXHJcbmV4cG9ydCBmdW5jdGlvbiBqc3goXHJcbiAgdGFnOiBzdHJpbmcgfCBGdW5jdGlvbixcclxuICBwcm9wczogQXR0cmlidXRlcyAmXHJcbiAgICBTcGVjaWFsQXR0cmlidXRlcyAmIHsgY2hpbGRyZW4/OiBzdHJpbmcgfCBOb2RlIHwgSnN4Tm9kZUludGVyZmFjZSB9XHJcbik6IEpzeE5vZGVJbnRlcmZhY2Uge1xyXG4gIC8vIEB0cy1pZ25vcmUgLSB3cmFwcGluZyB0aGUgY2hpbGRyZW4gYXMgYXJyYXkgdG8gcmUtdXNlIGpzeHMgbWV0aG9kXHJcbiAgcHJvcHMuY2hpbGRyZW4gPSBwcm9wcy5oYXNPd25Qcm9wZXJ0eShcImNoaWxkcmVuXCIpID8gW3Byb3BzLmNoaWxkcmVuXSA6IFtdO1xyXG5cclxuICByZXR1cm4ganN4cyh0YWcsIChwcm9wcyBhcyB1bmtub3duKSBhcyBKc3hQcm9wcyk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiByZW5kZXIgdGhlIGdpdmVuIG1hcmt1cCBpbnRvIHRoZSBnaXZlbiBkb20gbm9kZVxyXG4gKlxyXG4gKiBAcGFyYW0ge3N0cmluZ3xIVE1MRWxlbWVudHxKU1h9IG1hcmt1cCAtIGh0bWwgYXMgc3RyaW5nLCBodG1sIGVsZW1lbnQgb3IganN4IHRlbXBsYXRlXHJcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGRvbU5vZGUgLSBjb250YWluZXIgZm9yIHRoZSB0ZW1wbGF0ZSB0byBiZSByZW5kZXJlZCBpbnRvXHJcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW2FwcGVuZD1mYWxzZV0gLSBzaG91bGQgdGhlIHByb3ZpZGVkIG1hcmt1cCBiZSBhcHBlbmRlZCB0byB0aGUgZXhpc3RpbmcgbWFya3VwLCBvciBkZWZhdWx0IHJlcGxhY2UgaXRcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiByZW5kZXIoXHJcbiAgbWFya3VwOiBzdHJpbmcgfCBIVE1MRWxlbWVudCB8IEpzeE5vZGVJbnRlcmZhY2UsIC8vIEBUT0RPOiBzcGVjaWZpYyBzdXBwb3J0IGZvciBUZW1wbGF0ZT8gKC5jb250ZW50LmNsb25lKVxyXG4gIGRvbU5vZGU6IEhUTUxFbGVtZW50LFxyXG4gIGFwcGVuZDogYm9vbGVhbiA9IGZhbHNlXHJcbikge1xyXG4gIEFycmF5LmZyb20oZG9jdW1lbnQuYm9keS5xdWVyeVNlbGVjdG9yQWxsKFwiKlwiKSkuZm9yRWFjaChcclxuICAgIChlbCkgPT4gKGVsLnN0eWxlLmJhY2tncm91bmQgPSBcIiNjY2ZmY2NcIilcclxuICApO1xyXG5cclxuICByZWZzVG9DYWxsLnNwbGljZSgwKTtcclxuXHJcbiAgY29uc3QgaXNSZVJlbmRlciA9IHJlbmRlcmVkVlRyZWVzLmhhcyhkb21Ob2RlKTtcclxuICBpZiAoIWFwcGVuZCAmJiAhaXNSZVJlbmRlcikgZG9tTm9kZS5pbm5lckhUTUwgPSBcIlwiO1xyXG5cclxuICBpZiAodHlwZW9mIG1hcmt1cCA9PT0gXCJzdHJpbmdcIikge1xyXG4gICAgZG9tTm9kZS5pbnNlcnRBZGphY2VudEhUTUwoXCJiZWZvcmVlbmRcIiwgbWFya3VwKTsgLy8gc2FuaXRpemU/XHJcbiAgfSBlbHNlIGlmIChtYXJrdXAgaW5zdGFuY2VvZiBOb2RlKSB7XHJcbiAgICBkb21Ob2RlLmluc2VydEFkamFjZW50RWxlbWVudChcImJlZm9yZWVuZFwiLCBtYXJrdXApO1xyXG4gIH0gZWxzZSBpZiAobWFya3VwIGluc3RhbmNlb2YgVk5vZGUpIHtcclxuICAgIHN2Z0NvbnRleHQgPSBmYWxzZTtcclxuXHJcbiAgICBjb25zdCB2VHJlZSA9IG5ldyBSb290Vk5vZGUobWFya3VwLCBkb21Ob2RlKTtcclxuXHJcbiAgICBjb25zb2xlLmxvZyhcIiMjIyMjIyMjIyMjXFxuXCIsIFwidlRyZWU6XCIsIHZUcmVlKTtcclxuXHJcbiAgICBpZiAoaXNSZVJlbmRlcikge1xyXG4gICAgICBjb25zb2xlLmxvZyhcImlzIHJlLXJlbmRlclwiKTtcclxuICAgICAgY29uc3Qgb2xkVlRyZWUgPSByZW5kZXJlZFZUcmVlcy5nZXQoZG9tTm9kZSk7XHJcblxyXG4gICAgICBjb25zb2xlLmxvZyhcIiMjIyMjIyMjIyMjXFxuXCIsIHsgb2xkVlRyZWUsIG5ld1ZUcmVlOiB2VHJlZSB9KTtcclxuXHJcbiAgICAgIC8vIGRpZmZcclxuICAgICAgb2xkVlRyZWUuZGlmZkFuZFBhdGNoKHZUcmVlKTtcclxuXHJcbiAgICAgIHJlbmRlcmVkVlRyZWVzLnNldChkb21Ob2RlLCB2VHJlZSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjb25zdCBjb250ZW50ID0gdlRyZWUuYXNOb2RlKCk7XHJcbiAgICAgIGRvbU5vZGUuYXBwZW5kKGNvbnRlbnQpO1xyXG4gICAgfVxyXG5cclxuICAgIHJlbmRlcmVkVlRyZWVzLnNldChkb21Ob2RlLCB2VHJlZSk7XHJcblxyXG4gICAgcmVmc1RvQ2FsbC5mb3JFYWNoKChjYikgPT4gY2IoKSk7XHJcblxyXG4gICAgLy8vL21hcmt1cFtfY2FsbFJlZnNdKCk7XHJcbiAgfSBlbHNlIHtcclxuICAgIHRocm93IG5ldyBFcnJvcihcInJlbmRlciBtZXRob2QgY2FsbGVkIHdpdGggd3JvbmcgYXJndW1lbnQocylcIik7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gcmF3SHRtbChjb250ZW50OiBzdHJpbmcpOiBKc3hOb2RlSW50ZXJmYWNlIHtcclxuICByZXR1cm4gbmV3IChjbGFzcyBleHRlbmRzIEpzeE5vZGUgaW1wbGVtZW50cyBKc3hOb2RlSW50ZXJmYWNlIHtcclxuICAgIHRvU3RyaW5nKCkge1xyXG4gICAgICByZXR1cm4gY29udGVudDtcclxuICAgIH1cclxuXHJcbiAgICBhc05vZGUoKSB7XHJcbiAgICAgIGNvbnN0IHRlbXBsYXRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRlbXBsYXRlXCIpO1xyXG4gICAgICB0ZW1wbGF0ZS5pbm5lckhUTUwgPSBjb250ZW50O1xyXG4gICAgICByZXR1cm4gdGVtcGxhdGUuY29udGVudDtcclxuICAgIH1cclxuICAgIGFzVk5vZGUoKSB7XHJcbiAgICAgIHJldHVybiB7fTtcclxuICAgIH1cclxuXHJcbiAgICBbX2NhbGxSZWZzXSgpIHtcclxuICAgICAgLy8gbm9vcFxyXG4gICAgfVxyXG4gIH0pKHt9IGFzIEpzeFByb3BzKTtcclxufVxyXG5cclxuLy8gdlRyZWVcclxuXHJcbi8vIGdvdGNoc2FzOlxyXG4vLyAtIHN0eWxlcyB3aWxsIG92ZXJyaWRlIChjb3VsZCBkbzogc2V0dGluZyBlYWNoIHJ1bGUgaW5kaXZpZHVhbGx5KVxyXG5cclxuaW50ZXJmYWNlIFZOb2RlSW50ZXJmYWNlIHtcclxuICB0b1N0cmluZygpOiBzdHJpbmc7XHJcbiAgYXNOb2RlKCk6IE5vZGU7XHJcbiAgcGFyZW50OiBWTm9kZUludGVyZmFjZSB8IG51bGw7XHJcbiAgY2hpbGRyZW46IEFycmF5PFZOb2RlSW50ZXJmYWNlIHwgbmV2ZXI+O1xyXG4gIHR5cGU6IHN0cmluZztcclxuICBub2RlPzogQ2hpbGROb2RlO1xyXG4gIGdldENoaWxkcmVuV2l0aE5vZGVzKGFsd2F5c0FsbG93OiBWTm9kZVtdKTogVk5vZGVbXTtcclxuICByZW1vdmVGcm9tRE9NKCk6IHZvaWQ7XHJcbiAgZGlmZkFuZFBhdGNoKG5ld05vZGU6IFZOb2RlSW50ZXJmYWNlKTogdm9pZDtcclxufVxyXG5cclxuY2xhc3MgRWxlbWVudFZOb2RlIGV4dGVuZHMgVk5vZGUgaW1wbGVtZW50cyBWTm9kZUludGVyZmFjZSB7XHJcbiAgdHlwZSA9IFwiRWxlbWVudFwiO1xyXG4gIG5vZGUgPSBudWxsIGFzIGFueTtcclxuICBjaGlsZHJlbjogVk5vZGVJbnRlcmZhY2VbXTtcclxuICBwYXJlbnQ6IFZOb2RlSW50ZXJmYWNlID0gbnVsbCBhcyBhbnk7XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSB0YWc6IHN0cmluZyxcclxuICAgIHByaXZhdGUgcHJvcHM6IFJlY29yZDxzdHJpbmcsIGFueT4sXHJcbiAgICBjaGlsZHJlbjogVk5vZGVJbnRlcmZhY2VbXVxyXG4gICkge1xyXG4gICAgc3VwZXIoKTtcclxuICAgIHRoaXMuY2hpbGRyZW4gPSBjaGlsZHJlbi5mbGF0KCkubWFwKChjaGlsZCkgPT4ge1xyXG4gICAgICBpZiAoIWNoaWxkKSBjb25zb2xlLmxvZyhcImNoaWxkIG51bGxpc2hcIiwgeyBjaGlsZCwgdk5vZGU6IHRoaXMgfSk7XHJcbiAgICAgIGlmIChjaGlsZCBpbnN0YW5jZW9mIFZOb2RlKSB7XHJcbiAgICAgICAgY29uc3QgY2hpbGRWTm9kZSA9IGNoaWxkOyAvL2NoaWxkLmFzVk5vZGUoKTtcclxuICAgICAgICBjaGlsZFZOb2RlLnBhcmVudCA9IHRoaXM7XHJcbiAgICAgICAgcmV0dXJuIGNoaWxkVk5vZGU7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKGNoaWxkIGluc3RhbmNlb2YgTm9kZSkge1xyXG4gICAgICAgIGNvbnN0IG4gPSBuZXcgTGl2ZU5vZGVWTm9kZShjaGlsZCk7XHJcbiAgICAgICAgbi5wYXJlbnQgPSB0aGlzO1xyXG4gICAgICAgIHJldHVybiBuO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBjb25zb2xlLmxvZyhcIkBAIG1hcCAzXCIsIHsgY2hpbGQgfSk7XHJcblxyXG4gICAgICBpZiAoIXRydXRoeShjaGlsZCkpIHtcclxuICAgICAgICBjb25zdCBjaGlsZFZOb2RlID0gbmV3IE51bGxWTm9kZSgpO1xyXG4gICAgICAgIGNoaWxkVk5vZGUucGFyZW50ID0gdGhpcztcclxuXHJcbiAgICAgICAgcmV0dXJuIGNoaWxkVk5vZGU7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGNvbnN0IG4gPSBuZXcgVGV4dFZOb2RlKGNoaWxkKTtcclxuICAgICAgbi5wYXJlbnQgPSB0aGlzO1xyXG4gICAgICByZXR1cm4gbjtcclxuICAgIH0pO1xyXG4gIH1cclxuICB0b1N0cmluZygpIHtcclxuICAgIHJldHVybiBcIj9cIjtcclxuICB9XHJcbiAgYXNOb2RlKCkge1xyXG4gICAgY29uc3Qgbm9kZSA9IGFzTm9kZSh0aGlzLnRhZywgdGhpcy5wcm9wcywgdGhpcy5jaGlsZHJlbilbMF07XHJcbiAgICB0aGlzLm5vZGUgPSBub2RlO1xyXG4gICAgcmV0dXJuIG5vZGU7XHJcbiAgfVxyXG4gIC8vIEBUT0RPOiBkb2Vzbid0IG5lZWQgdG8gYmUgaW4gVk5vZGUsXHJcbiAgLy8gYmFzaWNhbGx5IG9ubHkgdGhlIGNoZWNrIGlmIGl0IGhhcyAubm9kZSBvciBpdHRlciBvdmVyIGNoaWxkcmVuIChhcmUgVk5vZGVzISBub3QgTm9kZXMpXHJcbiAgZ2V0Q2hpbGRyZW5XaXRoTm9kZXMoYWx3YXlzQWxsb3c6IFZOb2RlW10pIHtcclxuICAgIHJldHVybiB0aGlzLmNoaWxkcmVuXHJcbiAgICAgIC5tYXAoKGNoaWxkTm9kZTogVk5vZGUpID0+IHtcclxuICAgICAgICBpZiAoYWx3YXlzQWxsb3cuaW5jbHVkZXMoY2hpbGROb2RlKSkgcmV0dXJuIGNoaWxkTm9kZTtcclxuICAgICAgICByZXR1cm4gY2hpbGROb2RlLm5vZGUgfHwgY2hpbGROb2RlLmdldENoaWxkcmVuV2l0aE5vZGVzKCk7XHJcbiAgICAgIH0pXHJcbiAgICAgIC5mbGF0KEluZmluaXR5KVxyXG4gICAgICAuZmlsdGVyKEJvb2xlYW4pIGFzIFZOb2RlW107XHJcbiAgfVxyXG4gIHJlbW92ZUZyb21ET00oKSB7XHJcbiAgICB0aGlzLm5vZGUucGFyZW50RWxlbWVudC5yZW1vdmVDaGlsZCh0aGlzLm5vZGUpO1xyXG4gIH1cclxuICBkaWZmQW5kUGF0Y2gobmV3Tm9kZTogRWxlbWVudFZOb2RlKSB7XHJcbiAgICBpZiAobmV3Tm9kZS50YWcgPT09IHRoaXMudGFnKSB7XHJcbiAgICAgIG5ld05vZGUubm9kZSA9IHRoaXMubm9kZTtcclxuICAgICAgLy8gICAgICBwYXRjaCBwcm9wcyxcclxuICAgICAgLy8gdXBkYXRlIHByb3BzIGZvcm0gbmV3IG5vZGVcclxuICAgICAgT2JqZWN0LmVudHJpZXMobmV3Tm9kZS5wcm9wcylcclxuICAgICAgICAuZmlsdGVyKChbaywgdl0pID0+IHRoaXMucHJvcHNba10gIT09IHYpXHJcbiAgICAgICAgLmZvckVhY2goKFtrZXksIHZhbHVlXSkgPT4ge1xyXG4gICAgICAgICAgaWYgKHZhbHVlID09PSB0cnVlKSBuZXdOb2RlLm5vZGUuc2V0QXR0cmlidXRlKGtleSwgXCJcIik7XHJcbiAgICAgICAgICBlbHNlIGlmICh2YWx1ZSA9PT0gbnVsbCB8fCB2YWx1ZSA9PT0gdW5kZWZpbmVkIHx8IHZhbHVlID09PSBmYWxzZSlcclxuICAgICAgICAgICAgbmV3Tm9kZS5ub2RlLnJlbW92ZUF0dHJpYnV0ZShrZXkpO1xyXG4gICAgICAgICAgZWxzZSBuZXdOb2RlLm5vZGUuc2V0QXR0cmlidXRlKGtleSwgdmFsdWUpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgLy8gcmVtb3ZlIG9sZCwgb2Jzb2xhdGUgYXR0cmlidXRlc1xyXG4gICAgICBPYmplY3QuZW50cmllcyh0aGlzLnByb3BzKVxyXG4gICAgICAgIC5maWx0ZXIoKFtrLCB2XSkgPT4gIW5ld05vZGUucHJvcHMuaGFzT3duUHJvcGVydHkoaykpXHJcbiAgICAgICAgLmZvckVhY2goKFtrZXksIHZhbHVlXSkgPT4ge1xyXG4gICAgICAgICAgdGhpcy5ub2RlLnJlbW92ZUF0dHJpYnV0ZShrZXkpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgLy8gY2hpbGRyZW4gPT4gaXRlciBhbmQgcGF0Y2hcclxuICAgICAgLy8gb2xkIGNoaWxkcmVuIGJlaW5nIG1vZGlmaWVkXHJcbiAgICAgIGRpZmZBbmRQYXRjaENoaWxkcmVuKHRoaXMsIG5ld05vZGUpO1xyXG4gICAgfVxyXG4gICAgLy8gdGFnIGhhcyBjaGFuZ2VkXHJcbiAgICBlbHNlIHtcclxuICAgICAgdGhpcy5ub2RlLnJlcGxhY2VXaXRoKG5ld05vZGUuYXNOb2RlKCkpO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuY2xhc3MgRnJhZ21lbnRWTm9kZSBleHRlbmRzIFZOb2RlIGltcGxlbWVudHMgVk5vZGVJbnRlcmZhY2Uge1xyXG4gIHR5cGUgPSBcIkZyYWdtZW50XCI7XHJcbiAgLy8gcGFyZW50PyBAVE9ETzogd2hlcmUgd2lsbCBwYXJlbnQgYmUgYXNpZ25lZD9cclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBjaGlsZHJlbjogQXJyYXk8XHJcbiAgICAgIFZOb2RlSW50ZXJmYWNlIHwgQ2hpbGROb2RlIHwgc3RyaW5nIHwgYm9vbGVhbiB8IG51bGwgfCB1bmRlZmluZWQgfCBudW1iZXJcclxuICAgID5cclxuICApIHtcclxuICAgIHN1cGVyKCk7XHJcbiAgICB0aGlzLmNoaWxkcmVuID0gY2hpbGRyZW4uZmxhdCgpLm1hcCgoY2hpbGQpID0+IHtcclxuICAgICAgaWYgKGNoaWxkIGluc3RhbmNlb2YgVk5vZGUpIHtcclxuICAgICAgICBjb25zdCBjaGlsZFZOb2RlID0gY2hpbGQ7IC8vY2hpbGQuYXNWTm9kZSgpO1xyXG4gICAgICAgIGNoaWxkVk5vZGUucGFyZW50ID0gdGhpcztcclxuICAgICAgICByZXR1cm4gY2hpbGRWTm9kZTtcclxuICAgICAgfVxyXG4gICAgICBpZiAoY2hpbGQgaW5zdGFuY2VvZiBOb2RlKSB7XHJcbiAgICAgICAgY29uc3QgbiA9IG5ldyBMaXZlTm9kZVZOb2RlKGNoaWxkKTtcclxuICAgICAgICBuLnBhcmVudCA9IHRoaXM7XHJcbiAgICAgICAgcmV0dXJuIG47XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGNvbnNvbGUubG9nKFwiQEAgbWFwIDJcIiwgeyBjaGlsZCB9KTtcclxuXHJcbiAgICAgIGlmICghdHJ1dGh5KGNoaWxkKSkge1xyXG4gICAgICAgIGNvbnN0IGNoaWxkVk5vZGUgPSBuZXcgTnVsbFZOb2RlKCk7XHJcbiAgICAgICAgY2hpbGRWTm9kZS5wYXJlbnQgPSB0aGlzO1xyXG4gICAgICAgIHJldHVybiBjaGlsZFZOb2RlO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBjb25zb2xlLmxvZyhcIjo6OlwiLCB7IGNoaWxkIH0pO1xyXG5cclxuICAgICAgY29uc3QgdGV4dFZOb2RlID0gbmV3IFRleHRWTm9kZShjaGlsZCk7XHJcbiAgICAgIHRleHRWTm9kZS5wYXJlbnQgPSB0aGlzO1xyXG4gICAgICByZXR1cm4gdGV4dFZOb2RlO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBhc05vZGUoKSB7XHJcbiAgICBjb25zdCBub2RlID0gYXNOb2RlKHVuZGVmaW5lZCwge30sIHRoaXMuY2hpbGRyZW4pWzBdO1xyXG4gICAgY29uc29sZS5sb2coeyBub2RlIH0pO1xyXG5cclxuICAgIHJldHVybiBub2RlO1xyXG4gIH1cclxuICAvLyB0byBsZXZlbFxyXG4gIGRpZmZBbmRQYXRjaChuZXdWTm9kZTogRnJhZ21lbnRWTm9kZSkge1xyXG4gICAgY29uc29sZS5sb2coXCJkaWZmQW5kUGF0Y2hcIik7XHJcblxyXG4gICAgcmV0dXJuIGRpZmZBbmRQYXRjaENoaWxkcmVuKHRoaXMsIG5ld1ZOb2RlKTtcclxuICB9XHJcblxyXG4gIHJlbW92ZUZyb21ET00oKSB7XHJcbiAgICBnZXRDaGlsZHJlbldpdGhOb2Rlcyh0aGlzKS5mb3JFYWNoKChub2RlKSA9PlxyXG4gICAgICBub2RlLm5vZGUhLnBhcmVudEVsZW1lbnQhLnJlbW92ZUNoaWxkKG5vZGUubm9kZSEpXHJcbiAgICApO1xyXG4gIH1cclxufVxyXG5cclxuY2xhc3MgVGV4dFZOb2RlIGV4dGVuZHMgVk5vZGUgaW1wbGVtZW50cyBWTm9kZUludGVyZmFjZSB7XHJcbiAgdHlwZSA9IFwiVGV4dE5vZGVcIjtcclxuICBjaGlsZHJlbiA9IFtdO1xyXG4gIG5vZGU6IFRleHQgPSBudWxsIGFzIGFueTtcclxuICBwcm9wczogeyBjb250ZW50OiBhbnkgfTtcclxuICBwYXJlbnQ6IFZOb2RlSW50ZXJmYWNlID0gbnVsbCBhcyBhbnk7XHJcblxyXG4gIC8qKlxyXG4gICAqXHJcbiAgICovXHJcbiAgY29uc3RydWN0b3IoY29udGVudDogc3RyaW5nIHwgbnVtYmVyIHwgYm9vbGVhbikge1xyXG4gICAgc3VwZXIoKTtcclxuICAgIHRoaXMucHJvcHMgPSB7IGNvbnRlbnQgfTsgLy9AVE9ETzpcclxuICB9XHJcblxyXG4gIGFzTm9kZSgpIHtcclxuICAgIGNvbnN0IHRleHROb2RlID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUodGhpcy5wcm9wcy5jb250ZW50KTtcclxuICAgIHRoaXMubm9kZSA9IHRleHROb2RlO1xyXG4gICAgcmV0dXJuIHRleHROb2RlO1xyXG4gIH1cclxuXHJcbiAgZGlmZkFuZFBhdGNoKG5ld05vZGU6IFRleHRWTm9kZSkge1xyXG4gICAgdGhpcy5ub2RlLm5vZGVWYWx1ZSA9IG5ld05vZGUucHJvcHMuY29udGVudDtcclxuICAgIG5ld05vZGUubm9kZSA9IHRoaXMubm9kZTtcclxuICB9XHJcblxyXG4gIHJlbW92ZUZyb21ET00oKSB7XHJcbiAgICB0aGlzLm5vZGUucGFyZW50RWxlbWVudCEucmVtb3ZlQ2hpbGQodGhpcy5ub2RlKTtcclxuICB9XHJcbn1cclxuXHJcbmNsYXNzIE51bGxWTm9kZSBleHRlbmRzIFZOb2RlIGltcGxlbWVudHMgVk5vZGVJbnRlcmZhY2Uge1xyXG4gIHR5cGUgPSBcIk51bGxcIjtcclxuICBjaGlsZHJlbiA9IFtdO1xyXG4gIHBhcmVudDogVk5vZGVJbnRlcmZhY2UgPSBudWxsIGFzIGFueTtcclxuICAvKipcclxuICAgKlxyXG4gICAqL1xyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgc3VwZXIoKTtcclxuICB9XHJcblxyXG4gIGFzTm9kZSgpIHtcclxuICAgIC8vcmV0dXJuIG51bGw7IC8vIHJldHVybiBlbXB0eSBmcmFnbWVudD9cclxuICAgIHJldHVybiBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XHJcbiAgfVxyXG5cclxuICBkaWZmQW5kUGF0Y2gobmV3Tm9kZTI6IE51bGxWTm9kZSkge1xyXG4gICAgcmV0dXJuO1xyXG4gIH1cclxuXHJcbiAgcmVtb3ZlRnJvbURPTSgpIHtcclxuICAgIHJldHVybjtcclxuICB9XHJcblxyXG4gIHRvU3RyaW5nKCkge1xyXG4gICAgcmV0dXJuIFwiXCI7XHJcbiAgfVxyXG59XHJcblxyXG5jbGFzcyBMaXZlTm9kZVZOb2RlIGV4dGVuZHMgVk5vZGUgaW1wbGVtZW50cyBWTm9kZUludGVyZmFjZSB7XHJcbiAgdHlwZSA9IFwiTm9kZVwiO1xyXG4gIGNoaWxkcmVuID0gW107XHJcbiAgcGFyZW50OiBWTm9kZUludGVyZmFjZSA9IG51bGwgYXMgYW55O1xyXG4gIG5vZGU6IENoaWxkTm9kZTtcclxuXHJcbiAgLyoqXHJcbiAgICpcclxuICAgKi9cclxuICBjb25zdHJ1Y3Rvcihub2RlOiBDaGlsZE5vZGUpIHtcclxuICAgIHN1cGVyKCk7XHJcbiAgICB0aGlzLm5vZGUgPSBub2RlO1xyXG4gIH1cclxuXHJcbiAgYXNOb2RlKCkge1xyXG4gICAgcmV0dXJuIHRoaXMubm9kZTtcclxuICB9XHJcblxyXG4gIGRpZmZBbmRQYXRjaChuZXdOb2RlOiBMaXZlTm9kZVZOb2RlKSB7XHJcbiAgICBpZiAobmV3Tm9kZS5ub2RlICE9PSB0aGlzLm5vZGUpIHtcclxuICAgICAgdGhpcy5ub2RlLnJlcGxhY2VXaXRoKG5ld05vZGUubm9kZSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICByZW1vdmVGcm9tRE9NKCkge1xyXG4gICAgdGhpcy5ub2RlLnBhcmVudEVsZW1lbnQhLnJlbW92ZUNoaWxkKHRoaXMubm9kZSk7XHJcbiAgfVxyXG5cclxuICB0b1N0cmluZygpIHtcclxuICAgIHJldHVybiBnZXRPdXRlckh0bWwodGhpcy5ub2RlKTtcclxuICB9XHJcbn1cclxuXHJcbmNsYXNzIFJvb3RWTm9kZSBleHRlbmRzIFZOb2RlIGltcGxlbWVudHMgVk5vZGVJbnRlcmZhY2Uge1xyXG4gIHR5cGUgPSBcIlJvb3RcIjtcclxuICBwYXJlbnQgPSBudWxsO1xyXG4gIG5vZGU6IEVsZW1lbnQ7XHJcbiAgY2hpbGRyZW46IFZOb2RlSW50ZXJmYWNlW107XHJcbiAgLyoqXHJcbiAgICpcclxuICAgKi9cclxuICBjb25zdHJ1Y3Rvcihjb250ZW50LCBkb21Ob2RlOiBFbGVtZW50KSB7XHJcbiAgICBzdXBlcigpO1xyXG4gICAgY29udGVudC5wYXJlbnQgPSB0aGlzO1xyXG4gICAgdGhpcy5jaGlsZHJlbiA9IFtjb250ZW50XTtcclxuICAgIHRoaXMubm9kZSA9IGRvbU5vZGU7XHJcbiAgfVxyXG5cclxuICBhc05vZGUoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5jaGlsZHJlblswXS5hc05vZGUoKTtcclxuICB9XHJcbiAgdG9TdHJpbmcoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5jaGlsZHJlblswXS50b1N0cmluZygpO1xyXG4gIH1cclxuXHJcbiAgZGlmZkFuZFBhdGNoKG5ld1ZOb2RlOiBWTm9kZUludGVyZmFjZSkge1xyXG4gICAgZGlmZkFuZFBhdGNoQ2hpbGRyZW4odGhpcywgbmV3Vk5vZGUpO1xyXG4gIH1cclxuXHJcbiAgcmVtb3ZlRnJvbURPTSgpIHtcclxuICAgIHRoaXMubm9kZS5yZW1vdmUoKTtcclxuICB9XHJcbn1cclxuXHJcbi8vIEBUT0RPOiByZWYgY2FsbHNcclxuLy8gQFRPRE86IHJlLXJlbmRlciBzdWIgdHJlZXMgKC5ub2RlID0gYWRkIHRvIG1hcClcclxuIiwiaW1wb3J0IHsgcmVuZGVyLCByYXdIdG1sIH0gZnJvbSBcIi4vanN4L2pzeC1ydW50aW1lXCI7XHJcblxyXG5jb25zdCB4c3MgPSBcIjxpbWcgc3JjPXggb25lcnJvcj1cXFwiYWxlcnQoJ1hTUyBBdHRhY2snKVxcXCI+XCI7IC8vXCI8c2NyaXB0PmFsZXJ0KCctLi0nKTwvc2NyaXB0PlwiO1xyXG5cclxuZnVuY3Rpb24gUlRFKHByb3BzOiAvKnsgdHh0LCBcIm9uLWNsaWNrXCI6IG9uQ2xpY2sgfSovIHtcclxuICB0eHQ6IHN0cmluZztcclxuICByZWY/OiBGdW5jdGlvbjtcclxufSkge1xyXG4gIGNvbnNvbGUubG9nKFwib25DbGlja1wiLCBwcm9wc1tcIm9uLWNsaWNrXCJdKTtcclxuICByZXR1cm4gKFxyXG4gICAgPHAgcmVmPXsoZWw6IEhUTUxFbGVtZW50KSA9PiBjb25zb2xlLmxvZyhcIm15IGRpdiA6OnJlZjo6My4yXCIsIGVsKX0+XHJcbiAgICAgIHtwcm9wcy50eHR9XHJcbiAgICA8L3A+XHJcbiAgKTtcclxufVxyXG5cclxuZnVuY3Rpb24gQnV0dG9uKHtcclxuICBjaGlsZHJlbixcclxuICBkaXNhYmxlZCxcclxufToge1xyXG4gIGNoaWxkcmVuOiBhbnk7XHJcbiAgZGlzYWJsZWQ6IGJvb2xlYW47XHJcbiAgcmVmPzogRnVuY3Rpb247XHJcbn0pIHtcclxuICByZXR1cm4gKFxyXG4gICAgPGJ1dHRvblxyXG4gICAgICBkaXNhYmxlZD17ZGlzYWJsZWR9XHJcbiAgICAgIHJlZj17KGVsOiBIVE1MRWxlbWVudCkgPT4gY29uc29sZS5sb2coXCJteSBidXR0b24gOjpyZWY6OjFcIiwgZWwpfVxyXG4gICAgPlxyXG4gICAgICA8c3BhbiByZWY9eyhlbDogSFRNTEVsZW1lbnQpID0+IGNvbnNvbGUubG9nKFwibXkgYSA6OnJlZjo6MlwiLCBlbCl9PlxyXG4gICAgICAgIEJ0bi1zcGFuLWZpcnN0XHJcbiAgICAgIDwvc3Bhbj5cclxuICAgICAge2NoaWxkcmVufVxyXG4gICAgICA8PlxyXG4gICAgICAgIDxzcGFuIHJlZj17KGVsOiBIVE1MRWxlbWVudCkgPT4gY29uc29sZS5sb2coXCJteSBhIDo6cmVmOjozXCIsIGVsKX0+XHJcbiAgICAgICAgICBCdG4tc3Bhbi1lbmRcclxuICAgICAgICA8L3NwYW4+XHJcbiAgICAgIDwvPlxyXG4gICAgPC9idXR0b24+XHJcbiAgKTtcclxufVxyXG5cclxuZnVuY3Rpb24gcmVmbG9nKGVsOiBIVE1MRWxlbWVudCkge1xyXG4gIGNvbnNvbGUubG9nKFwibXkgaW5uZXIgZGl2OjpyZWY6OjhcIiwgZWwpO1xyXG59XHJcblxyXG4vKlxyXG5jb25zdCBtYXJrdXAgPSAoXHJcbiAgPD5cclxuICAgIDxkaXZcclxuICAgICAgY2xhc3M9XCJmb29cIlxyXG4gICAgICByZWY9eyhlbDogSFRNTEVsZW1lbnQpID0+IGNvbnNvbGUubG9nKFwibXkgZGl2IDo6cmVmOjo0XCIsIGVsKX1cclxuICAgIC8+XHJcbiAgICA8aW5wdXQgZGlzYWJsZWQ9e3RydWV9IGhpZGRlbj17ZmFsc2V9IC8+XHJcbiAgICA8QnV0dG9uXHJcbiAgICAgIGRpc2FibGVkPXt0cnVlfVxyXG4gICAgICByZWY9eyhlbDogSFRNTEVsZW1lbnQpID0+IGNvbnNvbGUubG9nKFwibXkgQlVUVE9OOjpyZWY6OjVcIiwgZWwpfVxyXG4gICAgPlxyXG4gICAgICB0ZXh0XHJcbiAgICAgIDxwb3B1cC1pbmZvXHJcbiAgICAgICAgcmVmPXsoZWw6IEhUTUxFbGVtZW50KSA9PiBjb25zb2xlLmxvZyhcInNwYW4gaW4gQlVUVE9OOjpyZWY6OjZcIiwgZWwpfVxyXG4gICAgICA+XHJcbiAgICAgICAgYmxhXHJcbiAgICAgIDwvcG9wdXAtaW5mbz5cclxuICAgIDwvQnV0dG9uPlxyXG4gICAgPFJURVxyXG4gICAgICB0eHQ9XCJsZSB0ZXh0XCJcclxuICAgICAgcmVmPXsoZWw6IEhUTUxFbGVtZW50KSA9PiBjb25zb2xlLmxvZyhcIm15IGRpdiA6OnJlZjo6My4xXCIsIGVsKX1cclxuICAgICAgb24tY2xpY2s9eyhlOiBIVE1MRWxlbWVudCkgPT4gY29uc29sZS5sb2coZSl9XHJcbiAgICAvPlxyXG4gICAge3hzc31cclxuICAgIHtyYXdIdG1sKGA8b2w+PGxpPnJhdyBodG1sPC9saT48L29sPmApfVxyXG4gICAgPGRpdlxyXG4gICAgICBjbGFzcz1cImJhbVwiXHJcbiAgICAgIHJlZj17KGVsOiBIVE1MRWxlbWVudCkgPT4gY29uc29sZS5sb2coXCJteSBkaXY6OnJlZjo6N1wiLCBlbCl9XHJcbiAgICA+XHJcbiAgICAgIDxkaXY+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cImJhclwiIG9uLWNsaWNrPXsoZSkgPT4gY29uc29sZS5sb2coZSl9IHJlZj17cmVmbG9nfT5cclxuICAgICAgICAgIGNsaWNrIE1FXHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPGRpdiBzdHlsZT17eyBvdXRsaW5lOiBcIjFweCBzb2xpZCByZWQ7XCIgfX0+XHJcbiAgICAgICAgICB7ZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNvbGRcIil9XHJcbiAgICAgICAgICB7bnVsbH1cclxuICAgICAgICAgIHtbMCwgMV0ubWFwKChuKSA9PiAoXHJcbiAgICAgICAgICAgIDxzcGFuPntufTwvc3Bhbj5cclxuICAgICAgICAgICkpfVxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICA8L2Rpdj5cclxuICAgIDwvZGl2PlxyXG4gIDwvPlxyXG4pO1xyXG5cclxuKi9cclxuXHJcbi8qXHJcbmNvbnN0IG1hcmt1cCA9IChcclxuICA8QnV0dG9uIGRpc2FibGVkPXt0cnVlfT5cclxuICAgICAgPGJvbGQgcmVmPXtyZWZsb2d9Pi0tSU5ORVItLTwvYm9sZD5cclxuICA8L0J1dHRvbj5cclxuKTsqL1xyXG4vKlxyXG5cclxuY29uc3QgbWFya3VwID0gKFxyXG4gIDxkaXYgY2xhc3M9XCJmb29cIiByZWY9eyhlbDogSFRNTEVsZW1lbnQpID0+IGNvbnNvbGUubG9nKFwibXkgZGl2OjpyZWY6OlwiLCBlbCl9PlxyXG4gICAgPGRpdj5cclxuICAgICAgPGRpdiBjbGFzcz1cImJhclwiIHJlZj17KGVsOiBIVE1MRWxlbWVudCkgPT4gY29uc29sZS5sb2coXCJteSBpbm5lciBkaXY6OnJlZjo6XCIsIGVsKX0gLz5cclxuICAgIDwvZGl2PlxyXG4gICAgPEJ1dHRvbiBkaXNhYmxlZD17dHJ1ZX0+PC9CdXR0b24+XHJcbiAgPC9kaXY+XHJcbik7XHJcbiovXHJcbi8qXHJcbmNvbnN0IG1hcmt1cCA9IChcclxuICA8YT5cclxuICAgIDxiPlxyXG4gICAgICA8YyBjbGFzcz1cImJhclwiIHJlZj17cmVmbG9nfSAvPlxyXG4gICAgPC9iPlxyXG4gIDwvYT5cclxuKTtcclxuKi9cclxuXHJcbmZ1bmN0aW9uIFNwYW4oeyBtb2RlIH06IHsgbW9kZTogYW55IH0pIHtcclxuICByZXR1cm4gbW9kZSA9PT0gMSA/IChcclxuICAgIDxkaXY+XHJcbiAgICAgIDxzcGFuIGlkPVwiaW5uZXJcIiBvbGQ9e3RydWV9PlxyXG4gICAgICAgIFNwYW4tQ29tcC0tb2xkXHJcbiAgICAgIDwvc3Bhbj5cclxuICAgICAgPGgzPnRvIGJlIHJlbW92ZWQ8L2gzPlxyXG4gICAgPC9kaXY+XHJcbiAgKSA6IChcclxuICAgIDxkaXY+XHJcbiAgICAgIDxwIGlkPVwiaW5uZXJcIiBuZXc9e3RydWV9PlxyXG4gICAgICAgIFNwYW4tQ29tcC0tbmV3c1xyXG4gICAgICA8L3A+XHJcbiAgICA8L2Rpdj5cclxuICApO1xyXG59XHJcblxyXG5mdW5jdGlvbiBDb21wKHsgbnVtIH0pIHtcclxuICBpZiAobnVtID09PSAxKSByZXR1cm4gbnVsbDtcclxuICByZXR1cm4gKFxyXG4gICAgPGRpdj5cclxuICAgICAgPHA+Y29tcDwvcD5cclxuICAgIDwvZGl2PlxyXG4gICk7XHJcbn1cclxuXHJcbmNvbnN0IG1hcmt1cDEgPSAobnVtOiBhbnkpID0+IChcclxuICA8ZGl2IGlkPVwib3V0ZXJcIiBkYXRhLWZvbz1cImJhclwiIGRhdGEtdmFyPXtudW19PlxyXG4gICAgPGgzPnNob3VsZCBnZXQgMiAtOiAzPC9oMz5cclxuICAgIHtudW0gPT09IDEgPyAoXHJcbiAgICAgIDx1bCBjbGFzcz1cInVsLWNsYXNzXCI+XHJcbiAgICAgICAgPGxpPlRleHQgMSA8L2xpPlxyXG4gICAgICAgIDxsaT5UZXh0IDIgPC9saT5cclxuICAgICAgPC91bD5cclxuICAgICkgOiAoXHJcbiAgICAgIDx1bCBjbGFzcz1cInVsLWNsYXNzXCI+XHJcbiAgICAgICAgPGxpPlRleHQgMyA8L2xpPlxyXG4gICAgICAgIDxsaT5UZXh0IDIgPC9saT5cclxuICAgICAgICA8bGk+VGV4dCAxIDwvbGk+XHJcbiAgICAgIDwvdWw+XHJcbiAgICApfVxyXG4gICAgPGgzPnNob3VsZCBnZXQgMyAtOiAyPC9oMz5cclxuICAgIHtudW0gPT09IDEgPyAoXHJcbiAgICAgIDx1bCBjbGFzcz1cInVsLWNsYXNzXCI+XHJcbiAgICAgICAgPGxpPlRleHQgMSA8L2xpPlxyXG4gICAgICAgIDxsaT5UZXh0IDIgPC9saT5cclxuICAgICAgICA8bGk+VGV4dCAzIDwvbGk+XHJcbiAgICAgIDwvdWw+XHJcbiAgICApIDogKFxyXG4gICAgICA8dWwgY2xhc3M9XCJ1bC1jbGFzc1wiPlxyXG4gICAgICAgIDxsaT5UZXh0IDEgPC9saT5cclxuICAgICAgICA8bGk+VGV4dCAyIDwvbGk+XHJcbiAgICAgIDwvdWw+XHJcbiAgICApfVxyXG4gICAge251bSA9PT0gMSA/IG51bGwgOiA8cD5uZXcgcmVuZGVyPC9wPn1cclxuICAgIDxkaXY+XHJcbiAgICAgIDxzcGFuPnNwYW4tY29udGVudDwvc3Bhbj5cclxuICAgIDwvZGl2PlxyXG4gICAgPFNwYW4gbW9kZT17bnVtfSAvPlxyXG4gICAgey8qZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNvbGRcIikqL31cclxuICAgIDw+RnJhZ21lbnQtaXRlbTwvPlxyXG4gICAgPHN2Z1xyXG4gICAgICB2aWV3Qm94PVwiMCAwIDMwMCAxMDBcIlxyXG4gICAgICB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCJcclxuICAgICAgc3Ryb2tlPVwicmVkXCJcclxuICAgICAgZmlsbD1cImdyZXlcIlxyXG4gICAgPlxyXG4gICAgICA8Y2lyY2xlIGN4PVwiNTBcIiBjeT1cIjUwXCIgcj1cIjQwXCIgLz5cclxuICAgICAgPGNpcmNsZSBjeD1cIjE1MFwiIGN5PVwiNTBcIiByPVwiNFwiIC8+XHJcblxyXG4gICAgICA8c3ZnIHZpZXdCb3g9XCIwIDAgMTAgMTBcIiB4PVwiMjAwXCIgd2lkdGg9XCIxMDBcIj5cclxuICAgICAgICA8Y2lyY2xlIGN4PVwiNVwiIGN5PVwiNVwiIHI9XCI0XCIgLz5cclxuICAgICAgPC9zdmc+XHJcbiAgICA8L3N2Zz5cclxuICA8L2Rpdj5cclxuKTtcclxuXHJcbmZ1bmN0aW9uIG1hcmt1cDIobnVtOiBhbnkpIHtcclxuICByZXR1cm4gKFxyXG4gICAgPGRpdiBpZD1cIm91dGVyXCI+XHJcbiAgICAgIDw+XHJcbiAgICAgICAgPD5cclxuICAgICAgICAgIDxwPm5lc3RlZCBmcmFnbWVudDwvcD5cclxuICAgICAgICA8Lz5cclxuICAgICAgPC8+XHJcbiAgICAgIDxoMT5zdGF0aWM8L2gxPlxyXG4gICAgICA8aDE+ZHluYW1pYyB2YWw6IHtudW19PC9oMT5cclxuICAgICAge251bSA9PT0gMSA/IDxoMT5vbGQ8L2gxPiA6IGZhbHNlfVxyXG4gICAgICB7bnVtID09PSAxID8gKFxyXG4gICAgICAgIDw+XHJcbiAgICAgICAgICA8aDE+ZnJhZyBvbGQ8L2gxPlxyXG4gICAgICAgICAgPHNwYW4+ZnJhZyBzcGFuIG9sZDwvc3Bhbj5cclxuICAgICAgICA8Lz5cclxuICAgICAgKSA6IChcclxuICAgICAgICA8aDE+ZnJhZyBuZXc8L2gxPlxyXG4gICAgICApfVxyXG4gICAgICA8Q29tcCBudW09e251bX0gLz5cclxuICAgIDwvZGl2PlxyXG4gICk7XHJcbn1cclxuZnVuY3Rpb24gTkwoKSB7XHJcbiAgcmV0dXJuIG51bGw7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIG1hcmt1cDMobnVtOiBhbnkpIHtcclxuICByZXR1cm4gbnVtID09PSAxID8gKFxyXG4gICAgPGgxPlxyXG4gICAgICBBLUxpbmUgMSAtIHtudW19XHJcbiAgICAgIDxTcGFuIG1vZGU9e251bX0gLz5cclxuICAgICAgPEJ1dHRvblxyXG4gICAgICAgIGRpc2FibGVkPXt0cnVlfVxyXG4gICAgICAgIHJlZj17KGVsOiBIVE1MRWxlbWVudCkgPT4gY29uc29sZS5sb2coXCJteSBCVVRUT046OnJlZjo6NVwiLCBlbCl9XHJcbiAgICAgID5cclxuICAgICAgICB0ZXh0XHJcbiAgICAgICAgPHBvcHVwLWluZm9cclxuICAgICAgICAgIHJlZj17KGVsOiBIVE1MRWxlbWVudCkgPT4gY29uc29sZS5sb2coXCJzcGFuIGluIEJVVFRPTjo6cmVmOjo2XCIsIGVsKX1cclxuICAgICAgICA+XHJcbiAgICAgICAgICBibGFcclxuICAgICAgICA8L3BvcHVwLWluZm8+XHJcbiAgICAgICAgPHA+aW5uZXIgcCB7bnVtfTwvcD5cclxuICAgICAgPC9CdXR0b24+XHJcbiAgICAgIEEtTGluZSAzXHJcbiAgICAgIDw+XHJcbiAgICAgICAgPHA+XHJcbiAgICAgICAgICA8cD5BIEZyYWcgbGluZSAxKjwvcD5cclxuICAgICAgICA8L3A+XHJcbiAgICAgICAgPHA+QSBGcmFnIGxpbmUgMjwvcD5cclxuICAgICAgICA8cD5BIEZyYWcgbGluZSAzPC9wPlxyXG4gICAgICAgIDxwPkEgRnJhZyBsaW5lIDQ8L3A+XHJcbiAgICAgICAgPHN2Z1xyXG4gICAgICAgICAgdmlld0JveD1cIjAgMCAzMDAgMTAwXCJcclxuICAgICAgICAgIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIlxyXG4gICAgICAgICAgc3Ryb2tlPVwicmVkXCJcclxuICAgICAgICAgIGZpbGw9XCJncmV5XCJcclxuICAgICAgICA+XHJcbiAgICAgICAgICA8Y2lyY2xlIGN4PVwiNTBcIiBjeT1cIjUwXCIgcj1cIjQwXCIgLz5cclxuICAgICAgICAgIDxjaXJjbGUgY3g9XCIxNTBcIiBjeT1cIjUwXCIgcj1cIjRcIiAvPlxyXG5cclxuICAgICAgICAgIDxzdmcgdmlld0JveD1cIjAgMCAxMCAxMFwiIHg9XCIyMDBcIiB3aWR0aD1cIjEwMFwiPlxyXG4gICAgICAgICAgICA8Y2lyY2xlIGN4PVwiNVwiIGN5PVwiNVwiIHI9XCI0XCIgLz5cclxuICAgICAgICAgIDwvc3ZnPlxyXG4gICAgICAgIDwvc3ZnPlxyXG4gICAgICA8Lz5cclxuICAgICAge251bGx9XHJcbiAgICA8L2gxPlxyXG4gICkgOiAoXHJcbiAgICA8aDEgY2xhc3M9XCJhXCI+XHJcbiAgICAgIEIgTGluZSAxIC0ge251bX1cclxuICAgICAgPFNwYW4gbW9kZT17bnVtfSAvPlxyXG4gICAgICA8QnV0dG9uXHJcbiAgICAgICAgZGlzYWJsZWQ9e3RydWV9XHJcbiAgICAgICAgcmVmPXsoZWw6IEhUTUxFbGVtZW50KSA9PiBjb25zb2xlLmxvZyhcIm15IEJVVFRPTjo6cmVmOjo1XCIsIGVsKX1cclxuICAgICAgPlxyXG4gICAgICAgIHRleHRcclxuICAgICAgICA8cG9wdXAtaW5mb1xyXG4gICAgICAgICAgcmVmPXsoZWw6IEhUTUxFbGVtZW50KSA9PiBjb25zb2xlLmxvZyhcInNwYW4gaW4gQlVUVE9OOjpyZWY6OjZcIiwgZWwpfVxyXG4gICAgICAgID5cclxuICAgICAgICAgIGJsYVxyXG4gICAgICAgIDwvcG9wdXAtaW5mbz5cclxuICAgICAgICA8cD57bnVtfTwvcD5cclxuICAgICAgPC9CdXR0b24+XHJcbiAgICAgIDw+XHJcbiAgICAgICAge2ZhbHNlfVxyXG4gICAgICAgIHtudWxsfVxyXG4gICAgICAgIHt1bmRlZmluZWR9XHJcbiAgICAgIDwvPlxyXG4gICAgICA8PlxyXG4gICAgICAgIDxwPkIgRnJhZyBsaW5lIDE8L3A+XHJcbiAgICAgICAgPHA+QiBGcmFnIGxpbmUgMjwvcD5cclxuICAgICAgICB7dW5kZWZpbmVkfVxyXG4gICAgICAgIDxwPkIgRnJhZyBsaW5lIDMoNCk8L3A+XHJcbiAgICAgICAgPHN2Z1xyXG4gICAgICAgICAgdmlld0JveD1cIjAgMCAzMDAgMTAwXCJcclxuICAgICAgICAgIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIlxyXG4gICAgICAgICAgc3Ryb2tlPVwicmVkXCJcclxuICAgICAgICAgIGZpbGw9XCJncmV5XCJcclxuICAgICAgICA+XHJcbiAgICAgICAgICA8Y2lyY2xlIGN4PVwiNTBcIiBjeT1cIjUwXCIgcj1cIjQwXCIgLz5cclxuICAgICAgICAgIDxjaXJjbGUgY3g9XCIxNTBcIiBjeT1cIjUwXCIgcj1cIjRcIiAvPlxyXG5cclxuICAgICAgICAgIDxzdmcgdmlld0JveD1cIjAgMCAxMCAxMFwiIHg9XCIyMDBcIiB3aWR0aD1cIjEwMFwiPlxyXG4gICAgICAgICAgICA8Y2lyY2xlIGN4PVwiNVwiIGN5PVwiNVwiIHI9XCI2XCIgLz5cclxuICAgICAgICAgIDwvc3ZnPlxyXG4gICAgICAgIDwvc3ZnPlxyXG4gICAgICAgIDxwPkIgRnJhZyBsaW5lIDQoNik8L3A+XHJcbiAgICAgIDwvPlxyXG4gICAgPC9oMT5cclxuICApO1xyXG59XHJcbmNvbnN0IG9iaiA9IHsgYTogMSB9O1xyXG5cclxuZnVuY3Rpb24gbWFya3VwNChudW06IGFueSkge1xyXG4gIG9iai5hID0gbnVtO1xyXG4gIHJldHVybiBudW0gPT09IDEgPyAoXHJcbiAgICA8aDEgb2JqPXtvYmp9IGlkPXtvYmouYX0+XHJcbiAgICAgIG9sZC1IZWFkbGluZSB7bnVtfVxyXG4gICAgPC9oMT5cclxuICApIDogKFxyXG4gICAgPGgxIG9iaj17b2JqfSBjbGFzcz1cImFcIiBpZD17b2JqLmF9PlxyXG4gICAgICBuZXctSGVhZGxpbmUge251bX1cclxuICAgIDwvaDE+XHJcbiAgKTtcclxufVxyXG5cclxuZnVuY3Rpb24gbWFya3VwKG51bTogYW55KSB7XHJcbiAgcmV0dXJuIG51bSA9PT0gMSA/IChcclxuICAgIDxkaXY+XHJcbiAgICAgIDw+XHJcbiAgICAgICAgPHA+ZnJhZyAtIEk8L3A+XHJcbiAgICAgICAgPGI+IGZyYWcgLSBJSTwvYj5cclxuICAgICAgPC8+XHJcbiAgICA8L2Rpdj5cclxuICApIDogKFxyXG4gICAgPGgxIGNsYXNzPVwiYVwiPlxyXG4gICAgICB7XCJuZXctSGVhZGxpbmVcIn0ge251bX1cclxuICAgIDwvaDE+XHJcbiAgKTtcclxufVxyXG5cclxuLy9jb25zb2xlLmxvZyhtYXJrdXApO1xyXG4vL3dpbmRvdy5tYXJrdXAgPSBtYXJrdXA7XHJcblxyXG5jbGFzcyBQb3BVcEluZm8gZXh0ZW5kcyBIVE1MRWxlbWVudCB7XHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAvLyBBbHdheXMgY2FsbCBzdXBlciBmaXJzdCBpbiBjb25zdHJ1Y3RvclxyXG4gICAgc3VwZXIoKTtcclxuXHJcbiAgICAvLyB3cml0ZSBlbGVtZW50IGZ1bmN0aW9uYWxpdHkgaW4gaGVyZVxyXG5cclxuICAgIGNvbnNvbGUubG9nKFwiIyMjIyMjIyMjIyMjIyMjIyNjdG9yIENFXCIpO1xyXG4gIH1cclxuXHJcbiAgY29ubmVjdGVkQ2FsbGJhY2soKSB7XHJcbiAgICBjb25zb2xlLmxvZyhcIiMjIyMjIyMjIyMjIyMjIyMjQ3VzdG9tIHNxdWFyZSBlbGVtZW50IGFkZGVkIHRvIHBhZ2UuXCIpO1xyXG4gIH1cclxufVxyXG5cclxuY3VzdG9tRWxlbWVudHMuZGVmaW5lKFwicG9wdXAtaW5mb1wiLCBQb3BVcEluZm8pO1xyXG5cclxuLy9kb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI29sZFwiKSEuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGNvbnNvbGUubG9nKTtcclxuXHJcbi8vZG9jdW1lbnQuYm9keS5pbm5lckhUTUwgPSBtYXJrdXA7XHJcbi8vLy9yZW5kZXIobWFya3VwMygxKSwgZG9jdW1lbnQuYm9keSk7XHJcbi8vZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJvdXRlclwiKT8uc2V0QXR0cmlidXRlKFwiZGF0YS1mb29cIiwgXCJtb2RcIik7XHJcblxyXG4vL2RvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaW5uZXJcIik/LnNldEF0dHJpYnV0ZShcImRhdGEtZm9vXCIsIFwibW9kXCIpO1xyXG4vL3JlbmRlcihtYXJrdXAoMiksIGRvY3VtZW50LmJvZHkpO1xyXG4vL3JlbmRlcihtYXJrdXAsIGRvY3VtZW50LmJvZHksIHRydWUpO1xyXG5jb25zdCBlbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjb2xkXCIpXHJcbmZ1bmN0aW9uIENvbXAyKCkge1xyXG4gIHJldHVybiAoXHJcbiAgICA8PlxyXG4gICAgICA8Q29tcDMgLz5cclxuICAgICAge2VsfVxyXG4gICAgPC8+XHJcbiAgKTtcclxufVxyXG5mdW5jdGlvbiBDb21wMygpIHtcclxuICByZXR1cm4gPGRpdj5jb21wIGNvbnRlbnQ8L2Rpdj47XHJcbn1cclxuXHJcbndpbmRvdy5yZVJlbmRlcjEgPSAoKSA9PlxyXG4gIHJlbmRlcihtYXJrdXAzKDEpLCBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNvbnRhaW5lclwiKSk7XHJcbndpbmRvdy5yZVJlbmRlcjIgPSAoKSA9PlxyXG4gIHJlbmRlcihtYXJrdXAzKDIpLCBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNvbnRhaW5lclwiKSk7XHJcbndpbmRvdy5yZVJlbmRlcjMgPSAoKSA9PlxyXG4gIHJlbmRlcihcclxuICAgIC8vIDxkaXY+dHh0PC9kaXY+XHJcbiAgICA8Q29tcDIgLz4sXHJcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNvbnRhaW5lclwiKVxyXG4gICk7XHJcblxyXG5jb25zb2xlLmxvZyhcIjEyMzQ1XCIpO1xyXG5cclxuIl0sInNvdXJjZVJvb3QiOiIifQ==