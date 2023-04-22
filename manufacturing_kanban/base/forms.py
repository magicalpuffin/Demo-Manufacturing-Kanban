from django import forms

from base.models import Location, Part, WorkOrder

class WorkOrderForm(forms.ModelForm):
    class Meta:
        model= WorkOrder
        fields= ['name', 'location', 'part']

class LocationForm(forms.ModelForm):
    class Meta:
        model= Location
        fields= ['name']

class PartForm(forms.ModelForm):
    class Meta:
        model= Part
        fields= ['name', 'description']