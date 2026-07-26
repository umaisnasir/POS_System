/* eslint-disable no-fallthrough */
export const initialState = {
  cart: [],
};

export const Reducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      // eslint-disable-next-line no-case-declarations
      const check = state.cart.find((i) => i.id === action.payload.id);
      if (check) {
        return {
          ...state,
          cart: state.cart.map((i) => (i.id === action.payload.id ? {
            ...i,
            qty: i.qty + 1,
          } : i))
        };
      }
      return {
        ...state,
        cart: [...state.cart, { ...action.payload, qty: 1 }]
      };
    case "INCREMENT_QUANTITY":
      return {
        ...state,
        cart: state.cart.map((item) =>
          (item.id === action.payload.id
            ? { ...item, qty: item.qty + 1 }
            : item)
        ),
      };
    case "DECREMENT_QUANTITY":
      return {
        ...state,
        cart: state.cart.map((item) =>
          (item.id === action.payload.id && item.qty > 1
            ? { ...item, qty: item.qty - 1 }
            : item)
        ),
      };

    case "DELETE_PRODUCT":
      // Remove the deleted product from localStorage
      // eslint-disable-next-line no-case-declarations
      const updatedCart = state.cart.filter((item) => item.id !== action.payload.id);
      localStorage.setItem("cart", JSON.stringify(updatedCart));

      // Update the state to remove the deleted product from the cart
      return {
        ...state,
        cart: updatedCart,
      };
    case "LOAD_CART_FROM_STORAGE":
      return {
        ...state,
        cart: action.payload,
      };
    case "RESET_CART":
      return { ...state, cart: [] }; // Reset cart to an empty array
    default:
      return state;
  }
};
