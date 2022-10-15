import { App, inject, reactive, readonly } from 'vue';
import { Post } from './mocks';
import axios from 'axios';

interface BaseState<T> {
  ids: string[];
  all: Map<string, T>;
  loaded: boolean;
}

export interface User {
  id: string;
  username: string;
  password: string;
}

export type Author = Omit<User, 'password'>;

type PostsState = BaseState<Post>;

interface AuthorsState extends BaseState<Author> {
  currentUserId: string | undefined;
}

interface State {
  authors: AuthorsState;
  posts: PostsState;
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
    this.state.posts.all.set(response.data.id, response.data);
    this.state.posts.ids.push(response.data.id);
    console.log(response);
  }

  async createUser(user: User) {
    const response = await axios.post<Author>('/users', user);
    this.state.authors.all.set(response.data.id, response.data);
    this.state.authors.ids.push(response.data.id);
    this.state.authors.currentUserId = response.data.id;
    console.log(response);
  }
}

export const store = new Store({
  authors: { all: new Map(), ids: [], loaded: false, currentUserId: '' },
  posts: { all: new Map(), ids: [], loaded: false },
});

export function useStore(): Store {
  const _store = inject<Store>(storeKey);

  if (!_store) {
    throw Error('Did you forget to call provide');
  }

  return _store;
}
