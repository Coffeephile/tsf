import {TNode} from "./dom"
import {Store} from "./store";
import {create, diff, patch} from "virtual-dom";

export const mount = <Stores>(
  render: (any) => TNode,
  stores: Stores,
  element: HTMLElement) => {
  element.innerHTML = "";
  let tree = render(stores).toVNode();
  let rootNode = create(tree);
  element.appendChild(rootNode);
  
  for(let storeName of Object.keys(stores)){
    stores[storeName].subscribe(() => {
      let newTree = render(stores).toVNode();
      let patches = diff(tree, newTree);
      rootNode    = patch(rootNode, patches);
      tree        =  newTree;
    })
  }
}