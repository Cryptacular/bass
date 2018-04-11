export interface IBindingOptions {
  root: HTMLElement;
  value: any;
}

export interface IBinding {
  getRoot(): HTMLElement;
  getValue(): any;
  setValue(value: any): void;
  render(): void;
}

export interface IBindingConstructor {
  new (options: IBindingOptions): IBinding;
}

export class Binding implements IBinding {
  private root: HTMLElement;
  private value: any;

  constructor(options: IBindingOptions) {
    this.root = options.root;
    this.setValue(options.value);
  }

  public getRoot() {
    return this.root;
  }

  public getValue() {
    return this.value;
  }

  public setValue(value: any) {
    this.value = value;
    this.render();
  }

  public render() {
    return;
  }
}
