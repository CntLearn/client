import Axios from 'axios';

const axios = Axios.create({
  // baseURL: process.env.BASE_URL
  baseURL: 'http://localhost:3000/api'
})


axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers['accessToken'] = `Bearer ${ token }`;
    }
    return config
  },
  (error) => {
    Promise.reject((error))
  }
)


export default axios;