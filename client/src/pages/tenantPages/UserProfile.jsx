import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import '../../components/user-profile/user-profile.css';

const UserProfile = () => {
  
  const[house,setHouse] = useState({});

  return (
    <div>
      <h1>Your profile</h1>
      {house ? 
        <div className='useraccount-house-card'>
          <img src='../../assets/imgs/interior-design.jpg' alt='' className="house-photo" />
          <div className='some-home-details'>
            <h1>House Number: &nbsp;&nbsp;&nbsp; 2343</h1>
            <div>
              <p>Location:</p>
              <p>Vision City 2</p>
            </div>
            <div>
              <p>Rent:</p>
              <p>1000000</p>
            </div>
            <div>
              <p>Description:</p>
              <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptate aliquid necessitatibus earum. Perspiciatis, animi praesentium. Totam exercitationem ducimus dolorem. A ullam excepturi cum corrupti rerum assumenda id voluptas nisi aut?</p>
            </div>
            <div>
              <p>Join Requests:</p>
              <p>5</p>
            </div>
          </div>
        </div>
      :
        <Link to='/create-post'>
          <div className='post-house-button'>

          </div>
        </Link>
      }
      
    </div>
  )
}

export default UserProfile