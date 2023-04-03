import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import exercisesService from '../../services/exercicesService';
import Navbar from "../../components/Header/Navbar";
import Button from '../../components/Button';

const NewExercise = () => {
  const initialState = {
    exerciseFile: "",
    solutionFile: ""
  }
  const [exercise, setExercise] = useState(initialState);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setExercise(prev => {
      return {
        ...prev,
        [e.target.name] : e.target.value
      }
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newExercise = await exercisesService.newExercise(exercise);
      setExercise(initialState);
      navigate(`/exercises/${newExercise._id}`);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      <Navbar color="#FF6230" content="editProfile" backGround="true" />
      <h1>New exercise</h1>
      <form onSubmit={handleSubmit}>
        <label>Upload exercise file</label>
        <input type="text" name="exerciseFile" onChange={handleChange} value={exercise.exerciseFile} required />
        <label>Upload exercise solution</label>
        <input type="text" name="solutionFile" onChange={handleChange} value={exercise.solutionFile} />
        <Button color="blue" type="submit">Submit</Button>
      </form>
    </div>
  )
}

export default NewExercise;