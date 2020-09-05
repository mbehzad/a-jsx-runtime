/**
 * provides functions needed by babel for a custom pragma
 * to render parsed jsx code to html strings
 */

// props which will be rendered as attributes
// Functions will be used for event listeners. (attribute name should start with on / on-)
type Attributes = { [key: string]: string | boolean | number | Function };

// additional attributes which can have additional serialization before rendering as attributes
type SpecialAttributes = {
  class?: string | string[];
  style?: string | { [key: string]: string };
  ref?: Function;
};

// child elements in the jsx markup which will be passed to the h function as `props.children`
type ChildrenProps = {
  children: Array<Node | JsxNodeInterface | string>;
};

/**
 * props object which will be passed to jsx pragma and custom component functions
 */
type JsxProps = Attributes & SpecialAttributes & ChildrenProps;

// base class which will be inherited from jsx and fragments function node generation
// and will be used to distinguish them with other Elements
class JsxNode {}

// private key for calling the `ref` callers
const _callRefs = Symbol("callRefs");

// jsx and Fragment will return objects which implement this interface
interface JsxNodeInterface extends JsxNode {
  toString(): string;
  asNode(): Node;
  [_callRefs](): void;
}

/**
 * returns true if not nullish or false
 * that means 0 or empty string are allowed
 * @param {*} val
 */
function positive(val: any): boolean {
  return val !== false && val !== null && val !== undefined;
}

function truthy(value: any): boolean {
  return value !== false && value !== null && value !== undefined;
}

/**
 * escapes the provided string against xss attacks
 *
 * @param {string} text
 * @returns {string}
 */
function sanitize(text: string): string {
  const div = document.createElement("div");
  div.innerText = text;
  return div.innerHTML;
}

/**
 * basically `Element.outerHTML` but also supports Text node and DocumentFragment
 * @param element {Node} - element which its html needs to be returned
 */
function getOuterHtml(element: Node): string {
  if (element instanceof Element) return element.outerHTML;
  if (element instanceof Text) return sanitize(element.wholeText);
  if (element instanceof DocumentFragment)
    return Array.from(element.childNodes)
      .map((el) => getOuterHtml(el))
      .join("");
}

function asHtmlString(tag: string | Function, props: JsxProps) {
  if (typeof tag === "function") {
    // @TODO: what if not jsx is returned
    const element: JsxNode = tag(props);

    return element.toString();
  }

  // remove children from props and render it as content,
  // the rest as attributes
  const { children, ...attrs } = props;

  const attributes = Object.entries(attrs)
    .filter(([, value]) => truthy(value))
    .map(([key, value]) => {
      // e.g. disabled: true => <tag disabled>
      if (value === true) return key;

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
      if (key === "class" && Array.isArray(value)) value = value.join(" ");

      return `${key}="${value}"`;
    })
    .join(" ");

  const content = children
    .filter(truthy)
    .map((child) =>
      child instanceof Node
        ? getOuterHtml(child)
        : typeof child === "object"
        ? child.toString()
        : sanitize(child)
    )
    .join("");

  return `<${tag} ${attributes}>${content}</${tag}>`;
}

function asNode(
  tag: string | Function,
  props: JsxProps
): [Node, JsxNodeInterface[]] {
  if (typeof tag === "function") {
    let result = tag(props);

    let jsxNodes: JsxNodeInterface[] = [];

    if (result instanceof JsxNode) {
      jsxNodes = [result as JsxNodeInterface];
      result = (result as JsxNodeInterface).asNode();
      Object.entries(props).forEach(([key, value]) => {
        if (
          key.startsWith("on-") &&
          (typeof value === "function" || typeof value === "object")
        ) {
          // remove leading "on-""
          let event = key.replace(/^on-/, "");
          // change first letter to lower case. e.g "(on)Click" => "click"
          event = `${event[0].toLowerCase()}${event.substring(1)}`;

          result.addEventListener(
            event,
            value as EventListenerOrEventListenerObject
          );
        }
      });
    }

    return [result, jsxNodes];
  }

  const { children, ...attrs } = props;

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
      if (key === "class" && Array.isArray(value)) value = value.join(" ");

      if (value === true) node.setAttribute(key, "");
      else if (typeof value === "string" || typeof value === "number")
        node.setAttribute(key, String(value));
      // key has the form of "onClick" or "on-change". value is the callback function or an object implementing {EventListener} interface
      else if (
        key.startsWith("on-") &&
        (typeof value === "function" || typeof value === "object")
      ) {
        // remove leading "on-""
        let event = key.replace(/^on-/, "");
        // change first letter to lower case. e.g "(on)Click" => "click"
        event = `${event[0].toLowerCase()}${event.substring(1)}`;

        node.addEventListener(
          event,
          value as EventListenerOrEventListenerObject
        );
      }
      // @ts-ignore - providing the value as property to html element
      else node[key] = value;
    });

  const jsxNodes = children.filter((child) => child instanceof JsxNode);

  node.append(
    ...children
      //.flat()
      .filter(truthy)
      .map((child) =>
        child instanceof Node
          ? child
          : child instanceof JsxNode
          ? child.asNode()
          : child
      )
  );

  return [node, jsxNodes as JsxNodeInterface[]];
}

/**
 * converts pragma object to html string
 * jsxs is always called when element has more than one child
 *
 * @param {string | Function} tag - tag name or tag class
 * @param {Object | null} props - props for the tag
 */
export function jsxs(
  tag: string | Function,
  props: JsxProps
): JsxNodeInterface {
  let node: HTMLElement;
  let jsxNodes: JsxNodeInterface[];
  props.children = props.children.flat(); // @TODO: doc

  // if ref prop is provided, memorize and remove from the html generation process
  const ref: Function | null =
    typeof props.ref === "function" ? props.ref : null;
  if (ref) delete props.ref;

  return new (class extends JsxNode implements JsxNodeInterface {
    toString() {
      //console.log("jsxs, toString", rnd, { tag, props });
      //console.error(new Error())

      return asHtmlString(tag, props);
    }

    asNode() {
      [node, jsxNodes] = asNode(tag, props);

      if (!jsxNodes) {
        // debugger;
      }

      return node;
    }

    [_callRefs]() {
      if (ref && node) ref(node);

      if (typeof tag === "function") {
        jsxNodes.forEach((node) => node[_callRefs]());
      } else if (props.children) {
        props.children
          //.flat()
          .filter((child) => child instanceof JsxNode)
          .forEach((child: JsxNodeInterface) => child[_callRefs]());
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
export function Fragment({
  children,
}: {
  children: Array<string | Node | JsxNodeInterface>;
}) {
  return new (class extends JsxNode implements JsxNodeInterface {
    toString() {
      return (
        children
          //.flat()
          .filter(truthy)
          .map((child) =>
            child instanceof Node
              ? getOuterHtml(child)
              : typeof child === "object"
              ? child.toString()
              : sanitize(child)
          )
          .join("")
      );
    }

    asNode() {
      const fragments = children
        .filter(truthy)
        .map((item) =>
          item instanceof Node
            ? item
            : item instanceof JsxNode
            ? item.asNode()
            : item
        );

      const documentFragment = document.createDocumentFragment();

      documentFragment.append(...fragments);
      return documentFragment;
    }

    [_callRefs]() {
      children
        .filter((child) => child instanceof JsxNode)
        .forEach((child: JsxNodeInterface) => child[_callRefs]());
    }
  })();
}

// jsx is called when the element has one or zero children
export function jsx(
  tag: string | Function,
  props: Attributes &
    SpecialAttributes & { children?: string | Node | JsxNodeInterface }
): JsxNodeInterface {
  // @ts-ignore - wrapping the children as array to re-use jsxs method
  props.children = props.hasOwnProperty("children") ? [props.children] : [];

  return jsxs(tag, (props as unknown) as JsxProps);
}

/**
 * render the given markup into the given dom node
 *
 * @param {string|HTMLElement|JSX} markup - html as string, html element or jsx template
 * @param {HTMLElement} domNode - container for the template to be rendered into
 * @param {boolean} [append=false] - should the provided markup be appended to the existing markup, or default replace it
 */
export function render(
  markup: string | HTMLElement | JsxNodeInterface, // @TODO: specific support for Template? (.content.clone)
  domNode: HTMLElement,
  append: boolean = false
) {
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

export function rawHtml(content: string): JsxNodeInterface {
  return new (class extends JsxNode implements JsxNodeInterface {
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
    }
  })();
}

console.log("ts");
