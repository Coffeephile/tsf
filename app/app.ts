declare var require: any;
let {patch, diff, h, create} = require("virtual-dom");
import * as _ from "ramda";
// let {div, button, span} = require("hyperscript-helpers")(h);

interface Clickable<Action> {
  onclick(a: Action): void
}

interface PartialElement<Action> {
  tag?: string;
  _attributes?: {[key: string]: string};
  _childern?: TSElement<Action>[];
  _listeners?: Map<string, Action[]>;
}
class TSElement<Action> {
  constructor(
    private tag?: string,
    private _attributes: {[key: string]: string} = {},
    private _children: TSElement<Action>[] = [],
    private _listeners: Map<string, Action[]> = new Map<string, Action[]>()){}
    
  children(__children: TSElement<Action>[]): TSElement<Action>{ 
    return this.__cloneWith((instance) => {
      instance._children = instance._children.concat(__children);
    })
  }
  
  attributes(__attributes: {[key: string]: string}): TSElement<Action> {
    return this.__cloneWith((instance) => {
      instance._attributes = Object.assign({}, __attributes, this._attributes)
    });
  }
  
  onclick(action: Action): TSElement<Action>{
    return this.__cloneWith((instance) => {
      instance._listeners["click"] =
        instance._listeners["click"].append(action);
    })
  }
  
  classes(_classes: string[]): TSElement<Action> {
    return this.__cloneWith((instance: TSElement<Action>) => {
      if(!instance._attributes["class"]){
        instance._attributes["class"] = "";
      }
      let instanceClasses = instance._attributes["class"];
      _classes.forEach((_class) => {
        if(instanceClasses.indexOf(_class) < 0){
          instanceClasses += " " + _class;
        }
      });
    })
  }
  
  private __cloneWith(updater: (element: TSElement<Action>) => void):
    TSElement<Action>{
    let newElement: TSElement<Action> = new TSElement<Action>(
      this.tag,
      this._attributes,
      this._children,
      this._listeners
    )
    updater(newElement);
    return Object.freeze(newElement);
  }
  
  public toHTMLElement(): HTMLElement{
    let elem = document.createElement(this.tag);
    for(let key of Object.keys(this._attributes)){
      elem.attributes[key] = this._attributes[key];
    }
    this._children.forEach(child => {
      elem.appendChild(child.toHTMLElement())
    })
    return elem;
  }
  
  public toVDom() {
    let elem = h(this.tag, this._attributes, 
      this._children.map(child => child.toVDom()));
    return elem;
  }
}

function createSelectorString (classes: string[], id: string = ""){
  return `#${id} ` + classes.reduce((a, b) => a + " ." + b)
}

function selectorStringToAttributes (
    selectorString: string): {[key: string]: string}{
  let classes = selectorString.split(" ")
    .filter(s => s.startsWith("."))
    .filter(s => s.length > 0)
    .map(s => s.substr(1))
    .reduce((c1, c2) => c1 + " " + c2, "");
  let ids = selectorString.split(" ")
    .filter(s => s.startsWith("#"))
    .map(s => s.substr(1));
  let id = ids[0] || "";
  return {
    id: undefined,
    class: classes
  }
}



function div<Action>(selectorString?: string): TSElement<Action> {
  return (new TSElement<Action>("div"))
    .attributes(selectorStringToAttributes(selectorString || ""));
}
// console.log(div<IAction>().toHTMLElement())
document.body.appendChild(
  (div("#app .class").children([
    div(),
    div()
  ]).toHTMLElement())
);
interface UI<State, Action> {
  (State): TSElement<Action>
}

interface IAction {
  type: string
};
interface IState {
  count: number
}
// let ui: UI<IState, IAction> = function(state: IState) {
//   return div()
// }

