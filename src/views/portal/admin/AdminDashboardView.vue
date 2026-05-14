<script setup>
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { mockAdmin } from '@/api/mock'

// Components
import AdminOverview from './components/AdminOverview.vue'

const auth = useAuthStore()
const systemStats = ref({ ...mockAdmin.stats })
const allUsers = ref([...mockAdmin.all_users])
const auditLogs = ref([
  { id: 1, action: 'LOGIN_SUCCESS', user: 'NeonSpecter', timestamp: '2 mins ago', status: 'success' },
  { id: 2, action: 'ROLE_UPDATE', user: 'System Root', timestamp: '15 mins ago', status: 'warning' },
  { id: 3, action: 'REGISTRATION', user: 'LogicBomb', timestamp: '1 hour ago', status: 'success' },
  { id: 4, action: 'SESSION_TERMINATED', user: 'GhostByte', timestamp: '2 hours ago', status: 'alert' },
  { id: 5, action: 'SYNC_COMPLETED', user: 'PixelPioneer', timestamp: '3 hours ago', status: 'success' },
  { id: 6, action: 'CLASSROOM_CREATED', user: 'Aris Thorne', timestamp: '5 hours ago', status: 'success' },
  { id: 7, action: 'DATA_DELETED', user: 'System Root', timestamp: 'Yesterday', status: 'alert' },
  { id: 8, action: 'PASSWORD_RESET', user: 'EchoZero', timestamp: 'Yesterday', status: 'warning' },
])

const getStatusColor = (status) => {
  switch (status) {
    case 'success': return 'text-pixel-moss';
    case 'warning': return 'text-signal-gold';
    case 'alert': return 'text-byte-coral';
    default: return 'text-pixel-plum/40';
  }
}
</script>

<template>
  <div class="animate-in fade-in slide-in-from-bottom-4 duration-700">
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

    <AdminOverview 
      :system-stats="systemStats"
      :all-users="allUsers"
      :audit-logs="auditLogs"
      :get-status-color="getStatusColor"
    />
  </div>
</template>

<style scoped>
@reference "@/assets/main.css";
</style>
