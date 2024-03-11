import React from "react";
import "./navbar.css";
import logoImage from "../../assets/BaliFoodLogoNOBG.png";
import { NavLink } from "react-router-dom";

const CustomerNavbar = () => {
  return (
    <nav className="navbar">
      <div className="logo-container">
        <NavLink to={"/customer/:customerId/dashboard"}>
          <img src={logoImage} alt="BaliFood Logo" className="navbar-logo" />
        </NavLink>
      </div>
      <div className="nav-section">
        <li>
          <NavLink to={"/customer/:customerId/profile"}>
            <button className="navbutton">Profile</button>
          </NavLink>
        </li>
        <li>
          <button className="nav-logout-button">Logout</button>
        </li>
        <li>
          <NavLink to={"/customer/:customerId/basket"}>
            <button style={{background:"white" , color:"black"}} className="navbutton">🛒 order </button>
          </NavLink>
        </li>
      </div>
    </nav>
  );
};

export default CustomerNavbar;
