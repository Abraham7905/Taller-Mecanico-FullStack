import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterLinkActive],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  menuAbierto = false;

  menu = [
    { ruta: '/dashboard',  icono: '📊', label: 'Dashboard'  },
    { ruta: '/pilotos',    icono: '👤', label: 'Pilotos'    },
    { ruta: '/motos',      icono: '🏍️', label: 'Motos'      },
    { ruta: '/servicios',  icono: '🔧', label: 'Servicios'  },
    { ruta: '/inventario', icono: '📦', label: 'Inventario' },
    { ruta: '/usuarios',   icono: '👥', label: 'Usuarios'   },
  ];
item: any;

  constructor(private auth: AuthService) {}

  get usuario() {
    return this.auth.usuario;
  }

  toggleMenu(): void {
    this.menuAbierto = !this.menuAbierto;
  }

  cerrarMenu(): void {
    this.menuAbierto = false;
  }

  logout(): void {
    this.auth.logout();
  }
  get puedeEditar(): boolean {
  return this.auth.puedeEditar();
}

  get isAdmin(): boolean {
    return this.auth.isAdmin();
  }
}