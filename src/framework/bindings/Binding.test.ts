import { Binding, IBindingOptions } from ".";
import { MessageBusMock } from "../../mocks";

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
        messageBus: new MessageBusMock(),
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
        messageBus: new MessageBusMock(),
        value: null
      };
      const binding = new Binding(options);

      expect(binding.getRoot()).toBe(element);
    });
  });

  describe("getProperties", () => {
    it("returns properties", () => {
      const properties = {
        exampleOne: "hello!",
        isRed: false
      };
      const element = document.createElement("div");
      const options: IBindingOptions = {
        properties,
        root: element,
        computed: {},
        messageBus: new MessageBusMock(),
        value: null
      };
      const binding = new Binding(options);

      expect(binding.getProperties()).toBe(properties);
    });
  });

  describe("setProperty", () => {
    it("sets property if it exists", () => {
      const element = document.createElement("div");
      const options: IBindingOptions = {
        properties: {
          hello: "world"
        },
        root: element,
        computed: {},
        messageBus: new MessageBusMock(),
        value: null
      };
      const binding = new Binding(options);

      binding.setProperty("hello", "suckers");

      expect(binding.getProperties()).toEqual({ hello: "suckers" });
    });

    it("does not set property if it doesn't exist", () => {
      const element = document.createElement("div");
      const options: IBindingOptions = {
        properties: {
          hello: "world"
        },
        root: element,
        computed: {},
        messageBus: new MessageBusMock(),
        value: null
      };
      const binding = new Binding(options);

      binding.setProperty("something that doesn't exist", "some value, yo!");

      expect(binding.getProperties()).toEqual({ hello: "world" });
    });

    it("publishes message to the message bus if it exists", () => {
      const element = document.createElement("div");
      const options: IBindingOptions = {
        properties: {
          hello: "world"
        },
        root: element,
        computed: {},
        messageBus: new MessageBusMock(),
        value: null
      };
      const binding = new Binding(options);
      const messageBusPublishSpy = spyOn(options.messageBus, "publish");

      binding.setProperty("hello", "suckers");

      expect(messageBusPublishSpy).toHaveBeenCalled();
      expect(messageBusPublishSpy).toHaveBeenCalledWith("hello", "suckers");
    });

    it("does not publish message to the message bus if it doesn't exist", () => {
      const element = document.createElement("div");
      const options: IBindingOptions = {
        properties: {
          hello: "world"
        },
        root: element,
        computed: {},
        messageBus: new MessageBusMock(),
        value: null
      };
      const binding = new Binding(options);
      const messageBusPublishSpy = spyOn(options.messageBus, "publish");

      binding.setProperty("something that doesn't exist", "some value, yo!");

      expect(messageBusPublishSpy).not.toHaveBeenCalled();
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
        messageBus: new MessageBusMock(),
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
        messageBus: new MessageBusMock(),
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
        messageBus: new MessageBusMock(),
        value: "date"
      };
      const binding = new Binding(options);

      expect(binding.get()).toEqual(new Date(2018, 5, 3));
    });
  });
});
