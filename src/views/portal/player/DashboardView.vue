<template>
  <div class="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700 text-pixel-plum">
    <!-- Operator Header -->
    <PortalHeader 
      title="Operator Hub"
      :username="auth.username"
      statusLabel="Status"
      statusValue="Online"
      statusColor="moss"
      :lastSyncedAt="auth.user?.last_synced_at"
    />

    <!-- Loading State -->
    <div v-if="isLoading" class="grid grid-cols-1 lg:grid-cols-12 gap-6">
      <div class="lg:col-span-8 h-[300px]">
        <LoadingSkeleton height="h-full" />
      </div>
      <div class="lg:col-span-4 space-y-6">
        <LoadingSkeleton height="h-32" v-for="i in 3" :key="i" />
      </div>
    </div>

    <!-- Main Operational Grid -->
    <template v-else>
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <!-- Deployment Card -->
        <div class="lg:col-span-8">
          <SimulationLaunch :nextMapName="getNextMapName()" class="h-full" />
        </div>

        <!-- Essential Stats Sidebar -->
        <div class="lg:col-span-4">
          <AssetHub 
            :credits="auth.credits" 
            :unlockedThreats="6" 
            unitName="MORPH-9"
            rank="#4"
          />
        </div>
      </div>

      <!-- Tertiary Info Row -->
      <MissionBriefing :session="latestSession" />
    </template>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { sessionsApi } from '@/api/sessions'

// Components
import PortalHeader from '@/components/PortalHeader.vue'
import SimulationLaunch from './components/SimulationLaunch.vue'
import AssetHub from './components/AssetHub.vue'
import MissionBriefing from './components/MissionBriefing.vue'
import LoadingSkeleton from '@/components/LoadingSkeleton.vue'

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
    // Artificial delay for premium feel
    setTimeout(() => {
      isLoading.value = false
    }, 400)
  }
})

const getNextMapName = () => {
  const maps = ['Home', 'Internet Cafe', 'Office', 'Public Park']
  const progress = auth.user?.map_progress || 0
  return maps[progress] || 'All Levels Clear'
}
</script>

<style scoped>
@reference "../../../assets/main.css";
</style>
