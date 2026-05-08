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
      path: '/',
      component: () => import('../layouts/AppLayout.vue'),
      meta: { requiresAuth: true },
      children: [
        {
          path: 'dashboard',
          name: 'dashboard',
          component: () => import('../views/DashboardView.vue'),
        },
        { 
          path: 'game', 
          name: 'game', 
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
          component: () => import('../views/DashboardView.vue') 
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
router.beforeEach((to, from, next) => {
  const auth = useAuthStore()
  
  // 1. If route requires auth and user is NOT logged in -> /
  if (to.meta.requiresAuth && !auth.isLoggedIn) {
    next('/')
  } 
  // 2. If user IS logged in and tries to go to login/register or landing -> /dashboard
  else if (auth.isLoggedIn && (to.path === '/login' || to.path === '/register' || to.path === '/')) {
    next('/dashboard')
  }
  // 3. Otherwise, proceed
  else {
    next()
  }
})

export default router
