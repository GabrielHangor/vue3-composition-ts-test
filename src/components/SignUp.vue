<template>
  <form @submit.prevent="submit">
    <FormInput name="Username" v-model="userName" :error="userNameStatus.message" />
    <FormInput name="Password" type="password" v-model="password" :error="passwordStatus.message" />
    <button :disabled="isSubmitButtonActive" class="button is-primary">Submit</button>
  </form>
</template>

<script setup lang="ts">
import { User, useStore } from '@/store';
import { useModal } from '@/useModal';
import { required, Status, validate, length } from '@/validation';
import { computed, ref } from 'vue';
import FormInput from '../components/FormInput.vue';

const store = useStore();
const modal = useModal();

const userName = ref('username');
const password = ref('password');

const userNameStatus = computed<Status>(() => {
  return validate(userName.value, [required(), length({ min: 5, max: 10 })]);
});

const passwordStatus = computed<Status>(() => {
  return validate(password.value, [required(), length({ min: 5, max: 15 })]);
});

const isSubmitButtonActive = computed(() => {
  return !userNameStatus.value.valid || !passwordStatus.value.valid;
});

const submit = async () => {
  if (!userNameStatus.value.valid || !passwordStatus.value.valid) return;

  const newUser: User = {
    id: '-1',
    username: userName.value,
    password: password.value,
  };

  await store.createUser(newUser);
  modal.hideModal();
};
</script>

<style scoped>
form {
  padding: 2rem;
  background: rgb(255, 255, 255);
}
</style>
