import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AdminAllOrders } from "../../action/getAdminProductAction";
import "./adminOrder.css";

const AllOrders = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(AdminAllOrders());
  }, []);

  const { data } = useSelector((state) => state.AllOrders);

  const updateOrderStatus = (orderId) => {
    navigate(`/update/orderStatus/${orderId}`);
  };

  return (
    <div className="adminOrdersParent">
      <div className="adminOrdertopbar">
        <p>Product</p>
        <p>Quantity</p>
        <p>Total Price</p>
      </div>
      {data?.orders &&
        data.orders.map((adminOrder, index) => (
          <div className="adminOrderParent" key={index}>
            {adminOrder.orderItems &&
              adminOrder.orderItems.map((item, index) => (
                <div className="adminOrderWrapper" key={index}>
                  <img src={item.image} alt={item.name} />
                  <span style={{ textAlign: "center" }}>
                    <p>{item.quantity}</p>
                    <p>
                      Order Status:{" "}
                      <b
                        className={
                          adminOrder.orderStatus === "processing"
                            ? "outofstock"
                            : "instock"
                        }
                      >
                        {adminOrder.orderStatus}
                      </b>
                    </p>
                  </span>
                  <span style={{ textAlign: "center" }}>
                    <p>$ {adminOrder.totalPrice}</p>
                    <button
                      className="orderStatusBtn"
                      onClick={() => updateOrderStatus(adminOrder._id)}
                    >
                      Update Order Status
                    </button>
                  </span>
                </div>
              ))}
          </div>
        ))}
    </div>
  );
};

export default AllOrders;
