import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import userService from '../../services/userService';
import exercisesService from '../../services/exercicesService';
import exerciseAssignationsService from '../../services/exerciseAssignationsService';
import Navbar from '../../components/Header/Navbar';
import Button from '../../components/Button';
import UploadIcon from '../../components/UploadIcon';
import Footer from '../../components/Footer';
import AddIcon from '../../components/AddIcon';
import DeleteIcon from '../../components/DeleteIcon';
import Error from '../../components/Error';

const EditExercise = () => {
  const { exerciseId } = useParams(); 
  const initialStateEditExercise = {
    exerciseFile: "",
    solutionFile: ""
  }
  const [editedExercise, setEditedExercise] = useState(initialStateEditExercise);
  const [assignations, setAssignations] = useState([]);
  const [query, setQuery] = useState('');
  const [foundUsers, setFoundUsers] = useState([]);
  const [isAssigning, setIsAssigning] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [imagePreviewSolution, setImagePreviewSolution] = useState(null);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const getData = async () => {
    try {
      const { exerciseData } = await exercisesService.getOneExercise(exerciseId);
      const assignationsDB = await exerciseAssignationsService.getExerciseAssignations( exerciseId );
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
        setEditedExercise(prev => {
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
        exerciseId: exerciseId,
        studentId: studentId,
        email: userEmail,
      }
    ]);
    setQuery('');
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
        setQuery('');
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
    <div className="view">
      <Navbar color="#FF6230" content="editProfile" backGround="true" />
      <div className="infinite-container">
        <div className="form-title">
          <h1 className="title-style-pink">Edit Exercise</h1>
        </div>
        <div className='form-exercise-container'>
          <form onSubmit={handleSubmit} className="exercise-form">
            <div className="upload-inputs">
              <div className="input-label-exercise">
                <label htmlFor='exercise' className="label"><UploadIcon color="yellow" size='24' /> Replace exercise </label>
                <input type="file" id='exercise' name="exerciseFile" onChange={(e) => handleFileUpload(e)} required={imagePreview !== null ? false : true} hidden />
              </div>
              {imagePreview &&
                <div className='image-preview'>
                  <img src={imagePreview} alt="preview file" />
                </div>}
              <div className="input-label-exercise">
                <label htmlFor='solution' className="label"><UploadIcon color="blue" size='24' /> Replace solution</label>
                <input type="file" id='solution' name="solutionFile" onChange={(e) => handleFileUpload(e)} hidden />
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
              {query === "" && <Button color="blue" type="submit">Submit changes</Button>}
            </div>
          </form>
        </div>
        {assignations.length !== 0 && assignations.map(assignation => {
          return (
            <div key={assignation.email} className='assign-students-div'>
              <div onClick={() => removeStudentAssignation(assignation.studentId)}>
                <DeleteIcon color='pink' size='25' />
              </div>
              <p>{assignation.email}</p>
            </div>
          )
        })}
        {error && <Error align="column" error={error}/>}
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

export default EditExercise;