import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { UserResponseMessageContext, UserResponseMessageSetterContext } from '../../App';
import ResponseMessage from '../responses/ResponseMessage';

const UserHouse = () => {
    const[house,setHouse] = useState({});

    const userResponseMessageSetter = useContext(UserResponseMessageSetterContext);
    const userResponseMessage = useContext(UserResponseMessageContext);

    useEffect(()=> {
        axios.get(`http://localhost:5000/api/house/findByUsername?username=${localStorage.getItem('userIdentity')}`,{ 
            headers: {
                "Content-Type":"application/json"    
            }
        })
        .then(response=>{
            setHouse(response.data[0]);
            console.log(response.data[0]);
        })
        .catch(error => {
            console.log(error);
        })
    },[]);

    setTimeout(()=>{
        if (userResponseMessage.visible) {
            userResponseMessageSetter({visible: false, message: ''})
        }        
    }, 5000)

    return (
        <div style={{height: '700px', width: '100%'}}>
            {userResponseMessage.visible && <ResponseMessage backgroundColor='#e6ffee' color='green' message={userResponseMessage.message}/>}
            <h1 style={{textAlign: 'left'}}>Your profile</h1>
            <div className='rented-house-container'>
                {house && 
                <div className='useraccount-house-card'>
                    <div style={{background: "url('http://localhost:5000/api/uploads/"+house.photo+"')", width: '400px', height: '200px', backgroundSize: 'cover', backgroundRepeat: 'no-repeat'}} className="house-photo"></div>
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
                        <div>
                        <h4>Join Requests:</h4>
                        <p>{house.joinRequests}</p>
                        </div>
                    </div>
                    <div className="right-side">
                        <div>
                        <h4>Description:</h4>
                        <p>{house.description}</p>
                        </div>
                        <div className="command-btns">
                        <Link className='profile-house-more' to={`rented-house/${house._id}`}>View More / Update</Link>
                        </div>
                    </div>
                    </div>
                </div> }

                {!house && 
                    <>
                        <p style={{margin: '0 0 20px 0'}}>You don't have any post or house yet.</p>
                        <Link className='post-house-button' to='/create-post'>
                            <span>Create a post</span>
                        </Link>
                    </>
                }
            </div>
        </div>
  )
}

export default UserHouse