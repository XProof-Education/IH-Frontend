import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Header/Navbar';
import Footer from '../../components/Footer';
import operationsService from '../../services/operationsService';
import { getErrorStatistics } from '../../utils/progress/getErrorStatistics';
import Button from '../../components/Button';
import { Link } from 'react-router-dom';
import filterOperations from '../../utils/filterOperationsByTime';
import Percentage from '../../components/Percentage';

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
    const sortedArrayOfL = arrayOfL.sort((a, b) => b.count - a.count);
    
    setStatistics(stats);
    setLArray(sortedArrayOfL);
  }, [operations]);

  return (
    <div>
      <Navbar color="#FF6230" content="editProfile" backGround="true" backUrl="/profile" />
      <div className="title-div">
        <h1 className="title-style-pink">Your Progress</h1>
      </div>
      <div className="progress-input-div">
        <select className="progress-input" value={timeFilter} onChange={handleFilterChange}>
          <option value="all">All operations</option>
          <option value="today">View operations from today</option>
          <option value="yesterday">View operations from yesterday</option>
          <option value="lastWeek">View operations from last week</option>
          <option value="lastMonth">View operations from last month</option>
        </select>
      </div>
      {statistics &&
        <div className="stats">
          <div className="total">
            <h2>Total Operations</h2>
            <h3>{statistics.total}</h3>
          </div>
          {statistics.total === 0 ?
            <div className="percentages">
              <h3>Still no data from this period</h3>
            </div>
            : <div className="percentages-container">
              <div className="percentages">
                <div>
                  <h3>Correct</h3>
                  {/* <p>{Math.ceil(computePercentage(statistics.correct, statistics.total))}%</p> */}
                  <Percentage percentage={Math.ceil(computePercentage(statistics.correct, statistics.total))} colorToPaint="blue" fontSize="24px" size="80px"/>
                </div>
                <div>
                  <h3>Incorrect</h3>
                  <Percentage percentage={Math.ceil(computePercentage(statistics.incorrect, statistics.total))} colorToPaint="pink" fontSize="24px" size="80px"/>
                  {/* <p>{Math.floor(computePercentage(statistics.incorrect, statistics.total))}%</p> */}
                </div>
              </div>
              <p>Keep up the good work!</p>
            </div>}
        </div>}
      {statistics && statistics.incorrect > 0 &&
        <div className="title-div">
          <h2>Your most frequent mistakes</h2>
        </div>}
      {lArray &&
        <div className='l-cards'>
          {lArray.map(elem => {
            return (
              <div className="l-card" key={elem.L}>
                <div className="l-card-feedback">
                  <p>{elem.feedback}</p>
                </div>
                <div>
                <Percentage percentage={Math.floor(computePercentage(elem.count, statistics.incorrect))} colorToPaint="pink" fontSize="14px" size="60px"/>
                </div>
                    {/* <p>{Math.floor(computePercentage(elem.count, statistics.incorrect))}% of your mistakes</p> */}
                <div>
                  <Link to={`/profile/progress/${elem.L}?timeFilter=${timeFilter}`}><Button color='yellow'>Details</Button></Link>
              </div>
                </div>
            )
          })}
        </div>}
      <Footer color="blue" size="70px" />
    </div>
  );
}

export default Progress;