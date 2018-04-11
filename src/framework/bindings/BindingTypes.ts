import { IBindingConstructor } from "./index";
import { TextBinding } from "./TextBinding";

export interface IBindingTypes {
  [bindingType: string]: IBindingConstructor;
}

export const BindingTypes: IBindingTypes = {
  "bass-text": TextBinding
};
