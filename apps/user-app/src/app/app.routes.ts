import { Route } from '@angular/router';
import {
  LoginComponent,
  PasswordRecoveryComponent,
  authGuard,
} from '@find-my-albanil-front/auth';

export const appRoutes: Route[] = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'password-recovery',
    component: PasswordRecoveryComponent,
  },
  {
    path: 'user',
    canActivate: [authGuard],
    children: [
      // TODO: Agregar rutas protegidas del usuario
      {
        path: 'dashboard',
        loadComponent: () => import('./nx-welcome').then((m) => m.default),
      },
    ],
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
];
