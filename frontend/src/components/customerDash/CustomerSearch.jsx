import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "./CustomerSearch.css";
import { CustomerContext } from "../../context/CustomerContext";
import { getRestaurantBySearch } from "../../api";

const CustomerSearch = ({ dispatch, page }) => {
  const [isFormSubmitted, setIsFormSubmitted] = useState(false); // New state variable

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    if (!isFormSubmitted) return; // Prevent submission if the flag is false

    try {
      const response = await getRestaurantBySearch(page, 12, data);
      dispatch({
        type: "update",
        payload: {
          restaurants: response.restaurants,
          dishes: response.dishes,
          callBackFunction: getRestaurantBySearch,
          searchValue: data,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="customer-search-container">
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <form onSubmit={handleSubmit(onSubmit)} className="search-form">
        <input
          placeholder="Search food..."
          {...register("searchInput", { required: true })}
          className="search-input"
          onChange={() => setIsFormSubmitted(true)} // Set the flag to true when the user types
        />
        {errors.searchInput && toast.error("You must search something!")}
        <br />
        <select className="intolerance-input">
          <option value="barbecue">Cuisine/Intolerance</option>
          <option value="barbecue">Barbecue</option>
          <option value="glutenfree">Gluten Free</option>
          <option value="american">American</option>
          <option value="steak">Steak</option>
          <option value="sushi">Sushi</option>
          <option value="seafood">Seafood</option>
          <option value="french">French</option>
          <option value="korean">Korean</option>
          <option value="spanish">Spanish</option>
          <option value="vegan">Vegan</option>
          <option value="vegetarian">Vegetarian</option>
          <option value="kosher">Kosher</option>
          <option value="chinese">Chinese</option>
          <option value="hamburger">Hamburger</option>
          <option value="greek">Greek</option>
          <option value="italian">Italian</option>
          <option value="mexican">Mexican</option>
          <option value="japanese">Japanese</option>
          <option value="thai">Thai</option>
          <option value="mediterranean">Mediterranean</option>
        </select>
        <input type="submit" className="submit-btn" />
      </form>
    </div>
  );
};

export default CustomerSearch;
