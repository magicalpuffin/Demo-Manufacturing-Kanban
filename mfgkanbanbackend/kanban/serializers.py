from rest_framework import serializers
from .models import Location, Part, WorkOrder


class LocationListSerializer(serializers.ListSerializer):
    def update(self, instance, validated_data):
        # https://www.django-rest-framework.org/api-guide/serializers/#listserializer
        # I probably messed up this implementation
        # Unsure if it is possible to type hint this
        location_mapping = {location.id: location for location in instance}
        data_mapping = {item["id"]: item for item in validated_data}

        # print(location_mapping)
        # print(data_mapping)

        # not using returned list
        updated_list = []
        for location_id, data in data_mapping.items():
            # Updating each individually, seems inefficient
            updated_list.append(self.child.update(location_mapping[location_id], data))

        return updated_list


class LocationSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField()

    class Meta:
        model = Location
        fields = "__all__"
        list_serializer_class = LocationListSerializer


class PartSerializer(serializers.ModelSerializer):
    class Meta:
        model = Part
        fields = "__all__"


class WorkOrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = WorkOrder
        fields = "__all__"


class WorkOrderDetailSerializer(serializers.ModelSerializer):
    location = LocationSerializer()
    part = PartSerializer()

    class Meta:
        model = WorkOrder
        fields = "__all__"
