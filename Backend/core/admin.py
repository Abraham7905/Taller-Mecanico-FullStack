from django.contrib import admin
from .models import (
    Piloto, Moto, Servicio,
    Item, ServicioItem, ServicioExtra
)

# 👤 Piloto
@admin.register(Piloto)
class PilotoAdmin(admin.ModelAdmin):
    list_display = ('nombre', 'telefono', 'email')
    search_fields = ('nombre',)


# 🏍️ Moto
@admin.register(Moto)
class MotoAdmin(admin.ModelAdmin):
    list_display = ('modelo', 'anio', 'horas_uso', 'piloto')
    list_filter = ('anio',)


# 🔧 Item
@admin.register(Item)
class ItemAdmin(admin.ModelAdmin):
    list_display = ('nombre', 'estado')
    list_filter = ('estado',)
    search_fields = ('nombre',)

# 🔗 Inline de items en servicio
class ServicioItemInline(admin.TabularInline):
    model = ServicioItem
    extra = 1


# 🧰 Inline de extras
class ServicioExtraInline(admin.TabularInline):
    model = ServicioExtra
    extra = 1


# 🔧 Servicio (EL IMPORTANTE)
@admin.register(Servicio)
class ServicioAdmin(admin.ModelAdmin):
    list_display = (
        'id',
        'piloto',
        'moto',
        'tipo',
        'estado',
        'horas_servicio',
        'fecha_ingreso'
    )
    list_filter = ('estado', 'tipo')
    search_fields = ('piloto__nombre',)

    # 🔥 Aquí está la magia
    inlines = [ServicioItemInline, ServicioExtraInline]