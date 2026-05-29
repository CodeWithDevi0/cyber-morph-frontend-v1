import axios from 'axios';

/**
 * CYBER-MORPH API CLIENT
 * ──────────────────────
 * Centralized Axios instance with automatic JWT handling.
 */

const client = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000',
  headers: {
    'Content-Type': 'application/json',
  },
});

// REQUEST INTERCEPTOR: Attach Token
client.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// RESPONSE INTERCEPTOR: Handle 401 & 403
client.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const { status } = error.response;
      
      if (status === 401) {
        // Token expired or invalid
        console.warn('[API] Unauthorized access - clearing session');
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        
        // Redirect if not on login page
        if (!window.location.pathname.includes('/login')) {
          window.location.href = '/login?expired=true';
        }
      }
      
      if (status === 403) {
        console.error('[API] Permission denied');
      }
    }
    
    return Promise.reject(error);
  }
);

export default client;
