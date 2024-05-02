import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {ChoiceModel} from "../models/model.model";
import {ConfigModel} from "../models/options.model";

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private stepOpen = new BehaviorSubject<[number, boolean]>([0, false])
  sharedVariable$: Observable<any> = this.stepOpen.asObservable();

  choice: ChoiceModel = new ChoiceModel();
  car_src?: string;

  readonly cars_src: string = "https://interstate21.com/tesla-app/images/";

  constructor() {
  }

  toggleStep(stepId: number, toggle: boolean) {
    this.stepOpen.next([stepId, toggle]);
  }

  refreshImgSrc() {
    this.car_src = this.cars_src + this.choice.model.code + '/' + this.choice.color.code + '.jpg';
  }

  /**
   * Reset the existing choice when step 1 data change.
   * Steps 2 and 3 depend on step 1
   */
  resetChoice() {
    this.choice.config = new ConfigModel();
    this.choice.yoke = false;
    this.choice.towHitch = false;
    // If the config (step 2) changed, we need to close the 3rd step.
    this.toggleStep(3, false);
  }
}
