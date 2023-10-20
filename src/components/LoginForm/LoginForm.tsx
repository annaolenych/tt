import React, { useState } from 'react';
import "./LoginForm.css"
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { Console } from 'console';
import { Environment } from '../../constants/environment';



const LoginForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [error, setError]= useState()
  const [isLoading, setIsLoading]= useState(false)
  console.log(errors);
  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit(async (data) => {
        try {
          setError(undefined)
          setIsLoading(true)
          const res = await axios.post(`${Environment.BACKEND_LINK}/api/login/`, data)
          console.log(res)
        } catch (error) {
          setError(error.response.data.error)
         }finally{
          setIsLoading(false)
         }
      }

      )}>
        {error && <span className='errors-message'>{error}</span>}
        <div>

          <input placeholder='Username' {...register("username", { required: "username is required", maxLength: {value:150, message:"Max username length is 150"} })} />
          <div>{errors?.username && <span className='errors-message'>{errors.username.message.toString()}</span>}</div>
        </div>
        <div>

          <input placeholder='Password' {...register("password", { required: "Password is required", maxLength: {value:128, message:"Max username length is 128"}})} type="password" />
          <div> {errors?.password && <span className='errors-message'>{errors.password.message.toString()}</span>}</div>
        </div>

        <div className="center">
          <button disabled={isLoading} className="btn">
            <svg width="180px" height="60px" viewBox="0 0 180 60" className="border">
              <polyline points="179,1 179,59 1,59 1,1 179,1" className="bg-line" />
              <polyline points="179,1 179,59 1,59 1,1 179,1" className="hl-line" />
            </svg>
            <span >Login</span>
          </button>

        </div>
      </form>
    </div>
  );

};

export default LoginForm;