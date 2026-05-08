/**
 * CYBER-MORPH MOCK API LAYER
 * ──────────────────────────
 * Strictly aligned with Data Dictionary Tables 4 & 5.
 */

// Table 4: player_profiles
export const mockPlayer = {
  profile_id: "p-uuid-001",
  user_id: "u-uuid-001",
  username: "NeonSpecter",
  role: "player",
  map_progress: 0,
  security_credits: 1000,
  last_synced_at: null,
  created_at: new Date().toISOString()
};

// Table 5: web_user_profiles (Educator)
export const mockEducator = {
  web_profile_id: "w-uuid-001",
  user_id: "u-uuid-002",
  display_name: "Professor Morph",
  role: "educator",
  portal_access: true,
  last_login_at: new Date().toISOString()
};

// Table 5: web_user_profiles (Admin)
export const mockAdmin = {
  web_profile_id: "w-uuid-002",
  user_id: "u-uuid-003",
  display_name: "System Administrator",
  role: "admin",
  portal_access: true,
  last_login_at: new Date().toISOString()
};

export const mockToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.mock_payload";

export const mockSessions = [
  {
    session_id: "s-uuid-001",
    profile_id: "p-uuid-001",
    map_name: "Home",
    duration_seconds: 450,
    credits_earned: 300,
    credits_lost: 50,
    result: "win",
    played_at: new Date().toISOString()
  },
  {
    session_id: "s-uuid-002",
    profile_id: "p-uuid-001",
    map_name: "School",
    duration_seconds: 600,
    credits_earned: 0,
    credits_lost: 200,
    result: "loss",
    played_at: new Date(Date.now() - 86400000).toISOString()
  }
];

export const mockMaps = [
  { 
    id: 0, 
    name: 'Home', 
    slug: 'home',
    description: 'Defend your personal space. Master password hygiene, router security, and IoT protection.', 
    difficulty: 'Entry Level',
    credits_reward: 500
  },
  { 
    id: 1, 
    name: 'Internet Cafe', 
    slug: 'internet-cafe',
    description: 'Learn the dangers of shared terminals, public Wi-Fi safety, and session hijacking prevention.', 
    difficulty: 'Intermediate',
    credits_reward: 750
  },
  { 
    id: 2, 
    name: 'Office', 
    slug: 'office',
    description: 'Identify phishing attempts, secure your workstation, and protect organizational data privacy.', 
    difficulty: 'Advanced',
    credits_reward: 1200
  },
  { 
    id: 3, 
    name: 'Public Park', 
    slug: 'public-park',
    description: 'Master physical awareness, secure charging habits, and device privacy in crowded public spaces.', 
    difficulty: 'Specialist',
    credits_reward: 2000
  }
];

export const mockApi = {
  login: async (email, password) => {
    console.log(`[Mock API] Authenticating ${email}...`);
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulate a failure for testing feedback mechanisms
        if (password === 'fail' || password === 'error') {
          return reject(new Error('Invalid access credentials. Terminal access denied.'));
        }

        let userData;
        const e = email.toLowerCase();
        
        if (e.includes('admin')) {
          userData = mockAdmin;
        } else if (e.includes('teacher') || e.includes('educator')) {
          userData = mockEducator;
        } else {
          userData = mockPlayer;
        }

        resolve({
          user: userData,
          token: mockToken
        });
      }, 800);
    });
  },
  
  register: async (data) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ ...mockPlayer, username: data.username });
      }, 800);
    });
  }
};
