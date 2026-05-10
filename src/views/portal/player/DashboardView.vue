<template>
  <div class="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 text-pixel-plum">
    <!-- Success Toast Notification -->
    <transition
      enter-active-class="transition duration-500 ease-out"
      enter-from-class="transform translate-y-20 opacity-0"
      enter-to-class="transform translate-y-0 opacity-100"
      leave-active-class="transition duration-300 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="showWelcomeToast"
        class="fixed bottom-8 right-8 z-100 flex items-center gap-4 bg-pixel-violet p-4 rounded-lg shadow-pixel-purple border border-white/20"
      >
        <div class="w-10 h-10 bg-white/20 rounded flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            stroke-width="3"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M20 6 9 17l-5-5" />
          </svg>
        </div>
        <div>
          <p
            class="text-10 font-black text-white/70 uppercase tracking-widest leading-none mb-1.5"
          >
            Secure Link Established
          </p>
          <p class="text-sm font-black text-white font-display">TERMINAL ACCESS GRANTED</p>
        </div>
        <button
          @click="showWelcomeToast = false"
          class="ml-4 text-white/40 hover:text-white transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>
        </button>
      </div>
    </transition>

    <!-- Header -->
    <div class="flex flex-col md:flex-row md:items-end justify-between gap-4">
      <div>
        <h1 class="text-4xl font-black font-display tracking-tight text-pixel-plum uppercase">
          Dashboard
        </h1>
        <p
          class="text-10 text-pixel-plum/60 uppercase font-black tracking-[0.25em] mt-2 flex items-center gap-2"
        >
          <span class="w-2 h-2 rounded-full bg-pixel-violet animate-pulse"></span>
          Active Session: {{ auth.username }}
          <span class="mx-2 text-pixel-plum/20">|</span>
          <span class="flex items-center gap-1.5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="10"
              height="10"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="3"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="text-pixel-plum/40"
            >
              <path d="M17.5 19a5.5 5.5 0 0 0 2-10.36A7.5 7.5 0 0 0 5 9c0 3 3 3 3 3" />
              <path d="M12 11v9" />
              <path d="m9 17 3 3 3-3" />
            </svg>
            Cloud Sync:
            {{ auth.user?.last_synced_at ? formatDate(auth.user.last_synced_at) : 'Local Only' }}
          </span>
        </p>
      </div>

      <div class="flex gap-4">
        <router-link
          to="/portal/mission-hub"
          class="btn-pixel group px-6 py-2.5 bg-pixel-violet text-white font-black font-display text-sm flex items-center gap-2 rounded-md shadow-pixel-purple hover:brightness-105 transition-all active:scale-95"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="3"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="group-hover:translate-x-0.5 transition-transform"
          >
            <polygon points="5 3 19 12 5 21 5 3" />
          </svg>
          Quick Launch
        </router-link>
      </div>
    </div>

    <!-- Stats Grid -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div class="pixel-card group border-l-4 border-l-pixel-violet">
        <p class="stat-label-pixel">Security Credits</p>
        <div class="flex items-end gap-2">
          <span
            class="text-4xl font-black text-pixel-plum group-hover:text-pixel-violet transition-colors"
            >{{ auth.credits }}</span
          >
          <span class="text-11 text-pixel-plum/50 font-black mb-2 uppercase tracking-widest"
            >Credits</span
          >
        </div>
        <div
          class="mt-4 h-2 w-full bg-pixel-plum/10 rounded-full overflow-hidden border border-pixel-plum/5"
        >
          <div
            class="h-full bg-pixel-violet transition-all duration-1000 shadow-[0_0_8px_rgba(125,92,255,0.4)]"
            :style="{ width: Math.min((auth.credits / 2000) * 100, 100) + '%' }"
          ></div>
        </div>
      </div>

      <div class="pixel-card group border-l-4 border-l-pixel-sky">
        <p class="stat-label-pixel">Map Progress</p>
        <div class="flex items-end gap-2">
          <span
            class="text-4xl font-black text-pixel-plum group-hover:text-pixel-sky transition-colors"
            >{{ auth.progress }}/4</span
          >
          <span class="text-11 text-pixel-plum/50 font-black mb-2 uppercase tracking-widest"
            >Unlocked</span
          >
        </div>
        <div
          class="mt-4 h-2 w-full bg-pixel-plum/10 rounded-full overflow-hidden border border-pixel-plum/5"
        >
          <div
            class="h-full bg-pixel-sky transition-all duration-1000 shadow-[0_0_8px_rgba(158,220,247,0.4)]"
            :style="{ width: (auth.progress / 4) * 100 + '%' }"
          ></div>
        </div>
      </div>

      <div
        class="pixel-card bg-pixel-violet/5 border-pixel-violet/20 flex flex-col justify-center text-center"
      >
        <p class="text-10 uppercase font-black text-pixel-violet/70 mb-2 tracking-widest">
          Current Target
        </p>
        <p class="text-xl font-black text-pixel-plum font-display uppercase tracking-tight">
          {{ getNextMapName() }}
        </p>
        <button
          class="mt-4 text-10 font-black uppercase tracking-widest text-pixel-violet hover:brightness-75 transition-all"
        >
          Mission Details
        </button>
      </div>
    </div>

    <!-- Recent Activity -->
    <div class="pixel-card">
      <div class="flex items-center justify-between mb-8 pb-4 border-b border-pixel-plum/10">
        <h3 class="text-xs font-black tracking-[0.2em] text-pixel-plum/80 uppercase font-display">
          Mission Logs
        </h3>
        <router-link
          to="/portal/history"
          class="text-10 font-black text-pixel-violet hover:underline tracking-[0.15em] uppercase"
          >Full History</router-link
        >
      </div>

      <div class="overflow-x-auto">
        <table class="w-full text-left">
          <thead>
            <tr>
              <th
                class="pb-4 text-10 uppercase text-pixel-plum/50 font-black tracking-widest px-2"
              >
                Map
              </th>
              <th
                class="pb-4 text-10 uppercase text-pixel-plum/50 font-black tracking-widest px-2"
              >
                Status
              </th>
              <th
                class="pb-4 text-10 uppercase text-pixel-plum/50 font-black tracking-widest px-2 text-right"
              >
                Yield
              </th>
              <th
                class="pb-4 text-10 uppercase text-pixel-plum/50 font-black tracking-widest px-2 text-right"
              >
                Timestamp
              </th>
            </tr>
          </thead>
          <tbody class="divide-y divide-pixel-plum/5">
            <tr
              v-for="session in mockSessions.slice(0, 3)"
              :key="session.session_id"
              class="group hover:bg-pixel-violet/0.03 transition-colors"
            >
              <td class="py-5 px-2">
                <div class="flex items-center gap-3">
                  <div
                    class="w-2.5 h-2.5 rounded-sm shadow-sm"
                    :class="session.result === 'win' ? 'bg-pixel-moss' : 'bg-byte-coral'"
                  ></div>
                  <span class="text-sm font-black text-pixel-plum/90">{{
                    session.map_name
                  }}</span>
                </div>
              </td>
              <td class="py-5 px-2">
                <span
                  class="text-9 px-2.5 py-1 border-2 rounded font-black tracking-widest uppercase"
                  :class="
                    session.result === 'win'
                      ? 'border-pixel-moss/40 text-pixel-moss bg-pixel-moss/10'
                      : 'border-byte-coral/40 text-byte-coral bg-byte-coral/10'
                  "
                >
                  {{ session.result === 'win' ? 'Cleared' : 'Failed' }}
                </span>
              </td>
              <td class="py-5 px-2 text-right">
                <div class="flex flex-col items-end">
                  <span class="text-sm font-black text-pixel-moss"
                    >+{{ session.credits_earned }}</span
                  >
                  <span class="text-9 text-byte-coral/80 font-bold font-mono"
                    >-{{ session.credits_lost }}</span
                  >
                </div>
              </td>
              <td
                class="py-5 px-2 text-right text-10 text-pixel-plum/50 font-black font-mono"
              >
                {{ formatDate(session.played_at) }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { mockSessions } from '@/api/mock'
import { useRoute, useRouter } from 'vue-router'

const auth = useAuthStore()
const route = useRoute()
const router = useRouter()
const showWelcomeToast = ref(false)

onMounted(() => {
  if (route.query.login === 'success') {
    router.replace({ query: {} })
    setTimeout(() => {
      showWelcomeToast.value = true
      setTimeout(() => {
        showWelcomeToast.value = false
      }, 3000)
    }, 500)
  }
})

const getNextMapName = () => {
  const maps = ['Home', 'Internet Cafe', 'Office', 'Public Park']
  return maps[auth.progress] || 'All Levels Clear'
}

const formatDate = (dateStr) => {
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}
</script>

<style scoped>
@reference "../../../assets/main.css";

.stat-label-pixel {
  @apply text-[10px] uppercase font-black tracking-[0.2em] text-pixel-plum/60 mb-2 ml-1;
}
</style>
