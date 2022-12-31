import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'

const Contracts = () => {
  const params = useParams();
  const [contracts, setContracts] = useState([]);

  useEffect(()=> {
    axios.get(`http://localhost:5000/api/contract/findByOwnerUsername?ownerUsername=${params.username}`)
    .then(response => {
      if (response.data) {setContracts(response.data)}
    })
    .catch(error => {
      console.log(error);
    }) 
  },[params.username]);

  useEffect(()=> {
    axios.get(`http://localhost:5000/api/contract/findByTenantOneUsername?tenantOneUsername=${params.username}`)
    .then(response => {
      if (response.data) {setContracts(response.data)}
    })
    .catch(error => {
      console.log(error);
    }) 
  },[params.username]);

  useEffect(()=> {
    axios.get(`http://localhost:5000/api/contract/findByTenantTwoUsername?tenantTwoUsername=${params.username}`)
    .then(response => {
      if (response.data) {setContracts(response.data)}
    })
    .catch(error => {
      console.log(error);
    }) 
  },[params.username]);

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
          }}
        >
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
                </div>
            </div>))}
            {!contracts && <p>No contracts yet!</p>}
        </div>
    </div>
  )
}

export default Contracts