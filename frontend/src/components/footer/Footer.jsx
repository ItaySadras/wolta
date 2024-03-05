import React from "react";
import '../footer/Footer.css';
import "./AboutUs.jsx";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>Explore BaliFood</h3>
          <ul>
            <li>
              <NavLink to={"/about"}>About Us</NavLink>
            </li>
            <li>
              <a href="">Contact Us</a>
            </li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>Contact us:</h3>
          <p>Email: BaliFood@gmail.com</p>
          <p>Phone: +972545653650</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; BaliFood - Your Food App. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;