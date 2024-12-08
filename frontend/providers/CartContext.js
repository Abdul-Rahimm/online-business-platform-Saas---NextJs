import { createContext, useContext, useState } from "react";

const CartContext = createContext({});

const CartContextProvider = ({ children }) => {
  const [cartProducts, setCartProducts] = useState([]);

  function addProduct(productID) {
    setCartProducts((prev) => [...prev, productID]);
  }

  return (
    <CartContext.Provider value={{ cartProducts, setCartProducts, addProduct }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;

export const useCart = () => useContext(CartContext);
