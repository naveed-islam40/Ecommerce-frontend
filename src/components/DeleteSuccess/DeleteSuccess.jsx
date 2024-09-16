import React, { useEffect } from "react";
import { IconContext } from "react-icons";
import { FaCheckCircle } from "react-icons/fa";
import "./DeleteSuccessPage.css";
import { useNavigate } from "react-router-dom";
import { deleteProduct } from "../../action/deleteProduct";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

const DeleteSuccess = () => {
  const { id } = useParams();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(deleteProduct(id));
  }, []);

  const navigate = useNavigate();
  const goDashboard = () => {
    navigate("/dashboard/admin");
  };

  return (
    <div className="delete-success-container">
      <IconContext.Provider value={{ className: "success-icon" }}>
        <FaCheckCircle />
      </IconContext.Provider>
      <h2 className="success-message">Product Deleted Successfully</h2>
      <button className="dummy-button" onClick={goDashboard}>
        Go to Dashboard
      </button>
    </div>
  );
};

export default DeleteSuccess;
