<script setup lang="ts">
import PostListComponent from "@/components/Post/PostListComponent.vue";
import { useUserStore } from "@/stores/user";
import { storeToRefs } from "pinia";

const { currentUsername, isLoggedIn } = storeToRefs(useUserStore());
</script>

<template>
  <main class="feed">
    <h1 class="header">Welcome To Your Feed, {{ currentUsername }}!</h1>
    <section>
      <h1 v-if="isLoggedIn"></h1>
      <h1 v-else>Please login!</h1>
    </section>
    <PostListComponent />
  </main>
</template>

<style scoped>
.feed {
  background-color: black;
  color: white;
  min-height: 100vh;
  text-align: center;
}

.header {
  font-family: "Roboto";
  font-size: 3em;
  margin-bottom: 1em; /* Add margin to create space below the h1 element */
}

h1 {
  font-family: "Arial", sans-serif;
  font-size: 2em;
}
</style>
