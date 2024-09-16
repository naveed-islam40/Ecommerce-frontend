import React from "react";
import "./placeOrder.css";
import { FaCheckCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

const PlaceOrder = () => {
  return (
    <div className="placeOrderWrapper">
      <FaCheckCircle />
      <p className="orderPlaced">Your Order has been placed Successfully</p>
      <Link className="placeOrderBtn" to="/order/me">
        View Order
      </Link>
    </div>
  );
};

export default PlaceOrder;
