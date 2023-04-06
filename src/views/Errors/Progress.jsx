import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Header/Navbar';
import operationsService from '../../services/operationsService';
import { Link } from 'react-router-dom';

function Progress() {
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
    </div>
   );
}

export default Progress;