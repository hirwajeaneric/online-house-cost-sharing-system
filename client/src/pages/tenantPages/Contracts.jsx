import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import { Link } from 'react-router-dom'

const Contracts = () => {
  
  const [contracts, setContracts] = useState([
    {
      _id: '1232nu3i43',
      number: '3',
      approvedOn: '23, November, 2023',
      houseNumber: '20',
      status: 'pending'
    },
    {
      _id: '1232nu3i43',
      number: '3',
      approvedOn: '23, November, 2023',
      houseNumber: '20',
      status: 'closed'
    },
    {
      _id: '1232nu3i43',
      number: '3',
      approvedOn: '23, November, 2023',
      houseNumber: '20',
      status: 'active'
    },
    {
      _id: '1232nu3i43',
      number: '3',
      approvedOn: '23, November, 2023',
      houseNumber: '20',
      status: 'incomplete'
    },
    {
      _id: '1232nu3i43',
      number: '3',
      approvedOn: '23, November, 2023',
      houseNumber: '20',
      status: 'active'
    },
  ]);

  useEffect(()=> {

  },[]);

  const deleteContract = () => {
    
  }

  return (
    <div style={{minHeight: '60vh', width: '100%',}}>
        <h1 style={{fontSize: '30px', fontWeight: '600', margin: '0 0 20px 0'}}>Your Contracts</h1>
        <div className='contracts-container' 
          style={{
            display: 'flex', 
            flexDirection: 'row', 
            justifyContent: 'flex-start', 
            gap: '20px',
            width: '100%',
            flexWrap: 'wrap'
          }}>
           {contracts && contracts.map((contract, index)=>(
            <div key={index} className='a-contract' 
              style={{
                padding: '10px',
                background: '#ffffcc',
                minWidth: '23%',
                fontSize: '90%',
                boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 3px 10px 0 rgba(0, 0, 0, 0.19)'
              }}>
                <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '10px'}}><h3><strong>No: &nbsp;{contract.number}</strong></h3><p>{contract.status}</p></div>
                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                  <p>Approval Date:</p>
                  <p style={{color: 'grey'}}>{contract.approvedOn}</p>
                </div>
                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                  <p>House number:</p>
                  <p style={{color: 'grey'}}>{contract.houseNumber}</p>
                </div>
                <div style={{ marginTop: '10px', display: 'flex', justifyContent: 'space-between'}}>
                  <Link 
                  style={{padding: '2px 15px', background: 'black', color: 'white', fontSize: '90%'}}
                  to={`../contract/${contract._id}`}>Details</Link>
                  {/* <button 
                    style={{padding: '2px 15px', background: 'gray', color: 'white', fontSize: '90%'}}
                    onClick={deleteContract}>Delete
                  </button> */}
                </div>
            </div>))}
            {!contracts && <p>There are no contracts available yet!</p>}
        </div>
    </div>
  )
}

export default Contracts