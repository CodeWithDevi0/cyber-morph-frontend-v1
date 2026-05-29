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
            <p class="text-[10px] font-black text-byte-coral uppercase tracking-widest leading-none mb-1">Enlistment Error</p>
            <p class="text-xs font-bold text-pixel-plum/80">{{ auth.error }}</p>
          </div>
        </div>
      </transition>

      <div v-if="isSubmitted" class="text-center py-8 animate-in zoom-in duration-500">
        <div class="w-20 h-20 bg-pixel-moss/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" class="text-pixel-moss"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
        </div>
        <h2 class="text-2xl font-black text-pixel-plum font-display uppercase tracking-tight">Transmission Received</h2>
        <p class="text-sm font-bold text-pixel-plum/60 mt-4 leading-relaxed">
          Your instructor credentials have been uploaded to the DNSC secure queue.
        </p>
        <p class="text-xs font-black text-pixel-violet uppercase tracking-widest mt-6 bg-pixel-violet/5 p-4 rounded border border-pixel-violet/10">
          Status: Pending Admin Verification
        </p>
        <router-link to="/login" class="inline-block mt-10 py-3 px-8 bg-pixel-violet text-white font-black font-display uppercase tracking-widest rounded-md hover:brightness-110 shadow-pixel-purple transition-all">
          Return to Terminal
        </router-link>
      </div>

      <form v-else @submit.prevent="handleRegister" class="space-y-5">
        <div>
          <label class="block text-[10px] font-black uppercase tracking-[0.2em] text-pixel-violet mb-1.5 ml-1">Display Name</label>
          <input v-model="displayName" @input="auth.error = null" type="text" class="w-full bg-white/50 border border-pixel-violet/15 p-3 text-pixel-plum rounded-md focus:border-pixel-violet/50 outline-none transition-all" placeholder="Dr. Aris Thorne" required />
        </div>
        <div>
          <label class="block text-[10px] font-black uppercase tracking-[0.2em] text-pixel-violet mb-1.5 ml-1">Email</label>
          <input v-model="email" @input="auth.error = null" type="email" class="w-full bg-white/50 border border-pixel-violet/15 p-3 text-pixel-plum rounded-md focus:border-pixel-violet/50 outline-none transition-all" placeholder="teacher@test.com" required />
        </div>
        <div>
          <label class="block text-[10px] font-black uppercase tracking-[0.2em] text-pixel-violet mb-1.5 ml-1">Secret Key (Password)</label>
          <input v-model="password" @input="auth.error = null" type="password" class="w-full bg-white/50 border border-pixel-violet/15 p-3 text-pixel-plum rounded-md focus:border-pixel-violet/50 outline-none transition-all" placeholder="••••••••" required />
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

      <p v-if="!isSubmitted" class="mt-8 text-center text-sm font-bold text-pixel-plum/60">
        Already registered? <router-link to="/login" class="text-pixel-violet hover:underline">Login here</router-link>
      </p>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useAuthStore } from '@/stores/auth';

const auth = useAuthStore();
const displayName = ref('');
const email = ref('');
const password = ref('');
const isSubmitted = ref(false);

onMounted(() => {
  auth.error = null; // Clear any previous errors
});

const handleRegister = async () => {
  const success = await auth.registerEducator({ 
    display_name: displayName.value, 
    email: email.value, 
    password: password.value 
  });
  if (success) isSubmitted.value = true;
};
</script>
