import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import {
  Servicio,
  ServicioEstado,
  ServicioTipo,
  ServicioItem,
  ServicioExtra
} from '../models';

export interface CreateServicioItemDto {
  item: number;
  cantidad: number;
}

export interface CreateServicioExtraDto {
  nombre: string;
  descripcion?: string | null;
}

export interface CreateServicioDto {
  piloto: number;
  moto: number;
  tipo: ServicioTipo;
  estado?: ServicioEstado;
  horas_servicio?: number;

  items?: CreateServicioItemDto[];

  extras?: CreateServicioExtraDto[];
}

@Injectable({ providedIn: 'root' })
export class ServicioService {

  private ep = 'servicios';

  constructor(private api: ApiService) {}

  getAll(filters?: {
    piloto?: number;
    moto?: number;
    tipo?: string;
    estado?: string;
  }): Observable<Servicio[]> {

    return this.api.getAll<Servicio>(
      this.ep,
      filters as Record<string, string | number>
    );
  }

  getOne(id: number): Observable<Servicio> {
    return this.api.getOne<Servicio>(this.ep, id);
  }

  create(dto: CreateServicioDto): Observable<Servicio> {
    return this.api.create<Servicio>(this.ep, dto);
  }

  update(id: number, dto: Partial<CreateServicioDto>): Observable<Servicio> {
    return this.api.patch<Servicio>(this.ep, id, dto);
  }

  cambiarEstado(id: number, estado: ServicioEstado): Observable<Servicio> {
    return this.api.patch<Servicio>(this.ep, id, { estado });
  }

  delete(id: number): Observable<void> {
    return this.api.delete(this.ep, id);
  }

  // ── Items de reparación ─────────────────────────────

  addItem(
    servicioId: number,
    dto: CreateServicioItemDto
  ): Observable<ServicioItem> {

    return this.api.create<ServicioItem>(
      `${this.ep}/${servicioId}/items`,
      dto
    );
  }

  removeItem(
    servicioId: number,
    itemId: number
  ): Observable<void> {

    return this.api.delete(
      `${this.ep}/${servicioId}/items`,
      itemId
    );
  }

  // ── Extras de alistamiento ─────────────────────────

  addExtra(
    servicioId: number,
    dto: CreateServicioExtraDto
  ): Observable<ServicioExtra> {

    return this.api.create<ServicioExtra>(
      `${this.ep}/${servicioId}/extras`,
      dto
    );
  }

  removeExtra(
    servicioId: number,
    extraId: number
  ): Observable<void> {

    return this.api.delete(
      `${this.ep}/${servicioId}/extras`,
      extraId
    );
  }
}