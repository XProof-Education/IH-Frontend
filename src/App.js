import './App.css';
import { Routes, Route } from 'react-router-dom';
// import { Toaster } from 'react-hot-toast';
import Home from './views/Home';
import ErrorPage from './views/ErrorPage';
import NotFound from './views/NotFound';
import Signup from './views/auth/Signup';
import Login from './views/auth/Login';
import PrivateView from './views/PrivateView';
import IsPrivate from './components/IsPrivate';
import Profile from './views/Profile/Profile';
import EditProfile from './views/Profile/EditProfile';
import Camera from './views/cameraViews/Camera';
import Photo from './views/cameraViews/Photo';
import OperationsHistory from './views/Operations/OperationsHistory';
import OperationDetail from './views/Operations/OperationDetail';
import Exercises from './views/Exercises/Exercises';
import ExerciseDetail from './views/Exercises/ExerciseDetail';
import FrequentErrors from './views/FrequentErrors';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<IsPrivate><Profile /></IsPrivate>} />
        <Route path="/edit-profile" element={<IsPrivate><EditProfile /></IsPrivate>} />
        <Route path="/operations-history" element={<IsPrivate><OperationsHistory /></IsPrivate>} />
        <Route path="/operation/:operationId" element={<IsPrivate><OperationDetail /></IsPrivate>} />
        <Route path="/exercises" element={<IsPrivate><Exercises /></IsPrivate>} />
        <Route path="/exercises/:exerciseId" element={<IsPrivate><ExerciseDetail /></IsPrivate>} />
        <Route path="/frequent-errors" element={<IsPrivate><FrequentErrors /></IsPrivate>} />
        <Route path="/private" element={<IsPrivate><PrivateView /></IsPrivate>} />
        <Route path="/error" element={<ErrorPage />} />
        <Route path='/camera' element={<Camera />} />
        <Route path='/camera/result' element={<Photo />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
