import React from 'react'
import {Link} from 'react-router-dom'; 
import { FaPlus, FaSignInAlt, FaSignOutAlt } from 'react-icons/fa';
import './navigationStyles.css';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles ({

})

const ClientHeader = () => {
  const classes = useStyles();
  
  return (
    <div className='navigation-container'>
      <div className='logo-space'>
        <h1>ONLINE HOUSE COST SHARING</h1>
      </div>
      <div className='right'>
        <div className='authentication-commands'>
          <Link className='authentication-link signin-link' to='/auth'><FaSignInAlt className='signin-icon' /> Sign in</Link>
          <Link className='authentication-link signup-link' to='/auth'><FaSignOutAlt className='signup-icon'/> Sign up</Link>
        </div>
        <div className='call-to-action'>
          <Link className='post-house-link' to='/auth'><FaPlus className='post-house-icon' /> Post House</Link>
        </div>
      </div>
    </div>
  )
}

export default ClientHeader