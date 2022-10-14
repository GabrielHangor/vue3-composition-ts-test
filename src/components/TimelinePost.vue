<template>
  <a :key="post.id" class="panel-block">
    <div class="is-flex is-flex-direction-column is-align-items-flex-start">
      <router-link :to="to">{{ post.title }}</router-link> &nbsp;
      <div>{{ post.created.format('Do MMM') }}</div>
    </div></a
  >
</template>
<script lang="ts" setup>
import { Post } from '@/mocks';

const props = defineProps({
  post: {
    type: Object as () => Post,
    required: true,
  },
});

const to = `/posts/${props.post.id}`;
</script>
<style></style>
