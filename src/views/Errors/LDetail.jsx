import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Header/Navbar';
import operationsService from '../../services/operationsService';
import { getErrorStatistics, computeL } from '../../utils/progress/getErrorStatistics';
import { useParams } from 'react-router-dom';
import lToFeedback from '../../utils/progress/lToFeedback';
import { Link } from 'react-router-dom';
import Button from '../../components/Button';

function LDetail() {
  const { l } = useParams();
  const title = lToFeedback(l);
  const [operations, setOperations] = useState([]);
  const [statistics, setStatistics] = useState(undefined);
  const [errors, setErrors] = useState([]);

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

    const arrayOfErrors = [];
    for (const error in stats.errors) {
      if (parseInt(l) === computeL(error)) {
        arrayOfErrors.push({
          error: parseInt(error),
          count: stats.errors[error].count,
          feedback: stats.errors[error].feedback,
          operations: stats.errors[error].operations
        })
      }
    }
    setStatistics(stats);
    setErrors(arrayOfErrors);
  }, [operations, l]);

  return ( 
    <div>
      <Navbar color="#FF6230" content="editProfile" backGround="true"/>
      <h1>{title}</h1>
      {errors && errors.map(error => {
        return (
          <div className="error-card" key={error.error}>
            <h5>{error.feedback}</h5>
            <p>{Math.floor(computePercentage(error.count, statistics.incorrect))}% of your mistakes</p>
            <Link to={`/profile/progress/${l}/${error.error}`}><Button color='blue'>See operations</Button></Link>
          </div>
        )
      })}
    </div>
   );
}

export default LDetail;