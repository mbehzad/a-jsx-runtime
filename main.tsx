import { render, rawHtml, Deferred, VNodeInterface } from "./jsx/jsx-runtime";

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
      <span ref={(el: HTMLElement) => console.log("my a ::ref::2", el)}>
        Btn-span-first
      </span>
      {children}
      <>
        <span ref={(el: HTMLElement) => console.log("my a ::ref::3", el)}>
          Btn-span-end
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
function NL() {
  return null;
}

function markup3(num: any) {
  return num === 1 ? (
    <h1>
      A-Line 1 - {num}
      <Span mode={num} />
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
        <p>inner p {num}</p>
      </Button>
      A-Line 3
      <>
        <p>
          <p>A Frag line 1*</p>
        </p>
        <p>A Frag line 2</p>
        <p>A Frag line 3</p>
        <p>A Frag line 4</p>
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
      </>
      {null}
    </h1>
  ) : (
    <h1 class="a" ref={console.info}>
      B Line 1 - {num}
      <Span mode={num} />
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
        <p>{num}</p>
      </Button>
      <>
        {false}
        {null}
        {undefined}
      </>
      <>
        <p>B Frag line 1</p>
        <p>B Frag line 2</p>
        {undefined}
        <p>B Frag line 3(4)</p>
        <svg
          viewBox="0 0 300 100"
          xmlns="http://www.w3.org/2000/svg"
          stroke="red"
          fill="grey"
        >
          <circle cx="50" cy="50" r="40" />
          <circle cx="150" cy="50" r="4" />

          <svg viewBox="0 0 10 10" x="200" width="100">
            <circle cx="5" cy="5" r="6" />
          </svg>
        </svg>
        <p>B Frag line 4(6)</p>
      </>
    </h1>
  );
}
const obj = { a: 1 };

function markup4(num: any) {
  obj.a = num;
  return num === 1 ? (
    <h1 obj={obj} id={obj.a}>
      old-Headline {num}
    </h1>
  ) : (
    <h1 obj={obj} class="a" id={obj.a}>
      new-Headline {num}
    </h1>
  );
}

function markup(num: any) {
  return num === 1 ? (
    <div>
      <>
        <p>frag - I</p>
        <b> frag - II</b>
      </>
    </div>
  ) : (
    <h1 class="a">
      {"new-Headline"} {num}
    </h1>
  );
}

function markup5(num: any) {
  return num === 1 ? (
    <div>
      {rawHtml(`<div class="k">txt</div><input type=radio" />`)}
      <Comp3 />
      {el}
    </div>
  ) : (
    <div>
      {rawHtml(`<div class="k">txt</div><input type=radio" />`)}
      {null}
      {el}
    </div>
  );
}

function markup6(a) {
  return (
    <div>
      <svg id="foo6" viewBox="0 0 10 10" x="200" width="100">
        <>{a && <circle cx="5" cy="5" r="6" />}</>
      </svg>
      <button>submit</button>
    </div>
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
////render(markup3(1), document.body);
//document.getElementById("outer")?.setAttribute("data-foo", "mod");

//document.getElementById("inner")?.setAttribute("data-foo", "mod");
//render(markup(2), document.body);
//render(markup, document.body, true);
const el = document.querySelector("#old");
function Comp2() {
  return (
    <>
      {rawHtml(`<div class="k">txt</div><input type=radio" />`)}
      <Comp3 />
      {el}
    </>
  );
}
function Comp3() {
  return <div>comp content</div>;
}

const $container = document.getElementById("container");

window.reRender1 = () => render(markup3(1), $container);
window.reRender2 = () => render(markup3(2), $container);
window.reRender3 = () =>
  render(
    // <div>txt</div>
    <Comp2 />,
    $container
  );

console.log("12345");
window.ss = () => markup3(1) + "";
window.ss2 = () => {
  console.log(markup3(1));

  //document.getElementById("container").innerHTML = markup3(1);
};

window.reRender5a = () => render(markup5(1), $container);
window.reRender5b = () => render(markup5(2), $container);

function markup7(mod) {
  if (mod === 1) {
    return (
      <div>
        <Button>
          <span>text</span>
          <span>, more text</span>
        </Button>
      </div>
    );
  } else if (mod === 2) {
    return <div>some content</div>;
  } else {
    return <div>{false}</div>;
  }
}

window.reRenderRef = () =>
  render(
    <h2 class="a" ref={console.warn}>
      Heading with ref
    </h2>,
    $container
  );
window.reRender6a = () => render(markup6(true), $container);
window.reRender6b = () =>
  render(<circle cx="5" cy="5" r="6" />, document.getElementById("foo6"));
window.reRenderSvg = () => render(markup1(), $container);
window.reRenderSvg2 = () => render(markup1(), $container);
window.reRender7_1 = () => render(markup7(1), $container);
window.reRender7_2 = () => render(markup7(2), $container);
window.reRender7_3 = () => render(markup7(3), $container);

function Func1({ children }) {
  console.log("Func-1");
  return <div>{children}</div>;
}

function timer(t: number): Promise<VNodeInterface> {
  return new Promise((res) => {
    setTimeout(() => {
      res(<p>new text</p>);
    }, t);
  });
}

const p = timer(5000);

function Func2() {
  return <Deferred placeholder={<h2>waiting...</h2>} contentPromise={p} />;
}

render(
  <div>
    <Func1>
      <Func2 />
    </Func1>
  </div>,
  $container
);

window.reRender_sus = () =>
  render(
    <div>
      <Func1>
        <Func2 />
      </Func1>
    </div>,
    $container
  );
