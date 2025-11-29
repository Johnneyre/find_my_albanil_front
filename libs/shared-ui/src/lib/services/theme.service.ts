import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private readonly THEME_KEY = 'theme';
  private readonly DARK_CLASS = 'dark';
  private readonly LIGHT_CLASS = 'light';

  // Signal para el estado del tema
  isDarkMode = signal<boolean>(false);

  constructor() {
    this.initializeTheme();
  }

  private initializeTheme(): void {
    const savedTheme = localStorage.getItem(this.THEME_KEY);
    const prefersDark = savedTheme === 'dark';
    
    this.isDarkMode.set(prefersDark);
    this.applyTheme(prefersDark);
  }

  toggleTheme(): void {
    const newTheme = !this.isDarkMode();
    this.isDarkMode.set(newTheme);
    this.applyTheme(newTheme);
    localStorage.setItem(this.THEME_KEY, newTheme ? 'dark' : 'light');
  }

  private applyTheme(isDark: boolean): void {
    const htmlElement = document.documentElement;
    
    if (isDark) {
      htmlElement.classList.remove(this.LIGHT_CLASS);
      htmlElement.classList.add(this.DARK_CLASS);
    } else {
      htmlElement.classList.remove(this.DARK_CLASS);
      htmlElement.classList.add(this.LIGHT_CLASS);
    }
  }
}
