import React from "react";
import "./review.css";
import profileAvatar from "/images/defa.png";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";

const ReviewCard = ({ review }) => {
  return (
    <div className="reviewDetail">
      <Box
        sx={{
          "& > legend": { mt: 2 },
        }}
      ></Box>
      <div className="reviewDetailTop">
        <img src={profileAvatar} alt="" />
        <h5>{review.name}</h5>
      </div>
      <div className="reviewDetailBottom">
        <h6>{review.comment}</h6>
        <Rating
          name="half-rating"
          value={review.rating}
          precision={0.5}
          readOnly
        />
      </div>
    </div>
  );
};

export default ReviewCard;
