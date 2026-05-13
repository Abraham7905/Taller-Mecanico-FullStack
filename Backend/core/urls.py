from rest_framework_nested import routers
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from django.urls import path
from .views import PilotoViewSet, MotoViewSet, ServicioViewSet, ItemViewSet, UsuarioViewSet, ServicioItemViewSet, ServicioExtraViewSet

router = routers.DefaultRouter()
router.register(r'pilotos',   PilotoViewSet)
router.register(r'motos',     MotoViewSet)
router.register(r'servicios', ServicioViewSet)
router.register(r'items',     ItemViewSet)
router.register(r'usuarios',  UsuarioViewSet)

servicios_router = routers.NestedDefaultRouter(router, r'servicios', lookup='servicio')
servicios_router.register(r'items',  ServicioItemViewSet,  basename='servicio-items')
servicios_router.register(r'extras', ServicioExtraViewSet, basename='servicio-extras')

urlpatterns = [
    path('auth/token/',         TokenObtainPairView.as_view(),  name='token_obtain_pair'),
    path('auth/token/refresh/', TokenRefreshView.as_view(),     name='token_refresh'),
    path('auth/me/',            UsuarioViewSet.as_view({'get': 'me'}), name='auth_me'),

    *router.urls,
    *servicios_router.urls,
]