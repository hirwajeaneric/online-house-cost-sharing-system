import React, { useEffect, useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'; 
import { FaPlus, FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa';
import './navigationStyles.css';
import axios from 'axios';

const ClientHeader = ({bgColor, boxShadow}) => {  
  const [color, setColor]= useState('rgb(5, 45, 98, 0)');
  const [userInfo, setUserInfo] = useState({});
  const [localUser, setLocalUser] = useState('');

  const navigate = useNavigate();

  useEffect(()=>{
    setColor(bgColor);
  },[bgColor])

  useEffect(()=>{
    const username = localStorage.getItem('userIdentity');
    setLocalUser(username);
    if(username) {
      axios.get(`http://localhost:5000/api/tenant/findByUsername?username=${username}`)
      .then(res=>{
        setUserInfo(res.data)
      })
      .catch(err=>{
        console.log(err);
      })
    }
  },[])

  const styles = {
    backgroundColor: color,
    boxShadow: boxShadow,
  }

  const logout = ()=> {
    
    localStorage.removeItem('userIdentity');
    localStorage.removeItem('tenantToken');
    localStorage.removeItem('userEmail');

    if(window.location.pathname === '/') {
      window.location.reload();
    } else {
      navigate('/');
    }
  }
  
  return (
    <div className='navigation-container' style={styles}>
      <div className='logo-space'>
        <Link to='/'><h1>ONLINE HOUSE COST SHARING</h1></Link>
      </div>
      <div className='right'>
        <div className='authentication-commands'>
          {localUser ? 
            <>
              <Link className='loggedinuser-link user-link' to={`/profile/${userInfo.username}`}><FaUser className='signin-icon' /> {userInfo.username}</Link>
              <button className='logout-button' type='button' onClick={()=>logout()}>
                <FaSignOutAlt className='signout-icon'/> Log out</button>
            </> 
          :
            <>
              <Link className='authentication-link signin-link' to='/auth/signin'><FaSignInAlt className='signin-icon' /> Sign in</Link>
              <Link className='authentication-link signup-link' to='/auth/signup'><FaSignOutAlt className='signup-icon'/> Sign up</Link>
            </> 
          }
        </div>
        <div className='call-to-action'>
          <Link className='post-house-link' to='/create-post'><FaPlus className='post-house-icon' /> Post House</Link>
        </div>
      </div>
    </div>
  )
}

export default ClientHeader