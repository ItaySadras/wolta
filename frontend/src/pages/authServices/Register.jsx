import React from 'react'
import { useForm } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from '../../components/footer/Footer';


const Register = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
    } = useForm();

    return (
        <div>
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
            </div>
            <div>
                <h1>
                    BaliFood
                </h1>
                <h2>
                    Create an account
                </h2>
            </div>
            <div>
                <form onSubmit={handleSubmit((data) => console.log(data))}>
                    <label>Username</label>
                    <input
                        placeholder='Username'
                        {...register('username', { required: true })}
                    />
                    {errors.username && toast.error("Username is required")}

                    <label>Password</label>
                    <input
                        placeholder='Password'
                        {...register('password', { required: true })}
                    />
                    {errors.password && toast.error("Password is required")}

                    <label>Confirm password</label>
                    <input
                        placeholder='confirm Password'
                        {...register('confirmPassword', {
                            required: true,
                            validate: (value) => {
                                if (watch('password') != value) {
                                    return toast.error("Passwords dont match")
                                }
                            },
                        })}
                    />
                    {errors.confirmPassword && toast.error("Confirm password is required")}

                    <label>Email</label>
                    <input
                        placeholder='Email'
                        {...register('email', { required: true })}
                    />
                    {errors.email && toast.error("Email is required")}

                    <label>Phone number</label>
                    <input
                        placeholder='Phone number'
                        {...register('phoneNumber', { required: true })}
                    />
                    {errors.phoneNum && toast.error("Phone number is required")}

                    <label>Account Type</label>
                    <select {...register("accountType")}>
                        <option value="costumer">Costumer</option>
                        <option value="courier">Courier</option>
                        <option value="restaurant">Restaurant</option>
                    </select>
                    {errors.accountType && toast.error("Account type is required")}

                    <input type="submit" />
                </form>
            </div>
            <div>
                <a>
                    Already have an account?
                </a>
            </div>
            <Footer/>
        </div>
    )
}

export default Register