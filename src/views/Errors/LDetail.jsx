import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Header/Navbar';
import operationsService from '../../services/operationsService';
import { getErrorStatistics, computeL } from '../../utils/progress/getErrorStatistics';
import { useParams } from 'react-router-dom';
import lToFeedback from '../../utils/progress/lToFeedback';
import { Link, useLocation } from 'react-router-dom';
import Button from '../../components/Button';
import filterOperations from '../../utils/filterOperationsByTime';
import Percentage from '../../components/Icons/Percentage';
import Footer from '../../components/Footer';

const LDetail = () => {
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
    const sortedArrayOfErrors = arrayOfErrors.sort((a, b) => b.count - a.count);
    setStatistics(stats);
    setErrors(sortedArrayOfErrors);
  }, [operations, l]);

  return (
    <div className='view'>
      <Navbar color="#FF6230" content="editProfile" backGround="true" />
      <div className="infinite-container">
        <div className="detail-errors-container">
          <div className="title-div-error">
            <h1 className="title-style-blue">{title}</h1>
          </div>
          <h3>Viewing {timeFilterText[timeFilter]}</h3>
          {errors && errors.map(error => {
            return (
              <div className="error-card" key={error.error}>
                <p>{error.feedback.split('.')[0]}</p>
                <div className="percentage-link-div">
                  <Percentage percentage={Math.floor(computePercentage(error.count, statistics.incorrect))} colorToPaint="pink" fontSize="20px" size="80px" />
                  <Link to={`/profile/progress/${l}/${error.error}?timeFilter=${timeFilter}`}><Button color='blue'>See operations</Button></Link>
                </div>
              </div>
            )
          })}
        </div>
      </div>
      <Footer color="yellow" size="70px" />
    </div>
  );
}

export default LDetail;