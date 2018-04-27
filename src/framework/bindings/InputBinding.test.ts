import { IBindingOptions, InputBinding } from ".";
import { MessageBusMock } from "../../mocks";

describe("InputBinding", () => {
  it("exists", () => {
    expect(InputBinding).toBeDefined();
  });

  it("does not throw error if element is not an input element", () => {
    const element = document.createElement("div");

    const options: IBindingOptions = {
      root: element,
      properties: { thingy: "The text of the thingy" },
      computed: {},
      messageBus: new MessageBusMock(),
      value: "thingy"
    };

    expect(() => new InputBinding(options)).not.toThrow();
  });

  describe("event listener", () => {
    let eventListenerSpy;
    let setPropertySpy;

    beforeEach(() => {
      const element = document.createElement("input");
      const options: IBindingOptions = {
        root: element,
        properties: { thingy: "The text of the thingy" },
        computed: {},
        messageBus: new MessageBusMock(),
        value: "thingy"
      };
      eventListenerSpy = spyOn(element, "addEventListener");

      const binding = new InputBinding(options);

      setPropertySpy = spyOn(binding, "setProperty");
    });

    it("is added for various event types", () => {
      expect(eventListenerSpy).toHaveBeenCalledTimes(4);
      expect(eventListenerSpy).toHaveBeenCalledWith(
        "change",
        expect.anything()
      );
      expect(eventListenerSpy).toHaveBeenCalledWith(
        "keypress",
        expect.anything()
      );
      expect(eventListenerSpy).toHaveBeenCalledWith("paste", expect.anything());
      expect(eventListenerSpy).toHaveBeenCalledWith("input", expect.anything());
    });

    it("is not called when no events fired", () => {
      expect(setPropertySpy).not.toHaveBeenCalled();
    });
  });

  describe("onChange", () => {
    it("updates property when triggered", () => {
      const element = document.createElement("input");
      const options: IBindingOptions = {
        root: element,
        properties: { thingy: "the old value" },
        computed: {},
        messageBus: new MessageBusMock(),
        value: "thingy"
      };
      const binding = new InputBinding(options);

      element.value = "something new";
      const event = {
        target: element
      };
      binding.onChange(event as any);

      expect(element.value).toBe("something new");
      expect(binding.getProperties().thingy).toBe("something new");
    });
  });

  describe("render", () => {
    it("sets value on input element", () => {
      const element = document.createElement("input");
      element.type = "text";

      const options: IBindingOptions = {
        root: element,
        properties: { thingy: "The text of the thingy" },
        computed: {},
        messageBus: new MessageBusMock(),
        value: "thingy"
      };
      const binding = new InputBinding(options);

      expect(element.value).toBe("The text of the thingy");
    });
  });
});
