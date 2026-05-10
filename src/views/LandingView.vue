<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import phishBaitGif from '@/assets/attacks_types/GIFs/Phish_Bait.gif'
import mitmAttackGif from '@/assets/attacks_types/GIFs/MitM-Attack.gif'
import { computed } from 'vue'

// Batch import all map images from the assets folder
const mapImages = import.meta.glob('@/assets/maps/*.png', { eager: true, import: 'default' })
const getMap = (name) => mapImages[`/src/assets/maps/${name}.png`] || ''

const attacks = [
  {
    id: '01',
    title: 'Phish-Bait',
    subtitle: 'Deceitful Charmer',
    description:
      'Deceptive communications engineered to trick targets into revealing credentials or installing malware.',
    image: phishBaitGif,
    locked: false,
    color: '#38e8d5',
  },
  {
    id: '02',
    title: 'Man in the Middle',
    subtitle: 'Silent Interceptor',
    description:
      'An attacker secretly relays and possibly alters the communications between two parties.',
    image: mitmAttackGif,
    locked: false,
    color: '#ff4444',
  },
  {
    id: '03',
    title: 'Classified',
    description: 'New threat vector analysis pending. Training module currently locked.',
    locked: true,
  },
  {
    id: '04',
    title: 'Classified',
    description: 'New threat vector analysis pending. Training module currently locked.',
    locked: true,
  },
  {
    id: '05',
    title: 'Classified',
    description: 'New threat vector analysis pending. Training module currently locked.',
    locked: true,
  },
  {
    id: '06',
    title: 'Classified',
    description: 'New threat vector analysis pending. Training module currently locked.',
    locked: true,
  },
  {
    id: '07',
    title: 'Classified',
    description: 'New threat vector analysis pending. Training module currently locked.',
    locked: true,
  },
  {
    id: '08',
    title: 'Classified',
    description: 'New threat vector analysis pending. Training module currently locked.',
    locked: true,
  },
]

const activeAttackId = ref('01')
const activeAttack = computed(
  () => attacks.find((a) => a.id === activeAttackId.value) || attacks[0],
)

// Section data keeps the landing page modular and easy to extend as CyberMorph grows.
const features = [
  {
    code: '01',
    title: 'Adaptive Attacker AI',
    description:
      'Practice phishing, network, and device-defense scenarios that react to learner choices.',
    accent: 'mint',
  },
  {
    code: '02',
    title: 'Maps Progression',
    description:
      'Turn each mission into measurable growth with credits, map unlocks, and clear next steps.',
    accent: 'gold',
  },
  {
    code: '03',
    title: 'Educator Control',
    description:
      'Give instructors a focused portal for classrooms, cohort progress, and guided remediation.',
    accent: 'blue',
  },
  {
    code: '04',
    title: 'Operational Insights',
    description:
      'Surface patterns from sessions so teams can see where cyber habits are improving.',
    accent: 'coral',
  },
]

const showcases = [
  {
    title: 'Home',
    eyebrow: 'First Map',
    description:
      'Defend your personal space. Master password hygiene, router security, and IoT protection for your home network.',
    image: getMap('home'),
  },
  {
    title: 'Internet Cafe',
    eyebrow: 'Second Map',
    description:
      'Stay safe on the go. Learn the dangers of public Wi-Fi, shared terminals, and protecting your data in open environments.',
    image: getMap('internet-cafe'),
  },
  {
    title: 'Office',
    eyebrow: 'Third Map',
    description:
      'Protect the organization. Identify phishing attempts, secure your workstation, and follow data privacy protocols in a professional setting.',
    image: getMap('office'),
  },
  {
    title: 'Public Park',
    eyebrow: 'Fourth Map',
    description:
      'Security in the wild. Master physical awareness, secure charging habits, and device privacy in crowded public spaces.',
    image: getMap('public-park'),
  },
]

const updates = [
  {
    label: 'Design System',
    title: 'Pixel-modern landing kit',
    description:
      'New CTA, panel, and showcase styles are ready for reuse across future marketing pages.',
  },
  {
    label: 'Learning Flow',
    title: 'Clearer mission hierarchy',
    description:
      'Hero, categories, and gallery sections now explain the product faster on desktop and mobile.',
  },
  {
    label: 'Access',
    title: 'Auth routes preserved',
    description: 'Existing login and register paths remain the primary conversion actions.',
  },
]

const navItems = [
  { label: 'Features', href: '#features' },
  { label: 'Threats', href: '#attacks' },
  { label: 'Showcase', href: '#showcase' },
  { label: 'Updates', href: '#updates' },
]

const heroCanvas = ref(null)
let animationFrameId = null
let mouseX = -100
let mouseY = -100

// Character state
const player = {
  x: 200,
  y: 200,
  width: 32,
  height: 32,
  speed: 2.5,
  color: '#7D5CFF', // pixel-violet
  targetX: 200,
  targetY: 200,
  isMoving: false,
  frameCount: 0,
}

// Generate some static "pixel" servers
const servers = []
for (let i = 0; i < 6; i++) {
  servers.push({
    x: 0,
    y: 0,
    width: 60,
    height: 90,
    isUnderAttack: false,
    attackTimer: 0,
  })
}

const handleMouseMove = (e) => {
  const canvas = heroCanvas.value
  if (!canvas) return
  const rect = canvas.getBoundingClientRect()
  mouseX = e.clientX - rect.left
  mouseY = e.clientY - rect.top
  player.targetX = mouseX
  player.targetY = mouseY
}

const handleMouseLeave = () => {
  player.targetX = player.x
  player.targetY = player.y
  mouseX = -100
  mouseY = -100
}

const placeServers = (w, h) => {
  const placedServers = []
  const minDistance = 110 // Minimum spacing between server units

  // Define a bounding box for the central text to avoid overlapping
  // The max-w-4xl is 896px. Subtracting padding gives actual text area width.
  const textWidth = Math.min(896, w - 40)
  const textLeft = (w - textWidth) / 2
  const textRight = textLeft + textWidth

  // The text content block (title, paragraph, buttons, metrics) is roughly 500px tall
  const textHeight = 500
  const textTop = (h - textHeight) / 2
  const textBottom = textTop + textHeight

  servers.forEach((obs) => {
    let isValid = false
    let attempts = 0

    while (!isValid && attempts < 100) {
      const isLeft = Math.random() > 0.5
      let testX, testY

      if (w > 1024) {
        // Desktop: Plenty of space on the sides
        testX = isLeft ? Math.random() * (w * 0.15) + 20 : Math.random() * (w * 0.15) + w * 0.8
        testY = Math.random() * (h * 0.7) + h * 0.15
      } else {
        // Mobile/Tablet: Keep firmly on the edges
        testX = isLeft ? Math.random() * 10 - 10 : w - 50 - Math.random() * 10

        // Explicitly target safe Y zones (above or below text)
        const safeTopSpace = Math.max(0, textTop - 20)
        const safeBottomSpace = Math.max(0, h - textBottom - 20)

        // Pick top or bottom based on availability and randomness
        if (safeTopSpace > 100 && (Math.random() > 0.5 || safeBottomSpace < 100)) {
          testY = Math.random() * (safeTopSpace - 90) + 90
        } else if (safeBottomSpace > 100) {
          testY = Math.random() * (safeBottomSpace - 90) + textBottom + 90
        } else {
          testY = Math.random() * (h * 0.8) + h * 0.1
        }
      }

      // Calculate server bounding box (adjusted for width=60, height=90, drawn upwards)
      const serverLeft = testX
      const serverRight = testX + obs.width
      const serverTop = testY - obs.height
      const serverBottom = testY

      // Strict check: Does this server overlap the central text block?
      const overlapsText = !(
        serverRight < textLeft ||
        serverLeft > textRight ||
        serverBottom < textTop ||
        serverTop > textBottom
      )

      // Check distance against already placed servers to prevent them from stacking
      let overlapsServers = false
      for (const placed of placedServers) {
        const dx = placed.x - testX
        const dy = placed.y - testY
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < minDistance) {
          overlapsServers = true
          break
        }
      }

      if (!overlapsText && !overlapsServers) {
        obs.x = testX
        obs.y = testY
        placedServers.push(obs)
        isValid = true
      }
      attempts++
    }

    // Fallback if no safe spot found (prevents identical stacking)
    if (!isValid) {
      const isLeft = Math.random() > 0.5
      obs.x = isLeft ? -10 : w - 50

      // Calculate how many servers are already in this general corner
      let cornerCount = 0
      const isTop = Math.random() > 0.5
      for (const placed of placedServers) {
        if ((isLeft && placed.x < w / 2) || (!isLeft && placed.x > w / 2)) {
          if ((isTop && placed.y < h / 2) || (!isTop && placed.y > h / 2)) {
            cornerCount++
          }
        }
      }

      // Offset vertically by 100px for each server already in this corner
      obs.y = isTop
        ? Math.max(90, h * 0.15) + cornerCount * 100
        : Math.min(h - 20, h * 0.85) - cornerCount * 100
      placedServers.push(obs)
    }
    // Save the proportional ratio for non-random resizing adaptations
    obs.baseXRatio = obs.x / w
    obs.baseYRatio = obs.y / h
  })
}

let serversPlaced = false

const adaptServers = (w, h) => {
  const textWidth = Math.min(896, w - 40)
  const textLeft = (w - textWidth) / 2
  const textRight = textLeft + textWidth
  const textHeight = 500
  const textTop = (h - textHeight) / 2
  const textBottom = textTop + textHeight

  servers.forEach((obs) => {
    // 1. Pure proportional scaling based on their original assigned spots
    let targetX = obs.baseXRatio * w
    let targetY = obs.baseYRatio * h

    // 2. Prevent overlapping the central text block on smaller screens
    const serverLeft = targetX
    const serverRight = targetX + obs.width
    const serverTop = targetY - obs.height
    const serverBottom = targetY

    const overlapsText = !(
      serverRight < textLeft ||
      serverLeft > textRight ||
      serverBottom < textTop ||
      serverTop > textBottom
    )

    if (overlapsText) {
      // Slide them to the closest safe edge smoothly, without jumping
      const toLeft = serverRight - textLeft
      const toRight = textRight - serverLeft
      const toTop = serverBottom - textTop
      const toBottom = textBottom - serverTop

      const minPush = Math.min(toLeft, toRight, toTop, toBottom)

      if (minPush === toTop) {
        targetY = textTop - 5
      } else if (minPush === toBottom) {
        targetY = textBottom + obs.height + 5
      } else if (minPush === toLeft) {
        targetX = textLeft - obs.width - 5
      } else {
        targetX = textRight + 5
      }
    }

    obs.x = targetX
    obs.y = targetY
  })
}

const resizeCanvas = () => {
  const canvas = heroCanvas.value
  if (canvas) {
    const parent = canvas.parentElement
    canvas.width = parent.clientWidth
    canvas.height = parent.clientHeight

    if (!serversPlaced) {
      placeServers(canvas.width, canvas.height)
      serversPlaced = true
    } else {
      adaptServers(canvas.width, canvas.height)
    }
  }
}

// Draw a pixelated Server Cabinet
const drawServer = (ctx, server) => {
  const { x, y, width, height, isUnderAttack, attackTimer } = server
  let drawX = x
  let drawY = y

  const inConflict = isUnderAttack || attackTimer > 0

  if (inConflict) {
    drawX += (Math.random() - 0.5) * 4
    drawY += (Math.random() - 0.5) * 2
  }

  // Shadow
  ctx.fillStyle = 'rgba(0,0,0,0.2)'
  ctx.beginPath()
  ctx.ellipse(drawX + width / 2, drawY, width * 0.6, width * 0.2, 0, 0, Math.PI * 2)
  ctx.fill()

  // Main chassis
  ctx.fillStyle = inConflict ? '#4a1111' : '#2c2e33'
  ctx.fillRect(drawX, drawY - height, width, height)

  // Front panel
  ctx.fillStyle = inConflict ? '#5a1f1f' : '#3f424a'
  ctx.fillRect(drawX + 4, drawY - height + 4, width - 8, height - 8)

  // Server racks (horizontal lines)
  ctx.fillStyle = '#1f2024'
  for (let i = 0; i < 5; i++) {
    ctx.fillRect(drawX + 8, drawY - height + 12 + i * 14, width - 16, 6)
  }

  // Blinking lights (based on time)
  const time = Date.now() / 1000
  for (let i = 0; i < 5; i++) {
    const isBlinking = inConflict ? Math.random() > 0.3 : Math.sin(time * (i + 1) * 5 + x) > 0
    ctx.fillStyle = isBlinking ? (inConflict ? '#ff3333' : '#00ffcc') : '#005544' // Cyber green / red
    ctx.fillRect(drawX + 12, drawY - height + 14 + i * 14, 3, 3)

    const isRed = inConflict ? Math.random() > 0.5 : Math.sin(time * (i + 2) * 2 + y) > 0.8
    ctx.fillStyle = isRed ? '#ff4444' : '#551111'
    ctx.fillRect(drawX + 20, drawY - height + 14 + i * 14, 3, 3)
  }

  if (inConflict) {
    ctx.fillStyle = '#ff3333'
    ctx.font = 'bold 14px monospace'
    ctx.textAlign = 'center'
    ctx.fillText('BREACH!', drawX + width / 2, drawY - height - 10)

    ctx.beginPath()
    ctx.strokeStyle = '#ff3333'
    ctx.lineWidth = 2
    ctx.arc(drawX + width / 2, drawY - height / 2, 20 + Math.random() * 5, 0, Math.PI * 2)
    ctx.stroke()
  }
}

// Draw square tailgater / hacker character
const drawTailgater = (ctx, p) => {
  const isMoving = p.isMoving
  p.frameCount += 0.15
  const bounce = isMoving ? Math.abs(Math.sin(p.frameCount)) * 4 : 0

  // Shadow
  ctx.fillStyle = 'rgba(0,0,0,0.15)'
  ctx.beginPath()
  ctx.ellipse(p.x, p.y + p.height / 2, p.width * 0.4, p.width * 0.15, 0, 0, Math.PI * 2)
  ctx.fill()

  const drawY = p.y - bounce

  // Body (Square block)
  ctx.fillStyle = '#3b1d52' // Dark purple
  ctx.fillRect(p.x - p.width / 2, drawY - p.height / 2, p.width, p.height)

  // Face area (hidden inside hood/mask)
  ctx.fillStyle = '#0a0a0f'
  ctx.fillRect(p.x - p.width * 0.35, drawY - p.height * 0.2, p.width * 0.7, p.height * 0.5)

  // Eyes (Red, glowing)
  const eyeDx = p.targetX - p.x
  const eyeDy = p.targetY - p.y
  let lookX = isMoving ? (eyeDx > 0 ? 2 : -2) : 0
  let lookY = isMoving ? (eyeDy > 0 ? 2 : -2) : 0

  ctx.fillStyle = '#ff3333'
  ctx.shadowColor = '#ff3333'
  ctx.shadowBlur = 6
  ctx.fillRect(p.x - 6 + lookX, drawY - 4 + lookY, 3, 2) // Left eye
  ctx.fillRect(p.x + 3 + lookX, drawY - 4 + lookY, 3, 2) // Right eye
  ctx.shadowBlur = 0 // reset
}

const draw = () => {
  const canvas = heroCanvas.value
  if (!canvas) return
  const ctx = canvas.getContext('2d')

  // Move player
  const dx = player.targetX - player.x
  const dy = player.targetY - player.y
  const distance = Math.sqrt(dx * dx + dy * dy)

  if (distance > 5) {
    player.x += (dx / distance) * player.speed
    player.y += (dy / distance) * player.speed
    player.isMoving = true
  } else {
    player.isMoving = false
  }

  // Clear and update collision states
  servers.forEach((s) => {
    s.isUnderAttack = false
    if (s.attackTimer > 0) s.attackTimer--
  })

  const pLeft = player.x - player.width / 2
  const pRight = player.x + player.width / 2
  const pTop = player.y - player.height / 2
  const pBottom = player.y + player.height / 2

  servers.forEach((s) => {
    const sLeft = s.x
    const sRight = s.x + s.width
    const sTop = s.y - s.height
    const sBottom = s.y

    if (pLeft < sRight && pRight > sLeft && pTop < sBottom && pBottom > sTop) {
      s.isUnderAttack = true
      s.attackTimer = 60 // Keeps shaking for a bit
    }
  })

  // Clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  // Draw environment (grid or dots)
  ctx.fillStyle = 'rgba(125, 92, 255, 0.05)'
  for (let i = 0; i < canvas.width; i += 40) {
    for (let j = 0; j < canvas.height; j += 40) {
      ctx.fillRect(i, j, 2, 2)
    }
  }

  // Sort elements by Y for fake depth
  const renderables = [
    { type: 'player', y: player.y + player.height / 2, data: player },
    ...servers.map((o) => ({ type: 'server', y: o.y, data: o })),
  ]

  renderables.sort((a, b) => a.y - b.y)

  for (const item of renderables) {
    if (item.type === 'server') {
      drawServer(ctx, item.data)
    } else if (item.type === 'player') {
      drawTailgater(ctx, item.data)
    }
  }

  // Interaction cursor
  if (mouseX > 0 && mouseY > 0) {
    ctx.strokeStyle = '#4d8f53' // Safe cursor color (moss)
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.arc(mouseX, mouseY, 10 + Math.sin(player.frameCount) * 2, 0, Math.PI * 2)
    ctx.stroke()
  }

  animationFrameId = requestAnimationFrame(draw)
}

onMounted(() => {
  window.addEventListener('resize', resizeCanvas)

  const w = window.innerWidth
  const h = window.innerHeight

  player.x = w / 2
  player.y = h / 2
  player.targetX = w / 2
  player.targetY = h / 2

  resizeCanvas()
  draw()
})

onUnmounted(() => {
  window.removeEventListener('resize', resizeCanvas)
  if (animationFrameId) cancelAnimationFrame(animationFrameId)
})
</script>

<template>
  <main class="landing-page min-h-screen bg-pixel-lilac text-pixel-plum">
    <!-- Fixed Header Navigation -->
    <header class="sticky top-0 z-50 border-b border-pixel-plum/5 bg-white/70 backdrop-blur-md">
      <div class="mx-auto max-w-7xl px-5 sm:px-6 lg:px-10">
        <nav class="flex items-center justify-between gap-4 py-4" aria-label="Public navigation">
          <router-link to="/" class="brand-mark" aria-label="CyberMorph home">
            <span class="brand-glyph">CM</span>
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

    <!-- Hero: original CyberMorph positioning with chunky CTAs and layered product visuals. -->
    <section
      class="relative isolate overflow-hidden px-5 py-10 sm:px-6 lg:px-10"
      @mousemove="handleMouseMove"
      @mouseleave="handleMouseLeave"
    >
      <div class="landing-grid" aria-hidden="true"></div>

      <!-- Interactive Canvas -->
      <canvas
        ref="heroCanvas"
        class="absolute inset-0 -z-10 h-full w-full"
        style="image-rendering: pixelated; pointer-events: none"
      ></canvas>

      <div class="mx-auto max-w-7xl">
        <div
          class="flex min-h-[calc(100vh-5.5rem)] items-center justify-center py-14 lg:py-20 pointer-events-none"
        >
          <div class="mx-auto max-w-4xl text-center pointer-events-auto">
            <p class="eyebrow">Cybersecurity simulation platform</p>
            <h1
              class="mx-auto mt-5 max-w-4xl text-5xl font-black leading-[0.98] text-pixel-plum sm:text-6xl lg:text-7xl"
            >
              Train defenders inside living cyber worlds.
            </h1>
            <p class="mx-auto mt-6 max-w-2xl text-lg leading-8 text-pixel-plum/75">
              CyberMorph turns digital safety lessons into playable missions, clear progress, and
              instructor-ready insights for modern learning teams.
            </p>

            <div class="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
              <router-link to="/register" class="btn-hero btn-hero-primary">
                Start Training
              </router-link>
              <a href="#showcase" class="btn-hero btn-hero-secondary"> View Showcase </a>
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
    <section id="features" class="section-band scroll-mt-20 px-5 py-20 sm:px-6 lg:px-10">
      <div class="mx-auto max-w-7xl">
        <div class="section-heading">
          <p class="eyebrow">Core modules</p>
          <h2>Built for learners, educators, and cyber teams.</h2>
          <p>
            The homepage now leads with product value, then breaks the platform into reusable
            capability panels.
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

    <!-- Cyber Attacks Section (Hero Banner Style) -->
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
                  class="bg-[#ffcc00] text-black text-11 font-black px-2 py-1 rounded-sm uppercase tracking-widest leading-none shadow-[2px_2px_0px_rgba(0,0,0,0.5)] transform -translate-y-2"
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
          <!-- The Image itself -->
          <img
            :src="activeAttack.image"
            :alt="activeAttack.title"
            class="relative z-10 w-full h-auto object-contain drop-shadow-[0_0_25px_rgba(0,0,0,0.6)] transition-all duration-300"
            style="image-rendering: pixelated"
          />

          <!-- Action Bar (Below Image) -->
          <div class="mt-4 flex justify-end w-full pr-2">
            <button
              class="bg-black border border-white/60 rounded-full px-5 py-1.5 text-xs font-bold text-white hover:bg-white hover:text-black transition-colors duration-200 flex items-center gap-1 shadow-[0_4px_10px_rgba(0,0,0,0.4)] z-20 relative"
            >
              More <span class="text-10">▶</span>
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

            <!-- Avatar Cards (after the dotted lines) -->
            <div class="flex flex-col gap-3">
              <button
                @click="activeAttackId = '01'"
                class="w-[4.5rem] h-[4.5rem] rounded-[14px] overflow-hidden border-[3px] transition-all duration-300 relative"
                :class="
                  activeAttackId === '01'
                    ? 'border-[#38e8d5] shadow-[0_0_15px_#38e8d5] scale-110 z-10'
                    : 'border-[#4a3076]/50 hover:border-white/60 hover:scale-105'
                "
              >
                <div
                  class="absolute inset-0 bg-black/40 z-10 transition-opacity"
                  :class="activeAttackId === '01' ? 'opacity-0' : 'opacity-100'"
                ></div>
                <img :src="attacks[0].image" class="w-full h-full object-cover bg-black" />
              </button>

              <button
                @click="activeAttackId = '02'"
                class="w-[4.5rem] h-[4.5rem] rounded-[14px] overflow-hidden border-[3px] transition-all duration-300 relative"
                :class="
                  activeAttackId === '02'
                    ? 'border-[#ff4444] shadow-[0_0_15px_#ff4444] scale-110 z-10'
                    : 'border-[#4a3076]/50 hover:border-white/60 hover:scale-105'
                "
              >
                <div
                  class="absolute inset-0 bg-black/40 z-10 transition-opacity"
                  :class="activeAttackId === '02' ? 'opacity-0' : 'opacity-100'"
                ></div>
                <img :src="attacks[1].image" class="w-full h-full object-cover bg-black" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Bottom Action Bar -->
      <div
        class="w-full h-auto sm:h-[88px] bg-[#503399] border-t-[3px] border-[#ff7b59] flex relative"
      >
        <!-- Left slanted part -->
        <div
          class="absolute left-0 top-0 bottom-0 w-[55%] md:w-[45%] bg-[#7050c9] z-0"
          style="clip-path: polygon(0 0, 100% 0, 95% 100%, 0 100%)"
        ></div>

        <div
          class="relative z-10 mx-auto w-full max-w-[1400px] px-5 sm:px-6 lg:px-10 flex flex-col sm:flex-row items-center justify-between h-full py-4 sm:py-0"
        >
          <!-- Left side content -->
          <div class="flex flex-col justify-center h-full w-full sm:w-auto">
            <p class="text-10 font-black text-[#321c59] uppercase tracking-widest mb-0.5">
              First Encounter
            </p>
            <div class="flex items-center gap-4">
              <h4
                class="text-xl md:text-2xl lg:text-[28px] font-black text-white italic tracking-wide uppercase"
                style="font-family: var(--font-display)"
              >
                AVAILABLE IN MAP 1
              </h4>
              <div class="flex gap-1.5 hidden sm:flex">
                <span
                  class="bg-white/20 text-white/90 text-10 px-2 py-0.5 font-bold rounded-sm border border-white/10"
                  >PC</span
                >
                <span
                  class="bg-white/20 text-white/90 text-10 px-2 py-0.5 font-bold rounded-sm border border-white/10"
                  >MAC</span
                >
                <span
                  class="bg-white/20 text-white/90 text-10 px-2 py-0.5 font-bold rounded-sm border border-white/10"
                  >LIN</span
                >
              </div>
            </div>
          </div>

          <!-- Right side content (Engage Button) -->
          <div class="relative h-full flex items-center mt-4 sm:mt-0 lg:pr-4 group cursor-pointer">
            <span
              class="absolute -top-3 right-[10%] text-10 text-[#ff4444] font-black not-italic opacity-0 group-hover:opacity-100 transition-opacity z-20"
              >CLICK!</span
            >
            <button
              class="bg-white text-black font-black italic text-xl px-10 py-3 transform -skew-x-12 group-hover:bg-[#f0f0f0] transition-colors shadow-[4px_4px_0px_rgba(0,0,0,0.8)] flex items-center justify-center relative pointer-events-none"
            >
              <span class="transform skew-x-12 inline-block uppercase">Engage</span>
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Gallery/showcase: original abstract product visuals instead of copied artwork. -->
    <section id="showcase" class="section-band scroll-mt-20 px-5 py-20 sm:px-6 lg:px-10">
      <div class="mx-auto max-w-7xl">
        <div class="section-heading">
          <p class="eyebrow">Simulation gallery</p>
          <h2>Readable previews for every mission type.</h2>
          <p>
            Each card uses a simple tile map motif to suggest gameplay without relying on
            third-party art.
          </p>
        </div>

        <div class="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          <article v-for="item in showcases" :key="item.title" class="showcase-panel">
            <div class="showcase-art" aria-hidden="true">
              <img v-if="item.image" :src="item.image" :alt="item.title" class="showcase-img" />
              <div v-else class="showcase-placeholder">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
                  <circle cx="9" cy="9" r="2" />
                  <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
                </svg>
                <span class="mt-2 text-10 font-bold uppercase tracking-wider">Map Preview</span>
              </div>
            </div>
            <p>{{ item.eyebrow }}</p>
            <h3>{{ item.title }}</h3>
            <span>{{ item.description }}</span>
          </article>
        </div>
      </div>
    </section>

    <!-- Updates: optional news area with concise product-facing cards. -->
    <section id="updates" class="scroll-mt-20 px-5 py-20 sm:px-6 lg:px-10">
      <div class="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.75fr_1.25fr]">
        <div class="section-heading section-heading-left">
          <p class="eyebrow">Latest updates</p>
          <h2>Small releases, visible momentum.</h2>
          <p>
            Keep visitors oriented with short, scan-friendly announcements that support the product
            story.
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
          <a href="https://github.com/" target="_blank" rel="noreferrer">GitHub</a>
        </div>
      </div>
    </footer>
  </main>
</template>

<style scoped>
@reference "../assets/main.css";

.landing-page {
  letter-spacing: 0;
  background: var(--color-pixel-lilac);
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
  opacity: 0.45;
  background-image:
    linear-gradient(rgba(125, 92, 255, 0.15) 1.5px, transparent 1.5px),
    linear-gradient(90deg, rgba(125, 92, 255, 0.15) 1.5px, transparent 1.5px);
  background-size: 40px 40px;
  mask-image: linear-gradient(to bottom, black, transparent 90%);
}

.brand-mark {
  @apply inline-flex items-center gap-3 text-base font-black text-pixel-plum transition-colors hover:text-pixel-violet;
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

.eyebrow {
  @apply text-sm font-black uppercase text-pixel-violet;
  font-family: var(--font-display);
}

.btn-hero {
  @apply inline-flex min-h-12 items-center justify-center rounded-md px-6 text-sm font-black transition-all duration-200 active:scale-95;
}

.btn-hero-primary {
  @apply border border-pixel-violet bg-pixel-violet text-white shadow-pixel-hero hover:brightness-110;
}

.btn-hero-secondary {
  @apply border border-pixel-plum/15 bg-white/55 text-pixel-plum shadow-pixel-soft hover:border-pixel-violet/45 hover:bg-pixel-lavender/35 hover:text-pixel-violet;
}

.metric-tile {
  @apply rounded-md border border-pixel-violet/15 bg-white/55 p-4 shadow-pixel-soft;
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
  @apply rounded-lg border border-pixel-violet/15 bg-white/58 p-5 shadow-pixel-card transition-all duration-200 hover:-translate-y-1 hover:border-pixel-violet/35 hover:bg-white/75;
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

.showcase-cell {
  @apply rounded border border-white/60 bg-white/50;
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
  @apply grid gap-4 rounded-lg border border-pixel-violet/15 bg-white/58 p-5 shadow-pixel-card md:grid-cols-[9rem_1fr];
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

/* Game Asset & Pixel Art Styles */
.hero-decor {
  @apply pointer-events-none absolute inset-0 -z-10 overflow-hidden;
}

.decor-character {
  @apply absolute hidden lg:block;
  animation: float 6s ease-in-out infinite;
}

.decor-1 {
  @apply top-[20%] left-[10%];
}

.decor-2 {
  @apply bottom-[15%] right-[8%];
  animation-delay: -3s;
}

.pixel-asset-placeholder {
  @apply h-16 w-16 rounded-sm border-2 border-dashed border-pixel-violet/30 bg-pixel-lavender/10;
}

.pixel-asset {
  image-rendering: pixelated;
  @apply h-auto w-auto max-w-[64px];
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-15px);
  }
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
