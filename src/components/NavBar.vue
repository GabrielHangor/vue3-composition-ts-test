<template>
  <div class="navbar">
    <div class="navbar-end">
      <div class="buttons">
        <button class="button is-primary" @click="modal.showModal">Sign Up</button>
        <router-link to="/" class="button">Home</router-link>
        <router-link to="/posts/new" class="button">New Post</router-link>
      </div>
    </div>
  </div>

  <Teleport to="#modal">
    <SignUp />
  </Teleport>
</template>

<script setup lang="ts">
import { useModal } from '@/useModal';
import SignUp from './SignUp.vue';

const modal = useModal();
</script>

<style></style>
