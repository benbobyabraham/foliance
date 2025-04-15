from django.shortcuts import render
from rest_framework import viewsets, permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from .models import Resume, Experience, Education, Skill, Project
from .serializers import (
    ResumeSerializer, ExperienceSerializer, EducationSerializer,
    SkillSerializer, ProjectSerializer
)

# Create your views here.

class ResumeViewSet(viewsets.ModelViewSet):
    serializer_class = ResumeSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Resume.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class ExperienceViewSet(viewsets.ModelViewSet):
    serializer_class = ExperienceSerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['resume']

    def get_queryset(self):
        return Experience.objects.filter(resume__user=self.request.user)

    def perform_create(self, serializer):
        resume = Resume.objects.get(user=self.request.user)
        serializer.save(resume=resume)

class EducationViewSet(viewsets.ModelViewSet):
    serializer_class = EducationSerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['resume']

    def get_queryset(self):
        return Education.objects.filter(resume__user=self.request.user)

    def perform_create(self, serializer):
        resume = Resume.objects.get(user=self.request.user)
        serializer.save(resume=resume)

class SkillViewSet(viewsets.ModelViewSet):
    serializer_class = SkillSerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['resume', 'category']

    def get_queryset(self):
        return Skill.objects.filter(resume__user=self.request.user)

    def perform_create(self, serializer):
        resume = Resume.objects.get(user=self.request.user)
        serializer.save(resume=resume)

class ProjectViewSet(viewsets.ModelViewSet):
    serializer_class = ProjectSerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['resume']

    def get_queryset(self):
        return Project.objects.filter(resume__user=self.request.user)

    def perform_create(self, serializer):
        resume = Resume.objects.get(user=self.request.user)
        serializer.save(resume=resume)
