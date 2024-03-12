import React from "react";
import "./navbar.css";
import logoImage from "../../assets/BaliFoodLogoNOBG.png";
import { NavLink } from "react-router-dom";
import CourierDash from "../../pages/courier/CourierDash";

const CourierNavbar = () => {
  return (
    <nav className="navbar">
      <div className="logo-container">
        <NavLink to={"/courier/65ef24ffdd3a8542f70d1154/dashboard"}>
          <img src={logoImage} alt="BaliFood Logo" className="navbar-logo" />
        </NavLink>
      </div>
      <div className="nav-section">
        <div className="availabillities">
        <CourierDash></CourierDash>
        </div>
        <li>
          <NavLink to={"/courier/65ef24ffdd3a8542f70d1154/Delivery"}>
            <button className="navbutton">Delivery</button>
          </NavLink>
        </li>
        <li>
          <NavLink to={"/courier/65ef24ffdd3a8542f70d1154/profile"}>
            <button className="navbutton">Profile</button>
          </NavLink>
        </li>
        <li>
          <button className="nav-logout-button">Logout</button>
        </li>
      </div>
    </nav>
  );
};

export default CourierNavbar;
