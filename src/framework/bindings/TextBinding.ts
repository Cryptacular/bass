import { Binding, IBindingOptions } from "./Binding";

export class TextBinding extends Binding {
  public render() {
    this.getRoot().innerText = this.getValue();
  }
}
