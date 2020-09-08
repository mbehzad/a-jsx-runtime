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
    if (vNode.type === "Element") return vNode;
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

function markup(num) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vanN4L2pzeC1ydW50aW1lLnRzIiwid2VicGFjazovLy8uL21haW4udHN4Il0sIm5hbWVzIjpbInJlbmRlcmVkVlRyZWVzIiwiV2Vha01hcCIsIkpzeE5vZGUiLCJjb25zdHJ1Y3RvciIsInByb3BzIiwiZ2V0UGFyZW50RWxlbWVudE5vZGUiLCJ2Tm9kZSIsInBhcmVudCIsInR5cGUiLCJFcnJvciIsImdldENoaWxkRWxlbWVudE5vZGVzIiwiYWx3YXlzQWxsb3ciLCJjaGlsZHJlbiIsIm1hcCIsImNoaWxkTm9kZSIsImluY2x1ZGVzIiwiZmxhdCIsIkluZmluaXR5IiwiZmlsdGVyIiwiQm9vbGVhbiIsImdldFNpYmxpbmdzIiwiZ2V0UGFyZW50QW5kTmV4dFNpYmxpbmciLCJwYXJlbnRXaXRoRWxlbWVudCIsInNpYmxpbmdzIiwicHJldlNpYmxpbmciLCJpbmRleE9mIiwibmV4dFNpYmxpbmdOb2RlIiwibm9kZSIsIm5leHRTaWJsaW5nIiwiY29uc29sZSIsImxvZyIsImluZGV4IiwiZmluZFByZXZTaWJsaW5nIiwic2libGluZ0JlZm9yZSIsIl9jYWxsUmVmcyIsIlN5bWJvbCIsInN2Z0NvbnRleHQiLCJ0cnV0aHkiLCJ2YWx1ZSIsInVuZGVmaW5lZCIsInNhbml0aXplIiwidGV4dCIsImRpdiIsImRvY3VtZW50IiwiY3JlYXRlRWxlbWVudCIsImlubmVyVGV4dCIsImlubmVySFRNTCIsImdldE91dGVySHRtbCIsImVsZW1lbnQiLCJFbGVtZW50Iiwib3V0ZXJIVE1MIiwiVGV4dCIsIndob2xlVGV4dCIsIkRvY3VtZW50RnJhZ21lbnQiLCJBcnJheSIsImZyb20iLCJjaGlsZE5vZGVzIiwiZWwiLCJqb2luIiwid2FybiIsImFzSHRtbFN0cmluZyIsInRhZyIsInRvU3RyaW5nIiwiYXR0cnMiLCJhdHRyaWJ1dGVzIiwiT2JqZWN0IiwiZW50cmllcyIsImtleSIsInYiLCJrIiwiaXNBcnJheSIsImNvbnRlbnQiLCJjaGlsZCIsIk5vZGUiLCJhc05vZGUiLCJmcmFnbWVudHMiLCJuIiwiaXRlbSIsImRvY3VtZW50RnJhZ21lbnQiLCJjcmVhdGVEb2N1bWVudEZyYWdtZW50IiwiYXBwZW5kIiwiZXJyb3IiLCJyZXN1bHQiLCJqc3hOb2RlcyIsImZvckVhY2giLCJzdGFydHNXaXRoIiwiZXZlbnQiLCJyZXBsYWNlIiwiYWRkRXZlbnRMaXN0ZW5lciIsInN2Z0NvbnRleHRTZXQiLCJjcmVhdGVFbGVtZW50TlMiLCJfa2V5Iiwic2V0QXR0cmlidXRlIiwiU3RyaW5nIiwiY2hpbGRKc3hOb2RlcyIsInJlbW92ZUl0ZW0iLCJwYXJlbnRFbGVtZW50IiwicmVtb3ZlQ2hpbGQiLCJpbnNlcnROZXdJdGVtIiwibmV3Tm9kZSIsImluc2VydEJlZm9yZSIsImRpZmZBbmRQYXRjaCIsIm9sZE5vZGUiLCJub2RlVmFsdWUiLCJyZW1vdmVBdHRyaWJ1dGUiLCJoYXNPd25Qcm9wZXJ0eSIsImRpZmZBbmRQYXRjaENoaWxkcmVuIiwicmVwbGFjZVdpdGgiLCJvbGRDaGlsZCIsIml4IiwibmV3Q2hpbGQiLCJpIiwibGVuZ3RoIiwiYXNWTm9kZSIsImZvb05vZGUiLCJhc3NpZ24iLCJ0YWcyIiwibmV3Tm9kZUluZGV4IiwiaW5zZXJ0QWRqYWNlbnRFbGVtZW50IiwidHB5ZSIsInRhZzEiLCJ0ZXh0Tm9kZSIsImNyZWF0ZVRleHROb2RlIiwiYXR0ciIsImNoaWxkVk5vZGUiLCJzbGljZSIsInJldmVyc2UiLCJmaW5kIiwicGFyZW50Tm9kZSIsIm5ld1ZOb2RlIiwianN4cyIsInJlZiIsIm5vZGVJdGVtIiwiRnJhZ21lbnQiLCJqc3giLCJyZW5kZXIiLCJtYXJrdXAiLCJkb21Ob2RlIiwiYm9keSIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJzdHlsZSIsImJhY2tncm91bmQiLCJpc1JlUmVuZGVyIiwiaGFzIiwiaW5zZXJ0QWRqYWNlbnRIVE1MIiwidlRyZWUiLCJvbGRWVHJlZSIsImdldCIsIm5ld1ZUcmVlIiwic2V0IiwicmF3SHRtbCIsInRlbXBsYXRlIiwieHNzIiwiUlRFIiwidHh0IiwiQnV0dG9uIiwiZGlzYWJsZWQiLCJyZWZsb2ciLCJTcGFuIiwibW9kZSIsIkNvbXAiLCJudW0iLCJtYXJrdXAxIiwibWFya3VwMiIsIlBvcFVwSW5mbyIsIkhUTUxFbGVtZW50IiwiY3VzdG9tRWxlbWVudHMiLCJkZWZpbmUiLCJ3aW5kb3ciLCJyZVJlbmRlcjEiLCJyZVJlbmRlcjIiXSwibWFwcGluZ3MiOiI7UUFBQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7UUFDMUU7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSx3REFBd0Qsa0JBQWtCO1FBQzFFO1FBQ0EsaURBQWlELGNBQWM7UUFDL0Q7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLHlDQUF5QyxpQ0FBaUM7UUFDMUUsZ0hBQWdILG1CQUFtQixFQUFFO1FBQ3JJO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMkJBQTJCLDBCQUEwQixFQUFFO1FBQ3ZELGlDQUFpQyxlQUFlO1FBQ2hEO1FBQ0E7UUFDQTs7UUFFQTtRQUNBLHNEQUFzRCwrREFBK0Q7O1FBRXJIO1FBQ0E7OztRQUdBO1FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNsRkE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsTUFBTUEsY0FBYyxHQUFHLElBQUlDLE9BQUosRUFBdkI7QUFDQTs7OztBQUtBO0FBQ0E7O0FBNEJBO0FBQ0E7QUFDQSxNQUFNQyxPQUFOLENBQWM7QUFFWkMsYUFBVyxDQUFDQyxLQUFELEVBQWtCO0FBQUEsU0FEN0JBLEtBQzZCO0FBQzNCLFNBQUtBLEtBQUwsR0FBYUEsS0FB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ZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDApO1xuIiwiY29uc3QgcmVuZGVyZWRWVHJlZXMgPSBuZXcgV2Vha01hcDxIVE1MRWxlbWVudCwgUm9vdFZOb2RlPigpO1xyXG4vKipcclxuICogcHJvdmlkZXMgZnVuY3Rpb25zIG5lZWRlZCBieSBiYWJlbCBmb3IgYSBjdXN0b20gcHJhZ21hXHJcbiAqIHRvIHJlbmRlciBwYXJzZWQganN4IGNvZGUgdG8gaHRtbFxyXG4gKi9cclxuXHJcbi8vIHByb3BzIHdoaWNoIHdpbGwgYmUgcmVuZGVyZWQgYXMgYXR0cmlidXRlc1xyXG4vLyBGdW5jdGlvbnMgd2lsbCBiZSB1c2VkIGZvciBldmVudCBsaXN0ZW5lcnMuICh3aXRoIGF0dHJpYnV0ZSBuYW1lIHN0YXJ0aW5nIHdpdGggJ29uLScpXHJcbnR5cGUgQXR0cmlidXRlcyA9IHsgW2tleTogc3RyaW5nXTogc3RyaW5nIHwgYm9vbGVhbiB8IG51bWJlciB8IEZ1bmN0aW9uIH07XHJcblxyXG4vLyBhZGRpdGlvbmFsIGF0dHJpYnV0ZXMgd2hpY2ggY2FuIGhhdmUgYWRkaXRpb25hbCBzZXJpYWxpemF0aW9uIGJlZm9yZSByZW5kZXJpbmcgYXMgYXR0cmlidXRlc1xyXG50eXBlIFNwZWNpYWxBdHRyaWJ1dGVzID0ge1xyXG4gIGNsYXNzPzogc3RyaW5nIHwgc3RyaW5nW107XHJcbiAgc3R5bGU/OiBzdHJpbmcgfCB7IFtrZXk6IHN0cmluZ106IHN0cmluZyB9O1xyXG4gIHJlZj86IEZ1bmN0aW9uO1xyXG59O1xyXG5cclxuLy8gY2hpbGQgZWxlbWVudHMgaW4gdGhlIGpzeCBtYXJrdXAgd2hpY2ggd2lsbCBiZSBwYXNzZWQgdG8gdGhlIGggZnVuY3Rpb24gYXMgYHByb3BzLmNoaWxkcmVuYFxyXG50eXBlIENoaWxkcmVuUHJvcHMgPSB7XHJcbiAgLy8gbmVzdGVkIGFycmF5IGluIGNhc2Ugb2ZcclxuICAvLyA8ZWxlbT5cclxuICAvLyAgIDxzcGFuLz5cclxuICAvLyAgIHtjaGlsZHJlbn1cclxuICAvLyAgIDxkaXYvPlxyXG4gIC8vIDwvZWxlbT5cclxuICBjaGlsZHJlbjogQXJyYXk8XHJcbiAgICBOb2RlIHwgSnN4Tm9kZUludGVyZmFjZSB8IHN0cmluZyB8IEFycmF5PE5vZGUgfCBKc3hOb2RlSW50ZXJmYWNlIHwgc3RyaW5nPlxyXG4gID47XHJcbn07XHJcblxyXG4vKipcclxuICogcHJvcHMgb2JqZWN0IHdoaWNoIHdpbGwgYmUgcGFzc2VkIHRvIGpzeCBwcmFnbWEgYW5kIGN1c3RvbSBjb21wb25lbnQgZnVuY3Rpb25zXHJcbiAqL1xyXG50eXBlIEpzeFByb3BzID0gQXR0cmlidXRlcyAmIFNwZWNpYWxBdHRyaWJ1dGVzICYgQ2hpbGRyZW5Qcm9wcztcclxuXHJcbi8vIGJhc2UgY2xhc3Mgd2hpY2ggd2lsbCBiZSBpbmhlcml0ZWQgZnJvbSBqc3ggYW5kIGZyYWdtZW50cyBmdW5jdGlvbiBub2RlIGdlbmVyYXRpb25cclxuLy8gYW5kIHdpbGwgYmUgdXNlZCB0byBkaXN0aW5ndWlzaCB0aGVtIHdpdGggb3RoZXIgRWxlbWVudHNcclxuY2xhc3MgSnN4Tm9kZSB7XHJcbiAgcHJvcHM6IEpzeFByb3BzO1xyXG4gIGNvbnN0cnVjdG9yKHByb3BzOiBKc3hQcm9wcykge1xyXG4gICAgdGhpcy5wcm9wcyA9IHByb3BzO1xyXG4gIH1cclxufVxyXG5cclxuLyp7XHJcbiAgICAgIC8vW2tleTogc3RyaW5nXTogYW55O1xyXG4gICAgICB0eXBlOiBcIkVsZW1lbnRcIiB8IFwiRnJhZ21lbnRcIiB8IFwiVGV4dE5vZGVcIiB8IFwiTnVsbFwiO1xyXG4gICAgICBhc05vZGUoKTogTm9kZTtcclxuICAgICAgdG9TdHJpbmcoKTogc3RyaW5nO1xyXG4gICAgICBub2RlOiBOb2RlIHwgbnVsbDtcclxuICAgICAgcGFyZW50OiBWTm9kZSB8IG51bGw7XHJcbiAgICAgIGNoaWxkcmVuOiBBcnJheTxWTm9kZT47XHJcbiAgICAgIHRhZzogc3RyaW5nIHwgRnVuY3Rpb247IC8vID9cclxuICAgICAgLy9nZXRQYXJlbnRFbGVtZW50Tm9kZSgpOiBWTm9kZTsgLy8gYW5jZXN0b3Igd2hpY2ggaGFzIGEgRWxlbWVudCBub2RlIChpLmUuIG5vIEZyYWdtZW50KVxyXG4gICAgICAvL2dldENoaWxkRWxlbWVudE5vZGVzKCk6IFZOb2RlW107IC8vIGNoaWxkcmVuIGFuZCBpZiBhIGNoaWxkIGlzIGEgZnJhZ21lbnQgaXRzIGNoaWxkcmVuXHJcbiAgICB9Ki9cclxuXHJcbnR5cGUgQ29tbW9uVk5vZGVQcm9wZXJ0aWVzID0ge1xyXG4gIHBhcmVudDogVk5vZGU7XHJcbiAgYXNOb2RlKCk6IE5vZGU7XHJcbiAgdG9TdHJpbmcoKTogc3RyaW5nO1xyXG59O1xyXG50eXBlIEVsZW1lbnRWTm9kZSA9IENvbW1vblZOb2RlUHJvcGVydGllcyAmIHtcclxuICB0eXBlOiBcIkVsZW1lbnRcIjtcclxuICBub2RlOiBFbGVtZW50O1xyXG4gIGNoaWxkcmVuOiBBcnJheTxWTm9kZT47XHJcbiAgdGFnOiBzdHJpbmcgfCBGdW5jdGlvbjtcclxuICBwcm9wczogeyBba2V5OiBzdHJpbmddOiBhbnkgfTtcclxufTtcclxudHlwZSBUZXh0Vk5vZGUgPSBDb21tb25WTm9kZVByb3BlcnRpZXMgJiB7XHJcbiAgdHlwZTogXCJUZXh0Tm9kZVwiO1xyXG4gIG5vZGU6IFRleHQ7XHJcbiAgY2hpbGRyZW46IEFycmF5PFZOb2RlPjsgLy9BcnJheTxuZXZlcj47XHJcbiAgdGFnOiBudWxsO1xyXG59O1xyXG5cclxudHlwZSBSb290Vk5vZGUgPSB7XHJcbiAgdHlwZTogXCJSb290XCI7XHJcbiAgbm9kZTogRWxlbWVudDtcclxuICBjaGlsZHJlbjogQXJyYXk8Vk5vZGU+O1xyXG4gIHBhcmVudDogbnVsbDtcclxuICAvL2FzTm9kZSgpOiBOb2RlO1xyXG4gIC8vdG9TdHJpbmcoKTogc3RyaW5nO1xyXG59O1xyXG5cclxudHlwZSBWTm9kZSA9IHtcclxuICBwYXJlbnQ6IFZOb2RlO1xyXG4gIGFzTm9kZSgpOiBOb2RlO1xyXG4gIHRvU3RyaW5nKCk6IHN0cmluZztcclxufSAmIChcclxuICB8IEVsZW1lbnRWTm9kZVxyXG4gIHwgVGV4dFZOb2RlXHJcbiAgfCB7XHJcbiAgICAgIHR5cGU6IFwiVGV4dE5vZGVcIjtcclxuICAgICAgbm9kZTogVGV4dDtcclxuICAgICAgY2hpbGRyZW46IEFycmF5PFZOb2RlPjsgLy9BcnJheTxuZXZlcj47XHJcbiAgICAgIHRhZzogbnVsbDtcclxuICAgIH1cclxuICB8IHtcclxuICAgICAgdHlwZTogXCJGcmFnbWVudFwiO1xyXG4gICAgICBub2RlOiBudWxsOyAvLyBAVE9ETzogb3IgbnVsbD9cclxuICAgICAgY2hpbGRyZW46IEFycmF5PFZOb2RlPjtcclxuICAgICAgdGFnOiBudWxsO1xyXG4gICAgfVxyXG4gIHwge1xyXG4gICAgICB0eXBlOiBcIk51bGxcIjtcclxuICAgICAgbm9kZTogbnVsbDtcclxuICAgICAgY2hpbGRyZW46IEFycmF5PFZOb2RlPjsgLy9BcnJheTxuZXZlcj47XHJcbiAgICAgIHRhZzogbnVsbDtcclxuICAgIH1cclxuKTtcclxuXHJcbi8vIG51bGwgd2hlbiBjaGVja2luZyB0aGUgcGFyZW50IHdoZW4gcm9vdCBpcyBmcmFnbWVudCBpdHNlbGZcclxuZnVuY3Rpb24gZ2V0UGFyZW50RWxlbWVudE5vZGUodk5vZGU6IFZOb2RlKTogRWxlbWVudFZOb2RlIHtcclxuICB3aGlsZSAodk5vZGUucGFyZW50KSB7XHJcbiAgICB2Tm9kZSA9IHZOb2RlLnBhcmVudDtcclxuICAgIGlmICh2Tm9kZS50eXBlID09PSBcIkVsZW1lbnRcIikgcmV0dXJuIHZOb2RlO1xyXG4gIH1cclxuXHJcbiAgLy8gd2lsbCBuZXZlciByZWFjaFxyXG4gIHRocm93IG5ldyBFcnJvcihcImpzeC1ydW50aW1lOiBjYW4ndCBmaW5kIGEgcGFyZW50IHdpdGggRWxlbWVudFwiKTtcclxufVxyXG5cclxuZnVuY3Rpb24gZ2V0Q2hpbGRFbGVtZW50Tm9kZXMoXHJcbiAgdk5vZGU6IFZOb2RlLFxyXG4gIGFsd2F5c0FsbG93OiBWTm9kZVtdID0gW11cclxuKTogVk5vZGVbXSB7XHJcbiAgcmV0dXJuIHZOb2RlLmNoaWxkcmVuXHJcbiAgICAubWFwKChjaGlsZE5vZGU6IFZOb2RlKSA9PiB7XHJcbiAgICAgIGlmIChhbHdheXNBbGxvdy5pbmNsdWRlcyhjaGlsZE5vZGUpKSByZXR1cm4gY2hpbGROb2RlO1xyXG4gICAgICBpZiAoY2hpbGROb2RlLnR5cGUgPT09IFwiTnVsbFwiKSByZXR1cm4gbnVsbDtcclxuICAgICAgaWYgKGNoaWxkTm9kZS50eXBlID09PSBcIkVsZW1lbnRcIiB8fCBjaGlsZE5vZGUudHlwZSA9PT0gXCJUZXh0Tm9kZVwiKVxyXG4gICAgICAgIHJldHVybiBjaGlsZE5vZGU7XHJcbiAgICAgIGlmIChjaGlsZE5vZGUudHlwZSA9PT0gXCJGcmFnbWVudFwiKSByZXR1cm4gZ2V0Q2hpbGRFbGVtZW50Tm9kZXMoY2hpbGROb2RlKTtcclxuICAgICAgLy8gQFRPRE86IG90aGVyIHR5cGVzIChpLmUuIExpdmUgRWxlbWVudClcclxuICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9KVxyXG4gICAgLmZsYXQoSW5maW5pdHkpXHJcbiAgICAuZmlsdGVyKEJvb2xlYW4pIGFzIFZOb2RlW107XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdldFNpYmxpbmdzKHZOb2RlOiBWTm9kZSkge1xyXG4gIHJldHVybiBnZXRDaGlsZEVsZW1lbnROb2RlcyhnZXRQYXJlbnRFbGVtZW50Tm9kZSh2Tm9kZSksIFt2Tm9kZV0pO1xyXG59XHJcblxyXG5mdW5jdGlvbiBnZXRQYXJlbnRBbmROZXh0U2libGluZyh2Tm9kZTogVk5vZGUpOiBbTm9kZSwgTm9kZSB8IG51bGxdIHtcclxuICAvLyBub2RlIGFuY2VzdG9yIHdpdGggRWxlbWVudCxcclxuICBjb25zdCBwYXJlbnRXaXRoRWxlbWVudCA9IGdldFBhcmVudEVsZW1lbnROb2RlKHZOb2RlKTtcclxuICBjb25zdCBzaWJsaW5ncyA9IGdldENoaWxkRWxlbWVudE5vZGVzKHBhcmVudFdpdGhFbGVtZW50LCBbdk5vZGVdKTtcclxuICBjb25zdCBwcmV2U2libGluZyA9IHNpYmxpbmdzW3NpYmxpbmdzLmluZGV4T2Yodk5vZGUpIC0gMV07XHJcbiAgY29uc3QgbmV4dFNpYmxpbmdOb2RlID0gcHJldlNpYmxpbmcgPyBwcmV2U2libGluZy5ub2RlIS5uZXh0U2libGluZyA6IG51bGw7XHJcbiAgLy9jb25zdCBuZXh0U2libGluZ05vZGUgPSBuZXh0U2libGluZyA/IG5leHRTaWJsaW5nLm5vZGUgOiBudWxsO1xyXG5cclxuICBjb25zb2xlLmxvZyhcImdldFBhcmVudEFuZE5leHRTaWJsaW5nOlwiLCB7XHJcbiAgICB2Tm9kZSxcclxuICAgIHBhcmVudFdpdGhFbGVtZW50LFxyXG4gICAgc2libGluZ3MsXHJcbiAgICBuZXh0U2libGluZ05vZGUsXHJcbiAgICBpbmRleDogc2libGluZ3MuaW5kZXhPZih2Tm9kZSksXHJcbiAgfSk7XHJcblxyXG4gIHJldHVybiBbcGFyZW50V2l0aEVsZW1lbnQubm9kZSwgbmV4dFNpYmxpbmdOb2RlXTtcclxuICAvLyBhbGwgZmxhdCBjaGlsZCBub2RlcyArXHJcbn1cclxuXHJcbmZ1bmN0aW9uIGZpbmRQcmV2U2libGluZyh2Tm9kZTogVk5vZGUpOiBWTm9kZSB8IG51bGwge1xyXG4gIGNvbnN0IHNpYmxpbmdzID0gZ2V0U2libGluZ3Modk5vZGUpO1xyXG4gIGxldCBzaWJsaW5nQmVmb3JlID0gc2libGluZ3Nbc2libGluZ3MuaW5kZXhPZih2Tm9kZSkgLSAxXSB8fCBudWxsO1xyXG4gIHJldHVybiBzaWJsaW5nQmVmb3JlO1xyXG59XHJcblxyXG4vLyBwcml2YXRlIGtleSBmb3IgY2FsbGluZyB0aGUgYHJlZmAgY2FsbGVyc1xyXG5jb25zdCBfY2FsbFJlZnMgPSBTeW1ib2woXCJjYWxsUmVmc1wiKTtcclxuXHJcbi8vIHRoZSBjdXJyZW50IG1hcmt1cCB3aGljaCBpcyByZW5kZXJlZCBpcyBuZXN0ZWQgaW4gYW4gc3ZnIGVsZW1lbnRcclxubGV0IHN2Z0NvbnRleHQgPSBmYWxzZTtcclxuXHJcbi8vIGpzeCBhbmQgRnJhZ21lbnQgd2lsbCByZXR1cm4gb2JqZWN0cyB3aGljaCBpbXBsZW1lbnQgdGhpcyBpbnRlcmZhY2VcclxuZXhwb3J0IGludGVyZmFjZSBKc3hOb2RlSW50ZXJmYWNlIGV4dGVuZHMgSnN4Tm9kZSB7XHJcbiAgdG9TdHJpbmcoKTogc3RyaW5nO1xyXG4gIGFzTm9kZSgpOiBOb2RlO1xyXG4gIGFzVk5vZGUoKTogVk5vZGU7XHJcbiAgW19jYWxsUmVmc10oKTogdm9pZDtcclxufVxyXG5cclxuLyoqXHJcbiAqIHJldHVybnMgdHJ1ZSBpZiBub3QgbnVsbGlzaCBvciBmYWxzZVxyXG4gKiB0aGF0IG1lYW5zIDAgb3IgZW1wdHkgc3RyaW5nIGFyZSBhbGxvd2VkXHJcbiAqIEBwYXJhbSB7Kn0gdmFsXHJcbiAqL1xyXG5mdW5jdGlvbiB0cnV0aHkodmFsdWU6IGFueSk6IGJvb2xlYW4ge1xyXG4gIHJldHVybiB2YWx1ZSAhPT0gZmFsc2UgJiYgdmFsdWUgIT09IG51bGwgJiYgdmFsdWUgIT09IHVuZGVmaW5lZDtcclxufVxyXG5cclxuLyoqXHJcbiAqIGVzY2FwZXMgdGhlIHByb3ZpZGVkIHN0cmluZyBhZ2FpbnN0IHhzcyBhdHRhY2tzIGV0Y1xyXG4gKlxyXG4gKiBAcGFyYW0ge3N0cmluZ30gdGV4dFxyXG4gKiBAcmV0dXJucyB7c3RyaW5nfVxyXG4gKi9cclxuZnVuY3Rpb24gc2FuaXRpemUodGV4dDogc3RyaW5nKTogc3RyaW5nIHtcclxuICBjb25zdCBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gIGRpdi5pbm5lclRleHQgPSB0ZXh0O1xyXG4gIHJldHVybiBkaXYuaW5uZXJIVE1MO1xyXG59XHJcblxyXG4vKipcclxuICogYmFzaWNhbGx5IGBFbGVtZW50Lm91dGVySFRNTGAgYnV0IGFsc28gc3VwcG9ydHMgVGV4dCBub2RlIGFuZCBEb2N1bWVudEZyYWdtZW50XHJcbiAqIEBwYXJhbSBlbGVtZW50IHtOb2RlfSAtIGVsZW1lbnQgd2hpY2ggaXRzIGh0bWwgbmVlZHMgdG8gYmUgcmV0dXJuZWRcclxuICovXHJcbmZ1bmN0aW9uIGdldE91dGVySHRtbChlbGVtZW50OiBOb2RlKTogc3RyaW5nIHtcclxuICBpZiAoZWxlbWVudCBpbnN0YW5jZW9mIEVsZW1lbnQpIHJldHVybiBlbGVtZW50Lm91dGVySFRNTDtcclxuICBpZiAoZWxlbWVudCBpbnN0YW5jZW9mIFRleHQpIHJldHVybiBzYW5pdGl6ZShlbGVtZW50Lndob2xlVGV4dCk7XHJcbiAgaWYgKGVsZW1lbnQgaW5zdGFuY2VvZiBEb2N1bWVudEZyYWdtZW50KVxyXG4gICAgcmV0dXJuIEFycmF5LmZyb20oZWxlbWVudC5jaGlsZE5vZGVzKVxyXG4gICAgICAubWFwKChlbCkgPT4gZ2V0T3V0ZXJIdG1sKGVsKSlcclxuICAgICAgLmpvaW4oXCJcIik7XHJcblxyXG4gIC8vIHNob3VsZG4ndCByZWFjaCB0aGlzIHBvaW50XHJcbiAgY29uc29sZS53YXJuKFwiZ2V0T3V0ZXJIdG1sIGRvZXMgbm90IHN1cHBvcnQgdGhpcyB0eXBlIG9mIGVsZW1lbnRcIiwgZWxlbWVudCk7XHJcbiAgcmV0dXJuIFwiXCI7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBnZW5lcmF0ZXMgdGhlIGh0bWwgYXMgYSBzdHJpbmcgd2hpY2ggY2FuIGJlIHVzZWQgZm9yIGV4YW1wbGUgd2l0aCBgZWxlbWVudC5pbm5lckhUTUwoKWBcclxuICpcclxuICogQHBhcmFtIHRhZyB7c3RyaW5nfEZ1bmN0aW9ufSAtIHRhZyBhcmd1bWVudCBvZiB0aGUganN4IGNhbGxcclxuICogQHBhcmFtIHByb3BzIHtPYmplY3R9IC0gcHJvcHMgYXJndW1lbnQgb2YganN4IGNhbGxcclxuICovXHJcbmZ1bmN0aW9uIGFzSHRtbFN0cmluZyh0YWc6IHN0cmluZyB8IEZ1bmN0aW9uLCBwcm9wczogSnN4UHJvcHMpIHtcclxuICBpZiAodHlwZW9mIHRhZyA9PT0gXCJmdW5jdGlvblwiKSB7XHJcbiAgICAvLyBleHBlY3RpbmcgdGFnIGZ1bmN0aW9uIHRvIGFsd2F5cyByZXR1cm4gYSBqc3guXHJcbiAgICAvLyBoZXJlIGl0IHdpbGwgYWxzbyB3b3JrIGlmIGl0IHJldHVybnMgc29tZXRoaW5nIHdpdGggdG9TdHJpbmcoKSA9PiBzdHJpbmcgbWV0aG9kXHJcbiAgICBjb25zdCBlbGVtZW50OiBKc3hOb2RlID0gdGFnKHByb3BzKTtcclxuXHJcbiAgICByZXR1cm4gZWxlbWVudC50b1N0cmluZygpO1xyXG4gIH1cclxuXHJcbiAgLy8gcmVtb3ZlIGNoaWxkcmVuIGZyb20gcHJvcHMgYW5kIHJlbmRlciBpdCBhcyBjb250ZW50LFxyXG4gIC8vIHRoZSByZXN0IGFzIGF0dHJpYnV0ZXNcclxuICBjb25zdCB7IGNoaWxkcmVuLCAuLi5hdHRycyB9ID0gcHJvcHM7XHJcblxyXG4gIGNvbnN0IGF0dHJpYnV0ZXMgPSBPYmplY3QuZW50cmllcyhhdHRycylcclxuICAgIC5maWx0ZXIoKFssIHZhbHVlXSkgPT4gdHJ1dGh5KHZhbHVlKSlcclxuICAgIC5tYXAoKFtrZXksIHZhbHVlXSkgPT4ge1xyXG4gICAgICAvLyBlLmcuIGRpc2FibGVkOiB0cnVlID0+IDx0YWcgZGlzYWJsZWQ+XHJcbiAgICAgIGlmICh2YWx1ZSA9PT0gdHJ1ZSkgcmV0dXJuIGtleTtcclxuXHJcbiAgICAgIC8vIGZvciBzdHlsZSBhcyBvYmplY3Q6XHJcbiAgICAgIC8vIChzdHlsZTopIHtkaXNwbGF5OiBcIm5vbmVcIiwgcG9zaXRpb246IFwiYWJzb2x1dGVcIn0gPT0+ICdkaXNwbGF5OiBub25lOyBwb3NpdGlvbjogYWJzb2x1dGU7J1xyXG4gICAgICBpZiAoa2V5ID09PSBcInN0eWxlXCIgJiYgdHlwZW9mIHZhbHVlID09PSBcIm9iamVjdFwiKVxyXG4gICAgICAgIHZhbHVlID0gT2JqZWN0LmVudHJpZXModmFsdWUpXHJcbiAgICAgICAgICAvLyBpZ25vcmUgc3R1ZmYgbGlrZSBge2JhY2tncm91bmQ6IGFjdGl2ZSAmJiBcInJlZFwifWAgd2hlbiBgYWN0aXZlID09PSBmYWxzZSAvIG51bGwgLyB1bmRlZmluZWRgXHJcbiAgICAgICAgICAuZmlsdGVyKChbLCB2XSkgPT4gdHJ1dGh5KHYpKVxyXG4gICAgICAgICAgLy8gY3VycmVudGx5IHN1cHBvcnRzIFwiYmFja2dyb3VuZC1jb2xvclwiIG5vdCBcImJhY2tncm91bmRDb2xvclwiXHJcbiAgICAgICAgICAubWFwKChbaywgdl0pID0+IGAke2t9OiAke3Z9YClcclxuICAgICAgICAgIC5qb2luKFwiOyBcIik7XHJcblxyXG4gICAgICAvLyAoY2xhc3M6KSBbXCJidG5cIiwgXCJyZWRcIl0gPT0+IFwiYnRuIHJlZFwiXHJcbiAgICAgIGlmIChrZXkgPT09IFwiY2xhc3NcIiAmJiBBcnJheS5pc0FycmF5KHZhbHVlKSkgdmFsdWUgPSB2YWx1ZS5qb2luKFwiIFwiKTtcclxuXHJcbiAgICAgIHJldHVybiBgJHtrZXl9PVwiJHt2YWx1ZX1cImA7XHJcbiAgICB9KVxyXG4gICAgLmpvaW4oXCIgXCIpO1xyXG5cclxuICBjb25zdCBjb250ZW50ID0gY2hpbGRyZW5cclxuICAgIC5maWx0ZXIodHJ1dGh5KVxyXG4gICAgLm1hcCgoY2hpbGQpID0+XHJcbiAgICAgIGNoaWxkIGluc3RhbmNlb2YgTm9kZVxyXG4gICAgICAgID8gZ2V0T3V0ZXJIdG1sKGNoaWxkKVxyXG4gICAgICAgIDogdHlwZW9mIGNoaWxkID09PSBcIm9iamVjdFwiXHJcbiAgICAgICAgPyBjaGlsZC50b1N0cmluZygpXHJcbiAgICAgICAgOiBzYW5pdGl6ZShjaGlsZClcclxuICAgIClcclxuICAgIC5qb2luKFwiXCIpO1xyXG5cclxuICByZXR1cm4gYDwke3RhZ30gJHthdHRyaWJ1dGVzfT4ke2NvbnRlbnR9PC8ke3RhZ30+YDtcclxufVxyXG5cclxuLyoqXHJcbiAqIGdlbmVyYXRlcyBIVE1MIE5vZGUgZWxlbWVudHMgZnJvbSB0aGUgcHJvdmlkZWQganN4IHRyZWVcclxuICogQHBhcmFtIHRhZyB7c3RyaW5nfEZ1bmN0aW9ufSAtIHRhZyBhcmd1bWVudCBvZiB0aGUganN4IGNhbGxcclxuICogQHBhcmFtIHByb3BzIHtPYmplY3R9IC0gcHJvcHMgYXJndW1lbnQgb2YganN4IGNhbGxcclxuICovXHJcbmZ1bmN0aW9uIGFzTm9kZShcclxuICB0YWc6IHN0cmluZyB8IEZ1bmN0aW9uIHwgdW5kZWZpbmVkLFxyXG4gIHByb3BzOiBKc3hQcm9wcyxcclxuICBjaGlsZHJlbjogYW55W11cclxuKTogW05vZGUsIEpzeE5vZGVJbnRlcmZhY2VbXV0ge1xyXG4gIGNvbnNvbGUubG9nKFwiYXNOb2RlKClcIiwgeyB0YWcsIHByb3BzLCBjaGlsZHJlbiB9KTtcclxuXHJcbiAgLy8gZnJhZ21lbnRcclxuICBpZiAoIXRhZykge1xyXG4gICAgY29uc3QgZnJhZ21lbnRzID0gY2hpbGRyZW5cclxuICAgICAgLmZsYXQoKVxyXG4gICAgICAuZmlsdGVyKChuKSA9PiBuLnRhZyAhPT0gXCJfX05VTExfX1wiKVxyXG4gICAgICAvLy5maWx0ZXIodHJ1dGh5KVxyXG4gICAgICAubWFwKFxyXG4gICAgICAgIChpdGVtKSA9PiBpdGVtLmFzTm9kZSgpXHJcbiAgICAgICAgLyppdGVtIGluc3RhbmNlb2YgTm9kZVxyXG4gICAgICAgICAgICA/IGl0ZW1cclxuICAgICAgICAgICAgOiBpdGVtIGluc3RhbmNlb2YgSnN4Tm9kZVxyXG4gICAgICAgICAgICA/IGl0ZW0uYXNOb2RlKClcclxuICAgICAgICAgICAgOiBpdGVtKi9cclxuICAgICAgKTtcclxuXHJcbiAgICBjb25zdCBkb2N1bWVudEZyYWdtZW50ID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO1xyXG5cclxuICAgIGRvY3VtZW50RnJhZ21lbnQuYXBwZW5kKC4uLmZyYWdtZW50cyk7XHJcbiAgICByZXR1cm4gW2RvY3VtZW50RnJhZ21lbnQsIFtdXTtcclxuICB9XHJcblxyXG4gIC8vIHNob3VsZG4ndFxyXG4gIGlmICh0eXBlb2YgdGFnID09PSBcImZ1bmN0aW9uXCIpIHtcclxuICAgIGNvbnNvbGUuZXJyb3IoXCJzaG91bGRuJ3QgcmVhY2ggdGhpcyBpbiB2VHJlZSBtb2RlXCIpO1xyXG4gICAgLy8gZXhwZWN0aW5nIHRoZSB0YWcgZnVuY3Rpb24gdG8gcmV0dXJuIGpzeC5cclxuICAgIC8vIGhlcmUgaXQgd2lsbCBhbHNvIHdvcmsgd2hlbiBpdCByZXR1cm5zIEhUTUxFbGVtZW50XHJcbiAgICBsZXQgcmVzdWx0ID0gdGFnKHByb3BzKTtcclxuXHJcbiAgICBsZXQganN4Tm9kZXM6IEpzeE5vZGVJbnRlcmZhY2VbXSA9IFtdO1xyXG5cclxuICAgIGlmIChyZXN1bHQgaW5zdGFuY2VvZiBKc3hOb2RlKSB7XHJcbiAgICAgIGpzeE5vZGVzID0gW3Jlc3VsdCBhcyBKc3hOb2RlSW50ZXJmYWNlXTtcclxuICAgICAgcmVzdWx0ID0gKHJlc3VsdCBhcyBKc3hOb2RlSW50ZXJmYWNlKS5hc05vZGUoKTtcclxuICAgICAgT2JqZWN0LmVudHJpZXMocHJvcHMpLmZvckVhY2goKFtrZXksIHZhbHVlXSkgPT4ge1xyXG4gICAgICAgIGlmIChcclxuICAgICAgICAgIGtleS5zdGFydHNXaXRoKFwib24tXCIpICYmXHJcbiAgICAgICAgICAodHlwZW9mIHZhbHVlID09PSBcImZ1bmN0aW9uXCIgfHwgdHlwZW9mIHZhbHVlID09PSBcIm9iamVjdFwiKVxyXG4gICAgICAgICkge1xyXG4gICAgICAgICAgLy8gcmVtb3ZlIGxlYWRpbmcgXCJvbi1cIlwiXHJcbiAgICAgICAgICBjb25zdCBldmVudCA9IGtleS5yZXBsYWNlKC9eb24tLywgXCJcIik7XHJcblxyXG4gICAgICAgICAgcmVzdWx0LmFkZEV2ZW50TGlzdGVuZXIoXHJcbiAgICAgICAgICAgIGV2ZW50LFxyXG4gICAgICAgICAgICB2YWx1ZSBhcyBFdmVudExpc3RlbmVyT3JFdmVudExpc3RlbmVyT2JqZWN0XHJcbiAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIFtyZXN1bHQsIGpzeE5vZGVzXTtcclxuICB9XHJcblxyXG4gIGNvbnN0IHsgLi4uYXR0cnMgfSA9IHByb3BzO1xyXG4gIC8vIHJlbWVtYmVyIGlmIHRoZSBzdmcgY29udGV4dCB3YXMgc2V0IGZvciB0aGlzIG5vZGUsIGFuZCByZXBsYWNlIGFmdGVyIGdlbmVyYXRpbmcgYWxsIGNoaWxkcmVuXHJcbiAgbGV0IHN2Z0NvbnRleHRTZXQgPSBmYWxzZTtcclxuXHJcbiAgLy8gc2V0IHRoZSBjb250ZXh0IG9mIG1hcmt1cCB3aGljaCBpcyByZW5kZXJlZCBhcyBTVkcgKG9yIGl0cyBjaGlsZHJlbilcclxuICAvLyBubyBuZWVkIGZvciByZS1zZXR0aW5nIHRoZSBjb250ZXh0IGZvciBuZXN0ZWQgU1ZHc1xyXG4gIGlmICghc3ZnQ29udGV4dCAmJiB0YWcgPT09IFwic3ZnXCIpIHtcclxuICAgIHN2Z0NvbnRleHQgPSB0cnVlO1xyXG4gICAgc3ZnQ29udGV4dFNldCA9IHRydWU7XHJcbiAgfVxyXG5cclxuICAvLyBjdXJyZW50bHkgbm90IHN1cHBvcnRpbmcgdGhlIGBpc2Agb3B0aW9uIGZvciBDdXN0b21pemVkIGJ1aWx0LWluIGVsZW1lbnRzXHJcbiAgY29uc3Qgbm9kZSA9IHN2Z0NvbnRleHRcclxuICAgID8gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKFwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiwgdGFnKVxyXG4gICAgOiBkb2N1bWVudC5jcmVhdGVFbGVtZW50KHRhZyk7XHJcblxyXG4gIE9iamVjdC5lbnRyaWVzKGF0dHJzKVxyXG4gICAgLmZpbHRlcigoW19rZXksIHZhbHVlXSkgPT4gdHJ1dGh5KHZhbHVlKSlcclxuICAgIC5mb3JFYWNoKChba2V5LCB2YWx1ZV0pID0+IHtcclxuICAgICAgLy8gZm9yIHN0eWxlIGFzIG9iamVjdDpcclxuICAgICAgLy8gKHN0eWxlOikge2Rpc3BsYXk6IFwibm9uZVwiLCBwb3NpdGlvbjogXCJhYnNvbHV0ZVwifSA9PT4gJ2Rpc3BsYXk6IG5vbmU7IHBvc2l0aW9uOiBhYnNvbHV0ZTsnXHJcbiAgICAgIGlmIChrZXkgPT09IFwic3R5bGVcIiAmJiB0eXBlb2YgdmFsdWUgPT09IFwib2JqZWN0XCIpXHJcbiAgICAgICAgdmFsdWUgPSBPYmplY3QuZW50cmllcyh2YWx1ZSlcclxuICAgICAgICAgIC5maWx0ZXIoKFssIHZdKSA9PiB0cnV0aHkodikpXHJcbiAgICAgICAgICAubWFwKChbaywgdl0pID0+IGAke2t9OiAke3Z9YClcclxuICAgICAgICAgIC5qb2luKFwiOyBcIik7XHJcblxyXG4gICAgICAvLyAoY2xhc3M6KSBbXCJidG5cIiwgXCJyZWRcIl0gPT0+IFwiYnRuIHJlZFwiXHJcbiAgICAgIGlmIChrZXkgPT09IFwiY2xhc3NcIiAmJiBBcnJheS5pc0FycmF5KHZhbHVlKSkgdmFsdWUgPSB2YWx1ZS5qb2luKFwiIFwiKTtcclxuXHJcbiAgICAgIGlmICh2YWx1ZSA9PT0gdHJ1ZSkgbm9kZS5zZXRBdHRyaWJ1dGUoa2V5LCBcIlwiKTtcclxuICAgICAgZWxzZSBpZiAodHlwZW9mIHZhbHVlID09PSBcInN0cmluZ1wiIHx8IHR5cGVvZiB2YWx1ZSA9PT0gXCJudW1iZXJcIilcclxuICAgICAgICBub2RlLnNldEF0dHJpYnV0ZShrZXksIFN0cmluZyh2YWx1ZSkpO1xyXG4gICAgICAvLyBrZXkgaGFzIHRoZSBmb3JtIG9mIFwib24tY2hhbmdlXCIuIHZhbHVlIGlzIHRoZSBjYWxsYmFjayBmdW5jdGlvbiBvciBhbiBvYmplY3QgaW1wbGVtZW50aW5nIHtFdmVudExpc3RlbmVyfSBpbnRlcmZhY2VcclxuICAgICAgZWxzZSBpZiAoXHJcbiAgICAgICAga2V5LnN0YXJ0c1dpdGgoXCJvbi1cIikgJiZcclxuICAgICAgICAodHlwZW9mIHZhbHVlID09PSBcImZ1bmN0aW9uXCIgfHwgdHlwZW9mIHZhbHVlID09PSBcIm9iamVjdFwiKVxyXG4gICAgICApIHtcclxuICAgICAgICAvLyByZW1vdmUgbGVhZGluZyBcIm9uLVwiXCJcclxuICAgICAgICBjb25zdCBldmVudCA9IGtleS5yZXBsYWNlKC9eb24tLywgXCJcIik7XHJcblxyXG4gICAgICAgIG5vZGUuYWRkRXZlbnRMaXN0ZW5lcihcclxuICAgICAgICAgIGV2ZW50LFxyXG4gICAgICAgICAgdmFsdWUgYXMgRXZlbnRMaXN0ZW5lck9yRXZlbnRMaXN0ZW5lck9iamVjdFxyXG4gICAgICAgICk7XHJcbiAgICAgIH1cclxuICAgICAgLy8gQHRzLWlnbm9yZSAtIHByb3ZpZGluZyB0aGUgdmFsdWUgYXMgcHJvcGVydHkgdG8gaHRtbCBlbGVtZW50XHJcbiAgICAgIGVsc2Ugbm9kZVtrZXldID0gdmFsdWU7XHJcbiAgICB9KTtcclxuXHJcbiAgLy8gcmV0dXJucyBjaGlsZCBqc3ggbm9kZXMgYXMgd2VsbCB0byBiZSB1c2VkIGR1cmluZyB0aGUgcmVmIGNhbGxcclxuICBjb25zdCBjaGlsZEpzeE5vZGVzID0gY2hpbGRyZW4uZmlsdGVyKChjaGlsZCkgPT4gY2hpbGQgaW5zdGFuY2VvZiBKc3hOb2RlKTtcclxuXHJcbiAgY29uc29sZS5sb2coeyBjaGlsZHJlbiB9KTtcclxuXHJcbiAgbm9kZS5hcHBlbmQoXHJcbiAgICAuLi5jaGlsZHJlblxyXG4gICAgICAuZmxhdCgpXHJcbiAgICAgIC8vLmZpbHRlcih0cnV0aHkpXHJcbiAgICAgIC5maWx0ZXIoKGNoaWxkKSA9PiBjaGlsZC50YWcgIT09IFwiX19OVUxMX19cIilcclxuICAgICAgLm1hcCgoY2hpbGQpID0+IGNoaWxkLmFzTm9kZSgpKVxyXG4gICk7XHJcblxyXG4gIC8qbm9kZS5hcHBlbmQoXHJcbiAgICAuLi5jaGlsZHJlblxyXG4gICAgICAuZmxhdCgpXHJcbiAgICAgIC5maWx0ZXIodHJ1dGh5KVxyXG4gICAgICAubWFwKChjaGlsZCkgPT5cclxuICAgICAgICBjaGlsZCBpbnN0YW5jZW9mIE5vZGVcclxuICAgICAgICAgID8gY29uc29sZS53YXJuKFwibm9kZVwiKSB8fCBjaGlsZCAvLyB3YXJuXHJcbiAgICAgICAgICA6IGNoaWxkIGluc3RhbmNlb2YgSnN4Tm9kZVxyXG4gICAgICAgICAgPyBjaGlsZC5hc05vZGUoKVxyXG4gICAgICAgICAgOiBjb25zb2xlLndhcm4oXCJ0ZXh0XCIpIHx8IGNoaWxkXHJcbiAgICAgIClcclxuICApOyovXHJcblxyXG4gIC8vIHN2ZyBlbGVtZW50IGFuZCBhbGwgaXRzIGNoaWxkcmVuIHdlcmUgcmVuZGVyZWQsIHJlc2V0IHRoZSBzdmcgY29udGV4dFxyXG4gIGlmIChzdmdDb250ZXh0U2V0KSBzdmdDb250ZXh0ID0gZmFsc2U7XHJcblxyXG4gIHJldHVybiBbbm9kZSwgY2hpbGRKc3hOb2RlcyBhcyBKc3hOb2RlSW50ZXJmYWNlW11dO1xyXG59XHJcblxyXG4vLyBAVE9ETzogcmVtb3ZlIG1ldGhvZCBvbiBWTm9kZVxyXG5mdW5jdGlvbiByZW1vdmVJdGVtKGl0ZW06IFZOb2RlKSB7XHJcbiAgLy9pZiAoaXRlbSA9PT0gbnVsbCkgcmV0dXJuO1xyXG4gIGlmIChpdGVtLnR5cGUgPT09IFwiRWxlbWVudFwiIHx8IGl0ZW0udHlwZSA9PT0gXCJUZXh0Tm9kZVwiKVxyXG4gICAgaXRlbS5ub2RlLnBhcmVudEVsZW1lbnQhLnJlbW92ZUNoaWxkKGl0ZW0ubm9kZSk7XHJcbiAgZWxzZSBpZiAoaXRlbS50eXBlID09PSBcIkZyYWdtZW50XCIpXHJcbiAgICBnZXRDaGlsZEVsZW1lbnROb2RlcyhpdGVtKS5mb3JFYWNoKChub2RlKSA9PlxyXG4gICAgICBub2RlLm5vZGUhLnBhcmVudEVsZW1lbnQhLnJlbW92ZUNoaWxkKG5vZGUubm9kZSEpXHJcbiAgICApO1xyXG4gIC8vIEBUT0RPOiBlbHNlIC0+IFZOb2RlIG1ldGhvZCBhY3R1YWxseVxyXG59XHJcblxyXG5mdW5jdGlvbiBpbnNlcnROZXdJdGVtKG5ld05vZGU6IFZOb2RlKSB7XHJcbiAgaWYgKG5ld05vZGUudHlwZSAhPT0gXCJOdWxsXCIpIHtcclxuICAgIGNvbnN0IFtwYXJlbnQsIG5leHRTaWJsaW5nXSA9IGdldFBhcmVudEFuZE5leHRTaWJsaW5nKG5ld05vZGUpO1xyXG4gICAgcGFyZW50Lmluc2VydEJlZm9yZShuZXdOb2RlLmFzTm9kZSgpLCBuZXh0U2libGluZyk7XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBkaWZmQW5kUGF0Y2gob2xkTm9kZTogVk5vZGUgfCBSb290Vk5vZGUsIG5ld05vZGU6IFZOb2RlIHwgUm9vdFZOb2RlKSB7XHJcbiAgY29uc29sZS5sb2coXCItLS0tLS0tLSBkaWZmQW5kUGF0Y2ggLS0tLS0tLS1cIiwgeyBvbGROb2RlLCBuZXdOb2RlIH0pO1xyXG4gIGlmIChvbGROb2RlLnR5cGUgIT09IG5ld05vZGUudHlwZSkge1xyXG4gICAgLy8gdGVjaG5pY2FsbHkgaXQgd291bGQgYmVlbiBtb3JlIGVmZmVjdGl2ZSB3YXlzIHRvIHJlcGxhY2UsIGUuZy4gcmVwbGFjZVdpdGgoKSBtZXRob2RcclxuICAgIC8vIGJ1dCByZW1vdmluZyBhbmQgYWRkaW5nIHdvdWxkIGFsbG93IGEgbW9yZSBnZW5lcmljIHNvbHV0aW9uIHRvIHByb3ZpZGUgaW5kZXBlbmRlbnQgaW1wbGVtZW50YXRpb24gZnJvbSBkaWZmZXJlbnQgVk5vZGUgY2xhc3Nlc1xyXG4gICAgcmVtb3ZlSXRlbShvbGROb2RlKTtcclxuICAgIGluc2VydE5ld0l0ZW0obmV3Tm9kZSk7XHJcbiAgfVxyXG4gIC8vIGJvdGggbnVsbCA6LT4gZG8gbm90aGluZ1xyXG4gIGVsc2UgaWYgKG9sZE5vZGUudHlwZSA9PT0gXCJOdWxsXCIgJiYgbmV3Tm9kZS50eXBlID09PSBcIk51bGxcIikgcmV0dXJuO1xyXG4gIC8vIGJvdGggVGV4dCBOb2RlcyA6LT4gdXBkYXRlIHRoZSB0ZXh0XHJcbiAgZWxzZSBpZiAob2xkTm9kZS50eXBlID09PSBcIlRleHROb2RlXCIgJiYgbmV3Tm9kZS50eXBlID09PSBcIlRleHROb2RlXCIpIHtcclxuICAgIGlmIChvbGROb2RlLm5vZGUhLm5vZGVWYWx1ZSAhPT0gbmV3Tm9kZS5wcm9wcy5jb250ZW50KSB7XHJcbiAgICAgIG9sZE5vZGUubm9kZSEubm9kZVZhbHVlID0gbmV3Tm9kZS5wcm9wcy5jb250ZW50O1xyXG4gICAgfVxyXG4gICAgbmV3Tm9kZS5ub2RlID0gb2xkTm9kZS5ub2RlO1xyXG4gIH1cclxuICAvLyBib3RoIEhUTUxFbGVtZW50IHdpdGggc2FtZSB0YWdcclxuICBlbHNlIGlmIChvbGROb2RlLnR5cGUgPT09IFwiRWxlbWVudFwiICYmIG5ld05vZGUudHlwZSA9PT0gXCJFbGVtZW50XCIpIHtcclxuICAgIGlmIChuZXdOb2RlLnRhZyA9PT0gb2xkTm9kZS50YWcpIHtcclxuICAgICAgbmV3Tm9kZS5ub2RlID0gb2xkTm9kZS5ub2RlO1xyXG4gICAgICAvLyAgICAgIHBhdGNoIHByb3BzLFxyXG4gICAgICAvLyB1cGRhdGUgcHJvcHMgZm9ybSBuZXcgbm9kZVxyXG4gICAgICBPYmplY3QuZW50cmllcyhuZXdOb2RlLnByb3BzKVxyXG4gICAgICAgIC5maWx0ZXIoKFtrLCB2XSkgPT4gb2xkTm9kZS5wcm9wc1trXSAhPT0gdilcclxuICAgICAgICAuZm9yRWFjaCgoW2tleSwgdmFsdWVdKSA9PiB7XHJcbiAgICAgICAgICBpZiAodmFsdWUgPT09IHRydWUpIG5ld05vZGUubm9kZS5zZXRBdHRyaWJ1dGUoa2V5LCBcIlwiKTtcclxuICAgICAgICAgIGVsc2UgaWYgKHZhbHVlID09PSBudWxsIHx8IHZhbHVlID09PSB1bmRlZmluZWQgfHwgdmFsdWUgPT09IGZhbHNlKVxyXG4gICAgICAgICAgICBuZXdOb2RlLm5vZGUucmVtb3ZlQXR0cmlidXRlKGtleSk7XHJcbiAgICAgICAgICBlbHNlIG5ld05vZGUubm9kZS5zZXRBdHRyaWJ1dGUoa2V5LCB2YWx1ZSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAvLyByZW1vdmUgb2xkLCBvYnNvbGF0ZSBhdHRyaWJ1dGVzXHJcbiAgICAgIE9iamVjdC5lbnRyaWVzKG9sZE5vZGUucHJvcHMpXHJcbiAgICAgICAgLmZpbHRlcigoW2ssIHZdKSA9PiAhbmV3Tm9kZS5wcm9wcy5oYXNPd25Qcm9wZXJ0eShrKSlcclxuICAgICAgICAuZm9yRWFjaCgoW2tleSwgdmFsdWVdKSA9PiB7XHJcbiAgICAgICAgICBvbGROb2RlLm5vZGUucmVtb3ZlQXR0cmlidXRlKGtleSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAvLyBjaGlsZHJlbiA9PiBpdGVyIGFuZCBwYXRjaFxyXG4gICAgICAvLyBvbGQgY2hpbGRyZW4gYmVpbmcgbW9kaWZpZWRcclxuICAgICAgZGlmZkFuZFBhdGNoQ2hpbGRyZW4ob2xkTm9kZSwgbmV3Tm9kZSk7XHJcbiAgICB9XHJcbiAgICAvLyB0YWcgaGFzIGNoYW5nZWRcclxuICAgIGVsc2Uge1xyXG4gICAgICBvbGROb2RlLm5vZGUucmVwbGFjZVdpdGgobmV3Tm9kZS5hc05vZGUoKSk7XHJcbiAgICB9XHJcbiAgfVxyXG4gIC8vIEZyYWdtZW50c1xyXG4gIGVsc2UgaWYgKG9sZE5vZGUudHlwZSA9PT0gXCJGcmFnbWVudFwiICYmIG5ld05vZGUudHlwZSA9PT0gXCJGcmFnbWVudFwiKSB7XHJcbiAgICAvLyBpdGVyYXRlLCBkaWZmIGFuZCBwYXRjaFxyXG4gICAgZGlmZkFuZFBhdGNoQ2hpbGRyZW4ob2xkTm9kZSwgbmV3Tm9kZSk7XHJcbiAgfSBlbHNlIGlmIChvbGROb2RlLnR5cGUgPT09IFwiUm9vdFwiKSB7XHJcbiAgICAvLyBpdGVyYXRlLCBkaWZmIGFuZCBwYXRjaFxyXG4gICAgZGlmZkFuZFBhdGNoQ2hpbGRyZW4ob2xkTm9kZSwgbmV3Tm9kZSk7XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBkaWZmQW5kUGF0Y2hDaGlsZHJlbihvbGROb2RlOiBWTm9kZSwgbmV3Tm9kZTogVk5vZGUpIHtcclxuICBvbGROb2RlLmNoaWxkcmVuLmZvckVhY2goKG9sZENoaWxkLCBpeCkgPT4ge1xyXG4gICAgY29uc3QgbmV3Q2hpbGQgPSBuZXdOb2RlLmNoaWxkcmVuW2l4XTtcclxuICAgIGlmIChuZXdDaGlsZCkgZGlmZkFuZFBhdGNoKG9sZENoaWxkLCBuZXdDaGlsZCk7XHJcbiAgICAvLyBjaGlsZCB3YXMgcmVtb3ZlZFxyXG4gICAgZWxzZSB7XHJcbiAgICAgIHJlbW92ZUl0ZW0ob2xkQ2hpbGQpO1xyXG4gICAgfVxyXG4gIH0pO1xyXG5cclxuICBjb25zdCBkb2N1bWVudEZyYWdtZW50ID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO1xyXG4gIC8vIG5ldyBhZGRpdGlvbiBpdGVtc1xyXG4gIGZvciAobGV0IGkgPSBvbGROb2RlLmNoaWxkcmVuLmxlbmd0aDsgaSA8IG5ld05vZGUuY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcclxuICAgIGlmIChuZXdOb2RlLmNoaWxkcmVuW2ldLnR5cGUgIT09IFwiTnVsbFwiKVxyXG4gICAgICBkb2N1bWVudEZyYWdtZW50LmFwcGVuZChuZXdOb2RlLmNoaWxkcmVuW2ldLmFzTm9kZSgpKTtcclxuICB9XHJcbiAgKG5ld05vZGUubm9kZVxyXG4gICAgPyBuZXdOb2RlLm5vZGVcclxuICAgIDogZ2V0UGFyZW50RWxlbWVudE5vZGUobmV3Tm9kZSkubm9kZVxyXG4gICkuaW5zZXJ0QmVmb3JlKGRvY3VtZW50RnJhZ21lbnQsIG51bGwpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBhc1ZOb2RlKHRhZzogc3RyaW5nIHwgRnVuY3Rpb24gfCB1bmRlZmluZWQsIHByb3BzOiBKc3hQcm9wcyk6IFZOb2RlIHtcclxuICBpZiAodHlwZW9mIHRhZyA9PT0gXCJmdW5jdGlvblwiKSB7XHJcbiAgICBsZXQgcmVzdWx0ID0gdGFnKHByb3BzKTtcclxuICAgIGlmIChyZXN1bHQgaW5zdGFuY2VvZiBKc3hOb2RlKSB7XHJcbiAgICAgIHJldHVybiAocmVzdWx0IGFzIEpzeE5vZGVJbnRlcmZhY2UpLmFzVk5vZGUoKTtcclxuICAgIH1cclxuICAgIC8vIGJpZyBAVE9ETzpcclxuICAgIGlmIChyZXN1bHQgaW5zdGFuY2VvZiBOb2RlKSB7XHJcbiAgICAgIGNvbnN0IG5vZGUgPSB7XHJcbiAgICAgICAgdGFnOiBcIl9fTk9ERV9fXCIsXHJcbiAgICAgICAgdHlwZTogXCI/XCIsXHJcbiAgICAgICAgcGFyZW50OiBudWxsLFxyXG4gICAgICAgIHByb3BzOiB7XHJcbiAgICAgICAgICBjb250ZW50OiByZXN1bHQsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBjaGlsZHJlbjogW10sXHJcbiAgICAgICAgYXNOb2RlKCkge1xyXG4gICAgICAgICAgbm9kZS5ub2RlID0gcmVzdWx0O1xyXG4gICAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGRpZmZBbmRQYXRjaCgpIHtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKFwiX19OT0RFX18gMSBkaWZmQW5kUGF0Y2hcIiwgcmVzdWx0KTtcclxuICAgICAgICB9LFxyXG4gICAgICB9O1xyXG5cclxuICAgICAgcmV0dXJuIG5vZGU7XHJcbiAgICB9XHJcblxyXG4gICAgLypmdW5jdGlvbiBnZXRGaXJzdEVsZW1lbnQobm5uOiBWTm9kZSkge1xyXG4gICAgICBpZiAobm5uLnR5cGUgPT09IFwiRWxlbWVudFwiKSByZXR1cm4gbm5uLm5vZGU7XHJcbiAgICAgIGlmIChubm4udHlwZSA9PT0gXCJOdWxsXCIpIHJldHVybiBudWxsO1xyXG4gICAgICBpZiAobm5uLnR5cGUgPT09IFwiRnJhZ21lbnRcIikge1xyXG4gICAgICAgIGNvbnN0IGl0ZW0gPSBubm4uY2hpbGRyZW4uZmluZCgobjIpID0+IGdldEZpcnN0RWxlbWVudChuMikgIT09IG51bGwpO1xyXG4gICAgICAgIHJldHVybiBpdGVtID8gaXRlbS5ub2RlIDogbnVsbDtcclxuICAgICAgfVxyXG4gICAgfSovXHJcblxyXG4gICAgLy8gbnVsbCBqc3ggbm9kZVxyXG4gICAgaWYgKCF0cnV0aHkocmVzdWx0KSkge1xyXG4gICAgICBjb25zdCBmb29Ob2RlOiBWTm9kZSA9IHt9O1xyXG4gICAgICBPYmplY3QuYXNzaWduKGZvb05vZGUsIHtcclxuICAgICAgICB0YWc6IFwiX19OVUxMX19cIixcclxuICAgICAgICB0eXBlOiBcIk51bGxcIixcclxuICAgICAgICB0YWcyOiBcInRhZyBmdW5jIHJldHVybmVkIG51bGwgbm9kZVwiLFxyXG4gICAgICAgIG5vZGU6IG51bGwsXHJcbiAgICAgICAgcGFyZW50OiBudWxsLFxyXG4gICAgICAgIHByb3BzOiB7fSxcclxuICAgICAgICBjaGlsZHJlbjogW10sXHJcbiAgICAgICAgYXNOb2RlKCkge1xyXG4gICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBkaWZmQW5kUGF0Y2gobmV3Tm9kZTogVk5vZGUpIHtcclxuICAgICAgICAgIHJldHVybiBkaWZmQW5kUGF0Y2goZm9vTm9kZSwgbmV3Tm9kZSk7XHJcblxyXG4gICAgICAgICAgaWYgKG5ld05vZGUudHlwZSA9PT0gXCJOdWxsXCIpIHJldHVybjtcclxuICAgICAgICAgIGNvbnN0IG4gPSBuZXdOb2RlLmFzTm9kZSgpO1xyXG5cclxuICAgICAgICAgIC8vIEBUT0RPOiBmaW5kIGl0ZW0gYmVmb3JlXHJcbiAgICAgICAgICAvL3ZOb2RlLm5vZGVcclxuICAgICAgICAgIGNvbnN0IHNpYmxpbmdzID0gZ2V0U2libGluZ3MobmV3Tm9kZSk7XHJcbiAgICAgICAgICBjb25zdCBuZXdOb2RlSW5kZXggPSBzaWJsaW5ncy5pbmRleE9mKG5ld05vZGUpO1xyXG5cclxuICAgICAgICAgIGxldCBzaWJsaW5nQmVmb3JlID0gc2libGluZ3NbbmV3Tm9kZUluZGV4IC0gMV0gfHwgbnVsbDsgLy8gPSBzaWJsaW5ncy5maW5kKChuOiBWTm9kZSkgPT4gbi5ub2RlKTtcclxuICAgICAgICAgIC8qZm9yIChsZXQgaWkgPSBuZXdOb2RlSW5kZXggLSAxOyBpaSA+PSAwOyBpaS0tKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGVsID0gZ2V0Rmlyc3RFbGVtZW50KHNpYmxpbmdzW2lpXSk7XHJcbiAgICAgICAgICAgIGlmIChlbCkge1xyXG4gICAgICAgICAgICAgIHNpYmxpbmdCZWZvcmUgPSBlbDtcclxuICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSovXHJcbiAgICAgICAgICBpZiAoc2libGluZ0JlZm9yZSkge1xyXG4gICAgICAgICAgICBpZiAobikgc2libGluZ0JlZm9yZS5ub2RlLmluc2VydEFkamFjZW50RWxlbWVudChcImFmdGVyZW5kXCIsIG4pO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgZ2V0UGFyZW50RWxlbWVudE5vZGUobmV3Tm9kZSkubm9kZS5pbnNlcnRBZGphY2VudEVsZW1lbnQoXHJcbiAgICAgICAgICAgICAgXCJhZnRlcmJlZ2luXCIsXHJcbiAgICAgICAgICAgICAgblxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgcmV0dXJuIGZvb05vZGU7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3Qgbm9kZSA9IHtcclxuICAgICAgdGFnOiBcIl9fVEVYVF9OT0RFX19cIixcclxuICAgICAgdHB5ZTogXCJUZXh0Tm9kZVwiLFxyXG4gICAgICB0YWcxOiAxLFxyXG4gICAgICBub2RlOiBudWxsLFxyXG4gICAgICBwYXJlbnQ6IG51bGwsXHJcbiAgICAgIHByb3BzOiB7XHJcbiAgICAgICAgY29udGVudDogcmVzdWx0LFxyXG4gICAgICB9LFxyXG4gICAgICBjaGlsZHJlbjogW10sXHJcbiAgICAgIGFzTm9kZSgpIHtcclxuICAgICAgICBjb25zdCB0ZXh0Tm9kZSA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKHJlc3VsdCk7XHJcbiAgICAgICAgbm9kZS5ub2RlID0gdGV4dE5vZGU7XHJcbiAgICAgICAgcmV0dXJuIHRleHROb2RlO1xyXG4gICAgICB9LFxyXG4gICAgICBkaWZmQW5kUGF0Y2gobmV3Tm9kZSkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFxyXG4gICAgICAgICAgXCJfX1RFWFRfTk9ERV9fIDEgZGlmZkFuZFBhdGNoXCIsXHJcbiAgICAgICAgICByZXN1bHQsXHJcbiAgICAgICAgICBuZXdOb2RlLnByb3BzLmNvbnRlbnRcclxuICAgICAgICApO1xyXG5cclxuICAgICAgICByZXR1cm4gZGlmZkFuZFBhdGNoKG5vZGUsIG5ld05vZGUpO1xyXG5cclxuICAgICAgICAvLyBAVE9ETyBib3RoIHRleHRcclxuICAgICAgICBpZiAocmVzdWx0ICE9PSBuZXdOb2RlLnByb3BzLmNvbnRlbnQpXHJcbiAgICAgICAgICBub2RlLm5vZGUubm9kZVZhbHVlID0gbmV3Tm9kZS5wcm9wcy5jb250ZW50O1xyXG4gICAgICAgIC8vIGVsc2UgP1xyXG4gICAgICB9LFxyXG4gICAgfTtcclxuXHJcbiAgICByZXR1cm4gbm9kZTtcclxuICB9XHJcblxyXG4gIGNvbnN0IHsgY2hpbGRyZW4sIC4uLmF0dHIgfSA9IHByb3BzO1xyXG4gIGNvbnN0IHZOb2RlOiBWTm9kZSA9IHt9O1xyXG4gIGlmICh0YWcpIHtcclxuICAgIE9iamVjdC5hc3NpZ24odk5vZGUsIHtcclxuICAgICAgdGFnLFxyXG4gICAgICB0eXBlOiBcIkVsZW1lbnRcIiwgLy8gd2hlcmUgY29tZXMgRnJhZ2VtbnQ/XHJcbiAgICAgIHRhZzI6IFwiYXNWTm9kZSAtIG5vcm1hbCByZXR1cm5cIixcclxuICAgICAgbm9kZTogbnVsbCxcclxuICAgICAgcHJvcHM6IGF0dHIsXHJcbiAgICAgIGNoaWxkcmVuOiBjaGlsZHJlbi5mbGF0KCkubWFwKChjaGlsZCkgPT4ge1xyXG4gICAgICAgIGlmIChjaGlsZCBpbnN0YW5jZW9mIEpzeE5vZGUpIHtcclxuICAgICAgICAgIGNvbnN0IGNoaWxkVk5vZGUgPSBjaGlsZC5hc1ZOb2RlKCk7XHJcbiAgICAgICAgICBjaGlsZFZOb2RlLnBhcmVudCA9IHZOb2RlO1xyXG4gICAgICAgICAgcmV0dXJuIGNoaWxkVk5vZGU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChjaGlsZCBpbnN0YW5jZW9mIE5vZGUpIHtcclxuICAgICAgICAgIGNvbnN0IG5vZGUgPSB7XHJcbiAgICAgICAgICAgIHRhZzogXCJfX05PREVfX1wiLFxyXG4gICAgICAgICAgICBwcm9wczoge1xyXG4gICAgICAgICAgICAgIGNvbnRlbnQ6IGNoaWxkLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBwYXJlbnQ6IHZOb2RlLFxyXG4gICAgICAgICAgICBjaGlsZHJlbjogW10sXHJcbiAgICAgICAgICAgIGFzTm9kZSgpIHtcclxuICAgICAgICAgICAgICBub2RlLm5vZGUgPSBjaGlsZDtcclxuICAgICAgICAgICAgICByZXR1cm4gY2hpbGQ7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGRpZmZBbmRQYXRjaCgpIHtcclxuICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIl9fTk9ERV9fIGRpZmZBbmRQYXRjaFwiLCBjaGlsZCk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgIHJldHVybiBub2RlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc29sZS5sb2coXCJAQCBtYXBcIiwgeyBjaGlsZCB9KTtcclxuXHJcbiAgICAgICAgaWYgKGNoaWxkID09PSBudWxsIHx8IGNoaWxkID09PSBmYWxzZSB8fCBjaGlsZCA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICBjb25zdCBjaGlsZFZOb2RlOiBWTm9kZSA9IHtcclxuICAgICAgICAgICAgdGFnOiBcIl9fTlVMTF9fXCIsXHJcbiAgICAgICAgICAgIHR5cGU6IFwiTnVsbFwiLFxyXG4gICAgICAgICAgICB0YWcyOiBcImNoaWxkcmVuIG51bGwgbm9kZVwiLFxyXG4gICAgICAgICAgICBub2RlOiBudWxsLFxyXG4gICAgICAgICAgICBwYXJlbnQ6IHZOb2RlLFxyXG4gICAgICAgICAgICBwcm9wczoge30sXHJcbiAgICAgICAgICAgIGNoaWxkcmVuOiBbXSxcclxuICAgICAgICAgICAgYXNOb2RlKCkge1xyXG4gICAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBkaWZmQW5kUGF0Y2gobmV3Tm9kZTogVk5vZGUpIHtcclxuICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImRpZmYtQW5kUGF0Y2gsIGNoaWxkIG5vZGUgd2FzIG51bGxcIiwgbmV3Tm9kZSk7XHJcblxyXG4gICAgICAgICAgICAgIGlmIChuZXdOb2RlLnRhZyA9PT0gXCJfX05VTExfX1wiKSByZXR1cm47XHJcbiAgICAgICAgICAgICAgY29uc3QgbiA9IG5ld05vZGUuYXNOb2RlKCk7XHJcbiAgICAgICAgICAgICAgLy8gQFRPRE86IGZpbmQgaXRlbSBiZWZvcmVcclxuICAgICAgICAgICAgICAvL3ZOb2RlLm5vZGVcclxuICAgICAgICAgICAgICBjb25zdCBuZXdOb2RlSW5kZXggPSBuZXdOb2RlLnBhcmVudC5jaGlsZHJlbi5pbmRleE9mKG5ld05vZGUpO1xyXG4gICAgICAgICAgICAgIGNvbnN0IHNpYmxpbmdzID0gbmV3Tm9kZS5wYXJlbnQuY2hpbGRyZW5cclxuICAgICAgICAgICAgICAgIC5zbGljZSgwLCBuZXdOb2RlSW5kZXgpXHJcbiAgICAgICAgICAgICAgICAucmV2ZXJzZSgpO1xyXG4gICAgICAgICAgICAgIGNvbnN0IHNpYmxpbmdCZWZvcmUgPSBzaWJsaW5ncy5maW5kKChuOiBWTm9kZSkgPT4gbi5ub2RlKTtcclxuICAgICAgICAgICAgICBjb25zb2xlLmxvZyh7IHNpYmxpbmdCZWZvcmUsIHNpYmxpbmdzLCBuZXdOb2RlSW5kZXgsIG5ld05vZGUgfSk7XHJcblxyXG4gICAgICAgICAgICAgIGlmIChzaWJsaW5nQmVmb3JlKSB7XHJcbiAgICAgICAgICAgICAgICBzaWJsaW5nQmVmb3JlLm5vZGUuaW5zZXJ0QWRqYWNlbnRFbGVtZW50KFwiYWZ0ZXJlbmRcIiwgbik7XHJcbiAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHZOb2RlLm5vZGUuaW5zZXJ0QWRqYWNlbnRFbGVtZW50KFwiYWZ0ZXJiZWdpblwiLCBuKTtcclxuICAgICAgICAgICAgICAgIC8qKG5ld05vZGUucGFyZW50Lm5vZGUgYXMgSFRNTEVsZW1lbnQpLmluc2VydEFkamFjZW50RWxlbWVudChcclxuICAgICAgICAgICAgICAgIFwiYWZ0ZXJiZWdpblwiLFxyXG4gICAgICAgICAgICAgICAgbmV3Tm9kZS5hc05vZGUoKVxyXG4gICAgICAgICAgICAgICk7Ki9cclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgIHJldHVybiBjaGlsZFZOb2RlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc29sZS5sb2coXCI6OjpcIiwgeyBjaGlsZCB9KTtcclxuXHJcbiAgICAgICAgY29uc3Qgbm9kZSA9IHtcclxuICAgICAgICAgIHRhZzogXCJfX1RFWFRfTk9ERV9fXCIsXHJcbiAgICAgICAgICB0eXBlOiBcIlRleHROb2RlXCIsXHJcbiAgICAgICAgICB0YWcyOiBcImNoaWxkcmVuIFRleHQgbm9kZVwiLFxyXG4gICAgICAgICAgbm9kZTogbnVsbCxcclxuICAgICAgICAgIHBhcmVudDogdk5vZGUsXHJcbiAgICAgICAgICBwcm9wczoge1xyXG4gICAgICAgICAgICBjb250ZW50OiBjaGlsZCxcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICBjaGlsZHJlbjogW10sXHJcbiAgICAgICAgICBhc05vZGUoKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHRleHROb2RlID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY2hpbGQpO1xyXG4gICAgICAgICAgICBub2RlLm5vZGUgPSB0ZXh0Tm9kZTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2codGV4dE5vZGUsIG5vZGUpO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHRleHROb2RlO1xyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIC8vIHRvcCBsZXZlbCB2bm9kZVxyXG4gICAgICAgICAgZGlmZkFuZFBhdGNoKG5ld05vZGU6IFZOb2RlKSB7XHJcbiAgICAgICAgICAgIC8vIEBUT0RPIGJvdGggdGV4dD9cclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJjaGFuZ2U/IFwiLCBuZXdOb2RlLnRhZywgbm9kZS50YWcpO1xyXG5cclxuICAgICAgICAgICAgaWYgKG5ld05vZGUudGFnICE9PSBub2RlLnRhZykge1xyXG4gICAgICAgICAgICAgIGNvbnN0IGFzTm9kZSA9IG5ld05vZGUuYXNOb2RlKCk7XHJcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coeyBhc05vZGUgfSk7XHJcblxyXG4gICAgICAgICAgICAgIGlmIChhc05vZGUpIHtcclxuICAgICAgICAgICAgICAgIG5vZGUubm9kZS5yZXBsYWNlV2l0aChhc05vZGUpO1xyXG4gICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBub2RlLm5vZGUucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChub2RlLm5vZGUpO1xyXG4gICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChjaGlsZCAhPT0gbmV3Tm9kZS5wcm9wcy5jb250ZW50KVxyXG4gICAgICAgICAgICAgIG5vZGUubm9kZS5ub2RlVmFsdWUgPSBuZXdOb2RlLnByb3BzLmNvbnRlbnQ7XHJcbiAgICAgICAgICAgIG5ld05vZGUubm9kZSA9IG5vZGUubm9kZTtcclxuICAgICAgICAgICAgLy8gZWxzZSA/XHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHJldHVybiBub2RlO1xyXG4gICAgICB9KSxcclxuXHJcbiAgICAgIGFzTm9kZSgpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcImFzVk5vZGUuYXNOb2RlXCIsIHsgdGFnLCBwcm9wcywgdk5vZGUgfSk7XHJcblxyXG4gICAgICAgIGNvbnN0IG5vZGUgPSBhc05vZGUodGFnLCBhdHRyLCB2Tm9kZS5jaGlsZHJlbilbMF07XHJcbiAgICAgICAgdk5vZGUubm9kZSA9IG5vZGU7XHJcbiAgICAgICAgY29uc29sZS5sb2coeyBub2RlIH0pO1xyXG5cclxuICAgICAgICByZXR1cm4gbm9kZTtcclxuICAgICAgfSxcclxuICAgICAgLy8gdG8gbGV2ZWxcclxuICAgICAgZGlmZkFuZFBhdGNoKG5ld1ZOb2RlOiBWTm9kZSkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiZGlmZkFuZFBhdGNoXCIpO1xyXG5cclxuICAgICAgICByZXR1cm4gZGlmZkFuZFBhdGNoKHZOb2RlLCBuZXdWTm9kZSk7XHJcblxyXG4gICAgICAgIC8vID8gd2hlbj9cclxuICAgICAgICBpZiAoIW5ld1ZOb2RlKSB7XHJcbiAgICAgICAgICAodk5vZGUubm9kZSEgYXMgSFRNTEVsZW1lbnQpLnBhcmVudE5vZGUhLnJlbW92ZUNoaWxkKFxyXG4gICAgICAgICAgICB2Tm9kZS5ub2RlISBhcyBIVE1MRWxlbWVudFxyXG4gICAgICAgICAgKTtcclxuICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChuZXdWTm9kZS50YWcgIT09IHRhZykge1xyXG4gICAgICAgICAgY29uc3QgbmV3Tm9kZSA9IG5ld1ZOb2RlLmFzTm9kZSgpO1xyXG4gICAgICAgICAgaWYgKHZOb2RlLm5vZGUpIHtcclxuICAgICAgICAgICAgaWYgKG5ld05vZGUpICh2Tm9kZS5ub2RlISBhcyBIVE1MRWxlbWVudCkucmVwbGFjZVdpdGgobmV3Tm9kZSk7XHJcbiAgICAgICAgICAgIGVsc2Ugdk5vZGUubm9kZS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHZOb2RlLm5vZGUpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gQFRPRE86IGlmIHNwZWNpYWwgdGFnc1xyXG5cclxuICAgICAgICAvLyB1cGRhdGUgcHJvcHMgZm9ybSBuZXcgbm9kZVxyXG4gICAgICAgIE9iamVjdC5lbnRyaWVzKG5ld1ZOb2RlLnByb3BzKVxyXG4gICAgICAgICAgLmZpbHRlcigoW2ssIHZdKSA9PiBwcm9wc1trXSAhPT0gdilcclxuICAgICAgICAgIC5mb3JFYWNoKChba2V5LCB2YWx1ZV0pID0+IHtcclxuICAgICAgICAgICAgaWYgKHZhbHVlID09PSB0cnVlKSB2Tm9kZS5ub2RlLnNldEF0dHJpYnV0ZShrZXksIFwiXCIpO1xyXG4gICAgICAgICAgICBlbHNlIGlmICh2YWx1ZSA9PT0gbnVsbCB8fCB2YWx1ZSA9PT0gdW5kZWZpbmVkIHx8IHZhbHVlID09PSBmYWxzZSlcclxuICAgICAgICAgICAgICB2Tm9kZS5ub2RlLnJlbW92ZUF0dHJpYnV0ZShrZXkpO1xyXG4gICAgICAgICAgICBlbHNlIHZOb2RlLm5vZGUuc2V0QXR0cmlidXRlKGtleSwgdmFsdWUpO1xyXG4gICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vIHJlbW92ZSBvbGQsIG9ic29sYXRlIGF0dHJpYnV0ZXNcclxuICAgICAgICBPYmplY3QuZW50cmllcyh2Tm9kZS5wcm9wcylcclxuICAgICAgICAgIC5maWx0ZXIoKFtrLCB2XSkgPT4gIW5ld1ZOb2RlLnByb3BzLmhhc093blByb3BlcnR5KGspKVxyXG4gICAgICAgICAgLmZvckVhY2goKFtrZXksIHZhbHVlXSkgPT4ge1xyXG4gICAgICAgICAgICB2Tm9kZS5ub2RlLnJlbW92ZUF0dHJpYnV0ZShrZXkpO1xyXG4gICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIG5ld1ZOb2RlLm5vZGUgPSB2Tm9kZS5ub2RlO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwibm9kZSB1cGRhdGVcIiwgbmV3Vk5vZGUsIHZOb2RlKTtcclxuXHJcbiAgICAgICAgLy8gQFRPRE86IHByb3BzIG5vdCBhdHRyaWJ1dGVzXHJcblxyXG4gICAgICAgIC8vIGNoaWxkcmVuXHJcbiAgICAgICAgdk5vZGUuY2hpbGRyZW4uZm9yRWFjaCgoY2hpbGQsIGl4KSA9PlxyXG4gICAgICAgICAgY2hpbGQuZGlmZkFuZFBhdGNoKG5ld1ZOb2RlLmNoaWxkcmVuW2l4XSlcclxuICAgICAgICApO1xyXG4gICAgICAgIC8vIEBUT0RPOiBuZXcgY2hpbGRyZW5cclxuICAgICAgICBmb3IgKGxldCBpID0gdk5vZGUuY2hpbGRyZW4ubGVuZ3RoOyBpIDwgbmV3Vk5vZGUuY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgIHZOb2RlLm5vZGUuaW5zZXJ0QWRqYWNlbnRFbGVtZW50KFxyXG4gICAgICAgICAgICBcImJlZm9yZWVuZFwiLFxyXG4gICAgICAgICAgICBuZXdWTm9kZS5jaGlsZHJlbltpXS5hc05vZGUoKVxyXG4gICAgICAgICAgKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0sXHJcbiAgICB9KTtcclxuICB9IGVsc2Uge1xyXG4gICAgT2JqZWN0LmFzc2lnbih2Tm9kZSwge1xyXG4gICAgICB0YWcsXHJcbiAgICAgIHR5cGU6IFwiRnJhZ21lbnRcIiwgLy8gd2hlcmUgY29tZXMgRnJhZ2VtbnQ/XHJcbiAgICAgIHRhZzI6IFwiYXNWTm9kZSAtIG5vcm1hbCByZXR1cm4gRnJhZ21lbnRcIixcclxuICAgICAgbm9kZTogbnVsbCxcclxuICAgICAgY2hpbGRyZW46IGNoaWxkcmVuLmZsYXQoKS5tYXAoKGNoaWxkKSA9PiB7XHJcbiAgICAgICAgaWYgKGNoaWxkIGluc3RhbmNlb2YgSnN4Tm9kZSkge1xyXG4gICAgICAgICAgY29uc3QgY2hpbGRWTm9kZSA9IGNoaWxkLmFzVk5vZGUoKTtcclxuICAgICAgICAgIGNoaWxkVk5vZGUucGFyZW50ID0gdk5vZGU7XHJcbiAgICAgICAgICByZXR1cm4gY2hpbGRWTm9kZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGNoaWxkIGluc3RhbmNlb2YgTm9kZSkge1xyXG4gICAgICAgICAgY29uc3Qgbm9kZSA9IHtcclxuICAgICAgICAgICAgdGFnOiBcIl9fTk9ERV9fXCIsXHJcbiAgICAgICAgICAgIHByb3BzOiB7XHJcbiAgICAgICAgICAgICAgY29udGVudDogY2hpbGQsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHBhcmVudDogdk5vZGUsXHJcbiAgICAgICAgICAgIGNoaWxkcmVuOiBbXSxcclxuICAgICAgICAgICAgYXNOb2RlKCkge1xyXG4gICAgICAgICAgICAgIG5vZGUubm9kZSA9IGNoaWxkO1xyXG4gICAgICAgICAgICAgIHJldHVybiBjaGlsZDtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZGlmZkFuZFBhdGNoKCkge1xyXG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiX19OT0RFX18gZGlmZkFuZFBhdGNoXCIsIGNoaWxkKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgcmV0dXJuIG5vZGU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zb2xlLmxvZyhcIkBAIG1hcFwiLCB7IGNoaWxkIH0pO1xyXG5cclxuICAgICAgICBpZiAoY2hpbGQgPT09IG51bGwgfHwgY2hpbGQgPT09IGZhbHNlIHx8IGNoaWxkID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgIGNvbnN0IGNoaWxkVk5vZGU6IFZOb2RlID0ge1xyXG4gICAgICAgICAgICB0YWc6IFwiX19OVUxMX19cIixcclxuICAgICAgICAgICAgdHlwZTogXCJOdWxsXCIsXHJcbiAgICAgICAgICAgIHRhZzI6IFwiY2hpbGRyZW4gbnVsbCBub2RlXCIsXHJcbiAgICAgICAgICAgIG5vZGU6IG51bGwsXHJcbiAgICAgICAgICAgIHBhcmVudDogdk5vZGUsXHJcbiAgICAgICAgICAgIHByb3BzOiB7fSxcclxuICAgICAgICAgICAgY2hpbGRyZW46IFtdLFxyXG4gICAgICAgICAgICBhc05vZGUoKSB7XHJcbiAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGRpZmZBbmRQYXRjaChuZXdOb2RlOiBWTm9kZSkge1xyXG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiZGlmZi1BbmRQYXRjaCwgY2hpbGQgbm9kZSB3YXMgbnVsbFwiLCBuZXdOb2RlKTtcclxuXHJcbiAgICAgICAgICAgICAgaWYgKG5ld05vZGUudGFnID09PSBcIl9fTlVMTF9fXCIpIHJldHVybjtcclxuICAgICAgICAgICAgICBjb25zdCBuID0gbmV3Tm9kZS5hc05vZGUoKTtcclxuICAgICAgICAgICAgICAvLyBAVE9ETzogZmluZCBpdGVtIGJlZm9yZVxyXG4gICAgICAgICAgICAgIC8vdk5vZGUubm9kZVxyXG4gICAgICAgICAgICAgIGNvbnN0IG5ld05vZGVJbmRleCA9IG5ld05vZGUucGFyZW50LmNoaWxkcmVuLmluZGV4T2YobmV3Tm9kZSk7XHJcbiAgICAgICAgICAgICAgY29uc3Qgc2libGluZ3MgPSBuZXdOb2RlLnBhcmVudC5jaGlsZHJlblxyXG4gICAgICAgICAgICAgICAgLnNsaWNlKDAsIG5ld05vZGVJbmRleClcclxuICAgICAgICAgICAgICAgIC5yZXZlcnNlKCk7XHJcbiAgICAgICAgICAgICAgY29uc3Qgc2libGluZ0JlZm9yZSA9IHNpYmxpbmdzLmZpbmQoKG46IFZOb2RlKSA9PiBuLm5vZGUpO1xyXG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKHsgc2libGluZ0JlZm9yZSwgc2libGluZ3MsIG5ld05vZGVJbmRleCwgbmV3Tm9kZSB9KTtcclxuXHJcbiAgICAgICAgICAgICAgaWYgKHNpYmxpbmdCZWZvcmUpIHtcclxuICAgICAgICAgICAgICAgIHNpYmxpbmdCZWZvcmUubm9kZS5pbnNlcnRBZGphY2VudEVsZW1lbnQoXCJhZnRlcmVuZFwiLCBuKTtcclxuICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdk5vZGUubm9kZS5pbnNlcnRBZGphY2VudEVsZW1lbnQoXCJhZnRlcmJlZ2luXCIsIG4pO1xyXG4gICAgICAgICAgICAgICAgLyoobmV3Tm9kZS5wYXJlbnQubm9kZSBhcyBIVE1MRWxlbWVudCkuaW5zZXJ0QWRqYWNlbnRFbGVtZW50KFxyXG4gICAgICAgICAgICAgICAgICBcImFmdGVyYmVnaW5cIixcclxuICAgICAgICAgICAgICAgICAgbmV3Tm9kZS5hc05vZGUoKVxyXG4gICAgICAgICAgICAgICAgKTsqL1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgcmV0dXJuIGNoaWxkVk5vZGU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zb2xlLmxvZyhcIjo6OlwiLCB7IGNoaWxkIH0pO1xyXG5cclxuICAgICAgICBjb25zdCBub2RlID0ge1xyXG4gICAgICAgICAgdGFnOiBcIl9fVEVYVF9OT0RFX19cIixcclxuICAgICAgICAgIHR5cGU6IFwiVGV4dE5vZGVcIixcclxuICAgICAgICAgIHRhZzI6IFwiY2hpbGRyZW4gVGV4dCBub2RlXCIsXHJcbiAgICAgICAgICBub2RlOiBudWxsLFxyXG4gICAgICAgICAgcGFyZW50OiB2Tm9kZSxcclxuICAgICAgICAgIHByb3BzOiB7XHJcbiAgICAgICAgICAgIGNvbnRlbnQ6IGNoaWxkLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIGNoaWxkcmVuOiBbXSxcclxuICAgICAgICAgIGFzTm9kZSgpIHtcclxuICAgICAgICAgICAgY29uc3QgdGV4dE5vZGUgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjaGlsZCk7XHJcbiAgICAgICAgICAgIG5vZGUubm9kZSA9IHRleHROb2RlO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyh0ZXh0Tm9kZSwgbm9kZSk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gdGV4dE5vZGU7XHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgLy8gdG9wIGxldmVsIHZub2RlXHJcbiAgICAgICAgICBkaWZmQW5kUGF0Y2gobmV3Tm9kZTogVk5vZGUpIHtcclxuICAgICAgICAgICAgLy8gQFRPRE8gYm90aCB0ZXh0P1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImNoYW5nZT8gXCIsIG5ld05vZGUudGFnLCBub2RlLnRhZyk7XHJcblxyXG4gICAgICAgICAgICBpZiAobmV3Tm9kZS50YWcgIT09IG5vZGUudGFnKSB7XHJcbiAgICAgICAgICAgICAgY29uc3QgYXNOb2RlID0gbmV3Tm9kZS5hc05vZGUoKTtcclxuICAgICAgICAgICAgICBjb25zb2xlLmxvZyh7IGFzTm9kZSB9KTtcclxuXHJcbiAgICAgICAgICAgICAgaWYgKGFzTm9kZSkge1xyXG4gICAgICAgICAgICAgICAgbm9kZS5ub2RlLnJlcGxhY2VXaXRoKGFzTm9kZSk7XHJcbiAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIG5vZGUubm9kZS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKG5vZGUubm9kZSk7XHJcbiAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGNoaWxkICE9PSBuZXdOb2RlLnByb3BzLmNvbnRlbnQpXHJcbiAgICAgICAgICAgICAgbm9kZS5ub2RlLm5vZGVWYWx1ZSA9IG5ld05vZGUucHJvcHMuY29udGVudDtcclxuICAgICAgICAgICAgbmV3Tm9kZS5ub2RlID0gbm9kZS5ub2RlO1xyXG4gICAgICAgICAgICAvLyBlbHNlID9cclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgcmV0dXJuIG5vZGU7XHJcbiAgICAgIH0pLFxyXG5cclxuICAgICAgYXNOb2RlKCkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiYXNWTm9kZS5hc05vZGVcIiwgeyB0YWcsIHByb3BzLCB2Tm9kZSB9KTtcclxuXHJcbiAgICAgICAgY29uc3Qgbm9kZSA9IGFzTm9kZSh1bmRlZmluZWQsIHt9LCB2Tm9kZS5jaGlsZHJlbilbMF07XHJcbiAgICAgICAgLy8gdk5vZGUubm9kZSA9IG5vZGU7XHJcbiAgICAgICAgY29uc29sZS5sb2coeyBub2RlIH0pO1xyXG5cclxuICAgICAgICByZXR1cm4gbm9kZTtcclxuICAgICAgfSxcclxuICAgICAgLy8gdG8gbGV2ZWxcclxuICAgICAgZGlmZkFuZFBhdGNoKG5ld1ZOb2RlOiBWTm9kZSkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiZGlmZkFuZFBhdGNoXCIpO1xyXG5cclxuICAgICAgICByZXR1cm4gZGlmZkFuZFBhdGNoKHZOb2RlLCBuZXdWTm9kZSk7XHJcbiAgICAgIH0sXHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHJldHVybiB2Tm9kZTtcclxufVxyXG5cclxuLyoqXHJcbiAqIGNvbnZlcnRzIHByYWdtYSBvYmplY3QgdG8gaHRtbCBzdHJpbmdcclxuICoganN4cyBpcyBhbHdheXMgY2FsbGVkIHdoZW4gZWxlbWVudCBoYXMgbW9yZSB0aGFuIG9uZSBjaGlsZFxyXG4gKlxyXG4gKiBAcGFyYW0ge3N0cmluZyB8IEZ1bmN0aW9ufSB0YWcgLSB0YWcgbmFtZSBvciB0YWcgY2xhc3NcclxuICogQHBhcmFtIHtPYmplY3QgfCBudWxsfSBwcm9wcyAtIHByb3BzIGZvciB0aGUgdGFnXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24ganN4cyhcclxuICB0YWc6IHN0cmluZyB8IEZ1bmN0aW9uLFxyXG4gIHByb3BzOiBKc3hQcm9wc1xyXG4pOiBKc3hOb2RlSW50ZXJmYWNlIHtcclxuICBsZXQgbm9kZTogTm9kZTtcclxuICBsZXQganN4Tm9kZXM6IEpzeE5vZGVJbnRlcmZhY2VbXTtcclxuICBwcm9wcy5jaGlsZHJlbiA9IHByb3BzLmNoaWxkcmVuLmZsYXQoKTsgLy8gQFRPRE86IGRvY1xyXG5cclxuICAvLyBpZiByZWYgcHJvcCBpcyBwcm92aWRlZCwgbWVtb3JpemUgYW5kIHJlbW92ZSBmcm9tIHRoZSBodG1sIGdlbmVyYXRpb24gcHJvY2Vzc1xyXG4gIGNvbnN0IHJlZjogRnVuY3Rpb24gfCBudWxsID1cclxuICAgIHR5cGVvZiBwcm9wcy5yZWYgPT09IFwiZnVuY3Rpb25cIiA/IHByb3BzLnJlZiA6IG51bGw7XHJcbiAgaWYgKHJlZikgZGVsZXRlIHByb3BzLnJlZjtcclxuXHJcbiAgcmV0dXJuIG5ldyAoY2xhc3MgZXh0ZW5kcyBKc3hOb2RlIGltcGxlbWVudHMgSnN4Tm9kZUludGVyZmFjZSB7XHJcbiAgICB0b1N0cmluZygpIHtcclxuICAgICAgcmV0dXJuIGFzSHRtbFN0cmluZyh0YWcsIHRoaXMucHJvcHMpO1xyXG4gICAgfVxyXG5cclxuICAgIGFzTm9kZSgpIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiZGVwcmVjYXRlZCBqc3hzXCIpO1xyXG4gICAgICBbbm9kZSwganN4Tm9kZXNdID0gYXNOb2RlKHRhZywgdGhpcy5wcm9wcyk7XHJcblxyXG4gICAgICByZXR1cm4gbm9kZTtcclxuICAgIH1cclxuICAgIGFzVk5vZGUoKSB7XHJcbiAgICAgIHJldHVybiBhc1ZOb2RlKHRhZywgdGhpcy5wcm9wcyk7XHJcbiAgICB9XHJcblxyXG4gICAgW19jYWxsUmVmc10oKSB7XHJcbiAgICAgIGlmIChyZWYgJiYgbm9kZSkgcmVmKG5vZGUpO1xyXG5cclxuICAgICAgaWYgKHR5cGVvZiB0YWcgPT09IFwiZnVuY3Rpb25cIikge1xyXG4gICAgICAgIGpzeE5vZGVzLmZvckVhY2goKG5vZGVJdGVtKSA9PiBub2RlSXRlbVtfY2FsbFJlZnNdKCkpO1xyXG4gICAgICB9IGVsc2UgaWYgKHRoaXMucHJvcHMuY2hpbGRyZW4pIHtcclxuICAgICAgICB0aGlzLnByb3BzLmNoaWxkcmVuXHJcbiAgICAgICAgICAuZmxhdCgpXHJcbiAgICAgICAgICAuZmlsdGVyKChjaGlsZCkgPT4gY2hpbGQgaW5zdGFuY2VvZiBKc3hOb2RlKVxyXG4gICAgICAgICAgLmZvckVhY2goKGNoaWxkKSA9PiAoY2hpbGQgYXMgSnN4Tm9kZUludGVyZmFjZSlbX2NhbGxSZWZzXSgpKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0pKHByb3BzKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIGNvbnZlcnRzIHRoZSBmcmFnbWVudHMgb2JqZWN0IHRvIG5vZGVzXHJcbiAqXHJcbiAqIEBwYXJhbSB7T2JqZWN0fSBwcm9wc1xyXG4gKiBAcGFyYW0ge0FycmF5fSBwcm9wcy5jaGlsZHJlbiAtIGNoaWxkIGVsZW1lbnRzIGluIHRoZSBmcmFnbWVudFxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIEZyYWdtZW50KHByb3BzOiBKc3hQcm9wcykge1xyXG4gIHJldHVybiBuZXcgKGNsYXNzIGV4dGVuZHMgSnN4Tm9kZSBpbXBsZW1lbnRzIEpzeE5vZGVJbnRlcmZhY2Uge1xyXG4gICAgdG9TdHJpbmcoKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLnByb3BzLmNoaWxkcmVuXHJcbiAgICAgICAgLmZsYXQoKVxyXG4gICAgICAgIC5maWx0ZXIodHJ1dGh5KVxyXG4gICAgICAgIC5tYXAoKGNoaWxkKSA9PlxyXG4gICAgICAgICAgY2hpbGQgaW5zdGFuY2VvZiBOb2RlXHJcbiAgICAgICAgICAgID8gZ2V0T3V0ZXJIdG1sKGNoaWxkKVxyXG4gICAgICAgICAgICA6IHR5cGVvZiBjaGlsZCA9PT0gXCJvYmplY3RcIlxyXG4gICAgICAgICAgICA/IGNoaWxkLnRvU3RyaW5nKClcclxuICAgICAgICAgICAgOiBzYW5pdGl6ZShjaGlsZClcclxuICAgICAgICApXHJcbiAgICAgICAgLmpvaW4oXCJcIik7XHJcbiAgICB9XHJcblxyXG4gICAgYXNOb2RlKCkge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJkZXByZWNhdGVkIGZyYWdtZW50XCIpO1xyXG4gICAgICBjb25zdCBmcmFnbWVudHMgPSB0aGlzLnByb3BzLmNoaWxkcmVuXHJcbiAgICAgICAgLmZsYXQoKVxyXG4gICAgICAgIC5maWx0ZXIodHJ1dGh5KVxyXG4gICAgICAgIC5tYXAoKGl0ZW0pID0+XHJcbiAgICAgICAgICBpdGVtIGluc3RhbmNlb2YgTm9kZVxyXG4gICAgICAgICAgICA/IGl0ZW1cclxuICAgICAgICAgICAgOiBpdGVtIGluc3RhbmNlb2YgSnN4Tm9kZVxyXG4gICAgICAgICAgICA/IGl0ZW0uYXNOb2RlKClcclxuICAgICAgICAgICAgOiBpdGVtXHJcbiAgICAgICAgKTtcclxuXHJcbiAgICAgIGNvbnN0IGRvY3VtZW50RnJhZ21lbnQgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XHJcblxyXG4gICAgICBkb2N1bWVudEZyYWdtZW50LmFwcGVuZCguLi5mcmFnbWVudHMpO1xyXG4gICAgICByZXR1cm4gZG9jdW1lbnRGcmFnbWVudDtcclxuICAgIH1cclxuXHJcbiAgICBhc1ZOb2RlKCkge1xyXG4gICAgICByZXR1cm4gYXNWTm9kZSgvKlwiX19GcmFnbWVudF9fXCIqLyB1bmRlZmluZWQsIHRoaXMucHJvcHMpO1xyXG4gICAgfVxyXG5cclxuICAgIFtfY2FsbFJlZnNdKCkge1xyXG4gICAgICB0aGlzLnByb3BzLmNoaWxkcmVuXHJcbiAgICAgICAgLmZpbHRlcigoY2hpbGQpID0+IGNoaWxkIGluc3RhbmNlb2YgSnN4Tm9kZSlcclxuICAgICAgICAuZm9yRWFjaCgoY2hpbGQpID0+IChjaGlsZCBhcyBKc3hOb2RlSW50ZXJmYWNlKVtfY2FsbFJlZnNdKCkpO1xyXG4gICAgfVxyXG4gIH0pKHByb3BzKTtcclxufVxyXG5cclxuLy8ganN4IGlzIGNhbGxlZCB3aGVuIHRoZSBlbGVtZW50IGhhcyBvbmUgb3IgemVybyBjaGlsZHJlblxyXG5leHBvcnQgZnVuY3Rpb24ganN4KFxyXG4gIHRhZzogc3RyaW5nIHwgRnVuY3Rpb24sXHJcbiAgcHJvcHM6IEF0dHJpYnV0ZXMgJlxyXG4gICAgU3BlY2lhbEF0dHJpYnV0ZXMgJiB7IGNoaWxkcmVuPzogc3RyaW5nIHwgTm9kZSB8IEpzeE5vZGVJbnRlcmZhY2UgfVxyXG4pOiBKc3hOb2RlSW50ZXJmYWNlIHtcclxuICAvLyBAdHMtaWdub3JlIC0gd3JhcHBpbmcgdGhlIGNoaWxkcmVuIGFzIGFycmF5IHRvIHJlLXVzZSBqc3hzIG1ldGhvZFxyXG4gIHByb3BzLmNoaWxkcmVuID0gcHJvcHMuaGFzT3duUHJvcGVydHkoXCJjaGlsZHJlblwiKSA/IFtwcm9wcy5jaGlsZHJlbl0gOiBbXTtcclxuXHJcbiAgcmV0dXJuIGpzeHModGFnLCAocHJvcHMgYXMgdW5rbm93bikgYXMgSnN4UHJvcHMpO1xyXG59XHJcblxyXG4vKipcclxuICogcmVuZGVyIHRoZSBnaXZlbiBtYXJrdXAgaW50byB0aGUgZ2l2ZW4gZG9tIG5vZGVcclxuICpcclxuICogQHBhcmFtIHtzdHJpbmd8SFRNTEVsZW1lbnR8SlNYfSBtYXJrdXAgLSBodG1sIGFzIHN0cmluZywgaHRtbCBlbGVtZW50IG9yIGpzeCB0ZW1wbGF0ZVxyXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBkb21Ob2RlIC0gY29udGFpbmVyIGZvciB0aGUgdGVtcGxhdGUgdG8gYmUgcmVuZGVyZWQgaW50b1xyXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFthcHBlbmQ9ZmFsc2VdIC0gc2hvdWxkIHRoZSBwcm92aWRlZCBtYXJrdXAgYmUgYXBwZW5kZWQgdG8gdGhlIGV4aXN0aW5nIG1hcmt1cCwgb3IgZGVmYXVsdCByZXBsYWNlIGl0XHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gcmVuZGVyKFxyXG4gIG1hcmt1cDogc3RyaW5nIHwgSFRNTEVsZW1lbnQgfCBKc3hOb2RlSW50ZXJmYWNlLCAvLyBAVE9ETzogc3BlY2lmaWMgc3VwcG9ydCBmb3IgVGVtcGxhdGU/ICguY29udGVudC5jbG9uZSlcclxuICBkb21Ob2RlOiBIVE1MRWxlbWVudCxcclxuICBhcHBlbmQ6IGJvb2xlYW4gPSBmYWxzZVxyXG4pIHtcclxuICBBcnJheS5mcm9tKGRvY3VtZW50LmJvZHkucXVlcnlTZWxlY3RvckFsbChcIipcIikpLmZvckVhY2goXHJcbiAgICAoZWwpID0+IChlbC5zdHlsZS5iYWNrZ3JvdW5kID0gXCIjY2NmZmNjXCIpXHJcbiAgKTtcclxuXHJcbiAgY29uc3QgaXNSZVJlbmRlciA9IHJlbmRlcmVkVlRyZWVzLmhhcyhkb21Ob2RlKTtcclxuICBpZiAoIWFwcGVuZCAmJiAhaXNSZVJlbmRlcikgZG9tTm9kZS5pbm5lckhUTUwgPSBcIlwiO1xyXG5cclxuICBpZiAodHlwZW9mIG1hcmt1cCA9PT0gXCJzdHJpbmdcIikge1xyXG4gICAgZG9tTm9kZS5pbnNlcnRBZGphY2VudEhUTUwoXCJiZWZvcmVlbmRcIiwgbWFya3VwKTsgLy8gc2FuaXRpemU/XHJcbiAgfSBlbHNlIGlmIChtYXJrdXAgaW5zdGFuY2VvZiBOb2RlKSB7XHJcbiAgICBkb21Ob2RlLmluc2VydEFkamFjZW50RWxlbWVudChcImJlZm9yZWVuZFwiLCBtYXJrdXApO1xyXG4gIH0gZWxzZSBpZiAobWFya3VwIGluc3RhbmNlb2YgSnN4Tm9kZSkge1xyXG4gICAgc3ZnQ29udGV4dCA9IGZhbHNlO1xyXG5cclxuICAgIC8vIFJvb3RWTm9kZVxyXG4gICAgY29uc3QgdlRyZWU6IFJvb3RWTm9kZSA9IHt9IGFzIGFueTtcclxuICAgIE9iamVjdC5hc3NpZ24odlRyZWUsIHtcclxuICAgICAgdHlwZTogXCJSb290XCIsXHJcbiAgICAgIG5vZGU6IGRvbU5vZGUsXHJcbiAgICAgIHRhZzogbnVsbCxcclxuICAgICAgcGFyZW50OiBudWxsLFxyXG4gICAgICBjaGlsZHJlbjogW21hcmt1cC5hc1ZOb2RlKCldLFxyXG4gICAgICBhc05vZGUoKSB7XHJcbiAgICAgICAgcmV0dXJuIHZUcmVlLmNoaWxkcmVuWzBdLmFzTm9kZSgpO1xyXG4gICAgICB9LFxyXG4gICAgICB0b1N0cmluZygpIHtcclxuICAgICAgICByZXR1cm4gdlRyZWUuY2hpbGRyZW5bMF0udG9TdHJpbmcoKTtcclxuICAgICAgfSxcclxuICAgIH0pO1xyXG5cclxuICAgIGNvbnNvbGUubG9nKFwiIyMjIyMjIyMjIyNcXG5cIiwgXCJ2VHJlZTpcIiwgdlRyZWUpO1xyXG5cclxuICAgIGlmIChpc1JlUmVuZGVyKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwiaXMgcmUtcmVuZGVyXCIpO1xyXG4gICAgICBjb25zdCBvbGRWVHJlZSA9IHJlbmRlcmVkVlRyZWVzLmdldChkb21Ob2RlKTtcclxuXHJcbiAgICAgIGNvbnNvbGUubG9nKFwiIyMjIyMjIyMjIyNcXG5cIiwgeyBvbGRWVHJlZSwgbmV3VlRyZWU6IHZUcmVlIH0pO1xyXG5cclxuICAgICAgLy8gZGlmZlxyXG4gICAgICAvL29sZFZUcmVlLmRpZmZBbmRQYXRjaCh2VHJlZSk7XHJcbiAgICAgIGRpZmZBbmRQYXRjaChvbGRWVHJlZSEsIHZUcmVlKTtcclxuXHJcbiAgICAgIHJlbmRlcmVkVlRyZWVzLnNldChkb21Ob2RlLCB2VHJlZSk7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICByZW5kZXJlZFZUcmVlcy5zZXQoZG9tTm9kZSwgdlRyZWUpO1xyXG4gICAgY29uc3QgY29udGVudCA9IHZUcmVlLmFzTm9kZSgpO1xyXG4gICAgZG9tTm9kZS5hcHBlbmQoY29udGVudCk7XHJcbiAgICAvLy8vbWFya3VwW19jYWxsUmVmc10oKTtcclxuICB9IGVsc2Uge1xyXG4gICAgdGhyb3cgbmV3IEVycm9yKFwicmVuZGVyIG1ldGhvZCBjYWxsZWQgd2l0aCB3cm9uZyBhcmd1bWVudChzKVwiKTtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiByYXdIdG1sKGNvbnRlbnQ6IHN0cmluZyk6IEpzeE5vZGVJbnRlcmZhY2Uge1xyXG4gIHJldHVybiBuZXcgKGNsYXNzIGV4dGVuZHMgSnN4Tm9kZSBpbXBsZW1lbnRzIEpzeE5vZGVJbnRlcmZhY2Uge1xyXG4gICAgdG9TdHJpbmcoKSB7XHJcbiAgICAgIHJldHVybiBjb250ZW50O1xyXG4gICAgfVxyXG5cclxuICAgIGFzTm9kZSgpIHtcclxuICAgICAgY29uc3QgdGVtcGxhdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGVtcGxhdGVcIik7XHJcbiAgICAgIHRlbXBsYXRlLmlubmVySFRNTCA9IGNvbnRlbnQ7XHJcbiAgICAgIHJldHVybiB0ZW1wbGF0ZS5jb250ZW50O1xyXG4gICAgfVxyXG4gICAgYXNWTm9kZSgpIHtcclxuICAgICAgcmV0dXJuIHt9O1xyXG4gICAgfVxyXG5cclxuICAgIFtfY2FsbFJlZnNdKCkge1xyXG4gICAgICAvLyBub29wXHJcbiAgICB9XHJcbiAgfSkoe30gYXMgSnN4UHJvcHMpO1xyXG59XHJcblxyXG4vLyB2VHJlZVxyXG5cclxuLy8gZ290Y2hzYXM6XHJcbi8vIC0gc3R5bGVzIHdpbGwgb3ZlcnJpZGUgKGNvdWxkIGRvOiBzZXR0aW5nIGVhY2ggcnVsZSBpbmRpdmlkdWFsbHkpXHJcbiIsImltcG9ydCB7IHJlbmRlciwgcmF3SHRtbCB9IGZyb20gXCIuL2pzeC9qc3gtcnVudGltZVwiO1xyXG5cclxuY29uc3QgeHNzID0gXCI8aW1nIHNyYz14IG9uZXJyb3I9XFxcImFsZXJ0KCdYU1MgQXR0YWNrJylcXFwiPlwiOyAvL1wiPHNjcmlwdD5hbGVydCgnLS4tJyk8L3NjcmlwdD5cIjtcclxuXHJcbmZ1bmN0aW9uIFJURShwcm9wczogLyp7IHR4dCwgXCJvbi1jbGlja1wiOiBvbkNsaWNrIH0qLyB7XHJcbiAgdHh0OiBzdHJpbmc7XHJcbiAgcmVmPzogRnVuY3Rpb247XHJcbn0pIHtcclxuICBjb25zb2xlLmxvZyhcIm9uQ2xpY2tcIiwgcHJvcHNbXCJvbi1jbGlja1wiXSk7XHJcbiAgcmV0dXJuIChcclxuICAgIDxwIHJlZj17KGVsOiBIVE1MRWxlbWVudCkgPT4gY29uc29sZS5sb2coXCJteSBkaXYgOjpyZWY6OjMuMlwiLCBlbCl9PlxyXG4gICAgICB7cHJvcHMudHh0fVxyXG4gICAgPC9wPlxyXG4gICk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIEJ1dHRvbih7XHJcbiAgY2hpbGRyZW4sXHJcbiAgZGlzYWJsZWQsXHJcbn06IHtcclxuICBjaGlsZHJlbjogYW55O1xyXG4gIGRpc2FibGVkOiBib29sZWFuO1xyXG4gIHJlZj86IEZ1bmN0aW9uO1xyXG59KSB7XHJcbiAgcmV0dXJuIChcclxuICAgIDxidXR0b25cclxuICAgICAgZGlzYWJsZWQ9e2Rpc2FibGVkfVxyXG4gICAgICByZWY9eyhlbDogSFRNTEVsZW1lbnQpID0+IGNvbnNvbGUubG9nKFwibXkgYnV0dG9uIDo6cmVmOjoxXCIsIGVsKX1cclxuICAgID5cclxuICAgICAgPHNwYW4gcmVmPXsoZWw6IEhUTUxFbGVtZW50KSA9PiBjb25zb2xlLmxvZyhcIm15IGEgOjpyZWY6OjJcIiwgZWwpfT5hPC9zcGFuPlxyXG4gICAgICB7Y2hpbGRyZW59XHJcbiAgICAgIDw+XHJcbiAgICAgICAgPHNwYW4gcmVmPXsoZWw6IEhUTUxFbGVtZW50KSA9PiBjb25zb2xlLmxvZyhcIm15IGEgOjpyZWY6OjNcIiwgZWwpfT5cclxuICAgICAgICAgIGFcclxuICAgICAgICA8L3NwYW4+XHJcbiAgICAgIDwvPlxyXG4gICAgPC9idXR0b24+XHJcbiAgKTtcclxufVxyXG5cclxuZnVuY3Rpb24gcmVmbG9nKGVsOiBIVE1MRWxlbWVudCkge1xyXG4gIGNvbnNvbGUubG9nKFwibXkgaW5uZXIgZGl2OjpyZWY6OjhcIiwgZWwpO1xyXG59XHJcblxyXG4vKlxyXG5jb25zdCBtYXJrdXAgPSAoXHJcbiAgPD5cclxuICAgIDxkaXZcclxuICAgICAgY2xhc3M9XCJmb29cIlxyXG4gICAgICByZWY9eyhlbDogSFRNTEVsZW1lbnQpID0+IGNvbnNvbGUubG9nKFwibXkgZGl2IDo6cmVmOjo0XCIsIGVsKX1cclxuICAgIC8+XHJcbiAgICA8aW5wdXQgZGlzYWJsZWQ9e3RydWV9IGhpZGRlbj17ZmFsc2V9IC8+XHJcbiAgICA8QnV0dG9uXHJcbiAgICAgIGRpc2FibGVkPXt0cnVlfVxyXG4gICAgICByZWY9eyhlbDogSFRNTEVsZW1lbnQpID0+IGNvbnNvbGUubG9nKFwibXkgQlVUVE9OOjpyZWY6OjVcIiwgZWwpfVxyXG4gICAgPlxyXG4gICAgICB0ZXh0XHJcbiAgICAgIDxwb3B1cC1pbmZvXHJcbiAgICAgICAgcmVmPXsoZWw6IEhUTUxFbGVtZW50KSA9PiBjb25zb2xlLmxvZyhcInNwYW4gaW4gQlVUVE9OOjpyZWY6OjZcIiwgZWwpfVxyXG4gICAgICA+XHJcbiAgICAgICAgYmxhXHJcbiAgICAgIDwvcG9wdXAtaW5mbz5cclxuICAgIDwvQnV0dG9uPlxyXG4gICAgPFJURVxyXG4gICAgICB0eHQ9XCJsZSB0ZXh0XCJcclxuICAgICAgcmVmPXsoZWw6IEhUTUxFbGVtZW50KSA9PiBjb25zb2xlLmxvZyhcIm15IGRpdiA6OnJlZjo6My4xXCIsIGVsKX1cclxuICAgICAgb24tY2xpY2s9eyhlOiBIVE1MRWxlbWVudCkgPT4gY29uc29sZS5sb2coZSl9XHJcbiAgICAvPlxyXG4gICAge3hzc31cclxuICAgIHtyYXdIdG1sKGA8b2w+PGxpPnJhdyBodG1sPC9saT48L29sPmApfVxyXG4gICAgPGRpdlxyXG4gICAgICBjbGFzcz1cImJhbVwiXHJcbiAgICAgIHJlZj17KGVsOiBIVE1MRWxlbWVudCkgPT4gY29uc29sZS5sb2coXCJteSBkaXY6OnJlZjo6N1wiLCBlbCl9XHJcbiAgICA+XHJcbiAgICAgIDxkaXY+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cImJhclwiIG9uLWNsaWNrPXsoZSkgPT4gY29uc29sZS5sb2coZSl9IHJlZj17cmVmbG9nfT5cclxuICAgICAgICAgIGNsaWNrIE1FXHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPGRpdiBzdHlsZT17eyBvdXRsaW5lOiBcIjFweCBzb2xpZCByZWQ7XCIgfX0+XHJcbiAgICAgICAgICB7ZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNvbGRcIil9XHJcbiAgICAgICAgICB7bnVsbH1cclxuICAgICAgICAgIHtbMCwgMV0ubWFwKChuKSA9PiAoXHJcbiAgICAgICAgICAgIDxzcGFuPntufTwvc3Bhbj5cclxuICAgICAgICAgICkpfVxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICA8L2Rpdj5cclxuICAgIDwvZGl2PlxyXG4gIDwvPlxyXG4pO1xyXG5cclxuKi9cclxuXHJcbi8qXHJcbmNvbnN0IG1hcmt1cCA9IChcclxuICA8QnV0dG9uIGRpc2FibGVkPXt0cnVlfT5cclxuICAgICAgPGJvbGQgcmVmPXtyZWZsb2d9Pi0tSU5ORVItLTwvYm9sZD5cclxuICA8L0J1dHRvbj5cclxuKTsqL1xyXG4vKlxyXG5cclxuY29uc3QgbWFya3VwID0gKFxyXG4gIDxkaXYgY2xhc3M9XCJmb29cIiByZWY9eyhlbDogSFRNTEVsZW1lbnQpID0+IGNvbnNvbGUubG9nKFwibXkgZGl2OjpyZWY6OlwiLCBlbCl9PlxyXG4gICAgPGRpdj5cclxuICAgICAgPGRpdiBjbGFzcz1cImJhclwiIHJlZj17KGVsOiBIVE1MRWxlbWVudCkgPT4gY29uc29sZS5sb2coXCJteSBpbm5lciBkaXY6OnJlZjo6XCIsIGVsKX0gLz5cclxuICAgIDwvZGl2PlxyXG4gICAgPEJ1dHRvbiBkaXNhYmxlZD17dHJ1ZX0+PC9CdXR0b24+XHJcbiAgPC9kaXY+XHJcbik7XHJcbiovXHJcbi8qXHJcbmNvbnN0IG1hcmt1cCA9IChcclxuICA8YT5cclxuICAgIDxiPlxyXG4gICAgICA8YyBjbGFzcz1cImJhclwiIHJlZj17cmVmbG9nfSAvPlxyXG4gICAgPC9iPlxyXG4gIDwvYT5cclxuKTtcclxuKi9cclxuXHJcbmZ1bmN0aW9uIFNwYW4oeyBtb2RlIH06IHsgbW9kZTogYW55IH0pIHtcclxuICByZXR1cm4gbW9kZSA9PT0gMSA/IChcclxuICAgIDxkaXY+XHJcbiAgICAgIDxzcGFuIGlkPVwiaW5uZXJcIiBvbGQ9e3RydWV9PlxyXG4gICAgICAgIFNwYW4tQ29tcC0tb2xkXHJcbiAgICAgIDwvc3Bhbj5cclxuICAgICAgPGgzPnRvIGJlIHJlbW92ZWQ8L2gzPlxyXG4gICAgPC9kaXY+XHJcbiAgKSA6IChcclxuICAgIDxkaXY+XHJcbiAgICAgIDxwIGlkPVwiaW5uZXJcIiBuZXc9e3RydWV9PlxyXG4gICAgICAgIFNwYW4tQ29tcC0tbmV3c1xyXG4gICAgICA8L3A+XHJcbiAgICA8L2Rpdj5cclxuICApO1xyXG59XHJcblxyXG5mdW5jdGlvbiBDb21wKHsgbnVtIH0pIHtcclxuICBpZiAobnVtID09PSAxKSByZXR1cm4gbnVsbDtcclxuICByZXR1cm4gKFxyXG4gICAgPGRpdj5cclxuICAgICAgPHA+Y29tcDwvcD5cclxuICAgIDwvZGl2PlxyXG4gICk7XHJcbn1cclxuXHJcbmNvbnN0IG1hcmt1cDEgPSAobnVtOiBhbnkpID0+IChcclxuICA8ZGl2IGlkPVwib3V0ZXJcIiBkYXRhLWZvbz1cImJhclwiIGRhdGEtdmFyPXtudW19PlxyXG4gICAgPGgzPnNob3VsZCBnZXQgMiAtOiAzPC9oMz5cclxuICAgIHtudW0gPT09IDEgPyAoXHJcbiAgICAgIDx1bCBjbGFzcz1cInVsLWNsYXNzXCI+XHJcbiAgICAgICAgPGxpPlRleHQgMSA8L2xpPlxyXG4gICAgICAgIDxsaT5UZXh0IDIgPC9saT5cclxuICAgICAgPC91bD5cclxuICAgICkgOiAoXHJcbiAgICAgIDx1bCBjbGFzcz1cInVsLWNsYXNzXCI+XHJcbiAgICAgICAgPGxpPlRleHQgMyA8L2xpPlxyXG4gICAgICAgIDxsaT5UZXh0IDIgPC9saT5cclxuICAgICAgICA8bGk+VGV4dCAxIDwvbGk+XHJcbiAgICAgIDwvdWw+XHJcbiAgICApfVxyXG4gICAgPGgzPnNob3VsZCBnZXQgMyAtOiAyPC9oMz5cclxuICAgIHtudW0gPT09IDEgPyAoXHJcbiAgICAgIDx1bCBjbGFzcz1cInVsLWNsYXNzXCI+XHJcbiAgICAgICAgPGxpPlRleHQgMSA8L2xpPlxyXG4gICAgICAgIDxsaT5UZXh0IDIgPC9saT5cclxuICAgICAgICA8bGk+VGV4dCAzIDwvbGk+XHJcbiAgICAgIDwvdWw+XHJcbiAgICApIDogKFxyXG4gICAgICA8dWwgY2xhc3M9XCJ1bC1jbGFzc1wiPlxyXG4gICAgICAgIDxsaT5UZXh0IDEgPC9saT5cclxuICAgICAgICA8bGk+VGV4dCAyIDwvbGk+XHJcbiAgICAgIDwvdWw+XHJcbiAgICApfVxyXG4gICAge251bSA9PT0gMSA/IG51bGwgOiA8cD5uZXcgcmVuZGVyPC9wPn1cclxuICAgIDxkaXY+XHJcbiAgICAgIDxzcGFuPnNwYW4tY29udGVudDwvc3Bhbj5cclxuICAgIDwvZGl2PlxyXG4gICAgPFNwYW4gbW9kZT17bnVtfSAvPlxyXG4gICAgey8qZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNvbGRcIikqL31cclxuICAgIDw+RnJhZ21lbnQtaXRlbTwvPlxyXG4gICAgPHN2Z1xyXG4gICAgICB2aWV3Qm94PVwiMCAwIDMwMCAxMDBcIlxyXG4gICAgICB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCJcclxuICAgICAgc3Ryb2tlPVwicmVkXCJcclxuICAgICAgZmlsbD1cImdyZXlcIlxyXG4gICAgPlxyXG4gICAgICA8Y2lyY2xlIGN4PVwiNTBcIiBjeT1cIjUwXCIgcj1cIjQwXCIgLz5cclxuICAgICAgPGNpcmNsZSBjeD1cIjE1MFwiIGN5PVwiNTBcIiByPVwiNFwiIC8+XHJcblxyXG4gICAgICA8c3ZnIHZpZXdCb3g9XCIwIDAgMTAgMTBcIiB4PVwiMjAwXCIgd2lkdGg9XCIxMDBcIj5cclxuICAgICAgICA8Y2lyY2xlIGN4PVwiNVwiIGN5PVwiNVwiIHI9XCI0XCIgLz5cclxuICAgICAgPC9zdmc+XHJcbiAgICA8L3N2Zz5cclxuICA8L2Rpdj5cclxuKTtcclxuXHJcbmZ1bmN0aW9uIG1hcmt1cDIobnVtOiBhbnkpIHtcclxuICByZXR1cm4gKFxyXG4gICAgPGRpdiBpZD1cIm91dGVyXCI+XHJcbiAgICAgIDw+XHJcbiAgICAgICAgPD5cclxuICAgICAgICAgIDxwPm5lc3RlZCBmcmFnbWVudDwvcD5cclxuICAgICAgICA8Lz5cclxuICAgICAgPC8+XHJcbiAgICAgIDxoMT5zdGF0aWM8L2gxPlxyXG4gICAgICA8aDE+ZHluYW1pYyB2YWw6IHtudW19PC9oMT5cclxuICAgICAge251bSA9PT0gMSA/IDxoMT5vbGQ8L2gxPiA6IGZhbHNlfVxyXG4gICAgICB7bnVtID09PSAxID8gKFxyXG4gICAgICAgIDw+XHJcbiAgICAgICAgICA8aDE+ZnJhZyBvbGQ8L2gxPlxyXG4gICAgICAgICAgPHNwYW4+ZnJhZyBzcGFuIG9sZDwvc3Bhbj5cclxuICAgICAgICA8Lz5cclxuICAgICAgKSA6IChcclxuICAgICAgICA8aDE+ZnJhZyBuZXc8L2gxPlxyXG4gICAgICApfVxyXG4gICAgICA8Q29tcCBudW09e251bX0gLz5cclxuICAgIDwvZGl2PlxyXG4gICk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIG1hcmt1cChudW06IGFueSkge1xyXG4gIHJldHVybiBudW0gPT09IDEgPyAoXHJcbiAgICA8aDE+XHJcbiAgICAgIG9sZC1IZWFkbGluZSB7bnVtfVxyXG4gICAgICBmb29cclxuICAgICAgPD5cclxuICAgICAgICA8cD5vbGQtc3BhbiBBPC9wPlxyXG4gICAgICAgIDxwPjE8L3A+XHJcbiAgICAgICAgPHA+MjwvcD5cclxuICAgICAgICA8cD4zPC9wPlxyXG4gICAgICAgIDxzdmcgdmlld0JveD1cIjAgMCAzMDAgMTAwXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHN0cm9rZT1cInJlZFwiIGZpbGw9XCJncmV5XCI+XHJcbiAgICAgICAgICA8Y2lyY2xlIGN4PVwiNTBcIiBjeT1cIjUwXCIgcj1cIjQwXCIgLz5cclxuICAgICAgICAgIDxjaXJjbGUgY3g9XCIxNTBcIiBjeT1cIjUwXCIgcj1cIjRcIiAvPlxyXG5cclxuICAgICAgICAgIDxzdmcgdmlld0JveD1cIjAgMCAxMCAxMFwiIHg9XCIyMDBcIiB3aWR0aD1cIjEwMFwiPlxyXG4gICAgICAgICAgICA8Y2lyY2xlIGN4PVwiNVwiIGN5PVwiNVwiIHI9XCI0XCIgLz5cclxuICAgICAgICAgIDwvc3ZnPlxyXG4gICAgICAgIDwvc3ZnPlxyXG4gICAgICA8Lz5cclxuICAgICAge251bGx9XHJcbiAgICA8L2gxPlxyXG4gICkgOiAoXHJcbiAgICA8aDEgY2xhc3M9XCJhXCI+XHJcbiAgICAgIG5ldy1IZWFkbGluZSB7bnVtfVxyXG4gICAgICB7ZmFsc2V9XHJcbiAgICAgIDw+XHJcbiAgICAgICAgPHA+bmV3LXNwYW4gQTwvcD5cclxuICAgICAgICA8cD4xPC9wPlxyXG4gICAgICAgIHt1bmRlZmluZWR9XHJcbiAgICAgICAgPHA+MzwvcD5cclxuICAgICAgICA8c3ZnIHZpZXdCb3g9XCIwIDAgMzAwIDEwMFwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiBzdHJva2U9XCJyZWRcIiBmaWxsPVwiZ3JleVwiPlxyXG4gICAgICAgICAgPGNpcmNsZSBjeD1cIjUwXCIgY3k9XCI1MFwiIHI9XCI0MFwiIC8+XHJcbiAgICAgICAgICA8Y2lyY2xlIGN4PVwiMTUwXCIgY3k9XCI1MFwiIHI9XCI0XCIgLz5cclxuXHJcbiAgICAgICAgICA8c3ZnIHZpZXdCb3g9XCIwIDAgMTAgMTBcIiB4PVwiMjAwXCIgd2lkdGg9XCIxMDBcIj5cclxuICAgICAgICAgICAgPGNpcmNsZSBjeD1cIjVcIiBjeT1cIjVcIiByPVwiNlwiIC8+XHJcbiAgICAgICAgICA8L3N2Zz5cclxuICAgICAgICA8L3N2Zz5cclxuICAgICAgICA8cD5uZXcgc3BhbiBCIGF0IGVuZDwvcD5cclxuICAgICAgPC8+XHJcbiAgICA8L2gxPlxyXG4gICk7XHJcbn1cclxuXHJcbi8vY29uc29sZS5sb2cobWFya3VwKTtcclxuLy93aW5kb3cubWFya3VwID0gbWFya3VwO1xyXG5cclxuY2xhc3MgUG9wVXBJbmZvIGV4dGVuZHMgSFRNTEVsZW1lbnQge1xyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgLy8gQWx3YXlzIGNhbGwgc3VwZXIgZmlyc3QgaW4gY29uc3RydWN0b3JcclxuICAgIHN1cGVyKCk7XHJcblxyXG4gICAgLy8gd3JpdGUgZWxlbWVudCBmdW5jdGlvbmFsaXR5IGluIGhlcmVcclxuXHJcbiAgICBjb25zb2xlLmxvZyhcIiMjIyMjIyMjIyMjIyMjIyMjY3RvciBDRVwiKTtcclxuICB9XHJcblxyXG4gIGNvbm5lY3RlZENhbGxiYWNrKCkge1xyXG4gICAgY29uc29sZS5sb2coXCIjIyMjIyMjIyMjIyMjIyMjI0N1c3RvbSBzcXVhcmUgZWxlbWVudCBhZGRlZCB0byBwYWdlLlwiKTtcclxuICB9XHJcbn1cclxuXHJcbmN1c3RvbUVsZW1lbnRzLmRlZmluZShcInBvcHVwLWluZm9cIiwgUG9wVXBJbmZvKTtcclxuXHJcbi8vZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNvbGRcIikhLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBjb25zb2xlLmxvZyk7XHJcblxyXG4vL2RvY3VtZW50LmJvZHkuaW5uZXJIVE1MID0gbWFya3VwO1xyXG5yZW5kZXIobWFya3VwKDEpLCBkb2N1bWVudC5ib2R5KTtcclxuLy9kb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm91dGVyXCIpPy5zZXRBdHRyaWJ1dGUoXCJkYXRhLWZvb1wiLCBcIm1vZFwiKTtcclxuXHJcbi8vZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJpbm5lclwiKT8uc2V0QXR0cmlidXRlKFwiZGF0YS1mb29cIiwgXCJtb2RcIik7XHJcbi8vcmVuZGVyKG1hcmt1cCgyKSwgZG9jdW1lbnQuYm9keSk7XHJcbi8vcmVuZGVyKG1hcmt1cCwgZG9jdW1lbnQuYm9keSwgdHJ1ZSk7XHJcblxyXG53aW5kb3cucmVSZW5kZXIxID0gKCkgPT4gcmVuZGVyKG1hcmt1cCgxKSwgZG9jdW1lbnQuYm9keSk7XHJcbndpbmRvdy5yZVJlbmRlcjIgPSAoKSA9PiByZW5kZXIobWFya3VwKDIpLCBkb2N1bWVudC5ib2R5KTtcclxuIl0sInNvdXJjZVJvb3QiOiIifQ==