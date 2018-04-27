import { Binding, IBindingOptions } from "./Binding";

export class InputBinding extends Binding {
  constructor(options: IBindingOptions) {
    super(options);
    this.getRoot().addEventListener("change", this.onChange.bind(this));
    this.getRoot().addEventListener("keypress", this.onChange.bind(this));
    this.getRoot().addEventListener("paste", this.onChange.bind(this));
    this.getRoot().addEventListener("input", this.onChange.bind(this));
  }

  public render() {
    const root = this.getRoot();
    if ((root.constructor as any).name !== "HTMLInputElement") {
      return;
    }

    const input = this.getRoot() as HTMLInputElement;
    const value = this.get();

    if (input.value !== value) {
      input.value = value;
    }
  }

  public onChange(e: Event) {
    this.setProperty(this.value, (e.target as HTMLInputElement).value);
  }
}
