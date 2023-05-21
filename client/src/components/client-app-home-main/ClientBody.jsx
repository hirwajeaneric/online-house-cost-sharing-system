import React, { useContext, useEffect, useState } from 'react';
import '../client-app-home-main/mainStyles.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { SearchResultSetterContext } from '../../App';

const ClientHomeMain = () => {
    const [houses, setHouses] = useState([]);
    const setSearchResults = useContext(SearchResultSetterContext); 
    const navigate = useNavigate();

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

  const handleSearchInput = ({currentTarget: input}) => {
    setLocation(input.value);

    if(input.value.length > 3){
      setSearchError('');
    }
  }

  const [location, setLocation] = useState('');

  const [searchError, setSearchError] = useState('');

  const searchHouse = (e) => {
    e.preventDefault();

    if (!location) {
      setSearchError('You must type a location');
      return;
    } else {
      setSearchError('');
      axios.get(`http://localhost:5000/api/house/findByLocation?location=${location}`)
      .then(response=>{
        setSearchResults(response.data);
        navigate('/search');
      })
      .catch(error=>{
        setSearchError(error);
      })
    }

  }

  return (
    <div className='client-home-main-container'>
      <div className='banner'>
        <div className="banner-overflow">
          <h1>Post, Connect, Share, Discover, and more</h1>
          <p style={{width: '60%', textAlign: 'center'}}>
            Welcome to HOUSEONLINE, an Online House Cost Sharing System 
            where you can find perfect partners to share the cost of 
            your dream house and remove the burden of high rent price 
            all at one living luxury and comfort of your like.
          </p>
          <form style={{ marginTop: '3rem'}} onSubmit={searchHouse}>
            <input type="text" name='location' 
              value={location}
              onChange={handleSearchInput} 
              placeholder= 'Search locations' 
              style={{
                outlineColor: searchError ? 'tomato' : 'black', 
                outlineStyle: searchError ? 'solid' : 'none',
                color: searchError ? 'tomato' : 'gray'
              }}
            />
            <input type="submit" value='Search' />
          </form>
          {searchError && 
            <p style={{
                color: 'tomato', 
                texAlign: 'left', 
                fontSize: '80%',
                marginTop: '5px',
                marginRight: '500px'
              }}
              >{searchError}
            </p>
          }
        </div>
      </div>
      <div className='main-content'>
        {houses.length < 1 && <p style={{textAlign: 'center'}}>There are currently no availables houses to rent or join on this website.
          <br/><br/>
          Be the one to upload the first house. 
          <br/><br/>
          <Link to={'add-house'} style={{color: 'orangered'}}>Add house</Link>
          </p>
        }
        
        {/* Unoccupied houses */}
        {houses.length < 1 ? '' : <h1 style={{textAlign: 'center'}}>Unoccupied Houses</h1>}
        <div className="posted-houses-container">
          {houses && houses.map((house, index) => (
            !house.username &&
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
        
        {/* Occupied houses */}
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