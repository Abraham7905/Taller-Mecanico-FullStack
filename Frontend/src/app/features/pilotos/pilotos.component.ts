import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PilotoService, CreatePilotoDto } from '../../core/services/piloto.service';
import { Piloto } from '../../core/models';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-pilotos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './pilotos.component.html',
  styleUrls: ['./pilotos.component.scss']
})
export class PilotosComponent implements OnInit {
  pilotos: Piloto[] = [];
  loading           = false;
  showModal         = false;
  editando          = false;
  // propiedad
  puedeEditar = false;
  pilotoSeleccionado: Piloto | null = null;

  form: CreatePilotoDto = {
    nombre: '',
    cc: '',
    telefono: '',
    email: ''
  };

  constructor(
    private pilotoService: PilotoService,
    private auth: AuthService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.puedeEditar = this.auth.puedeEditar();
    this.cargarPilotos();
  }

  cargarPilotos(): void {
    this.loading = true;
    this.pilotoService.getAll().subscribe({
      next: p => {
        this.pilotos = p;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  abrirModal(piloto?: Piloto): void {
    this.editando = !!piloto;
    this.pilotoSeleccionado = piloto ?? null;
    this.form = piloto
      ? { nombre: piloto.nombre, cc: piloto.cc ?? '', telefono: piloto.telefono, email: piloto.email ?? '' }
      : { nombre: '', cc: '', telefono: '', email: '' };
    this.showModal = true;
  }

  cerrarModal(): void {
    this.showModal = false;
    this.pilotoSeleccionado = null;
  }

  guardar(): void {
    if (this.editando && this.pilotoSeleccionado) {
      this.pilotoService.update(this.pilotoSeleccionado.id, this.form).subscribe({
        next: () => { this.cargarPilotos(); this.cerrarModal(); }
      });
    } else {
      this.pilotoService.create(this.form).subscribe({
        next: () => { this.cargarPilotos(); this.cerrarModal(); }
      });
    }
  }

  eliminar(id: number): void {
    if (confirm('¿Estás seguro de eliminar este piloto?')) {
      this.pilotoService.delete(id).subscribe({
        next: () => this.cargarPilotos()
      });
    }
  }
}