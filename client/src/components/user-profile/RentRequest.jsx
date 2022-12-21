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

const LinkBack ={
    padding: '8px 12px',
    background: 'gray',
    color: 'white',
    cursor: 'pointer'
};

const RentRequest = () => {
    const userResponseMessage = useContext(UserResponseMessageContext);
    const userResponseMessageSetter = useContext(UserResponseMessageSetterContext);
    const urlparameters = useParams();

    const [rentRequest, setRentRequest] = useState({});
    const [error, setError] = useState('');
    const [house, setHouse] = useState({});

    /** Fetching the actual rent request */    
    useEffect(()=>{
        axios.get(`http://localhost:5000/api/rentRequest/findById?id=${urlparameters.id}`)
        .then(response=>{
            setRentRequest(response.data);
            console.log('The rent request:');
            console.log(response.data);
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
            console.log('The house to be joined:');
            console.log(response.data[0]);
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
            rentRequest.approved = 'Yes';
            await axios.put(`http://localhost:5000/api/rentRequest/update?id=${urlparameters.id}`, rentRequest)
            .then(response => {
                if (response.data.rentRequest) {
                    console.log(response.data);
                }
            })
            .catch(error => {
                setError(error);
            })
    
            house.tenantOne = rentRequest.name;
            house.username = rentRequest.username;
            await axios.put(`http://localhost:5000/api/house/update?id=${house._id}`, house)
            .then(response => {
                if (response.data) {
                    userResponseMessageSetter({visible: true, message: 'Rent Request approved!'});
                }
            })
            .catch(error => {
                setError(error);
            })
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
        console.log('Updating the house:');
        console.log(house);
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
            window.location.reload();
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