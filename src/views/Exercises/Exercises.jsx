import React, { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import Navbar from '../../components/Header/Navbar';
import exercisesService from '../../services/exercicesService';
import exerciseAssignationsService from '../../services/exerciseAssignationsService';
import Loading from '../../components/Loading';
import ListCard from '../../components/Cards/ListCard';
import Footer from '../../components/Footer';


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
      <Navbar color="#FF6230" content="editProfile" backGround="true" backUrl="/profile" />
      <div className="title-div">
        <h1 className="title-style-yellow">My Exercises</h1>
      </div>
      {loading && <Loading />}
      {!loading && exercises &&
        <div className="lists-container">
        <ListCard props={exercises} typeData={user.role === 'teacher' ? "exercises" : "studentExercises"} />
        </div>
      }
      <Footer color="pink" size="70px"/>
    </div>
  )
}

export default Exercises;