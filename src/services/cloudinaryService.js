import axios from 'axios';

class CloudinaryService {
  constructor() {
    this.api = axios.create({
      baseURL: `${process.env.REACT_APP_BACKEND_URL}/cloudinary`
    });

    this.api.interceptors.request.use(config => {
      const storedToken = localStorage.getItem('authToken');
      if (storedToken) {
        config.headers = { Authorization: `Bearer ${storedToken}` };
      }
      return config;
    });
  }

  uploadPhoto(image, config) {
    return this.api.post('/uploadPhoto', image, config).then((response) => response.data).catch(err => console.error(err));
  }

  getSignature() {
    return this.api.get('/signature').then((response) => response.data).catch(err => console.error(err));
  }
}

const cloudinaryService = new CloudinaryService();

export default cloudinaryService;