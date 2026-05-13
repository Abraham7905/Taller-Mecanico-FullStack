# 🏍️ Sistema de Gestión - Taller de Motos de Competencia

Sistema web fullstack para la gestión integral de un taller de motos de competencia. Permite administrar pilotos, motos, servicios de alistamiento y reparación, inventario de items y usuarios del sistema.

---

## 🚀 Tecnologías utilizadas

### Backend
- **Python 3.14** + **Django 6**
- **Django REST Framework** — API REST
- **SimpleJWT** — Autenticación con tokens JWT
- **MySQL** — Base de datos
- **django-cors-headers** — Manejo de CORS
- **drf-nested-routers** — Rutas anidadas

### Frontend
- **Angular 21** — Framework principal
- **TypeScript** — Lenguaje base
- **SCSS** — Estilos
- **Angular Material** — Componentes UI

---

## ✨ Funcionalidades

- 🔐 **Autenticación JWT** con roles (Admin, Mecánico, Recepción)
- 📊 **Dashboard** con estadísticas en tiempo real y buscador inteligente
- 👤 **Gestión de Pilotos** — CRUD completo con cédula, teléfono y correo
- 🏍️ **Gestión de Motos** — Registro con placa, modelo, año y horas de uso
- 🔧 **Gestión de Servicios** — Alistamientos y reparaciones con seguimiento de estado
- 📦 **Inventario** — Control de items activos e inactivos
- 👥 **Gestión de Usuarios** — Control de acceso por roles
- 📋 **Historial** — Registro de cambios de estado de servicios
- 🔍 **Buscador** — Búsqueda por nombre, cédula, placa, teléfono o correo

---

## 🗂️ Estructura del proyecto

proyecto/
├── backend/
│   └── taller_mecanico/
│       ├── core/               # App principal
│       │   ├── models.py       # Modelos: Piloto, Moto, Servicio, Item
│       │   ├── serializers.py  # Serializers DRF
│       │   ├── views.py        # ViewSets
│       │   └── urls.py         # Rutas API
│       └── taller_mecanico/
│           └── settings.py     # Configuración Django
└── frontend/
└── taller-frontend/
└── src/app/
├── core/           # Modelos TS, servicios, guards
├── features/       # Páginas: dashboard, pilotos, motos...
└── shared/         # Componentes compartidos (sidebar)

---

## ⚙️ Instalación y configuración

### Requisitos previos
- Python 3.10+
- Node.js 18+
- MySQL 8+

### Backend

```bash
# Clonar el repositorio
git clone https://github.com/Abraham7905/taller-motos.git
cd taller-motos/backend/taller_mecanico

# Crear y activar entorno virtual
python -m venv venv
venv\Scripts\activate  # Windows
source venv/bin/activate  # Linux/Mac

# Instalar dependencias
pip install django djangorestframework djangorestframework-simplejwt django-cors-headers drf-nested-routers mysqlclient

# Configurar base de datos en settings.py
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'taller_db',
        'USER': 'tu_usuario',
        'PASSWORD': 'tu_password',
        'HOST': 'localhost',
        'PORT': '3306',
    }
}

# Correr migraciones
python manage.py migrate

# Crear superusuario
python manage.py createsuperuser

# Iniciar servidor
python manage.py runserver
```

### Frontend

```bash
cd taller-mecanico-fullstack/frontend/taller-frontend

# Instalar dependencias
npm install --legacy-peer-deps

# Configurar URL del backend en src/environments/environment.ts
export const environment = {
  production: false,
  apiUrl: 'http://127.0.0.1:8000/api'
};

# Iniciar servidor
ng serve
```

---

## 🔑 Roles y permisos

| Rol | Dashboard | Pilotos | Motos | Servicios | Inventario | Usuarios |
|-----|-----------|---------|-------|-----------|------------|----------|
| **Admin** | ✅ | ✅ CRUD | ✅ CRUD | ✅ CRUD | ✅ CRUD | ✅ CRUD |
| **Recepción** | ✅ | ✅ CRUD | ✅ CRUD | ✅ CRUD | ✅ CRUD | ❌ |
| **Mecánico** | ✅ | 👁️ Ver | 👁️ Ver | 🔄 Estado | 👁️ Ver | ❌ |

---

## 📡 Endpoints principales

POST   /api/auth/token/          → Login
POST   /api/auth/token/refresh/  → Refresh token
GET    /api/auth/me/             → Perfil del usuario
GET|POST        /api/pilotos/
GET|PUT|DELETE  /api/pilotos/{id}/
GET|POST        /api/motos/
GET|PUT|DELETE  /api/motos/{id}/
GET|POST        /api/servicios/
GET|PUT|DELETE  /api/servicios/{id}/
POST            /api/servicios/{id}/items/
POST            /api/servicios/{id}/extras/
GET|POST        /api/items/
GET|POST        /api/usuarios/

---

## 👨‍💻 Autor

**Abraham** — Desarrollador Fullstack  
Stack: Django REST Framework + Angular

---

## 📄 Licencia

Este proyecto fue desarrollado como prueba técnica y portafolio profesional.