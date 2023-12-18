import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

import { of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Component({
  selector: 'app-page-sign-in',
  templateUrl: './page-sign-in.component.html',
  styleUrls: ['./page-sign-in.component.css'],
})
export class PageSignInComponent {
  @ViewChild('signinerr')
  errorElement!: ElementRef;

  private setErrorMsg(msg: string) {
    this.errorElement.nativeElement.innerText = msg;
  }

  public loading: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  signInForm: FormGroup = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(26),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(28),
    ]),
  });

  onSubmit(): void {
    this.loading = true;
    const username: string | undefined = this.signInForm.get('username')?.value;
    const password: string | undefined = this.signInForm.get('password')?.value;
    this.authService
      .login(username ?? '', password ?? '')
      .pipe(
        tap((data) => {
          if (data.success == false) {
            switch (data.status) {
              case 0:
                this.setErrorMsg('Authentication error.');
                break;
              case 403:
                this.setErrorMsg('Invalid credentials.');
                break;
            }
          }
        })
      )
      .subscribe((result) => {
        this.loading = false;
        if (result.success) {
          this.router.navigate(['..', 'tasks']);
        }
      });
  }
}
