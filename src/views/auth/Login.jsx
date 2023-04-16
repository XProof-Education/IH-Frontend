import React, { useEffect, useState } from 'react';
import  toast  from 'react-hot-toast';
import { Link } from "react-router-dom";
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import authService from '../../services/authService';
import Navbar from '../../components/Header/Navbar';
import Button from '../../components/Button';
import Error from '../../components/Error';

export default function Login() {
  const { storeToken, authenticateUser, isLoggedIn } = useAuth(); 
  const [user, setUser] = useState({
    email: '',
    password: ''
  });
  const [errorMessage, setErrorMessage] = useState(undefined);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser(prev => {
      return {
        ...prev,
        [e.target.name]: e.target.value
      }
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await authService.login(user)
      if (response.authToken) {
        storeToken(response.authToken);
        authenticateUser();
        navigate('/');
        toast.success('Welcome back!')
      } else {
        setErrorMessage('Unable to authenticate user')
      }
    } catch (error) {
      setErrorMessage('Unable to authenticate user');
    }
  }

  useEffect(() => {
    // When the component first renders, check if user is already logged in and redirects
    if (isLoggedIn) {
      navigate('/')
    }
    // eslint-disable-next-line
  }, [isLoggedIn])

  return (
    <div className="view">
      <Navbar color="blue" backGround="true" />
      <div className="form-main-container main-container">
        <div className="form-main-div">
          <div className='form-title'>
            <h1 className="title-style-pink">Login </h1>
          </div>
          <div className='form-container'>
            <form className='form' onSubmit={handleSubmit}>
              <div className='input-label'>
                <input required type="email" name="email" value={user.email} onChange={handleChange} placeholder="email" />
              </div>
              <div className='input-label'>
                <input required type="password" name="password" value={user.password} onChange={handleChange} placeholder="password" />
              </div>
              {errorMessage && <Error error={errorMessage} />}
              <div className='buttons-container'>
                <Button type="submit" color='yellow'>Log in </Button>
                <Link to="/signup"><Button type="submit" color='violet'>Sign up</Button></Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
