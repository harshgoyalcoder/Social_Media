import React, { useRef } from 'react';
import './register.css';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';

export default function Register() {

const username=useRef();
const email=useRef();
const password=useRef();
const passwordAgain=useRef();
const navigate =useNavigate();


const handleSubmit=async (e)=>{
  e.preventDefault();
  if(passwordAgain.current.value !== password.current.value){
    passwordAgain.current.setCustomValidity("Password don't match!");
  }else{
    const user={
      username:username.current.value,
      email:email.current.value,
      password:password.current.value,
    }
    try{
      await axios.post("/auth/register",user);
      navigate("/login");

    // console.log(res.data)
    }catch(err){
      console.log(err)
    }

  }
}

  return (
    <div className="login">
      <div>
        <div className="loginLeft">
          <h3>Chit-Chat-Connect</h3>
          <span>Connect with friends and the world around you.</span>
        </div>
        <div className="loginRight">
          <form className="loginRightForm"  onSubmit={handleSubmit}>
            <input placeholder="Username" required ref={username} className="loginInput" />
            <input placeholder="Email" required ref={email}  className="loginInput" />
            <input placeholder="Password" minLength="5" required ref={password} className="loginInput" type='password' />
            <input placeholder="Confirm Password" required ref={passwordAgain} className="loginInput" type='password'  />
            <button className="loginButton" type='submit'>Sign Up</button>
            <button className="loginRegisterButton">Log into Account</button>
            <Link to={"/login"}>
           Already have a account?
            </Link>
              
          </form>
        </div>
      </div>
    </div>
  )
}
