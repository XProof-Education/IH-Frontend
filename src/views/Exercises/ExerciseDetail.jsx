import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import Navbar from '../../components/Header/Navbar';
import exercisesService from '../../services/exercicesService';
import exerciseAssignationsService from '../../services/exerciseAssignationsService';
import operationsService from '../../services/operationsService';
import Button from '../../components/Button';
import Footer from '../../components/Footer';
import Camera from '../../components/Camera/Camera';
import Photo from '../../components/Camera/Photo';
import handleOperation from '../../utils/handleOperation';
import OperationCard from '../../components/Cards/OperationCard';

const ExerciseDetail = () => {
  const { user } = useAuth();
  const { exerciseId } = useParams();
  const [exercise, setExercise] = useState({});
  const [assignations, setAssignations] = useState(null);
  const [seeCompletions, setSeeCompletions] = useState([]);
  const [singleStudentAssignation, setSingleStudentAssignation] = useState({});
  const [camera, setCamera] = useState(false);
  const [photo, setPhoto] = useState(false);
  const navigate = useNavigate();

  const getOneExercise = async () => {
    try {
      const { exerciseData } = await exercisesService.getOneExercise(exerciseId);
      const { assignations } = await exerciseAssignationsService.getExerciseAssignations(exerciseId);
      setExercise(exerciseData);
      setAssignations(assignations);
      if (user.role === 'student') {
        const studentAssignation = assignations.filter(elem => elem.studentId._id === user._id)
        setSingleStudentAssignation(studentAssignation[0]);
      }
      // console.log(assignations);
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

  const openCamera = () => {
    setPhoto(false);
    setCamera(true);
  }

  const closeCamera = () => {
    setCamera(false);
  }

  const showPhoto = () => {
    setCamera(false);
    setPhoto(true);
  }

  const handleSubmitExercise = async (submittedOperation, imageUrl) => {
    const { isCorrect, operation, prompt } = handleOperation(submittedOperation);
    try {
      const { newMathOperation } = await operationsService.newOperation({
        prompt: prompt,
        mathLatex: submittedOperation.join(' \\\\ '),
        mathLatexSimplified: operation.join(' \\\\ '),
        cloudinaryPhoto: imageUrl,
        isCorrect: isCorrect
      });
      await exerciseAssignationsService.completeAssignation(singleStudentAssignation._id, newMathOperation._id);
      setPhoto(false);
    } catch (error) {
        console.error(error);
    }
  }

  const handleSeeStudentCompletion = (assignation) => {
    if (assignation.isCompleted && seeCompletions.includes(assignation._id)) {
      const filteredArray = seeCompletions.filter(elem => elem !== assignation._id);
      setSeeCompletions(filteredArray);
    } else if (assignation.isCompleted && !seeCompletions.includes(assignation._id)) {
      setSeeCompletions(prev => [...prev, assignation._id]);
    }
  }
  useEffect(() => {
    getOneExercise();
    // eslint-disable-next-line
  }, [photo]);

  return (
    <div>
      <Navbar color="#FF6230" content="editProfile" backGround="true" />
      <div className="container-exercise-detail">
        <div className="title-div">
          <h1 className="title-style-blue">Single exercise</h1>
        </div>
        <div className="img-container">
          <img src={exercise.exerciseFile} alt="exercise" />
          {(user.role === 'teacher' || (user.role === 'student' && singleStudentAssignation.isCompleted)) && exercise.solutionFile && (
            <>
              <p>Solution:</p>
              <img style={{ width: "100%" }} src={exercise.solutionFile} alt="exercise solution" />
            </>
          )}
        </div>
        {user.role === 'teacher' && (
          <>
            <div className="buttons-container">
              <Link to={`/edit/${exerciseId}`}><Button color="yellow"> Edit </Button></Link>
              <Button color="pink" action={handleDelete}> Delete </Button>
            </div>
            {assignations && assignations.map(elem => (
              <div key={elem._id} onClick={() => handleSeeStudentCompletion(elem)}>
                <p>{elem.studentId.name} {elem.studentId.lastName}</p>
                {elem.isCompleted ? <p>completed {seeCompletions.includes(elem._id) ? 'Hide' : 'Show'}</p> : <p>pending</p>}
                {elem.isCompleted && seeCompletions.includes(elem._id) && <OperationCard operation={elem.completion} isCompletion={true} />}
              </div>
            ))}
          </>
        )}
        {user.role === 'student' && !photo && (
          <>
            {!singleStudentAssignation.isCompleted && <Button color="blue" action={openCamera}>Upload exercise</Button>}
            {singleStudentAssignation.isCompleted && <p>Completed</p>}
          </>
        )}
        {camera && <Camera backwardUrl={`/exercises/${exercise._id}`} atCloseAction={closeCamera} atTakePhoto={showPhoto}></Camera>}
        {photo && <Photo isSubmittingExercise={true} handleSubmitExercise={handleSubmitExercise} handleInvalid={openCamera}></Photo>}
        <Footer color="yellow" size="70px" />
      </div>
    </div>
  );
}

export default ExerciseDetail;