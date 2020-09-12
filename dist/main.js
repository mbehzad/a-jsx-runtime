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

  console.log("asNode", {
    props
  });
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
    console.log("push to refs");
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
  console.log({
    children
  });
  node.append(...children //.flat()
  .map(child => child.asNode())); // svg element and all its children were rendered, reset the svg context

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

  /*const ref: Function | null =
    typeof props.ref === "function" ? props.ref : null;
  if (ref) delete props.ref; // @TODO:*/

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

    while (refsToCall.length) {
      // remove first from list, and invoke it
      refsToCall.splice(0, 1)[0]();
    } ////markup[_callRefs]();

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vanN4L2pzeC1ydW50aW1lLnRzIiwid2VicGFjazovLy8uL21haW4udHN4Il0sIm5hbWVzIjpbInJlbmRlcmVkVlRyZWVzIiwiV2Vha01hcCIsInJlZnNUb0NhbGwiLCJKc3hOb2RlIiwiY29uc3RydWN0b3IiLCJwcm9wcyIsImdldFBhcmVudEVsZW1lbnROb2RlIiwidk5vZGUiLCJjb25zb2xlIiwibG9nIiwicGFyZW50Iiwibm9kZSIsImdldENoaWxkcmVuV2l0aE5vZGVzIiwiYWx3YXlzQWxsb3ciLCJjaGlsZHJlbiIsIm1hcCIsImNoaWxkTm9kZSIsImZsYXQiLCJJbmZpbml0eSIsImdldFBhcmVudEFuZE5leHRTaWJsaW5nIiwicGFyZW50V2l0aEVsZW1lbnQiLCJzaWJsaW5ncyIsInByZXZTaWJsaW5nIiwiaW5kZXhPZiIsIm5leHRTaWJsaW5nTm9kZSIsIm5leHRTaWJsaW5nIiwiX2NhbGxSZWZzIiwiU3ltYm9sIiwic3ZnQ29udGV4dCIsInRydXRoeSIsInZhbHVlIiwidW5kZWZpbmVkIiwic2FuaXRpemUiLCJ0ZXh0IiwiZGl2IiwiZG9jdW1lbnQiLCJjcmVhdGVFbGVtZW50IiwiaW5uZXJUZXh0IiwiaW5uZXJIVE1MIiwiZ2V0T3V0ZXJIdG1sIiwiZWxlbWVudCIsIkVsZW1lbnQiLCJvdXRlckhUTUwiLCJUZXh0Iiwid2hvbGVUZXh0IiwiRG9jdW1lbnRGcmFnbWVudCIsIkFycmF5IiwiZnJvbSIsImNoaWxkTm9kZXMiLCJlbCIsImpvaW4iLCJ3YXJuIiwiYXNIdG1sU3RyaW5nIiwidGFnIiwiYXR0cmlidXRlcyIsIk9iamVjdCIsImVudHJpZXMiLCJmaWx0ZXIiLCJrZXkiLCJ2IiwiayIsImlzQXJyYXkiLCJjb250ZW50IiwiY2hpbGQiLCJ0b1N0cmluZyIsImFzTm9kZSIsImZyYWdtZW50cyIsIml0ZW0iLCJkb2N1bWVudEZyYWdtZW50IiwiY3JlYXRlRG9jdW1lbnRGcmFnbWVudCIsImFwcGVuZCIsImVycm9yIiwicmVzdWx0IiwianN4Tm9kZXMiLCJWTm9kZSIsImZvckVhY2giLCJzdGFydHNXaXRoIiwiZXZlbnQiLCJyZXBsYWNlIiwiYWRkRXZlbnRMaXN0ZW5lciIsInJlZiIsImF0dHJzIiwic3ZnQ29udGV4dFNldCIsImNyZWF0ZUVsZW1lbnROUyIsInB1c2giLCJfa2V5Iiwic2V0QXR0cmlidXRlIiwiU3RyaW5nIiwiY2hpbGRKc3hOb2RlcyIsImluc2VydE5ld0l0ZW0iLCJuZXdOb2RlIiwiaW5zZXJ0QmVmb3JlIiwiZGlmZkFuZFBhdGNoQ2hpbGRyZW4iLCJvbGROb2RlIiwib2xkQ2hpbGQiLCJpeCIsIm5ld0NoaWxkIiwicmVtb3ZlRnJvbURPTSIsInR5cGUiLCJkaWZmQW5kUGF0Y2giLCJuZXdJdGVtcyIsInNsaWNlIiwibGVuZ3RoIiwiRWxlbWVudFZOb2RlIiwiRnJhZ21lbnRWTm9kZSIsIk5vZGUiLCJMaXZlTm9kZVZOb2RlIiwiTnVsbFZOb2RlIiwiVGV4dFZOb2RlIiwicGFyZW50RWxlbWVudCIsInJlbW92ZUNoaWxkIiwicmVtb3ZlQXR0cmlidXRlIiwiaGFzT3duUHJvcGVydHkiLCJyZXBsYWNlV2l0aCIsIm5ld1ZOb2RlIiwidGV4dE5vZGUiLCJjcmVhdGVUZXh0Tm9kZSIsIm5vZGVWYWx1ZSIsIm5ld05vZGUyIiwiUm9vdFZOb2RlIiwiZG9tTm9kZSIsInJlbW92ZSIsImFzVk5vZGUiLCJhdHRyIiwianN4cyIsIkZyYWdtZW50IiwianN4IiwicmVuZGVyIiwibWFya3VwIiwiYm9keSIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJzdHlsZSIsImJhY2tncm91bmQiLCJpc1JlUmVuZGVyIiwiaGFzIiwiaW5zZXJ0QWRqYWNlbnRIVE1MIiwiaW5zZXJ0QWRqYWNlbnRFbGVtZW50IiwidlRyZWUiLCJvbGRWVHJlZSIsImdldCIsIm5ld1ZUcmVlIiwic2V0Iiwic3BsaWNlIiwiRXJyb3IiLCJyYXdIdG1sIiwidGVtcGxhdGUiLCJ4c3MiLCJSVEUiLCJ0eHQiLCJCdXR0b24iLCJkaXNhYmxlZCIsInJlZmxvZyIsIlNwYW4iLCJtb2RlIiwiQ29tcCIsIm51bSIsIm1hcmt1cDEiLCJtYXJrdXAyIiwiTkwiLCJtYXJrdXAzIiwiaW5mbyIsIm9iaiIsImEiLCJtYXJrdXA0IiwibWFya3VwNSIsIlBvcFVwSW5mbyIsIkhUTUxFbGVtZW50IiwiY3VzdG9tRWxlbWVudHMiLCJkZWZpbmUiLCJxdWVyeVNlbGVjdG9yIiwiQ29tcDIiLCJDb21wMyIsIndpbmRvdyIsInJlUmVuZGVyMSIsImdldEVsZW1lbnRCeUlkIiwicmVSZW5kZXIyIiwicmVSZW5kZXIzIiwic3MiLCJzczIiLCJyZVJlbmRlcjVhIiwicmVSZW5kZXI1YiIsInJlUmVuZGVyUmVmIl0sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtRQUNBOzs7UUFHQTtRQUNBOzs7Ozs7Ozs7Ozs7O0FDbEZBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLE1BQU1BLGNBQWMsR0FBRyxJQUFJQyxPQUFKLEVBQXZCO0FBQ0EsTUFBTUMsVUFBNkIsR0FBRyxFQUF0QztBQUVBOzs7O0FBS0E7QUFDQTs7QUE0QkE7QUFDQTtBQUNBLE1BQU1DLE9BQU4sQ0FBYztBQUVaQyxhQUFXLENBQUNDLEtBQUQsRUFBa0I7QUFBQSxTQUQ3QkEsS0FDNkI7QUFDM0IsU0FBS0EsS0FBTCxHQUFhQSxLQUFiO0FBQ0Q7O0FBSlcsQyxDQU9kOzs7QUFDQSxTQUFTQyxvQkFBVCxDQUE4QkMsS0FBOUIsRUFBbUU7QUFDakVDLFNBQU8sQ0FBQ0MsR0FBUixDQUFZLHNCQUFaLEVBQW9DRixLQUFwQzs7QUFFQSxTQUFPQSxLQUFLLENBQUNHLE1BQWIsRUFBcUI7QUFDbkJILFNBQUssR0FBR0EsS0FBSyxDQUFDRyxNQUFkLENBRG1CLENBRW5COztBQUNBLFFBQUlILEtBQUssQ0FBQ0ksSUFBVixFQUFnQjtBQUNqQjs7QUFFRCxTQUFRSixLQUFSO0FBQ0Q7O0FBRUQsU0FBU0ssb0JBQVQsQ0FDRUwsS0FERixFQUVFTSxXQUZGLEVBR29CO0FBQ2xCTixPQUFLLENBQUNPLFFBQU47QUFDQSxTQUFPUCxLQUFLLENBQUNPLFFBQU4sQ0FDSkMsR0FESSxDQUNDQyxTQUFELElBQWU7QUFDbEIsUUFBSUEsU0FBUyxLQUFLSCxXQUFsQixFQUErQixPQUFPRyxTQUFQO0FBQy9CLFFBQUlBLFNBQVMsQ0FBQ0wsSUFBZCxFQUFvQixPQUFPSyxTQUFQO0FBQ3BCLFdBQU9KLG9CQUFvQixDQUFDSSxTQUFELEVBQVlILFdBQVosQ0FBM0I7QUFDRCxHQUxJLEVBTUpJLElBTkksQ0FNQ0MsUUFORCxDQUFQO0FBT0Q7O0FBRUQsU0FBU0MsdUJBQVQsQ0FBaUNaLEtBQWpDLEVBQTZFO0FBQzNFO0FBQ0EsUUFBTWEsaUJBQWlCLEdBQUdkLG9CQUFvQixDQUFDQyxLQUFELENBQTlDO0FBQ0EsUUFBTWMsUUFBUSxHQUFHVCxvQkFBb0IsQ0FBQ1EsaUJBQUQsRUFBb0JiLEtBQXBCLENBQXJDO0FBQ0FDLFNBQU8sQ0FBQ0MsR0FBUixDQUFZLFVBQVosRUFBd0JZLFFBQXhCO0FBRUEsUUFBTUMsV0FBVyxHQUFHRCxRQUFRLENBQUNBLFFBQVEsQ0FBQ0UsT0FBVCxDQUFpQmhCLEtBQWpCLElBQTBCLENBQTNCLENBQTVCO0FBQ0EsUUFBTWlCLGVBQWUsR0FBR0YsV0FBVyxHQUFHQSxXQUFXLENBQUNYLElBQVosQ0FBa0JjLFdBQXJCLEdBQW1DLElBQXRFO0FBRUEsU0FBTyxDQUFDTCxpQkFBaUIsQ0FBQ1QsSUFBbkIsRUFBeUJhLGVBQXpCLENBQVA7QUFDRCxDLENBRUQ7OztBQUNBLE1BQU1FLFNBQVMsR0FBR0MsTUFBTSxDQUFDLFVBQUQsQ0FBeEIsQyxDQUVBOzs7QUFDQSxJQUFJQyxVQUFVLEdBQUcsS0FBakIsQyxDQUVBOztBQVFBOzs7OztBQUtBLFNBQVNDLE1BQVQsQ0FBZ0JDLEtBQWhCLEVBQXFDO0FBQ25DLFNBQU9BLEtBQUssS0FBSyxLQUFWLElBQW1CQSxLQUFLLEtBQUssSUFBN0IsSUFBcUNBLEtBQUssS0FBS0MsU0FBdEQ7QUFDRDtBQUVEOzs7Ozs7OztBQU1BLFNBQVNDLFFBQVQsQ0FBa0JDLElBQWxCLEVBQXdDO0FBQ3RDLFFBQU1DLEdBQUcsR0FBR0MsUUFBUSxDQUFDQyxhQUFULENBQXVCLEtBQXZCLENBQVo7QUFDQUYsS0FBRyxDQUFDRyxTQUFKLEdBQWdCSixJQUFoQjtBQUNBLFNBQU9DLEdBQUcsQ0FBQ0ksU0FBWDtBQUNEO0FBRUQ7Ozs7OztBQUlBLFNBQVNDLFlBQVQsQ0FBc0JDLE9BQXRCLEVBQTZDO0FBQzNDLE1BQUlBLE9BQU8sWUFBWUMsT0FBdkIsRUFBZ0MsT0FBT0QsT0FBTyxDQUFDRSxTQUFmO0FBQ2hDLE1BQUlGLE9BQU8sWUFBWUcsSUFBdkIsRUFBNkIsT0FBT1gsUUFBUSxDQUFDUSxPQUFPLENBQUNJLFNBQVQsQ0FBZjtBQUM3QixNQUFJSixPQUFPLFlBQVlLLGdCQUF2QixFQUNFLE9BQU9DLEtBQUssQ0FBQ0MsSUFBTixDQUFXUCxPQUFPLENBQUNRLFVBQW5CLEVBQ0pqQyxHQURJLENBQ0NrQyxFQUFELElBQVFWLFlBQVksQ0FBQ1UsRUFBRCxDQURwQixFQUVKQyxJQUZJLENBRUMsRUFGRCxDQUFQLENBSnlDLENBUTNDOztBQUNBMUMsU0FBTyxDQUFDMkMsSUFBUixDQUFhLG9EQUFiLEVBQW1FWCxPQUFuRTtBQUNBLFNBQU8sRUFBUDtBQUNEO0FBRUQ7Ozs7Ozs7O0FBTUEsU0FBU1ksWUFBVCxDQUFzQkMsR0FBdEIsRUFBOENoRCxLQUE5QyxFQUErRFMsUUFBL0QsRUFBeUU7QUFDdkUsUUFBTXdDLFVBQVUsR0FBR0MsTUFBTSxDQUFDQyxPQUFQLENBQWVuRCxLQUFmLEVBQ2hCb0QsTUFEZ0IsQ0FDVCxDQUFDLEdBQUczQixLQUFILENBQUQsS0FBZUQsTUFBTSxDQUFDQyxLQUFELENBRFosRUFFaEJmLEdBRmdCLENBRVosQ0FBQyxDQUFDMkMsR0FBRCxFQUFNNUIsS0FBTixDQUFELEtBQWtCO0FBQ3JCO0FBQ0EsUUFBSUEsS0FBSyxLQUFLLElBQWQsRUFBb0IsT0FBTzRCLEdBQVAsQ0FGQyxDQUlyQjtBQUNBOztBQUNBLFFBQUlBLEdBQUcsS0FBSyxPQUFSLElBQW1CLE9BQU81QixLQUFQLEtBQWlCLFFBQXhDLEVBQ0VBLEtBQUssR0FBR3lCLE1BQU0sQ0FBQ0MsT0FBUCxDQUFlMUIsS0FBZixFQUNOO0FBRE0sS0FFTDJCLE1BRkssQ0FFRSxDQUFDLEdBQUdFLENBQUgsQ0FBRCxLQUFXOUIsTUFBTSxDQUFDOEIsQ0FBRCxDQUZuQixFQUdOO0FBSE0sS0FJTDVDLEdBSkssQ0FJRCxDQUFDLENBQUM2QyxDQUFELEVBQUlELENBQUosQ0FBRCxLQUFhLEdBQUVDLENBQUUsS0FBSUQsQ0FBRSxFQUp0QixFQUtMVCxJQUxLLENBS0EsSUFMQSxDQUFSLENBUG1CLENBY3JCOztBQUNBLFFBQUlRLEdBQUcsS0FBSyxPQUFSLElBQW1CWixLQUFLLENBQUNlLE9BQU4sQ0FBYy9CLEtBQWQsQ0FBdkIsRUFBNkNBLEtBQUssR0FBR0EsS0FBSyxDQUFDb0IsSUFBTixDQUFXLEdBQVgsQ0FBUjtBQUU3QyxXQUFRLEdBQUVRLEdBQUksS0FBSTVCLEtBQU0sR0FBeEI7QUFDRCxHQXBCZ0IsRUFxQmhCb0IsSUFyQmdCLENBcUJYLEdBckJXLENBQW5CO0FBdUJBLFFBQU1ZLE9BQU8sR0FBR2hELFFBQVEsQ0FBQ0MsR0FBVCxDQUFjZ0QsS0FBRCxJQUFXQSxLQUFLLENBQUNDLFFBQU4sRUFBeEIsRUFBMENkLElBQTFDLENBQStDLEVBQS9DLENBQWhCO0FBRUEsU0FBUSxJQUFHRyxHQUFJLElBQUdDLFVBQVcsSUFBR1EsT0FBUSxLQUFJVCxHQUFJLEdBQWhEO0FBQ0Q7QUFFRDs7Ozs7OztBQUtBLFNBQVNZLE1BQVQsQ0FDRVosR0FERixFQUVFaEQsS0FGRixFQUV5QztBQUN2Q1MsUUFIRixFQUk4QjtBQUM1Qk4sU0FBTyxDQUFDQyxHQUFSLENBQVksVUFBWixFQUF3QjtBQUFFNEMsT0FBRjtBQUFPaEQsU0FBUDtBQUFjUztBQUFkLEdBQXhCLEVBRDRCLENBRzVCOztBQUNBLE1BQUksQ0FBQ3VDLEdBQUwsRUFBVTtBQUNSLFVBQU1hLFNBQVMsR0FBR3BELFFBQVEsQ0FDdkJHLElBRGUsR0FDUjtBQURRLEtBRWZGLEdBRmUsQ0FFVm9ELElBQUQsSUFBVUEsSUFBSSxDQUFDRixNQUFMLEVBRkMsQ0FBbEI7QUFJQSxVQUFNRyxnQkFBZ0IsR0FBR2pDLFFBQVEsQ0FBQ2tDLHNCQUFULEVBQXpCO0FBRUFELG9CQUFnQixDQUFDRSxNQUFqQixDQUF3QixHQUFHSixTQUEzQjtBQUNBLFdBQU8sQ0FBQ0UsZ0JBQUQsRUFBbUIsRUFBbkIsQ0FBUDtBQUNELEdBYjJCLENBZTVCOzs7QUFDQSxNQUFJLE9BQU9mLEdBQVAsS0FBZSxVQUFuQixFQUErQjtBQUM3QjdDLFdBQU8sQ0FBQytELEtBQVIsQ0FBYyxvQ0FBZCxFQUQ2QixDQUU3QjtBQUNBOztBQUNBLFFBQUlDLE1BQU0sR0FBR25CLEdBQUcsQ0FBQ2hELEtBQUQsQ0FBaEI7QUFFQSxRQUFJb0UsUUFBNEIsR0FBRyxFQUFuQzs7QUFFQSxRQUFJRCxNQUFNLFlBQVlFLEtBQXRCLEVBQTZCO0FBQzNCRCxjQUFRLEdBQUcsQ0FBQ0QsTUFBRCxDQUFYO0FBQ0FBLFlBQU0sR0FBSUEsTUFBRCxDQUE2QlAsTUFBN0IsRUFBVDtBQUNBVixZQUFNLENBQUNDLE9BQVAsQ0FBZW5ELEtBQWYsRUFBc0JzRSxPQUF0QixDQUE4QixDQUFDLENBQUNqQixHQUFELEVBQU01QixLQUFOLENBQUQsS0FBa0I7QUFDOUMsWUFDRTRCLEdBQUcsQ0FBQ2tCLFVBQUosQ0FBZSxLQUFmLE1BQ0MsT0FBTzlDLEtBQVAsS0FBaUIsVUFBakIsSUFBK0IsT0FBT0EsS0FBUCxLQUFpQixRQURqRCxDQURGLEVBR0U7QUFDQTtBQUNBLGdCQUFNK0MsS0FBSyxHQUFHbkIsR0FBRyxDQUFDb0IsT0FBSixDQUFZLE1BQVosRUFBb0IsRUFBcEIsQ0FBZDtBQUVBTixnQkFBTSxDQUFDTyxnQkFBUCxDQUNFRixLQURGLEVBRUUvQyxLQUZGO0FBSUQ7QUFDRixPQWJEO0FBY0Q7O0FBRUQsV0FBTyxDQUFDMEMsTUFBRCxFQUFTQyxRQUFULENBQVA7QUFDRDs7QUFFRGpFLFNBQU8sQ0FBQ0MsR0FBUixDQUFZLFFBQVosRUFBc0I7QUFBRUo7QUFBRixHQUF0QjtBQUVBLFFBQU07QUFBRTJFLE9BQUY7QUFBTyxPQUFHQztBQUFWLE1BQW9CNUUsS0FBMUIsQ0FoRDRCLENBa0Q1Qjs7QUFDQSxNQUFJNkUsYUFBYSxHQUFHLEtBQXBCLENBbkQ0QixDQXFENUI7QUFDQTs7QUFDQSxNQUFJLENBQUN0RCxVQUFELElBQWV5QixHQUFHLEtBQUssS0FBM0IsRUFBa0M7QUFDaEN6QixjQUFVLEdBQUcsSUFBYjtBQUNBc0QsaUJBQWEsR0FBRyxJQUFoQjtBQUNELEdBMUQyQixDQTRENUI7OztBQUNBLFFBQU12RSxJQUFJLEdBQUdpQixVQUFVLEdBQ25CTyxRQUFRLENBQUNnRCxlQUFULENBQXlCLDRCQUF6QixFQUF1RDlCLEdBQXZELENBRG1CLEdBRW5CbEIsUUFBUSxDQUFDQyxhQUFULENBQXVCaUIsR0FBdkIsQ0FGSixDQTdENEIsQ0FpRTVCOztBQUNBLE1BQUksT0FBTzJCLEdBQVAsS0FBZSxVQUFuQixFQUErQjtBQUM3QnhFLFdBQU8sQ0FBQ0MsR0FBUixDQUFZLGNBQVo7QUFFQVAsY0FBVSxDQUFDa0YsSUFBWCxDQUFnQixNQUFNSixHQUFHLENBQUNyRSxJQUFELENBQXpCO0FBQ0Q7O0FBRUQ0QyxRQUFNLENBQUNDLE9BQVAsQ0FBZXlCLEtBQWYsRUFDR3hCLE1BREgsQ0FDVSxDQUFDLENBQUM0QixJQUFELEVBQU92RCxLQUFQLENBQUQsS0FBbUJELE1BQU0sQ0FBQ0MsS0FBRCxDQURuQyxFQUVHNkMsT0FGSCxDQUVXLENBQUMsQ0FBQ2pCLEdBQUQsRUFBTTVCLEtBQU4sQ0FBRCxLQUFrQjtBQUN6QjtBQUNBO0FBQ0EsUUFBSTRCLEdBQUcsS0FBSyxPQUFSLElBQW1CLE9BQU81QixLQUFQLEtBQWlCLFFBQXhDLEVBQ0VBLEtBQUssR0FBR3lCLE1BQU0sQ0FBQ0MsT0FBUCxDQUFlMUIsS0FBZixFQUNMMkIsTUFESyxDQUNFLENBQUMsR0FBR0UsQ0FBSCxDQUFELEtBQVc5QixNQUFNLENBQUM4QixDQUFELENBRG5CLEVBRUw1QyxHQUZLLENBRUQsQ0FBQyxDQUFDNkMsQ0FBRCxFQUFJRCxDQUFKLENBQUQsS0FBYSxHQUFFQyxDQUFFLEtBQUlELENBQUUsRUFGdEIsRUFHTFQsSUFISyxDQUdBLElBSEEsQ0FBUixDQUp1QixDQVN6Qjs7QUFDQSxRQUFJUSxHQUFHLEtBQUssT0FBUixJQUFtQlosS0FBSyxDQUFDZSxPQUFOLENBQWMvQixLQUFkLENBQXZCLEVBQTZDQSxLQUFLLEdBQUdBLEtBQUssQ0FBQ29CLElBQU4sQ0FBVyxHQUFYLENBQVI7QUFFN0MsUUFBSXBCLEtBQUssS0FBSyxJQUFkLEVBQW9CbkIsSUFBSSxDQUFDMkUsWUFBTCxDQUFrQjVCLEdBQWxCLEVBQXVCLEVBQXZCLEVBQXBCLEtBQ0ssSUFBSSxPQUFPNUIsS0FBUCxLQUFpQixRQUFqQixJQUE2QixPQUFPQSxLQUFQLEtBQWlCLFFBQWxELEVBQ0huQixJQUFJLENBQUMyRSxZQUFMLENBQWtCNUIsR0FBbEIsRUFBdUI2QixNQUFNLENBQUN6RCxLQUFELENBQTdCLEVBREcsQ0FFTDtBQUZLLFNBR0EsSUFDSDRCLEdBQUcsQ0FBQ2tCLFVBQUosQ0FBZSxLQUFmLE1BQ0MsT0FBTzlDLEtBQVAsS0FBaUIsVUFBakIsSUFBK0IsT0FBT0EsS0FBUCxLQUFpQixRQURqRCxDQURHLEVBR0g7QUFDQTtBQUNBLGNBQU0rQyxLQUFLLEdBQUduQixHQUFHLENBQUNvQixPQUFKLENBQVksTUFBWixFQUFvQixFQUFwQixDQUFkO0FBRUFuRSxZQUFJLENBQUNvRSxnQkFBTCxDQUNFRixLQURGLEVBRUUvQyxLQUZGO0FBSUQsT0FYSSxDQVlMO0FBWkssV0FhQW5CLElBQUksQ0FBQytDLEdBQUQsQ0FBSixHQUFZNUIsS0FBWjtBQUNOLEdBaENILEVBeEU0QixDQTBHNUI7O0FBQ0EsUUFBTTBELGFBQWEsR0FBRzFFLFFBQVEsQ0FBQzJDLE1BQVQsQ0FBaUJNLEtBQUQsSUFBV0EsS0FBSyxZQUFZVyxLQUE1QyxDQUF0QjtBQUVBbEUsU0FBTyxDQUFDQyxHQUFSLENBQVk7QUFBRUs7QUFBRixHQUFaO0FBRUFILE1BQUksQ0FBQzJELE1BQUwsQ0FDRSxHQUFHeEQsUUFBUSxDQUNUO0FBRFMsR0FFUkMsR0FGQSxDQUVLZ0QsS0FBRCxJQUFXQSxLQUFLLENBQUNFLE1BQU4sRUFGZixDQURMLEVBL0c0QixDQXFINUI7O0FBQ0EsTUFBSWlCLGFBQUosRUFBbUJ0RCxVQUFVLEdBQUcsS0FBYjtBQUVuQixTQUFPLENBQUNqQixJQUFELEVBQU82RSxhQUFQLENBQVA7QUFDRDs7QUFFRCxTQUFTQyxhQUFULENBQXVCQyxPQUF2QixFQUFnRDtBQUM5QyxRQUFNLENBQUNoRixNQUFELEVBQVNlLFdBQVQsSUFBd0JOLHVCQUF1QixDQUFDdUUsT0FBRCxDQUFyRDtBQUNBbEYsU0FBTyxDQUFDQyxHQUFSLENBQVksZUFBWixFQUE2QjtBQUFFaUYsV0FBRjtBQUFXaEYsVUFBWDtBQUFtQmU7QUFBbkIsR0FBN0I7QUFDQWYsUUFBTSxDQUFDaUYsWUFBUCxDQUFvQkQsT0FBTyxDQUFDekIsTUFBUixFQUFwQixFQUFzQ3hDLFdBQXRDO0FBQ0Q7O0FBRUQsU0FBU21FLG9CQUFULENBQ0VDLE9BREYsRUFFRUgsT0FGRixFQUdFO0FBQ0FHLFNBQU8sQ0FBQy9FLFFBQVIsQ0FBaUI2RCxPQUFqQixDQUF5QixDQUFDbUIsUUFBRCxFQUFXQyxFQUFYLEtBQWtCO0FBQ3pDLFVBQU1DLFFBQVEsR0FBR04sT0FBTyxDQUFDNUUsUUFBUixDQUFpQmlGLEVBQWpCLENBQWpCLENBRHlDLENBRXpDOztBQUNBLFFBQUksQ0FBQ0MsUUFBTCxFQUFlRixRQUFRLENBQUNHLGFBQVQsR0FBZixDQUNBO0FBREEsU0FFSyxJQUFJRCxRQUFRLENBQUNFLElBQVQsS0FBa0JKLFFBQVEsQ0FBQ0ksSUFBL0IsRUFBcUNKLFFBQVEsQ0FBQ0ssWUFBVCxDQUFzQkgsUUFBdEIsRUFBckMsQ0FDTDtBQURLLFdBRUE7QUFDSHhGLGlCQUFPLENBQUNDLEdBQVIsQ0FBWSxtQkFBWixFQUFpQztBQUFFcUYsb0JBQUY7QUFBWUU7QUFBWixXQUFqQztBQUVBRixrQkFBUSxDQUFDRyxhQUFUO0FBQ0FSLHVCQUFhLENBQUNPLFFBQUQsQ0FBYjtBQUNEO0FBQ0YsR0FiRCxFQURBLENBZ0JBOztBQUNBLFFBQU1JLFFBQVEsR0FBR1YsT0FBTyxDQUFDNUUsUUFBUixDQUFpQnVGLEtBQWpCLENBQXVCUixPQUFPLENBQUMvRSxRQUFSLENBQWlCd0YsTUFBeEMsQ0FBakI7O0FBQ0EsTUFBSUYsUUFBUSxDQUFDRSxNQUFiLEVBQXFCO0FBQ25CLFVBQU1sQyxnQkFBZ0IsR0FBR2pDLFFBQVEsQ0FBQ2tDLHNCQUFULEVBQXpCO0FBQ0ErQixZQUFRLENBQUN6QixPQUFULENBQWtCUixJQUFELElBQVVDLGdCQUFnQixDQUFDRSxNQUFqQixDQUF3QkgsSUFBSSxDQUFDRixNQUFMLEVBQXhCLENBQTNCO0FBRUEsVUFBTSxDQUFDdkQsTUFBRCxFQUFTZSxXQUFULElBQXdCTix1QkFBdUIsQ0FBQ2lGLFFBQVEsQ0FBQyxDQUFELENBQVQsQ0FBckQ7QUFDQTFGLFVBQU0sQ0FBQ2lGLFlBQVAsQ0FBb0J2QixnQkFBcEIsRUFBc0MzQyxXQUF0QztBQUNEO0FBQ0Y7O0FBRUQsTUFBTWlELEtBQU4sQ0FBWTs7QUFhWixNQUFNNkIsWUFBTixTQUEyQjdCLEtBQTNCLENBQTJEO0FBTXpEdEUsYUFBVyxDQUNEaUQsR0FEQyxFQUVEaEQsS0FGQyxFQUdUUyxRQUhTLEVBSVQ7QUFDQTtBQURBLFNBSFF1QyxHQUdSLEdBSFFBLEdBR1I7QUFBQSxTQUZRaEQsS0FFUixHQUZRQSxLQUVSO0FBQUEsU0FURjZGLElBU0UsR0FUSyxTQVNMO0FBQUEsU0FSRnZGLElBUUUsR0FSSyxJQVFMO0FBQUEsU0FQRkcsUUFPRTtBQUFBLFNBTkZKLE1BTUUsR0FOdUIsSUFNdkI7QUFFQSxTQUFLSSxRQUFMLEdBQWdCQSxRQUFRLENBQUNDLEdBQVQsQ0FBY2dELEtBQUQsSUFBVztBQUN0QyxVQUFJakIsS0FBSyxDQUFDZSxPQUFOLENBQWNFLEtBQWQsQ0FBSixFQUEwQixPQUFPLElBQUl5QyxhQUFKLENBQWtCekMsS0FBbEIsQ0FBUDs7QUFDMUIsVUFBSUEsS0FBSyxZQUFZVyxLQUFyQixFQUE0QjtBQUMxQixlQUFPWCxLQUFQO0FBQ0Q7O0FBQ0QsVUFBSUEsS0FBSyxZQUFZMEMsSUFBckIsRUFBMkI7QUFDekIsZUFBTyxJQUFJQyxhQUFKLENBQWtCM0MsS0FBbEIsQ0FBUDtBQUNEOztBQUNELFVBQUksQ0FBQ2xDLE1BQU0sQ0FBQ2tDLEtBQUQsQ0FBWCxFQUFvQjtBQUNsQixlQUFPLElBQUk0QyxTQUFKLEVBQVA7QUFDRDs7QUFFRCxhQUFPLElBQUlDLFNBQUosQ0FBYzdDLEtBQWQsQ0FBUDtBQUNELEtBYmUsQ0FBaEI7QUFjQSxTQUFLakQsUUFBTCxDQUFjNkQsT0FBZCxDQUF1QlosS0FBRCxJQUFZQSxLQUFLLENBQUNyRCxNQUFOLEdBQWUsSUFBakQ7QUFDRDs7QUFDRHNELFVBQVEsR0FBRztBQUNULFdBQU9aLFlBQVksQ0FBQyxLQUFLQyxHQUFOLEVBQVcsS0FBS2hELEtBQWhCLEVBQXVCLEtBQUtTLFFBQTVCLENBQW5CO0FBQ0Q7O0FBQ0RtRCxRQUFNLEdBQUc7QUFDUCxVQUFNdEQsSUFBSSxHQUFHc0QsTUFBTSxDQUFDLEtBQUtaLEdBQU4sRUFBVyxLQUFLaEQsS0FBaEIsRUFBdUIsS0FBS1MsUUFBNUIsQ0FBTixDQUE0QyxDQUE1QyxDQUFiO0FBQ0EsU0FBS0gsSUFBTCxHQUFZQSxJQUFaO0FBQ0EsV0FBT0EsSUFBUDtBQUNEOztBQUNEc0YsZUFBYSxHQUFHO0FBQ2QsU0FBS3RGLElBQUwsQ0FBVWtHLGFBQVYsQ0FBd0JDLFdBQXhCLENBQW9DLEtBQUtuRyxJQUF6QztBQUNEOztBQUNEd0YsY0FBWSxDQUFDVCxPQUFELEVBQXdCO0FBQ2xDLFFBQUlBLE9BQU8sQ0FBQ3JDLEdBQVIsS0FBZ0IsS0FBS0EsR0FBekIsRUFBOEI7QUFDNUJxQyxhQUFPLENBQUMvRSxJQUFSLEdBQWUsS0FBS0EsSUFBcEIsQ0FENEIsQ0FFNUI7QUFDQTs7QUFDQTRDLFlBQU0sQ0FBQ0MsT0FBUCxDQUFla0MsT0FBTyxDQUFDckYsS0FBdkIsRUFDR29ELE1BREgsQ0FDVSxDQUFDLENBQUNHLENBQUQsRUFBSUQsQ0FBSixDQUFELEtBQVksS0FBS3RELEtBQUwsQ0FBV3VELENBQVgsTUFBa0JELENBRHhDLEVBRUdnQixPQUZILENBRVcsQ0FBQyxDQUFDakIsR0FBRCxFQUFNNUIsS0FBTixDQUFELEtBQWtCO0FBQ3pCLFlBQUlBLEtBQUssS0FBSyxJQUFkLEVBQW9CNEQsT0FBTyxDQUFDL0UsSUFBUixDQUFhMkUsWUFBYixDQUEwQjVCLEdBQTFCLEVBQStCLEVBQS9CLEVBQXBCLEtBQ0ssSUFBSTVCLEtBQUssS0FBSyxJQUFWLElBQWtCQSxLQUFLLEtBQUtDLFNBQTVCLElBQXlDRCxLQUFLLEtBQUssS0FBdkQsRUFDSDRELE9BQU8sQ0FBQy9FLElBQVIsQ0FBYW9HLGVBQWIsQ0FBNkJyRCxHQUE3QixFQURHLEtBRUFnQyxPQUFPLENBQUMvRSxJQUFSLENBQWEyRSxZQUFiLENBQTBCNUIsR0FBMUIsRUFBK0I1QixLQUEvQjtBQUNOLE9BUEgsRUFKNEIsQ0FhNUI7O0FBQ0F5QixZQUFNLENBQUNDLE9BQVAsQ0FBZSxLQUFLbkQsS0FBcEIsRUFDR29ELE1BREgsQ0FDVSxDQUFDLENBQUNHLENBQUQsRUFBSUQsQ0FBSixDQUFELEtBQVksQ0FBQytCLE9BQU8sQ0FBQ3JGLEtBQVIsQ0FBYzJHLGNBQWQsQ0FBNkJwRCxDQUE3QixDQUR2QixFQUVHZSxPQUZILENBRVcsQ0FBQyxDQUFDakIsR0FBRCxFQUFNNUIsS0FBTixDQUFELEtBQWtCO0FBQ3pCLGFBQUtuQixJQUFMLENBQVVvRyxlQUFWLENBQTBCckQsR0FBMUI7QUFDRCxPQUpILEVBZDRCLENBb0I1QjtBQUNBOztBQUNBa0MsMEJBQW9CLENBQUMsSUFBRCxFQUFPRixPQUFQLENBQXBCO0FBQ0QsS0F2QkQsQ0F3QkE7QUF4QkEsU0F5Qks7QUFDSCxhQUFLL0UsSUFBTCxDQUFVc0csV0FBVixDQUFzQnZCLE9BQU8sQ0FBQ3pCLE1BQVIsRUFBdEI7QUFDRDtBQUNGOztBQXBFd0Q7O0FBdUUzRCxNQUFNdUMsYUFBTixTQUE0QjlCLEtBQTVCLENBQTREO0FBSTFEdEUsYUFBVyxDQUNUVSxRQURTLEVBSVQ7QUFDQTtBQURBLFNBUEZvRixJQU9FLEdBUEssVUFPTDtBQUFBLFNBTkZwRixRQU1FO0FBR0EsU0FBS0EsUUFBTCxHQUFnQkEsUUFBUSxDQUFDQyxHQUFULENBQWNnRCxLQUFELElBQVc7QUFDdEMsVUFBSWpCLEtBQUssQ0FBQ2UsT0FBTixDQUFjRSxLQUFkLENBQUosRUFBMEIsT0FBTyxJQUFJeUMsYUFBSixDQUFrQnpDLEtBQWxCLENBQVA7QUFDMUIsVUFBSUEsS0FBSyxZQUFZVyxLQUFyQixFQUE0QixPQUFPWCxLQUFQO0FBQzVCLFVBQUlBLEtBQUssWUFBWTBDLElBQXJCLEVBQTJCLE9BQU8sSUFBSUMsYUFBSixDQUFrQjNDLEtBQWxCLENBQVA7QUFDM0IsVUFBSSxDQUFDbEMsTUFBTSxDQUFDa0MsS0FBRCxDQUFYLEVBQW9CLE9BQU8sSUFBSTRDLFNBQUosRUFBUDtBQUNwQixhQUFPLElBQUlDLFNBQUosQ0FBYzdDLEtBQWQsQ0FBUDtBQUNELEtBTmUsQ0FBaEI7QUFRQSxTQUFLakQsUUFBTCxDQUFjNkQsT0FBZCxDQUF1QlosS0FBRCxJQUFZQSxLQUFLLENBQUNyRCxNQUFOLEdBQWUsSUFBakQ7QUFDRDs7QUFFRHVELFFBQU0sR0FBRztBQUNQLFVBQU10RCxJQUFJLEdBQUdzRCxNQUFNLENBQUNsQyxTQUFELEVBQVksRUFBWixFQUFnQixLQUFLakIsUUFBckIsQ0FBTixDQUFxQyxDQUFyQyxDQUFiO0FBQ0FOLFdBQU8sQ0FBQ0MsR0FBUixDQUFZO0FBQUVFO0FBQUYsS0FBWjtBQUVBLFdBQU9BLElBQVA7QUFDRDs7QUFFRHFELFVBQVEsR0FBRztBQUNULFdBQU8sS0FBS2xELFFBQUwsQ0FBY0MsR0FBZCxDQUFtQmdELEtBQUQsSUFBV0EsS0FBSyxDQUFDQyxRQUFOLEVBQTdCLEVBQStDZCxJQUEvQyxDQUFvRCxFQUFwRCxDQUFQO0FBQ0QsR0EvQnlELENBaUMxRDs7O0FBQ0FpRCxjQUFZLENBQUNlLFFBQUQsRUFBMEI7QUFDcEMsV0FBT3RCLG9CQUFvQixDQUFDLElBQUQsRUFBT3NCLFFBQVAsQ0FBM0I7QUFDRDs7QUFFRGpCLGVBQWEsR0FBRztBQUNkLFNBQUtuRixRQUFMLENBQWM2RCxPQUFkLENBQXVCWixLQUFELElBQVdBLEtBQUssQ0FBQ2tDLGFBQU4sRUFBakM7QUFDRDs7QUF4Q3lEOztBQTJDNUQsTUFBTVcsU0FBTixTQUF3QmxDLEtBQXhCLENBQXdEO0FBT3REOzs7QUFHQXRFLGFBQVcsQ0FBQzBELE9BQUQsRUFBcUM7QUFDOUM7QUFEOEMsU0FUaERvQyxJQVNnRCxHQVR6QyxVQVN5QztBQUFBLFNBUmhEcEYsUUFRZ0QsR0FSckMsRUFRcUM7QUFBQSxTQVBoREgsSUFPZ0QsR0FQbkMsSUFPbUM7QUFBQSxTQU5oRE4sS0FNZ0Q7QUFBQSxTQUxoREssTUFLZ0QsR0FMdkIsSUFLdUI7QUFFOUMsU0FBS0wsS0FBTCxHQUFhO0FBQUV5RDtBQUFGLEtBQWIsQ0FGOEMsQ0FFcEI7QUFDM0I7O0FBRURHLFFBQU0sR0FBRztBQUNQLFVBQU1rRCxRQUFRLEdBQUdoRixRQUFRLENBQUNpRixjQUFULENBQXdCLEtBQUsvRyxLQUFMLENBQVd5RCxPQUFuQyxDQUFqQjtBQUNBLFNBQUtuRCxJQUFMLEdBQVl3RyxRQUFaO0FBQ0EsV0FBT0EsUUFBUDtBQUNEOztBQUVEbkQsVUFBUSxHQUFHO0FBQ1QsV0FBT2hDLFFBQVEsQ0FBQyxLQUFLM0IsS0FBTCxDQUFXeUQsT0FBWixDQUFmO0FBQ0Q7O0FBRURxQyxjQUFZLENBQUNULE9BQUQsRUFBcUI7QUFDL0IsU0FBSy9FLElBQUwsQ0FBVTBHLFNBQVYsR0FBc0IzQixPQUFPLENBQUNyRixLQUFSLENBQWN5RCxPQUFwQztBQUNBNEIsV0FBTyxDQUFDL0UsSUFBUixHQUFlLEtBQUtBLElBQXBCO0FBQ0Q7O0FBRURzRixlQUFhLEdBQUc7QUFDZCxTQUFLdEYsSUFBTCxDQUFVa0csYUFBVixDQUF5QkMsV0FBekIsQ0FBcUMsS0FBS25HLElBQTFDO0FBQ0Q7O0FBaENxRDs7QUFtQ3hELE1BQU1nRyxTQUFOLFNBQXdCakMsS0FBeEIsQ0FBd0Q7QUFJdEQ7OztBQUdBdEUsYUFBVyxHQUFHO0FBQ1o7QUFEWSxTQU5kOEYsSUFNYyxHQU5QLE1BTU87QUFBQSxTQUxkcEYsUUFLYyxHQUxILEVBS0c7QUFBQSxTQUpkSixNQUljLEdBSlcsSUFJWDtBQUViOztBQUVEdUQsUUFBTSxHQUFHO0FBQ1A7QUFDQSxXQUFPOUIsUUFBUSxDQUFDa0Msc0JBQVQsRUFBUDtBQUNEOztBQUVEOEIsY0FBWSxDQUFDbUIsUUFBRCxFQUFzQjtBQUNoQztBQUNEOztBQUVEckIsZUFBYSxHQUFHO0FBQ2Q7QUFDRDs7QUFFRGpDLFVBQVEsR0FBRztBQUNULFdBQU8sRUFBUDtBQUNEOztBQTFCcUQ7O0FBNkJ4RCxNQUFNMEMsYUFBTixTQUE0QmhDLEtBQTVCLENBQTREO0FBTTFEOzs7QUFHQXRFLGFBQVcsQ0FBQ08sSUFBRCxFQUFrQjtBQUMzQjtBQUQyQixTQVI3QnVGLElBUTZCLEdBUnRCLE1BUXNCO0FBQUEsU0FQN0JwRixRQU82QixHQVBsQixFQU9rQjtBQUFBLFNBTjdCSixNQU02QixHQU5KLElBTUk7QUFBQSxTQUw3QkMsSUFLNkI7QUFFM0IsU0FBS0EsSUFBTCxHQUFZQSxJQUFaO0FBQ0Q7O0FBRURzRCxRQUFNLEdBQUc7QUFDUCxXQUFPLEtBQUt0RCxJQUFaO0FBQ0Q7O0FBRUR3RixjQUFZLENBQUNULE9BQUQsRUFBeUI7QUFDbkMsUUFBSUEsT0FBTyxDQUFDL0UsSUFBUixLQUFpQixLQUFLQSxJQUExQixFQUFnQztBQUM5QixXQUFLQSxJQUFMLENBQVVzRyxXQUFWLENBQXNCdkIsT0FBTyxDQUFDL0UsSUFBOUI7QUFDRDtBQUNGOztBQUVEc0YsZUFBYSxHQUFHO0FBQ2QsU0FBS3RGLElBQUwsQ0FBVWtHLGFBQVYsQ0FBeUJDLFdBQXpCLENBQXFDLEtBQUtuRyxJQUExQztBQUNEOztBQUVEcUQsVUFBUSxHQUFHO0FBQ1QsV0FBT3pCLFlBQVksQ0FBQyxLQUFLNUIsSUFBTixDQUFuQjtBQUNEOztBQTlCeUQ7O0FBaUM1RCxNQUFNNEcsU0FBTixTQUF3QjdDLEtBQXhCLENBQXdEO0FBS3REOzs7QUFHQXRFLGFBQVcsQ0FBQzBELE9BQUQsRUFBVTBELE9BQVYsRUFBNEI7QUFDckM7QUFEcUMsU0FQdkN0QixJQU91QyxHQVBoQyxNQU9nQztBQUFBLFNBTnZDeEYsTUFNdUMsR0FOOUIsSUFNOEI7QUFBQSxTQUx2Q0MsSUFLdUM7QUFBQSxTQUp2Q0csUUFJdUM7QUFFckNnRCxXQUFPLENBQUNwRCxNQUFSLEdBQWlCLElBQWpCO0FBQ0EsU0FBS0ksUUFBTCxHQUFnQixDQUFDZ0QsT0FBRCxDQUFoQjtBQUNBLFNBQUtuRCxJQUFMLEdBQVk2RyxPQUFaO0FBQ0Q7O0FBRUR2RCxRQUFNLEdBQUc7QUFDUCxXQUFPLEtBQUtuRCxRQUFMLENBQWMsQ0FBZCxFQUFpQm1ELE1BQWpCLEVBQVA7QUFDRDs7QUFDREQsVUFBUSxHQUFHO0FBQ1QsV0FBTyxLQUFLbEQsUUFBTCxDQUFjLENBQWQsRUFBaUJrRCxRQUFqQixFQUFQO0FBQ0Q7O0FBRURtQyxjQUFZLENBQUNlLFFBQUQsRUFBMkI7QUFDckN0Qix3QkFBb0IsQ0FBQyxJQUFELEVBQU9zQixRQUFQLENBQXBCO0FBQ0Q7O0FBRURqQixlQUFhLEdBQUc7QUFDZCxTQUFLdEYsSUFBTCxDQUFVOEcsTUFBVjtBQUNEOztBQTVCcUQ7O0FBK0J4RCxTQUFTQyxPQUFULENBQ0VyRSxHQURGLEVBRUVoRCxLQUZGLEVBR2tCO0FBQ2hCRyxTQUFPLENBQUNDLEdBQVIsQ0FBWSxVQUFaLEVBQXdCO0FBQUU0QyxPQUFGO0FBQU9oRDtBQUFQLEdBQXhCOztBQUVBLE1BQUksT0FBT2dELEdBQVAsS0FBZSxVQUFuQixFQUErQjtBQUM3QixRQUFJbUIsTUFBTSxHQUFHbkIsR0FBRyxDQUFDaEQsS0FBRCxDQUFoQjs7QUFDQSxRQUFJbUUsTUFBTSxZQUFZRSxLQUF0QixFQUE2QjtBQUMzQjtBQUNBLGFBQU9GLE1BQVA7QUFDRDs7QUFDRCxRQUFJQSxNQUFNLFlBQVlpQyxJQUF0QixFQUE0QjtBQUMxQixhQUFPLElBQUlDLGFBQUosQ0FBa0JsQyxNQUFsQixDQUFQO0FBQ0QsS0FSNEIsQ0FTN0I7OztBQUNBLFFBQUksQ0FBQzNDLE1BQU0sQ0FBQzJDLE1BQUQsQ0FBWCxFQUFxQjtBQUNuQixhQUFPLElBQUltQyxTQUFKLEVBQVA7QUFDRDs7QUFFRCxXQUFPLElBQUlDLFNBQUosQ0FBY3BDLE1BQWQsQ0FBUDtBQUNEOztBQUVELFFBQU07QUFBRTFELFlBQUY7QUFBWSxPQUFHNkc7QUFBZixNQUF3QnRILEtBQTlCOztBQUNBLE1BQUlnRCxHQUFKLEVBQVM7QUFDUCxXQUFPLElBQUlrRCxZQUFKLENBQWlCbEQsR0FBakIsRUFBc0JzRSxJQUF0QixFQUE0QjdHLFFBQTVCLENBQVAsQ0FETyxDQUN1QztBQUMvQyxHQUZELE1BRU8sSUFBSSxDQUFDZSxNQUFNLENBQUM4RixJQUFELENBQVgsRUFBbUI7QUFDeEIsVUFBTXBILEtBQUssR0FBRyxJQUFJb0csU0FBSixFQUFkO0FBQ0FwRyxTQUFLLENBQUNHLE1BQU4sR0FBZSxJQUFmO0FBQ0EsV0FBT0gsS0FBUDtBQUNELEdBSk0sTUFJQSxJQUFJTyxRQUFKLEVBQWM7QUFDbkIsV0FBTyxJQUFJMEYsYUFBSixDQUFrQjFGLFFBQWxCLENBQVA7QUFDRCxHQTdCZSxDQStCaEI7O0FBQ0Q7QUFFRDs7Ozs7Ozs7O0FBT08sU0FBUzhHLElBQVQsQ0FDTHZFLEdBREssRUFFTGhELEtBRkssRUFHYTtBQUNsQkEsT0FBSyxDQUFDUyxRQUFOLEdBQWlCVCxLQUFLLENBQUNTLFFBQU4sQ0FBZUcsSUFBZixFQUFqQixDQURrQixDQUNzQjtBQUV4Qzs7QUFDQTs7OztBQUlBLFNBQU95RyxPQUFPLENBQUNyRSxHQUFELEVBQU1oRCxLQUFOLENBQWQ7QUFDRDtBQUVEOzs7Ozs7O0FBTU8sU0FBU3dILFFBQVQsQ0FBa0J4SCxLQUFsQixFQUFtQztBQUN4QyxTQUFPcUgsT0FBTyxDQUFDM0YsU0FBRCxFQUFZMUIsS0FBWixDQUFkO0FBQ0QsQyxDQUVEOztBQUNPLFNBQVN5SCxHQUFULENBQ0x6RSxHQURLLEVBRUxoRCxLQUZLLEVBSWE7QUFDbEI7QUFDQUEsT0FBSyxDQUFDUyxRQUFOLEdBQWlCVCxLQUFLLENBQUMyRyxjQUFOLENBQXFCLFVBQXJCLElBQW1DLENBQUMzRyxLQUFLLENBQUNTLFFBQVAsQ0FBbkMsR0FBc0QsRUFBdkU7QUFFQSxTQUFPOEcsSUFBSSxDQUFDdkUsR0FBRCxFQUFPaEQsS0FBUCxDQUFYO0FBQ0Q7QUFFRDs7Ozs7Ozs7QUFPTyxTQUFTMEgsTUFBVCxDQUNMQyxNQURLLEVBQzRDO0FBQ2pEUixPQUZLLEVBR0xsRCxNQUFlLEdBQUcsS0FIYixFQUlMO0FBQ0F4QixPQUFLLENBQUNDLElBQU4sQ0FBV1osUUFBUSxDQUFDOEYsSUFBVCxDQUFjQyxnQkFBZCxDQUErQixHQUEvQixDQUFYLEVBQWdEdkQsT0FBaEQsQ0FDRzFCLEVBQUQsSUFBU0EsRUFBRSxDQUFDa0YsS0FBSCxDQUFTQyxVQUFULEdBQXNCLFNBRGpDO0FBSUEsUUFBTUMsVUFBVSxHQUFHckksY0FBYyxDQUFDc0ksR0FBZixDQUFtQmQsT0FBbkIsQ0FBbkI7QUFDQSxNQUFJLENBQUNsRCxNQUFELElBQVcsQ0FBQytELFVBQWhCLEVBQTRCYixPQUFPLENBQUNsRixTQUFSLEdBQW9CLEVBQXBCOztBQUU1QixNQUFJLE9BQU8wRixNQUFQLEtBQWtCLFFBQXRCLEVBQWdDO0FBQzlCUixXQUFPLENBQUNlLGtCQUFSLENBQTJCLFdBQTNCLEVBQXdDUCxNQUF4QyxFQUQ4QixDQUNtQjtBQUNsRCxHQUZELE1BRU8sSUFBSUEsTUFBTSxZQUFZdkIsSUFBdEIsRUFBNEI7QUFDakNlLFdBQU8sQ0FBQ2dCLHFCQUFSLENBQThCLFdBQTlCLEVBQTJDUixNQUEzQztBQUNELEdBRk0sTUFFQSxJQUFJQSxNQUFNLFlBQVl0RCxLQUF0QixFQUE2QjtBQUNsQzlDLGNBQVUsR0FBRyxLQUFiO0FBRUEsVUFBTTZHLEtBQUssR0FBRyxJQUFJbEIsU0FBSixDQUFjUyxNQUFkLEVBQXNCUixPQUF0QixDQUFkO0FBRUFoSCxXQUFPLENBQUNDLEdBQVIsQ0FBWSxlQUFaLEVBQTZCLFFBQTdCLEVBQXVDZ0ksS0FBdkM7O0FBRUEsUUFBSUosVUFBSixFQUFnQjtBQUNkN0gsYUFBTyxDQUFDQyxHQUFSLENBQVksY0FBWjtBQUNBLFlBQU1pSSxRQUFRLEdBQUcxSSxjQUFjLENBQUMySSxHQUFmLENBQW1CbkIsT0FBbkIsQ0FBakI7QUFFQWhILGFBQU8sQ0FBQ0MsR0FBUixDQUFZLGVBQVosRUFBNkI7QUFBRWlJLGdCQUFGO0FBQVlFLGdCQUFRLEVBQUVIO0FBQXRCLE9BQTdCLEVBSmMsQ0FNZDs7QUFDQUMsY0FBUSxDQUFDdkMsWUFBVCxDQUFzQnNDLEtBQXRCO0FBRUF6SSxvQkFBYyxDQUFDNkksR0FBZixDQUFtQnJCLE9BQW5CLEVBQTRCaUIsS0FBNUI7QUFDRCxLQVZELE1BVU87QUFDTCxZQUFNM0UsT0FBTyxHQUFHMkUsS0FBSyxDQUFDeEUsTUFBTixFQUFoQjtBQUNBdUQsYUFBTyxDQUFDbEQsTUFBUixDQUFlUixPQUFmO0FBQ0Q7O0FBRUQ5RCxrQkFBYyxDQUFDNkksR0FBZixDQUFtQnJCLE9BQW5CLEVBQTRCaUIsS0FBNUI7O0FBRUEsV0FBT3ZJLFVBQVUsQ0FBQ29HLE1BQWxCLEVBQTBCO0FBQ3hCO0FBQ0FwRyxnQkFBVSxDQUFDNEksTUFBWCxDQUFrQixDQUFsQixFQUFxQixDQUFyQixFQUF3QixDQUF4QjtBQUNELEtBM0JpQyxDQTZCbEM7O0FBQ0QsR0E5Qk0sTUE4QkE7QUFDTCxVQUFNLElBQUlDLEtBQUosQ0FBVSw2Q0FBVixDQUFOO0FBQ0Q7QUFDRjtBQUVNLFNBQVNDLE9BQVQsQ0FBaUJsRixPQUFqQixFQUFrRDtBQUFBOztBQUN2RCxTQUFPLGFBQUssY0FBY1ksS0FBZCxDQUE4QztBQVF4RDs7O0FBR0F0RSxlQUFXLENBQUMwRCxPQUFELEVBQWtCO0FBQzNCO0FBRDJCLFdBVjdCcEQsTUFVNkIsR0FWSixJQVVJO0FBQUEsV0FUN0JJLFFBUzZCLEdBVGxCLEVBU2tCO0FBQUEsV0FSN0JvRixJQVE2QixHQVJ0QixTQVFzQjtBQUFBLFdBUDdCbEQsVUFPNkI7QUFBQSxXQU43QmMsT0FNNkI7QUFBQSxXQUw3Qm5ELElBSzZCO0FBRTNCLFdBQUttRCxPQUFMLEdBQWVBLE9BQWY7QUFDRDs7QUFDRG1DLGlCQUFhLEdBQUc7QUFDZCxXQUFLakQsVUFBTCxDQUFnQjJCLE9BQWhCLENBQXlCaEUsSUFBRCxJQUFVQSxJQUFJLENBQUNrRyxhQUFMLENBQW9CQyxXQUFwQixDQUFnQ25HLElBQWhDLENBQWxDO0FBQ0Q7O0FBRUR3RixnQkFBWSxDQUFDVCxPQUFELEVBQTBCO0FBQ3BDLFVBQUtBLE9BQU8sQ0FBQzVCLE9BQVIsR0FBa0IsS0FBS0EsT0FBNUIsRUFBc0M7QUFDcEM0QixlQUFPLENBQUMvRSxJQUFSLEdBQWUsS0FBS0EsSUFBcEI7QUFDQStFLGVBQU8sQ0FBQzFDLFVBQVIsR0FBcUIsS0FBS0EsVUFBMUI7QUFDQTtBQUNEOztBQUNELFdBQUtpRCxhQUFMO0FBQ0FSLG1CQUFhLENBQUNDLE9BQUQsQ0FBYjtBQUNEOztBQUVEMUIsWUFBUSxHQUFHO0FBQ1QsYUFBT0YsT0FBUDtBQUNEOztBQUVERyxVQUFNLEdBQUc7QUFDUCxZQUFNZ0YsUUFBUSxHQUFHOUcsUUFBUSxDQUFDQyxhQUFULENBQXVCLFVBQXZCLENBQWpCO0FBQ0E2RyxjQUFRLENBQUMzRyxTQUFULEdBQXFCLEtBQUt3QixPQUExQjtBQUNBLFlBQU1NLGdCQUFnQixHQUFHNkUsUUFBUSxDQUFDbkYsT0FBbEM7QUFDQSxXQUFLZCxVQUFMLEdBQWtCRixLQUFLLENBQUNDLElBQU4sQ0FBV3FCLGdCQUFnQixDQUFDcEIsVUFBNUIsQ0FBbEIsQ0FKTyxDQU1QO0FBQ0E7QUFDQTs7QUFDQSxVQUFJLEtBQUtBLFVBQUwsQ0FBZ0JzRCxNQUFwQixFQUNFLEtBQUszRixJQUFMLEdBQVksS0FBS3FDLFVBQUwsQ0FBZ0IsS0FBS0EsVUFBTCxDQUFnQnNELE1BQWhCLEdBQXlCLENBQXpDLENBQVo7QUFDRixhQUFPbEMsZ0JBQVA7QUFDRDs7QUFDRHNELFdBQU8sR0FBRztBQUNSLGFBQU8sRUFBUDtBQUNEOztBQUVELEtBQUNoRyxTQUFELElBQWMsQ0FDWjtBQUNEOztBQXBEdUQsR0FBbkQsU0FxREpvQyxPQXJESSxDQUFQO0FBc0RELEMsQ0FFRDtBQUNBO0FBRUE7QUFDQSxrRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzF4QkE7QUFFQSxJQUFNb0YsR0FBRyxHQUFHLDZDQUFaLEMsQ0FBMkQ7O0FBRTNELFNBQVNDLEdBQVQsQ0FBYTlJLEtBQWIsRUFHRztBQUNERyxTQUFPLENBQUNDLEdBQVIsQ0FBWSxTQUFaLEVBQXVCSixLQUFLLENBQUMsVUFBRCxDQUE1QjtBQUNBLFNBQ0U7QUFBRyxPQUFHLEVBQUUsYUFBQzRDLEVBQUQ7QUFBQSxhQUFxQnpDLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLG1CQUFaLEVBQWlDd0MsRUFBakMsQ0FBckI7QUFBQSxLQUFSO0FBQUEsY0FDRzVDLEtBQUssQ0FBQytJO0FBRFQsSUFERjtBQUtEOztBQUVELFNBQVNDLE1BQVQsT0FPRztBQUFBLE1BTkR2SSxRQU1DLFFBTkRBLFFBTUM7QUFBQSxNQUxEd0ksUUFLQyxRQUxEQSxRQUtDO0FBQ0QsU0FDRTtBQUNFLFlBQVEsRUFBRUEsUUFEWjtBQUVFLE9BQUcsRUFBRSxhQUFDckcsRUFBRDtBQUFBLGFBQXFCekMsT0FBTyxDQUFDQyxHQUFSLENBQVksb0JBQVosRUFBa0N3QyxFQUFsQyxDQUFyQjtBQUFBLEtBRlA7QUFBQSxlQUlFO0FBQU0sU0FBRyxFQUFFLGFBQUNBLEVBQUQ7QUFBQSxlQUFxQnpDLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLGVBQVosRUFBNkJ3QyxFQUE3QixDQUFyQjtBQUFBLE9BQVg7QUFBQTtBQUFBLE1BSkYsRUFPR25DLFFBUEgsRUFRRTtBQUFBLGdCQUNFO0FBQU0sV0FBRyxFQUFFLGFBQUNtQyxFQUFEO0FBQUEsaUJBQXFCekMsT0FBTyxDQUFDQyxHQUFSLENBQVksZUFBWixFQUE2QndDLEVBQTdCLENBQXJCO0FBQUEsU0FBWDtBQUFBO0FBQUE7QUFERixNQVJGO0FBQUEsSUFERjtBQWdCRDs7QUFFRCxTQUFTc0csTUFBVCxDQUFnQnRHLEVBQWhCLEVBQWlDO0FBQy9CekMsU0FBTyxDQUFDQyxHQUFSLENBQVksc0JBQVosRUFBb0N3QyxFQUFwQztBQUNEO0FBRUQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQWdEQTs7Ozs7OztBQU1BOzs7Ozs7Ozs7Ozs7QUFXQTs7Ozs7Ozs7Ozs7QUFVQSxTQUFTdUcsSUFBVCxRQUF1QztBQUFBLE1BQXZCQyxJQUF1QixTQUF2QkEsSUFBdUI7QUFDckMsU0FBT0EsSUFBSSxLQUFLLENBQVQsR0FDTDtBQUFBLGVBQ0U7QUFBTSxRQUFFLEVBQUMsT0FBVDtBQUFpQixTQUFHLEVBQUUsSUFBdEI7QUFBQTtBQUFBLE1BREYsRUFJRTtBQUFBO0FBQUEsTUFKRjtBQUFBLElBREssR0FRTDtBQUFBLGNBQ0U7QUFBRyxRQUFFLEVBQUMsT0FBTjtBQUFjLGFBQUssSUFBbkI7QUFBQTtBQUFBO0FBREYsSUFSRjtBQWNEOztBQUVELFNBQVNDLElBQVQsUUFBdUI7QUFBQSxNQUFQQyxHQUFPLFNBQVBBLEdBQU87QUFDckIsTUFBSUEsR0FBRyxLQUFLLENBQVosRUFBZSxPQUFPLElBQVA7QUFDZixTQUNFO0FBQUEsY0FDRTtBQUFBO0FBQUE7QUFERixJQURGO0FBS0Q7O0FBRUQsSUFBTUMsT0FBTyxHQUFHLFNBQVZBLE9BQVUsQ0FBQ0QsR0FBRDtBQUFBLFNBQ2Q7QUFBSyxNQUFFLEVBQUMsT0FBUjtBQUFnQixnQkFBUyxLQUF6QjtBQUErQixnQkFBVUEsR0FBekM7QUFBQSxlQUNFO0FBQUE7QUFBQSxNQURGLEVBRUdBLEdBQUcsS0FBSyxDQUFSLEdBQ0M7QUFBSSxlQUFNLFVBQVY7QUFBQSxpQkFDRTtBQUFBO0FBQUEsUUFERixFQUVFO0FBQUE7QUFBQSxRQUZGO0FBQUEsTUFERCxHQU1DO0FBQUksZUFBTSxVQUFWO0FBQUEsaUJBQ0U7QUFBQTtBQUFBLFFBREYsRUFFRTtBQUFBO0FBQUEsUUFGRixFQUdFO0FBQUE7QUFBQSxRQUhGO0FBQUEsTUFSSixFQWNFO0FBQUE7QUFBQSxNQWRGLEVBZUdBLEdBQUcsS0FBSyxDQUFSLEdBQ0M7QUFBSSxlQUFNLFVBQVY7QUFBQSxpQkFDRTtBQUFBO0FBQUEsUUFERixFQUVFO0FBQUE7QUFBQSxRQUZGLEVBR0U7QUFBQTtBQUFBLFFBSEY7QUFBQSxNQURELEdBT0M7QUFBSSxlQUFNLFVBQVY7QUFBQSxpQkFDRTtBQUFBO0FBQUEsUUFERixFQUVFO0FBQUE7QUFBQSxRQUZGO0FBQUEsTUF0QkosRUEyQkdBLEdBQUcsS0FBSyxDQUFSLEdBQVksSUFBWixHQUFtQjtBQUFBO0FBQUEsTUEzQnRCLEVBNEJFO0FBQUEsZ0JBQ0U7QUFBQTtBQUFBO0FBREYsTUE1QkYsRUErQkUsaUZBQUMsSUFBRDtBQUFNLFVBQUksRUFBRUE7QUFBWixNQS9CRixFQWlDRTtBQUFBO0FBQUEsTUFqQ0YsRUFrQ0U7QUFDRSxhQUFPLEVBQUMsYUFEVjtBQUVFLFdBQUssRUFBQyw0QkFGUjtBQUdFLFlBQU0sRUFBQyxLQUhUO0FBSUUsVUFBSSxFQUFDLE1BSlA7QUFBQSxpQkFNRTtBQUFRLFVBQUUsRUFBQyxJQUFYO0FBQWdCLFVBQUUsRUFBQyxJQUFuQjtBQUF3QixTQUFDLEVBQUM7QUFBMUIsUUFORixFQU9FO0FBQVEsVUFBRSxFQUFDLEtBQVg7QUFBaUIsVUFBRSxFQUFDLElBQXBCO0FBQXlCLFNBQUMsRUFBQztBQUEzQixRQVBGLEVBU0U7QUFBSyxlQUFPLEVBQUMsV0FBYjtBQUF5QixTQUFDLEVBQUMsS0FBM0I7QUFBaUMsYUFBSyxFQUFDLEtBQXZDO0FBQUEsa0JBQ0U7QUFBUSxZQUFFLEVBQUMsR0FBWDtBQUFlLFlBQUUsRUFBQyxHQUFsQjtBQUFzQixXQUFDLEVBQUM7QUFBeEI7QUFERixRQVRGO0FBQUEsTUFsQ0Y7QUFBQSxJQURjO0FBQUEsQ0FBaEI7O0FBbURBLFNBQVNFLE9BQVQsQ0FBaUJGLEdBQWpCLEVBQTJCO0FBQ3pCLFNBQ0U7QUFBSyxNQUFFLEVBQUMsT0FBUjtBQUFBLGVBQ0U7QUFBQSxnQkFDRTtBQUFBLGtCQUNFO0FBQUE7QUFBQTtBQURGO0FBREYsTUFERixFQU1FO0FBQUE7QUFBQSxNQU5GLEVBT0U7QUFBQSxrQ0FBa0JBLEdBQWxCO0FBQUEsTUFQRixFQVFHQSxHQUFHLEtBQUssQ0FBUixHQUFZO0FBQUE7QUFBQSxNQUFaLEdBQTJCLEtBUjlCLEVBU0dBLEdBQUcsS0FBSyxDQUFSLEdBQ0M7QUFBQSxpQkFDRTtBQUFBO0FBQUEsUUFERixFQUVFO0FBQUE7QUFBQSxRQUZGO0FBQUEsTUFERCxHQU1DO0FBQUE7QUFBQSxNQWZKLEVBaUJFLGlGQUFDLElBQUQ7QUFBTSxTQUFHLEVBQUVBO0FBQVgsTUFqQkY7QUFBQSxJQURGO0FBcUJEOztBQUNELFNBQVNHLEVBQVQsR0FBYztBQUNaLFNBQU8sSUFBUDtBQUNEOztBQUVELFNBQVNDLE9BQVQsQ0FBaUJKLEdBQWpCLEVBQTJCO0FBQ3pCLFNBQU9BLEdBQUcsS0FBSyxDQUFSLEdBQ0w7QUFBQSw4QkFDY0EsR0FEZCxFQUVFLGlGQUFDLElBQUQ7QUFBTSxVQUFJLEVBQUVBO0FBQVosTUFGRixFQUdFLGtGQUFDLE1BQUQ7QUFDRSxjQUFRLEVBQUUsSUFEWjtBQUVFLFNBQUcsRUFBRSxhQUFDMUcsRUFBRDtBQUFBLGVBQXFCekMsT0FBTyxDQUFDQyxHQUFSLENBQVksbUJBQVosRUFBaUN3QyxFQUFqQyxDQUFyQjtBQUFBLE9BRlA7QUFBQSx5QkFLRTtBQUNFLFdBQUcsRUFBRSxhQUFDQSxFQUFEO0FBQUEsaUJBQXFCekMsT0FBTyxDQUFDQyxHQUFSLENBQVksd0JBQVosRUFBc0N3QyxFQUF0QyxDQUFyQjtBQUFBLFNBRFA7QUFBQTtBQUFBLFFBTEYsRUFVRTtBQUFBLCtCQUFZMEcsR0FBWjtBQUFBLFFBVkY7QUFBQSxNQUhGLGNBZ0JFO0FBQUEsaUJBQ0U7QUFBQSxrQkFDRTtBQUFBO0FBQUE7QUFERixRQURGLEVBSUU7QUFBQTtBQUFBLFFBSkYsRUFLRTtBQUFBO0FBQUEsUUFMRixFQU1FO0FBQUE7QUFBQSxRQU5GLEVBT0U7QUFDRSxlQUFPLEVBQUMsYUFEVjtBQUVFLGFBQUssRUFBQyw0QkFGUjtBQUdFLGNBQU0sRUFBQyxLQUhUO0FBSUUsWUFBSSxFQUFDLE1BSlA7QUFBQSxtQkFNRTtBQUFRLFlBQUUsRUFBQyxJQUFYO0FBQWdCLFlBQUUsRUFBQyxJQUFuQjtBQUF3QixXQUFDLEVBQUM7QUFBMUIsVUFORixFQU9FO0FBQVEsWUFBRSxFQUFDLEtBQVg7QUFBaUIsWUFBRSxFQUFDLElBQXBCO0FBQXlCLFdBQUMsRUFBQztBQUEzQixVQVBGLEVBU0U7QUFBSyxpQkFBTyxFQUFDLFdBQWI7QUFBeUIsV0FBQyxFQUFDLEtBQTNCO0FBQWlDLGVBQUssRUFBQyxLQUF2QztBQUFBLG9CQUNFO0FBQVEsY0FBRSxFQUFDLEdBQVg7QUFBZSxjQUFFLEVBQUMsR0FBbEI7QUFBc0IsYUFBQyxFQUFDO0FBQXhCO0FBREYsVUFURjtBQUFBLFFBUEY7QUFBQSxNQWhCRixFQXFDRyxJQXJDSDtBQUFBLElBREssR0F5Q0w7QUFBSSxhQUFNLEdBQVY7QUFBZSxPQUFHLEVBQUVuSixPQUFPLENBQUN3SixJQUE1QjtBQUFBLDhCQUNjTCxHQURkLEVBRUUsaUZBQUMsSUFBRDtBQUFNLFVBQUksRUFBRUE7QUFBWixNQUZGLEVBR0Usa0ZBQUMsTUFBRDtBQUNFLGNBQVEsRUFBRSxJQURaO0FBRUUsU0FBRyxFQUFFLGFBQUMxRyxFQUFEO0FBQUEsZUFBcUJ6QyxPQUFPLENBQUNDLEdBQVIsQ0FBWSxtQkFBWixFQUFpQ3dDLEVBQWpDLENBQXJCO0FBQUEsT0FGUDtBQUFBLHlCQUtFO0FBQ0UsV0FBRyxFQUFFLGFBQUNBLEVBQUQ7QUFBQSxpQkFBcUJ6QyxPQUFPLENBQUNDLEdBQVIsQ0FBWSx3QkFBWixFQUFzQ3dDLEVBQXRDLENBQXJCO0FBQUEsU0FEUDtBQUFBO0FBQUEsUUFMRixFQVVFO0FBQUEsa0JBQUkwRztBQUFKLFFBVkY7QUFBQSxNQUhGLEVBZUU7QUFBQSxpQkFDRyxLQURILEVBRUcsSUFGSCxFQUdHNUgsU0FISDtBQUFBLE1BZkYsRUFvQkU7QUFBQSxpQkFDRTtBQUFBO0FBQUEsUUFERixFQUVFO0FBQUE7QUFBQSxRQUZGLEVBR0dBLFNBSEgsRUFJRTtBQUFBO0FBQUEsUUFKRixFQUtFO0FBQ0UsZUFBTyxFQUFDLGFBRFY7QUFFRSxhQUFLLEVBQUMsNEJBRlI7QUFHRSxjQUFNLEVBQUMsS0FIVDtBQUlFLFlBQUksRUFBQyxNQUpQO0FBQUEsbUJBTUU7QUFBUSxZQUFFLEVBQUMsSUFBWDtBQUFnQixZQUFFLEVBQUMsSUFBbkI7QUFBd0IsV0FBQyxFQUFDO0FBQTFCLFVBTkYsRUFPRTtBQUFRLFlBQUUsRUFBQyxLQUFYO0FBQWlCLFlBQUUsRUFBQyxJQUFwQjtBQUF5QixXQUFDLEVBQUM7QUFBM0IsVUFQRixFQVNFO0FBQUssaUJBQU8sRUFBQyxXQUFiO0FBQXlCLFdBQUMsRUFBQyxLQUEzQjtBQUFpQyxlQUFLLEVBQUMsS0FBdkM7QUFBQSxvQkFDRTtBQUFRLGNBQUUsRUFBQyxHQUFYO0FBQWUsY0FBRSxFQUFDLEdBQWxCO0FBQXNCLGFBQUMsRUFBQztBQUF4QjtBQURGLFVBVEY7QUFBQSxRQUxGLEVBa0JFO0FBQUE7QUFBQSxRQWxCRjtBQUFBLE1BcEJGO0FBQUEsSUF6Q0Y7QUFtRkQ7O0FBQ0QsSUFBTWtJLEdBQUcsR0FBRztBQUFFQyxHQUFDLEVBQUU7QUFBTCxDQUFaOztBQUVBLFNBQVNDLE9BQVQsQ0FBaUJSLEdBQWpCLEVBQTJCO0FBQ3pCTSxLQUFHLENBQUNDLENBQUosR0FBUVAsR0FBUjtBQUNBLFNBQU9BLEdBQUcsS0FBSyxDQUFSLEdBQ0w7QUFBSSxPQUFHLEVBQUVNLEdBQVQ7QUFBYyxNQUFFLEVBQUVBLEdBQUcsQ0FBQ0MsQ0FBdEI7QUFBQSxnQ0FDZ0JQLEdBRGhCO0FBQUEsSUFESyxHQUtMO0FBQUksT0FBRyxFQUFFTSxHQUFUO0FBQWMsYUFBTSxHQUFwQjtBQUF3QixNQUFFLEVBQUVBLEdBQUcsQ0FBQ0MsQ0FBaEM7QUFBQSxnQ0FDZ0JQLEdBRGhCO0FBQUEsSUFMRjtBQVNEOztBQUVELFNBQVMzQixNQUFULENBQWdCMkIsR0FBaEIsRUFBMEI7QUFDeEIsU0FBT0EsR0FBRyxLQUFLLENBQVIsR0FDTDtBQUFBLGNBQ0U7QUFBQSxpQkFDRTtBQUFBO0FBQUEsUUFERixFQUVFO0FBQUE7QUFBQSxRQUZGO0FBQUE7QUFERixJQURLLEdBUUw7QUFBSSxhQUFNLEdBQVY7QUFBQSxlQUNHLGNBREgsT0FDb0JBLEdBRHBCO0FBQUEsSUFSRjtBQVlEOztBQUVELFNBQVNTLE9BQVQsQ0FBaUJULEdBQWpCLEVBQTJCO0FBQ3pCLFNBQU9BLEdBQUcsS0FBSyxDQUFSLEdBQ0w7QUFBQSxlQUNHWCxvRkFBTyxvREFEVixFQUVFLGlGQUFDLEtBQUQsS0FGRixFQUdHL0YsRUFISDtBQUFBLElBREssR0FPTDtBQUFBLGVBQ0crRixvRkFBTyxvREFEVixFQUVHLElBRkgsRUFHRy9GLEVBSEg7QUFBQSxJQVBGO0FBYUQsQyxDQUVEO0FBQ0E7OztJQUVNb0gsUzs7Ozs7QUFDSix1QkFBYztBQUFBOztBQUFBOztBQUNaO0FBQ0EsOEJBRlksQ0FJWjs7QUFFQTdKLFdBQU8sQ0FBQ0MsR0FBUixDQUFZLDBCQUFaO0FBTlk7QUFPYjs7Ozt3Q0FFbUI7QUFDbEJELGFBQU8sQ0FBQ0MsR0FBUixDQUFZLHVEQUFaO0FBQ0Q7Ozs7aUNBWnFCNkosVzs7QUFleEJDLGNBQWMsQ0FBQ0MsTUFBZixDQUFzQixZQUF0QixFQUFvQ0gsU0FBcEMsRSxDQUVBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBOztBQUNBLElBQU1wSCxFQUFFLEdBQUdkLFFBQVEsQ0FBQ3NJLGFBQVQsQ0FBdUIsTUFBdkIsQ0FBWDs7QUFDQSxTQUFTQyxLQUFULEdBQWlCO0FBQ2YsU0FDRTtBQUFBLGVBQ0cxQixvRkFBTyxvREFEVixFQUVFLGlGQUFDLEtBQUQsS0FGRixFQUdHL0YsRUFISDtBQUFBLElBREY7QUFPRDs7QUFDRCxTQUFTMEgsS0FBVCxHQUFpQjtBQUNmLFNBQU87QUFBQTtBQUFBLElBQVA7QUFDRDs7QUFFREMsTUFBTSxDQUFDQyxTQUFQLEdBQW1CO0FBQUEsU0FDakI5QyxtRkFBTSxDQUFDZ0MsT0FBTyxDQUFDLENBQUQsQ0FBUixFQUFhNUgsUUFBUSxDQUFDMkksY0FBVCxDQUF3QixXQUF4QixDQUFiLENBRFc7QUFBQSxDQUFuQjs7QUFFQUYsTUFBTSxDQUFDRyxTQUFQLEdBQW1CO0FBQUEsU0FDakJoRCxtRkFBTSxDQUFDZ0MsT0FBTyxDQUFDLENBQUQsQ0FBUixFQUFhNUgsUUFBUSxDQUFDMkksY0FBVCxDQUF3QixXQUF4QixDQUFiLENBRFc7QUFBQSxDQUFuQjs7QUFFQUYsTUFBTSxDQUFDSSxTQUFQLEdBQW1CO0FBQUEsU0FDakJqRCxtRkFBTSxFQUNKO0FBQ0EsbUZBQUMsS0FBRCxLQUZJLEVBR0o1RixRQUFRLENBQUMySSxjQUFULENBQXdCLFdBQXhCLENBSEksQ0FEVztBQUFBLENBQW5COztBQU9BdEssT0FBTyxDQUFDQyxHQUFSLENBQVksT0FBWjs7QUFDQW1LLE1BQU0sQ0FBQ0ssRUFBUCxHQUFZO0FBQUEsU0FBTWxCLE9BQU8sQ0FBQyxDQUFELENBQVAsR0FBYSxFQUFuQjtBQUFBLENBQVo7O0FBQ0FhLE1BQU0sQ0FBQ00sR0FBUCxHQUFhLFlBQU07QUFDakIxSyxTQUFPLENBQUNDLEdBQVIsQ0FBWXNKLE9BQU8sQ0FBQyxDQUFELENBQW5CLEVBRGlCLENBR2pCO0FBQ0QsQ0FKRDs7QUFNQWEsTUFBTSxDQUFDTyxVQUFQLEdBQW9CO0FBQUEsU0FDbEJwRCxtRkFBTSxDQUFDcUMsT0FBTyxDQUFDLENBQUQsQ0FBUixFQUFhakksUUFBUSxDQUFDMkksY0FBVCxDQUF3QixXQUF4QixDQUFiLENBRFk7QUFBQSxDQUFwQjs7QUFFQUYsTUFBTSxDQUFDUSxVQUFQLEdBQW9CO0FBQUEsU0FDbEJyRCxtRkFBTSxDQUFDcUMsT0FBTyxDQUFDLENBQUQsQ0FBUixFQUFhakksUUFBUSxDQUFDMkksY0FBVCxDQUF3QixXQUF4QixDQUFiLENBRFk7QUFBQSxDQUFwQjs7QUFLRS9DLG1GQUFNLENBQUU7QUFBSSxXQUFNLEdBQVY7QUFBZSxLQUFHLEVBQUV2SCxPQUFPLENBQUMyQyxJQUE1QjtBQUFBO0FBQUEsRUFBRixFQUE0RGhCLFFBQVEsQ0FBQzJJLGNBQVQsQ0FBd0IsV0FBeEIsQ0FBNUQsQ0FBTjs7QUFDQUYsTUFBTSxDQUFDUyxXQUFQLEdBQXFCO0FBQUEsU0FBTXRELG1GQUFNLENBQUU7QUFBSSxhQUFNLEdBQVY7QUFBZSxPQUFHLEVBQUV2SCxPQUFPLENBQUMyQyxJQUE1QjtBQUFBO0FBQUEsSUFBRixFQUE0RGhCLFFBQVEsQ0FBQzJJLGNBQVQsQ0FBd0IsV0FBeEIsQ0FBNUQsQ0FBWjtBQUFBLENBQXJCLEMiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAwKTtcbiIsImNvbnN0IHJlbmRlcmVkVlRyZWVzID0gbmV3IFdlYWtNYXA8SFRNTEVsZW1lbnQsIFJvb3RWTm9kZT4oKTtcclxuY29uc3QgcmVmc1RvQ2FsbDogQXJyYXk8KCkgPT4gdm9pZD4gPSBbXTtcclxuXHJcbi8qKlxyXG4gKiBwcm92aWRlcyBmdW5jdGlvbnMgbmVlZGVkIGJ5IGJhYmVsIGZvciBhIGN1c3RvbSBwcmFnbWFcclxuICogdG8gcmVuZGVyIHBhcnNlZCBqc3ggY29kZSB0byBodG1sXHJcbiAqL1xyXG5cclxuLy8gcHJvcHMgd2hpY2ggd2lsbCBiZSByZW5kZXJlZCBhcyBhdHRyaWJ1dGVzXHJcbi8vIEZ1bmN0aW9ucyB3aWxsIGJlIHVzZWQgZm9yIGV2ZW50IGxpc3RlbmVycy4gKHdpdGggYXR0cmlidXRlIG5hbWUgc3RhcnRpbmcgd2l0aCAnb24tJylcclxudHlwZSBBdHRyaWJ1dGVzID0geyBba2V5OiBzdHJpbmddOiBzdHJpbmcgfCBib29sZWFuIHwgbnVtYmVyIHwgRnVuY3Rpb24gfTtcclxuXHJcbi8vIGFkZGl0aW9uYWwgYXR0cmlidXRlcyB3aGljaCBjYW4gaGF2ZSBhZGRpdGlvbmFsIHNlcmlhbGl6YXRpb24gYmVmb3JlIHJlbmRlcmluZyBhcyBhdHRyaWJ1dGVzXHJcbnR5cGUgU3BlY2lhbEF0dHJpYnV0ZXMgPSB7XHJcbiAgY2xhc3M/OiBzdHJpbmcgfCBzdHJpbmdbXTtcclxuICBzdHlsZT86IHN0cmluZyB8IHsgW2tleTogc3RyaW5nXTogc3RyaW5nIH07XHJcbiAgcmVmPzogRnVuY3Rpb247XHJcbn07XHJcblxyXG4vLyBjaGlsZCBlbGVtZW50cyBpbiB0aGUganN4IG1hcmt1cCB3aGljaCB3aWxsIGJlIHBhc3NlZCB0byB0aGUgaCBmdW5jdGlvbiBhcyBgcHJvcHMuY2hpbGRyZW5gXHJcbnR5cGUgQ2hpbGRyZW5Qcm9wcyA9IHtcclxuICAvLyBuZXN0ZWQgYXJyYXkgaW4gY2FzZSBvZlxyXG4gIC8vIDxlbGVtPlxyXG4gIC8vICAgPHNwYW4vPlxyXG4gIC8vICAge2NoaWxkcmVufVxyXG4gIC8vICAgPGRpdi8+XHJcbiAgLy8gPC9lbGVtPlxyXG4gIGNoaWxkcmVuOiBBcnJheTxcclxuICAgIE5vZGUgfCBKc3hOb2RlSW50ZXJmYWNlIHwgc3RyaW5nIHwgQXJyYXk8Tm9kZSB8IEpzeE5vZGVJbnRlcmZhY2UgfCBzdHJpbmc+XHJcbiAgPjtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBwcm9wcyBvYmplY3Qgd2hpY2ggd2lsbCBiZSBwYXNzZWQgdG8ganN4IHByYWdtYSBhbmQgY3VzdG9tIGNvbXBvbmVudCBmdW5jdGlvbnNcclxuICovXHJcbnR5cGUgSnN4UHJvcHMgPSBBdHRyaWJ1dGVzICYgU3BlY2lhbEF0dHJpYnV0ZXMgJiBDaGlsZHJlblByb3BzO1xyXG5cclxuLy8gYmFzZSBjbGFzcyB3aGljaCB3aWxsIGJlIGluaGVyaXRlZCBmcm9tIGpzeCBhbmQgZnJhZ21lbnRzIGZ1bmN0aW9uIG5vZGUgZ2VuZXJhdGlvblxyXG4vLyBhbmQgd2lsbCBiZSB1c2VkIHRvIGRpc3Rpbmd1aXNoIHRoZW0gd2l0aCBvdGhlciBFbGVtZW50c1xyXG5jbGFzcyBKc3hOb2RlIHtcclxuICBwcm9wczogSnN4UHJvcHM7XHJcbiAgY29uc3RydWN0b3IocHJvcHM6IEpzeFByb3BzKSB7XHJcbiAgICB0aGlzLnByb3BzID0gcHJvcHM7XHJcbiAgfVxyXG59XHJcblxyXG4vLyBudWxsIHdoZW4gY2hlY2tpbmcgdGhlIHBhcmVudCB3aGVuIHJvb3QgaXMgZnJhZ21lbnQgaXRzZWxmXHJcbmZ1bmN0aW9uIGdldFBhcmVudEVsZW1lbnROb2RlKHZOb2RlOiBWTm9kZUludGVyZmFjZSk6IEVsZW1lbnRWTm9kZSB7XHJcbiAgY29uc29sZS5sb2coXCJnZXRQYXJlbnRFbGVtZW50Tm9kZVwiLCB2Tm9kZSk7XHJcblxyXG4gIHdoaWxlICh2Tm9kZS5wYXJlbnQpIHtcclxuICAgIHZOb2RlID0gdk5vZGUucGFyZW50O1xyXG4gICAgLy8gYC5ub2RlYCBpcyBvbmx5IG9uIFwiVGV4dFwiIGFuZCBcIkVsZW1lbnRcIiwgXCJSYXdIdG1sXCIgdHlwZSBWTm9kZSwgYW5kIG9ubHkgRWxlbWVudCBoYXMgY2hpbGRyZW5cclxuICAgIGlmICh2Tm9kZS5ub2RlKSBicmVhaztcclxuICB9XHJcblxyXG4gIHJldHVybiAodk5vZGUgYXMgdW5rbm93bikgYXMgRWxlbWVudFZOb2RlO1xyXG59XHJcblxyXG5mdW5jdGlvbiBnZXRDaGlsZHJlbldpdGhOb2RlcyhcclxuICB2Tm9kZTogVk5vZGVJbnRlcmZhY2UsXHJcbiAgYWx3YXlzQWxsb3c/OiBWTm9kZUludGVyZmFjZVxyXG4pOiBWTm9kZUludGVyZmFjZVtdIHtcclxuICB2Tm9kZS5jaGlsZHJlbjtcclxuICByZXR1cm4gdk5vZGUuY2hpbGRyZW5cclxuICAgIC5tYXAoKGNoaWxkTm9kZSkgPT4ge1xyXG4gICAgICBpZiAoY2hpbGROb2RlID09PSBhbHdheXNBbGxvdykgcmV0dXJuIGNoaWxkTm9kZTtcclxuICAgICAgaWYgKGNoaWxkTm9kZS5ub2RlKSByZXR1cm4gY2hpbGROb2RlO1xyXG4gICAgICByZXR1cm4gZ2V0Q2hpbGRyZW5XaXRoTm9kZXMoY2hpbGROb2RlLCBhbHdheXNBbGxvdyk7XHJcbiAgICB9KVxyXG4gICAgLmZsYXQoSW5maW5pdHkpIGFzIFZOb2RlSW50ZXJmYWNlW107XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdldFBhcmVudEFuZE5leHRTaWJsaW5nKHZOb2RlOiBWTm9kZUludGVyZmFjZSk6IFtOb2RlLCBOb2RlIHwgbnVsbF0ge1xyXG4gIC8vIG5vZGUgYW5jZXN0b3Igd2l0aCBFbGVtZW50LFxyXG4gIGNvbnN0IHBhcmVudFdpdGhFbGVtZW50ID0gZ2V0UGFyZW50RWxlbWVudE5vZGUodk5vZGUpO1xyXG4gIGNvbnN0IHNpYmxpbmdzID0gZ2V0Q2hpbGRyZW5XaXRoTm9kZXMocGFyZW50V2l0aEVsZW1lbnQsIHZOb2RlKTtcclxuICBjb25zb2xlLmxvZyhcInNpYmxpbmdzXCIsIHNpYmxpbmdzKTtcclxuXHJcbiAgY29uc3QgcHJldlNpYmxpbmcgPSBzaWJsaW5nc1tzaWJsaW5ncy5pbmRleE9mKHZOb2RlKSAtIDFdO1xyXG4gIGNvbnN0IG5leHRTaWJsaW5nTm9kZSA9IHByZXZTaWJsaW5nID8gcHJldlNpYmxpbmcubm9kZSEubmV4dFNpYmxpbmcgOiBudWxsO1xyXG5cclxuICByZXR1cm4gW3BhcmVudFdpdGhFbGVtZW50Lm5vZGUsIG5leHRTaWJsaW5nTm9kZV07XHJcbn1cclxuXHJcbi8vIHByaXZhdGUga2V5IGZvciBjYWxsaW5nIHRoZSBgcmVmYCBjYWxsZXJzXHJcbmNvbnN0IF9jYWxsUmVmcyA9IFN5bWJvbChcImNhbGxSZWZzXCIpO1xyXG5cclxuLy8gdGhlIGN1cnJlbnQgbWFya3VwIHdoaWNoIGlzIHJlbmRlcmVkIGlzIG5lc3RlZCBpbiBhbiBzdmcgZWxlbWVudFxyXG5sZXQgc3ZnQ29udGV4dCA9IGZhbHNlO1xyXG5cclxuLy8ganN4IGFuZCBGcmFnbWVudCB3aWxsIHJldHVybiBvYmplY3RzIHdoaWNoIGltcGxlbWVudCB0aGlzIGludGVyZmFjZVxyXG5leHBvcnQgaW50ZXJmYWNlIEpzeE5vZGVJbnRlcmZhY2UgZXh0ZW5kcyBKc3hOb2RlIHtcclxuICB0b1N0cmluZygpOiBzdHJpbmc7XHJcbiAgYXNOb2RlKCk6IE5vZGU7XHJcbiAgYXNWTm9kZSgpOiBWTm9kZTtcclxuICBbX2NhbGxSZWZzXSgpOiB2b2lkO1xyXG59XHJcblxyXG4vKipcclxuICogcmV0dXJucyB0cnVlIGlmIG5vdCBudWxsaXNoIG9yIGZhbHNlXHJcbiAqIHRoYXQgbWVhbnMgMCBvciBlbXB0eSBzdHJpbmcgYXJlIGFsbG93ZWRcclxuICogQHBhcmFtIHsqfSB2YWxcclxuICovXHJcbmZ1bmN0aW9uIHRydXRoeSh2YWx1ZTogYW55KTogYm9vbGVhbiB7XHJcbiAgcmV0dXJuIHZhbHVlICE9PSBmYWxzZSAmJiB2YWx1ZSAhPT0gbnVsbCAmJiB2YWx1ZSAhPT0gdW5kZWZpbmVkO1xyXG59XHJcblxyXG4vKipcclxuICogZXNjYXBlcyB0aGUgcHJvdmlkZWQgc3RyaW5nIGFnYWluc3QgeHNzIGF0dGFja3MgZXRjXHJcbiAqXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSB0ZXh0XHJcbiAqIEByZXR1cm5zIHtzdHJpbmd9XHJcbiAqL1xyXG5mdW5jdGlvbiBzYW5pdGl6ZSh0ZXh0OiBzdHJpbmcpOiBzdHJpbmcge1xyXG4gIGNvbnN0IGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgZGl2LmlubmVyVGV4dCA9IHRleHQ7XHJcbiAgcmV0dXJuIGRpdi5pbm5lckhUTUw7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBiYXNpY2FsbHkgYEVsZW1lbnQub3V0ZXJIVE1MYCBidXQgYWxzbyBzdXBwb3J0cyBUZXh0IG5vZGUgYW5kIERvY3VtZW50RnJhZ21lbnRcclxuICogQHBhcmFtIGVsZW1lbnQge05vZGV9IC0gZWxlbWVudCB3aGljaCBpdHMgaHRtbCBuZWVkcyB0byBiZSByZXR1cm5lZFxyXG4gKi9cclxuZnVuY3Rpb24gZ2V0T3V0ZXJIdG1sKGVsZW1lbnQ6IE5vZGUpOiBzdHJpbmcge1xyXG4gIGlmIChlbGVtZW50IGluc3RhbmNlb2YgRWxlbWVudCkgcmV0dXJuIGVsZW1lbnQub3V0ZXJIVE1MO1xyXG4gIGlmIChlbGVtZW50IGluc3RhbmNlb2YgVGV4dCkgcmV0dXJuIHNhbml0aXplKGVsZW1lbnQud2hvbGVUZXh0KTtcclxuICBpZiAoZWxlbWVudCBpbnN0YW5jZW9mIERvY3VtZW50RnJhZ21lbnQpXHJcbiAgICByZXR1cm4gQXJyYXkuZnJvbShlbGVtZW50LmNoaWxkTm9kZXMpXHJcbiAgICAgIC5tYXAoKGVsKSA9PiBnZXRPdXRlckh0bWwoZWwpKVxyXG4gICAgICAuam9pbihcIlwiKTtcclxuXHJcbiAgLy8gc2hvdWxkbid0IHJlYWNoIHRoaXMgcG9pbnRcclxuICBjb25zb2xlLndhcm4oXCJnZXRPdXRlckh0bWwgZG9lcyBub3Qgc3VwcG9ydCB0aGlzIHR5cGUgb2YgZWxlbWVudFwiLCBlbGVtZW50KTtcclxuICByZXR1cm4gXCJcIjtcclxufVxyXG5cclxuLyoqXHJcbiAqIGdlbmVyYXRlcyB0aGUgaHRtbCBhcyBhIHN0cmluZyB3aGljaCBjYW4gYmUgdXNlZCBmb3IgZXhhbXBsZSB3aXRoIGBlbGVtZW50LmlubmVySFRNTCgpYFxyXG4gKlxyXG4gKiBAcGFyYW0gdGFnIHtzdHJpbmd8RnVuY3Rpb259IC0gdGFnIGFyZ3VtZW50IG9mIHRoZSBqc3ggY2FsbFxyXG4gKiBAcGFyYW0gcHJvcHMge09iamVjdH0gLSBwcm9wcyBhcmd1bWVudCBvZiBqc3ggY2FsbFxyXG4gKi9cclxuZnVuY3Rpb24gYXNIdG1sU3RyaW5nKHRhZzogc3RyaW5nIHwgRnVuY3Rpb24sIHByb3BzOiBKc3hQcm9wcywgY2hpbGRyZW4pIHtcclxuICBjb25zdCBhdHRyaWJ1dGVzID0gT2JqZWN0LmVudHJpZXMocHJvcHMpXHJcbiAgICAuZmlsdGVyKChbLCB2YWx1ZV0pID0+IHRydXRoeSh2YWx1ZSkpXHJcbiAgICAubWFwKChba2V5LCB2YWx1ZV0pID0+IHtcclxuICAgICAgLy8gZS5nLiBkaXNhYmxlZDogdHJ1ZSA9PiA8dGFnIGRpc2FibGVkPlxyXG4gICAgICBpZiAodmFsdWUgPT09IHRydWUpIHJldHVybiBrZXk7XHJcblxyXG4gICAgICAvLyBmb3Igc3R5bGUgYXMgb2JqZWN0OlxyXG4gICAgICAvLyAoc3R5bGU6KSB7ZGlzcGxheTogXCJub25lXCIsIHBvc2l0aW9uOiBcImFic29sdXRlXCJ9ID09PiAnZGlzcGxheTogbm9uZTsgcG9zaXRpb246IGFic29sdXRlOydcclxuICAgICAgaWYgKGtleSA9PT0gXCJzdHlsZVwiICYmIHR5cGVvZiB2YWx1ZSA9PT0gXCJvYmplY3RcIilcclxuICAgICAgICB2YWx1ZSA9IE9iamVjdC5lbnRyaWVzKHZhbHVlKVxyXG4gICAgICAgICAgLy8gaWdub3JlIHN0dWZmIGxpa2UgYHtiYWNrZ3JvdW5kOiBhY3RpdmUgJiYgXCJyZWRcIn1gIHdoZW4gYGFjdGl2ZSA9PT0gZmFsc2UgLyBudWxsIC8gdW5kZWZpbmVkYFxyXG4gICAgICAgICAgLmZpbHRlcigoWywgdl0pID0+IHRydXRoeSh2KSlcclxuICAgICAgICAgIC8vIGN1cnJlbnRseSBzdXBwb3J0cyBcImJhY2tncm91bmQtY29sb3JcIiBub3QgXCJiYWNrZ3JvdW5kQ29sb3JcIlxyXG4gICAgICAgICAgLm1hcCgoW2ssIHZdKSA9PiBgJHtrfTogJHt2fWApXHJcbiAgICAgICAgICAuam9pbihcIjsgXCIpO1xyXG5cclxuICAgICAgLy8gKGNsYXNzOikgW1wiYnRuXCIsIFwicmVkXCJdID09PiBcImJ0biByZWRcIlxyXG4gICAgICBpZiAoa2V5ID09PSBcImNsYXNzXCIgJiYgQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHZhbHVlID0gdmFsdWUuam9pbihcIiBcIik7XHJcblxyXG4gICAgICByZXR1cm4gYCR7a2V5fT1cIiR7dmFsdWV9XCJgO1xyXG4gICAgfSlcclxuICAgIC5qb2luKFwiIFwiKTtcclxuXHJcbiAgY29uc3QgY29udGVudCA9IGNoaWxkcmVuLm1hcCgoY2hpbGQpID0+IGNoaWxkLnRvU3RyaW5nKCkpLmpvaW4oXCJcIik7XHJcblxyXG4gIHJldHVybiBgPCR7dGFnfSAke2F0dHJpYnV0ZXN9PiR7Y29udGVudH08LyR7dGFnfT5gO1xyXG59XHJcblxyXG4vKipcclxuICogZ2VuZXJhdGVzIEhUTUwgTm9kZSBlbGVtZW50cyBmcm9tIHRoZSBwcm92aWRlZCBqc3ggdHJlZVxyXG4gKiBAcGFyYW0gdGFnIHtzdHJpbmd8RnVuY3Rpb259IC0gdGFnIGFyZ3VtZW50IG9mIHRoZSBqc3ggY2FsbFxyXG4gKiBAcGFyYW0gcHJvcHMge09iamVjdH0gLSBwcm9wcyBhcmd1bWVudCBvZiBqc3ggY2FsbFxyXG4gKi9cclxuZnVuY3Rpb24gYXNOb2RlKFxyXG4gIHRhZzogc3RyaW5nIHwgRnVuY3Rpb24gfCB1bmRlZmluZWQsXHJcbiAgcHJvcHM6IEF0dHJpYnV0ZXMgJiBTcGVjaWFsQXR0cmlidXRlcywgLy9Kc3hQcm9wcyxcclxuICBjaGlsZHJlbjogYW55W11cclxuKTogW05vZGUsIEpzeE5vZGVJbnRlcmZhY2VbXV0ge1xyXG4gIGNvbnNvbGUubG9nKFwiYXNOb2RlKClcIiwgeyB0YWcsIHByb3BzLCBjaGlsZHJlbiB9KTtcclxuXHJcbiAgLy8gZnJhZ21lbnRcclxuICBpZiAoIXRhZykge1xyXG4gICAgY29uc3QgZnJhZ21lbnRzID0gY2hpbGRyZW5cclxuICAgICAgLmZsYXQoKSAvLyA/XHJcbiAgICAgIC5tYXAoKGl0ZW0pID0+IGl0ZW0uYXNOb2RlKCkpO1xyXG5cclxuICAgIGNvbnN0IGRvY3VtZW50RnJhZ21lbnQgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XHJcblxyXG4gICAgZG9jdW1lbnRGcmFnbWVudC5hcHBlbmQoLi4uZnJhZ21lbnRzKTtcclxuICAgIHJldHVybiBbZG9jdW1lbnRGcmFnbWVudCwgW11dO1xyXG4gIH1cclxuXHJcbiAgLy8gc2hvdWxkbid0XHJcbiAgaWYgKHR5cGVvZiB0YWcgPT09IFwiZnVuY3Rpb25cIikge1xyXG4gICAgY29uc29sZS5lcnJvcihcInNob3VsZG4ndCByZWFjaCB0aGlzIGluIHZUcmVlIG1vZGVcIik7XHJcbiAgICAvLyBleHBlY3RpbmcgdGhlIHRhZyBmdW5jdGlvbiB0byByZXR1cm4ganN4LlxyXG4gICAgLy8gaGVyZSBpdCB3aWxsIGFsc28gd29yayB3aGVuIGl0IHJldHVybnMgSFRNTEVsZW1lbnRcclxuICAgIGxldCByZXN1bHQgPSB0YWcocHJvcHMpO1xyXG5cclxuICAgIGxldCBqc3hOb2RlczogSnN4Tm9kZUludGVyZmFjZVtdID0gW107XHJcblxyXG4gICAgaWYgKHJlc3VsdCBpbnN0YW5jZW9mIFZOb2RlKSB7XHJcbiAgICAgIGpzeE5vZGVzID0gW3Jlc3VsdCBhcyBKc3hOb2RlSW50ZXJmYWNlXTtcclxuICAgICAgcmVzdWx0ID0gKHJlc3VsdCBhcyBKc3hOb2RlSW50ZXJmYWNlKS5hc05vZGUoKTtcclxuICAgICAgT2JqZWN0LmVudHJpZXMocHJvcHMpLmZvckVhY2goKFtrZXksIHZhbHVlXSkgPT4ge1xyXG4gICAgICAgIGlmIChcclxuICAgICAgICAgIGtleS5zdGFydHNXaXRoKFwib24tXCIpICYmXHJcbiAgICAgICAgICAodHlwZW9mIHZhbHVlID09PSBcImZ1bmN0aW9uXCIgfHwgdHlwZW9mIHZhbHVlID09PSBcIm9iamVjdFwiKVxyXG4gICAgICAgICkge1xyXG4gICAgICAgICAgLy8gcmVtb3ZlIGxlYWRpbmcgXCJvbi1cIlwiXHJcbiAgICAgICAgICBjb25zdCBldmVudCA9IGtleS5yZXBsYWNlKC9eb24tLywgXCJcIik7XHJcblxyXG4gICAgICAgICAgcmVzdWx0LmFkZEV2ZW50TGlzdGVuZXIoXHJcbiAgICAgICAgICAgIGV2ZW50LFxyXG4gICAgICAgICAgICB2YWx1ZSBhcyBFdmVudExpc3RlbmVyT3JFdmVudExpc3RlbmVyT2JqZWN0XHJcbiAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIFtyZXN1bHQsIGpzeE5vZGVzXTtcclxuICB9XHJcblxyXG4gIGNvbnNvbGUubG9nKFwiYXNOb2RlXCIsIHsgcHJvcHMgfSk7XHJcblxyXG4gIGNvbnN0IHsgcmVmLCAuLi5hdHRycyB9ID0gcHJvcHM7XHJcblxyXG4gIC8vIHJlbWVtYmVyIGlmIHRoZSBzdmcgY29udGV4dCB3YXMgc2V0IGZvciB0aGlzIG5vZGUsIGFuZCByZXBsYWNlIGFmdGVyIGdlbmVyYXRpbmcgYWxsIGNoaWxkcmVuXHJcbiAgbGV0IHN2Z0NvbnRleHRTZXQgPSBmYWxzZTtcclxuXHJcbiAgLy8gc2V0IHRoZSBjb250ZXh0IG9mIG1hcmt1cCB3aGljaCBpcyByZW5kZXJlZCBhcyBTVkcgKG9yIGl0cyBjaGlsZHJlbilcclxuICAvLyBubyBuZWVkIGZvciByZS1zZXR0aW5nIHRoZSBjb250ZXh0IGZvciBuZXN0ZWQgU1ZHc1xyXG4gIGlmICghc3ZnQ29udGV4dCAmJiB0YWcgPT09IFwic3ZnXCIpIHtcclxuICAgIHN2Z0NvbnRleHQgPSB0cnVlO1xyXG4gICAgc3ZnQ29udGV4dFNldCA9IHRydWU7XHJcbiAgfVxyXG5cclxuICAvLyBjdXJyZW50bHkgbm90IHN1cHBvcnRpbmcgdGhlIGBpc2Agb3B0aW9uIGZvciBDdXN0b21pemVkIGJ1aWx0LWluIGVsZW1lbnRzXHJcbiAgY29uc3Qgbm9kZSA9IHN2Z0NvbnRleHRcclxuICAgID8gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKFwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiwgdGFnKVxyXG4gICAgOiBkb2N1bWVudC5jcmVhdGVFbGVtZW50KHRhZyk7XHJcblxyXG4gIC8vIGN1cnJlbnRseSBvbmx5IHN1cHBvcnRpbmcgcmVmIG9uIGh0bWwgZWxlbWVudHMuIG5vdCB0ZW1wbGF0ZSBmdW5jdGlvbnNcclxuICBpZiAodHlwZW9mIHJlZiA9PT0gXCJmdW5jdGlvblwiKSB7XHJcbiAgICBjb25zb2xlLmxvZyhcInB1c2ggdG8gcmVmc1wiKTtcclxuXHJcbiAgICByZWZzVG9DYWxsLnB1c2goKCkgPT4gcmVmKG5vZGUpKTtcclxuICB9XHJcblxyXG4gIE9iamVjdC5lbnRyaWVzKGF0dHJzKVxyXG4gICAgLmZpbHRlcigoW19rZXksIHZhbHVlXSkgPT4gdHJ1dGh5KHZhbHVlKSlcclxuICAgIC5mb3JFYWNoKChba2V5LCB2YWx1ZV0pID0+IHtcclxuICAgICAgLy8gZm9yIHN0eWxlIGFzIG9iamVjdDpcclxuICAgICAgLy8gKHN0eWxlOikge2Rpc3BsYXk6IFwibm9uZVwiLCBwb3NpdGlvbjogXCJhYnNvbHV0ZVwifSA9PT4gJ2Rpc3BsYXk6IG5vbmU7IHBvc2l0aW9uOiBhYnNvbHV0ZTsnXHJcbiAgICAgIGlmIChrZXkgPT09IFwic3R5bGVcIiAmJiB0eXBlb2YgdmFsdWUgPT09IFwib2JqZWN0XCIpXHJcbiAgICAgICAgdmFsdWUgPSBPYmplY3QuZW50cmllcyh2YWx1ZSlcclxuICAgICAgICAgIC5maWx0ZXIoKFssIHZdKSA9PiB0cnV0aHkodikpXHJcbiAgICAgICAgICAubWFwKChbaywgdl0pID0+IGAke2t9OiAke3Z9YClcclxuICAgICAgICAgIC5qb2luKFwiOyBcIik7XHJcblxyXG4gICAgICAvLyAoY2xhc3M6KSBbXCJidG5cIiwgXCJyZWRcIl0gPT0+IFwiYnRuIHJlZFwiXHJcbiAgICAgIGlmIChrZXkgPT09IFwiY2xhc3NcIiAmJiBBcnJheS5pc0FycmF5KHZhbHVlKSkgdmFsdWUgPSB2YWx1ZS5qb2luKFwiIFwiKTtcclxuXHJcbiAgICAgIGlmICh2YWx1ZSA9PT0gdHJ1ZSkgbm9kZS5zZXRBdHRyaWJ1dGUoa2V5LCBcIlwiKTtcclxuICAgICAgZWxzZSBpZiAodHlwZW9mIHZhbHVlID09PSBcInN0cmluZ1wiIHx8IHR5cGVvZiB2YWx1ZSA9PT0gXCJudW1iZXJcIilcclxuICAgICAgICBub2RlLnNldEF0dHJpYnV0ZShrZXksIFN0cmluZyh2YWx1ZSkpO1xyXG4gICAgICAvLyBrZXkgaGFzIHRoZSBmb3JtIG9mIFwib24tY2hhbmdlXCIuIHZhbHVlIGlzIHRoZSBjYWxsYmFjayBmdW5jdGlvbiBvciBhbiBvYmplY3QgaW1wbGVtZW50aW5nIHtFdmVudExpc3RlbmVyfSBpbnRlcmZhY2VcclxuICAgICAgZWxzZSBpZiAoXHJcbiAgICAgICAga2V5LnN0YXJ0c1dpdGgoXCJvbi1cIikgJiZcclxuICAgICAgICAodHlwZW9mIHZhbHVlID09PSBcImZ1bmN0aW9uXCIgfHwgdHlwZW9mIHZhbHVlID09PSBcIm9iamVjdFwiKVxyXG4gICAgICApIHtcclxuICAgICAgICAvLyByZW1vdmUgbGVhZGluZyBcIm9uLVwiXCJcclxuICAgICAgICBjb25zdCBldmVudCA9IGtleS5yZXBsYWNlKC9eb24tLywgXCJcIik7XHJcblxyXG4gICAgICAgIG5vZGUuYWRkRXZlbnRMaXN0ZW5lcihcclxuICAgICAgICAgIGV2ZW50LFxyXG4gICAgICAgICAgdmFsdWUgYXMgRXZlbnRMaXN0ZW5lck9yRXZlbnRMaXN0ZW5lck9iamVjdFxyXG4gICAgICAgICk7XHJcbiAgICAgIH1cclxuICAgICAgLy8gQHRzLWlnbm9yZSAtIHByb3ZpZGluZyB0aGUgdmFsdWUgYXMgcHJvcGVydHkgdG8gaHRtbCBlbGVtZW50XHJcbiAgICAgIGVsc2Ugbm9kZVtrZXldID0gdmFsdWU7XHJcbiAgICB9KTtcclxuXHJcbiAgLy8gcmV0dXJucyBjaGlsZCBqc3ggbm9kZXMgYXMgd2VsbCB0byBiZSB1c2VkIGR1cmluZyB0aGUgcmVmIGNhbGxcclxuICBjb25zdCBjaGlsZEpzeE5vZGVzID0gY2hpbGRyZW4uZmlsdGVyKChjaGlsZCkgPT4gY2hpbGQgaW5zdGFuY2VvZiBWTm9kZSk7XHJcblxyXG4gIGNvbnNvbGUubG9nKHsgY2hpbGRyZW4gfSk7XHJcblxyXG4gIG5vZGUuYXBwZW5kKFxyXG4gICAgLi4uY2hpbGRyZW5cclxuICAgICAgLy8uZmxhdCgpXHJcbiAgICAgIC5tYXAoKGNoaWxkKSA9PiBjaGlsZC5hc05vZGUoKSlcclxuICApO1xyXG5cclxuICAvLyBzdmcgZWxlbWVudCBhbmQgYWxsIGl0cyBjaGlsZHJlbiB3ZXJlIHJlbmRlcmVkLCByZXNldCB0aGUgc3ZnIGNvbnRleHRcclxuICBpZiAoc3ZnQ29udGV4dFNldCkgc3ZnQ29udGV4dCA9IGZhbHNlO1xyXG5cclxuICByZXR1cm4gW25vZGUsIGNoaWxkSnN4Tm9kZXMgYXMgSnN4Tm9kZUludGVyZmFjZVtdXTtcclxufVxyXG5cclxuZnVuY3Rpb24gaW5zZXJ0TmV3SXRlbShuZXdOb2RlOiBWTm9kZUludGVyZmFjZSkge1xyXG4gIGNvbnN0IFtwYXJlbnQsIG5leHRTaWJsaW5nXSA9IGdldFBhcmVudEFuZE5leHRTaWJsaW5nKG5ld05vZGUpO1xyXG4gIGNvbnNvbGUubG9nKFwiaW5zZXJ0TmV3SXRlbVwiLCB7IG5ld05vZGUsIHBhcmVudCwgbmV4dFNpYmxpbmcgfSk7XHJcbiAgcGFyZW50Lmluc2VydEJlZm9yZShuZXdOb2RlLmFzTm9kZSgpLCBuZXh0U2libGluZyk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGRpZmZBbmRQYXRjaENoaWxkcmVuKFxyXG4gIG9sZE5vZGU6IFZOb2RlSW50ZXJmYWNlLFxyXG4gIG5ld05vZGU6IFZOb2RlSW50ZXJmYWNlXHJcbikge1xyXG4gIG9sZE5vZGUuY2hpbGRyZW4uZm9yRWFjaCgob2xkQ2hpbGQsIGl4KSA9PiB7XHJcbiAgICBjb25zdCBuZXdDaGlsZCA9IG5ld05vZGUuY2hpbGRyZW5baXhdO1xyXG4gICAgLy8gY2hpbGQgd2FzIHJlbW92ZWRcclxuICAgIGlmICghbmV3Q2hpbGQpIG9sZENoaWxkLnJlbW92ZUZyb21ET00oKTtcclxuICAgIC8vIGNoaWxkIGlzIG1vZGlmaWVkXHJcbiAgICBlbHNlIGlmIChuZXdDaGlsZC50eXBlID09PSBvbGRDaGlsZC50eXBlKSBvbGRDaGlsZC5kaWZmQW5kUGF0Y2gobmV3Q2hpbGQpO1xyXG4gICAgLy8gY2hpbGQgaXMgcmVwbGFjZWRcclxuICAgIGVsc2Uge1xyXG4gICAgICBjb25zb2xlLmxvZyhcImNoaWxkIGlzIHJlcGxhY2VkXCIsIHsgb2xkQ2hpbGQsIG5ld0NoaWxkIH0pO1xyXG5cclxuICAgICAgb2xkQ2hpbGQucmVtb3ZlRnJvbURPTSgpO1xyXG4gICAgICBpbnNlcnROZXdJdGVtKG5ld0NoaWxkKTtcclxuICAgIH1cclxuICB9KTtcclxuXHJcbiAgLy8gbmV3IGFkZGl0aW9uIGl0ZW1zXHJcbiAgY29uc3QgbmV3SXRlbXMgPSBuZXdOb2RlLmNoaWxkcmVuLnNsaWNlKG9sZE5vZGUuY2hpbGRyZW4ubGVuZ3RoKTtcclxuICBpZiAobmV3SXRlbXMubGVuZ3RoKSB7XHJcbiAgICBjb25zdCBkb2N1bWVudEZyYWdtZW50ID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO1xyXG4gICAgbmV3SXRlbXMuZm9yRWFjaCgoaXRlbSkgPT4gZG9jdW1lbnRGcmFnbWVudC5hcHBlbmQoaXRlbS5hc05vZGUoKSkpO1xyXG5cclxuICAgIGNvbnN0IFtwYXJlbnQsIG5leHRTaWJsaW5nXSA9IGdldFBhcmVudEFuZE5leHRTaWJsaW5nKG5ld0l0ZW1zWzBdKTtcclxuICAgIHBhcmVudC5pbnNlcnRCZWZvcmUoZG9jdW1lbnRGcmFnbWVudCwgbmV4dFNpYmxpbmcpO1xyXG4gIH1cclxufVxyXG5cclxuY2xhc3MgVk5vZGUge31cclxuXHJcbmludGVyZmFjZSBWTm9kZUludGVyZmFjZSB7XHJcbiAgdG9TdHJpbmcoKTogc3RyaW5nO1xyXG4gIGFzTm9kZSgpOiBOb2RlO1xyXG4gIHBhcmVudDogVk5vZGVJbnRlcmZhY2UgfCBudWxsO1xyXG4gIGNoaWxkcmVuOiBBcnJheTxWTm9kZUludGVyZmFjZSB8IG5ldmVyPjtcclxuICB0eXBlOiBzdHJpbmc7XHJcbiAgbm9kZT86IENoaWxkTm9kZTtcclxuICByZW1vdmVGcm9tRE9NKCk6IHZvaWQ7XHJcbiAgZGlmZkFuZFBhdGNoKG5ld05vZGU6IFZOb2RlSW50ZXJmYWNlKTogdm9pZDtcclxufVxyXG5cclxuY2xhc3MgRWxlbWVudFZOb2RlIGV4dGVuZHMgVk5vZGUgaW1wbGVtZW50cyBWTm9kZUludGVyZmFjZSB7XHJcbiAgdHlwZSA9IFwiRWxlbWVudFwiO1xyXG4gIG5vZGUgPSBudWxsIGFzIGFueTtcclxuICBjaGlsZHJlbjogVk5vZGVJbnRlcmZhY2VbXTtcclxuICBwYXJlbnQ6IFZOb2RlSW50ZXJmYWNlID0gbnVsbCBhcyBhbnk7XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSB0YWc6IHN0cmluZyxcclxuICAgIHByaXZhdGUgcHJvcHM6IFJlY29yZDxzdHJpbmcsIGFueT4sXHJcbiAgICBjaGlsZHJlbjogVk5vZGVJbnRlcmZhY2VbXVxyXG4gICkge1xyXG4gICAgc3VwZXIoKTtcclxuICAgIHRoaXMuY2hpbGRyZW4gPSBjaGlsZHJlbi5tYXAoKGNoaWxkKSA9PiB7XHJcbiAgICAgIGlmIChBcnJheS5pc0FycmF5KGNoaWxkKSkgcmV0dXJuIG5ldyBGcmFnbWVudFZOb2RlKGNoaWxkKTtcclxuICAgICAgaWYgKGNoaWxkIGluc3RhbmNlb2YgVk5vZGUpIHtcclxuICAgICAgICByZXR1cm4gY2hpbGQ7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKGNoaWxkIGluc3RhbmNlb2YgTm9kZSkge1xyXG4gICAgICAgIHJldHVybiBuZXcgTGl2ZU5vZGVWTm9kZShjaGlsZCk7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKCF0cnV0aHkoY2hpbGQpKSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBOdWxsVk5vZGUoKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgcmV0dXJuIG5ldyBUZXh0Vk5vZGUoY2hpbGQpO1xyXG4gICAgfSk7XHJcbiAgICB0aGlzLmNoaWxkcmVuLmZvckVhY2goKGNoaWxkKSA9PiAoY2hpbGQucGFyZW50ID0gdGhpcykpO1xyXG4gIH1cclxuICB0b1N0cmluZygpIHtcclxuICAgIHJldHVybiBhc0h0bWxTdHJpbmcodGhpcy50YWcsIHRoaXMucHJvcHMsIHRoaXMuY2hpbGRyZW4pO1xyXG4gIH1cclxuICBhc05vZGUoKSB7XHJcbiAgICBjb25zdCBub2RlID0gYXNOb2RlKHRoaXMudGFnLCB0aGlzLnByb3BzLCB0aGlzLmNoaWxkcmVuKVswXTtcclxuICAgIHRoaXMubm9kZSA9IG5vZGU7XHJcbiAgICByZXR1cm4gbm9kZTtcclxuICB9XHJcbiAgcmVtb3ZlRnJvbURPTSgpIHtcclxuICAgIHRoaXMubm9kZS5wYXJlbnRFbGVtZW50LnJlbW92ZUNoaWxkKHRoaXMubm9kZSk7XHJcbiAgfVxyXG4gIGRpZmZBbmRQYXRjaChuZXdOb2RlOiBFbGVtZW50Vk5vZGUpIHtcclxuICAgIGlmIChuZXdOb2RlLnRhZyA9PT0gdGhpcy50YWcpIHtcclxuICAgICAgbmV3Tm9kZS5ub2RlID0gdGhpcy5ub2RlO1xyXG4gICAgICAvLyAgICAgIHBhdGNoIHByb3BzLFxyXG4gICAgICAvLyB1cGRhdGUgcHJvcHMgZm9ybSBuZXcgbm9kZVxyXG4gICAgICBPYmplY3QuZW50cmllcyhuZXdOb2RlLnByb3BzKVxyXG4gICAgICAgIC5maWx0ZXIoKFtrLCB2XSkgPT4gdGhpcy5wcm9wc1trXSAhPT0gdilcclxuICAgICAgICAuZm9yRWFjaCgoW2tleSwgdmFsdWVdKSA9PiB7XHJcbiAgICAgICAgICBpZiAodmFsdWUgPT09IHRydWUpIG5ld05vZGUubm9kZS5zZXRBdHRyaWJ1dGUoa2V5LCBcIlwiKTtcclxuICAgICAgICAgIGVsc2UgaWYgKHZhbHVlID09PSBudWxsIHx8IHZhbHVlID09PSB1bmRlZmluZWQgfHwgdmFsdWUgPT09IGZhbHNlKVxyXG4gICAgICAgICAgICBuZXdOb2RlLm5vZGUucmVtb3ZlQXR0cmlidXRlKGtleSk7XHJcbiAgICAgICAgICBlbHNlIG5ld05vZGUubm9kZS5zZXRBdHRyaWJ1dGUoa2V5LCB2YWx1ZSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAvLyByZW1vdmUgb2xkLCBvYnNvbGF0ZSBhdHRyaWJ1dGVzXHJcbiAgICAgIE9iamVjdC5lbnRyaWVzKHRoaXMucHJvcHMpXHJcbiAgICAgICAgLmZpbHRlcigoW2ssIHZdKSA9PiAhbmV3Tm9kZS5wcm9wcy5oYXNPd25Qcm9wZXJ0eShrKSlcclxuICAgICAgICAuZm9yRWFjaCgoW2tleSwgdmFsdWVdKSA9PiB7XHJcbiAgICAgICAgICB0aGlzLm5vZGUucmVtb3ZlQXR0cmlidXRlKGtleSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAvLyBjaGlsZHJlbiA9PiBpdGVyIGFuZCBwYXRjaFxyXG4gICAgICAvLyBvbGQgY2hpbGRyZW4gYmVpbmcgbW9kaWZpZWRcclxuICAgICAgZGlmZkFuZFBhdGNoQ2hpbGRyZW4odGhpcywgbmV3Tm9kZSk7XHJcbiAgICB9XHJcbiAgICAvLyB0YWcgaGFzIGNoYW5nZWRcclxuICAgIGVsc2Uge1xyXG4gICAgICB0aGlzLm5vZGUucmVwbGFjZVdpdGgobmV3Tm9kZS5hc05vZGUoKSk7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG5jbGFzcyBGcmFnbWVudFZOb2RlIGV4dGVuZHMgVk5vZGUgaW1wbGVtZW50cyBWTm9kZUludGVyZmFjZSB7XHJcbiAgdHlwZSA9IFwiRnJhZ21lbnRcIjtcclxuICBjaGlsZHJlbjogVk5vZGVJbnRlcmZhY2VbXTtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBjaGlsZHJlbjogQXJyYXk8XHJcbiAgICAgIFZOb2RlSW50ZXJmYWNlIHwgQ2hpbGROb2RlIHwgc3RyaW5nIHwgYm9vbGVhbiB8IG51bGwgfCB1bmRlZmluZWQgfCBudW1iZXJcclxuICAgID5cclxuICApIHtcclxuICAgIHN1cGVyKCk7XHJcblxyXG4gICAgdGhpcy5jaGlsZHJlbiA9IGNoaWxkcmVuLm1hcCgoY2hpbGQpID0+IHtcclxuICAgICAgaWYgKEFycmF5LmlzQXJyYXkoY2hpbGQpKSByZXR1cm4gbmV3IEZyYWdtZW50Vk5vZGUoY2hpbGQpO1xyXG4gICAgICBpZiAoY2hpbGQgaW5zdGFuY2VvZiBWTm9kZSkgcmV0dXJuIGNoaWxkO1xyXG4gICAgICBpZiAoY2hpbGQgaW5zdGFuY2VvZiBOb2RlKSByZXR1cm4gbmV3IExpdmVOb2RlVk5vZGUoY2hpbGQpO1xyXG4gICAgICBpZiAoIXRydXRoeShjaGlsZCkpIHJldHVybiBuZXcgTnVsbFZOb2RlKCk7XHJcbiAgICAgIHJldHVybiBuZXcgVGV4dFZOb2RlKGNoaWxkIGFzIHN0cmluZyB8IG51bWJlcik7XHJcbiAgICB9KTtcclxuXHJcbiAgICB0aGlzLmNoaWxkcmVuLmZvckVhY2goKGNoaWxkKSA9PiAoY2hpbGQucGFyZW50ID0gdGhpcykpO1xyXG4gIH1cclxuXHJcbiAgYXNOb2RlKCkge1xyXG4gICAgY29uc3Qgbm9kZSA9IGFzTm9kZSh1bmRlZmluZWQsIHt9LCB0aGlzLmNoaWxkcmVuKVswXTtcclxuICAgIGNvbnNvbGUubG9nKHsgbm9kZSB9KTtcclxuXHJcbiAgICByZXR1cm4gbm9kZTtcclxuICB9XHJcblxyXG4gIHRvU3RyaW5nKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuY2hpbGRyZW4ubWFwKChjaGlsZCkgPT4gY2hpbGQudG9TdHJpbmcoKSkuam9pbihcIlwiKTtcclxuICB9XHJcblxyXG4gIC8vIHRvIGxldmVsXHJcbiAgZGlmZkFuZFBhdGNoKG5ld1ZOb2RlOiBGcmFnbWVudFZOb2RlKSB7XHJcbiAgICByZXR1cm4gZGlmZkFuZFBhdGNoQ2hpbGRyZW4odGhpcywgbmV3Vk5vZGUpO1xyXG4gIH1cclxuXHJcbiAgcmVtb3ZlRnJvbURPTSgpIHtcclxuICAgIHRoaXMuY2hpbGRyZW4uZm9yRWFjaCgoY2hpbGQpID0+IGNoaWxkLnJlbW92ZUZyb21ET00oKSk7XHJcbiAgfVxyXG59XHJcblxyXG5jbGFzcyBUZXh0Vk5vZGUgZXh0ZW5kcyBWTm9kZSBpbXBsZW1lbnRzIFZOb2RlSW50ZXJmYWNlIHtcclxuICB0eXBlID0gXCJUZXh0Tm9kZVwiO1xyXG4gIGNoaWxkcmVuID0gW107XHJcbiAgbm9kZTogVGV4dCA9IG51bGwgYXMgYW55O1xyXG4gIHByb3BzOiB7IGNvbnRlbnQ6IGFueSB9O1xyXG4gIHBhcmVudDogVk5vZGVJbnRlcmZhY2UgPSBudWxsIGFzIGFueTtcclxuXHJcbiAgLyoqXHJcbiAgICpcclxuICAgKi9cclxuICBjb25zdHJ1Y3Rvcihjb250ZW50OiBzdHJpbmcgfCBudW1iZXIgfCBib29sZWFuKSB7XHJcbiAgICBzdXBlcigpO1xyXG4gICAgdGhpcy5wcm9wcyA9IHsgY29udGVudCB9OyAvL0BUT0RPOlxyXG4gIH1cclxuXHJcbiAgYXNOb2RlKCkge1xyXG4gICAgY29uc3QgdGV4dE5vZGUgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSh0aGlzLnByb3BzLmNvbnRlbnQpO1xyXG4gICAgdGhpcy5ub2RlID0gdGV4dE5vZGU7XHJcbiAgICByZXR1cm4gdGV4dE5vZGU7XHJcbiAgfVxyXG5cclxuICB0b1N0cmluZygpIHtcclxuICAgIHJldHVybiBzYW5pdGl6ZSh0aGlzLnByb3BzLmNvbnRlbnQpO1xyXG4gIH1cclxuXHJcbiAgZGlmZkFuZFBhdGNoKG5ld05vZGU6IFRleHRWTm9kZSkge1xyXG4gICAgdGhpcy5ub2RlLm5vZGVWYWx1ZSA9IG5ld05vZGUucHJvcHMuY29udGVudDtcclxuICAgIG5ld05vZGUubm9kZSA9IHRoaXMubm9kZTtcclxuICB9XHJcblxyXG4gIHJlbW92ZUZyb21ET00oKSB7XHJcbiAgICB0aGlzLm5vZGUucGFyZW50RWxlbWVudCEucmVtb3ZlQ2hpbGQodGhpcy5ub2RlKTtcclxuICB9XHJcbn1cclxuXHJcbmNsYXNzIE51bGxWTm9kZSBleHRlbmRzIFZOb2RlIGltcGxlbWVudHMgVk5vZGVJbnRlcmZhY2Uge1xyXG4gIHR5cGUgPSBcIk51bGxcIjtcclxuICBjaGlsZHJlbiA9IFtdO1xyXG4gIHBhcmVudDogVk5vZGVJbnRlcmZhY2UgPSBudWxsIGFzIGFueTtcclxuICAvKipcclxuICAgKlxyXG4gICAqL1xyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgc3VwZXIoKTtcclxuICB9XHJcblxyXG4gIGFzTm9kZSgpIHtcclxuICAgIC8vcmV0dXJuIG51bGw7IC8vIHJldHVybiBlbXB0eSBmcmFnbWVudD9cclxuICAgIHJldHVybiBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XHJcbiAgfVxyXG5cclxuICBkaWZmQW5kUGF0Y2gobmV3Tm9kZTI6IE51bGxWTm9kZSkge1xyXG4gICAgcmV0dXJuO1xyXG4gIH1cclxuXHJcbiAgcmVtb3ZlRnJvbURPTSgpIHtcclxuICAgIHJldHVybjtcclxuICB9XHJcblxyXG4gIHRvU3RyaW5nKCkge1xyXG4gICAgcmV0dXJuIFwiXCI7XHJcbiAgfVxyXG59XHJcblxyXG5jbGFzcyBMaXZlTm9kZVZOb2RlIGV4dGVuZHMgVk5vZGUgaW1wbGVtZW50cyBWTm9kZUludGVyZmFjZSB7XHJcbiAgdHlwZSA9IFwiTm9kZVwiO1xyXG4gIGNoaWxkcmVuID0gW107XHJcbiAgcGFyZW50OiBWTm9kZUludGVyZmFjZSA9IG51bGwgYXMgYW55O1xyXG4gIG5vZGU6IENoaWxkTm9kZTtcclxuXHJcbiAgLyoqXHJcbiAgICpcclxuICAgKi9cclxuICBjb25zdHJ1Y3Rvcihub2RlOiBDaGlsZE5vZGUpIHtcclxuICAgIHN1cGVyKCk7XHJcbiAgICB0aGlzLm5vZGUgPSBub2RlO1xyXG4gIH1cclxuXHJcbiAgYXNOb2RlKCkge1xyXG4gICAgcmV0dXJuIHRoaXMubm9kZTtcclxuICB9XHJcblxyXG4gIGRpZmZBbmRQYXRjaChuZXdOb2RlOiBMaXZlTm9kZVZOb2RlKSB7XHJcbiAgICBpZiAobmV3Tm9kZS5ub2RlICE9PSB0aGlzLm5vZGUpIHtcclxuICAgICAgdGhpcy5ub2RlLnJlcGxhY2VXaXRoKG5ld05vZGUubm9kZSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICByZW1vdmVGcm9tRE9NKCkge1xyXG4gICAgdGhpcy5ub2RlLnBhcmVudEVsZW1lbnQhLnJlbW92ZUNoaWxkKHRoaXMubm9kZSk7XHJcbiAgfVxyXG5cclxuICB0b1N0cmluZygpIHtcclxuICAgIHJldHVybiBnZXRPdXRlckh0bWwodGhpcy5ub2RlKTtcclxuICB9XHJcbn1cclxuXHJcbmNsYXNzIFJvb3RWTm9kZSBleHRlbmRzIFZOb2RlIGltcGxlbWVudHMgVk5vZGVJbnRlcmZhY2Uge1xyXG4gIHR5cGUgPSBcIlJvb3RcIjtcclxuICBwYXJlbnQgPSBudWxsO1xyXG4gIG5vZGU6IEVsZW1lbnQ7XHJcbiAgY2hpbGRyZW46IFZOb2RlSW50ZXJmYWNlW107XHJcbiAgLyoqXHJcbiAgICpcclxuICAgKi9cclxuICBjb25zdHJ1Y3Rvcihjb250ZW50LCBkb21Ob2RlOiBFbGVtZW50KSB7XHJcbiAgICBzdXBlcigpO1xyXG4gICAgY29udGVudC5wYXJlbnQgPSB0aGlzO1xyXG4gICAgdGhpcy5jaGlsZHJlbiA9IFtjb250ZW50XTtcclxuICAgIHRoaXMubm9kZSA9IGRvbU5vZGU7XHJcbiAgfVxyXG5cclxuICBhc05vZGUoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5jaGlsZHJlblswXS5hc05vZGUoKTtcclxuICB9XHJcbiAgdG9TdHJpbmcoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5jaGlsZHJlblswXS50b1N0cmluZygpO1xyXG4gIH1cclxuXHJcbiAgZGlmZkFuZFBhdGNoKG5ld1ZOb2RlOiBWTm9kZUludGVyZmFjZSkge1xyXG4gICAgZGlmZkFuZFBhdGNoQ2hpbGRyZW4odGhpcywgbmV3Vk5vZGUpO1xyXG4gIH1cclxuXHJcbiAgcmVtb3ZlRnJvbURPTSgpIHtcclxuICAgIHRoaXMubm9kZS5yZW1vdmUoKTtcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGFzVk5vZGUoXHJcbiAgdGFnOiBzdHJpbmcgfCBGdW5jdGlvbiB8IHVuZGVmaW5lZCxcclxuICBwcm9wczogSnN4UHJvcHNcclxuKTogVk5vZGVJbnRlcmZhY2Uge1xyXG4gIGNvbnNvbGUubG9nKFwiYXNWTm9kZTpcIiwgeyB0YWcsIHByb3BzIH0pO1xyXG5cclxuICBpZiAodHlwZW9mIHRhZyA9PT0gXCJmdW5jdGlvblwiKSB7XHJcbiAgICBsZXQgcmVzdWx0ID0gdGFnKHByb3BzKTtcclxuICAgIGlmIChyZXN1bHQgaW5zdGFuY2VvZiBWTm9kZSkge1xyXG4gICAgICAvL2NvbnNvbGUud2FybihcImFzVk5vZGUgd2l0aCBKc3hOb2RlXCIpO1xyXG4gICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgfVxyXG4gICAgaWYgKHJlc3VsdCBpbnN0YW5jZW9mIE5vZGUpIHtcclxuICAgICAgcmV0dXJuIG5ldyBMaXZlTm9kZVZOb2RlKHJlc3VsdCk7XHJcbiAgICB9XHJcbiAgICAvLyBudWxsIGpzeCBub2RlXHJcbiAgICBpZiAoIXRydXRoeShyZXN1bHQpKSB7XHJcbiAgICAgIHJldHVybiBuZXcgTnVsbFZOb2RlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIG5ldyBUZXh0Vk5vZGUocmVzdWx0KTtcclxuICB9XHJcblxyXG4gIGNvbnN0IHsgY2hpbGRyZW4sIC4uLmF0dHIgfSA9IHByb3BzO1xyXG4gIGlmICh0YWcpIHtcclxuICAgIHJldHVybiBuZXcgRWxlbWVudFZOb2RlKHRhZywgYXR0ciwgY2hpbGRyZW4pOyAvLyBvciBzaW1wbHkgcGFzcyBjaWxkcmVuIHdpdGggcHJvcHNcclxuICB9IGVsc2UgaWYgKCF0cnV0aHkoYXR0cikpIHtcclxuICAgIGNvbnN0IHZOb2RlID0gbmV3IE51bGxWTm9kZSgpO1xyXG4gICAgdk5vZGUucGFyZW50ID0gdGhpcztcclxuICAgIHJldHVybiB2Tm9kZTtcclxuICB9IGVsc2UgaWYgKGNoaWxkcmVuKSB7XHJcbiAgICByZXR1cm4gbmV3IEZyYWdtZW50Vk5vZGUoY2hpbGRyZW4pO1xyXG4gIH1cclxuXHJcbiAgLy8gZWxzZT8gLy8gQFRPRE86P1xyXG59XHJcblxyXG4vKipcclxuICogY29udmVydHMgcHJhZ21hIG9iamVjdCB0byBodG1sIHN0cmluZ1xyXG4gKiBqc3hzIGlzIGFsd2F5cyBjYWxsZWQgd2hlbiBlbGVtZW50IGhhcyBtb3JlIHRoYW4gb25lIGNoaWxkXHJcbiAqXHJcbiAqIEBwYXJhbSB7c3RyaW5nIHwgRnVuY3Rpb259IHRhZyAtIHRhZyBuYW1lIG9yIHRhZyBjbGFzc1xyXG4gKiBAcGFyYW0ge09iamVjdCB8IG51bGx9IHByb3BzIC0gcHJvcHMgZm9yIHRoZSB0YWdcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBqc3hzKFxyXG4gIHRhZzogc3RyaW5nIHwgRnVuY3Rpb24sXHJcbiAgcHJvcHM6IEpzeFByb3BzXHJcbik6IEpzeE5vZGVJbnRlcmZhY2Uge1xyXG4gIHByb3BzLmNoaWxkcmVuID0gcHJvcHMuY2hpbGRyZW4uZmxhdCgpOyAvLyBAVE9ETzogZG9jXHJcblxyXG4gIC8vIGlmIHJlZiBwcm9wIGlzIHByb3ZpZGVkLCBtZW1vcml6ZSBhbmQgcmVtb3ZlIGZyb20gdGhlIGh0bWwgZ2VuZXJhdGlvbiBwcm9jZXNzXHJcbiAgLypjb25zdCByZWY6IEZ1bmN0aW9uIHwgbnVsbCA9XHJcbiAgICB0eXBlb2YgcHJvcHMucmVmID09PSBcImZ1bmN0aW9uXCIgPyBwcm9wcy5yZWYgOiBudWxsO1xyXG4gIGlmIChyZWYpIGRlbGV0ZSBwcm9wcy5yZWY7IC8vIEBUT0RPOiovXHJcblxyXG4gIHJldHVybiBhc1ZOb2RlKHRhZywgcHJvcHMpO1xyXG59XHJcblxyXG4vKipcclxuICogY29udmVydHMgdGhlIGZyYWdtZW50cyBvYmplY3QgdG8gbm9kZXNcclxuICpcclxuICogQHBhcmFtIHtPYmplY3R9IHByb3BzXHJcbiAqIEBwYXJhbSB7QXJyYXl9IHByb3BzLmNoaWxkcmVuIC0gY2hpbGQgZWxlbWVudHMgaW4gdGhlIGZyYWdtZW50XHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gRnJhZ21lbnQocHJvcHM6IEpzeFByb3BzKSB7XHJcbiAgcmV0dXJuIGFzVk5vZGUodW5kZWZpbmVkLCBwcm9wcyk7XHJcbn1cclxuXHJcbi8vIGpzeCBpcyBjYWxsZWQgd2hlbiB0aGUgZWxlbWVudCBoYXMgb25lIG9yIHplcm8gY2hpbGRyZW5cclxuZXhwb3J0IGZ1bmN0aW9uIGpzeChcclxuICB0YWc6IHN0cmluZyB8IEZ1bmN0aW9uLFxyXG4gIHByb3BzOiBBdHRyaWJ1dGVzICZcclxuICAgIFNwZWNpYWxBdHRyaWJ1dGVzICYgeyBjaGlsZHJlbj86IHN0cmluZyB8IE5vZGUgfCBKc3hOb2RlSW50ZXJmYWNlIH1cclxuKTogSnN4Tm9kZUludGVyZmFjZSB7XHJcbiAgLy8gQHRzLWlnbm9yZSAtIHdyYXBwaW5nIHRoZSBjaGlsZHJlbiBhcyBhcnJheSB0byByZS11c2UganN4cyBtZXRob2RcclxuICBwcm9wcy5jaGlsZHJlbiA9IHByb3BzLmhhc093blByb3BlcnR5KFwiY2hpbGRyZW5cIikgPyBbcHJvcHMuY2hpbGRyZW5dIDogW107XHJcblxyXG4gIHJldHVybiBqc3hzKHRhZywgKHByb3BzIGFzIHVua25vd24pIGFzIEpzeFByb3BzKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIHJlbmRlciB0aGUgZ2l2ZW4gbWFya3VwIGludG8gdGhlIGdpdmVuIGRvbSBub2RlXHJcbiAqXHJcbiAqIEBwYXJhbSB7c3RyaW5nfEhUTUxFbGVtZW50fEpTWH0gbWFya3VwIC0gaHRtbCBhcyBzdHJpbmcsIGh0bWwgZWxlbWVudCBvciBqc3ggdGVtcGxhdGVcclxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZG9tTm9kZSAtIGNvbnRhaW5lciBmb3IgdGhlIHRlbXBsYXRlIHRvIGJlIHJlbmRlcmVkIGludG9cclxuICogQHBhcmFtIHtib29sZWFufSBbYXBwZW5kPWZhbHNlXSAtIHNob3VsZCB0aGUgcHJvdmlkZWQgbWFya3VwIGJlIGFwcGVuZGVkIHRvIHRoZSBleGlzdGluZyBtYXJrdXAsIG9yIGRlZmF1bHQgcmVwbGFjZSBpdFxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHJlbmRlcihcclxuICBtYXJrdXA6IHN0cmluZyB8IEhUTUxFbGVtZW50IHwgSnN4Tm9kZUludGVyZmFjZSwgLy8gQFRPRE86IHNwZWNpZmljIHN1cHBvcnQgZm9yIFRlbXBsYXRlPyAoLmNvbnRlbnQuY2xvbmUpXHJcbiAgZG9tTm9kZTogSFRNTEVsZW1lbnQsXHJcbiAgYXBwZW5kOiBib29sZWFuID0gZmFsc2VcclxuKSB7XHJcbiAgQXJyYXkuZnJvbShkb2N1bWVudC5ib2R5LnF1ZXJ5U2VsZWN0b3JBbGwoXCIqXCIpKS5mb3JFYWNoKFxyXG4gICAgKGVsKSA9PiAoZWwuc3R5bGUuYmFja2dyb3VuZCA9IFwiI2NjZmZjY1wiKVxyXG4gICk7XHJcblxyXG4gIGNvbnN0IGlzUmVSZW5kZXIgPSByZW5kZXJlZFZUcmVlcy5oYXMoZG9tTm9kZSk7XHJcbiAgaWYgKCFhcHBlbmQgJiYgIWlzUmVSZW5kZXIpIGRvbU5vZGUuaW5uZXJIVE1MID0gXCJcIjtcclxuXHJcbiAgaWYgKHR5cGVvZiBtYXJrdXAgPT09IFwic3RyaW5nXCIpIHtcclxuICAgIGRvbU5vZGUuaW5zZXJ0QWRqYWNlbnRIVE1MKFwiYmVmb3JlZW5kXCIsIG1hcmt1cCk7IC8vIHNhbml0aXplP1xyXG4gIH0gZWxzZSBpZiAobWFya3VwIGluc3RhbmNlb2YgTm9kZSkge1xyXG4gICAgZG9tTm9kZS5pbnNlcnRBZGphY2VudEVsZW1lbnQoXCJiZWZvcmVlbmRcIiwgbWFya3VwKTtcclxuICB9IGVsc2UgaWYgKG1hcmt1cCBpbnN0YW5jZW9mIFZOb2RlKSB7XHJcbiAgICBzdmdDb250ZXh0ID0gZmFsc2U7XHJcblxyXG4gICAgY29uc3QgdlRyZWUgPSBuZXcgUm9vdFZOb2RlKG1hcmt1cCwgZG9tTm9kZSk7XHJcblxyXG4gICAgY29uc29sZS5sb2coXCIjIyMjIyMjIyMjI1xcblwiLCBcInZUcmVlOlwiLCB2VHJlZSk7XHJcblxyXG4gICAgaWYgKGlzUmVSZW5kZXIpIHtcclxuICAgICAgY29uc29sZS5sb2coXCJpcyByZS1yZW5kZXJcIik7XHJcbiAgICAgIGNvbnN0IG9sZFZUcmVlID0gcmVuZGVyZWRWVHJlZXMuZ2V0KGRvbU5vZGUpO1xyXG5cclxuICAgICAgY29uc29sZS5sb2coXCIjIyMjIyMjIyMjI1xcblwiLCB7IG9sZFZUcmVlLCBuZXdWVHJlZTogdlRyZWUgfSk7XHJcblxyXG4gICAgICAvLyBkaWZmXHJcbiAgICAgIG9sZFZUcmVlLmRpZmZBbmRQYXRjaCh2VHJlZSk7XHJcblxyXG4gICAgICByZW5kZXJlZFZUcmVlcy5zZXQoZG9tTm9kZSwgdlRyZWUpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY29uc3QgY29udGVudCA9IHZUcmVlLmFzTm9kZSgpO1xyXG4gICAgICBkb21Ob2RlLmFwcGVuZChjb250ZW50KTtcclxuICAgIH1cclxuXHJcbiAgICByZW5kZXJlZFZUcmVlcy5zZXQoZG9tTm9kZSwgdlRyZWUpO1xyXG5cclxuICAgIHdoaWxlIChyZWZzVG9DYWxsLmxlbmd0aCkge1xyXG4gICAgICAvLyByZW1vdmUgZmlyc3QgZnJvbSBsaXN0LCBhbmQgaW52b2tlIGl0XHJcbiAgICAgIHJlZnNUb0NhbGwuc3BsaWNlKDAsIDEpWzBdKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8vL21hcmt1cFtfY2FsbFJlZnNdKCk7XHJcbiAgfSBlbHNlIHtcclxuICAgIHRocm93IG5ldyBFcnJvcihcInJlbmRlciBtZXRob2QgY2FsbGVkIHdpdGggd3JvbmcgYXJndW1lbnQocylcIik7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gcmF3SHRtbChjb250ZW50OiBzdHJpbmcpOiBWTm9kZUludGVyZmFjZSB7XHJcbiAgcmV0dXJuIG5ldyAoY2xhc3MgZXh0ZW5kcyBWTm9kZSBpbXBsZW1lbnRzIFZOb2RlSW50ZXJmYWNlIHtcclxuICAgIHBhcmVudDogVk5vZGVJbnRlcmZhY2UgPSBudWxsIGFzIGFueTtcclxuICAgIGNoaWxkcmVuID0gW107XHJcbiAgICB0eXBlID0gXCJSYXdIdG1sXCI7XHJcbiAgICBjaGlsZE5vZGVzOiBDaGlsZE5vZGVbXTtcclxuICAgIGNvbnRlbnQ6IHN0cmluZztcclxuICAgIG5vZGU/OiBDaGlsZE5vZGU7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKlxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3Rvcihjb250ZW50OiBzdHJpbmcpIHtcclxuICAgICAgc3VwZXIoKTtcclxuICAgICAgdGhpcy5jb250ZW50ID0gY29udGVudDtcclxuICAgIH1cclxuICAgIHJlbW92ZUZyb21ET00oKSB7XHJcbiAgICAgIHRoaXMuY2hpbGROb2Rlcy5mb3JFYWNoKChub2RlKSA9PiBub2RlLnBhcmVudEVsZW1lbnQhLnJlbW92ZUNoaWxkKG5vZGUpKTtcclxuICAgIH1cclxuXHJcbiAgICBkaWZmQW5kUGF0Y2gobmV3Tm9kZTogVk5vZGVJbnRlcmZhY2UpIHtcclxuICAgICAgaWYgKChuZXdOb2RlLmNvbnRlbnQgPSB0aGlzLmNvbnRlbnQpKSB7XHJcbiAgICAgICAgbmV3Tm9kZS5ub2RlID0gdGhpcy5ub2RlO1xyXG4gICAgICAgIG5ld05vZGUuY2hpbGROb2RlcyA9IHRoaXMuY2hpbGROb2RlcztcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuICAgICAgdGhpcy5yZW1vdmVGcm9tRE9NKCk7XHJcbiAgICAgIGluc2VydE5ld0l0ZW0obmV3Tm9kZSk7XHJcbiAgICB9XHJcblxyXG4gICAgdG9TdHJpbmcoKSB7XHJcbiAgICAgIHJldHVybiBjb250ZW50O1xyXG4gICAgfVxyXG5cclxuICAgIGFzTm9kZSgpIHtcclxuICAgICAgY29uc3QgdGVtcGxhdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGVtcGxhdGVcIik7XHJcbiAgICAgIHRlbXBsYXRlLmlubmVySFRNTCA9IHRoaXMuY29udGVudDtcclxuICAgICAgY29uc3QgZG9jdW1lbnRGcmFnbWVudCA9IHRlbXBsYXRlLmNvbnRlbnQ7XHJcbiAgICAgIHRoaXMuY2hpbGROb2RlcyA9IEFycmF5LmZyb20oZG9jdW1lbnRGcmFnbWVudC5jaGlsZE5vZGVzKTtcclxuXHJcbiAgICAgIC8vIGJhc2ljYWxseSB0aGUgYC5ub2RlYCBwcm9wZXJ0eSBpcyB1c2VkIHRvIGRldGVybWluZSB0aGUgbGFzdCBodG1sIG5vZGUgb2YgdGhlIFZOb2RlLFxyXG4gICAgICAvLyB0byBwb3NpdGlvbiB0aGUgbmV4dCBWTm9kZSdzIERPTSBOb2RlIGFmdGVyIGl0LlxyXG4gICAgICAvLyB0aGVyZWZvcmUgLm5vZGUgcmV0dXJucyB0aGUgbGFzdCBub2RlIG9mIHRoZSByYXcgaHRtbFxyXG4gICAgICBpZiAodGhpcy5jaGlsZE5vZGVzLmxlbmd0aClcclxuICAgICAgICB0aGlzLm5vZGUgPSB0aGlzLmNoaWxkTm9kZXNbdGhpcy5jaGlsZE5vZGVzLmxlbmd0aCAtIDFdO1xyXG4gICAgICByZXR1cm4gZG9jdW1lbnRGcmFnbWVudDtcclxuICAgIH1cclxuICAgIGFzVk5vZGUoKSB7XHJcbiAgICAgIHJldHVybiB7fTtcclxuICAgIH1cclxuXHJcbiAgICBbX2NhbGxSZWZzXSgpIHtcclxuICAgICAgLy8gbm9vcFxyXG4gICAgfVxyXG4gIH0pKGNvbnRlbnQpO1xyXG59XHJcblxyXG4vLyBnb3RjaHNhczpcclxuLy8gLSBzdHlsZXMgd2lsbCBvdmVycmlkZSAoY291bGQgZG86IHNldHRpbmcgZWFjaCBydWxlIGluZGl2aWR1YWxseSlcclxuXHJcbi8vIEBUT0RPOiByZWYgY2FsbHNcclxuLy8gQFRPRE86IHJlLXJlbmRlciBzdWIgdHJlZXMgKC5ub2RlID0gYWRkIHRvIG1hcClcclxuIiwiaW1wb3J0IHsgcmVuZGVyLCByYXdIdG1sIH0gZnJvbSBcIi4vanN4L2pzeC1ydW50aW1lXCI7XHJcblxyXG5jb25zdCB4c3MgPSBcIjxpbWcgc3JjPXggb25lcnJvcj1cXFwiYWxlcnQoJ1hTUyBBdHRhY2snKVxcXCI+XCI7IC8vXCI8c2NyaXB0PmFsZXJ0KCctLi0nKTwvc2NyaXB0PlwiO1xyXG5cclxuZnVuY3Rpb24gUlRFKHByb3BzOiAvKnsgdHh0LCBcIm9uLWNsaWNrXCI6IG9uQ2xpY2sgfSovIHtcclxuICB0eHQ6IHN0cmluZztcclxuICByZWY/OiBGdW5jdGlvbjtcclxufSkge1xyXG4gIGNvbnNvbGUubG9nKFwib25DbGlja1wiLCBwcm9wc1tcIm9uLWNsaWNrXCJdKTtcclxuICByZXR1cm4gKFxyXG4gICAgPHAgcmVmPXsoZWw6IEhUTUxFbGVtZW50KSA9PiBjb25zb2xlLmxvZyhcIm15IGRpdiA6OnJlZjo6My4yXCIsIGVsKX0+XHJcbiAgICAgIHtwcm9wcy50eHR9XHJcbiAgICA8L3A+XHJcbiAgKTtcclxufVxyXG5cclxuZnVuY3Rpb24gQnV0dG9uKHtcclxuICBjaGlsZHJlbixcclxuICBkaXNhYmxlZCxcclxufToge1xyXG4gIGNoaWxkcmVuOiBhbnk7XHJcbiAgZGlzYWJsZWQ6IGJvb2xlYW47XHJcbiAgcmVmPzogRnVuY3Rpb247XHJcbn0pIHtcclxuICByZXR1cm4gKFxyXG4gICAgPGJ1dHRvblxyXG4gICAgICBkaXNhYmxlZD17ZGlzYWJsZWR9XHJcbiAgICAgIHJlZj17KGVsOiBIVE1MRWxlbWVudCkgPT4gY29uc29sZS5sb2coXCJteSBidXR0b24gOjpyZWY6OjFcIiwgZWwpfVxyXG4gICAgPlxyXG4gICAgICA8c3BhbiByZWY9eyhlbDogSFRNTEVsZW1lbnQpID0+IGNvbnNvbGUubG9nKFwibXkgYSA6OnJlZjo6MlwiLCBlbCl9PlxyXG4gICAgICAgIEJ0bi1zcGFuLWZpcnN0XHJcbiAgICAgIDwvc3Bhbj5cclxuICAgICAge2NoaWxkcmVufVxyXG4gICAgICA8PlxyXG4gICAgICAgIDxzcGFuIHJlZj17KGVsOiBIVE1MRWxlbWVudCkgPT4gY29uc29sZS5sb2coXCJteSBhIDo6cmVmOjozXCIsIGVsKX0+XHJcbiAgICAgICAgICBCdG4tc3Bhbi1lbmRcclxuICAgICAgICA8L3NwYW4+XHJcbiAgICAgIDwvPlxyXG4gICAgPC9idXR0b24+XHJcbiAgKTtcclxufVxyXG5cclxuZnVuY3Rpb24gcmVmbG9nKGVsOiBIVE1MRWxlbWVudCkge1xyXG4gIGNvbnNvbGUubG9nKFwibXkgaW5uZXIgZGl2OjpyZWY6OjhcIiwgZWwpO1xyXG59XHJcblxyXG4vKlxyXG5jb25zdCBtYXJrdXAgPSAoXHJcbiAgPD5cclxuICAgIDxkaXZcclxuICAgICAgY2xhc3M9XCJmb29cIlxyXG4gICAgICByZWY9eyhlbDogSFRNTEVsZW1lbnQpID0+IGNvbnNvbGUubG9nKFwibXkgZGl2IDo6cmVmOjo0XCIsIGVsKX1cclxuICAgIC8+XHJcbiAgICA8aW5wdXQgZGlzYWJsZWQ9e3RydWV9IGhpZGRlbj17ZmFsc2V9IC8+XHJcbiAgICA8QnV0dG9uXHJcbiAgICAgIGRpc2FibGVkPXt0cnVlfVxyXG4gICAgICByZWY9eyhlbDogSFRNTEVsZW1lbnQpID0+IGNvbnNvbGUubG9nKFwibXkgQlVUVE9OOjpyZWY6OjVcIiwgZWwpfVxyXG4gICAgPlxyXG4gICAgICB0ZXh0XHJcbiAgICAgIDxwb3B1cC1pbmZvXHJcbiAgICAgICAgcmVmPXsoZWw6IEhUTUxFbGVtZW50KSA9PiBjb25zb2xlLmxvZyhcInNwYW4gaW4gQlVUVE9OOjpyZWY6OjZcIiwgZWwpfVxyXG4gICAgICA+XHJcbiAgICAgICAgYmxhXHJcbiAgICAgIDwvcG9wdXAtaW5mbz5cclxuICAgIDwvQnV0dG9uPlxyXG4gICAgPFJURVxyXG4gICAgICB0eHQ9XCJsZSB0ZXh0XCJcclxuICAgICAgcmVmPXsoZWw6IEhUTUxFbGVtZW50KSA9PiBjb25zb2xlLmxvZyhcIm15IGRpdiA6OnJlZjo6My4xXCIsIGVsKX1cclxuICAgICAgb24tY2xpY2s9eyhlOiBIVE1MRWxlbWVudCkgPT4gY29uc29sZS5sb2coZSl9XHJcbiAgICAvPlxyXG4gICAge3hzc31cclxuICAgIHtyYXdIdG1sKGA8b2w+PGxpPnJhdyBodG1sPC9saT48L29sPmApfVxyXG4gICAgPGRpdlxyXG4gICAgICBjbGFzcz1cImJhbVwiXHJcbiAgICAgIHJlZj17KGVsOiBIVE1MRWxlbWVudCkgPT4gY29uc29sZS5sb2coXCJteSBkaXY6OnJlZjo6N1wiLCBlbCl9XHJcbiAgICA+XHJcbiAgICAgIDxkaXY+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cImJhclwiIG9uLWNsaWNrPXsoZSkgPT4gY29uc29sZS5sb2coZSl9IHJlZj17cmVmbG9nfT5cclxuICAgICAgICAgIGNsaWNrIE1FXHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPGRpdiBzdHlsZT17eyBvdXRsaW5lOiBcIjFweCBzb2xpZCByZWQ7XCIgfX0+XHJcbiAgICAgICAgICB7ZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNvbGRcIil9XHJcbiAgICAgICAgICB7bnVsbH1cclxuICAgICAgICAgIHtbMCwgMV0ubWFwKChuKSA9PiAoXHJcbiAgICAgICAgICAgIDxzcGFuPntufTwvc3Bhbj5cclxuICAgICAgICAgICkpfVxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICA8L2Rpdj5cclxuICAgIDwvZGl2PlxyXG4gIDwvPlxyXG4pO1xyXG5cclxuKi9cclxuXHJcbi8qXHJcbmNvbnN0IG1hcmt1cCA9IChcclxuICA8QnV0dG9uIGRpc2FibGVkPXt0cnVlfT5cclxuICAgICAgPGJvbGQgcmVmPXtyZWZsb2d9Pi0tSU5ORVItLTwvYm9sZD5cclxuICA8L0J1dHRvbj5cclxuKTsqL1xyXG4vKlxyXG5cclxuY29uc3QgbWFya3VwID0gKFxyXG4gIDxkaXYgY2xhc3M9XCJmb29cIiByZWY9eyhlbDogSFRNTEVsZW1lbnQpID0+IGNvbnNvbGUubG9nKFwibXkgZGl2OjpyZWY6OlwiLCBlbCl9PlxyXG4gICAgPGRpdj5cclxuICAgICAgPGRpdiBjbGFzcz1cImJhclwiIHJlZj17KGVsOiBIVE1MRWxlbWVudCkgPT4gY29uc29sZS5sb2coXCJteSBpbm5lciBkaXY6OnJlZjo6XCIsIGVsKX0gLz5cclxuICAgIDwvZGl2PlxyXG4gICAgPEJ1dHRvbiBkaXNhYmxlZD17dHJ1ZX0+PC9CdXR0b24+XHJcbiAgPC9kaXY+XHJcbik7XHJcbiovXHJcbi8qXHJcbmNvbnN0IG1hcmt1cCA9IChcclxuICA8YT5cclxuICAgIDxiPlxyXG4gICAgICA8YyBjbGFzcz1cImJhclwiIHJlZj17cmVmbG9nfSAvPlxyXG4gICAgPC9iPlxyXG4gIDwvYT5cclxuKTtcclxuKi9cclxuXHJcbmZ1bmN0aW9uIFNwYW4oeyBtb2RlIH06IHsgbW9kZTogYW55IH0pIHtcclxuICByZXR1cm4gbW9kZSA9PT0gMSA/IChcclxuICAgIDxkaXY+XHJcbiAgICAgIDxzcGFuIGlkPVwiaW5uZXJcIiBvbGQ9e3RydWV9PlxyXG4gICAgICAgIFNwYW4tQ29tcC0tb2xkXHJcbiAgICAgIDwvc3Bhbj5cclxuICAgICAgPGgzPnRvIGJlIHJlbW92ZWQ8L2gzPlxyXG4gICAgPC9kaXY+XHJcbiAgKSA6IChcclxuICAgIDxkaXY+XHJcbiAgICAgIDxwIGlkPVwiaW5uZXJcIiBuZXc9e3RydWV9PlxyXG4gICAgICAgIFNwYW4tQ29tcC0tbmV3c1xyXG4gICAgICA8L3A+XHJcbiAgICA8L2Rpdj5cclxuICApO1xyXG59XHJcblxyXG5mdW5jdGlvbiBDb21wKHsgbnVtIH0pIHtcclxuICBpZiAobnVtID09PSAxKSByZXR1cm4gbnVsbDtcclxuICByZXR1cm4gKFxyXG4gICAgPGRpdj5cclxuICAgICAgPHA+Y29tcDwvcD5cclxuICAgIDwvZGl2PlxyXG4gICk7XHJcbn1cclxuXHJcbmNvbnN0IG1hcmt1cDEgPSAobnVtOiBhbnkpID0+IChcclxuICA8ZGl2IGlkPVwib3V0ZXJcIiBkYXRhLWZvbz1cImJhclwiIGRhdGEtdmFyPXtudW19PlxyXG4gICAgPGgzPnNob3VsZCBnZXQgMiAtOiAzPC9oMz5cclxuICAgIHtudW0gPT09IDEgPyAoXHJcbiAgICAgIDx1bCBjbGFzcz1cInVsLWNsYXNzXCI+XHJcbiAgICAgICAgPGxpPlRleHQgMSA8L2xpPlxyXG4gICAgICAgIDxsaT5UZXh0IDIgPC9saT5cclxuICAgICAgPC91bD5cclxuICAgICkgOiAoXHJcbiAgICAgIDx1bCBjbGFzcz1cInVsLWNsYXNzXCI+XHJcbiAgICAgICAgPGxpPlRleHQgMyA8L2xpPlxyXG4gICAgICAgIDxsaT5UZXh0IDIgPC9saT5cclxuICAgICAgICA8bGk+VGV4dCAxIDwvbGk+XHJcbiAgICAgIDwvdWw+XHJcbiAgICApfVxyXG4gICAgPGgzPnNob3VsZCBnZXQgMyAtOiAyPC9oMz5cclxuICAgIHtudW0gPT09IDEgPyAoXHJcbiAgICAgIDx1bCBjbGFzcz1cInVsLWNsYXNzXCI+XHJcbiAgICAgICAgPGxpPlRleHQgMSA8L2xpPlxyXG4gICAgICAgIDxsaT5UZXh0IDIgPC9saT5cclxuICAgICAgICA8bGk+VGV4dCAzIDwvbGk+XHJcbiAgICAgIDwvdWw+XHJcbiAgICApIDogKFxyXG4gICAgICA8dWwgY2xhc3M9XCJ1bC1jbGFzc1wiPlxyXG4gICAgICAgIDxsaT5UZXh0IDEgPC9saT5cclxuICAgICAgICA8bGk+VGV4dCAyIDwvbGk+XHJcbiAgICAgIDwvdWw+XHJcbiAgICApfVxyXG4gICAge251bSA9PT0gMSA/IG51bGwgOiA8cD5uZXcgcmVuZGVyPC9wPn1cclxuICAgIDxkaXY+XHJcbiAgICAgIDxzcGFuPnNwYW4tY29udGVudDwvc3Bhbj5cclxuICAgIDwvZGl2PlxyXG4gICAgPFNwYW4gbW9kZT17bnVtfSAvPlxyXG4gICAgey8qZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNvbGRcIikqL31cclxuICAgIDw+RnJhZ21lbnQtaXRlbTwvPlxyXG4gICAgPHN2Z1xyXG4gICAgICB2aWV3Qm94PVwiMCAwIDMwMCAxMDBcIlxyXG4gICAgICB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCJcclxuICAgICAgc3Ryb2tlPVwicmVkXCJcclxuICAgICAgZmlsbD1cImdyZXlcIlxyXG4gICAgPlxyXG4gICAgICA8Y2lyY2xlIGN4PVwiNTBcIiBjeT1cIjUwXCIgcj1cIjQwXCIgLz5cclxuICAgICAgPGNpcmNsZSBjeD1cIjE1MFwiIGN5PVwiNTBcIiByPVwiNFwiIC8+XHJcblxyXG4gICAgICA8c3ZnIHZpZXdCb3g9XCIwIDAgMTAgMTBcIiB4PVwiMjAwXCIgd2lkdGg9XCIxMDBcIj5cclxuICAgICAgICA8Y2lyY2xlIGN4PVwiNVwiIGN5PVwiNVwiIHI9XCI0XCIgLz5cclxuICAgICAgPC9zdmc+XHJcbiAgICA8L3N2Zz5cclxuICA8L2Rpdj5cclxuKTtcclxuXHJcbmZ1bmN0aW9uIG1hcmt1cDIobnVtOiBhbnkpIHtcclxuICByZXR1cm4gKFxyXG4gICAgPGRpdiBpZD1cIm91dGVyXCI+XHJcbiAgICAgIDw+XHJcbiAgICAgICAgPD5cclxuICAgICAgICAgIDxwPm5lc3RlZCBmcmFnbWVudDwvcD5cclxuICAgICAgICA8Lz5cclxuICAgICAgPC8+XHJcbiAgICAgIDxoMT5zdGF0aWM8L2gxPlxyXG4gICAgICA8aDE+ZHluYW1pYyB2YWw6IHtudW19PC9oMT5cclxuICAgICAge251bSA9PT0gMSA/IDxoMT5vbGQ8L2gxPiA6IGZhbHNlfVxyXG4gICAgICB7bnVtID09PSAxID8gKFxyXG4gICAgICAgIDw+XHJcbiAgICAgICAgICA8aDE+ZnJhZyBvbGQ8L2gxPlxyXG4gICAgICAgICAgPHNwYW4+ZnJhZyBzcGFuIG9sZDwvc3Bhbj5cclxuICAgICAgICA8Lz5cclxuICAgICAgKSA6IChcclxuICAgICAgICA8aDE+ZnJhZyBuZXc8L2gxPlxyXG4gICAgICApfVxyXG4gICAgICA8Q29tcCBudW09e251bX0gLz5cclxuICAgIDwvZGl2PlxyXG4gICk7XHJcbn1cclxuZnVuY3Rpb24gTkwoKSB7XHJcbiAgcmV0dXJuIG51bGw7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIG1hcmt1cDMobnVtOiBhbnkpIHtcclxuICByZXR1cm4gbnVtID09PSAxID8gKFxyXG4gICAgPGgxPlxyXG4gICAgICBBLUxpbmUgMSAtIHtudW19XHJcbiAgICAgIDxTcGFuIG1vZGU9e251bX0gLz5cclxuICAgICAgPEJ1dHRvblxyXG4gICAgICAgIGRpc2FibGVkPXt0cnVlfVxyXG4gICAgICAgIHJlZj17KGVsOiBIVE1MRWxlbWVudCkgPT4gY29uc29sZS5sb2coXCJteSBCVVRUT046OnJlZjo6NVwiLCBlbCl9XHJcbiAgICAgID5cclxuICAgICAgICB0ZXh0XHJcbiAgICAgICAgPHBvcHVwLWluZm9cclxuICAgICAgICAgIHJlZj17KGVsOiBIVE1MRWxlbWVudCkgPT4gY29uc29sZS5sb2coXCJzcGFuIGluIEJVVFRPTjo6cmVmOjo2XCIsIGVsKX1cclxuICAgICAgICA+XHJcbiAgICAgICAgICBibGFcclxuICAgICAgICA8L3BvcHVwLWluZm8+XHJcbiAgICAgICAgPHA+aW5uZXIgcCB7bnVtfTwvcD5cclxuICAgICAgPC9CdXR0b24+XHJcbiAgICAgIEEtTGluZSAzXHJcbiAgICAgIDw+XHJcbiAgICAgICAgPHA+XHJcbiAgICAgICAgICA8cD5BIEZyYWcgbGluZSAxKjwvcD5cclxuICAgICAgICA8L3A+XHJcbiAgICAgICAgPHA+QSBGcmFnIGxpbmUgMjwvcD5cclxuICAgICAgICA8cD5BIEZyYWcgbGluZSAzPC9wPlxyXG4gICAgICAgIDxwPkEgRnJhZyBsaW5lIDQ8L3A+XHJcbiAgICAgICAgPHN2Z1xyXG4gICAgICAgICAgdmlld0JveD1cIjAgMCAzMDAgMTAwXCJcclxuICAgICAgICAgIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIlxyXG4gICAgICAgICAgc3Ryb2tlPVwicmVkXCJcclxuICAgICAgICAgIGZpbGw9XCJncmV5XCJcclxuICAgICAgICA+XHJcbiAgICAgICAgICA8Y2lyY2xlIGN4PVwiNTBcIiBjeT1cIjUwXCIgcj1cIjQwXCIgLz5cclxuICAgICAgICAgIDxjaXJjbGUgY3g9XCIxNTBcIiBjeT1cIjUwXCIgcj1cIjRcIiAvPlxyXG5cclxuICAgICAgICAgIDxzdmcgdmlld0JveD1cIjAgMCAxMCAxMFwiIHg9XCIyMDBcIiB3aWR0aD1cIjEwMFwiPlxyXG4gICAgICAgICAgICA8Y2lyY2xlIGN4PVwiNVwiIGN5PVwiNVwiIHI9XCI0XCIgLz5cclxuICAgICAgICAgIDwvc3ZnPlxyXG4gICAgICAgIDwvc3ZnPlxyXG4gICAgICA8Lz5cclxuICAgICAge251bGx9XHJcbiAgICA8L2gxPlxyXG4gICkgOiAoXHJcbiAgICA8aDEgY2xhc3M9XCJhXCIgIHJlZj17Y29uc29sZS5pbmZvfT5cclxuICAgICAgQiBMaW5lIDEgLSB7bnVtfVxyXG4gICAgICA8U3BhbiBtb2RlPXtudW19IC8+XHJcbiAgICAgIDxCdXR0b25cclxuICAgICAgICBkaXNhYmxlZD17dHJ1ZX1cclxuICAgICAgICByZWY9eyhlbDogSFRNTEVsZW1lbnQpID0+IGNvbnNvbGUubG9nKFwibXkgQlVUVE9OOjpyZWY6OjVcIiwgZWwpfVxyXG4gICAgICA+XHJcbiAgICAgICAgdGV4dFxyXG4gICAgICAgIDxwb3B1cC1pbmZvXHJcbiAgICAgICAgICByZWY9eyhlbDogSFRNTEVsZW1lbnQpID0+IGNvbnNvbGUubG9nKFwic3BhbiBpbiBCVVRUT046OnJlZjo6NlwiLCBlbCl9XHJcbiAgICAgICAgPlxyXG4gICAgICAgICAgYmxhXHJcbiAgICAgICAgPC9wb3B1cC1pbmZvPlxyXG4gICAgICAgIDxwPntudW19PC9wPlxyXG4gICAgICA8L0J1dHRvbj5cclxuICAgICAgPD5cclxuICAgICAgICB7ZmFsc2V9XHJcbiAgICAgICAge251bGx9XHJcbiAgICAgICAge3VuZGVmaW5lZH1cclxuICAgICAgPC8+XHJcbiAgICAgIDw+XHJcbiAgICAgICAgPHA+QiBGcmFnIGxpbmUgMTwvcD5cclxuICAgICAgICA8cD5CIEZyYWcgbGluZSAyPC9wPlxyXG4gICAgICAgIHt1bmRlZmluZWR9XHJcbiAgICAgICAgPHA+QiBGcmFnIGxpbmUgMyg0KTwvcD5cclxuICAgICAgICA8c3ZnXHJcbiAgICAgICAgICB2aWV3Qm94PVwiMCAwIDMwMCAxMDBcIlxyXG4gICAgICAgICAgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiXHJcbiAgICAgICAgICBzdHJva2U9XCJyZWRcIlxyXG4gICAgICAgICAgZmlsbD1cImdyZXlcIlxyXG4gICAgICAgID5cclxuICAgICAgICAgIDxjaXJjbGUgY3g9XCI1MFwiIGN5PVwiNTBcIiByPVwiNDBcIiAvPlxyXG4gICAgICAgICAgPGNpcmNsZSBjeD1cIjE1MFwiIGN5PVwiNTBcIiByPVwiNFwiIC8+XHJcblxyXG4gICAgICAgICAgPHN2ZyB2aWV3Qm94PVwiMCAwIDEwIDEwXCIgeD1cIjIwMFwiIHdpZHRoPVwiMTAwXCI+XHJcbiAgICAgICAgICAgIDxjaXJjbGUgY3g9XCI1XCIgY3k9XCI1XCIgcj1cIjZcIiAvPlxyXG4gICAgICAgICAgPC9zdmc+XHJcbiAgICAgICAgPC9zdmc+XHJcbiAgICAgICAgPHA+QiBGcmFnIGxpbmUgNCg2KTwvcD5cclxuICAgICAgPC8+XHJcbiAgICA8L2gxPlxyXG4gICk7XHJcbn1cclxuY29uc3Qgb2JqID0geyBhOiAxIH07XHJcblxyXG5mdW5jdGlvbiBtYXJrdXA0KG51bTogYW55KSB7XHJcbiAgb2JqLmEgPSBudW07XHJcbiAgcmV0dXJuIG51bSA9PT0gMSA/IChcclxuICAgIDxoMSBvYmo9e29ian0gaWQ9e29iai5hfT5cclxuICAgICAgb2xkLUhlYWRsaW5lIHtudW19XHJcbiAgICA8L2gxPlxyXG4gICkgOiAoXHJcbiAgICA8aDEgb2JqPXtvYmp9IGNsYXNzPVwiYVwiIGlkPXtvYmouYX0+XHJcbiAgICAgIG5ldy1IZWFkbGluZSB7bnVtfVxyXG4gICAgPC9oMT5cclxuICApO1xyXG59XHJcblxyXG5mdW5jdGlvbiBtYXJrdXAobnVtOiBhbnkpIHtcclxuICByZXR1cm4gbnVtID09PSAxID8gKFxyXG4gICAgPGRpdj5cclxuICAgICAgPD5cclxuICAgICAgICA8cD5mcmFnIC0gSTwvcD5cclxuICAgICAgICA8Yj4gZnJhZyAtIElJPC9iPlxyXG4gICAgICA8Lz5cclxuICAgIDwvZGl2PlxyXG4gICkgOiAoXHJcbiAgICA8aDEgY2xhc3M9XCJhXCI+XHJcbiAgICAgIHtcIm5ldy1IZWFkbGluZVwifSB7bnVtfVxyXG4gICAgPC9oMT5cclxuICApO1xyXG59XHJcblxyXG5mdW5jdGlvbiBtYXJrdXA1KG51bTogYW55KSB7XHJcbiAgcmV0dXJuIG51bSA9PT0gMSA/IChcclxuICAgIDxkaXY+XHJcbiAgICAgIHtyYXdIdG1sKGA8ZGl2IGNsYXNzPVwia1wiPnR4dDwvZGl2PjxpbnB1dCB0eXBlPXJhZGlvXCIgLz5gKX1cclxuICAgICAgPENvbXAzIC8+XHJcbiAgICAgIHtlbH1cclxuICAgIDwvZGl2PlxyXG4gICkgOiAoXHJcbiAgICA8ZGl2PlxyXG4gICAgICB7cmF3SHRtbChgPGRpdiBjbGFzcz1cImtcIj50eHQ8L2Rpdj48aW5wdXQgdHlwZT1yYWRpb1wiIC8+YCl9XHJcbiAgICAgIHtudWxsfVxyXG4gICAgICB7ZWx9XHJcbiAgICA8L2Rpdj5cclxuICApO1xyXG59XHJcblxyXG4vL2NvbnNvbGUubG9nKG1hcmt1cCk7XHJcbi8vd2luZG93Lm1hcmt1cCA9IG1hcmt1cDtcclxuXHJcbmNsYXNzIFBvcFVwSW5mbyBleHRlbmRzIEhUTUxFbGVtZW50IHtcclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIC8vIEFsd2F5cyBjYWxsIHN1cGVyIGZpcnN0IGluIGNvbnN0cnVjdG9yXHJcbiAgICBzdXBlcigpO1xyXG5cclxuICAgIC8vIHdyaXRlIGVsZW1lbnQgZnVuY3Rpb25hbGl0eSBpbiBoZXJlXHJcblxyXG4gICAgY29uc29sZS5sb2coXCIjIyMjIyMjIyMjIyMjIyMjI2N0b3IgQ0VcIik7XHJcbiAgfVxyXG5cclxuICBjb25uZWN0ZWRDYWxsYmFjaygpIHtcclxuICAgIGNvbnNvbGUubG9nKFwiIyMjIyMjIyMjIyMjIyMjIyNDdXN0b20gc3F1YXJlIGVsZW1lbnQgYWRkZWQgdG8gcGFnZS5cIik7XHJcbiAgfVxyXG59XHJcblxyXG5jdXN0b21FbGVtZW50cy5kZWZpbmUoXCJwb3B1cC1pbmZvXCIsIFBvcFVwSW5mbyk7XHJcblxyXG4vL2RvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjb2xkXCIpIS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgY29uc29sZS5sb2cpO1xyXG5cclxuLy9kb2N1bWVudC5ib2R5LmlubmVySFRNTCA9IG1hcmt1cDtcclxuLy8vL3JlbmRlcihtYXJrdXAzKDEpLCBkb2N1bWVudC5ib2R5KTtcclxuLy9kb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm91dGVyXCIpPy5zZXRBdHRyaWJ1dGUoXCJkYXRhLWZvb1wiLCBcIm1vZFwiKTtcclxuXHJcbi8vZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJpbm5lclwiKT8uc2V0QXR0cmlidXRlKFwiZGF0YS1mb29cIiwgXCJtb2RcIik7XHJcbi8vcmVuZGVyKG1hcmt1cCgyKSwgZG9jdW1lbnQuYm9keSk7XHJcbi8vcmVuZGVyKG1hcmt1cCwgZG9jdW1lbnQuYm9keSwgdHJ1ZSk7XHJcbmNvbnN0IGVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNvbGRcIik7XHJcbmZ1bmN0aW9uIENvbXAyKCkge1xyXG4gIHJldHVybiAoXHJcbiAgICA8PlxyXG4gICAgICB7cmF3SHRtbChgPGRpdiBjbGFzcz1cImtcIj50eHQ8L2Rpdj48aW5wdXQgdHlwZT1yYWRpb1wiIC8+YCl9XHJcbiAgICAgIDxDb21wMyAvPlxyXG4gICAgICB7ZWx9XHJcbiAgICA8Lz5cclxuICApO1xyXG59XHJcbmZ1bmN0aW9uIENvbXAzKCkge1xyXG4gIHJldHVybiA8ZGl2PmNvbXAgY29udGVudDwvZGl2PjtcclxufVxyXG5cclxud2luZG93LnJlUmVuZGVyMSA9ICgpID0+XHJcbiAgcmVuZGVyKG1hcmt1cDMoMSksIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY29udGFpbmVyXCIpKTtcclxud2luZG93LnJlUmVuZGVyMiA9ICgpID0+XHJcbiAgcmVuZGVyKG1hcmt1cDMoMiksIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY29udGFpbmVyXCIpKTtcclxud2luZG93LnJlUmVuZGVyMyA9ICgpID0+XHJcbiAgcmVuZGVyKFxyXG4gICAgLy8gPGRpdj50eHQ8L2Rpdj5cclxuICAgIDxDb21wMiAvPixcclxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY29udGFpbmVyXCIpXHJcbiAgKTtcclxuXHJcbmNvbnNvbGUubG9nKFwiMTIzNDVcIik7XHJcbndpbmRvdy5zcyA9ICgpID0+IG1hcmt1cDMoMSkgKyBcIlwiO1xyXG53aW5kb3cuc3MyID0gKCkgPT4ge1xyXG4gIGNvbnNvbGUubG9nKG1hcmt1cDMoMSkpO1xyXG5cclxuICAvL2RvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY29udGFpbmVyXCIpLmlubmVySFRNTCA9IG1hcmt1cDMoMSk7XHJcbn07XHJcblxyXG53aW5kb3cucmVSZW5kZXI1YSA9ICgpID0+XHJcbiAgcmVuZGVyKG1hcmt1cDUoMSksIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY29udGFpbmVyXCIpKTtcclxud2luZG93LnJlUmVuZGVyNWIgPSAoKSA9PlxyXG4gIHJlbmRlcihtYXJrdXA1KDIpLCBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNvbnRhaW5lclwiKSk7XHJcblxyXG5cclxuXHJcbiAgcmVuZGVyKCg8aDIgY2xhc3M9XCJhXCIgIHJlZj17Y29uc29sZS53YXJufT5IZWFkaW5nIHdpdGggcmVmPC9oMj4pLCBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNvbnRhaW5lclwiKSk7XHJcbiAgd2luZG93LnJlUmVuZGVyUmVmID0gKCkgPT4gcmVuZGVyKCg8aDIgY2xhc3M9XCJhXCIgIHJlZj17Y29uc29sZS53YXJufT5IZWFkaW5nIHdpdGggcmVmPC9oMj4pLCBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNvbnRhaW5lclwiKSk7Il0sInNvdXJjZVJvb3QiOiIifQ==