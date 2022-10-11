import { mount, flushPromises } from '@vue/test-utils';
import PostWriter from '@/components/PostWriter.vue';

const delay = () => {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, 300);
  });
};

describe('PostWriter', () => {
  it('emits a save event with the new post', async () => {
    const wrapper = mount(PostWriter, {
      props: { post: { title: 'New title' } },
    });

    await wrapper.find("[data-test='title']").setValue('My new post');

    const $content = wrapper.find<HTMLDivElement>("[data-test='content']");
    $content.element.innerText = '## New content';
    await $content.trigger('input');

    await delay();

    await wrapper.find("[data-test='submit']").trigger('click');

    const emitted = (wrapper.emitted()['savePost'] as any)[0][0];

    console.log(emitted);

    expect(emitted.title).toBe('My new post');
    expect(emitted.markdown).toBe('## New content');
    expect(emitted.html).toBe('<h2 id="new-content">New content</h2>\n');
  });
});
