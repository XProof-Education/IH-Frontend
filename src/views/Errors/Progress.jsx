import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Header/Navbar';
import operationsService from '../../services/operationsService';
import { getErrorStatistics } from '../../utils/progress/getErrorStatistics';
import Button from '../../components/Button';
import { Link } from 'react-router-dom';
import filterOperations from '../../utils/filterOperationsByTime';

function Progress() {
  const [operations, setOperations] = useState([]);
  const [statistics, setStatistics] = useState(undefined);
  const [lArray, setLArray] = useState([]);
  const [timeFilter, setTimeFilter] = useState('all');

  const handleFilterChange = (e) => {
    setTimeFilter(e.target.value);
  };  

  const computePercentage = (number, total) => {
    const percentage = (number / total * 100).toFixed(2);
    if (percentage !== 'NaN') {
      return percentage;
    } else {
      return 'No data'
    }
  };

  const getOperations = async () => {
    try {
      const response = await operationsService.getAllOperations();
      const filteredOperations = filterOperations(response.mathOperations, timeFilter);
      setOperations(filteredOperations);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getOperations();
    // eslint-disable-next-line
  }, [timeFilter]);

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

    setStatistics(stats);
    setLArray(arrayOfL);
  }, [operations]);

  return ( 
    <div>
      <Navbar color="#FF6230" content="editProfile" backGround="true" backUrl="/profile"/>
      <h1>Your Progress</h1>
      <select value={timeFilter} onChange={handleFilterChange}>
        <option value="all">All operations</option>
        <option value="today">View operations from today</option>
        <option value="yesterday">View operations from yesterday</option>
        <option value="lastWeek">View operations from last week</option>
        <option value="lastMonth">View operations from last month</option>
      </select>
      {statistics && 
        <div className="stats">
          <div className="total">
            <h4>Total Operations:</h4>
            <p>{statistics.total}</p>
          </div>
          {statistics.total === 0 ? 
              <div className="percentages">
                <h5>Still no data from this period</h5>
              </div> 
            : <div className="percentages">
                <h5>Correct Operations:</h5>
                <p>{Math.ceil(computePercentage(statistics.correct, statistics.total))}%</p>
                <h5>Incorrect Operations:</h5>
                <p>{Math.floor(computePercentage(statistics.incorrect, statistics.total))}%</p>
                <p>Keep up the good work!</p>
            </div>}
        </div>}
      {statistics && statistics.total > 0 && <h2>Your most frequent mistakes</h2>}
      {lArray && 
        <div className='l-cards'>
          {lArray.map(elem => {
            return (
              <div className="l-card" key={elem.L}>
                <h4>{elem.feedback}</h4>
                <p>{Math.floor(computePercentage(elem.count, statistics.incorrect))}% of your mistakes</p>
                <Link to={`/profile/progress/${elem.L}?timeFilter=${timeFilter}`}><Button color='blue'>See details</Button></Link>
              </div>
              )
          })}
        </div>}
      </div>
   );
}

export default Progress;