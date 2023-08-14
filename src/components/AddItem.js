import { useContext, useRef, useState } from "react";
import Item from "../Context/Item";
import CartContext from "../Context/CartContext";

const AddItem = ({showCart}) => {
  const ItemCtx = useContext(Item);
  const {
    item: { addItem },
  } = ItemCtx;
  const cartCtx=useContext(CartContext)
  const {cart:{cartItem}}=cartCtx
  const nameRef = useRef();
  const descRef = useRef();
  const priceRef = useRef();
  const [size, setSize] = useState();
  const checkBoxHandler = (e) => {
    setSize(e.target.value);
  };
  const formHandler = (e) => {
    e.preventDefault();
    const item = {
      name: nameRef.current.value,
      desc: descRef.current.value,
      price: priceRef.current.value,
      sizes: {
        l: size==='l'?1:0,
        m: size==='m'?1:0,
        s: size==='s'?1:0
      }
    };
    
    addItem(item);
  };
  const showCartHandler=()=>{
    showCart()
  }
  
  let total=0
  if(cartItem.length>0){
    for(let cart of cartItem)
    {total+=Object.values(cart.sizes).reduce((acc,curr)=>acc+Number(curr),0)}
  }
  
  return (
    <>
     <form>
      <label>Show Name</label>
      <input type="text" ref={nameRef} />
      <label>Description</label>
      <input type="text" ref={descRef} />
      <label>price</label>
      <input type="number" ref={priceRef} />
      <label>L</label>
      <input
        type="checkbox"
        value="l"
        onChange={checkBoxHandler}
        checked={size==='l'}
      />
      <label>M</label>
      <input
        type="checkbox"
        value="m"
        onChange={checkBoxHandler}
        checked={size==='m'}
      />
      <label>S</label>
      <input
        type="checkbox"
        value="s"
        onChange={checkBoxHandler}
        checked={size==='s'}
      />
      <button type="submit" onClick={formHandler}>
        Add
      </button>
    </form>
    <button onClick={showCartHandler}>Cart--{total}</button>
    </>
   
  );
};

export default AddItem;
