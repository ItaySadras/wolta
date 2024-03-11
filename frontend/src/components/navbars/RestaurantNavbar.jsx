import React from "react";
import "./navbar.css";
import logoImage from "../../assets/BaliFoodLogoNOBG.png";
import { NavLink } from "react-router-dom";

const RestaurantNavbar = () => {
  return (
    <nav className="navbar">
      <div className="logo-container">
        <NavLink to={"/restaurant/:restaurantId/profile"}>
          <img src={logoImage} alt="BaliFood Logo" className="navbar-logo" />
        </NavLink>
      </div>
      <div className="nav-section">
        <li>
          <NavLink to={"/restaurant/:restaurantId/menu"}>
            <button className="navbutton">Menu</button>
          </NavLink>
        </li>
        <li>
          <NavLink to={"/restaurant/:restaurantId/reviews"}>
            <button className="navbutton">Reviews</button>
          </NavLink>
        </li>
        <li>
          <NavLink to={"/restaurant/:restaurantId/profile"}>
            <button className="navbutton">Profile</button>
          </NavLink>
        </li>
        <li>
          <button className="logout-button">Logout</button>
        </li>
      </div>
    </nav>
  );
};

export default RestaurantNavbar;
