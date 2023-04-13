import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import exercisesService from '../../services/exercicesService';
import userService from '../../services/userService';
import Navbar from "../../components/Header/Navbar";
import exerciseAssignationsService from '../../services/exerciseAssignationsService';
import Button from '../../components/Button';
import UploadIcon from '../../components/UploadIcon';
import Footer from '../../components/Footer';
import AddIcon from '../../components/AddIcon';
import DeleteIcon from '../../components/DeleteIcon';

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

  const handleQueryChange = async (e) => {
    setQuery(e.target.value);
  }

  const handleFileUpload = async (e) => {
    let fileExtension = '';
    const allowedFiles = ["jpg", "png"];
    if (e.target.files[0]) {
      fileExtension = e.target.files[0].name.split('.')[1];
    } else {
      setError('Please upload an exercise file');
    }
    if (allowedFiles.includes(fileExtension)) {
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
       e.target.name === "exerciseFile" ? setImagePreview(response.fileUrl) : setImagePreviewSolution(response.fileUrl);
       setError(null);
      } catch (error) {
        console.error(error);
        const invalidField = e.target.name === "exerciseFile" ? 'exercise file' : 'solutions file';
        setError(`Something went wrong uploading the ${invalidField}, try again please.`);
      }
    } else {
      const invalidField = e.target.name === "exerciseFile" ? 'exercise file' : 'solutions file';
      setError(`Invalid ${invalidField}`);
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
    setQuery('');
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
      if (studentIds.length !== 0 && exercise.exerciseFile.length !== 0) {
        const { newExerciseData } = await exercisesService.newExercise(exercise);
        await exerciseAssignationsService.newExerciseAssignations(newExerciseData._id, { studentIds });
        setQuery('');
        navigate('/exercises');
      } else {
        setError("To add a new exercise, it is mandatory to upload an exercise file and assign it");
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
        students.push({ notFound: 'No students found by this email' });
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
  }, [query, isAssigning]);

  return (
    <div className="exercise-create-container">
      <Navbar color="#FF6230" content="editProfile" backGround="true" />
      <div className="exercise-new-container">
        <div className="form-title">
          <h1 className="title-style-pink">Add new exercise</h1>
        </div>
        <div className='form-exercise-container'>
          <form onSubmit={handleSubmit} className="exercise-form">
            <div className="upload-inputs">
              <div className="input-label-exercise">
                <label htmlFor="exercise" className="label"><UploadIcon color="blue" size='30' /> Upload exercise photo</label>
                <input type="file" id="exercise" name="exerciseFile" onChange={(e) => handleFileUpload(e)} hidden />
              </div>
              {imagePreview &&
                <div className='image-preview'>
                  <img src={imagePreview} alt="preview file" />
                </div>}
              <div className="input-label-exercise">
                <label htmlFor="solution" className="label"><UploadIcon color="yellow" size='30' /> Upload exercise solution</label>
                <input type="file" id="solution" name="solutionFile" onChange={(e) => handleFileUpload(e)} hidden />
              </div>
              {imagePreviewSolution &&
                <div className='image-preview'>
                  <img src={imagePreviewSolution} alt="preview file" />
                </div>}
              <div className="input-label-assign-exercise">
                <label className="assign">Who do you want to assign this exercise to?</label>
                <input type="text" name="student" onChange={handleQueryChange} value={query} />
              </div>
            </div>
            <div className='button-assign'>
              {query === "" && <Button color="yellow" type="submit">Create exercise</Button>}
            </div>
          </form>
        </div>
        {assignations.length !== 0 && assignations.map(user => {
          return (
            <div key={user.email} className='assign-students-div'>
              <div onClick={() => removeStudentAssignation(user.studentId)}>
                <DeleteIcon color='pink' size='25' />
              </div>
              <p>{user.email}</p>
            </div>
          )
        })}
        {error && <p>{error}</p>}
        {foundUsers.length !== 0 && foundUsers.map(user => {
          return (
            <div key={user._id ? user._id : user.notFound}>
              {user.notFound ?
                <div className="not-found-div">
                  <p>{user.notFound}</p>
                </div>
                : <div className='assign-students-div'>
                  <div onClick={() => addStudentAssignation(user._id, user.email)}>
                    <AddIcon color='blue' size='25' />
                  </div>
                  <p>{user.name} - </p>
                  <p>{user.email}</p>
                </div>}
            </div>
          )
        })}
      </div>
      <Footer color="pink" size="70px" />
    </div>
  );
}

export default NewExercise;