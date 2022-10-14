<template>
  <Suspense>
    <template #default>
      <PostViewer />
    </template>
    <template #fallback><Spinner /> </template>
  </Suspense>
</template>

<script lang="ts" setup>
import PostViewer from './PostViewer.vue';
import Spinner from './Spinner.vue';
</script>

<style></style>
