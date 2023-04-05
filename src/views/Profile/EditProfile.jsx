import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import userService from '../../services/userService.js';
import Navbar from '../../components/Header/Navbar';
import Button from '../../components/Button';
import Error from '../../components/Error.jsx';
import validation from '../../utils/validations';
import Loading from '../../components/Loading';

const EditProfile = () => {
  const { storeToken, logOutUser, removeToken, authenticateUser} = useAuth();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: "",
    lastName: "",
    email: "",
    color: ""
  });
  const [isValid, setIsValid] = useState({ name: true, lastName: true, email: true, color: true });
  
  const getUserInfo = async () => {
    setLoading(true);
    try {
      const response = await userService.getUserData();
      setUserInfo(response.user);
      setErrorMessage(null);
      setLoading(false);
    } catch (error) {
      setErrorMessage("Sorry, we couldn't get tour profile data. Please try again.");
      console.error(error);
    }
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  useEffect(() => {
    isValid !== true ? setErrorMessage(errorMessage) : setErrorMessage(null);
  }, [errorMessage, isValid]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo(prev => {
      return {
        ...prev,
        [name]: value
      }
    });
    if (name === "name") {
      setIsValid(prev => {
        return {
          ...prev,
          name: validation(value, "name")
        }
      });
      isValid.name === false ? setErrorMessage("Name just allows letters") : setErrorMessage(null);
    } else if (name === "lastName") {
      setIsValid(prev => {
        return {
          ...prev,
          lastName: validation(value, "lastName")
        }
      });
      isValid.lastName === false ? setErrorMessage("Lastname just allows letters") : setErrorMessage(null);
    } else if (name === "color") {
      setIsValid(prev => {
        return {
          ...prev,
          color: validation(value, "color")
        }
      });
      isValid.color === false ? setErrorMessage("Choose between pink, yellow or blue colors") : setErrorMessage(null);
    } else {
      setIsValid(prev => {
        return {
          ...prev,
          email: validation(value, "email")
        }
      });
      isValid.email === false ? setErrorMessage("Invalid email format") : setErrorMessage(null);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
        const response = await userService.editUserData(userInfo);
        if (response.authToken) {
          removeToken();
          toast.success('Profile updated', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          storeToken(response.authToken);
          authenticateUser();
          navigate('/profile');
          setErrorMessage(null);
          setLoading(false);
        } else {
          setErrorMessage('Unable to update user!');
        }
      } catch (error) {
      setErrorMessage('Unable to update user');
      console.error(error);
    }
  }

  const handleDelete = async () => {
    try {
      await userService.deleteUserData();
      logOutUser();
    } catch (error) {
      setErrorMessage(error);
      console.error(error);
    } finally {
      navigate('/home');
    }
  }

  const inputStyleName = {
    color: isValid.name !== true ? "red" : ""
  };
  const inputStylelastName = {
    color: isValid.lastName !== true ? "red" : ""
  };
  const inputStyleEmail = {
    color: isValid.email !== true ? "red" : ""
  };

  return (
    <div>
      <Navbar color="#FF6230" content="editProfile" backGround="true" />
      <h1>Edit your Profile </h1>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {loading && <Loading />}
      {!loading && userInfo &&
        <form onSubmit={handleSubmit}>
        <label> Name </label>
        <input style={inputStyleName} type="text" name="name" value={userInfo.name} onChange={handleChange} required />
        <label> Lastname </label>
        <input style={inputStylelastName} type="text" name="lastName" value={userInfo.lastName} onChange={handleChange} required />
        <label> Email </label>
        <input style={inputStyleEmail} type="email" name="email" value={userInfo.email} onChange={handleChange} required />
        <label> Color </label>
        <select name="color" value={userInfo.color} onChange={handleChange} required>
          <option>Choose color</option>
          <option value="blue">Blue</option>
          <option value="pink">Pink</option>
          <option value="yellow">Yellow</option>
        </select>
        <div>
          <Button type="submit" color="blue">Edit</Button>
        </div>
      </form>}
      {!loading && <Button color="red" action={handleDelete}>Delete</Button>}
      {errorMessage && <Error error={errorMessage} />}
    </div>
  );
}

export default EditProfile;