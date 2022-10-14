import { createApp } from 'vue';
import App from './App.vue';
import { routerWithStore } from './router';
import 'highlight.js/styles/atom-one-dark.css';
import axios from 'axios';
import { random } from 'lodash';
import {  thisMonth, thisWeek, today } from './mocks';
import { Author, store} from './store';

const delay = () => {
  return new Promise((resolve) => {
    setTimeout(resolve, 2000);
  });
};

// @ts-ignore
axios.post = async (url: string, payload: any) => {
  if (url === '/posts') {
    const id = random(100, 10000);
    await delay();
    return Promise.resolve({ data: { ...payload, id } });
  }

  if (url === '/users') {
    const id = random(100, 10000);
    const author: Author = {
      id: id.toString(),
      username: payload.username,
    };
    await delay();
    return Promise.resolve({ data: author });
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
const router = routerWithStore(store);

app.use(router);
app.use(store);
app.mount('#app');
