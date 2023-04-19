from django.contrib import admin

from .models import Location, Part, WorkOrder

# Register your models here.
admin.site.register(Location)
admin.site.register(Part)
admin.site.register(WorkOrder)
