<template>
  <div class="min-h-screen flex flex-col items-center justify-center bg-pixel-lilac p-4 font-sans text-pixel-plum">
    <!-- Back to Home -->
    <router-link to="/" class="mb-8 inline-flex items-center gap-2 text-sm font-bold text-pixel-violet hover:brightness-90 transition-all">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>
      Back to Home
    </router-link>

    <div class="w-full max-w-md p-8 bg-white/65 border border-pixel-violet/15 shadow-pixel-purple backdrop-blur-md rounded-lg">
      <div class="text-center mb-8">
        <h2 class="text-3xl font-black text-pixel-plum font-display uppercase tracking-tight">Educator Enlistment</h2>
        <p class="text-xs font-bold text-pixel-plum/50 uppercase tracking-widest mt-2">Create your instructor account</p>
      </div>

      <div class="bg-pixel-lavender/20 border border-pixel-violet/20 p-3 rounded mb-6">
        <p class="text-[10px] font-bold text-pixel-violet uppercase tracking-tight leading-relaxed">
          Note: Public registration is currently restricted to Educators. Students are enrolled directly via the Educator portal.
        </p>
      </div>

      <form @submit.prevent="handleRegister" class="space-y-5">
        <div>
          <label class="block text-[10px] font-black uppercase tracking-[0.2em] text-pixel-violet mb-1.5 ml-1">Username</label>
          <input v-model="username" type="text" class="w-full bg-white/50 border border-pixel-violet/15 p-3 text-pixel-plum rounded-md focus:border-pixel-violet/50 outline-none transition-all" placeholder="Professor Oak" required />
        </div>
        <div>
          <label class="block text-[10px] font-black uppercase tracking-[0.2em] text-pixel-violet mb-1.5 ml-1">Email</label>
          <input v-model="email" type="email" class="w-full bg-white/50 border border-pixel-violet/15 p-3 text-pixel-plum rounded-md focus:border-pixel-violet/50 outline-none transition-all" placeholder="teacher@test.com" required />
        </div>
        <div>
          <label class="block text-[10px] font-black uppercase tracking-[0.2em] text-pixel-violet mb-1.5 ml-1">Secret Key (Password)</label>
          <input v-model="password" type="password" class="w-full bg-white/50 border border-pixel-violet/15 p-3 text-pixel-plum rounded-md focus:border-pixel-violet/50 outline-none transition-all" placeholder="••••••••" required />
        </div>
        
        <button 
          type="submit" 
          :disabled="auth.loading"
          class="w-full py-4 bg-pixel-violet text-white font-black font-display uppercase tracking-widest rounded-md hover:brightness-110 shadow-pixel-purple transition-all mt-6 flex justify-center items-center gap-2"
        >
          <span v-if="auth.loading" class="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span>
          {{ auth.loading ? 'Processing...' : 'Authorize Account' }}
        </button>
      </form>

      <p class="mt-8 text-center text-sm font-bold text-pixel-plum/60">
        Already registered? <router-link to="/login" class="text-pixel-violet hover:underline">Login here</router-link>
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
const username = ref('');
const email = ref('');
const password = ref('');

const handleRegister = async () => {
  const success = await auth.register({ username: username.value, email: email.value, password: password.value });
  if (success) router.push('/dashboard');
};
</script>
