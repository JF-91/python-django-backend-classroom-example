from rest_framework import viewsets
from .models import Post
from .models import Comment
from .serializer import PostSerializer
from .serializer import CommentSerializer

class PostView(viewsets.ModelViewSet):
    serializer_class = PostSerializer
    queryset = Post.objects.all()


class CommentView(viewsets.ModelViewSet):
    serializer_class = CommentSerializer
    queryset = Comment.objects.all()

