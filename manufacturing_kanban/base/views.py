from django.shortcuts import render, redirect
from django.views.generic import TemplateView
from django.utils.decorators import method_decorator
from django.views.decorators.cache import cache_control

from django.views.decorators.cache import never_cache

from .models import Location, Part, WorkOrder
from .forms import WorkOrderForm

# Create your views here.

@method_decorator(cache_control(no_cache= True, must_revalidate= True, no_store= True), name= 'dispatch')
class IndexView(TemplateView):
    template_name = 'base/index.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['locations'] = Location.objects.all().order_by('sequence')
        context['form'] = WorkOrderForm()
        return context
    
def workorder_create(request):
    if request.method == 'POST':
        new_workorder= WorkOrderForm(request.POST)
        if new_workorder.is_valid():
            new_workorder.save()

    return redirect('base:index')

# @never_cache
def workorder_sort(request):
    location_id = request.POST.get('location')
    workorder_ids = request.POST.getlist('workorder_priority')
    
    location = Location.objects.get(id=location_id)

    for idx, workorder_id in enumerate(workorder_ids, start=1):
        workorder = WorkOrder.objects.get(pk=workorder_id)
        workorder.priority = idx
        workorder.location = location
        workorder.save()

    return render(request, 'base/partials/location_column.html', {'location': location})
