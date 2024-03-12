import React, { useContext, useEffect, useReducer, useState } from "react";
import "./CustomerDash.css";
import RestaurantsCustomerDisplay from "./RestaurantsCustomerDisplay";
import { getAllRestaurants, getRestaurantBySearch } from "../../api";
import DishesCustomerDisplay from "./DishesCustomerDisplay";
import LoaderComponent from "../../Loader/LoaderComponent";
import SearchBox from "./SearchBox";
import ErrorAlert from "../ErrorAlert";
const InitialState = {
  dishes: [],
  restaurants: [],
  page: 1,
  loading: true,
  callBackFunction: getAllRestaurants,
  searchValue: "",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "update":
      return {
        ...state,
        callBackFunction: action.payload.callBackFunction,
        restaurants: action.payload.restaurants,
        dishes: action.payload.dishes,
        searchValue: action.payload.searchValue,
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
        loading: false,
      };

    default:
      break;
  }
};
const CustomerDash = () => {
  const [state, dispatch] = useReducer(reducer, InitialState);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  const fetchMoreDishes = async () => {
    try {
      dispatch({
        type: "loading",
      });
      const response = await state.callBackFunction(
        state.page + 1,
        12,
        state.searchValue
      );
      if (response.data.dishes.length === 0) {
        dispatch({
          type: "loadingStop",
        });
        setMessage("there is no more results ");
        setError(true);
      } else {
        dispatch({
          type: "add",
          payload: { dishes: response.data.dishes },
        });
      }
    } catch (error) {
      dispatch({
        type: "loadingStop",
      });
      setMessage("something want wrong ");
      setError(true);
    }
  };
  const handleCloseError = () => {
    setError(null);
  };
  const fetch = async () => {
    try {
      const response = await getAllRestaurants(state.page, 12);
      if (response.status !== 200) {
        setMessage("something want wrong ");
        setError(true);
      } else {
        dispatch({
          type: "update",
          payload: {
            restaurants: response.data.restaurants,
            dishes: response.data.dishes,
            callBackFunction: getAllRestaurants,
          },
        });
      }
    } catch (error) {
      setMessage("something want wrong ");
      setError(true);
    }
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
      <ErrorAlert message={message} open={!!error} onClose={handleCloseError} />
    </div>
  );
};

export default CustomerDash;
