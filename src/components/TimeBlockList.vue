<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'
import type { AxiosResponse } from 'axios'
import type { Ref } from 'vue'
import type { TimeBlock } from '../types/TimeBlock'
import { formatDay, formatTimeRange, groupByDay } from '../utils/timeBlockFormat'

const timeBlocks: Ref<TimeBlock[]> = ref([])
const loading = ref(true)
const error = ref(false)

const dayGroups = computed(() => groupByDay(timeBlocks.value))

async function loadTimeBlocks() {
  const baseUrl = import.meta.env.VITE_BACKEND_BASE_URL // 'http://localhost:8080' in dev mode
  const endpoint = baseUrl + '/timeblocks'
  const response: AxiosResponse = await axios.get(endpoint)
  const responseData: TimeBlock[] = response.data
  timeBlocks.value = responseData
}

// Lifecycle hooks
onMounted(async () => {
  try {
    await loadTimeBlocks()
  } catch (e) {
    console.log('Error:', e)
    error.value = true
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <section>
    <h2>Belegte Zeiten</h2>

    <p v-if="loading" class="status">Lade Zeitblöcke…</p>

    <div v-else-if="error" class="status status-error">
      <p><strong>Backend nicht erreichbar.</strong></p>
      <p>
        Das Backend auf Render schläft nach Inaktivität ein und braucht ca. 1 Minute zum Aufwachen.
        Bitte lade die Seite gleich noch einmal.
      </p>
    </div>

    <p v-else-if="dayGroups.length === 0" class="status">Noch keine Zeitblöcke eingetragen.</p>

    <div v-else class="days">
      <div v-for="group in dayGroups" :key="group.day" class="day">
        <h3>{{ formatDay(group.day) }}</h3>
        <ul>
          <li v-for="block in group.blocks" :key="block.id" class="card">
            <span class="name">{{ block.personName }}</span>
            <span class="time">{{ formatTimeRange(block.startTime, block.endTime) }}</span>
            <span class="badge">belegt</span>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<style scoped>
h2 {
  font-size: 1.25rem;
  margin-bottom: 1rem;
}

.status {
  padding: 1rem;
  border: 1px solid var(--color-border);
  border-radius: 8px;
  background: var(--color-surface);
  color: var(--color-text-muted);
}

.status p + p {
  margin-top: 0.5rem;
}

.status-error {
  border-color: var(--color-busy-border);
}

.status-error strong {
  color: var(--color-busy);
  font-weight: 600;
}

.days {
  display: grid;
  gap: 1.5rem;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
}

h3 {
  font-size: 0.85rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--color-text-muted);
  margin-bottom: 0.5rem;
}

ul {
  list-style: none;
  padding: 0;
  display: grid;
  gap: 0.5rem;
}

.card {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  border: 1px solid var(--color-border);
  border-radius: 8px;
  background: var(--color-surface);
}

.name {
  font-weight: 600;
  color: var(--color-heading);
}

.time {
  font-variant-numeric: tabular-nums;
  color: var(--color-text-muted);
}

.badge {
  margin-left: auto;
  padding: 0.1rem 0.5rem;
  border-radius: 999px;
  font-size: 0.75rem;
  color: var(--color-busy);
  background: var(--color-busy-bg);
}
</style>
