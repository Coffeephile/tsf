export {TSElement};
class TSElement<Action> {
  private text: string;
  constructor(
    private tag?: string,
    private attributes: {[key: string]: string} = {},
    private children: TSElement<Action>[] = [],
    private listeners: Map<string, Action[]> = new Map<string, Action[]>()){}
    
  $children(__children: TSElement<Action>[]): TSElement<Action>{ 
    return this.__cloneWith((instance) => {
      instance.children = instance.children.concat(__children);
    })
  }
  
  $attributes(__attributes: {[key: string]: string}): TSElement<Action> {
    return this.__cloneWith((instance) => {
      instance.attributes = Object.assign({}, __attributes, this.attributes)
    });
  }
  
  $text(__text: string){
    return this.__cloneWith((instance) => {
      instance.text = __text;
    })
  }
  
  $onclick(action: Action): TSElement<Action>{
    return this.__cloneWith((instance) => {
      instance.listeners["click"] =
        instance.listeners["click"].append(action);
    })
  }
  
  $classes(_classes: string[]): TSElement<Action> {
    return this.__cloneWith((instance: TSElement<Action>) => {
      if(!instance.attributes["class"]){
        instance.attributes["class"] = "";
      }
      let instanceClasses = instance.attributes["class"];
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
      this.attributes,
      this.children,
      this.listeners
    )
    updater(newElement);
    return Object.freeze(newElement);
  }
  
  public toNode(): Node {
    if(!this.tag){
      return document.createTextNode(this.text);
    }
    let elem = document.createElement(this.tag);    
    if(this.text){
      elem.innerText = this.text;
    }
    for(let key of Object.keys(this.attributes)){
      elem.setAttribute(key, this.attributes[key]);
    }
    this.children.forEach(child => {
      elem.appendChild(child.toNode());
    })
    return elem;
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


const createTag = <Action>(tag?: string) => {
  return  <Action>(selectorString: string = ""): TSElement<Action> => {
    return (new TSElement<Action>(tag))
      .$attributes(selectorStringToAttributes(selectorString));
  }
}

export const text = function<Action>(text: string){
  return (new TSElement<Action>().$text(text))
};

export const a = createTag('a');
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