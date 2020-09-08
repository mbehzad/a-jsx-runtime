import { render, rawHtml } from "./jsx/jsx-runtime";

const xss = "<img src=x onerror=\"alert('XSS Attack')\">"; //"<script>alert('-.-')</script>";

function RTE(props: /*{ txt, "on-click": onClick }*/ {
  txt: string;
  ref?: Function;
}) {
  console.log("onClick", props["on-click"]);
  return (
    <p ref={(el: HTMLElement) => console.log("my div ::ref::3.2", el)}>
      {props.txt}
    </p>
  );
}

function Button({
  children,
  disabled,
}: {
  children: any;
  disabled: boolean;
  ref?: Function;
}) {
  return (
    <button
      disabled={disabled}
      ref={(el: HTMLElement) => console.log("my button ::ref::1", el)}
    >
      <span ref={(el: HTMLElement) => console.log("my a ::ref::2", el)}>a</span>
      {children}
      <>
        <span ref={(el: HTMLElement) => console.log("my a ::ref::3", el)}>
          a
        </span>
      </>
    </button>
  );
}

function reflog(el: HTMLElement) {
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

function Span({ mode }: { mode: any }) {
  return mode === 1 ? (
    <div>
      <span id="inner" old={true}>
        Span-Comp--old
      </span>
      <h3>to be removed</h3>
    </div>
  ) : (
    <div>
      <p id="inner" new={true}>
        Span-Comp--news
      </p>
    </div>
  );
}

function Comp({ num }) {
  if (num === 1) return null;
  return (
    <div>
      <p>comp</p>
    </div>
  );
}

const markup1 = (num: any) => (
  <div id="outer" data-foo="bar" data-var={num}>
    <h3>should get 2 -: 3</h3>
    {num === 1 ? (
      <ul class="ul-class">
        <li>Text 1 </li>
        <li>Text 2 </li>
      </ul>
    ) : (
      <ul class="ul-class">
        <li>Text 3 </li>
        <li>Text 2 </li>
        <li>Text 1 </li>
      </ul>
    )}
    <h3>should get 3 -: 2</h3>
    {num === 1 ? (
      <ul class="ul-class">
        <li>Text 1 </li>
        <li>Text 2 </li>
        <li>Text 3 </li>
      </ul>
    ) : (
      <ul class="ul-class">
        <li>Text 1 </li>
        <li>Text 2 </li>
      </ul>
    )}
    {num === 1 ? null : <p>new render</p>}
    <div>
      <span>span-content</span>
    </div>
    <Span mode={num} />
    {/*document.querySelector("#old")*/}
    <>Fragment-item</>
    <svg
      viewBox="0 0 300 100"
      xmlns="http://www.w3.org/2000/svg"
      stroke="red"
      fill="grey"
    >
      <circle cx="50" cy="50" r="40" />
      <circle cx="150" cy="50" r="4" />

      <svg viewBox="0 0 10 10" x="200" width="100">
        <circle cx="5" cy="5" r="4" />
      </svg>
    </svg>
  </div>
);

function markup2(num: any) {
  return (
    <div id="outer">
      <>
        <>
          <p>nested fragment</p>
        </>
      </>
      <h1>static</h1>
      <h1>dynamic val: {num}</h1>
      {num === 1 ? <h1>old</h1> : false}
      {num === 1 ? (
        <>
          <h1>frag old</h1>
          <span>frag span old</span>
        </>
      ) : (
        <h1>frag new</h1>
      )}
      <Comp num={num} />
    </div>
  );
}

function markup(num: any) {
  return num === 1 ? (
    <h1>
      old-Headline {num}
      foo
      <>
        <p>old-span A</p>
        <p>1</p>
        <p>2</p>
        <p>3</p>
        <svg viewBox="0 0 300 100" xmlns="http://www.w3.org/2000/svg" stroke="red" fill="grey">
          <circle cx="50" cy="50" r="40" />
          <circle cx="150" cy="50" r="4" />

          <svg viewBox="0 0 10 10" x="200" width="100">
            <circle cx="5" cy="5" r="4" />
          </svg>
        </svg>
      </>
      {null}
    </h1>
  ) : (
    <h1 class="a">
      new-Headline {num}
      {false}
      <>
        <p>new-span A</p>
        <p>1</p>
        {undefined}
        <p>3</p>
        <svg viewBox="0 0 300 100" xmlns="http://www.w3.org/2000/svg" stroke="red" fill="grey">
          <circle cx="50" cy="50" r="40" />
          <circle cx="150" cy="50" r="4" />

          <svg viewBox="0 0 10 10" x="200" width="100">
            <circle cx="5" cy="5" r="6" />
          </svg>
        </svg>
        <p>new span B at end</p>
      </>
    </h1>
  );
}

//console.log(markup);
//window.markup = markup;

class PopUpInfo extends HTMLElement {
  constructor() {
    // Always call super first in constructor
    super();

    // write element functionality in here

    console.log("#################ctor CE");
  }

  connectedCallback() {
    console.log("#################Custom square element added to page.");
  }
}

customElements.define("popup-info", PopUpInfo);

//document.querySelector("#old")!.addEventListener("click", console.log);

//document.body.innerHTML = markup;
render(markup(1), document.body);
//document.getElementById("outer")?.setAttribute("data-foo", "mod");

//document.getElementById("inner")?.setAttribute("data-foo", "mod");
//render(markup(2), document.body);
//render(markup, document.body, true);

window.reRender1 = () => render(markup(1), document.body);
window.reRender2 = () => render(markup(2), document.body);
