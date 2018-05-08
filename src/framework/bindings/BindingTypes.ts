import { ClassBinding } from "./ClassBinding";
import { IBindingConstructor } from "./index";
import { InputBinding } from "./InputBinding";
import { InvisibleBinding } from "./InvisibleBinding";
import { TextBinding } from "./TextBinding";
import { VisibleBinding } from "./VisibleBinding";

export interface IBindingTypes {
  [bindingType: string]: IBindingConstructor;
}

export const BindingTypes: IBindingTypes = {
  "bass-class": ClassBinding,
  "bass-text": TextBinding,
  "bass-input": InputBinding,
  "bass-visible": VisibleBinding,
  "bass-invisible": InvisibleBinding
};
