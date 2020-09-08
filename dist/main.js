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
/*{
      //[key: string]: any;
      type: "Element" | "Fragment" | "TextNode" | "Null";
      asNode(): Node;
      toString(): string;
      node: Node | null;
      parent: VNode | null;
      children: Array<VNode>;
      tag: string | Function; // ?
      //getParentElementNode(): VNode; // ancestor which has a Element node (i.e. no Fragment)
      //getChildElementNodes(): VNode[]; // children and if a child is a fragment its children
    }*/


// null when checking the parent when root is fragment itself
function getParentElementNode(vNode) {
  while (vNode.parent) {
    vNode = vNode.parent;
    if (vNode.node) return vNode;
  } // will never reach


  throw new Error("jsx-runtime: can't find a parent with Element");
}

function getChildElementNodes(vNode, alwaysAllow = []) {
  return vNode.children.map(childNode => {
    if (alwaysAllow.includes(childNode)) return childNode;
    if (childNode.type === "Null") return null;
    if (childNode.type === "Element" || childNode.type === "TextNode") return childNode;
    if (childNode.type === "Fragment") return getChildElementNodes(childNode); // @TODO: other types (i.e. Live Element)

    return null;
  }).flat(Infinity).filter(Boolean);
}

function getSiblings(vNode) {
  return getChildElementNodes(getParentElementNode(vNode), [vNode]);
}

function getParentAndNextSibling(vNode) {
  // node ancestor with Element,
  const parentWithElement = getParentElementNode(vNode);
  const siblings = getChildElementNodes(parentWithElement, [vNode]);
  const prevSibling = siblings[siblings.indexOf(vNode) - 1];
  const nextSiblingNode = prevSibling ? prevSibling.node.nextSibling : null; //const nextSiblingNode = nextSibling ? nextSibling.node : null;

  console.log("getParentAndNextSibling:", {
    vNode,
    parentWithElement,
    siblings,
    nextSiblingNode,
    index: siblings.indexOf(vNode)
  });
  return [parentWithElement.node, nextSiblingNode]; // all flat child nodes +
}

function findPrevSibling(vNode) {
  const siblings = getSiblings(vNode);
  let siblingBefore = siblings[siblings.indexOf(vNode) - 1] || null;
  return siblingBefore;
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


function asNode(tag, props, children) {
  console.log("asNode()", {
    tag,
    props,
    children
  }); // fragment

  if (!tag) {
    const fragments = children.flat().filter(n => n.tag !== "__NULL__") //.filter(truthy)
    .map(item => item.asNode()
    /*item instanceof Node
        ? item
        : item instanceof JsxNode
        ? item.asNode()
        : item*/
    );
    const documentFragment = document.createDocumentFragment();
    documentFragment.append(...fragments);
    return [documentFragment, []];
  } // shouldn't


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
} // @TODO: remove method on VNode


function removeItem(item) {
  //if (item === null) return;
  if (item.type === "Element" || item.type === "TextNode") item.node.parentElement.removeChild(item.node);else if (item.type === "Fragment") getChildElementNodes(item).forEach(node => node.node.parentElement.removeChild(node.node)); // @TODO: else -> VNode method actually
}

function insertNewItem(newNode) {
  if (newNode.type !== "Null") {
    const [parent, nextSibling] = getParentAndNextSibling(newNode);
    parent.insertBefore(newNode.asNode(), nextSibling);
  }
}

function diffAndPatch(oldNode, newNode) {
  console.log("-------- diffAndPatch --------", {
    oldNode,
    newNode
  });

  if (oldNode.type !== newNode.type) {
    // technically it would been more effective ways to replace, e.g. replaceWith() method
    // but removing and adding would allow a more generic solution to provide independent implementation from different VNode classes
    removeItem(oldNode);
    insertNewItem(newNode);
  } // both null :-> do nothing
  else if (oldNode.type === "Null" && newNode.type === "Null") return; // both Text Nodes :-> update the text
    else if (oldNode.type === "TextNode" && newNode.type === "TextNode") {
        if (oldNode.node.nodeValue !== newNode.props.content) {
          oldNode.node.nodeValue = newNode.props.content;
        }

        newNode.node = oldNode.node;
      } // both HTMLElement with same tag
      else if (oldNode.type === "Element" && newNode.type === "Element") {
          if (newNode.tag === oldNode.tag) {
            newNode.node = oldNode.node; //      patch props,
            // update props form new node

            Object.entries(newNode.props).filter(([k, v]) => oldNode.props[k] !== v).forEach(([key, value]) => {
              if (value === true) newNode.node.setAttribute(key, "");else if (value === null || value === undefined || value === false) newNode.node.removeAttribute(key);else newNode.node.setAttribute(key, value);
            }); // remove old, obsolate attributes

            Object.entries(oldNode.props).filter(([k, v]) => !newNode.props.hasOwnProperty(k)).forEach(([key, value]) => {
              oldNode.node.removeAttribute(key);
            }); // children => iter and patch
            // old children being modified

            diffAndPatchChildren(oldNode, newNode);
          } // tag has changed
          else {
              oldNode.node.replaceWith(newNode.asNode());
            }
        } // Fragments
        else if (oldNode.type === "Fragment" && newNode.type === "Fragment") {
            // iterate, diff and patch
            diffAndPatchChildren(oldNode, newNode);
          } else if (oldNode.type === "Root") {
            // iterate, diff and patch
            diffAndPatchChildren(oldNode, newNode);
          }
}

function diffAndPatchChildren(oldNode, newNode) {
  oldNode.children.forEach((oldChild, ix) => {
    const newChild = newNode.children[ix];
    if (newChild) diffAndPatch(oldChild, newChild); // child was removed
    else {
        removeItem(oldChild);
      }
  });
  const documentFragment = document.createDocumentFragment(); // new addition items

  for (let i = oldNode.children.length; i < newNode.children.length; i++) {
    if (newNode.children[i].type !== "Null") documentFragment.append(newNode.children[i].asNode());
  }

  (newNode.node ? newNode.node : getParentElementNode(newNode).node).insertBefore(documentFragment, null);
}

function asVNode(tag, props) {
  if (typeof tag === "function") {
    let result = tag(props);

    if (result instanceof JsxNode) {
      return result.asVNode();
    } // big @TODO:


    if (result instanceof Node) {
      const node = {
        tag: "__NODE__",
        type: "?",
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
    /*function getFirstElement(nnn: VNode) {
      if (nnn.type === "Element") return nnn.node;
      if (nnn.type === "Null") return null;
      if (nnn.type === "Fragment") {
        const item = nnn.children.find((n2) => getFirstElement(n2) !== null);
        return item ? item.node : null;
      }
    }*/
    // null jsx node


    if (!truthy(result)) {
      const fooNode = {};
      Object.assign(fooNode, {
        tag: "__NULL__",
        type: "Null",
        tag2: "tag func returned null node",
        node: null,
        parent: null,
        props: {},
        children: [],

        asNode() {
          return null;
        },

        diffAndPatch(newNode) {
          return diffAndPatch(fooNode, newNode);
          if (newNode.type === "Null") return;
          const n = newNode.asNode(); // @TODO: find item before
          //vNode.node

          const siblings = getSiblings(newNode);
          const newNodeIndex = siblings.indexOf(newNode);
          let siblingBefore = siblings[newNodeIndex - 1] || null; // = siblings.find((n: VNode) => n.node);

          /*for (let ii = newNodeIndex - 1; ii >= 0; ii--) {
            const el = getFirstElement(siblings[ii]);
            if (el) {
              siblingBefore = el;
              break;
            }
          }*/

          if (siblingBefore) {
            if (n) siblingBefore.node.insertAdjacentElement("afterend", n);
          } else {
            getParentElementNode(newNode).node.insertAdjacentElement("afterbegin", n);
          }
        }

      });
      return fooNode;
    }

    const node = {
      tag: "__TEXT_NODE__",
      tpye: "TextNode",
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
        console.log("__TEXT_NODE__ 1 diffAndPatch", result, newNode.props.content);
        return diffAndPatch(node, newNode); // @TODO both text

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

  if (tag) {
    Object.assign(vNode, {
      tag,
      type: "Element",
      // where comes Fragemnt?
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

        console.log("@@ map", {
          child
        });

        if (child === null || child === false || child === undefined) {
          const childVNode = {
            tag: "__NULL__",
            type: "Null",
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
          type: "TextNode",
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
        console.log({
          node
        });
        return node;
      },

      // to level
      diffAndPatch(newVNode) {
        console.log("diffAndPatch");
        return diffAndPatch(vNode, newVNode); // ? when?

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
  } else {
    Object.assign(vNode, {
      tag,
      type: "Fragment",
      // where comes Fragemnt?
      tag2: "asVNode - normal return Fragment",
      node: null,
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

        console.log("@@ map", {
          child
        });

        if (child === null || child === false || child === undefined) {
          const childVNode = {
            tag: "__NULL__",
            type: "Null",
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
          type: "TextNode",
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
        const node = asNode(undefined, {}, vNode.children)[0]; // vNode.node = node;

        console.log({
          node
        });
        return node;
      },

      // to level
      diffAndPatch(newVNode) {
        console.log("diffAndPatch");
        return diffAndPatch(vNode, newVNode);
      }

    });
  }

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
      throw new Error("deprecated jsxs");
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
      throw new Error("deprecated fragment");
      const fragments = this.props.children.flat().filter(truthy).map(item => item instanceof Node ? item : item instanceof JsxNode ? item.asNode() : item);
      const documentFragment = document.createDocumentFragment();
      documentFragment.append(...fragments);
      return documentFragment;
    }

    asVNode() {
      return asVNode(
      /*"__Fragment__"*/
      undefined, this.props);
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
  Array.from(document.body.querySelectorAll("*")).forEach(el => el.style.background = "#ccffcc");
  refsToCall.splice(0);
  const isReRender = renderedVTrees.has(domNode);
  if (!append && !isReRender) domNode.innerHTML = "";

  if (typeof markup === "string") {
    domNode.insertAdjacentHTML("beforeend", markup); // sanitize?
  } else if (markup instanceof Node) {
    domNode.insertAdjacentElement("beforeend", markup);
  } else if (markup instanceof JsxNode) {
    svgContext = false; // RootVNode

    const vTree = {};
    Object.assign(vTree, {
      type: "Root",
      node: domNode,
      tag: null,
      parent: null,
      children: [markup.asVNode()],

      asNode() {
        return vTree.children[0].asNode();
      },

      toString() {
        return vTree.children[0].toString();
      }

    });
    vTree.children[0].parent = vTree;
    console.log("###########\n", "vTree:", vTree);

    if (isReRender) {
      console.log("is re-render");
      const oldVTree = renderedVTrees.get(domNode);
      console.log("###########\n", {
        oldVTree,
        newVTree: vTree
      }); // diff
      //oldVTree.diffAndPatch(vTree);

      diffAndPatch(oldVTree, vTree);
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

function markup3(num) {
  return num === 1 ? Object(C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])("h1", {
    children: ["old-Headline ", num, "foo", Object(C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])(C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["Fragment"], {
      children: [Object(C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("p", {
        children: "old-span A"
      }), Object(C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("p", {
        children: "1"
      }), Object(C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("p", {
        children: "2"
      }), Object(C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("p", {
        children: "3"
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
    children: ["new-Headline ", num, false, Object(C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])(C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["Fragment"], {
      children: [Object(C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("p", {
        children: "new-span A"
      }), Object(C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("p", {
        children: "1"
      }), undefined, Object(C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("p", {
        children: "3"
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
        children: "new span B at end"
      })]
    })]
  });
}

var obj = {
  a: 1
};

function markup(num) {
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

Object(C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["render"])(markup(1), document.body); //document.getElementById("outer")?.setAttribute("data-foo", "mod");
//document.getElementById("inner")?.setAttribute("data-foo", "mod");
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vanN4L2pzeC1ydW50aW1lLnRzIiwid2VicGFjazovLy8uL21haW4udHN4Il0sIm5hbWVzIjpbInJlbmRlcmVkVlRyZWVzIiwiV2Vha01hcCIsInJlZnNUb0NhbGwiLCJKc3hOb2RlIiwiY29uc3RydWN0b3IiLCJwcm9wcyIsImdldFBhcmVudEVsZW1lbnROb2RlIiwidk5vZGUiLCJwYXJlbnQiLCJub2RlIiwiRXJyb3IiLCJnZXRDaGlsZEVsZW1lbnROb2RlcyIsImFsd2F5c0FsbG93IiwiY2hpbGRyZW4iLCJtYXAiLCJjaGlsZE5vZGUiLCJpbmNsdWRlcyIsInR5cGUiLCJmbGF0IiwiSW5maW5pdHkiLCJmaWx0ZXIiLCJCb29sZWFuIiwiZ2V0U2libGluZ3MiLCJnZXRQYXJlbnRBbmROZXh0U2libGluZyIsInBhcmVudFdpdGhFbGVtZW50Iiwic2libGluZ3MiLCJwcmV2U2libGluZyIsImluZGV4T2YiLCJuZXh0U2libGluZ05vZGUiLCJuZXh0U2libGluZyIsImNvbnNvbGUiLCJsb2ciLCJpbmRleCIsImZpbmRQcmV2U2libGluZyIsInNpYmxpbmdCZWZvcmUiLCJfY2FsbFJlZnMiLCJTeW1ib2wiLCJzdmdDb250ZXh0IiwidHJ1dGh5IiwidmFsdWUiLCJ1bmRlZmluZWQiLCJzYW5pdGl6ZSIsInRleHQiLCJkaXYiLCJkb2N1bWVudCIsImNyZWF0ZUVsZW1lbnQiLCJpbm5lclRleHQiLCJpbm5lckhUTUwiLCJnZXRPdXRlckh0bWwiLCJlbGVtZW50IiwiRWxlbWVudCIsIm91dGVySFRNTCIsIlRleHQiLCJ3aG9sZVRleHQiLCJEb2N1bWVudEZyYWdtZW50IiwiQXJyYXkiLCJmcm9tIiwiY2hpbGROb2RlcyIsImVsIiwiam9pbiIsIndhcm4iLCJhc0h0bWxTdHJpbmciLCJ0YWciLCJ0b1N0cmluZyIsImF0dHJzIiwiYXR0cmlidXRlcyIsIk9iamVjdCIsImVudHJpZXMiLCJrZXkiLCJ2IiwiayIsImlzQXJyYXkiLCJjb250ZW50IiwiY2hpbGQiLCJOb2RlIiwiYXNOb2RlIiwiZnJhZ21lbnRzIiwibiIsIml0ZW0iLCJkb2N1bWVudEZyYWdtZW50IiwiY3JlYXRlRG9jdW1lbnRGcmFnbWVudCIsImFwcGVuZCIsImVycm9yIiwicmVzdWx0IiwianN4Tm9kZXMiLCJmb3JFYWNoIiwic3RhcnRzV2l0aCIsImV2ZW50IiwicmVwbGFjZSIsImFkZEV2ZW50TGlzdGVuZXIiLCJzdmdDb250ZXh0U2V0IiwiY3JlYXRlRWxlbWVudE5TIiwiX2tleSIsInNldEF0dHJpYnV0ZSIsIlN0cmluZyIsImNoaWxkSnN4Tm9kZXMiLCJyZW1vdmVJdGVtIiwicGFyZW50RWxlbWVudCIsInJlbW92ZUNoaWxkIiwiaW5zZXJ0TmV3SXRlbSIsIm5ld05vZGUiLCJpbnNlcnRCZWZvcmUiLCJkaWZmQW5kUGF0Y2giLCJvbGROb2RlIiwibm9kZVZhbHVlIiwicmVtb3ZlQXR0cmlidXRlIiwiaGFzT3duUHJvcGVydHkiLCJkaWZmQW5kUGF0Y2hDaGlsZHJlbiIsInJlcGxhY2VXaXRoIiwib2xkQ2hpbGQiLCJpeCIsIm5ld0NoaWxkIiwiaSIsImxlbmd0aCIsImFzVk5vZGUiLCJmb29Ob2RlIiwiYXNzaWduIiwidGFnMiIsIm5ld05vZGVJbmRleCIsImluc2VydEFkamFjZW50RWxlbWVudCIsInRweWUiLCJ0YWcxIiwidGV4dE5vZGUiLCJjcmVhdGVUZXh0Tm9kZSIsImF0dHIiLCJjaGlsZFZOb2RlIiwic2xpY2UiLCJyZXZlcnNlIiwiZmluZCIsInBhcmVudE5vZGUiLCJuZXdWTm9kZSIsImpzeHMiLCJyZWYiLCJub2RlSXRlbSIsIkZyYWdtZW50IiwianN4IiwicmVuZGVyIiwibWFya3VwIiwiZG9tTm9kZSIsImJvZHkiLCJxdWVyeVNlbGVjdG9yQWxsIiwic3R5bGUiLCJiYWNrZ3JvdW5kIiwic3BsaWNlIiwiaXNSZVJlbmRlciIsImhhcyIsImluc2VydEFkamFjZW50SFRNTCIsInZUcmVlIiwib2xkVlRyZWUiLCJnZXQiLCJuZXdWVHJlZSIsInNldCIsImNiIiwicmF3SHRtbCIsInRlbXBsYXRlIiwieHNzIiwiUlRFIiwidHh0IiwiQnV0dG9uIiwiZGlzYWJsZWQiLCJyZWZsb2ciLCJTcGFuIiwibW9kZSIsIkNvbXAiLCJudW0iLCJtYXJrdXAxIiwibWFya3VwMiIsIm1hcmt1cDMiLCJvYmoiLCJhIiwiUG9wVXBJbmZvIiwiSFRNTEVsZW1lbnQiLCJjdXN0b21FbGVtZW50cyIsImRlZmluZSIsIndpbmRvdyIsInJlUmVuZGVyMSIsInJlUmVuZGVyMiJdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EseUNBQXlDLGlDQUFpQztRQUMxRSxnSEFBZ0gsbUJBQW1CLEVBQUU7UUFDckk7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBCLEVBQUU7UUFDdkQsaUNBQWlDLGVBQWU7UUFDaEQ7UUFDQTtRQUNBOztRQUVBO1FBQ0Esc0RBQXNELCtEQUErRDs7UUFFckg7UUFDQTs7O1FBR0E7UUFDQTs7Ozs7Ozs7Ozs7OztBQ2xGQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxNQUFNQSxjQUFjLEdBQUcsSUFBSUMsT0FBSixFQUF2QjtBQUNBLE1BQU1DLFVBQXNCLEdBQUcsRUFBL0I7QUFDQTs7OztBQUtBO0FBQ0E7O0FBNEJBO0FBQ0E7QUFDQSxNQUFNQyxPQUFOLENB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QTVJLFdBQU8sQ0FBQ0MsR0FBUixDQUFZLDBCQUFaO0FBTlk7QUFPYjs7Ozt3Q0FFbUI7QUFDbEJELGFBQU8sQ0FBQ0MsR0FBUixDQUFZLHVEQUFaO0FBQ0Q7Ozs7aUNBWnFCNEksVzs7QUFleEJDLGNBQWMsQ0FBQ0MsTUFBZixDQUFzQixZQUF0QixFQUFvQ0gsU0FBcEMsRSxDQUVBO0FBRUE7O0FBQ0FsQyxtRkFBTSxDQUFDQyxNQUFNLENBQUMsQ0FBRCxDQUFQLEVBQVk3RixRQUFRLENBQUMrRixJQUFyQixDQUFOLEMsQ0FDQTtBQUVBO0FBQ0E7QUFDQTs7QUFFQW1DLE1BQU0sQ0FBQ0MsU0FBUCxHQUFtQjtBQUFBLFNBQU12QyxtRkFBTSxDQUFDQyxNQUFNLENBQUMsQ0FBRCxDQUFQLEVBQVk3RixRQUFRLENBQUMrRixJQUFyQixDQUFaO0FBQUEsQ0FBbkI7O0FBQ0FtQyxNQUFNLENBQUNFLFNBQVAsR0FBbUI7QUFBQSxTQUFNeEMsbUZBQU0sQ0FBQ0MsTUFBTSxDQUFDLENBQUQsQ0FBUCxFQUFZN0YsUUFBUSxDQUFDK0YsSUFBckIsQ0FBWjtBQUFBLENBQW5CLEMiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAwKTtcbiIsImNvbnN0IHJlbmRlcmVkVlRyZWVzID0gbmV3IFdlYWtNYXA8SFRNTEVsZW1lbnQsIFJvb3RWTm9kZT4oKTtcclxuY29uc3QgcmVmc1RvQ2FsbDogRnVuY3Rpb25bXSA9IFtdO1xyXG4vKipcclxuICogcHJvdmlkZXMgZnVuY3Rpb25zIG5lZWRlZCBieSBiYWJlbCBmb3IgYSBjdXN0b20gcHJhZ21hXHJcbiAqIHRvIHJlbmRlciBwYXJzZWQganN4IGNvZGUgdG8gaHRtbFxyXG4gKi9cclxuXHJcbi8vIHByb3BzIHdoaWNoIHdpbGwgYmUgcmVuZGVyZWQgYXMgYXR0cmlidXRlc1xyXG4vLyBGdW5jdGlvbnMgd2lsbCBiZSB1c2VkIGZvciBldmVudCBsaXN0ZW5lcnMuICh3aXRoIGF0dHJpYnV0ZSBuYW1lIHN0YXJ0aW5nIHdpdGggJ29uLScpXHJcbnR5cGUgQXR0cmlidXRlcyA9IHsgW2tleTogc3RyaW5nXTogc3RyaW5nIHwgYm9vbGVhbiB8IG51bWJlciB8IEZ1bmN0aW9uIH07XHJcblxyXG4vLyBhZGRpdGlvbmFsIGF0dHJpYnV0ZXMgd2hpY2ggY2FuIGhhdmUgYWRkaXRpb25hbCBzZXJpYWxpemF0aW9uIGJlZm9yZSByZW5kZXJpbmcgYXMgYXR0cmlidXRlc1xyXG50eXBlIFNwZWNpYWxBdHRyaWJ1dGVzID0ge1xyXG4gIGNsYXNzPzogc3RyaW5nIHwgc3RyaW5nW107XHJcbiAgc3R5bGU/OiBzdHJpbmcgfCB7IFtrZXk6IHN0cmluZ106IHN0cmluZyB9O1xyXG4gIHJlZj86IEZ1bmN0aW9uO1xyXG59O1xyXG5cclxuLy8gY2hpbGQgZWxlbWVudHMgaW4gdGhlIGpzeCBtYXJrdXAgd2hpY2ggd2lsbCBiZSBwYXNzZWQgdG8gdGhlIGggZnVuY3Rpb24gYXMgYHByb3BzLmNoaWxkcmVuYFxyXG50eXBlIENoaWxkcmVuUHJvcHMgPSB7XHJcbiAgLy8gbmVzdGVkIGFycmF5IGluIGNhc2Ugb2ZcclxuICAvLyA8ZWxlbT5cclxuICAvLyAgIDxzcGFuLz5cclxuICAvLyAgIHtjaGlsZHJlbn1cclxuICAvLyAgIDxkaXYvPlxyXG4gIC8vIDwvZWxlbT5cclxuICBjaGlsZHJlbjogQXJyYXk8XHJcbiAgICBOb2RlIHwgSnN4Tm9kZUludGVyZmFjZSB8IHN0cmluZyB8IEFycmF5PE5vZGUgfCBKc3hOb2RlSW50ZXJmYWNlIHwgc3RyaW5nPlxyXG4gID47XHJcbn07XHJcblxyXG4vKipcclxuICogcHJvcHMgb2JqZWN0IHdoaWNoIHdpbGwgYmUgcGFzc2VkIHRvIGpzeCBwcmFnbWEgYW5kIGN1c3RvbSBjb21wb25lbnQgZnVuY3Rpb25zXHJcbiAqL1xyXG50eXBlIEpzeFByb3BzID0gQXR0cmlidXRlcyAmIFNwZWNpYWxBdHRyaWJ1dGVzICYgQ2hpbGRyZW5Qcm9wcztcclxuXHJcbi8vIGJhc2UgY2xhc3Mgd2hpY2ggd2lsbCBiZSBpbmhlcml0ZWQgZnJvbSBqc3ggYW5kIGZyYWdtZW50cyBmdW5jdGlvbiBub2RlIGdlbmVyYXRpb25cclxuLy8gYW5kIHdpbGwgYmUgdXNlZCB0byBkaXN0aW5ndWlzaCB0aGVtIHdpdGggb3RoZXIgRWxlbWVudHNcclxuY2xhc3MgSnN4Tm9kZSB7XHJcbiAgcHJvcHM6IEpzeFByb3BzO1xyXG4gIGNvbnN0cnVjdG9yKHByb3BzOiBKc3hQcm9wcykge1xyXG4gICAgdGhpcy5wcm9wcyA9IHByb3BzO1xyXG4gIH1cclxufVxyXG5cclxuLyp7XHJcbiAgICAgIC8vW2tleTogc3RyaW5nXTogYW55O1xyXG4gICAgICB0eXBlOiBcIkVsZW1lbnRcIiB8IFwiRnJhZ21lbnRcIiB8IFwiVGV4dE5vZGVcIiB8IFwiTnVsbFwiO1xyXG4gICAgICBhc05vZGUoKTogTm9kZTtcclxuICAgICAgdG9TdHJpbmcoKTogc3RyaW5nO1xyXG4gICAgICBub2RlOiBOb2RlIHwgbnVsbDtcclxuICAgICAgcGFyZW50OiBWTm9kZSB8IG51bGw7XHJcbiAgICAgIGNoaWxkcmVuOiBBcnJheTxWTm9kZT47XHJcbiAgICAgIHRhZzogc3RyaW5nIHwgRnVuY3Rpb247IC8vID9cclxuICAgICAgLy9nZXRQYXJlbnRFbGVtZW50Tm9kZSgpOiBWTm9kZTsgLy8gYW5jZXN0b3Igd2hpY2ggaGFzIGEgRWxlbWVudCBub2RlIChpLmUuIG5vIEZyYWdtZW50KVxyXG4gICAgICAvL2dldENoaWxkRWxlbWVudE5vZGVzKCk6IFZOb2RlW107IC8vIGNoaWxkcmVuIGFuZCBpZiBhIGNoaWxkIGlzIGEgZnJhZ21lbnQgaXRzIGNoaWxkcmVuXHJcbiAgICB9Ki9cclxuXHJcbnR5cGUgQ29tbW9uVk5vZGVQcm9wZXJ0aWVzID0ge1xyXG4gIHBhcmVudDogVk5vZGU7XHJcbiAgYXNOb2RlKCk6IE5vZGU7XHJcbiAgdG9TdHJpbmcoKTogc3RyaW5nO1xyXG59O1xyXG50eXBlIEVsZW1lbnRWTm9kZSA9IENvbW1vblZOb2RlUHJvcGVydGllcyAmIHtcclxuICB0eXBlOiBcIkVsZW1lbnRcIjtcclxuICBub2RlOiBFbGVtZW50O1xyXG4gIGNoaWxkcmVuOiBBcnJheTxWTm9kZT47XHJcbiAgdGFnOiBzdHJpbmcgfCBGdW5jdGlvbjtcclxuICBwcm9wczogeyBba2V5OiBzdHJpbmddOiBhbnkgfTtcclxufTtcclxudHlwZSBUZXh0Vk5vZGUgPSBDb21tb25WTm9kZVByb3BlcnRpZXMgJiB7XHJcbiAgdHlwZTogXCJUZXh0Tm9kZVwiO1xyXG4gIG5vZGU6IFRleHQ7XHJcbiAgY2hpbGRyZW46IEFycmF5PFZOb2RlPjsgLy9BcnJheTxuZXZlcj47XHJcbiAgdGFnOiBudWxsO1xyXG59O1xyXG5cclxudHlwZSBSb290Vk5vZGUgPSB7XHJcbiAgdHlwZTogXCJSb290XCI7XHJcbiAgbm9kZTogRWxlbWVudDtcclxuICBjaGlsZHJlbjogQXJyYXk8Vk5vZGU+O1xyXG4gIHBhcmVudDogbnVsbDtcclxuICAvL2FzTm9kZSgpOiBOb2RlO1xyXG4gIC8vdG9TdHJpbmcoKTogc3RyaW5nO1xyXG59O1xyXG5cclxudHlwZSBWTm9kZSA9IHtcclxuICBwYXJlbnQ6IFZOb2RlO1xyXG4gIGFzTm9kZSgpOiBOb2RlO1xyXG4gIHRvU3RyaW5nKCk6IHN0cmluZztcclxufSAmIChcclxuICB8IEVsZW1lbnRWTm9kZVxyXG4gIHwgVGV4dFZOb2RlXHJcbiAgfCB7XHJcbiAgICAgIHR5cGU6IFwiVGV4dE5vZGVcIjtcclxuICAgICAgbm9kZTogVGV4dDtcclxuICAgICAgY2hpbGRyZW46IEFycmF5PFZOb2RlPjsgLy9BcnJheTxuZXZlcj47XHJcbiAgICAgIHRhZzogbnVsbDtcclxuICAgIH1cclxuICB8IHtcclxuICAgICAgdHlwZTogXCJGcmFnbWVudFwiO1xyXG4gICAgICBub2RlOiBudWxsOyAvLyBAVE9ETzogb3IgbnVsbD9cclxuICAgICAgY2hpbGRyZW46IEFycmF5PFZOb2RlPjtcclxuICAgICAgdGFnOiBudWxsO1xyXG4gICAgfVxyXG4gIHwge1xyXG4gICAgICB0eXBlOiBcIk51bGxcIjtcclxuICAgICAgbm9kZTogbnVsbDtcclxuICAgICAgY2hpbGRyZW46IEFycmF5PFZOb2RlPjsgLy9BcnJheTxuZXZlcj47XHJcbiAgICAgIHRhZzogbnVsbDtcclxuICAgIH1cclxuKTtcclxuXHJcbi8vIG51bGwgd2hlbiBjaGVja2luZyB0aGUgcGFyZW50IHdoZW4gcm9vdCBpcyBmcmFnbWVudCBpdHNlbGZcclxuZnVuY3Rpb24gZ2V0UGFyZW50RWxlbWVudE5vZGUodk5vZGU6IFZOb2RlKTogRWxlbWVudFZOb2RlIHtcclxuICB3aGlsZSAodk5vZGUucGFyZW50KSB7XHJcbiAgICB2Tm9kZSA9IHZOb2RlLnBhcmVudDtcclxuICAgIGlmICh2Tm9kZS5ub2RlKSByZXR1cm4gdk5vZGU7XHJcbiAgfVxyXG5cclxuICAvLyB3aWxsIG5ldmVyIHJlYWNoXHJcbiAgdGhyb3cgbmV3IEVycm9yKFwianN4LXJ1bnRpbWU6IGNhbid0IGZpbmQgYSBwYXJlbnQgd2l0aCBFbGVtZW50XCIpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBnZXRDaGlsZEVsZW1lbnROb2RlcyhcclxuICB2Tm9kZTogVk5vZGUsXHJcbiAgYWx3YXlzQWxsb3c6IFZOb2RlW10gPSBbXVxyXG4pOiBWTm9kZVtdIHtcclxuICByZXR1cm4gdk5vZGUuY2hpbGRyZW5cclxuICAgIC5tYXAoKGNoaWxkTm9kZTogVk5vZGUpID0+IHtcclxuICAgICAgaWYgKGFsd2F5c0FsbG93LmluY2x1ZGVzKGNoaWxkTm9kZSkpIHJldHVybiBjaGlsZE5vZGU7XHJcbiAgICAgIGlmIChjaGlsZE5vZGUudHlwZSA9PT0gXCJOdWxsXCIpIHJldHVybiBudWxsO1xyXG4gICAgICBpZiAoY2hpbGROb2RlLnR5cGUgPT09IFwiRWxlbWVudFwiIHx8IGNoaWxkTm9kZS50eXBlID09PSBcIlRleHROb2RlXCIpXHJcbiAgICAgICAgcmV0dXJuIGNoaWxkTm9kZTtcclxuICAgICAgaWYgKGNoaWxkTm9kZS50eXBlID09PSBcIkZyYWdtZW50XCIpIHJldHVybiBnZXRDaGlsZEVsZW1lbnROb2RlcyhjaGlsZE5vZGUpO1xyXG4gICAgICAvLyBAVE9ETzogb3RoZXIgdHlwZXMgKGkuZS4gTGl2ZSBFbGVtZW50KVxyXG4gICAgICByZXR1cm4gbnVsbDtcclxuICAgIH0pXHJcbiAgICAuZmxhdChJbmZpbml0eSlcclxuICAgIC5maWx0ZXIoQm9vbGVhbikgYXMgVk5vZGVbXTtcclxufVxyXG5cclxuZnVuY3Rpb24gZ2V0U2libGluZ3Modk5vZGU6IFZOb2RlKSB7XHJcbiAgcmV0dXJuIGdldENoaWxkRWxlbWVudE5vZGVzKGdldFBhcmVudEVsZW1lbnROb2RlKHZOb2RlKSwgW3ZOb2RlXSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdldFBhcmVudEFuZE5leHRTaWJsaW5nKHZOb2RlOiBWTm9kZSk6IFtOb2RlLCBOb2RlIHwgbnVsbF0ge1xyXG4gIC8vIG5vZGUgYW5jZXN0b3Igd2l0aCBFbGVtZW50LFxyXG4gIGNvbnN0IHBhcmVudFdpdGhFbGVtZW50ID0gZ2V0UGFyZW50RWxlbWVudE5vZGUodk5vZGUpO1xyXG4gIGNvbnN0IHNpYmxpbmdzID0gZ2V0Q2hpbGRFbGVtZW50Tm9kZXMocGFyZW50V2l0aEVsZW1lbnQsIFt2Tm9kZV0pO1xyXG4gIGNvbnN0IHByZXZTaWJsaW5nID0gc2libGluZ3Nbc2libGluZ3MuaW5kZXhPZih2Tm9kZSkgLSAxXTtcclxuICBjb25zdCBuZXh0U2libGluZ05vZGUgPSBwcmV2U2libGluZyA/IHByZXZTaWJsaW5nLm5vZGUhLm5leHRTaWJsaW5nIDogbnVsbDtcclxuICAvL2NvbnN0IG5leHRTaWJsaW5nTm9kZSA9IG5leHRTaWJsaW5nID8gbmV4dFNpYmxpbmcubm9kZSA6IG51bGw7XHJcblxyXG4gIGNvbnNvbGUubG9nKFwiZ2V0UGFyZW50QW5kTmV4dFNpYmxpbmc6XCIsIHtcclxuICAgIHZOb2RlLFxyXG4gICAgcGFyZW50V2l0aEVsZW1lbnQsXHJcbiAgICBzaWJsaW5ncyxcclxuICAgIG5leHRTaWJsaW5nTm9kZSxcclxuICAgIGluZGV4OiBzaWJsaW5ncy5pbmRleE9mKHZOb2RlKSxcclxuICB9KTtcclxuXHJcbiAgcmV0dXJuIFtwYXJlbnRXaXRoRWxlbWVudC5ub2RlLCBuZXh0U2libGluZ05vZGVdO1xyXG4gIC8vIGFsbCBmbGF0IGNoaWxkIG5vZGVzICtcclxufVxyXG5cclxuZnVuY3Rpb24gZmluZFByZXZTaWJsaW5nKHZOb2RlOiBWTm9kZSk6IFZOb2RlIHwgbnVsbCB7XHJcbiAgY29uc3Qgc2libGluZ3MgPSBnZXRTaWJsaW5ncyh2Tm9kZSk7XHJcbiAgbGV0IHNpYmxpbmdCZWZvcmUgPSBzaWJsaW5nc1tzaWJsaW5ncy5pbmRleE9mKHZOb2RlKSAtIDFdIHx8IG51bGw7XHJcbiAgcmV0dXJuIHNpYmxpbmdCZWZvcmU7XHJcbn1cclxuXHJcbi8vIHByaXZhdGUga2V5IGZvciBjYWxsaW5nIHRoZSBgcmVmYCBjYWxsZXJzXHJcbmNvbnN0IF9jYWxsUmVmcyA9IFN5bWJvbChcImNhbGxSZWZzXCIpO1xyXG5cclxuLy8gdGhlIGN1cnJlbnQgbWFya3VwIHdoaWNoIGlzIHJlbmRlcmVkIGlzIG5lc3RlZCBpbiBhbiBzdmcgZWxlbWVudFxyXG5sZXQgc3ZnQ29udGV4dCA9IGZhbHNlO1xyXG5cclxuLy8ganN4IGFuZCBGcmFnbWVudCB3aWxsIHJldHVybiBvYmplY3RzIHdoaWNoIGltcGxlbWVudCB0aGlzIGludGVyZmFjZVxyXG5leHBvcnQgaW50ZXJmYWNlIEpzeE5vZGVJbnRlcmZhY2UgZXh0ZW5kcyBKc3hOb2RlIHtcclxuICB0b1N0cmluZygpOiBzdHJpbmc7XHJcbiAgYXNOb2RlKCk6IE5vZGU7XHJcbiAgYXNWTm9kZSgpOiBWTm9kZTtcclxuICBbX2NhbGxSZWZzXSgpOiB2b2lkO1xyXG59XHJcblxyXG4vKipcclxuICogcmV0dXJucyB0cnVlIGlmIG5vdCBudWxsaXNoIG9yIGZhbHNlXHJcbiAqIHRoYXQgbWVhbnMgMCBvciBlbXB0eSBzdHJpbmcgYXJlIGFsbG93ZWRcclxuICogQHBhcmFtIHsqfSB2YWxcclxuICovXHJcbmZ1bmN0aW9uIHRydXRoeSh2YWx1ZTogYW55KTogYm9vbGVhbiB7XHJcbiAgcmV0dXJuIHZhbHVlICE9PSBmYWxzZSAmJiB2YWx1ZSAhPT0gbnVsbCAmJiB2YWx1ZSAhPT0gdW5kZWZpbmVkO1xyXG59XHJcblxyXG4vKipcclxuICogZXNjYXBlcyB0aGUgcHJvdmlkZWQgc3RyaW5nIGFnYWluc3QgeHNzIGF0dGFja3MgZXRjXHJcbiAqXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSB0ZXh0XHJcbiAqIEByZXR1cm5zIHtzdHJpbmd9XHJcbiAqL1xyXG5mdW5jdGlvbiBzYW5pdGl6ZSh0ZXh0OiBzdHJpbmcpOiBzdHJpbmcge1xyXG4gIGNvbnN0IGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgZGl2LmlubmVyVGV4dCA9IHRleHQ7XHJcbiAgcmV0dXJuIGRpdi5pbm5lckhUTUw7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBiYXNpY2FsbHkgYEVsZW1lbnQub3V0ZXJIVE1MYCBidXQgYWxzbyBzdXBwb3J0cyBUZXh0IG5vZGUgYW5kIERvY3VtZW50RnJhZ21lbnRcclxuICogQHBhcmFtIGVsZW1lbnQge05vZGV9IC0gZWxlbWVudCB3aGljaCBpdHMgaHRtbCBuZWVkcyB0byBiZSByZXR1cm5lZFxyXG4gKi9cclxuZnVuY3Rpb24gZ2V0T3V0ZXJIdG1sKGVsZW1lbnQ6IE5vZGUpOiBzdHJpbmcge1xyXG4gIGlmIChlbGVtZW50IGluc3RhbmNlb2YgRWxlbWVudCkgcmV0dXJuIGVsZW1lbnQub3V0ZXJIVE1MO1xyXG4gIGlmIChlbGVtZW50IGluc3RhbmNlb2YgVGV4dCkgcmV0dXJuIHNhbml0aXplKGVsZW1lbnQud2hvbGVUZXh0KTtcclxuICBpZiAoZWxlbWVudCBpbnN0YW5jZW9mIERvY3VtZW50RnJhZ21lbnQpXHJcbiAgICByZXR1cm4gQXJyYXkuZnJvbShlbGVtZW50LmNoaWxkTm9kZXMpXHJcbiAgICAgIC5tYXAoKGVsKSA9PiBnZXRPdXRlckh0bWwoZWwpKVxyXG4gICAgICAuam9pbihcIlwiKTtcclxuXHJcbiAgLy8gc2hvdWxkbid0IHJlYWNoIHRoaXMgcG9pbnRcclxuICBjb25zb2xlLndhcm4oXCJnZXRPdXRlckh0bWwgZG9lcyBub3Qgc3VwcG9ydCB0aGlzIHR5cGUgb2YgZWxlbWVudFwiLCBlbGVtZW50KTtcclxuICByZXR1cm4gXCJcIjtcclxufVxyXG5cclxuLyoqXHJcbiAqIGdlbmVyYXRlcyB0aGUgaHRtbCBhcyBhIHN0cmluZyB3aGljaCBjYW4gYmUgdXNlZCBmb3IgZXhhbXBsZSB3aXRoIGBlbGVtZW50LmlubmVySFRNTCgpYFxyXG4gKlxyXG4gKiBAcGFyYW0gdGFnIHtzdHJpbmd8RnVuY3Rpb259IC0gdGFnIGFyZ3VtZW50IG9mIHRoZSBqc3ggY2FsbFxyXG4gKiBAcGFyYW0gcHJvcHMge09iamVjdH0gLSBwcm9wcyBhcmd1bWVudCBvZiBqc3ggY2FsbFxyXG4gKi9cclxuZnVuY3Rpb24gYXNIdG1sU3RyaW5nKHRhZzogc3RyaW5nIHwgRnVuY3Rpb24sIHByb3BzOiBKc3hQcm9wcykge1xyXG4gIGlmICh0eXBlb2YgdGFnID09PSBcImZ1bmN0aW9uXCIpIHtcclxuICAgIC8vIGV4cGVjdGluZyB0YWcgZnVuY3Rpb24gdG8gYWx3YXlzIHJldHVybiBhIGpzeC5cclxuICAgIC8vIGhlcmUgaXQgd2lsbCBhbHNvIHdvcmsgaWYgaXQgcmV0dXJucyBzb21ldGhpbmcgd2l0aCB0b1N0cmluZygpID0+IHN0cmluZyBtZXRob2RcclxuICAgIGNvbnN0IGVsZW1lbnQ6IEpzeE5vZGUgPSB0YWcocHJvcHMpO1xyXG5cclxuICAgIHJldHVybiBlbGVtZW50LnRvU3RyaW5nKCk7XHJcbiAgfVxyXG5cclxuICAvLyByZW1vdmUgY2hpbGRyZW4gZnJvbSBwcm9wcyBhbmQgcmVuZGVyIGl0IGFzIGNvbnRlbnQsXHJcbiAgLy8gdGhlIHJlc3QgYXMgYXR0cmlidXRlc1xyXG4gIGNvbnN0IHsgY2hpbGRyZW4sIC4uLmF0dHJzIH0gPSBwcm9wcztcclxuXHJcbiAgY29uc3QgYXR0cmlidXRlcyA9IE9iamVjdC5lbnRyaWVzKGF0dHJzKVxyXG4gICAgLmZpbHRlcigoWywgdmFsdWVdKSA9PiB0cnV0aHkodmFsdWUpKVxyXG4gICAgLm1hcCgoW2tleSwgdmFsdWVdKSA9PiB7XHJcbiAgICAgIC8vIGUuZy4gZGlzYWJsZWQ6IHRydWUgPT4gPHRhZyBkaXNhYmxlZD5cclxuICAgICAgaWYgKHZhbHVlID09PSB0cnVlKSByZXR1cm4ga2V5O1xyXG5cclxuICAgICAgLy8gZm9yIHN0eWxlIGFzIG9iamVjdDpcclxuICAgICAgLy8gKHN0eWxlOikge2Rpc3BsYXk6IFwibm9uZVwiLCBwb3NpdGlvbjogXCJhYnNvbHV0ZVwifSA9PT4gJ2Rpc3BsYXk6IG5vbmU7IHBvc2l0aW9uOiBhYnNvbHV0ZTsnXHJcbiAgICAgIGlmIChrZXkgPT09IFwic3R5bGVcIiAmJiB0eXBlb2YgdmFsdWUgPT09IFwib2JqZWN0XCIpXHJcbiAgICAgICAgdmFsdWUgPSBPYmplY3QuZW50cmllcyh2YWx1ZSlcclxuICAgICAgICAgIC8vIGlnbm9yZSBzdHVmZiBsaWtlIGB7YmFja2dyb3VuZDogYWN0aXZlICYmIFwicmVkXCJ9YCB3aGVuIGBhY3RpdmUgPT09IGZhbHNlIC8gbnVsbCAvIHVuZGVmaW5lZGBcclxuICAgICAgICAgIC5maWx0ZXIoKFssIHZdKSA9PiB0cnV0aHkodikpXHJcbiAgICAgICAgICAvLyBjdXJyZW50bHkgc3VwcG9ydHMgXCJiYWNrZ3JvdW5kLWNvbG9yXCIgbm90IFwiYmFja2dyb3VuZENvbG9yXCJcclxuICAgICAgICAgIC5tYXAoKFtrLCB2XSkgPT4gYCR7a306ICR7dn1gKVxyXG4gICAgICAgICAgLmpvaW4oXCI7IFwiKTtcclxuXHJcbiAgICAgIC8vIChjbGFzczopIFtcImJ0blwiLCBcInJlZFwiXSA9PT4gXCJidG4gcmVkXCJcclxuICAgICAgaWYgKGtleSA9PT0gXCJjbGFzc1wiICYmIEFycmF5LmlzQXJyYXkodmFsdWUpKSB2YWx1ZSA9IHZhbHVlLmpvaW4oXCIgXCIpO1xyXG5cclxuICAgICAgcmV0dXJuIGAke2tleX09XCIke3ZhbHVlfVwiYDtcclxuICAgIH0pXHJcbiAgICAuam9pbihcIiBcIik7XHJcblxyXG4gIGNvbnN0IGNvbnRlbnQgPSBjaGlsZHJlblxyXG4gICAgLmZpbHRlcih0cnV0aHkpXHJcbiAgICAubWFwKChjaGlsZCkgPT5cclxuICAgICAgY2hpbGQgaW5zdGFuY2VvZiBOb2RlXHJcbiAgICAgICAgPyBnZXRPdXRlckh0bWwoY2hpbGQpXHJcbiAgICAgICAgOiB0eXBlb2YgY2hpbGQgPT09IFwib2JqZWN0XCJcclxuICAgICAgICA/IGNoaWxkLnRvU3RyaW5nKClcclxuICAgICAgICA6IHNhbml0aXplKGNoaWxkKVxyXG4gICAgKVxyXG4gICAgLmpvaW4oXCJcIik7XHJcblxyXG4gIHJldHVybiBgPCR7dGFnfSAke2F0dHJpYnV0ZXN9PiR7Y29udGVudH08LyR7dGFnfT5gO1xyXG59XHJcblxyXG4vKipcclxuICogZ2VuZXJhdGVzIEhUTUwgTm9kZSBlbGVtZW50cyBmcm9tIHRoZSBwcm92aWRlZCBqc3ggdHJlZVxyXG4gKiBAcGFyYW0gdGFnIHtzdHJpbmd8RnVuY3Rpb259IC0gdGFnIGFyZ3VtZW50IG9mIHRoZSBqc3ggY2FsbFxyXG4gKiBAcGFyYW0gcHJvcHMge09iamVjdH0gLSBwcm9wcyBhcmd1bWVudCBvZiBqc3ggY2FsbFxyXG4gKi9cclxuZnVuY3Rpb24gYXNOb2RlKFxyXG4gIHRhZzogc3RyaW5nIHwgRnVuY3Rpb24gfCB1bmRlZmluZWQsXHJcbiAgcHJvcHM6IEpzeFByb3BzLFxyXG4gIGNoaWxkcmVuOiBhbnlbXVxyXG4pOiBbTm9kZSwgSnN4Tm9kZUludGVyZmFjZVtdXSB7XHJcbiAgY29uc29sZS5sb2coXCJhc05vZGUoKVwiLCB7IHRhZywgcHJvcHMsIGNoaWxkcmVuIH0pO1xyXG5cclxuICAvLyBmcmFnbWVudFxyXG4gIGlmICghdGFnKSB7XHJcbiAgICBjb25zdCBmcmFnbWVudHMgPSBjaGlsZHJlblxyXG4gICAgICAuZmxhdCgpXHJcbiAgICAgIC5maWx0ZXIoKG4pID0+IG4udGFnICE9PSBcIl9fTlVMTF9fXCIpXHJcbiAgICAgIC8vLmZpbHRlcih0cnV0aHkpXHJcbiAgICAgIC5tYXAoXHJcbiAgICAgICAgKGl0ZW0pID0+IGl0ZW0uYXNOb2RlKClcclxuICAgICAgICAvKml0ZW0gaW5zdGFuY2VvZiBOb2RlXHJcbiAgICAgICAgICAgID8gaXRlbVxyXG4gICAgICAgICAgICA6IGl0ZW0gaW5zdGFuY2VvZiBKc3hOb2RlXHJcbiAgICAgICAgICAgID8gaXRlbS5hc05vZGUoKVxyXG4gICAgICAgICAgICA6IGl0ZW0qL1xyXG4gICAgICApO1xyXG5cclxuICAgIGNvbnN0IGRvY3VtZW50RnJhZ21lbnQgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XHJcblxyXG4gICAgZG9jdW1lbnRGcmFnbWVudC5hcHBlbmQoLi4uZnJhZ21lbnRzKTtcclxuICAgIHJldHVybiBbZG9jdW1lbnRGcmFnbWVudCwgW11dO1xyXG4gIH1cclxuXHJcbiAgLy8gc2hvdWxkbid0XHJcbiAgaWYgKHR5cGVvZiB0YWcgPT09IFwiZnVuY3Rpb25cIikge1xyXG4gICAgY29uc29sZS5lcnJvcihcInNob3VsZG4ndCByZWFjaCB0aGlzIGluIHZUcmVlIG1vZGVcIik7XHJcbiAgICAvLyBleHBlY3RpbmcgdGhlIHRhZyBmdW5jdGlvbiB0byByZXR1cm4ganN4LlxyXG4gICAgLy8gaGVyZSBpdCB3aWxsIGFsc28gd29yayB3aGVuIGl0IHJldHVybnMgSFRNTEVsZW1lbnRcclxuICAgIGxldCByZXN1bHQgPSB0YWcocHJvcHMpO1xyXG5cclxuICAgIGxldCBqc3hOb2RlczogSnN4Tm9kZUludGVyZmFjZVtdID0gW107XHJcblxyXG4gICAgaWYgKHJlc3VsdCBpbnN0YW5jZW9mIEpzeE5vZGUpIHtcclxuICAgICAganN4Tm9kZXMgPSBbcmVzdWx0IGFzIEpzeE5vZGVJbnRlcmZhY2VdO1xyXG4gICAgICByZXN1bHQgPSAocmVzdWx0IGFzIEpzeE5vZGVJbnRlcmZhY2UpLmFzTm9kZSgpO1xyXG4gICAgICBPYmplY3QuZW50cmllcyhwcm9wcykuZm9yRWFjaCgoW2tleSwgdmFsdWVdKSA9PiB7XHJcbiAgICAgICAgaWYgKFxyXG4gICAgICAgICAga2V5LnN0YXJ0c1dpdGgoXCJvbi1cIikgJiZcclxuICAgICAgICAgICh0eXBlb2YgdmFsdWUgPT09IFwiZnVuY3Rpb25cIiB8fCB0eXBlb2YgdmFsdWUgPT09IFwib2JqZWN0XCIpXHJcbiAgICAgICAgKSB7XHJcbiAgICAgICAgICAvLyByZW1vdmUgbGVhZGluZyBcIm9uLVwiXCJcclxuICAgICAgICAgIGNvbnN0IGV2ZW50ID0ga2V5LnJlcGxhY2UoL15vbi0vLCBcIlwiKTtcclxuXHJcbiAgICAgICAgICByZXN1bHQuYWRkRXZlbnRMaXN0ZW5lcihcclxuICAgICAgICAgICAgZXZlbnQsXHJcbiAgICAgICAgICAgIHZhbHVlIGFzIEV2ZW50TGlzdGVuZXJPckV2ZW50TGlzdGVuZXJPYmplY3RcclxuICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gW3Jlc3VsdCwganN4Tm9kZXNdO1xyXG4gIH1cclxuXHJcbiAgY29uc3QgeyAuLi5hdHRycyB9ID0gcHJvcHM7XHJcbiAgLy8gcmVtZW1iZXIgaWYgdGhlIHN2ZyBjb250ZXh0IHdhcyBzZXQgZm9yIHRoaXMgbm9kZSwgYW5kIHJlcGxhY2UgYWZ0ZXIgZ2VuZXJhdGluZyBhbGwgY2hpbGRyZW5cclxuICBsZXQgc3ZnQ29udGV4dFNldCA9IGZhbHNlO1xyXG5cclxuICAvLyBzZXQgdGhlIGNvbnRleHQgb2YgbWFya3VwIHdoaWNoIGlzIHJlbmRlcmVkIGFzIFNWRyAob3IgaXRzIGNoaWxkcmVuKVxyXG4gIC8vIG5vIG5lZWQgZm9yIHJlLXNldHRpbmcgdGhlIGNvbnRleHQgZm9yIG5lc3RlZCBTVkdzXHJcbiAgaWYgKCFzdmdDb250ZXh0ICYmIHRhZyA9PT0gXCJzdmdcIikge1xyXG4gICAgc3ZnQ29udGV4dCA9IHRydWU7XHJcbiAgICBzdmdDb250ZXh0U2V0ID0gdHJ1ZTtcclxuICB9XHJcblxyXG4gIC8vIGN1cnJlbnRseSBub3Qgc3VwcG9ydGluZyB0aGUgYGlzYCBvcHRpb24gZm9yIEN1c3RvbWl6ZWQgYnVpbHQtaW4gZWxlbWVudHNcclxuICBjb25zdCBub2RlID0gc3ZnQ29udGV4dFxyXG4gICAgPyBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoXCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiLCB0YWcpXHJcbiAgICA6IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodGFnKTtcclxuXHJcbiAgT2JqZWN0LmVudHJpZXMoYXR0cnMpXHJcbiAgICAuZmlsdGVyKChbX2tleSwgdmFsdWVdKSA9PiB0cnV0aHkodmFsdWUpKVxyXG4gICAgLmZvckVhY2goKFtrZXksIHZhbHVlXSkgPT4ge1xyXG4gICAgICAvLyBmb3Igc3R5bGUgYXMgb2JqZWN0OlxyXG4gICAgICAvLyAoc3R5bGU6KSB7ZGlzcGxheTogXCJub25lXCIsIHBvc2l0aW9uOiBcImFic29sdXRlXCJ9ID09PiAnZGlzcGxheTogbm9uZTsgcG9zaXRpb246IGFic29sdXRlOydcclxuICAgICAgaWYgKGtleSA9PT0gXCJzdHlsZVwiICYmIHR5cGVvZiB2YWx1ZSA9PT0gXCJvYmplY3RcIilcclxuICAgICAgICB2YWx1ZSA9IE9iamVjdC5lbnRyaWVzKHZhbHVlKVxyXG4gICAgICAgICAgLmZpbHRlcigoWywgdl0pID0+IHRydXRoeSh2KSlcclxuICAgICAgICAgIC5tYXAoKFtrLCB2XSkgPT4gYCR7a306ICR7dn1gKVxyXG4gICAgICAgICAgLmpvaW4oXCI7IFwiKTtcclxuXHJcbiAgICAgIC8vIChjbGFzczopIFtcImJ0blwiLCBcInJlZFwiXSA9PT4gXCJidG4gcmVkXCJcclxuICAgICAgaWYgKGtleSA9PT0gXCJjbGFzc1wiICYmIEFycmF5LmlzQXJyYXkodmFsdWUpKSB2YWx1ZSA9IHZhbHVlLmpvaW4oXCIgXCIpO1xyXG5cclxuICAgICAgaWYgKHZhbHVlID09PSB0cnVlKSBub2RlLnNldEF0dHJpYnV0ZShrZXksIFwiXCIpO1xyXG4gICAgICBlbHNlIGlmICh0eXBlb2YgdmFsdWUgPT09IFwic3RyaW5nXCIgfHwgdHlwZW9mIHZhbHVlID09PSBcIm51bWJlclwiKVxyXG4gICAgICAgIG5vZGUuc2V0QXR0cmlidXRlKGtleSwgU3RyaW5nKHZhbHVlKSk7XHJcbiAgICAgIC8vIGtleSBoYXMgdGhlIGZvcm0gb2YgXCJvbi1jaGFuZ2VcIi4gdmFsdWUgaXMgdGhlIGNhbGxiYWNrIGZ1bmN0aW9uIG9yIGFuIG9iamVjdCBpbXBsZW1lbnRpbmcge0V2ZW50TGlzdGVuZXJ9IGludGVyZmFjZVxyXG4gICAgICBlbHNlIGlmIChcclxuICAgICAgICBrZXkuc3RhcnRzV2l0aChcIm9uLVwiKSAmJlxyXG4gICAgICAgICh0eXBlb2YgdmFsdWUgPT09IFwiZnVuY3Rpb25cIiB8fCB0eXBlb2YgdmFsdWUgPT09IFwib2JqZWN0XCIpXHJcbiAgICAgICkge1xyXG4gICAgICAgIC8vIHJlbW92ZSBsZWFkaW5nIFwib24tXCJcIlxyXG4gICAgICAgIGNvbnN0IGV2ZW50ID0ga2V5LnJlcGxhY2UoL15vbi0vLCBcIlwiKTtcclxuXHJcbiAgICAgICAgbm9kZS5hZGRFdmVudExpc3RlbmVyKFxyXG4gICAgICAgICAgZXZlbnQsXHJcbiAgICAgICAgICB2YWx1ZSBhcyBFdmVudExpc3RlbmVyT3JFdmVudExpc3RlbmVyT2JqZWN0XHJcbiAgICAgICAgKTtcclxuICAgICAgfVxyXG4gICAgICAvLyBAdHMtaWdub3JlIC0gcHJvdmlkaW5nIHRoZSB2YWx1ZSBhcyBwcm9wZXJ0eSB0byBodG1sIGVsZW1lbnRcclxuICAgICAgZWxzZSBub2RlW2tleV0gPSB2YWx1ZTtcclxuICAgIH0pO1xyXG5cclxuICAvLyByZXR1cm5zIGNoaWxkIGpzeCBub2RlcyBhcyB3ZWxsIHRvIGJlIHVzZWQgZHVyaW5nIHRoZSByZWYgY2FsbFxyXG4gIGNvbnN0IGNoaWxkSnN4Tm9kZXMgPSBjaGlsZHJlbi5maWx0ZXIoKGNoaWxkKSA9PiBjaGlsZCBpbnN0YW5jZW9mIEpzeE5vZGUpO1xyXG5cclxuICBjb25zb2xlLmxvZyh7IGNoaWxkcmVuIH0pO1xyXG5cclxuICBub2RlLmFwcGVuZChcclxuICAgIC4uLmNoaWxkcmVuXHJcbiAgICAgIC5mbGF0KClcclxuICAgICAgLy8uZmlsdGVyKHRydXRoeSlcclxuICAgICAgLmZpbHRlcigoY2hpbGQpID0+IGNoaWxkLnRhZyAhPT0gXCJfX05VTExfX1wiKVxyXG4gICAgICAubWFwKChjaGlsZCkgPT4gY2hpbGQuYXNOb2RlKCkpXHJcbiAgKTtcclxuXHJcbiAgLypub2RlLmFwcGVuZChcclxuICAgIC4uLmNoaWxkcmVuXHJcbiAgICAgIC5mbGF0KClcclxuICAgICAgLmZpbHRlcih0cnV0aHkpXHJcbiAgICAgIC5tYXAoKGNoaWxkKSA9PlxyXG4gICAgICAgIGNoaWxkIGluc3RhbmNlb2YgTm9kZVxyXG4gICAgICAgICAgPyBjb25zb2xlLndhcm4oXCJub2RlXCIpIHx8IGNoaWxkIC8vIHdhcm5cclxuICAgICAgICAgIDogY2hpbGQgaW5zdGFuY2VvZiBKc3hOb2RlXHJcbiAgICAgICAgICA/IGNoaWxkLmFzTm9kZSgpXHJcbiAgICAgICAgICA6IGNvbnNvbGUud2FybihcInRleHRcIikgfHwgY2hpbGRcclxuICAgICAgKVxyXG4gICk7Ki9cclxuXHJcbiAgLy8gc3ZnIGVsZW1lbnQgYW5kIGFsbCBpdHMgY2hpbGRyZW4gd2VyZSByZW5kZXJlZCwgcmVzZXQgdGhlIHN2ZyBjb250ZXh0XHJcbiAgaWYgKHN2Z0NvbnRleHRTZXQpIHN2Z0NvbnRleHQgPSBmYWxzZTtcclxuXHJcbiAgcmV0dXJuIFtub2RlLCBjaGlsZEpzeE5vZGVzIGFzIEpzeE5vZGVJbnRlcmZhY2VbXV07XHJcbn1cclxuXHJcbi8vIEBUT0RPOiByZW1vdmUgbWV0aG9kIG9uIFZOb2RlXHJcbmZ1bmN0aW9uIHJlbW92ZUl0ZW0oaXRlbTogVk5vZGUpIHtcclxuICAvL2lmIChpdGVtID09PSBudWxsKSByZXR1cm47XHJcbiAgaWYgKGl0ZW0udHlwZSA9PT0gXCJFbGVtZW50XCIgfHwgaXRlbS50eXBlID09PSBcIlRleHROb2RlXCIpXHJcbiAgICBpdGVtLm5vZGUucGFyZW50RWxlbWVudCEucmVtb3ZlQ2hpbGQoaXRlbS5ub2RlKTtcclxuICBlbHNlIGlmIChpdGVtLnR5cGUgPT09IFwiRnJhZ21lbnRcIilcclxuICAgIGdldENoaWxkRWxlbWVudE5vZGVzKGl0ZW0pLmZvckVhY2goKG5vZGUpID0+XHJcbiAgICAgIG5vZGUubm9kZSEucGFyZW50RWxlbWVudCEucmVtb3ZlQ2hpbGQobm9kZS5ub2RlISlcclxuICAgICk7XHJcbiAgLy8gQFRPRE86IGVsc2UgLT4gVk5vZGUgbWV0aG9kIGFjdHVhbGx5XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGluc2VydE5ld0l0ZW0obmV3Tm9kZTogVk5vZGUpIHtcclxuICBpZiAobmV3Tm9kZS50eXBlICE9PSBcIk51bGxcIikge1xyXG4gICAgY29uc3QgW3BhcmVudCwgbmV4dFNpYmxpbmddID0gZ2V0UGFyZW50QW5kTmV4dFNpYmxpbmcobmV3Tm9kZSk7XHJcbiAgICBwYXJlbnQuaW5zZXJ0QmVmb3JlKG5ld05vZGUuYXNOb2RlKCksIG5leHRTaWJsaW5nKTtcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGRpZmZBbmRQYXRjaChvbGROb2RlOiBWTm9kZSB8IFJvb3RWTm9kZSwgbmV3Tm9kZTogVk5vZGUgfCBSb290Vk5vZGUpIHtcclxuICBjb25zb2xlLmxvZyhcIi0tLS0tLS0tIGRpZmZBbmRQYXRjaCAtLS0tLS0tLVwiLCB7IG9sZE5vZGUsIG5ld05vZGUgfSk7XHJcbiAgaWYgKG9sZE5vZGUudHlwZSAhPT0gbmV3Tm9kZS50eXBlKSB7XHJcbiAgICAvLyB0ZWNobmljYWxseSBpdCB3b3VsZCBiZWVuIG1vcmUgZWZmZWN0aXZlIHdheXMgdG8gcmVwbGFjZSwgZS5nLiByZXBsYWNlV2l0aCgpIG1ldGhvZFxyXG4gICAgLy8gYnV0IHJlbW92aW5nIGFuZCBhZGRpbmcgd291bGQgYWxsb3cgYSBtb3JlIGdlbmVyaWMgc29sdXRpb24gdG8gcHJvdmlkZSBpbmRlcGVuZGVudCBpbXBsZW1lbnRhdGlvbiBmcm9tIGRpZmZlcmVudCBWTm9kZSBjbGFzc2VzXHJcbiAgICByZW1vdmVJdGVtKG9sZE5vZGUgYXMgVk5vZGUpO1xyXG4gICAgaW5zZXJ0TmV3SXRlbShuZXdOb2RlIGFzIFZOb2RlKTtcclxuICB9XHJcbiAgLy8gYm90aCBudWxsIDotPiBkbyBub3RoaW5nXHJcbiAgZWxzZSBpZiAob2xkTm9kZS50eXBlID09PSBcIk51bGxcIiAmJiBuZXdOb2RlLnR5cGUgPT09IFwiTnVsbFwiKSByZXR1cm47XHJcbiAgLy8gYm90aCBUZXh0IE5vZGVzIDotPiB1cGRhdGUgdGhlIHRleHRcclxuICBlbHNlIGlmIChvbGROb2RlLnR5cGUgPT09IFwiVGV4dE5vZGVcIiAmJiBuZXdOb2RlLnR5cGUgPT09IFwiVGV4dE5vZGVcIikge1xyXG4gICAgaWYgKG9sZE5vZGUubm9kZSEubm9kZVZhbHVlICE9PSBuZXdOb2RlLnByb3BzLmNvbnRlbnQpIHtcclxuICAgICAgb2xkTm9kZS5ub2RlIS5ub2RlVmFsdWUgPSBuZXdOb2RlLnByb3BzLmNvbnRlbnQ7XHJcbiAgICB9XHJcbiAgICBuZXdOb2RlLm5vZGUgPSBvbGROb2RlLm5vZGU7XHJcbiAgfVxyXG4gIC8vIGJvdGggSFRNTEVsZW1lbnQgd2l0aCBzYW1lIHRhZ1xyXG4gIGVsc2UgaWYgKG9sZE5vZGUudHlwZSA9PT0gXCJFbGVtZW50XCIgJiYgbmV3Tm9kZS50eXBlID09PSBcIkVsZW1lbnRcIikge1xyXG4gICAgaWYgKG5ld05vZGUudGFnID09PSBvbGROb2RlLnRhZykge1xyXG4gICAgICBuZXdOb2RlLm5vZGUgPSBvbGROb2RlLm5vZGU7XHJcbiAgICAgIC8vICAgICAgcGF0Y2ggcHJvcHMsXHJcbiAgICAgIC8vIHVwZGF0ZSBwcm9wcyBmb3JtIG5ldyBub2RlXHJcbiAgICAgIE9iamVjdC5lbnRyaWVzKG5ld05vZGUucHJvcHMpXHJcbiAgICAgICAgLmZpbHRlcigoW2ssIHZdKSA9PiBvbGROb2RlLnByb3BzW2tdICE9PSB2KVxyXG4gICAgICAgIC5mb3JFYWNoKChba2V5LCB2YWx1ZV0pID0+IHtcclxuICAgICAgICAgIGlmICh2YWx1ZSA9PT0gdHJ1ZSkgbmV3Tm9kZS5ub2RlLnNldEF0dHJpYnV0ZShrZXksIFwiXCIpO1xyXG4gICAgICAgICAgZWxzZSBpZiAodmFsdWUgPT09IG51bGwgfHwgdmFsdWUgPT09IHVuZGVmaW5lZCB8fCB2YWx1ZSA9PT0gZmFsc2UpXHJcbiAgICAgICAgICAgIG5ld05vZGUubm9kZS5yZW1vdmVBdHRyaWJ1dGUoa2V5KTtcclxuICAgICAgICAgIGVsc2UgbmV3Tm9kZS5ub2RlLnNldEF0dHJpYnV0ZShrZXksIHZhbHVlKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgIC8vIHJlbW92ZSBvbGQsIG9ic29sYXRlIGF0dHJpYnV0ZXNcclxuICAgICAgT2JqZWN0LmVudHJpZXMob2xkTm9kZS5wcm9wcylcclxuICAgICAgICAuZmlsdGVyKChbaywgdl0pID0+ICFuZXdOb2RlLnByb3BzLmhhc093blByb3BlcnR5KGspKVxyXG4gICAgICAgIC5mb3JFYWNoKChba2V5LCB2YWx1ZV0pID0+IHtcclxuICAgICAgICAgIG9sZE5vZGUubm9kZS5yZW1vdmVBdHRyaWJ1dGUoa2V5KTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgIC8vIGNoaWxkcmVuID0+IGl0ZXIgYW5kIHBhdGNoXHJcbiAgICAgIC8vIG9sZCBjaGlsZHJlbiBiZWluZyBtb2RpZmllZFxyXG4gICAgICBkaWZmQW5kUGF0Y2hDaGlsZHJlbihvbGROb2RlLCBuZXdOb2RlKTtcclxuICAgIH1cclxuICAgIC8vIHRhZyBoYXMgY2hhbmdlZFxyXG4gICAgZWxzZSB7XHJcbiAgICAgIG9sZE5vZGUubm9kZS5yZXBsYWNlV2l0aChuZXdOb2RlLmFzTm9kZSgpKTtcclxuICAgIH1cclxuICB9XHJcbiAgLy8gRnJhZ21lbnRzXHJcbiAgZWxzZSBpZiAob2xkTm9kZS50eXBlID09PSBcIkZyYWdtZW50XCIgJiYgbmV3Tm9kZS50eXBlID09PSBcIkZyYWdtZW50XCIpIHtcclxuICAgIC8vIGl0ZXJhdGUsIGRpZmYgYW5kIHBhdGNoXHJcbiAgICBkaWZmQW5kUGF0Y2hDaGlsZHJlbihvbGROb2RlLCBuZXdOb2RlKTtcclxuICB9IGVsc2UgaWYgKG9sZE5vZGUudHlwZSA9PT0gXCJSb290XCIpIHtcclxuICAgIC8vIGl0ZXJhdGUsIGRpZmYgYW5kIHBhdGNoXHJcbiAgICBkaWZmQW5kUGF0Y2hDaGlsZHJlbihvbGROb2RlLCBuZXdOb2RlKTtcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGRpZmZBbmRQYXRjaENoaWxkcmVuKFxyXG4gIG9sZE5vZGU6IFZOb2RlIHwgUm9vdFZOb2RlLFxyXG4gIG5ld05vZGU6IFZOb2RlIHwgUm9vdFZOb2RlXHJcbikge1xyXG4gIG9sZE5vZGUuY2hpbGRyZW4uZm9yRWFjaCgob2xkQ2hpbGQsIGl4KSA9PiB7XHJcbiAgICBjb25zdCBuZXdDaGlsZCA9IG5ld05vZGUuY2hpbGRyZW5baXhdO1xyXG4gICAgaWYgKG5ld0NoaWxkKSBkaWZmQW5kUGF0Y2gob2xkQ2hpbGQsIG5ld0NoaWxkKTtcclxuICAgIC8vIGNoaWxkIHdhcyByZW1vdmVkXHJcbiAgICBlbHNlIHtcclxuICAgICAgcmVtb3ZlSXRlbShvbGRDaGlsZCk7XHJcbiAgICB9XHJcbiAgfSk7XHJcblxyXG4gIGNvbnN0IGRvY3VtZW50RnJhZ21lbnQgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XHJcbiAgLy8gbmV3IGFkZGl0aW9uIGl0ZW1zXHJcbiAgZm9yIChsZXQgaSA9IG9sZE5vZGUuY2hpbGRyZW4ubGVuZ3RoOyBpIDwgbmV3Tm9kZS5jaGlsZHJlbi5sZW5ndGg7IGkrKykge1xyXG4gICAgaWYgKG5ld05vZGUuY2hpbGRyZW5baV0udHlwZSAhPT0gXCJOdWxsXCIpXHJcbiAgICAgIGRvY3VtZW50RnJhZ21lbnQuYXBwZW5kKG5ld05vZGUuY2hpbGRyZW5baV0uYXNOb2RlKCkpO1xyXG4gIH1cclxuICAobmV3Tm9kZS5ub2RlXHJcbiAgICA/IG5ld05vZGUubm9kZVxyXG4gICAgOiBnZXRQYXJlbnRFbGVtZW50Tm9kZShuZXdOb2RlKS5ub2RlXHJcbiAgKS5pbnNlcnRCZWZvcmUoZG9jdW1lbnRGcmFnbWVudCwgbnVsbCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGFzVk5vZGUodGFnOiBzdHJpbmcgfCBGdW5jdGlvbiB8IHVuZGVmaW5lZCwgcHJvcHM6IEpzeFByb3BzKTogVk5vZGUge1xyXG4gIGlmICh0eXBlb2YgdGFnID09PSBcImZ1bmN0aW9uXCIpIHtcclxuICAgIGxldCByZXN1bHQgPSB0YWcocHJvcHMpO1xyXG4gICAgaWYgKHJlc3VsdCBpbnN0YW5jZW9mIEpzeE5vZGUpIHtcclxuICAgICAgcmV0dXJuIChyZXN1bHQgYXMgSnN4Tm9kZUludGVyZmFjZSkuYXNWTm9kZSgpO1xyXG4gICAgfVxyXG4gICAgLy8gYmlnIEBUT0RPOlxyXG4gICAgaWYgKHJlc3VsdCBpbnN0YW5jZW9mIE5vZGUpIHtcclxuICAgICAgY29uc3Qgbm9kZSA9IHtcclxuICAgICAgICB0YWc6IFwiX19OT0RFX19cIixcclxuICAgICAgICB0eXBlOiBcIj9cIixcclxuICAgICAgICBwYXJlbnQ6IG51bGwsXHJcbiAgICAgICAgcHJvcHM6IHtcclxuICAgICAgICAgIGNvbnRlbnQ6IHJlc3VsdCxcclxuICAgICAgICB9LFxyXG4gICAgICAgIGNoaWxkcmVuOiBbXSxcclxuICAgICAgICBhc05vZGUoKSB7XHJcbiAgICAgICAgICBub2RlLm5vZGUgPSByZXN1bHQ7XHJcbiAgICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZGlmZkFuZFBhdGNoKCkge1xyXG4gICAgICAgICAgY29uc29sZS5sb2coXCJfX05PREVfXyAxIGRpZmZBbmRQYXRjaFwiLCByZXN1bHQpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgIH07XHJcblxyXG4gICAgICByZXR1cm4gbm9kZTtcclxuICAgIH1cclxuXHJcbiAgICAvKmZ1bmN0aW9uIGdldEZpcnN0RWxlbWVudChubm46IFZOb2RlKSB7XHJcbiAgICAgIGlmIChubm4udHlwZSA9PT0gXCJFbGVtZW50XCIpIHJldHVybiBubm4ubm9kZTtcclxuICAgICAgaWYgKG5ubi50eXBlID09PSBcIk51bGxcIikgcmV0dXJuIG51bGw7XHJcbiAgICAgIGlmIChubm4udHlwZSA9PT0gXCJGcmFnbWVudFwiKSB7XHJcbiAgICAgICAgY29uc3QgaXRlbSA9IG5ubi5jaGlsZHJlbi5maW5kKChuMikgPT4gZ2V0Rmlyc3RFbGVtZW50KG4yKSAhPT0gbnVsbCk7XHJcbiAgICAgICAgcmV0dXJuIGl0ZW0gPyBpdGVtLm5vZGUgOiBudWxsO1xyXG4gICAgICB9XHJcbiAgICB9Ki9cclxuXHJcbiAgICAvLyBudWxsIGpzeCBub2RlXHJcbiAgICBpZiAoIXRydXRoeShyZXN1bHQpKSB7XHJcbiAgICAgIGNvbnN0IGZvb05vZGU6IFZOb2RlID0ge307XHJcbiAgICAgIE9iamVjdC5hc3NpZ24oZm9vTm9kZSwge1xyXG4gICAgICAgIHRhZzogXCJfX05VTExfX1wiLFxyXG4gICAgICAgIHR5cGU6IFwiTnVsbFwiLFxyXG4gICAgICAgIHRhZzI6IFwidGFnIGZ1bmMgcmV0dXJuZWQgbnVsbCBub2RlXCIsXHJcbiAgICAgICAgbm9kZTogbnVsbCxcclxuICAgICAgICBwYXJlbnQ6IG51bGwsXHJcbiAgICAgICAgcHJvcHM6IHt9LFxyXG4gICAgICAgIGNoaWxkcmVuOiBbXSxcclxuICAgICAgICBhc05vZGUoKSB7XHJcbiAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGRpZmZBbmRQYXRjaChuZXdOb2RlOiBWTm9kZSkge1xyXG4gICAgICAgICAgcmV0dXJuIGRpZmZBbmRQYXRjaChmb29Ob2RlLCBuZXdOb2RlKTtcclxuXHJcbiAgICAgICAgICBpZiAobmV3Tm9kZS50eXBlID09PSBcIk51bGxcIikgcmV0dXJuO1xyXG4gICAgICAgICAgY29uc3QgbiA9IG5ld05vZGUuYXNOb2RlKCk7XHJcblxyXG4gICAgICAgICAgLy8gQFRPRE86IGZpbmQgaXRlbSBiZWZvcmVcclxuICAgICAgICAgIC8vdk5vZGUubm9kZVxyXG4gICAgICAgICAgY29uc3Qgc2libGluZ3MgPSBnZXRTaWJsaW5ncyhuZXdOb2RlKTtcclxuICAgICAgICAgIGNvbnN0IG5ld05vZGVJbmRleCA9IHNpYmxpbmdzLmluZGV4T2YobmV3Tm9kZSk7XHJcblxyXG4gICAgICAgICAgbGV0IHNpYmxpbmdCZWZvcmUgPSBzaWJsaW5nc1tuZXdOb2RlSW5kZXggLSAxXSB8fCBudWxsOyAvLyA9IHNpYmxpbmdzLmZpbmQoKG46IFZOb2RlKSA9PiBuLm5vZGUpO1xyXG4gICAgICAgICAgLypmb3IgKGxldCBpaSA9IG5ld05vZGVJbmRleCAtIDE7IGlpID49IDA7IGlpLS0pIHtcclxuICAgICAgICAgICAgY29uc3QgZWwgPSBnZXRGaXJzdEVsZW1lbnQoc2libGluZ3NbaWldKTtcclxuICAgICAgICAgICAgaWYgKGVsKSB7XHJcbiAgICAgICAgICAgICAgc2libGluZ0JlZm9yZSA9IGVsO1xyXG4gICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9Ki9cclxuICAgICAgICAgIGlmIChzaWJsaW5nQmVmb3JlKSB7XHJcbiAgICAgICAgICAgIGlmIChuKSBzaWJsaW5nQmVmb3JlLm5vZGUuaW5zZXJ0QWRqYWNlbnRFbGVtZW50KFwiYWZ0ZXJlbmRcIiwgbik7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBnZXRQYXJlbnRFbGVtZW50Tm9kZShuZXdOb2RlKS5ub2RlLmluc2VydEFkamFjZW50RWxlbWVudChcclxuICAgICAgICAgICAgICBcImFmdGVyYmVnaW5cIixcclxuICAgICAgICAgICAgICBuXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgfSk7XHJcblxyXG4gICAgICByZXR1cm4gZm9vTm9kZTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBub2RlID0ge1xyXG4gICAgICB0YWc6IFwiX19URVhUX05PREVfX1wiLFxyXG4gICAgICB0cHllOiBcIlRleHROb2RlXCIsXHJcbiAgICAgIHRhZzE6IDEsXHJcbiAgICAgIG5vZGU6IG51bGwsXHJcbiAgICAgIHBhcmVudDogbnVsbCxcclxuICAgICAgcHJvcHM6IHtcclxuICAgICAgICBjb250ZW50OiByZXN1bHQsXHJcbiAgICAgIH0sXHJcbiAgICAgIGNoaWxkcmVuOiBbXSxcclxuICAgICAgYXNOb2RlKCkge1xyXG4gICAgICAgIGNvbnN0IHRleHROb2RlID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUocmVzdWx0KTtcclxuICAgICAgICBub2RlLm5vZGUgPSB0ZXh0Tm9kZTtcclxuICAgICAgICByZXR1cm4gdGV4dE5vZGU7XHJcbiAgICAgIH0sXHJcbiAgICAgIGRpZmZBbmRQYXRjaChuZXdOb2RlKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXHJcbiAgICAgICAgICBcIl9fVEVYVF9OT0RFX18gMSBkaWZmQW5kUGF0Y2hcIixcclxuICAgICAgICAgIHJlc3VsdCxcclxuICAgICAgICAgIG5ld05vZGUucHJvcHMuY29udGVudFxyXG4gICAgICAgICk7XHJcblxyXG4gICAgICAgIHJldHVybiBkaWZmQW5kUGF0Y2gobm9kZSwgbmV3Tm9kZSk7XHJcblxyXG4gICAgICAgIC8vIEBUT0RPIGJvdGggdGV4dFxyXG4gICAgICAgIGlmIChyZXN1bHQgIT09IG5ld05vZGUucHJvcHMuY29udGVudClcclxuICAgICAgICAgIG5vZGUubm9kZS5ub2RlVmFsdWUgPSBuZXdOb2RlLnByb3BzLmNvbnRlbnQ7XHJcbiAgICAgICAgLy8gZWxzZSA/XHJcbiAgICAgIH0sXHJcbiAgICB9O1xyXG5cclxuICAgIHJldHVybiBub2RlO1xyXG4gIH1cclxuXHJcbiAgY29uc3QgeyBjaGlsZHJlbiwgLi4uYXR0ciB9ID0gcHJvcHM7XHJcbiAgY29uc3Qgdk5vZGU6IFZOb2RlID0ge307XHJcbiAgaWYgKHRhZykge1xyXG4gICAgT2JqZWN0LmFzc2lnbih2Tm9kZSwge1xyXG4gICAgICB0YWcsXHJcbiAgICAgIHR5cGU6IFwiRWxlbWVudFwiLCAvLyB3aGVyZSBjb21lcyBGcmFnZW1udD9cclxuICAgICAgdGFnMjogXCJhc1ZOb2RlIC0gbm9ybWFsIHJldHVyblwiLFxyXG4gICAgICBub2RlOiBudWxsLFxyXG4gICAgICBwcm9wczogYXR0cixcclxuICAgICAgY2hpbGRyZW46IGNoaWxkcmVuLmZsYXQoKS5tYXAoKGNoaWxkKSA9PiB7XHJcbiAgICAgICAgaWYgKGNoaWxkIGluc3RhbmNlb2YgSnN4Tm9kZSkge1xyXG4gICAgICAgICAgY29uc3QgY2hpbGRWTm9kZSA9IGNoaWxkLmFzVk5vZGUoKTtcclxuICAgICAgICAgIGNoaWxkVk5vZGUucGFyZW50ID0gdk5vZGU7XHJcbiAgICAgICAgICByZXR1cm4gY2hpbGRWTm9kZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGNoaWxkIGluc3RhbmNlb2YgTm9kZSkge1xyXG4gICAgICAgICAgY29uc3Qgbm9kZSA9IHtcclxuICAgICAgICAgICAgdGFnOiBcIl9fTk9ERV9fXCIsXHJcbiAgICAgICAgICAgIHByb3BzOiB7XHJcbiAgICAgICAgICAgICAgY29udGVudDogY2hpbGQsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHBhcmVudDogdk5vZGUsXHJcbiAgICAgICAgICAgIGNoaWxkcmVuOiBbXSxcclxuICAgICAgICAgICAgYXNOb2RlKCkge1xyXG4gICAgICAgICAgICAgIG5vZGUubm9kZSA9IGNoaWxkO1xyXG4gICAgICAgICAgICAgIHJldHVybiBjaGlsZDtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZGlmZkFuZFBhdGNoKCkge1xyXG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiX19OT0RFX18gZGlmZkFuZFBhdGNoXCIsIGNoaWxkKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgcmV0dXJuIG5vZGU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zb2xlLmxvZyhcIkBAIG1hcFwiLCB7IGNoaWxkIH0pO1xyXG5cclxuICAgICAgICBpZiAoY2hpbGQgPT09IG51bGwgfHwgY2hpbGQgPT09IGZhbHNlIHx8IGNoaWxkID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgIGNvbnN0IGNoaWxkVk5vZGU6IFZOb2RlID0ge1xyXG4gICAgICAgICAgICB0YWc6IFwiX19OVUxMX19cIixcclxuICAgICAgICAgICAgdHlwZTogXCJOdWxsXCIsXHJcbiAgICAgICAgICAgIHRhZzI6IFwiY2hpbGRyZW4gbnVsbCBub2RlXCIsXHJcbiAgICAgICAgICAgIG5vZGU6IG51bGwsXHJcbiAgICAgICAgICAgIHBhcmVudDogdk5vZGUsXHJcbiAgICAgICAgICAgIHByb3BzOiB7fSxcclxuICAgICAgICAgICAgY2hpbGRyZW46IFtdLFxyXG4gICAgICAgICAgICBhc05vZGUoKSB7XHJcbiAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGRpZmZBbmRQYXRjaChuZXdOb2RlOiBWTm9kZSkge1xyXG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiZGlmZi1BbmRQYXRjaCwgY2hpbGQgbm9kZSB3YXMgbnVsbFwiLCBuZXdOb2RlKTtcclxuXHJcbiAgICAgICAgICAgICAgaWYgKG5ld05vZGUudGFnID09PSBcIl9fTlVMTF9fXCIpIHJldHVybjtcclxuICAgICAgICAgICAgICBjb25zdCBuID0gbmV3Tm9kZS5hc05vZGUoKTtcclxuICAgICAgICAgICAgICAvLyBAVE9ETzogZmluZCBpdGVtIGJlZm9yZVxyXG4gICAgICAgICAgICAgIC8vdk5vZGUubm9kZVxyXG4gICAgICAgICAgICAgIGNvbnN0IG5ld05vZGVJbmRleCA9IG5ld05vZGUucGFyZW50LmNoaWxkcmVuLmluZGV4T2YobmV3Tm9kZSk7XHJcbiAgICAgICAgICAgICAgY29uc3Qgc2libGluZ3MgPSBuZXdOb2RlLnBhcmVudC5jaGlsZHJlblxyXG4gICAgICAgICAgICAgICAgLnNsaWNlKDAsIG5ld05vZGVJbmRleClcclxuICAgICAgICAgICAgICAgIC5yZXZlcnNlKCk7XHJcbiAgICAgICAgICAgICAgY29uc3Qgc2libGluZ0JlZm9yZSA9IHNpYmxpbmdzLmZpbmQoKG46IFZOb2RlKSA9PiBuLm5vZGUpO1xyXG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKHsgc2libGluZ0JlZm9yZSwgc2libGluZ3MsIG5ld05vZGVJbmRleCwgbmV3Tm9kZSB9KTtcclxuXHJcbiAgICAgICAgICAgICAgaWYgKHNpYmxpbmdCZWZvcmUpIHtcclxuICAgICAgICAgICAgICAgIHNpYmxpbmdCZWZvcmUubm9kZS5pbnNlcnRBZGphY2VudEVsZW1lbnQoXCJhZnRlcmVuZFwiLCBuKTtcclxuICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdk5vZGUubm9kZS5pbnNlcnRBZGphY2VudEVsZW1lbnQoXCJhZnRlcmJlZ2luXCIsIG4pO1xyXG4gICAgICAgICAgICAgICAgLyoobmV3Tm9kZS5wYXJlbnQubm9kZSBhcyBIVE1MRWxlbWVudCkuaW5zZXJ0QWRqYWNlbnRFbGVtZW50KFxyXG4gICAgICAgICAgICAgICAgXCJhZnRlcmJlZ2luXCIsXHJcbiAgICAgICAgICAgICAgICBuZXdOb2RlLmFzTm9kZSgpXHJcbiAgICAgICAgICAgICAgKTsqL1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgcmV0dXJuIGNoaWxkVk5vZGU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zb2xlLmxvZyhcIjo6OlwiLCB7IGNoaWxkIH0pO1xyXG5cclxuICAgICAgICBjb25zdCBub2RlID0ge1xyXG4gICAgICAgICAgdGFnOiBcIl9fVEVYVF9OT0RFX19cIixcclxuICAgICAgICAgIHR5cGU6IFwiVGV4dE5vZGVcIixcclxuICAgICAgICAgIHRhZzI6IFwiY2hpbGRyZW4gVGV4dCBub2RlXCIsXHJcbiAgICAgICAgICBub2RlOiBudWxsLFxyXG4gICAgICAgICAgcGFyZW50OiB2Tm9kZSxcclxuICAgICAgICAgIHByb3BzOiB7XHJcbiAgICAgICAgICAgIGNvbnRlbnQ6IGNoaWxkLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIGNoaWxkcmVuOiBbXSxcclxuICAgICAgICAgIGFzTm9kZSgpIHtcclxuICAgICAgICAgICAgY29uc3QgdGV4dE5vZGUgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjaGlsZCk7XHJcbiAgICAgICAgICAgIG5vZGUubm9kZSA9IHRleHROb2RlO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyh0ZXh0Tm9kZSwgbm9kZSk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gdGV4dE5vZGU7XHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgLy8gdG9wIGxldmVsIHZub2RlXHJcbiAgICAgICAgICBkaWZmQW5kUGF0Y2gobmV3Tm9kZTogVk5vZGUpIHtcclxuICAgICAgICAgICAgLy8gQFRPRE8gYm90aCB0ZXh0P1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImNoYW5nZT8gXCIsIG5ld05vZGUudGFnLCBub2RlLnRhZyk7XHJcblxyXG4gICAgICAgICAgICBpZiAobmV3Tm9kZS50YWcgIT09IG5vZGUudGFnKSB7XHJcbiAgICAgICAgICAgICAgY29uc3QgYXNOb2RlID0gbmV3Tm9kZS5hc05vZGUoKTtcclxuICAgICAgICAgICAgICBjb25zb2xlLmxvZyh7IGFzTm9kZSB9KTtcclxuXHJcbiAgICAgICAgICAgICAgaWYgKGFzTm9kZSkge1xyXG4gICAgICAgICAgICAgICAgbm9kZS5ub2RlLnJlcGxhY2VXaXRoKGFzTm9kZSk7XHJcbiAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIG5vZGUubm9kZS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKG5vZGUubm9kZSk7XHJcbiAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGNoaWxkICE9PSBuZXdOb2RlLnByb3BzLmNvbnRlbnQpXHJcbiAgICAgICAgICAgICAgbm9kZS5ub2RlLm5vZGVWYWx1ZSA9IG5ld05vZGUucHJvcHMuY29udGVudDtcclxuICAgICAgICAgICAgbmV3Tm9kZS5ub2RlID0gbm9kZS5ub2RlO1xyXG4gICAgICAgICAgICAvLyBlbHNlID9cclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgcmV0dXJuIG5vZGU7XHJcbiAgICAgIH0pLFxyXG5cclxuICAgICAgYXNOb2RlKCkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiYXNWTm9kZS5hc05vZGVcIiwgeyB0YWcsIHByb3BzLCB2Tm9kZSB9KTtcclxuXHJcbiAgICAgICAgY29uc3Qgbm9kZSA9IGFzTm9kZSh0YWcsIGF0dHIsIHZOb2RlLmNoaWxkcmVuKVswXTtcclxuICAgICAgICB2Tm9kZS5ub2RlID0gbm9kZTtcclxuICAgICAgICBjb25zb2xlLmxvZyh7IG5vZGUgfSk7XHJcblxyXG4gICAgICAgIHJldHVybiBub2RlO1xyXG4gICAgICB9LFxyXG4gICAgICAvLyB0byBsZXZlbFxyXG4gICAgICBkaWZmQW5kUGF0Y2gobmV3Vk5vZGU6IFZOb2RlKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJkaWZmQW5kUGF0Y2hcIik7XHJcblxyXG4gICAgICAgIHJldHVybiBkaWZmQW5kUGF0Y2godk5vZGUsIG5ld1ZOb2RlKTtcclxuXHJcbiAgICAgICAgLy8gPyB3aGVuP1xyXG4gICAgICAgIGlmICghbmV3Vk5vZGUpIHtcclxuICAgICAgICAgICh2Tm9kZS5ub2RlISBhcyBIVE1MRWxlbWVudCkucGFyZW50Tm9kZSEucmVtb3ZlQ2hpbGQoXHJcbiAgICAgICAgICAgIHZOb2RlLm5vZGUhIGFzIEhUTUxFbGVtZW50XHJcbiAgICAgICAgICApO1xyXG4gICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKG5ld1ZOb2RlLnRhZyAhPT0gdGFnKSB7XHJcbiAgICAgICAgICBjb25zdCBuZXdOb2RlID0gbmV3Vk5vZGUuYXNOb2RlKCk7XHJcbiAgICAgICAgICBpZiAodk5vZGUubm9kZSkge1xyXG4gICAgICAgICAgICBpZiAobmV3Tm9kZSkgKHZOb2RlLm5vZGUhIGFzIEhUTUxFbGVtZW50KS5yZXBsYWNlV2l0aChuZXdOb2RlKTtcclxuICAgICAgICAgICAgZWxzZSB2Tm9kZS5ub2RlLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQodk5vZGUubm9kZSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBAVE9ETzogaWYgc3BlY2lhbCB0YWdzXHJcblxyXG4gICAgICAgIC8vIHVwZGF0ZSBwcm9wcyBmb3JtIG5ldyBub2RlXHJcbiAgICAgICAgT2JqZWN0LmVudHJpZXMobmV3Vk5vZGUucHJvcHMpXHJcbiAgICAgICAgICAuZmlsdGVyKChbaywgdl0pID0+IHByb3BzW2tdICE9PSB2KVxyXG4gICAgICAgICAgLmZvckVhY2goKFtrZXksIHZhbHVlXSkgPT4ge1xyXG4gICAgICAgICAgICBpZiAodmFsdWUgPT09IHRydWUpIHZOb2RlLm5vZGUuc2V0QXR0cmlidXRlKGtleSwgXCJcIik7XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKHZhbHVlID09PSBudWxsIHx8IHZhbHVlID09PSB1bmRlZmluZWQgfHwgdmFsdWUgPT09IGZhbHNlKVxyXG4gICAgICAgICAgICAgIHZOb2RlLm5vZGUucmVtb3ZlQXR0cmlidXRlKGtleSk7XHJcbiAgICAgICAgICAgIGVsc2Ugdk5vZGUubm9kZS5zZXRBdHRyaWJ1dGUoa2V5LCB2YWx1ZSk7XHJcbiAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy8gcmVtb3ZlIG9sZCwgb2Jzb2xhdGUgYXR0cmlidXRlc1xyXG4gICAgICAgIE9iamVjdC5lbnRyaWVzKHZOb2RlLnByb3BzKVxyXG4gICAgICAgICAgLmZpbHRlcigoW2ssIHZdKSA9PiAhbmV3Vk5vZGUucHJvcHMuaGFzT3duUHJvcGVydHkoaykpXHJcbiAgICAgICAgICAuZm9yRWFjaCgoW2tleSwgdmFsdWVdKSA9PiB7XHJcbiAgICAgICAgICAgIHZOb2RlLm5vZGUucmVtb3ZlQXR0cmlidXRlKGtleSk7XHJcbiAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgbmV3Vk5vZGUubm9kZSA9IHZOb2RlLm5vZGU7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJub2RlIHVwZGF0ZVwiLCBuZXdWTm9kZSwgdk5vZGUpO1xyXG5cclxuICAgICAgICAvLyBAVE9ETzogcHJvcHMgbm90IGF0dHJpYnV0ZXNcclxuXHJcbiAgICAgICAgLy8gY2hpbGRyZW5cclxuICAgICAgICB2Tm9kZS5jaGlsZHJlbi5mb3JFYWNoKChjaGlsZCwgaXgpID0+XHJcbiAgICAgICAgICBjaGlsZC5kaWZmQW5kUGF0Y2gobmV3Vk5vZGUuY2hpbGRyZW5baXhdKVxyXG4gICAgICAgICk7XHJcbiAgICAgICAgLy8gQFRPRE86IG5ldyBjaGlsZHJlblxyXG4gICAgICAgIGZvciAobGV0IGkgPSB2Tm9kZS5jaGlsZHJlbi5sZW5ndGg7IGkgPCBuZXdWTm9kZS5jaGlsZHJlbi5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgdk5vZGUubm9kZS5pbnNlcnRBZGphY2VudEVsZW1lbnQoXHJcbiAgICAgICAgICAgIFwiYmVmb3JlZW5kXCIsXHJcbiAgICAgICAgICAgIG5ld1ZOb2RlLmNoaWxkcmVuW2ldLmFzTm9kZSgpXHJcbiAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuICAgICAgfSxcclxuICAgIH0pO1xyXG4gIH0gZWxzZSB7XHJcbiAgICBPYmplY3QuYXNzaWduKHZOb2RlLCB7XHJcbiAgICAgIHRhZyxcclxuICAgICAgdHlwZTogXCJGcmFnbWVudFwiLCAvLyB3aGVyZSBjb21lcyBGcmFnZW1udD9cclxuICAgICAgdGFnMjogXCJhc1ZOb2RlIC0gbm9ybWFsIHJldHVybiBGcmFnbWVudFwiLFxyXG4gICAgICBub2RlOiBudWxsLFxyXG4gICAgICBjaGlsZHJlbjogY2hpbGRyZW4uZmxhdCgpLm1hcCgoY2hpbGQpID0+IHtcclxuICAgICAgICBpZiAoY2hpbGQgaW5zdGFuY2VvZiBKc3hOb2RlKSB7XHJcbiAgICAgICAgICBjb25zdCBjaGlsZFZOb2RlID0gY2hpbGQuYXNWTm9kZSgpO1xyXG4gICAgICAgICAgY2hpbGRWTm9kZS5wYXJlbnQgPSB2Tm9kZTtcclxuICAgICAgICAgIHJldHVybiBjaGlsZFZOb2RlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoY2hpbGQgaW5zdGFuY2VvZiBOb2RlKSB7XHJcbiAgICAgICAgICBjb25zdCBub2RlID0ge1xyXG4gICAgICAgICAgICB0YWc6IFwiX19OT0RFX19cIixcclxuICAgICAgICAgICAgcHJvcHM6IHtcclxuICAgICAgICAgICAgICBjb250ZW50OiBjaGlsZCxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgcGFyZW50OiB2Tm9kZSxcclxuICAgICAgICAgICAgY2hpbGRyZW46IFtdLFxyXG4gICAgICAgICAgICBhc05vZGUoKSB7XHJcbiAgICAgICAgICAgICAgbm9kZS5ub2RlID0gY2hpbGQ7XHJcbiAgICAgICAgICAgICAgcmV0dXJuIGNoaWxkO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBkaWZmQW5kUGF0Y2goKSB7XHJcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJfX05PREVfXyBkaWZmQW5kUGF0Y2hcIiwgY2hpbGQpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICByZXR1cm4gbm9kZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiQEAgbWFwXCIsIHsgY2hpbGQgfSk7XHJcblxyXG4gICAgICAgIGlmIChjaGlsZCA9PT0gbnVsbCB8fCBjaGlsZCA9PT0gZmFsc2UgfHwgY2hpbGQgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgY29uc3QgY2hpbGRWTm9kZTogVk5vZGUgPSB7XHJcbiAgICAgICAgICAgIHRhZzogXCJfX05VTExfX1wiLFxyXG4gICAgICAgICAgICB0eXBlOiBcIk51bGxcIixcclxuICAgICAgICAgICAgdGFnMjogXCJjaGlsZHJlbiBudWxsIG5vZGVcIixcclxuICAgICAgICAgICAgbm9kZTogbnVsbCxcclxuICAgICAgICAgICAgcGFyZW50OiB2Tm9kZSxcclxuICAgICAgICAgICAgcHJvcHM6IHt9LFxyXG4gICAgICAgICAgICBjaGlsZHJlbjogW10sXHJcbiAgICAgICAgICAgIGFzTm9kZSgpIHtcclxuICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZGlmZkFuZFBhdGNoKG5ld05vZGU6IFZOb2RlKSB7XHJcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJkaWZmLUFuZFBhdGNoLCBjaGlsZCBub2RlIHdhcyBudWxsXCIsIG5ld05vZGUpO1xyXG5cclxuICAgICAgICAgICAgICBpZiAobmV3Tm9kZS50YWcgPT09IFwiX19OVUxMX19cIikgcmV0dXJuO1xyXG4gICAgICAgICAgICAgIGNvbnN0IG4gPSBuZXdOb2RlLmFzTm9kZSgpO1xyXG4gICAgICAgICAgICAgIC8vIEBUT0RPOiBmaW5kIGl0ZW0gYmVmb3JlXHJcbiAgICAgICAgICAgICAgLy92Tm9kZS5ub2RlXHJcbiAgICAgICAgICAgICAgY29uc3QgbmV3Tm9kZUluZGV4ID0gbmV3Tm9kZS5wYXJlbnQuY2hpbGRyZW4uaW5kZXhPZihuZXdOb2RlKTtcclxuICAgICAgICAgICAgICBjb25zdCBzaWJsaW5ncyA9IG5ld05vZGUucGFyZW50LmNoaWxkcmVuXHJcbiAgICAgICAgICAgICAgICAuc2xpY2UoMCwgbmV3Tm9kZUluZGV4KVxyXG4gICAgICAgICAgICAgICAgLnJldmVyc2UoKTtcclxuICAgICAgICAgICAgICBjb25zdCBzaWJsaW5nQmVmb3JlID0gc2libGluZ3MuZmluZCgobjogVk5vZGUpID0+IG4ubm9kZSk7XHJcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coeyBzaWJsaW5nQmVmb3JlLCBzaWJsaW5ncywgbmV3Tm9kZUluZGV4LCBuZXdOb2RlIH0pO1xyXG5cclxuICAgICAgICAgICAgICBpZiAoc2libGluZ0JlZm9yZSkge1xyXG4gICAgICAgICAgICAgICAgc2libGluZ0JlZm9yZS5ub2RlLmluc2VydEFkamFjZW50RWxlbWVudChcImFmdGVyZW5kXCIsIG4pO1xyXG4gICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB2Tm9kZS5ub2RlLmluc2VydEFkamFjZW50RWxlbWVudChcImFmdGVyYmVnaW5cIiwgbik7XHJcbiAgICAgICAgICAgICAgICAvKihuZXdOb2RlLnBhcmVudC5ub2RlIGFzIEhUTUxFbGVtZW50KS5pbnNlcnRBZGphY2VudEVsZW1lbnQoXHJcbiAgICAgICAgICAgICAgICAgIFwiYWZ0ZXJiZWdpblwiLFxyXG4gICAgICAgICAgICAgICAgICBuZXdOb2RlLmFzTm9kZSgpXHJcbiAgICAgICAgICAgICAgICApOyovXHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICByZXR1cm4gY2hpbGRWTm9kZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiOjo6XCIsIHsgY2hpbGQgfSk7XHJcblxyXG4gICAgICAgIGNvbnN0IG5vZGUgPSB7XHJcbiAgICAgICAgICB0YWc6IFwiX19URVhUX05PREVfX1wiLFxyXG4gICAgICAgICAgdHlwZTogXCJUZXh0Tm9kZVwiLFxyXG4gICAgICAgICAgdGFnMjogXCJjaGlsZHJlbiBUZXh0IG5vZGVcIixcclxuICAgICAgICAgIG5vZGU6IG51bGwsXHJcbiAgICAgICAgICBwYXJlbnQ6IHZOb2RlLFxyXG4gICAgICAgICAgcHJvcHM6IHtcclxuICAgICAgICAgICAgY29udGVudDogY2hpbGQsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgY2hpbGRyZW46IFtdLFxyXG4gICAgICAgICAgYXNOb2RlKCkge1xyXG4gICAgICAgICAgICBjb25zdCB0ZXh0Tm9kZSA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNoaWxkKTtcclxuICAgICAgICAgICAgbm9kZS5ub2RlID0gdGV4dE5vZGU7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHRleHROb2RlLCBub2RlKTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiB0ZXh0Tm9kZTtcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICAvLyB0b3AgbGV2ZWwgdm5vZGVcclxuICAgICAgICAgIGRpZmZBbmRQYXRjaChuZXdOb2RlOiBWTm9kZSkge1xyXG4gICAgICAgICAgICAvLyBAVE9ETyBib3RoIHRleHQ/XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiY2hhbmdlPyBcIiwgbmV3Tm9kZS50YWcsIG5vZGUudGFnKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChuZXdOb2RlLnRhZyAhPT0gbm9kZS50YWcpIHtcclxuICAgICAgICAgICAgICBjb25zdCBhc05vZGUgPSBuZXdOb2RlLmFzTm9kZSgpO1xyXG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKHsgYXNOb2RlIH0pO1xyXG5cclxuICAgICAgICAgICAgICBpZiAoYXNOb2RlKSB7XHJcbiAgICAgICAgICAgICAgICBub2RlLm5vZGUucmVwbGFjZVdpdGgoYXNOb2RlKTtcclxuICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgbm9kZS5ub2RlLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQobm9kZS5ub2RlKTtcclxuICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoY2hpbGQgIT09IG5ld05vZGUucHJvcHMuY29udGVudClcclxuICAgICAgICAgICAgICBub2RlLm5vZGUubm9kZVZhbHVlID0gbmV3Tm9kZS5wcm9wcy5jb250ZW50O1xyXG4gICAgICAgICAgICBuZXdOb2RlLm5vZGUgPSBub2RlLm5vZGU7XHJcbiAgICAgICAgICAgIC8vIGVsc2UgP1xyXG4gICAgICAgICAgfSxcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICByZXR1cm4gbm9kZTtcclxuICAgICAgfSksXHJcblxyXG4gICAgICBhc05vZGUoKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJhc1ZOb2RlLmFzTm9kZVwiLCB7IHRhZywgcHJvcHMsIHZOb2RlIH0pO1xyXG5cclxuICAgICAgICBjb25zdCBub2RlID0gYXNOb2RlKHVuZGVmaW5lZCwge30sIHZOb2RlLmNoaWxkcmVuKVswXTtcclxuICAgICAgICAvLyB2Tm9kZS5ub2RlID0gbm9kZTtcclxuICAgICAgICBjb25zb2xlLmxvZyh7IG5vZGUgfSk7XHJcblxyXG4gICAgICAgIHJldHVybiBub2RlO1xyXG4gICAgICB9LFxyXG4gICAgICAvLyB0byBsZXZlbFxyXG4gICAgICBkaWZmQW5kUGF0Y2gobmV3Vk5vZGU6IFZOb2RlKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJkaWZmQW5kUGF0Y2hcIik7XHJcblxyXG4gICAgICAgIHJldHVybiBkaWZmQW5kUGF0Y2godk5vZGUsIG5ld1ZOb2RlKTtcclxuICAgICAgfSxcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIHZOb2RlO1xyXG59XHJcblxyXG4vKipcclxuICogY29udmVydHMgcHJhZ21hIG9iamVjdCB0byBodG1sIHN0cmluZ1xyXG4gKiBqc3hzIGlzIGFsd2F5cyBjYWxsZWQgd2hlbiBlbGVtZW50IGhhcyBtb3JlIHRoYW4gb25lIGNoaWxkXHJcbiAqXHJcbiAqIEBwYXJhbSB7c3RyaW5nIHwgRnVuY3Rpb259IHRhZyAtIHRhZyBuYW1lIG9yIHRhZyBjbGFzc1xyXG4gKiBAcGFyYW0ge09iamVjdCB8IG51bGx9IHByb3BzIC0gcHJvcHMgZm9yIHRoZSB0YWdcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBqc3hzKFxyXG4gIHRhZzogc3RyaW5nIHwgRnVuY3Rpb24sXHJcbiAgcHJvcHM6IEpzeFByb3BzXHJcbik6IEpzeE5vZGVJbnRlcmZhY2Uge1xyXG4gIGxldCBub2RlOiBOb2RlO1xyXG4gIGxldCBqc3hOb2RlczogSnN4Tm9kZUludGVyZmFjZVtdO1xyXG4gIHByb3BzLmNoaWxkcmVuID0gcHJvcHMuY2hpbGRyZW4uZmxhdCgpOyAvLyBAVE9ETzogZG9jXHJcblxyXG4gIC8vIGlmIHJlZiBwcm9wIGlzIHByb3ZpZGVkLCBtZW1vcml6ZSBhbmQgcmVtb3ZlIGZyb20gdGhlIGh0bWwgZ2VuZXJhdGlvbiBwcm9jZXNzXHJcbiAgY29uc3QgcmVmOiBGdW5jdGlvbiB8IG51bGwgPVxyXG4gICAgdHlwZW9mIHByb3BzLnJlZiA9PT0gXCJmdW5jdGlvblwiID8gcHJvcHMucmVmIDogbnVsbDtcclxuICBpZiAocmVmKSBkZWxldGUgcHJvcHMucmVmO1xyXG5cclxuICByZXR1cm4gbmV3IChjbGFzcyBleHRlbmRzIEpzeE5vZGUgaW1wbGVtZW50cyBKc3hOb2RlSW50ZXJmYWNlIHtcclxuICAgIHRvU3RyaW5nKCkge1xyXG4gICAgICByZXR1cm4gYXNIdG1sU3RyaW5nKHRhZywgdGhpcy5wcm9wcyk7XHJcbiAgICB9XHJcblxyXG4gICAgYXNOb2RlKCkge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJkZXByZWNhdGVkIGpzeHNcIik7XHJcbiAgICAgIFtub2RlLCBqc3hOb2Rlc10gPSBhc05vZGUodGFnLCB0aGlzLnByb3BzKTtcclxuXHJcbiAgICAgIHJldHVybiBub2RlO1xyXG4gICAgfVxyXG4gICAgYXNWTm9kZSgpIHtcclxuICAgICAgcmV0dXJuIGFzVk5vZGUodGFnLCB0aGlzLnByb3BzKTtcclxuICAgIH1cclxuXHJcbiAgICBbX2NhbGxSZWZzXSgpIHtcclxuICAgICAgaWYgKHJlZiAmJiBub2RlKSByZWYobm9kZSk7XHJcblxyXG4gICAgICBpZiAodHlwZW9mIHRhZyA9PT0gXCJmdW5jdGlvblwiKSB7XHJcbiAgICAgICAganN4Tm9kZXMuZm9yRWFjaCgobm9kZUl0ZW0pID0+IG5vZGVJdGVtW19jYWxsUmVmc10oKSk7XHJcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5wcm9wcy5jaGlsZHJlbikge1xyXG4gICAgICAgIHRoaXMucHJvcHMuY2hpbGRyZW5cclxuICAgICAgICAgIC5mbGF0KClcclxuICAgICAgICAgIC5maWx0ZXIoKGNoaWxkKSA9PiBjaGlsZCBpbnN0YW5jZW9mIEpzeE5vZGUpXHJcbiAgICAgICAgICAuZm9yRWFjaCgoY2hpbGQpID0+IChjaGlsZCBhcyBKc3hOb2RlSW50ZXJmYWNlKVtfY2FsbFJlZnNdKCkpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSkocHJvcHMpO1xyXG59XHJcblxyXG4vKipcclxuICogY29udmVydHMgdGhlIGZyYWdtZW50cyBvYmplY3QgdG8gbm9kZXNcclxuICpcclxuICogQHBhcmFtIHtPYmplY3R9IHByb3BzXHJcbiAqIEBwYXJhbSB7QXJyYXl9IHByb3BzLmNoaWxkcmVuIC0gY2hpbGQgZWxlbWVudHMgaW4gdGhlIGZyYWdtZW50XHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gRnJhZ21lbnQocHJvcHM6IEpzeFByb3BzKSB7XHJcbiAgcmV0dXJuIG5ldyAoY2xhc3MgZXh0ZW5kcyBKc3hOb2RlIGltcGxlbWVudHMgSnN4Tm9kZUludGVyZmFjZSB7XHJcbiAgICB0b1N0cmluZygpIHtcclxuICAgICAgcmV0dXJuIHRoaXMucHJvcHMuY2hpbGRyZW5cclxuICAgICAgICAuZmxhdCgpXHJcbiAgICAgICAgLmZpbHRlcih0cnV0aHkpXHJcbiAgICAgICAgLm1hcCgoY2hpbGQpID0+XHJcbiAgICAgICAgICBjaGlsZCBpbnN0YW5jZW9mIE5vZGVcclxuICAgICAgICAgICAgPyBnZXRPdXRlckh0bWwoY2hpbGQpXHJcbiAgICAgICAgICAgIDogdHlwZW9mIGNoaWxkID09PSBcIm9iamVjdFwiXHJcbiAgICAgICAgICAgID8gY2hpbGQudG9TdHJpbmcoKVxyXG4gICAgICAgICAgICA6IHNhbml0aXplKGNoaWxkKVxyXG4gICAgICAgIClcclxuICAgICAgICAuam9pbihcIlwiKTtcclxuICAgIH1cclxuXHJcbiAgICBhc05vZGUoKSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcihcImRlcHJlY2F0ZWQgZnJhZ21lbnRcIik7XHJcbiAgICAgIGNvbnN0IGZyYWdtZW50cyA9IHRoaXMucHJvcHMuY2hpbGRyZW5cclxuICAgICAgICAuZmxhdCgpXHJcbiAgICAgICAgLmZpbHRlcih0cnV0aHkpXHJcbiAgICAgICAgLm1hcCgoaXRlbSkgPT5cclxuICAgICAgICAgIGl0ZW0gaW5zdGFuY2VvZiBOb2RlXHJcbiAgICAgICAgICAgID8gaXRlbVxyXG4gICAgICAgICAgICA6IGl0ZW0gaW5zdGFuY2VvZiBKc3hOb2RlXHJcbiAgICAgICAgICAgID8gaXRlbS5hc05vZGUoKVxyXG4gICAgICAgICAgICA6IGl0ZW1cclxuICAgICAgICApO1xyXG5cclxuICAgICAgY29uc3QgZG9jdW1lbnRGcmFnbWVudCA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcclxuXHJcbiAgICAgIGRvY3VtZW50RnJhZ21lbnQuYXBwZW5kKC4uLmZyYWdtZW50cyk7XHJcbiAgICAgIHJldHVybiBkb2N1bWVudEZyYWdtZW50O1xyXG4gICAgfVxyXG5cclxuICAgIGFzVk5vZGUoKSB7XHJcbiAgICAgIHJldHVybiBhc1ZOb2RlKC8qXCJfX0ZyYWdtZW50X19cIiovIHVuZGVmaW5lZCwgdGhpcy5wcm9wcyk7XHJcbiAgICB9XHJcblxyXG4gICAgW19jYWxsUmVmc10oKSB7XHJcbiAgICAgIHRoaXMucHJvcHMuY2hpbGRyZW5cclxuICAgICAgICAuZmlsdGVyKChjaGlsZCkgPT4gY2hpbGQgaW5zdGFuY2VvZiBKc3hOb2RlKVxyXG4gICAgICAgIC5mb3JFYWNoKChjaGlsZCkgPT4gKGNoaWxkIGFzIEpzeE5vZGVJbnRlcmZhY2UpW19jYWxsUmVmc10oKSk7XHJcbiAgICB9XHJcbiAgfSkocHJvcHMpO1xyXG59XHJcblxyXG4vLyBqc3ggaXMgY2FsbGVkIHdoZW4gdGhlIGVsZW1lbnQgaGFzIG9uZSBvciB6ZXJvIGNoaWxkcmVuXHJcbmV4cG9ydCBmdW5jdGlvbiBqc3goXHJcbiAgdGFnOiBzdHJpbmcgfCBGdW5jdGlvbixcclxuICBwcm9wczogQXR0cmlidXRlcyAmXHJcbiAgICBTcGVjaWFsQXR0cmlidXRlcyAmIHsgY2hpbGRyZW4/OiBzdHJpbmcgfCBOb2RlIHwgSnN4Tm9kZUludGVyZmFjZSB9XHJcbik6IEpzeE5vZGVJbnRlcmZhY2Uge1xyXG4gIC8vIEB0cy1pZ25vcmUgLSB3cmFwcGluZyB0aGUgY2hpbGRyZW4gYXMgYXJyYXkgdG8gcmUtdXNlIGpzeHMgbWV0aG9kXHJcbiAgcHJvcHMuY2hpbGRyZW4gPSBwcm9wcy5oYXNPd25Qcm9wZXJ0eShcImNoaWxkcmVuXCIpID8gW3Byb3BzLmNoaWxkcmVuXSA6IFtdO1xyXG5cclxuICByZXR1cm4ganN4cyh0YWcsIChwcm9wcyBhcyB1bmtub3duKSBhcyBKc3hQcm9wcyk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiByZW5kZXIgdGhlIGdpdmVuIG1hcmt1cCBpbnRvIHRoZSBnaXZlbiBkb20gbm9kZVxyXG4gKlxyXG4gKiBAcGFyYW0ge3N0cmluZ3xIVE1MRWxlbWVudHxKU1h9IG1hcmt1cCAtIGh0bWwgYXMgc3RyaW5nLCBodG1sIGVsZW1lbnQgb3IganN4IHRlbXBsYXRlXHJcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGRvbU5vZGUgLSBjb250YWluZXIgZm9yIHRoZSB0ZW1wbGF0ZSB0byBiZSByZW5kZXJlZCBpbnRvXHJcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW2FwcGVuZD1mYWxzZV0gLSBzaG91bGQgdGhlIHByb3ZpZGVkIG1hcmt1cCBiZSBhcHBlbmRlZCB0byB0aGUgZXhpc3RpbmcgbWFya3VwLCBvciBkZWZhdWx0IHJlcGxhY2UgaXRcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiByZW5kZXIoXHJcbiAgbWFya3VwOiBzdHJpbmcgfCBIVE1MRWxlbWVudCB8IEpzeE5vZGVJbnRlcmZhY2UsIC8vIEBUT0RPOiBzcGVjaWZpYyBzdXBwb3J0IGZvciBUZW1wbGF0ZT8gKC5jb250ZW50LmNsb25lKVxyXG4gIGRvbU5vZGU6IEhUTUxFbGVtZW50LFxyXG4gIGFwcGVuZDogYm9vbGVhbiA9IGZhbHNlXHJcbikge1xyXG4gIEFycmF5LmZyb20oZG9jdW1lbnQuYm9keS5xdWVyeVNlbGVjdG9yQWxsKFwiKlwiKSkuZm9yRWFjaChcclxuICAgIChlbCkgPT4gKGVsLnN0eWxlLmJhY2tncm91bmQgPSBcIiNjY2ZmY2NcIilcclxuICApO1xyXG5cclxuICByZWZzVG9DYWxsLnNwbGljZSgwKTtcclxuXHJcbiAgY29uc3QgaXNSZVJlbmRlciA9IHJlbmRlcmVkVlRyZWVzLmhhcyhkb21Ob2RlKTtcclxuICBpZiAoIWFwcGVuZCAmJiAhaXNSZVJlbmRlcikgZG9tTm9kZS5pbm5lckhUTUwgPSBcIlwiO1xyXG5cclxuICBpZiAodHlwZW9mIG1hcmt1cCA9PT0gXCJzdHJpbmdcIikge1xyXG4gICAgZG9tTm9kZS5pbnNlcnRBZGphY2VudEhUTUwoXCJiZWZvcmVlbmRcIiwgbWFya3VwKTsgLy8gc2FuaXRpemU/XHJcbiAgfSBlbHNlIGlmIChtYXJrdXAgaW5zdGFuY2VvZiBOb2RlKSB7XHJcbiAgICBkb21Ob2RlLmluc2VydEFkamFjZW50RWxlbWVudChcImJlZm9yZWVuZFwiLCBtYXJrdXApO1xyXG4gIH0gZWxzZSBpZiAobWFya3VwIGluc3RhbmNlb2YgSnN4Tm9kZSkge1xyXG4gICAgc3ZnQ29udGV4dCA9IGZhbHNlO1xyXG5cclxuICAgIC8vIFJvb3RWTm9kZVxyXG4gICAgY29uc3QgdlRyZWU6IFJvb3RWTm9kZSA9IHt9IGFzIGFueTtcclxuICAgIE9iamVjdC5hc3NpZ24odlRyZWUsIHtcclxuICAgICAgdHlwZTogXCJSb290XCIsXHJcbiAgICAgIG5vZGU6IGRvbU5vZGUsXHJcbiAgICAgIHRhZzogbnVsbCxcclxuICAgICAgcGFyZW50OiBudWxsLFxyXG4gICAgICBjaGlsZHJlbjogW21hcmt1cC5hc1ZOb2RlKCldLFxyXG4gICAgICBhc05vZGUoKSB7XHJcbiAgICAgICAgcmV0dXJuIHZUcmVlLmNoaWxkcmVuWzBdLmFzTm9kZSgpO1xyXG4gICAgICB9LFxyXG4gICAgICB0b1N0cmluZygpIHtcclxuICAgICAgICByZXR1cm4gdlRyZWUuY2hpbGRyZW5bMF0udG9TdHJpbmcoKTtcclxuICAgICAgfSxcclxuICAgIH0pO1xyXG4gICAgdlRyZWUuY2hpbGRyZW5bMF0ucGFyZW50ID0gdlRyZWU7XHJcblxyXG4gICAgY29uc29sZS5sb2coXCIjIyMjIyMjIyMjI1xcblwiLCBcInZUcmVlOlwiLCB2VHJlZSk7XHJcblxyXG4gICAgaWYgKGlzUmVSZW5kZXIpIHtcclxuICAgICAgY29uc29sZS5sb2coXCJpcyByZS1yZW5kZXJcIik7XHJcbiAgICAgIGNvbnN0IG9sZFZUcmVlID0gcmVuZGVyZWRWVHJlZXMuZ2V0KGRvbU5vZGUpO1xyXG5cclxuICAgICAgY29uc29sZS5sb2coXCIjIyMjIyMjIyMjI1xcblwiLCB7IG9sZFZUcmVlLCBuZXdWVHJlZTogdlRyZWUgfSk7XHJcblxyXG4gICAgICAvLyBkaWZmXHJcbiAgICAgIC8vb2xkVlRyZWUuZGlmZkFuZFBhdGNoKHZUcmVlKTtcclxuICAgICAgZGlmZkFuZFBhdGNoKG9sZFZUcmVlISwgdlRyZWUpO1xyXG5cclxuICAgICAgcmVuZGVyZWRWVHJlZXMuc2V0KGRvbU5vZGUsIHZUcmVlKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNvbnN0IGNvbnRlbnQgPSB2VHJlZS5hc05vZGUoKTtcclxuICAgICAgZG9tTm9kZS5hcHBlbmQoY29udGVudCk7XHJcbiAgICB9XHJcblxyXG4gICAgcmVuZGVyZWRWVHJlZXMuc2V0KGRvbU5vZGUsIHZUcmVlKTtcclxuXHJcbiAgICByZWZzVG9DYWxsLmZvckVhY2goKGNiKSA9PiBjYigpKTtcclxuXHJcbiAgICAvLy8vbWFya3VwW19jYWxsUmVmc10oKTtcclxuICB9IGVsc2Uge1xyXG4gICAgdGhyb3cgbmV3IEVycm9yKFwicmVuZGVyIG1ldGhvZCBjYWxsZWQgd2l0aCB3cm9uZyBhcmd1bWVudChzKVwiKTtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiByYXdIdG1sKGNvbnRlbnQ6IHN0cmluZyk6IEpzeE5vZGVJbnRlcmZhY2Uge1xyXG4gIHJldHVybiBuZXcgKGNsYXNzIGV4dGVuZHMgSnN4Tm9kZSBpbXBsZW1lbnRzIEpzeE5vZGVJbnRlcmZhY2Uge1xyXG4gICAgdG9TdHJpbmcoKSB7XHJcbiAgICAgIHJldHVybiBjb250ZW50O1xyXG4gICAgfVxyXG5cclxuICAgIGFzTm9kZSgpIHtcclxuICAgICAgY29uc3QgdGVtcGxhdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGVtcGxhdGVcIik7XHJcbiAgICAgIHRlbXBsYXRlLmlubmVySFRNTCA9IGNvbnRlbnQ7XHJcbiAgICAgIHJldHVybiB0ZW1wbGF0ZS5jb250ZW50O1xyXG4gICAgfVxyXG4gICAgYXNWTm9kZSgpIHtcclxuICAgICAgcmV0dXJuIHt9O1xyXG4gICAgfVxyXG5cclxuICAgIFtfY2FsbFJlZnNdKCkge1xyXG4gICAgICAvLyBub29wXHJcbiAgICB9XHJcbiAgfSkoe30gYXMgSnN4UHJvcHMpO1xyXG59XHJcblxyXG4vLyB2VHJlZVxyXG5cclxuLy8gZ290Y2hzYXM6XHJcbi8vIC0gc3R5bGVzIHdpbGwgb3ZlcnJpZGUgKGNvdWxkIGRvOiBzZXR0aW5nIGVhY2ggcnVsZSBpbmRpdmlkdWFsbHkpXHJcbiIsImltcG9ydCB7IHJlbmRlciwgcmF3SHRtbCB9IGZyb20gXCIuL2pzeC9qc3gtcnVudGltZVwiO1xyXG5cclxuY29uc3QgeHNzID0gXCI8aW1nIHNyYz14IG9uZXJyb3I9XFxcImFsZXJ0KCdYU1MgQXR0YWNrJylcXFwiPlwiOyAvL1wiPHNjcmlwdD5hbGVydCgnLS4tJyk8L3NjcmlwdD5cIjtcclxuXHJcbmZ1bmN0aW9uIFJURShwcm9wczogLyp7IHR4dCwgXCJvbi1jbGlja1wiOiBvbkNsaWNrIH0qLyB7XHJcbiAgdHh0OiBzdHJpbmc7XHJcbiAgcmVmPzogRnVuY3Rpb247XHJcbn0pIHtcclxuICBjb25zb2xlLmxvZyhcIm9uQ2xpY2tcIiwgcHJvcHNbXCJvbi1jbGlja1wiXSk7XHJcbiAgcmV0dXJuIChcclxuICAgIDxwIHJlZj17KGVsOiBIVE1MRWxlbWVudCkgPT4gY29uc29sZS5sb2coXCJteSBkaXYgOjpyZWY6OjMuMlwiLCBlbCl9PlxyXG4gICAgICB7cHJvcHMudHh0fVxyXG4gICAgPC9wPlxyXG4gICk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIEJ1dHRvbih7XHJcbiAgY2hpbGRyZW4sXHJcbiAgZGlzYWJsZWQsXHJcbn06IHtcclxuICBjaGlsZHJlbjogYW55O1xyXG4gIGRpc2FibGVkOiBib29sZWFuO1xyXG4gIHJlZj86IEZ1bmN0aW9uO1xyXG59KSB7XHJcbiAgcmV0dXJuIChcclxuICAgIDxidXR0b25cclxuICAgICAgZGlzYWJsZWQ9e2Rpc2FibGVkfVxyXG4gICAgICByZWY9eyhlbDogSFRNTEVsZW1lbnQpID0+IGNvbnNvbGUubG9nKFwibXkgYnV0dG9uIDo6cmVmOjoxXCIsIGVsKX1cclxuICAgID5cclxuICAgICAgPHNwYW4gcmVmPXsoZWw6IEhUTUxFbGVtZW50KSA9PiBjb25zb2xlLmxvZyhcIm15IGEgOjpyZWY6OjJcIiwgZWwpfT5hPC9zcGFuPlxyXG4gICAgICB7Y2hpbGRyZW59XHJcbiAgICAgIDw+XHJcbiAgICAgICAgPHNwYW4gcmVmPXsoZWw6IEhUTUxFbGVtZW50KSA9PiBjb25zb2xlLmxvZyhcIm15IGEgOjpyZWY6OjNcIiwgZWwpfT5cclxuICAgICAgICAgIGFcclxuICAgICAgICA8L3NwYW4+XHJcbiAgICAgIDwvPlxyXG4gICAgPC9idXR0b24+XHJcbiAgKTtcclxufVxyXG5cclxuZnVuY3Rpb24gcmVmbG9nKGVsOiBIVE1MRWxlbWVudCkge1xyXG4gIGNvbnNvbGUubG9nKFwibXkgaW5uZXIgZGl2OjpyZWY6OjhcIiwgZWwpO1xyXG59XHJcblxyXG4vKlxyXG5jb25zdCBtYXJrdXAgPSAoXHJcbiAgPD5cclxuICAgIDxkaXZcclxuICAgICAgY2xhc3M9XCJmb29cIlxyXG4gICAgICByZWY9eyhlbDogSFRNTEVsZW1lbnQpID0+IGNvbnNvbGUubG9nKFwibXkgZGl2IDo6cmVmOjo0XCIsIGVsKX1cclxuICAgIC8+XHJcbiAgICA8aW5wdXQgZGlzYWJsZWQ9e3RydWV9IGhpZGRlbj17ZmFsc2V9IC8+XHJcbiAgICA8QnV0dG9uXHJcbiAgICAgIGRpc2FibGVkPXt0cnVlfVxyXG4gICAgICByZWY9eyhlbDogSFRNTEVsZW1lbnQpID0+IGNvbnNvbGUubG9nKFwibXkgQlVUVE9OOjpyZWY6OjVcIiwgZWwpfVxyXG4gICAgPlxyXG4gICAgICB0ZXh0XHJcbiAgICAgIDxwb3B1cC1pbmZvXHJcbiAgICAgICAgcmVmPXsoZWw6IEhUTUxFbGVtZW50KSA9PiBjb25zb2xlLmxvZyhcInNwYW4gaW4gQlVUVE9OOjpyZWY6OjZcIiwgZWwpfVxyXG4gICAgICA+XHJcbiAgICAgICAgYmxhXHJcbiAgICAgIDwvcG9wdXAtaW5mbz5cclxuICAgIDwvQnV0dG9uPlxyXG4gICAgPFJURVxyXG4gICAgICB0eHQ9XCJsZSB0ZXh0XCJcclxuICAgICAgcmVmPXsoZWw6IEhUTUxFbGVtZW50KSA9PiBjb25zb2xlLmxvZyhcIm15IGRpdiA6OnJlZjo6My4xXCIsIGVsKX1cclxuICAgICAgb24tY2xpY2s9eyhlOiBIVE1MRWxlbWVudCkgPT4gY29uc29sZS5sb2coZSl9XHJcbiAgICAvPlxyXG4gICAge3hzc31cclxuICAgIHtyYXdIdG1sKGA8b2w+PGxpPnJhdyBodG1sPC9saT48L29sPmApfVxyXG4gICAgPGRpdlxyXG4gICAgICBjbGFzcz1cImJhbVwiXHJcbiAgICAgIHJlZj17KGVsOiBIVE1MRWxlbWVudCkgPT4gY29uc29sZS5sb2coXCJteSBkaXY6OnJlZjo6N1wiLCBlbCl9XHJcbiAgICA+XHJcbiAgICAgIDxkaXY+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cImJhclwiIG9uLWNsaWNrPXsoZSkgPT4gY29uc29sZS5sb2coZSl9IHJlZj17cmVmbG9nfT5cclxuICAgICAgICAgIGNsaWNrIE1FXHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPGRpdiBzdHlsZT17eyBvdXRsaW5lOiBcIjFweCBzb2xpZCByZWQ7XCIgfX0+XHJcbiAgICAgICAgICB7ZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNvbGRcIil9XHJcbiAgICAgICAgICB7bnVsbH1cclxuICAgICAgICAgIHtbMCwgMV0ubWFwKChuKSA9PiAoXHJcbiAgICAgICAgICAgIDxzcGFuPntufTwvc3Bhbj5cclxuICAgICAgICAgICkpfVxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICA8L2Rpdj5cclxuICAgIDwvZGl2PlxyXG4gIDwvPlxyXG4pO1xyXG5cclxuKi9cclxuXHJcbi8qXHJcbmNvbnN0IG1hcmt1cCA9IChcclxuICA8QnV0dG9uIGRpc2FibGVkPXt0cnVlfT5cclxuICAgICAgPGJvbGQgcmVmPXtyZWZsb2d9Pi0tSU5ORVItLTwvYm9sZD5cclxuICA8L0J1dHRvbj5cclxuKTsqL1xyXG4vKlxyXG5cclxuY29uc3QgbWFya3VwID0gKFxyXG4gIDxkaXYgY2xhc3M9XCJmb29cIiByZWY9eyhlbDogSFRNTEVsZW1lbnQpID0+IGNvbnNvbGUubG9nKFwibXkgZGl2OjpyZWY6OlwiLCBlbCl9PlxyXG4gICAgPGRpdj5cclxuICAgICAgPGRpdiBjbGFzcz1cImJhclwiIHJlZj17KGVsOiBIVE1MRWxlbWVudCkgPT4gY29uc29sZS5sb2coXCJteSBpbm5lciBkaXY6OnJlZjo6XCIsIGVsKX0gLz5cclxuICAgIDwvZGl2PlxyXG4gICAgPEJ1dHRvbiBkaXNhYmxlZD17dHJ1ZX0+PC9CdXR0b24+XHJcbiAgPC9kaXY+XHJcbik7XHJcbiovXHJcbi8qXHJcbmNvbnN0IG1hcmt1cCA9IChcclxuICA8YT5cclxuICAgIDxiPlxyXG4gICAgICA8YyBjbGFzcz1cImJhclwiIHJlZj17cmVmbG9nfSAvPlxyXG4gICAgPC9iPlxyXG4gIDwvYT5cclxuKTtcclxuKi9cclxuXHJcbmZ1bmN0aW9uIFNwYW4oeyBtb2RlIH06IHsgbW9kZTogYW55IH0pIHtcclxuICByZXR1cm4gbW9kZSA9PT0gMSA/IChcclxuICAgIDxkaXY+XHJcbiAgICAgIDxzcGFuIGlkPVwiaW5uZXJcIiBvbGQ9e3RydWV9PlxyXG4gICAgICAgIFNwYW4tQ29tcC0tb2xkXHJcbiAgICAgIDwvc3Bhbj5cclxuICAgICAgPGgzPnRvIGJlIHJlbW92ZWQ8L2gzPlxyXG4gICAgPC9kaXY+XHJcbiAgKSA6IChcclxuICAgIDxkaXY+XHJcbiAgICAgIDxwIGlkPVwiaW5uZXJcIiBuZXc9e3RydWV9PlxyXG4gICAgICAgIFNwYW4tQ29tcC0tbmV3c1xyXG4gICAgICA8L3A+XHJcbiAgICA8L2Rpdj5cclxuICApO1xyXG59XHJcblxyXG5mdW5jdGlvbiBDb21wKHsgbnVtIH0pIHtcclxuICBpZiAobnVtID09PSAxKSByZXR1cm4gbnVsbDtcclxuICByZXR1cm4gKFxyXG4gICAgPGRpdj5cclxuICAgICAgPHA+Y29tcDwvcD5cclxuICAgIDwvZGl2PlxyXG4gICk7XHJcbn1cclxuXHJcbmNvbnN0IG1hcmt1cDEgPSAobnVtOiBhbnkpID0+IChcclxuICA8ZGl2IGlkPVwib3V0ZXJcIiBkYXRhLWZvbz1cImJhclwiIGRhdGEtdmFyPXtudW19PlxyXG4gICAgPGgzPnNob3VsZCBnZXQgMiAtOiAzPC9oMz5cclxuICAgIHtudW0gPT09IDEgPyAoXHJcbiAgICAgIDx1bCBjbGFzcz1cInVsLWNsYXNzXCI+XHJcbiAgICAgICAgPGxpPlRleHQgMSA8L2xpPlxyXG4gICAgICAgIDxsaT5UZXh0IDIgPC9saT5cclxuICAgICAgPC91bD5cclxuICAgICkgOiAoXHJcbiAgICAgIDx1bCBjbGFzcz1cInVsLWNsYXNzXCI+XHJcbiAgICAgICAgPGxpPlRleHQgMyA8L2xpPlxyXG4gICAgICAgIDxsaT5UZXh0IDIgPC9saT5cclxuICAgICAgICA8bGk+VGV4dCAxIDwvbGk+XHJcbiAgICAgIDwvdWw+XHJcbiAgICApfVxyXG4gICAgPGgzPnNob3VsZCBnZXQgMyAtOiAyPC9oMz5cclxuICAgIHtudW0gPT09IDEgPyAoXHJcbiAgICAgIDx1bCBjbGFzcz1cInVsLWNsYXNzXCI+XHJcbiAgICAgICAgPGxpPlRleHQgMSA8L2xpPlxyXG4gICAgICAgIDxsaT5UZXh0IDIgPC9saT5cclxuICAgICAgICA8bGk+VGV4dCAzIDwvbGk+XHJcbiAgICAgIDwvdWw+XHJcbiAgICApIDogKFxyXG4gICAgICA8dWwgY2xhc3M9XCJ1bC1jbGFzc1wiPlxyXG4gICAgICAgIDxsaT5UZXh0IDEgPC9saT5cclxuICAgICAgICA8bGk+VGV4dCAyIDwvbGk+XHJcbiAgICAgIDwvdWw+XHJcbiAgICApfVxyXG4gICAge251bSA9PT0gMSA/IG51bGwgOiA8cD5uZXcgcmVuZGVyPC9wPn1cclxuICAgIDxkaXY+XHJcbiAgICAgIDxzcGFuPnNwYW4tY29udGVudDwvc3Bhbj5cclxuICAgIDwvZGl2PlxyXG4gICAgPFNwYW4gbW9kZT17bnVtfSAvPlxyXG4gICAgey8qZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNvbGRcIikqL31cclxuICAgIDw+RnJhZ21lbnQtaXRlbTwvPlxyXG4gICAgPHN2Z1xyXG4gICAgICB2aWV3Qm94PVwiMCAwIDMwMCAxMDBcIlxyXG4gICAgICB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCJcclxuICAgICAgc3Ryb2tlPVwicmVkXCJcclxuICAgICAgZmlsbD1cImdyZXlcIlxyXG4gICAgPlxyXG4gICAgICA8Y2lyY2xlIGN4PVwiNTBcIiBjeT1cIjUwXCIgcj1cIjQwXCIgLz5cclxuICAgICAgPGNpcmNsZSBjeD1cIjE1MFwiIGN5PVwiNTBcIiByPVwiNFwiIC8+XHJcblxyXG4gICAgICA8c3ZnIHZpZXdCb3g9XCIwIDAgMTAgMTBcIiB4PVwiMjAwXCIgd2lkdGg9XCIxMDBcIj5cclxuICAgICAgICA8Y2lyY2xlIGN4PVwiNVwiIGN5PVwiNVwiIHI9XCI0XCIgLz5cclxuICAgICAgPC9zdmc+XHJcbiAgICA8L3N2Zz5cclxuICA8L2Rpdj5cclxuKTtcclxuXHJcbmZ1bmN0aW9uIG1hcmt1cDIobnVtOiBhbnkpIHtcclxuICByZXR1cm4gKFxyXG4gICAgPGRpdiBpZD1cIm91dGVyXCI+XHJcbiAgICAgIDw+XHJcbiAgICAgICAgPD5cclxuICAgICAgICAgIDxwPm5lc3RlZCBmcmFnbWVudDwvcD5cclxuICAgICAgICA8Lz5cclxuICAgICAgPC8+XHJcbiAgICAgIDxoMT5zdGF0aWM8L2gxPlxyXG4gICAgICA8aDE+ZHluYW1pYyB2YWw6IHtudW19PC9oMT5cclxuICAgICAge251bSA9PT0gMSA/IDxoMT5vbGQ8L2gxPiA6IGZhbHNlfVxyXG4gICAgICB7bnVtID09PSAxID8gKFxyXG4gICAgICAgIDw+XHJcbiAgICAgICAgICA8aDE+ZnJhZyBvbGQ8L2gxPlxyXG4gICAgICAgICAgPHNwYW4+ZnJhZyBzcGFuIG9sZDwvc3Bhbj5cclxuICAgICAgICA8Lz5cclxuICAgICAgKSA6IChcclxuICAgICAgICA8aDE+ZnJhZyBuZXc8L2gxPlxyXG4gICAgICApfVxyXG4gICAgICA8Q29tcCBudW09e251bX0gLz5cclxuICAgIDwvZGl2PlxyXG4gICk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIG1hcmt1cDMobnVtOiBhbnkpIHtcclxuICByZXR1cm4gbnVtID09PSAxID8gKFxyXG4gICAgPGgxPlxyXG4gICAgICBvbGQtSGVhZGxpbmUge251bX1cclxuICAgICAgZm9vXHJcbiAgICAgIDw+XHJcbiAgICAgICAgPHA+b2xkLXNwYW4gQTwvcD5cclxuICAgICAgICA8cD4xPC9wPlxyXG4gICAgICAgIDxwPjI8L3A+XHJcbiAgICAgICAgPHA+MzwvcD5cclxuICAgICAgICA8c3ZnXHJcbiAgICAgICAgICB2aWV3Qm94PVwiMCAwIDMwMCAxMDBcIlxyXG4gICAgICAgICAgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiXHJcbiAgICAgICAgICBzdHJva2U9XCJyZWRcIlxyXG4gICAgICAgICAgZmlsbD1cImdyZXlcIlxyXG4gICAgICAgID5cclxuICAgICAgICAgIDxjaXJjbGUgY3g9XCI1MFwiIGN5PVwiNTBcIiByPVwiNDBcIiAvPlxyXG4gICAgICAgICAgPGNpcmNsZSBjeD1cIjE1MFwiIGN5PVwiNTBcIiByPVwiNFwiIC8+XHJcblxyXG4gICAgICAgICAgPHN2ZyB2aWV3Qm94PVwiMCAwIDEwIDEwXCIgeD1cIjIwMFwiIHdpZHRoPVwiMTAwXCI+XHJcbiAgICAgICAgICAgIDxjaXJjbGUgY3g9XCI1XCIgY3k9XCI1XCIgcj1cIjRcIiAvPlxyXG4gICAgICAgICAgPC9zdmc+XHJcbiAgICAgICAgPC9zdmc+XHJcbiAgICAgIDwvPlxyXG4gICAgICB7bnVsbH1cclxuICAgIDwvaDE+XHJcbiAgKSA6IChcclxuICAgIDxoMSBjbGFzcz1cImFcIj5cclxuICAgICAgbmV3LUhlYWRsaW5lIHtudW19XHJcbiAgICAgIHtmYWxzZX1cclxuICAgICAgPD5cclxuICAgICAgICA8cD5uZXctc3BhbiBBPC9wPlxyXG4gICAgICAgIDxwPjE8L3A+XHJcbiAgICAgICAge3VuZGVmaW5lZH1cclxuICAgICAgICA8cD4zPC9wPlxyXG4gICAgICAgIDxzdmdcclxuICAgICAgICAgIHZpZXdCb3g9XCIwIDAgMzAwIDEwMFwiXHJcbiAgICAgICAgICB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCJcclxuICAgICAgICAgIHN0cm9rZT1cInJlZFwiXHJcbiAgICAgICAgICBmaWxsPVwiZ3JleVwiXHJcbiAgICAgICAgPlxyXG4gICAgICAgICAgPGNpcmNsZSBjeD1cIjUwXCIgY3k9XCI1MFwiIHI9XCI0MFwiIC8+XHJcbiAgICAgICAgICA8Y2lyY2xlIGN4PVwiMTUwXCIgY3k9XCI1MFwiIHI9XCI0XCIgLz5cclxuXHJcbiAgICAgICAgICA8c3ZnIHZpZXdCb3g9XCIwIDAgMTAgMTBcIiB4PVwiMjAwXCIgd2lkdGg9XCIxMDBcIj5cclxuICAgICAgICAgICAgPGNpcmNsZSBjeD1cIjVcIiBjeT1cIjVcIiByPVwiNlwiIC8+XHJcbiAgICAgICAgICA8L3N2Zz5cclxuICAgICAgICA8L3N2Zz5cclxuICAgICAgICA8cD5uZXcgc3BhbiBCIGF0IGVuZDwvcD5cclxuICAgICAgPC8+XHJcbiAgICA8L2gxPlxyXG4gICk7XHJcbn1cclxuY29uc3Qgb2JqID0geyBhOiAxIH07XHJcblxyXG5mdW5jdGlvbiBtYXJrdXAobnVtOiBhbnkpIHtcclxuICBvYmouYSA9IG51bTtcclxuICByZXR1cm4gbnVtID09PSAxID8gKFxyXG4gICAgPGgxIG9iaj17b2JqfSBpZD17b2JqLmF9PlxyXG4gICAgICBvbGQtSGVhZGxpbmUge251bX1cclxuICAgIDwvaDE+XHJcbiAgKSA6IChcclxuICAgIDxoMSBvYmo9e29ian0gY2xhc3M9XCJhXCIgaWQ9e29iai5hfT5cclxuICAgICAgbmV3LUhlYWRsaW5lIHtudW19XHJcbiAgICA8L2gxPlxyXG4gICk7XHJcbn1cclxuXHJcbi8vY29uc29sZS5sb2cobWFya3VwKTtcclxuLy93aW5kb3cubWFya3VwID0gbWFya3VwO1xyXG5cclxuY2xhc3MgUG9wVXBJbmZvIGV4dGVuZHMgSFRNTEVsZW1lbnQge1xyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgLy8gQWx3YXlzIGNhbGwgc3VwZXIgZmlyc3QgaW4gY29uc3RydWN0b3JcclxuICAgIHN1cGVyKCk7XHJcblxyXG4gICAgLy8gd3JpdGUgZWxlbWVudCBmdW5jdGlvbmFsaXR5IGluIGhlcmVcclxuXHJcbiAgICBjb25zb2xlLmxvZyhcIiMjIyMjIyMjIyMjIyMjIyMjY3RvciBDRVwiKTtcclxuICB9XHJcblxyXG4gIGNvbm5lY3RlZENhbGxiYWNrKCkge1xyXG4gICAgY29uc29sZS5sb2coXCIjIyMjIyMjIyMjIyMjIyMjI0N1c3RvbSBzcXVhcmUgZWxlbWVudCBhZGRlZCB0byBwYWdlLlwiKTtcclxuICB9XHJcbn1cclxuXHJcbmN1c3RvbUVsZW1lbnRzLmRlZmluZShcInBvcHVwLWluZm9cIiwgUG9wVXBJbmZvKTtcclxuXHJcbi8vZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNvbGRcIikhLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBjb25zb2xlLmxvZyk7XHJcblxyXG4vL2RvY3VtZW50LmJvZHkuaW5uZXJIVE1MID0gbWFya3VwO1xyXG5yZW5kZXIobWFya3VwKDEpLCBkb2N1bWVudC5ib2R5KTtcclxuLy9kb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm91dGVyXCIpPy5zZXRBdHRyaWJ1dGUoXCJkYXRhLWZvb1wiLCBcIm1vZFwiKTtcclxuXHJcbi8vZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJpbm5lclwiKT8uc2V0QXR0cmlidXRlKFwiZGF0YS1mb29cIiwgXCJtb2RcIik7XHJcbi8vcmVuZGVyKG1hcmt1cCgyKSwgZG9jdW1lbnQuYm9keSk7XHJcbi8vcmVuZGVyKG1hcmt1cCwgZG9jdW1lbnQuYm9keSwgdHJ1ZSk7XHJcblxyXG53aW5kb3cucmVSZW5kZXIxID0gKCkgPT4gcmVuZGVyKG1hcmt1cCgxKSwgZG9jdW1lbnQuYm9keSk7XHJcbndpbmRvdy5yZVJlbmRlcjIgPSAoKSA9PiByZW5kZXIobWFya3VwKDIpLCBkb2N1bWVudC5ib2R5KTtcclxuIl0sInNvdXJjZVJvb3QiOiIifQ==