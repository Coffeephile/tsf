import {div, button,span, input, TNode} from "./tsf/dom";
import {mount} from "./tsf/core";
import {createStore, Store} from "./tsf/store";
import {counter, CounterState, CounterAction, counterReducer} 
  from "./counter";

import {myForm, MyFormAction, MyFormState, myFormReducer}
  from "./myForm";

let app = ({counterStore, myFormStore}): TNode => {
  return (
    div("#app .container .app").$children([
      myForm(myFormStore),
      counter(counterStore)
    ])
  );  
}


mount(app, {
  counterStore: createStore<CounterState, CounterAction>(0, counterReducer),
  myFormStore: createStore<MyFormState, MyFormAction>({name: ""}, myFormReducer)
}, document.body)