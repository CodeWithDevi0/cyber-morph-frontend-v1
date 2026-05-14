<script setup>
defineProps({
  allUsers: {
    type: Array,
    required: true
  }
});
</script>

<template>
  <div class="animate-in fade-in slide-in-from-left-4 duration-500">
    <div class="pixel-card min-h-[500px]">
      <div class="flex items-center justify-between mb-8">
        <h3 class="text-xs font-black tracking-widest text-pixel-plum/80 uppercase flex items-center gap-2 font-display">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
          Identity Management Terminal
        </h3>
        <div class="flex gap-4">
          <input type="text" placeholder="Search Identities (Name, Email, Role)..." class="px-4 py-2 bg-pixel-plum/5 border border-pixel-plum/10 rounded text-xs font-bold focus:outline-none focus:border-pixel-violet/30 min-w-[300px]" />
        </div>
      </div>

      <div class="overflow-x-auto">
        <table class="w-full text-left">
          <thead>
            <tr class="border-b border-pixel-plum/10">
              <th class="pb-4 text-pixel-10 uppercase text-pixel-plum/50 font-black tracking-widest">Identity Node</th>
              <th class="pb-4 text-pixel-10 uppercase text-pixel-plum/50 font-black tracking-widest">Protocol Role</th>
              <th class="pb-4 text-pixel-10 uppercase text-pixel-plum/50 font-black tracking-widest">Activity Status</th>
              <th class="pb-4 text-pixel-10 uppercase text-pixel-plum/50 font-black tracking-widest text-right px-4">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-pixel-plum/5">
            <tr v-for="user in allUsers" :key="user.id" class="group hover:bg-pixel-plum/[0.02] transition-colors">
              <td class="py-5">
                <div class="flex items-center gap-4">
                  <div class="w-10 h-10 rounded bg-pixel-plum/5 flex items-center justify-center text-pixel-plum/40 font-black text-[10px] border border-pixel-plum/10">
                    ID:{{ user.id.slice(1) }}
                  </div>
                  <div class="flex flex-col">
                    <span class="text-sm font-black text-pixel-plum uppercase tracking-tight">{{ user.full_name || user.username }}</span>
                    <span class="text-pixel-10 font-bold text-pixel-plum/40 uppercase tracking-tighter">{{ user.email }}</span>
                  </div>
                </div>
              </td>
              <td class="py-5">
                <span class="text-pixel-9 font-black uppercase px-2.5 py-1 rounded tracking-widest" 
                  :class="{
                    'bg-pixel-violet/10 text-pixel-violet': user.role === 'player',
                    'bg-pixel-moss/10 text-pixel-moss': user.role === 'educator',
                    'bg-pixel-plum/10 text-pixel-plum': user.role === 'admin'
                  }">
                  {{ user.role }}
                </span>
              </td>
              <td class="py-5">
                <div class="flex items-center gap-2">
                  <div class="w-2 h-2 rounded-full" :class="[
                    user.status === 'active' ? 'bg-pixel-moss animate-pulse' : 
                    user.status === 'suspended' ? 'bg-byte-coral' : 'bg-signal-gold'
                  ]"></div>
                  <span class="text-pixel-10 font-black uppercase tracking-widest" :class="[
                    user.status === 'active' ? 'text-pixel-moss' : 
                    user.status === 'suspended' ? 'text-byte-coral' : 'text-signal-gold'
                  ]">{{ user.status }}</span>
                </div>
              </td>
              <td class="py-5 text-right px-4">
                <div class="flex justify-end gap-2 opacity-40 group-hover:opacity-100 transition-all duration-300">
                  <button title="Reset Credentials" class="w-8 h-8 flex items-center justify-center bg-pixel-plum/5 text-pixel-plum rounded hover:bg-pixel-plum hover:text-white transition-colors border border-pixel-plum/10">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3z"/></svg>
                  </button>
                  <button title="Modify Access Level" class="w-8 h-8 flex items-center justify-center bg-pixel-plum/5 text-pixel-plum rounded hover:bg-pixel-violet hover:text-white transition-colors border border-pixel-plum/10">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/><path d="m9 12 2 2 4-4"/></svg>
                  </button>
                  <button title="Freeze Identity" class="w-8 h-8 flex items-center justify-center bg-pixel-plum/5 text-byte-coral rounded hover:bg-byte-coral hover:text-white transition-colors border border-byte-coral/10">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                  </button>
                  <button title="Purge Identity" class="w-8 h-8 flex items-center justify-center bg-pixel-plum/5 text-byte-coral rounded hover:bg-byte-coral hover:text-white transition-colors border border-byte-coral/10">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<style scoped>
@reference "../../../../assets/main.css";

.pixel-card {
  @apply bg-white/60 backdrop-blur-md border border-pixel-violet/10 p-6 rounded-xl shadow-pixel-soft;
}
</style>
