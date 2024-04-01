from django.contrib import admin
from .models import Post, Comment

@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    list_display = ('title', 'body', 'created_at')
    search_fields = ('title', 'body')
    ordering = ('created_at',)


@admin.register(Comment)
class CommentAdmin(admin.ModelAdmin):
    list_display = ('author', 'body', 'created_at')
    search_fields = ('author', 'post', 'body'),
    ordering = ('created_at',)
