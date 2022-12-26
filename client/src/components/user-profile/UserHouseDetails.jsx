import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { UserResponseMessageContext, UserResponseMessageSetterContext } from '../../App';
import ResponseMessage from '../responses/ResponseMessage';

const UserHouseDetails = () => {
    const userResponseMessageSetter = useContext(UserResponseMessageSetterContext);

    const houseId = useParams();
    
    const userResponseMessage = useContext(UserResponseMessageContext);

    const [houseFormError, setHouseFormError] = useState('');
    
    const [joinRequirementsError, setJoinRequirementsError] = useState('');
    
    const [joinRequests, setJoinRequests] = useState([]);
    const [rentRequests, setRentRequests] = useState([]);
    
    const [file, setFile] = useState('');
    
    const [joinRequirements, setJoinRequirements] = useState({
        names: '',
        tenantGender: '',
        email: '',
        phoneNumber: '',
        age: '',
        gender: '',
        ageOfJoiner: '',
        maritalStatus: '',
        languages: '',
        hasPet:'',
        hasSpecialMedicalConditions: '',
        smoke: '',
        moreDescriptions: '',
        postDate: new Date().toLocaleDateString(),
    });

    const [houseData, setHouseData] = useState({
        number: '',
        type: '',
        username: '',
        location: '',
        tenantOne: '',
        tenantTwo:'',
        phoneNumberOfFirstTenant: '',
        description: '',
        rent: '',
        verified: 'No',
        rooms:'',
        bathRooms: '',
        hasFurniture: '',
        joinPost: '',
        joinRequests: 0
    });

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

    /**Fetch house */
    useEffect(()=> {
        axios.get(`http://localhost:5000/api/house/findById?id=${houseId.id}`,{ 
            headers: {
                "Content-Type":"application/json"    
            }
        })
        .then(response=>{
            setHouseData(response.data);
        })
        .catch(error => {
            console.log(error);
        })
    },[]);

    /**Fetch Join Requests */
    useEffect(()=>{
        axios.get(`http://localhost:5000/api/joinRequest/findByJoinPost?joinPost=${houseData.joinPost}`)
        .then(response=>{
            setJoinRequests(response.data);
        })
        .catch(error => {
            console.log(error);
        })
    },[houseData.joinPost])

    /**Fetch Rent Requests */
    useEffect(()=>{
        axios.get(`http://localhost:5000/api/rentRequest/findByHouseId?houseId=${houseData._id}`)
        .then(response=>{
            setRentRequests(response.data);
        })
        .catch(error => {
            console.log(error);
        })
    },[houseData._id])

    /**Fetch Join Criteria(Join requirements) */
    useEffect(()=>{
        axios.get(`http://localhost:5000/api/joinRequirements/findById?id=${houseData.joinPost}`)
        .then(response=>{
            setJoinRequirements(response.data);
        })
        .catch(error => {
            console.log(error);
        })
    },[houseData.joinPost])

    /** Handling file upload */
    const handleFile = (e) => {
        const {files} = e.target;
        setFile(files[0]);
    }

    /** Handling house data inputs */
    const handleHouseInputs = ({currentTarget: input}) => {
        setHouseData({...houseData, [input.name]: input.value});
    }

    /** Handling Joinin criteria inputs */
    const handleJoinRequirementInfo = ({currentTarget: input}) => {
        setJoinRequirements({...joinRequirements, [input.name]: input.value});
    }

    /** Posting joining requirements */
    const postJoinRequirements = async (e) => {
        e.preventDefault();

        joinRequirements.names = userIdentity.firstname+''+userIdentity.lastname;

        if (joinRequirements.names === '') {
            setJoinRequirementsError('Your name is required')
            return;
        } else if (joinRequirements.tenantGender === '') {
            setJoinRequirementsError('Your gender is required')
            return;
        } else if (joinRequirements.email === '') {
            setJoinRequirementsError('Your email is required')
            return;
        } else if (joinRequirements.phoneNumber === '') {
            setJoinRequirementsError('Your phone number is required')
            return;
        } else if (joinRequirements.phoneNumber.length !== 10) {
            setJoinRequirementsError('Invalid phone number')
            return;
        } else if (joinRequirements.age === '') {
            setJoinRequirementsError('Your age is required')
            return;
        } else if (joinRequirements.gender === '') {
            setJoinRequirementsError('Required gender to join is required')
            return;
        } else if (joinRequirements.ageOfJoiner === '') {
            setJoinRequirementsError('Prefered age range is required')
            return;
        } else if (joinRequirements.maritalStatus === '') {
            setJoinRequirementsError('Marital status required to join is required')
            return;
        } else if (joinRequirements.languages === '') {
            setJoinRequirementsError('Spoken Language(s) required to join is/are required')
            return;
        } else if (joinRequirements.hasPet === '') {
            setJoinRequirementsError("Has pet can not be left empty")
            return;
        } else if (joinRequirements.hasSpecialMedicalConditions === '') {
            setJoinRequirementsError("Has special medical conditions can't be left empty")
            return;
        } else if (joinRequirements.smoke === '') {
            setJoinRequirementsError("Do you accept a smoker can't be left empty")
            return;
        } else if (joinRequirements.moreDescriptions === '') {
            setJoinRequirementsError('More descriptions are required')
            return;
        } else {
            setJoinRequirementsError('');
            // Saving the post requirements
            const postedJoinRequests = await axios.post(`http://localhost:5000/api/joinRequirements/save`, joinRequirements)
            
            // Updating a house information to add the join post
            houseData.joinPost = postedJoinRequests.data._id;
            houseData.phoneNumberOfFirstTenant = postedJoinRequests.data.phoneNumber;
            axios.put(`http://localhost:5000/api/house/update?id=${houseData._id}`, houseData)
            .then(response=> {
                if(response) {
                    userResponseMessageSetter({visible: true, message: 'House successfuly posted!'})
                } else {
                    setJoinRequirementsError('Failed post a house')
                }
            })
            .catch(error => {
                setJoinRequirementsError(error);
            }) 
        }
    }

    /** Updating joining requirements */
    const updateJoinRequirements = async (e) => {
        e.preventDefault();

        if (joinRequirements.names === '') {
            setJoinRequirementsError('Your name is required')
            return;
        } else if (joinRequirements.tenantGender === '') {
            setJoinRequirementsError('Your gender is required')
            return;
        } else if (joinRequirements.email === '') {
            setJoinRequirementsError('Your email is required')
            return;
        } else if (joinRequirements.phoneNumber === '') {
            setJoinRequirementsError('Your phone number is required')
            return;
        } else if (joinRequirements.phoneNumber.length !== 10) {
            setJoinRequirementsError('Invalid phone number')
            return;
        } else if (joinRequirements.age === '') {
            setJoinRequirementsError('Your age is required')
            return;
        } else if (joinRequirements.gender === '') {
            setJoinRequirementsError('Required gender to join is required')
            return;
        } else if (joinRequirements.ageOfJoiner === '') {
            setJoinRequirementsError('Prefered age range is required')
            return;
        } else if (joinRequirements.maritalStatus === '') {
            setJoinRequirementsError('Marital status required to join is required')
            return;
        } else if (joinRequirements.languages === '') {
            setJoinRequirementsError('Spoken Language(s) required to join is/are required')
            return;
        } else if (joinRequirements.hasPet === '') {
            setJoinRequirementsError("Has pet can not be left empty")
            return;
        } else if (joinRequirements.hasSpecialMedicalConditions === '') {
            setJoinRequirementsError("Has special medical conditions can't be left empty")
            return;
        } else if (joinRequirements.smoke === '') {
            setJoinRequirementsError("Do you accept a smoker can't be left empty")
            return;
        } else if (joinRequirements.moreDescriptions === '') {
            setJoinRequirementsError('More descriptions are required')
            return;
        } else {
            setJoinRequirementsError('');
            // Updating the post requirements
            axios.put(`http://localhost:5000/api/joinRequirements/update?id=${joinRequirements._id}`, joinRequirements)
            .then(response=> {
                if(response) {
                    userResponseMessageSetter({visible: true, message: 'Join post updated!'})
                } else {
                    setJoinRequirementsError('Failed to update post')
                }
            })
            .catch(error => {
                setJoinRequirementsError(error);
            }) 
        }
    }

    /** Updating house data */
    const updateHouseData = (e) => {
        e.preventDefault();

        const config = {
            headers: {
                "Content-Type":"multipart/form-data"
            }
        }
         
        if (houseData.number === '') {
            setHouseFormError('House number is required')
            return;
        } else if (houseData.type === '') {
            setHouseFormError('House type is required')
            return;
        } else if (houseData.location === '') {
            setHouseFormError('Location is required')
            return;
        } else if (houseData.description === '') {
            setHouseFormError('House descriptions are required')
            return;
        } else if (houseData.rent === '') {
            setHouseFormError('Rent is required')
            return;
        } else if (houseData.rooms === '') {
            setHouseFormError('The number of roooms is required')
            return;
        } else if (houseData.bathRooms === '') {
            setHouseFormError('The number of bathrooms is required')
            return;
        } else if (houseData.hasFurniture === '') {
            setHouseFormError('Furnished? (Has furniture) can not be left empty')
            return;
        } else if (houseData.rooms <= 0) {
            setHouseFormError('Invalid number of rooms')
            return;
        } else if (houseData.bathRooms <= 0) {
            setHouseFormError('Invalid number of bathrooms')
            return;
        } else if(houseData.photo === '') {
            setHouseFormError('A photo of the house is required')
            return;
        } else {
            setHouseFormError('');
            axios.put(`http://localhost:5000/api/house/update?id=${houseData._id}`, houseData, config)
            .then(response => {
                if(response) {
                    userResponseMessageSetter({visible: true, message: 'House information updated'});
                } else {
                    setHouseFormError('Failed to update house information');
                }
            })
            .catch(error =>{
                setHouseFormError(error)
            });
        }
    }

    /** Removing the response message after 5 secs */
    setTimeout(()=>{
        if (userResponseMessage.visible) {
            userResponseMessageSetter({visible: false, message: ''});
            // window.location.reload();
        }        
    }, 5000);

    return (
        <div className='houseDetails-container'>
            {userResponseMessage.visible && <ResponseMessage backgroundColor='#e6ffee' color='green' message={userResponseMessage.message}/>}
            <div className="main">
                <div className='house-details'>
                    <h3 style={{marginBottom: '20px'}}>House Information</h3>
                    <img 
                        src={`http://localhost:5000/api/uploads/${houseData.photo}`} 
                        alt="" 
                        style={{width: '100%',height: '400px'}}
                    />
                    {houseFormError && <ResponseMessage backgroundColor='#ffcccc' color='red' message={houseFormError}/>}
                    {houseData.ownerId === userIdentity._id ? 
                    <form onSubmit={updateHouseData} className='other-house-info'>
                        <div className="left-side">
                            <div className='input-label-container'>
                                <label htmlFor='uploadphoto'>Upload/Change photo: </label>
                                <input type="file" name="photo" onChange={handleFile} id="uploadphoto" />
                            </div>
                            <div className='input-label-container'>
                                <label htmlFor="house-number">House number: </label>
                                <input type="text" name="number" value={houseData.number} onChange={handleHouseInputs} id="house-number" placeholder='House number'/>
                            </div>
                            <div className='input-label-container'>
                                <label htmlFor="type">House type: </label>
                                <select name='type' value={houseData.type} onChange={handleHouseInputs} id='type'>
                                    <option value="">Choose house type</option>
                                    <option value="Appartment">Appartment</option>
                                    <option value="Single house, one floor">Single house, one floor</option>
                                    <option value="Single house, two floors">Single house, two floors</option>
                                </select>
                            </div>
                            <div className='input-label-container'>
                                <label htmlFor="location">Location</label>
                                <input type="text" name="location" value={houseData.location} onChange={handleHouseInputs} placeholder='House location' id='location'/>
                            </div>
                            <div className='input-label-container'>
                                <label htmlFor="rent-price">Rent Cost</label>
                                <input type="text" name="rent" id='rent-price' value={houseData.rent} onChange={handleHouseInputs} placeholder='Rent price'/>
                            </div>
                            <div className='input-label-container'>
                                <label htmlFor="description">House description: </label>
                                <textarea id='description' name="description" value={houseData.description} onChange={handleHouseInputs} placeholder='House description' rows='3'></textarea>
                            </div>
                        </div>
                        <div className="right-side">
                            <div className='input-label-container'>
                                <label htmlFor="rooms">Number of Rooms</label>
                                <input type="number" id='rooms' name="rooms" value={houseData.rooms} onChange={handleHouseInputs} placeholder='Number of roooms'/>
                            </div>
                            <div className='input-label-container'>
                                <label htmlFor="bathroooms">Number of Bathrooms</label>
                                <input type="number" id='bathrooms' name="bathRooms" value={houseData.bathRooms} onChange={handleHouseInputs} placeholder='Number of bathrooms' />
                            </div>
                            <div className='input-label-container'>
                            <fieldset value={houseData.hasFurniture}>
                                <legend>Furnished?</legend>
                                <label htmlFor="furnished">Yes &nbsp;&nbsp;
                                    <input type="radio" name="hasFurniture" value='Yes' onChange={handleHouseInputs} id="furnished" checked={houseData.hasFurniture==='Yes' ? true : false}/>
                                </label>
                                <label htmlFor="notfurnished">No &nbsp;&nbsp;
                                    <input type="radio" name="hasFurniture" value='No' onChange={handleHouseInputs} id="notfurnished" checked={houseData.hasFurniture==='No' ? true : false}/>
                                </label>
                            </fieldset>
                            </div>
                            {houseData.tenantOne && 
                                <>
                                    <div className='input-label-container'>
                                        <label htmlFor="tenantOne">Name of the first tenant: </label>
                                        <input type="text" name="tenantOne" value={houseData.tenantOne} onChange={handleHouseInputs} placeholder='Your name' id="tenatOne" />
                                    </div>
                                    <div className='input-label-container'>
                                        <label htmlFor="yourphone">Phone number of the first tenant: </label>
                                        <input type="text" name="phoneNumberOfFirstTenant" value={houseData.phoneNumberOfFirstTenant} onChange={handleHouseInputs} placeholder='Phone number' id="yourphone" />
                                    </div>
                                </>}
                            <div className='input-label-container' style={{justifyContent: 'flex-end', alignItems: 'flex-end', marginTop: '20px'}}>
                                <input id='submit-modifications' type="submit" value="Save modifications" />
                            </div>
                        </div>
                    </form>
                    :
                    <form onSubmit={updateHouseData} className='other-house-info'>
                        <div className="left-side">
                            <div className='input-label-container'>
                                <label htmlFor="house-number">House number: </label>
                                <strong>{houseData.number}</strong>
                            </div>
                            <div className='input-label-container'>
                                <label htmlFor="type">House type: </label>
                                <strong>{houseData.type}</strong>
                            </div>
                            <div className='input-label-container'>
                                <label htmlFor="location">Location</label>
                                <strong>{houseData.location}</strong>
                            </div>
                            <div className='input-label-container'>
                                <label htmlFor="rent-price">Rent Cost</label>
                                <strong>{houseData.rent}</strong>
                            </div>
                            <div className='input-label-container'>
                                <label htmlFor="description">House description: </label>
                                <strong>{houseData.description}</strong>
                            </div>
                        </div>
                        <div className="right-side">
                            <div className='input-label-container'>
                                <label htmlFor="rooms">Number of Rooms</label>
                                <strong>{houseData.rooms}</strong>
                            </div>
                            <div className='input-label-container'>
                                <label htmlFor="bathroooms">Number of Bathrooms</label>
                                <strong>{houseData.bathRooms}</strong>
                            </div>
                            <div className='input-label-container'>
                                <label htmlFor="bathroooms">Furnished?</label>
                                <strong>{houseData.hasFurniture}</strong>
                            </div>
                            {houseData.tenantOne && 
                                <>
                                    <div className='input-label-container'>
                                        <label htmlFor="tenantOne">Name of the first tenant: </label>
                                        <strong>{houseData.tenantOne}</strong>
                                    </div>
                                    <div className='input-label-container'>
                                        <label htmlFor="yourphone">Phone number of the first tenant: </label>
                                        <strong>{houseData.phoneNumberOfFirstTenant}</strong>
                                    </div>
                                </>}
                        </div>
                    </form>}

                    {houseData.tenantOne === userIdentity.firstname+""+userIdentity.lastname 
                    // && !houseData.ownerId 
                    && <div className="other-relevant-info">
                        <div className="input-label-container">
                            <p className='title'>Partner: </p>
                            <p className='data'>{houseData.tenantTwo}</p>
                        </div>
                        <div className="input-label-container">
                            <p className='title'>Number of Join Requests: </p>
                            <p className='data'>{joinRequests.length}</p>
                        </div>
                    </div>}

                    {/* Rented people */}
                    {houseData.ownerId === userIdentity._id && <div className="other-relevant-info">
                        <div className="input-label-container">
                            <p className='title'>First occupier: </p>
                            <p className='data'>{houseData.tenantOne}</p>
                        </div>
                        <div className="input-label-container">
                            <p className='title'>Second occupier: </p>
                            <p className='data'>{houseData.tenantTwo}</p>
                        </div>
                        {/* <div className="input-label-container">
                            <p className='title'>Number of Join Requests: </p>
                            <p className='data'>{joinRequests.length}</p>
                        </div> */}
                    </div>}

                    {/* Join requests space */}
                    {houseData.username === userIdentity.username && <div className="join-requests-space">
                        <h3>Join Requests</h3>
                        {joinRequests.length!==0 ? 
                            (<div className="available-requests">
                                {joinRequests.map((request, index)=>(
                                    <Link key={index} to={`../request/${request._id}`} className='a-join-request-container'>
                                        <div className="requestData">
                                            <div className="request-title">
                                                <h4>{request.name}</h4>
                                                <p className='request-date'>{request.sendDate}</p>
                                            </div>
                                            <p className='request-description'>{request.comment}</p>
                                        </div>
                                    </Link>
                                ))}    
                            </div>)
                            :
                            <div className='no-requests'>
                                <p>You don't have requests yet.</p>
                            </div>
                            }
                    </div>}

                    {/* Rent requests space */}
                    {houseData.ownerId === userIdentity._id && <div className="join-requests-space">
                        <h3>Rent Requests</h3>
                        {rentRequests.length!==0 ? 
                            (<div className="available-requests">
                                {rentRequests.map((request, index)=>(
                                    <Link key={index} to={`../rent-request/${request._id}`} className='a-join-request-container'>
                                        <div className="requestData">
                                            <div className="request-title">
                                                <h4>{request.name}</h4>
                                                <p className='request-date'>{request.sendDate}</p>
                                            </div>
                                            <p className='request-description'>{request.comment}</p>
                                        </div>
                                    </Link>
                                ))}    
                            </div>)
                            :
                            <div className='no-requests'>
                                <p>You don't have requests yet.</p>
                            </div>
                            }
                    </div>}
                </div>
                
                {/* Join requirements */}
                {houseData.username === userIdentity.username && <div className='join-house-descriptions'>
                    <h3 style={{marginBottom: '20px'}}>POST HOUSE with Joining Requirements</h3>
                    <form 
                        onSubmit={houseData.joinPost ? updateJoinRequirements : postJoinRequirements} 
                        className='form-data'>
                        <div className='input-label-container'>
                            <label htmlFor='email'>Your email: </label>
                            <input type="text" name="email" value={joinRequirements.email} onChange={handleJoinRequirementInfo} placeholder='Your email' id="email" />
                        </div>
                        <div className='input-label-container'>
                            <label htmlFor='phone'>Your phone number: </label>
                            <input type="text" name="phoneNumber" value={joinRequirements.phoneNumber} onChange={handleJoinRequirementInfo} placeholder='Your phone number' id="phone" />
                        </div>
                        <div className='input-label-container'>
                            <label htmlFor='age'>Your age: </label>
                            <input type="text" name="age" value={joinRequirements.age} onChange={handleJoinRequirementInfo} placeholder='Your age' id="age" />
                        </div>
                        <div className='input-label-container'>
                            <label htmlFor='age'>Prefered age of joiner: </label>
                            <input type="text" name="ageOfJoiner" value={joinRequirements.ageOfJoiner} onChange={handleJoinRequirementInfo} placeholder='Required age to join' id="age" />
                        </div>
                        <fieldset>
                            <legend>Your gender: </legend>
                            <label htmlFor="pmale">Male &nbsp;&nbsp; 
                                <input type="radio" name="tenantGender" value='Male' onChange={handleJoinRequirementInfo} id="pmale" checked={joinRequirements.tenantGender==='Male' ? true : false} />
                            </label>
                            <label htmlFor="pfemale">Female &nbsp;&nbsp;
                                <input type="radio" value='Female' onChange={handleJoinRequirementInfo} name="tenantGender" id="pfemale" checked={joinRequirements.tenantGender==='Female' ? true : false}/>
                            </label>
                            <label htmlFor="pother">Other &nbsp;&nbsp;
                                <input type="radio" name="tenantGender" value='Other' onChange={handleJoinRequirementInfo} id="pother" checked={joinRequirements.tenantGender==='Other' ? true : false}/>
                            </label>
                        </fieldset>
                        <div className='input-label-container'>
                            <label htmlFor='languages'>Preferred Languages: </label>
                            <input type="text" name="languages" value={joinRequirements.languages} onChange={handleJoinRequirementInfo} placeholder='Preferred languages' id="languages" />
                        </div>
                        <fieldset>
                            <legend>Preferred gender: </legend>
                            <label htmlFor="male">Male &nbsp;&nbsp;
                                <input type="radio" name="gender" id="male" value='Male' onChange={handleJoinRequirementInfo} checked={joinRequirements.gender==='Male' ? true : false}/>
                            </label>
                            <label htmlFor="female">Female &nbsp;&nbsp;
                                <input type="radio" name="gender" id="female" value='Female' onChange={handleJoinRequirementInfo} checked={joinRequirements.gender==='Female' ? true : false}/>
                            </label>
                            <label htmlFor="both">Both &nbsp;&nbsp;
                                <input type="radio" name="gender" id="Both" value='Both' onChange={handleJoinRequirementInfo} checked={joinRequirements.gender==='Both' ? true : false}/>
                            </label>
                        </fieldset>
                        <fieldset>
                            <legend>Marital Status</legend>
                            <label htmlFor="married">Married &nbsp;&nbsp;
                                <input type="radio" name="maritalStatus" value='Married' onChange={handleJoinRequirementInfo} checked={joinRequirements.maritalStatus==='Married' ? true : false} id="married"/>
                            </label>
                            <label htmlFor="single">Single &nbsp;&nbsp;
                                <input type="radio" name="maritalStatus" value='Single' onChange={handleJoinRequirementInfo} checked={joinRequirements.maritalStatus==='Single' ? true : false} id="single"/>
                            </label>
                        </fieldset>
                        <fieldset>
                            <legend>Has Pet/s?</legend>
                            <label htmlFor="hasnopet">No &nbsp;&nbsp;
                                <input type="radio" name="hasPet" value='No' onChange={handleJoinRequirementInfo} checked={joinRequirements.hasPet==='No' ? true : false} id="hasnopet" />
                            </label>
                            <label htmlFor="haspetorno">Don't mind &nbsp;&nbsp;
                                <input type="radio" name="hasPet" value="Don't mind" onChange={handleJoinRequirementInfo} checked={joinRequirements.hasPet==="Don't mind" ? true : false} id="haspetorno" />
                            </label>
                        </fieldset>
                        <fieldset>
                            <legend>Has special medical conditions?</legend>
                            <label htmlFor="nomedicalconds">No &nbsp;&nbsp;
                                <input type="radio" name="hasSpecialMedicalConditions" value='No' onChange={handleJoinRequirementInfo} checked={joinRequirements.hasSpecialMedicalConditions==='No' ? true : false} id="nomedicalconds" />
                            </label>
                            <label htmlFor="hasorno">Don't mind &nbsp;&nbsp;
                                <input type="radio" name="hasSpecialMedicalConditions" value="Don't mind" onChange={handleJoinRequirementInfo} checked={joinRequirements.hasSpecialMedicalConditions==="Don't mind" ? true : false} id="hasorno" />
                            </label>
                        </fieldset>
                        <fieldset>
                            <legend>Do you accept a smoker?</legend>
                            <label htmlFor="noacceptsmoker">No &nbsp;&nbsp;
                                <input type="radio" name="smoke" value='No' onChange={handleJoinRequirementInfo} checked={joinRequirements.smoke==='No' ? true : false} id="noacceptsmoker" />
                            </label>
                            <label htmlFor="acceptsmokerorno">Don't mind &nbsp;&nbsp;
                                <input type="radio" name="smoke" value="Don't mind" onChange={handleJoinRequirementInfo} checked={joinRequirements.smoke==="Don't mind" ? true : false} id="acceptsmokerorno" />
                            </label>
                        </fieldset>
                        <div className='input-label-container'>
                            <label htmlFor="more-descriptions">More descriptions</label>
                            <textarea name='moreDescriptions' value={joinRequirements.moreDescriptions} onChange={handleJoinRequirementInfo} id='more-descritions' placeholder='More descriptions'>
                            </textarea>
                        </div>
                        <div className='input-label-container' style={{justifyContent: 'flex-end', alignItems: 'flex-end', marginTop: '20px'}}>
                            {houseData.joinPost ? 
                            <input id='submit-modifications' type="submit" value="UPDATE INFORMATION" />
                            :
                            <input id='submit-modifications' type="submit" value="POST HOUSE" />
                            }
                        </div>
                        {joinRequirementsError && <ResponseMessage backgroundColor='#ffcccc' color='red' message={joinRequirementsError} />}
                        </form>
                </div>}
            </div>    
        </div>
    )
}

export default UserHouseDetails