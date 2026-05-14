<script setup>
import { computed } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { useRoute } from 'vue-router';

const auth = useAuthStore();
const route = useRoute();

const navLinks = computed(() => {
  if (auth.isAdmin) {
    return [
      { name: 'OVERVIEW', path: '/portal/admin', icon: 'shield-check' },
      { name: 'USERS', path: '/portal/admin/users', icon: 'users' },
      { name: 'SYSTEM LOGS', path: '/portal/admin/logs', icon: 'file-text' },
      { name: 'PROTOCOLS', path: '/portal/admin/approvals', icon: 'user-check' },
      { name: 'RANKINGS', path: '/portal/leaderboard', icon: 'trophy' },
    ];
  }
  if (auth.isEducator) {
    return [
      { name: 'DASHBOARD', path: '/portal/educator', icon: 'layout' },
      { name: 'CLASSROOM', path: '/portal/educator/classroom', icon: 'users' },
      { name: 'UNITS', path: '/portal/educator/classrooms', icon: 'shield' },
      { name: 'RANKINGS', path: '/portal/leaderboard', icon: 'trophy' },
    ];
  }
  // Default: Player
  return [
    { name: 'DASHBOARD', path: '/portal/dashboard', icon: 'layout' },
    { name: 'MISSIONS', path: '/portal/mission-hub', icon: 'target' },
    { name: 'DATABASE', path: '/portal/threats', icon: 'database' },
    { name: 'RANKINGS', path: '/portal/leaderboard', icon: 'trophy' },
    { name: 'UNITS', path: '/portal/classroom/join', icon: 'users' },
    { name: 'LOGS', path: '/portal/history', icon: 'history' },
  ];
});

const handleLogout = () => {
  // We can emit or use auth directly, but since we are moving the modal logic...
  // For now let's just use the direct logout or trigger a global event.
  // Actually, keeping the logout confirmation is better. 
  // I will emit 'logout-requested' to the parent layout.
  emit('logout');
};

const emit = defineEmits(['logout']);
</script>

<template>
  <aside class="w-64 bg-white/80 backdrop-blur-xl border-r border-pixel-violet/15 h-screen flex flex-col shadow-pixel-purple overflow-hidden">
    <!-- Brand / Logo -->
    <div class="p-6 border-b border-pixel-plum/5">
      <router-link :to="auth.isAdmin ? '/portal/admin' : (auth.isEducator ? '/portal/educator' : '/portal/dashboard')" class="text-xl font-black tracking-tighter text-pixel-plum group">
        CYBER<span class="text-pixel-violet group-hover:text-pixel-plum transition-colors">MORPH</span>
      </router-link>
      <p class="text-[9px] font-black text-pixel-violet uppercase tracking-[0.3em] mt-1 opacity-60">Operations v1.0</p>
    </div>

    <!-- Navigation List -->
    <nav class="flex-1 overflow-y-auto p-4 space-y-2 no-scrollbar">
      <router-link
        v-for="link in navLinks"
        :key="link.path"
        :to="link.path"
        class="flex items-center gap-3 px-4 py-3 rounded-lg font-bold text-xs uppercase tracking-widest transition-all group relative overflow-hidden"
        :class="route.path === link.path 
          ? 'bg-pixel-violet text-white shadow-pixel-purple' 
          : 'text-pixel-plum/60 hover:bg-pixel-violet/5 hover:text-pixel-plum'"
      >
        <!-- Active Indicator -->
        <div v-if="route.path === link.path" class="absolute left-0 top-0 w-1 h-full bg-white/40"></div>
        
        <span class="relative z-10">{{ link.name }}</span>
      </router-link>
    </nav>

    <!-- User Profile & Logout -->
    <div class="p-4 border-t border-pixel-plum/5 bg-pixel-plum/5">
      <div class="flex items-center gap-3 mb-4 px-2">
        <div class="w-10 h-10 rounded bg-pixel-violet/10 flex items-center justify-center border border-pixel-violet/20">
          <span class="text-pixel-violet font-black text-sm">{{ auth.username.charAt(0) }}</span>
        </div>
        <div class="overflow-hidden">
          <p class="text-xs font-black text-pixel-plum truncate">{{ auth.username }}</p>
          <p class="text-[9px] font-black text-pixel-violet uppercase tracking-tighter truncate">{{ auth.user?.role || 'Operator' }}</p>
        </div>
      </div>

      <button 
        @click="handleLogout"
        class="w-full flex items-center justify-center gap-2 py-3 bg-white border border-byte-coral/20 text-byte-coral font-black text-[10px] uppercase tracking-widest rounded-lg hover:bg-byte-coral hover:text-white transition-all shadow-sm"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
        Terminate Session
      </button>
    </div>
  </aside>
</template>

<style scoped>
@reference "@/assets/main.css";

.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
