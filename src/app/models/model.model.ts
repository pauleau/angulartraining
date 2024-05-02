import {ConfigModel, OptionModel} from "./options.model";
import {SIGNAL} from "@angular/core/primitives/signals";

export class ModelModel {
  code: string = '';
  description: string = '';
  colors: ColorModel[] = [];
}

export class ColorModel {
  code: string = '';
  description: string = '';
  price: number = 0;
}

export class ChoiceModel {
  model: ModelModel = new ModelModel();
  color: ColorModel = new ColorModel();
  config: ConfigModel = new ConfigModel();
  towHitch: boolean = false;
  yoke: boolean = false;

  pending: boolean = false;

  constructor() {
  }
}
