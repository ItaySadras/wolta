import React from "react";
import "./navbar.css";
import logoImage from "../../assets/BaliFoodLogoNOBG.png";
import { NavLink } from "react-router-dom";

const CourierNavbar = () => {
  return (
    <nav className="navbar">
      <div className="logo-container">
        <NavLink to={"/courier/:courierId/dashboard"}>
          <img src={logoImage} alt="BaliFood Logo" className="navbar-logo" />
        </NavLink>
      </div>
      <div className="nav-section">
        <li>
          <NavLink to={"/courier/:courierId/Delivery"}>
            <button className="navbutton">Delivery</button>
          </NavLink>
        </li>
        <li>
          <NavLink to={"/courier/:courierId/profile"}>
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

export default CourierNavbar;
