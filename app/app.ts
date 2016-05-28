import {div, button,span, text} from "./tsf/dom";

document.body.appendChild(
  div("#app .bold").$children([
    button("#decrement").$text("Decrement"),
    span("#count").$children([text("hello")]),
    button("#increment").$text("Increment")
  ]).toNode()
);