import {div, span, button} from "./tsf/dom";
import {Store} from "./tsf/store";

const counter = (counterStore: Store<CounterState, CounterAction>) => {
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


type CounterState = number;
type CounterAction = string;
export {
  counter,
  counterReducer,
  CounterState,
  CounterAction,
}