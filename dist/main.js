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
  console.log("getParentElementNode", vNode);

  while (vNode.parent) {
    vNode = vNode.parent; // `.node` is only on "Text" and "Element" type VNode, and only Element has children

    if (vNode.node) break;
  }

  console.log("found: ", vNode);
  return vNode;
}

function getChildrenWithNodes(vNode, alwaysAllow = []) {
  return vNode.children.map(childNode => {
    if (childNode === alwaysAllow) return childNode; //if (childNode.type === "Null") return null;

    if (childNode.node) return childNode; //if (childNode.type === "Fragment")
    //return getChildrenWithNodes(childNode, alwaysAllow);
    // @TODO: other types (i.e. Live Element)

    return getChildrenWithNodes(childNode, alwaysAllow);
  }).flat(Infinity).filter(Boolean);
}

function getParentAndNextSibling(vNode) {
  // node ancestor with Element,
  const parentWithElement = getParentElementNode(vNode);
  const siblings = getChildrenWithNodes(parentWithElement, vNode);
  const prevSibling = siblings[siblings.indexOf(vNode) - 1];
  const nextSiblingNode = prevSibling ? prevSibling.node.nextSibling : null;
  console.log("getParentAndNextSibling", {
    vNode,
    parentWithElement,
    prevSibling,
    prevSiblingNode: prevSibling.node,
    nextSiblingNode
  });
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

    if (result instanceof JsxNode || result && result.asNode) {
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

  const childJsxNodes = children.filter(child => child instanceof JsxNode || child && child.asNode);
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
  if (item.type === "Element" || item.type === "TextNode") item.node.parentElement.removeChild(item.node);else if (item.type === "Fragment") getChildrenWithNodes(item).forEach(node => node.node.parentElement.removeChild(node.node)); // @TODO: else -> VNode method actually
}

function insertNewItem(newNode) {
  // @TODO: Null not necccesery as asNode will return an empty Fragment, and make the method more generic
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
  }); // new addition items

  const newItems = newNode.children.slice(oldNode.children.length);

  if (newItems.length) {
    const documentFragment = document.createDocumentFragment();
    newItems.forEach(item => documentFragment.append(item.asNode())); // add to the end of parent node

    if (newNode.node && false) {
      // other one would work the same
      newNode.node.insertBefore(documentFragment, null);
    } // or if node is not an element (i.e. a fragment) add after it.
    else {
        // @TODO:  returns items before vnode and their next sibling aka first frag item!
        const [parent, nextSibling] = getParentAndNextSibling(newItems[0]);
        parent.insertBefore(documentFragment, nextSibling);
      }
  }
}

function asVNode(tag, props) {
  if (typeof tag === "function") {
    let result = tag(props);

    if (result instanceof JsxNode || result && result.asNode) {
      //console.warn("asVNode with JsxNode");
      return result;
      return result.asVNode();
    } // big @TODO:


    if (result instanceof Node) {
      const node = {
        node: undefined,
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
        }

      });
      return fooNode;
    }

    const node = {
      tag: "__TEXT_NODE__",
      type: "TextNode",
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
        if (!child) console.log("child nullish", {
          child,
          vNode
        });

        if (child instanceof JsxNode || child && child.asNode) {
          const childVNode = child; //child.asVNode();

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
              return document.createDocumentFragment(); //return null;
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
          tag2: "children Text node 3",
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
  } // no tag (Fragment and Null?)
  else {
      console.log("Fragment VNode");
      Object.assign(vNode, {
        tag,
        type: "Fragment",
        // where comes Fragment?
        tag2: "asVNode - normal return Fragment",
        node: null,
        children: children.flat().map(child => {
          if (child instanceof JsxNode || child && child.asNode) {
            const childVNode = child; //child.asVNode();

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

  console.log({
    vNode
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
  const inst = new class extends JsxNode {
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
        this.props.children.flat().filter(child => child instanceof JsxNode || child && child.asNode).forEach(child => child[_callRefs]());
      }
    }

  }(props);
  const v = inst.asVNode();
  return v;
}
/**
 * converts the fragments object to nodes
 *
 * @param {Object} props
 * @param {Array} props.children - child elements in the fragment
 */

function Fragment(props) {
  const inst = new class extends JsxNode {
    toString() {
      return this.props.children.flat().filter(truthy).map(child => child instanceof Node ? getOuterHtml(child) : typeof child === "object" ? child.toString() : sanitize(child)).join("");
    }

    asNode() {
      throw new Error("deprecated fragment");
      const fragments = this.props.children.flat().filter(truthy).map(item => item instanceof Node ? item : item instanceof JsxNode || item && item.asNode ? item.asNode() : item);
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
      this.props.children.filter(child => child instanceof JsxNode || child && child.asNode).forEach(child => child[_callRefs]());
    }

  }(props);
  return inst.asVNode();
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
  } else if (markup instanceof JsxNode || markup && markup.asNode) {
    svgContext = false; // RootVNode

    const vTree = {};
    Object.assign(vTree, {
      type: "Root",
      node: domNode,
      tag: null,
      parent: null,
      children: [markup],

      //[markup.asVNode()],
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

class ElementVNode2 {
  constructor(tag, props, children) {
    this.tag = tag;
    this.props = props;
    this.children = children;
    this.type = "Element";
    this.node = null;
  }

  toString() {
    return "?";
  }

  asNode() {
    return asNode(this.tag, this.props, this.children)[0];
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

class FragmentVNode {
  // parent? @TODO: where will parent be asigned?
  constructor(children) {
    this.children = children;
    this.type = "Fragment";
  }

  asNode() {
    const node = asNode(undefined, {}, this.children)[0]; // vNode.node = node;

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

class TextVNode2 {
  /**
   *
   */
  constructor(props) {
    this.type = "TextNode";
    this.node = null;
    this.children = [];
    this.props = void 0;
    this.props = props.child; //@TODO:
  }

  asNode() {
    const textNode = document.createTextNode(this.props.content);
    this.node = textNode;
    return textNode;
  }

  diffAndPatch(newNode) {
    this.node.nodeValue = newNode.props.content;
  }

  removeFromDOM() {
    this.node.parentElement.removeChild(this.node);
  }

}

class NullVNode {
  /**
   *
   */
  constructor() {
    this.type = "Null";
    this.children = [];
  }

  asNode() {
    //return null; // return empty fragment?
    return document.createDocumentFragment();
  }

  diffAndPatch(newNode) {
    return;
  }

  removeFromDOM() {
    return;
  }

  toString() {
    return "";
  }

}

class RootVNode2 {
  /**
   *
   */
  constructor(content, domNode) {
    this.type = "Root";
    this.parent = null;
    this.node = void 0;
    this.children = void 0;
    this.children = [content.asVNode()];
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
        children: "A Frag line 1"
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

Object(C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["render"])(markup3(1), document.body); //document.getElementById("outer")?.setAttribute("data-foo", "mod");
//document.getElementById("inner")?.setAttribute("data-foo", "mod");
//render(markup(2), document.body);
//render(markup, document.body, true);

window.reRender1 = function () {
  return Object(C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["render"])(markup3(1), document.body);
};

window.reRender2 = function () {
  return Object(C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["render"])(markup3(2), document.body);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vanN4L2pzeC1ydW50aW1lLnRzIiwid2VicGFjazovLy8uL21haW4udHN4Il0sIm5hbWVzIjpbInJlbmRlcmVkVlRyZWVzIiwiV2Vha01hcCIsInJlZnNUb0NhbGwiLCJKc3hOb2RlIiwiY29uc3RydWN0b3IiLCJwcm9wcyIsImdldFBhcmVudEVsZW1lbnROb2RlIiwidk5vZGUiLCJjb25zb2xlIiwibG9nIiwicGFyZW50Iiwibm9kZSIsImdldENoaWxkcmVuV2l0aE5vZGVzIiwiYWx3YXlzQWxsb3ciLCJjaGlsZHJlbiIsIm1hcCIsImNoaWxkTm9kZSIsImZsYXQiLCJJbmZpbml0eSIsImZpbHRlciIsIkJvb2xlYW4iLCJnZXRQYXJlbnRBbmROZXh0U2libGluZyIsInBhcmVudFdpdGhFbGVtZW50Iiwic2libGluZ3MiLCJwcmV2U2libGluZyIsImluZGV4T2YiLCJuZXh0U2libGluZ05vZGUiLCJuZXh0U2libGluZyIsInByZXZTaWJsaW5nTm9kZSIsIl9jYWxsUmVmcyIsIlN5bWJvbCIsInN2Z0NvbnRleHQiLCJ0cnV0aHkiLCJ2YWx1ZSIsInVuZGVmaW5lZCIsInNhbml0aXplIiwidGV4dCIsImRpdiIsImRvY3VtZW50IiwiY3JlYXRlRWxlbWVudCIsImlubmVyVGV4dCIsImlubmVySFRNTCIsImdldE91dGVySHRtbCIsImVsZW1lbnQiLCJFbGVtZW50Iiwib3V0ZXJIVE1MIiwiVGV4dCIsIndob2xlVGV4dCIsIkRvY3VtZW50RnJhZ21lbnQiLCJBcnJheSIsImZyb20iLCJjaGlsZE5vZGVzIiwiZWwiLCJqb2luIiwid2FybiIsImFzSHRtbFN0cmluZyIsInRhZyIsInRvU3RyaW5nIiwiYXR0cnMiLCJhdHRyaWJ1dGVzIiwiT2JqZWN0IiwiZW50cmllcyIsImtleSIsInYiLCJrIiwiaXNBcnJheSIsImNvbnRlbnQiLCJjaGlsZCIsIk5vZGUiLCJhc05vZGUiLCJmcmFnbWVudHMiLCJuIiwiaXRlbSIsImRvY3VtZW50RnJhZ21lbnQiLCJjcmVhdGVEb2N1bWVudEZyYWdtZW50IiwiYXBwZW5kIiwiZXJyb3IiLCJyZXN1bHQiLCJqc3hOb2RlcyIsImZvckVhY2giLCJzdGFydHNXaXRoIiwiZXZlbnQiLCJyZXBsYWNlIiwiYWRkRXZlbnRMaXN0ZW5lciIsInN2Z0NvbnRleHRTZXQiLCJjcmVhdGVFbGVtZW50TlMiLCJfa2V5Iiwic2V0QXR0cmlidXRlIiwiU3RyaW5nIiwiY2hpbGRKc3hOb2RlcyIsInJlbW92ZUl0ZW0iLCJ0eXBlIiwicGFyZW50RWxlbWVudCIsInJlbW92ZUNoaWxkIiwiaW5zZXJ0TmV3SXRlbSIsIm5ld05vZGUiLCJpbnNlcnRCZWZvcmUiLCJkaWZmQW5kUGF0Y2giLCJvbGROb2RlIiwibm9kZVZhbHVlIiwicmVtb3ZlQXR0cmlidXRlIiwiaGFzT3duUHJvcGVydHkiLCJkaWZmQW5kUGF0Y2hDaGlsZHJlbiIsInJlcGxhY2VXaXRoIiwib2xkQ2hpbGQiLCJpeCIsIm5ld0NoaWxkIiwibmV3SXRlbXMiLCJzbGljZSIsImxlbmd0aCIsImFzVk5vZGUiLCJmb29Ob2RlIiwiYXNzaWduIiwidGFnMiIsInRhZzEiLCJ0ZXh0Tm9kZSIsImNyZWF0ZVRleHROb2RlIiwiYXR0ciIsImNoaWxkVk5vZGUiLCJuZXdOb2RlSW5kZXgiLCJyZXZlcnNlIiwic2libGluZ0JlZm9yZSIsImZpbmQiLCJpbnNlcnRBZGphY2VudEVsZW1lbnQiLCJwYXJlbnROb2RlIiwibmV3Vk5vZGUiLCJpIiwianN4cyIsInJlZiIsImluc3QiLCJFcnJvciIsIm5vZGVJdGVtIiwiRnJhZ21lbnQiLCJqc3giLCJyZW5kZXIiLCJtYXJrdXAiLCJkb21Ob2RlIiwiYm9keSIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJzdHlsZSIsImJhY2tncm91bmQiLCJzcGxpY2UiLCJpc1JlUmVuZGVyIiwiaGFzIiwiaW5zZXJ0QWRqYWNlbnRIVE1MIiwidlRyZWUiLCJvbGRWVHJlZSIsImdldCIsIm5ld1ZUcmVlIiwic2V0IiwiY2IiLCJyYXdIdG1sIiwidGVtcGxhdGUiLCJFbGVtZW50Vk5vZGUyIiwiaW5jbHVkZXMiLCJyZW1vdmVGcm9tRE9NIiwiRnJhZ21lbnRWTm9kZSIsIlRleHRWTm9kZTIiLCJOdWxsVk5vZGUiLCJSb290Vk5vZGUyIiwicmVtb3ZlIiwieHNzIiwiUlRFIiwidHh0IiwiQnV0dG9uIiwiZGlzYWJsZWQiLCJyZWZsb2ciLCJTcGFuIiwibW9kZSIsIkNvbXAiLCJudW0iLCJtYXJrdXAxIiwibWFya3VwMiIsIm1hcmt1cDMiLCJvYmoiLCJhIiwibWFya3VwNCIsIlBvcFVwSW5mbyIsIkhUTUxFbGVtZW50IiwiY3VzdG9tRWxlbWVudHMiLCJkZWZpbmUiLCJ3aW5kb3ciLCJyZVJlbmRlcjEiLCJyZVJlbmRlcjIiXSwibWFwcGluZ3MiOiI7UUFBQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7UUFDMUU7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSx3REFBd0Qsa0JBQWtCO1FBQzFFO1FBQ0EsaURBQWlELGNBQWM7UUFDL0Q7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLHlDQUF5QyxpQ0FBaUM7UUFDMUUsZ0hBQWdILG1CQUFtQixFQUFFO1FBQ3JJO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMkJBQTJCLDBCQUEwQixFQUFFO1FBQ3ZELGlDQUFpQyxlQUFlO1FBQ2hEO1FBQ0E7UUFDQTs7UUFFQTtRQUNBLHNEQUFzRCwrREFBK0Q7O1FBRXJIO1FBQ0E7OztRQUdBO1FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNsRkE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsTUFBTUEsY0FBYyxHQUFH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O0FBREYsSUFESyxHQVFMO0FBQUksYUFBTSxHQUFWO0FBQUEsZUFDRyxjQURILE9BQ29CQSxHQURwQjtBQUFBLElBUkY7QUFZRCxDLENBRUQ7QUFDQTs7O0lBRU1PLFM7Ozs7O0FBQ0osdUJBQWM7QUFBQTs7QUFBQTs7QUFDWjtBQUNBLDhCQUZZLENBSVo7O0FBRUF6SyxXQUFPLENBQUNDLEdBQVIsQ0FBWSwwQkFBWjtBQU5ZO0FBT2I7Ozs7d0NBRW1CO0FBQ2xCRCxhQUFPLENBQUNDLEdBQVIsQ0FBWSx1REFBWjtBQUNEOzs7O2lDQVpxQnlLLFc7O0FBZXhCQyxjQUFjLENBQUNDLE1BQWYsQ0FBc0IsWUFBdEIsRUFBb0NILFNBQXBDLEUsQ0FFQTtBQUVBOztBQUNBM0MsbUZBQU0sQ0FBQ3VDLE9BQU8sQ0FBQyxDQUFELENBQVIsRUFBYXZJLFFBQVEsQ0FBQ21HLElBQXRCLENBQU4sQyxDQUNBO0FBRUE7QUFDQTtBQUNBOztBQUVBNEMsTUFBTSxDQUFDQyxTQUFQLEdBQW1CO0FBQUEsU0FBTWhELG1GQUFNLENBQUN1QyxPQUFPLENBQUMsQ0FBRCxDQUFSLEVBQWF2SSxRQUFRLENBQUNtRyxJQUF0QixDQUFaO0FBQUEsQ0FBbkI7O0FBQ0E0QyxNQUFNLENBQUNFLFNBQVAsR0FBbUI7QUFBQSxTQUFNakQsbUZBQU0sQ0FBQ3VDLE9BQU8sQ0FBQyxDQUFELENBQVIsRUFBYXZJLFFBQVEsQ0FBQ21HLElBQXRCLENBQVo7QUFBQSxDQUFuQjs7QUFFQWpJLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLE9BQVosRSIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDApO1xuIiwiY29uc3QgcmVuZGVyZWRWVHJlZXMgPSBuZXcgV2Vha01hcDxIVE1MRWxlbWVudCwgUm9vdFZOb2RlPigpO1xyXG5jb25zdCByZWZzVG9DYWxsOiBGdW5jdGlvbltdID0gW107XHJcbi8qKlxyXG4gKiBwcm92aWRlcyBmdW5jdGlvbnMgbmVlZGVkIGJ5IGJhYmVsIGZvciBhIGN1c3RvbSBwcmFnbWFcclxuICogdG8gcmVuZGVyIHBhcnNlZCBqc3ggY29kZSB0byBodG1sXHJcbiAqL1xyXG5cclxuLy8gcHJvcHMgd2hpY2ggd2lsbCBiZSByZW5kZXJlZCBhcyBhdHRyaWJ1dGVzXHJcbi8vIEZ1bmN0aW9ucyB3aWxsIGJlIHVzZWQgZm9yIGV2ZW50IGxpc3RlbmVycy4gKHdpdGggYXR0cmlidXRlIG5hbWUgc3RhcnRpbmcgd2l0aCAnb24tJylcclxudHlwZSBBdHRyaWJ1dGVzID0geyBba2V5OiBzdHJpbmddOiBzdHJpbmcgfCBib29sZWFuIHwgbnVtYmVyIHwgRnVuY3Rpb24gfTtcclxuXHJcbi8vIGFkZGl0aW9uYWwgYXR0cmlidXRlcyB3aGljaCBjYW4gaGF2ZSBhZGRpdGlvbmFsIHNlcmlhbGl6YXRpb24gYmVmb3JlIHJlbmRlcmluZyBhcyBhdHRyaWJ1dGVzXHJcbnR5cGUgU3BlY2lhbEF0dHJpYnV0ZXMgPSB7XHJcbiAgY2xhc3M/OiBzdHJpbmcgfCBzdHJpbmdbXTtcclxuICBzdHlsZT86IHN0cmluZyB8IHsgW2tleTogc3RyaW5nXTogc3RyaW5nIH07XHJcbiAgcmVmPzogRnVuY3Rpb247XHJcbn07XHJcblxyXG4vLyBjaGlsZCBlbGVtZW50cyBpbiB0aGUganN4IG1hcmt1cCB3aGljaCB3aWxsIGJlIHBhc3NlZCB0byB0aGUgaCBmdW5jdGlvbiBhcyBgcHJvcHMuY2hpbGRyZW5gXHJcbnR5cGUgQ2hpbGRyZW5Qcm9wcyA9IHtcclxuICAvLyBuZXN0ZWQgYXJyYXkgaW4gY2FzZSBvZlxyXG4gIC8vIDxlbGVtPlxyXG4gIC8vICAgPHNwYW4vPlxyXG4gIC8vICAge2NoaWxkcmVufVxyXG4gIC8vICAgPGRpdi8+XHJcbiAgLy8gPC9lbGVtPlxyXG4gIGNoaWxkcmVuOiBBcnJheTxcclxuICAgIE5vZGUgfCBKc3hOb2RlSW50ZXJmYWNlIHwgc3RyaW5nIHwgQXJyYXk8Tm9kZSB8IEpzeE5vZGVJbnRlcmZhY2UgfCBzdHJpbmc+XHJcbiAgPjtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBwcm9wcyBvYmplY3Qgd2hpY2ggd2lsbCBiZSBwYXNzZWQgdG8ganN4IHByYWdtYSBhbmQgY3VzdG9tIGNvbXBvbmVudCBmdW5jdGlvbnNcclxuICovXHJcbnR5cGUgSnN4UHJvcHMgPSBBdHRyaWJ1dGVzICYgU3BlY2lhbEF0dHJpYnV0ZXMgJiBDaGlsZHJlblByb3BzO1xyXG5cclxuLy8gYmFzZSBjbGFzcyB3aGljaCB3aWxsIGJlIGluaGVyaXRlZCBmcm9tIGpzeCBhbmQgZnJhZ21lbnRzIGZ1bmN0aW9uIG5vZGUgZ2VuZXJhdGlvblxyXG4vLyBhbmQgd2lsbCBiZSB1c2VkIHRvIGRpc3Rpbmd1aXNoIHRoZW0gd2l0aCBvdGhlciBFbGVtZW50c1xyXG5jbGFzcyBKc3hOb2RlIHtcclxuICBwcm9wczogSnN4UHJvcHM7XHJcbiAgY29uc3RydWN0b3IocHJvcHM6IEpzeFByb3BzKSB7XHJcbiAgICB0aGlzLnByb3BzID0gcHJvcHM7XHJcbiAgfVxyXG59XHJcblxyXG4vKntcclxuICAgICAgLy9ba2V5OiBzdHJpbmddOiBhbnk7XHJcbiAgICAgIHR5cGU6IFwiRWxlbWVudFwiIHwgXCJGcmFnbWVudFwiIHwgXCJUZXh0Tm9kZVwiIHwgXCJOdWxsXCI7XHJcbiAgICAgIGFzTm9kZSgpOiBOb2RlO1xyXG4gICAgICB0b1N0cmluZygpOiBzdHJpbmc7XHJcbiAgICAgIG5vZGU6IE5vZGUgfCBudWxsO1xyXG4gICAgICBwYXJlbnQ6IFZOb2RlIHwgbnVsbDtcclxuICAgICAgY2hpbGRyZW46IEFycmF5PFZOb2RlPjtcclxuICAgICAgdGFnOiBzdHJpbmcgfCBGdW5jdGlvbjsgLy8gP1xyXG4gICAgICAvL2dldFBhcmVudEVsZW1lbnROb2RlKCk6IFZOb2RlOyAvLyBhbmNlc3RvciB3aGljaCBoYXMgYSBFbGVtZW50IG5vZGUgKGkuZS4gbm8gRnJhZ21lbnQpXHJcbiAgICAgIC8vZ2V0Q2hpbGRFbGVtZW50Tm9kZXMoKTogVk5vZGVbXTsgLy8gY2hpbGRyZW4gYW5kIGlmIGEgY2hpbGQgaXMgYSBmcmFnbWVudCBpdHMgY2hpbGRyZW5cclxuICAgIH0qL1xyXG5cclxudHlwZSBDb21tb25WTm9kZVByb3BlcnRpZXMgPSB7XHJcbiAgcGFyZW50OiBWTm9kZTtcclxuICBhc05vZGUoKTogTm9kZTtcclxuICB0b1N0cmluZygpOiBzdHJpbmc7XHJcbn07XHJcbnR5cGUgRWxlbWVudFZOb2RlID0gQ29tbW9uVk5vZGVQcm9wZXJ0aWVzICYge1xyXG4gIHR5cGU6IFwiRWxlbWVudFwiO1xyXG4gIG5vZGU6IEVsZW1lbnQ7XHJcbiAgY2hpbGRyZW46IEFycmF5PFZOb2RlPjtcclxuICB0YWc6IHN0cmluZyB8IEZ1bmN0aW9uO1xyXG4gIHByb3BzOiB7IFtrZXk6IHN0cmluZ106IGFueSB9O1xyXG59O1xyXG50eXBlIFRleHRWTm9kZSA9IENvbW1vblZOb2RlUHJvcGVydGllcyAmIHtcclxuICB0eXBlOiBcIlRleHROb2RlXCI7XHJcbiAgbm9kZTogVGV4dDtcclxuICBjaGlsZHJlbjogQXJyYXk8Vk5vZGU+OyAvL0FycmF5PG5ldmVyPjtcclxuICB0YWc6IG51bGw7XHJcbn07XHJcblxyXG50eXBlIFJvb3RWTm9kZSA9IHtcclxuICB0eXBlOiBcIlJvb3RcIjtcclxuICBub2RlOiBFbGVtZW50O1xyXG4gIGNoaWxkcmVuOiBBcnJheTxWTm9kZT47XHJcbiAgcGFyZW50OiBudWxsO1xyXG4gIC8vYXNOb2RlKCk6IE5vZGU7XHJcbiAgLy90b1N0cmluZygpOiBzdHJpbmc7XHJcbn07XHJcblxyXG50eXBlIFZOb2RlID0ge1xyXG4gIHBhcmVudDogVk5vZGU7XHJcbiAgYXNOb2RlKCk6IE5vZGU7XHJcbiAgdG9TdHJpbmcoKTogc3RyaW5nO1xyXG59ICYgKFxyXG4gIHwgRWxlbWVudFZOb2RlXHJcbiAgfCBUZXh0Vk5vZGVcclxuICB8IHtcclxuICAgICAgdHlwZTogXCJUZXh0Tm9kZVwiO1xyXG4gICAgICBub2RlOiBUZXh0O1xyXG4gICAgICBjaGlsZHJlbjogQXJyYXk8Vk5vZGU+OyAvL0FycmF5PG5ldmVyPjtcclxuICAgICAgdGFnOiBudWxsO1xyXG4gICAgfVxyXG4gIHwge1xyXG4gICAgICB0eXBlOiBcIkZyYWdtZW50XCI7XHJcbiAgICAgIG5vZGU6IG51bGw7IC8vIEBUT0RPOiBvciBudWxsP1xyXG4gICAgICBjaGlsZHJlbjogQXJyYXk8Vk5vZGU+O1xyXG4gICAgICB0YWc6IG51bGw7XHJcbiAgICB9XHJcbiAgfCB7XHJcbiAgICAgIHR5cGU6IFwiTnVsbFwiO1xyXG4gICAgICBub2RlOiBudWxsO1xyXG4gICAgICBjaGlsZHJlbjogQXJyYXk8Vk5vZGU+OyAvL0FycmF5PG5ldmVyPjtcclxuICAgICAgdGFnOiBudWxsO1xyXG4gICAgfVxyXG4pO1xyXG5cclxuLy8gbnVsbCB3aGVuIGNoZWNraW5nIHRoZSBwYXJlbnQgd2hlbiByb290IGlzIGZyYWdtZW50IGl0c2VsZlxyXG5mdW5jdGlvbiBnZXRQYXJlbnRFbGVtZW50Tm9kZSh2Tm9kZTogVk5vZGUpOiBFbGVtZW50Vk5vZGUge1xyXG4gIGNvbnNvbGUubG9nKFwiZ2V0UGFyZW50RWxlbWVudE5vZGVcIiwgdk5vZGUpO1xyXG5cclxuICB3aGlsZSAodk5vZGUucGFyZW50KSB7XHJcbiAgICB2Tm9kZSA9IHZOb2RlLnBhcmVudDtcclxuICAgIC8vIGAubm9kZWAgaXMgb25seSBvbiBcIlRleHRcIiBhbmQgXCJFbGVtZW50XCIgdHlwZSBWTm9kZSwgYW5kIG9ubHkgRWxlbWVudCBoYXMgY2hpbGRyZW5cclxuICAgIGlmICh2Tm9kZS5ub2RlKSBicmVhaztcclxuICB9XHJcblxyXG4gIGNvbnNvbGUubG9nKFwiZm91bmQ6IFwiLCB2Tm9kZSk7XHJcblxyXG4gIHJldHVybiB2Tm9kZSBhcyBFbGVtZW50Vk5vZGU7XHJcbn1cclxuXHJcbnR5cGUgVk5vZGVMaWtlV2l0aENoaWxkcmVuID0ge1xyXG4gIG5vZGU/OiBOb2RlIHwgbnVsbDtcclxuICBjaGlsZHJlbjogQXJyYXk8Vk5vZGVMaWtlV2l0aENoaWxkcmVuPjtcclxuICBba2V5OiBzdHJpbmddOiBhbnk7XHJcbn07XHJcblxyXG5mdW5jdGlvbiBnZXRDaGlsZHJlbldpdGhOb2RlcyhcclxuICB2Tm9kZTogVk5vZGVMaWtlV2l0aENoaWxkcmVuLFxyXG4gIGFsd2F5c0FsbG93OiBWTm9kZUxpa2VXaXRoQ2hpbGRyZW4gPSBbXVxyXG4pOiBWTm9kZVtdIHtcclxuICByZXR1cm4gdk5vZGUuY2hpbGRyZW5cclxuICAgIC5tYXAoKGNoaWxkTm9kZTogVk5vZGVMaWtlV2l0aENoaWxkcmVuKSA9PiB7XHJcbiAgICAgIGlmIChjaGlsZE5vZGUgPT09IGFsd2F5c0FsbG93KSByZXR1cm4gY2hpbGROb2RlO1xyXG4gICAgICAvL2lmIChjaGlsZE5vZGUudHlwZSA9PT0gXCJOdWxsXCIpIHJldHVybiBudWxsO1xyXG4gICAgICBpZiAoY2hpbGROb2RlLm5vZGUpIHJldHVybiBjaGlsZE5vZGU7XHJcbiAgICAgIC8vaWYgKGNoaWxkTm9kZS50eXBlID09PSBcIkZyYWdtZW50XCIpXHJcbiAgICAgIC8vcmV0dXJuIGdldENoaWxkcmVuV2l0aE5vZGVzKGNoaWxkTm9kZSwgYWx3YXlzQWxsb3cpO1xyXG4gICAgICAvLyBAVE9ETzogb3RoZXIgdHlwZXMgKGkuZS4gTGl2ZSBFbGVtZW50KVxyXG4gICAgICByZXR1cm4gZ2V0Q2hpbGRyZW5XaXRoTm9kZXMoY2hpbGROb2RlLCBhbHdheXNBbGxvdyk7XHJcbiAgICB9KVxyXG4gICAgLmZsYXQoSW5maW5pdHkpXHJcbiAgICAuZmlsdGVyKEJvb2xlYW4pIGFzIFZOb2RlW107XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdldFBhcmVudEFuZE5leHRTaWJsaW5nKHZOb2RlOiBWTm9kZSk6IFtOb2RlLCBOb2RlIHwgbnVsbF0ge1xyXG4gIC8vIG5vZGUgYW5jZXN0b3Igd2l0aCBFbGVtZW50LFxyXG4gIGNvbnN0IHBhcmVudFdpdGhFbGVtZW50ID0gZ2V0UGFyZW50RWxlbWVudE5vZGUodk5vZGUpO1xyXG4gIGNvbnN0IHNpYmxpbmdzID0gZ2V0Q2hpbGRyZW5XaXRoTm9kZXMocGFyZW50V2l0aEVsZW1lbnQsIHZOb2RlKTtcclxuICBjb25zdCBwcmV2U2libGluZyA9IHNpYmxpbmdzW3NpYmxpbmdzLmluZGV4T2Yodk5vZGUpIC0gMV07XHJcbiAgY29uc3QgbmV4dFNpYmxpbmdOb2RlID0gcHJldlNpYmxpbmcgPyBwcmV2U2libGluZy5ub2RlIS5uZXh0U2libGluZyA6IG51bGw7XHJcblxyXG4gIGNvbnNvbGUubG9nKFwiZ2V0UGFyZW50QW5kTmV4dFNpYmxpbmdcIiwge1xyXG4gICAgdk5vZGUsXHJcbiAgICBwYXJlbnRXaXRoRWxlbWVudCxcclxuICAgIHByZXZTaWJsaW5nLFxyXG4gICAgcHJldlNpYmxpbmdOb2RlOiBwcmV2U2libGluZy5ub2RlLFxyXG4gICAgbmV4dFNpYmxpbmdOb2RlLFxyXG4gIH0pO1xyXG5cclxuICByZXR1cm4gW3BhcmVudFdpdGhFbGVtZW50Lm5vZGUsIG5leHRTaWJsaW5nTm9kZV07XHJcbn1cclxuXHJcbi8vIHByaXZhdGUga2V5IGZvciBjYWxsaW5nIHRoZSBgcmVmYCBjYWxsZXJzXHJcbmNvbnN0IF9jYWxsUmVmcyA9IFN5bWJvbChcImNhbGxSZWZzXCIpO1xyXG5cclxuLy8gdGhlIGN1cnJlbnQgbWFya3VwIHdoaWNoIGlzIHJlbmRlcmVkIGlzIG5lc3RlZCBpbiBhbiBzdmcgZWxlbWVudFxyXG5sZXQgc3ZnQ29udGV4dCA9IGZhbHNlO1xyXG5cclxuLy8ganN4IGFuZCBGcmFnbWVudCB3aWxsIHJldHVybiBvYmplY3RzIHdoaWNoIGltcGxlbWVudCB0aGlzIGludGVyZmFjZVxyXG5leHBvcnQgaW50ZXJmYWNlIEpzeE5vZGVJbnRlcmZhY2UgZXh0ZW5kcyBKc3hOb2RlIHtcclxuICB0b1N0cmluZygpOiBzdHJpbmc7XHJcbiAgYXNOb2RlKCk6IE5vZGU7XHJcbiAgYXNWTm9kZSgpOiBWTm9kZTtcclxuICBbX2NhbGxSZWZzXSgpOiB2b2lkO1xyXG59XHJcblxyXG4vKipcclxuICogcmV0dXJucyB0cnVlIGlmIG5vdCBudWxsaXNoIG9yIGZhbHNlXHJcbiAqIHRoYXQgbWVhbnMgMCBvciBlbXB0eSBzdHJpbmcgYXJlIGFsbG93ZWRcclxuICogQHBhcmFtIHsqfSB2YWxcclxuICovXHJcbmZ1bmN0aW9uIHRydXRoeSh2YWx1ZTogYW55KTogYm9vbGVhbiB7XHJcbiAgcmV0dXJuIHZhbHVlICE9PSBmYWxzZSAmJiB2YWx1ZSAhPT0gbnVsbCAmJiB2YWx1ZSAhPT0gdW5kZWZpbmVkO1xyXG59XHJcblxyXG4vKipcclxuICogZXNjYXBlcyB0aGUgcHJvdmlkZWQgc3RyaW5nIGFnYWluc3QgeHNzIGF0dGFja3MgZXRjXHJcbiAqXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSB0ZXh0XHJcbiAqIEByZXR1cm5zIHtzdHJpbmd9XHJcbiAqL1xyXG5mdW5jdGlvbiBzYW5pdGl6ZSh0ZXh0OiBzdHJpbmcpOiBzdHJpbmcge1xyXG4gIGNvbnN0IGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgZGl2LmlubmVyVGV4dCA9IHRleHQ7XHJcbiAgcmV0dXJuIGRpdi5pbm5lckhUTUw7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBiYXNpY2FsbHkgYEVsZW1lbnQub3V0ZXJIVE1MYCBidXQgYWxzbyBzdXBwb3J0cyBUZXh0IG5vZGUgYW5kIERvY3VtZW50RnJhZ21lbnRcclxuICogQHBhcmFtIGVsZW1lbnQge05vZGV9IC0gZWxlbWVudCB3aGljaCBpdHMgaHRtbCBuZWVkcyB0byBiZSByZXR1cm5lZFxyXG4gKi9cclxuZnVuY3Rpb24gZ2V0T3V0ZXJIdG1sKGVsZW1lbnQ6IE5vZGUpOiBzdHJpbmcge1xyXG4gIGlmIChlbGVtZW50IGluc3RhbmNlb2YgRWxlbWVudCkgcmV0dXJuIGVsZW1lbnQub3V0ZXJIVE1MO1xyXG4gIGlmIChlbGVtZW50IGluc3RhbmNlb2YgVGV4dCkgcmV0dXJuIHNhbml0aXplKGVsZW1lbnQud2hvbGVUZXh0KTtcclxuICBpZiAoZWxlbWVudCBpbnN0YW5jZW9mIERvY3VtZW50RnJhZ21lbnQpXHJcbiAgICByZXR1cm4gQXJyYXkuZnJvbShlbGVtZW50LmNoaWxkTm9kZXMpXHJcbiAgICAgIC5tYXAoKGVsKSA9PiBnZXRPdXRlckh0bWwoZWwpKVxyXG4gICAgICAuam9pbihcIlwiKTtcclxuXHJcbiAgLy8gc2hvdWxkbid0IHJlYWNoIHRoaXMgcG9pbnRcclxuICBjb25zb2xlLndhcm4oXCJnZXRPdXRlckh0bWwgZG9lcyBub3Qgc3VwcG9ydCB0aGlzIHR5cGUgb2YgZWxlbWVudFwiLCBlbGVtZW50KTtcclxuICByZXR1cm4gXCJcIjtcclxufVxyXG5cclxuLyoqXHJcbiAqIGdlbmVyYXRlcyB0aGUgaHRtbCBhcyBhIHN0cmluZyB3aGljaCBjYW4gYmUgdXNlZCBmb3IgZXhhbXBsZSB3aXRoIGBlbGVtZW50LmlubmVySFRNTCgpYFxyXG4gKlxyXG4gKiBAcGFyYW0gdGFnIHtzdHJpbmd8RnVuY3Rpb259IC0gdGFnIGFyZ3VtZW50IG9mIHRoZSBqc3ggY2FsbFxyXG4gKiBAcGFyYW0gcHJvcHMge09iamVjdH0gLSBwcm9wcyBhcmd1bWVudCBvZiBqc3ggY2FsbFxyXG4gKi9cclxuZnVuY3Rpb24gYXNIdG1sU3RyaW5nKHRhZzogc3RyaW5nIHwgRnVuY3Rpb24sIHByb3BzOiBKc3hQcm9wcykge1xyXG4gIGlmICh0eXBlb2YgdGFnID09PSBcImZ1bmN0aW9uXCIpIHtcclxuICAgIC8vIGV4cGVjdGluZyB0YWcgZnVuY3Rpb24gdG8gYWx3YXlzIHJldHVybiBhIGpzeC5cclxuICAgIC8vIGhlcmUgaXQgd2lsbCBhbHNvIHdvcmsgaWYgaXQgcmV0dXJucyBzb21ldGhpbmcgd2l0aCB0b1N0cmluZygpID0+IHN0cmluZyBtZXRob2RcclxuICAgIGNvbnN0IGVsZW1lbnQ6IEpzeE5vZGUgPSB0YWcocHJvcHMpO1xyXG5cclxuICAgIHJldHVybiBlbGVtZW50LnRvU3RyaW5nKCk7XHJcbiAgfVxyXG5cclxuICAvLyByZW1vdmUgY2hpbGRyZW4gZnJvbSBwcm9wcyBhbmQgcmVuZGVyIGl0IGFzIGNvbnRlbnQsXHJcbiAgLy8gdGhlIHJlc3QgYXMgYXR0cmlidXRlc1xyXG4gIGNvbnN0IHsgY2hpbGRyZW4sIC4uLmF0dHJzIH0gPSBwcm9wcztcclxuXHJcbiAgY29uc3QgYXR0cmlidXRlcyA9IE9iamVjdC5lbnRyaWVzKGF0dHJzKVxyXG4gICAgLmZpbHRlcigoWywgdmFsdWVdKSA9PiB0cnV0aHkodmFsdWUpKVxyXG4gICAgLm1hcCgoW2tleSwgdmFsdWVdKSA9PiB7XHJcbiAgICAgIC8vIGUuZy4gZGlzYWJsZWQ6IHRydWUgPT4gPHRhZyBkaXNhYmxlZD5cclxuICAgICAgaWYgKHZhbHVlID09PSB0cnVlKSByZXR1cm4ga2V5O1xyXG5cclxuICAgICAgLy8gZm9yIHN0eWxlIGFzIG9iamVjdDpcclxuICAgICAgLy8gKHN0eWxlOikge2Rpc3BsYXk6IFwibm9uZVwiLCBwb3NpdGlvbjogXCJhYnNvbHV0ZVwifSA9PT4gJ2Rpc3BsYXk6IG5vbmU7IHBvc2l0aW9uOiBhYnNvbHV0ZTsnXHJcbiAgICAgIGlmIChrZXkgPT09IFwic3R5bGVcIiAmJiB0eXBlb2YgdmFsdWUgPT09IFwib2JqZWN0XCIpXHJcbiAgICAgICAgdmFsdWUgPSBPYmplY3QuZW50cmllcyh2YWx1ZSlcclxuICAgICAgICAgIC8vIGlnbm9yZSBzdHVmZiBsaWtlIGB7YmFja2dyb3VuZDogYWN0aXZlICYmIFwicmVkXCJ9YCB3aGVuIGBhY3RpdmUgPT09IGZhbHNlIC8gbnVsbCAvIHVuZGVmaW5lZGBcclxuICAgICAgICAgIC5maWx0ZXIoKFssIHZdKSA9PiB0cnV0aHkodikpXHJcbiAgICAgICAgICAvLyBjdXJyZW50bHkgc3VwcG9ydHMgXCJiYWNrZ3JvdW5kLWNvbG9yXCIgbm90IFwiYmFja2dyb3VuZENvbG9yXCJcclxuICAgICAgICAgIC5tYXAoKFtrLCB2XSkgPT4gYCR7a306ICR7dn1gKVxyXG4gICAgICAgICAgLmpvaW4oXCI7IFwiKTtcclxuXHJcbiAgICAgIC8vIChjbGFzczopIFtcImJ0blwiLCBcInJlZFwiXSA9PT4gXCJidG4gcmVkXCJcclxuICAgICAgaWYgKGtleSA9PT0gXCJjbGFzc1wiICYmIEFycmF5LmlzQXJyYXkodmFsdWUpKSB2YWx1ZSA9IHZhbHVlLmpvaW4oXCIgXCIpO1xyXG5cclxuICAgICAgcmV0dXJuIGAke2tleX09XCIke3ZhbHVlfVwiYDtcclxuICAgIH0pXHJcbiAgICAuam9pbihcIiBcIik7XHJcblxyXG4gIGNvbnN0IGNvbnRlbnQgPSBjaGlsZHJlblxyXG4gICAgLmZpbHRlcih0cnV0aHkpXHJcbiAgICAubWFwKChjaGlsZCkgPT5cclxuICAgICAgY2hpbGQgaW5zdGFuY2VvZiBOb2RlXHJcbiAgICAgICAgPyBnZXRPdXRlckh0bWwoY2hpbGQpXHJcbiAgICAgICAgOiB0eXBlb2YgY2hpbGQgPT09IFwib2JqZWN0XCJcclxuICAgICAgICA/IGNoaWxkLnRvU3RyaW5nKClcclxuICAgICAgICA6IHNhbml0aXplKGNoaWxkKVxyXG4gICAgKVxyXG4gICAgLmpvaW4oXCJcIik7XHJcblxyXG4gIHJldHVybiBgPCR7dGFnfSAke2F0dHJpYnV0ZXN9PiR7Y29udGVudH08LyR7dGFnfT5gO1xyXG59XHJcblxyXG4vKipcclxuICogZ2VuZXJhdGVzIEhUTUwgTm9kZSBlbGVtZW50cyBmcm9tIHRoZSBwcm92aWRlZCBqc3ggdHJlZVxyXG4gKiBAcGFyYW0gdGFnIHtzdHJpbmd8RnVuY3Rpb259IC0gdGFnIGFyZ3VtZW50IG9mIHRoZSBqc3ggY2FsbFxyXG4gKiBAcGFyYW0gcHJvcHMge09iamVjdH0gLSBwcm9wcyBhcmd1bWVudCBvZiBqc3ggY2FsbFxyXG4gKi9cclxuZnVuY3Rpb24gYXNOb2RlKFxyXG4gIHRhZzogc3RyaW5nIHwgRnVuY3Rpb24gfCB1bmRlZmluZWQsXHJcbiAgcHJvcHM6IEF0dHJpYnV0ZXMgJiBTcGVjaWFsQXR0cmlidXRlcywgLy9Kc3hQcm9wcyxcclxuICBjaGlsZHJlbjogYW55W11cclxuKTogW05vZGUsIEpzeE5vZGVJbnRlcmZhY2VbXV0ge1xyXG4gIGNvbnNvbGUubG9nKFwiYXNOb2RlKClcIiwgeyB0YWcsIHByb3BzLCBjaGlsZHJlbiB9KTtcclxuXHJcbiAgLy8gZnJhZ21lbnRcclxuICBpZiAoIXRhZykge1xyXG4gICAgY29uc3QgZnJhZ21lbnRzID0gY2hpbGRyZW5cclxuICAgICAgLmZsYXQoKVxyXG4gICAgICAuZmlsdGVyKChuKSA9PiBuLnRhZyAhPT0gXCJfX05VTExfX1wiKVxyXG4gICAgICAvLy5maWx0ZXIodHJ1dGh5KVxyXG4gICAgICAubWFwKFxyXG4gICAgICAgIChpdGVtKSA9PiBpdGVtLmFzTm9kZSgpXHJcbiAgICAgICAgLyppdGVtIGluc3RhbmNlb2YgTm9kZVxyXG4gICAgICAgICAgICA/IGl0ZW1cclxuICAgICAgICAgICAgOiBpdGVtIGluc3RhbmNlb2YgSnN4Tm9kZVxyXG4gICAgICAgICAgICA/IGl0ZW0uYXNOb2RlKClcclxuICAgICAgICAgICAgOiBpdGVtKi9cclxuICAgICAgKTtcclxuXHJcbiAgICBjb25zdCBkb2N1bWVudEZyYWdtZW50ID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO1xyXG5cclxuICAgIGRvY3VtZW50RnJhZ21lbnQuYXBwZW5kKC4uLmZyYWdtZW50cyk7XHJcbiAgICByZXR1cm4gW2RvY3VtZW50RnJhZ21lbnQsIFtdXTtcclxuICB9XHJcblxyXG4gIC8vIHNob3VsZG4ndFxyXG4gIGlmICh0eXBlb2YgdGFnID09PSBcImZ1bmN0aW9uXCIpIHtcclxuICAgIGNvbnNvbGUuZXJyb3IoXCJzaG91bGRuJ3QgcmVhY2ggdGhpcyBpbiB2VHJlZSBtb2RlXCIpO1xyXG4gICAgLy8gZXhwZWN0aW5nIHRoZSB0YWcgZnVuY3Rpb24gdG8gcmV0dXJuIGpzeC5cclxuICAgIC8vIGhlcmUgaXQgd2lsbCBhbHNvIHdvcmsgd2hlbiBpdCByZXR1cm5zIEhUTUxFbGVtZW50XHJcbiAgICBsZXQgcmVzdWx0ID0gdGFnKHByb3BzKTtcclxuXHJcbiAgICBsZXQganN4Tm9kZXM6IEpzeE5vZGVJbnRlcmZhY2VbXSA9IFtdO1xyXG5cclxuICAgIGlmIChyZXN1bHQgaW5zdGFuY2VvZiBKc3hOb2RlIHx8IChyZXN1bHQgJiYgcmVzdWx0LmFzTm9kZSkpIHtcclxuICAgICAganN4Tm9kZXMgPSBbcmVzdWx0IGFzIEpzeE5vZGVJbnRlcmZhY2VdO1xyXG4gICAgICByZXN1bHQgPSAocmVzdWx0IGFzIEpzeE5vZGVJbnRlcmZhY2UpLmFzTm9kZSgpO1xyXG4gICAgICBPYmplY3QuZW50cmllcyhwcm9wcykuZm9yRWFjaCgoW2tleSwgdmFsdWVdKSA9PiB7XHJcbiAgICAgICAgaWYgKFxyXG4gICAgICAgICAga2V5LnN0YXJ0c1dpdGgoXCJvbi1cIikgJiZcclxuICAgICAgICAgICh0eXBlb2YgdmFsdWUgPT09IFwiZnVuY3Rpb25cIiB8fCB0eXBlb2YgdmFsdWUgPT09IFwib2JqZWN0XCIpXHJcbiAgICAgICAgKSB7XHJcbiAgICAgICAgICAvLyByZW1vdmUgbGVhZGluZyBcIm9uLVwiXCJcclxuICAgICAgICAgIGNvbnN0IGV2ZW50ID0ga2V5LnJlcGxhY2UoL15vbi0vLCBcIlwiKTtcclxuXHJcbiAgICAgICAgICByZXN1bHQuYWRkRXZlbnRMaXN0ZW5lcihcclxuICAgICAgICAgICAgZXZlbnQsXHJcbiAgICAgICAgICAgIHZhbHVlIGFzIEV2ZW50TGlzdGVuZXJPckV2ZW50TGlzdGVuZXJPYmplY3RcclxuICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gW3Jlc3VsdCwganN4Tm9kZXNdO1xyXG4gIH1cclxuXHJcbiAgY29uc3QgeyAuLi5hdHRycyB9ID0gcHJvcHM7XHJcbiAgLy8gcmVtZW1iZXIgaWYgdGhlIHN2ZyBjb250ZXh0IHdhcyBzZXQgZm9yIHRoaXMgbm9kZSwgYW5kIHJlcGxhY2UgYWZ0ZXIgZ2VuZXJhdGluZyBhbGwgY2hpbGRyZW5cclxuICBsZXQgc3ZnQ29udGV4dFNldCA9IGZhbHNlO1xyXG5cclxuICAvLyBzZXQgdGhlIGNvbnRleHQgb2YgbWFya3VwIHdoaWNoIGlzIHJlbmRlcmVkIGFzIFNWRyAob3IgaXRzIGNoaWxkcmVuKVxyXG4gIC8vIG5vIG5lZWQgZm9yIHJlLXNldHRpbmcgdGhlIGNvbnRleHQgZm9yIG5lc3RlZCBTVkdzXHJcbiAgaWYgKCFzdmdDb250ZXh0ICYmIHRhZyA9PT0gXCJzdmdcIikge1xyXG4gICAgc3ZnQ29udGV4dCA9IHRydWU7XHJcbiAgICBzdmdDb250ZXh0U2V0ID0gdHJ1ZTtcclxuICB9XHJcblxyXG4gIC8vIGN1cnJlbnRseSBub3Qgc3VwcG9ydGluZyB0aGUgYGlzYCBvcHRpb24gZm9yIEN1c3RvbWl6ZWQgYnVpbHQtaW4gZWxlbWVudHNcclxuICBjb25zdCBub2RlID0gc3ZnQ29udGV4dFxyXG4gICAgPyBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoXCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiLCB0YWcpXHJcbiAgICA6IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodGFnKTtcclxuXHJcbiAgT2JqZWN0LmVudHJpZXMoYXR0cnMpXHJcbiAgICAuZmlsdGVyKChbX2tleSwgdmFsdWVdKSA9PiB0cnV0aHkodmFsdWUpKVxyXG4gICAgLmZvckVhY2goKFtrZXksIHZhbHVlXSkgPT4ge1xyXG4gICAgICAvLyBmb3Igc3R5bGUgYXMgb2JqZWN0OlxyXG4gICAgICAvLyAoc3R5bGU6KSB7ZGlzcGxheTogXCJub25lXCIsIHBvc2l0aW9uOiBcImFic29sdXRlXCJ9ID09PiAnZGlzcGxheTogbm9uZTsgcG9zaXRpb246IGFic29sdXRlOydcclxuICAgICAgaWYgKGtleSA9PT0gXCJzdHlsZVwiICYmIHR5cGVvZiB2YWx1ZSA9PT0gXCJvYmplY3RcIilcclxuICAgICAgICB2YWx1ZSA9IE9iamVjdC5lbnRyaWVzKHZhbHVlKVxyXG4gICAgICAgICAgLmZpbHRlcigoWywgdl0pID0+IHRydXRoeSh2KSlcclxuICAgICAgICAgIC5tYXAoKFtrLCB2XSkgPT4gYCR7a306ICR7dn1gKVxyXG4gICAgICAgICAgLmpvaW4oXCI7IFwiKTtcclxuXHJcbiAgICAgIC8vIChjbGFzczopIFtcImJ0blwiLCBcInJlZFwiXSA9PT4gXCJidG4gcmVkXCJcclxuICAgICAgaWYgKGtleSA9PT0gXCJjbGFzc1wiICYmIEFycmF5LmlzQXJyYXkodmFsdWUpKSB2YWx1ZSA9IHZhbHVlLmpvaW4oXCIgXCIpO1xyXG5cclxuICAgICAgaWYgKHZhbHVlID09PSB0cnVlKSBub2RlLnNldEF0dHJpYnV0ZShrZXksIFwiXCIpO1xyXG4gICAgICBlbHNlIGlmICh0eXBlb2YgdmFsdWUgPT09IFwic3RyaW5nXCIgfHwgdHlwZW9mIHZhbHVlID09PSBcIm51bWJlclwiKVxyXG4gICAgICAgIG5vZGUuc2V0QXR0cmlidXRlKGtleSwgU3RyaW5nKHZhbHVlKSk7XHJcbiAgICAgIC8vIGtleSBoYXMgdGhlIGZvcm0gb2YgXCJvbi1jaGFuZ2VcIi4gdmFsdWUgaXMgdGhlIGNhbGxiYWNrIGZ1bmN0aW9uIG9yIGFuIG9iamVjdCBpbXBsZW1lbnRpbmcge0V2ZW50TGlzdGVuZXJ9IGludGVyZmFjZVxyXG4gICAgICBlbHNlIGlmIChcclxuICAgICAgICBrZXkuc3RhcnRzV2l0aChcIm9uLVwiKSAmJlxyXG4gICAgICAgICh0eXBlb2YgdmFsdWUgPT09IFwiZnVuY3Rpb25cIiB8fCB0eXBlb2YgdmFsdWUgPT09IFwib2JqZWN0XCIpXHJcbiAgICAgICkge1xyXG4gICAgICAgIC8vIHJlbW92ZSBsZWFkaW5nIFwib24tXCJcIlxyXG4gICAgICAgIGNvbnN0IGV2ZW50ID0ga2V5LnJlcGxhY2UoL15vbi0vLCBcIlwiKTtcclxuXHJcbiAgICAgICAgbm9kZS5hZGRFdmVudExpc3RlbmVyKFxyXG4gICAgICAgICAgZXZlbnQsXHJcbiAgICAgICAgICB2YWx1ZSBhcyBFdmVudExpc3RlbmVyT3JFdmVudExpc3RlbmVyT2JqZWN0XHJcbiAgICAgICAgKTtcclxuICAgICAgfVxyXG4gICAgICAvLyBAdHMtaWdub3JlIC0gcHJvdmlkaW5nIHRoZSB2YWx1ZSBhcyBwcm9wZXJ0eSB0byBodG1sIGVsZW1lbnRcclxuICAgICAgZWxzZSBub2RlW2tleV0gPSB2YWx1ZTtcclxuICAgIH0pO1xyXG5cclxuICAvLyByZXR1cm5zIGNoaWxkIGpzeCBub2RlcyBhcyB3ZWxsIHRvIGJlIHVzZWQgZHVyaW5nIHRoZSByZWYgY2FsbFxyXG4gIGNvbnN0IGNoaWxkSnN4Tm9kZXMgPSBjaGlsZHJlbi5maWx0ZXIoXHJcbiAgICAoY2hpbGQpID0+IGNoaWxkIGluc3RhbmNlb2YgSnN4Tm9kZSB8fCAoY2hpbGQgJiYgY2hpbGQuYXNOb2RlKVxyXG4gICk7XHJcblxyXG4gIGNvbnNvbGUubG9nKHsgY2hpbGRyZW4gfSk7XHJcblxyXG4gIG5vZGUuYXBwZW5kKFxyXG4gICAgLi4uY2hpbGRyZW5cclxuICAgICAgLmZsYXQoKVxyXG4gICAgICAvLy5maWx0ZXIodHJ1dGh5KVxyXG4gICAgICAuZmlsdGVyKChjaGlsZCkgPT4gY2hpbGQudGFnICE9PSBcIl9fTlVMTF9fXCIpXHJcbiAgICAgIC5tYXAoKGNoaWxkKSA9PiBjaGlsZC5hc05vZGUoKSlcclxuICApO1xyXG5cclxuICAvKm5vZGUuYXBwZW5kKFxyXG4gICAgLi4uY2hpbGRyZW5cclxuICAgICAgLmZsYXQoKVxyXG4gICAgICAuZmlsdGVyKHRydXRoeSlcclxuICAgICAgLm1hcCgoY2hpbGQpID0+XHJcbiAgICAgICAgY2hpbGQgaW5zdGFuY2VvZiBOb2RlXHJcbiAgICAgICAgICA/IGNvbnNvbGUud2FybihcIm5vZGVcIikgfHwgY2hpbGQgLy8gd2FyblxyXG4gICAgICAgICAgOiBjaGlsZCBpbnN0YW5jZW9mIEpzeE5vZGVcclxuICAgICAgICAgID8gY2hpbGQuYXNOb2RlKClcclxuICAgICAgICAgIDogY29uc29sZS53YXJuKFwidGV4dFwiKSB8fCBjaGlsZFxyXG4gICAgICApXHJcbiAgKTsqL1xyXG5cclxuICAvLyBzdmcgZWxlbWVudCBhbmQgYWxsIGl0cyBjaGlsZHJlbiB3ZXJlIHJlbmRlcmVkLCByZXNldCB0aGUgc3ZnIGNvbnRleHRcclxuICBpZiAoc3ZnQ29udGV4dFNldCkgc3ZnQ29udGV4dCA9IGZhbHNlO1xyXG5cclxuICByZXR1cm4gW25vZGUsIGNoaWxkSnN4Tm9kZXMgYXMgSnN4Tm9kZUludGVyZmFjZVtdXTtcclxufVxyXG5cclxuLy8gQFRPRE86IHJlbW92ZSBtZXRob2Qgb24gVk5vZGVcclxuZnVuY3Rpb24gcmVtb3ZlSXRlbShpdGVtOiBWTm9kZSkge1xyXG4gIC8vaWYgKGl0ZW0gPT09IG51bGwpIHJldHVybjtcclxuICBpZiAoaXRlbS50eXBlID09PSBcIkVsZW1lbnRcIiB8fCBpdGVtLnR5cGUgPT09IFwiVGV4dE5vZGVcIilcclxuICAgIGl0ZW0ubm9kZS5wYXJlbnRFbGVtZW50IS5yZW1vdmVDaGlsZChpdGVtLm5vZGUpO1xyXG4gIGVsc2UgaWYgKGl0ZW0udHlwZSA9PT0gXCJGcmFnbWVudFwiKVxyXG4gICAgZ2V0Q2hpbGRyZW5XaXRoTm9kZXMoaXRlbSkuZm9yRWFjaCgobm9kZSkgPT5cclxuICAgICAgbm9kZS5ub2RlIS5wYXJlbnRFbGVtZW50IS5yZW1vdmVDaGlsZChub2RlLm5vZGUhKVxyXG4gICAgKTtcclxuICAvLyBAVE9ETzogZWxzZSAtPiBWTm9kZSBtZXRob2QgYWN0dWFsbHlcclxufVxyXG5cclxuZnVuY3Rpb24gaW5zZXJ0TmV3SXRlbShuZXdOb2RlOiBWTm9kZSkge1xyXG4gIC8vIEBUT0RPOiBOdWxsIG5vdCBuZWNjY2VzZXJ5IGFzIGFzTm9kZSB3aWxsIHJldHVybiBhbiBlbXB0eSBGcmFnbWVudCwgYW5kIG1ha2UgdGhlIG1ldGhvZCBtb3JlIGdlbmVyaWNcclxuICBpZiAobmV3Tm9kZS50eXBlICE9PSBcIk51bGxcIikge1xyXG4gICAgY29uc3QgW3BhcmVudCwgbmV4dFNpYmxpbmddID0gZ2V0UGFyZW50QW5kTmV4dFNpYmxpbmcobmV3Tm9kZSk7XHJcbiAgICBwYXJlbnQuaW5zZXJ0QmVmb3JlKG5ld05vZGUuYXNOb2RlKCksIG5leHRTaWJsaW5nKTtcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGRpZmZBbmRQYXRjaChvbGROb2RlOiBWTm9kZSB8IFJvb3RWTm9kZSwgbmV3Tm9kZTogVk5vZGUgfCBSb290Vk5vZGUpIHtcclxuICBjb25zb2xlLmxvZyhcIi0tLS0tLS0tIGRpZmZBbmRQYXRjaCAtLS0tLS0tLVwiLCB7IG9sZE5vZGUsIG5ld05vZGUgfSk7XHJcbiAgaWYgKG9sZE5vZGUudHlwZSAhPT0gbmV3Tm9kZS50eXBlKSB7XHJcbiAgICAvLyB0ZWNobmljYWxseSBpdCB3b3VsZCBiZWVuIG1vcmUgZWZmZWN0aXZlIHdheXMgdG8gcmVwbGFjZSwgZS5nLiByZXBsYWNlV2l0aCgpIG1ldGhvZFxyXG4gICAgLy8gYnV0IHJlbW92aW5nIGFuZCBhZGRpbmcgd291bGQgYWxsb3cgYSBtb3JlIGdlbmVyaWMgc29sdXRpb24gdG8gcHJvdmlkZSBpbmRlcGVuZGVudCBpbXBsZW1lbnRhdGlvbiBmcm9tIGRpZmZlcmVudCBWTm9kZSBjbGFzc2VzXHJcbiAgICByZW1vdmVJdGVtKG9sZE5vZGUgYXMgVk5vZGUpO1xyXG4gICAgaW5zZXJ0TmV3SXRlbShuZXdOb2RlIGFzIFZOb2RlKTtcclxuICB9XHJcbiAgLy8gYm90aCBudWxsIDotPiBkbyBub3RoaW5nXHJcbiAgZWxzZSBpZiAob2xkTm9kZS50eXBlID09PSBcIk51bGxcIiAmJiBuZXdOb2RlLnR5cGUgPT09IFwiTnVsbFwiKSByZXR1cm47XHJcbiAgLy8gYm90aCBUZXh0IE5vZGVzIDotPiB1cGRhdGUgdGhlIHRleHRcclxuICBlbHNlIGlmIChvbGROb2RlLnR5cGUgPT09IFwiVGV4dE5vZGVcIiAmJiBuZXdOb2RlLnR5cGUgPT09IFwiVGV4dE5vZGVcIikge1xyXG4gICAgaWYgKG9sZE5vZGUubm9kZSEubm9kZVZhbHVlICE9PSBuZXdOb2RlLnByb3BzLmNvbnRlbnQpIHtcclxuICAgICAgb2xkTm9kZS5ub2RlIS5ub2RlVmFsdWUgPSBuZXdOb2RlLnByb3BzLmNvbnRlbnQ7XHJcbiAgICB9XHJcbiAgICBuZXdOb2RlLm5vZGUgPSBvbGROb2RlLm5vZGU7XHJcbiAgfVxyXG4gIC8vIGJvdGggSFRNTEVsZW1lbnQgd2l0aCBzYW1lIHRhZ1xyXG4gIGVsc2UgaWYgKG9sZE5vZGUudHlwZSA9PT0gXCJFbGVtZW50XCIgJiYgbmV3Tm9kZS50eXBlID09PSBcIkVsZW1lbnRcIikge1xyXG4gICAgaWYgKG5ld05vZGUudGFnID09PSBvbGROb2RlLnRhZykge1xyXG4gICAgICBuZXdOb2RlLm5vZGUgPSBvbGROb2RlLm5vZGU7XHJcbiAgICAgIC8vICAgICAgcGF0Y2ggcHJvcHMsXHJcbiAgICAgIC8vIHVwZGF0ZSBwcm9wcyBmb3JtIG5ldyBub2RlXHJcbiAgICAgIE9iamVjdC5lbnRyaWVzKG5ld05vZGUucHJvcHMpXHJcbiAgICAgICAgLmZpbHRlcigoW2ssIHZdKSA9PiBvbGROb2RlLnByb3BzW2tdICE9PSB2KVxyXG4gICAgICAgIC5mb3JFYWNoKChba2V5LCB2YWx1ZV0pID0+IHtcclxuICAgICAgICAgIGlmICh2YWx1ZSA9PT0gdHJ1ZSkgbmV3Tm9kZS5ub2RlLnNldEF0dHJpYnV0ZShrZXksIFwiXCIpO1xyXG4gICAgICAgICAgZWxzZSBpZiAodmFsdWUgPT09IG51bGwgfHwgdmFsdWUgPT09IHVuZGVmaW5lZCB8fCB2YWx1ZSA9PT0gZmFsc2UpXHJcbiAgICAgICAgICAgIG5ld05vZGUubm9kZS5yZW1vdmVBdHRyaWJ1dGUoa2V5KTtcclxuICAgICAgICAgIGVsc2UgbmV3Tm9kZS5ub2RlLnNldEF0dHJpYnV0ZShrZXksIHZhbHVlKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgIC8vIHJlbW92ZSBvbGQsIG9ic29sYXRlIGF0dHJpYnV0ZXNcclxuICAgICAgT2JqZWN0LmVudHJpZXMob2xkTm9kZS5wcm9wcylcclxuICAgICAgICAuZmlsdGVyKChbaywgdl0pID0+ICFuZXdOb2RlLnByb3BzLmhhc093blByb3BlcnR5KGspKVxyXG4gICAgICAgIC5mb3JFYWNoKChba2V5LCB2YWx1ZV0pID0+IHtcclxuICAgICAgICAgIG9sZE5vZGUubm9kZS5yZW1vdmVBdHRyaWJ1dGUoa2V5KTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgIC8vIGNoaWxkcmVuID0+IGl0ZXIgYW5kIHBhdGNoXHJcbiAgICAgIC8vIG9sZCBjaGlsZHJlbiBiZWluZyBtb2RpZmllZFxyXG4gICAgICBkaWZmQW5kUGF0Y2hDaGlsZHJlbihvbGROb2RlLCBuZXdOb2RlKTtcclxuICAgIH1cclxuICAgIC8vIHRhZyBoYXMgY2hhbmdlZFxyXG4gICAgZWxzZSB7XHJcbiAgICAgIG9sZE5vZGUubm9kZS5yZXBsYWNlV2l0aChuZXdOb2RlLmFzTm9kZSgpKTtcclxuICAgIH1cclxuICB9XHJcbiAgLy8gRnJhZ21lbnRzXHJcbiAgZWxzZSBpZiAob2xkTm9kZS50eXBlID09PSBcIkZyYWdtZW50XCIgJiYgbmV3Tm9kZS50eXBlID09PSBcIkZyYWdtZW50XCIpIHtcclxuICAgIC8vIGl0ZXJhdGUsIGRpZmYgYW5kIHBhdGNoXHJcbiAgICBkaWZmQW5kUGF0Y2hDaGlsZHJlbihvbGROb2RlLCBuZXdOb2RlKTtcclxuICB9IGVsc2UgaWYgKG9sZE5vZGUudHlwZSA9PT0gXCJSb290XCIpIHtcclxuICAgIC8vIGl0ZXJhdGUsIGRpZmYgYW5kIHBhdGNoXHJcbiAgICBkaWZmQW5kUGF0Y2hDaGlsZHJlbihvbGROb2RlLCBuZXdOb2RlKTtcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGRpZmZBbmRQYXRjaENoaWxkcmVuKFxyXG4gIG9sZE5vZGU6IFZOb2RlIHwgUm9vdFZOb2RlIHwgVk5vZGVJbnRlcmZhY2UsXHJcbiAgbmV3Tm9kZTogVk5vZGUgfCBSb290Vk5vZGUgfCBWTm9kZUludGVyZmFjZVxyXG4pIHtcclxuICBvbGROb2RlLmNoaWxkcmVuLmZvckVhY2goKG9sZENoaWxkLCBpeCkgPT4ge1xyXG4gICAgY29uc3QgbmV3Q2hpbGQgPSBuZXdOb2RlLmNoaWxkcmVuW2l4XTtcclxuICAgIGlmIChuZXdDaGlsZCkgZGlmZkFuZFBhdGNoKG9sZENoaWxkLCBuZXdDaGlsZCk7XHJcbiAgICAvLyBjaGlsZCB3YXMgcmVtb3ZlZFxyXG4gICAgZWxzZSB7XHJcbiAgICAgIHJlbW92ZUl0ZW0ob2xkQ2hpbGQpO1xyXG4gICAgfVxyXG4gIH0pO1xyXG5cclxuICAvLyBuZXcgYWRkaXRpb24gaXRlbXNcclxuICBjb25zdCBuZXdJdGVtcyA9IG5ld05vZGUuY2hpbGRyZW4uc2xpY2Uob2xkTm9kZS5jaGlsZHJlbi5sZW5ndGgpO1xyXG4gIGlmIChuZXdJdGVtcy5sZW5ndGgpIHtcclxuICAgIGNvbnN0IGRvY3VtZW50RnJhZ21lbnQgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XHJcbiAgICBuZXdJdGVtcy5mb3JFYWNoKChpdGVtKSA9PiBkb2N1bWVudEZyYWdtZW50LmFwcGVuZChpdGVtLmFzTm9kZSgpKSk7XHJcblxyXG4gICAgLy8gYWRkIHRvIHRoZSBlbmQgb2YgcGFyZW50IG5vZGVcclxuICAgIGlmIChuZXdOb2RlLm5vZGUgJiYgZmFsc2UpIHsgLy8gb3RoZXIgb25lIHdvdWxkIHdvcmsgdGhlIHNhbWVcclxuICAgICAgbmV3Tm9kZS5ub2RlLmluc2VydEJlZm9yZShkb2N1bWVudEZyYWdtZW50LCBudWxsKTtcclxuICAgIH1cclxuICAgIC8vIG9yIGlmIG5vZGUgaXMgbm90IGFuIGVsZW1lbnQgKGkuZS4gYSBmcmFnbWVudCkgYWRkIGFmdGVyIGl0LlxyXG4gICAgZWxzZSB7XHJcbiAgICAgIC8vIEBUT0RPOiAgcmV0dXJucyBpdGVtcyBiZWZvcmUgdm5vZGUgYW5kIHRoZWlyIG5leHQgc2libGluZyBha2EgZmlyc3QgZnJhZyBpdGVtIVxyXG5cclxuICAgICAgY29uc3QgW3BhcmVudCwgbmV4dFNpYmxpbmddID0gZ2V0UGFyZW50QW5kTmV4dFNpYmxpbmcobmV3SXRlbXNbMF0pO1xyXG4gICAgICBwYXJlbnQuaW5zZXJ0QmVmb3JlKGRvY3VtZW50RnJhZ21lbnQsIG5leHRTaWJsaW5nKTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGFzVk5vZGUodGFnOiBzdHJpbmcgfCBGdW5jdGlvbiB8IHVuZGVmaW5lZCwgcHJvcHM6IEpzeFByb3BzKTogVk5vZGUge1xyXG4gIGlmICh0eXBlb2YgdGFnID09PSBcImZ1bmN0aW9uXCIpIHtcclxuICAgIGxldCByZXN1bHQgPSB0YWcocHJvcHMpO1xyXG4gICAgaWYgKHJlc3VsdCBpbnN0YW5jZW9mIEpzeE5vZGUgfHwgKHJlc3VsdCAmJiByZXN1bHQuYXNOb2RlKSkge1xyXG4gICAgICAvL2NvbnNvbGUud2FybihcImFzVk5vZGUgd2l0aCBKc3hOb2RlXCIpO1xyXG4gICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgICByZXR1cm4gKHJlc3VsdCBhcyBKc3hOb2RlSW50ZXJmYWNlKS5hc1ZOb2RlKCk7XHJcbiAgICB9XHJcbiAgICAvLyBiaWcgQFRPRE86XHJcbiAgICBpZiAocmVzdWx0IGluc3RhbmNlb2YgTm9kZSkge1xyXG4gICAgICBjb25zdCBub2RlID0ge1xyXG4gICAgICAgIG5vZGU6IHVuZGVmaW5lZCxcclxuICAgICAgICB0YWc6IFwiX19OT0RFX19cIixcclxuICAgICAgICB0eXBlOiBcIj9cIixcclxuICAgICAgICBwYXJlbnQ6IG51bGwsXHJcbiAgICAgICAgcHJvcHM6IHtcclxuICAgICAgICAgIGNvbnRlbnQ6IHJlc3VsdCxcclxuICAgICAgICB9LFxyXG4gICAgICAgIGNoaWxkcmVuOiBbXSxcclxuICAgICAgICBhc05vZGUoKSB7XHJcbiAgICAgICAgICBub2RlLm5vZGUgPSByZXN1bHQ7XHJcbiAgICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZGlmZkFuZFBhdGNoKCkge1xyXG4gICAgICAgICAgY29uc29sZS5sb2coXCJfX05PREVfXyAxIGRpZmZBbmRQYXRjaFwiLCByZXN1bHQpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgIH07XHJcblxyXG4gICAgICByZXR1cm4gbm9kZTtcclxuICAgIH1cclxuXHJcbiAgICAvKmZ1bmN0aW9uIGdldEZpcnN0RWxlbWVudChubm46IFZOb2RlKSB7XHJcbiAgICAgIGlmIChubm4udHlwZSA9PT0gXCJFbGVtZW50XCIpIHJldHVybiBubm4ubm9kZTtcclxuICAgICAgaWYgKG5ubi50eXBlID09PSBcIk51bGxcIikgcmV0dXJuIG51bGw7XHJcbiAgICAgIGlmIChubm4udHlwZSA9PT0gXCJGcmFnbWVudFwiKSB7XHJcbiAgICAgICAgY29uc3QgaXRlbSA9IG5ubi5jaGlsZHJlbi5maW5kKChuMikgPT4gZ2V0Rmlyc3RFbGVtZW50KG4yKSAhPT0gbnVsbCk7XHJcbiAgICAgICAgcmV0dXJuIGl0ZW0gPyBpdGVtLm5vZGUgOiBudWxsO1xyXG4gICAgICB9XHJcbiAgICB9Ki9cclxuXHJcbiAgICAvLyBudWxsIGpzeCBub2RlXHJcbiAgICBpZiAoIXRydXRoeShyZXN1bHQpKSB7XHJcbiAgICAgIGNvbnN0IGZvb05vZGU6IFZOb2RlID0ge30gYXMgYW55O1xyXG4gICAgICBPYmplY3QuYXNzaWduKGZvb05vZGUsIHtcclxuICAgICAgICB0YWc6IFwiX19OVUxMX19cIixcclxuICAgICAgICB0eXBlOiBcIk51bGxcIixcclxuICAgICAgICB0YWcyOiBcInRhZyBmdW5jIHJldHVybmVkIG51bGwgbm9kZVwiLFxyXG4gICAgICAgIG5vZGU6IG51bGwsXHJcbiAgICAgICAgcGFyZW50OiBudWxsLFxyXG4gICAgICAgIHByb3BzOiB7fSxcclxuICAgICAgICBjaGlsZHJlbjogW10sXHJcbiAgICAgICAgYXNOb2RlKCkge1xyXG4gICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBkaWZmQW5kUGF0Y2gobmV3Tm9kZTogVk5vZGUpIHtcclxuICAgICAgICAgIHJldHVybiBkaWZmQW5kUGF0Y2goZm9vTm9kZSwgbmV3Tm9kZSk7XHJcbiAgICAgICAgfSxcclxuICAgICAgfSk7XHJcblxyXG4gICAgICByZXR1cm4gZm9vTm9kZTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBub2RlID0ge1xyXG4gICAgICB0YWc6IFwiX19URVhUX05PREVfX1wiLFxyXG4gICAgICB0eXBlOiBcIlRleHROb2RlXCIsXHJcbiAgICAgIHRhZzE6IDEsXHJcbiAgICAgIG5vZGU6IG51bGwsXHJcbiAgICAgIHBhcmVudDogbnVsbCxcclxuICAgICAgcHJvcHM6IHtcclxuICAgICAgICBjb250ZW50OiByZXN1bHQsXHJcbiAgICAgIH0sXHJcbiAgICAgIGNoaWxkcmVuOiBbXSxcclxuICAgICAgYXNOb2RlKCkge1xyXG4gICAgICAgIGNvbnN0IHRleHROb2RlID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUocmVzdWx0KTtcclxuICAgICAgICBub2RlLm5vZGUgPSB0ZXh0Tm9kZTtcclxuICAgICAgICByZXR1cm4gdGV4dE5vZGU7XHJcbiAgICAgIH0sXHJcbiAgICAgIGRpZmZBbmRQYXRjaChuZXdOb2RlKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXHJcbiAgICAgICAgICBcIl9fVEVYVF9OT0RFX18gMSBkaWZmQW5kUGF0Y2hcIixcclxuICAgICAgICAgIHJlc3VsdCxcclxuICAgICAgICAgIG5ld05vZGUucHJvcHMuY29udGVudFxyXG4gICAgICAgICk7XHJcblxyXG4gICAgICAgIHJldHVybiBkaWZmQW5kUGF0Y2gobm9kZSwgbmV3Tm9kZSk7XHJcblxyXG4gICAgICAgIC8vIEBUT0RPIGJvdGggdGV4dFxyXG4gICAgICAgIGlmIChyZXN1bHQgIT09IG5ld05vZGUucHJvcHMuY29udGVudClcclxuICAgICAgICAgIG5vZGUubm9kZS5ub2RlVmFsdWUgPSBuZXdOb2RlLnByb3BzLmNvbnRlbnQ7XHJcbiAgICAgICAgLy8gZWxzZSA/XHJcbiAgICAgIH0sXHJcbiAgICB9O1xyXG5cclxuICAgIHJldHVybiBub2RlO1xyXG4gIH1cclxuXHJcbiAgY29uc3QgeyBjaGlsZHJlbiwgLi4uYXR0ciB9ID0gcHJvcHM7XHJcbiAgY29uc3Qgdk5vZGU6IFZOb2RlID0ge30gYXMgYW55O1xyXG4gIGlmICh0YWcpIHtcclxuICAgIE9iamVjdC5hc3NpZ24odk5vZGUsIHtcclxuICAgICAgdGFnLFxyXG4gICAgICB0eXBlOiBcIkVsZW1lbnRcIiwgLy8gd2hlcmUgY29tZXMgRnJhZ2VtbnQ/XHJcbiAgICAgIHRhZzI6IFwiYXNWTm9kZSAtIG5vcm1hbCByZXR1cm5cIixcclxuICAgICAgbm9kZTogbnVsbCxcclxuICAgICAgcHJvcHM6IGF0dHIsXHJcbiAgICAgIGNoaWxkcmVuOiBjaGlsZHJlbi5mbGF0KCkubWFwKChjaGlsZCkgPT4ge1xyXG4gICAgICAgIGlmICghY2hpbGQpIGNvbnNvbGUubG9nKFwiY2hpbGQgbnVsbGlzaFwiLCB7IGNoaWxkLCB2Tm9kZSB9KTtcclxuICAgICAgICBpZiAoY2hpbGQgaW5zdGFuY2VvZiBKc3hOb2RlIHx8IChjaGlsZCAmJiBjaGlsZC5hc05vZGUpKSB7XHJcbiAgICAgICAgICBjb25zdCBjaGlsZFZOb2RlID0gY2hpbGQ7IC8vY2hpbGQuYXNWTm9kZSgpO1xyXG4gICAgICAgICAgY2hpbGRWTm9kZS5wYXJlbnQgPSB2Tm9kZTtcclxuICAgICAgICAgIHJldHVybiBjaGlsZFZOb2RlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoY2hpbGQgaW5zdGFuY2VvZiBOb2RlKSB7XHJcbiAgICAgICAgICBjb25zdCBub2RlID0ge1xyXG4gICAgICAgICAgICB0YWc6IFwiX19OT0RFX19cIixcclxuICAgICAgICAgICAgcHJvcHM6IHtcclxuICAgICAgICAgICAgICBjb250ZW50OiBjaGlsZCxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgcGFyZW50OiB2Tm9kZSxcclxuICAgICAgICAgICAgY2hpbGRyZW46IFtdLFxyXG4gICAgICAgICAgICBhc05vZGUoKSB7XHJcbiAgICAgICAgICAgICAgbm9kZS5ub2RlID0gY2hpbGQ7XHJcbiAgICAgICAgICAgICAgcmV0dXJuIGNoaWxkO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBkaWZmQW5kUGF0Y2goKSB7XHJcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJfX05PREVfXyBkaWZmQW5kUGF0Y2hcIiwgY2hpbGQpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICByZXR1cm4gbm9kZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiQEAgbWFwXCIsIHsgY2hpbGQgfSk7XHJcblxyXG4gICAgICAgIGlmIChjaGlsZCA9PT0gbnVsbCB8fCBjaGlsZCA9PT0gZmFsc2UgfHwgY2hpbGQgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgY29uc3QgY2hpbGRWTm9kZTogVk5vZGUgPSB7XHJcbiAgICAgICAgICAgIHRhZzogXCJfX05VTExfX1wiLFxyXG4gICAgICAgICAgICB0eXBlOiBcIk51bGxcIixcclxuICAgICAgICAgICAgdGFnMjogXCJjaGlsZHJlbiBudWxsIG5vZGVcIixcclxuICAgICAgICAgICAgbm9kZTogbnVsbCxcclxuICAgICAgICAgICAgcGFyZW50OiB2Tm9kZSxcclxuICAgICAgICAgICAgcHJvcHM6IHt9LFxyXG4gICAgICAgICAgICBjaGlsZHJlbjogW10sXHJcbiAgICAgICAgICAgIGFzTm9kZSgpIHtcclxuICAgICAgICAgICAgICByZXR1cm4gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpOy8vcmV0dXJuIG51bGw7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGRpZmZBbmRQYXRjaChuZXdOb2RlOiBWTm9kZSkge1xyXG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiZGlmZi1BbmRQYXRjaCwgY2hpbGQgbm9kZSB3YXMgbnVsbFwiLCBuZXdOb2RlKTtcclxuXHJcbiAgICAgICAgICAgICAgaWYgKG5ld05vZGUudGFnID09PSBcIl9fTlVMTF9fXCIpIHJldHVybjtcclxuICAgICAgICAgICAgICBjb25zdCBuID0gbmV3Tm9kZS5hc05vZGUoKTtcclxuICAgICAgICAgICAgICAvLyBAVE9ETzogZmluZCBpdGVtIGJlZm9yZVxyXG4gICAgICAgICAgICAgIC8vdk5vZGUubm9kZVxyXG4gICAgICAgICAgICAgIGNvbnN0IG5ld05vZGVJbmRleCA9IG5ld05vZGUucGFyZW50LmNoaWxkcmVuLmluZGV4T2YobmV3Tm9kZSk7XHJcbiAgICAgICAgICAgICAgY29uc3Qgc2libGluZ3MgPSBuZXdOb2RlLnBhcmVudC5jaGlsZHJlblxyXG4gICAgICAgICAgICAgICAgLnNsaWNlKDAsIG5ld05vZGVJbmRleClcclxuICAgICAgICAgICAgICAgIC5yZXZlcnNlKCk7XHJcbiAgICAgICAgICAgICAgY29uc3Qgc2libGluZ0JlZm9yZSA9IHNpYmxpbmdzLmZpbmQoKG46IFZOb2RlKSA9PiBuLm5vZGUpO1xyXG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKHsgc2libGluZ0JlZm9yZSwgc2libGluZ3MsIG5ld05vZGVJbmRleCwgbmV3Tm9kZSB9KTtcclxuXHJcbiAgICAgICAgICAgICAgaWYgKHNpYmxpbmdCZWZvcmUpIHtcclxuICAgICAgICAgICAgICAgIHNpYmxpbmdCZWZvcmUubm9kZS5pbnNlcnRBZGphY2VudEVsZW1lbnQoXCJhZnRlcmVuZFwiLCBuKTtcclxuICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdk5vZGUubm9kZS5pbnNlcnRBZGphY2VudEVsZW1lbnQoXCJhZnRlcmJlZ2luXCIsIG4pO1xyXG4gICAgICAgICAgICAgICAgLyoobmV3Tm9kZS5wYXJlbnQubm9kZSBhcyBIVE1MRWxlbWVudCkuaW5zZXJ0QWRqYWNlbnRFbGVtZW50KFxyXG4gICAgICAgICAgICAgICAgXCJhZnRlcmJlZ2luXCIsXHJcbiAgICAgICAgICAgICAgICBuZXdOb2RlLmFzTm9kZSgpXHJcbiAgICAgICAgICAgICAgKTsqL1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgcmV0dXJuIGNoaWxkVk5vZGU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zb2xlLmxvZyhcIjo6OlwiLCB7IGNoaWxkIH0pO1xyXG5cclxuICAgICAgICBjb25zdCBub2RlID0ge1xyXG4gICAgICAgICAgdGFnOiBcIl9fVEVYVF9OT0RFX19cIixcclxuICAgICAgICAgIHR5cGU6IFwiVGV4dE5vZGVcIixcclxuICAgICAgICAgIHRhZzI6IFwiY2hpbGRyZW4gVGV4dCBub2RlIDNcIixcclxuICAgICAgICAgIG5vZGU6IG51bGwsXHJcbiAgICAgICAgICBwYXJlbnQ6IHZOb2RlLFxyXG4gICAgICAgICAgcHJvcHM6IHtcclxuICAgICAgICAgICAgY29udGVudDogY2hpbGQsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgY2hpbGRyZW46IFtdLFxyXG4gICAgICAgICAgYXNOb2RlKCkge1xyXG4gICAgICAgICAgICBjb25zdCB0ZXh0Tm9kZSA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNoaWxkKTtcclxuICAgICAgICAgICAgbm9kZS5ub2RlID0gdGV4dE5vZGU7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHRleHROb2RlLCBub2RlKTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiB0ZXh0Tm9kZTtcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICAvLyB0b3AgbGV2ZWwgdm5vZGVcclxuICAgICAgICAgIGRpZmZBbmRQYXRjaChuZXdOb2RlOiBWTm9kZSkge1xyXG4gICAgICAgICAgICAvLyBAVE9ETyBib3RoIHRleHQ/XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiY2hhbmdlPyBcIiwgbmV3Tm9kZS50YWcsIG5vZGUudGFnKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChuZXdOb2RlLnRhZyAhPT0gbm9kZS50YWcpIHtcclxuICAgICAgICAgICAgICBjb25zdCBhc05vZGUgPSBuZXdOb2RlLmFzTm9kZSgpO1xyXG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKHsgYXNOb2RlIH0pO1xyXG5cclxuICAgICAgICAgICAgICBpZiAoYXNOb2RlKSB7XHJcbiAgICAgICAgICAgICAgICBub2RlLm5vZGUucmVwbGFjZVdpdGgoYXNOb2RlKTtcclxuICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgbm9kZS5ub2RlLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQobm9kZS5ub2RlKTtcclxuICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoY2hpbGQgIT09IG5ld05vZGUucHJvcHMuY29udGVudClcclxuICAgICAgICAgICAgICBub2RlLm5vZGUubm9kZVZhbHVlID0gbmV3Tm9kZS5wcm9wcy5jb250ZW50O1xyXG4gICAgICAgICAgICBuZXdOb2RlLm5vZGUgPSBub2RlLm5vZGU7XHJcbiAgICAgICAgICAgIC8vIGVsc2UgP1xyXG4gICAgICAgICAgfSxcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICByZXR1cm4gbm9kZTtcclxuICAgICAgfSksXHJcblxyXG4gICAgICBhc05vZGUoKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJhc1ZOb2RlLmFzTm9kZVwiLCB7IHRhZywgcHJvcHMsIHZOb2RlIH0pO1xyXG5cclxuICAgICAgICBjb25zdCBub2RlID0gYXNOb2RlKHRhZywgYXR0ciwgdk5vZGUuY2hpbGRyZW4pWzBdO1xyXG4gICAgICAgIHZOb2RlLm5vZGUgPSBub2RlO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHsgbm9kZSB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIG5vZGU7XHJcbiAgICAgIH0sXHJcbiAgICAgIC8vIHRvIGxldmVsXHJcbiAgICAgIGRpZmZBbmRQYXRjaChuZXdWTm9kZTogVk5vZGUpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcImRpZmZBbmRQYXRjaFwiKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGRpZmZBbmRQYXRjaCh2Tm9kZSwgbmV3Vk5vZGUpO1xyXG5cclxuICAgICAgICAvLyA/IHdoZW4/XHJcbiAgICAgICAgaWYgKCFuZXdWTm9kZSkge1xyXG4gICAgICAgICAgKHZOb2RlLm5vZGUhIGFzIEhUTUxFbGVtZW50KS5wYXJlbnROb2RlIS5yZW1vdmVDaGlsZChcclxuICAgICAgICAgICAgdk5vZGUubm9kZSEgYXMgSFRNTEVsZW1lbnRcclxuICAgICAgICAgICk7XHJcbiAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAobmV3Vk5vZGUudGFnICE9PSB0YWcpIHtcclxuICAgICAgICAgIGNvbnN0IG5ld05vZGUgPSBuZXdWTm9kZS5hc05vZGUoKTtcclxuICAgICAgICAgIGlmICh2Tm9kZS5ub2RlKSB7XHJcbiAgICAgICAgICAgIGlmIChuZXdOb2RlKSAodk5vZGUubm9kZSEgYXMgSFRNTEVsZW1lbnQpLnJlcGxhY2VXaXRoKG5ld05vZGUpO1xyXG4gICAgICAgICAgICBlbHNlIHZOb2RlLm5vZGUucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCh2Tm9kZS5ub2RlKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIEBUT0RPOiBpZiBzcGVjaWFsIHRhZ3NcclxuXHJcbiAgICAgICAgLy8gdXBkYXRlIHByb3BzIGZvcm0gbmV3IG5vZGVcclxuICAgICAgICBPYmplY3QuZW50cmllcyhuZXdWTm9kZS5wcm9wcylcclxuICAgICAgICAgIC5maWx0ZXIoKFtrLCB2XSkgPT4gcHJvcHNba10gIT09IHYpXHJcbiAgICAgICAgICAuZm9yRWFjaCgoW2tleSwgdmFsdWVdKSA9PiB7XHJcbiAgICAgICAgICAgIGlmICh2YWx1ZSA9PT0gdHJ1ZSkgdk5vZGUubm9kZS5zZXRBdHRyaWJ1dGUoa2V5LCBcIlwiKTtcclxuICAgICAgICAgICAgZWxzZSBpZiAodmFsdWUgPT09IG51bGwgfHwgdmFsdWUgPT09IHVuZGVmaW5lZCB8fCB2YWx1ZSA9PT0gZmFsc2UpXHJcbiAgICAgICAgICAgICAgdk5vZGUubm9kZS5yZW1vdmVBdHRyaWJ1dGUoa2V5KTtcclxuICAgICAgICAgICAgZWxzZSB2Tm9kZS5ub2RlLnNldEF0dHJpYnV0ZShrZXksIHZhbHVlKTtcclxuICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvLyByZW1vdmUgb2xkLCBvYnNvbGF0ZSBhdHRyaWJ1dGVzXHJcbiAgICAgICAgT2JqZWN0LmVudHJpZXModk5vZGUucHJvcHMpXHJcbiAgICAgICAgICAuZmlsdGVyKChbaywgdl0pID0+ICFuZXdWTm9kZS5wcm9wcy5oYXNPd25Qcm9wZXJ0eShrKSlcclxuICAgICAgICAgIC5mb3JFYWNoKChba2V5LCB2YWx1ZV0pID0+IHtcclxuICAgICAgICAgICAgdk5vZGUubm9kZS5yZW1vdmVBdHRyaWJ1dGUoa2V5KTtcclxuICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICBuZXdWTm9kZS5ub2RlID0gdk5vZGUubm9kZTtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIm5vZGUgdXBkYXRlXCIsIG5ld1ZOb2RlLCB2Tm9kZSk7XHJcblxyXG4gICAgICAgIC8vIEBUT0RPOiBwcm9wcyBub3QgYXR0cmlidXRlc1xyXG5cclxuICAgICAgICAvLyBjaGlsZHJlblxyXG4gICAgICAgIHZOb2RlLmNoaWxkcmVuLmZvckVhY2goKGNoaWxkLCBpeCkgPT5cclxuICAgICAgICAgIGNoaWxkLmRpZmZBbmRQYXRjaChuZXdWTm9kZS5jaGlsZHJlbltpeF0pXHJcbiAgICAgICAgKTtcclxuICAgICAgICAvLyBAVE9ETzogbmV3IGNoaWxkcmVuXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IHZOb2RlLmNoaWxkcmVuLmxlbmd0aDsgaSA8IG5ld1ZOb2RlLmNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICB2Tm9kZS5ub2RlLmluc2VydEFkamFjZW50RWxlbWVudChcclxuICAgICAgICAgICAgXCJiZWZvcmVlbmRcIixcclxuICAgICAgICAgICAgbmV3Vk5vZGUuY2hpbGRyZW5baV0uYXNOb2RlKClcclxuICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9LFxyXG4gICAgfSk7XHJcbiAgfVxyXG4gIC8vIG5vIHRhZyAoRnJhZ21lbnQgYW5kIE51bGw/KVxyXG4gIGVsc2Uge1xyXG4gICAgY29uc29sZS5sb2coXCJGcmFnbWVudCBWTm9kZVwiKTtcclxuXHJcbiAgICBPYmplY3QuYXNzaWduKHZOb2RlLCB7XHJcbiAgICAgIHRhZyxcclxuICAgICAgdHlwZTogXCJGcmFnbWVudFwiLCAvLyB3aGVyZSBjb21lcyBGcmFnbWVudD9cclxuICAgICAgdGFnMjogXCJhc1ZOb2RlIC0gbm9ybWFsIHJldHVybiBGcmFnbWVudFwiLFxyXG4gICAgICBub2RlOiBudWxsLFxyXG4gICAgICBjaGlsZHJlbjogY2hpbGRyZW4uZmxhdCgpLm1hcCgoY2hpbGQpID0+IHtcclxuICAgICAgICBpZiAoY2hpbGQgaW5zdGFuY2VvZiBKc3hOb2RlIHx8IChjaGlsZCAmJiBjaGlsZC5hc05vZGUpKSB7XHJcbiAgICAgICAgICBjb25zdCBjaGlsZFZOb2RlID0gY2hpbGQ7IC8vY2hpbGQuYXNWTm9kZSgpO1xyXG4gICAgICAgICAgY2hpbGRWTm9kZS5wYXJlbnQgPSB2Tm9kZTtcclxuICAgICAgICAgIHJldHVybiBjaGlsZFZOb2RlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoY2hpbGQgaW5zdGFuY2VvZiBOb2RlKSB7XHJcbiAgICAgICAgICBjb25zdCBub2RlID0ge1xyXG4gICAgICAgICAgICB0YWc6IFwiX19OT0RFX19cIixcclxuICAgICAgICAgICAgcHJvcHM6IHtcclxuICAgICAgICAgICAgICBjb250ZW50OiBjaGlsZCxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgcGFyZW50OiB2Tm9kZSxcclxuICAgICAgICAgICAgY2hpbGRyZW46IFtdLFxyXG4gICAgICAgICAgICBhc05vZGUoKSB7XHJcbiAgICAgICAgICAgICAgbm9kZS5ub2RlID0gY2hpbGQ7XHJcbiAgICAgICAgICAgICAgcmV0dXJuIGNoaWxkO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBkaWZmQW5kUGF0Y2goKSB7XHJcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJfX05PREVfXyBkaWZmQW5kUGF0Y2hcIiwgY2hpbGQpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICByZXR1cm4gbm9kZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiQEAgbWFwXCIsIHsgY2hpbGQgfSk7XHJcblxyXG4gICAgICAgIGlmIChjaGlsZCA9PT0gbnVsbCB8fCBjaGlsZCA9PT0gZmFsc2UgfHwgY2hpbGQgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgY29uc3QgY2hpbGRWTm9kZTogVk5vZGUgPSB7XHJcbiAgICAgICAgICAgIHRhZzogXCJfX05VTExfX1wiLFxyXG4gICAgICAgICAgICB0eXBlOiBcIk51bGxcIixcclxuICAgICAgICAgICAgdGFnMjogXCJjaGlsZHJlbiBudWxsIG5vZGVcIixcclxuICAgICAgICAgICAgbm9kZTogbnVsbCxcclxuICAgICAgICAgICAgcGFyZW50OiB2Tm9kZSxcclxuICAgICAgICAgICAgcHJvcHM6IHt9LFxyXG4gICAgICAgICAgICBjaGlsZHJlbjogW10sXHJcbiAgICAgICAgICAgIGFzTm9kZSgpIHtcclxuICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZGlmZkFuZFBhdGNoKG5ld05vZGU6IFZOb2RlKSB7XHJcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJkaWZmLUFuZFBhdGNoLCBjaGlsZCBub2RlIHdhcyBudWxsXCIsIG5ld05vZGUpO1xyXG5cclxuICAgICAgICAgICAgICBpZiAobmV3Tm9kZS50YWcgPT09IFwiX19OVUxMX19cIikgcmV0dXJuO1xyXG4gICAgICAgICAgICAgIGNvbnN0IG4gPSBuZXdOb2RlLmFzTm9kZSgpO1xyXG4gICAgICAgICAgICAgIC8vIEBUT0RPOiBmaW5kIGl0ZW0gYmVmb3JlXHJcbiAgICAgICAgICAgICAgLy92Tm9kZS5ub2RlXHJcbiAgICAgICAgICAgICAgY29uc3QgbmV3Tm9kZUluZGV4ID0gbmV3Tm9kZS5wYXJlbnQuY2hpbGRyZW4uaW5kZXhPZihuZXdOb2RlKTtcclxuICAgICAgICAgICAgICBjb25zdCBzaWJsaW5ncyA9IG5ld05vZGUucGFyZW50LmNoaWxkcmVuXHJcbiAgICAgICAgICAgICAgICAuc2xpY2UoMCwgbmV3Tm9kZUluZGV4KVxyXG4gICAgICAgICAgICAgICAgLnJldmVyc2UoKTtcclxuICAgICAgICAgICAgICBjb25zdCBzaWJsaW5nQmVmb3JlID0gc2libGluZ3MuZmluZCgobjogVk5vZGUpID0+IG4ubm9kZSk7XHJcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coeyBzaWJsaW5nQmVmb3JlLCBzaWJsaW5ncywgbmV3Tm9kZUluZGV4LCBuZXdOb2RlIH0pO1xyXG5cclxuICAgICAgICAgICAgICBpZiAoc2libGluZ0JlZm9yZSkge1xyXG4gICAgICAgICAgICAgICAgc2libGluZ0JlZm9yZS5ub2RlLmluc2VydEFkamFjZW50RWxlbWVudChcImFmdGVyZW5kXCIsIG4pO1xyXG4gICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB2Tm9kZS5ub2RlLmluc2VydEFkamFjZW50RWxlbWVudChcImFmdGVyYmVnaW5cIiwgbik7XHJcbiAgICAgICAgICAgICAgICAvKihuZXdOb2RlLnBhcmVudC5ub2RlIGFzIEhUTUxFbGVtZW50KS5pbnNlcnRBZGphY2VudEVsZW1lbnQoXHJcbiAgICAgICAgICAgICAgICAgIFwiYWZ0ZXJiZWdpblwiLFxyXG4gICAgICAgICAgICAgICAgICBuZXdOb2RlLmFzTm9kZSgpXHJcbiAgICAgICAgICAgICAgICApOyovXHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICByZXR1cm4gY2hpbGRWTm9kZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiOjo6XCIsIHsgY2hpbGQgfSk7XHJcblxyXG4gICAgICAgIGNvbnN0IG5vZGUgPSB7XHJcbiAgICAgICAgICB0YWc6IFwiX19URVhUX05PREVfX1wiLFxyXG4gICAgICAgICAgdHlwZTogXCJUZXh0Tm9kZVwiLFxyXG4gICAgICAgICAgdGFnMjogXCJjaGlsZHJlbiBUZXh0IG5vZGVcIixcclxuICAgICAgICAgIG5vZGU6IG51bGwsXHJcbiAgICAgICAgICBwYXJlbnQ6IHZOb2RlLFxyXG4gICAgICAgICAgcHJvcHM6IHtcclxuICAgICAgICAgICAgY29udGVudDogY2hpbGQsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgY2hpbGRyZW46IFtdLFxyXG4gICAgICAgICAgYXNOb2RlKCkge1xyXG4gICAgICAgICAgICBjb25zdCB0ZXh0Tm9kZSA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNoaWxkKTtcclxuICAgICAgICAgICAgbm9kZS5ub2RlID0gdGV4dE5vZGU7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHRleHROb2RlLCBub2RlKTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiB0ZXh0Tm9kZTtcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICAvLyB0b3AgbGV2ZWwgdm5vZGVcclxuICAgICAgICAgIGRpZmZBbmRQYXRjaChuZXdOb2RlOiBWTm9kZSkge1xyXG4gICAgICAgICAgICAvLyBAVE9ETyBib3RoIHRleHQ/XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiY2hhbmdlPyBcIiwgbmV3Tm9kZS50YWcsIG5vZGUudGFnKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChuZXdOb2RlLnRhZyAhPT0gbm9kZS50YWcpIHtcclxuICAgICAgICAgICAgICBjb25zdCBhc05vZGUgPSBuZXdOb2RlLmFzTm9kZSgpO1xyXG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKHsgYXNOb2RlIH0pO1xyXG5cclxuICAgICAgICAgICAgICBpZiAoYXNOb2RlKSB7XHJcbiAgICAgICAgICAgICAgICBub2RlLm5vZGUucmVwbGFjZVdpdGgoYXNOb2RlKTtcclxuICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgbm9kZS5ub2RlLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQobm9kZS5ub2RlKTtcclxuICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoY2hpbGQgIT09IG5ld05vZGUucHJvcHMuY29udGVudClcclxuICAgICAgICAgICAgICBub2RlLm5vZGUubm9kZVZhbHVlID0gbmV3Tm9kZS5wcm9wcy5jb250ZW50O1xyXG4gICAgICAgICAgICBuZXdOb2RlLm5vZGUgPSBub2RlLm5vZGU7XHJcbiAgICAgICAgICAgIC8vIGVsc2UgP1xyXG4gICAgICAgICAgfSxcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICByZXR1cm4gbm9kZTtcclxuICAgICAgfSksXHJcblxyXG4gICAgICBhc05vZGUoKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJhc1ZOb2RlLmFzTm9kZVwiLCB7IHRhZywgcHJvcHMsIHZOb2RlIH0pO1xyXG5cclxuICAgICAgICBjb25zdCBub2RlID0gYXNOb2RlKHVuZGVmaW5lZCwge30sIHZOb2RlLmNoaWxkcmVuKVswXTtcclxuICAgICAgICAvLyB2Tm9kZS5ub2RlID0gbm9kZTtcclxuICAgICAgICBjb25zb2xlLmxvZyh7IG5vZGUgfSk7XHJcblxyXG4gICAgICAgIHJldHVybiBub2RlO1xyXG4gICAgICB9LFxyXG4gICAgICAvLyB0byBsZXZlbFxyXG4gICAgICBkaWZmQW5kUGF0Y2gobmV3Vk5vZGU6IFZOb2RlKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJkaWZmQW5kUGF0Y2hcIik7XHJcblxyXG4gICAgICAgIHJldHVybiBkaWZmQW5kUGF0Y2godk5vZGUsIG5ld1ZOb2RlKTtcclxuICAgICAgfSxcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgY29uc29sZS5sb2coeyB2Tm9kZSB9KTtcclxuXHJcbiAgcmV0dXJuIHZOb2RlO1xyXG59XHJcblxyXG4vKipcclxuICogY29udmVydHMgcHJhZ21hIG9iamVjdCB0byBodG1sIHN0cmluZ1xyXG4gKiBqc3hzIGlzIGFsd2F5cyBjYWxsZWQgd2hlbiBlbGVtZW50IGhhcyBtb3JlIHRoYW4gb25lIGNoaWxkXHJcbiAqXHJcbiAqIEBwYXJhbSB7c3RyaW5nIHwgRnVuY3Rpb259IHRhZyAtIHRhZyBuYW1lIG9yIHRhZyBjbGFzc1xyXG4gKiBAcGFyYW0ge09iamVjdCB8IG51bGx9IHByb3BzIC0gcHJvcHMgZm9yIHRoZSB0YWdcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBqc3hzKFxyXG4gIHRhZzogc3RyaW5nIHwgRnVuY3Rpb24sXHJcbiAgcHJvcHM6IEpzeFByb3BzXHJcbik6IEpzeE5vZGVJbnRlcmZhY2Uge1xyXG4gIGxldCBub2RlOiBOb2RlO1xyXG4gIGxldCBqc3hOb2RlczogSnN4Tm9kZUludGVyZmFjZVtdO1xyXG4gIHByb3BzLmNoaWxkcmVuID0gcHJvcHMuY2hpbGRyZW4uZmxhdCgpOyAvLyBAVE9ETzogZG9jXHJcblxyXG4gIC8vIGlmIHJlZiBwcm9wIGlzIHByb3ZpZGVkLCBtZW1vcml6ZSBhbmQgcmVtb3ZlIGZyb20gdGhlIGh0bWwgZ2VuZXJhdGlvbiBwcm9jZXNzXHJcbiAgY29uc3QgcmVmOiBGdW5jdGlvbiB8IG51bGwgPVxyXG4gICAgdHlwZW9mIHByb3BzLnJlZiA9PT0gXCJmdW5jdGlvblwiID8gcHJvcHMucmVmIDogbnVsbDtcclxuICBpZiAocmVmKSBkZWxldGUgcHJvcHMucmVmO1xyXG5cclxuICBjb25zdCBpbnN0ID0gbmV3IChjbGFzcyBleHRlbmRzIEpzeE5vZGUgaW1wbGVtZW50cyBKc3hOb2RlSW50ZXJmYWNlIHtcclxuICAgIHRvU3RyaW5nKCkge1xyXG4gICAgICByZXR1cm4gYXNIdG1sU3RyaW5nKHRhZywgdGhpcy5wcm9wcyk7XHJcbiAgICB9XHJcblxyXG4gICAgYXNOb2RlKCkge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJkZXByZWNhdGVkIGpzeHNcIik7XHJcbiAgICAgIFtub2RlLCBqc3hOb2Rlc10gPSBhc05vZGUodGFnLCB0aGlzLnByb3BzKTtcclxuXHJcbiAgICAgIHJldHVybiBub2RlO1xyXG4gICAgfVxyXG4gICAgYXNWTm9kZSgpIHtcclxuICAgICAgcmV0dXJuIGFzVk5vZGUodGFnLCB0aGlzLnByb3BzKTtcclxuICAgIH1cclxuXHJcbiAgICBbX2NhbGxSZWZzXSgpIHtcclxuICAgICAgaWYgKHJlZiAmJiBub2RlKSByZWYobm9kZSk7XHJcblxyXG4gICAgICBpZiAodHlwZW9mIHRhZyA9PT0gXCJmdW5jdGlvblwiKSB7XHJcbiAgICAgICAganN4Tm9kZXMuZm9yRWFjaCgobm9kZUl0ZW0pID0+IG5vZGVJdGVtW19jYWxsUmVmc10oKSk7XHJcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5wcm9wcy5jaGlsZHJlbikge1xyXG4gICAgICAgIHRoaXMucHJvcHMuY2hpbGRyZW5cclxuICAgICAgICAgIC5mbGF0KClcclxuICAgICAgICAgIC5maWx0ZXIoXHJcbiAgICAgICAgICAgIChjaGlsZCkgPT4gY2hpbGQgaW5zdGFuY2VvZiBKc3hOb2RlIHx8IChjaGlsZCAmJiBjaGlsZC5hc05vZGUpXHJcbiAgICAgICAgICApXHJcbiAgICAgICAgICAuZm9yRWFjaCgoY2hpbGQpID0+IChjaGlsZCBhcyBKc3hOb2RlSW50ZXJmYWNlKVtfY2FsbFJlZnNdKCkpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSkocHJvcHMpO1xyXG5cclxuICBjb25zdCB2ID0gaW5zdC5hc1ZOb2RlKCk7XHJcbiAgcmV0dXJuIHY7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBjb252ZXJ0cyB0aGUgZnJhZ21lbnRzIG9iamVjdCB0byBub2Rlc1xyXG4gKlxyXG4gKiBAcGFyYW0ge09iamVjdH0gcHJvcHNcclxuICogQHBhcmFtIHtBcnJheX0gcHJvcHMuY2hpbGRyZW4gLSBjaGlsZCBlbGVtZW50cyBpbiB0aGUgZnJhZ21lbnRcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBGcmFnbWVudChwcm9wczogSnN4UHJvcHMpIHtcclxuICBjb25zdCBpbnN0ID0gbmV3IChjbGFzcyBleHRlbmRzIEpzeE5vZGUgaW1wbGVtZW50cyBKc3hOb2RlSW50ZXJmYWNlIHtcclxuICAgIHRvU3RyaW5nKCkge1xyXG4gICAgICByZXR1cm4gdGhpcy5wcm9wcy5jaGlsZHJlblxyXG4gICAgICAgIC5mbGF0KClcclxuICAgICAgICAuZmlsdGVyKHRydXRoeSlcclxuICAgICAgICAubWFwKChjaGlsZCkgPT5cclxuICAgICAgICAgIGNoaWxkIGluc3RhbmNlb2YgTm9kZVxyXG4gICAgICAgICAgICA/IGdldE91dGVySHRtbChjaGlsZClcclxuICAgICAgICAgICAgOiB0eXBlb2YgY2hpbGQgPT09IFwib2JqZWN0XCJcclxuICAgICAgICAgICAgPyBjaGlsZC50b1N0cmluZygpXHJcbiAgICAgICAgICAgIDogc2FuaXRpemUoY2hpbGQpXHJcbiAgICAgICAgKVxyXG4gICAgICAgIC5qb2luKFwiXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIGFzTm9kZSgpIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiZGVwcmVjYXRlZCBmcmFnbWVudFwiKTtcclxuICAgICAgY29uc3QgZnJhZ21lbnRzID0gdGhpcy5wcm9wcy5jaGlsZHJlblxyXG4gICAgICAgIC5mbGF0KClcclxuICAgICAgICAuZmlsdGVyKHRydXRoeSlcclxuICAgICAgICAubWFwKChpdGVtKSA9PlxyXG4gICAgICAgICAgaXRlbSBpbnN0YW5jZW9mIE5vZGVcclxuICAgICAgICAgICAgPyBpdGVtXHJcbiAgICAgICAgICAgIDogaXRlbSBpbnN0YW5jZW9mIEpzeE5vZGUgfHwgKGl0ZW0gJiYgaXRlbS5hc05vZGUpXHJcbiAgICAgICAgICAgID8gaXRlbS5hc05vZGUoKVxyXG4gICAgICAgICAgICA6IGl0ZW1cclxuICAgICAgICApO1xyXG5cclxuICAgICAgY29uc3QgZG9jdW1lbnRGcmFnbWVudCA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcclxuXHJcbiAgICAgIGRvY3VtZW50RnJhZ21lbnQuYXBwZW5kKC4uLmZyYWdtZW50cyk7XHJcbiAgICAgIHJldHVybiBkb2N1bWVudEZyYWdtZW50O1xyXG4gICAgfVxyXG5cclxuICAgIGFzVk5vZGUoKSB7XHJcbiAgICAgIHJldHVybiBhc1ZOb2RlKC8qXCJfX0ZyYWdtZW50X19cIiovIHVuZGVmaW5lZCwgdGhpcy5wcm9wcyk7XHJcbiAgICB9XHJcblxyXG4gICAgW19jYWxsUmVmc10oKSB7XHJcbiAgICAgIHRoaXMucHJvcHMuY2hpbGRyZW5cclxuICAgICAgICAuZmlsdGVyKChjaGlsZCkgPT4gY2hpbGQgaW5zdGFuY2VvZiBKc3hOb2RlIHx8IChjaGlsZCAmJiBjaGlsZC5hc05vZGUpKVxyXG4gICAgICAgIC5mb3JFYWNoKChjaGlsZCkgPT4gKGNoaWxkIGFzIEpzeE5vZGVJbnRlcmZhY2UpW19jYWxsUmVmc10oKSk7XHJcbiAgICB9XHJcbiAgfSkocHJvcHMpO1xyXG5cclxuICByZXR1cm4gaW5zdC5hc1ZOb2RlKCk7XHJcbn1cclxuXHJcbi8vIGpzeCBpcyBjYWxsZWQgd2hlbiB0aGUgZWxlbWVudCBoYXMgb25lIG9yIHplcm8gY2hpbGRyZW5cclxuZXhwb3J0IGZ1bmN0aW9uIGpzeChcclxuICB0YWc6IHN0cmluZyB8IEZ1bmN0aW9uLFxyXG4gIHByb3BzOiBBdHRyaWJ1dGVzICZcclxuICAgIFNwZWNpYWxBdHRyaWJ1dGVzICYgeyBjaGlsZHJlbj86IHN0cmluZyB8IE5vZGUgfCBKc3hOb2RlSW50ZXJmYWNlIH1cclxuKTogSnN4Tm9kZUludGVyZmFjZSB7XHJcbiAgLy8gQHRzLWlnbm9yZSAtIHdyYXBwaW5nIHRoZSBjaGlsZHJlbiBhcyBhcnJheSB0byByZS11c2UganN4cyBtZXRob2RcclxuICBwcm9wcy5jaGlsZHJlbiA9IHByb3BzLmhhc093blByb3BlcnR5KFwiY2hpbGRyZW5cIikgPyBbcHJvcHMuY2hpbGRyZW5dIDogW107XHJcblxyXG4gIHJldHVybiBqc3hzKHRhZywgKHByb3BzIGFzIHVua25vd24pIGFzIEpzeFByb3BzKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIHJlbmRlciB0aGUgZ2l2ZW4gbWFya3VwIGludG8gdGhlIGdpdmVuIGRvbSBub2RlXHJcbiAqXHJcbiAqIEBwYXJhbSB7c3RyaW5nfEhUTUxFbGVtZW50fEpTWH0gbWFya3VwIC0gaHRtbCBhcyBzdHJpbmcsIGh0bWwgZWxlbWVudCBvciBqc3ggdGVtcGxhdGVcclxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZG9tTm9kZSAtIGNvbnRhaW5lciBmb3IgdGhlIHRlbXBsYXRlIHRvIGJlIHJlbmRlcmVkIGludG9cclxuICogQHBhcmFtIHtib29sZWFufSBbYXBwZW5kPWZhbHNlXSAtIHNob3VsZCB0aGUgcHJvdmlkZWQgbWFya3VwIGJlIGFwcGVuZGVkIHRvIHRoZSBleGlzdGluZyBtYXJrdXAsIG9yIGRlZmF1bHQgcmVwbGFjZSBpdFxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHJlbmRlcihcclxuICBtYXJrdXA6IHN0cmluZyB8IEhUTUxFbGVtZW50IHwgSnN4Tm9kZUludGVyZmFjZSwgLy8gQFRPRE86IHNwZWNpZmljIHN1cHBvcnQgZm9yIFRlbXBsYXRlPyAoLmNvbnRlbnQuY2xvbmUpXHJcbiAgZG9tTm9kZTogSFRNTEVsZW1lbnQsXHJcbiAgYXBwZW5kOiBib29sZWFuID0gZmFsc2VcclxuKSB7XHJcbiAgQXJyYXkuZnJvbShkb2N1bWVudC5ib2R5LnF1ZXJ5U2VsZWN0b3JBbGwoXCIqXCIpKS5mb3JFYWNoKFxyXG4gICAgKGVsKSA9PiAoZWwuc3R5bGUuYmFja2dyb3VuZCA9IFwiI2NjZmZjY1wiKVxyXG4gICk7XHJcblxyXG4gIHJlZnNUb0NhbGwuc3BsaWNlKDApO1xyXG5cclxuICBjb25zdCBpc1JlUmVuZGVyID0gcmVuZGVyZWRWVHJlZXMuaGFzKGRvbU5vZGUpO1xyXG4gIGlmICghYXBwZW5kICYmICFpc1JlUmVuZGVyKSBkb21Ob2RlLmlubmVySFRNTCA9IFwiXCI7XHJcblxyXG4gIGlmICh0eXBlb2YgbWFya3VwID09PSBcInN0cmluZ1wiKSB7XHJcbiAgICBkb21Ob2RlLmluc2VydEFkamFjZW50SFRNTChcImJlZm9yZWVuZFwiLCBtYXJrdXApOyAvLyBzYW5pdGl6ZT9cclxuICB9IGVsc2UgaWYgKG1hcmt1cCBpbnN0YW5jZW9mIE5vZGUpIHtcclxuICAgIGRvbU5vZGUuaW5zZXJ0QWRqYWNlbnRFbGVtZW50KFwiYmVmb3JlZW5kXCIsIG1hcmt1cCk7XHJcbiAgfSBlbHNlIGlmIChtYXJrdXAgaW5zdGFuY2VvZiBKc3hOb2RlIHx8IChtYXJrdXAgJiYgbWFya3VwLmFzTm9kZSkpIHtcclxuICAgIHN2Z0NvbnRleHQgPSBmYWxzZTtcclxuXHJcbiAgICAvLyBSb290Vk5vZGVcclxuICAgIGNvbnN0IHZUcmVlOiBSb290Vk5vZGUgPSB7fSBhcyBhbnk7XHJcbiAgICBPYmplY3QuYXNzaWduKHZUcmVlLCB7XHJcbiAgICAgIHR5cGU6IFwiUm9vdFwiLFxyXG4gICAgICBub2RlOiBkb21Ob2RlLFxyXG4gICAgICB0YWc6IG51bGwsXHJcbiAgICAgIHBhcmVudDogbnVsbCxcclxuICAgICAgY2hpbGRyZW46IFttYXJrdXBdLCAvL1ttYXJrdXAuYXNWTm9kZSgpXSxcclxuICAgICAgYXNOb2RlKCkge1xyXG4gICAgICAgIHJldHVybiB2VHJlZS5jaGlsZHJlblswXS5hc05vZGUoKTtcclxuICAgICAgfSxcclxuICAgICAgdG9TdHJpbmcoKSB7XHJcbiAgICAgICAgcmV0dXJuIHZUcmVlLmNoaWxkcmVuWzBdLnRvU3RyaW5nKCk7XHJcbiAgICAgIH0sXHJcbiAgICB9KTtcclxuICAgIHZUcmVlLmNoaWxkcmVuWzBdLnBhcmVudCA9IHZUcmVlO1xyXG5cclxuICAgIGNvbnNvbGUubG9nKFwiIyMjIyMjIyMjIyNcXG5cIiwgXCJ2VHJlZTpcIiwgdlRyZWUpO1xyXG5cclxuICAgIGlmIChpc1JlUmVuZGVyKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwiaXMgcmUtcmVuZGVyXCIpO1xyXG4gICAgICBjb25zdCBvbGRWVHJlZSA9IHJlbmRlcmVkVlRyZWVzLmdldChkb21Ob2RlKTtcclxuXHJcbiAgICAgIGNvbnNvbGUubG9nKFwiIyMjIyMjIyMjIyNcXG5cIiwgeyBvbGRWVHJlZSwgbmV3VlRyZWU6IHZUcmVlIH0pO1xyXG5cclxuICAgICAgLy8gZGlmZlxyXG4gICAgICAvL29sZFZUcmVlLmRpZmZBbmRQYXRjaCh2VHJlZSk7XHJcbiAgICAgIGRpZmZBbmRQYXRjaChvbGRWVHJlZSEsIHZUcmVlKTtcclxuXHJcbiAgICAgIHJlbmRlcmVkVlRyZWVzLnNldChkb21Ob2RlLCB2VHJlZSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjb25zdCBjb250ZW50ID0gdlRyZWUuYXNOb2RlKCk7XHJcbiAgICAgIGRvbU5vZGUuYXBwZW5kKGNvbnRlbnQpO1xyXG4gICAgfVxyXG5cclxuICAgIHJlbmRlcmVkVlRyZWVzLnNldChkb21Ob2RlLCB2VHJlZSk7XHJcblxyXG4gICAgcmVmc1RvQ2FsbC5mb3JFYWNoKChjYikgPT4gY2IoKSk7XHJcblxyXG4gICAgLy8vL21hcmt1cFtfY2FsbFJlZnNdKCk7XHJcbiAgfSBlbHNlIHtcclxuICAgIHRocm93IG5ldyBFcnJvcihcInJlbmRlciBtZXRob2QgY2FsbGVkIHdpdGggd3JvbmcgYXJndW1lbnQocylcIik7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gcmF3SHRtbChjb250ZW50OiBzdHJpbmcpOiBKc3hOb2RlSW50ZXJmYWNlIHtcclxuICByZXR1cm4gbmV3IChjbGFzcyBleHRlbmRzIEpzeE5vZGUgaW1wbGVtZW50cyBKc3hOb2RlSW50ZXJmYWNlIHtcclxuICAgIHRvU3RyaW5nKCkge1xyXG4gICAgICByZXR1cm4gY29udGVudDtcclxuICAgIH1cclxuXHJcbiAgICBhc05vZGUoKSB7XHJcbiAgICAgIGNvbnN0IHRlbXBsYXRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRlbXBsYXRlXCIpO1xyXG4gICAgICB0ZW1wbGF0ZS5pbm5lckhUTUwgPSBjb250ZW50O1xyXG4gICAgICByZXR1cm4gdGVtcGxhdGUuY29udGVudDtcclxuICAgIH1cclxuICAgIGFzVk5vZGUoKSB7XHJcbiAgICAgIHJldHVybiB7fTtcclxuICAgIH1cclxuXHJcbiAgICBbX2NhbGxSZWZzXSgpIHtcclxuICAgICAgLy8gbm9vcFxyXG4gICAgfVxyXG4gIH0pKHt9IGFzIEpzeFByb3BzKTtcclxufVxyXG5cclxuLy8gdlRyZWVcclxuXHJcbi8vIGdvdGNoc2FzOlxyXG4vLyAtIHN0eWxlcyB3aWxsIG92ZXJyaWRlIChjb3VsZCBkbzogc2V0dGluZyBlYWNoIHJ1bGUgaW5kaXZpZHVhbGx5KVxyXG5cclxuaW50ZXJmYWNlIFZOb2RlSW50ZXJmYWNlIHtcclxuICB0b1N0cmluZygpOiBzdHJpbmc7XHJcbiAgYXNOb2RlKCk6IE5vZGU7XHJcbiAgcGFyZW50OiBWTm9kZSB8IG51bGw7XHJcbiAgY2hpbGRyZW46IFZOb2RlSW50ZXJmYWNlW107XHJcbiAgdHlwZTogc3RyaW5nO1xyXG4gIG5vZGU/OiBFbGVtZW50IHwgVGV4dDtcclxuICBnZXRDaGlsZHJlbldpdGhOb2RlcyhhbHdheXNBbGxvdzogVk5vZGVbXSk6IFZOb2RlW107XHJcbiAgcmVtb3ZlRnJvbURPTSgpOiB2b2lkO1xyXG4gIGRpZmZBbmRQYXRjaChuZXdOb2RlOiBWTm9kZUludGVyZmFjZSk6IHZvaWQ7XHJcbn1cclxuXHJcbmNsYXNzIEVsZW1lbnRWTm9kZTIgaW1wbGVtZW50cyBWTm9kZUludGVyZmFjZSB7XHJcbiAgdHlwZSA9IFwiRWxlbWVudFwiO1xyXG4gIG5vZGUgPSBudWxsIGFzIGFueTtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIHRhZzogc3RyaW5nLFxyXG4gICAgcHJpdmF0ZSBwcm9wczogUmVjb3JkPHN0cmluZywgYW55PixcclxuICAgIHB1YmxpYyBjaGlsZHJlbjogVk5vZGVbXVxyXG4gICkge31cclxuICB0b1N0cmluZygpIHtcclxuICAgIHJldHVybiBcIj9cIjtcclxuICB9XHJcbiAgYXNOb2RlKCkge1xyXG4gICAgcmV0dXJuIGFzTm9kZSh0aGlzLnRhZywgdGhpcy5wcm9wcywgdGhpcy5jaGlsZHJlbilbMF07XHJcbiAgfVxyXG4gIC8vIEBUT0RPOiBkb2Vzbid0IG5lZWQgdG8gYmUgaW4gVk5vZGUsXHJcbiAgLy8gYmFzaWNhbGx5IG9ubHkgdGhlIGNoZWNrIGlmIGl0IGhhcyAubm9kZSBvciBpdHRlciBvdmVyIGNoaWxkcmVuIChhcmUgVk5vZGVzISBub3QgTm9kZXMpXHJcbiAgZ2V0Q2hpbGRyZW5XaXRoTm9kZXMoYWx3YXlzQWxsb3c6IFZOb2RlW10pIHtcclxuICAgIHJldHVybiB0aGlzLmNoaWxkcmVuXHJcbiAgICAgIC5tYXAoKGNoaWxkTm9kZTogVk5vZGUpID0+IHtcclxuICAgICAgICBpZiAoYWx3YXlzQWxsb3cuaW5jbHVkZXMoY2hpbGROb2RlKSkgcmV0dXJuIGNoaWxkTm9kZTtcclxuICAgICAgICByZXR1cm4gY2hpbGROb2RlLm5vZGUgfHwgY2hpbGROb2RlLmdldENoaWxkcmVuV2l0aE5vZGVzKCk7XHJcbiAgICAgIH0pXHJcbiAgICAgIC5mbGF0KEluZmluaXR5KVxyXG4gICAgICAuZmlsdGVyKEJvb2xlYW4pIGFzIFZOb2RlW107XHJcbiAgfVxyXG4gIHJlbW92ZUZyb21ET00oKSB7XHJcbiAgICB0aGlzLm5vZGUucGFyZW50RWxlbWVudC5yZW1vdmVDaGlsZCh0aGlzLm5vZGUpO1xyXG4gIH1cclxuICBkaWZmQW5kUGF0Y2gobmV3Tm9kZTogRWxlbWVudFZOb2RlKSB7XHJcbiAgICBpZiAobmV3Tm9kZS50YWcgPT09IHRoaXMudGFnKSB7XHJcbiAgICAgIG5ld05vZGUubm9kZSA9IHRoaXMubm9kZTtcclxuICAgICAgLy8gICAgICBwYXRjaCBwcm9wcyxcclxuICAgICAgLy8gdXBkYXRlIHByb3BzIGZvcm0gbmV3IG5vZGVcclxuICAgICAgT2JqZWN0LmVudHJpZXMobmV3Tm9kZS5wcm9wcylcclxuICAgICAgICAuZmlsdGVyKChbaywgdl0pID0+IHRoaXMucHJvcHNba10gIT09IHYpXHJcbiAgICAgICAgLmZvckVhY2goKFtrZXksIHZhbHVlXSkgPT4ge1xyXG4gICAgICAgICAgaWYgKHZhbHVlID09PSB0cnVlKSBuZXdOb2RlLm5vZGUuc2V0QXR0cmlidXRlKGtleSwgXCJcIik7XHJcbiAgICAgICAgICBlbHNlIGlmICh2YWx1ZSA9PT0gbnVsbCB8fCB2YWx1ZSA9PT0gdW5kZWZpbmVkIHx8IHZhbHVlID09PSBmYWxzZSlcclxuICAgICAgICAgICAgbmV3Tm9kZS5ub2RlLnJlbW92ZUF0dHJpYnV0ZShrZXkpO1xyXG4gICAgICAgICAgZWxzZSBuZXdOb2RlLm5vZGUuc2V0QXR0cmlidXRlKGtleSwgdmFsdWUpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgLy8gcmVtb3ZlIG9sZCwgb2Jzb2xhdGUgYXR0cmlidXRlc1xyXG4gICAgICBPYmplY3QuZW50cmllcyh0aGlzLnByb3BzKVxyXG4gICAgICAgIC5maWx0ZXIoKFtrLCB2XSkgPT4gIW5ld05vZGUucHJvcHMuaGFzT3duUHJvcGVydHkoaykpXHJcbiAgICAgICAgLmZvckVhY2goKFtrZXksIHZhbHVlXSkgPT4ge1xyXG4gICAgICAgICAgdGhpcy5ub2RlLnJlbW92ZUF0dHJpYnV0ZShrZXkpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgLy8gY2hpbGRyZW4gPT4gaXRlciBhbmQgcGF0Y2hcclxuICAgICAgLy8gb2xkIGNoaWxkcmVuIGJlaW5nIG1vZGlmaWVkXHJcbiAgICAgIGRpZmZBbmRQYXRjaENoaWxkcmVuKHRoaXMsIG5ld05vZGUpO1xyXG4gICAgfVxyXG4gICAgLy8gdGFnIGhhcyBjaGFuZ2VkXHJcbiAgICBlbHNlIHtcclxuICAgICAgdGhpcy5ub2RlLnJlcGxhY2VXaXRoKG5ld05vZGUuYXNOb2RlKCkpO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuY2xhc3MgRnJhZ21lbnRWTm9kZSBpbXBsZW1lbnRzIFZOb2RlSW50ZXJmYWNlIHtcclxuICB0eXBlID0gXCJGcmFnbWVudFwiO1xyXG4gIC8vIHBhcmVudD8gQFRPRE86IHdoZXJlIHdpbGwgcGFyZW50IGJlIGFzaWduZWQ/XHJcblxyXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBjaGlsZHJlbjogVk5vZGVJbnRlcmZhY2VbXSkge31cclxuXHJcbiAgYXNOb2RlKCkge1xyXG4gICAgY29uc3Qgbm9kZSA9IGFzTm9kZSh1bmRlZmluZWQsIHt9LCB0aGlzLmNoaWxkcmVuKVswXTtcclxuICAgIC8vIHZOb2RlLm5vZGUgPSBub2RlO1xyXG4gICAgY29uc29sZS5sb2coeyBub2RlIH0pO1xyXG5cclxuICAgIHJldHVybiBub2RlO1xyXG4gIH1cclxuICAvLyB0byBsZXZlbFxyXG4gIGRpZmZBbmRQYXRjaChuZXdWTm9kZTogRnJhZ21lbnRWTm9kZSkge1xyXG4gICAgY29uc29sZS5sb2coXCJkaWZmQW5kUGF0Y2hcIik7XHJcblxyXG4gICAgcmV0dXJuIGRpZmZBbmRQYXRjaENoaWxkcmVuKHRoaXMsIG5ld1ZOb2RlKTtcclxuICB9XHJcblxyXG4gIHJlbW92ZUZyb21ET00oKSB7XHJcbiAgICBnZXRDaGlsZHJlbldpdGhOb2Rlcyh0aGlzKS5mb3JFYWNoKChub2RlKSA9PlxyXG4gICAgICBub2RlLm5vZGUhLnBhcmVudEVsZW1lbnQhLnJlbW92ZUNoaWxkKG5vZGUubm9kZSEpXHJcbiAgICApO1xyXG4gIH1cclxufVxyXG5cclxuY2xhc3MgVGV4dFZOb2RlMiBpbXBsZW1lbnRzIFZOb2RlSW50ZXJmYWNlIHtcclxuICB0eXBlID0gXCJUZXh0Tm9kZVwiO1xyXG4gIG5vZGU6IFRleHQgPSBudWxsIGFzIGFueTtcclxuICBjaGlsZHJlbiA9IFtdO1xyXG4gIHByb3BzOiB7IGNvbnRlbnQ6IGFueSB9O1xyXG4gIC8qKlxyXG4gICAqXHJcbiAgICovXHJcbiAgY29uc3RydWN0b3IocHJvcHMpIHtcclxuICAgIHRoaXMucHJvcHMgPSBwcm9wcy5jaGlsZDsgLy9AVE9ETzpcclxuICB9XHJcblxyXG4gIGFzTm9kZSgpIHtcclxuICAgIGNvbnN0IHRleHROb2RlID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUodGhpcy5wcm9wcy5jb250ZW50KTtcclxuICAgIHRoaXMubm9kZSA9IHRleHROb2RlO1xyXG4gICAgcmV0dXJuIHRleHROb2RlO1xyXG4gIH1cclxuXHJcbiAgZGlmZkFuZFBhdGNoKG5ld05vZGU6IFRleHRWTm9kZTIpIHtcclxuICAgIHRoaXMubm9kZS5ub2RlVmFsdWUgPSBuZXdOb2RlLnByb3BzLmNvbnRlbnQ7XHJcbiAgfVxyXG5cclxuICByZW1vdmVGcm9tRE9NKCkge1xyXG4gICAgdGhpcy5ub2RlLnBhcmVudEVsZW1lbnQhLnJlbW92ZUNoaWxkKHRoaXMubm9kZSk7XHJcbiAgfVxyXG59XHJcblxyXG5jbGFzcyBOdWxsVk5vZGUgaW1wbGVtZW50cyBWTm9kZUludGVyZmFjZSB7XHJcbiAgdHlwZSA9IFwiTnVsbFwiO1xyXG4gIGNoaWxkcmVuID0gW107XHJcbiAgLyoqXHJcbiAgICpcclxuICAgKi9cclxuICBjb25zdHJ1Y3RvcigpIHt9XHJcblxyXG4gIGFzTm9kZSgpIHtcclxuICAgIC8vcmV0dXJuIG51bGw7IC8vIHJldHVybiBlbXB0eSBmcmFnbWVudD9cclxuICAgIHJldHVybiBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XHJcbiAgfVxyXG5cclxuICBkaWZmQW5kUGF0Y2gobmV3Tm9kZTogTnVsbFZOb2RlKSB7XHJcbiAgICByZXR1cm47XHJcbiAgfVxyXG5cclxuICByZW1vdmVGcm9tRE9NKCkge1xyXG4gICAgcmV0dXJuO1xyXG4gIH1cclxuXHJcbiAgdG9TdHJpbmcoKSB7XHJcbiAgICByZXR1cm4gXCJcIjtcclxuICB9XHJcbn1cclxuXHJcbmNsYXNzIFJvb3RWTm9kZTIgaW1wbGVtZW50cyBWTm9kZUludGVyZmFjZSB7XHJcbiAgdHlwZSA9IFwiUm9vdFwiO1xyXG4gIHBhcmVudCA9IG51bGw7XHJcbiAgbm9kZTogRWxlbWVudDtcclxuICBjaGlsZHJlbjogVk5vZGVJbnRlcmZhY2VbXTtcclxuICAvKipcclxuICAgKlxyXG4gICAqL1xyXG4gIGNvbnN0cnVjdG9yKGNvbnRlbnQsIGRvbU5vZGU6IEVsZW1lbnQpIHtcclxuICAgIHRoaXMuY2hpbGRyZW4gPSBbY29udGVudC5hc1ZOb2RlKCldO1xyXG4gICAgdGhpcy5ub2RlID0gZG9tTm9kZTtcclxuICB9XHJcblxyXG4gIGFzTm9kZSgpIHtcclxuICAgIHJldHVybiB0aGlzLmNoaWxkcmVuWzBdLmFzTm9kZSgpO1xyXG4gIH1cclxuICB0b1N0cmluZygpIHtcclxuICAgIHJldHVybiB0aGlzLmNoaWxkcmVuWzBdLnRvU3RyaW5nKCk7XHJcbiAgfVxyXG5cclxuICBkaWZmQW5kUGF0Y2gobmV3Vk5vZGU6IFZOb2RlSW50ZXJmYWNlKSB7XHJcbiAgICBkaWZmQW5kUGF0Y2hDaGlsZHJlbih0aGlzLCBuZXdWTm9kZSk7XHJcbiAgfVxyXG5cclxuICByZW1vdmVGcm9tRE9NKCkge1xyXG4gICAgdGhpcy5ub2RlLnJlbW92ZSgpO1xyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgeyByZW5kZXIsIHJhd0h0bWwgfSBmcm9tIFwiLi9qc3gvanN4LXJ1bnRpbWVcIjtcclxuXHJcbmNvbnN0IHhzcyA9IFwiPGltZyBzcmM9eCBvbmVycm9yPVxcXCJhbGVydCgnWFNTIEF0dGFjaycpXFxcIj5cIjsgLy9cIjxzY3JpcHQ+YWxlcnQoJy0uLScpPC9zY3JpcHQ+XCI7XHJcblxyXG5mdW5jdGlvbiBSVEUocHJvcHM6IC8qeyB0eHQsIFwib24tY2xpY2tcIjogb25DbGljayB9Ki8ge1xyXG4gIHR4dDogc3RyaW5nO1xyXG4gIHJlZj86IEZ1bmN0aW9uO1xyXG59KSB7XHJcbiAgY29uc29sZS5sb2coXCJvbkNsaWNrXCIsIHByb3BzW1wib24tY2xpY2tcIl0pO1xyXG4gIHJldHVybiAoXHJcbiAgICA8cCByZWY9eyhlbDogSFRNTEVsZW1lbnQpID0+IGNvbnNvbGUubG9nKFwibXkgZGl2IDo6cmVmOjozLjJcIiwgZWwpfT5cclxuICAgICAge3Byb3BzLnR4dH1cclxuICAgIDwvcD5cclxuICApO1xyXG59XHJcblxyXG5mdW5jdGlvbiBCdXR0b24oe1xyXG4gIGNoaWxkcmVuLFxyXG4gIGRpc2FibGVkLFxyXG59OiB7XHJcbiAgY2hpbGRyZW46IGFueTtcclxuICBkaXNhYmxlZDogYm9vbGVhbjtcclxuICByZWY/OiBGdW5jdGlvbjtcclxufSkge1xyXG4gIHJldHVybiAoXHJcbiAgICA8YnV0dG9uXHJcbiAgICAgIGRpc2FibGVkPXtkaXNhYmxlZH1cclxuICAgICAgcmVmPXsoZWw6IEhUTUxFbGVtZW50KSA9PiBjb25zb2xlLmxvZyhcIm15IGJ1dHRvbiA6OnJlZjo6MVwiLCBlbCl9XHJcbiAgICA+XHJcbiAgICAgIDxzcGFuIHJlZj17KGVsOiBIVE1MRWxlbWVudCkgPT4gY29uc29sZS5sb2coXCJteSBhIDo6cmVmOjoyXCIsIGVsKX0+QnRuLXNwYW4tZmlyc3Q8L3NwYW4+XHJcbiAgICAgIHtjaGlsZHJlbn1cclxuICAgICAgPD5cclxuICAgICAgICA8c3BhbiByZWY9eyhlbDogSFRNTEVsZW1lbnQpID0+IGNvbnNvbGUubG9nKFwibXkgYSA6OnJlZjo6M1wiLCBlbCl9PlxyXG4gICAgICAgIEJ0bi1zcGFuLWVuZFxyXG4gICAgICAgIDwvc3Bhbj5cclxuICAgICAgPC8+XHJcbiAgICA8L2J1dHRvbj5cclxuICApO1xyXG59XHJcblxyXG5mdW5jdGlvbiByZWZsb2coZWw6IEhUTUxFbGVtZW50KSB7XHJcbiAgY29uc29sZS5sb2coXCJteSBpbm5lciBkaXY6OnJlZjo6OFwiLCBlbCk7XHJcbn1cclxuXHJcbi8qXHJcbmNvbnN0IG1hcmt1cCA9IChcclxuICA8PlxyXG4gICAgPGRpdlxyXG4gICAgICBjbGFzcz1cImZvb1wiXHJcbiAgICAgIHJlZj17KGVsOiBIVE1MRWxlbWVudCkgPT4gY29uc29sZS5sb2coXCJteSBkaXYgOjpyZWY6OjRcIiwgZWwpfVxyXG4gICAgLz5cclxuICAgIDxpbnB1dCBkaXNhYmxlZD17dHJ1ZX0gaGlkZGVuPXtmYWxzZX0gLz5cclxuICAgIDxCdXR0b25cclxuICAgICAgZGlzYWJsZWQ9e3RydWV9XHJcbiAgICAgIHJlZj17KGVsOiBIVE1MRWxlbWVudCkgPT4gY29uc29sZS5sb2coXCJteSBCVVRUT046OnJlZjo6NVwiLCBlbCl9XHJcbiAgICA+XHJcbiAgICAgIHRleHRcclxuICAgICAgPHBvcHVwLWluZm9cclxuICAgICAgICByZWY9eyhlbDogSFRNTEVsZW1lbnQpID0+IGNvbnNvbGUubG9nKFwic3BhbiBpbiBCVVRUT046OnJlZjo6NlwiLCBlbCl9XHJcbiAgICAgID5cclxuICAgICAgICBibGFcclxuICAgICAgPC9wb3B1cC1pbmZvPlxyXG4gICAgPC9CdXR0b24+XHJcbiAgICA8UlRFXHJcbiAgICAgIHR4dD1cImxlIHRleHRcIlxyXG4gICAgICByZWY9eyhlbDogSFRNTEVsZW1lbnQpID0+IGNvbnNvbGUubG9nKFwibXkgZGl2IDo6cmVmOjozLjFcIiwgZWwpfVxyXG4gICAgICBvbi1jbGljaz17KGU6IEhUTUxFbGVtZW50KSA9PiBjb25zb2xlLmxvZyhlKX1cclxuICAgIC8+XHJcbiAgICB7eHNzfVxyXG4gICAge3Jhd0h0bWwoYDxvbD48bGk+cmF3IGh0bWw8L2xpPjwvb2w+YCl9XHJcbiAgICA8ZGl2XHJcbiAgICAgIGNsYXNzPVwiYmFtXCJcclxuICAgICAgcmVmPXsoZWw6IEhUTUxFbGVtZW50KSA9PiBjb25zb2xlLmxvZyhcIm15IGRpdjo6cmVmOjo3XCIsIGVsKX1cclxuICAgID5cclxuICAgICAgPGRpdj5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwiYmFyXCIgb24tY2xpY2s9eyhlKSA9PiBjb25zb2xlLmxvZyhlKX0gcmVmPXtyZWZsb2d9PlxyXG4gICAgICAgICAgY2xpY2sgTUVcclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8ZGl2IHN0eWxlPXt7IG91dGxpbmU6IFwiMXB4IHNvbGlkIHJlZDtcIiB9fT5cclxuICAgICAgICAgIHtkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI29sZFwiKX1cclxuICAgICAgICAgIHtudWxsfVxyXG4gICAgICAgICAge1swLCAxXS5tYXAoKG4pID0+IChcclxuICAgICAgICAgICAgPHNwYW4+e259PC9zcGFuPlxyXG4gICAgICAgICAgKSl9XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgPC9kaXY+XHJcbiAgPC8+XHJcbik7XHJcblxyXG4qL1xyXG5cclxuLypcclxuY29uc3QgbWFya3VwID0gKFxyXG4gIDxCdXR0b24gZGlzYWJsZWQ9e3RydWV9PlxyXG4gICAgICA8Ym9sZCByZWY9e3JlZmxvZ30+LS1JTk5FUi0tPC9ib2xkPlxyXG4gIDwvQnV0dG9uPlxyXG4pOyovXHJcbi8qXHJcblxyXG5jb25zdCBtYXJrdXAgPSAoXHJcbiAgPGRpdiBjbGFzcz1cImZvb1wiIHJlZj17KGVsOiBIVE1MRWxlbWVudCkgPT4gY29uc29sZS5sb2coXCJteSBkaXY6OnJlZjo6XCIsIGVsKX0+XHJcbiAgICA8ZGl2PlxyXG4gICAgICA8ZGl2IGNsYXNzPVwiYmFyXCIgcmVmPXsoZWw6IEhUTUxFbGVtZW50KSA9PiBjb25zb2xlLmxvZyhcIm15IGlubmVyIGRpdjo6cmVmOjpcIiwgZWwpfSAvPlxyXG4gICAgPC9kaXY+XHJcbiAgICA8QnV0dG9uIGRpc2FibGVkPXt0cnVlfT48L0J1dHRvbj5cclxuICA8L2Rpdj5cclxuKTtcclxuKi9cclxuLypcclxuY29uc3QgbWFya3VwID0gKFxyXG4gIDxhPlxyXG4gICAgPGI+XHJcbiAgICAgIDxjIGNsYXNzPVwiYmFyXCIgcmVmPXtyZWZsb2d9IC8+XHJcbiAgICA8L2I+XHJcbiAgPC9hPlxyXG4pO1xyXG4qL1xyXG5cclxuZnVuY3Rpb24gU3Bhbih7IG1vZGUgfTogeyBtb2RlOiBhbnkgfSkge1xyXG4gIHJldHVybiBtb2RlID09PSAxID8gKFxyXG4gICAgPGRpdj5cclxuICAgICAgPHNwYW4gaWQ9XCJpbm5lclwiIG9sZD17dHJ1ZX0+XHJcbiAgICAgICAgU3Bhbi1Db21wLS1vbGRcclxuICAgICAgPC9zcGFuPlxyXG4gICAgICA8aDM+dG8gYmUgcmVtb3ZlZDwvaDM+XHJcbiAgICA8L2Rpdj5cclxuICApIDogKFxyXG4gICAgPGRpdj5cclxuICAgICAgPHAgaWQ9XCJpbm5lclwiIG5ldz17dHJ1ZX0+XHJcbiAgICAgICAgU3Bhbi1Db21wLS1uZXdzXHJcbiAgICAgIDwvcD5cclxuICAgIDwvZGl2PlxyXG4gICk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIENvbXAoeyBudW0gfSkge1xyXG4gIGlmIChudW0gPT09IDEpIHJldHVybiBudWxsO1xyXG4gIHJldHVybiAoXHJcbiAgICA8ZGl2PlxyXG4gICAgICA8cD5jb21wPC9wPlxyXG4gICAgPC9kaXY+XHJcbiAgKTtcclxufVxyXG5cclxuY29uc3QgbWFya3VwMSA9IChudW06IGFueSkgPT4gKFxyXG4gIDxkaXYgaWQ9XCJvdXRlclwiIGRhdGEtZm9vPVwiYmFyXCIgZGF0YS12YXI9e251bX0+XHJcbiAgICA8aDM+c2hvdWxkIGdldCAyIC06IDM8L2gzPlxyXG4gICAge251bSA9PT0gMSA/IChcclxuICAgICAgPHVsIGNsYXNzPVwidWwtY2xhc3NcIj5cclxuICAgICAgICA8bGk+VGV4dCAxIDwvbGk+XHJcbiAgICAgICAgPGxpPlRleHQgMiA8L2xpPlxyXG4gICAgICA8L3VsPlxyXG4gICAgKSA6IChcclxuICAgICAgPHVsIGNsYXNzPVwidWwtY2xhc3NcIj5cclxuICAgICAgICA8bGk+VGV4dCAzIDwvbGk+XHJcbiAgICAgICAgPGxpPlRleHQgMiA8L2xpPlxyXG4gICAgICAgIDxsaT5UZXh0IDEgPC9saT5cclxuICAgICAgPC91bD5cclxuICAgICl9XHJcbiAgICA8aDM+c2hvdWxkIGdldCAzIC06IDI8L2gzPlxyXG4gICAge251bSA9PT0gMSA/IChcclxuICAgICAgPHVsIGNsYXNzPVwidWwtY2xhc3NcIj5cclxuICAgICAgICA8bGk+VGV4dCAxIDwvbGk+XHJcbiAgICAgICAgPGxpPlRleHQgMiA8L2xpPlxyXG4gICAgICAgIDxsaT5UZXh0IDMgPC9saT5cclxuICAgICAgPC91bD5cclxuICAgICkgOiAoXHJcbiAgICAgIDx1bCBjbGFzcz1cInVsLWNsYXNzXCI+XHJcbiAgICAgICAgPGxpPlRleHQgMSA8L2xpPlxyXG4gICAgICAgIDxsaT5UZXh0IDIgPC9saT5cclxuICAgICAgPC91bD5cclxuICAgICl9XHJcbiAgICB7bnVtID09PSAxID8gbnVsbCA6IDxwPm5ldyByZW5kZXI8L3A+fVxyXG4gICAgPGRpdj5cclxuICAgICAgPHNwYW4+c3Bhbi1jb250ZW50PC9zcGFuPlxyXG4gICAgPC9kaXY+XHJcbiAgICA8U3BhbiBtb2RlPXtudW19IC8+XHJcbiAgICB7Lypkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI29sZFwiKSovfVxyXG4gICAgPD5GcmFnbWVudC1pdGVtPC8+XHJcbiAgICA8c3ZnXHJcbiAgICAgIHZpZXdCb3g9XCIwIDAgMzAwIDEwMFwiXHJcbiAgICAgIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIlxyXG4gICAgICBzdHJva2U9XCJyZWRcIlxyXG4gICAgICBmaWxsPVwiZ3JleVwiXHJcbiAgICA+XHJcbiAgICAgIDxjaXJjbGUgY3g9XCI1MFwiIGN5PVwiNTBcIiByPVwiNDBcIiAvPlxyXG4gICAgICA8Y2lyY2xlIGN4PVwiMTUwXCIgY3k9XCI1MFwiIHI9XCI0XCIgLz5cclxuXHJcbiAgICAgIDxzdmcgdmlld0JveD1cIjAgMCAxMCAxMFwiIHg9XCIyMDBcIiB3aWR0aD1cIjEwMFwiPlxyXG4gICAgICAgIDxjaXJjbGUgY3g9XCI1XCIgY3k9XCI1XCIgcj1cIjRcIiAvPlxyXG4gICAgICA8L3N2Zz5cclxuICAgIDwvc3ZnPlxyXG4gIDwvZGl2PlxyXG4pO1xyXG5cclxuZnVuY3Rpb24gbWFya3VwMihudW06IGFueSkge1xyXG4gIHJldHVybiAoXHJcbiAgICA8ZGl2IGlkPVwib3V0ZXJcIj5cclxuICAgICAgPD5cclxuICAgICAgICA8PlxyXG4gICAgICAgICAgPHA+bmVzdGVkIGZyYWdtZW50PC9wPlxyXG4gICAgICAgIDwvPlxyXG4gICAgICA8Lz5cclxuICAgICAgPGgxPnN0YXRpYzwvaDE+XHJcbiAgICAgIDxoMT5keW5hbWljIHZhbDoge251bX08L2gxPlxyXG4gICAgICB7bnVtID09PSAxID8gPGgxPm9sZDwvaDE+IDogZmFsc2V9XHJcbiAgICAgIHtudW0gPT09IDEgPyAoXHJcbiAgICAgICAgPD5cclxuICAgICAgICAgIDxoMT5mcmFnIG9sZDwvaDE+XHJcbiAgICAgICAgICA8c3Bhbj5mcmFnIHNwYW4gb2xkPC9zcGFuPlxyXG4gICAgICAgIDwvPlxyXG4gICAgICApIDogKFxyXG4gICAgICAgIDxoMT5mcmFnIG5ldzwvaDE+XHJcbiAgICAgICl9XHJcbiAgICAgIDxDb21wIG51bT17bnVtfSAvPlxyXG4gICAgPC9kaXY+XHJcbiAgKTtcclxufVxyXG5cclxuZnVuY3Rpb24gbWFya3VwMyhudW06IGFueSkge1xyXG4gIHJldHVybiBudW0gPT09IDEgPyAoXHJcbiAgICA8aDE+XHJcbiAgICAgIEEtTGluZSAxIC0ge251bX1cclxuICAgICAgPFNwYW4gbW9kZT17bnVtfSAvPlxyXG4gICAgICA8QnV0dG9uXHJcbiAgICAgICAgZGlzYWJsZWQ9e3RydWV9XHJcbiAgICAgICAgcmVmPXsoZWw6IEhUTUxFbGVtZW50KSA9PiBjb25zb2xlLmxvZyhcIm15IEJVVFRPTjo6cmVmOjo1XCIsIGVsKX1cclxuICAgICAgPlxyXG4gICAgICAgIHRleHRcclxuICAgICAgICA8cG9wdXAtaW5mb1xyXG4gICAgICAgICAgcmVmPXsoZWw6IEhUTUxFbGVtZW50KSA9PiBjb25zb2xlLmxvZyhcInNwYW4gaW4gQlVUVE9OOjpyZWY6OjZcIiwgZWwpfVxyXG4gICAgICAgID5cclxuICAgICAgICAgIGJsYVxyXG4gICAgICAgIDwvcG9wdXAtaW5mbz5cclxuICAgICAgICA8cD5pbm5lciBwIHtudW19PC9wPlxyXG4gICAgICA8L0J1dHRvbj5cclxuICAgICAgQS1MaW5lIDNcclxuICAgICAgPD5cclxuICAgICAgICA8cD5BIEZyYWcgbGluZSAxPC9wPlxyXG4gICAgICAgIDxwPkEgRnJhZyBsaW5lIDI8L3A+XHJcbiAgICAgICAgPHA+QSBGcmFnIGxpbmUgMzwvcD5cclxuICAgICAgICA8cD5BIEZyYWcgbGluZSA0PC9wPlxyXG4gICAgICAgIDxzdmdcclxuICAgICAgICAgIHZpZXdCb3g9XCIwIDAgMzAwIDEwMFwiXHJcbiAgICAgICAgICB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCJcclxuICAgICAgICAgIHN0cm9rZT1cInJlZFwiXHJcbiAgICAgICAgICBmaWxsPVwiZ3JleVwiXHJcbiAgICAgICAgPlxyXG4gICAgICAgICAgPGNpcmNsZSBjeD1cIjUwXCIgY3k9XCI1MFwiIHI9XCI0MFwiIC8+XHJcbiAgICAgICAgICA8Y2lyY2xlIGN4PVwiMTUwXCIgY3k9XCI1MFwiIHI9XCI0XCIgLz5cclxuXHJcbiAgICAgICAgICA8c3ZnIHZpZXdCb3g9XCIwIDAgMTAgMTBcIiB4PVwiMjAwXCIgd2lkdGg9XCIxMDBcIj5cclxuICAgICAgICAgICAgPGNpcmNsZSBjeD1cIjVcIiBjeT1cIjVcIiByPVwiNFwiIC8+XHJcbiAgICAgICAgICA8L3N2Zz5cclxuICAgICAgICA8L3N2Zz5cclxuICAgICAgPC8+XHJcbiAgICAgIHtudWxsfVxyXG4gICAgPC9oMT5cclxuICApIDogKFxyXG4gICAgPGgxIGNsYXNzPVwiYVwiPlxyXG4gICAgICBCIExpbmUgMSAtIHtudW19XHJcbiAgICAgIDxTcGFuIG1vZGU9e251bX0gLz5cclxuICAgICAgPEJ1dHRvblxyXG4gICAgICAgIGRpc2FibGVkPXt0cnVlfVxyXG4gICAgICAgIHJlZj17KGVsOiBIVE1MRWxlbWVudCkgPT4gY29uc29sZS5sb2coXCJteSBCVVRUT046OnJlZjo6NVwiLCBlbCl9XHJcbiAgICAgID5cclxuICAgICAgICB0ZXh0XHJcbiAgICAgICAgPHBvcHVwLWluZm9cclxuICAgICAgICAgIHJlZj17KGVsOiBIVE1MRWxlbWVudCkgPT4gY29uc29sZS5sb2coXCJzcGFuIGluIEJVVFRPTjo6cmVmOjo2XCIsIGVsKX1cclxuICAgICAgICA+XHJcbiAgICAgICAgICBibGFcclxuICAgICAgICA8L3BvcHVwLWluZm8+XHJcbiAgICAgICAgPHA+e251bX08L3A+XHJcbiAgICAgIDwvQnV0dG9uPlxyXG4gICAgICA8PlxyXG4gICAgICAgIHtmYWxzZX1cclxuICAgICAgICB7bnVsbH1cclxuICAgICAgICB7dW5kZWZpbmVkfVxyXG4gICAgICA8Lz5cclxuICAgICAgPD5cclxuICAgICAgICA8cD5CIEZyYWcgbGluZSAxPC9wPlxyXG4gICAgICAgIDxwPkIgRnJhZyBsaW5lIDI8L3A+XHJcbiAgICAgICAge3VuZGVmaW5lZH1cclxuICAgICAgICA8cD5CIEZyYWcgbGluZSAzKDQpPC9wPlxyXG4gICAgICAgIDxzdmdcclxuICAgICAgICAgIHZpZXdCb3g9XCIwIDAgMzAwIDEwMFwiXHJcbiAgICAgICAgICB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCJcclxuICAgICAgICAgIHN0cm9rZT1cInJlZFwiXHJcbiAgICAgICAgICBmaWxsPVwiZ3JleVwiXHJcbiAgICAgICAgPlxyXG4gICAgICAgICAgPGNpcmNsZSBjeD1cIjUwXCIgY3k9XCI1MFwiIHI9XCI0MFwiIC8+XHJcbiAgICAgICAgICA8Y2lyY2xlIGN4PVwiMTUwXCIgY3k9XCI1MFwiIHI9XCI0XCIgLz5cclxuXHJcbiAgICAgICAgICA8c3ZnIHZpZXdCb3g9XCIwIDAgMTAgMTBcIiB4PVwiMjAwXCIgd2lkdGg9XCIxMDBcIj5cclxuICAgICAgICAgICAgPGNpcmNsZSBjeD1cIjVcIiBjeT1cIjVcIiByPVwiNlwiIC8+XHJcbiAgICAgICAgICA8L3N2Zz5cclxuICAgICAgICA8L3N2Zz5cclxuICAgICAgICA8cD5CIEZyYWcgbGluZSA0KDYpPC9wPlxyXG4gICAgICA8Lz5cclxuICAgIDwvaDE+XHJcbiAgKTtcclxufVxyXG5jb25zdCBvYmogPSB7IGE6IDEgfTtcclxuXHJcbmZ1bmN0aW9uIG1hcmt1cDQobnVtOiBhbnkpIHtcclxuICBvYmouYSA9IG51bTtcclxuICByZXR1cm4gbnVtID09PSAxID8gKFxyXG4gICAgPGgxIG9iaj17b2JqfSBpZD17b2JqLmF9PlxyXG4gICAgICBvbGQtSGVhZGxpbmUge251bX1cclxuICAgIDwvaDE+XHJcbiAgKSA6IChcclxuICAgIDxoMSBvYmo9e29ian0gY2xhc3M9XCJhXCIgaWQ9e29iai5hfT5cclxuICAgICAgbmV3LUhlYWRsaW5lIHtudW19XHJcbiAgICA8L2gxPlxyXG4gICk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIG1hcmt1cChudW06IGFueSkge1xyXG4gIHJldHVybiBudW0gPT09IDEgPyAoXHJcbiAgICA8ZGl2PlxyXG4gICAgICA8PlxyXG4gICAgICAgIDxwPmZyYWcgLSBJPC9wPlxyXG4gICAgICAgIDxiPiBmcmFnIC0gSUk8L2I+XHJcbiAgICAgIDwvPlxyXG4gICAgPC9kaXY+XHJcbiAgKSA6IChcclxuICAgIDxoMSBjbGFzcz1cImFcIj5cclxuICAgICAge1wibmV3LUhlYWRsaW5lXCJ9IHtudW19XHJcbiAgICA8L2gxPlxyXG4gICk7XHJcbn1cclxuXHJcbi8vY29uc29sZS5sb2cobWFya3VwKTtcclxuLy93aW5kb3cubWFya3VwID0gbWFya3VwO1xyXG5cclxuY2xhc3MgUG9wVXBJbmZvIGV4dGVuZHMgSFRNTEVsZW1lbnQge1xyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgLy8gQWx3YXlzIGNhbGwgc3VwZXIgZmlyc3QgaW4gY29uc3RydWN0b3JcclxuICAgIHN1cGVyKCk7XHJcblxyXG4gICAgLy8gd3JpdGUgZWxlbWVudCBmdW5jdGlvbmFsaXR5IGluIGhlcmVcclxuXHJcbiAgICBjb25zb2xlLmxvZyhcIiMjIyMjIyMjIyMjIyMjIyMjY3RvciBDRVwiKTtcclxuICB9XHJcblxyXG4gIGNvbm5lY3RlZENhbGxiYWNrKCkge1xyXG4gICAgY29uc29sZS5sb2coXCIjIyMjIyMjIyMjIyMjIyMjI0N1c3RvbSBzcXVhcmUgZWxlbWVudCBhZGRlZCB0byBwYWdlLlwiKTtcclxuICB9XHJcbn1cclxuXHJcbmN1c3RvbUVsZW1lbnRzLmRlZmluZShcInBvcHVwLWluZm9cIiwgUG9wVXBJbmZvKTtcclxuXHJcbi8vZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNvbGRcIikhLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBjb25zb2xlLmxvZyk7XHJcblxyXG4vL2RvY3VtZW50LmJvZHkuaW5uZXJIVE1MID0gbWFya3VwO1xyXG5yZW5kZXIobWFya3VwMygxKSwgZG9jdW1lbnQuYm9keSk7XHJcbi8vZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJvdXRlclwiKT8uc2V0QXR0cmlidXRlKFwiZGF0YS1mb29cIiwgXCJtb2RcIik7XHJcblxyXG4vL2RvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaW5uZXJcIik/LnNldEF0dHJpYnV0ZShcImRhdGEtZm9vXCIsIFwibW9kXCIpO1xyXG4vL3JlbmRlcihtYXJrdXAoMiksIGRvY3VtZW50LmJvZHkpO1xyXG4vL3JlbmRlcihtYXJrdXAsIGRvY3VtZW50LmJvZHksIHRydWUpO1xyXG5cclxud2luZG93LnJlUmVuZGVyMSA9ICgpID0+IHJlbmRlcihtYXJrdXAzKDEpLCBkb2N1bWVudC5ib2R5KTtcclxud2luZG93LnJlUmVuZGVyMiA9ICgpID0+IHJlbmRlcihtYXJrdXAzKDIpLCBkb2N1bWVudC5ib2R5KTtcclxuXHJcbmNvbnNvbGUubG9nKFwiMTIzNDVcIik7XHJcbiJdLCJzb3VyY2VSb290IjoiIn0=