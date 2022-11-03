import React from 'react'
import '../../components/house-details/housedetails.css';
import { Link } from 'react-router-dom';
import { FaBath, FaBed, FaChair, FaHome, FaThumbsUp } from 'react-icons/fa';

const HouseDetails = () => {
  return (
    <div className='house-details-container'>

      <div className='house-details'>
        {/* <h3 style={{marginBottom: '20px'}}>House Information</h3> */}
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
            <p className="type"><FaHome /> Type: <span>Apartment</span></p>
            <p className="verified"><FaThumbsUp /> Verified?: <span>Yes</span></p>
            <p className="rooms"><FaBed /> Number of roooms: <span>4</span></p>
            <p className="bathrooms"><FaBath /> Bathrooms: <span>3</span></p>
            <p className="furniture"><FaChair /> Furnished: <span>Yes</span></p>
          </div>
          <h4>CURRENT OCCUPIER</h4>
          <p className='nameofoccupier'>Name of occupier: <span>John Doe</span></p>
          <p className='phone-number'>Phone number of occupier: <span>07896273232</span></p>
          <p className='emailofoccupier'>Email of occupier: <span>firstname@gmail.com</span></p>
          <p className='genderofoccupier'>Gender: <span>Male</span></p>
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

        <h3>WOULD LIKE TO JOIN?</h3>
        <form>
          <div className='input-label-container'>
            <label htmlFor='age'>Prefered age of joiner: </label>
            <input type="number" name="ageOfJoiner" placeholder='Required age to join' id="age" />
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
          <div className='input-label-container' style={{justifyContent: 'flex-end', alignItems: 'flex-end', marginTop: '20px'}}>
              <input id='submit-modifications' type="submit" value="Join" />
          </div>
        </form>
      </div>

    </div>
  )
}

export default HouseDetails