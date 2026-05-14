<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  attacks: Array
})

const activeAttackId = ref('01')
const activeAttack = computed(
  () => props.attacks.find((a) => a.id === activeAttackId.value) || props.attacks[0],
)
</script>

<template>
  <section
    id="attacks"
    class="scroll-mt-20 w-full bg-[#180a29] relative overflow-hidden font-mono selection:bg-pixel-violet selection:text-white mt-10 border-t-4 border-[#1b0a2f]"
  >
    <!-- Angled background on the left -->
    <div
      class="absolute inset-y-0 left-0 w-[55%] lg:w-[60%] bg-[#2a1b49] z-0"
      style="clip-path: polygon(0 0, 100% 0, 85% 100%, 0 100%)"
    ></div>

    <!-- Giant Watermark -->
    <div
      class="absolute top-1/2 left-[-2%] -translate-y-1/2 z-0 select-none pointer-events-none opacity-[0.03] transform -skew-x-12"
    >
      <h2
        class="text-[14rem] md:text-[18rem] lg:text-[22rem] font-black text-white tracking-widest leading-none"
      >
        PHISH
      </h2>
    </div>

    <!-- Main Content Container -->
    <div
      class="relative z-10 mx-auto max-w-[1400px] px-5 py-12 md:py-20 sm:px-6 lg:px-10 flex flex-col lg:flex-row items-center justify-between min-h-[500px] lg:min-h-[600px] gap-10"
    >
      <!-- Left Side: Title & Info -->
      <div
        class="flex flex-col items-center lg:items-start text-center lg:text-left lg:ml-10 xl:ml-20 w-full lg:w-1/2"
      >
        <div class="flex flex-col lg:flex-row items-center gap-6">
          <!-- Thumbnail -->
          <div
            class="w-32 h-20 border border-[#4a3076] overflow-hidden bg-black shadow-lg flex-shrink-0"
          >
            <img
              :src="activeAttack.image"
              class="w-full h-full object-cover opacity-80"
              alt="Thumbnail"
              style="image-rendering: pixelated"
              loading="lazy"
            />
          </div>
          <div class="flex flex-col items-center lg:items-start">
            <p class="text-xs font-bold text-[#a589e6] tracking-widest uppercase mb-1">
              {{ activeAttack.subtitle }}
            </p>
            <div class="flex items-center gap-4">
              <h3
                class="text-5xl lg:text-6xl font-black text-white italic tracking-wide drop-shadow-md"
                style="font-family: var(--font-display)"
              >
                {{ activeAttack.title }}
              </h3>
              <span
                v-if="activeAttackId === '01'"
                class="bg-[#ffcc00] text-black text-pixel-11 font-black px-2 py-1 rounded-sm uppercase tracking-widest leading-none shadow-[2px_2px_0px_rgba(0,0,0,0.5)] transform -translate-y-2"
                >New</span
              >
            </div>
          </div>
        </div>
      </div>

      <!-- Right Side: The GIF showcase -->
      <div
        class="relative flex flex-col items-end w-full max-w-[500px] lg:max-w-none lg:w-[600px] lg:mr-10 xl:mr-32"
      >
        <img
          :src="activeAttack.image"
          :alt="activeAttack.title"
          class="relative z-10 w-full h-auto object-contain drop-shadow-[0_0_25px_rgba(0,0,0,0.6)] transition-all duration-300"
          style="image-rendering: pixelated"
          loading="lazy"
        />

        <!-- Action Bar (Below Image) -->
        <div class="mt-4 flex justify-end w-full pr-2">
          <button
            class="bg-black border border-white/60 rounded-full px-5 py-1.5 text-xs font-bold text-white hover:bg-white hover:text-black transition-colors duration-200 flex items-center gap-1 shadow-[0_4px_10px_rgba(0,0,0,0.4)] z-20 relative"
          >
            More <span class="text-pixel-10">▶</span>
          </button>
        </div>

        <!-- Right Side Navigation (Dotted Line + Avatars) -->
        <div
          class="hidden xl:flex absolute -right-28 top-1/2 -translate-y-1/2 items-center gap-5 z-20"
        >
          <!-- Pagination dots -->
          <div class="flex flex-col gap-3 items-center">
            <div class="w-2 h-2 bg-white/20 rounded-sm"></div>
            <div class="w-2 h-2 bg-white/20 rounded-sm"></div>
            <div
              class="w-2 h-10 rounded-sm transition-all duration-300"
              :style="{
                backgroundColor: activeAttack.color,
                boxShadow: `0 0 10px ${activeAttack.color}`,
              }"
            ></div>
            <div class="w-2 h-2 bg-white/20 rounded-sm"></div>
            <div class="w-2 h-2 bg-white/20 rounded-sm"></div>
          </div>

          <!-- Avatar Cards -->
          <div class="flex flex-col gap-3">
            <button
              v-for="attack in attacks.filter(a => !a.locked)"
              :key="attack.id"
              @click="activeAttackId = attack.id"
              class="w-[4.5rem] h-[4.5rem] rounded-[14px] overflow-hidden border-[3px] transition-all duration-300 relative"
              :class="
                activeAttackId === attack.id
                  ? `shadow-[0_0_15px_${attack.color}] scale-110 z-10`
                  : 'border-[#4a3076]/50 hover:border-white/60 hover:scale-105'
              "
              :style="{ borderColor: activeAttackId === attack.id ? attack.color : '' }"
            >
              <div
                class="absolute inset-0 bg-black/40 z-10 transition-opacity"
                :class="activeAttackId === attack.id ? 'opacity-0' : 'opacity-100'"
              ></div>
              <img 
                :src="attack.image" 
                class="w-full h-full object-cover bg-black" 
                loading="lazy"
              />
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Bottom Action Bar -->
    <div class="w-full h-auto sm:h-[88px] bg-[#503399] border-t-[3px] border-[#ff7b59] flex relative">
      <div
        class="absolute left-0 top-0 bottom-0 w-[55%] md:w-[45%] bg-[#7050c9] z-0"
        style="clip-path: polygon(0 0, 100% 0, 95% 100%, 0 100%)"
      ></div>

      <div class="relative z-10 mx-auto w-full max-w-[1400px] px-5 sm:px-6 lg:px-10 flex flex-col sm:flex-row items-center justify-between h-full py-4 sm:py-0">
        <div class="flex flex-col justify-center h-full w-full sm:w-auto">
          <p class="text-pixel-10 font-black text-[#321c59] uppercase tracking-widest mb-0.5">First Encounter</p>
          <div class="flex items-center gap-4">
            <h4 class="text-xl md:text-2xl lg:text-[28px] font-black text-white italic tracking-wide uppercase" style="font-family: var(--font-display)">
              AVAILABLE IN MAP 1
            </h4>
          </div>
        </div>

        <div class="relative h-full flex items-center mt-4 sm:mt-0 lg:pr-4 group cursor-pointer">
          <span class="absolute -top-3 right-[10%] text-pixel-10 text-[#ff4444] font-black not-italic opacity-0 group-hover:opacity-100 transition-opacity z-20">CLICK!</span>
          <button class="bg-white text-black font-black italic text-xl px-10 py-3 transform -skew-x-12 group-hover:bg-[#f0f0f0] transition-colors shadow-[4px_4px_0px_rgba(0,0,0,0.8)] flex items-center justify-center relative pointer-events-none">
            <span class="transform skew-x-12 inline-block uppercase">Engage</span>
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
@reference "../../assets/main.css";
</style>
