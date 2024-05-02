import {Component, OnInit} from '@angular/core';
import {CurrencyPipe} from "@angular/common";
import {MatCheckbox} from "@angular/material/checkbox";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatOption} from "@angular/material/autocomplete";
import {MatSelect} from "@angular/material/select";
import {ConfigModel, OptionModel} from "../models/options.model";
import {ChoiceModel, ColorModel, ModelModel} from "../models/model.model";
import {OptionsService} from "../services/options.service";
import {ModelService} from "../services/model.service";
import {ConfigService} from "../services/config.service";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-step-2',
  standalone: true,
  imports: [
    CurrencyPipe,
    MatCheckbox,
    MatFormField,
    MatLabel,
    MatOption,
    MatSelect,
    FormsModule
  ],
  templateUrl: './step-2.component.html',
  styleUrl: './step-2.component.scss'
})
export class Step2Component implements OnInit {
  models: ModelModel[] = [];
  colors: ColorModel[] = [];
  option: OptionModel = new OptionModel();

  filter_config: string = '';

  constructor(
    private optionsS: OptionsService,
    protected configService: ConfigService
  ) {
  }

  ngOnInit(): void {
    this.loadConfigs();
  }

  /**
   * Load config if available.
   * Double check with the RouteGuard.
   * Get options and default value.
   */
  loadConfigs() {
    if (this.configService.choice.pending) {
      this.optionsS.get(this.configService.choice.model.code + "").subscribe({
        next: (option: OptionModel) => {
          this.option = option;
          this.filter_config = this.configService.choice.config.id+'';
        }
      })
    }
  }

  /**
   * Action on the config select filter
   *  - Set the choice config part
   *  - Enable third step
   */
  selectConfig() {
    let selectConfig = this.option.configs?.filter((config: ConfigModel) => (
        config.id! + "" == this.filter_config
      )
    );
    if (selectConfig) {
      this.configService.choice.config = selectConfig[0];
      this.configService.toggleStep(3, true);
    }
  }
}
