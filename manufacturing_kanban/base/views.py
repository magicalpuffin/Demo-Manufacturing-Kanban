from django.shortcuts import render, redirect
from django.views.generic import TemplateView

# from django.utils.decorators import method_decorator
# from django.views.decorators.cache import cache_control

# from django.views.decorators.cache import never_cache

from .models import Location, Part, WorkOrder
from .forms import WorkOrderForm, LocationForm, PartForm

# Create your views here.

# Was checking if issue was related to caching
# @method_decorator(cache_control(no_cache= True, must_revalidate= True, no_store= True), name= 'dispatch')
class IndexView(TemplateView):
    '''
    Index view, loads all of the locations
    '''
    template_name = 'base/index.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['locations'] = Location.objects.all().order_by('sequence')
        context['parts'] = Part.objects.all()
        context['workorder_form'] = WorkOrderForm()
        context['location_form'] = LocationForm()
        context['part_form'] = PartForm()

        return context
    
def workorder_create(request):
    '''
    Creates the workorder
    '''
    if request.method == 'POST':
        new_workorder= WorkOrderForm(request.POST)
        if new_workorder.is_valid():
            new_workorder.save()

    return redirect('base:index')

def workorder_delete(request, pk):
    '''
    Deletes the workorder
    '''
    removeworkorder = WorkOrder.objects.get(pk = pk)
    location = removeworkorder.location

    if request.method == 'DELETE':
        removeworkorder.delete()

    return render(request, 'base/partials/location_column.html', {'location': location})

# @never_cache
def workorder_sort(request):
    '''
    Saves the sorted results, replaces location column
    '''
    location_id = request.POST.get('location')
    workorder_ids = request.POST.getlist('workorder_priority')
    
    location = Location.objects.get(id=location_id)

    for idx, workorder_id in enumerate(workorder_ids, start=1):
        workorder = WorkOrder.objects.get(pk=workorder_id)
        workorder.priority = idx
        workorder.location = location
        workorder.save()

    return render(request, 'base/partials/location_column.html', {'location': location})


def location_create(request):
    '''
    Creates the location
    '''
    if request.method == 'POST':
        new_location= LocationForm(request.POST)
        if new_location.is_valid():
            new_location.save()
    
    locations = Location.objects.all().order_by('sequence')

    return render(request, 'base/partials/location_list.html', {'locations': locations})

def location_delete(request, pk):
    '''
    Deletes the location
    '''
    removelocation = Location.objects.get(pk = pk)

    if request.method == 'DELETE':
        removelocation.delete()

    locations = Location.objects.all().order_by('sequence')

    return render(request, 'base/partials/location_list.html', {'locations': locations})

def location_sort(request):
    '''
    Saves the sorted results
    '''
    location_ids = request.POST.getlist('location')
    
    for idx, location_id in enumerate(location_ids, start=1):
        location = Location.objects.get(pk=location_id)
        location.sequence = idx
        location.save()

    return redirect('base:index')


def part_create(request):
    '''
    Creates the part
    '''
    if request.method == 'POST':
        new_part= PartForm(request.POST)
        if new_part.is_valid():
            new_part.save()

    parts = Part.objects.all()

    return render(request, 'base/partials/part_list.html', {'parts': parts})

def part_delete(request, pk):
    '''
    Deletes the part
    '''
    removepart = Part.objects.get(pk = pk)

    if request.method == 'DELETE':
        removepart.delete()

    parts = Part.objects.all()

    return render(request, 'base/partials/part_list.html', {'parts': parts})