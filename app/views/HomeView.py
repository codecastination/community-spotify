from django.http import HttpResponse
from django.template.loader import get_template
from django.template import Context
from django.views.generic import View


class HomeView(View):
    def get(self, request):
        t = get_template('home_index.html')
        return HttpResponse(t.render())
