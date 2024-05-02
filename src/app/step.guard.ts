import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {ConfigService} from "./services/config.service";

export const stepGuard: CanActivateFn = (route, state) => {
  const configService = inject(ConfigService)
  const router = inject(Router);

  if (route.routeConfig?.path === 'step-2') {
    return (configService.choice.color.code !== '') || router.parseUrl('/step-1');
  }
  else if ((route.routeConfig?.path === 'step-3')) {
    return (configService.choice.config.id !== 0) || router.parseUrl('/step-1');
  }

  return true;
};
