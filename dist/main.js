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
const renderedVTrees = new WeakMap();
const refsToCall = []; // props which will be rendered as attributes
// Functions will be used for event listeners. (with attribute name starting with 'on-')
// Object will be set as property on the rendered node element

// null when checking the parent when root is fragment itself
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
 * generates HTML Node elements from the provided jsx tree
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
} // base class which will be inherited from jsx and fragments function node generation
// and will be used to distinguish them with other Elements


class VNode {} // Interface which will be implemented by all types of nodes in the V-DOM Tree


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

}

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
        vTree = new RootVNode(markup, domNode); // diff

        oldVTree.diffAndPatch(vTree);
      }

      renderedVTrees.set(domNode, vTree);
    } else {
      vTree = new RootVNode(markup, domNode);
      domNode.append(vTree.asNode());
    }

    renderedVTrees.set(domNode, vTree); // call all ref callbacks found during creation of new node during render

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

  return new (_temp = class RawHtml extends VNode {
    /**
     *
     */
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vanN4L2pzeC1ydW50aW1lLnRzIiwid2VicGFjazovLy8uL21haW4udHN4Il0sIm5hbWVzIjpbInJlbmRlcmVkVlRyZWVzIiwiV2Vha01hcCIsInJlZnNUb0NhbGwiLCJnZXRQYXJlbnRFbGVtZW50Tm9kZSIsInZOb2RlIiwicGFyZW50Iiwibm9kZSIsImdldENoaWxkcmVuV2l0aE5vZGVzIiwiYWx3YXlzQWxsb3ciLCJjaGlsZHJlbiIsIm1hcCIsImNoaWxkTm9kZSIsImZsYXQiLCJJbmZpbml0eSIsImdldFBhcmVudEFuZE5leHRTaWJsaW5nIiwicGFyZW50V2l0aEVsZW1lbnQiLCJzaWJsaW5ncyIsInByZXZTaWJsaW5nIiwiaW5kZXhPZiIsIm5leHRTaWJsaW5nTm9kZSIsIm5leHRTaWJsaW5nIiwidHJ1dGh5IiwidmFsdWUiLCJ1bmRlZmluZWQiLCJzYW5pdGl6ZSIsInRleHQiLCJkaXYiLCJkb2N1bWVudCIsImNyZWF0ZUVsZW1lbnQiLCJpbm5lclRleHQiLCJpbm5lckhUTUwiLCJnZXRPdXRlckh0bWwiLCJlbGVtZW50IiwiRWxlbWVudCIsIm91dGVySFRNTCIsIlRleHQiLCJ3aG9sZVRleHQiLCJEb2N1bWVudEZyYWdtZW50IiwiQXJyYXkiLCJmcm9tIiwiY2hpbGROb2RlcyIsImVsIiwiam9pbiIsImNvbnNvbGUiLCJ3YXJuIiwiYXNIdG1sU3RyaW5nIiwidGFnIiwicHJvcHMiLCJhdHRyaWJ1dGVzIiwiT2JqZWN0IiwiZW50cmllcyIsImZpbHRlciIsImtleSIsInYiLCJrIiwiaXNBcnJheSIsImNvbnRlbnQiLCJjaGlsZCIsInRvU3RyaW5nIiwiYXNOb2RlIiwic3ZnQ29udGV4dCIsImZyYWdtZW50cyIsIml0ZW0iLCJkb2N1bWVudEZyYWdtZW50IiwiY3JlYXRlRG9jdW1lbnRGcmFnbWVudCIsImFwcGVuZCIsInJlZiIsImF0dHJzIiwiY3JlYXRlRWxlbWVudE5TIiwicHVzaCIsIkVsZW1lbnRWTm9kZSIsImFkZFByb3BzIiwiaW5zZXJ0TmV3SXRlbSIsIm5ld05vZGUiLCJpbnNlcnRCZWZvcmUiLCJkaWZmQW5kUGF0Y2hDaGlsZHJlbiIsIm9sZE5vZGUiLCJmb3JFYWNoIiwib2xkQ2hpbGQiLCJpeCIsIm5ld0NoaWxkIiwicmVtb3ZlRnJvbURPTSIsInR5cGUiLCJkaWZmQW5kUGF0Y2giLCJuZXdJdGVtcyIsInNsaWNlIiwibGVuZ3RoIiwiVk5vZGUiLCJjb25zdHJ1Y3RvciIsIkZyYWdtZW50Vk5vZGUiLCJOb2RlIiwiTGl2ZU5vZGVWTm9kZSIsIk51bGxWTm9kZSIsIlRleHRWTm9kZSIsInNldCIsInBhcmVudEVsZW1lbnQiLCJyZW1vdmVDaGlsZCIsInJlcGxhY2VXaXRoIiwiZnJvbUV4aXN0aW5nRWxlbWVudE5vZGUiLCJuZXdWTm9kZSIsImFzc2lnbiIsIm5ld1Byb3BzIiwib2xkUHJvcHMiLCJTZXQiLCJrZXlzIiwicHJvcE5hbWUiLCJvbGRWYWx1ZSIsIm5ld1ZhbHVlIiwic3RhcnRzV2l0aCIsImV2ZW50IiwicmVwbGFjZSIsImFkZEV2ZW50TGlzdGVuZXIiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwic2V0QXR0cmlidXRlIiwicmVtb3ZlQXR0cmlidXRlIiwiU3RyaW5nIiwidGV4dE5vZGUiLCJjcmVhdGVUZXh0Tm9kZSIsIm5vZGVWYWx1ZSIsIm5ld05vZGUyIiwiUm9vdFZOb2RlIiwiZG9tTm9kZSIsInJlbW92ZSIsImFzVk5vZGUiLCJyZXN1bHQiLCJhdHRyIiwianN4cyIsIkZyYWdtZW50IiwianN4IiwiaGFzT3duUHJvcGVydHkiLCJyZW5kZXIiLCJtYXJrdXAiLCJib2R5IiwicXVlcnlTZWxlY3RvckFsbCIsInN0eWxlIiwiYmFja2dyb3VuZCIsImlzUmVSZW5kZXIiLCJoYXMiLCJ2VHJlZSIsIm9sZFZUcmVlIiwiZ2V0Iiwic3BsaWNlIiwiRXJyb3IiLCJyYXdIdG1sIiwiUmF3SHRtbCIsInRlbXBsYXRlIiwieHNzIiwiUlRFIiwibG9nIiwidHh0IiwiQnV0dG9uIiwiZGlzYWJsZWQiLCJyZWZsb2ciLCJTcGFuIiwibW9kZSIsIkNvbXAiLCJudW0iLCJtYXJrdXAxIiwibWFya3VwMiIsIk5MIiwibWFya3VwMyIsImluZm8iLCJvYmoiLCJhIiwibWFya3VwNCIsIm1hcmt1cDUiLCJtYXJrdXA2IiwiUG9wVXBJbmZvIiwiSFRNTEVsZW1lbnQiLCJjdXN0b21FbGVtZW50cyIsImRlZmluZSIsInF1ZXJ5U2VsZWN0b3IiLCJDb21wMiIsIkNvbXAzIiwiJGNvbnRhaW5lciIsImdldEVsZW1lbnRCeUlkIiwid2luZG93IiwicmVSZW5kZXIxIiwicmVSZW5kZXIyIiwicmVSZW5kZXIzIiwic3MiLCJzczIiLCJyZVJlbmRlcjVhIiwicmVSZW5kZXI1YiIsIm1hcmt1cDciLCJtb2QiLCJyZVJlbmRlclJlZiIsInJlUmVuZGVyNmEiLCJyZVJlbmRlcjZiIiwicmVSZW5kZXJTdmciLCJyZVJlbmRlclN2ZzIiLCJyZVJlbmRlcjdfMSIsInJlUmVuZGVyN18yIiwicmVSZW5kZXI3XzMiXSwibWFwcGluZ3MiOiI7UUFBQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7UUFDMUU7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSx3REFBd0Qsa0JBQWtCO1FBQzFFO1FBQ0EsaURBQWlELGNBQWM7UUFDL0Q7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLHlDQUF5QyxpQ0FBaUM7UUFDMUUsZ0hBQWdILG1CQUFtQixFQUFFO1FBQ3JJO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMkJBQTJCLDBCQUEwQixFQUFFO1FBQ3ZELGlDQUFpQyxlQUFlO1FBQ2hEO1FB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QUEsQ0FBckIsQyIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDApO1xuIiwiLyoqXHJcbiAqIHByb3ZpZGVzIGZ1bmN0aW9ucyBuZWVkZWQgYnkgYmFiZWwgZm9yIGEgY3VzdG9tIHByYWdtYVxyXG4gKiB0byByZW5kZXIgcGFyc2VkIGpzeCBjb2RlIHRvIGh0bWxcclxuICovXHJcblxyXG5jb25zdCByZW5kZXJlZFZUcmVlcyA9IG5ldyBXZWFrTWFwPEVsZW1lbnQsIFJvb3RWTm9kZSB8IEVsZW1lbnRWTm9kZT4oKTtcclxuY29uc3QgcmVmc1RvQ2FsbDogQXJyYXk8KCkgPT4gdm9pZD4gPSBbXTtcclxuXHJcbi8vIHByb3BzIHdoaWNoIHdpbGwgYmUgcmVuZGVyZWQgYXMgYXR0cmlidXRlc1xyXG4vLyBGdW5jdGlvbnMgd2lsbCBiZSB1c2VkIGZvciBldmVudCBsaXN0ZW5lcnMuICh3aXRoIGF0dHJpYnV0ZSBuYW1lIHN0YXJ0aW5nIHdpdGggJ29uLScpXHJcbi8vIE9iamVjdCB3aWxsIGJlIHNldCBhcyBwcm9wZXJ0eSBvbiB0aGUgcmVuZGVyZWQgbm9kZSBlbGVtZW50XHJcbnR5cGUgQXR0cmlidXRlcyA9IHtcclxuICBba2V5OiBzdHJpbmddOiBzdHJpbmcgfCBib29sZWFuIHwgbnVtYmVyIHwgRnVuY3Rpb24gfCBPYmplY3Q7XHJcbn07XHJcblxyXG4vLyBhZGRpdGlvbmFsIGF0dHJpYnV0ZXMgd2hpY2ggY2FuIGhhdmUgYWRkaXRpb25hbCBzZXJpYWxpemF0aW9uIGJlZm9yZSByZW5kZXJpbmcgYXMgYXR0cmlidXRlc1xyXG50eXBlIFNwZWNpYWxBdHRyaWJ1dGVzID0ge1xyXG4gIGNsYXNzPzogc3RyaW5nIHwgc3RyaW5nW107XHJcbiAgc3R5bGU/OiBzdHJpbmcgfCB7IFtrZXk6IHN0cmluZ106IHN0cmluZyB9O1xyXG4gIHJlZj86IEZ1bmN0aW9uO1xyXG59O1xyXG5cclxuLy8gdHlwZXMgb2YgY2hpbGQgIHdoaWNoIHdpbGwgYmUgcGFzc2VkIGJ5IHRoZSBqc3ggcGFyc2VyIHBsdWdpblxyXG4vLyBuZXN0ZWQgYXJyYXkgaW4gY2FzZSBvZlxyXG4vLyA8ZWxlbT5cclxuLy8gICA8c3Bhbi8+XHJcbi8vICAge2NoaWxkcmVufVxyXG4vLyAgIHRleHRcclxuLy8gICA8ZGl2Lz5cclxuLy8gPC9lbGVtPlxyXG50eXBlIEpTWENoaWxkID1cclxuICB8IFZOb2RlSW50ZXJmYWNlXHJcbiAgfCBOb2RlXHJcbiAgfCBzdHJpbmdcclxuICB8IG51bWJlclxyXG4gIHwgYm9vbGVhblxyXG4gIHwgbnVsbFxyXG4gIHwgdW5kZWZpbmVkXHJcbiAgfCBKU1hDaGlsZFtdO1xyXG5cclxuLy8gY2hpbGQgZWxlbWVudHMgaW4gdGhlIGpzeCBtYXJrdXAgd2hpY2ggd2lsbCBiZSBwYXNzZWQgdG8gdGhlIGggZnVuY3Rpb24gYXMgYHByb3BzLmNoaWxkcmVuYFxyXG50eXBlIENoaWxkcmVuUHJvcHMgPSB7XHJcbiAgY2hpbGRyZW46IEpTWENoaWxkW107XHJcbn07XHJcblxyXG4vKipcclxuICogcHJvcHMgb2JqZWN0IHdoaWNoIHdpbGwgYmUgcGFzc2VkIHRvIGpzeCBwcmFnbWEgYW5kIGN1c3RvbSBjb21wb25lbnQgZnVuY3Rpb25zXHJcbiAqL1xyXG50eXBlIEpzeFByb3BzID0gQXR0cmlidXRlcyAmIFNwZWNpYWxBdHRyaWJ1dGVzICYgQ2hpbGRyZW5Qcm9wcztcclxuXHJcbi8vIG51bGwgd2hlbiBjaGVja2luZyB0aGUgcGFyZW50IHdoZW4gcm9vdCBpcyBmcmFnbWVudCBpdHNlbGZcclxuZnVuY3Rpb24gZ2V0UGFyZW50RWxlbWVudE5vZGUodk5vZGU6IFZOb2RlSW50ZXJmYWNlKTogRWxlbWVudFZOb2RlIHtcclxuICB3aGlsZSAodk5vZGUucGFyZW50KSB7XHJcbiAgICB2Tm9kZSA9IHZOb2RlLnBhcmVudDtcclxuICAgIC8vIGAubm9kZWAgaXMgb25seSBvbiBcIlRleHRcIiBhbmQgXCJFbGVtZW50XCIsIFwiUmF3SHRtbFwiIHR5cGUgVk5vZGUsIGFuZCBvbmx5IEVsZW1lbnQgaGFzIGNoaWxkcmVuXHJcbiAgICBpZiAodk5vZGUubm9kZSkgYnJlYWs7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gKHZOb2RlIGFzIHVua25vd24pIGFzIEVsZW1lbnRWTm9kZTtcclxufVxyXG5cclxuZnVuY3Rpb24gZ2V0Q2hpbGRyZW5XaXRoTm9kZXMoXHJcbiAgdk5vZGU6IFZOb2RlSW50ZXJmYWNlLFxyXG4gIGFsd2F5c0FsbG93PzogVk5vZGVJbnRlcmZhY2VcclxuKTogVk5vZGVJbnRlcmZhY2VbXSB7XHJcbiAgdk5vZGUuY2hpbGRyZW47XHJcbiAgcmV0dXJuIHZOb2RlLmNoaWxkcmVuXHJcbiAgICAubWFwKChjaGlsZE5vZGUpID0+IHtcclxuICAgICAgaWYgKGNoaWxkTm9kZSA9PT0gYWx3YXlzQWxsb3cpIHJldHVybiBjaGlsZE5vZGU7XHJcbiAgICAgIGlmIChjaGlsZE5vZGUubm9kZSkgcmV0dXJuIGNoaWxkTm9kZTtcclxuICAgICAgcmV0dXJuIGdldENoaWxkcmVuV2l0aE5vZGVzKGNoaWxkTm9kZSwgYWx3YXlzQWxsb3cpO1xyXG4gICAgfSlcclxuICAgIC5mbGF0KEluZmluaXR5KSBhcyBWTm9kZUludGVyZmFjZVtdO1xyXG59XHJcblxyXG5mdW5jdGlvbiBnZXRQYXJlbnRBbmROZXh0U2libGluZyh2Tm9kZTogVk5vZGVJbnRlcmZhY2UpOiBbTm9kZSwgTm9kZSB8IG51bGxdIHtcclxuICAvLyBub2RlIGFuY2VzdG9yIHdpdGggRWxlbWVudCxcclxuICBjb25zdCBwYXJlbnRXaXRoRWxlbWVudCA9IGdldFBhcmVudEVsZW1lbnROb2RlKHZOb2RlKTtcclxuICBjb25zdCBzaWJsaW5ncyA9IGdldENoaWxkcmVuV2l0aE5vZGVzKHBhcmVudFdpdGhFbGVtZW50LCB2Tm9kZSk7XHJcbiAgY29uc3QgcHJldlNpYmxpbmcgPSBzaWJsaW5nc1tzaWJsaW5ncy5pbmRleE9mKHZOb2RlKSAtIDFdO1xyXG4gIGNvbnN0IG5leHRTaWJsaW5nTm9kZSA9IHByZXZTaWJsaW5nID8gcHJldlNpYmxpbmcubm9kZSEubmV4dFNpYmxpbmcgOiBudWxsO1xyXG5cclxuICByZXR1cm4gW3BhcmVudFdpdGhFbGVtZW50Lm5vZGUsIG5leHRTaWJsaW5nTm9kZV07XHJcbn1cclxuXHJcbi8qKlxyXG4gKiByZXR1cm5zIHRydWUgaWYgbm90IG51bGxpc2ggb3IgZmFsc2VcclxuICogdGhhdCBtZWFucyAwIG9yIGVtcHR5IHN0cmluZyBhcmUgYWxsb3dlZFxyXG4gKiBAcGFyYW0geyp9IHZhbFxyXG4gKi9cclxuZnVuY3Rpb24gdHJ1dGh5KHZhbHVlOiBhbnkpOiBib29sZWFuIHtcclxuICByZXR1cm4gdmFsdWUgIT09IGZhbHNlICYmIHZhbHVlICE9PSBudWxsICYmIHZhbHVlICE9PSB1bmRlZmluZWQ7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBlc2NhcGVzIHRoZSBwcm92aWRlZCBzdHJpbmcgYWdhaW5zdCB4c3MgYXR0YWNrcyBldGNcclxuICpcclxuICogQHBhcmFtIHtzdHJpbmd9IHRleHRcclxuICogQHJldHVybnMge3N0cmluZ31cclxuICovXHJcbmZ1bmN0aW9uIHNhbml0aXplKHRleHQ6IHN0cmluZyk6IHN0cmluZyB7XHJcbiAgY29uc3QgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICBkaXYuaW5uZXJUZXh0ID0gdGV4dDtcclxuICByZXR1cm4gZGl2LmlubmVySFRNTDtcclxufVxyXG5cclxuLyoqXHJcbiAqIGJhc2ljYWxseSBgRWxlbWVudC5vdXRlckhUTUxgIGJ1dCBhbHNvIHN1cHBvcnRzIFRleHQgbm9kZSBhbmQgRG9jdW1lbnRGcmFnbWVudFxyXG4gKiBAcGFyYW0gZWxlbWVudCB7Tm9kZX0gLSBlbGVtZW50IHdoaWNoIGl0cyBodG1sIG5lZWRzIHRvIGJlIHJldHVybmVkXHJcbiAqL1xyXG5mdW5jdGlvbiBnZXRPdXRlckh0bWwoZWxlbWVudDogTm9kZSk6IHN0cmluZyB7XHJcbiAgaWYgKGVsZW1lbnQgaW5zdGFuY2VvZiBFbGVtZW50KSByZXR1cm4gZWxlbWVudC5vdXRlckhUTUw7XHJcbiAgaWYgKGVsZW1lbnQgaW5zdGFuY2VvZiBUZXh0KSByZXR1cm4gc2FuaXRpemUoZWxlbWVudC53aG9sZVRleHQpO1xyXG4gIGlmIChlbGVtZW50IGluc3RhbmNlb2YgRG9jdW1lbnRGcmFnbWVudClcclxuICAgIHJldHVybiBBcnJheS5mcm9tKGVsZW1lbnQuY2hpbGROb2RlcylcclxuICAgICAgLm1hcCgoZWwpID0+IGdldE91dGVySHRtbChlbCkpXHJcbiAgICAgIC5qb2luKFwiXCIpO1xyXG5cclxuICAvLyBzaG91bGRuJ3QgcmVhY2ggdGhpcyBwb2ludFxyXG4gIGNvbnNvbGUud2FybihcImdldE91dGVySHRtbCBkb2VzIG5vdCBzdXBwb3J0IHRoaXMgdHlwZSBvZiBlbGVtZW50XCIsIGVsZW1lbnQpO1xyXG4gIHJldHVybiBcIlwiO1xyXG59XHJcblxyXG4vKipcclxuICogZ2VuZXJhdGVzIHRoZSBodG1sIGFzIGEgc3RyaW5nIHdoaWNoIGNhbiBiZSB1c2VkIGZvciBleGFtcGxlIHdpdGggYGVsZW1lbnQuaW5uZXJIVE1MKClgXHJcbiAqXHJcbiAqIEBwYXJhbSB0YWcge3N0cmluZ3xGdW5jdGlvbn0gLSB0YWcgYXJndW1lbnQgb2YgdGhlIGpzeCBjYWxsXHJcbiAqIEBwYXJhbSBwcm9wcyB7T2JqZWN0fSAtIHByb3BzIGFyZ3VtZW50IG9mIGpzeCBjYWxsXHJcbiAqL1xyXG5mdW5jdGlvbiBhc0h0bWxTdHJpbmcoXHJcbiAgdGFnOiBzdHJpbmcgfCBGdW5jdGlvbixcclxuICBwcm9wczogQXR0cmlidXRlcyAmIFNwZWNpYWxBdHRyaWJ1dGVzLFxyXG4gIGNoaWxkcmVuOiBWTm9kZUludGVyZmFjZVtdXHJcbikge1xyXG4gIGNvbnN0IGF0dHJpYnV0ZXMgPSBPYmplY3QuZW50cmllcyhwcm9wcylcclxuICAgIC5maWx0ZXIoKFssIHZhbHVlXSkgPT4gdHJ1dGh5KHZhbHVlKSlcclxuICAgIC5tYXAoKFtrZXksIHZhbHVlXSkgPT4ge1xyXG4gICAgICAvLyBlLmcuIGRpc2FibGVkOiB0cnVlID0+IDx0YWcgZGlzYWJsZWQ+XHJcbiAgICAgIGlmICh2YWx1ZSA9PT0gdHJ1ZSkgcmV0dXJuIGtleTtcclxuXHJcbiAgICAgIC8vIGZvciBzdHlsZSBhcyBvYmplY3Q6XHJcbiAgICAgIC8vIChzdHlsZTopIHtkaXNwbGF5OiBcIm5vbmVcIiwgcG9zaXRpb246IFwiYWJzb2x1dGVcIn0gPT0+ICdkaXNwbGF5OiBub25lOyBwb3NpdGlvbjogYWJzb2x1dGU7J1xyXG4gICAgICBpZiAoa2V5ID09PSBcInN0eWxlXCIgJiYgdHlwZW9mIHZhbHVlID09PSBcIm9iamVjdFwiKVxyXG4gICAgICAgIHZhbHVlID0gT2JqZWN0LmVudHJpZXModmFsdWUpXHJcbiAgICAgICAgICAvLyBpZ25vcmUgc3R1ZmYgbGlrZSBge2JhY2tncm91bmQ6IGFjdGl2ZSAmJiBcInJlZFwifWAgd2hlbiBgYWN0aXZlID09PSBmYWxzZSAvIG51bGwgLyB1bmRlZmluZWRgXHJcbiAgICAgICAgICAuZmlsdGVyKChbLCB2XSkgPT4gdHJ1dGh5KHYpKVxyXG4gICAgICAgICAgLy8gY3VycmVudGx5IHN1cHBvcnRzIFwiYmFja2dyb3VuZC1jb2xvclwiIG5vdCBcImJhY2tncm91bmRDb2xvclwiXHJcbiAgICAgICAgICAubWFwKChbaywgdl0pID0+IGAke2t9OiAke3Z9YClcclxuICAgICAgICAgIC5qb2luKFwiOyBcIik7XHJcblxyXG4gICAgICAvLyAoY2xhc3M6KSBbXCJidG5cIiwgXCJyZWRcIl0gPT0+IFwiYnRuIHJlZFwiXHJcbiAgICAgIGlmIChrZXkgPT09IFwiY2xhc3NcIiAmJiBBcnJheS5pc0FycmF5KHZhbHVlKSkgdmFsdWUgPSB2YWx1ZS5qb2luKFwiIFwiKTtcclxuXHJcbiAgICAgIHJldHVybiBgJHtrZXl9PVwiJHt2YWx1ZX1cImA7XHJcbiAgICB9KVxyXG4gICAgLmpvaW4oXCIgXCIpO1xyXG5cclxuICBjb25zdCBjb250ZW50ID0gY2hpbGRyZW4ubWFwKChjaGlsZCkgPT4gY2hpbGQudG9TdHJpbmcoKSkuam9pbihcIlwiKTtcclxuXHJcbiAgcmV0dXJuIGA8JHt0YWd9ICR7YXR0cmlidXRlc30+JHtjb250ZW50fTwvJHt0YWd9PmA7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBnZW5lcmF0ZXMgSFRNTCBOb2RlIGVsZW1lbnRzIGZyb20gdGhlIHByb3ZpZGVkIGpzeCB0cmVlXHJcbiAqIEBwYXJhbSB0YWcge3N0cmluZ3xGdW5jdGlvbn0gLSB0YWcgYXJndW1lbnQgb2YgdGhlIGpzeCBjYWxsXHJcbiAqIEBwYXJhbSBwcm9wcyB7T2JqZWN0fSAtIHByb3BzIGFyZ3VtZW50IG9mIGpzeCBjYWxsXHJcbiAqL1xyXG5mdW5jdGlvbiBhc05vZGU8VCBleHRlbmRzIE5vZGU+KFxyXG4gIHRhZzogc3RyaW5nIHwgdW5kZWZpbmVkLFxyXG4gIHByb3BzOiBBdHRyaWJ1dGVzICYgU3BlY2lhbEF0dHJpYnV0ZXMsXHJcbiAgY2hpbGRyZW46IFZOb2RlSW50ZXJmYWNlW10sXHJcbiAgc3ZnQ29udGV4dCA9IGZhbHNlXHJcbik6IEVsZW1lbnQgfCBEb2N1bWVudEZyYWdtZW50IHtcclxuICAvLyBmcmFnbWVudFxyXG4gIGlmICghdGFnKSB7XHJcbiAgICBjb25zdCBmcmFnbWVudHMgPSBjaGlsZHJlbi5tYXAoKGl0ZW0pID0+IGl0ZW0uYXNOb2RlKCkpO1xyXG5cclxuICAgIGNvbnN0IGRvY3VtZW50RnJhZ21lbnQgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XHJcblxyXG4gICAgZG9jdW1lbnRGcmFnbWVudC5hcHBlbmQoLi4uZnJhZ21lbnRzKTtcclxuICAgIHJldHVybiBkb2N1bWVudEZyYWdtZW50O1xyXG4gIH1cclxuXHJcbiAgY29uc3QgeyByZWYsIC4uLmF0dHJzIH0gPSBwcm9wcztcclxuXHJcbiAgLy8gcmVtZW1iZXIgaWYgdGhlIHN2ZyBjb250ZXh0IHdhcyBzZXQgZm9yIHRoaXMgbm9kZSwgYW5kIHJlcGxhY2UgYWZ0ZXIgZ2VuZXJhdGluZyBhbGwgY2hpbGRyZW5cclxuXHJcbiAgLy8gY3VycmVudGx5IG5vdCBzdXBwb3J0aW5nIHRoZSBgaXNgIG9wdGlvbiBmb3IgQ3VzdG9taXplZCBidWlsdC1pbiBlbGVtZW50c1xyXG4gIGNvbnN0IG5vZGUgPSBzdmdDb250ZXh0XHJcbiAgICA/IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyhcImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIsIHRhZylcclxuICAgIDogZG9jdW1lbnQuY3JlYXRlRWxlbWVudCh0YWcpO1xyXG5cclxuICAvLyBjdXJyZW50bHkgb25seSBzdXBwb3J0aW5nIHJlZiBvbiBodG1sIGVsZW1lbnRzLiBub3QgdGVtcGxhdGUgZnVuY3Rpb25zXHJcbiAgLy8gcmVmIGlzIG9ubHkgY2FsbGVkIHdoZW4gZWxlbWVudCBpcyBjcmVhdGVkLiBub3Qgd2hlbiB0aGUgcmVmIHByb3BlcnR5IGlzIGNoYW5nZWRcclxuICBpZiAodHlwZW9mIHJlZiA9PT0gXCJmdW5jdGlvblwiKSB7XHJcbiAgICByZWZzVG9DYWxsLnB1c2goKCkgPT4gcmVmKG5vZGUpKTtcclxuICB9XHJcblxyXG4gIC8vIGFkZCBhdHRyaWJ1dGVzLCBldmVudCBsaXN0ZW5lcnMgZXRjLlxyXG4gIEVsZW1lbnRWTm9kZS5hZGRQcm9wcyhub2RlLCBhdHRycyk7XHJcblxyXG4gIG5vZGUuYXBwZW5kKFxyXG4gICAgLi4uY2hpbGRyZW5cclxuICAgICAgLy8uZmxhdCgpXHJcbiAgICAgIC5tYXAoKGNoaWxkKSA9PiBjaGlsZC5hc05vZGUoKSlcclxuICApO1xyXG5cclxuICByZXR1cm4gbm9kZTtcclxufVxyXG5cclxuZnVuY3Rpb24gaW5zZXJ0TmV3SXRlbShuZXdOb2RlOiBWTm9kZUludGVyZmFjZSkge1xyXG4gIGNvbnN0IFtwYXJlbnQsIG5leHRTaWJsaW5nXSA9IGdldFBhcmVudEFuZE5leHRTaWJsaW5nKG5ld05vZGUpO1xyXG4gIHBhcmVudC5pbnNlcnRCZWZvcmUobmV3Tm9kZS5hc05vZGUoKSwgbmV4dFNpYmxpbmcpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBkaWZmQW5kUGF0Y2hDaGlsZHJlbihcclxuICBvbGROb2RlOiBWTm9kZUludGVyZmFjZSxcclxuICBuZXdOb2RlOiBWTm9kZUludGVyZmFjZVxyXG4pIHtcclxuICBvbGROb2RlLmNoaWxkcmVuLmZvckVhY2goKG9sZENoaWxkLCBpeCkgPT4ge1xyXG4gICAgY29uc3QgbmV3Q2hpbGQgPSBuZXdOb2RlLmNoaWxkcmVuW2l4XTtcclxuICAgIC8vIGNoaWxkIHdhcyByZW1vdmVkXHJcbiAgICBpZiAoIW5ld0NoaWxkKSBvbGRDaGlsZC5yZW1vdmVGcm9tRE9NKCk7XHJcbiAgICAvLyBjaGlsZCBpcyBtb2RpZmllZFxyXG4gICAgZWxzZSBpZiAobmV3Q2hpbGQudHlwZSA9PT0gb2xkQ2hpbGQudHlwZSkgb2xkQ2hpbGQuZGlmZkFuZFBhdGNoKG5ld0NoaWxkKTtcclxuICAgIC8vIGNoaWxkIGlzIHJlcGxhY2VkXHJcbiAgICBlbHNlIHtcclxuICAgICAgb2xkQ2hpbGQucmVtb3ZlRnJvbURPTSgpO1xyXG4gICAgICBpbnNlcnROZXdJdGVtKG5ld0NoaWxkKTtcclxuICAgIH1cclxuICB9KTtcclxuXHJcbiAgLy8gbmV3IGFkZGl0aW9uIGl0ZW1zXHJcbiAgY29uc3QgbmV3SXRlbXMgPSBuZXdOb2RlLmNoaWxkcmVuLnNsaWNlKG9sZE5vZGUuY2hpbGRyZW4ubGVuZ3RoKTtcclxuICBpZiAobmV3SXRlbXMubGVuZ3RoKSB7XHJcbiAgICBjb25zdCBkb2N1bWVudEZyYWdtZW50ID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO1xyXG4gICAgbmV3SXRlbXMuZm9yRWFjaCgoaXRlbSkgPT4gZG9jdW1lbnRGcmFnbWVudC5hcHBlbmQoaXRlbS5hc05vZGUoKSkpO1xyXG5cclxuICAgIGNvbnN0IFtwYXJlbnQsIG5leHRTaWJsaW5nXSA9IGdldFBhcmVudEFuZE5leHRTaWJsaW5nKG5ld0l0ZW1zWzBdKTtcclxuICAgIHBhcmVudC5pbnNlcnRCZWZvcmUoZG9jdW1lbnRGcmFnbWVudCwgbmV4dFNpYmxpbmcpO1xyXG4gIH1cclxufVxyXG5cclxuLy8gYmFzZSBjbGFzcyB3aGljaCB3aWxsIGJlIGluaGVyaXRlZCBmcm9tIGpzeCBhbmQgZnJhZ21lbnRzIGZ1bmN0aW9uIG5vZGUgZ2VuZXJhdGlvblxyXG4vLyBhbmQgd2lsbCBiZSB1c2VkIHRvIGRpc3Rpbmd1aXNoIHRoZW0gd2l0aCBvdGhlciBFbGVtZW50c1xyXG5jbGFzcyBWTm9kZSB7fVxyXG5cclxuLy8gSW50ZXJmYWNlIHdoaWNoIHdpbGwgYmUgaW1wbGVtZW50ZWQgYnkgYWxsIHR5cGVzIG9mIG5vZGVzIGluIHRoZSBWLURPTSBUcmVlXHJcbmludGVyZmFjZSBWTm9kZUludGVyZmFjZSB7XHJcbiAgdG9TdHJpbmcoKTogc3RyaW5nO1xyXG4gIGFzTm9kZSgpOiBOb2RlO1xyXG4gIHBhcmVudDogVk5vZGVJbnRlcmZhY2UgfCBudWxsO1xyXG4gIGNoaWxkcmVuOiBBcnJheTxWTm9kZUludGVyZmFjZSB8IG5ldmVyPjtcclxuICB0eXBlOiBzdHJpbmc7XHJcbiAgbm9kZT86IE5vZGU7XHJcbiAgcmVtb3ZlRnJvbURPTSgpOiB2b2lkO1xyXG4gIGRpZmZBbmRQYXRjaChuZXdOb2RlOiBWTm9kZUludGVyZmFjZSk6IHZvaWQ7XHJcbn1cclxuXHJcbmNsYXNzIEVsZW1lbnRWTm9kZSBleHRlbmRzIFZOb2RlIGltcGxlbWVudHMgVk5vZGVJbnRlcmZhY2Uge1xyXG4gIHR5cGUgPSBcIkVsZW1lbnRcIjtcclxuICB0YWc6IHN0cmluZztcclxuICBwcm9wczogQXR0cmlidXRlcyAmIFNwZWNpYWxBdHRyaWJ1dGVzO1xyXG4gIG5vZGU6IEVsZW1lbnQgPSBudWxsIGFzIGFueTtcclxuICBjaGlsZHJlbjogVk5vZGVJbnRlcmZhY2VbXTtcclxuICBwYXJlbnQ6IFZOb2RlSW50ZXJmYWNlID0gbnVsbCBhcyBhbnk7XHJcbiAgc3ZnQ29udGV4dDogYm9vbGVhbiA9IGZhbHNlOyAvLyB3aWxsIGJlIHNldCB0byB0cnVlIHdoZW4gZWxlbWVudCBpcyBhbiBTVkcgRWxlbWVudFxyXG5cclxuICBjb25zdHJ1Y3Rvcih7XHJcbiAgICB0YWcsXHJcbiAgICBwcm9wcyxcclxuICAgIGNoaWxkcmVuLFxyXG4gIH06IHtcclxuICAgIHRhZzogc3RyaW5nO1xyXG4gICAgcHJvcHM6IEF0dHJpYnV0ZXMgJiBTcGVjaWFsQXR0cmlidXRlcztcclxuICAgIGNoaWxkcmVuOiBKU1hDaGlsZFtdO1xyXG4gIH0pIHtcclxuICAgIHN1cGVyKCk7XHJcbiAgICB0aGlzLnRhZyA9IHRhZztcclxuICAgIHRoaXMucHJvcHMgPSBwcm9wcztcclxuXHJcbiAgICAvLyBjb252ZXJ0IGNoaWxkIGpzeCBjb250ZW50IHRvIFZOb2Rlc1xyXG4gICAgdGhpcy5jaGlsZHJlbiA9IGNoaWxkcmVuLm1hcCgoY2hpbGQpID0+IHtcclxuICAgICAgaWYgKEFycmF5LmlzQXJyYXkoY2hpbGQpKSByZXR1cm4gbmV3IEZyYWdtZW50Vk5vZGUoY2hpbGQpO1xyXG4gICAgICBpZiAoY2hpbGQgaW5zdGFuY2VvZiBWTm9kZSkgcmV0dXJuIGNoaWxkIGFzIFZOb2RlSW50ZXJmYWNlO1xyXG4gICAgICBpZiAoY2hpbGQgaW5zdGFuY2VvZiBOb2RlKSByZXR1cm4gbmV3IExpdmVOb2RlVk5vZGUoY2hpbGQpO1xyXG4gICAgICBpZiAoIXRydXRoeShjaGlsZCkpIHJldHVybiBuZXcgTnVsbFZOb2RlKCk7XHJcblxyXG4gICAgICByZXR1cm4gbmV3IFRleHRWTm9kZShjaGlsZCBhcyBzdHJpbmcgfCBudW1iZXIgfCB0cnVlKTtcclxuICAgIH0pO1xyXG4gICAgLy8gc2V0IHBhcmVudCBwcm9wZXJ0eSBvbiBhbGwgY2hpbGRyZW5cclxuICAgIHRoaXMuY2hpbGRyZW4uZm9yRWFjaCgoY2hpbGQpID0+IChjaGlsZC5wYXJlbnQgPSB0aGlzKSk7XHJcbiAgfVxyXG5cclxuICB0b1N0cmluZygpIHtcclxuICAgIHJldHVybiBhc0h0bWxTdHJpbmcodGhpcy50YWcsIHRoaXMucHJvcHMsIHRoaXMuY2hpbGRyZW4pO1xyXG4gIH1cclxuXHJcbiAgYXNOb2RlKCkge1xyXG4gICAgLy8gdHJhdmVyc2UgdGhlIFZUcmVlIHRvIGNoZWNrIGlmIHRoaXMgZWxlbWVudCBpcyByZW5kZXJlZCBpbnNpZGUgYW4gc3ZnIGVsZW1lbnRcclxuICAgIGxldCBzdmdDb250ZXh0ID0gZmFsc2U7XHJcbiAgICBsZXQgdk5vZGU6IFZOb2RlSW50ZXJmYWNlID0gdGhpcztcclxuICAgIHdoaWxlICh2Tm9kZS5wYXJlbnQpIHtcclxuICAgICAgaWYgKHZOb2RlLnRhZyA9PT0gXCJzdmdcIikge1xyXG4gICAgICAgIHN2Z0NvbnRleHQgPSB0cnVlO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICAgIHZOb2RlID0gdk5vZGUucGFyZW50O1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuc3ZnQ29udGV4dCA9IHN2Z0NvbnRleHQ7XHJcblxyXG4gICAgY29uc3Qgbm9kZSA9IGFzTm9kZShcclxuICAgICAgdGhpcy50YWcsXHJcbiAgICAgIHRoaXMucHJvcHMsXHJcbiAgICAgIHRoaXMuY2hpbGRyZW4sXHJcbiAgICAgIHRoaXMuc3ZnQ29udGV4dFxyXG4gICAgKSBhcyBFbGVtZW50O1xyXG4gICAgdGhpcy5ub2RlID0gbm9kZTtcclxuXHJcbiAgICAvLyBtZW1vcml6ZSBmb3IgbmV4dCBzdWJ0cmVlIHJlLXJlbmRlcnNcclxuICAgIHJlbmRlcmVkVlRyZWVzLnNldChub2RlLCB0aGlzKTtcclxuXHJcbiAgICByZXR1cm4gbm9kZTtcclxuICB9XHJcbiAgcmVtb3ZlRnJvbURPTSgpIHtcclxuICAgIHRoaXMubm9kZS5wYXJlbnRFbGVtZW50IS5yZW1vdmVDaGlsZCh0aGlzLm5vZGUpO1xyXG4gIH1cclxuICBkaWZmQW5kUGF0Y2gobmV3Tm9kZTogRWxlbWVudFZOb2RlKSB7XHJcbiAgICBpZiAobmV3Tm9kZS50YWcgPT09IHRoaXMudGFnKSB7XHJcbiAgICAgIG5ld05vZGUubm9kZSA9IHRoaXMubm9kZTtcclxuICAgICAgLy8gdXBkYXRlIHByb3BzIGFuZCBhdHRyaWJ1dGVzXHJcbiAgICAgIEVsZW1lbnRWTm9kZS5hZGRQcm9wcyhuZXdOb2RlLm5vZGUsIG5ld05vZGUucHJvcHMsIHRoaXMucHJvcHMpO1xyXG5cclxuICAgICAgLy8gY2hpbGRyZW4gPT4gaXRlciBhbmQgcGF0Y2hcclxuICAgICAgLy8gb2xkIGNoaWxkcmVuIGJlaW5nIG1vZGlmaWVkXHJcbiAgICAgIGRpZmZBbmRQYXRjaENoaWxkcmVuKHRoaXMsIG5ld05vZGUpO1xyXG4gICAgfVxyXG4gICAgLy8gdGFnIGhhcyBjaGFuZ2VkXHJcbiAgICBlbHNlIHtcclxuICAgICAgdGhpcy5ub2RlLnJlcGxhY2VXaXRoKG5ld05vZGUuYXNOb2RlKCkpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIG1lbW9yaXplIGZvciBuZXh0IHN1YnRyZWUgcmUtcmVuZGVyc1xyXG4gICAgcmVuZGVyZWRWVHJlZXMuc2V0KHRoaXMubm9kZSwgbmV3Tm9kZSk7XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgZnJvbUV4aXN0aW5nRWxlbWVudE5vZGUoXHJcbiAgICB2Tm9kZTogRWxlbWVudFZOb2RlLFxyXG4gICAgY2hpbGRyZW46IEFycmF5PFZOb2RlSW50ZXJmYWNlIHwgVk5vZGVJbnRlcmZhY2VbXT5cclxuICApIHtcclxuICAgIGNvbnN0IHsgdGFnLCBwcm9wcywgcGFyZW50LCBub2RlLCBzdmdDb250ZXh0IH0gPSB2Tm9kZTtcclxuICAgIGNvbnN0IG5ld1ZOb2RlID0gbmV3IEVsZW1lbnRWTm9kZSh7IHRhZywgcHJvcHMsIGNoaWxkcmVuIH0pO1xyXG4gICAgT2JqZWN0LmFzc2lnbihuZXdWTm9kZSwgeyBwYXJlbnQsIG5vZGUsIHN2Z0NvbnRleHQgfSk7XHJcbiAgICByZXR1cm4gbmV3Vk5vZGU7XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgYWRkUHJvcHMoXHJcbiAgICBlbGVtZW50OiBFbGVtZW50LFxyXG4gICAgbmV3UHJvcHM6IFJlY29yZDxzdHJpbmcsIGFueT4sXHJcbiAgICBvbGRQcm9wczogUmVjb3JkPHN0cmluZywgYW55PiA9IHt9XHJcbiAgKSB7XHJcbiAgICAvLyBpdGVyYXRlIG92ZXIgYWxsIG1vZGlmaWVkIG5ldyBhbmQgb2xkIHByb3BlcnRpZXMgYW5kIHNldC9yZW1vdmUvdXBkYXRlIHRoZW1cclxuICAgIEFycmF5LmZyb20obmV3IFNldChbLi4uT2JqZWN0LmtleXMobmV3UHJvcHMpLCAuLi5PYmplY3Qua2V5cyhvbGRQcm9wcyldKSlcclxuICAgICAgLm1hcCgocHJvcE5hbWUpID0+ICh7XHJcbiAgICAgICAgcHJvcE5hbWUsXHJcbiAgICAgICAgb2xkVmFsdWU6IG9sZFByb3BzW3Byb3BOYW1lXSxcclxuICAgICAgICBuZXdWYWx1ZTogbmV3UHJvcHNbcHJvcE5hbWVdLFxyXG4gICAgICB9KSlcclxuICAgICAgLmZpbHRlcigoeyBuZXdWYWx1ZSwgb2xkVmFsdWUgfSkgPT4gbmV3VmFsdWUgIT09IG9sZFZhbHVlKVxyXG4gICAgICAuZm9yRWFjaCgoeyBwcm9wTmFtZSwgbmV3VmFsdWUsIG9sZFZhbHVlIH0pID0+IHtcclxuICAgICAgICAvLyBmb3Igc3R5bGUgYXMgb2JqZWN0OlxyXG4gICAgICAgIC8vIChzdHlsZTopIHtkaXNwbGF5OiBcIm5vbmVcIiwgcG9zaXRpb246IFwiYWJzb2x1dGVcIn0gPT0+ICdkaXNwbGF5OiBub25lOyBwb3NpdGlvbjogYWJzb2x1dGU7J1xyXG4gICAgICAgIGlmIChwcm9wTmFtZSA9PT0gXCJzdHlsZVwiICYmIHR5cGVvZiBuZXdWYWx1ZSA9PT0gXCJvYmplY3RcIilcclxuICAgICAgICAgIG5ld1ZhbHVlID0gT2JqZWN0LmVudHJpZXMobmV3VmFsdWUpXHJcbiAgICAgICAgICAgIC5maWx0ZXIoKFssIHZdKSA9PiB0cnV0aHkodikpXHJcbiAgICAgICAgICAgIC5tYXAoKFtrLCB2XSkgPT4gYCR7a306ICR7dn1gKVxyXG4gICAgICAgICAgICAuam9pbihcIjsgXCIpO1xyXG5cclxuICAgICAgICAvLyAoY2xhc3M6KSBbXCJidG5cIiwgXCJyZWRcIl0gPT0+IFwiYnRuIHJlZFwiXHJcbiAgICAgICAgaWYgKHByb3BOYW1lID09PSBcImNsYXNzXCIgJiYgQXJyYXkuaXNBcnJheShuZXdWYWx1ZSkpXHJcbiAgICAgICAgICBuZXdWYWx1ZSA9IG5ld1ZhbHVlLmpvaW4oXCIgXCIpO1xyXG4gICAgICAgIC8vIHByb3BzIHN0YXJ0aW5nIHdpdGggXCJvbi1cIiBhcmUgZXZlbnQgbGlzdGVuZXJzXHJcbiAgICAgICAgaWYgKFxyXG4gICAgICAgICAgcHJvcE5hbWUuc3RhcnRzV2l0aChcIm9uLVwiKSAmJlxyXG4gICAgICAgICAgKHR5cGVvZiBuZXdWYWx1ZSA9PT0gXCJmdW5jdGlvblwiIHx8XHJcbiAgICAgICAgICAgIHR5cGVvZiBuZXdWYWx1ZSA9PT0gXCJvYmplY3RcIiB8fFxyXG4gICAgICAgICAgICB0eXBlb2Ygb2xkVmFsdWUgPT09IFwiZnVuY3Rpb25cIiB8fFxyXG4gICAgICAgICAgICB0eXBlb2Ygb2xkVmFsdWUgPT09IFwib2JqZWN0XCIpXHJcbiAgICAgICAgKSB7XHJcbiAgICAgICAgICAvLyByZW1vdmUgbGVhZGluZyBcIm9uLVwiXCJcclxuICAgICAgICAgIGNvbnN0IGV2ZW50ID0gcHJvcE5hbWUucmVwbGFjZSgvXm9uLS8sIFwiXCIpO1xyXG5cclxuICAgICAgICAgIGlmICh0eXBlb2YgbmV3VmFsdWUgPT09IFwiZnVuY3Rpb25cIiB8fCB0eXBlb2YgbmV3VmFsdWUgPT09IFwib2JqZWN0XCIpXHJcbiAgICAgICAgICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcclxuICAgICAgICAgICAgICBldmVudCxcclxuICAgICAgICAgICAgICBuZXdWYWx1ZSBhcyBFdmVudExpc3RlbmVyT3JFdmVudExpc3RlbmVyT2JqZWN0XHJcbiAgICAgICAgICAgICk7XHJcblxyXG4gICAgICAgICAgaWYgKHR5cGVvZiBvbGRWYWx1ZSA9PT0gXCJmdW5jdGlvblwiIHx8IHR5cGVvZiBvbGRWYWx1ZSA9PT0gXCJvYmplY3RcIilcclxuICAgICAgICAgICAgZWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFxyXG4gICAgICAgICAgICAgIGV2ZW50LFxyXG4gICAgICAgICAgICAgIG9sZFZhbHVlIGFzIEV2ZW50TGlzdGVuZXJPckV2ZW50TGlzdGVuZXJPYmplY3RcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gYm9vbGVhbiBhdHRyaWJ1dGUgc2V0IHdpdGhvdXQgdmFsdWVcclxuICAgICAgICBlbHNlIGlmIChuZXdWYWx1ZSA9PT0gdHJ1ZSkgZWxlbWVudC5zZXRBdHRyaWJ1dGUocHJvcE5hbWUsIFwiXCIpO1xyXG4gICAgICAgIC8vIHJlbW92ZSBvbGQgYXR0cmlidXRlcyB3aGljaCBhcmUgZmFsc2Ugbm93XHJcbiAgICAgICAgZWxzZSBpZiAoIXRydXRoeShuZXdWYWx1ZSkpIGVsZW1lbnQucmVtb3ZlQXR0cmlidXRlKHByb3BOYW1lKTtcclxuICAgICAgICAvLyB1cGRhdGUgdG8gbmV3IHZhbHVlIGFzIHN0cmluZ1xyXG4gICAgICAgIGVsc2UgaWYgKHR5cGVvZiBuZXdWYWx1ZSA9PT0gXCJzdHJpbmdcIiB8fCB0eXBlb2YgbmV3VmFsdWUgPT09IFwibnVtYmVyXCIpXHJcbiAgICAgICAgICBlbGVtZW50LnNldEF0dHJpYnV0ZShwcm9wTmFtZSwgU3RyaW5nKG5ld1ZhbHVlKSk7XHJcbiAgICAgICAgLy8ga2V5IGhhcyB0aGUgZm9ybSBvZiBcIm9uLWNoYW5nZVwiLiB2YWx1ZSBpcyB0aGUgY2FsbGJhY2sgZnVuY3Rpb24gb3IgYW4gb2JqZWN0IGltcGxlbWVudGluZyB7RXZlbnRMaXN0ZW5lcn0gaW50ZXJmYWNlXHJcbiAgICAgICAgLy8gQHRzLWlnbm9yZSAtIHByb3ZpZGluZyB0aGUgdmFsdWUgYXMgcHJvcGVydHkgdG8gaHRtbCBlbGVtZW50XHJcbiAgICAgICAgZWxzZSBlbGVtZW50W3Byb3BOYW1lXSA9IG5ld1ZhbHVlOyAvLyBAVE9ETzogcmVtb3ZlIG9sZCBvYmogd2hlbiBuZXcgaXMgbnVsbDo6IG5ldyBudWxsIC0+IG9sZDogc3RyPyAtPiByZW1vdmVBdHQsIGV2ZW50PyA6IHJlbW92ZUV2LCBvYmo/OiBbcHJvcF0gPSB1bmRlZlxyXG4gICAgICB9KTtcclxuICB9XHJcbn1cclxuXHJcbmNsYXNzIEZyYWdtZW50Vk5vZGUgZXh0ZW5kcyBWTm9kZSBpbXBsZW1lbnRzIFZOb2RlSW50ZXJmYWNlIHtcclxuICB0eXBlID0gXCJGcmFnbWVudFwiO1xyXG4gIGNoaWxkcmVuOiBWTm9kZUludGVyZmFjZVtdO1xyXG4gIHBhcmVudDogVk5vZGVJbnRlcmZhY2UgPSBudWxsIGFzIGFueTtcclxuXHJcbiAgY29uc3RydWN0b3IoY2hpbGRyZW46IEpTWENoaWxkW10pIHtcclxuICAgIHN1cGVyKCk7XHJcblxyXG4gICAgdGhpcy5jaGlsZHJlbiA9IGNoaWxkcmVuLm1hcCgoY2hpbGQpID0+IHtcclxuICAgICAgaWYgKEFycmF5LmlzQXJyYXkoY2hpbGQpKSByZXR1cm4gbmV3IEZyYWdtZW50Vk5vZGUoY2hpbGQpO1xyXG4gICAgICBpZiAoY2hpbGQgaW5zdGFuY2VvZiBWTm9kZSkgcmV0dXJuIGNoaWxkIGFzIFZOb2RlSW50ZXJmYWNlO1xyXG4gICAgICBpZiAoY2hpbGQgaW5zdGFuY2VvZiBOb2RlKSByZXR1cm4gbmV3IExpdmVOb2RlVk5vZGUoY2hpbGQpO1xyXG4gICAgICBpZiAoIXRydXRoeShjaGlsZCkpIHJldHVybiBuZXcgTnVsbFZOb2RlKCk7XHJcbiAgICAgIHJldHVybiBuZXcgVGV4dFZOb2RlKGNoaWxkIGFzIHN0cmluZyB8IG51bWJlciB8IHRydWUpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgdGhpcy5jaGlsZHJlbi5mb3JFYWNoKChjaGlsZCkgPT4gKGNoaWxkLnBhcmVudCA9IHRoaXMpKTtcclxuICB9XHJcblxyXG4gIGFzTm9kZSgpIHtcclxuICAgIGNvbnN0IG5vZGUgPSBhc05vZGUodW5kZWZpbmVkLCB7fSwgdGhpcy5jaGlsZHJlbikgYXMgRG9jdW1lbnRGcmFnbWVudDtcclxuXHJcbiAgICByZXR1cm4gbm9kZTtcclxuICB9XHJcblxyXG4gIHRvU3RyaW5nKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuY2hpbGRyZW4ubWFwKChjaGlsZCkgPT4gY2hpbGQudG9TdHJpbmcoKSkuam9pbihcIlwiKTtcclxuICB9XHJcblxyXG4gIGRpZmZBbmRQYXRjaChuZXdWTm9kZTogRnJhZ21lbnRWTm9kZSkge1xyXG4gICAgcmV0dXJuIGRpZmZBbmRQYXRjaENoaWxkcmVuKHRoaXMsIG5ld1ZOb2RlKTtcclxuICB9XHJcblxyXG4gIHJlbW92ZUZyb21ET00oKSB7XHJcbiAgICB0aGlzLmNoaWxkcmVuLmZvckVhY2goKGNoaWxkKSA9PiBjaGlsZC5yZW1vdmVGcm9tRE9NKCkpO1xyXG4gIH1cclxufVxyXG5cclxuY2xhc3MgVGV4dFZOb2RlIGV4dGVuZHMgVk5vZGUgaW1wbGVtZW50cyBWTm9kZUludGVyZmFjZSB7XHJcbiAgdHlwZSA9IFwiVGV4dE5vZGVcIjtcclxuICBjaGlsZHJlbiA9IFtdO1xyXG4gIG5vZGU6IFRleHQgPSBudWxsIGFzIGFueTtcclxuICBwcm9wczogeyBjb250ZW50OiBhbnkgfTtcclxuICBwYXJlbnQ6IFZOb2RlSW50ZXJmYWNlID0gbnVsbCBhcyBhbnk7XHJcblxyXG4gIC8qKlxyXG4gICAqXHJcbiAgICovXHJcbiAgY29uc3RydWN0b3IoY29udGVudDogc3RyaW5nIHwgbnVtYmVyIHwgYm9vbGVhbikge1xyXG4gICAgc3VwZXIoKTtcclxuICAgIHRoaXMucHJvcHMgPSB7IGNvbnRlbnQgfTsgLy9AVE9ETzpcclxuICB9XHJcblxyXG4gIGFzTm9kZSgpIHtcclxuICAgIGNvbnN0IHRleHROb2RlID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUodGhpcy5wcm9wcy5jb250ZW50KTtcclxuICAgIHRoaXMubm9kZSA9IHRleHROb2RlO1xyXG4gICAgcmV0dXJuIHRleHROb2RlO1xyXG4gIH1cclxuXHJcbiAgdG9TdHJpbmcoKSB7XHJcbiAgICByZXR1cm4gc2FuaXRpemUodGhpcy5wcm9wcy5jb250ZW50KTtcclxuICB9XHJcblxyXG4gIGRpZmZBbmRQYXRjaChuZXdOb2RlOiBUZXh0Vk5vZGUpIHtcclxuICAgIHRoaXMubm9kZS5ub2RlVmFsdWUgPSBuZXdOb2RlLnByb3BzLmNvbnRlbnQ7XHJcbiAgICBuZXdOb2RlLm5vZGUgPSB0aGlzLm5vZGU7XHJcbiAgfVxyXG5cclxuICByZW1vdmVGcm9tRE9NKCkge1xyXG4gICAgdGhpcy5ub2RlLnBhcmVudEVsZW1lbnQhLnJlbW92ZUNoaWxkKHRoaXMubm9kZSk7XHJcbiAgfVxyXG59XHJcblxyXG5jbGFzcyBOdWxsVk5vZGUgZXh0ZW5kcyBWTm9kZSBpbXBsZW1lbnRzIFZOb2RlSW50ZXJmYWNlIHtcclxuICB0eXBlID0gXCJOdWxsXCI7XHJcbiAgY2hpbGRyZW4gPSBbXTtcclxuICBwYXJlbnQ6IFZOb2RlSW50ZXJmYWNlID0gbnVsbCBhcyBhbnk7XHJcbiAgLyoqXHJcbiAgICpcclxuICAgKi9cclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIHN1cGVyKCk7XHJcbiAgfVxyXG5cclxuICBhc05vZGUoKSB7XHJcbiAgICAvL3JldHVybiBudWxsOyAvLyByZXR1cm4gZW1wdHkgZnJhZ21lbnQ/XHJcbiAgICByZXR1cm4gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO1xyXG4gIH1cclxuXHJcbiAgZGlmZkFuZFBhdGNoKG5ld05vZGUyOiBOdWxsVk5vZGUpIHtcclxuICAgIHJldHVybjtcclxuICB9XHJcblxyXG4gIHJlbW92ZUZyb21ET00oKSB7XHJcbiAgICByZXR1cm47XHJcbiAgfVxyXG5cclxuICB0b1N0cmluZygpIHtcclxuICAgIHJldHVybiBcIlwiO1xyXG4gIH1cclxufVxyXG5cclxuY2xhc3MgTGl2ZU5vZGVWTm9kZSBleHRlbmRzIFZOb2RlIGltcGxlbWVudHMgVk5vZGVJbnRlcmZhY2Uge1xyXG4gIHR5cGUgPSBcIk5vZGVcIjtcclxuICBjaGlsZHJlbiA9IFtdIGFzIFZOb2RlSW50ZXJmYWNlW107XHJcbiAgcGFyZW50OiBWTm9kZUludGVyZmFjZSA9IG51bGwgYXMgYW55O1xyXG4gIG5vZGU6IE5vZGU7XHJcblxyXG4gIC8qKlxyXG4gICAqXHJcbiAgICovXHJcbiAgY29uc3RydWN0b3Iobm9kZTogTm9kZSkge1xyXG4gICAgc3VwZXIoKTtcclxuICAgIHRoaXMubm9kZSA9IG5vZGU7XHJcbiAgfVxyXG5cclxuICBhc05vZGUoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5ub2RlO1xyXG4gIH1cclxuXHJcbiAgZGlmZkFuZFBhdGNoKG5ld05vZGU6IExpdmVOb2RlVk5vZGUpIHtcclxuICAgIGlmIChuZXdOb2RlLm5vZGUgIT09IHRoaXMubm9kZSkge1xyXG4gICAgICAodGhpcy5ub2RlIGFzIENoaWxkTm9kZSkucmVwbGFjZVdpdGgobmV3Tm9kZS5ub2RlKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHJlbW92ZUZyb21ET00oKSB7XHJcbiAgICB0aGlzLm5vZGUucGFyZW50RWxlbWVudCEucmVtb3ZlQ2hpbGQodGhpcy5ub2RlKTtcclxuICB9XHJcblxyXG4gIHRvU3RyaW5nKCkge1xyXG4gICAgcmV0dXJuIGdldE91dGVySHRtbCh0aGlzLm5vZGUpO1xyXG4gIH1cclxufVxyXG5cclxuY2xhc3MgUm9vdFZOb2RlIGV4dGVuZHMgVk5vZGUgaW1wbGVtZW50cyBWTm9kZUludGVyZmFjZSB7XHJcbiAgdHlwZSA9IFwiUm9vdFwiO1xyXG4gIHBhcmVudCA9IG51bGw7XHJcbiAgbm9kZTogRWxlbWVudDtcclxuICBjaGlsZHJlbjogVk5vZGVJbnRlcmZhY2VbXTtcclxuICAvKipcclxuICAgKlxyXG4gICAqL1xyXG4gIGNvbnN0cnVjdG9yKGNvbnRlbnQ6IFZOb2RlSW50ZXJmYWNlLCBkb21Ob2RlOiBFbGVtZW50KSB7XHJcbiAgICBzdXBlcigpO1xyXG4gICAgY29udGVudC5wYXJlbnQgPSB0aGlzO1xyXG4gICAgdGhpcy5jaGlsZHJlbiA9IFtjb250ZW50XTtcclxuICAgIHRoaXMubm9kZSA9IGRvbU5vZGU7XHJcbiAgfVxyXG5cclxuICBhc05vZGUoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5jaGlsZHJlblswXS5hc05vZGUoKTtcclxuICB9XHJcbiAgdG9TdHJpbmcoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5jaGlsZHJlblswXS50b1N0cmluZygpO1xyXG4gIH1cclxuXHJcbiAgZGlmZkFuZFBhdGNoKG5ld1ZOb2RlOiBWTm9kZUludGVyZmFjZSkge1xyXG4gICAgZGlmZkFuZFBhdGNoQ2hpbGRyZW4odGhpcywgbmV3Vk5vZGUpO1xyXG4gIH1cclxuXHJcbiAgcmVtb3ZlRnJvbURPTSgpIHtcclxuICAgIHRoaXMubm9kZS5yZW1vdmUoKTtcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGFzVk5vZGUoXHJcbiAgdGFnOiBzdHJpbmcgfCBGdW5jdGlvbiB8IHVuZGVmaW5lZCxcclxuICBwcm9wczogSnN4UHJvcHNcclxuKTogVk5vZGVJbnRlcmZhY2Uge1xyXG4gIGlmICh0eXBlb2YgdGFnID09PSBcImZ1bmN0aW9uXCIpIHtcclxuICAgIGxldCByZXN1bHQgPSB0YWcocHJvcHMpO1xyXG4gICAgaWYgKHJlc3VsdCBpbnN0YW5jZW9mIFZOb2RlKSByZXR1cm4gcmVzdWx0IGFzIFZOb2RlSW50ZXJmYWNlO1xyXG4gICAgaWYgKHJlc3VsdCBpbnN0YW5jZW9mIE5vZGUpIHJldHVybiBuZXcgTGl2ZU5vZGVWTm9kZShyZXN1bHQpO1xyXG4gICAgLy8gbnVsbCBqc3ggbm9kZVxyXG4gICAgaWYgKCF0cnV0aHkocmVzdWx0KSkgcmV0dXJuIG5ldyBOdWxsVk5vZGUoKTtcclxuXHJcbiAgICByZXR1cm4gbmV3IFRleHRWTm9kZShyZXN1bHQpO1xyXG4gIH1cclxuXHJcbiAgY29uc3QgeyBjaGlsZHJlbiwgLi4uYXR0ciB9ID0gcHJvcHM7XHJcblxyXG4gIHJldHVybiB0YWdcclxuICAgID8gbmV3IEVsZW1lbnRWTm9kZSh7IHRhZywgcHJvcHM6IGF0dHIsIGNoaWxkcmVuIH0pXHJcbiAgICA6IG5ldyBGcmFnbWVudFZOb2RlKGNoaWxkcmVuKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIGNvbnZlcnRzIHByYWdtYSBvYmplY3QgdG8gaHRtbCBzdHJpbmdcclxuICoganN4cyBpcyBhbHdheXMgY2FsbGVkIHdoZW4gZWxlbWVudCBoYXMgbW9yZSB0aGFuIG9uZSBjaGlsZFxyXG4gKlxyXG4gKiBAcGFyYW0ge3N0cmluZyB8IEZ1bmN0aW9ufSB0YWcgLSB0YWcgbmFtZSBvciB0YWcgY2xhc3NcclxuICogQHBhcmFtIHtPYmplY3QgfCBudWxsfSBwcm9wcyAtIHByb3BzIGZvciB0aGUgdGFnXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24ganN4cyh0YWc6IHN0cmluZyB8IEZ1bmN0aW9uLCBwcm9wczogSnN4UHJvcHMpOiBWTm9kZUludGVyZmFjZSB7XHJcbiAgcmV0dXJuIGFzVk5vZGUodGFnLCBwcm9wcyk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBjb252ZXJ0cyB0aGUgZnJhZ21lbnRzIG9iamVjdCB0byBub2Rlc1xyXG4gKlxyXG4gKiBAcGFyYW0ge09iamVjdH0gcHJvcHNcclxuICogQHBhcmFtIHtBcnJheX0gcHJvcHMuY2hpbGRyZW4gLSBjaGlsZCBlbGVtZW50cyBpbiB0aGUgZnJhZ21lbnRcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBGcmFnbWVudChwcm9wczogSnN4UHJvcHMpIHtcclxuICByZXR1cm4gYXNWTm9kZSh1bmRlZmluZWQsIHByb3BzKTtcclxufVxyXG5cclxuLy8ganN4IGlzIGNhbGxlZCB3aGVuIHRoZSBlbGVtZW50IGhhcyBvbmUgb3IgemVybyBjaGlsZHJlblxyXG5leHBvcnQgZnVuY3Rpb24ganN4KFxyXG4gIHRhZzogc3RyaW5nIHwgRnVuY3Rpb24sXHJcbiAgcHJvcHM6IEF0dHJpYnV0ZXMgJiBTcGVjaWFsQXR0cmlidXRlcyAmIHsgY2hpbGRyZW4/OiBKU1hDaGlsZCB9XHJcbik6IFZOb2RlSW50ZXJmYWNlIHtcclxuICAvLyBAdHMtaWdub3JlIC0gd3JhcHBpbmcgdGhlIGNoaWxkcmVuIGFzIGFycmF5IHRvIHJlLXVzZSBqc3hzIG1ldGhvZFxyXG4gIHByb3BzLmNoaWxkcmVuID0gcHJvcHMuaGFzT3duUHJvcGVydHkoXCJjaGlsZHJlblwiKSA/IFtwcm9wcy5jaGlsZHJlbl0gOiBbXTtcclxuXHJcbiAgcmV0dXJuIGpzeHModGFnLCBwcm9wcyBhcyBKc3hQcm9wcyk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiByZW5kZXIgdGhlIGdpdmVuIG1hcmt1cCBpbnRvIHRoZSBnaXZlbiBkb20gbm9kZVxyXG4gKlxyXG4gKiBAcGFyYW0ge3N0cmluZ3xIVE1MRWxlbWVudHxKU1h9IG1hcmt1cCAtIGh0bWwgYXMgc3RyaW5nLCBodG1sIGVsZW1lbnQgb3IganN4IHRlbXBsYXRlXHJcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGRvbU5vZGUgLSBjb250YWluZXIgZm9yIHRoZSB0ZW1wbGF0ZSB0byBiZSByZW5kZXJlZCBpbnRvXHJcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW2FwcGVuZD1mYWxzZV0gLSBzaG91bGQgdGhlIHByb3ZpZGVkIG1hcmt1cCBiZSBhcHBlbmRlZCB0byB0aGUgZXhpc3RpbmcgbWFya3VwLCBvciBkZWZhdWx0IHJlcGxhY2UgaXRcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiByZW5kZXIoXHJcbiAgbWFya3VwOlxyXG4gICAgfCBzdHJpbmdcclxuICAgIHwgbnVtYmVyXHJcbiAgICB8IG51bGxcclxuICAgIHwgYm9vbGVhblxyXG4gICAgfCB1bmRlZmluZWRcclxuICAgIHwgSFRNTEVsZW1lbnRcclxuICAgIHwgVk5vZGVJbnRlcmZhY2UsIC8vIEBUT0RPOiBzcGVjaWZpYyBzdXBwb3J0IGZvciBUZW1wbGF0ZT8gKC5jb250ZW50LmNsb25lKVxyXG4gIGRvbU5vZGU6IEhUTUxFbGVtZW50LFxyXG4gIGFwcGVuZDogYm9vbGVhbiA9IGZhbHNlXHJcbikge1xyXG4gIEFycmF5LmZyb20oZG9jdW1lbnQuYm9keS5xdWVyeVNlbGVjdG9yQWxsKFwiKlwiKSkuZm9yRWFjaChcclxuICAgIChlbCkgPT4gKGVsLnN0eWxlLmJhY2tncm91bmQgPSBcIiNjY2ZmY2NcIilcclxuICApO1xyXG5cclxuICBjb25zdCBpc1JlUmVuZGVyID0gcmVuZGVyZWRWVHJlZXMuaGFzKGRvbU5vZGUpO1xyXG5cclxuICBpZiAoXHJcbiAgICB0eXBlb2YgbWFya3VwID09PSBcInN0cmluZ1wiIHx8XHJcbiAgICB0eXBlb2YgbWFya3VwID09PSBcIm51bWJlclwiIHx8XHJcbiAgICBtYXJrdXAgPT09IHRydWVcclxuICApIHtcclxuICAgIG1hcmt1cCA9IG5ldyBUZXh0Vk5vZGUobWFya3VwKTtcclxuICB9IGVsc2UgaWYgKG1hcmt1cCBpbnN0YW5jZW9mIE5vZGUpIHtcclxuICAgIG1hcmt1cCA9IG5ldyBMaXZlTm9kZVZOb2RlKG1hcmt1cCk7XHJcbiAgfSBlbHNlIGlmIChtYXJrdXAgPT09IHVuZGVmaW5lZCB8fCBtYXJrdXAgPT09IG51bGwgfHwgbWFya3VwID09PSBmYWxzZSkge1xyXG4gICAgbWFya3VwID0gbmV3IE51bGxWTm9kZSgpO1xyXG4gIH1cclxuXHJcbiAgaWYgKG1hcmt1cCBpbnN0YW5jZW9mIFZOb2RlKSB7XHJcbiAgICBsZXQgdlRyZWU7XHJcblxyXG4gICAgaWYgKCFhcHBlbmQgJiYgIWlzUmVSZW5kZXIpIGRvbU5vZGUuaW5uZXJIVE1MID0gXCJcIjtcclxuXHJcbiAgICBpZiAoaXNSZVJlbmRlcikge1xyXG4gICAgICBjb25zdCBvbGRWVHJlZSA9IHJlbmRlcmVkVlRyZWVzLmdldChkb21Ob2RlKSE7XHJcblxyXG4gICAgICAvLyB3YXMgcHJldmlvdXNseSByZW5kZXJlZCBhcyBhIHN1YnRyZWUgZnJvbSBhbm90aGVyIHJlbmRlclxyXG4gICAgICBpZiAob2xkVlRyZWUudHlwZSA9PT0gXCJFbGVtZW50XCIpIHtcclxuICAgICAgICB2VHJlZSA9IEVsZW1lbnRWTm9kZS5mcm9tRXhpc3RpbmdFbGVtZW50Tm9kZShvbGRWVHJlZSBhcyBFbGVtZW50Vk5vZGUsIFtcclxuICAgICAgICAgIG1hcmt1cCxcclxuICAgICAgICBdKTtcclxuICAgICAgICAob2xkVlRyZWUgYXMgRWxlbWVudFZOb2RlKS5kaWZmQW5kUGF0Y2godlRyZWUpO1xyXG4gICAgICAgIC8vIHVwZGF0ZSB0aGUgY2hpbGRyZW4gcHJvcGVydHkgaW4gdGhlIG1lbW9yeSByZWZlcmVuY2UgZnJvbSB0aGUgcHJldmlvdXMgcmVuZGVyLFxyXG4gICAgICAgIC8vIGF0dHJpYnV0ZXMsIGV0YyB3aWxsIHN0YXkgdGhlIHNhbWVcclxuICAgICAgICBvbGRWVHJlZS5jaGlsZHJlbiA9IHZUcmVlLmNoaWxkcmVuO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHZUcmVlID0gbmV3IFJvb3RWTm9kZShtYXJrdXAsIGRvbU5vZGUpO1xyXG4gICAgICAgIC8vIGRpZmZcclxuICAgICAgICAob2xkVlRyZWUgYXMgUm9vdFZOb2RlKS5kaWZmQW5kUGF0Y2godlRyZWUpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICByZW5kZXJlZFZUcmVlcy5zZXQoZG9tTm9kZSwgdlRyZWUpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdlRyZWUgPSBuZXcgUm9vdFZOb2RlKG1hcmt1cCwgZG9tTm9kZSk7XHJcbiAgICAgIGRvbU5vZGUuYXBwZW5kKHZUcmVlLmFzTm9kZSgpKTtcclxuICAgIH1cclxuXHJcbiAgICByZW5kZXJlZFZUcmVlcy5zZXQoZG9tTm9kZSwgdlRyZWUpO1xyXG5cclxuICAgIC8vIGNhbGwgYWxsIHJlZiBjYWxsYmFja3MgZm91bmQgZHVyaW5nIGNyZWF0aW9uIG9mIG5ldyBub2RlIGR1cmluZyByZW5kZXJcclxuICAgIHdoaWxlIChyZWZzVG9DYWxsLmxlbmd0aCkge1xyXG4gICAgICAvLyByZW1vdmUgZmlyc3QgZnJvbSBsaXN0LCBhbmQgaW52b2tlIGl0XHJcbiAgICAgIHJlZnNUb0NhbGwuc3BsaWNlKDAsIDEpWzBdKCk7XHJcbiAgICB9XHJcbiAgfSBlbHNlIHtcclxuICAgIHRocm93IG5ldyBFcnJvcihcInJlbmRlciBtZXRob2QgY2FsbGVkIHdpdGggd3JvbmcgYXJndW1lbnQocylcIik7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gcmF3SHRtbChjb250ZW50OiBzdHJpbmcpOiBWTm9kZUludGVyZmFjZSB7XHJcbiAgcmV0dXJuIG5ldyAoY2xhc3MgUmF3SHRtbCBleHRlbmRzIFZOb2RlIGltcGxlbWVudHMgVk5vZGVJbnRlcmZhY2Uge1xyXG4gICAgcGFyZW50OiBWTm9kZUludGVyZmFjZSA9IG51bGwgYXMgYW55O1xyXG4gICAgY2hpbGRyZW4gPSBbXTtcclxuICAgIHR5cGUgPSBcIlJhd0h0bWxcIjtcclxuICAgIGNoaWxkTm9kZXM6IENoaWxkTm9kZVtdID0gbnVsbCBhcyBhbnk7XHJcbiAgICBjb250ZW50OiBzdHJpbmc7XHJcbiAgICBub2RlPzogTm9kZTtcclxuXHJcbiAgICAvKipcclxuICAgICAqXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKGNvbnRlbnQ6IHN0cmluZykge1xyXG4gICAgICBzdXBlcigpO1xyXG4gICAgICB0aGlzLmNvbnRlbnQgPSBjb250ZW50O1xyXG4gICAgfVxyXG4gICAgcmVtb3ZlRnJvbURPTSgpIHtcclxuICAgICAgdGhpcy5jaGlsZE5vZGVzLmZvckVhY2goKG5vZGUpID0+IG5vZGUucGFyZW50RWxlbWVudCEucmVtb3ZlQ2hpbGQobm9kZSkpO1xyXG4gICAgfVxyXG5cclxuICAgIGRpZmZBbmRQYXRjaChuZXdOb2RlOiBSYXdIdG1sKSB7XHJcbiAgICAgIGlmICgobmV3Tm9kZS5jb250ZW50ID0gdGhpcy5jb250ZW50KSkge1xyXG4gICAgICAgIG5ld05vZGUubm9kZSA9IHRoaXMubm9kZTtcclxuICAgICAgICBuZXdOb2RlLmNoaWxkTm9kZXMgPSB0aGlzLmNoaWxkTm9kZXM7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcbiAgICAgIHRoaXMucmVtb3ZlRnJvbURPTSgpO1xyXG4gICAgICBpbnNlcnROZXdJdGVtKG5ld05vZGUpO1xyXG4gICAgfVxyXG5cclxuICAgIHRvU3RyaW5nKCkge1xyXG4gICAgICByZXR1cm4gY29udGVudDtcclxuICAgIH1cclxuXHJcbiAgICBhc05vZGUoKSB7XHJcbiAgICAgIGNvbnN0IHRlbXBsYXRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRlbXBsYXRlXCIpO1xyXG4gICAgICB0ZW1wbGF0ZS5pbm5lckhUTUwgPSB0aGlzLmNvbnRlbnQ7XHJcbiAgICAgIGNvbnN0IGRvY3VtZW50RnJhZ21lbnQgPSB0ZW1wbGF0ZS5jb250ZW50O1xyXG4gICAgICB0aGlzLmNoaWxkTm9kZXMgPSBBcnJheS5mcm9tKGRvY3VtZW50RnJhZ21lbnQuY2hpbGROb2Rlcyk7XHJcblxyXG4gICAgICAvLyBiYXNpY2FsbHkgdGhlIGAubm9kZWAgcHJvcGVydHkgaXMgdXNlZCB0byBkZXRlcm1pbmUgdGhlIGxhc3QgaHRtbCBub2RlIG9mIHRoZSBWTm9kZSxcclxuICAgICAgLy8gdG8gcG9zaXRpb24gdGhlIG5leHQgVk5vZGUncyBET00gTm9kZSBhZnRlciBpdC5cclxuICAgICAgLy8gdGhlcmVmb3JlIC5ub2RlIHJldHVybnMgdGhlIGxhc3Qgbm9kZSBvZiB0aGUgcmF3IGh0bWxcclxuICAgICAgaWYgKHRoaXMuY2hpbGROb2Rlcy5sZW5ndGgpXHJcbiAgICAgICAgdGhpcy5ub2RlID0gdGhpcy5jaGlsZE5vZGVzW3RoaXMuY2hpbGROb2Rlcy5sZW5ndGggLSAxXTtcclxuICAgICAgcmV0dXJuIGRvY3VtZW50RnJhZ21lbnQ7XHJcbiAgICB9XHJcbiAgfSkoY29udGVudCk7XHJcbn1cclxuXHJcbi8vIGdvdGNoYXM6XHJcbi8vIC0gc3R5bGVzIHdpbGwgb3ZlcnJpZGUgKGNvdWxkIGRvOiBzZXR0aW5nIGVhY2ggcnVsZSBpbmRpdmlkdWFsbHkpXHJcbi8vIC0gcmVmIDogb25seSBjYWxsZWQgb24gY3JlYXRpb24gb2YgRWxlbWVudCwgbm90IG9uIHJlZiBjaGFuZ2VcclxuXHJcbi8vIHdpbmRvdy5yZW5kZXJlZFZUcmVlcyA9IHJlbmRlcmVkVlRyZWVzO1xyXG4iLCJpbXBvcnQgeyByZW5kZXIsIHJhd0h0bWwgfSBmcm9tIFwiLi9qc3gvanN4LXJ1bnRpbWVcIjtcclxuXHJcbmNvbnN0IHhzcyA9IFwiPGltZyBzcmM9eCBvbmVycm9yPVxcXCJhbGVydCgnWFNTIEF0dGFjaycpXFxcIj5cIjsgLy9cIjxzY3JpcHQ+YWxlcnQoJy0uLScpPC9zY3JpcHQ+XCI7XHJcblxyXG5mdW5jdGlvbiBSVEUocHJvcHM6IC8qeyB0eHQsIFwib24tY2xpY2tcIjogb25DbGljayB9Ki8ge1xyXG4gIHR4dDogc3RyaW5nO1xyXG4gIHJlZj86IEZ1bmN0aW9uO1xyXG59KSB7XHJcbiAgY29uc29sZS5sb2coXCJvbkNsaWNrXCIsIHByb3BzW1wib24tY2xpY2tcIl0pO1xyXG4gIHJldHVybiAoXHJcbiAgICA8cCByZWY9eyhlbDogSFRNTEVsZW1lbnQpID0+IGNvbnNvbGUubG9nKFwibXkgZGl2IDo6cmVmOjozLjJcIiwgZWwpfT5cclxuICAgICAge3Byb3BzLnR4dH1cclxuICAgIDwvcD5cclxuICApO1xyXG59XHJcblxyXG5mdW5jdGlvbiBCdXR0b24oe1xyXG4gIGNoaWxkcmVuLFxyXG4gIGRpc2FibGVkLFxyXG59OiB7XHJcbiAgY2hpbGRyZW46IGFueTtcclxuICBkaXNhYmxlZDogYm9vbGVhbjtcclxuICByZWY/OiBGdW5jdGlvbjtcclxufSkge1xyXG4gIHJldHVybiAoXHJcbiAgICA8YnV0dG9uXHJcbiAgICAgIGRpc2FibGVkPXtkaXNhYmxlZH1cclxuICAgICAgcmVmPXsoZWw6IEhUTUxFbGVtZW50KSA9PiBjb25zb2xlLmxvZyhcIm15IGJ1dHRvbiA6OnJlZjo6MVwiLCBlbCl9XHJcbiAgICA+XHJcbiAgICAgIDxzcGFuIHJlZj17KGVsOiBIVE1MRWxlbWVudCkgPT4gY29uc29sZS5sb2coXCJteSBhIDo6cmVmOjoyXCIsIGVsKX0+XHJcbiAgICAgICAgQnRuLXNwYW4tZmlyc3RcclxuICAgICAgPC9zcGFuPlxyXG4gICAgICB7Y2hpbGRyZW59XHJcbiAgICAgIDw+XHJcbiAgICAgICAgPHNwYW4gcmVmPXsoZWw6IEhUTUxFbGVtZW50KSA9PiBjb25zb2xlLmxvZyhcIm15IGEgOjpyZWY6OjNcIiwgZWwpfT5cclxuICAgICAgICAgIEJ0bi1zcGFuLWVuZFxyXG4gICAgICAgIDwvc3Bhbj5cclxuICAgICAgPC8+XHJcbiAgICA8L2J1dHRvbj5cclxuICApO1xyXG59XHJcblxyXG5mdW5jdGlvbiByZWZsb2coZWw6IEhUTUxFbGVtZW50KSB7XHJcbiAgY29uc29sZS5sb2coXCJteSBpbm5lciBkaXY6OnJlZjo6OFwiLCBlbCk7XHJcbn1cclxuXHJcbi8qXHJcbmNvbnN0IG1hcmt1cCA9IChcclxuICA8PlxyXG4gICAgPGRpdlxyXG4gICAgICBjbGFzcz1cImZvb1wiXHJcbiAgICAgIHJlZj17KGVsOiBIVE1MRWxlbWVudCkgPT4gY29uc29sZS5sb2coXCJteSBkaXYgOjpyZWY6OjRcIiwgZWwpfVxyXG4gICAgLz5cclxuICAgIDxpbnB1dCBkaXNhYmxlZD17dHJ1ZX0gaGlkZGVuPXtmYWxzZX0gLz5cclxuICAgIDxCdXR0b25cclxuICAgICAgZGlzYWJsZWQ9e3RydWV9XHJcbiAgICAgIHJlZj17KGVsOiBIVE1MRWxlbWVudCkgPT4gY29uc29sZS5sb2coXCJteSBCVVRUT046OnJlZjo6NVwiLCBlbCl9XHJcbiAgICA+XHJcbiAgICAgIHRleHRcclxuICAgICAgPHBvcHVwLWluZm9cclxuICAgICAgICByZWY9eyhlbDogSFRNTEVsZW1lbnQpID0+IGNvbnNvbGUubG9nKFwic3BhbiBpbiBCVVRUT046OnJlZjo6NlwiLCBlbCl9XHJcbiAgICAgID5cclxuICAgICAgICBibGFcclxuICAgICAgPC9wb3B1cC1pbmZvPlxyXG4gICAgPC9CdXR0b24+XHJcbiAgICA8UlRFXHJcbiAgICAgIHR4dD1cImxlIHRleHRcIlxyXG4gICAgICByZWY9eyhlbDogSFRNTEVsZW1lbnQpID0+IGNvbnNvbGUubG9nKFwibXkgZGl2IDo6cmVmOjozLjFcIiwgZWwpfVxyXG4gICAgICBvbi1jbGljaz17KGU6IEhUTUxFbGVtZW50KSA9PiBjb25zb2xlLmxvZyhlKX1cclxuICAgIC8+XHJcbiAgICB7eHNzfVxyXG4gICAge3Jhd0h0bWwoYDxvbD48bGk+cmF3IGh0bWw8L2xpPjwvb2w+YCl9XHJcbiAgICA8ZGl2XHJcbiAgICAgIGNsYXNzPVwiYmFtXCJcclxuICAgICAgcmVmPXsoZWw6IEhUTUxFbGVtZW50KSA9PiBjb25zb2xlLmxvZyhcIm15IGRpdjo6cmVmOjo3XCIsIGVsKX1cclxuICAgID5cclxuICAgICAgPGRpdj5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwiYmFyXCIgb24tY2xpY2s9eyhlKSA9PiBjb25zb2xlLmxvZyhlKX0gcmVmPXtyZWZsb2d9PlxyXG4gICAgICAgICAgY2xpY2sgTUVcclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8ZGl2IHN0eWxlPXt7IG91dGxpbmU6IFwiMXB4IHNvbGlkIHJlZDtcIiB9fT5cclxuICAgICAgICAgIHtkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI29sZFwiKX1cclxuICAgICAgICAgIHtudWxsfVxyXG4gICAgICAgICAge1swLCAxXS5tYXAoKG4pID0+IChcclxuICAgICAgICAgICAgPHNwYW4+e259PC9zcGFuPlxyXG4gICAgICAgICAgKSl9XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgPC9kaXY+XHJcbiAgPC8+XHJcbik7XHJcblxyXG4qL1xyXG5cclxuLypcclxuY29uc3QgbWFya3VwID0gKFxyXG4gIDxCdXR0b24gZGlzYWJsZWQ9e3RydWV9PlxyXG4gICAgICA8Ym9sZCByZWY9e3JlZmxvZ30+LS1JTk5FUi0tPC9ib2xkPlxyXG4gIDwvQnV0dG9uPlxyXG4pOyovXHJcbi8qXHJcblxyXG5jb25zdCBtYXJrdXAgPSAoXHJcbiAgPGRpdiBjbGFzcz1cImZvb1wiIHJlZj17KGVsOiBIVE1MRWxlbWVudCkgPT4gY29uc29sZS5sb2coXCJteSBkaXY6OnJlZjo6XCIsIGVsKX0+XHJcbiAgICA8ZGl2PlxyXG4gICAgICA8ZGl2IGNsYXNzPVwiYmFyXCIgcmVmPXsoZWw6IEhUTUxFbGVtZW50KSA9PiBjb25zb2xlLmxvZyhcIm15IGlubmVyIGRpdjo6cmVmOjpcIiwgZWwpfSAvPlxyXG4gICAgPC9kaXY+XHJcbiAgICA8QnV0dG9uIGRpc2FibGVkPXt0cnVlfT48L0J1dHRvbj5cclxuICA8L2Rpdj5cclxuKTtcclxuKi9cclxuLypcclxuY29uc3QgbWFya3VwID0gKFxyXG4gIDxhPlxyXG4gICAgPGI+XHJcbiAgICAgIDxjIGNsYXNzPVwiYmFyXCIgcmVmPXtyZWZsb2d9IC8+XHJcbiAgICA8L2I+XHJcbiAgPC9hPlxyXG4pO1xyXG4qL1xyXG5cclxuZnVuY3Rpb24gU3Bhbih7IG1vZGUgfTogeyBtb2RlOiBhbnkgfSkge1xyXG4gIHJldHVybiBtb2RlID09PSAxID8gKFxyXG4gICAgPGRpdj5cclxuICAgICAgPHNwYW4gaWQ9XCJpbm5lclwiIG9sZD17dHJ1ZX0+XHJcbiAgICAgICAgU3Bhbi1Db21wLS1vbGRcclxuICAgICAgPC9zcGFuPlxyXG4gICAgICA8aDM+dG8gYmUgcmVtb3ZlZDwvaDM+XHJcbiAgICA8L2Rpdj5cclxuICApIDogKFxyXG4gICAgPGRpdj5cclxuICAgICAgPHAgaWQ9XCJpbm5lclwiIG5ldz17dHJ1ZX0+XHJcbiAgICAgICAgU3Bhbi1Db21wLS1uZXdzXHJcbiAgICAgIDwvcD5cclxuICAgIDwvZGl2PlxyXG4gICk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIENvbXAoeyBudW0gfSkge1xyXG4gIGlmIChudW0gPT09IDEpIHJldHVybiBudWxsO1xyXG4gIHJldHVybiAoXHJcbiAgICA8ZGl2PlxyXG4gICAgICA8cD5jb21wPC9wPlxyXG4gICAgPC9kaXY+XHJcbiAgKTtcclxufVxyXG5cclxuY29uc3QgbWFya3VwMSA9IChudW06IGFueSkgPT4gKFxyXG4gIDxkaXYgaWQ9XCJvdXRlclwiIGRhdGEtZm9vPVwiYmFyXCIgZGF0YS12YXI9e251bX0+XHJcbiAgICA8aDM+c2hvdWxkIGdldCAyIC06IDM8L2gzPlxyXG4gICAge251bSA9PT0gMSA/IChcclxuICAgICAgPHVsIGNsYXNzPVwidWwtY2xhc3NcIj5cclxuICAgICAgICA8bGk+VGV4dCAxIDwvbGk+XHJcbiAgICAgICAgPGxpPlRleHQgMiA8L2xpPlxyXG4gICAgICA8L3VsPlxyXG4gICAgKSA6IChcclxuICAgICAgPHVsIGNsYXNzPVwidWwtY2xhc3NcIj5cclxuICAgICAgICA8bGk+VGV4dCAzIDwvbGk+XHJcbiAgICAgICAgPGxpPlRleHQgMiA8L2xpPlxyXG4gICAgICAgIDxsaT5UZXh0IDEgPC9saT5cclxuICAgICAgPC91bD5cclxuICAgICl9XHJcbiAgICA8aDM+c2hvdWxkIGdldCAzIC06IDI8L2gzPlxyXG4gICAge251bSA9PT0gMSA/IChcclxuICAgICAgPHVsIGNsYXNzPVwidWwtY2xhc3NcIj5cclxuICAgICAgICA8bGk+VGV4dCAxIDwvbGk+XHJcbiAgICAgICAgPGxpPlRleHQgMiA8L2xpPlxyXG4gICAgICAgIDxsaT5UZXh0IDMgPC9saT5cclxuICAgICAgPC91bD5cclxuICAgICkgOiAoXHJcbiAgICAgIDx1bCBjbGFzcz1cInVsLWNsYXNzXCI+XHJcbiAgICAgICAgPGxpPlRleHQgMSA8L2xpPlxyXG4gICAgICAgIDxsaT5UZXh0IDIgPC9saT5cclxuICAgICAgPC91bD5cclxuICAgICl9XHJcbiAgICB7bnVtID09PSAxID8gbnVsbCA6IDxwPm5ldyByZW5kZXI8L3A+fVxyXG4gICAgPGRpdj5cclxuICAgICAgPHNwYW4+c3Bhbi1jb250ZW50PC9zcGFuPlxyXG4gICAgPC9kaXY+XHJcbiAgICA8U3BhbiBtb2RlPXtudW19IC8+XHJcbiAgICB7Lypkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI29sZFwiKSovfVxyXG4gICAgPD5GcmFnbWVudC1pdGVtPC8+XHJcbiAgICA8c3ZnXHJcbiAgICAgIHZpZXdCb3g9XCIwIDAgMzAwIDEwMFwiXHJcbiAgICAgIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIlxyXG4gICAgICBzdHJva2U9XCJyZWRcIlxyXG4gICAgICBmaWxsPVwiZ3JleVwiXHJcbiAgICA+XHJcbiAgICAgIDxjaXJjbGUgY3g9XCI1MFwiIGN5PVwiNTBcIiByPVwiNDBcIiAvPlxyXG4gICAgICA8Y2lyY2xlIGN4PVwiMTUwXCIgY3k9XCI1MFwiIHI9XCI0XCIgLz5cclxuXHJcbiAgICAgIDxzdmcgdmlld0JveD1cIjAgMCAxMCAxMFwiIHg9XCIyMDBcIiB3aWR0aD1cIjEwMFwiPlxyXG4gICAgICAgIDxjaXJjbGUgY3g9XCI1XCIgY3k9XCI1XCIgcj1cIjRcIiAvPlxyXG4gICAgICA8L3N2Zz5cclxuICAgIDwvc3ZnPlxyXG4gIDwvZGl2PlxyXG4pO1xyXG5cclxuZnVuY3Rpb24gbWFya3VwMihudW06IGFueSkge1xyXG4gIHJldHVybiAoXHJcbiAgICA8ZGl2IGlkPVwib3V0ZXJcIj5cclxuICAgICAgPD5cclxuICAgICAgICA8PlxyXG4gICAgICAgICAgPHA+bmVzdGVkIGZyYWdtZW50PC9wPlxyXG4gICAgICAgIDwvPlxyXG4gICAgICA8Lz5cclxuICAgICAgPGgxPnN0YXRpYzwvaDE+XHJcbiAgICAgIDxoMT5keW5hbWljIHZhbDoge251bX08L2gxPlxyXG4gICAgICB7bnVtID09PSAxID8gPGgxPm9sZDwvaDE+IDogZmFsc2V9XHJcbiAgICAgIHtudW0gPT09IDEgPyAoXHJcbiAgICAgICAgPD5cclxuICAgICAgICAgIDxoMT5mcmFnIG9sZDwvaDE+XHJcbiAgICAgICAgICA8c3Bhbj5mcmFnIHNwYW4gb2xkPC9zcGFuPlxyXG4gICAgICAgIDwvPlxyXG4gICAgICApIDogKFxyXG4gICAgICAgIDxoMT5mcmFnIG5ldzwvaDE+XHJcbiAgICAgICl9XHJcbiAgICAgIDxDb21wIG51bT17bnVtfSAvPlxyXG4gICAgPC9kaXY+XHJcbiAgKTtcclxufVxyXG5mdW5jdGlvbiBOTCgpIHtcclxuICByZXR1cm4gbnVsbDtcclxufVxyXG5cclxuZnVuY3Rpb24gbWFya3VwMyhudW06IGFueSkge1xyXG4gIHJldHVybiBudW0gPT09IDEgPyAoXHJcbiAgICA8aDE+XHJcbiAgICAgIEEtTGluZSAxIC0ge251bX1cclxuICAgICAgPFNwYW4gbW9kZT17bnVtfSAvPlxyXG4gICAgICA8QnV0dG9uXHJcbiAgICAgICAgZGlzYWJsZWQ9e3RydWV9XHJcbiAgICAgICAgcmVmPXsoZWw6IEhUTUxFbGVtZW50KSA9PiBjb25zb2xlLmxvZyhcIm15IEJVVFRPTjo6cmVmOjo1XCIsIGVsKX1cclxuICAgICAgPlxyXG4gICAgICAgIHRleHRcclxuICAgICAgICA8cG9wdXAtaW5mb1xyXG4gICAgICAgICAgcmVmPXsoZWw6IEhUTUxFbGVtZW50KSA9PiBjb25zb2xlLmxvZyhcInNwYW4gaW4gQlVUVE9OOjpyZWY6OjZcIiwgZWwpfVxyXG4gICAgICAgID5cclxuICAgICAgICAgIGJsYVxyXG4gICAgICAgIDwvcG9wdXAtaW5mbz5cclxuICAgICAgICA8cD5pbm5lciBwIHtudW19PC9wPlxyXG4gICAgICA8L0J1dHRvbj5cclxuICAgICAgQS1MaW5lIDNcclxuICAgICAgPD5cclxuICAgICAgICA8cD5cclxuICAgICAgICAgIDxwPkEgRnJhZyBsaW5lIDEqPC9wPlxyXG4gICAgICAgIDwvcD5cclxuICAgICAgICA8cD5BIEZyYWcgbGluZSAyPC9wPlxyXG4gICAgICAgIDxwPkEgRnJhZyBsaW5lIDM8L3A+XHJcbiAgICAgICAgPHA+QSBGcmFnIGxpbmUgNDwvcD5cclxuICAgICAgICA8c3ZnXHJcbiAgICAgICAgICB2aWV3Qm94PVwiMCAwIDMwMCAxMDBcIlxyXG4gICAgICAgICAgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiXHJcbiAgICAgICAgICBzdHJva2U9XCJyZWRcIlxyXG4gICAgICAgICAgZmlsbD1cImdyZXlcIlxyXG4gICAgICAgID5cclxuICAgICAgICAgIDxjaXJjbGUgY3g9XCI1MFwiIGN5PVwiNTBcIiByPVwiNDBcIiAvPlxyXG4gICAgICAgICAgPGNpcmNsZSBjeD1cIjE1MFwiIGN5PVwiNTBcIiByPVwiNFwiIC8+XHJcblxyXG4gICAgICAgICAgPHN2ZyB2aWV3Qm94PVwiMCAwIDEwIDEwXCIgeD1cIjIwMFwiIHdpZHRoPVwiMTAwXCI+XHJcbiAgICAgICAgICAgIDxjaXJjbGUgY3g9XCI1XCIgY3k9XCI1XCIgcj1cIjRcIiAvPlxyXG4gICAgICAgICAgPC9zdmc+XHJcbiAgICAgICAgPC9zdmc+XHJcbiAgICAgIDwvPlxyXG4gICAgICB7bnVsbH1cclxuICAgIDwvaDE+XHJcbiAgKSA6IChcclxuICAgIDxoMSBjbGFzcz1cImFcIiByZWY9e2NvbnNvbGUuaW5mb30+XHJcbiAgICAgIEIgTGluZSAxIC0ge251bX1cclxuICAgICAgPFNwYW4gbW9kZT17bnVtfSAvPlxyXG4gICAgICA8QnV0dG9uXHJcbiAgICAgICAgZGlzYWJsZWQ9e3RydWV9XHJcbiAgICAgICAgcmVmPXsoZWw6IEhUTUxFbGVtZW50KSA9PiBjb25zb2xlLmxvZyhcIm15IEJVVFRPTjo6cmVmOjo1XCIsIGVsKX1cclxuICAgICAgPlxyXG4gICAgICAgIHRleHRcclxuICAgICAgICA8cG9wdXAtaW5mb1xyXG4gICAgICAgICAgcmVmPXsoZWw6IEhUTUxFbGVtZW50KSA9PiBjb25zb2xlLmxvZyhcInNwYW4gaW4gQlVUVE9OOjpyZWY6OjZcIiwgZWwpfVxyXG4gICAgICAgID5cclxuICAgICAgICAgIGJsYVxyXG4gICAgICAgIDwvcG9wdXAtaW5mbz5cclxuICAgICAgICA8cD57bnVtfTwvcD5cclxuICAgICAgPC9CdXR0b24+XHJcbiAgICAgIDw+XHJcbiAgICAgICAge2ZhbHNlfVxyXG4gICAgICAgIHtudWxsfVxyXG4gICAgICAgIHt1bmRlZmluZWR9XHJcbiAgICAgIDwvPlxyXG4gICAgICA8PlxyXG4gICAgICAgIDxwPkIgRnJhZyBsaW5lIDE8L3A+XHJcbiAgICAgICAgPHA+QiBGcmFnIGxpbmUgMjwvcD5cclxuICAgICAgICB7dW5kZWZpbmVkfVxyXG4gICAgICAgIDxwPkIgRnJhZyBsaW5lIDMoNCk8L3A+XHJcbiAgICAgICAgPHN2Z1xyXG4gICAgICAgICAgdmlld0JveD1cIjAgMCAzMDAgMTAwXCJcclxuICAgICAgICAgIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIlxyXG4gICAgICAgICAgc3Ryb2tlPVwicmVkXCJcclxuICAgICAgICAgIGZpbGw9XCJncmV5XCJcclxuICAgICAgICA+XHJcbiAgICAgICAgICA8Y2lyY2xlIGN4PVwiNTBcIiBjeT1cIjUwXCIgcj1cIjQwXCIgLz5cclxuICAgICAgICAgIDxjaXJjbGUgY3g9XCIxNTBcIiBjeT1cIjUwXCIgcj1cIjRcIiAvPlxyXG5cclxuICAgICAgICAgIDxzdmcgdmlld0JveD1cIjAgMCAxMCAxMFwiIHg9XCIyMDBcIiB3aWR0aD1cIjEwMFwiPlxyXG4gICAgICAgICAgICA8Y2lyY2xlIGN4PVwiNVwiIGN5PVwiNVwiIHI9XCI2XCIgLz5cclxuICAgICAgICAgIDwvc3ZnPlxyXG4gICAgICAgIDwvc3ZnPlxyXG4gICAgICAgIDxwPkIgRnJhZyBsaW5lIDQoNik8L3A+XHJcbiAgICAgIDwvPlxyXG4gICAgPC9oMT5cclxuICApO1xyXG59XHJcbmNvbnN0IG9iaiA9IHsgYTogMSB9O1xyXG5cclxuZnVuY3Rpb24gbWFya3VwNChudW06IGFueSkge1xyXG4gIG9iai5hID0gbnVtO1xyXG4gIHJldHVybiBudW0gPT09IDEgPyAoXHJcbiAgICA8aDEgb2JqPXtvYmp9IGlkPXtvYmouYX0+XHJcbiAgICAgIG9sZC1IZWFkbGluZSB7bnVtfVxyXG4gICAgPC9oMT5cclxuICApIDogKFxyXG4gICAgPGgxIG9iaj17b2JqfSBjbGFzcz1cImFcIiBpZD17b2JqLmF9PlxyXG4gICAgICBuZXctSGVhZGxpbmUge251bX1cclxuICAgIDwvaDE+XHJcbiAgKTtcclxufVxyXG5cclxuZnVuY3Rpb24gbWFya3VwKG51bTogYW55KSB7XHJcbiAgcmV0dXJuIG51bSA9PT0gMSA/IChcclxuICAgIDxkaXY+XHJcbiAgICAgIDw+XHJcbiAgICAgICAgPHA+ZnJhZyAtIEk8L3A+XHJcbiAgICAgICAgPGI+IGZyYWcgLSBJSTwvYj5cclxuICAgICAgPC8+XHJcbiAgICA8L2Rpdj5cclxuICApIDogKFxyXG4gICAgPGgxIGNsYXNzPVwiYVwiPlxyXG4gICAgICB7XCJuZXctSGVhZGxpbmVcIn0ge251bX1cclxuICAgIDwvaDE+XHJcbiAgKTtcclxufVxyXG5cclxuZnVuY3Rpb24gbWFya3VwNShudW06IGFueSkge1xyXG4gIHJldHVybiBudW0gPT09IDEgPyAoXHJcbiAgICA8ZGl2PlxyXG4gICAgICB7cmF3SHRtbChgPGRpdiBjbGFzcz1cImtcIj50eHQ8L2Rpdj48aW5wdXQgdHlwZT1yYWRpb1wiIC8+YCl9XHJcbiAgICAgIDxDb21wMyAvPlxyXG4gICAgICB7ZWx9XHJcbiAgICA8L2Rpdj5cclxuICApIDogKFxyXG4gICAgPGRpdj5cclxuICAgICAge3Jhd0h0bWwoYDxkaXYgY2xhc3M9XCJrXCI+dHh0PC9kaXY+PGlucHV0IHR5cGU9cmFkaW9cIiAvPmApfVxyXG4gICAgICB7bnVsbH1cclxuICAgICAge2VsfVxyXG4gICAgPC9kaXY+XHJcbiAgKTtcclxufVxyXG5cclxuZnVuY3Rpb24gbWFya3VwNihhKSB7XHJcbiAgcmV0dXJuIChcclxuICAgIDxkaXY+XHJcbiAgICAgIDxzdmcgaWQ9XCJmb282XCIgdmlld0JveD1cIjAgMCAxMCAxMFwiIHg9XCIyMDBcIiB3aWR0aD1cIjEwMFwiPlxyXG4gICAgICAgIDw+XHJcbiAgICAgICAgICB7YSAmJiA8Y2lyY2xlIGN4PVwiNVwiIGN5PVwiNVwiIHI9XCI2XCIgLz59XHJcbiAgICAgICAgPC8+XHJcbiAgICAgIDwvc3ZnPlxyXG4gICAgICA8YnV0dG9uPnN1Ym1pdDwvYnV0dG9uPlxyXG4gICAgPC9kaXY+XHJcbiAgKTtcclxufVxyXG5cclxuLy9jb25zb2xlLmxvZyhtYXJrdXApO1xyXG4vL3dpbmRvdy5tYXJrdXAgPSBtYXJrdXA7XHJcblxyXG5jbGFzcyBQb3BVcEluZm8gZXh0ZW5kcyBIVE1MRWxlbWVudCB7XHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAvLyBBbHdheXMgY2FsbCBzdXBlciBmaXJzdCBpbiBjb25zdHJ1Y3RvclxyXG4gICAgc3VwZXIoKTtcclxuXHJcbiAgICAvLyB3cml0ZSBlbGVtZW50IGZ1bmN0aW9uYWxpdHkgaW4gaGVyZVxyXG5cclxuICAgIGNvbnNvbGUubG9nKFwiIyMjIyMjIyMjIyMjIyMjIyNjdG9yIENFXCIpO1xyXG4gIH1cclxuXHJcbiAgY29ubmVjdGVkQ2FsbGJhY2soKSB7XHJcbiAgICBjb25zb2xlLmxvZyhcIiMjIyMjIyMjIyMjIyMjIyMjQ3VzdG9tIHNxdWFyZSBlbGVtZW50IGFkZGVkIHRvIHBhZ2UuXCIpO1xyXG4gIH1cclxufVxyXG5cclxuY3VzdG9tRWxlbWVudHMuZGVmaW5lKFwicG9wdXAtaW5mb1wiLCBQb3BVcEluZm8pO1xyXG5cclxuLy9kb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI29sZFwiKSEuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGNvbnNvbGUubG9nKTtcclxuXHJcbi8vZG9jdW1lbnQuYm9keS5pbm5lckhUTUwgPSBtYXJrdXA7XHJcbi8vLy9yZW5kZXIobWFya3VwMygxKSwgZG9jdW1lbnQuYm9keSk7XHJcbi8vZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJvdXRlclwiKT8uc2V0QXR0cmlidXRlKFwiZGF0YS1mb29cIiwgXCJtb2RcIik7XHJcblxyXG4vL2RvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaW5uZXJcIik/LnNldEF0dHJpYnV0ZShcImRhdGEtZm9vXCIsIFwibW9kXCIpO1xyXG4vL3JlbmRlcihtYXJrdXAoMiksIGRvY3VtZW50LmJvZHkpO1xyXG4vL3JlbmRlcihtYXJrdXAsIGRvY3VtZW50LmJvZHksIHRydWUpO1xyXG5jb25zdCBlbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjb2xkXCIpO1xyXG5mdW5jdGlvbiBDb21wMigpIHtcclxuICByZXR1cm4gKFxyXG4gICAgPD5cclxuICAgICAge3Jhd0h0bWwoYDxkaXYgY2xhc3M9XCJrXCI+dHh0PC9kaXY+PGlucHV0IHR5cGU9cmFkaW9cIiAvPmApfVxyXG4gICAgICA8Q29tcDMgLz5cclxuICAgICAge2VsfVxyXG4gICAgPC8+XHJcbiAgKTtcclxufVxyXG5mdW5jdGlvbiBDb21wMygpIHtcclxuICByZXR1cm4gPGRpdj5jb21wIGNvbnRlbnQ8L2Rpdj47XHJcbn1cclxuXHJcbmNvbnN0ICRjb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNvbnRhaW5lclwiKTtcclxuXHJcbndpbmRvdy5yZVJlbmRlcjEgPSAoKSA9PiByZW5kZXIobWFya3VwMygxKSwgJGNvbnRhaW5lcik7XHJcbndpbmRvdy5yZVJlbmRlcjIgPSAoKSA9PiByZW5kZXIobWFya3VwMygyKSwgJGNvbnRhaW5lcik7XHJcbndpbmRvdy5yZVJlbmRlcjMgPSAoKSA9PlxyXG4gIHJlbmRlcihcclxuICAgIC8vIDxkaXY+dHh0PC9kaXY+XHJcbiAgICA8Q29tcDIgLz4sXHJcbiAgICAkY29udGFpbmVyXHJcbiAgKTtcclxuXHJcbmNvbnNvbGUubG9nKFwiMTIzNDVcIik7XHJcbndpbmRvdy5zcyA9ICgpID0+IG1hcmt1cDMoMSkgKyBcIlwiO1xyXG53aW5kb3cuc3MyID0gKCkgPT4ge1xyXG4gIGNvbnNvbGUubG9nKG1hcmt1cDMoMSkpO1xyXG5cclxuICAvL2RvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY29udGFpbmVyXCIpLmlubmVySFRNTCA9IG1hcmt1cDMoMSk7XHJcbn07XHJcblxyXG53aW5kb3cucmVSZW5kZXI1YSA9ICgpID0+IHJlbmRlcihtYXJrdXA1KDEpLCAkY29udGFpbmVyKTtcclxud2luZG93LnJlUmVuZGVyNWIgPSAoKSA9PiByZW5kZXIobWFya3VwNSgyKSwgJGNvbnRhaW5lcik7XHJcblxyXG5mdW5jdGlvbiBtYXJrdXA3KG1vZCkge1xyXG4gIGlmIChtb2QgPT09IDEpIHtcclxuICAgIHJldHVybiAoXHJcbiAgICAgIDxkaXY+XHJcbiAgICAgICAgPEJ1dHRvbj5cclxuICAgICAgICAgIDxzcGFuPnRleHQ8L3NwYW4+XHJcbiAgICAgICAgICA8c3Bhbj4sIG1vcmUgdGV4dDwvc3Bhbj5cclxuICAgICAgICA8L0J1dHRvbj5cclxuICAgICAgPC9kaXY+XHJcbiAgICApO1xyXG4gIH0gZWxzZSBpZiAobW9kID09PSAyKSB7XHJcbiAgICByZXR1cm4gPGRpdj5zb21lIGNvbnRlbnQ8L2Rpdj47XHJcbiAgfSBlbHNlIHtcclxuICAgIHJldHVybiA8ZGl2PntmYWxzZX08L2Rpdj47XHJcbiAgfVxyXG59XHJcblxyXG53aW5kb3cucmVSZW5kZXJSZWYgPSAoKSA9PlxyXG4gIHJlbmRlcihcclxuICAgIDxoMiBjbGFzcz1cImFcIiByZWY9e2NvbnNvbGUud2Fybn0+XHJcbiAgICAgIEhlYWRpbmcgd2l0aCByZWZcclxuICAgIDwvaDI+LFxyXG4gICAgJGNvbnRhaW5lclxyXG4gICk7XHJcbndpbmRvdy5yZVJlbmRlcjZhID0gKCkgPT4gcmVuZGVyKG1hcmt1cDYodHJ1ZSksICRjb250YWluZXIpO1xyXG53aW5kb3cucmVSZW5kZXI2YiA9ICgpID0+XHJcbiAgcmVuZGVyKDxjaXJjbGUgY3g9XCI1XCIgY3k9XCI1XCIgcj1cIjZcIiAvPiwgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJmb282XCIpKTtcclxud2luZG93LnJlUmVuZGVyU3ZnID0gKCkgPT4gcmVuZGVyKG1hcmt1cDEoKSwgJGNvbnRhaW5lcik7XHJcbndpbmRvdy5yZVJlbmRlclN2ZzIgPSAoKSA9PiByZW5kZXIobWFya3VwMSgpLCAkY29udGFpbmVyKTtcclxud2luZG93LnJlUmVuZGVyN18xID0gKCkgPT4gcmVuZGVyKG1hcmt1cDcoMSksICRjb250YWluZXIpO1xyXG53aW5kb3cucmVSZW5kZXI3XzIgPSAoKSA9PiByZW5kZXIobWFya3VwNygyKSwgJGNvbnRhaW5lcik7XHJcbndpbmRvdy5yZVJlbmRlcjdfMyA9ICgpID0+IHJlbmRlcihtYXJrdXA3KDMpLCAkY29udGFpbmVyKTtcclxuIl0sInNvdXJjZVJvb3QiOiIifQ==