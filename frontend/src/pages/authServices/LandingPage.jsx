import React from "react";
import Footer from "../../components/footer/Footer";
import LandingPageNavBar from "../../components/navbars/LandingPageNavBar";
import "./LandingPage.css";
import { NavLink } from "react-router-dom";

const LandingPage = () => {
  return (
    <>
      <div className="whole">
        <LandingPageNavBar />
        <div className="ticket">
          <h1>Order food easily with our delivery app!</h1>
          <br />
          <h4>We love food and we know you do too.</h4>
          <br /> <br />
          <h4>
            That's why we make it easy <br /> <br />
            for you to get the food you really want,
            <br /> <br />
            whenever you want it.
          </h4>
          <br />
          <br />
          <NavLink to={"/register"}>
            <button className="button1">Order Now </button>
          </NavLink>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default LandingPage;
