import React, { useEffect, useRef, useState } from "react";
import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import CheckOutSteps from "../CheckOutSteps/CheckOutSteps";
import { FaCcMastercard } from "react-icons/fa6";
import { MdEvent } from "react-icons/md";
import { MdVpnKey } from "react-icons/md";
import "./pyament.css";
import MetaData from "../MetaData";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import toastify from "../../toastify/toastify";
import { useNavigate } from "react-router-dom";
import { createOrder } from "../../action/createOrderAction";
import { removeFromCart } from "../../action/addToCartAction";

const Payment = () => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [message, setMessage] = useState(null);

  const { user } = useSelector((state) => state.user);
  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { error } = useSelector((state) => state.createOrder);

  console.log(cartItems)

  const orderInfo = JSON.parse(sessionStorage.getItem("priceInfo"));

  const paymentData = {
    amount: Math.round(orderInfo.totalPrice * 100),
  };

  const order = {
    shippingInfo: {
      address: shippingInfo.city + shippingInfo.streetNo + shippingInfo.pincode,
      city: shippingInfo.city,
      state: shippingInfo.state,
      country: shippingInfo.selectedCountry,
      pinCode: shippingInfo.pincode,
      phoneNum: shippingInfo.phoneNo,
    },
    orderItems: cartItems,
    itemPrice: orderInfo.total,
    texPrice: orderInfo.tax,
    totalPrice: orderInfo.totalPrice,
    shippingPrice: orderInfo.shippingCharges,
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    payBtn.current.disabled = true;

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        "/api/payment/process",
        paymentData,
        config
      );

      const client_secret = data.clientSecret;

      if (!stripe || !elements) {
        return;
      }

      const billingDetails = {
        name: user.name,
        email: user.email,
      };

      if (shippingInfo) {
        billingDetails.address = {
          line1: shippingInfo.streetNo,
          city: shippingInfo.city,
          postal_code: shippingInfo.pincode,
        };
        if (shippingInfo.phoneNo) {
          billingDetails.phone = shippingInfo.phoneNo;
        }
      }

      const result = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: billingDetails,
        },
      });

      if (
        (result.error && result.error.type === "card_error") ||
        (result.error && result.error.type === "validation_error")
      ) {
        setMessage(error?.message);
        payBtn.current.disabled = false;
        toast.error(result?.error?.message, toastify);
      }

      if (result.paymentIntent?.status === "succeeded") {
        order.paymentInfo = {
          id: result.paymentIntent.id,
          status: result.paymentIntent.status,
        };

        dispatch(createOrder(order));

        cartItems && cartItems.map((item) => dispatch(removeFromCart(item.id)));

        navigate("/order/success");
        payBtn.current.disabled = true;
        toast.success("Payment Successfully", toastify);
      } else {
        setMessage("An unexpected error occurred.");
        toast.error(message, toastify);
        payBtn.current.disabled = false;
      }
    } catch (error) {
      payBtn.current.disabled = false;
      toast.error("An error occurred", toastify);
      console.error("Error in catch block:", error);
    }
  };

  useEffect(() => {
    if (error) {
      toast.error(error, toastify);
    }
  }, []);

  const payBtn = useRef(null);

  return (
    <div className="paymentContainer">
      <MetaData title="Payment" />
      <CheckOutSteps activeSteps={2} />
      <div className="paymentWrapper">
        <form onSubmit={handleSubmit}>
          <h1 className="pyamentHead">Card Info</h1>
          <div className="paymentInputs">
            <div className="inputWrapper">
              <FaCcMastercard />
              <div className="stripeInput">
                <CardNumberElement />
              </div>
            </div>
            <div className="inputWrapper">
              <MdEvent />
              <div className="stripeInput">
                <CardCvcElement />
              </div>
            </div>
            <div className="inputWrapper">
              <MdVpnKey />
              <div className="stripeInput">
                <CardExpiryElement />
              </div>
            </div>
          </div>
          <input
            type="submit"
            ref={payBtn}
            value={`Pay-${orderInfo ? `$${orderInfo.totalPrice}` : ""}`}
            className="confirmpaymentBtn"
            readOnly
          />
        </form>
      </div>
    </div>
  );
};

export default Payment;
