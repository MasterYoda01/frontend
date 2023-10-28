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
  background-color: #f8f8f8;
  border-radius: 10px;
  padding: 1em;
  max-width: 400px;
  margin: auto;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
}

label {
  font-weight: bold;
  margin-bottom: 0.5em;
  font-size: 1em;
}

label[for="prompt"] {
  color: black;
}

label[for="inURL"] {
  color: black;
}
select,
textarea {
  width: 100%;
  padding: 0.5em;
  font-size: 1em;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 1em;
}

textarea {
  height: 8em;
  resize: vertical;
}

button {
  padding: 0.7em 1em;
  font-size: 1em;
  border: none;
  border-radius: 4px;
  background-color: #007bff;
  color: #fff;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}
</style>
