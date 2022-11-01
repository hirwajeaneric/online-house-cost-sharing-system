import React from 'react'

const PostHouseForm = () => {
  
  const handleInputs = () => {
    
  }

  const submitRequirements = () => {

  }

  return (
    <div className='posthouse-form-container'>
      <form onSubmit={submitRequirements()}>
        <fieldset className='personal-info-section'>
          <legend className='personal-info-legend'>Your personal information</legend>
            <input type='text' name='names' placeholder='Name'/>
            <fieldset>
              <legend>Your gender</legend>
              <label htmlFor="tenantmale">Male</label>
              <input type="radio" name="tenantGender" id="tenantmale"/>
              <label htmlFor="tenantfemale">Female</label>
              <input type="radio" name="tenantGender" id="tenantfemale" />
              <label htmlFor="tenantother">Other</label>
              <input type="radio" name="tenantGender" id="tenantother" />
            </fieldset>
            <input type='email' name='email' placeholder='Email address'/>
            <input type="text" name="phonenumber" placeholder='Your phone number' />
        </fieldset>

        <fieldset className='house-information-section'>
          <legend className='house-information-section-legend'>House information</legend>
          <input type="text" name="number" placeholder='House number' />
          <select name='type'>
            <option value="appartment">Appartment</option>
            <option value="appartment">Single house, one floor</option>
            <option value="appartment">Single house, two floors</option>
          </select>
          <input type="text" name="location" placeholder='House location' />
          <input type="file" name="photo"/>
          <textarea name="description" placeholder='House description' rows='3'></textarea>
          <input type="text" name="rent" placeholder='Rent price'/>
          <input type="number" name="rooms" placeholder='Number of roooms'/>
          <input type="number" name="bathRooms" placeholder='Number of bathrooms' />
          <fieldset>
            <legend>Furnished?</legend>
            <label htmlFor="furnished">Yes</label>
            <input type="radio" name="hasFurniture" id="furnished"/>
            <label htmlFor="notfurnished">No</label>
            <input type="radio" name="hasFurniture" id="notfurnished"/>
          </fieldset>
          
        </fieldset>

        <fieldset className='joining-requirements'>
          <legend className='joining-requirements-legend'>Requirements for joining</legend>
            <input type='text' name='age' placeholder='Age preference. Format: 18-30'/>
            <fieldset>
              <legend>Gender</legend>
              <label htmlFor="male">Male</label>
              <input type="radio" name="gender" id="male"/>
              <label htmlFor="female">Female</label>
              <input type="radio" name="gender" id="female" />
              <label htmlFor="other">Other</label>
              <input type="radio" name="gender" id="other" />
            </fieldset>
            <fieldset>
              <legend>Marital Status</legend>
              <label htmlFor="married">Married</label>
              <input type="radio" name="maritalStatus" id="married"/>
              <label htmlFor="married">Single</label>
              <input type="radio" name="maritalStatus" id="single"/>
            </fieldset>
            <input type="text" name="languages" placeholder='Spoken languages. "Separate by comma"' />
            <fieldset>
              <legend>Has Pet/s?</legend>
              <label htmlFor="haspet">Yes</label>
              <input type="radio" name="hasPet" id="haspet"/>
              <label htmlFor="hasnopet">No</label>
              <input type="radio" name="hasPet" id="hasnopet" />
              <label htmlFor="haspetorno">Don't mind</label>
              <input type="radio" name="hasPet" id="haspetorno" />
            </fieldset>
            <fieldset>
              <legend>Has special medical conditions?</legend>
              <label htmlFor="medicalconds">Yes</label>
              <input type="radio" name="hasSpecialMedicalConditions" id="medicalconds"/>
              <label htmlFor="nomedicalconds">No</label>
              <input type="radio" name="hasSpecialMedicalConditions" id="nomedicalconds" />
              <label htmlFor="hasorno">Don't mind</label>
              <input type="radio" name="hasSpecialMedicalConditions" id="hasorno" />
            </fieldset>
            <fieldset>
              <legend>Do you accept a smoker?</legend>
              <label htmlFor="acceptsmoker">Yes</label>
              <input type="radio" name="smoke" id="acceptsmoker"/>
              <label htmlFor="noacceptsmoker">No</label>
              <input type="radio" name="smoke" id="noacceptsmoker" />
              <label htmlFor="acceptsmokerorno">Don't mind</label>
              <input type="radio" name="smoke" id="acceptsmokerorno" />
            </fieldset>
            <textarea name='moreDescriptions' id='more-descritions' placeholder='More descriptions'>
            </textarea>
        </fieldset>

        <fieldset className='reference-information'>
          <legend className='reference-information-legend'>Reference information</legend>
          <input type='text' name='refererPhoneNumber' placeholder='Referer Phone Number'/>
          <input type='email' name='refererEmail' placeholder='Referer Email'/>
        </fieldset>
        <input type="submit" value="Submit Post" />
      </form>
    </div>
  )
}

export default PostHouseForm