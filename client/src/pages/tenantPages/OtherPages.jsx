import React from 'react'
import { Outlet } from 'react-router-dom'
import ClientFooter from '../../components/client-footer/ClientFooter'
import ClientHeader from '../../components/client-header/ClientHeader'

const OtherPages = () => {
  return (
    <div className='other-pages-container'>
        <ClientHeader bgColor='rgb(5, 45, 98)' boxShadow='0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 3px 10px 0 rgba(0, 0, 0, 0.19);'/>
        <Outlet />
        <ClientFooter />
    </div>
  )
}

export default OtherPages