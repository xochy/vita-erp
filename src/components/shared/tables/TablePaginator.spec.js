import { mount } from "@vue/test-utils";
import TablePaginator from "./TablePaginator.vue";

const setup = () => {
  const fn = vi.fn();

  const wrapper = mount(TablePaginator, {
    props: {
      currentPage: 2,
      from: 6,
      lastPage: 2,
      perPage: 5,
      to: 10,
      total: 10,
      getPage: fn,
    },
  });

  const pageItems = wrapper.findAll(".page-item");
  const pageItem = wrapper.find(".page-item");
  const nextPageItem = wrapper.find(".next");

  return {
    wrapper,
    pageItems,
    pageItem,
    nextPageItem,
    fn,
  };
};

describe("TablePaginator.vue", () => {
  it("renders correct number of pages", () => {
    const { pageItems } = setup();
    const previosAndNextItems = 2;
    expect(pageItems.length).toBe(2 + previosAndNextItems);
  });

  it("calls getPage method from props when a page is clicked", async () => {
    const { pageItem, fn } = setup();
    await pageItem.trigger("click");
    expect(fn).toHaveBeenCalled();
  });

  it("does not allow navigation to previous page from first page", () => {
    const wrapper = mount(TablePaginator, {
      props: {
        currentPage: 1,
        from: 1,
        lastPage: 2,
        perPage: 5,
        to: 5,
        total: 10,
      },
    });

    const previousPageItem = wrapper.find(".previous");
    expect(previousPageItem.classes()).toContain("disabled");
  });

  it("does not allow navigation to next page from last page", () => {
    const { nextPageItem } = setup();
    expect(nextPageItem.classes()).toContain("disabled");
  });
});
