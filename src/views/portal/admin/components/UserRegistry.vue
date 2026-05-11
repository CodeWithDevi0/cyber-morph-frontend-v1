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
          System Identity Index
        </h3>
        <div class="flex gap-4">
          <input type="text" placeholder="Search Identities..." class="px-4 py-2 bg-pixel-plum/5 border border-pixel-plum/10 rounded text-xs font-bold focus:outline-none focus:border-pixel-violet/30 min-w-[250px]" />
        </div>
      </div>

      <div class="overflow-x-auto">
        <table class="w-full text-left">
          <thead>
            <tr class="border-b border-pixel-plum/10">
              <th class="pb-4 text-pixel-10 uppercase text-pixel-plum/50 font-black tracking-widest">Identity Node</th>
              <th class="pb-4 text-pixel-10 uppercase text-pixel-plum/50 font-black tracking-widest">Protocol Role</th>
              <th class="pb-4 text-pixel-10 uppercase text-pixel-plum/50 font-black tracking-widest">Activity Status</th>
              <th class="pb-4 text-pixel-10 uppercase text-pixel-plum/50 font-black tracking-widest">Enlistment Date</th>
              <th class="pb-4 text-pixel-10 uppercase text-pixel-plum/50 font-black tracking-widest text-right">Operational Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-pixel-plum/5">
            <tr v-for="user in allUsers" :key="user.id" class="group hover:bg-pixel-plum/[0.02] transition-colors">
              <td class="py-5">
                <div class="flex items-center gap-4">
                  <div class="w-8 h-8 rounded bg-pixel-plum/5 flex items-center justify-center text-pixel-plum/40 font-black text-[10px]">
                    ID:{{ user.id.slice(1) }}
                  </div>
                  <div class="flex flex-col">
                    <span class="text-sm font-black text-pixel-plum uppercase tracking-tight">{{ user.username }}</span>
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
                  <div class="w-1.5 h-1.5 rounded-full" :class="user.status === 'active' ? 'bg-pixel-moss animate-pulse' : 'bg-byte-coral'"></div>
                  <span class="text-pixel-10 font-black uppercase tracking-widest" :class="user.status === 'active' ? 'text-pixel-moss' : 'text-byte-coral'">{{ user.status }}</span>
                </div>
              </td>
              <td class="py-5 text-pixel-11 font-bold text-pixel-plum/60 uppercase tracking-tighter">
                {{ user.joined }}
              </td>
              <td class="py-5 text-right">
                <div class="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                  <button class="px-3 py-1.5 bg-pixel-plum text-white text-[9px] font-black uppercase tracking-widest rounded hover:brightness-110 shadow-pixel-soft">
                    Audit
                  </button>
                  <button class="px-3 py-1.5 border border-byte-coral/30 text-byte-coral text-[9px] font-black uppercase tracking-widest rounded hover:bg-byte-coral/5">
                    Suspend
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
