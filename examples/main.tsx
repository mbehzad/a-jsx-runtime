import { render, rawHtml, Suspense, createRef } from "../jsx/jsx-runtime";

const $ssrElement = document.querySelector("#server-side-rendered-html")!;

type ResponseData = { items: Array<{ rte: string }> };

function Spinner() {
  return <p>Loading ...</p>;
}

new (class {
  _value = 0;
  get value() {
    return this._value;
  }
  set value(value) {
    this._value = value;
    this.render();
  }

  inputRef = createRef<HTMLInputElement>();
  dataFetch: Promise<Object>;

  constructor() {
    this.dataFetch = fetch("./mock.json").then(resp => resp.json());

    this.render();
  }

  render() {
    render(
      <div>
        {/* style as object or string */}
        <div style={{display: "grid", "grid-template-columns": "1fr 1fr 1fr", "grid-gap": "12px"}}>
          {/* event, value binding */}
          <button on-click={() => this.value--}>-</button>
          <input
            value={this.value}
            on-change={(e: InputEvent) => (this.value = parseFloat((e.currentTarget as HTMLInputElement).value))}
            type="number"
            ref={this.inputRef}
          />
          <button on-click={() => this.value++}>+</button>
        </div>

        {/* using ref to access the HTMLElement directly */}
        <p on-click={() => this.inputRef.current!.focus()} style="cursor: pointer">
          go to input field
        </p>

        {/* conditional render */}
        {this.value > 2 && <p>slow down! more than <b>2</b>?</p>}

        {/* pending request with placeholder markup */}
        <Suspense
          placeholder={<Spinner />}
          promise={this.dataFetch}
          template={(data: ResponseData) => (
            <>
              <p> results: </p>
              <ul>
                {data.items.map(item => (
                  <li>{rawHtml(item.rte)}</li>
                ))}
              </ul>
            </>
          )}
        />

        {$ssrElement}
      </div>,
      document.querySelector("#root") as HTMLElement,
    );
  }
})();
