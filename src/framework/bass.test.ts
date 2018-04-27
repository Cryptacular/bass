import Bass, { IBassOptions } from "./bass";
import { TextBinding } from "./bindings";
import { MessageBus } from "./MessageBus";

describe("Bass", () => {
  test("exists", () => {
    expect(Bass).toBeDefined();
  });

  test("throws error when null passed to constructor", () => {
    expect(() => new Bass(null)).toThrow();
  });

  test("throws error when undefined passed to constructor", () => {
    expect(() => new Bass(undefined)).toThrow();
  });

  test("throws error when root passed is not valid", () => {
    document.body.innerHTML = `<div id="app"></div>`;

    const options: IBassOptions = {
      root: "somethingThatDoesntExist"
    };

    expect(() => new Bass(options)).toThrow();
  });

  test("component is created when root passed is valid", () => {
    document.body.innerHTML = `<div id="app"></div>`;

    const options: IBassOptions = {
      root: "app"
    };

    const bass = new Bass(options);

    expect(bass).not.toBeUndefined();
    expect(bass).not.toBeNull();
  });

  describe("parseTemplate", () => {
    test("does not throw error", () => {
      document.body.innerHTML = `<div id="app"></div>`;

      const options: IBassOptions = {
        root: "app"
      };

      const bass = new Bass(options);

      expect(() => bass.parseTemplate()).not.toThrow();
    });

    test("finds immediate child nodes with Bass attributes", () => {
      document.body.innerHTML = `<div id="app">
        <span bass-text="this is a test!"></span>
      </div>`;

      const options: IBassOptions = {
        root: "app"
      };

      const bass = new Bass(options);
      bass.parseTemplate();

      const bindings = bass.getBindings();

      expect(bindings.length).toEqual(1);
    });

    test("finds nested child nodes with Bass attributes", () => {
      document.body.innerHTML = `<div id="app">
        <div>
          <span bass-text="this is a test!"></span>
        </div>
      </div>`;

      const options: IBassOptions = {
        root: "app"
      };

      const bass = new Bass(options);
      bass.parseTemplate();

      const bindings = bass.getBindings();

      expect(bindings.length).toEqual(1);
    });
  });

  describe("getRoot", () => {
    test("returns root", () => {
      document.body.innerHTML = `<div id="app"></div>`;

      const options: IBassOptions = {
        root: "app"
      };

      const bass = new Bass(options);

      expect(bass.getRoot()).toEqual(document.getElementById("app"));
    });
  });

  describe("notify", () => {
    it("re-renders all bindings if property exists", () => {
      document.body.innerHTML = `<div id="app"><span bass-text="hello"></span><span bass-class="is-red: isRed"></span></div>`;
      const options: IBassOptions = {
        root: "app",
        properties: { hello: "world", isRed: true }
      };
      const bass = new Bass(options);
      const bindings = bass.getBindings();
      const spies = bindings.map(b => spyOn(b, "render"));

      bass.notify("hello", "Jeremy!");

      expect(spies.length).toBe(2);
      for (const spy of spies) {
        expect(spy).toHaveBeenCalled();
      }
    });

    it("does not re-render all bindings if property doesn't exist", () => {
      document.body.innerHTML = `<div id="app"><span bass-text="hello"></span><span bass-class="is-red: isRed"></span></div>`;
      const options: IBassOptions = {
        root: "app",
        properties: { hello: "world", isRed: true }
      };
      const bass = new Bass(options);
      const bindings = bass.getBindings();
      const spies = bindings.map(b => spyOn(b, "render"));

      bass.notify(
        "something that's not in our properties list!",
        "whatever, dood"
      );

      expect(spies.length).toBe(2);
      for (const spy of spies) {
        expect(spy).not.toHaveBeenCalled();
      }
    });
  });
});
