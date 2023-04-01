import axios from 'axios'
import React, { useState } from 'react'
import NavBar from '../components/navbar/NavBar'
import { usecontext } from '../components/store/contextApi'
import "./setting.css"
const Settings = () => {
    const {user,dispatch} = usecontext();
    const [file,setFile] = useState(null);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [success, setSuccess] = useState(false);
    const [update,setupdate] = useState(false)
    const PF = "http://localhost:5000/images/"
    const handleSubmit = async (e) => {
        e.preventDefault();
        setupdate(true)
        dispatch({ type: "UPDATE_START" });
        const updatedUser = {
          userId: user._id,
          username,
          email,
          password,
        };
        if (file) {
          const data = new FormData();
          const filename = Date.now() + file.name;
          data.append("name", filename);
          data.append("file", file);
          updatedUser.profile = filename;
          try {
            await axios.post("http://localhost:5000/api/upload", data);
          } catch (err) {
            console.log(err);
          }
        }
        try {
          const res = await axios.put("http://localhost:5000/api/users/" + user._id, updatedUser);
          setSuccess(true);
          setupdate(false)
          // dispatch({ type: "UPDATE_SUCCESS", payload: res.data });
        } catch (err) {
          dispatch({ type: "UPDATE_FAILURE" });
        }
      };
  return (
    <div className='flex py-16'>
        <div className='settings flex flex-col px-8 md:pr-32 pt-5'>
            <p className='md:text-2xl flex text-pink-700 w-full justify-between pr-5'>
                <span className='font-bold'>Update Your Account</span>
                <span className='hover:text-pink-400 cursor-pointer text-sm font-semibold'>Delete account</span>
            </p>
            <div className='flex flex-col py-2 mt-4 font-semibold gap-2'>
            <p className='text-sm'>Profile Picture</p>
            <div className='flex gap-4 items-center'>
                <img className='h-16 w-16 object-cover rounded-lg' src={file?URL.createObjectURL(file):PF+user.profile} alt='profileimage'/>
                <label htmlFor='profile'>
                <i className="fa-regular fa-circle-user text-2xl text-pink-700 hover:text-pink-500 cursor-pointer"></i>
                </label>
                <input    onChange={(e) => setFile(e.target.files[0])} type="file" id='profile' name='profile' style={{
                    display:"none"
                }} />
            </div>
        
            </div>
            <div className='flex flex-col py-2 mt-8 gap-5 w-full sm:w-[50%] '>
               <div className='flex flex-col gap-1'>
               <label htmlFor='uname'>
                    Username
                </label>
                <input className='py-2 outline-none border-2 px-2 rounded-md' type="text" name='uname' id='uname'     placeholder={user.username}
            onChange={(e) => setUsername(e.target.value)}/>
                
               </div>
                <div className='flex flex-col gap-1'>
                <label htmlFor='email'>
                    Email
                </label>
                <input className='py-2 outline-none border-2 px-2 rounded-md' type="email" name='email' id='email' placeholder={user.email}
            onChange={(e) => setEmail(e.target.value)}/>
             
                </div>
                <div className='flex flex-col gap-1'>
                <label htmlFor='pass'>
                    Password
                </label>
                <input className='py-2 outline-none border-2 px-2 rounded-md' type="password" name='pass' id='pass' placeholder='.......'     onChange={(e) => setPassword(e.target.value)}
          />
            
             </div>
            </div>
            <button onClick={handleSubmit} className='mt-5 w-20 h-10 bg-pink-700 rounded-md hover:bg-pink-500'>{update?"Updating..":"update"}</button>
            {success && (
            <span
              style={{ color: "green", textAlign: "center"}}
            >
              Profile has been updated...
            </span>
          )}
        </div>
        <NavBar/>
    </div>
  )
}

export default Settings