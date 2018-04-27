import Bass from "./bass";
import { IMessageBus, MessageBus } from "./MessageBus";

let messageBus: IMessageBus;
let app: Bass;

beforeEach(() => {
  document.body.innerHTML = `<div id="app"></div>`;

  app = new Bass({
    root: "app",
    properties: { thingy: "The text of the thingy" },
    computed: {}
  });

  messageBus = new MessageBus(app);
});

describe("MessageBus", () => {
  it("exists", () => {
    expect(MessageBus).toBeDefined();
  });

  describe("publish", () => {
    it("does not publish if property wasn't subscribed to", () => {
      const spy = spyOn(app, "notify");
      messageBus.publish("The Queen of England", false);

      expect(spy).not.toHaveBeenCalled();
    });

    it("publishes message if property has been subscribed to", () => {
      const spy = spyOn(app, "notify");
      messageBus.subscribe("The Queen of England");
      messageBus.publish("The Queen of England", false);

      expect(spy).toHaveBeenCalled();
    });
  });
});
