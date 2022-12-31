import React, { useContext, useState } from 'react'
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { UserResponseMessageContext, UserResponseMessageSetterContext } from '../../App';
import ResponseMessage from '../../components/responses/ResponseMessage';

const ContractDetails = () => {
    const userResponseMessageSetter = useContext(UserResponseMessageSetterContext);
    const userResponseMessage = useContext(UserResponseMessageContext);

    const params = useParams();
    const [ contract, setContract ] = useState({});

    useEffect(()=>{
        axios.get(`http://localhost:5000/api/contract/findById?id=${params.id}`)
        .then(response=>{
            setContract(response.data)
        })
        .catch(error=>{
            console.log(error);
        })
    },[params.id])

    const signContract = (e) => {
        e.preventDefault();

        if (contract.ownerUsername === params.username) {
            contract.approvedOn = new Date().toDateString();
            contract.status = 'active';
            axios.put(`http://localhost:5000/api/contract/update?id=${contract._id}`.contract)
            .then(response => {
                UserResponseMessageSetterContext({
                    visible: true,
                    message: response.data.message
                })
            })
            .catch(error=> {
                console.log(error);
            })
        } else if (contract.tenantOneUsername === params.username) {
            contract.tenantOneSignDate = new Date().toDateString();
            axios.put(`http://localhost:5000/api/contract/update?id=${contract._id}`.contract)
            .then(response => {
                UserResponseMessageSetterContext({
                    visible: true,
                    message: response.data.message
                })
            })
            .catch(error=> {
                console.log(error);
            })
        } else if (contract.tenantTwoUsername === params.username) {
            contract.tenantTwoSignDate = new Date().toDateString();
            axios.put(`http://localhost:5000/api/contract/update?id=${contract._id}`.contract)
            .then(response => {
                UserResponseMessageSetterContext({
                    visible: true,
                    message: response.data.message
                })
            })
            .catch(error=> {
                console.log(error);
            })
        }
    }

    const deleteContract = () => {

    }

    /** Removing the response message after 5 secs */
    setTimeout(()=>{
        if (userResponseMessage.visible) {
            userResponseMessageSetter({visible: false, message: ''});
            // window.location.reload();
        }        
    }, 5000);

    return (
        <div 
            style={{
                minHeight: '60vh', 
                background: 'whitesmoke',
                fontSize: '90%',
                width: '100%',
                padding: '20px 40px',
                boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 3px 10px 0 rgba(0, 0, 0, 0.19)'
        }}>
            {userResponseMessage.visible && <ResponseMessage backgroundColor='#e6ffee' color='green' message={userResponseMessage.message}/>}

            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <h1 style={{fontSize: '30px', fontWeight: '600', margin: '0 0 20px 0'}}>Contract for rent</h1>
                <h2 style={{fontSize: '150%'}}>No: &nbsp;{contract.number}</h2>
            </div>
            <hr/>
            <div style={{marginTop: '40px'}}>
                <p>{contract.description}</p>
            </div>
            <div style={{marginTop: '20px'}}>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    <p>Tenant 1: <strong>{contract.tenantOne}</strong></p>
                    {params.username === contract.tenantOneUsername && 
                        !contract.tenantOneSignDate ? <button onClick={signContract} style={{textDecoration: 'underline', color: 'blue'}}>Sign here</button> : ""}
                    {contract.tenantOneSignDate && <p style={{color: 'green'}}>Signed</p>}
                    {!contract.tenantOneSignDate && <p style={{color: 'red'}}>Not yet signed</p>}
                </div>
                {contract.tenantTwo && 
                    <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                        <p>Tenant 2: <strong>{contract.tenantTwo}</strong></p>
                        {params.username === contract.tenantTwoUsername && 
                            !contract.tenantTwoSignDate ? <button onClick={signContract} style={{textDecoration: 'underline', color: 'blue'}}>Sign here</button> : ""}
                        {contract.tenantTwoSignDate && <p style={{color: 'green'}}>Signed</p>}
                        {!contract.tenantTwoSignDate && <p style={{color: 'red'}}>Not yet signed</p>}
                    </div>
                }
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    <p>Owner: <strong>{contract.houseOwner}</strong></p>
                    {params.username === contract.ownerUsername && 
                        !contract.approvedOn ? <button onClick={signContract} style={{textDecoration: 'underline', color: 'blue'}}>Sign here</button> : ""}
                    {contract.approvedOn && <p style={{color: 'green'}}>Signed</p>}
                    {!contract.approvedOn && <p style={{color: 'red'}}>Not yet signed</p>}
                </div>
            </div>

            {params.username === contract.ownerUsername && <button style={{background: 'tomato', color: 'white', padding: '8px 12px', marginTop: '40px'}} onClick={deleteContract}>Delete Contract</button>}
        </div>
    )
}

export default ContractDetails