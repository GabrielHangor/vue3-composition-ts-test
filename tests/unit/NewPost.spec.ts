import { Store } from '@/store';
import { mount } from '@vue/test-utils';
import NewPost from '../../src/components/NewPost.vue';

let routes: string[] = [];

jest.mock('vue-router', () => ({
  useRouter: () => {
    return {
      push: (route: string) => {
        routes.push(route);
      },
    };
  },
}));

jest.mock('axios', () => ({
  post: (url: String, payload: any) => {
    return { data: payload };
  },
}));

describe('NewPost', () => {
  const store = new Store({
    authors: { all: new Map(), ids: [], loaded: false, currentUserId: '' },
    posts: { all: new Map(), ids: [], loaded: false },
  });

  beforeEach(() => {
    routes = [];
  });
  it('creates a post and redirects to /', async () => {
    const wrapper = mount(NewPost, {
      global: {
        plugins: [store],
      },
    });

    expect(store.getState().posts.ids).toHaveLength(0);

    await wrapper.find('[data-test=submit]').trigger('click');

    expect(store.getState().posts.ids).toHaveLength(1);
    expect(routes).toEqual(['/']);
  });
});
