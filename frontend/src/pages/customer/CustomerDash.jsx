import React, { useContext, useEffect, useReducer, useState } from "react";
import "./CustomerDash.css";
import RestaurantsCustomerDisplay from "./RestaurantsCustomerDisplay";
import { getAllRestaurants,getRestaurantBySearch } from "../../api";
import DishesCustomerDisplay from "./DishesCustomerDisplay";
import LoaderComponent from "../../Loader/LoaderComponent";
import SearchBox from "./SearchBox";
const InitialState = {
  dishes: [],
  restaurants: [],
  page: 1,
  loading: true,
  callBackFunction:getAllRestaurants,
  searchValue:""
};
const reducer = (state, action) => {
  switch (action.type) {
    case "update":
      return {
        ...state,
        callBackFunction:action.payload.callBackFunction,
        restaurants: action.payload.restaurants,
        dishes: action.payload.dishes,
        searchValue:action.payload.searchValue,
        page: 1,
        loading: false,
      };
    case "add":
      return {
        ...state,
        page: state.page + 1,
        dishes: [...state.dishes, ...action.payload.dishes],
        loading: false,
      };
    case "loading":
      return {
        ...state,
        loading: true,
      };
    case "loadingStop":
      return {
        ...state,
        loading: true,
      };

    default:
      break;
  }
};
const CustomerDash = () => {
  const [state, dispatch] = useReducer(reducer, InitialState);
  const fetchMoreDishes = async () => {
    dispatch({
      type: "loading",
    });
    const response = await state.callBackFunction(state.page + 1, 12,state.searchValue);
    console.log("🚀 ~ fetchMoreDishes ~ response:", response)
    dispatch({
      type: "add",
      payload: { dishes: response.dishes },
    });
  };

  const fetch = async () => {
    const response = await getAllRestaurants(state.page, 12);
    dispatch({
      type: "update",
      payload: { restaurants: response.restaurants, dishes: response.dishes,callBackFunction:getAllRestaurants},
    });
  };
  useEffect(() => {
    fetch();
  }, []);

  return (
    <div className="customer-dash">
      <SearchBox dispatch={dispatch} page={state.page} />
      {state.restaurants.length > 0 && (
        <div>
          <RestaurantsCustomerDisplay restaurants={state.restaurants} />
          <DishesCustomerDisplay dishes={state.dishes} />
        </div>
      )}
      {state.loading && <LoaderComponent />}
      <button onClick={() => fetchMoreDishes()}>load more</button>
    </div>
  );
};

export default CustomerDash;
