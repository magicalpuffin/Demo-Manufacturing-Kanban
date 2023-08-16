from django.urls import path, include
from .views import (
    PartCreate,
    LocationCreate,
    WorkOrderCreate,
    PartDetail,
    LocationDetail,
    PartList,
    LocationList,
    WorkOrderList,
)

# app_name = "kanban"

urlpatterns = [
    path("part/create/", PartCreate.as_view()),
    path("location/create/", LocationCreate.as_view()),
    path("workorder/create/", WorkOrderCreate.as_view()),
    path("part/<int:part_id>/", PartDetail.as_view()),
    path("location/<int:location_id>/", LocationDetail.as_view()),
    path("part/list/", PartList.as_view()),
    path("location/list/", LocationList.as_view()),
    path("workorder/list/", WorkOrderList.as_view()),
]
