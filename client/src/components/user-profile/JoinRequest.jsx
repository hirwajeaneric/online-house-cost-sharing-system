import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, Link, useParams } from 'react-router-dom';
import styled from 'styled-components';
import ResponseMessage from '../responses/ResponseMessage';

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

const LinkBack ={
    padding: '8px 12px',
    background: 'gray',
    color: 'white',
    cursor: 'pointer'
};

const JoinRequest = () => {

    const urlparameters = useParams();
    const navigate = useNavigate();

    const [joinRequest, setJoinRequest] = useState({});
    const [error, setError] = useState('');

    useEffect(()=>{
        axios.get(`http://localhost:5000/api/joinRequest/findById?id=${urlparameters.id}`)
        .then(response=>{
            setJoinRequest(response.data);
        })
        .catch(error => {
            console.log(error);
        })
    },[urlparameters])

    const acceptRequest = () => {

    }

    const rejectRequest = () => {
        
    }

    const cancel = () =>  {
        navigate('')
    }

    return (
        <Container>
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
                </RightSide>
            </RequestDetails>
            <Form>
                <AcceptBtn type='button' onClick={()=> acceptRequest()}>ACCEPT</AcceptBtn>
                <Link style={LinkBack} to={`/profile/${urlparameters.username}/rented-house/${urlparameters.id}`}>BACK</Link>
                <RejectBtn type='button' onClick={()=> rejectRequest()}>REJECT</RejectBtn>
            </Form>
        </Container>
    )
}

export default JoinRequest