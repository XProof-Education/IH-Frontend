import './App.css';
import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
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
import Feedback from './views/cameraViews/Feedback';

function App() {
  return (
    <div className="App">
      <Toaster/>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/edit-profile" element={<EditProfile />} />
        <Route path="/private" element={<IsPrivate><PrivateView /></IsPrivate>} />
        <Route path="/error" element={<ErrorPage />} />
        <Route path='/camera' element={<Camera />} />
        <Route path='/camera/result' element={<Photo />} />
        <Route path='/camera/feedback' element={<Feedback />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
