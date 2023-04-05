import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import exercisesService from '../../services/exercicesService';
import userService from '../../services/userService';
import Navbar from "../../components/Header/Navbar";
import exerciseAssignationsService from '../../services/exerciseAssignationsService';
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
  const [query, setQuery] = useState('');
  const [foundUsers, setFoundUsers] = useState([{}]);
  const [isAssigning, setIsAssigning] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setExercise(prev => {
      return {
        ...prev,
        [e.target.name] : e.target.value
      }
    })
  }

  const handleQueryChange = async (e) => {
    setQuery(e.target.value);
  }

  const addStudentAssignation = (studentId, userEmail) => {
    setIsAssigning(true);
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
    const studentIds = assignations.map(assignation => assignation.studentId);
    try {
      const assignations = await exerciseAssignationsService.newExerciseAssignation(exercise.exerciseId, studentIds);
      console.log(assignations);
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
  },[query, isAssigning]);

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
            <input type="text" name="student" onChange={handleQueryChange} value={query}/>
            <Button color="blue" type="submit">Assing exercise</Button>
          </form>}
      {assignations && assignations.map(user => {
        return (
          <div key={user.studentId}>
            <p>{user.email}</p>
            <Button color='red' action={() => removeStudentAssignation(user.studentId)}>Remove</Button>
          </div>
          )
      })}
      {isExercise && foundUsers && foundUsers.map(user => {
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