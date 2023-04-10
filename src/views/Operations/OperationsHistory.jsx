import React, { useState, useEffect } from 'react';
import operationsService from '../../services/operationsService';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Header/Navbar';
import ListCard from '../../components/Cards/ListCard';
import Footer from '../../components/Footer';

const OperationsHistory = () => {
  const [operations, setOperations] = useState([]);

  const getOperations = async () => {
    try {
      const response = await operationsService.getAllOperations();
      setOperations(response.mathOperations);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect (() => {
    getOperations();
  }, []);

  return (
    <div>
      <Navbar color="#FF6230" content="editProfile" backGround="true" backUrl="/profile"/>
      <h1 className="title-style-violet">My Operations history</h1>
      <Link to={'/profile/progress'}>See your progress</Link>
      <ListCard props={operations} typeData="operations" />
      <Footer color="pink" size="70px"/>
    </div>
  )
  
}
export default OperationsHistory;