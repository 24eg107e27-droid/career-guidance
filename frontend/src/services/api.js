import axios from 'axios';

const API_BASE_URL = '/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Optional: auto-logout on token expiration
      // localStorage.removeItem('token');
    }
    return Promise.reject(error);
  }
);

export const authApi = {
  login: (data) => api.post('/auth/login', data),
  register: (data) => api.post('/auth/register', data),
};

export const profileApi = {
  getProfile: () => api.get('/profile'),
  updateProfile: (data) => api.put('/profile', data),
  getUserSkills: () => api.get('/profile/skills'),
  addUserSkill: (data) => api.post('/profile/skills', data),
  deleteUserSkill: (skillName) => api.delete(`/profile/skills/${encodeURIComponent(skillName)}`),
};

export const skillApi = {
  getAllSkills: () => api.get('/skills'),
};

export const assessmentApi = {
  getTopics: () => api.get('/assessments/topics'),
  getQuestions: (topic) => api.get(`/assessments/questions?topic=${encodeURIComponent(topic)}`),
  submitAssessment: (data) => api.post('/assessments/submit', data),
  getHistory: () => api.get('/assessments/history'),
};

export const careerApi = {
  getAllCareers: () => api.get('/careers'),
  getCareerById: (id) => api.get(`/careers/${id}`),
};

export const recommendationApi = {
  getRecommendations: () => api.get('/recommendations'),
  getGapAnalysis: (careerId) => api.get(`/recommendations/gap-analysis/${careerId}`),
};

export const resourceApi = {
  getAllResources: () => api.get('/resources'),
  getResourcesBySkill: (skill) => api.get(`/resources/by-skill/${encodeURIComponent(skill)}`),
};

export const adminApi = {
  getStats: () => api.get('/admin/stats'),
  getUsers: () => api.get('/admin/users'),
  updateUserRole: (userId, role) => api.put(`/admin/users/${userId}/role?role=${role}`),
  createCareer: (data) => api.post('/admin/careers', data),
  deleteCareer: (id) => api.delete(`/admin/careers/${id}`),
  createSkill: (data) => api.post('/admin/skills', data),
  deleteSkill: (id) => api.delete(`/admin/skills/${id}`),
  getAllQuestions: () => api.get('/admin/assessments'),
  addQuestion: (data) => api.post('/admin/assessments', data),
  deleteQuestion: (id) => api.delete(`/admin/assessments/${id}`),
  addResource: (data) => api.post('/admin/resources', data),
  deleteResource: (id) => api.delete(`/admin/resources/${id}`),
};

export default api;
