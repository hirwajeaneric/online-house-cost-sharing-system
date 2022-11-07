import React, { useState } from 'react'
import ResponseMessage from '../responses/ResponseMessage';
import axios from 'axios';

const PostHouseForm = () => {
  
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
    refererEmail:'',
    refererPhoneNumber:''
  })

  const [houseData, setHouseData] = useState({
    number: '',
    type: '',
    location: '',
    tenantOne: '',
    phoneNumberOfFirstTenant: '',
    description: '',
    rent: '',
    verified: 'No',
    rooms:'',
    bathRooms: '',
    hasFurniture: '',
    joinPost: '',
    JoinRequests: ''
  });

  const[savedHouse, setSavedHouse] = useState({});
  const[savedRequirements, setSavedRequirements] = useState({});

  const[errors, setErrors] = useState('');

  const handleHouseInputs = ({currentTarget: input}) => {
    setHouseData({...houseData, [input.name]: input.value})
    console.log(houseData);
  }

  const handleJoinRequirementInfo = ({currentTarget: input}) => {
    setJoinRequirements({...joinRequirements, [input.name]: input.value})
    console.log(joinRequirements);
  }

  const submitPost = (e) => {
    e.preventDefault();
    houseData.tenantOne = joinRequirements.names;
    houseData.phoneNumberOfFirstTenant = joinRequirements.phoneNumber;

    const HOUSE_URL = 'http://localhost:5000/api/house/save';
    const JOINREQUIREMENTS_URL = 'http://localhost:5000/api/joinRequirements/save';

    axios.post(HOUSE_URL, houseData)
    .then(res=> {
      setSavedHouse(res.data.message);
      console.log(savedHouse);
    })
    .catch(error=> setErrors(error));

    axios.post(JOINREQUIREMENTS_URL, joinRequirements)
    .then(res=> {
      setSavedRequirements(res.data.message);
      console.log(savedRequirements);
    })
    .catch(error=> setErrors(error));

  }

  return (
    <div className='posthouse-form-container' style={{boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 3px 10px 0 rgba(0, 0, 0, 0.19);'}}>
      <form onSubmit={submitPost}>
        <fieldset className='personal-info-section'>
          <legend className='personal-info-legend'>Your personal information</legend>
            <input type='text' name='names' value={joinRequirements.names}onChange={handleJoinRequirementInfo} placeholder='Name'/>
            <fieldset>
              <legend>Your gender</legend>
              <label htmlFor="tenantmale">Male</label>
              <input type="radio" onChange={handleJoinRequirementInfo} value='Male' name="tenantGender" id="tenantmale"/>
              <label htmlFor="tenantfemale">Female</label>
              <input type="radio" onChange={handleJoinRequirementInfo} name="tenantGender" value='Female' id="tenantfemale" />
              <label htmlFor="tenantother">Other</label>
              <input type="radio" onChange={handleJoinRequirementInfo} value='Other' name="tenantGender" id="tenantother" />
            </fieldset>
            <input type="text" name="age" value={joinRequirements.age} onChange={handleJoinRequirementInfo} placeholder='Your age' />
            <input type='email' name='email' value={joinRequirements.email} onChange={handleJoinRequirementInfo} placeholder='Email address'/>
            <input type="text" name="phoneNumber" value={joinRequirements.phoneNumber} onChange={handleJoinRequirementInfo} placeholder='Your phone number' />
        </fieldset>

        <fieldset className='house-information-section'>
          <legend className='house-information-section-legend'>House information</legend>
          <input type="text" name="number" value={houseData.number} onChange={handleHouseInputs} placeholder='House number' />
          <select name='type' value={houseData.type} onChange={handleHouseInputs}>
            <option value="">Choose Type</option>
            <option value="appartment">Appartment</option>
            <option value="Single house, one floor">Single house, one floor</option>
            <option value="Single house, two floors">Single house, two floors</option>
          </select>
          <input type="text" name="location"  value={houseData.location} onChange={handleHouseInputs} placeholder='House location' />
          <input type="file" name="photo"/>
          <textarea name="description" value={houseData.description} onChange={handleHouseInputs} placeholder='House description' rows='3'></textarea>
          <input type="text" name="rent" value={houseData.rent} onChange={handleHouseInputs} placeholder='Total rent cost'/>
          <input type="number" name="rooms" value={houseData.rooms} onChange={handleHouseInputs} placeholder='Number of rooms'/>
          <input type="number" name="bathRooms" value={houseData.bathRooms} onChange={handleHouseInputs} placeholder='Number of bathrooms' />
          <fieldset>
            <legend>Furnished?</legend>
            <label htmlFor="furnished">Yes</label>
            <input type="radio" value='Yes' name="hasFurniture" onChange={handleHouseInputs} id="furnished"/>
            <label htmlFor="notfurnished">No</label>
            <input type="radio" value='No' name="hasFurniture" onChange={handleHouseInputs} id="notfurnished"/>
          </fieldset>
        </fieldset>

        <fieldset className='joining-requirements'>
          <legend className='joining-requirements-legend'>Requirements for joining</legend>
            <input type='text' name='ageOfJoiner' value={joinRequirements.ageOfJoiner} onChange={handleJoinRequirementInfo} placeholder='Age preference. Format: 18-30'/>
            <fieldset>
              <legend>Gender</legend>
              <label htmlFor="male">Male</label>
              <input type="radio" value='Male' name="gender" onChange={handleJoinRequirementInfo} id="male"/>
              <label htmlFor="female">Female</label>
              <input type="radio" value='Female' name="gender" onChange={handleJoinRequirementInfo} id="female" />
              <label htmlFor="other">Other</label>
              <input type="radio" value='Other' name="gender" onChange={handleJoinRequirementInfo} id="other" />
            </fieldset>
            <fieldset>
              <legend>Marital Status</legend>
              <label htmlFor="married">Married</label>
              <input type="radio" value='Married' name="maritalStatus" onChange={handleJoinRequirementInfo} id="married"/>
              <label htmlFor="single">Single</label>
              <input type="radio" value='Single' name="maritalStatus" onChange={handleJoinRequirementInfo} id="single"/>
            </fieldset>
            <input type="text" name="languages" value={joinRequirements.languages} onChange={handleJoinRequirementInfo} placeholder='Spoken languages. "Separate by comma"' />
            <fieldset>
              <legend>Has Pet/s?</legend>
              <label htmlFor="haspet">Yes</label>
              <input type="radio" value='Yes' name="hasPet" onChange={handleJoinRequirementInfo} id="haspet"/>
              <label htmlFor="hasnopet">No</label>
              <input type="radio" value='No' name="hasPet" onChange={handleJoinRequirementInfo} id="hasnopet" />
              <label htmlFor="haspetorno">Don't mind</label>
              <input type="radio" value="Don't mind" name="hasPet" onChange={handleJoinRequirementInfo} id="haspetorno" />
            </fieldset>
            <fieldset>
              <legend>Has special medical conditions?</legend>
              <label htmlFor="medicalconds">Yes</label>
              <input type="radio" value="Yes" name="hasSpecialMedicalConditions" onChange={handleJoinRequirementInfo} id="medicalconds"/>
              <label htmlFor="nomedicalconds">No</label>
              <input type="radio" value="No" name="hasSpecialMedicalConditions" onChange={handleJoinRequirementInfo} id="nomedicalconds" />
              <label htmlFor="hasorno">Don't mind</label>
              <input type="radio" value="Don't mind" name="hasSpecialMedicalConditions" onChange={handleJoinRequirementInfo} id="hasorno" />
            </fieldset>
            <fieldset>
              <legend>Do you accept a smoker?</legend>
              <label htmlFor="acceptsmoker">Yes</label>
              <input type="radio" value="Yes" name="smoke" onChange={handleJoinRequirementInfo} id="acceptsmoker"/>
              <label htmlFor="noacceptsmoker">No</label>
              <input type="radio" value="No" name="smoke" onChange={handleJoinRequirementInfo} id="noacceptsmoker" />
              <label htmlFor="acceptsmokerorno">Don't mind</label>
              <input type="radio" value="Don't mind" name="smoke" onChange={handleJoinRequirementInfo} id="acceptsmokerorno" />
            </fieldset>
            <textarea name='moreDescriptions' value={joinRequirements.moreDescriptions} id='more-descritions' onChange={handleJoinRequirementInfo} placeholder='More descriptions'>
            </textarea>
        </fieldset>

        <fieldset className='reference-information'>
          <legend className='reference-information-legend'>Reference information</legend>
          <input type='text' name='refererPhoneNumber' value={joinRequirements.refererPhoneNumber} onChange={handleJoinRequirementInfo} placeholder='Referer Phone Number'/>
          <input type='email' name='refererEmail' value={joinRequirements.refererEmail} onChange={handleJoinRequirementInfo} placeholder='Referer Email'/>
        </fieldset>
        <input style={{ marginBottom: '20px' ,boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 3px 10px 0 rgba(0, 0, 0, 0.19)'}} type="submit" value="Submit Post" />
      </form>
      <ResponseMessage backgroundColor='#ffcccc' color='red' message='Age is required!'/>
    </div>
  )
}

export default PostHouseForm