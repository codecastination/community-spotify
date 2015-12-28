from django.http import HttpResponse
from django.template.loader import get_template
from django.template import Context

def home_index(request):
    t = get_template('home_index.html')
    return HttpResponse(t.render())
