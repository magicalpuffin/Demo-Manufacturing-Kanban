from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .models import Location, Part, WorkOrder
from .serializers import LocationSerializer, PartSerializer, WorkOrderSerializer

from django.shortcuts import render

# Create your views here.


class PartCreate(APIView):
    def post(self, request, *args, **kwargs):
        data = {
            "name": request.data.get("name"),
            "description": request.data.get("description"),
        }

        serializer = PartSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class PartList(APIView):
    def get(self, request, *args, **kwargs):
        parts = Part.objects.all()
        serializer = PartSerializer(parts, many=True)

        return Response(serializer.data)


class LocationList(APIView):
    def get(self, request, *args, **kwargs):
        parts = Location.objects.all()
        serializer = LocationSerializer(parts, many=True)

        return Response(serializer.data)


class WorkOrderList(APIView):
    def get(self, request, *args, **kwargs):
        parts = WorkOrder.objects.all()
        serializer = WorkOrderSerializer(parts, many=True)

        return Response(serializer.data)
