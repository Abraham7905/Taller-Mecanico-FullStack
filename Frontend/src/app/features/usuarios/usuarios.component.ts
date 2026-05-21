import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UsuarioService, CreateUsuarioDto } from '../../core/services/usuario.service';
import { Usuario, UsuarioRol } from '../../core/models';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit {
  usuarios: Usuario[] = [];
  loading             = false;
  showModal           = false;
  editando            = false;
  usuarioSeleccionado: Usuario | null = null;

  form: CreateUsuarioDto = {
    username: '', email: '', password: '', first_name: '', last_name: '', rol: 'mecanico'
  };

  constructor(
    private usuarioService: UsuarioService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void { this.cargarUsuarios(); }

  cargarUsuarios(): void {
    this.loading = true;
    this.usuarioService.getAll().subscribe({
      next: u => { this.usuarios = u; this.loading = false; this.cdr.detectChanges(); },
      error: ()  => { this.loading = false; this.cdr.detectChanges(); }
    });
  }

  abrirModal(usuario?: Usuario): void {
    this.editando = !!usuario;
    this.usuarioSeleccionado = usuario ?? null;
    this.form = usuario ? {
      username: usuario.username, email: usuario.email, password: '',
      first_name: usuario.first_name ?? '', last_name: usuario.last_name ?? '', rol: usuario.rol
    } : { username: '', email: '', password: '', first_name: '', last_name: '', rol: 'mecanico' };
    this.showModal = true;
  }

  cerrarModal(): void { this.showModal = false; this.usuarioSeleccionado = null; }

  guardar(): void {
    if (this.editando && this.usuarioSeleccionado) {
      const dto: Partial<CreateUsuarioDto> = { ...this.form };
      if (!dto.password) delete dto.password;
      this.usuarioService.update(this.usuarioSeleccionado.id, dto).subscribe({
        next: () => { this.cargarUsuarios(); this.cerrarModal(); }
      });
    } else {
      this.usuarioService.create(this.form).subscribe({
        next: () => { this.cargarUsuarios(); this.cerrarModal(); }
      });
    }
  }

  toggleActivo(usuario: Usuario): void {
    this.usuarioService.toggleActivo(usuario.id, !usuario.is_active).subscribe({
      next: () => this.cargarUsuarios()
    });
  }

  eliminar(id: number): void {
    if (confirm('¿Estás seguro de eliminar este usuario?')) {
      this.usuarioService.delete(id).subscribe({ next: () => this.cargarUsuarios() });
    }
  }

  getRolLabel(rol: UsuarioRol): string {
    const labels: Record<UsuarioRol, string> = {
      admin: 'Administrador', mecanico: 'Mecánico', recepcion: 'Recepción'
    };
    return labels[rol];
  }
}