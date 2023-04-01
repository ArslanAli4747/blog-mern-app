import axios from 'axios';
import React, { Suspense, useEffect, useState } from 'react';
import './style.css';

const Post = React.lazy(() => import('../post/Post'));

const Posts = () => {
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchpost = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/posts');
        setPost(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchpost();
  }, []);

  return (
    <div className='posts w-full flex justify-evenly flex-wrap py-5'>
      {post ? (
        post.map((p, index) => (
          <Suspense fallback={<p className='w-full text-green-400'>Loading posts...</p>} key={index}>
            <Post id={p.id} data={p.data} />
          </Suspense>
        ))
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Posts;
