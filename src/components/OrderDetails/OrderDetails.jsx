import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrderDetails } from "../../action/getOrderAction";
import { Link, useParams } from "react-router-dom";
import "./OrderDetails.css";
import Loader from "../Loader/Loader";
import { toast } from "react-toastify";
import toastify from "../../toastify/toastify";

const OrderDetails = () => {
  const dispatch = useDispatch();
  const { order } = useSelector((state) => state.getOrderDetail);

  const [loading, setLoading] = useState(true);

  const { orderid } = useParams();

  useEffect(() => {
    if (orderid) {
      dispatch(getOrderDetails(orderid))
        .then(() => setLoading(false))
        .catch((error) => {
          toast.error("Error fetching order details: ", toastify);
          setLoading(false);
        });
    }
  }, [dispatch, orderid]);

  if (loading) {
    return <Loader />;
  }

  if (!order) {
    return <div>No order found</div>;
  }

  const { city, state, country, pinCode } = order.shippingInfo;
  const { id: paymmentId, status } = order.paymentInfo;
  const { name, email } = order.user;
  return (
    <div className="orderDetailParent">
      <h1 className="OrderDetailHead">
        Order Id #{<span className="outofstock">{order._id}</span>}
      </h1>
      <div className="shipping-info">
        <div className="personalInfo">
          <h2>Pesonal Info</h2>
          <p>Name: {name}</p>
          <p>Email: {email}</p>
        </div>
        <div className="shipping-info-content">
          <h2>Shipping Info</h2>
          <p>Country: {country}</p>
          <p>State: {state}</p>
          <p>City: {city}</p>
          <p>Pincode: {pinCode}</p>
        </div>
      </div>
      <div className="order-info">
        <div className="order-info-content">
          <div className="paymentInfo">
            <h2>Payment Information</h2>
            <p>Payment Id: {paymmentId}</p>
            <p>
              Payment Status:{" "}
              {status == "succeeded" ? (
                <span className="instock">Paid</span>
              ) : (
                <span className="outofstock">Unpaid</span>
              )}
            </p>
          </div>
          <div className="orderStatus">
            <h2>Order Status: </h2>
            <p>
              {order.orderStatus === "processing" ? (
                <span className="outofstock">Proccessing</span>
              ) : (
                <span className="instock">Delivered</span>
              )}
            </p>
          </div>
        </div>
        <div className="orderItems">
          {order?.orderItems.map((item) => (
            <div className="orderItem" key={item._id} id="orderItemid">
              <img src={item.image} alt={item.name} />
              <div className="orderItemRight">
                <span>
                  <p>
                    <b>Product:</b> {item.name}
                  </p>
                  <p>
                    <b>Quantity :</b> {item.quantity}
                  </p>
                </span>
                <div className="feedback">
                  {order.orderStatus !== "processing" ? (
                    <Link
                      className="feedBackBtn"
                      to={`/feedback/${item.id}`}
                      onClick={() => getProductById(item.id)}
                    >
                      Give Feedback
                    </Link>
                  ) : (
                    <p className="feedback-note">
                      You can add feedback after the order is delivered
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
