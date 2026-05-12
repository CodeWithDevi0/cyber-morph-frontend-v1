<template>
  <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b-2 border-pixel-plum/10 pb-6">
    <div>
      <div class="flex items-center gap-3 mb-1">
        <div class="w-2 h-2 rounded-full bg-pixel-violet animate-pulse"></div>
        <h1 class="text-3xl font-black font-display tracking-tight text-pixel-plum uppercase">
          {{ title }}
        </h1>
      </div>
      <p class="text-pixel-10 text-pixel-plum/50 uppercase font-black tracking-[0.2em] flex items-center gap-2">
        Identity: <span class="text-pixel-violet">{{ username }}</span> 
        <span class="mx-1 opacity-30">|</span> 
        {{ statusLabel }}: <span :class="statusColorClass">{{ statusValue }}</span>
        <template v-if="lastSyncedAt">
          <span class="mx-1 opacity-30">|</span> 
          Sync: <span class="text-pixel-plum/60">{{ formatDate(lastSyncedAt) }}</span>
        </template>
      </p>
    </div>

    <!-- Optional Slot for Action Buttons (like "New Session") -->
    <slot name="actions"></slot>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { formatDate } from '@/utils/formatters'

const props = defineProps({
  title: String,
  username: String,
  statusLabel: { type: String, default: 'Status' },
  statusValue: { type: String, default: 'Online' },
  statusColor: { type: String, default: 'moss' }, // moss, violet, gold, coral
  lastSyncedAt: String
})

const statusColorClass = computed(() => {
  const colors = {
    moss: 'text-pixel-moss',
    violet: 'text-pixel-violet',
    gold: 'text-signal-gold',
    coral: 'text-byte-coral'
  }
  return colors[props.statusColor] || 'text-pixel-plum'
})
</script>
