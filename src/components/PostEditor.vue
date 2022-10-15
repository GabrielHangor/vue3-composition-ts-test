<template>Editing post {{ post.title }}</template>

<script setup lang="ts">
import { useStore } from '@/store';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const store = useStore();

if (!store.getState().posts.loaded) {
  await store.fetchPosts();
}

const postId = route.params.id as string;
const post = store.getState().posts.all.get(postId);

if (!post) throw Error('Post is not found');

if (post.authorId !== store.getState().authors.currentUserId) {
  router.push('/');
}
console.log(post);
</script>

<style></style>
