import {  ref } from 'vue';

const show = ref(false);
const component = ref();

export const useModal = () => {
  return {
    show,
    component,
    showModal: () => (show.value = true),
    hideModal: () => (show.value = false),
  };
};
