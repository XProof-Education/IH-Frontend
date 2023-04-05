import React, { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import Navbar from '../../components/Header/Navbar';
import ListCard from '../../components/Cards/ListCard';
import exercisesService from '../../services/exercicesService';
import exerciseAssignationsService from '../../services/exerciseAssignationsService';
import Loading from '../../components/Loading';


const Exercises = () => {
  const { user } = useAuth();
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(false);

  const getExercises = async () => {
    setLoading(true);
    try {
      if(user.role === 'teacher') {
      const response = await exercisesService.getAllExercises();
        setExercises(response.teacherExercisesData);
      } else {
        const response = await exerciseAssignationsService.getAllAssignations();
        console.log(response.findAssignation)
        setExercises(response.findAssignation)
        }
      setLoading(false);
    } catch (error) {
      console.error(error)
    } 
  }

  useEffect(() => {
    getExercises();
    // eslint-disable-next-line
  }, [])

  return (
    <div>
      <Navbar color="#FF6230" content="editProfile" backGround="true" />
      {loading && <Loading />}
      {!loading && exercises &&
        <ListCard props={exercises} typeData={user.role === 'teacher' ? "exercises" : "studentExercises"} />
      }
    </div>
  )
}

export default Exercises;