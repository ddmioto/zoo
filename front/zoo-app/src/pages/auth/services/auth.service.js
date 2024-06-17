// src/services/auth.service.js

import axios from 'axios';

const API_URL = 'http://localhost:8080/api/auth'; // Substitua pela URL do seu backend

class AuthService {
  async login(username, password) {
    try {
      const response = await axios.post(`${API_URL}/signin`, {
        username,
        password
      });
      
      if (response.data.accessToken) {
        localStorage.setItem('user', JSON.stringify(response.data));
      }
      
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }

  logout() {
    localStorage.removeItem('user');
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));
  }
}

export default new AuthService();
