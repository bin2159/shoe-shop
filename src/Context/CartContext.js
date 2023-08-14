import React, { createContext, useContext, useEffect, useState } from 'react'
import Item from './Item'

const CartContext = createContext()

export default CartContext

export const CartProvider=({children})=>{
    const [itemList,setItemList]=useState([])
    const [totalAmount,setTotalAmount]=useState(0)
    const itemCtx=useContext(Item)
    useEffect(()=>{
        const getData=async()=>{
          try{
              const response=await fetch(`https://shoe-cart-cd804-default-rtdb.firebaseio.com/carts.json/`)
              const data=await response.json()
              const lastCart=Object.keys(data).pop()
              setItemList(data[lastCart])
          }
          catch(err){
              console.log(err)
          }
      }
      getData()
      },[])
      useEffect(() => {
        const postData = async () => {
          try {
            const response = await fetch(
              "https://shoe-cart-cd804-default-rtdb.firebaseio.com/carts.json",
              {
                method: "POST",
                body: JSON.stringify(itemList),
                headers: { "Content-Type": "application/json" },
              }
            );
            const data = await response.json();
          } catch (err) {
            console.log(err);
          }
        };
        postData()
      },[itemList]);
    
    const {item:{items}}=itemCtx
    const addCartHandler=(e,name)=>{
        setItemList(prev=>{
            const duplicateIndex=prev.findIndex(prevItem=>prevItem.name===name)
            let newItemList
            if(duplicateIndex!==-1){
                const updatedItem={...prev[duplicateIndex],sizes:{...prev[duplicateIndex].sizes,[e]:(prev[duplicateIndex].sizes[e]?prev[duplicateIndex].sizes[e]:0)+1}}
                newItemList=[...prev]
                newItemList[duplicateIndex]=updatedItem
            }
            else{
                const item=items.find(item=>item.name===name)
                newItemList=[...prev,{...item,sizes:{[e]:1}}]
            }
            console.log(newItemList)
            return newItemList
        })
    }
    useEffect(()=>{
        let total=0
        for(let cart of itemList){
            total+=cart.price*Object.values(cart.sizes).reduce((acc,cur)=>acc+Number(cur),0)
        }
        setTotalAmount(total)
    },[itemList])

    const cart={
        cartItem:itemList,
        addCart:addCartHandler,
        totalPrice:totalAmount,
    }
    return <CartContext.Provider value={{cart}}>{children}</CartContext.Provider>
}