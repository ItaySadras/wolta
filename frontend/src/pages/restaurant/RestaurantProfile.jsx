import React, { useContext, useEffect, useState } from 'react';
import { RestaurantContext } from '../../context/RestaurantContext';

const RestaurantProfile = () => {
 const { getRestaurantById, restaurantInfo } = useContext(RestaurantContext);
 const [loading, setLoading] = useState(true);

 useEffect(() => {
    const fetchRestaurant = async () => {
      await getRestaurantById("65e81e3de6e2c0fa71c34279");
      setLoading(false);
    };
    fetchRestaurant();
 }, [getRestaurantById]);

 if (loading) {
    return <div>Loading...</div>;
 }

 const formatAddress = (address) => {
    if (!address) return ''; 
    const unwantedKeys = ['_id', '__v'];
    const filteredKeys = Object.keys(address).filter(key => !unwantedKeys.includes(key));
    const order = ['streetName', 'streetNumber', 'city', 'country']; 
    return order.map(key => filteredKeys.includes(key) ? address[key] : '').filter(Boolean).join(', ');
 };
 const formattedAddress = restaurantInfo && restaurantInfo.address ? formatAddress(restaurantInfo.address) : '';

 return (
    <div>
      <div>
        <h2>Hello {restaurantInfo?.restaurantName}!</h2>
      </div>
      <div>
        <h3>Email: {restaurantInfo?.email}</h3>
        <button>Edit email</button>
      </div>
      <div>
        <h3>Phone number: {restaurantInfo?.phoneNumber}</h3>
        <button>Edit phone number</button>
      </div>
      <div>
        <h3>Address: {formattedAddress}</h3>
        <button>Edit address</button>
      </div>
      <div>
        <h3>Opening times:</h3>
        <ul>
          {restaurantInfo?.defaultOpeningTime.map((time, index) => (
            <li key={index}>
              {`${time.openingHour} - ${time.closingHour}`}
            </li>
          ))}
        </ul>
        <button>Edit opening times</button>
      </div>
    </div>
 );
};

export default RestaurantProfile;
