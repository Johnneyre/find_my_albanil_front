import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'lib-theme-toggle',
  imports: [CommonModule],
  template: `
    <button
      (click)="toggleTheme()"
      class="flex h-10 w-10 items-center justify-center rounded-full bg-industrial-gray-light/10 dark:bg-white/10 hover:bg-industrial-gray-light/20 dark:hover:bg-white/20 transition-colors"
      [attr.aria-label]="
        themeService.isDarkMode()
          ? 'Cambiar a modo claro'
          : 'Cambiar a modo oscuro'
      "
    >
      <span
        class="material-symbols-outlined text-industrial-gray-dark dark:text-white"
      >
        {{ themeService.isDarkMode() ? 'light_mode' : 'dark_mode' }}
      </span>
    </button>
  `,
  styles: [],
})
export class ThemeToggleComponent {
  themeService = inject(ThemeService);

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }
}
