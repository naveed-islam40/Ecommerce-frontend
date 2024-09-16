import React, { useEffect, useState } from "react";
import "./AdminAllUsers.css";
import { useDispatch, useSelector } from "react-redux";
import { AdminAllOrders } from "../../action/getAdminProductAction";

import UserDetails from "./UserDetails.jsx";
import { useNavigate } from "react-router-dom";

const AdminAllUsers = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(AdminAllOrders());
  }, []);

  const { data: orderData } = useSelector((state) => state.AllOrders);

  const getUserDetails = (id) => {
    navigate(`/user/details/${id}`);
  };

  return (
    <div className="admin_allUser">
      {orderData &&
        orderData.orders &&
        orderData.orders.map((order, index) => (
          <div className="card" key={index}>
            <div className="user-profile">
              <p>userId: {order.user}</p>
            </div>

            {order.orderItems &&
              order.orderItems.map((item) => (
                <div className="product-info">
                  <img src={item.image && item.image} alt="Product" />
                  <p>Product ID: {order._id}</p>
                </div>
              ))}
            <button
              className="viewUserDetails"
              onClick={() => getUserDetails(order.user)}
            >
              View user details
            </button>
          </div>
        ))}
    </div>
  );
};

export default AdminAllUsers;
