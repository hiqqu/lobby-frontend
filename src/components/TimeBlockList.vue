<script setup lang="ts">
  const timeBlocks = [
    {
      id: 1,
      personName: 'Alex',
      dayOfWeek: 'MONDAY',
      startTime: '10:00',
      endTime: '12:00'
    },
    // hier kannst du einen zweiten Block für z. B. 'Luca' anfügen
    {
      id: 2,
      personName: 'Luca',
      dayOfWeek: 'MONDAY',
      startTime: '11:00',
      endTime: '14:00',
    },
    {
     id: 3,
     personName: 'Sara',
     dayOfWeek: 'MONDAY',
     startTime: '16:00',
     endTime: '17:00',
    }
]


</script>

<template>
  <div>
    <h2>Eingetragene Zeitblöcke</h2>
    <ul>
      <li v-for="block in timeBlocks" :key="block.id">
        {{ block.personName }} hat am {{ block.dayOfWeek }} zwischen {{ block.startTime }} und {{ block.endTime }} keine Zeit.
      </li>
    </ul>
  </div>
</template>
