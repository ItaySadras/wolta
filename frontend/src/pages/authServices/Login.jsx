import React, { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/footer/Footer";
import LandingPageNavBar from "../../components/navbars/LandingPageNavBar";
import { NavLink } from "react-router-dom";
import axios from "axios";
import "./login.css";
import ErrorAlert from "../ErrorAlert";
import { SocketContext } from "../../context/SocketContext";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const socket = useContext(SocketContext);
  const handleCloseError = () => {
    setError(null);
  };

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/logInUser",
        data,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        toast.success("Logged in successfully");

        console.log("🚀 ~ onSubmit ~ socket:", socket)
        if (socket) {
          const userType = response.data.accountType;
          const userId = response.data[userType]._id;
          const socketStorageId = localStorage.getItem("socketId");

          console.log("🚀 ~ onSubmit ~ socket:", socket)
          socket.emit("userLogged", { userType, userId, socketStorageId });
        }

        switch (response.data.accountType) {
          case "customer":
            navigate(`/customer/${response.data.customer._id}/dashboard`);
            break;
          case "restaurant":
            navigate(`/restaurant/${response.data.restaurant._id}/menu`);
            break;
          case "courier":
            navigate(`/courier/${response.data.courier._id}/delivery`);
            break;

          default:
            break;
        }
      } else {
        toast.error(
          response.data.message ||
            "Login failed. Check your email and password."
        );
      }
    } catch (error) {
      console.error("Login error:", error);
      if (error.response) {
        toast.error(
          error.response.data.message || "An error occurred during login."
        );
      } else if (error.request) {
        toast.error("No response from server. Check your network connection.");
      } else {
        toast.error("Error: " + error.message);
      }
    }
  };

  return (
    <>
      <LandingPageNavBar />
      <div className="login-container">
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
        <h1>Log in</h1>
        <div className="login-form">
          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              className="login-input"
              type="email"
              placeholder="Email"
              {...register("email", {
                required: "Email is required",
                pattern: /^\S+@\S+\.\S+$/,
              })}
            />
            {errors.email && (
              <p className="error-message">{errors.email.message}</p>
            )}

            <input
              className="login-input"
              type="password"
              placeholder="Password"
              {...register("password", { required: "Password is required" })}
            />
            {errors.password && (
              <p className="error-message">{errors.password.message}</p>
            )}
            <label>Account Type</label>
            <select className="register-input" {...register("accountType")}>
              <option value="customer">Customer</option>
              <option value="courier">Courier</option>
              <option value="restaurant">Restaurant</option>
            </select>

            <input className="login-submit" type="submit" value="Submit" />
          </form>
        </div>
        <div className="login-footer">
          <NavLink to="/register">
            <p className="login-link">Don't have an account?</p>
          </NavLink>
        </div>
      </div>
      <Footer />
      <ErrorAlert message={message} open={!!error} onClose={handleCloseError} />
    </>
  );
};

export default Login;
