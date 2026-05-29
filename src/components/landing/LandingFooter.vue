<script setup>
</script>

<template>
  <footer class="px-5 py-10 sm:px-6 lg:px-10">
    <div
      class="mx-auto flex max-w-7xl flex-col gap-8 border-t border-pixel-plum/10 pt-8 md:flex-row md:items-center md:justify-between"
    >
      <div>
        <router-link to="/" class="brand-mark">
          <span class="brand-glyph">CM</span>
          <span>CyberMorph</span>
        </router-link>
        <p class="mt-3 max-w-md text-sm leading-6 text-pixel-plum/65">
          A cybersecurity simulation frontend for players, educators, and administrators.
        </p>
      </div>

      <div class="footer-links">
        <a href="#features">Features</a>
        <a href="#showcase">Showcase</a>
        <a href="mailto:hello@cybermorph.dev">hello@cybermorph.dev</a>
        <a href="https://github.com/CodeWithDevi0/cyber-morph-frontend-v1" target="_blank" rel="noreferrer">GitHub</a>
      </div>
    </div>
  </footer>
</template>

<style scoped>
@reference "../../assets/main.css";

.brand-mark {
  @apply inline-flex items-center gap-3 text-base font-black text-pixel-plum transition-colors hover:text-pixel-violet;
  font-family: var(--font-display);
}

.brand-glyph {
  @apply grid h-10 w-10 place-items-center rounded-md border border-pixel-violet/25 bg-pixel-lavender/45 text-xs text-pixel-plum shadow-pixel-purple;
}

.footer-links {
  @apply flex flex-wrap gap-x-6 gap-y-3 text-sm font-bold text-pixel-plum/65;
}

.footer-links a {
  @apply transition-colors hover:text-pixel-violet;
}
</style>
