import React, { useContext, useEffect, useState } from "react";
import "./restaurant.css";
import { NavLink, useParams } from "react-router-dom";
import { RestaurantContext } from "../../context/RestaurantContext";
import RestaurantPageMenu from "../../components/RestaurantPage/RestaurantPageMenu";

const RestaurantPage = () => {
  const { getRestaurantById, restaurantInfo } = useContext(RestaurantContext);
  console.log(restaurantInfo);
  const [loading, setLoading] = useState(true);
  const { restaurantId } = useParams();

  useEffect(() => {
    const fetchRestaurant = async () => {
      await getRestaurantById(`${restaurantId}`);
      setLoading(false);
    };

    fetchRestaurant();
  }, []);
  if (loading) {
    return <div>Loading...</div>;
  }

  const formatAddress = (address) => {
    if (!address) return "";
    const unwantedKeys = ["_id", "__v"];
    const filteredKeys = Object.keys(address).filter(
      (key) => !unwantedKeys.includes(key)
    );
    const order = ["streetName", "streetNumber", "city", "country"];
    return order
      .map((key) => (filteredKeys.includes(key) ? address[key] : ""))
      .filter(Boolean)
      .join(", ");
  };

  const formatOpeningHours = (defaultOpeningTime) => {
    const daysOfWeek = [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ];

    return defaultOpeningTime.map((day, index) => (
      <div key={index}>
        {daysOfWeek[index]}: {day.openingHour} - {day.closingHour}
      </div>
    ));
  };

  const formattedAddress = formatAddress(restaurantInfo.address || {});
  const formattedOpeningHours = formatOpeningHours(
    restaurantInfo.defaultOpeningTime || []
  );

  return (
    <div className="restaurant-container">
      <div className="restaurant-section">
        <img
          className="restaurant-img"
          src={restaurantInfo.image}
          alt={restaurantInfo.restaurantName}
        />
        <ul className="restaurant-information">
          <h1 className="restaurant-header">{restaurantInfo.restaurantName}</h1>
          <div className="restaurant-details-for-page">
            <div>
              <li>
                Phone: <br /> {restaurantInfo.phoneNumber}
              </li>
              <br />
              <br />
              <li>
                Address: <br /> {formattedAddress}
              </li>
            </div>
            <li className="restaurant-opening-hours">
              Opening Hours:
              <br />
              {formattedOpeningHours}
            </li>
          </div>
        </ul>
      </div>
      <NavLink to={`/customer/:customerId/basket/${restaurantId}`}>
        <button className="navbutton-order">🛒 Order</button>
      </NavLink>
      <div className="menu-container-restaurant">
        <RestaurantPageMenu restaurantInfo={restaurantInfo} />
      </div>
    </div>
  );
};

export default RestaurantPage;
