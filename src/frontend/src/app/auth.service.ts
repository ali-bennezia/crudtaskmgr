import { Injectable } from '@angular/core';
import { AuthSession } from './auth-session';
import { AuthLoginData } from './auth-login-data';
import { AuthState } from './auth-state';
import {
  HttpClient,
  HttpErrorResponse,
  HttpEvent,
  HttpResponse,
} from '@angular/common/http';
import backendConfig from './../backend.json';

import { EMPTY, Observable, of } from 'rxjs';
import { tap, catchError, switchMap, filter } from 'rxjs/operators';
import { LoginResult } from './login-result';
import { RegisterResult } from './register-result';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authentified: boolean = false;
  private session: AuthSession | null = null;

  constructor(private http: HttpClient, private cService: CookieService) {}

  fetchAuthState() {
    let storageVal: string | null = localStorage.getItem('authState');
    let state: AuthState | null = storageVal ? JSON.parse(storageVal!) : null;

    if (state && new Date() <= new Date(state!.session?.expires! as string)) {
      this.authentified = state!.authentified;
      this.session = state!.session;
      this.cService.set('Authorization', `Bearer ${this.session?.token}`);
    } else {
      this.authentified = false;
      this.session = null;
      this.cService.delete('Authorization');
    }
  }

  saveAuthState() {
    if (this.authentified) {
      localStorage.setItem(
        'authState',
        JSON.stringify(new AuthState(this.authentified, this.session))
      );
    } else {
      localStorage.removeItem('authState');
    }
  }

  /**
   * Register using given credentials.
   *
   * @param username The username to register with.
   * @param password The password to register with.
   * @param email The email to register with.
   * @returns true if the account was registered with success, false otherwise.
   */
  public register(username: String, password: String, email: String) {
    return this.http
      .post<RegisterResult>(
        `${backendConfig.backendUrl}/api/user/register`,
        {
          username: username,
          password: password,
          email: email,
        },
        { observe: 'response' }
      )
      .pipe(
        switchMap((data) => {
          if (data.status == 201) {
            return of(new RegisterResult(true, data.status));
          } else {
            return of(new RegisterResult(false, data.status));
          }
        }),
        catchError((err) => {
          return of(new RegisterResult(false, err.status));
        })
      );
  }

  /**
   * Logs in using given credentials.
   *
   * @param username The username to authentify with.
   * @param password The password to authentify with.
   * @returns An Observable giving the result as a LoginResult object.
   */
  public login(username: String, password: String): Observable<LoginResult> {
    return this.http
      .post<AuthLoginData>(
        `${backendConfig.backendUrl}/api/user/signin`,
        {
          username: username,
          password: password,
        },
        { observe: 'events' }
      )
      .pipe(
        filter(
          (data) =>
            data instanceof HttpResponse || data instanceof HttpErrorResponse
        ),
        tap({
          next: (data) => {
            if (data instanceof HttpResponse) {
              this.authentified = true;
              this.session = new AuthSession(
                data.body!.token,
                data.body!.username,
                data.body!.expiration
              );
              this.cService.set(
                'Authorization',
                `Bearer ${this.session?.token}`
              );
              this.saveAuthState();
            }
          },
          error: (err) => {
            this.authentified = false;
            this.session = null;
            this.cService.delete('Authorization');
            this.saveAuthState();
          },
        }),
        switchMap((data) => {
          if (data instanceof HttpResponse) {
            return of(new LoginResult(true, data.status));
          } else {
            return of(new LoginResult(false, 0));
          }
        }),
        catchError((err) => {
          return of(new LoginResult(false, err.status));
        })
      );
  }

  /**
   * Logs out.
   */
  public logout() {
    this.authentified = false;
    this.session = null;
    this.cService.delete('Authorization');
    this.saveAuthState();
  }

  /**
   * Returns the current authentication state.
   * @returns Boolean indicating whether the user is currently authentified.
   */
  public isAuthentified(): boolean {
    return this.authentified;
  }

  /**
   * Returns the current authentication session.
   * @returns The current AuthSession or null if there is none.
   */
  public getSession(): AuthSession | null {
    return this.session;
  }
}
