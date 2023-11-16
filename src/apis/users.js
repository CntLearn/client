import customAxios from './api';
import axios       from 'axios'

const baseUrl = 'http://localhost:3000/api';

const registerUser = (user) => {
  return axios.post(`${ baseUrl }/users`, user)
}

const login = (user) => {
  return axios.post(`${ baseUrl }/users/login`, user);
}

const fetchAll = () => {
  return customAxios.get('/users')
}

export {
  registerUser,
  login,
  fetchAll
}