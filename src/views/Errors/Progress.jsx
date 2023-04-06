import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Header/Navbar';
import operationsService from '../../services/operationsService';
import { getErrorStatistics, computeL} from '../../utils/progress/getErrorStatistics';
import Button from '../../components/Button';

function Progress() {
  const [operations, setOperations] = useState([]);
  const [statistics, setStatistics] = useState(undefined);
  const [lArray, setLArray] = useState([]);
  const [isLDetail, setIsLDetail] = useState(false);
  const [errorsArray, setErrorsArray] = useState([]);
  const [detailedErrors, setDetailedErrors] = useState([]);

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

  const handleLDetail = (l) => {
    if (isLDetail) {
      setDetailedErrors([]);
      setIsLDetail(false);
    } else {
      const filteredErrors = errorsArray.filter(elem => elem.L === l);
      setDetailedErrors(filteredErrors);
      setIsLDetail(true);
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
        L: parseInt(l),
        count: stats.L[l].count,
        feedback: stats.L[l].feedback
      });
    }

    const arrayOfErrors = [];
    for (const error in stats.errors) {
      arrayOfErrors.push({
        L: computeL(error),
        error: parseInt(error),
        count: stats.errors[error].count,
        feedback: stats.errors[error].feedback,
        operations: stats.errors[error].operations
      })
    }
    setStatistics(stats);
    setLArray(arrayOfL);
    setErrorsArray(arrayOfErrors);
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
                {isLDetail ? <Button color='red' action={() => handleLDetail(elem.L)}>Hide details</Button> : <Button color='blue' action={() => handleLDetail(elem.L)}>See details</Button>}
                {isLDetail && 
                  <div className='error-cards'>
                    {detailedErrors.map(error => {
                      return (
                        <div className="error-card" key={error.error}>
                          <h5>{error.feedback}</h5>
                          <p>{Math.floor(computePercentage(error.count, statistics.incorrect))}% of your mistakes</p>
                        </div>
                      )
                    })}
                  </div>
                }
              </div>
            )
          })}
        </div>}
    </div>
   );
}

export default Progress;