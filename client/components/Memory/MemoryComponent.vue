<script setup lang="ts">
import { formatDate } from "@/utils/formatDate";

const props = defineProps(["memory"]);
</script>

<template>
  <div class="memory">
    <div class="date">
      <label>Date to Open:</label>
      <span>{{ formatDate(props.memory.dateToOpen) }}</span>
    </div>

    <div v-if="props.memory.url" class="image-container">
      <img :src="props.memory.url" alt="Input ImageURL" />
    </div>

    <p class="content">{{ props.memory.content }}</p>

    <div class="timestamp">
      <p v-if="props.memory.dateCreated !== props.memory.dateUpdated">Edited on: {{ formatDate(props.memory.dateUpdated) }}</p>
      <p v-else>Created on: {{ formatDate(props.memory.dateCreated) }}</p>
    </div>
  </div>
</template>

<style scoped>
.memory {
  background-color: #f8f8f8;
  border-radius: 10px;
  padding: 1em;
  max-width: 500px;
  margin: auto;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
}

.author {
  font-weight: bold;
  font-size: 1.2em;
  margin-bottom: 0.5em;
  color: #333333; /* Set text color to dark gray */
}

.date {
  display: flex;
  align-items: center;
  margin-bottom: 1em;
}

.date label {
  font-weight: bold;
  margin-right: 0.5em;
  color: #333333; /* Set text color to dark gray */
}

.date span {
  font-size: 1.1em;
  color: #333333; /* Set text color to dark gray */
}

.image-container img {
  max-width: 100%;
  height: auto;
  margin-bottom: 1em;
}

.content {
  font-size: 1.1em;
  margin-bottom: 1em;
  color: #333333; /* Set text color to dark gray */
}

.timestamp {
  display: flex;
  justify-content: flex-end;
  font-size: 0.9em;
  font-style: italic;
  color: #555555; /* Set text color to light gray */
}
</style>
