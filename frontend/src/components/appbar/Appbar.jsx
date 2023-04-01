import React from 'react'
import { Link } from 'react-router-dom'
import { usecontext } from '../store/contextApi'
import "./style.css"
const Appbar = () => {
  const {user,dispatch} = usecontext()
  const PF = "http://localhost:5000/images/"
  console.log(user);
 
  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };
  return (
    <div className='w-full flex py-1 fixed top-0 left-0 z-50 bg-slate-800'>
      <div className="icons flex justify-center items-center gap-2 text-xl text-gray-500">
      <i className="fa-brands fa-square-facebook"></i>
      <i className="fa-brands fa-square-twitter"></i>
      <i className="fa-brands fa-square-pinterest"></i>
      <i className="fa-brands fa-square-instagram"></i>
      </div>
      <div className="menu flex justify-center items-center text-gray-500 font-semibold">
        <ul className='flex justify-center items-center gap-2 text-sm'>
          <Link to="/">
          <li>HOME</li>
          </Link>
          <li>ABOUT</li>
          <li>CONTACT</li>
          <Link to="/writepost"><li>WRITE</li></Link>
         {
          user &&  <li onClick={handleLogout}>LOGOUT</li>
         }
        </ul>

      </div>
      <div className="image flex justify-center items-center gap-5 text-xl text-gray-400">
        {
          user?(
            <Link to="/settings">
              {
                user.profile?(
                  <img className='h-10 w-10 object-cover rounded-full' src={PF+user.profile} alt="profile"/>
      
                ):(
                  <i className="fa-regular fa-user"></i>
                )
              }
        </Link>
          ):
          (
            <div className='flex text-sm gap-2'>
              <Link to="/login">
              <span className='hover:underline'>LOGIN</span>
            </Link>
            <Link to="/register">
              <span className='hover:underline'>REGISTER</span>
            </Link>
            </div>
          )
        }
        <i className="fa-solid fa-magnifying-glass"></i>
      </div>
    </div>
  )
}

export default Appbar