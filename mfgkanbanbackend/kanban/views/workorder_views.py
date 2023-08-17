from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from kanban.models import WorkOrder
from kanban.serializers import WorkOrderSerializer, WorkOrderDetailSerializer


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


class WorkOrderDetail(APIView):
    def get_object(self, workorder_id):
        """ """
        try:
            return WorkOrder.objects.get(id=workorder_id)
        except WorkOrder.DoesNotExist:
            return None

    def get(self, request, workorder_id, *args, **kwargs):
        workorder_instance = self.get_object(workorder_id)

        if not workorder_instance:
            return Response(
                {"res": "WorkOrder does not exist"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        serializer = WorkOrderSerializer(workorder_instance)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def put(self, request, workorder_id, *args, **kwargs):
        """ """
        workorder_instance = self.get_object(workorder_id)

        if not workorder_instance:
            return Response(
                {"res": "WorkOrder does not exist"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        data = {
            "name": request.data.get("name"),
            "priority": request.data.get("priority"),
            "location": request.data.get("location"),
            "part": request.data.get("part"),
        }

        serializer = WorkOrderSerializer(
            instance=workorder_instance, data=data, partial=True
        )
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, workorder_id, *args, **kwargs):
        workorder_instance = self.get_object(workorder_id)

        if not workorder_instance:
            return Response(
                {"res": "WorkOrder does not exist"}, status=status.HTTP_400_BAD_REQUEST
            )
        workorder_instance.delete()
        return Response({"res": "WorkOrder deleted"}, status=status.HTTP_200_OK)


class WorkOrderList(APIView):
    def get(self, request, *args, **kwargs):
        parts = WorkOrder.objects.all()
        serializer = WorkOrderDetailSerializer(parts, many=True)

        return Response(serializer.data)
