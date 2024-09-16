import React from "react";
import "./unauth.css";
import { GoStop } from "react-icons/go";
import { useNavigate } from "react-router-dom";

const UnautherizedError = () => {
  const navigate = useNavigate();

  const goHomePage = () => {
    navigate("/");
  };

  return (
    <div className="unauth">
      <GoStop />
      <p>You are not authorized to access this page.</p>
      <button onClick={goHomePage} className="goProductPage">
        View Products
      </button>
    </div>
  );
};

export default UnautherizedError;
