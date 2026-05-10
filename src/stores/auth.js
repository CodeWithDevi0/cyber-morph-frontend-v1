import { defineStore } from 'pinia';
import { authApi } from '@/api/auth';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: JSON.parse(localStorage.getItem('user')) || null,
    token: localStorage.getItem('token') || null,
    loading: false,
    error: null,
  }),

  getters: {
    isLoggedIn: (state) => !!state.token,
    isPlayer: (state) => !!state.user && !state.user.web_profile_id,
    isWebUser: (state) => !!state.user && !!state.user.web_profile_id,
    isEducator: (state) => !!state.user && state.user.web_profile_id && !state.user.display_name.includes('Admin'), // Simplistic check, better to have role in profile
    isAdmin: (state) => !!state.user && state.user.display_name?.includes('Admin'),
    username: (state) => state.user?.username || state.user?.display_name || 'Guest',
    credits: (state) => state.user?.security_credits || 0,
    progress: (state) => state.user?.map_progress || 0,
  },

  actions: {
    /**
     * Initial login to get JWT
     */
    async login(email, password) {
      this.loading = true;
      this.error = null;
      try {
        const response = await authApi.login(email, password);
        this.token = response.access_token;
        localStorage.setItem('token', this.token);
        
        // After getting token, fetch the actual profile using the returned role
        await this.fetchProfile(response.role);
        return true;
      } catch (err) {
        this.error = err.response?.data?.detail || "Login failed. Terminal access denied.";
        return false;
      } finally {
        this.loading = false;
      }
    },

    /**
     * Fetch the user's profile based on their role
     */
    async fetchProfile(role = null) {
      try {
        // If we know the role, go directly to the right endpoint
        if (role === 'player') {
          const profile = await authApi.getPlayerProfile();
          this.user = profile;
        } else if (role === 'educator' || role === 'admin' || role) {
          const profile = await authApi.getWebProfile();
          this.user = profile;
        } else {
          // Fallback guessing logic (legacy)
          try {
            const profile = await authApi.getPlayerProfile();
            this.user = profile;
          } catch {
            const profile = await authApi.getWebProfile();
            this.user = profile;
          }
        }
        
        localStorage.setItem('user', JSON.stringify(this.user));
      } catch (err) {
        console.error('[AuthStore] Failed to fetch profile:', err);
        this.logout();
      }
    },

    /**
     * Register a new Educator (Strictly Web Portal)
     */
    async registerEducator(data) {
      this.loading = true;
      this.error = null;
      try {
        await authApi.registerWebUser({ ...data, role: 'educator' });
        // NOTE: We don't log them in automatically because the account is INACTIVE
        // pending Admin approval. We return true so the UI can show a success message.
        return true;
      } catch (err) {
        this.error = err.response?.data?.detail || "Registration failed.";
        return false;
      } finally {
        this.loading = false;
      }
    },

    /**
     * Register a new player (Used internally or by Godot)
     */
    async register(data) {
      this.loading = true;
      this.error = null;
      try {
        await authApi.registerPlayer(data);
        // After registration, log them in automatically
        return await this.login(data.email, data.password);
      } catch (err) {
        this.error = err.response?.data?.detail || "Registration failed.";
        return false;
      } finally {
        this.loading = false;
      }
    },

    /**
     * Clear session
     */
    logout() {
      this.user = null;
      this.token = null;
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    },

    /**
     * Check if session is valid on app start
     */
    async initializeAuth() {
      if (this.token && this.user) {
        // We already have a user in local storage, just refresh it
        await this.fetchProfile(this.user.role || (this.user.username ? 'player' : 'admin'));
      } else if (this.token) {
        await this.fetchProfile();
      }
    }
  }
});
