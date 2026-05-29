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

/**
 * UNIVERSAL USER REGISTRY
 * Central source of truth for all actors in the system.
 */
export const mockUsers = [
  // Admins (Root Level)
  { id: 'u1', username: 'SystemRoot', full_name: 'Josip Admin', email: 'admin@cybermorph.dev', role: 'admin', status: 'active', joined: '2026-01-15', portal_access: true },
  
  // Educators (Command Instructors)
  { id: 'u2', username: 'AThorne', full_name: 'Dr. Aris Thorne', email: 'thorne@dnsc.edu.ph', role: 'educator', status: 'active', joined: '2026-03-10', portal_access: true },
  { id: 'u3', username: 'SConnor', full_name: 'Sarah Connor', email: 's.connor@cybersec.edu', role: 'educator', status: 'active', joined: '2026-04-02', portal_access: true },
  { id: 'u4', username: 'MAnderson', full_name: 'Mark Anderson', email: 'anderson.m@dnsc.edu.ph', role: 'educator', status: 'pending', joined: '2026-05-12', portal_access: false },

  // Players (Field Operatives)
  { id: 'u5', username: 'NeonSpecter', full_name: 'Kevin Flynn', email: 'k.flynn@grid.com', role: 'player', status: 'active', joined: '2026-05-01', map_progress: 2, security_credits: 1540, last_synced_at: "2026-05-07T12:00:00Z", classroom_code: "MORPH9" },
  { id: 'u6', username: 'ByteGhost', full_name: 'Jia Chen', email: 'j.chen@vault.io', role: 'player', status: 'active', joined: '2026-05-02', map_progress: 1, security_credits: 1100, last_synced_at: "2026-05-06T15:00:00Z", classroom_code: "MORPH9" },
  { id: 'u7', username: 'EchoZero', full_name: 'Elena Rossi', email: 'e.rossi@void.com', role: 'player', status: 'inactive', joined: '2026-04-28', map_progress: 0, security_credits: 100, last_synced_at: null, classroom_code: "CYBER2" },
  { id: 'u8', username: 'NeonViper', full_name: 'Marcus Wright', email: 'm.wright@resistance.net', role: 'player', status: 'active', joined: '2026-05-06', map_progress: 3, security_credits: 2200, last_synced_at: "2026-05-08T09:00:00Z", classroom_code: "CYBER2" },
  { id: 'u9', username: 'PixelPioneer', full_name: 'Hiroshi Sato', email: 'hiro.sato@tech.jp', role: 'player', status: 'active', joined: '2026-05-09', map_progress: 1, security_credits: 850, last_synced_at: "2026-05-10T14:20:00Z", classroom_code: "MORPH9" },
  { id: 'u10', username: 'LogicBomb', full_name: 'Samantha Reed', email: 's.reed@dnsc.edu.ph', role: 'player', status: 'suspended', joined: '2026-05-03', map_progress: 2, security_credits: 0, last_synced_at: "2026-05-04T08:15:00Z", classroom_code: "CYBER2" },
  { id: 'u11', username: 'DataSurge', full_name: 'Ahmed Hassan', email: 'ahmed.h@globalsec.org', role: 'player', status: 'active', joined: '2026-05-11', map_progress: 0, security_credits: 500, last_synced_at: "2026-05-12T10:00:00Z", classroom_code: "MORPH9" },
];

export const mockGlobalAnalytics = {
  threatFailRates: [
    { id: 1, name: 'Phishing', failureRate: 65, avgResponseTime: '4.2s', status: 'critical' },
    { id: 2, name: 'Password Attacks', failureRate: 38, avgResponseTime: '2.8s', status: 'stable' },
    { id: 3, name: 'Rogue Software', failureRate: 22, avgResponseTime: '5.1s', status: 'improving' },
    { id: 4, name: 'DDoS', failureRate: 78, avgResponseTime: '1.5s', status: 'critical' },
    { id: 5, name: 'Man-in-the-Middle', failureRate: 54, avgResponseTime: '6.3s', status: 'stable' },
    { id: 6, name: 'Malvertising', failureRate: 41, avgResponseTime: '3.9s', status: 'stable' },
  ],
  mapPerformance: [
    { name: 'Home', completionRate: 92, avgScore: 1850, difficultyRating: 2.1 },
    { name: 'Office', completionRate: 74, avgScore: 1240, difficultyRating: 4.5 },
    { name: 'Internet Cafe', completionRate: 48, avgScore: 920, difficultyRating: 7.2 },
    { name: 'Public Park', completionRate: 15, avgScore: 450, difficultyRating: 9.8 },
  ],
  liveSimulations: [
    { id: 's1', user: 'NeonSpecter', map: 'Office', timeElapsed: '3:45', health: 85, status: 'active' },
    { id: 's2', user: 'ByteGhost', map: 'Home', timeElapsed: '1:20', health: 100, status: 'active' },
    { id: 's3', user: 'EchoZero', map: 'Internet Cafe', timeElapsed: '5:10', health: 40, status: 'warning' },
    { id: 's4', user: 'NeonViper', map: 'Public Park', timeElapsed: '2:30', health: 15, status: 'critical' },
  ]
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
    totalUsers: mockUsers.length,
    activeSessions: 42,
    threatsDetected: 8,
    systemUptime: "99.9%"
  },
  all_users: [...mockUsers],
  analytics: mockGlobalAnalytics,
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
  { score_id: "s5", username: "LogicBomb", total_score: 3500, map_name: "Internet Cafe", recorded_at: "2026-05-03T11:00:00Z" },
  { score_id: "s6", username: "SignalLost", total_score: 2900, map_name: "Internet Cafe", recorded_at: "2026-05-04T16:00:00Z" },
  { score_id: "s7", username: "PixelPioneer", total_score: 4200, map_name: "Office", recorded_at: "2026-05-05T10:00:00Z" },
  { score_id: "s8", username: "VoidWalker", total_score: 3800, map_name: "Office", recorded_at: "2026-05-06T11:00:00Z" },
  { score_id: "s9", username: "RootUser", total_score: 5100, map_name: "Public Park", recorded_at: "2026-05-08T14:00:00Z" },
  { score_id: "s10", username: "CyberGhost", total_score: 4800, map_name: "Public Park", recorded_at: "2026-05-09T09:00:00Z" },
  { score_id: "s11", username: "DataSurge", total_score: 3100, map_name: "Office", recorded_at: "2026-05-09T15:00:00Z" },
  { score_id: "s12", username: "EchoZero", total_score: 1500, map_name: "Home", recorded_at: "2026-05-10T10:00:00Z" },
];

export const mockEducator = {
  web_profile_id: "edu-001",
  display_name: "Dr. Aris Thorne",
  role: "educator",
  portal_access: true,
  last_login_at: "2026-05-08T08:00:00Z",
  assigned_students: mockUsers.filter(user => user.role === 'player' && user.classroom_code)
};

export const mockClassroomCodes = [
  { code_id: "c1", code_value: "MORPH9", name: "Cyber Defense 101", description: "Introductory course focusing on basic password hygiene and phishing awareness.", is_active: true, students_count: 2, created_at: "2026-05-01T10:00:00Z" },
  { code_id: "c2", code_value: "CYBER2", name: "Network Security Alpha", description: "Advanced session covering network protocols, firewall management, and intrusion detection.", is_active: false, students_count: 1, created_at: "2024-12-15T10:00:00Z" },
];

export const mockClassAnalytics = {
  threatFailRates: [
    { name: 'Phishing', rate: 68, trend: 'up' },
    { name: 'Password Attacks', rate: 42, trend: 'down' },
    { name: 'Rogue Software', rate: 15, trend: 'stable' },
    { name: 'DDoS', rate: 85, trend: 'up' },
  ],
  weeklyHealth: [65, 72, 68, 74, 80, 78, 85], // Security credits avg % over 7 days
  topOperators: [
    { username: 'NeonViper', score: 2200, rank: 1 },
    { username: 'PlayerOne', score: 1540, rank: 2 },
    { username: 'CyberGhost', score: 1100, rank: 3 },
  ]
};

export const mockStudentDetails = {
  username: "NeonViper",
  rank: "Elite Operative",
  sessions: [
    { map: "Office", result: "win", credits: 600, duration: "5:10", date: "2026-05-08" },
    { map: "Office", result: "lose", credits: -150, duration: "2:30", date: "2026-05-07" },
    { map: "Home", result: "win", credits: 450, duration: "4:20", date: "2026-05-06" },
  ],
  threatsUnlocked: ["Phishing", "Password Attacks", "Rogue Software"],
  weaknesses: ["Social Engineering", "Network Traffic Analysis"]
};

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
