<script setup>
defineProps({
  showcases: Array
})
</script>

<template>
  <section id="showcase" class="section-band scroll-mt-20 px-5 py-20 sm:px-6 lg:px-10">
    <div class="mx-auto max-w-7xl">
      <div class="section-heading">
        <p class="eyebrow">Simulation gallery</p>
        <h2>Readable previews for every mission type.</h2>
        <p>
          Each mission is represented by a unique map sector, focusing on specific security protocols.
        </p>
      </div>

      <div class="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        <article v-for="item in showcases" :key="item.title" class="showcase-panel">
          <div class="showcase-art" aria-hidden="true">
            <img v-if="item.image" :src="item.image" :alt="item.title" class="showcase-img" />
            <div v-else class="showcase-placeholder">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
                <circle cx="9" cy="9" r="2" />
                <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
              </svg>
              <span class="mt-2 text-pixel-10 font-bold uppercase tracking-wider">Map Preview</span>
            </div>
          </div>
          <p>{{ item.eyebrow }}</p>
          <h3>{{ item.title }}</h3>
          <span>{{ item.description }}</span>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
@reference "../../assets/main.css";

.section-band {
  @apply bg-white/35;
}

.section-heading {
  @apply mx-auto max-w-3xl text-center;
}

.section-heading h2 {
  @apply mt-3 text-3xl font-black leading-tight text-pixel-plum sm:text-4xl;
  font-family: var(--font-display);
}

.section-heading p:not(.eyebrow) {
  @apply mt-4 text-base leading-7 text-pixel-plum/68;
}

.eyebrow {
  @apply text-sm font-black uppercase text-pixel-violet;
  font-family: var(--font-display);
}

.showcase-panel {
  @apply rounded-lg border border-pixel-violet/15 bg-white/58 p-4 shadow-pixel-card transition-all duration-200 hover:-translate-y-1 hover:border-pixel-violet/35;
}

.showcase-art {
  @apply relative flex aspect-retro items-center justify-center rounded-md border border-pixel-violet/15 bg-pixel-lavender/25 overflow-hidden;
}

.showcase-img {
  @apply h-full w-full object-cover;
}

.showcase-placeholder {
  @apply flex flex-col items-center justify-center text-pixel-violet/40;
}

.showcase-panel p {
  @apply mt-5 text-xs font-black uppercase text-signal-gold;
  font-family: var(--font-display);
}

.showcase-panel h3 {
  @apply mt-2 text-2xl font-black text-pixel-plum;
  font-family: var(--font-display);
}

.showcase-panel span {
  @apply mt-3 block text-sm leading-6 text-pixel-plum/68;
}
</style>
