import axios from 'axios';

class ExercicesService {
  constructor() {
    this.api = axios.create({
      baseURL: `${process.env.REACT_APP_BACKEND_URL}/api/v1/exercises`
    });

    this.api.interceptors.request.use(config => {
      const storedToken = localStorage.getItem('authToken');
      if (storedToken) {
        config.headers = { Authorization: `Bearer ${storedToken}` };
      }
      return config;
    });
  }

  getAllExercises() {
    return this.api.get('/').then(({ data }) => data).catch(err => console.error(err));
  }

  getOneExercise(exerciseId) {
    return this.api.get(`/${exerciseId}`).then(({ data }) => data).catch(err => console.error(err));
  }

  newExercise(body) {
    return this.api.post('/', body).then(({ data }) => data).catch(err => console.error(err));
  }

  uploadExerciseFile(file) {
    return this.api.post('/upload', file).then(({ data }) => data).catch(err => console.error(err));
  }

  editExercise(exerciseId, body) {
    return this.api.put(`/${exerciseId}`, body).then(({ data }) => data).catch(err => console.error(err));
  }

  deleteExercise(exerciseId) {
    return this.api.delete(`/${exerciseId}`).then((response) => response.data).catch(err => console.error(err));
  }
}

const exercisesService = new ExercicesService();

export default exercisesService;