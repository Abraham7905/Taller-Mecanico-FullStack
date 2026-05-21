import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';
import { SidebarComponent } from './shared/components/sidebar.component';
import { AuthService } from './core/services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, SidebarComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  mostrarSidebar = false;

  constructor(private router: Router, private auth: AuthService) {}

  ngOnInit(): void {
    // Mostrar sidebar solo si no estamos en login
    this.router.events
      .pipe(filter(e => e instanceof NavigationEnd))
      .subscribe((e: any) => {
        this.mostrarSidebar = !e.url.includes('/login') && this.auth.isLoggedIn();
      });

    // Cargar perfil si hay token guardado
    if (this.auth.isLoggedIn()) {
      this.auth.cargarPerfil();
    }
  }
}