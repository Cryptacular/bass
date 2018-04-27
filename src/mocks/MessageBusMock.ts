import { IMessageBus } from "../framework/MessageBus";

export class MessageBusMock implements IMessageBus {
  public subscribe(property: string) {
    return;
  }
  public publish(property: string, value: any) {
    return;
  }
}
