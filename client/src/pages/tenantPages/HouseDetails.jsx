import React from 'react'
import '../../components/house-details/housedetails.css';
import { FaBath, FaBed, FaChair, FaHome, FaThumbsUp } from 'react-icons/fa';
import ResponseMessage from '../../components/responses/ResponseMessage';

const HouseDetails = () => {
  
  const joinFormManager = () => {

  }

  return (
    <div className='house-details-container'>
      <ResponseMessage backgroundColor='#e6ffee' color='green' message='Join request sent'/>
      <div className='house-details'>
        <div className='house-photo'></div>
        <div className='other-house-info'>
          <h4>DESCRIPTION</h4>
          <p className="house-description">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. At neque porro ea accusantium necessitatibus ullam quis quae sequi corporis ex, eligendi similique beatae placeat illum perspiciatis quos numquam sunt velit?
          </p>
          <p className="location">Location: <span>Vision city 2</span></p>
          <p className='rent-price'>Rent price: <span>1000 USD</span></p>
          <h4 className="other-house-descriptions">MORE DETAILS</h4>
          <div className="more-details">
            <p className="type">
              <span className='left'><FaHome  className='icon'/> Type:</span> 
              <span className='right'>Apartment</span>
            </p>
            <p className="verified">
              <span className='left'><FaThumbsUp className='icon'/> Verified?:</span>
              <span className='right'>Yes</span>
            </p>
            <p className="rooms">
              <span className='left'><FaBed className='icon'/> Number of roooms:</span> 
              <span className='right'>4</span>
            </p>
            <p className="bathrooms">
              <span className='left'><FaBath className='icon'/> Bathrooms:</span> 
              <span className='right'>3</span>
            </p>
            <p className="furniture">
              <span className='left'><FaChair className='icon'/> Furnished:</span> 
              <span className='right'>Yes</span>
            </p>
          </div>
          <h4>CURRENT OCCUPIER</h4>
          <p className='nameofoccupier'><span className='left'>Name of occupier:</span> <span className='right'>John Doe</span></p>
          <p className='phone-number'><span className='left'>Phone number of occupier:</span> <span className='right'>07896273232</span></p>
          <p className='emailofoccupier'><span className='left'>Email of occupier:</span> <span className='right'>firstname@gmail.com</span></p>
          <p className='genderofoccupier'><span className='left'>Gender:</span> <span className='right'>Male</span></p>
        </div>      
      </div>

      <div className='join-house-descriptions'>
        <h3 style={{marginBottom: '20px'}}>JOINING REQUIREMENTS</h3>
        <div className='details'>
          <p className="description">Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto voluptate totam quibusdam rerum soluta eveniet, beatae eligendi vero sunt est quos adipisci qui praesentium inventore voluptatum vitae. Nobis, quae! Corrupti?</p>
          <h4>CRITERIA</h4>
          <div className='listing-container'>
            <p className='title'>Gender of preference:</p>
            <p className='info'>Male</p>
          </div>
          <div className='listing-container'>
            <p className='title'>Age of preference:</p>
            <p className='info'>24 - 30</p>
          </div>
          <div className='listing-container'>
            <p className='title'>Preferred marital status:</p>
            <p className='info'>Single</p>
          </div>
          <div className='listing-container'>
            <p className='title'>Languages of preference:</p>
            <p className='info'>French, English, Kinyarwanda</p>
          </div>
          <div className='listing-container'>
            <p className='title'>Onws pet:</p>
            <p className='info'>No</p>
          </div>
          <div className='listing-container'>
            <p className='title'>Has special Medical conditions:</p>
            <p className='info'>Yes</p>
          </div>
          <div className='listing-container'>
            <p className='title'>Smoke:</p>
            <p className='info'>No</p>
          </div>
        </div> 

        <h3 style={{marginBottom: '10px'}}>WOULD LIKE TO JOIN?</h3>
        
        <button className='join-button' onClick={()=> joinFormManager()}>JOIN</button>
        
        <form>
          <div className='input-label-container'>
            <label htmlFor='name'>Your name: </label>
            <input type="text" name="nameOfJoiner" placeholder='Full name' id="name" />
          </div>
          <div className='input-label-container'>
            <label htmlFor='age'>Your age: </label>
            <input type="number" name="ageOfJoiner" placeholder='Your age' id="age" />
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
            <label htmlFor='languages'>Languages spoken: </label>
            <input type="text" name="languages" placeholder='Separate with comma' id="languages" />
          </div>
          <fieldset>
            <legend>Your marital status</legend>
            <label htmlFor="married">Married &nbsp;&nbsp;
                <input type="radio" name="maritalStatus" id="married"/>
            </label>
            <label htmlFor="single">Single &nbsp;&nbsp;
                <input type="radio" name="maritalStatus" id="single"/>
            </label>
          </fieldset>
          <fieldset>
            <legend>Do you have pet/s?</legend>
            <label htmlFor="haspet">Yes &nbsp;&nbsp;
                <input type="radio" name="hasPet" id="haspet"/>
            </label>
            <label htmlFor="hasnopet">No &nbsp;&nbsp;
                <input type="radio" name="hasPet" id="hasnopet" />
            </label>
            <label htmlFor="haspetorno">Might get one in the future &nbsp;&nbsp;
                <input type="radio" name="hasPet" id="haspetorno" />
            </label>
          </fieldset>
          <fieldset>
            <legend>Do you have special medical conditions?</legend>
            <label htmlFor="medicalconds">Yes &nbsp;&nbsp;
                <input type="radio" name="hasSpecialMedicalConditions" id="medicalconds"/>
            </label>
            <label htmlFor="nomedicalconds">No &nbsp;&nbsp;
                <input type="radio" name="hasSpecialMedicalConditions" id="nomedicalconds" />
            </label>
          </fieldset>
          <div className='input-label-container'>
            <label htmlFor='medicalcondition'>What is your medical condition? </label>
            <input type="text" name="medicalCondition" placeholder='Medical condition' id="medicalcondition" />
          </div>
          <fieldset>
            <legend>Do you smoke?</legend>
            <label htmlFor="acceptsmoker">Yes &nbsp;&nbsp;
                <input type="radio" name="smoke" id="acceptsmoker"/>
            </label>
            <label htmlFor="noacceptsmoker">No &nbsp;&nbsp;
                <input type="radio" name="smoke" id="noacceptsmoker" />
            </label>
          </fieldset>
          <div className='input-label-container'>
            <label htmlFor="more-descriptions">Your comment:</label>
            <textarea rows='4' name='moreDescriptions' id='more-descritions' placeholder='What is on your mind?'>
            </textarea>
          </div>
          <fieldset>
            <legend>What do you think about the above criteria?</legend>
            <label htmlFor="okay">I am okay with them &nbsp;&nbsp;
                <input type="radio" name="agreeWithCriteria" id="okay"/>
            </label>
            <label htmlFor="discuss">We can discuss on some of them &nbsp;&nbsp;
                <input type="radio" name="agreeWithCriteria" id="discuss"/>
            </label>
          </fieldset>
          <div className='input-label-container' style={{justifyContent: 'flex-end', alignItems: 'flex-end', marginTop: '20px'}}>
              <input id='submit-modifications' type="submit" value="Submit Join Request" />
          </div>
          <div className="input-label-container">
            <ResponseMessage backgroundColor='#ffcccc' color='red' message='Age is required!'/>
          </div>
        </form>
      </div>

    </div>
  )
}

export default HouseDetails