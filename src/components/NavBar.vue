<template>
  <nav class="bg-cyber-gray border-b border-neon-blue/30 px-6 py-3 flex items-center justify-between shadow-[0_0_15px_rgba(0,242,255,0.1)]">
    <!-- Brand -->
    <div class="flex items-center gap-8">
      <router-link to="/dashboard" class="text-xl font-black tracking-tighter text-white hover:text-neon-blue transition-colors">
        CYBER<span class="text-neon-blue">MORPH</span>
      </router-link>

      <!-- Navigation Links (Role Based) -->
      <div class="hidden md:flex items-center gap-6">
        <template v-if="auth.isPlayer">
          <router-link to="/dashboard" class="nav-link">DASHBOARD</router-link>
          <router-link to="/game" class="nav-link">SIMULATION</router-link>
          <router-link to="/history" class="nav-link">HISTORY</router-link>
          <router-link to="/leaderboard" class="nav-link">LEADERBOARD</router-link>
        </template>
        <template v-else-if="auth.isEducator">
          <router-link to="/dashboard" class="nav-link">PORTAL</router-link>
          <router-link to="/classroom" class="nav-link">CLASSROOMS</router-link>
        </template>
        <template v-else-if="auth.isAdmin">
          <router-link to="/dashboard" class="nav-link">ROOT</router-link>
          <router-link to="/users" class="nav-link">USERS</router-link>
          <router-link to="/audit" class="nav-link">AUDIT</router-link>
        </template>
      </div>
    </div>

    <!-- User Stats & Profile -->
    <div class="flex items-center gap-6">
      <!-- Player Stats Badge -->
      <div v-if="auth.isPlayer" class="hidden lg:flex items-center gap-4">
        <div class="flex flex-col items-end">
          <span class="text-[10px] text-neon-blue uppercase tracking-widest">Security Credits</span>
          <span class="text-sm font-mono text-white">{{ auth.credits }} <span class="text-neon-green text-[10px]">CR</span></span>
        </div>
        <div class="h-8 w-px bg-white/10"></div>
        <div class="flex flex-col items-end">
          <span class="text-[10px] text-neon-blue uppercase tracking-widest">Progress</span>
          <span class="text-sm font-mono text-white">{{ auth.progress }}/4</span>
        </div>
      </div>

      <!-- Profile Dropdown Placeholder -->
      <div class="flex items-center gap-3 pl-4 border-l border-white/10">
        <div class="text-right">
          <p class="text-xs font-bold text-white leading-none mb-1">{{ auth.username }}</p>
          <p class="text-[10px] text-neon-green uppercase tracking-tighter leading-none">{{ auth.user?.role }}</p>
        </div>
        <button @click="handleLogout" class="p-2 text-white/50 hover:text-red-500 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
        </button>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'vue-router';

const auth = useAuthStore();
const router = useRouter();

const handleLogout = () => {
  auth.logout();
  router.push('/login');
};
</script>

<style scoped>
@reference "@/assets/main.css";

.nav-link {
  @apply text-xs font-bold tracking-widest text-white/60 hover:text-neon-blue transition-colors relative py-2;
}

.nav-link.router-link-active {
  @apply text-neon-blue;
}

.nav-link.router-link-active::after {
  content: '';
  @apply absolute bottom-0 left-0 w-full h-0.5 bg-neon-blue shadow-neon-blue;
}
</style>
