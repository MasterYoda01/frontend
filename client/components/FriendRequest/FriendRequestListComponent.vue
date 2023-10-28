<script setup lang="ts">
import { useUserStore } from "@/stores/user";
import { storeToRefs } from "pinia";
import { onBeforeMount, ref } from "vue";
import { useFriendStore } from "../../stores/friend";
import FriendRequestComponent from "../FriendRequest/FriendRequestComponent.vue";
import FriendRequestForm from "../FriendRequest/FriendRequestForm.vue";

const { currentUsername } = storeToRefs(useUserStore());
const { isLoggedIn } = storeToRefs(useUserStore());
const { requests } = storeToRefs(useFriendStore());
const { getRequests } = useFriendStore();

const loaded = ref(false);

// let editing = ref("");
// let searchAuthor = ref("");

// function updateEditing(id: string) {
//   editing.value = id;
// }

onBeforeMount(async () => {
  await getRequests();
  loaded.value = true;
});
</script>

<template>
  <section v-if="isLoggedIn">
    <FriendRequestForm @refreshFriendRequests="getRequests" />
  </section>

  <section v-if="loaded && requests.length !== 0">
    <label class="pending-requests-label">Pending Friend Requests</label>
    <div v-for="friendRequest in requests" :key="friendRequest.to">
      <article v-if="friendRequest.to === currentUsername && friendRequest.status === 'pending'">
        <FriendRequestComponent :friendRequest="friendRequest" @refreshPosts="getRequests" />
      </article>
    </div>
  </section>

  <p v-else-if="loaded">No Friend Requests Found</p>
  <p v-else>Loading...</p>
</template>

<style scoped>
.pending-requests-label {
  font-size: 1.5em; /* Adjust the font size as needed */
}
.friend-request {
  background-color: #f8f8f8;
  border-radius: 10px;
  padding: 1em;
  max-width: 400px;
  margin: auto;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 1em;
}

.info {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5em;
}

.label {
  font-weight: bold;
  color: black;
}

.value {
  color: black;
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
