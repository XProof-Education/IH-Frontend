import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Header/Navbar';
import ListCard from '../../components/Cards/ListCard';
import operationsService from '../../services/operationsService';

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
      <ListCard props={operations} typeData="operations"/>
      
    
    </div>
  )
  
}
export default OperationsHistory;