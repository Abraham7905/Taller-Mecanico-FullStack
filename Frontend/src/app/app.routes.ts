import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { RoleGuard } from './core/guards/role.guards';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./features/auth/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'dashboard',
    canActivate: [AuthGuard],
    loadComponent: () =>
      import('./features/dashboard/dashboard.component').then(m => m.DashboardComponent)
  },
  {
    path: 'pilotos',
    canActivate: [AuthGuard],
    loadComponent: () =>
      import('./features/pilotos/pilotos.component').then(m => m.PilotosComponent)
  },
  {
    path: 'motos',
    canActivate: [AuthGuard],
    loadComponent: () =>
      import('./features/motos/motos.component').then(m => m.MotosComponent)
  },
  {
    path: 'servicios',
    canActivate: [AuthGuard],
    loadComponent: () =>
      import('./features/servicios/servicios.component').then(m => m.ServiciosComponent)
  },
  {
    path: 'inventario',
    canActivate: [AuthGuard],
    loadComponent: () =>
      import('./features/inventario/inventario.component').then(m => m.InventarioComponent)
  },
 {
  path: 'usuarios',
  canActivate: [AuthGuard, RoleGuard],
  loadComponent: () =>
    import('./features/usuarios/usuarios.component').then(m => m.UsuariosComponent)
},
  {
    path: 'historial',
    canActivate: [AuthGuard],
    loadComponent: () =>
      import('./features/historial/historial.component').then(m => m.HistorialComponent)
  },
  {
    path: '**',
    redirectTo: 'dashboard'
  }
];