const { JSDOM } = require("jsdom");

const chai = require("chai");
const spies = require("chai-spies");
chai.use(spies);

const { window } = new JSDOM("", { runScripts: "dangerously" });

global.window = window;
global.document = window.document;
window.console = global.console;

Object.keys(window).sort().forEach(property => {
  if (typeof global[property] === "undefined") {
    try {
      global[property] = window[property];
    } catch (err) {
      console.log("....", err)
    }
  }
});

global.Node = window.Node;
global.Text = window.Text;
global.Element = window.Element;
global.HTMLElement = window.HTMLElement;
global.SVGElement = window.SVGElement;
global.DocumentFragment = window.DocumentFragment;

global.navigator = {
  userAgent: "node.js",
};
