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
/*! exports provided: jsxs, Fragment, jsx, render, rawHtml, Deferred, DeferredVNode */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "jsxs", function() { return jsxs; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Fragment", function() { return Fragment; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "jsx", function() { return jsx; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "rawHtml", function() { return rawHtml; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Deferred", function() { return Deferred; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DeferredVNode", function() { return DeferredVNode; });
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
  } // `.node` is only on "Text" and "Element", "RawHtml" type VNode, and only Element has children


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
  vNode.children;
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

} // V-Node for `null`, `false` or `undefined` in jsx elements


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
 * render the given markup into the given HTML node
 *
 * @param {string|HTMLElement|JSX} markup - html as string, html element or jsx template
 * @param {HTMLElement} domNode - container for the template to be rendered into
 * @param {boolean} [append=false] - should the provided markup be appended to the existing markup, or default replace it
 */

function render(markup, // @TODO: specific support for Template? (.content.clone)
domNode, append = false) {
  Array.from(document.body.querySelectorAll("*")).forEach(el => el.style.background = "#ccffcc"); // the content of the given DOM Node was already rendered by jsx-runtime, and it only needs to be updated

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

      if (this.childNodes.length) this.node = this.childNodes[this.childNodes.length - 1];
      return documentFragment;
    }

  }, _temp)(content);
}
function Deferred({
  placeholder,
  contentPromise
}) {
  return new DeferredVNode({
    placeholder,
    contentPromise
  });
}
class DeferredVNode extends VNode {
  /**
   *
   */
  constructor({
    placeholder,
    contentPromise
  }) {
    super();
    this.type = "Deferred";
    this.parent = null;
    this.children = void 0;
    this.placeholder = void 0;
    this.contentPromise = void 0;
    this.placeholder = placeholder;
    this.contentPromise = contentPromise;
    this.children = [new FragmentVNode([placeholder])];
  }

  asNode() {
    this.contentPromise.then(content => {
      const newContent = new FragmentVNode([content]);
      this.children[0].diffAndPatch(newContent);
      this.children = [newContent];
    });
    return this.children[0].asNode();
  }

  toString() {
    return this.placeholder.toString();
  }

  removeFromDOM() {
    this.children.forEach(childVNode => childVNode.removeFromDOM());
  }

  diffAndPatch(newNode) {
    // assuming there is no re-renders during the resolve period,
    // were the promise is not changed but the placeholder is
    if (newNode.contentPromise !== this.contentPromise) {
      this.removeFromDOM();
      insertNewItem(newNode);
    }
  }

}

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

function Func1(_ref4) {
  var children = _ref4.children;
  console.log("Func-1");
  return Object(C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("div", {
    children: children
  });
}

function timer(t) {
  return new Promise(function (res) {
    setTimeout(function () {
      res(Object(C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("p", {
        children: "new text"
      }));
    }, t);
  });
}

var p = timer(5000);

function Func2() {
  return Object(C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["Deferred"], {
    placeholder: Object(C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("h2", {
      children: "waiting..."
    }),
    contentPromise: p
  });
}

Object(C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["render"])(Object(C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("div", {
  children: Object(C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(Func1, {
    children: Object(C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(Func2, {})
  })
}), $container);

window.reRender_sus = function () {
  return Object(C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["render"])(Object(C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("div", {
    children: Object(C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(Func1, {
      children: Object(C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(Func2, {})
    })
  }), $container);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vanN4L2pzeC1ydW50aW1lLnRzIiwid2VicGFjazovLy8uL21haW4udHN4Il0sIm5hbWVzIjpbInJlbmRlcmVkVlRyZWVzIiwiV2Vha01hcCIsInJlZnNUb0NhbGwiLCJnZXRQYXJlbnRFbGVtZW50Tm9kZSIsInZOb2RlIiwicGFyZW50Iiwibm9kZSIsImdldENoaWxkcmVuV2l0aE5vZGVzIiwiYWx3YXlzQWxsb3ciLCJjaGlsZHJlbiIsIm1hcCIsImNoaWxkTm9kZSIsImZsYXQiLCJJbmZpbml0eSIsImdldFBhcmVudEFuZE5leHRTaWJsaW5nIiwicGFyZW50V2l0aEVsZW1lbnQiLCJzaWJsaW5ncyIsInByZXZTaWJsaW5nIiwiaW5kZXhPZiIsIm5leHRTaWJsaW5nTm9kZSIsIm5leHRTaWJsaW5nIiwidHJ1dGh5IiwidmFsdWUiLCJ1bmRlZmluZWQiLCJzYW5pdGl6ZSIsInRleHQiLCJkaXYiLCJkb2N1bWVudCIsImNyZWF0ZUVsZW1lbnQiLCJpbm5lclRleHQiLCJpbm5lckhUTUwiLCJnZXRPdXRlckh0bWwiLCJlbGVtZW50IiwiRWxlbWVudCIsIm91dGVySFRNTCIsIlRleHQiLCJ3aG9sZVRleHQiLCJEb2N1bWVudEZyYWdtZW50IiwiQXJyYXkiLCJmcm9tIiwiY2hpbGROb2RlcyIsImVsIiwiam9pbiIsImNvbnNvbGUiLCJ3YXJuIiwiYXNIdG1sU3RyaW5nIiwidGFnIiwicHJvcHMiLCJhdHRyaWJ1dGVzIiwiT2JqZWN0IiwiZW50cmllcyIsImZpbHRlciIsImtleSIsInYiLCJrIiwiaXNBcnJheSIsImNvbnRlbnQiLCJjaGlsZCIsInRvU3RyaW5nIiwiYXNOb2RlIiwic3ZnQ29udGV4dCIsImZyYWdtZW50cyIsIml0ZW0iLCJkb2N1bWVudEZyYWdtZW50IiwiY3JlYXRlRG9jdW1lbnRGcmFnbWVudCIsImFwcGVuZCIsInJlZiIsImF0dHJzIiwiY3JlYXRlRWxlbWVudE5TIiwicHVzaCIsIkVsZW1lbnRWTm9kZSIsImFkZFByb3BzIiwiaW5zZXJ0TmV3SXRlbSIsIm5ld05vZGUiLCJpbnNlcnRCZWZvcmUiLCJkaWZmQW5kUGF0Y2hDaGlsZHJlbiIsIm9sZE5vZGUiLCJmb3JFYWNoIiwib2xkQ2hpbGQiLCJpeCIsIm5ld0NoaWxkIiwicmVtb3ZlRnJvbURPTSIsInR5cGUiLCJkaWZmQW5kUGF0Y2giLCJuZXdJdGVtcyIsInNsaWNlIiwibGVuZ3RoIiwiVk5vZGUiLCJjb25zdHJ1Y3RvciIsIkZyYWdtZW50Vk5vZGUiLCJOb2RlIiwiTGl2ZU5vZGVWTm9kZSIsIk51bGxWTm9kZSIsIlRleHRWTm9kZSIsInNldCIsInBhcmVudEVsZW1lbnQiLCJyZW1vdmVDaGlsZCIsInJlcGxhY2VXaXRoIiwiZnJvbUV4aXN0aW5nRWxlbWVudE5vZGUiLCJuZXdWTm9kZSIsImFzc2lnbiIsIm5ld1Byb3BzIiwib2xkUHJvcHMiLCJTZXQiLCJrZXlzIiwicHJvcE5hbWUiLCJvbGRWYWx1ZSIsIm5ld1ZhbHVlIiwic3RhcnRzV2l0aCIsImV2ZW50IiwicmVwbGFjZSIsImFkZEV2ZW50TGlzdGVuZXIiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwic2V0QXR0cmlidXRlIiwicmVtb3ZlQXR0cmlidXRlIiwiU3RyaW5nIiwidGV4dE5vZGUiLCJjcmVhdGVUZXh0Tm9kZSIsIm5vZGVWYWx1ZSIsIm5ld05vZGUyIiwiUm9vdFZOb2RlIiwiZG9tTm9kZSIsInJlbW92ZSIsImFzVk5vZGUiLCJyZXN1bHQiLCJhdHRyIiwianN4cyIsIkZyYWdtZW50IiwianN4IiwiaGFzT3duUHJvcGVydHkiLCJyZW5kZXIiLCJtYXJrdXAiLCJib2R5IiwicXVlcnlTZWxlY3RvckFsbCIsInN0eWxlIiwiYmFja2dyb3VuZCIsImlzUmVSZW5kZXIiLCJoYXMiLCJ2VHJlZSIsIm9sZFZUcmVlIiwiZ2V0Iiwic3BsaWNlIiwiRXJyb3IiLCJyYXdIdG1sIiwiUmF3SHRtbCIsInRlbXBsYXRlIiwiRGVmZXJyZWQiLCJwbGFjZWhvbGRlciIsImNvbnRlbnRQcm9taXNlIiwiRGVmZXJyZWRWTm9kZSIsInRoZW4iLCJuZXdDb250ZW50IiwiY2hpbGRWTm9kZSIsInhzcyIsIlJURSIsImxvZyIsInR4dCIsIkJ1dHRvbiIsImRpc2FibGVkIiwicmVmbG9nIiwiU3BhbiIsIm1vZGUiLCJDb21wIiwibnVtIiwibWFya3VwMSIsIm1hcmt1cDIiLCJOTCIsIm1hcmt1cDMiLCJpbmZvIiwib2JqIiwiYSIsIm1hcmt1cDQiLCJtYXJrdXA1IiwibWFya3VwNiIsIlBvcFVwSW5mbyIsIkhUTUxFbGVtZW50IiwiY3VzdG9tRWxlbWVudHMiLCJkZWZpbmUiLCJxdWVyeVNlbGVjdG9yIiwiQ29tcDIiLCJDb21wMyIsIiRjb250YWluZXIiLCJnZXRFbGVtZW50QnlJZCIsIndpbmRvdyIsInJlUmVuZGVyMSIsInJlUmVuZGVyMiIsInJlUmVuZGVyMyIsInNzIiwic3MyIiwicmVSZW5kZXI1YSIsInJlUmVuZGVyNWIiLCJtYXJrdXA3IiwibW9kIiwicmVSZW5kZXJSZWYiLCJyZVJlbmRlcjZhIiwicmVSZW5kZXI2YiIsInJlUmVuZGVyU3ZnIiwicmVSZW5kZXJTdmcyIiwicmVSZW5kZXI3XzEiLCJyZVJlbmRlcjdfMiIsInJlUmVuZGVyN18zIiwiRnVuYzEiLCJ0aW1lciIsInQiLCJQcm9taXNlIiwicmVzIiwic2V0VGltZW91dCIsInAiLCJGdW5jMiIsInJlUmVuZGVyX3N1cyJdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNB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QUF2QjtBQUE0QyxrQkFBYyxFQUFFRDtBQUE1RCxJQUFQO0FBQ0Q7O0FBRUQ3RSxtRkFBTSxDQUFFO0FBQUEsWUFDTixpRkFBQyxLQUFEO0FBQUEsY0FDRSxpRkFBQyxLQUFEO0FBREY7QUFETSxFQUFGLEVBSUdtRCxVQUpILENBQU47O0FBT0FFLE1BQU0sQ0FBQzBCLFlBQVAsR0FBc0I7QUFBQSxTQUFNL0UsbUZBQU0sQ0FBRTtBQUFBLGNBQ2xDLGlGQUFDLEtBQUQ7QUFBQSxnQkFDRSxpRkFBQyxLQUFEO0FBREY7QUFEa0MsSUFBRixFQUl6Qm1ELFVBSnlCLENBQVo7QUFBQSxDQUF0QixDIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMCk7XG4iLCIvKipcclxuICogcHJvdmlkZXMgZnVuY3Rpb25zIG5lZWRlZCBieSBiYWJlbCBmb3IgYSBjdXN0b20gcHJhZ21hXHJcbiAqIHRvIHJlbmRlciBwYXJzZWQganN4IGNvZGUgdG8gaHRtbCxcclxuICogZGlmZiBhbmQgcGF0Y2ggaW4gc3Vic2VxdWVudCByZW5kZXJzXHJcbiAqL1xyXG5cclxuLy8gYSBtYXAgYmV0d2VlbiB2LXRyZWVzIGFuZCByZW5kZXJlZCBET00gbm9kZXMgLyBjb250YWluZXJzXHJcbmNvbnN0IHJlbmRlcmVkVlRyZWVzID0gbmV3IFdlYWtNYXA8RWxlbWVudCwgUm9vdFZOb2RlIHwgRWxlbWVudFZOb2RlPigpO1xyXG4vLyBsaXN0IG9mIGByZWZgIGNhbGxiYWNrcyB0byBiZSBjYWxsZWQgYWZ0ZXIgdGhlIERPTSBub2RlcyBhcmUgcmVuZGVyZWRcclxuY29uc3QgcmVmc1RvQ2FsbDogQXJyYXk8KCkgPT4gdm9pZD4gPSBbXTtcclxuXHJcbi8vIHByb3BzIHdoaWNoIHdpbGwgYmUgcmVuZGVyZWQgYXMgYXR0cmlidXRlc1xyXG4vLyBGdW5jdGlvbnMgd2lsbCBiZSB1c2VkIGZvciBldmVudCBsaXN0ZW5lcnMuICh3aXRoIGF0dHJpYnV0ZSBuYW1lIHN0YXJ0aW5nIHdpdGggJ29uLScpXHJcbi8vIE9iamVjdCB3aWxsIGJlIHNldCBhcyBwcm9wZXJ0eSBvbiB0aGUgcmVuZGVyZWQgbm9kZSBlbGVtZW50XHJcbnR5cGUgQXR0cmlidXRlcyA9IHtcclxuICBba2V5OiBzdHJpbmddOiBzdHJpbmcgfCBib29sZWFuIHwgbnVtYmVyIHwgRnVuY3Rpb24gfCBPYmplY3Q7XHJcbn07XHJcblxyXG4vLyBhZGRpdGlvbmFsIGF0dHJpYnV0ZXMgd2hpY2ggY2FuIGhhdmUgYWRkaXRpb25hbCBzZXJpYWxpemF0aW9uIGJlZm9yZSByZW5kZXJpbmcgYXMgYXR0cmlidXRlc1xyXG50eXBlIFNwZWNpYWxBdHRyaWJ1dGVzID0ge1xyXG4gIGNsYXNzPzogc3RyaW5nIHwgc3RyaW5nW107XHJcbiAgc3R5bGU/OiBzdHJpbmcgfCB7IFtrZXk6IHN0cmluZ106IHN0cmluZyB9O1xyXG4gIHJlZj86IEZ1bmN0aW9uO1xyXG59O1xyXG5cclxuLy8gdHlwZXMgb2YgY2hpbGRyZW4gd2hpY2ggd2lsbCBiZSBwYXNzZWQgYnkgdGhlIGpzeCBwYXJzZXIgcGx1Z2luXHJcbi8vIG5lc3RlZCBhcnJheSBpbiBjYXNlIG9mXHJcbi8vIDxlbGVtPlxyXG4vLyAgIDxzcGFuLz5cclxuLy8gICB7Y2hpbGRyZW59XHJcbi8vICAgdGV4dFxyXG4vLyAgIDxkaXYvPlxyXG4vLyA8L2VsZW0+XHJcbnR5cGUgSlNYQ2hpbGQgPVxyXG4gIHwgVk5vZGVJbnRlcmZhY2VcclxuICB8IE5vZGVcclxuICB8IHN0cmluZ1xyXG4gIHwgbnVtYmVyXHJcbiAgfCBib29sZWFuXHJcbiAgfCBudWxsXHJcbiAgfCB1bmRlZmluZWRcclxuICB8IEpTWENoaWxkW107XHJcblxyXG4vLyBjaGlsZCBlbGVtZW50cyBpbiB0aGUganN4IG1hcmt1cCB3aGljaCB3aWxsIGJlIHBhc3NlZCB0byB0aGUgaCBmdW5jdGlvbiBhcyBgcHJvcHMuY2hpbGRyZW5gXHJcbnR5cGUgQ2hpbGRyZW5Qcm9wcyA9IHtcclxuICBjaGlsZHJlbjogSlNYQ2hpbGRbXTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBwcm9wcyBvYmplY3Qgd2hpY2ggd2lsbCBiZSBwYXNzZWQgdG8ganN4IHByYWdtYSBhbmQgY3VzdG9tIGNvbXBvbmVudCBmdW5jdGlvbnNcclxuICovXHJcbnR5cGUgSnN4UHJvcHMgPSBBdHRyaWJ1dGVzICYgU3BlY2lhbEF0dHJpYnV0ZXMgJiBDaGlsZHJlblByb3BzO1xyXG5cclxuLyoqXHJcbiAqIHJldHVybiB0aGUgY2xvc2VzdCBhbmNlc3RvciBvZiB0aGUgZ2l2ZW4gVk5vZGUgd2hpY2ggaGFzIGFuIERPTSBFbGVtZW50IChpLmUuIGlzIG5vdCBhIEZyYWdtZW50KVxyXG4gKiBAcGFyYW0gdk5vZGUge1ZOb2RlSW50ZXJmYWNlfVxyXG4gKi9cclxuZnVuY3Rpb24gZ2V0UGFyZW50RWxlbWVudE5vZGUodk5vZGU6IFZOb2RlSW50ZXJmYWNlKTogRWxlbWVudFZOb2RlIHtcclxuICB3aGlsZSAodk5vZGUucGFyZW50KSB7XHJcbiAgICB2Tm9kZSA9IHZOb2RlLnBhcmVudDtcclxuICAgIGlmICh2Tm9kZS5ub2RlKSBicmVhaztcclxuICB9XHJcblxyXG4gIC8vIGAubm9kZWAgaXMgb25seSBvbiBcIlRleHRcIiBhbmQgXCJFbGVtZW50XCIsIFwiUmF3SHRtbFwiIHR5cGUgVk5vZGUsIGFuZCBvbmx5IEVsZW1lbnQgaGFzIGNoaWxkcmVuXHJcbiAgcmV0dXJuICh2Tm9kZSBhcyB1bmtub3duKSBhcyBFbGVtZW50Vk5vZGU7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBmb3IgdGhlIGdpdmVuIHYtbm9kZSBhbGwgY2hpbGRyZW4gYXJlIHRyYXZlcnNlZCB0aWxsIGNoaWxkcmVuIHdpdGggRE9NIG5vZGVzIGFyZSBmb3VuZFxyXG4gKlxyXG4gKiBAcGFyYW0ge1ZOb2RlSW50ZXJmYWNlfSB2Tm9kZSAtIHBhcmVudCBub2RlXHJcbiAqIEBwYXJhbSB7Vk5vZGVJbnRlcmZhY2V9IFthbHdheXNBbGxvd10gLSBhbHdheXMgY29udGFpbiB0aGUgcHJvdmlkZWQgbm9kZSBpbiB0aGUgcmV0dXJuZWQgbGlzdCwgZXZlbiBpZiBpdCBpcyBub3QgYW4gZWxlbWVudCB3aXRoIERPTSBOb2RlXHJcbiAqIEByZXR1cm5zIHtWTm9kZUludGVyZmFjZVtdfVxyXG4gKi9cclxuZnVuY3Rpb24gZ2V0Q2hpbGRyZW5XaXRoTm9kZXMoXHJcbiAgdk5vZGU6IFZOb2RlSW50ZXJmYWNlLFxyXG4gIGFsd2F5c0FsbG93PzogVk5vZGVJbnRlcmZhY2VcclxuKTogVk5vZGVJbnRlcmZhY2VbXSB7XHJcbiAgdk5vZGUuY2hpbGRyZW47XHJcbiAgcmV0dXJuIHZOb2RlLmNoaWxkcmVuXHJcbiAgICAubWFwKChjaGlsZE5vZGUpID0+IHtcclxuICAgICAgaWYgKGNoaWxkTm9kZSA9PT0gYWx3YXlzQWxsb3cpIHJldHVybiBjaGlsZE5vZGU7XHJcbiAgICAgIGlmIChjaGlsZE5vZGUubm9kZSkgcmV0dXJuIGNoaWxkTm9kZTtcclxuICAgICAgcmV0dXJuIGdldENoaWxkcmVuV2l0aE5vZGVzKGNoaWxkTm9kZSwgYWx3YXlzQWxsb3cpO1xyXG4gICAgfSlcclxuICAgIC5mbGF0KEluZmluaXR5KSBhcyBWTm9kZUludGVyZmFjZVtdO1xyXG59XHJcblxyXG4vKipcclxuICogcmV0dXJucyBhIHR1cGxlIG9mIHRoZSBjbG9zZXN0IGFuY2VzdG9yIHdoaWNoIGhhcyBhIERPTSBOb2RlLFxyXG4gKiBhbmQgdGhlIG5vZGUgd2hpY2ggaGFzIGEgRE9NIG5vZGUgYW5kIGlzIHJlbmRlcmVkIGFzIHRoZSBuZXh0IHNpYmxpbmcgZm9yIHRoZSBwcm92aWRlZCBub2RlIGluIHRoZSBET00uXHJcbiAqIE9yIG51bGwgd2hlbiBpdCBpcyB0aGUgbGFzdCBjaGlsZCBpdHNlbGZcclxuICpcclxuICogQHBhcmFtIHtWTm9kZUludGVyZmFjZX0gdk5vZGVcclxuICogQHJldHVybnMgeyhbTm9kZSwgTm9kZSB8IG51bGxdKX1cclxuICovXHJcbmZ1bmN0aW9uIGdldFBhcmVudEFuZE5leHRTaWJsaW5nKHZOb2RlOiBWTm9kZUludGVyZmFjZSk6IFtOb2RlLCBOb2RlIHwgbnVsbF0ge1xyXG4gIC8vIG5vZGUgYW5jZXN0b3Igd2l0aCBFbGVtZW50LFxyXG4gIGNvbnN0IHBhcmVudFdpdGhFbGVtZW50ID0gZ2V0UGFyZW50RWxlbWVudE5vZGUodk5vZGUpO1xyXG4gIGNvbnN0IHNpYmxpbmdzID0gZ2V0Q2hpbGRyZW5XaXRoTm9kZXMocGFyZW50V2l0aEVsZW1lbnQsIHZOb2RlKTtcclxuICBjb25zdCBwcmV2U2libGluZyA9IHNpYmxpbmdzW3NpYmxpbmdzLmluZGV4T2Yodk5vZGUpIC0gMV07XHJcbiAgY29uc3QgbmV4dFNpYmxpbmdOb2RlID0gcHJldlNpYmxpbmcgPyBwcmV2U2libGluZy5ub2RlIS5uZXh0U2libGluZyA6IG51bGw7XHJcblxyXG4gIHJldHVybiBbcGFyZW50V2l0aEVsZW1lbnQubm9kZSwgbmV4dFNpYmxpbmdOb2RlXTtcclxufVxyXG5cclxuLyoqXHJcbiAqIHJldHVybnMgdHJ1ZSBpZiBub3QgbnVsbGlzaCBvciBmYWxzZVxyXG4gKiB0aGF0IG1lYW5zIDAgb3IgZW1wdHkgc3RyaW5nIGFyZSBhbGxvd2VkXHJcbiAqIEBwYXJhbSB7Kn0gdmFsXHJcbiAqL1xyXG5mdW5jdGlvbiB0cnV0aHkodmFsdWU6IGFueSk6IGJvb2xlYW4ge1xyXG4gIHJldHVybiB2YWx1ZSAhPT0gZmFsc2UgJiYgdmFsdWUgIT09IG51bGwgJiYgdmFsdWUgIT09IHVuZGVmaW5lZDtcclxufVxyXG5cclxuLyoqXHJcbiAqIGVzY2FwZXMgdGhlIHByb3ZpZGVkIHN0cmluZyBhZ2FpbnN0IHhzcyBhdHRhY2tzIGV0Y1xyXG4gKlxyXG4gKiBAcGFyYW0ge3N0cmluZ30gdGV4dFxyXG4gKiBAcmV0dXJucyB7c3RyaW5nfVxyXG4gKi9cclxuZnVuY3Rpb24gc2FuaXRpemUodGV4dDogc3RyaW5nKTogc3RyaW5nIHtcclxuICBjb25zdCBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gIGRpdi5pbm5lclRleHQgPSB0ZXh0O1xyXG4gIHJldHVybiBkaXYuaW5uZXJIVE1MO1xyXG59XHJcblxyXG4vKipcclxuICogYmFzaWNhbGx5IGBFbGVtZW50Lm91dGVySFRNTGAgYnV0IGFsc28gc3VwcG9ydHMgVGV4dCBub2RlIGFuZCBEb2N1bWVudEZyYWdtZW50XHJcbiAqIEBwYXJhbSBlbGVtZW50IHtOb2RlfSAtIGVsZW1lbnQgd2hpY2ggaXRzIGh0bWwgbmVlZHMgdG8gYmUgcmV0dXJuZWRcclxuICovXHJcbmZ1bmN0aW9uIGdldE91dGVySHRtbChlbGVtZW50OiBOb2RlKTogc3RyaW5nIHtcclxuICBpZiAoZWxlbWVudCBpbnN0YW5jZW9mIEVsZW1lbnQpIHJldHVybiBlbGVtZW50Lm91dGVySFRNTDtcclxuICBpZiAoZWxlbWVudCBpbnN0YW5jZW9mIFRleHQpIHJldHVybiBzYW5pdGl6ZShlbGVtZW50Lndob2xlVGV4dCk7XHJcbiAgaWYgKGVsZW1lbnQgaW5zdGFuY2VvZiBEb2N1bWVudEZyYWdtZW50KVxyXG4gICAgcmV0dXJuIEFycmF5LmZyb20oZWxlbWVudC5jaGlsZE5vZGVzKVxyXG4gICAgICAubWFwKChlbCkgPT4gZ2V0T3V0ZXJIdG1sKGVsKSlcclxuICAgICAgLmpvaW4oXCJcIik7XHJcblxyXG4gIC8vIHNob3VsZG4ndCByZWFjaCB0aGlzIHBvaW50XHJcbiAgY29uc29sZS53YXJuKFwiZ2V0T3V0ZXJIdG1sIGRvZXMgbm90IHN1cHBvcnQgdGhpcyB0eXBlIG9mIGVsZW1lbnRcIiwgZWxlbWVudCk7XHJcbiAgcmV0dXJuIFwiXCI7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBnZW5lcmF0ZXMgdGhlIGh0bWwgYXMgYSBzdHJpbmcgd2hpY2ggY2FuIGJlIHVzZWQgZm9yIGV4YW1wbGUgd2l0aCBgZWxlbWVudC5pbm5lckhUTUwoKWBcclxuICpcclxuICogQHBhcmFtIHRhZyB7c3RyaW5nfEZ1bmN0aW9ufSAtIHRhZyBhcmd1bWVudCBvZiB0aGUganN4IGNhbGxcclxuICogQHBhcmFtIHByb3BzIHtPYmplY3R9IC0gcHJvcHMgYXJndW1lbnQgb2YganN4IGNhbGxcclxuICovXHJcbmZ1bmN0aW9uIGFzSHRtbFN0cmluZyhcclxuICB0YWc6IHN0cmluZyB8IEZ1bmN0aW9uLFxyXG4gIHByb3BzOiBBdHRyaWJ1dGVzICYgU3BlY2lhbEF0dHJpYnV0ZXMsXHJcbiAgY2hpbGRyZW46IFZOb2RlSW50ZXJmYWNlW11cclxuKSB7XHJcbiAgY29uc3QgYXR0cmlidXRlcyA9IE9iamVjdC5lbnRyaWVzKHByb3BzKVxyXG4gICAgLmZpbHRlcigoWywgdmFsdWVdKSA9PiB0cnV0aHkodmFsdWUpKVxyXG4gICAgLm1hcCgoW2tleSwgdmFsdWVdKSA9PiB7XHJcbiAgICAgIC8vIGUuZy4gZGlzYWJsZWQ6IHRydWUgPT4gPHRhZyBkaXNhYmxlZD5cclxuICAgICAgaWYgKHZhbHVlID09PSB0cnVlKSByZXR1cm4ga2V5O1xyXG5cclxuICAgICAgLy8gZm9yIHN0eWxlIGFzIG9iamVjdDpcclxuICAgICAgLy8gKHN0eWxlOikge2Rpc3BsYXk6IFwibm9uZVwiLCBwb3NpdGlvbjogXCJhYnNvbHV0ZVwifSA9PT4gJ2Rpc3BsYXk6IG5vbmU7IHBvc2l0aW9uOiBhYnNvbHV0ZTsnXHJcbiAgICAgIGlmIChrZXkgPT09IFwic3R5bGVcIiAmJiB0eXBlb2YgdmFsdWUgPT09IFwib2JqZWN0XCIpXHJcbiAgICAgICAgdmFsdWUgPSBPYmplY3QuZW50cmllcyh2YWx1ZSlcclxuICAgICAgICAgIC8vIGlnbm9yZSBzdHVmZiBsaWtlIGB7YmFja2dyb3VuZDogYWN0aXZlICYmIFwicmVkXCJ9YCB3aGVuIGBhY3RpdmUgPT09IGZhbHNlIC8gbnVsbCAvIHVuZGVmaW5lZGBcclxuICAgICAgICAgIC5maWx0ZXIoKFssIHZdKSA9PiB0cnV0aHkodikpXHJcbiAgICAgICAgICAvLyBjdXJyZW50bHkgc3VwcG9ydHMgXCJiYWNrZ3JvdW5kLWNvbG9yXCIgbm90IFwiYmFja2dyb3VuZENvbG9yXCJcclxuICAgICAgICAgIC5tYXAoKFtrLCB2XSkgPT4gYCR7a306ICR7dn1gKVxyXG4gICAgICAgICAgLmpvaW4oXCI7IFwiKTtcclxuXHJcbiAgICAgIC8vIChjbGFzczopIFtcImJ0blwiLCBcInJlZFwiXSA9PT4gXCJidG4gcmVkXCJcclxuICAgICAgaWYgKGtleSA9PT0gXCJjbGFzc1wiICYmIEFycmF5LmlzQXJyYXkodmFsdWUpKSB2YWx1ZSA9IHZhbHVlLmpvaW4oXCIgXCIpO1xyXG5cclxuICAgICAgcmV0dXJuIGAke2tleX09XCIke3ZhbHVlfVwiYDtcclxuICAgIH0pXHJcbiAgICAuam9pbihcIiBcIik7XHJcblxyXG4gIGNvbnN0IGNvbnRlbnQgPSBjaGlsZHJlbi5tYXAoKGNoaWxkKSA9PiBjaGlsZC50b1N0cmluZygpKS5qb2luKFwiXCIpO1xyXG5cclxuICByZXR1cm4gYDwke3RhZ30gJHthdHRyaWJ1dGVzfT4ke2NvbnRlbnR9PC8ke3RhZ30+YDtcclxufVxyXG5cclxuLyoqXHJcbiAqIGdlbmVyYXRlcyBIVE1MIE5vZGUgZWxlbWVudHMgZnJvbSB0aGUgcHJvdmlkZWQganN4IGl0ZW1cclxuICogQHBhcmFtIHRhZyB7c3RyaW5nfEZ1bmN0aW9ufSAtIHRhZyBhcmd1bWVudCBvZiB0aGUganN4IGNhbGxcclxuICogQHBhcmFtIHByb3BzIHtPYmplY3R9IC0gcHJvcHMgYXJndW1lbnQgb2YganN4IGNhbGxcclxuICovXHJcbmZ1bmN0aW9uIGFzTm9kZShcclxuICB0YWc6IHN0cmluZyB8IHVuZGVmaW5lZCxcclxuICBwcm9wczogQXR0cmlidXRlcyAmIFNwZWNpYWxBdHRyaWJ1dGVzLFxyXG4gIGNoaWxkcmVuOiBWTm9kZUludGVyZmFjZVtdLFxyXG4gIHN2Z0NvbnRleHQgPSBmYWxzZVxyXG4pOiBFbGVtZW50IHwgRG9jdW1lbnRGcmFnbWVudCB7XHJcbiAgLy8gZnJhZ21lbnRcclxuICBpZiAoIXRhZykge1xyXG4gICAgY29uc3QgZnJhZ21lbnRzID0gY2hpbGRyZW4ubWFwKChpdGVtKSA9PiBpdGVtLmFzTm9kZSgpKTtcclxuXHJcbiAgICBjb25zdCBkb2N1bWVudEZyYWdtZW50ID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO1xyXG5cclxuICAgIGRvY3VtZW50RnJhZ21lbnQuYXBwZW5kKC4uLmZyYWdtZW50cyk7XHJcbiAgICByZXR1cm4gZG9jdW1lbnRGcmFnbWVudDtcclxuICB9XHJcblxyXG4gIGNvbnN0IHsgcmVmLCAuLi5hdHRycyB9ID0gcHJvcHM7XHJcblxyXG4gIC8vIHJlbWVtYmVyIGlmIHRoZSBzdmcgY29udGV4dCB3YXMgc2V0IGZvciB0aGlzIG5vZGUsIGFuZCByZXBsYWNlIGFmdGVyIGdlbmVyYXRpbmcgYWxsIGNoaWxkcmVuXHJcblxyXG4gIC8vIGN1cnJlbnRseSBub3Qgc3VwcG9ydGluZyB0aGUgYGlzYCBvcHRpb24gZm9yIEN1c3RvbWl6ZWQgYnVpbHQtaW4gZWxlbWVudHNcclxuICBjb25zdCBub2RlID0gc3ZnQ29udGV4dFxyXG4gICAgPyBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoXCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiLCB0YWcpXHJcbiAgICA6IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodGFnKTtcclxuXHJcbiAgLy8gY3VycmVudGx5IG9ubHkgc3VwcG9ydGluZyByZWYgb24gaHRtbCBlbGVtZW50cy4gbm90IHRlbXBsYXRlIGZ1bmN0aW9uc1xyXG4gIC8vIHJlZiBpcyBvbmx5IGNhbGxlZCB3aGVuIGVsZW1lbnQgaXMgY3JlYXRlZC4gbm90IHdoZW4gdGhlIHJlZiBwcm9wZXJ0eSBpcyBjaGFuZ2VkXHJcbiAgaWYgKHR5cGVvZiByZWYgPT09IFwiZnVuY3Rpb25cIikge1xyXG4gICAgcmVmc1RvQ2FsbC5wdXNoKCgpID0+IHJlZihub2RlKSk7XHJcbiAgfVxyXG5cclxuICAvLyBhZGQgYXR0cmlidXRlcywgZXZlbnQgbGlzdGVuZXJzIGV0Yy5cclxuICBFbGVtZW50Vk5vZGUuYWRkUHJvcHMobm9kZSwgYXR0cnMpO1xyXG5cclxuICBub2RlLmFwcGVuZChcclxuICAgIC4uLmNoaWxkcmVuXHJcbiAgICAgIC8vLmZsYXQoKVxyXG4gICAgICAubWFwKChjaGlsZCkgPT4gY2hpbGQuYXNOb2RlKCkpXHJcbiAgKTtcclxuXHJcbiAgcmV0dXJuIG5vZGU7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiByZW5kZXJzIHRoZSBIVE1MIGZvciB0aGUgZ2l2ZW4gVi1Ob2RlIGFuZCBhZGRzIHRvIHRoZSBET00gYXQgdGhlIGNvcnJlY3QgcG9zaXRpb25cclxuICogQHBhcmFtIG5ld05vZGUgLSB2Tm9kZSB0byBiZSByZW5kZXJlZCBhcyBIVE1MIE5vZGUgYW5kIGFkZGVkIHRvIERPTVxyXG4gKi9cclxuZnVuY3Rpb24gaW5zZXJ0TmV3SXRlbShuZXdOb2RlOiBWTm9kZUludGVyZmFjZSkge1xyXG4gIGNvbnN0IFtwYXJlbnQsIG5leHRTaWJsaW5nXSA9IGdldFBhcmVudEFuZE5leHRTaWJsaW5nKG5ld05vZGUpO1xyXG4gIHBhcmVudC5pbnNlcnRCZWZvcmUobmV3Tm9kZS5hc05vZGUoKSwgbmV4dFNpYmxpbmcpO1xyXG59XHJcblxyXG4vKipcclxuICogaXRlcmF0ZSBvdmVyIGFsbCB0aGUgY2hpbGRyZW4gb2YgdGhlIHByb3ZpZGVkIG5vZGVzLCBhbmQgZWFjaCBwYWlyd2lzZVxyXG4gKlxyXG4gKiBAcGFyYW0ge1ZOb2RlSW50ZXJmYWNlfSBvbGROb2RlIC0gdi1ub2RlIGZyb20gdGhlIG9sZCByZW5kZXJcclxuICogQHBhcmFtIHtWTm9kZUludGVyZmFjZX0gbmV3Tm9kZS0gdi1ub2RlIGZyb20gdGhlIG5ldyB0cmVlIHdoaWNoIGl0cyBjaGlsZHJlbiBoYXZlIHRvIHJlcGxhY2UgdGhlIGNoaWxkcmVuIG9mIHRoZSBvbGQgbm9kZVxyXG4gKi9cclxuZnVuY3Rpb24gZGlmZkFuZFBhdGNoQ2hpbGRyZW4oXHJcbiAgb2xkTm9kZTogVk5vZGVJbnRlcmZhY2UsXHJcbiAgbmV3Tm9kZTogVk5vZGVJbnRlcmZhY2VcclxuKSB7XHJcbiAgb2xkTm9kZS5jaGlsZHJlbi5mb3JFYWNoKChvbGRDaGlsZCwgaXgpID0+IHtcclxuICAgIGNvbnN0IG5ld0NoaWxkID0gbmV3Tm9kZS5jaGlsZHJlbltpeF07XHJcbiAgICAvLyBjaGlsZCB3YXMgcmVtb3ZlZFxyXG4gICAgaWYgKCFuZXdDaGlsZCkgb2xkQ2hpbGQucmVtb3ZlRnJvbURPTSgpO1xyXG4gICAgLy8gY2hpbGQgaXMgbW9kaWZpZWRcclxuICAgIGVsc2UgaWYgKG5ld0NoaWxkLnR5cGUgPT09IG9sZENoaWxkLnR5cGUpIG9sZENoaWxkLmRpZmZBbmRQYXRjaChuZXdDaGlsZCk7XHJcbiAgICAvLyBjaGlsZCBpcyByZXBsYWNlZFxyXG4gICAgZWxzZSB7XHJcbiAgICAgIG9sZENoaWxkLnJlbW92ZUZyb21ET00oKTtcclxuICAgICAgaW5zZXJ0TmV3SXRlbShuZXdDaGlsZCk7XHJcbiAgICB9XHJcbiAgfSk7XHJcblxyXG4gIC8vIG5ldyBhZGRpdGlvbiBpdGVtc1xyXG4gIGNvbnN0IG5ld0l0ZW1zID0gbmV3Tm9kZS5jaGlsZHJlbi5zbGljZShvbGROb2RlLmNoaWxkcmVuLmxlbmd0aCk7XHJcbiAgaWYgKG5ld0l0ZW1zLmxlbmd0aCkge1xyXG4gICAgY29uc3QgZG9jdW1lbnRGcmFnbWVudCA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcclxuICAgIG5ld0l0ZW1zLmZvckVhY2goKGl0ZW0pID0+IGRvY3VtZW50RnJhZ21lbnQuYXBwZW5kKGl0ZW0uYXNOb2RlKCkpKTtcclxuXHJcbiAgICBjb25zdCBbcGFyZW50LCBuZXh0U2libGluZ10gPSBnZXRQYXJlbnRBbmROZXh0U2libGluZyhuZXdJdGVtc1swXSk7XHJcbiAgICBwYXJlbnQuaW5zZXJ0QmVmb3JlKGRvY3VtZW50RnJhZ21lbnQsIG5leHRTaWJsaW5nKTtcclxuICB9XHJcbn1cclxuXHJcbi8vIGJhc2UgY2xhc3Mgd2hpY2ggd2lsbCBiZSBpbmhlcml0ZWQgZnJvbSBqc3ggYW5kIGZyYWdtZW50cyBmdW5jdGlvbiBub2RlIGdlbmVyYXRpb25cclxuLy8gYW5kIHdpbGwgYmUgdXNlZCB0byBkaXN0aW5ndWlzaCB0aGVtIHdpdGggb3RoZXIgRWxlbWVudHNcclxuY2xhc3MgVk5vZGUge31cclxuXHJcbi8vIEludGVyZmFjZSB3aGljaCB3aWxsIGJlIGltcGxlbWVudGVkIGJ5IGFsbCB0eXBlcyBvZiBub2RlcyBpbiB0aGUgVi1ET00gVHJlZVxyXG5leHBvcnQgaW50ZXJmYWNlIFZOb2RlSW50ZXJmYWNlIHtcclxuICAvLyB0aGUgaHRtbCBjb250ZW50IGFzIHN0cmluZywgd2hpY2ggYWxsb3dzIHRvIHVzZSBhcyBgZWwuaW5uZXJIVE1MID0gPGRpdj4uLi48L2Rpdj5gXHJcbiAgdG9TdHJpbmcoKTogc3RyaW5nO1xyXG4gIC8vIGNyZWF0ZXMgSFRNTCBOb2RlcyAoSFRNTEVsZW1lbnQsIFNWR0VsZW1lbnQsIERvY3VtZW50RnJhZ21lbnQgYW5kIFRleHQgbm9kZSkgZm9yIHRoZSBWLVRyZWVcclxuICBhc05vZGUoKTogTm9kZTtcclxuICAvLyByZWZlcmVuY2UgdG8gdGhlIHBhcmVudCBWLU5vZGUgb2YgdGhpcyBWLU5vZGUuIChpLmUuIHRoaXMgbm9kZSB3YXMgdGhlIGNoaWxkIGVsZW1lbnQgaW4ganN4KVxyXG4gIC8vIG51bGwgaW4gY2FzZSBvZiB0aGUgcm9vdCBlbGVtZW50IGZyb20gdGhlIHJlbmRlciB0cmVlXHJcbiAgcGFyZW50OiBWTm9kZUludGVyZmFjZSB8IG51bGw7XHJcbiAgLy8gbGlzdCBvZiBWLU5vZGUgY29udmVydGVkIGNoaWxkIGVsZW1lbnQgZnJvbSBqc3ggY29kZVxyXG4gIGNoaWxkcmVuOiBBcnJheTxWTm9kZUludGVyZmFjZSB8IG5ldmVyPjtcclxuICAvLyBlLmcuIHRleHQsIGh0bWwgZWxlbWVudCwgbnVsbCBldGNcclxuICB0eXBlOiBzdHJpbmc7XHJcbiAgLy8gcmVmZXJlbmNlIHRvIHRoZSBjcmVhdGVkIEhUTUwgZWxlbWVudCBmb3IgdGhpcyBWLU5vZGVcclxuICBub2RlPzogTm9kZTtcclxuICAvLyByZW1vdmVzIGFsbCBIVE1MIEVsZW1lbnRzIHdoaWNoIHdlcmUgcmVuZGVyZWQgYXMgcGFydCBvZiB0aGlzIFYtTm9kZSBvciBpdHMgY2hpbGRyZW4gZnJvbSBqc3ggY29kZVxyXG4gIHJlbW92ZUZyb21ET00oKTogdm9pZDtcclxuICAvLyB1cGRhdGUgdGhlIERPTSBub2RlIHdoaWNoIHdlcmUgcmVuZGVyZWQgZm9yIHRoaXMgdi1ub2RlIGFuZCBpdCdzIGNoaWxkcmVuXHJcbiAgLy8gdG8gcmVmbGVjdCBhbGwgY2hhbmdlcyBjb21pbmcgZnJvbSB0aGUgbmV3IFYtTm9kZVxyXG4gIGRpZmZBbmRQYXRjaChuZXdOb2RlOiBWTm9kZUludGVyZmFjZSk6IHZvaWQ7XHJcbn1cclxuXHJcbi8vIFYtTm9kZSB3aGljaCB3aWxsIGJlIHJlbmRlcmVkIGFzIEhUTUxFbGVtZW50IG9yIFNWR0VsZW1lbnRcclxuY2xhc3MgRWxlbWVudFZOb2RlIGV4dGVuZHMgVk5vZGUgaW1wbGVtZW50cyBWTm9kZUludGVyZmFjZSB7XHJcbiAgdHlwZSA9IFwiRWxlbWVudFwiO1xyXG4gIHRhZzogc3RyaW5nO1xyXG4gIHByb3BzOiBBdHRyaWJ1dGVzICYgU3BlY2lhbEF0dHJpYnV0ZXM7XHJcbiAgbm9kZTogRWxlbWVudCA9IG51bGwgYXMgYW55O1xyXG4gIGNoaWxkcmVuOiBWTm9kZUludGVyZmFjZVtdO1xyXG4gIHBhcmVudDogVk5vZGVJbnRlcmZhY2UgPSBudWxsIGFzIGFueTtcclxuICBzdmdDb250ZXh0OiBib29sZWFuID0gZmFsc2U7IC8vIHdpbGwgYmUgc2V0IHRvIHRydWUgd2hlbiBlbGVtZW50IGlzIGFuIFNWRyBFbGVtZW50XHJcblxyXG4gIGNvbnN0cnVjdG9yKHtcclxuICAgIHRhZyxcclxuICAgIHByb3BzLFxyXG4gICAgY2hpbGRyZW4sXHJcbiAgfToge1xyXG4gICAgdGFnOiBzdHJpbmc7XHJcbiAgICBwcm9wczogQXR0cmlidXRlcyAmIFNwZWNpYWxBdHRyaWJ1dGVzO1xyXG4gICAgY2hpbGRyZW46IEpTWENoaWxkW107XHJcbiAgfSkge1xyXG4gICAgc3VwZXIoKTtcclxuICAgIHRoaXMudGFnID0gdGFnO1xyXG4gICAgdGhpcy5wcm9wcyA9IHByb3BzO1xyXG5cclxuICAgIC8vIGNvbnZlcnQgY2hpbGQganN4IGNvbnRlbnQgdG8gVk5vZGVzXHJcbiAgICB0aGlzLmNoaWxkcmVuID0gY2hpbGRyZW4ubWFwKChjaGlsZCkgPT4ge1xyXG4gICAgICBpZiAoQXJyYXkuaXNBcnJheShjaGlsZCkpIHJldHVybiBuZXcgRnJhZ21lbnRWTm9kZShjaGlsZCk7XHJcbiAgICAgIGlmIChjaGlsZCBpbnN0YW5jZW9mIFZOb2RlKSByZXR1cm4gY2hpbGQgYXMgVk5vZGVJbnRlcmZhY2U7XHJcbiAgICAgIGlmIChjaGlsZCBpbnN0YW5jZW9mIE5vZGUpIHJldHVybiBuZXcgTGl2ZU5vZGVWTm9kZShjaGlsZCk7XHJcbiAgICAgIGlmICghdHJ1dGh5KGNoaWxkKSkgcmV0dXJuIG5ldyBOdWxsVk5vZGUoKTtcclxuXHJcbiAgICAgIHJldHVybiBuZXcgVGV4dFZOb2RlKGNoaWxkIGFzIHN0cmluZyB8IG51bWJlciB8IHRydWUpO1xyXG4gICAgfSk7XHJcbiAgICAvLyBzZXQgcGFyZW50IHByb3BlcnR5IG9uIGFsbCBjaGlsZHJlblxyXG4gICAgdGhpcy5jaGlsZHJlbi5mb3JFYWNoKChjaGlsZCkgPT4gKGNoaWxkLnBhcmVudCA9IHRoaXMpKTtcclxuICB9XHJcblxyXG4gIHRvU3RyaW5nKCkge1xyXG4gICAgcmV0dXJuIGFzSHRtbFN0cmluZyh0aGlzLnRhZywgdGhpcy5wcm9wcywgdGhpcy5jaGlsZHJlbik7XHJcbiAgfVxyXG5cclxuICBhc05vZGUoKSB7XHJcbiAgICAvLyB0cmF2ZXJzZSB0aGUgVlRyZWUgdG8gY2hlY2sgaWYgdGhpcyBlbGVtZW50IGlzIHJlbmRlcmVkIGluc2lkZSBhbiBzdmcgZWxlbWVudFxyXG4gICAgbGV0IHN2Z0NvbnRleHQgPSBmYWxzZTtcclxuICAgIGxldCB2Tm9kZTogVk5vZGVJbnRlcmZhY2UgPSB0aGlzO1xyXG4gICAgd2hpbGUgKHZOb2RlLnBhcmVudCkge1xyXG4gICAgICBpZiAodk5vZGUudGFnID09PSBcInN2Z1wiKSB7XHJcbiAgICAgICAgc3ZnQ29udGV4dCA9IHRydWU7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgICAgdk5vZGUgPSB2Tm9kZS5wYXJlbnQ7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gc3RvcmUgdGhlIHN2ZyBjb250ZXh0IGluZm9ybWF0aW9uIHRvIHRoZSBwcm9wZXJ0eSB0byBhbGxvdyB1c2luZyBpdCB3aGVuIHRoZSB2LW5vZGUgaXMgY2xvbmVkXHJcbiAgICB0aGlzLnN2Z0NvbnRleHQgPSBzdmdDb250ZXh0O1xyXG5cclxuICAgIGNvbnN0IG5vZGUgPSBhc05vZGUoXHJcbiAgICAgIHRoaXMudGFnLFxyXG4gICAgICB0aGlzLnByb3BzLFxyXG4gICAgICB0aGlzLmNoaWxkcmVuLFxyXG4gICAgICB0aGlzLnN2Z0NvbnRleHRcclxuICAgICkgYXMgRWxlbWVudDtcclxuICAgIHRoaXMubm9kZSA9IG5vZGU7XHJcblxyXG4gICAgLy8gbWVtb3JpemUgZm9yIG5leHQgc3VidHJlZSByZS1yZW5kZXJzXHJcbiAgICByZW5kZXJlZFZUcmVlcy5zZXQobm9kZSwgdGhpcyk7XHJcblxyXG4gICAgcmV0dXJuIG5vZGU7XHJcbiAgfVxyXG5cclxuICByZW1vdmVGcm9tRE9NKCkge1xyXG4gICAgdGhpcy5ub2RlLnBhcmVudEVsZW1lbnQhLnJlbW92ZUNoaWxkKHRoaXMubm9kZSk7XHJcbiAgfVxyXG5cclxuICBkaWZmQW5kUGF0Y2gobmV3Tm9kZTogRWxlbWVudFZOb2RlKSB7XHJcbiAgICBpZiAobmV3Tm9kZS50YWcgPT09IHRoaXMudGFnKSB7XHJcbiAgICAgIG5ld05vZGUubm9kZSA9IHRoaXMubm9kZTtcclxuICAgICAgLy8gdXBkYXRlIHByb3BzIGFuZCBhdHRyaWJ1dGVzXHJcbiAgICAgIEVsZW1lbnRWTm9kZS5hZGRQcm9wcyhuZXdOb2RlLm5vZGUsIG5ld05vZGUucHJvcHMsIHRoaXMucHJvcHMpO1xyXG5cclxuICAgICAgLy8gY2hpbGRyZW4gPT4gaXRlciBhbmQgcGF0Y2hcclxuICAgICAgLy8gb2xkIGNoaWxkcmVuIGJlaW5nIG1vZGlmaWVkXHJcbiAgICAgIGRpZmZBbmRQYXRjaENoaWxkcmVuKHRoaXMsIG5ld05vZGUpO1xyXG4gICAgfVxyXG4gICAgLy8gdGFnIGhhcyBjaGFuZ2VkXHJcbiAgICBlbHNlIHtcclxuICAgICAgdGhpcy5ub2RlLnJlcGxhY2VXaXRoKG5ld05vZGUuYXNOb2RlKCkpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIG1lbW9yaXplIGZvciBuZXh0IHN1YnRyZWUgcmUtcmVuZGVyc1xyXG4gICAgcmVuZGVyZWRWVHJlZXMuc2V0KHRoaXMubm9kZSwgbmV3Tm9kZSk7XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgZnJvbUV4aXN0aW5nRWxlbWVudE5vZGUoXHJcbiAgICB2Tm9kZTogRWxlbWVudFZOb2RlLFxyXG4gICAgY2hpbGRyZW46IEFycmF5PFZOb2RlSW50ZXJmYWNlIHwgVk5vZGVJbnRlcmZhY2VbXT5cclxuICApIHtcclxuICAgIGNvbnN0IHsgdGFnLCBwcm9wcywgcGFyZW50LCBub2RlLCBzdmdDb250ZXh0IH0gPSB2Tm9kZTtcclxuICAgIGNvbnN0IG5ld1ZOb2RlID0gbmV3IEVsZW1lbnRWTm9kZSh7IHRhZywgcHJvcHMsIGNoaWxkcmVuIH0pO1xyXG4gICAgT2JqZWN0LmFzc2lnbihuZXdWTm9kZSwgeyBwYXJlbnQsIG5vZGUsIHN2Z0NvbnRleHQgfSk7XHJcbiAgICByZXR1cm4gbmV3Vk5vZGU7XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgYWRkUHJvcHMoXHJcbiAgICBlbGVtZW50OiBFbGVtZW50LFxyXG4gICAgbmV3UHJvcHM6IFJlY29yZDxzdHJpbmcsIGFueT4sXHJcbiAgICBvbGRQcm9wczogUmVjb3JkPHN0cmluZywgYW55PiA9IHt9XHJcbiAgKSB7XHJcbiAgICAvLyBpdGVyYXRlIG92ZXIgYWxsIG1vZGlmaWVkIG5ldyBhbmQgb2xkIHByb3BlcnRpZXMgYW5kIHNldC9yZW1vdmUvdXBkYXRlIHRoZW1cclxuICAgIEFycmF5LmZyb20obmV3IFNldChbLi4uT2JqZWN0LmtleXMobmV3UHJvcHMpLCAuLi5PYmplY3Qua2V5cyhvbGRQcm9wcyldKSlcclxuICAgICAgLm1hcCgocHJvcE5hbWUpID0+ICh7XHJcbiAgICAgICAgcHJvcE5hbWUsXHJcbiAgICAgICAgb2xkVmFsdWU6IG9sZFByb3BzW3Byb3BOYW1lXSxcclxuICAgICAgICBuZXdWYWx1ZTogbmV3UHJvcHNbcHJvcE5hbWVdLFxyXG4gICAgICB9KSlcclxuICAgICAgLmZpbHRlcigoeyBuZXdWYWx1ZSwgb2xkVmFsdWUgfSkgPT4gbmV3VmFsdWUgIT09IG9sZFZhbHVlKVxyXG4gICAgICAuZm9yRWFjaCgoeyBwcm9wTmFtZSwgbmV3VmFsdWUsIG9sZFZhbHVlIH0pID0+IHtcclxuICAgICAgICAvLyBmb3Igc3R5bGUgYXMgb2JqZWN0OlxyXG4gICAgICAgIC8vIChzdHlsZTopIHtkaXNwbGF5OiBcIm5vbmVcIiwgcG9zaXRpb246IFwiYWJzb2x1dGVcIn0gPT0+ICdkaXNwbGF5OiBub25lOyBwb3NpdGlvbjogYWJzb2x1dGU7J1xyXG4gICAgICAgIGlmIChwcm9wTmFtZSA9PT0gXCJzdHlsZVwiICYmIHR5cGVvZiBuZXdWYWx1ZSA9PT0gXCJvYmplY3RcIilcclxuICAgICAgICAgIG5ld1ZhbHVlID0gT2JqZWN0LmVudHJpZXMobmV3VmFsdWUpXHJcbiAgICAgICAgICAgIC5maWx0ZXIoKFssIHZdKSA9PiB0cnV0aHkodikpXHJcbiAgICAgICAgICAgIC5tYXAoKFtrLCB2XSkgPT4gYCR7a306ICR7dn1gKVxyXG4gICAgICAgICAgICAuam9pbihcIjsgXCIpO1xyXG5cclxuICAgICAgICAvLyAoY2xhc3M6KSBbXCJidG5cIiwgXCJyZWRcIl0gPT0+IFwiYnRuIHJlZFwiXHJcbiAgICAgICAgaWYgKHByb3BOYW1lID09PSBcImNsYXNzXCIgJiYgQXJyYXkuaXNBcnJheShuZXdWYWx1ZSkpXHJcbiAgICAgICAgICBuZXdWYWx1ZSA9IG5ld1ZhbHVlLmpvaW4oXCIgXCIpO1xyXG4gICAgICAgIC8vIHByb3BzIHN0YXJ0aW5nIHdpdGggXCJvbi1cIiBhcmUgZXZlbnQgbGlzdGVuZXJzXHJcbiAgICAgICAgaWYgKFxyXG4gICAgICAgICAgcHJvcE5hbWUuc3RhcnRzV2l0aChcIm9uLVwiKSAmJlxyXG4gICAgICAgICAgKHR5cGVvZiBuZXdWYWx1ZSA9PT0gXCJmdW5jdGlvblwiIHx8XHJcbiAgICAgICAgICAgIHR5cGVvZiBuZXdWYWx1ZSA9PT0gXCJvYmplY3RcIiB8fFxyXG4gICAgICAgICAgICB0eXBlb2Ygb2xkVmFsdWUgPT09IFwiZnVuY3Rpb25cIiB8fFxyXG4gICAgICAgICAgICB0eXBlb2Ygb2xkVmFsdWUgPT09IFwib2JqZWN0XCIpXHJcbiAgICAgICAgKSB7XHJcbiAgICAgICAgICAvLyByZW1vdmUgbGVhZGluZyBcIm9uLVwiXCJcclxuICAgICAgICAgIGNvbnN0IGV2ZW50ID0gcHJvcE5hbWUucmVwbGFjZSgvXm9uLS8sIFwiXCIpO1xyXG5cclxuICAgICAgICAgIGlmICh0eXBlb2YgbmV3VmFsdWUgPT09IFwiZnVuY3Rpb25cIiB8fCB0eXBlb2YgbmV3VmFsdWUgPT09IFwib2JqZWN0XCIpXHJcbiAgICAgICAgICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcclxuICAgICAgICAgICAgICBldmVudCxcclxuICAgICAgICAgICAgICBuZXdWYWx1ZSBhcyBFdmVudExpc3RlbmVyT3JFdmVudExpc3RlbmVyT2JqZWN0XHJcbiAgICAgICAgICAgICk7XHJcblxyXG4gICAgICAgICAgaWYgKHR5cGVvZiBvbGRWYWx1ZSA9PT0gXCJmdW5jdGlvblwiIHx8IHR5cGVvZiBvbGRWYWx1ZSA9PT0gXCJvYmplY3RcIilcclxuICAgICAgICAgICAgZWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFxyXG4gICAgICAgICAgICAgIGV2ZW50LFxyXG4gICAgICAgICAgICAgIG9sZFZhbHVlIGFzIEV2ZW50TGlzdGVuZXJPckV2ZW50TGlzdGVuZXJPYmplY3RcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gYm9vbGVhbiBhdHRyaWJ1dGUgc2V0IHdpdGhvdXQgdmFsdWVcclxuICAgICAgICBlbHNlIGlmIChuZXdWYWx1ZSA9PT0gdHJ1ZSkgZWxlbWVudC5zZXRBdHRyaWJ1dGUocHJvcE5hbWUsIFwiXCIpO1xyXG4gICAgICAgIC8vIHJlbW92ZSBvbGQgYXR0cmlidXRlcyB3aGljaCBhcmUgZmFsc2Ugbm93XHJcbiAgICAgICAgZWxzZSBpZiAoIXRydXRoeShuZXdWYWx1ZSkpIGVsZW1lbnQucmVtb3ZlQXR0cmlidXRlKHByb3BOYW1lKTtcclxuICAgICAgICAvLyB1cGRhdGUgdG8gbmV3IHZhbHVlIGFzIHN0cmluZ1xyXG4gICAgICAgIGVsc2UgaWYgKHR5cGVvZiBuZXdWYWx1ZSA9PT0gXCJzdHJpbmdcIiB8fCB0eXBlb2YgbmV3VmFsdWUgPT09IFwibnVtYmVyXCIpXHJcbiAgICAgICAgICBlbGVtZW50LnNldEF0dHJpYnV0ZShwcm9wTmFtZSwgU3RyaW5nKG5ld1ZhbHVlKSk7XHJcbiAgICAgICAgLy8ga2V5IGhhcyB0aGUgZm9ybSBvZiBcIm9uLWNoYW5nZVwiLiB2YWx1ZSBpcyB0aGUgY2FsbGJhY2sgZnVuY3Rpb24gb3IgYW4gb2JqZWN0IGltcGxlbWVudGluZyB7RXZlbnRMaXN0ZW5lcn0gaW50ZXJmYWNlXHJcbiAgICAgICAgLy8gQHRzLWlnbm9yZSAtIHByb3ZpZGluZyB0aGUgdmFsdWUgYXMgcHJvcGVydHkgdG8gaHRtbCBlbGVtZW50XHJcbiAgICAgICAgZWxzZSBlbGVtZW50W3Byb3BOYW1lXSA9IG5ld1ZhbHVlOyAvLyBAVE9ETzogcmVtb3ZlIG9sZCBvYmogd2hlbiBuZXcgaXMgbnVsbDo6IG5ldyBudWxsIC0+IG9sZDogc3RyPyAtPiByZW1vdmVBdHQsIGV2ZW50PyA6IHJlbW92ZUV2LCBvYmo/OiBbcHJvcF0gPSB1bmRlZlxyXG4gICAgICB9KTtcclxuICB9XHJcbn1cclxuXHJcbi8vIFYtTm9kZSBmb3IgdGhlIEZyYWdtZW50IGVsZW1lbnQgaW4ganN4IChgPD48Lz5gKSBvciB3aGVuIGFuIGFycmF5IGlzIHBsYWNlZCBkaXJlY3RseSBpbiBqc3ggY2hpbGRyZW4gKGUuZy4gYDxlbGVtPntbbGlzdF19PC9lbGVtPmApXHJcbmNsYXNzIEZyYWdtZW50Vk5vZGUgZXh0ZW5kcyBWTm9kZSBpbXBsZW1lbnRzIFZOb2RlSW50ZXJmYWNlIHtcclxuICB0eXBlID0gXCJGcmFnbWVudFwiO1xyXG4gIGNoaWxkcmVuOiBWTm9kZUludGVyZmFjZVtdO1xyXG4gIHBhcmVudDogVk5vZGVJbnRlcmZhY2UgPSBudWxsIGFzIGFueTtcclxuXHJcbiAgY29uc3RydWN0b3IoY2hpbGRyZW46IEpTWENoaWxkW10pIHtcclxuICAgIHN1cGVyKCk7XHJcblxyXG4gICAgdGhpcy5jaGlsZHJlbiA9IGNoaWxkcmVuLm1hcCgoY2hpbGQpID0+IHtcclxuICAgICAgaWYgKEFycmF5LmlzQXJyYXkoY2hpbGQpKSByZXR1cm4gbmV3IEZyYWdtZW50Vk5vZGUoY2hpbGQpO1xyXG4gICAgICBpZiAoY2hpbGQgaW5zdGFuY2VvZiBWTm9kZSkgcmV0dXJuIGNoaWxkIGFzIFZOb2RlSW50ZXJmYWNlO1xyXG4gICAgICBpZiAoY2hpbGQgaW5zdGFuY2VvZiBOb2RlKSByZXR1cm4gbmV3IExpdmVOb2RlVk5vZGUoY2hpbGQpO1xyXG4gICAgICBpZiAoIXRydXRoeShjaGlsZCkpIHJldHVybiBuZXcgTnVsbFZOb2RlKCk7XHJcbiAgICAgIHJldHVybiBuZXcgVGV4dFZOb2RlKGNoaWxkIGFzIHN0cmluZyB8IG51bWJlciB8IHRydWUpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgdGhpcy5jaGlsZHJlbi5mb3JFYWNoKChjaGlsZCkgPT4gKGNoaWxkLnBhcmVudCA9IHRoaXMpKTtcclxuICB9XHJcblxyXG4gIGFzTm9kZSgpIHtcclxuICAgIGNvbnN0IG5vZGUgPSBhc05vZGUodW5kZWZpbmVkLCB7fSwgdGhpcy5jaGlsZHJlbikgYXMgRG9jdW1lbnRGcmFnbWVudDtcclxuXHJcbiAgICByZXR1cm4gbm9kZTtcclxuICB9XHJcblxyXG4gIHRvU3RyaW5nKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuY2hpbGRyZW4ubWFwKChjaGlsZCkgPT4gY2hpbGQudG9TdHJpbmcoKSkuam9pbihcIlwiKTtcclxuICB9XHJcblxyXG4gIGRpZmZBbmRQYXRjaChuZXdWTm9kZTogRnJhZ21lbnRWTm9kZSkge1xyXG4gICAgcmV0dXJuIGRpZmZBbmRQYXRjaENoaWxkcmVuKHRoaXMsIG5ld1ZOb2RlKTtcclxuICB9XHJcblxyXG4gIHJlbW92ZUZyb21ET00oKSB7XHJcbiAgICB0aGlzLmNoaWxkcmVuLmZvckVhY2goKGNoaWxkKSA9PiBjaGlsZC5yZW1vdmVGcm9tRE9NKCkpO1xyXG4gIH1cclxufVxyXG5cclxuLy8gVi1Ob2RlIGZvciBpdGVtcyB3aGljaCBiZSByZW5kZXJlZCBhcyB0ZXh0IChzdHJpbmcsIG51bWJlciwuLiApXHJcbmNsYXNzIFRleHRWTm9kZSBleHRlbmRzIFZOb2RlIGltcGxlbWVudHMgVk5vZGVJbnRlcmZhY2Uge1xyXG4gIHR5cGUgPSBcIlRleHROb2RlXCI7XHJcbiAgY2hpbGRyZW4gPSBbXTtcclxuICBub2RlOiBUZXh0ID0gbnVsbCBhcyBhbnk7XHJcbiAgcHJvcHM6IHsgY29udGVudDogYW55IH07XHJcbiAgcGFyZW50OiBWTm9kZUludGVyZmFjZSA9IG51bGwgYXMgYW55O1xyXG5cclxuICAvKipcclxuICAgKlxyXG4gICAqL1xyXG4gIGNvbnN0cnVjdG9yKGNvbnRlbnQ6IHN0cmluZyB8IG51bWJlciB8IGJvb2xlYW4pIHtcclxuICAgIHN1cGVyKCk7XHJcbiAgICB0aGlzLnByb3BzID0geyBjb250ZW50IH07IC8vQFRPRE86XHJcbiAgfVxyXG5cclxuICBhc05vZGUoKSB7XHJcbiAgICBjb25zdCB0ZXh0Tm9kZSA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKHRoaXMucHJvcHMuY29udGVudCk7XHJcbiAgICB0aGlzLm5vZGUgPSB0ZXh0Tm9kZTtcclxuICAgIHJldHVybiB0ZXh0Tm9kZTtcclxuICB9XHJcblxyXG4gIHRvU3RyaW5nKCkge1xyXG4gICAgcmV0dXJuIHNhbml0aXplKHRoaXMucHJvcHMuY29udGVudCk7XHJcbiAgfVxyXG5cclxuICBkaWZmQW5kUGF0Y2gobmV3Tm9kZTogVGV4dFZOb2RlKSB7XHJcbiAgICB0aGlzLm5vZGUubm9kZVZhbHVlID0gbmV3Tm9kZS5wcm9wcy5jb250ZW50O1xyXG4gICAgbmV3Tm9kZS5ub2RlID0gdGhpcy5ub2RlO1xyXG4gIH1cclxuXHJcbiAgcmVtb3ZlRnJvbURPTSgpIHtcclxuICAgIHRoaXMubm9kZS5wYXJlbnRFbGVtZW50IS5yZW1vdmVDaGlsZCh0aGlzLm5vZGUpO1xyXG4gIH1cclxufVxyXG5cclxuLy8gVi1Ob2RlIGZvciBgbnVsbGAsIGBmYWxzZWAgb3IgYHVuZGVmaW5lZGAgaW4ganN4IGVsZW1lbnRzXHJcbmNsYXNzIE51bGxWTm9kZSBleHRlbmRzIFZOb2RlIGltcGxlbWVudHMgVk5vZGVJbnRlcmZhY2Uge1xyXG4gIHR5cGUgPSBcIk51bGxcIjtcclxuICBjaGlsZHJlbiA9IFtdO1xyXG4gIHBhcmVudDogVk5vZGVJbnRlcmZhY2UgPSBudWxsIGFzIGFueTtcclxuICAvKipcclxuICAgKlxyXG4gICAqL1xyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgc3VwZXIoKTtcclxuICB9XHJcblxyXG4gIGFzTm9kZSgpIHtcclxuICAgIC8vcmV0dXJuIG51bGw7IC8vIHJldHVybiBlbXB0eSBmcmFnbWVudD9cclxuICAgIHJldHVybiBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XHJcbiAgfVxyXG5cclxuICBkaWZmQW5kUGF0Y2gobmV3Tm9kZTI6IE51bGxWTm9kZSkge1xyXG4gICAgcmV0dXJuO1xyXG4gIH1cclxuXHJcbiAgcmVtb3ZlRnJvbURPTSgpIHtcclxuICAgIHJldHVybjtcclxuICB9XHJcblxyXG4gIHRvU3RyaW5nKCkge1xyXG4gICAgcmV0dXJuIFwiXCI7XHJcbiAgfVxyXG59XHJcblxyXG4vLyBWLU5vZGUgd2hlbiBhIGxpdmUgSFRNTEVsZW1lbnQgd2FzIHJlZmVybmNlZCBpbiBqc3ggKGUuZy4gYDxkaXY+e2RvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY29tcFwiKX08L2Rpdj5gKVxyXG5jbGFzcyBMaXZlTm9kZVZOb2RlIGV4dGVuZHMgVk5vZGUgaW1wbGVtZW50cyBWTm9kZUludGVyZmFjZSB7XHJcbiAgdHlwZSA9IFwiTm9kZVwiO1xyXG4gIGNoaWxkcmVuID0gW10gYXMgVk5vZGVJbnRlcmZhY2VbXTtcclxuICBwYXJlbnQ6IFZOb2RlSW50ZXJmYWNlID0gbnVsbCBhcyBhbnk7XHJcbiAgbm9kZTogTm9kZTtcclxuXHJcbiAgLyoqXHJcbiAgICpcclxuICAgKi9cclxuICBjb25zdHJ1Y3Rvcihub2RlOiBOb2RlKSB7XHJcbiAgICBzdXBlcigpO1xyXG4gICAgdGhpcy5ub2RlID0gbm9kZTtcclxuICB9XHJcblxyXG4gIGFzTm9kZSgpIHtcclxuICAgIHJldHVybiB0aGlzLm5vZGU7XHJcbiAgfVxyXG5cclxuICBkaWZmQW5kUGF0Y2gobmV3Tm9kZTogTGl2ZU5vZGVWTm9kZSkge1xyXG4gICAgaWYgKG5ld05vZGUubm9kZSAhPT0gdGhpcy5ub2RlKSB7XHJcbiAgICAgICh0aGlzLm5vZGUgYXMgQ2hpbGROb2RlKS5yZXBsYWNlV2l0aChuZXdOb2RlLm5vZGUpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcmVtb3ZlRnJvbURPTSgpIHtcclxuICAgIHRoaXMubm9kZS5wYXJlbnRFbGVtZW50IS5yZW1vdmVDaGlsZCh0aGlzLm5vZGUpO1xyXG4gIH1cclxuXHJcbiAgdG9TdHJpbmcoKSB7XHJcbiAgICByZXR1cm4gZ2V0T3V0ZXJIdG1sKHRoaXMubm9kZSk7XHJcbiAgfVxyXG59XHJcblxyXG4vLyB3cmFwcGVyIFYtTm9kZSB3aGljaCByZWZlcmVuY2VzIHRoZSBIVE1MIE5vZGUgd2hpY2ggaXRzZWxmIGlzIG5vdCByZW5kZXJlZCBieSBqc3gsIGJ1dCBpdHMgY29udGVudC5cclxuY2xhc3MgUm9vdFZOb2RlIGV4dGVuZHMgVk5vZGUgaW1wbGVtZW50cyBWTm9kZUludGVyZmFjZSB7XHJcbiAgdHlwZSA9IFwiUm9vdFwiO1xyXG4gIHBhcmVudCA9IG51bGw7XHJcbiAgbm9kZTogRWxlbWVudDtcclxuICBjaGlsZHJlbjogVk5vZGVJbnRlcmZhY2VbXTtcclxuICAvKipcclxuICAgKlxyXG4gICAqL1xyXG4gIGNvbnN0cnVjdG9yKGNvbnRlbnQ6IFZOb2RlSW50ZXJmYWNlLCBkb21Ob2RlOiBFbGVtZW50KSB7XHJcbiAgICBzdXBlcigpO1xyXG4gICAgY29udGVudC5wYXJlbnQgPSB0aGlzO1xyXG4gICAgdGhpcy5jaGlsZHJlbiA9IFtjb250ZW50XTtcclxuICAgIHRoaXMubm9kZSA9IGRvbU5vZGU7XHJcbiAgfVxyXG5cclxuICBhc05vZGUoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5jaGlsZHJlblswXS5hc05vZGUoKTtcclxuICB9XHJcbiAgdG9TdHJpbmcoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5jaGlsZHJlblswXS50b1N0cmluZygpO1xyXG4gIH1cclxuXHJcbiAgZGlmZkFuZFBhdGNoKG5ld1ZOb2RlOiBWTm9kZUludGVyZmFjZSkge1xyXG4gICAgZGlmZkFuZFBhdGNoQ2hpbGRyZW4odGhpcywgbmV3Vk5vZGUpO1xyXG4gIH1cclxuXHJcbiAgcmVtb3ZlRnJvbURPTSgpIHtcclxuICAgIHRoaXMubm9kZS5yZW1vdmUoKTtcclxuICB9XHJcbn1cclxuXHJcbi8vIGdlbmVyYXRlIHRoZSBWLU5vZGVzIGFuZCBWLVRyZWUgYmFzZWQgb24gdGhlIG9iamVjdHMgcGFyc2VkIGJ5IHRoZSBqc3ggYmFiZWwgcGx1Z2luXHJcbmZ1bmN0aW9uIGFzVk5vZGUoXHJcbiAgdGFnOiBzdHJpbmcgfCBGdW5jdGlvbiB8IHVuZGVmaW5lZCxcclxuICBwcm9wczogSnN4UHJvcHNcclxuKTogVk5vZGVJbnRlcmZhY2Uge1xyXG4gIGlmICh0eXBlb2YgdGFnID09PSBcImZ1bmN0aW9uXCIpIHtcclxuICAgIGxldCByZXN1bHQgPSB0YWcocHJvcHMpO1xyXG4gICAgaWYgKHJlc3VsdCBpbnN0YW5jZW9mIFZOb2RlKSByZXR1cm4gcmVzdWx0IGFzIFZOb2RlSW50ZXJmYWNlO1xyXG4gICAgaWYgKHJlc3VsdCBpbnN0YW5jZW9mIE5vZGUpIHJldHVybiBuZXcgTGl2ZU5vZGVWTm9kZShyZXN1bHQpO1xyXG4gICAgLy8gbnVsbCBqc3ggbm9kZVxyXG4gICAgaWYgKCF0cnV0aHkocmVzdWx0KSkgcmV0dXJuIG5ldyBOdWxsVk5vZGUoKTtcclxuXHJcbiAgICByZXR1cm4gbmV3IFRleHRWTm9kZShyZXN1bHQpO1xyXG4gIH1cclxuXHJcbiAgY29uc3QgeyBjaGlsZHJlbiwgLi4uYXR0ciB9ID0gcHJvcHM7XHJcblxyXG4gIHJldHVybiB0YWdcclxuICAgID8gbmV3IEVsZW1lbnRWTm9kZSh7IHRhZywgcHJvcHM6IGF0dHIsIGNoaWxkcmVuIH0pXHJcbiAgICA6IG5ldyBGcmFnbWVudFZOb2RlKGNoaWxkcmVuKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIGNvbnZlcnRzIHByYWdtYSBvYmplY3QgdG8gaHRtbCBzdHJpbmdcclxuICoganN4cyBpcyBhbHdheXMgY2FsbGVkIHdoZW4gZWxlbWVudCBoYXMgbW9yZSB0aGFuIG9uZSBjaGlsZFxyXG4gKlxyXG4gKiBAcGFyYW0ge3N0cmluZyB8IEZ1bmN0aW9ufSB0YWcgLSB0YWcgbmFtZSBvciB0YWcgY2xhc3NcclxuICogQHBhcmFtIHtPYmplY3QgfCBudWxsfSBwcm9wcyAtIHByb3BzIGZvciB0aGUgdGFnXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24ganN4cyh0YWc6IHN0cmluZyB8IEZ1bmN0aW9uLCBwcm9wczogSnN4UHJvcHMpOiBWTm9kZUludGVyZmFjZSB7XHJcbiAgcmV0dXJuIGFzVk5vZGUodGFnLCBwcm9wcyk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBjb252ZXJ0cyB0aGUgZnJhZ21lbnRzIG9iamVjdCB0byBub2Rlc1xyXG4gKlxyXG4gKiBAcGFyYW0ge09iamVjdH0gcHJvcHNcclxuICogQHBhcmFtIHtBcnJheX0gcHJvcHMuY2hpbGRyZW4gLSBjaGlsZCBlbGVtZW50cyBpbiB0aGUgZnJhZ21lbnRcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBGcmFnbWVudChwcm9wczogSnN4UHJvcHMpIHtcclxuICByZXR1cm4gYXNWTm9kZSh1bmRlZmluZWQsIHByb3BzKTtcclxufVxyXG5cclxuLy8ganN4IGlzIGNhbGxlZCB3aGVuIHRoZSBlbGVtZW50IGhhcyBvbmUgb3IgemVybyBjaGlsZHJlblxyXG5leHBvcnQgZnVuY3Rpb24ganN4KFxyXG4gIHRhZzogc3RyaW5nIHwgRnVuY3Rpb24sXHJcbiAgcHJvcHM6IEF0dHJpYnV0ZXMgJiBTcGVjaWFsQXR0cmlidXRlcyAmIHsgY2hpbGRyZW4/OiBKU1hDaGlsZCB9XHJcbik6IFZOb2RlSW50ZXJmYWNlIHtcclxuICAvLyBAdHMtaWdub3JlIC0gd3JhcHBpbmcgdGhlIGNoaWxkcmVuIGFzIGFycmF5IHRvIHJlLXVzZSBqc3hzIG1ldGhvZFxyXG4gIHByb3BzLmNoaWxkcmVuID0gcHJvcHMuaGFzT3duUHJvcGVydHkoXCJjaGlsZHJlblwiKSA/IFtwcm9wcy5jaGlsZHJlbl0gOiBbXTtcclxuXHJcbiAgcmV0dXJuIGpzeHModGFnLCBwcm9wcyBhcyBKc3hQcm9wcyk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiByZW5kZXIgdGhlIGdpdmVuIG1hcmt1cCBpbnRvIHRoZSBnaXZlbiBIVE1MIG5vZGVcclxuICpcclxuICogQHBhcmFtIHtzdHJpbmd8SFRNTEVsZW1lbnR8SlNYfSBtYXJrdXAgLSBodG1sIGFzIHN0cmluZywgaHRtbCBlbGVtZW50IG9yIGpzeCB0ZW1wbGF0ZVxyXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBkb21Ob2RlIC0gY29udGFpbmVyIGZvciB0aGUgdGVtcGxhdGUgdG8gYmUgcmVuZGVyZWQgaW50b1xyXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFthcHBlbmQ9ZmFsc2VdIC0gc2hvdWxkIHRoZSBwcm92aWRlZCBtYXJrdXAgYmUgYXBwZW5kZWQgdG8gdGhlIGV4aXN0aW5nIG1hcmt1cCwgb3IgZGVmYXVsdCByZXBsYWNlIGl0XHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gcmVuZGVyKFxyXG4gIG1hcmt1cDpcclxuICAgIHwgc3RyaW5nXHJcbiAgICB8IG51bWJlclxyXG4gICAgfCBudWxsXHJcbiAgICB8IGJvb2xlYW5cclxuICAgIHwgdW5kZWZpbmVkXHJcbiAgICB8IEhUTUxFbGVtZW50XHJcbiAgICB8IFZOb2RlSW50ZXJmYWNlLCAvLyBAVE9ETzogc3BlY2lmaWMgc3VwcG9ydCBmb3IgVGVtcGxhdGU/ICguY29udGVudC5jbG9uZSlcclxuICBkb21Ob2RlOiBIVE1MRWxlbWVudCxcclxuICBhcHBlbmQ6IGJvb2xlYW4gPSBmYWxzZVxyXG4pIHtcclxuICBBcnJheS5mcm9tKGRvY3VtZW50LmJvZHkucXVlcnlTZWxlY3RvckFsbChcIipcIikpLmZvckVhY2goXHJcbiAgICAoZWwpID0+IChlbC5zdHlsZS5iYWNrZ3JvdW5kID0gXCIjY2NmZmNjXCIpXHJcbiAgKTtcclxuXHJcbiAgLy8gdGhlIGNvbnRlbnQgb2YgdGhlIGdpdmVuIERPTSBOb2RlIHdhcyBhbHJlYWR5IHJlbmRlcmVkIGJ5IGpzeC1ydW50aW1lLCBhbmQgaXQgb25seSBuZWVkcyB0byBiZSB1cGRhdGVkXHJcbiAgY29uc3QgaXNSZVJlbmRlciA9IHJlbmRlcmVkVlRyZWVzLmhhcyhkb21Ob2RlKTtcclxuXHJcbiAgaWYgKFxyXG4gICAgdHlwZW9mIG1hcmt1cCA9PT0gXCJzdHJpbmdcIiB8fFxyXG4gICAgdHlwZW9mIG1hcmt1cCA9PT0gXCJudW1iZXJcIiB8fFxyXG4gICAgbWFya3VwID09PSB0cnVlXHJcbiAgKSB7XHJcbiAgICBtYXJrdXAgPSBuZXcgVGV4dFZOb2RlKG1hcmt1cCk7XHJcbiAgfSBlbHNlIGlmIChtYXJrdXAgaW5zdGFuY2VvZiBOb2RlKSB7XHJcbiAgICBtYXJrdXAgPSBuZXcgTGl2ZU5vZGVWTm9kZShtYXJrdXApO1xyXG4gIH0gZWxzZSBpZiAobWFya3VwID09PSB1bmRlZmluZWQgfHwgbWFya3VwID09PSBudWxsIHx8IG1hcmt1cCA9PT0gZmFsc2UpIHtcclxuICAgIG1hcmt1cCA9IG5ldyBOdWxsVk5vZGUoKTtcclxuICB9XHJcblxyXG4gIGlmIChtYXJrdXAgaW5zdGFuY2VvZiBWTm9kZSkge1xyXG4gICAgbGV0IHZUcmVlO1xyXG5cclxuICAgIGlmICghYXBwZW5kICYmICFpc1JlUmVuZGVyKSBkb21Ob2RlLmlubmVySFRNTCA9IFwiXCI7XHJcblxyXG4gICAgaWYgKGlzUmVSZW5kZXIpIHtcclxuICAgICAgY29uc3Qgb2xkVlRyZWUgPSByZW5kZXJlZFZUcmVlcy5nZXQoZG9tTm9kZSkhO1xyXG5cclxuICAgICAgLy8gd2FzIHByZXZpb3VzbHkgcmVuZGVyZWQgYXMgYSBzdWJ0cmVlIGZyb20gYW5vdGhlciByZW5kZXJcclxuICAgICAgaWYgKG9sZFZUcmVlLnR5cGUgPT09IFwiRWxlbWVudFwiKSB7XHJcbiAgICAgICAgdlRyZWUgPSBFbGVtZW50Vk5vZGUuZnJvbUV4aXN0aW5nRWxlbWVudE5vZGUob2xkVlRyZWUgYXMgRWxlbWVudFZOb2RlLCBbXHJcbiAgICAgICAgICBtYXJrdXAsXHJcbiAgICAgICAgXSk7XHJcbiAgICAgICAgKG9sZFZUcmVlIGFzIEVsZW1lbnRWTm9kZSkuZGlmZkFuZFBhdGNoKHZUcmVlKTtcclxuICAgICAgICAvLyB1cGRhdGUgdGhlIGNoaWxkcmVuIHByb3BlcnR5IGluIHRoZSBtZW1vcnkgcmVmZXJlbmNlIGZyb20gdGhlIHByZXZpb3VzIHJlbmRlcixcclxuICAgICAgICAvLyBhdHRyaWJ1dGVzLCBldGMgd2lsbCBzdGF5IHRoZSBzYW1lXHJcbiAgICAgICAgb2xkVlRyZWUuY2hpbGRyZW4gPSB2VHJlZS5jaGlsZHJlbjtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB2VHJlZSA9IG5ldyBSb290Vk5vZGUobWFya3VwLCBkb21Ob2RlKTtcclxuICAgICAgICAvLyBkaWZmIGFuZCBwYXRjaCBET00gYmFzZWQgb24gdGhlIGxhc3QgcmVuZGVyXHJcbiAgICAgICAgKG9sZFZUcmVlIGFzIFJvb3RWTm9kZSkuZGlmZkFuZFBhdGNoKHZUcmVlKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgLy8gZmlyc3QgdGltZSByZW5kZXJcclxuICAgIGVsc2Uge1xyXG4gICAgICB2VHJlZSA9IG5ldyBSb290Vk5vZGUobWFya3VwLCBkb21Ob2RlKTtcclxuICAgICAgZG9tTm9kZS5hcHBlbmQodlRyZWUuYXNOb2RlKCkpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIG1lbW9yaXplIHRoZSBWLVRyZWUgd2hpY2ggcmVuZGVyZWQgdGhlIGN1cnJlbnQgRE9NLCB0byB1c2UgaXQgaW4gZnV0dXJlIHJlLXJlbmRlcnNcclxuICAgIHJlbmRlcmVkVlRyZWVzLnNldChkb21Ob2RlLCB2VHJlZSk7XHJcblxyXG4gICAgLy8gY2FsbCBhbGwgcmVmIGNhbGxiYWNrcyBmb3VuZCBkdXJpbmcgY3JlYXRpb24gb2YgbmV3IG5vZGVzIGR1cmluZyByZW5kZXJcclxuICAgIHdoaWxlIChyZWZzVG9DYWxsLmxlbmd0aCkge1xyXG4gICAgICAvLyByZW1vdmUgZmlyc3QgZnJvbSBsaXN0LCBhbmQgaW52b2tlIGl0XHJcbiAgICAgIHJlZnNUb0NhbGwuc3BsaWNlKDAsIDEpWzBdKCk7XHJcbiAgICB9XHJcbiAgfSBlbHNlIHtcclxuICAgIHRocm93IG5ldyBFcnJvcihcInJlbmRlciBtZXRob2QgY2FsbGVkIHdpdGggd3JvbmcgYXJndW1lbnQocylcIik7XHJcbiAgfVxyXG59XHJcblxyXG4vKipcclxuICogdGhlIHByb3ZpZGVkIHN0cmluZyB3aWxsIGJlIHJlbmRlcmVkIGFzIG1hcmt1cCBhbmQgbm90IGVzY2FwZWQgLyBzYW5pdGl6ZWQuXHJcbiAqIFVzZSB0aGlzIHdpdGggY2F1dGlvbiBiZWNhdXNlIHRoZW9yZXRpY2FsbHkgaXQgYWxsb3dzIGJyb2tlbiBodG1sIG9yIGV2ZW4geHNzIGF0dGFja3NcclxuICpcclxuICpcclxuICogQGV4cG9ydFxyXG4gKiBAcGFyYW0ge3N0cmluZ30gY29udGVudCAtIGh0bWwgYXMgc3RyaW5nIHdoaWNoIG5lZWRzIHRvIGJlIHJlbmRlcmVkXHJcbiAqIEByZXR1cm5zIHtWTm9kZUludGVyZmFjZX1cclxuICogQGV4YW1wbGVcclxuICogYDxhcnRpY2xlPnsgcmF3SHRtbChyaWNoVGV4dCkgfTwvYXJ0aWNsZT5gXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gcmF3SHRtbChjb250ZW50OiBzdHJpbmcpOiBWTm9kZUludGVyZmFjZSB7XHJcbiAgcmV0dXJuIG5ldyAoY2xhc3MgUmF3SHRtbCBleHRlbmRzIFZOb2RlIGltcGxlbWVudHMgVk5vZGVJbnRlcmZhY2Uge1xyXG4gICAgcGFyZW50OiBWTm9kZUludGVyZmFjZSA9IG51bGwgYXMgYW55O1xyXG4gICAgY2hpbGRyZW4gPSBbXTtcclxuICAgIHR5cGUgPSBcIlJhd0h0bWxcIjtcclxuICAgIGNoaWxkTm9kZXM6IENoaWxkTm9kZVtdID0gbnVsbCBhcyBhbnk7XHJcbiAgICBjb250ZW50OiBzdHJpbmc7XHJcbiAgICBub2RlPzogTm9kZTtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihjb250ZW50OiBzdHJpbmcpIHtcclxuICAgICAgc3VwZXIoKTtcclxuICAgICAgdGhpcy5jb250ZW50ID0gY29udGVudDtcclxuICAgIH1cclxuXHJcbiAgICByZW1vdmVGcm9tRE9NKCkge1xyXG4gICAgICB0aGlzLmNoaWxkTm9kZXMuZm9yRWFjaCgobm9kZSkgPT4gbm9kZS5wYXJlbnRFbGVtZW50IS5yZW1vdmVDaGlsZChub2RlKSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gc2ltcGxlIHJlLXJlbmRlcnMgd2l0aG91dCBkaWZmaW5nIGFuZCBwYXRjaGluZyBpbiBjYXNlIG9mIG1vZGlmaWVkIGNvbnRlbnRcclxuICAgIGRpZmZBbmRQYXRjaChuZXdOb2RlOiBSYXdIdG1sKSB7XHJcbiAgICAgIGlmICgobmV3Tm9kZS5jb250ZW50ID0gdGhpcy5jb250ZW50KSkge1xyXG4gICAgICAgIG5ld05vZGUubm9kZSA9IHRoaXMubm9kZTtcclxuICAgICAgICBuZXdOb2RlLmNoaWxkTm9kZXMgPSB0aGlzLmNoaWxkTm9kZXM7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcbiAgICAgIHRoaXMucmVtb3ZlRnJvbURPTSgpO1xyXG4gICAgICBpbnNlcnROZXdJdGVtKG5ld05vZGUpO1xyXG4gICAgfVxyXG5cclxuICAgIHRvU3RyaW5nKCkge1xyXG4gICAgICByZXR1cm4gY29udGVudDtcclxuICAgIH1cclxuXHJcbiAgICBhc05vZGUoKSB7XHJcbiAgICAgIGNvbnN0IHRlbXBsYXRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRlbXBsYXRlXCIpO1xyXG4gICAgICB0ZW1wbGF0ZS5pbm5lckhUTUwgPSB0aGlzLmNvbnRlbnQ7XHJcbiAgICAgIGNvbnN0IGRvY3VtZW50RnJhZ21lbnQgPSB0ZW1wbGF0ZS5jb250ZW50O1xyXG4gICAgICB0aGlzLmNoaWxkTm9kZXMgPSBBcnJheS5mcm9tKGRvY3VtZW50RnJhZ21lbnQuY2hpbGROb2Rlcyk7XHJcblxyXG4gICAgICAvLyBiYXNpY2FsbHkgdGhlIGAubm9kZWAgcHJvcGVydHkgaXMgdXNlZCB0byBkZXRlcm1pbmUgdGhlIGxhc3QgaHRtbCBub2RlIG9mIHRoZSBWTm9kZSxcclxuICAgICAgLy8gdG8gcG9zaXRpb24gdGhlIG5leHQgVk5vZGUncyBET00gTm9kZSBhZnRlciBpdC5cclxuICAgICAgLy8gdGhlcmVmb3JlIC5ub2RlIHJldHVybnMgdGhlIGxhc3Qgbm9kZSBvZiB0aGUgcmF3IGh0bWxcclxuICAgICAgaWYgKHRoaXMuY2hpbGROb2Rlcy5sZW5ndGgpXHJcbiAgICAgICAgdGhpcy5ub2RlID0gdGhpcy5jaGlsZE5vZGVzW3RoaXMuY2hpbGROb2Rlcy5sZW5ndGggLSAxXTtcclxuICAgICAgcmV0dXJuIGRvY3VtZW50RnJhZ21lbnQ7XHJcbiAgICB9XHJcbiAgfSkoY29udGVudCk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBEZWZlcnJlZCh7XHJcbiAgcGxhY2Vob2xkZXIsXHJcbiAgY29udGVudFByb21pc2UsXHJcbn06IHtcclxuICBwbGFjZWhvbGRlcjogVk5vZGVJbnRlcmZhY2U7XHJcbiAgY29udGVudFByb21pc2U6IFByb21pc2U8Vk5vZGVJbnRlcmZhY2U+O1xyXG59KSB7XHJcbiAgcmV0dXJuIG5ldyBEZWZlcnJlZFZOb2RlKHtcclxuICAgIHBsYWNlaG9sZGVyLFxyXG4gICAgY29udGVudFByb21pc2UsXHJcbiAgfSk7XHJcbn1cclxuZXhwb3J0IGNsYXNzIERlZmVycmVkVk5vZGUgZXh0ZW5kcyBWTm9kZSBpbXBsZW1lbnRzIFZOb2RlSW50ZXJmYWNlIHtcclxuICB0eXBlID0gXCJEZWZlcnJlZFwiO1xyXG4gIHBhcmVudDogVk5vZGVJbnRlcmZhY2UgPSBudWxsIGFzIGFueTtcclxuICBjaGlsZHJlbjogQXJyYXk8Vk5vZGVJbnRlcmZhY2U+O1xyXG5cclxuICBwbGFjZWhvbGRlcjogVk5vZGVJbnRlcmZhY2U7XHJcbiAgY29udGVudFByb21pc2U6IFByb21pc2U8Vk5vZGVJbnRlcmZhY2U+O1xyXG5cclxuICAvKipcclxuICAgKlxyXG4gICAqL1xyXG4gIGNvbnN0cnVjdG9yKHtcclxuICAgIHBsYWNlaG9sZGVyLFxyXG4gICAgY29udGVudFByb21pc2UsXHJcbiAgfToge1xyXG4gICAgcGxhY2Vob2xkZXI6IFZOb2RlSW50ZXJmYWNlO1xyXG4gICAgY29udGVudFByb21pc2U6IFByb21pc2U8Vk5vZGVJbnRlcmZhY2U+O1xyXG4gIH0pIHtcclxuICAgIHN1cGVyKCk7XHJcbiAgICB0aGlzLnBsYWNlaG9sZGVyID0gcGxhY2Vob2xkZXI7XHJcbiAgICB0aGlzLmNvbnRlbnRQcm9taXNlID0gY29udGVudFByb21pc2U7XHJcbiAgICB0aGlzLmNoaWxkcmVuID0gW25ldyBGcmFnbWVudFZOb2RlKFtwbGFjZWhvbGRlcl0pXTtcclxuICB9XHJcblxyXG4gIGFzTm9kZSgpIHtcclxuICAgIHRoaXMuY29udGVudFByb21pc2UudGhlbigoY29udGVudCkgPT4ge1xyXG4gICAgICBjb25zdCBuZXdDb250ZW50ID0gbmV3IEZyYWdtZW50Vk5vZGUoW2NvbnRlbnRdKTtcclxuICAgICAgdGhpcy5jaGlsZHJlblswXS5kaWZmQW5kUGF0Y2gobmV3Q29udGVudCk7XHJcbiAgICAgIHRoaXMuY2hpbGRyZW4gPSBbbmV3Q29udGVudF07XHJcbiAgICB9KTtcclxuXHJcbiAgICByZXR1cm4gdGhpcy5jaGlsZHJlblswXS5hc05vZGUoKTtcclxuICB9XHJcblxyXG4gIHRvU3RyaW5nKCkge1xyXG4gICAgcmV0dXJuIHRoaXMucGxhY2Vob2xkZXIudG9TdHJpbmcoKTtcclxuICB9XHJcblxyXG4gIHJlbW92ZUZyb21ET00oKSB7XHJcbiAgICB0aGlzLmNoaWxkcmVuLmZvckVhY2goKGNoaWxkVk5vZGUpID0+IGNoaWxkVk5vZGUucmVtb3ZlRnJvbURPTSgpKTtcclxuICB9XHJcblxyXG4gIGRpZmZBbmRQYXRjaChuZXdOb2RlOiBEZWZlcnJlZFZOb2RlKSB7XHJcbiAgICAvLyBhc3N1bWluZyB0aGVyZSBpcyBubyByZS1yZW5kZXJzIGR1cmluZyB0aGUgcmVzb2x2ZSBwZXJpb2QsXHJcbiAgICAvLyB3ZXJlIHRoZSBwcm9taXNlIGlzIG5vdCBjaGFuZ2VkIGJ1dCB0aGUgcGxhY2Vob2xkZXIgaXNcclxuICAgIGlmIChuZXdOb2RlLmNvbnRlbnRQcm9taXNlICE9PSB0aGlzLmNvbnRlbnRQcm9taXNlKSB7XHJcbiAgICAgIHRoaXMucmVtb3ZlRnJvbURPTSgpO1xyXG4gICAgICBpbnNlcnROZXdJdGVtKG5ld05vZGUpO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgeyByZW5kZXIsIHJhd0h0bWwsIERlZmVycmVkLCBWTm9kZUludGVyZmFjZSB9IGZyb20gXCIuL2pzeC9qc3gtcnVudGltZVwiO1xyXG5cclxuY29uc3QgeHNzID0gXCI8aW1nIHNyYz14IG9uZXJyb3I9XFxcImFsZXJ0KCdYU1MgQXR0YWNrJylcXFwiPlwiOyAvL1wiPHNjcmlwdD5hbGVydCgnLS4tJyk8L3NjcmlwdD5cIjtcclxuXHJcbmZ1bmN0aW9uIFJURShwcm9wczogLyp7IHR4dCwgXCJvbi1jbGlja1wiOiBvbkNsaWNrIH0qLyB7XHJcbiAgdHh0OiBzdHJpbmc7XHJcbiAgcmVmPzogRnVuY3Rpb247XHJcbn0pIHtcclxuICBjb25zb2xlLmxvZyhcIm9uQ2xpY2tcIiwgcHJvcHNbXCJvbi1jbGlja1wiXSk7XHJcbiAgcmV0dXJuIChcclxuICAgIDxwIHJlZj17KGVsOiBIVE1MRWxlbWVudCkgPT4gY29uc29sZS5sb2coXCJteSBkaXYgOjpyZWY6OjMuMlwiLCBlbCl9PlxyXG4gICAgICB7cHJvcHMudHh0fVxyXG4gICAgPC9wPlxyXG4gICk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIEJ1dHRvbih7XHJcbiAgY2hpbGRyZW4sXHJcbiAgZGlzYWJsZWQsXHJcbn06IHtcclxuICBjaGlsZHJlbjogYW55O1xyXG4gIGRpc2FibGVkOiBib29sZWFuO1xyXG4gIHJlZj86IEZ1bmN0aW9uO1xyXG59KSB7XHJcbiAgcmV0dXJuIChcclxuICAgIDxidXR0b25cclxuICAgICAgZGlzYWJsZWQ9e2Rpc2FibGVkfVxyXG4gICAgICByZWY9eyhlbDogSFRNTEVsZW1lbnQpID0+IGNvbnNvbGUubG9nKFwibXkgYnV0dG9uIDo6cmVmOjoxXCIsIGVsKX1cclxuICAgID5cclxuICAgICAgPHNwYW4gcmVmPXsoZWw6IEhUTUxFbGVtZW50KSA9PiBjb25zb2xlLmxvZyhcIm15IGEgOjpyZWY6OjJcIiwgZWwpfT5cclxuICAgICAgICBCdG4tc3Bhbi1maXJzdFxyXG4gICAgICA8L3NwYW4+XHJcbiAgICAgIHtjaGlsZHJlbn1cclxuICAgICAgPD5cclxuICAgICAgICA8c3BhbiByZWY9eyhlbDogSFRNTEVsZW1lbnQpID0+IGNvbnNvbGUubG9nKFwibXkgYSA6OnJlZjo6M1wiLCBlbCl9PlxyXG4gICAgICAgICAgQnRuLXNwYW4tZW5kXHJcbiAgICAgICAgPC9zcGFuPlxyXG4gICAgICA8Lz5cclxuICAgIDwvYnV0dG9uPlxyXG4gICk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHJlZmxvZyhlbDogSFRNTEVsZW1lbnQpIHtcclxuICBjb25zb2xlLmxvZyhcIm15IGlubmVyIGRpdjo6cmVmOjo4XCIsIGVsKTtcclxufVxyXG5cclxuLypcclxuY29uc3QgbWFya3VwID0gKFxyXG4gIDw+XHJcbiAgICA8ZGl2XHJcbiAgICAgIGNsYXNzPVwiZm9vXCJcclxuICAgICAgcmVmPXsoZWw6IEhUTUxFbGVtZW50KSA9PiBjb25zb2xlLmxvZyhcIm15IGRpdiA6OnJlZjo6NFwiLCBlbCl9XHJcbiAgICAvPlxyXG4gICAgPGlucHV0IGRpc2FibGVkPXt0cnVlfSBoaWRkZW49e2ZhbHNlfSAvPlxyXG4gICAgPEJ1dHRvblxyXG4gICAgICBkaXNhYmxlZD17dHJ1ZX1cclxuICAgICAgcmVmPXsoZWw6IEhUTUxFbGVtZW50KSA9PiBjb25zb2xlLmxvZyhcIm15IEJVVFRPTjo6cmVmOjo1XCIsIGVsKX1cclxuICAgID5cclxuICAgICAgdGV4dFxyXG4gICAgICA8cG9wdXAtaW5mb1xyXG4gICAgICAgIHJlZj17KGVsOiBIVE1MRWxlbWVudCkgPT4gY29uc29sZS5sb2coXCJzcGFuIGluIEJVVFRPTjo6cmVmOjo2XCIsIGVsKX1cclxuICAgICAgPlxyXG4gICAgICAgIGJsYVxyXG4gICAgICA8L3BvcHVwLWluZm8+XHJcbiAgICA8L0J1dHRvbj5cclxuICAgIDxSVEVcclxuICAgICAgdHh0PVwibGUgdGV4dFwiXHJcbiAgICAgIHJlZj17KGVsOiBIVE1MRWxlbWVudCkgPT4gY29uc29sZS5sb2coXCJteSBkaXYgOjpyZWY6OjMuMVwiLCBlbCl9XHJcbiAgICAgIG9uLWNsaWNrPXsoZTogSFRNTEVsZW1lbnQpID0+IGNvbnNvbGUubG9nKGUpfVxyXG4gICAgLz5cclxuICAgIHt4c3N9XHJcbiAgICB7cmF3SHRtbChgPG9sPjxsaT5yYXcgaHRtbDwvbGk+PC9vbD5gKX1cclxuICAgIDxkaXZcclxuICAgICAgY2xhc3M9XCJiYW1cIlxyXG4gICAgICByZWY9eyhlbDogSFRNTEVsZW1lbnQpID0+IGNvbnNvbGUubG9nKFwibXkgZGl2OjpyZWY6OjdcIiwgZWwpfVxyXG4gICAgPlxyXG4gICAgICA8ZGl2PlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJiYXJcIiBvbi1jbGljaz17KGUpID0+IGNvbnNvbGUubG9nKGUpfSByZWY9e3JlZmxvZ30+XHJcbiAgICAgICAgICBjbGljayBNRVxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDxkaXYgc3R5bGU9e3sgb3V0bGluZTogXCIxcHggc29saWQgcmVkO1wiIH19PlxyXG4gICAgICAgICAge2RvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjb2xkXCIpfVxyXG4gICAgICAgICAge251bGx9XHJcbiAgICAgICAgICB7WzAsIDFdLm1hcCgobikgPT4gKFxyXG4gICAgICAgICAgICA8c3Bhbj57bn08L3NwYW4+XHJcbiAgICAgICAgICApKX1cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgPC9kaXY+XHJcbiAgICA8L2Rpdj5cclxuICA8Lz5cclxuKTtcclxuXHJcbiovXHJcblxyXG4vKlxyXG5jb25zdCBtYXJrdXAgPSAoXHJcbiAgPEJ1dHRvbiBkaXNhYmxlZD17dHJ1ZX0+XHJcbiAgICAgIDxib2xkIHJlZj17cmVmbG9nfT4tLUlOTkVSLS08L2JvbGQ+XHJcbiAgPC9CdXR0b24+XHJcbik7Ki9cclxuLypcclxuXHJcbmNvbnN0IG1hcmt1cCA9IChcclxuICA8ZGl2IGNsYXNzPVwiZm9vXCIgcmVmPXsoZWw6IEhUTUxFbGVtZW50KSA9PiBjb25zb2xlLmxvZyhcIm15IGRpdjo6cmVmOjpcIiwgZWwpfT5cclxuICAgIDxkaXY+XHJcbiAgICAgIDxkaXYgY2xhc3M9XCJiYXJcIiByZWY9eyhlbDogSFRNTEVsZW1lbnQpID0+IGNvbnNvbGUubG9nKFwibXkgaW5uZXIgZGl2OjpyZWY6OlwiLCBlbCl9IC8+XHJcbiAgICA8L2Rpdj5cclxuICAgIDxCdXR0b24gZGlzYWJsZWQ9e3RydWV9PjwvQnV0dG9uPlxyXG4gIDwvZGl2PlxyXG4pO1xyXG4qL1xyXG4vKlxyXG5jb25zdCBtYXJrdXAgPSAoXHJcbiAgPGE+XHJcbiAgICA8Yj5cclxuICAgICAgPGMgY2xhc3M9XCJiYXJcIiByZWY9e3JlZmxvZ30gLz5cclxuICAgIDwvYj5cclxuICA8L2E+XHJcbik7XHJcbiovXHJcblxyXG5mdW5jdGlvbiBTcGFuKHsgbW9kZSB9OiB7IG1vZGU6IGFueSB9KSB7XHJcbiAgcmV0dXJuIG1vZGUgPT09IDEgPyAoXHJcbiAgICA8ZGl2PlxyXG4gICAgICA8c3BhbiBpZD1cImlubmVyXCIgb2xkPXt0cnVlfT5cclxuICAgICAgICBTcGFuLUNvbXAtLW9sZFxyXG4gICAgICA8L3NwYW4+XHJcbiAgICAgIDxoMz50byBiZSByZW1vdmVkPC9oMz5cclxuICAgIDwvZGl2PlxyXG4gICkgOiAoXHJcbiAgICA8ZGl2PlxyXG4gICAgICA8cCBpZD1cImlubmVyXCIgbmV3PXt0cnVlfT5cclxuICAgICAgICBTcGFuLUNvbXAtLW5ld3NcclxuICAgICAgPC9wPlxyXG4gICAgPC9kaXY+XHJcbiAgKTtcclxufVxyXG5cclxuZnVuY3Rpb24gQ29tcCh7IG51bSB9KSB7XHJcbiAgaWYgKG51bSA9PT0gMSkgcmV0dXJuIG51bGw7XHJcbiAgcmV0dXJuIChcclxuICAgIDxkaXY+XHJcbiAgICAgIDxwPmNvbXA8L3A+XHJcbiAgICA8L2Rpdj5cclxuICApO1xyXG59XHJcblxyXG5jb25zdCBtYXJrdXAxID0gKG51bTogYW55KSA9PiAoXHJcbiAgPGRpdiBpZD1cIm91dGVyXCIgZGF0YS1mb289XCJiYXJcIiBkYXRhLXZhcj17bnVtfT5cclxuICAgIDxoMz5zaG91bGQgZ2V0IDIgLTogMzwvaDM+XHJcbiAgICB7bnVtID09PSAxID8gKFxyXG4gICAgICA8dWwgY2xhc3M9XCJ1bC1jbGFzc1wiPlxyXG4gICAgICAgIDxsaT5UZXh0IDEgPC9saT5cclxuICAgICAgICA8bGk+VGV4dCAyIDwvbGk+XHJcbiAgICAgIDwvdWw+XHJcbiAgICApIDogKFxyXG4gICAgICA8dWwgY2xhc3M9XCJ1bC1jbGFzc1wiPlxyXG4gICAgICAgIDxsaT5UZXh0IDMgPC9saT5cclxuICAgICAgICA8bGk+VGV4dCAyIDwvbGk+XHJcbiAgICAgICAgPGxpPlRleHQgMSA8L2xpPlxyXG4gICAgICA8L3VsPlxyXG4gICAgKX1cclxuICAgIDxoMz5zaG91bGQgZ2V0IDMgLTogMjwvaDM+XHJcbiAgICB7bnVtID09PSAxID8gKFxyXG4gICAgICA8dWwgY2xhc3M9XCJ1bC1jbGFzc1wiPlxyXG4gICAgICAgIDxsaT5UZXh0IDEgPC9saT5cclxuICAgICAgICA8bGk+VGV4dCAyIDwvbGk+XHJcbiAgICAgICAgPGxpPlRleHQgMyA8L2xpPlxyXG4gICAgICA8L3VsPlxyXG4gICAgKSA6IChcclxuICAgICAgPHVsIGNsYXNzPVwidWwtY2xhc3NcIj5cclxuICAgICAgICA8bGk+VGV4dCAxIDwvbGk+XHJcbiAgICAgICAgPGxpPlRleHQgMiA8L2xpPlxyXG4gICAgICA8L3VsPlxyXG4gICAgKX1cclxuICAgIHtudW0gPT09IDEgPyBudWxsIDogPHA+bmV3IHJlbmRlcjwvcD59XHJcbiAgICA8ZGl2PlxyXG4gICAgICA8c3Bhbj5zcGFuLWNvbnRlbnQ8L3NwYW4+XHJcbiAgICA8L2Rpdj5cclxuICAgIDxTcGFuIG1vZGU9e251bX0gLz5cclxuICAgIHsvKmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjb2xkXCIpKi99XHJcbiAgICA8PkZyYWdtZW50LWl0ZW08Lz5cclxuICAgIDxzdmdcclxuICAgICAgdmlld0JveD1cIjAgMCAzMDAgMTAwXCJcclxuICAgICAgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiXHJcbiAgICAgIHN0cm9rZT1cInJlZFwiXHJcbiAgICAgIGZpbGw9XCJncmV5XCJcclxuICAgID5cclxuICAgICAgPGNpcmNsZSBjeD1cIjUwXCIgY3k9XCI1MFwiIHI9XCI0MFwiIC8+XHJcbiAgICAgIDxjaXJjbGUgY3g9XCIxNTBcIiBjeT1cIjUwXCIgcj1cIjRcIiAvPlxyXG5cclxuICAgICAgPHN2ZyB2aWV3Qm94PVwiMCAwIDEwIDEwXCIgeD1cIjIwMFwiIHdpZHRoPVwiMTAwXCI+XHJcbiAgICAgICAgPGNpcmNsZSBjeD1cIjVcIiBjeT1cIjVcIiByPVwiNFwiIC8+XHJcbiAgICAgIDwvc3ZnPlxyXG4gICAgPC9zdmc+XHJcbiAgPC9kaXY+XHJcbik7XHJcblxyXG5mdW5jdGlvbiBtYXJrdXAyKG51bTogYW55KSB7XHJcbiAgcmV0dXJuIChcclxuICAgIDxkaXYgaWQ9XCJvdXRlclwiPlxyXG4gICAgICA8PlxyXG4gICAgICAgIDw+XHJcbiAgICAgICAgICA8cD5uZXN0ZWQgZnJhZ21lbnQ8L3A+XHJcbiAgICAgICAgPC8+XHJcbiAgICAgIDwvPlxyXG4gICAgICA8aDE+c3RhdGljPC9oMT5cclxuICAgICAgPGgxPmR5bmFtaWMgdmFsOiB7bnVtfTwvaDE+XHJcbiAgICAgIHtudW0gPT09IDEgPyA8aDE+b2xkPC9oMT4gOiBmYWxzZX1cclxuICAgICAge251bSA9PT0gMSA/IChcclxuICAgICAgICA8PlxyXG4gICAgICAgICAgPGgxPmZyYWcgb2xkPC9oMT5cclxuICAgICAgICAgIDxzcGFuPmZyYWcgc3BhbiBvbGQ8L3NwYW4+XHJcbiAgICAgICAgPC8+XHJcbiAgICAgICkgOiAoXHJcbiAgICAgICAgPGgxPmZyYWcgbmV3PC9oMT5cclxuICAgICAgKX1cclxuICAgICAgPENvbXAgbnVtPXtudW19IC8+XHJcbiAgICA8L2Rpdj5cclxuICApO1xyXG59XHJcbmZ1bmN0aW9uIE5MKCkge1xyXG4gIHJldHVybiBudWxsO1xyXG59XHJcblxyXG5mdW5jdGlvbiBtYXJrdXAzKG51bTogYW55KSB7XHJcbiAgcmV0dXJuIG51bSA9PT0gMSA/IChcclxuICAgIDxoMT5cclxuICAgICAgQS1MaW5lIDEgLSB7bnVtfVxyXG4gICAgICA8U3BhbiBtb2RlPXtudW19IC8+XHJcbiAgICAgIDxCdXR0b25cclxuICAgICAgICBkaXNhYmxlZD17dHJ1ZX1cclxuICAgICAgICByZWY9eyhlbDogSFRNTEVsZW1lbnQpID0+IGNvbnNvbGUubG9nKFwibXkgQlVUVE9OOjpyZWY6OjVcIiwgZWwpfVxyXG4gICAgICA+XHJcbiAgICAgICAgdGV4dFxyXG4gICAgICAgIDxwb3B1cC1pbmZvXHJcbiAgICAgICAgICByZWY9eyhlbDogSFRNTEVsZW1lbnQpID0+IGNvbnNvbGUubG9nKFwic3BhbiBpbiBCVVRUT046OnJlZjo6NlwiLCBlbCl9XHJcbiAgICAgICAgPlxyXG4gICAgICAgICAgYmxhXHJcbiAgICAgICAgPC9wb3B1cC1pbmZvPlxyXG4gICAgICAgIDxwPmlubmVyIHAge251bX08L3A+XHJcbiAgICAgIDwvQnV0dG9uPlxyXG4gICAgICBBLUxpbmUgM1xyXG4gICAgICA8PlxyXG4gICAgICAgIDxwPlxyXG4gICAgICAgICAgPHA+QSBGcmFnIGxpbmUgMSo8L3A+XHJcbiAgICAgICAgPC9wPlxyXG4gICAgICAgIDxwPkEgRnJhZyBsaW5lIDI8L3A+XHJcbiAgICAgICAgPHA+QSBGcmFnIGxpbmUgMzwvcD5cclxuICAgICAgICA8cD5BIEZyYWcgbGluZSA0PC9wPlxyXG4gICAgICAgIDxzdmdcclxuICAgICAgICAgIHZpZXdCb3g9XCIwIDAgMzAwIDEwMFwiXHJcbiAgICAgICAgICB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCJcclxuICAgICAgICAgIHN0cm9rZT1cInJlZFwiXHJcbiAgICAgICAgICBmaWxsPVwiZ3JleVwiXHJcbiAgICAgICAgPlxyXG4gICAgICAgICAgPGNpcmNsZSBjeD1cIjUwXCIgY3k9XCI1MFwiIHI9XCI0MFwiIC8+XHJcbiAgICAgICAgICA8Y2lyY2xlIGN4PVwiMTUwXCIgY3k9XCI1MFwiIHI9XCI0XCIgLz5cclxuXHJcbiAgICAgICAgICA8c3ZnIHZpZXdCb3g9XCIwIDAgMTAgMTBcIiB4PVwiMjAwXCIgd2lkdGg9XCIxMDBcIj5cclxuICAgICAgICAgICAgPGNpcmNsZSBjeD1cIjVcIiBjeT1cIjVcIiByPVwiNFwiIC8+XHJcbiAgICAgICAgICA8L3N2Zz5cclxuICAgICAgICA8L3N2Zz5cclxuICAgICAgPC8+XHJcbiAgICAgIHtudWxsfVxyXG4gICAgPC9oMT5cclxuICApIDogKFxyXG4gICAgPGgxIGNsYXNzPVwiYVwiIHJlZj17Y29uc29sZS5pbmZvfT5cclxuICAgICAgQiBMaW5lIDEgLSB7bnVtfVxyXG4gICAgICA8U3BhbiBtb2RlPXtudW19IC8+XHJcbiAgICAgIDxCdXR0b25cclxuICAgICAgICBkaXNhYmxlZD17dHJ1ZX1cclxuICAgICAgICByZWY9eyhlbDogSFRNTEVsZW1lbnQpID0+IGNvbnNvbGUubG9nKFwibXkgQlVUVE9OOjpyZWY6OjVcIiwgZWwpfVxyXG4gICAgICA+XHJcbiAgICAgICAgdGV4dFxyXG4gICAgICAgIDxwb3B1cC1pbmZvXHJcbiAgICAgICAgICByZWY9eyhlbDogSFRNTEVsZW1lbnQpID0+IGNvbnNvbGUubG9nKFwic3BhbiBpbiBCVVRUT046OnJlZjo6NlwiLCBlbCl9XHJcbiAgICAgICAgPlxyXG4gICAgICAgICAgYmxhXHJcbiAgICAgICAgPC9wb3B1cC1pbmZvPlxyXG4gICAgICAgIDxwPntudW19PC9wPlxyXG4gICAgICA8L0J1dHRvbj5cclxuICAgICAgPD5cclxuICAgICAgICB7ZmFsc2V9XHJcbiAgICAgICAge251bGx9XHJcbiAgICAgICAge3VuZGVmaW5lZH1cclxuICAgICAgPC8+XHJcbiAgICAgIDw+XHJcbiAgICAgICAgPHA+QiBGcmFnIGxpbmUgMTwvcD5cclxuICAgICAgICA8cD5CIEZyYWcgbGluZSAyPC9wPlxyXG4gICAgICAgIHt1bmRlZmluZWR9XHJcbiAgICAgICAgPHA+QiBGcmFnIGxpbmUgMyg0KTwvcD5cclxuICAgICAgICA8c3ZnXHJcbiAgICAgICAgICB2aWV3Qm94PVwiMCAwIDMwMCAxMDBcIlxyXG4gICAgICAgICAgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiXHJcbiAgICAgICAgICBzdHJva2U9XCJyZWRcIlxyXG4gICAgICAgICAgZmlsbD1cImdyZXlcIlxyXG4gICAgICAgID5cclxuICAgICAgICAgIDxjaXJjbGUgY3g9XCI1MFwiIGN5PVwiNTBcIiByPVwiNDBcIiAvPlxyXG4gICAgICAgICAgPGNpcmNsZSBjeD1cIjE1MFwiIGN5PVwiNTBcIiByPVwiNFwiIC8+XHJcblxyXG4gICAgICAgICAgPHN2ZyB2aWV3Qm94PVwiMCAwIDEwIDEwXCIgeD1cIjIwMFwiIHdpZHRoPVwiMTAwXCI+XHJcbiAgICAgICAgICAgIDxjaXJjbGUgY3g9XCI1XCIgY3k9XCI1XCIgcj1cIjZcIiAvPlxyXG4gICAgICAgICAgPC9zdmc+XHJcbiAgICAgICAgPC9zdmc+XHJcbiAgICAgICAgPHA+QiBGcmFnIGxpbmUgNCg2KTwvcD5cclxuICAgICAgPC8+XHJcbiAgICA8L2gxPlxyXG4gICk7XHJcbn1cclxuY29uc3Qgb2JqID0geyBhOiAxIH07XHJcblxyXG5mdW5jdGlvbiBtYXJrdXA0KG51bTogYW55KSB7XHJcbiAgb2JqLmEgPSBudW07XHJcbiAgcmV0dXJuIG51bSA9PT0gMSA/IChcclxuICAgIDxoMSBvYmo9e29ian0gaWQ9e29iai5hfT5cclxuICAgICAgb2xkLUhlYWRsaW5lIHtudW19XHJcbiAgICA8L2gxPlxyXG4gICkgOiAoXHJcbiAgICA8aDEgb2JqPXtvYmp9IGNsYXNzPVwiYVwiIGlkPXtvYmouYX0+XHJcbiAgICAgIG5ldy1IZWFkbGluZSB7bnVtfVxyXG4gICAgPC9oMT5cclxuICApO1xyXG59XHJcblxyXG5mdW5jdGlvbiBtYXJrdXAobnVtOiBhbnkpIHtcclxuICByZXR1cm4gbnVtID09PSAxID8gKFxyXG4gICAgPGRpdj5cclxuICAgICAgPD5cclxuICAgICAgICA8cD5mcmFnIC0gSTwvcD5cclxuICAgICAgICA8Yj4gZnJhZyAtIElJPC9iPlxyXG4gICAgICA8Lz5cclxuICAgIDwvZGl2PlxyXG4gICkgOiAoXHJcbiAgICA8aDEgY2xhc3M9XCJhXCI+XHJcbiAgICAgIHtcIm5ldy1IZWFkbGluZVwifSB7bnVtfVxyXG4gICAgPC9oMT5cclxuICApO1xyXG59XHJcblxyXG5mdW5jdGlvbiBtYXJrdXA1KG51bTogYW55KSB7XHJcbiAgcmV0dXJuIG51bSA9PT0gMSA/IChcclxuICAgIDxkaXY+XHJcbiAgICAgIHtyYXdIdG1sKGA8ZGl2IGNsYXNzPVwia1wiPnR4dDwvZGl2PjxpbnB1dCB0eXBlPXJhZGlvXCIgLz5gKX1cclxuICAgICAgPENvbXAzIC8+XHJcbiAgICAgIHtlbH1cclxuICAgIDwvZGl2PlxyXG4gICkgOiAoXHJcbiAgICA8ZGl2PlxyXG4gICAgICB7cmF3SHRtbChgPGRpdiBjbGFzcz1cImtcIj50eHQ8L2Rpdj48aW5wdXQgdHlwZT1yYWRpb1wiIC8+YCl9XHJcbiAgICAgIHtudWxsfVxyXG4gICAgICB7ZWx9XHJcbiAgICA8L2Rpdj5cclxuICApO1xyXG59XHJcblxyXG5mdW5jdGlvbiBtYXJrdXA2KGEpIHtcclxuICByZXR1cm4gKFxyXG4gICAgPGRpdj5cclxuICAgICAgPHN2ZyBpZD1cImZvbzZcIiB2aWV3Qm94PVwiMCAwIDEwIDEwXCIgeD1cIjIwMFwiIHdpZHRoPVwiMTAwXCI+XHJcbiAgICAgICAgPD5cclxuICAgICAgICAgIHthICYmIDxjaXJjbGUgY3g9XCI1XCIgY3k9XCI1XCIgcj1cIjZcIiAvPn1cclxuICAgICAgICA8Lz5cclxuICAgICAgPC9zdmc+XHJcbiAgICAgIDxidXR0b24+c3VibWl0PC9idXR0b24+XHJcbiAgICA8L2Rpdj5cclxuICApO1xyXG59XHJcblxyXG4vL2NvbnNvbGUubG9nKG1hcmt1cCk7XHJcbi8vd2luZG93Lm1hcmt1cCA9IG1hcmt1cDtcclxuXHJcbmNsYXNzIFBvcFVwSW5mbyBleHRlbmRzIEhUTUxFbGVtZW50IHtcclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIC8vIEFsd2F5cyBjYWxsIHN1cGVyIGZpcnN0IGluIGNvbnN0cnVjdG9yXHJcbiAgICBzdXBlcigpO1xyXG5cclxuICAgIC8vIHdyaXRlIGVsZW1lbnQgZnVuY3Rpb25hbGl0eSBpbiBoZXJlXHJcblxyXG4gICAgY29uc29sZS5sb2coXCIjIyMjIyMjIyMjIyMjIyMjI2N0b3IgQ0VcIik7XHJcbiAgfVxyXG5cclxuICBjb25uZWN0ZWRDYWxsYmFjaygpIHtcclxuICAgIGNvbnNvbGUubG9nKFwiIyMjIyMjIyMjIyMjIyMjIyNDdXN0b20gc3F1YXJlIGVsZW1lbnQgYWRkZWQgdG8gcGFnZS5cIik7XHJcbiAgfVxyXG59XHJcblxyXG5jdXN0b21FbGVtZW50cy5kZWZpbmUoXCJwb3B1cC1pbmZvXCIsIFBvcFVwSW5mbyk7XHJcblxyXG4vL2RvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjb2xkXCIpIS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgY29uc29sZS5sb2cpO1xyXG5cclxuLy9kb2N1bWVudC5ib2R5LmlubmVySFRNTCA9IG1hcmt1cDtcclxuLy8vL3JlbmRlcihtYXJrdXAzKDEpLCBkb2N1bWVudC5ib2R5KTtcclxuLy9kb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm91dGVyXCIpPy5zZXRBdHRyaWJ1dGUoXCJkYXRhLWZvb1wiLCBcIm1vZFwiKTtcclxuXHJcbi8vZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJpbm5lclwiKT8uc2V0QXR0cmlidXRlKFwiZGF0YS1mb29cIiwgXCJtb2RcIik7XHJcbi8vcmVuZGVyKG1hcmt1cCgyKSwgZG9jdW1lbnQuYm9keSk7XHJcbi8vcmVuZGVyKG1hcmt1cCwgZG9jdW1lbnQuYm9keSwgdHJ1ZSk7XHJcbmNvbnN0IGVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNvbGRcIik7XHJcbmZ1bmN0aW9uIENvbXAyKCkge1xyXG4gIHJldHVybiAoXHJcbiAgICA8PlxyXG4gICAgICB7cmF3SHRtbChgPGRpdiBjbGFzcz1cImtcIj50eHQ8L2Rpdj48aW5wdXQgdHlwZT1yYWRpb1wiIC8+YCl9XHJcbiAgICAgIDxDb21wMyAvPlxyXG4gICAgICB7ZWx9XHJcbiAgICA8Lz5cclxuICApO1xyXG59XHJcbmZ1bmN0aW9uIENvbXAzKCkge1xyXG4gIHJldHVybiA8ZGl2PmNvbXAgY29udGVudDwvZGl2PjtcclxufVxyXG5cclxuY29uc3QgJGNvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY29udGFpbmVyXCIpO1xyXG5cclxud2luZG93LnJlUmVuZGVyMSA9ICgpID0+IHJlbmRlcihtYXJrdXAzKDEpLCAkY29udGFpbmVyKTtcclxud2luZG93LnJlUmVuZGVyMiA9ICgpID0+IHJlbmRlcihtYXJrdXAzKDIpLCAkY29udGFpbmVyKTtcclxud2luZG93LnJlUmVuZGVyMyA9ICgpID0+XHJcbiAgcmVuZGVyKFxyXG4gICAgLy8gPGRpdj50eHQ8L2Rpdj5cclxuICAgIDxDb21wMiAvPixcclxuICAgICRjb250YWluZXJcclxuICApO1xyXG5cclxuY29uc29sZS5sb2coXCIxMjM0NVwiKTtcclxud2luZG93LnNzID0gKCkgPT4gbWFya3VwMygxKSArIFwiXCI7XHJcbndpbmRvdy5zczIgPSAoKSA9PiB7XHJcbiAgY29uc29sZS5sb2cobWFya3VwMygxKSk7XHJcblxyXG4gIC8vZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjb250YWluZXJcIikuaW5uZXJIVE1MID0gbWFya3VwMygxKTtcclxufTtcclxuXHJcbndpbmRvdy5yZVJlbmRlcjVhID0gKCkgPT4gcmVuZGVyKG1hcmt1cDUoMSksICRjb250YWluZXIpO1xyXG53aW5kb3cucmVSZW5kZXI1YiA9ICgpID0+IHJlbmRlcihtYXJrdXA1KDIpLCAkY29udGFpbmVyKTtcclxuXHJcbmZ1bmN0aW9uIG1hcmt1cDcobW9kKSB7XHJcbiAgaWYgKG1vZCA9PT0gMSkge1xyXG4gICAgcmV0dXJuIChcclxuICAgICAgPGRpdj5cclxuICAgICAgICA8QnV0dG9uPlxyXG4gICAgICAgICAgPHNwYW4+dGV4dDwvc3Bhbj5cclxuICAgICAgICAgIDxzcGFuPiwgbW9yZSB0ZXh0PC9zcGFuPlxyXG4gICAgICAgIDwvQnV0dG9uPlxyXG4gICAgICA8L2Rpdj5cclxuICAgICk7XHJcbiAgfSBlbHNlIGlmIChtb2QgPT09IDIpIHtcclxuICAgIHJldHVybiA8ZGl2PnNvbWUgY29udGVudDwvZGl2PjtcclxuICB9IGVsc2Uge1xyXG4gICAgcmV0dXJuIDxkaXY+e2ZhbHNlfTwvZGl2PjtcclxuICB9XHJcbn1cclxuXHJcbndpbmRvdy5yZVJlbmRlclJlZiA9ICgpID0+XHJcbiAgcmVuZGVyKFxyXG4gICAgPGgyIGNsYXNzPVwiYVwiIHJlZj17Y29uc29sZS53YXJufT5cclxuICAgICAgSGVhZGluZyB3aXRoIHJlZlxyXG4gICAgPC9oMj4sXHJcbiAgICAkY29udGFpbmVyXHJcbiAgKTtcclxud2luZG93LnJlUmVuZGVyNmEgPSAoKSA9PiByZW5kZXIobWFya3VwNih0cnVlKSwgJGNvbnRhaW5lcik7XHJcbndpbmRvdy5yZVJlbmRlcjZiID0gKCkgPT5cclxuICByZW5kZXIoPGNpcmNsZSBjeD1cIjVcIiBjeT1cIjVcIiByPVwiNlwiIC8+LCBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImZvbzZcIikpO1xyXG53aW5kb3cucmVSZW5kZXJTdmcgPSAoKSA9PiByZW5kZXIobWFya3VwMSgpLCAkY29udGFpbmVyKTtcclxud2luZG93LnJlUmVuZGVyU3ZnMiA9ICgpID0+IHJlbmRlcihtYXJrdXAxKCksICRjb250YWluZXIpO1xyXG53aW5kb3cucmVSZW5kZXI3XzEgPSAoKSA9PiByZW5kZXIobWFya3VwNygxKSwgJGNvbnRhaW5lcik7XHJcbndpbmRvdy5yZVJlbmRlcjdfMiA9ICgpID0+IHJlbmRlcihtYXJrdXA3KDIpLCAkY29udGFpbmVyKTtcclxud2luZG93LnJlUmVuZGVyN18zID0gKCkgPT4gcmVuZGVyKG1hcmt1cDcoMyksICRjb250YWluZXIpO1xyXG5cclxuXHJcbmZ1bmN0aW9uIEZ1bmMxKHtjaGlsZHJlbn0pIHtcclxuICBjb25zb2xlLmxvZyhcIkZ1bmMtMVwiKTtcclxuICByZXR1cm4gPGRpdj57Y2hpbGRyZW59PC9kaXY+XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHRpbWVyKHQ6IG51bWJlcik6IFByb21pc2U8Vk5vZGVJbnRlcmZhY2U+IHtcclxuICByZXR1cm4gbmV3IFByb21pc2UocmVzID0+IHtcclxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICByZXMoPHA+bmV3IHRleHQ8L3A+KVxyXG4gICAgfSwgdCk7XHJcbiAgfSlcclxufVxyXG5cclxuY29uc3QgcCA9IHRpbWVyKDUwMDApXHJcblxyXG5mdW5jdGlvbiBGdW5jMigpIHtcclxuICByZXR1cm4gPERlZmVycmVkIHBsYWNlaG9sZGVyPXs8aDI+d2FpdGluZy4uLjwvaDI+fSBjb250ZW50UHJvbWlzZT17cH0gLz5cclxufVxyXG5cclxucmVuZGVyKCg8ZGl2PlxyXG4gIDxGdW5jMT5cclxuICAgIDxGdW5jMiAvPlxyXG4gIDwvRnVuYzE+XHJcbjwvZGl2PiksICRjb250YWluZXIpXHJcblxyXG5cclxud2luZG93LnJlUmVuZGVyX3N1cyA9ICgpID0+IHJlbmRlcigoPGRpdj5cclxuICA8RnVuYzE+XHJcbiAgICA8RnVuYzIgLz5cclxuICA8L0Z1bmMxPlxyXG48L2Rpdj4pLCAkY29udGFpbmVyKTsiXSwic291cmNlUm9vdCI6IiJ9