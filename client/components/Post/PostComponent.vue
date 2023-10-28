<script setup lang="ts">
import { useUserStore } from "@/stores/user";
import { formatDate } from "@/utils/formatDate";
import { storeToRefs } from "pinia";
import { fetchy } from "../../utils/fetchy";

const props = defineProps(["post"]);
const emit = defineEmits(["editPost", "refreshPosts"]);
const { currentUsername } = storeToRefs(useUserStore());

const deletePost = async () => {
  try {
    await fetchy(`/api/posts/${props.post._id}`, "DELETE");
  } catch {
    return;
  }
  emit("refreshPosts");
};
</script>

<template>
  <div class="post">
    <p class="author">Author: {{ props.post.author }}</p>
    <label v-if="props.post.prompt" for="prompt" class="prompt">AI Prompt: {{ props.post.prompt }}</label>
    <div class="imageContainer">
      <p><img :src="props.post.inURL" alt="Input ImageURL" class="image" width="300" height="200" /></p>
      <p v-if="props.post.outURL"><img :src="props.post.outURL" alt="Expired AI Image URL: Click Edit and Save to Renew" class="expired-url" width="300" height="200" /></p>
    </div>
    <p>{{ props.post.content }}</p>
    <div class="base">
      <menu v-if="props.post.author == currentUsername" class="button-menu">
        <li>
          <button class="edit-button" @click="emit('editPost', props.post._id)">Edit</button>
        </li>
        <li>
          <button class="delete-button" @click="deletePost">Delete</button>
        </li>
      </menu>
      <article class="timestamp">
        <p v-if="props.post.dateCreated !== props.post.dateUpdated" class="edited-timestamp">Edited on: {{ formatDate(props.post.dateUpdated) }}</p>
        <p v-else class="posted-timestamp">Posted on: {{ formatDate(props.post.dateCreated) }}</p>
      </article>
    </div>
  </div>
</template>

<style scoped>
.timestamp {
  display: flex;
  justify-content: flex-end;
}

.edited-timestamp,
.posted-timestamp {
  margin: 1; /* Remove default margin */
  font-size: 0.9em;
  font-style: italic;
  margin-right: 10px; /* Add some right margin for separation */
}
.button-menu {
  display: flex;
  align-items: center;
  gap: 1em;
}

.edit-button,
.delete-button {
  padding: 0.5em 1em;
  font-size: 1em;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.edit-button {
  background-color: #007bff;
  color: #fff;
}

.delete-button {
  background-color: #dc3545;
  color: #fff;
}

.edit-button:hover,
.delete-button:hover {
  filter: brightness(90%);
}
.post {
  transition: transform 0.3s; /* Add transition for smooth animation */
}

.imageContainer {
  width: 100%; /* Make sure the container spans the full width */
  text-align: center; /* Center the image within the container */
}

.image {
  max-width: 100%; /* Make sure the image doesn't exceed the container width */
  height: auto; /* Maintain the aspect ratio */
}
.post:hover {
  transform: scale(1.05); /* Scale up by 5% on hover */
}

p {
  font-family: Arial, sans-serif;
}

.prompt {
  font-family: "Roboto";
  color: black; /* Set a darker color for the prompt */
}
.expired-url {
  font-family: "Roboto";
  color: #000000; /* Set the color to black */
}
.author {
  font-weight: bold;
  font-size: 1.2em;
  color: #333333; /* Set a darker color for the author */
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
  color: black;
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
