import { useContext } from "react"
import Modal from "./Modal"
import CartContext from "../Context/CartContext"

const Cart = ({showCartHandler}) => {
    const cartCtx=useContext(CartContext)
    const {cart:{cartItem,totalPrice}}=cartCtx

    return (
    <Modal showCart={showCartHandler}>
        <ul>
            {cartItem.map(item=>(<li key={item.name}>{item.name}-----{item.desc}-----{item.price}-----L={item.sizes.l?item.sizes.l:0}-----M={item.sizes.m?item.sizes.m:0}------S={item.sizes.s?item.sizes.s:0}</li>))}
        </ul>
        <div>Total:{totalPrice}</div>
    </Modal>
  )
}

export default Cart