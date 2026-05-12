<script setup>
import { ref, onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { playersApi } from '@/api/players'

// Components
import PortalHeader from '@/components/PortalHeader.vue'
import ThreatCard from './components/ThreatCard.vue'
import LoadingSkeleton from '@/components/LoadingSkeleton.vue'

const auth = useAuthStore()
const threats = ref([])
const isLoading = ref(true)

const fetchThreats = async () => {
  isLoading.value = true
  try {
    const data = await playersApi.getThreatIndex()
    // Map backend fields to component props, using local helpers for visuals
    threats.value = data.map(t => ({
      id: t.index_id,
      name: t.threat_name,
      icon: getThreatIcon(t.threat_name),
      unlocked: t.is_unlocked,
      description: getThreatDescription(t.threat_name)
    }))
  } catch (err) {
    console.error('[ThreatIndex] Failed to load intelligence records:', err)
  } finally {
    // Artificial delay for premium feel
    setTimeout(() => {
      isLoading.value = false
    }, 400)
  }
}

onMounted(() => {
  fetchThreats()
})

// Visual Helper: Icons (Keep DB lean by hardcoding these in the UI)
const getThreatIcon = (name) => {
  const icons = {
    'Rogue Software': 'box',
    'Password Attacks': 'key',
    'Phishing': 'mail',
    'Malvertising': 'layout',
    'Malware': 'shield-alert',
    'Man-in-the-Middle': 'users',
    'DDoS': 'zap',
    'Drive-By Download': 'download'
  }
  return icons[name] || 'help-circle'
}

// Visual Helper: Descriptions
const getThreatDescription = (name) => {
  const descriptions = {
    'Rogue Software': 'Unauthorized programs that perform malicious actions while appearing legitimate.',
    'Password Attacks': 'Techniques used to crack or bypass authentication by targeting user credentials.',
    'Phishing': 'Social engineering attacks designed to steal sensitive data via deceptive communications.',
    'Malvertising': 'The use of online advertising to spread malware through legitimate ad networks.',
    'Malware': 'Malicious software designed to infiltrate, damage, or gain unauthorized access to systems.',
    'Man-in-the-Middle': 'Attacks where an adversary intercepts and potentially alters communication between two parties.',
    'DDoS': 'Distributed Denial of Service attacks aimed at overwhelming system resources to cause downtime.',
    'Drive-By Download': 'Unintentional downloads of malicious code that occur when visiting compromised websites.'
  }
  return descriptions[name] || 'Intelligence record pending analysis.'
}
</script>

<template>
  <div class="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 text-pixel-plum">
    <!-- Header -->
    <PortalHeader 
      title="Threat Index"
      :username="auth.username"
      statusLabel="Intelligence"
      statusValue="Digital Adversary Analysis"
      statusColor="coral"
    />

    <!-- Content -->
    <div v-if="isLoading" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      <LoadingSkeleton height="h-64" v-for="i in 8" :key="i" />
    </div>

    <!-- Threat Grid -->
    <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      <ThreatCard 
        v-for="threat in threats" 
        :key="threat.id"
        :threat="threat"
      />
    </div>
  </div>
</template>

<style scoped>
@reference "@/assets/main.css";
</style>
