import React from 'react'
import { useLocation, Link } from 'react-router-dom';
import Navbar from '../components/Header/Navbar';
import Footer from '../components/Footer';

export default function NotFound() {
  const location = useLocation();
 
  return (
    <div className="not-found-container">
      <Navbar color="yellow" />
      <div className="not-found-message-div">
        <h2>Sorry, there is no URL called <span className="path">{location.pathname}</span> in this website. You might want to go<Link to="/" className="main-site"> Home Page</Link></h2>
      </div>
      <Footer color="blue" size="70px" />
    </div>
  );
}
