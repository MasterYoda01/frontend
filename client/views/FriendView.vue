<script setup lang="ts">
import FriendListComponent from "../components/Friend/FriendListComponent.vue";
// import FriendRequestComponent from "../components/Friend/FriendRequest/FriendRequestComponent.vue";
import FriendRequestListComponent from "../components/FriendRequest/FriendRequestListComponent.vue";
</script>

<template>
  <main class="memory-page">
    <h1>Memory Page</h1>
    <div class="content">
      <FriendRequestListComponent class="friend-list" />
      <FriendListComponent class="friend-list" />
    </div>
  </main>
</template>

<style scoped>
h1 {
  text-align: center;
}

.memory-page {
  background-color: black;
  color: white;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.content {
  display: flex;
  gap: 2em; /* Adjust the gap between components */
  justify-content: space-around;
  width: 100%; /* Make sure the components fill the available width */
}

.friend-list {
  flex: 1; /* Allow components to grow and fill available space */
  max-width: 50%; /* Set a maximum width if needed */
}
</style>
