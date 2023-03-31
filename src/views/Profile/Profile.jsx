import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/Header/Navbar";


const Profile = () => {
  return (
    <div>
      <Navbar color="#FF6230" content="profile" backGround="true"/>
      <h1>This is Profile Page</h1>
      <Link to='/edit-profile'>Edit Profile</Link>
    
    </div>
  )
  
}
export default Profile;