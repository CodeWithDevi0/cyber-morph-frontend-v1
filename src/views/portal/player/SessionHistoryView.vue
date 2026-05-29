<script setup>
import { ref, computed, onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { sessionsApi } from '@/api/sessions'

// Components
import PortalHeader from '@/components/PortalHeader.vue'
import StatsSummary from './components/StatsSummary.vue'
import HistoryTable from './components/HistoryTable.vue'
import LoadingSkeleton from '@/components/LoadingSkeleton.vue'

const auth = useAuthStore()
const sessions = ref([])
const isLoading = ref(true)

const fetchHistory = async () => {
  isLoading.value = true
  try {
    const data = await sessionsApi.getHistory()
    sessions.value = data
  } catch (err) {
    console.error('[History] Failed to load mission logs:', err)
  } finally {
    // Artificial delay for premium feel
    setTimeout(() => {
      isLoading.value = false
    }, 400)
  }
}

onMounted(() => {
  fetchHistory()
})

// Sort sessions by date (most recent first)
const sortedSessions = computed(() => {
  return [...sessions.value].sort((a, b) => new Date(b.played_at) - new Date(a.played_at))
})

const stats = computed(() => {
  const cleared = sessions.value.filter(s => s.result === 'win').length
  const failed = sessions.value.length - cleared
  const totalCredits = sessions.value.reduce((acc, s) => acc + (s.credits_earned - s.credits_lost), 0)
  
  return { cleared, failed, totalCredits }
})
</script>

<template>
  <div class="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 text-pixel-plum">
    <!-- Header -->
    <PortalHeader 
      title="Mission History"
      :username="auth.username"
      statusLabel="Personnel Record"
      :statusValue="auth.username"
      statusColor="violet"
    >
      <template #actions>
        <StatsSummary :stats="stats" />
      </template>
    </PortalHeader>

    <!-- Content -->
    <div v-if="isLoading" class="space-y-4">
      <LoadingSkeleton height="h-[400px]" />
    </div>

    <HistoryTable v-else :sessions="sortedSessions" />
  </div>
</template>

<style scoped>
@reference "@/assets/main.css";
</style>
