import React from "react";

const RestaurantProfile = () => {
  const sampleRestaurant = {
    _id: "65e81b7f8630ba788c71bb4f",
    restaurantName: "Dragon Palace",
    userName: "Billy_Pfannerstill",
    password: "hs4z8W3nBTllpsj",
    email: "Billy_Pfannerstill52@yahoo.com",
    phoneNumber: "284-537-1286 x5870",
    open: true,
    address: {
      streetname: "tuval",
      streetNumber: "10",
      city: "ramat gan",
    },
    defaultOpeningTime: [
      {
        openingHour: "10:00",
        closingHour: "17:00",
      },
      {
        openingHour: "10:00",
        closingHour: "17:00",
      },
      {
        openingHour: "10:00",
        closingHour: "17:00",
      },
      {
        openingHour: "10:00",
        closingHour: "17:00",
      },
      {
        openingHour: "10:00",
        closingHour: "17:00",
      },
      {
        openingHour: "14:00",
        closingHour: "20:00",
      },
      {
        openingHour: "14:00",
        closingHour: "20:00",
      },
    ],
    reviews: [
      {
        _id: "65e81bb38630ba788c71bb88",
        customerId: "65e81bb38630ba788c71bb86",
        Restaurant: "65e81b7f8630ba788c71bb4f",
        grade: 5,
        comment:
          "Solutio verbera adeo inflammatio conqueror virtus spargo aeternus. Adopto vitiosus alias. Patria ustilo valeo.",
        whenSubmitted: "2024-02-23T02:58:21.737Z",
      },
      {
        _id: "65e81bb38630ba788c71bb88",
        customerId: "65e81bb38630ba788c71bb86",
        Restaurant: "65e81b7f8630ba788c71bb4f",
        grade: 5,
        comment:
          "Solutio verbera adeo inflammatio conqueror virtus spargo aeternus. Adopto vitiosus alias. Patria ustilo valeo.",
        whenSubmitted: "2024-02-23T02:58:21.737Z",
      },
      {
        _id: "65e81bb38630ba788c71bb88",
        customerId: "65e81bb38630ba788c71bb86",
        Restaurant: "65e81b7f8630ba788c71bb4f",
        grade: 5,
        comment:
          "Solutio verbera adeo inflammatio conqueror virtus spargo aeternus. Adopto vitiosus alias. Patria ustilo valeo.",
        whenSubmitted: "2024-02-23T02:58:21.737Z",
      },
    ],
  };

  return (
    <div>
      <div>
        <h2> Hello {sampleRestaurant.restaurantName}!</h2>
      </div>
      <div>
        <h3>Email: {sampleRestaurant.email}</h3>
        <button>Edit email</button>
      </div>
      <div>
        <h3>Phone number: {sampleRestaurant.phoneNumber}</h3>
        <button>Edit phone number</button>
      </div>
      <div>
        <h3>Address: {Object.values(sampleRestaurant.address).join(", ")}</h3>
        <button>Edit address</button>
      </div>
      <div>
        <h3>Opening times:</h3>
        <ul>
          {sampleRestaurant.defaultOpeningTime.map((time, index) => (
            <li key={index}>{`${time.openingHour} - ${time.closingHour}`}</li>
          ))}
        </ul>
        <button>edit opening times</button>
      </div>
    </div>
  );
};

export default RestaurantProfile;
