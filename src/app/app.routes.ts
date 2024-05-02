import {Routes} from '@angular/router';
import {ConfigComponent} from "./config/config.component";
import {Step1Component} from "./step-1/step-1.component";
import {Step2Component} from "./step-2/step-2.component";
import {Step3Component} from "./step-3/step-3.component";
import {stepGuard} from "./step.guard";

export const routes: Routes = [
  {
    path: '',
    component: ConfigComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'step-1' },
      {
        path: 'step-1',
        component: Step1Component
      },
      {
        path: 'step-2',
        component: Step2Component,
        canActivate: [stepGuard]
      },
      {
        path: 'step-3',
        component: Step3Component,
        canActivate: [stepGuard]
      }
    ]
  },
];
