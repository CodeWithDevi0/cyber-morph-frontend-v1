<template>
  <div class="fixed top-0 left-0 w-full z-[1000]">
    <nav class="bg-white/70 backdrop-blur-md border-b border-pixel-violet/15 px-6 py-3 flex items-center justify-between shadow-pixel-purple">
      <!-- Brand -->
      <div class="flex items-center gap-8">
        <router-link to="/portal/dashboard" class="text-xl font-black tracking-tighter text-pixel-plum hover:text-pixel-violet transition-colors">
          CYBER<span class="text-pixel-violet">MORPH</span>
        </router-link>

        <!-- Navigation Links (Role Based) -->
        <div class="hidden md:flex items-center gap-6">
          <template v-if="auth.isPlayer || !auth.user?.role">
            <router-link to="/portal/dashboard" class="nav-link">DASHBOARD</router-link>
            <router-link to="/portal/mission-hub" class="nav-link">MISSIONS</router-link>
            <router-link to="/portal/leaderboard" class="nav-link">RANKINGS</router-link>
            <router-link to="/portal/threats" class="nav-link">DATABASE</router-link>
            <router-link to="/portal/classroom/join" class="nav-link">UNITS</router-link>
            <router-link to="/portal/history" class="nav-link">LOGS</router-link>
          </template>
          <template v-else-if="auth.isEducator">
            <router-link to="/portal/educator" class="nav-link">COMMAND CENTER</router-link>
            <router-link to="/portal/leaderboard" class="nav-link">GLOBAL RANKINGS</router-link>
          </template>
          <template v-else-if="auth.isAdmin">
            <router-link to="/portal/dashboard" class="nav-link">ROOT</router-link>
            <router-link to="/portal/users" class="nav-link">USERS</router-link>
            <router-link to="/portal/audit" class="nav-link">AUDIT</router-link>
          </template>
        </div>
      </div>

      <!-- User Stats & Profile -->
      <div class="flex items-center gap-6">
        <!-- Player Stats Badge -->
        <div v-if="auth.isPlayer" class="hidden lg:flex items-center gap-4">
          <div class="flex flex-col items-end">
            <span class="text-[10px] text-pixel-violet uppercase tracking-widest">Security Credits</span>
            <span class="text-sm font-mono text-pixel-plum">{{ auth.credits }} <span class="text-pixel-violet text-[10px]">CR</span></span>
          </div>
          <div class="h-8 w-px bg-pixel-plum/10"></div>
          <div class="flex flex-col items-end">
            <span class="text-[10px] text-pixel-violet uppercase tracking-widest">Progress</span>
            <span class="text-sm font-mono text-pixel-plum">{{ auth.progress }}/4</span>
          </div>
        </div>

        <!-- Profile Dropdown Placeholder -->
        <div class="flex items-center gap-3 pl-4 border-l border-pixel-plum/10">
          <div class="text-right">
            <p class="text-xs font-bold text-pixel-plum leading-none mb-1">{{ auth.username }}</p>
            <p class="text-[10px] text-pixel-violet uppercase tracking-tighter font-black leading-none">{{ auth.user?.role }}</p>
          </div>
          <button @click="handleLogout" class="p-2 text-pixel-plum/40 hover:text-red-500 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
          </button>
        </div>
      </div>
    </nav>

    <!-- Logout Confirmation Modal -->
    <Teleport to="body">
      <transition
        enter-active-class="transition duration-300 ease-out"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition duration-200 ease-in"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div v-if="showLogoutModal" class="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <!-- Backdrop -->
          <div class="absolute inset-0 bg-pixel-plum/40 backdrop-blur-sm" @click="showLogoutModal = false"></div>
          
          <!-- Modal Content -->
          <div class="relative w-full max-w-sm bg-white border-2 border-pixel-violet/30 shadow-pixel-purple p-8 rounded-lg animate-in zoom-in-95 duration-200">
            <div class="text-center mb-6">
              <div class="w-16 h-16 bg-byte-coral/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-byte-coral/20">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" class="text-byte-coral" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
              </div>
              <h3 class="text-xl font-black text-pixel-plum font-display uppercase tracking-tight">Terminate Session?</h3>
              <p class="mt-2 text-xs font-bold text-pixel-plum/60 leading-relaxed uppercase tracking-widest">Disconnect from the secure terminal and exit to the public landing.</p>
            </div>
            
            <div class="grid grid-cols-2 gap-3">
              <button 
                @click="showLogoutModal = false"
                class="py-3 px-4 border border-pixel-plum/10 text-pixel-plum font-black text-[10px] uppercase tracking-widest rounded hover:bg-pixel-plum/5 transition-all"
              >
                Abort
              </button>
              <button 
                @click="confirmLogout"
                class="py-3 px-4 bg-byte-coral text-white font-black text-[10px] uppercase tracking-widest rounded shadow-pixel-alert hover:brightness-110 transition-all"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      </transition>
    </Teleport>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'vue-router';

const auth = useAuthStore();
const router = useRouter();
const showLogoutModal = ref(false);

const handleLogout = () => {
  showLogoutModal.value = true;
};

const confirmLogout = () => {
  auth.logout();
  showLogoutModal.value = false;
  router.push('/login?logout=success');
};
</script>

<style scoped>
@reference "@/assets/main.css";

.nav-link {
  @apply text-xs font-bold tracking-widest text-pixel-plum/60 hover:text-pixel-violet transition-colors relative py-2;
}

.nav-link.router-link-active {
  @apply text-pixel-violet;
}

.nav-link.router-link-active::after {
  content: '';
  @apply absolute bottom-0 left-0 w-full h-0.5 bg-pixel-violet shadow-pixel-purple;
}
</style>
