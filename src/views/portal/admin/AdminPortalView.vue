<script setup>
import { ref, onMounted } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { useRoute, useRouter } from 'vue-router';
import { mockAdmin } from '@/api/mock';

const auth = useAuthStore();
const route = useRoute();
const router = useRouter();
const showWelcomeToast = ref(false);

const systemStats = ref({
  totalUsers: 1542,
  activeSessions: 86,
  databaseHealth: '99.9%',
  globalCredits: '1.2M'
});

const recentUsers = ref([
  { id: 'u1', username: 'NeonSpecter', email: 'player@test.com', role: 'player', status: 'active', joined: '2026-05-01' },
  { id: 'u2', username: 'Aris Thorne', email: 'teacher@test.com', role: 'educator', status: 'active', joined: '2026-04-15' },
  { id: 'u3', username: 'System Root', email: 'admin@test.com', role: 'admin', status: 'active', joined: '2026-01-01' },
  { id: 'u4', username: 'GhostByte', email: 'ghost@test.com', role: 'player', status: 'suspended', joined: '2026-05-05' },
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
      showWelcomeToast.value = true;
      setTimeout(() => {
        showWelcomeToast.value = false;
      }, 3000);
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
</script>

<template>
  <div class="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 text-pixel-plum">
    <!-- Success Toast Notification -->
    <transition
      enter-active-class="transition duration-500 ease-out"
      enter-from-class="transform translate-y-20 opacity-0"
      enter-to-class="transform translate-y-0 opacity-100"
      leave-active-class="transition duration-300 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div v-if="showWelcomeToast" class="fixed bottom-8 right-8 z-100 flex items-center gap-4 bg-pixel-plum p-4 rounded-lg shadow-pixel-hero border border-white/20">
        <div class="w-10 h-10 bg-white/20 rounded flex items-center justify-center text-white">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/></svg>
        </div>
        <div>
          <p class="text-pixel-10 font-black text-white/70 uppercase tracking-widest leading-none mb-1.5">Secure Link Established</p>
          <p class="text-sm font-black text-white font-display uppercase tracking-tight">Root Terminal Authorized</p>
        </div>
      </div>
    </transition>

    <!-- Admin Header -->
    <div class="flex items-center justify-between border-b-4 border-pixel-plum pb-6">
      <div>
        <div class="flex items-center gap-3 mb-2">
          <div class="px-2 py-1 bg-pixel-plum text-white text-pixel-10 font-black uppercase tracking-tighter rounded">Root Access</div>
          <h1 class="text-4xl font-black font-display tracking-tight text-pixel-plum uppercase">System Oversight</h1>
        </div>
        <p class="text-pixel-10 text-pixel-plum/60 uppercase font-black tracking-[0.25em] flex items-center gap-2">
          <span class="w-2 h-2 rounded-full bg-pixel-violet animate-pulse"></span>
          Terminal ID: CM-ROOT-01 // Master Admin: {{ auth.user?.display_name || mockAdmin.display_name }}
        </p>
      </div>

      <div class="hidden md:flex items-center gap-6">
        <div class="text-right">
          <p class="text-pixel-10 font-black text-pixel-plum/40 uppercase tracking-widest">DB Integrity</p>
          <p class="text-xl font-black text-pixel-moss">{{ systemStats.databaseHealth }}</p>
        </div>
        <div class="h-10 w-1 bg-pixel-plum/10"></div>
        <div class="text-right">
          <p class="text-pixel-10 font-black text-pixel-plum/40 uppercase tracking-widest">Global Credits</p>
          <p class="text-xl font-black text-pixel-violet">{{ systemStats.globalCredits }}</p>
        </div>
      </div>
    </div>

    <!-- Quick Metrics -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <div class="pixel-card bg-pixel-plum text-white shadow-pixel-hero">
        <p class="text-pixel-10 uppercase font-black text-white/40 tracking-widest mb-1">Total Network Users</p>
        <p class="text-3xl font-black">{{ systemStats.totalUsers }}</p>
      </div>
      <div class="pixel-card border-2 border-pixel-plum/10">
        <p class="text-pixel-10 uppercase font-black text-pixel-plum/40 tracking-widest mb-1">Active Game Sessions</p>
        <p class="text-3xl font-black text-pixel-plum">{{ systemStats.activeSessions }}</p>
      </div>
      <div class="pixel-card border-2 border-pixel-plum/10">
        <p class="text-pixel-10 uppercase font-black text-pixel-plum/40 tracking-widest mb-1">Security Breaches</p>
        <p class="text-3xl font-black text-byte-coral">0</p>
      </div>
      <div class="pixel-card border-2 border-pixel-plum/10">
        <p class="text-pixel-10 uppercase font-black text-pixel-plum/40 tracking-widest mb-1">Uptime</p>
        <p class="text-3xl font-black text-pixel-moss">14d 2h</p>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-8">
      <!-- User Registry -->
      <div class="space-y-6">
        <div class="pixel-card">
          <div class="flex items-center justify-between mb-8">
            <h3 class="text-xs font-black tracking-widest text-pixel-plum/80 uppercase flex items-center gap-2 font-display">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
              User Registry
            </h3>
            <div class="flex gap-2">
              <input type="text" placeholder="Filter ID/Username..." class="px-3 py-1.5 bg-pixel-plum/5 border border-pixel-plum/10 rounded text-xs font-bold focus:outline-none focus:border-pixel-violet/30" />
            </div>
          </div>

          <div class="overflow-x-auto">
            <table class="w-full text-left">
              <thead>
                <tr class="border-b border-pixel-plum/10">
                  <th class="pb-4 text-pixel-10 uppercase text-pixel-plum/50 font-black tracking-widest">Identity</th>
                  <th class="pb-4 text-pixel-10 uppercase text-pixel-plum/50 font-black tracking-widest">Role</th>
                  <th class="pb-4 text-pixel-10 uppercase text-pixel-plum/50 font-black tracking-widest">Status</th>
                  <th class="pb-4 text-pixel-10 uppercase text-pixel-plum/50 font-black tracking-widest text-right">Actions</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-pixel-plum/5">
                <tr v-for="user in recentUsers" :key="user.id" class="group">
                  <td class="py-4">
                    <div class="flex flex-col">
                      <span class="text-sm font-black text-pixel-plum uppercase tracking-tight">{{ user.username }}</span>
                      <span class="text-pixel-10 font-bold text-pixel-plum/40">{{ user.email }}</span>
                    </div>
                  </td>
                  <td class="py-4">
                    <span class="text-pixel-10 font-black uppercase px-2 py-0.5 rounded" 
                      :class="{
                        'bg-pixel-violet/10 text-pixel-violet': user.role === 'player',
                        'bg-pixel-moss/10 text-pixel-moss': user.role === 'educator',
                        'bg-pixel-plum/10 text-pixel-plum': user.role === 'admin'
                      }">
                      {{ user.role }}
                    </span>
                  </td>
                  <td class="py-4">
                    <div class="flex items-center gap-2">
                      <span class="w-1.5 h-1.5 rounded-full" :class="user.status === 'active' ? 'bg-pixel-moss' : 'bg-byte-coral'"></span>
                      <span class="text-pixel-10 font-black uppercase" :class="user.status === 'active' ? 'text-pixel-plum' : 'text-byte-coral'">{{ user.status }}</span>
                    </div>
                  </td>
                  <td class="py-4 text-right">
                    <div class="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button class="p-1.5 hover:bg-pixel-violet/10 text-pixel-violet rounded transition-colors" title="Audit User">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
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
</template>

<style scoped>
@reference "@/assets/main.css";
</style>
