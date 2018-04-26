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
        computed: {},
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
        computed: {},
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
        computed: {},
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
        computed: {},
        value: "test"
      };
      const binding = new Binding(options);

      expect(binding.get()).toBe("this is the return value of a function!");
    });

    it("returns correct value if property is computed and is a function", () => {
      const element = document.createElement("div");
      const options: IBindingOptions = {
        properties: {},
        root: element,
        computed: {
          date: () => new Date(2018, 5, 3)
        },
        value: "date"
      };
      const binding = new Binding(options);

      expect(binding.get()).toEqual(new Date(2018, 5, 3));
    });
  });
});
