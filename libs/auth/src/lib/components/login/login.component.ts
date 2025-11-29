import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { createZodControl } from '@find-my-albanil-front/shared-ui';
import { loginSchema } from '../../validators/auth-validation.schemas';
import {
  AppLogoComponent,
  ThemeToggleComponent,
  PrimaryButtonComponent,
  GoogleSigninButtonComponent,
  InputTextComponent,
} from '@find-my-albanil-front/shared-ui';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'lib-login',
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    AppLogoComponent,
    ThemeToggleComponent,
    PrimaryButtonComponent,
    GoogleSigninButtonComponent,
    InputTextComponent,
  ],
  templateUrl: './login.component.html',
  styles: [],
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  loginForm: FormGroup;
  isLoading = false;
  errorMessage = '';

  constructor() {
    this.loginForm = this.fb.group({
      email: createZodControl(loginSchema.shape.email),
      password: createZodControl(loginSchema.shape.password),
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.errorMessage = '';

      this.authService.login(this.loginForm.value).subscribe({
        next: (response) => {
          console.log('Login successful:', response);
          // Redirigir a la página de usuario por defecto
          this.router.navigate(['/user/dashboard']);
        },
        error: (error) => {
          console.error('Login error:', error);
          this.errorMessage =
            'Credenciales inválidas. Por favor, intenta de nuevo.';
          this.isLoading = false;
        },
        complete: () => {
          this.isLoading = false;
        },
      });
    } else {
      Object.keys(this.loginForm.controls).forEach((key) => {
        this.loginForm.get(key)?.markAsTouched();
      });
    }
  }

  onGoogleSignIn(): void {
    console.log('Google Sign-In clicked');
    // TODO: Implementar autenticación con Google
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }
}
