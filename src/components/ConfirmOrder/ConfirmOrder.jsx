import React, { Fragment } from "react";
import "./ConfirmOrder.css";
import { useSelector } from "react-redux";
import CheckOutSteps from "../CheckOutSteps/CheckOutSteps";
import { useNavigate } from "react-router-dom";

const ConfirmOrder = () => {
  const navigate = useNavigate();

  const { name: userName } = useSelector((state) => state.user.user);
  const { city, streetNo, phoneNo, pincode } = useSelector(
    (state) => state.cart.shippingInfo
  );
  const { cartItems } = useSelector((state) => state.cart);

  const total =
    Math.round(
      cartItems.reduce((total, item) => total + item.price * item.quantity, 0) *
        100
    ) / 100;

  let shippingCharges;
  if (total <= 50) {
    shippingCharges = 0;
  } else if (total <= 100 && total > 50) {
    shippingCharges = 2;
  } else if (total > 100 && total <= 200) {
    shippingCharges = 4;
  }
  else {
    shippingCharges = 6
  }

  const tax = Math.round(total * 0.01 * 100) / 100;

  const totalPrice = Math.round((total + tax + shippingCharges) * 100) / 100;

  const handleMoveOnPaymentPage = () => {
    const data = {
      total,
      shippingCharges,
      tax,
      totalPrice,
    };

    sessionStorage.setItem("priceInfo", JSON.stringify(data));
    navigate("/payment");
  };

  return (
    <div className="confirmOrderParent">
      <CheckOutSteps activeSteps={1} />
      <div className="confirmOrderWrapper">
        <div className="confirmOrderLeft">
          <div className="addressInfo">
            <h1 className="shippingHead">Shipping Info</h1>
            <p>
              <b>Name:</b>
              {userName}
            </p>
            <p>
              <b>Phone:</b>
              {phoneNo}
            </p>
            <p>
              <b>Address:</b>
              {city},{streetNo}, {pincode}
            </p>
          </div>
          <div className="cartItems">
            <h1 className="shippingHead">Your Cart Items</h1>
            {cartItems &&
              cartItems.map((item, index) => (
                <div className="cartItemsInfo" key={index}>
                  <img src={item.image} alt="" />
                  <b>{item.name}</b>
                  <p>
                    {item.quantity} X {item.price} = $
                    {item.quantity * item.price}
                  </p>
                </div>
              ))}
          </div>
        </div>
        <div className="confirmOrderRight">
          <h1 className="shippingHead">Order Summery</h1>
          <span>
            <b>Subtotal:</b>
            <p>${total}</p>
          </span>
          <span>
            <b>Shipping Charges:</b>
            <p>${shippingCharges}</p>
          </span>
          <span>
            <b>Tax :</b>
            <p>${tax}</p>
          </span>
          <div className="totalOrderPrice">
            <b>Total:</b>
            <p>${totalPrice}</p>
          </div>
          <div className="paymentBtn">
            <button onClick={handleMoveOnPaymentPage}>
              Proceed To Payment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmOrder;
