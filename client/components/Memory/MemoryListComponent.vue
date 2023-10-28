<script setup lang="ts">
import { fetchy } from "@/utils/fetchy";
import { storeToRefs } from "pinia";
import { onBeforeMount, ref } from "vue";
import { useUserStore } from "../../stores/user";
import CreateMemoryForm from "./CreateMemoryForm.vue";
import GetMemoryComponent from "./GetMemoryComponent.vue";
import MemoryComponent from "./MemoryComponent.vue";
const { isLoggedIn } = storeToRefs(useUserStore());

const loaded = ref(false);

let option = ref("");
let editing = ref("");
let readyMemories = ref<Array<Record<string, string>>>([]);
let randomMemory = ref<Record<string, string>>({});

let memoryDate = ref();

async function clearMemories() {
  if (option.value === "ready") {
    // await getRandomMemory();
    readyMemories.value = [];
  }
  if (option.value === "random") {
    // await getReadyMemories();
    randomMemory.value = {};
  }
}
async function getReadyMemories() {
  let memoryResults;
  try {
    memoryResults = await fetchy("/api/memories", "GET");
  } catch (_) {
    return;
  }
  option.value = "ready";
  readyMemories.value = memoryResults;
}

async function getRandomMemory(dateRequested?: string) {
  // console.log(dateRequested);
  let query: Record<string, string> = dateRequested !== undefined ? { dateRequested } : {};
  let memoryResults;
  if (dateRequested !== undefined) {
    memoryDate.value = dateRequested;
  } else {
    dateRequested = memoryDate.value;
  }
  try {
    memoryResults = await fetchy(`/api/memories/${dateRequested}`, "GET", { query });
  } catch (_) {
    return;
  }
  option.value = "random";
  randomMemory.value = memoryResults;
  console.log(randomMemory);
}

function updateEditing(id: string) {
  editing.value = id;
}

onBeforeMount(async () => {
  loaded.value = true;
});
</script>

<template>
  <div>
    <CreateMemoryForm v-if="isLoggedIn" @refreshMemories="getReadyMemories" />

    <label class="choose-option-label">Choose Option:</label>

    <GetMemoryComponent @blank="clearMemories" @ready="getReadyMemories" @random="getRandomMemory" />

    <section v-if="option === 'ready'" class="ready-memory-section">
      <article v-for="memory in readyMemories" :key="memory._id">
        <MemoryComponent v-if="editing !== memory._id" :memory="memory" @refreshMemories="getReadyMemories" @editMemory="updateEditing" />
      </article>
    </section>

    <section v-if="option === 'random'" class="random-memory-section">
      <MemoryComponent v-if="editing !== randomMemory._id" :memory="randomMemory" @refreshMemories="getRandomMemory" @editMemory="updateEditing" />
    </section>
  </div>
</template>

<style scoped>
/* Add margin below the label */
.choose-option-label {
  margin-bottom: 0.5em;
  font-size: 1.2em;
}

/* Add some space between sections */
.ready-memory-section,
.random-memory-section {
  margin-top: 1em;
}
.random-memory-section:hover {
  transform: scale(1.05);
}
/* Update border and box-shadow for MemoryComponent */
article {
  background-color: var(--base-bg);
  max-width: 900px;
  border: 1px solid #ccc;
  border-radius: 1em;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 0.5em;
  padding: 1em;
  margin: 0 auto; /* Add this line to center the element */
}
article:hover {
  transform: scale(1.05); /* Scale up by 5% on hover */
}

/* Add some space between sections */
.row {
  margin-top: 1em;
}
</style>
