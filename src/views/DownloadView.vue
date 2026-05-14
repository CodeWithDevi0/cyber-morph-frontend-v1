<script setup>
import LandingHeader from '@/components/landing/LandingHeader.vue'
import LandingFooter from '@/components/landing/LandingFooter.vue'

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'System Requirements', href: '#specs' },
]

const platforms = [
  {
    name: 'Android APK',
    version: 'v1.0.0 - Beta',
    size: '85 MB',
    icon: 'smartphone',
    status: 'Available',
    color: 'pixel-violet',
    note: 'Direct installation file for mobile devices.',
  },
  {
    name: 'Google Play',
    version: 'TBA',
    size: '--',
    icon: 'play',
    status: 'Coming Soon',
    color: 'pixel-plum',
    note: 'Official store deployment in progress.',
  },
  {
    name: 'Steam Hub',
    version: 'TBA',
    size: '--',
    icon: 'steam',
    status: 'Coming Soon',
    color: 'pixel-plum',
    note: 'PC cross-play integration scheduled.',
  },
]
</script>

<template>
  <main class="min-h-screen bg-pixel-lilac">
    <LandingHeader :navItems="navItems" />

    <!-- Hero Section -->
    <section class="py-24 px-6">
      <div class="max-w-7xl mx-auto text-center">
        <h1
          class="text-6xl font-black font-display tracking-tighter text-pixel-plum uppercase mb-6"
        >
          Get the <span class="text-pixel-violet">Simulation</span>
        </h1>
        <p class="max-w-2xl mx-auto text-lg text-pixel-plum/60 font-bold leading-relaxed mb-12">
          Deploy the Cyber-Morph game client to your terminal and begin your security training.
          Available now for Windows beta testers.
        </p>

        <!-- Download Cards -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          <div
            v-for="platform in platforms"
            :key="platform.name"
            class="pixel-card group hover:scale-[1.02] transition-all duration-300"
            :class="
              platform.status === 'Available' ? 'border-pixel-violet/30' : 'opacity-60 grayscale'
            "
          >
            <div
              class="w-16 h-16 rounded-xl bg-pixel-plum/5 flex items-center justify-center text-pixel-plum mb-6 group-hover:bg-pixel-violet/10 group-hover:text-pixel-violet transition-colors"
            >
              <svg
                v-if="platform.icon === 'smartphone'"
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <rect width="14" height="20" x="5" y="2" rx="2" ry="2" />
                <path d="M12 18h.01" />
              </svg>
              <svg
                v-else-if="platform.icon === 'play'"
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <polygon points="5 3 19 12 5 21 5 3" />
              </svg>
              <svg
                v-else-if="platform.icon === 'steam'"
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  d="M1.5 10a8.5 8.5 0 1 0 8.5-8.5A8.5 8.5 0 0 0 1.5 10Zm5.4 3.4a2.7 2.7 0 1 1 2.7-2.7 2.7 2.7 0 0 1-2.7 2.7Zm3.6-2.7a.9.9 0 1 1-.9-.9.9.9 0 0 1 .9.9Z"
                />
              </svg>
              <svg
                v-else
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  d="M12 20.94c1.88-1.59 3.12-3.83 3.12-6.33 0-4.66-3.81-8.44-8.5-8.44-1.31 0-2.54.3-3.62.83V5.5c0-1.38 1.12-2.5 2.5-2.5H12M12 12s.5-1.5 2-1.5 2 1.5 2 1.5m-11 5v-3.5c0-1.38 1.12-2.5 2.5-2.5H6"
                />
              </svg>
            </div>

            <h3 class="text-2xl font-black text-pixel-plum uppercase mb-1">{{ platform.name }}</h3>
            <p class="text-xs font-black text-pixel-plum/40 uppercase tracking-widest mb-4">
              {{ platform.version }} • {{ platform.size }}
            </p>
            <p
              class="text-[10px] font-bold text-pixel-plum/60 uppercase leading-tight mb-6 min-h-[2.5em]"
            >
              {{ platform.note }}
            </p>

            <button
              :disabled="platform.status !== 'Available'"
              class="w-full py-4 rounded-lg font-black uppercase tracking-widest text-sm transition-all shadow-pixel-soft active:scale-95"
              :class="
                platform.status === 'Available'
                  ? 'bg-pixel-violet text-white hover:brightness-110'
                  : 'bg-pixel-plum/10 text-pixel-plum/40 cursor-not-allowed'
              "
            >
              {{ platform.status === 'Available' ? 'Download APK' : platform.status }}
            </button>
          </div>
        </div>

        <!-- Specs Section -->
        <div id="specs" class="max-w-4xl mx-auto border-t-2 border-pixel-plum/5 pt-24 text-left">
          <h2 class="text-3xl font-black text-pixel-plum uppercase mb-12 flex items-center gap-4">
            <span class="w-10 h-1 border-t-4 border-pixel-violet"></span>
            Mobile Requirements
          </h2>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-8">
            <div
              v-for="spec in [
                { label: 'OS', value: 'Android 8.0 (Oreo) or higher' },
                { label: 'Processor', value: 'Octa-core 1.8GHz or higher' },
                { label: 'Memory', value: '4 GB RAM' },
                { label: 'Graphics', value: 'Adreno 506 / Mali-G71 or equivalent' },
                { label: 'Storage', value: '250 MB available space' },
                { label: 'Architecture', value: 'ARM64-v8a / armeabi-v7a' },
              ]"
              :key="spec.label"
              class="border-b border-pixel-plum/5 pb-4"
            >
              <p class="text-[10px] font-black text-pixel-plum/40 uppercase tracking-widest mb-1">
                {{ spec.label }}
              </p>
              <p class="text-sm font-bold text-pixel-plum uppercase">{{ spec.value }}</p>
            </div>
          </div>
        </div>

        <!-- Project Scope Section -->
        <div class="max-w-4xl mx-auto border-t-2 border-pixel-plum/5 pt-24 mb-24">
          <h2 class="text-3xl font-black text-pixel-plum uppercase mb-12 flex items-center gap-4">
            <span class="w-10 h-1 border-t-4 border-byte-coral"></span>
            Project Scope & Limitations
          </h2>

          <div class="prose prose-pixel text-pixel-plum/70 font-bold space-y-6">
            <div class="p-6 bg-pixel-plum/5 rounded-xl border-l-4 border-pixel-violet">
              <h4 class="text-pixel-plum font-black uppercase text-sm mb-2">Primary Deployment</h4>
              <p class="text-sm leading-relaxed">
                Cyber-Morph is currently engineered as a dedicated Android experience to ensure
                maximum accessibility across diverse educational environments. The APK provided
                above is the primary method for tactical deployment during the beta phase.
              </p>
            </div>

            <div class="p-6 bg-byte-coral/5 rounded-xl border-l-4 border-byte-coral">
              <h4 class="text-byte-coral font-black uppercase text-sm mb-2">iOS Support Status</h4>
              <p class="text-sm leading-relaxed">
                Due to current technical limitations and deployment restrictions,
                <span class="text-byte-coral"
                  >iOS / Apple App Store support is not available at this time</span
                >. The development team is prioritizing Android stability and feature parity before
                exploring other mobile ecosystems.
              </p>
            </div>

            <div class="px-6">
              <p class="text-xs uppercase tracking-widest font-black text-pixel-plum/40">
                Notice: Unauthorized redistribution of the Cyber-Morph APK is strictly monitored.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <LandingFooter />
  </main>
</template>

<style scoped>
@reference "@/assets/main.css";

.pixel-card {
  @apply bg-white/60 backdrop-blur-md border-2 border-pixel-plum/5 p-8 rounded-2xl shadow-pixel-soft text-left flex flex-col items-start;
}
</style>
