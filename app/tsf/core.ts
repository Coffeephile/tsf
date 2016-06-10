import {Store} from "./store";
import {create, diff, patch, VNode} from "virtual-dom";

export const mount = <Stores>(
  render: (any) => VNode,
  stores: Stores,
  element: HTMLElement) => {
  element.innerHTML = "";
  let tree = render(stores);
  let rootNode = create(tree);
  element.appendChild(rootNode);
  
  for(let storeName of Object.keys(stores)){
    stores[storeName].subscribe(() => {
      let newTree = render(stores);
      let patches = diff(tree, newTree);
      rootNode    = patch(rootNode, patches);
      tree        =  newTree;
    })
  }
}