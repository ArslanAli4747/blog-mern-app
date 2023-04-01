import axios from 'axios'
import React, { useEffect, useState } from 'react'
import "./style.css"
const NavBar = () => {
const [cat,setCat] = useState(null)

useEffect(()=>{
  const fetchCat = async()=>{
    const res = await axios.get("http://localhost:5000/api/category")
 
    setCat(res.data.data)
    // console.log(res.data.data);
  }
  fetchCat()
},[])
  return (
    <div className='navbar relative py-1 px-1  gap-2 flex flex-col'>
     
     <p className='about py-2 w-full text-center font-bold mt-5 mb-5 border-b-2 border-b-gray-400  border-t-2 border-t-gray-400'>ABOUT ME</p>
      <img className='rounded w-full object-cover' src='https://images.unsplash.com/photo-1497316730643-415fac54a2af?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80' alt="aboutme"/>
      <p className='w-full flex justify-center items-center mt-5'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nemo natus officia, omnis voluptates possimus eligendi expedita sunt quis. Non consectetur.</p>
      <p className='flex w-full justify-center py-2 mt-5 mb-5 border-b-2 border-b-gray-400  border-t-2 border-t-gray-400 font-bold'>CATEGORIES</p>
      <ul className='cat items-center py-4 mb-4 px-2'>
           {
            cat && cat.map((c,index)=>(
              <li className='hover:underline' key={index}>
                  {c.category}
              </li>
            ))
           }
        </ul>
        <p className='flex w-full justify-center font-bold border-b-2 border-b-gray-400  border-t-2 border-t-gray-400 py-2 mb-4'>
            FOLLOW US
        </p>
        <div className="followicon flex justify-center items-center gap-2 text-2xl text-gray-500">
      <i className="fa-brands fa-square-facebook"></i>
      <i className="fa-brands fa-square-twitter"></i>
      <i className="fa-brands fa-square-pinterest"></i>
      <i className="fa-brands fa-square-instagram"></i>
      </div> 
    </div>
  )
}

export default NavBar