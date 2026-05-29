<script setup>
import { ref } from 'vue'
import { mockClassroomCodes } from '@/api/mock'

// Components
import ClassroomCodeList from './components/ClassroomCodeList.vue'
import GenerateCodeModal from './components/GenerateCodeModal.vue'

const activeCodes = ref([...mockClassroomCodes])
const selectedCode = ref(activeCodes.value[0])
const showConfirmModal = ref(false)

const isEditing = ref(false)
const editName = ref('')
const editDescription = ref('')

const confirmGenerateCode = () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  let result = ''
  for (let i = 0; i < 6; i++) result += chars.charAt(Math.floor(Math.random() * chars.length))

  const newCode = {
    code_id: `c${activeCodes.value.length + 1}`,
    code_value: result,
    name: "New Operational Unit",
    description: "Initial tactical briefing pending. This unit is ready for student enrollment.",
    is_active: true,
    students_count: 0,
    created_at: new Date().toISOString(),
  }
  
  activeCodes.value.unshift(newCode)
  selectedCode.value = newCode
  isEditing.value = false
  showConfirmModal.value = false
}

const toggleEdit = () => {
  if (!selectedCode.value) return
  editName.value = selectedCode.value.name
  editDescription.value = selectedCode.value.description
  isEditing.value = true
}

const saveDetails = () => {
  if (selectedCode.value) {
    selectedCode.value.name = editName.value
    selectedCode.value.description = editDescription.value
    isEditing.value = false
  }
}

const handleDeleteCode = (id) => {
  if (confirm('Are you sure you want to terminate this operational unit? All student links will be severed.')) {
    activeCodes.value = activeCodes.value.filter(c => c.code_id !== id)
    if (selectedCode.value?.code_id === id) {
      selectedCode.value = activeCodes.value[0] || null
      isEditing.value = false
    }
  }
}
</script>

<template>
  <div class="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 text-pixel-plum pb-12 relative">
    <!-- Header -->
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b-2 border-pixel-plum/10 pb-6">
      <div>
        <div class="flex items-center gap-3 mb-1">
          <div class="w-2 h-2 rounded-full bg-signal-gold animate-pulse"></div>
          <h1 class="text-3xl font-black font-display tracking-tight text-pixel-plum uppercase">Unit Management</h1>
        </div>
        <p class="text-pixel-10 text-pixel-plum/50 uppercase font-black tracking-[0.2em] flex items-center gap-2">
          Protocol: <span class="text-signal-gold">Classroom Codes</span>
          <span class="mx-1 opacity-30">|</span> 
          Active: <span class="text-pixel-moss">{{ activeCodes.length }} Units</span>
        </p>
      </div>

      <button
        @click="showConfirmModal = true"
        class="inline-flex items-center gap-3 bg-pixel-moss text-white px-6 py-3 rounded-lg font-black font-display text-xs uppercase tracking-widest shadow-pixel-soft hover:brightness-105 transition-all active:scale-95 group"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="group-hover:rotate-90 transition-transform"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
        <span>Generate Classroom Code</span>
      </button>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-[400px_1fr] gap-8 items-start">
      <ClassroomCodeList 
        :codes="activeCodes"
        :selectedClass="selectedCode"
        @selectClass="(code) => { selectedCode = code; isEditing = false; }"
        @deleteCode="handleDeleteCode"
      />

      <!-- Unit Detail Card -->
      <transition
        enter-active-class="transition duration-300 ease-out"
        enter-from-class="transform translate-x-4 opacity-0"
        enter-to-class="transform translate-x-0 opacity-100"
        mode="out-in"
      >
        <div v-if="selectedCode" :key="selectedCode.code_id" class="pixel-card bg-white border-2 border-pixel-violet/20 h-fit sticky top-8">
          <div class="flex items-center justify-between mb-6 pb-4 border-b border-pixel-plum/5">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 bg-pixel-violet/10 rounded flex items-center justify-center border border-pixel-violet/20">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#8B5CF6" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              </div>
              <div>
                <h3 class="text-xs font-black text-pixel-plum/40 uppercase tracking-widest leading-none mb-1.5">Unit Code</h3>
                <p class="text-2xl font-black font-display text-pixel-violet tracking-[0.15em] uppercase">{{ selectedCode.code_value }}</p>
              </div>
            </div>
            <div class="text-right">
              <span class="text-[10px] font-black bg-pixel-moss/10 text-pixel-moss px-2 py-1 rounded uppercase tracking-tighter">Operational</span>
            </div>
          </div>

          <div class="space-y-6">
            <div>
              <label class="text-[10px] font-black text-pixel-plum/30 uppercase tracking-[0.2em] block mb-2">Classroom Title</label>
              <input 
                v-if="isEditing"
                v-model="editName"
                type="text"
                class="w-full bg-pixel-plum/5 border-2 border-pixel-plum/10 rounded-lg px-4 py-3 text-lg font-black text-pixel-plum outline-none focus:border-pixel-violet transition-all uppercase tracking-tight"
                placeholder="Enter Unit Name..."
              />
              <h2 v-else class="text-xl font-black text-pixel-plum uppercase tracking-tight">{{ selectedCode.name }}</h2>
            </div>

            <div>
              <label class="text-[10px] font-black text-pixel-plum/30 uppercase tracking-[0.2em] block mb-2">Classroom Description</label>
              <textarea 
                v-if="isEditing"
                v-model="editDescription"
                rows="4"
                class="w-full bg-pixel-plum/5 border-2 border-pixel-plum/10 rounded-lg px-4 py-3 text-sm font-medium text-pixel-plum outline-none focus:border-pixel-violet transition-all leading-relaxed resize-none"
                placeholder="Enter Operational Briefing..."
              ></textarea>
              <p v-else class="text-sm font-medium text-pixel-plum/70 leading-relaxed italic">
                "{{ selectedCode.description }}"
              </p>
            </div>

            <div class="grid grid-cols-2 gap-4 pt-4 border-t border-pixel-plum/5">
              <div>
                <label class="text-[10px] font-black text-pixel-plum/30 uppercase tracking-[0.2em] block mb-1">Personnel</label>
                <p class="text-lg font-black text-pixel-plum">{{ selectedCode.students_count }} Students</p>
              </div>
              <div>
                <label class="text-[10px] font-black text-pixel-plum/30 uppercase tracking-[0.2em] block mb-1">Established</label>
                <p class="text-lg font-black text-pixel-plum">{{ new Date(selectedCode.created_at).toLocaleDateString() }}</p>
              </div>
            </div>
          </div>

          <div class="mt-8 flex gap-3">
            <template v-if="isEditing">
              <button 
                @click="saveDetails"
                class="flex-1 bg-pixel-moss text-white py-3 rounded-lg text-xs font-black uppercase tracking-widest shadow-pixel-soft hover:brightness-110 transition-all"
              >
                Confirm Sync
              </button>
              <button 
                @click="isEditing = false"
                class="px-6 border-2 border-pixel-plum/10 rounded-lg text-xs font-black text-pixel-plum/60 uppercase tracking-widest hover:bg-pixel-plum/5 transition-all"
              >
                Abort
              </button>
            </template>
            <button 
              v-else
              @click="toggleEdit"
              class="flex-1 bg-pixel-violet text-white py-3 rounded-lg text-xs font-black uppercase tracking-widest shadow-pixel-soft hover:brightness-110 transition-all"
            >
              Update Details
            </button>
          </div>
        </div>
      </transition>
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
