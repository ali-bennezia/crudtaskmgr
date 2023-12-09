import {
  CanActivateFn,
  UrlTree,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { inject } from '@angular/core';

import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

export const authOnlyGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
):
  | boolean
  | UrlTree
  | Observable<boolean | UrlTree>
  | Promise<boolean | UrlTree> => {
  const authService: AuthService = inject(AuthService);
  return authService.isAuthentified();
};

export const anonOnlyGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
):
  | boolean
  | UrlTree
  | Observable<boolean | UrlTree>
  | Promise<boolean | UrlTree> => {
  const authService: AuthService = inject(AuthService);
  return !authService.isAuthentified();
};
