import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Portfolio endpoints
export const portfolioApi = {
  getResume: () => api.get('/portfolio/resume/'),
  updateResume: (data) => api.patch('/portfolio/resume/', data),
  createResume: (data) => api.post('/portfolio/resume/', data),
  
  getExperiences: () => api.get('/portfolio/experience/'),
  createExperience: (data) => api.post('/portfolio/experience/', data),
  updateExperience: (id, data) => api.patch(`/portfolio/experience/${id}/`, data),
  deleteExperience: (id) => api.delete(`/portfolio/experience/${id}/`),
  
  getEducation: () => api.get('/portfolio/education/'),
  createEducation: (data) => api.post('/portfolio/education/', data),
  updateEducation: (id, data) => api.patch(`/portfolio/education/${id}/`, data),
  deleteEducation: (id) => api.delete(`/portfolio/education/${id}/`),
  
  getSkills: () => api.get('/portfolio/skills/'),
  createSkill: (data) => api.post('/portfolio/skills/', data),
  updateSkill: (id, data) => api.patch(`/portfolio/skills/${id}/`, data),
  deleteSkill: (id) => api.delete(`/portfolio/skills/${id}/`),
};

// Blog endpoints
export const blogApi = {
  getPosts: () => api.get('/blog/posts/'),
  getPost: (id) => api.get(`/blog/posts/${id}/`),
  createPost: (data) => api.post('/blog/posts/', data),
  updatePost: (id, data) => api.patch(`/blog/posts/${id}/`, data),
  deletePost: (id) => api.delete(`/blog/posts/${id}/`),
};

// Artifacts endpoints
export const artifactsApi = {
  uploadFile: (file) => {
    const formData = new FormData();
    formData.append('file', file);
    return api.post('/artifacts/upload/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
  getFiles: () => api.get('/artifacts/list/'),
  deleteFile: (id) => api.delete(`/artifacts/${id}/`),
};

export default api;
