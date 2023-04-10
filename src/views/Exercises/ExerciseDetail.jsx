import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import Navbar from '../../components/Header/Navbar';
import exercisesService from '../../services/exercicesService';
import Button from '../../components/Button';
import Footer from '../../components/Footer';

const ExerciseDetail = () => {
  const { user } = useAuth();
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
      <Navbar color="#FF6230" content="editProfile" backGround="true" />
      <div className="container-detail">
        <div className="title-div">
          <h1 className="title-style-blue">Single exercise</h1>
        </div>
        <div className="img-container">
          <img src={exercise.exerciseFile} alt="exercise" />
          {exercise.solutionFile && <img style={{ width: "100%" }} src={exercise.solutionFile} alt="exercise solution" />}
        </div>
        {user.role === 'teacher' &&
          <div className="buttons-container">
            <Link to={`/edit/${exerciseId}`}><Button color="yellow"> Edit </Button></Link>
            <Button color="pink" action={handleDelete}> Delete </Button>
          </div>}
        <Footer color="yellow" size="70px" />
      </div>
    </div>
  );
}

export default ExerciseDetail;