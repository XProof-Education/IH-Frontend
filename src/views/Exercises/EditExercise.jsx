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
  const [editedExercise, setEditedExercise] = useState(initialStateEditExercise);
  // const [isExercise, setIsExercise] = useState(false);
  const [assignations, setAssignations] = useState([]);
  const [query, setQuery] = useState('');
  const [foundUsers, setFoundUsers] = useState([]);
  const [isAssigning, setIsAssigning] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [imagePreviewSolution, setImagePreviewSolution] = useState(null);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

console.log(editedExercise)

  const getData = async () => {
    try {
      const { exerciseData } = await exercisesService.getOneExercise(exerciseId);
      const assignationsDB = await exerciseAssignationsService.getSingleAssignation( exerciseId );
      const assignations = assignationsDB.assignations.map(elem => {
        return {
          exerciseId: elem.exerciseId._id,
          studentId: elem.studentId._id,
          email: elem.studentId.email,
        }
      });
      setAssignations(assignations);
      setEditedExercise(exerciseData);
      setImagePreview(exerciseData.exerciseFile);
      setImagePreviewSolution(exerciseData.solutionFile);
    } catch (error) {
      console.error(error);
    }
  }

  // const handleChange = (e) => {
  //   setEditedExercise(prev => {
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
      setEditedExercise(prev => {
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
        exerciseId: exerciseId,
        studentId: studentId,
        email: userEmail,
      }
    ]);
  };

  const removeStudentAssignation = (studentId) => {
    setIsAssigning(true);
    const newAssignations = assignations.filter(assignation => assignation.studentId !== studentId);
    setAssignations(newAssignations);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const studentIds = assignations.map(assignation => assignation.studentId);
    try {
      if(studentIds.length !== 0) {
        await exercisesService.editExercise(exerciseId, editedExercise);
        await exerciseAssignationsService.editExerciseAssignations(exerciseId, { studentIds });
        navigate('/exercises');
      } else {
        setError('Please assign this exercise');
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
    getData();
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
      <form onSubmit={handleSubmit}>
        <label>Upload exercise file</label>
        <input type="file" name="exerciseFile" onChange={(e) => handleFileUpload(e)} required={imagePreview !== null ? false : true} />
         {imagePreview && <img src={imagePreview} alt="preview file" /> }
        <label>Upload exercise solution</label>
        <input type="file" name="solutionFile" onChange={(e) => handleFileUpload(e)} />
        {imagePreviewSolution && <img src={imagePreviewSolution} alt="preview file" /> }
        <label>Who do you want to assign this exercise to?</label>
        <input type="text" name="student" onChange={handleQueryChange} value={query}/>
        <Button color="blue" type="submit">Submit changes</Button>
      </form> 
      {assignations.length !== 0 && assignations.map(assignation => {
        return (
          <div key={assignation.email}>
            <p>{assignation.email}</p>
            <Button color='red' action={() => removeStudentAssignation(assignation.studentId)}>Remove</Button>
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

export default EditExercise;