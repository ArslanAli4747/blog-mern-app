import React from 'react'
import Header from '../components/header/Header'
import NavBar from '../components/navbar/NavBar'
import Posts from '../components/posts/Posts'
import "./home.css"
const HOME = () => {
  return (
    <div className='home pt-40 relative min-h-screen w-full px-1'>
        <Header/>
        <div className='flex w-full relative px-6'>
            <Posts/>
            <NavBar/>            
        </div>
    </div>
  )
}

export default HOME