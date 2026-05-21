import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MotoService, CreateMotoDto } from '../../core/services/moto.service';
import { PilotoService } from '../../core/services/piloto.service';
import { Moto, Piloto } from '../../core/models';
import { AuthService } from '../../core/services/auth.service'; // ← añadir

@Component({
  selector: 'app-motos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './motos.component.html',
  styleUrls: ['./motos.component.scss']
})
export class MotosComponent implements OnInit {
  motos: Moto[]     = [];
  pilotos: Piloto[] = [];
  loading           = false;
  showModal         = false;
  editando          = false;
  puedeEditar       = false; // ← añadir
  motoSeleccionada: Moto | null = null;
  filtroPiloto = 0;

  form: CreateMotoDto = {
    piloto: 0,
    placa: '',
    modelo: '',
    anio: new Date().getFullYear(),
    horas_uso: 0
  };

  constructor(
    private motoService: MotoService,
    private pilotoService: PilotoService,
    private auth: AuthService,        // ← añadir
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.puedeEditar = this.auth.puedeEditar(); // ← añadir
    this.pilotoService.getAll().subscribe(p => {
      this.pilotos = p;
      this.cdr.detectChanges();
    });
    this.cargarMotos();
  }

  cargarMotos(): void {
    this.loading = true;
    const pilotoId = this.filtroPiloto ? this.filtroPiloto : undefined;
    this.motoService.getAll(pilotoId).subscribe({
      next: m => { this.motos = m; this.loading = false; this.cdr.detectChanges(); },
      error: ()  => { this.loading = false; this.cdr.detectChanges(); }
    });
  }

  getNombrePiloto(id: number): string {
    return this.pilotos.find(p => p.id === id)?.nombre ?? String(id);
  }

  abrirModal(moto?: Moto): void {
    this.editando = !!moto;
    this.motoSeleccionada = moto ?? null;
    this.form = moto
      ? { piloto: moto.piloto, placa: moto.placa ?? '', modelo: moto.modelo, anio: moto.anio, horas_uso: moto.horas_uso }
      : { piloto: 0, placa: '', modelo: '', anio: new Date().getFullYear(), horas_uso: 0 };
    this.showModal = true;
  }

  cerrarModal(): void {
    this.showModal = false;
    this.motoSeleccionada = null;
  }

  guardar(): void {
    if (this.editando && this.motoSeleccionada) {
      this.motoService.update(this.motoSeleccionada.id, this.form).subscribe({
        next: () => { this.cargarMotos(); this.cerrarModal(); }
      });
    } else {
      this.motoService.create(this.form).subscribe({
        next: () => { this.cargarMotos(); this.cerrarModal(); }
      });
    }
  }

  eliminar(id: number): void {
    if (confirm('¿Estás seguro de eliminar esta moto?')) {
      this.motoService.delete(id).subscribe({
        next: () => this.cargarMotos()
      });
    }
  }
}