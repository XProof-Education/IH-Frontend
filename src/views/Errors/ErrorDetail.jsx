import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Header/Navbar';
import operationsService from '../../services/operationsService';
import { getErrorStatistics, computeL } from '../../utils/progress/getErrorStatistics';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Button from '../../components/Button';

function ErrorDetail() {
  const { l, error } = useParams();
  const [title, setTitle] = useState('')
  const [operations, setOperations] = useState([]);
  const [filteredOperations, setFilteredOperations] = useState([]);

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
    const targetError = parseInt(error);
    const stats = getErrorStatistics(operations);

    for (const error in stats.errors) {
      if (parseInt(l) === computeL(error) && parseInt(error) === targetError) {
        setTitle(stats.errors[error].feedback)
        setFilteredOperations(stats.errors[error].operations)
      }
    }
  }, [operations, l, error]);
  return ( 
    <div>
      <Navbar color="#FF6230" content="editProfile" backGround="true"/>
      <h3>{title}</h3>
      {filteredOperations && filteredOperations.map(operation => {
        return (
          <div className="operation-card" key={operation._id}>
            <img width='100px' src={operation.cloudinaryPhoto} alt="Operation detail" />
            <Link to={`/operations/${operation._id}`}><Button color='blue'>See operation detail</Button></Link>
          </div>
        )
      })}
    </div>
   );
}

export default ErrorDetail;