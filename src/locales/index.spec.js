import { createInstance } from "./index";

const mockNavigationLanguage = vi.spyOn(window.navigator, "language", "get");

afterEach(() => {
  mockNavigationLanguage.mockReset();
});

describe("createInstance", () => {
  describe("When locale is not set in localStorage", () => {
    describe("When browser language is undefined", () => {
      it("Set the language to English", () => {
        mockNavigationLanguage.mockReturnValue(undefined);
        const i18n = createInstance();
        expect(i18n.global.locale).toBe("en");
      });
    });

    describe("When browser language is set", () => {
      it("Set the language as browser language", () => {
        mockNavigationLanguage.mockReturnValue("ab");
        const i18n = createInstance();
        expect(i18n.global.locale).toBe("ab");
      });
    });
  });

  describe("When locale is set in localStorage", () => {
    it("Set the language from localStorage", () => {
      localStorage.setItem("locale", "fr");
      const i18n = createInstance();
      expect(i18n.global.locale).toBe("fr");
    });
  });
});
