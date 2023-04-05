import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import exercisesService from '../../services/exercicesService';
import exerciseAssignationsService from '../../services/exerciseAssignationsService';
import Navbar from '../../components/Header/Navbar';
import Button from '../../components/Button';


const EditExercise = () => {
  const { exerciseId } = useParams(); 
  const initialStateEditExercise = {
    exerciseFile: "",
    solutionFile: ""
  }
  const [editExercise, setEditExercise] = useState(initialStateEditExercise);
 
  let getExercise = async () => {
    try {
      const { exerciseData } = await exercisesService.getOneExercise(exerciseId);
      setEditExercise(exerciseData);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getExercise();
    //eslint-disable-next-line
  }, []);

  const handleChange = (e) => {
    setEditExercise(prev => {
      return {
        ...prev,
        [e.target.name] : e.target.value
      }
    })
  }

  const handleSubmit = async (e) => {
    try {
      await exercisesService.editExercise(exerciseId, editExercise);
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <div>
      <Navbar color="#FF6230" content="editProfile" backGround="true"/>
      <h1> Edit exercise </h1>
      <form onSubmit={handleSubmit}>
        <label>Exercise file</label>
        <input type="text" name="exerciseFile" onChange={handleChange} value={editExercise.exerciseFile} required />
        <label>Solution file</label>
        <input type="text" name="solutionFile" onChange={handleChange} value={editExercise.solutionFile}/>
        <Button color='blue' action={handleSubmit}>Edit</Button>
      </form>
    </div>
  )
}

export default EditExercise;