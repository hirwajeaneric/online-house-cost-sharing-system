import React from 'react'
import { Outlet, useParams } from 'react-router-dom'
import ClientFooter from '../../components/client-footer/ClientFooter'
import ClientHeader from '../../components/client-header/ClientHeader'
import SigninSignup from '../../components/signin-signup/SigninSignup'

const Authentication = () => {
  return (
    <div className='authentication-container'>
      <ClientHeader bgColor='rgb(5, 45, 98)'/>
      <Outlet />
      <ClientFooter />
    </div>
  )
}

export default Authentication