<script setup lang="ts">
import { ref } from "vue";
import { fetchy } from "../../utils/fetchy";
import { formatDate } from "../../utils/formatDate";

const props = defineProps(["memory"]);
const dateToOpen = ref(props.memory.dateToOpen);
const content = ref(props.memory.content);
const url = ref(props.memory.url);

const emit = defineEmits(["editMemory", "refreshMemories"]);

const editMemory = async (dateToOpen: string, content: string, url: string) => {
  try {
    await fetchy(`/api/memories/${props.memory._id}`, "PATCH", { body: { update: { dateToOpen: dateToOpen, content: content, url: url } } });
  } catch (e) {
    return;
  }
  emit("editMemory");
  emit("refreshMemories", props.memory._id);
};
</script>

<template>
  <form @submit.prevent="editMemory(dateToOpen, content, url)">
    <label for="dateToOpen">Change Memory Open Date</label>
    <input id="dateToOpen" v-model="dateToOpen" placeholder="YYYY-MM-DD Format" required />

    <label for="content">Edit Memory</label>
    <textarea id="content" v-model="content" placeholder="Edit memory!"> </textarea>

    <label for="url">url:</label>
    <input id="url" v-model="url" placeholder="Enter Image URL!" />
    <div class="base">
      <menu>
        <li><button class="btn-small pure-button-primary pure-button" type="submit">Save</button></li>
        <li><button class="btn-small pure-button" @click="emit('editMemory')">Cancel</button></li>
      </menu>
      <p v-if="props.memory.dateCreated !== props.memory.dateUpdated" class="timestamp">Edited on: {{ formatDate(props.memory.dateUpdated) }}</p>
      <p v-else class="timestamp">Created on: {{ formatDate(props.memory.dateCreated) }}</p>
    </div>
  </form>
</template>

<style scoped>
form {
  background-color: var(--base-bg);
  /* background-color: blue; */
  display: flex;
  flex-direction: column;
  gap: 0.5em;
}

textarea {
  font-family: inherit;
  font-size: inherit;
  height: 6em;
  border-radius: 4px;
  resize: none;
}

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

.base {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.timestamp {
  display: flex;
  justify-content: flex-end;
  font-size: 0.9em;
  font-style: italic;
}
</style>
