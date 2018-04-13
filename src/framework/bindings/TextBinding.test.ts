import { IBindingOptions, TextBinding } from ".";

describe("Binding", () => {
  it("exists", () => {
    expect(TextBinding).toBeDefined();
  });

  describe("render", () => {
    it("sets innerText on root element", () => {
      const element = document.createElement("div");
      const options: IBindingOptions = {
        root: element,
        properties: { thingy: "The text of the thingy" },
        value: "thingy"
      };
      const binding = new TextBinding(options);

      expect(element.innerText).toBe("The text of the thingy");
    });
  });
});
