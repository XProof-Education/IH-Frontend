import React, { useState, useEffect } from 'react';
import operationsService from '../../services/operationsService';
import Navbar from '../../components/Header/Navbar';
import ListCard from '../../components/Cards/ListCard';
import Footer from '../../components/Footer';
import CameraIcon from '../../components/Icons/CameraIcon';


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
    <div className="view">
      <Navbar color="#FF6230" content="editProfile" backGround="true" backUrl="/profile" />
      <div className="infinite-container">
        <div className="title-div center-title">
          <h1 className="title-style-violet">My Operations history</h1>
        </div>
        {operations.length === 0 && <div className="title-div"><h2 className="empty-operations">No operations to see yet. Click <CameraIcon color="pink" size="30px" style={{}} /> to create your first operation.</h2></div>}
        <div className="lists-container">
          <ListCard props={operations} typeData="operations" />
        </div>
      </div>
      <Footer color="pink" size="70px" />
    </div>
  );
}
export default OperationsHistory;