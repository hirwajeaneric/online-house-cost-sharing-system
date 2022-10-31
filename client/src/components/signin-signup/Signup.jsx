import axios from 'axios';
import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import ResponseMessage from '../responses/ResponseMessage'
import {UserResponseMessageSetterContext} from '../../App';

const Signup = ({signupData, setSignupData, updateSignupData}) => {

  const UserResponseMessageSetter = useContext(UserResponseMessageSetterContext);
  
  const [error, setError] = useState('');
  
  const navigate = useNavigate();

  const resetSignupData = () => {
    setSignupData({
      firstname: '',
      lastname: '',
      username: '',
      email: '',
      password: '',
    });
  }

  const submitSignupData = (e) => {
    e.preventDefault();
    
    const url = "http://localhost:5000/api/tenant/signup";
    
    axios.post(url, signupData)
    .then(res => {
      UserResponseMessageSetter({message: res.data.message, visible: true});
      setError('');
      resetSignupData();
      navigate('/auth/signin');
    })
    .catch ((error)=> {
      if(error.response && error.response.status >= 400 && error.response.status <= 500 ){
          setError(error.response.data.message);
      }
    })
  }
  
  return (
    <form className='signup-form' onSubmit={submitSignupData}>
            <h3>Create an Account</h3>
            <div className="form-container">
              {error && 
                <ResponseMessage message={error} backgroundColor='none' color='red' />
              }
              <input type="text" placeholder='First name' name="firstname" value={signupData.firstname} onChange={updateSignupData}/>
              <input type="text" placeholder='Last name' name="lastname" value={signupData.lastname} onChange={updateSignupData}/>
              <input type="text" placeholder='username' name="username" value={signupData.username} onChange={updateSignupData}/>
              <input type="text" placeholder='email' name="email" value={signupData.email} onChange={updateSignupData}/>
              <input type="password" placeholder='Create password' name="password" value={signupData.password} onChange={updateSignupData}/>
              <input type="submit" value="Create Account" />
              <label className='form-additional-link'>Already have an account? <Link to='/auth/signin'>Sign in</Link></label>
            </div>
          </form>
  )
}

export default Signup