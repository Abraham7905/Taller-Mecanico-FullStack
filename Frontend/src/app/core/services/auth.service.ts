import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Usuario } from '../models';

interface TokenResponse {
  access: string;
  refresh: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly ACCESS_KEY  = 'taller_access';
  private readonly REFRESH_KEY = 'taller_refresh';

  private _usuario$ = new BehaviorSubject<Usuario | null>(null);
  usuario$ = this._usuario$.asObservable();

  constructor(private http: HttpClient, private router: Router) {}

  login(username: string, password: string): Observable<TokenResponse> {
    return this.http
      .post<TokenResponse>(`${environment.apiUrl}/auth/token/`, { username, password })
      .pipe(
        tap(res => {
          localStorage.setItem(this.ACCESS_KEY,  res.access);
          localStorage.setItem(this.REFRESH_KEY, res.refresh);
          this.cargarPerfil();
        })
      );
  }

  cargarPerfil(): void {
    this.http
      .get<Usuario>(`${environment.apiUrl}/auth/me/`)
      .subscribe({
        next: u => this._usuario$.next(u),
        error: (err) => {
          // Solo hacer logout si es 401, no por otros errores
          if (err.status === 401) {
            this.logout();
          }
        }
      });
  }

  refreshToken(): Observable<TokenResponse> {
    const refresh = localStorage.getItem(this.REFRESH_KEY) ?? '';
    return this.http
      .post<TokenResponse>(`${environment.apiUrl}/auth/token/refresh/`, { refresh })
      .pipe(tap(res => localStorage.setItem(this.ACCESS_KEY, res.access)));
  }

  logout(): void {
    localStorage.removeItem(this.ACCESS_KEY);
    localStorage.removeItem(this.REFRESH_KEY);
    this._usuario$.next(null);
    this.router.navigate(['/login']);
  }

  getAccessToken(): string | null {
    return localStorage.getItem(this.ACCESS_KEY);
  }

  isLoggedIn(): boolean {
    const token = this.getAccessToken();
    if (!token) return false;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const expirado = payload.exp * 1000 < Date.now();
      if (expirado) {
        this.logout();
        return false;
      }
      return true;
    } catch {
      return false;
    }
  }

  get usuario(): Usuario | null {
    return this._usuario$.value;
  }
  isAdmin(): boolean {
  return this.usuario?.rol === 'admin';
}

isMecanico(): boolean {
  return this.usuario?.rol === 'mecanico';
}

isRecepcion(): boolean {
  return this.usuario?.rol === 'recepcion';
}

// Puede crear, editar y eliminar registros
puedeEditar(): boolean {
  return this.usuario?.rol === 'admin' || this.usuario?.rol === 'recepcion';
}

// Puede cambiar estado de servicios
puedeCambiarEstado(): boolean {
  return this.usuario?.rol !== null;
}
}