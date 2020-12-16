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
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./examples/main.tsx":
/*!***************************!*\
  !*** ./examples/main.tsx ***!
  \***************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./jsx/jsx-runtime */ "./jsx/jsx-runtime.ts");




var _temp;


const $ssrElement = document.querySelector("#server-side-rendered-html");

function Spinner() {
  return Object(C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("p", {
    children: "Loading ..."
  });
}

new (_temp = class {
  get value() {
    return this._value;
  }

  set value(value) {
    this._value = value;
    this.render();
  }

  constructor() {
    this._value = 0;
    this.inputRef = Object(C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["createRef"])();
    this.dataFetch = void 0;
    this.dataFetch = fetch("./mock.json").then(resp => resp.json());
    this.render();
  }

  render() {
    Object(C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["render"])(Object(C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])("div", {
      children: [Object(C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])("div", {
        style: {
          display: "grid",
          "grid-template-columns": "1fr 1fr 1fr",
          "grid-gap": "12px"
        },
        children: [Object(C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("button", {
          "on-click": () => this.value--,
          children: "-"
        }), Object(C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("input", {
          value: this.value,
          "on-change": e => this.value = parseFloat(e.currentTarget.value),
          type: "number",
          ref: this.inputRef
        }), Object(C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("button", {
          "on-click": () => this.value++,
          children: "+"
        })]
      }), Object(C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("p", {
        "on-click": () => this.inputRef.current.focus(),
        style: "cursor: pointer",
        children: "go to input field"
      }), this.value > 2 && Object(C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])("p", {
        children: ["slow down! more than ", Object(C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("b", {
          children: "2"
        }), "?"]
      }), Object(C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["Suspense"], {
        placeholder: Object(C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(Spinner, {}),
        promise: this.dataFetch,
        template: data => Object(C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])(C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["Fragment"], {
          children: [Object(C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("p", {
            children: " results: "
          }), Object(C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("ul", {
            children: data.items.map(item => Object(C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("li", {
              children: Object(C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["rawHtml"])(item.rte)
            }))
          })]
        })
      }), $ssrElement]
    }), document.querySelector("#root"));
  }

}, _temp)();

/***/ }),

/***/ "./jsx/jsx-runtime.ts":
/*!****************************!*\
  !*** ./jsx/jsx-runtime.ts ***!
  \****************************/
/*! exports provided: jsxs, Fragment, jsx, render, SuspenseVNode, rawHtml, Suspense, createRef */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "jsxs", function() { return jsxs; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Fragment", function() { return Fragment; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "jsx", function() { return jsx; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SuspenseVNode", function() { return SuspenseVNode; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "rawHtml", function() { return rawHtml; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Suspense", function() { return Suspense; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createRef", function() { return createRef; });
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
  } // `.node` is only on "Text" and "Element" type VNode, and only Element has children


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
  return vNode.children.map(childNode => {
    if (childNode === alwaysAllow) return childNode;
    if (childNode.node) return childNode;
    return getChildrenWithNodes(childNode, alwaysAllow);
  }).flat(Infinity);
}
/**
 * returns a tuple of the closest ancestor which has a DOM Node,
 * and the node which has a DOM node and is rendered as the next sibling for the provided node in the DOM.
 * Or null when it is the last child itself
 *
 * @param {VNodeInterface} vNode
 * @returns {([Node, Node | null])}
 */


function getParentAndNextSibling(vNode) {
  // node ancestor with Element,
  const parentWithElement = getParentElementNode(vNode);
  const siblings = getChildrenWithNodes(parentWithElement, vNode);
  const indexOfNodeInSiblingsList = siblings.indexOf(vNode); // no prev sibling, put before any other element (or null if parent has no children yet)

  if (indexOfNodeInSiblingsList === 0) {
    return [parentWithElement.node, parentWithElement.node.firstChild];
  }

  const prevSibling = siblings[indexOfNodeInSiblingsList - 1];
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

  if (element instanceof DocumentFragment) {
    return Array.from(element.childNodes).map(el => getOuterHtml(el)).join("");
  } // shouldn't reach this point


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

    if (key === "style" && typeof value === "object") {
      value = Object.entries(value) // ignore stuff like `{background: active && "red"}` when `active === false / null / undefined`
      .filter(([, v]) => truthy(v)) // currently supports "background-color" not "backgroundColor"
      .map(([k, v]) => `${k}: ${v}`).join("; ");
    } // (class:) ["btn", "red"] ==> "btn red"


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
  } // remember if the svg context was set for this node, and replace after generating all children
  // currently not supporting the `is` option for Customized built-in elements


  const node = svgContext ? document.createElementNS("http://www.w3.org/2000/svg", tag) : document.createElement(tag); // add attributes, event listeners etc.

  ElementVNode.addProps(node, props);
  node.append(...children // .flat()
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
      // @ts-ignore - ElementVNode has the tag property, other are undefined
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
    if (this.node.parentNode) {
      this.node.parentNode.removeChild(this.node);
    } else {
      console.warn("jsx-runtime: can't remove", this);
    }
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

  static addProps(element, newProps, oldProps) {
    const isDiff = typeof oldProps !== "undefined";
    if (!isDiff) oldProps = {}; // iterate over all modified new and old properties and set/remove/update them

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
      if (propName === "style" && typeof newValue === "object") {
        newValue = Object.entries(newValue).filter(([, v]) => truthy(v)).map(([k, v]) => `${k}: ${v}`).join("; ");
      } // (class:) ["btn", "red"] ==> "btn red"


      if (propName === "class" && Array.isArray(newValue)) {
        newValue = newValue.join(" ");
      } // props starting with "on-" are event listeners


      if (propName.startsWith("on-") && (typeof newValue === "function" || typeof newValue === "object" || typeof oldValue === "function" || typeof oldValue === "object")) {
        // remove leading "on-""
        const event = propName.replace(/^on-/, ""); // key has the form of "on-change". value is the callback function or an object implementing {EventListener} interface

        if (typeof newValue === "function" || typeof newValue === "object") {
          element.addEventListener(event, newValue);
        }

        if (typeof oldValue === "function" || typeof oldValue === "object") {
          element.removeEventListener(event, oldValue);
        }
      } else if (propName === "ref" && typeof newValue === "function") {
        refsToCall.push(() => newValue(element));
      } // old ref isn't unset
      // the `checked` and `value` attribute on input elements will update the `defaultChecked` and `defaultValue` property.
      // also possible to test if class has the property and always set it via prop instead of attribute
      // but there are some ready only properties. and unclear if our custom elements always have a setter when there is a getter for some props
      else if (isDiff && (propName === "checked" || propName === "value")) {
          // @ts-ignore - e.g. input elements need checked set as property not only attribute when it is changes
          element[propName] = newValue;
        } // boolean attribute set without value
        else if (newValue === true) element.setAttribute(propName, ""); // remove old attributes which are false now
          else if (!truthy(newValue)) element.removeAttribute(propName); // update to new value as string
            else if (typeof newValue === "string" || typeof newValue === "number") {
                element.setAttribute(propName, String(newValue));
              } // @ts-ignore - providing the value as property to html element
              else element[propName] = newValue;
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
    };
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
    this.node.parentNode.removeChild(this.node);
  }

} // V-Node for `null`, `false` or `undefined` in jsx elements


class NullVNode extends VNode {
  constructor() {
    super();
    this.type = "Null";
    this.children = [];
    this.parent = null;
  }

  asNode() {
    // return null; // return empty fragment?
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
    let ref = undefined;

    if (props.ref) {
      ref = props.ref;
      delete props.ref;
    }

    const result = tag(props);

    if (result instanceof VNode) {
      if (typeof ref === "function") {
        refsToCall.push(() => {
          // @ts-ignore node property might exist or not. this is checked here
          const vNode = result.node ? result : getChildrenWithNodes(result)[0]; // @ts-ignore vNode with node is returned

          if (vNode) ref(vNode.node);
        });
      }

      return result;
    }

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
    children,
    props: attr
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
 * @param {JSXChild} markup - html as string, html element or jsx template
 * @param {HTMLElement} domNode - container for the template to be rendered into
 * @param {boolean} [append=false] - should the provided markup be appended to the existing markup, or default replace it
 */

function render(markup, domNode, append = false) {
  // the content of the given DOM Node was already rendered by jsx-runtime, and it only needs to be updated
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
} // provides component to autonomous update its content when provided promise resolved

class SuspenseVNode extends VNode {
  // provided promise is resolved and content updated
  // V-Node is already removed from node because of a re-render
  constructor({
    placeholder,
    promise,
    template
  }) {
    super();
    this.type = "Suspense";
    this.parent = null;
    this.children = void 0;
    this.placeholder = void 0;
    this.promise = void 0;
    this.template = void 0;
    this.isResolved = false;
    this.isRemoved = false;
    this.placeholder = placeholder;
    this.promise = promise;
    this.template = template;
    const child = new FragmentVNode([placeholder]);
    child.parent = this;
    this.children = [child];
  }

  asNode() {
    this.waitAndReRender();
    return this.children[0].asNode();
  }

  waitAndReRender() {
    this.promise.then(value => {
      if (this.isRemoved) return;
      this.isResolved = true;
      const contentMarkup = this.template(value);
      const newContent = new FragmentVNode([contentMarkup]);
      newContent.parent = this;
      this.children[0].diffAndPatch(newContent);
      this.children = [newContent];
    });
  } // only returning the placeholder.
  // not automatically rendering when promise resolves


  toString() {
    return this.placeholder ? this.placeholder.toString() : "";
  }

  removeFromDOM() {
    this.isRemoved = true;
    this.children.forEach(childVNode => childVNode.removeFromDOM());
  }

  diffAndPatch(newNode) {
    if (!this.isResolved) {
      // patches the placeholder with each other
      diffAndPatchChildren(this, newNode);
      newNode.waitAndReRender();
    } // already resolved, promise but has been changed.
    // start new with the placeholder
    else if (this.promise !== newNode.promise) {
        this.removeFromDOM();
        insertNewItem(newNode);
      } // already resolved, promise still the same.
      // diff and patch the template results
      else {
          newNode.promise.then(value => {
            newNode.isResolved = true;
            const contentMarkup = newNode.template(value);
            const newContent = new FragmentVNode([contentMarkup]);
            newContent.parent = newNode;
            newNode.children = [newContent];
            diffAndPatchChildren(this, newNode);
          });
        } // current Suspense Node is not in use any more


    this.isRemoved = true;
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

      if (this.childNodes.length) {
        this.node = this.childNodes[this.childNodes.length - 1];
      }

      return documentFragment;
    }

  }, _temp)(content);
}
/**
 *
 * @param param0
 * @example
 *   <Suspense
 *     placeholder={<PlaceholderTableRows />}
 *     promise={pendingRequest}
 *     template={(response) =>
 *       <TableRows rows={response.rows} />
 *     }
 *   />
 */

function Suspense({
  placeholder,
  promise,
  template
}) {
  return new SuspenseVNode({
    placeholder,
    promise,
    template
  });
}
/**
 * @example
 *  import { createRef } from "./jsx-runtime";
 *  function Comp() {
 *    const ref = createRef<HTMLInputElement>();
 *
 *    return (
 *      <>
 *        <input ref={ref} />
 *        <my-label on-click={() => ref.current.focus() } />
 *      </>
 *    );
 *  }
 */

function createRef() {
  const result = function (el) {
    result.current = el;
  };

  result.current = null;
  return result;
}

/***/ }),

/***/ 1:
/*!*********************************!*\
  !*** multi ./examples/main.tsx ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./examples/main.tsx */"./examples/main.tsx");


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vZXhhbXBsZXMvbWFpbi50c3giLCJ3ZWJwYWNrOi8vLy4vanN4L2pzeC1ydW50aW1lLnRzIl0sIm5hbWVzIjpbIiRzc3JFbGVtZW50IiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwiU3Bpbm5lciIsInZhbHVlIiwiX3ZhbHVlIiwicmVuZGVyIiwiY29uc3RydWN0b3IiLCJpbnB1dFJlZiIsImNyZWF0ZVJlZiIsImRhdGFGZXRjaCIsImZldGNoIiwidGhlbiIsInJlc3AiLCJqc29uIiwiZGlzcGxheSIsImUiLCJwYXJzZUZsb2F0IiwiY3VycmVudFRhcmdldCIsImN1cnJlbnQiLCJmb2N1cyIsImRhdGEiLCJpdGVtcyIsIm1hcCIsIml0ZW0iLCJyYXdIdG1sIiwicnRlIiwicmVuZGVyZWRWVHJlZXMiLCJXZWFrTWFwIiwicmVmc1RvQ2FsbCIsImdldFBhcmVudEVsZW1lbnROb2RlIiwidk5vZGUiLCJwYXJlbnQiLCJub2RlIiwiZ2V0Q2hpbGRyZW5XaXRoTm9kZXMiLCJhbHdheXNBbGxvdyIsImNoaWxkcmVuIiwiY2hpbGROb2RlIiwiZmxhdCIsIkluZmluaXR5IiwiZ2V0UGFyZW50QW5kTmV4dFNpYmxpbmciLCJwYXJlbnRXaXRoRWxlbWVudCIsInNpYmxpbmdzIiwiaW5kZXhPZk5vZGVJblNpYmxpbmdzTGlzdCIsImluZGV4T2YiLCJmaXJzdENoaWxkIiwicHJldlNpYmxpbmciLCJuZXh0U2libGluZ05vZGUiLCJuZXh0U2libGluZyIsInRydXRoeSIsInVuZGVmaW5lZCIsInNhbml0aXplIiwidGV4dCIsImRpdiIsImNyZWF0ZUVsZW1lbnQiLCJpbm5lclRleHQiLCJpbm5lckhUTUwiLCJnZXRPdXRlckh0bWwiLCJlbGVtZW50IiwiRWxlbWVudCIsIm91dGVySFRNTCIsIlRleHQiLCJ3aG9sZVRleHQiLCJEb2N1bWVudEZyYWdtZW50IiwiQXJyYXkiLCJmcm9tIiwiY2hpbGROb2RlcyIsImVsIiwiam9pbiIsImNvbnNvbGUiLCJ3YXJuIiwiYXNIdG1sU3RyaW5nIiwidGFnIiwicHJvcHMiLCJhdHRyaWJ1dGVzIiwiT2JqZWN0IiwiZW50cmllcyIsImZpbHRlciIsImtleSIsInYiLCJrIiwiaXNBcnJheSIsImNvbnRlbnQiLCJjaGlsZCIsInRvU3RyaW5nIiwiYXNOb2RlIiwic3ZnQ29udGV4dCIsImZyYWdtZW50cyIsImRvY3VtZW50RnJhZ21lbnQiLCJjcmVhdGVEb2N1bWVudEZyYWdtZW50IiwiYXBwZW5kIiwiY3JlYXRlRWxlbWVudE5TIiwiRWxlbWVudFZOb2RlIiwiYWRkUHJvcHMiLCJpbnNlcnROZXdJdGVtIiwibmV3Tm9kZSIsImluc2VydEJlZm9yZSIsImRpZmZBbmRQYXRjaENoaWxkcmVuIiwib2xkTm9kZSIsImZvckVhY2giLCJvbGRDaGlsZCIsIml4IiwibmV3Q2hpbGQiLCJyZW1vdmVGcm9tRE9NIiwidHlwZSIsImRpZmZBbmRQYXRjaCIsIm5ld0l0ZW1zIiwic2xpY2UiLCJsZW5ndGgiLCJWTm9kZSIsIkZyYWdtZW50Vk5vZGUiLCJOb2RlIiwiTGl2ZU5vZGVWTm9kZSIsIk51bGxWTm9kZSIsIlRleHRWTm9kZSIsInNldCIsInBhcmVudE5vZGUiLCJyZW1vdmVDaGlsZCIsInJlcGxhY2VXaXRoIiwiZnJvbUV4aXN0aW5nRWxlbWVudE5vZGUiLCJuZXdWTm9kZSIsImFzc2lnbiIsIm5ld1Byb3BzIiwib2xkUHJvcHMiLCJpc0RpZmYiLCJTZXQiLCJrZXlzIiwicHJvcE5hbWUiLCJvbGRWYWx1ZSIsIm5ld1ZhbHVlIiwic3RhcnRzV2l0aCIsImV2ZW50IiwicmVwbGFjZSIsImFkZEV2ZW50TGlzdGVuZXIiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwicHVzaCIsInNldEF0dHJpYnV0ZSIsInJlbW92ZUF0dHJpYnV0ZSIsIlN0cmluZyIsInRleHROb2RlIiwiY3JlYXRlVGV4dE5vZGUiLCJub2RlVmFsdWUiLCJuZXdOb2RlMiIsInBhcmVudEVsZW1lbnQiLCJSb290Vk5vZGUiLCJkb21Ob2RlIiwicmVtb3ZlIiwiYXNWTm9kZSIsInJlZiIsInJlc3VsdCIsImF0dHIiLCJqc3hzIiwiRnJhZ21lbnQiLCJqc3giLCJoYXNPd25Qcm9wZXJ0eSIsIm1hcmt1cCIsImlzUmVSZW5kZXIiLCJoYXMiLCJ2VHJlZSIsIm9sZFZUcmVlIiwiZ2V0Iiwic3BsaWNlIiwiRXJyb3IiLCJTdXNwZW5zZVZOb2RlIiwicGxhY2Vob2xkZXIiLCJwcm9taXNlIiwidGVtcGxhdGUiLCJpc1Jlc29sdmVkIiwiaXNSZW1vdmVkIiwid2FpdEFuZFJlUmVuZGVyIiwiY29udGVudE1hcmt1cCIsIm5ld0NvbnRlbnQiLCJjaGlsZFZOb2RlIiwiUmF3SHRtbCIsIlN1c3BlbnNlIl0sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtRQUNBOzs7UUFHQTtRQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNsRkE7QUFFQSxNQUFNQSxXQUFXLEdBQUdDLFFBQVEsQ0FBQ0MsYUFBVCxDQUF1Qiw0QkFBdkIsQ0FBcEI7O0FBSUEsU0FBU0MsT0FBVCxHQUFtQjtBQUNqQixTQUFPO0FBQUE7QUFBQSxJQUFQO0FBQ0Q7O0FBRUQsYUFBSyxNQUFNO0FBRVQsTUFBSUMsS0FBSixHQUFZO0FBQ1YsV0FBTyxLQUFLQyxNQUFaO0FBQ0Q7O0FBQ0QsTUFBSUQsS0FBSixDQUFVQSxLQUFWLEVBQWlCO0FBQ2YsU0FBS0MsTUFBTCxHQUFjRCxLQUFkO0FBQ0EsU0FBS0UsTUFBTDtBQUNEOztBQUtEQyxhQUFXLEdBQUc7QUFBQSxTQVpkRixNQVljLEdBWkwsQ0FZSztBQUFBLFNBSGRHLFFBR2MsR0FISEMsc0ZBQVMsRUFHTjtBQUFBLFNBRmRDLFNBRWM7QUFDWixTQUFLQSxTQUFMLEdBQWlCQyxLQUFLLENBQUMsYUFBRCxDQUFMLENBQXFCQyxJQUFyQixDQUEwQkMsSUFBSSxJQUFJQSxJQUFJLENBQUNDLElBQUwsRUFBbEMsQ0FBakI7QUFFQSxTQUFLUixNQUFMO0FBQ0Q7O0FBRURBLFFBQU0sR0FBRztBQUNQQSx1RkFBTSxDQUNKO0FBQUEsaUJBRUU7QUFBSyxhQUFLLEVBQUU7QUFBQ1MsaUJBQU8sRUFBRSxNQUFWO0FBQWtCLG1DQUF5QixhQUEzQztBQUEwRCxzQkFBWTtBQUF0RSxTQUFaO0FBQUEsbUJBRUU7QUFBUSxzQkFBVSxNQUFNLEtBQUtYLEtBQUwsRUFBeEI7QUFBQTtBQUFBLFVBRkYsRUFHRTtBQUNFLGVBQUssRUFBRSxLQUFLQSxLQURkO0FBRUUsdUJBQVlZLENBQUQsSUFBb0IsS0FBS1osS0FBTCxHQUFhYSxVQUFVLENBQUVELENBQUMsQ0FBQ0UsYUFBSCxDQUFzQ2QsS0FBdkMsQ0FGeEQ7QUFHRSxjQUFJLEVBQUMsUUFIUDtBQUlFLGFBQUcsRUFBRSxLQUFLSTtBQUpaLFVBSEYsRUFTRTtBQUFRLHNCQUFVLE1BQU0sS0FBS0osS0FBTCxFQUF4QjtBQUFBO0FBQUEsVUFURjtBQUFBLFFBRkYsRUFlRTtBQUFHLG9CQUFVLE1BQU0sS0FBS0ksUUFBTCxDQUFjVyxPQUFkLENBQXVCQyxLQUF2QixFQUFuQjtBQUFtRCxhQUFLLEVBQUMsaUJBQXpEO0FBQUE7QUFBQSxRQWZGLEVBb0JHLEtBQUtoQixLQUFMLEdBQWEsQ0FBYixJQUFrQjtBQUFBLDRDQUF3QjtBQUFBO0FBQUEsVUFBeEI7QUFBQSxRQXBCckIsRUF1QkUsaUZBQUMsNkVBQUQ7QUFDRSxtQkFBVyxFQUFFLGlGQUFDLE9BQUQsS0FEZjtBQUVFLGVBQU8sRUFBRSxLQUFLTSxTQUZoQjtBQUdFLGdCQUFRLEVBQUdXLElBQUQsSUFDUjtBQUFBLHFCQUNFO0FBQUE7QUFBQSxZQURGLEVBRUU7QUFBQSxzQkFDR0EsSUFBSSxDQUFDQyxLQUFMLENBQVdDLEdBQVgsQ0FBZUMsSUFBSSxJQUNsQjtBQUFBLHdCQUFLQyxvRkFBTyxDQUFDRCxJQUFJLENBQUNFLEdBQU47QUFBWixjQUREO0FBREgsWUFGRjtBQUFBO0FBSkosUUF2QkYsRUFzQ0cxQixXQXRDSDtBQUFBLE1BREksRUF5Q0pDLFFBQVEsQ0FBQ0MsYUFBVCxDQUF1QixPQUF2QixDQXpDSSxDQUFOO0FBMkNEOztBQS9EUSxDQUFYLFc7Ozs7Ozs7Ozs7OztBQ1ZBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOzs7OztBQU9BO0FBQ0EsTUFBTXlCLGNBQWMsR0FBRyxJQUFJQyxPQUFKLEVBQXZCLEMsQ0FDQTs7QUFDQSxNQUFNQyxVQUE2QixHQUFHLEVBQXRDLEMsQ0FFQTtBQUNBO0FBQ0E7O0FBZ0NBOzs7O0FBSUEsU0FBU0Msb0JBQVQsQ0FBOEJDLEtBQTlCLEVBQW1FO0FBQ2pFLFNBQU9BLEtBQUssQ0FBQ0MsTUFBYixFQUFxQjtBQUNuQkQsU0FBSyxHQUFHQSxLQUFLLENBQUNDLE1BQWQ7QUFDQSxRQUFJRCxLQUFLLENBQUNFLElBQVYsRUFBZ0I7QUFDakIsR0FKZ0UsQ0FNakU7OztBQUNBLFNBQVFGLEtBQVI7QUFDRDtBQUVEOzs7Ozs7Ozs7QUFPQSxTQUFTRyxvQkFBVCxDQUE4QkgsS0FBOUIsRUFBcURJLFdBQXJELEVBQXFHO0FBQ25HLFNBQU9KLEtBQUssQ0FBQ0ssUUFBTixDQUNKYixHQURJLENBQ0FjLFNBQVMsSUFBSTtBQUNoQixRQUFJQSxTQUFTLEtBQUtGLFdBQWxCLEVBQStCLE9BQU9FLFNBQVA7QUFDL0IsUUFBSUEsU0FBUyxDQUFDSixJQUFkLEVBQW9CLE9BQU9JLFNBQVA7QUFDcEIsV0FBT0gsb0JBQW9CLENBQUNHLFNBQUQsRUFBWUYsV0FBWixDQUEzQjtBQUNELEdBTEksRUFNSkcsSUFOSSxDQU1DQyxRQU5ELENBQVA7QUFPRDtBQUVEOzs7Ozs7Ozs7O0FBUUEsU0FBU0MsdUJBQVQsQ0FBaUNULEtBQWpDLEVBQTZFO0FBQzNFO0FBQ0EsUUFBTVUsaUJBQWlCLEdBQUdYLG9CQUFvQixDQUFDQyxLQUFELENBQTlDO0FBQ0EsUUFBTVcsUUFBUSxHQUFHUixvQkFBb0IsQ0FBQ08saUJBQUQsRUFBb0JWLEtBQXBCLENBQXJDO0FBRUEsUUFBTVkseUJBQXlCLEdBQUdELFFBQVEsQ0FBQ0UsT0FBVCxDQUFpQmIsS0FBakIsQ0FBbEMsQ0FMMkUsQ0FPM0U7O0FBQ0EsTUFBSVkseUJBQXlCLEtBQUssQ0FBbEMsRUFBcUM7QUFDbkMsV0FBTyxDQUFDRixpQkFBaUIsQ0FBQ1IsSUFBbkIsRUFBeUJRLGlCQUFpQixDQUFDUixJQUFsQixDQUF1QlksVUFBaEQsQ0FBUDtBQUNEOztBQUVELFFBQU1DLFdBQVcsR0FBR0osUUFBUSxDQUFDQyx5QkFBeUIsR0FBRyxDQUE3QixDQUE1QjtBQUNBLFFBQU1JLGVBQWUsR0FBR0QsV0FBVyxHQUFHQSxXQUFXLENBQUNiLElBQVosQ0FBa0JlLFdBQXJCLEdBQW1DLElBQXRFO0FBRUEsU0FBTyxDQUFDUCxpQkFBaUIsQ0FBQ1IsSUFBbkIsRUFBeUJjLGVBQXpCLENBQVA7QUFDRDtBQUVEOzs7Ozs7O0FBS0EsU0FBU0UsTUFBVCxDQUFnQjdDLEtBQWhCLEVBQXFDO0FBQ25DLFNBQU9BLEtBQUssS0FBSyxLQUFWLElBQW1CQSxLQUFLLEtBQUssSUFBN0IsSUFBcUNBLEtBQUssS0FBSzhDLFNBQXREO0FBQ0Q7QUFFRDs7Ozs7Ozs7QUFNQSxTQUFTQyxRQUFULENBQWtCQyxJQUFsQixFQUF3QztBQUN0QyxRQUFNQyxHQUFHLEdBQUdwRCxRQUFRLENBQUNxRCxhQUFULENBQXVCLEtBQXZCLENBQVo7QUFDQUQsS0FBRyxDQUFDRSxTQUFKLEdBQWdCSCxJQUFoQjtBQUNBLFNBQU9DLEdBQUcsQ0FBQ0csU0FBWDtBQUNEO0FBRUQ7Ozs7OztBQUlBLFNBQVNDLFlBQVQsQ0FBc0JDLE9BQXRCLEVBQTZDO0FBQzNDLE1BQUlBLE9BQU8sWUFBWUMsT0FBdkIsRUFBZ0MsT0FBT0QsT0FBTyxDQUFDRSxTQUFmO0FBQ2hDLE1BQUlGLE9BQU8sWUFBWUcsSUFBdkIsRUFBNkIsT0FBT1YsUUFBUSxDQUFDTyxPQUFPLENBQUNJLFNBQVQsQ0FBZjs7QUFDN0IsTUFBSUosT0FBTyxZQUFZSyxnQkFBdkIsRUFBeUM7QUFDdkMsV0FBT0MsS0FBSyxDQUFDQyxJQUFOLENBQVdQLE9BQU8sQ0FBQ1EsVUFBbkIsRUFDSjNDLEdBREksQ0FDQTRDLEVBQUUsSUFBSVYsWUFBWSxDQUFDVSxFQUFELENBRGxCLEVBRUpDLElBRkksQ0FFQyxFQUZELENBQVA7QUFHRCxHQVAwQyxDQVMzQzs7O0FBQ0FDLFNBQU8sQ0FBQ0MsSUFBUixDQUFhLG9EQUFiLEVBQW1FWixPQUFuRTtBQUNBLFNBQU8sRUFBUDtBQUNEO0FBRUQ7Ozs7Ozs7O0FBTUEsU0FBU2EsWUFBVCxDQUFzQkMsR0FBdEIsRUFBOENDLEtBQTlDLEVBQXFGckMsUUFBckYsRUFBaUg7QUFDL0csUUFBTXNDLFVBQVUsR0FBR0MsTUFBTSxDQUFDQyxPQUFQLENBQWVILEtBQWYsRUFDaEJJLE1BRGdCLENBQ1QsQ0FBQyxHQUFHekUsS0FBSCxDQUFELEtBQWU2QyxNQUFNLENBQUM3QyxLQUFELENBRFosRUFFaEJtQixHQUZnQixDQUVaLENBQUMsQ0FBQ3VELEdBQUQsRUFBTTFFLEtBQU4sQ0FBRCxLQUFrQjtBQUNyQjtBQUNBLFFBQUlBLEtBQUssS0FBSyxJQUFkLEVBQW9CLE9BQU8wRSxHQUFQLENBRkMsQ0FJckI7QUFDQTs7QUFDQSxRQUFJQSxHQUFHLEtBQUssT0FBUixJQUFtQixPQUFPMUUsS0FBUCxLQUFpQixRQUF4QyxFQUFrRDtBQUNoREEsV0FBSyxHQUFHdUUsTUFBTSxDQUFDQyxPQUFQLENBQWV4RSxLQUFmLEVBQ047QUFETSxPQUVMeUUsTUFGSyxDQUVFLENBQUMsR0FBR0UsQ0FBSCxDQUFELEtBQVc5QixNQUFNLENBQUM4QixDQUFELENBRm5CLEVBR047QUFITSxPQUlMeEQsR0FKSyxDQUlELENBQUMsQ0FBQ3lELENBQUQsRUFBSUQsQ0FBSixDQUFELEtBQWEsR0FBRUMsQ0FBRSxLQUFJRCxDQUFFLEVBSnRCLEVBS0xYLElBTEssQ0FLQSxJQUxBLENBQVI7QUFNRCxLQWJvQixDQWVyQjs7O0FBQ0EsUUFBSVUsR0FBRyxLQUFLLE9BQVIsSUFBbUJkLEtBQUssQ0FBQ2lCLE9BQU4sQ0FBYzdFLEtBQWQsQ0FBdkIsRUFBNkNBLEtBQUssR0FBR0EsS0FBSyxDQUFDZ0UsSUFBTixDQUFXLEdBQVgsQ0FBUjtBQUU3QyxXQUFRLEdBQUVVLEdBQUksS0FBSTFFLEtBQU0sR0FBeEI7QUFDRCxHQXJCZ0IsRUFzQmhCZ0UsSUF0QmdCLENBc0JYLEdBdEJXLENBQW5CO0FBd0JBLFFBQU1jLE9BQU8sR0FBRzlDLFFBQVEsQ0FBQ2IsR0FBVCxDQUFhNEQsS0FBSyxJQUFJQSxLQUFLLENBQUNDLFFBQU4sRUFBdEIsRUFBd0NoQixJQUF4QyxDQUE2QyxFQUE3QyxDQUFoQjtBQUVBLFNBQVEsSUFBR0ksR0FBSSxJQUFHRSxVQUFXLElBQUdRLE9BQVEsS0FBSVYsR0FBSSxHQUFoRDtBQUNEO0FBRUQ7Ozs7Ozs7QUFLQSxTQUFTYSxNQUFULENBQ0ViLEdBREYsRUFFRUMsS0FGRixFQUdFckMsUUFIRixFQUlFa0QsVUFBVSxHQUFHLEtBSmYsRUFLOEI7QUFDNUI7QUFDQSxNQUFJLENBQUNkLEdBQUwsRUFBVTtBQUNSLFVBQU1lLFNBQVMsR0FBR25ELFFBQVEsQ0FBQ2IsR0FBVCxDQUFhQyxJQUFJLElBQUlBLElBQUksQ0FBQzZELE1BQUwsRUFBckIsQ0FBbEI7QUFFQSxVQUFNRyxnQkFBZ0IsR0FBR3ZGLFFBQVEsQ0FBQ3dGLHNCQUFULEVBQXpCO0FBRUFELG9CQUFnQixDQUFDRSxNQUFqQixDQUF3QixHQUFHSCxTQUEzQjtBQUNBLFdBQU9DLGdCQUFQO0FBQ0QsR0FUMkIsQ0FXNUI7QUFFQTs7O0FBQ0EsUUFBTXZELElBQUksR0FBR3FELFVBQVUsR0FBR3JGLFFBQVEsQ0FBQzBGLGVBQVQsQ0FBeUIsNEJBQXpCLEVBQXVEbkIsR0FBdkQsQ0FBSCxHQUFpRXZFLFFBQVEsQ0FBQ3FELGFBQVQsQ0FBdUJrQixHQUF2QixDQUF4RixDQWQ0QixDQWdCNUI7O0FBQ0FvQixjQUFZLENBQUNDLFFBQWIsQ0FBc0I1RCxJQUF0QixFQUE0QndDLEtBQTVCO0FBRUF4QyxNQUFJLENBQUN5RCxNQUFMLENBQ0UsR0FBR3RELFFBQVEsQ0FDVDtBQURTLEdBRVJiLEdBRkEsQ0FFSTRELEtBQUssSUFBSUEsS0FBSyxDQUFDRSxNQUFOLEVBRmIsQ0FETDtBQU1BLFNBQU9wRCxJQUFQO0FBQ0Q7QUFFRDs7Ozs7O0FBSUEsU0FBUzZELGFBQVQsQ0FBdUJDLE9BQXZCLEVBQWdEO0FBQzlDLFFBQU0sQ0FBQy9ELE1BQUQsRUFBU2dCLFdBQVQsSUFBd0JSLHVCQUF1QixDQUFDdUQsT0FBRCxDQUFyRDtBQUNBL0QsUUFBTSxDQUFDZ0UsWUFBUCxDQUFvQkQsT0FBTyxDQUFDVixNQUFSLEVBQXBCLEVBQXNDckMsV0FBdEM7QUFDRDtBQUVEOzs7Ozs7OztBQU1BLFNBQVNpRCxvQkFBVCxDQUE4QkMsT0FBOUIsRUFBdURILE9BQXZELEVBQWdGO0FBQzlFRyxTQUFPLENBQUM5RCxRQUFSLENBQWlCK0QsT0FBakIsQ0FBeUIsQ0FBQ0MsUUFBRCxFQUFXQyxFQUFYLEtBQWtCO0FBQ3pDLFVBQU1DLFFBQVEsR0FBR1AsT0FBTyxDQUFDM0QsUUFBUixDQUFpQmlFLEVBQWpCLENBQWpCLENBRHlDLENBR3pDOztBQUNBLFFBQUksQ0FBQ0MsUUFBTCxFQUFlRixRQUFRLENBQUNHLGFBQVQsR0FBZixDQUNBO0FBREEsU0FFSyxJQUFJRCxRQUFRLENBQUNFLElBQVQsS0FBa0JKLFFBQVEsQ0FBQ0ksSUFBL0IsRUFBcUNKLFFBQVEsQ0FBQ0ssWUFBVCxDQUFzQkgsUUFBdEIsRUFBckMsQ0FDTDtBQURLLFdBRUE7QUFDSEYsa0JBQVEsQ0FBQ0csYUFBVDtBQUNBVCx1QkFBYSxDQUFDUSxRQUFELENBQWI7QUFDRDtBQUNGLEdBWkQsRUFEOEUsQ0FlOUU7O0FBQ0EsUUFBTUksUUFBUSxHQUFHWCxPQUFPLENBQUMzRCxRQUFSLENBQWlCdUUsS0FBakIsQ0FBdUJULE9BQU8sQ0FBQzlELFFBQVIsQ0FBaUJ3RSxNQUF4QyxDQUFqQjs7QUFDQSxNQUFJRixRQUFRLENBQUNFLE1BQWIsRUFBcUI7QUFDbkIsVUFBTXBCLGdCQUFnQixHQUFHdkYsUUFBUSxDQUFDd0Ysc0JBQVQsRUFBekI7QUFDQWlCLFlBQVEsQ0FBQ1AsT0FBVCxDQUFpQjNFLElBQUksSUFBSWdFLGdCQUFnQixDQUFDRSxNQUFqQixDQUF3QmxFLElBQUksQ0FBQzZELE1BQUwsRUFBeEIsQ0FBekI7QUFFQSxVQUFNLENBQUNyRCxNQUFELEVBQVNnQixXQUFULElBQXdCUix1QkFBdUIsQ0FBQ2tFLFFBQVEsQ0FBQyxDQUFELENBQVQsQ0FBckQ7QUFDQTFFLFVBQU0sQ0FBQ2dFLFlBQVAsQ0FBb0JSLGdCQUFwQixFQUFzQ3hDLFdBQXRDO0FBQ0Q7QUFDRixDLENBRUQ7QUFDQTs7O0FBQ0EsTUFBTTZELEtBQU4sQ0FBWSxFLENBRVo7OztBQXNCQTtBQUNBLE1BQU1qQixZQUFOLFNBQTJCaUIsS0FBM0IsQ0FBMkQ7QUFPNUI7QUFFN0J0RyxhQUFXLENBQUM7QUFBRWlFLE9BQUY7QUFBT0MsU0FBUDtBQUFjckM7QUFBZCxHQUFELEVBQXlHO0FBQ2xIO0FBRGtILFNBUnBIb0UsSUFRb0gsR0FSN0csU0FRNkc7QUFBQSxTQVBwSGhDLEdBT29IO0FBQUEsU0FOcEhDLEtBTW9IO0FBQUEsU0FMcEh4QyxJQUtvSCxHQUxwRyxJQUtvRztBQUFBLFNBSnBIRyxRQUlvSDtBQUFBLFNBSHBISixNQUdvSCxHQUgzRixJQUcyRjtBQUFBLFNBRnBIc0QsVUFFb0gsR0FGOUYsS0FFOEY7QUFFbEgsU0FBS2QsR0FBTCxHQUFXQSxHQUFYO0FBQ0EsU0FBS0MsS0FBTCxHQUFhQSxLQUFiLENBSGtILENBS2xIOztBQUNBLFNBQUtyQyxRQUFMLEdBQWdCQSxRQUFRLENBQUNiLEdBQVQsQ0FBYTRELEtBQUssSUFBSTtBQUNwQyxVQUFJbkIsS0FBSyxDQUFDaUIsT0FBTixDQUFjRSxLQUFkLENBQUosRUFBMEIsT0FBTyxJQUFJMkIsYUFBSixDQUFrQjNCLEtBQWxCLENBQVA7QUFDMUIsVUFBSUEsS0FBSyxZQUFZMEIsS0FBckIsRUFBNEIsT0FBTzFCLEtBQVA7QUFDNUIsVUFBSUEsS0FBSyxZQUFZNEIsSUFBckIsRUFBMkIsT0FBTyxJQUFJQyxhQUFKLENBQWtCN0IsS0FBbEIsQ0FBUDtBQUMzQixVQUFJLENBQUNsQyxNQUFNLENBQUNrQyxLQUFELENBQVgsRUFBb0IsT0FBTyxJQUFJOEIsU0FBSixFQUFQO0FBRXBCLGFBQU8sSUFBSUMsU0FBSixDQUFjL0IsS0FBZCxDQUFQO0FBQ0QsS0FQZSxDQUFoQixDQU5rSCxDQWNsSDs7QUFDQSxTQUFLL0MsUUFBTCxDQUFjK0QsT0FBZCxDQUFzQmhCLEtBQUssSUFBS0EsS0FBSyxDQUFDbkQsTUFBTixHQUFlLElBQS9DO0FBQ0Q7O0FBRURvRCxVQUFRLEdBQUc7QUFDVCxXQUFPYixZQUFZLENBQUMsS0FBS0MsR0FBTixFQUFXLEtBQUtDLEtBQWhCLEVBQXVCLEtBQUtyQyxRQUE1QixDQUFuQjtBQUNEOztBQUVEaUQsUUFBTSxHQUFHO0FBQ1A7QUFDQSxRQUFJQyxVQUFVLEdBQUcsS0FBakI7QUFDQSxRQUFJdkQsS0FBcUIsR0FBRyxJQUE1Qjs7QUFDQSxXQUFPQSxLQUFLLENBQUNDLE1BQWIsRUFBcUI7QUFDbkI7QUFDQSxVQUFJRCxLQUFLLENBQUN5QyxHQUFOLEtBQWMsS0FBbEIsRUFBeUI7QUFDdkJjLGtCQUFVLEdBQUcsSUFBYjtBQUNBO0FBQ0Q7O0FBQ0R2RCxXQUFLLEdBQUdBLEtBQUssQ0FBQ0MsTUFBZDtBQUNELEtBWE0sQ0FhUDs7O0FBQ0EsU0FBS3NELFVBQUwsR0FBa0JBLFVBQWxCO0FBRUEsVUFBTXJELElBQUksR0FBR29ELE1BQU0sQ0FBQyxLQUFLYixHQUFOLEVBQVcsS0FBS0MsS0FBaEIsRUFBdUIsS0FBS3JDLFFBQTVCLEVBQXNDLEtBQUtrRCxVQUEzQyxDQUFuQjtBQUNBLFNBQUtyRCxJQUFMLEdBQVlBLElBQVosQ0FqQk8sQ0FtQlA7O0FBQ0FOLGtCQUFjLENBQUN3RixHQUFmLENBQW1CbEYsSUFBbkIsRUFBeUIsSUFBekI7QUFFQSxXQUFPQSxJQUFQO0FBQ0Q7O0FBRURzRSxlQUFhLEdBQUc7QUFDZCxRQUFJLEtBQUt0RSxJQUFMLENBQVVtRixVQUFkLEVBQTBCO0FBQ3hCLFdBQUtuRixJQUFMLENBQVVtRixVQUFWLENBQXFCQyxXQUFyQixDQUFpQyxLQUFLcEYsSUFBdEM7QUFDRCxLQUZELE1BRU87QUFDTG9DLGFBQU8sQ0FBQ0MsSUFBUixDQUFhLDJCQUFiLEVBQTBDLElBQTFDO0FBQ0Q7QUFDRjs7QUFFRG1DLGNBQVksQ0FBQ1YsT0FBRCxFQUF3QjtBQUNsQyxRQUFJQSxPQUFPLENBQUN2QixHQUFSLEtBQWdCLEtBQUtBLEdBQXpCLEVBQThCO0FBQzVCdUIsYUFBTyxDQUFDOUQsSUFBUixHQUFlLEtBQUtBLElBQXBCLENBRDRCLENBRTVCOztBQUNBMkQsa0JBQVksQ0FBQ0MsUUFBYixDQUFzQkUsT0FBTyxDQUFDOUQsSUFBOUIsRUFBb0M4RCxPQUFPLENBQUN0QixLQUE1QyxFQUFtRCxLQUFLQSxLQUF4RCxFQUg0QixDQUs1QjtBQUNBOztBQUNBd0IsMEJBQW9CLENBQUMsSUFBRCxFQUFPRixPQUFQLENBQXBCO0FBQ0QsS0FSRCxDQVNBO0FBVEEsU0FVSztBQUNILGFBQUs5RCxJQUFMLENBQVVxRixXQUFWLENBQXNCdkIsT0FBTyxDQUFDVixNQUFSLEVBQXRCO0FBQ0QsT0FiaUMsQ0FlbEM7OztBQUNBMUQsa0JBQWMsQ0FBQ3dGLEdBQWYsQ0FBbUIsS0FBS2xGLElBQXhCLEVBQThCOEQsT0FBOUI7QUFDRDs7QUFFRCxTQUFPd0IsdUJBQVAsQ0FBK0J4RixLQUEvQixFQUFvREssUUFBcEQsRUFBd0c7QUFDdEcsVUFBTTtBQUFFb0MsU0FBRjtBQUFPQyxXQUFQO0FBQWN6QyxZQUFkO0FBQXNCQyxVQUF0QjtBQUE0QnFEO0FBQTVCLFFBQTJDdkQsS0FBakQ7QUFDQSxVQUFNeUYsUUFBUSxHQUFHLElBQUk1QixZQUFKLENBQWlCO0FBQUVwQixTQUFGO0FBQU9DLFdBQVA7QUFBY3JDO0FBQWQsS0FBakIsQ0FBakI7QUFDQXVDLFVBQU0sQ0FBQzhDLE1BQVAsQ0FBY0QsUUFBZCxFQUF3QjtBQUFFeEYsWUFBRjtBQUFVQyxVQUFWO0FBQWdCcUQ7QUFBaEIsS0FBeEI7QUFDQSxXQUFPa0MsUUFBUDtBQUNEOztBQUVELFNBQU8zQixRQUFQLENBQWdCbkMsT0FBaEIsRUFBa0NnRSxRQUFsQyxFQUFpRUMsUUFBakUsRUFBaUc7QUFDL0YsVUFBTUMsTUFBTSxHQUFHLE9BQU9ELFFBQVAsS0FBb0IsV0FBbkM7QUFDQSxRQUFJLENBQUNDLE1BQUwsRUFBYUQsUUFBUSxHQUFHLEVBQVgsQ0FGa0YsQ0FJL0Y7O0FBQ0EzRCxTQUFLLENBQUNDLElBQU4sQ0FBVyxJQUFJNEQsR0FBSixDQUFRLENBQUMsR0FBR2xELE1BQU0sQ0FBQ21ELElBQVAsQ0FBWUosUUFBWixDQUFKLEVBQTJCLEdBQUcvQyxNQUFNLENBQUNtRCxJQUFQLENBQVlILFFBQVosQ0FBOUIsQ0FBUixDQUFYLEVBQ0dwRyxHQURILENBQ093RyxRQUFRLEtBQUs7QUFDaEJBLGNBRGdCO0FBRWhCQyxjQUFRLEVBQUVMLFFBQVEsQ0FBRUksUUFBRixDQUZGO0FBR2hCRSxjQUFRLEVBQUVQLFFBQVEsQ0FBQ0ssUUFBRDtBQUhGLEtBQUwsQ0FEZixFQU1HbEQsTUFOSCxDQU1VLENBQUM7QUFBRW9ELGNBQUY7QUFBWUQ7QUFBWixLQUFELEtBQTRCQyxRQUFRLEtBQUtELFFBTm5ELEVBT0c3QixPQVBILENBT1csQ0FBQztBQUFFNEIsY0FBRjtBQUFZRSxjQUFaO0FBQXNCRDtBQUF0QixLQUFELEtBQXNDO0FBQzdDO0FBQ0E7QUFDQSxVQUFJRCxRQUFRLEtBQUssT0FBYixJQUF3QixPQUFPRSxRQUFQLEtBQW9CLFFBQWhELEVBQTBEO0FBQ3hEQSxnQkFBUSxHQUFHdEQsTUFBTSxDQUFDQyxPQUFQLENBQWVxRCxRQUFmLEVBQ1JwRCxNQURRLENBQ0QsQ0FBQyxHQUFHRSxDQUFILENBQUQsS0FBVzlCLE1BQU0sQ0FBQzhCLENBQUQsQ0FEaEIsRUFFUnhELEdBRlEsQ0FFSixDQUFDLENBQUN5RCxDQUFELEVBQUlELENBQUosQ0FBRCxLQUFhLEdBQUVDLENBQUUsS0FBSUQsQ0FBRSxFQUZuQixFQUdSWCxJQUhRLENBR0gsSUFIRyxDQUFYO0FBSUQsT0FSNEMsQ0FVN0M7OztBQUNBLFVBQUkyRCxRQUFRLEtBQUssT0FBYixJQUF3Qi9ELEtBQUssQ0FBQ2lCLE9BQU4sQ0FBY2dELFFBQWQsQ0FBNUIsRUFBcUQ7QUFDbkRBLGdCQUFRLEdBQUdBLFFBQVEsQ0FBQzdELElBQVQsQ0FBYyxHQUFkLENBQVg7QUFDRCxPQWI0QyxDQWM3Qzs7O0FBQ0EsVUFDRTJELFFBQVEsQ0FBQ0csVUFBVCxDQUFvQixLQUFwQixNQUNDLE9BQU9ELFFBQVAsS0FBb0IsVUFBcEIsSUFDQyxPQUFPQSxRQUFQLEtBQW9CLFFBRHJCLElBRUMsT0FBT0QsUUFBUCxLQUFvQixVQUZyQixJQUdDLE9BQU9BLFFBQVAsS0FBb0IsUUFKdEIsQ0FERixFQU1FO0FBQ0E7QUFDQSxjQUFNRyxLQUFLLEdBQUdKLFFBQVEsQ0FBQ0ssT0FBVCxDQUFpQixNQUFqQixFQUF5QixFQUF6QixDQUFkLENBRkEsQ0FJQTs7QUFDQSxZQUFJLE9BQU9ILFFBQVAsS0FBb0IsVUFBcEIsSUFBa0MsT0FBT0EsUUFBUCxLQUFvQixRQUExRCxFQUFvRTtBQUNsRXZFLGlCQUFPLENBQUMyRSxnQkFBUixDQUF5QkYsS0FBekIsRUFBZ0NGLFFBQWhDO0FBQ0Q7O0FBRUQsWUFBSSxPQUFPRCxRQUFQLEtBQW9CLFVBQXBCLElBQWtDLE9BQU9BLFFBQVAsS0FBb0IsUUFBMUQsRUFBb0U7QUFDbEV0RSxpQkFBTyxDQUFDNEUsbUJBQVIsQ0FBNEJILEtBQTVCLEVBQW1DSCxRQUFuQztBQUNEO0FBQ0YsT0FsQkQsTUFrQk8sSUFBSUQsUUFBUSxLQUFLLEtBQWIsSUFBc0IsT0FBT0UsUUFBUCxLQUFvQixVQUE5QyxFQUEwRDtBQUMvRHBHLGtCQUFVLENBQUMwRyxJQUFYLENBQWdCLE1BQU1OLFFBQVEsQ0FBQ3ZFLE9BQUQsQ0FBOUI7QUFDRCxPQUZNLENBRUw7QUFDRjtBQUNBO0FBQ0E7QUFMTyxXQU1GLElBQUlrRSxNQUFNLEtBQUtHLFFBQVEsS0FBSyxTQUFiLElBQTBCQSxRQUFRLEtBQUssT0FBNUMsQ0FBVixFQUFnRTtBQUNuRTtBQUNBckUsaUJBQU8sQ0FBQ3FFLFFBQUQsQ0FBUCxHQUFvQkUsUUFBcEI7QUFDRCxTQUhJLENBSUw7QUFKSyxhQUtBLElBQUlBLFFBQVEsS0FBSyxJQUFqQixFQUF1QnZFLE9BQU8sQ0FBQzhFLFlBQVIsQ0FBcUJULFFBQXJCLEVBQStCLEVBQS9CLEVBQXZCLENBQ0w7QUFESyxlQUVBLElBQUksQ0FBQzlFLE1BQU0sQ0FBQ2dGLFFBQUQsQ0FBWCxFQUF1QnZFLE9BQU8sQ0FBQytFLGVBQVIsQ0FBd0JWLFFBQXhCLEVBQXZCLENBQ0w7QUFESyxpQkFFQSxJQUFJLE9BQU9FLFFBQVAsS0FBb0IsUUFBcEIsSUFBZ0MsT0FBT0EsUUFBUCxLQUFvQixRQUF4RCxFQUFrRTtBQUNyRXZFLHVCQUFPLENBQUM4RSxZQUFSLENBQXFCVCxRQUFyQixFQUErQlcsTUFBTSxDQUFDVCxRQUFELENBQXJDO0FBQ0QsZUFGSSxDQUdMO0FBSEssbUJBSUF2RSxPQUFPLENBQUNxRSxRQUFELENBQVAsR0FBb0JFLFFBQXBCO0FBQ04sS0E1REg7QUE2REQ7O0FBNUp3RCxDLENBK0ozRDs7O0FBQ0EsTUFBTW5CLGFBQU4sU0FBNEJELEtBQTVCLENBQTREO0FBSzFEdEcsYUFBVyxDQUFDNkIsUUFBRCxFQUF1QjtBQUNoQztBQURnQyxTQUpsQ29FLElBSWtDLEdBSjNCLFVBSTJCO0FBQUEsU0FIbENwRSxRQUdrQztBQUFBLFNBRmxDSixNQUVrQyxHQUZULElBRVM7QUFHaEMsU0FBS0ksUUFBTCxHQUFnQkEsUUFBUSxDQUFDYixHQUFULENBQWE0RCxLQUFLLElBQUk7QUFDcEMsVUFBSW5CLEtBQUssQ0FBQ2lCLE9BQU4sQ0FBY0UsS0FBZCxDQUFKLEVBQTBCLE9BQU8sSUFBSTJCLGFBQUosQ0FBa0IzQixLQUFsQixDQUFQO0FBQzFCLFVBQUlBLEtBQUssWUFBWTBCLEtBQXJCLEVBQTRCLE9BQU8xQixLQUFQO0FBQzVCLFVBQUlBLEtBQUssWUFBWTRCLElBQXJCLEVBQTJCLE9BQU8sSUFBSUMsYUFBSixDQUFrQjdCLEtBQWxCLENBQVA7QUFDM0IsVUFBSSxDQUFDbEMsTUFBTSxDQUFDa0MsS0FBRCxDQUFYLEVBQW9CLE9BQU8sSUFBSThCLFNBQUosRUFBUDtBQUNwQixhQUFPLElBQUlDLFNBQUosQ0FBYy9CLEtBQWQsQ0FBUDtBQUNELEtBTmUsQ0FBaEI7QUFRQSxTQUFLL0MsUUFBTCxDQUFjK0QsT0FBZCxDQUFzQmhCLEtBQUssSUFBS0EsS0FBSyxDQUFDbkQsTUFBTixHQUFlLElBQS9DO0FBQ0Q7O0FBRURxRCxRQUFNLEdBQUc7QUFDUCxVQUFNcEQsSUFBSSxHQUFHb0QsTUFBTSxDQUFDbkMsU0FBRCxFQUFZLEVBQVosRUFBZ0IsS0FBS2QsUUFBckIsQ0FBbkI7QUFFQSxXQUFPSCxJQUFQO0FBQ0Q7O0FBRURtRCxVQUFRLEdBQUc7QUFDVCxXQUFPLEtBQUtoRCxRQUFMLENBQWNiLEdBQWQsQ0FBa0I0RCxLQUFLLElBQUlBLEtBQUssQ0FBQ0MsUUFBTixFQUEzQixFQUE2Q2hCLElBQTdDLENBQWtELEVBQWxELENBQVA7QUFDRDs7QUFFRHFDLGNBQVksQ0FBQ2UsUUFBRCxFQUEwQjtBQUNwQyxXQUFPdkIsb0JBQW9CLENBQUMsSUFBRCxFQUFPdUIsUUFBUCxDQUEzQjtBQUNEOztBQUVEakIsZUFBYSxHQUFHO0FBQ2QsU0FBS25FLFFBQUwsQ0FBYytELE9BQWQsQ0FBc0JoQixLQUFLLElBQUlBLEtBQUssQ0FBQ29CLGFBQU4sRUFBL0I7QUFDRDs7QUFuQ3lELEMsQ0FzQzVEOzs7QUFDQSxNQUFNVyxTQUFOLFNBQXdCTCxLQUF4QixDQUF3RDtBQU90RDs7O0FBR0F0RyxhQUFXLENBQUMyRSxPQUFELEVBQXFDO0FBQzlDO0FBRDhDLFNBVGhEc0IsSUFTZ0QsR0FUekMsVUFTeUM7QUFBQSxTQVJoRHBFLFFBUWdELEdBUnJDLEVBUXFDO0FBQUEsU0FQaERILElBT2dELEdBUG5DLElBT21DO0FBQUEsU0FOaER3QyxLQU1nRDtBQUFBLFNBTGhEekMsTUFLZ0QsR0FMdkIsSUFLdUI7QUFFOUMsU0FBS3lDLEtBQUwsR0FBYTtBQUFFUztBQUFGLEtBQWI7QUFDRDs7QUFFREcsUUFBTSxHQUFHO0FBQ1AsVUFBTXNELFFBQVEsR0FBRzFJLFFBQVEsQ0FBQzJJLGNBQVQsQ0FBd0IsS0FBS25FLEtBQUwsQ0FBV1MsT0FBbkMsQ0FBakI7QUFDQSxTQUFLakQsSUFBTCxHQUFZMEcsUUFBWjtBQUNBLFdBQU9BLFFBQVA7QUFDRDs7QUFFRHZELFVBQVEsR0FBRztBQUNULFdBQU9qQyxRQUFRLENBQUMsS0FBS3NCLEtBQUwsQ0FBV1MsT0FBWixDQUFmO0FBQ0Q7O0FBRUR1QixjQUFZLENBQUNWLE9BQUQsRUFBcUI7QUFDL0IsU0FBSzlELElBQUwsQ0FBVTRHLFNBQVYsR0FBc0I5QyxPQUFPLENBQUN0QixLQUFSLENBQWNTLE9BQXBDO0FBQ0FhLFdBQU8sQ0FBQzlELElBQVIsR0FBZSxLQUFLQSxJQUFwQjtBQUNEOztBQUVEc0UsZUFBYSxHQUFHO0FBQ2QsU0FBS3RFLElBQUwsQ0FBVW1GLFVBQVYsQ0FBc0JDLFdBQXRCLENBQWtDLEtBQUtwRixJQUF2QztBQUNEOztBQWhDcUQsQyxDQW1DeEQ7OztBQUNBLE1BQU1nRixTQUFOLFNBQXdCSixLQUF4QixDQUF3RDtBQUt0RHRHLGFBQVcsR0FBRztBQUNaO0FBRFksU0FKZGlHLElBSWMsR0FKUCxNQUlPO0FBQUEsU0FIZHBFLFFBR2MsR0FISCxFQUdHO0FBQUEsU0FGZEosTUFFYyxHQUZXLElBRVg7QUFFYjs7QUFFRHFELFFBQU0sR0FBRztBQUNQO0FBQ0EsV0FBT3BGLFFBQVEsQ0FBQ3dGLHNCQUFULEVBQVA7QUFDRDs7QUFFRGdCLGNBQVksQ0FBQ3FDLFFBQUQsRUFBc0I7QUFDaEM7QUFDRDs7QUFFRHZDLGVBQWEsR0FBRztBQUNkO0FBQ0Q7O0FBRURuQixVQUFRLEdBQUc7QUFDVCxXQUFPLEVBQVA7QUFDRDs7QUF4QnFELEMsQ0EyQnhEOzs7QUFDQSxNQUFNNEIsYUFBTixTQUE0QkgsS0FBNUIsQ0FBNEQ7QUFNMUQ7OztBQUdBdEcsYUFBVyxDQUFDMEIsSUFBRCxFQUFhO0FBQ3RCO0FBRHNCLFNBUnhCdUUsSUFRd0IsR0FSakIsTUFRaUI7QUFBQSxTQVB4QnBFLFFBT3dCLEdBUGIsRUFPYTtBQUFBLFNBTnhCSixNQU13QixHQU5DLElBTUQ7QUFBQSxTQUx4QkMsSUFLd0I7QUFFdEIsU0FBS0EsSUFBTCxHQUFZQSxJQUFaO0FBQ0Q7O0FBRURvRCxRQUFNLEdBQUc7QUFDUCxXQUFPLEtBQUtwRCxJQUFaO0FBQ0Q7O0FBRUR3RSxjQUFZLENBQUNWLE9BQUQsRUFBeUI7QUFDbkMsUUFBSUEsT0FBTyxDQUFDOUQsSUFBUixLQUFpQixLQUFLQSxJQUExQixFQUFnQztBQUM3QixXQUFLQSxJQUFOLENBQXlCcUYsV0FBekIsQ0FBcUN2QixPQUFPLENBQUM5RCxJQUE3QztBQUNEO0FBQ0Y7O0FBRURzRSxlQUFhLEdBQUc7QUFDZCxTQUFLdEUsSUFBTCxDQUFVOEcsYUFBVixDQUF5QjFCLFdBQXpCLENBQXFDLEtBQUtwRixJQUExQztBQUNEOztBQUVEbUQsVUFBUSxHQUFHO0FBQ1QsV0FBTzNCLFlBQVksQ0FBQyxLQUFLeEIsSUFBTixDQUFuQjtBQUNEOztBQTlCeUQsQyxDQWlDNUQ7OztBQUNBLE1BQU0rRyxTQUFOLFNBQXdCbkMsS0FBeEIsQ0FBd0Q7QUFLdEQ7OztBQUdBdEcsYUFBVyxDQUFDMkUsT0FBRCxFQUEwQitELE9BQTFCLEVBQTRDO0FBQ3JEO0FBRHFELFNBUHZEekMsSUFPdUQsR0FQaEQsTUFPZ0Q7QUFBQSxTQU52RHhFLE1BTXVELEdBTjlDLElBTThDO0FBQUEsU0FMdkRDLElBS3VEO0FBQUEsU0FKdkRHLFFBSXVEO0FBRXJEOEMsV0FBTyxDQUFDbEQsTUFBUixHQUFpQixJQUFqQjtBQUNBLFNBQUtJLFFBQUwsR0FBZ0IsQ0FBQzhDLE9BQUQsQ0FBaEI7QUFDQSxTQUFLakQsSUFBTCxHQUFZZ0gsT0FBWjtBQUNEOztBQUVENUQsUUFBTSxHQUFHO0FBQ1AsV0FBTyxLQUFLakQsUUFBTCxDQUFjLENBQWQsRUFBaUJpRCxNQUFqQixFQUFQO0FBQ0Q7O0FBQ0RELFVBQVEsR0FBRztBQUNULFdBQU8sS0FBS2hELFFBQUwsQ0FBYyxDQUFkLEVBQWlCZ0QsUUFBakIsRUFBUDtBQUNEOztBQUVEcUIsY0FBWSxDQUFDZSxRQUFELEVBQTJCO0FBQ3JDdkIsd0JBQW9CLENBQUMsSUFBRCxFQUFPdUIsUUFBUCxDQUFwQjtBQUNEOztBQUVEakIsZUFBYSxHQUFHO0FBQ2QsU0FBS3RFLElBQUwsQ0FBVWlILE1BQVY7QUFDRDs7QUE1QnFELEMsQ0ErQnhEOzs7QUFDQSxTQUFTQyxPQUFULENBQWlCM0UsR0FBakIsRUFBcURDLEtBQXJELEVBQXNGO0FBQ3BGLE1BQUksT0FBT0QsR0FBUCxLQUFlLFVBQW5CLEVBQStCO0FBQzdCLFFBQUk0RSxHQUF5QixHQUFHbEcsU0FBaEM7O0FBQ0EsUUFBSXVCLEtBQUssQ0FBQzJFLEdBQVYsRUFBZTtBQUNiQSxTQUFHLEdBQUczRSxLQUFLLENBQUMyRSxHQUFaO0FBQ0EsYUFBTzNFLEtBQUssQ0FBQzJFLEdBQWI7QUFDRDs7QUFDRCxVQUFNQyxNQUFNLEdBQUc3RSxHQUFHLENBQUNDLEtBQUQsQ0FBbEI7O0FBQ0EsUUFBSTRFLE1BQU0sWUFBWXhDLEtBQXRCLEVBQTZCO0FBQzNCLFVBQUksT0FBT3VDLEdBQVAsS0FBZSxVQUFuQixFQUErQjtBQUM3QnZILGtCQUFVLENBQUMwRyxJQUFYLENBQWdCLE1BQU07QUFDcEI7QUFDQSxnQkFBTXhHLEtBQUssR0FBR3NILE1BQU0sQ0FBQ3BILElBQVAsR0FBY29ILE1BQWQsR0FBdUJuSCxvQkFBb0IsQ0FBQ21ILE1BQUQsQ0FBcEIsQ0FBK0MsQ0FBL0MsQ0FBckMsQ0FGb0IsQ0FJcEI7O0FBQ0EsY0FBSXRILEtBQUosRUFBV3FILEdBQUcsQ0FBRXJILEtBQUssQ0FBQ0UsSUFBUixDQUFIO0FBQ1osU0FORDtBQU9EOztBQUNELGFBQU9vSCxNQUFQO0FBQ0Q7O0FBQ0QsUUFBSUEsTUFBTSxZQUFZdEMsSUFBdEIsRUFBNEIsT0FBTyxJQUFJQyxhQUFKLENBQWtCcUMsTUFBbEIsQ0FBUCxDQW5CQyxDQW9CN0I7O0FBQ0EsUUFBSSxDQUFDcEcsTUFBTSxDQUFDb0csTUFBRCxDQUFYLEVBQXFCLE9BQU8sSUFBSXBDLFNBQUosRUFBUDtBQUVyQixXQUFPLElBQUlDLFNBQUosQ0FBY21DLE1BQWQsQ0FBUDtBQUNEOztBQUVELFFBQU07QUFBRWpILFlBQUY7QUFBWSxPQUFHa0g7QUFBZixNQUF3QjdFLEtBQTlCO0FBRUEsU0FBT0QsR0FBRyxHQUFHLElBQUlvQixZQUFKLENBQWlCO0FBQUVwQixPQUFGO0FBQU9wQyxZQUFQO0FBQWlCcUMsU0FBSyxFQUFFNkU7QUFBeEIsR0FBakIsQ0FBSCxHQUFzRCxJQUFJeEMsYUFBSixDQUFrQjFFLFFBQWxCLENBQWhFO0FBQ0Q7QUFFRDs7Ozs7Ozs7O0FBT08sU0FBU21ILElBQVQsQ0FBYy9FLEdBQWQsRUFBc0NDLEtBQXRDLEVBQXVFO0FBQzVFLFNBQU8wRSxPQUFPLENBQUMzRSxHQUFELEVBQU1DLEtBQU4sQ0FBZDtBQUNEO0FBRUQ7Ozs7Ozs7QUFNTyxTQUFTK0UsUUFBVCxDQUFrQi9FLEtBQWxCLEVBQW1DO0FBQ3hDLFNBQU8wRSxPQUFPLENBQUNqRyxTQUFELEVBQVl1QixLQUFaLENBQWQ7QUFDRCxDLENBRUQ7O0FBQ08sU0FBU2dGLEdBQVQsQ0FDTGpGLEdBREssRUFFTEMsS0FGSyxFQUdXO0FBQ2hCO0FBQ0FBLE9BQUssQ0FBQ3JDLFFBQU4sR0FBaUJxQyxLQUFLLENBQUNpRixjQUFOLENBQXFCLFVBQXJCLElBQW1DLENBQUNqRixLQUFLLENBQUNyQyxRQUFQLENBQW5DLEdBQXNELEVBQXZFO0FBRUEsU0FBT21ILElBQUksQ0FBQy9FLEdBQUQsRUFBTUMsS0FBTixDQUFYO0FBQ0Q7QUFFRDs7Ozs7Ozs7QUFPTyxTQUFTbkUsTUFBVCxDQUNMcUosTUFESyxFQUVMVixPQUZLLEVBR0x2RCxNQUFlLEdBQUcsS0FIYixFQUlMO0FBQ0E7QUFDQSxRQUFNa0UsVUFBVSxHQUFHakksY0FBYyxDQUFDa0ksR0FBZixDQUFtQlosT0FBbkIsQ0FBbkI7O0FBRUEsTUFBSSxPQUFPVSxNQUFQLEtBQWtCLFFBQWxCLElBQThCLE9BQU9BLE1BQVAsS0FBa0IsUUFBaEQsSUFBNERBLE1BQU0sS0FBSyxJQUEzRSxFQUFpRjtBQUMvRUEsVUFBTSxHQUFHLElBQUl6QyxTQUFKLENBQWN5QyxNQUFkLENBQVQ7QUFDRCxHQUZELE1BRU8sSUFBSUEsTUFBTSxZQUFZNUMsSUFBdEIsRUFBNEI7QUFDakM0QyxVQUFNLEdBQUcsSUFBSTNDLGFBQUosQ0FBa0IyQyxNQUFsQixDQUFUO0FBQ0QsR0FGTSxNQUVBLElBQUlBLE1BQU0sS0FBS3pHLFNBQVgsSUFBd0J5RyxNQUFNLEtBQUssSUFBbkMsSUFBMkNBLE1BQU0sS0FBSyxLQUExRCxFQUFpRTtBQUN0RUEsVUFBTSxHQUFHLElBQUkxQyxTQUFKLEVBQVQ7QUFDRDs7QUFFRCxNQUFJMEMsTUFBTSxZQUFZOUMsS0FBdEIsRUFBNkI7QUFDM0IsUUFBSWlELEtBQUo7QUFFQSxRQUFJLENBQUNwRSxNQUFELElBQVcsQ0FBQ2tFLFVBQWhCLEVBQTRCWCxPQUFPLENBQUN6RixTQUFSLEdBQW9CLEVBQXBCOztBQUU1QixRQUFJb0csVUFBSixFQUFnQjtBQUNkLFlBQU1HLFFBQVEsR0FBR3BJLGNBQWMsQ0FBQ3FJLEdBQWYsQ0FBbUJmLE9BQW5CLENBQWpCLENBRGMsQ0FHZDs7QUFDQSxVQUFJYyxRQUFRLENBQUN2RCxJQUFULEtBQWtCLFNBQXRCLEVBQWlDO0FBQy9Cc0QsYUFBSyxHQUFHbEUsWUFBWSxDQUFDMkIsdUJBQWIsQ0FBcUN3QyxRQUFyQyxFQUErRCxDQUFDSixNQUFELENBQS9ELENBQVI7QUFDQ0ksZ0JBQUQsQ0FBMkJ0RCxZQUEzQixDQUF3Q3FELEtBQXhDLEVBRitCLENBRy9CO0FBQ0E7O0FBQ0FDLGdCQUFRLENBQUMzSCxRQUFULEdBQW9CMEgsS0FBSyxDQUFDMUgsUUFBMUI7QUFDRCxPQU5ELE1BTU87QUFDTDBILGFBQUssR0FBRyxJQUFJZCxTQUFKLENBQWNXLE1BQWQsRUFBc0JWLE9BQXRCLENBQVIsQ0FESyxDQUVMOztBQUNDYyxnQkFBRCxDQUF3QnRELFlBQXhCLENBQXFDcUQsS0FBckM7QUFDRDtBQUNGLEtBZkQsQ0FnQkE7QUFoQkEsU0FpQks7QUFDSEEsYUFBSyxHQUFHLElBQUlkLFNBQUosQ0FBY1csTUFBZCxFQUFzQlYsT0FBdEIsQ0FBUjtBQUNBQSxlQUFPLENBQUN2RCxNQUFSLENBQWVvRSxLQUFLLENBQUN6RSxNQUFOLEVBQWY7QUFDRCxPQXpCMEIsQ0EyQjNCOzs7QUFDQTFELGtCQUFjLENBQUN3RixHQUFmLENBQW1COEIsT0FBbkIsRUFBNEJhLEtBQTVCLEVBNUIyQixDQThCM0I7O0FBQ0EsV0FBT2pJLFVBQVUsQ0FBQytFLE1BQWxCLEVBQTBCO0FBQ3hCO0FBQ0EvRSxnQkFBVSxDQUFDb0ksTUFBWCxDQUFrQixDQUFsQixFQUFxQixDQUFyQixFQUF3QixDQUF4QjtBQUNEO0FBQ0YsR0FuQ0QsTUFtQ087QUFDTCxVQUFNLElBQUlDLEtBQUosQ0FBVSw2Q0FBVixDQUFOO0FBQ0Q7QUFDRixDLENBRUQ7O0FBQ08sTUFBTUMsYUFBTixTQUE0QnRELEtBQTVCLENBQTREO0FBU2pFO0FBR0E7QUFHQXRHLGFBQVcsQ0FBQztBQUNWNkosZUFEVTtBQUVWQyxXQUZVO0FBR1ZDO0FBSFUsR0FBRCxFQVFSO0FBQ0Q7QUFEQyxTQXRCSDlELElBc0JHLEdBdEJJLFVBc0JKO0FBQUEsU0FyQkh4RSxNQXFCRyxHQXJCc0IsSUFxQnRCO0FBQUEsU0FwQkhJLFFBb0JHO0FBQUEsU0FsQkhnSSxXQWtCRztBQUFBLFNBakJIQyxPQWlCRztBQUFBLFNBaEJIQyxRQWdCRztBQUFBLFNBYkhDLFVBYUcsR0FiVSxLQWFWO0FBQUEsU0FWSEMsU0FVRyxHQVZTLEtBVVQ7QUFHRCxTQUFLSixXQUFMLEdBQW1CQSxXQUFuQjtBQUNBLFNBQUtDLE9BQUwsR0FBZUEsT0FBZjtBQUNBLFNBQUtDLFFBQUwsR0FBZ0JBLFFBQWhCO0FBQ0EsVUFBTW5GLEtBQUssR0FBRyxJQUFJMkIsYUFBSixDQUFrQixDQUFDc0QsV0FBRCxDQUFsQixDQUFkO0FBQ0FqRixTQUFLLENBQUNuRCxNQUFOLEdBQWUsSUFBZjtBQUNBLFNBQUtJLFFBQUwsR0FBZ0IsQ0FBQytDLEtBQUQsQ0FBaEI7QUFDRDs7QUFFREUsUUFBTSxHQUFHO0FBQ1AsU0FBS29GLGVBQUw7QUFFQSxXQUFPLEtBQUtySSxRQUFMLENBQWMsQ0FBZCxFQUFpQmlELE1BQWpCLEVBQVA7QUFDRDs7QUFFRG9GLGlCQUFlLEdBQUc7QUFDaEIsU0FBS0osT0FBTCxDQUFhekosSUFBYixDQUFrQlIsS0FBSyxJQUFJO0FBQ3pCLFVBQUksS0FBS29LLFNBQVQsRUFBb0I7QUFDcEIsV0FBS0QsVUFBTCxHQUFrQixJQUFsQjtBQUNBLFlBQU1HLGFBQWEsR0FBRyxLQUFLSixRQUFMLENBQWNsSyxLQUFkLENBQXRCO0FBQ0EsWUFBTXVLLFVBQVUsR0FBRyxJQUFJN0QsYUFBSixDQUFrQixDQUFDNEQsYUFBRCxDQUFsQixDQUFuQjtBQUNBQyxnQkFBVSxDQUFDM0ksTUFBWCxHQUFvQixJQUFwQjtBQUNBLFdBQUtJLFFBQUwsQ0FBYyxDQUFkLEVBQWlCcUUsWUFBakIsQ0FBOEJrRSxVQUE5QjtBQUNBLFdBQUt2SSxRQUFMLEdBQWdCLENBQUN1SSxVQUFELENBQWhCO0FBQ0QsS0FSRDtBQVNELEdBbERnRSxDQW9EakU7QUFDQTs7O0FBQ0F2RixVQUFRLEdBQUc7QUFDVCxXQUFPLEtBQUtnRixXQUFMLEdBQW1CLEtBQUtBLFdBQUwsQ0FBaUJoRixRQUFqQixFQUFuQixHQUFpRCxFQUF4RDtBQUNEOztBQUVEbUIsZUFBYSxHQUFHO0FBQ2QsU0FBS2lFLFNBQUwsR0FBaUIsSUFBakI7QUFDQSxTQUFLcEksUUFBTCxDQUFjK0QsT0FBZCxDQUFzQnlFLFVBQVUsSUFBSUEsVUFBVSxDQUFDckUsYUFBWCxFQUFwQztBQUNEOztBQUVERSxjQUFZLENBQUNWLE9BQUQsRUFBeUI7QUFDbkMsUUFBSSxDQUFDLEtBQUt3RSxVQUFWLEVBQXNCO0FBQ3BCO0FBQ0F0RSwwQkFBb0IsQ0FBQyxJQUFELEVBQU9GLE9BQVAsQ0FBcEI7QUFDQUEsYUFBTyxDQUFDMEUsZUFBUjtBQUNELEtBSkQsQ0FLQTtBQUNBO0FBTkEsU0FPSyxJQUFJLEtBQUtKLE9BQUwsS0FBaUJ0RSxPQUFPLENBQUNzRSxPQUE3QixFQUFzQztBQUN6QyxhQUFLOUQsYUFBTDtBQUNBVCxxQkFBYSxDQUFDQyxPQUFELENBQWI7QUFDRCxPQUhJLENBSUw7QUFDQTtBQUxLLFdBTUE7QUFDSEEsaUJBQU8sQ0FBQ3NFLE9BQVIsQ0FBZ0J6SixJQUFoQixDQUFxQlIsS0FBSyxJQUFJO0FBQzVCMkYsbUJBQU8sQ0FBQ3dFLFVBQVIsR0FBcUIsSUFBckI7QUFDQSxrQkFBTUcsYUFBYSxHQUFHM0UsT0FBTyxDQUFDdUUsUUFBUixDQUFpQmxLLEtBQWpCLENBQXRCO0FBQ0Esa0JBQU11SyxVQUFVLEdBQUcsSUFBSTdELGFBQUosQ0FBa0IsQ0FBQzRELGFBQUQsQ0FBbEIsQ0FBbkI7QUFDQUMsc0JBQVUsQ0FBQzNJLE1BQVgsR0FBb0IrRCxPQUFwQjtBQUNBQSxtQkFBTyxDQUFDM0QsUUFBUixHQUFtQixDQUFDdUksVUFBRCxDQUFuQjtBQUVBMUUsZ0NBQW9CLENBQUMsSUFBRCxFQUFPRixPQUFQLENBQXBCO0FBQ0QsV0FSRDtBQVNELFNBeEJrQyxDQTBCbkM7OztBQUNBLFNBQUt5RSxTQUFMLEdBQWlCLElBQWpCO0FBQ0Q7O0FBM0ZnRTtBQThGbkU7Ozs7Ozs7Ozs7OztBQVdPLFNBQVMvSSxPQUFULENBQWlCeUQsT0FBakIsRUFBa0Q7QUFBQTs7QUFDdkQsU0FBTyxhQUFLLE1BQU0yRixPQUFOLFNBQXNCaEUsS0FBdEIsQ0FBc0Q7QUFRaEV0RyxlQUFXLENBQUMyRSxPQUFELEVBQWtCO0FBQzNCO0FBRDJCLFdBUDdCbEQsTUFPNkIsR0FQSixJQU9JO0FBQUEsV0FON0JJLFFBTTZCLEdBTmxCLEVBTWtCO0FBQUEsV0FMN0JvRSxJQUs2QixHQUx0QixTQUtzQjtBQUFBLFdBSjdCdEMsVUFJNkIsR0FKSCxJQUlHO0FBQUEsV0FIN0JnQixPQUc2QjtBQUFBLFdBRjdCakQsSUFFNkI7QUFFM0IsV0FBS2lELE9BQUwsR0FBZUEsT0FBZjtBQUNEOztBQUVEcUIsaUJBQWEsR0FBRztBQUNkLFdBQUtyQyxVQUFMLENBQWdCaUMsT0FBaEIsQ0FBd0JsRSxJQUFJLElBQUlBLElBQUksQ0FBQzhHLGFBQUwsQ0FBb0IxQixXQUFwQixDQUFnQ3BGLElBQWhDLENBQWhDO0FBQ0QsS0FmK0QsQ0FpQmhFOzs7QUFDQXdFLGdCQUFZLENBQUNWLE9BQUQsRUFBbUI7QUFDN0IsVUFBS0EsT0FBTyxDQUFDYixPQUFSLEdBQWtCLEtBQUtBLE9BQTVCLEVBQXNDO0FBQ3BDYSxlQUFPLENBQUM5RCxJQUFSLEdBQWUsS0FBS0EsSUFBcEI7QUFDQThELGVBQU8sQ0FBQzdCLFVBQVIsR0FBcUIsS0FBS0EsVUFBMUI7QUFDQTtBQUNEOztBQUNELFdBQUtxQyxhQUFMO0FBQ0FULG1CQUFhLENBQUNDLE9BQUQsQ0FBYjtBQUNEOztBQUVEWCxZQUFRLEdBQUc7QUFDVCxhQUFPRixPQUFQO0FBQ0Q7O0FBRURHLFVBQU0sR0FBRztBQUNQLFlBQU1pRixRQUFRLEdBQUdySyxRQUFRLENBQUNxRCxhQUFULENBQXVCLFVBQXZCLENBQWpCO0FBQ0FnSCxjQUFRLENBQUM5RyxTQUFULEdBQXFCLEtBQUswQixPQUExQjtBQUNBLFlBQU1NLGdCQUFnQixHQUFHOEUsUUFBUSxDQUFDcEYsT0FBbEM7QUFDQSxXQUFLaEIsVUFBTCxHQUFrQkYsS0FBSyxDQUFDQyxJQUFOLENBQVd1QixnQkFBZ0IsQ0FBQ3RCLFVBQTVCLENBQWxCLENBSk8sQ0FNUDtBQUNBO0FBQ0E7O0FBQ0EsVUFBSSxLQUFLQSxVQUFMLENBQWdCMEMsTUFBcEIsRUFBNEI7QUFDMUIsYUFBSzNFLElBQUwsR0FBWSxLQUFLaUMsVUFBTCxDQUFnQixLQUFLQSxVQUFMLENBQWdCMEMsTUFBaEIsR0FBeUIsQ0FBekMsQ0FBWjtBQUNEOztBQUNELGFBQU9wQixnQkFBUDtBQUNEOztBQTdDK0QsR0FBM0QsU0E4Q0pOLE9BOUNJLENBQVA7QUErQ0Q7QUFFRDs7Ozs7Ozs7Ozs7OztBQVlPLFNBQVM0RixRQUFULENBQWtCO0FBQ3ZCVixhQUR1QjtBQUV2QkMsU0FGdUI7QUFHdkJDO0FBSHVCLENBQWxCLEVBUUo7QUFDRCxTQUFPLElBQUlILGFBQUosQ0FBa0I7QUFDdkJDLGVBRHVCO0FBRXZCQyxXQUZ1QjtBQUd2QkM7QUFIdUIsR0FBbEIsQ0FBUDtBQUtEO0FBRUQ7Ozs7Ozs7Ozs7Ozs7OztBQWNPLFNBQVM3SixTQUFULEdBQXVFO0FBTTVFLFFBQU00SSxNQUFNLEdBQUcsVUFBVWxGLEVBQVYsRUFBd0M7QUFDckRrRixVQUFNLENBQUNsSSxPQUFQLEdBQWlCZ0QsRUFBakI7QUFDRCxHQUZEOztBQUdBa0YsUUFBTSxDQUFDbEksT0FBUCxHQUFpQixJQUFqQjtBQUVBLFNBQU9rSSxNQUFQO0FBQ0QsQyIsImZpbGUiOiJleGFtcGxlcy5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAxKTtcbiIsImltcG9ydCB7IHJlbmRlciwgcmF3SHRtbCwgU3VzcGVuc2UsIGNyZWF0ZVJlZiB9IGZyb20gXCIuLi9qc3gvanN4LXJ1bnRpbWVcIjtcclxuXHJcbmNvbnN0ICRzc3JFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNzZXJ2ZXItc2lkZS1yZW5kZXJlZC1odG1sXCIpITtcclxuXHJcbnR5cGUgUmVzcG9uc2VEYXRhID0geyBpdGVtczogQXJyYXk8eyBydGU6IHN0cmluZyB9PiB9O1xyXG5cclxuZnVuY3Rpb24gU3Bpbm5lcigpIHtcclxuICByZXR1cm4gPHA+TG9hZGluZyAuLi48L3A+O1xyXG59XHJcblxyXG5uZXcgKGNsYXNzIHtcclxuICBfdmFsdWUgPSAwO1xyXG4gIGdldCB2YWx1ZSgpIHtcclxuICAgIHJldHVybiB0aGlzLl92YWx1ZTtcclxuICB9XHJcbiAgc2V0IHZhbHVlKHZhbHVlKSB7XHJcbiAgICB0aGlzLl92YWx1ZSA9IHZhbHVlO1xyXG4gICAgdGhpcy5yZW5kZXIoKTtcclxuICB9XHJcblxyXG4gIGlucHV0UmVmID0gY3JlYXRlUmVmPEhUTUxJbnB1dEVsZW1lbnQ+KCk7XHJcbiAgZGF0YUZldGNoOiBQcm9taXNlPE9iamVjdD47XHJcblxyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgdGhpcy5kYXRhRmV0Y2ggPSBmZXRjaChcIi4vbW9jay5qc29uXCIpLnRoZW4ocmVzcCA9PiByZXNwLmpzb24oKSk7XHJcblxyXG4gICAgdGhpcy5yZW5kZXIoKTtcclxuICB9XHJcblxyXG4gIHJlbmRlcigpIHtcclxuICAgIHJlbmRlcihcclxuICAgICAgPGRpdj5cclxuICAgICAgICB7Lyogc3R5bGUgYXMgb2JqZWN0IG9yIHN0cmluZyAqL31cclxuICAgICAgICA8ZGl2IHN0eWxlPXt7ZGlzcGxheTogXCJncmlkXCIsIFwiZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zXCI6IFwiMWZyIDFmciAxZnJcIiwgXCJncmlkLWdhcFwiOiBcIjEycHhcIn19PlxyXG4gICAgICAgICAgey8qIGV2ZW50LCB2YWx1ZSBiaW5kaW5nICovfVxyXG4gICAgICAgICAgPGJ1dHRvbiBvbi1jbGljaz17KCkgPT4gdGhpcy52YWx1ZS0tfT4tPC9idXR0b24+XHJcbiAgICAgICAgICA8aW5wdXRcclxuICAgICAgICAgICAgdmFsdWU9e3RoaXMudmFsdWV9XHJcbiAgICAgICAgICAgIG9uLWNoYW5nZT17KGU6IElucHV0RXZlbnQpID0+ICh0aGlzLnZhbHVlID0gcGFyc2VGbG9hdCgoZS5jdXJyZW50VGFyZ2V0IGFzIEhUTUxJbnB1dEVsZW1lbnQpLnZhbHVlKSl9XHJcbiAgICAgICAgICAgIHR5cGU9XCJudW1iZXJcIlxyXG4gICAgICAgICAgICByZWY9e3RoaXMuaW5wdXRSZWZ9XHJcbiAgICAgICAgICAvPlxyXG4gICAgICAgICAgPGJ1dHRvbiBvbi1jbGljaz17KCkgPT4gdGhpcy52YWx1ZSsrfT4rPC9idXR0b24+XHJcbiAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgIHsvKiB1c2luZyByZWYgdG8gYWNjZXNzIHRoZSBIVE1MRWxlbWVudCBkaXJlY3RseSAqL31cclxuICAgICAgICA8cCBvbi1jbGljaz17KCkgPT4gdGhpcy5pbnB1dFJlZi5jdXJyZW50IS5mb2N1cygpfSBzdHlsZT1cImN1cnNvcjogcG9pbnRlclwiPlxyXG4gICAgICAgICAgZ28gdG8gaW5wdXQgZmllbGRcclxuICAgICAgICA8L3A+XHJcblxyXG4gICAgICAgIHsvKiBjb25kaXRpb25hbCByZW5kZXIgKi99XHJcbiAgICAgICAge3RoaXMudmFsdWUgPiAyICYmIDxwPnNsb3cgZG93biEgbW9yZSB0aGFuIDxiPjI8L2I+PzwvcD59XHJcblxyXG4gICAgICAgIHsvKiBwZW5kaW5nIHJlcXVlc3Qgd2l0aCBwbGFjZWhvbGRlciBtYXJrdXAgKi99XHJcbiAgICAgICAgPFN1c3BlbnNlXHJcbiAgICAgICAgICBwbGFjZWhvbGRlcj17PFNwaW5uZXIgLz59XHJcbiAgICAgICAgICBwcm9taXNlPXt0aGlzLmRhdGFGZXRjaH1cclxuICAgICAgICAgIHRlbXBsYXRlPXsoZGF0YTogUmVzcG9uc2VEYXRhKSA9PiAoXHJcbiAgICAgICAgICAgIDw+XHJcbiAgICAgICAgICAgICAgPHA+IHJlc3VsdHM6IDwvcD5cclxuICAgICAgICAgICAgICA8dWw+XHJcbiAgICAgICAgICAgICAgICB7ZGF0YS5pdGVtcy5tYXAoaXRlbSA9PiAoXHJcbiAgICAgICAgICAgICAgICAgIDxsaT57cmF3SHRtbChpdGVtLnJ0ZSl9PC9saT5cclxuICAgICAgICAgICAgICAgICkpfVxyXG4gICAgICAgICAgICAgIDwvdWw+XHJcbiAgICAgICAgICAgIDwvPlxyXG4gICAgICAgICAgKX1cclxuICAgICAgICAvPlxyXG5cclxuICAgICAgICB7JHNzckVsZW1lbnR9XHJcbiAgICAgIDwvZGl2PixcclxuICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNyb290XCIpIGFzIEhUTUxFbGVtZW50LFxyXG4gICAgKTtcclxuICB9XHJcbn0pKCk7XHJcbiIsIi8qKlxyXG4gKiBwcm92aWRlcyBmdW5jdGlvbnMgbmVlZGVkIGJ5IGJhYmVsIGZvciBhIGN1c3RvbSBwcmFnbWFcclxuICogdG8gcmVuZGVyIHBhcnNlZCBqc3ggY29kZSB0byBodG1sLFxyXG4gKiBkaWZmIGFuZCBwYXRjaCBpbiBzdWJzZXF1ZW50IHJlbmRlcnNcclxuICovXHJcblxyXG5cclxuLy8gYSBtYXAgYmV0d2VlbiB2LXRyZWVzIGFuZCByZW5kZXJlZCBET00gbm9kZXMgLyBjb250YWluZXJzXHJcbmNvbnN0IHJlbmRlcmVkVlRyZWVzID0gbmV3IFdlYWtNYXA8RWxlbWVudCwgUm9vdFZOb2RlIHwgRWxlbWVudFZOb2RlPigpO1xyXG4vLyBsaXN0IG9mIGByZWZgIGNhbGxiYWNrcyB0byBiZSBjYWxsZWQgYWZ0ZXIgdGhlIERPTSBub2RlcyBhcmUgcmVuZGVyZWRcclxuY29uc3QgcmVmc1RvQ2FsbDogQXJyYXk8KCkgPT4gdm9pZD4gPSBbXTtcclxuXHJcbi8vIHByb3BzIHdoaWNoIHdpbGwgYmUgcmVuZGVyZWQgYXMgYXR0cmlidXRlc1xyXG4vLyBGdW5jdGlvbnMgd2lsbCBiZSB1c2VkIGZvciBldmVudCBsaXN0ZW5lcnMuICh3aXRoIGF0dHJpYnV0ZSBuYW1lIHN0YXJ0aW5nIHdpdGggJ29uLScpXHJcbi8vIE9iamVjdCB3aWxsIGJlIHNldCBhcyBwcm9wZXJ0eSBvbiB0aGUgcmVuZGVyZWQgbm9kZSBlbGVtZW50XHJcbnR5cGUgQXR0cmlidXRlcyA9IHtcclxuICBba2V5OiBzdHJpbmddOiBzdHJpbmcgfCBib29sZWFuIHwgbnVtYmVyIHwgRnVuY3Rpb24gfCBPYmplY3Q7XHJcbn07XHJcblxyXG4vLyBhZGRpdGlvbmFsIGF0dHJpYnV0ZXMgd2hpY2ggY2FuIGhhdmUgYWRkaXRpb25hbCBzZXJpYWxpemF0aW9uIGJlZm9yZSByZW5kZXJpbmcgYXMgYXR0cmlidXRlc1xyXG50eXBlIFNwZWNpYWxBdHRyaWJ1dGVzID0ge1xyXG4gIGNsYXNzPzogc3RyaW5nIHwgc3RyaW5nW107XHJcbiAgc3R5bGU/OiBzdHJpbmcgfCB7IFtrZXk6IHN0cmluZ106IHN0cmluZyB9O1xyXG4gIHJlZj86IEZ1bmN0aW9uO1xyXG59O1xyXG5cclxuLy8gdHlwZXMgb2YgY2hpbGRyZW4gd2hpY2ggd2lsbCBiZSBwYXNzZWQgYnkgdGhlIGpzeCBwYXJzZXIgcGx1Z2luXHJcbi8vIG5lc3RlZCBhcnJheSBpbiBjYXNlIG9mXHJcbi8vIDxlbGVtPlxyXG4vLyAgIDxzcGFuLz5cclxuLy8gICB7Y2hpbGRyZW59XHJcbi8vICAgdGV4dFxyXG4vLyAgIDxkaXYvPlxyXG4vLyA8L2VsZW0+XHJcbnR5cGUgSlNYQ2hpbGQgPSBWTm9kZUludGVyZmFjZSB8IE5vZGUgfCBzdHJpbmcgfCBudW1iZXIgfCBib29sZWFuIHwgbnVsbCB8IHVuZGVmaW5lZCB8IEpTWENoaWxkW107XHJcblxyXG4vLyBjaGlsZCBlbGVtZW50cyBpbiB0aGUganN4IG1hcmt1cCB3aGljaCB3aWxsIGJlIHBhc3NlZCB0byB0aGUgaCBmdW5jdGlvbiBhcyBgcHJvcHMuY2hpbGRyZW5gXHJcbnR5cGUgQ2hpbGRyZW5Qcm9wcyA9IHtcclxuICBjaGlsZHJlbjogSlNYQ2hpbGRbXTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBwcm9wcyBvYmplY3Qgd2hpY2ggd2lsbCBiZSBwYXNzZWQgdG8ganN4IHByYWdtYSBhbmQgY3VzdG9tIGNvbXBvbmVudCBmdW5jdGlvbnNcclxuICovXHJcbnR5cGUgSnN4UHJvcHMgPSBBdHRyaWJ1dGVzICYgU3BlY2lhbEF0dHJpYnV0ZXMgJiBDaGlsZHJlblByb3BzO1xyXG5cclxuLyoqXHJcbiAqIHJldHVybiB0aGUgY2xvc2VzdCBhbmNlc3RvciBvZiB0aGUgZ2l2ZW4gVk5vZGUgd2hpY2ggaGFzIGFuIERPTSBFbGVtZW50IChpLmUuIGlzIG5vdCBhIEZyYWdtZW50KVxyXG4gKiBAcGFyYW0gdk5vZGUge1ZOb2RlSW50ZXJmYWNlfVxyXG4gKi9cclxuZnVuY3Rpb24gZ2V0UGFyZW50RWxlbWVudE5vZGUodk5vZGU6IFZOb2RlSW50ZXJmYWNlKTogRWxlbWVudFZOb2RlIHtcclxuICB3aGlsZSAodk5vZGUucGFyZW50KSB7XHJcbiAgICB2Tm9kZSA9IHZOb2RlLnBhcmVudDtcclxuICAgIGlmICh2Tm9kZS5ub2RlKSBicmVhaztcclxuICB9XHJcblxyXG4gIC8vIGAubm9kZWAgaXMgb25seSBvbiBcIlRleHRcIiBhbmQgXCJFbGVtZW50XCIgdHlwZSBWTm9kZSwgYW5kIG9ubHkgRWxlbWVudCBoYXMgY2hpbGRyZW5cclxuICByZXR1cm4gKHZOb2RlIGFzIHVua25vd24pIGFzIEVsZW1lbnRWTm9kZTtcclxufVxyXG5cclxuLyoqXHJcbiAqIGZvciB0aGUgZ2l2ZW4gdi1ub2RlIGFsbCBjaGlsZHJlbiBhcmUgdHJhdmVyc2VkIHRpbGwgY2hpbGRyZW4gd2l0aCBET00gbm9kZXMgYXJlIGZvdW5kXHJcbiAqXHJcbiAqIEBwYXJhbSB7Vk5vZGVJbnRlcmZhY2V9IHZOb2RlIC0gcGFyZW50IG5vZGVcclxuICogQHBhcmFtIHtWTm9kZUludGVyZmFjZX0gW2Fsd2F5c0FsbG93XSAtIGFsd2F5cyBjb250YWluIHRoZSBwcm92aWRlZCBub2RlIGluIHRoZSByZXR1cm5lZCBsaXN0LCBldmVuIGlmIGl0IGlzIG5vdCBhbiBlbGVtZW50IHdpdGggRE9NIE5vZGVcclxuICogQHJldHVybnMge1ZOb2RlSW50ZXJmYWNlW119XHJcbiAqL1xyXG5mdW5jdGlvbiBnZXRDaGlsZHJlbldpdGhOb2Rlcyh2Tm9kZTogVk5vZGVJbnRlcmZhY2UsIGFsd2F5c0FsbG93PzogVk5vZGVJbnRlcmZhY2UpOiBWTm9kZUludGVyZmFjZVtdIHtcclxuICByZXR1cm4gdk5vZGUuY2hpbGRyZW5cclxuICAgIC5tYXAoY2hpbGROb2RlID0+IHtcclxuICAgICAgaWYgKGNoaWxkTm9kZSA9PT0gYWx3YXlzQWxsb3cpIHJldHVybiBjaGlsZE5vZGU7XHJcbiAgICAgIGlmIChjaGlsZE5vZGUubm9kZSkgcmV0dXJuIGNoaWxkTm9kZTtcclxuICAgICAgcmV0dXJuIGdldENoaWxkcmVuV2l0aE5vZGVzKGNoaWxkTm9kZSwgYWx3YXlzQWxsb3cpO1xyXG4gICAgfSlcclxuICAgIC5mbGF0KEluZmluaXR5KSBhcyBWTm9kZUludGVyZmFjZVtdO1xyXG59XHJcblxyXG4vKipcclxuICogcmV0dXJucyBhIHR1cGxlIG9mIHRoZSBjbG9zZXN0IGFuY2VzdG9yIHdoaWNoIGhhcyBhIERPTSBOb2RlLFxyXG4gKiBhbmQgdGhlIG5vZGUgd2hpY2ggaGFzIGEgRE9NIG5vZGUgYW5kIGlzIHJlbmRlcmVkIGFzIHRoZSBuZXh0IHNpYmxpbmcgZm9yIHRoZSBwcm92aWRlZCBub2RlIGluIHRoZSBET00uXHJcbiAqIE9yIG51bGwgd2hlbiBpdCBpcyB0aGUgbGFzdCBjaGlsZCBpdHNlbGZcclxuICpcclxuICogQHBhcmFtIHtWTm9kZUludGVyZmFjZX0gdk5vZGVcclxuICogQHJldHVybnMgeyhbTm9kZSwgTm9kZSB8IG51bGxdKX1cclxuICovXHJcbmZ1bmN0aW9uIGdldFBhcmVudEFuZE5leHRTaWJsaW5nKHZOb2RlOiBWTm9kZUludGVyZmFjZSk6IFtOb2RlLCBOb2RlIHwgbnVsbF0ge1xyXG4gIC8vIG5vZGUgYW5jZXN0b3Igd2l0aCBFbGVtZW50LFxyXG4gIGNvbnN0IHBhcmVudFdpdGhFbGVtZW50ID0gZ2V0UGFyZW50RWxlbWVudE5vZGUodk5vZGUpO1xyXG4gIGNvbnN0IHNpYmxpbmdzID0gZ2V0Q2hpbGRyZW5XaXRoTm9kZXMocGFyZW50V2l0aEVsZW1lbnQsIHZOb2RlKTtcclxuXHJcbiAgY29uc3QgaW5kZXhPZk5vZGVJblNpYmxpbmdzTGlzdCA9IHNpYmxpbmdzLmluZGV4T2Yodk5vZGUpO1xyXG5cclxuICAvLyBubyBwcmV2IHNpYmxpbmcsIHB1dCBiZWZvcmUgYW55IG90aGVyIGVsZW1lbnQgKG9yIG51bGwgaWYgcGFyZW50IGhhcyBubyBjaGlsZHJlbiB5ZXQpXHJcbiAgaWYgKGluZGV4T2ZOb2RlSW5TaWJsaW5nc0xpc3QgPT09IDApIHtcclxuICAgIHJldHVybiBbcGFyZW50V2l0aEVsZW1lbnQubm9kZSwgcGFyZW50V2l0aEVsZW1lbnQubm9kZS5maXJzdENoaWxkXTtcclxuICB9XHJcblxyXG4gIGNvbnN0IHByZXZTaWJsaW5nID0gc2libGluZ3NbaW5kZXhPZk5vZGVJblNpYmxpbmdzTGlzdCAtIDFdO1xyXG4gIGNvbnN0IG5leHRTaWJsaW5nTm9kZSA9IHByZXZTaWJsaW5nID8gcHJldlNpYmxpbmcubm9kZSEubmV4dFNpYmxpbmcgOiBudWxsO1xyXG5cclxuICByZXR1cm4gW3BhcmVudFdpdGhFbGVtZW50Lm5vZGUsIG5leHRTaWJsaW5nTm9kZV07XHJcbn1cclxuXHJcbi8qKlxyXG4gKiByZXR1cm5zIHRydWUgaWYgbm90IG51bGxpc2ggb3IgZmFsc2VcclxuICogdGhhdCBtZWFucyAwIG9yIGVtcHR5IHN0cmluZyBhcmUgYWxsb3dlZFxyXG4gKiBAcGFyYW0geyp9IHZhbFxyXG4gKi9cclxuZnVuY3Rpb24gdHJ1dGh5KHZhbHVlOiBhbnkpOiBib29sZWFuIHtcclxuICByZXR1cm4gdmFsdWUgIT09IGZhbHNlICYmIHZhbHVlICE9PSBudWxsICYmIHZhbHVlICE9PSB1bmRlZmluZWQ7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBlc2NhcGVzIHRoZSBwcm92aWRlZCBzdHJpbmcgYWdhaW5zdCB4c3MgYXR0YWNrcyBldGNcclxuICpcclxuICogQHBhcmFtIHtzdHJpbmd9IHRleHRcclxuICogQHJldHVybnMge3N0cmluZ31cclxuICovXHJcbmZ1bmN0aW9uIHNhbml0aXplKHRleHQ6IHN0cmluZyk6IHN0cmluZyB7XHJcbiAgY29uc3QgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICBkaXYuaW5uZXJUZXh0ID0gdGV4dDtcclxuICByZXR1cm4gZGl2LmlubmVySFRNTDtcclxufVxyXG5cclxuLyoqXHJcbiAqIGJhc2ljYWxseSBgRWxlbWVudC5vdXRlckhUTUxgIGJ1dCBhbHNvIHN1cHBvcnRzIFRleHQgbm9kZSBhbmQgRG9jdW1lbnRGcmFnbWVudFxyXG4gKiBAcGFyYW0gZWxlbWVudCB7Tm9kZX0gLSBlbGVtZW50IHdoaWNoIGl0cyBodG1sIG5lZWRzIHRvIGJlIHJldHVybmVkXHJcbiAqL1xyXG5mdW5jdGlvbiBnZXRPdXRlckh0bWwoZWxlbWVudDogTm9kZSk6IHN0cmluZyB7XHJcbiAgaWYgKGVsZW1lbnQgaW5zdGFuY2VvZiBFbGVtZW50KSByZXR1cm4gZWxlbWVudC5vdXRlckhUTUw7XHJcbiAgaWYgKGVsZW1lbnQgaW5zdGFuY2VvZiBUZXh0KSByZXR1cm4gc2FuaXRpemUoZWxlbWVudC53aG9sZVRleHQpO1xyXG4gIGlmIChlbGVtZW50IGluc3RhbmNlb2YgRG9jdW1lbnRGcmFnbWVudCkge1xyXG4gICAgcmV0dXJuIEFycmF5LmZyb20oZWxlbWVudC5jaGlsZE5vZGVzKVxyXG4gICAgICAubWFwKGVsID0+IGdldE91dGVySHRtbChlbCkpXHJcbiAgICAgIC5qb2luKFwiXCIpO1xyXG4gIH1cclxuXHJcbiAgLy8gc2hvdWxkbid0IHJlYWNoIHRoaXMgcG9pbnRcclxuICBjb25zb2xlLndhcm4oXCJnZXRPdXRlckh0bWwgZG9lcyBub3Qgc3VwcG9ydCB0aGlzIHR5cGUgb2YgZWxlbWVudFwiLCBlbGVtZW50KTtcclxuICByZXR1cm4gXCJcIjtcclxufVxyXG5cclxuLyoqXHJcbiAqIGdlbmVyYXRlcyB0aGUgaHRtbCBhcyBhIHN0cmluZyB3aGljaCBjYW4gYmUgdXNlZCBmb3IgZXhhbXBsZSB3aXRoIGBlbGVtZW50LmlubmVySFRNTCgpYFxyXG4gKlxyXG4gKiBAcGFyYW0gdGFnIHtzdHJpbmd8RnVuY3Rpb259IC0gdGFnIGFyZ3VtZW50IG9mIHRoZSBqc3ggY2FsbFxyXG4gKiBAcGFyYW0gcHJvcHMge09iamVjdH0gLSBwcm9wcyBhcmd1bWVudCBvZiBqc3ggY2FsbFxyXG4gKi9cclxuZnVuY3Rpb24gYXNIdG1sU3RyaW5nKHRhZzogc3RyaW5nIHwgRnVuY3Rpb24sIHByb3BzOiBBdHRyaWJ1dGVzICYgU3BlY2lhbEF0dHJpYnV0ZXMsIGNoaWxkcmVuOiBWTm9kZUludGVyZmFjZVtdKSB7XHJcbiAgY29uc3QgYXR0cmlidXRlcyA9IE9iamVjdC5lbnRyaWVzKHByb3BzKVxyXG4gICAgLmZpbHRlcigoWywgdmFsdWVdKSA9PiB0cnV0aHkodmFsdWUpKVxyXG4gICAgLm1hcCgoW2tleSwgdmFsdWVdKSA9PiB7XHJcbiAgICAgIC8vIGUuZy4gZGlzYWJsZWQ6IHRydWUgPT4gPHRhZyBkaXNhYmxlZD5cclxuICAgICAgaWYgKHZhbHVlID09PSB0cnVlKSByZXR1cm4ga2V5O1xyXG5cclxuICAgICAgLy8gZm9yIHN0eWxlIGFzIG9iamVjdDpcclxuICAgICAgLy8gKHN0eWxlOikge2Rpc3BsYXk6IFwibm9uZVwiLCBwb3NpdGlvbjogXCJhYnNvbHV0ZVwifSA9PT4gJ2Rpc3BsYXk6IG5vbmU7IHBvc2l0aW9uOiBhYnNvbHV0ZTsnXHJcbiAgICAgIGlmIChrZXkgPT09IFwic3R5bGVcIiAmJiB0eXBlb2YgdmFsdWUgPT09IFwib2JqZWN0XCIpIHtcclxuICAgICAgICB2YWx1ZSA9IE9iamVjdC5lbnRyaWVzKHZhbHVlKVxyXG4gICAgICAgICAgLy8gaWdub3JlIHN0dWZmIGxpa2UgYHtiYWNrZ3JvdW5kOiBhY3RpdmUgJiYgXCJyZWRcIn1gIHdoZW4gYGFjdGl2ZSA9PT0gZmFsc2UgLyBudWxsIC8gdW5kZWZpbmVkYFxyXG4gICAgICAgICAgLmZpbHRlcigoWywgdl0pID0+IHRydXRoeSh2KSlcclxuICAgICAgICAgIC8vIGN1cnJlbnRseSBzdXBwb3J0cyBcImJhY2tncm91bmQtY29sb3JcIiBub3QgXCJiYWNrZ3JvdW5kQ29sb3JcIlxyXG4gICAgICAgICAgLm1hcCgoW2ssIHZdKSA9PiBgJHtrfTogJHt2fWApXHJcbiAgICAgICAgICAuam9pbihcIjsgXCIpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyAoY2xhc3M6KSBbXCJidG5cIiwgXCJyZWRcIl0gPT0+IFwiYnRuIHJlZFwiXHJcbiAgICAgIGlmIChrZXkgPT09IFwiY2xhc3NcIiAmJiBBcnJheS5pc0FycmF5KHZhbHVlKSkgdmFsdWUgPSB2YWx1ZS5qb2luKFwiIFwiKTtcclxuXHJcbiAgICAgIHJldHVybiBgJHtrZXl9PVwiJHt2YWx1ZX1cImA7XHJcbiAgICB9KVxyXG4gICAgLmpvaW4oXCIgXCIpO1xyXG5cclxuICBjb25zdCBjb250ZW50ID0gY2hpbGRyZW4ubWFwKGNoaWxkID0+IGNoaWxkLnRvU3RyaW5nKCkpLmpvaW4oXCJcIik7XHJcblxyXG4gIHJldHVybiBgPCR7dGFnfSAke2F0dHJpYnV0ZXN9PiR7Y29udGVudH08LyR7dGFnfT5gO1xyXG59XHJcblxyXG4vKipcclxuICogZ2VuZXJhdGVzIEhUTUwgTm9kZSBlbGVtZW50cyBmcm9tIHRoZSBwcm92aWRlZCBqc3ggaXRlbVxyXG4gKiBAcGFyYW0gdGFnIHtzdHJpbmd8RnVuY3Rpb259IC0gdGFnIGFyZ3VtZW50IG9mIHRoZSBqc3ggY2FsbFxyXG4gKiBAcGFyYW0gcHJvcHMge09iamVjdH0gLSBwcm9wcyBhcmd1bWVudCBvZiBqc3ggY2FsbFxyXG4gKi9cclxuZnVuY3Rpb24gYXNOb2RlKFxyXG4gIHRhZzogc3RyaW5nIHwgdW5kZWZpbmVkLFxyXG4gIHByb3BzOiBBdHRyaWJ1dGVzICYgU3BlY2lhbEF0dHJpYnV0ZXMsXHJcbiAgY2hpbGRyZW46IFZOb2RlSW50ZXJmYWNlW10sXHJcbiAgc3ZnQ29udGV4dCA9IGZhbHNlLFxyXG4pOiBFbGVtZW50IHwgRG9jdW1lbnRGcmFnbWVudCB7XHJcbiAgLy8gZnJhZ21lbnRcclxuICBpZiAoIXRhZykge1xyXG4gICAgY29uc3QgZnJhZ21lbnRzID0gY2hpbGRyZW4ubWFwKGl0ZW0gPT4gaXRlbS5hc05vZGUoKSk7XHJcblxyXG4gICAgY29uc3QgZG9jdW1lbnRGcmFnbWVudCA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcclxuXHJcbiAgICBkb2N1bWVudEZyYWdtZW50LmFwcGVuZCguLi5mcmFnbWVudHMpO1xyXG4gICAgcmV0dXJuIGRvY3VtZW50RnJhZ21lbnQ7XHJcbiAgfVxyXG5cclxuICAvLyByZW1lbWJlciBpZiB0aGUgc3ZnIGNvbnRleHQgd2FzIHNldCBmb3IgdGhpcyBub2RlLCBhbmQgcmVwbGFjZSBhZnRlciBnZW5lcmF0aW5nIGFsbCBjaGlsZHJlblxyXG5cclxuICAvLyBjdXJyZW50bHkgbm90IHN1cHBvcnRpbmcgdGhlIGBpc2Agb3B0aW9uIGZvciBDdXN0b21pemVkIGJ1aWx0LWluIGVsZW1lbnRzXHJcbiAgY29uc3Qgbm9kZSA9IHN2Z0NvbnRleHQgPyBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoXCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiLCB0YWcpIDogZG9jdW1lbnQuY3JlYXRlRWxlbWVudCh0YWcpO1xyXG5cclxuICAvLyBhZGQgYXR0cmlidXRlcywgZXZlbnQgbGlzdGVuZXJzIGV0Yy5cclxuICBFbGVtZW50Vk5vZGUuYWRkUHJvcHMobm9kZSwgcHJvcHMpO1xyXG5cclxuICBub2RlLmFwcGVuZChcclxuICAgIC4uLmNoaWxkcmVuXHJcbiAgICAgIC8vIC5mbGF0KClcclxuICAgICAgLm1hcChjaGlsZCA9PiBjaGlsZC5hc05vZGUoKSksXHJcbiAgKTtcclxuXHJcbiAgcmV0dXJuIG5vZGU7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiByZW5kZXJzIHRoZSBIVE1MIGZvciB0aGUgZ2l2ZW4gVi1Ob2RlIGFuZCBhZGRzIHRvIHRoZSBET00gYXQgdGhlIGNvcnJlY3QgcG9zaXRpb25cclxuICogQHBhcmFtIG5ld05vZGUgLSB2Tm9kZSB0byBiZSByZW5kZXJlZCBhcyBIVE1MIE5vZGUgYW5kIGFkZGVkIHRvIERPTVxyXG4gKi9cclxuZnVuY3Rpb24gaW5zZXJ0TmV3SXRlbShuZXdOb2RlOiBWTm9kZUludGVyZmFjZSkge1xyXG4gIGNvbnN0IFtwYXJlbnQsIG5leHRTaWJsaW5nXSA9IGdldFBhcmVudEFuZE5leHRTaWJsaW5nKG5ld05vZGUpO1xyXG4gIHBhcmVudC5pbnNlcnRCZWZvcmUobmV3Tm9kZS5hc05vZGUoKSwgbmV4dFNpYmxpbmcpO1xyXG59XHJcblxyXG4vKipcclxuICogaXRlcmF0ZSBvdmVyIGFsbCB0aGUgY2hpbGRyZW4gb2YgdGhlIHByb3ZpZGVkIG5vZGVzLCBhbmQgZWFjaCBwYWlyd2lzZVxyXG4gKlxyXG4gKiBAcGFyYW0ge1ZOb2RlSW50ZXJmYWNlfSBvbGROb2RlIC0gdi1ub2RlIGZyb20gdGhlIG9sZCByZW5kZXJcclxuICogQHBhcmFtIHtWTm9kZUludGVyZmFjZX0gbmV3Tm9kZS0gdi1ub2RlIGZyb20gdGhlIG5ldyB0cmVlIHdoaWNoIGl0cyBjaGlsZHJlbiBoYXZlIHRvIHJlcGxhY2UgdGhlIGNoaWxkcmVuIG9mIHRoZSBvbGQgbm9kZVxyXG4gKi9cclxuZnVuY3Rpb24gZGlmZkFuZFBhdGNoQ2hpbGRyZW4ob2xkTm9kZTogVk5vZGVJbnRlcmZhY2UsIG5ld05vZGU6IFZOb2RlSW50ZXJmYWNlKSB7XHJcbiAgb2xkTm9kZS5jaGlsZHJlbi5mb3JFYWNoKChvbGRDaGlsZCwgaXgpID0+IHtcclxuICAgIGNvbnN0IG5ld0NoaWxkID0gbmV3Tm9kZS5jaGlsZHJlbltpeF07XHJcblxyXG4gICAgLy8gY2hpbGQgd2FzIHJlbW92ZWRcclxuICAgIGlmICghbmV3Q2hpbGQpIG9sZENoaWxkLnJlbW92ZUZyb21ET00oKTtcclxuICAgIC8vIGNoaWxkIGlzIG1vZGlmaWVkXHJcbiAgICBlbHNlIGlmIChuZXdDaGlsZC50eXBlID09PSBvbGRDaGlsZC50eXBlKSBvbGRDaGlsZC5kaWZmQW5kUGF0Y2gobmV3Q2hpbGQpO1xyXG4gICAgLy8gY2hpbGQgaXMgcmVwbGFjZWRcclxuICAgIGVsc2Uge1xyXG4gICAgICBvbGRDaGlsZC5yZW1vdmVGcm9tRE9NKCk7XHJcbiAgICAgIGluc2VydE5ld0l0ZW0obmV3Q2hpbGQpO1xyXG4gICAgfVxyXG4gIH0pO1xyXG5cclxuICAvLyBuZXcgYWRkaXRpb24gaXRlbXNcclxuICBjb25zdCBuZXdJdGVtcyA9IG5ld05vZGUuY2hpbGRyZW4uc2xpY2Uob2xkTm9kZS5jaGlsZHJlbi5sZW5ndGgpO1xyXG4gIGlmIChuZXdJdGVtcy5sZW5ndGgpIHtcclxuICAgIGNvbnN0IGRvY3VtZW50RnJhZ21lbnQgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XHJcbiAgICBuZXdJdGVtcy5mb3JFYWNoKGl0ZW0gPT4gZG9jdW1lbnRGcmFnbWVudC5hcHBlbmQoaXRlbS5hc05vZGUoKSkpO1xyXG5cclxuICAgIGNvbnN0IFtwYXJlbnQsIG5leHRTaWJsaW5nXSA9IGdldFBhcmVudEFuZE5leHRTaWJsaW5nKG5ld0l0ZW1zWzBdKTtcclxuICAgIHBhcmVudC5pbnNlcnRCZWZvcmUoZG9jdW1lbnRGcmFnbWVudCwgbmV4dFNpYmxpbmcpO1xyXG4gIH1cclxufVxyXG5cclxuLy8gYmFzZSBjbGFzcyB3aGljaCB3aWxsIGJlIGluaGVyaXRlZCBmcm9tIGpzeCBhbmQgZnJhZ21lbnRzIGZ1bmN0aW9uIG5vZGUgZ2VuZXJhdGlvblxyXG4vLyBhbmQgd2lsbCBiZSB1c2VkIHRvIGRpc3Rpbmd1aXNoIHRoZW0gd2l0aCBvdGhlciBFbGVtZW50c1xyXG5jbGFzcyBWTm9kZSB7fVxyXG5cclxuLy8gSW50ZXJmYWNlIHdoaWNoIHdpbGwgYmUgaW1wbGVtZW50ZWQgYnkgYWxsIHR5cGVzIG9mIG5vZGVzIGluIHRoZSBWLURPTSBUcmVlXHJcbmV4cG9ydCBpbnRlcmZhY2UgVk5vZGVJbnRlcmZhY2Uge1xyXG4gIC8vIHRoZSBodG1sIGNvbnRlbnQgYXMgc3RyaW5nLCB3aGljaCBhbGxvd3MgdG8gdXNlIGFzIGBlbC5pbm5lckhUTUwgPSA8ZGl2Pi4uLjwvZGl2PmBcclxuICB0b1N0cmluZygpOiBzdHJpbmc7XHJcbiAgLy8gY3JlYXRlcyBIVE1MIE5vZGVzIChIVE1MRWxlbWVudCwgU1ZHRWxlbWVudCwgRG9jdW1lbnRGcmFnbWVudCBhbmQgVGV4dCBub2RlKSBmb3IgdGhlIFYtVHJlZVxyXG4gIGFzTm9kZSgpOiBOb2RlO1xyXG4gIC8vIHJlZmVyZW5jZSB0byB0aGUgcGFyZW50IFYtTm9kZSBvZiB0aGlzIFYtTm9kZS4gKGkuZS4gdGhpcyBub2RlIHdhcyB0aGUgY2hpbGQgZWxlbWVudCBpbiBqc3gpXHJcbiAgLy8gbnVsbCBpbiBjYXNlIG9mIHRoZSByb290IGVsZW1lbnQgZnJvbSB0aGUgcmVuZGVyIHRyZWVcclxuICBwYXJlbnQ6IFZOb2RlSW50ZXJmYWNlIHwgbnVsbDtcclxuICAvLyBsaXN0IG9mIFYtTm9kZSBjb252ZXJ0ZWQgY2hpbGQgZWxlbWVudCBmcm9tIGpzeCBjb2RlXHJcbiAgY2hpbGRyZW46IEFycmF5PFZOb2RlSW50ZXJmYWNlIHwgbmV2ZXI+O1xyXG4gIC8vIGUuZy4gdGV4dCwgaHRtbCBlbGVtZW50LCBudWxsIGV0Y1xyXG4gIHR5cGU6IHN0cmluZztcclxuICAvLyByZWZlcmVuY2UgdG8gdGhlIGNyZWF0ZWQgSFRNTCBlbGVtZW50IGZvciB0aGlzIFYtTm9kZVxyXG4gIG5vZGU/OiBOb2RlO1xyXG4gIC8vIHJlbW92ZXMgYWxsIEhUTUwgRWxlbWVudHMgd2hpY2ggd2VyZSByZW5kZXJlZCBhcyBwYXJ0IG9mIHRoaXMgVi1Ob2RlIG9yIGl0cyBjaGlsZHJlbiBmcm9tIGpzeCBjb2RlXHJcbiAgcmVtb3ZlRnJvbURPTSgpOiB2b2lkO1xyXG4gIC8vIHVwZGF0ZSB0aGUgRE9NIG5vZGUgd2hpY2ggd2VyZSByZW5kZXJlZCBmb3IgdGhpcyB2LW5vZGUgYW5kIGl0J3MgY2hpbGRyZW5cclxuICAvLyB0byByZWZsZWN0IGFsbCBjaGFuZ2VzIGNvbWluZyBmcm9tIHRoZSBuZXcgVi1Ob2RlXHJcbiAgZGlmZkFuZFBhdGNoKG5ld05vZGU6IFZOb2RlSW50ZXJmYWNlKTogdm9pZDtcclxufVxyXG5cclxuLy8gVi1Ob2RlIHdoaWNoIHdpbGwgYmUgcmVuZGVyZWQgYXMgSFRNTEVsZW1lbnQgb3IgU1ZHRWxlbWVudFxyXG5jbGFzcyBFbGVtZW50Vk5vZGUgZXh0ZW5kcyBWTm9kZSBpbXBsZW1lbnRzIFZOb2RlSW50ZXJmYWNlIHtcclxuICB0eXBlID0gXCJFbGVtZW50XCI7XHJcbiAgdGFnOiBzdHJpbmc7XHJcbiAgcHJvcHM6IEF0dHJpYnV0ZXMgJiBTcGVjaWFsQXR0cmlidXRlcztcclxuICBub2RlOiBFbGVtZW50ID0gbnVsbCBhcyBhbnk7XHJcbiAgY2hpbGRyZW46IFZOb2RlSW50ZXJmYWNlW107XHJcbiAgcGFyZW50OiBWTm9kZUludGVyZmFjZSA9IG51bGwgYXMgYW55O1xyXG4gIHN2Z0NvbnRleHQ6IGJvb2xlYW4gPSBmYWxzZTsgLy8gd2lsbCBiZSBzZXQgdG8gdHJ1ZSB3aGVuIGVsZW1lbnQgaXMgYW4gU1ZHIEVsZW1lbnRcclxuXHJcbiAgY29uc3RydWN0b3IoeyB0YWcsIHByb3BzLCBjaGlsZHJlbiB9OiB7IHRhZzogc3RyaW5nOyBwcm9wczogQXR0cmlidXRlcyAmIFNwZWNpYWxBdHRyaWJ1dGVzOyBjaGlsZHJlbjogSlNYQ2hpbGRbXSB9KSB7XHJcbiAgICBzdXBlcigpO1xyXG4gICAgdGhpcy50YWcgPSB0YWc7XHJcbiAgICB0aGlzLnByb3BzID0gcHJvcHM7XHJcblxyXG4gICAgLy8gY29udmVydCBjaGlsZCBqc3ggY29udGVudCB0byBWTm9kZXNcclxuICAgIHRoaXMuY2hpbGRyZW4gPSBjaGlsZHJlbi5tYXAoY2hpbGQgPT4ge1xyXG4gICAgICBpZiAoQXJyYXkuaXNBcnJheShjaGlsZCkpIHJldHVybiBuZXcgRnJhZ21lbnRWTm9kZShjaGlsZCk7XHJcbiAgICAgIGlmIChjaGlsZCBpbnN0YW5jZW9mIFZOb2RlKSByZXR1cm4gY2hpbGQgYXMgVk5vZGVJbnRlcmZhY2U7XHJcbiAgICAgIGlmIChjaGlsZCBpbnN0YW5jZW9mIE5vZGUpIHJldHVybiBuZXcgTGl2ZU5vZGVWTm9kZShjaGlsZCk7XHJcbiAgICAgIGlmICghdHJ1dGh5KGNoaWxkKSkgcmV0dXJuIG5ldyBOdWxsVk5vZGUoKTtcclxuXHJcbiAgICAgIHJldHVybiBuZXcgVGV4dFZOb2RlKGNoaWxkIGFzIHN0cmluZyB8IG51bWJlciB8IHRydWUpO1xyXG4gICAgfSk7XHJcbiAgICAvLyBzZXQgcGFyZW50IHByb3BlcnR5IG9uIGFsbCBjaGlsZHJlblxyXG4gICAgdGhpcy5jaGlsZHJlbi5mb3JFYWNoKGNoaWxkID0+IChjaGlsZC5wYXJlbnQgPSB0aGlzKSk7XHJcbiAgfVxyXG5cclxuICB0b1N0cmluZygpIHtcclxuICAgIHJldHVybiBhc0h0bWxTdHJpbmcodGhpcy50YWcsIHRoaXMucHJvcHMsIHRoaXMuY2hpbGRyZW4pO1xyXG4gIH1cclxuXHJcbiAgYXNOb2RlKCkge1xyXG4gICAgLy8gdHJhdmVyc2UgdGhlIFZUcmVlIHRvIGNoZWNrIGlmIHRoaXMgZWxlbWVudCBpcyByZW5kZXJlZCBpbnNpZGUgYW4gc3ZnIGVsZW1lbnRcclxuICAgIGxldCBzdmdDb250ZXh0ID0gZmFsc2U7XHJcbiAgICBsZXQgdk5vZGU6IFZOb2RlSW50ZXJmYWNlID0gdGhpcztcclxuICAgIHdoaWxlICh2Tm9kZS5wYXJlbnQpIHtcclxuICAgICAgLy8gQHRzLWlnbm9yZSAtIEVsZW1lbnRWTm9kZSBoYXMgdGhlIHRhZyBwcm9wZXJ0eSwgb3RoZXIgYXJlIHVuZGVmaW5lZFxyXG4gICAgICBpZiAodk5vZGUudGFnID09PSBcInN2Z1wiKSB7XHJcbiAgICAgICAgc3ZnQ29udGV4dCA9IHRydWU7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgICAgdk5vZGUgPSB2Tm9kZS5wYXJlbnQ7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gc3RvcmUgdGhlIHN2ZyBjb250ZXh0IGluZm9ybWF0aW9uIHRvIHRoZSBwcm9wZXJ0eSB0byBhbGxvdyB1c2luZyBpdCB3aGVuIHRoZSB2LW5vZGUgaXMgY2xvbmVkXHJcbiAgICB0aGlzLnN2Z0NvbnRleHQgPSBzdmdDb250ZXh0O1xyXG5cclxuICAgIGNvbnN0IG5vZGUgPSBhc05vZGUodGhpcy50YWcsIHRoaXMucHJvcHMsIHRoaXMuY2hpbGRyZW4sIHRoaXMuc3ZnQ29udGV4dCkgYXMgRWxlbWVudDtcclxuICAgIHRoaXMubm9kZSA9IG5vZGU7XHJcblxyXG4gICAgLy8gbWVtb3JpemUgZm9yIG5leHQgc3VidHJlZSByZS1yZW5kZXJzXHJcbiAgICByZW5kZXJlZFZUcmVlcy5zZXQobm9kZSwgdGhpcyk7XHJcblxyXG4gICAgcmV0dXJuIG5vZGU7XHJcbiAgfVxyXG5cclxuICByZW1vdmVGcm9tRE9NKCkge1xyXG4gICAgaWYgKHRoaXMubm9kZS5wYXJlbnROb2RlKSB7XHJcbiAgICAgIHRoaXMubm9kZS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHRoaXMubm9kZSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjb25zb2xlLndhcm4oXCJqc3gtcnVudGltZTogY2FuJ3QgcmVtb3ZlXCIsIHRoaXMpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZGlmZkFuZFBhdGNoKG5ld05vZGU6IEVsZW1lbnRWTm9kZSkge1xyXG4gICAgaWYgKG5ld05vZGUudGFnID09PSB0aGlzLnRhZykge1xyXG4gICAgICBuZXdOb2RlLm5vZGUgPSB0aGlzLm5vZGU7XHJcbiAgICAgIC8vIHVwZGF0ZSBwcm9wcyBhbmQgYXR0cmlidXRlc1xyXG4gICAgICBFbGVtZW50Vk5vZGUuYWRkUHJvcHMobmV3Tm9kZS5ub2RlLCBuZXdOb2RlLnByb3BzLCB0aGlzLnByb3BzKTtcclxuXHJcbiAgICAgIC8vIGNoaWxkcmVuID0+IGl0ZXIgYW5kIHBhdGNoXHJcbiAgICAgIC8vIG9sZCBjaGlsZHJlbiBiZWluZyBtb2RpZmllZFxyXG4gICAgICBkaWZmQW5kUGF0Y2hDaGlsZHJlbih0aGlzLCBuZXdOb2RlKTtcclxuICAgIH1cclxuICAgIC8vIHRhZyBoYXMgY2hhbmdlZFxyXG4gICAgZWxzZSB7XHJcbiAgICAgIHRoaXMubm9kZS5yZXBsYWNlV2l0aChuZXdOb2RlLmFzTm9kZSgpKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBtZW1vcml6ZSBmb3IgbmV4dCBzdWJ0cmVlIHJlLXJlbmRlcnNcclxuICAgIHJlbmRlcmVkVlRyZWVzLnNldCh0aGlzLm5vZGUsIG5ld05vZGUpO1xyXG4gIH1cclxuXHJcbiAgc3RhdGljIGZyb21FeGlzdGluZ0VsZW1lbnROb2RlKHZOb2RlOiBFbGVtZW50Vk5vZGUsIGNoaWxkcmVuOiBBcnJheTxWTm9kZUludGVyZmFjZSB8IFZOb2RlSW50ZXJmYWNlW10+KSB7XHJcbiAgICBjb25zdCB7IHRhZywgcHJvcHMsIHBhcmVudCwgbm9kZSwgc3ZnQ29udGV4dCB9ID0gdk5vZGU7XHJcbiAgICBjb25zdCBuZXdWTm9kZSA9IG5ldyBFbGVtZW50Vk5vZGUoeyB0YWcsIHByb3BzLCBjaGlsZHJlbiB9KTtcclxuICAgIE9iamVjdC5hc3NpZ24obmV3Vk5vZGUsIHsgcGFyZW50LCBub2RlLCBzdmdDb250ZXh0IH0pO1xyXG4gICAgcmV0dXJuIG5ld1ZOb2RlO1xyXG4gIH1cclxuXHJcbiAgc3RhdGljIGFkZFByb3BzKGVsZW1lbnQ6IEVsZW1lbnQsIG5ld1Byb3BzOiBSZWNvcmQ8c3RyaW5nLCBhbnk+LCBvbGRQcm9wcz86IFJlY29yZDxzdHJpbmcsIGFueT4pIHtcclxuICAgIGNvbnN0IGlzRGlmZiA9IHR5cGVvZiBvbGRQcm9wcyAhPT0gXCJ1bmRlZmluZWRcIjtcclxuICAgIGlmICghaXNEaWZmKSBvbGRQcm9wcyA9IHt9O1xyXG5cclxuICAgIC8vIGl0ZXJhdGUgb3ZlciBhbGwgbW9kaWZpZWQgbmV3IGFuZCBvbGQgcHJvcGVydGllcyBhbmQgc2V0L3JlbW92ZS91cGRhdGUgdGhlbVxyXG4gICAgQXJyYXkuZnJvbShuZXcgU2V0KFsuLi5PYmplY3Qua2V5cyhuZXdQcm9wcyksIC4uLk9iamVjdC5rZXlzKG9sZFByb3BzISldKSlcclxuICAgICAgLm1hcChwcm9wTmFtZSA9PiAoe1xyXG4gICAgICAgIHByb3BOYW1lLFxyXG4gICAgICAgIG9sZFZhbHVlOiBvbGRQcm9wcyFbcHJvcE5hbWVdLFxyXG4gICAgICAgIG5ld1ZhbHVlOiBuZXdQcm9wc1twcm9wTmFtZV0sXHJcbiAgICAgIH0pKVxyXG4gICAgICAuZmlsdGVyKCh7IG5ld1ZhbHVlLCBvbGRWYWx1ZSB9KSA9PiBuZXdWYWx1ZSAhPT0gb2xkVmFsdWUpXHJcbiAgICAgIC5mb3JFYWNoKCh7IHByb3BOYW1lLCBuZXdWYWx1ZSwgb2xkVmFsdWUgfSkgPT4ge1xyXG4gICAgICAgIC8vIGZvciBzdHlsZSBhcyBvYmplY3Q6XHJcbiAgICAgICAgLy8gKHN0eWxlOikge2Rpc3BsYXk6IFwibm9uZVwiLCBwb3NpdGlvbjogXCJhYnNvbHV0ZVwifSA9PT4gJ2Rpc3BsYXk6IG5vbmU7IHBvc2l0aW9uOiBhYnNvbHV0ZTsnXHJcbiAgICAgICAgaWYgKHByb3BOYW1lID09PSBcInN0eWxlXCIgJiYgdHlwZW9mIG5ld1ZhbHVlID09PSBcIm9iamVjdFwiKSB7XHJcbiAgICAgICAgICBuZXdWYWx1ZSA9IE9iamVjdC5lbnRyaWVzKG5ld1ZhbHVlKVxyXG4gICAgICAgICAgICAuZmlsdGVyKChbLCB2XSkgPT4gdHJ1dGh5KHYpKVxyXG4gICAgICAgICAgICAubWFwKChbaywgdl0pID0+IGAke2t9OiAke3Z9YClcclxuICAgICAgICAgICAgLmpvaW4oXCI7IFwiKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIChjbGFzczopIFtcImJ0blwiLCBcInJlZFwiXSA9PT4gXCJidG4gcmVkXCJcclxuICAgICAgICBpZiAocHJvcE5hbWUgPT09IFwiY2xhc3NcIiAmJiBBcnJheS5pc0FycmF5KG5ld1ZhbHVlKSkge1xyXG4gICAgICAgICAgbmV3VmFsdWUgPSBuZXdWYWx1ZS5qb2luKFwiIFwiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gcHJvcHMgc3RhcnRpbmcgd2l0aCBcIm9uLVwiIGFyZSBldmVudCBsaXN0ZW5lcnNcclxuICAgICAgICBpZiAoXHJcbiAgICAgICAgICBwcm9wTmFtZS5zdGFydHNXaXRoKFwib24tXCIpICYmXHJcbiAgICAgICAgICAodHlwZW9mIG5ld1ZhbHVlID09PSBcImZ1bmN0aW9uXCIgfHxcclxuICAgICAgICAgICAgdHlwZW9mIG5ld1ZhbHVlID09PSBcIm9iamVjdFwiIHx8XHJcbiAgICAgICAgICAgIHR5cGVvZiBvbGRWYWx1ZSA9PT0gXCJmdW5jdGlvblwiIHx8XHJcbiAgICAgICAgICAgIHR5cGVvZiBvbGRWYWx1ZSA9PT0gXCJvYmplY3RcIilcclxuICAgICAgICApIHtcclxuICAgICAgICAgIC8vIHJlbW92ZSBsZWFkaW5nIFwib24tXCJcIlxyXG4gICAgICAgICAgY29uc3QgZXZlbnQgPSBwcm9wTmFtZS5yZXBsYWNlKC9eb24tLywgXCJcIik7XHJcblxyXG4gICAgICAgICAgLy8ga2V5IGhhcyB0aGUgZm9ybSBvZiBcIm9uLWNoYW5nZVwiLiB2YWx1ZSBpcyB0aGUgY2FsbGJhY2sgZnVuY3Rpb24gb3IgYW4gb2JqZWN0IGltcGxlbWVudGluZyB7RXZlbnRMaXN0ZW5lcn0gaW50ZXJmYWNlXHJcbiAgICAgICAgICBpZiAodHlwZW9mIG5ld1ZhbHVlID09PSBcImZ1bmN0aW9uXCIgfHwgdHlwZW9mIG5ld1ZhbHVlID09PSBcIm9iamVjdFwiKSB7XHJcbiAgICAgICAgICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihldmVudCwgbmV3VmFsdWUgYXMgRXZlbnRMaXN0ZW5lck9yRXZlbnRMaXN0ZW5lck9iamVjdCk7XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgaWYgKHR5cGVvZiBvbGRWYWx1ZSA9PT0gXCJmdW5jdGlvblwiIHx8IHR5cGVvZiBvbGRWYWx1ZSA9PT0gXCJvYmplY3RcIikge1xyXG4gICAgICAgICAgICBlbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZlbnQsIG9sZFZhbHVlIGFzIEV2ZW50TGlzdGVuZXJPckV2ZW50TGlzdGVuZXJPYmplY3QpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSBpZiAocHJvcE5hbWUgPT09IFwicmVmXCIgJiYgdHlwZW9mIG5ld1ZhbHVlID09PSBcImZ1bmN0aW9uXCIpIHtcclxuICAgICAgICAgIHJlZnNUb0NhbGwucHVzaCgoKSA9PiBuZXdWYWx1ZShlbGVtZW50KSk7XHJcbiAgICAgICAgfSAvLyBvbGQgcmVmIGlzbid0IHVuc2V0XHJcbiAgICAgICAgLy8gdGhlIGBjaGVja2VkYCBhbmQgYHZhbHVlYCBhdHRyaWJ1dGUgb24gaW5wdXQgZWxlbWVudHMgd2lsbCB1cGRhdGUgdGhlIGBkZWZhdWx0Q2hlY2tlZGAgYW5kIGBkZWZhdWx0VmFsdWVgIHByb3BlcnR5LlxyXG4gICAgICAgIC8vIGFsc28gcG9zc2libGUgdG8gdGVzdCBpZiBjbGFzcyBoYXMgdGhlIHByb3BlcnR5IGFuZCBhbHdheXMgc2V0IGl0IHZpYSBwcm9wIGluc3RlYWQgb2YgYXR0cmlidXRlXHJcbiAgICAgICAgLy8gYnV0IHRoZXJlIGFyZSBzb21lIHJlYWR5IG9ubHkgcHJvcGVydGllcy4gYW5kIHVuY2xlYXIgaWYgb3VyIGN1c3RvbSBlbGVtZW50cyBhbHdheXMgaGF2ZSBhIHNldHRlciB3aGVuIHRoZXJlIGlzIGEgZ2V0dGVyIGZvciBzb21lIHByb3BzXHJcbiAgICAgICAgZWxzZSBpZiAoaXNEaWZmICYmIChwcm9wTmFtZSA9PT0gXCJjaGVja2VkXCIgfHwgcHJvcE5hbWUgPT09IFwidmFsdWVcIikpIHtcclxuICAgICAgICAgIC8vIEB0cy1pZ25vcmUgLSBlLmcuIGlucHV0IGVsZW1lbnRzIG5lZWQgY2hlY2tlZCBzZXQgYXMgcHJvcGVydHkgbm90IG9ubHkgYXR0cmlidXRlIHdoZW4gaXQgaXMgY2hhbmdlc1xyXG4gICAgICAgICAgZWxlbWVudFtwcm9wTmFtZV0gPSBuZXdWYWx1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gYm9vbGVhbiBhdHRyaWJ1dGUgc2V0IHdpdGhvdXQgdmFsdWVcclxuICAgICAgICBlbHNlIGlmIChuZXdWYWx1ZSA9PT0gdHJ1ZSkgZWxlbWVudC5zZXRBdHRyaWJ1dGUocHJvcE5hbWUsIFwiXCIpO1xyXG4gICAgICAgIC8vIHJlbW92ZSBvbGQgYXR0cmlidXRlcyB3aGljaCBhcmUgZmFsc2Ugbm93XHJcbiAgICAgICAgZWxzZSBpZiAoIXRydXRoeShuZXdWYWx1ZSkpIGVsZW1lbnQucmVtb3ZlQXR0cmlidXRlKHByb3BOYW1lKTtcclxuICAgICAgICAvLyB1cGRhdGUgdG8gbmV3IHZhbHVlIGFzIHN0cmluZ1xyXG4gICAgICAgIGVsc2UgaWYgKHR5cGVvZiBuZXdWYWx1ZSA9PT0gXCJzdHJpbmdcIiB8fCB0eXBlb2YgbmV3VmFsdWUgPT09IFwibnVtYmVyXCIpIHtcclxuICAgICAgICAgIGVsZW1lbnQuc2V0QXR0cmlidXRlKHByb3BOYW1lLCBTdHJpbmcobmV3VmFsdWUpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gQHRzLWlnbm9yZSAtIHByb3ZpZGluZyB0aGUgdmFsdWUgYXMgcHJvcGVydHkgdG8gaHRtbCBlbGVtZW50XHJcbiAgICAgICAgZWxzZSBlbGVtZW50W3Byb3BOYW1lXSA9IG5ld1ZhbHVlO1xyXG4gICAgICB9KTtcclxuICB9XHJcbn1cclxuXHJcbi8vIFYtTm9kZSBmb3IgdGhlIEZyYWdtZW50IGVsZW1lbnQgaW4ganN4IChgPD48Lz5gKSBvciB3aGVuIGFuIGFycmF5IGlzIHBsYWNlZCBkaXJlY3RseSBpbiBqc3ggY2hpbGRyZW4gKGUuZy4gYDxlbGVtPntbbGlzdF19PC9lbGVtPmApXHJcbmNsYXNzIEZyYWdtZW50Vk5vZGUgZXh0ZW5kcyBWTm9kZSBpbXBsZW1lbnRzIFZOb2RlSW50ZXJmYWNlIHtcclxuICB0eXBlID0gXCJGcmFnbWVudFwiO1xyXG4gIGNoaWxkcmVuOiBWTm9kZUludGVyZmFjZVtdO1xyXG4gIHBhcmVudDogVk5vZGVJbnRlcmZhY2UgPSBudWxsIGFzIGFueTtcclxuXHJcbiAgY29uc3RydWN0b3IoY2hpbGRyZW46IEpTWENoaWxkW10pIHtcclxuICAgIHN1cGVyKCk7XHJcblxyXG4gICAgdGhpcy5jaGlsZHJlbiA9IGNoaWxkcmVuLm1hcChjaGlsZCA9PiB7XHJcbiAgICAgIGlmIChBcnJheS5pc0FycmF5KGNoaWxkKSkgcmV0dXJuIG5ldyBGcmFnbWVudFZOb2RlKGNoaWxkKTtcclxuICAgICAgaWYgKGNoaWxkIGluc3RhbmNlb2YgVk5vZGUpIHJldHVybiBjaGlsZCBhcyBWTm9kZUludGVyZmFjZTtcclxuICAgICAgaWYgKGNoaWxkIGluc3RhbmNlb2YgTm9kZSkgcmV0dXJuIG5ldyBMaXZlTm9kZVZOb2RlKGNoaWxkKTtcclxuICAgICAgaWYgKCF0cnV0aHkoY2hpbGQpKSByZXR1cm4gbmV3IE51bGxWTm9kZSgpO1xyXG4gICAgICByZXR1cm4gbmV3IFRleHRWTm9kZShjaGlsZCBhcyBzdHJpbmcgfCBudW1iZXIgfCB0cnVlKTtcclxuICAgIH0pO1xyXG5cclxuICAgIHRoaXMuY2hpbGRyZW4uZm9yRWFjaChjaGlsZCA9PiAoY2hpbGQucGFyZW50ID0gdGhpcykpO1xyXG4gIH1cclxuXHJcbiAgYXNOb2RlKCkge1xyXG4gICAgY29uc3Qgbm9kZSA9IGFzTm9kZSh1bmRlZmluZWQsIHt9LCB0aGlzLmNoaWxkcmVuKSBhcyBEb2N1bWVudEZyYWdtZW50O1xyXG5cclxuICAgIHJldHVybiBub2RlO1xyXG4gIH1cclxuXHJcbiAgdG9TdHJpbmcoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5jaGlsZHJlbi5tYXAoY2hpbGQgPT4gY2hpbGQudG9TdHJpbmcoKSkuam9pbihcIlwiKTtcclxuICB9XHJcblxyXG4gIGRpZmZBbmRQYXRjaChuZXdWTm9kZTogRnJhZ21lbnRWTm9kZSkge1xyXG4gICAgcmV0dXJuIGRpZmZBbmRQYXRjaENoaWxkcmVuKHRoaXMsIG5ld1ZOb2RlKTtcclxuICB9XHJcblxyXG4gIHJlbW92ZUZyb21ET00oKSB7XHJcbiAgICB0aGlzLmNoaWxkcmVuLmZvckVhY2goY2hpbGQgPT4gY2hpbGQucmVtb3ZlRnJvbURPTSgpKTtcclxuICB9XHJcbn1cclxuXHJcbi8vIFYtTm9kZSBmb3IgaXRlbXMgd2hpY2ggYmUgcmVuZGVyZWQgYXMgdGV4dCAoc3RyaW5nLCBudW1iZXIsLi4gKVxyXG5jbGFzcyBUZXh0Vk5vZGUgZXh0ZW5kcyBWTm9kZSBpbXBsZW1lbnRzIFZOb2RlSW50ZXJmYWNlIHtcclxuICB0eXBlID0gXCJUZXh0Tm9kZVwiO1xyXG4gIGNoaWxkcmVuID0gW107XHJcbiAgbm9kZTogVGV4dCA9IG51bGwgYXMgYW55O1xyXG4gIHByb3BzOiB7IGNvbnRlbnQ6IGFueSB9O1xyXG4gIHBhcmVudDogVk5vZGVJbnRlcmZhY2UgPSBudWxsIGFzIGFueTtcclxuXHJcbiAgLyoqXHJcbiAgICpcclxuICAgKi9cclxuICBjb25zdHJ1Y3Rvcihjb250ZW50OiBzdHJpbmcgfCBudW1iZXIgfCBib29sZWFuKSB7XHJcbiAgICBzdXBlcigpO1xyXG4gICAgdGhpcy5wcm9wcyA9IHsgY29udGVudCB9O1xyXG4gIH1cclxuXHJcbiAgYXNOb2RlKCkge1xyXG4gICAgY29uc3QgdGV4dE5vZGUgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSh0aGlzLnByb3BzLmNvbnRlbnQpO1xyXG4gICAgdGhpcy5ub2RlID0gdGV4dE5vZGU7XHJcbiAgICByZXR1cm4gdGV4dE5vZGU7XHJcbiAgfVxyXG5cclxuICB0b1N0cmluZygpIHtcclxuICAgIHJldHVybiBzYW5pdGl6ZSh0aGlzLnByb3BzLmNvbnRlbnQpO1xyXG4gIH1cclxuXHJcbiAgZGlmZkFuZFBhdGNoKG5ld05vZGU6IFRleHRWTm9kZSkge1xyXG4gICAgdGhpcy5ub2RlLm5vZGVWYWx1ZSA9IG5ld05vZGUucHJvcHMuY29udGVudDtcclxuICAgIG5ld05vZGUubm9kZSA9IHRoaXMubm9kZTtcclxuICB9XHJcblxyXG4gIHJlbW92ZUZyb21ET00oKSB7XHJcbiAgICB0aGlzLm5vZGUucGFyZW50Tm9kZSEucmVtb3ZlQ2hpbGQodGhpcy5ub2RlKTtcclxuICB9XHJcbn1cclxuXHJcbi8vIFYtTm9kZSBmb3IgYG51bGxgLCBgZmFsc2VgIG9yIGB1bmRlZmluZWRgIGluIGpzeCBlbGVtZW50c1xyXG5jbGFzcyBOdWxsVk5vZGUgZXh0ZW5kcyBWTm9kZSBpbXBsZW1lbnRzIFZOb2RlSW50ZXJmYWNlIHtcclxuICB0eXBlID0gXCJOdWxsXCI7XHJcbiAgY2hpbGRyZW4gPSBbXTtcclxuICBwYXJlbnQ6IFZOb2RlSW50ZXJmYWNlID0gbnVsbCBhcyBhbnk7XHJcblxyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgc3VwZXIoKTtcclxuICB9XHJcblxyXG4gIGFzTm9kZSgpIHtcclxuICAgIC8vIHJldHVybiBudWxsOyAvLyByZXR1cm4gZW1wdHkgZnJhZ21lbnQ/XHJcbiAgICByZXR1cm4gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO1xyXG4gIH1cclxuXHJcbiAgZGlmZkFuZFBhdGNoKG5ld05vZGUyOiBOdWxsVk5vZGUpIHtcclxuICAgIHJldHVybjtcclxuICB9XHJcblxyXG4gIHJlbW92ZUZyb21ET00oKSB7XHJcbiAgICByZXR1cm47XHJcbiAgfVxyXG5cclxuICB0b1N0cmluZygpIHtcclxuICAgIHJldHVybiBcIlwiO1xyXG4gIH1cclxufVxyXG5cclxuLy8gVi1Ob2RlIHdoZW4gYSBsaXZlIEhUTUxFbGVtZW50IHdhcyByZWZlcm5jZWQgaW4ganN4IChlLmcuIGA8ZGl2Pntkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNvbXBcIil9PC9kaXY+YClcclxuY2xhc3MgTGl2ZU5vZGVWTm9kZSBleHRlbmRzIFZOb2RlIGltcGxlbWVudHMgVk5vZGVJbnRlcmZhY2Uge1xyXG4gIHR5cGUgPSBcIk5vZGVcIjtcclxuICBjaGlsZHJlbiA9IFtdIGFzIFZOb2RlSW50ZXJmYWNlW107XHJcbiAgcGFyZW50OiBWTm9kZUludGVyZmFjZSA9IG51bGwgYXMgYW55O1xyXG4gIG5vZGU6IE5vZGU7XHJcblxyXG4gIC8qKlxyXG4gICAqXHJcbiAgICovXHJcbiAgY29uc3RydWN0b3Iobm9kZTogTm9kZSkge1xyXG4gICAgc3VwZXIoKTtcclxuICAgIHRoaXMubm9kZSA9IG5vZGU7XHJcbiAgfVxyXG5cclxuICBhc05vZGUoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5ub2RlO1xyXG4gIH1cclxuXHJcbiAgZGlmZkFuZFBhdGNoKG5ld05vZGU6IExpdmVOb2RlVk5vZGUpIHtcclxuICAgIGlmIChuZXdOb2RlLm5vZGUgIT09IHRoaXMubm9kZSkge1xyXG4gICAgICAodGhpcy5ub2RlIGFzIENoaWxkTm9kZSkucmVwbGFjZVdpdGgobmV3Tm9kZS5ub2RlKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHJlbW92ZUZyb21ET00oKSB7XHJcbiAgICB0aGlzLm5vZGUucGFyZW50RWxlbWVudCEucmVtb3ZlQ2hpbGQodGhpcy5ub2RlKTtcclxuICB9XHJcblxyXG4gIHRvU3RyaW5nKCkge1xyXG4gICAgcmV0dXJuIGdldE91dGVySHRtbCh0aGlzLm5vZGUpO1xyXG4gIH1cclxufVxyXG5cclxuLy8gd3JhcHBlciBWLU5vZGUgd2hpY2ggcmVmZXJlbmNlcyB0aGUgSFRNTCBOb2RlIHdoaWNoIGl0c2VsZiBpcyBub3QgcmVuZGVyZWQgYnkganN4LCBidXQgaXRzIGNvbnRlbnQuXHJcbmNsYXNzIFJvb3RWTm9kZSBleHRlbmRzIFZOb2RlIGltcGxlbWVudHMgVk5vZGVJbnRlcmZhY2Uge1xyXG4gIHR5cGUgPSBcIlJvb3RcIjtcclxuICBwYXJlbnQgPSBudWxsO1xyXG4gIG5vZGU6IEVsZW1lbnQ7XHJcbiAgY2hpbGRyZW46IFZOb2RlSW50ZXJmYWNlW107XHJcbiAgLyoqXHJcbiAgICpcclxuICAgKi9cclxuICBjb25zdHJ1Y3Rvcihjb250ZW50OiBWTm9kZUludGVyZmFjZSwgZG9tTm9kZTogRWxlbWVudCkge1xyXG4gICAgc3VwZXIoKTtcclxuICAgIGNvbnRlbnQucGFyZW50ID0gdGhpcztcclxuICAgIHRoaXMuY2hpbGRyZW4gPSBbY29udGVudF07XHJcbiAgICB0aGlzLm5vZGUgPSBkb21Ob2RlO1xyXG4gIH1cclxuXHJcbiAgYXNOb2RlKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuY2hpbGRyZW5bMF0uYXNOb2RlKCk7XHJcbiAgfVxyXG4gIHRvU3RyaW5nKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuY2hpbGRyZW5bMF0udG9TdHJpbmcoKTtcclxuICB9XHJcblxyXG4gIGRpZmZBbmRQYXRjaChuZXdWTm9kZTogVk5vZGVJbnRlcmZhY2UpIHtcclxuICAgIGRpZmZBbmRQYXRjaENoaWxkcmVuKHRoaXMsIG5ld1ZOb2RlKTtcclxuICB9XHJcblxyXG4gIHJlbW92ZUZyb21ET00oKSB7XHJcbiAgICB0aGlzLm5vZGUucmVtb3ZlKCk7XHJcbiAgfVxyXG59XHJcblxyXG4vLyBnZW5lcmF0ZSB0aGUgVi1Ob2RlcyBhbmQgVi1UcmVlIGJhc2VkIG9uIHRoZSBvYmplY3RzIHBhcnNlZCBieSB0aGUganN4IGJhYmVsIHBsdWdpblxyXG5mdW5jdGlvbiBhc1ZOb2RlKHRhZzogc3RyaW5nIHwgRnVuY3Rpb24gfCB1bmRlZmluZWQsIHByb3BzOiBKc3hQcm9wcyk6IFZOb2RlSW50ZXJmYWNlIHtcclxuICBpZiAodHlwZW9mIHRhZyA9PT0gXCJmdW5jdGlvblwiKSB7XHJcbiAgICBsZXQgcmVmOiBGdW5jdGlvbiB8IHVuZGVmaW5lZCA9IHVuZGVmaW5lZDtcclxuICAgIGlmIChwcm9wcy5yZWYpIHtcclxuICAgICAgcmVmID0gcHJvcHMucmVmO1xyXG4gICAgICBkZWxldGUgcHJvcHMucmVmO1xyXG4gICAgfVxyXG4gICAgY29uc3QgcmVzdWx0ID0gdGFnKHByb3BzKTtcclxuICAgIGlmIChyZXN1bHQgaW5zdGFuY2VvZiBWTm9kZSkge1xyXG4gICAgICBpZiAodHlwZW9mIHJlZiA9PT0gXCJmdW5jdGlvblwiKSB7XHJcbiAgICAgICAgcmVmc1RvQ2FsbC5wdXNoKCgpID0+IHtcclxuICAgICAgICAgIC8vIEB0cy1pZ25vcmUgbm9kZSBwcm9wZXJ0eSBtaWdodCBleGlzdCBvciBub3QuIHRoaXMgaXMgY2hlY2tlZCBoZXJlXHJcbiAgICAgICAgICBjb25zdCB2Tm9kZSA9IHJlc3VsdC5ub2RlID8gcmVzdWx0IDogZ2V0Q2hpbGRyZW5XaXRoTm9kZXMocmVzdWx0IGFzIFZOb2RlSW50ZXJmYWNlKVswXTtcclxuXHJcbiAgICAgICAgICAvLyBAdHMtaWdub3JlIHZOb2RlIHdpdGggbm9kZSBpcyByZXR1cm5lZFxyXG4gICAgICAgICAgaWYgKHZOb2RlKSByZWYhKHZOb2RlLm5vZGUpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiByZXN1bHQgYXMgVk5vZGVJbnRlcmZhY2U7XHJcbiAgICB9XHJcbiAgICBpZiAocmVzdWx0IGluc3RhbmNlb2YgTm9kZSkgcmV0dXJuIG5ldyBMaXZlTm9kZVZOb2RlKHJlc3VsdCk7XHJcbiAgICAvLyBudWxsIGpzeCBub2RlXHJcbiAgICBpZiAoIXRydXRoeShyZXN1bHQpKSByZXR1cm4gbmV3IE51bGxWTm9kZSgpO1xyXG5cclxuICAgIHJldHVybiBuZXcgVGV4dFZOb2RlKHJlc3VsdCk7XHJcbiAgfVxyXG5cclxuICBjb25zdCB7IGNoaWxkcmVuLCAuLi5hdHRyIH0gPSBwcm9wcztcclxuXHJcbiAgcmV0dXJuIHRhZyA/IG5ldyBFbGVtZW50Vk5vZGUoeyB0YWcsIGNoaWxkcmVuLCBwcm9wczogYXR0ciB9KSA6IG5ldyBGcmFnbWVudFZOb2RlKGNoaWxkcmVuKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIGNvbnZlcnRzIHByYWdtYSBvYmplY3QgdG8gaHRtbCBzdHJpbmdcclxuICoganN4cyBpcyBhbHdheXMgY2FsbGVkIHdoZW4gZWxlbWVudCBoYXMgbW9yZSB0aGFuIG9uZSBjaGlsZFxyXG4gKlxyXG4gKiBAcGFyYW0ge3N0cmluZyB8IEZ1bmN0aW9ufSB0YWcgLSB0YWcgbmFtZSBvciB0YWcgY2xhc3NcclxuICogQHBhcmFtIHtPYmplY3QgfCBudWxsfSBwcm9wcyAtIHByb3BzIGZvciB0aGUgdGFnXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24ganN4cyh0YWc6IHN0cmluZyB8IEZ1bmN0aW9uLCBwcm9wczogSnN4UHJvcHMpOiBWTm9kZUludGVyZmFjZSB7XHJcbiAgcmV0dXJuIGFzVk5vZGUodGFnLCBwcm9wcyk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBjb252ZXJ0cyB0aGUgZnJhZ21lbnRzIG9iamVjdCB0byBub2Rlc1xyXG4gKlxyXG4gKiBAcGFyYW0ge09iamVjdH0gcHJvcHNcclxuICogQHBhcmFtIHtBcnJheX0gcHJvcHMuY2hpbGRyZW4gLSBjaGlsZCBlbGVtZW50cyBpbiB0aGUgZnJhZ21lbnRcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBGcmFnbWVudChwcm9wczogSnN4UHJvcHMpIHtcclxuICByZXR1cm4gYXNWTm9kZSh1bmRlZmluZWQsIHByb3BzKTtcclxufVxyXG5cclxuLy8ganN4IGlzIGNhbGxlZCB3aGVuIHRoZSBlbGVtZW50IGhhcyBvbmUgb3IgemVybyBjaGlsZHJlblxyXG5leHBvcnQgZnVuY3Rpb24ganN4KFxyXG4gIHRhZzogc3RyaW5nIHwgRnVuY3Rpb24sXHJcbiAgcHJvcHM6IEF0dHJpYnV0ZXMgJiBTcGVjaWFsQXR0cmlidXRlcyAmIHsgY2hpbGRyZW4/OiBKU1hDaGlsZCB9LFxyXG4pOiBWTm9kZUludGVyZmFjZSB7XHJcbiAgLy8gQHRzLWlnbm9yZSAtIHdyYXBwaW5nIHRoZSBjaGlsZHJlbiBhcyBhcnJheSB0byByZS11c2UganN4cyBtZXRob2RcclxuICBwcm9wcy5jaGlsZHJlbiA9IHByb3BzLmhhc093blByb3BlcnR5KFwiY2hpbGRyZW5cIikgPyBbcHJvcHMuY2hpbGRyZW5dIDogW107XHJcblxyXG4gIHJldHVybiBqc3hzKHRhZywgcHJvcHMgYXMgSnN4UHJvcHMpO1xyXG59XHJcblxyXG4vKipcclxuICogcmVuZGVyIHRoZSBnaXZlbiBtYXJrdXAgaW50byB0aGUgZ2l2ZW4gSFRNTCBub2RlXHJcbiAqXHJcbiAqIEBwYXJhbSB7SlNYQ2hpbGR9IG1hcmt1cCAtIGh0bWwgYXMgc3RyaW5nLCBodG1sIGVsZW1lbnQgb3IganN4IHRlbXBsYXRlXHJcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGRvbU5vZGUgLSBjb250YWluZXIgZm9yIHRoZSB0ZW1wbGF0ZSB0byBiZSByZW5kZXJlZCBpbnRvXHJcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW2FwcGVuZD1mYWxzZV0gLSBzaG91bGQgdGhlIHByb3ZpZGVkIG1hcmt1cCBiZSBhcHBlbmRlZCB0byB0aGUgZXhpc3RpbmcgbWFya3VwLCBvciBkZWZhdWx0IHJlcGxhY2UgaXRcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiByZW5kZXIoXHJcbiAgbWFya3VwOiBzdHJpbmcgfCBudW1iZXIgfCBudWxsIHwgYm9vbGVhbiB8IHVuZGVmaW5lZCB8IEhUTUxFbGVtZW50IHwgVk5vZGVJbnRlcmZhY2UsXHJcbiAgZG9tTm9kZTogSFRNTEVsZW1lbnQsXHJcbiAgYXBwZW5kOiBib29sZWFuID0gZmFsc2UsXHJcbikge1xyXG4gIC8vIHRoZSBjb250ZW50IG9mIHRoZSBnaXZlbiBET00gTm9kZSB3YXMgYWxyZWFkeSByZW5kZXJlZCBieSBqc3gtcnVudGltZSwgYW5kIGl0IG9ubHkgbmVlZHMgdG8gYmUgdXBkYXRlZFxyXG4gIGNvbnN0IGlzUmVSZW5kZXIgPSByZW5kZXJlZFZUcmVlcy5oYXMoZG9tTm9kZSk7XHJcblxyXG4gIGlmICh0eXBlb2YgbWFya3VwID09PSBcInN0cmluZ1wiIHx8IHR5cGVvZiBtYXJrdXAgPT09IFwibnVtYmVyXCIgfHwgbWFya3VwID09PSB0cnVlKSB7XHJcbiAgICBtYXJrdXAgPSBuZXcgVGV4dFZOb2RlKG1hcmt1cCk7XHJcbiAgfSBlbHNlIGlmIChtYXJrdXAgaW5zdGFuY2VvZiBOb2RlKSB7XHJcbiAgICBtYXJrdXAgPSBuZXcgTGl2ZU5vZGVWTm9kZShtYXJrdXApO1xyXG4gIH0gZWxzZSBpZiAobWFya3VwID09PSB1bmRlZmluZWQgfHwgbWFya3VwID09PSBudWxsIHx8IG1hcmt1cCA9PT0gZmFsc2UpIHtcclxuICAgIG1hcmt1cCA9IG5ldyBOdWxsVk5vZGUoKTtcclxuICB9XHJcblxyXG4gIGlmIChtYXJrdXAgaW5zdGFuY2VvZiBWTm9kZSkge1xyXG4gICAgbGV0IHZUcmVlO1xyXG5cclxuICAgIGlmICghYXBwZW5kICYmICFpc1JlUmVuZGVyKSBkb21Ob2RlLmlubmVySFRNTCA9IFwiXCI7XHJcblxyXG4gICAgaWYgKGlzUmVSZW5kZXIpIHtcclxuICAgICAgY29uc3Qgb2xkVlRyZWUgPSByZW5kZXJlZFZUcmVlcy5nZXQoZG9tTm9kZSkhO1xyXG5cclxuICAgICAgLy8gd2FzIHByZXZpb3VzbHkgcmVuZGVyZWQgYXMgYSBzdWJ0cmVlIGZyb20gYW5vdGhlciByZW5kZXJcclxuICAgICAgaWYgKG9sZFZUcmVlLnR5cGUgPT09IFwiRWxlbWVudFwiKSB7XHJcbiAgICAgICAgdlRyZWUgPSBFbGVtZW50Vk5vZGUuZnJvbUV4aXN0aW5nRWxlbWVudE5vZGUob2xkVlRyZWUgYXMgRWxlbWVudFZOb2RlLCBbbWFya3VwXSk7XHJcbiAgICAgICAgKG9sZFZUcmVlIGFzIEVsZW1lbnRWTm9kZSkuZGlmZkFuZFBhdGNoKHZUcmVlKTtcclxuICAgICAgICAvLyB1cGRhdGUgdGhlIGNoaWxkcmVuIHByb3BlcnR5IGluIHRoZSBtZW1vcnkgcmVmZXJlbmNlIGZyb20gdGhlIHByZXZpb3VzIHJlbmRlcixcclxuICAgICAgICAvLyBhdHRyaWJ1dGVzLCBldGMgd2lsbCBzdGF5IHRoZSBzYW1lXHJcbiAgICAgICAgb2xkVlRyZWUuY2hpbGRyZW4gPSB2VHJlZS5jaGlsZHJlbjtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB2VHJlZSA9IG5ldyBSb290Vk5vZGUobWFya3VwLCBkb21Ob2RlKTtcclxuICAgICAgICAvLyBkaWZmIGFuZCBwYXRjaCBET00gYmFzZWQgb24gdGhlIGxhc3QgcmVuZGVyXHJcbiAgICAgICAgKG9sZFZUcmVlIGFzIFJvb3RWTm9kZSkuZGlmZkFuZFBhdGNoKHZUcmVlKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgLy8gZmlyc3QgdGltZSByZW5kZXJcclxuICAgIGVsc2Uge1xyXG4gICAgICB2VHJlZSA9IG5ldyBSb290Vk5vZGUobWFya3VwLCBkb21Ob2RlKTtcclxuICAgICAgZG9tTm9kZS5hcHBlbmQodlRyZWUuYXNOb2RlKCkpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIG1lbW9yaXplIHRoZSBWLVRyZWUgd2hpY2ggcmVuZGVyZWQgdGhlIGN1cnJlbnQgRE9NLCB0byB1c2UgaXQgaW4gZnV0dXJlIHJlLXJlbmRlcnNcclxuICAgIHJlbmRlcmVkVlRyZWVzLnNldChkb21Ob2RlLCB2VHJlZSk7XHJcblxyXG4gICAgLy8gY2FsbCBhbGwgcmVmIGNhbGxiYWNrcyBmb3VuZCBkdXJpbmcgY3JlYXRpb24gb2YgbmV3IG5vZGVzIGR1cmluZyByZW5kZXJcclxuICAgIHdoaWxlIChyZWZzVG9DYWxsLmxlbmd0aCkge1xyXG4gICAgICAvLyByZW1vdmUgZmlyc3QgZnJvbSBsaXN0LCBhbmQgaW52b2tlIGl0XHJcbiAgICAgIHJlZnNUb0NhbGwuc3BsaWNlKDAsIDEpWzBdKCk7XHJcbiAgICB9XHJcbiAgfSBlbHNlIHtcclxuICAgIHRocm93IG5ldyBFcnJvcihcInJlbmRlciBtZXRob2QgY2FsbGVkIHdpdGggd3JvbmcgYXJndW1lbnQocylcIik7XHJcbiAgfVxyXG59XHJcblxyXG4vLyBwcm92aWRlcyBjb21wb25lbnQgdG8gYXV0b25vbW91cyB1cGRhdGUgaXRzIGNvbnRlbnQgd2hlbiBwcm92aWRlZCBwcm9taXNlIHJlc29sdmVkXHJcbmV4cG9ydCBjbGFzcyBTdXNwZW5zZVZOb2RlIGV4dGVuZHMgVk5vZGUgaW1wbGVtZW50cyBWTm9kZUludGVyZmFjZSB7XHJcbiAgdHlwZSA9IFwiU3VzcGVuc2VcIjtcclxuICBwYXJlbnQ6IFZOb2RlSW50ZXJmYWNlID0gbnVsbCBhcyBhbnk7XHJcbiAgY2hpbGRyZW46IEFycmF5PFZOb2RlSW50ZXJmYWNlPjtcclxuXHJcbiAgcGxhY2Vob2xkZXI6IEpTWENoaWxkO1xyXG4gIHByb21pc2U6IFByb21pc2U8YW55PjtcclxuICB0ZW1wbGF0ZTogRnVuY3Rpb247XHJcblxyXG4gIC8vIHByb3ZpZGVkIHByb21pc2UgaXMgcmVzb2x2ZWQgYW5kIGNvbnRlbnQgdXBkYXRlZFxyXG4gIGlzUmVzb2x2ZWQgPSBmYWxzZTtcclxuXHJcbiAgLy8gVi1Ob2RlIGlzIGFscmVhZHkgcmVtb3ZlZCBmcm9tIG5vZGUgYmVjYXVzZSBvZiBhIHJlLXJlbmRlclxyXG4gIGlzUmVtb3ZlZCA9IGZhbHNlO1xyXG5cclxuICBjb25zdHJ1Y3Rvcih7XHJcbiAgICBwbGFjZWhvbGRlcixcclxuICAgIHByb21pc2UsXHJcbiAgICB0ZW1wbGF0ZSxcclxuICB9OiB7XHJcbiAgICBwbGFjZWhvbGRlcjogSlNYQ2hpbGQ7XHJcbiAgICBwcm9taXNlOiBQcm9taXNlPGFueT47XHJcbiAgICB0ZW1wbGF0ZTogRnVuY3Rpb247XHJcbiAgfSkge1xyXG4gICAgc3VwZXIoKTtcclxuXHJcbiAgICB0aGlzLnBsYWNlaG9sZGVyID0gcGxhY2Vob2xkZXI7XHJcbiAgICB0aGlzLnByb21pc2UgPSBwcm9taXNlO1xyXG4gICAgdGhpcy50ZW1wbGF0ZSA9IHRlbXBsYXRlO1xyXG4gICAgY29uc3QgY2hpbGQgPSBuZXcgRnJhZ21lbnRWTm9kZShbcGxhY2Vob2xkZXJdKTtcclxuICAgIGNoaWxkLnBhcmVudCA9IHRoaXM7XHJcbiAgICB0aGlzLmNoaWxkcmVuID0gW2NoaWxkXTtcclxuICB9XHJcblxyXG4gIGFzTm9kZSgpIHtcclxuICAgIHRoaXMud2FpdEFuZFJlUmVuZGVyKCk7XHJcblxyXG4gICAgcmV0dXJuIHRoaXMuY2hpbGRyZW5bMF0uYXNOb2RlKCk7XHJcbiAgfVxyXG5cclxuICB3YWl0QW5kUmVSZW5kZXIoKSB7XHJcbiAgICB0aGlzLnByb21pc2UudGhlbih2YWx1ZSA9PiB7XHJcbiAgICAgIGlmICh0aGlzLmlzUmVtb3ZlZCkgcmV0dXJuO1xyXG4gICAgICB0aGlzLmlzUmVzb2x2ZWQgPSB0cnVlO1xyXG4gICAgICBjb25zdCBjb250ZW50TWFya3VwID0gdGhpcy50ZW1wbGF0ZSh2YWx1ZSk7XHJcbiAgICAgIGNvbnN0IG5ld0NvbnRlbnQgPSBuZXcgRnJhZ21lbnRWTm9kZShbY29udGVudE1hcmt1cF0pO1xyXG4gICAgICBuZXdDb250ZW50LnBhcmVudCA9IHRoaXM7XHJcbiAgICAgIHRoaXMuY2hpbGRyZW5bMF0uZGlmZkFuZFBhdGNoKG5ld0NvbnRlbnQpO1xyXG4gICAgICB0aGlzLmNoaWxkcmVuID0gW25ld0NvbnRlbnRdO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICAvLyBvbmx5IHJldHVybmluZyB0aGUgcGxhY2Vob2xkZXIuXHJcbiAgLy8gbm90IGF1dG9tYXRpY2FsbHkgcmVuZGVyaW5nIHdoZW4gcHJvbWlzZSByZXNvbHZlc1xyXG4gIHRvU3RyaW5nKCkge1xyXG4gICAgcmV0dXJuIHRoaXMucGxhY2Vob2xkZXIgPyB0aGlzLnBsYWNlaG9sZGVyLnRvU3RyaW5nKCkgOiBcIlwiO1xyXG4gIH1cclxuXHJcbiAgcmVtb3ZlRnJvbURPTSgpIHtcclxuICAgIHRoaXMuaXNSZW1vdmVkID0gdHJ1ZTtcclxuICAgIHRoaXMuY2hpbGRyZW4uZm9yRWFjaChjaGlsZFZOb2RlID0+IGNoaWxkVk5vZGUucmVtb3ZlRnJvbURPTSgpKTtcclxuICB9XHJcblxyXG4gIGRpZmZBbmRQYXRjaChuZXdOb2RlOiBTdXNwZW5zZVZOb2RlKSB7XHJcbiAgICBpZiAoIXRoaXMuaXNSZXNvbHZlZCkge1xyXG4gICAgICAvLyBwYXRjaGVzIHRoZSBwbGFjZWhvbGRlciB3aXRoIGVhY2ggb3RoZXJcclxuICAgICAgZGlmZkFuZFBhdGNoQ2hpbGRyZW4odGhpcywgbmV3Tm9kZSk7XHJcbiAgICAgIG5ld05vZGUud2FpdEFuZFJlUmVuZGVyKCk7XHJcbiAgICB9XHJcbiAgICAvLyBhbHJlYWR5IHJlc29sdmVkLCBwcm9taXNlIGJ1dCBoYXMgYmVlbiBjaGFuZ2VkLlxyXG4gICAgLy8gc3RhcnQgbmV3IHdpdGggdGhlIHBsYWNlaG9sZGVyXHJcbiAgICBlbHNlIGlmICh0aGlzLnByb21pc2UgIT09IG5ld05vZGUucHJvbWlzZSkge1xyXG4gICAgICB0aGlzLnJlbW92ZUZyb21ET00oKTtcclxuICAgICAgaW5zZXJ0TmV3SXRlbShuZXdOb2RlKTtcclxuICAgIH1cclxuICAgIC8vIGFscmVhZHkgcmVzb2x2ZWQsIHByb21pc2Ugc3RpbGwgdGhlIHNhbWUuXHJcbiAgICAvLyBkaWZmIGFuZCBwYXRjaCB0aGUgdGVtcGxhdGUgcmVzdWx0c1xyXG4gICAgZWxzZSB7XHJcbiAgICAgIG5ld05vZGUucHJvbWlzZS50aGVuKHZhbHVlID0+IHtcclxuICAgICAgICBuZXdOb2RlLmlzUmVzb2x2ZWQgPSB0cnVlO1xyXG4gICAgICAgIGNvbnN0IGNvbnRlbnRNYXJrdXAgPSBuZXdOb2RlLnRlbXBsYXRlKHZhbHVlKTtcclxuICAgICAgICBjb25zdCBuZXdDb250ZW50ID0gbmV3IEZyYWdtZW50Vk5vZGUoW2NvbnRlbnRNYXJrdXBdKTtcclxuICAgICAgICBuZXdDb250ZW50LnBhcmVudCA9IG5ld05vZGU7XHJcbiAgICAgICAgbmV3Tm9kZS5jaGlsZHJlbiA9IFtuZXdDb250ZW50XTtcclxuXHJcbiAgICAgICAgZGlmZkFuZFBhdGNoQ2hpbGRyZW4odGhpcywgbmV3Tm9kZSk7XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIGN1cnJlbnQgU3VzcGVuc2UgTm9kZSBpcyBub3QgaW4gdXNlIGFueSBtb3JlXHJcbiAgICB0aGlzLmlzUmVtb3ZlZCA9IHRydWU7XHJcbiAgfVxyXG59XHJcblxyXG4vKipcclxuICogdGhlIHByb3ZpZGVkIHN0cmluZyB3aWxsIGJlIHJlbmRlcmVkIGFzIG1hcmt1cCBhbmQgbm90IGVzY2FwZWQgLyBzYW5pdGl6ZWQuXHJcbiAqIFVzZSB0aGlzIHdpdGggY2F1dGlvbiBiZWNhdXNlIHRoZW9yZXRpY2FsbHkgaXQgYWxsb3dzIGJyb2tlbiBodG1sIG9yIGV2ZW4geHNzIGF0dGFja3NcclxuICpcclxuICpcclxuICogQGV4cG9ydFxyXG4gKiBAcGFyYW0ge3N0cmluZ30gY29udGVudCAtIGh0bWwgYXMgc3RyaW5nIHdoaWNoIG5lZWRzIHRvIGJlIHJlbmRlcmVkXHJcbiAqIEByZXR1cm5zIHtWTm9kZUludGVyZmFjZX1cclxuICogQGV4YW1wbGVcclxuICogYDxhcnRpY2xlPnsgcmF3SHRtbChyaWNoVGV4dCkgfTwvYXJ0aWNsZT5gXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gcmF3SHRtbChjb250ZW50OiBzdHJpbmcpOiBWTm9kZUludGVyZmFjZSB7XHJcbiAgcmV0dXJuIG5ldyAoY2xhc3MgUmF3SHRtbCBleHRlbmRzIFZOb2RlIGltcGxlbWVudHMgVk5vZGVJbnRlcmZhY2Uge1xyXG4gICAgcGFyZW50OiBWTm9kZUludGVyZmFjZSA9IG51bGwgYXMgYW55O1xyXG4gICAgY2hpbGRyZW4gPSBbXTtcclxuICAgIHR5cGUgPSBcIlJhd0h0bWxcIjtcclxuICAgIGNoaWxkTm9kZXM6IENoaWxkTm9kZVtdID0gbnVsbCBhcyBhbnk7XHJcbiAgICBjb250ZW50OiBzdHJpbmc7XHJcbiAgICBub2RlPzogTm9kZTtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihjb250ZW50OiBzdHJpbmcpIHtcclxuICAgICAgc3VwZXIoKTtcclxuICAgICAgdGhpcy5jb250ZW50ID0gY29udGVudDtcclxuICAgIH1cclxuXHJcbiAgICByZW1vdmVGcm9tRE9NKCkge1xyXG4gICAgICB0aGlzLmNoaWxkTm9kZXMuZm9yRWFjaChub2RlID0+IG5vZGUucGFyZW50RWxlbWVudCEucmVtb3ZlQ2hpbGQobm9kZSkpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIHNpbXBsZSByZS1yZW5kZXJzIHdpdGhvdXQgZGlmZmluZyBhbmQgcGF0Y2hpbmcgaW4gY2FzZSBvZiBtb2RpZmllZCBjb250ZW50XHJcbiAgICBkaWZmQW5kUGF0Y2gobmV3Tm9kZTogUmF3SHRtbCkge1xyXG4gICAgICBpZiAoKG5ld05vZGUuY29udGVudCA9IHRoaXMuY29udGVudCkpIHtcclxuICAgICAgICBuZXdOb2RlLm5vZGUgPSB0aGlzLm5vZGU7XHJcbiAgICAgICAgbmV3Tm9kZS5jaGlsZE5vZGVzID0gdGhpcy5jaGlsZE5vZGVzO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG4gICAgICB0aGlzLnJlbW92ZUZyb21ET00oKTtcclxuICAgICAgaW5zZXJ0TmV3SXRlbShuZXdOb2RlKTtcclxuICAgIH1cclxuXHJcbiAgICB0b1N0cmluZygpIHtcclxuICAgICAgcmV0dXJuIGNvbnRlbnQ7XHJcbiAgICB9XHJcblxyXG4gICAgYXNOb2RlKCkge1xyXG4gICAgICBjb25zdCB0ZW1wbGF0ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0ZW1wbGF0ZVwiKTtcclxuICAgICAgdGVtcGxhdGUuaW5uZXJIVE1MID0gdGhpcy5jb250ZW50O1xyXG4gICAgICBjb25zdCBkb2N1bWVudEZyYWdtZW50ID0gdGVtcGxhdGUuY29udGVudDtcclxuICAgICAgdGhpcy5jaGlsZE5vZGVzID0gQXJyYXkuZnJvbShkb2N1bWVudEZyYWdtZW50LmNoaWxkTm9kZXMpO1xyXG5cclxuICAgICAgLy8gYmFzaWNhbGx5IHRoZSBgLm5vZGVgIHByb3BlcnR5IGlzIHVzZWQgdG8gZGV0ZXJtaW5lIHRoZSBsYXN0IGh0bWwgbm9kZSBvZiB0aGUgVk5vZGUsXHJcbiAgICAgIC8vIHRvIHBvc2l0aW9uIHRoZSBuZXh0IFZOb2RlJ3MgRE9NIE5vZGUgYWZ0ZXIgaXQuXHJcbiAgICAgIC8vIHRoZXJlZm9yZSAubm9kZSByZXR1cm5zIHRoZSBsYXN0IG5vZGUgb2YgdGhlIHJhdyBodG1sXHJcbiAgICAgIGlmICh0aGlzLmNoaWxkTm9kZXMubGVuZ3RoKSB7XHJcbiAgICAgICAgdGhpcy5ub2RlID0gdGhpcy5jaGlsZE5vZGVzW3RoaXMuY2hpbGROb2Rlcy5sZW5ndGggLSAxXTtcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gZG9jdW1lbnRGcmFnbWVudDtcclxuICAgIH1cclxuICB9KShjb250ZW50KTtcclxufVxyXG5cclxuLyoqXHJcbiAqXHJcbiAqIEBwYXJhbSBwYXJhbTBcclxuICogQGV4YW1wbGVcclxuICogICA8U3VzcGVuc2VcclxuICogICAgIHBsYWNlaG9sZGVyPXs8UGxhY2Vob2xkZXJUYWJsZVJvd3MgLz59XHJcbiAqICAgICBwcm9taXNlPXtwZW5kaW5nUmVxdWVzdH1cclxuICogICAgIHRlbXBsYXRlPXsocmVzcG9uc2UpID0+XHJcbiAqICAgICAgIDxUYWJsZVJvd3Mgcm93cz17cmVzcG9uc2Uucm93c30gLz5cclxuICogICAgIH1cclxuICogICAvPlxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIFN1c3BlbnNlKHtcclxuICBwbGFjZWhvbGRlcixcclxuICBwcm9taXNlLFxyXG4gIHRlbXBsYXRlLFxyXG59OiB7XHJcbiAgcGxhY2Vob2xkZXI6IEpTWENoaWxkO1xyXG4gIHByb21pc2U6IFByb21pc2U8YW55PjtcclxuICB0ZW1wbGF0ZTogRnVuY3Rpb247XHJcbn0pIHtcclxuICByZXR1cm4gbmV3IFN1c3BlbnNlVk5vZGUoe1xyXG4gICAgcGxhY2Vob2xkZXIsXHJcbiAgICBwcm9taXNlLFxyXG4gICAgdGVtcGxhdGUsXHJcbiAgfSk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBAZXhhbXBsZVxyXG4gKiAgaW1wb3J0IHsgY3JlYXRlUmVmIH0gZnJvbSBcIi4vanN4LXJ1bnRpbWVcIjtcclxuICogIGZ1bmN0aW9uIENvbXAoKSB7XHJcbiAqICAgIGNvbnN0IHJlZiA9IGNyZWF0ZVJlZjxIVE1MSW5wdXRFbGVtZW50PigpO1xyXG4gKlxyXG4gKiAgICByZXR1cm4gKFxyXG4gKiAgICAgIDw+XHJcbiAqICAgICAgICA8aW5wdXQgcmVmPXtyZWZ9IC8+XHJcbiAqICAgICAgICA8bXktbGFiZWwgb24tY2xpY2s9eygpID0+IHJlZi5jdXJyZW50LmZvY3VzKCkgfSAvPlxyXG4gKiAgICAgIDwvPlxyXG4gKiAgICApO1xyXG4gKiAgfVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVJlZjxUIGV4dGVuZHMgSFRNTEVsZW1lbnQgfCBTVkdFbGVtZW50ID0gSFRNTEVsZW1lbnQ+KCkge1xyXG4gIGludGVyZmFjZSBSZWZPYmplY3Qge1xyXG4gICAgKGVsOiBIVE1MRWxlbWVudCB8IFNWR0VsZW1lbnQpOiB2b2lkO1xyXG4gICAgY3VycmVudDogbnVsbCB8IFQ7XHJcbiAgfVxyXG5cclxuICBjb25zdCByZXN1bHQgPSBmdW5jdGlvbiAoZWw6IEhUTUxFbGVtZW50IHwgU1ZHRWxlbWVudCkge1xyXG4gICAgcmVzdWx0LmN1cnJlbnQgPSBlbCBhcyBUO1xyXG4gIH0gYXMgUmVmT2JqZWN0O1xyXG4gIHJlc3VsdC5jdXJyZW50ID0gbnVsbDtcclxuXHJcbiAgcmV0dXJuIHJlc3VsdDtcclxufVxyXG5cclxuZXhwb3J0IHR5cGUgUmVmT2JqZWN0PFQgPSBIVE1MRWxlbWVudD4gPSB7IGN1cnJlbnQ6IFQgfCBudWxsIH07XHJcbiJdLCJzb3VyY2VSb290IjoiIn0=