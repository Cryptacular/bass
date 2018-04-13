import Bass from "../index";

export const app = new Bass({
  properties: {
    date: () => new Date(),
    hello: "Hello, world!"
  },
  root: "app"
});
