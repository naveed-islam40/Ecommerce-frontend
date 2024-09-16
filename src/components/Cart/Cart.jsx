import React, { Fragment, useEffect } from "react";
import "./Cart.css";
import CartContainer from "../CartContainer/CartContainer.jsx";
import { useSelector } from "react-redux";
import NoProduct from "../CartContainer/NoProduct";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const { isAuthenticated } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const handleCheckOut = () => {
    if (isAuthenticated) {
      navigate("/shipping");
    }
    if (!isAuthenticated) {
      navigate("/signup");
    }
  };

  return (
    <Fragment>
      {cartItems.length === 0 ? (
        <NoProduct />
      ) : (
        <div className="cartWrapper">
          <div className="cartHeading">
            <h1>Cart</h1>
          </div>
          <div className="cartTop">
            <span>Product</span>
            <span>Price</span>
            <span>Quantity</span>
            <span>Total</span>
          </div>
          {cartItems &&
            cartItems.map((details, index) => (
              <CartContainer details={details} key={index} />
            ))}
          <div className="totalPrice">
            <h4>Total Price</h4>
            <span>
              <h4>
                $
                {cartItems
                  .reduce(
                    (total, item) => total + item.price * item.quantity,
                    0
                  )
                  .toFixed(2)}
              </h4>
              <button className="checkOut" onClick={handleCheckOut}>
                Check Out
              </button>
            </span>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default Cart;
