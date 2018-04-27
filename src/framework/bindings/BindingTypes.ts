import { ClassBinding } from "./ClassBinding";
import { IBindingConstructor } from "./index";
import { InputBinding } from "./InputBinding";
import { TextBinding } from "./TextBinding";

export interface IBindingTypes {
  [bindingType: string]: IBindingConstructor;
}

export const BindingTypes: IBindingTypes = {
  "bass-class": ClassBinding,
  "bass-text": TextBinding,
  "bass-input": InputBinding
};
