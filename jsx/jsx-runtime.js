/**
 * provides functions needed by babel for a custom pragma
 * to render parsed jsx code to html strings
 */
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
let counter = 0;
let counter2 = -1;
// base class which will be inherited from jsx and fragments function node generation
// and will be used to distinguish them with other Elements
class JsxNode {
}
// private key for calling the `ref` callers
const _callRefs = Symbol("callRefs");
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
    if (element instanceof Element)
        return element.outerHTML;
    if (element instanceof Text)
        return sanitize(element.wholeText);
    if (element instanceof DocumentFragment)
        return Array.from(element.childNodes)
            .map((el) => getOuterHtml(el))
            .join("");
}
function asHtmlString(tag, props) {
    if (typeof tag === "function") {
        // @TODO: what if not jsx is returned
        const element = tag(props);
        console.log("element", element);
        return element.toString();
    }
    // remove children from props and render it as content,
    // the rest as attributes
    const { children } = props, attrs = __rest(props, ["children"]);
    const attributes = Object.entries(attrs)
        .filter(([, value]) => truthy(value))
        .map(([key, value]) => {
        // e.g. disabled: true => <tag disabled>
        if (value === true)
            return key;
        // for style as object:
        // (style:) {display: "none", position: "absolute"} ==> 'display: none; position: absolute;'
        if (key === "style" && typeof value === "object")
            value = Object.entries(value)
                // ignore stuff like `{background: active && "red"}` when `active === false / null / undefined`
                .filter(([, v]) => truthy(value))
                // currently supports "background-color" not "backgroundColor"
                .map(([k, v]) => `${k}: ${v}`)
                .join("; ");
        // (class:) ["btn", "red"] ==> "btn red"
        if (key === "class" && Array.isArray(value))
            value = value.join(" ");
        return `${key}="${value}"`;
    })
        .join(" ");
    console.log("asHtmlString:: ", { children });
    const content = children
        .filter(truthy)
        .map((child) => child instanceof Node
        ? getOuterHtml(child)
        : typeof child === "object"
            ? child.toString()
            : sanitize(child))
        .join("");
    console.log({ content });
    return `<${tag} ${attributes}>${content}</${tag}>`;
}
function asNode(tag, props) {
    if (typeof tag === "function") {
        const result = tag(props);
        console.log("asNode:res:", result);
        return result instanceof JsxNode
            ? [result.asNode(), [result]]
            : [result, []];
    }
    const { children } = props, attrs = __rest(props, ["children"]);
    // currently not supporting the `is` option for Customized built-in elements
    const node = document.createElement(tag);
    Object.entries(attrs)
        .filter(([_key, value]) => truthy(value))
        .forEach(([key, value]) => {
        // for style as object:
        // (style:) {display: "none", position: "absolute"} ==> 'display: none; position: absolute;'
        if (key === "style" && typeof value === "object")
            value = Object.entries(value)
                .filter(([, v]) => truthy(value))
                .map(([k, v]) => `${k}: ${v}`)
                .join("; ");
        // (class:) ["btn", "red"] ==> "btn red"
        if (key === "class" && Array.isArray(value))
            value = value.join(" ");
        if (value === true)
            node.setAttribute(key, "");
        else if (typeof value === "string" || typeof value === "number")
            node.setAttribute(key, String(value));
        // key has the form of "onClick" or "on-change". value is the callback function or an object implementing {EventListener} interface
        else if (key.startsWith("on") &&
            (typeof value === "function" || typeof value === "object")) {
            // remove leading "on" or "on-""
            let event = key.replace(/^on-*/, "");
            // change first letter to lower case. e.g "(on)Click" => "click"
            event = `${event[0].toLowerCase()}${event.substring(1)}`;
            node.addEventListener(event, value);
        }
        // @ts-ignore - providing the value as property to html element
        else
            node[key] = value;
    });
    const jsxNodes = children.filter((child) => child instanceof JsxNode);
    console.log({ jsxNodes });
    node.append(...children
        //.flat()
        .filter(truthy)
        .map((child) => child instanceof Node
        ? child
        : child instanceof JsxNode
            ? child.asNode()
            : child));
    return [node, jsxNodes];
}
/**
 * converts pragma object to html string
 * jsxs is always called when element has more than one child
 *
 * @param {string | Function} tag - tag name or tag class
 * @param {Object | null} props - props for the tag
 */
export function jsxs(tag, props) {
    let node;
    let jsxNodes;
    props.children = props.children.flat(); // @TODO: doc
    const rnd = counter2--;
    console.log("jsxs:", rnd, { tag, props });
    console.log(rnd, typeof props.ref, props.ref, tag);
    // if ref prop is provided, memorize and remove from the html generation process
    const ref = typeof props.ref === "function" ? props.ref : null;
    if (ref)
        delete props.ref;
    return new (class extends JsxNode {
        constructor() {
            super();
            this.uid = counter++;
            this.type = "jsxs";
            this.tag = tag;
            this.props = props;
        }
        toString() {
            //console.log("jsxs, toString", rnd, { tag, props });
            //console.error(new Error())
            return asHtmlString(tag, props);
        }
        asNode() {
            console.log("jsxs asNode:", rnd, { tag, props });
            [node, jsxNodes] = asNode(tag, props);
            console.log("++++ADSDDS", "uid:", rnd, "node:", node, "ref:", ref, "tag:", tag, "jsxNodes:", jsxNodes, "toStirng", jsxNodes.map((jsxN) => jsxN.toString()));
            if (!jsxNodes) {
                // debugger;
            }
            return node;
        }
        [_callRefs]() {
            console.log("[_callRefs], jsxs", rnd, {
                tag,
                ref,
                node,
                props,
                jsxNodes,
            });
            console.log("jsxNodes:::", "uid:", rnd, "jsxNodes:", jsxNodes, "props.children:", props.children);
            if (ref && node)
                ref(node);
            if (typeof tag === "function") {
                console.log("no refs called for these children", props.children.filter((child) => child instanceof JsxNode));
                jsxNodes.forEach((node) => node[_callRefs]());
            }
            else if (props.children) {
                props.children
                    //.flat()
                    .filter((child) => child instanceof JsxNode)
                    .forEach((child) => child[_callRefs]());
            }
        }
    })();
}
/**
 * converts the fragments object to nodes
 *
 * @param {Object} props
 * @param {Array} props.children - child elements in the fragment
 */
export function Fragment({ children, }) {
    console.log("Fragment", children);
    return new (class extends JsxNode {
        constructor() {
            super();
            this.uid = counter++;
            this.type = "Fragment";
        }
        toString() {
            console.log("Frag.toString", children, " |", children
                //.filter(truthy)
                .map((child) => child instanceof Node
                ? getOuterHtml(child)
                : typeof child === "object"
                    ? child.toString()
                    : sanitize(child))
                .join(""), "| ");
            return (children
                //.flat()
                .filter(truthy)
                .map((child) => child instanceof Node
                ? getOuterHtml(child)
                : typeof child === "object"
                    ? child.toString()
                    : sanitize(child))
                .join(""));
        }
        asNode() {
            const fragments = children
                .filter(truthy)
                .map((item) => item instanceof Node
                ? item
                : item instanceof JsxNode
                    ? item.asNode()
                    : item);
            const documentFragment = document.createDocumentFragment();
            console.log({ fragments });
            documentFragment.append(...fragments);
            return documentFragment;
        }
        [_callRefs]() {
            console.log("[_callRefs], Fragment");
            children
                .filter((child) => child instanceof JsxNode)
                .forEach((child) => child[_callRefs]());
        }
    })();
}
// jsx is called when the element has one or zero children
export function jsx(tag, props) {
    // @ts-ignore - wrapping the children as array to re-use jsxs method
    props.children = props.hasOwnProperty("children") ? [props.children] : [];
    console.log("jsx", { tag, props });
    return jsxs(tag, props);
}
/**
 * render the given markup into the given dom node
 *
 * @param {string|HTMLElement|JSX} markup - html as string, html element or jsx template
 * @param {HTMLElement} domNode - container for the template to be rendered into
 * @param {boolean} [append=false] - should the provided markup be appended to the existing markup, or default replace it
 */
export function render(markup, // @TODO: specific support for Template? (.content.clone)
domNode, append = false) {
    if (!append)
        domNode.innerHTML = "";
    if (typeof markup === "string") {
        domNode.insertAdjacentHTML("afterbegin", markup);
    }
    else if (markup instanceof Node) {
        domNode.insertAdjacentElement("afterbegin", markup);
    }
    else if (markup instanceof JsxNode) {
        console.log("==================================!");
        const content = markup.asNode();
        console.log("==================================?");
        domNode.append(content);
        console.log("==================================ref?");
        markup[_callRefs]();
    }
    else {
        throw new Error("render method called with wrong argument(s)");
    }
}
export function rawHtml(content) {
    return new (class extends JsxNode {
        constructor() {
            super();
            this.uid = counter++;
            this.type = "rawHtml";
        }
        toString() {
            return content;
        }
        asNode() {
            const template = document.createElement("template");
            template.innerHTML = content;
            return template.content;
        }
        [_callRefs]() {
            // noop
            console.log("[_callRefs], rawHtml");
        }
    })();
}
console.log("ts");
//# sourceMappingURL=jsx-runtime.js.map