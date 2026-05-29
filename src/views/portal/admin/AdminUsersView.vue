<script setup>
import { ref } from 'vue'
import { mockAdmin } from '@/api/mock'

// Components
import UsersTable from './components/UsersTable.vue'

const allUsers = ref([...mockAdmin.all_users])
</script>

<template>
  <div class="animate-in fade-in slide-in-from-bottom-4 duration-700">
    <!-- Header Section -->
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 border-b-2 border-pixel-plum/10 pb-8">
      <div>
        <div class="flex items-center gap-3 mb-1">
          <div class="w-2 h-2 rounded-full bg-pixel-violet animate-pulse"></div>
          <h1 class="text-4xl font-black font-display tracking-tighter text-pixel-plum uppercase">Users</h1>
        </div>
        <p class="text-pixel-10 text-pixel-plum/50 uppercase font-black tracking-[0.3em] flex items-center gap-2">
          Protocol: <span class="text-pixel-violet">Identity Hub</span> 
          <span class="mx-1 opacity-30">|</span> 
          Total Entities: <span class="text-pixel-plum">{{ allUsers.length }}</span>
        </p>
      </div>

      <div class="flex gap-3">
        <button class="px-6 py-3 bg-pixel-violet text-white rounded-lg font-black text-xs uppercase tracking-widest hover:brightness-110 shadow-pixel-soft transition-all transform active:scale-95">Register New User</button>
      </div>
    </div>

    <UsersTable :all-users="allUsers" />
  </div>
</template>

<style scoped>
@reference "@/assets/main.css";
</style>
