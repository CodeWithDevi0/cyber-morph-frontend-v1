<script setup>
import { ref, onMounted, watch } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { useRoute, useRouter } from 'vue-router';
import { mockAdmin } from '@/api/mock';

// Modular Components
import AdminOverview from './components/AdminOverview.vue';
import UserRegistry from './components/UserRegistry.vue';
import SystemAuditLog from './components/SystemAuditLog.vue';

const auth = useAuthStore();
const route = useRoute();
const router = useRouter();
const activeTab = ref('overview'); // overview, users, audit

const notification = ref({
  show: false,
  title: '',
  message: '',
  type: 'success'
});

const triggerNotification = (title, message, type = 'success') => {
  notification.value = { show: true, title, message, type };
  setTimeout(() => { notification.value.show = false; }, 3000);
};

// Mock Data State
const systemStats = ref({ ...mockAdmin.stats });
const allUsers = ref([...mockAdmin.all_users]);
const auditLogs = ref([
  { id: 1, action: 'LOGIN_SUCCESS', user: 'NeonSpecter', timestamp: '2 mins ago', status: 'success' },
  { id: 2, action: 'ROLE_UPDATE', user: 'System Root', timestamp: '15 mins ago', status: 'warning' },
  { id: 3, action: 'REGISTRATION', user: 'LogicBomb', timestamp: '1 hour ago', status: 'success' },
  { id: 4, action: 'SESSION_TERMINATED', user: 'GhostByte', timestamp: '2 hours ago', status: 'alert' },
  { id: 5, action: 'SYNC_COMPLETED', user: 'PixelPioneer', timestamp: '3 hours ago', status: 'success' },
  { id: 6, action: 'CLASSROOM_CREATED', user: 'Aris Thorne', timestamp: '5 hours ago', status: 'success' },
  { id: 7, action: 'DATA_DELETED', user: 'System Root', timestamp: 'Yesterday', status: 'alert' },
  { id: 8, action: 'PASSWORD_RESET', user: 'EchoZero', timestamp: 'Yesterday', status: 'warning' },
]);

onMounted(() => {
  if (route.query.tab) {
    activeTab.value = route.query.tab;
  }
  
  if (route.query.login === 'success') {
    router.replace({ query: {} });
    setTimeout(() => {
      triggerNotification('Secure Link Established', 'Root Terminal Authorized', 'success');
    }, 500);
  }
});

watch(() => route.query.tab, (newTab) => {
  if (newTab) {
    activeTab.value = newTab;
  } else if (route.path === '/portal/admin') {
    activeTab.value = 'overview';
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
  <div class="min-h-screen pb-12">
    <!-- Notification Toast -->
    <transition
      enter-active-class="transition duration-500 ease-out"
      enter-from-class="transform translate-y-20 opacity-0"
      enter-to-class="transform translate-y-0 opacity-100"
      leave-active-class="transition duration-300 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div v-if="notification.show" 
           class="fixed bottom-8 right-8 z-200 flex items-center gap-4 p-4 rounded-lg shadow-pixel-purple border border-white/20"
           :class="notification.type === 'success' ? 'bg-pixel-moss' : 'bg-byte-coral'">
        <div class="w-10 h-10 bg-white/20 rounded flex items-center justify-center">
          <svg v-if="notification.type === 'success'" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
          <svg v-else xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="m15 9-6 6"/><path d="m9 9 6 6"/><circle cx="12" cy="12" r="10"/></svg>
        </div>
        <div>
          <p class="text-pixel-10 font-black text-white/70 uppercase tracking-widest leading-none mb-1.5">{{ notification.title }}</p>
          <p class="text-sm font-black text-white font-display uppercase tracking-tight">{{ notification.message }}</p>
        </div>
      </div>
    </transition>

    <!-- Header Section -->
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 border-b-2 border-pixel-plum/10 pb-8">
      <div>
        <div class="flex items-center gap-3 mb-1">
          <div class="w-2 h-2 rounded-full bg-byte-coral animate-pulse"></div>
          <h1 class="text-4xl font-black font-display tracking-tighter text-pixel-plum uppercase">System Oversight</h1>
        </div>
        <p class="text-pixel-10 text-pixel-plum/50 uppercase font-black tracking-[0.3em] flex items-center gap-2">
          Operator: <span class="text-pixel-violet">{{ auth.user?.display_name || 'Root Admin' }}</span> 
          <span class="mx-1 opacity-30">|</span> 
          Access Level: <span class="text-byte-coral">L5 Cardinal</span>
        </p>
      </div>

      <div class="flex gap-3">
        <button class="px-6 py-3 border-2 border-pixel-plum text-pixel-plum rounded-lg font-black text-xs uppercase tracking-widest hover:bg-pixel-plum hover:text-white transition-all transform active:scale-95">Backup Config</button>
        <button class="px-6 py-3 bg-pixel-plum text-white rounded-lg font-black text-xs uppercase tracking-widest hover:brightness-110 shadow-pixel-soft transition-all transform active:scale-95">Sync Cloud</button>
      </div>
    </div>

    <!-- Navigation Tabs -->
    <div class="flex gap-1 border-b border-pixel-plum/10 mb-10 overflow-x-auto no-scrollbar">
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
        @click="activeTab = 'audit'"
        :class="[
          'px-6 py-3 text-xs font-black uppercase tracking-[0.15em] transition-all relative',
          activeTab === 'audit' ? 'text-pixel-plum border-b-2 border-pixel-plum' : 'text-pixel-plum/30 hover:text-pixel-plum/60'
        ]"
      >
        System Logs
      </button>
    </div>

    <!-- Tab Content Area -->
    <div class="tab-content">
      <AdminOverview 
        v-if="activeTab === 'overview'" 
        :system-stats="systemStats"
        :all-users="allUsers"
        :audit-logs="auditLogs"
        :get-status-color="getStatusColor"
        @change-tab="(tab) => activeTab = tab"
      />

      <UserRegistry 
        v-if="activeTab === 'users'" 
        :all-users="allUsers"
      />

      <SystemAuditLog 
        v-if="activeTab === 'audit'" 
        :audit-logs="auditLogs"
        :get-status-color="getStatusColor"
      />
    </div>
  </div>
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
