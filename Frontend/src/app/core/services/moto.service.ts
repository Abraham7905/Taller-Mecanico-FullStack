import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { Moto } from '../models';

export interface CreateMotoDto {
  piloto: number;
  placa?: string | null;
  modelo: string;
  anio: number;
  horas_uso?: number;
}

@Injectable({ providedIn: 'root' })
export class MotoService {
  private ep = 'motos';

  constructor(private api: ApiService) {}

  getAll(pilotoId?: number): Observable<Moto[]> {
    const filters = pilotoId ? { piloto: pilotoId } : undefined;
    return this.api.getAll<Moto>(this.ep, filters);
  }

  getOne(id: number): Observable<Moto> {
    return this.api.getOne<Moto>(this.ep, id);
  }

  create(dto: CreateMotoDto): Observable<Moto> {
    return this.api.create<Moto>(this.ep, dto);
  }

  update(id: number, dto: CreateMotoDto): Observable<Moto> {
    return this.api.update<Moto>(this.ep, id, dto);
  }

  delete(id: number): Observable<void> {
    return this.api.delete(this.ep, id);
  }
}