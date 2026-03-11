import api from './axios';

export const searchAPI = {
  search: (query) => api.get(`/search?q=${encodeURIComponent(query)}`),
};
