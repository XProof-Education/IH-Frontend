import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Header/Navbar';
import operationsService from '../../services/operationsService';
import getErrorPercentage from '../../utils/progress/getErrorPercentage';
import errorToFeedback from '../../utils/progress/errorToFeedback';
import { Link } from 'react-router-dom';

function Progress() {
  const [operations, setOperations] = useState([]);
  const [statistics, setStatistics] = useState(undefined);

  const getOperations = async () => {
    try {
      const response = await operationsService.getAllOperations();
      setOperations(response.mathOperations);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getOperations();
  }, []);

  useEffect(() => {
    const stats = getErrorPercentage(operations);
    setStatistics(stats);
  }, [operations]);

  return ( 
    <div>
      <Navbar color="#FF6230" content="editProfile" backGround="true"/>     
    </div>
   );
}

export default Progress;