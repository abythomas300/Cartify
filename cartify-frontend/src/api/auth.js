// src/api/auth.js
import API from './axios';

// register: expects { username, email, password }
export async function register(data) {
  const res = await API.post('/auth/register', data);
  // backend might return created user and token in different shapes.
  // return entire response data so components can handle it.
  return res.data;
}

// login: expects { email, password }
export async function login(data) {
  const res = await API.post('/auth/login', data);
  return res.data;
}
