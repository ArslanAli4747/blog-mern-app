import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import { usecontext } from '../store/contextApi';
import "./style.css"
const SinglePost = () => {
  const {user} = usecontext()
    const [post, setPost] = useState({});
    const PF = "http://localhost:5000/images/";
    const location = useLocation();
    const path = location.pathname.split("/")[2];

    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [updateMode, setUpdateMode] = useState(false);
    const [auther,setAuthor] =useState("")
    const [id,setId] = useState("")
    const [isloading, setloading] = useState(false);
    
    useEffect(() => {
      window.scrollTo(0,0)
        const getPost = async () => {
          setloading(true)
          const res = await axios.get("http://localhost:5000/api/posts/" + path);
            const result  = res.data
            console.log(result.data,result.id);
          setPost(result.data);
          setTitle(result.data.title);
          setDesc(result.data.description);
          setAuthor(result.data.username)
          setId(result.id)
          setloading(false)
          
        };
        getPost();
        
      }, [path]);
      const handleDelete = async () => {
        try {
          await axios.delete(`http://localhost:5000/api/posts/${id}`, {
            data: { username: user.username },
          });
          window.location.replace("/");
        } catch (err) {}
      };
  return (
    <div className='single flex flex-col py-1 px-2 gap-2 pr-12'>
      {
        isloading?(
          <p>loading..</p>
        ):
        (
          <>
             <div>
        {
           post.image &&    <img className='w-full h-[400px] object-cover rounded-sm' src={PF+post.image} alt="postimage"/>
    
        }
    </div>
    <div className='w-full flex'>
        <p className='tittle text-xl font-bold'>{title}

        </p>
        <div className='updateicons text-xl'>

        {
          post.username === user?.username&&(
        <>
            <i className="text-blue-500 fa-solid fa-pen-to-square cursor-pointer hover:text-blue-400"></i>
            <i onClick={handleDelete} className="text-pink-600 fa-solid fa-trash-can cursor-pointer hover:text-pink-500"></i>
        
        </>
          )
        }  
        </div>
    </div>
    <div className='flex mt-1 text-gray-500 w-full justify-between items-center px-2'>
    <span>
        Author : {auther}
    </span>
    <span>
    {post.createdAt && new Date(post.createdAt._seconds*1000+post.createdAt._nanoseconds/1000000).toDateString()}
    </span>
    </div>
    <p className='singledescription w-full first-letter:text-xl first-letter:ml-7 px-2 text-sm  '>
    {desc}
    </p></>
        )
      }
    </div>
  )
}

export default SinglePost