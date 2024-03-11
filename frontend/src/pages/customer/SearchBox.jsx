import React from "react";
import CustomerSearch from "../../components/customerDash/CustomerSearch";
import "./CustomerDash.css";

const SearchBox = ({ dispatch }) => {
  return (
    <>
      <div className="location-info">
        <div className="dataandlocation">
          <h2 className="location-heading">
            Your location: {/* Replace this with actual user location data */}
          </h2>
          <CustomerSearch dispatch={dispatch} />
        </div>
      </div>
    </>
  );
};

export default SearchBox;
