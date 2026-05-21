import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ServicioService } from '../../core/services/servicio.service';
import { Servicio, ServicioEstado } from '../../core/models';

interface CambioEstado {
  servicioId: number;
  piloto: string;
  moto: string;
  tipo: string;
  estadoAnterior: ServicioEstado | '—';
  estadoNuevo: ServicioEstado;
  fecha: string;
}

@Component({
  selector: 'app-historial',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.scss']
})
export class HistorialComponent implements OnInit {
  historial: CambioEstado[] = [];
  historialFiltrado: CambioEstado[] = [];
  loading  = false;
  filtroEstado = '';
  filtroTipo   = '';
  busqueda     = '';

  constructor(
    private servicioService: ServicioService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void { this.cargarHistorial(); }

  cargarHistorial(): void {
    this.loading = true;
    this.servicioService.getAll().subscribe({
      next: servicios => {
        this.historial = this.generarHistorial(servicios);
        this.aplicarFiltros();
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: () => { this.loading = false; this.cdr.detectChanges(); }
    });
  }

  generarHistorial(servicios: Servicio[]): CambioEstado[] {
    const cambios: CambioEstado[] = [];
    servicios.forEach(s => {
      cambios.push({
        servicioId: s.id, piloto: s.piloto_nombre ?? `Piloto #${s.piloto}`,
        moto: s.moto_modelo ?? `Moto #${s.moto}`, tipo: s.tipo,
        estadoAnterior: '—', estadoNuevo: 'pendiente', fecha: s.fecha_ingreso
      });
      if (s.estado === 'proceso' || s.estado === 'terminado') {
        cambios.push({
          servicioId: s.id, piloto: s.piloto_nombre ?? `Piloto #${s.piloto}`,
          moto: s.moto_modelo ?? `Moto #${s.moto}`, tipo: s.tipo,
          estadoAnterior: 'pendiente', estadoNuevo: 'proceso', fecha: s.fecha_ingreso
        });
      }
      if (s.estado === 'terminado') {
        cambios.push({
          servicioId: s.id, piloto: s.piloto_nombre ?? `Piloto #${s.piloto}`,
          moto: s.moto_modelo ?? `Moto #${s.moto}`, tipo: s.tipo,
          estadoAnterior: 'proceso', estadoNuevo: 'terminado', fecha: s.fecha_ingreso
        });
      }
    });
    return cambios.reverse();
  }

  aplicarFiltros(): void {
    this.historialFiltrado = this.historial.filter(h => {
      const matchEstado = this.filtroEstado ? h.estadoNuevo === this.filtroEstado : true;
      const matchTipo   = this.filtroTipo   ? h.tipo        === this.filtroTipo   : true;
      const matchBusq   = this.busqueda
        ? h.piloto.toLowerCase().includes(this.busqueda.toLowerCase()) ||
          h.moto.toLowerCase().includes(this.busqueda.toLowerCase())
        : true;
      return matchEstado && matchTipo && matchBusq;
    });
    this.cdr.detectChanges();
  }
}