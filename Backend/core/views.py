from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.models import User
from django.db import models as django_models

from .models import Piloto, Moto, Servicio, Item, ServicioItem, ServicioExtra
from .serializers import (
    PilotoSerializer, MotoSerializer, ServicioSerializer,
    ItemSerializer, UsuarioSerializer,
    ServicioItemSerializer, ServicioExtraSerializer
)


class PilotoViewSet(viewsets.ModelViewSet):
    queryset = Piloto.objects.all()
    serializer_class = PilotoSerializer

    def get_queryset(self):
        queryset = Piloto.objects.all()
        search = self.request.query_params.get('search')
        if search:
            queryset = queryset.filter(
                django_models.Q(nombre__icontains=search)   |
                django_models.Q(cc__icontains=search)       |
                django_models.Q(telefono__icontains=search) |
                django_models.Q(email__icontains=search)    |
                django_models.Q(motos__placa__icontains=search)
            ).distinct()
        return queryset


class MotoViewSet(viewsets.ModelViewSet):
    queryset = Moto.objects.all()
    serializer_class = MotoSerializer

    def get_queryset(self):
        queryset = Moto.objects.all()
        piloto_id = self.request.query_params.get('piloto')
        if piloto_id:
            queryset = queryset.filter(piloto_id=piloto_id)
        return queryset


class ItemViewSet(viewsets.ModelViewSet):
    queryset = Item.objects.all()
    serializer_class = ItemSerializer

    def get_queryset(self):
        queryset = Item.objects.all()
        estado = self.request.query_params.get('estado')
        if estado:
            queryset = queryset.filter(estado=estado)
        return queryset


class ServicioViewSet(viewsets.ModelViewSet):
    queryset = Servicio.objects.all()
    serializer_class = ServicioSerializer

    def get_queryset(self):
        queryset = Servicio.objects.all()
        piloto_id = self.request.query_params.get('piloto')
        moto_id   = self.request.query_params.get('moto')
        tipo      = self.request.query_params.get('tipo')
        estado    = self.request.query_params.get('estado')
        if piloto_id:
            queryset = queryset.filter(piloto_id=piloto_id)
        if moto_id:
            queryset = queryset.filter(moto_id=moto_id)
        if tipo:
            queryset = queryset.filter(tipo=tipo)
        if estado:
            queryset = queryset.filter(estado=estado)
        return queryset


class UsuarioViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all().order_by('id')
    serializer_class = UsuarioSerializer

    @action(detail=False, methods=['get'], permission_classes=[IsAuthenticated])
    def me(self, request):
        serializer = self.get_serializer(request.user)
        return Response(serializer.data)


class ServicioItemViewSet(viewsets.ModelViewSet):
    serializer_class = ServicioItemSerializer

    def get_queryset(self):
        return ServicioItem.objects.filter(servicio_id=self.kwargs['servicio_pk'])

    def perform_create(self, serializer):
        serializer.save(servicio_id=self.kwargs['servicio_pk'])


class ServicioExtraViewSet(viewsets.ModelViewSet):
    serializer_class = ServicioExtraSerializer

    def get_queryset(self):
        return ServicioExtra.objects.filter(servicio_id=self.kwargs['servicio_pk'])

    def perform_create(self, serializer):
        serializer.save(servicio_id=self.kwargs['servicio_pk'])