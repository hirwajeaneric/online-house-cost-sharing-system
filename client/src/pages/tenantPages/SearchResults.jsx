import React, { useContext, useEffect, useState } from 'react'
import ClientHeader from '../../components/client-header/ClientHeader'
import { SearchResultContext, SearchResultSetterContext } from '../../App';
import { Ahouse, HouseContainer, HouseList, InnerContainer, PriceInputs, SearchContainer, SearchItem, SectionTitles, SideBar } from '../../components/search/SearchStyledComponents';
import axios from 'axios';

const SearchResults = () => {

  const [houses, setHouses] = useState();
  const searchResults = useContext(SearchResultContext);
  const setSearchResults = useContext(SearchResultSetterContext);

  // Fetch All houses 
  useEffect(()=>{
    if (searchResults.length === 0) {
      axios.get(`http://localhost:5000/api/house/list`)
      .then(response => {
        setSearchResults(response.data);
        setHouses(response.data);
        const houseNames = [];
        response.data.forEach(aHouse =>{
          if (!houseNames.includes(aHouse.location)) {
            houseNames.push(aHouse.location);
          }
        })
        setLocations(houseNames);
      })
      .catch(error => {
        console.log(error);
      }) 
    }
  },[searchResults,setSearchResults]);

  const searchByRent = ()=>{
    const rentedHouses = [];
    houses.forEach(house => {
      if (!house.tenantOne && !house.tenantTwo) {
        rentedHouses.push(house);
      }
    });

    setSearchResults(rentedHouses)
  }

  const searchByJoin = ()=>{
    const toBeJoinned = [];
    houses.forEach(house => {
      if (house.joinPost && !house.tenantTwo) {
        toBeJoinned.push(house);
      }
    });

    setSearchResults(toBeJoinned)
  }

  const searchAll = ()=>{
    const allHouses = [];
    houses.forEach(house => {
      if ((house.joinPost && !house.tenantTwo) || !house.tenantOne) {
        allHouses.push(house);
      }

      setSearchResults(allHouses)
    });
  }

  const searchByLocations = ({currentTarget: input}) => {
    const housesInLocation = [];
    houses.forEach(house => {
      if (house.location === input.value) {
        housesInLocation.push(house);
      }
      setSearchResults(housesInLocation);
    });
  }

  const submitSearch = (e) => {
    e.preventDefault();


  }

  const [locations, setLocations] = useState([]);

  return (
    <div className='homepage-container' style={{width: '100%'}}>
      <ClientHeader bgColor='rgb(5, 45, 98, 0)' boxShadow='' />
      <SearchContainer>
        <SideBar>
          <InnerContainer>
            <SectionTitles>Categories</SectionTitles>
            <SearchItem>
              <label htmlFor="rent">For Rent</label>
              <input type="radio" name="category" id="rent" onClick={searchByRent}/>
            </SearchItem>
            <SearchItem>
              <label htmlFor="join">For Joinning</label>
              <input type="radio" name="category" id="join" onClick={searchByJoin}/>
            </SearchItem>
            <SearchItem>
              <label htmlFor="all">All</label>
              <input type="radio" name="category" id="all" onClick={searchAll} />
            </SearchItem>
          </InnerContainer>
          <InnerContainer>
            <SectionTitles>Locations</SectionTitles>
            {locations && locations.map((location, key)=>(
              <SearchItem>
                <label htmlFor={location}>{location}</label>
                <input type="radio" name="location" id={location} value={location} onClick={searchByLocations}/>
              </SearchItem>))
            }
          </InnerContainer>
          {/* <InnerContainer>
            <SectionTitles>Price</SectionTitles>
            <PriceInputs>
              <label htmlFor="from">From</label>
              <input type="text" name="from" placeholder='From' id="from" />
            </PriceInputs>
            <PriceInputs>
              <label htmlFor="from">To</label>
              <input type="text" name="from" placeholder='To' id="from" />
            </PriceInputs>
            <input type="submit" value="SUBMIT" />
          </InnerContainer> */}
        </SideBar>
        <HouseList>
          <HouseContainer>
            {searchResults && searchResults.map((house, index) => (
              !house.tenantOne ? 
              <Ahouse key={index} to={`/housedetails/${house._id}`}>
                <img src={`http://localhost:5000/api/uploads/${house.photo}`} alt="" />
                {!house.tenantOne ? <span>For Rent</span> : <span>For Joinning</span>}
                <div>
                  <p>{house.description}</p>
                  <p style={{color: 'gray', fontSize: '80%'}}>{house.location}</p>
                  <p style={{textAlign: 'right', fontSize: '95%'}}>{house.rent} RWF</p>
                </div>
              </Ahouse> : 
              house.joinPost && !house.tenantTwo ? 
              <Ahouse key={index} to={`/housedetails/${house._id}`}>
                <img src={`http://localhost:5000/api/uploads/${house.photo}`} alt="" />
                {!house.tenantOne ? <span>For Rent</span> : <span>For Joinning</span>}
                <div>
                  <p>{house.description}</p>
                  <p style={{color: 'gray', fontSize: '80%'}}>{house.location}</p>
                  <p style={{textAlign: 'right', fontSize: '95%'}}>{house.rent} RWF</p>
                </div>
              </Ahouse>
              :
              ''))}
          </HouseContainer>
        </HouseList>
      </SearchContainer>
    </div>
  )
}

export default SearchResults