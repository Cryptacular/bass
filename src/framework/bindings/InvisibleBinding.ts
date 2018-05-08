import { Binding } from "./index";

export class InvisibleBinding extends Binding {
  public render() {
    const property = this.get();
    if (!!property) {
      this.getRoot().style.display = "none";
    } else {
      this.getRoot().style.display = null;
    }
  }
}
