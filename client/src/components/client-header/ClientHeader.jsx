import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'; 
import { FaPlus, FaSignInAlt, FaSignOutAlt } from 'react-icons/fa';
import './navigationStyles.css';

const ClientHeader = ({bgColor}) => {  
  const [color, setColor]= useState('rgb(5, 45, 98, 0)');
  
  useEffect(()=>{
    setColor(bgColor);
  },[])

  const styles = {
    backgroundColor: color,
  }
  
  return (
    <div className='navigation-container' style={styles}>
      <div className='logo-space'>
        <Link to='/'><h1>ONLINE HOUSE COST SHARING</h1></Link>
      </div>
      <div className='right'>
        <div className='authentication-commands'>
          <Link className='authentication-link signin-link' to='/auth/signin'><FaSignInAlt className='signin-icon' /> Sign in</Link>
          <Link className='authentication-link signup-link' to='/auth/signup'><FaSignOutAlt className='signup-icon'/> Sign up</Link>
        </div>
        <div className='call-to-action'>
          <Link className='post-house-link' to='/auth/signin'><FaPlus className='post-house-icon' /> Post House</Link>
        </div>
      </div>
    </div>
  )
}

export default ClientHeader