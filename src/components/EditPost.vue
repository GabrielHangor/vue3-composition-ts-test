<template>
  <Suspense>
    <template #default>
      <PostEditor />
    </template>
    <template #fallback><Spinner /> </template>
  </Suspense>
</template>

<script lang="ts" setup>
import PostEditor from './PostEditor.vue';
import Spinner from './Spinner.vue';
</script>

<style></style>
