import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Header/Navbar';
import operationsService from '../../services/operationsService';
import { getErrorStatistics, computeL } from '../../utils/progress/getErrorStatistics';
import { useParams } from 'react-router-dom';
import { Link, useLocation } from 'react-router-dom';
import Button from '../../components/Button';
import Footer from '../../components/Footer';
import filterOperations from '../../utils/filterOperationsByTime';

function ErrorDetail() {
  const { l, error } = useParams();
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
  const [title, setTitle] = useState('');
  const [operations, setOperations] = useState([]);
  const [filteredOperations, setFilteredOperations] = useState([]);

  const getOperations = async () => {
    try {
      const response = await operationsService.getAllOperations();
      const timeFilteredOperations = filterOperations(response.mathOperations, timeFilter);
      setOperations(timeFilteredOperations);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getOperations();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const targetError = parseInt(error);
    const stats = getErrorStatistics(operations);

    for (const error in stats.errors) {
      if (parseInt(l) === computeL(error) && parseInt(error) === targetError) {
        setTitle(stats.errors[error].feedback.split('.')[0])
        setFilteredOperations(stats.errors[error].operations)
      }
    }
  }, [operations, l, error]);
  return (
    <div className='view'>
      <Navbar color="#FF6230" content="editProfile" backGround="true" />
      <div className="infinite-container">
        <div className="detail-errors-container">
          <h3 className='error-time-filter'>Viewing {timeFilterText[timeFilter]}</h3>
          <h4>{title}</h4>
          {filteredOperations && filteredOperations.map(operation => {
            return (
              <div className="operation-card" key={operation._id}>
                <div className="operation-card-img">
                  <img src={operation.cloudinaryPhoto} alt="Operation detail" />
                </div>
                <Link to={`/operations/${operation._id}?timeFilter=${timeFilter}`}><Button color='pink'>See operation detail</Button></Link>
              </div>
            )
          })}
        </div>
      </div>
      <Footer color="blue" size="70px" />
    </div>
  );
}

export default ErrorDetail;