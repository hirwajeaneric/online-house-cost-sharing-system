import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { UserResponseMessageContext, UserResponseMessageSetterContext } from '../../App';
import ResponseMessage from '../responses/ResponseMessage';

const UserHouse = () => {
    const [houses,setHouses] = useState([]);
    const [userJoinRequests, setUserJoinRequests] = useState([]);

    const userResponseMessageSetter = useContext(UserResponseMessageSetterContext);
    const userResponseMessage = useContext(UserResponseMessageContext);

    const [userIdentity, setUserIdentity] = useState({});
    //Fetch user information
    useEffect(()=> {
        axios.get(`http://localhost:5000/api/tenant/findByUsername?username=${localStorage.getItem('userIdentity')}`)
        .then(response=>{
            setUserIdentity(response.data)
        })
        .catch(error => {
            console.log(error);
        })
    },[]);

    //Fetch houses
    useEffect(()=> {
        axios.get(`http://localhost:5000/api/house/list`,{ 
            headers: {
                "Content-Type":"application/json"    
            }
        })
        .then(response=>{
            setHouses(response.data); 
        })
        .catch(error => {
            console.log(error);
        })
    },[houses]);

    //Fetch Join requests
    useEffect(()=> {
        axios.get(`http://localhost:5000/api/joinRequest/findByUsername?username=${localStorage.getItem('userIdentity')}`)
        .then(response=>{
            setUserJoinRequests(response.data);
        })
        .catch(error => {
            console.log(error);
        })
    },[]);

    //Delete house
    const deleteHouse = (house)=> {
        axios.delete(`http://localhost:5000/api/house/delete-house?id=${house._id}`)
        .then(response => {
          userResponseMessageSetter({visible: true, message: response.data.message})
        })
        .catch(error => {
          console.log(error);
        })
    }

    setTimeout(()=>{
        if (userResponseMessage.visible) {
            userResponseMessageSetter({visible: false, message: ''})
        }        
    }, 5000)

    return (
        <div style={{minHeight: "100vh",width: '100%'}}>
            
            {/* Where the response message displays */}
            {userResponseMessage.visible && <ResponseMessage backgroundColor='#e6ffee' color='green' message={userResponseMessage.message}/>}
            
            <h1 style={{textAlign: 'left'}}>Your profile</h1>
            
            <div className='rented-house-container'>
                <h2 style={{fontSize: '20px', margin: '0px 0px 20px'}}>Your house{houses.length > 1 ? 's' : ''}</h2>
                {/* If a person does not have a house in their account yet */}
                <Link style={{marginBottom: '20px'}} className='post-house-button' to='/add-house'>
                    <span>Add New house</span>
                </Link>
                 
                {/* Displaying owned houses */}
                {houses && 
                    houses.map((house, index) => (
                        house.ownerId === userIdentity._id ? 
                            <div key={index} className='useraccount-house-card' style={{marginBottom: '20px'}}>
                                <img src={'http://localhost:5000/api/uploads/'+house.photo} alt="" style={{width: '400px', height: '200px',}} />
                                <div className='some-home-details'>
                                    <div className="left-side">
                                        <h3>House Number: &nbsp;&nbsp;&nbsp; {house.number}</h3>
                                        <div>
                                        <h4>Location:</h4>
                                        <p>{house.location}</p>
                                        </div>
                                        <div>
                                        <h4>Rent:</h4>
                                        <p>{house.rent}</p>
                                        </div>
                                    </div>
                                    <div className="right-side">
                                        <div>
                                            <h4>Description:</h4>
                                            <p>{house.description}</p>
                                        </div>
                                        <div className="command-btns" style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                                            <Link className='profile-house-more' to={`rented-house/${house._id}`}>View More / Update</Link>
                                            <button aria-label='delete house' style={{padding: '8px 12px', background: 'tomato', color: 'white', fontSize: '14px'}} onClick={()=> deleteHouse(house)} type='button'>Delete</button>
                                        </div>
                                    </div>
                                </div>
                            </div> 
                            : ""
                    )) 
                }

                {/* Displaying rented houses */}
                {houses.map((house, index) => (house.username === userIdentity.username) && 
                    <h2 style={{fontSize: '20px', margin: '20px 0px'}}>Rented house</h2>)
                }

                {houses && 
                    houses.map((house, index) => (
                        (house.username === userIdentity.username || house.tenantTwoUsername === userIdentity.username) && 
                        <>
                            <div key={index} className='useraccount-house-card' style={{marginBottom: '20px'}}>
                                <img src={'http://localhost:5000/api/uploads/'+house.photo} alt="" style={{width: '400px', height: '200px',}} />
                                <div className='some-home-details'>
                                <div className="left-side">
                                <h3>House Number: &nbsp;&nbsp;&nbsp; {house.number}</h3>
                                    <div>
                                    <h4>Location:</h4>
                                    <p>{house.location}</p>
                                    </div>
                                    <div>
                                    <h4>Rent:</h4>
                                    <p>{house.rent}</p>
                                    </div>
                                </div>
                                <div className="right-side">
                                    <div>
                                        <h4>Description:</h4>
                                        <p>{house.description}</p>
                                    </div>
                                    <div className="command-btns" style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                                        <Link className='profile-house-more' to={`rented-house/${house._id}`}>View More / Update</Link>
                                        {/* <button aria-label='delete house' style={{padding: '8px 12px', background: 'tomato', color: 'white', fontSize: '14px'}} onClick={(house)=> deleteHouse()} type='button'>Delete</button> */}
                                    </div>
                                </div>
                                </div>
                            </div>
                        </>
                    )) 
                }

                {/* In case there are join requests, they will be displayed */}
                {userJoinRequests.length!==0 && 
                <>
                    <h2 style={{fontSize: '20px', margin: '30px 0 20px'}}>Join requests</h2>
                    <div className='join-requests-container' style={{display: 'flex', flexDirection: 'column', justifyContent: 'flexStart', alignItems: 'center'}}>
                        {userJoinRequests && userJoinRequests.map((joinRequest, index) => (
                            <div key={index} style={{ background: joinRequest.approved==='Yes' ? '#b3ffcc' :'#e0ebeb' ,boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 3px 10px 0 rgba(0, 0, 0, 0.19)' ,width: '100%', padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', marginBottom: '20px'}}>
                                <div className='top-div' style={{ fontSize: '14px', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100'}}>
                                    <h2><strong>To: </strong>{joinRequest.nameOfOccupier}</h2>
                                    <h2><strong>House number: </strong>{joinRequest.houseNumber}</h2>
                                    <p>{joinRequest.sendDate}</p>
                                </div>
                                <div className='main-div' style={{fontSize: '14px',marginTop: '20px', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%'}}>
                                    <div className='left-div' style={{width: '50%'}}>
                                        <p><strong>Description: </strong>{joinRequest.houseDescription}</p>
                                        <p><strong>Location: </strong>{joinRequest.location}</p>
                                    </div>
                                    <div className='right-div' style={{width: '50%', display: 'flex', flexDirection: 'column',alignItems: 'flex-end', justifyContent: 'flex-end'}}>
                                        <p>{joinRequest.approved === 'Yes' ? 'Approved' : 'Pending'}</p>
                                        <Link style={{fontSize: '15px', padding: '1px 7px', background: 'orange', color: 'white', borderRadius: '20px'}} to={`/housedetails/${joinRequest.houseId}`}>View more</Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
                }
            </div>
        </div>
  )
}

export default UserHouse