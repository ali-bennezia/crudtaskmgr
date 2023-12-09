import { Injectable, OnInit, OnDestroy, HostListener } from '@angular/core';
import { AuthSession } from './auth-session';
import { AuthLoginData } from './auth-login-data';
import { AuthState } from './auth-state';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import backendConfig from './../backend.json';

import { Observable, of } from 'rxjs';
import { tap, catchError, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService implements OnInit, OnDestroy {
  private authentified: boolean = false;
  private session: AuthSession | null = null;

  constructor(private http: HttpClient) {}

  fetchAuthState() {
    let storageVal: string | null = localStorage.getItem('authState');
    let state: AuthState | null = storageVal ? JSON.parse(storageVal!) : null;

    if (state && new Date() <= state!.session?.expires!) {
      this.authentified = state!.authentified;
      this.session = state!.session;
    } else {
      this.authentified = false;
      this.session = null;
    }
  }

  saveAuthState() {
    localStorage.setItem(
      'authState',
      JSON.stringify(new AuthState(this.authentified, this.session))
    );
  }

  ngOnInit(): void {
    this.fetchAuthState();
  }

  ngOnDestroy(): void {
    this.saveAuthState();
  }

  @HostListener('window:beforeunload', ['$event'])
  onUnload() {
    this.saveAuthState();
  }

  /**
   * Logs in using given credentials.
   *
   * @param username The username to authentify.
   * @param password The password to authentify.
   * @returns true if the authentification is successful, false otherwise.
   */
  public login(username: String, password: String): Observable<boolean> {
    return this.http
      .post<AuthLoginData>(`${backendConfig.backendUrl}/api/user/signin`, {
        username: username,
        password: password,
      })
      .pipe(
        tap({
          next: (data) => {
            this.authentified = true;
            this.session = new AuthSession(
              data.token,
              data.username,
              data.expiration
            );
          },
          error: (err) => {
            this.authentified = false;
            this.session = null;
          },
        }),
        switchMap((data) => {
          if (data instanceof HttpErrorResponse) {
            return of(false);
          } else {
            return of(true);
          }
        }),
        catchError((err) => {
          return of(false);
        })
      );
  }

  /**
   * Logs out.
   */
  public logout() {
    this.authentified = false;
    this.session = null;
  }

  /**
   * Returns the current authentification state.
   * @returns Boolean indicating whether the user is currently authentified.
   */
  public isAuthentified(): boolean {
    return this.authentified;
  }
}
