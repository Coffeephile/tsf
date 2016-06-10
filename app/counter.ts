import {h} from "virtual-dom";
import {Store, createStore} from "./tsf/store";

type CounterState = number;
type CounterAction = string;
type CounterStore = Store<CounterState, CounterAction>;

const counter = (counterStore: CounterStore) => {
  let count = counterStore.state;
  return h("div#counter", [
    h("button",{
      onclick: () => counterStore.dispatch("decrement")
    }, "Decrement"),
    h("span", count.toString()),
    h("button", {
      onclick: () => counterStore.dispatch("increment")
    }, "Increment")
  ])
}

const counterReducer = 
  (state: CounterState, action: CounterAction): CounterState => {
  if(action === "increment"){
    return state + 1
  } else if(action === "decrement"){
    return state - 1
  }
  return state;
}
let counterStore = createStore<CounterState, CounterAction>
  (0, counterReducer);
  
export {
  counter,
  CounterStore,
  counterStore
}