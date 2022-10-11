<template>
  <nav class="is-primary panel">
    <span class="panel-tabs">
      <a
        v-for="period in periods"
        :key="period"
        :class="{ 'is-active': period === currentPeriod }"
        @click="setPeriod(period)"
        :data-test="period"
        >{{ period }}</a
      >
    </span>
    <TimelinePost v-for="post in posts" :post="post" :key="post.id" class="panel-block" />
  </nav>
</template>

<script lang="ts" setup>
import { useStore } from '@/store';
import moment from 'moment';
import { computed, ref } from 'vue';
import { Post } from '../mocks';
import TimelinePost from './TimelinePost.vue';

type Period = 'Today' | 'This Week' | 'This Month';

const periods: Period[] = ['Today', 'This Week', 'This Month'];
const currentPeriod = ref<Period>('Today');

const store = useStore();

if (!store.getState().posts.loaded) {
  await store.fetchPosts();
}

const allPosts: Post[] = store.getState().posts.ids.reduce<Post[]>((acc, id) => {
  const thePost = store.getState().posts.all.get(id);
  if (!thePost) throw Error('Post now found');
  return acc.concat(thePost);
}, []);

const posts = computed(() =>
  allPosts.filter((post) => {
    if (currentPeriod.value === 'Today') {
      return post.created.isAfter(moment().subtract(1, 'day'));
    }

    if (currentPeriod.value === 'This Week') {
      return post.created.isAfter(moment().subtract(1, 'week'));
    }

    if (currentPeriod.value === 'This Month') {
      return post.created.isAfter(moment().subtract(1, 'month'));
    }

    return false;
  })
);

const setPeriod = (period: Period) => {
  currentPeriod.value = period;
};
</script>

<style></style>
