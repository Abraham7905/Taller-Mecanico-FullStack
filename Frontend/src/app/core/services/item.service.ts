import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { Item } from '../models';

export interface CreateItemDto {
  nombre: string;
  descripcion?: string | null;
  estado?: 'activo' | 'inactivo';
}

@Injectable({ providedIn: 'root' })
export class ItemService {
  private ep = 'items';

  constructor(private api: ApiService) {}

  getAll(soloActivos = false): Observable<Item[]> {
    const filters = soloActivos ? { estado: 'activo' } : undefined;
    return this.api.getAll<Item>(this.ep, filters);
  }

  getOne(id: number): Observable<Item> {
    return this.api.getOne<Item>(this.ep, id);
  }

  create(dto: CreateItemDto): Observable<Item> {
    return this.api.create<Item>(this.ep, dto);
  }

  update(id: number, dto: CreateItemDto): Observable<Item> {
    return this.api.update<Item>(this.ep, id, dto);
  }

  toggleEstado(id: number, estado: 'activo' | 'inactivo'): Observable<Item> {
    return this.api.patch<Item>(this.ep, id, { estado });
  }

  delete(id: number): Observable<void> {
    return this.api.delete(this.ep, id);
  }
}