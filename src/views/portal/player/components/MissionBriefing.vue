<template>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
    <!-- Last Mission Snippet -->
    <div class="pixel-card flex items-center justify-between p-4 px-6 bg-white/40">
      <div class="flex items-center gap-4">
        <div :class="[
          'w-10 h-10 rounded flex items-center justify-center',
          session ? (session.result === 'win' ? 'bg-pixel-moss/20' : 'bg-byte-coral/20') : 'bg-pixel-plum/10'
        ]">
          <svg
            v-if="session"
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="3"
            :class="session.result === 'win' ? 'text-pixel-moss' : 'text-byte-coral'"
          >
            <path v-if="session.result === 'win'" d="M20 6 9 17l-5-5" />
            <path v-else d="M18 6 6 18M6 6l12 12" />
          </svg>
          <svg
            v-else
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="3"
            class="text-pixel-plum/20"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
        </div>
        <div>
          <p
            class="text-pixel-10 font-black text-pixel-plum/40 uppercase tracking-widest leading-none mb-1"
          >
            Latest Mission: {{ session ? (session.result === 'win' ? 'Success' : 'Failed') : 'No History' }}
          </p>
          <p class="text-sm font-black text-pixel-plum uppercase">
            {{ session ? `${session.map_name} Sector` : 'Pending Deployment' }}
          </p>
        </div>
      </div>
      <div class="text-right" v-if="session">
        <p :class="[
          'text-sm font-black',
          session.credits_earned > session.credits_lost ? 'text-pixel-moss' : 'text-byte-coral'
        ]">
          {{ session.credits_earned > session.credits_lost ? '+' : '' }}{{ session.credits_earned - session.credits_lost }} CR
        </p>
        <p class="text-pixel-9 font-black text-pixel-plum/30 uppercase">{{ formatRelativeTime(session.played_at) }}</p>
      </div>
    </div>

    <!-- Quick Tips -->
    <div
      class="pixel-card flex items-center gap-4 p-4 px-6 bg-signal-gold/5 border-signal-gold/20"
    >
      <div class="w-10 h-10 rounded bg-signal-gold/20 flex items-center justify-center shrink-0">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="3"
          class="text-signal-gold"
        >
          <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A5 5 0 0 0 8 8" />
          <path d="M9 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5" />
          <line x1="12" y1="22" x2="12" y2="18" />
          <line x1="8" y1="18" x2="16" y2="18" />
        </svg>
      </div>
      <div>
        <p
          class="text-pixel-10 font-black text-signal-gold uppercase tracking-widest leading-none mb-1"
        >
          Security Briefing
        </p>
        <p class="text-xs font-bold text-pixel-plum/70 italic">
          "{{ tip }}"
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { formatRelativeTime } from '@/utils/formatters'

defineProps({
  session: Object,
  tip: {
    type: String,
    default: 'Always verify the sender\'s identity before clicking encrypted links.'
  }
})
</script>
