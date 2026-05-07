<template>
  <div class="min-h-screen flex items-center justify-center bg-cyber-dark p-4">
    <div class="w-full max-w-md p-8 bg-cyber-gray border border-neon-blue/30 shadow-[0_0_20px_rgba(0,242,255,0.1)]">
      <h2 class="text-3xl font-bold text-neon-blue mb-6">ACCESS TERMINAL</h2>
      <form @submit.prevent="handleLogin" class="space-y-4">
        <div>
          <label class="block text-xs uppercase tracking-widest text-neon-blue mb-1">Email</label>
          <input v-model="email" type="email" class="w-full bg-black/50 border border-neon-blue/20 p-2 text-white focus:border-neon-blue outline-none" required />
        </div>
        <div>
          <label class="block text-xs uppercase tracking-widest text-neon-blue mb-1">Password</label>
          <input v-model="password" type="password" class="w-full bg-black/50 border border-neon-blue/20 p-2 text-white focus:border-neon-blue outline-none" required />
        </div>
        <button type="submit" class="w-full py-3 bg-neon-blue text-cyber-dark font-bold hover:brightness-125 transition-all mt-4">
          INITIALIZE SESSION
        </button>
      </form>
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
