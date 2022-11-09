import React, { useEffect, useState } from 'react';
import '../client-app-home-main/mainStyles.css';
import sampleImage from "../../assets/imgs/interior-design.jpg";
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
          <form>
            <input type="text" name='location' placeholder='Search locations'/>
            <input type="submit" value='Search'/>
          </form>
        </div>
      </div>
      <div className='main-content'>
        <h1>Available Houses, join requests, and more</h1>
        <div className="posted-houses-container">
          {houses && houses.map((house, index) => (
            <Link key={index} to={`housedetails/${house._id}`} className="a-house">
              <img src={`http://localhost:5000/api/uploads/${house.photo}`} alt="" />
              <div className="other-info">
                <p className="short-description">{house.description}</p>
                <p className="location">{house.location}</p>
                <p className="rent">{house.rent} RWF</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ClientHomeMain