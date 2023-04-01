import React from 'react'
import "./style.css"
const Header = () => {
  return (
    <div className='flex w-full relative flex-col'>
      <p className='flex flex-col w-full justify-center items-center gap-2 absolute top-[-54px]'>
        <span className='text-gray-500'>React & Node </span>
        <span className='text-4xl font-bold'>Blog</span>
      </p>
      <img className='block w-full h-[400px] object-cover' src='https://images.pexels.com/photos/2739013/pexels-photo-2739013.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
      alt='headerImage'
      >
      </img>

    </div>
  )
}

export default Header