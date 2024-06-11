import usePhysicalConditionsStore from "./UsePhysicalConditionsStore";
import { QueryClient, VueQueryPlugin } from "@tanstack/vue-query";
import { createPinia, setActivePinia, storeToRefs } from "pinia";
import { defineComponent, nextTick, createApp } from "vue";
import { mount } from "@vue/test-utils";

let pinia;

beforeEach(() => {
  pinia = createPinia();
  setActivePinia(pinia);

  // Initialize Vue Query
  const queryClient = new QueryClient();

  // Create a local instance of the app
  const app = createApp({});

  app.use(VueQueryPlugin, { queryClient });
});

describe("UsePhysicalConditionsStore", () => {
  it("sets and gets the current page correctly", async () => {
    const TestComponent = defineComponent({
      setup() {
        const store = usePhysicalConditionsStore();
        const { currentPage, physicalConditions, getPage } = storeToRefs(store);

        store.getPage(2);
        return { currentPage, physicalConditions, getPage };
      },
      template: "<div></div>",
    });

    const queryClient = new QueryClient();
    const wrapper = mount(TestComponent, {
      global: {
        plugins: [pinia, [VueQueryPlugin, { queryClient }]],
      },
    });
    await nextTick();
    console.log(wrapper.vm.currentPage);
    expect(wrapper.vm.currentPage).toBe(2);
  });

  // Add similar tests for other properties and methods
});
