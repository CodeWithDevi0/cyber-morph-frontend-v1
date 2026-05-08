<script setup>
// Section data keeps the landing page modular and easy to extend as CyberMorph grows.
const features = [
  {
    code: '01',
    title: 'Adaptive Threat Labs',
    description: 'Practice phishing, network, and device-defense scenarios that react to learner choices.',
    accent: 'mint',
  },
  {
    code: '02',
    title: 'Skill Progression',
    description: 'Turn each mission into measurable growth with credits, map unlocks, and clear next steps.',
    accent: 'gold',
  },
  {
    code: '03',
    title: 'Educator Control',
    description: 'Give instructors a focused portal for classrooms, cohort progress, and guided remediation.',
    accent: 'blue',
  },
  {
    code: '04',
    title: 'Operational Insights',
    description: 'Surface patterns from sessions so teams can see where cyber habits are improving.',
    accent: 'coral',
  },
];

const showcases = [
  {
    title: 'Home Network Defense',
    eyebrow: 'Player Map',
    description: 'A guided scenario for passwords, routers, shared devices, and everyday security hygiene.',
    cells: ['safe', 'safe', 'alert', 'safe', 'focus', 'safe', 'safe', 'alert', 'safe'],
  },
  {
    title: 'School Device Lab',
    eyebrow: 'Classroom Mode',
    description: 'Practice identifying risky links, removable media, and account-sharing decisions.',
    cells: ['safe', 'focus', 'safe', 'alert', 'safe', 'safe', 'safe', 'safe', 'alert'],
  },
  {
    title: 'Public Wi-Fi Challenge',
    eyebrow: 'Scenario Replay',
    description: 'Review choices from a network threat run and compare safer routes through the mission.',
    cells: ['alert', 'safe', 'safe', 'safe', 'focus', 'alert', 'safe', 'safe', 'safe'],
  },
];

const updates = [
  {
    label: 'Design System',
    title: 'Pixel-modern landing kit',
    description: 'New CTA, panel, and showcase styles are ready for reuse across future marketing pages.',
  },
  {
    label: 'Learning Flow',
    title: 'Clearer mission hierarchy',
    description: 'Hero, categories, and gallery sections now explain the product faster on desktop and mobile.',
  },
  {
    label: 'Access',
    title: 'Auth routes preserved',
    description: 'Existing login and register paths remain the primary conversion actions.',
  },
];

const navItems = [
  { label: 'Features', href: '#features' },
  { label: 'Showcase', href: '#showcase' },
  { label: 'Updates', href: '#updates' },
];
</script>

<template>
  <main class="landing-page min-h-screen bg-pixel-sun text-pixel-plum">
    <!-- Hero: original CyberMorph positioning with chunky CTAs and layered product visuals. -->
    <section class="relative isolate overflow-hidden px-5 py-5 sm:px-6 lg:px-10">
      <div class="landing-grid" aria-hidden="true"></div>
      <div class="mx-auto max-w-7xl">
        <nav class="flex items-center justify-between gap-4 py-2" aria-label="Public navigation">
          <router-link to="/" class="brand-mark" aria-label="CyberMorph home">
            <span class="brand-glyph">CM</span>
            <span>CyberMorph</span>
          </router-link>

          <div class="hidden items-center gap-7 md:flex">
            <a v-for="item in navItems" :key="item.href" :href="item.href" class="nav-anchor">
              {{ item.label }}
            </a>
          </div>

          <router-link to="/login" class="nav-login">Login</router-link>
        </nav>

        <div class="flex min-h-[calc(100vh-5.5rem)] items-center justify-center py-14 lg:py-20">
          <div class="mx-auto max-w-4xl text-center">
            <p class="eyebrow">Cybersecurity simulation platform</p>
            <h1 class="mx-auto mt-5 max-w-4xl text-5xl font-black leading-[0.98] text-pixel-plum sm:text-6xl lg:text-7xl">
              Train defenders inside living cyber worlds.
            </h1>
            <p class="mx-auto mt-6 max-w-2xl text-lg leading-8 text-pixel-plum/75">
              CyberMorph turns digital safety lessons into playable missions, clear progress, and instructor-ready insights for modern learning teams.
            </p>

            <div class="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
              <router-link to="/register" class="btn-hero btn-hero-primary">
                Start Training
              </router-link>
              <a href="#showcase" class="btn-hero btn-hero-secondary">
                View Showcase
              </a>
            </div>

            <dl class="mx-auto mt-12 grid max-w-2xl grid-cols-3 gap-3">
              <div class="metric-tile">
                <dt>Maps</dt>
                <dd>04</dd>
              </div>
              <div class="metric-tile">
                <dt>Roles</dt>
                <dd>03</dd>
              </div>
              <div class="metric-tile">
                <dt>Mode</dt>
                <dd>Live</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </section>

    <!-- Feature cards: data-driven panels for reusable product categories. -->
    <section id="features" class="section-band px-5 py-20 sm:px-6 lg:px-10">
      <div class="mx-auto max-w-7xl">
        <div class="section-heading">
          <p class="eyebrow">Core modules</p>
          <h2>Built for learners, educators, and cyber teams.</h2>
          <p>
            The homepage now leads with product value, then breaks the platform into reusable capability panels.
          </p>
        </div>

        <div class="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <article v-for="feature in features" :key="feature.title" :class="['feature-card', `accent-${feature.accent}`]">
            <span class="feature-code">{{ feature.code }}</span>
            <h3>{{ feature.title }}</h3>
            <p>{{ feature.description }}</p>
          </article>
        </div>
      </div>
    </section>

    <!-- Gallery/showcase: original abstract product visuals instead of copied artwork. -->
    <section id="showcase" class="px-5 py-20 sm:px-6 lg:px-10">
      <div class="mx-auto max-w-7xl">
        <div class="section-heading">
          <p class="eyebrow">Simulation gallery</p>
          <h2>Readable previews for every mission type.</h2>
          <p>
            Each card uses a simple tile map motif to suggest gameplay without relying on third-party art.
          </p>
        </div>

        <div class="mt-10 grid gap-5 lg:grid-cols-3">
          <article v-for="item in showcases" :key="item.title" class="showcase-panel">
            <div class="showcase-art" aria-hidden="true">
              <span v-for="(cell, index) in item.cells" :key="`${item.title}-${index}`" :class="['showcase-cell', `cell-${cell}`]"></span>
            </div>
            <p>{{ item.eyebrow }}</p>
            <h3>{{ item.title }}</h3>
            <span>{{ item.description }}</span>
          </article>
        </div>
      </div>
    </section>

    <!-- Updates: optional news area with concise product-facing cards. -->
    <section id="updates" class="section-band px-5 py-20 sm:px-6 lg:px-10">
      <div class="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.75fr_1.25fr]">
        <div class="section-heading section-heading-left">
          <p class="eyebrow">Latest updates</p>
          <h2>Small releases, visible momentum.</h2>
          <p>
            Keep visitors oriented with short, scan-friendly announcements that support the product story.
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

    <!-- Footer: public navigation, social placeholders, and contact information. -->
    <footer class="px-5 py-10 sm:px-6 lg:px-10">
      <div class="mx-auto flex max-w-7xl flex-col gap-8 border-t border-pixel-plum/10 pt-8 md:flex-row md:items-center md:justify-between">
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
          <a href="https://github.com/" target="_blank" rel="noreferrer">GitHub</a>
        </div>
      </div>
    </footer>
  </main>
</template>

<style scoped>
@reference "@/assets/main.css";

.landing-page {
  letter-spacing: 0;
  background: #f7eaff;
}

.landing-page h1,
.landing-page h2,
.landing-page h3,
.brand-mark,
.btn-hero {
  font-family: var(--font-display);
  letter-spacing: 0;
}

.landing-grid {
  position: absolute;
  inset: 0;
  z-index: -1;
  opacity: 0.32;
  background-image:
    linear-gradient(rgba(61, 40, 95, 0.09) 1px, transparent 1px),
    linear-gradient(90deg, rgba(61, 40, 95, 0.09) 1px, transparent 1px);
  background-size: 36px 36px;
  mask-image: linear-gradient(to bottom, black, transparent 84%);
}

.brand-mark {
  @apply inline-flex items-center gap-3 text-base font-black text-pixel-plum transition-colors hover:text-pixel-violet;
}

.brand-glyph {
  @apply grid h-10 w-10 place-items-center rounded-md border border-pixel-violet/25 bg-pixel-lavender/45 text-xs text-pixel-plum shadow-[0_10px_28px_rgba(125,92,255,0.18)];
}

.nav-anchor,
.nav-login {
  @apply text-sm font-bold text-pixel-plum/70 transition-colors hover:text-pixel-plum;
}

.nav-login {
  @apply rounded-md border border-pixel-plum/15 bg-white/45 px-4 py-2 hover:border-pixel-violet/45 hover:text-pixel-violet;
}

.eyebrow {
  @apply text-sm font-black uppercase text-pixel-violet;
  font-family: var(--font-display);
}

.btn-hero {
  @apply inline-flex min-h-12 items-center justify-center rounded-md px-6 text-sm font-black transition-all duration-200 active:scale-[0.98];
}

.btn-hero-primary {
  @apply border border-pixel-violet bg-pixel-violet text-white shadow-[0_14px_34px_rgba(125,92,255,0.24)] hover:brightness-110;
}

.btn-hero-secondary {
  @apply border border-pixel-plum/15 bg-white/55 text-pixel-plum shadow-[0_10px_28px_rgba(61,40,95,0.08)] hover:border-pixel-violet/45 hover:bg-pixel-lavender/35 hover:text-pixel-violet;
}

.metric-tile {
  @apply rounded-md border border-pixel-violet/15 bg-white/55 p-4 shadow-[0_12px_30px_rgba(61,40,95,0.08)];
}

.metric-tile dt {
  @apply text-xs font-bold uppercase text-pixel-plum/55;
}

.metric-tile dd {
  @apply mt-2 font-mono text-2xl font-black text-pixel-plum;
}

.section-band {
  @apply bg-white/35;
}

.section-heading {
  @apply mx-auto max-w-3xl text-center;
}

.section-heading-left {
  @apply mx-0 text-left;
}

.section-heading h2 {
  @apply mt-3 text-3xl font-black leading-tight text-pixel-plum sm:text-4xl;
}

.section-heading p:not(.eyebrow) {
  @apply mt-4 text-base leading-7 text-pixel-plum/68;
}

.feature-card {
  @apply rounded-lg border border-pixel-violet/15 bg-white/58 p-5 shadow-[0_14px_36px_rgba(61,40,95,0.08)] transition-all duration-200 hover:-translate-y-1 hover:border-pixel-violet/35 hover:bg-white/75;
}

.feature-code {
  @apply inline-flex h-9 w-9 items-center justify-center rounded-md border text-xs font-black;
}

.feature-card h3 {
  @apply mt-7 text-xl font-black text-pixel-plum;
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

.showcase-panel {
  @apply rounded-lg border border-pixel-violet/15 bg-white/58 p-4 shadow-[0_14px_36px_rgba(61,40,95,0.08)] transition-all duration-200 hover:-translate-y-1 hover:border-pixel-violet/35;
}

.showcase-art {
  @apply grid aspect-[4/3] grid-cols-3 gap-2 rounded-md border border-pixel-violet/15 bg-pixel-lavender/25 p-3;
}

.showcase-cell {
  @apply rounded-[4px] border border-white/60 bg-white/50;
}

.cell-safe {
  @apply bg-pixel-moss/40;
}

.cell-alert {
  @apply bg-byte-coral/45 shadow-[0_0_18px_rgba(255,111,97,0.2)];
}

.cell-focus {
  @apply bg-signal-gold/55 shadow-[0_0_20px_rgba(255,198,77,0.22)];
}

.showcase-panel p {
  @apply mt-5 text-xs font-black uppercase text-signal-gold;
}

.showcase-panel h3 {
  @apply mt-2 text-2xl font-black text-pixel-plum;
}

.showcase-panel span {
  @apply mt-3 block text-sm leading-6 text-pixel-plum/68;
}

.update-row {
  @apply grid gap-4 rounded-lg border border-pixel-violet/15 bg-white/58 p-5 shadow-[0_14px_36px_rgba(61,40,95,0.08)] md:grid-cols-[9rem_1fr];
}

.update-row p {
  @apply text-xs font-black uppercase text-pixel-violet;
}

.update-row h3 {
  @apply text-lg font-black text-pixel-plum;
}

.update-row span {
  @apply mt-2 block text-sm leading-6 text-pixel-plum/68;
}

.footer-links {
  @apply flex flex-wrap gap-x-6 gap-y-3 text-sm font-bold text-pixel-plum/65;
}

.footer-links a {
  @apply transition-colors hover:text-pixel-violet;
}
@media (max-width: 640px) {
  .metric-tile {
    @apply p-3;
  }

  .metric-tile dd {
    @apply text-xl;
  }
}
</style>
