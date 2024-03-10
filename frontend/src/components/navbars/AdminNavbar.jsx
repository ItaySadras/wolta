import React from "react";
import "./navbar.css";
import logoImage from "../../assets/BaliFoodLogoNOBG.png";
import { NavLink } from "react-router-dom";

const AdminNavbar = () => {
  return (
    <nav className="navbar">
      <div className="logo-container">
        <NavLink to={"/admin"}>
          <img src={logoImage} alt="BaliFood Logo" className="navbar-logo" />
        </NavLink>
      </div>
      <div className="nav-section">
        <li>
          <NavLink to={"/admin/manageCustomers"}>
            <button className="navbutton">manage Customers</button>
          </NavLink>
        </li>
        <li>
          <NavLink to={"/admin/manageRestaurants"}>
            <button className="navbutton">manage Restaurants</button>
          </NavLink>
        </li>
        <li>
          <NavLink to={"/admin/manageCustomers"}>
            <button className="navbutton">Manage Couriers</button>
          </NavLink>
        </li>
        <li>
          <button className="logout-button">Logout</button>
        </li>
      </div>
    </nav>
  );
};

export default AdminNavbar;
