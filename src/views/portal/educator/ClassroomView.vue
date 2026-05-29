<script setup>
import { ref, computed } from 'vue'
import { mockEducator, mockClassroomCodes } from '@/api/mock'

// Components
import StudentProgressTable from './components/StudentProgressTable.vue'
import StudentCombatRecord from './components/StudentCombatRecord.vue'

const allStudents = ref([...mockEducator.assigned_students])
const classroomCodes = ref([...mockClassroomCodes])
const selectedCode = ref('all')
const selectedStudent = ref(null)
const showCombatRecord = ref(false)

const filteredStudents = computed(() => {
  if (selectedCode.value === 'all') return allStudents.value
  return allStudents.value.filter(s => s.classroom_code === selectedCode.value)
})

const openCombatRecord = (student) => {
  selectedStudent.value = student
  showCombatRecord.value = true
}
</script>

<template>
  <div class="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 text-pixel-plum pb-12 relative">
    <!-- Header -->
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b-2 border-pixel-plum/10 pb-6">
      <div>
        <div class="flex items-center gap-3 mb-1">
          <div class="w-2 h-2 rounded-full bg-pixel-violet animate-pulse"></div>
          <h1 class="text-3xl font-black font-display tracking-tight text-pixel-plum uppercase">Classroom Overview</h1>
        </div>
        <p class="text-pixel-10 text-pixel-plum/50 uppercase font-black tracking-[0.2em] flex items-center gap-2">
          Sector: <span class="text-pixel-violet">Active Students</span>
          <span class="mx-1 opacity-30">|</span> 
          Count: <span class="text-pixel-moss">{{ filteredStudents.length }} Operators</span>
        </p>
      </div>

      <!-- Classroom Filter -->
      <div class="flex items-center gap-3">
        <span class="text-[10px] font-black text-pixel-plum/40 uppercase tracking-widest">Filter Unit:</span>
        <select 
          v-model="selectedCode"
          class="bg-white border-2 border-pixel-plum/10 rounded-lg px-4 py-2 text-xs font-black text-pixel-plum focus:border-pixel-violet outline-none transition-all uppercase tracking-widest"
        >
          <option value="all">All Units</option>
          <option v-for="code in classroomCodes" :key="code.code_id" :value="code.code_value">
            Unit {{ code.code_value }}
          </option>
        </select>
      </div>
    </div>

    <!-- Student Table -->
    <div class="pixel-card">
      <StudentProgressTable 
        :students="filteredStudents"
        @viewStudent="openCombatRecord"
      />
    </div>

    <!-- Side Overlays -->
    <StudentCombatRecord 
      :show="showCombatRecord" 
      :student="selectedStudent"
      @close="showCombatRecord = false"
    />
  </div>
</template>

<style scoped>
@reference "@/assets/main.css";
</style>
