import React, { useState, useEffect } from 'react';
//import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import userService from '../../services/userService.js';
import Navbar from '../../components/Header/Navbar';
import Button from '../../components/Button';
import Error from '../../components/Error.jsx';

const Profile = () => {
  const [userInfo, setUserInfo] = useState({});
  const navigate = useNavigate();
  const [error, setError] = useState(null);

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
      // navigate('/profile');
    } catch (error) {
      setError(error);
      console.error(error);
    }
  }

  const handleDelete = async () => {
    try {
      await userService.deleteUserData();
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
      <form onSubmit={handleSubmit}>
        <label> Name </label>
        <input type="text" name="name" value={userInfo.name} onChange={handleChange} />
        <label> Lastname </label>
        <input type="text" name="lastName" value={userInfo.lastName} onChange={handleChange} />
        <label> Email </label>
        <input type="email" name="email" value={userInfo.email} onChange={handleChange} />
        <div>
          <Button type="submit" color="blue">Edit</Button>
        </div>
      </form>
      <Button color="red" onClick={handleDelete}>Delete</Button>
      {error && <Error error={error} />}
    </div>
  );
}

export default Profile;