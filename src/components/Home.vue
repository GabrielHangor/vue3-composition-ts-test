<template>
  <Suspense>
    <template #default>
      <Timeline />
    </template>
    <template #fallback><Spinner /> </template>
  </Suspense>
</template>

<script setup lang="ts">
import Timeline from './Timeline.vue';
import Spinner from './Spinner.vue';
</script>

<style></style>
