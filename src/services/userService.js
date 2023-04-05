import axios from 'axios';

class UserService {
  constructor() {
    this.api = axios.create({
      baseURL: `${process.env.REACT_APP_BACKEND_URL}/api/v1/user`
    });

    this.api.interceptors.request.use(config => {
      const storedToken = localStorage.getItem('authToken');
      if (storedToken) {
        config.headers = { Authorization: `Bearer ${storedToken}` };
      }
      return config;
    });
  }

  getUserData() {
    return this.api.get('/').then(({ data }) => data).catch(err => console.error(err));
  }

  getSearchUser(query) {
    return this.api.get(`/search?userEmail=${query}`).then(({ data }) => data).catch(err => console.error(err));
  }

  editUserData(body) {
    return this.api.put('/', body).then(({ data }) => data).catch(err => console.error(err));
  }

  deleteUserData() {
    return this.api.delete('/').then((response) => response.data).catch(err => console.error(err));
  }
}

const userService = new UserService();

export default userService;
