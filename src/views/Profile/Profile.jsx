import React from "react";
import { useAuth } from '../../hooks/useAuth';
import Navbar from "../../components/Header/Navbar";
import ProfileCard from "../../components/Cards/ProfileCard";
import Loading from "../../components/Loading";
import Footer from "../../components/Footer";


const Profile = () => {
  const { user, isLoading } = useAuth();
  return (
    <div>
      {isLoading && <Loading/>}
      <Navbar content="profile" backGround="true" />
      {user.role === 'student'
        ? <ProfileCard sections={[{ title: "my equations history", url: '/operations-history', color:'yellow' }, { title: "my progress", url: "/profile/progress", color:'blue' }, { title: "assigned exercises", url: "/exercises", color:'violet' }]} />
        : <ProfileCard sections={[{ title: "my exercises", url: '/exercises', color:'yellow' }, { title: "create new exercise", url: "/new-exercise", color:'blue' }, { title: "my equation history", url: "/operations-history", color:'violet' }]} />} 
    <Footer />
    </div> 
  );
  
}
export default Profile;