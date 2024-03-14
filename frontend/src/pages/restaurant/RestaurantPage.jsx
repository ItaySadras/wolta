import React, { useEffect, useState } from "react";
import "./restaurant.css";
import { NavLink, useParams } from "react-router-dom";
import RestaurantPageMenu from "../../components/RestaurantPage/RestaurantPageMenu";
import LoaderComponent from "../../Loader/LoaderComponent";
import { getRestaurantById } from "../../api";

const RestaurantPage = () => {
  const [restaurantInfo, setRestaurantInfo] = useState(null);
  const [formattedAddress, setFormattedAddress] = useState('');
  const [formattedOpeningHours, setFormattedOpeningHours] = useState([]);
  const { restaurantId,customerId } = useParams();

  useEffect(() => {
    const fetchRestaurant = async () => {
      try {
        const response = await getRestaurantById(restaurantId);
        if (response.status === 200) {
          setRestaurantInfo(response.data.restaurant);
        } else {
          //send to 404 page
        }
      } catch (error) {
      }
    };

    fetchRestaurant();
  }, [restaurantId]);

  useEffect(() => {
    if (restaurantInfo) {
      const address = formatAddress(restaurantInfo.address || {});
      const openingHours = formatOpeningHours(restaurantInfo.defaultOpeningTime || []);
      setFormattedAddress(address);
      setFormattedOpeningHours(openingHours);
    }
  }, [restaurantInfo]);

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
        {daysOfWeek[index]}: {day ? `${day.openingHour} - ${day.closingHour}` : "closed"}
      </div>
    ));
  };
  

  return (
    !restaurantInfo ? (
      <LoaderComponent />
    ) : (
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
        <NavLink to={`/customer/${customerId}/basket/${restaurantId}`}>
          <button className="navbutton-order">🛒 Complete Order</button>
        </NavLink>
        <div className="menu-container-restaurant">
          <RestaurantPageMenu restaurantInfo={restaurantInfo} />
        </div>
      </div>
    )
  );
};

export default RestaurantPage;
