<script setup lang="ts">
import { ref } from "vue";

const dropdownString = ref("");
const randomDate = ref("");
const emit = defineEmits(["ready", "random", "blank"]);

function pickMemoryType(type: string) {
  if (type === "Ready") {
    emit("ready");
  }
  if (type === "Random") {
    emit("blank");
  }
}
</script>

<template>
  <div class="dropdown">
    <select id="memoryType" name="dropdown" v-model="dropdownString" @change="pickMemoryType(dropdownString)" class="custom-select">
      <option value="Ready">Ready Memories</option>
      <option value="Random">Random Memory</option>
    </select>

    <form v-if="dropdownString === 'Random'" @submit.prevent="emit('random', randomDate)">
      <div class="form-group">
        <label for="dateToOpen">Get a random memory before a certain date</label>
        <input id="dateToOpen" type="text" v-model="randomDate" placeholder="YYYY-MM-DD" required class="form-control" />
      </div>
      <button type="submit" class="btn-primary custom-btn">Get Random Memory</button>
    </form>
  </div>
</template>

<style scoped>
.custom-select {
  padding: 0.5em;
  font-size: 1.25em;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 200px;
  margin-bottom: 1em;
  background-color: #fff; /* Optional: Set a background color */
  color: #333; /* Optional: Set text color */
}

.custom-select:hover {
  border-color: #007bff; /* Change border color on hover */
  background-color: #fff; /* Change background color on hover */
}
.form-group label {
  margin-right: 1em;
}
.form-group input {
  margin-bottom: 0.5em;
}
label {
  font-weight: bold;
}

.input-group {
  display: flex;
  gap: 0.5em;
}

.form-control {
  padding: 0.5em;
  font-size: 1em;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 150px;
}

.btn {
  padding: 1em 2em;
  font-size: 1em;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.btn-primary {
  background-color: #007bff;
  color: #fff;
}

.btn-primary:hover {
  background-color: #0056b3;
}
.custom-btn {
  padding: 1em 2em;
  font-size: 1.25em;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  background-color: #007bff;
  color: #fff;
  transition: background-color 0.3s;
}

.custom-btn:hover {
  background-color: #0056b3;
}
</style>
