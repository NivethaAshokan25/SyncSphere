import axios from 'axios';
import { API_BASE_URL } from '../constants';
import DOMPurify from 'dompurify';

/**
 * Enterprise API Client with interceptors and sanitization
 */
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Request Interceptor: Add Auth Tokens (scaffold) and sanitize inputs
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('sync_auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Sanitize any string fields in the request body (Security: Input Sanitization)
    if (config.data && typeof config.data === 'object') {
      Object.keys(config.data).forEach(key => {
        if (typeof config.data[key] === 'string') {
          config.data[key] = DOMPurify.sanitize(config.data[key]);
        }
      });
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: Centralized error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Audit Comment: Centralized error handling prevents sensitive info leakage
    const message = error.response?.data?.error || 'A secure communication error occurred';
    console.error(`[API ERROR] ${message}`);
    
    if (error.response?.status === 401) {
      // Handle unauthorized (e.g., redirect to login)
      window.dispatchEvent(new CustomEvent('auth-unauthorized'));
    }

    return Promise.reject(new Error(message));
  }
);

export const apiService = {
  getStats: () => apiClient.get('/stats').then(res => res.data),
  getTasks: () => apiClient.get('/tasks').then(res => res.data),
  parseMeeting: (transcript: string) => apiClient.post('/ai/parse-meeting', { transcript }).then(res => res.data),
  getStandup: () => apiClient.get('/ai/standup').then(res => res.data),
  getUsers: () => apiClient.get('/users').then(res => res.data),
};

export default apiClient;
