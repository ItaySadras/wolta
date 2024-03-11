import React, { useContext, useEffect, useReducer, useState } from "react";
import { NavLink } from "react-router-dom";
import "./CustomerDash.css";
import RestaurantBox from "./RestaurantBox";

const RestaurantsCustomerDisplay = ({restaurants}) => {
  return (
    <div>
    <ol className="restaurant-items">
      {restaurants.map((restaurant, index) => (
       <RestaurantBox key={index} restaurant={restaurant}/>
      ))}
    </ol>
  </div>
  )
}

export default RestaurantsCustomerDisplay