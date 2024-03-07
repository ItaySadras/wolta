import React from "react";
import "./footer.css";
import { NavLink } from "react-router-dom";
import logoImage from "../../assets/logo.jpg";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section logo-section">
          <img src={logoImage} alt="BaliFood Logo" className="footer-logo" />
        </div>
        <div className="footer-section about-section">
          <NavLink to={"/about"} className="footer-link">About Us</NavLink>
        </div>
        <div className="footer-section contact-section">
          <ul>
            <li>Contact us: BaliFood@gmail.com</li>
            <li>+972-545767999</li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} BaliFood - Your Food App. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
