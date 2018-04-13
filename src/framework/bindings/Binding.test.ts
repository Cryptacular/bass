import { Binding, IBindingOptions } from ".";

describe("Binding", () => {
  it("exists", () => {
    expect(Binding).toBeDefined();
  });

  describe("constructor", () => {
    it("creates binding", () => {
      const element = document.createElement("div");
      const options: IBindingOptions = {
        properties: {},
        root: element,
        value: null
      };
      const binding = new Binding(options);

      expect(binding).toBeDefined();
    });
  });

  describe("getRoot", () => {
    it("returns root element", () => {
      const element = document.createElement("div");
      const options: IBindingOptions = {
        properties: {},
        root: element,
        value: null
      };
      const binding = new Binding(options);

      expect(binding.getRoot()).toBe(element);
    });
  });

  describe("get", () => {
    it("returns correct value", () => {
      const element = document.createElement("div");
      const options: IBindingOptions = {
        properties: {
          test: "this is the correct value!"
        },
        root: element,
        value: "test"
      };
      const binding = new Binding(options);

      expect(binding.get()).toBe("this is the correct value!");
    });

    it("returns correct value if property is a function", () => {
      const element = document.createElement("div");
      const options: IBindingOptions = {
        properties: {
          test: () => "this is the return value of a function!"
        },
        root: element,
        value: "test"
      };
      const binding = new Binding(options);

      expect(binding.get()).toBe("this is the return value of a function!");
    });
  });
});
