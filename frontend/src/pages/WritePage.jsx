import axios from 'axios'
import React, { useState } from 'react'
import { usecontext } from '../components/store/contextApi'
import "./write.css"
const WritePage = () => {
  const {user} = usecontext()
  const [title, setTitle] = useState("");
  const [description, setDesc] = useState("");
  const [file, setFile] = useState(null);
  const  handlesubmi=async(e)=>{
    e.preventDefault();
    const newpost = {
      username:user.username,
      tittle:title,
      description:description
    }
    if(file){
      const data = new FormData();
      const filename = Date.now()+file.name;
      data.append("name",filename);
      data.append("file",file);
      newpost.image = filename;
      try {
        await axios.post("http://localhost:5000/api/upload",data)
      } catch (error) {
        console.log(error);
      }
    }
    try {
      const res = await axios.post("http://localhost:5000/api/posts",newpost)
      console.log(res);
      window.location.replace("/")
    } catch (error) {
     console.log("post : ",error); 
    }
    
  }
  return (
    <div className='flex w-full relative px-20 lg:px-44 flex-col pt-20 gap-4'>
    {
      file && (    <img className='w-full object-cover rounded-md h-[250px]' src={URL.createObjectURL(file)} alt='writeimage'/>
      )
    }
    <div className='w-full flex justify-center items-center gap-2'>
        <label htmlFor='image'>
        <i className="font-bold text-xl cursor-pointer hover:text-gray-600 fa-solid fa-plus"></i>
        </label>
        <input onChange={(e)=>{
          setFile(e.target.files[0])
        }} type="file" id='image' style={{
            display:"none"
        }}/>
        <input   onChange={e=>setTitle(e.target.value)} className='w-full border-2 py-2 outline-none rounded-md px-2' type="text" placeholder='Tittle...'/>
    </div>
    <textarea  onChange={e=>setDesc(e.target.value)} className='outline-none py-2 border-2 rounded-md px-2'  type="text" placeholder='Tell your story...' rows="8"/>
    <button onClick={handlesubmi} className='bg-green-500  w-24 h-8 rounded-md  cursor-pointer hover:bg-green-400 mb-8'>
        Publish
    </button>
    </div>

  )
}

export default WritePage