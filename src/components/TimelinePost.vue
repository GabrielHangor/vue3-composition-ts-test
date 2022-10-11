<template>
  <a :key="post.id" class="panel-block">
    <div class="is-flex is-flex-direction-column is-align-items-flex-start">
      <a>{{ post.title }}</a> &nbsp;
      <div>{{ post.created.format('Do MMM') }}</div>
    </div></a
  >
</template>
<script lang="ts" setup>
import { Post } from '@/mocks';

defineProps({
  post: {
    type: Object as () => Post,
    required: true,
  },
});
</script>
<style></style>
