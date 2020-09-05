import { render, rawHtml } from "./jsx/jsx-runtime";


const xss = "<img src=x onerror=\"alert('XSS Attack')\">"; //"<script>alert('-.-')</script>";

function RTE(props/*{ txt, "on-click": onClick }*/: { txt: string; ref?: Function }) {
  console.log("onClick", props["on-click"])
  return (
    <p ref={(el: HTMLElement) => console.log("my div ::ref::3.2", el)}>{props.txt}</p>
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

document.querySelector("#old")!.addEventListener("click", console.log);

//document.body.innerHTML = markup;
render(markup, document.body, true);
//render(markup, document.body, true);
