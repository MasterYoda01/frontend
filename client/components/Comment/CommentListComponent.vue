<script setup lang="ts">
import { storeToRefs } from "pinia";
import { onBeforeMount, ref } from "vue";
import { useUserStore } from "../../stores/user";
import { fetchy } from "../../utils/fetchy";
import CommentComponent from "./CommentComponent.vue";
import CreateCommentForm from "./CreateCommentForm.vue";
import EditCommentForm from "./EditCommentForm.vue";
const { isLoggedIn } = storeToRefs(useUserStore());

const loaded = ref(false);
let comments = ref<Array<Record<string, string>>>([]);
let editing = ref("");

const props = defineProps(["postId"]);

async function getPostComments() {
  let postId = props.postId;
  let query: Record<string, string> = postId !== undefined ? { postId } : {};
  let commentResults;
  try {
    commentResults = await fetchy("/api/comments", "GET", { query });
  } catch (_) {
    return;
  }
  comments.value = commentResults;
}

function updateEditing(id: string) {
  editing.value = id;
}

onBeforeMount(async () => {
  await getPostComments();
  loaded.value = true;
});
</script>

<template>
  <CreateCommentForm v-if="isLoggedIn" :postId="props.postId" @refreshComments="getPostComments" />

  <section class="comments" v-if="loaded && comments.length !== 0">
    <article v-for="comment in comments" :key="comment._id">
      <CommentComponent v-if="editing !== comment._id" :comment="comment" @refreshComments="getPostComments" @editComment="updateEditing" />
      <EditCommentForm v-else :comment="comment" @refreshComments="getPostComments" @editComment="updateEditing" />
    </article>
  </section>

  <p v-else-if="loaded">No comments found</p>
  <p v-else>Loading...</p>
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
