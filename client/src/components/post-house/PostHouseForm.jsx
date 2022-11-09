import React, { useContext, useState } from 'react'
import ResponseMessage from '../responses/ResponseMessage';
import axios from 'axios';
import Loading from '../../assets/imgs/3dotsspiner.gif';
import { useNavigate } from 'react-router-dom';
import { UserResponseMessageSetterContext } from '../../App';

const PostHouseForm = () => {
  const UserResponseMessageSetter = useContext(UserResponseMessageSetterContext);
  const navigate = useNavigate();
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
    phoneNumberOfFirstTenant: '',
    description: '',
    rent: '',
    verified: 'No',
    rooms:'',
    bathRooms: '',
    hasFurniture: '',
    joinPost: '',
    JoinRequests: 0
  });

  function resetInputs() {
    setJoinRequirements({
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
      refererPhoneNumber:'',
      numberOfJoinRequests: ''
    });

    setHouseData({
      number: '',
      type: '',
      location: '',
      tenantOne: '',
      tenantTwo: '',
      phoneNumberOfFirstTenant: '',
      description: '',
      rent: '',
      photo: '',
      verified: 'No',
      rooms:'',
      bathRooms: '',
      hasFurniture: '',
      joinPost: '',
      joinRequests: 0
    });

    setErrors('');
    setSpinner({active: false, message: ''});
  }

  const[errors, setErrors] = useState('');

  const[spinner, setSpinner] = useState({active: false, message: ''});

  const handleFile = (e) => {
    const {files} = e.target;
    setFile(files[0]);
  }

  const handleHouseInputs = ({currentTarget: input}) => {
    setHouseData({...houseData, [input.name]: input.value});
  }

  const handleJoinRequirementInfo = ({currentTarget: input}) => {
    setJoinRequirements({...joinRequirements, [input.name]: input.value});
  }

  const submitPost = async(e) => {

    e.preventDefault();

    console.log('All house data: ');
    console.log(houseData);

    const config = {
      headers: {
        "Content-Type":"multipart/form-data"
      }
    }

    houseData.username = localStorage.getItem('userIdentity');
    houseData.photo = file;
    houseData.tenantOne = joinRequirements.names;
    houseData.phoneNumberOfFirstTenant = joinRequirements.phoneNumber;
    
    if (joinRequirements.names === '') {
      setErrors('Your name is required')
      return;
    } else if (joinRequirements.tenantGender === '') {
      setErrors('Your name is required')
      return;
    } else if (joinRequirements.email === '') {
      setErrors('Your email is required')
      return;
    } else if (joinRequirements.phoneNumber === '') {
      setErrors('Your phone number is required')
      return;
    } else if (joinRequirements.phoneNumber.length !== 10) {
      setErrors('Invalid phone number')
      return;
    } else if (joinRequirements.age === '') {
      setErrors('Your age is required')
      return;
    } else if (joinRequirements.gender === '') {
      setErrors('Required gender to join is required')
      return;
    } else if (joinRequirements.ageOfJoiner === '') {
      setErrors('Prefered age range is required')
      return;
    } else if (joinRequirements.maritalStatus === '') {
      setErrors('Marital status required to join is required')
      return;
    } else if (joinRequirements.languages === '') {
      setErrors('Spoken Language(s) required to join is/are required')
      return;
    } else if (joinRequirements.hasPet === '') {
      setErrors("Has pet can not be left empty")
      return;
    } else if (joinRequirements.hasSpecialMedicalConditions === '') {
      setErrors("Has special medical conditions can't be left empty")
      return;
    } else if (joinRequirements.smoke === '') {
      setErrors("Do you accept a smoker can't be left empty")
      return;
    } else if (joinRequirements.moreDescriptions === '') {
      setErrors('More descriptions are required')
      return;
    } else if (houseData.number === '') {
      setErrors('House number is required')
      return;
    } else if (houseData.type === '') {
      setErrors('House type is required')
      return;
    } else if (houseData.location === '') {
      setErrors('Location is required')
      return;
    } else if (houseData.description === '') {
      setErrors('House descriptions are required')
      return;
    } else if (houseData.rent === '') {
      setErrors('Rent is required')
      return;
    } else if (houseData.rooms === '') {
      setErrors('The number of roooms is required')
      return;
    } else if (houseData.bathRooms === '') {
      setErrors('The number of bathrooms is required')
      return;
    } else if (houseData.hasFurniture === '') {
      setErrors('Furnished? (Has furniture) can not be left empty')
      return;
    } else if (houseData.rooms <= 0) {
      setErrors('Invalid number of rooms')
      return;
    } else if (houseData.bathRooms <= 0) {
      setErrors('Invalid number of bathrooms')
      return;
    } else if(houseData.photo === '') {
      setErrors('A photo of the house is required')
      return;
    } else {
      try {
        setErrors('');
        const isAlreadySaved = await axios.get(`http://localhost:5000/api/house/findByNumber?number=${houseData.number}`);
        if (isAlreadySaved.data[0]) {
          setErrors('This house is already posted!');
        } else {
          await axios.post('http://localhost:5000/api/house/save', houseData, config);
          await axios.post('http://localhost:5000/api/joinRequirements/save', joinRequirements);
          setSpinner({
            active: true,
            message: 'Saving, It will take a few seconds...'
          });
          setTimeout(async () => {
            const fetchedHouse = await axios.get(`http://localhost:5000/api/house/findByNumber?number=${houseData.number}`);  
            if(fetchedHouse.data[0].joinPost) {
              setSpinner({
                active: true,
                message: 'Saved'
              });
              UserResponseMessageSetter({visible: true, message: 'House successfully posted!'});
              resetInputs();
              navigate(`/profile/${localStorage.getItem('userIdentity')}`);
            } else {
              setErrors('Unable to create post, Please try again! Make sure your email and phone number were never used before here.');
            }
          }, 10000);
        }
      } catch (error) {
        setErrors(error)
      } 
    }
  }

  return (
    <div className='posthouse-form-container' style={{boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 3px 10px 0 rgba(0, 0, 0, 0.19);'}}>
      <form onSubmit={submitPost}>
        {/* First Personal information about joining requirements */}
        <fieldset className='personal-info-section'>
          <legend className='personal-info-legend'>Your personal information</legend>
            <input type='text' name='names' value={joinRequirements.names}onChange={handleJoinRequirementInfo} placeholder='Name'/>
            <fieldset>
              <legend>Your gender</legend>
              <label htmlFor="tenantmale">Male</label>
              <input type="radio" onChange={handleJoinRequirementInfo} name="tenantGender" value='Male' id="tenantmale"/>
              <label htmlFor="tenantfemale">Female</label>
              <input type="radio" onChange={handleJoinRequirementInfo} name="tenantGender" value='Female' id="tenantfemale" />
              <label htmlFor="tenantother">Other</label>
              <input type="radio" onChange={handleJoinRequirementInfo} name="tenantGender" value='Other' id="tenantother" />
            </fieldset>
            <input type="text" name="age" value={joinRequirements.age} onChange={handleJoinRequirementInfo} placeholder='Your age' />
            <input type='email' name='email' value={joinRequirements.email} onChange={handleJoinRequirementInfo} placeholder='Email address'/>
            <input type="text" name="phoneNumber" value={joinRequirements.phoneNumber} onChange={handleJoinRequirementInfo} placeholder='Your phone number' />
        </fieldset>

        {/* House information */}
        <fieldset className='house-information-section'>
          <legend className='house-information-section-legend'>House information</legend>
          <input type="text" name="number" value={houseData.number} onChange={handleHouseInputs} placeholder='House number' />
          <select name='type' value={houseData.type} onChange={handleHouseInputs}>
            <option value="">Choose House Type</option>
            <option value="appartment">Appartment</option>
            <option value="Single house, one floor">Single house, one floor</option>
            <option value="Single house, two floors">Single house, two floors</option>
          </select>
          <input type="text" name="location"  value={houseData.location} onChange={handleHouseInputs} placeholder='House location' />
          <input type="file" name="photo" onChange={handleFile}/>
          <textarea name="description" value={houseData.description} onChange={handleHouseInputs} placeholder='House description' rows='3'></textarea>
          <input type="text" name="rent" value={houseData.rent} onChange={handleHouseInputs} placeholder='Total rent cost'/>
          <input type="text" name="rooms" value={houseData.rooms} onChange={handleHouseInputs} placeholder='Number of rooms'/>
          <input type="text" name="bathRooms" value={houseData.bathRooms} onChange={handleHouseInputs} placeholder='Number of bathrooms' />
          <fieldset>
            <legend>Furnished?</legend>
            <label htmlFor="furnished">Yes</label>
            <input type="radio" value='Yes' name="hasFurniture" onChange={handleHouseInputs} id="furnished"/>
            <label htmlFor="notfurnished">No</label>
            <input type="radio" value='No' name="hasFurniture" onChange={handleHouseInputs} id="notfurnished"/>
          </fieldset>
        </fieldset>
        {/* Other joining requirements */}
        <fieldset className='joining-requirements'>
          <legend className='joining-requirements-legend'>Requirements for joining</legend>
            <input type='text' name='ageOfJoiner' value={joinRequirements.ageOfJoiner} onChange={handleJoinRequirementInfo} placeholder='Age preference. Format: 18-30'/>
            <fieldset>
              <legend>Gender</legend>
              <label htmlFor="male">Male</label>
              <input type="radio" name="gender" value='Male' onChange={handleJoinRequirementInfo} id="male"/>
              <label htmlFor="female">Female</label>
              <input type="radio" name="gender" value='Female' onChange={handleJoinRequirementInfo} id="female" />
              <label htmlFor="other">Other</label>
              <input type="radio" name="gender" value='Other' onChange={handleJoinRequirementInfo} id="other" />
            </fieldset>
            <fieldset>
              <legend>Marital Status</legend>
              <label htmlFor="married">Married</label>
              <input type="radio" name="maritalStatus" value='Married' onChange={handleJoinRequirementInfo} id="married"/>
              <label htmlFor="single">Single</label>
              <input type="radio" name="maritalStatus" value='Single' onChange={handleJoinRequirementInfo} id="single"/>
            </fieldset>
            <input type="text" name="languages" value={joinRequirements.languages} onChange={handleJoinRequirementInfo} placeholder='Spoken languages. "Separate by comma"' />
            <fieldset>
              <legend>Has Pet/s?</legend>
              <label htmlFor="hasnopet">No</label>
              <input type="radio" name="hasPet" value='No' onChange={handleJoinRequirementInfo} id="hasnopet" />
              <label htmlFor="haspetorno">Don't mind</label>
              <input type="radio" name="hasPet" value="Don't mind" onChange={handleJoinRequirementInfo} id="haspetorno" />
            </fieldset>
            <fieldset>
              <legend>Has special medical conditions?</legend>
              <label htmlFor="nomedicalconds">No</label>
              <input type="radio" name="hasSpecialMedicalConditions" value="No" onChange={handleJoinRequirementInfo} id="nomedicalconds" />
              <label htmlFor="hasorno">Don't mind</label>
              <input type="radio" name="hasSpecialMedicalConditions" value="Don't mind" onChange={handleJoinRequirementInfo} id="hasorno" />
            </fieldset>
            <fieldset>
              <legend>Do you accept a smoker?</legend>
              <label htmlFor="noacceptsmoker">No</label>
              <input type="radio" name="smoke" value="No" onChange={handleJoinRequirementInfo} id="noacceptsmoker" />
              <label htmlFor="acceptsmokerorno">Don't mind</label>
              <input type="radio" name="smoke" value="Don't mind" onChange={handleJoinRequirementInfo} id="acceptsmokerorno" />
            </fieldset>
            <textarea name='moreDescriptions' value={joinRequirements.moreDescriptions} id='more-descritions' onChange={handleJoinRequirementInfo} placeholder='More descriptions'>
            </textarea>
        </fieldset>

        {/* Information about the reference. */}
        <fieldset className='reference-information'>
          <legend className='reference-information-legend'>Reference information</legend>
          <input type='text' name='refererPhoneNumber' value={joinRequirements.refererPhoneNumber} onChange={handleJoinRequirementInfo} placeholder='Referer Phone Number'/>
          <input type='email' name='refererEmail' value={joinRequirements.refererEmail} onChange={handleJoinRequirementInfo} placeholder='Referer Email'/>
        </fieldset>
        <div style={{diplay: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center', width: '100%'}}>
          <div style={{width: '100%'}}>
            <input style={{width: '100%', cursor: 'pointer', marginBottom: '20px' ,boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 3px 10px 0 rgba(0, 0, 0, 0.19)'}} type="submit" value="Submit Post" />
          </div>
          <div style={{width: '100%'}}>
            <button 
              onClick={()=> resetInputs()}
              style={{
                width: '100%', 
                cursor: 'pointer', 
                color: 'white', 
                background: 'black', 
                padding: '8px 12px', 
                borderRadius: '10px', 
                marginBottom: '20px' ,
                boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 3px 10px 0 rgba(0, 0, 0, 0.19)'
              }} 
              type="button">Cancel
            </button>
          </div>
        </div>
      </form>
      {errors && <ResponseMessage backgroundColor='#ffcccc' color='red' message={errors}/>}
      {!errors && spinner.active && <div style={{display: 'flex', alignItems: 'center'}}><p style={{fontSize: '20px', fontWeight: '600', marginRight: '20px'}}>{spinner.message}</p><img style={{width: '50px', height: '50px'}} src={Loading} alt=''/></div>}
    </div>
  )
}

export default PostHouseForm