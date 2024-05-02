import {Component, OnInit} from '@angular/core';
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatOption} from "@angular/material/autocomplete";
import {MatSelect} from "@angular/material/select";
import {NgOptimizedImage} from "@angular/common";
import {ChoiceModel, ColorModel, ModelModel} from "../models/model.model";
import {ModelService} from "../services/model.service";
import {FormsModule} from "@angular/forms";
import {ConfigService} from "../services/config.service";

@Component({
  selector: 'app-step-1',
  standalone: true,
  imports: [
    MatFormField,
    MatLabel,
    MatOption,
    MatSelect,
    NgOptimizedImage,
    FormsModule
  ],
  templateUrl: './step-1.component.html',
  styleUrl: './step-1.component.scss'
})
export class Step1Component implements OnInit {
  models: ModelModel[] = [];
  colors: ColorModel[] = [];

  filter_model: string = '';
  filter_color: string = '';

  constructor(
    private modelService: ModelService,
    protected configService: ConfigService
  ) {
  }


  ngOnInit(): void {
    // Load models
    this.modelService.getAllModels().subscribe({
        next: (models: ModelModel[]) => {
          this.models = models

          this.loadConfigs();
        },
      }
    );
  }

  /**
   * Load config for the step 1 : model and color
   *  - Get default data if no config available
   *  - Set filters, image.
   */
  loadConfigs() {
    if (!this.configService.choice.pending) {
      // Uncomment to get default ready choice with first API values if desired
      // this.configService.choice.model = this.models[0];
      // this.configService.choice.color = this.models[0].colors[0];
      // this.configService.choice.pending = true;
    } else {
      this.filter_model = this.configService.choice.model.code;
      this.modelSet(this.configService.choice.model, this.configService.choice.color.code);
    }

  }

  /**
   * Action on the model select filter
   *  - Set the chosen model,
   *  - set the color filter,
   *  - reset any config that may already exist.
   */
  selectModel() {
    let foundModel = this.models?.filter((model: ModelModel) => (
        model.code == this.filter_model
      )
    );
    if (typeof foundModel != "undefined") {
      this.modelSet(foundModel[0]);

      // Reset the other steps if a dependant choice has changed
      this.configService.resetChoice();
      this.configService.choice.pending = true;
    }
  }

  /**
   * Set state about the model and its dependencies
   *  - Set the colors filters depending on the model or the current config
   *  - Refresh the img
   *  - Enabling second step
   * @param model ModelModel
   * @param color string ?
   */
  modelSet(model: ModelModel, color?: string) {
    this.configService.choice.model = model;

    // Set colors filter depending on the new model
    this.colors = model.colors;
    // If not color has been sent, set default color when the select model changes
    if (!color) {
      this.configService.choice.color = model.colors[0];
    }
    this.filter_color = this.configService.choice.color.code;

    this.configService.refreshImgSrc();

    // If we want the Step2 to be enabled directly (as on the example video)
    this.configService.toggleStep(2, true);
  }

  /**
   * Action on the color filter select.
   *  - Set the choice with this color
   *  - Refresh the image
   */
  selectColor() {
    let selectColor = this.colors?.filter((color: ColorModel) => (
        color.code == this.filter_color
      )
    );
    if (selectColor) {
      this.configService.choice.color = selectColor[0];
      this.configService.refreshImgSrc();

      // This could be uncommented depending on the desired behaviour : Opening 2nd step before or after a selectChange
      // this.configService.toggleStep(2, true);
    }
  }
}
