import { Binding, IBindingOptions } from ".";

describe("Binding", () => {
  it("exists", () => {
    expect(Binding).toBeDefined();
  });

  describe("constructor", () => {
    it("creates binding", () => {
      const element = document.createElement("div");
      const options: IBindingOptions = {
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
        root: element,
        value: null
      };
      const binding = new Binding(options);

      expect(binding.getRoot()).toBe(element);
    });
  });

  describe("getValue", () => {
    it("returns correct value", () => {
      const element = document.createElement("div");
      const options: IBindingOptions = {
        root: element,
        value: "this is the correct value!"
      };
      const binding = new Binding(options);

      expect(binding.getValue()).toBe("this is the correct value!");
    });
  });

  describe("setValue", () => {
    it("changes value", () => {
      const element = document.createElement("div");
      const options: IBindingOptions = {
        root: element,
        value: "this is the first value!"
      };
      const binding = new Binding(options);

      binding.setValue("well, this is the second value though!");

      expect(binding.getValue()).toBe("well, this is the second value though!");
    });

    it("calls render", () => {
      const element = document.createElement("div");
      const options: IBindingOptions = {
        root: element,
        value: null
      };
      const binding = new Binding(options);
      const renderMock = (binding.render = jest.fn());

      binding.setValue("some new value");

      expect(renderMock.mock.calls.length).toBe(1);
    });
  });
});
