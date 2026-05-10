<script setup>
import { ref } from 'vue';

const accessCode = ref('');
const isSubmitting = ref(false);
const showSuccess = ref(false);
const error = ref('');

const joinClassroom = async () => {
  if (accessCode.value.length < 6) {
    error.value = 'Access code must be 6 characters.';
    return;
  }

  isSubmitting.value = true;
  error.value = '';
  
  // Simulate API call
  setTimeout(() => {
    isSubmitting.value = false;
    if (accessCode.value.toUpperCase() === 'MORPH9' || accessCode.value.toUpperCase() === 'CYBER2') {
      showSuccess.value = true;
    } else {
      error.value = 'Invalid or inactive access code. Verify with your instructor.';
    }
  }, 1000);
};

const handleInput = (e) => {
  accessCode.value = e.target.value.toUpperCase().slice(0, 6);
};
</script>

<template>
  <div class="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 text-pixel-plum flex flex-col items-center justify-center min-h-[60vh]">
    <div v-if="!showSuccess" class="w-full max-w-md text-center space-y-8">
      <div class="space-y-3">
        <h1 class="text-4xl font-black font-display tracking-tight text-pixel-plum uppercase">Join Unit</h1>
        <p class="text-xs font-bold text-pixel-plum/50 uppercase tracking-widest leading-relaxed">
          Enter the 6-character access code provided by your instructor to join their classroom.
        </p>
      </div>

      <div class="pixel-card bg-white/70 p-10 space-y-8">
        <div class="space-y-4">
          <label class="block text-pixel-10 font-black uppercase tracking-[0.3em] text-pixel-violet">Access Terminal Code</label>
          <input 
            :value="accessCode"
            @input="handleInput"
            type="text" 
            class="w-full text-center bg-pixel-plum/5 border-2 border-pixel-violet/20 p-5 text-3xl font-black font-display tracking-[0.5em] text-pixel-plum rounded-lg focus:border-pixel-violet outline-none transition-all uppercase"
            placeholder="XXXXXX"
            :disabled="isSubmitting"
          />
        </div>

        <transition 
          enter-active-class="transition duration-300 ease-out"
          enter-from-class="transform -translate-y-2 opacity-0"
          enter-to-class="transform translate-y-0 opacity-100"
        >
          <div v-if="error" class="bg-byte-coral/10 border-l-4 border-byte-coral p-4 text-left flex gap-3">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" class="text-byte-coral shrink-0 mt-0.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
            <div>
              <p class="text-pixel-10 font-black text-byte-coral uppercase tracking-widest leading-none mb-1">Terminal Error</p>
              <p class="text-xs font-bold text-pixel-plum/80">{{ error }}</p>
            </div>
          </div>
        </transition>

        <button 
          @click="joinClassroom"
          :disabled="isSubmitting || accessCode.length < 6"
          class="w-full py-5 bg-pixel-violet text-white font-black font-display uppercase tracking-widest rounded-md shadow-pixel-hero hover:brightness-110 disabled:opacity-50 transition-all flex justify-center items-center gap-3"
        >
          <span v-if="isSubmitting" class="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span>
          {{ isSubmitting ? 'Verifying...' : 'Establish Link' }}
        </button>
      </div>
    </div>

    <!-- Success State -->
    <div v-else class="w-full max-w-md text-center space-y-8 animate-in zoom-in duration-500">
      <div class="w-24 h-24 bg-pixel-moss/10 border-4 border-pixel-moss rounded-full flex items-center justify-center mx-auto mb-8 shadow-pixel-soft">
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="4" class="text-pixel-moss"><polyline points="20 6 9 17 4 12"/></svg>
      </div>
      
      <div class="space-y-4">
        <h2 class="text-4xl font-black font-display text-pixel-plum uppercase tracking-tight">Deployment Successful</h2>
        <p class="text-sm font-bold text-pixel-plum/60 leading-relaxed max-w-xs mx-auto">
          You have successfully joined the unit. Your progress is now visible to your instructor.
        </p>
      </div>

      <router-link 
        to="/portal/dashboard" 
        class="inline-block px-10 py-4 bg-pixel-plum text-white font-black font-display uppercase tracking-widest rounded-md hover:brightness-110 transition-all shadow-pixel-soft"
      >
        Return to Dashboard
      </router-link>
    </div>
  </div>
</template>

<style scoped>
@reference "@/assets/main.css";

input::placeholder {
  @apply tracking-[0.5em] opacity-20;
}
</style>
