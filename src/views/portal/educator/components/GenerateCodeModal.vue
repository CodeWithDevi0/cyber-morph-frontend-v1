<script setup>
defineProps({
  show: Boolean
})

defineEmits(['close', 'confirm'])
</script>

<template>
  <Teleport to="body">
    <transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div v-if="show" class="fixed inset-0 z-200 flex items-center justify-center p-4">
        <div class="absolute inset-0 bg-pixel-plum/40 backdrop-blur-sm" @click="$emit('close')"></div>

        <div class="relative w-full max-w-sm bg-white border-2 border-pixel-violet/30 shadow-pixel-hero p-8 rounded-lg animate-in zoom-in-95 duration-200 text-center">
          <div class="w-16 h-16 bg-pixel-moss/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-pixel-moss/20">
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" class="text-pixel-moss" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M5 12h14" /><path d="M12 5v14" />
            </svg>
          </div>
          <h3 class="text-xl font-black text-pixel-plum font-display uppercase tracking-tight">New Terminal Code</h3>
          <p class="mt-2 text-xs font-bold text-pixel-plum/60 leading-relaxed uppercase tracking-widest mb-8">
            Are you sure you want to initialize a new classroom access code? This will create a unique entry point for new students.
          </p>

          <div class="grid grid-cols-2 gap-3">
            <button
              @click="$emit('close')"
              class="py-3 px-4 border border-pixel-plum/10 text-pixel-plum font-black text-pixel-10 uppercase tracking-widest rounded hover:bg-pixel-plum/5 transition-all"
            >
              Cancel
            </button>
            <button
              @click="$emit('confirm')"
              class="py-3 px-4 bg-pixel-moss text-white font-black text-pixel-10 uppercase tracking-widest rounded shadow-pixel-soft hover:brightness-110 transition-all"
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </transition>
  </Teleport>
</template>

<style scoped>
@reference "@/assets/main.css";
</style>
