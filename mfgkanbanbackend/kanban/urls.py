from django.urls import path, include
from .views import (
    PartCreate,
    LocationCreate,
    WorkOrderCreate,
    PartDetail,
    LocationDetail,
    WorkOrderDetail,
    PartList,
    LocationList,
    WorkOrderList,
)

# app_name = "kanban"

urlpatterns = []

part_urlpatterns = [
    path("part/create/", PartCreate.as_view()),
    path("part/<int:part_id>/", PartDetail.as_view()),
    path("part/list/", PartList.as_view()),
]

location_urlpatterns = [
    path("location/create/", LocationCreate.as_view()),
    path("location/<int:location_id>/", LocationDetail.as_view()),
    path("location/list/", LocationList.as_view()),
]

workorder_urlpatterns = [
    path("workorder/create/", WorkOrderCreate.as_view()),
    path("workorder/<int:workorder_id>/", WorkOrderDetail.as_view()),
    path("workorder/list/", WorkOrderList.as_view()),
]

urlpatterns += part_urlpatterns
urlpatterns += location_urlpatterns
urlpatterns += workorder_urlpatterns
