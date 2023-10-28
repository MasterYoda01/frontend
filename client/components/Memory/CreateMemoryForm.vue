<script setup lang="ts">
import { ref } from "vue";
import { fetchy } from "../../utils/fetchy";

const dateToOpen = ref("");
const content = ref("");
const url = ref("");
const emit = defineEmits(["refreshMemories"]);

// const props = defineProps(["postId"]);

const createMemory = async (dateToOpen: string, content: string, url: string) => {
  try {
    await fetchy("/api/memories", "POST", {
      body: { dateToOpen: dateToOpen, content: content, url: url },
    });
  } catch (_) {
    return;
  }
  emit("refreshMemories");
  emptyForm();
};
const emptyForm = () => {
  content.value = "";
  url.value = "";
};
</script>

<template>
  <form @submit.prevent="createMemory(dateToOpen, content, url)" class="memory-form">
    <h2 class="form-header">Add a Memory</h2>

    <div class="form-group">
      <label for="dateToOpen" class="label-text">Memory Open Date:</label>
      <input id="dateToOpen" type="date" v-model="dateToOpen" required />
    </div>

    <div class="form-group">
      <label for="content" class="label-text">Content:</label>
      <textarea id="content" v-model="content" placeholder="Make a Memory!" required></textarea>
    </div>

    <div class="form-group">
      <label for="inURL" class="label-text">Image URL (Optional):</label>
      <input id="inURL" type="url" v-model="url" />
    </div>

    <button type="submit" class="submit-button">Add Memory</button>
  </form>
</template>

<style scoped>
.memory-form {
  background-color: var(--base-bg);
  border-radius: 1em;
  padding: 1em;
  max-width: 700px;
  margin: auto;
}

.form-header {
  font-size: 1.5em;
  margin-bottom: 1em;
  text-align: center;
  color: #000; /* Set "Add a Memory" text color to black */
}

.form-group {
  margin-bottom: 1em;
}

.label-text {
  color: #000; /* Set label text color to black */
}

input[type="date"],
input[type="url"],
textarea {
  width: calc(100% - 2em); /* Adjusted input width */
  padding: 0.5em;
  font-size: 1em;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 0.5em;
  box-sizing: border-box; /* Ensures padding doesn't increase the width */
}

textarea {
  height: 6em;
  resize: vertical;
}

.submit-button {
  padding: 0.7em 1em;
  font-size: 1em;
  border: none;
  border-radius: 4px;
  background-color: #007bff;
  color: #fff;
  cursor: pointer;
  width: 100%;
}

.submit-button:hover {
  background-color: #0056b3;
}
</style>
