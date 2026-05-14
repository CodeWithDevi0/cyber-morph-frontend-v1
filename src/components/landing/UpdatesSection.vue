<script setup>
defineProps({
  updates: Array
})
</script>

<template>
  <section id="updates" class="scroll-mt-20 px-5 py-20 sm:px-6 lg:px-10">
    <div class="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.75fr_1.25fr]">
      <div class="section-heading section-heading-left">
        <p class="eyebrow">Latest updates</p>
        <h2>Small releases, visible momentum.</h2>
        <p>
          Stay informed about the latest protocol deployments and system enhancements.
        </p>
      </div>

      <div class="grid gap-4">
        <article v-for="update in updates" :key="update.title" class="update-row">
          <p>{{ update.label }}</p>
          <div>
            <h3>{{ update.title }}</h3>
            <span>{{ update.description }}</span>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
@reference "../../assets/main.css";

.section-heading {
  @apply mx-auto max-w-3xl text-center;
}

.section-heading-left {
  @apply mx-0 text-left;
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

.update-row {
  @apply grid gap-4 rounded-lg border border-pixel-violet/15 bg-white/58 p-5 shadow-pixel-card md:grid-cols-[9rem_1fr];
}

.update-row p {
  @apply text-xs font-black uppercase text-pixel-violet;
  font-family: var(--font-display);
}

.update-row h3 {
  @apply text-lg font-black text-pixel-plum;
  font-family: var(--font-display);
}

.update-row span {
  @apply mt-2 block text-sm leading-6 text-pixel-plum/68;
}
</style>
