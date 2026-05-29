import client from './client';

/**
 * AUTHENTICATION API
 * ──────────────────
 */

export const authApi = {
  /**
   * Log in a user (Player, Educator, or Admin)
   */
  async login(email, password) {
    const { data } = await client.post('/auth/login', { email, password });
    return data;
  },

  /**
   * Register a new player
   */
  async registerPlayer(userData) {
    const { data } = await client.post('/auth/register', userData);
    return data;
  },

  /**
   * Register a new web user (Educator/Admin)
   */
  async registerWebUser(userData) {
    const { data } = await client.post('/auth/register-web', userData);
    return data;
  },

  /**
   * Get the current player's profile
   */
  async getPlayerProfile() {
    const { data } = await client.get('/players/me');
    return data;
  },

  /**
   * Get the current web user's profile
   */
  async getWebProfile() {
    const { data } = await client.get('/web-users/me');
    return data;
  }
};
