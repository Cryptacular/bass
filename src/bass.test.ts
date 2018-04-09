import Bass, { IBassOptions } from "../src/bass";

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
});
