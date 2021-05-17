# Custom jsx runtime

## Example

```TSX

import { render, createRef, rawHtml, Slot, Suspense } from "jsx";

const existingHTMLElement = document.querySelector("#greetings");

const pendingRequest = fetchJSON("/api.json");

const inputRef = createRef<HTMLInputElement>();

function Card({ bg, children }) {
  const style = `background-color: ${bg}; border: 1px solid gray;`;
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
      {[1, 2].map(n => (
        <li _key={n} style={{ padding: "2px", "margin-top": "4px" }}>{n}</li>
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

## Usage

- copy the jsx directory with jsx-runtime.ts to a project
- add jsx parser to babel config. e.g

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
                    "runtime": "automatic", // add the import etc automatically.
                    "importSource": path.resolve(__dirname, './path/to/jsx'), // use jsx functions from the given folder
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

- update `global.ts`. e.g.

```typescript
declare namespace JSX {
  interface IntrinsicElements {
    [elementName: string]: {
      // for the time being, allow any attribute on jsx element,
      // type libs such as @types/react or similar can also be used for better list of allowed attributes per HTML Element
      [attributeName: string]: string | boolean | number | Object | string[] | null | undefined;
      _ref?: Function;
      _key?: string;
      _slot?: string;
      children?: any;
    };
  }

  interface IntrinsicAttributes {
    _ref?: Function;
    _key?: string;
    _slot?: string;
  }

  interface ElementChildrenAttribute {
    children: {};
  }
}
```

- add `"jsx": "preserve",` to `tsconfig.json`.
