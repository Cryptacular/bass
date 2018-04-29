import Bass from "./Bass";

export interface IMessageBus {
  subscribe(property: string): void;
  publish(property: string, value: any): void;
}

export class MessageBus implements IMessageBus {
  private app: Bass;
  private properties: string[] = [];

  constructor(app: Bass) {
    this.app = app;
  }

  public subscribe(property: string) {
    if (this.properties.indexOf(property) < 0) {
      this.properties.push(property);
    }
  }

  public publish(property: string, value: any) {
    if (this.properties.indexOf(property) >= 0) {
      this.app.notify(property, value);
    }
  }
}
