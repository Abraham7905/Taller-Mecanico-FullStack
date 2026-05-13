from django.db import models
from django.core.exceptions import ValidationError


# ─────────────────────────────────────────────
# 👤 Piloto
# ─────────────────────────────────────────────
class Piloto(models.Model):
    nombre   = models.CharField(max_length=100)
    cc = models.CharField(max_length=20, unique=True, db_index=True, null=True, blank=True)
    telefono = models.CharField(max_length=15)
    email    = models.EmailField(blank=True, null=True)

    def __str__(self):
        return self.nombre


# ─────────────────────────────────────────────
# 🏍️ Moto
# ─────────────────────────────────────────────
class Moto(models.Model):
    piloto    = models.ForeignKey(Piloto, on_delete=models.CASCADE, related_name='motos')
    modelo    = models.CharField(max_length=50)
    placa     = models.CharField(max_length=10, unique=True, db_index=True, null=True, blank=True)
    anio      = models.IntegerField()
    horas_uso = models.IntegerField(default=0)

    def __str__(self):
        return f"{self.modelo} ({self.anio})"


# ─────────────────────────────────────────────
# 🔧 Item (inventario para reparaciones)
# ─────────────────────────────────────────────
class Item(models.Model):
    ESTADOS = [
        ('activo',   'Activo'),
        ('inactivo', 'Inactivo'),
    ]

    nombre      = models.CharField(max_length=100)
    descripcion = models.TextField(blank=True, null=True)
    estado      = models.CharField(max_length=10, choices=ESTADOS, default='activo')

    def __str__(self):
        return f"{self.nombre} ({self.estado})"


# ─────────────────────────────────────────────
# 🔗 Relación Servicio ↔ Item (con cantidad)
# ─────────────────────────────────────────────
class ServicioItem(models.Model):
    servicio = models.ForeignKey('Servicio', on_delete=models.CASCADE)
    item     = models.ForeignKey(Item, on_delete=models.CASCADE)
    cantidad = models.IntegerField(default=1)

    class Meta:
        unique_together = ('servicio', 'item')

    def __str__(self):
        return f"{self.item.nombre} x{self.cantidad}"


# ─────────────────────────────────────────────
# 🧰 Extras (solo para alistamientos)
# ─────────────────────────────────────────────
class ServicioExtra(models.Model):
    servicio    = models.ForeignKey('Servicio', on_delete=models.CASCADE, related_name='extras')
    nombre      = models.CharField(max_length=100)
    descripcion = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.nombre


# ─────────────────────────────────────────────
# 🔧 Servicio principal
# ─────────────────────────────────────────────
class Servicio(models.Model):
    TIPOS = [
        ('alistamiento', 'Alistamiento'),
        ('reparacion',   'Reparación'),
    ]

    ESTADOS = [
        ('pendiente', 'Pendiente'),
        ('proceso',   'En Proceso'),
        ('terminado', 'Terminado'),
    ]

    piloto  = models.ForeignKey(Piloto, on_delete=models.CASCADE, related_name='servicios')
    moto    = models.ForeignKey(Moto,   on_delete=models.CASCADE, related_name='servicios')
    tipo    = models.CharField(max_length=20, choices=TIPOS, default='alistamiento')
    estado  = models.CharField(max_length=20, choices=ESTADOS, default='pendiente')

    fecha_ingreso  = models.DateTimeField(auto_now_add=True)
    horas_servicio = models.IntegerField(default=0)

    # Solo para reparaciones
    items = models.ManyToManyField(Item, through='ServicioItem', blank=True)

    def __str__(self):
        return f"Servicio {self.id} - {self.tipo}"

    # ── Validaciones de negocio ──────────────────────────────────
    def clean(self):
        # FIX 4: La moto debe pertenecer al piloto indicado
        if self.moto.piloto != self.piloto:
            raise ValidationError("La moto no pertenece al piloto indicado.")

        # Las validaciones sobre relaciones M2M solo aplican si el objeto ya existe
        if not self.pk:
            return

        if self.tipo == 'alistamiento':
            if self.servicioitem_set.exists():
                raise ValidationError("Un alistamiento no debe tener ítems de inventario.")

        if self.tipo == 'reparacion':
            if self.extras.exists():
                raise ValidationError("Una reparación no debe tener extras.")

            # FIX 1: self.item no existe — se valida sobre el queryset M2M
            if self.items.filter(estado='inactivo').exists():
                raise ValidationError("No se puede usar un ítem inactivo en la reparación.")

    # ── Save ─────────────────────────────────────────────────────
    def save(self, *args, **kwargs):
        # FIX 2: Llamar full_clean() para que las validaciones de clean()
        # se ejecuten siempre, incluso desde .save() directo o DRF
        self.full_clean()

        # Snapshot del estado anterior antes de persistir
        if self.pk:
            try:
                servicio_anterior = Servicio.objects.get(pk=self.pk)
            except Servicio.DoesNotExist:
                servicio_anterior = None
        else:
            servicio_anterior = None

        super().save(*args, **kwargs)

        # Actualizar horas solo cuando el servicio pasa a "terminado"
        if self.estado == 'terminado':
            ya_estaba_terminado = (
                servicio_anterior is not None
                and servicio_anterior.estado == 'terminado'
            )
            if not ya_estaba_terminado:
                # FIX 3: Operación atómica — evita race condition entre requests
                # Solo actualiza si horas_servicio supera el valor actual en BD
                Moto.objects.filter(
                    pk=self.moto.pk,
                    horas_uso__lt=self.horas_servicio
                ).update(horas_uso=self.horas_servicio)