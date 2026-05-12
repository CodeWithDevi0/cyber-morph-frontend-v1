<template>
  <div class="animate-pulse flex flex-col space-y-4">
    <div :class="['bg-pixel-plum/5 rounded', height, width]"></div>
  </div>
</template>

<script setup>
defineProps({
  height: { type: String, default: 'h-4' },
  width: { type: String, default: 'w-full' }
})
</script>
