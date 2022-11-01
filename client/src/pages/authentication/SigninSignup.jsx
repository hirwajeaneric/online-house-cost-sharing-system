import React from 'react';
import '../../components/signin-signup/signin-signup-forms-container.css';
import { Outlet } from 'react-router-dom';

const SigninSignup = () => {
  return (
    <div className='signin-signup-forms-container'>
        <Outlet />
    </div>
  )
}

export default SigninSignup