import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import exercisesService from '../../services/exercicesService';
import userService from '../../services/userService';
import Navbar from "../../components/Header/Navbar";
import exerciseAssignationsService from '../../services/exerciseAssignationsService';
import Button from '../../components/Button';
import CameraIcon from '../../components/CameraIcon';

const NewExercise = () => {
  const initialStateExercise = {
    exerciseFile: "",
    solutionFile: "",
    exerciseId: "",
  }
  const [exercise, setExercise] = useState(initialStateExercise);
  const [assignations, setAssignations] = useState([]);
  const [query, setQuery] = useState('');
  const [foundUsers, setFoundUsers] = useState([]);
  const [isAssigning, setIsAssigning] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [imagePreviewSolution, setImagePreviewSolution] = useState(null);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  // const handleChange = (e) => {
  //   setExercise(prev => {
  //     return {
  //       ...prev,
  //       [e.target.name] : e.target.value
  //     }
  //   })
  // }

  const handleQueryChange = async (e) => {
    setQuery(e.target.value);
  }

  const handleFileUpload = async (e) => {
    const uploadData = new FormData();
    uploadData.append('imageUrl', e.target.files[0]);
    try {
      const response = await exercisesService.uploadExerciseFile(uploadData);
      setExercise(prev => {
        return {
          ...prev,
          [e.target.name]: response.fileUrl
        }
      })
    // eslint-disable-next-line
     {e.target.name === "exerciseFile" ? setImagePreview(response.fileUrl) : setImagePreviewSolution(response.fileUrl)} ;
    } catch (error) {
      console.error(error)
    }
  }

  const addStudentAssignation = (studentId, userEmail) => {
    setIsAssigning(true);
    setError(false);
    setAssignations(prev => [
      ...prev,
      {
        exerciseId: exercise.exerciseId,
        studentId: studentId,
        email: userEmail,
      }
    ]);
  };

  const removeStudentAssignation = (studentId) => {
    setIsAssigning(true);
    const newAssignations = assignations.filter(user => user.studentId !== studentId);
    setAssignations(newAssignations);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const studentIds = assignations.map(assignation => assignation.studentId);
    try {
      if (studentIds.length !== 0) {
        const { newExerciseData } = await exercisesService.newExercise(exercise);
        await exerciseAssignationsService.newExerciseAssignations(newExerciseData._id, { studentIds });
        navigate('/exercises');
      } else {
        setError("Please assign this exercise");
      }
    } catch (error) {
      console.error(error);
    }
  }

  const searchUsers = async (query) => {
    try {
      const {users} = await userService.getSearchUser(query);
      const assignedStudentsEmails = assignations.map(assignation => assignation.email);
      const students = users.filter(user => user.role === 'student' && !assignedStudentsEmails.includes(user.email));
      if (students.length === 0) {
        students.push({notFound: 'No students found by this email'})
      }
      setFoundUsers(students);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    setIsAssigning(false);
    if (query) {
      searchUsers(query);
    } else {
      setFoundUsers([]);
    }
    // eslint-disable-next-line
  },[query, isAssigning]);

  return (
    <div>
      <Navbar color="#FF6230" content="editProfile" backGround="true" />
      <h1>New exercise</h1>
      <form onSubmit={handleSubmit} style={{display: 'flex', flexDirection: 'column', alignItems:'flex-start'}}>
        <label htmlFor="exercise"><CameraIcon color="blue" size='24'/> Upload exercise file</label>
        <input type="file" id="exercise" name="exerciseFile" onChange={(e) => handleFileUpload(e)} required hidden/>
        {imagePreview && <img src={imagePreview} alt="preview file" /> }
        <label htmlFor="solution"><CameraIcon color="blue" size='24'/> Upload exercise solution</label>
        <input type="file" id="solution" name="solutionFile" onChange={(e) => handleFileUpload(e)} hidden/>
        {imagePreviewSolution && <img src={imagePreviewSolution} alt="preview file" /> }
        <label>Who do you want to assign this exercise to?</label>
        <input type="text" name="student" onChange={handleQueryChange} value={query}/>
        <Button color="blue" type="submit">Submit exercise</Button>
      </form> 
      {assignations.length !== 0 && assignations.map(user => {
        return (
          <div key={user.email}>
            <p>{user.email}</p>
            <Button color='red' action={() => removeStudentAssignation(user.studentId)}>Remove</Button>
          </div>
          )
      })}
      {error && <p>Please assign this exercise</p>}
      {foundUsers.length !== 0 && foundUsers.map(user => {
        return (
          <div key={user._id ? user._id : user.notFound}>
            {user.notFound ? <p>{user.notFound}</p> 
            : <div>
              <h5>{user.name}</h5>
              <p>{user.email}</p>
              <Button color='blue' action={() => addStudentAssignation(user._id, user.email)}>Add</Button>
            </div>}   
          </div>
        )
      })}
    </div>
  )
}

export default NewExercise;