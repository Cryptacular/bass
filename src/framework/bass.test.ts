import Bass, { IBassOptions } from "./bass";
import { TextBinding } from "./bindings";

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
});
