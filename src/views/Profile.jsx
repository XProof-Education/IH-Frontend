import React from "react";
import Navbar from "../components/Header/Navbar";
import Button from "../components/Button";

const Profile = () => {
  return (
    <div>
      <Navbar color="#FF6230" backGround="true"/>
      <h1>This is Profile Page</h1>
      <Button color="blue">Edit</Button>
      <Button color="red">Delete</Button>
    </div>
  )
  
}
export default Profile;