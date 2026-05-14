<script setup>
defineProps({
  navItems: Array
})
</script>

<template>
  <header class="sticky top-0 z-50 border-b border-pixel-plum/5 bg-white/70 backdrop-blur-md">
    <div class="mx-auto max-w-7xl px-5 sm:px-6 lg:px-10">
      <nav class="flex items-center justify-between gap-4 py-4" aria-label="Public navigation">
        <router-link to="/" class="brand-mark" aria-label="CyberMorph home">
          <div class="brand-glyph overflow-hidden">
            <img 
              src="@/assets/logo.png" 
              alt="CyberMorph Logo" 
              class="h-full w-full object-contain p-1.5"
            />
          </div>
          <span>CyberMorph</span>
        </router-link>

        <div class="hidden items-center gap-8 md:flex">
          <a v-for="item in navItems" :key="item.href" :href="item.href" class="nav-anchor">
            {{ item.label }}
          </a>
        </div>

        <router-link to="/login" class="nav-login">Login</router-link>
      </nav>
    </div>
  </header>
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

.nav-anchor,
.nav-login {
  @apply text-sm font-bold text-pixel-plum/70 transition-colors hover:text-pixel-plum;
}

.nav-login {
  @apply rounded-md border border-pixel-plum/15 bg-white/45 px-4 py-2 hover:border-pixel-violet/45 hover:text-pixel-violet;
}
</style>
