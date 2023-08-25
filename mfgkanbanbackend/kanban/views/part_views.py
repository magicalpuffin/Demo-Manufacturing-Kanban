from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from kanban.models import Part
from kanban.serializers import PartSerializer


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


class PartList(APIView):
    def get(self, request, *args, **kwargs):
        parts = Part.objects.all()
        serializer = PartSerializer(parts, many=True)

        return Response(serializer.data)
