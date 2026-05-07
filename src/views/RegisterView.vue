<template>
  <div class="min-h-screen flex items-center justify-center bg-cyber-dark p-4">
    <div class="w-full max-w-md p-8 bg-cyber-gray border border-neon-green/30 shadow-[0_0_20px_rgba(57,255,20,0.1)]">
      <h2 class="text-3xl font-bold text-neon-green mb-6">ENLISTMENT</h2>
      <form @submit.prevent="handleRegister" class="space-y-4">
        <div>
          <label class="block text-xs uppercase tracking-widest text-neon-green mb-1">Username</label>
          <input v-model="username" type="text" class="w-full bg-black/50 border border-neon-green/20 p-2 text-white focus:border-neon-green outline-none" required />
        </div>
        <div>
          <label class="block text-xs uppercase tracking-widest text-neon-green mb-1">Email</label>
          <input v-model="email" type="email" class="w-full bg-black/50 border border-neon-green/20 p-2 text-white focus:border-neon-green outline-none" required />
        </div>
        <div>
          <label class="block text-xs uppercase tracking-widest text-neon-green mb-1">Password</label>
          <input v-model="password" type="password" class="w-full bg-black/50 border border-neon-green/20 p-2 text-white focus:border-neon-green outline-none" required />
        </div>
        <button type="submit" class="w-full py-3 bg-neon-green text-cyber-dark font-bold hover:brightness-125 transition-all mt-4">
          AUTHORIZE ACCOUNT
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
const username = ref('');
const email = ref('');
const password = ref('');

const handleRegister = async () => {
  const success = await auth.register({ username: username.value, email: email.value, password: password.value });
  if (success) router.push('/dashboard');
};
</script>
