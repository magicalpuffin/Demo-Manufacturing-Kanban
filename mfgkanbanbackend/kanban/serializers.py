from rest_framework import serializers
from .models import Location, Part, WorkOrder


class LocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Location
        fields = "__all__"


class PartSerializer(serializers.ModelSerializer):
    class Meta:
        model = Part
        fields = "__all__"


# TODO: rename these to be easier to understand
class WorkOrderSerializerSimple(serializers.ModelSerializer):
    class Meta:
        model = WorkOrder
        fields = "__all__"


class WorkOrderSerializer(serializers.ModelSerializer):
    location = LocationSerializer()
    part = PartSerializer()

    class Meta:
        model = WorkOrder
        fields = "__all__"
