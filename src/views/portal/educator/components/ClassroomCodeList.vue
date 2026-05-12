<script setup>
defineProps({
  codes: Array,
  selectedClass: Object
})

defineEmits(['selectClass'])
</script>

<template>
  <div class="pixel-card bg-pixel-plum/5 border-pixel-plum/10">
    <h3 class="text-xs font-black tracking-widest text-pixel-plum/80 uppercase mb-6">
      Access Terminals
    </h3>
    <div class="space-y-4">
      <button
        v-for="code in codes"
        :key="code.code_id"
        @click="$emit('selectClass', code)"
        class="w-full p-4 bg-white border-2 rounded-lg flex items-center justify-between shadow-sm transition-all text-left"
        :class="[
          code.is_active
            ? 'hover:border-pixel-violet/40'
            : 'grayscale opacity-60 cursor-not-allowed',
          selectedClass?.code_id === code.code_id
            ? 'border-pixel-violet ring-2 ring-pixel-violet/20'
            : 'border-pixel-plum/10',
        ]"
      >
        <div>
          <p class="text-xl font-black font-display text-pixel-plum tracking-widest">
            {{ code.code_value }}
          </p>
          <p class="text-pixel-9 font-black text-pixel-plum/40 uppercase mt-1">
            {{ code.students_count }} Students Enrolled
          </p>
        </div>
        <div
          v-if="code.is_active"
          class="w-2 h-2 rounded-full bg-pixel-moss"
          :class="selectedClass?.code_id === code.code_id ? 'animate-ping' : 'animate-pulse'"
        ></div>
        <div
          v-else
          class="text-pixel-9 font-black text-byte-coral uppercase tracking-tighter"
        >
          Inactive
        </div>
      </button>
    </div>
  </div>
</template>

<style scoped>
@reference "@/assets/main.css";
</style>
