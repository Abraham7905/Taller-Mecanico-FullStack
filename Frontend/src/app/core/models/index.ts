// ─────────────────────────────────────────
// 👤 Piloto
// ─────────────────────────────────────────
export interface Piloto {
  id: number;
  nombre: string;
  cc?: string | null;
  telefono: string;
  email?: string | null;
}

export interface Moto {
  id: number;
  piloto: number;
  piloto_nombre?: string;
  placa?: string | null;
  modelo: string;
  anio: number;
  horas_uso: number;
}
// ─────────────────────────────────────────
// 🔧 Item
// ─────────────────────────────────────────
export type ItemEstado = 'activo' | 'inactivo';

export interface Item {
  id: number;
  nombre: string;
  descripcion?: string | null;
  estado: ItemEstado;
}

// ─────────────────────────────────────────
// 🔗 ServicioItem
// ─────────────────────────────────────────
export interface ServicioItem {
  id: number;
  item: number;
  item_nombre?: string;
  cantidad: number;
}

// ─────────────────────────────────────────
// 🧰 ServicioExtra
// ─────────────────────────────────────────
export interface ServicioExtra {
  id: number;
  nombre: string;
  descripcion?: string | null;
}

// ─────────────────────────────────────────
// 🔧 Servicio
// ─────────────────────────────────────────
export type ServicioTipo   = 'alistamiento' | 'reparacion';
export type ServicioEstado = 'pendiente' | 'proceso' | 'terminado';

export interface Servicio {
  id: number;
  piloto: number;
  piloto_nombre?: string;
  moto: number;
  moto_modelo?: string;
  tipo: ServicioTipo;
  fecha_ingreso: string;
  estado: ServicioEstado;
  horas_servicio: number;
  items?: ServicioItem[];
  extras?: ServicioExtra[];
}

// ─────────────────────────────────────────
// 👥 Usuario
// ─────────────────────────────────────────
export type UsuarioRol = 'admin' | 'mecanico' | 'recepcion';

export interface Usuario {
  id: number;
  username: string;
  email: string;
  first_name?: string;
  last_name?: string;
  rol: UsuarioRol;
  is_active: boolean;
}