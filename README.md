# a-jsx-runtime

A JSX runtime which allows using JSX templates to render HTML without the need for any frameworks such as react, preact etc. an allows optimized updates / re-renders by using a Virtual DOM implementation.

## Difference to react's JSX flavor

* `class` attribute instead of `className`
* `_ref` attribute instead of `ref`
* `_key` attribute instead of `key`
* `on-event` attribute (e.g. `on-click`) instead of `onEvent`
* `Suspense`: see Suspense [section](#Suspense)

## Example

```TSX

import { render, createRef, rawHtml, Slot, Suspense } from "a-jsx-runtime";

const existingHTMLElement = document.querySelector("#greetings");

const pendingRequest = fetchJSON("/api.json");

const inputRef = createRef<HTMLInputElement>();

function Card({ bg, children }) {
  const style = {
    "background-color": bg,
    border: "1px solid gray"
  };

  return (
    <div style={style}>
      <Slot name="content" hostsChildren={children}>
        <p>default content</p>
      </Slot>
      <Slot name="actions" hostsChildren={children} />
    </div>
  );
}

render(
  <>
    <Card bg="#a00">
      <p _slot="content">New Products!</p>
      <a _slot="actions" href="./shop">Buy Now</a>
    </Card>

    <input type="checkbox" _ref={inputRef} checked={true} />
    <p on-click={e => inputRef.current!.focus()}>label</p>

    <ul style="display: flex;">
      {["a", "b"].map(n => (
        <label _key={n}><input type="checkbox" />{n}</label>
      ))}
    </ul>

    {false && <p>not gonna render this</p>}

    {existingHTMLElement}

    <Suspense
      placeholder={<div>loading...</div>}
      promise={pendingRequest}
      template={response => <div>{rawHtml(response.richText)}</div>}
    />
  </>,
  document.querySelector("#container"),
);

// invoke the render call again e.g. when some data has been changed
render(...);
```

For another example see [example.tsx](./examples/example.tsx).

## Install

```sh
npm install a-jsx-runtime @babel/plugin-transform-react-jsx
```

## Tooling setup

* add jsx parser to babel config. e.g

```javascript
module.exports = {
  ...
  module: {
    rules: [
      ...
      {
        test: /\.tsx$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                ...
              ],
              plugins: [
                ...
                [
                  "@babel/plugin-transform-react-jsx",
                  {
                    "runtime": "automatic", // add the `import` etc automatically.
                    "importSource": "a-jsx-runtime", // use jsx functions from the npm module
                  }
                ],
              ]
            }
          },
        ],
      },
    ]
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', 'jsx', '.json']
  },
  ...
};
```

* add `"jsx": "preserve",` to `tsconfig.json`.

## Special props

### `_key`

When (re-)rendering a list with changing length or order, you can add a `_key` attribute with the unique identifier to each item, to make sure same rendered DOM Elements are re-used. This helps to maintain external changes (e.g. focus, user input, css animations ...)

example:

```jsx
<>
  {arr
    .filter(someDynamicFilter)
    .sort(sortFunction)
    .map(item => (
      <label _key={item.name}>
        <input type="checkbox" />
        {item.name}
      </label>
    ))
  }
</>
```

### `_ref`

After the markup first time is rendered, the reference to the rendered html element will be passed to the `_ref` attribute.

example:

```tsx
import { createRef } from "./jsx-runtime";

function Comp() {
  const ref = createRef<HTMLInputElement>();

  return (
    <>
      {/* use with createRef */}
      <input _ref={ref} />
      <my-label on-click={() => ref.current.focus() } />

      {/* use as callback*/}
      <input type="date" _ref={el => initDatePickerPlugin(el)} />
    </>
  );
}
```

### `_slot`

Name of Function Components Slot element which will be replaced by the items having the prop. (see Slot [section](#Slot))

### `class`

Class name of the html element. Which can be a string or an array for convince.

e.g.

```jsx
<div class="container h-center">
  <button class={["btn", cta ? "primary" : "secondary"]} />
</div>
```

### `style`

Style attribute for an html element. which can be a string or an object.

example:

```jsx
const style = {
  outline: "1px solid gray",
  "padding-top": "10px",
  background: isActive && "red", // falsy values won't be rendered
}

<div style={style} />
```

## Exports

### render

`render(markup , root, append?): void;`

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| markup | `JSX \| string \| number \| null \| boolean \| undefined \| HTMLElement` |  | to be rendered content |
| root | `HTMLElement` |  | container for the content to be rendered into |
| [append] | `boolean` | false | should the provided markup be appended to the existing content, or  replace `root`'s child elements |

Renders the provided jsx as markup inside the `root` html element.

```jsx
import { render } from "a-jsx-runtime";

render(<div>{value}</div>, document.querySelector("#root"))
```

### createRef

Creates a function which can be passed as the value for the `_ref` prop and later the rendered HTML Element be accessed via the `.current` property on it:

```tsx
import { createRef } from "./jsx-runtime";

function Comp() {
  const ref = createRef<HTMLInputElement>();

  return (
    <>
      <input _ref={ref} />
      <my-label on-click={() => ref.current.focus() } />
    </>
  );
}
```

### rawHtml

The provided string will be rendered as markup and not escaped / sanitized.
Use this with caution because theoretically it allows broken html or even xss attacks

```tsx
import { rawHtml } from "a-jsx-runtime";

const richText = await fetchCitation();

render(
  <article>{ rawHtml(richText) }</article>,
  el
);
```

### Slot

Slots are named containers which are placeholders inside a function component and will be replaced by the content passed by the components consumer.

`<Slot name={name} hostsChildren={hostsChildren}>{fallbackContent}</Slot>`

| Param | Type | Description |
| --- | --- | --- |
| name | `string` | name to identify this slot when content is passed |
| hostsChildren | `JSXChild` | props.children from the parent component functions which contains the slotable elements |
| [fallbackContent] | `JSXChild` | fallback markup which will be rendered incase the component is used with out content having the `_slot` prop for this slot |

example

```jsx
function Dialog({children}) {
  return (
    <div>
      <Slot name="body" hostsChildren={children}>
        <p> fallback text </p>
      </Slot>
      <footer>
        <Slot name="footer" hostsChildren={children} />
      </footer>
    </div>
  );
 }

render (
  <Dialog>
    <h3 _slot="body"> Title </h3>
    <p _slot="body"> Description </p>
    <a _slot="footer" href="mailto:name@email.com">
      contact us
    </a>
  </Dialog>,
  element
)
```

### Suspense

Component to render placeholder markup till some promise is resolved and the markup is updated

`<Suspense placeholder={placeholder} promise={promise} template={template} />`

| Param | Type | Description |
| --- | --- | --- |
| placeholder | `JSXChild` | markup to be rendered during the time promise hasn't been resolved |
| promise | `Promise` | promise which needs to be resolved for the actual markup to be rendered |
| template | `function` | function which will be called with promises resolve value and should return the desired jsx markup |

example:

```jsx
import { Suspense } from "a-jsx-runtime";

<Suspense
      placeholder={<PlaceholderTableRows />}
      promise={pendingRequest}
      template={(response) =>
        <TableRows rows={response.items} />
      }
/>
```

### HTMLComment

Renders the provided text as html comments in the generated html.

```jsx
import { HTMLComment } from "a-jsx-runtime";


<div>
  {/* @TODO: move to dedicated template */}
  <HTMLComment content=" start of personalized content " />
  <div />
</div>
```

will render

```html
<div>
  <!-- start of personalized content -->
  <div></div>
</div>
```

### Fragment

JSX Fragments allows sibling elements to be rendered without the need of a parent element.
You usually don't have to explicitly import it, simply use

```jsx
<>
  <p>1</p>
  <p>2</p>
</>
```

and JSX transformer will replace it with Fragments.
But in case you want to pass some props, then you need to use it as:

```jsx
import { Fragment } from "a-jsx-runtime";

  <Fragment _slot="info">
    <p>1</p>
    <p>2</p>
  </Fragment>
```

### type JsxProps

Basic type for props object that Function Components can receive:

```tsx
import { JsxProps } from "a-jsx-runtime";

function Dialog({ open = false, children }: JsxProps) {}
```

But it is always better if you define the prop type of the component explicitly, to allow type checking for the props when this component is used in other places.

## Demo

Checkout repo and `npm start` to see the demo in the example folder in action.

## Author

Github: [@mbehzad](https://github.com/mbehzad)

## License

Copyright © 2021 [mbehzad](https://github.com/mbehzad).<br />
This project is [MIT](https://github.com/mbehzad/a-jsx-runtime/blob/master/LICENSE) licensed.
