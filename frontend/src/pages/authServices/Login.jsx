import React from "react";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "../../components/footer/Footer";
import "./login.css";
import LandingPageNavBar from "../../components/navbars/LandingPageNavBar";
import { NavLink } from "react-router-dom";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

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
        <div className="login-header"></div>
        <h1>Log in</h1>
        <div className="login-form">
          <form onSubmit={handleSubmit((data) => console.log(data))}>
            <input
              className="login-input"
              placeholder="Username"
              {...register("username", { required: true })}
            />
            {errors.username && toast.error("Username is required")}

            <input
              className="login-input"
              placeholder="Password"
              {...register("password", { required: true })}
            />
            {errors.password && toast.error("Password is required")}

            <input className="login-submit" type="submit" value="Submit" />
          </form>
        </div>
        <div className="login-footer">
          <NavLink to={"/register"}>
            <p className="login-link">Don't have an account?</p>
          </NavLink>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;
