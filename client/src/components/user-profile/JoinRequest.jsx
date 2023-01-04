import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import ResponseMessage from '../responses/ResponseMessage';
import { UserResponseMessageContext, UserResponseMessageSetterContext } from '../../App';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    // margin-top: 100px;
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


const JoinRequest = () => {
    const userResponseMessage = useContext(UserResponseMessageContext);
    const userResponseMessageSetter = useContext(UserResponseMessageSetterContext);
    const urlparameters = useParams();

    const [contract, setContract] = useState({});
    const [joinRequest, setJoinRequest] = useState({});
    const [error, setError] = useState('');
    const [house, setHouse] = useState({});

    /** Fetching the actual join request */    
    useEffect(()=>{
        axios.get(`http://localhost:5000/api/joinRequest/findById?id=${urlparameters.id}`)
        .then(response=>{
            setJoinRequest(response.data);
        })
        .catch(error => {
            console.log(error);
        })
    },[urlparameters]);

    /** Fetching house data using the join post id */
    useEffect(()=>{
        axios.get(`http://localhost:5000/api/house/findByJoinPost?joinPost=${joinRequest.joinPost}`)
        .then(response=>{
            setHouse(response.data[0]);
        })
        .catch(error => {
            console.log(error);
        })
    },[joinRequest]);

    /** Fetching the contract related to this house */    
    useEffect(()=>{
        axios.get(`http://localhost:5000/api/contract/findByHouseNumber?houseNumber=${joinRequest.houseNumber}`)
        .then(response=>{
            setContract(response.data[0]);
        })
        .catch(error => {
            console.log(error);
        })
    },[joinRequest]);

    /** Accepting the Join request */
    const acceptRequest = async(e) => {
        e.preventDefault();

        if (house.tenantTwo && house.tenantTwoUsername) {
            setError('Unable to approve this user, you already have another approved user.')
        } else {
            //Updating the join request
            joinRequest.approved = 'Yes';
            await axios.put(`http://localhost:5000/api/joinRequest/update?id=${urlparameters.id}`, joinRequest)
            .then(response => {
                if (response.data.joinRequest) {
                    console.log(response.data.message);
                }
            })
            .catch(error => {
                setError(error);
            })
            
            // Updating the house 
            // house.tenantTwo = joinRequest.name;
            house.tenantTwo = joinRequest.name;
            await axios.put(`http://localhost:5000/api/house/update?id=${house._id}`, house)
            .then(response => {
                if (response.data) {
                    console.log(response.data.message);
                }
            })
            .catch(error => {
                setError(error);
            })

            // Updating the contract
            setTimeout(()=>{
                contract.tenantTwo = joinRequest.name;
                contract.tenantTwoUsername = joinRequest.username;
                axios.put(`http://localhost:5000/api/contract/update?id=${contract._id}`, contract)
                .then(response => {
                    if (response.data.contract) {
                        console.log(response.data.message);
                        userResponseMessageSetter({visible: true, message: 'Join Request approved!'});
                    }
                })
                .catch(error => {
                    setError(error);
                });
            },3000);
        }
    };

    /** Rejecting the join request */
    const rejectRequest = async(e) => {
        e.preventDefault();

        // Update join request
        joinRequest.approved = 'No';
        await axios.put(`http://localhost:5000/api/joinRequest/update?id=${urlparameters.id}`, joinRequest)
        .then(response => {
            if (response.data.joinRequest) {
                userResponseMessageSetter({visible: true, message: 'Join request updated!'});
            }
        })
        .catch(error => {
            setError(error);
        })

        // Update the house
        house.tenantTwo = '';
        house.tenantTwoUsername = '';
        await axios.put(`http://localhost:5000/api/house/update?id=${house._id}`, house)
        .then(response => {
            if (response.data) {
                userResponseMessageSetter({visible: true, message: 'Join Request Rejected!'});
            }
        })
        .catch(error => {
            setError(error);
        })

        // Updating the contract
        setTimeout(()=>{
            contract.tenantTwo = "";
            contract.tenantTwoUsername = "";
            
            axios.put(`http://localhost:5000/api/contract/update?id=${contract._id}`, contract)
            .then(response => {
                if (response.data.contract) {
                    console.log(response.data.message);
                    userResponseMessageSetter({visible: true, message: 'Join Request approved!'});
                }
            })
            .catch(error => {
                setError(error);
            });
        },3000);
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
            <Title>Join Request
                <RequestStatus>{joinRequest.approved === 'No'? 'Pending' : 'Approved'}</RequestStatus>
            </Title>
            <RequestDetails>
                <LeftSide>
                    <h1>{joinRequest.name}</h1>
                    <DataContainer>
                        <p>Age:</p>
                        <Data>{joinRequest.age}</Data>
                    </DataContainer>
                    <DataContainer>
                        <p>Gender:</p>
                        <Data>{joinRequest.gender}</Data>
                    </DataContainer>
                    <DataContainer>
                        <p>Marital Status:</p>
                        <Data>{joinRequest.maritalStatus}</Data>
                    </DataContainer>
                    <DataContainer>
                        <p>Owns a pet:</p>
                        <Data>{joinRequest.hasPet}</Data>
                    </DataContainer>
                    <DataContainer>
                        <p>Has special medical condition/s:</p>
                        <Data>{joinRequest.specialMedicalConditions}</Data>
                    </DataContainer>
                </LeftSide>
                <RightSide>
                    <DataContainer>
                        <p>Medical Condition:</p>
                        <Data>{joinRequest.medicalCondition}</Data>
                    </DataContainer>
                    <DataContainer>
                        <p>Smoke?</p>
                        <Data>{joinRequest.smoke}</Data>
                    </DataContainer>
                    <DataContainer>
                        <p>Message:</p>
                        <Data>
                            {joinRequest.comment}
                        </Data>
                    </DataContainer>
                    <DataContainer>
                        <p>Phone number:</p>
                        <Data>{joinRequest.phoneNumber}</Data>
                    </DataContainer>
                    <DataContainer>
                        <p>Email:</p>
                        <Data>
                            {joinRequest.email}
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

export default JoinRequest