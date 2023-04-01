import React from 'react'
import { Link } from 'react-router-dom'
import "./style.css"
const Post = ({id,data}) => {
// console.log(id);
// console.log(data);
const PF = "http://localhost:5000/images/";
const date = new Date(data.createdAt._seconds*1000+data.createdAt._nanoseconds/1000000).toDateString()
  return (
    <div className='flex w-[280px] py-2 flex-col mb-20 px-5'>
        <div>
            {data.image && <img className='w-full object-cover h-[250px] rounded-xl' src={PF+data.image} alt='postimage'/>
        }
        </div>
            <div className='postCategory flex w-full justify-center py-2 text-gray-600 gap-2'>
                <span>{data.category}</span>
                <span>{data.category}</span>
            </div>
           <Link to={`/post/${id}`}>
           <p className='hover:underline postTitle w-full justify-center flex font-bold text-lg text-center'>
                {data.tittle}
            </p>
            </Link>
            <div className='postDate flex w-full justify-center py-2 text-gray-600 gap-2'>
                <span>{date}</span>
              
            </div>
            <p className='postDescription w-full'>
            {data.description}
            </p>
            
    </div>
  )
}

export default Post