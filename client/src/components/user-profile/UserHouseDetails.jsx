import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { UserResponseMessageContext, UserResponseMessageSetterContext } from '../../App';
import ResponseMessage from '../responses/ResponseMessage';
import Loading from '../../assets/imgs/3dotsspiner.gif';

const UserHouseDetails = () => {
    const [houseFormError, setHouseFormError] = useState('');
    const [joinRequirementsError, setJoinRequirementsError] = useState('');
    const [joinRequests, setJoinRequests] = useState([]);

    const userResponseMessageSetter = useContext(UserResponseMessageSetterContext);
    const userResponseMessage = useContext(UserResponseMessageContext);

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
        photo: '',
        hasPet:'',
        hasSpecialMedicalConditions: '',
        smoke: '',
        moreDescriptions: '',
        postDate: new Date().toLocaleDateString(),
        refererEmail:'',
        refererPhoneNumber:'',
        numberOfJoinRequests: ''
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

    const[spinner, setSpinner] = useState({active: false, message: ''});
    const[spinnerTwo, setSpinnerTwo] = useState({active: false, message: ''});

    /**Fetch house */
    useEffect(()=> {
        axios.get(`http://localhost:5000/api/house/findByUsername?username=${localStorage.getItem('userIdentity')}`,{ 
            headers: {
                "Content-Type":"application/json"    
            }
        })
        .then(response=>{
            setHouseData(response.data[0]);
            console.log(houseData);
        })
        .catch(error => {
            console.log(error);
        })
    },[]);

    /**Fetch Join Requests */
    useEffect(()=>{
        axios.get(`http://localhost:5000/api/joinRequests/findByJoinPost?joinPost=${houseData.joinPost}`)
        .then(response=>{
            setJoinRequests(response.data);
            console.log(response.data);
        })
        .catch(error => {
            console.log(error);
        })
    },[houseData.joinPost])

    /**Fetch Join Criteria(Join requirements) */
    useEffect(()=>{
        axios.get(`http://localhost:5000/api/joinRequirements/findById?id=${houseData.joinPost}`)
        .then(response=>{
            setJoinRequirements(response.data);
            console.log(response.data);
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

    /** Updating joining requirements */
    const updateRequirementsData = (e) => {
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
            setHouseFormError('');
            axios.put(`http://localhost:5000/api/joinRequirements/update?id=${joinRequirements._id}`, joinRequirements)
            .then(response=> {
                if(response) {
                    userResponseMessageSetter({visible: true, message: 'Join requirements updated'})
                } else {
                    setJoinRequirementsError('Failed to update joining criteria')
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

        if(file) {
            houseData.photo = file;
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
            window.location.reload();
        }        
    }, 5000)

    return (
        <div className='houseDetails-container'>
            {userResponseMessage.visible && <ResponseMessage backgroundColor='#e6ffee' color='green' message={userResponseMessage.message}/>}
            <div className="main">
                <div className='house-details'>
                    <h3 style={{marginBottom: '20px'}}>House Information</h3>
                    {/* <div 
                        style={{background: "url('http://localhost:5000/api/uploads/"+houseData.photo+"')", 
                        width: '100%',
                        height: '400px',
                        backgroundSize: 'cover', 
                        backgroundRepeat: 'no-repeat'
                    }}
                        className='house-photo'>
                    </div> */}
                    <img 
                        src={`http://localhost:5000/api/uploads/${houseData.photo}`} 
                        alt="" 
                        style={{width: '100%',height: '400px'}}
                    />
                    {houseFormError && <ResponseMessage backgroundColor='#ffcccc' color='red' message={houseFormError}/>}
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
                            <div className='input-label-container'>
                                <label htmlFor="tenantOne">Your name: </label>
                                <input type="text" name="tenantOne" value={houseData.tenantOne} onChange={handleHouseInputs} placeholder='Your name' id="tenatOne" />
                            </div>
                            <div className='input-label-container'>
                                <label htmlFor="yourphone">Your Phone number: </label>
                                <input type="text" name="phoneNumberOfFirstTenant" value={houseData.phoneNumberOfFirstTenant} onChange={handleHouseInputs} placeholder='Phone number' id="yourphone" />
                            </div>
                            <div className='input-label-container' style={{justifyContent: 'flex-end', alignItems: 'flex-end', marginTop: '20px'}}>
                                <input id='submit-modifications' type="submit" value="Save modifications" />
                            </div>
                        </div>
                    </form>

                    <div className="other-relevant-info">
                        <div className="input-label-container">
                            <p className='title'>Verified? </p>
                            <p className='data'>{houseData.verified}</p>
                        </div>
                        <div className="input-label-container">
                            <p className='title'>Partner: </p>
                            <p className='data'>{houseData.tenantTwo}</p>
                        </div>
                        <div className="input-label-container">
                            <p className='title'>Number of Join Requests: </p>
                            <p className='data'>{joinRequests.length}</p>
                        </div>
                    </div>
                    
                    <div className="join-requests-space">
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
                    </div>
                </div>

                <div className='join-house-descriptions'>
                    <h3 style={{marginBottom: '20px'}}>Joining Requirements</h3>
                    <form onSubmit={updateRequirementsData} className='form-data'>
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
                            <input type="number" name="age" value={joinRequirements.age} onChange={handleJoinRequirementInfo} placeholder='Your age' id="age" />
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
                            <label htmlFor="other">Other &nbsp;&nbsp;
                                <input type="radio" name="gender" id="other" value='Other' onChange={handleJoinRequirementInfo} checked={joinRequirements.gender==='Other' ? true : false}/>
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


                        <h3 style={{marginBottom: '20px'}}>Referrence Information</h3>
                        <div className="input-label-container">
                            <label htmlFor="referrerEmail">Email of your referrer</label>
                            <input type="text" name="refererEmail" value={joinRequirements.refererEmail} onChange={handleJoinRequirementInfo} placeholder='Email of your referrer' id="referrerEmail" />
                        </div>
                        <div className="input-label-container">
                            <label htmlFor="referrerPhone">Phone number of your referrer</label>
                            <input type="text" name="refererPhoneNumber" value={joinRequirements.refererPhoneNumber} onChange={handleJoinRequirementInfo} placeholder='Phone number of your referrer' id="referrerPhone" />
                        </div>
                        <div className='input-label-container' style={{justifyContent: 'flex-end', alignItems: 'flex-end', marginTop: '20px'}}>
                            <input id='submit-modifications' type="submit" value="Save modifications" />
                        </div>
                        {joinRequirementsError && <ResponseMessage backgroundColor='#ffcccc' color='red' message='Age is required!'/>}
                        {!joinRequirementsError && spinnerTwo.active && <div style={{display: 'flex', alignItems: 'center'}}><p style={{fontSize: '20px', fontWeight: '600', marginRight: '20px'}}>{spinner.message}</p><img style={{width: '50px', height: '50px'}} src={Loading} alt=''/></div>}
                    </form>
                </div>
            </div>    
        </div>
    )
}

export default UserHouseDetails