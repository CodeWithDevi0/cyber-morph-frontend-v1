<template>
  <div class="min-h-screen bg-pixel-lilac text-pixel-plum font-sans flex overflow-hidden">
    <!-- Sidebar Navigation -->
    <SideNav 
      class="hidden md:flex shrink-0 z-100" 
      @logout="showLogoutModal = true"
    />

    <div class="flex-1 flex flex-col min-h-screen overflow-hidden">
      <!-- Mobile Header (Visible only on small screens) -->
      <header class="md:hidden bg-white/70 backdrop-blur-md border-b border-pixel-violet/15 p-4 flex items-center justify-between z-50">
        <h1 class="text-xl font-black tracking-tighter">CYBER<span class="text-pixel-violet">MORPH</span></h1>
        <button @click="showMobileMenu = !showMobileMenu" class="p-2 bg-pixel-plum/5 rounded">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
        </button>
      </header>

      <!-- Main Scrollable Content Area -->
      <main class="flex-1 overflow-y-auto relative no-scrollbar">
        <div class="max-w-7xl mx-auto px-4 md:px-8 py-8">
          <router-view v-slot="{ Component }">
            <transition name="fade" mode="out-in" appear>
              <component :is="Component" />
            </transition>
          </router-view>
        </div>
      </main>
    </div>

    <!-- Mobile SideNav Overlay -->
    <transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="-translate-x-full"
      enter-to-class="translate-x-0"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="translate-x-0"
      leave-to-class="-translate-x-full"
    >
      <SideNav 
        v-if="showMobileMenu" 
        class="fixed inset-y-0 left-0 z-200" 
        @logout="handleLogoutFromMobile"
      />
    </transition>
    <div v-if="showMobileMenu" class="fixed inset-0 bg-pixel-plum/40 backdrop-blur-sm z-150" @click="showMobileMenu = false"></div>

    <!-- Logout Confirmation Modal (Global) -->
    <Teleport to="body">
      <transition
        enter-active-class="transition duration-300 ease-out"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition duration-200 ease-in"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div v-if="showLogoutModal" class="fixed inset-0 z-1000 flex items-center justify-center p-4">
          <div class="absolute inset-0 bg-pixel-plum/40 backdrop-blur-sm" @click="showLogoutModal = false"></div>
          <div class="relative w-full max-w-sm bg-white border-2 border-pixel-violet/30 shadow-pixel-hero p-8 rounded-lg animate-in zoom-in-95 duration-200 text-center">
            <div class="w-16 h-16 bg-byte-coral/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-byte-coral/20">
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" class="text-byte-coral" stroke-width="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
            </div>
            <h3 class="text-xl font-black text-pixel-plum font-display uppercase tracking-tight">Terminate Session?</h3>
            <p class="mt-2 text-xs font-bold text-pixel-plum/60 leading-relaxed uppercase tracking-widest mb-8">Disconnect from the secure terminal and exit to the public landing.</p>
            <div class="grid grid-cols-2 gap-3">
              <button @click="showLogoutModal = false" class="py-3 px-4 border border-pixel-plum/10 text-pixel-plum font-black text-pixel-10 uppercase tracking-widest rounded hover:bg-pixel-plum/5 transition-all">Abort</button>
              <button @click="confirmLogout" class="py-3 px-4 bg-byte-coral text-white font-black text-pixel-10 uppercase tracking-widest rounded shadow-pixel-alert hover:brightness-110 transition-all">Confirm</button>
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
import SideNav from '@/components/SideNav.vue';

const auth = useAuthStore();
const router = useRouter();
const showLogoutModal = ref(false);
const showMobileMenu = ref(false);

const handleLogoutFromMobile = () => {
  showMobileMenu.value = false;
  showLogoutModal.value = true;
};

const confirmLogout = () => {
  auth.logout();
  showLogoutModal.value = false;
  router.push('/login?logout=success');
};
</script>

<style>
@reference "@/assets/main.css";

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.fade-enter-from {
  opacity: 0;
  transform: translateY(10px);
}

.fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
