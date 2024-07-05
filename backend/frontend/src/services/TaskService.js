import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:8080/api',
  withCredentials: false,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
});

export default {
  getTasks() {
    return apiClient.get('/tasks');
  },
  getTask(id) {
    return apiClient.get('/tasks/' + id);
  },
  createTask(task) {
    return apiClient.post('/tasks', task);
  },
  updateTask(id, task) {
    return apiClient.put('/tasks/' + id, task);
  },
  deleteTask(id) {
    return apiClient.delete('/tasks/' + id);
  }
};
