import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Header/Navbar';
import ListCard from '../../components/Cards/ListCard';
import exercisesService from '../../services/exercicesService';
import Loading from '../../components/Loading';


const Exercises = () => {
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(false);

  const getExercises = async () => {
    setLoading(true);
    try {
      const response = await exercisesService.getAllExercises();
      setExercises(response.teacherExercisesData);
      setLoading(false);
    } catch (error) {
      console.error(error)
    } 
  }

  useEffect(() => {
    getExercises();
  }, [])

  return (
    <div>
      <Navbar color="#FF6230" content="editProfile" backGround="true" />
      {loading && <Loading />}
      {!loading && exercises &&
       <ListCard props={exercises} typeData="exercises" />}
    
    </div>
  )
  
}
export default Exercises;