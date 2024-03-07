import React from "react";
import Footer from "./Footer";
import CustomerNavbar from "../navbars/CustomerNavbar";
import "./aboutus.css";

function AboutUs() {
  return (
    <>
      <CustomerNavbar />
      <div className="about-us">
        <h1>About BaliFood</h1>
        <p>
          BaliFood is a leading food delivery company dedicated to bringing
          delicious meals from local restaurants straight to your doorstep. We
          believe that good food should be convenient and accessible to
          everyone.
        </p>
        <h2>Our Mission</h2>
        <p>
          Our mission is to connect people with the best dining experiences by
          offering a wide variety of cuisines and ensuring timely delivery.
        </p>
        <h2>Our Values</h2>
        <ul>
          <li>
            Customer Satisfaction: We prioritize customer satisfaction above all
            else.
          </li>
          <li>
            Quality: We strive to deliver high-quality meals from trusted
            restaurants.
          </li>
          <li>
            Reliability: You can count on us for on-time delivery and excellent
            service.
          </li>
          <li>
            Community: We support local businesses and communities by partnering
            with neighborhood restaurants.
          </li>
        </ul>
      </div>
      <Footer />
    </>
  );
}

export default AboutUs;
