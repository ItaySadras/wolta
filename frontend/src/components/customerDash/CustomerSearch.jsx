import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "./CustomerSearch.css";
import { CustomerContext } from "../../context/CustomerContext";
import { getRestaurantBySearch } from "../../api";

const CustomerSearch = ({dispatch,page}) => {
 const navigate = useNavigate();
 const [isFormSubmitted, setIsFormSubmitted] = useState(false); // New state variable

 const {
    register,
    handleSubmit,
    formState: { errors },
 } = useForm();

 const onSubmit = async (data) => {
    if (!isFormSubmitted) return; // Prevent submission if the flag is false

    try {
      const response = await getRestaurantBySearch(page,12,data);
      dispatch({
        type: "update",
        payload: { restaurants: response.restaurants, dishes: response.dishes,callBackFunction:getRestaurantBySearch,searchValue:data},
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

        <input type="submit" className="submit-btn" />
      </form>
    </div>
 );
};

export default CustomerSearch;
