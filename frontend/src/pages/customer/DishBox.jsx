import React from "react";
import "./DishBox.css";
// dishName
// "Lunch Salad, Chang's Chinese Chicken Salad"

// ingredients
// Array (empty)
// image
// "http://res.cloudinary.com/djujthdkr/image/upload/v1709710218/Lunch%20S…"

// intolerances
// Array (empty)
// price
// 86
// __v
// 0
const DishBox = ({ dish }) => {
  return (
    <div className="dish-card">
      <div className="dish-name">{dish.dishName}</div>
      <img src={dish.image} alt={dish.dishName} className="dish-image1" />
      <div>Price: {dish.price}₪</div>
    </div>
    //       <>
    //         <NavLink
    //           to={`../../customer/65e81bb38630ba788c71bb8a/${restaurant._id}/restaurantPage`}
    //           className="restaurant-link"
    //         >
    //   </NavLink>
    // </>
  );
};

export default DishBox;
