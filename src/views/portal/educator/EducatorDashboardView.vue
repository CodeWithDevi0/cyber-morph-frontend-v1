<script setup>
import { ref, onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useRoute, useRouter } from 'vue-router'
import { mockEducator, mockClassroomCodes } from '@/api/mock'

// Components
import EducatorMetrics from './components/EducatorMetrics.vue'
import ClassThreatHeatmap from './components/ClassThreatHeatmap.vue'
import PerformanceTrendChart from './components/PerformanceTrendChart.vue'
import ClassLeaderboard from './components/ClassLeaderboard.vue'
import InstructorBroadcast from './components/InstructorBroadcast.vue'

const auth = useAuthStore()
const route = useRoute()
const router = useRouter()
const showWelcomeToast = ref(false)

const activeCodes = ref([...mockClassroomCodes])
const allStudents = ref([...mockEducator.assigned_students])

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
</script>

<template>
  <div class="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 text-pixel-plum pb-12 relative">
    <!-- Success Toast Notification -->
    <transition
      enter-active-class="transition duration-500 ease-out"
      enter-from-class="transform translate-y-20 opacity-0"
      enter-to-class="transform translate-y-0 opacity-100"
      leave-active-class="transition duration-300 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div v-if="showWelcomeToast" class="fixed bottom-8 right-8 z-50 flex items-center gap-4 bg-pixel-moss p-4 rounded-lg shadow-pixel-purple border border-white/20">
        <div class="w-10 h-10 bg-white/20 rounded flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
        </div>
        <div>
          <p class="text-pixel-10 font-black text-white/70 uppercase tracking-widest leading-none mb-1.5">Secure Link Established</p>
          <p class="text-sm font-black text-white font-display uppercase tracking-tight">Educator Access Granted</p>
        </div>
      </div>
    </transition>

    <!-- Instructor Header -->
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b-2 border-pixel-plum/10 pb-6">
      <div>
        <div class="flex items-center gap-3 mb-1">
          <div class="w-2 h-2 rounded-full bg-pixel-moss animate-pulse"></div>
          <h1 class="text-3xl font-black font-display tracking-tight text-pixel-plum uppercase">Instructor Command</h1>
        </div>
        <p class="text-pixel-10 text-pixel-plum/50 uppercase font-black tracking-[0.2em] flex items-center gap-2">
          Identity: <span class="text-pixel-moss">{{ auth.user?.display_name || mockEducator.display_name }}</span> 
          <span class="mx-1 opacity-30">|</span> 
          Rank: <span class="text-pixel-violet">Senior Educator</span>
        </p>
      </div>
    </div>

    <!-- Top Row: Metrics -->
    <EducatorMetrics 
      :totalStudents="allStudents.length"
      :activeCodes="activeCodes.filter(c => c.is_active).length"
      avgProgress="Map 2.3"
    />

    <div class="grid grid-cols-1 xl:grid-cols-2 gap-8">
      <!-- Analytics -->
      <div class="space-y-8">
        <ClassThreatHeatmap />
        <PerformanceTrendChart />
      </div>

      <!-- Tactical Widgets -->
      <div class="space-y-8">
        <InstructorBroadcast />
        <ClassLeaderboard />
      </div>
    </div>
  </div>
</template>

<style scoped>
@reference "@/assets/main.css";
</style>
