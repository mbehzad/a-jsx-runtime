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
 * to render parsed jsx code to html strings
 */
// props which will be rendered as attributes
// Functions will be used for event listeners. (attribute name should start with on / on-)
// additional attributes which can have additional serialization before rendering as attributes
// child elements in the jsx markup which will be passed to the h function as `props.children`

/**
 * props object which will be passed to jsx pragma and custom component functions
 */
// base class which will be inherited from jsx and fragments function node generation
// and will be used to distinguish them with other Elements
class JsxNode {} // private key for calling the `ref` callers


const _callRefs = Symbol("callRefs"); // jsx and Fragment will return objects which implement this interface


/**
 * returns true if not nullish or false
 * that means 0 or empty string are allowed
 * @param {*} val
 */
function positive(val) {
  return val !== false && val !== null && val !== undefined;
}

function truthy(value) {
  return value !== false && value !== null && value !== undefined;
}
/**
 * escapes the provided string against xss attacks
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
  if (element instanceof DocumentFragment) return Array.from(element.childNodes).map(el => getOuterHtml(el)).join("");
}

function asHtmlString(tag, props) {
  if (typeof tag === "function") {
    // @TODO: what if not jsx is returned
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
    .filter(([, v]) => truthy(value)) // currently supports "background-color" not "backgroundColor"
    .map(([k, v]) => `${k}: ${v}`).join("; "); // (class:) ["btn", "red"] ==> "btn red"

    if (key === "class" && Array.isArray(value)) value = value.join(" ");
    return `${key}="${value}"`;
  }).join(" ");
  const content = children.filter(truthy).map(child => child instanceof Node ? getOuterHtml(child) : typeof child === "object" ? child.toString() : sanitize(child)).join("");
  return `<${tag} ${attributes}>${content}</${tag}>`;
}

function asNode(tag, props) {
  if (typeof tag === "function") {
    let result = tag(props);
    let jsxNodes = [];

    if (result instanceof JsxNode) {
      jsxNodes = [result];
      result = result.asNode();
      Object.entries(props).forEach(([key, value]) => {
        if (key.startsWith("on-") && (typeof value === "function" || typeof value === "object")) {
          // remove leading "on-""
          let event = key.replace(/^on-/, ""); // change first letter to lower case. e.g "(on)Click" => "click"

          event = `${event[0].toLowerCase()}${event.substring(1)}`;
          result.addEventListener(event, value);
        }
      });
    }

    return [result, jsxNodes];
  }

  const {
    children,
    ...attrs
  } = props; // currently not supporting the `is` option for Customized built-in elements

  const node = document.createElement(tag);
  Object.entries(attrs).filter(([_key, value]) => truthy(value)).forEach(([key, value]) => {
    // for style as object:
    // (style:) {display: "none", position: "absolute"} ==> 'display: none; position: absolute;'
    if (key === "style" && typeof value === "object") value = Object.entries(value).filter(([, v]) => truthy(value)).map(([k, v]) => `${k}: ${v}`).join("; "); // (class:) ["btn", "red"] ==> "btn red"

    if (key === "class" && Array.isArray(value)) value = value.join(" ");
    if (value === true) node.setAttribute(key, "");else if (typeof value === "string" || typeof value === "number") node.setAttribute(key, String(value)); // key has the form of "onClick" or "on-change". value is the callback function or an object implementing {EventListener} interface
    else if (key.startsWith("on-") && (typeof value === "function" || typeof value === "object")) {
        // remove leading "on-""
        let event = key.replace(/^on-/, ""); // change first letter to lower case. e.g "(on)Click" => "click"

        event = `${event[0].toLowerCase()}${event.substring(1)}`;
        node.addEventListener(event, value);
      } // @ts-ignore - providing the value as property to html element
      else node[key] = value;
  });
  const jsxNodes = children.filter(child => child instanceof JsxNode);
  node.append(...children //.flat()
  .filter(truthy).map(child => child instanceof Node ? child : child instanceof JsxNode ? child.asNode() : child));
  return [node, jsxNodes];
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
      //console.log("jsxs, toString", rnd, { tag, props });
      //console.error(new Error())
      return asHtmlString(tag, props);
    }

    asNode() {
      [node, jsxNodes] = asNode(tag, props);

      if (!jsxNodes) {// debugger;
      }

      return node;
    }

    [_callRefs]() {
      if (ref && node) ref(node);

      if (typeof tag === "function") {
        jsxNodes.forEach(node => node[_callRefs]());
      } else if (props.children) {
        props.children //.flat()
        .filter(child => child instanceof JsxNode).forEach(child => child[_callRefs]());
      }
    }

  }();
}
/**
 * converts the fragments object to nodes
 *
 * @param {Object} props
 * @param {Array} props.children - child elements in the fragment
 */

function Fragment({
  children
}) {
  return new class extends JsxNode {
    toString() {
      return children //.flat()
      .filter(truthy).map(child => child instanceof Node ? getOuterHtml(child) : typeof child === "object" ? child.toString() : sanitize(child)).join("");
    }

    asNode() {
      const fragments = children.filter(truthy).map(item => item instanceof Node ? item : item instanceof JsxNode ? item.asNode() : item);
      const documentFragment = document.createDocumentFragment();
      documentFragment.append(...fragments);
      return documentFragment;
    }

    [_callRefs]() {
      children.filter(child => child instanceof JsxNode).forEach(child => child[_callRefs]());
    }

  }();
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
  if (!append) domNode.innerHTML = "";

  if (typeof markup === "string") {
    domNode.insertAdjacentHTML("afterbegin", markup);
  } else if (markup instanceof Node) {
    domNode.insertAdjacentElement("afterbegin", markup);
  } else if (markup instanceof JsxNode) {
    const content = markup.asNode();
    domNode.append(content);

    markup[_callRefs]();
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

    [_callRefs]() {// noop
    }

  }();
}
console.log("ts");

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

function RTE(props
/*{ txt, "on-click": onClick }*/
) {
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

var markup = Object(C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])(C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["Fragment"], {
  children: [Object(C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("div", {
    "class": "foo",
    ref: function ref(el) {
      return console.log("my div ::ref::4", el);
    }
  }), Object(C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("input", {
    disabled: true,
    hidden: false
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
    })]
  }), Object(C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(RTE, {
    txt: "le text",
    ref: function ref(el) {
      return console.log("my div ::ref::3.1", el);
    },
    "on-click": function onClick(e) {
      return console.log(e);
    }
  }), xss, Object(C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["rawHtml"])("<ol><li>raw html</li></ol>"), Object(C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("div", {
    "class": "bam",
    ref: function ref(el) {
      return console.log("my div::ref::7", el);
    },
    children: Object(C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])("div", {
      children: [Object(C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("div", {
        "class": "bar",
        "on-click": function onClick(e) {
          return console.log(e);
        },
        ref: reflog,
        children: "click ME"
      }), Object(C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])("div", {
        style: {
          outline: "1px solid red;"
        },
        children: [document.querySelector("#old"), null, [0, 1].map(function (n) {
          return Object(C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("span", {
            children: n
          });
        })]
      })]
    })
  })]
});
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
//console.log(markup);
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

Object(C_Develop_mehran_jsx_jsx_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["render"])(markup, document.body, true); //render(markup, document.body, true);

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vanN4L2pzeC1ydW50aW1lLnRzIiwid2VicGFjazovLy8uL21haW4udHN4Il0sIm5hbWVzIjpbIkpzeE5vZGUiLCJfY2FsbFJlZnMiLCJTeW1ib2wiLCJwb3NpdGl2ZSIsInZhbCIsInVuZGVmaW5lZCIsInRydXRoeSIsInZhbHVlIiwic2FuaXRpemUiLCJ0ZXh0IiwiZGl2IiwiZG9jdW1lbnQiLCJjcmVhdGVFbGVtZW50IiwiaW5uZXJUZXh0IiwiaW5uZXJIVE1MIiwiZ2V0T3V0ZXJIdG1sIiwiZWxlbWVudCIsIkVsZW1lbnQiLCJvdXRlckhUTUwiLCJUZXh0Iiwid2hvbGVUZXh0IiwiRG9jdW1lbnRGcmFnbWVudCIsIkFycmF5IiwiZnJvbSIsImNoaWxkTm9kZXMiLCJtYXAiLCJlbCIsImpvaW4iLCJhc0h0bWxTdHJpbmciLCJ0YWciLCJwcm9wcyIsInRvU3RyaW5nIiwiY2hpbGRyZW4iLCJhdHRycyIsImF0dHJpYnV0ZXMiLCJPYmplY3QiLCJlbnRyaWVzIiwiZmlsdGVyIiwia2V5IiwidiIsImsiLCJpc0FycmF5IiwiY29udGVudCIsImNoaWxkIiwiTm9kZSIsImFzTm9kZSIsInJlc3VsdCIsImpzeE5vZGVzIiwiZm9yRWFjaCIsInN0YXJ0c1dpdGgiLCJldmVudCIsInJlcGxhY2UiLCJ0b0xvd2VyQ2FzZSIsInN1YnN0cmluZyIsImFkZEV2ZW50TGlzdGVuZXIiLCJub2RlIiwiX2tleSIsInNldEF0dHJpYnV0ZSIsIlN0cmluZyIsImFwcGVuZCIsImpzeHMiLCJmbGF0IiwicmVmIiwiRnJhZ21lbnQiLCJmcmFnbWVudHMiLCJpdGVtIiwiZG9jdW1lbnRGcmFnbWVudCIsImNyZWF0ZURvY3VtZW50RnJhZ21lbnQiLCJqc3giLCJoYXNPd25Qcm9wZXJ0eSIsInJlbmRlciIsIm1hcmt1cCIsImRvbU5vZGUiLCJpbnNlcnRBZGphY2VudEhUTUwiLCJpbnNlcnRBZGphY2VudEVsZW1lbnQiLCJFcnJvciIsInJhd0h0bWwiLCJ0ZW1wbGF0ZSIsImNvbnNvbGUiLCJsb2ciLCJ4c3MiLCJSVEUiLCJ0eHQiLCJCdXR0b24iLCJkaXNhYmxlZCIsInJlZmxvZyIsImUiLCJvdXRsaW5lIiwicXVlcnlTZWxlY3RvciIsIm4iLCJQb3BVcEluZm8iLCJIVE1MRWxlbWVudCIsImN1c3RvbUVsZW1lbnRzIiwiZGVmaW5lIiwiYm9keSJdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EseUNBQXlDLGlDQUFpQztRQUMxRSxnSEFBZ0gsbUJBQW1CLEVBQUU7UUFDckk7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBCLEVBQUU7UUFDdkQsaUNBQWlDLGVBQWU7UUFDaEQ7UUFDQTtRQUNBOztRQUVBO1FBQ0Esc0RBQXNELCtEQUErRDs7UUFFckg7UUFDQTs7O1FBR0E7UUFDQTs7Ozs7Ozs7Ozs7OztBQ2xGQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7OztBQUtBO0FBQ0E7QUFHQTtBQU9BOztBQUtBOzs7QUFLQTtBQUNBO0FBQ0EsTUFBTUEsT0FBTixDQUFjLEUsQ0FFZDs7O0FBQ0EsTUFBTUMsU0FBUyxHQUFHQyxNQUFNLENBQUMsVUFBRCxDQUF4QixDLENBRUE7OztBQU9BOzs7OztBQUtBLFNBQVNDLFFBQVQsQ0FBa0JDLEdBQWxCLEVBQXFDO0FBQ25DLFNBQU9BLEdBQUcsS0FBSyxLQUFSLElBQWlCQSxHQUFHLEtBQUssSUFBekIsSUFBaUNBLEdBQUcsS0FBS0MsU0FBaEQ7QUFDRDs7QUFFRCxTQUFTQyxNQUFULENBQWdCQyxLQUFoQixFQUFxQztBQUNuQyxTQUFPQSxLQUFLLEtBQUssS0FBVixJQUFtQkEsS0FBSyxLQUFLLElBQTdCLElBQXFDQSxLQUFLLEtBQUtGLFNBQXREO0FBQ0Q7QUFFRDs7Ozs7Ozs7QUFNQSxTQUFTRyxRQUFULENBQWtCQyxJQUFsQixFQUF3QztBQUN0QyxRQUFNQyxHQUFHLEdBQUdDLFFBQVEsQ0FBQ0MsYUFBVCxDQUF1QixLQUF2QixDQUFaO0FBQ0FGLEtBQUcsQ0FBQ0csU0FBSixHQUFnQkosSUFBaEI7QUFDQSxTQUFPQyxHQUFHLENBQUNJLFNBQVg7QUFDRDtBQUVEOzs7Ozs7QUFJQSxTQUFTQyxZQUFULENBQXNCQyxPQUF0QixFQUE2QztBQUMzQyxNQUFJQSxPQUFPLFlBQVlDLE9BQXZCLEVBQWdDLE9BQU9ELE9BQU8sQ0FBQ0UsU0FBZjtBQUNoQyxNQUFJRixPQUFPLFlBQVlHLElBQXZCLEVBQTZCLE9BQU9YLFFBQVEsQ0FBQ1EsT0FBTyxDQUFDSSxTQUFULENBQWY7QUFDN0IsTUFBSUosT0FBTyxZQUFZSyxnQkFBdkIsRUFDRSxPQUFPQyxLQUFLLENBQUNDLElBQU4sQ0FBV1AsT0FBTyxDQUFDUSxVQUFuQixFQUNKQyxHQURJLENBQ0NDLEVBQUQsSUFBUVgsWUFBWSxDQUFDVyxFQUFELENBRHBCLEVBRUpDLElBRkksQ0FFQyxFQUZELENBQVA7QUFHSDs7QUFFRCxTQUFTQyxZQUFULENBQXNCQyxHQUF0QixFQUE4Q0MsS0FBOUMsRUFBK0Q7QUFDN0QsTUFBSSxPQUFPRCxHQUFQLEtBQWUsVUFBbkIsRUFBK0I7QUFDN0I7QUFDQSxVQUFNYixPQUFnQixHQUFHYSxHQUFHLENBQUNDLEtBQUQsQ0FBNUI7QUFFQSxXQUFPZCxPQUFPLENBQUNlLFFBQVIsRUFBUDtBQUNELEdBTjRELENBUTdEO0FBQ0E7OztBQUNBLFFBQU07QUFBRUMsWUFBRjtBQUFZLE9BQUdDO0FBQWYsTUFBeUJILEtBQS9CO0FBRUEsUUFBTUksVUFBVSxHQUFHQyxNQUFNLENBQUNDLE9BQVAsQ0FBZUgsS0FBZixFQUNoQkksTUFEZ0IsQ0FDVCxDQUFDLEdBQUc5QixLQUFILENBQUQsS0FBZUQsTUFBTSxDQUFDQyxLQUFELENBRFosRUFFaEJrQixHQUZnQixDQUVaLENBQUMsQ0FBQ2EsR0FBRCxFQUFNL0IsS0FBTixDQUFELEtBQWtCO0FBQ3JCO0FBQ0EsUUFBSUEsS0FBSyxLQUFLLElBQWQsRUFBb0IsT0FBTytCLEdBQVAsQ0FGQyxDQUlyQjtBQUNBOztBQUNBLFFBQUlBLEdBQUcsS0FBSyxPQUFSLElBQW1CLE9BQU8vQixLQUFQLEtBQWlCLFFBQXhDLEVBQ0VBLEtBQUssR0FBRzRCLE1BQU0sQ0FBQ0MsT0FBUCxDQUFlN0IsS0FBZixFQUNOO0FBRE0sS0FFTDhCLE1BRkssQ0FFRSxDQUFDLEdBQUdFLENBQUgsQ0FBRCxLQUFXakMsTUFBTSxDQUFDQyxLQUFELENBRm5CLEVBR047QUFITSxLQUlMa0IsR0FKSyxDQUlELENBQUMsQ0FBQ2UsQ0FBRCxFQUFJRCxDQUFKLENBQUQsS0FBYSxHQUFFQyxDQUFFLEtBQUlELENBQUUsRUFKdEIsRUFLTFosSUFMSyxDQUtBLElBTEEsQ0FBUixDQVBtQixDQWNyQjs7QUFDQSxRQUFJVyxHQUFHLEtBQUssT0FBUixJQUFtQmhCLEtBQUssQ0FBQ21CLE9BQU4sQ0FBY2xDLEtBQWQsQ0FBdkIsRUFBNkNBLEtBQUssR0FBR0EsS0FBSyxDQUFDb0IsSUFBTixDQUFXLEdBQVgsQ0FBUjtBQUU3QyxXQUFRLEdBQUVXLEdBQUksS0FBSS9CLEtBQU0sR0FBeEI7QUFDRCxHQXBCZ0IsRUFxQmhCb0IsSUFyQmdCLENBcUJYLEdBckJXLENBQW5CO0FBdUJBLFFBQU1lLE9BQU8sR0FBR1YsUUFBUSxDQUNyQkssTUFEYSxDQUNOL0IsTUFETSxFQUVibUIsR0FGYSxDQUVSa0IsS0FBRCxJQUNIQSxLQUFLLFlBQVlDLElBQWpCLEdBQ0k3QixZQUFZLENBQUM0QixLQUFELENBRGhCLEdBRUksT0FBT0EsS0FBUCxLQUFpQixRQUFqQixHQUNBQSxLQUFLLENBQUNaLFFBQU4sRUFEQSxHQUVBdkIsUUFBUSxDQUFDbUMsS0FBRCxDQVBBLEVBU2JoQixJQVRhLENBU1IsRUFUUSxDQUFoQjtBQVdBLFNBQVEsSUFBR0UsR0FBSSxJQUFHSyxVQUFXLElBQUdRLE9BQVEsS0FBSWIsR0FBSSxHQUFoRDtBQUNEOztBQUVELFNBQVNnQixNQUFULENBQWdCaEIsR0FBaEIsRUFBd0NDLEtBQXhDLEVBQTRFO0FBQzFFLE1BQUksT0FBT0QsR0FBUCxLQUFlLFVBQW5CLEVBQStCO0FBQzdCLFFBQUlpQixNQUFNLEdBQUdqQixHQUFHLENBQUNDLEtBQUQsQ0FBaEI7QUFFQSxRQUFJaUIsUUFBbUIsR0FBRyxFQUExQjs7QUFFQSxRQUFJRCxNQUFNLFlBQVk5QyxPQUF0QixFQUErQjtBQUM3QitDLGNBQVEsR0FBRyxDQUFDRCxNQUFELENBQVg7QUFDQUEsWUFBTSxHQUFJQSxNQUFELENBQTZCRCxNQUE3QixFQUFUO0FBQ0FWLFlBQU0sQ0FBQ0MsT0FBUCxDQUFlTixLQUFmLEVBQXNCa0IsT0FBdEIsQ0FBOEIsQ0FBQyxDQUFDVixHQUFELEVBQU0vQixLQUFOLENBQUQsS0FBa0I7QUFDOUMsWUFDRStCLEdBQUcsQ0FBQ1csVUFBSixDQUFlLEtBQWYsTUFDQyxPQUFPMUMsS0FBUCxLQUFpQixVQUFqQixJQUErQixPQUFPQSxLQUFQLEtBQWlCLFFBRGpELENBREYsRUFHRTtBQUNBO0FBQ0EsY0FBSTJDLEtBQUssR0FBR1osR0FBRyxDQUFDYSxPQUFKLENBQVksTUFBWixFQUFvQixFQUFwQixDQUFaLENBRkEsQ0FHQTs7QUFDQUQsZUFBSyxHQUFJLEdBQUVBLEtBQUssQ0FBQyxDQUFELENBQUwsQ0FBU0UsV0FBVCxFQUF1QixHQUFFRixLQUFLLENBQUNHLFNBQU4sQ0FBZ0IsQ0FBaEIsQ0FBbUIsRUFBdkQ7QUFFQVAsZ0JBQU0sQ0FBQ1EsZ0JBQVAsQ0FDRUosS0FERixFQUVFM0MsS0FGRjtBQUlEO0FBQ0YsT0FmRDtBQWdCRDs7QUFFRCxXQUFPLENBQUN1QyxNQUFELEVBQVNDLFFBQVQsQ0FBUDtBQUNEOztBQUVELFFBQU07QUFBRWYsWUFBRjtBQUFZLE9BQUdDO0FBQWYsTUFBeUJILEtBQS9CLENBOUIwRSxDQWdDMUU7O0FBQ0EsUUFBTXlCLElBQUksR0FBRzVDLFFBQVEsQ0FBQ0MsYUFBVCxDQUF1QmlCLEdBQXZCLENBQWI7QUFFQU0sUUFBTSxDQUFDQyxPQUFQLENBQWVILEtBQWYsRUFDR0ksTUFESCxDQUNVLENBQUMsQ0FBQ21CLElBQUQsRUFBT2pELEtBQVAsQ0FBRCxLQUFtQkQsTUFBTSxDQUFDQyxLQUFELENBRG5DLEVBRUd5QyxPQUZILENBRVcsQ0FBQyxDQUFDVixHQUFELEVBQU0vQixLQUFOLENBQUQsS0FBa0I7QUFDekI7QUFDQTtBQUNBLFFBQUkrQixHQUFHLEtBQUssT0FBUixJQUFtQixPQUFPL0IsS0FBUCxLQUFpQixRQUF4QyxFQUNFQSxLQUFLLEdBQUc0QixNQUFNLENBQUNDLE9BQVAsQ0FBZTdCLEtBQWYsRUFDTDhCLE1BREssQ0FDRSxDQUFDLEdBQUdFLENBQUgsQ0FBRCxLQUFXakMsTUFBTSxDQUFDQyxLQUFELENBRG5CLEVBRUxrQixHQUZLLENBRUQsQ0FBQyxDQUFDZSxDQUFELEVBQUlELENBQUosQ0FBRCxLQUFhLEdBQUVDLENBQUUsS0FBSUQsQ0FBRSxFQUZ0QixFQUdMWixJQUhLLENBR0EsSUFIQSxDQUFSLENBSnVCLENBU3pCOztBQUNBLFFBQUlXLEdBQUcsS0FBSyxPQUFSLElBQW1CaEIsS0FBSyxDQUFDbUIsT0FBTixDQUFjbEMsS0FBZCxDQUF2QixFQUE2Q0EsS0FBSyxHQUFHQSxLQUFLLENBQUNvQixJQUFOLENBQVcsR0FBWCxDQUFSO0FBRTdDLFFBQUlwQixLQUFLLEtBQUssSUFBZCxFQUFvQmdELElBQUksQ0FBQ0UsWUFBTCxDQUFrQm5CLEdBQWxCLEVBQXVCLEVBQXZCLEVBQXBCLEtBQ0ssSUFBSSxPQUFPL0IsS0FBUCxLQUFpQixRQUFqQixJQUE2QixPQUFPQSxLQUFQLEtBQWlCLFFBQWxELEVBQ0hnRCxJQUFJLENBQUNFLFlBQUwsQ0FBa0JuQixHQUFsQixFQUF1Qm9CLE1BQU0sQ0FBQ25ELEtBQUQsQ0FBN0IsRUFERyxDQUVMO0FBRkssU0FHQSxJQUNIK0IsR0FBRyxDQUFDVyxVQUFKLENBQWUsS0FBZixNQUNDLE9BQU8xQyxLQUFQLEtBQWlCLFVBQWpCLElBQStCLE9BQU9BLEtBQVAsS0FBaUIsUUFEakQsQ0FERyxFQUdIO0FBQ0E7QUFDQSxZQUFJMkMsS0FBSyxHQUFHWixHQUFHLENBQUNhLE9BQUosQ0FBWSxNQUFaLEVBQW9CLEVBQXBCLENBQVosQ0FGQSxDQUdBOztBQUNBRCxhQUFLLEdBQUksR0FBRUEsS0FBSyxDQUFDLENBQUQsQ0FBTCxDQUFTRSxXQUFULEVBQXVCLEdBQUVGLEtBQUssQ0FBQ0csU0FBTixDQUFnQixDQUFoQixDQUFtQixFQUF2RDtBQUVBRSxZQUFJLENBQUNELGdCQUFMLENBQ0VKLEtBREYsRUFFRTNDLEtBRkY7QUFJRCxPQWJJLENBY0w7QUFkSyxXQWVBZ0QsSUFBSSxDQUFDakIsR0FBRCxDQUFKLEdBQVkvQixLQUFaO0FBQ04sR0FsQ0g7QUFvQ0EsUUFBTXdDLFFBQVEsR0FBR2YsUUFBUSxDQUFDSyxNQUFULENBQWlCTSxLQUFELElBQVdBLEtBQUssWUFBWTNDLE9BQTVDLENBQWpCO0FBRUF1RCxNQUFJLENBQUNJLE1BQUwsQ0FDRSxHQUFHM0IsUUFBUSxDQUNUO0FBRFMsR0FFUkssTUFGQSxDQUVPL0IsTUFGUCxFQUdBbUIsR0FIQSxDQUdLa0IsS0FBRCxJQUNIQSxLQUFLLFlBQVlDLElBQWpCLEdBQ0lELEtBREosR0FFSUEsS0FBSyxZQUFZM0MsT0FBakIsR0FDQTJDLEtBQUssQ0FBQ0UsTUFBTixFQURBLEdBRUFGLEtBUkwsQ0FETDtBQWFBLFNBQU8sQ0FBQ1ksSUFBRCxFQUFPUixRQUFQLENBQVA7QUFDRDtBQUVEOzs7Ozs7Ozs7QUFPTyxTQUFTYSxJQUFULENBQ0wvQixHQURLLEVBRUxDLEtBRkssRUFHYTtBQUNsQixNQUFJeUIsSUFBSjtBQUNBLE1BQUlSLFFBQUo7QUFDQWpCLE9BQUssQ0FBQ0UsUUFBTixHQUFpQkYsS0FBSyxDQUFDRSxRQUFOLENBQWU2QixJQUFmLEVBQWpCLENBSGtCLENBR3NCO0FBRXhDOztBQUNBLFFBQU1DLEdBQW9CLEdBQ3hCLE9BQU9oQyxLQUFLLENBQUNnQyxHQUFiLEtBQXFCLFVBQXJCLEdBQWtDaEMsS0FBSyxDQUFDZ0MsR0FBeEMsR0FBOEMsSUFEaEQ7QUFFQSxNQUFJQSxHQUFKLEVBQVMsT0FBT2hDLEtBQUssQ0FBQ2dDLEdBQWI7QUFFVCxTQUFPLElBQUssY0FBYzlELE9BQWQsQ0FBa0Q7QUFDNUQrQixZQUFRLEdBQUc7QUFDVDtBQUNBO0FBRUEsYUFBT0gsWUFBWSxDQUFDQyxHQUFELEVBQU1DLEtBQU4sQ0FBbkI7QUFDRDs7QUFFRGUsVUFBTSxHQUFHO0FBQ1AsT0FBQ1UsSUFBRCxFQUFPUixRQUFQLElBQW1CRixNQUFNLENBQUNoQixHQUFELEVBQU1DLEtBQU4sQ0FBekI7O0FBRUEsVUFBSSxDQUFDaUIsUUFBTCxFQUFlLENBQ2I7QUFDRDs7QUFFRCxhQUFPUSxJQUFQO0FBQ0Q7O0FBRUQsS0FBQ3RELFNBQUQsSUFBYztBQUNaLFVBQUk2RCxHQUFHLElBQUlQLElBQVgsRUFBaUJPLEdBQUcsQ0FBQ1AsSUFBRCxDQUFIOztBQUVqQixVQUFJLE9BQU8xQixHQUFQLEtBQWUsVUFBbkIsRUFBK0I7QUFDN0JrQixnQkFBUSxDQUFDQyxPQUFULENBQWtCTyxJQUFELElBQVVBLElBQUksQ0FBQ3RELFNBQUQsQ0FBSixFQUEzQjtBQUNELE9BRkQsTUFFTyxJQUFJNkIsS0FBSyxDQUFDRSxRQUFWLEVBQW9CO0FBQ3pCRixhQUFLLENBQUNFLFFBQU4sQ0FDRTtBQURGLFNBRUdLLE1BRkgsQ0FFV00sS0FBRCxJQUFXQSxLQUFLLFlBQVkzQyxPQUZ0QyxFQUdHZ0QsT0FISCxDQUdZTCxLQUFELElBQTZCQSxLQUFLLENBQUMxQyxTQUFELENBQUwsRUFIeEM7QUFJRDtBQUNGOztBQTdCMkQsR0FBdkQsRUFBUDtBQStCRDtBQUVEOzs7Ozs7O0FBTU8sU0FBUzhELFFBQVQsQ0FBa0I7QUFDdkIvQjtBQUR1QixDQUFsQixFQUlKO0FBQ0QsU0FBTyxJQUFLLGNBQWNoQyxPQUFkLENBQWtEO0FBQzVEK0IsWUFBUSxHQUFHO0FBQ1QsYUFDRUMsUUFBUSxDQUNOO0FBRE0sT0FFTEssTUFGSCxDQUVVL0IsTUFGVixFQUdHbUIsR0FISCxDQUdRa0IsS0FBRCxJQUNIQSxLQUFLLFlBQVlDLElBQWpCLEdBQ0k3QixZQUFZLENBQUM0QixLQUFELENBRGhCLEdBRUksT0FBT0EsS0FBUCxLQUFpQixRQUFqQixHQUNBQSxLQUFLLENBQUNaLFFBQU4sRUFEQSxHQUVBdkIsUUFBUSxDQUFDbUMsS0FBRCxDQVJoQixFQVVHaEIsSUFWSCxDQVVRLEVBVlIsQ0FERjtBQWFEOztBQUVEa0IsVUFBTSxHQUFHO0FBQ1AsWUFBTW1CLFNBQVMsR0FBR2hDLFFBQVEsQ0FDdkJLLE1BRGUsQ0FDUi9CLE1BRFEsRUFFZm1CLEdBRmUsQ0FFVndDLElBQUQsSUFDSEEsSUFBSSxZQUFZckIsSUFBaEIsR0FDSXFCLElBREosR0FFSUEsSUFBSSxZQUFZakUsT0FBaEIsR0FDQWlFLElBQUksQ0FBQ3BCLE1BQUwsRUFEQSxHQUVBb0IsSUFQVSxDQUFsQjtBQVVBLFlBQU1DLGdCQUFnQixHQUFHdkQsUUFBUSxDQUFDd0Qsc0JBQVQsRUFBekI7QUFFQUQsc0JBQWdCLENBQUNQLE1BQWpCLENBQXdCLEdBQUdLLFNBQTNCO0FBQ0EsYUFBT0UsZ0JBQVA7QUFDRDs7QUFFRCxLQUFDakUsU0FBRCxJQUFjO0FBQ1orQixjQUFRLENBQ0xLLE1BREgsQ0FDV00sS0FBRCxJQUFXQSxLQUFLLFlBQVkzQyxPQUR0QyxFQUVHZ0QsT0FGSCxDQUVZTCxLQUFELElBQTZCQSxLQUFLLENBQUMxQyxTQUFELENBQUwsRUFGeEM7QUFHRDs7QUF0QzJELEdBQXZELEVBQVA7QUF3Q0QsQyxDQUVEOztBQUNPLFNBQVNtRSxHQUFULENBQ0x2QyxHQURLLEVBRUxDLEtBRkssRUFJYTtBQUNsQjtBQUNBQSxPQUFLLENBQUNFLFFBQU4sR0FBaUJGLEtBQUssQ0FBQ3VDLGNBQU4sQ0FBcUIsVUFBckIsSUFBbUMsQ0FBQ3ZDLEtBQUssQ0FBQ0UsUUFBUCxDQUFuQyxHQUFzRCxFQUF2RTtBQUVBLFNBQU80QixJQUFJLENBQUMvQixHQUFELEVBQU9DLEtBQVAsQ0FBWDtBQUNEO0FBRUQ7Ozs7Ozs7O0FBT08sU0FBU3dDLE1BQVQsQ0FDTEMsTUFESyxFQUM0QztBQUNqREMsT0FGSyxFQUdMYixNQUFlLEdBQUcsS0FIYixFQUlMO0FBQ0EsTUFBSSxDQUFDQSxNQUFMLEVBQWFhLE9BQU8sQ0FBQzFELFNBQVIsR0FBb0IsRUFBcEI7O0FBRWIsTUFBSSxPQUFPeUQsTUFBUCxLQUFrQixRQUF0QixFQUFnQztBQUM5QkMsV0FBTyxDQUFDQyxrQkFBUixDQUEyQixZQUEzQixFQUF5Q0YsTUFBekM7QUFDRCxHQUZELE1BRU8sSUFBSUEsTUFBTSxZQUFZM0IsSUFBdEIsRUFBNEI7QUFDakM0QixXQUFPLENBQUNFLHFCQUFSLENBQThCLFlBQTlCLEVBQTRDSCxNQUE1QztBQUNELEdBRk0sTUFFQSxJQUFJQSxNQUFNLFlBQVl2RSxPQUF0QixFQUErQjtBQUNwQyxVQUFNMEMsT0FBTyxHQUFHNkIsTUFBTSxDQUFDMUIsTUFBUCxFQUFoQjtBQUVBMkIsV0FBTyxDQUFDYixNQUFSLENBQWVqQixPQUFmOztBQUVBNkIsVUFBTSxDQUFDdEUsU0FBRCxDQUFOO0FBQ0QsR0FOTSxNQU1BO0FBQ0wsVUFBTSxJQUFJMEUsS0FBSixDQUFVLDZDQUFWLENBQU47QUFDRDtBQUNGO0FBRU0sU0FBU0MsT0FBVCxDQUFpQmxDLE9BQWpCLEVBQW9EO0FBQ3pELFNBQU8sSUFBSyxjQUFjMUMsT0FBZCxDQUFrRDtBQUM1RCtCLFlBQVEsR0FBRztBQUNULGFBQU9XLE9BQVA7QUFDRDs7QUFFREcsVUFBTSxHQUFHO0FBQ1AsWUFBTWdDLFFBQVEsR0FBR2xFLFFBQVEsQ0FBQ0MsYUFBVCxDQUF1QixVQUF2QixDQUFqQjtBQUNBaUUsY0FBUSxDQUFDL0QsU0FBVCxHQUFxQjRCLE9BQXJCO0FBQ0EsYUFBT21DLFFBQVEsQ0FBQ25DLE9BQWhCO0FBQ0Q7O0FBRUQsS0FBQ3pDLFNBQUQsSUFBYyxDQUNaO0FBQ0Q7O0FBYjJELEdBQXZELEVBQVA7QUFlRDtBQUVENkUsT0FBTyxDQUFDQyxHQUFSLENBQVksSUFBWixFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDN1hBO0FBR0EsSUFBTUMsR0FBRyxHQUFHLDZDQUFaLEMsQ0FBMkQ7O0FBRTNELFNBQVNDLEdBQVQsQ0FBYW5EO0FBQUs7QUFBbEIsRUFBcUY7QUFDbkZnRCxTQUFPLENBQUNDLEdBQVIsQ0FBWSxTQUFaLEVBQXVCakQsS0FBSyxDQUFDLFVBQUQsQ0FBNUI7QUFDQSxTQUNFO0FBQUcsT0FBRyxFQUFFLGFBQUNKLEVBQUQ7QUFBQSxhQUFxQm9ELE9BQU8sQ0FBQ0MsR0FBUixDQUFZLG1CQUFaLEVBQWlDckQsRUFBakMsQ0FBckI7QUFBQSxLQUFSO0FBQUEsY0FBb0VJLEtBQUssQ0FBQ29EO0FBQTFFLElBREY7QUFHRDs7QUFFRCxTQUFTQyxNQUFULE9BT0c7QUFBQSxNQU5EbkQsUUFNQyxRQU5EQSxRQU1DO0FBQUEsTUFMRG9ELFFBS0MsUUFMREEsUUFLQztBQUNELFNBQ0U7QUFDRSxZQUFRLEVBQUVBLFFBRFo7QUFFRSxPQUFHLEVBQUUsYUFBQzFELEVBQUQ7QUFBQSxhQUFxQm9ELE9BQU8sQ0FBQ0MsR0FBUixDQUFZLG9CQUFaLEVBQWtDckQsRUFBbEMsQ0FBckI7QUFBQSxLQUZQO0FBQUEsZUFJRTtBQUFNLFNBQUcsRUFBRSxhQUFDQSxFQUFEO0FBQUEsZUFBcUJvRCxPQUFPLENBQUNDLEdBQVIsQ0FBWSxlQUFaLEVBQTZCckQsRUFBN0IsQ0FBckI7QUFBQSxPQUFYO0FBQUE7QUFBQSxNQUpGLEVBS0dNLFFBTEgsRUFNRTtBQUFBLGdCQUNFO0FBQU0sV0FBRyxFQUFFLGFBQUNOLEVBQUQ7QUFBQSxpQkFBcUJvRCxPQUFPLENBQUNDLEdBQVIsQ0FBWSxlQUFaLEVBQTZCckQsRUFBN0IsQ0FBckI7QUFBQSxTQUFYO0FBQUE7QUFBQTtBQURGLE1BTkY7QUFBQSxJQURGO0FBY0Q7O0FBRUQsU0FBUzJELE1BQVQsQ0FBZ0IzRCxFQUFoQixFQUFpQztBQUMvQm9ELFNBQU8sQ0FBQ0MsR0FBUixDQUFZLHNCQUFaLEVBQW9DckQsRUFBcEM7QUFDRDs7QUFFRCxJQUFNNkMsTUFBTSxHQUNWO0FBQUEsYUFDRTtBQUNFLGFBQU0sS0FEUjtBQUVFLE9BQUcsRUFBRSxhQUFDN0MsRUFBRDtBQUFBLGFBQXFCb0QsT0FBTyxDQUFDQyxHQUFSLENBQVksaUJBQVosRUFBK0JyRCxFQUEvQixDQUFyQjtBQUFBO0FBRlAsSUFERixFQUtFO0FBQU8sWUFBUSxFQUFFLElBQWpCO0FBQXVCLFVBQU0sRUFBRTtBQUEvQixJQUxGLEVBTUUsa0ZBQUMsTUFBRDtBQUNFLFlBQVEsRUFBRSxJQURaO0FBRUUsT0FBRyxFQUFFLGFBQUNBLEVBQUQ7QUFBQSxhQUFxQm9ELE9BQU8sQ0FBQ0MsR0FBUixDQUFZLG1CQUFaLEVBQWlDckQsRUFBakMsQ0FBckI7QUFBQSxLQUZQO0FBQUEsdUJBS0U7QUFDRSxTQUFHLEVBQUUsYUFBQ0EsRUFBRDtBQUFBLGVBQXFCb0QsT0FBTyxDQUFDQyxHQUFSLENBQVksd0JBQVosRUFBc0NyRCxFQUF0QyxDQUFyQjtBQUFBLE9BRFA7QUFBQTtBQUFBLE1BTEY7QUFBQSxJQU5GLEVBaUJFLGlGQUFDLEdBQUQ7QUFDRSxPQUFHLEVBQUMsU0FETjtBQUVFLE9BQUcsRUFBRSxhQUFDQSxFQUFEO0FBQUEsYUFBcUJvRCxPQUFPLENBQUNDLEdBQVIsQ0FBWSxtQkFBWixFQUFpQ3JELEVBQWpDLENBQXJCO0FBQUEsS0FGUDtBQUdFLGdCQUFVLGlCQUFDNEQsQ0FBRDtBQUFBLGFBQW9CUixPQUFPLENBQUNDLEdBQVIsQ0FBWU8sQ0FBWixDQUFwQjtBQUFBO0FBSFosSUFqQkYsRUFzQkdOLEdBdEJILEVBdUJHSixvRkFBTyw4QkF2QlYsRUF3QkU7QUFDRSxhQUFNLEtBRFI7QUFFRSxPQUFHLEVBQUUsYUFBQ2xELEVBQUQ7QUFBQSxhQUFxQm9ELE9BQU8sQ0FBQ0MsR0FBUixDQUFZLGdCQUFaLEVBQThCckQsRUFBOUIsQ0FBckI7QUFBQSxLQUZQO0FBQUEsY0FJRTtBQUFBLGlCQUNFO0FBQUssaUJBQU0sS0FBWDtBQUFpQixvQkFBVSxpQkFBQzRELENBQUQ7QUFBQSxpQkFBT1IsT0FBTyxDQUFDQyxHQUFSLENBQVlPLENBQVosQ0FBUDtBQUFBLFNBQTNCO0FBQWtELFdBQUcsRUFBRUQsTUFBdkQ7QUFBQTtBQUFBLFFBREYsRUFJRTtBQUFLLGFBQUssRUFBRTtBQUFFRSxpQkFBTyxFQUFFO0FBQVgsU0FBWjtBQUFBLG1CQUNHNUUsUUFBUSxDQUFDNkUsYUFBVCxDQUF1QixNQUF2QixDQURILEVBRUcsSUFGSCxFQUdHLENBQUMsQ0FBRCxFQUFJLENBQUosRUFBTy9ELEdBQVAsQ0FBVyxVQUFDZ0UsQ0FBRDtBQUFBLGlCQUNWO0FBQUEsc0JBQU9BO0FBQVAsWUFEVTtBQUFBLFNBQVgsQ0FISDtBQUFBLFFBSkY7QUFBQTtBQUpGLElBeEJGO0FBQUEsRUFERjtBQTZDQTs7Ozs7OztBQU1BOzs7Ozs7Ozs7Ozs7QUFXQTs7Ozs7Ozs7O0FBVUE7QUFDQTs7O0lBRU1DLFM7Ozs7O0FBQ0osdUJBQWM7QUFBQTs7QUFBQTs7QUFDWjtBQUNBLDhCQUZZLENBSVo7O0FBRUFaLFdBQU8sQ0FBQ0MsR0FBUixDQUFZLDBCQUFaO0FBTlk7QUFPYjs7Ozt3Q0FFbUI7QUFDbEJELGFBQU8sQ0FBQ0MsR0FBUixDQUFZLHVEQUFaO0FBQ0Q7Ozs7aUNBWnFCWSxXOztBQWV4QkMsY0FBYyxDQUFDQyxNQUFmLENBQXNCLFlBQXRCLEVBQW9DSCxTQUFwQztBQUVBL0UsUUFBUSxDQUFDNkUsYUFBVCxDQUF1QixNQUF2QixFQUFnQ2xDLGdCQUFoQyxDQUFpRCxPQUFqRCxFQUEwRHdCLE9BQU8sQ0FBQ0MsR0FBbEUsRSxDQUVBOztBQUNBVCxtRkFBTSxDQUFDQyxNQUFELEVBQVM1RCxRQUFRLENBQUNtRixJQUFsQixFQUF3QixJQUF4QixDQUFOLEMsQ0FDQSxzQyIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDApO1xuIiwiLyoqXHJcbiAqIHByb3ZpZGVzIGZ1bmN0aW9ucyBuZWVkZWQgYnkgYmFiZWwgZm9yIGEgY3VzdG9tIHByYWdtYVxyXG4gKiB0byByZW5kZXIgcGFyc2VkIGpzeCBjb2RlIHRvIGh0bWwgc3RyaW5nc1xyXG4gKi9cclxuXHJcbi8vIHByb3BzIHdoaWNoIHdpbGwgYmUgcmVuZGVyZWQgYXMgYXR0cmlidXRlc1xyXG4vLyBGdW5jdGlvbnMgd2lsbCBiZSB1c2VkIGZvciBldmVudCBsaXN0ZW5lcnMuIChhdHRyaWJ1dGUgbmFtZSBzaG91bGQgc3RhcnQgd2l0aCBvbiAvIG9uLSlcclxudHlwZSBBdHRyaWJ1dGVzID0geyBba2V5OiBzdHJpbmddOiBzdHJpbmcgfCBib29sZWFuIHwgbnVtYmVyIHwgRnVuY3Rpb24gfTtcclxuXHJcbi8vIGFkZGl0aW9uYWwgYXR0cmlidXRlcyB3aGljaCBjYW4gaGF2ZSBhZGRpdGlvbmFsIHNlcmlhbGl6YXRpb24gYmVmb3JlIHJlbmRlcmluZyBhcyBhdHRyaWJ1dGVzXHJcbnR5cGUgU3BlY2lhbEF0dHJpYnV0ZXMgPSB7XHJcbiAgY2xhc3M/OiBzdHJpbmcgfCBzdHJpbmdbXTtcclxuICBzdHlsZT86IHN0cmluZyB8IHsgW2tleTogc3RyaW5nXTogc3RyaW5nIH07XHJcbiAgcmVmPzogRnVuY3Rpb247XHJcbn07XHJcblxyXG4vLyBjaGlsZCBlbGVtZW50cyBpbiB0aGUganN4IG1hcmt1cCB3aGljaCB3aWxsIGJlIHBhc3NlZCB0byB0aGUgaCBmdW5jdGlvbiBhcyBgcHJvcHMuY2hpbGRyZW5gXHJcbnR5cGUgQ2hpbGRyZW5Qcm9wcyA9IHtcclxuICBjaGlsZHJlbjogQXJyYXk8Tm9kZSB8IEpzeE5vZGVJbnRlcmZhY2UgfCBzdHJpbmc+O1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIHByb3BzIG9iamVjdCB3aGljaCB3aWxsIGJlIHBhc3NlZCB0byBqc3ggcHJhZ21hIGFuZCBjdXN0b20gY29tcG9uZW50IGZ1bmN0aW9uc1xyXG4gKi9cclxudHlwZSBKc3hQcm9wcyA9IEF0dHJpYnV0ZXMgJiBTcGVjaWFsQXR0cmlidXRlcyAmIENoaWxkcmVuUHJvcHM7XHJcblxyXG4vLyBiYXNlIGNsYXNzIHdoaWNoIHdpbGwgYmUgaW5oZXJpdGVkIGZyb20ganN4IGFuZCBmcmFnbWVudHMgZnVuY3Rpb24gbm9kZSBnZW5lcmF0aW9uXHJcbi8vIGFuZCB3aWxsIGJlIHVzZWQgdG8gZGlzdGluZ3Vpc2ggdGhlbSB3aXRoIG90aGVyIEVsZW1lbnRzXHJcbmNsYXNzIEpzeE5vZGUge31cclxuXHJcbi8vIHByaXZhdGUga2V5IGZvciBjYWxsaW5nIHRoZSBgcmVmYCBjYWxsZXJzXHJcbmNvbnN0IF9jYWxsUmVmcyA9IFN5bWJvbChcImNhbGxSZWZzXCIpO1xyXG5cclxuLy8ganN4IGFuZCBGcmFnbWVudCB3aWxsIHJldHVybiBvYmplY3RzIHdoaWNoIGltcGxlbWVudCB0aGlzIGludGVyZmFjZVxyXG5pbnRlcmZhY2UgSnN4Tm9kZUludGVyZmFjZSBleHRlbmRzIEpzeE5vZGUge1xyXG4gIHRvU3RyaW5nKCk6IHN0cmluZztcclxuICBhc05vZGUoKTogTm9kZTtcclxuICBbX2NhbGxSZWZzXSgpOiB2b2lkO1xyXG59XHJcblxyXG4vKipcclxuICogcmV0dXJucyB0cnVlIGlmIG5vdCBudWxsaXNoIG9yIGZhbHNlXHJcbiAqIHRoYXQgbWVhbnMgMCBvciBlbXB0eSBzdHJpbmcgYXJlIGFsbG93ZWRcclxuICogQHBhcmFtIHsqfSB2YWxcclxuICovXHJcbmZ1bmN0aW9uIHBvc2l0aXZlKHZhbDogYW55KTogYm9vbGVhbiB7XHJcbiAgcmV0dXJuIHZhbCAhPT0gZmFsc2UgJiYgdmFsICE9PSBudWxsICYmIHZhbCAhPT0gdW5kZWZpbmVkO1xyXG59XHJcblxyXG5mdW5jdGlvbiB0cnV0aHkodmFsdWU6IGFueSk6IGJvb2xlYW4ge1xyXG4gIHJldHVybiB2YWx1ZSAhPT0gZmFsc2UgJiYgdmFsdWUgIT09IG51bGwgJiYgdmFsdWUgIT09IHVuZGVmaW5lZDtcclxufVxyXG5cclxuLyoqXHJcbiAqIGVzY2FwZXMgdGhlIHByb3ZpZGVkIHN0cmluZyBhZ2FpbnN0IHhzcyBhdHRhY2tzXHJcbiAqXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSB0ZXh0XHJcbiAqIEByZXR1cm5zIHtzdHJpbmd9XHJcbiAqL1xyXG5mdW5jdGlvbiBzYW5pdGl6ZSh0ZXh0OiBzdHJpbmcpOiBzdHJpbmcge1xyXG4gIGNvbnN0IGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgZGl2LmlubmVyVGV4dCA9IHRleHQ7XHJcbiAgcmV0dXJuIGRpdi5pbm5lckhUTUw7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBiYXNpY2FsbHkgYEVsZW1lbnQub3V0ZXJIVE1MYCBidXQgYWxzbyBzdXBwb3J0cyBUZXh0IG5vZGUgYW5kIERvY3VtZW50RnJhZ21lbnRcclxuICogQHBhcmFtIGVsZW1lbnQge05vZGV9IC0gZWxlbWVudCB3aGljaCBpdHMgaHRtbCBuZWVkcyB0byBiZSByZXR1cm5lZFxyXG4gKi9cclxuZnVuY3Rpb24gZ2V0T3V0ZXJIdG1sKGVsZW1lbnQ6IE5vZGUpOiBzdHJpbmcge1xyXG4gIGlmIChlbGVtZW50IGluc3RhbmNlb2YgRWxlbWVudCkgcmV0dXJuIGVsZW1lbnQub3V0ZXJIVE1MO1xyXG4gIGlmIChlbGVtZW50IGluc3RhbmNlb2YgVGV4dCkgcmV0dXJuIHNhbml0aXplKGVsZW1lbnQud2hvbGVUZXh0KTtcclxuICBpZiAoZWxlbWVudCBpbnN0YW5jZW9mIERvY3VtZW50RnJhZ21lbnQpXHJcbiAgICByZXR1cm4gQXJyYXkuZnJvbShlbGVtZW50LmNoaWxkTm9kZXMpXHJcbiAgICAgIC5tYXAoKGVsKSA9PiBnZXRPdXRlckh0bWwoZWwpKVxyXG4gICAgICAuam9pbihcIlwiKTtcclxufVxyXG5cclxuZnVuY3Rpb24gYXNIdG1sU3RyaW5nKHRhZzogc3RyaW5nIHwgRnVuY3Rpb24sIHByb3BzOiBKc3hQcm9wcykge1xyXG4gIGlmICh0eXBlb2YgdGFnID09PSBcImZ1bmN0aW9uXCIpIHtcclxuICAgIC8vIEBUT0RPOiB3aGF0IGlmIG5vdCBqc3ggaXMgcmV0dXJuZWRcclxuICAgIGNvbnN0IGVsZW1lbnQ6IEpzeE5vZGUgPSB0YWcocHJvcHMpO1xyXG5cclxuICAgIHJldHVybiBlbGVtZW50LnRvU3RyaW5nKCk7XHJcbiAgfVxyXG5cclxuICAvLyByZW1vdmUgY2hpbGRyZW4gZnJvbSBwcm9wcyBhbmQgcmVuZGVyIGl0IGFzIGNvbnRlbnQsXHJcbiAgLy8gdGhlIHJlc3QgYXMgYXR0cmlidXRlc1xyXG4gIGNvbnN0IHsgY2hpbGRyZW4sIC4uLmF0dHJzIH0gPSBwcm9wcztcclxuXHJcbiAgY29uc3QgYXR0cmlidXRlcyA9IE9iamVjdC5lbnRyaWVzKGF0dHJzKVxyXG4gICAgLmZpbHRlcigoWywgdmFsdWVdKSA9PiB0cnV0aHkodmFsdWUpKVxyXG4gICAgLm1hcCgoW2tleSwgdmFsdWVdKSA9PiB7XHJcbiAgICAgIC8vIGUuZy4gZGlzYWJsZWQ6IHRydWUgPT4gPHRhZyBkaXNhYmxlZD5cclxuICAgICAgaWYgKHZhbHVlID09PSB0cnVlKSByZXR1cm4ga2V5O1xyXG5cclxuICAgICAgLy8gZm9yIHN0eWxlIGFzIG9iamVjdDpcclxuICAgICAgLy8gKHN0eWxlOikge2Rpc3BsYXk6IFwibm9uZVwiLCBwb3NpdGlvbjogXCJhYnNvbHV0ZVwifSA9PT4gJ2Rpc3BsYXk6IG5vbmU7IHBvc2l0aW9uOiBhYnNvbHV0ZTsnXHJcbiAgICAgIGlmIChrZXkgPT09IFwic3R5bGVcIiAmJiB0eXBlb2YgdmFsdWUgPT09IFwib2JqZWN0XCIpXHJcbiAgICAgICAgdmFsdWUgPSBPYmplY3QuZW50cmllcyh2YWx1ZSlcclxuICAgICAgICAgIC8vIGlnbm9yZSBzdHVmZiBsaWtlIGB7YmFja2dyb3VuZDogYWN0aXZlICYmIFwicmVkXCJ9YCB3aGVuIGBhY3RpdmUgPT09IGZhbHNlIC8gbnVsbCAvIHVuZGVmaW5lZGBcclxuICAgICAgICAgIC5maWx0ZXIoKFssIHZdKSA9PiB0cnV0aHkodmFsdWUpKVxyXG4gICAgICAgICAgLy8gY3VycmVudGx5IHN1cHBvcnRzIFwiYmFja2dyb3VuZC1jb2xvclwiIG5vdCBcImJhY2tncm91bmRDb2xvclwiXHJcbiAgICAgICAgICAubWFwKChbaywgdl0pID0+IGAke2t9OiAke3Z9YClcclxuICAgICAgICAgIC5qb2luKFwiOyBcIik7XHJcblxyXG4gICAgICAvLyAoY2xhc3M6KSBbXCJidG5cIiwgXCJyZWRcIl0gPT0+IFwiYnRuIHJlZFwiXHJcbiAgICAgIGlmIChrZXkgPT09IFwiY2xhc3NcIiAmJiBBcnJheS5pc0FycmF5KHZhbHVlKSkgdmFsdWUgPSB2YWx1ZS5qb2luKFwiIFwiKTtcclxuXHJcbiAgICAgIHJldHVybiBgJHtrZXl9PVwiJHt2YWx1ZX1cImA7XHJcbiAgICB9KVxyXG4gICAgLmpvaW4oXCIgXCIpO1xyXG5cclxuICBjb25zdCBjb250ZW50ID0gY2hpbGRyZW5cclxuICAgIC5maWx0ZXIodHJ1dGh5KVxyXG4gICAgLm1hcCgoY2hpbGQpID0+XHJcbiAgICAgIGNoaWxkIGluc3RhbmNlb2YgTm9kZVxyXG4gICAgICAgID8gZ2V0T3V0ZXJIdG1sKGNoaWxkKVxyXG4gICAgICAgIDogdHlwZW9mIGNoaWxkID09PSBcIm9iamVjdFwiXHJcbiAgICAgICAgPyBjaGlsZC50b1N0cmluZygpXHJcbiAgICAgICAgOiBzYW5pdGl6ZShjaGlsZClcclxuICAgIClcclxuICAgIC5qb2luKFwiXCIpO1xyXG5cclxuICByZXR1cm4gYDwke3RhZ30gJHthdHRyaWJ1dGVzfT4ke2NvbnRlbnR9PC8ke3RhZ30+YDtcclxufVxyXG5cclxuZnVuY3Rpb24gYXNOb2RlKHRhZzogc3RyaW5nIHwgRnVuY3Rpb24sIHByb3BzOiBKc3hQcm9wcyk6IFtOb2RlLCBKc3hOb2RlW11dIHtcclxuICBpZiAodHlwZW9mIHRhZyA9PT0gXCJmdW5jdGlvblwiKSB7XHJcbiAgICBsZXQgcmVzdWx0ID0gdGFnKHByb3BzKTtcclxuXHJcbiAgICBsZXQganN4Tm9kZXM6IEpzeE5vZGVbXSA9IFtdO1xyXG5cclxuICAgIGlmIChyZXN1bHQgaW5zdGFuY2VvZiBKc3hOb2RlKSB7XHJcbiAgICAgIGpzeE5vZGVzID0gW3Jlc3VsdF07XHJcbiAgICAgIHJlc3VsdCA9IChyZXN1bHQgYXMgSnN4Tm9kZUludGVyZmFjZSkuYXNOb2RlKCk7XHJcbiAgICAgIE9iamVjdC5lbnRyaWVzKHByb3BzKS5mb3JFYWNoKChba2V5LCB2YWx1ZV0pID0+IHtcclxuICAgICAgICBpZiAoXHJcbiAgICAgICAgICBrZXkuc3RhcnRzV2l0aChcIm9uLVwiKSAmJlxyXG4gICAgICAgICAgKHR5cGVvZiB2YWx1ZSA9PT0gXCJmdW5jdGlvblwiIHx8IHR5cGVvZiB2YWx1ZSA9PT0gXCJvYmplY3RcIilcclxuICAgICAgICApIHtcclxuICAgICAgICAgIC8vIHJlbW92ZSBsZWFkaW5nIFwib24tXCJcIlxyXG4gICAgICAgICAgbGV0IGV2ZW50ID0ga2V5LnJlcGxhY2UoL15vbi0vLCBcIlwiKTtcclxuICAgICAgICAgIC8vIGNoYW5nZSBmaXJzdCBsZXR0ZXIgdG8gbG93ZXIgY2FzZS4gZS5nIFwiKG9uKUNsaWNrXCIgPT4gXCJjbGlja1wiXHJcbiAgICAgICAgICBldmVudCA9IGAke2V2ZW50WzBdLnRvTG93ZXJDYXNlKCl9JHtldmVudC5zdWJzdHJpbmcoMSl9YDtcclxuXHJcbiAgICAgICAgICByZXN1bHQuYWRkRXZlbnRMaXN0ZW5lcihcclxuICAgICAgICAgICAgZXZlbnQsXHJcbiAgICAgICAgICAgIHZhbHVlIGFzIEV2ZW50TGlzdGVuZXJPckV2ZW50TGlzdGVuZXJPYmplY3RcclxuICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gW3Jlc3VsdCwganN4Tm9kZXNdO1xyXG4gIH1cclxuXHJcbiAgY29uc3QgeyBjaGlsZHJlbiwgLi4uYXR0cnMgfSA9IHByb3BzO1xyXG5cclxuICAvLyBjdXJyZW50bHkgbm90IHN1cHBvcnRpbmcgdGhlIGBpc2Agb3B0aW9uIGZvciBDdXN0b21pemVkIGJ1aWx0LWluIGVsZW1lbnRzXHJcbiAgY29uc3Qgbm9kZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodGFnKTtcclxuXHJcbiAgT2JqZWN0LmVudHJpZXMoYXR0cnMpXHJcbiAgICAuZmlsdGVyKChbX2tleSwgdmFsdWVdKSA9PiB0cnV0aHkodmFsdWUpKVxyXG4gICAgLmZvckVhY2goKFtrZXksIHZhbHVlXSkgPT4ge1xyXG4gICAgICAvLyBmb3Igc3R5bGUgYXMgb2JqZWN0OlxyXG4gICAgICAvLyAoc3R5bGU6KSB7ZGlzcGxheTogXCJub25lXCIsIHBvc2l0aW9uOiBcImFic29sdXRlXCJ9ID09PiAnZGlzcGxheTogbm9uZTsgcG9zaXRpb246IGFic29sdXRlOydcclxuICAgICAgaWYgKGtleSA9PT0gXCJzdHlsZVwiICYmIHR5cGVvZiB2YWx1ZSA9PT0gXCJvYmplY3RcIilcclxuICAgICAgICB2YWx1ZSA9IE9iamVjdC5lbnRyaWVzKHZhbHVlKVxyXG4gICAgICAgICAgLmZpbHRlcigoWywgdl0pID0+IHRydXRoeSh2YWx1ZSkpXHJcbiAgICAgICAgICAubWFwKChbaywgdl0pID0+IGAke2t9OiAke3Z9YClcclxuICAgICAgICAgIC5qb2luKFwiOyBcIik7XHJcblxyXG4gICAgICAvLyAoY2xhc3M6KSBbXCJidG5cIiwgXCJyZWRcIl0gPT0+IFwiYnRuIHJlZFwiXHJcbiAgICAgIGlmIChrZXkgPT09IFwiY2xhc3NcIiAmJiBBcnJheS5pc0FycmF5KHZhbHVlKSkgdmFsdWUgPSB2YWx1ZS5qb2luKFwiIFwiKTtcclxuXHJcbiAgICAgIGlmICh2YWx1ZSA9PT0gdHJ1ZSkgbm9kZS5zZXRBdHRyaWJ1dGUoa2V5LCBcIlwiKTtcclxuICAgICAgZWxzZSBpZiAodHlwZW9mIHZhbHVlID09PSBcInN0cmluZ1wiIHx8IHR5cGVvZiB2YWx1ZSA9PT0gXCJudW1iZXJcIilcclxuICAgICAgICBub2RlLnNldEF0dHJpYnV0ZShrZXksIFN0cmluZyh2YWx1ZSkpO1xyXG4gICAgICAvLyBrZXkgaGFzIHRoZSBmb3JtIG9mIFwib25DbGlja1wiIG9yIFwib24tY2hhbmdlXCIuIHZhbHVlIGlzIHRoZSBjYWxsYmFjayBmdW5jdGlvbiBvciBhbiBvYmplY3QgaW1wbGVtZW50aW5nIHtFdmVudExpc3RlbmVyfSBpbnRlcmZhY2VcclxuICAgICAgZWxzZSBpZiAoXHJcbiAgICAgICAga2V5LnN0YXJ0c1dpdGgoXCJvbi1cIikgJiZcclxuICAgICAgICAodHlwZW9mIHZhbHVlID09PSBcImZ1bmN0aW9uXCIgfHwgdHlwZW9mIHZhbHVlID09PSBcIm9iamVjdFwiKVxyXG4gICAgICApIHtcclxuICAgICAgICAvLyByZW1vdmUgbGVhZGluZyBcIm9uLVwiXCJcclxuICAgICAgICBsZXQgZXZlbnQgPSBrZXkucmVwbGFjZSgvXm9uLS8sIFwiXCIpO1xyXG4gICAgICAgIC8vIGNoYW5nZSBmaXJzdCBsZXR0ZXIgdG8gbG93ZXIgY2FzZS4gZS5nIFwiKG9uKUNsaWNrXCIgPT4gXCJjbGlja1wiXHJcbiAgICAgICAgZXZlbnQgPSBgJHtldmVudFswXS50b0xvd2VyQ2FzZSgpfSR7ZXZlbnQuc3Vic3RyaW5nKDEpfWA7XHJcblxyXG4gICAgICAgIG5vZGUuYWRkRXZlbnRMaXN0ZW5lcihcclxuICAgICAgICAgIGV2ZW50LFxyXG4gICAgICAgICAgdmFsdWUgYXMgRXZlbnRMaXN0ZW5lck9yRXZlbnRMaXN0ZW5lck9iamVjdFxyXG4gICAgICAgICk7XHJcbiAgICAgIH1cclxuICAgICAgLy8gQHRzLWlnbm9yZSAtIHByb3ZpZGluZyB0aGUgdmFsdWUgYXMgcHJvcGVydHkgdG8gaHRtbCBlbGVtZW50XHJcbiAgICAgIGVsc2Ugbm9kZVtrZXldID0gdmFsdWU7XHJcbiAgICB9KTtcclxuXHJcbiAgY29uc3QganN4Tm9kZXMgPSBjaGlsZHJlbi5maWx0ZXIoKGNoaWxkKSA9PiBjaGlsZCBpbnN0YW5jZW9mIEpzeE5vZGUpO1xyXG5cclxuICBub2RlLmFwcGVuZChcclxuICAgIC4uLmNoaWxkcmVuXHJcbiAgICAgIC8vLmZsYXQoKVxyXG4gICAgICAuZmlsdGVyKHRydXRoeSlcclxuICAgICAgLm1hcCgoY2hpbGQpID0+XHJcbiAgICAgICAgY2hpbGQgaW5zdGFuY2VvZiBOb2RlXHJcbiAgICAgICAgICA/IGNoaWxkXHJcbiAgICAgICAgICA6IGNoaWxkIGluc3RhbmNlb2YgSnN4Tm9kZVxyXG4gICAgICAgICAgPyBjaGlsZC5hc05vZGUoKVxyXG4gICAgICAgICAgOiBjaGlsZFxyXG4gICAgICApXHJcbiAgKTtcclxuXHJcbiAgcmV0dXJuIFtub2RlLCBqc3hOb2Rlc107XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBjb252ZXJ0cyBwcmFnbWEgb2JqZWN0IHRvIGh0bWwgc3RyaW5nXHJcbiAqIGpzeHMgaXMgYWx3YXlzIGNhbGxlZCB3aGVuIGVsZW1lbnQgaGFzIG1vcmUgdGhhbiBvbmUgY2hpbGRcclxuICpcclxuICogQHBhcmFtIHtzdHJpbmcgfCBGdW5jdGlvbn0gdGFnIC0gdGFnIG5hbWUgb3IgdGFnIGNsYXNzXHJcbiAqIEBwYXJhbSB7T2JqZWN0IHwgbnVsbH0gcHJvcHMgLSBwcm9wcyBmb3IgdGhlIHRhZ1xyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGpzeHMoXHJcbiAgdGFnOiBzdHJpbmcgfCBGdW5jdGlvbixcclxuICBwcm9wczogSnN4UHJvcHNcclxuKTogSnN4Tm9kZUludGVyZmFjZSB7XHJcbiAgbGV0IG5vZGU6IEhUTUxFbGVtZW50O1xyXG4gIGxldCBqc3hOb2RlcztcclxuICBwcm9wcy5jaGlsZHJlbiA9IHByb3BzLmNoaWxkcmVuLmZsYXQoKTsgLy8gQFRPRE86IGRvY1xyXG5cclxuICAvLyBpZiByZWYgcHJvcCBpcyBwcm92aWRlZCwgbWVtb3JpemUgYW5kIHJlbW92ZSBmcm9tIHRoZSBodG1sIGdlbmVyYXRpb24gcHJvY2Vzc1xyXG4gIGNvbnN0IHJlZjogRnVuY3Rpb24gfCBudWxsID1cclxuICAgIHR5cGVvZiBwcm9wcy5yZWYgPT09IFwiZnVuY3Rpb25cIiA/IHByb3BzLnJlZiA6IG51bGw7XHJcbiAgaWYgKHJlZikgZGVsZXRlIHByb3BzLnJlZjtcclxuXHJcbiAgcmV0dXJuIG5ldyAoY2xhc3MgZXh0ZW5kcyBKc3hOb2RlIGltcGxlbWVudHMgSnN4Tm9kZUludGVyZmFjZSB7XHJcbiAgICB0b1N0cmluZygpIHtcclxuICAgICAgLy9jb25zb2xlLmxvZyhcImpzeHMsIHRvU3RyaW5nXCIsIHJuZCwgeyB0YWcsIHByb3BzIH0pO1xyXG4gICAgICAvL2NvbnNvbGUuZXJyb3IobmV3IEVycm9yKCkpXHJcblxyXG4gICAgICByZXR1cm4gYXNIdG1sU3RyaW5nKHRhZywgcHJvcHMpO1xyXG4gICAgfVxyXG5cclxuICAgIGFzTm9kZSgpIHtcclxuICAgICAgW25vZGUsIGpzeE5vZGVzXSA9IGFzTm9kZSh0YWcsIHByb3BzKTtcclxuXHJcbiAgICAgIGlmICghanN4Tm9kZXMpIHtcclxuICAgICAgICAvLyBkZWJ1Z2dlcjtcclxuICAgICAgfVxyXG5cclxuICAgICAgcmV0dXJuIG5vZGU7XHJcbiAgICB9XHJcblxyXG4gICAgW19jYWxsUmVmc10oKSB7XHJcbiAgICAgIGlmIChyZWYgJiYgbm9kZSkgcmVmKG5vZGUpO1xyXG5cclxuICAgICAgaWYgKHR5cGVvZiB0YWcgPT09IFwiZnVuY3Rpb25cIikge1xyXG4gICAgICAgIGpzeE5vZGVzLmZvckVhY2goKG5vZGUpID0+IG5vZGVbX2NhbGxSZWZzXSgpKTtcclxuICAgICAgfSBlbHNlIGlmIChwcm9wcy5jaGlsZHJlbikge1xyXG4gICAgICAgIHByb3BzLmNoaWxkcmVuXHJcbiAgICAgICAgICAvLy5mbGF0KClcclxuICAgICAgICAgIC5maWx0ZXIoKGNoaWxkKSA9PiBjaGlsZCBpbnN0YW5jZW9mIEpzeE5vZGUpXHJcbiAgICAgICAgICAuZm9yRWFjaCgoY2hpbGQ6IEpzeE5vZGVJbnRlcmZhY2UpID0+IGNoaWxkW19jYWxsUmVmc10oKSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9KSgpO1xyXG59XHJcblxyXG4vKipcclxuICogY29udmVydHMgdGhlIGZyYWdtZW50cyBvYmplY3QgdG8gbm9kZXNcclxuICpcclxuICogQHBhcmFtIHtPYmplY3R9IHByb3BzXHJcbiAqIEBwYXJhbSB7QXJyYXl9IHByb3BzLmNoaWxkcmVuIC0gY2hpbGQgZWxlbWVudHMgaW4gdGhlIGZyYWdtZW50XHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gRnJhZ21lbnQoe1xyXG4gIGNoaWxkcmVuLFxyXG59OiB7XHJcbiAgY2hpbGRyZW46IEFycmF5PHN0cmluZyB8IE5vZGUgfCBKc3hOb2RlSW50ZXJmYWNlPjtcclxufSkge1xyXG4gIHJldHVybiBuZXcgKGNsYXNzIGV4dGVuZHMgSnN4Tm9kZSBpbXBsZW1lbnRzIEpzeE5vZGVJbnRlcmZhY2Uge1xyXG4gICAgdG9TdHJpbmcoKSB7XHJcbiAgICAgIHJldHVybiAoXHJcbiAgICAgICAgY2hpbGRyZW5cclxuICAgICAgICAgIC8vLmZsYXQoKVxyXG4gICAgICAgICAgLmZpbHRlcih0cnV0aHkpXHJcbiAgICAgICAgICAubWFwKChjaGlsZCkgPT5cclxuICAgICAgICAgICAgY2hpbGQgaW5zdGFuY2VvZiBOb2RlXHJcbiAgICAgICAgICAgICAgPyBnZXRPdXRlckh0bWwoY2hpbGQpXHJcbiAgICAgICAgICAgICAgOiB0eXBlb2YgY2hpbGQgPT09IFwib2JqZWN0XCJcclxuICAgICAgICAgICAgICA/IGNoaWxkLnRvU3RyaW5nKClcclxuICAgICAgICAgICAgICA6IHNhbml0aXplKGNoaWxkKVxyXG4gICAgICAgICAgKVxyXG4gICAgICAgICAgLmpvaW4oXCJcIilcclxuICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICBhc05vZGUoKSB7XHJcbiAgICAgIGNvbnN0IGZyYWdtZW50cyA9IGNoaWxkcmVuXHJcbiAgICAgICAgLmZpbHRlcih0cnV0aHkpXHJcbiAgICAgICAgLm1hcCgoaXRlbSkgPT5cclxuICAgICAgICAgIGl0ZW0gaW5zdGFuY2VvZiBOb2RlXHJcbiAgICAgICAgICAgID8gaXRlbVxyXG4gICAgICAgICAgICA6IGl0ZW0gaW5zdGFuY2VvZiBKc3hOb2RlXHJcbiAgICAgICAgICAgID8gaXRlbS5hc05vZGUoKVxyXG4gICAgICAgICAgICA6IGl0ZW1cclxuICAgICAgICApO1xyXG5cclxuICAgICAgY29uc3QgZG9jdW1lbnRGcmFnbWVudCA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcclxuXHJcbiAgICAgIGRvY3VtZW50RnJhZ21lbnQuYXBwZW5kKC4uLmZyYWdtZW50cyk7XHJcbiAgICAgIHJldHVybiBkb2N1bWVudEZyYWdtZW50O1xyXG4gICAgfVxyXG5cclxuICAgIFtfY2FsbFJlZnNdKCkge1xyXG4gICAgICBjaGlsZHJlblxyXG4gICAgICAgIC5maWx0ZXIoKGNoaWxkKSA9PiBjaGlsZCBpbnN0YW5jZW9mIEpzeE5vZGUpXHJcbiAgICAgICAgLmZvckVhY2goKGNoaWxkOiBKc3hOb2RlSW50ZXJmYWNlKSA9PiBjaGlsZFtfY2FsbFJlZnNdKCkpO1xyXG4gICAgfVxyXG4gIH0pKCk7XHJcbn1cclxuXHJcbi8vIGpzeCBpcyBjYWxsZWQgd2hlbiB0aGUgZWxlbWVudCBoYXMgb25lIG9yIHplcm8gY2hpbGRyZW5cclxuZXhwb3J0IGZ1bmN0aW9uIGpzeChcclxuICB0YWc6IHN0cmluZyB8IEZ1bmN0aW9uLFxyXG4gIHByb3BzOiBBdHRyaWJ1dGVzICZcclxuICAgIFNwZWNpYWxBdHRyaWJ1dGVzICYgeyBjaGlsZHJlbj86IHN0cmluZyB8IE5vZGUgfCBKc3hOb2RlSW50ZXJmYWNlIH1cclxuKTogSnN4Tm9kZUludGVyZmFjZSB7XHJcbiAgLy8gQHRzLWlnbm9yZSAtIHdyYXBwaW5nIHRoZSBjaGlsZHJlbiBhcyBhcnJheSB0byByZS11c2UganN4cyBtZXRob2RcclxuICBwcm9wcy5jaGlsZHJlbiA9IHByb3BzLmhhc093blByb3BlcnR5KFwiY2hpbGRyZW5cIikgPyBbcHJvcHMuY2hpbGRyZW5dIDogW107XHJcblxyXG4gIHJldHVybiBqc3hzKHRhZywgKHByb3BzIGFzIHVua25vd24pIGFzIEpzeFByb3BzKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIHJlbmRlciB0aGUgZ2l2ZW4gbWFya3VwIGludG8gdGhlIGdpdmVuIGRvbSBub2RlXHJcbiAqXHJcbiAqIEBwYXJhbSB7c3RyaW5nfEhUTUxFbGVtZW50fEpTWH0gbWFya3VwIC0gaHRtbCBhcyBzdHJpbmcsIGh0bWwgZWxlbWVudCBvciBqc3ggdGVtcGxhdGVcclxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZG9tTm9kZSAtIGNvbnRhaW5lciBmb3IgdGhlIHRlbXBsYXRlIHRvIGJlIHJlbmRlcmVkIGludG9cclxuICogQHBhcmFtIHtib29sZWFufSBbYXBwZW5kPWZhbHNlXSAtIHNob3VsZCB0aGUgcHJvdmlkZWQgbWFya3VwIGJlIGFwcGVuZGVkIHRvIHRoZSBleGlzdGluZyBtYXJrdXAsIG9yIGRlZmF1bHQgcmVwbGFjZSBpdFxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHJlbmRlcihcclxuICBtYXJrdXA6IHN0cmluZyB8IEhUTUxFbGVtZW50IHwgSnN4Tm9kZUludGVyZmFjZSwgLy8gQFRPRE86IHNwZWNpZmljIHN1cHBvcnQgZm9yIFRlbXBsYXRlPyAoLmNvbnRlbnQuY2xvbmUpXHJcbiAgZG9tTm9kZTogSFRNTEVsZW1lbnQsXHJcbiAgYXBwZW5kOiBib29sZWFuID0gZmFsc2VcclxuKSB7XHJcbiAgaWYgKCFhcHBlbmQpIGRvbU5vZGUuaW5uZXJIVE1MID0gXCJcIjtcclxuXHJcbiAgaWYgKHR5cGVvZiBtYXJrdXAgPT09IFwic3RyaW5nXCIpIHtcclxuICAgIGRvbU5vZGUuaW5zZXJ0QWRqYWNlbnRIVE1MKFwiYWZ0ZXJiZWdpblwiLCBtYXJrdXApO1xyXG4gIH0gZWxzZSBpZiAobWFya3VwIGluc3RhbmNlb2YgTm9kZSkge1xyXG4gICAgZG9tTm9kZS5pbnNlcnRBZGphY2VudEVsZW1lbnQoXCJhZnRlcmJlZ2luXCIsIG1hcmt1cCk7XHJcbiAgfSBlbHNlIGlmIChtYXJrdXAgaW5zdGFuY2VvZiBKc3hOb2RlKSB7XHJcbiAgICBjb25zdCBjb250ZW50ID0gbWFya3VwLmFzTm9kZSgpO1xyXG5cclxuICAgIGRvbU5vZGUuYXBwZW5kKGNvbnRlbnQpO1xyXG5cclxuICAgIG1hcmt1cFtfY2FsbFJlZnNdKCk7XHJcbiAgfSBlbHNlIHtcclxuICAgIHRocm93IG5ldyBFcnJvcihcInJlbmRlciBtZXRob2QgY2FsbGVkIHdpdGggd3JvbmcgYXJndW1lbnQocylcIik7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gcmF3SHRtbChjb250ZW50OiBzdHJpbmcpOiBKc3hOb2RlSW50ZXJmYWNlIHtcclxuICByZXR1cm4gbmV3IChjbGFzcyBleHRlbmRzIEpzeE5vZGUgaW1wbGVtZW50cyBKc3hOb2RlSW50ZXJmYWNlIHtcclxuICAgIHRvU3RyaW5nKCkge1xyXG4gICAgICByZXR1cm4gY29udGVudDtcclxuICAgIH1cclxuXHJcbiAgICBhc05vZGUoKSB7XHJcbiAgICAgIGNvbnN0IHRlbXBsYXRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRlbXBsYXRlXCIpO1xyXG4gICAgICB0ZW1wbGF0ZS5pbm5lckhUTUwgPSBjb250ZW50O1xyXG4gICAgICByZXR1cm4gdGVtcGxhdGUuY29udGVudDtcclxuICAgIH1cclxuXHJcbiAgICBbX2NhbGxSZWZzXSgpIHtcclxuICAgICAgLy8gbm9vcFxyXG4gICAgfVxyXG4gIH0pKCk7XHJcbn1cclxuXHJcbmNvbnNvbGUubG9nKFwidHNcIik7XHJcbiIsImltcG9ydCB7IHJlbmRlciwgcmF3SHRtbCB9IGZyb20gXCIuL2pzeC9qc3gtcnVudGltZVwiO1xyXG5cclxuXHJcbmNvbnN0IHhzcyA9IFwiPGltZyBzcmM9eCBvbmVycm9yPVxcXCJhbGVydCgnWFNTIEF0dGFjaycpXFxcIj5cIjsgLy9cIjxzY3JpcHQ+YWxlcnQoJy0uLScpPC9zY3JpcHQ+XCI7XHJcblxyXG5mdW5jdGlvbiBSVEUocHJvcHMvKnsgdHh0LCBcIm9uLWNsaWNrXCI6IG9uQ2xpY2sgfSovOiB7IHR4dDogc3RyaW5nOyByZWY/OiBGdW5jdGlvbiB9KSB7XHJcbiAgY29uc29sZS5sb2coXCJvbkNsaWNrXCIsIHByb3BzW1wib24tY2xpY2tcIl0pXHJcbiAgcmV0dXJuIChcclxuICAgIDxwIHJlZj17KGVsOiBIVE1MRWxlbWVudCkgPT4gY29uc29sZS5sb2coXCJteSBkaXYgOjpyZWY6OjMuMlwiLCBlbCl9Pntwcm9wcy50eHR9PC9wPlxyXG4gICk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIEJ1dHRvbih7XHJcbiAgY2hpbGRyZW4sXHJcbiAgZGlzYWJsZWQsXHJcbn06IHtcclxuICBjaGlsZHJlbjogYW55O1xyXG4gIGRpc2FibGVkOiBib29sZWFuO1xyXG4gIHJlZj86IEZ1bmN0aW9uO1xyXG59KSB7XHJcbiAgcmV0dXJuIChcclxuICAgIDxidXR0b25cclxuICAgICAgZGlzYWJsZWQ9e2Rpc2FibGVkfVxyXG4gICAgICByZWY9eyhlbDogSFRNTEVsZW1lbnQpID0+IGNvbnNvbGUubG9nKFwibXkgYnV0dG9uIDo6cmVmOjoxXCIsIGVsKX1cclxuICAgID5cclxuICAgICAgPHNwYW4gcmVmPXsoZWw6IEhUTUxFbGVtZW50KSA9PiBjb25zb2xlLmxvZyhcIm15IGEgOjpyZWY6OjJcIiwgZWwpfT5hPC9zcGFuPlxyXG4gICAgICB7Y2hpbGRyZW59XHJcbiAgICAgIDw+XHJcbiAgICAgICAgPHNwYW4gcmVmPXsoZWw6IEhUTUxFbGVtZW50KSA9PiBjb25zb2xlLmxvZyhcIm15IGEgOjpyZWY6OjNcIiwgZWwpfT5cclxuICAgICAgICAgIGFcclxuICAgICAgICA8L3NwYW4+XHJcbiAgICAgIDwvPlxyXG4gICAgPC9idXR0b24+XHJcbiAgKTtcclxufVxyXG5cclxuZnVuY3Rpb24gcmVmbG9nKGVsOiBIVE1MRWxlbWVudCkge1xyXG4gIGNvbnNvbGUubG9nKFwibXkgaW5uZXIgZGl2OjpyZWY6OjhcIiwgZWwpO1xyXG59XHJcblxyXG5jb25zdCBtYXJrdXAgPSAoXHJcbiAgPD5cclxuICAgIDxkaXZcclxuICAgICAgY2xhc3M9XCJmb29cIlxyXG4gICAgICByZWY9eyhlbDogSFRNTEVsZW1lbnQpID0+IGNvbnNvbGUubG9nKFwibXkgZGl2IDo6cmVmOjo0XCIsIGVsKX1cclxuICAgIC8+XHJcbiAgICA8aW5wdXQgZGlzYWJsZWQ9e3RydWV9IGhpZGRlbj17ZmFsc2V9IC8+XHJcbiAgICA8QnV0dG9uXHJcbiAgICAgIGRpc2FibGVkPXt0cnVlfVxyXG4gICAgICByZWY9eyhlbDogSFRNTEVsZW1lbnQpID0+IGNvbnNvbGUubG9nKFwibXkgQlVUVE9OOjpyZWY6OjVcIiwgZWwpfVxyXG4gICAgPlxyXG4gICAgICB0ZXh0XHJcbiAgICAgIDxwb3B1cC1pbmZvXHJcbiAgICAgICAgcmVmPXsoZWw6IEhUTUxFbGVtZW50KSA9PiBjb25zb2xlLmxvZyhcInNwYW4gaW4gQlVUVE9OOjpyZWY6OjZcIiwgZWwpfVxyXG4gICAgICA+XHJcbiAgICAgICAgYmxhXHJcbiAgICAgIDwvcG9wdXAtaW5mbz5cclxuICAgIDwvQnV0dG9uPlxyXG4gICAgPFJURVxyXG4gICAgICB0eHQ9XCJsZSB0ZXh0XCJcclxuICAgICAgcmVmPXsoZWw6IEhUTUxFbGVtZW50KSA9PiBjb25zb2xlLmxvZyhcIm15IGRpdiA6OnJlZjo6My4xXCIsIGVsKX1cclxuICAgICAgb24tY2xpY2s9eyhlOiBIVE1MRWxlbWVudCkgPT4gY29uc29sZS5sb2coZSl9XHJcbiAgICAvPlxyXG4gICAge3hzc31cclxuICAgIHtyYXdIdG1sKGA8b2w+PGxpPnJhdyBodG1sPC9saT48L29sPmApfVxyXG4gICAgPGRpdlxyXG4gICAgICBjbGFzcz1cImJhbVwiXHJcbiAgICAgIHJlZj17KGVsOiBIVE1MRWxlbWVudCkgPT4gY29uc29sZS5sb2coXCJteSBkaXY6OnJlZjo6N1wiLCBlbCl9XHJcbiAgICA+XHJcbiAgICAgIDxkaXY+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cImJhclwiIG9uLWNsaWNrPXsoZSkgPT4gY29uc29sZS5sb2coZSl9IHJlZj17cmVmbG9nfT5cclxuICAgICAgICAgIGNsaWNrIE1FXHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPGRpdiBzdHlsZT17eyBvdXRsaW5lOiBcIjFweCBzb2xpZCByZWQ7XCIgfX0+XHJcbiAgICAgICAgICB7ZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNvbGRcIil9XHJcbiAgICAgICAgICB7bnVsbH1cclxuICAgICAgICAgIHtbMCwgMV0ubWFwKChuKSA9PiAoXHJcbiAgICAgICAgICAgIDxzcGFuPntufTwvc3Bhbj5cclxuICAgICAgICAgICkpfVxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICA8L2Rpdj5cclxuICAgIDwvZGl2PlxyXG4gIDwvPlxyXG4pO1xyXG5cclxuLypcclxuY29uc3QgbWFya3VwID0gKFxyXG4gIDxCdXR0b24gZGlzYWJsZWQ9e3RydWV9PlxyXG4gICAgICA8Ym9sZCByZWY9e3JlZmxvZ30+LS1JTk5FUi0tPC9ib2xkPlxyXG4gIDwvQnV0dG9uPlxyXG4pOyovXHJcbi8qXHJcblxyXG5jb25zdCBtYXJrdXAgPSAoXHJcbiAgPGRpdiBjbGFzcz1cImZvb1wiIHJlZj17KGVsOiBIVE1MRWxlbWVudCkgPT4gY29uc29sZS5sb2coXCJteSBkaXY6OnJlZjo6XCIsIGVsKX0+XHJcbiAgICA8ZGl2PlxyXG4gICAgICA8ZGl2IGNsYXNzPVwiYmFyXCIgcmVmPXsoZWw6IEhUTUxFbGVtZW50KSA9PiBjb25zb2xlLmxvZyhcIm15IGlubmVyIGRpdjo6cmVmOjpcIiwgZWwpfSAvPlxyXG4gICAgPC9kaXY+XHJcbiAgICA8QnV0dG9uIGRpc2FibGVkPXt0cnVlfT48L0J1dHRvbj5cclxuICA8L2Rpdj5cclxuKTtcclxuKi9cclxuLypcclxuY29uc3QgbWFya3VwID0gKFxyXG4gIDxhPlxyXG4gICAgPGI+XHJcbiAgICAgIDxjIGNsYXNzPVwiYmFyXCIgcmVmPXtyZWZsb2d9IC8+XHJcbiAgICA8L2I+XHJcbiAgPC9hPlxyXG4pO1xyXG4qL1xyXG5cclxuLy9jb25zb2xlLmxvZyhtYXJrdXApO1xyXG4vL3dpbmRvdy5tYXJrdXAgPSBtYXJrdXA7XHJcblxyXG5jbGFzcyBQb3BVcEluZm8gZXh0ZW5kcyBIVE1MRWxlbWVudCB7XHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAvLyBBbHdheXMgY2FsbCBzdXBlciBmaXJzdCBpbiBjb25zdHJ1Y3RvclxyXG4gICAgc3VwZXIoKTtcclxuXHJcbiAgICAvLyB3cml0ZSBlbGVtZW50IGZ1bmN0aW9uYWxpdHkgaW4gaGVyZVxyXG5cclxuICAgIGNvbnNvbGUubG9nKFwiIyMjIyMjIyMjIyMjIyMjIyNjdG9yIENFXCIpO1xyXG4gIH1cclxuXHJcbiAgY29ubmVjdGVkQ2FsbGJhY2soKSB7XHJcbiAgICBjb25zb2xlLmxvZyhcIiMjIyMjIyMjIyMjIyMjIyMjQ3VzdG9tIHNxdWFyZSBlbGVtZW50IGFkZGVkIHRvIHBhZ2UuXCIpO1xyXG4gIH1cclxufVxyXG5cclxuY3VzdG9tRWxlbWVudHMuZGVmaW5lKFwicG9wdXAtaW5mb1wiLCBQb3BVcEluZm8pO1xyXG5cclxuZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNvbGRcIikhLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBjb25zb2xlLmxvZyk7XHJcblxyXG4vL2RvY3VtZW50LmJvZHkuaW5uZXJIVE1MID0gbWFya3VwO1xyXG5yZW5kZXIobWFya3VwLCBkb2N1bWVudC5ib2R5LCB0cnVlKTtcclxuLy9yZW5kZXIobWFya3VwLCBkb2N1bWVudC5ib2R5LCB0cnVlKTtcclxuIl0sInNvdXJjZVJvb3QiOiIifQ==