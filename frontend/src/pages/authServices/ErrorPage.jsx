import React from "react";
import "./errorpage.css";
import Footer from "../../components/footer/Footer";
import LandingPageNavBar from "../../components/navbars/LandingPageNavBar";

const ErrorPage = () => {
  return (
    <div>
      <LandingPageNavBar />
      <div className="errorcomponent">
        <h1 className="error">404</h1>
        <p className="text">ERROR</p>
        <p className="text">Sorry, we couldn't find this page.</p>
        <Footer />
      </div>
    </div>
  );
};

export default ErrorPage;
