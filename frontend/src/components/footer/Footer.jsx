import React from "react";
import { NavLink } from "react-router-dom";
import logoImage from "../../assets/BaliFoodLogoNOBG.png";
import "./footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section logo-section">
          <img src={logoImage} alt="BaliFood Logo" className="footer-logo" />
        </div>
        <div className="footer-section">
          <ul>
            <p>
              &copy; {new Date().getFullYear()} BaliFood - Your Food App. All
              rights reserved.
            </p>
          </ul>
        </div>
        <NavLink to={"/about"} className="footer-link">
          About us
        </NavLink>
        <div className="footer-section">
          <ul className="contact-list">
            <ul className="contactus-ul">
              Contact us: BaliFood@gmail.com | +972-545767999{" "}
            </ul>
          </ul>
        </div>
      </div>
      <div className="footer-bottom"></div>
    </footer>
  );
};

export default Footer;
