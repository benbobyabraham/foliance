import api from './api';

export const authApi = {
  login: async (email, password) => {
    const response = await api.post('/users/login/', { email, password });
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    return response.data;
  },

  register: async (userData) => {
    const response = await api.post('/users/register/', userData);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    return response.data;
  },

  logout: () => {
    localStorage.removeItem('token');
  },

  getCurrentUser: async () => {
    try {
      const response = await api.get('/users/me/');
      return response.data;
    } catch (error) {
      return null;
    }
  },

  updateProfile: async (data) => {
    const response = await api.patch('/users/me/', data);
    return response.data;
  },

  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  },
};
