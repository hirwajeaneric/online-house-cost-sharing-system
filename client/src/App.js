import React, { createContext, useState } from 'react';
import './App.css';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import Home from './pages/tenantPages/Home';
import Authentication from './pages/authentication/Authentication';
import Posts from './pages/tenantPages/Posts';
import HouseDetails from './pages/tenantPages/HouseDetails';
import SearchResults from './pages/tenantPages/SearchResults';
import RequestToJoin from './pages/tenantPages/RequestToJoin';
import PostHouse from './pages/tenantPages/PostDetails';
import PostDetails from './pages/tenantPages/PostDetails';
import SigninSignup from './components/signin-signup/SigninSignup';

export const UserResponseMessageContext = createContext();
export const UserResponseMessageSetterContext = createContext();

function App() {
  const tenantToken = localStorage.getItem('tenantToken');
  const adminToken = localStorage.getItem('ohcss-adminToken');

  const [userResponse, setUserResponse] = useState({visible: true, message: ''});

  return (
    <UserResponseMessageContext.Provider value={userResponse}>
      <UserResponseMessageSetterContext.Provider value={setUserResponse}>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Home />} >
              <Route path='housedetails?id' element={<HouseDetails />} />
              <Route path='posts' element={<Posts />} />
              <Route path='posts/post/:id' element={<PostDetails />} />
              <Route path='results' element={<SearchResults />} />
            </Route>
            {tenantToken ? 
              <Route path='join' element={<RequestToJoin />} /> : 
              <Route path='auth' element={<Authentication />} >
                <Route path='' element={<SigninSignup formType='signin'/>} />
                <Route path='signin' element={<SigninSignup formType='signin'/>} />
                <Route path='signup' element={<SigninSignup formType='signup'/>} />
              </Route>  
            }
            {tenantToken ? 
              <Route path='create-post' element={<PostHouse />} /> : 
              <Route path='auth' element={<Authentication />} />
            }
            <Route path='join' exact element={<Navigate replace to='/auth' />} />
            <Route path='create-post' exact element={<Navigate replace to='/auth' />} />
          </Routes>
        </BrowserRouter>
      </UserResponseMessageSetterContext.Provider>
    </UserResponseMessageContext.Provider>
  );
}

export default App;
