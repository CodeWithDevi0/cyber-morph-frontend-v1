<script setup>
defineProps({
  codes: Array,
  selectedClass: Object
})

defineEmits(['selectClass', 'deleteCode'])
</script>

<template>
  <div class="pixel-card bg-pixel-plum/5 border-pixel-plum/10">
    <h3 class="text-xs font-black tracking-widest text-pixel-plum/80 uppercase mb-6">
      Operational Access Units
    </h3>
    <div class="space-y-4">
      <div
        v-for="code in codes"
        :key="code.code_id"
        class="w-full p-4 bg-white border-2 rounded-lg flex items-center justify-between shadow-sm transition-all group relative"
        :class="[
          selectedClass?.code_id === code.code_id
            ? 'border-pixel-violet ring-2 ring-pixel-violet/20'
            : 'border-pixel-plum/10',
        ]"
      >
        <div 
          class="flex-1 cursor-pointer"
          @click="$emit('selectClass', code)"
        >
          <p class="text-xl font-black font-display text-pixel-plum tracking-widest">
            {{ code.code_value }}
          </p>
          <p class="text-pixel-9 font-black text-pixel-plum/40 uppercase mt-1">
            {{ code.students_count }} Students Enrolled
          </p>
        </div>

        <div class="flex items-center gap-4">
          <button 
            @click.stop="$emit('deleteCode', code.code_id)"
            class="p-2 text-byte-coral hover:bg-byte-coral/10 rounded transition-colors opacity-0 group-hover:opacity-100"
            title="Terminate Unit"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@reference "@/assets/main.css";
</style>
