from django import forms

from base.models import Location, Part, WorkOrder

class WorkOrderForm(forms.ModelForm):
    class Meta:
        model= WorkOrder
        fields= ['name', 'location', 'part']