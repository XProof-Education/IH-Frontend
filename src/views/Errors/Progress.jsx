import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Header/Navbar';
import operationsService from '../../services/operationsService';
import getErrorStatistics from '../../utils/progress/getErrorStatistics';
import Button from '../../components/Button';

function Progress() {
  const [operations, setOperations] = useState([]);
  const [statistics, setStatistics] = useState(undefined);
  const [lArray, setLArray] = useState([]);

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
    const arrayOfL = [];
    for (const l in stats.L) {
      arrayOfL.push({
        L: l,
        count: stats.L[l].count,
        feedback: stats.L[l].feedback
      });
    }
    setStatistics(stats);
    setLArray(arrayOfL);
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
      <h2>Your most frequent mistakes</h2>
      {lArray && 
        <div className='l-cards'>
          {lArray.map(elem => {
            return (
              <div className="l-card" key={elem.L}>
                <h4>{elem.feedback}</h4>
                <p>{Math.floor(computePercentage(elem.count, statistics.incorrect))}% of your mistakes</p>
                <Button color='blue' action={() => handleDetail(elem.l)}>See details</Button>
              </div>
            )
          })}
        </div>}
    </div>
   );
}

export default Progress;