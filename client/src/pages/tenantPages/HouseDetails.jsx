import React, { useContext, useEffect, useState } from 'react'
import '../../components/house-details/housedetails.css';
import { FaBath, FaBed, FaChair, FaHome, FaThumbsUp } from 'react-icons/fa';
import ResponseMessage from '../../components/responses/ResponseMessage';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { UserResponseMessageContext, UserResponseMessageSetterContext } from '../../App';

const HouseDetails = () => {
  const responseMessage = useContext(UserResponseMessageContext);
  const responseMessageSetter = useContext(UserResponseMessageSetterContext);
  const navigate = useNavigate();
  const params = useParams();
  
  const joinFormManager = () => {
    navigate('/auth/signin');
  }

  const [joinRequirements, setJoinRequirements] = useState({});
  const [house, setHouse] = useState({});
  const [error, setError] = useState(''); 
  const [joinRequest, setJoinRequest] = useState({
    name: '', 
    age: '',
    gender: '',
    maritalStatus: '',
    language: '',
    hasPet: '',
    specialMedicalConditions: '',
    medicalCondition: '',
    smoke: '',
    comment: '',
    sendDate: new Date().toDateString(),
    approved: 'No',
    joinPost: joinRequirements._id,
  });

  function resetInputs() {
    setJoinRequest({
      name: '', 
      age: '',
      gender: '',
      maritalStatus: '',
      hasPet: '',
      language: '',
      specialMedicalConditions: '',
      medicalCondition: '',
      smoke: '',
      comment: '',
      sendDate: '',
      approved: '',
      joinPost: joinRequirements._id,
    });
  }

  /** Removing the response message after 5 secs */
  setTimeout(()=>{
    if (responseMessage.visible) {
        responseMessageSetter({visible: false, message: ''});
    }        
  }, 5000);

  /**Fetch house */
  useEffect(()=> {
    axios.get(`http://localhost:5000/api/house/findById?id=${params.id}`,{ 
        headers: {
            "Content-Type":"application/json"    
        }
    })
    .then(response=>{
        setHouse(response.data);
    })
    .catch(error => {
        console.log(error);
    })
  },[]);

  /**Fetch Join requirements (Criteria) */
  useEffect(()=> {
    axios.get(`http://localhost:5000/api/joinRequirements/findById?id=${house.joinPost}`)
    .then(response=>{
        setJoinRequirements(response.data);
    })
    .catch(error => {
        console.log(error);
    })
  },[house.joinPost]);

  /** Handle inputs */
  const handleInputs = ({currentTarget: input}) => {
    setJoinRequest({...joinRequest, [input.name]: input.value});
  }

  /** Saving the join request */
  const sendRequest = (e) => {
    e.preventDefault();

    if (joinRequest.name === '') {
      setError('Your name is required');
      return;
    } else if(joinRequest.age === ''){
      setError('Your age is required');
      return;
    } else if(joinRequest.gender === ''){
      setError('Your gender is required');
      return;
    } else if(joinRequest.maritalStatus === ''){
      setError('Your marital status is required');
      return;
    } else if(joinRequest.hasPet === ''){
      setError('Do you have pet/s can not be left empty');
      return;
    } else if(joinRequest.specialMedicalConditions === ''){
      setError('Do you have special medical conditions? can not be left empty.');
      return;
    } else if(joinRequest.smoke === ''){
      setError('Do you smoke can not be left empty');
      return;
    } else {
      joinRequest.sendDate = new Date().toDateString();
      joinRequest.approved = 'No';
      joinRequest.joinPost = joinRequirements._id;
      
      setError('');

      console.log(joinRequest);
      axios.post('http://localhost:5000/api/joinRequest/save', joinRequest)
      .then(response => {
        if(response.data) {
          console.log(response.data);
          responseMessageSetter({visible: true, message: response.data.message});
          resetInputs();
        }
      })
      .catch(error => {
        setError(error);
      })
    }
  }

  return (
    <div className='house-details-container'>
      {responseMessage.visible && <ResponseMessage backgroundColor='#e6ffee' color='green' message={responseMessage.message}/>}
      <div className='house-details'>
        <img src={`http://localhost:5000/api/uploads/${house.photo}`} style={{width: '100%'}} alt="" />
        <div className='other-house-info' style={{width: '100%'}}>
          <h4>DESCRIPTION</h4>
          <p className="house-description">{house.description}</p>
          <p className="location">Location: <span>{house.location}</span></p>
          <p className='rent-price'>Rent price: <span>{house.rent} FRW</span></p>
          <h4 className="other-house-descriptions">MORE DETAILS</h4>
          <div className="more-details">
            <p className="type">
              <span className='left'><FaHome  className='icon'/> Type:</span> 
              <span className='right'>{house.type}</span>
            </p>
            <p className="verified">
              <span className='left'><FaThumbsUp className='icon'/> Verified?:</span>
              <span className='right'>{house.verified}</span>
            </p>
            <p className="rooms">
              <span className='left'><FaBed className='icon'/> Number of roooms:</span> 
              <span className='right'>{house.rooms}</span>
            </p>
            <p className="bathrooms">
              <span className='left'><FaBath className='icon'/> Bathrooms:</span> 
              <span className='right'>{house.bathRooms}</span>
            </p>
            <p className="furniture">
              <span className='left'><FaChair className='icon'/> Furnished:</span> 
              <span className='right'>{house.hasFurniture}</span>
            </p>
          </div>
          <h4>CURRENT OCCUPIER</h4>
          <p className='nameofoccupier'><span className='left'>Name of occupier:</span> <span className='right'>{house.tenantOne}</span></p>
          <p className='genderofoccupier'><span className='left'>Gender:</span> <span className='right'>{joinRequirements.tenantGender}</span></p>
          <p className='phone-number'><span className='left'>Phone number of occupier:</span> <span className='right'>{house.phoneNumberOfFirstTenant}</span></p>
        </div>      
      </div>

      <div className='join-house-descriptions'>
        <h3 style={{marginBottom: '20px'}}>JOINING REQUIREMENTS</h3>
        <div className='details'>
          <p className="description">{joinRequirements.moreDescriptions}</p>
          <h4>CRITERIA</h4>
          <div className='listing-container'>
            <p className='title'>Gender of preference:</p>
            <p className='info'>{joinRequirements.gender}</p>
          </div>
          <div className='listing-container'>
            <p className='title'>Age of preference:</p>
            <p className='info'>{joinRequirements.age}</p>
          </div>
          <div className='listing-container'>
            <p className='title'>Preferred marital status:</p>
            <p className='info'>{joinRequirements.maritalStatus}</p>
          </div>
          <div className='listing-container'>
            <p className='title'>Languages of preference:</p>
            <p className='info'>{joinRequirements.languages}</p>
          </div>
          <div className='listing-container'>
            <p className='title'>Onws pet:</p>
            <p className='info'>{joinRequirements.hasPet}</p>
          </div>
          <div className='listing-container'>
            <p className='title'>Has special Medical conditions:</p>
            <p className='info'>{joinRequirements.hasSpecialMedicalConditions}</p>
          </div>
          <div className='listing-container'>
            <p className='title'>Smoke:</p>
            <p className='info'>{joinRequirements.smoke}</p>
          </div>
        </div>

        {joinRequirements.email === localStorage.getItem('userEmail') ? 
        '' 
        : 
        (localStorage.getItem('tenantToken')) 
          ? 
          <>
            <h3 style={{marginBottom: '10px'}}>WOULD LIKE TO JOIN?</h3>
            <form onSubmit={sendRequest}>
              <div className='input-label-container'>
                <label htmlFor='name'>Your name: </label>
                <input type="text" name="name" value={joinRequest.name} onChange={handleInputs} placeholder='Full name' id="name" />
              </div>
              <div className='input-label-container'>
                <label htmlFor='age'>Your age: </label>
                <input type="number" name="age" value={joinRequest.age} onChange={handleInputs} placeholder='Your age' id="age" />
              </div>
              <fieldset>
                <legend>Your gender: </legend>
                <label htmlFor="pmale">Male &nbsp;&nbsp; 
                    <input type="radio" name="gender" value='Male' onChange={handleInputs} 
                    checked={joinRequest.gender ==='' ? false : null} 
                    id="pmale"/>
                </label>
                <label htmlFor="pfemale">Female &nbsp;&nbsp;
                    <input type="radio" name="gender" value='Female' onChange={handleInputs} 
                    checked={joinRequest.gender ==='' ? false : null} 
                    id="pfemale" />
                </label>
                <label htmlFor="pother">Other &nbsp;&nbsp;
                    <input type="radio" name="gender" value='Other' onChange={handleInputs} 
                    checked={joinRequest.gender ==='' ? false : null} 
                    id="pother" />
                </label>
              </fieldset>
              <div className='input-label-container'>
                <label htmlFor='languages'>Languages spoken: </label>
                <input type="text" name="language" value={joinRequest.language} onChange={handleInputs} placeholder='Separate with comma' id="languages" />
              </div>
              <fieldset>
                <legend>Your marital status</legend>
                <label htmlFor="married">Married &nbsp;&nbsp;
                    <input type="radio" name="maritalStatus" value='Married' onChange={handleInputs} checked={joinRequest.maritalStatus ==='' ? false : null} id="married"/>
                </label>
                <label htmlFor="single">Single &nbsp;&nbsp;
                    <input type="radio" name="maritalStatus" value='Single' onChange={handleInputs} checked={joinRequest.maritalStatus ==='' ? false : null} id="single"/>
                </label>
              </fieldset>
              <fieldset>
                <legend>Do you have pet/s?</legend>
                <label htmlFor="haspet">Yes &nbsp;&nbsp;
                    <input type="radio" name="hasPet" value='Yes' onChange={handleInputs} checked={joinRequest.hasPet ==='' ? false : null} id="haspet"/>
                </label>
                <label htmlFor="hasnopet">No &nbsp;&nbsp;
                    <input type="radio" name="hasPet" value='No' onChange={handleInputs} checked={joinRequest.hasPet ==='' ? false : null} id="hasnopet" />
                </label>
                <label htmlFor="haspetorno">Might get one in the future &nbsp;&nbsp;
                    <input type="radio" name="hasPet" value='Might get one in the future' onChange={handleInputs} checked={joinRequest.hasPet ==='' ? false : null} id="haspetorno" />
                </label>
              </fieldset>
              <fieldset>
                <legend>Do you have special medical conditions?</legend>
                <label htmlFor="medicalconds">Yes &nbsp;&nbsp;
                    <input type="radio" name="specialMedicalConditions" value='Yes' onChange={handleInputs} checked={joinRequest.specialMedicalConditions ==='' ? false : null} id="medicalconds"/>
                </label>
                <label htmlFor="nomedicalconds">No &nbsp;&nbsp;
                    <input type="radio" name="specialMedicalConditions" value='No' onChange={handleInputs} checked={joinRequest.specialMedicalConditions ==='' ? false : null} id="nomedicalconds" />
                </label>
              </fieldset>
              {(joinRequest.specialMedicalConditions === 'Yes' || joinRequest.specialMedicalConditions === '') ?
                <div className='input-label-container'>
                  <label htmlFor='medicalcondition'>What is your medical condition? </label>
                  <input type="text" name="medicalCondition" value={joinRequest.medicalCondition} onChange={handleInputs} placeholder='Medical condition' id="medicalcondition" />
                </div>
                : 
                  null
              }
              <fieldset>
                <legend>Do you smoke?</legend>
                <label htmlFor="acceptsmoker">Yes &nbsp;&nbsp;
                    <input type="radio" name="smoke" value='Yes' onChange={handleInputs} checked={joinRequest.smoke ==='' ? false : null} id="acceptsmoker"/>
                </label>
                <label htmlFor="noacceptsmoker">No &nbsp;&nbsp;
                    <input type="radio" name="smoke" value='No' onChange={handleInputs} checked={joinRequest.smoke ==='' ? false : null} id="noacceptsmoker" />
                </label>
              </fieldset>
              <div className='input-label-container'>
                <label htmlFor="more-descriptions">Your comment:</label>
                <textarea rows='4' name='comment' value={joinRequest.comment} onChange={handleInputs} id='more-descritions' placeholder='What is on your mind?'>
                </textarea>
              </div>
              <div className='input-label-container' style={{justifyContent: 'flex-end', alignItems: 'flex-end', marginTop: '20px'}}>
                  <input id='submit-modifications' type="submit" value="Submit Join Request" />
              </div>
              <div className="input-label-container">
                {error && <ResponseMessage backgroundColor='#ffcccc' color='red' message={error}/>}
              </div>
            </form>
          </>
          :
            <button className='join-button' onClick={()=> joinFormManager()}>JOIN</button>
        }
      </div>

    </div>
  )
}

export default HouseDetails