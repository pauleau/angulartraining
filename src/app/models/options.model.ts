export class OptionModel {
  configs: ConfigModel[] = [];
  towHitch: boolean = false;
  yoke: boolean = false;
}

export class ConfigModel {
  id: number = 0;
  description: string = '';
  range: number = 0;
  speed: string = '';
  price: number = 0;
}
