<template>
  <div class="pixel-card overflow-hidden">
    <div class="overflow-x-auto">
      <table class="w-full text-left" v-if="sessions.length > 0">
        <thead>
          <tr class="border-b border-pixel-plum/10">
            <th class="pb-4 text-pixel-10 uppercase text-pixel-plum/50 font-black tracking-widest px-4">Mission Target</th>
            <th class="pb-4 text-pixel-10 uppercase text-pixel-plum/50 font-black tracking-widest px-4">Deployment Status</th>
            <th class="pb-4 text-pixel-10 uppercase text-pixel-plum/50 font-black tracking-widest px-4 text-right">Credit Delta</th>
            <th class="pb-4 text-pixel-10 uppercase text-pixel-plum/50 font-black tracking-widest px-4 text-right">Duration</th>
            <th class="pb-4 text-pixel-10 uppercase text-pixel-plum/50 font-black tracking-widest px-4 text-right">Timestamp</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-pixel-plum/5">
          <tr v-for="session in sessions" :key="session.session_id" class="group hover:bg-pixel-violet/5 transition-colors">
            <td class="py-5 px-4">
              <div class="flex items-center gap-3">
                <div class="w-3 h-3 rounded-sm shadow-sm" :class="session.result === 'win' ? 'bg-pixel-moss' : 'bg-byte-coral'"></div>
                <div class="flex flex-col">
                  <span class="text-sm font-black text-pixel-plum">{{ session.map_name }}</span>
                  <span class="text-pixel-9 text-pixel-plum/40 font-bold uppercase tracking-wider">Sector ID: 00{{ session.session_id.slice(0, 4) }}</span>
                </div>
              </div>
            </td>
            <td class="py-5 px-4">
              <span class="text-pixel-9 px-3 py-1 border-2 rounded font-black tracking-widest uppercase" 
                    :class="session.result === 'win' ? 'border-pixel-moss/30 text-pixel-moss bg-pixel-moss/5' : 'border-byte-coral/30 text-byte-coral bg-byte-coral/5'">
                {{ session.result === 'win' ? 'SUCCESS' : 'FAILURE' }}
              </span>
            </td>
            <td class="py-5 px-4 text-right">
              <div class="flex flex-col items-end">
                <span class="text-sm font-black text-pixel-moss" v-if="session.credits_earned > 0">+{{ session.credits_earned }}</span>
                <span class="text-pixel-9 text-byte-coral/70 font-bold font-mono" v-if="session.credits_lost > 0">-{{ session.credits_lost }}</span>
                <span class="text-sm font-black text-pixel-plum/20" v-if="session.credits_earned === 0 && session.credits_lost === 0">0 CR</span>
              </div>
            </td>
            <td class="py-5 px-4 text-right text-xs font-bold text-pixel-plum/70 font-mono">
              {{ formatDuration(session.duration_seconds) }}
            </td>
            <td class="py-5 px-4 text-right">
              <div class="flex flex-col items-end">
                <span class="text-xs font-bold text-pixel-plum/70">{{ formatDate(session.played_at) }}</span>
                <span class="text-pixel-10 text-pixel-plum/40 font-black font-mono">{{ formatTime(session.played_at) }}</span>
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- Empty State -->
      <div v-else class="py-20 text-center">
        <p class="text-pixel-plum/40 font-black uppercase tracking-widest">No mission logs found in system database</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { formatDate, formatTime, formatDuration } from '@/utils/formatters'

defineProps({
  sessions: {
    type: Array,
    required: true
  }
})
</script>

<style scoped>
@reference "../../../../assets/main.css";
</style>
