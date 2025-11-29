import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export type LogoSize = 'small' | 'medium' | 'large';
export type LogoVariant = 'inline' | 'circle';

@Component({
  selector: 'lib-logo',
  imports: [CommonModule],
  template: `
    <div [ngClass]="containerClasses" class="flex items-center">
      @if (variant === 'circle') {
      <div
        [ngClass]="circleClasses"
        class="flex items-center justify-center rounded-full bg-trust-blue"
      >
        <span
          class="material-symbols-outlined text-white"
          [ngClass]="iconSizeClasses"
          >handyman</span
        >
      </div>
      } @else {
      <span
        class="material-symbols-outlined text-trust-blue"
        [ngClass]="iconSizeClasses"
        >handyman</span
      >
      } @if (showText) {
      <span
        [ngClass]="textSizeClasses"
        class="font-bold text-industrial-gray-dark dark:text-white"
      >
        {{ text }}
      </span>
      }
    </div>
  `,
  styles: [],
})
export class AppLogoComponent {
  @Input() size: LogoSize = 'medium';
  @Input() variant: LogoVariant = 'inline';
  @Input() showText = true;
  @Input() text = 'Find My Builder';

  get containerClasses(): string {
    const gap = {
      small: 'gap-2',
      medium: 'gap-2 md:gap-3',
      large: 'gap-3',
    };
    return gap[this.size];
  }

  get circleClasses(): string {
    const sizes = {
      small: 'h-8 w-8',
      medium: 'h-8 w-8 md:h-10 md:w-10',
      large: 'h-12 w-12',
    };
    return sizes[this.size];
  }

  get iconSizeClasses(): string {
    if (this.variant === 'circle') {
      const sizes = {
        small: 'text-xl',
        medium: 'text-xl md:text-2xl',
        large: 'text-3xl',
      };
      return sizes[this.size];
    } else {
      const sizes = {
        small: 'text-2xl',
        medium: 'text-3xl md:text-4xl',
        large: 'text-4xl md:text-5xl',
      };
      return sizes[this.size];
    }
  }

  get textSizeClasses(): string {
    const sizes = {
      small: 'text-sm md:text-base',
      medium: 'text-base md:text-xl',
      large: 'text-xl md:text-2xl',
    };
    return sizes[this.size];
  }
}
