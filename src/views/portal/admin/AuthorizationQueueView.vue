<script setup>
import { ref } from 'vue';
import { mockAdmin } from '@/api/mock';
import AuthorizationQueue from './components/AuthorizationQueue.vue';


const pendingApprovals = ref([...mockAdmin.pending_approvals]);

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

const handleApprove = (id) => {
  pendingApprovals.value = pendingApprovals.value.filter(a => a.id !== id);
  triggerNotification('Protocol Authorized', 'Educator account active', 'success');
};

const handleDeny = (id) => {
  pendingApprovals.value = pendingApprovals.value.filter(a => a.id !== id);
  triggerNotification('Access Revoked', 'Identity purged from queue', 'alert');
};
</script>

<template>
  <div class="min-h-screen pb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
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
          <div class="w-2 h-2 rounded-full bg-pixel-violet animate-pulse"></div>
          <h1 class="text-4xl font-black font-display tracking-tighter text-pixel-plum uppercase">Security Protocols</h1>
        </div>
        <p class="text-pixel-10 text-pixel-plum/50 uppercase font-black tracking-[0.3em] flex items-center gap-2">
          Task: <span class="text-pixel-violet">Educator Identity Validation</span> 
          <span class="mx-1 opacity-30">|</span> 
          Status: <span class="text-pixel-moss">Live Monitoring</span>
        </p>
      </div>

      <div class="flex gap-3">
        <router-link to="/portal/admin" class="px-6 py-3 border-2 border-pixel-plum/10 text-pixel-plum/60 rounded-lg font-black text-xs uppercase tracking-widest hover:bg-pixel-plum/5 transition-all transform active:scale-95 flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="m15 18-6-6 6-6"/></svg>
          Return to Hub
        </router-link>
      </div>
    </div>

    <!-- Main Content Area -->
    <div class="max-w-5xl">
      <AuthorizationQueue 
        :pending-approvals="pendingApprovals"
        @approve="handleApprove"
        @deny="handleDeny"
      />
    </div>
  </div>
</template>

<style scoped>
@reference "@/assets/main.css";
</style>
