const chai = require("chai");
const { expect } = chai;
const { describe, it, xit, beforeEach, afterEach } = require("mocha");

const { rawHtml, render, createRef, Suspense } = require("../jsx/jsx-runtime.ts");

describe("jsx-runtimes test", function () {
  beforeEach(async function () {});

  afterEach(async function () {});

  describe("converting to string", function () {
    it("should return jsx as string when used with innerHTML", function () {
      const div = document.createElement("div");
      div.innerHTML = (
        <div>
          <span class="foo">text</span>
        </div>
      );

      expect(div.innerHTML).to.equal('<div><span class="foo">text</span></div>');
    });

    it("should return jsx fragment as string when used with innerHTML", function () {
      const div = document.createElement("div");
      div.innerHTML = (
        <>
          <span class="foo">text-1</span>
          <span class="bar">text-2</span>
        </>
      );

      expect(div.innerHTML).to.equal('<span class="foo">text-1</span><span class="bar">text-2</span>');
    });

    it("should escape inner text and not convert to HTML", function () {
      const div = document.createElement("div");

      const unsafeText = "<script>alert()</script>";
      div.innerHTML = <span class="foo">{unsafeText}</span>;

      expect(div.innerHTML).to.equal('<span class="foo">&lt;script&gt;alert()&lt;/script&gt;</span>');
    });

    it("should not escape text which is used with 'rawHtml' helper", function () {
      const div = document.createElement("div");

      const safeText = "<script>alert()</script>";
      div.innerHTML = <span class="foo">{rawHtml(safeText)}</span>;

      expect(div.innerHTML).to.equal('<span class="foo"><script>alert()</script></span>');
    });
  });

  describe("using render method", function () {
    it("should render jsx as argument correctly", function () {
      const root = document.createElement("div");
      render(
        <div>
          <span class="foo">text</span>
        </div>,
        root,
      );

      expect(root.innerHTML).to.equal('<div><span class="foo">text</span></div>');
    });

    it("should render text as argument correctly", function () {
      const root = document.createElement("div");
      render("text", root);

      expect(root.innerHTML).to.equal("text");
    });

    it("should render HTML as argument correctly", function () {
      const root = document.createElement("div");
      const div = document.createElement("div");
      div.innerHTML = "<span>text</span>";
      render(div, root);

      expect(root.innerHTML).to.equal("<div><span>text</span></div>");
    });

    it("should render null as argument correctly", function () {
      const root = document.createElement("div");
      render(null, root);

      expect(root.innerHTML).to.equal("");
    });

    it("should render jsx fragment", function () {
      const root = document.createElement("div");
      render(
        <>
          <span class="foo">text-1</span>
          <span class="bar">text-2</span>
        </>,
        root,
      );

      expect(root.innerHTML).to.equal('<span class="foo">text-1</span><span class="bar">text-2</span>');
    });

    it("should escape inner text and not convert to HTML", function () {
      const root = document.createElement("div");

      const unsafeText = "<script>alert()</script>";
      render(<span class="foo">{unsafeText}</span>, root);

      expect(root.innerHTML).to.equal('<span class="foo">&lt;script&gt;alert()&lt;/script&gt;</span>');
    });

    it("should not escape text which is used with 'rawHtml' helper", function () {
      const root = document.createElement("div");

      const safeText = "<script>alert()</script>";
      render(<span class="foo">{rawHtml(safeText)}</span>, root);

      expect(root.innerHTML).to.equal('<span class="foo"><script>alert()</script></span>');
    });

    it("should render svg elements correctly", function () {
      const root = document.createElement("div");

      render(
        <span class="foo">
          <svg version="1.1" x="0px" y="0px" viewBox="0 0 24 24">
            <path d="M22.6,0.7l0.7,0.7L12.7,12l10.6,10.6l-0.7,0.7L12,12.7L1.4,23.3l-0.7-0.7L11.3,12L0.7,1.4l0.7-0.7L12,11.3L22.6,0.7z" />
          </svg>
        </span>,
        root,
      );

      expect(root.querySelector("path")).to.be.an.instanceof(SVGElement);
    });

    it("should replace children when append is not set", function () {
      const root = document.createElement("div");
      root.innerHTML = "<span>text</span>";
      render(<div>bar</div>, root);

      expect(root.innerHTML).to.equal("<div>bar</div>");
    });

    it("should not replace children when append==true", function () {
      const root = document.createElement("div");
      root.innerHTML = "<span>text</span>";
      render(<div>bar</div>, root, { append: true });

      expect(root.innerHTML).to.equal("<span>text</span><div>bar</div>");
    });

    it("should not render falsy content", function () {
      const root = document.createElement("div");

      render(
        <div style={false && "display: none;"}>
          text
          {null}
        </div>,
        root,
      );

      expect(root.innerHTML).to.equal("<div>text</div>");
    });

    it("should render interpolations correctly", function () {
      const root = document.createElement("div");

      const style = "display: none;";
      const content = "text";

      render(<div style={style}>{content}</div>, root);

      expect(root.innerHTML).to.equal('<div style="display: none;">text</div>');
    });

    describe("render attributes", function () {
      describe("render boolean attribute", function () {
        it("should render true attribute as empty string", function () {
          const root = document.createElement("div");

          render(<input disabled={true}>text</input>, root);

          expect(root.innerHTML).to.equal('<input disabled="">');
        });

        it("should not render false attribute", function () {
          const root = document.createElement("div");

          render(<input disabled={false}>text</input>, root);

          expect(root.innerHTML).to.equal("<input>");
        });
      });

      it("should render object attribute as property", function () {
        const root = document.createElement("div");

        const obj = {};

        render(<div foo={obj}>text</div>, root);

        // @ts-ignore - foo as prop
        expect(root.querySelector("div")!.foo).to.equal(obj);
      });

      describe("event listeners (on-*) attributes", function () {
        it("should not render event listeners in html", function () {
          const root = document.createElement("div");

          render(<div on-click={console.log}>text</div>, root);

          expect(root.innerHTML).to.equal("<div>text</div>");
        });

        it("should add event listeners", function () {
          const noop = function nop() {};
          const spy = chai.spy(noop);

          const root = document.createElement("div");

          render(<button on-click={spy}>text</button>, root);

          // trigger click
          root.querySelector("button")!.click();

          expect(spy).to.have.been.called();
        });
      });

      //
      describe("style", function () {
        // obj and string
      });

      describe("ref", function () {
        it("using createRef, should set the current property to correct element", function () {
          const root = document.createElement("div");
          const ref = createRef();

          render(<button ref={ref}>text</button>, root);

          const button = root.querySelector("button");

          expect(ref.current).to.equal(button);
        });

        it("should call the ref callback with correct element", function () {
          const noop = function nop() {};
          const spy = chai.spy(noop);

          const root = document.createElement("div");

          render(<button ref={spy}>text</button>, root);

          const button = root.querySelector("button");

          expect(spy).to.have.been.called.with(button);
        });
      });
    });

    describe("render function component", function () {
      it("should render function components correctly", function () {
        const root = document.createElement("div");
        function Comp() {
          return <span>component</span>;
        }

        render(
          <div>
            <Comp />
          </div>,
          root,
        );

        expect(root.innerHTML).to.equal("<div><span>component</span></div>");
      });

      it("should render function components correctly (with props)", function () {
        const root = document.createElement("div");
        function Comp({ name }: { name: string }) {
          return <span label={name}>component</span>;
        }

        render(
          <div>
            <Comp name="foo" />
          </div>,
          root,
        );

        expect(root.innerHTML).to.equal('<div><span label="foo">component</span></div>');
      });

      it("should render function components correctly (with children)", function () {
        const root = document.createElement("div");

        function Comp({ children }: { children: any }) {
          return <span>{children}</span>;
        }

        render(
          <div>
            <Comp>
              <button>btn</button>
            </Comp>
          </div>,
          root,
        );

        expect(root.innerHTML).to.equal("<div><span><button>btn</button></span></div>");
      });

      it("should render function components correctly (with ref)", function () {
        const root = document.createElement("div");
        const ref = createRef();

        function Comp() {
          return <span>component</span>;
        }

        render(
          <div>
            <Comp ref={ref} />
          </div>,
          root,
        );

        const compEl = root.querySelector("span");

        expect(ref.current).to.equal(compEl);
      });

      it("should render children and children props correctly", function () {
        const root = document.createElement("div");

        function Comp({ children }: { children: any }) {
          return (
            <ul>
              <li>fix item</li>
              {children}
            </ul>
          );
        }

        render(
          <div>
            <Comp>
              <li>item - 1</li>
              <li>item - 2</li>
            </Comp>
          </div>,
          root,
        );

        const expected = `
          <div>
            <ul>
              <li>fix item</li>
              <li>item - 1</li>
              <li>item - 2</li>
            </ul>
          </div>
        `
          // no line feed when reading via innerHTML
          .split("\n")
          .map(line => line.trim())
          .join("");

        expect(root.innerHTML).to.equal(expected);
      });
    });
  });

  describe("re-rendering", function () {
    it("should re-render jsx as argument correctly", function () {
      const root = document.createElement("div");
      render(
        <div>
          <span class="foo">text</span>
        </div>,
        root,
      );
      render(
        <div>
          <span class="bar">text2</span>
        </div>,
        root,
      );

      expect(root.innerHTML).to.equal('<div><span class="bar">text2</span></div>');
    });

    it("should modify elements and not replace when tag is not changed", function () {
      const root = document.createElement("div");
      render(
        <div>
          <button class="foo">text</button>
        </div>,
        root,
      );
      const button = root.querySelector("button");
      render(
        <div>
          <button class="bar">text2</button>
        </div>,
        root,
      );

      expect(root.querySelector("button")).to.equal(button);
    });

    it("should add new child element", function () {
      const root = document.createElement("div");
      render(
        <div>
          <button class="foo">text</button>
        </div>,
        root,
      );
      const button = root.querySelector("button");
      // second render
      render(
        <div>
          <button class="bar">text</button>
          <button class="bam">text2</button>
        </div>,
        root,
      );

      expect(root.querySelectorAll("button").length).to.equal(2);
      expect(root.querySelectorAll("button")[0]).to.equal(button);
    });

    it("should remove obsolete child element", function () {
      const root = document.createElement("div");
      render(
        <div>
          <button class="foo">text</button>
          <button class="bam">text2</button>
        </div>,
        root,
      );
      const button = root.querySelector("button");
      // second render
      render(
        <div>
          <button class="bar">text</button>
        </div>,
        root,
      );

      expect(root.querySelectorAll("button").length).to.equal(1);
      expect(root.querySelectorAll("button")[0]).to.equal(button);
    });

    it("should replace child element when tag has changed (first item)", function () {
      const root = document.createElement("div");
      render(
        <div>
          <button class="foo">text</button>
          <button class="bar">text</button>
        </div>,
        root,
      );
      // second render
      render(
        <div>
          <span class="foo">text</span>
          <button class="bam">text</button>
        </div>,
        root,
      );

      expect(root.innerHTML).to.equal('<div><span class="foo">text</span><button class="bam">text</button></div>');
    });

    it("should replace child element when tag has changed (last item)", function () {
      const root = document.createElement("div");
      render(
        <div>
          <button class="foo">text</button>
          <button class="bar">text</button>
        </div>,
        root,
      );
      // second render
      render(
        <div>
          <button class="bam">text</button>
          <span class="foo">text</span>
        </div>,
        root,
      );

      expect(root.innerHTML).to.equal('<div><button class="bam">text</button><span class="foo">text</span></div>');
    });

    it("should replace child element when child has changed from null", function () {
      const root = document.createElement("div");
      render(
        <div>
          {null}
          <button class="bar">text</button>
        </div>,
        root,
      );

      const button = root.querySelector("button");
      // second render
      render(
        <div>
          <span class="foo">text</span>
          <button class="bam">text</button>
        </div>,
        root,
      );

      expect(root.innerHTML).to.equal('<div><span class="foo">text</span><button class="bam">text</button></div>');

      // should not replace it
      expect(root.querySelector("button")).to.equal(button);
    });

    it("should re-render HTMLElement in jsx correctly", function () {
      const root = document.createElement("div");
      const button = document.createElement("button");
      button.innerHTML = "<span>text</span>";
      render(<div>{button}</div>, root);
      render(<div>{button}</div>, root);

      expect(root.innerHTML).to.equal("<div><button><span>text</span></button></div>");
      expect(root.querySelector("button")).to.equal(button);
    });

    it("should re-render function components correctly", function () {
      const root = document.createElement("div");
      function Comp({ name }: { name: string }) {
        return (
          <div>
            <span label={name}>component</span>
          </div>
        );
      }

      render(
        <div>
          <Comp name="foo" />
        </div>,
        root,
      );

      const innerSpan = root.querySelector("span");

      render(
        <div>
          <Comp name="bar" />
        </div>,
        root,
      );

      expect(root.querySelector("span")).to.equal(innerSpan);
    });

    // should set the value as property and not attribute (defaultValue)
    it("should re-render input's value property correctly", function () {
      const root = document.createElement("div");

      render(
        <div>
          <input value="first" />
        </div>,
        root,
      );

      render(
        <div>
          <input value="second" />
        </div>,
        root,
      );

      expect(root.querySelector("input")!.value).to.equal("second");
    });

    it("should update event listener", function () {
      const noop = function nop() {};
      const spy1 = chai.spy(noop);
      const spy2 = chai.spy(noop);

      const root = document.createElement("div");

      render(<button on-click={spy1}>text</button>, root);
      render(<button on-click={spy2}>text</button>, root);

      // trigger click
      root.querySelector("button")!.click();

      expect(spy1).to.not.have.been.called();
      expect(spy2).to.have.been.called();
    });

    // second render use child of render 1
  });

  describe("Suspense", function () {
    it("should render placeholder wile promise is pending", function () {
      const root = document.createElement("div");
      const promise = new Promise(() => {});

      render(<Suspense placeholder={<p>Loading...</p>} promise={promise} template={() => <div>results</div>} />, root);

      expect(root.innerHTML).to.equal("<p>Loading...</p>");
    });

    it("should re-render placeholder when promise is still pending", function () {
      const root = document.createElement("div");
      const promise = new Promise(() => {});

      render(<Suspense placeholder={<p>Loading...</p>} promise={promise} template={() => <div>results</div>} />, root);

      const p = root.querySelector("p");

      const promise2 = new Promise(() => {});

      render(
        <Suspense placeholder={<p>Still loading...</p>} promise={promise2} template={() => <div>results</div>} />,
        root,
      );

      expect(root.innerHTML).to.equal("<p>Still loading...</p>");
      expect(root.querySelector("p")).to.equal(p);
    });

    it("should render template when promise is resolved", async function () {
      const root = document.createElement("div");
      const promise = Promise.resolve({ name: "NAME" });

      render(
        <Suspense
          placeholder={<p>Loading...</p>}
          promise={promise}
          template={({ name }: { name: string }) => <div>{name}</div>}
        />,
        root,
      );

      await promise;

      expect(root.innerHTML).to.equal("<div>NAME</div>");
    });

    it("should not-replace result with placeholder when same promise is used", async function () {
      const root = document.createElement("div");
      const promise = Promise.resolve({ name: "NAME" });

      render(<Suspense placeholder={<p>Loading...</p>} promise={promise} template={() => <div>results</div>} />, root);

      await promise;

      render(
        <Suspense
          placeholder={<p>Still loading...</p>}
          promise={promise}
          template={({ name }: { name: string }) => <div>{name}</div>}
        />,
        root,
      );

      // internally it uses `then` to get the value for render
      await promise;

      expect(root.innerHTML).to.equal("<div>NAME</div>");
    });

    it("should replace result with placeholder when re-rendering with new promise", async function () {
      const root = document.createElement("div");
      const promise = Promise.resolve();

      render(
        <Suspense placeholder={<p>Loading...</p>} promise={promise} template={() => <div>results 1</div>} />,
        root,
      );

      await promise;

      const promise2 = new Promise(() => {});

      render(
        <Suspense placeholder={<p>Still loading...</p>} promise={promise2} template={() => <div>results 2</div>} />,
        root,
      );

      expect(root.innerHTML).to.equal("<p>Still loading...</p>");
    });
  });
});
