from django.urls import path

from . import views

app_name = 'base'

urlpatterns = [
    path('', views.IndexView.as_view(), name= 'index'),
    path('workorder/create/', views.workorder_create, name= 'workorder-create'),
    path('workorder/delete/<int:pk>', views.workorder_delete, name= 'workorder-delete'),
    path('workorder/sort/', views.workorder_sort, name= 'workorder-sort'),
    path('location/create/', views.location_create, name= 'location-create'),
    path('location/delete/<int:pk>', views.location_delete, name= 'location-delete'),
    path('location/sort/', views.location_sort, name= 'location-sort'),
    path('part/create/', views.part_create, name= 'part-create'),
    path('part/delete/<int:pk>', views.part_delete, name= 'part-delete'),
]