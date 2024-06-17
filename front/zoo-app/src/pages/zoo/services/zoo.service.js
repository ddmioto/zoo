import axios from 'axios';

const API_URL = 'http://localhost:8080/zoo';

class ZooService {
  async fetchZoosFromAPI(token) {
    try {
      const response = await axios.get(`${API_URL}/all`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const zoos = response.data;
      
      localStorage.setItem('zoos', JSON.stringify(zoos));
      
      return zoos;
    } catch (error) {
      throw new Error('Erro ao buscar zoos: ' + error.message);
    }
  }
}

export default new ZooService();
