import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { Usuario, UsuarioRol } from '../models';

export interface CreateUsuarioDto {
  username: string;
  email: string;
  password: string;
  first_name?: string;
  last_name?: string;
  rol: UsuarioRol;
}

@Injectable({ providedIn: 'root' })
export class UsuarioService {
  private ep = 'usuarios';

  constructor(private api: ApiService) {}

  getAll(): Observable<Usuario[]> {
    return this.api.getAll<Usuario>(this.ep);
  }

  getOne(id: number): Observable<Usuario> {
    return this.api.getOne<Usuario>(this.ep, id);
  }

  create(dto: CreateUsuarioDto): Observable<Usuario> {
    return this.api.create<Usuario>(this.ep, dto);
  }

  update(id: number, dto: Partial<CreateUsuarioDto>): Observable<Usuario> {
    return this.api.patch<Usuario>(this.ep, id, dto);
  }

  toggleActivo(id: number, is_active: boolean): Observable<Usuario> {
    return this.api.patch<Usuario>(this.ep, id, { is_active });
  }

  delete(id: number): Observable<void> {
    return this.api.delete(this.ep, id);
  }
}