import { it } from "node:test";
import PhysicalConditionsList from "../views/PhysicalConditionsList.vue";
import { expect } from "vitest";
import { mount } from "@vue/test-utils";

const wrapper = mount(PhysicalConditionsList);

it("renders the component", async () => {

  // Wait for any asynchronous updates to complete
  await wrapper.vm.$nextTick();

  // Check if the component is rendered
  expect(wrapper.exists()).toBe(true);
});
