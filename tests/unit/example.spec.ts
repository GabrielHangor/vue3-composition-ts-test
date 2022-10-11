import { shallowMount, mount, flushPromises } from '@vue/test-utils';
import Timeline from '@/components/Timeline.vue';
import { thisMonth, thisWeek, today } from './../../src/mocks';
import { Store } from './../../src/store';

jest.mock('axios', () => ({
  get: () => Promise.resolve({ data: [today, thisWeek, thisMonth] }),
}));

const mountTimeline = () => {
  const store = new Store({ posts: { ids: [], all: new Map(), loaded: false } });
  const testComponent = {
    components: { Timeline },
    template: `
<suspense>
<template #default>
<timeline />
</template>
<template #fallback>
Loading...
</template>
</suspense>`,
  };

  return mount(testComponent, {
    global: {
      plugins: [store],
    },
  });
};

describe('Timeline', () => {
  it('renders today posts default', async () => {
    const wrapper = mountTimeline();

    await flushPromises();

    expect(wrapper.html()).toContain(today.created.format('Do MMM'));
  });

  it('updates when the period is clicked (week)', async () => {
    const wrapper = mountTimeline();

    await flushPromises();

    await wrapper.get('[data-test="This Week"]').trigger('click');

    expect(wrapper.html()).toContain(today.created.format('Do MMM'));
    expect(wrapper.html()).toContain(thisWeek.created.format('Do MMM'));
  });

  it('updates when the period is clicked (month)', async () => {
    const wrapper = mountTimeline();

    await flushPromises();

    await wrapper.get('[data-test="This Month"]').trigger('click');

    expect(wrapper.html()).toContain(today.created.format('Do MMM'));
    expect(wrapper.html()).toContain(thisWeek.created.format('Do MMM'));
    expect(wrapper.html()).toContain(thisMonth.created.format('Do MMM'));
  });
});

// Данные через замоканный аксиос неверны
