<template>
  <div class="navbar">
    <router-link to="/" class="button">Home</router-link>
    <div class="navbar-end">
      <div v-if="isUserAuthenticated" class="buttons">
        <router-link to="/posts/new" class="button">New Post</router-link>
        <button class="button is-danger" @click="signOut">Sign Out</button>
      </div>
      <div v-else class="buttons">
        <button class="button is-primary" @click="signUp">Sign Up</button>
        <button class="button is-primary" @click="signIn">Sign In</button>
      </div>
    </div>
  </div>

  <Teleport to="#modal">
    <Component :is="modal.component.value" />
  </Teleport>
</template>

<script setup lang="ts">
import { useStore } from '@/store';
import { useModal } from '@/useModal';
import { computed, markRaw } from 'vue';
import SignUp from './SignUp.vue';

const store = useStore();
const modal = useModal();

const isUserAuthenticated = computed(() => {
  return !!store.getState().authors.currentUserId;
});

const signOut = () => {};
const signIn = () => {
  modal.showModal();
};
const signUp = () => {
  modal.component.value = markRaw(SignUp);
  modal.showModal();
};
</script>

<style></style>
