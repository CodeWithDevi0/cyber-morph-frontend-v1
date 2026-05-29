<script setup>
import { ref, computed } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { sessionsApi } from '@/api/sessions'
import { mockMaps } from '@/api/mock'

// Components
import PortalHeader from '@/components/PortalHeader.vue'
import MapGrid from './components/MapGrid.vue'
import MapDetailSidebar from './components/MapDetailSidebar.vue'

const auth = useAuthStore()

const selectedMapId = ref(0)
const isLaunching = ref(false)
const launchError = ref(null)

const selectedMap = computed(() => {
  return mockMaps.find((m) => m.id === selectedMapId.value) || mockMaps[0]
})

const selectMap = (id) => {
  selectedMapId.value = id
}

const launchSimulation = async () => {
  isLaunching.value = true
  launchError.value = null
  
  try {
    const session = await sessionsApi.startSession(selectedMap.value.name)
    console.log('[MissionHub] Session started:', session)
    
    alert(
      `SESSION INITIALIZED: ${session.session_id}\n\nTARGET: ${selectedMap.value.name}\n\nNote: In a live environment, the Godot Engine would now launch using this session ID.`,
    )
  } catch (err) {
    launchError.value = err.response?.data?.detail || 'Failed to initialize session. Connection lost.'
    console.error('[MissionHub] Launch error:', err)
  } finally {
    isLaunching.value = false
  }
}
</script>

<template>
  <div class="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 text-pixel-plum">
    <!-- Hub Header -->
    <PortalHeader 
      title="Mission Hub"
      :username="auth.username"
      statusLabel="Operation"
      statusValue="Tactical Deployment"
      statusColor="gold"
    />

    <div class="grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-8">
      <!-- Map Selection Grid -->
      <MapGrid 
        :maps="mockMaps" 
        :selectedId="selectedMapId" 
        :progress="auth.user?.map_progress || 0"
        @select="selectMap"
      />

      <!-- Selection Details Sidebar -->
      <MapDetailSidebar 
        :map="selectedMap" 
        :isLaunching="isLaunching" 
        :error="launchError"
        @launch="launchSimulation"
      />
    </div>
  </div>
</template>

<style scoped>
@reference "@/assets/main.css";
</style>
