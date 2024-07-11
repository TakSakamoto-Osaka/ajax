from typing import Any
from django.shortcuts import render
from django.views.generic.base import TemplateView, View
from django.http.response import JsonResponse
from django.views.decorators.csrf import ensure_csrf_cookie
from .models import Favorite

class IndexView(TemplateView):
    template_name = 'index.html';
   
    def get_context_data(self, **kwargs: Any) -> dict[str, Any]:
        context = super().get_context_data(**kwargs)
        
        favo = Favorite.objects.get(pk=1)
        context['favorite'] = favo.favorite
        
        return context

class UpdateFavoriteView(View):
    def put(self, request, *args, **kwargs):
        favo = Favorite.objects.get(pk=1)
        favo.favorite = not favo.favorite
        favo.save()
        
        return JsonResponse({"favorite": favo.favorite})
        
        
                    