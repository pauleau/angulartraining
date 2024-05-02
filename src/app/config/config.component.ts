import {Component, OnInit} from '@angular/core';
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatOption, MatSelect} from "@angular/material/select";
import {FormsModule} from "@angular/forms";
import {CurrencyPipe, NgOptimizedImage} from "@angular/common";
import {MatCheckbox} from "@angular/material/checkbox";
import {RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";
import {ConfigService} from "../services/config.service";
import {ChoiceModel} from "../models/model.model";

@Component({
  selector: 'app-config',
  standalone: true,
  imports: [
    MatFormField,
    MatSelect,
    MatLabel,
    MatOption,
    FormsModule,
    NgOptimizedImage,
    CurrencyPipe,
    MatCheckbox,
    RouterLink,
    RouterOutlet,
    RouterLinkActive
  ],
  templateUrl: './config.component.html',
  styleUrl: './config.component.scss'
})
export class ConfigComponent implements OnInit {
  step2Enabled: boolean = false;
  step3Enabled: boolean = false;

  constructor(
    protected configService: ConfigService,
  ) {
  }

  onStepChanged(componentRef: any) {
    console.log("event : ", componentRef);
  }

  ngOnInit(): void {
    // Listening on the config shared service that will transfer opening step between step and main config component.
    this.configService.sharedVariable$.subscribe(([stepId, toggle]) => {
      switch (stepId) {
        case 2:
          this.step2Enabled = toggle;
          break;
        case 3 :
          this.step3Enabled = toggle;
          break;
      }
    })
  }
}
