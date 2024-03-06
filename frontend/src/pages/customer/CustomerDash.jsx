import React, { useContext, useEffect, useState } from 'react';
import CustomerSearch from '../../components/customerDash/CustomerSearch';
import { RestaurantContext } from '../../context/RestaurantContext';

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
    <div>
      <div>
        <h2>Your location: {/* user location */}</h2>
      </div>
      <div>
        <CustomerSearch />
      </div>
      <div>
        <ol>
          {restaurants.map((restaurant, index) => (
            <li key={index}>
              <p>{restaurant.restaurantName}</p>
              <p>
                address:
                <ul>
                  {Object.values(generalAddress).map((value, index) => (
                    <li key={index}>{value}</li>
                  ))}
                </ul>
              </p>
              <p>
                filters:
                <ul>
                  {restaurant.restaurantFilter.map((element, index) => (
                    <li key={index}>{element}</li>
                  ))}
                </ul>
              </p>
              <p>{restaurant.open ? 'Open' : 'Closed'}</p>
            </li>
          ))}
        </ol>
      </div>
      <div>
        <button onClick={handleLoadMore}>Load More</button>
      </div>
    </div>
  );
}

export default CustomerDash;
