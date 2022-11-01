import React from 'react'
import { Outlet } from 'react-router-dom'
import ClientFooter from '../../components/client-footer/ClientFooter'
import ClientHeader from '../../components/client-header/ClientHeader'

const OtherPages = () => {
  return (
    <div className='other-pages-container'>
        <ClientHeader bgColor='rgb(5, 45, 98)'/>
        <Outlet />
        <ClientFooter />
    </div>
  )
}

export default OtherPages