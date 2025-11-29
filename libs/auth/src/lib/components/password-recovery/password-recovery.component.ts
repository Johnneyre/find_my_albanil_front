import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { createZodControl } from '@find-my-albanil-front/shared-ui';
import { passwordRecoverySchema } from '../../validators/auth-validation.schemas';
import {
  AppLogoComponent,
  ThemeToggleComponent,
  PrimaryButtonComponent,
  InputTextComponent,
} from '@find-my-albanil-front/shared-ui';

@Component({
  selector: 'lib-password-recovery',
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    AppLogoComponent,
    ThemeToggleComponent,
    PrimaryButtonComponent,
    InputTextComponent,
  ],
  templateUrl: './password-recovery.component.html',
  styles: [],
})
export class PasswordRecoveryComponent {
  private fb = inject(FormBuilder);

  recoveryForm: FormGroup;
  isLoading = false;
  successMessage = '';
  errorMessage = '';

  constructor() {
    this.recoveryForm = this.fb.group({
      email: createZodControl(passwordRecoverySchema.shape.email),
    });
  }

  onSubmit(): void {
    if (this.recoveryForm.valid) {
      this.isLoading = true;
      this.errorMessage = '';
      this.successMessage = '';

      // TODO: Implementar servicio de recuperación de contraseña
      console.log('Recovery form submitted:', this.recoveryForm.value);

      // Simulación temporal
      setTimeout(() => {
        this.isLoading = false;
        this.successMessage = '¡Correo enviado! Revisa tu bandeja de entrada.';
      }, 1500);
    } else {
      this.recoveryForm.get('email')?.markAsTouched();
    }
  }

  get email() {
    return this.recoveryForm.get('email');
  }
}
