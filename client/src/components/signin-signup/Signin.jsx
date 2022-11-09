import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import ResponseMessage from '../responses/ResponseMessage'
import {UserResponseMessageContext} from '../../App';

const Signin = () => {
    const [error, setError] = useState('');
    
    const navigate = useNavigate();
    
    var {visible, message} = useContext(UserResponseMessageContext);

    const [signinData, setSigninData] = useState({
        username: '',
        password: ''
      });

    useEffect(()=>{
        setUserMessage({
            visible: visible,
            message: message
        })
    },[visible, message])

    const [userMessage, setUserMessage] = useState({
        visible: '', 
        message: ''
    })

    const updateSigninData = ({currentTarget: input}) => {
        setSigninData({...signinData, [input.name]: input.value});
      }

    if(visible) {
        setTimeout(() => {
        userMessage.visible = false;
        }, 5000);
    }

    const submitSigninData = (e) => {
        e.preventDefault();
        const url = "http://localhost:5000/api/tenant/signin";
        axios.post(url, signinData)
        .then(res => {
            localStorage.setItem('tenantToken',res.data.token);
            localStorage.setItem('userIdentity',res.data.user.username);
            localStorage.setItem('userEmail', res.data.user.email);
            navigate('/');
        })
        .catch ((error)=> {
            if(error.response && error.response.status >= 400 && error.response.status <= 500 ){
                setError(error.response.data.message);
            }
        })
    }

    return (
        <>
            <div className='error-message-container'>
                {userMessage.message && <ResponseMessage message={userMessage.message} backgroundColor='none' color='green' />}
            </div>
            <form className='signin-form' onSubmit={submitSigninData}>
                <h3>Login to Your Account</h3>
                <div className="form-container">
                {error && 
                    <ResponseMessage message={error} backgroundColor='none' color='red'/>
                }
                <input type="text" placeholder='Username' name="username" value={signinData.username} onChange={updateSigninData}/>
                <input type="password" placeholder='Password' name="password" value={signinData.password} onChange={updateSigninData} />
                <input type="submit" value="Login" />
                <label className='form-additional-link'>New here? <Link to='/auth/signup'>Create an Account</Link></label>
                </div>
            </form>
        </>
    )
}

export default Signin