import React, { createContext, useEffect, useState } from "react";

const Item = createContext();

export default Item;

export const ItemProvider = ({ children }) => {
  let newItemList;
  const [cartId, setCartId] = useState("");
  const [itemList, setItemList] = useState([]);
  useEffect(()=>{
    const getData=async()=>{
      try{
          const response=await fetch(`https://shoe-cart-cd804-default-rtdb.firebaseio.com/products.json/`)
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
  

  const addItemHandler = (item) => {
    setItemList((prev) => {
      const duplicateIndex = prev.findIndex(
        (prevItem) => prevItem.name === item.name
      );

      if (duplicateIndex !== -1) {
        const updatedItem = {
          ...prev[duplicateIndex],
          sizes: {
            l: prev[duplicateIndex].sizes.l?prev[duplicateIndex].sizes.l:0 + item.sizes.l,
            m: prev[duplicateIndex].sizes.m?prev[duplicateIndex].sizes.m:0 + item.sizes.m,
            s: prev[duplicateIndex].sizes.s?prev[duplicateIndex].sizes.s:0 + item.sizes.s,
          },
        };
        newItemList = [...prev];
        newItemList[duplicateIndex] = updatedItem;
      } else {
        const newItem = { ...item };
        newItemList = [...prev, newItem];
      }

      return newItemList;
    });
  };
  useEffect(() => {
    const postData = async () => {
      try {
        const response = await fetch(
          "https://shoe-cart-cd804-default-rtdb.firebaseio.com/products.json",
          {
            method: "POST",
            body: JSON.stringify(itemList),
            headers: { "Content-Type": "application/json" },
          }
        );
        const data = await response.json();
        setCartId(data)
      } catch (err) {
        console.log(err);
      }
    };
    postData()
  },[itemList]);
  const removeItemHandler = (e, name) => {
    setItemList((prev) => {
      const duplicateIndex = prev.findIndex(
        (prevItem) => prevItem.name === name
      );
      let newItemList;
      console.log(prev[duplicateIndex]);
      const updatedItem = {
        ...prev[duplicateIndex],
        sizes: {
          ...prev[duplicateIndex].sizes,
          [e]:
            prev[duplicateIndex].sizes[e] - 1 > 0
              ? prev[duplicateIndex].sizes[e] - 1
              : 0,
        },
      };
      newItemList = [...prev];
      newItemList[duplicateIndex] = updatedItem;
      return newItemList;
    });
  };
  const item = {
    items: itemList,
    addItem: addItemHandler,
    removeItem: removeItemHandler,
  };

  return <Item.Provider value={{ item }}>{children}</Item.Provider>;
};
