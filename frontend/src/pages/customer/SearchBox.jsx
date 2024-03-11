import React from 'react'
import CustomerSearch from '../../components/customerDash/CustomerSearch'
import "./CustomerDash.css";

const SearchBox = ({dispatch}) => {
  return (
    <><div className="location-info">
          <h2 className="location-heading">
              Your location: {/* Replace this with actual user location data */}
          </h2>
      </div><div className="customer-search">
              <CustomerSearch dispatch={dispatch} />
              <div className="dataandlocation"></div>
          </div></>
  )
}

export default SearchBox