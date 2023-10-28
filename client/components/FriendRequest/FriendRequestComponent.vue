<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useFriendStore } from "../../stores/friend";
import { useUserStore } from "../../stores/user";
import { fetchy } from "../../utils/fetchy";

const props = defineProps(["friendRequest"]);
const { getRequests } = useFriendStore();

const { currentUsername } = storeToRefs(useUserStore());

const acceptFriendRequest = async () => {
  try {
    await fetchy(`/api/friend/accept/${props.friendRequest.from}`, "PUT");
  } catch (_) {
    return;
  }
  await getRequests();
};

const rejectFriendRequest = async () => {
  try {
    await fetchy(`/api/friend/reject/${props.friendRequest.from}`, "PUT");
  } catch (_) {
    return;
  }
  await getRequests();
};
</script>

<template>
  <section v-if="props.friendRequest.status === 'pending' && props.friendRequest.to === currentUsername" class="friend-request">
    <div class="info">
      <p class="label">From:</p>
      <p class="value">{{ props.friendRequest.from }}</p>
    </div>
    <div class="info">
      <p class="label">To:</p>
      <p class="value">{{ props.friendRequest.to }}</p>
    </div>
    <div class="info">
      <p class="label">Status:</p>
      <p class="value">{{ props.friendRequest.status }}</p>
    </div>
    <menu class="options">
      <button class="btn accept" @click="acceptFriendRequest">Accept Request</button>
      <button class="btn reject" @click="rejectFriendRequest">Reject Request</button>
    </menu>
  </section>
</template>

<style scoped>
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
  color: black; /* Added */
}

.value {
  color: black; /* Added */
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
