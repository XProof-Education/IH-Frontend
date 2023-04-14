import React, { useState} from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Header/Navbar';
import Footer from '../components/Footer';
import Button from '../components/Button';
// import Error from '../components/Error';

const Contact = () => {
  // const [errorMessage, setErrorMessage] = useState(false);
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({
    name: '',
    lastName: '',
    email: '',
    message: ''
  });

    const handleChange = (e) => {
    setUserInfo(prev => {
      return {
        ...prev,
        [e.target.name]: e.target.value
      }
    })
    }
  
   const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/')
  }
 
  return (
    <div className="container">
      <Navbar color="yellow" />
      <div className="form-main-container">
        <div className='form-title'>
          <h1 className="title-style-blue">Contact with us!</h1>
        </div>
        <div className="form-container">
          <form className='form' onSubmit={handleSubmit}>
            <div className='input-label'>
              <input required type="text" name="name" value={userInfo.name} onChange={handleChange} placeholder="name" />
            </div>
            <div className='input-label'>
              <input required type="text" name="lastName" value={userInfo.lastName} onChange={handleChange} placeholder="lastname" />
            </div>
            <div className='input-label'>
              <input required type="email" name="email" value={userInfo.email} onChange={handleChange} placeholder="email" />
            </div>
            <div className='input-label'>
              <textarea required type="text" name="message" value={userInfo.message} onChange={handleChange} placeholder="how can we help you? " />
            </div>
            {/* {errorMessage && <Error error={errorMessage} />} */}
            <div className='buttons-container'>
              <Button color='pink' type="submit">Send</Button>
            </div>
          </form>
        </div>
      </div>
      <Footer color="blue" size="70px" />
    </div>
  );
 }

export default Contact;