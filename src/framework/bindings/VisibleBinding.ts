import { Binding } from "./index";

export class VisibleBinding extends Binding {
  public render() {
    const property = this.get();
    if (!!property) {
      this.getRoot().style.display = null;
    } else {
      this.getRoot().style.display = "none";
    }
  }
}
