export interface IBindingOptions {
  root: HTMLElement;
  properties: IProperties;
  computed: IComputed;
  value: string;
}

export interface IProperties {
  [property: string]: any;
}

export interface IComputed {
  [func: string]: () => void;
}

export interface IBinding {
  getProperties(): IProperties;
  getRoot(): HTMLElement;
  get(): any;
  render(): void;
}

export interface IBindingConstructor {
  new (options: IBindingOptions): IBinding;
}

export class Binding implements IBinding {
  private root: HTMLElement;
  private _value: string;
  private properties: IProperties;
  private computed: IComputed;

  get value(): string {
    return this._value;
  }

  set value(value: string) {
    this._value = value;
    this.render();
  }

  constructor(options: IBindingOptions) {
    this.root = options.root;
    this.properties = options.properties;
    this.computed = options.computed;
    this.value = options.value;
    this.render();
  }

  public getRoot() {
    return this.root;
  }

  public getProperties() {
    return this.properties;
  }

  public get() {
    const property = this.properties[this.value] || this.computed[this.value];

    if (property === null || property === undefined) {
      return this.value;
    }

    if (typeof property === "function") {
      return property.call(this);
    } else {
      return property;
    }
  }

  public render() {
    return;
  }
}
