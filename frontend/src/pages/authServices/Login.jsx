import React from 'react'
import { useForm } from 'react-hook-form'

const Login = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    return (
        <div>
            <div>
                <h1>
                    Wolta
                </h1>
                <h2>
                    Login
                </h2>
            </div>
            <div>
                <form onSubmit={handleSubmit((data) => console.log(data))}>
                    <input
                        placeholder='Username'
                        {...register('username', { required: true })}
                    />
                    {errors.username && <p>Username is required.</p>}
                    
                    <input
                        placeholder='Password'
                        {...register('password', { required: true })}
                    />
                    {errors.password && <p>Password is required.</p>}

                    <input type="submit" />
                </form>
            </div>
            <div>
                <a>
                    Don't have an account?
                </a>
            </div>
        </div >
    )
}

export default Login