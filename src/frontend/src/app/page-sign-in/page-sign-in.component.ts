import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-page-sign-in',
  templateUrl: './page-sign-in.component.html',
  styleUrls: ['./page-sign-in.component.css'],
})
export class PageSignInComponent {
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
      .subscribe((result) => {
        this.loading = false;
        if (result) {
          this.router.navigate(['..', 'tasks']);
          console.log('Just logged in.');
          console.log(this.authService.isAuthentified);
        }
      });
  }
}
