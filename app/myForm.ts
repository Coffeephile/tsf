import {Store, createStore} from "./tsf/store";
import {div, input, span} from "./tsf/dom";

let myForm = (store: Store<MyFormState, MyFormAction>) => {
  return div("#myform").$children([
    input().
      $value(store.state).
      $on('keyup', (event) => {
        store.dispatch(event.target.value || "")
      }),
    span().$text(store.state).$style({
      color: "red"
    })])
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