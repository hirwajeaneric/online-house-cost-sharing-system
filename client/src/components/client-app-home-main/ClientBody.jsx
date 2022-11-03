import React from 'react';
import '../client-app-home-main/mainStyles.css';
import sampleImage from "../../assets/imgs/interior-design.jpg";
import { Link } from 'react-router-dom';

const ClientHomeMain = () => {
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
          <Link to='housedetails/:id' className="a-house">
            <img src={sampleImage} alt="" />
            <div className="other-info">
              <p className="short-description">3 bedroom house with good views</p>
              <p className="location">Kigali City, Vision City</p>
              <p className="rent">800,000 RWF</p>
            </div>
          </Link>
          <Link to='housedetails/:id' className="a-house">
              <img src={sampleImage} alt="" />
              <div className="other-info">
                <p className="short-description">3 bedroom house with good views</p>
                <p className="location">Kigali City, Vision City</p>
                <p className="rent">800,000 RWF</p>
              </div>
          </Link>
          <Link to='housedetails/:id' className="a-house">
              <img src={sampleImage} alt="" />
              <div className="other-info">
                <p className="short-description">3 bedroom house with good views</p>
                <p className="location">Kigali City, Vision City</p>
                <p className="rent">800,000 RWF</p>
              </div>
          </Link>
          <Link to='housedetails/:id' className="a-house">
              <img src={sampleImage} alt="" />
              <div className="other-info">
                <p className="short-description">3 bedroom house with good views</p>
                <p className="location">Kigali City, Vision City</p>
                <p className="rent">800,000 RWF</p>
              </div>
          </Link>
          <Link to='housedetails/:id' className="a-house">
              <img src={sampleImage} alt="" />
              <div className="other-info">
                <p className="short-description">3 bedroom house with good views</p>
                <p className="location">Kigali City, Vision City</p>
                <p className="rent">800,000 RWF</p>
              </div>
          </Link>
          <Link to='housedetails/:id' className="a-house">
              <img src={sampleImage} alt="" />
              <div className="other-info">
                <p className="short-description">3 bedroom house with good views</p>
                <p className="location">Kigali City, Vision City</p>
                <p className="rent">800,000 RWF</p>
              </div>
          </Link>
          <Link to='posts/post/:id' className="a-house">
              <img src={sampleImage} alt="" />
              <div className="other-info">
                <p className="short-description">3 bedroom house with good views</p>
                <p className="location">Kigali City, Vision City</p>
                <p className="rent">800,000 RWF</p>
              </div>
          </Link>
          <Link to='posts/post/:id' className="a-house">
              <img src={sampleImage} alt="" />
              <div className="other-info">
                <p className="short-description">3 bedroom house with good views</p>
                <p className="location">Kigali City, Vision City</p>
                <p className="rent">800,000 RWF</p>
              </div>
          </Link>
          <Link to='posts/post/:id' className="a-house">
              <img src={sampleImage} alt="" />
              <div className="other-info">
                <p className="short-description">3 bedroom house with good views</p>
                <p className="location">Kigali City, Vision City</p>
                <p className="rent">800,000 RWF</p>
              </div>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default ClientHomeMain