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
    const [ house, setHouse] = useState({});
    const [houseOwner, setHousOwner] = useState({});
    const [error, setError] = useState('');

    useEffect(()=>{
        axios.get(`http://localhost:5000/api/contract/findById?id=${params.id}`)
        .then(response=>{
            setContract(response.data)
        })
        .catch(error=>{
            console.log(error);
        })
    },[params.id])

    useEffect(()=>{
        axios.get(`http://localhost:5000/api/house/findById?id=${contract.houseId}`)
        .then(response=>{
            setHouse(response.data);
        })
        .catch(error=>{
            console.log(error);
        })
    },[contract.houseId]);

    useEffect(()=>{
        axios.get(`http://localhost:5000/api/tenant/findById?id=${house.ownerId}`)
        .then(response=>{
            setHousOwner(response.data);
        })
        .catch(error=>{
            console.log(error);
        })
    },[house.ownerId])

    const signContract = (e) => {
        e.preventDefault();

        if (contract.ownerUsername === params.username) {

            contract.approvedOn = new Date().toDateString();
            contract.status = 'active - complete';
            axios.put(`http://localhost:5000/api/contract/update?id=${contract._id}`,contract)
            .then(response => {
                userResponseMessageSetter({
                    visible: true,
                    message: response.data.message
                })
            })
            .catch(error=> {
                setError(error);
            })
        } else if (contract.tenantOneUsername === params.username) {
            
            contract.tenantOneSignDate = new Date().toDateString();
            axios.put(`http://localhost:5000/api/contract/update?id=${contract._id}`,contract)
            .then(response=>{
                console.log(response.data.message);
                setContract(response.data.contract);
                userResponseMessageSetter({
                    visible: true,
                    message: response.data.message
                })
            })
            .catch(error=>{
                setError(error);
            })

            setTimeout(()=>{
                house.username = params.username;
                console.log(house.username+" - "+params.username);

                axios.put(`http://localhost:5000/api/house/update?id=${house._id}`,house)
                .then(response=>{
                    console.log(response.data.message);
                })
                .catch(error=>{
                    setError(error);
                })  
            }, 5000)
        } else if (contract.tenantTwoUsername === params.username) {
            contract.tenantTwoSignDate = new Date().toDateString();
            axios.put(`http://localhost:5000/api/contract/update?id=${contract._id}`,contract)
            .then(response => {
                console.log(response.data.message);
                setContract(response.data.contract);
                userResponseMessageSetter({
                    visible: true,
                    message: response.data.message
                })
            })
            .catch(error=> {
                console.log(error);
            })

            setTimeout(()=>{
                house.tenantTwoUsername = params.username;
                console.log(house.tenantTwoUsername+" - "+params.username);

                axios.put(`http://localhost:5000/api/house/update?id=${house._id}`,house)
                .then(response=>{
                    console.log(response.data.message);
                })
                .catch(error=>{
                    setError(error);
                })  
            }, 5000)
        }
    }

    const deleteContract = (e) => {
        e.preventDefault();

        axios.get(`http://localhost:5000/api/house/delete-house?id=${house._id}`)
        .then(response => {
            console.log(response.data.message);
            setContract(response.data.contract);
            userResponseMessageSetter({
                visible: true,
                message: response.data.message
            })
        })
        .catch(error=> {
            console.log(error);
        })
    }

    /** Removing the response message after 5 secs */
    setTimeout(()=>{
        if (userResponseMessage.visible) {
            userResponseMessageSetter({visible: false, message: ''});
            window.location.reload();
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
            {userResponseMessage.visible && 
                <ResponseMessage backgroundColor='#e6ffee' color='green' message={userResponseMessage.message}/>}
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <h1 style={{fontSize: '30px', fontWeight: '600', margin: '0 0 20px 0'}}>Contract for rent</h1>
                <h2 style={{fontSize: '150%'}}>No: &nbsp;{contract.number}</h2>
            </div>
            <hr/>
            <div style={{marginTop: '40px'}}>
                <p>
                    {"I "+houseOwner.firstname+" "+houseOwner.lastname+" the owner of house number "+contract.houseNumber+
                    " accept that tenant "+contract.tenantOne+
                    " "+(contract.tenantTwo ? "and" : "")+" "+contract.tenantTwo+
                    " rent"+(contract.tenantTwo ? "" : "s")+ 
                    " my house where they will be paying me " 
                    +house.rent+
                    "Rwf per month. I also accept that I have received a payment of "
                    +house.rent*2+" Rwf for the payment of two months that will be counted from "+contract.createdOn+"."}
                </p>
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