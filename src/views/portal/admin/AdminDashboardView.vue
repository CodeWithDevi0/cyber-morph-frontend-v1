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

// --- NEW CAPSTONE MOCK FUNCTIONALITY ---

// Toast Notification State
const toast = ref({ show: false, message: '', type: 'info' })
const isBackingUp = ref(false)
const isSyncing = ref(false)

// Reusable notification trigger
const triggerToast = (message, type = 'info', duration = 3000) => {
  toast.value = { show: true, message, type }
  setTimeout(() => { toast.value.show = false }, duration)
}

// Fake Backup Function
const handleBackup = () => {
  if (isBackingUp.value) return
  isBackingUp.value = true
  triggerToast('Initiating Local Configuration Backup...', 'info', 2000)

  // Simulate server processing time
  setTimeout(() => {
    isBackingUp.value = false
    triggerToast('Backup Configured Successfully.', 'success')
  }, 2000)
}

// Fake Cloud Sync Function
const handleSync = () => {
  if (isSyncing.value) return
  isSyncing.value = true
  triggerToast('Connecting to PostgreSQL Cloud...', 'info', 2500)

  // Simulate server processing time
  setTimeout(() => {
    isSyncing.value = false
    triggerToast('Cloud Sync Successful. 0 Conflicts.', 'success')
  }, 2500)
}
</script>

<template>
  <div class="animate-in fade-in slide-in-from-bottom-4 duration-700">
    
    <transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="transform translate-y-10 opacity-0"
      enter-to-class="transform translate-y-0 opacity-100"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="transform translate-y-0 opacity-100"
      leave-to-class="transform translate-y-10 opacity-0"
    >
      <div v-if="toast.show"
           class="fixed bottom-8 right-8 px-6 py-4 rounded-lg shadow-pixel-soft border-2 font-black text-xs uppercase tracking-widest z-50 flex items-center gap-3 bg-white"
           :class="toast.type === 'success' ? 'text-pixel-moss border-pixel-moss' : 'text-pixel-violet border-pixel-violet'">
        <div class="w-2 h-2 rounded-full animate-pulse" :class="toast.type === 'success' ? 'bg-pixel-moss' : 'bg-pixel-violet'"></div>
        {{ toast.message }}
      </div>
    </transition>

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
        <button 
          @click="handleBackup"
          :disabled="isBackingUp"
          :class="isBackingUp ? 'opacity-50 cursor-not-allowed' : 'hover:bg-pixel-plum hover:text-white transform active:scale-95'"
          class="px-6 py-3 border-2 border-pixel-plum text-pixel-plum rounded-lg font-black text-xs uppercase tracking-widest transition-all w-48 flex justify-center items-center">
          {{ isBackingUp ? 'Backing Up...' : 'Backup Config' }}
        </button>

        <button 
          @click="handleSync"
          :disabled="isSyncing"
          :class="isSyncing ? 'bg-pixel-plum/70 cursor-not-allowed' : 'bg-pixel-plum hover:brightness-110 transform active:scale-95'"
          class="px-6 py-3 text-white rounded-lg font-black text-xs uppercase tracking-widest shadow-pixel-soft transition-all w-40 flex justify-center items-center">
          {{ isSyncing ? 'Syncing...' : 'Sync Cloud' }}
        </button>
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