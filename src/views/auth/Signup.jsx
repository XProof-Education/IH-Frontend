import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../../services/authService';
import Navbar from '../../components/Header/Navbar';
import Button from '../../components/Button';
import Error from '../../components/Error';

export default function Signup() {
  const [user, setUser] = useState({
    name: '',
    lastName: '',
    email: '',
    role: 'student'
  })
  const [password, setPassword] = useState('');
  const [passwordControl, setPasswordControl] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser(prev => {
      return {
        ...prev,
        [e.target.name]: e.target.value
      }
    })
  }

  useEffect(() => {
    if (password !== passwordControl) {
      setErrorMessage("Passwords don't match")
    } else {
      setErrorMessage(undefined)
    }
  }, [passwordControl, password])

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await authService.signup({ name: user.name, lastName: user.lastName, email: user.email, password, role: user.role });
      navigate('/login');
    } catch (error) {
      console.error(error)
      setErrorMessage('Unable to create user account')
    }
  }

  return (
    <div className="container">
      <Navbar color="yellow" backGround="true" />
      <div className='form-main-container main-container'>
        <div className="form-main-div">
          <div className='form-title'>
            <h1 className="title-style-blue">Sign up</h1>
          </div>
          <div className='form-container'>
            <form className='form' onSubmit={handleSubmit}>
              <div className='input-label'>
                <input required type="text" name="name" value={user.name} onChange={handleChange} placeholder="name" />
              </div>
              <div className='input-label'>
                <input required type="text" name="lastName" value={user.lastName} onChange={handleChange} placeholder="lastname" />
              </div>
              <div className='input-label'>
                <input required type="email" name="email" value={user.email} onChange={handleChange} placeholder="email" />
              </div>
              <div className='input-label'>
                <input required type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="password" />
              </div>
              <div className='input-label'>
                <input required type="password" name="passwordControl" value={passwordControl} onChange={(e) => setPasswordControl(e.target.value)} placeholder="repeat password" />
              </div>
              <div className='input-label'>
                <select name="role" value={user.role} onChange={handleChange}>
                  <option value='student'>student</option>
                  <option value='teacher'>teacher</option>
                </select>
              </div>
              {errorMessage && <Error error={errorMessage} />}
              <div className='buttons-container'>
                <Button color='pink' type="submit">Register</Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
