import React from 'react'
import ClientHeader from '../../components/client-header/ClientHeader';
import ClientFooter from '../../components/client-footer/ClientFooter';
import ClientHomeMain from '../../components/client-app-home-main/ClientBody';

const Home = () => {
  return (
    <div>
      <ClientHeader />
      <ClientHomeMain />
      <ClientFooter />
    </div>
  )
}

export default Home