import api from './axios';

export const usersAPI = {
  getAll: () => api.get('/users'),
  getById: (id) => api.get(`/users/${id}`),
  update: (id, data) => api.put(`/users/${id}`, { user: data }),
  delete: (id) => api.delete(`/users/${id}`),
  ban: (id) => api.post(`/users/${id}/ban`),
  unban: (id) => api.post(`/users/${id}/unban`),
};
