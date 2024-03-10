import React from "react";
import logoImage from "../../assets/BaliFoodLogoNOBG.png";
import { NavLink } from "react-router-dom";
import "./navbar.css";

const LandingPageNavBar = () => {
  return (
    <nav className="navbar">
      <div className="logo-container">
        <NavLink to={"/"}>
          <img src={logoImage} alt="BaliFood Logo" className="navbar-logo" />
        </NavLink>
      </div>
      <div className="nav-section">
        <li>
          <NavLink to={"/about"}>
            <button className="navbutton">About us</button>
          </NavLink>
        </li>
        <li>
          <NavLink to={"/register"}>
            <button className="navbutton">Register</button>
          </NavLink>
        </li>
        <li>
          <NavLink to={"/login"}>
            <button className="navbutton">Log in</button>
          </NavLink>
        </li>
      </div>
    </nav>
  );
};

export default LandingPageNavBar;
