import Bass from "../index";

export const app = new Bass({
  properties: {
    shouldBeRed: true,
    shouldNotBeRed: false
  },
  root: "app"
});
