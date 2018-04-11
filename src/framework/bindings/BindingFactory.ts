import { BindingTypes, IBinding, IBindingOptions } from "./index";

export const BindingFactory = {
  getBinding: (binding: string, options: IBindingOptions): IBinding => {
    const Binding = BindingTypes[binding];
    if (Binding) {
      return new Binding(options);
    }
    throw new Error(
      `Binding does not exist: ${binding} in ${JSON.stringify(BindingTypes)}`
    );
  }
};
