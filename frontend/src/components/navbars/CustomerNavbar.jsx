import React from "react";
import "./navbar.css";
import logoImage from "../../assets/logo.jpg";

const CustomerNavbar = () => {
  return (
    <nav className="customer-navbar">
      <div className="logo-container">
        <img src={logoImage} alt="BaliFood Logo" className="navbar-logo" />
      </div>
      <div className="nav-section">
        <li>
          profile
        </li>
        <li>
          hi
        </li>
        <li>
          <button className="logout-button">Logout</button>
        </li>
      </div>
    </nav>
  );
};

export default CustomerNavbar;
