import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ItemService, CreateItemDto } from '../../core/services/item.service';
import { Item } from '../../core/models';

@Component({
  selector: 'app-inventario',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './inventario.component.html',
  styleUrls: ['./inventario.component.scss']
})
export class InventarioComponent implements OnInit {
  items: Item[] = [];
  loading       = false;
  showModal     = false;
  editando      = false;
  itemSeleccionado: Item | null = null;
  filtroEstado  = '';

  form: CreateItemDto = { nombre: '', descripcion: '', estado: 'activo' };

  constructor(
    private itemService: ItemService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void { this.cargarItems(); }

  cargarItems(): void {
    this.loading = true;
    this.itemService.getAll().subscribe({
      next: i => {
        this.items = this.filtroEstado ? i.filter(x => x.estado === this.filtroEstado) : i;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: () => { this.loading = false; this.cdr.detectChanges(); }
    });
  }

  abrirModal(item?: Item): void {
    this.editando = !!item;
    this.itemSeleccionado = item ?? null;
    this.form = item
      ? { nombre: item.nombre, descripcion: item.descripcion ?? '', estado: item.estado }
      : { nombre: '', descripcion: '', estado: 'activo' };
    this.showModal = true;
  }

  cerrarModal(): void { this.showModal = false; this.itemSeleccionado = null; }

  guardar(): void {
    if (this.editando && this.itemSeleccionado) {
      this.itemService.update(this.itemSeleccionado.id, this.form).subscribe({
        next: () => { this.cargarItems(); this.cerrarModal(); }
      });
    } else {
      this.itemService.create(this.form).subscribe({
        next: () => { this.cargarItems(); this.cerrarModal(); }
      });
    }
  }

  toggleEstado(item: Item): void {
    const nuevoEstado = item.estado === 'activo' ? 'inactivo' : 'activo';
    this.itemService.toggleEstado(item.id, nuevoEstado).subscribe({
      next: () => this.cargarItems()
    });
  }

  eliminar(id: number): void {
    if (confirm('¿Estás seguro de eliminar este item?')) {
      this.itemService.delete(id).subscribe({ next: () => this.cargarItems() });
    }
  }
}