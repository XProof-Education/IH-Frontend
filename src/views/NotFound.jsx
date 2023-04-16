import React from 'react'
import { useLocation, Link } from 'react-router-dom';
import Navbar from '../components/Header/Navbar';
import Footer from '../components/Footer';

 const NotFound = () =>{
  const location = useLocation();
 
  return (
    <div className="view">
      <Navbar color="yellow" />
      <div className="main-container not-found-message-div">
        <h2>Sorry, there is no URL called <span className="path">{location.pathname}</span> in this website. You might want to go<Link to="/" className="main-site"> Home Page</Link></h2>
      </div>
      <Footer color="blue" size="70px" />
    </div>
  );
}

export default NotFound;