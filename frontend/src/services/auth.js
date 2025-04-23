import api from './api';

export const authApi = {
  login: async (email, password) => {
    const response = await api.post('/token/', {
      username: email,
      password
    });
    if (response.data.access) {
      localStorage.setItem('token', response.data.access);
      localStorage.setItem('refresh_token', response.data.refresh);
    }
    return response.data;
  },

  register: async (userData) => {
    const { email, username, password, password2, first_name, last_name } = userData;
    const response = await api.post('/users/', {
      email,
      username: email,  // Use email as username for consistency
      password,
      password2,
      first_name,
      last_name
    });
    if (response.data.access) {
      localStorage.setItem('token', response.data.access);
      localStorage.setItem('refresh_token', response.data.refresh);
    }
    return response.data;
  },

  refreshToken: async () => {
    const refreshToken = localStorage.getItem('refresh_token');
    if (!refreshToken) {
      throw new Error('No refresh token found');
    }
    const response = await api.post('/token/refresh/', { refresh: refreshToken });
    if (response.data.access) {
      localStorage.setItem('token', response.data.access);
    }
    return response.data;
  },

  getCurrentUser: async () => {
    const response = await api.get('/users/me/');
    return response.data;
  },

  updateProfile: async (data) => {
    const response = await api.put('/users/me/update/', data);
    return response.data;
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('refresh_token');
  },

  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  },
};
