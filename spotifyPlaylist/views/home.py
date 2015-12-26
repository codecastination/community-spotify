from django.http import HttpResponse


def home_index(request):
    return HttpResponse("Sample response")
