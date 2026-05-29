<script setup>
import phishBaitGif from '@/assets/attacks_types/GIFs/Phish_Bait.gif'
import mitmAttackGif from '@/assets/attacks_types/GIFs/MitM-Attack.gif'

// Components
import LandingHeader from '@/components/landing/LandingHeader.vue'
import LandingHero from '@/components/landing/LandingHero.vue'
import FeatureGrid from '@/components/landing/FeatureGrid.vue'
import ThreatShowcase from '@/components/landing/ThreatShowcase.vue'
import MapGallery from '@/components/landing/MapGallery.vue'
import UpdatesSection from '@/components/landing/UpdatesSection.vue'
import LandingFooter from '@/components/landing/LandingFooter.vue'

// Batch import all map images
const mapImages = import.meta.glob('@/assets/maps/*.png', { eager: true, import: 'default' })
const getMap = (name) => mapImages[`/src/assets/maps/${name}.png`] || ''

const navItems = [
  { label: 'Features', href: '#features' },
  { label: 'Threats', href: '#attacks' },
  { label: 'Showcase', href: '#showcase' },
  { label: 'Updates', href: '#updates' },
  { label: 'Download', href: '/download' },
]

const attacks = [
  {
    id: '01',
    title: 'Phish-Bait',
    subtitle: 'Deceitful Charmer',
    description: 'Deceptive communications engineered to trick targets into revealing credentials or installing malware.',
    image: phishBaitGif,
    locked: false,
    color: '#38e8d5',
  },
  {
    id: '02',
    title: 'Man in the Middle',
    subtitle: 'Silent Interceptor',
    description: 'An attacker secretly relays and possibly alters the communications between two parties.',
    image: mitmAttackGif,
    locked: false,
    color: '#ff4444',
  }
]

const features = [
  { code: '01', title: 'Adaptive Attacker AI', description: 'Practice phishing, network, and device-defense scenarios that react to learner choices.', accent: 'mint' },
  { code: '02', title: 'Maps Progression', description: 'Turn each mission into measurable growth with credits, map unlocks, and clear next steps.', accent: 'gold' },
  { code: '03', title: 'Educator Control', description: 'Give instructors a focused portal for classrooms, cohort progress, and guided remediation.', accent: 'blue' },
  { code: '04', title: 'Operational Insights', description: 'Surface patterns from sessions so teams can see where cyber habits are improving.', accent: 'coral' },
]

const showcases = [
  { title: 'Home', eyebrow: 'First Map', description: 'Defend your personal space. Master password hygiene, router security, and IoT protection.', image: getMap('home') },
  { title: 'Internet Cafe', eyebrow: 'Second Map', description: 'Stay safe on the go. Learn the dangers of public Wi-Fi, shared terminals, and protecting data.', image: getMap('internet-cafe') },
  { title: 'Office', eyebrow: 'Third Map', description: 'Identify phishing attempts, secure your workstation, and follow data privacy protocols.', image: getMap('office') },
  { title: 'Public Park', eyebrow: 'Fourth Map', description: 'Master physical awareness, secure charging habits, and device privacy in public spaces.', image: getMap('public-park') },
]

const updates = [
  { label: 'Design System', title: 'Pixel-modern landing kit', description: 'New CTA, panel, and showcase styles are ready for reuse across future marketing pages.' },
  { label: 'Learning Flow', title: 'Clearer mission hierarchy', description: 'Hero, categories, and gallery sections now explain the product faster on desktop and mobile.' },
  { label: 'Access', title: 'Auth routes preserved', description: 'Existing login and register paths remain the primary conversion actions.' },
]
</script>

<template>
  <main class="landing-page min-h-screen bg-pixel-lilac text-pixel-plum selection:bg-pixel-violet selection:text-white">
    <LandingHeader :navItems="navItems" />
    
    <LandingHero />
    
    <FeatureGrid :features="features" />
    
    <ThreatShowcase :attacks="attacks" />
    
    <MapGallery :showcases="showcases" />
    
    <UpdatesSection :updates="updates" />
    
    <LandingFooter />
  </main>
</template>

<style scoped>
@reference "../assets/main.css";

.landing-page {
  letter-spacing: 0;
  background: var(--color-pixel-lilac);
}
</style>
