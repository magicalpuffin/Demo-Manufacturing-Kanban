from django.shortcuts import render, redirect
from django.views.generic import TemplateView

from .models import Location, Part, WorkOrder
from .forms import WorkOrderForm

# Create your views here.
class IndexView(TemplateView):
    template_name = 'base/index.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['locations'] = Location.objects.all()
        context['form'] = WorkOrderForm()
        return context
    
def workorder_create(request):
    if request.method == 'POST':
        new_workorder= WorkOrderForm(request.POST)
        if new_workorder.is_valid():
            new_workorder.save()

    return redirect('base:index')