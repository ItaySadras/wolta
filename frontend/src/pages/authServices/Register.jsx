import React from "react";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "../../components/footer/Footer";
import "./register.css";
import LandingPageNavBar from "../../components/navbars/LandingPageNavBar";
import { NavLink } from "react-router-dom";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  return (
    <>
      <LandingPageNavBar />
      <div className="register-container">
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
        <div className="register-header"></div>
        <h1>Create an account</h1>
        <div className="register-form">
          <form onSubmit={handleSubmit((data) => console.log(data))}>
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
              {...register("password", { required: true })}
            />
            {errors.password && toast.error("Password is required")}

            <label>Confirm password</label>
            <input
              className="register-input"
              placeholder="Confirm Password"
              {...register("ConfirmPassword", {
                required: true,
                validate: (value) => {
                  if (watch("password") !== value) {
                    return toast.error("Passwords don't match");
                  }
                },
              })}
            />
            {errors.confirmPassword &&
              toast.error("Confirm password is required")}

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
            {errors.phoneNum && toast.error("Phone number is required")}

            <label>Account Type</label>
            <select className="register-input2" {...register("accountType")}>
              <option value="customer">Customer</option>
              <option value="courier">Courier</option>
              <option value="restaurant">Restaurant</option>
            </select>
            {errors.accountType && toast.error("Account type is required")}
            <input className="register-submit" type="submit" value="Submit" />
          </form>
        </div>
        <div className="register-footer">
          <NavLink to={"/login"}>
            <p className="register-link">Already have an account?</p>
          </NavLink>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Register;
