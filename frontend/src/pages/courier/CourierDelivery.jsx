import React, { useEffect, useReducer } from "react";
import axios from "axios";
import LoaderComponent from "../../Loader/LoaderComponent";
import GoogleMapComponent from "../../geoLocation/GoogleMapComponent";
import "./CourierDelivery.css";
import { useParams } from "react-router-dom";

// Define initial state
const initialState = {
  loading: true,
  courier: null,
  customer: null,
  restaurant: null,
  order: null,
  error: null,
};

// Define reducer function
const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_SUCCESS":
      return {
        ...state,
        loading: false,
        courier: action.payload.courier,
        customer: action.payload.customer,
        restaurant: action.payload.restaurant,
        order: action.payload.order,
        error: null,
      };
    case "FETCH_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

const CourierDelivery = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  // const courierId = "65ef24ffdd3a8542f70d1154";
  const { courierId } = useParams();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const Response = await axios.get(
          `http://localhost:8000/api/courier/${courierId}`
        );
        if (Response.data) {
          const courier = Response.data.courier;
          const customer = courier.currentOrder.customer;
          const order = courier.currentOrder;
          const restaurant = courier.currentOrder.restaurant;
          // Dispatch action to update state with fetched data
          dispatch({
            type: "FETCH_SUCCESS",
            payload: { courier, customer, restaurant, order },
          });
        }
      } catch (error) {
        // Dispatch action to handle error
        dispatch({ type: "FETCH_FAILURE", payload: error.message });
      }
    };

    fetchData();
  }, []);

  const { loading, courier, customer, restaurant, order, error } = state;

  return (
    <div className="delivery-container">
      <div className="delivery-header">
        {loading ? <LoaderComponent /> : ""}
        <h1>New Delivery</h1>
        <div className="delivery-detail">
          <strong>Restaurant:</strong> {restaurant?.restaurantName || "N/A"}{" "}
          <br />
          {restaurant?.address && (
            <>
              <strong>Restaurant Location:</strong>{" "}
              {restaurant.address.streetName} {restaurant.address.streetNumber}{" "}
              {restaurant.address.city}
              <br />
            </>
          )}
          <strong>Customer Location:</strong>{" "}
          {customer?.addresses?.[0]?.streetName +
            " " +
            customer?.addresses?.[0]?.streetNumber || "N/A"}{" "}
          <br />
          <strong>Customer PhoneNumber:</strong>{" "}
          {customer?.phoneNumber?.[0] || "N/A"}
          <br />
          {/* <strong>Arriving Time:</strong> {order?.arrivingTime || "N/A"} */}{" "}
          <br />
          <br />
        </div>
      </div>

      {!loading &&
        courier &&
        restaurant &&
        courier.address &&
        restaurant.address && (
          <GoogleMapComponent
            originA={`${courier.address.streetName} ${courier.address.streetNumber} ${courier.address.city} `}
            destinationB={`${restaurant.address.streetName} ${restaurant.address.streetNumber} ${restaurant.address.city}`}
          />
        )}
      <br />
      {!loading &&
        restaurant &&
        customer &&
        restaurant.address &&
        customer.addresses[0] && (
          <GoogleMapComponent
            originA={`${restaurant.address.streetName} ${restaurant.address.streetNumber} ${restaurant.address.city} `}
            destinationB={`${customer.addresses[0].streetName} ${customer.addresses[0].streetNumber} ${customer.addresses[0].city}`}
          />
        )}
    </div>
  );
};

export default CourierDelivery;
