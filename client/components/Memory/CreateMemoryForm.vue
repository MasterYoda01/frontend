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
};
</script>

<template>
  <form @submit.prevent="createMemory(dateToOpen, content, url)">
    <!-- <label for="content">Add Memory:</label>  make this a header-->
    <div>
      <label for="dateToOpen">Memory Open Date:</label>
      <input id="dateToOpen" type="text" v-model="dateToOpen" placeholder="YYYY-MM-DD" required />
    </div>
    <label for="content">Content:</label>
    <textarea id="content" v-model="content" placeholder="Make a Memory!" required> </textarea>

    <textarea id="inURL" v-model="url" placeholder="Enter Image URL!" required> </textarea>
    <button type="submit" class="pure-button-primary pure-button">Add Memory</button>
  </form>
</template>

<style scoped>
form {
  background-color: var(--base-bg);
  border-radius: 1em;
  display: flex;
  flex-direction: column;
  gap: 0.5em;
  padding: 1em;
}

textarea {
  font-family: inherit;
  font-size: inherit;
  height: 6em;
  padding: 0.5em;
  border-radius: 4px;
  resize: none;
}
</style>
