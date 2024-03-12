import React from "react";
import CustomerSearch from "../../components/customerDash/CustomerSearch";
import "./CustomerDash.css";

const SearchBox = ({ dispatch, page }) => {
  return (
    <>
      <div className="location-info">
        <div className="dataandlocation">
          <h2 className="location-heading">Hungry for ...? </h2>
          <CustomerSearch page={page} dispatch={dispatch} />
        </div>
      </div>
    </>
  );
};

export default SearchBox;
