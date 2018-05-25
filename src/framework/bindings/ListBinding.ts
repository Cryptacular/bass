import { Binding, IBindingOptions } from "./index";
import Bass from "../Bass";

export class ListBinding extends Binding {
  private apps: Bass[];

  public render() {
    const value = this.value;
    const values = value && value.split(" in ");

    if (!value || !values || values.length < 2) {
      return;
    }

    const itemName = values[0].trim();
    const propertyName = values[1].trim();
    const enumerable = this.getProperties()[propertyName];

    const root = this.getRoot();
    const template = root.innerHTML;
    root.innerHTML = "";

    if (root.id.length === 0) {
      const rootElementId = "bassListRoot" + Math.random();
      root.id = rootElementId;
    }

    enumerable.forEach((e: any, i: number) => {
      let listItemContainer = document.createElement("div");
      listItemContainer.id =
        listItemContainer.id.length > 0
          ? listItemContainer.id
          : "bassListChildRoot" + i;
      listItemContainer.innerHTML = template;

      root.appendChild(listItemContainer);
      const app = new Bass({
        root: listItemContainer.id,
        properties: {
          [itemName]: e
        }
      });

      if (this.apps) {
        this.apps.push(app);
      } else {
        this.apps = [app];
      }
    });
  }
}
