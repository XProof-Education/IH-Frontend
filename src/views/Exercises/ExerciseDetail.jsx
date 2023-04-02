import { useState, useEffect } from 'react';
import Navbar from '../../components/Header/Navbar';
import { useParams } from 'react-router-dom';
import exercisesService from '../../services/exercicesService';

const ExerciseDetail = () => {
  const { exerciseId } = useParams();
  const [exercise, setExercise] = useState();

  return (
    <div>
      <Navbar color="#FF6230" content="editProfile" backGround="true"/>
      <h1>Single exercise</h1>
      
    
    </div>
  )
  
}
export default ExerciseDetail;