import React from 'react';
import {Outlet} from 'react-router-dom';
import '../../components/user-profile/user-profile.css';

const UserProfile = () => {
  return (
    <div className='user-profile-container'>
      <Outlet />
    </div>
  )
}

export default UserProfile