from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from kanban.models import Location
from kanban.serializers import LocationSerializer


class LocationCreate(APIView):
    def post(self, request, *args, **kwargs):
        data = {
            "name": request.data.get("name"),
            "sequence": request.data.get("sequence"),
        }

        # Partial because id was added to serializer
        serializer = LocationSerializer(data=data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


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


class LocationList(APIView):
    def get(self, request, *args, **kwargs):
        parts = Location.objects.all().order_by("sequence")
        serializer = LocationSerializer(parts, many=True)

        return Response(serializer.data)

    def put(self, request, *args, **kwargs):
        # TODO fix this. This is messy, need to fix most of this
        # Looping through and updating each model item individually
        # Should use a custom list serializer
        # Doesn't return the id, not sure why id was lost
        serializer = LocationSerializer(data=request.data, many=True)
        if serializer.is_valid():
            # Should add a check if locations exist
            locations = Location.objects.filter(
                id__in=[location_data["id"] for location_data in request.data]
            )

            # print(serializer.validated_data)
            # Just returning serializer data, not sure how well this error handles
            serializer.update(locations, serializer.validated_data)
            return Response(serializer.data, status=status.HTTP_200_OK)

            # for location_data in request.data:
            #     # Second serializer and second validation, messy
            #     location = Location.objects.get(id=location_data["id"])
            #     location_update_data = {
            #         "name": location_data["name"],
            #         "sequence": location_data["sequence"],
            #     }
            #     newserializer = LocationSerializer(
            #         instance=location, data=location_update_data, partial=True
            #     )
            #     if newserializer.is_valid():
            #         newserializer.save()
            #     else:
            #         return Response(
            #             newserializer.errors, status=status.HTTP_400_BAD_REQUEST
            #         )
            # return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
