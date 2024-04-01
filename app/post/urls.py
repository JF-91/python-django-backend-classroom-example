from django.urls import path, include
from rest_framework import routers
from .views import PostView, CommentView

router = routers.DefaultRouter()
router.register(r'posts', PostView, 'post')
router.register(r'comments', CommentView, 'comment')

urlpatterns = [
    path('', include(router.urls))
]