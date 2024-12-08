import { Children, createContext, useState } from "react";

const CartContext = createContext({});

const CartContextProvider = ({ children }) => {
  const [cartProducts, setCartProducts] = useState([]);

  return (
    <CartContext.Provider value={{ cartProducts }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;
