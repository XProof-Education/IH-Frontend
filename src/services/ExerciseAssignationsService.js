import axios from 'axios';

class ExerciseAssignationsService {
  constructor() {
    this.api = axios.create({
      baseURL: `${process.env.REACT_APP_BACKEND_URL}/api/v1/exerciseAssignation`
    });

    this.api.interceptors.request.use(config => {
      const storedToken = localStorage.getItem('authToken');
      if (storedToken) {
        config.headers = { Authorization: `Bearer ${storedToken}` };
      }
      return config;
    });
  }

  getAllAssignations() {
    return this.api.get('/').then(({ data }) => data).catch(err => console.error(err));
  }

  getSingleAssignation(exerciseId) {
    return this.api.get(`/${exerciseId}`).then(({ data }) => data).catch(err => console.error(err));
  }

  newExerciseAssignation(exerciseId, body) {
    return this.api.post(`/${exerciseId}`, body).then(({ data }) => data).catch(err => console.error(err));
  }

  editExerciseAssignation(exerciseId, body) {
    return this.api.put(`/${exerciseId}`, body).then(({ data }) => data).catch(err => console.error(err));
  }

  deleteAllExerciseAssignation(exerciseId) {
    return this.api.delete(`/deleteAll/${exerciseId}`).then((response) => response.data).catch(err => console.error(err));
  }

  deleteSingleExerciseAssignation(assignationId) {
    return this.api.delete(`/${assignationId}`).then((response) => response.data).catch(err => console.error(err));
  }
}

const exerciseAssignationsService = new ExerciseAssignationsService();

export default exerciseAssignationsService;