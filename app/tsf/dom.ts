export {TNode};
import {h, create} from "virtual-dom";

interface ITNode{
  tag?: string;
  id?: string;
  classes?: string[];
  style?: {[k:string]:string};
  attributes?: {[k:string]: string};
  children?: TNode[];
  text?: string;
  value?: string;
  listeners?: {[k:string]: Function}
}


class TNode implements ITNode {
  public tag: string = null;
  public id: string = undefined;
  public classes: string[] = [];
  public style: {[k:string]:string} = {};
  public attributes: {[k:string]: string} = {};
  public children: TNode[] = [];
  public text: string = "";
  public value: string = "";
  public listeners: {[k:string]: Function} = {};
  
  constructor(other: ITNode){
    Object.assign(this, other);
    Object.freeze(this);
  }
  
  $classes(classes: string[]){
    return this.cloneWith({classes});
  }
  
  $id(id: string){
    return this.cloneWith({id});
  }
  
  $children(children: TNode[]){
    return this.cloneWith({children})
  }
  
  $text(text: string){
    return this.cloneWith({text});
  }
  
  $value(value: string){
    return this.cloneWith({value});
  }
  
  $attributes(attributes: {[k:string]:string}){
    return this.cloneWith({attributes})
  }
  
  $on(eventName: string, callback){
    let obj = {};
    obj[eventName] = callback;
    return this.cloneWith({
      listeners: Object.assign(obj, this.listeners)
    })
  }
  
  $style(style: {[k:string]:string}){
    return this.cloneWith({
      style: Object.assign({}, this.style, style)
    })
  }
  
  toNode(): Node {
    return create(this.toVNode());
  }
  
  toVNode() {
    let attrs = Object.assign(
      {
        id: this.id,
        style: this.style,
      }, this.attributes
    );
    if(this.value){
      attrs["value"] = this.value;
    }
    let listeners = {};
    for(let eventName of Object.keys(this.listeners)){
      listeners[`on${eventName}`] = this.listeners[eventName];
    }
    let vdom = h(
      this.tag + this.classes.reduce((previous, current) =>
          `.${current} ${previous}`,""),
      Object.assign(listeners, attrs),
      [this.text, ...this.children.map(c => c.toVNode())]);
    return vdom;
  }
  
  cloneWith(other: ITNode): TNode {
    return new TNode(Object.assign({}, this, other));
  }
  
}
function createSelectorString (classes: string[], id: string = ""){
  let classString = classes.reduce((a, b) => `.${a}${b}` , '')
  if(id.length){
    `#${id} ` + classString
  } else {
    return classString
  }
}

function selectorStringToAttributes (
    selectorString: string): {[key: string]: string}{
  let selectors = selectorString.split(" ");
  let classes = selectors
    .filter(s => s.startsWith("."))
    .filter(s => s.length > 0)
    .map(s => s.substr(1))
    .reduce((c1, c2) => c1 + " " + c2, "").substr(1);
  let ids = selectors
    .filter(s => s.startsWith("#"))
    .map(s => s.substr(1));
  
  let obj: {[key: string]: string} = {};
  if(ids.length){
    obj["id"] = ids[0]
  }
  if(classes.length){
    obj["class"] = classes;
  }
  return  obj;
}

const selectorsToClasses = (selectors: string[]): string[] => {
  return selectors
    .filter(s => s.startsWith("."))
    .map(s => s.substr(1))
    .filter(s => s.length > 0);
}

const selectorStringToId = (selectors: string[]) => {
  return selectors
    .filter(s => s.startsWith("#"))
    .map(s => s.substr(1))[0];
}

const createTag = (tag?: string) => {
  return  (selectorString: string = ""): TNode => {
    let selectors = selectorString.split(/\s+/);
    return (new TNode({tag: tag}))
      .$classes(selectorsToClasses(selectors))
      .$id(selectorStringToId(selectors));
  }
}

export const a = createTag('a')
export const abbr = createTag('abbr');
export const address = createTag('address');
export const area = createTag('area');
export const article = createTag('article');
export const aside = createTag('aside');
export const audio = createTag('audio');
export const b = createTag('b');
export const base = createTag('base');
export const bdi = createTag('bdi');
export const bdo = createTag('bdo');
export const blockquote = createTag('blockquote');
export const body = createTag('body');
export const br = createTag('br');
export const button = createTag('button');
export const canvas = createTag('canvas');
export const caption = createTag('caption');
export const cite = createTag('cite');
export const code = createTag('code');
export const col = createTag('col');
export const colgroup = createTag('colgroup');
export const dd = createTag('dd');
export const del = createTag('del');
export const dfn = createTag('dfn');
export const dir = createTag('dir');
export const div = createTag('div');
export const dl = createTag('dl');
export const dt = createTag('dt');
export const em = createTag('em');
export const embed = createTag('embed');
export const fieldset = createTag('fieldset');
export const figcaption = createTag('figcaption');
export const figure = createTag('figure');
export const footer = createTag('footer');
export const form = createTag('form');
export const h1 = createTag('h1');
export const h2 = createTag('h2');
export const h3 = createTag('h3');
export const h4 = createTag('h4');
export const h5 = createTag('h5');
export const h6 = createTag('h6');
export const head = createTag('head');
export const header = createTag('header');
export const hgroup = createTag('hgroup');
export const hr = createTag('hr');
export const html = createTag('html');
export const i = createTag('i');
export const iframe = createTag('iframe');
export const img = createTag('img');
export const input = createTag('input');
export const ins = createTag('ins');
export const kbd = createTag('kbd');
export const keygen = createTag('keygen');
export const label = createTag('label');
export const legend = createTag('legend');
export const li = createTag('li');
export const link = createTag('link');
export const main = createTag('main');
export const map = createTag('map');
export const mark = createTag('mark');
export const menu = createTag('menu');
export const meta = createTag('meta');
export const nav = createTag('nav');
export const noscript = createTag('noscript');
export const object = createTag('object');
export const ol = createTag('ol');
export const optgroup = createTag('optgroup');
export const option = createTag('option');
export const p = createTag('p');
export const param = createTag('param');
export const pre = createTag('pre');
export const q = createTag('q');
export const rp = createTag('rp');
export const rt = createTag('rt');
export const ruby = createTag('ruby');
export const s = createTag('s');
export const samp = createTag('samp');
export const script = createTag('script');
export const section = createTag('section');
export const select = createTag('select');
export const small = createTag('small');
export const source = createTag('source');
export const span = createTag('span');
export const strong = createTag('strong');
export const style = createTag('style');
export const sub = createTag('sub');
export const sup = createTag('sup');
export const table = createTag('table');
export const tbody = createTag('tbody');
export const td = createTag('td');
export const textarea = createTag('textarea');
export const tfoot = createTag('tfoot');
export const th = createTag('th');
export const thead = createTag('thead');
export const title = createTag('title');
export const tr = createTag('tr');
export const u = createTag('u');
export const ul = createTag('ul');
export const video = createTag('video');
export const progress = createTag('progress');