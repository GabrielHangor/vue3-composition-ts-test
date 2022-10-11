import { Store } from '@/store';
import { mount } from '@vue/test-utils';
import NewPost from '../../src/components/NewPost.vue';

describe('NewPost', () => {
  it('creates a post and redirects to /', async () => {
    const store = new Store({ posts: { ids: [], all: new Map(), loaded: false } });
    mount(NewPost);
  });
});
