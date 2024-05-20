// Test for: src/modules/features/physicalConditions/views/PhysicalConditionDetails.vue

import PhysicalConditionDetails from '../views/PhysicalConditionDetails.vue';
import { expect, it } from "vitest";
import { mount } from '@vue/test-utils';

it('renders the component', async () => {
  const wrapper = mount(PhysicalConditionDetails, {
    // Pass ID 1 as route param
    props: {
      id: '1'
    }
  });

  // Wait for any asynchronous updates to complete
  await wrapper.vm.$nextTick();

  // Check if the component is rendered
  expect(wrapper.exists()).toBe(true);
});
