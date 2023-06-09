import './App.css';
import { Routes, Route } from 'react-router-dom';
// import { Toaster } from 'react-hot-toast';
import Home from './views/Home';
import ErrorPage from './views/ErrorPage';
import NotFound from './views/NotFound';
import Signup from './views/auth/Signup';
import Login from './views/auth/Login';
import IsPrivate from './components/IsPrivate';
import Profile from './views/Profile/Profile';
import EditProfile from './views/Profile/EditProfile';
import Camera from './components/Camera/Camera';
import Photo from './components/Camera/Photo';
import OperationsHistory from './views/Operations/OperationsHistory';
import OperationDetail from './views/Operations/OperationDetail';
import Exercises from './views/Exercises/Exercises';
import ExerciseDetail from './views/Exercises/ExerciseDetail';
import NewExercise from './views/Exercises/NewExercise';
import EditExercise from './views/Exercises/EditExercise';
import Progress from './views/Errors/Progress';
import LDetail from './views/Errors/LDetail';
import ErrorDetail from './views/Errors/ErrorDetail';
import Contact from './views/Contact';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<IsPrivate><Profile /></IsPrivate>} />
        <Route path="/profile/progress" element={<IsPrivate><Progress /></IsPrivate>} />
        <Route path="/profile/progress/:l" element={<IsPrivate><LDetail /></IsPrivate>} />
        <Route path="/profile/progress/:l/:error" element={<IsPrivate><ErrorDetail /></IsPrivate>} />
        <Route path="/edit-profile" element={<IsPrivate><EditProfile /></IsPrivate>} />
        <Route path="/operations-history" element={<IsPrivate><OperationsHistory /></IsPrivate>} />
        <Route path="/operations/:operationId" element={<IsPrivate><OperationDetail /></IsPrivate>} />
        <Route path="/exercises" element={<IsPrivate><Exercises /></IsPrivate>} />
        <Route path="/exercises/:exerciseId" element={<IsPrivate><ExerciseDetail /></IsPrivate>} />
        <Route path="/new-exercise" element={<IsPrivate><NewExercise /></IsPrivate>} />
        <Route path="/edit/:exerciseId" element={<IsPrivate><EditExercise /></IsPrivate>} />
        <Route path="/error" element={<ErrorPage />} />
        <Route path='/camera' element={<Camera forwardUrl='/camera/result' backwardUrl='/' />} />
        <Route path='/camera/result' element={<Photo />} />
        <Route path='/contact' element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
