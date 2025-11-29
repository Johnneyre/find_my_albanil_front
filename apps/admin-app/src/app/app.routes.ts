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
    path: 'admin',
    canActivate: [authGuard],
    children: [
      // TODO: Agregar rutas protegidas del admin (gestión de empresas)
      {
        path: 'companies',
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
