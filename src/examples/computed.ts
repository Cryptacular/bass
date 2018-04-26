import Bass from "../index";

export const app = new Bass({
  root: "app",
  properties: {
    name: "James"
  },
  computed: {
    hello() {
      return `Hello, ${this.properties.name}`;
    }
  }
});
