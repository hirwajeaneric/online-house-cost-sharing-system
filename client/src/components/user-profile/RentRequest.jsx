import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';
import ResponseMessage from '../responses/ResponseMessage';
import { UserResponseMessageContext, UserResponseMessageSetterContext } from '../../App';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    background: #e0ebeb;
    width: 100%;
    padding: 40px;
    font-size: 90%;

    h3 {
        font-size: 200%;
        margin-bottom: 20px; 
    }
`;

const RequestDetails = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    `;

const LeftSide = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
    width: 50%;
`;

const RightSide = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
    width: 50%;
`;

const Form = styled.form`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    width: 100%;
    margin-top: 40px;
    margin-bottom: 20px;
`;

const AcceptBtn = styled.button`
    padding: 8px 12px;
    background: green;
    color: white;
`;

const RejectBtn = styled.button`
    padding: 8px 12px;
    background: black;
    color: white;
`;

const DataContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-between;
    paddin: 10px;
`;

const Data = styled.p`
    padding: 0 10px;
    color: blue;
`;

const Title = styled.h3`
    border-bottom: 2px solid gray;
    width: 100%; 
`;

const RequestStatus = styled.span`
    background: black;
    color: white;
    padding: 5px;
    font-size: 50%;
    margin: 0 0 0 20px;
`;

const RentRequest = () => {
    const userResponseMessage = useContext(UserResponseMessageContext);
    const userResponseMessageSetter = useContext(UserResponseMessageSetterContext);
    const urlparameters = useParams();

    const [rentRequest, setRentRequest] = useState({});
    const [error, setError] = useState('');
    const [house, setHouse] = useState({});
    const [houseOwner, setHouseOwner] = useState('');
    const [contract, setContract] = useState({});
    const [contracts, setContracts] = useState([]);

    /** Fetching the house owner's name */    
    useEffect(()=>{
        axios.get(`http://localhost:5000/api/tenant/findByUsername?username=${urlparameters.username}`)
        .then(response=>{
            setHouseOwner(response.data);
        })
        .catch(error => {
            console.log(error);
        })
    },[urlparameters]);

    /** Fetching all contracts */    
    useEffect(()=>{
        axios.get(`http://localhost:5000/api/contract/list`)
        .then(response=>{
            setContracts(response.data);
        })
        .catch(error => {
            console.log(error);
        })
    },[]);

    /** Fetching the actual rent request */    
    useEffect(()=>{
        axios.get(`http://localhost:5000/api/rentRequest/findById?id=${urlparameters.id}`)
        .then(response=>{
            setRentRequest(response.data);
        })
        .catch(error => {
            console.log(error);
        })
    },[urlparameters]);

    /** Fetching house data using the join post id */
    useEffect(()=>{
        axios.get(`http://localhost:5000/api/house/findById?id=${rentRequest.houseId}`)
        .then(response=>{
            setHouse(response.data);
        })
        .catch(error => {
            console.log(error);
        })
    },[rentRequest]);

    /** Accepting the Rent request */
    const acceptRequest = async(e) => {
        e.preventDefault();

        if (house.tenantOne && house.username) {
            setError('Unable to approve this user, you already have another approved user.')
        } else {
            // Updating the rent request
            rentRequest.approved = 'Yes';
            await axios.put(`http://localhost:5000/api/rentRequest/update?id=${urlparameters.id}`, rentRequest)
            .then(response => {
                if (response.data.rentRequest) {
                    console.log(response.data.message);
                }
            })
            .catch(error => {
                setError(error);
            })

            // Updating the house
            house.tenantOne = rentRequest.name;
            house.username = rentRequest.username;
            await axios.put(`http://localhost:5000/api/house/update?id=${house._id}`, house)
            .then(response => {
                if (response.data) {
                    console.log(response.data.message);
                }
            })
            .catch(error => {
                setError(error);
            });

            // Creating a contract
            setTimeout(()=>{
                contract.houseOwner = houseOwner.firstname+" "+houseOwner.lastname;
                contract.approvedOn = "";
                contract.createdOn = new Date().toDateString();
                contract.status = "incomplete";
                contract.tenantOne = rentRequest.name;
                contract.tenantOneSignDate = "";
                contract.tenantTwo = "";
                contract.tenantTwoSignDate = "";
                contract.ownerUsername = houseOwner.username;
                contract.tenantOneUsername = rentRequest.username;
                contract.tenantTwoUsername = "";
                contract.houseNumber = house.number;
                contract.houseId = house._id;
                contract.number = (contracts.length+1).toString();
                contract.description = `I ${houseOwner.firstname+" "+houseOwner.lastname} the owner of house number ${house.number} accepts that tenant ${rentRequest.name} ${house.tenantTwo && "and "+house.tenantTwo} rent${!house.tenantTwo ? 's' : ''} my house where they will be paying me ${house.rent} Rwf per month. I also accept that I have received a payment of ${house.rent*2} Rwf for the payment of two months that will be counted from ${new Date().toDateString()}.`;

                axios.post(`http://localhost:5000/api/contract/save`, contract)
                .then(response => {
                    if (response.data.contract) {
                        console.log(response.data.message);
                        userResponseMessageSetter({visible: true, message: 'Rent Request approved!'});
                    }
                })
                .catch(error => {
                    setError(error);
                });
            },3000)
        }
    };

    /** Rejecting the join request */
    const rejectRequest = async(e) => {
        e.preventDefault();
        rentRequest.approved = 'No';
        await axios.put(`http://localhost:5000/api/rentRequest/update?id=${urlparameters.id}`, rentRequest)
        .then(response => {
            if (response.data.rentRequest) {
                userResponseMessageSetter({visible: true, message: 'Join request updated!'});
            }
        })
        .catch(error => {
            setError(error);
        })

        house.tenantOne = '';
        house.username = '';
        await axios.put(`http://localhost:5000/api/house/update?id=${house._id}`, house)
        .then(response => {
            if (response.data) {
                userResponseMessageSetter({visible: true, message: 'Rent Request Rejected!'});
            }
        })
        .catch(error => {
            setError(error);
        })
    }

    /** Removing the response message after 5 secs */
    setTimeout(()=>{
        if (userResponseMessage.visible) {
            userResponseMessageSetter({visible: false, message: ''});
            // window.location.reload();
        }        
    }, 5000);

    return (
        <Container>
            {!error && userResponseMessage.visible && <ResponseMessage backgroundColor='#e6ffee' color='green' message={userResponseMessage.message}/>}
            {error && <ResponseMessage backgroundColor='#ffcccc' color='red' message={error} />}
            <Title>Rent Request
                <RequestStatus>{rentRequest.approved === 'No'? 'Pending' : 'Approved'}</RequestStatus>
            </Title>
            <RequestDetails>
                <LeftSide>
                    <h1>{rentRequest.name}</h1>
                    <DataContainer>
                        <p>Gender:</p>
                        <Data>{rentRequest.gender}</Data>
                    </DataContainer>
                    <DataContainer>
                        <p>Phone number:</p>
                        <Data>{rentRequest.phoneNumber}</Data>
                    </DataContainer>
                </LeftSide>
                <RightSide>
                    <DataContainer>
                        <p>Email:</p>
                        <Data>
                            {rentRequest.email}
                        </Data>
                    </DataContainer>
                    <DataContainer>
                        <p>Message:</p>
                        <Data>
                            {rentRequest.comment}
                        </Data>
                    </DataContainer>
                </RightSide>
            </RequestDetails>
            <Form onSubmit={acceptRequest}>
                <AcceptBtn type='submit'>ACCEPT</AcceptBtn>
                {/* <Link style={LinkBack} to={`/profile/${urlparameters.username}/rented-house/${urlparameters.id}`}>BACK</Link> */}
                <RejectBtn type='button' onClick={rejectRequest}>REJECT</RejectBtn>
            </Form>
        </Container>
    )
}

export default RentRequest