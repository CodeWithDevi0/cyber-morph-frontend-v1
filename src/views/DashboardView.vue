<template>
  <div class="min-h-screen bg-cyber-dark text-white p-8">
    <header class="flex justify-between items-center mb-12 border-b border-neon-blue/20 pb-4">
      <div>
        <h1 v-if="auth.isPlayer" class="text-2xl font-bold tracking-tighter text-neon-blue">PLAYER_DASHBOARD_v1.0</h1>
        <h1 v-else-if="auth.isEducator" class="text-2xl font-bold tracking-tighter text-neon-green">EDUCATOR_PORTAL_v1.0</h1>
        <h1 v-else-if="auth.isAdmin" class="text-2xl font-bold tracking-tighter text-red-500">SYSTEM_ADMIN_v1.0</h1>
        
        <p v-if="auth.isPlayer" class="text-xs text-neon-green">STATUS: CONNECTED // PLAYER: {{ auth.username }}</p>
        <p v-else-if="auth.isEducator" class="text-xs text-neon-blue">STATUS: AUTHENTICATED // EDUCATOR: {{ auth.username }}</p>
        <p v-else-if="auth.isAdmin" class="text-xs text-red-400">STATUS: ROOT_ACCESS // ADMIN: {{ auth.username }}</p>
      </div>
      <button @click="handleLogout" class="text-xs border border-white/20 px-3 py-1 hover:bg-white hover:text-black transition-all">
        TERMINATE SESSION
      </button>
    </header>

    <!-- 1. Player View -->
    <div v-if="auth.isPlayer" class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div class="bg-cyber-gray p-6 border border-neon-blue/20">
        <h3 class="text-xs uppercase text-neon-blue mb-4">Security Credits</h3>
        <p class="text-4xl font-mono text-white">{{ auth.credits }} <span class="text-sm text-neon-green">CR</span></p>
      </div>
      <div class="bg-cyber-gray p-6 border border-neon-blue/20">
        <h3 class="text-xs uppercase text-neon-blue mb-4">Map Progress</h3>
        <p class="text-4xl font-mono text-white">{{ auth.progress }}/4</p>
      </div>
      <div class="bg-cyber-gray p-6 border border-neon-blue/20 flex flex-col justify-center items-center">
        <button class="w-full py-4 bg-neon-green text-cyber-dark font-bold hover:scale-105 transition-transform">
          ENTER SIMULATION
        </button>
      </div>
    </div>

    <!-- 2. Educator View -->
    <div v-else-if="auth.isEducator" class="bg-cyber-gray p-12 border border-neon-green/20 text-center">
      <h2 class="text-3xl font-bold text-neon-green mb-4">CLASSROOM MANAGEMENT</h2>
      <p class="text-white/70">Initialize classroom modules in Day 09.</p>
    </div>

    <!-- 3. Admin View -->
    <div v-else-if="auth.isAdmin" class="bg-cyber-gray p-12 border border-red-500/20 text-center">
      <h2 class="text-3xl font-bold text-red-500 mb-4">SYSTEM ADMINISTRATION</h2>
      <p class="text-white/70">User management and audit logs will be initialized here.</p>
    </div>
  </div>
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
