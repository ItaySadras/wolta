import React from "react";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CustomerSearch = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      // search functionality
      console.log(data);
      navigate("/customer/searchResults");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
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
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          placeholder="Search food..."
          {...register("searchInput", { required: true })}
        />
        {errors.searchInput && toast.error("You must search something!")}

        <input type="submit" />
      </form>
    </div>
  );
};

export default CustomerSearch;
