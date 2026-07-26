import React, { createContext, useReducer } from "react";
import { AxiosInstance } from "../utils/Axios";

export const CartContext = createContext();
const initialState = {
  shoppingCart: [],
  totalPrice: 0,
  qty: 0,
};

const reducer = (state, action) => {
  const { shoppingCart, qty, totalPrice } = state;
  console.log(state);

  let product;
  let index;
  let updatedPrice;
  let updatedQty;
  let filtered;
  let check;

  switch (action.type) {
    case "ADD_TO_CART":
      check = shoppingCart.find((cart) => cart.id === action.id);
      if (check) {
        return state;
      }
      product = action.product;
      product.qty = 1;
      updatedQty = qty + 1;
      updatedPrice = totalPrice + product.price;
      return {
        shoppingCart: [product, ...shoppingCart],
        totalPrice: updatedPrice,
        qty: updatedQty,
      };

    case "INCREMENT":
      product = shoppingCart.find((product) => product.id === action.id);
      index = shoppingCart.findIndex((prod) => prod.id === action.id);
      product.qty += 1;
      updatedPrice = totalPrice + product.price;
      updatedQty = qty + 1;
      shoppingCart[index] = product;
      return {
        shoppingCart: [...shoppingCart],
        totalPrice: updatedPrice,
        qty: updatedQty,
      };

    case "DECREMENT":
      product = shoppingCart.find((product) => product.id === action.id);
      index = shoppingCart.findIndex((prod) => prod.id === action.id);
      if (product.qty > 1) {
        product.qty -= 1;
        updatedPrice = totalPrice - product.price;
        updatedQty = qty - 1;
        shoppingCart[index] = product;
        return {
          shoppingCart: [...shoppingCart],
          totalPrice: updatedPrice,
          qty: updatedQty,
        };
      }
      return {
        shoppingCart: [...shoppingCart],
        totalPrice,
        qty,
      };

    case "DELETE_PRODUCT":
      console.log("I Am Delete");
      filtered = shoppingCart.filter((cart) => cart.id !== action.id);
      product = shoppingCart.find((cart) => cart.id === action.id);
      updatedPrice = totalPrice - product.price * product.qty;
      updatedQty = qty - product.qty;
      return {
        shoppingCart: [...filtered],
        totalPrice: updatedPrice,
        qty: updatedQty,
      };

    default:
      return state;
  }
};
export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const addToCart = (product) => async (dispatch) => {
    try {
      const response = await AxiosInstance.post("/carts/add", product);
      const addedProduct = response.data.product;
      addedProduct.qty = 1;
      dispatch({ type: "ADD_TO_CART", product: addedProduct });
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  const incrementCartItem = (id, quantity) => async (dispatch) => {
    try {
      const response = await AxiosInstance.put(`/carts/${id}`, {
        quantity: quantity + 1,
      });
      const updatedProduct = response.data.product;
      dispatch({ type: "INCREMENT", id, product: updatedProduct });
    } catch (error) {
      console.error("Error updating cart:", error);
    }
  };

  const decrementCartItem = (id, quantity) => async (dispatch) => {
    try {
      const response = await AxiosInstance.put(`/carts/${id}`, {
        quantity: quantity - 1,
      });
      const updatedProduct = response.data.product;
      dispatch({ type: "DECREMENT", id, product: updatedProduct });
    } catch (error) {
      console.error("Error updating cart:", error);
    }
  };

  const deleteCartItem = (id) => async (dispatch) => {
    try {
      await AxiosInstance.delete(`/carts/${id}`);
      dispatch({ type: "DELETE_PRODUCT", id });
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };
  return (
    <CartContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{
        ...state,
        addToCart,
        incrementCartItem,
        decrementCartItem,
        deleteCartItem,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
