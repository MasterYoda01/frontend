<script setup lang="ts">
import { ref } from "vue";

const dropdownString = ref("");

const emit = defineEmits(["ready", "random", "editMemory", "refreshMemories"]);
</script>

<template>
  <select id="memoryType" name="dropdown" v-model="dropdownString">
    <option value="Ready">Ready Memories</option>
    <option value="Random">Random Memory</option>
  </select>

  <div v-if="dropdownString === 'Ready'">
    <form @submit.prevent="emit('ready')">
      <button type="submit" class="pure-button-primary pure-button">Get Ready Memories</button>
    </form>
  </div>
  <form v-if="dropdownString === 'Random'" @submit.prevent="emit('random')">
    <div>
      <label>Get a random memory before a certain date</label>
      <input id="dateToOpen" type="text" placeholder="YYYY-MM-DD" required />
    </div>
    <button type="submit" class="pure-button-primary pure-button">Get Random Memory</button>
  </form>
</template>

<style scoped>
p {
  margin: 0em;
}

.author {
  font-weight: bold;
  font-size: 1.2em;
}

menu {
  list-style-type: none;
  display: flex;
  flex-direction: row;
  gap: 1em;
  padding: 0;
  margin: 0;
}

.timestamp {
  display: flex;
  justify-content: flex-end;
  font-size: 0.9em;
  font-style: italic;
}

.base {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.base article:only-child {
  margin-left: auto;
}
</style>
