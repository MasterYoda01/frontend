<script setup lang="ts">
import MemoryListComponent from "../components/Memory/MemoryListComponent.vue";
</script>

<template>
  <main class="memory">
    <h1>Memory Page</h1>
    <MemoryListComponent />
  </main>
</template>

<style scoped>
.memory {
  background-color: black; /* Set the background color to black */
  color: white; /* Set the text color to white for better visibility */
  min-height: 100vh; /* Ensure the main element fills the viewport height */
  text-align: center; /* Center the content horizontally */
}

h1 {
  font-size: 2em;
  margin-bottom: 1em;
}

/* Add any additional styling for your Memory component */
</style>
