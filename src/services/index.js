import axios from 'axios';

const api = axios.create({
  headers: { 'Content-Type': 'application/json' },
  baseURL: 'http://192.168.130.2:3000',
  // baseURL: 'https://server-tcc.herokuapp.com',
});

export default api;
