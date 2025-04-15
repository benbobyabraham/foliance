from django.shortcuts import render
from rest_framework import viewsets, permissions
from django_filters.rest_framework import DjangoFilterBackend
from .models import Artifact
from .serializers import ArtifactSerializer

# Create your views here.

class ArtifactViewSet(viewsets.ModelViewSet):
    serializer_class = ArtifactSerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['category', 'date_received']

    def get_queryset(self):
        return Artifact.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
