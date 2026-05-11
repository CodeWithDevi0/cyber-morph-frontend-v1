<template>
  <div class="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700 text-pixel-plum">
    <!-- Operator Header -->
    <div
      class="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b-2 border-pixel-plum/10 pb-6"
    >
      <div>
        <div class="flex items-center gap-3 mb-1">
          <div class="w-2 h-2 rounded-full bg-pixel-violet animate-pulse"></div>
          <h1 class="text-3xl font-black font-display tracking-tight text-pixel-plum uppercase">
            Operator Hub
          </h1>
        </div>
        <p
          class="text-pixel-10 text-pixel-plum/50 uppercase font-black tracking-[0.2em] flex items-center gap-2"
        >
          Identity: <span class="text-pixel-violet">{{ auth.username }}</span>
          <span class="mx-1 opacity-30">|</span>
          Status: <span class="text-pixel-moss">Online</span>
          <span class="mx-1 opacity-30">|</span>
          Sync:
          {{ auth.user?.last_synced_at ? formatDate(auth.user.last_synced_at) : 'Local only' }}
        </p>
      </div>

      <div
        class="flex items-center gap-4 bg-white/50 backdrop-blur-sm p-2 px-4 rounded-lg border border-pixel-plum/5"
      >
        <div class="text-right">
          <p class="text-pixel-10 font-black text-pixel-plum/40 uppercase tracking-widest">
            Network Node
          </p>
          <p class="text-sm font-black text-pixel-plum uppercase">CM-GLOBAL-01</p>
        </div>
        <div class="w-px h-8 bg-pixel-plum/10"></div>
        <div class="w-8 h-8 rounded bg-pixel-plum/5 flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="3"
            class="text-pixel-plum/30"
          >
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
          </svg>
        </div>
      </div>
    </div>

    <!-- Main Operational Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
      <!-- Deployment Card (The Big Action) -->
      <div
        class="lg:col-span-8 group relative overflow-hidden bg-pixel-plum rounded-xl p-8 text-white shadow-pixel-hero transition-all hover:scale-[1.01] active:scale-[0.99]"
      >
        <!-- Decorative Background Pattern -->
        <div
          class="absolute top-0 right-0 opacity-10 translate-x-1/4 -translate-y-1/4 scale-150 pointer-events-none"
        >
          <svg width="400" height="400" viewBox="0 0 100 100">
            <path
              d="M10 10L90 90M90 10L10 90"
              stroke="currentColor"
              stroke-width="1"
              stroke-dasharray="2 2"
            />
          </svg>
        </div>

        <div class="relative z-10 h-full flex flex-col justify-between">
          <div>
            <span
              class="inline-block px-3 py-1 bg-white/20 rounded text-pixel-10 font-black uppercase tracking-[0.25em] mb-4"
            >
              Mission Ready
            </span>
            <h2 class="text-5xl font-black font-display uppercase tracking-tight mb-2">
              Deploy Simulation
            </h2>
            <p
              class="text-white/60 font-bold uppercase tracking-widest text-xs flex items-center gap-2"
            >
              Target Sector: <span class="text-signal-gold">{{ getNextMapName() }}</span>
            </p>
          </div>

          <div class="mt-12">
            <router-link
              to="/portal/mission-hub"
              class="inline-flex items-center gap-4 bg-white text-pixel-plum px-8 py-4 rounded-lg font-black font-display uppercase tracking-widest shadow-pixel-soft hover:bg-signal-gold hover:text-white transition-all group/btn"
            >
              <span>Initiate Launch</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="3"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="group-hover/btn:translate-x-2 transition-transform"
              >
                <path d="m9 18 6-6-6-6" />
              </svg>
            </router-link>
          </div>
        </div>
      </div>

      <!-- Essential Stats Sidebar -->
      <div class="lg:col-span-4 grid grid-cols-1 gap-6">
        <!-- Asset Hub -->
        <div class="pixel-card border-l-4 border-l-pixel-violet">
          <p class="stat-label-pixel">Security Credits</p>
          <div class="flex items-end justify-between">
            <span class="text-3xl font-black text-pixel-plum">{{ auth.credits }}</span>
            <span class="text-pixel-10 text-pixel-plum/40 font-black uppercase tracking-widest mb-1"
              >Total CR</span
            >
          </div>
          <div class="mt-3 h-1.5 w-full bg-pixel-plum/5 rounded-full overflow-hidden">
            <div
              class="h-full bg-pixel-violet"
              :style="{ width: Math.min((auth.credits / 2000) * 100, 100) + '%' }"
            ></div>
          </div>
        </div>

        <!-- Intel Mastery -->
        <div class="pixel-card border-l-4 border-l-byte-coral">
          <p class="stat-label-pixel">Intel Mastery</p>
          <div class="flex items-end justify-between">
            <span class="text-3xl font-black text-pixel-plum">6/12</span>
            <span class="text-pixel-10 text-pixel-plum/40 font-black uppercase tracking-widest mb-1"
              >Threats</span
            >
          </div>
          <div class="mt-3 h-1.5 w-full bg-pixel-plum/5 rounded-full overflow-hidden">
            <div class="h-full bg-byte-coral" style="width: 50%"></div>
          </div>
        </div>

        <!-- Unit/Classroom Status -->
        <div class="pixel-card border-l-4 border-l-pixel-moss">
          <p class="stat-label-pixel">Unit Assignment</p>
          <div class="flex items-center justify-between">
            <div>
              <p class="text-lg font-black text-pixel-plum uppercase tracking-tighter">MORPH-9</p>
              <p class="text-pixel-10 text-pixel-plum/40 font-black uppercase">Rank #4 In Sector</p>
            </div>
            <div class="w-10 h-10 rounded bg-pixel-moss/10 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2.5"
                class="text-pixel-moss"
              >
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Tertiary Info Row -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- Last Mission Snippet -->
      <div class="pixel-card flex items-center justify-between p-4 px-6 bg-white/40">
        <div class="flex items-center gap-4">
          <div :class="[
            'w-10 h-10 rounded flex items-center justify-center',
            latestSession ? (latestSession.result === 'win' ? 'bg-pixel-moss/20' : 'bg-byte-coral/20') : 'bg-pixel-plum/10'
          ]">
            <svg
              v-if="latestSession"
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="3"
              :class="latestSession.result === 'win' ? 'text-pixel-moss' : 'text-byte-coral'"
            >
              <path v-if="latestSession.result === 'win'" d="M20 6 9 17l-5-5" />
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
              Latest Mission: {{ latestSession ? (latestSession.result === 'win' ? 'Success' : 'Failed') : 'No History' }}
            </p>
            <p class="text-sm font-black text-pixel-plum uppercase">
              {{ latestSession ? `${latestSession.map_name} Sector` : 'Pending Deployment' }}
            </p>
          </div>
        </div>
        <div class="text-right" v-if="latestSession">
          <p :class="[
            'text-sm font-black',
            latestSession.credits_earned > latestSession.credits_lost ? 'text-pixel-moss' : 'text-byte-coral'
          ]">
            {{ latestSession.credits_earned > latestSession.credits_lost ? '+' : '' }}{{ latestSession.credits_earned - latestSession.credits_lost }} CR
          </p>
          <p class="text-pixel-9 font-black text-pixel-plum/30 uppercase">{{ formatRelativeTime(latestSession.played_at) }}</p>
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
            "Always verify the sender's identity before clicking encrypted links."
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { sessionsApi } from '@/api/sessions'

const auth = useAuthStore()
const latestSession = ref(null)
const isLoading = ref(true)

onMounted(async () => {
  try {
    const history = await sessionsApi.getHistory()
    if (history && history.length > 0) {
      latestSession.value = history[0]
    }
  } catch (err) {
    console.error('[Dashboard] Failed to fetch session history:', err)
  } finally {
    isLoading.value = false
  }
})

const getNextMapName = () => {
  const maps = ['Home', 'Internet Cafe', 'Office', 'Public Park']
  const progress = auth.progress || 0
  return maps[progress] || 'All Levels Clear'
}

const formatDate = (dateStr) => {
  if (!dateStr) return 'N/A'
  try {
    const date = new Date(dateStr)
    if (isNaN(date.getTime())) return 'N/A'
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  } catch (err) {
    console.warn('[Dashboard] Date formatting error:', err)
    return 'N/A'
  }
}

const formatRelativeTime = (dateStr) => {
  if (!dateStr) return ''
  const date = new Date(dateStr)
  const now = new Date()
  const diffInMinutes = Math.floor((now - date) / (1000 * 60))
  
  if (diffInMinutes < 1) return 'Just now'
  if (diffInMinutes < 60) return `${diffInMinutes}m ago`
  
  const diffInHours = Math.floor(diffInMinutes / 60)
  if (diffInHours < 24) return `${diffInHours}h ago`
  
  return formatDate(dateStr)
}
</script>

<style scoped>
@reference "../../../assets/main.css";

.stat-label-pixel {
  @apply text-pixel-10 uppercase font-black tracking-[0.2em] text-pixel-plum/40 mb-2 ml-1;
}
</style>
