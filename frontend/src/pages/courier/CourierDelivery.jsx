import React, { useContext, useEffect, useReducer, useState } from "react";
import axios from "axios";
import LoaderComponent from "../../Loader/LoaderComponent";
import GoogleMapComponent from "../../geoLocation/GoogleMapComponent";
import "./CourierDelivery.css";
import { useParams } from "react-router-dom";
import { SocketContext } from "../../context/SocketContext";
import OrderDisplay from "./OrderDisplay";
import CourierDash from "./CourierDash";

const CourierDelivery = () => {
  const socket = useContext(SocketContext);
  const [render, setRender] = useState(false);
  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState(null);
  const [courier, setCourier] = useState(null);

  if (socket) {
    socket.on("newOrder", () => {
      console.log("got to delivery gut");
      setRender(true);
    });
  }
  const { courierId } = useParams();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const Response = await axios.get(
          `http://localhost:8000/api/courier/${courierId}`
        );
        if (Response.data) {
          setCourier(Response.data.courier);
          setOrder(Response.data.courier.currentOrder);
        }
      } catch (error) {
        // Dispatch action to handle error
      }
      setLoading(false);
    };

    fetchData();
  }, [render]);

  if (loading) {
    return <LoaderComponent />;
  }

  return (
    <div>
      <CourierDash setRender={setRender}></CourierDash>
      <div className="delivery-container">
        {order ? (
          <>
            <OrderDisplay order={order} />

            <GoogleMapComponent
              originA={`${courier.address.streetName} ${courier.address.streetNumber} ${courier.address.city} `}
              destinationB={`${order.restaurant.address.streetName} ${order.restaurant.address.streetNumber} ${order.restaurant.address.city}`}
              mode={courier.vehicleType}
            />

            <br />

            <GoogleMapComponent
              originA={`${order.restaurant.address.streetName} ${order.restaurant.address.streetNumber} ${order.restaurant.address.city} `}
              destinationB={`${order.customer.addresses[0].streetName} ${order.customer.addresses[0].streetNumber} ${order.customer.addresses[0].city}`}
              mode={courier.vehicleType}
            />
          </>
        ) : (
          <p>Delivery - No Current Deliveries For You</p>
        )}
      </div>
    </div>
  );
};

export default CourierDelivery;
