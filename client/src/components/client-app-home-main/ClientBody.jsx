import React, { useEffect, useState } from 'react';
import '../client-app-home-main/mainStyles.css';
import { Link } from 'react-router-dom';
import axios from 'axios';

const ClientHomeMain = () => {
    const [houses, setHouses] = useState([]);

    /**Fetch house */
    useEffect(()=> {
      axios.get(`http://localhost:5000/api/house/list`,{ 
          headers: {
              "Content-Type":"application/json"    
          }
      })
      .then(response=>{
          setHouses(response.data);
          console.log(houses);
      })
      .catch(error => {
          console.log(error);
      })
  },[]);

  return (
    <div className='client-home-main-container'>
      <div className='banner'>
        <div className="banner-overflow">
        <h1>Post, Connect, Share, Discover, and more</h1>
          {/* <form>
            <input type="text" name='location' placeholder='Search locations'/>
            <input type="submit" value='Search'/>
          </form> */}
          <p style={{width: '60%', textAlign: 'center'}}>
            Welcome to HOUSEONLINE, an Online House Cost Sharing System 
            where you can find perfect partners to share the cost of 
            your dream house and remove the burden of high rent price 
            all at one living luxury and comfort of your like.
          </p>
        </div>
      </div>
      <div className='main-content'>
        {houses.length < 1 && <p style={{textAlign: 'center'}}>There are currently no availables houses to rent or join on this website.
          <br/><br/>
          Be the one to upload the first house. 
          <br/><br/>
          <Link to={'add-house'} style={{color: 'orangered'}}>Add house</Link>
          </p>}
        {houses.length < 1 ? '' : <h1 style={{textAlign: 'center'}}>Unoccupied Houses</h1>}
        <div className="posted-houses-container">
          {houses && houses.map((house, index) => (
            !house.tenantOne &&
            <Link key={index} to={`housedetails/${house._id}`} className="a-house">
              <img src={`http://localhost:5000/api/uploads/${house.photo}`} alt="" />
              <div className="other-info">
                <p className="short-description">{house.description}</p>
                <p className="location">{house.location}</p>
                <p className="rent">{house.rent} RWF</p>
              </div>
            </Link>
            ))}
          {/* {houses.length < 1 && <p style={{color: "gray"}}>No available houses for this section</p>} */}
        </div>
        {houses.length < 1 ? '' : <h1 style={{marginTop: '40px'}}>Occupied Houses, make join request.</h1>}
        <div className="posted-houses-container">
          {houses && houses.map((house, index) => (
            !house.tenantTwo && house.joinPost &&
            <Link key={index} to={`housedetails/${house._id}`} className="a-house">
              <img src={`http://localhost:5000/api/uploads/${house.photo}`} alt="" />
              <div className="other-info">
                <p className="short-description">{house.description}</p>
                <p className="location">{house.location}</p>
                <p className="rent">{house.rent} RWF</p>
              </div>
            </Link>
          ))}
          {/* {houses.length < 1 && <p style={{color: "gray"}}>No available houses for this section</p>} */}
        </div>
      </div>
    </div>
  )
}

export default ClientHomeMain