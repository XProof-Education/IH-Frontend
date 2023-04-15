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
import Footer from '../../components/Footer';

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
    if (isValid.name === false) {
      setErrorMessage("Name just allows letters")
    } else if (isValid.lastName === false) {
      setErrorMessage("Lastname just allows letters")
    } else if (isValid.color === false) {
      setErrorMessage("Choose between pink, yellow or blue colors")
    } else if (isValid.email === false) {
      setErrorMessage("Invalid email format")
    } else {
      setErrorMessage(null)
    }
  }, [isValid]);

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
    } else if (name === "lastName") {
      setIsValid(prev => {
        return {
          ...prev,
          lastName: validation(value, "lastName")
        }
      });
    } else if (name === "color") {
      setIsValid(prev => {
        return {
          ...prev,
          color: validation(value, "color")
        }
      });
    } else {
      setIsValid(prev => {
        return {
          ...prev,
          email: validation(value, "email")
        }
      });
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isValid.name && isValid.lastName && isValid.email && isValid.color) {
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
  }

  const handleDelete = async () => {
    try {
      await userService.deleteUserData();
      logOutUser();
    } catch (error) {
      setErrorMessage(error);
      console.error(error);
    } finally {
      navigate('/');
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
    <div className="container">
      <Navbar color="#FF6230" content="editProfile" backGround="true" />
      <div className="form-main-container main-container">
        <div className="form-main-div">
          <div className='form-title'>
            <h1>Edit your Profile </h1>
          </div>
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
            <div className='form-container'>
              <form className='form' onSubmit={handleSubmit}>
                <div className='input-label'>
                  <input style={inputStyleName} type="text" name="name" value={userInfo.name} onChange={handleChange} required />
                </div>
                <div className='input-label'>
                  <input style={inputStylelastName} type="text" name="lastName" value={userInfo.lastName} onChange={handleChange} required />
                </div>
                <div className='input-label'>
                  <input style={inputStyleEmail} type="email" name="email" value={userInfo.email} onChange={handleChange} required />
                </div>
                <div className='input-label'>
                  <select name="color" value={userInfo.color} onChange={handleChange} required>
                    <option>Choose your profile color</option>
                    <option value="blue">Blue</option>
                    <option value="pink">Pink</option>
                    <option value="yellow">Yellow</option>
                  </select>
                </div>
                <div className='buttons-container'>
                  <Button type="submit" color="blue">Edit</Button>
                  <Button color="pink" action={handleDelete}>Delete</Button>
                </div>
              </form>
            </div>}
          {errorMessage && <Error error={errorMessage} />}
        </div>
      </div>
      <Footer color="pink" size="70px" />
    </div>
  );
}

export default EditProfile;