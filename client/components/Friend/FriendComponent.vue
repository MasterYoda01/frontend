<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useFriendStore } from "../../stores/friend";
import { useUserStore } from "../../stores/user";
import { fetchy } from "../../utils/fetchy";

const props = defineProps(["friend"]);

const { getFriends } = useFriendStore();
const { currentUsername } = storeToRefs(useUserStore());

const deleteFriend = async () => {
  try {
    await fetchy(`/api/friends/${props.friend}`, "DELETE");
  } catch {
    return;
  }
  await getFriends();
};
</script>

<template>
  <p class="author">{{ props.friend }}</p>
  <div class="base">
    <button class="button-error btn-small pure-button" @click="deleteFriend">Unfriend</button>
  </div>
</template>

<style scoped>
.friend-component {
  background-color: #f8f8f8;
  border-radius: 10px;
  padding: 1em;
  max-width: 400px;
  margin: auto;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 1em;
  color: black; /* Set text color to black */
  font-size: 1em; /* Set font size to 1em */
}
.author {
  font-weight: bold;
  font-size: 1.2em;
  color: black; /* Set text color to black */
}

.info {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5em;
}

.label {
  font-weight: bold;
}

.options {
  display: flex;
  gap: 1em;
}

.btn {
  padding: 0.7em 1.5em;
  font-size: 1em;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  text-transform: uppercase;
  transition:
    background-color 0.3s,
    color 0.3s;
}

.accept {
  background-color: #28a745;
  color: #fff;
}

.reject {
  background-color: #dc3545;
  color: #fff;
}

.btn:hover {
  opacity: 0.8;
}
</style>
