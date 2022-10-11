import { App, inject, reactive, readonly } from 'vue';
import { Post } from './mocks';
import axios from 'axios';
import moment from 'moment';

export interface User {
  id: string;
  username: string;
  password: string;
}

interface State {
  posts: PostsState;
}

interface PostsState {
  ids: string[];
  all: Map<string, Post>;
  loaded: boolean;
}

export const storeKey = Symbol('store');

export class Store {
  private state: State;

  constructor(initial: State) {
    this.state = reactive(initial);
  }

  install(app: App) {
    app.provide(storeKey, this);
  }

  getState() {
    return readonly(this.state);
  }

  async fetchPosts() {
    const response = await axios.get<Post[]>('/posts');

    const postsState: PostsState = {
      ids: [],
      all: new Map(),
      loaded: false,
    };

    for (const post of response.data) {
      postsState.ids.push(post.id);
      postsState.all.set(post.id, post);
    }

    postsState.loaded = true;

    this.state.posts = postsState;
  }

  async createPost(newPost: Post) {
    const response = await axios.post<Post>('/posts', newPost);
    this.state.posts.all.set(newPost.id, response.data);
    this.state.posts.ids.push(newPost.id);
    console.log(response);
  }

  async createUser(user: User) {
    console.log(user);
  }
}

export const store = new Store({
  posts: {
    all: new Map(),
    ids: [],
    loaded: false,
  },
});

export function useStore(): Store {
  const _store = inject<Store>(storeKey);

  if (!_store) {
    throw Error('Did you forget to call provide');
  }

  return _store;
}
