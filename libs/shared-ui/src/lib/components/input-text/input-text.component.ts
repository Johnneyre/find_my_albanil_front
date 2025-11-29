import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ControlValueAccessor,
  NgControl,
  ReactiveFormsModule,
} from '@angular/forms';

export type InputType =
  | 'text'
  | 'email'
  | 'password'
  | 'tel'
  | 'number'
  | 'url';

@Component({
  selector: 'lib-input-text',
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="flex flex-col w-full">
      <!-- Label -->
      <label
        [for]="inputId"
        class="mb-2 text-sm font-medium text-industrial-gray-dark dark:text-gray-200"
      >
        {{ label }}
        @if (required) {
        <span class="text-red-500">*</span>
        }
      </label>

      <!-- Input Container -->
      <div
        class="flex w-full flex-1 items-stretch rounded-lg border dark:border-industrial-gray bg-white dark:bg-industrial-gray-dark focus-within:ring-2 focus-within:ring-trust-blue focus-within:ring-opacity-50"
        [class.border-gray-300]="!showError"
        [class.border-red-500]="showError"
        [class.dark:border-red-500]="showError"
      >
        <!-- Icon (opcional) -->
        @if (icon) {
        <div
          class="text-industrial-gray-light dark:text-gray-400 flex items-center justify-center pl-3.5 pr-2"
        >
          <span class="material-symbols-outlined">{{ icon }}</span>
        </div>
        }

        <!-- Input Field -->
        <input
          [id]="inputId"
          [type]="type"
          [placeholder]="placeholder"
          [disabled]="disabled"
          [value]="value"
          (input)="onInputChange($event)"
          (blur)="onTouched()"
          (keypress)="onKeyPress($event)"
          (paste)="onPaste($event)"
          class="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden text-industrial-gray-dark dark:text-white focus:outline-0 bg-transparent h-12 placeholder:text-industrial-gray-light dark:placeholder:text-gray-500 p-3 text-base font-normal leading-normal border-0"
          [class.pl-0]="icon"
          [attr.aria-invalid]="showError"
          [attr.aria-describedby]="showError ? inputId + '-error' : null"
        />
      </div>

      <!-- Error Message -->
      @if (showError && resolvedErrorMessage) {
      <span
        [id]="inputId + '-error'"
        class="text-red-500 text-sm mt-1"
        role="alert"
      >
        {{ resolvedErrorMessage }}
      </span>
      }
    </div>
  `,
  styles: [],
})
export class InputTextComponent implements ControlValueAccessor {
  @Input() label = '';
  @Input() type: InputType = 'text';
  @Input() placeholder = '';
  @Input() icon?: string;
  @Input() required = false;
  @Input() errorMessage?: string;
  @Input() allowedPattern?: RegExp;
  @Input() pasteValidator?: (text: string) => boolean;

  value = '';
  disabled = false;
  inputId = `input-${Math.random().toString(36).substring(7)}`;

  ngControl = inject(NgControl, { optional: true, self: true });

  constructor() {
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
  }

  get showError(): boolean {
    if (!this.ngControl) {
      return false;
    }
    return !!(
      this.ngControl.invalid &&
      (this.ngControl.dirty || this.ngControl.touched)
    );
  }

  get resolvedErrorMessage(): string | null {
    if (this.errorMessage) {
      return this.errorMessage;
    }
    if (this.ngControl && this.ngControl.errors) {
      const errorKey = Object.keys(this.ngControl.errors)[0];
      return this.ngControl.errors[errorKey] || null;
    }
    return null;
  }

  // ControlValueAccessor callbacks
  private onChange: (value: string) => void = () => {
    // Placeholder for ControlValueAccessor
  };
  onTouched: () => void = () => {
    // Placeholder for ControlValueAccessor
  };

  /**
   * Escribe un valor en el input (desde el FormControl)
   */
  writeValue(value: string): void {
    this.value = value || '';
  }

  /**
   * Registra callback cuando el valor cambia
   */
  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  /**
   * Registra callback cuando el input es tocado
   */
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  /**
   * Habilita/deshabilita el input
   */
  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  /**
   * Maneja cambios en el input
   */
  onInputChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.value = input.value;
    this.onChange(this.value);
  }

  /**
   * Valida teclas presionadas según patrón permitido
   */
  onKeyPress(event: KeyboardEvent): void {
    if (this.allowedPattern && event.key && event.key.length === 1) {
      if (!this.allowedPattern.test(event.key)) {
        event.preventDefault();
      }
    }
  }

  /**
   * Valida contenido pegado
   */
  onPaste(event: ClipboardEvent): void {
    if (this.pasteValidator) {
      const pastedText = event.clipboardData?.getData('text') || '';
      if (!this.pasteValidator(pastedText)) {
        event.preventDefault();
      }
    }
  }
}
