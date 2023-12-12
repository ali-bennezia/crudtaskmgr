import {
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpEvent,
  HTTP_INTERCEPTORS,
  HttpErrorResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable()
class AuthErrorInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

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
        }
      })
    );
  }
}

export const interceptorProviders = [
  { provide: HTTP_INTERCEPTORS, multi: true, useClass: AuthErrorInterceptor },
];
