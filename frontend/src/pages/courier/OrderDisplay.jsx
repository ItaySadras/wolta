import React from "react";

const OrderDisplay = ({ order }) => {

  return (
    <div className="delivery-header">
      <h1>New Delivery</h1>
      {!order ? (
        <p>Delivery - No Current Deliveries For You</p>
      ) : (
        <div className="delivery-detail">
          <strong>Restaurant:</strong> {order.restaurant?.restaurantName || "N/A"}
          <br />
          {order.restaurant?.address && (
            <>
              <strong>Restaurant Location:</strong>{" "}
              {order.restaurant.address.streetName} {order.restaurant.address.streetNumber}
              {order.restaurant.address.city}
              <br />
            </>
          )}
          <strong>Customer Location:</strong>{" "}
          {order.customer?.addresses?.[0]?.streetName +
            " " +
            order.customer?.addresses?.[0]?.streetNumber || "N/A"}
          <br />
          <strong>Customer PhoneNumber:</strong>{" "}
          {order.customer?.phoneNumber?.[0] || "N/A"}
          <br />
          <strong>Arriving Time:</strong> {order?.arrivingTime || "N/A"}
          <br />
          <br />
        </div>
      )}
    </div>
  );
};

export default OrderDisplay;
