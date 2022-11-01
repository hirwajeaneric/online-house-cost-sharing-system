import React, { useEffect } from 'react';
import '../../components/post-house/post-house.css';
import PostHouseForm from '../../components/post-house/PostHouseForm';

const PostHouse = () => {
  
  return (
    <div className='post-house-container'>
      <h1 style={{fontSize: '30px', fontWeight: '600', margin: '0 0 20px 0'}}>Post Join Criteria</h1>
      <p style={{lineHeight: '20px', fontSize: '15px'}}>Dear tenant, by filling in the form bellow, you will provide some personal information that help other people who are willing to join you to better understand you and better understand how to share a house with you could be like.<br/><br/>
      By Submitting the form, it will be sent to system administrators responsible for validating submitted information in order to ensure security and good service provision by this application.<br/><br/>
      It is therefore highly recommendend to provide true, respectful and honest information and requirements. 
      </p>
      <PostHouseForm />
    </div>
  )
}

export default PostHouse