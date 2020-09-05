import { render, rawHtml } from "./jsx/jsx-runtime";
const xss = '<img src=x onerror="alert(\'XSS Attack\')">'; //"<script>alert('-.-')</script>";
function RTE({ txt }) {
    return <p ref={(el) => console.log("my div ::ref::3.2", el)}>{txt}</p>;
}
function Button({ children, disabled }) {
    return (<button disabled={disabled} ref={(el) => console.log("my button ::ref::1", el)}>
      <span ref={(el) => console.log("my a ::ref::2", el)}>a</span>
      {children}
      <>
        <span ref={(el) => console.log("my a ::ref::3", el)}>a</span>
        <RTE txt="le text" ref={(el) => console.log("my div ::ref::3.1", el)}/>
      </>
    </button>);
}
function reflog(el) {
    console.log("my inner div::ref::8", el);
}
const markup = (<>
    <div class="foo" ref={(el) => console.log("my div ::ref::4", el)}/>
    <input disabled={true} hidden={false}/>
    <Button disabled={true} ref={(el) => console.log("my BUTTON::ref::5", el)}>
      text
      <popup-info ref={(el) => console.log("span in BUTTON::ref::6", el)}>
        bla
      </popup-info>
    </Button>
    {(xss)}
    {rawHtml(`<ol><li>raw html</li></ol>`)}
    <div class="bam" ref={(el) => console.log("my div::ref::7", el)}>
      <div>
        <div class="bar" on-click={(e) => console.log(e)} ref={reflog}>
          click ME
        </div>
        <div style={{ outline: "1px solid red;" }}>
          {document.querySelector("#old")}
          {null}
          {[0, 1].map(n => (<span>{n}</span>))}
        </div>
      </div>
    </div>
  </>);
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
document.querySelector("#old").addEventListener("click", console.log);
//document.body.innerHTML = markup;
render(markup, document.body, true);
//render(markup, document.body, true);
//# sourceMappingURL=main.jsx.map