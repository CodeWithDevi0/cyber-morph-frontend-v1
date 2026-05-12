<script setup>
import { ref, computed, onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useRoute, useRouter } from 'vue-router'
import { mockEducator, mockClassroomCodes } from '@/api/mock'

// Components
import EducatorMetrics from './components/EducatorMetrics.vue'
import StudentProgressTable from './components/StudentProgressTable.vue'
import ClassroomCodeList from './components/ClassroomCodeList.vue'
import GenerateCodeModal from './components/GenerateCodeModal.vue'

const auth = useAuthStore()
const route = useRoute()
const router = useRouter()
const showWelcomeToast = ref(false)

const activeCodes = ref([...mockClassroomCodes])
const allStudents = ref([...mockEducator.assigned_students])
const selectedClass = ref(null)
const showConfirmModal = ref(false)

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

const students = computed(() => {
  if (!selectedClass.value) return allStudents.value
  // Simple mock filtering based on code
  if (selectedClass.value.code_value === 'MORPH9') return allStudents.value.slice(0, 2)
  if (selectedClass.value.code_value === 'CYBER2') return allStudents.value.slice(2, 3)
  return []
})

const confirmGenerateCode = () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  let result = ''
  for (let i = 0; i < 6; i++) result += chars.charAt(Math.floor(Math.random() * chars.length))

  activeCodes.value.unshift({
    code_id: `c${activeCodes.value.length + 1}`,
    code_value: result,
    is_active: true,
    students_count: 0,
    created_at: new Date().toISOString(),
  })
  showConfirmModal.value = false
}

const toggleClassFilter = (code) => {
  selectedClass.value = selectedClass.value?.code_id === code.code_id ? null : code
}
</script>

<template>
  <div class="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 text-pixel-plum pb-12">
    <!-- Success Toast Notification -->
    <transition
      enter-active-class="transition duration-500 ease-out"
      enter-from-class="transform translate-y-20 opacity-0"
      enter-to-class="transform translate-y-0 opacity-100"
      leave-active-class="transition duration-300 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div v-if="showWelcomeToast" class="fixed bottom-8 right-8 z-100 flex items-center gap-4 bg-pixel-moss p-4 rounded-lg shadow-pixel-purple border border-white/20">
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

      <button
        @click="showConfirmModal = true"
        class="inline-flex items-center gap-3 bg-pixel-moss text-white px-6 py-3 rounded-lg font-black font-display text-xs uppercase tracking-widest shadow-pixel-soft hover:brightness-105 transition-all active:scale-95 group"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="group-hover:rotate-90 transition-transform"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
        <span>Generate Access Code</span>
      </button>
    </div>

    <!-- Operational Metrics -->
    <EducatorMetrics 
      :totalStudents="allStudents.length"
      :activeCodes="activeCodes.filter(c => c.is_active).length"
      avgProgress="Map 2.3"
    />

    <div class="grid grid-cols-1 xl:grid-cols-[1fr_350px] gap-8">
      <!-- Student Progress -->
      <StudentProgressTable 
        :students="students"
        :selectedClass="selectedClass"
        @clearFilter="selectedClass = null"
      />

      <!-- Active Classroom Codes -->
      <ClassroomCodeList 
        :codes="activeCodes"
        :selectedClass="selectedClass"
        @selectClass="toggleClassFilter"
      />
    </div>

    <!-- Confirmation Modal -->
    <GenerateCodeModal 
      :show="showConfirmModal"
      @close="showConfirmModal = false"
      @confirm="confirmGenerateCode"
    />
  </div>
</template>

<style scoped>
@reference "@/assets/main.css";
</style>
