import React from "react";
import DishBox from "./DishBox";
import "./DishesCustomerDisplay.css";

const DishesCustomerDisplay = ({ dishes }) => {
  return (
    <div className="titledishes">
      <br />
      <h1 className="titledish">Pick your dish:</h1>
      <div className="big">
        {dishes.map((dish) => (
          <DishBox key={dish._id} dish={dish} />
        ))}
      </div>
    </div>
  );
};

export default DishesCustomerDisplay;
