import React, { useContext, useState } from 'react'
import ResponseMessage from '../responses/ResponseMessage';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { UserResponseMessageSetterContext } from '../../App';
import { useEffect } from 'react';

const PostHouseForm = () => {
  const UserResponseMessageSetter = useContext(UserResponseMessageSetterContext);
  const navigate = useNavigate();
  const [file, setFile] = useState('');
  const [owner, setOwner] = useState({});

  const [houseData, setHouseData] = useState({
    number: '',
    type: '',
    location: '',
    description: '',
    rent: '',
    rooms:'',
    ownerId:'',
    bathRooms: '',
    hasFurniture: '',
  });

  function resetInputs() {
    setHouseData({
      number: '',
      type: '',
      location: '',
      description: '',
      rent: '',
      rooms:'',
      ownerId:'',
      bathRooms: '',
      hasFurniture: '',
    });

    setErrors('');
  }

  const[errors, setErrors] = useState('');

  const handleFile = (e) => {
    const {files} = e.target;
    setFile(files[0]);
  }

  useEffect(()=>{
    axios.get(`http://localhost:5000/api/tenant/findByUsername?username=${localStorage.getItem('userIdentity')}`)
    .then(response=>{
      setOwner(response.data);
    })
    .catch(err=>{
      console.log(err);
    })
  },[]);

  const handleHouseInputs = ({currentTarget: input}) => {
    setHouseData({...houseData, [input.name]: input.value});
  }

  const submitPost = async(e) => {

    e.preventDefault();

    const config = {
      headers: {
        "Content-Type":"multipart/form-data"
      }
    }

    houseData.photo = file;
    
    if (houseData.number === '') {
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
          houseData.ownerId = owner._id;
          await axios.post('http://localhost:5000/api/house/save', houseData, config);
          UserResponseMessageSetter({visible: true, message: 'New house added'});
          resetInputs();
          navigate(`/profile/${localStorage.getItem('userIdentity')}`);
        }
      } catch (error) {
        setErrors(error)
      } 
    }
  }

  return (
    <div className='posthouse-form-container' style={{boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 3px 10px 0 rgba(0, 0, 0, 0.19);'}}>
      <form onSubmit={submitPost}>
        <fieldset className='house-information-section'>
          <input type="text" name="number" value={houseData.number} onChange={handleHouseInputs} placeholder='House number' />
          <select name='type' value={houseData.type} onChange={handleHouseInputs}>
            <option value="">Choose House Type</option>
            <option value="appartment">Appartment</option>
            <option value="Single house, one floor">Single house, one floor</option>
            <option value="Single house, two floors">Single house, two floors</option>
          </select>
          <input type="text" name="location"  value={houseData.location} onChange={handleHouseInputs} placeholder='House location' />
          <input type="file" name="photo" accept="image/x-png,image/gif,image/jpeg" onChange={handleFile}/>
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

        <div style={{diplay: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center', width: '100%'}}>
          <div style={{width: '100%'}}>
            <input style={{width: '100%', cursor: 'pointer', marginBottom: '20px' ,boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 3px 10px 0 rgba(0, 0, 0, 0.19)'}} type="submit" value="Submit" />
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
    </div>
  )
}

export default PostHouseForm