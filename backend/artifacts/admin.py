from django.contrib import admin
from .models import Artifact

# Register your models here.

@admin.register(Artifact)
class ArtifactAdmin(admin.ModelAdmin):
    list_display = ('title', 'user', 'category', 'date_received')
    list_filter = ('category', 'date_received')
    search_fields = ('title', 'description', 'category')
