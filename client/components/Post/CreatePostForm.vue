<script setup lang="ts">
import { ref } from "vue";
import { fetchy } from "../../utils/fetchy";

const prompt = ref("");
const inURL = ref("");
const dropdownString = ref("");
const emit = defineEmits(["refreshPosts"]);

const createPost = async (prompt: string, inURL: string) => {
  try {
    await fetchy("/api/posts", "POST", {
      body: { prompt: prompt, inURL: inURL },
    });
  } catch (_) {
    return;
  }
  emit("refreshPosts");
  emptyForm();
};
const emptyForm = () => {
  prompt.value = "";
};
</script>

<template>
  <form @submit.prevent="createPost(prompt, inURL)">
    <label for="prompt">Choose AI or No AI:</label>
    <select name="dropdown" id="ai" v-model="dropdownString">
      <option value="NoAI">Regular Photo</option>
      <option value="AI">AI-Generated Photo</option>
    </select>

    <label v-if="dropdownString === 'AI'" for="prompt">Image Prompt:</label>
    <textarea v-if="dropdownString === 'AI'" id="prompt" v-model="prompt" placeholder="Enter Prompt!"> </textarea>

    <label v-if="dropdownString === 'AI'" for="inURL">Input ImageURL:</label>
    <textarea id="inURL" v-model="inURL" placeholder="Enter Image URL!" required> </textarea>
    <button type="submit" class="pure-button-primary pure-button">Create Post</button>
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
