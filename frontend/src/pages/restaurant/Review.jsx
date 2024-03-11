import React from "react";
import "./review.css";
import Grade from "./Grade";

const Review = ({ currentReview }) => {
  return (
    <div className="review-box">
      <p>Customer name: {currentReview.customerId.name}</p>
      <p>Restaurant name: {currentReview.restaurantId}</p>
      <div>
        Grade: <Grade grade={currentReview.grade} />
      </div>
      <p>Comment: {currentReview.comment}</p>
    </div>
  );
};

export default Review;
