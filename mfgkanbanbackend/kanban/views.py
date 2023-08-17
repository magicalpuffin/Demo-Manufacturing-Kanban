from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .models import Location, Part, WorkOrder
from .serializers import (
    LocationSerializer,
    PartSerializer,
    WorkOrderSerializer,
    WorkOrderDetailSerializer,
)

from django.shortcuts import render

# Create your views here.
