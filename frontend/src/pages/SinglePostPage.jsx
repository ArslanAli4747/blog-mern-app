import React from 'react'
import NavBar from '../components/navbar/NavBar'
import SinglePost from '../components/singlepost/SinglePost'
import "./singlepostpage.css"
const SinglePostPage = () => {
  return (
    <div className='flex py-16'>
        <SinglePost/>
        <NavBar/>
    </div>
  )
}

export default SinglePostPage