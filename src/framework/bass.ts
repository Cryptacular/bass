import { BindingFactory, IBinding } from "./bindings/index";

export interface IBassOptions {
  root: string;
}

export default class Bass {
  private root: HTMLElement;
  private bindings: IBinding[];

  constructor(options: IBassOptions) {
    if (!options || !options.root || options.root.length <= 0) {
      throw new Error("Argument must be a valid `options` object");
    }

    const root = document.getElementById(options.root);
    if (root === null) {
      throw new Error("Root element could not be found on the page");
    }
    this.root = root;
    this.parseTemplate();
  }

  public getRoot(): HTMLElement {
    return this.root;
  }

  public getBindings(): IBinding[] {
    return this.bindings;
  }

  public parseTemplate() {
    const children = this.getBassChildren(Array.from(this.root.children));
    const bassChildren = children.filter((c: HTMLElement) => {
      const bassAttributes = Array.from(c.attributes).filter(
        (x: Attr) => x.name.indexOf("bass-") === 0
      );
      return bassAttributes.length > 0;
    });
    this.parseBindings(bassChildren);
  }

  private parseBindings(elements: HTMLElement[]) {
    const bindings: IBinding[] = [];
    elements.forEach(e => {
      const bassAttributes = Array.from<Attr>(e.attributes).filter(
        (x: Attr) => x.name.indexOf("bass-") === 0
      );
      bassAttributes.forEach(a => {
        bindings.push(
          BindingFactory.getBinding(a.name, { root: e, value: a.value })
        );
      });
    });

    this.bindings = bindings;
  }

  private getBassChildren(elements: HTMLElement[]): HTMLElement[] {
    const out: HTMLElement[] = [];
    elements.forEach(e => {
      const add = e.hasChildNodes()
        ? this.getBassChildren(Array.from(e.children))
        : [e];
      out.push(...add);
    });
    return out;
  }
}
