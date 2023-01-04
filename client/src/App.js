import React, { createContext, useState } from 'react';
import './App.css';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import Home from './pages/tenantPages/Home';
import HouseDetails from './pages/tenantPages/HouseDetails';
import SearchResults from './pages/tenantPages/SearchResults';
import RequestToJoin from './pages/tenantPages/RequestToJoin';
import PostHouse from './pages/tenantPages/PostHouse';
import AddHouse from './pages/tenantPages/AddHouse';
import PostDetails from './pages/tenantPages/PostDetails';
import SigninSignup from './pages/authentication/SigninSignup';
import UserProfile from './pages/tenantPages/UserProfile';
import OtherPages from './pages/tenantPages/OtherPages';
import Signin from './components/signin-signup/Signin';
import Signup from './components/signin-signup/Signup';
import UserHouse from './components/user-profile/UserHouse';
import UserHouseDetails from './components/user-profile/UserHouseDetails';
import JoinRequest from './components/user-profile/JoinRequest';
import RentRequest from './components/user-profile/RentRequest';
import Contracts from './pages/tenantPages/Contracts';
import ContractDetails from './pages/tenantPages/ContractDetails';

export const UserResponseMessageContext = createContext();
export const UserResponseMessageSetterContext = createContext();

function App() {

  const [userResponse, setUserResponse] = useState({visible: false, message: ''});

  return (
    <UserResponseMessageContext.Provider value={userResponse}>
      <UserResponseMessageSetterContext.Provider value={setUserResponse}>
        
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/' element={<OtherPages />} >
              <Route path='housedetails/:id' element={<HouseDetails />} />
              <Route path='house/:id' element={<PostDetails />} />
              <Route path='results' element={<SearchResults />} /> 

              {localStorage.getItem('tenantToken') ?
                <Route path='profile/:username' element={<UserProfile />} >
                  <Route path='' element={<UserHouse />} />
                  <Route path='rented-house/:id' element={<UserHouseDetails />} />
                  <Route path='request/:id' element={<JoinRequest />} />
                  <Route path='rent-request/:id' element={<RentRequest />} />
                  <Route path='contracts' element={<Contracts/>} />
                  <Route path='contract/:id' element={<ContractDetails/>} />
                </Route>
                :
                <Route path='profile/:username' exact element={<Navigate replace to='/auth/signin' />} />   
              }

              {localStorage.getItem('tenantToken') ?
                <Route path='join/:id' element={<RequestToJoin />} />
                :
                <Route path='join/:id' exact element={<Navigate replace to='/auth/signin' />} /> 
              }

              {localStorage.getItem('tenantToken') ? 
                <Route path='create-post' element={<PostHouse />} />
                :
                <Route path='create-post' exact element={<Navigate replace to='/auth/signin' />} /> 
              }

              {localStorage.getItem('tenantToken') ? 
                <Route path='contracts' element={<Contracts />} />
                :
                <Route path='contracts' exact element={<Navigate replace to='/auth/signin' />} /> 
              }

              {localStorage.getItem('tenantToken') ? 
                <Route path='add-house' element={<AddHouse />} />
                :
                <Route path='add-house' exact element={<Navigate replace to='/auth/signin' />} /> 
              } 

              {localStorage.getItem('tenantToken') ? 
                <Route path='contract/:id' element={<ContractDetails />} />
                :
                <Route path='contract/:id' exact element={<Navigate replace to='/auth/signin' />} /> 
              } 

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
