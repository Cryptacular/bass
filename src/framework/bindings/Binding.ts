export interface IBindingOptions {
  root: HTMLElement;
  properties: IProperties;
  value: string;
}

export interface IProperties {
  [property: string]: any;
}

export interface IBinding {
  getRoot(): HTMLElement;
  get(): any;
  render(): void;
}

export interface IBindingConstructor {
  new (options: IBindingOptions): IBinding;
}

export class Binding implements IBinding {
  private root: HTMLElement;
  private value: string;
  private properties: IProperties;

  constructor(options: IBindingOptions) {
    this.root = options.root;
    this.properties = options.properties;
    this.value = options.value;
    this.render();
  }

  public getRoot() {
    return this.root;
  }

  public get() {
    const property = this.properties[this.value];

    if (property === null || property === undefined) {
      return null;
    }

    if (typeof property === "function") {
      return property();
    } else {
      return property;
    }
  }

  public render() {
    return;
  }
}
