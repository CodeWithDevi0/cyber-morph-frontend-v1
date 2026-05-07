<template>
  <div class="min-h-screen flex flex-col items-center justify-center bg-cyber-dark text-white p-4">
    <h1 class="text-6xl font-bold text-neon-blue mb-4 animate-pulse">CYBER-MORPH</h1>
    <p class="text-xl text-neon-green mb-8">Master the digital frontier. Defend the grid.</p>
    <div class="flex gap-4">
      <router-link to="/login" class="px-6 py-2 border border-neon-blue text-neon-blue hover:bg-neon-blue hover:text-cyber-dark transition-all">
        LOGIN
      </router-link>
      <router-link to="/register" class="px-6 py-2 bg-neon-green text-cyber-dark font-bold hover:brightness-110 transition-all">
        REGISTER
      </router-link>
    </div>
  </div>
</template>
