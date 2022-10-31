import React from 'react'
import ClientHeader from '../../components/client-header/ClientHeader';
import ClientFooter from '../../components/client-footer/ClientFooter';
import ClientHomeMain from '../../components/client-app-home-main/ClientBody';

const Home = () => {
  return (
    <div className='homepage-container'>
      <ClientHeader bgColor='rgb(5, 45, 98, 0)' />
      <ClientHomeMain />
      <ClientFooter />
    </div>
  )
}

export default Home