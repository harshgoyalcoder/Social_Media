import React, { useRef } from 'react';
import './login.css';
import { loginCall } from '../../apiCalls';
import { AuthContext } from '../../context/AuthContext';
import { useContext } from 'react';
// import CircularProgress from '@mui/material/CircularProgress';
import { CircularProgress } from '@mui/material';
import { Link } from 'react-router-dom';

export default function Login() {

  const email=useRef();
  const password=useRef();
  const {isFetching,dispatch}=useContext(AuthContext);
  const handleClick=(e)=>{
   e.preventDefault();
   loginCall({
    email:email.current.value,password:password.current.value
   },dispatch)
  //  console.log(email.current.value)
  }
  return (
    <div className="login">
      <div>
        <div className="loginLeft">
          <h3>Chit-Chat-Connect</h3>
          <span>Connect with friends and the world around you.</span>
        </div>
        <div className="loginRight">
          <form onSubmit={handleClick}>
          
            <input placeholder="Email" className="loginInput" type='email' required ref={email}/>
            <input placeholder="Password" className="loginInput" minLength="5" required type='password' ref={password} />
            <button className="loginButton" type='submit' disabled={isFetching}>{isFetching?<CircularProgress/>:"Log In"}</button>
            <span className="loginForgot">Forgot Password?</span>
            <Link to={"/register"}>
           Create a New Account
            </Link>
              
          
          </form>
            
        </div>
      </div>
    </div>
  )
}
