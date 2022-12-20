import React from 'react';
import '../../components/post-house/post-house.css';
import AddHouseForm from '../../components/AddHouse/AddHouseForm';

const PostHouse = () => {
  
  return (
    <div className='post-house-container'>
      <h1 style={{fontSize: '30px', fontWeight: '600', margin: '0 0 20px 0'}}>Add new house</h1>
      <AddHouseForm />
    </div>
  )
}

export default PostHouse