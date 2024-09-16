import React, { useEffect, useState } from "react";
import "./feedback.css";
import { useNavigate, useParams } from "react-router-dom";
import { orderFeedbackAction } from "../../action/getOrderAction";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import toastify from "../../toastify/toastify";
import { getProductData } from "../../action/action";
import Loader from "../Loader/Loader";
import Rating from "@mui/material/Rating";

const FeedBack = ({ initialRating = 0, initialComment = "" }) => {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [rating, setRating] = useState(initialRating);
  const [comment, setComment] = useState(initialComment);

  const id = productId;

  useEffect(() => {
    dispatch(getProductData(id));
  }, []);

  const { product } = useSelector((state) => state.productDetail);

  if (!product) {
    return <Loader />;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (rating === 0) {
      toast.error("Please provide a rating", toastify);
      return;
    }
    dispatch(orderFeedbackAction(productId, comment, rating));
    navigate(`/feedback/submit/${productId}`);
  };

  return (
    <div className="feedbackWrapper">
      <div className="img-title-wrapper">
        {product && product.images && product.images.length > 0 && (
          <img
            src={product.images[0].url}
            alt="Product"
            className="product-image"
          />
        )}
        <h1>{product.name}</h1>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="ratingWrapper">
          <label htmlFor="rating">Rating:</label>
          <Rating
            name="simple-controlled"
            onChange={(event, newValue) => {
              setRating(newValue);
            }}
            size="large"
          />
          ,
        </div>
        <div className="commentWrapper">
          <label htmlFor="comment">Comment:</label>
          <textarea
            id="comment"
            value={comment}
            onChange={(event) => setComment(event.target.value)}
            rows="4"
            cols="50"
            required
          ></textarea>
        </div>
        <button type="submit" className="feedbackSubmit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default FeedBack;
