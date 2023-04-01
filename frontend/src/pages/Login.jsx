import axios from 'axios';
import React, { useRef } from 'react'
import { Link } from 'react-router-dom';
import { usecontext } from '../components/store/contextApi';
import "./login.css"
const Login = () => {
  const userRef = useRef();
  const passwordRef = useRef();
  const {dispatch,isFetching}  = usecontext()
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "login_start" });
    try {
      console.log("hah");
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email: userRef.current.value,
        password: passwordRef.current.value,
      });
      console.log(res.data);
      dispatch({ type: "login_success", payload: res.data });
      window.location.replace("/")
    } catch (err) {
      console.log(err);
      dispatch({ type: "loagin_fail" });
    }
  };
  return (
    <div className='flex w-full h-screen justify-center items-center'>
      <div className="login border-2 px-10 w-1/2 sm:w-1/3 rounded-md py-10 flex flex-col gap-5 bg-slate-700">
       <div className='flex flex-col gap-1'>
       <label className='text-white text-sm' htmlFor='email '>
          Email
        </label>
        <input   ref={userRef} className='text-sm w-full outline-none border-2 py-1 px-2 rounded-md' type="email" id='email' name='email' placeholder='Email'/>
       </div>
       <div className='flex flex-col gap-1'>
       <label className='text-white text-sm' htmlFor='Password'>
          Password
        </label>
        <input    ref={passwordRef} className='text-sm w-full outline-none border-2 py-1 px-2 rounded-md' type="password" id='Password' name='Password' placeholder='Password'/>
       </div>
        <p className='flex w-full justify-center text-sm font-semibold '>
        <Link to="/register">
        <span className='text-white hover:text-pink-500 cursor-pointer'>SignUP?</span>
        
        </Link>
        </p>
        <button onClick={handleSubmit}  className='bg-pink-700 text-sm flex justify-center ml-10 mr-10 py-2 rounded-md text-white hover:bg-pink-500'>Login</button>
      </div>
    </div>
  )
}

export default Login