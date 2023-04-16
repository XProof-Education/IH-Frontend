import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Header/Navbar';
import Footer from '../components/Footer';
import Button from '../components/Button';
import contactService from '../services/contactService';
import Error from '../components/Error';
import validation from '../utils/validations';

const Contact = () => {
  const [errorMessage, setErrorMessage] = useState(false);
  const navigate = useNavigate();
  const [confirmation, setConfirmation] = useState(false);
  const [isValid, setIsValid] = useState({ name: true, lastName: true, email: true, message: true });
  const [userInfo, setUserInfo] = useState({
    name: '',
    lastName: '',
    email: '',
    message: ''
  });

  useEffect(() => {
    if (isValid.name === false) {
      setErrorMessage("Name just allows letters,");
    } else if (isValid.lastName === false) {
      setErrorMessage("Lastname just allows letters,");
    } else if (isValid.message === false) {
      setErrorMessage("The message can contain up to 270 characters.");
    } else if (isValid.email === false) {
      setErrorMessage("Invalid email format.");
    } else {
      setErrorMessage(null);
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
    } else if (name === "message") {
      setIsValid(prev => {
        return {
          ...prev,
          message: validation(value, "message")
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
    if (isValid.name && isValid.lastName && isValid.email && isValid.message) {
      try {
        await contactService.contact(userInfo);
        setConfirmation(true);
        setTimeout(() => {
          navigate('/');
        }, 2000);
      } catch (error) {
        console.error(error);
        setConfirmation(false);
        setErrorMessage('Unable to sent your message. Try again!');
      }
    } else {
      setConfirmation(false);
      setErrorMessage('Unable to sent your message. Try again!');
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
  const inputStyleMessage = {
    color: isValid.message !== true ? "red" : ""
  };
 
  return (
    <div className="view">
      <Navbar color="yellow" />
      <div className="form-main-container main-container">
        <div className="form-main-div">
          <div className='form-title'>
            <h1 className="title-style-blue">Contact with us!</h1>
          </div>
          <div className="form-container">
            <form className='form' onSubmit={handleSubmit}>
              <div className='input-label'>
                <input style={inputStyleName} required type="text" name="name" value={userInfo.name} onChange={handleChange} placeholder="name" />
              </div>
              <div className='input-label'>
                <input style={inputStylelastName} required type="text" name="lastName" value={userInfo.lastName} onChange={handleChange} placeholder="lastname" />
              </div>
              <div className='input-label'>
                <input style={inputStyleEmail} required type="email" name="email" value={userInfo.email} onChange={handleChange} placeholder="email" />
              </div>
              <div className='input-label'>
                <textarea style={inputStyleMessage} required type="text" name="message" value={userInfo.message} onChange={handleChange} placeholder="how can we help you? " />
              </div>
              {errorMessage && <Error align="column" error={errorMessage} />}
              <div className='button-container'>
                <Button color='pink' type="submit">Send</Button>
              </div>
              {confirmation &&
                <div className="sent-successfully"><h2>Your message sent successfully!</h2></div>}
            </form>
          </div>
        </div>
      </div>
      <Footer color="blue" size="70px" />
    </div>
  );
 }

export default Contact;