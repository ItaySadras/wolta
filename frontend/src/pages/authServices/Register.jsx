import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "../../components/footer/Footer";
import "./register.css";
import LandingPageNavBar from "../../components/navbars/LandingPageNavBar";
import { NavLink } from "react-router-dom";
import ErrorAlert from "../ErrorAlert";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const handleCloseError = () => {
    setError(null);
  };
  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/registerUser",
        data,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // toast.success("Account created successfully");
      navigate("/login");
    } catch (error) {
      if (error.response.status === 401) {
        setMessage("this user already exist");
        setError(true);
      }
      if (error.response.status === 500) {
        setMessage("surver is busy try again later");
        setError(true);
      }

      toast.error(
        error.response?.data.message || "An error occurred during registration."
      );
    }
  };

  return (
    <>
      <LandingPageNavBar />
      <div className="register-container">
        {/* <ToastContainer position="top-center" autoClose={3000} hideProgressBar newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="dark" /> */}
        <h1>Create an account</h1>
        <div className="register-form">
          <form onSubmit={handleSubmit(onSubmit)}>
            <label>Username</label>
            <input
              className="register-input"
              placeholder="Username"
              {...register("username", { required: true })}
            />
            {errors.username && toast.error("Username is required")}

            <label>Password</label>
            <input
              className="register-input"
              placeholder="Password"
              type="password"
              {...register("password", { required: true })}
            />
            {errors.password && toast.error("Password is required")}

            <label>Confirm password</label>
            <input
              className="register-input"
              placeholder="Confirm Password"
              type="password"
              {...register("confirmPassword", {
                required: "Confirm password is required",
                validate: (value) =>
                  value === watch("password") || "Passwords don't match",
              })}
            />
            {errors.confirmPassword &&
              toast.error(errors.confirmPassword.message)}

            <label>Email</label>
            <input
              className="register-input"
              placeholder="Email"
              {...register("email", { required: true })}
            />
            {errors.email && toast.error("Email is required")}

            <label>Phone number</label>
            <input
              className="register-input"
              placeholder="Phone number"
              {...register("phoneNumber", { required: true })}
            />
            {errors.phoneNumber && toast.error("Phone number is required")}

            <label>Account Type</label>
            <select className="register-input" {...register("accountType")}>
              <option value="customer">Customer</option>
              <option value="courier">Courier</option>
              <option value="restaurant">Restaurant</option>
            </select>
            <input className="register-submit" type="submit" value="Submit" />
          </form>
        </div>
        <div className="register-footer">
          <NavLink to={"/login"}>Already have an account?</NavLink>
        </div>
      </div>
      <Footer />
      <ErrorAlert message={message} open={!!error} onClose={handleCloseError} />
    </>
  );
};

export default Register;
