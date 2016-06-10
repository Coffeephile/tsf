import {Store, createStore} from "./tsf/store";
import {h} from "virtual-dom";


let myForm = (store: Store<MyFormState, MyFormAction>) => {
  return h("div#myform", [
    h("input", {
      onkeyup: (event) => {
        store.dispatch(event.target.value || "")
      }
    }, store.state),
    h("span", store.state)
  ]);
}
type MyFormState = string;
type MyFormAction = string;

const myFormReducer = 
  (state: MyFormState, action: MyFormAction): MyFormState => {
    return action
  }
type MyFormStore = Store<MyFormState, MyFormAction>
let myFormStore = createStore<MyFormState, MyFormAction>("", myFormReducer); 
export {
  myForm, myFormStore, MyFormStore
}