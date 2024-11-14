import React from 'react'
import Post from '../components/Post.component';

const  HomePage = () => {
  return (
      <div className="flex-1  items-center flex justify-center" style={{width:'490px'}}>
          <Post></Post>
      </div>
  );
}

export default HomePage;