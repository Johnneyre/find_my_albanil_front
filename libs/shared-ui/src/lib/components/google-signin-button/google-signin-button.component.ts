import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lib-google-signin-button',
  imports: [CommonModule],
  template: `
    <button
      type="button"
      (click)="handleClick()"
      class="flex w-full items-center justify-center rounded-lg bg-white dark:bg-industrial-gray h-12 px-6 text-base font-medium text-industrial-gray-dark dark:text-white shadow-md hover:bg-gray-100 dark:hover:bg-industrial-gray-light focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 transition-colors border border-gray-300 dark:border-industrial-gray"
    >
      <svg
        class="mr-3 h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clip-path="url(#clip0_google_btn)">
          <path
            d="M21.5459 10.2273H21V10H12V14H17.5459C17.2727 15.6364 15.9091 18 12 18C8.68182 18 6 15.3182 6 12C6 8.68182 8.68182 6 12 6C13.5 6 14.8182 6.54545 15.8182 7.45455L18.7273 4.54545C16.9091 2.81818 14.6364 2 12 2C6.45455 2 2 6.45455 2 12C2 17.5455 6.45455 22 12 22C17.5455 22 21.6818 17.7273 21.6818 12.2727C21.6818 11.5909 21.6364 10.8636 21.5459 10.2273Z"
            fill="#FFC107"
          ></path>
          <path
            d="M2.95454 7.54545L6.45454 10.0909C7.09091 8.36364 8.81818 7.27273 10.9091 7.27273H10.9545L12.0455 7.22727L12 7.27273C13.4545 7.27273 14.7273 7.77273 15.7727 8.63636L18.6818 5.72727C16.8636 4 14.5909 3.18182 12 3.18182C8.22727 3.18182 4.95454 4.95455 2.95454 7.54545Z"
            fill="#FF3D00"
          ></path>
          <path
            d="M12 22C14.6364 22 16.9091 21.1818 18.7273 19.4545L15.8182 16.5455C14.7727 17.4091 13.5 17.9091 12 17.9091C9.63636 17.9091 7.54545 16.5909 6.77273 14.5909L3.27273 17.0455C5.18182 20 8.36364 22 12 22Z"
            fill="#4CAF50"
          ></path>
          <path
            d="M21.5459 10.2273H21V10H12V14H17.5459C17.3636 15.1818 16.7727 16.1818 15.9091 16.8182L15.8182 16.5455C14.7727 17.4091 13.5 17.9091 12 17.9091C9.63636 17.9091 7.54545 16.5909 6.77273 14.5909L3.27273 17.0455C5.18182 20 8.36364 22 12 22C17.5455 22 21.6818 17.7273 21.6818 12.2727C21.6818 11.5909 21.6364 10.8636 21.5459 10.2273Z"
            fill="#1976D2"
          ></path>
        </g>
        <defs>
          <clipPath id="clip0_google_btn">
            <rect
              fill="white"
              height="20"
              transform="translate(2 2)"
              width="20"
            ></rect>
          </clipPath>
        </defs>
      </svg>
      Iniciar Sesión con Google
    </button>
  `,
  styles: [],
})
export class GoogleSigninButtonComponent {
  @Output() googleSignIn = new EventEmitter<void>();

  handleClick(): void {
    this.googleSignIn.emit();
  }
}
