# Custom jsx runtime

## Example

```TSX

import { Suspense, createRef, rawHtml } from "jsx";

const existingHTMLElement = document.querySelector("#greetings");

const pendingRequest = fetchJSON("/api.json");

const inputRef = createRef<HTMLInputElement>();

function Heading({ bg, children }) {
  const bg = `background-color: ${bg}`;
  return <h1 style={bg}>{children}</h1>;
}

render(
  <>
    <Heading bg="#a00">
      Title
      <svg>
        <use href="#star" />
      </svg>
    </Heading>

    <input type="checkbox" ref={inputRef} checked={true} />
    <p on-click={e => inputRef.current!.focus()}>label</p>

    <ul style="display: flex;">
      {[1, 2].map(n => (
        <li style={{ padding: "2px", "margin-top": "4px" }}>{n}</li>
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
      ref?: Function;
      children?: any;
    };
  }

  interface ElementChildrenAttribute {
    children: {};
  }
}
```
- add `"jsx": "preserve",` to `tsconfig.json`.
