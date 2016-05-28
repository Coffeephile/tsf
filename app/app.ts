declare var require: any;
let {patch, diff, h, create} = require("virtual-dom");
let {div, button, span} = require("hyperscript-helpers")(h);

function mount<S, A>(
  render: (S, dispatch: ((action: A) => any)) => any,
  reducer: (S, A) => S,
  state: S,
  element: HTMLElement
  ){
  let currentState = state;
  
  let tree = render(state, dispatcher)
  let rootNode: Node = create(tree);
  element.appendChild(rootNode);
  
  function dispatcher(action: A) {
    console.log("Action<" + action + "> dispatched");
    // console.log(tree, rootNode);
    currentState = reducer(currentState, action);
    let newTree = render(currentState, dispatcher);
    let patches = diff(tree, newTree);
    
    rootNode = patch(rootNode, patches);
    tree = newTree;
  }
}

interface IState {
  count: number
};

let app = (state: IState, dispatch) => {
  return div("#counter", [
    button({onclick: () => dispatch("INCREMENT")}, "Increment"),
    span([state.count]),
    button({onclick: () => dispatch("DECREMENT")}, "Decrement")
  ])
};

let reducer = (state: IState, action: string) => {
  switch(action){
    case("INCREMENT"):
      return {count: state.count + 1};
    case("DECREMENT"):
      return {count: state.count - 1};
  }
}

mount<IState, string>(app, reducer, {count: 0}, document.body);

let navbar = () => {
  let attrs = {
    "style" : `
      width: 100%;
      height: 4em;
      background-color: #eeeeee;
      padding-left: 1em;
    `
  }
  return div("#navbar", attrs, [
    span({
      "style": `
        font-size: 34pt;
        color: #444
      `
    }, "Journal")
  ])
}