import React, { useState, useEffect } from 'react';
import operationsService from '../../services/operationsService';
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
    <div className="container-all-elements">
      <Navbar color="#FF6230" content="editProfile" backGround="true" backUrl="/profile" />
      <div className="all-elements-content">
        <div className="title-div center-title">
          <h1 className="title-style-violet">My Operations history</h1>
        </div>
        <div className="lists-container">
          <ListCard props={operations} typeData="operations" />
        </div>
      </div>
      <Footer color="pink" size="70px" />
    </div>
  );
}
export default OperationsHistory;