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
    prevSiblingNode: prevSibling && prevSibling.node,
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
  console.log("asVNode:", {
    tag,
    props
  });

  if (typeof tag === "function") {
    let result = tag(props);

    if (result instanceof JsxNode || result && result.asNode) {
      //console.warn("asVNode with JsxNode");
      return result;
    } // big @TODO:


    if (result instanceof Node) {
      return new LiveNodeVNode(result);
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
    } // null jsx node


    if (!truthy(result)) {
      return new NullVNode();
    }

    return new TextVNode2(props);
  }

  const {
    children,
    ...attr
  } = props;
  const vNode = {};

  if (tag) {
    return new ElementVNode2(tag, attr, children); // or simply pass cildren with props
  } else if (!truthy(attr)) {
    const vNode = new NullVNode(); // @TODO: parent

    vNode.parent = this;
    return vNode;
  } // no tag (Fragment and Null?)
  else if (children) {
      console.log("Fragment VNode");
      return new FragmentVNode(children);
    } // else? // @TODO:?

}

function asVNode2(tag, props) {
  console.log("asVNode:", {
    tag,
    props
  });

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
    } // null jsx node


    if (!truthy(result)) {
      return new NullVNode({
        parent: null
      });
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

    return new TextVNode2(props);
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
    return new ElementVNode2(tag, attr, children); // or simply pass cildren with props

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
  } else if (!truthy(attr)) {
    return new NullVNode(); // @TODO: parent
  } // no tag (Fragment and Null?)
  else if (children) {
      console.log("Fragment VNode");
      return new FragmentVNode(children);
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

          console.log("@@ map 2", {
            child
          });

          if (child === null || child === false || child === undefined) {
            const n = new NullVNode(this); // n.paremt =

            return n;
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
  /*
  const inst = new (class extends JsxNode implements JsxNodeInterface {
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
        jsxNodes.forEach((nodeItem) => nodeItem[_callRefs]());
      } else if (this.props.children) {
        this.props.children
          .flat()
          .filter(
            (child) => child instanceof JsxNode || (child && child.asNode)
          )
          .forEach((child) => (child as JsxNodeInterface)[_callRefs]());
      }
    }
  })(props);
    const v = inst.asVNode();*/

  return asVNode(tag, props);
  return v;
}
/**
 * converts the fragments object to nodes
 *
 * @param {Object} props
 * @param {Array} props.children - child elements in the fragment
 */

function Fragment(props) {
  /*const inst = new (class extends JsxNode implements JsxNodeInterface {
    toString() {
      return this.props.children
        .flat()
        .filter(truthy)
        .map((child) =>
          child instanceof Node
            ? getOuterHtml(child)
            : typeof child === "object"
            ? child.toString()
            : sanitize(child)
        )
        .join("");
    }
      asNode() {
      throw new Error("deprecated fragment");
      const fragments = this.props.children
        .flat()
        .filter(truthy)
        .map((item) =>
          item instanceof Node
            ? item
            : item instanceof JsxNode || (item && item.asNode)
            ? item.asNode()
            : item
        );
        const documentFragment = document.createDocumentFragment();
        documentFragment.append(...fragments);
      return documentFragment;
    }
      asVNode() {
      return asVNode(/*"__Fragment__"* / undefined, this.props);
    }
      [_callRefs]() {
      this.props.children
        .filter((child) => child instanceof JsxNode || (child && child.asNode))
        .forEach((child) => (child as JsxNodeInterface)[_callRefs]());
    }
  })(props);*/
  //return inst.asVNode();
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
  } else if (markup instanceof JsxNode || markup && markup.asNode) {
    svgContext = false; // RootVNode

    /*const vTree: RootVNode = {} as any;
    Object.assign(vTree, {
      type: "Root",
      node: domNode,
      tag: null,
      parent: null,
      children: [markup], //[markup.asVNode()],
      asNode() {
        return vTree.children[0].asNode();
      },
      toString() {
        return vTree.children[0].toString();
      },
    });
    vTree.children[0].parent  = vTree;*/

    const vTree = new RootVNode2(markup, domNode);
    console.log("###########\n", "vTree:", vTree);

    if (isReRender) {
      console.log("is re-render");
      const oldVTree = renderedVTrees.get(domNode);
      console.log("###########\n", {
        oldVTree,
        newVTree: vTree
      }); // diff

      oldVTree.diffAndPatch(vTree); //diffAndPatch(oldVTree!, vTree);

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
    this.type = "Element";
    this.node = null;
    this.children = children.flat().map(child => {
      if (!child) console.log("child nullish", {
        child,
        vNode: this
      });

      if (child instanceof JsxNode || child && child.asNode) {
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

      console.log(":::", {
        child
      });
      const n = new TextVNode2({
        child
      }); // asVnode

      n.parent = this;
      return n;
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

class FragmentVNode {
  // parent? @TODO: where will parent be asigned?
  constructor(children) {
    this.type = "Fragment";
    this.children = children.flat().map(child => {
      if (child instanceof JsxNode || child && child.asNode) {
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
        const childVNode = new NullVNode(); // n.paremt =

        childVNode.parent = this;
        return childVNode;
      }

      console.log(":::", {
        child
      });
      const tn = new TextVNode2({
        child
      });
      tn.parent = this;
      return tn;
    });
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
  constructor({
    child
  }) {
    this.type = "TextNode";
    this.node = null;
    this.children = [];
    this.props = void 0;
    this.props = {
      content: child
    }; //@TODO:
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

class LiveNodeVNode {
  /**
   *
   */
  constructor(node) {
    this.type = "Node";
    this.children = [];
    this.node = node;
  }

  asNode() {
    return this.node;
  }

  diffAndPatch(newNode) {
    if (newNode.node !== node) {
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

class RootVNode2 {
  /**
   *
   */
  constructor(content, domNode) {
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
    children: [Object(C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(NL, {}), "A-Line 1 - ", num, Object(C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(Span, {
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

function Comp2() {
  return Object(C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])(C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["Fragment"], {
    children: [Object(C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(Comp3, {}), document.querySelector("#old")]
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vanN4L2pzeC1ydW50aW1lLnRzIiwid2VicGFjazovLy8uL21haW4udHN4Il0sIm5hbWVzIjpbInJlbmRlcmVkVlRyZWVzIiwiV2Vha01hcCIsInJlZnNUb0NhbGwiLCJKc3hOb2RlIiwiY29uc3RydWN0b3IiLCJwcm9wcyIsImdldFBhcmVudEVsZW1lbnROb2RlIiwidk5vZGUiLCJjb25zb2xlIiwibG9nIiwicGFyZW50Iiwibm9kZSIsImdldENoaWxkcmVuV2l0aE5vZGVzIiwiYWx3YXlzQWxsb3ciLCJjaGlsZHJlbiIsIm1hcCIsImNoaWxkTm9kZSIsImZsYXQiLCJJbmZpbml0eSIsImZpbHRlciIsIkJvb2xlYW4iLCJnZXRQYXJlbnRBbmROZXh0U2libGluZyIsInBhcmVudFdpdGhFbGVtZW50Iiwic2libGluZ3MiLCJwcmV2U2libGluZyIsImluZGV4T2YiLCJuZXh0U2libGluZ05vZGUiLCJuZXh0U2libGluZyIsInByZXZTaWJsaW5nTm9kZSIsIl9jYWxsUmVmcyIsIlN5bWJvbCIsInN2Z0NvbnRleHQiLCJ0cnV0aHkiLCJ2YWx1ZSIsInVuZGVmaW5lZCIsInNhbml0aXplIiwidGV4dCIsImRpdiIsImRvY3VtZW50IiwiY3JlYXRlRWxlbWVudCIsImlubmVyVGV4dCIsImlubmVySFRNTCIsImdldE91dGVySHRtbCIsImVsZW1lbnQiLCJFbGVtZW50Iiwib3V0ZXJIVE1MIiwiVGV4dCIsIndob2xlVGV4dCIsIkRvY3VtZW50RnJhZ21lbnQiLCJBcnJheSIsImZyb20iLCJjaGlsZE5vZGVzIiwiZWwiLCJqb2luIiwid2FybiIsImFzSHRtbFN0cmluZyIsInRhZyIsInRvU3RyaW5nIiwiYXR0cnMiLCJhdHRyaWJ1dGVzIiwiT2JqZWN0IiwiZW50cmllcyIsImtleSIsInYiLCJrIiwiaXNBcnJheSIsImNvbnRlbnQiLCJjaGlsZCIsIk5vZGUiLCJhc05vZGUiLCJmcmFnbWVudHMiLCJpdGVtIiwiZG9jdW1lbnRGcmFnbWVudCIsImNyZWF0ZURvY3VtZW50RnJhZ21lbnQiLCJhcHBlbmQiLCJlcnJvciIsInJlc3VsdCIsImpzeE5vZGVzIiwiZm9yRWFjaCIsInN0YXJ0c1dpdGgiLCJldmVudCIsInJlcGxhY2UiLCJhZGRFdmVudExpc3RlbmVyIiwic3ZnQ29udGV4dFNldCIsImNyZWF0ZUVsZW1lbnROUyIsIl9rZXkiLCJzZXRBdHRyaWJ1dGUiLCJTdHJpbmciLCJjaGlsZEpzeE5vZGVzIiwicmVtb3ZlSXRlbSIsInR5cGUiLCJwYXJlbnRFbGVtZW50IiwicmVtb3ZlQ2hpbGQiLCJpbnNlcnROZXdJdGVtIiwibmV3Tm9kZSIsImluc2VydEJlZm9yZSIsImRpZmZBbmRQYXRjaCIsIm9sZE5vZGUiLCJub2RlVmFsdWUiLCJyZW1vdmVBdHRyaWJ1dGUiLCJoYXNPd25Qcm9wZXJ0eSIsImRpZmZBbmRQYXRjaENoaWxkcmVuIiwicmVwbGFjZVdpdGgiLCJvbGRDaGlsZCIsIml4IiwibmV3Q2hpbGQiLCJuZXdJdGVtcyIsInNsaWNlIiwibGVuZ3RoIiwiYXNWTm9kZSIsIkxpdmVOb2RlVk5vZGUiLCJOdWxsVk5vZGUiLCJUZXh0Vk5vZGUyIiwiYXR0ciIsIkVsZW1lbnRWTm9kZTIiLCJGcmFnbWVudFZOb2RlIiwiYXNWTm9kZTIiLCJmb29Ob2RlIiwiYXNzaWduIiwidGFnMiIsInRhZzEiLCJ0ZXh0Tm9kZSIsImNyZWF0ZVRleHROb2RlIiwiY2hpbGRWTm9kZSIsIm4iLCJuZXdOb2RlSW5kZXgiLCJyZXZlcnNlIiwic2libGluZ0JlZm9yZSIsImZpbmQiLCJpbnNlcnRBZGphY2VudEVsZW1lbnQiLCJwYXJlbnROb2RlIiwibmV3Vk5vZGUiLCJpIiwianN4cyIsInJlZiIsIkZyYWdtZW50IiwianN4IiwicmVuZGVyIiwibWFya3VwIiwiZG9tTm9kZSIsImJvZHkiLCJxdWVyeVNlbGVjdG9yQWxsIiwic3R5bGUiLCJiYWNrZ3JvdW5kIiwic3BsaWNlIiwiaXNSZVJlbmRlciIsImhhcyIsImluc2VydEFkamFjZW50SFRNTCIsInZUcmVlIiwiUm9vdFZOb2RlMiIsIm9sZFZUcmVlIiwiZ2V0IiwibmV3VlRyZWUiLCJzZXQiLCJjYiIsIkVycm9yIiwicmF3SHRtbCIsInRlbXBsYXRlIiwiaW5jbHVkZXMiLCJyZW1vdmVGcm9tRE9NIiwidG4iLCJyZW1vdmUiLCJ4c3MiLCJSVEUiLCJ0eHQiLCJCdXR0b24iLCJkaXNhYmxlZCIsInJlZmxvZyIsIlNwYW4iLCJtb2RlIiwiQ29tcCIsIm51bSIsIm1hcmt1cDEiLCJtYXJrdXAyIiwiTkwiLCJtYXJrdXAzIiwib2JqIiwiYSIsIm1hcmt1cDQiLCJQb3BVcEluZm8iLCJIVE1MRWxlbWVudCIsImN1c3RvbUVsZW1lbnRzIiwiZGVmaW5lIiwiQ29tcDIiLCJxdWVyeVNlbGVjdG9yIiwiQ29tcDMiLCJ3aW5kb3ciLCJyZVJlbmRlcjEiLCJnZXRFbGVtZW50QnlJZCIsInJlUmVuZGVyMiIsInJlUmVuZGVyMyJdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EseUNBQXlDLGlDQUFpQztRQUMxRSxnSEFBZ0gsbUJBQW1CLEVBQUU7UUFDckk7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBCLEVBQUU7UUFDdkQsaUNBQWlDLGVBQWU7UUFDaEQ7UUFDQTtRQUNBOztRQUVBO1FBQ0Esc0RBQXNELCtEQUErRDs7UUFFckg7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QUNELFNBQVNDLEtBQVQsR0FBaUI7QUFDZixTQUFPO0FBQUE7QUFBQSxJQUFQO0FBQ0Q7O0FBRURDLE1BQU0sQ0FBQ0MsU0FBUCxHQUFtQjtBQUFBLFNBQ2pCbEQsbUZBQU0sQ0FBQ3NDLE9BQU8sQ0FBQyxDQUFELENBQVIsRUFBYXpJLFFBQVEsQ0FBQ3NKLGNBQVQsQ0FBd0IsV0FBeEIsQ0FBYixDQURXO0FBQUEsQ0FBbkI7O0FBRUFGLE1BQU0sQ0FBQ0csU0FBUCxHQUFtQjtBQUFBLFNBQ2pCcEQsbUZBQU0sQ0FBQ3NDLE9BQU8sQ0FBQyxDQUFELENBQVIsRUFBYXpJLFFBQVEsQ0FBQ3NKLGNBQVQsQ0FBd0IsV0FBeEIsQ0FBYixDQURXO0FBQUEsQ0FBbkI7O0FBRUFGLE1BQU0sQ0FBQ0ksU0FBUCxHQUFtQjtBQUFBLFNBQ2pCckQsbUZBQU0sRUFDSjtBQUNBLG1GQUFDLEtBQUQsS0FGSSxFQUdKbkcsUUFBUSxDQUFDc0osY0FBVCxDQUF3QixXQUF4QixDQUhJLENBRFc7QUFBQSxDQUFuQjs7QUFPQXBMLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLE9BQVosRSIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDApO1xuIiwiY29uc3QgcmVuZGVyZWRWVHJlZXMgPSBuZXcgV2Vha01hcDxIVE1MRWxlbWVudCwgUm9vdFZOb2RlPigpO1xyXG5jb25zdCByZWZzVG9DYWxsOiBGdW5jdGlvbltdID0gW107XHJcbi8qKlxyXG4gKiBwcm92aWRlcyBmdW5jdGlvbnMgbmVlZGVkIGJ5IGJhYmVsIGZvciBhIGN1c3RvbSBwcmFnbWFcclxuICogdG8gcmVuZGVyIHBhcnNlZCBqc3ggY29kZSB0byBodG1sXHJcbiAqL1xyXG5cclxuLy8gcHJvcHMgd2hpY2ggd2lsbCBiZSByZW5kZXJlZCBhcyBhdHRyaWJ1dGVzXHJcbi8vIEZ1bmN0aW9ucyB3aWxsIGJlIHVzZWQgZm9yIGV2ZW50IGxpc3RlbmVycy4gKHdpdGggYXR0cmlidXRlIG5hbWUgc3RhcnRpbmcgd2l0aCAnb24tJylcclxudHlwZSBBdHRyaWJ1dGVzID0geyBba2V5OiBzdHJpbmddOiBzdHJpbmcgfCBib29sZWFuIHwgbnVtYmVyIHwgRnVuY3Rpb24gfTtcclxuXHJcbi8vIGFkZGl0aW9uYWwgYXR0cmlidXRlcyB3aGljaCBjYW4gaGF2ZSBhZGRpdGlvbmFsIHNlcmlhbGl6YXRpb24gYmVmb3JlIHJlbmRlcmluZyBhcyBhdHRyaWJ1dGVzXHJcbnR5cGUgU3BlY2lhbEF0dHJpYnV0ZXMgPSB7XHJcbiAgY2xhc3M/OiBzdHJpbmcgfCBzdHJpbmdbXTtcclxuICBzdHlsZT86IHN0cmluZyB8IHsgW2tleTogc3RyaW5nXTogc3RyaW5nIH07XHJcbiAgcmVmPzogRnVuY3Rpb247XHJcbn07XHJcblxyXG4vLyBjaGlsZCBlbGVtZW50cyBpbiB0aGUganN4IG1hcmt1cCB3aGljaCB3aWxsIGJlIHBhc3NlZCB0byB0aGUgaCBmdW5jdGlvbiBhcyBgcHJvcHMuY2hpbGRyZW5gXHJcbnR5cGUgQ2hpbGRyZW5Qcm9wcyA9IHtcclxuICAvLyBuZXN0ZWQgYXJyYXkgaW4gY2FzZSBvZlxyXG4gIC8vIDxlbGVtPlxyXG4gIC8vICAgPHNwYW4vPlxyXG4gIC8vICAge2NoaWxkcmVufVxyXG4gIC8vICAgPGRpdi8+XHJcbiAgLy8gPC9lbGVtPlxyXG4gIGNoaWxkcmVuOiBBcnJheTxcclxuICAgIE5vZGUgfCBKc3hOb2RlSW50ZXJmYWNlIHwgc3RyaW5nIHwgQXJyYXk8Tm9kZSB8IEpzeE5vZGVJbnRlcmZhY2UgfCBzdHJpbmc+XHJcbiAgPjtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBwcm9wcyBvYmplY3Qgd2hpY2ggd2lsbCBiZSBwYXNzZWQgdG8ganN4IHByYWdtYSBhbmQgY3VzdG9tIGNvbXBvbmVudCBmdW5jdGlvbnNcclxuICovXHJcbnR5cGUgSnN4UHJvcHMgPSBBdHRyaWJ1dGVzICYgU3BlY2lhbEF0dHJpYnV0ZXMgJiBDaGlsZHJlblByb3BzO1xyXG5cclxuLy8gYmFzZSBjbGFzcyB3aGljaCB3aWxsIGJlIGluaGVyaXRlZCBmcm9tIGpzeCBhbmQgZnJhZ21lbnRzIGZ1bmN0aW9uIG5vZGUgZ2VuZXJhdGlvblxyXG4vLyBhbmQgd2lsbCBiZSB1c2VkIHRvIGRpc3Rpbmd1aXNoIHRoZW0gd2l0aCBvdGhlciBFbGVtZW50c1xyXG5jbGFzcyBKc3hOb2RlIHtcclxuICBwcm9wczogSnN4UHJvcHM7XHJcbiAgY29uc3RydWN0b3IocHJvcHM6IEpzeFByb3BzKSB7XHJcbiAgICB0aGlzLnByb3BzID0gcHJvcHM7XHJcbiAgfVxyXG59XHJcblxyXG4vKntcclxuICAgICAgLy9ba2V5OiBzdHJpbmddOiBhbnk7XHJcbiAgICAgIHR5cGU6IFwiRWxlbWVudFwiIHwgXCJGcmFnbWVudFwiIHwgXCJUZXh0Tm9kZVwiIHwgXCJOdWxsXCI7XHJcbiAgICAgIGFzTm9kZSgpOiBOb2RlO1xyXG4gICAgICB0b1N0cmluZygpOiBzdHJpbmc7XHJcbiAgICAgIG5vZGU6IE5vZGUgfCBudWxsO1xyXG4gICAgICBwYXJlbnQ6IFZOb2RlIHwgbnVsbDtcclxuICAgICAgY2hpbGRyZW46IEFycmF5PFZOb2RlPjtcclxuICAgICAgdGFnOiBzdHJpbmcgfCBGdW5jdGlvbjsgLy8gP1xyXG4gICAgICAvL2dldFBhcmVudEVsZW1lbnROb2RlKCk6IFZOb2RlOyAvLyBhbmNlc3RvciB3aGljaCBoYXMgYSBFbGVtZW50IG5vZGUgKGkuZS4gbm8gRnJhZ21lbnQpXHJcbiAgICAgIC8vZ2V0Q2hpbGRFbGVtZW50Tm9kZXMoKTogVk5vZGVbXTsgLy8gY2hpbGRyZW4gYW5kIGlmIGEgY2hpbGQgaXMgYSBmcmFnbWVudCBpdHMgY2hpbGRyZW5cclxuICAgIH0qL1xyXG5cclxudHlwZSBDb21tb25WTm9kZVByb3BlcnRpZXMgPSB7XHJcbiAgcGFyZW50OiBWTm9kZTtcclxuICBhc05vZGUoKTogTm9kZTtcclxuICB0b1N0cmluZygpOiBzdHJpbmc7XHJcbn07XHJcbnR5cGUgRWxlbWVudFZOb2RlID0gQ29tbW9uVk5vZGVQcm9wZXJ0aWVzICYge1xyXG4gIHR5cGU6IFwiRWxlbWVudFwiO1xyXG4gIG5vZGU6IEVsZW1lbnQ7XHJcbiAgY2hpbGRyZW46IEFycmF5PFZOb2RlPjtcclxuICB0YWc6IHN0cmluZyB8IEZ1bmN0aW9uO1xyXG4gIHByb3BzOiB7IFtrZXk6IHN0cmluZ106IGFueSB9O1xyXG59O1xyXG50eXBlIFRleHRWTm9kZSA9IENvbW1vblZOb2RlUHJvcGVydGllcyAmIHtcclxuICB0eXBlOiBcIlRleHROb2RlXCI7XHJcbiAgbm9kZTogVGV4dDtcclxuICBjaGlsZHJlbjogQXJyYXk8Vk5vZGU+OyAvL0FycmF5PG5ldmVyPjtcclxuICB0YWc6IG51bGw7XHJcbn07XHJcblxyXG50eXBlIFJvb3RWTm9kZSA9IHtcclxuICB0eXBlOiBcIlJvb3RcIjtcclxuICBub2RlOiBFbGVtZW50O1xyXG4gIGNoaWxkcmVuOiBBcnJheTxWTm9kZT47XHJcbiAgcGFyZW50OiBudWxsO1xyXG4gIC8vYXNOb2RlKCk6IE5vZGU7XHJcbiAgLy90b1N0cmluZygpOiBzdHJpbmc7XHJcbn07XHJcblxyXG50eXBlIFZOb2RlID0ge1xyXG4gIHBhcmVudDogVk5vZGU7XHJcbiAgYXNOb2RlKCk6IE5vZGU7XHJcbiAgdG9TdHJpbmcoKTogc3RyaW5nO1xyXG59ICYgKFxyXG4gIHwgRWxlbWVudFZOb2RlXHJcbiAgfCBUZXh0Vk5vZGVcclxuICB8IHtcclxuICAgICAgdHlwZTogXCJUZXh0Tm9kZVwiO1xyXG4gICAgICBub2RlOiBUZXh0O1xyXG4gICAgICBjaGlsZHJlbjogQXJyYXk8Vk5vZGU+OyAvL0FycmF5PG5ldmVyPjtcclxuICAgICAgdGFnOiBudWxsO1xyXG4gICAgfVxyXG4gIHwge1xyXG4gICAgICB0eXBlOiBcIkZyYWdtZW50XCI7XHJcbiAgICAgIG5vZGU6IG51bGw7IC8vIEBUT0RPOiBvciBudWxsP1xyXG4gICAgICBjaGlsZHJlbjogQXJyYXk8Vk5vZGU+O1xyXG4gICAgICB0YWc6IG51bGw7XHJcbiAgICB9XHJcbiAgfCB7XHJcbiAgICAgIHR5cGU6IFwiTnVsbFwiO1xyXG4gICAgICBub2RlOiBudWxsO1xyXG4gICAgICBjaGlsZHJlbjogQXJyYXk8Vk5vZGU+OyAvL0FycmF5PG5ldmVyPjtcclxuICAgICAgdGFnOiBudWxsO1xyXG4gICAgfVxyXG4pO1xyXG5cclxuLy8gbnVsbCB3aGVuIGNoZWNraW5nIHRoZSBwYXJlbnQgd2hlbiByb290IGlzIGZyYWdtZW50IGl0c2VsZlxyXG5mdW5jdGlvbiBnZXRQYXJlbnRFbGVtZW50Tm9kZSh2Tm9kZTogVk5vZGUpOiBFbGVtZW50Vk5vZGUge1xyXG4gIGNvbnNvbGUubG9nKFwiZ2V0UGFyZW50RWxlbWVudE5vZGVcIiwgdk5vZGUpO1xyXG5cclxuICB3aGlsZSAodk5vZGUucGFyZW50KSB7XHJcbiAgICB2Tm9kZSA9IHZOb2RlLnBhcmVudDtcclxuICAgIC8vIGAubm9kZWAgaXMgb25seSBvbiBcIlRleHRcIiBhbmQgXCJFbGVtZW50XCIgdHlwZSBWTm9kZSwgYW5kIG9ubHkgRWxlbWVudCBoYXMgY2hpbGRyZW5cclxuICAgIGlmICh2Tm9kZS5ub2RlKSBicmVhaztcclxuICB9XHJcblxyXG4gIGNvbnNvbGUubG9nKFwiZm91bmQ6IFwiLCB2Tm9kZSk7XHJcblxyXG4gIHJldHVybiB2Tm9kZSBhcyBFbGVtZW50Vk5vZGU7XHJcbn1cclxuXHJcbnR5cGUgVk5vZGVMaWtlV2l0aENoaWxkcmVuID0ge1xyXG4gIG5vZGU/OiBOb2RlIHwgbnVsbDtcclxuICBjaGlsZHJlbjogQXJyYXk8Vk5vZGVMaWtlV2l0aENoaWxkcmVuPjtcclxuICBba2V5OiBzdHJpbmddOiBhbnk7XHJcbn07XHJcblxyXG5mdW5jdGlvbiBnZXRDaGlsZHJlbldpdGhOb2RlcyhcclxuICB2Tm9kZTogVk5vZGVMaWtlV2l0aENoaWxkcmVuLFxyXG4gIGFsd2F5c0FsbG93OiBWTm9kZUxpa2VXaXRoQ2hpbGRyZW4gPSBbXVxyXG4pOiBWTm9kZVtdIHtcclxuICByZXR1cm4gdk5vZGUuY2hpbGRyZW5cclxuICAgIC5tYXAoKGNoaWxkTm9kZTogVk5vZGVMaWtlV2l0aENoaWxkcmVuKSA9PiB7XHJcbiAgICAgIGlmIChjaGlsZE5vZGUgPT09IGFsd2F5c0FsbG93KSByZXR1cm4gY2hpbGROb2RlO1xyXG4gICAgICAvL2lmIChjaGlsZE5vZGUudHlwZSA9PT0gXCJOdWxsXCIpIHJldHVybiBudWxsO1xyXG4gICAgICBpZiAoY2hpbGROb2RlLm5vZGUpIHJldHVybiBjaGlsZE5vZGU7XHJcbiAgICAgIC8vaWYgKGNoaWxkTm9kZS50eXBlID09PSBcIkZyYWdtZW50XCIpXHJcbiAgICAgIC8vcmV0dXJuIGdldENoaWxkcmVuV2l0aE5vZGVzKGNoaWxkTm9kZSwgYWx3YXlzQWxsb3cpO1xyXG4gICAgICAvLyBAVE9ETzogb3RoZXIgdHlwZXMgKGkuZS4gTGl2ZSBFbGVtZW50KVxyXG4gICAgICByZXR1cm4gZ2V0Q2hpbGRyZW5XaXRoTm9kZXMoY2hpbGROb2RlLCBhbHdheXNBbGxvdyk7XHJcbiAgICB9KVxyXG4gICAgLmZsYXQoSW5maW5pdHkpXHJcbiAgICAuZmlsdGVyKEJvb2xlYW4pIGFzIFZOb2RlW107XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdldFBhcmVudEFuZE5leHRTaWJsaW5nKHZOb2RlOiBWTm9kZSk6IFtOb2RlLCBOb2RlIHwgbnVsbF0ge1xyXG4gIC8vIG5vZGUgYW5jZXN0b3Igd2l0aCBFbGVtZW50LFxyXG4gIGNvbnN0IHBhcmVudFdpdGhFbGVtZW50ID0gZ2V0UGFyZW50RWxlbWVudE5vZGUodk5vZGUpO1xyXG4gIGNvbnN0IHNpYmxpbmdzID0gZ2V0Q2hpbGRyZW5XaXRoTm9kZXMocGFyZW50V2l0aEVsZW1lbnQsIHZOb2RlKTtcclxuICBjb25zdCBwcmV2U2libGluZyA9IHNpYmxpbmdzW3NpYmxpbmdzLmluZGV4T2Yodk5vZGUpIC0gMV07XHJcbiAgY29uc3QgbmV4dFNpYmxpbmdOb2RlID0gcHJldlNpYmxpbmcgPyBwcmV2U2libGluZy5ub2RlIS5uZXh0U2libGluZyA6IG51bGw7XHJcblxyXG4gIGNvbnNvbGUubG9nKFwiZ2V0UGFyZW50QW5kTmV4dFNpYmxpbmdcIiwge1xyXG4gICAgdk5vZGUsXHJcbiAgICBwYXJlbnRXaXRoRWxlbWVudCxcclxuICAgIHByZXZTaWJsaW5nLFxyXG4gICAgcHJldlNpYmxpbmdOb2RlOiBwcmV2U2libGluZyAmJiBwcmV2U2libGluZy5ub2RlLFxyXG4gICAgbmV4dFNpYmxpbmdOb2RlLFxyXG4gIH0pO1xyXG5cclxuICByZXR1cm4gW3BhcmVudFdpdGhFbGVtZW50Lm5vZGUsIG5leHRTaWJsaW5nTm9kZV07XHJcbn1cclxuXHJcbi8vIHByaXZhdGUga2V5IGZvciBjYWxsaW5nIHRoZSBgcmVmYCBjYWxsZXJzXHJcbmNvbnN0IF9jYWxsUmVmcyA9IFN5bWJvbChcImNhbGxSZWZzXCIpO1xyXG5cclxuLy8gdGhlIGN1cnJlbnQgbWFya3VwIHdoaWNoIGlzIHJlbmRlcmVkIGlzIG5lc3RlZCBpbiBhbiBzdmcgZWxlbWVudFxyXG5sZXQgc3ZnQ29udGV4dCA9IGZhbHNlO1xyXG5cclxuLy8ganN4IGFuZCBGcmFnbWVudCB3aWxsIHJldHVybiBvYmplY3RzIHdoaWNoIGltcGxlbWVudCB0aGlzIGludGVyZmFjZVxyXG5leHBvcnQgaW50ZXJmYWNlIEpzeE5vZGVJbnRlcmZhY2UgZXh0ZW5kcyBKc3hOb2RlIHtcclxuICB0b1N0cmluZygpOiBzdHJpbmc7XHJcbiAgYXNOb2RlKCk6IE5vZGU7XHJcbiAgYXNWTm9kZSgpOiBWTm9kZTtcclxuICBbX2NhbGxSZWZzXSgpOiB2b2lkO1xyXG59XHJcblxyXG4vKipcclxuICogcmV0dXJucyB0cnVlIGlmIG5vdCBudWxsaXNoIG9yIGZhbHNlXHJcbiAqIHRoYXQgbWVhbnMgMCBvciBlbXB0eSBzdHJpbmcgYXJlIGFsbG93ZWRcclxuICogQHBhcmFtIHsqfSB2YWxcclxuICovXHJcbmZ1bmN0aW9uIHRydXRoeSh2YWx1ZTogYW55KTogYm9vbGVhbiB7XHJcbiAgcmV0dXJuIHZhbHVlICE9PSBmYWxzZSAmJiB2YWx1ZSAhPT0gbnVsbCAmJiB2YWx1ZSAhPT0gdW5kZWZpbmVkO1xyXG59XHJcblxyXG4vKipcclxuICogZXNjYXBlcyB0aGUgcHJvdmlkZWQgc3RyaW5nIGFnYWluc3QgeHNzIGF0dGFja3MgZXRjXHJcbiAqXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSB0ZXh0XHJcbiAqIEByZXR1cm5zIHtzdHJpbmd9XHJcbiAqL1xyXG5mdW5jdGlvbiBzYW5pdGl6ZSh0ZXh0OiBzdHJpbmcpOiBzdHJpbmcge1xyXG4gIGNvbnN0IGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgZGl2LmlubmVyVGV4dCA9IHRleHQ7XHJcbiAgcmV0dXJuIGRpdi5pbm5lckhUTUw7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBiYXNpY2FsbHkgYEVsZW1lbnQub3V0ZXJIVE1MYCBidXQgYWxzbyBzdXBwb3J0cyBUZXh0IG5vZGUgYW5kIERvY3VtZW50RnJhZ21lbnRcclxuICogQHBhcmFtIGVsZW1lbnQge05vZGV9IC0gZWxlbWVudCB3aGljaCBpdHMgaHRtbCBuZWVkcyB0byBiZSByZXR1cm5lZFxyXG4gKi9cclxuZnVuY3Rpb24gZ2V0T3V0ZXJIdG1sKGVsZW1lbnQ6IE5vZGUpOiBzdHJpbmcge1xyXG4gIGlmIChlbGVtZW50IGluc3RhbmNlb2YgRWxlbWVudCkgcmV0dXJuIGVsZW1lbnQub3V0ZXJIVE1MO1xyXG4gIGlmIChlbGVtZW50IGluc3RhbmNlb2YgVGV4dCkgcmV0dXJuIHNhbml0aXplKGVsZW1lbnQud2hvbGVUZXh0KTtcclxuICBpZiAoZWxlbWVudCBpbnN0YW5jZW9mIERvY3VtZW50RnJhZ21lbnQpXHJcbiAgICByZXR1cm4gQXJyYXkuZnJvbShlbGVtZW50LmNoaWxkTm9kZXMpXHJcbiAgICAgIC5tYXAoKGVsKSA9PiBnZXRPdXRlckh0bWwoZWwpKVxyXG4gICAgICAuam9pbihcIlwiKTtcclxuXHJcbiAgLy8gc2hvdWxkbid0IHJlYWNoIHRoaXMgcG9pbnRcclxuICBjb25zb2xlLndhcm4oXCJnZXRPdXRlckh0bWwgZG9lcyBub3Qgc3VwcG9ydCB0aGlzIHR5cGUgb2YgZWxlbWVudFwiLCBlbGVtZW50KTtcclxuICByZXR1cm4gXCJcIjtcclxufVxyXG5cclxuLyoqXHJcbiAqIGdlbmVyYXRlcyB0aGUgaHRtbCBhcyBhIHN0cmluZyB3aGljaCBjYW4gYmUgdXNlZCBmb3IgZXhhbXBsZSB3aXRoIGBlbGVtZW50LmlubmVySFRNTCgpYFxyXG4gKlxyXG4gKiBAcGFyYW0gdGFnIHtzdHJpbmd8RnVuY3Rpb259IC0gdGFnIGFyZ3VtZW50IG9mIHRoZSBqc3ggY2FsbFxyXG4gKiBAcGFyYW0gcHJvcHMge09iamVjdH0gLSBwcm9wcyBhcmd1bWVudCBvZiBqc3ggY2FsbFxyXG4gKi9cclxuZnVuY3Rpb24gYXNIdG1sU3RyaW5nKHRhZzogc3RyaW5nIHwgRnVuY3Rpb24sIHByb3BzOiBKc3hQcm9wcykge1xyXG4gIGlmICh0eXBlb2YgdGFnID09PSBcImZ1bmN0aW9uXCIpIHtcclxuICAgIC8vIGV4cGVjdGluZyB0YWcgZnVuY3Rpb24gdG8gYWx3YXlzIHJldHVybiBhIGpzeC5cclxuICAgIC8vIGhlcmUgaXQgd2lsbCBhbHNvIHdvcmsgaWYgaXQgcmV0dXJucyBzb21ldGhpbmcgd2l0aCB0b1N0cmluZygpID0+IHN0cmluZyBtZXRob2RcclxuICAgIGNvbnN0IGVsZW1lbnQ6IEpzeE5vZGUgPSB0YWcocHJvcHMpO1xyXG5cclxuICAgIHJldHVybiBlbGVtZW50LnRvU3RyaW5nKCk7XHJcbiAgfVxyXG5cclxuICAvLyByZW1vdmUgY2hpbGRyZW4gZnJvbSBwcm9wcyBhbmQgcmVuZGVyIGl0IGFzIGNvbnRlbnQsXHJcbiAgLy8gdGhlIHJlc3QgYXMgYXR0cmlidXRlc1xyXG4gIGNvbnN0IHsgY2hpbGRyZW4sIC4uLmF0dHJzIH0gPSBwcm9wcztcclxuXHJcbiAgY29uc3QgYXR0cmlidXRlcyA9IE9iamVjdC5lbnRyaWVzKGF0dHJzKVxyXG4gICAgLmZpbHRlcigoWywgdmFsdWVdKSA9PiB0cnV0aHkodmFsdWUpKVxyXG4gICAgLm1hcCgoW2tleSwgdmFsdWVdKSA9PiB7XHJcbiAgICAgIC8vIGUuZy4gZGlzYWJsZWQ6IHRydWUgPT4gPHRhZyBkaXNhYmxlZD5cclxuICAgICAgaWYgKHZhbHVlID09PSB0cnVlKSByZXR1cm4ga2V5O1xyXG5cclxuICAgICAgLy8gZm9yIHN0eWxlIGFzIG9iamVjdDpcclxuICAgICAgLy8gKHN0eWxlOikge2Rpc3BsYXk6IFwibm9uZVwiLCBwb3NpdGlvbjogXCJhYnNvbHV0ZVwifSA9PT4gJ2Rpc3BsYXk6IG5vbmU7IHBvc2l0aW9uOiBhYnNvbHV0ZTsnXHJcbiAgICAgIGlmIChrZXkgPT09IFwic3R5bGVcIiAmJiB0eXBlb2YgdmFsdWUgPT09IFwib2JqZWN0XCIpXHJcbiAgICAgICAgdmFsdWUgPSBPYmplY3QuZW50cmllcyh2YWx1ZSlcclxuICAgICAgICAgIC8vIGlnbm9yZSBzdHVmZiBsaWtlIGB7YmFja2dyb3VuZDogYWN0aXZlICYmIFwicmVkXCJ9YCB3aGVuIGBhY3RpdmUgPT09IGZhbHNlIC8gbnVsbCAvIHVuZGVmaW5lZGBcclxuICAgICAgICAgIC5maWx0ZXIoKFssIHZdKSA9PiB0cnV0aHkodikpXHJcbiAgICAgICAgICAvLyBjdXJyZW50bHkgc3VwcG9ydHMgXCJiYWNrZ3JvdW5kLWNvbG9yXCIgbm90IFwiYmFja2dyb3VuZENvbG9yXCJcclxuICAgICAgICAgIC5tYXAoKFtrLCB2XSkgPT4gYCR7a306ICR7dn1gKVxyXG4gICAgICAgICAgLmpvaW4oXCI7IFwiKTtcclxuXHJcbiAgICAgIC8vIChjbGFzczopIFtcImJ0blwiLCBcInJlZFwiXSA9PT4gXCJidG4gcmVkXCJcclxuICAgICAgaWYgKGtleSA9PT0gXCJjbGFzc1wiICYmIEFycmF5LmlzQXJyYXkodmFsdWUpKSB2YWx1ZSA9IHZhbHVlLmpvaW4oXCIgXCIpO1xyXG5cclxuICAgICAgcmV0dXJuIGAke2tleX09XCIke3ZhbHVlfVwiYDtcclxuICAgIH0pXHJcbiAgICAuam9pbihcIiBcIik7XHJcblxyXG4gIGNvbnN0IGNvbnRlbnQgPSBjaGlsZHJlblxyXG4gICAgLmZpbHRlcih0cnV0aHkpXHJcbiAgICAubWFwKChjaGlsZCkgPT5cclxuICAgICAgY2hpbGQgaW5zdGFuY2VvZiBOb2RlXHJcbiAgICAgICAgPyBnZXRPdXRlckh0bWwoY2hpbGQpXHJcbiAgICAgICAgOiB0eXBlb2YgY2hpbGQgPT09IFwib2JqZWN0XCJcclxuICAgICAgICA/IGNoaWxkLnRvU3RyaW5nKClcclxuICAgICAgICA6IHNhbml0aXplKGNoaWxkKVxyXG4gICAgKVxyXG4gICAgLmpvaW4oXCJcIik7XHJcblxyXG4gIHJldHVybiBgPCR7dGFnfSAke2F0dHJpYnV0ZXN9PiR7Y29udGVudH08LyR7dGFnfT5gO1xyXG59XHJcblxyXG4vKipcclxuICogZ2VuZXJhdGVzIEhUTUwgTm9kZSBlbGVtZW50cyBmcm9tIHRoZSBwcm92aWRlZCBqc3ggdHJlZVxyXG4gKiBAcGFyYW0gdGFnIHtzdHJpbmd8RnVuY3Rpb259IC0gdGFnIGFyZ3VtZW50IG9mIHRoZSBqc3ggY2FsbFxyXG4gKiBAcGFyYW0gcHJvcHMge09iamVjdH0gLSBwcm9wcyBhcmd1bWVudCBvZiBqc3ggY2FsbFxyXG4gKi9cclxuZnVuY3Rpb24gYXNOb2RlKFxyXG4gIHRhZzogc3RyaW5nIHwgRnVuY3Rpb24gfCB1bmRlZmluZWQsXHJcbiAgcHJvcHM6IEF0dHJpYnV0ZXMgJiBTcGVjaWFsQXR0cmlidXRlcywgLy9Kc3hQcm9wcyxcclxuICBjaGlsZHJlbjogYW55W11cclxuKTogW05vZGUsIEpzeE5vZGVJbnRlcmZhY2VbXV0ge1xyXG4gIGNvbnNvbGUubG9nKFwiYXNOb2RlKClcIiwgeyB0YWcsIHByb3BzLCBjaGlsZHJlbiB9KTtcclxuXHJcbiAgLy8gZnJhZ21lbnRcclxuICBpZiAoIXRhZykge1xyXG4gICAgY29uc3QgZnJhZ21lbnRzID0gY2hpbGRyZW5cclxuICAgICAgLmZsYXQoKSAvLyA/XHJcbiAgICAgIC5tYXAoXHJcbiAgICAgICAgKGl0ZW0pID0+IGl0ZW0uYXNOb2RlKClcclxuICAgICAgKTtcclxuXHJcbiAgICBjb25zdCBkb2N1bWVudEZyYWdtZW50ID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO1xyXG5cclxuICAgIGRvY3VtZW50RnJhZ21lbnQuYXBwZW5kKC4uLmZyYWdtZW50cyk7XHJcbiAgICByZXR1cm4gW2RvY3VtZW50RnJhZ21lbnQsIFtdXTtcclxuICB9XHJcblxyXG4gIC8vIHNob3VsZG4ndFxyXG4gIGlmICh0eXBlb2YgdGFnID09PSBcImZ1bmN0aW9uXCIpIHtcclxuICAgIGNvbnNvbGUuZXJyb3IoXCJzaG91bGRuJ3QgcmVhY2ggdGhpcyBpbiB2VHJlZSBtb2RlXCIpO1xyXG4gICAgLy8gZXhwZWN0aW5nIHRoZSB0YWcgZnVuY3Rpb24gdG8gcmV0dXJuIGpzeC5cclxuICAgIC8vIGhlcmUgaXQgd2lsbCBhbHNvIHdvcmsgd2hlbiBpdCByZXR1cm5zIEhUTUxFbGVtZW50XHJcbiAgICBsZXQgcmVzdWx0ID0gdGFnKHByb3BzKTtcclxuXHJcbiAgICBsZXQganN4Tm9kZXM6IEpzeE5vZGVJbnRlcmZhY2VbXSA9IFtdO1xyXG5cclxuICAgIGlmIChyZXN1bHQgaW5zdGFuY2VvZiBKc3hOb2RlIHx8IChyZXN1bHQgJiYgcmVzdWx0LmFzTm9kZSkpIHtcclxuICAgICAganN4Tm9kZXMgPSBbcmVzdWx0IGFzIEpzeE5vZGVJbnRlcmZhY2VdO1xyXG4gICAgICByZXN1bHQgPSAocmVzdWx0IGFzIEpzeE5vZGVJbnRlcmZhY2UpLmFzTm9kZSgpO1xyXG4gICAgICBPYmplY3QuZW50cmllcyhwcm9wcykuZm9yRWFjaCgoW2tleSwgdmFsdWVdKSA9PiB7XHJcbiAgICAgICAgaWYgKFxyXG4gICAgICAgICAga2V5LnN0YXJ0c1dpdGgoXCJvbi1cIikgJiZcclxuICAgICAgICAgICh0eXBlb2YgdmFsdWUgPT09IFwiZnVuY3Rpb25cIiB8fCB0eXBlb2YgdmFsdWUgPT09IFwib2JqZWN0XCIpXHJcbiAgICAgICAgKSB7XHJcbiAgICAgICAgICAvLyByZW1vdmUgbGVhZGluZyBcIm9uLVwiXCJcclxuICAgICAgICAgIGNvbnN0IGV2ZW50ID0ga2V5LnJlcGxhY2UoL15vbi0vLCBcIlwiKTtcclxuXHJcbiAgICAgICAgICByZXN1bHQuYWRkRXZlbnRMaXN0ZW5lcihcclxuICAgICAgICAgICAgZXZlbnQsXHJcbiAgICAgICAgICAgIHZhbHVlIGFzIEV2ZW50TGlzdGVuZXJPckV2ZW50TGlzdGVuZXJPYmplY3RcclxuICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gW3Jlc3VsdCwganN4Tm9kZXNdO1xyXG4gIH1cclxuXHJcbiAgY29uc3QgeyAuLi5hdHRycyB9ID0gcHJvcHM7XHJcbiAgLy8gcmVtZW1iZXIgaWYgdGhlIHN2ZyBjb250ZXh0IHdhcyBzZXQgZm9yIHRoaXMgbm9kZSwgYW5kIHJlcGxhY2UgYWZ0ZXIgZ2VuZXJhdGluZyBhbGwgY2hpbGRyZW5cclxuICBsZXQgc3ZnQ29udGV4dFNldCA9IGZhbHNlO1xyXG5cclxuICAvLyBzZXQgdGhlIGNvbnRleHQgb2YgbWFya3VwIHdoaWNoIGlzIHJlbmRlcmVkIGFzIFNWRyAob3IgaXRzIGNoaWxkcmVuKVxyXG4gIC8vIG5vIG5lZWQgZm9yIHJlLXNldHRpbmcgdGhlIGNvbnRleHQgZm9yIG5lc3RlZCBTVkdzXHJcbiAgaWYgKCFzdmdDb250ZXh0ICYmIHRhZyA9PT0gXCJzdmdcIikge1xyXG4gICAgc3ZnQ29udGV4dCA9IHRydWU7XHJcbiAgICBzdmdDb250ZXh0U2V0ID0gdHJ1ZTtcclxuICB9XHJcblxyXG4gIC8vIGN1cnJlbnRseSBub3Qgc3VwcG9ydGluZyB0aGUgYGlzYCBvcHRpb24gZm9yIEN1c3RvbWl6ZWQgYnVpbHQtaW4gZWxlbWVudHNcclxuICBjb25zdCBub2RlID0gc3ZnQ29udGV4dFxyXG4gICAgPyBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoXCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiLCB0YWcpXHJcbiAgICA6IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodGFnKTtcclxuXHJcbiAgT2JqZWN0LmVudHJpZXMoYXR0cnMpXHJcbiAgICAuZmlsdGVyKChbX2tleSwgdmFsdWVdKSA9PiB0cnV0aHkodmFsdWUpKVxyXG4gICAgLmZvckVhY2goKFtrZXksIHZhbHVlXSkgPT4ge1xyXG4gICAgICAvLyBmb3Igc3R5bGUgYXMgb2JqZWN0OlxyXG4gICAgICAvLyAoc3R5bGU6KSB7ZGlzcGxheTogXCJub25lXCIsIHBvc2l0aW9uOiBcImFic29sdXRlXCJ9ID09PiAnZGlzcGxheTogbm9uZTsgcG9zaXRpb246IGFic29sdXRlOydcclxuICAgICAgaWYgKGtleSA9PT0gXCJzdHlsZVwiICYmIHR5cGVvZiB2YWx1ZSA9PT0gXCJvYmplY3RcIilcclxuICAgICAgICB2YWx1ZSA9IE9iamVjdC5lbnRyaWVzKHZhbHVlKVxyXG4gICAgICAgICAgLmZpbHRlcigoWywgdl0pID0+IHRydXRoeSh2KSlcclxuICAgICAgICAgIC5tYXAoKFtrLCB2XSkgPT4gYCR7a306ICR7dn1gKVxyXG4gICAgICAgICAgLmpvaW4oXCI7IFwiKTtcclxuXHJcbiAgICAgIC8vIChjbGFzczopIFtcImJ0blwiLCBcInJlZFwiXSA9PT4gXCJidG4gcmVkXCJcclxuICAgICAgaWYgKGtleSA9PT0gXCJjbGFzc1wiICYmIEFycmF5LmlzQXJyYXkodmFsdWUpKSB2YWx1ZSA9IHZhbHVlLmpvaW4oXCIgXCIpO1xyXG5cclxuICAgICAgaWYgKHZhbHVlID09PSB0cnVlKSBub2RlLnNldEF0dHJpYnV0ZShrZXksIFwiXCIpO1xyXG4gICAgICBlbHNlIGlmICh0eXBlb2YgdmFsdWUgPT09IFwic3RyaW5nXCIgfHwgdHlwZW9mIHZhbHVlID09PSBcIm51bWJlclwiKVxyXG4gICAgICAgIG5vZGUuc2V0QXR0cmlidXRlKGtleSwgU3RyaW5nKHZhbHVlKSk7XHJcbiAgICAgIC8vIGtleSBoYXMgdGhlIGZvcm0gb2YgXCJvbi1jaGFuZ2VcIi4gdmFsdWUgaXMgdGhlIGNhbGxiYWNrIGZ1bmN0aW9uIG9yIGFuIG9iamVjdCBpbXBsZW1lbnRpbmcge0V2ZW50TGlzdGVuZXJ9IGludGVyZmFjZVxyXG4gICAgICBlbHNlIGlmIChcclxuICAgICAgICBrZXkuc3RhcnRzV2l0aChcIm9uLVwiKSAmJlxyXG4gICAgICAgICh0eXBlb2YgdmFsdWUgPT09IFwiZnVuY3Rpb25cIiB8fCB0eXBlb2YgdmFsdWUgPT09IFwib2JqZWN0XCIpXHJcbiAgICAgICkge1xyXG4gICAgICAgIC8vIHJlbW92ZSBsZWFkaW5nIFwib24tXCJcIlxyXG4gICAgICAgIGNvbnN0IGV2ZW50ID0ga2V5LnJlcGxhY2UoL15vbi0vLCBcIlwiKTtcclxuXHJcbiAgICAgICAgbm9kZS5hZGRFdmVudExpc3RlbmVyKFxyXG4gICAgICAgICAgZXZlbnQsXHJcbiAgICAgICAgICB2YWx1ZSBhcyBFdmVudExpc3RlbmVyT3JFdmVudExpc3RlbmVyT2JqZWN0XHJcbiAgICAgICAgKTtcclxuICAgICAgfVxyXG4gICAgICAvLyBAdHMtaWdub3JlIC0gcHJvdmlkaW5nIHRoZSB2YWx1ZSBhcyBwcm9wZXJ0eSB0byBodG1sIGVsZW1lbnRcclxuICAgICAgZWxzZSBub2RlW2tleV0gPSB2YWx1ZTtcclxuICAgIH0pO1xyXG5cclxuICAvLyByZXR1cm5zIGNoaWxkIGpzeCBub2RlcyBhcyB3ZWxsIHRvIGJlIHVzZWQgZHVyaW5nIHRoZSByZWYgY2FsbFxyXG4gIGNvbnN0IGNoaWxkSnN4Tm9kZXMgPSBjaGlsZHJlbi5maWx0ZXIoXHJcbiAgICAoY2hpbGQpID0+IGNoaWxkIGluc3RhbmNlb2YgSnN4Tm9kZSB8fCAoY2hpbGQgJiYgY2hpbGQuYXNOb2RlKVxyXG4gICk7XHJcblxyXG4gIGNvbnNvbGUubG9nKHsgY2hpbGRyZW4gfSk7XHJcblxyXG4gIG5vZGUuYXBwZW5kKFxyXG4gICAgLi4uY2hpbGRyZW5cclxuICAgICAgLmZsYXQoKVxyXG4gICAgICAvLy5maWx0ZXIodHJ1dGh5KVxyXG4gICAgICAuZmlsdGVyKChjaGlsZCkgPT4gY2hpbGQudGFnICE9PSBcIl9fTlVMTF9fXCIpXHJcbiAgICAgIC5tYXAoKGNoaWxkKSA9PiBjaGlsZC5hc05vZGUoKSlcclxuICApO1xyXG5cclxuICAvKm5vZGUuYXBwZW5kKFxyXG4gICAgLi4uY2hpbGRyZW5cclxuICAgICAgLmZsYXQoKVxyXG4gICAgICAuZmlsdGVyKHRydXRoeSlcclxuICAgICAgLm1hcCgoY2hpbGQpID0+XHJcbiAgICAgICAgY2hpbGQgaW5zdGFuY2VvZiBOb2RlXHJcbiAgICAgICAgICA/IGNvbnNvbGUud2FybihcIm5vZGVcIikgfHwgY2hpbGQgLy8gd2FyblxyXG4gICAgICAgICAgOiBjaGlsZCBpbnN0YW5jZW9mIEpzeE5vZGVcclxuICAgICAgICAgID8gY2hpbGQuYXNOb2RlKClcclxuICAgICAgICAgIDogY29uc29sZS53YXJuKFwidGV4dFwiKSB8fCBjaGlsZFxyXG4gICAgICApXHJcbiAgKTsqL1xyXG5cclxuICAvLyBzdmcgZWxlbWVudCBhbmQgYWxsIGl0cyBjaGlsZHJlbiB3ZXJlIHJlbmRlcmVkLCByZXNldCB0aGUgc3ZnIGNvbnRleHRcclxuICBpZiAoc3ZnQ29udGV4dFNldCkgc3ZnQ29udGV4dCA9IGZhbHNlO1xyXG5cclxuICByZXR1cm4gW25vZGUsIGNoaWxkSnN4Tm9kZXMgYXMgSnN4Tm9kZUludGVyZmFjZVtdXTtcclxufVxyXG5cclxuLy8gQFRPRE86IHJlbW92ZSBtZXRob2Qgb24gVk5vZGVcclxuZnVuY3Rpb24gcmVtb3ZlSXRlbShpdGVtOiBWTm9kZSkge1xyXG4gIC8vaWYgKGl0ZW0gPT09IG51bGwpIHJldHVybjtcclxuICBpZiAoaXRlbS50eXBlID09PSBcIkVsZW1lbnRcIiB8fCBpdGVtLnR5cGUgPT09IFwiVGV4dE5vZGVcIilcclxuICAgIGl0ZW0ubm9kZS5wYXJlbnRFbGVtZW50IS5yZW1vdmVDaGlsZChpdGVtLm5vZGUpO1xyXG4gIGVsc2UgaWYgKGl0ZW0udHlwZSA9PT0gXCJGcmFnbWVudFwiKVxyXG4gICAgZ2V0Q2hpbGRyZW5XaXRoTm9kZXMoaXRlbSkuZm9yRWFjaCgobm9kZSkgPT5cclxuICAgICAgbm9kZS5ub2RlIS5wYXJlbnRFbGVtZW50IS5yZW1vdmVDaGlsZChub2RlLm5vZGUhKVxyXG4gICAgKTtcclxuICAvLyBAVE9ETzogZWxzZSAtPiBWTm9kZSBtZXRob2QgYWN0dWFsbHlcclxufVxyXG5cclxuZnVuY3Rpb24gaW5zZXJ0TmV3SXRlbShuZXdOb2RlOiBWTm9kZSkge1xyXG4gIC8vIEBUT0RPOiBOdWxsIG5vdCBuZWNjY2VzZXJ5IGFzIGFzTm9kZSB3aWxsIHJldHVybiBhbiBlbXB0eSBGcmFnbWVudCwgYW5kIG1ha2UgdGhlIG1ldGhvZCBtb3JlIGdlbmVyaWNcclxuICBpZiAobmV3Tm9kZS50eXBlICE9PSBcIk51bGxcIikge1xyXG4gICAgY29uc3QgW3BhcmVudCwgbmV4dFNpYmxpbmddID0gZ2V0UGFyZW50QW5kTmV4dFNpYmxpbmcobmV3Tm9kZSk7XHJcbiAgICBwYXJlbnQuaW5zZXJ0QmVmb3JlKG5ld05vZGUuYXNOb2RlKCksIG5leHRTaWJsaW5nKTtcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGRpZmZBbmRQYXRjaChvbGROb2RlOiBWTm9kZSB8IFJvb3RWTm9kZSwgbmV3Tm9kZTogVk5vZGUgfCBSb290Vk5vZGUpIHtcclxuICBjb25zb2xlLmxvZyhcIi0tLS0tLS0tIGRpZmZBbmRQYXRjaCAtLS0tLS0tLVwiLCB7IG9sZE5vZGUsIG5ld05vZGUgfSk7XHJcbiAgaWYgKG9sZE5vZGUudHlwZSAhPT0gbmV3Tm9kZS50eXBlKSB7XHJcbiAgICAvLyB0ZWNobmljYWxseSBpdCB3b3VsZCBiZWVuIG1vcmUgZWZmZWN0aXZlIHdheXMgdG8gcmVwbGFjZSwgZS5nLiByZXBsYWNlV2l0aCgpIG1ldGhvZFxyXG4gICAgLy8gYnV0IHJlbW92aW5nIGFuZCBhZGRpbmcgd291bGQgYWxsb3cgYSBtb3JlIGdlbmVyaWMgc29sdXRpb24gdG8gcHJvdmlkZSBpbmRlcGVuZGVudCBpbXBsZW1lbnRhdGlvbiBmcm9tIGRpZmZlcmVudCBWTm9kZSBjbGFzc2VzXHJcbiAgICByZW1vdmVJdGVtKG9sZE5vZGUgYXMgVk5vZGUpO1xyXG4gICAgaW5zZXJ0TmV3SXRlbShuZXdOb2RlIGFzIFZOb2RlKTtcclxuICB9XHJcbiAgLy8gYm90aCBudWxsIDotPiBkbyBub3RoaW5nXHJcbiAgZWxzZSBpZiAob2xkTm9kZS50eXBlID09PSBcIk51bGxcIiAmJiBuZXdOb2RlLnR5cGUgPT09IFwiTnVsbFwiKSByZXR1cm47XHJcbiAgLy8gYm90aCBUZXh0IE5vZGVzIDotPiB1cGRhdGUgdGhlIHRleHRcclxuICBlbHNlIGlmIChvbGROb2RlLnR5cGUgPT09IFwiVGV4dE5vZGVcIiAmJiBuZXdOb2RlLnR5cGUgPT09IFwiVGV4dE5vZGVcIikge1xyXG4gICAgaWYgKG9sZE5vZGUubm9kZSEubm9kZVZhbHVlICE9PSBuZXdOb2RlLnByb3BzLmNvbnRlbnQpIHtcclxuICAgICAgb2xkTm9kZS5ub2RlIS5ub2RlVmFsdWUgPSBuZXdOb2RlLnByb3BzLmNvbnRlbnQ7XHJcbiAgICB9XHJcbiAgICBuZXdOb2RlLm5vZGUgPSBvbGROb2RlLm5vZGU7XHJcbiAgfVxyXG4gIC8vIGJvdGggSFRNTEVsZW1lbnQgd2l0aCBzYW1lIHRhZ1xyXG4gIGVsc2UgaWYgKG9sZE5vZGUudHlwZSA9PT0gXCJFbGVtZW50XCIgJiYgbmV3Tm9kZS50eXBlID09PSBcIkVsZW1lbnRcIikge1xyXG4gICAgaWYgKG5ld05vZGUudGFnID09PSBvbGROb2RlLnRhZykge1xyXG4gICAgICBuZXdOb2RlLm5vZGUgPSBvbGROb2RlLm5vZGU7XHJcbiAgICAgIC8vICAgICAgcGF0Y2ggcHJvcHMsXHJcbiAgICAgIC8vIHVwZGF0ZSBwcm9wcyBmb3JtIG5ldyBub2RlXHJcbiAgICAgIE9iamVjdC5lbnRyaWVzKG5ld05vZGUucHJvcHMpXHJcbiAgICAgICAgLmZpbHRlcigoW2ssIHZdKSA9PiBvbGROb2RlLnByb3BzW2tdICE9PSB2KVxyXG4gICAgICAgIC5mb3JFYWNoKChba2V5LCB2YWx1ZV0pID0+IHtcclxuICAgICAgICAgIGlmICh2YWx1ZSA9PT0gdHJ1ZSkgbmV3Tm9kZS5ub2RlLnNldEF0dHJpYnV0ZShrZXksIFwiXCIpO1xyXG4gICAgICAgICAgZWxzZSBpZiAodmFsdWUgPT09IG51bGwgfHwgdmFsdWUgPT09IHVuZGVmaW5lZCB8fCB2YWx1ZSA9PT0gZmFsc2UpXHJcbiAgICAgICAgICAgIG5ld05vZGUubm9kZS5yZW1vdmVBdHRyaWJ1dGUoa2V5KTtcclxuICAgICAgICAgIGVsc2UgbmV3Tm9kZS5ub2RlLnNldEF0dHJpYnV0ZShrZXksIHZhbHVlKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgIC8vIHJlbW92ZSBvbGQsIG9ic29sYXRlIGF0dHJpYnV0ZXNcclxuICAgICAgT2JqZWN0LmVudHJpZXMob2xkTm9kZS5wcm9wcylcclxuICAgICAgICAuZmlsdGVyKChbaywgdl0pID0+ICFuZXdOb2RlLnByb3BzLmhhc093blByb3BlcnR5KGspKVxyXG4gICAgICAgIC5mb3JFYWNoKChba2V5LCB2YWx1ZV0pID0+IHtcclxuICAgICAgICAgIG9sZE5vZGUubm9kZS5yZW1vdmVBdHRyaWJ1dGUoa2V5KTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgIC8vIGNoaWxkcmVuID0+IGl0ZXIgYW5kIHBhdGNoXHJcbiAgICAgIC8vIG9sZCBjaGlsZHJlbiBiZWluZyBtb2RpZmllZFxyXG4gICAgICBkaWZmQW5kUGF0Y2hDaGlsZHJlbihvbGROb2RlLCBuZXdOb2RlKTtcclxuICAgIH1cclxuICAgIC8vIHRhZyBoYXMgY2hhbmdlZFxyXG4gICAgZWxzZSB7XHJcbiAgICAgIG9sZE5vZGUubm9kZS5yZXBsYWNlV2l0aChuZXdOb2RlLmFzTm9kZSgpKTtcclxuICAgIH1cclxuICB9XHJcbiAgLy8gRnJhZ21lbnRzXHJcbiAgZWxzZSBpZiAob2xkTm9kZS50eXBlID09PSBcIkZyYWdtZW50XCIgJiYgbmV3Tm9kZS50eXBlID09PSBcIkZyYWdtZW50XCIpIHtcclxuICAgIC8vIGl0ZXJhdGUsIGRpZmYgYW5kIHBhdGNoXHJcbiAgICBkaWZmQW5kUGF0Y2hDaGlsZHJlbihvbGROb2RlLCBuZXdOb2RlKTtcclxuICB9IGVsc2UgaWYgKG9sZE5vZGUudHlwZSA9PT0gXCJSb290XCIpIHtcclxuICAgIC8vIGl0ZXJhdGUsIGRpZmYgYW5kIHBhdGNoXHJcbiAgICBkaWZmQW5kUGF0Y2hDaGlsZHJlbihvbGROb2RlLCBuZXdOb2RlKTtcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGRpZmZBbmRQYXRjaENoaWxkcmVuKFxyXG4gIG9sZE5vZGU6IFZOb2RlIHwgUm9vdFZOb2RlIHwgVk5vZGVJbnRlcmZhY2UsXHJcbiAgbmV3Tm9kZTogVk5vZGUgfCBSb290Vk5vZGUgfCBWTm9kZUludGVyZmFjZVxyXG4pIHtcclxuICBvbGROb2RlLmNoaWxkcmVuLmZvckVhY2goKG9sZENoaWxkLCBpeCkgPT4ge1xyXG4gICAgY29uc3QgbmV3Q2hpbGQgPSBuZXdOb2RlLmNoaWxkcmVuW2l4XTtcclxuICAgIGlmIChuZXdDaGlsZCkgZGlmZkFuZFBhdGNoKG9sZENoaWxkLCBuZXdDaGlsZCk7XHJcbiAgICAvLyBjaGlsZCB3YXMgcmVtb3ZlZFxyXG4gICAgZWxzZSB7XHJcbiAgICAgIHJlbW92ZUl0ZW0ob2xkQ2hpbGQpO1xyXG4gICAgfVxyXG4gIH0pO1xyXG5cclxuICAvLyBuZXcgYWRkaXRpb24gaXRlbXNcclxuICBjb25zdCBuZXdJdGVtcyA9IG5ld05vZGUuY2hpbGRyZW4uc2xpY2Uob2xkTm9kZS5jaGlsZHJlbi5sZW5ndGgpO1xyXG4gIGlmIChuZXdJdGVtcy5sZW5ndGgpIHtcclxuICAgIGNvbnN0IGRvY3VtZW50RnJhZ21lbnQgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XHJcbiAgICBuZXdJdGVtcy5mb3JFYWNoKChpdGVtKSA9PiBkb2N1bWVudEZyYWdtZW50LmFwcGVuZChpdGVtLmFzTm9kZSgpKSk7XHJcblxyXG4gICAgLy8gYWRkIHRvIHRoZSBlbmQgb2YgcGFyZW50IG5vZGVcclxuICAgIGlmIChuZXdOb2RlLm5vZGUgJiYgZmFsc2UpIHtcclxuICAgICAgLy8gb3RoZXIgb25lIHdvdWxkIHdvcmsgdGhlIHNhbWVcclxuICAgICAgbmV3Tm9kZS5ub2RlLmluc2VydEJlZm9yZShkb2N1bWVudEZyYWdtZW50LCBudWxsKTtcclxuICAgIH1cclxuICAgIC8vIG9yIGlmIG5vZGUgaXMgbm90IGFuIGVsZW1lbnQgKGkuZS4gYSBmcmFnbWVudCkgYWRkIGFmdGVyIGl0LlxyXG4gICAgZWxzZSB7XHJcbiAgICAgIC8vIEBUT0RPOiAgcmV0dXJucyBpdGVtcyBiZWZvcmUgdm5vZGUgYW5kIHRoZWlyIG5leHQgc2libGluZyBha2EgZmlyc3QgZnJhZyBpdGVtIVxyXG5cclxuICAgICAgY29uc3QgW3BhcmVudCwgbmV4dFNpYmxpbmddID0gZ2V0UGFyZW50QW5kTmV4dFNpYmxpbmcobmV3SXRlbXNbMF0pO1xyXG4gICAgICBwYXJlbnQuaW5zZXJ0QmVmb3JlKGRvY3VtZW50RnJhZ21lbnQsIG5leHRTaWJsaW5nKTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGFzVk5vZGUodGFnOiBzdHJpbmcgfCBGdW5jdGlvbiB8IHVuZGVmaW5lZCwgcHJvcHM6IEpzeFByb3BzKTogVk5vZGUge1xyXG4gIGNvbnNvbGUubG9nKFwiYXNWTm9kZTpcIiwgeyB0YWcsIHByb3BzIH0pO1xyXG5cclxuICBpZiAodHlwZW9mIHRhZyA9PT0gXCJmdW5jdGlvblwiKSB7XHJcbiAgICBsZXQgcmVzdWx0ID0gdGFnKHByb3BzKTtcclxuICAgIGlmIChyZXN1bHQgaW5zdGFuY2VvZiBKc3hOb2RlIHx8IChyZXN1bHQgJiYgcmVzdWx0LmFzTm9kZSkpIHtcclxuICAgICAgLy9jb25zb2xlLndhcm4oXCJhc1ZOb2RlIHdpdGggSnN4Tm9kZVwiKTtcclxuICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIH1cclxuICAgIC8vIGJpZyBAVE9ETzpcclxuICAgIGlmIChyZXN1bHQgaW5zdGFuY2VvZiBOb2RlKSB7XHJcbiAgICAgIHJldHVybiBuZXcgTGl2ZU5vZGVWTm9kZShyZXN1bHQpO1xyXG4gICAgICBjb25zdCBub2RlID0ge1xyXG4gICAgICAgIG5vZGU6IHVuZGVmaW5lZCxcclxuICAgICAgICB0YWc6IFwiX19OT0RFX19cIixcclxuICAgICAgICB0eXBlOiBcIj9cIixcclxuICAgICAgICBwYXJlbnQ6IG51bGwsXHJcbiAgICAgICAgcHJvcHM6IHtcclxuICAgICAgICAgIGNvbnRlbnQ6IHJlc3VsdCxcclxuICAgICAgICB9LFxyXG4gICAgICAgIGNoaWxkcmVuOiBbXSxcclxuICAgICAgICBhc05vZGUoKSB7XHJcbiAgICAgICAgICBub2RlLm5vZGUgPSByZXN1bHQ7XHJcbiAgICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZGlmZkFuZFBhdGNoKCkge1xyXG4gICAgICAgICAgY29uc29sZS5sb2coXCJfX05PREVfXyAxIGRpZmZBbmRQYXRjaFwiLCByZXN1bHQpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgIH07XHJcblxyXG4gICAgICByZXR1cm4gbm9kZTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBudWxsIGpzeCBub2RlXHJcbiAgICBpZiAoIXRydXRoeShyZXN1bHQpKSB7XHJcbiAgICAgIHJldHVybiBuZXcgTnVsbFZOb2RlKCApO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBuZXcgVGV4dFZOb2RlMihwcm9wcyk7XHJcbiAgfVxyXG5cclxuICBjb25zdCB7IGNoaWxkcmVuLCAuLi5hdHRyIH0gPSBwcm9wcztcclxuICBjb25zdCB2Tm9kZTogVk5vZGUgPSB7fSBhcyBhbnk7XHJcbiAgaWYgKHRhZykge1xyXG4gICAgcmV0dXJuIG5ldyBFbGVtZW50Vk5vZGUyKHRhZywgYXR0ciwgY2hpbGRyZW4pOyAvLyBvciBzaW1wbHkgcGFzcyBjaWxkcmVuIHdpdGggcHJvcHNcclxuXHJcbiAgfSBlbHNlIGlmICghdHJ1dGh5KGF0dHIpKSB7XHJcbiAgICBjb25zdCB2Tm9kZSA9IG5ldyBOdWxsVk5vZGUoKTsgLy8gQFRPRE86IHBhcmVudFxyXG4gICAgdk5vZGUucGFyZW50ID0gdGhpcztcclxuICAgIHJldHVybiB2Tm9kZTtcclxuICB9XHJcbiAgLy8gbm8gdGFnIChGcmFnbWVudCBhbmQgTnVsbD8pXHJcbiAgZWxzZSBpZiAoY2hpbGRyZW4pIHtcclxuICAgIGNvbnNvbGUubG9nKFwiRnJhZ21lbnQgVk5vZGVcIik7XHJcblxyXG4gICAgcmV0dXJuIG5ldyBGcmFnbWVudFZOb2RlKGNoaWxkcmVuKTtcclxuICB9XHJcblxyXG4gIC8vIGVsc2U/IC8vIEBUT0RPOj9cclxufVxyXG5cclxuZnVuY3Rpb24gYXNWTm9kZTIodGFnOiBzdHJpbmcgfCBGdW5jdGlvbiB8IHVuZGVmaW5lZCwgcHJvcHM6IEpzeFByb3BzKTogVk5vZGUge1xyXG4gIGNvbnNvbGUubG9nKFwiYXNWTm9kZTpcIiwgeyB0YWcsIHByb3BzIH0pO1xyXG5cclxuICBpZiAodHlwZW9mIHRhZyA9PT0gXCJmdW5jdGlvblwiKSB7XHJcbiAgICBsZXQgcmVzdWx0ID0gdGFnKHByb3BzKTtcclxuICAgIGlmIChyZXN1bHQgaW5zdGFuY2VvZiBKc3hOb2RlIHx8IChyZXN1bHQgJiYgcmVzdWx0LmFzTm9kZSkpIHtcclxuICAgICAgLy9jb25zb2xlLndhcm4oXCJhc1ZOb2RlIHdpdGggSnN4Tm9kZVwiKTtcclxuICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgICAgcmV0dXJuIChyZXN1bHQgYXMgSnN4Tm9kZUludGVyZmFjZSkuYXNWTm9kZSgpO1xyXG4gICAgfVxyXG4gICAgLy8gYmlnIEBUT0RPOlxyXG4gICAgaWYgKHJlc3VsdCBpbnN0YW5jZW9mIE5vZGUpIHtcclxuICAgICAgY29uc3Qgbm9kZSA9IHtcclxuICAgICAgICBub2RlOiB1bmRlZmluZWQsXHJcbiAgICAgICAgdGFnOiBcIl9fTk9ERV9fXCIsXHJcbiAgICAgICAgdHlwZTogXCI/XCIsXHJcbiAgICAgICAgcGFyZW50OiBudWxsLFxyXG4gICAgICAgIHByb3BzOiB7XHJcbiAgICAgICAgICBjb250ZW50OiByZXN1bHQsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBjaGlsZHJlbjogW10sXHJcbiAgICAgICAgYXNOb2RlKCkge1xyXG4gICAgICAgICAgbm9kZS5ub2RlID0gcmVzdWx0O1xyXG4gICAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGRpZmZBbmRQYXRjaCgpIHtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKFwiX19OT0RFX18gMSBkaWZmQW5kUGF0Y2hcIiwgcmVzdWx0KTtcclxuICAgICAgICB9LFxyXG4gICAgICB9O1xyXG5cclxuICAgICAgcmV0dXJuIG5vZGU7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gbnVsbCBqc3ggbm9kZVxyXG4gICAgaWYgKCF0cnV0aHkocmVzdWx0KSkge1xyXG4gICAgICByZXR1cm4gbmV3IE51bGxWTm9kZSh7IHBhcmVudDogbnVsbCB9KTtcclxuICAgICAgY29uc3QgZm9vTm9kZTogVk5vZGUgPSB7fSBhcyBhbnk7XHJcbiAgICAgIE9iamVjdC5hc3NpZ24oZm9vTm9kZSwge1xyXG4gICAgICAgIHRhZzogXCJfX05VTExfX1wiLFxyXG4gICAgICAgIHR5cGU6IFwiTnVsbFwiLFxyXG4gICAgICAgIHRhZzI6IFwidGFnIGZ1bmMgcmV0dXJuZWQgbnVsbCBub2RlXCIsXHJcbiAgICAgICAgbm9kZTogbnVsbCxcclxuICAgICAgICBwYXJlbnQ6IG51bGwsXHJcbiAgICAgICAgcHJvcHM6IHt9LFxyXG4gICAgICAgIGNoaWxkcmVuOiBbXSxcclxuICAgICAgICBhc05vZGUoKSB7XHJcbiAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGRpZmZBbmRQYXRjaChuZXdOb2RlOiBWTm9kZSkge1xyXG4gICAgICAgICAgcmV0dXJuIGRpZmZBbmRQYXRjaChmb29Ob2RlLCBuZXdOb2RlKTtcclxuICAgICAgICB9LFxyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIHJldHVybiBmb29Ob2RlO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBuZXcgVGV4dFZOb2RlMihwcm9wcyk7XHJcblxyXG4gICAgY29uc3Qgbm9kZSA9IHtcclxuICAgICAgdGFnOiBcIl9fVEVYVF9OT0RFX19cIixcclxuICAgICAgdHlwZTogXCJUZXh0Tm9kZVwiLFxyXG4gICAgICB0YWcxOiAxLFxyXG4gICAgICBub2RlOiBudWxsLFxyXG4gICAgICBwYXJlbnQ6IG51bGwsXHJcbiAgICAgIHByb3BzOiB7XHJcbiAgICAgICAgY29udGVudDogcmVzdWx0LFxyXG4gICAgICB9LFxyXG4gICAgICBjaGlsZHJlbjogW10sXHJcbiAgICAgIGFzTm9kZSgpIHtcclxuICAgICAgICBjb25zdCB0ZXh0Tm9kZSA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKHJlc3VsdCk7XHJcbiAgICAgICAgbm9kZS5ub2RlID0gdGV4dE5vZGU7XHJcbiAgICAgICAgcmV0dXJuIHRleHROb2RlO1xyXG4gICAgICB9LFxyXG4gICAgICBkaWZmQW5kUGF0Y2gobmV3Tm9kZSkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFxyXG4gICAgICAgICAgXCJfX1RFWFRfTk9ERV9fIDEgZGlmZkFuZFBhdGNoXCIsXHJcbiAgICAgICAgICByZXN1bHQsXHJcbiAgICAgICAgICBuZXdOb2RlLnByb3BzLmNvbnRlbnRcclxuICAgICAgICApO1xyXG5cclxuICAgICAgICByZXR1cm4gZGlmZkFuZFBhdGNoKG5vZGUsIG5ld05vZGUpO1xyXG5cclxuICAgICAgICAvLyBAVE9ETyBib3RoIHRleHRcclxuICAgICAgICBpZiAocmVzdWx0ICE9PSBuZXdOb2RlLnByb3BzLmNvbnRlbnQpXHJcbiAgICAgICAgICBub2RlLm5vZGUubm9kZVZhbHVlID0gbmV3Tm9kZS5wcm9wcy5jb250ZW50O1xyXG4gICAgICAgIC8vIGVsc2UgP1xyXG4gICAgICB9LFxyXG4gICAgfTtcclxuXHJcbiAgICByZXR1cm4gbm9kZTtcclxuICB9XHJcblxyXG4gIGNvbnN0IHsgY2hpbGRyZW4sIC4uLmF0dHIgfSA9IHByb3BzO1xyXG4gIGNvbnN0IHZOb2RlOiBWTm9kZSA9IHt9IGFzIGFueTtcclxuICBpZiAodGFnKSB7XHJcbiAgICByZXR1cm4gbmV3IEVsZW1lbnRWTm9kZTIodGFnLCBhdHRyLCBjaGlsZHJlbik7IC8vIG9yIHNpbXBseSBwYXNzIGNpbGRyZW4gd2l0aCBwcm9wc1xyXG4gICAgT2JqZWN0LmFzc2lnbih2Tm9kZSwge1xyXG4gICAgICB0YWcsXHJcbiAgICAgIHR5cGU6IFwiRWxlbWVudFwiLCAvLyB3aGVyZSBjb21lcyBGcmFnZW1udD9cclxuICAgICAgdGFnMjogXCJhc1ZOb2RlIC0gbm9ybWFsIHJldHVyblwiLFxyXG4gICAgICBub2RlOiBudWxsLFxyXG4gICAgICBwcm9wczogYXR0cixcclxuICAgICAgY2hpbGRyZW46IGNoaWxkcmVuLmZsYXQoKS5tYXAoKGNoaWxkKSA9PiB7XHJcbiAgICAgICAgaWYgKCFjaGlsZCkgY29uc29sZS5sb2coXCJjaGlsZCBudWxsaXNoXCIsIHsgY2hpbGQsIHZOb2RlIH0pO1xyXG4gICAgICAgIGlmIChjaGlsZCBpbnN0YW5jZW9mIEpzeE5vZGUgfHwgKGNoaWxkICYmIGNoaWxkLmFzTm9kZSkpIHtcclxuICAgICAgICAgIGNvbnN0IGNoaWxkVk5vZGUgPSBjaGlsZDsgLy9jaGlsZC5hc1ZOb2RlKCk7XHJcbiAgICAgICAgICBjaGlsZFZOb2RlLnBhcmVudCA9IHZOb2RlO1xyXG4gICAgICAgICAgcmV0dXJuIGNoaWxkVk5vZGU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChjaGlsZCBpbnN0YW5jZW9mIE5vZGUpIHtcclxuICAgICAgICAgIGNvbnN0IG5vZGUgPSB7XHJcbiAgICAgICAgICAgIHRhZzogXCJfX05PREVfX1wiLFxyXG4gICAgICAgICAgICBwcm9wczoge1xyXG4gICAgICAgICAgICAgIGNvbnRlbnQ6IGNoaWxkLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBwYXJlbnQ6IHZOb2RlLFxyXG4gICAgICAgICAgICBjaGlsZHJlbjogW10sXHJcbiAgICAgICAgICAgIGFzTm9kZSgpIHtcclxuICAgICAgICAgICAgICBub2RlLm5vZGUgPSBjaGlsZDtcclxuICAgICAgICAgICAgICByZXR1cm4gY2hpbGQ7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGRpZmZBbmRQYXRjaCgpIHtcclxuICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIl9fTk9ERV9fIGRpZmZBbmRQYXRjaFwiLCBjaGlsZCk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgIHJldHVybiBub2RlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc29sZS5sb2coXCJAQCBtYXBcIiwgeyBjaGlsZCB9KTtcclxuXHJcbiAgICAgICAgaWYgKGNoaWxkID09PSBudWxsIHx8IGNoaWxkID09PSBmYWxzZSB8fCBjaGlsZCA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICBjb25zdCBjaGlsZFZOb2RlOiBWTm9kZSA9IHtcclxuICAgICAgICAgICAgdGFnOiBcIl9fTlVMTF9fXCIsXHJcbiAgICAgICAgICAgIHR5cGU6IFwiTnVsbFwiLFxyXG4gICAgICAgICAgICB0YWcyOiBcImNoaWxkcmVuIG51bGwgbm9kZVwiLFxyXG4gICAgICAgICAgICBub2RlOiBudWxsLFxyXG4gICAgICAgICAgICBwYXJlbnQ6IHZOb2RlLFxyXG4gICAgICAgICAgICBwcm9wczoge30sXHJcbiAgICAgICAgICAgIGNoaWxkcmVuOiBbXSxcclxuICAgICAgICAgICAgYXNOb2RlKCkge1xyXG4gICAgICAgICAgICAgIHJldHVybiBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7IC8vcmV0dXJuIG51bGw7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGRpZmZBbmRQYXRjaChuZXdOb2RlOiBWTm9kZSkge1xyXG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiZGlmZi1BbmRQYXRjaCwgY2hpbGQgbm9kZSB3YXMgbnVsbFwiLCBuZXdOb2RlKTtcclxuXHJcbiAgICAgICAgICAgICAgaWYgKG5ld05vZGUudGFnID09PSBcIl9fTlVMTF9fXCIpIHJldHVybjtcclxuICAgICAgICAgICAgICBjb25zdCBuID0gbmV3Tm9kZS5hc05vZGUoKTtcclxuICAgICAgICAgICAgICAvLyBAVE9ETzogZmluZCBpdGVtIGJlZm9yZVxyXG4gICAgICAgICAgICAgIC8vdk5vZGUubm9kZVxyXG4gICAgICAgICAgICAgIGNvbnN0IG5ld05vZGVJbmRleCA9IG5ld05vZGUucGFyZW50LmNoaWxkcmVuLmluZGV4T2YobmV3Tm9kZSk7XHJcbiAgICAgICAgICAgICAgY29uc3Qgc2libGluZ3MgPSBuZXdOb2RlLnBhcmVudC5jaGlsZHJlblxyXG4gICAgICAgICAgICAgICAgLnNsaWNlKDAsIG5ld05vZGVJbmRleClcclxuICAgICAgICAgICAgICAgIC5yZXZlcnNlKCk7XHJcbiAgICAgICAgICAgICAgY29uc3Qgc2libGluZ0JlZm9yZSA9IHNpYmxpbmdzLmZpbmQoKG46IFZOb2RlKSA9PiBuLm5vZGUpO1xyXG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKHsgc2libGluZ0JlZm9yZSwgc2libGluZ3MsIG5ld05vZGVJbmRleCwgbmV3Tm9kZSB9KTtcclxuXHJcbiAgICAgICAgICAgICAgaWYgKHNpYmxpbmdCZWZvcmUpIHtcclxuICAgICAgICAgICAgICAgIHNpYmxpbmdCZWZvcmUubm9kZS5pbnNlcnRBZGphY2VudEVsZW1lbnQoXCJhZnRlcmVuZFwiLCBuKTtcclxuICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdk5vZGUubm9kZS5pbnNlcnRBZGphY2VudEVsZW1lbnQoXCJhZnRlcmJlZ2luXCIsIG4pO1xyXG4gICAgICAgICAgICAgICAgLyoobmV3Tm9kZS5wYXJlbnQubm9kZSBhcyBIVE1MRWxlbWVudCkuaW5zZXJ0QWRqYWNlbnRFbGVtZW50KFxyXG4gICAgICAgICAgICAgICAgXCJhZnRlcmJlZ2luXCIsXHJcbiAgICAgICAgICAgICAgICBuZXdOb2RlLmFzTm9kZSgpXHJcbiAgICAgICAgICAgICAgKTsqL1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgcmV0dXJuIGNoaWxkVk5vZGU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zb2xlLmxvZyhcIjo6OlwiLCB7IGNoaWxkIH0pO1xyXG5cclxuICAgICAgICBjb25zdCBub2RlID0ge1xyXG4gICAgICAgICAgdGFnOiBcIl9fVEVYVF9OT0RFX19cIixcclxuICAgICAgICAgIHR5cGU6IFwiVGV4dE5vZGVcIixcclxuICAgICAgICAgIHRhZzI6IFwiY2hpbGRyZW4gVGV4dCBub2RlIDNcIixcclxuICAgICAgICAgIG5vZGU6IG51bGwsXHJcbiAgICAgICAgICBwYXJlbnQ6IHZOb2RlLFxyXG4gICAgICAgICAgcHJvcHM6IHtcclxuICAgICAgICAgICAgY29udGVudDogY2hpbGQsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgY2hpbGRyZW46IFtdLFxyXG4gICAgICAgICAgYXNOb2RlKCkge1xyXG4gICAgICAgICAgICBjb25zdCB0ZXh0Tm9kZSA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNoaWxkKTtcclxuICAgICAgICAgICAgbm9kZS5ub2RlID0gdGV4dE5vZGU7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHRleHROb2RlLCBub2RlKTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiB0ZXh0Tm9kZTtcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICAvLyB0b3AgbGV2ZWwgdm5vZGVcclxuICAgICAgICAgIGRpZmZBbmRQYXRjaChuZXdOb2RlOiBWTm9kZSkge1xyXG4gICAgICAgICAgICAvLyBAVE9ETyBib3RoIHRleHQ/XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiY2hhbmdlPyBcIiwgbmV3Tm9kZS50YWcsIG5vZGUudGFnKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChuZXdOb2RlLnRhZyAhPT0gbm9kZS50YWcpIHtcclxuICAgICAgICAgICAgICBjb25zdCBhc05vZGUgPSBuZXdOb2RlLmFzTm9kZSgpO1xyXG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKHsgYXNOb2RlIH0pO1xyXG5cclxuICAgICAgICAgICAgICBpZiAoYXNOb2RlKSB7XHJcbiAgICAgICAgICAgICAgICBub2RlLm5vZGUucmVwbGFjZVdpdGgoYXNOb2RlKTtcclxuICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgbm9kZS5ub2RlLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQobm9kZS5ub2RlKTtcclxuICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoY2hpbGQgIT09IG5ld05vZGUucHJvcHMuY29udGVudClcclxuICAgICAgICAgICAgICBub2RlLm5vZGUubm9kZVZhbHVlID0gbmV3Tm9kZS5wcm9wcy5jb250ZW50O1xyXG4gICAgICAgICAgICBuZXdOb2RlLm5vZGUgPSBub2RlLm5vZGU7XHJcbiAgICAgICAgICAgIC8vIGVsc2UgP1xyXG4gICAgICAgICAgfSxcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICByZXR1cm4gbm9kZTtcclxuICAgICAgfSksXHJcblxyXG4gICAgICBhc05vZGUoKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJhc1ZOb2RlLmFzTm9kZVwiLCB7IHRhZywgcHJvcHMsIHZOb2RlIH0pO1xyXG5cclxuICAgICAgICBjb25zdCBub2RlID0gYXNOb2RlKHRhZywgYXR0ciwgdk5vZGUuY2hpbGRyZW4pWzBdO1xyXG4gICAgICAgIHZOb2RlLm5vZGUgPSBub2RlO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHsgbm9kZSB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIG5vZGU7XHJcbiAgICAgIH0sXHJcbiAgICAgIC8vIHRvIGxldmVsXHJcbiAgICAgIGRpZmZBbmRQYXRjaChuZXdWTm9kZTogVk5vZGUpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcImRpZmZBbmRQYXRjaFwiKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGRpZmZBbmRQYXRjaCh2Tm9kZSwgbmV3Vk5vZGUpO1xyXG5cclxuICAgICAgICAvLyA/IHdoZW4/XHJcbiAgICAgICAgaWYgKCFuZXdWTm9kZSkge1xyXG4gICAgICAgICAgKHZOb2RlLm5vZGUhIGFzIEhUTUxFbGVtZW50KS5wYXJlbnROb2RlIS5yZW1vdmVDaGlsZChcclxuICAgICAgICAgICAgdk5vZGUubm9kZSEgYXMgSFRNTEVsZW1lbnRcclxuICAgICAgICAgICk7XHJcbiAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAobmV3Vk5vZGUudGFnICE9PSB0YWcpIHtcclxuICAgICAgICAgIGNvbnN0IG5ld05vZGUgPSBuZXdWTm9kZS5hc05vZGUoKTtcclxuICAgICAgICAgIGlmICh2Tm9kZS5ub2RlKSB7XHJcbiAgICAgICAgICAgIGlmIChuZXdOb2RlKSAodk5vZGUubm9kZSEgYXMgSFRNTEVsZW1lbnQpLnJlcGxhY2VXaXRoKG5ld05vZGUpO1xyXG4gICAgICAgICAgICBlbHNlIHZOb2RlLm5vZGUucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCh2Tm9kZS5ub2RlKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIEBUT0RPOiBpZiBzcGVjaWFsIHRhZ3NcclxuXHJcbiAgICAgICAgLy8gdXBkYXRlIHByb3BzIGZvcm0gbmV3IG5vZGVcclxuICAgICAgICBPYmplY3QuZW50cmllcyhuZXdWTm9kZS5wcm9wcylcclxuICAgICAgICAgIC5maWx0ZXIoKFtrLCB2XSkgPT4gcHJvcHNba10gIT09IHYpXHJcbiAgICAgICAgICAuZm9yRWFjaCgoW2tleSwgdmFsdWVdKSA9PiB7XHJcbiAgICAgICAgICAgIGlmICh2YWx1ZSA9PT0gdHJ1ZSkgdk5vZGUubm9kZS5zZXRBdHRyaWJ1dGUoa2V5LCBcIlwiKTtcclxuICAgICAgICAgICAgZWxzZSBpZiAodmFsdWUgPT09IG51bGwgfHwgdmFsdWUgPT09IHVuZGVmaW5lZCB8fCB2YWx1ZSA9PT0gZmFsc2UpXHJcbiAgICAgICAgICAgICAgdk5vZGUubm9kZS5yZW1vdmVBdHRyaWJ1dGUoa2V5KTtcclxuICAgICAgICAgICAgZWxzZSB2Tm9kZS5ub2RlLnNldEF0dHJpYnV0ZShrZXksIHZhbHVlKTtcclxuICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvLyByZW1vdmUgb2xkLCBvYnNvbGF0ZSBhdHRyaWJ1dGVzXHJcbiAgICAgICAgT2JqZWN0LmVudHJpZXModk5vZGUucHJvcHMpXHJcbiAgICAgICAgICAuZmlsdGVyKChbaywgdl0pID0+ICFuZXdWTm9kZS5wcm9wcy5oYXNPd25Qcm9wZXJ0eShrKSlcclxuICAgICAgICAgIC5mb3JFYWNoKChba2V5LCB2YWx1ZV0pID0+IHtcclxuICAgICAgICAgICAgdk5vZGUubm9kZS5yZW1vdmVBdHRyaWJ1dGUoa2V5KTtcclxuICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICBuZXdWTm9kZS5ub2RlID0gdk5vZGUubm9kZTtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIm5vZGUgdXBkYXRlXCIsIG5ld1ZOb2RlLCB2Tm9kZSk7XHJcblxyXG4gICAgICAgIC8vIEBUT0RPOiBwcm9wcyBub3QgYXR0cmlidXRlc1xyXG5cclxuICAgICAgICAvLyBjaGlsZHJlblxyXG4gICAgICAgIHZOb2RlLmNoaWxkcmVuLmZvckVhY2goKGNoaWxkLCBpeCkgPT5cclxuICAgICAgICAgIGNoaWxkLmRpZmZBbmRQYXRjaChuZXdWTm9kZS5jaGlsZHJlbltpeF0pXHJcbiAgICAgICAgKTtcclxuICAgICAgICAvLyBAVE9ETzogbmV3IGNoaWxkcmVuXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IHZOb2RlLmNoaWxkcmVuLmxlbmd0aDsgaSA8IG5ld1ZOb2RlLmNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICB2Tm9kZS5ub2RlLmluc2VydEFkamFjZW50RWxlbWVudChcclxuICAgICAgICAgICAgXCJiZWZvcmVlbmRcIixcclxuICAgICAgICAgICAgbmV3Vk5vZGUuY2hpbGRyZW5baV0uYXNOb2RlKClcclxuICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9LFxyXG4gICAgfSk7XHJcbiAgfSBlbHNlIGlmICghdHJ1dGh5KGF0dHIpKSB7XHJcbiAgICByZXR1cm4gbmV3IE51bGxWTm9kZSgpOyAvLyBAVE9ETzogcGFyZW50XHJcbiAgfVxyXG4gIC8vIG5vIHRhZyAoRnJhZ21lbnQgYW5kIE51bGw/KVxyXG4gIGVsc2UgaWYgKGNoaWxkcmVuKSB7XHJcbiAgICBjb25zb2xlLmxvZyhcIkZyYWdtZW50IFZOb2RlXCIpO1xyXG5cclxuICAgIHJldHVybiBuZXcgRnJhZ21lbnRWTm9kZShjaGlsZHJlbik7XHJcblxyXG4gICAgT2JqZWN0LmFzc2lnbih2Tm9kZSwge1xyXG4gICAgICB0YWcsXHJcbiAgICAgIHR5cGU6IFwiRnJhZ21lbnRcIiwgLy8gd2hlcmUgY29tZXMgRnJhZ21lbnQ/XHJcbiAgICAgIHRhZzI6IFwiYXNWTm9kZSAtIG5vcm1hbCByZXR1cm4gRnJhZ21lbnRcIixcclxuICAgICAgbm9kZTogbnVsbCxcclxuICAgICAgY2hpbGRyZW46IGNoaWxkcmVuLmZsYXQoKS5tYXAoKGNoaWxkKSA9PiB7XHJcbiAgICAgICAgaWYgKGNoaWxkIGluc3RhbmNlb2YgSnN4Tm9kZSB8fCAoY2hpbGQgJiYgY2hpbGQuYXNOb2RlKSkge1xyXG4gICAgICAgICAgY29uc3QgY2hpbGRWTm9kZSA9IGNoaWxkOyAvL2NoaWxkLmFzVk5vZGUoKTtcclxuICAgICAgICAgIGNoaWxkVk5vZGUucGFyZW50ICA9IHZOb2RlO1xyXG4gICAgICAgICAgcmV0dXJuIGNoaWxkVk5vZGU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChjaGlsZCBpbnN0YW5jZW9mIE5vZGUpIHtcclxuICAgICAgICAgIGNvbnN0IG5vZGUgPSB7XHJcbiAgICAgICAgICAgIHRhZzogXCJfX05PREVfX1wiLFxyXG4gICAgICAgICAgICBwcm9wczoge1xyXG4gICAgICAgICAgICAgIGNvbnRlbnQ6IGNoaWxkLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBwYXJlbnQ6IHZOb2RlLFxyXG4gICAgICAgICAgICBjaGlsZHJlbjogW10sXHJcbiAgICAgICAgICAgIGFzTm9kZSgpIHtcclxuICAgICAgICAgICAgICBub2RlLm5vZGUgPSBjaGlsZDtcclxuICAgICAgICAgICAgICByZXR1cm4gY2hpbGQ7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGRpZmZBbmRQYXRjaCgpIHtcclxuICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIl9fTk9ERV9fIGRpZmZBbmRQYXRjaFwiLCBjaGlsZCk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgIHJldHVybiBub2RlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc29sZS5sb2coXCJAQCBtYXAgMlwiLCB7IGNoaWxkIH0pO1xyXG5cclxuICAgICAgICBpZiAoY2hpbGQgPT09IG51bGwgfHwgY2hpbGQgPT09IGZhbHNlIHx8IGNoaWxkID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgIGNvbnN0IG4gPSBuZXcgTnVsbFZOb2RlKHRoaXMpOyAvLyBuLnBhcmVtdCA9XHJcbiAgICAgICAgICByZXR1cm4gbjtcclxuXHJcbiAgICAgICAgICBjb25zdCBjaGlsZFZOb2RlOiBWTm9kZSA9IHtcclxuICAgICAgICAgICAgdGFnOiBcIl9fTlVMTF9fXCIsXHJcbiAgICAgICAgICAgIHR5cGU6IFwiTnVsbFwiLFxyXG4gICAgICAgICAgICB0YWcyOiBcImNoaWxkcmVuIG51bGwgbm9kZVwiLFxyXG4gICAgICAgICAgICBub2RlOiBudWxsLFxyXG4gICAgICAgICAgICBwYXJlbnQ6IHZOb2RlLFxyXG4gICAgICAgICAgICBwcm9wczoge30sXHJcbiAgICAgICAgICAgIGNoaWxkcmVuOiBbXSxcclxuICAgICAgICAgICAgYXNOb2RlKCkge1xyXG4gICAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBkaWZmQW5kUGF0Y2gobmV3Tm9kZTogVk5vZGUpIHtcclxuICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImRpZmYtQW5kUGF0Y2gsIGNoaWxkIG5vZGUgd2FzIG51bGxcIiwgbmV3Tm9kZSk7XHJcblxyXG4gICAgICAgICAgICAgIGlmIChuZXdOb2RlLnRhZyA9PT0gXCJfX05VTExfX1wiKSByZXR1cm47XHJcbiAgICAgICAgICAgICAgY29uc3QgbiA9IG5ld05vZGUuYXNOb2RlKCk7XHJcbiAgICAgICAgICAgICAgLy8gQFRPRE86IGZpbmQgaXRlbSBiZWZvcmVcclxuICAgICAgICAgICAgICAvL3ZOb2RlLm5vZGVcclxuICAgICAgICAgICAgICBjb25zdCBuZXdOb2RlSW5kZXggPSBuZXdOb2RlLnBhcmVudC5jaGlsZHJlbi5pbmRleE9mKG5ld05vZGUpO1xyXG4gICAgICAgICAgICAgIGNvbnN0IHNpYmxpbmdzID0gbmV3Tm9kZS5wYXJlbnQuY2hpbGRyZW5cclxuICAgICAgICAgICAgICAgIC5zbGljZSgwLCBuZXdOb2RlSW5kZXgpXHJcbiAgICAgICAgICAgICAgICAucmV2ZXJzZSgpO1xyXG4gICAgICAgICAgICAgIGNvbnN0IHNpYmxpbmdCZWZvcmUgPSBzaWJsaW5ncy5maW5kKChuOiBWTm9kZSkgPT4gbi5ub2RlKTtcclxuICAgICAgICAgICAgICBjb25zb2xlLmxvZyh7IHNpYmxpbmdCZWZvcmUsIHNpYmxpbmdzLCBuZXdOb2RlSW5kZXgsIG5ld05vZGUgfSk7XHJcblxyXG4gICAgICAgICAgICAgIGlmIChzaWJsaW5nQmVmb3JlKSB7XHJcbiAgICAgICAgICAgICAgICBzaWJsaW5nQmVmb3JlLm5vZGUuaW5zZXJ0QWRqYWNlbnRFbGVtZW50KFwiYWZ0ZXJlbmRcIiwgbik7XHJcbiAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHZOb2RlLm5vZGUuaW5zZXJ0QWRqYWNlbnRFbGVtZW50KFwiYWZ0ZXJiZWdpblwiLCBuKTtcclxuICAgICAgICAgICAgICAgIC8qKG5ld05vZGUucGFyZW50Lm5vZGUgYXMgSFRNTEVsZW1lbnQpLmluc2VydEFkamFjZW50RWxlbWVudChcclxuICAgICAgICAgICAgICAgICAgXCJhZnRlcmJlZ2luXCIsXHJcbiAgICAgICAgICAgICAgICAgIG5ld05vZGUuYXNOb2RlKClcclxuICAgICAgICAgICAgICAgICk7Ki9cclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgIHJldHVybiBjaGlsZFZOb2RlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc29sZS5sb2coXCI6OjpcIiwgeyBjaGlsZCB9KTtcclxuXHJcbiAgICAgICAgY29uc3Qgbm9kZSA9IHtcclxuICAgICAgICAgIHRhZzogXCJfX1RFWFRfTk9ERV9fXCIsXHJcbiAgICAgICAgICB0eXBlOiBcIlRleHROb2RlXCIsXHJcbiAgICAgICAgICB0YWcyOiBcImNoaWxkcmVuIFRleHQgbm9kZVwiLFxyXG4gICAgICAgICAgbm9kZTogbnVsbCxcclxuICAgICAgICAgIHBhcmVudDogdk5vZGUsXHJcbiAgICAgICAgICBwcm9wczoge1xyXG4gICAgICAgICAgICBjb250ZW50OiBjaGlsZCxcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICBjaGlsZHJlbjogW10sXHJcbiAgICAgICAgICBhc05vZGUoKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHRleHROb2RlID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY2hpbGQpO1xyXG4gICAgICAgICAgICBub2RlLm5vZGUgPSB0ZXh0Tm9kZTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2codGV4dE5vZGUsIG5vZGUpO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHRleHROb2RlO1xyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIC8vIHRvcCBsZXZlbCB2bm9kZVxyXG4gICAgICAgICAgZGlmZkFuZFBhdGNoKG5ld05vZGU6IFZOb2RlKSB7XHJcbiAgICAgICAgICAgIC8vIEBUT0RPIGJvdGggdGV4dD9cclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJjaGFuZ2U/IFwiLCBuZXdOb2RlLnRhZywgbm9kZS50YWcpO1xyXG5cclxuICAgICAgICAgICAgaWYgKG5ld05vZGUudGFnICE9PSBub2RlLnRhZykge1xyXG4gICAgICAgICAgICAgIGNvbnN0IGFzTm9kZSA9IG5ld05vZGUuYXNOb2RlKCk7XHJcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coeyBhc05vZGUgfSk7XHJcblxyXG4gICAgICAgICAgICAgIGlmIChhc05vZGUpIHtcclxuICAgICAgICAgICAgICAgIG5vZGUubm9kZS5yZXBsYWNlV2l0aChhc05vZGUpO1xyXG4gICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBub2RlLm5vZGUucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChub2RlLm5vZGUpO1xyXG4gICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChjaGlsZCAhPT0gbmV3Tm9kZS5wcm9wcy5jb250ZW50KVxyXG4gICAgICAgICAgICAgIG5vZGUubm9kZS5ub2RlVmFsdWUgPSBuZXdOb2RlLnByb3BzLmNvbnRlbnQ7XHJcbiAgICAgICAgICAgIG5ld05vZGUubm9kZSA9IG5vZGUubm9kZTtcclxuICAgICAgICAgICAgLy8gZWxzZSA/XHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHJldHVybiBub2RlO1xyXG4gICAgICB9KSxcclxuXHJcbiAgICAgIGFzTm9kZSgpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcImFzVk5vZGUuYXNOb2RlXCIsIHsgdGFnLCBwcm9wcywgdk5vZGUgfSk7XHJcblxyXG4gICAgICAgIGNvbnN0IG5vZGUgPSBhc05vZGUodW5kZWZpbmVkLCB7fSwgdk5vZGUuY2hpbGRyZW4pWzBdO1xyXG4gICAgICAgIC8vIHZOb2RlLm5vZGUgPSBub2RlO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHsgbm9kZSB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIG5vZGU7XHJcbiAgICAgIH0sXHJcbiAgICAgIC8vIHRvIGxldmVsXHJcbiAgICAgIGRpZmZBbmRQYXRjaChuZXdWTm9kZTogVk5vZGUpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcImRpZmZBbmRQYXRjaFwiKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGRpZmZBbmRQYXRjaCh2Tm9kZSwgbmV3Vk5vZGUpO1xyXG4gICAgICB9LFxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBjb25zb2xlLmxvZyh7IHZOb2RlIH0pO1xyXG5cclxuICByZXR1cm4gdk5vZGU7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBjb252ZXJ0cyBwcmFnbWEgb2JqZWN0IHRvIGh0bWwgc3RyaW5nXHJcbiAqIGpzeHMgaXMgYWx3YXlzIGNhbGxlZCB3aGVuIGVsZW1lbnQgaGFzIG1vcmUgdGhhbiBvbmUgY2hpbGRcclxuICpcclxuICogQHBhcmFtIHtzdHJpbmcgfCBGdW5jdGlvbn0gdGFnIC0gdGFnIG5hbWUgb3IgdGFnIGNsYXNzXHJcbiAqIEBwYXJhbSB7T2JqZWN0IHwgbnVsbH0gcHJvcHMgLSBwcm9wcyBmb3IgdGhlIHRhZ1xyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGpzeHMoXHJcbiAgdGFnOiBzdHJpbmcgfCBGdW5jdGlvbixcclxuICBwcm9wczogSnN4UHJvcHNcclxuKTogSnN4Tm9kZUludGVyZmFjZSB7XHJcbiAgbGV0IG5vZGU6IE5vZGU7XHJcbiAgbGV0IGpzeE5vZGVzOiBKc3hOb2RlSW50ZXJmYWNlW107XHJcbiAgcHJvcHMuY2hpbGRyZW4gPSBwcm9wcy5jaGlsZHJlbi5mbGF0KCk7IC8vIEBUT0RPOiBkb2NcclxuXHJcbiAgLy8gaWYgcmVmIHByb3AgaXMgcHJvdmlkZWQsIG1lbW9yaXplIGFuZCByZW1vdmUgZnJvbSB0aGUgaHRtbCBnZW5lcmF0aW9uIHByb2Nlc3NcclxuICBjb25zdCByZWY6IEZ1bmN0aW9uIHwgbnVsbCA9XHJcbiAgICB0eXBlb2YgcHJvcHMucmVmID09PSBcImZ1bmN0aW9uXCIgPyBwcm9wcy5yZWYgOiBudWxsO1xyXG4gIGlmIChyZWYpIGRlbGV0ZSBwcm9wcy5yZWY7XHJcbiAgLypcclxuICBjb25zdCBpbnN0ID0gbmV3IChjbGFzcyBleHRlbmRzIEpzeE5vZGUgaW1wbGVtZW50cyBKc3hOb2RlSW50ZXJmYWNlIHtcclxuICAgIHRvU3RyaW5nKCkge1xyXG4gICAgICByZXR1cm4gYXNIdG1sU3RyaW5nKHRhZywgdGhpcy5wcm9wcyk7XHJcbiAgICB9XHJcblxyXG4gICAgYXNOb2RlKCkge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJkZXByZWNhdGVkIGpzeHNcIik7XHJcbiAgICAgIFtub2RlLCBqc3hOb2Rlc10gPSBhc05vZGUodGFnLCB0aGlzLnByb3BzKTtcclxuXHJcbiAgICAgIHJldHVybiBub2RlO1xyXG4gICAgfVxyXG4gICAgYXNWTm9kZSgpIHtcclxuICAgICAgcmV0dXJuIGFzVk5vZGUodGFnLCB0aGlzLnByb3BzKTtcclxuICAgIH1cclxuXHJcbiAgICBbX2NhbGxSZWZzXSgpIHtcclxuICAgICAgaWYgKHJlZiAmJiBub2RlKSByZWYobm9kZSk7XHJcblxyXG4gICAgICBpZiAodHlwZW9mIHRhZyA9PT0gXCJmdW5jdGlvblwiKSB7XHJcbiAgICAgICAganN4Tm9kZXMuZm9yRWFjaCgobm9kZUl0ZW0pID0+IG5vZGVJdGVtW19jYWxsUmVmc10oKSk7XHJcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5wcm9wcy5jaGlsZHJlbikge1xyXG4gICAgICAgIHRoaXMucHJvcHMuY2hpbGRyZW5cclxuICAgICAgICAgIC5mbGF0KClcclxuICAgICAgICAgIC5maWx0ZXIoXHJcbiAgICAgICAgICAgIChjaGlsZCkgPT4gY2hpbGQgaW5zdGFuY2VvZiBKc3hOb2RlIHx8IChjaGlsZCAmJiBjaGlsZC5hc05vZGUpXHJcbiAgICAgICAgICApXHJcbiAgICAgICAgICAuZm9yRWFjaCgoY2hpbGQpID0+IChjaGlsZCBhcyBKc3hOb2RlSW50ZXJmYWNlKVtfY2FsbFJlZnNdKCkpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSkocHJvcHMpO1xyXG5cclxuICBjb25zdCB2ID0gaW5zdC5hc1ZOb2RlKCk7Ki9cclxuICByZXR1cm4gYXNWTm9kZSh0YWcsIHByb3BzKTtcclxuICByZXR1cm4gdjtcclxufVxyXG5cclxuLyoqXHJcbiAqIGNvbnZlcnRzIHRoZSBmcmFnbWVudHMgb2JqZWN0IHRvIG5vZGVzXHJcbiAqXHJcbiAqIEBwYXJhbSB7T2JqZWN0fSBwcm9wc1xyXG4gKiBAcGFyYW0ge0FycmF5fSBwcm9wcy5jaGlsZHJlbiAtIGNoaWxkIGVsZW1lbnRzIGluIHRoZSBmcmFnbWVudFxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIEZyYWdtZW50KHByb3BzOiBKc3hQcm9wcykge1xyXG4gIC8qY29uc3QgaW5zdCA9IG5ldyAoY2xhc3MgZXh0ZW5kcyBKc3hOb2RlIGltcGxlbWVudHMgSnN4Tm9kZUludGVyZmFjZSB7XHJcbiAgICB0b1N0cmluZygpIHtcclxuICAgICAgcmV0dXJuIHRoaXMucHJvcHMuY2hpbGRyZW5cclxuICAgICAgICAuZmxhdCgpXHJcbiAgICAgICAgLmZpbHRlcih0cnV0aHkpXHJcbiAgICAgICAgLm1hcCgoY2hpbGQpID0+XHJcbiAgICAgICAgICBjaGlsZCBpbnN0YW5jZW9mIE5vZGVcclxuICAgICAgICAgICAgPyBnZXRPdXRlckh0bWwoY2hpbGQpXHJcbiAgICAgICAgICAgIDogdHlwZW9mIGNoaWxkID09PSBcIm9iamVjdFwiXHJcbiAgICAgICAgICAgID8gY2hpbGQudG9TdHJpbmcoKVxyXG4gICAgICAgICAgICA6IHNhbml0aXplKGNoaWxkKVxyXG4gICAgICAgIClcclxuICAgICAgICAuam9pbihcIlwiKTtcclxuICAgIH1cclxuXHJcbiAgICBhc05vZGUoKSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcihcImRlcHJlY2F0ZWQgZnJhZ21lbnRcIik7XHJcbiAgICAgIGNvbnN0IGZyYWdtZW50cyA9IHRoaXMucHJvcHMuY2hpbGRyZW5cclxuICAgICAgICAuZmxhdCgpXHJcbiAgICAgICAgLmZpbHRlcih0cnV0aHkpXHJcbiAgICAgICAgLm1hcCgoaXRlbSkgPT5cclxuICAgICAgICAgIGl0ZW0gaW5zdGFuY2VvZiBOb2RlXHJcbiAgICAgICAgICAgID8gaXRlbVxyXG4gICAgICAgICAgICA6IGl0ZW0gaW5zdGFuY2VvZiBKc3hOb2RlIHx8IChpdGVtICYmIGl0ZW0uYXNOb2RlKVxyXG4gICAgICAgICAgICA/IGl0ZW0uYXNOb2RlKClcclxuICAgICAgICAgICAgOiBpdGVtXHJcbiAgICAgICAgKTtcclxuXHJcbiAgICAgIGNvbnN0IGRvY3VtZW50RnJhZ21lbnQgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XHJcblxyXG4gICAgICBkb2N1bWVudEZyYWdtZW50LmFwcGVuZCguLi5mcmFnbWVudHMpO1xyXG4gICAgICByZXR1cm4gZG9jdW1lbnRGcmFnbWVudDtcclxuICAgIH1cclxuXHJcbiAgICBhc1ZOb2RlKCkge1xyXG4gICAgICByZXR1cm4gYXNWTm9kZSgvKlwiX19GcmFnbWVudF9fXCIqIC8gdW5kZWZpbmVkLCB0aGlzLnByb3BzKTtcclxuICAgIH1cclxuXHJcbiAgICBbX2NhbGxSZWZzXSgpIHtcclxuICAgICAgdGhpcy5wcm9wcy5jaGlsZHJlblxyXG4gICAgICAgIC5maWx0ZXIoKGNoaWxkKSA9PiBjaGlsZCBpbnN0YW5jZW9mIEpzeE5vZGUgfHwgKGNoaWxkICYmIGNoaWxkLmFzTm9kZSkpXHJcbiAgICAgICAgLmZvckVhY2goKGNoaWxkKSA9PiAoY2hpbGQgYXMgSnN4Tm9kZUludGVyZmFjZSlbX2NhbGxSZWZzXSgpKTtcclxuICAgIH1cclxuICB9KShwcm9wcyk7Ki9cclxuXHJcbiAgLy9yZXR1cm4gaW5zdC5hc1ZOb2RlKCk7XHJcbiAgcmV0dXJuIGFzVk5vZGUodW5kZWZpbmVkLCBwcm9wcyk7XHJcbn1cclxuXHJcbi8vIGpzeCBpcyBjYWxsZWQgd2hlbiB0aGUgZWxlbWVudCBoYXMgb25lIG9yIHplcm8gY2hpbGRyZW5cclxuZXhwb3J0IGZ1bmN0aW9uIGpzeChcclxuICB0YWc6IHN0cmluZyB8IEZ1bmN0aW9uLFxyXG4gIHByb3BzOiBBdHRyaWJ1dGVzICZcclxuICAgIFNwZWNpYWxBdHRyaWJ1dGVzICYgeyBjaGlsZHJlbj86IHN0cmluZyB8IE5vZGUgfCBKc3hOb2RlSW50ZXJmYWNlIH1cclxuKTogSnN4Tm9kZUludGVyZmFjZSB7XHJcbiAgLy8gQHRzLWlnbm9yZSAtIHdyYXBwaW5nIHRoZSBjaGlsZHJlbiBhcyBhcnJheSB0byByZS11c2UganN4cyBtZXRob2RcclxuICBwcm9wcy5jaGlsZHJlbiA9IHByb3BzLmhhc093blByb3BlcnR5KFwiY2hpbGRyZW5cIikgPyBbcHJvcHMuY2hpbGRyZW5dIDogW107XHJcblxyXG4gIHJldHVybiBqc3hzKHRhZywgKHByb3BzIGFzIHVua25vd24pIGFzIEpzeFByb3BzKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIHJlbmRlciB0aGUgZ2l2ZW4gbWFya3VwIGludG8gdGhlIGdpdmVuIGRvbSBub2RlXHJcbiAqXHJcbiAqIEBwYXJhbSB7c3RyaW5nfEhUTUxFbGVtZW50fEpTWH0gbWFya3VwIC0gaHRtbCBhcyBzdHJpbmcsIGh0bWwgZWxlbWVudCBvciBqc3ggdGVtcGxhdGVcclxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZG9tTm9kZSAtIGNvbnRhaW5lciBmb3IgdGhlIHRlbXBsYXRlIHRvIGJlIHJlbmRlcmVkIGludG9cclxuICogQHBhcmFtIHtib29sZWFufSBbYXBwZW5kPWZhbHNlXSAtIHNob3VsZCB0aGUgcHJvdmlkZWQgbWFya3VwIGJlIGFwcGVuZGVkIHRvIHRoZSBleGlzdGluZyBtYXJrdXAsIG9yIGRlZmF1bHQgcmVwbGFjZSBpdFxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHJlbmRlcihcclxuICBtYXJrdXA6IHN0cmluZyB8IEhUTUxFbGVtZW50IHwgSnN4Tm9kZUludGVyZmFjZSwgLy8gQFRPRE86IHNwZWNpZmljIHN1cHBvcnQgZm9yIFRlbXBsYXRlPyAoLmNvbnRlbnQuY2xvbmUpXHJcbiAgZG9tTm9kZTogSFRNTEVsZW1lbnQsXHJcbiAgYXBwZW5kOiBib29sZWFuID0gZmFsc2VcclxuKSB7XHJcbiAgQXJyYXkuZnJvbShkb2N1bWVudC5ib2R5LnF1ZXJ5U2VsZWN0b3JBbGwoXCIqXCIpKS5mb3JFYWNoKFxyXG4gICAgKGVsKSA9PiAoZWwuc3R5bGUuYmFja2dyb3VuZCA9IFwiI2NjZmZjY1wiKVxyXG4gICk7XHJcblxyXG4gIHJlZnNUb0NhbGwuc3BsaWNlKDApO1xyXG5cclxuICBjb25zdCBpc1JlUmVuZGVyID0gcmVuZGVyZWRWVHJlZXMuaGFzKGRvbU5vZGUpO1xyXG4gIGlmICghYXBwZW5kICYmICFpc1JlUmVuZGVyKSBkb21Ob2RlLmlubmVySFRNTCA9IFwiXCI7XHJcblxyXG4gIGlmICh0eXBlb2YgbWFya3VwID09PSBcInN0cmluZ1wiKSB7XHJcbiAgICBkb21Ob2RlLmluc2VydEFkamFjZW50SFRNTChcImJlZm9yZWVuZFwiLCBtYXJrdXApOyAvLyBzYW5pdGl6ZT9cclxuICB9IGVsc2UgaWYgKG1hcmt1cCBpbnN0YW5jZW9mIE5vZGUpIHtcclxuICAgIGRvbU5vZGUuaW5zZXJ0QWRqYWNlbnRFbGVtZW50KFwiYmVmb3JlZW5kXCIsIG1hcmt1cCk7XHJcbiAgfSBlbHNlIGlmIChtYXJrdXAgaW5zdGFuY2VvZiBKc3hOb2RlIHx8IChtYXJrdXAgJiYgbWFya3VwLmFzTm9kZSkpIHtcclxuICAgIHN2Z0NvbnRleHQgPSBmYWxzZTtcclxuXHJcbiAgICAvLyBSb290Vk5vZGVcclxuICAgIC8qY29uc3QgdlRyZWU6IFJvb3RWTm9kZSA9IHt9IGFzIGFueTtcclxuICAgIE9iamVjdC5hc3NpZ24odlRyZWUsIHtcclxuICAgICAgdHlwZTogXCJSb290XCIsXHJcbiAgICAgIG5vZGU6IGRvbU5vZGUsXHJcbiAgICAgIHRhZzogbnVsbCxcclxuICAgICAgcGFyZW50OiBudWxsLFxyXG4gICAgICBjaGlsZHJlbjogW21hcmt1cF0sIC8vW21hcmt1cC5hc1ZOb2RlKCldLFxyXG4gICAgICBhc05vZGUoKSB7XHJcbiAgICAgICAgcmV0dXJuIHZUcmVlLmNoaWxkcmVuWzBdLmFzTm9kZSgpO1xyXG4gICAgICB9LFxyXG4gICAgICB0b1N0cmluZygpIHtcclxuICAgICAgICByZXR1cm4gdlRyZWUuY2hpbGRyZW5bMF0udG9TdHJpbmcoKTtcclxuICAgICAgfSxcclxuICAgIH0pO1xyXG4gICAgdlRyZWUuY2hpbGRyZW5bMF0ucGFyZW50ICA9IHZUcmVlOyovXHJcblxyXG4gICAgY29uc3QgdlRyZWUgPSBuZXcgUm9vdFZOb2RlMihtYXJrdXAsIGRvbU5vZGUpO1xyXG5cclxuICAgIGNvbnNvbGUubG9nKFwiIyMjIyMjIyMjIyNcXG5cIiwgXCJ2VHJlZTpcIiwgdlRyZWUpO1xyXG5cclxuICAgIGlmIChpc1JlUmVuZGVyKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwiaXMgcmUtcmVuZGVyXCIpO1xyXG4gICAgICBjb25zdCBvbGRWVHJlZSA9IHJlbmRlcmVkVlRyZWVzLmdldChkb21Ob2RlKTtcclxuXHJcbiAgICAgIGNvbnNvbGUubG9nKFwiIyMjIyMjIyMjIyNcXG5cIiwgeyBvbGRWVHJlZSwgbmV3VlRyZWU6IHZUcmVlIH0pO1xyXG5cclxuICAgICAgLy8gZGlmZlxyXG4gICAgICBvbGRWVHJlZS5kaWZmQW5kUGF0Y2godlRyZWUpO1xyXG4gICAgICAvL2RpZmZBbmRQYXRjaChvbGRWVHJlZSEsIHZUcmVlKTtcclxuXHJcbiAgICAgIHJlbmRlcmVkVlRyZWVzLnNldChkb21Ob2RlLCB2VHJlZSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjb25zdCBjb250ZW50ID0gdlRyZWUuYXNOb2RlKCk7XHJcbiAgICAgIGRvbU5vZGUuYXBwZW5kKGNvbnRlbnQpO1xyXG4gICAgfVxyXG5cclxuICAgIHJlbmRlcmVkVlRyZWVzLnNldChkb21Ob2RlLCB2VHJlZSk7XHJcblxyXG4gICAgcmVmc1RvQ2FsbC5mb3JFYWNoKChjYikgPT4gY2IoKSk7XHJcblxyXG4gICAgLy8vL21hcmt1cFtfY2FsbFJlZnNdKCk7XHJcbiAgfSBlbHNlIHtcclxuICAgIHRocm93IG5ldyBFcnJvcihcInJlbmRlciBtZXRob2QgY2FsbGVkIHdpdGggd3JvbmcgYXJndW1lbnQocylcIik7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gcmF3SHRtbChjb250ZW50OiBzdHJpbmcpOiBKc3hOb2RlSW50ZXJmYWNlIHtcclxuICByZXR1cm4gbmV3IChjbGFzcyBleHRlbmRzIEpzeE5vZGUgaW1wbGVtZW50cyBKc3hOb2RlSW50ZXJmYWNlIHtcclxuICAgIHRvU3RyaW5nKCkge1xyXG4gICAgICByZXR1cm4gY29udGVudDtcclxuICAgIH1cclxuXHJcbiAgICBhc05vZGUoKSB7XHJcbiAgICAgIGNvbnN0IHRlbXBsYXRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRlbXBsYXRlXCIpO1xyXG4gICAgICB0ZW1wbGF0ZS5pbm5lckhUTUwgPSBjb250ZW50O1xyXG4gICAgICByZXR1cm4gdGVtcGxhdGUuY29udGVudDtcclxuICAgIH1cclxuICAgIGFzVk5vZGUoKSB7XHJcbiAgICAgIHJldHVybiB7fTtcclxuICAgIH1cclxuXHJcbiAgICBbX2NhbGxSZWZzXSgpIHtcclxuICAgICAgLy8gbm9vcFxyXG4gICAgfVxyXG4gIH0pKHt9IGFzIEpzeFByb3BzKTtcclxufVxyXG5cclxuLy8gdlRyZWVcclxuXHJcbi8vIGdvdGNoc2FzOlxyXG4vLyAtIHN0eWxlcyB3aWxsIG92ZXJyaWRlIChjb3VsZCBkbzogc2V0dGluZyBlYWNoIHJ1bGUgaW5kaXZpZHVhbGx5KVxyXG5cclxuaW50ZXJmYWNlIFZOb2RlSW50ZXJmYWNlIHtcclxuICB0b1N0cmluZygpOiBzdHJpbmc7XHJcbiAgYXNOb2RlKCk6IE5vZGU7XHJcbiAgcGFyZW50OiBWTm9kZSB8IG51bGw7XHJcbiAgY2hpbGRyZW46IFZOb2RlSW50ZXJmYWNlW107XHJcbiAgdHlwZTogc3RyaW5nO1xyXG4gIG5vZGU/OiBFbGVtZW50IHwgVGV4dDtcclxuICBnZXRDaGlsZHJlbldpdGhOb2RlcyhhbHdheXNBbGxvdzogVk5vZGVbXSk6IFZOb2RlW107XHJcbiAgcmVtb3ZlRnJvbURPTSgpOiB2b2lkO1xyXG4gIGRpZmZBbmRQYXRjaChuZXdOb2RlOiBWTm9kZUludGVyZmFjZSk6IHZvaWQ7XHJcbn1cclxuXHJcbmNsYXNzIEVsZW1lbnRWTm9kZTIgaW1wbGVtZW50cyBWTm9kZUludGVyZmFjZSB7XHJcbiAgdHlwZSA9IFwiRWxlbWVudFwiO1xyXG4gIG5vZGUgPSBudWxsIGFzIGFueTtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIHRhZzogc3RyaW5nLFxyXG4gICAgcHJpdmF0ZSBwcm9wczogUmVjb3JkPHN0cmluZywgYW55PixcclxuICAgIGNoaWxkcmVuOiBWTm9kZVtdXHJcbiAgKSB7XHJcbiAgICB0aGlzLmNoaWxkcmVuID0gY2hpbGRyZW4uZmxhdCgpLm1hcCgoY2hpbGQpID0+IHtcclxuICAgICAgaWYgKCFjaGlsZCkgY29uc29sZS5sb2coXCJjaGlsZCBudWxsaXNoXCIsIHsgY2hpbGQsIHZOb2RlOiB0aGlzIH0pO1xyXG4gICAgICBpZiAoY2hpbGQgaW5zdGFuY2VvZiBKc3hOb2RlIHx8IChjaGlsZCAmJiBjaGlsZC5hc05vZGUpKSB7XHJcbiAgICAgICAgY29uc3QgY2hpbGRWTm9kZSA9IGNoaWxkOyAvL2NoaWxkLmFzVk5vZGUoKTtcclxuICAgICAgICBjaGlsZFZOb2RlLnBhcmVudCA9IHRoaXM7XHJcbiAgICAgICAgcmV0dXJuIGNoaWxkVk5vZGU7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKGNoaWxkIGluc3RhbmNlb2YgTm9kZSkge1xyXG4gICAgICAgIGNvbnN0IG4gPSAgbmV3IExpdmVOb2RlVk5vZGUoY2hpbGQpO1xyXG4gICAgICAgIG4ucGFyZW50ID0gdGhpcztcclxuICAgICAgICByZXR1cm4gbjtcclxuICAgICAgfVxyXG5cclxuICAgICAgY29uc29sZS5sb2coXCJAQCBtYXAgM1wiLCB7IGNoaWxkIH0pO1xyXG5cclxuICAgICAgaWYgKCF0cnV0aHkoY2hpbGQpKSB7XHJcbiAgICAgICAgY29uc3QgY2hpbGRWTm9kZSA9IG5ldyBOdWxsVk5vZGUoKTtcclxuICAgICAgICBjaGlsZFZOb2RlLnBhcmVudCA9IHRoaXM7XHJcblxyXG5cclxuICAgICAgICByZXR1cm4gY2hpbGRWTm9kZTtcclxuICAgICAgfVxyXG5cclxuICAgICAgY29uc29sZS5sb2coXCI6OjpcIiwgeyBjaGlsZCB9KTtcclxuXHJcbiAgICAgIGNvbnN0IG4gPSBuZXcgVGV4dFZOb2RlMih7IGNoaWxkIH0pOyAvLyBhc1Zub2RlXHJcbiAgICAgIG4ucGFyZW50ID0gdGhpcztcclxuICAgICAgcmV0dXJuIG47XHJcbiAgICAgIGNvbnN0IG5vZGUgPSB7XHJcbiAgICAgICAgdGFnOiBcIl9fVEVYVF9OT0RFX19cIixcclxuICAgICAgICB0eXBlOiBcIlRleHROb2RlXCIsXHJcbiAgICAgICAgdGFnMjogXCJjaGlsZHJlbiBUZXh0IG5vZGUgM1wiLFxyXG4gICAgICAgIG5vZGU6IG51bGwsXHJcbiAgICAgICAgcGFyZW50OiB2Tm9kZSxcclxuICAgICAgICBwcm9wczoge1xyXG4gICAgICAgICAgY29udGVudDogY2hpbGQsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBjaGlsZHJlbjogW10sXHJcbiAgICAgICAgYXNOb2RlKCkge1xyXG4gICAgICAgICAgY29uc3QgdGV4dE5vZGUgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjaGlsZCk7XHJcbiAgICAgICAgICBub2RlLm5vZGUgPSB0ZXh0Tm9kZTtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKHRleHROb2RlLCBub2RlKTtcclxuXHJcbiAgICAgICAgICByZXR1cm4gdGV4dE5vZGU7XHJcbiAgICAgICAgfSxcclxuICAgICAgICAvLyB0b3AgbGV2ZWwgdm5vZGVcclxuICAgICAgICBkaWZmQW5kUGF0Y2gobmV3Tm9kZTogVk5vZGUpIHtcclxuICAgICAgICAgIC8vIEBUT0RPIGJvdGggdGV4dD9cclxuICAgICAgICAgIGNvbnNvbGUubG9nKFwiY2hhbmdlPyBcIiwgbmV3Tm9kZS50YWcsIG5vZGUudGFnKTtcclxuXHJcbiAgICAgICAgICBpZiAobmV3Tm9kZS50YWcgIT09IG5vZGUudGFnKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGFzTm9kZSA9IG5ld05vZGUuYXNOb2RlKCk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHsgYXNOb2RlIH0pO1xyXG5cclxuICAgICAgICAgICAgaWYgKGFzTm9kZSkge1xyXG4gICAgICAgICAgICAgIG5vZGUubm9kZS5yZXBsYWNlV2l0aChhc05vZGUpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIG5vZGUubm9kZS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKG5vZGUubm9kZSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGlmIChjaGlsZCAhPT0gbmV3Tm9kZS5wcm9wcy5jb250ZW50KVxyXG4gICAgICAgICAgICBub2RlLm5vZGUubm9kZVZhbHVlID0gbmV3Tm9kZS5wcm9wcy5jb250ZW50O1xyXG4gICAgICAgICAgbmV3Tm9kZS5ub2RlID0gbm9kZS5ub2RlO1xyXG4gICAgICAgICAgLy8gZWxzZSA/XHJcbiAgICAgICAgfSxcclxuICAgICAgfTtcclxuXHJcbiAgICAgIHJldHVybiBub2RlO1xyXG4gICAgfSk7XHJcbiAgfVxyXG4gIHRvU3RyaW5nKCkge1xyXG4gICAgcmV0dXJuIFwiP1wiO1xyXG4gIH1cclxuICBhc05vZGUoKSB7XHJcbiAgICBjb25zdCBub2RlID0gYXNOb2RlKHRoaXMudGFnLCB0aGlzLnByb3BzLCB0aGlzLmNoaWxkcmVuKVswXTtcclxuICAgIHRoaXMubm9kZSA9IG5vZGU7XHJcbiAgICByZXR1cm4gbm9kZTtcclxuICB9XHJcbiAgLy8gQFRPRE86IGRvZXNuJ3QgbmVlZCB0byBiZSBpbiBWTm9kZSxcclxuICAvLyBiYXNpY2FsbHkgb25seSB0aGUgY2hlY2sgaWYgaXQgaGFzIC5ub2RlIG9yIGl0dGVyIG92ZXIgY2hpbGRyZW4gKGFyZSBWTm9kZXMhIG5vdCBOb2RlcylcclxuICBnZXRDaGlsZHJlbldpdGhOb2RlcyhhbHdheXNBbGxvdzogVk5vZGVbXSkge1xyXG4gICAgcmV0dXJuIHRoaXMuY2hpbGRyZW5cclxuICAgICAgLm1hcCgoY2hpbGROb2RlOiBWTm9kZSkgPT4ge1xyXG4gICAgICAgIGlmIChhbHdheXNBbGxvdy5pbmNsdWRlcyhjaGlsZE5vZGUpKSByZXR1cm4gY2hpbGROb2RlO1xyXG4gICAgICAgIHJldHVybiBjaGlsZE5vZGUubm9kZSB8fCBjaGlsZE5vZGUuZ2V0Q2hpbGRyZW5XaXRoTm9kZXMoKTtcclxuICAgICAgfSlcclxuICAgICAgLmZsYXQoSW5maW5pdHkpXHJcbiAgICAgIC5maWx0ZXIoQm9vbGVhbikgYXMgVk5vZGVbXTtcclxuICB9XHJcbiAgcmVtb3ZlRnJvbURPTSgpIHtcclxuICAgIHRoaXMubm9kZS5wYXJlbnRFbGVtZW50LnJlbW92ZUNoaWxkKHRoaXMubm9kZSk7XHJcbiAgfVxyXG4gIGRpZmZBbmRQYXRjaChuZXdOb2RlOiBFbGVtZW50Vk5vZGUpIHtcclxuICAgIGlmIChuZXdOb2RlLnRhZyA9PT0gdGhpcy50YWcpIHtcclxuICAgICAgbmV3Tm9kZS5ub2RlID0gdGhpcy5ub2RlO1xyXG4gICAgICAvLyAgICAgIHBhdGNoIHByb3BzLFxyXG4gICAgICAvLyB1cGRhdGUgcHJvcHMgZm9ybSBuZXcgbm9kZVxyXG4gICAgICBPYmplY3QuZW50cmllcyhuZXdOb2RlLnByb3BzKVxyXG4gICAgICAgIC5maWx0ZXIoKFtrLCB2XSkgPT4gdGhpcy5wcm9wc1trXSAhPT0gdilcclxuICAgICAgICAuZm9yRWFjaCgoW2tleSwgdmFsdWVdKSA9PiB7XHJcbiAgICAgICAgICBpZiAodmFsdWUgPT09IHRydWUpIG5ld05vZGUubm9kZS5zZXRBdHRyaWJ1dGUoa2V5LCBcIlwiKTtcclxuICAgICAgICAgIGVsc2UgaWYgKHZhbHVlID09PSBudWxsIHx8IHZhbHVlID09PSB1bmRlZmluZWQgfHwgdmFsdWUgPT09IGZhbHNlKVxyXG4gICAgICAgICAgICBuZXdOb2RlLm5vZGUucmVtb3ZlQXR0cmlidXRlKGtleSk7XHJcbiAgICAgICAgICBlbHNlIG5ld05vZGUubm9kZS5zZXRBdHRyaWJ1dGUoa2V5LCB2YWx1ZSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAvLyByZW1vdmUgb2xkLCBvYnNvbGF0ZSBhdHRyaWJ1dGVzXHJcbiAgICAgIE9iamVjdC5lbnRyaWVzKHRoaXMucHJvcHMpXHJcbiAgICAgICAgLmZpbHRlcigoW2ssIHZdKSA9PiAhbmV3Tm9kZS5wcm9wcy5oYXNPd25Qcm9wZXJ0eShrKSlcclxuICAgICAgICAuZm9yRWFjaCgoW2tleSwgdmFsdWVdKSA9PiB7XHJcbiAgICAgICAgICB0aGlzLm5vZGUucmVtb3ZlQXR0cmlidXRlKGtleSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAvLyBjaGlsZHJlbiA9PiBpdGVyIGFuZCBwYXRjaFxyXG4gICAgICAvLyBvbGQgY2hpbGRyZW4gYmVpbmcgbW9kaWZpZWRcclxuICAgICAgZGlmZkFuZFBhdGNoQ2hpbGRyZW4odGhpcywgbmV3Tm9kZSk7XHJcbiAgICB9XHJcbiAgICAvLyB0YWcgaGFzIGNoYW5nZWRcclxuICAgIGVsc2Uge1xyXG4gICAgICB0aGlzLm5vZGUucmVwbGFjZVdpdGgobmV3Tm9kZS5hc05vZGUoKSk7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG5jbGFzcyBGcmFnbWVudFZOb2RlIGltcGxlbWVudHMgVk5vZGVJbnRlcmZhY2Uge1xyXG4gIHR5cGUgPSBcIkZyYWdtZW50XCI7XHJcbiAgLy8gcGFyZW50PyBAVE9ETzogd2hlcmUgd2lsbCBwYXJlbnQgYmUgYXNpZ25lZD9cclxuXHJcbiAgY29uc3RydWN0b3IoY2hpbGRyZW46IFZOb2RlSW50ZXJmYWNlW10pIHtcclxuICAgIHRoaXMuY2hpbGRyZW4gPSBjaGlsZHJlbi5mbGF0KCkubWFwKChjaGlsZCkgPT4ge1xyXG4gICAgICBpZiAoY2hpbGQgaW5zdGFuY2VvZiBKc3hOb2RlIHx8IChjaGlsZCAmJiBjaGlsZC5hc05vZGUpKSB7XHJcbiAgICAgICAgY29uc3QgY2hpbGRWTm9kZSA9IGNoaWxkOyAvL2NoaWxkLmFzVk5vZGUoKTtcclxuICAgICAgICBjaGlsZFZOb2RlLnBhcmVudCA9IHRoaXM7XHJcbiAgICAgICAgcmV0dXJuIGNoaWxkVk5vZGU7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKGNoaWxkIGluc3RhbmNlb2YgTm9kZSkge1xyXG4gICAgICAgIGNvbnN0IG4gPSAgbmV3IExpdmVOb2RlVk5vZGUoY2hpbGQpO1xyXG4gICAgICAgIG4ucGFyZW50ID0gdGhpcztcclxuICAgICAgICByZXR1cm4gbjtcclxuICAgICAgfVxyXG5cclxuICAgICAgY29uc29sZS5sb2coXCJAQCBtYXAgMlwiLCB7IGNoaWxkIH0pO1xyXG5cclxuICAgICAgaWYgKCF0cnV0aHkoY2hpbGQpKSB7XHJcbiAgICAgICAgY29uc3QgY2hpbGRWTm9kZSA9IG5ldyBOdWxsVk5vZGUoKTsgLy8gbi5wYXJlbXQgPVxyXG4gICAgICAgIGNoaWxkVk5vZGUucGFyZW50ID0gdGhpcztcclxuICAgICAgICByZXR1cm4gY2hpbGRWTm9kZTtcclxuICAgICAgfVxyXG5cclxuICAgICAgY29uc29sZS5sb2coXCI6OjpcIiwgeyBjaGlsZCB9KTtcclxuXHJcbiAgICAgIGNvbnN0IHRuID0gbmV3IFRleHRWTm9kZTIoeyBjaGlsZCB9KTtcclxuICAgICAgdG4ucGFyZW50ID0gdGhpcztcclxuICAgICAgcmV0dXJuIHRuO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBhc05vZGUoKSB7XHJcbiAgICBjb25zdCBub2RlID0gYXNOb2RlKHVuZGVmaW5lZCwge30sIHRoaXMuY2hpbGRyZW4pWzBdO1xyXG4gICAgLy8gdk5vZGUubm9kZSA9IG5vZGU7XHJcbiAgICBjb25zb2xlLmxvZyh7IG5vZGUgfSk7XHJcblxyXG4gICAgcmV0dXJuIG5vZGU7XHJcbiAgfVxyXG4gIC8vIHRvIGxldmVsXHJcbiAgZGlmZkFuZFBhdGNoKG5ld1ZOb2RlOiBGcmFnbWVudFZOb2RlKSB7XHJcbiAgICBjb25zb2xlLmxvZyhcImRpZmZBbmRQYXRjaFwiKTtcclxuXHJcbiAgICByZXR1cm4gZGlmZkFuZFBhdGNoQ2hpbGRyZW4odGhpcywgbmV3Vk5vZGUpO1xyXG4gIH1cclxuXHJcbiAgcmVtb3ZlRnJvbURPTSgpIHtcclxuICAgIGdldENoaWxkcmVuV2l0aE5vZGVzKHRoaXMpLmZvckVhY2goKG5vZGUpID0+XHJcbiAgICAgIG5vZGUubm9kZSEucGFyZW50RWxlbWVudCEucmVtb3ZlQ2hpbGQobm9kZS5ub2RlISlcclxuICAgICk7XHJcbiAgfVxyXG59XHJcblxyXG5jbGFzcyBUZXh0Vk5vZGUyIGltcGxlbWVudHMgVk5vZGVJbnRlcmZhY2Uge1xyXG4gIHR5cGUgPSBcIlRleHROb2RlXCI7XHJcbiAgbm9kZTogVGV4dCA9IG51bGwgYXMgYW55O1xyXG4gIGNoaWxkcmVuID0gW107XHJcbiAgcHJvcHM6IHsgY29udGVudDogYW55IH07XHJcbiAgLyoqXHJcbiAgICpcclxuICAgKi9cclxuICBjb25zdHJ1Y3Rvcih7IGNoaWxkIH0pIHtcclxuICAgIHRoaXMucHJvcHMgPSB7IGNvbnRlbnQ6IGNoaWxkIH07IC8vQFRPRE86XHJcbiAgfVxyXG5cclxuICBhc05vZGUoKSB7XHJcbiAgICBjb25zdCB0ZXh0Tm9kZSA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKHRoaXMucHJvcHMuY29udGVudCk7XHJcbiAgICB0aGlzLm5vZGUgPSB0ZXh0Tm9kZTtcclxuICAgIHJldHVybiB0ZXh0Tm9kZTtcclxuICB9XHJcblxyXG4gIGRpZmZBbmRQYXRjaChuZXdOb2RlOiBUZXh0Vk5vZGUyKSB7XHJcbiAgICB0aGlzLm5vZGUubm9kZVZhbHVlID0gbmV3Tm9kZS5wcm9wcy5jb250ZW50O1xyXG4gIH1cclxuXHJcbiAgcmVtb3ZlRnJvbURPTSgpIHtcclxuICAgIHRoaXMubm9kZS5wYXJlbnRFbGVtZW50IS5yZW1vdmVDaGlsZCh0aGlzLm5vZGUpO1xyXG4gIH1cclxufVxyXG5cclxuY2xhc3MgTnVsbFZOb2RlIGltcGxlbWVudHMgVk5vZGVJbnRlcmZhY2Uge1xyXG4gIHR5cGUgPSBcIk51bGxcIjtcclxuICBjaGlsZHJlbiA9IFtdO1xyXG5cclxuICBhc05vZGUoKSB7XHJcbiAgICAvL3JldHVybiBudWxsOyAvLyByZXR1cm4gZW1wdHkgZnJhZ21lbnQ/XHJcbiAgICByZXR1cm4gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO1xyXG4gIH1cclxuXHJcbiAgZGlmZkFuZFBhdGNoKG5ld05vZGU6IE51bGxWTm9kZSkge1xyXG4gICAgcmV0dXJuO1xyXG4gIH1cclxuXHJcbiAgcmVtb3ZlRnJvbURPTSgpIHtcclxuICAgIHJldHVybjtcclxuICB9XHJcblxyXG4gIHRvU3RyaW5nKCkge1xyXG4gICAgcmV0dXJuIFwiXCI7XHJcbiAgfVxyXG59XHJcblxyXG5jbGFzcyBMaXZlTm9kZVZOb2RlIGltcGxlbWVudHMgVk5vZGVJbnRlcmZhY2Uge1xyXG4gIHR5cGUgPSBcIk5vZGVcIjtcclxuICBjaGlsZHJlbiA9IFtdO1xyXG5cclxuICAvKipcclxuICAgKlxyXG4gICAqL1xyXG4gIGNvbnN0cnVjdG9yKG5vZGU6IE5vZGUpIHtcclxuICAgIHRoaXMubm9kZSA9IG5vZGVcclxuXHJcbiAgfVxyXG5cclxuICBhc05vZGUoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5ub2RlO1xyXG4gIH1cclxuXHJcbiAgZGlmZkFuZFBhdGNoKG5ld05vZGU6IE51bGxWTm9kZSkge1xyXG4gICAgaWYgKG5ld05vZGUubm9kZSAhPT0gbm9kZSkge1xyXG4gICAgICB0aGlzLm5vZGUucmVwbGFjZVdpdGgobmV3Tm9kZS5ub2RlKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHJlbW92ZUZyb21ET00oKSB7XHJcbiAgICB0aGlzLm5vZGUucGFyZW50RWxlbWVudCEucmVtb3ZlQ2hpbGQodGhpcy5ub2RlKTtcclxuICB9XHJcblxyXG4gIHRvU3RyaW5nKCkge1xyXG4gICAgcmV0dXJuIGdldE91dGVySHRtbCh0aGlzLm5vZGUpO1xyXG4gIH1cclxufVxyXG5cclxuY2xhc3MgUm9vdFZOb2RlMiBpbXBsZW1lbnRzIFZOb2RlSW50ZXJmYWNlIHtcclxuICB0eXBlID0gXCJSb290XCI7XHJcbiAgcGFyZW50ID0gbnVsbDtcclxuICBub2RlOiBFbGVtZW50O1xyXG4gIGNoaWxkcmVuOiBWTm9kZUludGVyZmFjZVtdO1xyXG4gIC8qKlxyXG4gICAqXHJcbiAgICovXHJcbiAgY29uc3RydWN0b3IoY29udGVudCwgZG9tTm9kZTogRWxlbWVudCkge1xyXG4gICAgY29udGVudC5wYXJlbnQgPSB0aGlzO1xyXG4gICAgdGhpcy5jaGlsZHJlbiA9IFtjb250ZW50XTtcclxuICAgIHRoaXMubm9kZSA9IGRvbU5vZGU7XHJcbiAgfVxyXG5cclxuICBhc05vZGUoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5jaGlsZHJlblswXS5hc05vZGUoKTtcclxuICB9XHJcbiAgdG9TdHJpbmcoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5jaGlsZHJlblswXS50b1N0cmluZygpO1xyXG4gIH1cclxuXHJcbiAgZGlmZkFuZFBhdGNoKG5ld1ZOb2RlOiBWTm9kZUludGVyZmFjZSkge1xyXG4gICAgZGlmZkFuZFBhdGNoQ2hpbGRyZW4odGhpcywgbmV3Vk5vZGUpO1xyXG4gIH1cclxuXHJcbiAgcmVtb3ZlRnJvbURPTSgpIHtcclxuICAgIHRoaXMubm9kZS5yZW1vdmUoKTtcclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgcmVuZGVyLCByYXdIdG1sIH0gZnJvbSBcIi4vanN4L2pzeC1ydW50aW1lXCI7XHJcblxyXG5jb25zdCB4c3MgPSBcIjxpbWcgc3JjPXggb25lcnJvcj1cXFwiYWxlcnQoJ1hTUyBBdHRhY2snKVxcXCI+XCI7IC8vXCI8c2NyaXB0PmFsZXJ0KCctLi0nKTwvc2NyaXB0PlwiO1xyXG5cclxuZnVuY3Rpb24gUlRFKHByb3BzOiAvKnsgdHh0LCBcIm9uLWNsaWNrXCI6IG9uQ2xpY2sgfSovIHtcclxuICB0eHQ6IHN0cmluZztcclxuICByZWY/OiBGdW5jdGlvbjtcclxufSkge1xyXG4gIGNvbnNvbGUubG9nKFwib25DbGlja1wiLCBwcm9wc1tcIm9uLWNsaWNrXCJdKTtcclxuICByZXR1cm4gKFxyXG4gICAgPHAgcmVmPXsoZWw6IEhUTUxFbGVtZW50KSA9PiBjb25zb2xlLmxvZyhcIm15IGRpdiA6OnJlZjo6My4yXCIsIGVsKX0+XHJcbiAgICAgIHtwcm9wcy50eHR9XHJcbiAgICA8L3A+XHJcbiAgKTtcclxufVxyXG5cclxuZnVuY3Rpb24gQnV0dG9uKHtcclxuICBjaGlsZHJlbixcclxuICBkaXNhYmxlZCxcclxufToge1xyXG4gIGNoaWxkcmVuOiBhbnk7XHJcbiAgZGlzYWJsZWQ6IGJvb2xlYW47XHJcbiAgcmVmPzogRnVuY3Rpb247XHJcbn0pIHtcclxuICByZXR1cm4gKFxyXG4gICAgPGJ1dHRvblxyXG4gICAgICBkaXNhYmxlZD17ZGlzYWJsZWR9XHJcbiAgICAgIHJlZj17KGVsOiBIVE1MRWxlbWVudCkgPT4gY29uc29sZS5sb2coXCJteSBidXR0b24gOjpyZWY6OjFcIiwgZWwpfVxyXG4gICAgPlxyXG4gICAgICA8c3BhbiByZWY9eyhlbDogSFRNTEVsZW1lbnQpID0+IGNvbnNvbGUubG9nKFwibXkgYSA6OnJlZjo6MlwiLCBlbCl9PlxyXG4gICAgICAgIEJ0bi1zcGFuLWZpcnN0XHJcbiAgICAgIDwvc3Bhbj5cclxuICAgICAge2NoaWxkcmVufVxyXG4gICAgICA8PlxyXG4gICAgICAgIDxzcGFuIHJlZj17KGVsOiBIVE1MRWxlbWVudCkgPT4gY29uc29sZS5sb2coXCJteSBhIDo6cmVmOjozXCIsIGVsKX0+XHJcbiAgICAgICAgICBCdG4tc3Bhbi1lbmRcclxuICAgICAgICA8L3NwYW4+XHJcbiAgICAgIDwvPlxyXG4gICAgPC9idXR0b24+XHJcbiAgKTtcclxufVxyXG5cclxuZnVuY3Rpb24gcmVmbG9nKGVsOiBIVE1MRWxlbWVudCkge1xyXG4gIGNvbnNvbGUubG9nKFwibXkgaW5uZXIgZGl2OjpyZWY6OjhcIiwgZWwpO1xyXG59XHJcblxyXG4vKlxyXG5jb25zdCBtYXJrdXAgPSAoXHJcbiAgPD5cclxuICAgIDxkaXZcclxuICAgICAgY2xhc3M9XCJmb29cIlxyXG4gICAgICByZWY9eyhlbDogSFRNTEVsZW1lbnQpID0+IGNvbnNvbGUubG9nKFwibXkgZGl2IDo6cmVmOjo0XCIsIGVsKX1cclxuICAgIC8+XHJcbiAgICA8aW5wdXQgZGlzYWJsZWQ9e3RydWV9IGhpZGRlbj17ZmFsc2V9IC8+XHJcbiAgICA8QnV0dG9uXHJcbiAgICAgIGRpc2FibGVkPXt0cnVlfVxyXG4gICAgICByZWY9eyhlbDogSFRNTEVsZW1lbnQpID0+IGNvbnNvbGUubG9nKFwibXkgQlVUVE9OOjpyZWY6OjVcIiwgZWwpfVxyXG4gICAgPlxyXG4gICAgICB0ZXh0XHJcbiAgICAgIDxwb3B1cC1pbmZvXHJcbiAgICAgICAgcmVmPXsoZWw6IEhUTUxFbGVtZW50KSA9PiBjb25zb2xlLmxvZyhcInNwYW4gaW4gQlVUVE9OOjpyZWY6OjZcIiwgZWwpfVxyXG4gICAgICA+XHJcbiAgICAgICAgYmxhXHJcbiAgICAgIDwvcG9wdXAtaW5mbz5cclxuICAgIDwvQnV0dG9uPlxyXG4gICAgPFJURVxyXG4gICAgICB0eHQ9XCJsZSB0ZXh0XCJcclxuICAgICAgcmVmPXsoZWw6IEhUTUxFbGVtZW50KSA9PiBjb25zb2xlLmxvZyhcIm15IGRpdiA6OnJlZjo6My4xXCIsIGVsKX1cclxuICAgICAgb24tY2xpY2s9eyhlOiBIVE1MRWxlbWVudCkgPT4gY29uc29sZS5sb2coZSl9XHJcbiAgICAvPlxyXG4gICAge3hzc31cclxuICAgIHtyYXdIdG1sKGA8b2w+PGxpPnJhdyBodG1sPC9saT48L29sPmApfVxyXG4gICAgPGRpdlxyXG4gICAgICBjbGFzcz1cImJhbVwiXHJcbiAgICAgIHJlZj17KGVsOiBIVE1MRWxlbWVudCkgPT4gY29uc29sZS5sb2coXCJteSBkaXY6OnJlZjo6N1wiLCBlbCl9XHJcbiAgICA+XHJcbiAgICAgIDxkaXY+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cImJhclwiIG9uLWNsaWNrPXsoZSkgPT4gY29uc29sZS5sb2coZSl9IHJlZj17cmVmbG9nfT5cclxuICAgICAgICAgIGNsaWNrIE1FXHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPGRpdiBzdHlsZT17eyBvdXRsaW5lOiBcIjFweCBzb2xpZCByZWQ7XCIgfX0+XHJcbiAgICAgICAgICB7ZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNvbGRcIil9XHJcbiAgICAgICAgICB7bnVsbH1cclxuICAgICAgICAgIHtbMCwgMV0ubWFwKChuKSA9PiAoXHJcbiAgICAgICAgICAgIDxzcGFuPntufTwvc3Bhbj5cclxuICAgICAgICAgICkpfVxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICA8L2Rpdj5cclxuICAgIDwvZGl2PlxyXG4gIDwvPlxyXG4pO1xyXG5cclxuKi9cclxuXHJcbi8qXHJcbmNvbnN0IG1hcmt1cCA9IChcclxuICA8QnV0dG9uIGRpc2FibGVkPXt0cnVlfT5cclxuICAgICAgPGJvbGQgcmVmPXtyZWZsb2d9Pi0tSU5ORVItLTwvYm9sZD5cclxuICA8L0J1dHRvbj5cclxuKTsqL1xyXG4vKlxyXG5cclxuY29uc3QgbWFya3VwID0gKFxyXG4gIDxkaXYgY2xhc3M9XCJmb29cIiByZWY9eyhlbDogSFRNTEVsZW1lbnQpID0+IGNvbnNvbGUubG9nKFwibXkgZGl2OjpyZWY6OlwiLCBlbCl9PlxyXG4gICAgPGRpdj5cclxuICAgICAgPGRpdiBjbGFzcz1cImJhclwiIHJlZj17KGVsOiBIVE1MRWxlbWVudCkgPT4gY29uc29sZS5sb2coXCJteSBpbm5lciBkaXY6OnJlZjo6XCIsIGVsKX0gLz5cclxuICAgIDwvZGl2PlxyXG4gICAgPEJ1dHRvbiBkaXNhYmxlZD17dHJ1ZX0+PC9CdXR0b24+XHJcbiAgPC9kaXY+XHJcbik7XHJcbiovXHJcbi8qXHJcbmNvbnN0IG1hcmt1cCA9IChcclxuICA8YT5cclxuICAgIDxiPlxyXG4gICAgICA8YyBjbGFzcz1cImJhclwiIHJlZj17cmVmbG9nfSAvPlxyXG4gICAgPC9iPlxyXG4gIDwvYT5cclxuKTtcclxuKi9cclxuXHJcbmZ1bmN0aW9uIFNwYW4oeyBtb2RlIH06IHsgbW9kZTogYW55IH0pIHtcclxuICByZXR1cm4gbW9kZSA9PT0gMSA/IChcclxuICAgIDxkaXY+XHJcbiAgICAgIDxzcGFuIGlkPVwiaW5uZXJcIiBvbGQ9e3RydWV9PlxyXG4gICAgICAgIFNwYW4tQ29tcC0tb2xkXHJcbiAgICAgIDwvc3Bhbj5cclxuICAgICAgPGgzPnRvIGJlIHJlbW92ZWQ8L2gzPlxyXG4gICAgPC9kaXY+XHJcbiAgKSA6IChcclxuICAgIDxkaXY+XHJcbiAgICAgIDxwIGlkPVwiaW5uZXJcIiBuZXc9e3RydWV9PlxyXG4gICAgICAgIFNwYW4tQ29tcC0tbmV3c1xyXG4gICAgICA8L3A+XHJcbiAgICA8L2Rpdj5cclxuICApO1xyXG59XHJcblxyXG5mdW5jdGlvbiBDb21wKHsgbnVtIH0pIHtcclxuICBpZiAobnVtID09PSAxKSByZXR1cm4gbnVsbDtcclxuICByZXR1cm4gKFxyXG4gICAgPGRpdj5cclxuICAgICAgPHA+Y29tcDwvcD5cclxuICAgIDwvZGl2PlxyXG4gICk7XHJcbn1cclxuXHJcbmNvbnN0IG1hcmt1cDEgPSAobnVtOiBhbnkpID0+IChcclxuICA8ZGl2IGlkPVwib3V0ZXJcIiBkYXRhLWZvbz1cImJhclwiIGRhdGEtdmFyPXtudW19PlxyXG4gICAgPGgzPnNob3VsZCBnZXQgMiAtOiAzPC9oMz5cclxuICAgIHtudW0gPT09IDEgPyAoXHJcbiAgICAgIDx1bCBjbGFzcz1cInVsLWNsYXNzXCI+XHJcbiAgICAgICAgPGxpPlRleHQgMSA8L2xpPlxyXG4gICAgICAgIDxsaT5UZXh0IDIgPC9saT5cclxuICAgICAgPC91bD5cclxuICAgICkgOiAoXHJcbiAgICAgIDx1bCBjbGFzcz1cInVsLWNsYXNzXCI+XHJcbiAgICAgICAgPGxpPlRleHQgMyA8L2xpPlxyXG4gICAgICAgIDxsaT5UZXh0IDIgPC9saT5cclxuICAgICAgICA8bGk+VGV4dCAxIDwvbGk+XHJcbiAgICAgIDwvdWw+XHJcbiAgICApfVxyXG4gICAgPGgzPnNob3VsZCBnZXQgMyAtOiAyPC9oMz5cclxuICAgIHtudW0gPT09IDEgPyAoXHJcbiAgICAgIDx1bCBjbGFzcz1cInVsLWNsYXNzXCI+XHJcbiAgICAgICAgPGxpPlRleHQgMSA8L2xpPlxyXG4gICAgICAgIDxsaT5UZXh0IDIgPC9saT5cclxuICAgICAgICA8bGk+VGV4dCAzIDwvbGk+XHJcbiAgICAgIDwvdWw+XHJcbiAgICApIDogKFxyXG4gICAgICA8dWwgY2xhc3M9XCJ1bC1jbGFzc1wiPlxyXG4gICAgICAgIDxsaT5UZXh0IDEgPC9saT5cclxuICAgICAgICA8bGk+VGV4dCAyIDwvbGk+XHJcbiAgICAgIDwvdWw+XHJcbiAgICApfVxyXG4gICAge251bSA9PT0gMSA/IG51bGwgOiA8cD5uZXcgcmVuZGVyPC9wPn1cclxuICAgIDxkaXY+XHJcbiAgICAgIDxzcGFuPnNwYW4tY29udGVudDwvc3Bhbj5cclxuICAgIDwvZGl2PlxyXG4gICAgPFNwYW4gbW9kZT17bnVtfSAvPlxyXG4gICAgey8qZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNvbGRcIikqL31cclxuICAgIDw+RnJhZ21lbnQtaXRlbTwvPlxyXG4gICAgPHN2Z1xyXG4gICAgICB2aWV3Qm94PVwiMCAwIDMwMCAxMDBcIlxyXG4gICAgICB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCJcclxuICAgICAgc3Ryb2tlPVwicmVkXCJcclxuICAgICAgZmlsbD1cImdyZXlcIlxyXG4gICAgPlxyXG4gICAgICA8Y2lyY2xlIGN4PVwiNTBcIiBjeT1cIjUwXCIgcj1cIjQwXCIgLz5cclxuICAgICAgPGNpcmNsZSBjeD1cIjE1MFwiIGN5PVwiNTBcIiByPVwiNFwiIC8+XHJcblxyXG4gICAgICA8c3ZnIHZpZXdCb3g9XCIwIDAgMTAgMTBcIiB4PVwiMjAwXCIgd2lkdGg9XCIxMDBcIj5cclxuICAgICAgICA8Y2lyY2xlIGN4PVwiNVwiIGN5PVwiNVwiIHI9XCI0XCIgLz5cclxuICAgICAgPC9zdmc+XHJcbiAgICA8L3N2Zz5cclxuICA8L2Rpdj5cclxuKTtcclxuXHJcbmZ1bmN0aW9uIG1hcmt1cDIobnVtOiBhbnkpIHtcclxuICByZXR1cm4gKFxyXG4gICAgPGRpdiBpZD1cIm91dGVyXCI+XHJcbiAgICAgIDw+XHJcbiAgICAgICAgPD5cclxuICAgICAgICAgIDxwPm5lc3RlZCBmcmFnbWVudDwvcD5cclxuICAgICAgICA8Lz5cclxuICAgICAgPC8+XHJcbiAgICAgIDxoMT5zdGF0aWM8L2gxPlxyXG4gICAgICA8aDE+ZHluYW1pYyB2YWw6IHtudW19PC9oMT5cclxuICAgICAge251bSA9PT0gMSA/IDxoMT5vbGQ8L2gxPiA6IGZhbHNlfVxyXG4gICAgICB7bnVtID09PSAxID8gKFxyXG4gICAgICAgIDw+XHJcbiAgICAgICAgICA8aDE+ZnJhZyBvbGQ8L2gxPlxyXG4gICAgICAgICAgPHNwYW4+ZnJhZyBzcGFuIG9sZDwvc3Bhbj5cclxuICAgICAgICA8Lz5cclxuICAgICAgKSA6IChcclxuICAgICAgICA8aDE+ZnJhZyBuZXc8L2gxPlxyXG4gICAgICApfVxyXG4gICAgICA8Q29tcCBudW09e251bX0gLz5cclxuICAgIDwvZGl2PlxyXG4gICk7XHJcbn1cclxuZnVuY3Rpb24gTkwoKSB7XHJcbiAgcmV0dXJuIG51bGw7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIG1hcmt1cDMobnVtOiBhbnkpIHtcclxuICByZXR1cm4gbnVtID09PSAxID8gKFxyXG4gICAgPGgxPlxyXG4gICAgICA8TkwgLz5cclxuICAgICAgQS1MaW5lIDEgLSB7bnVtfVxyXG4gICAgICA8U3BhbiBtb2RlPXtudW19IC8+XHJcbiAgICAgIDxCdXR0b25cclxuICAgICAgICBkaXNhYmxlZD17dHJ1ZX1cclxuICAgICAgICByZWY9eyhlbDogSFRNTEVsZW1lbnQpID0+IGNvbnNvbGUubG9nKFwibXkgQlVUVE9OOjpyZWY6OjVcIiwgZWwpfVxyXG4gICAgICA+XHJcbiAgICAgICAgdGV4dFxyXG4gICAgICAgIDxwb3B1cC1pbmZvXHJcbiAgICAgICAgICByZWY9eyhlbDogSFRNTEVsZW1lbnQpID0+IGNvbnNvbGUubG9nKFwic3BhbiBpbiBCVVRUT046OnJlZjo6NlwiLCBlbCl9XHJcbiAgICAgICAgPlxyXG4gICAgICAgICAgYmxhXHJcbiAgICAgICAgPC9wb3B1cC1pbmZvPlxyXG4gICAgICAgIDxwPmlubmVyIHAge251bX08L3A+XHJcbiAgICAgIDwvQnV0dG9uPlxyXG4gICAgICBBLUxpbmUgM1xyXG4gICAgICA8PlxyXG4gICAgICAgIDxwPlxyXG4gICAgICAgICAgPHA+QSBGcmFnIGxpbmUgMSo8L3A+XHJcbiAgICAgICAgPC9wPlxyXG4gICAgICAgIDxwPkEgRnJhZyBsaW5lIDI8L3A+XHJcbiAgICAgICAgPHA+QSBGcmFnIGxpbmUgMzwvcD5cclxuICAgICAgICA8cD5BIEZyYWcgbGluZSA0PC9wPlxyXG4gICAgICAgIDxzdmdcclxuICAgICAgICAgIHZpZXdCb3g9XCIwIDAgMzAwIDEwMFwiXHJcbiAgICAgICAgICB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCJcclxuICAgICAgICAgIHN0cm9rZT1cInJlZFwiXHJcbiAgICAgICAgICBmaWxsPVwiZ3JleVwiXHJcbiAgICAgICAgPlxyXG4gICAgICAgICAgPGNpcmNsZSBjeD1cIjUwXCIgY3k9XCI1MFwiIHI9XCI0MFwiIC8+XHJcbiAgICAgICAgICA8Y2lyY2xlIGN4PVwiMTUwXCIgY3k9XCI1MFwiIHI9XCI0XCIgLz5cclxuXHJcbiAgICAgICAgICA8c3ZnIHZpZXdCb3g9XCIwIDAgMTAgMTBcIiB4PVwiMjAwXCIgd2lkdGg9XCIxMDBcIj5cclxuICAgICAgICAgICAgPGNpcmNsZSBjeD1cIjVcIiBjeT1cIjVcIiByPVwiNFwiIC8+XHJcbiAgICAgICAgICA8L3N2Zz5cclxuICAgICAgICA8L3N2Zz5cclxuICAgICAgPC8+XHJcbiAgICAgIHtudWxsfVxyXG4gICAgPC9oMT5cclxuICApIDogKFxyXG4gICAgPGgxIGNsYXNzPVwiYVwiPlxyXG4gICAgICBCIExpbmUgMSAtIHtudW19XHJcbiAgICAgIDxTcGFuIG1vZGU9e251bX0gLz5cclxuICAgICAgPEJ1dHRvblxyXG4gICAgICAgIGRpc2FibGVkPXt0cnVlfVxyXG4gICAgICAgIHJlZj17KGVsOiBIVE1MRWxlbWVudCkgPT4gY29uc29sZS5sb2coXCJteSBCVVRUT046OnJlZjo6NVwiLCBlbCl9XHJcbiAgICAgID5cclxuICAgICAgICB0ZXh0XHJcbiAgICAgICAgPHBvcHVwLWluZm9cclxuICAgICAgICAgIHJlZj17KGVsOiBIVE1MRWxlbWVudCkgPT4gY29uc29sZS5sb2coXCJzcGFuIGluIEJVVFRPTjo6cmVmOjo2XCIsIGVsKX1cclxuICAgICAgICA+XHJcbiAgICAgICAgICBibGFcclxuICAgICAgICA8L3BvcHVwLWluZm8+XHJcbiAgICAgICAgPHA+e251bX08L3A+XHJcbiAgICAgIDwvQnV0dG9uPlxyXG4gICAgICA8PlxyXG4gICAgICAgIHtmYWxzZX1cclxuICAgICAgICB7bnVsbH1cclxuICAgICAgICB7dW5kZWZpbmVkfVxyXG4gICAgICA8Lz5cclxuICAgICAgPD5cclxuICAgICAgICA8cD5CIEZyYWcgbGluZSAxPC9wPlxyXG4gICAgICAgIDxwPkIgRnJhZyBsaW5lIDI8L3A+XHJcbiAgICAgICAge3VuZGVmaW5lZH1cclxuICAgICAgICA8cD5CIEZyYWcgbGluZSAzKDQpPC9wPlxyXG4gICAgICAgIDxzdmdcclxuICAgICAgICAgIHZpZXdCb3g9XCIwIDAgMzAwIDEwMFwiXHJcbiAgICAgICAgICB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCJcclxuICAgICAgICAgIHN0cm9rZT1cInJlZFwiXHJcbiAgICAgICAgICBmaWxsPVwiZ3JleVwiXHJcbiAgICAgICAgPlxyXG4gICAgICAgICAgPGNpcmNsZSBjeD1cIjUwXCIgY3k9XCI1MFwiIHI9XCI0MFwiIC8+XHJcbiAgICAgICAgICA8Y2lyY2xlIGN4PVwiMTUwXCIgY3k9XCI1MFwiIHI9XCI0XCIgLz5cclxuXHJcbiAgICAgICAgICA8c3ZnIHZpZXdCb3g9XCIwIDAgMTAgMTBcIiB4PVwiMjAwXCIgd2lkdGg9XCIxMDBcIj5cclxuICAgICAgICAgICAgPGNpcmNsZSBjeD1cIjVcIiBjeT1cIjVcIiByPVwiNlwiIC8+XHJcbiAgICAgICAgICA8L3N2Zz5cclxuICAgICAgICA8L3N2Zz5cclxuICAgICAgICA8cD5CIEZyYWcgbGluZSA0KDYpPC9wPlxyXG4gICAgICA8Lz5cclxuICAgIDwvaDE+XHJcbiAgKTtcclxufVxyXG5jb25zdCBvYmogPSB7IGE6IDEgfTtcclxuXHJcbmZ1bmN0aW9uIG1hcmt1cDQobnVtOiBhbnkpIHtcclxuICBvYmouYSA9IG51bTtcclxuICByZXR1cm4gbnVtID09PSAxID8gKFxyXG4gICAgPGgxIG9iaj17b2JqfSBpZD17b2JqLmF9PlxyXG4gICAgICBvbGQtSGVhZGxpbmUge251bX1cclxuICAgIDwvaDE+XHJcbiAgKSA6IChcclxuICAgIDxoMSBvYmo9e29ian0gY2xhc3M9XCJhXCIgaWQ9e29iai5hfT5cclxuICAgICAgbmV3LUhlYWRsaW5lIHtudW19XHJcbiAgICA8L2gxPlxyXG4gICk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIG1hcmt1cChudW06IGFueSkge1xyXG4gIHJldHVybiBudW0gPT09IDEgPyAoXHJcbiAgICA8ZGl2PlxyXG4gICAgICA8PlxyXG4gICAgICAgIDxwPmZyYWcgLSBJPC9wPlxyXG4gICAgICAgIDxiPiBmcmFnIC0gSUk8L2I+XHJcbiAgICAgIDwvPlxyXG4gICAgPC9kaXY+XHJcbiAgKSA6IChcclxuICAgIDxoMSBjbGFzcz1cImFcIj5cclxuICAgICAge1wibmV3LUhlYWRsaW5lXCJ9IHtudW19XHJcbiAgICA8L2gxPlxyXG4gICk7XHJcbn1cclxuXHJcbi8vY29uc29sZS5sb2cobWFya3VwKTtcclxuLy93aW5kb3cubWFya3VwID0gbWFya3VwO1xyXG5cclxuY2xhc3MgUG9wVXBJbmZvIGV4dGVuZHMgSFRNTEVsZW1lbnQge1xyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgLy8gQWx3YXlzIGNhbGwgc3VwZXIgZmlyc3QgaW4gY29uc3RydWN0b3JcclxuICAgIHN1cGVyKCk7XHJcblxyXG4gICAgLy8gd3JpdGUgZWxlbWVudCBmdW5jdGlvbmFsaXR5IGluIGhlcmVcclxuXHJcbiAgICBjb25zb2xlLmxvZyhcIiMjIyMjIyMjIyMjIyMjIyMjY3RvciBDRVwiKTtcclxuICB9XHJcblxyXG4gIGNvbm5lY3RlZENhbGxiYWNrKCkge1xyXG4gICAgY29uc29sZS5sb2coXCIjIyMjIyMjIyMjIyMjIyMjI0N1c3RvbSBzcXVhcmUgZWxlbWVudCBhZGRlZCB0byBwYWdlLlwiKTtcclxuICB9XHJcbn1cclxuXHJcbmN1c3RvbUVsZW1lbnRzLmRlZmluZShcInBvcHVwLWluZm9cIiwgUG9wVXBJbmZvKTtcclxuXHJcbi8vZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNvbGRcIikhLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBjb25zb2xlLmxvZyk7XHJcblxyXG4vL2RvY3VtZW50LmJvZHkuaW5uZXJIVE1MID0gbWFya3VwO1xyXG4vLy8vcmVuZGVyKG1hcmt1cDMoMSksIGRvY3VtZW50LmJvZHkpO1xyXG4vL2RvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwib3V0ZXJcIik/LnNldEF0dHJpYnV0ZShcImRhdGEtZm9vXCIsIFwibW9kXCIpO1xyXG5cclxuLy9kb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImlubmVyXCIpPy5zZXRBdHRyaWJ1dGUoXCJkYXRhLWZvb1wiLCBcIm1vZFwiKTtcclxuLy9yZW5kZXIobWFya3VwKDIpLCBkb2N1bWVudC5ib2R5KTtcclxuLy9yZW5kZXIobWFya3VwLCBkb2N1bWVudC5ib2R5LCB0cnVlKTtcclxuZnVuY3Rpb24gQ29tcDIoKSB7XHJcbiAgcmV0dXJuIChcclxuICAgIDw+XHJcbiAgICAgIDxDb21wMyAvPlxyXG4gICAgICB7ZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNvbGRcIil9XHJcbiAgICA8Lz5cclxuICApO1xyXG59XHJcbmZ1bmN0aW9uIENvbXAzKCkge1xyXG4gIHJldHVybiA8ZGl2PmNvbXAgY29udGVudDwvZGl2PjtcclxufVxyXG5cclxud2luZG93LnJlUmVuZGVyMSA9ICgpID0+XHJcbiAgcmVuZGVyKG1hcmt1cDMoMSksIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY29udGFpbmVyXCIpKTtcclxud2luZG93LnJlUmVuZGVyMiA9ICgpID0+XHJcbiAgcmVuZGVyKG1hcmt1cDMoMiksIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY29udGFpbmVyXCIpKTtcclxud2luZG93LnJlUmVuZGVyMyA9ICgpID0+XHJcbiAgcmVuZGVyKFxyXG4gICAgLy8gPGRpdj50eHQ8L2Rpdj5cclxuICAgIDxDb21wMiAvPixcclxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY29udGFpbmVyXCIpXHJcbiAgKTtcclxuXHJcbmNvbnNvbGUubG9nKFwiMTIzNDVcIik7XHJcbiJdLCJzb3VyY2VSb290IjoiIn0=