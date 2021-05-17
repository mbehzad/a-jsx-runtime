import { render, rawHtml, Suspense, createRef, JsxProps, Fragment, Slot } from "../jsx/jsx-runtime";

const $ssrElement = document.querySelector("#server-side-rendered-html")!;

type ResponseData = { items: Array<{ id: string, rte: string }> };

function Spinner() {
  return <p>Loading ...</p>;
}

function Dialog({ open = false, children }: JsxProps) {
  return (
    <div class="modal-dialog" hidden={!open} style="border: 1px solid; padding: 5px; 15px;">
      <div class="body">
        <Slot name="body" hostsChildren={children}>
          <p>default content</p>
        </Slot>
      </div>
      <footer>
        <Slot name="footer" hostsChildren={children} />
      </footer>
    </div>
  );
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
  dataFetch: Promise<ResponseData>;

  constructor() {
    this.dataFetch = fetch("./mock.json")
      .then(resp => resp.json())
      // simulate an additional 3sec network delay
      .then(json => new Promise(resolve => setTimeout(() => resolve(json), 3000)));

    this.render();
  }

  render() {
    render(
      <div>
        {/* style as object or string */}
        <div style={{ display: "grid", "grid-template-columns": "1fr 1fr 1fr", "grid-gap": "12px" }}>
          {/* event, value binding */}
          <button on-click={() => this.value--}>-</button>
          <input
            value={this.value}
            on-change={(e: InputEvent) => (this.value = parseFloat((e.currentTarget as HTMLInputElement).value))}
            type="number"
            _ref={this.inputRef}
          />
          <button on-click={() => this.value++}>+</button>
        </div>

        {/* using _ref to access the HTMLElement directly */}
        <p on-click={() => this.inputRef.current!.focus()} style="cursor: pointer">
          click here to go to the input field
        </p>

        {/* conditional render */}
        {this.value > 2 && (
          <p>
            slow down! more than <b>2</b>?
          </p>
        )}

        {/* pending request with placeholder markup */}
        <Suspense
          placeholder={<Spinner />}
          promise={this.dataFetch}
          template={(data: ResponseData) => (
            <>
              <p> results: </p>
              <ul>
                {data.items.map(item => (
                  <li _key={item.id}>{rawHtml(item.rte)}</li>
                ))}
              </ul>
            </>
          )}
        />

        {/* component with slots */}
        <Dialog open={true}>
          <Fragment _slot="body">
            <h3> Title </h3>
            <p> Description </p>
          </Fragment>
          <a _slot="footer" href="mailto:name@email.com">
            contact us
          </a>
        </Dialog>

        {$ssrElement}
      </div>,
      document.querySelector("#root") as HTMLElement,
    );
  }
})();
