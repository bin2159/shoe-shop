import { useContext } from "react";
import Item from "../Context/Item";

import CartContext from "../Context/CartContext";


const ListItem = () => {
  const itemCtx = useContext(Item);
  const {
    item: { items,removeItem },
  } = itemCtx;
  const cartCtx=useContext(CartContext)
  const {cart:{addCart}}=cartCtx
  const cartHandler=(e,name)=>{
    removeItem(e,name)
    addCart(e,name)
  }
  

  return (
    <div>
      <ul>
        {items &&
          items.map((item) => (
            <li key={item.name}>
              {item.name}-----{item.desc}-----{item.price}
              ------L=<button disabled={item.sizes.l===0} onClick={()=>cartHandler('l',item.name)}>{item.sizes.l}</button>
              ------M=<button disabled={item.sizes.m===0} onClick={()=>cartHandler('m',item.name)}>{item.sizes.m}</button>
              ------S=<button disabled={item.sizes.s===0} onClick={()=>cartHandler('s',item.name)}>{item.sizes.s}</button>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default ListItem;
