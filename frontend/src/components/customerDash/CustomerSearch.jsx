import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "./CustomerSearch.css";
import { CustomerContext } from "../../context/CustomerContext";

const CustomerSearch = () => {
  const navigate = useNavigate();

  const { getRestaurantBySearch } = useContext(CustomerContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      getRestaurantBySearch(data);
      console.log(data);
      navigate("/customer/searchResults");
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
        />
        {errors.searchInput && toast.error("You must search something!")}

        <input type="submit" className="submit-btn" />
      </form>
    </div>
  );
};

export default CustomerSearch;
