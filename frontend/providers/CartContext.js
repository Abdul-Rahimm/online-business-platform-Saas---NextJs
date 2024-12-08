import { createContext, useContext, useState } from "react";

const CartContext = createContext({});

const CartContextProvider = ({ children }) => {
  const [cartProducts, setCartProducts] = useState([]);

  return (
    <CartContext.Provider value={{ cartProducts, setCartProducts }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;

export const useCart = () => useContext(CartContext);
