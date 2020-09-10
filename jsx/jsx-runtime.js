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
      vNode = vNode.parent; // `.node` is only on "Text" and "Element" type VNode, and only Element has children

      if (vNode.node) return vNode;
    } // will never reach


    throw new Error("jsx-runtime: can't find a parent with Element");
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
    });
    const documentFragment = document.createDocumentFragment(); // new addition items

    for (let i = oldNode.children.length; i < newNode.children.length; i++) {
      if (newNode.children[i].type !== "Null") documentFragment.append(newNode.children[i].asNode());
    } // add to the end of parent node


    if (newNode.node) {
      newNode.node.insertBefore(documentFragment, null);
    } // or if node is not an element (i.e. a fragment) add after it.
    else {
        const [parent, nextSibling] = getParentAndNextSibling(newNode);
        parent.insertBefore(documentFragment, nextSibling);
      }
  }

  function asVNode(tag, props) {
    if (typeof tag === "function") {
      let result = tag(props);

      if (result instanceof JsxNode) {
        console.warn("asVNode with JsxNode");
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
        return; ////

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
  /* harmony import */ var runtime = __webpack_require__(/*! ./jsx/jsx-runtime */ "./jsx/jsx-runtime.ts");




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
    return runtime.jsx("p", {
      ref: function ref(el) {
        return console.log("my div ::ref::3.2", el);
      },
      children: props.txt
    });
  }

  function Button(_ref) {
    var children = _ref.children,
        disabled = _ref.disabled;
    return runtime.jsxs("button", {
      disabled: disabled,
      ref: function ref(el) {
        return console.log("my button ::ref::1", el);
      },
      children: [runtime.jsx("span", {
        ref: function ref(el) {
          return console.log("my a ::ref::2", el);
        },
        children: "a"
      }), children, runtime.jsx(runtime.Fragment, {
        children: runtime.jsx("span", {
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
    return mode === 1 ? runtime.jsxs("div", {
      children: [runtime.jsx("span", {
        id: "inner",
        old: true,
        children: "Span-Comp--old"
      }), runtime.jsx("h3", {
        children: "to be removed"
      })]
    }) : runtime.jsx("div", {
      children: runtime.jsx("p", {
        id: "inner",
        "new": true,
        children: "Span-Comp--news"
      })
    });
  }

  function Comp(_ref3) {
    var num = _ref3.num;
    if (num === 1) return null;
    return runtime.jsx("div", {
      children: runtime.jsx("p", {
        children: "comp"
      })
    });
  }

  var markup1 = function markup1(num) {
    return runtime.jsxs("div", {
      id: "outer",
      "data-foo": "bar",
      "data-var": num,
      children: [runtime.jsx("h3", {
        children: "should get 2 -: 3"
      }), num === 1 ? runtime.jsxs("ul", {
        "class": "ul-class",
        children: [runtime.jsx("li", {
          children: "Text 1 "
        }), runtime.jsx("li", {
          children: "Text 2 "
        })]
      }) : runtime.jsxs("ul", {
        "class": "ul-class",
        children: [runtime.jsx("li", {
          children: "Text 3 "
        }), runtime.jsx("li", {
          children: "Text 2 "
        }), runtime.jsx("li", {
          children: "Text 1 "
        })]
      }), runtime.jsx("h3", {
        children: "should get 3 -: 2"
      }), num === 1 ? runtime.jsxs("ul", {
        "class": "ul-class",
        children: [runtime.jsx("li", {
          children: "Text 1 "
        }), runtime.jsx("li", {
          children: "Text 2 "
        }), runtime.jsx("li", {
          children: "Text 3 "
        })]
      }) : runtime.jsxs("ul", {
        "class": "ul-class",
        children: [runtime.jsx("li", {
          children: "Text 1 "
        }), runtime.jsx("li", {
          children: "Text 2 "
        })]
      }), num === 1 ? null : runtime.jsx("p", {
        children: "new render"
      }), runtime.jsx("div", {
        children: runtime.jsx("span", {
          children: "span-content"
        })
      }), runtime.jsx(Span, {
        mode: num
      }), runtime.jsx(runtime.Fragment, {
        children: "Fragment-item"
      }), runtime.jsxs("svg", {
        viewBox: "0 0 300 100",
        xmlns: "http://www.w3.org/2000/svg",
        stroke: "red",
        fill: "grey",
        children: [runtime.jsx("circle", {
          cx: "50",
          cy: "50",
          r: "40"
        }), runtime.jsx("circle", {
          cx: "150",
          cy: "50",
          r: "4"
        }), runtime.jsx("svg", {
          viewBox: "0 0 10 10",
          x: "200",
          width: "100",
          children: runtime.jsx("circle", {
            cx: "5",
            cy: "5",
            r: "4"
          })
        })]
      })]
    });
  };

  function markup2(num) {
    return runtime.jsxs("div", {
      id: "outer",
      children: [runtime.jsx(runtime.Fragment, {
        children: runtime.jsx(runtime.Fragment, {
          children: runtime.jsx("p", {
            children: "nested fragment"
          })
        })
      }), runtime.jsx("h1", {
        children: "static"
      }), runtime.jsxs("h1", {
        children: ["dynamic val: ", num]
      }), num === 1 ? runtime.jsx("h1", {
        children: "old"
      }) : false, num === 1 ? runtime.jsxs(runtime.Fragment, {
        children: [runtime.jsx("h1", {
          children: "frag old"
        }), runtime.jsx("span", {
          children: "frag span old"
        })]
      }) : runtime.jsx("h1", {
        children: "frag new"
      }), runtime.jsx(Comp, {
        num: num
      })]
    });
  }

  function markup3(num) {
    return num === 1 ? runtime.jsxs("h1", {
      children: ["old-Headline ", num, "foo", runtime.jsxs(runtime.Fragment, {
        children: [runtime.jsx("p", {
          children: "old-span A"
        }), runtime.jsx("p", {
          children: "1"
        }), runtime.jsx("p", {
          children: "2"
        }), runtime.jsx("p", {
          children: "3"
        }), runtime.jsxs("svg", {
          viewBox: "0 0 300 100",
          xmlns: "http://www.w3.org/2000/svg",
          stroke: "red",
          fill: "grey",
          children: [runtime.jsx("circle", {
            cx: "50",
            cy: "50",
            r: "40"
          }), runtime.jsx("circle", {
            cx: "150",
            cy: "50",
            r: "4"
          }), runtime.jsx("svg", {
            viewBox: "0 0 10 10",
            x: "200",
            width: "100",
            children: runtime.jsx("circle", {
              cx: "5",
              cy: "5",
              r: "4"
            })
          })]
        })]
      }), null]
    }) : runtime.jsxs("h1", {
      "class": "a",
      children: ["new-Headline ", num, false, null, undefined, runtime.jsxs(runtime.Fragment, {
        children: [runtime.jsx("p", {
          children: "new-span A"
        }), runtime.jsx("p", {
          children: "1"
        }), undefined, runtime.jsx("p", {
          children: "3"
        }), runtime.jsxs("svg", {
          viewBox: "0 0 300 100",
          xmlns: "http://www.w3.org/2000/svg",
          stroke: "red",
          fill: "grey",
          children: [runtime.jsx("circle", {
            cx: "50",
            cy: "50",
            r: "40"
          }), runtime.jsx("circle", {
            cx: "150",
            cy: "50",
            r: "4"
          }), runtime.jsx("svg", {
            viewBox: "0 0 10 10",
            x: "200",
            width: "100",
            children: runtime.jsx("circle", {
              cx: "5",
              cy: "5",
              r: "6"
            })
          })]
        }), runtime.jsx("p", {
          children: "new span B at end"
        })]
      })]
    });
  }

  var obj = {
    a: 1
  };

  function markup4(num) {
    obj.a = num;
    return num === 1 ? runtime.jsxs("h1", {
      obj: obj,
      id: obj.a,
      children: ["old-Headline ", num]
    }) : runtime.jsxs("h1", {
      obj: obj,
      "class": "a",
      id: obj.a,
      children: ["new-Headline ", num]
    });
  }

  function markup(num) {
    return num === 1 ? runtime.jsx("div", {
      children: runtime.jsxs(runtime.Fragment, {
        children: [runtime.jsx("p", {
          children: "frag - I"
        }), runtime.jsx("b", {
          children: " frag - II"
        })]
      })
    }) : runtime.jsxs("h1", {
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

  debugger;
  Object(runtime["render"])(markup(1), document.body); //document.getElementById("outer")?.setAttribute("data-foo", "mod");
  //document.getElementById("inner")?.setAttribute("data-foo", "mod");
  //render(markup(2), document.body);
  //render(markup, document.body, true);

  window.reRender1 = function () {
    return Object(runtime["render"])(markup(1), document.body);
  };

  window.reRender2 = function () {
    return Object(runtime["render"])(markup(2), document.body);
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