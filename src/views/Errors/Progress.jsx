import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Header/Navbar';
import operationsService from '../../services/operationsService';
import getErrorStatistics from '../../utils/progress/getErrorStatistics';
import { Link } from 'react-router-dom';

function Progress() {
  const [operations, setOperations] = useState([]);
  const [statistics, setStatistics] = useState(undefined);

  const computePercentage = (number, total) => {
    return (number / total * 100).toFixed(2);
  } 

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
    const stats = getErrorStatistics(operations);
    setStatistics(stats);
  }, [operations]);

  return ( 
    <div>
      <Navbar color="#FF6230" content="editProfile" backGround="true"/>
      <h1>Your Progress</h1>
      {statistics && 
        <div className="stats">
          <div className="total">
            <h4>Total Operations:</h4>
            <p>{statistics.total}</p>
          </div>
          <div className="percentages">
            <h5>Correct Operations:</h5>
            <p>{Math.ceil(computePercentage(statistics.correct, statistics.total))}%</p>
            <h5>Incorrect Operations:</h5>
            <p>{Math.floor(computePercentage(statistics.incorrect, statistics.total))}%</p>
            <p>Keep up the good work!</p>
          </div>
        </div>}  
    </div>
   );
}

export default Progress;