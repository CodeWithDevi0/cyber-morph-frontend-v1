<script setup>
import { ref, onMounted } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { useRoute, useRouter } from 'vue-router';
import { mockAdmin } from '@/api/mock';

const auth = useAuthStore();
const route = useRoute();
const router = useRouter();
const activeTab = ref('overview'); // overview, users, pending

const notification = ref({
  show: false,
  title: '',
  message: '',
  type: 'success' // success, alert
});

const triggerNotification = (title, message, type = 'success') => {
  notification.value = { show: true, title, message, type };
  setTimeout(() => {
    notification.value.show = false;
  }, 3000);
};

const systemStats = ref({
  totalUsers: 1542,
  activeSessions: 86,
  databaseHealth: '99.9%',
  globalCredits: '1.2M'
});

const allUsers = ref([
  { id: 'u1', username: 'NeonSpecter', email: 'player@test.com', role: 'player', status: 'active', joined: '2026-05-01', lastLogin: '2 mins ago' },
  { id: 'u2', username: 'Aris Thorne', email: 'teacher@test.com', role: 'educator', status: 'active', joined: '2026-04-15', lastLogin: '1 hour ago' },
  { id: 'u3', username: 'System Root', email: 'admin@test.com', role: 'admin', status: 'active', joined: '2026-01-01', lastLogin: 'Now' },
  { id: 'u4', username: 'GhostByte', email: 'ghost@test.com', role: 'player', status: 'suspended', joined: '2026-05-05', lastLogin: '3 days ago' },
  { id: 'u5', username: 'CyberWitch', email: 'witch@test.com', role: 'player', status: 'active', joined: '2026-05-08', lastLogin: '10 mins ago' },
  { id: 'u6', username: 'EchoZero', email: 'echo@test.com', role: 'educator', status: 'active', joined: '2026-03-20', lastLogin: '5 hours ago' },
]);

const pendingApprovals = ref([
  { id: 'p1', displayName: 'Prof. Julian Vane', email: 'vane@dnsc.edu.ph', role: 'educator', requestedAt: '2026-05-10 14:30', institution: 'DNSC - IT Dept' },
  { id: 'p2', displayName: 'Sarah Jenkins', email: 'jenkins.s@edu.ph', role: 'educator', requestedAt: '2026-05-11 09:15', institution: 'Cyber Academy' },
  { id: 'p3', displayName: 'Robert Chen', email: 'bobby.c@tech.edu', role: 'educator', requestedAt: '2026-05-11 11:45', institution: 'Global Tech Institute' },
]);

const auditLogs = ref([
  { id: 1, action: 'LOGIN_SUCCESS', user: 'NeonSpecter', timestamp: '2 mins ago', status: 'success' },
  { id: 2, action: 'ROLE_UPDATE', user: 'System Root', timestamp: '15 mins ago', status: 'warning' },
  { id: 3, action: 'REGISTRATION', user: 'LogicBomb', timestamp: '1 hour ago', status: 'success' },
  { id: 4, action: 'SESSION_TERMINATED', user: 'GhostByte', timestamp: '2 hours ago', status: 'alert' },
]);

onMounted(() => {
  if (route.query.login === 'success') {
    router.replace({ query: {} });
    setTimeout(() => {
      triggerNotification('Secure Link Established', 'Root Terminal Authorized', 'success');
    }, 500);
  }
});

const getStatusColor = (status) => {
  switch (status) {
    case 'success': return 'text-pixel-moss';
    case 'warning': return 'text-signal-gold';
    case 'alert': return 'text-byte-coral';
    default: return 'text-pixel-plum/40';
  }
};

const handleApprove = (id) => {
  const user = pendingApprovals.value.find(p => p.id === id);
  if (user) {
    pendingApprovals.value = pendingApprovals.value.filter(p => p.id !== id);
    triggerNotification('Protocol Authorized', `Educator ${user.displayName} has been activated.`, 'success');
  }
};

const handleDeny = (id) => {
  const user = pendingApprovals.value.find(p => p.id === id);
  if (user) {
    pendingApprovals.value = pendingApprovals.value.filter(p => p.id !== id);
    triggerNotification('Access Revoked', `Registration for ${user.displayName} was denied.`, 'alert');
  }
};
</script>

<template>
  <div class="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 text-pixel-plum pb-12">
    <!-- Operational Toast Notification -->
    <transition
      enter-active-class="transition duration-500 ease-out"
      enter-from-class="transform translate-y-20 opacity-0"
      enter-to-class="transform translate-y-0 opacity-100"
      leave-active-class="transition duration-300 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div v-if="notification.show" class="fixed bottom-8 right-8 z-100 flex items-center gap-4 p-4 rounded-lg shadow-pixel-hero border border-white/20"
        :class="notification.type === 'success' ? 'bg-pixel-plum' : 'bg-byte-coral'"
      >
        <div class="w-10 h-10 bg-white/20 rounded flex items-center justify-center text-white">
          <svg v-if="notification.type === 'success'" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/></svg>
          <svg v-else xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
        </div>
        <div>
          <p class="text-pixel-10 font-black text-white/70 uppercase tracking-widest leading-none mb-1.5">{{ notification.title }}</p>
          <p class="text-sm font-black text-white font-display uppercase tracking-tight">{{ notification.message }}</p>
        </div>
      </div>
    </transition>

    <!-- System Header -->
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b-2 border-pixel-plum/10 pb-6">
      <div>
        <div class="flex items-center gap-3 mb-1">
          <div class="w-2 h-2 rounded-full bg-pixel-violet animate-pulse"></div>
          <h1 class="text-3xl font-black font-display tracking-tight text-pixel-plum uppercase">
            System Oversight
          </h1>
        </div>
        <p class="text-pixel-10 text-pixel-plum/50 uppercase font-black tracking-[0.2em] flex items-center gap-2">
          Identity: <span class="text-pixel-violet">{{ auth.user?.display_name || mockAdmin.display_name }}</span> 
          <span class="mx-1 opacity-30">|</span> 
          Access Level: <span class="text-byte-coral">Root Terminal</span>
          <span class="mx-1 opacity-30">|</span> 
          Node: CM-ROOT-01
        </p>
      </div>

      <div class="flex items-center gap-6 bg-pixel-plum/5 p-4 rounded-lg border border-pixel-plum/5">
        <div class="text-right border-r border-pixel-plum/10 pr-6">
          <p class="text-pixel-10 font-black text-pixel-plum/40 uppercase tracking-widest">DB Integrity</p>
          <p class="text-xl font-black text-pixel-moss">{{ systemStats.databaseHealth }}</p>
        </div>
        <div class="text-right">
          <p class="text-pixel-10 font-black text-pixel-plum/40 uppercase tracking-widest">Global Credits</p>
          <p class="text-xl font-black text-pixel-violet">{{ systemStats.globalCredits }}</p>
        </div>
      </div>
    </div>

    <!-- Administrative Navigation -->
    <div class="flex items-center gap-2 border-b border-pixel-plum/5">
      <button 
        @click="activeTab = 'overview'"
        :class="[
          'px-6 py-3 text-xs font-black uppercase tracking-[0.15em] transition-all relative',
          activeTab === 'overview' ? 'text-pixel-plum border-b-2 border-pixel-plum' : 'text-pixel-plum/30 hover:text-pixel-plum/60'
        ]"
      >
        Overview
      </button>
      <button 
        @click="activeTab = 'users'"
        :class="[
          'px-6 py-3 text-xs font-black uppercase tracking-[0.15em] transition-all relative',
          activeTab === 'users' ? 'text-pixel-plum border-b-2 border-pixel-plum' : 'text-pixel-plum/30 hover:text-pixel-plum/60'
        ]"
      >
        User Registry
      </button>
      <button 
        @click="activeTab = 'pending'"
        :class="[
          'px-6 py-3 text-xs font-black uppercase tracking-[0.15em] transition-all relative flex items-center gap-2',
          activeTab === 'pending' ? 'text-pixel-plum border-b-2 border-pixel-plum' : 'text-pixel-plum/30 hover:text-pixel-plum/60'
        ]"
      >
        <span>Authorization Queue</span>
        <span v-if="pendingApprovals.length > 0" class="w-2 h-2 rounded-full bg-byte-coral animate-pulse"></span>
      </button>
    </div>

    <!-- TAB: OVERVIEW -->
    <div v-if="activeTab === 'overview'" class="space-y-8 animate-in fade-in duration-500">
      <!-- Operational Metrics -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div class="pixel-card bg-pixel-plum text-white shadow-pixel-hero border-none">
          <p class="text-pixel-10 uppercase font-black text-white/40 tracking-widest mb-2 ml-1">Network Identity Count</p>
          <p class="text-3xl font-black">{{ systemStats.totalUsers }}</p>
        </div>
        <div class="pixel-card border-l-4 border-l-pixel-violet">
          <p class="stat-label-pixel">Active Game Sessions</p>
          <p class="text-3xl font-black text-pixel-plum">{{ systemStats.activeSessions }}</p>
        </div>
        <div class="pixel-card border-l-4 border-l-byte-coral">
          <p class="stat-label-pixel">Security Breaches</p>
          <p class="text-3xl font-black text-byte-coral">0</p>
        </div>
        <div class="pixel-card border-l-4 border-l-pixel-moss">
          <p class="stat-label-pixel">System Uptime</p>
          <p class="text-3xl font-black text-pixel-moss">14d 2h</p>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-8">
        <!-- Dashboard Snapshot -->
        <div class="space-y-6">
          <div class="pixel-card">
            <h3 class="text-xs font-black tracking-widest text-pixel-plum/80 uppercase mb-8 flex items-center gap-2 font-display">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"/><path d="M3 5v14a2 2 0 0 0 2 2h16v-5"/><path d="M18 12a2 2 0 0 0 0 4h4v-4Z"/></svg>
              Recent System Activity
            </h3>
            <div class="space-y-4">
              <div v-for="user in allUsers.slice(0, 3)" :key="user.id" class="flex items-center justify-between p-4 bg-pixel-plum/5 rounded-lg border border-pixel-plum/5">
                <div class="flex items-center gap-4">
                  <div class="w-10 h-10 rounded bg-pixel-violet/10 flex items-center justify-center text-pixel-violet font-black text-sm">
                    {{ user.username.charAt(0) }}
                  </div>
                  <div>
                    <p class="text-sm font-black text-pixel-plum uppercase">{{ user.username }}</p>
                    <p class="text-pixel-10 font-bold text-pixel-plum/40 uppercase tracking-tighter">{{ user.role }} • {{ user.lastLogin }}</p>
                  </div>
                </div>
                <div class="text-right">
                  <span class="text-pixel-10 font-black uppercase px-2 py-0.5 rounded bg-pixel-moss/10 text-pixel-moss">Active</span>
                </div>
              </div>
            </div>
            <button @click="activeTab = 'users'" class="w-full mt-6 py-3 bg-pixel-plum/5 rounded text-xs font-black uppercase text-pixel-plum/60 hover:bg-pixel-plum/10 transition-all tracking-[0.2em]">
              Access User Registry
            </button>
          </div>
        </div>

        <!-- Audit Stream -->
        <div class="space-y-6">
          <div class="pixel-card bg-pixel-plum/5 border-pixel-plum/10 border-t-4 border-t-pixel-plum">
            <h3 class="text-xs font-black tracking-widest text-pixel-plum/80 uppercase mb-6 flex items-center gap-2 font-display">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><polyline points="13 2 13 9 20 9"/></svg>
              Audit Stream
            </h3>
            <div class="space-y-4">
              <div v-for="log in auditLogs" :key="log.id" class="p-3 border-b border-pixel-plum/5 last:border-0 flex items-start gap-4">
                <div class="mt-1 w-1.5 h-1.5 rounded-full shrink-0" :class="getStatusColor(log.status)"></div>
                <div class="space-y-1">
                  <p class="text-[11px] font-black text-pixel-plum tracking-tight leading-none uppercase">{{ log.action }}</p>
                  <p class="text-pixel-10 font-bold text-pixel-plum/40 uppercase tracking-tighter">
                    User: <span class="text-pixel-violet">{{ log.user }}</span> • {{ log.timestamp }}
                  </p>
                </div>
              </div>
            </div>
            <button class="w-full mt-6 py-2 border border-pixel-plum/10 rounded text-pixel-9 font-black uppercase text-pixel-plum/60 hover:bg-pixel-plum/5 transition-all tracking-widest">
              View Full System Logs
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- TAB: USER REGISTRY -->
    <div v-if="activeTab === 'users'" class="animate-in fade-in slide-in-from-left-4 duration-500">
      <div class="pixel-card min-h-[500px]">
        <div class="flex items-center justify-between mb-8">
          <h3 class="text-xs font-black tracking-widest text-pixel-plum/80 uppercase flex items-center gap-2 font-display">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
            System Identity Index
          </h3>
          <div class="flex gap-4">
            <input type="text" placeholder="Search Identities..." class="px-4 py-2 bg-pixel-plum/5 border border-pixel-plum/10 rounded text-xs font-bold focus:outline-none focus:border-pixel-violet/30 min-w-[250px]" />
          </div>
        </div>

        <div class="overflow-x-auto">
          <table class="w-full text-left">
            <thead>
              <tr class="border-b border-pixel-plum/10">
                <th class="pb-4 text-pixel-10 uppercase text-pixel-plum/50 font-black tracking-widest">Identity Node</th>
                <th class="pb-4 text-pixel-10 uppercase text-pixel-plum/50 font-black tracking-widest">Protocol Role</th>
                <th class="pb-4 text-pixel-10 uppercase text-pixel-plum/50 font-black tracking-widest">Activity Status</th>
                <th class="pb-4 text-pixel-10 uppercase text-pixel-plum/50 font-black tracking-widest">Enlistment Date</th>
                <th class="pb-4 text-pixel-10 uppercase text-pixel-plum/50 font-black tracking-widest text-right">Operational Actions</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-pixel-plum/5">
              <tr v-for="user in allUsers" :key="user.id" class="group hover:bg-pixel-plum/[0.02] transition-colors">
                <td class="py-5">
                  <div class="flex items-center gap-4">
                    <div class="w-8 h-8 rounded bg-pixel-plum/5 flex items-center justify-center text-pixel-plum/40 font-black text-[10px]">
                      ID:{{ user.id.slice(1) }}
                    </div>
                    <div class="flex flex-col">
                      <span class="text-sm font-black text-pixel-plum uppercase tracking-tight">{{ user.username }}</span>
                      <span class="text-pixel-10 font-bold text-pixel-plum/40 uppercase tracking-tighter">{{ user.email }}</span>
                    </div>
                  </div>
                </td>
                <td class="py-5">
                  <span class="text-pixel-9 font-black uppercase px-2.5 py-1 rounded tracking-widest" 
                    :class="{
                      'bg-pixel-violet/10 text-pixel-violet': user.role === 'player',
                      'bg-pixel-moss/10 text-pixel-moss': user.role === 'educator',
                      'bg-pixel-plum/10 text-pixel-plum': user.role === 'admin'
                    }">
                    {{ user.role }}
                  </span>
                </td>
                <td class="py-5">
                  <div class="flex items-center gap-2">
                    <div class="w-1.5 h-1.5 rounded-full" :class="user.status === 'active' ? 'bg-pixel-moss animate-pulse' : 'bg-byte-coral'"></div>
                    <span class="text-pixel-10 font-black uppercase tracking-widest" :class="user.status === 'active' ? 'text-pixel-moss' : 'text-byte-coral'">{{ user.status }}</span>
                  </div>
                </td>
                <td class="py-5 text-pixel-11 font-bold text-pixel-plum/60 uppercase tracking-tighter">
                  {{ user.joined }}
                </td>
                <td class="py-5 text-right">
                  <div class="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                    <button class="px-3 py-1.5 bg-pixel-plum text-white text-[9px] font-black uppercase tracking-widest rounded hover:brightness-110 shadow-pixel-soft">
                      Audit
                    </button>
                    <button class="px-3 py-1.5 border border-byte-coral/30 text-byte-coral text-[9px] font-black uppercase tracking-widest rounded hover:bg-byte-coral/5">
                      Suspend
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- TAB: PENDING APPROVALS -->
    <div v-if="activeTab === 'pending'" class="animate-in fade-in slide-in-from-right-4 duration-500">
      <div class="grid grid-cols-1 gap-6">
        <div v-if="pendingApprovals.length === 0" class="pixel-card flex flex-col items-center justify-center py-20 text-center">
          <div class="w-16 h-16 bg-pixel-moss/10 rounded-full flex items-center justify-center mb-6 text-pixel-moss">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6 9 17l-5-5"/></svg>
          </div>
          <h3 class="text-xl font-black text-pixel-plum uppercase font-display tracking-tight">Queue Clear</h3>
          <p class="text-sm font-bold text-pixel-plum/40 mt-2 uppercase tracking-widest">No pending educator authorizations</p>
        </div>

        <div v-else v-for="pending in pendingApprovals" :key="pending.id" 
          class="pixel-card border-l-8 border-l-signal-gold bg-signal-gold/[0.02] flex flex-col md:flex-row items-center justify-between gap-6 group hover:bg-signal-gold/[0.05] transition-all"
        >
          <div class="flex items-center gap-6">
            <div class="w-16 h-16 bg-signal-gold/10 rounded-lg flex items-center justify-center text-signal-gold">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" y1="8" x2="19" y2="14"/><line x1="22" y1="11" x2="16" y2="11"/></svg>
            </div>
            <div>
              <div class="flex items-center gap-3 mb-1">
                <h4 class="text-xl font-black text-pixel-plum uppercase font-display tracking-tight">{{ pending.displayName }}</h4>
                <span class="px-2 py-0.5 bg-signal-gold text-white text-[9px] font-black uppercase rounded tracking-widest">Pending Verification</span>
              </div>
              <div class="flex flex-wrap gap-x-4 gap-y-1">
                <p class="text-xs font-bold text-pixel-plum/60 uppercase tracking-tight flex items-center gap-1">
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="m22 7-10 7L2 7"/><rect width="20" height="14" x="2" y="5" rx="2"/></svg>
                  {{ pending.email }}
                </p>
                <p class="text-xs font-bold text-pixel-plum/60 uppercase tracking-tight flex items-center gap-1">
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z"/><path d="M12 7v5l3 3"/></svg>
                  Requested: {{ pending.requestedAt }}
                </p>
                <p class="text-xs font-bold text-pixel-violet uppercase tracking-tight flex items-center gap-1">
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="M3 21h18"/><path d="M3 7v1a3 3 0 0 0 6 0V7m0 1a3 3 0 0 0 6 0V7m0 1a3 3 0 0 0 6 0V7H3l2-4h14l2 4"/><path d="M5 21V10.85"/><path d="M19 21V10.85"/><path d="M9 21v-4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v4"/></svg>
                  {{ pending.institution }}
                </p>
              </div>
            </div>
          </div>

          <div class="flex gap-4 w-full md:w-auto">
            <button 
              @click="handleApprove(pending.id)"
              class="flex-1 md:flex-none px-8 py-3 bg-pixel-moss text-white font-black uppercase font-display tracking-widest rounded-lg hover:brightness-110 shadow-pixel-soft transition-all transform active:scale-95"
            >
              Approve
            </button>
            <button 
              @click="handleDeny(pending.id)"
              class="flex-1 md:flex-none px-8 py-3 bg-byte-coral/10 text-byte-coral border border-byte-coral/20 font-black uppercase font-display tracking-widest rounded-lg hover:bg-byte-coral/20 transition-all transform active:scale-95"
            >
              Deny
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@reference "../../../assets/main.css";
.stat-label-pixel {
  @apply text-pixel-10 uppercase font-black tracking-[0.2em] text-pixel-plum/40 mb-2 ml-1;
}
</style>
