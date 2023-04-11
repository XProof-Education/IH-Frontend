import React, { useState, useEffect } from 'react';
import operationsService from '../../services/operationsService';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Header/Navbar';
import ListCard from '../../components/Cards/ListCard';
import Footer from '../../components/Footer';
import Button from '../../components/Button';

const OperationsHistory = () => {
  const [operations, setOperations] = useState([]);

  const getOperations = async () => {
    try {
      const response = await operationsService.getAllOperations();
      setOperations(response.mathOperations);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect (() => {
    getOperations();
  }, []);

  return (
    <div>
      <Navbar color="#FF6230" content="editProfile" backGround="true" backUrl="/profile" />
      <div className="title-div">
        <h1 className="title-style-violet">My Operations history</h1>
      </div>
      <div className='button-container'>
        <Button color="yellow"><Link to={'/profile/progress'}>See your progress</Link></Button>
        </div>
      <div className="lists-container">
        <ListCard props={operations} typeData="operations" />
        </div>
      <Footer color="pink" size="70px"/>
    </div>
  )
  
}
export default OperationsHistory;