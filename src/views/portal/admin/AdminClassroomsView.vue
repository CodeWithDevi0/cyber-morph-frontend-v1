<script setup>
import { ref, computed } from 'vue'

// Toast Notification State
const toast = ref({ show: false, message: '', type: 'success' })
const triggerToast = (message, type = 'success', duration = 3000) => {
  toast.value = { show: true, message, type }
  setTimeout(() => {
    toast.value.show = false
  }, duration)
}

// --- MOCK DATA ---
const classrooms = ref([
  {
    id: 1,
    name: 'Cyber Defense 101',
    code: 'MORPH9',
    educator: 'Dr. Aris Thorne',
    studentCount: 12,
    is_active: true,
    description: 'Introductory course focusing on basic password hygiene and phishing awareness.',
  },
  {
    id: 2,
    name: 'Network Security Alpha',
    code: 'CYBER2',
    educator: 'Sarah Connor',
    studentCount: 8,
    is_active: true,
    description: 'Advanced session covering network protocols, firewall management, and intrusion detection.',
  },
  {
    id: 3,
    name: 'Offensive Exploits Beta',
    code: 'PWNED4',
    educator: 'Dr. Turing',
    studentCount: 0,
    is_active: false,
    description: 'Specialized lab testing zero-day exploits, SQL injection, and buffer overflows.',
  },
])

const educators = ref([
  'Dr. Aris Thorne',
  'Sarah Connor',
  'Dr. Turing',
  'Prof. Hopper',
  'Dr. Lovelace',
])

// --- STATE MANAGEMENT ---
const isReassignOpen = ref(false)
const reassignTarget = ref({ id: null, name: '', currentEducator: '', newEducator: '' })

const isDeleteOpen = ref(false)
const deleteTarget = ref({ id: null, name: '', code: '', reason: 'Standard academic curriculum rotation purge' })

// --- COMPUTED STATS ---
const totalClassrooms = computed(() => classrooms.value.length)
const totalStudents = computed(() => classrooms.value.reduce((acc, curr) => acc + curr.studentCount, 0))
const inactiveCount = computed(() => classrooms.value.filter(c => !c.is_active).length)

// --- INTERACTIVE ACTIONS ---

// 1. Toggle Active/Inactive State
const toggleStatus = (classroom) => {
  classroom.is_active = !classroom.is_active
  const statusLabel = classroom.is_active ? 'ACTIVATED' : 'DEACTIVATED'
  const toastType = classroom.is_active ? 'success' : 'alert'
  triggerToast(`Classroom Code [${classroom.code}] has been ${statusLabel}.`, toastType)
}

// 2. Reassign Educator Flow
const openReassign = (classroom) => {
  reassignTarget.value = {
    id: classroom.id,
    name: classroom.name,
    currentEducator: classroom.educator,
    newEducator: classroom.educator
  }
  isReassignOpen.value = true
}

const executeReassign = () => {
  const target = classrooms.value.find(c => c.id === reassignTarget.value.id)
  if (target) {
    const oldEdu = target.educator
    target.educator = reassignTarget.value.newEducator
    triggerToast(`Ownership of [${target.code}] transferred to ${reassignTarget.value.newEducator}.`, 'success')
    
    // Log in local storage to simulate backend action audit trail if desired
    console.log(`[Audit Log] Classroom ${target.code} reassigned from ${oldEdu} to ${target.educator}`)
  }
  isReassignOpen.value = false
}

// 3. Soft Deletion Flow
const openDelete = (classroom) => {
  deleteTarget.value = {
    id: classroom.id,
    name: classroom.name,
    code: classroom.code,
    reason: 'Standard academic curriculum rotation purge (CMP-404-EDU)'
  }
  isDeleteOpen.value = true
}

const executeDelete = () => {
  // Filter out classroom code
  classrooms.value = classrooms.value.filter(c => c.id !== deleteTarget.value.id)
  isDeleteOpen.value = false
  triggerToast(`Classroom Code [${deleteTarget.value.code}] soft-deleted and logged in Reclamation Hub.`, 'alert')

  // Log in local storage for Reclamation Center tracking simulation
  const deletedSnapshot = {
    id: `del-cls-${Date.now()}`,
    table_name: 'classroom_codes',
    record_id: String(deleteTarget.value.id),
    snapshot: JSON.stringify({ name: deleteTarget.value.name, code: deleteTarget.value.code }),
    reason: deleteTarget.value.reason,
    deleted_at: new Date().toLocaleString(),
    deleted_by: 'RootAdmin'
  }
  
  // Storing this so that if users click back and forth we can mock it, or just log in console for verification
  console.log('[Soft Delete Executed]', deletedSnapshot)
}
</script>

<template>
  <div class="animate-in fade-in slide-in-from-bottom-4 duration-700 relative min-h-screen">
    <!-- Toast Notification -->
    <transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="transform translate-y-10 opacity-0"
      enter-to-class="transform translate-y-0 opacity-100"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="transform translate-y-0 opacity-100"
      leave-to-class="transform translate-y-10 opacity-0"
    >
      <div
        v-if="toast.show"
        class="fixed bottom-8 right-8 px-6 py-4 rounded-lg shadow-pixel-soft border-2 font-black text-xs uppercase tracking-widest z-50 flex items-center gap-3 bg-white"
        :class="
          toast.type === 'success'
            ? 'text-pixel-moss border-pixel-moss'
            : 'text-byte-coral border-byte-coral'
        "
      >
        <div
          class="w-2 h-2 rounded-full animate-pulse"
          :class="toast.type === 'success' ? 'bg-pixel-moss' : 'bg-byte-coral'"
        ></div>
        {{ toast.message }}
      </div>
    </transition>

    <!-- Header Section -->
    <div class="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 border-b-2 border-pixel-plum/10 pb-8">
      <div>
        <div class="flex items-center gap-3 mb-1">
          <div class="w-2 h-2 rounded-full bg-pixel-violet animate-pulse"></div>
          <h1 class="text-4xl font-black font-display tracking-tighter text-pixel-plum uppercase">
            Classroom Codes
          </h1>
        </div>
        <p class="text-pixel-10 text-pixel-plum/50 uppercase font-black tracking-[0.3em] flex items-center gap-2">
          Protocol: <span class="text-pixel-violet">Resource Governance</span>
        </p>
      </div>
    </div>

    <!-- Stats Grid -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <!-- Total Classes -->
      <div class="bg-white border-2 border-pixel-plum/10 rounded-xl p-6 shadow-pixel-soft flex items-center justify-between">
        <div>
          <p class="text-[10px] font-black text-pixel-plum/40 uppercase tracking-widest mb-1">Active Code Registries</p>
          <h3 class="text-3xl font-black text-pixel-plum">{{ totalClassrooms }}</h3>
        </div>
        <div class="w-12 h-12 bg-pixel-violet/10 rounded-lg flex items-center justify-center text-pixel-violet">
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
          </svg>
        </div>
      </div>

      <!-- Enrolled Operatives -->
      <div class="bg-white border-2 border-pixel-plum/10 rounded-xl p-6 shadow-pixel-soft flex items-center justify-between">
        <div>
          <p class="text-[10px] font-black text-pixel-plum/40 uppercase tracking-widest mb-1">Enrolled Operatives</p>
          <h3 class="text-3xl font-black text-pixel-plum">{{ totalStudents }}</h3>
        </div>
        <div class="w-12 h-12 bg-pixel-moss/10 rounded-lg flex items-center justify-center text-pixel-moss">
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
            <circle cx="9" cy="7" r="4"></circle>
            <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
          </svg>
        </div>
      </div>

      <!-- Restricted Classes -->
      <div class="bg-white border-2 border-pixel-plum/10 rounded-xl p-6 shadow-pixel-soft flex items-center justify-between">
        <div>
          <p class="text-[10px] font-black text-pixel-plum/40 uppercase tracking-widest mb-1">Deactivated Classrooms</p>
          <h3 class="text-3xl font-black text-pixel-plum">{{ inactiveCount }}</h3>
        </div>
        <div class="w-12 h-12 bg-byte-coral/10 rounded-lg flex items-center justify-center text-byte-coral">
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
            <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
          </svg>
        </div>
      </div>
    </div>

    <!-- Classroom Directory Grid/Table -->
    <div class="bg-white border-2 border-pixel-plum/10 rounded-xl overflow-hidden shadow-pixel-soft">
      <div class="overflow-x-auto">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="border-b-2 border-pixel-plum/10 bg-pixel-plum/5 text-pixel-plum/50 font-black text-pixel-10 uppercase tracking-widest">
              <th class="p-4 pl-6">Classroom Registry</th>
              <th class="p-4">Sync Gate Code</th>
              <th class="p-4">Assigned Instructor</th>
              <th class="p-4">Enrolled Cadets</th>
              <th class="p-4">Status</th>
              <th class="p-4 pr-6 text-right">Administrative Actions</th>
            </tr>
          </thead>
          <transition-group name="list" tag="tbody" class="divide-y divide-pixel-plum/5">
            <tr
              v-for="cls in classrooms"
              :key="cls.id"
              class="group border-b border-pixel-plum/5 hover:bg-pixel-violet/[0.03] transition-all"
            >
              <!-- Name & Description -->
              <td class="p-4 pl-6">
                <div class="flex flex-col">
                  <span class="text-sm font-black text-pixel-plum group-hover:text-pixel-violet transition-colors">
                    {{ cls.name }}
                  </span>
                  <span class="text-[10px] font-bold text-pixel-plum/50 max-w-xs truncate">
                    {{ cls.description }}
                  </span>
                </div>
              </td>

              <!-- Sync Monospace Code -->
              <td class="p-4 font-mono font-black text-sm text-pixel-violet tracking-widest">
                {{ cls.code }}
              </td>

              <!-- Educator Assigned -->
              <td class="p-4 text-xs font-black text-pixel-plum/70">
                {{ cls.educator }}
              </td>

              <!-- Student Enrolled -->
              <td class="p-4 text-xs font-bold text-pixel-plum/60">
                {{ cls.studentCount }} Operatives
              </td>

              <!-- Active Switch Toggler -->
              <td class="p-4">
                <label class="cyber-switch">
                  <input
                    type="checkbox"
                    :checked="cls.is_active"
                    @change="toggleStatus(cls)"
                  />
                  <span class="cyber-slider"></span>
                </label>
              </td>

              <!-- Action buttons -->
              <td class="p-4 pr-6 text-right flex justify-end gap-2 items-center">
                <!-- Reassign Educator -->
                <button
                  @click="openReassign(cls)"
                  title="Reassign Instructor"
                  class="p-2 border-2 border-pixel-plum/20 text-pixel-plum rounded hover:bg-pixel-plum hover:text-white transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                    <circle cx="8.5" cy="7" r="4"></circle>
                    <polyline points="17 11 19 13 23 9"></polyline>
                  </svg>
                </button>

                <!-- Purge Classroom -->
                <button
                  @click="openDelete(cls)"
                  title="Purge Classroom Registry"
                  class="p-2 border-2 border-byte-coral/20 text-byte-coral rounded hover:bg-byte-coral hover:text-white transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                    <polyline points="3 6 5 6 21 6"></polyline>
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                  </svg>
                </button>
              </td>
            </tr>
          </transition-group>
        </table>
        <div v-if="classrooms.length === 0" class="p-12 text-center text-pixel-plum/50 font-black uppercase tracking-widest text-sm">
          No classroom registries found under active operation.
        </div>
      </div>
    </div>

    <!-- Reassign Educator Modal -->
    <transition name="modal">
      <div v-if="isReassignOpen" class="fixed inset-0 bg-pixel-plum/40 backdrop-blur-sm z-40 flex items-center justify-center p-4">
        <div class="modal-content bg-white border-2 border-pixel-plum rounded-xl w-full max-w-md shadow-2xl overflow-hidden">
          <div class="p-6 border-b-2 border-pixel-plum/10 flex justify-between items-center">
            <h2 class="text-base font-black font-display uppercase tracking-wider text-pixel-plum flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="8.5" cy="7" r="4"></circle>
              </svg>
              Reassign Classroom Instructor
            </h2>
            <button @click="isReassignOpen = false" class="text-pixel-plum/50 hover:text-byte-coral transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>

          <form @submit.prevent="executeReassign" class="p-6 space-y-4">
            <div class="bg-pixel-plum/5 border border-pixel-plum/10 rounded-lg p-4 space-y-1">
              <p class="text-[10px] font-black text-pixel-plum/40 uppercase">Classroom Target</p>
              <p class="text-xs font-black text-pixel-plum uppercase">{{ reassignTarget.name }}</p>
              <p class="text-[10px] font-black text-pixel-plum/40 uppercase mt-2">Current Instructor</p>
              <p class="text-xs font-bold text-pixel-violet uppercase">{{ reassignTarget.currentEducator }}</p>
            </div>

            <div>
              <label class="block text-[10px] font-black uppercase tracking-widest text-pixel-plum/70 mb-2">New Assigned Instructor</label>
              <select
                v-model="reassignTarget.newEducator"
                class="w-full p-3 border-2 border-pixel-plum/20 rounded font-bold text-pixel-plum focus:outline-none focus:border-pixel-violet transition-colors"
              >
                <option v-for="edu in educators" :key="edu" :value="edu">
                  {{ edu }}
                </option>
              </select>
            </div>

            <div class="pt-4 flex gap-3">
              <button
                type="button"
                @click="isReassignOpen = false"
                class="flex-1 py-3 border-2 border-pixel-plum/20 text-pixel-plum font-black text-xs uppercase tracking-widest rounded hover:bg-pixel-plum/5 transition-colors"
              >
                Abort
              </button>
              <button
                type="submit"
                class="flex-1 py-3 bg-pixel-violet text-white font-black text-xs uppercase tracking-widest rounded shadow-pixel-soft hover:brightness-110 transition-colors"
              >
                Confirm Transfer
              </button>
            </div>
          </form>
        </div>
      </div>
    </transition>

    <!-- soft Deletion Modal -->
    <transition name="modal">
      <div v-if="isDeleteOpen" class="fixed inset-0 bg-pixel-plum/40 backdrop-blur-sm z-40 flex items-center justify-center p-4">
        <div class="modal-content bg-white border-2 border-byte-coral rounded-xl w-full max-w-md shadow-2xl overflow-hidden">
          <div class="p-6 bg-byte-coral/5 border-b-2 border-byte-coral/20 flex justify-between items-center text-byte-coral">
            <div class="flex items-center gap-2 font-display">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                <line x1="12" y1="9" x2="12" y2="13"></line>
                <line x1="12" y1="17" x2="12.01" y2="17"></line>
              </svg>
              <h2 class="text-base font-black uppercase tracking-wider">
                Decomission Classroom Code
              </h2>
            </div>
            <button @click="isDeleteOpen = false" class="text-pixel-plum/50 hover:text-byte-coral transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>

          <form @submit.prevent="executeDelete" class="p-6 space-y-4">
            <div class="bg-byte-coral/[0.04] border-2 border-byte-coral/20 rounded-lg p-4 space-y-2">
              <p class="text-xs font-bold text-pixel-plum/70 uppercase">
                Registry Target:
                <span class="text-byte-coral font-black">{{ deleteTarget.name }}</span>
              </p>
              <p class="text-xs font-bold text-pixel-plum/70 uppercase">
                Sync Gate Code:
                <span class="text-pixel-plum font-black tracking-widest">{{ deleteTarget.code }}</span>
              </p>
            </div>

            <div class="bg-byte-coral/[0.04] border-2 border-byte-coral/20 rounded-lg p-4">
              <span class="block text-[10px] font-black uppercase tracking-widest text-byte-coral mb-1">Gate Decommission Policy</span>
              <p class="text-xs font-bold text-pixel-plum/70 leading-relaxed">
                The sync gate for this classroom will be <span class="text-byte-coral font-black">DISABLED</span>. Monospace codes (e.g. <span class="font-black text-pixel-plum">{{ deleteTarget.code }}</span>) will reject mobile client handshakes. Classroom snapshots will be safely archived under standard policy <span class="font-black text-pixel-plum">CMP-404-EDU</span>.
              </p>
            </div>

            <div class="pt-4 flex gap-3">
              <button
                type="button"
                @click="isDeleteOpen = false"
                class="flex-1 py-3 border-2 border-pixel-plum/20 text-pixel-plum font-black text-xs uppercase tracking-widest rounded hover:bg-pixel-plum/5 transition-colors"
              >
                Abort
              </button>
              <button
                type="submit"
                class="flex-1 py-3 bg-byte-coral text-white font-black text-xs uppercase tracking-widest rounded shadow-pixel-soft hover:brightness-110 transition-colors transform active:scale-95 flex items-center justify-center gap-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                  <polyline points="3 6 5 6 21 6"></polyline>
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                </svg>
                Purge Code Registry
              </button>
            </div>
          </form>
        </div>
      </div>
    </transition>
  </div>
</template>

<style scoped>
@reference "@/assets/main.css";

/* Tab Switch Animation */
.tab-slide-enter-active,
.tab-slide-leave-active {
  transition: all 0.2s ease-out;
}
.tab-slide-enter-from {
  opacity: 0;
  transform: translateY(10px);
}
.tab-slide-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

/* List Delete/Add Animation */
.list-enter-active,
.list-leave-active {
  transition: all 0.3s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}

/* Modal Smooth Pop-up */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}
.modal-enter-active .modal-content,
.modal-leave-active .modal-content {
  transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
.modal-enter-from .modal-content,
.modal-leave-to .modal-content {
  transform: scale(0.85) translateY(20px);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Custom Vanilla Cyber Toggle Switch */
.cyber-switch {
  position: relative;
  display: inline-block;
  width: 44px;
  height: 22px;
}

.cyber-switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.cyber-slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(26, 17, 39, 0.1);
  transition: .3s;
  border-radius: 9999px;
  border: 1px solid rgba(26, 17, 39, 0.15);
}

.cyber-slider:before {
  position: absolute;
  content: "";
  height: 14px;
  width: 14px;
  left: 3px;
  bottom: 3px;
  background-color: white;
  transition: .3s;
  border-radius: 50%;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.15);
}

input:checked + .cyber-slider {
  background-color: #6366f1; /* bg-pixel-violet */
  border-color: #4f46e5;
}

input:checked + .cyber-slider:before {
  transform: translateX(22px);
}
</style>
