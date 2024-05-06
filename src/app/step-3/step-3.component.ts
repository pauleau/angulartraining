import {Component, OnInit, } from '@angular/core';
import {CurrencyPipe} from "@angular/common";
import {ConfigService} from "../services/config.service";

@Component({
  selector: 'app-step-3',
  standalone: true,
  imports: [
    CurrencyPipe
  ],
  templateUrl: './step-3.component.html',
  styleUrl: './step-3.component.scss'
})
export class Step3Component implements OnInit {
  total: number = 0;

  constructor(
    protected configService: ConfigService
  ) {
  }

  ngOnInit(): void {
    this.getDefaultData();

    this.total = this.configService.choice.color.price
      + (+this.configService.choice.yoke * 1000)
      + (+this.configService.choice.towHitch * 1000)
      + this.configService.choice.config.price;
  }

  getDefaultData() {
    if (!this.configService.choice.pending) {
      this.configService.choice.model.code = 'Y';
      this.configService.choice.model.description = 'Teslaa';
      this.configService.choice.color.code = 'black';
      this.configService.choice.color.description = 'Test';
      this.configService.choice.color.price = 2500;
      this.configService.choice.config.id = 1;
      this.configService.choice.config.description = 'desc';
      this.configService.choice.config.price = 15000;
      this.configService.choice.yoke = true;
    }
  }



}
