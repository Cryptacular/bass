export interface IBassOptions {
  root: string;
}

export default class Bass {
  private root: HTMLElement;
  private boundElements: HTMLElement[];

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

  public parseTemplate() {
    const children = Array.from<HTMLElement>(this.root.children);
    const bassChildren = children.filter((c: HTMLElement) => {
      const bassAttributes = Array.from(c.attributes).filter(
        (x: Attr) => x.name.indexOf("bass-") === 0
      );
      return bassAttributes.length > 0;
    });
    this.boundElements = bassChildren;
  }
}
