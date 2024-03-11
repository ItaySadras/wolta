import React, { useState, useEffect } from 'react';
import './CourierDelivery.css'; 


const CourierDelivery = () => {

    useEffect(() => {
        const fetchCustomerDetails = async () => {
          const details = await getCustomerDetails(customerId);
          if (details) {
            setCustomer(details);
          }
        };
        fetchCustomerDetails();
      }, []);

  const [deliveryDetails, setDeliveryDetails] = useState({
    restaurantName: '',
    restaurantLocation: '',
    arrivingTime: '',
    customerLocation: '',
    customerPhone:'',
  });

  
  

  return (
    <div className='delivery-container'>
      <div className='delivery-header'>
        <h1>New Delivery</h1>
        <div className='delivery-detail'>
          <strong>Restaurant:</strong> {deliveryDetails.restaurantName} <br />
          <strong>Restaurant Location:</strong> {deliveryDetails.restaurantLocation} <br />
          <strong>Arriving Time:</strong> {deliveryDetails.arrivingTime} <br />
          <strong>Customer Location:</strong> {deliveryDetails.customerLocation}<br />
          <strong>Customer PhoneNumber:</strong> {deliveryDetails.customerPhone}
        </div>
      </div>
    </div>
  );
};

export default CourierDelivery;
