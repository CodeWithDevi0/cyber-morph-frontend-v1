<script setup>
defineProps({
  features: Array
})
</script>

<template>
  <section id="features" class="section-band scroll-mt-20 px-5 py-20 sm:px-6 lg:px-10">
    <div class="mx-auto max-w-7xl">
      <div class="section-heading">
        <p class="eyebrow">Core modules</p>
        <h2>Built for learners, educators, and cyber teams.</h2>
        <p>
          The platform breaks down into specialized capability panels designed for modern training.
        </p>
      </div>

      <div class="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <article
          v-for="feature in features"
          :key="feature.title"
          :class="['feature-card', `accent-${feature.accent}`]"
        >
          <span class="feature-code">{{ feature.code }}</span>
          <h3>{{ feature.title }}</h3>
          <p>{{ feature.description }}</p>
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

.feature-card {
  @apply rounded-lg border border-pixel-violet/15 bg-white/58 p-5 shadow-pixel-card transition-all duration-200 hover:-translate-y-1 hover:border-pixel-violet/35 hover:bg-white/75;
}

.feature-code {
  @apply inline-flex h-9 w-9 items-center justify-center rounded-md border text-xs font-black;
}

.feature-card h3 {
  @apply mt-7 text-xl font-black text-pixel-plum;
  font-family: var(--font-display);
}

.feature-card p {
  @apply mt-3 text-sm leading-6 text-pixel-plum/68;
}

.accent-mint .feature-code {
  @apply border-pixel-moss/70 bg-pixel-moss/20 text-[#4d8f53];
}

.accent-gold .feature-code {
  @apply border-signal-gold/70 bg-signal-gold/20 text-[#9a6a00];
}

.accent-blue .feature-code {
  @apply border-pixel-violet/45 bg-pixel-lavender/35 text-pixel-violet;
}

.accent-coral .feature-code {
  @apply border-byte-coral/45 bg-byte-coral/15 text-[#b84f45];
}
</style>
