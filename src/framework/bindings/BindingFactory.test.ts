import { BindingFactory } from "./BindingFactory";
import { TextBinding } from "./TextBinding";

describe("BindingFactory", () => {
  it("exists", () => {
    expect(BindingFactory).toBeDefined();
  });

  describe("getBinding", () => {
    it("throws an error if the binding type does not exist", () => {
      expect(() =>
        BindingFactory.getBinding("some-binding-that-doesnt-exist", {
          root: document.createElement("div"),
          value: null
        })
      ).toThrow();
    });

    it("returns text binding", () => {
      const binding = BindingFactory.getBinding("bass-text", {
        root: document.createElement("div"),
        value: null
      });
      expect(binding).toBeDefined();
      expect(binding.constructor.name).toBe(TextBinding.name);
    });
  });
});
