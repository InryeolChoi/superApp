from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('list/', include('todo.urls')),
    path('board/', include('board.urls')),
    path('intalk/', include('intalk.urls')),
]
