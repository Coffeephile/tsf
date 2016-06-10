import {mount} from "./tsf/core";
import {createStore, Store} from "./tsf/store";
import {h, VNode} from "virtual-dom";
import {counter, counterStore, CounterStore} 
  from "./counter";

import {myForm, myFormStore, MyFormStore}
  from "./myForm";

let app = ({counterStore, myFormStore}: IStores): VNode => {
  return (
    h("div#app.container.app", [
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