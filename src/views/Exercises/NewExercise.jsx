import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import exercisesService from '../../services/exercicesService';
import Navbar from "../../components/Header/Navbar";
import Button from '../../components/Button';

const NewExercise = () => {
  const initialStateExercise = {
    exerciseFile: "",
    solutionFile: "",
    exerciseId: "",
  }
  const [exercise, setExercise] = useState(initialStateExercise);
  const [isExercise, setIsExercise] = useState(false);
  const [assignations, setAssignations] = useState([]);
  const [student, setStudent] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setExercise(prev => {
      return {
        ...prev,
        [e.target.name] : e.target.value
      }
    })
  }

  const handleStudentChange = (e) => {
    setStudent(e.target.value);
    
  }

  const handleSubmitExercise = async (e) => {
    e.preventDefault();
    try {
      const { newExerciseData } = await exercisesService.newExercise(exercise);
      setExercise(prev => {
        return {
          ...prev,
          exerciseId: newExerciseData._id
        }
      });
      setIsExercise(true);
    } catch (error) {
      console.error(error);
    }
  }

  const handleSubmitAssignation = async (e) => {
    e.preventDefault();
    try {
      console.log('submited')
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      <Navbar color="#FF6230" content="editProfile" backGround="true" />
      <h1>New exercise</h1>
      {!isExercise 
        ? <form onSubmit={handleSubmitExercise}>
            <label>Upload exercise file</label>
            <input type="text" name="exerciseFile" onChange={handleChange} value={exercise.exerciseFile} required />
            <label>Upload exercise solution</label>
            <input type="text" name="solutionFile" onChange={handleChange} value={exercise.solutionFile} />
            <Button color="blue" type="submit">Submit</Button>
          </form> 
        : <form onSubmit={handleSubmitAssignation}>
            <label>Who do you want to assign this exercise to?</label>
            <input type="text" name="student" onChange={handleStudentChange} value={student}/>
          </form>}
    </div>
  )
}

export default NewExercise;