import React, { useState } from 'react';
import './LoginForm.css';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { Console } from 'console';



const LoginForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  console.log(errors);
  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit((data) =>

        console.log(data, errors)
      )}>
        <div>
          
          <input placeholder='Email' {...register("email", { required: "Email is required", pattern: { value: /^[\w-.]+@([\w-]+.)+[\w-]{2,4}$/, message: "Emai is invalid" } })} />
          {errors?.email && <span className='errors-message'>{errors.email.message.toString()}</span>}
        </div>
        <div>
          
          <input placeholder='Password' {...register("password", { required: "Password is required", })} type="password" />
          {errors?.password && <span className='errors-message'>{errors.password.message.toString()}</span>}
        </div>
        <button type="submit" className="login-button">Log In</button>
      </form>
    </div>
  );

};

export default LoginForm;