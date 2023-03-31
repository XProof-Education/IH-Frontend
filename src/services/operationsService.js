import axios from 'axios';

class OperationsService {
  constructor() {
    this.api = axios.create({
      baseURL: `${process.env.REACT_APP_BACKEND_URL}/api/v1/operations`
    });

    this.api.interceptors.request.use(config => {
      const storedToken = localStorage.getItem('authToken');
      if (storedToken) {
        config.headers = { Authorization: `Bearer ${storedToken}` };
      }
      return config;
    });
  }

  getAllOperations() {
    return this.api.get('/').then(({ data }) => data).catch(err => console.error(err));
  }

  getOneOperation(operationId) {
    return this.api.get(`/${operationId}`).then(({ data }) => data).catch(err => console.error(err));
  }

  newOperation(body) {
    return this.api.post('/', body).then(({ data }) => data).catch(err => console.error(err));
  }

  deleteOperation(operationId) {
    return this.api.delete(`/${operationId}`).then((response) => response.data).catch(err => console.error(err));
  }
}

const operationsService = new OperationsService();

export default operationsService;