import React, { useContext, useEffect, useState } from 'react';
import CustomerSearch from '../../components/customerDash/CustomerSearch';
import { RestaurantContext } from '../../context/RestaurantContext';
import { NavLink } from 'react-router-dom';
import "./CustomerDash.css"; 

const CustomerDash = () => {
  const { restaurants, getAllRestaurants } = useContext(RestaurantContext);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(4);

  const handleLoadMore = () => {
    setPage(page + 1);
  };

  useEffect(() => {
    if (page > 1) {
      getAllRestaurants(page, limit);
    }
  }, [page]);

  const generalAddress = {
    streetname: "hahilazon",
    streetNumber: "3",
    city: "ramat gan",
  };

  return (
    <div className="customer-dash">
      <div className="location-info">
        <h2 className="location-heading">Your location: {/* user location */}</h2>
      </div>
      <div className="customer-search">
        <CustomerSearch />
      </div>
      <div>
        <ol className="restaurant-items">
          {restaurants.map((restaurant, index) => (
            <li key={index} className="restaurant-item">
              <NavLink to={`../../restaurant/${restaurant._id}`} className="restaurant-link">
                <div>
                  <p className="restaurant-name">{restaurant.restaurantName}</p>
                  <p>
                    address:
                    <ul className="address-details">
                      {Object.values(generalAddress).map((value, index) => (
                        <li key={index} className="address-detail">{value}</li>
                      ))}
                    </ul>
                  </p>
                  <p>
                    filters:
                    <ul className="filter-list">
                      {restaurant.restaurantFilter.map((element, index) => (
                        <li key={index} className="filter-item">{element}</li>
                      ))}
                    </ul>
                  </p>
                  <p className="restaurant-status">{restaurant.open ? 'Open' : 'Closed'}</p>
                </div>
              </NavLink>
            </li>
          ))}
        </ol>
      </div>
      <div className="load-more-container">
        <button onClick={handleLoadMore} className="load-more-btn">Load More</button>
      </div>
    </div>
  );
};

export default CustomerDash;
