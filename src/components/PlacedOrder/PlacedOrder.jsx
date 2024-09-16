import React, { useEffect } from "react";
import "./PlacedOrder.css";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getOrder } from "../../action/getOrderAction";

const PlacedOrder = () => {
  const { orders } = useSelector((state) => state.getOrder);
  const { user } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrder());
  }, []);

  return (
    <div className="thank-you-page">
      <header className="header">
        <img src="/images/fav.png" alt="Brand Logo" />
        <h1>Thank you for your order!</h1>
      </header>
      <main className="main-content">
        <h2 style={{ textAlign: "center" }}>ORDER SUMMARY</h2>
        {orders &&
          orders.map((order, index) => (
            <div key={order._id}>
              <section className="order-summary">
                <p>{` ${index + 1})`}</p>
                <Link className="order-item" to={`/order/details/${order._id}`}>
                  <p>
                    <b>Order ID:</b> {order._id}
                  </p>
                  <p>
                    <b>Order date:</b> {order.createdAt.substring(0, 10)}
                  </p>
                  <p>
                    <b>
                      Order status:
                      <span
                        className={
                          order.orderStatus === "processing"
                            ? "outofstock"
                            : "instock"
                        }
                      >
                        {order.orderStatus === "processing"
                          ? " Processing"
                          : "Delivered"}
                      </span>
                    </b>{" "}
                  </p>
                </Link>
              </section>
            </div>
          ))}
      </main>
    </div>
  );
};

export default PlacedOrder;
