<script setup>
import { useAuthStore } from '@/stores/auth'
import { mockThreats } from '@/api/mock'

// Components
import PortalHeader from '@/components/PortalHeader.vue'
import ThreatCard from './components/ThreatCard.vue'

const auth = useAuthStore()
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

    <!-- Threat Grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      <ThreatCard 
        v-for="threat in mockThreats" 
        :key="threat.id"
        :threat="threat"
      />
    </div>
  </div>
</template>

<style scoped>
@reference "@/assets/main.css";
</style>
