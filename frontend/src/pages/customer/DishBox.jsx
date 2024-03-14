import React from "react";
import "./DishBox.css";
import { Link, useNavigate } from "react-router-dom";
import { getRestaurantByDishId } from "../../api";

const DishBox = ({ dish }) => {
  const navigate = useNavigate();

  const onDishClick = async () => {
    try {
      const response = await getRestaurantByDishId(dish._id);
      if (response.status === 200) {
        const restaurant = response.data.restaurant;
        navigate(`../${restaurant._id}/restaurantPage`);
      } else {
        // Handle other status codes or errors
      }
    } catch (error) {
      // Handle errors
    }
  };

  return (
    <div onClick={onDishClick} className="dish-card">
      <div className="dish-name">{dish.dishName}</div>
      <img src={dish.image} alt={dish.dishName} className="dish-image1" />
      <div>Price: {dish.price}₪</div>
    </div>
  );
};

export default DishBox;
