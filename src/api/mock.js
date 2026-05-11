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
  security_credits: 100,
  last_synced_at: null,
  created_at: new Date().toISOString()
};

// Table 5: web_user_profiles (Admin)
export const mockAdmin = {
  web_profile_id: "w-uuid-002",
  user_id: "u-uuid-003",
  display_name: "System Administrator",
  role: "admin",
  portal_access: true,
  last_login_at: new Date().toISOString(),
  stats: {
    totalUsers: 1254,
    activeSessions: 42,
    threatsDetected: 8,
    systemUptime: "99.9%"
  },
  all_users: [
    { id: 'u1', username: 'NeonSpecter', email: 'neon@cyber.net', role: 'player', status: 'active', joined: '2026-05-01' },
    { id: 'u2', username: 'ByteGhost', email: 'ghost@vault.io', role: 'player', status: 'active', joined: '2026-05-02' },
    { id: 'u3', username: 'LogicBomb', email: 'bomb@dnsc.edu.ph', role: 'educator', status: 'active', joined: '2026-05-03' },
    { id: 'u4', username: 'EchoZero', email: 'echo@void.com', role: 'player', status: 'inactive', joined: '2026-04-28' },
    { id: 'u5', username: 'Aris Thorne', email: 'thorne@dnsc.edu.ph', role: 'educator', status: 'active', joined: '2026-05-05' },
  ],
  pending_approvals: [
    { id: 'p1', displayName: 'Dr. Aris Thorne', email: 'thorne@dnsc.edu.ph', appliedAt: '2 hours ago' },
    { id: 'p2', displayName: 'Sarah Connor', email: 'sarah@skynet.com', appliedAt: '5 hours ago' },
  ]
};

export const mockToken = "mock_jwt_token_cybermorph_v1";

export const mockSessions = [
  { 
    session_id: "sess-001", 
    map_name: "Home",
    duration_seconds: 320, 
    credits_earned: 450,
    credits_lost: 25, 
    false_positives: 0,
    result: "win", 
    is_synced: true,
    played_at: "2026-05-07T10:30:00Z" 
  },
  { 
    session_id: "sess-002", 
    map_name: "Internet Cafe",
    duration_seconds: 410, 
    credits_earned: 600,
    credits_lost: 120, 
    false_positives: 2,
    result: "win", 
    is_synced: true,
    played_at: "2026-05-07T14:20:00Z" 
  },
  { 
    session_id: "sess-003", 
    map_name: "Office",
    duration_seconds: 150, 
    credits_earned: 50,
    credits_lost: 300, 
    false_positives: 4,
    result: "lose", 
    is_synced: false,
    played_at: "2026-05-08T09:15:00Z" 
  }
];

export const mockLeaderboard = [
  { score_id: "s1", username: "NeoViper", total_score: 2850, map_name: "Home", recorded_at: "2026-05-01T12:00:00Z" },
  { score_id: "s2", username: "ByteGhost", total_score: 2720, map_name: "Home", recorded_at: "2026-05-02T15:30:00Z" },
  { score_id: "s3", username: "CyberMorphDemo", total_score: 2450, map_name: "Home", recorded_at: "2026-05-07T10:30:00Z" },
  { score_id: "s4", username: "GlitchHunter", total_score: 2100, map_name: "Home", recorded_at: "2026-04-28T09:00:00Z" },
  { score_id: "s5", username: "LogicBomb", total_score: 3100, map_name: "Internet Cafe", recorded_at: "2026-05-03T11:00:00Z" },
  { score_id: "s6", username: "NeoViper", total_score: 2900, map_name: "Internet Cafe", recorded_at: "2026-05-04T16:00:00Z" },
  { score_id: "s7", username: "PixelPioneer", total_score: 1800, map_name: "Office", recorded_at: "2026-05-05T10:00:00Z" },
];

export const mockEducator = {
  web_profile_id: "edu-001",
  display_name: "Dr. Aris Thorne",
  role: "educator",
  portal_access: true,
  last_login_at: "2026-05-08T08:00:00Z",
  assigned_students: [
    { username: "PlayerOne", map_progress: 2, security_credits: 1540, last_synced_at: "2026-05-07T12:00:00Z" },
    { username: "CyberGhost", map_progress: 1, security_credits: 1100, last_synced_at: "2026-05-06T15:00:00Z" },
    { username: "NeonViper", map_progress: 3, security_credits: 2200, last_synced_at: "2026-05-08T09:00:00Z" },
  ]
};

export const mockClassroomCodes = [
  { code_id: "c1", code_value: "MORPH9", is_active: true, students_count: 2, created_at: "2026-05-01T10:00:00Z" },
  { code_id: "c2", code_value: "CYBER2", is_active: false, students_count: 1, created_at: "2024-12-15T10:00:00Z" },
];

export const mockThreats = [
  { id: 1, name: "Rogue Software", description: "Malicious applications disguised as legitimate tools.", icon: "box", unlocked: true },
  { id: 2, name: "Password Attacks", description: "Brute force and credential stuffing attempts.", icon: "key", unlocked: true },
  { id: 3, name: "Phishing", description: "Deceptive messages designed to steal sensitive data.", icon: "mail", unlocked: true },
  { id: 4, name: "Malvertising", description: "Malicious code injected into online advertisements.", icon: "layout", unlocked: false },
  { id: 5, name: "Malware", description: "Broad category of intrusive and harmful software.", icon: "shield-alert", unlocked: false },
  { id: 6, name: "Man-in-the-Middle", description: "Interception of communication between two parties.", icon: "users", unlocked: false },
  { id: 7, name: "DDoS", description: "Overwhelming a target with a flood of internet traffic.", icon: "zap", unlocked: false },
  { id: 8, name: "Drive-By Download", description: "Unintentional download of malicious code.", icon: "download", unlocked: false },
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
    name: 'Office', 
    slug: 'office',
    description: 'Identify phishing attempts, secure your workstation, and protect organizational data privacy.', 
    difficulty: 'Novice',
    credits_reward: 600
  },
  { 
    id: 2, 
    name: 'Internet Cafe', 
    slug: 'internet-cafe',
    description: 'Learn the dangers of shared terminals, public Wi-Fi safety, and session hijacking prevention.', 
    difficulty: 'Intermediate',
    credits_reward: 750
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
