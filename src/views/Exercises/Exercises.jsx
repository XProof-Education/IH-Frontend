import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Header/Navbar';
import ListCard from '../../components/Cards/ListCard';
import exercisesService from '../../services/exercicesService';


const Exercises = () => {
  const [exercises, setExercises] = useState([]);

  const getExercises = async () => {
    try {
      const response = await exercisesService.getAllExercises();
      setExercises(response.teacherExercisesData)
    } catch (error) {
      console.error(error)
    } 
  }

  useEffect(() => {
    getExercises();
  }, [])
  return (
    <div>
      <Navbar color="#FF6230" content="editProfile" backGround="true"/>
      <h1>My exercises</h1>
      <ListCard props={exercises}/>
    
    </div>
  )
  
}
export default Exercises;