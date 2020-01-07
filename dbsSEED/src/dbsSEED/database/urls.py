from django.contrib import admin
from django.urls import path, include                 # add this
from rest_framework import routers                    # add this
from .views import UserView                            # add this

router = routers.DefaultRouter()                      # add this
router.register(r'views', UserView, 'views')     # add this

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls))
]
