import {div, button,span, input, TNode} from "./tsf/dom";
import {create} from "virtual-dom";

type IAction = string;
type IState = {
  count: number;
  name: string;
};

let app = (state: IState): TNode<any> => {
  return (
    div("#counter .container .app").$children([
      input().$value(state.name),
      div().$children([
        button().$text("Decrement")
          .$on("click", "decrement"),
        span().$text(state.count.toString()),
        button().$text("Increment")
          .$on("click", "incrememnt")  
      ])      
    ]));  
}

document.body.appendChild(
  create(app({count: 0, name: "asdf"}).toVNode())
);