import React, { useContext, useEffect, useState } from 'react';
import CustomerSearch from '../../components/customerDash/CustomerSearch';
import { RestaurantContext } from '../../context/RestaurantContext';
import { NavLink } from 'react-router-dom';
import "./CustomerDash.css"

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
  }, [page])

  const generalAddress = {
    streetname: "hahilazon",
    streetNumber: "3",
    city: "ramat gan",
  }

  return (
    <div className="customer-dash">
    <div className="location-info">
      <h2 className="location-heading">Your location: {/* user location */}</h2>
    </div>
    <div className="customer-search">
      <CustomerSearch />
    </div>
    <div>
  <ol>
    {restaurants.map((restaurant, index) => (
      <NavLink to={`../searchResults/${restaurant._id}`} key={index} className="restaurant-link">
        <li className="restaurant-item">
          <p className="restaurant-name">{restaurant.restaurantName}</p>
          <p>
            address:
            <ul>
              {Object.values(generalAddress).map((value, index) => (
                <li key={index} className="address-detail">{value}</li>
              ))}
            </ul>
          </p>
          <p>
            filters:
            <ul>
              {restaurant.restaurantFilter.map((element, index) => (
                <li key={index} className="filter-item">{element}</li>
              ))}
            </ul>
          </p>
          <p className="restaurant-status">{restaurant.open ? 'Open' : 'Closed'}</p>
        </li>
      </NavLink>
    ))}
  </ol>
</div>

    <div className="load-more-container">
      <button onClick={handleLoadMore} className="load-more-btn">Load More</button>
    </div>
  </div>
  
  );
}

export default CustomerDash;
