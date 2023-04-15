import axios from 'axios';

class ContactService {
  constructor() {
    this.api = axios.create({
      baseURL: `${process.env.REACT_APP_BACKEND_URL}/api/v1/contact`
    });

    this.api.interceptors.request.use(config => {
      const storedToken = localStorage.getItem('authToken');
      if (storedToken) {
        config.headers = { Authorization: `Bearer ${storedToken}` };
      }
      return config;
    });
  }

  contact(body) {
    return this.api.post('/', body).then(({ data }) => data).catch(err => console.error(err));
  }
}

const contactService = new ContactService();

export default contactService;