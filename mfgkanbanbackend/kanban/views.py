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


class LocationCreate(APIView):
    def post(self, request, *args, **kwargs):
        data = {
            "name": request.data.get("name"),
            "sequence": request.data.get("sequence"),
        }

        serializer = LocationSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class WorkOrderCreate(APIView):
    def post(self, request, *args, **kwargs):
        # Expects location and part id
        data = {
            "name": request.data.get("name"),
            "priority": request.data.get("priority"),
            "location": request.data.get("location"),
            "part": request.data.get("part"),
        }

        serializer = WorkOrderSerializer(data=data)
        if serializer.is_valid():
            # Reserializes to return details of location and part
            newWorkorder = serializer.save()
            detail_serializer = WorkOrderDetailSerializer(newWorkorder)
            return Response(detail_serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class PartDetail(APIView):
    def get_object(self, part_id):
        """ """
        try:
            return Part.objects.get(id=part_id)
        except Part.DoesNotExist:
            return None

    def get(self, request, part_id, *args, **kwargs):
        part_instance = self.get_object(part_id)

        if not part_instance:
            return Response(
                {"res": "Part does not exist"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        serializer = PartSerializer(part_instance)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def put(self, request, part_id, *args, **kwargs):
        """ """
        part_instance = self.get_object(part_id)

        if not part_instance:
            return Response(
                {"res": "Part does not exist"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        data = {
            "name": request.data.get("name"),
            "description": request.data.get("description"),
        }

        serializer = PartSerializer(instance=part_instance, data=data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, part_id, *args, **kwargs):
        part_instance = self.get_object(part_id)

        if not part_instance:
            return Response(
                {"res": "Part does not exist"}, status=status.HTTP_400_BAD_REQUEST
            )
        part_instance.delete()
        return Response({"res": "Part deleted"}, status=status.HTTP_200_OK)


class LocationDetail(APIView):
    def get_object(self, location_id):
        """ """
        try:
            return Location.objects.get(id=location_id)
        except Location.DoesNotExist:
            return None

    def get(self, request, location_id, *args, **kwargs):
        location_instance = self.get_object(location_id)

        if not location_instance:
            return Response(
                {"res": "Location does not exist"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        serializer = LocationSerializer(location_instance)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def put(self, request, location_id, *args, **kwargs):
        """ """
        location_instance = self.get_object(location_id)

        if not location_instance:
            return Response(
                {"res": "Location does not exist"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        data = {
            "name": request.data.get("name"),
            "sequence": request.data.get("sequence"),
        }

        serializer = LocationSerializer(
            instance=location_instance, data=data, partial=True
        )
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, location_id, *args, **kwargs):
        location_instance = self.get_object(location_id)

        if not location_instance:
            return Response(
                {"res": "Location does not exist"}, status=status.HTTP_400_BAD_REQUEST
            )
        location_instance.delete()
        return Response({"res": "Location deleted"}, status=status.HTTP_200_OK)


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
        serializer = WorkOrderDetailSerializer(parts, many=True)

        return Response(serializer.data)
