import React from 'react';
import { useNavigate, Link, useParams } from 'react-router-dom';
import styled from 'styled-components';

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

    const acceptRequest = () => {

    }

    const rejectRequest = () => {
        
    }

    const cancel = () =>  {
        navigate('')
    }

    return (
        <Container>
            <Title>Join Request
                <RequestStatus>Pending</RequestStatus>
            </Title>
            <RequestDetails>
                <LeftSide>
                    <h1>Name: Joan Doe</h1>
                    <DataContainer>
                        <p>Age:</p>
                        <Data>26</Data>
                    </DataContainer>
                    <DataContainer>
                        <p>Gender:</p>
                        <Data>Male</Data>
                    </DataContainer>
                    <DataContainer>
                        <p>Marital Status:</p>
                        <Data>Single</Data>
                    </DataContainer>
                    <DataContainer>
                        <p>Owns a pet:</p>
                        <Data>No</Data>
                    </DataContainer>
                    <DataContainer>
                        <p>Has special medical condition/s:</p>
                        <Data>Yes</Data>
                    </DataContainer>
                    <DataContainer>
                        <p>Medical Condition:</p>
                        <Data>Synus</Data>
                    </DataContainer>
                </LeftSide>
                <RightSide>
                    <DataContainer>
                        <p>Smoke?</p>
                        <Data>No</Data>
                    </DataContainer>
                    <DataContainer>
                        <p>Agree with criteria:</p>
                        <Data>Yes</Data>
                    </DataContainer>
                    <DataContainer>
                        <p>Message:</p>
                        <Data>
                            Lorem, ipsum dolor sit amet consectetur adipisicing elit. 
                            Sit cupiditate quasi fugiat laborum aut, voluptatem ipsam. 
                            Natus repellendus laborum exercitationem ab deserunt reprehenderit 
                            illo ea doloribus nesciunt, corporis dicta in?
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