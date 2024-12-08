import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext({});

const CartContextProvider = ({ children }) => {
  const ls = typeof window !== "undefined" ? window.localStorage : null;

  //if items are in the local storage fetch them from there
  const [cartProducts, setCartProducts] = useState([]);

  //------------------------------------------------------------------------------------------

  //so that items do not get lost when page gets refreshed
  useEffect(() => {
    if (cartProducts?.length > 0) {
      ls?.setItem("cart", JSON.stringify(cartProducts));
    }
  }, [cartProducts]);

  useEffect(() => {
    if (ls && ls.getItem("cart")) {
      setCartProducts(JSON.parse(ls.getItem("cart")));
    }
  }, []);

  //------------------------------------------------------------------------------------------

  function addProduct(productID) {
    setCartProducts((prev) => [...prev, productID]);
  }

  function removeProduct(productId) {
    setCartProducts((prev) => {
      const pos = prev.indexOf(productId);
      if (pos !== -1) {
        return prev.filter((value, index) => index !== pos);
      }
      return prev;
    });
  }
  function clearCart() {
    setCartProducts([]);
  }

  //------------------------------------------------------------------------------------------

  return (
    <CartContext.Provider
      value={{
        cartProducts,
        setCartProducts,
        addProduct,
        removeProduct,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;

export const useCart = () => useContext(CartContext);
