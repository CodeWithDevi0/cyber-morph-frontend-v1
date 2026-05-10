<template>
  <div class="min-h-screen flex flex-col items-center justify-center bg-pixel-lilac p-4 font-sans text-pixel-plum">
    <!-- Success Toast for Logout -->
    <transition 
      enter-active-class="transition duration-500 ease-out"
      enter-from-class="transform translate-y-20 opacity-0"
      enter-to-class="transform translate-y-0 opacity-100"
      leave-active-class="transition duration-300 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div v-if="showLogoutToast" class="fixed bottom-8 right-8 z-100 flex items-center gap-4 bg-pixel-moss p-4 rounded-lg shadow-pixel-purple border border-white/20">
        <div class="w-10 h-10 bg-white/20 rounded flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
        </div>
        <div>
          <p class="text-[10px] font-black text-white/70 uppercase tracking-widest leading-none mb-1.5">Security Protocol Complete</p>
          <p class="text-sm font-black text-white font-display uppercase">System Offline</p>
        </div>
        <button @click="showLogoutToast = false" class="ml-4 text-white/40 hover:text-white transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
        </button>
      </div>
    </transition>

    <!-- Back to Home -->
    <router-link to="/" class="mb-8 inline-flex items-center gap-2 text-sm font-bold text-pixel-violet hover:brightness-90 transition-all">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>
      Back to Home
    </router-link>

    <div class="w-full max-w-md p-8 bg-white/65 border border-pixel-violet/15 shadow-pixel-purple backdrop-blur-md rounded-lg">
      <div class="text-center mb-8">
        <h2 class="text-3xl font-black text-pixel-plum font-display uppercase tracking-tight">Access Terminal</h2>
        <p class="text-xs font-bold text-pixel-plum/50 uppercase tracking-widest mt-2">Initialize your session</p>
      </div>

      <!-- System Alert for Errors -->
      <transition 
        enter-active-class="transition duration-300 ease-out"
        enter-from-class="transform -translate-y-2 opacity-0"
        enter-to-class="transform translate-y-0 opacity-100"
        leave-active-class="transition duration-200 ease-in"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div v-if="auth.error" class="bg-byte-coral/10 border-l-4 border-byte-coral p-4 mb-6 rounded flex items-start gap-3">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" class="text-byte-coral shrink-0 mt-0.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
          <div>
            <p class="text-[10px] font-black text-byte-coral uppercase tracking-widest leading-none mb-1">System Error</p>
            <p class="text-xs font-bold text-pixel-plum/80">{{ auth.error }}</p>
          </div>
        </div>
      </transition>

      <form @submit.prevent="handleLogin" class="space-y-5">
        <div>
          <label class="block text-[10px] font-black uppercase tracking-[0.2em] text-pixel-violet mb-1.5 ml-1">Identity (Email)</label>
          <input v-model="email" type="email" class="w-full bg-white/50 border border-pixel-violet/15 p-3 text-pixel-plum rounded-md focus:border-pixel-violet/50 outline-none transition-all" placeholder="player@test.com" required />
        </div>
        <div>
          <label class="block text-[10px] font-black uppercase tracking-[0.2em] text-pixel-violet mb-1.5 ml-1">Access Key (Password)</label>
          <input v-model="password" type="password" class="w-full bg-white/50 border border-pixel-violet/15 p-3 text-pixel-plum rounded-md focus:border-pixel-violet/50 outline-none transition-all" placeholder="••••••••" required />
        </div>
        
        <button 
          type="submit" 
          :disabled="auth.loading"
          class="w-full py-4 bg-pixel-violet text-white font-black font-display uppercase tracking-widest rounded-md hover:brightness-110 shadow-pixel-purple transition-all mt-6 disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-3"
        >
          <span v-if="auth.loading" class="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span>
          <span :class="{ 'opacity-80': auth.loading }">{{ auth.loading ? 'Authenticating...' : 'Enter System' }}</span>
        </button>
      </form>

      <p class="mt-8 text-center text-sm font-bold text-pixel-plum/60">
        New Educator? <router-link to="/register" class="text-pixel-violet hover:underline">Register here</router-link>
      </p>
      
      <div class="mt-6 pt-6 border-t border-pixel-plum/5">
        <p class="text-[10px] text-center font-black text-pixel-plum/30 uppercase tracking-widest leading-relaxed">
          Players: Access your dashboard here.<br />
          New players must register via the Godot game client.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { useRouter, useRoute } from 'vue-router';

const auth = useAuthStore();
const router = useRouter();
const route = useRoute();
const email = ref('');
const password = ref('');
const showLogoutToast = ref(false);

const isLogoutSuccess = computed(() => route.query.logout === 'success');

onMounted(() => {
  if (isLogoutSuccess.value) {
    showLogoutToast.value = true;
    // Clear the URL immediately so refresh doesn't trigger it again
    router.replace({ query: {} });
    
    setTimeout(() => {
      showLogoutToast = false;
    }, 5000);
  }
});

const handleLogin = async () => {
  const success = await auth.login(email.value, password.value);
  if (success) router.push('/portal/dashboard?login=success');
};
</script>
