<template>
  <div class="min-h-screen flex flex-col items-center justify-center bg-pixel-lilac p-4 font-sans text-pixel-plum">
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

      <div v-if="auth.error" class="bg-red-500/10 border border-red-500/30 p-3 text-red-600 text-xs mb-6 rounded">
        {{ auth.error }}
      </div>

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
          class="w-full py-4 bg-pixel-violet text-white font-black font-display uppercase tracking-widest rounded-md hover:brightness-110 shadow-pixel-purple transition-all mt-6 disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2"
        >
          <span v-if="auth.loading" class="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span>
          {{ auth.loading ? 'Authenticating...' : 'Enter System' }}
        </button>
      </form>

      <p class="mt-8 text-center text-sm font-bold text-pixel-plum/60">
        New investigator? <router-link to="/register" class="text-pixel-violet hover:underline">Register here</router-link>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'vue-router';

const auth = useAuthStore();
const router = useRouter();
const email = ref('');
const password = ref('');

const handleLogin = async () => {
  const success = await auth.login(email.value, password.value);
  if (success) router.push('/dashboard');
};
</script>
