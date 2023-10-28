<script setup lang="ts">
import { storeToRefs } from "pinia";
import { ref } from "vue";
import { useUserStore } from "../../stores/user";
import { fetchy } from "../../utils/fetchy";

const { currentUsername } = storeToRefs(useUserStore());
const dropdownString = ref("");
const to = ref("");
const from = ref("");

const sendFriendRequest = async (to: string) => {
  try {
    await fetchy(`/api/friend/requests/${to}`, "POST");
  } catch (_) {
    return;
  }

  emptyForm();
};

const removeFriendRequest = async (to: string) => {
  try {
    await fetchy(`/api/friend/requests/${to}`, "DELETE");
  } catch (_) {
    return;
  }

  emptyForm();
};
const emptyForm = () => {
  to.value = "";
  from.value = "";
};
</script>

<template>
  <div class="friend-options">
    <label for="friendOptions">Request Options</label>
    <select name="dropdown" id="friendOptions" v-model="dropdownString" class="custom-select">
      <option value="sendRequest">Send Friend Request</option>
      <option value="deleteRequest">Delete Friend Request</option>
    </select>

    <section class="form-section">
      <section v-if="dropdownString === 'sendRequest'">
        <form @submit.prevent="sendFriendRequest(to)" class="friend-form">
          <div class="form-group">
            <label>Send Friend Request to:</label>
            <div class="base">
              <label for="send">Username:</label>
              <input id="send" v-model="to" required />
              <button type="submit" class="btn-primary">Send</button>
            </div>
          </div>
        </form>
      </section>

      <section v-if="dropdownString === 'deleteRequest'">
        <form @submit.prevent="removeFriendRequest(to)" class="friend-form">
          <div class="form-group">
            <label>Delete Friend Request to:</label>
            <div class="base">
              <label for="delete">Username:</label>
              <input id="delete" v-model="to" required />
              <button type="submit" class="btn-primary">Delete</button>
            </div>
          </div>
        </form>
      </section>
    </section>
  </div>
</template>

<style scoped>
.friend-options {
  background-color: var(--base-bg);
  border-radius: 1em;
  padding: 1em;
  max-width: 400px;
  margin: auto;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
}

.custom-select {
  padding: 0.5em;
  font-size: 1em;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 100%;
}

.form-section {
  margin-top: 1em;
}

.friend-form {
  display: flex;
  flex-direction: column;
  gap: 0.5em;
}

.form-group {
  margin-bottom: 1em;
}

.base {
  display: flex;
  gap: 1em;
  align-items: center;
}

label {
  font-weight: bold;
}

.btn-primary {
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 0.7em 1.5em;
  cursor: pointer;
  font-weight: bold;
  text-transform: uppercase;
  transition:
    background-color 0.3s,
    color 0.3s;
}

.btn-primary:hover {
  opacity: 0.8;
}

input {
  padding: 0.5em;
  font-size: 1em;
  border: 1px solid #ccc;
  border-radius: 4px;
}

input:focus {
  border-color: #007bff;
}

.friend-options label,
.friend-options option,
.friend-options .form-group label {
  color: black;
}
</style>
