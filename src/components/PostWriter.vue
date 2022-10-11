<template>
  <div class="comumns">
    <div class="column">
      <div class="field">
        <div class="label">
          New Post
          <input v-model="title" type="text" class="input" data-test="title" />
        </div>
      </div>
    </div>
  </div>

  <div class="columns">
    <div class="column">
      <div
        contenteditable
        ref="contentEditable"
        @input="handleInput"
        data-test="content"
      ></div>
    </div>
    <div class="column">
      <div v-html="html" />
    </div>
  </div>

  <div class="columns">
    <div class="column">
      <button
        @click="savePost"
        class="button is-primary is-pulled-right"
        data-test="submit"
      >
        Submit
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Post } from '@/mocks';
import { onMounted, ref, watch } from 'vue';
import { parse } from 'marked';
import highlight from 'highlight.js';
import { debounce } from 'lodash';

const props = defineProps({
  post: { type: Object as () => Post, required: true },
});

const emit = defineEmits<{ (event: 'savePost', newPost: Post): void }>();

const title = ref(props.post.title);
const content = ref('## Enter your Content');
const html = ref('');
const contentEditable = ref<HTMLDivElement | null>(null);

const parseHtml = (str: string) => {
  html.value = parse(str, {
    gfm: true,
    breaks: true,
    highlight: (code: string) => {
      return highlight.highlightAuto(code).value;
    },
  });
};

watch(
  content,
  debounce((newVal: string) => {
    parseHtml(newVal);
  }, 250),
  { immediate: true }
);

const handleInput = () => {
  if (!contentEditable.value) {
    throw Error('contentEditable is not present');
  }

  content.value = contentEditable.value.innerText || '';
};

const savePost = () => {
  const newPost: Post = {
    ...props.post,
    title: title.value,
    html: html.value,
    markdown: content.value,
  };

  emit('savePost', newPost);
};

onMounted(() => {
  if (!contentEditable.value) {
    throw Error('contentEditable is not present');
  }

  contentEditable.value.innerText = content.value;
});
</script>

<style>
.column {
  overflow-y: auto;
}
</style>
