import React from "react";
import "./FeedBackSubmit.css";
import { FaCheckCircle } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { getProductData } from "../../action/action";
import { useDispatch } from "react-redux";

const FeedBackSubmit = () => {
  const { id } = useParams();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const viewReview = () => {
    dispatch(getProductData(id));
    navigate(`/product/${id}`);
  };
  return (
    <div className="feedbacksubmitWrapper">
      <FaCheckCircle />
      <h1>Thanks for your Review</h1>
      <button className="feedbackSubmit" onClick={viewReview}>
        View your Review
      </button>
    </div>
  );
};

export default FeedBackSubmit;
