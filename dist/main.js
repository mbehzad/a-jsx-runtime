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
  // ref is only called when element is created. not when the ref property is changed

  if (typeof ref === "function") {
    refsToCall.push(() => ref(node));
  } // add attributes, event listeners etc.


  ElementVNode.addProps(node, attrs); // returns child jsx nodes as well to be used during the ref call

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
            else node[propName] = value;
    });
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
// - ref : inline func will be recognized as new function

window.renderedVTrees = renderedVTrees; // TEST CASES
// 1- svg <-> null
// 2- svg -> child
// 3- div <-> Func <-> null

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

window.r = function (a) {
  return Object(C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["render"])(Object(C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("h2", {
    "class": "a",
    ref: console.warn,
    children: Object(C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])(C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["Fragment"], {
      children: [Object(C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("h1", {
        "on-click": a ? console.log : console.warn,
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
};

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vanN4L2pzeC1ydW50aW1lLnRzIiwid2VicGFjazovLy8uL21haW4udHN4Il0sIm5hbWVzIjpbInJlbmRlcmVkVlRyZWVzIiwiV2Vha01hcCIsInJlZnNUb0NhbGwiLCJKc3hOb2RlIiwiY29uc3RydWN0b3IiLCJwcm9wcyIsImdldFBhcmVudEVsZW1lbnROb2RlIiwidk5vZGUiLCJwYXJlbnQiLCJub2RlIiwiZ2V0Q2hpbGRyZW5XaXRoTm9kZXMiLCJhbHdheXNBbGxvdyIsImNoaWxkcmVuIiwibWFwIiwiY2hpbGROb2RlIiwiZmxhdCIsIkluZmluaXR5IiwiZ2V0UGFyZW50QW5kTmV4dFNpYmxpbmciLCJwYXJlbnRXaXRoRWxlbWVudCIsInNpYmxpbmdzIiwicHJldlNpYmxpbmciLCJpbmRleE9mIiwibmV4dFNpYmxpbmdOb2RlIiwibmV4dFNpYmxpbmciLCJ0cnV0aHkiLCJ2YWx1ZSIsInVuZGVmaW5lZCIsInNhbml0aXplIiwidGV4dCIsImRpdiIsImRvY3VtZW50IiwiY3JlYXRlRWxlbWVudCIsImlubmVyVGV4dCIsImlubmVySFRNTCIsImdldE91dGVySHRtbCIsImVsZW1lbnQiLCJFbGVtZW50Iiwib3V0ZXJIVE1MIiwiVGV4dCIsIndob2xlVGV4dCIsIkRvY3VtZW50RnJhZ21lbnQiLCJBcnJheSIsImZyb20iLCJjaGlsZE5vZGVzIiwiZWwiLCJqb2luIiwiY29uc29sZSIsIndhcm4iLCJhc0h0bWxTdHJpbmciLCJ0YWciLCJhdHRyaWJ1dGVzIiwiT2JqZWN0IiwiZW50cmllcyIsImZpbHRlciIsImtleSIsInYiLCJrIiwiaXNBcnJheSIsImNvbnRlbnQiLCJjaGlsZCIsInRvU3RyaW5nIiwiYXNOb2RlIiwic3ZnQ29udGV4dCIsImZyYWdtZW50cyIsIml0ZW0iLCJkb2N1bWVudEZyYWdtZW50IiwiY3JlYXRlRG9jdW1lbnRGcmFnbWVudCIsImFwcGVuZCIsInJlZiIsImF0dHJzIiwiY3JlYXRlRWxlbWVudE5TIiwicHVzaCIsIkVsZW1lbnRWTm9kZSIsImFkZFByb3BzIiwiY2hpbGRKc3hOb2RlcyIsIlZOb2RlIiwiaW5zZXJ0TmV3SXRlbSIsIm5ld05vZGUiLCJpbnNlcnRCZWZvcmUiLCJkaWZmQW5kUGF0Y2hDaGlsZHJlbiIsIm9sZE5vZGUiLCJmb3JFYWNoIiwib2xkQ2hpbGQiLCJpeCIsIm5ld0NoaWxkIiwicmVtb3ZlRnJvbURPTSIsInR5cGUiLCJkaWZmQW5kUGF0Y2giLCJuZXdJdGVtcyIsInNsaWNlIiwibGVuZ3RoIiwiRnJhZ21lbnRWTm9kZSIsIk5vZGUiLCJMaXZlTm9kZVZOb2RlIiwiTnVsbFZOb2RlIiwiVGV4dFZOb2RlIiwibG9nIiwic2V0IiwicGFyZW50RWxlbWVudCIsInJlbW92ZUNoaWxkIiwicmVwbGFjZVdpdGgiLCJmcm9tRXhpc3RpbmdFbGVtZW50Tm9kZSIsIm5ld1ZOb2RlIiwiYXNzaWduIiwibmV3UHJvcHMiLCJvbGRQcm9wcyIsIlNldCIsImtleXMiLCJwcm9wTmFtZSIsIm9sZFZhbHVlIiwibmV3VmFsdWUiLCJzdGFydHNXaXRoIiwiZXZlbnQiLCJyZXBsYWNlIiwiYWRkRXZlbnRMaXN0ZW5lciIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJzZXRBdHRyaWJ1dGUiLCJyZW1vdmVBdHRyaWJ1dGUiLCJTdHJpbmciLCJ0ZXh0Tm9kZSIsImNyZWF0ZVRleHROb2RlIiwibm9kZVZhbHVlIiwibmV3Tm9kZTIiLCJSb290Vk5vZGUiLCJkb21Ob2RlIiwicmVtb3ZlIiwiYXNWTm9kZSIsInJlc3VsdCIsImF0dHIiLCJqc3hzIiwiRnJhZ21lbnQiLCJqc3giLCJoYXNPd25Qcm9wZXJ0eSIsInJlbmRlciIsIm1hcmt1cCIsImJvZHkiLCJxdWVyeVNlbGVjdG9yQWxsIiwic3R5bGUiLCJiYWNrZ3JvdW5kIiwiaXNSZVJlbmRlciIsImhhcyIsImluc2VydEFkamFjZW50SFRNTCIsImluc2VydEFkamFjZW50RWxlbWVudCIsInZUcmVlIiwib2xkVlRyZWUiLCJnZXQiLCJuZXdWVHJlZSIsInNwbGljZSIsIkVycm9yIiwicmF3SHRtbCIsInRlbXBsYXRlIiwid2luZG93IiwieHNzIiwiUlRFIiwidHh0IiwiQnV0dG9uIiwiZGlzYWJsZWQiLCJyZWZsb2ciLCJTcGFuIiwibW9kZSIsIkNvbXAiLCJudW0iLCJtYXJrdXAxIiwibWFya3VwMiIsIk5MIiwibWFya3VwMyIsImluZm8iLCJvYmoiLCJhIiwibWFya3VwNCIsIm1hcmt1cDUiLCJtYXJrdXA2IiwiUG9wVXBJbmZvIiwiSFRNTEVsZW1lbnQiLCJjdXN0b21FbGVtZW50cyIsImRlZmluZSIsInF1ZXJ5U2VsZWN0b3IiLCJDb21wMiIsIkNvbXAzIiwiJGNvbnRhaW5lciIsImdldEVsZW1lbnRCeUlkIiwicmVSZW5kZXIxIiwicmVSZW5kZXIyIiwicmVSZW5kZXIzIiwic3MiLCJzczIiLCJyZVJlbmRlcjVhIiwicmVSZW5kZXI1YiIsInIiLCJyZVJlbmRlclJlZiIsInJlUmVuZGVyNmEiLCJyZVJlbmRlcjZiIiwicmVSZW5kZXJTdmciLCJyZVJlbmRlclN2ZzIiXSwibWFwcGluZ3MiOiI7UUFBQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7UUFDMUU7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSx3REFBd0Qsa0JBQWtCO1FBQzFFO1FBQ0EsaURBQWlELGNBQWM7UUFDL0Q7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLHlDQUF5QyxpQ0FBaUM7UUFDMUUsZ0hBQWdILG1CQUFtQixFQUFFO1FBQ3JJO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMkJBQTJCLDBCQUEwQixFQUFFO1FBQ3ZELGlD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QyxVQUFQLEdBQW9CO0FBQUEsU0FBTXpELG1GQUFNLENBQUNzQyxPQUFPLEVBQVIsRUFBV1EsVUFBWCxDQUFaO0FBQUEsQ0FBcEI7O0FBQ0E1QixNQUFNLENBQUN3QyxVQUFQLEdBQW9CO0FBQUEsU0FBTTFELG1GQUFNLENBQUU7QUFBUSxNQUFFLEVBQUMsR0FBWDtBQUFlLE1BQUUsRUFBQyxHQUFsQjtBQUFzQixLQUFDLEVBQUM7QUFBeEIsSUFBRixFQUFtQ3ZHLFFBQVEsQ0FBQ3NKLGNBQVQsQ0FBd0IsTUFBeEIsQ0FBbkMsQ0FBWjtBQUFBLENBQXBCOztBQUNBN0IsTUFBTSxDQUFDeUMsV0FBUCxHQUFxQjtBQUFBLFNBQU0zRCxtRkFBTSxDQUFDNkIsT0FBTyxFQUFSLEVBQVdpQixVQUFYLENBQVo7QUFBQSxDQUFyQjs7QUFDQTVCLE1BQU0sQ0FBQzBDLFlBQVAsR0FBc0I7QUFBQSxTQUFNNUQsbUZBQU0sQ0FBQzZCLE9BQU8sRUFBUixFQUFXaUIsVUFBWCxDQUFaO0FBQUEsQ0FBdEIsQyIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDApO1xuIiwiY29uc3QgcmVuZGVyZWRWVHJlZXMgPSBuZXcgV2Vha01hcDxIVE1MRWxlbWVudCwgUm9vdFZOb2RlPigpO1xyXG5jb25zdCByZWZzVG9DYWxsOiBBcnJheTwoKSA9PiB2b2lkPiA9IFtdO1xyXG5cclxuLyoqXHJcbiAqIHByb3ZpZGVzIGZ1bmN0aW9ucyBuZWVkZWQgYnkgYmFiZWwgZm9yIGEgY3VzdG9tIHByYWdtYVxyXG4gKiB0byByZW5kZXIgcGFyc2VkIGpzeCBjb2RlIHRvIGh0bWxcclxuICovXHJcblxyXG4vLyBwcm9wcyB3aGljaCB3aWxsIGJlIHJlbmRlcmVkIGFzIGF0dHJpYnV0ZXNcclxuLy8gRnVuY3Rpb25zIHdpbGwgYmUgdXNlZCBmb3IgZXZlbnQgbGlzdGVuZXJzLiAod2l0aCBhdHRyaWJ1dGUgbmFtZSBzdGFydGluZyB3aXRoICdvbi0nKVxyXG50eXBlIEF0dHJpYnV0ZXMgPSB7IFtrZXk6IHN0cmluZ106IHN0cmluZyB8IGJvb2xlYW4gfCBudW1iZXIgfCBGdW5jdGlvbiB9O1xyXG5cclxuLy8gYWRkaXRpb25hbCBhdHRyaWJ1dGVzIHdoaWNoIGNhbiBoYXZlIGFkZGl0aW9uYWwgc2VyaWFsaXphdGlvbiBiZWZvcmUgcmVuZGVyaW5nIGFzIGF0dHJpYnV0ZXNcclxudHlwZSBTcGVjaWFsQXR0cmlidXRlcyA9IHtcclxuICBjbGFzcz86IHN0cmluZyB8IHN0cmluZ1tdO1xyXG4gIHN0eWxlPzogc3RyaW5nIHwgeyBba2V5OiBzdHJpbmddOiBzdHJpbmcgfTtcclxuICByZWY/OiBGdW5jdGlvbjtcclxufTtcclxuXHJcbi8vIGNoaWxkIGVsZW1lbnRzIGluIHRoZSBqc3ggbWFya3VwIHdoaWNoIHdpbGwgYmUgcGFzc2VkIHRvIHRoZSBoIGZ1bmN0aW9uIGFzIGBwcm9wcy5jaGlsZHJlbmBcclxudHlwZSBDaGlsZHJlblByb3BzID0ge1xyXG4gIC8vIG5lc3RlZCBhcnJheSBpbiBjYXNlIG9mXHJcbiAgLy8gPGVsZW0+XHJcbiAgLy8gICA8c3Bhbi8+XHJcbiAgLy8gICB7Y2hpbGRyZW59XHJcbiAgLy8gICA8ZGl2Lz5cclxuICAvLyA8L2VsZW0+XHJcbiAgY2hpbGRyZW46IEFycmF5PFxyXG4gICAgTm9kZSB8IEpzeE5vZGVJbnRlcmZhY2UgfCBzdHJpbmcgfCBBcnJheTxOb2RlIHwgSnN4Tm9kZUludGVyZmFjZSB8IHN0cmluZz5cclxuICA+O1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIHByb3BzIG9iamVjdCB3aGljaCB3aWxsIGJlIHBhc3NlZCB0byBqc3ggcHJhZ21hIGFuZCBjdXN0b20gY29tcG9uZW50IGZ1bmN0aW9uc1xyXG4gKi9cclxudHlwZSBKc3hQcm9wcyA9IEF0dHJpYnV0ZXMgJiBTcGVjaWFsQXR0cmlidXRlcyAmIENoaWxkcmVuUHJvcHM7XHJcblxyXG4vLyBiYXNlIGNsYXNzIHdoaWNoIHdpbGwgYmUgaW5oZXJpdGVkIGZyb20ganN4IGFuZCBmcmFnbWVudHMgZnVuY3Rpb24gbm9kZSBnZW5lcmF0aW9uXHJcbi8vIGFuZCB3aWxsIGJlIHVzZWQgdG8gZGlzdGluZ3Vpc2ggdGhlbSB3aXRoIG90aGVyIEVsZW1lbnRzXHJcbmNsYXNzIEpzeE5vZGUge1xyXG4gIHByb3BzOiBKc3hQcm9wcztcclxuICBjb25zdHJ1Y3Rvcihwcm9wczogSnN4UHJvcHMpIHtcclxuICAgIHRoaXMucHJvcHMgPSBwcm9wcztcclxuICB9XHJcbn1cclxuXHJcbi8vIG51bGwgd2hlbiBjaGVja2luZyB0aGUgcGFyZW50IHdoZW4gcm9vdCBpcyBmcmFnbWVudCBpdHNlbGZcclxuZnVuY3Rpb24gZ2V0UGFyZW50RWxlbWVudE5vZGUodk5vZGU6IFZOb2RlSW50ZXJmYWNlKTogRWxlbWVudFZOb2RlIHtcclxuICB3aGlsZSAodk5vZGUucGFyZW50KSB7XHJcbiAgICB2Tm9kZSA9IHZOb2RlLnBhcmVudDtcclxuICAgIC8vIGAubm9kZWAgaXMgb25seSBvbiBcIlRleHRcIiBhbmQgXCJFbGVtZW50XCIsIFwiUmF3SHRtbFwiIHR5cGUgVk5vZGUsIGFuZCBvbmx5IEVsZW1lbnQgaGFzIGNoaWxkcmVuXHJcbiAgICBpZiAodk5vZGUubm9kZSkgYnJlYWs7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gKHZOb2RlIGFzIHVua25vd24pIGFzIEVsZW1lbnRWTm9kZTtcclxufVxyXG5cclxuZnVuY3Rpb24gZ2V0Q2hpbGRyZW5XaXRoTm9kZXMoXHJcbiAgdk5vZGU6IFZOb2RlSW50ZXJmYWNlLFxyXG4gIGFsd2F5c0FsbG93PzogVk5vZGVJbnRlcmZhY2VcclxuKTogVk5vZGVJbnRlcmZhY2VbXSB7XHJcbiAgdk5vZGUuY2hpbGRyZW47XHJcbiAgcmV0dXJuIHZOb2RlLmNoaWxkcmVuXHJcbiAgICAubWFwKChjaGlsZE5vZGUpID0+IHtcclxuICAgICAgaWYgKGNoaWxkTm9kZSA9PT0gYWx3YXlzQWxsb3cpIHJldHVybiBjaGlsZE5vZGU7XHJcbiAgICAgIGlmIChjaGlsZE5vZGUubm9kZSkgcmV0dXJuIGNoaWxkTm9kZTtcclxuICAgICAgcmV0dXJuIGdldENoaWxkcmVuV2l0aE5vZGVzKGNoaWxkTm9kZSwgYWx3YXlzQWxsb3cpO1xyXG4gICAgfSlcclxuICAgIC5mbGF0KEluZmluaXR5KSBhcyBWTm9kZUludGVyZmFjZVtdO1xyXG59XHJcblxyXG5mdW5jdGlvbiBnZXRQYXJlbnRBbmROZXh0U2libGluZyh2Tm9kZTogVk5vZGVJbnRlcmZhY2UpOiBbTm9kZSwgTm9kZSB8IG51bGxdIHtcclxuICAvLyBub2RlIGFuY2VzdG9yIHdpdGggRWxlbWVudCxcclxuICBjb25zdCBwYXJlbnRXaXRoRWxlbWVudCA9IGdldFBhcmVudEVsZW1lbnROb2RlKHZOb2RlKTtcclxuICBjb25zdCBzaWJsaW5ncyA9IGdldENoaWxkcmVuV2l0aE5vZGVzKHBhcmVudFdpdGhFbGVtZW50LCB2Tm9kZSk7XHJcbiAgY29uc3QgcHJldlNpYmxpbmcgPSBzaWJsaW5nc1tzaWJsaW5ncy5pbmRleE9mKHZOb2RlKSAtIDFdO1xyXG4gIGNvbnN0IG5leHRTaWJsaW5nTm9kZSA9IHByZXZTaWJsaW5nID8gcHJldlNpYmxpbmcubm9kZSEubmV4dFNpYmxpbmcgOiBudWxsO1xyXG5cclxuICByZXR1cm4gW3BhcmVudFdpdGhFbGVtZW50Lm5vZGUsIG5leHRTaWJsaW5nTm9kZV07XHJcbn1cclxuXHJcbi8vIGpzeCBhbmQgRnJhZ21lbnQgd2lsbCByZXR1cm4gb2JqZWN0cyB3aGljaCBpbXBsZW1lbnQgdGhpcyBpbnRlcmZhY2VcclxuZXhwb3J0IGludGVyZmFjZSBKc3hOb2RlSW50ZXJmYWNlIGV4dGVuZHMgSnN4Tm9kZSB7XHJcbiAgdG9TdHJpbmcoKTogc3RyaW5nO1xyXG4gIGFzTm9kZSgpOiBOb2RlO1xyXG4gIGFzVk5vZGUoKTogVk5vZGU7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiByZXR1cm5zIHRydWUgaWYgbm90IG51bGxpc2ggb3IgZmFsc2VcclxuICogdGhhdCBtZWFucyAwIG9yIGVtcHR5IHN0cmluZyBhcmUgYWxsb3dlZFxyXG4gKiBAcGFyYW0geyp9IHZhbFxyXG4gKi9cclxuZnVuY3Rpb24gdHJ1dGh5KHZhbHVlOiBhbnkpOiBib29sZWFuIHtcclxuICByZXR1cm4gdmFsdWUgIT09IGZhbHNlICYmIHZhbHVlICE9PSBudWxsICYmIHZhbHVlICE9PSB1bmRlZmluZWQ7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBlc2NhcGVzIHRoZSBwcm92aWRlZCBzdHJpbmcgYWdhaW5zdCB4c3MgYXR0YWNrcyBldGNcclxuICpcclxuICogQHBhcmFtIHtzdHJpbmd9IHRleHRcclxuICogQHJldHVybnMge3N0cmluZ31cclxuICovXHJcbmZ1bmN0aW9uIHNhbml0aXplKHRleHQ6IHN0cmluZyk6IHN0cmluZyB7XHJcbiAgY29uc3QgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICBkaXYuaW5uZXJUZXh0ID0gdGV4dDtcclxuICByZXR1cm4gZGl2LmlubmVySFRNTDtcclxufVxyXG5cclxuLyoqXHJcbiAqIGJhc2ljYWxseSBgRWxlbWVudC5vdXRlckhUTUxgIGJ1dCBhbHNvIHN1cHBvcnRzIFRleHQgbm9kZSBhbmQgRG9jdW1lbnRGcmFnbWVudFxyXG4gKiBAcGFyYW0gZWxlbWVudCB7Tm9kZX0gLSBlbGVtZW50IHdoaWNoIGl0cyBodG1sIG5lZWRzIHRvIGJlIHJldHVybmVkXHJcbiAqL1xyXG5mdW5jdGlvbiBnZXRPdXRlckh0bWwoZWxlbWVudDogTm9kZSk6IHN0cmluZyB7XHJcbiAgaWYgKGVsZW1lbnQgaW5zdGFuY2VvZiBFbGVtZW50KSByZXR1cm4gZWxlbWVudC5vdXRlckhUTUw7XHJcbiAgaWYgKGVsZW1lbnQgaW5zdGFuY2VvZiBUZXh0KSByZXR1cm4gc2FuaXRpemUoZWxlbWVudC53aG9sZVRleHQpO1xyXG4gIGlmIChlbGVtZW50IGluc3RhbmNlb2YgRG9jdW1lbnRGcmFnbWVudClcclxuICAgIHJldHVybiBBcnJheS5mcm9tKGVsZW1lbnQuY2hpbGROb2RlcylcclxuICAgICAgLm1hcCgoZWwpID0+IGdldE91dGVySHRtbChlbCkpXHJcbiAgICAgIC5qb2luKFwiXCIpO1xyXG5cclxuICAvLyBzaG91bGRuJ3QgcmVhY2ggdGhpcyBwb2ludFxyXG4gIGNvbnNvbGUud2FybihcImdldE91dGVySHRtbCBkb2VzIG5vdCBzdXBwb3J0IHRoaXMgdHlwZSBvZiBlbGVtZW50XCIsIGVsZW1lbnQpO1xyXG4gIHJldHVybiBcIlwiO1xyXG59XHJcblxyXG4vKipcclxuICogZ2VuZXJhdGVzIHRoZSBodG1sIGFzIGEgc3RyaW5nIHdoaWNoIGNhbiBiZSB1c2VkIGZvciBleGFtcGxlIHdpdGggYGVsZW1lbnQuaW5uZXJIVE1MKClgXHJcbiAqXHJcbiAqIEBwYXJhbSB0YWcge3N0cmluZ3xGdW5jdGlvbn0gLSB0YWcgYXJndW1lbnQgb2YgdGhlIGpzeCBjYWxsXHJcbiAqIEBwYXJhbSBwcm9wcyB7T2JqZWN0fSAtIHByb3BzIGFyZ3VtZW50IG9mIGpzeCBjYWxsXHJcbiAqL1xyXG5mdW5jdGlvbiBhc0h0bWxTdHJpbmcodGFnOiBzdHJpbmcgfCBGdW5jdGlvbiwgcHJvcHM6IEpzeFByb3BzLCBjaGlsZHJlbikge1xyXG4gIGNvbnN0IGF0dHJpYnV0ZXMgPSBPYmplY3QuZW50cmllcyhwcm9wcylcclxuICAgIC5maWx0ZXIoKFssIHZhbHVlXSkgPT4gdHJ1dGh5KHZhbHVlKSlcclxuICAgIC5tYXAoKFtrZXksIHZhbHVlXSkgPT4ge1xyXG4gICAgICAvLyBlLmcuIGRpc2FibGVkOiB0cnVlID0+IDx0YWcgZGlzYWJsZWQ+XHJcbiAgICAgIGlmICh2YWx1ZSA9PT0gdHJ1ZSkgcmV0dXJuIGtleTtcclxuXHJcbiAgICAgIC8vIGZvciBzdHlsZSBhcyBvYmplY3Q6XHJcbiAgICAgIC8vIChzdHlsZTopIHtkaXNwbGF5OiBcIm5vbmVcIiwgcG9zaXRpb246IFwiYWJzb2x1dGVcIn0gPT0+ICdkaXNwbGF5OiBub25lOyBwb3NpdGlvbjogYWJzb2x1dGU7J1xyXG4gICAgICBpZiAoa2V5ID09PSBcInN0eWxlXCIgJiYgdHlwZW9mIHZhbHVlID09PSBcIm9iamVjdFwiKVxyXG4gICAgICAgIHZhbHVlID0gT2JqZWN0LmVudHJpZXModmFsdWUpXHJcbiAgICAgICAgICAvLyBpZ25vcmUgc3R1ZmYgbGlrZSBge2JhY2tncm91bmQ6IGFjdGl2ZSAmJiBcInJlZFwifWAgd2hlbiBgYWN0aXZlID09PSBmYWxzZSAvIG51bGwgLyB1bmRlZmluZWRgXHJcbiAgICAgICAgICAuZmlsdGVyKChbLCB2XSkgPT4gdHJ1dGh5KHYpKVxyXG4gICAgICAgICAgLy8gY3VycmVudGx5IHN1cHBvcnRzIFwiYmFja2dyb3VuZC1jb2xvclwiIG5vdCBcImJhY2tncm91bmRDb2xvclwiXHJcbiAgICAgICAgICAubWFwKChbaywgdl0pID0+IGAke2t9OiAke3Z9YClcclxuICAgICAgICAgIC5qb2luKFwiOyBcIik7XHJcblxyXG4gICAgICAvLyAoY2xhc3M6KSBbXCJidG5cIiwgXCJyZWRcIl0gPT0+IFwiYnRuIHJlZFwiXHJcbiAgICAgIGlmIChrZXkgPT09IFwiY2xhc3NcIiAmJiBBcnJheS5pc0FycmF5KHZhbHVlKSkgdmFsdWUgPSB2YWx1ZS5qb2luKFwiIFwiKTtcclxuXHJcbiAgICAgIHJldHVybiBgJHtrZXl9PVwiJHt2YWx1ZX1cImA7XHJcbiAgICB9KVxyXG4gICAgLmpvaW4oXCIgXCIpO1xyXG5cclxuICBjb25zdCBjb250ZW50ID0gY2hpbGRyZW4ubWFwKChjaGlsZCkgPT4gY2hpbGQudG9TdHJpbmcoKSkuam9pbihcIlwiKTtcclxuXHJcbiAgcmV0dXJuIGA8JHt0YWd9ICR7YXR0cmlidXRlc30+JHtjb250ZW50fTwvJHt0YWd9PmA7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBnZW5lcmF0ZXMgSFRNTCBOb2RlIGVsZW1lbnRzIGZyb20gdGhlIHByb3ZpZGVkIGpzeCB0cmVlXHJcbiAqIEBwYXJhbSB0YWcge3N0cmluZ3xGdW5jdGlvbn0gLSB0YWcgYXJndW1lbnQgb2YgdGhlIGpzeCBjYWxsXHJcbiAqIEBwYXJhbSBwcm9wcyB7T2JqZWN0fSAtIHByb3BzIGFyZ3VtZW50IG9mIGpzeCBjYWxsXHJcbiAqL1xyXG5mdW5jdGlvbiBhc05vZGUoXHJcbiAgdGFnOiBzdHJpbmcgfCBGdW5jdGlvbiB8IHVuZGVmaW5lZCxcclxuICBwcm9wczogQXR0cmlidXRlcyAmIFNwZWNpYWxBdHRyaWJ1dGVzLCAvL0pzeFByb3BzLFxyXG4gIGNoaWxkcmVuOiBhbnlbXSxcclxuICBzdmdDb250ZXh0ID0gZmFsc2VcclxuKTogW05vZGUsIEpzeE5vZGVJbnRlcmZhY2VbXV0ge1xyXG4gIC8vIGZyYWdtZW50XHJcbiAgaWYgKCF0YWcpIHtcclxuICAgIGNvbnN0IGZyYWdtZW50cyA9IGNoaWxkcmVuXHJcbiAgICAgIC5mbGF0KCkgLy8gP1xyXG4gICAgICAubWFwKChpdGVtKSA9PiBpdGVtLmFzTm9kZSgpKTtcclxuXHJcbiAgICBjb25zdCBkb2N1bWVudEZyYWdtZW50ID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO1xyXG5cclxuICAgIGRvY3VtZW50RnJhZ21lbnQuYXBwZW5kKC4uLmZyYWdtZW50cyk7XHJcbiAgICByZXR1cm4gW2RvY3VtZW50RnJhZ21lbnQsIFtdXTtcclxuICB9XHJcblxyXG4gIGNvbnN0IHsgcmVmLCAuLi5hdHRycyB9ID0gcHJvcHM7XHJcblxyXG4gIC8vIHJlbWVtYmVyIGlmIHRoZSBzdmcgY29udGV4dCB3YXMgc2V0IGZvciB0aGlzIG5vZGUsIGFuZCByZXBsYWNlIGFmdGVyIGdlbmVyYXRpbmcgYWxsIGNoaWxkcmVuXHJcblxyXG4gIC8vIGN1cnJlbnRseSBub3Qgc3VwcG9ydGluZyB0aGUgYGlzYCBvcHRpb24gZm9yIEN1c3RvbWl6ZWQgYnVpbHQtaW4gZWxlbWVudHNcclxuICBjb25zdCBub2RlID0gc3ZnQ29udGV4dFxyXG4gICAgPyBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoXCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiLCB0YWcpXHJcbiAgICA6IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodGFnKTtcclxuXHJcbiAgLy8gY3VycmVudGx5IG9ubHkgc3VwcG9ydGluZyByZWYgb24gaHRtbCBlbGVtZW50cy4gbm90IHRlbXBsYXRlIGZ1bmN0aW9uc1xyXG4gIC8vIHJlZiBpcyBvbmx5IGNhbGxlZCB3aGVuIGVsZW1lbnQgaXMgY3JlYXRlZC4gbm90IHdoZW4gdGhlIHJlZiBwcm9wZXJ0eSBpcyBjaGFuZ2VkXHJcbiAgaWYgKHR5cGVvZiByZWYgPT09IFwiZnVuY3Rpb25cIikge1xyXG4gICAgcmVmc1RvQ2FsbC5wdXNoKCgpID0+IHJlZihub2RlKSk7XHJcbiAgfVxyXG5cclxuICAvLyBhZGQgYXR0cmlidXRlcywgZXZlbnQgbGlzdGVuZXJzIGV0Yy5cclxuICBFbGVtZW50Vk5vZGUuYWRkUHJvcHMobm9kZSwgYXR0cnMpO1xyXG5cclxuICAvLyByZXR1cm5zIGNoaWxkIGpzeCBub2RlcyBhcyB3ZWxsIHRvIGJlIHVzZWQgZHVyaW5nIHRoZSByZWYgY2FsbFxyXG4gIGNvbnN0IGNoaWxkSnN4Tm9kZXMgPSBjaGlsZHJlbi5maWx0ZXIoKGNoaWxkKSA9PiBjaGlsZCBpbnN0YW5jZW9mIFZOb2RlKTtcclxuXHJcbiAgbm9kZS5hcHBlbmQoXHJcbiAgICAuLi5jaGlsZHJlblxyXG4gICAgICAvLy5mbGF0KClcclxuICAgICAgLm1hcCgoY2hpbGQpID0+IGNoaWxkLmFzTm9kZSgpKVxyXG4gICk7XHJcblxyXG4gIHJldHVybiBbbm9kZSwgY2hpbGRKc3hOb2RlcyBhcyBKc3hOb2RlSW50ZXJmYWNlW11dO1xyXG59XHJcblxyXG5mdW5jdGlvbiBpbnNlcnROZXdJdGVtKG5ld05vZGU6IFZOb2RlSW50ZXJmYWNlKSB7XHJcbiAgY29uc3QgW3BhcmVudCwgbmV4dFNpYmxpbmddID0gZ2V0UGFyZW50QW5kTmV4dFNpYmxpbmcobmV3Tm9kZSk7XHJcbiAgcGFyZW50Lmluc2VydEJlZm9yZShuZXdOb2RlLmFzTm9kZSgpLCBuZXh0U2libGluZyk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGRpZmZBbmRQYXRjaENoaWxkcmVuKFxyXG4gIG9sZE5vZGU6IFZOb2RlSW50ZXJmYWNlLFxyXG4gIG5ld05vZGU6IFZOb2RlSW50ZXJmYWNlXHJcbikge1xyXG4gIG9sZE5vZGUuY2hpbGRyZW4uZm9yRWFjaCgob2xkQ2hpbGQsIGl4KSA9PiB7XHJcbiAgICBjb25zdCBuZXdDaGlsZCA9IG5ld05vZGUuY2hpbGRyZW5baXhdO1xyXG4gICAgLy8gY2hpbGQgd2FzIHJlbW92ZWRcclxuICAgIGlmICghbmV3Q2hpbGQpIG9sZENoaWxkLnJlbW92ZUZyb21ET00oKTtcclxuICAgIC8vIGNoaWxkIGlzIG1vZGlmaWVkXHJcbiAgICBlbHNlIGlmIChuZXdDaGlsZC50eXBlID09PSBvbGRDaGlsZC50eXBlKSBvbGRDaGlsZC5kaWZmQW5kUGF0Y2gobmV3Q2hpbGQpO1xyXG4gICAgLy8gY2hpbGQgaXMgcmVwbGFjZWRcclxuICAgIGVsc2Uge1xyXG4gICAgICBvbGRDaGlsZC5yZW1vdmVGcm9tRE9NKCk7XHJcbiAgICAgIGluc2VydE5ld0l0ZW0obmV3Q2hpbGQpO1xyXG4gICAgfVxyXG4gIH0pO1xyXG5cclxuICAvLyBuZXcgYWRkaXRpb24gaXRlbXNcclxuICBjb25zdCBuZXdJdGVtcyA9IG5ld05vZGUuY2hpbGRyZW4uc2xpY2Uob2xkTm9kZS5jaGlsZHJlbi5sZW5ndGgpO1xyXG4gIGlmIChuZXdJdGVtcy5sZW5ndGgpIHtcclxuICAgIGNvbnN0IGRvY3VtZW50RnJhZ21lbnQgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XHJcbiAgICBuZXdJdGVtcy5mb3JFYWNoKChpdGVtKSA9PiBkb2N1bWVudEZyYWdtZW50LmFwcGVuZChpdGVtLmFzTm9kZSgpKSk7XHJcblxyXG4gICAgY29uc3QgW3BhcmVudCwgbmV4dFNpYmxpbmddID0gZ2V0UGFyZW50QW5kTmV4dFNpYmxpbmcobmV3SXRlbXNbMF0pO1xyXG4gICAgcGFyZW50Lmluc2VydEJlZm9yZShkb2N1bWVudEZyYWdtZW50LCBuZXh0U2libGluZyk7XHJcbiAgfVxyXG59XHJcblxyXG5jbGFzcyBWTm9kZSB7fVxyXG5cclxuaW50ZXJmYWNlIFZOb2RlSW50ZXJmYWNlIHtcclxuICB0b1N0cmluZygpOiBzdHJpbmc7XHJcbiAgYXNOb2RlKCk6IE5vZGU7XHJcbiAgcGFyZW50OiBWTm9kZUludGVyZmFjZSB8IG51bGw7XHJcbiAgY2hpbGRyZW46IEFycmF5PFZOb2RlSW50ZXJmYWNlIHwgbmV2ZXI+O1xyXG4gIHR5cGU6IHN0cmluZztcclxuICBub2RlPzogQ2hpbGROb2RlO1xyXG4gIHJlbW92ZUZyb21ET00oKTogdm9pZDtcclxuICBkaWZmQW5kUGF0Y2gobmV3Tm9kZTogVk5vZGVJbnRlcmZhY2UpOiB2b2lkO1xyXG59XHJcblxyXG5jbGFzcyBFbGVtZW50Vk5vZGUgZXh0ZW5kcyBWTm9kZSBpbXBsZW1lbnRzIFZOb2RlSW50ZXJmYWNlIHtcclxuICB0eXBlID0gXCJFbGVtZW50XCI7XHJcbiAgdGFnOiBzdHJpbmc7XHJcbiAgcHJvcHM6IE9iamVjdDsgLy8gQFRPRE86XHJcbiAgbm9kZTogSFRNTEVsZW1lbnQgPSBudWxsIGFzIGFueTtcclxuICBjaGlsZHJlbjogVk5vZGVJbnRlcmZhY2VbXTtcclxuICBwYXJlbnQ6IFZOb2RlSW50ZXJmYWNlID0gbnVsbCBhcyBhbnk7XHJcbiAgc3ZnQ29udGV4dDogYm9vbGVhbiA9IGZhbHNlOyAvLyB3aWxsIGJlIHNldCB0byB0cnVlIHdoZW4gZWxlbWVudCBpcyBhbiBTVkcgRWxlbWVudFxyXG5cclxuICBjb25zdHJ1Y3Rvcih7XHJcbiAgICB0YWcsXHJcbiAgICBwcm9wcyxcclxuICAgIGNoaWxkcmVuLFxyXG4gIH06IHtcclxuICAgIHRhZzogc3RyaW5nO1xyXG4gICAgcHJvcHM6IFJlY29yZDxzdHJpbmcsIGFueT47XHJcbiAgICBjaGlsZHJlbjogQXJyYXk8Vk5vZGVJbnRlcmZhY2UgfCBWTm9kZUludGVyZmFjZVtdPjtcclxuICB9KSB7XHJcbiAgICBzdXBlcigpO1xyXG4gICAgdGhpcy50YWcgPSB0YWc7XHJcbiAgICB0aGlzLnByb3BzID0gcHJvcHM7XHJcblxyXG4gICAgdGhpcy5jaGlsZHJlbiA9IGNoaWxkcmVuLm1hcCgoY2hpbGQpID0+IHtcclxuICAgICAgaWYgKEFycmF5LmlzQXJyYXkoY2hpbGQpKSByZXR1cm4gbmV3IEZyYWdtZW50Vk5vZGUoY2hpbGQpO1xyXG4gICAgICBpZiAoY2hpbGQgaW5zdGFuY2VvZiBWTm9kZSkgcmV0dXJuIGNoaWxkO1xyXG4gICAgICBpZiAoY2hpbGQgaW5zdGFuY2VvZiBOb2RlKSByZXR1cm4gbmV3IExpdmVOb2RlVk5vZGUoY2hpbGQpO1xyXG4gICAgICBpZiAoIXRydXRoeShjaGlsZCkpIHJldHVybiBuZXcgTnVsbFZOb2RlKCk7XHJcblxyXG4gICAgICByZXR1cm4gbmV3IFRleHRWTm9kZShjaGlsZCk7XHJcbiAgICB9KTtcclxuICAgIHRoaXMuY2hpbGRyZW4uZm9yRWFjaCgoY2hpbGQpID0+IChjaGlsZC5wYXJlbnQgPSB0aGlzKSk7XHJcbiAgfVxyXG4gIHRvU3RyaW5nKCkge1xyXG4gICAgcmV0dXJuIGFzSHRtbFN0cmluZyh0aGlzLnRhZywgdGhpcy5wcm9wcywgdGhpcy5jaGlsZHJlbik7XHJcbiAgfVxyXG5cclxuICBhc05vZGUoKSB7XHJcbiAgICBsZXQgc3ZnQ29udGV4dCA9IGZhbHNlO1xyXG4gICAgbGV0IHZOb2RlOiBWTm9kZUludGVyZmFjZSA9IHRoaXM7XHJcbiAgICB3aGlsZSAodk5vZGUucGFyZW50KSB7XHJcbiAgICAgIGlmICh2Tm9kZS50YWcgPT09IFwic3ZnXCIpIHtcclxuICAgICAgICBzdmdDb250ZXh0ID0gdHJ1ZTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgICB2Tm9kZSA9IHZOb2RlLnBhcmVudDtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLnN2Z0NvbnRleHQgPSBzdmdDb250ZXh0O1xyXG4gICAgY29uc29sZS5sb2coXCJzdmdDb250ZXh0OlwiLCB0aGlzLnRhZywgc3ZnQ29udGV4dCk7XHJcblxyXG4gICAgY29uc3Qgbm9kZSA9IGFzTm9kZShcclxuICAgICAgdGhpcy50YWcsXHJcbiAgICAgIHRoaXMucHJvcHMsXHJcbiAgICAgIHRoaXMuY2hpbGRyZW4sXHJcbiAgICAgIHRoaXMuc3ZnQ29udGV4dFxyXG4gICAgKVswXTtcclxuICAgIHRoaXMubm9kZSA9IG5vZGU7XHJcblxyXG4gICAgLy8gbWVtb3JpemUgZm9yIG5leHQgc3VidHJlZSByZS1yZW5kZXJzXHJcbiAgICByZW5kZXJlZFZUcmVlcy5zZXQobm9kZSwgdGhpcyk7XHJcblxyXG4gICAgcmV0dXJuIG5vZGU7XHJcbiAgfVxyXG4gIHJlbW92ZUZyb21ET00oKSB7XHJcbiAgICB0aGlzLm5vZGUucGFyZW50RWxlbWVudC5yZW1vdmVDaGlsZCh0aGlzLm5vZGUpO1xyXG4gIH1cclxuICBkaWZmQW5kUGF0Y2gobmV3Tm9kZTogRWxlbWVudFZOb2RlKSB7XHJcbiAgICBpZiAobmV3Tm9kZS50YWcgPT09IHRoaXMudGFnKSB7XHJcbiAgICAgIG5ld05vZGUubm9kZSA9IHRoaXMubm9kZTtcclxuICAgICAgLy8gdXBkYXRlIHByb3BzIGFuZCBhdHRyaWJ1dGVzXHJcbiAgICAgIEVsZW1lbnRWTm9kZS5hZGRQcm9wcyhuZXdOb2RlLm5vZGUsIG5ld05vZGUucHJvcHMsIHRoaXMucHJvcHMpO1xyXG5cclxuICAgICAgLy8gY2hpbGRyZW4gPT4gaXRlciBhbmQgcGF0Y2hcclxuICAgICAgLy8gb2xkIGNoaWxkcmVuIGJlaW5nIG1vZGlmaWVkXHJcbiAgICAgIGRpZmZBbmRQYXRjaENoaWxkcmVuKHRoaXMsIG5ld05vZGUpO1xyXG4gICAgfVxyXG4gICAgLy8gdGFnIGhhcyBjaGFuZ2VkXHJcbiAgICBlbHNlIHtcclxuICAgICAgdGhpcy5ub2RlLnJlcGxhY2VXaXRoKG5ld05vZGUuYXNOb2RlKCkpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIG1lbW9yaXplIGZvciBuZXh0IHN1YnRyZWUgcmUtcmVuZGVyc1xyXG4gICAgcmVuZGVyZWRWVHJlZXMuc2V0KHRoaXMubm9kZSwgbmV3Tm9kZSk7XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgZnJvbUV4aXN0aW5nRWxlbWVudE5vZGUoXHJcbiAgICB2Tm9kZTogRWxlbWVudFZOb2RlLFxyXG4gICAgY2hpbGRyZW46IEFycmF5PFZOb2RlSW50ZXJmYWNlIHwgVk5vZGVJbnRlcmZhY2VbXT5cclxuICApIHtcclxuICAgIGNvbnN0IHsgdGFnLCBwcm9wcywgcGFyZW50LCBub2RlLCBzdmdDb250ZXh0IH0gPSB2Tm9kZTtcclxuICAgIGNvbnN0IG5ld1ZOb2RlID0gbmV3IEVsZW1lbnRWTm9kZSh7IHRhZywgcHJvcHMsIGNoaWxkcmVuIH0pO1xyXG4gICAgT2JqZWN0LmFzc2lnbihuZXdWTm9kZSwgeyBwYXJlbnQsIG5vZGUsIHN2Z0NvbnRleHQgfSk7XHJcbiAgICByZXR1cm4gbmV3Vk5vZGU7XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgYWRkUHJvcHMoXHJcbiAgICBlbGVtZW50OiBFbGVtZW50LFxyXG4gICAgbmV3UHJvcHM6IFJlY29yZDxzdHJpbmcsIGFueT4sXHJcbiAgICBvbGRQcm9wczogUmVjb3JkPHN0cmluZywgYW55PiA9IHt9XHJcbiAgKSB7XHJcbiAgICAvLyBpdGVyYXRlIG92ZXIgYWxsIG1vZGlmaWVkIG5ldyBhbmQgb2xkIHByb3BlcnRpZXMgYW5kIHNldC9yZW1vdmUvdXBkYXRlIHRoZW1cclxuICAgIEFycmF5LmZyb20obmV3IFNldChbLi4uT2JqZWN0LmtleXMobmV3UHJvcHMpLCAuLi5PYmplY3Qua2V5cyhvbGRQcm9wcyldKSlcclxuICAgICAgLm1hcCgocHJvcE5hbWUpID0+ICh7XHJcbiAgICAgICAgcHJvcE5hbWUsXHJcbiAgICAgICAgb2xkVmFsdWU6IG9sZFByb3BzW3Byb3BOYW1lXSxcclxuICAgICAgICBuZXdWYWx1ZTogbmV3UHJvcHNbcHJvcE5hbWVdLFxyXG4gICAgICB9KSlcclxuICAgICAgLmZpbHRlcigoeyBuZXdWYWx1ZSwgb2xkVmFsdWUgfSkgPT4gbmV3VmFsdWUgIT09IG9sZFZhbHVlKVxyXG4gICAgICAuZm9yRWFjaCgoeyBwcm9wTmFtZSwgbmV3VmFsdWUsIG9sZFZhbHVlIH0pID0+IHtcclxuICAgICAgICAvLyBmb3Igc3R5bGUgYXMgb2JqZWN0OlxyXG4gICAgICAgIC8vIChzdHlsZTopIHtkaXNwbGF5OiBcIm5vbmVcIiwgcG9zaXRpb246IFwiYWJzb2x1dGVcIn0gPT0+ICdkaXNwbGF5OiBub25lOyBwb3NpdGlvbjogYWJzb2x1dGU7J1xyXG4gICAgICAgIGlmIChwcm9wTmFtZSA9PT0gXCJzdHlsZVwiICYmIHR5cGVvZiBuZXdWYWx1ZSA9PT0gXCJvYmplY3RcIilcclxuICAgICAgICAgIG5ld1ZhbHVlID0gT2JqZWN0LmVudHJpZXMobmV3VmFsdWUpXHJcbiAgICAgICAgICAgIC5maWx0ZXIoKFssIHZdKSA9PiB0cnV0aHkodikpXHJcbiAgICAgICAgICAgIC5tYXAoKFtrLCB2XSkgPT4gYCR7a306ICR7dn1gKVxyXG4gICAgICAgICAgICAuam9pbihcIjsgXCIpO1xyXG5cclxuICAgICAgICAvLyAoY2xhc3M6KSBbXCJidG5cIiwgXCJyZWRcIl0gPT0+IFwiYnRuIHJlZFwiXHJcbiAgICAgICAgaWYgKHByb3BOYW1lID09PSBcImNsYXNzXCIgJiYgQXJyYXkuaXNBcnJheShuZXdWYWx1ZSkpXHJcbiAgICAgICAgICBuZXdWYWx1ZSA9IG5ld1ZhbHVlLmpvaW4oXCIgXCIpO1xyXG4gICAgICAgIC8vIHByb3BzIHN0YXJ0aW5nIHdpdGggXCJvbi1cIiBhcmUgZXZlbnQgbGlzdGVuZXJzXHJcbiAgICAgICAgaWYgKFxyXG4gICAgICAgICAgcHJvcE5hbWUuc3RhcnRzV2l0aChcIm9uLVwiKSAmJlxyXG4gICAgICAgICAgKHR5cGVvZiBuZXdWYWx1ZSA9PT0gXCJmdW5jdGlvblwiIHx8XHJcbiAgICAgICAgICAgIHR5cGVvZiBuZXdWYWx1ZSA9PT0gXCJvYmplY3RcIiB8fFxyXG4gICAgICAgICAgICB0eXBlb2Ygb2xkVmFsdWUgPT09IFwiZnVuY3Rpb25cIiB8fFxyXG4gICAgICAgICAgICB0eXBlb2Ygb2xkVmFsdWUgPT09IFwib2JqZWN0XCIpXHJcbiAgICAgICAgKSB7XHJcbiAgICAgICAgICAvLyByZW1vdmUgbGVhZGluZyBcIm9uLVwiXCJcclxuICAgICAgICAgIGNvbnN0IGV2ZW50ID0gcHJvcE5hbWUucmVwbGFjZSgvXm9uLS8sIFwiXCIpO1xyXG5cclxuICAgICAgICAgIGlmICh0eXBlb2YgbmV3VmFsdWUgPT09IFwiZnVuY3Rpb25cIiB8fCB0eXBlb2YgbmV3VmFsdWUgPT09IFwib2JqZWN0XCIpXHJcbiAgICAgICAgICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcclxuICAgICAgICAgICAgICBldmVudCxcclxuICAgICAgICAgICAgICBuZXdWYWx1ZSBhcyBFdmVudExpc3RlbmVyT3JFdmVudExpc3RlbmVyT2JqZWN0XHJcbiAgICAgICAgICAgICk7XHJcblxyXG4gICAgICAgICAgaWYgKHR5cGVvZiBvbGRWYWx1ZSA9PT0gXCJmdW5jdGlvblwiIHx8IHR5cGVvZiBvbGRWYWx1ZSA9PT0gXCJvYmplY3RcIilcclxuICAgICAgICAgICAgZWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFxyXG4gICAgICAgICAgICAgIGV2ZW50LFxyXG4gICAgICAgICAgICAgIG9sZFZhbHVlIGFzIEV2ZW50TGlzdGVuZXJPckV2ZW50TGlzdGVuZXJPYmplY3RcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gYm9vbGVhbiBhdHRyaWJ1dGUgc2V0IHdpdGhvdXQgdmFsdWVcclxuICAgICAgICBlbHNlIGlmIChuZXdWYWx1ZSA9PT0gdHJ1ZSkgZWxlbWVudC5zZXRBdHRyaWJ1dGUocHJvcE5hbWUsIFwiXCIpO1xyXG4gICAgICAgIC8vIHJlbW92ZSBvbGQgYXR0cmlidXRlcyB3aGljaCBhcmUgZmFsc2Ugbm93XHJcbiAgICAgICAgZWxzZSBpZiAoIXRydXRoeShuZXdWYWx1ZSkpIGVsZW1lbnQucmVtb3ZlQXR0cmlidXRlKHByb3BOYW1lKTtcclxuICAgICAgICAvLyB1cGRhdGUgdG8gbmV3IHZhbHVlIGFzIHN0cmluZ1xyXG4gICAgICAgIGVsc2UgaWYgKHR5cGVvZiBuZXdWYWx1ZSA9PT0gXCJzdHJpbmdcIiB8fCB0eXBlb2YgbmV3VmFsdWUgPT09IFwibnVtYmVyXCIpXHJcbiAgICAgICAgICBlbGVtZW50LnNldEF0dHJpYnV0ZShwcm9wTmFtZSwgU3RyaW5nKG5ld1ZhbHVlKSk7XHJcbiAgICAgICAgLy8ga2V5IGhhcyB0aGUgZm9ybSBvZiBcIm9uLWNoYW5nZVwiLiB2YWx1ZSBpcyB0aGUgY2FsbGJhY2sgZnVuY3Rpb24gb3IgYW4gb2JqZWN0IGltcGxlbWVudGluZyB7RXZlbnRMaXN0ZW5lcn0gaW50ZXJmYWNlXHJcbiAgICAgICAgLy8gQHRzLWlnbm9yZSAtIHByb3ZpZGluZyB0aGUgdmFsdWUgYXMgcHJvcGVydHkgdG8gaHRtbCBlbGVtZW50XHJcbiAgICAgICAgZWxzZSBub2RlW3Byb3BOYW1lXSA9IHZhbHVlO1xyXG4gICAgICB9KTtcclxuICB9XHJcbn1cclxuXHJcbmNsYXNzIEZyYWdtZW50Vk5vZGUgZXh0ZW5kcyBWTm9kZSBpbXBsZW1lbnRzIFZOb2RlSW50ZXJmYWNlIHtcclxuICB0eXBlID0gXCJGcmFnbWVudFwiO1xyXG4gIGNoaWxkcmVuOiBWTm9kZUludGVyZmFjZVtdO1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIGNoaWxkcmVuOiBBcnJheTxcclxuICAgICAgVk5vZGVJbnRlcmZhY2UgfCBDaGlsZE5vZGUgfCBzdHJpbmcgfCBib29sZWFuIHwgbnVsbCB8IHVuZGVmaW5lZCB8IG51bWJlclxyXG4gICAgPlxyXG4gICkge1xyXG4gICAgc3VwZXIoKTtcclxuXHJcbiAgICB0aGlzLmNoaWxkcmVuID0gY2hpbGRyZW4ubWFwKChjaGlsZCkgPT4ge1xyXG4gICAgICBpZiAoQXJyYXkuaXNBcnJheShjaGlsZCkpIHJldHVybiBuZXcgRnJhZ21lbnRWTm9kZShjaGlsZCk7XHJcbiAgICAgIGlmIChjaGlsZCBpbnN0YW5jZW9mIFZOb2RlKSByZXR1cm4gY2hpbGQ7XHJcbiAgICAgIGlmIChjaGlsZCBpbnN0YW5jZW9mIE5vZGUpIHJldHVybiBuZXcgTGl2ZU5vZGVWTm9kZShjaGlsZCk7XHJcbiAgICAgIGlmICghdHJ1dGh5KGNoaWxkKSkgcmV0dXJuIG5ldyBOdWxsVk5vZGUoKTtcclxuICAgICAgcmV0dXJuIG5ldyBUZXh0Vk5vZGUoY2hpbGQgYXMgc3RyaW5nIHwgbnVtYmVyKTtcclxuICAgIH0pO1xyXG5cclxuICAgIHRoaXMuY2hpbGRyZW4uZm9yRWFjaCgoY2hpbGQpID0+IChjaGlsZC5wYXJlbnQgPSB0aGlzKSk7XHJcbiAgfVxyXG5cclxuICBhc05vZGUoKSB7XHJcbiAgICBjb25zdCBub2RlID0gYXNOb2RlKHVuZGVmaW5lZCwge30sIHRoaXMuY2hpbGRyZW4pWzBdO1xyXG5cclxuICAgIHJldHVybiBub2RlO1xyXG4gIH1cclxuXHJcbiAgdG9TdHJpbmcoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5jaGlsZHJlbi5tYXAoKGNoaWxkKSA9PiBjaGlsZC50b1N0cmluZygpKS5qb2luKFwiXCIpO1xyXG4gIH1cclxuXHJcbiAgLy8gdG8gbGV2ZWxcclxuICBkaWZmQW5kUGF0Y2gobmV3Vk5vZGU6IEZyYWdtZW50Vk5vZGUpIHtcclxuICAgIHJldHVybiBkaWZmQW5kUGF0Y2hDaGlsZHJlbih0aGlzLCBuZXdWTm9kZSk7XHJcbiAgfVxyXG5cclxuICByZW1vdmVGcm9tRE9NKCkge1xyXG4gICAgdGhpcy5jaGlsZHJlbi5mb3JFYWNoKChjaGlsZCkgPT4gY2hpbGQucmVtb3ZlRnJvbURPTSgpKTtcclxuICB9XHJcbn1cclxuXHJcbmNsYXNzIFRleHRWTm9kZSBleHRlbmRzIFZOb2RlIGltcGxlbWVudHMgVk5vZGVJbnRlcmZhY2Uge1xyXG4gIHR5cGUgPSBcIlRleHROb2RlXCI7XHJcbiAgY2hpbGRyZW4gPSBbXTtcclxuICBub2RlOiBUZXh0ID0gbnVsbCBhcyBhbnk7XHJcbiAgcHJvcHM6IHsgY29udGVudDogYW55IH07XHJcbiAgcGFyZW50OiBWTm9kZUludGVyZmFjZSA9IG51bGwgYXMgYW55O1xyXG5cclxuICAvKipcclxuICAgKlxyXG4gICAqL1xyXG4gIGNvbnN0cnVjdG9yKGNvbnRlbnQ6IHN0cmluZyB8IG51bWJlciB8IGJvb2xlYW4pIHtcclxuICAgIHN1cGVyKCk7XHJcbiAgICB0aGlzLnByb3BzID0geyBjb250ZW50IH07IC8vQFRPRE86XHJcbiAgfVxyXG5cclxuICBhc05vZGUoKSB7XHJcbiAgICBjb25zdCB0ZXh0Tm9kZSA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKHRoaXMucHJvcHMuY29udGVudCk7XHJcbiAgICB0aGlzLm5vZGUgPSB0ZXh0Tm9kZTtcclxuICAgIHJldHVybiB0ZXh0Tm9kZTtcclxuICB9XHJcblxyXG4gIHRvU3RyaW5nKCkge1xyXG4gICAgcmV0dXJuIHNhbml0aXplKHRoaXMucHJvcHMuY29udGVudCk7XHJcbiAgfVxyXG5cclxuICBkaWZmQW5kUGF0Y2gobmV3Tm9kZTogVGV4dFZOb2RlKSB7XHJcbiAgICB0aGlzLm5vZGUubm9kZVZhbHVlID0gbmV3Tm9kZS5wcm9wcy5jb250ZW50O1xyXG4gICAgbmV3Tm9kZS5ub2RlID0gdGhpcy5ub2RlO1xyXG4gIH1cclxuXHJcbiAgcmVtb3ZlRnJvbURPTSgpIHtcclxuICAgIHRoaXMubm9kZS5wYXJlbnRFbGVtZW50IS5yZW1vdmVDaGlsZCh0aGlzLm5vZGUpO1xyXG4gIH1cclxufVxyXG5cclxuY2xhc3MgTnVsbFZOb2RlIGV4dGVuZHMgVk5vZGUgaW1wbGVtZW50cyBWTm9kZUludGVyZmFjZSB7XHJcbiAgdHlwZSA9IFwiTnVsbFwiO1xyXG4gIGNoaWxkcmVuID0gW107XHJcbiAgcGFyZW50OiBWTm9kZUludGVyZmFjZSA9IG51bGwgYXMgYW55O1xyXG4gIC8qKlxyXG4gICAqXHJcbiAgICovXHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICBzdXBlcigpO1xyXG4gIH1cclxuXHJcbiAgYXNOb2RlKCkge1xyXG4gICAgLy9yZXR1cm4gbnVsbDsgLy8gcmV0dXJuIGVtcHR5IGZyYWdtZW50P1xyXG4gICAgcmV0dXJuIGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcclxuICB9XHJcblxyXG4gIGRpZmZBbmRQYXRjaChuZXdOb2RlMjogTnVsbFZOb2RlKSB7XHJcbiAgICByZXR1cm47XHJcbiAgfVxyXG5cclxuICByZW1vdmVGcm9tRE9NKCkge1xyXG4gICAgcmV0dXJuO1xyXG4gIH1cclxuXHJcbiAgdG9TdHJpbmcoKSB7XHJcbiAgICByZXR1cm4gXCJcIjtcclxuICB9XHJcbn1cclxuXHJcbmNsYXNzIExpdmVOb2RlVk5vZGUgZXh0ZW5kcyBWTm9kZSBpbXBsZW1lbnRzIFZOb2RlSW50ZXJmYWNlIHtcclxuICB0eXBlID0gXCJOb2RlXCI7XHJcbiAgY2hpbGRyZW4gPSBbXTtcclxuICBwYXJlbnQ6IFZOb2RlSW50ZXJmYWNlID0gbnVsbCBhcyBhbnk7XHJcbiAgbm9kZTogQ2hpbGROb2RlO1xyXG5cclxuICAvKipcclxuICAgKlxyXG4gICAqL1xyXG4gIGNvbnN0cnVjdG9yKG5vZGU6IENoaWxkTm9kZSkge1xyXG4gICAgc3VwZXIoKTtcclxuICAgIHRoaXMubm9kZSA9IG5vZGU7XHJcbiAgfVxyXG5cclxuICBhc05vZGUoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5ub2RlO1xyXG4gIH1cclxuXHJcbiAgZGlmZkFuZFBhdGNoKG5ld05vZGU6IExpdmVOb2RlVk5vZGUpIHtcclxuICAgIGlmIChuZXdOb2RlLm5vZGUgIT09IHRoaXMubm9kZSkge1xyXG4gICAgICB0aGlzLm5vZGUucmVwbGFjZVdpdGgobmV3Tm9kZS5ub2RlKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHJlbW92ZUZyb21ET00oKSB7XHJcbiAgICB0aGlzLm5vZGUucGFyZW50RWxlbWVudCEucmVtb3ZlQ2hpbGQodGhpcy5ub2RlKTtcclxuICB9XHJcblxyXG4gIHRvU3RyaW5nKCkge1xyXG4gICAgcmV0dXJuIGdldE91dGVySHRtbCh0aGlzLm5vZGUpO1xyXG4gIH1cclxufVxyXG5cclxuY2xhc3MgUm9vdFZOb2RlIGV4dGVuZHMgVk5vZGUgaW1wbGVtZW50cyBWTm9kZUludGVyZmFjZSB7XHJcbiAgdHlwZSA9IFwiUm9vdFwiO1xyXG4gIHBhcmVudCA9IG51bGw7XHJcbiAgbm9kZTogRWxlbWVudDtcclxuICBjaGlsZHJlbjogVk5vZGVJbnRlcmZhY2VbXTtcclxuICAvKipcclxuICAgKlxyXG4gICAqL1xyXG4gIGNvbnN0cnVjdG9yKGNvbnRlbnQ6IFZOb2RlSW50ZXJmYWNlLCBkb21Ob2RlOiBFbGVtZW50KSB7XHJcbiAgICBzdXBlcigpO1xyXG4gICAgY29udGVudC5wYXJlbnQgPSB0aGlzO1xyXG4gICAgdGhpcy5jaGlsZHJlbiA9IFtjb250ZW50XTtcclxuICAgIHRoaXMubm9kZSA9IGRvbU5vZGU7XHJcbiAgfVxyXG5cclxuICBhc05vZGUoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5jaGlsZHJlblswXS5hc05vZGUoKTtcclxuICB9XHJcbiAgdG9TdHJpbmcoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5jaGlsZHJlblswXS50b1N0cmluZygpO1xyXG4gIH1cclxuXHJcbiAgZGlmZkFuZFBhdGNoKG5ld1ZOb2RlOiBWTm9kZUludGVyZmFjZSkge1xyXG4gICAgZGlmZkFuZFBhdGNoQ2hpbGRyZW4odGhpcywgbmV3Vk5vZGUpO1xyXG4gIH1cclxuXHJcbiAgcmVtb3ZlRnJvbURPTSgpIHtcclxuICAgIHRoaXMubm9kZS5yZW1vdmUoKTtcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGFzVk5vZGUoXHJcbiAgdGFnOiBzdHJpbmcgfCBGdW5jdGlvbiB8IHVuZGVmaW5lZCxcclxuICBwcm9wczogSnN4UHJvcHNcclxuKTogVk5vZGVJbnRlcmZhY2Uge1xyXG4gIGNvbnNvbGUubG9nKFwiYXNWTm9kZTpcIiwgeyB0YWcsIHByb3BzIH0pO1xyXG5cclxuICBpZiAodHlwZW9mIHRhZyA9PT0gXCJmdW5jdGlvblwiKSB7XHJcbiAgICBsZXQgcmVzdWx0ID0gdGFnKHByb3BzKTtcclxuICAgIGlmIChyZXN1bHQgaW5zdGFuY2VvZiBWTm9kZSkgcmV0dXJuIHJlc3VsdDtcclxuICAgIGlmIChyZXN1bHQgaW5zdGFuY2VvZiBOb2RlKSByZXR1cm4gbmV3IExpdmVOb2RlVk5vZGUocmVzdWx0KTtcclxuICAgIC8vIG51bGwganN4IG5vZGVcclxuICAgIGlmICghdHJ1dGh5KHJlc3VsdCkpIHJldHVybiBuZXcgTnVsbFZOb2RlKCk7XHJcblxyXG4gICAgcmV0dXJuIG5ldyBUZXh0Vk5vZGUocmVzdWx0KTtcclxuICB9XHJcblxyXG4gIGNvbnN0IHsgY2hpbGRyZW4sIC4uLmF0dHIgfSA9IHByb3BzO1xyXG4gIGlmICh0YWcpIHtcclxuICAgIHJldHVybiBuZXcgRWxlbWVudFZOb2RlKHsgdGFnLCBwcm9wczogYXR0ciwgY2hpbGRyZW4gfSk7IC8vIG9yIHNpbXBseSBwYXNzIGNpbGRyZW4gd2l0aCBwcm9wc1xyXG4gIH0gZWxzZSBpZiAoIXRydXRoeShhdHRyKSkge1xyXG4gICAgY29uc3Qgdk5vZGUgPSBuZXcgTnVsbFZOb2RlKCk7XHJcbiAgICAvL3ZOb2RlLnBhcmVudCA9IHRoaXM7XHJcbiAgICByZXR1cm4gdk5vZGU7XHJcbiAgfSBlbHNlIGlmIChjaGlsZHJlbikge1xyXG4gICAgcmV0dXJuIG5ldyBGcmFnbWVudFZOb2RlKGNoaWxkcmVuKTtcclxuICB9XHJcblxyXG4gIC8vIGVsc2U/IC8vIEBUT0RPOj9cclxufVxyXG5cclxuLyoqXHJcbiAqIGNvbnZlcnRzIHByYWdtYSBvYmplY3QgdG8gaHRtbCBzdHJpbmdcclxuICoganN4cyBpcyBhbHdheXMgY2FsbGVkIHdoZW4gZWxlbWVudCBoYXMgbW9yZSB0aGFuIG9uZSBjaGlsZFxyXG4gKlxyXG4gKiBAcGFyYW0ge3N0cmluZyB8IEZ1bmN0aW9ufSB0YWcgLSB0YWcgbmFtZSBvciB0YWcgY2xhc3NcclxuICogQHBhcmFtIHtPYmplY3QgfCBudWxsfSBwcm9wcyAtIHByb3BzIGZvciB0aGUgdGFnXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24ganN4cyhcclxuICB0YWc6IHN0cmluZyB8IEZ1bmN0aW9uLFxyXG4gIHByb3BzOiBKc3hQcm9wc1xyXG4pOiBKc3hOb2RlSW50ZXJmYWNlIHtcclxuICByZXR1cm4gYXNWTm9kZSh0YWcsIHByb3BzKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIGNvbnZlcnRzIHRoZSBmcmFnbWVudHMgb2JqZWN0IHRvIG5vZGVzXHJcbiAqXHJcbiAqIEBwYXJhbSB7T2JqZWN0fSBwcm9wc1xyXG4gKiBAcGFyYW0ge0FycmF5fSBwcm9wcy5jaGlsZHJlbiAtIGNoaWxkIGVsZW1lbnRzIGluIHRoZSBmcmFnbWVudFxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIEZyYWdtZW50KHByb3BzOiBKc3hQcm9wcykge1xyXG4gIHJldHVybiBhc1ZOb2RlKHVuZGVmaW5lZCwgcHJvcHMpO1xyXG59XHJcblxyXG4vLyBqc3ggaXMgY2FsbGVkIHdoZW4gdGhlIGVsZW1lbnQgaGFzIG9uZSBvciB6ZXJvIGNoaWxkcmVuXHJcbmV4cG9ydCBmdW5jdGlvbiBqc3goXHJcbiAgdGFnOiBzdHJpbmcgfCBGdW5jdGlvbixcclxuICBwcm9wczogQXR0cmlidXRlcyAmXHJcbiAgICBTcGVjaWFsQXR0cmlidXRlcyAmIHsgY2hpbGRyZW4/OiBzdHJpbmcgfCBOb2RlIHwgSnN4Tm9kZUludGVyZmFjZSB9XHJcbik6IEpzeE5vZGVJbnRlcmZhY2Uge1xyXG4gIC8vIEB0cy1pZ25vcmUgLSB3cmFwcGluZyB0aGUgY2hpbGRyZW4gYXMgYXJyYXkgdG8gcmUtdXNlIGpzeHMgbWV0aG9kXHJcbiAgcHJvcHMuY2hpbGRyZW4gPSBwcm9wcy5oYXNPd25Qcm9wZXJ0eShcImNoaWxkcmVuXCIpID8gW3Byb3BzLmNoaWxkcmVuXSA6IFtdO1xyXG5cclxuICByZXR1cm4ganN4cyh0YWcsIChwcm9wcyBhcyB1bmtub3duKSBhcyBKc3hQcm9wcyk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiByZW5kZXIgdGhlIGdpdmVuIG1hcmt1cCBpbnRvIHRoZSBnaXZlbiBkb20gbm9kZVxyXG4gKlxyXG4gKiBAcGFyYW0ge3N0cmluZ3xIVE1MRWxlbWVudHxKU1h9IG1hcmt1cCAtIGh0bWwgYXMgc3RyaW5nLCBodG1sIGVsZW1lbnQgb3IganN4IHRlbXBsYXRlXHJcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGRvbU5vZGUgLSBjb250YWluZXIgZm9yIHRoZSB0ZW1wbGF0ZSB0byBiZSByZW5kZXJlZCBpbnRvXHJcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW2FwcGVuZD1mYWxzZV0gLSBzaG91bGQgdGhlIHByb3ZpZGVkIG1hcmt1cCBiZSBhcHBlbmRlZCB0byB0aGUgZXhpc3RpbmcgbWFya3VwLCBvciBkZWZhdWx0IHJlcGxhY2UgaXRcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiByZW5kZXIoXHJcbiAgbWFya3VwOiBzdHJpbmcgfCBIVE1MRWxlbWVudCB8IEpzeE5vZGVJbnRlcmZhY2UsIC8vIEBUT0RPOiBzcGVjaWZpYyBzdXBwb3J0IGZvciBUZW1wbGF0ZT8gKC5jb250ZW50LmNsb25lKVxyXG4gIGRvbU5vZGU6IEhUTUxFbGVtZW50LFxyXG4gIGFwcGVuZDogYm9vbGVhbiA9IGZhbHNlXHJcbikge1xyXG4gIEFycmF5LmZyb20oZG9jdW1lbnQuYm9keS5xdWVyeVNlbGVjdG9yQWxsKFwiKlwiKSkuZm9yRWFjaChcclxuICAgIChlbCkgPT4gKGVsLnN0eWxlLmJhY2tncm91bmQgPSBcIiNjY2ZmY2NcIilcclxuICApO1xyXG5cclxuICBjb25zdCBpc1JlUmVuZGVyID0gcmVuZGVyZWRWVHJlZXMuaGFzKGRvbU5vZGUpO1xyXG4gIGlmICghYXBwZW5kICYmICFpc1JlUmVuZGVyKSBkb21Ob2RlLmlubmVySFRNTCA9IFwiXCI7XHJcblxyXG4gIGlmICh0eXBlb2YgbWFya3VwID09PSBcInN0cmluZ1wiKSB7XHJcbiAgICBkb21Ob2RlLmluc2VydEFkamFjZW50SFRNTChcImJlZm9yZWVuZFwiLCBtYXJrdXApOyAvLyBzYW5pdGl6ZT9cclxuICB9IGVsc2UgaWYgKG1hcmt1cCBpbnN0YW5jZW9mIE5vZGUpIHtcclxuICAgIGRvbU5vZGUuaW5zZXJ0QWRqYWNlbnRFbGVtZW50KFwiYmVmb3JlZW5kXCIsIG1hcmt1cCk7XHJcbiAgfSBlbHNlIGlmIChtYXJrdXAgaW5zdGFuY2VvZiBWTm9kZSkge1xyXG4gICAgbGV0IHZUcmVlID0gbmV3IFJvb3RWTm9kZShtYXJrdXAsIGRvbU5vZGUpO1xyXG5cclxuICAgIGNvbnNvbGUubG9nKFwiIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjXFxuXCIsIFwidlRyZWU6XCIsIHZUcmVlKTtcclxuXHJcbiAgICBpZiAoaXNSZVJlbmRlcikge1xyXG4gICAgICBjb25zb2xlLmxvZyhcImlzIHJlLXJlbmRlclwiKTtcclxuICAgICAgY29uc3Qgb2xkVlRyZWUgPSByZW5kZXJlZFZUcmVlcy5nZXQoZG9tTm9kZSk7XHJcblxyXG4gICAgICBjb25zb2xlLmxvZyhcIiMjIyMjIyMjIyMjXFxuXCIsIHsgb2xkVlRyZWUsIG5ld1ZUcmVlOiB2VHJlZSB9KTtcclxuXHJcbiAgICAgIC8vIHdhcyBwcmV2aW91c2x5IHJlbmRlcmVkIGFzIGEgc3VidHJlZSBmcm9tIGFub3RoZXIgcmVuZGVyXHJcbiAgICAgIGlmIChvbGRWVHJlZS50eXBlID09PSBcIkVsZW1lbnRcIikge1xyXG4gICAgICAgIHZUcmVlID0gRWxlbWVudFZOb2RlLmZyb21FeGlzdGluZ0VsZW1lbnROb2RlKG9sZFZUcmVlLCBbbWFya3VwXSk7XHJcbiAgICAgICAgb2xkVlRyZWUuZGlmZkFuZFBhdGNoKHZUcmVlKTtcclxuICAgICAgICAvLyB1cGRhdGUgdGhlIGNoaWxkcmVuIHByb3BlcnR5IGluIHRoZSBtZW1vcnkgcmVmZXJlbmNlIGZyb20gdGhlIHByZXZpb3VzIHJlbmRlcixcclxuICAgICAgICAvLyBhdHRyaWJ1dGVzLCBldGMgd2lsbCBzdGF5IHRoZSBzYW1lXHJcbiAgICAgICAgb2xkVlRyZWUuY2hpbGRyZW4gPSB2VHJlZS5jaGlsZHJlbjtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICAvLyBkaWZmXHJcbiAgICAgICAgb2xkVlRyZWUuZGlmZkFuZFBhdGNoKHZUcmVlKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgcmVuZGVyZWRWVHJlZXMuc2V0KGRvbU5vZGUsIHZUcmVlKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNvbnN0IGNvbnRlbnQgPSB2VHJlZS5hc05vZGUoKTtcclxuICAgICAgZG9tTm9kZS5hcHBlbmQoY29udGVudCk7XHJcbiAgICB9XHJcblxyXG4gICAgcmVuZGVyZWRWVHJlZXMuc2V0KGRvbU5vZGUsIHZUcmVlKTtcclxuXHJcbiAgICB3aGlsZSAocmVmc1RvQ2FsbC5sZW5ndGgpIHtcclxuICAgICAgLy8gcmVtb3ZlIGZpcnN0IGZyb20gbGlzdCwgYW5kIGludm9rZSBpdFxyXG4gICAgICByZWZzVG9DYWxsLnNwbGljZSgwLCAxKVswXSgpO1xyXG4gICAgfVxyXG4gIH0gZWxzZSB7XHJcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJyZW5kZXIgbWV0aG9kIGNhbGxlZCB3aXRoIHdyb25nIGFyZ3VtZW50KHMpXCIpO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHJhd0h0bWwoY29udGVudDogc3RyaW5nKTogVk5vZGVJbnRlcmZhY2Uge1xyXG4gIHJldHVybiBuZXcgKGNsYXNzIGV4dGVuZHMgVk5vZGUgaW1wbGVtZW50cyBWTm9kZUludGVyZmFjZSB7XHJcbiAgICBwYXJlbnQ6IFZOb2RlSW50ZXJmYWNlID0gbnVsbCBhcyBhbnk7XHJcbiAgICBjaGlsZHJlbiA9IFtdO1xyXG4gICAgdHlwZSA9IFwiUmF3SHRtbFwiO1xyXG4gICAgY2hpbGROb2RlczogQ2hpbGROb2RlW107XHJcbiAgICBjb250ZW50OiBzdHJpbmc7XHJcbiAgICBub2RlPzogQ2hpbGROb2RlO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICpcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IoY29udGVudDogc3RyaW5nKSB7XHJcbiAgICAgIHN1cGVyKCk7XHJcbiAgICAgIHRoaXMuY29udGVudCA9IGNvbnRlbnQ7XHJcbiAgICB9XHJcbiAgICByZW1vdmVGcm9tRE9NKCkge1xyXG4gICAgICB0aGlzLmNoaWxkTm9kZXMuZm9yRWFjaCgobm9kZSkgPT4gbm9kZS5wYXJlbnRFbGVtZW50IS5yZW1vdmVDaGlsZChub2RlKSk7XHJcbiAgICB9XHJcblxyXG4gICAgZGlmZkFuZFBhdGNoKG5ld05vZGU6IFZOb2RlSW50ZXJmYWNlKSB7XHJcbiAgICAgIGlmICgobmV3Tm9kZS5jb250ZW50ID0gdGhpcy5jb250ZW50KSkge1xyXG4gICAgICAgIG5ld05vZGUubm9kZSA9IHRoaXMubm9kZTtcclxuICAgICAgICBuZXdOb2RlLmNoaWxkTm9kZXMgPSB0aGlzLmNoaWxkTm9kZXM7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcbiAgICAgIHRoaXMucmVtb3ZlRnJvbURPTSgpO1xyXG4gICAgICBpbnNlcnROZXdJdGVtKG5ld05vZGUpO1xyXG4gICAgfVxyXG5cclxuICAgIHRvU3RyaW5nKCkge1xyXG4gICAgICByZXR1cm4gY29udGVudDtcclxuICAgIH1cclxuXHJcbiAgICBhc05vZGUoKSB7XHJcbiAgICAgIGNvbnN0IHRlbXBsYXRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRlbXBsYXRlXCIpO1xyXG4gICAgICB0ZW1wbGF0ZS5pbm5lckhUTUwgPSB0aGlzLmNvbnRlbnQ7XHJcbiAgICAgIGNvbnN0IGRvY3VtZW50RnJhZ21lbnQgPSB0ZW1wbGF0ZS5jb250ZW50O1xyXG4gICAgICB0aGlzLmNoaWxkTm9kZXMgPSBBcnJheS5mcm9tKGRvY3VtZW50RnJhZ21lbnQuY2hpbGROb2Rlcyk7XHJcblxyXG4gICAgICAvLyBiYXNpY2FsbHkgdGhlIGAubm9kZWAgcHJvcGVydHkgaXMgdXNlZCB0byBkZXRlcm1pbmUgdGhlIGxhc3QgaHRtbCBub2RlIG9mIHRoZSBWTm9kZSxcclxuICAgICAgLy8gdG8gcG9zaXRpb24gdGhlIG5leHQgVk5vZGUncyBET00gTm9kZSBhZnRlciBpdC5cclxuICAgICAgLy8gdGhlcmVmb3JlIC5ub2RlIHJldHVybnMgdGhlIGxhc3Qgbm9kZSBvZiB0aGUgcmF3IGh0bWxcclxuICAgICAgaWYgKHRoaXMuY2hpbGROb2Rlcy5sZW5ndGgpXHJcbiAgICAgICAgdGhpcy5ub2RlID0gdGhpcy5jaGlsZE5vZGVzW3RoaXMuY2hpbGROb2Rlcy5sZW5ndGggLSAxXTtcclxuICAgICAgcmV0dXJuIGRvY3VtZW50RnJhZ21lbnQ7XHJcbiAgICB9XHJcbiAgfSkoY29udGVudCk7XHJcbn1cclxuXHJcbi8vIGdvdGNoYXM6XHJcbi8vIC0gc3R5bGVzIHdpbGwgb3ZlcnJpZGUgKGNvdWxkIGRvOiBzZXR0aW5nIGVhY2ggcnVsZSBpbmRpdmlkdWFsbHkpXHJcbi8vIC0gcmVmIDogaW5saW5lIGZ1bmMgd2lsbCBiZSByZWNvZ25pemVkIGFzIG5ldyBmdW5jdGlvblxyXG5cclxud2luZG93LnJlbmRlcmVkVlRyZWVzID0gcmVuZGVyZWRWVHJlZXM7XHJcblxyXG4vLyBURVNUIENBU0VTXHJcbi8vIDEtIHN2ZyA8LT4gbnVsbFxyXG4vLyAyLSBzdmcgLT4gY2hpbGRcclxuLy8gMy0gZGl2IDwtPiBGdW5jIDwtPiBudWxsXHJcbiIsImltcG9ydCB7IHJlbmRlciwgcmF3SHRtbCB9IGZyb20gXCIuL2pzeC9qc3gtcnVudGltZVwiO1xyXG5cclxuY29uc3QgeHNzID0gXCI8aW1nIHNyYz14IG9uZXJyb3I9XFxcImFsZXJ0KCdYU1MgQXR0YWNrJylcXFwiPlwiOyAvL1wiPHNjcmlwdD5hbGVydCgnLS4tJyk8L3NjcmlwdD5cIjtcclxuXHJcbmZ1bmN0aW9uIFJURShwcm9wczogLyp7IHR4dCwgXCJvbi1jbGlja1wiOiBvbkNsaWNrIH0qLyB7XHJcbiAgdHh0OiBzdHJpbmc7XHJcbiAgcmVmPzogRnVuY3Rpb247XHJcbn0pIHtcclxuICBjb25zb2xlLmxvZyhcIm9uQ2xpY2tcIiwgcHJvcHNbXCJvbi1jbGlja1wiXSk7XHJcbiAgcmV0dXJuIChcclxuICAgIDxwIHJlZj17KGVsOiBIVE1MRWxlbWVudCkgPT4gY29uc29sZS5sb2coXCJteSBkaXYgOjpyZWY6OjMuMlwiLCBlbCl9PlxyXG4gICAgICB7cHJvcHMudHh0fVxyXG4gICAgPC9wPlxyXG4gICk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIEJ1dHRvbih7XHJcbiAgY2hpbGRyZW4sXHJcbiAgZGlzYWJsZWQsXHJcbn06IHtcclxuICBjaGlsZHJlbjogYW55O1xyXG4gIGRpc2FibGVkOiBib29sZWFuO1xyXG4gIHJlZj86IEZ1bmN0aW9uO1xyXG59KSB7XHJcbiAgcmV0dXJuIChcclxuICAgIDxidXR0b25cclxuICAgICAgZGlzYWJsZWQ9e2Rpc2FibGVkfVxyXG4gICAgICByZWY9eyhlbDogSFRNTEVsZW1lbnQpID0+IGNvbnNvbGUubG9nKFwibXkgYnV0dG9uIDo6cmVmOjoxXCIsIGVsKX1cclxuICAgID5cclxuICAgICAgPHNwYW4gcmVmPXsoZWw6IEhUTUxFbGVtZW50KSA9PiBjb25zb2xlLmxvZyhcIm15IGEgOjpyZWY6OjJcIiwgZWwpfT5cclxuICAgICAgICBCdG4tc3Bhbi1maXJzdFxyXG4gICAgICA8L3NwYW4+XHJcbiAgICAgIHtjaGlsZHJlbn1cclxuICAgICAgPD5cclxuICAgICAgICA8c3BhbiByZWY9eyhlbDogSFRNTEVsZW1lbnQpID0+IGNvbnNvbGUubG9nKFwibXkgYSA6OnJlZjo6M1wiLCBlbCl9PlxyXG4gICAgICAgICAgQnRuLXNwYW4tZW5kXHJcbiAgICAgICAgPC9zcGFuPlxyXG4gICAgICA8Lz5cclxuICAgIDwvYnV0dG9uPlxyXG4gICk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHJlZmxvZyhlbDogSFRNTEVsZW1lbnQpIHtcclxuICBjb25zb2xlLmxvZyhcIm15IGlubmVyIGRpdjo6cmVmOjo4XCIsIGVsKTtcclxufVxyXG5cclxuLypcclxuY29uc3QgbWFya3VwID0gKFxyXG4gIDw+XHJcbiAgICA8ZGl2XHJcbiAgICAgIGNsYXNzPVwiZm9vXCJcclxuICAgICAgcmVmPXsoZWw6IEhUTUxFbGVtZW50KSA9PiBjb25zb2xlLmxvZyhcIm15IGRpdiA6OnJlZjo6NFwiLCBlbCl9XHJcbiAgICAvPlxyXG4gICAgPGlucHV0IGRpc2FibGVkPXt0cnVlfSBoaWRkZW49e2ZhbHNlfSAvPlxyXG4gICAgPEJ1dHRvblxyXG4gICAgICBkaXNhYmxlZD17dHJ1ZX1cclxuICAgICAgcmVmPXsoZWw6IEhUTUxFbGVtZW50KSA9PiBjb25zb2xlLmxvZyhcIm15IEJVVFRPTjo6cmVmOjo1XCIsIGVsKX1cclxuICAgID5cclxuICAgICAgdGV4dFxyXG4gICAgICA8cG9wdXAtaW5mb1xyXG4gICAgICAgIHJlZj17KGVsOiBIVE1MRWxlbWVudCkgPT4gY29uc29sZS5sb2coXCJzcGFuIGluIEJVVFRPTjo6cmVmOjo2XCIsIGVsKX1cclxuICAgICAgPlxyXG4gICAgICAgIGJsYVxyXG4gICAgICA8L3BvcHVwLWluZm8+XHJcbiAgICA8L0J1dHRvbj5cclxuICAgIDxSVEVcclxuICAgICAgdHh0PVwibGUgdGV4dFwiXHJcbiAgICAgIHJlZj17KGVsOiBIVE1MRWxlbWVudCkgPT4gY29uc29sZS5sb2coXCJteSBkaXYgOjpyZWY6OjMuMVwiLCBlbCl9XHJcbiAgICAgIG9uLWNsaWNrPXsoZTogSFRNTEVsZW1lbnQpID0+IGNvbnNvbGUubG9nKGUpfVxyXG4gICAgLz5cclxuICAgIHt4c3N9XHJcbiAgICB7cmF3SHRtbChgPG9sPjxsaT5yYXcgaHRtbDwvbGk+PC9vbD5gKX1cclxuICAgIDxkaXZcclxuICAgICAgY2xhc3M9XCJiYW1cIlxyXG4gICAgICByZWY9eyhlbDogSFRNTEVsZW1lbnQpID0+IGNvbnNvbGUubG9nKFwibXkgZGl2OjpyZWY6OjdcIiwgZWwpfVxyXG4gICAgPlxyXG4gICAgICA8ZGl2PlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJiYXJcIiBvbi1jbGljaz17KGUpID0+IGNvbnNvbGUubG9nKGUpfSByZWY9e3JlZmxvZ30+XHJcbiAgICAgICAgICBjbGljayBNRVxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDxkaXYgc3R5bGU9e3sgb3V0bGluZTogXCIxcHggc29saWQgcmVkO1wiIH19PlxyXG4gICAgICAgICAge2RvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjb2xkXCIpfVxyXG4gICAgICAgICAge251bGx9XHJcbiAgICAgICAgICB7WzAsIDFdLm1hcCgobikgPT4gKFxyXG4gICAgICAgICAgICA8c3Bhbj57bn08L3NwYW4+XHJcbiAgICAgICAgICApKX1cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgPC9kaXY+XHJcbiAgICA8L2Rpdj5cclxuICA8Lz5cclxuKTtcclxuXHJcbiovXHJcblxyXG4vKlxyXG5jb25zdCBtYXJrdXAgPSAoXHJcbiAgPEJ1dHRvbiBkaXNhYmxlZD17dHJ1ZX0+XHJcbiAgICAgIDxib2xkIHJlZj17cmVmbG9nfT4tLUlOTkVSLS08L2JvbGQ+XHJcbiAgPC9CdXR0b24+XHJcbik7Ki9cclxuLypcclxuXHJcbmNvbnN0IG1hcmt1cCA9IChcclxuICA8ZGl2IGNsYXNzPVwiZm9vXCIgcmVmPXsoZWw6IEhUTUxFbGVtZW50KSA9PiBjb25zb2xlLmxvZyhcIm15IGRpdjo6cmVmOjpcIiwgZWwpfT5cclxuICAgIDxkaXY+XHJcbiAgICAgIDxkaXYgY2xhc3M9XCJiYXJcIiByZWY9eyhlbDogSFRNTEVsZW1lbnQpID0+IGNvbnNvbGUubG9nKFwibXkgaW5uZXIgZGl2OjpyZWY6OlwiLCBlbCl9IC8+XHJcbiAgICA8L2Rpdj5cclxuICAgIDxCdXR0b24gZGlzYWJsZWQ9e3RydWV9PjwvQnV0dG9uPlxyXG4gIDwvZGl2PlxyXG4pO1xyXG4qL1xyXG4vKlxyXG5jb25zdCBtYXJrdXAgPSAoXHJcbiAgPGE+XHJcbiAgICA8Yj5cclxuICAgICAgPGMgY2xhc3M9XCJiYXJcIiByZWY9e3JlZmxvZ30gLz5cclxuICAgIDwvYj5cclxuICA8L2E+XHJcbik7XHJcbiovXHJcblxyXG5mdW5jdGlvbiBTcGFuKHsgbW9kZSB9OiB7IG1vZGU6IGFueSB9KSB7XHJcbiAgcmV0dXJuIG1vZGUgPT09IDEgPyAoXHJcbiAgICA8ZGl2PlxyXG4gICAgICA8c3BhbiBpZD1cImlubmVyXCIgb2xkPXt0cnVlfT5cclxuICAgICAgICBTcGFuLUNvbXAtLW9sZFxyXG4gICAgICA8L3NwYW4+XHJcbiAgICAgIDxoMz50byBiZSByZW1vdmVkPC9oMz5cclxuICAgIDwvZGl2PlxyXG4gICkgOiAoXHJcbiAgICA8ZGl2PlxyXG4gICAgICA8cCBpZD1cImlubmVyXCIgbmV3PXt0cnVlfT5cclxuICAgICAgICBTcGFuLUNvbXAtLW5ld3NcclxuICAgICAgPC9wPlxyXG4gICAgPC9kaXY+XHJcbiAgKTtcclxufVxyXG5cclxuZnVuY3Rpb24gQ29tcCh7IG51bSB9KSB7XHJcbiAgaWYgKG51bSA9PT0gMSkgcmV0dXJuIG51bGw7XHJcbiAgcmV0dXJuIChcclxuICAgIDxkaXY+XHJcbiAgICAgIDxwPmNvbXA8L3A+XHJcbiAgICA8L2Rpdj5cclxuICApO1xyXG59XHJcblxyXG5jb25zdCBtYXJrdXAxID0gKG51bTogYW55KSA9PiAoXHJcbiAgPGRpdiBpZD1cIm91dGVyXCIgZGF0YS1mb289XCJiYXJcIiBkYXRhLXZhcj17bnVtfT5cclxuICAgIDxoMz5zaG91bGQgZ2V0IDIgLTogMzwvaDM+XHJcbiAgICB7bnVtID09PSAxID8gKFxyXG4gICAgICA8dWwgY2xhc3M9XCJ1bC1jbGFzc1wiPlxyXG4gICAgICAgIDxsaT5UZXh0IDEgPC9saT5cclxuICAgICAgICA8bGk+VGV4dCAyIDwvbGk+XHJcbiAgICAgIDwvdWw+XHJcbiAgICApIDogKFxyXG4gICAgICA8dWwgY2xhc3M9XCJ1bC1jbGFzc1wiPlxyXG4gICAgICAgIDxsaT5UZXh0IDMgPC9saT5cclxuICAgICAgICA8bGk+VGV4dCAyIDwvbGk+XHJcbiAgICAgICAgPGxpPlRleHQgMSA8L2xpPlxyXG4gICAgICA8L3VsPlxyXG4gICAgKX1cclxuICAgIDxoMz5zaG91bGQgZ2V0IDMgLTogMjwvaDM+XHJcbiAgICB7bnVtID09PSAxID8gKFxyXG4gICAgICA8dWwgY2xhc3M9XCJ1bC1jbGFzc1wiPlxyXG4gICAgICAgIDxsaT5UZXh0IDEgPC9saT5cclxuICAgICAgICA8bGk+VGV4dCAyIDwvbGk+XHJcbiAgICAgICAgPGxpPlRleHQgMyA8L2xpPlxyXG4gICAgICA8L3VsPlxyXG4gICAgKSA6IChcclxuICAgICAgPHVsIGNsYXNzPVwidWwtY2xhc3NcIj5cclxuICAgICAgICA8bGk+VGV4dCAxIDwvbGk+XHJcbiAgICAgICAgPGxpPlRleHQgMiA8L2xpPlxyXG4gICAgICA8L3VsPlxyXG4gICAgKX1cclxuICAgIHtudW0gPT09IDEgPyBudWxsIDogPHA+bmV3IHJlbmRlcjwvcD59XHJcbiAgICA8ZGl2PlxyXG4gICAgICA8c3Bhbj5zcGFuLWNvbnRlbnQ8L3NwYW4+XHJcbiAgICA8L2Rpdj5cclxuICAgIDxTcGFuIG1vZGU9e251bX0gLz5cclxuICAgIHsvKmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjb2xkXCIpKi99XHJcbiAgICA8PkZyYWdtZW50LWl0ZW08Lz5cclxuICAgIDxzdmdcclxuICAgICAgdmlld0JveD1cIjAgMCAzMDAgMTAwXCJcclxuICAgICAgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiXHJcbiAgICAgIHN0cm9rZT1cInJlZFwiXHJcbiAgICAgIGZpbGw9XCJncmV5XCJcclxuICAgID5cclxuICAgICAgPGNpcmNsZSBjeD1cIjUwXCIgY3k9XCI1MFwiIHI9XCI0MFwiIC8+XHJcbiAgICAgIDxjaXJjbGUgY3g9XCIxNTBcIiBjeT1cIjUwXCIgcj1cIjRcIiAvPlxyXG5cclxuICAgICAgPHN2ZyB2aWV3Qm94PVwiMCAwIDEwIDEwXCIgeD1cIjIwMFwiIHdpZHRoPVwiMTAwXCI+XHJcbiAgICAgICAgPGNpcmNsZSBjeD1cIjVcIiBjeT1cIjVcIiByPVwiNFwiIC8+XHJcbiAgICAgIDwvc3ZnPlxyXG4gICAgPC9zdmc+XHJcbiAgPC9kaXY+XHJcbik7XHJcblxyXG5mdW5jdGlvbiBtYXJrdXAyKG51bTogYW55KSB7XHJcbiAgcmV0dXJuIChcclxuICAgIDxkaXYgaWQ9XCJvdXRlclwiPlxyXG4gICAgICA8PlxyXG4gICAgICAgIDw+XHJcbiAgICAgICAgICA8cD5uZXN0ZWQgZnJhZ21lbnQ8L3A+XHJcbiAgICAgICAgPC8+XHJcbiAgICAgIDwvPlxyXG4gICAgICA8aDE+c3RhdGljPC9oMT5cclxuICAgICAgPGgxPmR5bmFtaWMgdmFsOiB7bnVtfTwvaDE+XHJcbiAgICAgIHtudW0gPT09IDEgPyA8aDE+b2xkPC9oMT4gOiBmYWxzZX1cclxuICAgICAge251bSA9PT0gMSA/IChcclxuICAgICAgICA8PlxyXG4gICAgICAgICAgPGgxPmZyYWcgb2xkPC9oMT5cclxuICAgICAgICAgIDxzcGFuPmZyYWcgc3BhbiBvbGQ8L3NwYW4+XHJcbiAgICAgICAgPC8+XHJcbiAgICAgICkgOiAoXHJcbiAgICAgICAgPGgxPmZyYWcgbmV3PC9oMT5cclxuICAgICAgKX1cclxuICAgICAgPENvbXAgbnVtPXtudW19IC8+XHJcbiAgICA8L2Rpdj5cclxuICApO1xyXG59XHJcbmZ1bmN0aW9uIE5MKCkge1xyXG4gIHJldHVybiBudWxsO1xyXG59XHJcblxyXG5mdW5jdGlvbiBtYXJrdXAzKG51bTogYW55KSB7XHJcbiAgcmV0dXJuIG51bSA9PT0gMSA/IChcclxuICAgIDxoMT5cclxuICAgICAgQS1MaW5lIDEgLSB7bnVtfVxyXG4gICAgICA8U3BhbiBtb2RlPXtudW19IC8+XHJcbiAgICAgIDxCdXR0b25cclxuICAgICAgICBkaXNhYmxlZD17dHJ1ZX1cclxuICAgICAgICByZWY9eyhlbDogSFRNTEVsZW1lbnQpID0+IGNvbnNvbGUubG9nKFwibXkgQlVUVE9OOjpyZWY6OjVcIiwgZWwpfVxyXG4gICAgICA+XHJcbiAgICAgICAgdGV4dFxyXG4gICAgICAgIDxwb3B1cC1pbmZvXHJcbiAgICAgICAgICByZWY9eyhlbDogSFRNTEVsZW1lbnQpID0+IGNvbnNvbGUubG9nKFwic3BhbiBpbiBCVVRUT046OnJlZjo6NlwiLCBlbCl9XHJcbiAgICAgICAgPlxyXG4gICAgICAgICAgYmxhXHJcbiAgICAgICAgPC9wb3B1cC1pbmZvPlxyXG4gICAgICAgIDxwPmlubmVyIHAge251bX08L3A+XHJcbiAgICAgIDwvQnV0dG9uPlxyXG4gICAgICBBLUxpbmUgM1xyXG4gICAgICA8PlxyXG4gICAgICAgIDxwPlxyXG4gICAgICAgICAgPHA+QSBGcmFnIGxpbmUgMSo8L3A+XHJcbiAgICAgICAgPC9wPlxyXG4gICAgICAgIDxwPkEgRnJhZyBsaW5lIDI8L3A+XHJcbiAgICAgICAgPHA+QSBGcmFnIGxpbmUgMzwvcD5cclxuICAgICAgICA8cD5BIEZyYWcgbGluZSA0PC9wPlxyXG4gICAgICAgIDxzdmdcclxuICAgICAgICAgIHZpZXdCb3g9XCIwIDAgMzAwIDEwMFwiXHJcbiAgICAgICAgICB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCJcclxuICAgICAgICAgIHN0cm9rZT1cInJlZFwiXHJcbiAgICAgICAgICBmaWxsPVwiZ3JleVwiXHJcbiAgICAgICAgPlxyXG4gICAgICAgICAgPGNpcmNsZSBjeD1cIjUwXCIgY3k9XCI1MFwiIHI9XCI0MFwiIC8+XHJcbiAgICAgICAgICA8Y2lyY2xlIGN4PVwiMTUwXCIgY3k9XCI1MFwiIHI9XCI0XCIgLz5cclxuXHJcbiAgICAgICAgICA8c3ZnIHZpZXdCb3g9XCIwIDAgMTAgMTBcIiB4PVwiMjAwXCIgd2lkdGg9XCIxMDBcIj5cclxuICAgICAgICAgICAgPGNpcmNsZSBjeD1cIjVcIiBjeT1cIjVcIiByPVwiNFwiIC8+XHJcbiAgICAgICAgICA8L3N2Zz5cclxuICAgICAgICA8L3N2Zz5cclxuICAgICAgPC8+XHJcbiAgICAgIHtudWxsfVxyXG4gICAgPC9oMT5cclxuICApIDogKFxyXG4gICAgPGgxIGNsYXNzPVwiYVwiICByZWY9e2NvbnNvbGUuaW5mb30+XHJcbiAgICAgIEIgTGluZSAxIC0ge251bX1cclxuICAgICAgPFNwYW4gbW9kZT17bnVtfSAvPlxyXG4gICAgICA8QnV0dG9uXHJcbiAgICAgICAgZGlzYWJsZWQ9e3RydWV9XHJcbiAgICAgICAgcmVmPXsoZWw6IEhUTUxFbGVtZW50KSA9PiBjb25zb2xlLmxvZyhcIm15IEJVVFRPTjo6cmVmOjo1XCIsIGVsKX1cclxuICAgICAgPlxyXG4gICAgICAgIHRleHRcclxuICAgICAgICA8cG9wdXAtaW5mb1xyXG4gICAgICAgICAgcmVmPXsoZWw6IEhUTUxFbGVtZW50KSA9PiBjb25zb2xlLmxvZyhcInNwYW4gaW4gQlVUVE9OOjpyZWY6OjZcIiwgZWwpfVxyXG4gICAgICAgID5cclxuICAgICAgICAgIGJsYVxyXG4gICAgICAgIDwvcG9wdXAtaW5mbz5cclxuICAgICAgICA8cD57bnVtfTwvcD5cclxuICAgICAgPC9CdXR0b24+XHJcbiAgICAgIDw+XHJcbiAgICAgICAge2ZhbHNlfVxyXG4gICAgICAgIHtudWxsfVxyXG4gICAgICAgIHt1bmRlZmluZWR9XHJcbiAgICAgIDwvPlxyXG4gICAgICA8PlxyXG4gICAgICAgIDxwPkIgRnJhZyBsaW5lIDE8L3A+XHJcbiAgICAgICAgPHA+QiBGcmFnIGxpbmUgMjwvcD5cclxuICAgICAgICB7dW5kZWZpbmVkfVxyXG4gICAgICAgIDxwPkIgRnJhZyBsaW5lIDMoNCk8L3A+XHJcbiAgICAgICAgPHN2Z1xyXG4gICAgICAgICAgdmlld0JveD1cIjAgMCAzMDAgMTAwXCJcclxuICAgICAgICAgIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIlxyXG4gICAgICAgICAgc3Ryb2tlPVwicmVkXCJcclxuICAgICAgICAgIGZpbGw9XCJncmV5XCJcclxuICAgICAgICA+XHJcbiAgICAgICAgICA8Y2lyY2xlIGN4PVwiNTBcIiBjeT1cIjUwXCIgcj1cIjQwXCIgLz5cclxuICAgICAgICAgIDxjaXJjbGUgY3g9XCIxNTBcIiBjeT1cIjUwXCIgcj1cIjRcIiAvPlxyXG5cclxuICAgICAgICAgIDxzdmcgdmlld0JveD1cIjAgMCAxMCAxMFwiIHg9XCIyMDBcIiB3aWR0aD1cIjEwMFwiPlxyXG4gICAgICAgICAgICA8Y2lyY2xlIGN4PVwiNVwiIGN5PVwiNVwiIHI9XCI2XCIgLz5cclxuICAgICAgICAgIDwvc3ZnPlxyXG4gICAgICAgIDwvc3ZnPlxyXG4gICAgICAgIDxwPkIgRnJhZyBsaW5lIDQoNik8L3A+XHJcbiAgICAgIDwvPlxyXG4gICAgPC9oMT5cclxuICApO1xyXG59XHJcbmNvbnN0IG9iaiA9IHsgYTogMSB9O1xyXG5cclxuZnVuY3Rpb24gbWFya3VwNChudW06IGFueSkge1xyXG4gIG9iai5hID0gbnVtO1xyXG4gIHJldHVybiBudW0gPT09IDEgPyAoXHJcbiAgICA8aDEgb2JqPXtvYmp9IGlkPXtvYmouYX0+XHJcbiAgICAgIG9sZC1IZWFkbGluZSB7bnVtfVxyXG4gICAgPC9oMT5cclxuICApIDogKFxyXG4gICAgPGgxIG9iaj17b2JqfSBjbGFzcz1cImFcIiBpZD17b2JqLmF9PlxyXG4gICAgICBuZXctSGVhZGxpbmUge251bX1cclxuICAgIDwvaDE+XHJcbiAgKTtcclxufVxyXG5cclxuZnVuY3Rpb24gbWFya3VwKG51bTogYW55KSB7XHJcbiAgcmV0dXJuIG51bSA9PT0gMSA/IChcclxuICAgIDxkaXY+XHJcbiAgICAgIDw+XHJcbiAgICAgICAgPHA+ZnJhZyAtIEk8L3A+XHJcbiAgICAgICAgPGI+IGZyYWcgLSBJSTwvYj5cclxuICAgICAgPC8+XHJcbiAgICA8L2Rpdj5cclxuICApIDogKFxyXG4gICAgPGgxIGNsYXNzPVwiYVwiPlxyXG4gICAgICB7XCJuZXctSGVhZGxpbmVcIn0ge251bX1cclxuICAgIDwvaDE+XHJcbiAgKTtcclxufVxyXG5cclxuZnVuY3Rpb24gbWFya3VwNShudW06IGFueSkge1xyXG4gIHJldHVybiBudW0gPT09IDEgPyAoXHJcbiAgICA8ZGl2PlxyXG4gICAgICB7cmF3SHRtbChgPGRpdiBjbGFzcz1cImtcIj50eHQ8L2Rpdj48aW5wdXQgdHlwZT1yYWRpb1wiIC8+YCl9XHJcbiAgICAgIDxDb21wMyAvPlxyXG4gICAgICB7ZWx9XHJcbiAgICA8L2Rpdj5cclxuICApIDogKFxyXG4gICAgPGRpdj5cclxuICAgICAge3Jhd0h0bWwoYDxkaXYgY2xhc3M9XCJrXCI+dHh0PC9kaXY+PGlucHV0IHR5cGU9cmFkaW9cIiAvPmApfVxyXG4gICAgICB7bnVsbH1cclxuICAgICAge2VsfVxyXG4gICAgPC9kaXY+XHJcbiAgKTtcclxufVxyXG5cclxuZnVuY3Rpb24gbWFya3VwNihhKSB7XHJcblxyXG4gIHJldHVybiAgKFxyXG4gICAgPGRpdj5cclxuXHJcbiAgICAgIDxzdmcgaWQ9XCJmb282XCIgdmlld0JveD1cIjAgMCAxMCAxMFwiIHg9XCIyMDBcIiB3aWR0aD1cIjEwMFwiPlxyXG4gICAgICAgICAgICB7YSAmJiA8Y2lyY2xlIGN4PVwiNVwiIGN5PVwiNVwiIHI9XCI2XCIgLz59XHJcbiAgICAgICAgICA8L3N2Zz5cclxuICAgICAgPGJ1dHRvbj5zdWJtaXQ8L2J1dHRvbj5cclxuICAgIDwvZGl2PlxyXG4gICkgIDtcclxufVxyXG5cclxuLy9jb25zb2xlLmxvZyhtYXJrdXApO1xyXG4vL3dpbmRvdy5tYXJrdXAgPSBtYXJrdXA7XHJcblxyXG5jbGFzcyBQb3BVcEluZm8gZXh0ZW5kcyBIVE1MRWxlbWVudCB7XHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAvLyBBbHdheXMgY2FsbCBzdXBlciBmaXJzdCBpbiBjb25zdHJ1Y3RvclxyXG4gICAgc3VwZXIoKTtcclxuXHJcbiAgICAvLyB3cml0ZSBlbGVtZW50IGZ1bmN0aW9uYWxpdHkgaW4gaGVyZVxyXG5cclxuICAgIGNvbnNvbGUubG9nKFwiIyMjIyMjIyMjIyMjIyMjIyNjdG9yIENFXCIpO1xyXG4gIH1cclxuXHJcbiAgY29ubmVjdGVkQ2FsbGJhY2soKSB7XHJcbiAgICBjb25zb2xlLmxvZyhcIiMjIyMjIyMjIyMjIyMjIyMjQ3VzdG9tIHNxdWFyZSBlbGVtZW50IGFkZGVkIHRvIHBhZ2UuXCIpO1xyXG4gIH1cclxufVxyXG5cclxuY3VzdG9tRWxlbWVudHMuZGVmaW5lKFwicG9wdXAtaW5mb1wiLCBQb3BVcEluZm8pO1xyXG5cclxuLy9kb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI29sZFwiKSEuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGNvbnNvbGUubG9nKTtcclxuXHJcbi8vZG9jdW1lbnQuYm9keS5pbm5lckhUTUwgPSBtYXJrdXA7XHJcbi8vLy9yZW5kZXIobWFya3VwMygxKSwgZG9jdW1lbnQuYm9keSk7XHJcbi8vZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJvdXRlclwiKT8uc2V0QXR0cmlidXRlKFwiZGF0YS1mb29cIiwgXCJtb2RcIik7XHJcblxyXG4vL2RvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaW5uZXJcIik/LnNldEF0dHJpYnV0ZShcImRhdGEtZm9vXCIsIFwibW9kXCIpO1xyXG4vL3JlbmRlcihtYXJrdXAoMiksIGRvY3VtZW50LmJvZHkpO1xyXG4vL3JlbmRlcihtYXJrdXAsIGRvY3VtZW50LmJvZHksIHRydWUpO1xyXG5jb25zdCBlbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjb2xkXCIpO1xyXG5mdW5jdGlvbiBDb21wMigpIHtcclxuICByZXR1cm4gKFxyXG4gICAgPD5cclxuICAgICAge3Jhd0h0bWwoYDxkaXYgY2xhc3M9XCJrXCI+dHh0PC9kaXY+PGlucHV0IHR5cGU9cmFkaW9cIiAvPmApfVxyXG4gICAgICA8Q29tcDMgLz5cclxuICAgICAge2VsfVxyXG4gICAgPC8+XHJcbiAgKTtcclxufVxyXG5mdW5jdGlvbiBDb21wMygpIHtcclxuICByZXR1cm4gPGRpdj5jb21wIGNvbnRlbnQ8L2Rpdj47XHJcbn1cclxuXHJcbmNvbnN0ICRjb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNvbnRhaW5lclwiKVxyXG5cclxud2luZG93LnJlUmVuZGVyMSA9ICgpID0+XHJcbiAgcmVuZGVyKG1hcmt1cDMoMSksJGNvbnRhaW5lcik7XHJcbndpbmRvdy5yZVJlbmRlcjIgPSAoKSA9PlxyXG4gIHJlbmRlcihtYXJrdXAzKDIpLCRjb250YWluZXIpO1xyXG53aW5kb3cucmVSZW5kZXIzID0gKCkgPT5cclxuICByZW5kZXIoXHJcbiAgICAvLyA8ZGl2PnR4dDwvZGl2PlxyXG4gICAgPENvbXAyIC8+LFxyXG4gICAkY29udGFpbmVyXHJcbiAgKTtcclxuXHJcbmNvbnNvbGUubG9nKFwiMTIzNDVcIik7XHJcbndpbmRvdy5zcyA9ICgpID0+IG1hcmt1cDMoMSkgKyBcIlwiO1xyXG53aW5kb3cuc3MyID0gKCkgPT4ge1xyXG4gIGNvbnNvbGUubG9nKG1hcmt1cDMoMSkpO1xyXG5cclxuICAvL2RvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY29udGFpbmVyXCIpLmlubmVySFRNTCA9IG1hcmt1cDMoMSk7XHJcbn07XHJcblxyXG53aW5kb3cucmVSZW5kZXI1YSA9ICgpID0+XHJcbiAgcmVuZGVyKG1hcmt1cDUoMSksJGNvbnRhaW5lcik7XHJcbndpbmRvdy5yZVJlbmRlcjViID0gKCkgPT5cclxuICByZW5kZXIobWFya3VwNSgyKSwkY29udGFpbmVyKTtcclxuXHJcblxyXG53aW5kb3cuciA9IChhKSA9PlxyXG4gIHJlbmRlcigoXHJcbiAgPGgyIGNsYXNzPVwiYVwiIHJlZj17Y29uc29sZS53YXJufT5cclxuICAgIDw+XHJcbiAgICAgIDxoMSBvbi1jbGljaz17YSA/IGNvbnNvbGUubG9nIDogY29uc29sZS53YXJufT5cclxuICAgICAgICBoZWFkaW5nXHJcbiAgICAgIDwvaDE+XHJcbiAgICAgIDxzdmcgdmlld0JveD1cIjAgMCAxMCAxMFwiIHg9XCIyMDBcIiB3aWR0aD1cIjEwMFwiPlxyXG4gICAgICAgIDxjaXJjbGUgY3g9XCI1XCIgY3k9XCI1XCIgcj1cIjZcIiAvPlxyXG4gICAgICA8L3N2Zz5cclxuICAgIDwvPlxyXG4gIDwvaDI+XHJcbiAgKSwkY29udGFpbmVyKTtcclxuXHJcblxyXG4gIHdpbmRvdy5yZVJlbmRlclJlZiA9ICgpID0+IHJlbmRlcigoPGgyIGNsYXNzPVwiYVwiICByZWY9e2NvbnNvbGUud2Fybn0+SGVhZGluZyB3aXRoIHJlZjwvaDI+KSwkY29udGFpbmVyKTtcclxuICB3aW5kb3cucmVSZW5kZXI2YSA9ICgpID0+IHJlbmRlcihtYXJrdXA2KCksJGNvbnRhaW5lcik7XHJcbiAgd2luZG93LnJlUmVuZGVyNmIgPSAoKSA9PiByZW5kZXIoKDxjaXJjbGUgY3g9XCI1XCIgY3k9XCI1XCIgcj1cIjZcIiAvPiksIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZm9vNlwiKSk7XHJcbiAgd2luZG93LnJlUmVuZGVyU3ZnID0gKCkgPT4gcmVuZGVyKG1hcmt1cDEoKSwkY29udGFpbmVyKTtcclxuICB3aW5kb3cucmVSZW5kZXJTdmcyID0gKCkgPT4gcmVuZGVyKG1hcmt1cDEoKSwkY29udGFpbmVyKTtcclxuXHJcblxyXG4iXSwic291cmNlUm9vdCI6IiJ9