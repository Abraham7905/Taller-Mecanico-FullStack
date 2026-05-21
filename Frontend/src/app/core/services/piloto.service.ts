import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { Piloto } from '../models';

export interface CreatePilotoDto {
  nombre: string;
  cc?: string | null;
  telefono: string;
  email?: string | null;
}

@Injectable({ providedIn: 'root' })
export class PilotoService {
  private ep = 'pilotos';

  constructor(private api: ApiService) {}

  getAll(): Observable<Piloto[]> {
    return this.api.getAll<Piloto>(this.ep);
  }

  getOne(id: number): Observable<Piloto> {
    return this.api.getOne<Piloto>(this.ep, id);
  }

  create(dto: CreatePilotoDto): Observable<Piloto> {
    return this.api.create<Piloto>(this.ep, dto);
  }

  update(id: number, dto: CreatePilotoDto): Observable<Piloto> {
    return this.api.update<Piloto>(this.ep, id, dto);
  }

  delete(id: number): Observable<void> {
    return this.api.delete(this.ep, id);
  }

  buscar(texto: string): Observable<Piloto[]> {
  return this.api.getAll<Piloto>(this.ep, { search: texto }) as Observable<Piloto[]>;
}
}