import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ServicioService, CreateServicioDto } from '../../core/services/servicio.service';
import { PilotoService } from '../../core/services/piloto.service';
import { MotoService } from '../../core/services/moto.service';
import { ItemService } from '../../core/services/item.service';
import { Servicio, Piloto, Moto, Item, ServicioEstado } from '../../core/models';
import { AuthService } from '../../core/services/auth.service';

export interface FormServicioItem {
  item:     number;
  cantidad: number;
}

export interface FormServicioExtra {
  nombre:      string;
  descripcion: string;
}

@Component({
  selector:    'app-servicios',
  standalone:  true,
  imports:     [CommonModule, FormsModule],
  templateUrl: './servicios.component.html',
  styleUrls:   ['./servicios.component.scss']
})
export class ServiciosComponent implements OnInit {

  // ── Datos ──────────────────────────────────────────────────────
  servicios:      Servicio[] = [];
  pilotos:        Piloto[]   = [];
  motos:          Moto[]     = [];
  motosFiltradas: Moto[]     = [];
  itemsCatalogo:  Item[]     = [];

  // ── Estado UI ─────────────────────────────────────────────────
  loading              = false;
  showModal            = false;
  editando             = false;
  puedeEditar          = false;
  servicioSeleccionado: Servicio | null = null;
  filtroEstado = '';
  filtroTipo   = '';

  // ── Formulario principal ───────────────────────────────────────
  form: CreateServicioDto = {
    piloto: 0, moto: 0, tipo: 'alistamiento', estado: 'pendiente', horas_servicio: 0
  };

  // ── Filas dinámicas ───────────────────────────────────────────
  formItems:  FormServicioItem[]  = [];
  formExtras: FormServicioExtra[] = [];

  constructor(
    private servicioService: ServicioService,
    private pilotoService:   PilotoService,
    private motoService:     MotoService,
    private itemService:     ItemService,
    private auth:            AuthService,
    private route:           ActivatedRoute,
    private cdr:             ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.puedeEditar = this.auth.puedeEditar();
    this.pilotoService.getAll().subscribe(p => { this.pilotos = p; this.cdr.detectChanges(); });
    this.motoService.getAll().subscribe(m => { this.motos = m; this.cdr.detectChanges(); });
    this.itemService.getAll().subscribe((i: Item[]) => { this.itemsCatalogo = i; this.cdr.detectChanges(); });

    // Leer queryParams del dashboard
    this.route.queryParams.subscribe(params => {
      if (params['estado']) this.filtroEstado = params['estado'];
      if (params['tipo'])   this.filtroTipo   = params['tipo'];
      this.cargarServicios();
    });
  }

  // ── Carga y filtros ───────────────────────────────────────────
  cargarServicios(): void {
    this.loading = true;
    const filters: any = {};
    if (this.filtroEstado) filters.estado = this.filtroEstado;
    if (this.filtroTipo)   filters.tipo   = this.filtroTipo;

    this.servicioService.getAll(filters).subscribe({
      next:  s => { this.servicios = s; this.loading = false; this.cdr.detectChanges(); },
      error: () => { this.loading = false; this.cdr.detectChanges(); }
    });
  }

  // ── Cascada piloto → moto ─────────────────────────────────────
  onPilotoChange(): void {
    this.motosFiltradas = this.motos.filter(m => Number(m.piloto) === Number(this.form.piloto));
    this.form.moto = 0;
  }

  // ── Limpiar filas al cambiar tipo ─────────────────────────────
  onTipoChange(): void {
    this.formItems  = [];
    this.formExtras = [];
  }

  // ── Modal ─────────────────────────────────────────────────────
  abrirModal(servicio?: Servicio): void {
    this.editando             = !!servicio;
    this.servicioSeleccionado = servicio ?? null;

    if (servicio) {
      this.form = {
        piloto:         servicio.piloto,
        moto:           servicio.moto,
        tipo:           servicio.tipo,
        estado:         servicio.estado,
        horas_servicio: servicio.horas_servicio
      };
      this.motosFiltradas = this.motos.filter(m => Number(m.piloto) === Number(servicio.piloto));
      this.formItems  = (servicio.items  ?? []).map(si => ({ item: si.item, cantidad: si.cantidad }));
      this.formExtras = (servicio.extras ?? []).map(e  => ({ nombre: e.nombre, descripcion: e.descripcion ?? '' }));
    } else {
      this.form       = { piloto: 0, moto: 0, tipo: 'alistamiento', estado: 'pendiente', horas_servicio: 0 };
      this.formItems  = [];
      this.formExtras = [];
    }

    this.showModal = true;
  }

  cerrarModal(): void {
    this.showModal            = false;
    this.servicioSeleccionado = null;
    this.formItems            = [];
    this.formExtras           = [];
  }

  // ── Items dinámicos (reparación) ──────────────────────────────
  agregarItem(): void {
    this.formItems.push({ item: 0, cantidad: 1 });
  }

  quitarItem(index: number): void {
    this.formItems.splice(index, 1);
  }

  itemDisponible(itemId: number, indexActual: number): boolean {
    if (!itemId) return true;
    return !this.formItems.some((fi, i) => i !== indexActual && Number(fi.item) === Number(itemId));
  }

  // ── Extras dinámicos (alistamiento) ──────────────────────────
  agregarExtra(): void {
    this.formExtras.push({ nombre: '', descripcion: '' });
  }

  quitarExtra(index: number): void {
    this.formExtras.splice(index, 1);
  }

  // ── Guardar ───────────────────────────────────────────────────
  guardar(): void {
    const payload = this.buildPayload();
    if (this.editando && this.servicioSeleccionado) {
      this.servicioService.update(this.servicioSeleccionado.id, payload).subscribe({
        next: () => { this.cargarServicios(); this.cerrarModal(); }
      });
    } else {
      this.servicioService.create(payload).subscribe({
        next: () => { this.cargarServicios(); this.cerrarModal(); }
      });
    }
  }

  private buildPayload(): CreateServicioDto {
    const base: CreateServicioDto = { ...this.form };
    if (this.form.tipo === 'reparacion') {
      base.items  = this.formItems.filter(fi => fi.item && fi.cantidad > 0).map(fi => ({ item: Number(fi.item), cantidad: fi.cantidad }));
      base.extras = [];
    } else {
      base.extras = this.formExtras.filter(fe => fe.nombre.trim()).map(fe => ({ nombre: fe.nombre.trim(), descripcion: fe.descripcion.trim() }));
      base.items  = [];
    }
    return base;
  }

  // ── Cambio de estado ──────────────────────────────────────────
  cambiarEstado(id: number, estado: ServicioEstado): void {
    this.servicioService.cambiarEstado(id, estado).subscribe({
      next: () => this.cargarServicios()
    });
  }

  // ── Eliminar ──────────────────────────────────────────────────
  eliminar(id: number): void {
    if (confirm('¿Estás seguro de eliminar este servicio?')) {
      this.servicioService.delete(id).subscribe({
        next: () => this.cargarServicios()
      });
    }
  }

  // ── Helpers ───────────────────────────────────────────────────
  getNombrePiloto(id: number): string {
    return this.pilotos.find(p => p.id === id)?.nombre ?? String(id);
  }

  getNombreMoto(id: number): string {
    const m = this.motos.find(m => m.id === id);
    return m ? `${m.modelo} (${m.anio})` : String(id);
  }

  getNombreItem(id: number): string {
    return this.itemsCatalogo.find(i => i.id === id)?.nombre ?? String(id);
  }
}