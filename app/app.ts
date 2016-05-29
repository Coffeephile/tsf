import {div, button,span, input, TNode} from "./tsf/dom";
import {mount} from "./tsf/core";
import {createStore, Store} from "./tsf/store";
import {counter, counterStore, CounterStore} 
  from "./counter";

import {myForm, myFormStore, MyFormStore}
  from "./myForm";

let app = ({counterStore, myFormStore}): TNode => {
  return (
    div("#app .container .app").$children([
      myForm(myFormStore),
      counter(counterStore)
    ])
  );  
}

interface IStores {
  counterStore: CounterStore,
  myFormStore: MyFormStore
}

mount<IStores>(app, {
  counterStore, myFormStore
}, document.body)