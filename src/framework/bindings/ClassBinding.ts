import { Binding } from "./index";

export class ClassBinding extends Binding {
  public render() {
    const value = this.value;
    const values = value && value.split(":");

    if (!value || !values || values.length < 2) {
      return;
    }

    const className = values[0].trim();
    const property = values[1].trim();
    const bool = this.getProperties()[property];

    const root = this.getRoot();
    const rootHasClass = root.classList.contains(className);

    if (bool) {
      if (!rootHasClass) {
        root.classList.add(className);
      }
    } else {
      if (rootHasClass) {
        root.classList.remove(className);
      }
    }
  }
}
