import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "./CustomerDash.css";
import { isThisRestaurantOpenFront } from "../../components/utils";

const RestaurantBox = ({ restaurant }) => {
  useEffect(() => {
    setOpen(isThisRestaurantOpenFront(restaurant));
  }, []);

  const [open, setOpen] = useState(false);
  return (
    <li className="restaurant-item">
      <NavLink
        to={`../../customer/65e81bb38630ba788c71bb8a/${restaurant._id}/restaurantPage`}
        className="restaurant-link"
      >
        <img
          className={`${open ? "" : "close"} restaurant-image`}
          src={restaurant.image}
          alt="Restaurant"
        />
        {!open ? <div className="closed">Closed</div> : ""}
        <div>
          <div className="restaurant-name">
            <h3>{restaurant.restaurantName}</h3>
            <br />
            <span>address:</span>
            <ul className="address-details">
              <li className="address-detail">
                {restaurant.address.city +
                  " " +
                  restaurant.address.streetName +
                  " " +
                  restaurant.address.streetNumber}
              </li>
            </ul>
            <span>filters:</span>
            <ul className="filter-list">
              {restaurant.restaurantFilter.map((element, index) => (
                <li key={index} className="filter-item">
                  {element}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </NavLink>
    </li>
  );
};

export default RestaurantBox;
