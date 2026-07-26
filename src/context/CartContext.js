/* eslint-disable react/jsx-no-constructed-context-values */
import React, { createContext, useReducer, useContext, useEffect } from "react";
import { Reducer, initialState } from "./CartReducer";

const CartContext = createContext();

export const posState = () => {
  return useContext(CartContext);
};

const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, initialState);
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      dispatch({
        type: "LOAD_CART_FROM_STORAGE",
        payload: JSON.parse(savedCart),
      });
    }
  }, []);
  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
