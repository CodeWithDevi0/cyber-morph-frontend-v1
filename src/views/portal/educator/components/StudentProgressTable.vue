<script setup>
defineProps({
  students: Array,
  selectedClass: Object
})

defineEmits(['clearFilter', 'viewStudent'])

const formatDate = (dateStr) => {
  if (!dateStr) return 'Never'
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}
</script>

<template>
  <div class="pixel-card">
    <div class="flex items-center justify-between mb-6 pb-4 border-b border-pixel-plum/10">
      <h3 class="text-xs font-black tracking-widest text-pixel-plum/80 uppercase">
        {{
          selectedClass
            ? `Unit ${selectedClass.code_value} Personnel`
            : 'All Personnel Progress'
        }}
      </h3>
      <button
        v-if="selectedClass"
        @click="$emit('clearFilter')"
        class="text-pixel-9 font-black uppercase text-pixel-violet hover:underline"
      >
        Clear Filter
      </button>
    </div>

    <div class="overflow-x-auto">
      <table class="w-full text-left">
        <thead>
          <tr>
            <th class="pb-4 text-pixel-10 uppercase text-pixel-plum/50 font-black tracking-widest px-2">Student</th>
            <th class="pb-4 text-pixel-10 uppercase text-pixel-plum/50 font-black tracking-widest px-2">Status</th>
            <th class="pb-4 text-pixel-10 uppercase text-pixel-plum/50 font-black tracking-widest px-2 text-right">Credits</th>
            <th class="pb-4 text-pixel-10 uppercase text-pixel-plum/50 font-black tracking-widest px-2 text-right">Last Online</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-pixel-plum/5">
          <tr
            v-for="student in students"
            :key="student.username"
            @click="$emit('viewStudent', student)"
            class="group hover:bg-pixel-violet/5 transition-colors cursor-pointer"
          >
            <td class="py-4 px-2">
              <span class="text-sm font-black text-pixel-plum">{{ student.username }}</span>
            </td>
            <td class="py-4 px-2">
              <div class="flex items-center gap-2">
                <div class="flex gap-0.5">
                  <div
                    v-for="i in 4"
                    :key="i"
                    class="w-2 h-2 rounded-full"
                    :class="i <= student.map_progress ? 'bg-pixel-violet' : 'bg-pixel-plum/10'"
                  ></div>
                </div>
                <span class="text-pixel-9 font-black text-pixel-plum/40 uppercase">Map {{ student.map_progress }}</span>
              </div>
            </td>
            <td class="py-4 px-2 text-right">
              <span class="text-sm font-black font-mono text-pixel-violet">{{ student.security_credits }}</span>
            </td>
            <td class="py-4 px-2 text-right text-pixel-10 font-bold text-pixel-plum/40 uppercase">
              {{ formatDate(student.last_synced_at) }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-if="students.length === 0" class="py-12 text-center">
      <p class="text-xs font-bold text-pixel-plum/30 uppercase tracking-widest">
        No personnel assigned to this unit
      </p>
    </div>
  </div>
</template>

<style scoped>
@reference "@/assets/main.css";
</style>
