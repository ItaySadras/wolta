import React from 'react';
import CustomerSearch from '../../components/customerDash/CustomerSearch';
// Assuming RestaurantContext is not used in this snippet

const CustomerDash = () => {
 const restaurants = [
    {
      restaurantName: "The Great Pizza",
      address: "123 Pizza Street, Pizza City, PZ",
      restaurantFilter: "Italian",
      open: true,
    },
    {
      restaurantName: "Sushi Paradise",
      address: "456 Sushi Avenue, Sushi Town, SU",
      restaurantFilter: "Japanese",
      open: false
    },
    {
      restaurantName: "Burger Bistro",
      address: "789 Burger Boulevard, Burgerville, BU",
      restaurantFilter: "Fast Food",
      open: true
    }
 ];

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
              {restaurant.restaurantName}
              {restaurant.address}
              {restaurant.restaurantFilter}
              {restaurant.open ? 'Open' : 'Closed'}
            </li>
          ))}
        </ol>
      </div>
    </div>
 );
}

export default CustomerDash;
