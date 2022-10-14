<template>
  <h1>{{ post?.title || 'Post was not found' }}</h1>
</template>

<script setup lang="ts">
import { useStore } from '@/store';
import { useRoute } from 'vue-router';

const route = useRoute();
const store = useStore();

if (!store.getState().posts.loaded) {
  await store.fetchPosts();
}

const postId = route.params.id as string;
const post = store.getState().posts.all.get(postId);
console.log(post);
</script>

<style></style>
