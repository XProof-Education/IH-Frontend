import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import userService from '../../services/userService';
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
  const [isExercise, setIsExercise] = useState(false);
  const [assignations, setAssignations] = useState([]);
  const [query, setQuery] = useState('');
  const [foundUsers, setFoundUsers] = useState([{}]);
  const [isAssigning, setIsAssigning] = useState(false);
  const navigate = useNavigate();
 
  const getExercise = async () => {
    try {
      const { exerciseData } = await exercisesService.getOneExercise(exerciseId);
      setEditExercise(exerciseData);
    } catch (error) {
      console.error(error);
    }
  }

  const getAssignations = async () => {
    try {
      const { assignations } = await exerciseAssignationsService.getSingleAssignation( exerciseId );
      console.log(assignations)
      setAssignations(assignations);
    } catch (error) {
      console.error(error);
    }
  }

  const handleChange = (e) => {
    setEditExercise(prev => {
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
        exerciseId: exerciseId,
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
      await exercisesService.editExercise(exerciseId, editExercise);
      setIsExercise(true);
    } catch (error) {
      console.error(error);
    }
  }

  const handleSubmitAssignation = async (e) => {
    e.preventDefault();
    const studentIds = assignations.map(assignation => assignation.studentId);
    try {
      // await exerciseAssignationsService.newExerciseAssignation(exercise.exerciseId, {studentIds});
      navigate('/exercises');
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
    getExercise();
    getAssignations();
    //eslint-disable-next-line
  }, []);

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
      <h1>Edit Exercise</h1>
      <form onSubmit={handleSubmitExercise}>
        <label>Upload exercise file</label>
        <input type="text" name="exerciseFile" onChange={handleChange} value={editExercise.exerciseFile} required />
        <label>Upload exercise solution</label>
        <input type="text" name="solutionFile" onChange={handleChange} value={editExercise.solutionFile} />
        <label>Who do you want to assign this exercise to?</label>
        <input type="text" name="student" onChange={handleQueryChange} value={query}/>
        <Button color="blue" type="submit">Assing exercise</Button>
      </form> 
      {assignations && assignations.map(assignation => {
        return (
          <div key={assignation.studentId._id}>
            <p>{assignation.studentId.email}</p>
            <Button color='red' action={() => removeStudentAssignation(assignation.studentId._id)}>Remove</Button>
          </div>
          )
      })}
      {foundUsers && foundUsers.map(user => {
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

export default EditExercise;