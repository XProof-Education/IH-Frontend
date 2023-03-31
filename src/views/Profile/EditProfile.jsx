import React, { useState, useEffect, useContext } from 'react';
//import { Link } from 'react-router-dom';
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import userService from '../../services/userService.js';
import Navbar from '../../components/Header/Navbar';
import Button from '../../components/Button';
import Error from '../../components/Error.jsx';

const Profile = () => {
  const { logOutUser } = useContext(AuthContext); 
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [userInfo, setUserInfo] = useState({
    name: "",
    lastName: "",
    email: ""
  });

  const getUserInfo = async () => {
    try {
      const response = await userService.getUserData();
      setUserInfo(response.user);
      setError(null);
    } catch (error) {
      setError(error);
      console.error(error);
    }
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  const handleChange = (e) => {
    setUserInfo(prev => {
      return {
        ...prev,
        [e.target.name]: e.target.value
      }
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await userService.editUserData(userInfo);
      await toast.success('Profile updated', {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      })
      navigate('/profile');
    } catch (error) {
      setError(error);
      console.error(error);
    }
  }

  const handleDelete = async () => {
    try {
      await userService.deleteUserData();
      logOutUser();
    } catch (error) {
      setError(error);
      console.error(error);
    } finally {
      navigate('/home');
    }
  }

  return (
    <div>
      <Navbar color="#FF6230" content="editProfile" backGround="true" />
      <h1>Edit your Profile </h1>
      <ToastContainer
          position="top-center"
          autoClose={2000}
          hideProgressBar={true}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      <form onSubmit={handleSubmit}>
        <label> Name </label>
        <input type="text" name="name" value={userInfo.name} onChange={handleChange} required/>
        <label> Lastname </label>
        <input type="text" name="lastName" value={userInfo.lastName} onChange={handleChange} required/>
        <label> Email </label>
        <input type="email" name="email" value={userInfo.email} onChange={handleChange} required/>
        <div>
          <Button type="submit" color="blue">Edit</Button>
        </div>
      </form>
      <Button color="red" action={handleDelete}>Delete</Button>
      {error && <Error error={error} />}
    </div>
  );
}

export default Profile;