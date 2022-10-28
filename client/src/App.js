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
import Signin from './components/signin-signup/SigninSignup';

function App() {

  const UserResponseMessageContext = createContext();
  const UserResponseMessageSetterContext = createContext();

  const tenantToken = localStorage.getItem('tenantToken');
  const adminToken = localStorage.getItem('ohcss-adminToken');

  const [userResponse, setUserResponse] = useState({visible: false, message: ''});

  return (
    <UserResponseMessageContext.Provider value={userResponse}>
      <UserResponseMessageSetterContext.Provider value={setUserResponse}>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Home />} >
              <Route path='housedetails?id' element={<HouseDetails />} />
              <Route path='posts' element={<Posts />} />
              <Route path='results' element={<SearchResults />} />
            </Route>
            {tenantToken ? 
              <Route path='join' element={<RequestToJoin />} /> : 
              <Route path='auth' element={<Authentication />} >
                <Route path='' element={<Signin />} />
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
