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

// private key for calling the `ref` callers
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


function asNode(tag, props, children) {
  console.log("asNode()", {
    tag,
    props,
    children
  }); // shouldn't

  if (typeof tag === "function") {
    console.error("shouldn't reach this in vTree mode"); // expecting the tag function to return jsx.
    // here it will also work when it returns HTMLElement

    let result = tag(props);
    let jsxNodes = [];

    if (result instanceof JsxNode) {
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

  const childJsxNodes = children.filter(child => child instanceof JsxNode);
  console.log({
    children
  });
  node.append(...children.flat() //.filter(truthy)
  .filter(child => child.tag !== "__NULL__").map(child => child.asNode()));
  /*node.append(
    ...children
      .flat()
      .filter(truthy)
      .map((child) =>
        child instanceof Node
          ? console.warn("node") || child // warn
          : child instanceof JsxNode
          ? child.asNode()
          : console.warn("text") || child
      )
  );*/
  // svg element and all its children were rendered, reset the svg context

  if (svgContextSet) svgContext = false;
  return [node, childJsxNodes];
}

function asVNode(tag, props) {
  if (typeof tag === "function") {
    let result = tag(props);

    if (result instanceof JsxNode) {
      return result.asVNode();
    }

    if (result instanceof Node) {
      const node = {
        tag: "__NODE__",
        parent: null,
        props: {
          content: result
        },
        children: [],

        asNode() {
          node.node = result;
          return result;
        },

        diffAndPatch() {
          console.log("__NODE__ 1 diffAndPatch", result);
        }

      };
      return node;
    }

    if (!truthy(result)) {
      const fooNode = {};
      Object.assign(fooNode, {
        tag: "__NULL__",
        tag2: "tag func returned null node",
        node: null,
        parent: null,
        props: {},
        children: [],

        asNode() {
          return null;
        },

        diffAndPatch(newNode) {
          if (newNode.tag === "__NULL__") return;
          const n = newNode.asNode(); // @TODO: find item before
          //vNode.node

          const newNodeIndex = newNode.parent.children.indexOf(newNode);
          const siblings = newNode.parent.children.slice(0, newNodeIndex).reverse();
          const siblingBefore = siblings.find(n => n.node);

          if (siblingBefore) {
            if (n) siblingBefore.node.insertAdjacentElement("afterend", n);
          } else {
            fooNode.parent.node.insertAdjacentElement("afterbegin", n);
            /*(newNode.parent.node as HTMLElement).insertAdjacentElement(
              "afterbegin",
              newNode.asNode()
            );*/
          }
        }

      });
      return fooNode;
    }

    const node = {
      tag: "__TEXT_NODE__",
      tag1: 1,
      node: null,
      parent: null,
      props: {
        content: result
      },
      children: [],

      asNode() {
        const textNode = document.createTextNode(result);
        node.node = textNode;
        return textNode;
      },

      diffAndPatch(newNode) {
        console.log("__TEXT_NODE__ 1 diffAndPatch", result, newNode.props.content); // @TODO both text

        if (result !== newNode.props.content) node.node.nodeValue = newNode.props.content; // else ?
      }

    };
    return node;
  }

  const {
    children,
    ...attr
  } = props;
  const vNode = {};
  Object.assign(vNode, {
    tag,
    tag2: "asVNode - normal return",
    node: null,
    props: attr,
    children: children.flat().map(child => {
      if (child instanceof JsxNode) {
        const childVNode = child.asVNode();
        childVNode.parent = vNode;
        return childVNode;
      }

      if (child instanceof Node) {
        const node = {
          tag: "__NODE__",
          props: {
            content: child
          },
          parent: vNode,
          children: [],

          asNode() {
            node.node = child;
            return child;
          },

          diffAndPatch() {
            console.log("__NODE__ diffAndPatch", child);
          }

        };
        return node;
      }

      console.log({
        child
      });

      if (child === null || child === false || child === undefined) {
        const childVNode = {
          tag: "__NULL__",
          tag2: "children null node",
          node: null,
          parent: vNode,
          props: {},
          children: [],

          asNode() {
            return null;
          },

          diffAndPatch(newNode) {
            console.log("diff-AndPatch, child node was null", newNode);
            if (newNode.tag === "__NULL__") return;
            const n = newNode.asNode(); // @TODO: find item before
            //vNode.node

            const newNodeIndex = newNode.parent.children.indexOf(newNode);
            const siblings = newNode.parent.children.slice(0, newNodeIndex).reverse();
            const siblingBefore = siblings.find(n => n.node);
            console.log({
              siblingBefore,
              siblings,
              newNodeIndex,
              newNode
            });

            if (siblingBefore) {
              siblingBefore.node.insertAdjacentElement("afterend", n);
            } else {
              vNode.node.insertAdjacentElement("afterbegin", n);
              /*(newNode.parent.node as HTMLElement).insertAdjacentElement(
                "afterbegin",
                newNode.asNode()
              );*/
            }
          }

        };
        return childVNode;
      }

      console.log(":::", {
        child
      });
      const node = {
        tag: "__TEXT_NODE__",
        tag2: "children Text node",
        node: null,
        parent: vNode,
        props: {
          content: child
        },
        children: [],

        asNode() {
          const textNode = document.createTextNode(child);
          node.node = textNode;
          console.log(textNode, node);
          return textNode;
        },

        // top level vnode
        diffAndPatch(newNode) {
          // @TODO both text?
          console.log("change? ", newNode.tag, node.tag);

          if (newNode.tag !== node.tag) {
            const asNode = newNode.asNode();
            console.log({
              asNode
            });

            if (asNode) {
              node.node.replaceWith(asNode);
            } else {
              node.node.parentNode.removeChild(node.node);
            }

            return;
          }

          if (child !== newNode.props.content) node.node.nodeValue = newNode.props.content;
          newNode.node = node.node; // else ?
        }

      };
      return node;
    }),

    asNode() {
      console.log("asVNode.asNode", {
        tag,
        props,
        vNode
      });
      const node = asNode(tag, attr, vNode.children)[0];
      vNode.node = node;
      return node;
    },

    // to level
    diffAndPatch(newVNode) {
      console.log("diffAndPatch"); // ? when?

      if (!newVNode) {
        vNode.node.parentNode.removeChild(vNode.node);
        return;
      }

      if (newVNode.tag !== tag) {
        const newNode = newVNode.asNode();

        if (vNode.node) {
          if (newNode) vNode.node.replaceWith(newNode);else vNode.node.parentNode.removeChild(vNode.node);
        }

        return;
      } // @TODO: if special tags
      // update props form new node


      Object.entries(newVNode.props).filter(([k, v]) => props[k] !== v).forEach(([key, value]) => {
        if (value === true) vNode.node.setAttribute(key, "");else if (value === null || value === undefined || value === false) vNode.node.removeAttribute(key);else vNode.node.setAttribute(key, value);
      }); // remove old, obsolate attributes

      Object.entries(vNode.props).filter(([k, v]) => !newVNode.props.hasOwnProperty(k)).forEach(([key, value]) => {
        vNode.node.removeAttribute(key);
      });
      newVNode.node = vNode.node;
      console.log("node update", newVNode, vNode); // @TODO: props not attributes
      // children

      vNode.children.forEach((child, ix) => child.diffAndPatch(newVNode.children[ix])); // @TODO: new children

      for (let i = vNode.children.length; i < newVNode.children.length; i++) {
        vNode.node.insertAdjacentElement("beforeend", newVNode.children[i].asNode());
      }
    }

  });
  return vNode;
}
/**
 * converts pragma object to html string
 * jsxs is always called when element has more than one child
 *
 * @param {string | Function} tag - tag name or tag class
 * @param {Object | null} props - props for the tag
 */


function jsxs(tag, props) {
  let node;
  let jsxNodes;
  props.children = props.children.flat(); // @TODO: doc
  // if ref prop is provided, memorize and remove from the html generation process

  const ref = typeof props.ref === "function" ? props.ref : null;
  if (ref) delete props.ref;
  return new class extends JsxNode {
    toString() {
      return asHtmlString(tag, this.props);
    }

    asNode() {
      [node, jsxNodes] = asNode(tag, this.props);
      return node;
    }

    asVNode() {
      return asVNode(tag, this.props);
    }

    [_callRefs]() {
      if (ref && node) ref(node);

      if (typeof tag === "function") {
        jsxNodes.forEach(nodeItem => nodeItem[_callRefs]());
      } else if (this.props.children) {
        this.props.children.flat().filter(child => child instanceof JsxNode).forEach(child => child[_callRefs]());
      }
    }

  }(props);
}
/**
 * converts the fragments object to nodes
 *
 * @param {Object} props
 * @param {Array} props.children - child elements in the fragment
 */

function Fragment(props) {
  return new class extends JsxNode {
    toString() {
      return this.props.children.flat().filter(truthy).map(child => child instanceof Node ? getOuterHtml(child) : typeof child === "object" ? child.toString() : sanitize(child)).join("");
    }

    asNode() {
      const fragments = this.props.children.flat().filter(truthy).map(item => item instanceof Node ? item : item instanceof JsxNode ? item.asNode() : item);
      const documentFragment = document.createDocumentFragment();
      documentFragment.append(...fragments);
      return documentFragment;
    }

    asVNode() {
      return asVNode("__Fragment__", {
        children: props.children
      });
    }

    [_callRefs]() {
      this.props.children.filter(child => child instanceof JsxNode).forEach(child => child[_callRefs]());
    }

  }(props);
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
  Array.from(document.body.querySelectorAll("*")).forEach(el => el.style.outline = "1px dashed red");
  Array.from(document.body.querySelectorAll("*")).forEach(el => el.style.background = "pink");
  const isReRender = renderedVTrees.has(domNode);
  if (!append && !isReRender) domNode.innerHTML = "";

  if (typeof markup === "string") {
    domNode.insertAdjacentHTML("afterbegin", markup);
  } else if (markup instanceof Node) {
    domNode.insertAdjacentElement("afterbegin", markup);
  } else if (markup instanceof JsxNode) {
    svgContext = false;
    const vTree = markup.asVNode();
    console.log("vTree:", vTree);

    if (isReRender) {
      console.log("is re-render");
      const oldVTree = renderedVTrees.get(domNode);
      console.log({
        oldVTree,
        newVTree: vTree
      }); // diff

      oldVTree.diffAndPatch(vTree);
      renderedVTrees.set(domNode, vTree);
      return;
    }

    renderedVTrees.set(domNode, vTree);
    const content = vTree.asNode();
    domNode.append(content); ////markup[_callRefs]();
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




var _document$getElementB;

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
      children: "a"
    }), children, Object(C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["Fragment"], {
      children: Object(C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("span", {
        ref: function ref(el) {
          return console.log("my a ::ref::3", el);
        },
        children: "a"
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

function markup(num) {
  return Object(C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])("div", {
    id: "outer",
    children: [Object(C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("h1", {
      children: "static"
    }), Object(C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])("h1", {
      children: ["dynamic val: ", num]
    }), num === 1 ? Object(C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("h1", {
      children: "old"
    }) : false, num === 1 ? Object(C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])(C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["Fragment"], {
      children: [Object(C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("h1", {
        children: "frag old"
      }), Object(C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("span", {
        children: "f sp old"
      })]
    }) : Object(C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["Fragment"], {
      children: Object(C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("h1", {
        children: "frag new"
      })
    }), Object(C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(Comp, {
      num: num
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

customElements.define("popup-info", PopUpInfo);
document.querySelector("#old").addEventListener("click", console.log); //document.body.innerHTML = markup;

Object(C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["render"])(markup(1), document.body);
(_document$getElementB = document.getElementById("outer")) === null || _document$getElementB === void 0 ? void 0 : _document$getElementB.setAttribute("data-foo", "mod"); //document.getElementById("inner")?.setAttribute("data-foo", "mod");
//render(markup(2), document.body);
//render(markup, document.body, true);

window.reRender1 = function () {
  return Object(C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["render"])(markup(1), document.body);
};

window.reRender2 = function () {
  return Object(C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["render"])(markup(2), document.body);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vanN4L2pzeC1ydW50aW1lLnRzIiwid2VicGFjazovLy8uL21haW4udHN4Il0sIm5hbWVzIjpbInJlbmRlcmVkVlRyZWVzIiwiV2Vha01hcCIsIkpzeE5vZGUiLCJjb25zdHJ1Y3RvciIsInByb3BzIiwiX2NhbGxSZWZzIiwiU3ltYm9sIiwic3ZnQ29udGV4dCIsInRydXRoeSIsInZhbHVlIiwidW5kZWZpbmVkIiwic2FuaXRpemUiLCJ0ZXh0IiwiZGl2IiwiZG9jdW1lbnQiLCJjcmVhdGVFbGVtZW50IiwiaW5uZXJUZXh0IiwiaW5uZXJIVE1MIiwiZ2V0T3V0ZXJIdG1sIiwiZWxlbWVudCIsIkVsZW1lbnQiLCJvdXRlckhUTUwiLCJUZXh0Iiwid2hvbGVUZXh0IiwiRG9jdW1lbnRGcmFnbWVudCIsIkFycmF5IiwiZnJvbSIsImNoaWxkTm9kZXMiLCJtYXAiLCJlbCIsImpvaW4iLCJjb25zb2xlIiwid2FybiIsImFzSHRtbFN0cmluZyIsInRhZyIsInRvU3RyaW5nIiwiY2hpbGRyZW4iLCJhdHRycyIsImF0dHJpYnV0ZXMiLCJPYmplY3QiLCJlbnRyaWVzIiwiZmlsdGVyIiwia2V5IiwidiIsImsiLCJpc0FycmF5IiwiY29udGVudCIsImNoaWxkIiwiTm9kZSIsImFzTm9kZSIsImxvZyIsImVycm9yIiwicmVzdWx0IiwianN4Tm9kZXMiLCJmb3JFYWNoIiwic3RhcnRzV2l0aCIsImV2ZW50IiwicmVwbGFjZSIsImFkZEV2ZW50TGlzdGVuZXIiLCJzdmdDb250ZXh0U2V0Iiwibm9kZSIsImNyZWF0ZUVsZW1lbnROUyIsIl9rZXkiLCJzZXRBdHRyaWJ1dGUiLCJTdHJpbmciLCJjaGlsZEpzeE5vZGVzIiwiYXBwZW5kIiwiZmxhdCIsImFzVk5vZGUiLCJwYXJlbnQiLCJkaWZmQW5kUGF0Y2giLCJmb29Ob2RlIiwiYXNzaWduIiwidGFnMiIsIm5ld05vZGUiLCJuIiwibmV3Tm9kZUluZGV4IiwiaW5kZXhPZiIsInNpYmxpbmdzIiwic2xpY2UiLCJyZXZlcnNlIiwic2libGluZ0JlZm9yZSIsImZpbmQiLCJpbnNlcnRBZGphY2VudEVsZW1lbnQiLCJ0YWcxIiwidGV4dE5vZGUiLCJjcmVhdGVUZXh0Tm9kZSIsIm5vZGVWYWx1ZSIsImF0dHIiLCJ2Tm9kZSIsImNoaWxkVk5vZGUiLCJyZXBsYWNlV2l0aCIsInBhcmVudE5vZGUiLCJyZW1vdmVDaGlsZCIsIm5ld1ZOb2RlIiwicmVtb3ZlQXR0cmlidXRlIiwiaGFzT3duUHJvcGVydHkiLCJpeCIsImkiLCJsZW5ndGgiLCJqc3hzIiwicmVmIiwibm9kZUl0ZW0iLCJGcmFnbWVudCIsImZyYWdtZW50cyIsIml0ZW0iLCJkb2N1bWVudEZyYWdtZW50IiwiY3JlYXRlRG9jdW1lbnRGcmFnbWVudCIsImpzeCIsInJlbmRlciIsIm1hcmt1cCIsImRvbU5vZGUiLCJib2R5IiwicXVlcnlTZWxlY3RvckFsbCIsInN0eWxlIiwib3V0bGluZSIsImJhY2tncm91bmQiLCJpc1JlUmVuZGVyIiwiaGFzIiwiaW5zZXJ0QWRqYWNlbnRIVE1MIiwidlRyZWUiLCJvbGRWVHJlZSIsImdldCIsIm5ld1ZUcmVlIiwic2V0IiwiRXJyb3IiLCJyYXdIdG1sIiwidGVtcGxhdGUiLCJ4c3MiLCJSVEUiLCJ0eHQiLCJCdXR0b24iLCJkaXNhYmxlZCIsInJlZmxvZyIsIlNwYW4iLCJtb2RlIiwiQ29tcCIsIm51bSIsIm1hcmt1cDEiLCJQb3BVcEluZm8iLCJIVE1MRWxlbWVudCIsImN1c3RvbUVsZW1lbnRzIiwiZGVmaW5lIiwicXVlcnlTZWxlY3RvciIsImdldEVsZW1lbnRCeUlkIiwid2luZG93IiwicmVSZW5kZXIxIiwicmVSZW5kZXIyIl0sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztR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QUFzQixZQUF0QixFQUFvQ0gsU0FBcEM7QUFFQTdILFFBQVEsQ0FBQ2lJLGFBQVQsQ0FBdUIsTUFBdkIsRUFBZ0NyRixnQkFBaEMsQ0FBaUQsT0FBakQsRUFBMEQzQixPQUFPLENBQUNtQixHQUFsRSxFLENBRUE7O0FBQ0EyRCxtRkFBTSxDQUFDQyxNQUFNLENBQUMsQ0FBRCxDQUFQLEVBQVloRyxRQUFRLENBQUNrRyxJQUFyQixDQUFOO0FBQ0EseUJBQUFsRyxRQUFRLENBQUNrSSxjQUFULENBQXdCLE9BQXhCLGlGQUFrQ2pGLFlBQWxDLENBQStDLFVBQS9DLEVBQTJELEtBQTNELEUsQ0FFQTtBQUNBO0FBQ0E7O0FBR0FrRixNQUFNLENBQUNDLFNBQVAsR0FBbUI7QUFBQSxTQUFNckMsbUZBQU0sQ0FBQ0MsTUFBTSxDQUFDLENBQUQsQ0FBUCxFQUFZaEcsUUFBUSxDQUFDa0csSUFBckIsQ0FBWjtBQUFBLENBQW5COztBQUNBaUMsTUFBTSxDQUFDRSxTQUFQLEdBQW1CO0FBQUEsU0FBTXRDLG1GQUFNLENBQUNDLE1BQU0sQ0FBQyxDQUFELENBQVAsRUFBWWhHLFFBQVEsQ0FBQ2tHLElBQXJCLENBQVo7QUFBQSxDQUFuQixDIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMCk7XG4iLCJjb25zdCByZW5kZXJlZFZUcmVlcyA9IG5ldyBXZWFrTWFwPEhUTUxFbGVtZW50LCBWTm9kZT4oKTtcclxuLyoqXHJcbiAqIHByb3ZpZGVzIGZ1bmN0aW9ucyBuZWVkZWQgYnkgYmFiZWwgZm9yIGEgY3VzdG9tIHByYWdtYVxyXG4gKiB0byByZW5kZXIgcGFyc2VkIGpzeCBjb2RlIHRvIGh0bWxcclxuICovXHJcblxyXG4vLyBwcm9wcyB3aGljaCB3aWxsIGJlIHJlbmRlcmVkIGFzIGF0dHJpYnV0ZXNcclxuLy8gRnVuY3Rpb25zIHdpbGwgYmUgdXNlZCBmb3IgZXZlbnQgbGlzdGVuZXJzLiAod2l0aCBhdHRyaWJ1dGUgbmFtZSBzdGFydGluZyB3aXRoICdvbi0nKVxyXG50eXBlIEF0dHJpYnV0ZXMgPSB7IFtrZXk6IHN0cmluZ106IHN0cmluZyB8IGJvb2xlYW4gfCBudW1iZXIgfCBGdW5jdGlvbiB9O1xyXG5cclxuLy8gYWRkaXRpb25hbCBhdHRyaWJ1dGVzIHdoaWNoIGNhbiBoYXZlIGFkZGl0aW9uYWwgc2VyaWFsaXphdGlvbiBiZWZvcmUgcmVuZGVyaW5nIGFzIGF0dHJpYnV0ZXNcclxudHlwZSBTcGVjaWFsQXR0cmlidXRlcyA9IHtcclxuICBjbGFzcz86IHN0cmluZyB8IHN0cmluZ1tdO1xyXG4gIHN0eWxlPzogc3RyaW5nIHwgeyBba2V5OiBzdHJpbmddOiBzdHJpbmcgfTtcclxuICByZWY/OiBGdW5jdGlvbjtcclxufTtcclxuXHJcbi8vIGNoaWxkIGVsZW1lbnRzIGluIHRoZSBqc3ggbWFya3VwIHdoaWNoIHdpbGwgYmUgcGFzc2VkIHRvIHRoZSBoIGZ1bmN0aW9uIGFzIGBwcm9wcy5jaGlsZHJlbmBcclxudHlwZSBDaGlsZHJlblByb3BzID0ge1xyXG4gIC8vIG5lc3RlZCBhcnJheSBpbiBjYXNlIG9mXHJcbiAgLy8gPGVsZW0+XHJcbiAgLy8gICA8c3Bhbi8+XHJcbiAgLy8gICB7Y2hpbGRyZW59XHJcbiAgLy8gICA8ZGl2Lz5cclxuICAvLyA8L2VsZW0+XHJcbiAgY2hpbGRyZW46IEFycmF5PFxyXG4gICAgTm9kZSB8IEpzeE5vZGVJbnRlcmZhY2UgfCBzdHJpbmcgfCBBcnJheTxOb2RlIHwgSnN4Tm9kZUludGVyZmFjZSB8IHN0cmluZz5cclxuICA+O1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIHByb3BzIG9iamVjdCB3aGljaCB3aWxsIGJlIHBhc3NlZCB0byBqc3ggcHJhZ21hIGFuZCBjdXN0b20gY29tcG9uZW50IGZ1bmN0aW9uc1xyXG4gKi9cclxudHlwZSBKc3hQcm9wcyA9IEF0dHJpYnV0ZXMgJiBTcGVjaWFsQXR0cmlidXRlcyAmIENoaWxkcmVuUHJvcHM7XHJcblxyXG4vLyBiYXNlIGNsYXNzIHdoaWNoIHdpbGwgYmUgaW5oZXJpdGVkIGZyb20ganN4IGFuZCBmcmFnbWVudHMgZnVuY3Rpb24gbm9kZSBnZW5lcmF0aW9uXHJcbi8vIGFuZCB3aWxsIGJlIHVzZWQgdG8gZGlzdGluZ3Vpc2ggdGhlbSB3aXRoIG90aGVyIEVsZW1lbnRzXHJcbmNsYXNzIEpzeE5vZGUge1xyXG4gIHByb3BzOiBKc3hQcm9wcztcclxuICBjb25zdHJ1Y3Rvcihwcm9wczogSnN4UHJvcHMpIHtcclxuICAgIHRoaXMucHJvcHMgPSBwcm9wcztcclxuICB9XHJcbn1cclxuXHJcbmludGVyZmFjZSBWTm9kZSB7XHJcbiAgW2tleTogc3RyaW5nXTogYW55O1xyXG59XHJcblxyXG4vLyBwcml2YXRlIGtleSBmb3IgY2FsbGluZyB0aGUgYHJlZmAgY2FsbGVyc1xyXG5jb25zdCBfY2FsbFJlZnMgPSBTeW1ib2woXCJjYWxsUmVmc1wiKTtcclxuXHJcbi8vIHRoZSBjdXJyZW50IG1hcmt1cCB3aGljaCBpcyByZW5kZXJlZCBpcyBuZXN0ZWQgaW4gYW4gc3ZnIGVsZW1lbnRcclxubGV0IHN2Z0NvbnRleHQgPSBmYWxzZTtcclxuXHJcbi8vIGpzeCBhbmQgRnJhZ21lbnQgd2lsbCByZXR1cm4gb2JqZWN0cyB3aGljaCBpbXBsZW1lbnQgdGhpcyBpbnRlcmZhY2VcclxuZXhwb3J0IGludGVyZmFjZSBKc3hOb2RlSW50ZXJmYWNlIGV4dGVuZHMgSnN4Tm9kZSB7XHJcbiAgdG9TdHJpbmcoKTogc3RyaW5nO1xyXG4gIGFzTm9kZSgpOiBOb2RlO1xyXG4gIGFzVk5vZGUoKTogVk5vZGU7XHJcbiAgW19jYWxsUmVmc10oKTogdm9pZDtcclxufVxyXG5cclxuLyoqXHJcbiAqIHJldHVybnMgdHJ1ZSBpZiBub3QgbnVsbGlzaCBvciBmYWxzZVxyXG4gKiB0aGF0IG1lYW5zIDAgb3IgZW1wdHkgc3RyaW5nIGFyZSBhbGxvd2VkXHJcbiAqIEBwYXJhbSB7Kn0gdmFsXHJcbiAqL1xyXG5mdW5jdGlvbiB0cnV0aHkodmFsdWU6IGFueSk6IGJvb2xlYW4ge1xyXG4gIHJldHVybiB2YWx1ZSAhPT0gZmFsc2UgJiYgdmFsdWUgIT09IG51bGwgJiYgdmFsdWUgIT09IHVuZGVmaW5lZDtcclxufVxyXG5cclxuLyoqXHJcbiAqIGVzY2FwZXMgdGhlIHByb3ZpZGVkIHN0cmluZyBhZ2FpbnN0IHhzcyBhdHRhY2tzIGV0Y1xyXG4gKlxyXG4gKiBAcGFyYW0ge3N0cmluZ30gdGV4dFxyXG4gKiBAcmV0dXJucyB7c3RyaW5nfVxyXG4gKi9cclxuZnVuY3Rpb24gc2FuaXRpemUodGV4dDogc3RyaW5nKTogc3RyaW5nIHtcclxuICBjb25zdCBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gIGRpdi5pbm5lclRleHQgPSB0ZXh0O1xyXG4gIHJldHVybiBkaXYuaW5uZXJIVE1MO1xyXG59XHJcblxyXG4vKipcclxuICogYmFzaWNhbGx5IGBFbGVtZW50Lm91dGVySFRNTGAgYnV0IGFsc28gc3VwcG9ydHMgVGV4dCBub2RlIGFuZCBEb2N1bWVudEZyYWdtZW50XHJcbiAqIEBwYXJhbSBlbGVtZW50IHtOb2RlfSAtIGVsZW1lbnQgd2hpY2ggaXRzIGh0bWwgbmVlZHMgdG8gYmUgcmV0dXJuZWRcclxuICovXHJcbmZ1bmN0aW9uIGdldE91dGVySHRtbChlbGVtZW50OiBOb2RlKTogc3RyaW5nIHtcclxuICBpZiAoZWxlbWVudCBpbnN0YW5jZW9mIEVsZW1lbnQpIHJldHVybiBlbGVtZW50Lm91dGVySFRNTDtcclxuICBpZiAoZWxlbWVudCBpbnN0YW5jZW9mIFRleHQpIHJldHVybiBzYW5pdGl6ZShlbGVtZW50Lndob2xlVGV4dCk7XHJcbiAgaWYgKGVsZW1lbnQgaW5zdGFuY2VvZiBEb2N1bWVudEZyYWdtZW50KVxyXG4gICAgcmV0dXJuIEFycmF5LmZyb20oZWxlbWVudC5jaGlsZE5vZGVzKVxyXG4gICAgICAubWFwKChlbCkgPT4gZ2V0T3V0ZXJIdG1sKGVsKSlcclxuICAgICAgLmpvaW4oXCJcIik7XHJcblxyXG4gIC8vIHNob3VsZG4ndCByZWFjaCB0aGlzIHBvaW50XHJcbiAgY29uc29sZS53YXJuKFwiZ2V0T3V0ZXJIdG1sIGRvZXMgbm90IHN1cHBvcnQgdGhpcyB0eXBlIG9mIGVsZW1lbnRcIiwgZWxlbWVudCk7XHJcbiAgcmV0dXJuIFwiXCI7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBnZW5lcmF0ZXMgdGhlIGh0bWwgYXMgYSBzdHJpbmcgd2hpY2ggY2FuIGJlIHVzZWQgZm9yIGV4YW1wbGUgd2l0aCBgZWxlbWVudC5pbm5lckhUTUwoKWBcclxuICpcclxuICogQHBhcmFtIHRhZyB7c3RyaW5nfEZ1bmN0aW9ufSAtIHRhZyBhcmd1bWVudCBvZiB0aGUganN4IGNhbGxcclxuICogQHBhcmFtIHByb3BzIHtPYmplY3R9IC0gcHJvcHMgYXJndW1lbnQgb2YganN4IGNhbGxcclxuICovXHJcbmZ1bmN0aW9uIGFzSHRtbFN0cmluZyh0YWc6IHN0cmluZyB8IEZ1bmN0aW9uLCBwcm9wczogSnN4UHJvcHMpIHtcclxuICBpZiAodHlwZW9mIHRhZyA9PT0gXCJmdW5jdGlvblwiKSB7XHJcbiAgICAvLyBleHBlY3RpbmcgdGFnIGZ1bmN0aW9uIHRvIGFsd2F5cyByZXR1cm4gYSBqc3guXHJcbiAgICAvLyBoZXJlIGl0IHdpbGwgYWxzbyB3b3JrIGlmIGl0IHJldHVybnMgc29tZXRoaW5nIHdpdGggdG9TdHJpbmcoKSA9PiBzdHJpbmcgbWV0aG9kXHJcbiAgICBjb25zdCBlbGVtZW50OiBKc3hOb2RlID0gdGFnKHByb3BzKTtcclxuXHJcbiAgICByZXR1cm4gZWxlbWVudC50b1N0cmluZygpO1xyXG4gIH1cclxuXHJcbiAgLy8gcmVtb3ZlIGNoaWxkcmVuIGZyb20gcHJvcHMgYW5kIHJlbmRlciBpdCBhcyBjb250ZW50LFxyXG4gIC8vIHRoZSByZXN0IGFzIGF0dHJpYnV0ZXNcclxuICBjb25zdCB7IGNoaWxkcmVuLCAuLi5hdHRycyB9ID0gcHJvcHM7XHJcblxyXG4gIGNvbnN0IGF0dHJpYnV0ZXMgPSBPYmplY3QuZW50cmllcyhhdHRycylcclxuICAgIC5maWx0ZXIoKFssIHZhbHVlXSkgPT4gdHJ1dGh5KHZhbHVlKSlcclxuICAgIC5tYXAoKFtrZXksIHZhbHVlXSkgPT4ge1xyXG4gICAgICAvLyBlLmcuIGRpc2FibGVkOiB0cnVlID0+IDx0YWcgZGlzYWJsZWQ+XHJcbiAgICAgIGlmICh2YWx1ZSA9PT0gdHJ1ZSkgcmV0dXJuIGtleTtcclxuXHJcbiAgICAgIC8vIGZvciBzdHlsZSBhcyBvYmplY3Q6XHJcbiAgICAgIC8vIChzdHlsZTopIHtkaXNwbGF5OiBcIm5vbmVcIiwgcG9zaXRpb246IFwiYWJzb2x1dGVcIn0gPT0+ICdkaXNwbGF5OiBub25lOyBwb3NpdGlvbjogYWJzb2x1dGU7J1xyXG4gICAgICBpZiAoa2V5ID09PSBcInN0eWxlXCIgJiYgdHlwZW9mIHZhbHVlID09PSBcIm9iamVjdFwiKVxyXG4gICAgICAgIHZhbHVlID0gT2JqZWN0LmVudHJpZXModmFsdWUpXHJcbiAgICAgICAgICAvLyBpZ25vcmUgc3R1ZmYgbGlrZSBge2JhY2tncm91bmQ6IGFjdGl2ZSAmJiBcInJlZFwifWAgd2hlbiBgYWN0aXZlID09PSBmYWxzZSAvIG51bGwgLyB1bmRlZmluZWRgXHJcbiAgICAgICAgICAuZmlsdGVyKChbLCB2XSkgPT4gdHJ1dGh5KHYpKVxyXG4gICAgICAgICAgLy8gY3VycmVudGx5IHN1cHBvcnRzIFwiYmFja2dyb3VuZC1jb2xvclwiIG5vdCBcImJhY2tncm91bmRDb2xvclwiXHJcbiAgICAgICAgICAubWFwKChbaywgdl0pID0+IGAke2t9OiAke3Z9YClcclxuICAgICAgICAgIC5qb2luKFwiOyBcIik7XHJcblxyXG4gICAgICAvLyAoY2xhc3M6KSBbXCJidG5cIiwgXCJyZWRcIl0gPT0+IFwiYnRuIHJlZFwiXHJcbiAgICAgIGlmIChrZXkgPT09IFwiY2xhc3NcIiAmJiBBcnJheS5pc0FycmF5KHZhbHVlKSkgdmFsdWUgPSB2YWx1ZS5qb2luKFwiIFwiKTtcclxuXHJcbiAgICAgIHJldHVybiBgJHtrZXl9PVwiJHt2YWx1ZX1cImA7XHJcbiAgICB9KVxyXG4gICAgLmpvaW4oXCIgXCIpO1xyXG5cclxuICBjb25zdCBjb250ZW50ID0gY2hpbGRyZW5cclxuICAgIC5maWx0ZXIodHJ1dGh5KVxyXG4gICAgLm1hcCgoY2hpbGQpID0+XHJcbiAgICAgIGNoaWxkIGluc3RhbmNlb2YgTm9kZVxyXG4gICAgICAgID8gZ2V0T3V0ZXJIdG1sKGNoaWxkKVxyXG4gICAgICAgIDogdHlwZW9mIGNoaWxkID09PSBcIm9iamVjdFwiXHJcbiAgICAgICAgPyBjaGlsZC50b1N0cmluZygpXHJcbiAgICAgICAgOiBzYW5pdGl6ZShjaGlsZClcclxuICAgIClcclxuICAgIC5qb2luKFwiXCIpO1xyXG5cclxuICByZXR1cm4gYDwke3RhZ30gJHthdHRyaWJ1dGVzfT4ke2NvbnRlbnR9PC8ke3RhZ30+YDtcclxufVxyXG5cclxuLyoqXHJcbiAqIGdlbmVyYXRlcyBIVE1MIE5vZGUgZWxlbWVudHMgZnJvbSB0aGUgcHJvdmlkZWQganN4IHRyZWVcclxuICogQHBhcmFtIHRhZyB7c3RyaW5nfEZ1bmN0aW9ufSAtIHRhZyBhcmd1bWVudCBvZiB0aGUganN4IGNhbGxcclxuICogQHBhcmFtIHByb3BzIHtPYmplY3R9IC0gcHJvcHMgYXJndW1lbnQgb2YganN4IGNhbGxcclxuICovXHJcbmZ1bmN0aW9uIGFzTm9kZShcclxuICB0YWc6IHN0cmluZyB8IEZ1bmN0aW9uLFxyXG4gIHByb3BzOiBKc3hQcm9wcyxcclxuICBjaGlsZHJlbjogYW55W11cclxuKTogW05vZGUsIEpzeE5vZGVJbnRlcmZhY2VbXV0ge1xyXG4gIGNvbnNvbGUubG9nKFwiYXNOb2RlKClcIiwgeyB0YWcsIHByb3BzLCBjaGlsZHJlbiB9KTtcclxuXHJcbiAgLy8gc2hvdWxkbid0XHJcbiAgaWYgKHR5cGVvZiB0YWcgPT09IFwiZnVuY3Rpb25cIikge1xyXG4gICAgY29uc29sZS5lcnJvcihcInNob3VsZG4ndCByZWFjaCB0aGlzIGluIHZUcmVlIG1vZGVcIik7XHJcbiAgICAvLyBleHBlY3RpbmcgdGhlIHRhZyBmdW5jdGlvbiB0byByZXR1cm4ganN4LlxyXG4gICAgLy8gaGVyZSBpdCB3aWxsIGFsc28gd29yayB3aGVuIGl0IHJldHVybnMgSFRNTEVsZW1lbnRcclxuICAgIGxldCByZXN1bHQgPSB0YWcocHJvcHMpO1xyXG5cclxuICAgIGxldCBqc3hOb2RlczogSnN4Tm9kZUludGVyZmFjZVtdID0gW107XHJcblxyXG4gICAgaWYgKHJlc3VsdCBpbnN0YW5jZW9mIEpzeE5vZGUpIHtcclxuICAgICAganN4Tm9kZXMgPSBbcmVzdWx0IGFzIEpzeE5vZGVJbnRlcmZhY2VdO1xyXG4gICAgICByZXN1bHQgPSAocmVzdWx0IGFzIEpzeE5vZGVJbnRlcmZhY2UpLmFzTm9kZSgpO1xyXG4gICAgICBPYmplY3QuZW50cmllcyhwcm9wcykuZm9yRWFjaCgoW2tleSwgdmFsdWVdKSA9PiB7XHJcbiAgICAgICAgaWYgKFxyXG4gICAgICAgICAga2V5LnN0YXJ0c1dpdGgoXCJvbi1cIikgJiZcclxuICAgICAgICAgICh0eXBlb2YgdmFsdWUgPT09IFwiZnVuY3Rpb25cIiB8fCB0eXBlb2YgdmFsdWUgPT09IFwib2JqZWN0XCIpXHJcbiAgICAgICAgKSB7XHJcbiAgICAgICAgICAvLyByZW1vdmUgbGVhZGluZyBcIm9uLVwiXCJcclxuICAgICAgICAgIGNvbnN0IGV2ZW50ID0ga2V5LnJlcGxhY2UoL15vbi0vLCBcIlwiKTtcclxuXHJcbiAgICAgICAgICByZXN1bHQuYWRkRXZlbnRMaXN0ZW5lcihcclxuICAgICAgICAgICAgZXZlbnQsXHJcbiAgICAgICAgICAgIHZhbHVlIGFzIEV2ZW50TGlzdGVuZXJPckV2ZW50TGlzdGVuZXJPYmplY3RcclxuICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gW3Jlc3VsdCwganN4Tm9kZXNdO1xyXG4gIH1cclxuXHJcbiAgY29uc3QgeyAuLi5hdHRycyB9ID0gcHJvcHM7XHJcbiAgLy8gcmVtZW1iZXIgaWYgdGhlIHN2ZyBjb250ZXh0IHdhcyBzZXQgZm9yIHRoaXMgbm9kZSwgYW5kIHJlcGxhY2UgYWZ0ZXIgZ2VuZXJhdGluZyBhbGwgY2hpbGRyZW5cclxuICBsZXQgc3ZnQ29udGV4dFNldCA9IGZhbHNlO1xyXG5cclxuICAvLyBzZXQgdGhlIGNvbnRleHQgb2YgbWFya3VwIHdoaWNoIGlzIHJlbmRlcmVkIGFzIFNWRyAob3IgaXRzIGNoaWxkcmVuKVxyXG4gIC8vIG5vIG5lZWQgZm9yIHJlLXNldHRpbmcgdGhlIGNvbnRleHQgZm9yIG5lc3RlZCBTVkdzXHJcbiAgaWYgKCFzdmdDb250ZXh0ICYmIHRhZyA9PT0gXCJzdmdcIikge1xyXG4gICAgc3ZnQ29udGV4dCA9IHRydWU7XHJcbiAgICBzdmdDb250ZXh0U2V0ID0gdHJ1ZTtcclxuICB9XHJcblxyXG4gIC8vIGN1cnJlbnRseSBub3Qgc3VwcG9ydGluZyB0aGUgYGlzYCBvcHRpb24gZm9yIEN1c3RvbWl6ZWQgYnVpbHQtaW4gZWxlbWVudHNcclxuICBjb25zdCBub2RlID0gc3ZnQ29udGV4dFxyXG4gICAgPyBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoXCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiLCB0YWcpXHJcbiAgICA6IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodGFnKTtcclxuXHJcbiAgT2JqZWN0LmVudHJpZXMoYXR0cnMpXHJcbiAgICAuZmlsdGVyKChbX2tleSwgdmFsdWVdKSA9PiB0cnV0aHkodmFsdWUpKVxyXG4gICAgLmZvckVhY2goKFtrZXksIHZhbHVlXSkgPT4ge1xyXG4gICAgICAvLyBmb3Igc3R5bGUgYXMgb2JqZWN0OlxyXG4gICAgICAvLyAoc3R5bGU6KSB7ZGlzcGxheTogXCJub25lXCIsIHBvc2l0aW9uOiBcImFic29sdXRlXCJ9ID09PiAnZGlzcGxheTogbm9uZTsgcG9zaXRpb246IGFic29sdXRlOydcclxuICAgICAgaWYgKGtleSA9PT0gXCJzdHlsZVwiICYmIHR5cGVvZiB2YWx1ZSA9PT0gXCJvYmplY3RcIilcclxuICAgICAgICB2YWx1ZSA9IE9iamVjdC5lbnRyaWVzKHZhbHVlKVxyXG4gICAgICAgICAgLmZpbHRlcigoWywgdl0pID0+IHRydXRoeSh2KSlcclxuICAgICAgICAgIC5tYXAoKFtrLCB2XSkgPT4gYCR7a306ICR7dn1gKVxyXG4gICAgICAgICAgLmpvaW4oXCI7IFwiKTtcclxuXHJcbiAgICAgIC8vIChjbGFzczopIFtcImJ0blwiLCBcInJlZFwiXSA9PT4gXCJidG4gcmVkXCJcclxuICAgICAgaWYgKGtleSA9PT0gXCJjbGFzc1wiICYmIEFycmF5LmlzQXJyYXkodmFsdWUpKSB2YWx1ZSA9IHZhbHVlLmpvaW4oXCIgXCIpO1xyXG5cclxuICAgICAgaWYgKHZhbHVlID09PSB0cnVlKSBub2RlLnNldEF0dHJpYnV0ZShrZXksIFwiXCIpO1xyXG4gICAgICBlbHNlIGlmICh0eXBlb2YgdmFsdWUgPT09IFwic3RyaW5nXCIgfHwgdHlwZW9mIHZhbHVlID09PSBcIm51bWJlclwiKVxyXG4gICAgICAgIG5vZGUuc2V0QXR0cmlidXRlKGtleSwgU3RyaW5nKHZhbHVlKSk7XHJcbiAgICAgIC8vIGtleSBoYXMgdGhlIGZvcm0gb2YgXCJvbi1jaGFuZ2VcIi4gdmFsdWUgaXMgdGhlIGNhbGxiYWNrIGZ1bmN0aW9uIG9yIGFuIG9iamVjdCBpbXBsZW1lbnRpbmcge0V2ZW50TGlzdGVuZXJ9IGludGVyZmFjZVxyXG4gICAgICBlbHNlIGlmIChcclxuICAgICAgICBrZXkuc3RhcnRzV2l0aChcIm9uLVwiKSAmJlxyXG4gICAgICAgICh0eXBlb2YgdmFsdWUgPT09IFwiZnVuY3Rpb25cIiB8fCB0eXBlb2YgdmFsdWUgPT09IFwib2JqZWN0XCIpXHJcbiAgICAgICkge1xyXG4gICAgICAgIC8vIHJlbW92ZSBsZWFkaW5nIFwib24tXCJcIlxyXG4gICAgICAgIGNvbnN0IGV2ZW50ID0ga2V5LnJlcGxhY2UoL15vbi0vLCBcIlwiKTtcclxuXHJcbiAgICAgICAgbm9kZS5hZGRFdmVudExpc3RlbmVyKFxyXG4gICAgICAgICAgZXZlbnQsXHJcbiAgICAgICAgICB2YWx1ZSBhcyBFdmVudExpc3RlbmVyT3JFdmVudExpc3RlbmVyT2JqZWN0XHJcbiAgICAgICAgKTtcclxuICAgICAgfVxyXG4gICAgICAvLyBAdHMtaWdub3JlIC0gcHJvdmlkaW5nIHRoZSB2YWx1ZSBhcyBwcm9wZXJ0eSB0byBodG1sIGVsZW1lbnRcclxuICAgICAgZWxzZSBub2RlW2tleV0gPSB2YWx1ZTtcclxuICAgIH0pO1xyXG5cclxuICAvLyByZXR1cm5zIGNoaWxkIGpzeCBub2RlcyBhcyB3ZWxsIHRvIGJlIHVzZWQgZHVyaW5nIHRoZSByZWYgY2FsbFxyXG4gIGNvbnN0IGNoaWxkSnN4Tm9kZXMgPSBjaGlsZHJlbi5maWx0ZXIoKGNoaWxkKSA9PiBjaGlsZCBpbnN0YW5jZW9mIEpzeE5vZGUpO1xyXG5cclxuICBjb25zb2xlLmxvZyh7IGNoaWxkcmVuIH0pO1xyXG5cclxuICBub2RlLmFwcGVuZChcclxuICAgIC4uLmNoaWxkcmVuXHJcbiAgICAgIC5mbGF0KClcclxuICAgICAgLy8uZmlsdGVyKHRydXRoeSlcclxuICAgICAgLmZpbHRlcigoY2hpbGQpID0+IGNoaWxkLnRhZyAhPT0gXCJfX05VTExfX1wiKVxyXG4gICAgICAubWFwKChjaGlsZCkgPT4gY2hpbGQuYXNOb2RlKCkpXHJcbiAgKTtcclxuXHJcbiAgLypub2RlLmFwcGVuZChcclxuICAgIC4uLmNoaWxkcmVuXHJcbiAgICAgIC5mbGF0KClcclxuICAgICAgLmZpbHRlcih0cnV0aHkpXHJcbiAgICAgIC5tYXAoKGNoaWxkKSA9PlxyXG4gICAgICAgIGNoaWxkIGluc3RhbmNlb2YgTm9kZVxyXG4gICAgICAgICAgPyBjb25zb2xlLndhcm4oXCJub2RlXCIpIHx8IGNoaWxkIC8vIHdhcm5cclxuICAgICAgICAgIDogY2hpbGQgaW5zdGFuY2VvZiBKc3hOb2RlXHJcbiAgICAgICAgICA/IGNoaWxkLmFzTm9kZSgpXHJcbiAgICAgICAgICA6IGNvbnNvbGUud2FybihcInRleHRcIikgfHwgY2hpbGRcclxuICAgICAgKVxyXG4gICk7Ki9cclxuXHJcbiAgLy8gc3ZnIGVsZW1lbnQgYW5kIGFsbCBpdHMgY2hpbGRyZW4gd2VyZSByZW5kZXJlZCwgcmVzZXQgdGhlIHN2ZyBjb250ZXh0XHJcbiAgaWYgKHN2Z0NvbnRleHRTZXQpIHN2Z0NvbnRleHQgPSBmYWxzZTtcclxuXHJcbiAgcmV0dXJuIFtub2RlLCBjaGlsZEpzeE5vZGVzIGFzIEpzeE5vZGVJbnRlcmZhY2VbXV07XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGFzVk5vZGUodGFnOiBzdHJpbmcgfCBGdW5jdGlvbiwgcHJvcHM6IEpzeFByb3BzKTogVk5vZGUge1xyXG4gIGlmICh0eXBlb2YgdGFnID09PSBcImZ1bmN0aW9uXCIpIHtcclxuICAgIGxldCByZXN1bHQgPSB0YWcocHJvcHMpO1xyXG4gICAgaWYgKHJlc3VsdCBpbnN0YW5jZW9mIEpzeE5vZGUpIHtcclxuICAgICAgcmV0dXJuIChyZXN1bHQgYXMgSnN4Tm9kZUludGVyZmFjZSkuYXNWTm9kZSgpO1xyXG4gICAgfVxyXG4gICAgaWYgKHJlc3VsdCBpbnN0YW5jZW9mIE5vZGUpIHtcclxuICAgICAgY29uc3Qgbm9kZSA9IHtcclxuICAgICAgICB0YWc6IFwiX19OT0RFX19cIixcclxuICAgICAgICBwYXJlbnQ6IG51bGwsXHJcbiAgICAgICAgcHJvcHM6IHtcclxuICAgICAgICAgIGNvbnRlbnQ6IHJlc3VsdCxcclxuICAgICAgICB9LFxyXG4gICAgICAgIGNoaWxkcmVuOiBbXSxcclxuICAgICAgICBhc05vZGUoKSB7XHJcbiAgICAgICAgICBub2RlLm5vZGUgPSByZXN1bHQ7XHJcbiAgICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZGlmZkFuZFBhdGNoKCkge1xyXG4gICAgICAgICAgY29uc29sZS5sb2coXCJfX05PREVfXyAxIGRpZmZBbmRQYXRjaFwiLCByZXN1bHQpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgIH07XHJcblxyXG4gICAgICByZXR1cm4gbm9kZTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoIXRydXRoeShyZXN1bHQpKSB7XHJcbiAgICAgIGNvbnN0IGZvb05vZGU6IFZOb2RlID0ge307XHJcbiAgICAgIE9iamVjdC5hc3NpZ24oZm9vTm9kZSwge1xyXG4gICAgICAgIHRhZzogXCJfX05VTExfX1wiLFxyXG4gICAgICAgIHRhZzI6IFwidGFnIGZ1bmMgcmV0dXJuZWQgbnVsbCBub2RlXCIsXHJcbiAgICAgICAgbm9kZTogbnVsbCxcclxuICAgICAgICBwYXJlbnQ6IG51bGwsXHJcbiAgICAgICAgcHJvcHM6IHt9LFxyXG4gICAgICAgIGNoaWxkcmVuOiBbXSxcclxuICAgICAgICBhc05vZGUoKSB7XHJcbiAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGRpZmZBbmRQYXRjaChuZXdOb2RlOiBWTm9kZSkge1xyXG4gICAgICAgICAgaWYgKG5ld05vZGUudGFnID09PSBcIl9fTlVMTF9fXCIpIHJldHVybjtcclxuICAgICAgICAgIGNvbnN0IG4gPSBuZXdOb2RlLmFzTm9kZSgpO1xyXG5cclxuICAgICAgICAgIC8vIEBUT0RPOiBmaW5kIGl0ZW0gYmVmb3JlXHJcbiAgICAgICAgICAvL3ZOb2RlLm5vZGVcclxuICAgICAgICAgIGNvbnN0IG5ld05vZGVJbmRleCA9IG5ld05vZGUucGFyZW50LmNoaWxkcmVuLmluZGV4T2YobmV3Tm9kZSk7XHJcbiAgICAgICAgICBjb25zdCBzaWJsaW5ncyA9IG5ld05vZGUucGFyZW50LmNoaWxkcmVuXHJcbiAgICAgICAgICAgIC5zbGljZSgwLCBuZXdOb2RlSW5kZXgpXHJcbiAgICAgICAgICAgIC5yZXZlcnNlKCk7XHJcbiAgICAgICAgICBjb25zdCBzaWJsaW5nQmVmb3JlID0gc2libGluZ3MuZmluZCgobjogVk5vZGUpID0+IG4ubm9kZSk7XHJcbiAgICAgICAgICBpZiAoc2libGluZ0JlZm9yZSkge1xyXG5cclxuICAgICAgICAgICAgaWYgKG4pXHJcbiAgICAgICAgICAgIHNpYmxpbmdCZWZvcmUubm9kZS5pbnNlcnRBZGphY2VudEVsZW1lbnQoXHJcbiAgICAgICAgICAgICAgXCJhZnRlcmVuZFwiLFxyXG4gICAgICAgICAgICAgIG5cclxuICAgICAgICAgICAgKTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIChmb29Ob2RlLnBhcmVudC5ub2RlIGFzIEhUTUxFbGVtZW50KS5pbnNlcnRBZGphY2VudEVsZW1lbnQoXHJcbiAgICAgICAgICAgICAgXCJhZnRlcmJlZ2luXCIsXHJcbiAgICAgICAgICAgICAgblxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAvKihuZXdOb2RlLnBhcmVudC5ub2RlIGFzIEhUTUxFbGVtZW50KS5pbnNlcnRBZGphY2VudEVsZW1lbnQoXHJcbiAgICAgICAgICAgICAgXCJhZnRlcmJlZ2luXCIsXHJcbiAgICAgICAgICAgICAgbmV3Tm9kZS5hc05vZGUoKVxyXG4gICAgICAgICAgICApOyovXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgfSk7XHJcblxyXG4gICAgICByZXR1cm4gZm9vTm9kZTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBub2RlID0ge1xyXG4gICAgICB0YWc6IFwiX19URVhUX05PREVfX1wiLFxyXG4gICAgICB0YWcxOiAxLFxyXG4gICAgICBub2RlOiBudWxsLFxyXG4gICAgICBwYXJlbnQ6IG51bGwsXHJcbiAgICAgIHByb3BzOiB7XHJcbiAgICAgICAgY29udGVudDogcmVzdWx0LFxyXG4gICAgICB9LFxyXG4gICAgICBjaGlsZHJlbjogW10sXHJcbiAgICAgIGFzTm9kZSgpIHtcclxuICAgICAgICBjb25zdCB0ZXh0Tm9kZSA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKHJlc3VsdCk7XHJcbiAgICAgICAgbm9kZS5ub2RlID0gdGV4dE5vZGU7XHJcbiAgICAgICAgcmV0dXJuIHRleHROb2RlO1xyXG4gICAgICB9LFxyXG4gICAgICBkaWZmQW5kUGF0Y2gobmV3Tm9kZSkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFxyXG4gICAgICAgICAgXCJfX1RFWFRfTk9ERV9fIDEgZGlmZkFuZFBhdGNoXCIsXHJcbiAgICAgICAgICByZXN1bHQsXHJcbiAgICAgICAgICBuZXdOb2RlLnByb3BzLmNvbnRlbnRcclxuICAgICAgICApO1xyXG4gICAgICAgIC8vIEBUT0RPIGJvdGggdGV4dFxyXG4gICAgICAgIGlmIChyZXN1bHQgIT09IG5ld05vZGUucHJvcHMuY29udGVudClcclxuICAgICAgICAgIG5vZGUubm9kZS5ub2RlVmFsdWUgPSBuZXdOb2RlLnByb3BzLmNvbnRlbnQ7XHJcbiAgICAgICAgLy8gZWxzZSA/XHJcbiAgICAgIH0sXHJcbiAgICB9O1xyXG5cclxuICAgIHJldHVybiBub2RlO1xyXG4gIH1cclxuXHJcbiAgY29uc3QgeyBjaGlsZHJlbiwgLi4uYXR0ciB9ID0gcHJvcHM7XHJcbiAgY29uc3Qgdk5vZGU6IFZOb2RlID0ge307XHJcbiAgT2JqZWN0LmFzc2lnbih2Tm9kZSwge1xyXG4gICAgdGFnLFxyXG4gICAgdGFnMjogXCJhc1ZOb2RlIC0gbm9ybWFsIHJldHVyblwiLFxyXG4gICAgbm9kZTogbnVsbCxcclxuICAgIHByb3BzOiBhdHRyLFxyXG4gICAgY2hpbGRyZW46IGNoaWxkcmVuLmZsYXQoKS5tYXAoKGNoaWxkKSA9PiB7XHJcbiAgICAgIGlmIChjaGlsZCBpbnN0YW5jZW9mIEpzeE5vZGUpIHtcclxuICAgICAgICBjb25zdCBjaGlsZFZOb2RlID0gY2hpbGQuYXNWTm9kZSgpO1xyXG4gICAgICAgIGNoaWxkVk5vZGUucGFyZW50ID0gdk5vZGU7XHJcbiAgICAgICAgcmV0dXJuIGNoaWxkVk5vZGU7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKGNoaWxkIGluc3RhbmNlb2YgTm9kZSkge1xyXG4gICAgICAgIGNvbnN0IG5vZGUgPSB7XHJcbiAgICAgICAgICB0YWc6IFwiX19OT0RFX19cIixcclxuICAgICAgICAgIHByb3BzOiB7XHJcbiAgICAgICAgICAgIGNvbnRlbnQ6IGNoaWxkLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHBhcmVudDogdk5vZGUsXHJcbiAgICAgICAgICBjaGlsZHJlbjogW10sXHJcbiAgICAgICAgICBhc05vZGUoKSB7XHJcbiAgICAgICAgICAgIG5vZGUubm9kZSA9IGNoaWxkO1xyXG4gICAgICAgICAgICByZXR1cm4gY2hpbGQ7XHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgZGlmZkFuZFBhdGNoKCkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIl9fTk9ERV9fIGRpZmZBbmRQYXRjaFwiLCBjaGlsZCk7XHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHJldHVybiBub2RlO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBjb25zb2xlLmxvZyh7IGNoaWxkIH0pO1xyXG5cclxuICAgICAgaWYgKGNoaWxkID09PSBudWxsIHx8IGNoaWxkID09PSBmYWxzZSB8fCBjaGlsZCA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgY29uc3QgY2hpbGRWTm9kZTogVk5vZGUgPSB7XHJcbiAgICAgICAgICB0YWc6IFwiX19OVUxMX19cIixcclxuICAgICAgICAgIHRhZzI6IFwiY2hpbGRyZW4gbnVsbCBub2RlXCIsXHJcbiAgICAgICAgICBub2RlOiBudWxsLFxyXG4gICAgICAgICAgcGFyZW50OiB2Tm9kZSxcclxuICAgICAgICAgIHByb3BzOiB7fSxcclxuICAgICAgICAgIGNoaWxkcmVuOiBbXSxcclxuICAgICAgICAgIGFzTm9kZSgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgZGlmZkFuZFBhdGNoKG5ld05vZGU6IFZOb2RlKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiZGlmZi1BbmRQYXRjaCwgY2hpbGQgbm9kZSB3YXMgbnVsbFwiLCBuZXdOb2RlKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChuZXdOb2RlLnRhZyA9PT0gXCJfX05VTExfX1wiKSByZXR1cm47XHJcbiAgICAgICAgICBjb25zdCBuID0gbmV3Tm9kZS5hc05vZGUoKTtcclxuICAgICAgICAgICAgLy8gQFRPRE86IGZpbmQgaXRlbSBiZWZvcmVcclxuICAgICAgICAgICAgLy92Tm9kZS5ub2RlXHJcbiAgICAgICAgICAgIGNvbnN0IG5ld05vZGVJbmRleCA9IG5ld05vZGUucGFyZW50LmNoaWxkcmVuLmluZGV4T2YobmV3Tm9kZSk7XHJcbiAgICAgICAgICAgIGNvbnN0IHNpYmxpbmdzID0gbmV3Tm9kZS5wYXJlbnQuY2hpbGRyZW5cclxuICAgICAgICAgICAgICAuc2xpY2UoMCwgbmV3Tm9kZUluZGV4KVxyXG4gICAgICAgICAgICAgIC5yZXZlcnNlKCk7XHJcbiAgICAgICAgICAgIGNvbnN0IHNpYmxpbmdCZWZvcmUgPSBzaWJsaW5ncy5maW5kKChuOiBWTm9kZSkgPT4gbi5ub2RlKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coe3NpYmxpbmdCZWZvcmUsIHNpYmxpbmdzLCBuZXdOb2RlSW5kZXgsIG5ld05vZGV9KTtcclxuXHJcbiAgICAgICAgICAgIGlmIChzaWJsaW5nQmVmb3JlKSB7XHJcbiAgICAgICAgICAgICAgc2libGluZ0JlZm9yZS5ub2RlLmluc2VydEFkamFjZW50RWxlbWVudChcclxuICAgICAgICAgICAgICAgIFwiYWZ0ZXJlbmRcIixcclxuICAgICAgICAgICAgICAgIG5cclxuICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICh2Tm9kZS5ub2RlIGFzIEhUTUxFbGVtZW50KS5pbnNlcnRBZGphY2VudEVsZW1lbnQoXHJcbiAgICAgICAgICAgICAgICBcImFmdGVyYmVnaW5cIixcclxuICAgICAgICAgICAgICAgIG5cclxuICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgIC8qKG5ld05vZGUucGFyZW50Lm5vZGUgYXMgSFRNTEVsZW1lbnQpLmluc2VydEFkamFjZW50RWxlbWVudChcclxuICAgICAgICAgICAgICAgIFwiYWZ0ZXJiZWdpblwiLFxyXG4gICAgICAgICAgICAgICAgbmV3Tm9kZS5hc05vZGUoKVxyXG4gICAgICAgICAgICAgICk7Ki9cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSxcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICByZXR1cm4gY2hpbGRWTm9kZTtcclxuICAgICAgfVxyXG5cclxuICAgICAgY29uc29sZS5sb2coXCI6OjpcIiwgeyBjaGlsZCB9KTtcclxuXHJcbiAgICAgIGNvbnN0IG5vZGUgPSB7XHJcbiAgICAgICAgdGFnOiBcIl9fVEVYVF9OT0RFX19cIixcclxuICAgICAgICB0YWcyOiBcImNoaWxkcmVuIFRleHQgbm9kZVwiLFxyXG4gICAgICAgIG5vZGU6IG51bGwsXHJcbiAgICAgICAgcGFyZW50OiB2Tm9kZSxcclxuICAgICAgICBwcm9wczoge1xyXG4gICAgICAgICAgY29udGVudDogY2hpbGQsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBjaGlsZHJlbjogW10sXHJcbiAgICAgICAgYXNOb2RlKCkge1xyXG4gICAgICAgICAgY29uc3QgdGV4dE5vZGUgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjaGlsZCk7XHJcbiAgICAgICAgICBub2RlLm5vZGUgPSB0ZXh0Tm9kZTtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKHRleHROb2RlLCBub2RlKTtcclxuXHJcbiAgICAgICAgICByZXR1cm4gdGV4dE5vZGU7XHJcbiAgICAgICAgfSxcclxuICAgICAgICAvLyB0b3AgbGV2ZWwgdm5vZGVcclxuICAgICAgICBkaWZmQW5kUGF0Y2gobmV3Tm9kZTogVk5vZGUpIHtcclxuICAgICAgICAgIC8vIEBUT0RPIGJvdGggdGV4dD9cclxuICAgICAgICAgIGNvbnNvbGUubG9nKFwiY2hhbmdlPyBcIiwgbmV3Tm9kZS50YWcsIG5vZGUudGFnKTtcclxuXHJcbiAgICAgICAgICBpZiAobmV3Tm9kZS50YWcgIT09IG5vZGUudGFnKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGFzTm9kZSA9IG5ld05vZGUuYXNOb2RlKCk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHsgYXNOb2RlIH0pO1xyXG5cclxuICAgICAgICAgICAgaWYgKGFzTm9kZSkge1xyXG4gICAgICAgICAgICAgIG5vZGUubm9kZS5yZXBsYWNlV2l0aChhc05vZGUpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIG5vZGUubm9kZS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKG5vZGUubm9kZSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGlmIChjaGlsZCAhPT0gbmV3Tm9kZS5wcm9wcy5jb250ZW50KVxyXG4gICAgICAgICAgICBub2RlLm5vZGUubm9kZVZhbHVlID0gbmV3Tm9kZS5wcm9wcy5jb250ZW50O1xyXG4gICAgICAgICAgICBuZXdOb2RlLm5vZGUgPSBub2RlLm5vZGU7XHJcbiAgICAgICAgICAvLyBlbHNlID9cclxuICAgICAgICB9LFxyXG4gICAgICB9O1xyXG5cclxuICAgICAgcmV0dXJuIG5vZGU7XHJcbiAgICB9KSxcclxuXHJcbiAgICBhc05vZGUoKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwiYXNWTm9kZS5hc05vZGVcIiwgeyB0YWcsIHByb3BzLCB2Tm9kZSB9KTtcclxuXHJcbiAgICAgIGNvbnN0IG5vZGUgPSBhc05vZGUodGFnLCBhdHRyLCB2Tm9kZS5jaGlsZHJlbilbMF07XHJcbiAgICAgIHZOb2RlLm5vZGUgPSBub2RlO1xyXG4gICAgICByZXR1cm4gbm9kZTtcclxuICAgIH0sXHJcbiAgICAvLyB0byBsZXZlbFxyXG4gICAgZGlmZkFuZFBhdGNoKG5ld1ZOb2RlOiBWTm9kZSkge1xyXG4gICAgICBjb25zb2xlLmxvZyhcImRpZmZBbmRQYXRjaFwiKTtcclxuXHJcbiAgICAgIC8vID8gd2hlbj9cclxuICAgICAgaWYgKCFuZXdWTm9kZSkge1xyXG4gICAgICAgICh2Tm9kZS5ub2RlISBhcyBIVE1MRWxlbWVudCkucGFyZW50Tm9kZSEucmVtb3ZlQ2hpbGQoXHJcbiAgICAgICAgICB2Tm9kZS5ub2RlISBhcyBIVE1MRWxlbWVudFxyXG4gICAgICAgICk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAobmV3Vk5vZGUudGFnICE9PSB0YWcpIHtcclxuICAgICAgICBjb25zdCBuZXdOb2RlID0gbmV3Vk5vZGUuYXNOb2RlKCk7XHJcbiAgICAgICAgaWYgKHZOb2RlLm5vZGUpIHtcclxuICAgICAgICAgIGlmIChuZXdOb2RlKSAodk5vZGUubm9kZSEgYXMgSFRNTEVsZW1lbnQpLnJlcGxhY2VXaXRoKG5ld05vZGUpO1xyXG4gICAgICAgICAgZWxzZSB2Tm9kZS5ub2RlLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQodk5vZGUubm9kZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gQFRPRE86IGlmIHNwZWNpYWwgdGFnc1xyXG5cclxuICAgICAgLy8gdXBkYXRlIHByb3BzIGZvcm0gbmV3IG5vZGVcclxuICAgICAgT2JqZWN0LmVudHJpZXMobmV3Vk5vZGUucHJvcHMpXHJcbiAgICAgICAgLmZpbHRlcigoW2ssIHZdKSA9PiBwcm9wc1trXSAhPT0gdilcclxuICAgICAgICAuZm9yRWFjaCgoW2tleSwgdmFsdWVdKSA9PiB7XHJcbiAgICAgICAgICBpZiAodmFsdWUgPT09IHRydWUpIHZOb2RlLm5vZGUuc2V0QXR0cmlidXRlKGtleSwgXCJcIik7XHJcbiAgICAgICAgICBlbHNlIGlmICh2YWx1ZSA9PT0gbnVsbCB8fCB2YWx1ZSA9PT0gdW5kZWZpbmVkIHx8IHZhbHVlID09PSBmYWxzZSlcclxuICAgICAgICAgICAgdk5vZGUubm9kZS5yZW1vdmVBdHRyaWJ1dGUoa2V5KTtcclxuICAgICAgICAgIGVsc2Ugdk5vZGUubm9kZS5zZXRBdHRyaWJ1dGUoa2V5LCB2YWx1ZSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAvLyByZW1vdmUgb2xkLCBvYnNvbGF0ZSBhdHRyaWJ1dGVzXHJcbiAgICAgIE9iamVjdC5lbnRyaWVzKHZOb2RlLnByb3BzKVxyXG4gICAgICAgIC5maWx0ZXIoKFtrLCB2XSkgPT4gIW5ld1ZOb2RlLnByb3BzLmhhc093blByb3BlcnR5KGspKVxyXG4gICAgICAgIC5mb3JFYWNoKChba2V5LCB2YWx1ZV0pID0+IHtcclxuICAgICAgICAgIHZOb2RlLm5vZGUucmVtb3ZlQXR0cmlidXRlKGtleSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIG5ld1ZOb2RlLm5vZGUgPSB2Tm9kZS5ub2RlO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwibm9kZSB1cGRhdGVcIiwgbmV3Vk5vZGUsIHZOb2RlKTtcclxuXHJcbiAgICAgIC8vIEBUT0RPOiBwcm9wcyBub3QgYXR0cmlidXRlc1xyXG5cclxuICAgICAgLy8gY2hpbGRyZW5cclxuICAgICAgdk5vZGUuY2hpbGRyZW4uZm9yRWFjaCgoY2hpbGQsIGl4KSA9PlxyXG4gICAgICAgIGNoaWxkLmRpZmZBbmRQYXRjaChuZXdWTm9kZS5jaGlsZHJlbltpeF0pXHJcbiAgICAgICk7XHJcbiAgICAgIC8vIEBUT0RPOiBuZXcgY2hpbGRyZW5cclxuICAgICAgZm9yIChsZXQgaSA9IHZOb2RlLmNoaWxkcmVuLmxlbmd0aDsgaSA8IG5ld1ZOb2RlLmNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgKHZOb2RlLm5vZGUgYXMgSFRNTEVsZW1lbnQpLmluc2VydEFkamFjZW50RWxlbWVudChcclxuICAgICAgICAgIFwiYmVmb3JlZW5kXCIsXHJcbiAgICAgICAgICBuZXdWTm9kZS5jaGlsZHJlbltpXS5hc05vZGUoKVxyXG4gICAgICAgICk7XHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgfSk7XHJcblxyXG4gIHJldHVybiB2Tm9kZTtcclxufVxyXG5cclxuLyoqXHJcbiAqIGNvbnZlcnRzIHByYWdtYSBvYmplY3QgdG8gaHRtbCBzdHJpbmdcclxuICoganN4cyBpcyBhbHdheXMgY2FsbGVkIHdoZW4gZWxlbWVudCBoYXMgbW9yZSB0aGFuIG9uZSBjaGlsZFxyXG4gKlxyXG4gKiBAcGFyYW0ge3N0cmluZyB8IEZ1bmN0aW9ufSB0YWcgLSB0YWcgbmFtZSBvciB0YWcgY2xhc3NcclxuICogQHBhcmFtIHtPYmplY3QgfCBudWxsfSBwcm9wcyAtIHByb3BzIGZvciB0aGUgdGFnXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24ganN4cyhcclxuICB0YWc6IHN0cmluZyB8IEZ1bmN0aW9uLFxyXG4gIHByb3BzOiBKc3hQcm9wc1xyXG4pOiBKc3hOb2RlSW50ZXJmYWNlIHtcclxuICBsZXQgbm9kZTogTm9kZTtcclxuICBsZXQganN4Tm9kZXM6IEpzeE5vZGVJbnRlcmZhY2VbXTtcclxuICBwcm9wcy5jaGlsZHJlbiA9IHByb3BzLmNoaWxkcmVuLmZsYXQoKTsgLy8gQFRPRE86IGRvY1xyXG5cclxuICAvLyBpZiByZWYgcHJvcCBpcyBwcm92aWRlZCwgbWVtb3JpemUgYW5kIHJlbW92ZSBmcm9tIHRoZSBodG1sIGdlbmVyYXRpb24gcHJvY2Vzc1xyXG4gIGNvbnN0IHJlZjogRnVuY3Rpb24gfCBudWxsID1cclxuICAgIHR5cGVvZiBwcm9wcy5yZWYgPT09IFwiZnVuY3Rpb25cIiA/IHByb3BzLnJlZiA6IG51bGw7XHJcbiAgaWYgKHJlZikgZGVsZXRlIHByb3BzLnJlZjtcclxuXHJcbiAgcmV0dXJuIG5ldyAoY2xhc3MgZXh0ZW5kcyBKc3hOb2RlIGltcGxlbWVudHMgSnN4Tm9kZUludGVyZmFjZSB7XHJcbiAgICB0b1N0cmluZygpIHtcclxuICAgICAgcmV0dXJuIGFzSHRtbFN0cmluZyh0YWcsIHRoaXMucHJvcHMpO1xyXG4gICAgfVxyXG5cclxuICAgIGFzTm9kZSgpIHtcclxuICAgICAgW25vZGUsIGpzeE5vZGVzXSA9IGFzTm9kZSh0YWcsIHRoaXMucHJvcHMpO1xyXG5cclxuICAgICAgcmV0dXJuIG5vZGU7XHJcbiAgICB9XHJcbiAgICBhc1ZOb2RlKCkge1xyXG4gICAgICByZXR1cm4gYXNWTm9kZSh0YWcsIHRoaXMucHJvcHMpO1xyXG4gICAgfVxyXG5cclxuICAgIFtfY2FsbFJlZnNdKCkge1xyXG4gICAgICBpZiAocmVmICYmIG5vZGUpIHJlZihub2RlKTtcclxuXHJcbiAgICAgIGlmICh0eXBlb2YgdGFnID09PSBcImZ1bmN0aW9uXCIpIHtcclxuICAgICAgICBqc3hOb2Rlcy5mb3JFYWNoKChub2RlSXRlbSkgPT4gbm9kZUl0ZW1bX2NhbGxSZWZzXSgpKTtcclxuICAgICAgfSBlbHNlIGlmICh0aGlzLnByb3BzLmNoaWxkcmVuKSB7XHJcbiAgICAgICAgdGhpcy5wcm9wcy5jaGlsZHJlblxyXG4gICAgICAgICAgLmZsYXQoKVxyXG4gICAgICAgICAgLmZpbHRlcigoY2hpbGQpID0+IGNoaWxkIGluc3RhbmNlb2YgSnN4Tm9kZSlcclxuICAgICAgICAgIC5mb3JFYWNoKChjaGlsZCkgPT4gKGNoaWxkIGFzIEpzeE5vZGVJbnRlcmZhY2UpW19jYWxsUmVmc10oKSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9KShwcm9wcyk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBjb252ZXJ0cyB0aGUgZnJhZ21lbnRzIG9iamVjdCB0byBub2Rlc1xyXG4gKlxyXG4gKiBAcGFyYW0ge09iamVjdH0gcHJvcHNcclxuICogQHBhcmFtIHtBcnJheX0gcHJvcHMuY2hpbGRyZW4gLSBjaGlsZCBlbGVtZW50cyBpbiB0aGUgZnJhZ21lbnRcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBGcmFnbWVudChwcm9wczogSnN4UHJvcHMpIHtcclxuICByZXR1cm4gbmV3IChjbGFzcyBleHRlbmRzIEpzeE5vZGUgaW1wbGVtZW50cyBKc3hOb2RlSW50ZXJmYWNlIHtcclxuICAgIHRvU3RyaW5nKCkge1xyXG4gICAgICByZXR1cm4gdGhpcy5wcm9wcy5jaGlsZHJlblxyXG4gICAgICAgIC5mbGF0KClcclxuICAgICAgICAuZmlsdGVyKHRydXRoeSlcclxuICAgICAgICAubWFwKChjaGlsZCkgPT5cclxuICAgICAgICAgIGNoaWxkIGluc3RhbmNlb2YgTm9kZVxyXG4gICAgICAgICAgICA/IGdldE91dGVySHRtbChjaGlsZClcclxuICAgICAgICAgICAgOiB0eXBlb2YgY2hpbGQgPT09IFwib2JqZWN0XCJcclxuICAgICAgICAgICAgPyBjaGlsZC50b1N0cmluZygpXHJcbiAgICAgICAgICAgIDogc2FuaXRpemUoY2hpbGQpXHJcbiAgICAgICAgKVxyXG4gICAgICAgIC5qb2luKFwiXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIGFzTm9kZSgpIHtcclxuICAgICAgY29uc3QgZnJhZ21lbnRzID0gdGhpcy5wcm9wcy5jaGlsZHJlblxyXG4gICAgICAgIC5mbGF0KClcclxuICAgICAgICAuZmlsdGVyKHRydXRoeSlcclxuICAgICAgICAubWFwKChpdGVtKSA9PlxyXG4gICAgICAgICAgaXRlbSBpbnN0YW5jZW9mIE5vZGVcclxuICAgICAgICAgICAgPyBpdGVtXHJcbiAgICAgICAgICAgIDogaXRlbSBpbnN0YW5jZW9mIEpzeE5vZGVcclxuICAgICAgICAgICAgPyBpdGVtLmFzTm9kZSgpXHJcbiAgICAgICAgICAgIDogaXRlbVxyXG4gICAgICAgICk7XHJcblxyXG4gICAgICBjb25zdCBkb2N1bWVudEZyYWdtZW50ID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO1xyXG5cclxuICAgICAgZG9jdW1lbnRGcmFnbWVudC5hcHBlbmQoLi4uZnJhZ21lbnRzKTtcclxuICAgICAgcmV0dXJuIGRvY3VtZW50RnJhZ21lbnQ7XHJcbiAgICB9XHJcblxyXG4gICAgYXNWTm9kZSgpIHtcclxuICAgICAgcmV0dXJuIGFzVk5vZGUoXCJfX0ZyYWdtZW50X19cIiwge1xyXG4gICAgICAgIGNoaWxkcmVuOiBwcm9wcy5jaGlsZHJlbixcclxuICAgICAgfSBhcyBKc3hQcm9wcyk7XHJcbiAgICB9XHJcblxyXG4gICAgW19jYWxsUmVmc10oKSB7XHJcbiAgICAgIHRoaXMucHJvcHMuY2hpbGRyZW5cclxuICAgICAgICAuZmlsdGVyKChjaGlsZCkgPT4gY2hpbGQgaW5zdGFuY2VvZiBKc3hOb2RlKVxyXG4gICAgICAgIC5mb3JFYWNoKChjaGlsZCkgPT4gKGNoaWxkIGFzIEpzeE5vZGVJbnRlcmZhY2UpW19jYWxsUmVmc10oKSk7XHJcbiAgICB9XHJcbiAgfSkocHJvcHMpO1xyXG59XHJcblxyXG4vLyBqc3ggaXMgY2FsbGVkIHdoZW4gdGhlIGVsZW1lbnQgaGFzIG9uZSBvciB6ZXJvIGNoaWxkcmVuXHJcbmV4cG9ydCBmdW5jdGlvbiBqc3goXHJcbiAgdGFnOiBzdHJpbmcgfCBGdW5jdGlvbixcclxuICBwcm9wczogQXR0cmlidXRlcyAmXHJcbiAgICBTcGVjaWFsQXR0cmlidXRlcyAmIHsgY2hpbGRyZW4/OiBzdHJpbmcgfCBOb2RlIHwgSnN4Tm9kZUludGVyZmFjZSB9XHJcbik6IEpzeE5vZGVJbnRlcmZhY2Uge1xyXG4gIC8vIEB0cy1pZ25vcmUgLSB3cmFwcGluZyB0aGUgY2hpbGRyZW4gYXMgYXJyYXkgdG8gcmUtdXNlIGpzeHMgbWV0aG9kXHJcbiAgcHJvcHMuY2hpbGRyZW4gPSBwcm9wcy5oYXNPd25Qcm9wZXJ0eShcImNoaWxkcmVuXCIpID8gW3Byb3BzLmNoaWxkcmVuXSA6IFtdO1xyXG5cclxuICByZXR1cm4ganN4cyh0YWcsIChwcm9wcyBhcyB1bmtub3duKSBhcyBKc3hQcm9wcyk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiByZW5kZXIgdGhlIGdpdmVuIG1hcmt1cCBpbnRvIHRoZSBnaXZlbiBkb20gbm9kZVxyXG4gKlxyXG4gKiBAcGFyYW0ge3N0cmluZ3xIVE1MRWxlbWVudHxKU1h9IG1hcmt1cCAtIGh0bWwgYXMgc3RyaW5nLCBodG1sIGVsZW1lbnQgb3IganN4IHRlbXBsYXRlXHJcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGRvbU5vZGUgLSBjb250YWluZXIgZm9yIHRoZSB0ZW1wbGF0ZSB0byBiZSByZW5kZXJlZCBpbnRvXHJcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW2FwcGVuZD1mYWxzZV0gLSBzaG91bGQgdGhlIHByb3ZpZGVkIG1hcmt1cCBiZSBhcHBlbmRlZCB0byB0aGUgZXhpc3RpbmcgbWFya3VwLCBvciBkZWZhdWx0IHJlcGxhY2UgaXRcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiByZW5kZXIoXHJcbiAgbWFya3VwOiBzdHJpbmcgfCBIVE1MRWxlbWVudCB8IEpzeE5vZGVJbnRlcmZhY2UsIC8vIEBUT0RPOiBzcGVjaWZpYyBzdXBwb3J0IGZvciBUZW1wbGF0ZT8gKC5jb250ZW50LmNsb25lKVxyXG4gIGRvbU5vZGU6IEhUTUxFbGVtZW50LFxyXG4gIGFwcGVuZDogYm9vbGVhbiA9IGZhbHNlXHJcbikge1xyXG4gIEFycmF5LmZyb20oZG9jdW1lbnQuYm9keS5xdWVyeVNlbGVjdG9yQWxsKFwiKlwiKSkuZm9yRWFjaChlbCA9PiBlbC5zdHlsZS5vdXRsaW5lID0gXCIxcHggZGFzaGVkIHJlZFwiKTtcclxuICBBcnJheS5mcm9tKGRvY3VtZW50LmJvZHkucXVlcnlTZWxlY3RvckFsbChcIipcIikpLmZvckVhY2goZWwgPT4gZWwuc3R5bGUuYmFja2dyb3VuZCA9IFwicGlua1wiKTtcclxuXHJcblxyXG4gIGNvbnN0IGlzUmVSZW5kZXIgPSByZW5kZXJlZFZUcmVlcy5oYXMoZG9tTm9kZSk7XHJcbiAgaWYgKCFhcHBlbmQgJiYgIWlzUmVSZW5kZXIpIGRvbU5vZGUuaW5uZXJIVE1MID0gXCJcIjtcclxuXHJcbiAgaWYgKHR5cGVvZiBtYXJrdXAgPT09IFwic3RyaW5nXCIpIHtcclxuICAgIGRvbU5vZGUuaW5zZXJ0QWRqYWNlbnRIVE1MKFwiYWZ0ZXJiZWdpblwiLCBtYXJrdXApO1xyXG4gIH0gZWxzZSBpZiAobWFya3VwIGluc3RhbmNlb2YgTm9kZSkge1xyXG4gICAgZG9tTm9kZS5pbnNlcnRBZGphY2VudEVsZW1lbnQoXCJhZnRlcmJlZ2luXCIsIG1hcmt1cCk7XHJcbiAgfSBlbHNlIGlmIChtYXJrdXAgaW5zdGFuY2VvZiBKc3hOb2RlKSB7XHJcbiAgICBzdmdDb250ZXh0ID0gZmFsc2U7XHJcbiAgICBjb25zdCB2VHJlZSA9IG1hcmt1cC5hc1ZOb2RlKCk7XHJcbiAgICBjb25zb2xlLmxvZyhcInZUcmVlOlwiLCB2VHJlZSk7XHJcblxyXG4gICAgaWYgKGlzUmVSZW5kZXIpIHtcclxuICAgICAgY29uc29sZS5sb2coXCJpcyByZS1yZW5kZXJcIik7XHJcbiAgICAgIGNvbnN0IG9sZFZUcmVlID0gcmVuZGVyZWRWVHJlZXMuZ2V0KGRvbU5vZGUpO1xyXG5cclxuICAgICAgY29uc29sZS5sb2coeyBvbGRWVHJlZSwgbmV3VlRyZWU6IHZUcmVlIH0pO1xyXG5cclxuICAgICAgLy8gZGlmZlxyXG4gICAgICBvbGRWVHJlZS5kaWZmQW5kUGF0Y2godlRyZWUpO1xyXG4gICAgICByZW5kZXJlZFZUcmVlcy5zZXQoZG9tTm9kZSwgdlRyZWUpO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgcmVuZGVyZWRWVHJlZXMuc2V0KGRvbU5vZGUsIHZUcmVlKTtcclxuICAgIGNvbnN0IGNvbnRlbnQgPSB2VHJlZS5hc05vZGUoKTtcclxuICAgIGRvbU5vZGUuYXBwZW5kKGNvbnRlbnQpO1xyXG4gICAgLy8vL21hcmt1cFtfY2FsbFJlZnNdKCk7XHJcbiAgfSBlbHNlIHtcclxuICAgIHRocm93IG5ldyBFcnJvcihcInJlbmRlciBtZXRob2QgY2FsbGVkIHdpdGggd3JvbmcgYXJndW1lbnQocylcIik7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gcmF3SHRtbChjb250ZW50OiBzdHJpbmcpOiBKc3hOb2RlSW50ZXJmYWNlIHtcclxuICByZXR1cm4gbmV3IChjbGFzcyBleHRlbmRzIEpzeE5vZGUgaW1wbGVtZW50cyBKc3hOb2RlSW50ZXJmYWNlIHtcclxuICAgIHRvU3RyaW5nKCkge1xyXG4gICAgICByZXR1cm4gY29udGVudDtcclxuICAgIH1cclxuXHJcbiAgICBhc05vZGUoKSB7XHJcbiAgICAgIGNvbnN0IHRlbXBsYXRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRlbXBsYXRlXCIpO1xyXG4gICAgICB0ZW1wbGF0ZS5pbm5lckhUTUwgPSBjb250ZW50O1xyXG4gICAgICByZXR1cm4gdGVtcGxhdGUuY29udGVudDtcclxuICAgIH1cclxuICAgIGFzVk5vZGUoKSB7XHJcbiAgICAgIHJldHVybiB7fTtcclxuICAgIH1cclxuXHJcbiAgICBbX2NhbGxSZWZzXSgpIHtcclxuICAgICAgLy8gbm9vcFxyXG4gICAgfVxyXG4gIH0pKHt9IGFzIEpzeFByb3BzKTtcclxufVxyXG5cclxuLy8gdlRyZWVcclxuIiwiaW1wb3J0IHsgcmVuZGVyLCByYXdIdG1sIH0gZnJvbSBcIi4vanN4L2pzeC1ydW50aW1lXCI7XHJcblxyXG5jb25zdCB4c3MgPSBcIjxpbWcgc3JjPXggb25lcnJvcj1cXFwiYWxlcnQoJ1hTUyBBdHRhY2snKVxcXCI+XCI7IC8vXCI8c2NyaXB0PmFsZXJ0KCctLi0nKTwvc2NyaXB0PlwiO1xyXG5cclxuZnVuY3Rpb24gUlRFKHByb3BzOiAvKnsgdHh0LCBcIm9uLWNsaWNrXCI6IG9uQ2xpY2sgfSovIHtcclxuICB0eHQ6IHN0cmluZztcclxuICByZWY/OiBGdW5jdGlvbjtcclxufSkge1xyXG4gIGNvbnNvbGUubG9nKFwib25DbGlja1wiLCBwcm9wc1tcIm9uLWNsaWNrXCJdKTtcclxuICByZXR1cm4gKFxyXG4gICAgPHAgcmVmPXsoZWw6IEhUTUxFbGVtZW50KSA9PiBjb25zb2xlLmxvZyhcIm15IGRpdiA6OnJlZjo6My4yXCIsIGVsKX0+XHJcbiAgICAgIHtwcm9wcy50eHR9XHJcbiAgICA8L3A+XHJcbiAgKTtcclxufVxyXG5cclxuZnVuY3Rpb24gQnV0dG9uKHtcclxuICBjaGlsZHJlbixcclxuICBkaXNhYmxlZCxcclxufToge1xyXG4gIGNoaWxkcmVuOiBhbnk7XHJcbiAgZGlzYWJsZWQ6IGJvb2xlYW47XHJcbiAgcmVmPzogRnVuY3Rpb247XHJcbn0pIHtcclxuICByZXR1cm4gKFxyXG4gICAgPGJ1dHRvblxyXG4gICAgICBkaXNhYmxlZD17ZGlzYWJsZWR9XHJcbiAgICAgIHJlZj17KGVsOiBIVE1MRWxlbWVudCkgPT4gY29uc29sZS5sb2coXCJteSBidXR0b24gOjpyZWY6OjFcIiwgZWwpfVxyXG4gICAgPlxyXG4gICAgICA8c3BhbiByZWY9eyhlbDogSFRNTEVsZW1lbnQpID0+IGNvbnNvbGUubG9nKFwibXkgYSA6OnJlZjo6MlwiLCBlbCl9PmE8L3NwYW4+XHJcbiAgICAgIHtjaGlsZHJlbn1cclxuICAgICAgPD5cclxuICAgICAgICA8c3BhbiByZWY9eyhlbDogSFRNTEVsZW1lbnQpID0+IGNvbnNvbGUubG9nKFwibXkgYSA6OnJlZjo6M1wiLCBlbCl9PlxyXG4gICAgICAgICAgYVxyXG4gICAgICAgIDwvc3Bhbj5cclxuICAgICAgPC8+XHJcbiAgICA8L2J1dHRvbj5cclxuICApO1xyXG59XHJcblxyXG5mdW5jdGlvbiByZWZsb2coZWw6IEhUTUxFbGVtZW50KSB7XHJcbiAgY29uc29sZS5sb2coXCJteSBpbm5lciBkaXY6OnJlZjo6OFwiLCBlbCk7XHJcbn1cclxuXHJcbi8qXHJcbmNvbnN0IG1hcmt1cCA9IChcclxuICA8PlxyXG4gICAgPGRpdlxyXG4gICAgICBjbGFzcz1cImZvb1wiXHJcbiAgICAgIHJlZj17KGVsOiBIVE1MRWxlbWVudCkgPT4gY29uc29sZS5sb2coXCJteSBkaXYgOjpyZWY6OjRcIiwgZWwpfVxyXG4gICAgLz5cclxuICAgIDxpbnB1dCBkaXNhYmxlZD17dHJ1ZX0gaGlkZGVuPXtmYWxzZX0gLz5cclxuICAgIDxCdXR0b25cclxuICAgICAgZGlzYWJsZWQ9e3RydWV9XHJcbiAgICAgIHJlZj17KGVsOiBIVE1MRWxlbWVudCkgPT4gY29uc29sZS5sb2coXCJteSBCVVRUT046OnJlZjo6NVwiLCBlbCl9XHJcbiAgICA+XHJcbiAgICAgIHRleHRcclxuICAgICAgPHBvcHVwLWluZm9cclxuICAgICAgICByZWY9eyhlbDogSFRNTEVsZW1lbnQpID0+IGNvbnNvbGUubG9nKFwic3BhbiBpbiBCVVRUT046OnJlZjo6NlwiLCBlbCl9XHJcbiAgICAgID5cclxuICAgICAgICBibGFcclxuICAgICAgPC9wb3B1cC1pbmZvPlxyXG4gICAgPC9CdXR0b24+XHJcbiAgICA8UlRFXHJcbiAgICAgIHR4dD1cImxlIHRleHRcIlxyXG4gICAgICByZWY9eyhlbDogSFRNTEVsZW1lbnQpID0+IGNvbnNvbGUubG9nKFwibXkgZGl2IDo6cmVmOjozLjFcIiwgZWwpfVxyXG4gICAgICBvbi1jbGljaz17KGU6IEhUTUxFbGVtZW50KSA9PiBjb25zb2xlLmxvZyhlKX1cclxuICAgIC8+XHJcbiAgICB7eHNzfVxyXG4gICAge3Jhd0h0bWwoYDxvbD48bGk+cmF3IGh0bWw8L2xpPjwvb2w+YCl9XHJcbiAgICA8ZGl2XHJcbiAgICAgIGNsYXNzPVwiYmFtXCJcclxuICAgICAgcmVmPXsoZWw6IEhUTUxFbGVtZW50KSA9PiBjb25zb2xlLmxvZyhcIm15IGRpdjo6cmVmOjo3XCIsIGVsKX1cclxuICAgID5cclxuICAgICAgPGRpdj5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwiYmFyXCIgb24tY2xpY2s9eyhlKSA9PiBjb25zb2xlLmxvZyhlKX0gcmVmPXtyZWZsb2d9PlxyXG4gICAgICAgICAgY2xpY2sgTUVcclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8ZGl2IHN0eWxlPXt7IG91dGxpbmU6IFwiMXB4IHNvbGlkIHJlZDtcIiB9fT5cclxuICAgICAgICAgIHtkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI29sZFwiKX1cclxuICAgICAgICAgIHtudWxsfVxyXG4gICAgICAgICAge1swLCAxXS5tYXAoKG4pID0+IChcclxuICAgICAgICAgICAgPHNwYW4+e259PC9zcGFuPlxyXG4gICAgICAgICAgKSl9XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgPC9kaXY+XHJcbiAgPC8+XHJcbik7XHJcblxyXG4qL1xyXG5cclxuLypcclxuY29uc3QgbWFya3VwID0gKFxyXG4gIDxCdXR0b24gZGlzYWJsZWQ9e3RydWV9PlxyXG4gICAgICA8Ym9sZCByZWY9e3JlZmxvZ30+LS1JTk5FUi0tPC9ib2xkPlxyXG4gIDwvQnV0dG9uPlxyXG4pOyovXHJcbi8qXHJcblxyXG5jb25zdCBtYXJrdXAgPSAoXHJcbiAgPGRpdiBjbGFzcz1cImZvb1wiIHJlZj17KGVsOiBIVE1MRWxlbWVudCkgPT4gY29uc29sZS5sb2coXCJteSBkaXY6OnJlZjo6XCIsIGVsKX0+XHJcbiAgICA8ZGl2PlxyXG4gICAgICA8ZGl2IGNsYXNzPVwiYmFyXCIgcmVmPXsoZWw6IEhUTUxFbGVtZW50KSA9PiBjb25zb2xlLmxvZyhcIm15IGlubmVyIGRpdjo6cmVmOjpcIiwgZWwpfSAvPlxyXG4gICAgPC9kaXY+XHJcbiAgICA8QnV0dG9uIGRpc2FibGVkPXt0cnVlfT48L0J1dHRvbj5cclxuICA8L2Rpdj5cclxuKTtcclxuKi9cclxuLypcclxuY29uc3QgbWFya3VwID0gKFxyXG4gIDxhPlxyXG4gICAgPGI+XHJcbiAgICAgIDxjIGNsYXNzPVwiYmFyXCIgcmVmPXtyZWZsb2d9IC8+XHJcbiAgICA8L2I+XHJcbiAgPC9hPlxyXG4pO1xyXG4qL1xyXG5cclxuZnVuY3Rpb24gU3Bhbih7IG1vZGUgfTogeyBtb2RlOiBhbnkgfSkge1xyXG4gIHJldHVybiBtb2RlID09PSAxID8gKFxyXG4gICAgPGRpdj5cclxuICAgICAgPHNwYW4gaWQ9XCJpbm5lclwiIG9sZD17dHJ1ZX0+XHJcbiAgICAgICAgU3Bhbi1Db21wLS1vbGRcclxuICAgICAgPC9zcGFuPlxyXG4gICAgICA8aDM+dG8gYmUgcmVtb3ZlZDwvaDM+XHJcbiAgICA8L2Rpdj5cclxuICApIDogKFxyXG4gICAgPGRpdj5cclxuICAgICAgPHAgaWQ9XCJpbm5lclwiIG5ldz17dHJ1ZX0+XHJcbiAgICAgICAgU3Bhbi1Db21wLS1uZXdzXHJcbiAgICAgIDwvcD5cclxuICAgIDwvZGl2PlxyXG4gICk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIENvbXAoe251bX0pIHtcclxuICBpZiAobnVtID09PSAxKSByZXR1cm4gbnVsbDtcclxuICByZXR1cm4gPGRpdj48cD5jb21wPC9wPjwvZGl2PlxyXG59XHJcblxyXG5jb25zdCBtYXJrdXAxID0gKG51bTogYW55KSA9PiAoXHJcbiAgPGRpdiBpZD1cIm91dGVyXCIgZGF0YS1mb289XCJiYXJcIiBkYXRhLXZhcj17bnVtfT5cclxuICAgIDxoMz5zaG91bGQgZ2V0IDIgLTogMzwvaDM+XHJcbiAgICB7bnVtID09PSAxID8gKFxyXG4gICAgICA8dWwgY2xhc3M9XCJ1bC1jbGFzc1wiPlxyXG4gICAgICAgIDxsaT5UZXh0IDEgPC9saT5cclxuICAgICAgICA8bGk+VGV4dCAyIDwvbGk+XHJcbiAgICAgIDwvdWw+XHJcbiAgICApIDogKFxyXG4gICAgICA8dWwgY2xhc3M9XCJ1bC1jbGFzc1wiPlxyXG4gICAgICAgIDxsaT5UZXh0IDMgPC9saT5cclxuICAgICAgICA8bGk+VGV4dCAyIDwvbGk+XHJcbiAgICAgICAgPGxpPlRleHQgMSA8L2xpPlxyXG4gICAgICA8L3VsPlxyXG4gICAgKX1cclxuICAgIDxoMz5zaG91bGQgZ2V0IDMgLTogMjwvaDM+XHJcbiAgICB7bnVtID09PSAxID8gKFxyXG4gICAgICA8dWwgY2xhc3M9XCJ1bC1jbGFzc1wiPlxyXG4gICAgICAgIDxsaT5UZXh0IDEgPC9saT5cclxuICAgICAgICA8bGk+VGV4dCAyIDwvbGk+XHJcbiAgICAgICAgPGxpPlRleHQgMyA8L2xpPlxyXG4gICAgICA8L3VsPlxyXG4gICAgKSA6IChcclxuICAgICAgPHVsIGNsYXNzPVwidWwtY2xhc3NcIj5cclxuICAgICAgICA8bGk+VGV4dCAxIDwvbGk+XHJcbiAgICAgICAgPGxpPlRleHQgMiA8L2xpPlxyXG4gICAgICA8L3VsPlxyXG4gICAgKX1cclxuICAgIHtudW0gPT09IDEgPyBudWxsIDogPHA+bmV3IHJlbmRlcjwvcD59XHJcbiAgICA8ZGl2PlxyXG4gICAgICA8c3Bhbj5zcGFuLWNvbnRlbnQ8L3NwYW4+XHJcbiAgICA8L2Rpdj5cclxuICAgIDxTcGFuIG1vZGU9e251bX0gLz5cclxuICAgIHsvKmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjb2xkXCIpKi99XHJcbiAgICA8PkZyYWdtZW50LWl0ZW08Lz5cclxuICAgIDxzdmdcclxuICAgICAgdmlld0JveD1cIjAgMCAzMDAgMTAwXCJcclxuICAgICAgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiXHJcbiAgICAgIHN0cm9rZT1cInJlZFwiXHJcbiAgICAgIGZpbGw9XCJncmV5XCJcclxuICAgID5cclxuICAgICAgPGNpcmNsZSBjeD1cIjUwXCIgY3k9XCI1MFwiIHI9XCI0MFwiIC8+XHJcbiAgICAgIDxjaXJjbGUgY3g9XCIxNTBcIiBjeT1cIjUwXCIgcj1cIjRcIiAvPlxyXG5cclxuICAgICAgPHN2ZyB2aWV3Qm94PVwiMCAwIDEwIDEwXCIgeD1cIjIwMFwiIHdpZHRoPVwiMTAwXCI+XHJcbiAgICAgICAgPGNpcmNsZSBjeD1cIjVcIiBjeT1cIjVcIiByPVwiNFwiIC8+XHJcbiAgICAgIDwvc3ZnPlxyXG4gICAgPC9zdmc+XHJcbiAgPC9kaXY+XHJcbik7XHJcblxyXG5mdW5jdGlvbiBtYXJrdXAobnVtOiBhbnkpIHtcclxuICByZXR1cm4gKFxyXG4gICAgPGRpdiBpZD1cIm91dGVyXCI+XHJcbiAgICAgIDxoMT5zdGF0aWM8L2gxPlxyXG4gICAgICA8aDE+ZHluYW1pYyB2YWw6IHtudW19PC9oMT5cclxuICAgICAge251bSA9PT0gMSA/IDxoMT5vbGQ8L2gxPiA6IGZhbHNlfVxyXG4gICAgICB7bnVtID09PSAxID8gPD48aDE+ZnJhZyBvbGQ8L2gxPjxzcGFuPmYgc3Agb2xkPC9zcGFuPjwvPiA6IDw+PGgxPmZyYWcgbmV3PC9oMT48Lz59XHJcbiAgICAgIDxDb21wIG51bT17bnVtfSAvPlxyXG4gICAgPC9kaXY+XHJcbiAgKTtcclxufVxyXG5cclxuLy9jb25zb2xlLmxvZyhtYXJrdXApO1xyXG4vL3dpbmRvdy5tYXJrdXAgPSBtYXJrdXA7XHJcblxyXG5jbGFzcyBQb3BVcEluZm8gZXh0ZW5kcyBIVE1MRWxlbWVudCB7XHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAvLyBBbHdheXMgY2FsbCBzdXBlciBmaXJzdCBpbiBjb25zdHJ1Y3RvclxyXG4gICAgc3VwZXIoKTtcclxuXHJcbiAgICAvLyB3cml0ZSBlbGVtZW50IGZ1bmN0aW9uYWxpdHkgaW4gaGVyZVxyXG5cclxuICAgIGNvbnNvbGUubG9nKFwiIyMjIyMjIyMjIyMjIyMjIyNjdG9yIENFXCIpO1xyXG4gIH1cclxuXHJcbiAgY29ubmVjdGVkQ2FsbGJhY2soKSB7XHJcbiAgICBjb25zb2xlLmxvZyhcIiMjIyMjIyMjIyMjIyMjIyMjQ3VzdG9tIHNxdWFyZSBlbGVtZW50IGFkZGVkIHRvIHBhZ2UuXCIpO1xyXG4gIH1cclxufVxyXG5cclxuY3VzdG9tRWxlbWVudHMuZGVmaW5lKFwicG9wdXAtaW5mb1wiLCBQb3BVcEluZm8pO1xyXG5cclxuZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNvbGRcIikhLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBjb25zb2xlLmxvZyk7XHJcblxyXG4vL2RvY3VtZW50LmJvZHkuaW5uZXJIVE1MID0gbWFya3VwO1xyXG5yZW5kZXIobWFya3VwKDEpLCBkb2N1bWVudC5ib2R5KTtcclxuZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJvdXRlclwiKT8uc2V0QXR0cmlidXRlKFwiZGF0YS1mb29cIiwgXCJtb2RcIik7XHJcblxyXG4vL2RvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaW5uZXJcIik/LnNldEF0dHJpYnV0ZShcImRhdGEtZm9vXCIsIFwibW9kXCIpO1xyXG4vL3JlbmRlcihtYXJrdXAoMiksIGRvY3VtZW50LmJvZHkpO1xyXG4vL3JlbmRlcihtYXJrdXAsIGRvY3VtZW50LmJvZHksIHRydWUpO1xyXG5cclxuXHJcbndpbmRvdy5yZVJlbmRlcjEgPSAoKSA9PiByZW5kZXIobWFya3VwKDEpLCBkb2N1bWVudC5ib2R5KTtcclxud2luZG93LnJlUmVuZGVyMiA9ICgpID0+IHJlbmRlcihtYXJrdXAoMiksIGRvY3VtZW50LmJvZHkpOyJdLCJzb3VyY2VSb290IjoiIn0=