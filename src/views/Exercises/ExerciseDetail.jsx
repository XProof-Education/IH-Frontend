import { useState, useEffect } from 'react';
import Navbar from '../../components/Header/Navbar';
import { useParams, useNavigate, Link } from 'react-router-dom';
import exercisesService from '../../services/exercicesService';
import Button from '../../components/Button';

const ExerciseDetail = () => {
  const { exerciseId } = useParams();
  const [exercise, setExercise] = useState({});
  const navigate = useNavigate();

  const getOneExercise = async () => {
    try {
      const response = await exercisesService.getOneExercise(exerciseId);
      setExercise(response.exerciseData);
    } catch (error) {
      console.error(error);
    }
  }

  const handleDelete = async () => {
  try {
    await exercisesService.deleteExercise(exerciseId);
  } catch (error) {
    console.error(error);
  } finally {
    navigate('/exercises');
  }
}

  useEffect(() => {
    getOneExercise();
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <Navbar color="#FF6230" content="editProfile" backGround="true"/>
      <h1>Single exercise</h1>
      <img style={{width:"100%"}} src={exercise.exerciseFile} alt="exercise"/>
      <Link to={`/edit/${exerciseId}`}><Button color="blue"> Edit </Button></Link>
      <Button color="red" action={handleDelete}> Delete </Button>
    </div>
  )
  
}
export default ExerciseDetail;