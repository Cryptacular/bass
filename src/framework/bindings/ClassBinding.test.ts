import { ClassBinding, IBindingOptions } from ".";
import { MessageBusMock } from "../../mocks";

describe("ClassBinding", () => {
  it("exists", () => {
    expect(ClassBinding).toBeDefined();
  });

  describe("render", () => {
    it("Adds class when property is true", () => {
      const element = document.createElement("div");
      const options: IBindingOptions = {
        root: element,
        properties: { shouldBeTrue: true },
        computed: {},
        messageBus: new MessageBusMock(),
        value: "thingy: shouldBeTrue"
      };
      const binding = new ClassBinding(options);

      expect(element.classList.length).toBe(1);
      expect(element.classList[0]).toBe("thingy");
    });
  });

  it("Removes class when property is false", () => {
    const element = document.createElement("div");
    element.className = "thingy";
    const options: IBindingOptions = {
      root: element,
      properties: { shouldBeFalse: false },
      computed: {},
      messageBus: new MessageBusMock(),
      value: "thingy: shouldBeFalse"
    };
    const binding = new ClassBinding(options);

    expect(element.classList.length).toBe(0);
  });

  it("Adds class when property is truthy", () => {
    const element = document.createElement("div");
    const options: IBindingOptions = {
      root: element,
      properties: { shouldBeTruthy: "this string evaluates to truthy" },
      computed: {},
      messageBus: new MessageBusMock(),
      value: "thingy: shouldBeTruthy"
    };
    const binding = new ClassBinding(options);

    expect(element.classList.length).toBe(1);
    expect(element.classList[0]).toBe("thingy");
  });

  it("Does not add class when property is falsy", () => {
    const element = document.createElement("div");
    const options: IBindingOptions = {
      root: element,
      properties: { shouldBeFalsy: 0 },
      computed: {},
      messageBus: new MessageBusMock(),
      value: "thingy: shouldBeFalsy"
    };
    const binding = new ClassBinding(options);

    expect(element.classList.length).toBe(0);
  });

  it("Does not add class when property is true and element already has class", () => {
    const element = document.createElement("div");
    element.className = "thingy";
    const options: IBindingOptions = {
      root: element,
      properties: { shouldBeTrue: true },
      computed: {},
      messageBus: new MessageBusMock(),
      value: "thingy: shouldBeTrue"
    };
    const binding = new ClassBinding(options);

    expect(element.classList.length).toBe(1);
    expect(element.classList[0]).toBe("thingy");
  });

  it("Does not throw error when removing class when element already has class", () => {
    const element = document.createElement("div");
    const options: IBindingOptions = {
      root: element,
      properties: { shouldBeFalse: false },
      computed: {},
      messageBus: new MessageBusMock(),
      value: "thingy: shouldBeFalse"
    };

    expect(() => new ClassBinding(options)).not.toThrow();
  });

  it("Does not throw error when value is empty string", () => {
    const element = document.createElement("div");
    const options: IBindingOptions = {
      root: element,
      properties: { shouldBeTrue: true },
      computed: {},
      messageBus: new MessageBusMock(),
      value: ""
    };

    expect(() => new ClassBinding(options)).not.toThrow();
  });

  it("Does not throw error when value does not have : character", () => {
    const element = document.createElement("div");
    const options: IBindingOptions = {
      root: element,
      properties: { shouldBeTrue: true },
      computed: {},
      messageBus: new MessageBusMock(),
      value: "thingy"
    };

    expect(() => new ClassBinding(options)).not.toThrow();
  });

  it("Does not throw error when value has whitespace before or after : character", () => {
    const element = document.createElement("div");
    const options: IBindingOptions = {
      root: element,
      properties: { shouldBeTrue: true },
      computed: {},
      messageBus: new MessageBusMock(),
      value: "shouldBeTrue    :      thingy"
    };

    expect(() => new ClassBinding(options)).not.toThrow();
  });
});
