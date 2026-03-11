import api from './axios';

export const comicsAPI = {
  getAll: (page = 1) => api.get(`/comics?page=${page}`),
  getById: (id) => api.get(`/comics/${id}`),
  create: (data) => api.post('/comics', { comic: data }),
  update: (id, data) => api.put(`/comics/${id}`, { comic: data }),
  delete: (id) => api.delete(`/comics/${id}`),
  
  // Chapters
  getChapters: (comicId) => api.get(`/comics/${comicId}/chapters`),
  getChapter: (comicId, chapterId) => api.get(`/comics/${comicId}/chapters/${chapterId}`),
  
  // Comments
  getComments: (comicId) => api.get(`/comics/${comicId}/comments`),
  addComment: (comicId, content) => api.post(`/comics/${comicId}/comments`, { comment: { content } }),
  
  // Rating
  rateComic: (comicId, score) => api.post('/ratings', { comic_id: comicId, score }),
  
  // Bookmarks
  getBookmarks: () => api.get('/bookmarks'),
  addBookmark: (chapterId, lastPage) => api.post('/bookmarks', { chapter_id: chapterId, last_page: lastPage }),
  
  // Reading History
  getHistory: () => api.get('/reading_histories'),
  updateHistory: (comicId, lastChapterId) => api.post('/reading_histories', { comic_id: comicId, last_chapter_id: lastChapterId }),
};
