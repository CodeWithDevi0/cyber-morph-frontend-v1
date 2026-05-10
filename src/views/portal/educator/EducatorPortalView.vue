<script setup>
import { ref, computed, onMounted } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { useRoute, useRouter } from 'vue-router';
import { mockEducator, mockClassroomCodes } from '@/api/mock';

const auth = useAuthStore();
const route = useRoute();
const router = useRouter();
const showWelcomeToast = ref(false);

const activeCodes = ref([...mockClassroomCodes]);
const allStudents = ref([...mockEducator.assigned_students]);
const selectedClass = ref(null);
const showConfirmModal = ref(false);

onMounted(() => {
  if (route.query.login === 'success') {
    router.replace({ query: {} });
    setTimeout(() => {
      showWelcomeToast.value = true;
      setTimeout(() => {
        showWelcomeToast.value = false;
      }, 3000);
    }, 500);
  }
});

const students = computed(() => {
  if (!selectedClass.value) return allStudents.value;
  if (selectedClass.value.code_value === 'MORPH9') return allStudents.value.slice(0, 2);
  if (selectedClass.value.code_value === 'CYBER2') return allStudents.value.slice(2, 3);
  return [];
});

const handleGenerateClick = () => {
  showConfirmModal.value = true;
};

const confirmGenerateCode = () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < 6; i++) result += chars.charAt(Math.floor(Math.random() * chars.length));
  
  activeCodes.value.unshift({
    code_id: `c${activeCodes.value.length + 1}`,
    code_value: result,
    is_active: true,
    students_count: 0,
    created_at: new Date().toISOString()
  });
  showConfirmModal.value = false;
};

const formatDate = (dateStr) => {
  return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
};

const toggleClassFilter = (code) => {
  selectedClass.value = selectedClass.value?.code_id === code.code_id ? null : code;
};
</script>

<template>
  <div class="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 text-pixel-plum">
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
          <p class="text-[10px] font-black text-white/70 uppercase tracking-widest leading-none mb-1.5">Secure Link Established</p>
          <p class="text-sm font-black text-white font-display uppercase tracking-tight">Educator Access Granted</p>
        </div>
      </div>
    </transition>

    <!-- Header -->
    <div class="flex flex-col md:flex-row md:items-end justify-between gap-4">
      <div>
        <h1 class="text-4xl font-black font-display tracking-tight text-pixel-plum uppercase">Educator Command</h1>
        <p class="text-[10px] text-pixel-plum/60 uppercase font-black tracking-[0.25em] mt-2 flex items-center gap-2">
          <span class="w-2 h-2 rounded-full bg-pixel-moss animate-pulse"></span>
          Instructor: {{ auth.user?.display_name || mockEducator.display_name }}
        </p>
      </div>

      <button 
        @click="handleGenerateClick"
        class="px-6 py-2.5 bg-pixel-moss text-white font-black font-display text-xs uppercase tracking-widest rounded-md shadow-pixel-soft hover:brightness-105 transition-all flex items-center gap-2"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
        Generate Access Code
      </button>
    </div>

    <!-- Quick Stats -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div class="pixel-card border-l-4 border-l-pixel-moss">
        <p class="text-[10px] uppercase font-black text-pixel-plum/40 tracking-widest mb-1">Total Students</p>
        <p class="text-3xl font-black text-pixel-plum">{{ allStudents.length }}</p>
      </div>
      <div class="pixel-card border-l-4 border-l-pixel-violet">
        <p class="text-[10px] uppercase font-black text-pixel-plum/40 tracking-widest mb-1">Active Classes</p>
        <p class="text-3xl font-black text-pixel-plum">{{ activeCodes.filter(c => c.is_active).length }}</p>
      </div>
      <div class="pixel-card border-l-4 border-l-signal-gold">
        <p class="text-[10px] uppercase font-black text-pixel-plum/40 tracking-widest mb-1">Cohort Average Progress</p>
        <p class="text-3xl font-black text-pixel-plum">Map 2.3</p>
      </div>
    </div>

    <div class="grid grid-cols-1 xl:grid-cols-[1fr_350px] gap-8">
      <!-- Student Progress -->
      <div class="space-y-6">
        <div class="pixel-card">
          <div class="flex items-center justify-between mb-6 pb-4 border-b border-pixel-plum/10">
            <h3 class="text-xs font-black tracking-widest text-pixel-plum/80 uppercase">
              {{ selectedClass ? `Unit ${selectedClass.code_value} Personnel` : 'All Personnel Progress' }}
            </h3>
            <button 
              v-if="selectedClass"
              @click="selectedClass = null"
              class="text-[9px] font-black uppercase text-pixel-violet hover:underline"
            >
              Clear Filter
            </button>
          </div>
          
          <div class="overflow-x-auto">
            <table class="w-full text-left">
              <thead>
                <tr>
                  <th class="pb-4 text-[10px] uppercase text-pixel-plum/50 font-black tracking-widest px-2">Student</th>
                  <th class="pb-4 text-[10px] uppercase text-pixel-plum/50 font-black tracking-widest px-2">Status</th>
                  <th class="pb-4 text-[10px] uppercase text-pixel-plum/50 font-black tracking-widest px-2 text-right">Credits</th>
                  <th class="pb-4 text-[10px] uppercase text-pixel-plum/50 font-black tracking-widest px-2 text-right">Last Online</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-pixel-plum/5">
                <tr v-for="student in students" :key="student.username" class="group hover:bg-pixel-violet/5 transition-colors">
                  <td class="py-4 px-2">
                    <span class="text-sm font-black text-pixel-plum">{{ student.username }}</span>
                  </td>
                  <td class="py-4 px-2">
                    <div class="flex items-center gap-2">
                      <div class="flex gap-0.5">
                        <div v-for="i in 4" :key="i" class="w-2 h-2 rounded-full" :class="i <= student.map_progress ? 'bg-pixel-violet' : 'bg-pixel-plum/10'"></div>
                      </div>
                      <span class="text-[9px] font-black text-pixel-plum/40 uppercase">Map {{ student.map_progress }}</span>
                    </div>
                  </td>
                  <td class="py-4 px-2 text-right">
                    <span class="text-sm font-black font-mono text-pixel-violet">{{ student.security_credits }}</span>
                  </td>
                  <td class="py-4 px-2 text-right text-[10px] font-bold text-pixel-plum/40 uppercase">
                    {{ formatDate(student.last_synced_at) }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div v-if="students.length === 0" class="py-12 text-center">
            <p class="text-xs font-bold text-pixel-plum/30 uppercase tracking-widest">No personnel assigned to this unit</p>
          </div>
        </div>
      </div>

      <!-- Active Classroom Codes -->
      <div class="space-y-6">
        <div class="pixel-card bg-pixel-plum/5 border-pixel-plum/10">
          <h3 class="text-xs font-black tracking-widest text-pixel-plum/80 uppercase mb-6">Access Terminals</h3>
          <div class="space-y-4">
            <button 
              v-for="code in activeCodes" 
              :key="code.code_id" 
              @click="toggleClassFilter(code)"
              class="w-full p-4 bg-white border-2 rounded-lg flex items-center justify-between shadow-sm transition-all text-left"
              :class="[
                code.is_active ? 'hover:border-pixel-violet/40' : 'grayscale opacity-60 cursor-not-allowed',
                selectedClass?.code_id === code.code_id ? 'border-pixel-violet ring-2 ring-pixel-violet/20' : 'border-pixel-plum/10'
              ]"
            >
              <div>
                <p class="text-xl font-black font-display text-pixel-plum tracking-widest">{{ code.code_value }}</p>
                <p class="text-[9px] font-black text-pixel-plum/40 uppercase mt-1">{{ code.students_count }} Students Enrolled</p>
              </div>
              <div v-if="code.is_active" class="w-2 h-2 rounded-full bg-pixel-moss" :class="selectedClass?.code_id === code.code_id ? 'animate-ping' : 'animate-pulse'"></div>
              <div v-else class="text-[9px] font-black text-byte-coral uppercase tracking-tighter">Inactive</div>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Confirmation Modal -->
    <Teleport to="body">
      <transition
        enter-active-class="transition duration-300 ease-out"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition duration-200 ease-in"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div v-if="showConfirmModal" class="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <div class="absolute inset-0 bg-pixel-plum/40 backdrop-blur-sm" @click="showConfirmModal = false"></div>
          
          <div class="relative w-full max-w-sm bg-white border-2 border-pixel-violet/30 shadow-pixel-hero p-8 rounded-lg animate-in zoom-in-95 duration-200 text-center">
            <div class="w-16 h-16 bg-pixel-moss/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-pixel-moss/20">
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" class="text-pixel-moss" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
            </div>
            <h3 class="text-xl font-black text-pixel-plum font-display uppercase tracking-tight">New Terminal Code</h3>
            <p class="mt-2 text-xs font-bold text-pixel-plum/60 leading-relaxed uppercase tracking-widest mb-8">
              Are you sure you want to initialize a new classroom access code? This will create a unique entry point for new students.
            </p>
            
            <div class="grid grid-cols-2 gap-3">
              <button @click="showConfirmModal = false" class="py-3 px-4 border border-pixel-plum/10 text-pixel-plum font-black text-[10px] uppercase tracking-widest rounded hover:bg-pixel-plum/5 transition-all">Cancel</button>
              <button @click="confirmGenerateCode" class="py-3 px-4 bg-pixel-moss text-white font-black text-[10px] uppercase tracking-widest rounded shadow-pixel-soft hover:brightness-110 transition-all">Confirm</button>
            </div>
          </div>
        </div>
      </transition>
    </Teleport>
  </div>
</template>

<style scoped>
@reference "@/assets/main.css";
</style>
