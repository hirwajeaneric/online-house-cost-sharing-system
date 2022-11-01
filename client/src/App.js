import React, { createContext, useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import Home from './pages/tenantPages/Home';
import Posts from './pages/tenantPages/Posts';
import HouseDetails from './pages/tenantPages/HouseDetails';
import SearchResults from './pages/tenantPages/SearchResults';
import RequestToJoin from './pages/tenantPages/RequestToJoin';
import PostHouse from './pages/tenantPages/PostHouse';
import PostDetails from './pages/tenantPages/PostDetails';
import SigninSignup from './pages/authentication/SigninSignup';
import UserProfile from './pages/tenantPages/UserProfile';
import OtherPages from './pages/tenantPages/OtherPages';
import Signin from './components/signin-signup/Signin';
import Signup from './components/signin-signup/Signup';

export const UserResponseMessageContext = createContext();
export const UserResponseMessageSetterContext = createContext();

function App() {

  const adminToken = localStorage.getItem('ohcss-adminToken');
  const [userResponse, setUserResponse] = useState({visible: true, message: ''});
  const [tenantToken, setTenantToken] = useState('');
  
  const tentoken = localStorage.getItem('tenantToken');

  useEffect(()=>{
    setTenantToken(tentoken);
  },[])

  return (
    <UserResponseMessageContext.Provider value={userResponse}>
      <UserResponseMessageSetterContext.Provider value={setUserResponse}>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/' element={<OtherPages />} >
              <Route path='housedetails/:id' element={<HouseDetails />} />
              <Route path='posts' element={<Posts />} />
              <Route path='house/:id' element={<PostDetails />} />
              <Route path='results' element={<SearchResults />} />  
              
              {tenantToken &&
                <Route path='profile/:username' element={<UserProfile />} />   
              }
              <Route path='profile/:username' exact element={<Navigate replace to='/auth/signin' />} />

              {tenantToken &&
                <Route path='join/:id' element={<RequestToJoin />} /> 
              }
              <Route path='join/:id' exact element={<Navigate replace to='/auth/signin' />} />

              {tenantToken && 
                <Route path='create-post' element={<PostHouse />} /> 
              } 
              <Route path='create-post' exact element={<Navigate replace to='/auth/signin' />} />

              <Route path='auth' element={<SigninSignup />} >
                <Route path='' element={<Signin formType='signin'/>} />
                <Route path='signin' element={<Signin formType='signin'/>} />
                <Route path='signup' element={<Signup formType='signup'/>} />
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </UserResponseMessageSetterContext.Provider>
    </UserResponseMessageContext.Provider>
  );
}

export default App;
