import {Store} from "./tsf/store";
import {div, input, span} from "./tsf/dom";

let myForm = (store: Store<MyFormState, MyFormAction>) => {
  return div("#myform").$children([
    input().
      $value(store.state.name).
      $on('keyup', (event) => {
        store.dispatch({name: event.target.value || ""})
      }),
    span().$text(store.state.name).$style({
      color: "red"
    })])
}
interface MyFormState {
  name: string
}
interface MyFormAction {
  name: string
}
const myFormReducer = 
  (state: MyFormState, action: MyFormAction): MyFormState => {
    return action
  }
export {
  MyFormAction, MyFormState, myFormReducer, myForm
}