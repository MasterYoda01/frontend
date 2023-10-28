<script setup lang="ts">
import { useUserStore } from "@/stores/user";
import { fetchy } from "@/utils/fetchy";
import { storeToRefs } from "pinia";
import { onBeforeMount, ref } from "vue";
import CommentListComponent from "../Comment/CommentListComponent.vue";
import CreatePostForm from "./CreatePostForm.vue";
import EditPostForm from "./EditPostForm.vue";
import PostComponent from "./PostComponent.vue";
import SearchPostForm from "./SearchPostForm.vue";

const { isLoggedIn } = storeToRefs(useUserStore());

const loaded = ref(false);
let posts = ref<Array<Record<string, string>>>([]);
let editing = ref("");
let searchAuthor = ref("");

async function getPosts(author?: string) {
  let query: Record<string, string> = author !== undefined ? { author } : {};
  let postResults;
  try {
    postResults = await fetchy("/api/posts", "GET", { query });
  } catch (_) {
    return;
  }
  searchAuthor.value = author ? author : "";
  posts.value = postResults;
}

function updateEditing(id: string) {
  editing.value = id;
}

onBeforeMount(async () => {
  await getPosts();
  loaded.value = true;
});
</script>

<template>
  <section v-if="isLoggedIn" class="create-post">
    <h2>Create a post:</h2>
    <CreatePostForm @refreshPosts="getPosts" />
  </section>
  <div class="row search">
    <h2 v-if="!searchAuthor"></h2>
    <h2 v-else>Posts by {{ searchAuthor }}:</h2>
    <SearchPostForm @getPostsByAuthor="getPosts" />
  </div>
  <section class="posts" v-if="loaded && posts.length !== 0">
    <article v-for="post in posts" :key="post._id" class="post">
      <PostComponent v-if="editing !== post._id" :post="post" @refreshPosts="getPosts" @editPost="updateEditing" />
      <EditPostForm v-else :post="post" @refreshPosts="getPosts" @editPost="updateEditing" />

      <h3>Comments:</h3>
      <CommentListComponent :postId="post._id" />
    </article>
  </section>
  <p v-else-if="loaded">No posts found</p>
  <p v-else>Loading...</p>
</template>

<style scoped>
/* Add hover effect for buttons */
button:hover {
  background-color: #0056b3;
}

/* Add hover effect for posts */
.post {
  transition: transform 0.3s;
}

.post:hover {
  transform: scale(1.05);
}

h3 {
  font-weight: bold;
  font-size: 1.3em;
}

/* Add media query for smaller screens */
@media screen and (max-width: 768px) {
  section.posts {
    gap: 1em; /* Adjust gap for smaller screens */
  }

  article {
    max-width: none; /* Allow posts to expand to full width */
  }
}
section.create-post {
  max-width: 600px; /* Set a maximum width */
  margin: auto; /* Center the form */
  background-color: #ffffff;
  padding: 1em;
  border-radius: 10px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
}

h2 {
  font-size: 2em;
  text-align: center;
  margin-bottom: 0.5em;
  color: #333333;
}
.row.search {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1em;
}

.row.search h2 {
  flex: 1;
  text-align: center;
}

.row.search form {
  margin-left: auto;
}

.search input[type="text"] {
  padding: 0.5em;
  font-size: 1em;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 70%;
  margin-right: 1em;
}

.search button {
  padding: 0.5em 1em;
  font-size: 1em;
  border: none;
  border-radius: 4px;
  background-color: #007bff;
  color: #fff;
  cursor: pointer;
}

.search button:hover {
  background-color: #0056b3;
}

section.posts {
  display: flex;
  flex-wrap: wrap;
  gap: 2em; /* Increased gap for more spacing */
  justify-content: center;
}

article {
  background-color: #f8f8f8;
  border-radius: 10px;
  padding: 1em;
  max-width: 400px;
  width: 100%;
}

h3 {
  font-size: 1.2em;
  margin-bottom: 0.5em;
  color: #333333;
}

p {
  color: #555555;
}
</style>
