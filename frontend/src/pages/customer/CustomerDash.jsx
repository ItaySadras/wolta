import React, { useContext, useEffect, useReducer, useState } from "react";
import "./CustomerDash.css";
import RestaurantsCustomerDisplay from "./RestaurantsCustomerDisplay";
import { getAllRestaurants } from "../../api";
import DishesCustomerDisplay from "./DishesCustomerDisplay";
import LoaderComponent from "../../Loader/LoaderComponent";
import SearchBox from "./SearchBox";
const InitialState = { dishes: null, restaurants: null };
const reducer = (state, action) => {
  switch (action.type) {
    case "update":
      return {
        restaurants: action.payload.restaurants,
        dishes: action.payload.dishes,
      };

    default:
      break;
  }
};
const CustomerDash = () => {
  const [state, dispatch] = useReducer(reducer, InitialState);



  const fetch = async () => {
    const response = await getAllRestaurants(1, 10);
    dispatch({
      type: "update",
      payload: { restaurants: response.restaurants, dishes: response.dishes },
    });

  };
  useEffect(() => {
    fetch();
  }, []);

  return (
    <div className="customer-dash">
      <SearchBox dispatch={dispatch}/>
      {state.restaurants ? (
        <div>
          <RestaurantsCustomerDisplay restaurants={state.restaurants} />
          <DishesCustomerDisplay dishes={state.dishes} />
        </div>

      ) : (
        <LoaderComponent />
      )}

    </div>
  );
};

export default CustomerDash;
