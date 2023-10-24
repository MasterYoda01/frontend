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
let randomMemory = ref<Record<string, string>>();

async function getReadyMemories() {
  //   let postId = props.postId;
  //   let query: Record<string, string> = postId !== undefined ? { postId } : {};
  let memoryResults;
  try {
    memoryResults = await fetchy("/api/memories", "GET");
  } catch (_) {
    return;
  }
  console.log("ready", memoryResults);

  option.value = "ready";
  readyMemories.value = memoryResults;
}

async function getRandomMemory(dateRequested?: string) {
  let query: Record<string, string> = dateRequested !== undefined ? { dateRequested } : {};
  let memoryResults;
  try {
    memoryResults = await fetchy(`/api/memories/${dateRequested}`, "GET", { query });
  } catch (_) {
    return;
  }
  console.log("random", memoryResults);
  option.value = "random";
  randomMemory.value = memoryResults;
}

function updateEditing(id: string) {
  editing.value = id;
}

//can now try to make it so if dropdown string is ready, theres a submit form for ready. Once you click submit, it gets all ready memories
onBeforeMount(async () => {
  await getReadyMemories();
  await getRandomMemory();
  loaded.value = true;
});
</script>

<template>
  <CreateMemoryForm v-if="isLoggedIn" @refreshMemories="getReadyMemories" />
  <label>Choose Option:</label>
  <GetMemoryComponent @ready="getReadyMemories" @random="getRandomMemory" />
  <section v-if="option === 'ready'">
    <article v-for="memory in readyMemories" :key="memory._id">
      <MemoryComponent v-if="editing !== memory._id && option === 'ready'" :memory="memory" @refreshMemories="getReadyMemories" @editMemory="updateEditing" />

      <!-- <EditMemoryForm v-else :memory="memory" @refreshmemories="getReadyMemories" @editmemory="updateEditing" /> -->
    </article>
  </section>

  <section v-if="option === 'random'">
    <MemoryComponent v-if="editing !== randomMemory!.id && option === 'random'" :memory="randomMemory" @refreshMemories="getRandomMemory" @editMemory="updateEditing" />
  </section>
  <!-- <p v-else-if="loaded">No memories found</p>
  <p v-else>Loading...</p> -->
</template>

<style scoped>
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
  gap: 0.5em;
  padding: 1em;
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
