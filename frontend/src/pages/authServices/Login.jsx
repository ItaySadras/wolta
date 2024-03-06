import React from "react";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

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
      <div>
        <h1>Wolta</h1>
        <h2>Login</h2>
      </div>
      <div>
        <form onSubmit={handleSubmit((data) => console.log(data))}>
          <input
            placeholder="Username"
            {...register("username", { required: true })}
          />
          {errors.username && toast.error("Username is required")}

          <input
            placeholder="Password"
            {...register("password", { required: true })}
          />
          {errors.password && toast.error("Username is required")}

          <input type="submit" />
        </form>
      </div>
      <div>
        <a>Don't have an account?</a>
      </div>
      
    </div>
  );
};

export default Login;
