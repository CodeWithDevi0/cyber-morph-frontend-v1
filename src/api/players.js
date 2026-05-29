import client from './client'

export const playersApi = {
  /**
   * Fetch the current player's profile
   */
  getMe: async () => {
    const response = await client.get('/players/me')
    return response.data
  },

  /**
   * Fetch the player's threat index (codex)
   */
  getThreatIndex: async () => {
    const response = await client.get('/players/threat-index')
    return response.data
  }
}
