import Bass, { IBassOptions } from "./bass";

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

      expect(() => bass.parseTemplate()).not.toThrow;
    });

    test("finds immediate child nodes with Bass attributes", () => {
      document.body.innerHTML = `<div id="app">
        <span bass-test="this is a test!"></span>
      </div>`;

      const options: IBassOptions = {
        root: "app"
      };

      const bass = new Bass(options);
      bass.parseTemplate();

      const boundElements = bass.getBoundElements();

      expect(boundElements.length).toEqual(1);
      expect(boundElements[0]).toEqual(
        document.getElementsByTagName("span")[0]
      );
    });

    test("finds nested child nodes with Bass attributes", () => {
      document.body.innerHTML = `<div id="app">
        <div>
          <span bass-test="this is a test!"></span>
        </div>
      </div>`;

      const options: IBassOptions = {
        root: "app"
      };

      const bass = new Bass(options);
      bass.parseTemplate();

      const boundElements = bass.getBoundElements();

      expect(boundElements.length).toEqual(1);
      expect(boundElements[0]).toEqual(
        document.getElementsByTagName("span")[0]
      );
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

  describe("getBoundElements", () => {
    test("returns empty array when no bound elements", () => {
      document.body.innerHTML = `<div id="app"></div>`;

      const options: IBassOptions = {
        root: "app"
      };

      const bass = new Bass(options);

      expect(bass.getBoundElements()).toEqual([]);
    });

    test("returns array of bound elements", () => {
      document.body.innerHTML = `<div id="app">
        <div>
          <span bass-test="this is a test!"></span>
        </div>
      </div>`;

      const options: IBassOptions = {
        root: "app"
      };

      const bass = new Bass(options);

      expect(bass.getBoundElements()).toEqual(
        Array.from(document.getElementsByTagName("span"))
      );
    });
  });
});
