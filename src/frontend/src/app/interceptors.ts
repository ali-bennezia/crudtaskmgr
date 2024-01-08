import {
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpEvent,
  HTTP_INTERCEPTORS,
  HttpErrorResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable()
class AuthErrorInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService, private router: Router) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      tap((data) => {
        if (
          data instanceof HttpErrorResponse &&
          data.status == 401 &&
          this.authService.isAuthentified()
        ) {
          this.authService.logout();
          this.router.navigate(['signin']);
        }
      })
    );
  }
}

export const interceptorProviders = [
  { provide: HTTP_INTERCEPTORS, multi: true, useClass: AuthErrorInterceptor },
];
