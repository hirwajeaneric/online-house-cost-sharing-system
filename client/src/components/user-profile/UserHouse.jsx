import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const UserHouse = () => {
    const[house,setHouse] = useState({number:'23'});
    return (
        <div style={{height: '700px'}}>
            <h1>Your profile</h1>
            <div className='rented-house-container'>
                {house ? 
                <div className='useraccount-house-card'>
                    <div className="house-photo"></div>
                    {/* <img src='../../../public/interior-design.jpg' alt='' className="house-picture" /> */}
                    <div className='some-home-details'>
                    <div className="left-side">
                    <h3>House Number: &nbsp;&nbsp;&nbsp; 2343</h3>
                        <div>
                        <h4>Location:</h4>
                        <p>Vision City 2</p>
                        </div>
                        <div>
                        <h4>Rent:</h4>
                        <p>1000000</p>
                        </div>
                        <div>
                        <h4>Join Requests:</h4>
                        <p>5</p>
                        </div>
                    </div>
                    <div className="right-side">
                        <div>
                        <h4>Description:</h4>
                        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptate aliquid necessitatibus earum. Perspiciatis, animi praesentium. Totam exercitationem ducimus dolorem. A ullam excepturi cum corrupti rerum assumenda id voluptas nisi aut?</p>
                        </div>
                        <div className="command-btns">
                        <Link className='profile-house-more' to='rented-house/:id'>View More / Update</Link>
                        </div>
                    </div>
                    </div>
                </div>  
                :
                <Link to='/create-post'>
                    <div className='post-house-button'>
                        
                    </div>
                </Link>
                }
            </div>
        </div>
  )
}

export default UserHouse