import { createApp } from 'vue';
import App from './App.vue';
import { router } from './router';
import 'highlight.js/styles/atom-one-dark.css';
import axios from 'axios';
import { random } from 'lodash';
import { Post, thisMonth, thisWeek, today } from './mocks';
import { store, storeKey } from './store';

const delay = () => {
  return new Promise((resolve) => {
    setTimeout(resolve, 2000);
  });
};

// @ts-ignore
axios.post = async (url: string, newPost: Post) => {
  if (url === '/posts') {
    const id = random(100, 10000);
    await delay();
    return Promise.resolve({ data: { ...newPost, id } });
  }
};

// @ts-ignore
axios.get = async (url: string) => {
  if (url === '/posts') {
    await delay();
    return Promise.resolve({ data: [today, thisWeek, thisMonth] });
  }
};

const app = createApp(App);

app.use(router);
app.use(store);
app.mount('#app');
