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
      component: () => import('../views/LoginView.vue'),
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/RegisterView.vue'),
    },
    {
      path: '/portal',
      component: () => import('../layouts/AppLayout.vue'),
      meta: { requiresAuth: true },
      children: [
        {
          path: 'dashboard',
          name: 'dashboard',
          component: () => import('../views/DashboardView.vue'),
        },
        { 
          path: 'mission-hub', 
          name: 'mission-hub', 
          component: () => import('../views/MissionHubView.vue') 
        },
        { 
          path: 'history', 
          name: 'history', 
          component: () => import('../views/SessionHistoryView.vue') 
        },
        { 
          path: 'leaderboard', 
          name: 'leaderboard', 
          component: () => import('../views/LeaderboardView.vue') 
        },
        { 
          path: 'educator', 
          name: 'educator', 
          component: () => import('../views/EducatorPortalView.vue') 
        },
        { 
          path: 'admin', 
          name: 'admin', 
          component: () => import('../views/AdminPortalView.vue') 
        },
        { 
          path: 'classroom/join', 
          name: 'classroom-join', 
          component: () => import('../views/ClassroomJoinView.vue') 
        },
        { 
          path: 'threats', 
          name: 'threats', 
          component: () => import('../views/ThreatIndexView.vue') 
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
  // 2. If user IS logged in and tries to go to login/register or landing -> /portal/dashboard
  else if (auth.isLoggedIn && (to.path === '/login' || to.path === '/register' || to.path === '/')) {
    return '/portal/dashboard'
  }
  
  // 3. Otherwise, proceed
  return true
})

export default router
