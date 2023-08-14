from django.urls import path, include
from .views import PartCreate, LocationCreate, PartList, LocationList, WorkOrderList

# app_name = "kanban"

urlpatterns = [
    path("part/create/", PartCreate.as_view()),
    path("location/create/", LocationCreate.as_view()),
    path("part/list/", PartList.as_view()),
    path("location/list/", LocationList.as_view()),
    path("workorder/list/", WorkOrderList.as_view()),
]
