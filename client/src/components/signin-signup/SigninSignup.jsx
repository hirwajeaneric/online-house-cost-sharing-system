import React, { useEffect, useState } from 'react';
import './signin-signup-forms-container.css';
import Signin from './Signin';
import Signup from './Signup';

const SigninSignup = ({formType}) => {
  const [type, setType] = useState('');
  
  const [signinData, setSigninData] = useState({
    username: '',
    password: ''
  });
  
  const [signupData, setSignupData] = useState({
    firstname: '',
    lastname: '',
    username: '',
    email: '',
    password: '',
  });

  useEffect(()=>{
    setType(formType)
  },[formType])
  
  const updateSigninData = ({currentTarget: input}) => {
    setSigninData({...signinData, [input.name]: input.value});
  }

  const updateSignupData = ({currentTarget: input}) => {
    setSignupData({...signupData, [input.name]: input.value});
  }

  return (
    <div className='signin-signup-forms-container'>
      {type==='signin' ? 
        (
        <Signin 
          signinData={signinData} 
          updateSigninData={updateSigninData} 
        />          
          )
          : (type==='signup' ? (
            <Signup 
              signupData={signupData}
              updateSignupData={updateSignupData}
              setSignupData={setSignupData}
            />
        ) : '')
      }
    </div>
  )
}

export default SigninSignup