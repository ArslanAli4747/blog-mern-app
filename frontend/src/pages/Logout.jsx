import axios from 'axios';
import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import "./logout.css"
const Logout = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [errmessage,setmessage] = useState("")
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);
    try {
      const res = await axios.post("http://localhost:5000/api/auth/register", {
        username,
        email,
        password,
      });
      // console.log(res.data)
      res.data && window.location.replace("/login");
    } catch (err) {
      console.log(err);
      setmessage(err.response.data)
      setError(true);
    }
  };
  return (
    <div className='flex w-full h-screen justify-center items-center'>
      <div className="login border-2 px-10 w-1/2 sm:w-1/3 rounded-md py-10 flex flex-col gap-5 bg-slate-700">
      <div className='flex flex-col gap-1'>
       <label  className='text-white text-sm' htmlFor='Username '>
          Username
        </label>
        <input onChange={(e) => setUsername(e.target.value)} className='text-sm w-full outline-none border-2 py-1 px-2 rounded-md' type="text" id='Username' name='Username' placeholder='Username'/>
       </div>
       <div className='flex flex-col gap-1'>
       <label className='text-white text-sm' htmlFor='email '>
          Email
        </label>
        <input  onChange={(e) => setEmail(e.target.value)} className='text-sm w-full outline-none border-2 py-1 px-2 rounded-md' type="email" id='email' name='email' placeholder='Email'/>
       </div>
       <div className='flex flex-col gap-1'>
       <label className='text-white text-sm' htmlFor='Password'>
          Password
        </label>
        <input onChange={(e) => setPassword(e.target.value)} className='w-full outline-none border-2 py-1 text-sm px-2 rounded-md' type="password" id='Password' name='Password' placeholder='Password'/>
       </div>
        <p className='flex w-full justify-center text-sm font-semibold '>
          <Link to="/login"><span className='text-white hover:text-pink-500 cursor-pointer'>Login?</span></Link>
        </p>
        <button onClick={handleSubmit} className='bg-pink-700 flex justify-center ml-10 mr-10 py-1 rounded-md text-sm text-white hover:bg-pink-500'>signUP</button>
        {error && <span style={{color:"red", marginTop:"10px"}}>{errmessage}</span>}
      </div>
    </div>
  )
}

export default Logout