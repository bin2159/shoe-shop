import { useState } from "react";
import { ItemProvider } from "./Context/Item";
import AddItem from "./components/AddItem";
import ListItem from "./components/ListItem";
import Cart from "./components/Cart";
import { CartProvider } from "./Context/CartContext";

function App() {
  const [showCart, setShowCart] = useState(false);
  const showCartHandler = () => {
    setShowCart((prev) => !prev);
  };
  return (
    <ItemProvider>
      <CartProvider>
        <AddItem showCart={showCartHandler} />
        <ListItem />
        {showCart && <Cart showCartHandler={showCartHandler} />}
      </CartProvider>
    </ItemProvider>
  );
}

export default App;
