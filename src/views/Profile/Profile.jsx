import React from "react";
import { useAuth } from '../../hooks/useAuth';
import Navbar from "../../components/Header/Navbar";
import ProfileCard from "../../components/Cards/ProfileCard";


const Profile = () => {
  const {user} = useAuth()
  return (
    <div>
      <Navbar color="#FF6230" content="profile" backGround="true" />
      <h1>This is Profile Page</h1>
      {user.role !== 'teacher'
        ? <ProfileCard sections={[{ title: "my equation history", url: '/operations-history' }, { title: "my frequent errors", url: "/frequent-errors" }, { title: "find exercises", url: "/exercises" }]} />
        : <ProfileCard sections={[{ title: "my exercises", url: '/exercises' }, { title: "create new exercise", url: "/frequent-errors" }, { title: "my equation history", url: "/operations-history" }]} />}
    </div>
  );
  
}
export default Profile;