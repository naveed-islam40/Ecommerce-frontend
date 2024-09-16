import React, { useEffect, useState } from "react";
import "./UpdateOrderStatus.css";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getOrderDetails,
  orderStatusChangeAction,
} from "../../action/getOrderAction";
import { toast } from "react-toastify";
import toastify from "../../toastify/toastify";

const UpdateOrderStatus = () => {
  const { orderId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { order } = useSelector((state) => state.getOrderDetail);

  const [status, setStatus] = useState("");

  console.log(status);

  useEffect(() => {
    dispatch(getOrderDetails(orderId));
  }, [orderId]);

  const oredrStatusChange = () => {
    if (status.trim() === "") {
      toast.error("Please provide a valid order status", toastify);
      return;
    }
    dispatch(orderStatusChangeAction(orderId, status));
    toast.success("Order Status has been changed successfully", toastify);
    navigate("/dashboard/orders");
  };

  return (
    <div>
      <div className="orderStatus_container">
        <h1>Update Product Status</h1>
        <div className="update-status-form">
          <div className="order-id">
            <label>Order ID: </label>
            <span>#{orderId}</span>
          </div>

          <div className="order-status">
            <label>Order Status: </label>
            <select
              defaultValue={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option defaultValue="" disabled selected>
                Select Status
              </option>
              <option value="Processing">processing</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>

          <button className="dashboard-btn" onClick={oredrStatusChange}>
            Change OrderStatus
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateOrderStatus;
