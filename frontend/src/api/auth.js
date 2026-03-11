import api from './axios';

export const authAPI = {
  register: (data) => api.post('/register', { user: data }),
  login: (data) => api.post('/login', data),
  getMe: () => api.get('/me'),
};
