import React from 'react'
import CustomerSearch from '../../components/customerDash/CustomerSearch'

const CustomerDash = () => {
  const restaurants = [
    {
      restaurantName: "Le Bistro",
      lcoation: "hahilazon 3, ramat gan",
      cuisine: "italian",

    },
    {
      restaurantName: "Burger Barn",
      lcoation: "mapu 19, raanana",
      cuisine: "hamburgers",

    },
    {
      restaurantName: "Olive Garden",
      lcoation: "batei rishonim 2, merhavia",
      cuisine: "italian",

    },
    {
      restaurantName: "Le Bistro",
      lcoation: "hahilazon 3, ramat gan",
      cuisine: "italian",

    },
    {
      restaurantName: "Le Bistro",
      lcoation: "hahilazon 3, ramat gan",
      cuisine: "italian",

    },
    {
      restaurantName: "Le Bistro",
      lcoation: "hahilazon 3, ramat gan",
      cuisine: "italian",

    },

  ]
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
          {restaurants.map((restaurant, index) => {
            <li key={index}>
              {restaurant.restaurantName}
            </li>
          })}
        </ol>
      </div>
    </div>
  )
}

export default CustomerDash