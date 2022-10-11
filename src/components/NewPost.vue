<template>
  <PostWriter :post="newPost" @save-post="savePost" />
</template>

<script setup lang="ts">
import { Post } from '@/mocks';
import { useStore } from '@/store';
import moment from 'moment';
import { useRouter } from 'vue-router';
import PostWriter from './PostWriter.vue';

const newPost: Post = {
  id: '-1',
  title: 'New Post',
  created: moment().subtract(1, 'second'),
};

const store = useStore();
const router = useRouter();

const savePost = async (newPost: Post) => {
  await store.createPost(newPost);
  router.push('/');
};
</script>

<style></style>
