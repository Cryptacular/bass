import { ClassBinding, InputBinding, TextBinding } from ".";
import { MessageBusMock } from "../../mocks";
import { BindingFactory } from "./BindingFactory";

describe("BindingFactory", () => {
  it("exists", () => {
    expect(BindingFactory).toBeDefined();
  });

  describe("createBinding", () => {
    it("throws an error if the binding type does not exist", () => {
      expect(() =>
        BindingFactory.createBinding("some-binding-that-doesnt-exist", {
          properties: {},
          root: document.createElement("div"),
          computed: {},
          messageBus: new MessageBusMock(),
          value: null
        })
      ).toThrow();
    });

    it("returns text binding", () => {
      const binding = BindingFactory.createBinding("bass-text", {
        properties: {},
        root: document.createElement("div"),
        computed: {},
        messageBus: new MessageBusMock(),
        value: null
      });
      expect(binding).toBeDefined();
      expect(binding.constructor.name).toBe(TextBinding.name);
    });

    it("returns class binding", () => {
      const binding = BindingFactory.createBinding("bass-class", {
        properties: {},
        root: document.createElement("div"),
        computed: {},
        messageBus: new MessageBusMock(),
        value: null
      });
      expect(binding).toBeDefined();
      expect(binding.constructor.name).toBe(ClassBinding.name);
    });

    it("returns input binding", () => {
      const binding = BindingFactory.createBinding("bass-input", {
        properties: {},
        root: document.createElement("div"),
        computed: {},
        messageBus: new MessageBusMock(),
        value: null
      });
      expect(binding).toBeDefined();
      expect(binding.constructor.name).toBe(InputBinding.name);
    });
  });
});
