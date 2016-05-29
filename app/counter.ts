import {div, span, button} from "./tsf/dom";
import {Store, createStore} from "./tsf/store";

type CounterState = number;
type CounterAction = string;
type CounterStore = Store<CounterState, CounterAction>;

const counter = (counterStore: CounterStore) => {
  let count = counterStore.state;
  return div("#counter").$children([
    button().$text("Decrement").
      $on('click', () => counterStore.dispatch("decrement")),
    span().$text(count.toString()),
    button().$text("Increment").
      $on('click', () => counterStore.dispatch("increment"))
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