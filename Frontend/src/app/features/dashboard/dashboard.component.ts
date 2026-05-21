import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ServicioService } from '../../core/services/servicio.service';
import { PilotoService, CreatePilotoDto } from '../../core/services/piloto.service';
import { MotoService, CreateMotoDto } from '../../core/services/moto.service';
import { ItemService } from '../../core/services/item.service';
import { Servicio, Piloto, Moto, Item, ServicioTipo, ServicioEstado } from '../../core/models';

interface DiaBar {
  dia: string;
  cantidad: number;
  porcentaje: number;
}

interface ResultadoBusqueda {
  piloto: Piloto;
  servicios: Servicio[];
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  // ── Stats ──────────────────────────────────
  totalPilotos        = 0;
  serviciosPendientes = 0;
  serviciosEnProceso  = 0;
  serviciosTerminados = 0;
  ultimosServicios: Servicio[] = [];
  pilotos: Piloto[]            = [];
  todosServicios: Servicio[]   = [];
  tendencia: DiaBar[]          = [];

  // ── Buscador ───────────────────────────────
  textoBusqueda                             = '';
  buscando                                  = false;
  resultadoBusqueda: ResultadoBusqueda | null = null;
  sinResultados                             = false;

  // ── Modales ────────────────────────────────
  showModalServicio = false;
  showModalMoto     = false;
  showModalPiloto   = false; // ← AÑADIDO
  motos: Moto[]     = [];
  items: Item[]     = [];
  itemsSeleccionados: { item: number; cantidad: number }[] = [];

  formServicio = {
    moto:           0,
    tipo:           'alistamiento' as ServicioTipo,
    estado:         'pendiente'    as ServicioEstado,
    horas_servicio: 0
  };

  formMoto = {
    placa:     '',
    modelo:    '',
    anio:      new Date().getFullYear(),
    horas_uso: 0
  };

  formPiloto: CreatePilotoDto = { // ← AÑADIDO
    nombre:   '',
    cc:       '',
    telefono: '',
    email:    ''
  };

  constructor(
    private servicioService: ServicioService,
    private pilotoService:   PilotoService,
    private motoService:     MotoService,
    private itemService:     ItemService,
    private cdr:             ChangeDetectorRef
  ) {}

  // ── Lifecycle ──────────────────────────────
  ngOnInit(): void {
    this.cargarDatos();
  }

  // ── Carga inicial ──────────────────────────
cargarDatos(): void {
  this.pilotoService.getAll().subscribe({
    next: (p: Piloto[]) => {
      this.pilotos      = p;
      this.totalPilotos = p.length;
      this.cdr.detectChanges();
    },
    error: err => console.error('Error cargando pilotos', err)
  });

  this.servicioService.getAll().subscribe({
    next: (s: Servicio[]) => {
      this.todosServicios      = [...s];
      this.serviciosPendientes = s.filter(x => x.estado === 'pendiente').length;
      this.serviciosEnProceso  = s.filter(x => x.estado === 'proceso').length;
      this.serviciosTerminados = s.filter(x => x.estado === 'terminado').length;
      this.ultimosServicios    = s.slice(0, 6);
      this.calcularTendencia(s);
      this.cdr.markForCheck();
      this.cdr.detectChanges();
    },
    error: err => console.error('Error cargando servicios', err)
  });
}
  // ── Buscador ───────────────────────────────
  buscar(): void {
    const texto = this.textoBusqueda.trim();
    if (!texto) {
      this.resultadoBusqueda = null;
      this.sinResultados     = false;
      return;
    }

    this.buscando = true;
    this.pilotoService.buscar(texto).subscribe({
      next: (pilotos: Piloto[]) => {
        if (pilotos.length === 0) {
          this.resultadoBusqueda = null;
          this.sinResultados     = true;
          this.buscando          = false;
          this.cdr.detectChanges();
          return;
        }

        const piloto = pilotos[0];
        this.servicioService.getAll({ piloto: piloto.id }).subscribe({
          next: servicios => {
            this.resultadoBusqueda = { piloto, servicios };
            this.sinResultados     = false;
            this.buscando          = false;
            this.cdr.detectChanges();
          }
        });
      },
      error: () => {
        this.buscando = false;
        this.cdr.detectChanges();
      }
    });
  }

  refrescarBusqueda(): void {
    if (!this.resultadoBusqueda) return;
    const piloto = this.resultadoBusqueda.piloto;
    this.servicioService.getAll({ piloto: piloto.id }).subscribe({
      next: servicios => {
        this.resultadoBusqueda = { piloto, servicios };
        this.cdr.detectChanges();
      }
    });
  }

  limpiarBusqueda(): void {
    this.textoBusqueda     = '';
    this.resultadoBusqueda = null;
    this.sinResultados     = false;
  }

  // ── Modal Servicio ─────────────────────────
  abrirModalServicio(): void {
    this.formServicio       = { moto: 0, tipo: 'alistamiento', estado: 'pendiente', horas_servicio: 0 };
    this.itemsSeleccionados = [];

    if (this.resultadoBusqueda) {
      this.motoService.getAll(this.resultadoBusqueda.piloto.id).subscribe(m => {
        this.motos = m;
        this.cdr.detectChanges();
      });
    }

    this.itemService.getAll(true).subscribe(i => {
      this.items = i;
      this.cdr.detectChanges();
    });

    this.showModalServicio = true;
  }

  cerrarModalServicio(): void {
    this.showModalServicio = false;
  }

  guardarServicio(): void {
    if (!this.resultadoBusqueda) return;
    this.servicioService.create({
      piloto:         this.resultadoBusqueda.piloto.id,
      moto:           this.formServicio.moto,
      tipo:           this.formServicio.tipo,
      estado:         this.formServicio.estado,
      horas_servicio: this.formServicio.horas_servicio
    }).subscribe({
      next: (servicio) => {
        if (this.formServicio.tipo === 'reparacion' && this.itemsSeleccionados.length > 0) {
          const peticiones = this.itemsSeleccionados.map(i =>
            this.servicioService.addItem(servicio.id, { item: i.item, cantidad: i.cantidad })
          );
          Promise.all(peticiones.map(p => p.toPromise())).then(() => {
            this.showModalServicio = false;
            setTimeout(() => this.refrescarBusqueda(), 300);
          });
        } else {
          this.showModalServicio = false;
          setTimeout(() => this.refrescarBusqueda(), 300);
        }
      }
    });
  }

  onTipoServicioChange(): void {
    if (this.formServicio.tipo !== 'reparacion') {
      this.itemsSeleccionados = [];
    }
  }

  agregarItem(itemId: number): void {
    if (!itemId) return;
    const existe = this.itemsSeleccionados.find(i => i.item === itemId);
    if (!existe) {
      this.itemsSeleccionados.push({ item: itemId, cantidad: 1 });
    }
  }

  quitarItem(itemId: number): void {
    this.itemsSeleccionados = this.itemsSeleccionados.filter(i => i.item !== itemId);
  }

  getNombreItem(itemId: number): string {
    return this.items.find(i => i.id === itemId)?.nombre ?? String(itemId);
  }

  // ── Modal Moto ─────────────────────────────
  abrirModalMoto(): void {
    this.formMoto      = { placa: '', modelo: '', anio: new Date().getFullYear(), horas_uso: 0 };
    this.showModalMoto = true;
  }

  cerrarModalMoto(): void {
    this.showModalMoto = false;
  }

  guardarMoto(): void {
    if (!this.resultadoBusqueda) return;
    const dto: CreateMotoDto = {
      piloto:    this.resultadoBusqueda.piloto.id,
      placa:     this.formMoto.placa,
      modelo:    this.formMoto.modelo,
      anio:      this.formMoto.anio,
      horas_uso: this.formMoto.horas_uso
    };
    this.motoService.create(dto).subscribe({
      next: () => {
        this.showModalMoto = false;
        setTimeout(() => this.refrescarBusqueda(), 300);
      }
    });
  }

  // ── Modal Piloto ───────────────────────────  ← AÑADIDO
  abrirModalPiloto(): void {
    this.formPiloto      = { nombre: '', cc: '', telefono: '', email: '' };
    this.showModalPiloto = true;
  }

  cerrarModalPiloto(): void {
    this.showModalPiloto = false;
  }

  guardarPiloto(): void {
    this.pilotoService.create(this.formPiloto).subscribe({
      next: (piloto: Piloto) => {
        this.pilotos.push(piloto);
        this.totalPilotos      = this.pilotos.length;
        this.resultadoBusqueda = { piloto, servicios: [] };
        this.sinResultados     = false;
        this.textoBusqueda     = piloto.nombre;
        this.showModalPiloto   = false;
        this.cdr.detectChanges();
      }
    });
  }

  // ── Helpers ────────────────────────────────
  calcularTendencia(servicios: Servicio[]): void {
    const dias = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
    const hoy  = new Date();
    const data: DiaBar[] = [];

    for (let i = 6; i >= 0; i--) {
      const fecha  = new Date(hoy);
      fecha.setDate(hoy.getDate() - i);
      const diaStr   = fecha.toISOString().split('T')[0];
      const cantidad = servicios.filter(s => s.fecha_ingreso.startsWith(diaStr)).length;
      data.push({ dia: dias[fecha.getDay()], cantidad, porcentaje: 0 });
    }

    const max = Math.max(...data.map(d => d.cantidad), 1);
    this.tendencia = data.map(d => ({
      ...d,
      porcentaje: Math.round((d.cantidad / max) * 100)
    }));
  }

  getNombrePiloto(id: number): string {
    return this.pilotos.find(p => Number(p.id) === Number(id))?.nombre ?? 'Piloto';
  }

  getIniciales(nombre: string): string {
    return nombre.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
  }

  getEstadoClase(estado: string): string {
    return estado ?? '';
  }
}