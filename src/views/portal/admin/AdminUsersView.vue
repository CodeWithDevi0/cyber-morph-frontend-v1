<script setup>
import { ref } from 'vue'

// --- UI STATE ---
// 'registry' for main users, 'queue' for pending educators, 'reclamation' for soft-deleted records
const activeTab = ref('registry')

// Toast Notification State
const toast = ref({ show: false, message: '', type: 'success' })
const triggerToast = (message, type = 'success', duration = 3000) => {
  toast.value = { show: true, message, type }
  setTimeout(() => {
    toast.value.show = false
  }, duration)
}

// Modal State (For Add/Edit User)
const isModalOpen = ref(false)
const modalMode = ref('add')
const formData = ref({ id: null, username: '', role: 'Player', status: 'Active' })

// Modal State (For Soft-Deletion Security Protocol)
const isDeleteModalOpen = ref(false)
const deleteTarget = ref({ id: null, username: '', role: '', reason: 'Violation of security compliance parameters' })

// --- 30% FUNCTIONALITY IN-MEMORY STATE ---

// 1. Main System Registry (Active Users)
const allUsers = ref([
  { id: 1, username: 'RootAdmin', role: 'Admin', status: 'Active', lastLogin: '10 mins ago' },
  { id: 2, username: 'Dr. Turing', role: 'Educator', status: 'Active', lastLogin: '1 hour ago' },
  { id: 3, username: 'NeonSpecter', role: 'Player', status: 'Active', lastLogin: '2 hours ago' },
  {
    id: 5,
    username: 'GlitchProtocol',
    role: 'Player',
    status: 'Suspended',
    lastLogin: '3 days ago',
  },
])

// 2. Authorization Queue (Pending Educators)
const pendingQueue = ref([
  {
    id: 101,
    username: 'Prof. Hopper',
    email: 'hopper@university.edu',
    proof: 'Faculty ID Attached',
    requested: '10 mins ago',
  },
  {
    id: 102,
    username: 'Dr. Lovelace',
    email: 'lovelace@academy.org',
    proof: 'Employment Cert',
    requested: '1 hour ago',
  },
  {
    id: 103,
    username: 'AnonHacker',
    email: 'shadow@darkweb.net',
    proof: 'None Provided',
    requested: '3 hours ago',
  },
])

// 3. System Reclamation Center (Table 11: deleted_records_log)
const deletedRecords = ref([
  {
    id: 'del-101',
    table_name: 'player_profiles',
    record_id: '99',
    snapshot: JSON.stringify({ id: 99, username: 'DarkOperative', role: 'Player', status: 'Suspended', lastLogin: '5 days ago' }),
    reason: 'Security breach attempt - invalid API key signature',
    deleted_at: new Date(Date.now() - 3600000 * 24).toLocaleString(),
    deleted_by: 'RootAdmin'
  },
  {
    id: 'del-102',
    table_name: 'web_user_profiles',
    record_id: '88',
    snapshot: JSON.stringify({ id: 88, username: 'Prof. Shadow', role: 'Educator', status: 'Inactive', lastLogin: '7 days ago' }),
    reason: 'Expired classroom contract credentials',
    deleted_at: new Date(Date.now() - 3600000 * 12).toLocaleString(),
    deleted_by: 'RootAdmin'
  }
])

// --- CRUD OPERATIONS (System Registry) ---

const openModal = (mode, user = null) => {
  modalMode.value = mode
  if (mode === 'edit' && user) {
    formData.value = { ...user }
  } else {
    formData.value = {
      id: Date.now(),
      username: '',
      role: 'Player',
      status: 'Active',
      lastLogin: 'Never',
    }
  }
  isModalOpen.value = true
}

const saveUser = () => {
  if (modalMode.value === 'add') {
    allUsers.value.unshift({ ...formData.value })
    triggerToast(`User ${formData.value.username} registered successfully.`)
  } else {
    const index = allUsers.value.findIndex((u) => u.id === formData.value.id)
    if (index !== -1) {
      allUsers.value[index] = { ...formData.value, lastLogin: allUsers.value[index].lastLogin }
    }
    triggerToast(`User ${formData.value.username} updated successfully.`)
  }
  isModalOpen.value = false
}

// Aligned with Table 11: deleted_records_log
const confirmDelete = (user) => {
  deleteTarget.value = {
    id: user.id,
    username: user.username,
    role: user.role,
    reason: 'Violation of security compliance parameters'
  }
  isDeleteModalOpen.value = true
}

const executeDelete = () => {
  const user = allUsers.value.find((u) => u.id === deleteTarget.value.id)
  if (!user) return

  // 1. Log deleted record snapshot
  deletedRecords.value.unshift({
    id: `del-${Date.now()}`,
    table_name: user.role === 'Player' ? 'player_profiles' : 'web_user_profiles',
    record_id: String(user.id),
    snapshot: JSON.stringify(user),
    reason: deleteTarget.value.reason || 'N/A - General System Maintenance',
    deleted_at: new Date().toLocaleString(),
    deleted_by: 'RootAdmin',
  })

  // 2. Remove from active registry
  allUsers.value = allUsers.value.filter((u) => u.id !== deleteTarget.value.id)
  isDeleteModalOpen.value = false
  triggerToast(`Entity [${deleteTarget.value.username}] soft-deleted and logged in Reclamation Hub.`, 'alert')
}

// Undelete / Reclaim Entity
const handleRestore = (record) => {
  try {
    const originalUser = JSON.parse(record.snapshot)
    
    // 1. Remove from deleted log
    deletedRecords.value = deletedRecords.value.filter((r) => r.id !== record.id)
    
    // 2. Add back to main registry
    allUsers.value.unshift(originalUser)
    
    triggerToast(`Entity [${originalUser.username}] restored to System Registry successfully.`, 'success')
  } catch {
    triggerToast('Failed to parse entity recovery snapshot.', 'alert')
  }
}

// --- QUEUE OPERATIONS (Authorization Checkpoint) ---

const handleApprove = (educator) => {
  // 1. Remove from queue
  pendingQueue.value = pendingQueue.value.filter((e) => e.id !== educator.id)

  // 2. Add to main registry as Active Educator
  allUsers.value.unshift({
    id: educator.id,
    username: educator.username,
    role: 'Educator',
    status: 'Active',
    lastLogin: 'Never',
  })

  triggerToast(`Educator [${educator.username}] authorized. Moved to registry.`, 'success')
}

const handleDeny = (id, username) => {
  pendingQueue.value = pendingQueue.value.filter((e) => e.id !== id)
  triggerToast(`Clearance denied for [${username}]. Purged from queue.`, 'alert')
}

const getUsernameFromSnapshot = (snapshotStr) => {
  try {
    return JSON.parse(snapshotStr).username || 'Unknown'
  } catch {
    return 'Unknown'
  }
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

    <div
      class="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 border-b-2 border-pixel-plum/10 pb-8"
    >
      <div>
        <div class="flex items-center gap-3 mb-1">
          <div class="w-2 h-2 rounded-full bg-pixel-violet animate-pulse"></div>
          <h1 class="text-4xl font-black font-display tracking-tighter text-pixel-plum uppercase">
            Identity Hub
          </h1>
        </div>
        <p
          class="text-pixel-10 text-pixel-plum/50 uppercase font-black tracking-[0.3em] flex items-center gap-2 mb-6"
        >
          Protocol: <span class="text-pixel-violet">Access Control</span>
        </p>

        <div class="flex p-1 bg-pixel-plum/5 rounded-lg w-fit border-2 border-pixel-plum/10">
          <button
            @click="activeTab = 'registry'"
            class="px-6 py-2.5 rounded text-xs font-black uppercase tracking-widest transition-all"
            :class="
              activeTab === 'registry'
                ? 'bg-white shadow-sm text-pixel-plum'
                : 'text-pixel-plum/50 hover:text-pixel-plum'
            "
          >
            System Registry
          </button>
          <button
            @click="activeTab = 'queue'"
            class="px-6 py-2.5 rounded text-xs font-black uppercase tracking-widest transition-all flex items-center gap-2"
            :class="
              activeTab === 'queue'
                ? 'bg-white shadow-sm text-pixel-plum'
                : 'text-pixel-plum/50 hover:text-pixel-plum'
            "
          >
            Auth Queue
            <span
              v-if="pendingQueue.length > 0"
              class="bg-byte-coral text-white px-2 py-0.5 rounded-full text-[10px] animate-pulse"
            >
              {{ pendingQueue.length }}
            </span>
          </button>
          <button
            @click="activeTab = 'reclamation'"
            class="px-6 py-2.5 rounded text-xs font-black uppercase tracking-widest transition-all flex items-center gap-2"
            :class="
              activeTab === 'reclamation'
                ? 'bg-white shadow-sm text-pixel-plum'
                : 'text-pixel-plum/50 hover:text-pixel-plum'
            "
          >
            System Reclamation
            <span
              v-if="deletedRecords.length > 0"
              class="bg-pixel-violet text-white px-2 py-0.5 rounded-full text-[10px]"
            >
              {{ deletedRecords.length }}
            </span>
          </button>
        </div>
      </div>

      <div class="flex gap-3 h-fit">
        <transition name="fade">
          <button
            v-if="activeTab === 'registry'"
            @click="openModal('add')"
            class="px-6 py-3 bg-pixel-violet text-white rounded-lg font-black text-xs uppercase tracking-widest hover:brightness-110 shadow-pixel-soft transition-all transform active:scale-95 flex items-center gap-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="3"
            >
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            Register New User
          </button>
        </transition>
      </div>
    </div>

    <transition name="tab-slide" mode="out-in">
      <div
        v-if="activeTab === 'registry'"
        key="registry"
        class="bg-white border-2 border-pixel-plum/10 rounded-xl overflow-hidden shadow-pixel-soft"
      >
        <div class="overflow-x-auto">
          <table class="w-full text-left border-collapse">
            <thead>
              <tr
                class="border-b-2 border-pixel-plum/10 bg-pixel-plum/5 text-pixel-plum/50 font-black text-pixel-10 uppercase tracking-widest"
              >
                <th class="p-4 pl-6">Operator Identity</th>
                <th class="p-4">Clearance Role</th>
                <th class="p-4">System Status</th>
                <th class="p-4">Last Synchronized</th>
                <th class="p-4 pr-6 text-right">Actions</th>
              </tr>
            </thead>
            <transition-group name="list" tag="tbody" class="divide-y divide-pixel-plum/5">
              <tr
                v-for="user in allUsers"
                :key="user.id"
                class="group border-b border-pixel-plum/5 hover:bg-pixel-violet/[0.03] transition-all"
              >
                <td class="p-4 pl-6">
                  <div class="flex items-center gap-3">
                    <div class="w-8 h-8 rounded-lg bg-pixel-plum/5 flex items-center justify-center text-pixel-plum/30 group-hover:bg-pixel-violet/10 group-hover:text-pixel-violet transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                    </div>
                    <span class="text-sm font-black text-pixel-plum group-hover:text-pixel-violet transition-colors">{{ user.username }}</span>
                  </div>
                </td>
                <td class="p-4">
                  <span
                    class="px-2 py-1 border rounded text-[10px] uppercase font-black tracking-wider"
                    :class="getRoleColor(user.role)"
                    >{{ user.role }}</span
                  >
                </td>
                <td
                  class="p-4 font-black text-xs uppercase tracking-wider"
                  :class="getStatusColor(user.status)"
                >
                  <div class="flex items-center gap-2">
                    <div
                      class="w-1.5 h-1.5 rounded-full"
                      :class="
                        user.status === 'Suspended'
                          ? 'bg-byte-coral'
                          : user.status === 'Pending'
                            ? 'bg-signal-gold'
                            : 'bg-pixel-moss'
                      "
                    ></div>
                    {{ user.status }}
                  </div>
                </td>
                <td class="p-4 text-xs font-bold text-pixel-plum/60">{{ user.lastLogin }}</td>
                <td class="p-4 pr-6 text-right flex justify-end gap-2">
                  <button
                    @click="openModal('edit', user)"
                    class="p-2 border-2 border-pixel-plum/20 text-pixel-plum rounded hover:bg-pixel-plum hover:text-white transition-colors"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2.5"
                    >
                      <path d="M12 20h9"></path>
                      <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
                    </svg>
                  </button>
                  <button
                    @click="confirmDelete(user)"
                    class="p-2 border-2 border-byte-coral/20 text-byte-coral rounded hover:bg-byte-coral hover:text-white transition-colors"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2.5"
                    >
                      <polyline points="3 6 5 6 21 6"></polyline>
                      <path
                        d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"
                      ></path>
                    </svg>
                  </button>
                </td>
              </tr>
            </transition-group>
          </table>
          <div
            v-if="allUsers.length === 0"
            class="p-12 text-center text-pixel-plum/50 font-black uppercase tracking-widest text-sm"
          >
            No identities found in system registry.
          </div>
        </div>
      </div>

      <div v-else-if="activeTab === 'queue'" key="queue" class="space-y-4">
        <div
          v-if="pendingQueue.length === 0"
          class="bg-pixel-moss/10 border-2 border-pixel-moss/30 rounded-xl p-12 text-center text-pixel-moss font-black uppercase tracking-widest text-sm flex flex-col items-center gap-4"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
          </svg>
          Queue is empty. No pending clearance requests.
        </div>

        <transition-group name="list" tag="div" class="space-y-4">
          <div
            v-for="req in pendingQueue"
            :key="req.id"
            class="bg-white border-2 border-pixel-violet/30 rounded-xl p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden"
          >
            <div class="absolute left-0 top-0 bottom-0 w-2 bg-pixel-violet"></div>

            <div class="pl-4">
              <div class="flex items-center gap-3 mb-2">
                <h3
                  class="text-lg font-black font-display text-pixel-plum uppercase tracking-wider"
                >
                  {{ req.username }}
                </h3>
                <span
                  class="px-2 py-0.5 border border-pixel-violet text-pixel-violet rounded text-[10px] uppercase font-black tracking-wider"
                  >Awaiting Clearance</span
                >
              </div>
              <div class="flex flex-wrap gap-4 text-xs font-bold text-pixel-plum/60">
                <p>
                  Email: <span class="text-pixel-plum">{{ req.email }}</span>
                </p>
                <p>
                  Proof: <span class="text-pixel-violet">{{ req.proof }}</span>
                </p>
                <p>
                  Requested: <span>{{ req.requested }}</span>
                </p>
              </div>
            </div>

            <div class="flex gap-3 pl-4">
              <button
                @click="handleDeny(req.id, req.username)"
                class="px-4 py-2 border-2 border-byte-coral text-byte-coral hover:bg-byte-coral hover:text-white transition-colors rounded font-black text-xs uppercase tracking-widest"
              >
                Deny Access
              </button>
              <button
                @click="handleApprove(req)"
                class="px-4 py-2 bg-pixel-moss text-white hover:brightness-110 shadow-sm transition-colors rounded font-black text-xs uppercase tracking-widest flex items-center gap-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="3"
                >
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                Authorize
              </button>
            </div>
          </div>
        </transition-group>
      </div>

      <div v-else-if="activeTab === 'reclamation'" key="reclamation" class="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
        <div
          v-if="deletedRecords.length === 0"
          class="bg-pixel-violet/10 border-2 border-pixel-violet/30 rounded-xl p-12 text-center text-pixel-violet font-black uppercase tracking-widest text-sm flex flex-col items-center gap-4"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="12"></line>
            <line x1="12" y1="16" x2="12.01" y2="16"></line>
          </svg>
          Reclamation Center is empty. No soft-deleted logs.
        </div>

        <div
          v-else
          class="bg-white border-2 border-pixel-plum/10 rounded-xl overflow-hidden shadow-pixel-soft"
        >
          <div class="overflow-x-auto">
            <table class="w-full text-left border-collapse">
              <thead>
                <tr
                  class="border-b-2 border-pixel-plum/10 bg-pixel-plum/5 text-pixel-plum/50 font-black text-pixel-10 uppercase tracking-widest"
                >
                  <th class="p-4 pl-6">Deleted Entity</th>
                  <th class="p-4">Source Table</th>
                  <th class="p-4">Reason for Deletion</th>
                  <th class="p-4">Authorized By</th>
                  <th class="p-4">Timestamp</th>
                  <th class="p-4 pr-6 text-right">Actions</th>
                </tr>
              </thead>
              <transition-group name="list" tag="tbody" class="divide-y divide-pixel-plum/5">
                <tr
                  v-for="record in deletedRecords"
                  :key="record.id"
                  class="group border-b border-pixel-plum/5 hover:bg-pixel-violet/[0.03] transition-all"
                >
                  <td class="p-4 pl-6 font-black text-sm text-pixel-plum group-hover:text-pixel-violet transition-colors">
                    {{ getUsernameFromSnapshot(record.snapshot) }}
                  </td>
                  <td class="p-4">
                    <span class="px-2 py-1 border rounded text-[10px] uppercase font-black tracking-wider text-pixel-plum/60 bg-pixel-plum/5 border-pixel-plum/10">
                      {{ record.table_name }}
                    </span>
                  </td>
                  <td class="p-4 text-xs font-bold text-byte-coral/80 max-w-xs truncate" :title="record.reason">
                    {{ record.reason }}
                  </td>
                  <td class="p-4 text-xs font-black text-pixel-plum/70">
                    {{ record.deleted_by }}
                  </td>
                  <td class="p-4 text-xs font-bold text-pixel-plum/50">
                    {{ record.deleted_at }}
                  </td>
                  <td class="p-4 pr-6 text-right flex justify-end gap-2">
                    <button
                      @click="handleRestore(record)"
                      title="Reclaim/Restore Entity"
                      class="p-2 border-2 border-pixel-violet/20 text-pixel-violet rounded hover:bg-pixel-violet hover:text-white transition-colors"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2.5"
                      >
                        <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path>
                        <path d="M3 3v5h5"></path>
                      </svg>
                    </button>
                  </td>
                </tr>
              </transition-group>
            </table>
          </div>
        </div>
      </div>
    </transition>

    <transition name="modal">
      <div
        v-if="isModalOpen"
        class="fixed inset-0 bg-pixel-plum/40 backdrop-blur-sm z-40 flex items-center justify-center p-4"
      >
        <div
          class="modal-content bg-white border-2 border-pixel-plum rounded-xl w-full max-w-md shadow-2xl"
        >
          <div class="p-6 border-b-2 border-pixel-plum/10 flex justify-between items-center">
            <h2 class="text-xl font-black font-display text-pixel-plum uppercase tracking-wider">
              {{ modalMode === 'add' ? 'Register New User' : 'Modify Access' }}
            </h2>
            <button
              @click="isModalOpen = false"
              class="text-pixel-plum/50 hover:text-byte-coral transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="3"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>

          <form @submit.prevent="saveUser" class="p-6 space-y-4">
            <div>
              <label
                class="block text-[10px] font-black uppercase tracking-widest text-pixel-plum/70 mb-2"
                >Identity (Username)</label
              >
              <input
                v-model="formData.username"
                type="text"
                required
                class="w-full p-3 border-2 border-pixel-plum/20 rounded font-bold text-pixel-plum focus:outline-none focus:border-pixel-violet transition-colors"
              />
            </div>
            <div>
              <label
                class="block text-[10px] font-black uppercase tracking-widest text-pixel-plum/70 mb-2"
                >Clearance Role</label
              >
              <select
                v-model="formData.role"
                class="w-full p-3 border-2 border-pixel-plum/20 rounded font-bold text-pixel-plum focus:outline-none focus:border-pixel-violet transition-colors"
              >
                <option value="Player">Player</option>
                <option value="Educator">Educator</option>
                <option value="Admin">Admin</option>
              </select>
            </div>
            <div>
              <label
                class="block text-[10px] font-black uppercase tracking-widest text-pixel-plum/70 mb-2"
                >System Status</label
              >
              <select
                v-model="formData.status"
                class="w-full p-3 border-2 border-pixel-plum/20 rounded font-bold text-pixel-plum focus:outline-none focus:border-pixel-violet transition-colors"
              >
                <option value="Active">Active</option>
                <option value="Pending">Pending</option>
                <option value="Suspended">Suspended</option>
              </select>
            </div>
            <div class="pt-4 flex gap-3">
              <button
                type="button"
                @click="isModalOpen = false"
                class="flex-1 py-3 border-2 border-pixel-plum/20 text-pixel-plum font-black text-xs uppercase tracking-widest rounded hover:bg-pixel-plum/5 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                class="flex-1 py-3 bg-pixel-violet text-white font-black text-xs uppercase tracking-widest rounded shadow-pixel-soft hover:brightness-110 transition-colors"
              >
                {{ modalMode === 'add' ? 'Register' : 'Save Changes' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </transition>

    <!-- Beautiful Soft-Deletion Security Protocol Modal -->
    <transition name="modal">
      <div
        v-if="isDeleteModalOpen"
        class="fixed inset-0 bg-pixel-plum/40 backdrop-blur-sm z-40 flex items-center justify-center p-4"
      >
        <div
          class="modal-content bg-white border-2 border-byte-coral rounded-xl w-full max-w-md shadow-2xl overflow-hidden"
        >
          <!-- Header -->
          <div class="p-6 bg-byte-coral/5 border-b-2 border-byte-coral/20 flex justify-between items-center">
            <div class="flex items-center gap-2 text-byte-coral">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                <line x1="12" y1="9" x2="12" y2="13"></line>
                <line x1="12" y1="17" x2="12.01" y2="17"></line>
              </svg>
              <h2 class="text-base font-black font-display uppercase tracking-wider">
                Security Deletion Protocol
              </h2>
            </div>
            <button
              @click="isDeleteModalOpen = false"
              class="text-pixel-plum/50 hover:text-byte-coral transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="3"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>

          <!-- Body -->
          <form @submit.prevent="executeDelete" class="p-6 space-y-4">
            <div class="bg-byte-coral/[0.04] border-2 border-byte-coral/20 rounded-lg p-4 space-y-2">
              <p class="text-xs font-bold text-pixel-plum/70 uppercase">
                Target Entity:
                <span class="text-byte-coral font-black">{{ deleteTarget.username }}</span>
              </p>
              <p class="text-xs font-bold text-pixel-plum/70 uppercase">
                Clearance Role:
                <span class="text-pixel-plum font-black">{{ deleteTarget.role }}</span>
              </p>
            </div>

            <div>
              <label
                class="block text-[10px] font-black uppercase tracking-widest text-pixel-plum/70 mb-2"
                >Authorization Reason for Soft-Deletion</label
              >
              <textarea
                v-model="deleteTarget.reason"
                required
                rows="3"
                class="w-full p-3 border-2 border-pixel-plum/20 rounded font-bold text-sm text-pixel-plum focus:outline-none focus:border-byte-coral transition-colors"
                placeholder="Specify administrative reason for deactivation/soft-deletion..."
              ></textarea>
            </div>

            <!-- Footer Buttons -->
            <div class="pt-4 flex gap-3">
              <button
                type="button"
                @click="isDeleteModalOpen = false"
                class="flex-1 py-3 border-2 border-pixel-plum/20 text-pixel-plum font-black text-xs uppercase tracking-widest rounded hover:bg-pixel-plum/5 transition-colors"
              >
                Abort Protocol
              </button>
              <button
                type="submit"
                class="flex-1 py-3 bg-byte-coral text-white font-black text-xs uppercase tracking-widest rounded shadow-pixel-soft hover:brightness-110 transition-colors transform active:scale-95 flex items-center justify-center gap-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                  <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                  <line x1="17" y1="8" x2="22" y2="13"></line>
                  <line x1="22" y1="8" x2="17" y2="13"></line>
                </svg>
                Execute Soft-Delete
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
</style>
