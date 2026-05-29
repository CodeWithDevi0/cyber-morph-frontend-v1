<script setup>
import { ref } from 'vue'

// --- UI STATE ---
// 'registry' for main users, 'queue' for pending educators
const activeTab = ref('registry') 

// Toast Notification State
const toast = ref({ show: false, message: '', type: 'success' })
const triggerToast = (message, type = 'success', duration = 3000) => {
  toast.value = { show: true, message, type }
  setTimeout(() => { toast.value.show = false }, duration)
}

// Modal State (For Add/Edit User)
const isModalOpen = ref(false)
const modalMode = ref('add') 
const formData = ref({ id: null, username: '', role: 'Player', status: 'Active' })

// --- 30% FUNCTIONALITY IN-MEMORY STATE ---

// 1. Main System Registry (Active Users)
const allUsers = ref([
  { id: 1, username: 'RootAdmin', role: 'Admin', status: 'Active', lastLogin: '10 mins ago' },
  { id: 2, username: 'Dr. Turing', role: 'Educator', status: 'Active', lastLogin: '1 hour ago' },
  { id: 3, username: 'NeonSpecter', role: 'Player', status: 'Active', lastLogin: '2 hours ago' },
  { id: 5, username: 'GlitchProtocol', role: 'Player', status: 'Suspended', lastLogin: '3 days ago' }
])

// 2. Authorization Queue (Pending Educators)
const pendingQueue = ref([
  { id: 101, username: 'Prof. Hopper', email: 'hopper@university.edu', proof: 'Faculty ID Attached', requested: '10 mins ago' },
  { id: 102, username: 'Dr. Lovelace', email: 'lovelace@academy.org', proof: 'Employment Cert', requested: '1 hour ago' },
  { id: 103, username: 'AnonHacker', email: 'shadow@darkweb.net', proof: 'None Provided', requested: '3 hours ago' }
])


// --- CRUD OPERATIONS (System Registry) ---

const openModal = (mode, user = null) => {
  modalMode.value = mode
  if (mode === 'edit' && user) {
    formData.value = { ...user }
  } else {
    formData.value = { id: Date.now(), username: '', role: 'Player', status: 'Active', lastLogin: 'Never' }
  }
  isModalOpen.value = true
}

const saveUser = () => {
  if (modalMode.value === 'add') {
    allUsers.value.unshift({ ...formData.value })
    triggerToast(`User ${formData.value.username} registered successfully.`)
  } else {
    const index = allUsers.value.findIndex(u => u.id === formData.value.id)
    if (index !== -1) {
      allUsers.value[index] = { ...formData.value, lastLogin: allUsers.value[index].lastLogin }
    }
    triggerToast(`User ${formData.value.username} updated successfully.`)
  }
  isModalOpen.value = false
}

const deleteUser = (id, username) => {
  if (confirm(`SECURITY OVERRIDE: Are you sure you want to permanently purge entity [${username}]?`)) {
    allUsers.value = allUsers.value.filter(u => u.id !== id)
    triggerToast(`Entity [${username}] purged from system.`, 'alert')
  }
}

// --- QUEUE OPERATIONS (Authorization Checkpoint) ---

const handleApprove = (educator) => {
  // 1. Remove from queue
  pendingQueue.value = pendingQueue.value.filter(e => e.id !== educator.id)
  
  // 2. Add to main registry as Active Educator
  allUsers.value.unshift({
    id: educator.id,
    username: educator.username,
    role: 'Educator',
    status: 'Active',
    lastLogin: 'Never'
  })
  
  triggerToast(`Educator [${educator.username}] authorized. Moved to registry.`, 'success')
}

const handleDeny = (id, username) => {
  pendingQueue.value = pendingQueue.value.filter(e => e.id !== id)
  triggerToast(`Clearance denied for [${username}]. Purged from queue.`, 'alert')
}

// --- UI HELPERS ---
const getRoleColor = (role) => {
  if (role === 'Admin') return 'text-byte-coral border-byte-coral'
  if (role === 'Educator') return 'text-pixel-violet border-pixel-violet'
  return 'text-pixel-moss border-pixel-moss'
}
const getStatusColor = (status) => {
  if (status === 'Active') return 'text-pixel-moss'
  if (status === 'Suspended') return 'text-byte-coral'
  return 'text-signal-gold'
}
</script>

<template>
  <div class="animate-in fade-in slide-in-from-bottom-4 duration-700 relative min-h-screen">
    
    <transition enter-active-class="transition duration-300 ease-out" enter-from-class="transform translate-y-10 opacity-0" enter-to-class="transform translate-y-0 opacity-100" leave-active-class="transition duration-200 ease-in" leave-from-class="transform translate-y-0 opacity-100" leave-to-class="transform translate-y-10 opacity-0">
      <div v-if="toast.show" class="fixed bottom-8 right-8 px-6 py-4 rounded-lg shadow-pixel-soft border-2 font-black text-xs uppercase tracking-widest z-50 flex items-center gap-3 bg-white" :class="toast.type === 'success' ? 'text-pixel-moss border-pixel-moss' : 'text-byte-coral border-byte-coral'">
        <div class="w-2 h-2 rounded-full animate-pulse" :class="toast.type === 'success' ? 'bg-pixel-moss' : 'bg-byte-coral'"></div>
        {{ toast.message }}
      </div>
    </transition>

    <div class="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 border-b-2 border-pixel-plum/10 pb-8">
      <div>
        <div class="flex items-center gap-3 mb-1">
          <div class="w-2 h-2 rounded-full bg-pixel-violet animate-pulse"></div>
          <h1 class="text-4xl font-black font-display tracking-tighter text-pixel-plum uppercase">Identity Hub</h1>
        </div>
        <p class="text-pixel-10 text-pixel-plum/50 uppercase font-black tracking-[0.3em] flex items-center gap-2 mb-6">
          Protocol: <span class="text-pixel-violet">Access Control</span> 
        </p>

        <div class="flex p-1 bg-pixel-plum/5 rounded-lg w-fit border-2 border-pixel-plum/10">
          <button @click="activeTab = 'registry'" 
                  class="px-6 py-2.5 rounded text-xs font-black uppercase tracking-widest transition-all"
                  :class="activeTab === 'registry' ? 'bg-white shadow-sm text-pixel-plum' : 'text-pixel-plum/50 hover:text-pixel-plum'">
            System Registry
          </button>
          <button @click="activeTab = 'queue'" 
                  class="px-6 py-2.5 rounded text-xs font-black uppercase tracking-widest transition-all flex items-center gap-2"
                  :class="activeTab === 'queue' ? 'bg-white shadow-sm text-pixel-plum' : 'text-pixel-plum/50 hover:text-pixel-plum'">
            Auth Queue
            <span v-if="pendingQueue.length > 0" class="bg-byte-coral text-white px-2 py-0.5 rounded-full text-[10px] animate-pulse">
              {{ pendingQueue.length }}
            </span>
          </button>
        </div>
      </div>

      <div class="flex gap-3 h-fit">
        <transition name="fade">
          <button v-if="activeTab === 'registry'" @click="openModal('add')" class="px-6 py-3 bg-pixel-violet text-white rounded-lg font-black text-xs uppercase tracking-widest hover:brightness-110 shadow-pixel-soft transition-all transform active:scale-95 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
            Register New User
          </button>
        </transition>
      </div>
    </div>

    <transition name="tab-slide" mode="out-in">
      
      <div v-if="activeTab === 'registry'" key="registry" class="bg-white border-2 border-pixel-plum/10 rounded-xl overflow-hidden shadow-pixel-soft">
        <div class="overflow-x-auto">
          <table class="w-full text-left border-collapse">
            <thead>
              <tr class="border-b-2 border-pixel-plum/10 bg-pixel-plum/5 text-pixel-plum font-black text-xs uppercase tracking-widest">
                <th class="p-4">Identity (Username)</th>
                <th class="p-4">Clearance Role</th>
                <th class="p-4">System Status</th>
                <th class="p-4">Last Sync</th>
                <th class="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <transition-group name="list" tag="tbody">
              <tr v-for="user in allUsers" :key="user.id" class="border-b border-pixel-plum/5 hover:bg-pixel-plum/5 transition-colors">
                <td class="p-4 font-bold text-pixel-plum">{{ user.username }}</td>
                <td class="p-4">
                  <span class="px-2 py-1 border rounded text-[10px] uppercase font-black tracking-wider" :class="getRoleColor(user.role)">{{ user.role }}</span>
                </td>
                <td class="p-4 font-bold text-xs uppercase tracking-wider" :class="getStatusColor(user.status)">
                  <div class="flex items-center gap-2">
                    <div class="w-1.5 h-1.5 rounded-full" :class="user.status === 'Suspended' ? 'bg-byte-coral' : (user.status === 'Pending' ? 'bg-signal-gold' : 'bg-pixel-moss')"></div>
                    {{ user.status }}
                  </div>
                </td>
                <td class="p-4 text-xs font-bold text-pixel-plum/50">{{ user.lastLogin }}</td>
                <td class="p-4 text-right flex justify-end gap-2">
                  <button @click="openModal('edit', user)" class="p-2 border-2 border-pixel-plum/20 text-pixel-plum rounded hover:bg-pixel-plum hover:text-white transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>
                  </button>
                  <button @click="deleteUser(user.id, user.username)" class="p-2 border-2 border-byte-coral/20 text-byte-coral rounded hover:bg-byte-coral hover:text-white transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                  </button>
                </td>
              </tr>
            </transition-group>
          </table>
          <div v-if="allUsers.length === 0" class="p-12 text-center text-pixel-plum/50 font-black uppercase tracking-widest text-sm">No identities found in system registry.</div>
        </div>
      </div>

      <div v-else key="queue" class="max-w-5xl">
        <div v-if="pendingQueue.length === 0" class="pixel-card min-h-[400px] flex flex-col items-center justify-center text-center">
          <div class="w-16 h-16 bg-pixel-moss/10 rounded-full flex items-center justify-center mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="text-pixel-moss"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
          </div>
          <h3 class="text-xl font-black text-pixel-plum uppercase tracking-tight">Queue Depleted</h3>
          <p class="text-xs font-bold text-pixel-plum/40 uppercase tracking-[0.2em] mt-2">All protocols are currently authorized.</p>
        </div>

        <transition-group v-else name="list" tag="div" class="grid grid-cols-1 gap-6">
          <div v-for="req in pendingQueue" :key="req.id" class="pixel-card group">
            <div class="flex flex-col md:flex-row md:items-center justify-between gap-8">
              <div class="flex items-center gap-6">
                <div class="w-16 h-16 bg-pixel-violet/10 rounded-lg flex items-center justify-center text-pixel-violet font-black text-2xl shadow-pixel-soft border border-pixel-violet/10">
                  {{ req.username.charAt(0) }}
                </div>
                <div>
                  <div class="flex items-center gap-3 mb-1">
                    <h4 class="text-lg font-black text-pixel-plum uppercase tracking-tight">{{ req.username }}</h4>
                    <span class="px-2 py-0.5 bg-signal-gold/10 text-signal-gold text-[9px] font-black uppercase tracking-widest rounded border border-signal-gold/20">Pending Validation</span>
                  </div>
                  <p class="text-xs font-bold text-pixel-plum/40 uppercase tracking-widest mb-3 flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M22 17a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9.5C2 7 4 5 6.5 5H18c2.2 0 4 1.8 4 4v8Z"/><path d="m22 9-10 7L2 9"/></svg>
                    {{ req.email }}
                  </p>
                  <div class="flex gap-2">
                    <span class="text-pixel-9 font-black uppercase text-pixel-plum/30 bg-pixel-plum/5 px-2 py-1 rounded tracking-tighter">Applied: {{ req.requested }}</span>
                    <span class="text-pixel-9 font-black uppercase text-pixel-plum/30 bg-pixel-plum/5 px-2 py-1 rounded tracking-tighter">Proof: {{ req.proof }}</span>
                  </div>
                </div>
              </div>

              <div class="flex items-center gap-3 w-full md:w-auto border-t md:border-t-0 border-pixel-plum/5 pt-6 md:pt-0">
                <button 
                  @click="handleApprove(req)"
                  class="flex-1 md:flex-none px-8 py-3 bg-pixel-moss text-white font-black uppercase font-display tracking-widest rounded-lg hover:brightness-110 shadow-pixel-soft transition-all transform active:scale-95"
                >
                  Approve
                </button>
                <button 
                  @click="handleDeny(req.id, req.username)"
                  class="flex-1 md:flex-none px-8 py-3 bg-byte-coral/10 text-byte-coral border border-byte-coral/20 font-black uppercase font-display tracking-widest rounded-lg hover:bg-byte-coral/20 transition-all transform active:scale-95"
                >
                  Deny
                </button>
              </div>
            </div>
          </div>
        </transition-group>
      </div>

    </transition>

    <transition name="modal">
      <div v-if="isModalOpen" class="fixed inset-0 bg-pixel-plum/40 backdrop-blur-sm z-40 flex items-center justify-center p-4">
        <div class="modal-content bg-white border-2 border-pixel-plum rounded-xl w-full max-w-md shadow-2xl">
          <div class="p-6 border-b-2 border-pixel-plum/10 flex justify-between items-center">
            <h2 class="text-xl font-black font-display text-pixel-plum uppercase tracking-wider">
              {{ modalMode === 'add' ? 'Register New User' : 'Modify Access' }}
            </h2>
            <button @click="isModalOpen = false" class="text-pixel-plum/50 hover:text-byte-coral transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
          </div>
          
          <form @submit.prevent="saveUser" class="p-6 space-y-4">
            <div>
              <label class="block text-[10px] font-black uppercase tracking-widest text-pixel-plum/70 mb-2">Identity (Username)</label>
              <input v-model="formData.username" type="text" required class="w-full p-3 border-2 border-pixel-plum/20 rounded font-bold text-pixel-plum focus:outline-none focus:border-pixel-violet transition-colors">
            </div>
            <div>
              <label class="block text-[10px] font-black uppercase tracking-widest text-pixel-plum/70 mb-2">Clearance Role</label>
              <select v-model="formData.role" class="w-full p-3 border-2 border-pixel-plum/20 rounded font-bold text-pixel-plum focus:outline-none focus:border-pixel-violet transition-colors">
                <option value="Player">Player</option>
                <option value="Educator">Educator</option>
                <option value="Admin">Admin</option>
              </select>
            </div>
            <div>
              <label class="block text-[10px] font-black uppercase tracking-widest text-pixel-plum/70 mb-2">System Status</label>
              <select v-model="formData.status" class="w-full p-3 border-2 border-pixel-plum/20 rounded font-bold text-pixel-plum focus:outline-none focus:border-pixel-violet transition-colors">
                <option value="Active">Active</option>
                <option value="Pending">Pending</option>
                <option value="Suspended">Suspended</option>
              </select>
            </div>
            <div class="pt-4 flex gap-3">
              <button type="button" @click="isModalOpen = false" class="flex-1 py-3 border-2 border-pixel-plum/20 text-pixel-plum font-black text-xs uppercase tracking-widest rounded hover:bg-pixel-plum/5 transition-colors">Cancel</button>
              <button type="submit" class="flex-1 py-3 bg-pixel-violet text-white font-black text-xs uppercase tracking-widest rounded shadow-pixel-soft hover:brightness-110 transition-colors">{{ modalMode === 'add' ? 'Register' : 'Save Changes' }}</button>
            </div>
          </form>
        </div>
      </div>
    </transition>

  </div>
</template>

<style scoped>
@reference "@/assets/main.css";

/* Added the pixel-card class from your original file */
.pixel-card {
  @apply bg-white/60 backdrop-blur-md border border-pixel-violet/10 p-6 rounded-xl shadow-pixel-soft;
}

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
</style>