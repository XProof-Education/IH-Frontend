import React from "react";
import { useAuth } from '../../hooks/useAuth';
import Navbar from "../../components/Header/Navbar";
import ProfileCard from "../../components/Cards/ProfileCard";
import Loading from "../../components/Loading";


const Profile = () => {
  const { user, isLoading } = useAuth();
  return (
    <div>
      {isLoading && <Loading/>}
      <Navbar content="profile" backGround="true" />
      <h1>This is Profile Page</h1>
      {user.role !== 'teacher'
        ? <ProfileCard sections={[{ title: "my equation history", url: '/operations-history' }, { title: "my frequent errors", url: "/frequent-errors" }, { title: "find exercises", url: "/exercises" }]} />
        : <ProfileCard sections={[{ title: "my exercises", url: '/exercises' }, { title: "create new exercise", url: "/new-exercise" }, { title: "my equation history", url: "/operations-history" }]} />} 
    </div> 
  );
  
}
export default Profile;