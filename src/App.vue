<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <header>
    <h1>Lobby</h1>
    <p class="subtitle">Find the time when everyone's free</p>
  </header>

  <RouterView />
</template>

<style scoped>
header {
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--color-border);
}

h1 {
  font-size: 2rem;
  font-weight: 700;
  color: var(--color-heading);
}

.subtitle {
  color: var(--color-text-muted);
}
</style>
