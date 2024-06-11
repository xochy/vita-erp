import SingIn from "./SignIn.vue";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/vue";

describe("LoadingAlert component", () => {
  it("Should render correctly", () => {
    render(SingIn);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });
});
