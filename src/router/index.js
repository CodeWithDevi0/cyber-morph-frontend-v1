import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'landing',
      component: () => import('../views/LandingView.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/auth/LoginView.vue'),
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/auth/RegisterView.vue'),
    },
    {
      path: '/portal',
      component: () => import('../layouts/AppLayout.vue'),
      meta: { requiresAuth: true },
      children: [
        {
          path: 'dashboard',
          name: 'dashboard',
          component: () => import('../views/portal/player/DashboardView.vue'),
        },
        { 
          path: 'mission-hub', 
          name: 'mission-hub', 
          component: () => import('../views/portal/player/MissionHubView.vue') 
        },
        { 
          path: 'history', 
          name: 'history', 
          component: () => import('../views/portal/player/SessionHistoryView.vue') 
        },
        { 
          path: 'leaderboard', 
          name: 'leaderboard', 
          component: () => import('../views/portal/shared/LeaderboardView.vue') 
        },
        { 
          path: 'educator', 
          name: 'educator', 
          component: () => import('../views/portal/educator/EducatorPortalView.vue') 
        },
        { 
          path: 'admin', 
          name: 'admin', 
          component: () => import('../views/portal/admin/AdminPortalView.vue') 
        },
        { 
          path: 'classroom/join', 
          name: 'classroom-join', 
          component: () => import('../views/portal/player/ClassroomJoinView.vue') 
        },
        { 
          path: 'threats', 
          name: 'threats', 
          component: () => import('../views/portal/player/ThreatIndexView.vue') 
        },
      ]
    },
    // Catch-all redirect
    {
      path: '/:pathMatch(.*)*',
      redirect: '/'
    }
  ],
})

// Auth Guard
router.beforeEach((to) => {
  const auth = useAuthStore()
  
  // 1. If route requires auth and user is NOT logged in -> /
  if (to.meta.requiresAuth && !auth.isLoggedIn) {
    return '/'
  } 
  // 2. If user IS logged in and tries to go to login/register or landing -> Redirect to their role dashboard
  else if (auth.isLoggedIn && (to.path === '/login' || to.path === '/register' || to.path === '/')) {
    if (auth.isAdmin) return '/portal/admin'
    if (auth.isEducator) return '/portal/educator'
    return '/portal/dashboard' // Default for players
  }
  
  // 3. Otherwise, proceed
  return true
})

export default router
