import client from './client';

/**
 * GAME SESSIONS API
 * ─────────────────
 */

export const sessionsApi = {
  /**
   * Start a new game session
   */
  async startSession(mapName) {
    const { data } = await client.post('/sessions/start', { map_name: mapName });
    return data;
  },

  /**
   * Finalize an existing session
   */
  async endSession(sessionId, sessionData) {
    const { data } = await client.patch(`/sessions/${sessionId}/end`, sessionData);
    return data;
  },

  /**
   * Fetch session history for the current player
   */
  async getHistory() {
    const { data } = await client.get('/sessions/history');
    return data;
  }
};
