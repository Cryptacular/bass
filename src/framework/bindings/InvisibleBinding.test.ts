import { IBindingOptions, InvisibleBinding } from ".";
import { MessageBusMock } from "../../mocks";

describe("InvisibleBinding", () => {
  it("exists", () => {
    expect(InvisibleBinding).toBeDefined();
  });

  describe("render", () => {
    it("Adds `display: none;` when property is true", () => {
      const element = document.createElement("div");
      const options: IBindingOptions = {
        root: element,
        properties: { shouldBeTrue: true },
        computed: {},
        messageBus: new MessageBusMock(),
        value: "shouldBeTrue"
      };
      const binding = new InvisibleBinding(options);

      expect(element.style.display).toBe("none");
    });

    it("Does not add `display: none;` when property is false", () => {
      const element = document.createElement("div");
      const options: IBindingOptions = {
        root: element,
        properties: { shouldBeFalse: false },
        computed: {},
        messageBus: new MessageBusMock(),
        value: "shouldBeFalse"
      };
      const binding = new InvisibleBinding(options);

      expect(element.style.display).toBe("");
    });

    it("Adds `display: none;` when property is truthy", () => {
      const element = document.createElement("div");
      const options: IBindingOptions = {
        root: element,
        properties: { shouldBeTruthy: 1 },
        computed: {},
        messageBus: new MessageBusMock(),
        value: "shouldBeTruthy"
      };
      const binding = new InvisibleBinding(options);

      expect(element.style.display).toBe("none");
    });

    it("Does not add `display: none;` when property is falsy", () => {
      const element = document.createElement("div");
      const options: IBindingOptions = {
        root: element,
        properties: { shouldBeFalsy: 0 },
        computed: {},
        messageBus: new MessageBusMock(),
        value: "shouldBeFalsy"
      };
      const binding = new InvisibleBinding(options);

      expect(element.style.display).toBe("");
    });
  });
});
