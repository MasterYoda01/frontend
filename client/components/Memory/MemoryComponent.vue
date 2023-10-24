<script setup lang="ts">
import { formatDate } from "@/utils/formatDate";
import { fetchy } from "../../utils/fetchy";

const props = defineProps(["memory"]);
const emit = defineEmits(["editMemory", "refreshMemories"]);

const deleteMemory = async () => {
  try {
    await fetchy(`/api/memories/${props.memory._id}`, "DELETE");
  } catch {
    return;
  }
  emit("refreshMemories");
};
</script>

<template>
  <p class="author">{{ props.memory.author }}</p>
  <!-- <label v-if="props.memory.prompt" for="prompt">Image Prompt: {{ props.memory.prompt }}</label> -->
  <p><img :src="props.memory.inURL" alt="Input ImageURL" width="40" height="40" /></p>
  <p>{{ props.memory.content }}</p>
  <div class="base">
    <menu>
      <li><button class="btn-small pure-button" @click="emit('editMemory', props.memory._id)">Edit</button></li>
      <li><button class="button-error btn-small pure-button" @click="deleteMemory">Delete</button></li>
    </menu>
    <article class="timestamp">
      <p v-if="props.memory.dateCreated !== props.memory.dateUpdated">Edited on: {{ formatDate(props.memory.dateUpdated) }}</p>
      <p v-else>Created on: {{ formatDate(props.memory.dateCreated) }}</p>
    </article>
  </div>
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
