from rest_framework import serializers
from .models import Piloto, Moto, Servicio, Item, ServicioItem, ServicioExtra


class PilotoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Piloto
        fields = ['id', 'nombre', 'cc', 'telefono', 'email']


class MotoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Moto
        fields = ['id', 'piloto', 'placa', 'modelo', 'anio', 'horas_uso']


class ItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Item
        fields = '__all__'


class ServicioItemSerializer(serializers.ModelSerializer):
    item = ItemSerializer(read_only=True)

    class Meta:
        model = ServicioItem
        fields = '__all__'


class ServicioExtraSerializer(serializers.ModelSerializer):
    class Meta:
        model = ServicioExtra
        fields = '__all__'


class ServicioSerializer(serializers.ModelSerializer):
    items_detalle = ServicioItemSerializer(source='servicioitem_set', many=True, read_only=True)
    extras = ServicioExtraSerializer(many=True, read_only=True)
    piloto_nombre = serializers.SerializerMethodField()
    moto_modelo   = serializers.SerializerMethodField()

    class Meta:
        model = Servicio
        fields = '__all__'

    def get_piloto_nombre(self, obj):
        return obj.piloto.nombre if obj.piloto else None

    def get_moto_modelo(self, obj):
        return f"{obj.moto.modelo} ({obj.moto.anio})" if obj.moto else None


from django.contrib.auth.models import User

class UsuarioSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=False)
    rol = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 'password', 'is_active', 'rol']

    def get_rol(self, obj):
        if obj.is_superuser:
            return 'admin'
        if obj.groups.filter(name='mecanico').exists():
            return 'mecanico'
        if obj.groups.filter(name='recepcion').exists():
            return 'recepcion'
        return 'mecanico'

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        rol = self.initial_data.get('rol', 'mecanico')
        user = User(**validated_data)
        if password:
            user.set_password(password)
        user.save()
        self._asignar_rol(user, rol)
        return user

    def update(self, instance, validated_data):
        password = validated_data.pop('password', None)
        rol = self.initial_data.get('rol')
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        if password:
            instance.set_password(password)
        instance.save()
        if rol:
            self._asignar_rol(instance, rol)
        return instance

    def _asignar_rol(self, user, rol):
        from django.contrib.auth.models import Group
        user.groups.clear()
        if rol == 'admin':
            user.is_superuser = True
            user.is_staff = True
            user.save()
        else:
            user.is_superuser = False
            user.is_staff = False
            user.save()
            group, _ = Group.objects.get_or_create(name=rol)
            user.groups.add(group)