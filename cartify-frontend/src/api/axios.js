// src/api/axios.js
import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api',
  withCredentials: true,
});

// If token exists on load, set default Authorization header
const token = localStorage.getItem('token');
if (token) {
  API.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

// optionally export a helper to update token after login/logout
export function setAPIToken(tokenValue) {
  if (tokenValue) {
    API.defaults.headers.common['Authorization'] = `Bearer ${tokenValue}`;
  } else {
    delete API.defaults.headers.common['Authorization'];
  }
}

export default API;
