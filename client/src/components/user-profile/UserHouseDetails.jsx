import React from 'react'
import { Link } from 'react-router-dom'

const UserHouseDetails = () => {
  return (
    <div className='houseDetails-container'>
        <div className='house-details'>
            <h3 style={{marginBottom: '20px'}}>House Information</h3>
            <div className='house-photo'></div>
            <div className='other-house-info'>
                <div className="left-side">
                    <div className='input-label-container'>
                        <label htmlFor='uploadphoto'>Upload/Change photo: </label>
                        <input type="file" name="photo" id="uploadphoto" />
                    </div>
                    <div className='input-label-container'>
                        <label htmlFor="house-number">House number: </label>
                        <input type="text" name="number" id="house-number" placeholder='House number'/>
                    </div>
                    <div className='input-label-container'>
                        <label htmlFor="type">House type: </label>
                        <select name='type' id='type'>
                            <option value="appartment">Appartment</option>
                            <option value="appartment">Single house, one floor</option>
                            <option value="appartment">Single house, two floors</option>
                        </select>
                    </div>
                    <div className='input-label-container'>
                        <label htmlFor="location">Location</label>
                        <input type="text" name="location" placeholder='House location' id='location'/>
                    </div>
                    <div className='input-label-container'>
                        <label htmlFor="rent-price">Rent Cost</label>
                        <input type="text" name="rent" id='rent-price' placeholder='Rent price'/>
                    </div>
                    <div className='input-label-container'>
                        <label htmlFor="description">House description: </label>
                        <textarea id='description' name="description" placeholder='House description' rows='3'></textarea>
                    </div>
                </div>
                <form className="right-side">
                    <div className='input-label-container'>
                        <label htmlFor="rooms">Number of Rooms</label>
                        <input type="number" id='rooms' name="rooms" placeholder='Number of roooms'/>
                    </div>
                    <div className='input-label-container'>
                        <label htmlFor="bathroooms">Number of Bathrooms</label>
                        <input type="number" id='bathrooms' name="bathRooms" placeholder='Number of bathrooms' />
                    </div>
                    <div className='input-label-container'>
                    <fieldset>
                        <legend>Furnished?</legend>
                        <label htmlFor="furnished">Yes &nbsp;&nbsp;
                            <input type="radio" name="hasFurniture" id="furnished"/>
                        </label>
                        <label htmlFor="notfurnished">No &nbsp;&nbsp;
                            <input type="radio" name="hasFurniture" id="notfurnished"/>
                        </label>
                    </fieldset>
                    </div>
                    <div className='input-label-container'>
                        <label htmlFor="tenantOne">Your name: </label>
                        <input type="text" name="tenantOne" placeholder='Your name' id="tenatOne" />
                    </div>
                    <div className='input-label-container'>
                        <label htmlFor="yourphone">Your Phone number: </label>
                        <input type="text" name="phoneNumberOfFirstTenant" placeholder='Phone number' id="yourphone" />
                    </div>
                    <div className='input-label-container' style={{justifyContent: 'flex-end', alignItems: 'flex-end', marginTop: '20px'}}>
                        <input id='submit-modifications' type="submit" value="Save modifications" />
                    </div>
                </form>
            </div>

            <div className="other-relevant-info">
                <div className="input-label-container">
                    <p className='title'>Verified? </p>
                    <p className='data'>No</p>
                </div>
                <div className="input-label-container">
                    <p className='title'>Partner: </p>
                    <p className='data'>John Doe</p>
                </div>
                <div className="input-label-container">
                    <p className='title'>Number of Join Requests: </p>
                    <p className='data'>5</p>
                </div>
            </div>
            
            <div className="join-requests-space">
                <h3>Join Requests</h3>
                <div className="available-requests">
                    <Link className='a-join-request-container'>
                        <div className="requestData">
                            <div className="request-title">
                                <h4>Kalisa Jean Pierre</h4>
                                <p className='request-date'>January 23, 2022</p>
                            </div>
                            <p className='request-description'>Hello Orthence, I am Okay with the requiremest you posted. In fact, I fulfill them all. I can't wait to here from you.</p>
                        </div>
                    </Link>
                    <Link className='a-join-request-container'>
                        <div className="requestData">
                            <div className="request-title">
                                <h4>Kalisa Jean Pierre</h4>
                                <p className='request-date'>January 23, 2022</p>
                            </div>
                            <p className='request-description'>Hello Orthence, I am Okay with the requiremest you posted. In fact, I fulfill them all. I can't wait to here from you.</p>
                        </div>
                    </Link>
                    <Link className='a-join-request-container'>
                        <div className="requestData">
                            <div className="request-title">
                                <h4>Kalisa Jean Pierre</h4>
                                <p className='request-date'>January 23, 2022</p>
                            </div>
                            <p className='request-description'>Hello Orthence, I am Okay with the requiremest you posted. In fact, I fulfill them all. I can't wait to here from you.</p>
                        </div>
                    </Link>
                </div>
                <div className='no-requests'>
                    <p>You don't have requests yet.</p>
                </div>
            </div>
        </div>

        <div className='join-house-descriptions'>
            <h3 style={{marginBottom: '20px'}}>Joining Requirements</h3>
            <form className='form-data'>
                <div className='input-label-container'>
                    <label htmlFor='email'>Your email: </label>
                    <input type="text" name="email" placeholder='Your email' id="email" />
                </div>
                <div className='input-label-container'>
                    <label htmlFor='phone'>Your phone number: </label>
                    <input type="text" name="phoneNumber" placeholder='Your phone number' id="phone" />
                </div>
                <div className='input-label-container'>
                    <label htmlFor='age'>Preferred age: </label>
                    <input type="number" name="age" placeholder='Your age' id="age" />
                </div>
                <fieldset>
                    <legend>Your gender: </legend>
                    <label htmlFor="pmale">Male &nbsp;&nbsp; 
                        <input type="radio" name="tenantGender" id="pmale"/>
                    </label>
                    <label htmlFor="pfemale">Female &nbsp;&nbsp;
                        <input type="radio" name="tenantGender" id="pfemale" />
                    </label>
                    <label htmlFor="pother">Other &nbsp;&nbsp;
                        <input type="radio" name="tenantGender" id="pother" />
                    </label>
                </fieldset>
                <div className='input-label-container'>
                    <label htmlFor='languages'>Preferred Languages: </label>
                    <input type="text" name="languages" placeholder='Preferred languages' id="languages" />
                </div>
                <fieldset>
                    <legend>Preferred gender: </legend>
                    <label htmlFor="male">Male &nbsp;&nbsp;
                        <input type="radio" name="gender" id="male"/>
                    </label>
                    <label htmlFor="female">Female &nbsp;&nbsp;
                        <input type="radio" name="gender" id="female" />
                    </label>
                    <label htmlFor="other">Other &nbsp;&nbsp;
                        <input type="radio" name="other" id="other" />
                    </label>
                </fieldset>
                <fieldset>
                    <legend>Marital Status</legend>
                    <label htmlFor="married">Married &nbsp;&nbsp;
                        <input type="radio" name="maritalStatus" id="married"/>
                    </label>
                    <label htmlFor="single">Single &nbsp;&nbsp;
                        <input type="radio" name="maritalStatus" id="single"/>
                    </label>
                </fieldset>
                <fieldset>
                    <legend>Has Pet/s?</legend>
                    <label htmlFor="haspet">Yes &nbsp;&nbsp;
                        <input type="radio" name="hasPet" id="haspet"/>
                    </label>
                    <label htmlFor="hasnopet">No &nbsp;&nbsp;
                        <input type="radio" name="hasPet" id="hasnopet" />
                    </label>
                    <label htmlFor="haspetorno">Don't mind &nbsp;&nbsp;
                        <input type="radio" name="hasPet" id="haspetorno" />
                    </label>
                </fieldset>
                <fieldset>
                    <legend>Has special medical conditions?</legend>
                    <label htmlFor="medicalconds">Yes &nbsp;&nbsp;
                        <input type="radio" name="hasSpecialMedicalConditions" id="medicalconds"/>
                    </label>
                    <label htmlFor="nomedicalconds">No &nbsp;&nbsp;
                        <input type="radio" name="hasSpecialMedicalConditions" id="nomedicalconds" />
                    </label>
                    <label htmlFor="hasorno">Don't mind &nbsp;&nbsp;
                        <input type="radio" name="hasSpecialMedicalConditions" id="hasorno" />
                    </label>
                </fieldset>
                <fieldset>
                    <legend>Do you accept a smoker?</legend>
                    <label htmlFor="acceptsmoker">Yes &nbsp;&nbsp;
                        <input type="radio" name="smoke" id="acceptsmoker"/>
                    </label>
                    <label htmlFor="noacceptsmoker">No &nbsp;&nbsp;
                        <input type="radio" name="smoke" id="noacceptsmoker" />
                    </label>
                    <label htmlFor="acceptsmokerorno">Don't mind &nbsp;&nbsp;
                        <input type="radio" name="smoke" id="acceptsmokerorno" />
                    </label>
                </fieldset>
                <div className='input-label-container'>
                    <label htmlFor="more-descriptions">More descriptions</label>
                    <textarea name='moreDescriptions' id='more-descritions' placeholder='More descriptions'>
                    </textarea>
                </div>


                <h3 style={{marginBottom: '20px'}}>Referrence Information</h3>
                <div className="input-label-container">
                    <label htmlFor="referrerEmail">Email of your referrer</label>
                    <input type="text" name="refererEmail" placeholder='Email of your referrer' id="referrerEmail" />
                </div>
                <div className="input-label-container">
                    <label htmlFor="referrerPhone">Phone number of your referrer</label>
                    <input type="text" name="refererPhoneNumber" placeholder='Phone number of your referrer' id="referrerPhone" />
                </div>
                <div className='input-label-container' style={{justifyContent: 'flex-end', alignItems: 'flex-end', marginTop: '20px'}}>
                    <input id='submit-modifications' type="submit" value="Save modifications" />
                </div>
            </form>
        </div>    
    </div>
  )
}

export default UserHouseDetails