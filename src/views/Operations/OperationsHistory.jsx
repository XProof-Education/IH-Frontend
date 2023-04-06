import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Header/Navbar';
import ListCard from '../../components/Cards/ListCard';
import operationsService from '../../services/operationsService';
import { Link } from 'react-router-dom';

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
      <Navbar color="#FF6230" content="editProfile" backGround="true"/>
      <h1>My Operations history</h1>
      <Link to={'/profile/progress'}>See your progress</Link>
      <ListCard props={operations} typeData="operations"/>
      
    
    </div>
  )
  
}
export default OperationsHistory;