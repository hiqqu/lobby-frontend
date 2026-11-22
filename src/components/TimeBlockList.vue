<script setup lang="ts">
import { ref, onMounted } from 'vue'
import axios from 'axios'
import type { AxiosResponse } from 'axios'
import type { Ref } from 'vue'
import type { TimeBlock } from '../types/TimeBlock'

const timeBlocks: Ref<TimeBlock[]> = ref([])

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
  }
})
</script>

<template>
  <div>
    <h2>Eingetragene Zeitblöcke</h2>
    <ul>
      <li v-for="block in timeBlocks" :key="block.id">
        {{ block.personName }} hat am {{ block.dayOfWeek }} zwischen {{ block.startTime }} und
        {{ block.endTime }} keine Zeit.
      </li>
    </ul>
  </div>
</template>
