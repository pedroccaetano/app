import axios from 'axios';

const api = axios.create({
  // baseURL: 'https://crawler-nota.azurewebsites.net',
  headers: { 'Content-Type': 'application/json' },
  // baseURL: 'http://192.168.10.115:3000',
  baseURL: 'http://192.168.130.2:3000',
});

export default api;
