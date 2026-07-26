import React, { useContext } from "react";
import { CloseCircleOutlined, ShoppingOutlined } from "@ant-design/icons";
import { PiShoppingCartSimpleThin } from "react-icons/pi";
import { posState } from "../../context/CartContext";

const CartItem = () => {
  const { state, dispatch } = posState();
  console.log("🚀 ~ CartItem ~ state:", state);
  const handleIncrement = (item) => {
    dispatch({ type: "INCREMENT_QUANTITY", payload: item });
  };

  const handleDecrement = (item) => {
    dispatch({ type: "DECREMENT_QUANTITY", payload: item });
  };
  return (
    <>
      {state?.cart?.map((item) => (
        <div className="cart__item" key={item.id}>
          <div className="delete__icon">
            <CloseCircleOutlined onClick={() => dispatch({
              type: "DELETE_PRODUCT",
              payload: item,
            })}
            />
          </div>
          <div className="counter__area">
            <button
              className="plus"
              type="button"
              onClick={() => handleIncrement(item)}
            >
              +
            </button>
            <span>{item.qty} </span>
            <button
              className="minus"
              type="button"
              onClick={() => handleDecrement(item)}
            >
              -
            </button>
          </div>
          <div className="cart__info">
            <div className="cart__title">{item.title}</div>
            <div className="cart__quantity"> {item.qty}X 1 Item</div>
          </div>
          <div className=" main__price">
            {new Intl.NumberFormat("en", { style: "currency", currency: "USD" }).format(item.price * item.qty)}
          </div>
        </div>
      ))}
      <h1>
        {state.cart.length === 0 && (
        <div
          style={{
            fontFamily: " 'Satisfy', cursive",
            color: "#23253c",
            textAlign: "center",
            display: "grid",
            placeItems: "center",
            height: "100%"
          }}
        >
          {/* <ShoppingOutlined style={{ fontSize: "30px" }} /> */}
          Cart is empty
          <PiShoppingCartSimpleThin style={{ fontSize: "70px" }} />
        </div>
        )}
      </h1>
    </>
  );
};

export default CartItem;
