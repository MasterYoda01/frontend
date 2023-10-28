<script setup lang="ts">
import { storeToRefs } from "pinia";
import { onBeforeMount, ref } from "vue";
import { useFriendStore } from "../../stores/friend";
import { useUserStore } from "../../stores/user";
import FriendComponent from "./FriendComponent.vue";

const { isLoggedIn } = storeToRefs(useUserStore());
const { getFriends } = useFriendStore();
const { currentFriends } = storeToRefs(useFriendStore());

const loaded = ref(false);

onBeforeMount(async () => {
  await getFriends();
  loaded.value = true;
});
</script>

<template>
  <div>
    <label>Current Friends</label>
    <section class="friends" v-if="loaded && currentFriends.length !== 0">
      <article v-for="friend in currentFriends" :key="friend">
        <FriendComponent :friend="friend" @refreshPosts="getFriends" />
      </article>
    </section>
    <p v-else-if="loaded">No Friends Yet</p>
    <p v-else>Loading...</p>
  </div>
</template>

<style scoped>
section {
  display: flex;
  flex-direction: column;
  gap: 1em;
}

label {
  font-size: 1.2em; /* Increase font size for label */
}
section {
  display: flex;
  flex-direction: column;
  gap: 1em;
}

section,
p,
.row {
  margin: 0 auto;
  max-width: 60em;
}

article {
  background-color: var(--base-bg);
  border-radius: 1em;
  display: flex;
  flex-direction: column;
  gap: 0.3em; /* Adjusted gap */
  padding: 0.8em; /* Adjusted padding */
}

.posts {
  padding: 1em;
}

.row {
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  max-width: 60em;
}
</style>
