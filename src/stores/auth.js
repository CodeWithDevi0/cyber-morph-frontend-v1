import { defineStore } from 'pinia';
import { mockApi } from '@/api/mock';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: JSON.parse(localStorage.getItem('user')) || null,
    token: localStorage.getItem('token') || null,
    loading: false,
    error: null,
  }),

  getters: {
    isLoggedIn: (state) => !!state.token,
    isPlayer: (state) => state.user?.role === 'player',
    isEducator: (state) => state.user?.role === 'educator',
    isAdmin: (state) => state.user?.role === 'admin',
    username: (state) => state.user?.username || state.user?.display_name || 'Guest',
    credits: (state) => state.user?.security_credits || 0,
    progress: (state) => state.user?.map_progress || 0,
  },

  actions: {
    async login(email, password) {
      this.loading = true;
      this.error = null;
      try {
        const response = await mockApi.login(email, password);
        this.user = response.user;
        this.token = response.token;
        
        localStorage.setItem('user', JSON.stringify(this.user));
        localStorage.setItem('token', this.token);
        
        return true;
      } catch (err) {
        this.error = "Login failed: " + err.message;
        return false;
      } finally {
        this.loading = false;
      }
    },

    async register(data) {
      this.loading = true;
      this.error = null;
      try {
        const response = await mockApi.register(data);
        // After registration, we usually login or set the user
        this.user = response;
        this.token = "mock-token-after-reg";
        
        localStorage.setItem('user', JSON.stringify(this.user));
        localStorage.setItem('token', this.token);
        
        return true;
      } catch (err) {
        this.error = "Registration failed: " + err.message;
        return false;
      } finally {
        this.loading = false;
      }
    },

    logout() {
      this.user = null;
      this.token = null;
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      // Potential redirect logic here or in component
    }
  }
});
