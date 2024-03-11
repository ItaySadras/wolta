import React from 'react'
import { NavLink } from "react-router-dom";
import "./CustomerDash.css";

const RestaurantBox = ({restaurant}) => {
  return (
    <li  className="restaurant-item">
    <NavLink
      to={`../../restaurant/${restaurant._id}/restaurantPage`}
      className="restaurant-link"
    >
      <img
        className="restaurant-image"
        src={restaurant.image}
        alt="Restaurant"
      />
      <div>
        <div className="restaurant-name">
          <h3>{restaurant.restaurantName}</h3>
          <br />
          <span>address:</span>
          <ul className="address-details">
            
              <li className="address-detail">
                {restaurant.address.city +" "+restaurant.address.streetName+ " " +restaurant.address.streetNumber }
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
          <div className="restaurant-status">
            {restaurant.open ? "Open" : "Closed"}
          </div>
        </div>
      </div>
    </NavLink>
  </li>
  )
}

export default RestaurantBox