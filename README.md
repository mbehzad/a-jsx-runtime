# Custom jsx runtime

## usage example

```TSX
import { Suspense, createRef, rawHtml } from "jsx";

const existingHTMLElement = document.querySelector("#greetings");

const pendingRequest = fetchJSON("/api.json");

const inputRef = createRef<HTMLInputElement>();

function Heading({bg, children}) {
  const bg = `background-color: ${bg}`
  return (
    <h1 style={bg}>
      {children}
    </h1>
  )
}


render (
  (
    <>
      <Heading bg="#a00">
        Title
        <svg> <use href="#star" /></svg>
      </Heading>

      <input type="checkbox" ref={inputRef} checked={true} />
      <p on-click={e => inputRef.current!.focus()}>label</p>

      <ul style="display: flex;">
        {[1,2].map(n => <li style={{ padding: "2px", "margin-top": "4px" }}>{n}</li>)}
      </ul>

      {false && <p>not gonna render this</p>}

      {existingHTMLElement}

      <Suspense
       placeholder={<div>loading...</div>}
       promise={pendingRequest}
       template={(response) =>
         <div>
          {rawHtml(response.richText)}
         </div>
       }
      />

    </>
  ),
  document.querySelector("#container")
);

// invoke the render call again e.g. when some data has been changed
render(...);
```
