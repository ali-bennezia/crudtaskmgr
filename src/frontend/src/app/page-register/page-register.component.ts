import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-page-register',
  templateUrl: './page-register.component.html',
  styleUrls: ['./page-register.component.css'],
})
export class PageRegisterComponent {
  constructor(private authService: AuthService, private router: Router) {}

  @ViewChild('signinerr', { static: true })
  private errorElement!: ElementRef;

  registerForm: FormGroup = new FormGroup({
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
    email: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(28),
    ]),
  });

  onSubmit(): void {
    this.loading = true;
    const username: string = this.registerForm.get('username')?.value ?? '';
    const password: string = this.registerForm.get('password')?.value ?? '';
    const email: string = this.registerForm.get('email')?.value ?? '';
    this.authService.register(username, email, password).subscribe((result) => {
      this.loading = false;
      if (result.success) {
        const extras: NavigationExtras = { queryParams: { success: true } };
        this.router.navigate(['..', 'signin'], extras);
      } else {
      }
    });
  }

  loading: boolean = false;
}
