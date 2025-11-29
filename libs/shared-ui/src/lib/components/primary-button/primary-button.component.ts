import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

export type ButtonVariant = 'primary' | 'secondary' | 'outline';
export type ButtonSize = 'small' | 'medium' | 'large';

@Component({
  selector: 'lib-primary-button',
  imports: [CommonModule],
  template: `
    <button
      [type]="type"
      [disabled]="disabled || loading"
      [ngClass]="buttonClasses"
      (click)="handleClick($event)"
    >
      @if (loading) {
        <span>{{ loadingText }}</span>
      } @else {
        <span class="truncate">{{ text }}</span>
      }
    </button>
  `,
  styles: []
})
export class PrimaryButtonComponent {
  @Input() text = '';
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() variant: ButtonVariant = 'primary';
  @Input() size: ButtonSize = 'medium';
  @Input() disabled = false;
  @Input() loading = false;
  @Input() loadingText = 'Cargando...';
  @Input() fullWidth = true;
  
  @Output() clicked = new EventEmitter<Event>();

  handleClick(event: Event): void {
    if (!this.disabled && !this.loading) {
      this.clicked.emit(event);
    }
  }

  get buttonClasses(): string {
    const baseClasses = 'flex items-center justify-center overflow-hidden rounded-lg text-base font-bold shadow-md transition-all focus:outline-none dark:focus:ring-offset-industrial-gray-dark disabled:opacity-50 disabled:cursor-not-allowed';
    
    const widthClass = this.fullWidth ? 'w-full' : '';
    
    const sizeClasses = {
      small: 'h-10 px-4 text-sm',
      medium: 'h-12 px-6',
      large: 'h-14 px-8 text-lg'
    };

    const variantClasses = {
      primary: 'bg-trust-blue text-white hover:bg-trust-blue/90 cursor-pointer',
      secondary: 'bg-gray-200 dark:bg-gray-700 text-industrial-gray-dark dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600 cursor-pointer',
      outline: 'bg-transparent border-2 border-trust-blue text-trust-blue hover:bg-trust-blue hover:text-white cursor-pointer'
    };

    return `${baseClasses} ${widthClass} ${sizeClasses[this.size]} ${variantClasses[this.variant]}`;
  }
}
