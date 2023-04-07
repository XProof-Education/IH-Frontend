import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Header/Navbar';
import operationsService from '../../services/operationsService';
import { getErrorStatistics, computeL } from '../../utils/progress/getErrorStatistics';
import { useParams } from 'react-router-dom';
import lToFeedback from '../../utils/progress/lToFeedback';
import { Link, useLocation } from 'react-router-dom';
import Button from '../../components/Button';
import filterOperations from '../../utils/filterOperationsByTime';

function LDetail() {
  const { l } = useParams();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const timeFilterQuery = searchParams.get('timeFilter');
  // eslint-disable-next-line
  const [timeFilter, setTimeFilter] = useState(timeFilterQuery);
  const timeFilterText = {
    'all': 'all operations',
    'today' : 'operations from today',
    'yesterday': 'operations from yesterday',
    'lastWeek' : 'operations from last week',
    'lastMonth': 'operations from last month'
  }
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
      const filteredOperations = filterOperations(response.mathOperations, timeFilter);
      setOperations(filteredOperations);    
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getOperations();
    // eslint-disable-next-line
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
      <p>Viewing {timeFilterText[timeFilter]}</p>
      {errors && errors.map(error => {
        return (
          <div className="error-card" key={error.error}>
            <h5>{error.feedback.split('.')[0]}</h5>
            <p>{Math.floor(computePercentage(error.count, statistics.incorrect))}% of your mistakes</p>
            <Link to={`/profile/progress/${l}/${error.error}?timeFilter=${timeFilter}`}><Button color='blue'>See operations</Button></Link>
          </div>
        )
      })}
    </div>
   );
}

export default LDetail;